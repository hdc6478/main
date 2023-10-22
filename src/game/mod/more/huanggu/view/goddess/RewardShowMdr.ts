namespace game.mod.more {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;

    export class RewardShowMdr extends MdrBase {
        private _view: RewardShowView= this.mark("_view", RewardShowView);
        private _itemList: ArrayCollection;

        protected _showArgs: {rewards: number[][], tips: string, title?: string};//奖励,提示文本

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
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let info = this._showArgs;
            let title = info.title || getLanById(LanDef.relic2);//奖励预览
            this._view.secondPop.updateTitleStr(title);
            this._view.lab_desc.textFlow = TextUtil.parseHtml(info.tips);
            this._itemList.source = info.rewards;
        }
    }
}