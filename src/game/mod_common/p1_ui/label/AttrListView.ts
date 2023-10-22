namespace game.mod {
    import Event = egret.Event;
    import ArrayCollection = eui.ArrayCollection;

    /**
     * 通用属性列表组件
     */
    export class AttrListView extends eui.Component {
        private list_attr: eui.List;
        private _attrList: ArrayCollection;

        constructor() {
            super();
            this.skinName = "skins.common.AttrListSkin";

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
            this.list_attr.itemRenderer = AttrItemRender;
            this.list_attr.dataProvider = this._attrList;
        }

        /**属性赋值，defaultColor文本默认颜色*/
        public updateAttr(attr: msg.attributes, color: number = WhiteColor.GREEN, endStr: string = "\n", joinStr: string = ": ", defaultColor?: number): void {
            if(!this._attrList){
                this._attrList = new ArrayCollection();
            }
            let infos = TextUtil.getAttrTextInfos(attr, color, endStr, joinStr, defaultColor);
            if (this._attrList.source.length > 0) {
                this._attrList.replaceAll(infos);
            } else {
                this._attrList.source = infos;
            }
        }
        /**属性赋值，显示 +号，defaultColor文本默认颜色*/
        public updateAttrAdd(attr: msg.attributes, color: number = WhiteColor.GREEN, endStr: string = "\n", joinStr: string = " +", defaultColor?: number): void {
            this.updateAttr(attr, color, endStr, joinStr, defaultColor);
        }

        /**属性赋值，不建议使用，先保留*/
        public updateAttr2(list: string[]): void {
            this._attrList.replaceAll(list || []);
        }

        public setListGap(gap: number = 6): void {
            let layout = this.list_attr.layout as eui.VerticalLayout;
            layout && (layout.gap = gap);
        }

    }
}