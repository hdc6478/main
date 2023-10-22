namespace game.mod.bag {

    import ArrayCollection = eui.ArrayCollection;
    import ItemTapEvent = eui.ItemTapEvent;
    import facade = base.facade;
    import SynthesisTypeConfig = game.config.SynthesisTypeConfig;

    export class BagComposeTabRender extends BaseRenderer {
        public lab_type: eui.Label;
        public scr: eui.Scroller;
        public list_item: eui.List;
        public redPoint: eui.Image;

        private _listPro: ArrayCollection;
        private _proxy: BagProxy;
        private _record: number = 0;
        public data: SynthesisTypeConfig;//类型配置

        protected onAddToStage(): void {
            super.onAddToStage();
            this._listPro = new ArrayCollection();
            this.list_item.itemRenderer = BagComposeTabItemRender;
            this.list_item.dataProvider = this._listPro;
            this.list_item.addEventListener(ItemTapEvent.ITEM_TAP, this.onSelectProp, this);
            this._proxy = facade.retMod(ModName.Bag).retProxy(ProxyType.Bag);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.list_item.removeEventListener(ItemTapEvent.ITEM_TAP, this.onSelectProp, this);
        }

        protected dataChanged(): void {
            if (!this.data) return;
            this.lab_type.text = this.data.title;

            if (this.selected && this._proxy.lastSelIndex >= 0) {
                let starList = this._proxy.getStarList(this.data.index);
                this._listPro.replaceAll(starList);

                let isProp = this.data.is_prop;
                let _sel = 0;//道具默认选中第一个，材料
                if(!isProp){
                    let pos = this.data.prop.indexOf(this._proxy.selIndex);

                    let index = this.data.prop[0];//起始的装备，11转是2星开始合成的
                    let equip = PropData.create(index);

                    let star = this._proxy.calcStar(this.data, pos);
                    _sel = star - equip.equipStar;//计算选中的道具对应的星级下标
                }
                this.list_item.selectedIndex = this._record = _sel;
            } else {
                this._record = 0;
                this._listPro.source = null;
            }
            this.redPoint.visible = this._proxy.canComposeByTypeCfg(this.data);
        }

        private onSelectProp(e: ItemTapEvent) {
            this._proxy.selSub = true;
            if (this._record == e.itemIndex) {
                return;
            }
            this._record = e.itemIndex;
            let isProp = this.data.is_prop;
            let pos = 0;//道具默认选中第一个，材料
            if(!isProp){
                let posNum = EquipPosAry.length;
                pos = this._record * posNum;
            }
            this._proxy.selIndex = this.data.prop[pos];
            facade.sendNt(BagEvent.ON_PROP_COMPOSE_SEL_UPDATE);
        }
    }
}