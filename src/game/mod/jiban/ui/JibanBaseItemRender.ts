namespace game.mod.jiban {

    import facade = base.facade;
    import TextEvent = egret.TextEvent;
    import Handler = base.Handler;
    import JumpConfig = game.config.JumpConfig;
    import LanDef = game.localization.LanDef;
    import HorseConfig = game.config.HorseConfig;

    export class JibanBaseItemRender extends BaseRenderer {
        public icon: game.mod.Icon;
        public lab_gain: eui.Label;

        public data: IJibanBaseItemRenderData;
        private _proxy: ISurfaceProxy;

        private _canAct: boolean;
        public _gainId: number;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Surface).retProxy(ProxyType.Surface);
            this.lab_gain.touchEnabled = true;
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.lab_gain, this.onClick, this);
            // this.lab_gain.addEventListener(TextEvent.LINK, this.onClick, this);
            this.icon.setClickHandler(Handler.alloc(this, this.onClickIcon));
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            // this.lab_gain.removeEventListener(TextEvent.LINK, this.onClick, this);
        }

        protected dataChanged(): void {
            if (!this.data) {
                return;
            }

            let data = this.data;
            let propData = PropData.create(data.cfg.index);
            this.icon.setData(propData);
            let isAct = data.isActed;
            this._canAct = data.showHint;
            this.lab_gain.visible = !isAct;
            if (!isAct) {
                this.icon.setImgGray();
                this._gainId = propData.gain_id && propData.gain_id[0];
                let cfg: JumpConfig = getConfigByNameId(ConfigName.Jump, this._gainId);
                this.lab_gain.textFlow = cfg ? TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(cfg.name,BlackColor.YELLOW)): TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.huodong),BlackColor.YELLOW));
            } else {
                this.icon.setImgGray("");
                this._gainId = 0;
            }

            this.icon.setHint(this._canAct);
        }

        private onClickIcon(): void {
            if (!this.data) {
                return;
            }
            //子女
            if (this.data.headType == ConfigHead.Child) {
                this.onChildClick();
                return;
            }
            if (this.data.headType == ConfigHead.Shouyin) {
                this.onClickYishouShouyin();
                return;
            }
            if (this.data.headType == ConfigHead.Xianjian) {
                this.onClickXianjian();
                return;
            }

            let data = this.data;
            let index = data.cfg.index;
            if (this._canAct) {
                this._proxy.c2s_ride_oper_jiban(data.headType, data.jibanCfg.index, index);
                return;
            }
            this.showPropTips(data.cfg);
        }

        private onClick(): void {
            if (!this._gainId) {
                return;
            }
            ViewMgr.getIns().showViewByID(this._gainId);
        }

        //展示tips
        private showPropTips(cfg: HorseConfig): void {
            if (!cfg) {
                return;
            }
            let idx = cfg && cfg.material[0][0];
            ViewMgr.getIns().showPropTips(idx);
        }

        //子女
        private onChildClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let childProxy: IChildProxy = getProxy(ModName.Xianyuan, ProxyType.Child);
            if (data.showHint) {
                childProxy.c2s_child_oper_jiban(data.jibanCfg.index, data.cfg.index);
                return;
            }
            let cost = childProxy.getCost(data.cfg.index, 1);
            ViewMgr.getIns().showPropTips(cost[0]);
        }

        //异兽兽印
        private onClickYishouShouyin(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let yishouProxy: IYishouProxy = getProxy(ModName.Yishou, ProxyType.Yishou);
            if (data.showHint) {
                yishouProxy.c2s_yishou_shouying_jiban(data.jibanCfg.index, data.cfg.index);
                return;
            }
            this.showPropTips(data.cfg);
        }

        private onClickXianjian(): void {
            let data = this.data;
            let proxy: IXianjianProxy = getProxy(ModName.Surface, ProxyType.Xianjian);
            if (data.showHint) {
                proxy.c2s_fly_sword_operation(data.cfg.index, 5, data.jibanCfg.index);
                return;
            }
            this.showPropTips(data.cfg);
        }
    }

}