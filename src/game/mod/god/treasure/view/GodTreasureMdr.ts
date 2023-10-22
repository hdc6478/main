namespace game.mod.god {

    import ArrayCollection = eui.ArrayCollection;
    import ItemTapEvent = eui.ItemTapEvent;
    import TiandiYuhuangQiandaoConfig = game.config.TiandiYuhuangQiandaoConfig;

    export class GodTreasureMdr extends MdrBase {
        private _view: GodTreasureView = this.mark("_view", GodTreasureView);
        private _listData: ArrayCollection = new ArrayCollection();
        private _proxy: GodProxy;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.God);

            this._view.list.itemRenderer = IconReward;
            this._view.list.dataProvider = this._listData;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClick);
            this.onNt(GodEvent.ON_UPDATE_TREASURE_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {

            super.onShow();
            this.onUpdateView();
        }

        private onUpdateView(): void {
            let list: IconRewardData[] = [];
            let cfgArr: TiandiYuhuangQiandaoConfig[] = getConfigListByName(ConfigName.TiandiYuhuangQiandao);
            let day: number = this._proxy.signDay;
            let sign: boolean = this._proxy.isSign;
            for (let cfg of cfgArr) {
                let showHint: boolean = !sign && day + 1 == cfg.index && this._proxy.getActivate(GodType.Type1);
                let isGot: boolean = day >= cfg.index;
                let prop = PropData.create(cfg.rewards[0][0], cfg.rewards[0][1], showHint ? IconShowType.NotTips : IconShowType.Reward);
                list.push({prop, showHint, isGot});
            }
            this._listData.replaceAll(list);

            this._view.reward.setData(day);
        }

        private onClick(e: ItemTapEvent): void {
            if (e.item.showHint) {
                this._proxy.c2s_tiandi_yuhuang_qiandao();
            }
        }

        protected onHide(): void {
            super.onHide();
        }
    }
}