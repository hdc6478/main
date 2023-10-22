namespace game.mod.yijie {

    export class SeaFubenMainMdr extends WndBaseMdr {
        private _proxy: SeaProxy;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Sea);
        }

        protected onShow(): void {
            this.initBtnList();
            super.onShow();
            this.checkHide();
        }

        private initBtnList(): void {
            let type = this._proxy.type;
            let btnType = "0" + type;
            let icon = "sea_fuben_tab" + type + "_";
            let title = "sea_fuben_tips" + type;
            let hintType = this._proxy.getFubenHintType(type);
            this._btnData = [
                {
                    btnType: btnType,
                    icon: icon,
                    mdr: SeaFubenMdr,
                    title: title,
                    bg: "sea_fuben_bg",
                    hintTypes: hintType,
                }
            ];
        }

        private checkHide(): void {
            //场景返回时，检测副本是否已通关
            let type = this._proxy.type;
            let bigGate = this._proxy.bigGate;
            let isFinish = this._proxy.isFinish(type, bigGate);
            if(isFinish){
                this.onClickBack();
            }
        }
    }
}