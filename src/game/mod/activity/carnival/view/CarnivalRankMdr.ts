namespace game.mod.activity {


    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;

    export class CarnivalRankMdr extends EffectMdrBase implements UpdateItem{
        private _view: CarnivalRankView = this.mark("_view", CarnivalRankView);
        private _proxy: ActivityProxy;
        private _carnivalProxy: CarnivalProxy;
        private _itemList: ArrayCollection;
        private _canDraw: boolean;//全民奖励是否可领取
        private _isCross: boolean;//是否是跨服排行榜

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Activity);
            this._carnivalProxy = this.retProxy(ProxyType.Carnival);

            this._itemList = new ArrayCollection();
            this._view.list_rank.itemRenderer = CarnivalRankRender;
            this._view.list_rank.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
            addEventListener(this._view.btn_lastRank, TouchEvent.TOUCH_TAP, this.onClickLastRank);
            addEventListener(this._view.btn_go, TouchEvent.TOUCH_TAP, this.onClickGo);

            this.onNt(ActivityEvent.ON_CARNIVAL_RANK_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            let actInfo = this._proxy.curOpenAct;
            this._isCross = actInfo.type == ActivityType.CarnivalCrossRank;

            this._view.scr["$hasScissor"] = true;

            this.updateTime();
            this.updateMyInfo();
            this.updateRankList();

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
            let actInfo = this._proxy.curOpenAct;
            this._proxy.c2s_oper_act_get_info(actInfo.act_id, RankOpType.Reward);
        }

        private onClickLastRank(): void {
            //上期排名
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.CarnivalRankSection);
        }

        private onClickGo(): void {
            ViewMgr.getIns().showViewByID(JumpIdx.Summon);
        }

        private onInfoUpdate(): void {
            this.updateMyInfo();
            this.updateRankList();
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            this._view.timeItem.updateActTime(this._proxy.curOpenAct);
        }

        private updateMyInfo(): void {
            let actInfo = this._proxy.curOpenAct;
            this._canDraw = this._carnivalProxy.canDraw(actInfo.act_id);
            this._view.btn_reward.redPoint.visible = this._canDraw;
            this._view.btn_reward.iconDisplay.source = this._canDraw ? "box_close" : "box_open";

            let myData = this._carnivalProxy.getMyData(actInfo.act_id);
            let rankStr = "";
            let maxRank = this._proxy.getMaxRank(actInfo);
            if(myData && myData.rank_num){
                rankStr += myData.rank_num <= maxRank ? myData.rank_num : maxRank + "+";//50+
            }
            else {
                rankStr += getLanById(LanDef.tishi_13);//未上榜
            }
            let rankId = this._isCross ? LanDef.tongtiange_tips16 : LanDef.tongtiange_tips15;//我的排名，仙宗排名
            this._view.lab_rank.text = StringUtil.substitute(getLanById(rankId), [rankStr]);

            let score = myData && myData.value && myData.value.toNumber() || 0;
            let myRankId = this._isCross ? LanDef.tongtiange_tips18 : LanDef.tongtiange_tips17;//我的次数，仙宗次数
            this._view.lab_num.text = StringUtil.substitute(getLanById(myRankId), [score]);
        }

        private updateRankList(): void {
            let actInfo = this._proxy.curOpenAct;
            let topInfo = this._carnivalProxy.getRankInfo(actInfo.act_id, 1);
            if(topInfo && topInfo.value) {
                this.updateRankUIRole(this._view.grp_eff, topInfo);
            }
            this._view.grp_first.visible = !this._isCross;//宗门排行才显示
            if(this._view.grp_first.visible){
                let firstStr = topInfo && topInfo.guild_name || getLanById(LanDef.tishi_2);
                this._view.lab_first.text = firstStr;
            }
            let rewardList = actInfo.reward_list;
            if(this._itemList.source.length){
                this._itemList.replaceAll(rewardList);
            }
            else {
                this._itemList.source = rewardList;
            }
        }
    }
}