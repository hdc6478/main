namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import teammate = msg.teammate;
    import act_reward = msg.act_reward;
    import LanDef = game.localization.LanDef;

    export class TongtiangeRankMdr1 extends EffectMdrBase implements UpdateItem {
        protected _view: RankView = this.mark("_view", RankView);
        protected _proxy: TongtiangeProxy;
        protected _endTime: number;
        /**1个人排名，2宗门排名*/
        protected _type = TongtiangeRankType.Personal;
        protected _listData: eui.ArrayCollection;
        protected _maxRankNum = 0;//最大展示的排名数量

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Tongtiange);
            this._view.list_rank.itemRenderer = TongtiangeRankItem;
            this._view.list_rank.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.timeItem.visible = true;
            this._view.btn_god.visible = false;
            this._view.img_type2.source = `jianzaocishu`;
            this._view.img_type3.source = `paihangjiangli`;
            this._view.btn_lastRank.visible = true;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_lastRank, egret.TouchEvent.TOUCH_TAP, this.onClickLastRank, this);
            this.onNt(ActivityEvent.ON_UPDATE_TONGTIANGE_RANK_INFO, this.onUpdateView, this);
        }

        protected onShow(): void {
            super.onShow();
            this._endTime = this._proxy.getEndTime();
            if (this._endTime) {
                TimeMgr.addUpdateItem(this, 1000);
                this.update(TimeMgr.time);
            }
            this._proxy.c2s_attic_rank_show(this._type);
        }

        protected onHide(): void {
            super.onHide();
        }

        private onUpdateView(): void {
            this.updateModel();
            this.updateListData();
            this.updateRankLabel();
        }

        //更新模型
        private updateModel(): void {
            let topPlayer = this.getTopPlayer();
            if (topPlayer) {
                this.updateRankUIRole(this._view.grp_eff, topPlayer);
            }
        }

        private _rewardList: act_reward[];

        private getRewardList(): act_reward[] {
            if (this._rewardList) {
                return this._rewardList;
            }
            let actData = this._proxy.getActData(true);
            if (!actData || !actData.reward_list) {
                return null;
            }
            let list: act_reward [] = [];
            for (let i = 0; i < actData.reward_list.length; i++) {
                let item = actData.reward_list[i];
                if (item && item.cond_1 && item.cond_1[0] == this._type) {
                    list.push(item);
                }
            }
            this._rewardList = list;
            return list;
        }

        private updateListData(): void {
            let list: ITongtiangeRankItemData[] = [];
            let rewardList = this.getRewardList();
            let size = rewardList.length;
            let preRankNo = 0;
            let model = this._proxy.model;
            let teammateMap = this._type == TongtiangeRankType.Guild ? model.guild_rank_list : model.role_rank_list;
            for (let i = 0; i < size; i++) {
                let item: act_reward = rewardList[i];
                let rankNo = item.cond_2[0];
                let rankData: ITongtiangeRankItemData = {
                    type: this._type,
                    rewards: item.rewards,
                    isShow: item.cond_3 && item.cond_3[0] == 1//可查看排名
                };
                if (preRankNo + 1 == rankNo && i != size - 1) {
                    //具体名次，显示x
                    rankData.teammate = teammateMap[rankNo];
                    rankData.rankNo = rankNo;
                } else if (i == size - 1) {
                    //最后一名，显示xx+
                    rankData.rankRange = [rankNo - 1];
                    this._maxRankNum = rankNo - 1;
                } else {
                    //范围名次，显示x-xx
                    rankData.rankRange = [preRankNo + 1, rankNo];
                }
                preRankNo = rankNo;
                list.push(rankData);
            }
            this._listData.replaceAll(list);
        }

        private updateRankLabel(): void {
            let isGuild = this._type == TongtiangeRankType.Guild;//是宗门

            let cntDesc = isGuild ? getLanById(LanDef.tongtiange_tips17) : getLanById(LanDef.tongtiange_tips18);
            let buildCnt = this._proxy.model.rank_value;
            this._view.lab_num.textFlow = TextUtil.parseHtml(StringUtil.substitute(cntDesc,
                [TextUtil.addColor(buildCnt + '', WhiteColor.GREEN)]));

            let rankBuildCnt = this._proxy.getRankCnt(isGuild);//上榜所需次数
            //未达到上榜所需次数
            if (buildCnt < rankBuildCnt) {
                this._view.lab_rank.textFlow = TextUtil.parseHtml(StringUtil.substitute(getLanById(LanDef.tongtiange_tips19), [rankBuildCnt]));
                return;
            }
            let rankNo = this._proxy.model.rank_no;
            let rankNoDesc = rankNo ? rankNo + '' : getLanById(LanDef.tishi_13);
            let rankDesc = isGuild ? getLanById(LanDef.tongtiange_tips15) : getLanById(LanDef.tongtiange_tips16);
            this._view.lab_rank.textFlow = TextUtil.parseHtml(StringUtil.substitute(rankDesc,
                [TextUtil.addColor(rankNoDesc, WhiteColor.GREEN)]));
        }

        //获取第一名玩家
        private getTopPlayer(): teammate {
            let model = this._proxy.model;
            let rankMap = this._type == TongtiangeRankType.Guild ? model.guild_rank_list : model.role_rank_list;
            if (rankMap[1]) {
                return rankMap[1];
            }
            return null;
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }

        //上一次排行榜
        private onClickLastRank(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.TongtiangeLastRank, [this._type, this._maxRankNum]);
        }
    }

    export class TongtiangeRankMdr2 extends TongtiangeRankMdr1 {
        /**1个人排名，2宗门排名*/
        protected _type = TongtiangeRankType.Guild;
    }
}