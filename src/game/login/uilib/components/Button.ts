/** @internal */
namespace uilib {
    import Pool = base.Pool;
    import TouchEvent = egret.TouchEvent;
    import BitmapBase = game.BitmapBase;
    import HorizontalAlign = egret.HorizontalAlign;
    import VerticalAlign = egret.VerticalAlign;

    /**
     * 按钮组件
     * @author lkp
     */
    export class Button extends UIComponent {
        protected _label: TextFieldBase;
        protected _display: BitmapBase;

        protected _captured: boolean; // 鼠标按下
        /** @internal */ private _source: any;

        constructor() {
            super();
        }

        protected _setup(): void {
            this.touchChildren = false;
        }

        public set source(value: any) {
            this._source = value;
            this.display();
        }

        public getDisplay():BitmapBase{
            return this._display;
        }

        public get source(): any {
            return this._source;
        }

        public get label(): string {
            if (this._label) {
                return this._label.text;
            }
            return "";
        }

        public set label(value: string) {
            let self = this;
            if (!self._label) {
                let label = self._label = Pool.alloc(TextFieldBase);
                label.width = self.width;
                label.height = self.height;
                label.textColor = 0x8A5226;
                label.size = 26;
                label.textAlign = HorizontalAlign.CENTER;
                label.verticalAlign = VerticalAlign.MIDDLE;
                self.addChild(label);
            }
            self._label.text = value;
        }

        /**设置按钮文本颜色*/
        public set textColor(value: number) {
            this._label.textColor = value;
        }

        /** @internal */ private onMouseEvent(e: TouchEvent): void {
            let self = this;
            switch (e.type) {
                case TouchEvent.TOUCH_END:
                    self._captured = false;
                    self._display.x = self._display.y = 0;
                    self._display.scaleX = self._display.scaleY = 1;
                    if (self._label) {
                        self._label.x = self._label.y = 0;
                        self._label.scaleX = self._label.scaleY = 1;
                    }
                    if (self.stage) {
                        self.stage.removeEventListener(TouchEvent.TOUCH_END, self.onMouseEvent, self);
                    }
                    break;

                case TouchEvent.TOUCH_BEGIN:
                    self._captured = true;
                    self._display.x = self.width * .05;
                    self._display.y = self.height * .05;
                    self._display.scaleX = self._display.scaleY = 0.9;
                    if (self._label) {
                        self._label.x = self.width * .05;
                        self._label.y = self.height * .05;
                        self._label.scaleX = self._label.scaleY = 0.9;
                    }
                    self.stage.addEventListener(TouchEvent.TOUCH_END, self.onMouseEvent, self);
                    break;
            }
            self.display();
        }

        public get curState(): string {
            if (this._enabled == false) {
                return ButtonState.DISABLED;
            }
            if (this._captured) {
                return ButtonState.DOWN;
            }
            return ButtonState.UP;
        }

        protected _setEnabled(value: boolean): void {
            super._setEnabled(value);
            this.display();
        }

        protected _render(): void {
            let self = this;
            if (!self._source) {
                return;
            }
            if (typeof self._source == "string") {
                self._display.source = self._source;
            }
            let state: string = self.curState;
            if (self._source.hasOwnProperty(state)) {
                self._display.source = self._source[state];
            }
        }

        public $setHeight(value: number) {
            let self = this;
            self.$explicitHeight = value;
            self._display.height = value;
            if (self._label) {
                self._label.height = value;
            }
        }

        public $setWidth(value: number): void {
            let self = this;
            self.$explicitWidth = value;
            self._display.width = value;
            if (self._label) {
                self._label.width = value;
            }
        }

        public reset(): void {
            let self = this;
            self._display = Pool.alloc(BitmapBase);
            self.addChild(self._display);

            self.addEventListener(TouchEvent.TOUCH_BEGIN, self.onMouseEvent, self);
            super.reset();
        }

        public clear(): void {
            let self = this;
            Pool.release(self._display);
            self._display = null;
            Pool.release(self._label);
            self._label = null;
            self.removeEventListener(TouchEvent.TOUCH_BEGIN, self.onMouseEvent, self);
            if (self.stage) {
                self.stage.removeEventListener(TouchEvent.TOUCH_END, self.onMouseEvent, self);
            }
            super.clear();
        }

        public dispose(): void {
            super.dispose();
        }

    }
}
