namespace game.mod.activity {

    import TreasureboxConfig = game.config.TreasureboxConfig;
    import GameNT = base.GameNT;

    export class SummonTreasureMdr extends EffectMdrBase {
        private _view: SummonTreasureView = this.mark("_view", SummonTreasureView);
        private _proxy: SummonTreasureProxy;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.SummonTreasure);
            this._view.list.itemRenderer = SummonTreasureList;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.btn_onekey.setImage('yijiankaiqi');
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.treasureItem, egret.TouchEvent.TOUCH_TAP, this.onClickTreasure, this);
            addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
            this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdateByBagType, this);
        }

        protected onShow(): void {
            super.onShow();
            this._view.scroller.stopAnimation();
            this._view.scroller.viewport.scrollV = 0;
            this.updateView();
            this.addEftByParentScale(this._view.btn_onekey.group_eft);
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let cfgList: TreasureboxConfig[] = getConfigListByName(ConfigName.TreasureBox);
            let list: TreasureboxConfig[][] = [];
            let cfgs = cfgList.slice(1);
            while (cfgs.length > 0) {
                list.push(cfgs.slice(0, 3));
                cfgs = cfgs.slice(3);
            }
            this._listData.replaceAll(list);

            this._view.treasureItem.data = cfgList[0];

            let can = this._proxy.canOpenOneKey();
            this._view.btn_onekey.visible = can;
            this._view.img_cond.visible = !can;
            if (can) {
                this._view.btn_onekey.setHint(this._proxy.canOneKey());
            }
        }

        private onClickTreasure(): void {
            let cfg = this._proxy.getConfig(1);
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.SummonTreasureBox, cfg);
        }

        private onClickOneKey(): void {
            if (this._proxy.canOneKey(true)) {
                this._proxy.c2s_baozangbox_onekey_open();
            }
        }

        private onBagUpdateByBagType(n: GameNT): void {
            let types = n.body as number[];
            if (types.indexOf(BagType.BaozangSuipian) > -1) {
                this.updateView();
            }
        }
    }
}