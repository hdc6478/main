namespace game.mod.compete {

    import ArrayCollection = eui.ArrayCollection;
    import TourpvpChallengeConfig = game.config.TourpvpChallengeConfig;
    import TourpvpPreciousConfig = game.config.TourpvpPreciousConfig;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class YouliTreasureMdr extends MdrBase {
        private _view: YouliTreasureView = this.mark("_view", YouliTreasureView);

        private _proxy: CompeteProxy;

        private _awardDatas: ArrayCollection;

        private _index: number;

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
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onGetBtnClick);
        }

        protected onShow(): void {
            super.onShow();
            this._index = this._showArgs;
            this.updateInfo();
        }

        protected onHide(): void {
            super.onHide();
        }

        protected updateInfo() {
            if(!this._index) {
                return;
            }
            let chaCfg: TourpvpChallengeConfig = this._proxy.getChallengeCfg(this._index);
            this._view.lab_desc.text = chaCfg ? chaCfg.desc : "";
            
            let preCfg: TourpvpPreciousConfig = this._proxy.getPreciousCfg(this._proxy.giftIndex);
            this._awardDatas.replaceAll(preCfg.gift_award);
            
            this._view.btn_get.labelDisplay.text = "";    // getLanById(LanDef.tishi_29);
            this._view.btn_get.setCost(preCfg.price);
        }
        
        private onGetBtnClick(e: TouchEvent): void {
            this._proxy.c2s_tour_challenge(0, YouliType.Treasure);
            this.hide();
        }

    }
}