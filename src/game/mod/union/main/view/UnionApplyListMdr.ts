namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import function_data = msg.function_data;
    import TouchEvent = egret.TouchEvent;
    import Event = egret.Event;
    import LanDef = game.localization.LanDef;

    /**申请列表界面 */
    export class UnionApplyListMdr extends MdrBase {
        private _view: UnionApplyListView = this.mark("_view", UnionApplyListView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();
        private _limit: function_data;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = UnionApplyItem;
            this._view.list.dataProvider = this._listData;

            this._view.editable_value.inputType = egret.TextFieldInputType.TEL;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.checkbox1, TouchEvent.TOUCH_TAP, this.onCheckSelect, this);
            addEventListener(this._view.checkbox2, TouchEvent.TOUCH_TAP, this.onCheckSelect, this);
            addEventListener(this._view.editable_value, Event.CHANGE, this.onChangeValue, this);

            this.onNt(UnionEvent.ON_UPDATE_APPLY_LIST, this.onUpdateView, this);
            this.onNt(UnionEvent.ON_UPDATE_APPLY_LIMIT, this.onUpdateLimit, this);
        }

        protected onShow(): void {
            if (this._proxy.isApply) {
                this._proxy.c2s_ask_guild_apply_info();
            }
            super.onShow();

            this.onUpdateLimit();
            this.onUpdateView();

            this._view.secondPop.updateTitleStr(getLanById(LanDef.guild_meun7));
        }

        private onUpdateView(): void {
            this._listData.source = this._proxy.getApplyList();
        }

        private onUpdateLimit(): void {
            this._limit = this._proxy.getApplyLimit();

            this._view.checkbox1.selected = this._limit.is_set;
            this._view.checkbox2.selected = this._limit.value > 0;
            this._view.editable_value.text = `${this._limit.value}`;
        }

        private onChangeValue(): void {
            this._view.editable_value.text = `${+this._view.editable_value.text}`;
        }

        private onCheckSelect(): void {
            let val: number = +this._view.editable_value.text;
            let sel2: boolean = this._view.checkbox2.selected;
            if (!sel2) {
                val = 0;
                this._view.editable_value.text = `${val}`;
            }
            if (sel2 && !val) {
                this._view.checkbox2.selected = val > 0;
                PromptBox.getIns().show("设置战力限制才可勾选");
                return;
            }
            this._proxy.c2s_guild_open_status(this._view.checkbox1.selected, val)
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}