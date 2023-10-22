namespace game.mod {

    /**
     * 属性前带有图片的组件
     * 【图片 属性文本】
     */
    export class AttrItemImgRender extends eui.ItemRenderer {
        public img_tag: eui.Image;
        public lb_attr: eui.Label;

        public data: IAttrItemImgData;

        constructor() {
            super();
            this.skinName = `skins.common.AttrItemImgSkin`;
        }

        protected dataChanged() {
            let data = this.data;
            if (!data) {
                return;
            }
            this.setAttr(data.attrStr, data.img);
        }

        /**
         * 更新属性信息
         * @param attrStr 属性文本
         * @param imgTag 属性前面的图片资源，没有则隐藏，默认星星资源
         */
        private setAttr(attrStr: string, imgTag = 'star_6'): void {
            this.lb_attr.textFlow = TextUtil.parseHtml(attrStr);
            this.img_tag.visible = !!imgTag;
            if (imgTag) {
                this.img_tag.source = imgTag;
            }
        }
    }

    /**属性前带有图片的属性组件数据接口*/
    export interface IAttrItemImgData {
        img?: string;
        attrStr: string;
    }

}