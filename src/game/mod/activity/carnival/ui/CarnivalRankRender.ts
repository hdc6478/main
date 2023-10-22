namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import act_reward = msg.act_reward;
    import facade = base.facade;
    import TextEvent = egret.TextEvent;
    import LanDef = game.localization.LanDef;

    export class CarnivalRankRender extends BaseListenerRenderer {
        private img_rank: eui.Image;
        private lab_rank: eui.Label;
        private lab_name: eui.Label;
        private lab_look: eui.Label;
        private lab_power: eui.Label;
        private lab_num: eui.Label;
        private list_reward: eui.List;

        private _rewardList: ArrayCollection;
        private _proxy: ActivityProxy;
        private _carnivalProxy: CarnivalProxy;

        public data: act_reward;//排行榜数据
        private _start: number;//排名区间
        private _end: number;//排名区间

        protected onAddToStage(): void {
            super.onAddToStage();

            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;
            this.list_reward.visible = true;
            this.lab_num.text = "";

            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            this._carnivalProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Carnival);

            this.lab_look.textFlow = TextUtil.parseHtml(TextUtil.addLinkHtmlTxt(getLanById(LanDef.tongtiange_tips12), WhiteColor.DEFAULT, ""));
            this.addEventListenerEx(TextEvent.LINK, this.lab_look, this.onClick, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            //条件1：名次
            let rankNo = data.cond_1 && data.cond_1[0];
            this.currentState = rankNo == 1 ? "first" : "default";
            this.lab_look.visible = false;
            let nameStr = "";
            let powerStr = "";
            let actInfo = this._proxy.curOpenAct;

            let maxRank = this._proxy.getMaxRank(actInfo);
            if(rankNo <= 3){
                //前三名显示图标
                this.img_rank.visible = true;
                this.img_rank.source = 'rank' + rankNo;
                this.lab_rank.text = "";
                //玩家信息
                let rankInfo = this._carnivalProxy.getRankInfo(actInfo.act_id, rankNo);

                //跨服排行榜显示玩家名字，仙宗排行榜显示仙宗名字和宗主
                let isCross = actInfo.type == ActivityType.CarnivalCrossRank;
                nameStr = getLanById(LanDef.tishi_2);//虚位以待
                if(isCross && rankInfo && rankInfo.role_id){
                    nameStr = rankInfo.name;
                }
                else if(!isCross && rankInfo && rankInfo.guild_name){
                    nameStr = getLanById(LanDef.union_title_2) + ":" + rankInfo.guild_name + "\n"
                        + UnionJobStr[UnionJob.Leader] + ":" + rankInfo.zongzhu_name;
                }
                powerStr = rankInfo && rankInfo.value ? rankInfo.value + "" : "";
            }
            else {
                this.img_rank.visible = false;
                if(rankNo > maxRank){
                    this.lab_rank.text = maxRank + "+";//50+
                }
                else {
                    let nextRank = this._proxy.getNextRank(actInfo, rankNo);
                    this.lab_rank.text = rankNo + "-" + nextRank;////4-10
                    this.lab_look.visible = true;
                    this._start = rankNo;
                    this._end = nextRank;
                }
            }
            this.lab_name.text = nameStr;
            this.lab_power.text = powerStr;
            this._rewardList.source = data.rewards.concat();
        }

        private onClick(): void {
            ViewMgr.getIns().showSecondPop(ModName.Activity, MainActivityViewType.CarnivalRankSection, {start: this._start, end: this._end});
        }
    }
}