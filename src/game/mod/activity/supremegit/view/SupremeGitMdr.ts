namespace game.mod.activity {
    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;
    import ItemTapEvent = eui.ItemTapEvent;
    import ParamConfig = game.config.ParamConfig;
    import LanDef = game.localization.LanDef;

    export class SupremeGitMdr extends EffectMdrBase {
        private _view: SupremeGitView = this.mark("_view", SupremeGitView);
        private _proxy: SupremeGitProxy;
        private _selIndex: number = 0;//当前选中的礼包下标
        private _selProductId: number;//当前选中的礼包ID
        private _list_item: ArrayCollection;
        private _list_reward: ArrayCollection;
        private _canAllBuy: boolean;


        protected onInit(): void {
            super.onInit();

            this._proxy = this.retProxy(ProxyType.SupremeGit);

            this._list_item = new ArrayCollection();
            this._view.list_item.itemRenderer = SupremeGitItem;
            this._view.list_item.dataProvider = this._list_item;

            this._list_reward = new ArrayCollection();
            this._view.list_reward.itemRenderer = Icon;
            this._view.list_reward.dataProvider = this._list_reward;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.btn_last, TouchEvent.TOUCH_TAP, this.onClickLast, this);
            addEventListener(this._view.btn_next, TouchEvent.TOUCH_TAP, this.onClickNext, this);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
            addEventListener(this._view.btn_buy, TouchEvent.TOUCH_TAP, this.onClickBuy);
            addEventListener(this._view.btn_allBuy, TouchEvent.TOUCH_TAP, this.onClickAllBuy);

            this.onNt(ActivityEvent.ON_UDPATE_ZHIZUN_GIFT_INFO, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();
            this.initShow();
            this.updateItemList();
            this.autoSel();
            this.updateAllBuy();
        }

        protected onHide(): void {
            this._selIndex = 0;
            super.onHide();
        }

        private onInfoUpdate(): void {
            //数据刷新
            this.autoSel();
            this.updateAllBuy();
            this.updateItemList();
        }

        private updateImg(): void {
            this._view.img_lab.source = `zhizunlibao_text_${this._selIndex + 1}`;
            this._view.img_item.source = `zhizunimg_${this._selIndex + 1}`;
        }

        private onClickLast(): void {
            let index = this._selIndex - 1;
            //边界判断
            if (index < 0) {
                return;
            }
            this.setSelIndex(index);
        }

        private onClickNext(): void {
            let index = this._selIndex + 1;
            //边界判断
            let items: number[] = this._list_item.source;
            if (index >= items.length) {
                return;
            }
            this.setSelIndex(index);
        }

        private onClickItem(e: ItemTapEvent) {
            let index = e.itemIndex;
            if (index == this._selIndex) {
                return;
            }
            this.setSelIndex(index);
        }

        //购买礼包
        private onClickBuy(): void {
            PayUtil.pay(this._selProductId);
        }

        //购买全部礼包
        private onClickAllBuy(): void {
            //玩家已购买非0元礼包，则不能全部购买，点击提示 今日不可购买
            if (!this._canAllBuy) {
                PromptBox.getIns().show(getLanById(LanDef.supremegit_tips));
                return;
            }
            PayUtil.pay(ProductId.Id200304);
        }

        //刷新一次
        private initShow(): void {
            //额外赠送，打折
            let cfg = GameConfig.getParamConfigById("supreme_extra");
            let cost: number[] = cfg.value[0];
            let index = cost[0];
            let cnt = cost[1];
            this._view.coinItem.initIcon(index);

            //富文本形式
            // let str = TextUtil.addColor(`${cnt}`, WhiteColor.GREEN);
            // this._view.coinItem.lab_cost.textFlow = TextUtil.parseHtml(str);

            this._view.coinItem.lab_cost.text = cnt + "";
            this._view.coinItem.lab_cost.textColor = BlackColor.GREEN;

            let cntStr = cnt + "仙";
            this.addBmpFont(cntStr, BmpTextCfg[BmpTextType.Supremegit], this._view.gr_font);


            let fakeRmb = PayUtil.getFakeRmbValue(ProductId.Id200304);
            let rmb = PayUtil.getRmbValue(ProductId.Id200304);
            this._view.lab_text.text = Math.round((rmb / fakeRmb) * 10) + getLanById(LanDef.store11);
            this._view.btn_allBuy.labelDisplay.text = rmb + getLanById(LanDef.yuan);
        }

        //优先选中未购买的礼包，返回下标
        private getSelIndex(): number {
            let items = this.getItems();
            for(let i = 0; i < items.length; ++i){
                let productId = items[i];
                let hasBuy = this._proxy.hasBuy(productId);
                if(!hasBuy){
                    return i;//未购买
                }
            }
            return this._selIndex;//默认返回当前选中的
        }

        //自动选中
        private autoSel(): void {
            let index = this.getSelIndex();
            this.setSelIndex(index);
        }

        //当前列表选中的按钮
        private setSelIndex(index: number): void {
            this._selIndex = index;
            this._view.list_item.selectedIndex = this._selIndex;
            this.updateImg();
            this.indexUpdateInfo();
        }

        //获取配置表资源参数
        private updateItemList(): void {
            let items = this.getItems();
            this._list_item.source = items;
        }

        private getItems(): number[] {
            let paramCfg: ParamConfig = GameConfig.getParamConfigById("supreme_product_id");
            let items: number[] = paramCfg.value;
            return items;
        }

        //选中礼包后刷新
        private indexUpdateInfo(): void {
            let items: number[] = this._list_item.source;
            this._selProductId = items[this._selIndex];
            this.updateReward();
            this.updateBuy();
            this.updateBtn();
        }

        //获取礼包奖励
        private updateReward(): void {
            let rewards = PayUtil.getRewards(this._selProductId);
            this._list_reward.source = rewards;//奖励显示
        }

        //刷新购买
        private updateBuy(): void {
            let hasBuy = this._proxy.hasBuy(this._selProductId);
            this._view.img_bought.visible = hasBuy;
            this._view.btn_buy.visible = !hasBuy;
            if (this._view.btn_buy.visible) {
                //显示对应商品价格，0元礼包的时候，显示红点
                let rmb = PayUtil.getRmbValue(this._selProductId);
                this._view.btn_buy.labelDisplay.text = rmb + getLanById(LanDef.yuan);
                this._view.btn_buy.redPoint.visible = this._proxy.getHint(this._selProductId);
            }
        }

        //刷新全部购买按钮
        private updateAllBuy(): void {
            let hasBuy = this._proxy.hasBuy(ProductId.Id200304);
            this._view.img_allBought.visible = hasBuy;
            this._view.btn_allBuy.visible = !hasBuy;
            if (this._view.btn_allBuy.visible) {
                //玩家已购买非0元礼包，则不能全部购买，按钮置灰
                let canAllBuy = this._proxy.canAllBuy();
                this._canAllBuy = canAllBuy;
                if (!canAllBuy) {
                    this._view.btn_allBuy.setDisabled();
                    this._view.btn_allBuy.touchEnabled = true;
                } else {
                    this._view.btn_allBuy.setYellow();
                }
            }
        }

        //刷新左右切页按钮显示
        private updateBtn(): void {
            this._view.btn_last.visible = this._selIndex > 0;
            let items: number[] = this._list_item.source;
            this._view.btn_next.visible = this._selIndex < items.length - 1;
        }
    }
}