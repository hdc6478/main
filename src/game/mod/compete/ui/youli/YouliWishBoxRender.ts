namespace game.mod.compete {

    export class YouliWishBoxItemRender extends BaseListenerRenderer {
        public img_desc: eui.Image;
        public icon: Icon;

        public data: IYouliWishBoxData;

        protected onAddToStage(): void {
            super.onAddToStage();
        }
        
        protected dataChanged(): void {
            if (!this.data) {
                return;
            }
            this.currentState = this.data.status;
            this.img_desc.source = this.data.descUrl;
            if(this.data.reward){
                this.icon.setData(this.data.reward);
            }
        }

    }
}