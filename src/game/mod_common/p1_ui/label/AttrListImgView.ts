namespace game.mod {


    /**
     * 属性前带有图片的列表组件
     */
    export class AttrListImgView extends eui.Component {
        private list: eui.List;
        private _listData: eui.ArrayCollection;

        constructor() {
            super();
            this.skinName = `skins.common.AttrListImgSkin`;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(): void {
            this.list.itemRenderer = AttrItemImgRender;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
        }

        /**
         * 更新属性文本
         * @param attrAry 属性文本数组
         * @param img 属性文本前面的图片资源，默认星星资源
         */
        private updateShow(attrAry: string[] = [], img = 'star_6'): void {
            if (!attrAry || !attrAry.length) {
                return;
            }
            let list: IAttrItemImgData[] = [];
            for (let item of attrAry) {
                list.push({
                    attrStr: item,
                    img
                });
            }
            this._listData.replaceAll(list);
        }

        /**
         * 更新属性
         * @param attrList
         */
        public updateAttr(attrList: IAttrItemImgData[]): void {
            if (!attrList || !attrList.length) {
                return;
            }
            this._listData.replaceAll(attrList);
        }

        /**
         * 更新属性，+号
         * @param attr
         * @param color 默认 WhiteColor.GREEN
         * @param endStr 默认 \n
         * @param joinStr 默认 +
         * @param defaultColor 默认null
         * @param imgTag 不传则默认star_6资源
         */
        public updateAttrAdd(attr: msg.attributes, color: number = WhiteColor.GREEN, endStr: string = "\n", joinStr: string = " +",
                             defaultColor?: number, imgTag?: string): void {
            let attrList = TextUtil.getAttrTextInfos(attr, color, endStr, joinStr, defaultColor);
            this.updateShow(attrList, imgTag);
        }

    }

}