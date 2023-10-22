namespace game.mod.activity {

    import facade = base.facade;
    import ArrayCollection = eui.ArrayCollection;
    import act_reward = msg.act_reward;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class FlyRebateRender extends BaseListenerRenderer {
        public lab_desc: eui.Label;
        public list_reward: eui.List;
        private img_draw: eui.Image;
        private btn_draw: game.mod.Btn;

        private _rewardList: ArrayCollection;

        private _proxy: ActivityProxy;
        private _flyRankProxy: FlyRankProxy;
        private _canDraw: boolean;

        public data: act_reward;//奖励数据

        protected onAddToStage(): void {
            super.onAddToStage();
            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;

            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            this._flyRankProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.FlyRank);

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_draw, this.onClickDraw, this);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let actInfo = this._proxy.curOpenAct;
            //条件1：积分
            let limitScore = data.cond_1 && data.cond_1[0] || 0;
            let score = this._flyRankProxy.getScore(actInfo.act_id);
            let descStr = StringUtil.substitute(getLanById(LanDef.fly_rank_tips5), [limitScore])
                    + TextUtil.addColor("(" + score + "/" + limitScore + ")", score >= limitScore ? WhiteColor.GREEN : WhiteColor.RED);

            this.lab_desc.textFlow = TextUtil.parseHtml(descStr);
            this._rewardList.source = data.rewards.slice(0,3);

            let hasDraw = this._flyRankProxy.hasRebateDraw(actInfo.act_id, data);
            this.btn_draw.visible = !hasDraw;
            this.img_draw.visible = hasDraw;
            if(this.btn_draw.visible){
                let canDraw = this._flyRankProxy.canRebateDraw(actInfo.act_id, data);
                this._canDraw = canDraw;
                this.btn_draw.redPoint.visible = canDraw;
                if(canDraw){
                    this.btn_draw.labelDisplay.text = getLanById(LanDef.tishi_29);
                    this.btn_draw.setYellow();
                }
                else {
                    this.btn_draw.labelDisplay.text = getLanById(LanDef.goto);
                    this.btn_draw.setBlue();
                }
            }
        }

        private onClickDraw(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let actInfo = this._proxy.curOpenAct;
            if(this._canDraw){
                let index = data.index;
                this._flyRankProxy.c2s_activity_feishen_score_get_rewards(actInfo.act_id, index);
                return;
            }
            let rankAct = this._proxy.getOperActByType(ActivityType.FlyRank, actInfo.entrance);
            if(!rankAct){
                return;
            }
            let propIndex = this._flyRankProxy.getRankProp(rankAct);
            let jumpIdx = FlyPropToJumpIdx[propIndex];
            if(!jumpIdx){
                return;
            }
            ViewMgr.getIns().showViewByID(jumpIdx);
            //facade.sendNt(ActivityEvent.ON_ACTIVITY_SEL_TAB, ActivityType.FlyRank);
        }

    }
}