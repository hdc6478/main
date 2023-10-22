namespace game.mod {
    import Event = egret.Event;
    import ArrayCollection = eui.ArrayCollection;
    import facade = base.facade;

    /**
     * 道具奖励
     */
    export class BaseRewardList extends eui.Component {
        private list_icon: eui.List;
        private _listData: ArrayCollection;
        private _selIndex: number;//选中的奖励下标
        private _selectShow: boolean = false;//长按奖励时候提示

        constructor() {
            super();
            this.skinName = "skins.common.BaseRewardListSkin";

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.list_icon.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            facade.onNt(BagEvent.ON_BAG_REWARD_SELECT_SHOW, this.onSelectShow, this);
            this.initAttrList();
        }

        private onRemove() {
            this.list_icon.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            facade.offNt(BagEvent.ON_BAG_REWARD_SELECT_SHOW, this.onSelectShow, this);
        }

        private initAttrList(): void {
            if (!this._listData) {
                this._listData = new ArrayCollection();
            }
        }

        private initSelIndex(): void {
            this._selIndex = -1;
            this.list_icon.selectedIndex = this._selIndex;
        }

        private onClickList(e: eui.ItemTapEvent): void {
            if(this._selectShow){
                //长按提示奖励时候不选中
                this._selectShow = false;
                this.list_icon.selectedIndex = this._selIndex;
                return;
            }
            let index = e.itemIndex;
            if (index == this._selIndex) {
                this.initSelIndex();
            }
            else {
                this._selIndex = index;
            }
        }

        private onSelectShow(): void {
            this._selectShow = true;
        }

        /**获取选中的道具index*/
        public getSelIndex(): number {
            return this._selIndex;
        }

        /**
         * @param rewards 道具index和cnt数组
         * @param isSel 是否显示可选择道具
         */
        public updateShow(rewards: number[][] | number[], isSel?: boolean): void {
            this.initAttrList();
            if(!isSel){
                this.list_icon.itemRendererSkinName = "skins.common.IconSkin";
                this.list_icon.itemRenderer = Icon;
            }
            else {
                this.list_icon.itemRendererSkinName = "skins.common.IconSelSkin";
                this.list_icon.itemRenderer = BaseRewardSelItem;
                this._selectShow = false;
                this.initSelIndex();
            }
            this.list_icon.dataProvider = this._listData;
            this._listData.source = rewards;
        }
    }
}