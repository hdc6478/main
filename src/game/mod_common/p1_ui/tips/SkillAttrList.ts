namespace game.mod {
    import Event = egret.Event;
    import ArrayCollection = eui.ArrayCollection;

    /**
     * 通用属性列表组件
     */
    export class SkillAttrList extends eui.Component {
        private list_attr: eui.List;
        private _attrList: ArrayCollection;

        constructor() {
            super();
            this.skinName = "skins.common.SkillAttrListSkin";

            this.addEventListener(Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }

        private onAddToStage() {
            this.initAttrList();
        }

        private onRemove() {
        }

        private initAttrList(): void {
            if(!this._attrList){
                this._attrList = new ArrayCollection();
            }
            this.list_attr.itemRenderer = BaseSkillAttrItem;
            this.list_attr.dataProvider = this._attrList;
        }

        /**属性赋值*/
        public updateAttr(infos: string[][]): void {
            if(!this._attrList){
                this._attrList = new ArrayCollection();
            }
            if (this._attrList.source.length > 0) {
                this._attrList.replaceAll(infos);
            } else {
                this._attrList.source = infos;
            }
        }
    }
}