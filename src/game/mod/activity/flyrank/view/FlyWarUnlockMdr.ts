namespace game.mod.activity {

    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import prop_tips_data = msg.prop_tips_data;

    export class FlyWarUnlockMdr extends EffectMdrBase {
        private _view: GameOrderUnlockView = this.mark("_view", GameOrderUnlockView);

        private _itemList: ArrayCollection;
        private _itemList2: ArrayCollection;

        private _proxy: ActivityProxy;
        private _flyRankProxy: FlyRankProxy;
        private _productId: number;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._itemList = new ArrayCollection();
            this._view.list.itemRenderer = Icon;
            this._view.list.dataProvider = this._itemList;

            this._itemList2 = new ArrayCollection();
            this._view.list_item.itemRenderer = Icon;
            this._view.list_item.dataProvider = this._itemList2;

            this._proxy = this.retProxy(ProxyType.Activity);
            this._flyRankProxy = this.retProxy(ProxyType.FlyRank);
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
            addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick);
        }

        protected onShow(): void {
            super.onShow();
            this._view.secondPop.updateTitleStr("解锁进阶战令");
            this._view.lab_title.text = "购买后累计活跃值可领取";
            this.addEftByParentScale(this._view.btn.group_eft);
            this.updateList();
        }

        protected onHide(): void {
            super.onHide();
        }

        private onClick(): void {
            PayUtil.pay(this._productId);
            this.hide();
        }

        private updateList(): void {
            let actInfo = this._proxy.curOpenAct;
            this._productId = actInfo && actInfo.param ? actInfo.param[2] : 0;//商品ID
            let rmb = PayUtil.getRmbValue(this._productId);
            let fakeRmb = PayUtil.getFakeRmbValue(this._productId);
            if(fakeRmb){
                this._view.btn.setTwoPrice(rmb, fakeRmb);
            }
            else {
                this._view.btn.labelDisplay.text = rmb + "元";
            }

            let warRewardList = this._flyRankProxy.getWarRewardList(actInfo);
            let index = PropIndex.Feishengjingyanzhi;
            let exp = BagUtil.getPropCntByIdx(index);
            let infos1: prop_tips_data[] = [];
            let infos2: prop_tips_data[] = [];

            for(let reward of warRewardList){
                infos1 = infos1.concat(reward.rewards);
                let limitExp = this._flyRankProxy.getLimitExp(reward);
                if(exp >= limitExp){
                    infos2 = infos2.concat(reward.rewards);
                }
            }
            this._itemList.source = infos1;
            this._itemList2.source = infos2;

        }
    }
}