namespace game.mod {


    /**
     * 可通过对象池获得，代码手动添加到容器中展示
     * 基础的title
     */
    export class BaseNameItem extends BaseStageEventItem {
        public img_bg: eui.Image;
        public img_flag: eui.Image;
        public lb_name: eui.Label;

        constructor() {
            super();
            this.skinName = "skins.common.BaseNameItemSkin";
        }

        /**
         * 设置标题底图
         * @param bg 底图资源 ，默认 wenbenlansedi
         */
        public setBg(bg: string = 'wenbenlansedi'): void {
            this.img_bg.source = bg;
        }

        /**
         * 设置标题文本以及标题前面图片标识
         * @param name 标题文本
         * @param imgFlag 标题前面图片标识，默认 tipshuangsedian
         */
        public setTitle(name: string, imgFlag: string = 'tipshuangsedian'): void {
            this.lb_name.textFlow = TextUtil.parseHtml(name);
            this.img_flag.source = imgFlag;
        }
    }
}