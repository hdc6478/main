namespace game.mod.union {

    import LanDef = game.localization.LanDef;

    export class UnionRankTipsMdr extends MdrBase {
        private _view: UnionRankTipsView = this.mark("_view", UnionRankTipsView);
        private _proxy: UnionProxy;
        private _listData: eui.ArrayCollection;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateView();
        }

        protected onHide(): void {
            this._proxy.c2s_guild_type_rank_rewards(this._showArgs);
            super.onHide();
        }

        private updateView(): void {
            let rank = this._proxy.getLastRank(this._showArgs);
            this._view.lab_tips.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.xianzong_tips20), [TextUtil.addColor(`${rank}`, WhiteColor.GREEN)]));

            let list = this._proxy.getRankProps(this._showArgs);
            this._listData.replaceAll(list);

            this._view.btn_do.setHint(true);
        }

        private onClick(): void {
            this.hide();
        }
    }
}