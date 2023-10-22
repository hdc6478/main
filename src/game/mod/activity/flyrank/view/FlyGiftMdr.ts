namespace game.mod.activity {


    import ArrayCollection = eui.ArrayCollection;
    import LanDef = game.localization.LanDef;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import act_reward = msg.act_reward;

    export class FlyGiftMdr extends EffectMdrBase implements UpdateItem{
        private _view: FlyGiftView = this.mark("_view", FlyGiftView);
        private _proxy: ActivityProxy;
        private _flyRankProxy: FlyRankProxy;
        private _itemList: ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Activity);
            this._flyRankProxy = this.retProxy(ProxyType.FlyRank);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = FlyGiftRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(ActivityEvent.ON_FLY_RANK_UPDATE_GIFT, this.updateItemList, this);
        }

        protected onShow(): void {
            super.onShow();

            this.initShow();
            this.updateTime();
            this.updateItemList();

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private initShow(): void {
            let actInfo = this._proxy.curOpenAct;
            let rankAct = this._proxy.getOperActByType(ActivityType.FlyRank, actInfo.entrance);
            let rewards = this._flyRankProxy.getTopRewards(rankAct, 1, 1);
            this._view.icon_bigreward.setData(rewards[0]);
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            this._view.timeItem.updateActTime(this._proxy.curOpenAct);
        }

        private updateItemList(): void {
            let actInfo = this._proxy.curOpenAct;
            let rewardList = actInfo.reward_list;

            let tmps: {sort: number, reward: act_reward}[] = [];
            for(let reward of rewardList){
                let sort = reward.index;//从小到大排序
                let hasBuy = this._flyRankProxy.hasGiftBuy(actInfo.act_id, reward);
                if(hasBuy){
                    sort += 10000000;
                }
                tmps.push({sort: sort, reward: reward});
            }
            tmps.sort(SortTools.sortByRort);
            rewardList = [];
            for(let info of tmps){
                rewardList.push(info.reward);
            }

            if(this._itemList.source.length){
                this._itemList.replaceAll(rewardList);
            }
            else {
                this._itemList.source = rewardList;
            }
        }
    }
}