namespace game.mod.role {

    import ArrayCollection = eui.ArrayCollection;
    import Event = egret.Event;
    import facade = base.facade;

    export class SuitComposeTypeTab extends BaseListenerRenderer {
        public lab_type: eui.Label;
        public scr: eui.Scroller;
        public list_item: eui.List;
        public redPoint: eui.Image;

        private _listData: ArrayCollection;
        private _proxy: SuitProxy;
        private _curSelIdx = 0;//当前选择
        data: ISuitComposeTypeTabData;

        constructor() {
            super();
            this.skinName = "skins.role.SuitComposeTypeTabSkin";
            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this._proxy = getProxy(ModName.Role, ProxyType.Suit);
            this.list_item.itemRenderer = SuitComposeTypeTabItem;
            this.list_item.dataProvider = this._listData = new ArrayCollection();
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.list_item.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
            this.scr['$hasScissor'] = true;
            this.list_item.useVirtualLayout = false;
        }

        protected onRemoveFromStage() {
            this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lab_type.text = SuitTypeName[data.type];//套装名称
            this.redPoint.visible = !!data.hint;
            if (data.sel) {
                this.updateList();
                let lv = this._proxy.composeSelAry[1] || 2;//阶数，从2阶开始
                let selIdx = Math.max(lv - 2, 0);
                this.list_item.selectedIndex = this._curSelIdx = selIdx;
            } else {
                this._listData.replaceAll([]);
            }
        }

        //更新阶数列表
        private updateList(): void {
            let ary = [];
            let maxStage = this._proxy.getMaxStageByType(this.data.type);
            let selLv = this._proxy.composeSelAry[1] || 2;//阶数，从2阶开始
            for (let lv = 2; lv <= maxStage; lv++) {
                let item = {
                    type: this.data.type,
                    lv: lv,
                    hint: HintMgr.getHint([...this._proxy.model.composeHintPath[this.data.type], lv + '']),
                    sel: this._curSelIdx != -1 && lv == selLv
                } as ISuitComposeTypeTabItem;
                ary.push(item);
            }
            if (this._listData.source && this._listData.source.length > 0) {
                this._listData.replaceAll(ary);
            } else {
                this._listData.source = ary;
            }
        }

        //点击阶数
        private onClickList(e: eui.ItemTapEvent): void {
            if (this._proxy.composeSelPos) {
                this._proxy.composeSelPos = false;
                return;
            }
            this._proxy.composeSelSub = true;
            if (e.itemIndex == this._curSelIdx) {
                this.list_item.selectedIndex = this._curSelIdx = -1;
                this.updateList();
                return;
            }
            //抛出数据刷新 mdr 的右边视图
            facade.sendNt(SuitEvent.ON_SUIT_COMPOSE_SELECT_UPDATE, [this.data.type, e.itemIndex + 2, SuitEquipPosAry[0]]);

            this._curSelIdx = e.itemIndex;
            this.updateList();
        }
    }

    export interface ISuitComposeTypeTabData {
        type: SuitType;
        hint: boolean;
        sel: boolean;
    }
}