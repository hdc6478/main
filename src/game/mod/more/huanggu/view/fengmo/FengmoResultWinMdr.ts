namespace game.mod.more {
    import s2c_instance_fin = msg.s2c_instance_fin;
    import Handler = base.Handler;
    import delayCall = base.delayCall;

    export class FengmoResultWinMdr extends EffectMdrBase {

        private _view: FengmoResultWinView = this.mark("_view", FengmoResultWinView);
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

        }

        protected onHide(): void {
            SceneUtil.exitScene();
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
            let hurt = info.long_params[0].toNumber();
            let str = StringUtil.getHurtNumStr(hurt);
            this._view.lab_hurt.textFlow = TextUtil.parseHtml(`造成伤害 ${TextUtil.addColor(str, BlackColor.GREEN)}`);
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

