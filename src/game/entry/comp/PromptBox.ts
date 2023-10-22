namespace game {

    import PoolObject = base.PoolObject;
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import TextField = egret.TextField;
    import Tween = base.Tween;
    import Pool = base.Pool;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Sine = base.Sine;
    import Handler = base.Handler;
    import Rectangle = egret.Rectangle;

    export class PromptBox implements UpdateItem {

        private _tips: string[];
        private _lastShowTime: number = 0;
        private readonly DURATION: number = 220;

        private static _instance: PromptBox;

        public showItems: PromptBoxItem[] = [];

        public static getIns(): PromptBox {
            if (this._instance == null) {
                this._instance = new PromptBox();
            }
            return this._instance;
        }

        public show(str: string) {
            if (!this._tips) {
                this._tips = [];
            }
            //正在显示，加入显示队列
            if (TimeMgr.time.serverTime - this._lastShowTime < this.DURATION) {
                this._tips.push(str);
                return;
            }
            if (this._tips.length == 0) {
                this.showTips(str);
            }
        }

        public showLanTips(str: string) {
            let s = getLanById(str);
            this.show(s);
        }

        private showTips(str: string) {
            if (this.showItems.length > 3) {
                let item = this.showItems[0];
                item.dispose();
            }
            this._lastShowTime = TimeMgr.time.serverTime;
            for (let item of this.showItems) {
                let h = item.height;
                Tween.get(item).to({y: item.y - h}, 200, null, Sine.easeIn);
            }
            let boxItem = Pool.alloc(PromptBoxItem);
            PromptBox.getIns().showItems.push(boxItem);
            boxItem.show(str);
            TimeMgr.addUpdateItem(this, 100);
        }

        private checkNext() {
            if (this._tips.length == 0) {
                TimeMgr.removeUpdateItem(this);
                return;
            }
            let tips = this._tips.shift();
            this.showTips(tips);
        }

        update(time: base.Time) {
            if (time.serverTime - this._lastShowTime >= this.DURATION) {
                this.checkNext();
            }
        }
    }

    export class PromptBoxItem extends DisplayObjectContainer implements PoolObject {

        private readonly MIN_W: number = 376;
        private _txt: TextField;
        private _imgBg: BitmapBase;
        private readonly COLOR: string[] = ["#W", "#G", "#B", "#P", "#O", "#R"];

        constructor() {
            super();
            this.initUI();
        }

        private initUI() {
            let self = this;
            self.width = this.MIN_W;
            self.height = 72;
            this.touchEnabled = false;
            this.touchChildren = false;

            self._imgBg = Pool.alloc(BitmapBase);
            self._imgBg.source = "common_tips";
            self._imgBg.height = self.height;
            self._imgBg.scale9Grid = Pool.alloc(Rectangle).setTo(this.MIN_W * 0.5, 24, 1, 1);
            self.addChild(self._imgBg);

            self._txt = Pool.alloc(TextField);
            self._txt.textAlign = egret.HorizontalAlign.CENTER;
            self._txt.verticalAlign = egret.VerticalAlign.MIDDLE;
            self._txt.height = self.height;
            self._txt.stroke = 1;
            self._txt.size = 26;
            self._txt.y = 0;
            self._txt.x = 0;
            self.addChild(self._txt);
        }

        private isFormatColor(str: string): boolean {
            for (let c of this.COLOR) {
                if (str.indexOf(c) > -1) {
                    return true;
                }
            }
            return false;
        }

        public show(str: string, layer: Layer = Layer.tip) {
            let self = this;
            let isFormat = this.isFormatColor(str);
            this._txt.textColor = isFormat ? UIColor.WHITE : UIColor.RED;
            if (isFormat) {
                this._txt.textFlow = TextUtil.parseHtml(StringUtil.replaceColorCode(str));
            } else {
                this._txt.textFlow = null;
                this._txt.text = str;
            }
            self.alpha = 1;
            let tW = this._txt.textWidth + 10;
            self.width = Math.max(tW + 200, self.MIN_W);
            self._imgBg.width = self.width;
            self._txt.width = self.width;

            self.x = (layer.width - self.width) * 0.5;
            self.y = (layer.height + self.height) * 0.5;

            if (isFormat) {
                self.y = (layer.height + self.height) * 0.25;
            }

            Tween.get(self)
                .to({y: self.y - 60, alpha: 1}, 200, null, Sine.easeIn)
                .delay(700)
                .to({alpha: 0}, 200, null, Sine.easeIn)
                .exec(Handler.alloc(self, self.onTweenDone));

            layer.addChild(this);
        }

        private onTweenDone() {
            Pool.release(this);
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            Tween.remove(this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
            let items = PromptBox.getIns().showItems;
            let idx = items.indexOf(this);
            if (idx > -1) {
                ArrayUtil.removeAt(items, idx);
            }
        }
    }
}