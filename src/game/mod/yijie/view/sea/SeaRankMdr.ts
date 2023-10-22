namespace game.mod.yijie {

    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import ArrayCollection = eui.ArrayCollection;
    import HuanjingzhihaiIndexConfig = game.config.HuanjingzhihaiIndexConfig;
    import HuanjingzhihaiBossRankConfig = game.config.HuanjingzhihaiBossRankConfig;
    import Handler = base.Handler;
    import facade = base.facade;


    export class SeaRankMdr extends EffectMdrBase implements UpdateItem{
        private _view: RankView = this.mark("_view", RankView);
        private _proxy: SeaProxy;
        private _itemList: ArrayCollection;
        private _canDraw: boolean;//全民奖励是否可领取

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;
            this._proxy = this.retProxy(ProxyType.Sea);

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = RankRewardRender;
            this._view.list_rank.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            this.onNt(SeaEvent.ON_SEA_RANK_UPDATE, this.updateShow, this);
            this.onNt(SeaEvent.ON_SEA_INFO_UPDATE, this.updateReward, this);
        }

        protected onShow(): void {
            super.onShow();

            this.reqRankInfo();

            this.initShow();
            this.updateShow();
            this.updateReward();
            this.updateTime();
            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickReward(): void {
            if(!this._canDraw){
                PromptBox.getIns().show(getLanById(LanDef.shoulie_point));
                return;
            }
            let type = this._proxy.rankType;
            this._proxy.c2s_huanjingzhihai_click(SeaOpType.RankReward, type);
        }

        private reqRankInfo(): void {
            let type = this._proxy.rankType;
            this._proxy.c2s_huanjingzhihai_click(SeaOpType.Rank, type);
        }

        private initShow(): void {
            this._view.timeItem.visible = true;
            this._view.btn_reward.visible = true;
            this._view.img_type2.source = "leijijibai";
            this._view.img_type3.source = "paimingjiangli";
        }

        private updateShow(): void {
            let type = this._proxy.rankType;
            let topInfo = this._proxy.getTopRank(type);
            if(topInfo && topInfo.value) {
                //场景排行榜做上榜限制
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }

            let myRankInfo = this._proxy.getMyRank(type);

            let cfg: HuanjingzhihaiIndexConfig = getConfigByNameId(ConfigName.HuanjingzhihaiIndex, type);
            let limit = cfg.rank_limit;
            let curIndex = this._proxy.getBossIndex(type);

            let rankStr = "";
            if(curIndex <= limit){
                //上榜条件: 累计击败%s次BOSS上榜
                rankStr = StringUtil.substitute(getLanById(LanDef.sea_tips13), [StringUtil.getHurtNumStr(limit)]);
            }
            else {
                rankStr = getLanById(LanDef.tishi_12) + "：";//我的排行：
                if(myRankInfo && myRankInfo.rank_num){
                    let maxRank = this._proxy.getMaxRank(type);
                    rankStr += myRankInfo.rank_num <= maxRank ? myRankInfo.rank_num : maxRank + "+";//10+
                }
                else {
                    rankStr += getLanById(LanDef.tishi_13);//未上榜
                }
            }
            this._view.lab_rank.text = rankStr;

            let count = myRankInfo && myRankInfo.value ? myRankInfo.value.toNumber() : 0;
            this._view.lab_num.text = getLanById(LanDef.sea_tips14) + "：" + StringUtil.getHurtNumStr(count);//我的击败：0

            let ranks = this._proxy.getRankList(type);
            let infos: RankRewardRenderData[] = [];

            let cfgList: object = getConfigByNameId(ConfigName.HuanjingzhihaiBossRank, type);
            for(let k in cfgList) {
                let cfg: HuanjingzhihaiBossRankConfig = cfgList[k];
                let rankStart = cfg.ranks[0];
                let rankEnd = cfg.ranks[1];

                let rankStr = rankStart + "";
                let name = "";
                let hurtStr = "";
                let reward = cfg.rewards.slice(0,3);
                let lookHandler = null;

                if(rankStart != rankEnd){
                    //4-10
                    let nextIndex = parseInt(k) + 1;
                    let nextCfg: HuanjingzhihaiBossRankConfig = cfgList[nextIndex];
                    rankStr = nextCfg ? rankStart + "-" + rankEnd : (rankStart - 1) + "+";//11-50或者50+
                    if(nextCfg){
                        lookHandler = Handler.alloc(this, this.onClickRank, [rankStart, rankEnd]);
                    }
                }
                else {
                    let rankInfo = ranks.length >= rankStart ? ranks[rankStart - 1] : null;
                    if(rankInfo){
                        name = rankInfo.name;
                        hurtStr = StringUtil.getHurtNumStr(rankInfo.value.toNumber());
                    }
                    else {
                        name = getLanById(LanDef.tishi_2);//虚位以待
                    }
                }

                let info: RankRewardRenderData = {
                    rank: rankStart,
                    rankStr: rankStr,
                    name: name,
                    hurtStr: hurtStr,
                    reward: reward,
                    lookHandler: lookHandler
                };
                infos.push(info);
            }
            this._itemList.replaceAll(infos);
        }

        private updateReward(): void {
            let type = this._proxy.rankType;
            this._canDraw = !this._proxy.isRankRewardDraw(type);
            this._view.btn_reward.redPoint.visible = this._canDraw;
            this._view.btn_reward.iconDisplay.source = this._canDraw ? "box_close" : "box_open";
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            let endTime = TimeUtil.getNextWeekTime();
            let leftTime = endTime - TimeMgr.time.serverTimeSecond;
            this._view.timeItem.updateLeftTime(leftTime);
        }

        private onClickRank(rankStart: number, rankEnd: number): void {
            facade.showView(ModName.Yijie, YijieViewType.SeaRankSection, {start: rankStart, end: rankEnd});
        }

    }
}