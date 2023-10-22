namespace game.mod.activity {

    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;

    export class TongtiangeMdr3 extends MdrBase implements UpdateItem {
        private _view: BaseGiftView = this.mark("_view", BaseGiftView);
        private _proxy: TongtiangeProxy;
        private _listData: eui.ArrayCollection;
        private _endTime: number;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Tongtiange);
            this._view.list.itemRenderer = TongtiangeItem2;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.img_banner.source = ResUtil.getUiJpg(`tongtiange_banner3`);
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_INFO, this.onUpdateView, this);
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_GUILD_CHALLENGE_INFO, this.onUpdateView, this);
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_CHALLENGE_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._endTime = this._proxy.getEndTime();
            if (this._endTime) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
            if (RoleUtil.isInUnion()) {
                this._proxy.c2s_attic_guild_challenge_show();
            } else {
                this.onUpdateView();
            }
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            this._endTime = 0;
            super.onHide();
        }

        private onUpdateView(): void {
            let cfgObj = this._proxy.getChallengeCfgByType(2);
            let list: ITongtiangeItemData2[] = [];
            for (let key in cfgObj) {
                let cfg = cfgObj[key];
                list.push({
                    type: TongtiangeRankType.Guild,
                    cfg,
                    status: this._proxy.getGuildChallengeStatus(cfg.index),
                    val: this._proxy.getBuildCnt(true)
                });
            }
            SortTools.sortReward(list);
            this._listData.replaceAll(list);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}