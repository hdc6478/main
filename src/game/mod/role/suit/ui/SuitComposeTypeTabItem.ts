namespace game.mod.role {

    export class SuitComposeTypeTabItem extends BaseListenerRenderer {
        public redPoint: eui.Image;
        public lab_name: eui.Label;
        public list_item: eui.List;

        private _listData: eui.ArrayCollection;
        private _proxy: SuitProxy;
        private _curSelIdx = 0;
        data: ISuitComposeTypeTabItem;

        constructor() {
            super();
            this.skinName = `skins.role.SuitComposeTypeTabItemSkin`;
        }

        protected onAddToStage(): void {
            super.onAddToStage();
            this.list_item.itemRenderer = SuitComposeTypeTabItemPos;
            this.list_item.dataProvider = this._listData = new eui.ArrayCollection();
            this._proxy = getProxy(ModName.Role, ProxyType.Suit);
            this.addEventListenerEx(eui.ItemTapEvent.ITEM_TAP, this.list_item, this.onClickList, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lab_name.text = this._proxy.getChineseNum(data.lv) + '阶';
            this.redPoint.visible = !!data.hint;
            if (data.sel) {
                let list: ISuitComposeBtnData[] = [];
                for (let pos of SuitEquipPosAry) {
                    list.push({
                        pos: pos,
                        hint: HintMgr.getHint([...this._proxy.model.composeHintPath[data.type], data.lv + '', pos + ''])
                    });
                }
                this._listData.replaceAll(list);
                let selPos = this._proxy.composeSelAry[2] || 0;//当前选中的pos
                let posIdx = SuitEquipPosAry.indexOf(selPos);
                this.list_item.selectedIndex = this._curSelIdx = posIdx;
            } else {
                this._listData.replaceAll([]);
            }
        }

        //点击部位
        private onClickList(e: eui.ItemTapEvent): void {
            this._proxy.composeSelPos = true;
            this._proxy.composeSelPos2 = true;
            if (e.itemIndex == this._curSelIdx) {
                return;
            }
            this._curSelIdx = e.itemIndex;
            // 点击部位，抛出事件更新mdr右边
            base.facade.sendNt(SuitEvent.ON_SUIT_COMPOSE_SELECT_UPDATE, [this.data.type, this.data.lv, (e.item as ISuitComposeBtnData).pos]);
        }
    }

    export interface ISuitComposeTypeTabItem {
        type: SuitType;
        lv: number;
        hint: boolean;
        sel: boolean;
    }
}