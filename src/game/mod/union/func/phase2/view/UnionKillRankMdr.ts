namespace game.mod.union {

    import ArrayCollection = eui.ArrayCollection;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import LanDef = game.localization.LanDef;

    export class UnionKillRankMdr extends EffectMdrBase implements UpdateItem {
        private _view: RankView = this.mark("_view", RankView);

        private _itemList: ArrayCollection;
        private _proxy: UnionProxy;
        private _end_time: number;
        protected _type: number = UnionRankType.Guild;
        private _tips: boolean = false;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Union);

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = RankRewardRender;
            this._view.list_rank.dataProvider = this._itemList;

            this._view.btn_god.visible = false;
            this._view.timeItem.visible = true;

            this._view.img_type2.source = "zhanyaojifen";
            this._view.img_type3.source = "paimingjiangli";
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(UnionEvent.ON_UPDATE_KILL_RANK_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._view.updateImgTypeHorizontal(this._type == UnionRankType.Guild);
            this._proxy.c2s_guild_zhanyaotai_request(2, this._type);
            super.onShow();
            this.onUpdateTime();
        }

        private onUpdateTips(): void {
            if (this._tips) {
                return;
            }
            if (this._type == UnionRankType.Guild) {
                let list = this._proxy.getRankProps(UnionRank.Kill);
                if (list && list.length) {
                    this._tips = true;
                    ViewMgr.getIns().showUnionRankTips(UnionRank.Kill);
                }
            }
        }

        private onUpdateTime(): void {
            this._end_time = TimeUtil.getNextWeekTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.updateTime();
        }

        private onUpdateView(): void {
            this._view.masterItem.visible = false;
            let list = this._proxy.getRanks(this._type);
            let topInfo = list && list[0];
            if (topInfo && topInfo.value) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);

                if (this._type == UnionRankType.Guild) {
                    this._view.masterItem.visible = true;
                    this._view.masterItem.updateShow(topInfo.guild_name);
                }
            }

            let infos: RankRewardRenderData[] = this._proxy.getBossRankList(this._type);
            this._itemList.replaceAll(infos);

            this._view.lab_rank.textFlow = TextUtil.parseHtml(this._proxy.getBossRankStr(this._type));
            this._view.lab_num.textFlow = TextUtil.parseHtml(this._proxy.getBossRankCountStr(this._type));

            this.onUpdateTips();
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
            this._tips = false;
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let leftTime = this._end_time - TimeMgr.time.serverTimeSecond;
            if (leftTime <= 0) {
                this._end_time = TimeUtil.getNextWeekTime();
            }
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }
    }
}