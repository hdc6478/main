namespace game.mod.union {


    import ArrayCollection = eui.ArrayCollection;
    import TouchEvent = egret.TouchEvent;

    export class UnionSelectComponent extends BaseRenderer {

        public gr_box: eui.Group;
        private gr_list: eui.Group;
        private img_status: eui.Image;
        private lab_select: eui.Label;
        public list: eui.List;

        private _proxy: UnionProxy;
        private _listData: ArrayCollection = new ArrayCollection();
        private _show: boolean = false;
        private _keys: UnionSelectData[] = [];
        private _type: number = 1;

        protected onAddToStage(): void {
            super.onAddToStage();
            this.list.itemRenderer = UnionSelectItem;
            this.list.dataProvider = this._listData;

            this._proxy = getProxy(ModName.Union, ProxyType.Union);

            // this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.gr_box, this.onClickBox, this);
            // this.addEventListenerEx(ItemTapEvent.ITEM_TAP, this.list, this.onClickSelect, this);
        }

        public setData(keys: UnionSelectData[] = [UnionSelectDefault]): void {
            this._keys = keys;
            this._listData.replaceAll(this._keys);
            this.list.selectedIndex = 0;
            this.lab_select.text = this._keys[this.getIndex].value;
        }

        // public setData2(keys: UnionSelectData[] = [UnionSelectDefault]): void {
        //     this._type = 2;
        //     this.setData(keys);
        // }

        private onUpdateStatus(): void {
            this.gr_list.visible = this._show;
            this.img_status.rotation = this._show ? 180 : 0;
            this.lab_select.text = this._keys[this.getIndex].value;
        }

        // private onClickBox(): void {
        //     if (this._type == 2) {
        //         let qualitys: UnionSelectData[] = this._proxy.getEquipKeyValue2();
        //         this.setData2(qualitys);
        //     }
        //     this.setStatus();
        // }

        // private onClickSelect(): void {
        //     this._show = !this._show;
        //     this.onUpdateStatus();
        // }

        public setStatus(): void {
            this._show = !this._show;
            this.onUpdateStatus();
        }

        public get getIndex(): number {
            return this.list.selectedIndex;
        }

        public get getKey(): string {
            return this._keys[this.getIndex].key;
        }
    }

}