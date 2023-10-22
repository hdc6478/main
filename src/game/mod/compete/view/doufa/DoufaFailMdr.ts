namespace game.mod.compete {

    import Handler = base.Handler;
    import LanDef = game.localization.LanDef;
    import s2c_instance_fin = msg.s2c_instance_fin;
    import delayCall = base.delayCall;

    export class DoufaFailMdr extends EffectMdrBase {
        private _view: DoufaFailView = this.mark("_view", DoufaFailView);
        private _proxy: CompeteProxy;
        protected _showArgs: s2c_instance_fin;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = false;//设置为不可点击，动画表现结束后设置为可点击
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected onShow(): void {
            super.onShow();
            this.isEasyHide = false;//设置为不可点击，动画表现结束后设置为可点击
            this._view.closeTips.visible = false;
            this.updateReward();
            this.updateScore();

            this.removeEft();
            this.addEftByParent(UIEftSrc.Default, this._view.gr_eft, 0, 0, 0, null, 1, 1, false);
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

        private updateScore(): void {
            let info = this._showArgs;
            let name = TextUtil.addColor(info.name, BlackColor.GREEN);
            let tips = StringUtil.substitute(getLanById(LanDef.doufa_tips14), [name]);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(tips);

            let addScore = info.value;
            this._view.lab_score.text = getLanById(LanDef.zmFight_tips3) + "-" + addScore;

            let score = this._proxy.score - addScore;
            let maxScore = this._proxy.getMaxScore();
            this._view.bar.show(score, maxScore, false, 0, false);

            let lv = this._proxy.lv;
            this._view.img_lv_icon.source = "doufa_lv_icon" + lv;
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