namespace game.mod.shenling {


    import LanDef = game.localization.LanDef;

    export class ShenLingAttrMdr extends BaseAttrMdr {
        protected _listAttr1: eui.ArrayCollection;

        private _proxy: ShenLingProxy;
        private _type: number;  //神灵类型
        private _index: number; //神灵index，有则是升星界面的

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Shenling);
        }

        protected onShow(): void {
            super.onShow();
        }

        protected updateView() {
            this.updateTitleStr(getLanById(LanDef.shenling_tips13));
            this._type = this._showArgs[0];
            this._index = this._showArgs[1];

            if (this._index) {
                this._showArgs.attrs = this._proxy.getAttrByIndex(this._index);
            } else {
                this._showArgs.attrs = this._proxy.getAttrByType(this._type);
            }

            this.updateXianLiAttr();
            //基础属性
            let list = this._index ? this._proxy.getSpecialAttrsByIdx(this._index) : this._proxy.getSpecialAttrsByType(this._type);
            if (!list || !list.length) {
                this._view.name1.visible = this._view.scroller.visible = false;
                return;
            }
            this._view.name1.visible = this._view.scroller.visible = true;
            this._listAttr1.replaceAll(list);
        }

        protected updateBaseAttr() {

        }

        protected onHide(): void {
            super.onHide();
        }
    }
}