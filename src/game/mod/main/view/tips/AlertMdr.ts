namespace game.mod.main {
    import Handler = base.Handler;
    import TouchEvent = egret.TouchEvent;

    export class AlertMdr extends MdrBase{

        private _view: AlertView = this.mark("_view", AlertView);
        protected _showArgs: {
            currentState: string,//界面状态
            content: string,
            confirm: Handler,
            cancel: Handler,
            type: NotTipsType,
            changeHide: boolean; //场景变化关闭界面标识
        };
        private _cancel: Handler;
        private _type: NotTipsType;//不再提示类型;
        private _proxy: MainProxy;

        constructor() {
            super(Layer.modal);
        }

        protected onInit(): void {
            super.onInit();
            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;
            this._proxy = this.retProxy(ProxyType.Main);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.onClickCancel);
            addEventListener(this._view.btn_cancel, TouchEvent.TOUCH_TAP, this.onClickCancel);
            addEventListener(this._view.btn_confirm, TouchEvent.TOUCH_TAP, this.onClickConfirm);
            this.onNt(SceneEvent.SCENE_CHANGE, this.onSceneChange, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickCancel() {
            this.execAndHide(this._cancel);
        }

        private onClickConfirm() {
            this.execAndHide(this._showArgs && this._showArgs.confirm);
            //确定的时候，判断是否勾选，保存变量
            if(this._type){
                let isSel = this._view.checkbox.selected;//是否选中
                this._proxy.setNotTipsType(this._type, isSel);
            }
        }

        private execAndHide(handler: Handler): void {
            if (handler) {
                handler.exec();
            }
            this.hide();
        }

        private updateView(): void {
            this._view.currentState = this._showArgs.currentState;
            this._view.lab_tips.textFlow = TextUtil.parseHtml(this._showArgs.content);
            this._cancel = this._showArgs && this._showArgs.cancel;
            this._type = this._showArgs && this._showArgs.type;
            if(this._view.checkbox){
                this._view.checkbox.selected = true;//默认勾选状态
            }
        }

        //场景变化关闭界面处理
        private onSceneChange(): void {
            if (this._showArgs && this._showArgs.changeHide) {
                this.hide();
            }
        }

    }
}
