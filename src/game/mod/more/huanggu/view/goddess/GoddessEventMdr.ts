namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import HuangguShijianTypeConfig = game.config.HuangguShijianTypeConfig;

    export class GoddessEventMdr extends MdrBase {
        private _view: GoddessEventView= this.mark("_view", GoddessEventView);
        private _itemList: GoddessEventItem[] = [];

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
            this.onNt(HuangguEvent.ON_UPDATE_GODDESS_EVENT_INFO, this.updateView, this);
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
            this._itemList = [
                this._view.item1,
                this._view.item2,
                this._view.item3,
                this._view.item4
            ];
        }

        private updateView(): void {
            let cfgList: HuangguShijianTypeConfig[] = getConfigListByName(ConfigName.HuangguShijianType);
            for(let i = 0; i < this._itemList.length && i < cfgList.length; ++i){
                let item = this._itemList[i];
                let cfg = cfgList[i];
                item.data = cfg;
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