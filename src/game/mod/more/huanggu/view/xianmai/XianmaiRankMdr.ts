namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import LanDef = game.localization.LanDef;

    export class XianmaiRankMdr extends EffectMdrBase implements UpdateItem {
        private _view: RankView = this.mark("_view", RankView);

        private _itemList: ArrayCollection;
        private _proxy: XianmaiProxy;
        private _endTime: number;
        protected _type: number = 2;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Xianmai);

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = RankRewardRender;
            this._view.list_rank.dataProvider = this._itemList;

            this._view.btn_god.visible = false;
            this._view.timeItem.visible = true;

            this._view.img_type2.source = "xianmaijifen";
            this._view.img_type3.source = "paimingjiangli";
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(MoreEvent.ON_UPDATE_XIANMAI_RANK_SHOW, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this.onUpdateTime();
            this.onUpdateView();
            this.onCount();
        }

        private onCount(): void {
            let cfgArr = getConfigByNameId(ConfigName.XianmaiRankReward, this._type);
            let start: number = cfgArr[1].rank_no[0];
            let end: number = cfgArr[Object.keys(cfgArr).length].rank_no[0] - 1;
            this._proxy.c2s_xianmai_rank_show(this._type, start, end);
        }

        private onUpdateTime(): void {
            this._endTime = TimeUtil.getNextWeekTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        private onUpdateView(): void {
            let list = this._proxy.getRanks(this._type);
            let topInfo = list && list[0];
            if (topInfo && topInfo.value) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }

            let infos: RankRewardRenderData[] = this._proxy.getRankList(this._type);
            this._itemList.replaceAll(infos);

            this._view.lab_rank.textFlow = TextUtil.parseHtml(this._proxy.getRankStr(this._type));
            this._view.lab_num.textFlow = TextUtil.parseHtml(this._proxy.getRankCountStr(this._type));
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this._endTime = TimeUtil.getNextWeekTime();
                this.onCount();
            }
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }
    }
}