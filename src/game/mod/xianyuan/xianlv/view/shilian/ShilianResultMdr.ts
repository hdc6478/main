namespace game.mod.xianyuan {

    import s2c_instance_fin = msg.s2c_instance_fin;
    import Handler = base.Handler;
    import delayCall = base.delayCall;

    export class ShilianResultMdr extends MdrBase {
        private _view: ShilianResultView = this.mark("_view", ShilianResultView);
        _showArgs: s2c_instance_fin;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = false;//设置为不可点击，动画表现结束后设置为可点击
        }

        protected onInit(): void {
            super.onInit();
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
            this.isEasyHide = false;//设置为不可点击，动画表现结束后设置为可点击
            this._view.closeTips.visible = false;
        }

        protected onHide(): void {
            super.onHide();
            SceneUtil.exitScene();
        }

        private updateView(): void {
            let msg = this._showArgs;
            this._view.lb_damage.text = StringUtil.getHurtNumStr(msg.params[0]);
            this._view.lb_hp.text = msg.params[1] + '%';

            this._view.resultReward.updateRewardList(msg.reward, Handler.alloc(this, this.onRewardTweenEnd));
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