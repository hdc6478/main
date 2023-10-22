namespace game.mod.xianlu {

    export class XiuxianBreakItem extends eui.ItemRenderer {
        public img_icon: eui.Image;
        public lab_desc: eui.Label;

        public data: {icon: string, desc: string};//图标，描述

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.img_icon.source = this.data.icon;
            this.lab_desc.textFlow = TextUtil.parseHtml(this.data.desc);
        }
    }
}