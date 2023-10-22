namespace game.mod.gift {

    export class GiftMainMdr extends WndBaseMdr {
        protected _btnData: WndBaseViewData[] = [];
        private _proxy: GiftProxy;
        private _giftType: GiftType;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Gift);
        }

        protected onShow(): void {
            //传进来的是giftType
            this._giftType = super.decodeShowArgs();
            super.onShow();
        }

        protected updateBtnList() {
            let icon = this._proxy.getIcon(this._giftType);
            let title = this._proxy.getTitle(this._giftType);
            let hintTypes = this._proxy.getHintTypes(this._giftType);
            this._btnData.push({
                icon: icon,
                title: title,
                hintTypes: hintTypes,
                btnType: MdrTabBtnType.TabBtnType01,
                mdr: GiftMdr
            });
            super.updateBtnList();
        }

        protected updateViewShow() {
            let type = MdrTabBtnType.TabBtnType01;
            this._tab.params = this._giftType;
            this._tab.selectIndex = Math.max(this.getMdrPosByType(type), 0);
            this._tab.show();
        }

        protected onHide() {
            super.onHide();
            this._btnData = [];
        }
    }

}