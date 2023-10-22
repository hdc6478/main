namespace game.mod.more {

    export class HunkaTypeMainMdr extends WndBaseMdr {
        private _proxy: GoddessRecordProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.GoddessRecord);
        }


        protected onShow(): void {
            this.initBtnList();
            super.onShow();
        }

        private initBtnList(): void {
            if(this._showArgs){
                let type: string;
                if (Array.isArray(this._showArgs)) {
                    type = this._showArgs.shift();
                } else {
                    type = this._showArgs;
                }
                this._proxy.hunkaType = parseInt(type);
            }

            let hunkaType = this._proxy.hunkaType;
            let btnType = "0" + hunkaType;
            let icon = "hunka_tab" + hunkaType + "_";
            let title = "hunka_type_tips" + hunkaType;
            let hintType = this._proxy.getHunkaHintType(hunkaType);
            this._btnData = [
                {
                    btnType: btnType,
                    icon: icon,
                    mdr: HunkaTypeMdr,
                    title: title,
                    bg: "hunka_bg",
                    hintTypes: hintType,
                }
            ];
        }

    }
}