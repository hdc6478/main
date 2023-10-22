namespace game.mod.more {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import LanDef = game.localization.LanDef;

    export class XianmaiSelectMdr extends MdrBase implements UpdateItem {
        private _view: XianmaiSelectView = this.mark("_view", XianmaiSelectView);
        private _proxy: XianmaiProxy;
        private _stage: number;
        private _index: number;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Xianmai);
            this._view.secondPop.bgStr = ResUtil.getUiJpg("xuanzhexianmai_bg");
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop, egret.TouchEvent.TOUCH_TAP, this.onHide, this);
            addEventListener(this._view.btn_do0, egret.TouchEvent.TOUCH_TAP, this.onClickBtnDo0, this);
            addEventListener(this._view.btn_do1, egret.TouchEvent.TOUCH_TAP, this.onClickBtnDo1, this);
            this.onNt(MoreEvent.ON_XIANMAI_VIEW_CLOSE, this.hide, this);
        }

        protected onShow(): void {
            super.onShow();
            this._stage = this._showArgs[0];
            this._index = this._showArgs[1];

            // todo
            if ((typeof this._stage != 'number') || (typeof this._index != 'number')) {
                DEBUG && console.trace(`_xianmai_select: `, this._stage, this._index);
            }

            this.updateView();
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            super.onHide();
            this._stage = null;
            this._index = null;
        }

        private updateView(): void {
            let myData = this._proxy.my_data;
            if (!myData) {
                this.hide();
                return;
            }
            this._view.infoItem0.updateRoleView(myData);
            let info = this._proxy.getStageInfo(this._index);
            if (info) {
                this._view.btn_do0.visible = true;
                this._view.btn_do1.x = 376;
                this._view.infoItem1.updateRoleView(info);
                this._view.btn_do1.label = getLanById(LanDef.xianmaizhengduo_tips20);
            } else {
                this._view.btn_do0.visible = false;
                this._view.btn_do1.x = 276;
                this._view.btn_do1.label = getLanById(LanDef.xianmaizhengduo_tips21);
                this._view.infoItem1.updateDefaultView(this._stage, this._index);
            }
        }

        private onClickBtnDo0(): void {
            this._proxy.c2s_xianmai_pvp_oper(XianmaiOperType.Oper2, this._stage, this._index);
            this.hide();
        }

        private onClickBtnDo1(): void {
            let info = this._proxy.getStageInfo(this._index);
            let oper = info ? XianmaiOperType.Oper3 : XianmaiOperType.Oper4;
            this._proxy.c2s_xianmai_pvp_oper(oper, this._stage, this._index);
            this.hide();
        }

        update(time: base.Time) {
            this.updateView();//todo
        }
    }
}