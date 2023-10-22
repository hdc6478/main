namespace game.mod {
    /**
     * 基础装饰组件
     */
    export class BaseZhuangshiItem  extends eui.ItemRenderer {
        private lab_desc: eui.Label;
        public data: string;//已经转换好的文本

        //注释了，可以通用，自己设置不同皮肤
        // constructor() {
        //     super();
        //     this.skinName = "skins.common.BaseZhuangshiItemSkin";
        // }

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.lab_desc.textFlow = TextUtil.parseHtml(this.data);
        }

        /**
         * @param desc 描述文本，不推荐使用
         */
        public updateShow(desc: string): void {
            this.lab_desc.textFlow = TextUtil.parseHtml(desc);
        }
    }
}