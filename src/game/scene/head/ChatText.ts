namespace game.scene {


    import Pool = base.Pool;
    import TextField = egret.TextField;
    import Rectangle = egret.Rectangle;

    export class ChatText extends BaseDraw {

        private _width: number;
        private _height: number;
        private _imgChatBg: BitmapBase;
        private _labChatTxt: TextField;

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            let self = this;
            self._width = value;
            self.dsp.width = value;
            if (self._imgChatBg) {
                self._imgChatBg.width = value;
            }
            if (self._labChatTxt) {
                self._labChatTxt.width = value - self._labChatTxt.x * 2 + 30;
            }
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            let self = this;
            self._height = value;
            self.dsp.height = value;
            if (self._imgChatBg) {
                self._imgChatBg.height = value;
            }
        }

        protected initDsp(): void {
            super.initDsp();
            let s = this;
            s.width = 337;
            s._imgChatBg = s.dsp.addChild(Pool.alloc(BitmapBase)) as BitmapBase;
            s._imgChatBg.source = ResUtil.getUiPng("main_chat_bubble");
            s._imgChatBg.scale9Grid = Pool.alloc(Rectangle).setTo(231, 66, 6, 3);
            s._imgChatBg.x = -(this._width / 2);
            let lab = s._labChatTxt = new TextField();
            lab.stroke = 1;
            lab.strokeColor = 0x036562;
            lab.size = 20;
            lab.lineSpacing = 4;
            lab.x = -(this._width / 2) + 50;
            lab.y = 50;
            s.dsp.addChild(lab);
        }

        public setChatTxt(content: string): void {
            if (!content) {
                return;
            }
            let s = this;
            s._labChatTxt.textFlow = TextUtil.parseHtml(content);
            let labHeight = s._labChatTxt.textHeight < 45 ? 45 : s._labChatTxt.textHeight;
            s.height = labHeight + s._labChatTxt.y * 2 + 10;
        }

        public onRelease(): void {
            this._labChatTxt.textFlow = null;
            this._labChatTxt.text = "";
            super.onRelease();
        }
    }
}
