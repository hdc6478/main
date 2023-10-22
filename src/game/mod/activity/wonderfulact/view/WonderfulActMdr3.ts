namespace game.mod.activity {

    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import GameNT = base.GameNT;

    export class WonderfulActMdr3 extends MdrBase implements UpdateItem {
        private _view: WonderfulActView3 = this.mark("_view", WonderfulActView3);
        private _proxy: WonderfulActProxy;
        private _endTime = 0;
        private _listData: eui.ArrayCollection;
        private _type = 1;//1:30元，2:100元
        private _listBtn: eui.ArrayCollection;
        private _bigType = ActivityType.Lianxucharge;

        protected onInit(): void {
            super.onInit();
            this._proxy = this.retProxy(ProxyType.WonderfulAct);
            this._view.list.itemRenderer = WonderfulActItem4;
            this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
            this._view.list_btn.itemRenderer = BtnTabItem;
            this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickBtn, this);
            this.onNt(ActivityEvent.ON_UPDATE_WONDERFUL_ACT_KEEPCHARGE, this.onUpdateView, this);
            this.onNt(ActivityEvent.ON_ACTIVITY_CLOSE, this.onActivityClose, this);
        }

        private onActivityClose(n: GameNT) {
            let actId: number = n.body;
            if (actId == this._proxy.getActId(this._bigType)) {
                ViewMgr.getIns().showMain();
            }
        }

        protected onShow(): void {
            super.onShow();

            this._endTime = this.getEndTime();
            TimeMgr.addUpdateItem(this, 1000);
            this.update(TimeMgr.time);

            let btnTabData: BtnTabItemData[] = [];
            let rmbList = this._proxy.getKeepChargeRmb();//30元，100元
            for (let i = 0; i < rmbList.length; i++) {
                let itemData = {
                    name: rmbList[i] + PayUtil.getRmbUnit(),
                    showHint: HintMgr.getHint(this._proxy.model.hintPath1[i + 1])
                };
                btnTabData.push(itemData);
            }
            this._listBtn.replaceAll(btnTabData);
            this._view.list_btn.selectedIndex = 0;
            this.onSwitchType(0);
        }

        protected onHide(): void {
            super.onHide();
            this._listData.removeAll();
            TimeMgr.removeUpdateItem(this);
        }

        private getEndTime(): number {
            return this._proxy.getEndTimeSec(this._bigType);
        }

        private onUpdateView(): void {
            this.updateBtnHint();
            this.updateView();
        }

        private updateView(): void {
            let typeInfo = this._proxy.model.list_keepcharge[this._type];
            let chargeNum = typeInfo && typeInfo.num.toNumber() || 0;
            this._view.lb_chargenum.text = `本日已充值：${chargeNum}元`;

            let actData = this._proxy.getActDataByType(this._bigType);
            let chargeDay = typeInfo && typeInfo.list ? typeInfo.list.length : 0;
            let rst: IWonderfulActItemData[] = [];
            let reward_list = actData && actData.reward_list || [];
            for (let item of reward_list) {
                if (!item || item.cond_1[0] != this._type) {
                    continue;
                }
                let itemData: IWonderfulActItemData = {
                    type: this._bigType,
                    info: item,
                    status: this._proxy.getKeepChargeStatus(this._type, item.index),
                    val: chargeDay
                };
                rst.push(itemData);
            }

            let lastItem = rst[rst.length - 1];
            if (lastItem && lastItem.info) {
                this._view.icon_bigreward.data = lastItem.info.rewards[0];
            }
            SortTools.sortReward(rst);
            this._listData.replaceAll(rst);
        }

        update(time: base.Time) {
            let leftTime = this._endTime - time.serverTimeSecond;
            if (leftTime <= 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            this._view.timeItem.updateLeftTime(leftTime);
        }

        private onSwitchType(selIdx: number): void {
            this._type = selIdx + 1;
            this.updateView();
        }

        private onClickBtn(e: eui.ItemTapEvent): void {
            let index = e.itemIndex;
            if (this._type - 1 == index) {
                return;
            }
            this.onSwitchType(index);
        }

        private updateBtnHint(): void {
            for (let i = 0; i < 2; i++) {
                let btnData: BtnTabItemData = this._listBtn.source[i];
                if (!btnData) {
                    continue;
                }
                btnData.showHint = HintMgr.getHint(this._proxy.model.hintPath1[i + 1]);
                this._listBtn.itemUpdated(btnData);
            }
        }
    }
}