namespace game.mod.union {


    import ArrayCollection = eui.ArrayCollection;
    import GuildDonateConfig = game.config.GuildDonateConfig;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    /**每日俸禄 */
    export class UnionWageMdr extends MdrBase {
        private _view: UnionWageView = this.mark("_view", UnionWageView);
        private _proxy: UnionProxy;

        private _listData: ArrayCollection = new ArrayCollection();

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Union);

            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick, this);

            this.onNt(UnionEvent.ON_UPDATE_WAGE_BTN_INFO, this.onUpdateBtn, this);
            this.onNt(UnionEvent.ON_UPDATE_UNION_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._proxy.model.info) {
                this._proxy.c2s_ask_guild_info();
            } else {
                this.onUpdateView();
            }
        }

        private onUpdateView(): void {
            let level: number = this._proxy.model.info.level;
            let cfg: GuildDonateConfig = getConfigByNameId(ConfigName.GuildDonate, level);
            this._listData.source = cfg.daily_reward;

            this.onUpdateBtn();
        }

        private onUpdateBtn(): void {
            this._view.btn.visible = !this._proxy.model.is_get_reward;
            this._view.img_get.visible = !this._view.btn.visible;
        }

        private onClick(): void {
            this._proxy.c2s_guild_daily_reward();
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}