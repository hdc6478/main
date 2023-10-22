namespace game.mod.activity {

    import facade = base.facade;
    import ArrayCollection = eui.ArrayCollection;
    import act_reward = msg.act_reward;
    import TouchEvent = egret.TouchEvent;
    import LanDef = game.localization.LanDef;

    export class CarnivalZhaohuanRender extends BaseListenerRenderer {
        public lab_desc: eui.Label;
        public list_reward: eui.List;
        private img_draw: eui.Image;
        private btn_draw: game.mod.Btn;

        private _rewardList: ArrayCollection;

        private _proxy: ActivityProxy;
        private _carnivalProxy: CarnivalProxy;
        private _canDraw: boolean;

        public data: act_reward;//奖励数据

        protected onAddToStage(): void {
            super.onAddToStage();
            this._rewardList = new ArrayCollection();
            this.list_reward.itemRenderer = Icon;
            this.list_reward.dataProvider = this._rewardList;

            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            this._carnivalProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Carnival);

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_draw, this.onClickDraw, this);
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let actInfo = this._proxy.curOpenAct;
            //条件1：召唤次数
            let limitScore = data.cond_1 && data.cond_1[0] || 0;
            let score = this._carnivalProxy.getZhaohuanScore(actInfo.act_id);
            let descStr = StringUtil.substitute(getLanById(LanDef.carnival_tips4), [limitScore])
                    + TextUtil.addColor("(" + score + "/" + limitScore + ")", score >= limitScore ? WhiteColor.GREEN : WhiteColor.RED);

            this.lab_desc.textFlow = TextUtil.parseHtml(descStr);
            this._rewardList.source = data.rewards.slice(0,3);

            let hasDraw = this._carnivalProxy.hasCarnivalZhaohuanDraw(actInfo.act_id, data);
            this.btn_draw.visible = !hasDraw;
            this.img_draw.visible = hasDraw;
            if(this.btn_draw.visible){
                let canDraw = this._carnivalProxy.canCarnivalZhaohuanDraw(actInfo.act_id, data);
                this._canDraw = canDraw;
                this.btn_draw.redPoint.visible = canDraw;
                if(canDraw){
                    this.btn_draw.labelDisplay.text = getLanById(LanDef.tishi_29);
                    this.btn_draw.setYellow();
                }
                else {
                    this.btn_draw.labelDisplay.text = getLanById(LanDef.chengshen_goto1);
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
                this._carnivalProxy.c2s_activity_kuanghuan_zongmen_zhaohuan_get_reward(actInfo.act_id);
                return;
            }
            //前往召唤
            ViewMgr.getIns().showViewByID(JumpIdx.Summon);
        }

    }
}