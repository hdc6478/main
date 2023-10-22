namespace game.mod.activity {


    export class FuchenlinghuRefreshItem extends BaseListenerRenderer {
        public list: eui.List;
        public img_type: eui.Image;
        public gr_gray: eui.Group;
        public img_type1: eui.Image;

        data: SeaType;
        private _listData: eui.ArrayCollection;
        private _proxy: FuchenlinghuProxy;
        private _seaProxy: ISeaProxy;

        constructor() {
            super();
            this.skinName = `skins.activity.FuchenlinghuRefreshItemSkin`;
        }

        protected onAddToStage() {
            super.onAddToStage();
            this._proxy = getProxy(ModName.Activity, ProxyType.Fuchenlinghu);
            this._seaProxy = getProxy(ModName.Yijie, ProxyType.Sea);

            this.list.itemRenderer = Icon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        protected dataChanged(): void {
            let data = this.data;
            if (!data) {
                return;
            }
            let upProps = this._proxy.getUpProps(data);
            this._listData.replaceAll(upProps.slice(0, 4));

            this.img_type.source = `fuchenlinghu_seatype` + data;
            let isOpen = this._proxy.isOpenSea(data);
            this.gr_gray.visible = !isOpen;
            if (!isOpen) {
                this.img_type1.source = `fuchenlinghu_open_seatype` + data;
            }
        }
    }
}