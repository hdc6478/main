namespace game.mod.chat {


    import Event = egret.Event;

    export class EmoticonRender extends BaseRenderer {

        public img_item: eui.Image;
        public img_bg: eui.Image;
        private _isVip: boolean;
        public data: {type: number, idx: number};//type: ChatEmoticonType, idx: 表情idx

        protected onAddToStage(): void {
            super.onAddToStage();
            this.img_item.addEventListener(Event.COMPLETE, this.changeImgSize, this);
        }

        protected onRemoveFromStage(): void {
            super.onRemoveFromStage();
            this.img_item.removeEventListener(Event.COMPLETE, this.changeImgSize, this);
        }

        protected dataChanged() {
            if(!this.data){
                return;
            }
            let type = this.data.type;
            let idx = this.data.idx;
            this._isVip = type == ChatEmoticonType.Vip;
            this.img_bg.visible = this._isVip;
            this.width = this.img_bg.width = (this._isVip ? ChatEmoW[1] : ChatEmoW[0]);
            let faceName = type + "_" + idx;
            this.img_item.source = ResUtil.getUiFace(faceName);
        }

        private changeImgSize(e: egret.Event) {
            let _rate: number = 1;
            if (this._isVip) {
                _rate = Math.min(ChatEmoW[0] / this.img_item.texture.textureHeight, ChatEmoW[1] / this.img_item.texture.textureWidth);
            }
            this.img_item.scaleX = this.img_item.scaleY = _rate;
        }
    }
}
