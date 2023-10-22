namespace game.mod.activity {

    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import ArrayCollection = eui.ArrayCollection;
    import act_reward = msg.act_reward;

    export class CarnivalMdr extends EffectMdrBase implements UpdateItem{
        private _view: CarnivalView = this.mark("_view", CarnivalView);
        private _proxy: ActivityProxy;
        private _carnivalProxy: CarnivalProxy;
        private _itemList: ArrayCollection;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.Activity);
            this._carnivalProxy = this.retProxy(ProxyType.Carnival);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = CarnivalRender;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);

            this.onNt(ActivityEvent.ON_CARNIVAL_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this.updateTime();
            this.updateLoopCnt();
            this.updateItemList();

            TimeMgr.addUpdateItem(this, 1000);
        }

        protected onHide(): void {
            TimeMgr.removeUpdateItem(this);
            super.onHide();
        }

        private onInfoUpdate(): void {
            this.updateLoopCnt();
            this.updateItemList();
        }

        update(time: base.Time): void {
            this.updateTime();
        }

        private updateTime(): void {
            this._view.timeItem.updateActTime(this._proxy.curOpenAct);
        }

        private updateItemList(): void {
            let actInfo = this._proxy.curOpenAct;
            let rewardList = actInfo.reward_list.concat();
            let tmps: {sort: number, reward: act_reward}[] = [];
            for(let reward of rewardList){
                let sort = reward.index;//从小到大排序
                let hasDraw = this._carnivalProxy.hasCarnivalDraw(actInfo.act_id, reward);
                if(hasDraw){
                    sort += 10000000;
                }
                else {
                    let canDraw = this._carnivalProxy.canCarnivalDraw(actInfo.act_id, reward);
                    if(canDraw){
                        sort -= 100000;
                    }
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

        private updateLoopCnt(): void {
            let actInfo = this._proxy.curOpenAct;
            let cnt = this._carnivalProxy.getLoopNum(actInfo.act_id);
            let maxCnt = actInfo && actInfo.param ? actInfo.param[1] : 0;//总的轮次
            this._view.lab_count.text = cnt + "/" + maxCnt;
        }
    }
}