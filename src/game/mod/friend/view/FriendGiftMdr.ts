namespace game.mod.friend {

    import TouchEvent = egret.TouchEvent;
    import ArrayCollection = eui.ArrayCollection;
    import FriendGiftConfig = game.config.FriendGiftConfig;
    import ItemTapEvent = eui.ItemTapEvent;
    import LanDef = game.localization.LanDef;
    import friend_info = msg.friend_info;
    import GameNT = base.GameNT;

    export class FriendGiftMdr extends EffectMdrBase {
        private _view: FriendGiftView= this.mark("_view", FriendGiftView);
        private _proxy: FriendProxy;

        private _itemList: ArrayCollection;
        private _selCnt: number;//选中的数量，默认1
        private _selIndex: number = 0;
        private _infos: FriendGiftConfig[];
        private _info: friend_info;
        protected _showArgs: friend_info;

        constructor() {
            super(Layer.modal);
            this.isEasyHide = true;
        }

        protected onInit(): void {
            super.onInit();
            this._view.touchEnabled = false;

            this._proxy = this.retProxy(ProxyType.Friend);

            this._itemList = new ArrayCollection();
            this._view.list_item.itemRenderer = FriendGiftItem;
            this._view.list_item.dataProvider = this._itemList;
        }

        protected addListeners(): void {
            super.addListeners();
            let addEventListener = this.onEgret.bind(this);
            addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
            addEventListener(this._view.btn_send, TouchEvent.TOUCH_TAP, this.onClickSend);
            addEventListener(this._view.btn_subtractTen, TouchEvent.TOUCH_TAP, this.onClickSubtractTen);
            addEventListener(this._view.btn_subtract, TouchEvent.TOUCH_TAP, this.onClickSubtract);
            addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
            addEventListener(this._view.btn_addTen, TouchEvent.TOUCH_TAP, this.onClickAddTen);

            this.onNt(BagEvent.ON_BAG_UPDATE_BY_PROP_INDEX, this.onBagUpdateIndex, this);
            this.onNt(FriendEvent.ON_FRIEND_UPDATE, this.onInfoUpdate, this);
        }

        protected onShow(): void {
            super.onShow();

            this._info = this._showArgs;
            this.updateItemList();
            this.setSelCnt(1);
        }

        protected onHide(): void {
            this._selIndex = 0;
            super.onHide();
        }

        /** 通用背包事件监听 */
        private onBagUpdateIndex(n: GameNT): void {
            let indexs: number[] = n.body;
            let giftIndexList = this._proxy.giftIndexList;
            for(let i of giftIndexList){
                if(indexs.indexOf(i) >= 0){
                    this.updateItemList();
                    this.updateMaxCnt();
                    break;
                }
            }
        }

        private onInfoUpdate(): void {
            this.updateItemList();
            this.updateMaxCnt();
        }

        private onClickItem(e: ItemTapEvent) {
            let index = e.itemIndex;
            if(index == this._selIndex){
                return;
            }
            this._selIndex = index;
            this.setSelCnt(1);
        }

        private onClickSend(): void {
            let infos = this._infos.concat();
            let cfg = infos[this._selIndex];
            if(!BagUtil.checkPropCntUp(cfg.index)){
                return;
            }

            let leftCnt = this._proxy.getLeftGiftCnt();
            if(leftCnt <= 0){
                //上限限制
                PromptBox.getIns().show(getLanById(LanDef.friend_tips9));
                return;
            }

            this._proxy.c2s_friend_give_gift(this._info.role_id, cfg.index, this._selCnt);
        }

        private onClickSubtractTen(): void {
            this.subtractSelCnt(10);
        }

        private onClickSubtract(): void {
            this.subtractSelCnt(1);
        }

        private onClickAdd(): void {
            this.addSelCnt(1);
        }

        private onClickAddTen(): void {
            this.addSelCnt(10);
        }

        private subtractSelCnt(subtractCnt: number): void {
            let cnt = Math.max(1, this._selCnt - subtractCnt);
            if(cnt == this._selCnt){
                PromptBox.getIns().show(getLanById(LanDef.min_value));
                return;
            }
            this.setSelCnt(cnt);
        }

        private addSelCnt(addCnt: number): void {
            let maxCnt = this.getMaxCnt();
            let cnt = Math.min(maxCnt, this._selCnt + addCnt);
            if(cnt == this._selCnt){
                PromptBox.getIns().show(getLanById(LanDef.max_value));
                return;
            }
            this.setSelCnt(cnt);
        }

        private getMaxCnt(): number {
            let infos = this._infos.concat();
            let cfg = infos[this._selIndex];
            let curCnt = BagUtil.getPropCntByIdx(cfg.index);
            let leftCnt = this._proxy.getLeftGiftCnt();
            let maxCnt = Math.min(curCnt, leftCnt);
            return maxCnt ? maxCnt : 1;
        }

        private setSelCnt(cnt: number): void {
            this._selCnt = cnt;
            this.updateCnt();
        }

        private updateCnt(): void {
            this._view.lab_cnt.text = this._selCnt + "";
        }

        private updateMaxCnt(): void {
            let maxCnt = this.getMaxCnt();
            if(maxCnt > this._selCnt){
                return;
            }
            let cnt = Math.min(maxCnt, this._selCnt);
            this.setSelCnt(cnt);
        }

        private updateItemList(): void {
            if(!this._infos){
                let cfgList: FriendGiftConfig[] = getConfigListByName(ConfigName.FriendGift);
                this._infos = cfgList.concat();
                this._infos.reverse();//反转排序
            }
            let infos = this._infos.concat();
            if (this._itemList.source.length > 0) {
                this._itemList.replaceAll(infos);
            } else {
                this._itemList.source = infos;
            }
            let curCfg = infos[this._selIndex];
            let curCnt = BagUtil.getPropCntByIdx(curCfg.index);
            if(curCnt <= 0){
                //数量小于等于0时，自动选中
                for(let i = 0; i < infos.length; ++i){
                    let cfg = infos[i];
                    let cnt = BagUtil.getPropCntByIdx(cfg.index);
                    if(cnt > 0){
                        this._selIndex = i;
                        break;
                    }
                }
            }
            this._view.list_item.selectedIndex = this._selIndex;
        }

    }
}