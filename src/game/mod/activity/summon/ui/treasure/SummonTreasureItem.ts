namespace game.mod.activity {

    import TreasureboxConfig = game.config.TreasureboxConfig;

    export class SummonTreasureItem extends BaseRenderer {
        public img_eft: eui.Image;
        public img_icon: eui.Image;
        public redPoint: eui.Image;
        public gr_eft: eui.Group;
        public bar: game.mod.ProgressBarComp;

        data: TreasureboxConfig;
        private _proxy: SummonTreasureProxy;

        constructor() {
            super();
            this.skinName = `skins.activity.SummonTreasureItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.SummonTreasure);
            this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let cfg = this.data;
            if (!cfg) {
                return;
            }

            let bagCnt = BagUtil.getPropCntByIdx(cfg.itemid);
            this.bar.show(bagCnt, cfg.cost, false, 0, false, ProgressBarType.Value);
            let hint = bagCnt >= cfg.cost;
            this.redPoint.visible = hint;
            this.img_eft.visible = hint;
            if (cfg.picture) {
                this.img_icon.source = cfg.picture;
            }
        }

        private onClick(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.SummonTreasureBox, this.data);
        }
    }
}