namespace game.mod.activity {

    import LanDef = game.localization.LanDef;

    export class ZcxFuliMdr extends MdrBase {
        private _view: BaseRewardView = this.mark("_view", BaseRewardView);
        private _proxy: ZcxProxy;
        private _type: ZcxFundType;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Zhaocaixian);
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(ActivityEvent.ON_ZCX_FUND_BOX_SHOW, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._type = this._showArgs as number;
            this._view.secondPop.updateTitleStr(getLanById(LanDef.zcx_tips13));
            this._proxy.c2s_zcx_fund_box_show(this._type);
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let rewards = this._proxy.getFundBoxReward(this._type);
            this._listData.replaceAll(rewards);

            let boughtNum = this._proxy.getBoughtNum(this._type);
            let targetNum = this._proxy.getFundTargetNum(this._type);
            let str = TextUtil.addColor(boughtNum + '/' + targetNum, WhiteColor.GREEN);
            this._view.lb_desc.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.zcx_tips14), [str]));
            this._view.lb_desc.visible = true;

            let status = this._proxy.getBoxStatus(this._type);
            this._view.img_state.visible = status == RewardStatus.Draw;
            this._view.btn_get.visible = !this._view.img_state.visible;
            this._view.img_state.source = `lvseyilingqu`;
            this._view.btn_get.setHint(status == RewardStatus.Finish);
        }

        private onClick(): void {
            let status = this._proxy.getBoxStatus(this._type);
            if (status == RewardStatus.Finish) {
                this._proxy.c2s_zcx_fund_box_reward(this._type);
            } else {
                PromptBox.getIns().show(getLanById(LanDef.tiaojianbuzu));
            }
        }
    }
}