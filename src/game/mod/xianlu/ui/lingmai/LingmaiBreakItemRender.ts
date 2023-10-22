namespace game.mod.xianlu {

    export class LingmaiBreakItemRender extends eui.ItemRenderer {
        public img_tag: eui.Image;
        public lab_desc: eui.Label;
        public data: {desc: string, isAct: boolean};//属性或者buff描述，是否激活

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let isAct = this.data.isAct;
            this.img_tag.source = isAct ? "xiaotubiaolvse" : "xiaotubiaohuise";
            this.lab_desc.textColor = isAct ? WhiteColor.DEFAULT : WhiteColor.GRAY;
            this.lab_desc.textFlow = TextUtil.parseHtml(this.data.desc);
        }
    }
}