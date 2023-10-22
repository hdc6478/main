namespace game.mod.yishou {

    export class YishouTypeIconListComp extends eui.Component {
        public list: eui.List;

        private _listData: eui.ArrayCollection;
        private _proxy: YishouProxy;

        constructor() {
            super();
            this.skinName = "skins.yishou.YishouTypeIconListSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this._proxy = getProxy(ModName.Yishou, ProxyType.Yishou);
            this.list.itemRenderer = YishouTypeIcon;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onRemoveFromStage() {
            this._listData.removeAll();
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        /**更新类型*/
        public updateListView(mdrType = YishouMdrType.Shougu): void {
            let ary = YishouTypeAry;
            let list: IYishouTypeIconData[] = [];
            for (let type of ary) {
                list.push({
                    type,
                    isActed: this._proxy.checkTypeActed(type),
                    showHint: this.getHint(type, mdrType)
                });
            }
            this._listData.replaceAll(list);
        }

        private getHint(type: YishouType, mdrType = YishouMdrType.Shougu): boolean {
            return this._proxy.getHintByType(type, mdrType);
        }
    }
}