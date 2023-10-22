namespace game.mod.boss {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;

    export class AbyssRewardMdr extends MdrBase {
        private _view: AbyssRewardView = this.mark("_view", AbyssRewardView);

        private _itemList: ArrayCollection;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_confirm, TouchEvent.TOUCH_TAP, this.hide);
        }

        protected onShow(): void {
            super.onShow();
            this.updateReward();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateReward(): void {
            this._itemList.replaceAll(this._showArgs);
        }
    }
}