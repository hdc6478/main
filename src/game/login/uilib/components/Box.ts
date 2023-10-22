/** @internal */
namespace uilib {
    import DisplayObject = egret.DisplayObject;

    /**
     * 自动布局的容器类
     * @author lkp
     */
    export class Box extends ScrollEnabledComponent {
        protected _layoutPolicy: string;
        protected _layoutMode: string;
        protected _gap: number = 0;
        protected _layoutWhenChanged: boolean;
        protected _gapV: number;
        protected _col: number = 2;

        protected _maxW: number = 0;
        protected _maxH: number = 0;

        constructor() {
            super();
        }

        protected _setup(): void {
            this._layoutMode = BoxLayoutMode.FIT_SIZE;
            this._layoutPolicy = UILayoutPolicy.HORIZONTAL;
            this._layoutWhenChanged = true;
        }

        /**
         * 布局方式，UILayoutPolicy
         */
        public get layoutPolicy(): string {
            return this._layoutPolicy;
        }

        public set layoutPolicy(value: string) {
            this._layoutPolicy = value;
            this.display();
        }

        public get layoutMode(): string {
            return this._layoutMode;
        }

        /**
         * 布局模式，BoxLayoutMode
         */
        public set layoutMode(value: string) {
            this._layoutMode = value;
            this.display();
        }

        /**
         * 布局间隙，当布局方式为网格布局时，此值表示横向间隙
         */
        public get gap(): number {
            return this._gap;
        }

        public set gap(value: number) {
            this._gap = value;
            this.display();
        }

        /** 网格布局时纵向间隙，仅在网格布局时生效 */
        public get gapV(): number {
            return this._gapV;
        }

        public set gapV(value: number) {
            this._gapV = value;
            this.display();
        }

        public get column(): number {
            return this._col;
        }

        /**
         * 列数，仅在网格布局时有效
         */
        public set column(value: number) {
            this._col = value;
        }

        /**
         * 当内容改变时立即自动布局，默认为true，如果为false，则在改变后需要手动调用display调整布局，这通常在同时改变多个内容后调用以节省开销
         */
        public set layoutWhenChanged(value: boolean) {
            this._layoutWhenChanged = value;
        }

        public get layoutWhenChanged(): boolean {
            return this._layoutWhenChanged;
        }

        protected _render(): void {
            this.layout()
        }

        public addChild(child: DisplayObject): DisplayObject {
            let self = this;
            child = super.addChild(child);
            self._maxW = Math.max(child.width, self._maxW);
            self._maxH = Math.max(child.height, self._maxH);
            if (self._layoutWhenChanged) {
                self.display();
            }
            return child;
        }

        public removeChild(child: DisplayObject): DisplayObject {
            let self = this;
            let item: DisplayObject = super.removeChild(child);
            if (child.width >= self._maxW || child.height >= self._maxH) {
                self.onMaxSizeChanged();
            }
            if (self._layoutWhenChanged) {
                self.display();
            }
            return item
        }

        protected onMaxSizeChanged(): void {
            let self = this;
            self._maxH = 0;
            self._maxW = 0;
            let len: number = self.numChildren;
            for (let i: number = 0; i < len; i++) {
                let item: DisplayObject = self.getChildAt(i);
                self._maxW = Math.max(self._maxW, item.width);
                self._maxH = Math.max(self._maxH, item.height);
            }
        }

        protected layout(): void {
            let self = this;
            let tx: number = 0;
            let ty: number = 0;
            let len: number = self.numChildren;
            for (let i: number = 0; i < len; i++) {
                let item: DisplayObject = self.getChildAt(i);
                switch (self._layoutPolicy) {
                    case UILayoutPolicy.HORIZONTAL:
                        switch (self._layoutMode) {
                            case BoxLayoutMode.MAX_SIZE:
                                item.x = i * (self._maxW + self._gap);
                                break;

                            case BoxLayoutMode.FIT_SIZE:
                                item.x = tx;
                                tx += item.width + self._gap;
                                break;
                        }
                        break;

                    case UILayoutPolicy.VERTICAL:
                        switch (self._layoutMode) {
                            case BoxLayoutMode.MAX_SIZE:
                                item.y = i * (self._maxH + self._gap);
                                break;

                            case BoxLayoutMode.FIT_SIZE:
                                item.y = ty;
                                ty += item.height + self._gap;
                                break;
                        }
                        break;

                    case UILayoutPolicy.GRID:
                        switch (self._layoutMode) {
                            case BoxLayoutMode.MAX_SIZE:
                                item.x = (self._maxW + self._gap) * Math.floor(i % self._col);
                                item.y = (self._maxH + self._gapV) * Math.floor(i / self._col);
                                break;

                            case BoxLayoutMode.FIT_SIZE:
                                if (i % self._col == 0) {
                                    tx = 0;
                                    ty += self._maxH + self._gapV;
                                }
                                item.x = tx;
                                item.y = ty;
                                tx += item.width + self._gap;
                                break;
                        }
                        break;
                }
            }
        }

    }
}
