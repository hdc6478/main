namespace game.mod.more {

    import UpdateItem = base.UpdateItem;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;

    export class XianjieLuandouRankMdr extends EffectMdrBase implements UpdateItem {
        private _view: RankView = this.mark("_view", RankView);
        private _proxy: XianjieLuandouProxy;
        private _listData: eui.ArrayCollection;
        private _type = 1;//1活动上期排名 2活动本期排名

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.XianjieLuandou);
            this._view.list_rank.itemRenderer = RankRewardRender;
            this._view.list_rank.dataProvider = this._listData = new eui.ArrayCollection();

            this._view.img_type2.source = 'jifen';
            this._view.img_type3.source = 'paihangjiangli';

            this._view.scr["$hasScissor"] = true;

            this._view.timeItem.visible = true;
        }

        protected addListeners(): void {
            super.addListeners();
            this.onNt(MoreEvent.ON_XIANJIE_PVP_RANK_INFO_UPDATE, this.updateView, this);
        }

        protected onShow(): void {
            super.onShow();

            this._type = 1;
            this._proxy.c2s_xianjie_pvp_oper(XianjieLuandouOperType.Oper2, this._type);//本期
            // this.updateView();

            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
        }

        protected onHide(): void {
            super.onHide();
        }

        private updateView(): void {
            let topInfo = this._proxy.getRankInfo(1);
            if (topInfo) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }

            let rewardList = this._proxy.getRankRewardData();
            this._listData.replaceAll(rewardList);

            let myRank = this._proxy.my_rank;
            let rankNo = myRank && myRank.rank_num || 0;
            let myRankStr = rankNo ? rankNo + '' : getLanById(LanDef.tishi_13);
            this._view.lab_rank.textFlow = TextUtil.parseHtml(getLanById(LanDef.tishi_12) + "：" + myRankStr);
            let valueStr = myRank && myRank.value ? myRank.value.toString() : '0';
            this._view.lab_num.textFlow = TextUtil.parseHtml(getLanById(LanDef.battle_cue46) + '：' + valueStr);
        }

        update(time: base.Time) {
            let endTime = this._proxy.end_time;//todo
            let leftTime = endTime - time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime, '', TextUtil.addColor('已结束', BlackColor.RED));
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
            }
        }
    }
}