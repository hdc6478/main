namespace game.mod.activity {

    import TreasureboxConfig = game.config.TreasureboxConfig;
    import RewardPreviewConfig = game.config.RewardPreviewConfig;
    import GameNT = base.GameNT;

    export class SummonTreasureBoxMdr extends EffectMdrBase {
        private _view: SummonTreasureBoxView = this.mark("_view", SummonTreasureBoxView);
        private _proxy: SummonTreasureProxy;
        private _listData: eui.ArrayCollection;

        _showArgs: TreasureboxConfig;

        public constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.SummonTreasure);
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.btn_onekey.setImage('yijiankaiqi');
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdateByBagType, this);
        }

        protected onShow(): void {
            super.onShow();
            if (!this._showArgs) {
                return;
            }
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;

            this._view.secondPop.updateTitleStr(this._showArgs.name);

            this._view.img_icon.y = this._showArgs.index == 1 ? 141 : 194;

            this.updateView();
            this.showEft();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let cfg = this._showArgs;
            if (cfg.picture) {
                this._view.img_icon.source = cfg.picture;
            }
            this.updateCost();

            let propCfg = GameConfig.getPropConfigById(cfg.itemid);
            if (!propCfg) {
                return;
            }
            if (propCfg.param1) {
                let rewardCfg: RewardPreviewConfig = getConfigByNameId(ConfigName.RewardPreview, propCfg.param1[0][0]);
                this._listData.replaceAll(rewardCfg.content);
            }
        }

        private updateCost(): void {
            let cfg = this._showArgs;
            this._view.costIcon.updateShow([cfg.itemid, cfg.cost]);
            this._view.btn_onekey.setHint(this._proxy.canOneKeyByIndex(cfg.index));
        }

        private onClick(): void {
            let index = this._showArgs.index;
            if (this._proxy.canOneKeyByIndex(index, true)) {
                this._proxy.c2s_baozangbox_onekey_open(index);
            }
        }

        private onBagUpdateByBagType(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(BagType.BaozangSuipian) > -1) {
                this.updateCost();
            }
            this.showEft();
        }

        private showEft(): void {
            //判断按钮特效是否显示
            let cfg = this._showArgs;
            let isShow = this._proxy.canOneKeyByIndex(cfg.index);
            this.removeEft();
            isShow ? this.addEftByParentScale(this._view.btn_onekey.group_eft) : this.removeEft();
        }
    }
}