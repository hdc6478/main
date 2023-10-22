namespace game.mod.more {

    // import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;

    export class CrossUnionRewardMdr extends MdrBase {
        private _view: CrossUnionRewardView = this.mark("_view", CrossUnionRewardView);
        private _proxy: CrossUnionProxy;

        private _listReward: eui.ArrayCollection = new eui.ArrayCollection();
        private _listLose: eui.ArrayCollection = new eui.ArrayCollection();
        private _listLook: eui.ArrayCollection = new eui.ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.CrossUnion);

            this._view.list_win.itemRenderer = Icon;
            this._view.list_win.dataProvider = this._listReward;

            this._view.list_lose.itemRenderer = Icon;
            this._view.list_lose.dataProvider = this._listLose;

            this._view.list_look.itemRenderer = Icon;
            this._view.list_look.dataProvider = this._listLook;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
        }

        protected onShow(): void {
            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            this._listReward.replaceAll(this._proxy.guild_pk_win_rewar);
            this._listLose.replaceAll(this._proxy.guild_pk_lose);
            this._listLook.replaceAll(this._proxy.guild_pk_see_reward);

            this._view.lab_tips.textFlow = TextUtil.parseHtml(getLanById(LanDef.kuafuxianzong_tips4));
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}