namespace game.mod.xianlu {

    export class LingmaiItemRender extends eui.ItemRenderer {
        public img_icon: eui.Image;
        public img_lock: eui.Image;
        public data: {lv: number, isAct: boolean};

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let lv = this.data.lv;
            let isAct = this.data.isAct;
            this.img_icon.source = "lingmai_lv" + lv;
            if(lv == LingmaiMaxLv){
                this.img_lock.visible = false;
                if(!isAct){
                    this.img_icon.source = "lingmai_lingqiuhui";
                }
            }
            else {
                this.img_lock.visible = !isAct;
            }
        }
    }
}