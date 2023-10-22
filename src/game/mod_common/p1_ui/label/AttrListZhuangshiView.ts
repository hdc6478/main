namespace game.mod {
    import Event = egret.Event;
    import ArrayCollection = eui.ArrayCollection;

    /**
     * 通用属性列表组件，带装饰角标
     */
    export class AttrListZhuangshiView extends eui.Component {
        private list_attr: eui.List;
        private _attrList: ArrayCollection;

        constructor() {
            super();
            this.skinName = "skins.common.AttrListZhuangshiSkin";

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
            this.list_attr.itemRenderer = BaseZhuangshiItem;
            this.list_attr.dataProvider = this._attrList;
        }

        /**属性赋值，defaultColor文本默认颜色*/
        public updateAttr(attr: msg.attributes, color: number = WhiteColor.GREEN, endStr: string = "\n", joinStr: string = ": ", defaultColor?: number): void {
            let infos = TextUtil.getAttrTextInfos(attr, color, endStr, joinStr, defaultColor);
            this.updateAttrByDescList(infos);
        }
        /**属性赋值，显示 +号，defaultColor文本默认颜色*/
        public updateAttrAdd(attr: msg.attributes, color: number = WhiteColor.GREEN, endStr: string = "\n", joinStr: string = " +", defaultColor?: number): void {
            this.updateAttr(attr, color, endStr, joinStr, defaultColor);
        }

        /**直接显示属性文本*/
        public updateAttrByDescList(infos: string[]): void {
            if(!this._attrList){
                this._attrList = new ArrayCollection();
            }
            if (this._attrList.source.length > 0) {
                this._attrList.replaceAll(infos);
            } else {
                this._attrList.source = infos;
            }
        }

        /**设置间距*/
        public setListGap(gap: number = 6): void {
            let layout = this.list_attr.layout as eui.VerticalLayout;
            layout && (layout.gap = gap);
        }
        /**设置x坐标*/
        public setListX(x: number = 27): void {
            this.list_attr.x = x;
        }

    }
}