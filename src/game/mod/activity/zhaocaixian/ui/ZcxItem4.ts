namespace game.mod.activity {

    import ZcxExchangeConfig = game.config.ZcxExchangeConfig;
    import TouchEvent = egret.TouchEvent;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class ZcxItem4 extends BaseListenerRenderer {
        public list: eui.List;
        public icon_target: game.mod.Icon;
        public btn_exchange: game.mod.Btn;
        public lb_cnt: eui.Label;

        data: ZcxExchangeConfig;
        private _proxy: ZcxProxy;
        private _listData: eui.ArrayCollection;
        private _leftCnt = 0;//剩余次数

        constructor() {
            super();
            this.skinName = `skins.activity.ZcxItemSkin4`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Zhaocaixian);
            this.list.itemRenderer = ZcxIconItem;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_exchange, this.onClick, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let cfg = this.data;
            if (!cfg) {
                return;
            }
            this._listData.replaceAll([...cfg.costs]);
            this.icon_target.data = cfg.rewards[0];
            let left_cnt = this._proxy.getExchangeLeftCnt(cfg.index);
            this._leftCnt = left_cnt;
            let str = TextUtil.addColor(`${left_cnt}/${cfg.count}`,
                left_cnt > 0 ? WhiteColor.GREEN : WhiteColor.RED);
            this.lb_cnt.textFlow = TextUtil.parseHtml(`每周：` + str);

            this.btn_exchange.setHint(this._proxy.canExchange(cfg.index));
        }

        private onClick(): void {
            if (this._leftCnt < 1) {
                PromptBox.getIns().show(getLanById(LanDef.zcx_tips23));
                return;
            }
            facade.showView(ModName.Activity, MainActivityViewType.ZcxBuyTips, this.data);
        }
    }
}