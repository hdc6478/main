namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import TourpvpChallengeConfig = game.config.TourpvpChallengeConfig;
    import tour_role_info = msg.tour_role_info;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;

    export class YouliSpecialKillerMdr extends EffectMdrBase {
        private _view: YouliKillerView = this.mark("_view", YouliKillerView);

        private _proxy: CompeteProxy;

        private _awardDatas: ArrayCollection;

        private _data: tour_role_info;

        private _clickBtn: boolean;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();

            this._view.horizontalCenter = 0;
            this._view.verticalCenter = 0;

            this._awardDatas = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._awardDatas;

            this._proxy = this.retProxy(ProxyType.Compete);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(CompeteEvent.UPDATE_YOULI_INFO, this.updateInfo, this);
            this.onNt(CompeteEvent.UPDATE_YOULI_KILLER_FIGHT, this.openFight, this);
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onGetBtnClick);
        }

        protected onShow(): void {
            super.onShow();

            this._data = this._showArgs;

            this._view.img_bg.source = ResUtil.getUiPng("youli_special_killer_bg");
            this._view.img_title.source = "youli_special_killer";

            this.updateInfo();
        }

        protected onHide(): void {
            super.onHide();
        }

        protected updateInfo() {
            if (!this._data) {
                return;
            }
            let isMoreThan: boolean = this._data.showpower.toNumber() > RoleVo.ins.showpower.toNumber();
            this._view.currentState = isMoreThan ? "more_than_power" : "power";
            if (!isMoreThan) {
                this.addBmpFont(this._data.showpower.toNumber() + "", BmpTextCfg[BmpTextType.CommonPower], this._view.grp_power);
            }

            let chaCfg: TourpvpChallengeConfig = this._proxy.getChallengeCfg(this._data.index);
            this._view.lab_desc.text = chaCfg ? chaCfg.desc : "";
            this._awardDatas.replaceAll(chaCfg.reward_big);

            this._view.btn_get.labelDisplay.text = "狩猎";
        }

        private onGetBtnClick(e: TouchEvent): void {
            this._clickBtn = true;
            this._proxy.c2s_tour_challenge(0, YouliType.SpecialKiller);
            this.hide();
        }

        private openFight(e: TouchEvent): void {
            if (!this._clickBtn) {
                return;
            }
            this._clickBtn = false;
            facade.showView(ModName.Compete, CompeteViewType.YouliKillerFight, this._data);
            this.hide();
        }

    }
}