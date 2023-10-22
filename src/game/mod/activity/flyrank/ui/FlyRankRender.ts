namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import act_reward = msg.act_reward;
    import facade = base.facade;
    import TextEvent = egret.TextEvent;
    import LanDef = game.localization.LanDef;

    export class FlyRankRender extends BaseListenerRenderer {
        public img_rank: eui.Image;
        public lab_rank: eui.Label;
        public lab_name: eui.Label;
        public lab_look: eui.Label;

        private list_reward: eui.List;
        private list_reward2: eui.List;

        private _rewardList: ArrayCollection;
        private _rewardList2: ArrayCollection;
        private _proxy: ActivityProxy;
        private _flyRankProxy: FlyRankProxy;

        public data: act_reward;//排行榜数据
        private _start: number;//排名区间
        private _end: number;//排名区间

        protected onAddToStage(): void {
            super.onAddToStage();

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;

            this._rewardList2 = new ArrayCollection();
            this.list_reward2.itemRenderer = Icon;
            this.list_reward2.dataProvider = this._rewardList2;

            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            this._flyRankProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.FlyRank);

            this.lab_look.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.tongtiange_tips12), WhiteColor.DEFAULT, ""));
            this.addEventListenerEx(TextEvent.LINK, this.lab_look, this.onClick, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            //条件1：奖励类型，条件2：名次，条件3：巅峰积分
            let rankNo = data.cond_2 && data.cond_2[0];
            this.currentState = rankNo == 1 ? "first" : "default";
            this.lab_look.visible = false;
            let nameStr = "";
            let actInfo = this._proxy.curOpenAct;
            let maxRank = this._flyRankProxy.getMaxRank(actInfo);
            if(rankNo <= 3){
                //前三名显示图标
                this.img_rank.visible = true;
                this.img_rank.source = 'rank' + rankNo;
                this.lab_rank.text = "";
                //玩家信息
                let rankInfo = this._flyRankProxy.getRankInfo(actInfo.act_id, rankNo);
                if(rankInfo && rankInfo.role_id){
                    nameStr = rankInfo.name + "\n" + getLanById(LanDef.zmFight_tips3) + ":" + rankInfo.value;
                }
                else {
                    nameStr = getLanById(LanDef.tishi_2);//虚位以待
                }
            }
            else {
                this.img_rank.visible = false;
                if(rankNo > maxRank){
                    this.lab_rank.text = maxRank + "+";//50+
                }
                else {
                    let nextRank = this._flyRankProxy.getNextRank(actInfo, rankNo);
                    this.lab_rank.text = rankNo + "-" + nextRank;////4-10
                    this.lab_look.visible = true;
                    this._start = rankNo;
                    this._end = nextRank;
                }
            }
            this.lab_name.text = nameStr;

            this._rewardList.source = data.rewards.slice(0,2);

            let topRewards = this._flyRankProxy.getTopRewards(actInfo, rankNo, maxRank);
            this._rewardList2.source = topRewards.slice(0,1);
        }

        private onClick(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.FlyRankSection, {start: this._start, end: this._end});
        }
    }
}