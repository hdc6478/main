namespace game.mod.shenling {

    export class ShenLingTypeListView extends eui.Component {
        public list_menu: eui.List;
        private _listData: eui.ArrayCollection;
        private _proxy: ShenLingProxy;
        private _lqProxy: ShenLingLingQiProxy;
        private _lpProxy: ShenlingLingpoProxy;
        private _llProxy: ShenlingLingliProxy;

        /**展示的类型*/
        private _typeAry: ShenLingType[];

        constructor() {
            super();
            this.skinName = "skins.shenling.ShenLingTypeListSkin";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        protected onAddToStage() {
            this._proxy = getProxy(ModName.Shenling, ProxyType.Shenling);
            this._lqProxy = getProxy(ModName.Shenling, ProxyType.ShenlingLingqi);
            this._lpProxy = getProxy(ModName.Shenling, ProxyType.ShenlingLingpo);
            this._llProxy = getProxy(ModName.Shenling, ProxyType.ShenlingLingli);
            this.list_menu.itemRenderer = ShenLingTypeIcon;
            this.list_menu.dataProvider = this._listData = new eui.ArrayCollection();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        protected onRemoveFromStage() {
            this._listData.removeAll();
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        }

        /**更新类型按钮，灵魄灵力只展示激活的类型*/
        public updateListView(mdrType: ShenLingMdrType): void {
            let list: ISLTypeIconData[] = [];
            let typeAry = ShenLingTypeAry;
            if (mdrType == ShenLingMdrType.Lingpo || mdrType == ShenLingMdrType.Lingli) {
                typeAry = this._proxy.getActedTypeList();
            }
            for (let type of typeAry) {
                list.push({
                    type,
                    mdrType,
                    hint: this.getHint(mdrType, type)
                });
            }
            this._typeAry = typeAry;
            this._listData.replaceAll(list);
        }

        /**更新选中类型*/
        public updateSelType(type: ShenLingType): void {
            if (!this.list_menu) {
                return;
            }
            this.list_menu.selectedIndex = this._typeAry.indexOf(type);
        }

        public updateListHint(mdrType: ShenLingMdrType): void {
            let size = this._listData.source.length;
            for (let i = 0; i < size; i++) {
                let data = this._listData.source[i] as ISLTypeIconData;
                if (!data) {
                    continue;
                }
                data.hint = this.getHint(mdrType, data.type);
                this._listData.itemUpdated(data);
            }
        }

        private getHint(mdrType: ShenLingMdrType, type: ShenLingType): boolean {
            if (mdrType == ShenLingMdrType.Main) {
                return this._proxy.getMainHintByType(type);
            } else if (mdrType == ShenLingMdrType.UpStar) {
                return this._proxy.getStarHintByType(type);
            } else if (mdrType == ShenLingMdrType.Lingqi) {
                return this._lqProxy.getHintByType(type);
            } else if (mdrType == ShenLingMdrType.Lingpo) {
                return this._lpProxy.getHintByType(type);
            } else if (mdrType == ShenLingMdrType.Lingli) {
                return this._llProxy.getHintByType(type);
            }
            return false;
        }

    }
}