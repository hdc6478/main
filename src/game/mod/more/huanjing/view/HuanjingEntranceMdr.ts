namespace game.mod.more {

    import GameNT = base.GameNT;
    import LanDef = game.localization.LanDef;
    import facade = base.facade;

    export class HuanjingEntranceMdr extends MdrBase {
        private _view: HuanjingEntranceView = this.mark("_view", HuanjingEntranceView);
        private _proxy: HuanjingProxy;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Huanjing);
            this._view.list.itemRenderer = HuanjingEntranceItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.btn0.setHintStyle(5, 5);
            this._view.btn1.setHintStyle(5, 5);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn0, egret.TouchEvent.TOUCH_TAP, this.onClickBtn0, this);
            addEventListener(this._view.btn1, egret.TouchEvent.TOUCH_TAP, this.onClickBtn1, this);
            this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onUpdateHint, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let cfgs = this._proxy.getHuanjingParamCfgs();
            this._listData.replaceAll(cfgs);

            this.updateBtnHint();
        }

        //浮尘灵壶
        private onClickBtn0(): void {
            let linghuProxy: IFuchenlinghuProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Fuchenlinghu);
            if (linghuProxy.isOpenSea(SeaType.Sea1, true)) {
                ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Fuchenlinghu);
            }
        }

        //仙界之海排行榜
        private onClickBtn1(): void {
            if (!ViewMgr.getIns().checkViewOpen(OpenIdx.Sea, true)) {
                return;
            }
            let seaProxy: ISeaProxy = getProxy(ModName.Yijie, ProxyType.Sea);
            if (seaProxy.canOpenRank()) {
                ViewMgr.getIns().showView(ModName.Yijie, YijieViewType.SeaRankMain);
            } else {
                PromptBox.getIns().show(getLanById(LanDef.huanjing_tips12));
            }
        }

        private updateBtnHint(): void {
            this._view.btn0.setHint(this._proxy.getFuchenlinghuHint());
            this._view.btn1.setHint(this._proxy.getSeaRankHint());
        }

        // todo
        private onUpdateHint(n: GameNT): void {
            let data: IHintData = n.body;
            if (data.node == HintMgr.getType(this._proxy.collectHintPath)
                || data.node == HintMgr.getType(this._proxy.growHintPath)) {
                this.updateView();
            }
            //浮尘灵壶
            if (data.node == HintMgr.getType([ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Fuchenlinghu])) {
                this._view.btn0.setHint(data.value);
            }
        }
    }
}