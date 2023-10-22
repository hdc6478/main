/** @internal */
namespace uilib {
    import Pool = base.Pool;
    import BitmapBase = game.BitmapBase;
    import Rectangle = egret.Rectangle;

    /**
     * 滚动条组件
     * @author lkp
     */
    export class ScrollBar extends UIComponent {
        /** @internal */ private _border: BitmapBase;
        /** @internal */ private _thumb: BitmapBase;

        /** @internal */ private _scrollTarget: IScrollEnabled;
        /** @internal */ private _layoutPolicy: string;
        /** @internal */ private _tw: number;
        /** @internal */ private _th: number;

        constructor() {
            super();
        }

        protected _setup(): void {
            let self = this;
            let img = self._border = Pool.alloc(BitmapBase);
            img.source = null;
            img.scale9Grid = Pool.alloc(Rectangle).setTo(8, 8, 1, 1);
            self.addChild(img);

            img = self._thumb = Pool.alloc(BitmapBase);
            img.source = null;
            img.scale9Grid = Pool.alloc(Rectangle).setTo(3, 8, 1, 1);
            img.width = 11;
            img.height = 70;
            self.addChild(img);
        }

        /**
         * 滚动条控制的目标
         */
        public get scrollTarget(): IScrollEnabled {
            return this._scrollTarget;
        }

        public set scrollTarget(value: IScrollEnabled) {
            this._scrollTarget = value;
        }

        public get layoutPolicy(): string {
            return this._layoutPolicy;
        }

        public set layoutPolicy(value: string) {
            this._layoutPolicy = value;
        }

        public setSize(sw: number, sh: number) {
            let self = this;
            if (self._layoutPolicy == UILayoutPolicy.HORIZONTAL) {
                self._border.width = sw;
                self._border.height = 17;
                self.width = sw;
                self.height = NaN;
                self._tw = sw;
                self._th = 0;
            } else if (self._layoutPolicy == UILayoutPolicy.VERTICAL) {
                self._border.width = 17;
                self._border.height = sh;
                self.width = NaN;
                self.height = sh;
                self._tw = 0;
                self._th = sh;
            }
            self.onPosChanged();
        }

        public onPosChanged(): void {
            let self = this;
            if (self._scrollTarget) {
                let tx: number = 0;
                if (self._tw > 0) {
                    tx = Math.min(self._tw * self._scrollTarget.scrollPos, self._tw - self._thumb.height - 3);
                }
                self._thumb.x = Math.max(tx, 3);
                let ty: number = 0;
                if (self._th > 0) {
                    ty = Math.min(self._th * self._scrollTarget.scrollPos, self._th - self._thumb.height - 3);
                }
                self._thumb.y = Math.max(ty, 3);
            }
        }

        public clear(): void {
            this._scrollTarget = null;
            super.clear();
        }

        public reset(): void {
            super.reset();
        }

        public dispose(): void {
            Pool.release(this._thumb);
            this._thumb = null;
            super.dispose();
        }

    }
}
