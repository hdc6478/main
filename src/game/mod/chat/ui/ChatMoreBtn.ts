namespace game.mod.chat {

    export class ChatMoreBtn extends eui.ItemRenderer {
        public iconDisplay: eui.Image;
        public data: string;//图标

        protected dataChanged(): void {
            if(!this.data){
                return;
            }
            this.iconDisplay.source = this.data;
        }
    }
}