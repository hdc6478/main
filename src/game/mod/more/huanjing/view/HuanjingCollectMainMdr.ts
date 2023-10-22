namespace game.mod.more {

    import LanDef = game.localization.LanDef;

    export class HuanjingCollectMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [
            {
                btnType: HuanjingCollectMainBtnType.Btn1,
                icon: "huanjingbiaoqiantubiao",
                mdr: HuanjingCollectMdr,
                title: LanDef.huanjing_tips6,
                bg: ""
            }
        ];

        private _proxy: HuanjingProxy;

        protected onInit() {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huanjing);
        }

        protected updateBtnList() {
            if (this._showArgs && Array.isArray(this._showArgs)) {
                let btnType = this._showArgs[0];
                let systemId = this._showArgs[1];
                if (btnType == HuanjingCollectMainBtnType.Btn1) {
                    let btnData = this._btnData[0];
                    btnData.hintTypes = this._proxy.getCollectHintPath(systemId);
                }
            }
            super.updateBtnList();
        }
    }

}