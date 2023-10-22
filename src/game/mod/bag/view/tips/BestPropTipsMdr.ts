namespace game.mod.bag {

    import prop_tips_data = msg.prop_tips_data;
    import ArrayCollection = eui.ArrayCollection;
    import Tween = base.Tween;
    import Handler = base.Handler;
    import Quint = base.Quint;

    export class BestPropTipsMdr extends MdrBase{
        private _view: BestPropTipsView = this.mark("_view", BestPropTipsView);

        public _showArgs: prop_tips_data[];/**奖励*/
        private _rewardList: ArrayCollection;

        constructor() {
            super(Layer.tip);
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            //this._view.bottom = 113;
            this._view.verticalCenter = 201;

            this._rewardList = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._rewardList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            this.initReward();
            this.showImgBgTween();
        }

        protected onHide(): void {
            this.removeImgBgTween();
            PropTipsMgr.getIns().closeBestProp();
            super.onHide();
        }

        private initReward(): void {
            this._rewardList.source = this._showArgs;
            this._view.scr_reward.visible = false;
        }

        private showImgBgTween(): void {
            this._view.img_bg.y = 0;
            this._view.img_bg.scaleX = this._view.img_bg.scaleY = 0.1;
            Tween.get(this._view.img_bg)
                .to({scaleX: 1, scaleY: 1}, 200, null, Quint.easeIn)
                .exec(Handler.alloc(this, () => {
                    this._view.scr_reward.visible = true;
                }))
                .delay(900)
                .exec(Handler.alloc(this, () => {
                    this._view.scr_reward.visible = false;
                }))
                .to({scaleX: 0.1, scaleY: 0.1, y: 200}, 200, null, Quint.easeOut)
                .exec(Handler.alloc(this, () => {
                    this.hide();
                }))
        }

        private removeImgBgTween(): void {
            Tween.remove(this._view.img_bg);
        }
    }
}