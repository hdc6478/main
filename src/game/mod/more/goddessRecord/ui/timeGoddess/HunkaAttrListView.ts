namespace game.mod.more {
    import Event = egret.Event;
    import nvshen_hunka_struct = msg.nvshen_hunka_struct;
    import ArrayCollection = eui.ArrayCollection;

    export class HunkaAttrListView extends eui.Component {
        private list_attr: eui.List;
        private _attrList: ArrayCollection;

        constructor() {
            super();
            this.skinName = "skins.more.HunkaAttrListSkin";

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.initAttrList();
        }

        private onRemove() {
        }

        private initAttrList(): void {
            if (!this._attrList) {
                this._attrList = new ArrayCollection();
            }
            this.list_attr.itemRenderer = HunkaAttrItem;
            this.list_attr.dataProvider = this._attrList;
        }

        public updateShow(infos: nvshen_hunka_struct[], isSort?: boolean): void {
            if (!this._attrList) {
                this.initAttrList();
            }
            if (isSort) {
                infos.sort((v1, v2) => {
                    let rate1 = v1.rate ? 1 : 0;
                    let rate2 = v2.rate ? 1 : 0;
                    return rate2 - rate1;
                })
            }
            // if (this._attrList.source.length > 0) {
            //     this._attrList.replaceAll(infos);
            // } else {
            //     this._attrList.source = infos;
            // }
            this._attrList.replaceAll(infos);
        }
    }

}