namespace game.mod.chat {

    export class ChatDefaultTxtRender extends eui.ItemRenderer {
        public img_bg: eui.Image;
        public lab_content: eui.Label;
        public data: number;//id

        protected dataChanged(): void {
            super.dataChanged();
            this.img_bg.visible = this.itemIndex % 2 == 0;
            if (!this.data) {
                this.lab_content.text = "";
                return;
            }
            let rStr: string = getLanById("chat_phrase" + this.data);
            if (rStr) {
                this.lab_content.text = rStr;
            }
        }
    }
}