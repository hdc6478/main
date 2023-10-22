namespace game.mod.boss {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import prop_tips_data = msg.prop_tips_data;

    export class BossRewardShowMdr extends MdrBase {
        private _view: BossRewardShowView = this.mark("_view", BossRewardShowView);

        private _itemList: ArrayCollection;
        protected _showArgs: prop_tips_data[];//奖励

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
            let rewards = this._showArgs;
            this._itemList.source = rewards;
        }
    }
}