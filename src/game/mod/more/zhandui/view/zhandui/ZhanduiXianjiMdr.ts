namespace game.mod.more {


    export class ZhanduiXianjiMdr extends MdrBase {
        private _view: ZhanduiXianjiView = this.mark("_view", ZhanduiXianjiView);
        private _proxy: ZhanduiProxy;
        /**1功绩，2事件*/
        protected _type: number = 1;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhandui);
            this._view.list.itemRenderer = ZhanduiXianjiItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(MoreEvent.ON_UPDATE_ZHANDUI_RECORDS, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._proxy.sendButtonClick(this._type == 1 ? ZhanduiOperType.Oper17 : ZhanduiOperType.Oper18);
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            this._listData.replaceAll(this._proxy.getStrs(this._type));
        }
    }

    export class ZhanduiXianjiMdr2 extends ZhanduiXianjiMdr {
        protected _type = 2;
    }
}