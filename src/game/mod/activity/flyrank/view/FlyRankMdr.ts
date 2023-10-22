namespace game.mod.activity {


    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import PropConfig = game.config.PropConfig;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;

    export class FlyRankMdr extends EffectMdrBase implements UpdateItem {
        private _view: FlyRankView = this.mark("_view", FlyRankView);
        private _proxy: ActivityProxy;
        private _flyRankProxy: FlyRankProxy;
        private _itemList: ArrayCollection;
        private _canDraw: boolean;//全民奖励是否可领取
        private _topScore: number;//巅峰奖励积分要求
        private _propIndex: number;//进阶丹

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Activity);
            this._flyRankProxy = this.retProxy(ProxyType.FlyRank);

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = FlyRankRender;
            this._view.list_rank.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_lastRank, TouchEvent.TOUCH_TAP, this.onClickLastRank);
            addEventListener(this._view.btn_go, TouchEvent.TOUCH_TAP, this.onClickGo);

            this.onNt(ActivityEvent.ON_FLY_RANK_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateTime();
            this.updateMyInfo();
            this.updateRankList();
            this._proxy.checkActTips(NotTipsType.FlyRank);

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onClickReward(): void {
            if (!this._canDraw) {
                PromptBox.getIns().show(getLanById(LanDef.shoulie_point));
                return;
            }
            let actInfo = this._proxy.curOpenAct;
            this._proxy.c2s_oper_act_get_info(actInfo.act_id, RankOpType.Reward);
        }

        private onClickLastRank(): void {
            //上期排名
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.FlyRankSection);
        }

        private onClickGo(): void {
            let jumpIdx = FlyPropToJumpIdx[this._propIndex];
            if (!jumpIdx) {
                return;
            }
            ViewMgr.getIns().showViewByID(jumpIdx);
        }

        private onInfoUpdate(): void {
            this.updateMyInfo();
            this.updateRankList();
        }

        private initShow(): void {
            let actInfo = this._proxy.curOpenAct;
            let propIndex = this._flyRankProxy.getRankProp(actInfo);
            this._propIndex = propIndex;
            this._view.img_prop.source = "flyrank_prop_" + propIndex;

            let cfg: PropConfig = GameConfig.getPropConfigById(propIndex);
            let tipsStr1 = StringUtil.substitute(getLanById(LanDef.fly_rank_tips1), [cfg.name]);
            let tipsStr3 = StringUtil.substitute(getLanById(LanDef.fly_rank_tips6), [cfg.name]);

            //通过唯一道具判断显示不同的文本
            if (cfg.index == 1450100140) {
                this._view.lab_tips1.text = tipsStr3;
            } else {
                this._view.lab_tips1.text = tipsStr1;
            }

            let topScore = this._flyRankProxy.getTopScore(actInfo);
            this._topScore = topScore;
            let tipsStr2 = StringUtil.substitute(getLanById(LanDef.fly_rank_tips2), [topScore]);
            this._view.lab_tips2.text = tipsStr2;
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            this._view.timeItem.updateActTime(this._proxy.curOpenAct);
        }

        private updateMyInfo(): void {
            let actInfo = this._proxy.curOpenAct;
            this._canDraw = this._flyRankProxy.canDraw(actInfo.act_id);
            this._view.btn_reward.redPoint.visible = this._canDraw;
            this._view.btn_reward.iconDisplay.source = this._canDraw ? "box_close" : "box_open";

            let myData = this._flyRankProxy.getMyData(actInfo.act_id);
            let rankStr = getLanById(LanDef.tishi_12) + "：";//我的排行：
            let maxRank = this._flyRankProxy.getMaxRank(actInfo);
            if (myData && myData.rank_num) {
                rankStr += myData.rank_num <= maxRank ? myData.rank_num : maxRank + "+";//50+
            } else {
                rankStr += getLanById(LanDef.tishi_13);//未上榜
            }
            this._view.lab_rank.text = rankStr;

            let score = myData && myData.value && myData.value.toNumber() || 0;
            this._view.lab_num.text = getLanById(LanDef.battle_cue46) + "：" + score;//我的积分：0

            let tipsStr3 = "";
            let limitScore = actInfo && actInfo.param ? actInfo.param[2] : 0;//上榜限制积分
            if (score < limitScore) {
                //未达到上榜积分
                let leftScore = limitScore - score;
                tipsStr3 = StringUtil.substitute(getLanById(LanDef.fly_rank_tips3), [leftScore]);
            } else {
                //已达到上榜积分
                if (score < this._topScore) {
                    let leftScore = this._topScore - score;
                    tipsStr3 = StringUtil.substitute(getLanById(LanDef.fly_rank_tips4), [leftScore]);
                }
            }
            this._view.lab_tips3.text = tipsStr3;
            this._view.grp_tips3.visible = tipsStr3 != "";
        }

        private updateRankList(): void {
            let actInfo = this._proxy.curOpenAct;
            let topInfo = this._flyRankProxy.getRankInfo(actInfo.act_id, 1);
            if (topInfo && topInfo.value) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }
            let rewardList = this._flyRankProxy.getRewardList(actInfo);
            if (this._itemList.source.length) {
                this._itemList.replaceAll(rewardList);
            } else {
                this._itemList.source = rewardList;
            }
        }
    }
}