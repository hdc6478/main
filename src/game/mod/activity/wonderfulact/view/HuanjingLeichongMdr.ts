namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import HuanjingLeichongConfig = game.config.HuanjingLeichongConfig;
    import GameNT = base.GameNT;

    /**幻境累充*/
    export class HuanjingLeichongMdr extends MdrBase implements UpdateItem {
        private _view: BaseGiftView = this.mark("_view", BaseGiftView);
        private _proxy: FuchenlinghuProxy;
        private _listData: eui.ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Fuchenlinghu);
            this._view.list.itemRenderer = HuanjingLeichongItem;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();

            this._view.updateBanner('huanjingleichong_banner', true);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(RoleEvent.ON_ROLE_UPDATE, this.onRoleUpdate, this);
            this.onNt(ActivityEvent.ON_UPDATE_FUCHENLINGHU_INFO, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let list: IHuanjingLeichongItemData[] = [];
            let cfgList: HuanjingLeichongConfig[] = getConfigListByName(ConfigName.HuanjingLeichong) || [];
            for (let cfg of cfgList) {
                list.push({
                    cfg,
                    status: this._proxy.getLeichongStatus(cfg.index)
                });
            }
            SortTools.sortReward(list);
            this._listData.replaceAll(list);

            if (cfgList && cfgList[cfgList.length - 1]) {
                let reward = cfgList[cfgList.length - 1].reward[0];
                this._view.updateBigReward(reward);
            }
        }

        update(time: base.Time) {
            let endTime = TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, 1);
            this._view.timeItem.updateTime(endTime);
        }

        private onRoleUpdate(n: GameNT): void {
            let keys: string[] = n.body;
            if (keys.indexOf(RolePropertyKey.day_charge_rmb) > -1) {
                this.updateView();
            }
        }
    }
}