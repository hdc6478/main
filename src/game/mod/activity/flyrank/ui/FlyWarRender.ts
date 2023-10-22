namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import act_reward = msg.act_reward;
    import facade = base.facade;
    import ItemTapEvent = eui.ItemTapEvent;
    import TouchEvent = egret.TouchEvent;

    export class FlyWarRender extends BaseListenerRenderer {
        public list: eui.List;
        public icon: game.mod.IconGot;
        public lab_tips: eui.Label;
        public grp_bar: eui.Group;
        public bar:game.mod.VProgressBar;
        public lab_val: eui.Label;
        public img_gray: eui.Image;

        private _rewardList: ArrayCollection;

        private _proxy: ActivityProxy;
        private _flyRankProxy: FlyRankProxy;

        public data: act_reward;//奖励数据

        protected onAddToStage(): void {
            super.onAddToStage();

            this._rewardList = new ArrayCollection();
            this.list.itemRenderer = IconGot;
            this.list.dataProvider = this._rewardList;

            this._proxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
            this._flyRankProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.FlyRank);

            this.grp_bar.visible = true;
            this.lab_tips.visible = false;

            this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.icon, this.onClick, this);
            this.addEventListenerEx(ItemTapEvent.ITEM_TAP, this.list, this.onClickItem, this);
        }

        protected dataChanged() {
            let data = this.data;//普通奖励配置
            if (!data) {
                return;
            }
            let index = data.index;//普通奖励的index
            let actInfo = this._proxy.curOpenAct;

            let hasBuy = this._flyRankProxy.hasWarBuy(actInfo.act_id);
            this.img_gray.visible = !hasBuy;

            let isGot1 = this._flyRankProxy.hasWarDraw1(actInfo.act_id, index);
            let canDraw1 = this._flyRankProxy.canWarDraw1(actInfo.act_id, data);
            let reward = data.rewards[0];
            let rewardData: IconRewardData = {
                prop: PropData.create(reward.idx, reward.cnt),
                isGot: isGot1,
                showTips: false,
                showHint: canDraw1,
            };
            this.icon.setData(rewardData);


            let rewardInfo = this._flyRankProxy.getWarRewardByNormalIndex(actInfo, index);//进阶奖励
            let index2 = rewardInfo.index;
            let isGot2 = this._flyRankProxy.hasWarDraw2(actInfo.act_id, index2);
            let canDraw2 = this._flyRankProxy.canWarDraw2(actInfo.act_id, rewardInfo);
            let rewardList = rewardInfo.rewards;
            let list: IconRewardData[] = [];
            for (let i = 0; i < rewardList.length && i < 2; ++i) {
                let reward = rewardList[i];
                list.push({
                    prop: PropData.create(reward.idx, reward.cnt),
                    isGot: isGot2,
                    showTips: false,
                    showHint: canDraw2,
                    isLock: !hasBuy
                });
            }
            this._rewardList.source = list;

            //条件1：奖励类型，条件2：所需经验
            let limitExp = this._flyRankProxy.getLimitExp(data);
            if(this.grp_bar.visible){
                this.lab_val.text = limitExp + "";
                let beforeRewardInfo = this._flyRankProxy.getWarRewardByNormalIndex(actInfo, index - 1);
                let beforeVal = this._flyRankProxy.getLimitExp(beforeRewardInfo);
                let start = beforeVal ? Math.round((limitExp - beforeVal) / 2 + beforeVal) : 0;
                let val = BagUtil.getPropCntByIdx(PropIndex.Feishengjingyanzhi);
                let nextRewardInfo = this._flyRankProxy.getWarRewardByNormalIndex(actInfo, index + 1);
                let nextVal = this._flyRankProxy.getLimitExp(nextRewardInfo);
                let next = nextVal ? Math.round((nextVal - limitExp) / 2 + limitExp) : 0;
                this.bar.setData({start: start, val: val, target: limitExp, next});
            }
            if(this.lab_tips.visible){
                this.lab_tips.text = limitExp + "经验获得";
            }
        }

        private onClick(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let rewardData: IconRewardData = this.icon.data;
            this.clickIcon(rewardData);
        }

        private onClickItem(e: ItemTapEvent) {
            let data = this.data;
            if (!data) {
                return;
            }
            let rewardData: IconRewardData = e.item;
            this.clickIcon(rewardData);
        }

        private clickIcon(rewardData: IconRewardData): void {
            if(!rewardData.showHint){
                let propData = rewardData.prop as PropData;
                ViewMgr.getIns().showPropTips(propData);
                return;
            }
            let actInfo = this._proxy.curOpenAct;
            this._flyRankProxy.c2s_activity_feishen_gameorder_get_rewards(actInfo.act_id);
        }

        public setShowReward(data: act_reward): void {
            this.grp_bar.visible = false;
            this.lab_tips.visible = true;
            this.data = data;
        }
    }
}