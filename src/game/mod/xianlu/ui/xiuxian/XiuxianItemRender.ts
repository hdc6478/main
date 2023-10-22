namespace game.mod.xianlu {

    export class XiuxianItemRender extends eui.ItemRenderer {
        public lab_desc: eui.Label;
        public data: string;//描述

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.lab_desc.text = this.data;
        }
    }
}