namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import GameNT = base.GameNT;

    export class WonderfulActMdr4 extends MdrBase implements UpdateItem {
        protected _view: WonderfulActView4 = this.mark("_view", WonderfulActView4);
        protected _proxy: WonderfulActProxy;
        protected _listData: eui.ArrayCollection;
        protected _endTime: number;
        protected _type = ActivityType.Leijicharge;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.WonderfulAct);
            this._view.list.itemRenderer = WonderfulActItem4;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.gr_bigreward.visible = true;
            this._view.img_banner.source = ResUtil.getUiJpg('leichonghaoli');
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            this.onNt(ActivityEvent.ON_UPDATE_WONDERFUL_ACT_ADDCHARGE, this.updateView, this);
            this.onNt(ActivityEvent.ON_ACTIVITY_CLOSE, this.onActivityClose, this);
        }

        protected onActivityClose(n: GameNT) {
            let actId: number = n.body;
            if (actId == this._proxy.getActId(this._type)) {
                ViewMgr.getIns().showMain();
            }
        }

        protected onShow(): void {
            super.onShow();

            this._endTime = this.getEndTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);
            this.updateView();
        }

        protected onHide(): void {
            super.onHide();
            this._listData.removeAll();
            TimeMgr.removeUpdateItem(this);
        }

        protected updateView(): void {
            let actData = this._proxy.getActDataByType(this._type);
            if (!actData) {
                return;
            }
            let rst: IWonderfulActItemData[] = [];
            let doneRst: IWonderfulActItemData[] = [];
            let reward_list = actData.reward_list || [];
            for (let item of reward_list) {
                let statusItem = this._proxy.model.list_addcharge[item.index];
                let itemData: IWonderfulActItemData = {
                    type: this._type,
                    info: item,
                    status: statusItem && statusItem.status || 0,
                    val: this._proxy.model.num_addcharge
                };
                if (statusItem && statusItem.status == 2) {
                    doneRst.push(itemData);
                } else {
                    rst.push(itemData);
                }
            }
            this._listData.replaceAll(rst.concat(doneRst));

            let lastItem = reward_list[reward_list.length - 1];
            if (lastItem && lastItem.rewards) {
                this._view.icon_bigreward.data = lastItem.rewards[0];
            }
        }

        protected getEndTime(): number {
            return this._proxy.getEndTimeSec(this._type);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }
    }
}