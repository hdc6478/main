namespace game.mod {

    export class SpecialAttrItemRender extends eui.ItemRenderer {
        public lab_desc: eui.Label;
        public data: {descStr: string, maxWidth: number};//已经转换好的文本

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.lab_desc.textFlow = TextUtil.parseHtml(this.data.descStr);
            if(this.data.maxWidth){
                this.lab_desc.maxWidth = this.data.maxWidth;
            }
        }
    }
}