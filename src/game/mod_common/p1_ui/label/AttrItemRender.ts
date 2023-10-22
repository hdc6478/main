namespace game.mod {
    /**
     * 通用属性组件
     */
    export class AttrItemRender extends eui.ItemRenderer {
        public lab_attr: eui.Label;
        public data: string;//已经转换好的文本

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.lab_attr.textFlow = TextUtil.parseHtml(this.data);
        }
    }
}