namespace game.mod.result {
    import s2c_instance_fin = msg.s2c_instance_fin;
    import facade = base.facade;
    import Handler = base.Handler;
    import delayCall = base.delayCall;

    export class ResultWinMdr extends EffectMdrBase {

        private _view: ResultWinView = this.mark("_view", ResultWinView);
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
            this.updateHurtList();

            this.removeEft();
            this.addEftByParent(UIEftSrc.Victory, this._view.grp_eft, 0, 0, 0, null, 1, 1, false);
            this.addEftByParent(UIEftSrc.ZhanDouShengli1, this._view.grp_eft2);
        }

        protected onHide(): void {
            SceneUtil.exitScene();
            // if(this._showArgs.type == SceneType.HangUp2) {           // 挂机战斗，弹出通关界面
            //     facade.showView(ModName.Result, ResultViewType.ResultPass, this._showArgs);
            // }
            this.removeEft();
            super.onHide();
        }

        //显示奖励
        private updateReward(): void {
            let info = this._showArgs;
            this._view.resultReward.updateRewardList(info.reward, Handler.alloc(this, this.onRewardTweenEnd));
        }

        //显示伤害
        private updateHurtList(): void {
            let info = this._showArgs;
            this._view.resultHurt.updateHurtList(info.damage_list);
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

