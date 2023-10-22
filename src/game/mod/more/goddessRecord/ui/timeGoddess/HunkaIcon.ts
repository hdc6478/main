namespace game.mod.more {


    export class HunkaIcon extends eui.ItemRenderer {

        private icon: Icon;
        private starListView: StarListView;
        private img_sel: eui.Image;
        private img_up: eui.Image;


        public data: PropData;//todo

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
        }
    }

}