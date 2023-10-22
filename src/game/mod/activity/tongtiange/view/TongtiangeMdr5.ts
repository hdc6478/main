namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import AtticExchangeConfig = game.config.AtticExchangeConfig;
    import GameNT = base.GameNT;

    export class TongtiangeMdr5 extends MdrBase implements UpdateItem {
        private _view: TongtiangeView5 = this.mark("_view", TongtiangeView5);
        private _proxy: TongtiangeProxy;
        private _listData: eui.ArrayCollection;
        private _endTime: number;
        private _curLayer = 1;//当前层数，默认第一层
        private _layerItemAry: TongtiangeLayerItem[] = [];
        private _lineItemAry: CommonLine[] = [];

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Tongtiange);
            this._view.list.itemRenderer = TongtiangeRewardItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            let i = 0;
            while (this._view[`layer${i}`]) {
                this._layerItemAry.push(this._view[`layer${i}`]);
                i++;
            }
            i = 0;
            while (this._view[`line${i}`]) {
                this._lineItemAry.push(this._view[`line${i}`]);
                i++;
            }
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            for (let item of this._layerItemAry) {
                addEventListener(item, egret.TouchEvent.TOUCH_TAP, this.onClickLayer, this);
            }
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_INFO, this.onUpdateView, this);
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_EXCHANGE_INFO, this.onUpdateView, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this._curLayer = 1;//初始第一层
            this._endTime = this._proxy.getEndTime();
            if (this._endTime) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
            this.onUpdateView();
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onUpdateView(): void {
            this.updateLayerView();
            this.updateListData();
        }

        private updateLayerView(): void {
            let isActedAry: number[] = [];
            for (let i = 1; i <= this._layerItemAry.length; i++) {
                let item = this._layerItemAry[i - 1];
                let isActed = this._proxy.isLayerActed(i);
                isActedAry[i - 1] = isActed ? 1 : 0;
                item.data = {
                    layer: i,
                    isSel: i == this._curLayer,
                    showHint: this._proxy.getExchangeLayerHint(i)
                } as ITongtiangeLayerItemData;
            }
            for (let i = 0; i < this._lineItemAry.length; i++) {
                let line = this._lineItemAry[i];
                let isActed = isActedAry[i + 1];
                if (isActed) {
                    line.setYellow();
                } else {
                    line.setBlue();
                }
            }
        }

        private updateListData(): void {
            let cfg: AtticExchangeConfig = getConfigByNameId(ConfigName.TongtiangeExchange, this._curLayer);
            if (!cfg) {
                return;
            }
            let list: ITongtiangeRewardItemData[] = [];
            for (let i = 0; i < cfg.give_items.length; i++) {
                list.push({
                    cfg,
                    status: this._proxy.getExchangeStatus(cfg.index, i + 1),
                    maxCnt: this._proxy.getExchangeMaxCnt(),
                    boughtCnt: this._proxy.getExchangeBoughtCnt(cfg.index, i + 1)
                });
            }
            this._listData.replaceAll(list);
        }

        private onClickLayer(e: egret.TouchEvent): void {
            let target = e.currentTarget;
            let idx = this._layerItemAry.indexOf(target);
            if (idx + 1 == this._curLayer || !this._proxy.isLayerActed(idx + 1, true)) {
                return;
            }
            this._curLayer = idx + 1;
            for (let i = 1; i <= this._layerItemAry.length; i++) {
                let item = this._layerItemAry[i - 1];
                item && item.updateSel(i == this._curLayer);
            }
            this.updateListData();
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }

        private onRoleUpdate(n: GameNT): void {
            let keys = n.body as string[];
            if (keys.indexOf(RolePropertyKey.Tianxingzhu) > -1) {
                this.onUpdateView();
            }
        }
    }
}