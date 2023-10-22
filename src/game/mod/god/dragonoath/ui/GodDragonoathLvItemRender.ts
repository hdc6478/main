namespace game.mod.god {



    export class GodDragonoathLvItemRender extends eui.ItemRenderer {
        public img_icon: eui.Image;
        public data: boolean;

        protected dataChanged(): void {
            this.img_icon.source = this.data ? "shengpin_huangse" : "shengpin_huise";
        }
    }
}