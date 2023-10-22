namespace game.mod.store {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import ShopConfig = game.config.ShopConfig;
    import LanDef = game.localization.LanDef;
    import GameNT = base.GameNT;

    export class StoreType1Mdr extends MdrBase implements UpdateItem {
        private _view: StoreType1View = this.mark("_view", StoreType1View);
        private _proxy: StoreProxy;
        private _listData: eui.ArrayCollection;
        private _endTime = 0;//结束时间

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Store);
            this._view.list.itemRenderer = StoreType1Item;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(StoreEvent.ON_UPDATE_TYPE_INFO_1, this.onUpdateInfo, this);
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this._endTime = TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, 1);

            this.updateListData();
            this.updateBigReward();

            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        private updateListData(): void {
            let cfgs: ShopConfig[] = this._proxy.getShowCfgListForType1();
            this._listData.replaceAll([...cfgs]);
        }

        private onUpdateInfo(): void {
            this.updateListData();
        }

        protected onHide(): void {
            super.onHide();
            TimeMgr.removeUpdateItem(this);
        }

        private updateBigReward(): void {
            let cfg = GameConfig.getParamConfigById('store_big_reward');
            if (cfg) {
                this._view.icon_bigreward.data = cfg.value;
            }
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime < 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.lb_time.textFlow = TextUtil.parseHtml(getLanById(LanDef.battle_cue40) + `：` + TimeUtil.formatSecond(leftTime, 'HH时mm分'));
        }

        protected onRoleUpdate(n: GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.vip_lv) > -1) {
                this.updateListData();
            }
        }
    }
}