namespace game.mod.activity {

    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;

    export class TiannvWelfareItem extends BaseRenderer {
        public btn_box: game.mod.Btn;
        public gr_font: eui.Group;
        private _proxy: WonderfulActProxy;
        public data: number;//充值档位

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.WonderfulAct);

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_box, this.onClickBox, this);
        }


        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            let valueType = this.data;

            let rmbStr = valueType + PayUtil.getRmbUnit();
            this.addBmpFont(rmbStr, BmpTextCfg[BmpTextType.Supremegit], this.gr_font, true, 0.8, true);
            this.btn_box.redPoint.visible = this._proxy.getTiannvHintByValueType(valueType);
        }

        private onClickBox(): void {
            if (!this.data) {
                return;
            }
            let valueType = this.data;
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.TiannvWelfareReward, valueType);
        }

        //设置宝箱资源
        public setBox(icon: string): void {
            this.btn_box.icon = icon;
        }
    }
}