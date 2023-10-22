namespace game.mod.bag {

    import prop_tips_data = msg.prop_tips_data;
    import Handler = base.Handler;
    import Tween = base.Tween;
    import delayCall = base.delayCall;

    export class PropGainMdr extends EffectMdrBase {
        private _view: PropGainView = this.mark("_view", PropGainView);
        public _showArgs: prop_tips_data[];//奖励

        private readonly ROW_C: number = 6;//最多显示6行奖励，即24个奖励

        constructor() {
            super(Layer.modal);
            this.isEasyHide = false;//设置为不可点击，动画表现结束后设置为可点击
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._view.verticalCenter = 0;
        }

        protected onShow(): void {
            super.onShow();

            this.isEasyHide = false;//设置为不可点击，动画表现结束后设置为可点击
            this._view.closeTips.visible = false;
            this.showEffect();
            this.showTween();
            this.updateReward();
        }

        protected onHide(): void {
            this.removeTween();
            PropTipsMgr.getIns().closeBestPropCenter();
            super.onHide();
        }

        private showEffect(): void {
            this.removeEft();
            this.addEftByParent(UIEftSrc.Success, this._view.grp_eft, 0,0,0,null,1);
            this.addEftByParent(UIEftSrc.TipsBg, this._view.grp_eft2);
        }

        //显示奖励
        private updateReward() {
            let rewards = this._showArgs;
            this._view.resultReward.updateRewardList(rewards, Handler.alloc(this, this.onRewardTweenEnd), true, this.ROW_C);
        }

        private showTween(): void {
            this.removeTween();

            this._view.img_type.scaleX = this._view.img_type.scaleY = 7;
            Tween.get(this._view.img_type)
                .to({scaleX: 1, scaleY: 1}, 200);
        }

        private removeTween(): void {
            Tween.remove(this._view.img_type);
        }

        /**********************奖励表现相关**********************/
        //结束动画后执行
        private onRewardTweenEnd(): void {
            this._view.closeTips.visible = true;
            this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
            delayCall(Handler.alloc(this, () => {
                this.isEasyHide = true;//动画表现结束后设置为可点击
            }), 200);
        }

    }
}