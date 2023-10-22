namespace game.mod.result {
    import s2c_instance_fin = msg.s2c_instance_fin;
    import Handler = base.Handler;
    import delayCall = base.delayCall;

    export class ResultBelongMdr extends EffectMdrBase {

        private _view: ResultBelongView = this.mark("_view", ResultBelongView);
        protected _showArgs: s2c_instance_fin;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = false;//设置为不可点击，动画表现结束后设置为可点击
        }

        protected onInit(): void {
            super.onInit();
        }

        protected onShow(): void {
            super.onShow();
            this.isEasyHide = false;//设置为不可点击，动画表现结束后设置为可点击
            this._view.closeTips.visible = false;
            this.updateReward();
            this.updateBelong();

            this.removeEft();
            this.addEftByParent(UIEftSrc.Victory, this._view.grp_eft, 0, 0, 0, null, 1, 1, false);
            this.addEftByParent(UIEftSrc.ZhanDouShengli1, this._view.grp_eft2);
        }

        protected onHide(): void {
            SceneUtil.exitScene();
            super.onHide();
        }

        //显示奖励
        private updateReward() {
            let info = this._showArgs;
            this._view.resultReward.updateRewardList(info.reward, Handler.alloc(this, this.onRewardTweenEnd));
        }

        //显示归属
        private updateBelong() {
            let info = this._showArgs;
            let ownerInfo = info.owner;
            this._view.head.updateHeadShow(ownerInfo.head, ownerInfo.head_frame, ownerInfo.sex);
            this._view.lab_name.text = ownerInfo.name;
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

