namespace game.mod.yijie {

    import LanDef = game.localization.LanDef;
    import s2c_instance_fin = msg.s2c_instance_fin;
    import Handler = base.Handler;
    import TextEvent = egret.TextEvent;
    import delayCall = base.delayCall;

    export class YijieResultMdr extends MdrBase {
        private _view: YijieResultView = this.mark("_view", YijieResultView);
        private _proxy: YijieProxy;
        public _showArgs: s2c_instance_fin;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = false;//设置为不可点击，动画表现结束后设置为可点击
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Yijie);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.lab_goto, TextEvent.LINK, this.onClickGoto);
        }

        protected onShow(): void {
            super.onShow();
            this.isEasyHide = false;//设置为不可点击，动画表现结束后设置为可点击
            this._view.closeTips.visible = false;
            this.updateReward();
            this.updateShow();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClickGoto(): void {
            this.hide();
            ViewMgr.getIns().showViewByID(JumpIdx.RoleRing);
        }

        //显示奖励
        private updateReward() {
            let info = this._showArgs;
            this._view.resultReward.updateRewardList(info.reward, Handler.alloc(this, this.onRewardTweenEnd));
        }

        private updateShow(): void {
            this._view.lab_tips.textFlow = TextUtil.parseHtml(getLanById(LanDef.yijie_tips17));
            let isAct = RoleUtil.isRoleRingAct(RoleRingType.Type2);
            this._view.currentState = isAct ? "act" : "notAct";
            if(!isAct){
                let actStr = getLanById(LanDef.yijie_tips13);
                this._view.lab_act.text = actStr;
                this._view.lab_goto.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.go_act), BlackColor.GREEN, ""));
            }
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