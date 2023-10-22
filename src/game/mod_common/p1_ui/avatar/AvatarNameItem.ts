namespace game.mod {
    /**
     * 基础外显名称组件
     */
    export class AvatarNameItem extends eui.Component {
        public lab_name: eui.Label;
        public img_sr: eui.Image;

        constructor() {
            super();
            this.skinName = "skins.common.AvatarNameItemSkin";
        }

        /**
         * @param name 属性
         * @param quality 品质
         */
        public updateShow(name: string, quality?: number): void {
            this.lab_name.text = name;
            if (quality) {
                this.lab_name.textColor = ColorUtil.getColorByQuality1(quality);
            }
        }

        public updateSr(img: string): void {
            this.img_sr.source = img;
        }
    }
}