namespace game.mod.boss {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;

    export class BossRewardMdr extends MdrBase {
        private _view: BossRewardView = this.mark("_view", BossRewardView);

        private _itemList: ArrayCollection;
        private _tipsList: ArrayCollection;
        protected _showArgs: {rewardId: number, tips?: string[]};//奖励预览id,提示文本

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

            this._tipsList = new ArrayCollection();
            this._view.list_tips.itemRenderer = BaseZhuangshiItem;
            this._view.list_tips.dataProvider = this._tipsList;
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
            let index = this._showArgs.rewardId;
            let cfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, index);
            this._itemList.source = cfg.content;

            let tips = this._showArgs.tips;
            if(tips && tips.length){
                this._view.currentState = "tips";
                this._tipsList.source = tips;
            }
            else {
                this._view.currentState = "default";
            }
        }
    }
}