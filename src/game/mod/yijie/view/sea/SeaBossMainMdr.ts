namespace game.mod.yijie {

    export class SeaBossMainMdr extends WndBaseMdr {
        private _proxy: SeaProxy;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Sea);
        }

        protected onShow(): void {
            this._proxy.type = this._showArgs && parseInt(this._showArgs[0]) || 1;
            this.initBtnList();
            super.onShow();
        }

        private initBtnList(): void {
            let type = this._proxy.type;
            let btnType = "0" + type;
            let icon = "sea_boss_tab" + type + "_";
            let title = "sea_boss_tips" + type;
            let hintType = this._proxy.getBossHintType(type);
            this._btnData = [
                {
                    btnType: btnType,
                    icon: icon,
                    mdr: SeaBossMdr,
                    title: title,
                    hintTypes: hintType,
                }
            ];
        }
    }
}