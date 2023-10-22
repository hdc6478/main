/** @internal */ namespace uilib {
    import Pool = base.Pool;
    import TouchEvent = egret.TouchEvent;
    import Rectangle = egret.Rectangle;
    import UpdateItem = base.UpdateItem;
    import TimeMgr = base.TimeMgr;
    import Tween = base.Tween;

    /**
     * 支持滚动的组件基类
     * @author lkp
     */
    export class ScrollEnabledComponent extends UIComponent implements IScrollEnabled, UpdateItem {
        protected _scrollPolicy: number;
        protected _scrollPos: number = 0;

        private _startV: number;
        private _startPos: number;

        private _refKey: "width" | "height";
        private _changeKey: "x" | "y";
        private _listenKey: "stageX" | "stageY";

        private _scrollBar: ScrollBar;

        private _velocity: number;
        private _curPos: number;
        private _prePos: number;
        private _preTime: number;

        constructor() {
            super();
        }

        /**
         * 滚动条出现策略，ScrollPolicy定义
         */
        public get scrollPolicy(): number {
            return this._scrollPolicy;
        }

        public set scrollPolicy(value: number) {
            this._scrollPolicy = value;
            this.updateComponent();
        }

        public get scrollPos(): number {
            return this._scrollPos;
        }

        public set scrollPos(value: number) {
            let self = this;
            value = Math.max(0, value);
            value = Math.min(1, value);
            if (value == self._scrollPos) {
                return;
            }
            self._scrollPos = value;
            if (self.scrollRect) {
                self.scrollRect[self._changeKey] = (self[self._refKey] - self.scrollRect[self._refKey]) * value;
            }
            if (self._scrollBar) {
                self._scrollBar.onPosChanged();
            }
        }

        private updateBarVisible(): void {
            let self = this;
            if (!self._scrollBar) {
                return;
            }
            if (self._scrollPolicy & ScrollPolicy.POLICY_ALWAYS) {
                self._scrollBar.visible = true;
            } else if (self._scrollPolicy & ScrollPolicy.POLICY_OFF) {
                self._scrollBar.visible = false;
            } else if (self._scrollPolicy & ScrollPolicy.POLICY_AUTO) {
                self._scrollBar.visible = null != self.scrollRect && self.scrollRect[self._refKey] <= self[self._refKey];
            }
        }

        private updateBarLocation(): void {
            let self = this;
            if (!self._scrollBar) {
                return;
            }
            if (self._scrollPolicy & ScrollPolicy.POS_TOP) {
                self._scrollBar.x = self.x;
                self._scrollBar.y = self.y - self._scrollBar.height;
            } else if (self._scrollPolicy & ScrollPolicy.POS_BOTTOM) {
                self._scrollBar.x = self.x;
                self._scrollBar.y = self.y + self.height;
            } else if (self._scrollPolicy & ScrollPolicy.POS_LEFT) {
                self._scrollBar.x = self.x - self._scrollBar.width;
                self._scrollBar.y = self.y;
            } else if (self._scrollPolicy & ScrollPolicy.POS_RIGHT) {
                self._scrollBar.x = self.x + self.width;
                self._scrollBar.y = self.y;
            }

        }

        private updateComponent(): void {
            let self = this;
            let horizontal: boolean = (self._scrollPolicy & ScrollPolicy.POS_BOTTOM) > 0 || (self._scrollPolicy & ScrollPolicy.POS_TOP) > 0;
            if (!self._scrollBar) {
                self._scrollBar = new ScrollBar();
                self._scrollBar.layoutPolicy = horizontal ? UILayoutPolicy.HORIZONTAL : UILayoutPolicy.VERTICAL;
                self._scrollBar.scrollTarget = self;
            }
            self.updateBarLocation();
            self.updateBarVisible();
            if (horizontal) {
                self._refKey = "width";
                self._changeKey = "x";
                self._listenKey = "stageX";
            } else {
                self._refKey = "height";
                self._changeKey = "y";
                self._listenKey = "stageY";
            }
        }

        public setScrollRect(sx: number, sy: number, sw: number, sh: number): void {
            let self = this;
            sx = +sx | 0;
            sy = +sy | 0;
            sw = +sw | 0;
            sh = +sh | 0;
            if (sx < 0 || sy < 0 || sw <= 0 || sh <= 0) {
                self.cleanComponent();
                return;
            }
            if (!self.scrollRect) {
                self.newComponent(sx, sy, sw, sh);
            } else {
                self.scrollRect.setTo(sx, sy, sw, sh);
            }
            self.graphics.clear();
            self.graphics.beginFill(0, 0);
            self.graphics.drawRect(sx, sy, sw, sh);
            self.graphics.endFill();
            self._scrollBar.setSize(sw, sh);
        }

        private newComponent(sx: number, sy: number, sw: number, sh: number): void {
            this.scrollRect = Pool.alloc(Rectangle).setTo(sx, sy, sw, sh);

            if (this.parent) {
                this.onAdded();
            }
        }

        private cleanComponent(): void {
            let self = this;
            if (self._scrollBar) {
                self._scrollBar.dispose();
                self._scrollBar = null;
            }
            Pool.release(self.scrollRect);
            self.scrollRect = null;
        }

        protected onTouchBegin(e: TouchEvent): void {
            let self = this;
            Tween.remove(self);
            self._velocity = self._curPos = self._prePos = 0;
            self._preTime = base.TimeMgr.time.time;
            self._startV = e[self._listenKey];
            self._startPos = self._scrollPos;
            self.addEventListener(TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
            self.stage.addEventListener(TouchEvent.TOUCH_END, self.onTouchEnd, self, true);
            self.addEventListener(TouchEvent.TOUCH_CANCEL, self.onTouchCancel, self);
            TimeMgr.addUpdateItem(self);
        }

        private removeListeners(): void {
            let self = this;
            TimeMgr.removeUpdateItem(self);
            self.removeEventListener(TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
            self.stage.removeEventListener(TouchEvent.TOUCH_END, self.onTouchEnd, self, true);
            self.removeEventListener(TouchEvent.TOUCH_CANCEL, self.onTouchCancel, self);
        }

        private onMoveEnd(endPos: number): void {
            let self = this;
            self.removeListeners();
            if (self._velocity) {
                let toPos = endPos + self._velocity * 1.2 * 500;
                let d = self._startV - toPos;
                let a = d / self[self._refKey];
                let p = self._startPos + a;
                p = Math.max(0, Math.min(1, p));
                if (p !== self.scrollPos) {
                    Tween.get(self).to({scrollPos: p}, 500, null, base.Sine.easeOut);
                }
            }
        }

        protected onTouchMove(e: TouchEvent): void {
            let self = this;
            self._curPos = e[self._listenKey];
            let d = self._startV - self._curPos;
            let a = d / self[self._refKey];
            self.scrollPos = self._startPos + a;
        }

        protected onTouchEnd(e: TouchEvent): void {
            this.onMoveEnd(e[this._listenKey]);
        }

        protected onTouchCancel(e: TouchEvent): void {
            this.onMoveEnd(e[this._listenKey]);
        }

        $setWidth(value: number): void {
            super.$setWidth(value);
            this.updateBarLocation();
        }

        $setHeight(value: number): void {
            super.$setHeight(value);
            this.updateBarLocation();
        }

        $setX(value: number): boolean {
            let r = super.$setX(value);
            this.updateBarLocation();
            return r;
        }

        $setY(value: number): boolean {
            let r = super.$setY(value);
            this.updateBarLocation();
            return r;
        }

        protected onAdded(): void {
            let self = this;
            if (self._scrollBar) {
                self.parent.addChild(self._scrollBar);
            }
            self.addEventListener(TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
        }

        protected onRemoved(): void {
            let self = this;
            if (self._scrollBar) {
                self._scrollBar.removeFromParent();
            }
            self.removeEventListener(TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
            self.removeListeners();
        }

        public reset(): void {
            super.reset();
            this.scrollPolicy = ScrollPolicy.POS_RIGHT | ScrollPolicy.POLICY_AUTO;
            this.scrollPos = 0;
        }

        public clear(): void {
            this.cleanComponent();
            super.clear();
        }

        public update(time: base.Time): void {
            let self = this;
            self._velocity = (self._curPos - self._prePos) / (time.time - self._preTime);
            self._preTime = time.time;
            self._prePos = self._curPos;
        }

    }
}
