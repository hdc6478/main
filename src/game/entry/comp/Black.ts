namespace game {

    import Sprite = egret.Sprite;
    import TextField = egret.TextField;
    import HorizontalAlign = egret.HorizontalAlign;

    export class Black {

        private static _ins: Black;

        public static ins(): Black {
            if (this._ins == null) {
                this._ins = new Black();
            }
            return this._ins;
        }

        private _sp: Sprite;

        constructor() {
            this.initUI();
        }

        private initUI() {
            this._sp = new Sprite();
            this._sp.x = -Layer.tip.x;
            this._sp.y = -Layer.tip.y;
            this._sp.touchEnabled = true;

            let sw = Layer.tip.stage.stageWidth;
            let sh = Layer.tip.stage.stageHeight;


            this._sp.graphics.beginFill(0, 0.75);
            this._sp.graphics.drawRect(0, 0, 256, 256);
            this._sp.graphics.endFill();
            this._sp.scaleX = sw / 256;
            this._sp.scaleY = sh / 256;

            let lab = new TextField();
            lab.width = sw;
            lab.textAlign = HorizontalAlign.CENTER;
            lab.lineSpacing = 10;
            lab.textColor = 0xffffff;
            lab.stroke = 1;
            lab.strokeColor = 0xbb7644;
            lab.size = 40;
            lab.text = "请稍后...";

            lab.x = 0;
            lab.y = sh * 0.5 - 100;
            this._sp.addChild(lab);
        }

        public show() {
            Layer.tip.addChild(this._sp);
        }

        public hide() {
            if (this._sp && this._sp.parent) {
                this._sp.parent.removeChild(this._sp);
            }
        }
    }
}