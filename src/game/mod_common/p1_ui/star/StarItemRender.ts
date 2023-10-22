namespace game.mod {

    export class StarItemRender extends eui.ItemRenderer {
        public img_star: eui.Image;
        public data: string;//星星资源

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.img_star.source = this.data;
        }
    }
}