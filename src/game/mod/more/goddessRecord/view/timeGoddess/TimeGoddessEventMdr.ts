namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import NvshenShijianTypeConfig = game.config.NvshenShijianTypeConfig;

    export class TimeGoddessEventMdr extends MdrBase {
        private _view: TimeGoddessEventView= this.mark("_view", TimeGoddessEventView);
        private _itemList: TimeGoddessEventItem[] = [];
        private _lineList: eui.Image[] = [];

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            this.onNt(MoreEvent.ON_UPDATE_ZHENRONG_INFO, this.updateHint, this);
            this.onNt(GoddessRecordEvent.ON_UPDATE_TIME_GODDESS_EVENT_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private initShow(): void {
            this._lineList = [
                this._view.img_line1,
                this._view.img_line2,
                this._view.img_line3,
                this._view.img_line4,
                this._view.img_line5
            ];
            this._itemList = [
                this._view.item1,
                this._view.item2,
                this._view.item3,
                this._view.item4,
                this._view.item5,
                this._view.item6
            ];
        }

        private updateView(): void {
            let cfgList: NvshenShijianTypeConfig[] = getConfigListByName(ConfigName.NvshenShijianType);
            for(let i = 0; i < this._itemList.length; ++i){
                let item = this._itemList[i];
                let line = i > 0 ? this._lineList[i - 1] : null;
                let cfg = i < cfgList.length ? cfgList[i] : null;
                let isShow = !!cfg;
                item.visible = isShow;
                if(line){
                    line.visible = isShow;
                }
                if(isShow){
                    item.data = cfg;
                }
            }
        }

        private updateHint(): void {
            for(let i = 0; i < this._itemList.length; ++i){
                let item = this._itemList[i];
                item.updateHint();
            }
        }
    }
}