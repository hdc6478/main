namespace game.mod.more {

    import ArrayCollection = eui.ArrayCollection;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import LanDef = game.localization.LanDef;

    export class XianweiRankMdr extends EffectMdrBase implements UpdateItem {
        private _view: RankView = this.mark("_view", RankView);

        private _itemList: ArrayCollection;
        private _proxy: XianweiProxy;
        private _endTime: number;

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Xianwei);

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = RankRewardRender;
            this._view.list_rank.dataProvider = this._itemList;

            this._view.btn_god.visible = false;
            this._view.timeItem.visible = true;

            this._view.img_type2.source = "meishuzi_xianshoujingyan";
            this._view.img_type3.source = "paimingjiangli";
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(MoreEvent.ON_UPDATE_XIANWEI_RANK_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            this._proxy.c2s_xianwei_rank_show();
            super.onShow();
            this.onUpdateTime();
        }

        private onUpdateTime(): void {
            this._endTime = TimeUtil.getNextWeekTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.updateTime();
        }

        private onUpdateView(): void {
            this._view.masterItem.visible = false;
            let list = this._proxy.ranks;
            let topInfo = list && list[0];
            if (topInfo && topInfo.value) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }

            let infos: RankRewardRenderData[] = this._proxy.getRanks();
            this._itemList.replaceAll(infos);

            this._view.lab_rank.textFlow = TextUtil.parseHtml(this._proxy.getRankStr());
            this._view.lab_num.textFlow = TextUtil.parseHtml(this._proxy.getRankCountStr());
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
                this._proxy.c2s_xianwei_rank_show();
            }
            this._view.timeItem.updateLeftTime(leftTime, "", getLanById(LanDef.battle_cue29));
        }
    }
}