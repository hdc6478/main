namespace game.mod.activity {


    import s2c_zero_buy_info = msg.s2c_zero_buy_info;
    import GameNT = base.GameNT;
    import c2s_zero_buy_get = msg.c2s_zero_buy_get;
    import ZeroBuyConfig = game.config.ZeroBuyConfig;

    export class ZeroBuyProxy extends ProxyBase implements IZeroBuyProxy{
        private _model: ZeroBuyModel;

        public get model() {
            return this._model;
        }

        initialize(): void {
            super.initialize();
            this._model = new ZeroBuyModel();

            this.onProto(s2c_zero_buy_info, this.s2c_zero_buy_info, this);
        }

        /**--------------------协议start-------------------- */

        private s2c_zero_buy_info(n: GameNT): void {
            let msg: s2c_zero_buy_info = n.body;
            if (msg) {
                this._model.infos = msg.infos || [];
            }
            this.onUpdateHint();
            this.checkOpen();
            this.sendNt(ActivityEvent.ON_UPDATE_ZERO_BUY_INFO);
        }

        public c2s_zero_buy_get(index: number): void {
            let msg: c2s_zero_buy_get = new c2s_zero_buy_get();
            msg.index = index;
            this.sendProto(msg)
        }

        /**--------------------协议end-------------------- */

        /**列表 */
        public getList(): ZeroBuyConfig[] {
            this._model.index = -1;
            let list: ZeroBuyConfig[] = [];
            let cfgArr: ZeroBuyConfig[] = getConfigListByName(ConfigName.ZeroBuy);
            let vip = VipUtil.getShowVipLv();
            for (let cfg of cfgArr) {
                let status: number = this.getStatusByIndex(cfg.index);
                if (status == 0) {
                    list.push(cfg);
                }
                if (!status && this._model.index == -1) {
                    this._model.index = list.length - 1;
                }

                let limit_vip: number = VipUtil.getShowVipLv(cfg.vip_idx);
                if (vip < limit_vip) {
                    break;
                }
            }
            return list;
        }

        /**获取状态 1已购买 2已返回奖励 */
        public getStatusByIndex(index: number): number {
            if (!this._model.infos) {
                return 0;
            }
            for (let info of this._model.infos) {
                if (+info.index == index) {
                    return info.status;
                }
            }
            return 0;
        }

        protected onRoleUpdate(n: GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(PropIndexToKey[PropIndex.Xianyu]) > -1) {
                this.onUpdateHint();
            }
            if (keys.indexOf(RolePropertyKey.vip_lv) > -1) {
                this.onUpdateHint();
            }
        }

        /**更新红点 */
        private onUpdateHint(): void {
            let list = this.getList();
            let vip = VipUtil.getShowVipLv();
            for (let cfg of list) {
                let enough: boolean = BagUtil.checkPropCnt(cfg.cost[0], cfg.cost[1]);
                let status: number = this.getStatusByIndex(cfg.index);
                if (enough && !status && vip >= VipUtil.getShowVipLv(cfg.vip_idx)) {
                    HintMgr.setHint(true, [ModName.Activity, MainActivityViewType.ZeroBuy]);
                    return;
                }
            }
            HintMgr.setHint(false, [ModName.Activity, MainActivityViewType.ZeroBuy]);
        }

        public get isOpen(): boolean {
            let list = this.getList();
            for (let cfg of list) {
                let status: number = this.getStatusByIndex(cfg.index);
                if (status != 2) {
                    return true;
                }
            }
            return false;
        }

        private checkOpen(): void {
            BtnIconMgr.insLeft().updateOpen(BtnIconId.ZeroBuy, this.isOpen);
        }
    }
}