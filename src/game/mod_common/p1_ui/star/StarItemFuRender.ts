namespace game.mod {

    export class StarItemFuRender extends eui.ItemRenderer {
        public img_star: eui.Image;
        public data: StarItemFuData;

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            let starStr = this.data.starStr;
            this.img_star.source = starStr;
            let width = this.data.width;
            if(width){
                this.img_star.width = width;
            }
        }
    }
}