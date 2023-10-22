namespace game.mod.yishou {

    import YishouSynthesisTypeConfig = game.config.YishouSynthesisTypeConfig;
    import facade = base.facade;
    import LanDef = game.localization.LanDef;

    export class YishouShouguBagTabItem extends BaseListenerRenderer {
        public lab_type: eui.Label;
        public scr: eui.Scroller;
        public list_item: eui.List;
        public redPoint: eui.Image;

        data: IYishouShouguBagTabItemData;
        private _proxy: YishouProxy;
        private _listData: eui.ArrayCollection;
        private _selIdx = 0;

        protected onAddToStage(): void {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Yishou, ProxyType.Yishou);
            this.addEventListenerEx(eui.ItemTapEvent.ITEM_TAP, this.list_item, this.onClickList, this);
            this.list_item.itemRenderer = YishouShouguBagTabStarItem;
            this.list_item.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            this.lab_type.text = ColorUtil.getColorChineseStrByQua2(data.cfg.quality) + getLanById(LanDef.se);
            if (data.isSel) {
                this.updateListData();
            } else {
                this._listData.source = null;
                this.list_item.selectedIndex = -1;
            }
            this.redPoint.visible = !!data.showHint;
        }


        private updateListData(): void {
            if (!this.data) {
                return;
            }
            let cfg = this.data.cfg;
            let starList = cfg.star;
            let list: IYishouShouguBagTabStarItemData[] = [];
            let selIdx: number;

            for (let i = 0; i < starList.length; i++) {
                let star = starList[i];
                let showHint = this._proxy.getComposeStarHint(this.data.type, cfg.quality, star);//三级红点
                list.push({
                    star,
                    showHint: showHint
                });
                if (selIdx == undefined && showHint) {
                    selIdx = i;
                }
            }

            if (selIdx != undefined) {
                this._selIdx = selIdx;
            }

            this._listData.source = list;
            this.list_item.selectedIndex = this._selIdx;
        }

        //选择星级
        private onClickList(e: eui.ItemTapEvent): void {
            this._proxy.selStar = true;
            let itemIdx = e.itemIndex;
            if (itemIdx == this._selIdx) {
                return;
            }
            this._selIdx = itemIdx;
            let itemData = e.item as IYishouShouguBagTabStarItemData;
            //抛出选中事件
            facade.sendNt(YishouEvent.ON_UPDATE_YISHOU_COMPOSE_SELECT, itemData.star);
        }
    }

    export interface IYishouShouguBagTabItemData {
        type: YishouType;
        cfg: YishouSynthesisTypeConfig;
        showHint: boolean;
        isSel: boolean;
    }
}