namespace game.mod.jiban {

    import LanDef = game.localization.LanDef;
    import facade = base.facade;
    import XianjianJibanConfig = game.config.XianjianJibanConfig;

    export class XianjianJibanMdr extends JibanBaseMdr {
        protected _headType: number = ConfigHead.Xianjian;//子类重写
        private _xianjianProxy: IXianjianProxy;

        protected onInit(): void {
            super.onInit();
            this._xianjianProxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Xianjian);
        }

        protected updateModel(): void {
            let infos = this._selCfg.partners;
            this._curStar = 0;
            for (let i = 0; i < this._maxCnt; ++i) {
                let item = this._view["item" + i];
                item.visible = i <= infos.length - 1;
                if (item.visible) {
                    let index = infos[i];
                    let itemData: IJibanBaseItemRenderData = {
                        headType: this._headType,
                        cfg: getConfigById(index),
                        jibanCfg: this._selCfg,
                        isActed: this.isJibanItemAct(this._selCfg.index, index),
                        showHint: this.canJibanItemAct(this._selCfg, index)
                    };
                    item.data = itemData;
                    let star = this.getStar(index);
                    this._curStar += Math.min(star, 1);

                }
            }
            this._view.currentState = infos.length + "";
            this._view.img_item.source=`surface_${this._headType}_${this._selCfg.index}`;
            this._maxStar = infos.length;
        }

        protected onClickAct(): void {
            if (!this._selCfg) {
                return;
            }
            if (!this._canAct) {
                PromptBox.getIns().show(getLanById(LanDef.jiban_tips1));
                return;
            }
            this._xianjianProxy.c2s_fly_sword_operation(null, 5, this._selCfg.index);
        }

        /**羁绊icon数据*/
        protected getJibanCfgList(): IJibanBaseRenderData[] {
            let cfgList: XianjianJibanConfig[] = this._proxy.getJibanCfgList(this._headType);
            let list: IJibanBaseRenderData[] = [];
            for (let cfg of cfgList) {
                list.push({
                    cfg,
                    isActed: this.getAct(cfg.index),
                    showHint: this.getCanAct(cfg)
                });
            }
            return list;
        }

        protected getStar(index: number): number {
            return this._xianjianProxy.getInfo(index) ? 1 : 0;
        }

        protected getAct(index: number): boolean {
            let info = this._xianjianProxy.jibans.find(v => {
                return v.index == index
            });
            return info && info.is_active_jiban;
        }

        protected getCanAct(cfg?: XianjianJibanConfig): boolean {
            if (!cfg) {
                cfg = this._selCfg
            }
            return this._xianjianProxy.canJibanAct(cfg)
        }

        /**羁绊单个外显是否已激活*/
        protected isJibanItemAct(index: number, rideIndex: number): boolean {
            let info = this._xianjianProxy.jibans.find(v => {
                return v.index == index
            });
            if (info && info.is_active_jiban) {
                return true;
            }
            return info && info.ride_index && info.ride_index.indexOf(rideIndex) > -1;
        }

        /**羁绊外显是否可以激活*/
        protected canJibanItemAct(cfg: XianjianJibanConfig, index: number): boolean {
            if (this.isJibanItemAct(cfg.index, index)) {
                return false;
            }
            return !!this._xianjianProxy.getInfo(index);
        }

        /**更新激活条件和激活状态*/
        protected updateAct(): void {
            super.updateAct();
            this._canAct = this.getCanAct();
            this._view.btn_act.redPoint.visible = this._canAct;
        }
    }
}