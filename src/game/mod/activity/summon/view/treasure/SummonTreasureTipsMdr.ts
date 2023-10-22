namespace game.mod.activity {

    import PropConfig = game.config.PropConfig;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;

    export class SummonTreasureTipsMdr extends MdrBase {
        private _view: SummonTreasureTipsView = this.mark("_view", SummonTreasureTipsView);
        private _proxy: SummonTreasureProxy;
        private _listData: eui.ArrayCollection;
        _showArgs: PropData;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._proxy = this.retProxy(ProxyType.SummonTreasure);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_go, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected onShow(): void {
            super.onShow();
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            this._view.propTips.updateShow(this._showArgs);

            let cfg: PropConfig = this._showArgs.cfg;
            this._view.descItem.updateShow(cfg.desc);

            if (cfg.param1) {
                let rewardCfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, cfg.param1[0][0]);
                this._listData.replaceAll(rewardCfg.content);
            }
        }

        // todo
        private onClick(): void {
            // PromptBox.getIns().show(`待处理`);
            ViewMgr.getIns().showView(ModName.Activity, MainActivityViewType.SummonMain, SummonMainBtnType.Treasure);
            this.hide();
        }
    }
}