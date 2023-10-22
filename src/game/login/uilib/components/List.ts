/** @internal */ namespace uilib {
    import DisplayObject = egret.DisplayObject;
    import TouchEvent = egret.TouchEvent;
    import Event = egret.Event;

    /**
     * 列表元件
     * @author lkp
     */
    export class List extends Box implements IPageEnabled {
        private _pageSize: number = 9999999;
        private _currentPage: number = 0;
        private _totalPage: number = 0;
        private _pageLoop: boolean;

        private _displayStartIndex: number;
        private _displayEndIndex: number;

        private _itemRender: any;
        private _dataProvider: ArrayList;
        private _selectedIndex: number = -1;

        constructor() {
            super();
        }

        protected _setup(): void {
            super._setup();
        }

        public set itemRender(value: any) {
            this._itemRender = value;
        }

        public get dataProvider(): ArrayList {
            return this._dataProvider;
        }

        /** 数据源 */
        public set dataProvider(value: ArrayList) {
            let self = this;
            self._removeListDataListeners();
            self._dataProvider = value;
            self._addListDataListeners();
            self._updateDisplayIndex();
            if (self._dataProvider) {
                self._dataRefreshHandler(null);
            }
        }

        public get pageSize(): number {
            return this._pageSize;
        }

        /** 每页显示数量，设置为0时表示不分页 */
        public set pageSize(value: number) {
            let self = this;
            if (self._pageSize == value) {
                return;
            }
            self._pageSize = value;
            self._updateDisplayIndex();
            self._dataRefreshHandler(null);
        }

        /** 当前选中的索引 */
        public set selectedIndex(value: number) {
            this._selectIndex(value);
        }

        public get selectedIndex(): number {
            return this._selectedIndex;
        }

        public getItemRenderAt(index: number): ItemRender {
            let self = this;
            if (index >= self._displayStartIndex && index < self._displayEndIndex) {
                let i: number = index - self._displayStartIndex;
                if (i < self.numChildren) {
                    return <ItemRender>self.getChildAt(index - self._displayStartIndex);
                }
            }
            return null;
        }

        public get currentPage(): number {
            return this._currentPage;
        }

        /** 当前页，仅当pageSize值大于0时有效 */
        public set currentPage(value: number) {
            let self = this;
            if (!self._pageSize) {
                return;
            }
            let oldPage: number = self._currentPage;
            let maxPage: number = Math.ceil(self._dataProvider.length / self._pageSize) - 1;
            maxPage = Math.max(0, maxPage);
            if (value < 0) {
                if (self._pageLoop) {
                    value = maxPage;
                } else {
                    return;
                }
            }
            if (value > maxPage) {
                if (self._pageLoop) {
                    value = 0;
                } else {
                    return;
                }
            }
            self._currentPage = value;
            self._updateDisplayIndex();
            self._dataRefreshHandler(null);
            if (oldPage != self._currentPage) {
                self._internalDispatch(self.newEvent(ListViewEvent.CURRENTPAGE_CHANGED));
            }
        }

        /**
         * 总页数，仅当pageSize值大于0时有效
         * <p>总页数改变时会派发<code>ListViewEvent.TOTALPAGE_CHAGED</code>事件
         */
        public get totalPage(): number {
            return this._totalPage;
        }

        protected _selectIndex(index: number, click: boolean = false): void {
            let self = this;
            if (index >= self._dataProvider.length || index < -2) {
                throw new RangeError("[ListView]位置 " + index + " 越界。");
            }
            let ir: ItemRender;
            let oldIndex: number = self._selectedIndex;
            if (index == -1) {
                ir = self.getItemRenderAt(self._selectedIndex);
                if (ir != null) {
                    ir.selected = false;
                }
            } else if (self._selectedIndex != index) {
                ir = self.getItemRenderAt(self._selectedIndex);
                if (ir != null) {
                    ir.selected = false;
                }
                ir = self.getItemRenderAt(index);
                if (ir != null) {
                    ir.selected = true;
                }
            }
            self._selectedIndex = index;

            let e: ListViewEvent = self.newEvent(ListViewEvent.INDEX_CHANGED);
            e.oldIndex = oldIndex;
            e.newIndex = index;
            e.click = click;
            self._internalDispatch(e);
        }

        private _updateDisplayIndex(): void {
            let self = this;
            if (self._pageSize > 0) {
                self._displayStartIndex = self._currentPage * self._pageSize;
                self._displayEndIndex = self._displayStartIndex + self._pageSize;
            } else {
                self._displayStartIndex = 0;
                self._displayEndIndex = self._dataProvider != null ? self._dataProvider.length : 0;
            }
        }

        protected _dataAddHandler(e: ListDataEvent): void {
            if (e.index < this._displayEndIndex) {
                this._dataRefreshHandler(null);
            } else {
                this._calculatePageTotal();
            }
        }

        protected _dataAddListHandler(e: ListDataEvent): void {
            if (e.index < this._displayEndIndex) {
                this._dataRefreshHandler(null);
            } else {
                this._calculatePageTotal();
            }
        }

        protected _dataDeleteHandler(e: ListDataEvent): void {
            if (e.index < this._displayEndIndex) {
                this._dataRefreshHandler(null);
            } else {
                this._calculatePageTotal();
            }
        }

        protected _dataClearHandler(e: ListDataEvent): void {
            this._dataRefreshHandler(null);
        }

        protected _dataUpdateHandler(e: ListDataEvent): void {
            let ir: ItemRender = this.getItemRenderAt(e.index);
            if (ir) {
                ir.data = this._dataProvider.getItemAt(e.index);
            }
        }

        protected _dataRefreshHandler(e: ListDataEvent): void {
            let self = this;
            if (!self._dataProvider) {
                return;
            }
            self._calculatePageTotal();
            let actualSize: number = self._pageSize;
            if (self._currentPage == self._totalPage - 1) {
                actualSize = self._dataProvider.length % self._pageSize;
                if (actualSize == 0 && self._dataProvider.length > 0) {
                    actualSize = self._pageSize;
                }
            }
            let n: number = self.numChildren;
            let i: number;
            for (i = n - 1; i >= actualSize; i--) {
                self._removeChildAt(i);
            }
            for (i = n; i < actualSize; i++) {
                self._addChildAt(new self._itemRender(), i);
            }
            for (i = 0; i < actualSize; i++) {
                let index: number = self._currentPage * self._pageSize + i;
                let ir: ItemRender = <ItemRender>self.getChildAt(i);
                ir.selected = false;
                ir.index = index;
                ir.data = self._dataProvider.getItemAt(index);
            }
            self.display();
            if (self._selectedIndex < self._dataProvider.length) {
                self._selectIndex(self._selectedIndex);
            } else {
                self._selectIndex(-1);
            }
        }

        protected _addChildAt(child: DisplayObject, index: number): void {
            child.addEventListener(TouchEvent.TOUCH_TAP, this._mouseHandler, this);
            super.addChildAt(child, index);
        }

        protected _removeChildAt(index: number): void {
            let child: ItemRender = <ItemRender>super.removeChildAt(index);
            child.removeEventListener(TouchEvent.TOUCH_TAP, this._mouseHandler, this);
            child.dispose();
        }

        protected _removeAllChildren(): void {
            for (let i: number = this.numChildren - 1; i > -1; i--) {
                this._removeChildAt(i);
            }
        }

        protected _mouseHandler(e: TouchEvent): void {
            let ir: ItemRender = <ItemRender>e.currentTarget;
            switch (e.type) {
                case TouchEvent.TOUCH_TAP:
                    if (ir) {
                        this._selectIndex(ir.index, true);
                    } else {
                        this._selectIndex(-1, true);
                    }
                    break;
            }
        }

        protected _calculatePageTotal(): void {
            let self = this;
            let oldTotalPage: number = self._totalPage;
            self._totalPage = Math.ceil(self._dataProvider.length / self._pageSize);
            if (self._totalPage == 0) {
                self._totalPage = 1;
            }
            if (self._currentPage >= self._totalPage) {
                self._currentPage = 0;
            }
            if (oldTotalPage != self._totalPage) {
                self._internalDispatch(self.newEvent(ListViewEvent.TOTALPAGE_CHAGED));
            }
        }

        protected _internalDispatch(e: Event): void {
            this.dispatchEvent(e);
        }

        private newEvent(type: string): ListViewEvent {
            return Event.create(ListViewEvent, type);
        }

        protected _addListDataListeners(): void {
            let self = this;
            if (self._dataProvider != null) {
                self._dataProvider.addEventListener(ListDataEvent.ADD, self._dataAddHandler, self);
                self._dataProvider.addEventListener(ListDataEvent.REMOVE, self._dataDeleteHandler, self);
                self._dataProvider.addEventListener(ListDataEvent.ADDARRAY, self._dataAddListHandler, self);
                self._dataProvider.addEventListener(ListDataEvent.UPDATE, self._dataUpdateHandler, self);
                self._dataProvider.addEventListener(ListDataEvent.CLEAR, self._dataClearHandler, self);
                self._dataProvider.addEventListener(ListDataEvent.REFRESH, self._dataRefreshHandler, self);
            }
        }

        protected _removeListDataListeners(): void {
            let self = this;
            if (self._dataProvider != null) {
                self._dataProvider.removeEventListener(ListDataEvent.ADD, self._dataAddHandler, self);
                self._dataProvider.removeEventListener(ListDataEvent.REMOVE, self._dataDeleteHandler, self);
                self._dataProvider.removeEventListener(ListDataEvent.ADDARRAY, self._dataAddListHandler, self);
                self._dataProvider.removeEventListener(ListDataEvent.UPDATE, self._dataUpdateHandler, self);
                self._dataProvider.removeEventListener(ListDataEvent.CLEAR, self._dataClearHandler, self);
                self._dataProvider.removeEventListener(ListDataEvent.REFRESH, self._dataRefreshHandler, self);
            }
        }

        public reset(): void {
            this._layoutWhenChanged = false;
            this._itemRender = ItemRender;
            super.reset();
        }

        public clear(): void {
            this._removeListDataListeners();
            this._removeAllChildren();
            this._dataProvider = null;
            this._itemRender = null;
            super.clear();
        }

        public dispose(): void {
            super.dispose();
        }

        public addChild(child: DisplayObject): DisplayObject {
            throw new Error("List不支持直接添加或移除显示对象");
        }

        public addChildAt(child: DisplayObject, index: number): DisplayObject {
            throw new Error("List不支持直接添加或移除显示对象");
        }

        public removeChild(child: DisplayObject): DisplayObject {
            throw new Error("List不支持直接添加或移除显示对象");
        }

        public removeChildAt(index: number): DisplayObject {
            throw new Error("List不支持直接添加或移除显示对象");
        }

    }
}
