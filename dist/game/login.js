var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/** @internal */
var uilib;
(function (uilib) {
    var Sprite = egret.Sprite;
    var SpriteBase = /** @class */ (function (_super) {
        __extends(SpriteBase, _super);
        function SpriteBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SpriteBase.prototype.removeFromParent = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        SpriteBase.prototype.dispose = function () {
        };
        SpriteBase.prototype.onAlloc = function () {
        };
        SpriteBase.prototype.onRelease = function () {
        };
        return SpriteBase;
    }(Sprite));
    uilib.SpriteBase = SpriteBase;
    __reflect(SpriteBase.prototype, "uilib.SpriteBase", ["base.PoolObject", "base.DisposeObject"]);
})(uilib || (uilib = {}));
/** @internal */
var uilib;
(function (uilib) {
    var Event = egret.Event;
    /**
     * ui组件基础类
     * @author lkp
     */
    var UIComponent = /** @class */ (function (_super) {
        __extends(UIComponent, _super);
        function UIComponent() {
            var _this = _super.call(this) || this;
            _this._enabled = false;
            _this.enabled = true;
            _this._setup();
            return _this;
        }
        UIComponent.prototype._setup = function () {
        };
        Object.defineProperty(UIComponent.prototype, "enabled", {
            get: function () {
                return this._enabled;
            },
            set: function (value) {
                this._setEnabled(value);
            },
            enumerable: true,
            configurable: true
        });
        UIComponent.prototype._setEnabled = function (value) {
            this.touchEnabled = value;
            this._enabled = value;
        };
        UIComponent.prototype.onAdded = function () {
        };
        UIComponent.prototype.onRemoved = function () {
        };
        UIComponent.prototype.display = function () {
            this._render();
        };
        UIComponent.prototype._render = function () {
        };
        UIComponent.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        UIComponent.prototype.onRelease = function () {
            var self = this;
            _super.prototype.onRelease.call(this);
            self.removeEventListener(Event.ADDED_TO_STAGE, self.onAdded, self);
            self.removeEventListener(Event.REMOVED_FROM_STAGE, self.onRemoved, self);
            self.clear();
        };
        UIComponent.prototype.onAlloc = function () {
            var self = this;
            _super.prototype.onAlloc.call(this);
            self.addEventListener(Event.ADDED_TO_STAGE, self.onAdded, self);
            self.addEventListener(Event.REMOVED_FROM_STAGE, self.onRemoved, self);
            self.reset();
        };
        UIComponent.prototype.clear = function () {
        };
        UIComponent.prototype.reset = function () {
        };
        return UIComponent;
    }(uilib.SpriteBase));
    uilib.UIComponent = UIComponent;
    __reflect(UIComponent.prototype, "uilib.UIComponent");
})(uilib || (uilib = {}));
/** @internal */ var uilib;
(function (uilib) {
    var Pool = base.Pool;
    var TouchEvent = egret.TouchEvent;
    var Rectangle = egret.Rectangle;
    var TimeMgr = base.TimeMgr;
    var Tween = base.Tween;
    /**
     * 支持滚动的组件基类
     * @author lkp
     */
    var ScrollEnabledComponent = /** @class */ (function (_super) {
        __extends(ScrollEnabledComponent, _super);
        function ScrollEnabledComponent() {
            var _this = _super.call(this) || this;
            _this._scrollPos = 0;
            return _this;
        }
        Object.defineProperty(ScrollEnabledComponent.prototype, "scrollPolicy", {
            /**
             * 滚动条出现策略，ScrollPolicy定义
             */
            get: function () {
                return this._scrollPolicy;
            },
            set: function (value) {
                this._scrollPolicy = value;
                this.updateComponent();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollEnabledComponent.prototype, "scrollPos", {
            get: function () {
                return this._scrollPos;
            },
            set: function (value) {
                var self = this;
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
            },
            enumerable: true,
            configurable: true
        });
        ScrollEnabledComponent.prototype.updateBarVisible = function () {
            var self = this;
            if (!self._scrollBar) {
                return;
            }
            if (self._scrollPolicy & 32 /* POLICY_ALWAYS */) {
                self._scrollBar.visible = true;
            }
            else if (self._scrollPolicy & 64 /* POLICY_OFF */) {
                self._scrollBar.visible = false;
            }
            else if (self._scrollPolicy & 16 /* POLICY_AUTO */) {
                self._scrollBar.visible = null != self.scrollRect && self.scrollRect[self._refKey] <= self[self._refKey];
            }
        };
        ScrollEnabledComponent.prototype.updateBarLocation = function () {
            var self = this;
            if (!self._scrollBar) {
                return;
            }
            if (self._scrollPolicy & 8 /* POS_TOP */) {
                self._scrollBar.x = self.x;
                self._scrollBar.y = self.y - self._scrollBar.height;
            }
            else if (self._scrollPolicy & 4 /* POS_BOTTOM */) {
                self._scrollBar.x = self.x;
                self._scrollBar.y = self.y + self.height;
            }
            else if (self._scrollPolicy & 1 /* POS_LEFT */) {
                self._scrollBar.x = self.x - self._scrollBar.width;
                self._scrollBar.y = self.y;
            }
            else if (self._scrollPolicy & 2 /* POS_RIGHT */) {
                self._scrollBar.x = self.x + self.width;
                self._scrollBar.y = self.y;
            }
        };
        ScrollEnabledComponent.prototype.updateComponent = function () {
            var self = this;
            var horizontal = (self._scrollPolicy & 4 /* POS_BOTTOM */) > 0 || (self._scrollPolicy & 8 /* POS_TOP */) > 0;
            if (!self._scrollBar) {
                self._scrollBar = new uilib.ScrollBar();
                self._scrollBar.layoutPolicy = horizontal ? "horizontal" /* HORIZONTAL */ : "vertical" /* VERTICAL */;
                self._scrollBar.scrollTarget = self;
            }
            self.updateBarLocation();
            self.updateBarVisible();
            if (horizontal) {
                self._refKey = "width";
                self._changeKey = "x";
                self._listenKey = "stageX";
            }
            else {
                self._refKey = "height";
                self._changeKey = "y";
                self._listenKey = "stageY";
            }
        };
        ScrollEnabledComponent.prototype.setScrollRect = function (sx, sy, sw, sh) {
            var self = this;
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
            }
            else {
                self.scrollRect.setTo(sx, sy, sw, sh);
            }
            self.graphics.clear();
            self.graphics.beginFill(0, 0);
            self.graphics.drawRect(sx, sy, sw, sh);
            self.graphics.endFill();
            self._scrollBar.setSize(sw, sh);
        };
        ScrollEnabledComponent.prototype.newComponent = function (sx, sy, sw, sh) {
            this.scrollRect = Pool.alloc(Rectangle).setTo(sx, sy, sw, sh);
            if (this.parent) {
                this.onAdded();
            }
        };
        ScrollEnabledComponent.prototype.cleanComponent = function () {
            var self = this;
            if (self._scrollBar) {
                self._scrollBar.dispose();
                self._scrollBar = null;
            }
            Pool.release(self.scrollRect);
            self.scrollRect = null;
        };
        ScrollEnabledComponent.prototype.onTouchBegin = function (e) {
            var self = this;
            Tween.remove(self);
            self._velocity = self._curPos = self._prePos = 0;
            self._preTime = base.TimeMgr.time.time;
            self._startV = e[self._listenKey];
            self._startPos = self._scrollPos;
            self.addEventListener(TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
            self.stage.addEventListener(TouchEvent.TOUCH_END, self.onTouchEnd, self, true);
            self.addEventListener(TouchEvent.TOUCH_CANCEL, self.onTouchCancel, self);
            TimeMgr.addUpdateItem(self);
        };
        ScrollEnabledComponent.prototype.removeListeners = function () {
            var self = this;
            TimeMgr.removeUpdateItem(self);
            self.removeEventListener(TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
            self.stage.removeEventListener(TouchEvent.TOUCH_END, self.onTouchEnd, self, true);
            self.removeEventListener(TouchEvent.TOUCH_CANCEL, self.onTouchCancel, self);
        };
        ScrollEnabledComponent.prototype.onMoveEnd = function (endPos) {
            var self = this;
            self.removeListeners();
            if (self._velocity) {
                var toPos = endPos + self._velocity * 1.2 * 500;
                var d = self._startV - toPos;
                var a = d / self[self._refKey];
                var p = self._startPos + a;
                p = Math.max(0, Math.min(1, p));
                if (p !== self.scrollPos) {
                    Tween.get(self).to({ scrollPos: p }, 500, null, base.Sine.easeOut);
                }
            }
        };
        ScrollEnabledComponent.prototype.onTouchMove = function (e) {
            var self = this;
            self._curPos = e[self._listenKey];
            var d = self._startV - self._curPos;
            var a = d / self[self._refKey];
            self.scrollPos = self._startPos + a;
        };
        ScrollEnabledComponent.prototype.onTouchEnd = function (e) {
            this.onMoveEnd(e[this._listenKey]);
        };
        ScrollEnabledComponent.prototype.onTouchCancel = function (e) {
            this.onMoveEnd(e[this._listenKey]);
        };
        ScrollEnabledComponent.prototype.$setWidth = function (value) {
            _super.prototype.$setWidth.call(this, value);
            this.updateBarLocation();
        };
        ScrollEnabledComponent.prototype.$setHeight = function (value) {
            _super.prototype.$setHeight.call(this, value);
            this.updateBarLocation();
        };
        ScrollEnabledComponent.prototype.$setX = function (value) {
            var r = _super.prototype.$setX.call(this, value);
            this.updateBarLocation();
            return r;
        };
        ScrollEnabledComponent.prototype.$setY = function (value) {
            var r = _super.prototype.$setY.call(this, value);
            this.updateBarLocation();
            return r;
        };
        ScrollEnabledComponent.prototype.onAdded = function () {
            var self = this;
            if (self._scrollBar) {
                self.parent.addChild(self._scrollBar);
            }
            self.addEventListener(TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
        };
        ScrollEnabledComponent.prototype.onRemoved = function () {
            var self = this;
            if (self._scrollBar) {
                self._scrollBar.removeFromParent();
            }
            self.removeEventListener(TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
            self.removeListeners();
        };
        ScrollEnabledComponent.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.scrollPolicy = 2 /* POS_RIGHT */ | 16 /* POLICY_AUTO */;
            this.scrollPos = 0;
        };
        ScrollEnabledComponent.prototype.clear = function () {
            this.cleanComponent();
            _super.prototype.clear.call(this);
        };
        ScrollEnabledComponent.prototype.update = function (time) {
            var self = this;
            self._velocity = (self._curPos - self._prePos) / (time.time - self._preTime);
            self._preTime = time.time;
            self._prePos = self._curPos;
        };
        return ScrollEnabledComponent;
    }(uilib.UIComponent));
    uilib.ScrollEnabledComponent = ScrollEnabledComponent;
    __reflect(ScrollEnabledComponent.prototype, "uilib.ScrollEnabledComponent", ["uilib.IScrollEnabled", "uilib.IDisplayObject", "base.UpdateItem"]);
})(uilib || (uilib = {}));
/** @internal */
var uilib;
(function (uilib) {
    /**
     * 自动布局的容器类
     * @author lkp
     */
    var Box = /** @class */ (function (_super) {
        __extends(Box, _super);
        function Box() {
            var _this = _super.call(this) || this;
            _this._gap = 0;
            _this._col = 2;
            _this._maxW = 0;
            _this._maxH = 0;
            return _this;
        }
        Box.prototype._setup = function () {
            this._layoutMode = "fit_size" /* FIT_SIZE */;
            this._layoutPolicy = "horizontal" /* HORIZONTAL */;
            this._layoutWhenChanged = true;
        };
        Object.defineProperty(Box.prototype, "layoutPolicy", {
            /**
             * 布局方式，UILayoutPolicy
             */
            get: function () {
                return this._layoutPolicy;
            },
            set: function (value) {
                this._layoutPolicy = value;
                this.display();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "layoutMode", {
            get: function () {
                return this._layoutMode;
            },
            /**
             * 布局模式，BoxLayoutMode
             */
            set: function (value) {
                this._layoutMode = value;
                this.display();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "gap", {
            /**
             * 布局间隙，当布局方式为网格布局时，此值表示横向间隙
             */
            get: function () {
                return this._gap;
            },
            set: function (value) {
                this._gap = value;
                this.display();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "gapV", {
            /** 网格布局时纵向间隙，仅在网格布局时生效 */
            get: function () {
                return this._gapV;
            },
            set: function (value) {
                this._gapV = value;
                this.display();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "column", {
            get: function () {
                return this._col;
            },
            /**
             * 列数，仅在网格布局时有效
             */
            set: function (value) {
                this._col = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "layoutWhenChanged", {
            get: function () {
                return this._layoutWhenChanged;
            },
            /**
             * 当内容改变时立即自动布局，默认为true，如果为false，则在改变后需要手动调用display调整布局，这通常在同时改变多个内容后调用以节省开销
             */
            set: function (value) {
                this._layoutWhenChanged = value;
            },
            enumerable: true,
            configurable: true
        });
        Box.prototype._render = function () {
            this.layout();
        };
        Box.prototype.addChild = function (child) {
            var self = this;
            child = _super.prototype.addChild.call(this, child);
            self._maxW = Math.max(child.width, self._maxW);
            self._maxH = Math.max(child.height, self._maxH);
            if (self._layoutWhenChanged) {
                self.display();
            }
            return child;
        };
        Box.prototype.removeChild = function (child) {
            var self = this;
            var item = _super.prototype.removeChild.call(this, child);
            if (child.width >= self._maxW || child.height >= self._maxH) {
                self.onMaxSizeChanged();
            }
            if (self._layoutWhenChanged) {
                self.display();
            }
            return item;
        };
        Box.prototype.onMaxSizeChanged = function () {
            var self = this;
            self._maxH = 0;
            self._maxW = 0;
            var len = self.numChildren;
            for (var i = 0; i < len; i++) {
                var item = self.getChildAt(i);
                self._maxW = Math.max(self._maxW, item.width);
                self._maxH = Math.max(self._maxH, item.height);
            }
        };
        Box.prototype.layout = function () {
            var self = this;
            var tx = 0;
            var ty = 0;
            var len = self.numChildren;
            for (var i = 0; i < len; i++) {
                var item = self.getChildAt(i);
                switch (self._layoutPolicy) {
                    case "horizontal" /* HORIZONTAL */:
                        switch (self._layoutMode) {
                            case "max_size" /* MAX_SIZE */:
                                item.x = i * (self._maxW + self._gap);
                                break;
                            case "fit_size" /* FIT_SIZE */:
                                item.x = tx;
                                tx += item.width + self._gap;
                                break;
                        }
                        break;
                    case "vertical" /* VERTICAL */:
                        switch (self._layoutMode) {
                            case "max_size" /* MAX_SIZE */:
                                item.y = i * (self._maxH + self._gap);
                                break;
                            case "fit_size" /* FIT_SIZE */:
                                item.y = ty;
                                ty += item.height + self._gap;
                                break;
                        }
                        break;
                    case "grid" /* GRID */:
                        switch (self._layoutMode) {
                            case "max_size" /* MAX_SIZE */:
                                item.x = (self._maxW + self._gap) * Math.floor(i % self._col);
                                item.y = (self._maxH + self._gapV) * Math.floor(i / self._col);
                                break;
                            case "fit_size" /* FIT_SIZE */:
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
        };
        return Box;
    }(uilib.ScrollEnabledComponent));
    uilib.Box = Box;
    __reflect(Box.prototype, "uilib.Box");
})(uilib || (uilib = {}));
/** @internal */
var uilib;
(function (uilib) {
    /**
     * 列表显示元件
     * @author lkp
     */
    var ItemRender = /** @class */ (function (_super) {
        __extends(ItemRender, _super);
        function ItemRender() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ItemRender.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (value) {
                this._index = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemRender.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                this.display();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemRender.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (value) {
                if (value == this._selected) {
                    return;
                }
                this._selected = value;
                this.onSelected();
            },
            enumerable: true,
            configurable: true
        });
        ItemRender.prototype.onSelected = function () {
        };
        return ItemRender;
    }(uilib.UIComponent));
    uilib.ItemRender = ItemRender;
    __reflect(ItemRender.prototype, "uilib.ItemRender");
})(uilib || (uilib = {}));
/** @internal */ var uilib;
(function (uilib) {
    var TouchEvent = egret.TouchEvent;
    var Event = egret.Event;
    /**
     * 列表元件
     * @author lkp
     */
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        function List() {
            var _this = _super.call(this) || this;
            _this._pageSize = 9999999;
            _this._currentPage = 0;
            _this._totalPage = 0;
            _this._selectedIndex = -1;
            return _this;
        }
        List.prototype._setup = function () {
            _super.prototype._setup.call(this);
        };
        Object.defineProperty(List.prototype, "itemRender", {
            set: function (value) {
                this._itemRender = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "dataProvider", {
            get: function () {
                return this._dataProvider;
            },
            /** 数据源 */
            set: function (value) {
                var self = this;
                self._removeListDataListeners();
                self._dataProvider = value;
                self._addListDataListeners();
                self._updateDisplayIndex();
                if (self._dataProvider) {
                    self._dataRefreshHandler(null);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "pageSize", {
            get: function () {
                return this._pageSize;
            },
            /** 每页显示数量，设置为0时表示不分页 */
            set: function (value) {
                var self = this;
                if (self._pageSize == value) {
                    return;
                }
                self._pageSize = value;
                self._updateDisplayIndex();
                self._dataRefreshHandler(null);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "selectedIndex", {
            get: function () {
                return this._selectedIndex;
            },
            /** 当前选中的索引 */
            set: function (value) {
                this._selectIndex(value);
            },
            enumerable: true,
            configurable: true
        });
        List.prototype.getItemRenderAt = function (index) {
            var self = this;
            if (index >= self._displayStartIndex && index < self._displayEndIndex) {
                var i = index - self._displayStartIndex;
                if (i < self.numChildren) {
                    return self.getChildAt(index - self._displayStartIndex);
                }
            }
            return null;
        };
        Object.defineProperty(List.prototype, "currentPage", {
            get: function () {
                return this._currentPage;
            },
            /** 当前页，仅当pageSize值大于0时有效 */
            set: function (value) {
                var self = this;
                if (!self._pageSize) {
                    return;
                }
                var oldPage = self._currentPage;
                var maxPage = Math.ceil(self._dataProvider.length / self._pageSize) - 1;
                maxPage = Math.max(0, maxPage);
                if (value < 0) {
                    if (self._pageLoop) {
                        value = maxPage;
                    }
                    else {
                        return;
                    }
                }
                if (value > maxPage) {
                    if (self._pageLoop) {
                        value = 0;
                    }
                    else {
                        return;
                    }
                }
                self._currentPage = value;
                self._updateDisplayIndex();
                self._dataRefreshHandler(null);
                if (oldPage != self._currentPage) {
                    self._internalDispatch(self.newEvent(uilib.ListViewEvent.CURRENTPAGE_CHANGED));
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "totalPage", {
            /**
             * 总页数，仅当pageSize值大于0时有效
             * <p>总页数改变时会派发<code>ListViewEvent.TOTALPAGE_CHAGED</code>事件
             */
            get: function () {
                return this._totalPage;
            },
            enumerable: true,
            configurable: true
        });
        List.prototype._selectIndex = function (index, click) {
            if (click === void 0) { click = false; }
            var self = this;
            if (index >= self._dataProvider.length || index < -2) {
                throw new RangeError("[ListView]位置 " + index + " 越界。");
            }
            var ir;
            var oldIndex = self._selectedIndex;
            if (index == -1) {
                ir = self.getItemRenderAt(self._selectedIndex);
                if (ir != null) {
                    ir.selected = false;
                }
            }
            else if (self._selectedIndex != index) {
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
            var e = self.newEvent(uilib.ListViewEvent.INDEX_CHANGED);
            e.oldIndex = oldIndex;
            e.newIndex = index;
            e.click = click;
            self._internalDispatch(e);
        };
        List.prototype._updateDisplayIndex = function () {
            var self = this;
            if (self._pageSize > 0) {
                self._displayStartIndex = self._currentPage * self._pageSize;
                self._displayEndIndex = self._displayStartIndex + self._pageSize;
            }
            else {
                self._displayStartIndex = 0;
                self._displayEndIndex = self._dataProvider != null ? self._dataProvider.length : 0;
            }
        };
        List.prototype._dataAddHandler = function (e) {
            if (e.index < this._displayEndIndex) {
                this._dataRefreshHandler(null);
            }
            else {
                this._calculatePageTotal();
            }
        };
        List.prototype._dataAddListHandler = function (e) {
            if (e.index < this._displayEndIndex) {
                this._dataRefreshHandler(null);
            }
            else {
                this._calculatePageTotal();
            }
        };
        List.prototype._dataDeleteHandler = function (e) {
            if (e.index < this._displayEndIndex) {
                this._dataRefreshHandler(null);
            }
            else {
                this._calculatePageTotal();
            }
        };
        List.prototype._dataClearHandler = function (e) {
            this._dataRefreshHandler(null);
        };
        List.prototype._dataUpdateHandler = function (e) {
            var ir = this.getItemRenderAt(e.index);
            if (ir) {
                ir.data = this._dataProvider.getItemAt(e.index);
            }
        };
        List.prototype._dataRefreshHandler = function (e) {
            var self = this;
            if (!self._dataProvider) {
                return;
            }
            self._calculatePageTotal();
            var actualSize = self._pageSize;
            if (self._currentPage == self._totalPage - 1) {
                actualSize = self._dataProvider.length % self._pageSize;
                if (actualSize == 0 && self._dataProvider.length > 0) {
                    actualSize = self._pageSize;
                }
            }
            var n = self.numChildren;
            var i;
            for (i = n - 1; i >= actualSize; i--) {
                self._removeChildAt(i);
            }
            for (i = n; i < actualSize; i++) {
                self._addChildAt(new self._itemRender(), i);
            }
            for (i = 0; i < actualSize; i++) {
                var index = self._currentPage * self._pageSize + i;
                var ir = self.getChildAt(i);
                ir.selected = false;
                ir.index = index;
                ir.data = self._dataProvider.getItemAt(index);
            }
            self.display();
            if (self._selectedIndex < self._dataProvider.length) {
                self._selectIndex(self._selectedIndex);
            }
            else {
                self._selectIndex(-1);
            }
        };
        List.prototype._addChildAt = function (child, index) {
            child.addEventListener(TouchEvent.TOUCH_TAP, this._mouseHandler, this);
            _super.prototype.addChildAt.call(this, child, index);
        };
        List.prototype._removeChildAt = function (index) {
            var child = _super.prototype.removeChildAt.call(this, index);
            child.removeEventListener(TouchEvent.TOUCH_TAP, this._mouseHandler, this);
            child.dispose();
        };
        List.prototype._removeAllChildren = function () {
            for (var i = this.numChildren - 1; i > -1; i--) {
                this._removeChildAt(i);
            }
        };
        List.prototype._mouseHandler = function (e) {
            var ir = e.currentTarget;
            switch (e.type) {
                case TouchEvent.TOUCH_TAP:
                    if (ir) {
                        this._selectIndex(ir.index, true);
                    }
                    else {
                        this._selectIndex(-1, true);
                    }
                    break;
            }
        };
        List.prototype._calculatePageTotal = function () {
            var self = this;
            var oldTotalPage = self._totalPage;
            self._totalPage = Math.ceil(self._dataProvider.length / self._pageSize);
            if (self._totalPage == 0) {
                self._totalPage = 1;
            }
            if (self._currentPage >= self._totalPage) {
                self._currentPage = 0;
            }
            if (oldTotalPage != self._totalPage) {
                self._internalDispatch(self.newEvent(uilib.ListViewEvent.TOTALPAGE_CHAGED));
            }
        };
        List.prototype._internalDispatch = function (e) {
            this.dispatchEvent(e);
        };
        List.prototype.newEvent = function (type) {
            return Event.create(uilib.ListViewEvent, type);
        };
        List.prototype._addListDataListeners = function () {
            var self = this;
            if (self._dataProvider != null) {
                self._dataProvider.addEventListener(uilib.ListDataEvent.ADD, self._dataAddHandler, self);
                self._dataProvider.addEventListener(uilib.ListDataEvent.REMOVE, self._dataDeleteHandler, self);
                self._dataProvider.addEventListener(uilib.ListDataEvent.ADDARRAY, self._dataAddListHandler, self);
                self._dataProvider.addEventListener(uilib.ListDataEvent.UPDATE, self._dataUpdateHandler, self);
                self._dataProvider.addEventListener(uilib.ListDataEvent.CLEAR, self._dataClearHandler, self);
                self._dataProvider.addEventListener(uilib.ListDataEvent.REFRESH, self._dataRefreshHandler, self);
            }
        };
        List.prototype._removeListDataListeners = function () {
            var self = this;
            if (self._dataProvider != null) {
                self._dataProvider.removeEventListener(uilib.ListDataEvent.ADD, self._dataAddHandler, self);
                self._dataProvider.removeEventListener(uilib.ListDataEvent.REMOVE, self._dataDeleteHandler, self);
                self._dataProvider.removeEventListener(uilib.ListDataEvent.ADDARRAY, self._dataAddListHandler, self);
                self._dataProvider.removeEventListener(uilib.ListDataEvent.UPDATE, self._dataUpdateHandler, self);
                self._dataProvider.removeEventListener(uilib.ListDataEvent.CLEAR, self._dataClearHandler, self);
                self._dataProvider.removeEventListener(uilib.ListDataEvent.REFRESH, self._dataRefreshHandler, self);
            }
        };
        List.prototype.reset = function () {
            this._layoutWhenChanged = false;
            this._itemRender = uilib.ItemRender;
            _super.prototype.reset.call(this);
        };
        List.prototype.clear = function () {
            this._removeListDataListeners();
            this._removeAllChildren();
            this._dataProvider = null;
            this._itemRender = null;
            _super.prototype.clear.call(this);
        };
        List.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        List.prototype.addChild = function (child) {
            throw new Error("List不支持直接添加或移除显示对象");
        };
        List.prototype.addChildAt = function (child, index) {
            throw new Error("List不支持直接添加或移除显示对象");
        };
        List.prototype.removeChild = function (child) {
            throw new Error("List不支持直接添加或移除显示对象");
        };
        List.prototype.removeChildAt = function (index) {
            throw new Error("List不支持直接添加或移除显示对象");
        };
        return List;
    }(uilib.Box));
    uilib.List = List;
    __reflect(List.prototype, "uilib.List", ["uilib.IPageEnabled"]);
})(uilib || (uilib = {}));
var game;
(function (game) {
    var facade = base.facade;
    var PreloadMgr = /** @class */ (function () {
        function PreloadMgr() {
        }
        Object.defineProperty(PreloadMgr, "isLoading", {
            /** @internal */
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PreloadMgr, "isAllComplete", {
            /** @internal */
            get: function () {
                return this._isAllComplete;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PreloadMgr, "curPro", {
            /** @internal */
            get: function () {
                return this._curPro;
            },
            enumerable: true,
            configurable: true
        });
        /** @internal */
        PreloadMgr.startLoad = function (allComplete) {
            var self = PreloadMgr;
            if (self._isAllComplete) {
                console.info("loading is all complete");
                if (typeof allComplete === "function") {
                    allComplete();
                }
                return;
            }
            if (allComplete) {
                self._allComplete = allComplete;
            }
            if (self._isLoading) {
                return;
            }
            gso.modCls = [];
            self._isAllComplete = false;
            self._isLoading = true;
            self.startLoadCod();
        };
        /** @internal */ PreloadMgr.startLoadCod = function () {
            if (typeof ggo.loadScript === "function") {
                ggo.loadScript(PreloadMgr.onCodPro, PreloadMgr.onCodComp);
            }
            else {
                console.error("loadScript function undefined");
            }
        };
        /** @internal */ PreloadMgr.onCodPro = function (p) {
            PreloadMgr.updatePro("cod", p);
        };
        /** @internal */ PreloadMgr.onCodComp = function () {
            var cls = gso.gameCls;
            if (cls) {
                new cls();
                for (var _i = 0, _a = gso.modCls; _i < _a.length; _i++) {
                    var mod_1 = _a[_i];
                    new mod_1();
                }
            }
            gso.gameCls = null;
            gso.modCls.length = 0;
        };
        PreloadMgr.onResPro = function (p) {
            PreloadMgr.updatePro("res", p);
        };
        PreloadMgr.onResComp = function () {
            var self = PreloadMgr;
            self._isAllComplete = true;
            self._isLoading = false;
            var fn = self._allComplete;
            self._allComplete = null;
            if (typeof fn === "function") {
                fn();
            }
            console.info(("onResComp"));
        };
        /** @internal */ PreloadMgr.updatePro = function (type, p) {
            var obj = this.LoadingPercent[type];
            if (!obj) {
                return;
            }
            var p1 = obj.start + Math.floor(p / 100 * obj.max);
            if (p1 === this._curPro) {
                return;
            }
            this._curPro = p1;
            facade.sendNt("preload_progress" /* PRELOAD_PROGRESS */);
        };
        /** @internal */ PreloadMgr._isLoading = false;
        /** @internal */ PreloadMgr._isAllComplete = false;
        /** @internal */ PreloadMgr._curPro = 0;
        /** @internal */ PreloadMgr.LoadingPercent = {
            "cod": { start: 0, max: 30 },
            "res": { start: 30, max: 70 }
        };
        return PreloadMgr;
    }());
    game.PreloadMgr = PreloadMgr;
    __reflect(PreloadMgr.prototype, "game.PreloadMgr");
})(game || (game = {}));
/** @internal */ var uilib;
(function (uilib) {
    var EventDispatcher = egret.EventDispatcher;
    var Event = egret.Event;
    var ArrayList = /** @class */ (function (_super) {
        __extends(ArrayList, _super);
        function ArrayList(source) {
            var _this = _super.call(this) || this;
            if (source) {
                _this.source = source;
            }
            return _this;
        }
        ArrayList.prototype.onAlloc = function () {
            this._source = [];
        };
        ArrayList.prototype.onRelease = function () {
            if (this._source) {
                this._source.length = 0;
            }
            this._source = null;
        };
        ArrayList.prototype.dispose = function () {
            this.onRelease();
        };
        Object.defineProperty(ArrayList.prototype, "length", {
            get: function () {
                return this._source.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArrayList.prototype, "source", {
            get: function () {
                return this._source;
            },
            set: function (value) {
                var self = this;
                if (value && value != self._source) {
                    self._source = value;
                    self._internalDispatch(self.newEvent(uilib.ListDataEvent.REFRESH));
                }
            },
            enumerable: true,
            configurable: true
        });
        ArrayList.prototype.addItemAt = function (item, index) {
            if (index < 0 || index > this.length) {
                throw new RangeError("[ArrayList]位置 " + index + " 越界。");
            }
            this._source.splice(index, 0, item);
            this._internalDispatch(this.newEvent(uilib.ListDataEvent.ADD, index, item));
        };
        ArrayList.prototype.addItem = function (item) {
            this.addItemAt(item, this.length);
        };
        ArrayList.prototype.getItemAt = function (index) {
            if (index < 0 || index >= this.length) {
                throw new RangeError("[ArrayList]位置 " + index + " 越界。");
            }
            return this._source[index];
        };
        ArrayList.prototype.getItemIndex = function (item) {
            return this._source.indexOf(item);
        };
        ArrayList.prototype.removeItemAt = function (index) {
            if (index < 0 || index >= this.length) {
                throw new RangeError("[ArrayList]位置 " + index + " 越界。");
            }
            var item = this._source.splice(index, 1)[0];
            this._internalDispatch(this.newEvent(uilib.ListDataEvent.REMOVE, index, item));
        };
        ArrayList.prototype.removeItem = function (item) {
            var index = this.getItemIndex(item);
            if (index > -1) {
                this.removeItemAt(index);
            }
        };
        ArrayList.prototype.addItemArray = function (array) {
            var index = this.length - 1;
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var item = array_1[_i];
                this._source.push(item);
            }
            this._internalDispatch(this.newEvent(uilib.ListDataEvent.ADDARRAY, index, array));
        };
        ArrayList.prototype.itemUpdated = function (index) {
            if (index < 0 || index >= this.length) {
                throw new RangeError("[ArrayList]位置 " + index + " 越界。");
            }
            this._internalDispatch(this.newEvent(uilib.ListDataEvent.UPDATE, index, this.getItemAt(index)));
        };
        ArrayList.prototype.setItemAt = function (item, index) {
            if (index < 0 || index >= this.length) {
                throw new RangeError("[ArrayList]位置 " + index + " 越界。");
            }
            this._source[index] = item;
            this._internalDispatch(this.newEvent(uilib.ListDataEvent.UPDATE, index, item));
        };
        ArrayList.prototype.removeAll = function () {
            this._source.splice(0, this.length);
            this._internalDispatch(this.newEvent(uilib.ListDataEvent.CLEAR));
        };
        ArrayList.prototype._internalDispatch = function (e) {
            this.dispatchEvent(e);
        };
        ArrayList.prototype.newEvent = function (type, index, data) {
            var e = Event.create(uilib.ListDataEvent, type);
            e.index = index;
            e.data = data;
            return e;
        };
        return ArrayList;
    }(EventDispatcher));
    uilib.ArrayList = ArrayList;
    __reflect(ArrayList.prototype, "uilib.ArrayList", ["base.PoolObject", "base.DisposeObject"]);
})(uilib || (uilib = {}));
/** @internal */
var uilib;
(function (uilib) {
    var TextField = egret.TextField;
    var TextFieldType = egret.TextFieldType;
    var TextFieldBase = /** @class */ (function (_super) {
        __extends(TextFieldBase, _super);
        function TextFieldBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._promptColor = 0x888888;
            return _this;
        }
        Object.defineProperty(TextFieldBase.prototype, "prompt", {
            get: function () {
                return this._prompt;
            },
            set: function (value) {
                if (this._prompt === value) {
                    return;
                }
                this._prompt = value;
                if (!this.text) {
                    this.showPromptText();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextFieldBase.prototype, "promptColor", {
            get: function () {
                return this._promptColor;
            },
            set: function (value) {
                value = +value | 0;
                if (this._promptColor === value) {
                    return;
                }
                this._promptColor = value;
                if (!this.text) {
                    this.showPromptText();
                }
            },
            enumerable: true,
            configurable: true
        });
        TextFieldBase.prototype.showPromptText = function () {
            if (this.type !== TextFieldType.INPUT) {
                return;
            }
            _super.prototype.$setTextColor.call(this, this._promptColor);
            this.text = this._prompt;
        };
        TextFieldBase.prototype.removeFromParent = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        TextFieldBase.prototype.dispose = function () {
            this.onRelease();
        };
        TextFieldBase.prototype.onAlloc = function () {
        };
        TextFieldBase.prototype.onRelease = function () {
            this.x = this.y = 0;
            this.removeFromParent();
            this.stroke = 0;
            this.width = undefined;
            this.name = "";
            this.textFlow = null;
            this.text = "";
            this.lineSpacing = 0;
        };
        return TextFieldBase;
    }(TextField));
    uilib.TextFieldBase = TextFieldBase;
    __reflect(TextFieldBase.prototype, "uilib.TextFieldBase", ["base.PoolObject", "base.DisposeObject"]);
})(uilib || (uilib = {}));
/** @internal */
var uilib;
(function (uilib) {
    var Pool = base.Pool;
    var TouchEvent = egret.TouchEvent;
    var BitmapBase = game.BitmapBase;
    var HorizontalAlign = egret.HorizontalAlign;
    var VerticalAlign = egret.VerticalAlign;
    /**
     * 按钮组件
     * @author lkp
     */
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super.call(this) || this;
        }
        Button.prototype._setup = function () {
            this.touchChildren = false;
        };
        Object.defineProperty(Button.prototype, "source", {
            get: function () {
                return this._source;
            },
            set: function (value) {
                this._source = value;
                this.display();
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.getDisplay = function () {
            return this._display;
        };
        Object.defineProperty(Button.prototype, "label", {
            get: function () {
                if (this._label) {
                    return this._label.text;
                }
                return "";
            },
            set: function (value) {
                var self = this;
                if (!self._label) {
                    var label = self._label = Pool.alloc(uilib.TextFieldBase);
                    label.width = self.width;
                    label.height = self.height;
                    label.textColor = 0x8A5226;
                    label.size = 26;
                    label.textAlign = HorizontalAlign.CENTER;
                    label.verticalAlign = VerticalAlign.MIDDLE;
                    self.addChild(label);
                }
                self._label.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "textColor", {
            /**设置按钮文本颜色*/
            set: function (value) {
                this._label.textColor = value;
            },
            enumerable: true,
            configurable: true
        });
        /** @internal */ Button.prototype.onMouseEvent = function (e) {
            var self = this;
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
        };
        Object.defineProperty(Button.prototype, "curState", {
            get: function () {
                if (this._enabled == false) {
                    return "disabled" /* DISABLED */;
                }
                if (this._captured) {
                    return "down" /* DOWN */;
                }
                return "up" /* UP */;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype._setEnabled = function (value) {
            _super.prototype._setEnabled.call(this, value);
            this.display();
        };
        Button.prototype._render = function () {
            var self = this;
            if (!self._source) {
                return;
            }
            if (typeof self._source == "string") {
                self._display.source = self._source;
            }
            var state = self.curState;
            if (self._source.hasOwnProperty(state)) {
                self._display.source = self._source[state];
            }
        };
        Button.prototype.$setHeight = function (value) {
            var self = this;
            self.$explicitHeight = value;
            self._display.height = value;
            if (self._label) {
                self._label.height = value;
            }
        };
        Button.prototype.$setWidth = function (value) {
            var self = this;
            self.$explicitWidth = value;
            self._display.width = value;
            if (self._label) {
                self._label.width = value;
            }
        };
        Button.prototype.reset = function () {
            var self = this;
            self._display = Pool.alloc(BitmapBase);
            self.addChild(self._display);
            self.addEventListener(TouchEvent.TOUCH_BEGIN, self.onMouseEvent, self);
            _super.prototype.reset.call(this);
        };
        Button.prototype.clear = function () {
            var self = this;
            Pool.release(self._display);
            self._display = null;
            Pool.release(self._label);
            self._label = null;
            self.removeEventListener(TouchEvent.TOUCH_BEGIN, self.onMouseEvent, self);
            if (self.stage) {
                self.stage.removeEventListener(TouchEvent.TOUCH_END, self.onMouseEvent, self);
            }
            _super.prototype.clear.call(this);
        };
        Button.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return Button;
    }(uilib.UIComponent));
    uilib.Button = Button;
    __reflect(Button.prototype, "uilib.Button");
})(uilib || (uilib = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var ItemRender = uilib.ItemRender;
        var Pool = base.Pool;
        var TextFieldBase = uilib.TextFieldBase;
        var ServerItemRender = /** @class */ (function (_super) {
            __extends(ServerItemRender, _super);
            function ServerItemRender() {
                return _super.call(this) || this;
            }
            ServerItemRender.prototype._setup = function () {
                this.height = 96;
                this.width = 428;
                var img = Pool.alloc(game.BitmapBase);
                img.source = game.GetLoginUrl("di2");
                img.width = 341;
                img.height = 96;
                this.addChild(img);
                //this.addEventListener(TouchEvent.TOUCH_TAP, this.onTap, img);
                var lab = this.labName = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 13;
                lab.y = 37;
                lab.size = 28;
                lab.width = 250;
                lab.bold = true;
                lab.textColor = 0x426e7b;
                this.addChild(lab);
                lab = this.labLv = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 142;
                lab.y = 45;
                lab.size = 20;
                lab.textColor = 0x007665;
                this.addChild(lab);
                lab = this.labTag = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 278;
                lab.y = 40;
                lab.size = 22;
                lab.strokeColor = 0x003c29;
                lab.stroke = 1;
                lab.textColor = 0xffffff;
                this.addChild(lab);
                img = this.imgTag = Pool.alloc(game.BitmapBase);
                img.source = game.GetLoginUrl("hong");
                img.x = 232;
                img.y = 30;
                this.addChild(img);
            };
            ServerItemRender.prototype._render = function () {
                var self = this;
                var server = self.data;
                if (!server) {
                    self.labName.text = "";
                    self.labTag.text = "";
                    return;
                }
                self.labName.text = server.name;
                // self.labLv.x = self.labName.textWidth + 15;
                self.imgTag.source = game.GetLoginUrl(game.ServerStatusImg[server.status]);
                self.labTag.textColor = game.ServerStatusColor[server.status];
                self.labTag.text = game.ServerStatusName[server.status];
                //self.addEventListener(TouchEvent.TOUCH_TAP, self.onTap, self);
                // self.addEventListener(TouchEvent.TOUCH_BEGIN, self.onTouchBegin,self);
                // self.addEventListener(TouchEvent.TOUCH_END, self.onTouchEnd,self);
            };
            return ServerItemRender;
        }(ItemRender));
        login.ServerItemRender = ServerItemRender;
        __reflect(ServerItemRender.prototype, "game.login.ServerItemRender");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var Cmd = base.Cmd;
        var OnReloadCmd = /** @class */ (function (_super) {
            __extends(OnReloadCmd, _super);
            function OnReloadCmd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OnReloadCmd.prototype.exec = function (n) {
                console.info("进入 OnReloadCmd");
                var proxy = this.retProxy(1 /* Login */);
                proxy.data.tryingReconnect = false;
                if (gso.isReConnect) {
                    ggo.loadVerbose("\u6B63\u5728\u83B7\u53D6\u670D\u52A1\u5668\u4FE1\u606F" /* GET_SERVER_INFO */);
                    proxy.getServerInfo(gso.reconnectId);
                }
                else {
                    console.info("OnReloadCmd 触发事件 LauncherEvent.SHOW_START");
                    this.sendNt("show_start" /* SHOW_START */);
                }
            };
            return OnReloadCmd;
        }(Cmd));
        login.OnReloadCmd = OnReloadCmd;
        __reflect(OnReloadCmd.prototype, "game.login.OnReloadCmd");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var facade = base.facade;
        var Cmd = base.Cmd;
        var OnRoleCreateCmd = /** @class */ (function (_super) {
            __extends(OnRoleCreateCmd, _super);
            function OnRoleCreateCmd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OnRoleCreateCmd.prototype.exec = function (n) {
                console.info("role create");
                var msg = n.body;
                if (msg.result == 1) {
                    facade.hideView("02" /* Login */, "03" /* CreateRole */);
                    var proxy = this.retProxy(1 /* Login */);
                    proxy.role_id = msg.role_id;
                    proxy.create_time = msg.create_time;
                    gso.roleId = msg.role_id.toString();
                    console.info("OnRoleCreateCmd  gso.roleId = " + gso.roleId);
                    var report = gzyyou.sdk.gankReport;
                    if (report) {
                        report("entergame_reg");
                    }
                    this.sendNt("load_game_res" /* LOAD_GAME_RES */);
                }
                else {
                    var str = game.CreateRoleMsg[msg.result];
                    if (!str) {
                        str = game.StringUtil.substitute("\u672A\u77E5\u9519\u8BEF\uFF1A%s" /* UnknownError */, [msg.result]);
                    }
                    facade.showView("02" /* Login */, "06" /* Alert */, str);
                    console.info(str);
                }
            };
            return OnRoleCreateCmd;
        }(Cmd));
        login.OnRoleCreateCmd = OnRoleCreateCmd;
        __reflect(OnRoleCreateCmd.prototype, "game.login.OnRoleCreateCmd");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var Cmd = base.Cmd;
        var facade = base.facade;
        var ShowStartViewCmd = /** @class */ (function (_super) {
            __extends(ShowStartViewCmd, _super);
            function ShowStartViewCmd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ShowStartViewCmd.prototype.exec = function (n) {
                var proxy = this.retProxy(1 /* Login */);
                //proxy.setServerData(gso.last_server.server_id, gso.last_server);
                //proxy.setServerData(gso.max_server.server_id, gso.max_server);
                //gso.logList[REPORT_LOAD.LOGIN_LOGIN + "1"] = "当前服务器选择id " + gso.last_server.server_id + JSON.stringify( gso.last_server)
                game.LogUtil.printLogin("显示登录界面或者开始页面");
                if (gzyyou.sdk.gankReport) {
                    gzyyou.sdk.gankReport("arrive");
                }
                var alertPrivacy = false;
                if (gso.all_is_new == 1) {
                    //新账号
                    game.LogUtil.printLogin("新账号跳过选服界面");
                    if (gso.server_info) {
                        if (gso.user_status != "1") {
                            facade.showView("02" /* Login */, "06" /* Alert */, "\u670D\u52A1\u5668\u7EF4\u62A4\u4E2D" /* ServerMaintenance */);
                        }
                        else {
                            game.LogUtil.printLogin("新账号链接服的信息11: " + JSON.stringify(gso.server_info));
                            proxy.handleServerInfoObj(gso.server_info);
                        }
                    }
                    else {
                        if (gso.agreement == 0 && alertPrivacy) {
                            game.LogUtil.printLogin("显示登录页面和隐私策略");
                            facade.showView("02" /* Login */, "01" /* Start */);
                            this.showPrivacy();
                        }
                        else {
                            ggo.loadVerbose("\u6B63\u5728\u83B7\u53D6\u670D\u52A1\u5668\u4FE1\u606F" /* GET_SERVER_INFO */);
                            game.LogUtil.printLogin("新账号链接服的信息22: " + JSON.stringify(gso.server_info));
                            proxy.getServerInfo(gso.max_server.server_id);
                        }
                    }
                }
                else if (gso.login_acc == "1") {
                    game.LogUtil.printLogin("通过LoginMdr 显示登录页面");
                    facade.showView("02" /* Login */, "07" /* Login */);
                }
                else {
                    game.LogUtil.printLogin("显示登录页面");
                    facade.showView("02" /* Login */, "01" /* Start */);
                    if (gso.agreement == 0 && alertPrivacy) {
                        game.LogUtil.printLogin("老号进入隐私政策");
                        this.showPrivacy();
                    }
                }
                //弹了隐私政策则不弹公告（目前只有手Q平台生效）
                if (gso.agreement == 1 && !alertPrivacy) {
                    proxy.getNotice();
                }
            };
            ShowStartViewCmd.prototype.showPrivacy = function () {
                if (gso.isWanjianShouq) {
                    facade.showView("02" /* Login */, "11" /* PrivacyAlert */);
                    return;
                }
                //facade.showView(ModName.Login, LoginViewType.Privacy, GameUtil.yszc);
            };
            return ShowStartViewCmd;
        }(Cmd));
        login.ShowStartViewCmd = ShowStartViewCmd;
        __reflect(ShowStartViewCmd.prototype, "game.login.ShowStartViewCmd");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var Handler = base.Handler;
        var Cmd = base.Cmd;
        var facade = base.facade;
        var StartConnectCmd = /** @class */ (function (_super) {
            __extends(StartConnectCmd, _super);
            function StartConnectCmd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            StartConnectCmd.prototype.exec = function (n) {
                if (!gso.host && !gso.port) {
                    var data = {
                        lab: "\u670D\u52A1\u5668\u5730\u5740\u9519\u8BEF\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165\u6E38\u620F" /* ServerUrlError */,
                        confirm: Handler.alloc(this, function () { return true; })
                    };
                    facade.showView("02" /* Login */, "06" /* Alert */, data);
                    return;
                }
                if (gso.isReload && gso.version && gso.lastVersion !== gso.version) {
                    var data = {
                        lab: "\u6E38\u620F\u5185\u5BB9\u6709\u66F4\u65B0\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165\u6E38\u620F" /* UpdateTips */,
                        confirm: Handler.alloc(this, function () { return true; })
                    };
                    facade.showView("02" /* Login */, "06" /* Alert */, data);
                    return;
                }
                if (gso.isWeixin) {
                    gzyyou.sdk.loadReport("load_connect" /* START_CONNECT */);
                }
                else {
                    ggo.loadVerbose("\u6B63\u5728\u8FDE\u63A5\u6E38\u620F\u670D\u52A1\u5668" /* START_CONNECT */);
                }
                console.log("=================START_CONNECT");
                console.info("start connect,", gso.isWeixin);
                gso.logList["load_connect" /* START_CONNECT */] = "请求后端连接 " + gso.host + (" " + gso.port + "/?pid=" + gso.agent_id + "&pname=" + gso.agent_name + "&sid=" + gso.merge_id);
                var proxy = this.retProxy(1 /* Login */);
                // if (DEBUG) {
                // @ts-ignore
                proxy.service.connectTo(gso.host, gso.port + "/?pid=" + gso.agent_id + "&pname=" + gso.agent_name + "&sid=" + gso.merge_id);
                // }
                // if (RELEASE) {
                //     proxy.service.connectTo(gso.host, gso.port.toString());
                // }
            };
            return StartConnectCmd;
        }(Cmd));
        login.StartConnectCmd = StartConnectCmd;
        __reflect(StartConnectCmd.prototype, "game.login.StartConnectCmd");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var facade = base.facade;
        var Cmd = base.Cmd;
        var TryReConnectCmd = /** @class */ (function (_super) {
            __extends(TryReConnectCmd, _super);
            function TryReConnectCmd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TryReConnectCmd.prototype.exec = function (n) {
                var proxy = this.retProxy(1 /* Login */);
                if (proxy.data.tryingReconnect) {
                    game.LogUtil.printLogin("TryReConnectCmd proxy.data.tryingReconnect");
                    return;
                }
                if (!proxy.data.isActive) {
                    game.LogUtil.printLogin("TryReConnectCmd !proxy.data.isActive");
                    return;
                }
                if (proxy.service.isConnected()) {
                    game.LogUtil.printLogin("TryReConnectCmd proxy.service.isConnected");
                    return;
                }
                if (proxy.data.disConnectReason !== 0 && proxy.data.disConnectReason !== -1) {
                    game.LogUtil.printLogin("TryReConnectCmd proxy.data.disConnectReason !== 0 && proxy.data.disConnectReason !== -1");
                    return;
                }
                game.LogUtil.printLogin("TryReConnectCmd 前端断开socket");
                proxy.service.close();
                if (proxy.data.reConnectCnt >= game.ReConnectMax) {
                    game.LogUtil.printLogin("TryReConnectCmd 重连次数已经等于或等于 8 了");
                    return;
                }
                if (!gso.serverId) {
                    game.LogUtil.printLogin("TryReConnectCmd !gso.serverId");
                    return;
                }
                proxy.data.reConnectCnt++;
                try {
                    facade.onConnectLost();
                }
                catch (e) {
                    console.error(e);
                }
                proxy.data.tryingReconnect = true;
                game.LogUtil.printLogin("TryReConnectCmd 再一次链接服务器(id=" + gso.serverId + ")");
                ggo.reconnect(gso.serverId);
            };
            return TryReConnectCmd;
        }(Cmd));
        login.TryReConnectCmd = TryReConnectCmd;
        __reflect(TryReConnectCmd.prototype, "game.login.TryReConnectCmd");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var Handler = base.Handler;
        var Cmd = base.Cmd;
        var facade = base.facade;
        var WebLoginErrorCmd = /** @class */ (function (_super) {
            __extends(WebLoginErrorCmd, _super);
            function WebLoginErrorCmd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WebLoginErrorCmd.prototype.exec = function (n) {
                var data = { lab: "\u65E0\u6CD5\u8FDE\u63A5\u5165\u53E3\u670D\u52A1\u5668" /* ConnectionLost */, confirm: Handler.alloc(this, this.onClick) };
                facade.showView("02" /* Login */, "06" /* Alert */, data);
            };
            WebLoginErrorCmd.prototype.onClick = function () {
                ggo.reconnect(0);
            };
            return WebLoginErrorCmd;
        }(Cmd));
        login.WebLoginErrorCmd = WebLoginErrorCmd;
        __reflect(WebLoginErrorCmd.prototype, "game.login.WebLoginErrorCmd");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var LoginModel = /** @class */ (function () {
            function LoginModel() {
                this.isActive = true;
                this.disConnectReason = 0;
                this.reConnectCnt = 0;
                this.gotServerList = false;
                this.serverMap = Object.create(null);
            }
            Object.defineProperty(LoginModel.prototype, "map_version", {
                get: function () {
                    return game.LoadMgr.ins.getRes("assets/map/map_version");
                },
                enumerable: true,
                configurable: true
            });
            LoginModel.prototype.clean = function () {
                this.gotServerList = false;
                this.lastServer = null;
                gso.last_server = null;
                gso.max_server = null;
            };
            return LoginModel;
        }());
        login.LoginModel = LoginModel;
        __reflect(LoginModel.prototype, "game.login.LoginModel");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var Proxy = base.Proxy;
        var facade = base.facade;
        var LoginProxy = /** @class */ (function (_super) {
            __extends(LoginProxy, _super);
            function LoginProxy() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(LoginProxy.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoginProxy.prototype, "role_id", {
                get: function () {
                    return this._data.role_id;
                },
                set: function (v) {
                    this._data.role_id = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoginProxy.prototype, "create_time", {
                get: function () {
                    return this._data.create_time;
                },
                set: function (v) {
                    this._data.create_time = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoginProxy.prototype, "disConnectPopBox", {
                get: function () {
                    return this._data.disConnectPopBox;
                },
                set: function (v) {
                    this._data.disConnectPopBox = v;
                },
                enumerable: true,
                configurable: true
            });
            LoginProxy.prototype.initialize = function () {
                this._data = new login.LoginModel();
                // 特别注意login模块代码里不要import msg.xxxxx，直接使用msg.xxxx
                this.onProto(msg.s2c_signin_account, this.onAccountLogin, this);
                this.onProto(msg.s2c_create_role, this.onCreateRole, this);
                this.onProto(msg.s2c_disconnect, this.onDisconnect, this);
                facade.onNt("on_deactivate" /* ON_DEACTIVATE */, this.onDeactivate, this);
                facade.onNt("on_activate" /* ON_ACTIVATE */, this.onActivate, this);
            };
            LoginProxy.prototype.onActivate = function () {
                game.LogUtil.printIsLoginAccount("LoginProxy onActivate LoginProxy.isLoginAccount = false");
                LoginProxy.isLoginAccount = false;
            };
            LoginProxy.prototype.onDeactivate = function () {
                game.LogUtil.printIsLoginAccount("LoginProxy onDeactivate LoginProxy.isLoginAccount = false");
                LoginProxy.isLoginAccount = false;
            };
            Object.defineProperty(LoginProxy.prototype, "serverIdList", {
                get: function () {
                    var map = this._data.serverMap;
                    var ids = [];
                    for (var k in map) {
                        ids.push(map[k].server_id);
                    }
                    return ids;
                },
                enumerable: true,
                configurable: true
            });
            LoginProxy.prototype.getServerData = function (id) {
                return this._data.serverMap[id];
            };
            LoginProxy.prototype.setServerData = function (id, data) {
                this._data.serverMap[id] = data;
            };
            LoginProxy.prototype.getServerInfo = function (server_id) {
                var _this = this;
                if (gso.user_status != "1") {
                    if (!gso.user_status) {
                        gso.user_status = "100";
                    }
                    facade.showView("02" /* Login */, "06" /* Alert */, game.ApiUserStatus[gso.user_status]);
                    return;
                }
                gso.logList["load_connect" /* START_CONNECT */] = "请求后台区服信息" + server_id;
                gzyyou.sdk.getServerInfo(server_id, function (obj) { return _this.onGotServerInfo(obj); });
            };
            LoginProxy.prototype.onGotServerInfo = function (obj) {
                this.handleServerInfoObj(obj);
            };
            LoginProxy.prototype.handleServerInfoObj = function (obj) {
                // Alert.show("进入游戏111111111111111111");
                gso.logList["load_connect" /* START_CONNECT */] = "后台区服信息返回" + JSON.stringify(obj);
                if (obj.user_status != "0") {
                    var str = game.UserStatusName[obj.user_status];
                    if (str) {
                        facade.showView("02" /* Login */, "06" /* Alert */, str);
                    }
                    // Alert.show("进入游戏22222222222222222222");
                    return;
                }
                // Alert.show("成功进入游戏111111111111111111");
                if (this._data.serverMap[obj.server_id]) {
                    gso.serverName = this._data.serverMap[obj.server_id].name;
                }
                else {
                    gso.serverName = "";
                }
                gso.host = obj.ip;
                gso.port = obj.port;
                gso.isNew = obj.is_new == "1";
                gso.client_ip = obj.client_ip;
                game.LogUtil.printLogin("obj.server_id = " + obj.server_id);
                gso.serverId = obj.server_id;
                console.info("gso.serverId = " + gso.serverId);
                gso.agent_id = obj.agent_id;
                gso.agent_name = obj.agent_name;
                obj.all_is_new = gso.all_is_new;
                gso.merge_id = obj.merge_id || obj.server_id;
                gso.loginParams = JSON.stringify(obj);
                game.LogUtil.printLogin("打印登录参数" + gso.loginParams);
                this.sendNt("on_got_server_info" /* ON_GOT_SERVER_INFO */);
            };
            LoginProxy.prototype.getServerList = function () {
                var _this = this;
                gzyyou.sdk.getServerList(function (obj) { return _this.onGotServerList(obj); });
            };
            LoginProxy.prototype.onGotServerList = function (obj) {
                // if (typeof obj.last_server_list.shift != "function") {
                //     console.log("获取服务器列表错误");
                //     return;
                // }
                if (!obj.last_server_list || obj.last_server_list.length <= 0) {
                    console.info("获取服务器列表错误");
                    return;
                }
                this._data.gotServerList = true;
                if (obj.last_server_list.length > 10) {
                    obj.last_server_list.length = 10;
                }
                this._data.lastServer = obj.last_server_list;
                for (var i = 0, n = obj.server_list.length; i < n; i++) {
                    var server = obj.server_list[i];
                    if (server.status != "0" || gso.is_white) {
                        this._data.serverMap[server.server_id] = server;
                    }
                }
                facade.showView("02" /* Login */, "02" /* SelectServer */);
            };
            LoginProxy.prototype.getNotice = function () {
                var _this = this;
                gzyyou.sdk.getNotice(function (notice) { return _this.onGotNotice(notice); });
            };
            LoginProxy.prototype.onGotNotice = function (notice) {
                gso.updateNotice = notice;
                if (notice) {
                    // let updateDate: Date = new Date(parseInt(notice.update_date) * 1000);
                    gso.isNoticeActive = notice.notice_title != null; //Date.now() < updateDate.getTime();
                    if (gso.isNoticeActive) {
                        this.sendNt("show_notice" /* SHOW_NOTICE */);
                    }
                }
            };
            LoginProxy.prototype.clean = function () {
                this._data.clean();
            };
            LoginProxy.prototype.onStartReconnect = function () {
                _super.prototype.onStartReconnect.call(this);
                this._data.role_id = null;
            };
            LoginProxy.prototype.onAccountLogin = function (ntfy) {
                var self = this;
                var msg = ntfy.body;
                game.LogUtil.printLogin("账号请求返回 msg.result = " + msg.result);
                gso.logList["load_connect" /* START_CONNECT */ + "5"] = "s2c_signin_account" + JSON.stringify(msg);
                if (msg.result != 1) {
                    if (game.SignAccountMsg[msg.result]) {
                        facade.showView("02" /* Login */, "06" /* Alert */, game.SignAccountMsg[msg.result]);
                    }
                    game.LogUtil.printIsLoginAccount("onAccountLogin  LoginProxy.isLoginAccount = false 1");
                    LoginProxy.isLoginAccount = false;
                    return;
                }
                if (!msg.role_id || msg.role_id.isZero()) {
                    facade.showView("02" /* Login */, "06" /* Alert */, "创角出错，s2c_signin_account 角色id为：" + msg.role_id);
                    game.LogUtil.printIsLoginAccount("onAccountLogin LoginProxy.isLoginAccount = false 2");
                    LoginProxy.isLoginAccount = false;
                    return;
                }
                self._data.role_id = msg.role_id;
                self._data.name = msg.name;
                self._data.level = msg.level;
                self._data.sex = msg.sex;
                self._data.school = msg.school;
                self._data.shape = msg.shape;
                self._data.create_time = msg.create_time;
                gso.createTime = msg.create_time;
                // gso.open_verify = msg.open_verify ? "1" : "0";
                self.sendNt("on_account_login" /* ON_ACCOUNT_LOGIN */);
                gso.loginParams = null;
            };
            LoginProxy.prototype.onCreateRole = function (ntfy) {
                console.info("接收登入信息...onCreateRole");
                var msg = ntfy.body;
                gso.logList["load_connect" /* START_CONNECT */ + "4"] = "服务端返回 s2c_create_role" + msg.result;
                this.sendNt("on_role_create" /* ON_ROLE_CREATE */, msg);
                if (msg.result == 1) {
                    //给后台打点创角
                    gzyyou.sdk.loadReport("s2c_create_role" /* S2C_CREATE_ROLE */);
                    //给平台打点创角（不准，先去掉）
                    // gzyyou.sdk.pointReport(RoleInfoType.Create, 0, RoleVo.ins.role_id +"", gso.roleName, 0, "0", TimeMgr.time.serverTimeSecond, 0,0,"",0,"0");
                }
            };
            LoginProxy.prototype.onDisconnect = function (ntfy) {
                var msg = ntfy.body;
                this._data.disConnectReason = msg.reason;
                this._data.disConnectMsg = msg.content;
                console.info("s2c_disconnect reason", msg.reason);
                LoginProxy.isLoginAccount = false;
                gso.logList["load_connect" /* START_CONNECT */ + "3"] = "服务端返回 s2c_disconnect" + msg.reason + " " + msg.content;
            };
            LoginProxy.prototype.createRole = function (name, sex, age, school) {
                var c2s = new msg.c2s_create_role();
                this._data.name = c2s.name = name;
                this._data.sex = c2s.sex = sex;
                this._data.age = c2s.age_type = age;
                this._data.school = c2s.school = school;
                this.sendProto(c2s);
            };
            LoginProxy.prototype.loginAccount = function (params) {
                game.LogUtil.printIsLoginAccount("LoginProxy.hasCode = " + this.hashCode);
                game.LogUtil.printIsLoginAccount("LoginProxy.isLoginAccount = " + LoginProxy.isLoginAccount);
                if (LoginProxy.isLoginAccount) {
                    return;
                }
                LoginProxy.isLoginAccount = true;
                var c2s = new msg.c2s_signin_account();
                c2s.param = params;
                c2s.channel = gso.channel;
                c2s.pb_version = game.protoVersion;
                c2s.map_version = this._data.map_version;
                this.sendProto(c2s);
                game.LogUtil.printLogin("账号登录请求");
                game.LogUtil.printLogin("协议版本号" + game.protoVersion);
                gso.logList["load_connect" /* START_CONNECT */ + "4"] = "请求 c2s_signin_account 服务端版本号" + game.protoVersion;
                // let self = this;
                // delayCall(Handler.alloc(self, function () {
                //     self._isLoginAccount = false;
                // }), 1000);
            };
            LoginProxy.prototype.loginRole = function (role_id) {
                if (!role_id) {
                    return;
                }
                game.LogUtil.printLogin("前端请求角色登录，角色id: " + role_id);
                var c2s = new msg.c2s_login_role();
                c2s.role_id = role_id;
                this.sendProto(c2s);
            };
            LoginProxy.isLoginAccount = false;
            return LoginProxy;
        }(Proxy));
        login.LoginProxy = LoginProxy;
        __reflect(LoginProxy.prototype, "game.login.LoginProxy", ["game.ILoginProxy", "base.IProxy"]);
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var UIComponent = uilib.UIComponent;
        var TextFieldBase = uilib.TextFieldBase;
        var Button = uilib.Button;
        var Pool = base.Pool;
        var VerticalAlign = egret.VerticalAlign;
        var HorizontalAlign = egret.HorizontalAlign;
        var Rectangle = egret.Rectangle;
        var TextFieldType = egret.TextFieldType;
        var AdultIdView = /** @class */ (function (_super) {
            __extends(AdultIdView, _super);
            function AdultIdView() {
                return _super.call(this) || this;
            }
            AdultIdView.prototype._setup = function () {
                this.width = 580;
                this.height = 393;
                var img;
                img = Pool.alloc(game.BitmapBase);
                img.source = "assets/ui_png/common_bg3.png";
                img.width = 619;
                img.height = 370;
                img.y = 23;
                img.x = -19;
                img.scale9Grid = Pool.alloc(Rectangle).setTo(360, 35, 1, 1);
                this.addChild(img);
                img = Pool.alloc(game.BitmapBase);
                img.source = "assets/ui_png/common_top3.png";
                img.width = 636;
                img.height = 32;
                img.x = -28;
                img.y = 0;
                this.addChild(img);
                img = Pool.alloc(game.BitmapBase);
                img.source = "common_titleBg2";
                img.width = 266;
                img.height = 44;
                img.x = 157;
                img.y = 38;
                img.scale9Grid = Pool.alloc(Rectangle).setTo(126, 19, 2, 1);
                this.addChild(img);
                img = Pool.alloc(game.BitmapBase);
                img.source = "common_txt_sfrzm";
                img.height = 30;
                img.width = 104;
                img.x = 238;
                img.y = 44;
                this.addChild(img);
                //内容背景
                img = Pool.alloc(game.BitmapBase);
                img.source = "common_di1";
                img.width = 530;
                img.height = 205;
                img.x = 25;
                img.y = 110;
                img.scale9Grid = Pool.alloc(Rectangle).setTo(11, 12, 1, 1);
                this.addChild(img);
                //输入框背景
                img = Pool.alloc(game.BitmapBase);
                img.source = "common_di1";
                img.width = 288;
                img.height = 38;
                img.x = 207;
                img.y = 133;
                img.scale9Grid = Pool.alloc(Rectangle).setTo(11, 12, 1, 1);
                this.addChild(img);
                img = Pool.alloc(game.BitmapBase);
                img.source = "common_di1";
                img.height = 38;
                img.width = 288;
                img.scale9Grid = Pool.alloc(Rectangle).setTo(11, 12, 1, 1);
                img.x = 207;
                img.y = 194;
                this.addChild(img);
                img = Pool.alloc(game.BitmapBase);
                img.source = "common_di1";
                img.height = 38;
                img.width = 288;
                img.x = 207;
                img.y = 254;
                img.scale9Grid = Pool.alloc(Rectangle).setTo(11, 12, 1, 1);
                this.addChild(img);
                var lab = this.labTip = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 180;
                lab.y = 98;
                lab.size = 22;
                lab.stroke = 1;
                lab.strokeColor = 0x000000;
                lab.textAlign = HorizontalAlign.CENTER;
                lab.verticalAlign = VerticalAlign.MIDDLE;
                lab.width = 360;
                lab.height = 24;
                lab.anchorOffsetX = 90;
                this.addChild(lab);
                // 账号
                lab = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 87;
                lab.y = 132;
                lab.size = 22;
                lab.textColor = 0x5f7365;
                lab.textAlign = HorizontalAlign.LEFT;
                lab.verticalAlign = VerticalAlign.MIDDLE;
                lab.width = 120;
                lab.bold = true;
                lab.height = 52;
                lab.text = "登录账号：";
                this.addChild(lab);
                lab = this.labAccount = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 214;
                lab.y = 143;
                lab.size = 22;
                lab.textColor = 0xFFFFFF;
                lab.stroke = 1;
                lab.textAlign = HorizontalAlign.LEFT;
                lab.verticalAlign = VerticalAlign.MIDDLE;
                lab.width = 275;
                lab.height = 24;
                this.addChild(lab);
                // 姓名
                lab = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 87;
                lab.y = 191;
                lab.size = 22;
                lab.textColor = 0x5f7365;
                lab.textAlign = HorizontalAlign.LEFT;
                lab.verticalAlign = VerticalAlign.MIDDLE;
                lab.width = 120;
                lab.height = 52;
                lab.bold = true;
                lab.text = "真实姓名：";
                this.addChild(lab);
                lab = this.labName = Pool.alloc(TextFieldBase);
                lab.touchEnabled = true;
                lab.type = TextFieldType.INPUT;
                lab.x = 214;
                lab.y = 201;
                lab.size = 22;
                lab.promptColor = 0xFFFFFF;
                lab.stroke = 1;
                // lab.strokeColor = 0x000000;
                lab.textAlign = HorizontalAlign.LEFT;
                lab.verticalAlign = VerticalAlign.MIDDLE;
                lab.width = 275;
                lab.height = 24;
                this.addChild(lab);
                // 身份证号
                lab = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 87;
                lab.y = 250;
                lab.size = 22;
                lab.textColor = 0x5f7365;
                lab.textAlign = HorizontalAlign.LEFT;
                lab.verticalAlign = VerticalAlign.MIDDLE;
                lab.width = 120;
                lab.height = 52;
                lab.text = "身份证号：";
                lab.bold = true;
                this.addChild(lab);
                lab = this.labIdentity = Pool.alloc(TextFieldBase);
                lab.touchEnabled = true;
                lab.type = TextFieldType.INPUT;
                lab.x = 216;
                lab.y = 261;
                lab.size = 22;
                lab.promptColor = 0xFFFFFF;
                lab.stroke = 1;
                // lab.strokeColor = 0x000000;
                lab.textAlign = HorizontalAlign.LEFT;
                lab.verticalAlign = VerticalAlign.MIDDLE;
                lab.width = 275;
                lab.height = 24;
                this.addChild(lab);
                var btn = this.btnConfirm = Pool.alloc(Button);
                btn.x = 341;
                btn.y = 319;
                btn.width = 135;
                btn.height = 52;
                btn.label = "提交认证";
                btn.source = "btn_com_green";
                this.addChild(btn);
                btn = this.btnCancel = Pool.alloc(Button);
                btn.x = 97;
                btn.y = 323;
                btn.width = 135;
                btn.height = 52;
                btn.label = "\u53D6\u6D88" /* Cancel */;
                btn.source = "btn_com";
                btn.visible = false;
                this.addChild(btn);
                btn = this.btnClose = Pool.alloc(Button);
                btn.x = 542;
                btn.y = 14;
                btn.label = "";
                btn.source = "btn_close_new";
                this.addChild(btn);
            };
            return AdultIdView;
        }(UIComponent));
        login.AdultIdView = AdultIdView;
        __reflect(AdultIdView.prototype, "game.login.AdultIdView");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var UIComponent = uilib.UIComponent;
        var TextFieldBase = uilib.TextFieldBase;
        var Button = uilib.Button;
        var Pool = base.Pool;
        var VerticalAlign = egret.VerticalAlign;
        var HorizontalAlign = egret.HorizontalAlign;
        var Rectangle = egret.Rectangle;
        var AlertView = /** @class */ (function (_super) {
            __extends(AlertView, _super);
            function AlertView() {
                return _super.call(this) || this;
            }
            AlertView.prototype._setup = function () {
                this.width = 720;
                this.height = 404;
                var img;
                img = Pool.alloc(game.BitmapBase);
                img.source = "assets/ui_png/sanjidikuangtop.png";
                img.width = 631;
                img.height = 30;
                img.x = 45;
                img.y = 18;
                this.addChild(img);
                img = Pool.alloc(game.BitmapBase);
                img.source = "assets/ui_png/sanjidikuang.png";
                img.width = 618;
                img.height = 360;
                img.x = 51;
                img.y = 44;
                this.addChild(img);
                img = Pool.alloc(game.BitmapBase);
                img.source = "biaotikuang";
                img.width = 279;
                img.height = 45;
                img.x = 221;
                img.y = 8;
                this.addChild(img);
                img = Pool.alloc(game.BitmapBase);
                img.source = "dibantoumingkuang";
                img.width = 557;
                img.height = 192;
                img.x = 82;
                img.y = 72;
                img.scale9Grid = Pool.alloc(Rectangle).setTo(16, 17, 9, 13);
                this.addChild(img);
                var lab;
                lab = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 332;
                lab.y = 20;
                lab.size = 28;
                lab.textColor = 0x2C526D;
                lab.text = "\u63D0\u793A" /* Tips */;
                this.addChild(lab);
                lab = this.labelContent = Pool.alloc(TextFieldBase);
                lab.x = 95;
                lab.y = 82;
                lab.size = 26;
                lab.width = 530;
                lab.height = 171;
                lab.textColor = 0x355973;
                lab.lineSpacing = 12;
                lab.textAlign = HorizontalAlign.CENTER;
                lab.verticalAlign = VerticalAlign.MIDDLE;
                this.addChild(lab);
                var btn = this.btnConfirm = Pool.alloc(Button);
                btn.x = 392;
                btn.y = 300;
                btn.width = 168;
                btn.height = 66;
                btn.label = "\u786E\u5B9A" /* Confirm */;
                btn.source = "yijianniuhuang";
                this.addChild(btn);
                btn = this.btnCancel = Pool.alloc(Button);
                btn.x = 160;
                btn.y = 300;
                btn.width = 168;
                btn.height = 66;
                btn.label = "\u53D6\u6D88" /* Cancel */;
                btn.textColor = 0x465977;
                btn.source = "yijianniulan";
                btn.visible = false;
                this.addChild(btn);
                btn = this.btnClose = Pool.alloc(Button);
                btn.x = 586;
                btn.y = 0;
                btn.width = 80;
                btn.height = 61;
                btn.label = "";
                btn.source = "guanbitubiao";
                this.addChild(btn);
                var check = this.check = Pool.alloc(eui.CheckBox);
                check.skinName = "skins.common.CheckSkin1";
                check.x = 255;
                check.y = 350;
                check.visible = false;
                this.addChild(check);
                lab = this.labelCheck = Pool.alloc(TextFieldBase);
                lab.x = 293;
                lab.y = 357;
                lab.size = 22;
                lab.textColor = 0x355973;
                lab.text = "本次登录不再提示";
                lab.visible = false;
                this.addChild(lab);
            };
            Object.defineProperty(AlertView.prototype, "showCheck", {
                set: function (value) {
                    this.btnConfirm.y = this.btnCancel.y = value ? 280 : 300;
                    this.check.visible = this.labelCheck.visible = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AlertView.prototype, "isChecked", {
                get: function () {
                    return this.check.visible && this.check.selected;
                },
                enumerable: true,
                configurable: true
            });
            return AlertView;
        }(UIComponent));
        login.AlertView = AlertView;
        __reflect(AlertView.prototype, "game.login.AlertView");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var UIComponent = uilib.UIComponent;
        var Button = uilib.Button;
        var TextFieldBase = uilib.TextFieldBase;
        var Pool = base.Pool;
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var HorizontalAlign = egret.HorizontalAlign;
        var VerticalAlign = egret.VerticalAlign;
        var TextFieldType = egret.TextFieldType;
        var CreateRoleView = /** @class */ (function (_super) {
            __extends(CreateRoleView, _super);
            function CreateRoleView() {
                return _super.call(this) || this;
            }
            CreateRoleView.prototype._setup = function () {
                this.width = 720;
                this.height = 1280;
                var img = Pool.alloc(game.BitmapBase);
                img.source = game.GetCreateRoleUrl("create_role_bg.jpg");
                this.addChild(img);
                var group = this.group_eft = new DisplayObjectContainer();
                group.touchEnabled = group.touchChildren = false;
                group.height = 842;
                group.width = 1397;
                group.y = 0;
                // let animate = Pool.alloc(UIAnimate);
                // animate.x = 360;
                // animate.y = 825;
                // animate.id = 1;
                // animate.times = -1;
                // animate.scaleX = animate.scaleY = 1.2;
                // animate.speed = 1;
                // animate.load( "assets/anim/body/create/create_male", 12);
                // group.addChild(animate);
                // animate.play();
                // animate = Pool.alloc(UIAnimate);
                // animate.x = 720 + 360 + 40;
                // animate.y = 825;
                // animate.id = 1;
                // animate.times = -1;
                // animate.scaleX = animate.scaleY = 1.2;
                // animate.speed = 1;
                // animate.load( "assets/anim/body/create/create_female", 12);
                // group.addChild(animate);
                // animate.play();
                // img = this.imgMale = Pool.alloc(BitmapBase);
                // img.y = 0;
                // img.source = GetCreateRoleUrl("nan.png");
                // group.addChild(img);
                // img = this.imgFemale = Pool.alloc(BitmapBase);
                // img.x = 720;
                // img.source = GetCreateRoleUrl("nv.png");
                // group.addChild(img);
                this.addChild(group);
                var btn = this.btnCreate = Pool.alloc(Button);
                btn.x = 360 - 183;
                btn.y = 1080;
                btn.width = 366;
                btn.height = 120;
                // btn.label = "开始游戏";
                btn.source = game.GetCreateRoleUrl("create_role_btn.png");
                this.addChild(btn);
                img = Pool.alloc(game.BitmapBase);
                img.x = 125;
                img.y = 1005;
                img.source = game.GetCreateRoleUrl("create_role_input.png");
                this.addChild(img);
                //标题
                img = this.imgTitle = Pool.alloc(game.BitmapBase);
                img.x = 30;
                img.y = 30;
                img.source = game.GetCreateRoleUrl("create_title_nan.png");
                this.addChild(img);
                var txt = this.txtName = Pool.alloc(TextFieldBase);
                txt.type = TextFieldType.INPUT;
                txt.x = 230;
                txt.y = 1005;
                txt.width = 260;
                txt.height = 60;
                txt.size = 28;
                txt.maxChars = 7;
                txt.textColor = 0xffffff;
                txt.textAlign = HorizontalAlign.CENTER;
                txt.verticalAlign = VerticalAlign.MIDDLE;
                txt.bold = true;
                // txt.prompt = "请输入角色名";
                // txt.promptColor = 0xa8b6ba;
                this.addChild(txt);
                btn = this.btnRandom = Pool.alloc(Button);
                btn.x = 518;
                btn.y = 1005;
                btn.source = game.GetCreateRoleUrl("chouqian.png");
                this.addChild(btn);
                txt = this.lab_timeDown = Pool.alloc(TextFieldBase);
                txt.touchEnabled = false;
                txt.x = 149;
                txt.y = 1200;
                txt.width = 422;
                txt.size = 22;
                txt.textColor = 0x00ff27;
                txt.stroke = 1;
                txt.textAlign = HorizontalAlign.CENTER;
                this.addChild(txt);
                btn = this.btnRen = Pool.alloc(Button);
                btn.x = 203;
                btn.y = 875;
                btn.source = game.GetCreateRoleUrl("btn_ren_hui.png");
                this.addChild(btn);
                btn = this.btnMo = Pool.alloc(Button);
                btn.x = 419;
                btn.y = 875;
                btn.source = game.GetCreateRoleUrl("btn_mo_hui.png");
                this.addChild(btn);
                // btn = this.btnYoung = Pool.alloc(Button);
                // btn.x = 152;
                // btn.y = 931;
                // btn.source = GetCreateRoleUrl("btn_young_hui.png");
                // this.addChild(btn);
                // btn = this.btnYouth = Pool.alloc(Button);
                // btn.x = 288;
                // btn.y = 931;
                // btn.source = GetCreateRoleUrl("btn_youth_hui.png");
                // this.addChild(btn);
                // group = this.male = new DisplayObjectContainer();
                // group.touchEnabled = true;
                // group.x = 486;
                // group.y = 730;
                // img = this.male_bg = Pool.alloc(BitmapBase);
                // img.source = GetCreateRoleUrl("loginxuanweizhong");
                // group.addChild(img);
                // img = this.male_img = Pool.alloc(BitmapBase);
                // img.x = 26;
                // img.y = 22;
                // img.source = "sex_1_1";
                // group.addChild(img);
                // this.addChild(group);
                //
                // group = this.female = new DisplayObjectContainer();
                // group.touchEnabled = true;
                // group.x = 534;
                // group.y = 683;
                // img = this.female_bg = Pool.alloc(BitmapBase);
                // img.source = GetCreateRoleUrl("loginxuanweizhong");
                // group.addChild(img);
                // img = this.female_img = Pool.alloc(BitmapBase);
                // img.x = 20;
                // img.y = 24;
                // img.source = GetCreateRoleUrl("sex_2_1");
                // group.addChild(img);
                // this.addChild(group);
            };
            return CreateRoleView;
        }(UIComponent));
        login.CreateRoleView = CreateRoleView;
        __reflect(CreateRoleView.prototype, "game.login.CreateRoleView");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var UIComponent = uilib.UIComponent;
        var Pool = base.Pool;
        var LoadingView = /** @class */ (function (_super) {
            __extends(LoadingView, _super);
            function LoadingView() {
                return _super.call(this) || this;
            }
            LoadingView.prototype._setup = function () {
                this.width = 720;
                this.height = 1280;
                var img = Pool.alloc(game.BitmapBase);
                if (gzyyou.sdk.checkCanPay && !gzyyou.sdk.checkCanPay()) {
                }
                else {
                    var res = "assets/loading/3.png";
                    if (typeof gso.bgImg === "object" && gso.bgImg["3"]) {
                        res = gso.bgImg["3"];
                    }
                    // if(gso.isWeixin){
                    //     res = "https://cdnsrcex-ljtx.1y-game.com/assets/loading/wx3.png";
                    // }else if(gso.isFuyaoWeixin || gso.isWanjianShouq) {
                    //     res = "https://cdnsrcex-ljtx.1y-game.com/assets/loading/3.png";
                    // }else if(gso.isShouq) {
                    //     res = "https://cdnsrcex-ljtx.1y-game.com/assets/loading/shouq3.png";
                    // }
                    // img.source =  res;
                    // img.x = 0;
                    // img.y = 550;
                    // this.addChild(img);
                    var self_1 = this;
                    var imgLoader = new egret.ImageLoader();
                    imgLoader.crossOrigin = "anonymous"; // 跨域请求
                    imgLoader.load(res);
                    imgLoader.once(egret.Event.COMPLETE, function (evt) {
                        if (evt.currentTarget.data) {
                            var texture = new egret.Texture();
                            texture.bitmapData = evt.currentTarget.data;
                            var bitmap = new egret.Bitmap(texture);
                            bitmap.y = 750;
                            self_1.addChild(bitmap);
                        }
                    }, this);
                }
                img = Pool.alloc(game.BitmapBase);
                img.source = "assets/game_bg/prog_bg.png";
                img.x = 34;
                img.y = 1070;
                this.addChild(img);
                img = this.imgBar = Pool.alloc(game.BitmapBase);
                img.source = "assets/game_bg/prog_top.png";
                img.width = 488;
                img.height = 7;
                img.x = 116;
                img.y = 1123;
                this.addChild(img);
                img = this.imgSingleBar = Pool.alloc(game.BitmapBase);
                img.source = "assets/game_bg/prog_bottom.png";
                img.x = 73;
                img.y = 1152;
                img.width = 574;
                img.height = 13;
                this.addChild(img);
                img = this.imgPt = Pool.alloc(game.BitmapBase);
                img.source = "assets/game_bg/loading_point.png";
                img.x = this.imgBar.x - 30;
                img.y = this.imgBar.y - 16;
                img.width = 59;
                img.height = 54;
                this.addChild(img);
                img = Pool.alloc(game.BitmapBase);
                img.source = "assets/game_bg/prog_bg_top.png";
                img.x = 39;
                img.y = 1072;
                this.addChild(img);
            };
            return LoadingView;
        }(UIComponent));
        login.LoadingView = LoadingView;
        __reflect(LoadingView.prototype, "game.login.LoadingView");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var UIComponent = uilib.UIComponent;
        var TextFieldBase = uilib.TextFieldBase;
        var Pool = base.Pool;
        var ScrollEnabledComponent = uilib.ScrollEnabledComponent;
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var HorizontalAlign = egret.HorizontalAlign;
        var Button = uilib.Button;
        var NoticePanel = /** @class */ (function (_super) {
            __extends(NoticePanel, _super);
            function NoticePanel() {
                return _super.call(this) || this;
            }
            NoticePanel.prototype._setup = function () {
                var self = this;
                self.width = 590;
                self.height = 923;
                var img;
                img = Pool.alloc(game.BitmapBase);
                img.source = game.GetLoginUrl("bg_select2");
                img.x = -10;
                img.y = 0;
                self.addChild(img);
                var scroll = Pool.alloc(ScrollEnabledComponent);
                scroll.setScrollRect(0, 0, self.width, self.height - 160);
                scroll.x = 20;
                scroll.y = 90;
                var container = self.labelContainer = new DisplayObjectContainer();
                // let container: Group = = self.labelContainer = Pool.alloc(Group);
                scroll.addChild(container);
                self.addChild(scroll);
                var lab = self.lab_tips = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 10;
                lab.y = self.height;
                lab.width = self.width;
                lab.size = 28;
                lab.strokeColor = 0x0;
                lab.stroke = 1.5;
                lab.textColor = 0xffffff;
                lab.textAlign = HorizontalAlign.CENTER;
                lab.text = "\u70B9\u51FB\u5176\u4ED6\u533A\u57DF\u5173\u95ED" /* CloseTips */;
                self.addChild(lab);
                var btn = self.btnClose = Pool.alloc(Button);
                btn.source = game.GetLoginUrl("guanbi2");
                btn.x = 561;
                btn.y = 27;
                self.addChild(btn);
                var img_title = Pool.alloc(game.BitmapBase);
                img_title.source = game.GetLoginUrl("youxigonggao2");
                img_title.x = 257;
                img_title.y = 42;
                self.addChild(img_title);
            };
            return NoticePanel;
        }(UIComponent));
        login.NoticePanel = NoticePanel;
        __reflect(NoticePanel.prototype, "game.login.NoticePanel");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
var game;
(function (game) {
    var login;
    (function (login) {
        var UIComponent = uilib.UIComponent;
        var TextFieldBase = uilib.TextFieldBase;
        var Pool = base.Pool;
        var ScrollEnabledComponent = uilib.ScrollEnabledComponent;
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var Button = uilib.Button;
        var PrivacyAlertView = /** @class */ (function (_super) {
            __extends(PrivacyAlertView, _super);
            function PrivacyAlertView() {
                return _super.call(this) || this;
            }
            PrivacyAlertView.prototype._setup = function () {
                var self = this;
                self.width = 590;
                self.height = 923;
                var img;
                img = Pool.alloc(game.BitmapBase);
                img.source = game.GetLoginUrl("bg_select2");
                img.x = -10;
                img.y = 0;
                self.addChild(img);
                var scroll = Pool.alloc(ScrollEnabledComponent);
                scroll.setScrollRect(0, 0, self.width, self.height - 200);
                scroll.x = 20;
                scroll.y = 90;
                var container = self.labelContainer = new DisplayObjectContainer();
                scroll.addChild(container);
                self.addChild(scroll);
                var lab = Pool.alloc(TextFieldBase);
                lab.text = "用户协议和隐私";
                lab.x = 239;
                lab.y = 48;
                lab.size = 20;
                lab.stroke = 1;
                lab.strokeColor = 0x426e7b;
                lab.textColor = 0xffffff;
                self.addChild(lab);
                lab = Pool.alloc(TextFieldBase);
                lab.text = "用户协议和隐私政策";
                lab.x = 13;
                lab.y = 15;
                lab.size = 24;
                lab.stroke = 1;
                lab.strokeColor = 0x426e7b;
                lab.textColor = 0xffffff;
                lab.bold = true;
                container.addChild(lab);
                lab = this.labAgree = Pool.alloc(TextFieldBase);
                lab.touchEnabled = true;
                lab.x = 13;
                lab.y = 49;
                lab.lineSpacing = 6;
                lab.width = 550;
                lab.size = 20;
                lab.stroke = 1;
                lab.strokeColor = 0x426e7b;
                lab.textColor = 0xffffff;
                lab.bold = true;
                var title = "请认真阅读" + game.TextUtil.addLinkHtmlTxt("用户协议", 2330156 /* GREEN */, "yhxy") + "和"
                    + game.TextUtil.addLinkHtmlTxt("隐私政策", 2330156 /* GREEN */, "yszc")
                    + "点击“同意”即表示您已阅读并同意全部条款。\n若您不同意本条款相关内容，很遗憾我们将无法为您继续提供服务";
                lab.textFlow =
                    game.TextUtil.parseHtml(title);
                container.addChild(lab);
                var btn = self.btnClose = Pool.alloc(Button);
                btn.source = game.GetLoginUrl("guanbi2");
                btn.x = 561;
                btn.y = 27;
                self.addChild(btn);
                btn = self.btnConfirm = Pool.alloc(Button);
                btn.label = '确认';
                btn.$setWidth(187);
                btn.$setHeight(68);
                btn.source = game.GetLoginUrl("xuanzhekuang");
                btn.x = 70;
                btn.y = 820;
                self.addChild(btn);
                btn = self.btnCancel = Pool.alloc(Button);
                btn.label = '取消';
                btn.$setWidth(187);
                btn.$setHeight(68);
                btn.source = game.GetLoginUrl("xuanzhekuang");
                btn.x = 350;
                btn.y = 820;
                self.addChild(btn);
            };
            return PrivacyAlertView;
        }(UIComponent));
        login.PrivacyAlertView = PrivacyAlertView;
        __reflect(PrivacyAlertView.prototype, "game.login.PrivacyAlertView");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
var game;
(function (game) {
    var login;
    (function (login) {
        var UIComponent = uilib.UIComponent;
        var Pool = base.Pool;
        var ScrollEnabledComponent = uilib.ScrollEnabledComponent;
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var Button = uilib.Button;
        var PrivacyView = /** @class */ (function (_super) {
            __extends(PrivacyView, _super);
            function PrivacyView() {
                return _super.call(this) || this;
            }
            PrivacyView.prototype._setup = function () {
                var self = this;
                self.width = 590;
                self.height = 923;
                var img;
                img = Pool.alloc(game.BitmapBase);
                img.source = game.GetLoginUrl("bg_select2");
                img.x = -10;
                img.y = 0;
                self.addChild(img);
                var scroll = Pool.alloc(ScrollEnabledComponent);
                scroll.setScrollRect(0, 0, self.width, self.height - 200);
                scroll.x = 20;
                scroll.y = 90;
                var container = self.labelContainer = new DisplayObjectContainer();
                scroll.addChild(container);
                self.addChild(scroll);
                var img_title = Pool.alloc(game.BitmapBase);
                img_title.source = game.GetLoginUrl("youxigonggao2");
                img_title.x = 257;
                img_title.y = 42;
                self.addChild(img_title);
                var btn = self.btnClose = Pool.alloc(Button);
                btn.source = game.GetLoginUrl("guanbi2");
                btn.x = 561;
                btn.y = 27;
                self.addChild(btn);
                btn = self.btnConfirm = Pool.alloc(Button);
                btn.label = '同意';
                btn.$setWidth(187);
                btn.$setHeight(68);
                btn.source = game.GetLoginUrl("xuanzhekuang");
                btn.x = 70;
                btn.y = 820;
                self.addChild(btn);
                btn = self.btnCancel = Pool.alloc(Button);
                btn.label = '拒绝';
                btn.$setWidth(187);
                btn.$setHeight(68);
                btn.source = game.GetLoginUrl("xuanzhekuang");
                btn.x = 350;
                btn.y = 820;
                self.addChild(btn);
            };
            return PrivacyView;
        }(UIComponent));
        login.PrivacyView = PrivacyView;
        __reflect(PrivacyView.prototype, "game.login.PrivacyView");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var UIComponent = uilib.UIComponent;
        var List = uilib.List;
        var Pool = base.Pool;
        var Button = uilib.Button;
        var TextFieldBase = uilib.TextFieldBase;
        var SelectServerView = /** @class */ (function (_super) {
            __extends(SelectServerView, _super);
            function SelectServerView() {
                return _super.call(this) || this;
            }
            SelectServerView.prototype._setup = function () {
                this.width = 590;
                this.height = 923;
                var img;
                img = Pool.alloc(game.BitmapBase);
                img.source = game.GetLoginUrl("bg_select2");
                img.x = -10;
                img.y = 0;
                this.addChild(img);
                img = Pool.alloc(game.BitmapBase);
                img.source = game.GetLoginUrl("di");
                img.x = 25;
                img.y = 83;
                this.addChild(img);
                img = Pool.alloc(game.BitmapBase);
                img.source = game.GetLoginUrl("xuanzequfu2");
                img.x = 244;
                img.y = 42;
                this.addChild(img);
                var list = this.listServer = Pool.alloc(List);
                list.x = 243;
                list.y = 95;
                list.width = 428;
                // list.height = 705;
                list.gap = 4;
                list.layoutPolicy = "vertical" /* VERTICAL */;
                list.setScrollRect(0, 0, 428, 795);
                list.scrollPolicy = 2 /* POS_RIGHT */ | 64 /* POLICY_OFF */;
                this.addChild(list);
                list = this.listServerType = Pool.alloc(List);
                list.x = 35;
                list.y = 94;
                list.width = 192;
                // list.height = 705;
                list.gap = 2;
                list.layoutPolicy = "vertical" /* VERTICAL */;
                list.setScrollRect(0, 0, 192, 795);
                list.scrollPolicy = 2 /* POS_RIGHT */ | 64 /* POLICY_OFF */;
                this.addChild(list);
                img = Pool.alloc(game.BitmapBase);
                img.source = game.GetLoginUrl("serverfenggexian");
                img.x = 225;
                img.y = 95;
                img.height = 797;
                this.addChild(img);
                var btn = this.btnClose = Pool.alloc(Button);
                btn.source = game.GetLoginUrl("guanbi2");
                btn.x = 561;
                btn.y = 27;
                this.addChild(btn);
                var lab = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.text = "\u70B9\u51FB\u5176\u4ED6\u533A\u57DF\u5173\u95ED" /* CloseTips */;
                lab.x = 210;
                lab.y = 970;
                lab.size = 24;
                lab.strokeColor = 0x0;
                lab.stroke = 1;
                lab.textColor = 0xb6b6b6;
                this.addChild(lab);
            };
            return SelectServerView;
        }(UIComponent));
        login.SelectServerView = SelectServerView;
        __reflect(SelectServerView.prototype, "game.login.SelectServerView");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var Mod = base.Mod;
        var LoginMod = /** @class */ (function (_super) {
            __extends(LoginMod, _super);
            function LoginMod() {
                var _this = _super.call(this, "02" /* Login */) || this;
                game.LogUtil.printLogin("LoginMod constructor");
                return _this;
            }
            LoginMod.prototype.onRegister = function () {
                _super.prototype.onRegister.call(this);
                login.initMsg();
            };
            LoginMod.prototype.initCmd = function () {
                game.LogUtil.printLogin("LoginMod initCmd");
                this.regCmd("web_login_error" /* WEB_LOGIN_ERROR */, login.WebLoginErrorCmd);
                this.regCmd("on_activate" /* ON_ACTIVATE */, login.ProtoOnActivate);
                this.regCmd("on_deactivate" /* ON_DEACTIVATE */, login.ProtoOnDeactivate);
                this.regCmd("show_start" /* SHOW_START */, login.ShowStartViewCmd);
                this.regCmd("on_reload" /* ON_RELOAD */, login.OnReloadCmd);
                this.regCmd(base.ON_CONNECT_CREATE, login.ConnectCreateCmd);
                this.regCmd(base.ON_CONNECT_LOST, login.ConnectLostCmd);
                this.regCmd(base.ON_CONNECT_ERROR, login.ConnectErrCmd);
                this.regCmd("on_got_server_info" /* ON_GOT_SERVER_INFO */, login.OnGotServerInfoCmd);
                this.regCmd("load_game_res" /* LOAD_GAME_RES */, login.LoadGameResCmd);
                this.regCmd("enter_main" /* ENTER_MAIN */, login.EnterMainCmd);
                this.regCmd("start_connect" /* START_CONNECT */, login.StartConnectCmd);
                this.regCmd("on_account_login" /* ON_ACCOUNT_LOGIN */, login.OnAccLoginCmd);
                this.regCmd("on_role_create" /* ON_ROLE_CREATE */, login.OnRoleCreateCmd);
                this.regCmd("try_reconnect" /* TRY_RECONNECT */, login.TryReConnectCmd);
                this.regCmd("reconnect_cmd" /* BACK_TO_START_VIEW */, login.BackToStartView);
            };
            LoginMod.prototype.initModel = function () {
                game.LogUtil.printLogin("LoginMod initModel");
                this.regProxy(1 /* Login */, login.LoginProxy);
            };
            LoginMod.prototype.initView = function () {
                this.regMdr("01" /* Start */, login.StartMdr);
                this.regMdr("02" /* SelectServer */, login.SelectServerMdr);
                this.regMdr("04" /* NoticePanel */, login.NoticePanelMdr);
                this.regMdr("05" /* Loading */, login.LoadingMdr);
                this.regMdr("06" /* Alert */, login.AlertMdr);
                this.regMdr("03" /* CreateRole */, login.CreateRoleMdr);
                this.regMdr("07" /* Login */, login.LoginMdr);
                this.regMdr("08" /* AdultAlert */, login.AdultAlertMdr);
                this.regMdr("09" /* AdultId */, login.AdultIdMdr);
                this.regMdr("10" /* Privacy */, login.PrivacyMdr);
                this.regMdr("11" /* PrivacyAlert */, login.PrivacyAlertMdr);
            };
            return LoginMod;
        }(Mod));
        __reflect(LoginMod.prototype, "LoginMod");
        gso.loginCls = LoginMod;
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var TouchEvent = egret.TouchEvent;
        var ItemRender = uilib.ItemRender;
        var Pool = base.Pool;
        var TextFieldBase = uilib.TextFieldBase;
        var ServerTypeRender = /** @class */ (function (_super) {
            __extends(ServerTypeRender, _super);
            function ServerTypeRender() {
                return _super.call(this) || this;
            }
            ServerTypeRender.prototype._setup = function () {
                this.width = 187;
                this.height = 68;
                var img = this.imgBg = Pool.alloc(game.BitmapBase);
                img.source = game.GetLoginUrl("weizhekuang2");
                img.width = 187;
                img.height = 68;
                this.addChild(img);
                var lab = this.labName = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.width = 187;
                lab.height = 70;
                lab.size = 24;
                lab.bold = true;
                lab.verticalAlign = "middle";
                lab.textAlign = "center";
                lab.textColor = 0x426e7b;
                this.addChild(lab);
            };
            ServerTypeRender.prototype._render = function () {
                this.labName.text = this.data.name;
                this.addEventListener(TouchEvent.TOUCH_TAP, this.onTap, this);
            };
            ServerTypeRender.prototype.onSelected = function () {
                this.imgBg.source = game.GetLoginUrl(this._selected ? "xuanzhekuang" : "weizhekuang2");
                this.labName.textColor = this._selected ? 0x8a5000 : 0x426e7b;
            };
            /** @internal */ ServerTypeRender.prototype.onTap = function (e) {
                this.parent.dispatchEventWith("tap_server_type" /* TAP_SERVER_TYPE */, false, this.data);
            };
            return ServerTypeRender;
        }(ItemRender));
        login.ServerTypeRender = ServerTypeRender;
        __reflect(ServerTypeRender.prototype, "game.login.ServerTypeRender");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var UIComponent = uilib.UIComponent;
        var Button = uilib.Button;
        var TextFieldBase = uilib.TextFieldBase;
        var Pool = base.Pool;
        var Handler = base.Handler;
        var StartView = /** @class */ (function (_super) {
            __extends(StartView, _super);
            function StartView() {
                return _super.call(this) || this;
            }
            StartView.prototype._setup = function () {
                this.width = 720;
                this.height = 1280;
                var btn = this.btnStart = Pool.alloc(Button);
                btn.x = 219;
                btn.y = 979;
                //btn.source = GetLoginUrl("enter");
                this.loadBtn(btn, game.GetLoginUrl("enter"));
                this.addChild(btn);
                // btn = this.btnClear = Pool.alloc(Button);
                // btn.x = 626;
                // btn.y = 20;
                // btn.source = GetLoginUrl("btn_clear");
                // this.addChild(btn);
                btn = this.btnNotice = Pool.alloc(Button);
                btn.x = 626;
                btn.y = 20;
                //btn.source = GetLoginUrl("btn_notice");
                this.loadBtn(btn, game.GetLoginUrl("btn_notice"));
                this.addChild(btn);
                var img = Pool.alloc(game.BitmapBase);
                //img.source = GetLoginUrl("bg_11");
                this.loadImg(img, game.GetLoginUrl("bg_11"));
                img.x = 0;
                img.y = 854;
                this.addChild(img);
                // img = this.imgLogo = Pool.alloc(BitmapBase);
                // img.source = "assets/game_bg/title_logo.png";
                // img.x = 25;
                // img.y = 20;
                // this.addChild(img);
                img = this.imgTag = Pool.alloc(game.BitmapBase);
                img.x = 160;
                img.y = 915;
                img.width = img.height = 25;
                this.addChild(img);
                img = this.imgLastTag = Pool.alloc(game.BitmapBase);
                img.touchEnabled = true;
                img.x = 342;
                img.y = 865;
                img.width = img.height = 25;
                this.addChild(img);
                var lab = this.labServer = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 200;
                lab.y = 916;
                lab.width = 160;
                lab.height = 29;
                lab.size = 29;
                lab.stroke = 1;
                lab.verticalAlign = "middle";
                lab.textAlign = "left";
                lab.textColor = 0xffffff;
                this.addChild(lab);
                //实名认证
                img = this.imgState = Pool.alloc(game.BitmapBase); //实名
                img.x = 176;
                img.y = 78;
                this.addChild(img);
                lab = this.labState = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 320;
                lab.y = 80;
                lab.width = 320;
                lab.anchorOffsetX = 160;
                lab.height = 34;
                lab.size = 28;
                lab.bold = true;
                lab.stroke = 1;
                lab.verticalAlign = "middle";
                lab.textAlign = "center";
                lab.textColor = 0xffffff;
                this.addChild(lab);
                //实名按钮
                // btn = this.btnIdentity = Pool.alloc(Button);
                // btn.x = 626;
                // btn.y = 120;
                // btn.source = GetLoginUrl("btn_identity");
                // this.addChild(btn);
                // lab = this.labIdentity = Pool.alloc(TextFieldBase);
                // lab.touchEnabled = true;
                // lab.x = 320;
                // lab.y = 830;
                // lab.width = 320;
                // lab.anchorOffsetX = 160;
                // lab.height = 30;
                // lab.size = 28;
                // lab.bold = true;
                // lab.stroke = 1;
                // lab.verticalAlign = "middle";
                // lab.textAlign = "center";
                // lab.textColor = 0xffffff;
                // lab.text = "实名认证>>";
                // this.addChild(lab);
                //--------------------------------------------------------------
                lab = this.labLastServer = Pool.alloc(TextFieldBase);
                lab.touchEnabled = true;
                lab.x = 372;
                lab.y = 868;
                lab.width = 160;
                lab.height = 26;
                lab.size = 24;
                lab.stroke = 1;
                lab.strokeColor = 0x00535c;
                lab.verticalAlign = "middle";
                lab.textAlign = "left";
                lab.textColor = 0x00ff00;
                this.addChild(lab);
                lab = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 262;
                lab.y = 867;
                lab.width = 73;
                lab.height = 26;
                lab.size = 24;
                // lab.stroke = 1;
                // lab.strokeColor = 0x00535c;
                lab.verticalAlign = "middle";
                lab.textAlign = "left";
                lab.textColor = 0x007ac7;
                lab.text = "\u6700\u65B0\u670D" /* LastServerTips */;
                this.addChild(lab);
                btn = this.btnSelectServer = Pool.alloc(Button);
                btn.x = 350;
                btn.y = 893;
                //btn.source = GetLoginUrl("dianjigenghuanfuwuqi");
                this.loadBtn(btn, game.GetLoginUrl("dianjigenghuanfuwuqi"));
                this.addChild(btn);
                btn = this.btnSelectServer2 = Pool.alloc(Button);
                btn.x = 525;
                btn.y = 905;
                //btn.source = GetLoginUrl("btn_select");
                this.loadBtn(btn, game.GetLoginUrl("btn_select"));
                this.addChild(btn);
                lab = Pool.alloc(TextFieldBase);
                lab.touchEnabled = false;
                lab.x = 0;
                lab.y = 1130;
                lab.size = 18;
                lab.stroke = 1;
                lab.strokeColor = 0x000000;
                lab.textAlign = "center";
                lab.textColor = 0xffffff;
                lab.lineSpacing = 6;
                lab.width = this.width;
                var text = "";
                text += "\u9002\u9F84\u63D0\u793A\uFF1A\u672C\u6E38\u620F\u9002\u540818\u5468\u5C81\u4EE5\u4E0A\u53C2\u4E0E\n\u62B5\u5236\u4E0D\u826F\u6E38\u620F\uFF0C\u62D2\u7EDD\u76D7\u7248\u6E38\u620F\u3002\u6CE8\u610F\u81EA\u6211\u4FDD\u62A4\uFF0C\u8C28\u9632\u53D7\u9A97\u4E0A\u5F53\u3002\n\u9002\u5EA6\u6E38\u620F\u76CA\u8111\uFF0C\u6C89\u8FF7\u6E38\u620F\u4F24\u8EAB\u3002\u5408\u7406\u5B89\u6392\u65F6\u95F4\uFF0C\u4EAB\u53D7\u5065\u5EB7\u751F\u6D3B\u3002\n\u5BA1\u6279\u6587\u53F7\uFF1A\u56FD\u65B0\u51FA\u5BA1[2019]234\u53F7\n\u8457\u4F5C\u6743\u767B\u8BB0\u53F7\uFF1A2017SR693299\n\u51FA\u7248\u7269\u53F7\uFF1AISBN 978-7-498-05811-9" /* Counsel */;
                lab.text = text;
                this.addChild(lab);
                // lab = Pool.alloc(TextFieldBase);
                // lab.touchEnabled = false;
                // lab.x = 0;
                // lab.y = 1205;
                // lab.size = 18;
                // lab.stroke = 1;
                // lab.textAlign = "center";
                // lab.textColor = 0xffffff;
                // lab.lineSpacing = 6;
                // lab.width = this.width;
                // let textStr = LoginLan.Copyright;
                // lab.text = textStr;
                // this.addChild(lab);
                img = this.imgDbg = Pool.alloc(game.BitmapBase); // 外网调试用
                img.touchEnabled = true;
                img.x = 0;
                img.y = 1180;
                img.width = 120;
                img.height = 100;
                img.alpha = 0;
                this.addChild(img);
                img = this.imgAgreeDi = Pool.alloc(game.BitmapBase);
                img.touchEnabled = true;
                img.x = 165;
                img.y = 1075;
                //img.source = GetLoginUrl("btn_agree_di");
                this.loadImg(img, game.GetLoginUrl("btn_agree_di"));
                this.addChild(img);
                img = this.imgAgreeGou = Pool.alloc(game.BitmapBase);
                img.touchEnabled = true;
                img.x = 165;
                img.y = 1075;
                //img.source = GetLoginUrl("btn_agree_gou");
                this.loadImg(img, game.GetLoginUrl("btn_agree_gou"));
                this.addChild(img);
                lab = this.labAgree = Pool.alloc(TextFieldBase);
                lab.touchEnabled = true;
                lab.x = 220;
                lab.y = 1091;
                lab.height = 24;
                // lab.width = 265;
                lab.size = 20;
                lab.stroke = 1;
                lab.strokeColor = 0x06717d;
                lab.verticalAlign = "middle";
                lab.textAlign = "left";
                lab.textColor = 0xffffff;
                var title = "";
                // if(GameUtil.isShowYhxy) {
                //     title = TextUtil.addLinkHtmlTxt("用户协议", WhiteColor.GREEN, "yhxy") + "和";
                // }
                // if(GameUtil.isShowYszc) {
                //     title += TextUtil.addLinkHtmlTxt("隐私政策", WhiteColor.GREEN, "yszc");
                // }
                lab.textFlow =
                    game.TextUtil.parseHtml("\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F" /* AgreeTips */ + title);
                this.addChild(lab);
                btn = this.btnAgeTip = Pool.alloc(Button);
                btn.x = 650;
                btn.y = 1080;
                btn.width = 810;
                btn.height = 1038;
                btn.scaleX = btn.scaleY = 0.06;
                btn.source = "assets/game_bg/age_tip.png";
                this.addChild(btn);
            };
            StartView.prototype.loadImg = function (img, url) {
                game.LoadMgr.ins.load(url, Handler.alloc(this, function (data, url) {
                    img.source = data;
                }), game.LoadPri.UI);
            };
            StartView.prototype.loadBtn = function (btn, url) {
                game.LoadMgr.ins.load(url, Handler.alloc(this, function (data, url) {
                    btn.getDisplay().source = data;
                }), game.LoadPri.UI);
            };
            return StartView;
        }(UIComponent));
        login.StartView = StartView;
        __reflect(StartView.prototype, "game.login.StartView");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
var game;
(function (game) {
    function GetLoginUrl(url) {
        return "assets/login/" + url + ".png";
    }
    game.GetLoginUrl = GetLoginUrl;
    function GetCreateRoleUrl(url) {
        return "assets/create_role/" + url;
    }
    game.GetCreateRoleUrl = GetCreateRoleUrl;
    /** @internal */ game.ReConnectMax = 8;
    //0未开服 1维护hui  2火爆hong（开服大于1天而且不是最新服） 3推荐黄色（今日开的服） 4最新服绿色
    /** @internal */ game.ServerStatusImg = {
        "0": "huang",
        "1": "hong",
        "2": "lv",
        "3": "lv",
        "4": "huang",
        "5": "hong"
    };
    /** @internal */ game.ServerStatusColor = {
        "0": 0x595959,
        "1": 0xff0000,
        "2": 0x00fd1f,
        "3": 0x00fd1f,
        "4": 0x595959,
        "5": 0xff0000
    };
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var Notifier = base.Notifier;
        var getProtoName = base.getProtoName;
        var getTimer = egret.getTimer;
        var Cmd = base.Cmd;
        var TimeMgr = base.TimeMgr;
        var facade = base.facade;
        var bus;
        function initMsg() {
            if (!bus) {
                bus = new ProtoBus();
                base.onMsg = function (proto) { return bus.onMsg(proto); };
                base.traceProto = function () {
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i] = arguments[_i];
                    }
                    return bus.traceProto(params);
                };
            }
        }
        login.initMsg = initMsg;
        var ProtoOnActivate = /** @class */ (function (_super) {
            __extends(ProtoOnActivate, _super);
            function ProtoOnActivate() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ProtoOnActivate.prototype.exec = function (n) {
                var proxy = this.retProxy(1 /* Login */);
                proxy.data.isActive = true;
                this.sendNt("try_reconnect" /* TRY_RECONNECT */);
            };
            return ProtoOnActivate;
        }(Cmd));
        login.ProtoOnActivate = ProtoOnActivate;
        __reflect(ProtoOnActivate.prototype, "game.login.ProtoOnActivate");
        var ProtoOnDeactivate = /** @class */ (function (_super) {
            __extends(ProtoOnDeactivate, _super);
            function ProtoOnDeactivate() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ProtoOnDeactivate.prototype.exec = function (n) {
                var proxy = this.retProxy(1 /* Login */);
                proxy.data.isActive = false;
                bus.onDeactivate();
            };
            return ProtoOnDeactivate;
        }(Cmd));
        login.ProtoOnDeactivate = ProtoOnDeactivate;
        __reflect(ProtoOnDeactivate.prototype, "game.login.ProtoOnDeactivate");
        var ProtoBus = /** @class */ (function (_super) {
            __extends(ProtoBus, _super);
            function ProtoBus() {
                var _this = _super.call(this) || this;
                _this._msgs = [];
                TimeMgr.addUpdateItem(_this, 15);
                return _this;
            }
            ProtoBus.prototype.onDeactivate = function () {
                while (this._msgs.length > 0) { // 防止放到后台帧率过低，协议不及时处理
                    var proto = this._msgs.shift();
                    this.sendNt(getProtoName(proto), proto);
                }
            };
            ProtoBus.prototype.onMsg = function (proto) {
                if (!proto) {
                    return;
                }
                var proxy = facade.retMod("02" /* Login */).retProxy(1 /* Login */);
                if (!proxy.data.isActive) {
                    this.sendNt(getProtoName(proto), proto);
                    return;
                }
                this._msgs[this._msgs.length] = proto;
            };
            ProtoBus.prototype.traceProto = function (params) {
                console.proto.apply(console, params);
            };
            ProtoBus.prototype.update = function (time) {
                var self = this;
                var msgs = self._msgs;
                var t0 = getTimer();
                while (msgs.length > 0) {
                    var proto = msgs.shift();
                    this.sendNt(getProtoName(proto), proto);
                    var t1 = getTimer();
                    if (t1 - t0 > 16) {
                        break;
                    }
                }
            };
            return ProtoBus;
        }(Notifier));
        __reflect(ProtoBus.prototype, "ProtoBus", ["base.UpdateItem"]);
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
var game;
(function (game) {
    var login;
    (function (login) {
        var Cmd = base.Cmd;
        var facade = base.facade;
        var BackToStartView = /** @class */ (function (_super) {
            __extends(BackToStartView, _super);
            function BackToStartView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BackToStartView.prototype.exec = function (n) {
                game.BgMgr.getIns().setBg("1");
                game.Layer.hideMdr(game.Layer.main);
                game.Layer.hideMdr(game.Layer.window);
                game.Layer.hideMdr(game.Layer.upperWin);
                game.Layer.hideMdr(game.Layer.modal);
                game.Layer.hideMdr(game.Layer.tip);
                this.sendNt("game_connect_lost" /* GAME_CONNECT_LOST */);
                var proxy = this.retProxy(1 /* Login */);
                //gzyyou.sdk.logout();
                facade.onConnectLost();
                proxy.data.reConnectCnt = 0;
                proxy.data.disConnectReason = -1;
                gso.server_info = null;
                game.LogUtil.printLogin("断开跟服务器的socket");
                proxy.service.close();
                //ggo.reconnect(0);
            };
            return BackToStartView;
        }(Cmd));
        login.BackToStartView = BackToStartView;
        __reflect(BackToStartView.prototype, "game.login.BackToStartView");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var Cmd = base.Cmd;
        var ConnectCreateCmd = /** @class */ (function (_super) {
            __extends(ConnectCreateCmd, _super);
            function ConnectCreateCmd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ConnectCreateCmd.prototype.exec = function (n) {
                console.info("connection create");
                var proxy = this.retProxy(1 /* Login */);
                proxy.data.disConnectReason = 0;
                proxy.data.disConnectMsg = "";
                proxy.data.reConnectCnt = 0;
                gso.isBack = false;
                if (gso.isWeixin) {
                    gzyyou.sdk.loadReport("load_account" /* LOGIN_ACCOUNT */);
                }
                else {
                    ggo.loadVerbose("\u6B63\u5728\u767B\u5F55\u6E38\u620F\u670D\u52A1\u5668" /* LOGIN_ACCOUNT */);
                }
                console.log("==================LOGIN_ACCOUNT");
                gso.logList["load_connect" /* START_CONNECT */ + "1"] = "socket 成功 返回 base.ON_CONNECT_CREATE";
                proxy.loginAccount(gso.loginParams);
            };
            return ConnectCreateCmd;
        }(Cmd));
        login.ConnectCreateCmd = ConnectCreateCmd;
        __reflect(ConnectCreateCmd.prototype, "game.login.ConnectCreateCmd");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var uilib;
(function (uilib) {
    var Pool = base.Pool;
    var BitmapBase = game.BitmapBase;
    var Rectangle = egret.Rectangle;
    /**
     * 滚动条组件
     * @author lkp
     */
    var ScrollBar = /** @class */ (function (_super) {
        __extends(ScrollBar, _super);
        function ScrollBar() {
            return _super.call(this) || this;
        }
        ScrollBar.prototype._setup = function () {
            var self = this;
            var img = self._border = Pool.alloc(BitmapBase);
            img.source = null;
            img.scale9Grid = Pool.alloc(Rectangle).setTo(8, 8, 1, 1);
            self.addChild(img);
            img = self._thumb = Pool.alloc(BitmapBase);
            img.source = null;
            img.scale9Grid = Pool.alloc(Rectangle).setTo(3, 8, 1, 1);
            img.width = 11;
            img.height = 70;
            self.addChild(img);
        };
        Object.defineProperty(ScrollBar.prototype, "scrollTarget", {
            /**
             * 滚动条控制的目标
             */
            get: function () {
                return this._scrollTarget;
            },
            set: function (value) {
                this._scrollTarget = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollBar.prototype, "layoutPolicy", {
            get: function () {
                return this._layoutPolicy;
            },
            set: function (value) {
                this._layoutPolicy = value;
            },
            enumerable: true,
            configurable: true
        });
        ScrollBar.prototype.setSize = function (sw, sh) {
            var self = this;
            if (self._layoutPolicy == "horizontal" /* HORIZONTAL */) {
                self._border.width = sw;
                self._border.height = 17;
                self.width = sw;
                self.height = NaN;
                self._tw = sw;
                self._th = 0;
            }
            else if (self._layoutPolicy == "vertical" /* VERTICAL */) {
                self._border.width = 17;
                self._border.height = sh;
                self.width = NaN;
                self.height = sh;
                self._tw = 0;
                self._th = sh;
            }
            self.onPosChanged();
        };
        ScrollBar.prototype.onPosChanged = function () {
            var self = this;
            if (self._scrollTarget) {
                var tx = 0;
                if (self._tw > 0) {
                    tx = Math.min(self._tw * self._scrollTarget.scrollPos, self._tw - self._thumb.height - 3);
                }
                self._thumb.x = Math.max(tx, 3);
                var ty = 0;
                if (self._th > 0) {
                    ty = Math.min(self._th * self._scrollTarget.scrollPos, self._th - self._thumb.height - 3);
                }
                self._thumb.y = Math.max(ty, 3);
            }
        };
        ScrollBar.prototype.clear = function () {
            this._scrollTarget = null;
            _super.prototype.clear.call(this);
        };
        ScrollBar.prototype.reset = function () {
            _super.prototype.reset.call(this);
        };
        ScrollBar.prototype.dispose = function () {
            Pool.release(this._thumb);
            this._thumb = null;
            _super.prototype.dispose.call(this);
        };
        return ScrollBar;
    }(uilib.UIComponent));
    uilib.ScrollBar = ScrollBar;
    __reflect(ScrollBar.prototype, "uilib.ScrollBar");
})(uilib || (uilib = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var Cmd = base.Cmd;
        var ConnectErrCmd = /** @class */ (function (_super) {
            __extends(ConnectErrCmd, _super);
            function ConnectErrCmd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ConnectErrCmd.prototype.exec = function (n) {
                console.info("connect error");
                gso.logList["load_connect" /* START_CONNECT */ + "2"] = "服务端返回 连接错误 base.ON_CONNECT_ERROR";
                var loginProxy = this.retProxy(1 /* Login */);
                loginProxy.data.disConnectReason = gso.isBack ? 10 : -1; //手动操作返回10，其它情况重连
                this.sendNt(base.ON_CONNECT_LOST);
            };
            return ConnectErrCmd;
        }(Cmd));
        login.ConnectErrCmd = ConnectErrCmd;
        __reflect(ConnectErrCmd.prototype, "game.login.ConnectErrCmd");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var facade = base.facade;
        var BgMgr = game.BgMgr;
        var Handler = base.Handler;
        var Cmd = base.Cmd;
        var delayCall = base.delayCall;
        var ConnectLostCmd = /** @class */ (function (_super) {
            __extends(ConnectLostCmd, _super);
            function ConnectLostCmd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ConnectLostCmd.prototype.exec = function (n) {
                var proxy = this.retProxy(1 /* Login */);
                var r = proxy.data.disConnectReason;
                var msg = proxy.data.disConnectMsg;
                console.info("connection lost", r, msg);
                login.LoginProxy.isLoginAccount = false;
                gso.logList["load_connect" /* START_CONNECT */ + "3"] = "服务端主动断开连接 base.ON_CONNECT_LOST " + r + "--" + msg;
                if (game.PreloadMgr.isAllComplete) {
                    game.LogUtil.printLogin("ConnectLostCmd PreloadMgr.isAllComplete");
                    BgMgr.getIns().setBg("1");
                    game.Layer.hideMdr(game.Layer.main);
                    game.Layer.hideMdr(game.Layer.window);
                    game.Layer.hideMdr(game.Layer.upperWin);
                    game.Layer.hideMdr(game.Layer.modal);
                    game.Layer.hideMdr(game.Layer.bossReliveTip);
                    game.Layer.hideMdr(game.Layer.tip);
                    game.Layer.hideMdr(game.Layer.top);
                    facade.deleteMdr("02" /* Login */, "06" /* Alert */);
                    this.sendNt("game_connect_lost" /* GAME_CONNECT_LOST */);
                }
                var data = { lab: msg };
                if (msg) {
                    game.LogUtil.printLogin("ConnectLostCmd 11 显示登录页面");
                    data.confirm = Handler.alloc(this, this.onClick);
                    // data.cancel = Handler.alloc(this, this.onClick);
                    facade.showView("02" /* Login */, "06" /* Alert */, data);
                    return;
                }
                if (r === 0 || r === -1) {
                    if (proxy.data.reConnectCnt < game.ReConnectMax) {
                        game.LogUtil.printLogin("ConnectLostCmd 重连");
                        //一秒钟重连一次
                        var self_2 = this;
                        delayCall(Handler.alloc(self_2, function () {
                            self_2.sendNt("try_reconnect" /* TRY_RECONNECT */);
                        }), 500);
                        return;
                    }
                    game.LogUtil.printLogin("ConnectLostCmd 弹窗");
                    data.lab = r === -1 ? "\u4E0E\u670D\u52A1\u5668\u8FDE\u63A5\u51FA\u9519" /* ConnectionError */ : "\u4E0E\u670D\u52A1\u5668\u8FDE\u63A5\u65AD\u5F00" /* ConnectionBreak */;
                    data.confirm = Handler.alloc(this, this.onClick);
                }
                else {
                    data.lab = game.DisConnectMsg[r];
                    data.confirm = Handler.alloc(this, this.onClick);
                }
                if (r == 10) {
                    this.onClick();
                }
                else {
                    game.LogUtil.printLogin("ConnectLostCmd 22 显示登录页面");
                    facade.showView("02" /* Login */, "06" /* Alert */, data);
                }
            };
            ConnectLostCmd.prototype.onClick = function () {
                var proxy = this.retProxy(1 /* Login */);
                var r = proxy.data.disConnectReason;
                if (r == 1) {
                    game.LogUtil.printLogin("ConnectLostCmd onClick 注销登录");
                    gzyyou.sdk.logout();
                }
                else if (r == 4 || r == 10) {
                    game.LogUtil.printLogin("ConnectLostCmd onClick r == 4 || r == 10");
                    gso.showServerAlert = true;
                }
                facade.onConnectLost();
                proxy.data.reConnectCnt = 0;
                gso.server_info = null;
                game.LogUtil.printLogin("ConnectLostCmd onClick 再一次链接服务器");
                ggo.reconnect(0);
            };
            return ConnectLostCmd;
        }(Cmd));
        login.ConnectLostCmd = ConnectLostCmd;
        __reflect(ConnectLostCmd.prototype, "game.login.ConnectLostCmd");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var facade = base.facade;
        var Cmd = base.Cmd;
        var EnterMainCmd = /** @class */ (function (_super) {
            __extends(EnterMainCmd, _super);
            function EnterMainCmd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EnterMainCmd.prototype.exec = function (n) {
                gso.isNoticeActive = false;
                // gso.updateNotice = null;
                gso.scriptList = null;
                game.LogUtil.printLogin("关闭加载页面和清楚一些登录的层级");
                var proxy = this.retProxy(1 /* Login */);
                proxy.clean();
                facade.hideView("02" /* Login */, "05" /* Loading */);
                game.Layer.hideMdr(game.Layer.main);
                game.Layer.hideMdr(game.Layer.window);
                game.Layer.hideMdr(game.Layer.upperWin);
                game.Layer.hideMdr(game.Layer.modal);
                game.Layer.hideMdr(game.Layer.tip);
                game.LogUtil.printLogin("请求角色登录");
                proxy.loginRole(proxy.role_id);
            };
            return EnterMainCmd;
        }(Cmd));
        login.EnterMainCmd = EnterMainCmd;
        __reflect(EnterMainCmd.prototype, "game.login.EnterMainCmd");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var Cmd = base.Cmd;
        var facade = base.facade;
        var LoadGameResCmd = /** @class */ (function (_super) {
            __extends(LoadGameResCmd, _super);
            function LoadGameResCmd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            LoadGameResCmd.prototype.exec = function (n) {
                var _this = this;
                if (gso.isReload && game.PreloadMgr.isAllComplete) {
                    this.sendNt("enter_main" /* ENTER_MAIN */);
                    return;
                }
                gzyyou.sdk.loadReport("load_res_start" /* RES_START */);
                game.LogUtil.printLogin("资源开始加载");
                if (game.PreloadMgr.isAllComplete) {
                    this.loadComplete();
                    return;
                }
                facade.showView("02" /* Login */, "05" /* Loading */);
                game.PreloadMgr.startLoad(function () { return _this.loadComplete(); });
            };
            LoadGameResCmd.prototype.loadComplete = function () {
                var proxy = this.retProxy(1 /* Login */);
                if (!proxy.service.isConnected()) {
                    game.LogUtil.printLogin("资源加载完成，但是socket断开了");
                    facade.hideView("02" /* Login */, "05" /* Loading */);
                    facade.showView("02" /* Login */, "01" /* Start */);
                    return;
                }
                gzyyou.sdk.loadReport("load_res_end" /* RES_END */);
                game.LogUtil.printLogin("资源加载结束");
                this.sendNt("enter_main" /* ENTER_MAIN */);
            };
            return LoadGameResCmd;
        }(Cmd));
        login.LoadGameResCmd = LoadGameResCmd;
        __reflect(LoadGameResCmd.prototype, "game.login.LoadGameResCmd");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var Cmd = base.Cmd;
        var OnAccLoginCmd = /** @class */ (function (_super) {
            __extends(OnAccLoginCmd, _super);
            function OnAccLoginCmd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OnAccLoginCmd.prototype.exec = function (n) {
                console.info("account login");
                ggo.removeVerbose();
                var proxy = this.retProxy(1 /* Login */);
                var report = gzyyou.sdk.gankReport;
                if (!proxy.role_id || proxy.role_id.isZero()) {
                    console.error("数据出错，角色创建失败，查询 s2c_signin_account ");
                    // facade.showView(ModName.Login, LoginViewType.CreateRole);
                }
                else {
                    this.sendNt("load_game_res" /* LOAD_GAME_RES */);
                    if (report) {
                        report("entergame_direct");
                    }
                }
            };
            return OnAccLoginCmd;
        }(Cmd));
        login.OnAccLoginCmd = OnAccLoginCmd;
        __reflect(OnAccLoginCmd.prototype, "game.login.OnAccLoginCmd");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var uilib;
(function (uilib) {
    var ListDataEvent = /** @class */ (function (_super) {
        __extends(ListDataEvent, _super);
        function ListDataEvent(type) {
            return _super.call(this, type) || this;
        }
        ListDataEvent.prototype.clean = function () {
            this.index = undefined;
            this.data = undefined;
            _super.prototype.clean.call(this);
        };
        ListDataEvent.ADD = "add";
        ListDataEvent.REMOVE = "remove";
        ListDataEvent.CLEAR = "clear";
        ListDataEvent.UPDATE = "update";
        ListDataEvent.ADDARRAY = "addarray";
        ListDataEvent.REFRESH = "refresh";
        return ListDataEvent;
    }(egret.Event));
    uilib.ListDataEvent = ListDataEvent;
    __reflect(ListDataEvent.prototype, "uilib.ListDataEvent");
})(uilib || (uilib = {}));
/** @internal */
var uilib;
(function (uilib) {
    var ListViewEvent = /** @class */ (function (_super) {
        __extends(ListViewEvent, _super);
        function ListViewEvent(type) {
            return _super.call(this, type) || this;
        }
        ListViewEvent.prototype.clean = function () {
            this.oldIndex = undefined;
            this.newIndex = undefined;
            this.click = false;
            _super.prototype.clean.call(this);
        };
        ListViewEvent.INDEX_CHANGED = "index_changed";
        ListViewEvent.CURRENTPAGE_CHANGED = "currentpage_changed";
        ListViewEvent.TOTALPAGE_CHAGED = "totalpage_chaged";
        ListViewEvent.OVER_CHANGED = "over_changed";
        return ListViewEvent;
    }(egret.Event));
    uilib.ListViewEvent = ListViewEvent;
    __reflect(ListViewEvent.prototype, "uilib.ListViewEvent");
})(uilib || (uilib = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var facade = base.facade;
        var Cmd = base.Cmd;
        var OnGotServerInfoCmd = /** @class */ (function (_super) {
            __extends(OnGotServerInfoCmd, _super);
            function OnGotServerInfoCmd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            OnGotServerInfoCmd.prototype.exec = function (n) {
                facade.hideView("02" /* Login */, "01" /* Start */);
                facade.deleteMdr("02" /* Login */, "01" /* Start */);
                console.info("OnGotServerInfoCmd");
                this.sendNt("start_connect" /* START_CONNECT */);
            };
            return OnGotServerInfoCmd;
        }(Cmd));
        login.OnGotServerInfoCmd = OnGotServerInfoCmd;
        __reflect(OnGotServerInfoCmd.prototype, "game.login.OnGotServerInfoCmd");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var Mdr = base.Mdr;
        var TouchEvent = egret.TouchEvent;
        var HorizontalAlign = egret.HorizontalAlign;
        var AdultAlertMdr = /** @class */ (function (_super) {
            __extends(AdultAlertMdr, _super);
            function AdultAlertMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", login.AlertView);
                return _this;
            }
            AdultAlertMdr.prototype.onInit = function () {
                this._view.btnCancel.label = "暂时跳过";
                this._view.btnConfirm.label = "前往认证";
                this._view.labelContent.textAlign = HorizontalAlign.LEFT;
                this._view.btnCancel.visible = true;
            };
            AdultAlertMdr.prototype.addListeners = function () {
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.btnConfirm, TouchEvent.TOUCH_TAP, this.onConfirm);
                addEventListener(this._view.btnCancel, TouchEvent.TOUCH_TAP, this.hide);
                addEventListener(this._view.btnClose, TouchEvent.TOUCH_TAP, this.hide);
            };
            AdultAlertMdr.prototype.onShow = function () {
                var self = this;
                var v = self._view;
                v.x = (v.parent.width - v.width) / 2;
                v.y = (v.parent.height - v.height) / 2;
                self._view.labelContent.text = "亲爱的玩家\n根据国家相关规定，游戏需要进行实名认证，否则将被纳入防沉迷名单\n请及时认证以保证正常游戏";
            };
            AdultAlertMdr.prototype.onHide = function () {
                _super.prototype.onHide.call(this);
            };
            AdultAlertMdr.prototype.onConfirm = function () {
                this.showView("09" /* AdultId */);
                this.hide();
            };
            return AdultAlertMdr;
        }(Mdr));
        login.AdultAlertMdr = AdultAlertMdr;
        __reflect(AdultAlertMdr.prototype, "game.login.AdultAlertMdr");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var Mdr = base.Mdr;
        var TouchEvent = egret.TouchEvent;
        var TimeMgr = base.TimeMgr;
        var FocusEvent = egret.FocusEvent;
        var AdultIdMdr = /** @class */ (function (_super) {
            __extends(AdultIdMdr, _super);
            function AdultIdMdr() {
                var _a;
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", login.AdultIdView);
                _this.ErrorCodeDict = (_a = {},
                    _a[11] = "认证成功",
                    _a[12] = "已添加过认证",
                    _a[13] = "serverid参数有误",
                    _a[14] = "账号有误",
                    _a[15] = "缺少身份证信息",
                    _a[16] = "身份证长度错误",
                    _a[17] = "名字有误",
                    _a[18] = "名字包含非中文字符",
                    _a[19] = "身份验证失败",
                    _a);
                return _this;
            }
            AdultIdMdr.prototype.onInit = function () {
                this._view.labName.prompt = "请输入真实姓名";
                this._view.labIdentity.prompt = "请输入身份证号码";
                this._view.labIdentity.restrict = "0-9 X";
                this._view.labIdentity.maxChars = 30;
                this._view.btnConfirm.x = 341;
                this._view.btnCancel.visible = true;
            };
            AdultIdMdr.prototype.addListeners = function () {
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.btnConfirm, TouchEvent.TOUCH_TAP, this.onConfirm);
                addEventListener(this._view.btnCancel, TouchEvent.TOUCH_TAP, this.hide);
                addEventListener(this._view.btnClose, TouchEvent.TOUCH_TAP, this.hide);
                addEventListener(this._view.labName, FocusEvent.FOCUS_IN, this.onLabelInt);
                addEventListener(this._view.labIdentity, FocusEvent.FOCUS_IN, this.onLabelInt);
                addEventListener(this._view.labName, FocusEvent.FOCUS_OUT, this.onLabelOut);
                addEventListener(this._view.labIdentity, FocusEvent.FOCUS_OUT, this.onLabelOut);
            };
            AdultIdMdr.prototype.onShow = function () {
                var self = this;
                var v = self._view;
                v.x = (v.parent.width - v.width) / 2;
                v.y = (v.parent.height - v.height) / 2;
                this.lastShowTime = this.curCount = 0;
                this.refreshAccount();
                TimeMgr.addUpdateItem(this, 500);
            };
            AdultIdMdr.prototype.onHide = function () {
                TimeMgr.removeUpdateItem(this);
                _super.prototype.onHide.call(this);
            };
            AdultIdMdr.prototype.onLabelInt = function (evt) {
                var tar = evt.currentTarget;
                if (tar) {
                    if (tar.text == tar.prompt) {
                        tar.text = "";
                    }
                    tar.prompt = "";
                }
            };
            AdultIdMdr.prototype.onLabelOut = function (evt) {
                var tar = evt.currentTarget;
                if (tar.text.trim() != "") {
                    return;
                }
                if (tar == this._view.labIdentity) {
                    tar.prompt = "请输入身份证号码";
                }
                else if (tar == this._view.labName) {
                    tar.prompt = "请输入真实姓名";
                }
            };
            AdultIdMdr.prototype.onConfirm = function () {
                var account = this._view.labAccount.text;
                var authId = this._view.labIdentity.text;
                var name = this._view.labName.text;
                if (authId.trim() == "" || authId == this._view.labIdentity.prompt) {
                    this.printErrorString("请填写身份证号码", 4);
                    return;
                }
                if (name.trim() == "" || name == this._view.labName.prompt) {
                    this.printErrorString("请填写真实名字", 4);
                    return;
                }
                var self = this;
                var cb = function (obj) {
                    self.onRespAuth(obj);
                };
                //调用sdk
                gzyyou.sdk.uploadAuth(account.trim(), authId.trim(), name.trim(), cb);
            };
            AdultIdMdr.prototype.refreshAccount = function () {
                var account = gso.account;
                this._view.labAccount.text = account;
            };
            AdultIdMdr.prototype.update = function (time) {
                if (!this._view.labTip || !this._view.labTip.visible) {
                    return;
                }
                this.curCount++;
                if (this.curCount >= this.lastShowTime) {
                    this._view.labTip.visible = false;
                }
            };
            AdultIdMdr.prototype.onRespAuth = function (obj) {
                if (!obj) {
                    return;
                }
                var code = obj.code;
                var codeString = this.ErrorCodeDict[code];
                if (codeString) {
                    this.printErrorString(codeString, 6);
                }
                /* if (code == 11) {
                     gso.is_adult = "1";
                     this._view.labTip.textColor = 0x00ff00;
                     this.sendNt(LoginEvent.ADULT_CHANGE);
                     delayCall(Handler.alloc(this, this.hide), 2000);
                 }*/
            };
            AdultIdMdr.prototype.printErrorString = function (content, time) {
                if (time === void 0) { time = 6; }
                this._view.labTip.textColor = 0xff0000;
                this._view.labTip.text = content;
                this._view.labTip.visible = true;
                this.lastShowTime = time;
                this.curCount = 0;
            };
            return AdultIdMdr;
        }(Mdr));
        login.AdultIdMdr = AdultIdMdr;
        __reflect(AdultIdMdr.prototype, "game.login.AdultIdMdr", ["base.UpdateItem"]);
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var Mdr = base.Mdr;
        var Pool = base.Pool;
        var TouchEvent = egret.TouchEvent;
        var Event = egret.Event;
        var AlertMdr = /** @class */ (function (_super) {
            __extends(AlertMdr, _super);
            function AlertMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", login.AlertView);
                return _this;
            }
            AlertMdr.prototype.onInit = function () {
                this._view.btnConfirm.label = "\u786E\u5B9A" /* Confirm */;
                this._view.btnCancel.label = "\u53D6\u6D88" /* Cancel */;
            };
            AlertMdr.prototype.addListeners = function () {
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.btnConfirm, TouchEvent.TOUCH_TAP, this.onConfirm);
                addEventListener(this._view.btnCancel, TouchEvent.TOUCH_TAP, this.onCancel);
                addEventListener(this._view.btnClose, TouchEvent.TOUCH_TAP, this.onCancel);
                addEventListener(this._view.check, Event.CHANGE, this.onCheckChange);
            };
            AlertMdr.prototype.onShow = function () {
                var self = this;
                if (this._showArgs.checkType != undefined && AlertMdr._checked[this._showArgs.checkType]) {
                    this.onConfirm();
                    return;
                }
                var v = self._view;
                v.x = (v.parent.width - v.width) / 2;
                v.y = (v.parent.height - v.height) / 2;
                var txt = self._showArgs.lab || self._showArgs;
                self._view.labelContent.text = txt;
                self._view.btnCancel.visible = self._showArgs.cancel != undefined;
                self._view.btnConfirm.x = self._view.btnCancel.visible ? 392 : 276;
                if (self._showArgs.ConfirmTxt) {
                    this._view.btnConfirm.label = self._showArgs.ConfirmTxt;
                }
                if (self._showArgs.CancelTxt) {
                    this._view.btnCancel.label = self._showArgs.CancelTxt;
                }
                var showCheck = !!this._showArgs.checkType;
                this._view.showCheck = showCheck;
            };
            AlertMdr.prototype.onHide = function () {
                var confirm = this._showArgs && this._showArgs.confirm;
                if (confirm) {
                    this._showArgs.confirm = null;
                    Pool.release(confirm);
                }
                var cancel = this._showArgs && this._showArgs.cancel;
                if (cancel) {
                    this._showArgs.cancel = null;
                    Pool.release(confirm);
                }
                _super.prototype.onHide.call(this);
            };
            AlertMdr.prototype.onConfirm = function () {
                if (!this._showArgs || !this._showArgs.confirm) {
                    this.hide();
                    return;
                }
                this.execAndHide(this._showArgs.confirm);
            };
            AlertMdr.prototype.onCancel = function () {
                if (!this._showArgs || !this._showArgs.cancel) {
                    this.hide();
                    return;
                }
                this.execAndHide(this._showArgs.cancel);
            };
            AlertMdr.prototype.onCheckChange = function (e) {
                if (this._showArgs.checkType != undefined) {
                    AlertMdr._checked[this._showArgs.checkType] = this._view.isChecked;
                }
            };
            AlertMdr.prototype.execAndHide = function (handler) {
                var r = false;
                if (handler) {
                    r = !!handler.exec();
                }
                if (r) { // 回调里阻止关闭弹框
                    return;
                }
                this.hide();
            };
            AlertMdr._checked = {};
            return AlertMdr;
        }(Mdr));
        login.AlertMdr = AlertMdr;
        __reflect(AlertMdr.prototype, "game.login.AlertMdr");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var Event = egret.Event;
        var TouchEvent = egret.TouchEvent;
        var TimeMgr = base.TimeMgr;
        var Handler = base.Handler;
        var Pool = base.Pool;
        var Rectangle = egret.Rectangle;
        var Mdr = base.Mdr;
        var delayCall = base.delayCall;
        var clearDelay = base.clearDelay;
        var Tween = base.Tween;
        var CreateRoleMdr = /** @class */ (function (_super) {
            __extends(CreateRoleMdr, _super);
            function CreateRoleMdr() {
                var _this = _super.call(this, game.Layer.main) || this;
                _this._view = _this.mark("_view", login.CreateRoleView);
                _this._inputName = false;
                _this._autoCreateTime = 10;
                _this._curSex = 1 /* Male */;
                _this._curAge = 1 /* Young */;
                return _this;
            }
            CreateRoleMdr.prototype.onShow = function () {
                ggo.removeVerbose();
                var view = this._view;
                view.x = (view.parent.width - view.width) / 2;
                view.y = (view.parent.height - view.height) / 2;
                game.BgMgr.getIns().setBg(null);
                // gzyyou.sdk.loadReport(REPORT_LOAD.CREATE);
                view.scrollRect = Pool.alloc(Rectangle).setTo(0, 0, view.width, view.height);
                var anim;
                if (!this._anim1) {
                    anim = this._anim1 = Pool.alloc(game.UIAnimate);
                    anim.x = 360;
                    anim.y = 825;
                    anim.times = -1;
                    anim.scaleX = anim.scaleY = 1.2;
                    anim.speed = 1;
                    anim.load("assets/anim/body/create/create_male", 12, true);
                    // view.addChildAt(anim, view.getChildIndex(view.btnCreate) + 1);
                    view.group_eft.addChild(anim);
                }
                if (!this._anim2) {
                    anim = this._anim2 = Pool.alloc(game.UIAnimate);
                    anim.x = 720 + 360 + 40;
                    anim.y = 825;
                    anim.times = -1;
                    anim.scaleX = anim.scaleY = 1.2;
                    anim.speed = 1;
                    anim.load("assets/anim/body/create/create_female", 12, true);
                    // view.addChildAt(anim, view.getChildIndex(view.btnCreate) + 1);
                    view.group_eft.addChild(anim);
                }
                var proxy = this.retProxy(1 /* Login */);
                var sex = proxy.data.sex || Math.floor(Math.random() * 2) + 1;
                this._curSex = sex;
                var _isMale = sex === 1 /* Male */;
                view.group_eft.x = _isMale ? 0 : -720;
                // view.imgMale.alpha = _isMale ? 1 : 0;
                // view.imgFemale.alpha = !_isMale ? 1 : 0;
                if (_isMale) {
                    this.onClickMo();
                }
                else {
                    this.onClickRen();
                }
                this.onClickYoung();
                var name = proxy.data.name;
                if (name && name.trim() != "") {
                    view.txtName.text = name;
                }
                else {
                    this.onRandom();
                }
                TimeMgr.addUpdateItem(this, 1000);
                this._delayId = delayCall(Handler.alloc(this, function () {
                    console.log("create role start preload");
                    game.PreloadMgr.startLoad();
                }), 1000);
            };
            CreateRoleMdr.prototype.addListeners = function () {
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.btnMo, TouchEvent.TOUCH_TAP, this.onClickMo);
                addEventListener(this._view.btnRen, TouchEvent.TOUCH_TAP, this.onClickRen);
                // addEventListener(this._view.btnYoung, TouchEvent.TOUCH_TAP, this.onClickYoung);
                // addEventListener(this._view.btnYouth, TouchEvent.TOUCH_TAP, this.onClickYouth);
                addEventListener(this._view.btnRandom, TouchEvent.TOUCH_TAP, this.onRandom);
                addEventListener(this._view.btnCreate, TouchEvent.TOUCH_TAP, this.onCreate);
                addEventListener(this._view.txtName, Event.CHANGE, this.onNameChanged);
                addEventListener(this._view.txtName, TouchEvent.TOUCH_TAP, this.removeAutoCreate);
            };
            CreateRoleMdr.prototype.onCreate = function () {
                this.removeAutoCreate();
                var name = this._view.txtName.text;
                if (!name) {
                    this.showView("06" /* Alert */, "\u8BF7\u8F93\u5165\u540D\u5B57" /* InputName */);
                    return;
                }
                var sex = this._curSex;
                if (!sex) {
                    this.showView("06" /* Alert */, "\u8BF7\u9009\u62E9\u6027\u522B" /* InputSex */);
                    return;
                }
                var loginProxy = this.retProxy(1 /* Login */);
                loginProxy.createRole(name, sex, this._curAge, 1);
                gzyyou.sdk.loadReport("kaishiyouxi_click" /* kaishiyouxi_click */);
                // let roleId = "";
                // let power = 0;
                // let lv = 0;
                // let vip = 0;
                // let money = "0";
                // let time = TimeMgr.time.serverTimeSecond;
                gso.roleName = name;
                // gzyyou.sdk.pointReport(RoleInfoType.Create, lv, roleId, name, vip, money, time, loginProxy.create_time);
            };
            CreateRoleMdr.prototype.removeAutoCreate = function () {
                TimeMgr.removeUpdateItem(this);
                this._view.lab_timeDown.visible = false;
            };
            CreateRoleMdr.prototype.update = function (time) {
                this._autoCreateTime--;
                this._view.lab_timeDown.text = game.StringUtil.substitute("%s\u79D2\u540E\u81EA\u52A8\u521B\u5EFA" /* CreateCountDown */, [this._autoCreateTime]);
                this._view.lab_timeDown.visible = true;
                if (this._autoCreateTime <= 1) {
                    this.onCreate();
                    TimeMgr.removeUpdateItem(this);
                }
            };
            CreateRoleMdr.prototype.onHide = function () {
                // let anim = this._anim;
                // this._anim = null;
                // if (anim) {
                //     if (anim.parent) {
                //         anim.parent.removeChild(anim);
                //     }
                //     Pool.release(anim);
                // }
                var r = this._view.scrollRect;
                Pool.release(r);
                this._view.scrollRect = null;
                TimeMgr.removeUpdateItem(this);
                clearDelay(this._delayId);
                _super.prototype.onHide.call(this);
            };
            CreateRoleMdr.prototype.onNameChanged = function (e) {
                this.removeAutoCreate();
                this._inputName = true;
            };
            CreateRoleMdr.prototype.onRandom = function (e) {
                if (e) {
                    this.removeAutoCreate();
                }
                var sex = this._curSex;
                this._view.txtName.text = game.TextUtil.getRandomName(sex);
            };
            //选择性别
            CreateRoleMdr.prototype.onClickMo = function () {
                this._curSex = 1 /* Male */;
                this.updateCurSelSex();
            };
            CreateRoleMdr.prototype.onClickRen = function () {
                this._curSex = 2 /* Female */;
                this.updateCurSelSex();
            };
            CreateRoleMdr.prototype.updateCurSelSex = function () {
                var _isMo = this._curSex == 1 /* Male */;
                // this._view.btnYoung.x = _isMo ? 368 : 152;
                // this._view.btnYouth.x = _isMo ? 504 : 288;
                this._view.btnMo.source = game.GetCreateRoleUrl(_isMo ? "btn_mo.png" : "btn_mo_hui.png");
                this._view.btnRen.source = game.GetCreateRoleUrl(_isMo ? "btn_ren_hui.png" : "btn_ren.png");
                this._view.imgTitle.source = game.GetCreateRoleUrl(_isMo ? "create_title_nan.png" : "create_title_nv.png");
                this.onSexChanged();
            };
            CreateRoleMdr.prototype.onClickYoung = function () {
                this._curAge = 1 /* Young */;
                this.updateCurSelAge();
            };
            CreateRoleMdr.prototype.onClickYouth = function () {
                this._curAge = 2 /* Youth */;
                this.updateCurSelAge();
            };
            CreateRoleMdr.prototype.updateCurSelAge = function () {
                var _isYoung = this._curAge == 1 /* Young */;
                // this._view.btnYoung.source = GetCreateRoleUrl(_isYoung ? "btn_young.png" : "btn_young_hui.png");
                // this._view.btnYouth.source = GetCreateRoleUrl(_isYoung ? "btn_youth_hui.png" : "btn_youth.png");
            };
            CreateRoleMdr.prototype.onSexChanged = function () {
                this.removeAutoCreate();
                var sex = this._curSex == 1 /* Male */ ? 1 /* Male */ : 2 /* Female */;
                var isMale = sex == 1 /* Male */;
                // this._view.imgFemale.alpha = this._view.imgMale.alpha = 1;
                Tween.remove(this._view.group_eft);
                Tween.get(this._view.group_eft).to({ x: isMale ? 0 : -720 }, 500);
                //     .exec(Handler.alloc(this, () => {
                //     this._view.imgMale.alpha = isMale ? 1 : 0;
                //     this._view.imgFemale.alpha = !isMale ? 1 : 0;
                // }));
                if (!this._inputName) {
                    this.onRandom();
                }
            };
            return CreateRoleMdr;
        }(Mdr));
        login.CreateRoleMdr = CreateRoleMdr;
        __reflect(CreateRoleMdr.prototype, "game.login.CreateRoleMdr", ["base.UpdateItem"]);
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var login;
    (function (login) {
        var Mdr = base.Mdr;
        var Pool = base.Pool;
        var PreloadMgr = game.PreloadMgr;
        var Rectangle = egret.Rectangle;
        var TimeMgr = base.TimeMgr;
        var LoadingMdr = /** @class */ (function (_super) {
            __extends(LoadingMdr, _super);
            function LoadingMdr() {
                var _this = _super.call(this, game.Layer.main) || this;
                _this._view = _this.mark("_view", login.LoadingView);
                _this._singleCurPro = 0;
                return _this;
            }
            LoadingMdr.prototype.onShow = function () {
                game.BgMgr.getIns().setBg("1");
                var v = this._view;
                v.x = (v.parent.width - v.width) / 2;
                v.y = (v.parent.height - v.height) / 2;
                this._view.imgBar.scrollRect = Pool.alloc(Rectangle).setTo(0, 0, 1, this._view.imgBar.height);
                this._view.imgSingleBar.scrollRect = Pool.alloc(Rectangle).setTo(0, 0, 1, this._view.imgSingleBar.height);
                this.onProgress();
                TimeMgr.addUpdateItem(this);
            };
            LoadingMdr.prototype.onHide = function () {
                Pool.release(this._view.imgBar.scrollRect);
                this._view.imgBar.scrollRect = null;
                this.clearSingleBar();
            };
            LoadingMdr.prototype.addListeners = function () {
                var addEventListener = this.onEgret.bind(this);
                this.onNt("preload_progress" /* PRELOAD_PROGRESS */, this.onProgress, this);
            };
            /** @internal */ LoadingMdr.prototype.onProgress = function () {
                var p = PreloadMgr.curPro;
                this._view.imgBar.scrollRect.width = (p / 100) * this._view.imgBar.width;
                this._view.imgPt.x = this._view.imgBar.x + (p / 100) * this._view.imgBar.width - (this._view.imgPt.width * 0.5);
                if (p >= 99) {
                    this._singleCurPro = 100;
                    this.update();
                    this.clearSingleBar();
                }
            };
            LoadingMdr.prototype.clearSingleBar = function () {
                Pool.release(this._view.imgSingleBar.scrollRect);
                this._view.imgSingleBar.scrollRect = null;
                TimeMgr.removeUpdateItem(this);
            };
            LoadingMdr.prototype.update = function (time) {
                var img = this._view.imgSingleBar;
                if (!img.scrollRect) {
                    return;
                }
                if (this._singleCurPro >= 100) {
                    this._singleCurPro = 0;
                }
                img.scrollRect.width = (this._singleCurPro / 100) * img.width;
                this._singleCurPro += 5;
            };
            return LoadingMdr;
        }(Mdr));
        login.LoadingMdr = LoadingMdr;
        __reflect(LoadingMdr.prototype, "game.login.LoadingMdr", ["base.UpdateItem"]);
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var Mdr = base.Mdr;
        var TextFieldBase = uilib.TextFieldBase;
        var Pool = base.Pool;
        var TextFieldType = egret.TextFieldType;
        var DisplayObjectContainer = egret.DisplayObjectContainer;
        var Button = uilib.Button;
        var HorizontalAlign = egret.HorizontalAlign;
        var TouchEvent = egret.TouchEvent;
        var facade = base.facade;
        var LoginMdr = /** @class */ (function (_super) {
            __extends(LoginMdr, _super);
            function LoginMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                /** @internal */ _this._view = _this.mark("_view", login.NoticePanel);
                return _this;
            }
            LoginMdr.prototype.onInit = function () {
            };
            LoginMdr.prototype.addListeners = function () {
            };
            LoginMdr.prototype.onShow = function () {
                var self = this;
                var v = self._view;
                v.x = (v.parent.width - v.width) / 2;
                v.y = (v.parent.height - v.height) / 2;
                self._view.btnClose.visible = false;
                self._view.lab_tips.visible = false;
                var dis = new DisplayObjectContainer();
                self._view.addChild(dis);
                dis.width = 428;
                dis.height = 400;
                dis.anchorOffsetX = 214;
                dis.anchorOffsetY = 200;
                dis.x = 360;
                dis.y = v.height / 2;
                var img = Pool.alloc(game.BitmapBase);
                img.source = game.GetLoginUrl("di1");
                dis.addChild(img);
                img = Pool.alloc(game.BitmapBase);
                img.source = game.GetLoginUrl("di1");
                img.y = 150;
                dis.addChild(img);
                var lab = Pool.alloc(TextFieldBase);
                lab.text = "临时登录";
                lab.height = 50;
                lab.width = 200;
                // lab.verticalAlign = VerticalAlign.MIDDLE;
                lab.textAlign = HorizontalAlign.CENTER;
                lab.anchorOffsetX = 100;
                lab.anchorOffsetY = 25;
                lab.x = 214;
                lab.y = 50;
                lab.textColor = 0x000000;
                dis.addChild(lab);
                self.accountTxt = Pool.alloc(TextFieldBase);
                self.accountTxt.width = 200;
                self.accountTxt.height = 50;
                self.accountTxt.anchorOffsetX = 100;
                self.accountTxt.x = 250;
                self.accountTxt.y = 175;
                self.accountTxt.type = TextFieldType.INPUT;
                self.accountTxt.prompt = "请输入账号";
                // self.accountTxt.verticalAlign = VerticalAlign.MIDDLE;
                dis.addChild(self.accountTxt);
                lab = Pool.alloc(TextFieldBase);
                lab.y = 175;
                lab.x = 85;
                lab.text = "账号:";
                lab.textColor = 0x000000;
                dis.addChild(lab);
                var btn = self.btn = Pool.alloc(Button);
                btn.source = game.GetLoginUrl("xuanzhekuang");
                btn.width = 187;
                btn.height = 68;
                btn.anchorOffsetX = 93;
                btn.anchorOffsetY = 34;
                btn.x = 214;
                btn.y = 400;
                btn.label = "登录";
                dis.addChild(btn);
                var addEventListener = self.onEgret.bind(self);
                addEventListener(self.accountTxt, egret.FocusEvent.FOCUS_IN, self.onClickIn);
                addEventListener(self.accountTxt, egret.FocusEvent.FOCUS_OUT, self.onClickOut);
                addEventListener(self.btn, TouchEvent.TOUCH_TAP, self.onClickLogin);
            };
            LoginMdr.prototype.onHide = function () {
                _super.prototype.onHide.call(this);
            };
            LoginMdr.prototype.onClickIn = function () {
                if (this.accountTxt.text == "请输入账号") {
                    this.accountTxt.text = "";
                }
            };
            LoginMdr.prototype.onClickOut = function (e) {
                if (this.accountTxt.text == "") {
                    this.accountTxt.text = "请输入账号";
                }
            };
            LoginMdr.prototype.onClickLogin = function () {
                if (this.accountTxt.text == "请输入账号") {
                    this.showView("06" /* Alert */, this.accountTxt.text);
                    return;
                }
                gso.account = this.accountTxt.text;
                var data = {
                    jzsj_channel: gso.jzsj_channel,
                    gameid: gso.gameid,
                    account: gso.account,
                    token: gso.token
                };
                if (gso.timestamp) {
                    data.timestamp = gso.timestamp;
                }
                var apiUrl = gso.apiHost + gso.apiLoginMethod + "index/";
                if (gso.jzsj_channel === "testshow") {
                    apiUrl = gso.apiHost;
                    data = {
                        action: "index",
                        jzsj_channel: gso.jzsj_channel,
                        gameid: gso.gameid,
                        account: gso.account,
                        token: gso.token
                    };
                }
                ggo.webReqGet(apiUrl, data, this.apiLoginSucc, this.apiLoginFail);
            };
            LoginMdr.prototype.apiLoginSucc = function (resp) {
                var k;
                for (k in resp) {
                    if (k !== "params" && resp.hasOwnProperty(k)) {
                        gso[k] = resp[k];
                    }
                }
                for (k in resp.params) {
                    if (resp.params.hasOwnProperty(k)) {
                        gso[k] = resp.params[k];
                    }
                }
                gso.version = gso.test_ver || ggo.checkVersion(gso.version);
                facade.hideView("02" /* Login */, "07" /* Login */);
                gso.login_acc = undefined;
                console.info("LoginMdr 触发事件 LauncherEvent.SHOW_START");
                facade.sendNt("show_start" /* SHOW_START */);
            };
            LoginMdr.prototype.apiLoginFail = function () {
                this.showView("06" /* Alert */, "登录失败，重新登录");
            };
            return LoginMdr;
        }(Mdr));
        login.LoginMdr = LoginMdr;
        __reflect(LoginMdr.prototype, "game.login.LoginMdr");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var HtmlTextParser = egret.HtmlTextParser;
        var StringUtil = game.StringUtil;
        var Mdr = base.Mdr;
        var TouchEvent = egret.TouchEvent;
        var TextFieldBase = uilib.TextFieldBase;
        var Pool = base.Pool;
        var TimeMgr = base.TimeMgr;
        var Group = eui.Group;
        var NoticePanelMdr = /** @class */ (function (_super) {
            __extends(NoticePanelMdr, _super);
            function NoticePanelMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                /** @internal */ _this._view = _this.mark("_view", login.NoticePanel);
                _this.isEasyHide = true;
                return _this;
            }
            NoticePanelMdr.prototype.onInit = function () {
            };
            NoticePanelMdr.prototype.addListeners = function () {
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.btnClose, TouchEvent.TOUCH_TAP, this.hide);
            };
            NoticePanelMdr.prototype.onShow = function () {
                var txt = this._showArgs;
                var v = this._view;
                v.x = (v.parent.width - v.width) / 2;
                v.y = (v.parent.height - v.height) / 2;
                if (null == gso.updateNotice && !txt) {
                    return;
                }
                if (this._view.labelContainer.numChildren) {
                    this.clearLabContainer();
                }
                // if (this._view.labelContainer.numChildren) {
                //     this._view.labelContainer.removeChildren();
                // }
                /** TODO 公告修改前原代码 */
                var txtList = txt ? txt.replace(/\r/g, "").split("\n") : gso.updateNotice.notice.replace(/\r/g, "").split("\n");
                // let _str: string =
                //     "注意：由于目前内网尚无公告，此公告乃<font color='#ff0000'>测试用，测试完成后需要联系客户端开发删除<\/font>" +
                //     "\n" +
                //     "<font size='24'>亲爱的玩家您好，我们将于“<font color='#ff0000'>2020年5月27日19：00”</font>。预计更新时间为“2小时”，视进度可提前或延后完成。停服期间，您将无法登录游戏。更新维护结束，将为您献上停服维护补偿。</font></font> " +
                //     "\n" +
                //     "<font size='24'>感谢您的理解和支持，我们将能力为您带来优秀的游戏体验！！</font>" +
                //     "\n" +
                //     "<title>一     本次更新\n" +
                //     "$【1】 五行元神\n" +
                //     "   本次更新新增“元神”,开服满7日的区服自动开启；\n" +
                //     "$【2】 通天塔\n" +
                //     "      超难度副本，建议组队挑战，通过可获取稀有装备与特殊精灵扭蛋。\n" +
                //     "<title>一     优化相关\n" +
                //     "$装备分解\n" +
                //     "新增多余装备分解活动和玩法\n" +
                //     "新增多余装备分解活动和玩法\n" +
                //     "$背包上限增加 \n" +
                //     "解放背包让你在摸金之旅更进一步\n" +
                //     "<title>一     后续预告\n" +
                //     "$午门试炼\n" +
                //     "万奴王携万妖来袭，和帮众一起守护九门\n" +
                //     "$万妖禁地\n" +
                //     "万妖禁地，魑魅魍魉，一关一险，谁才是禁地之王！\n" +
                //     "<font size='24'>亲爱的玩家,感谢您们一直以来对游戏的支持和热爱,我们将会持续为您带来更好的游戏体验！<\/font>"
                // let txtList = _str.replace(/\r/g, "").split("\n")
                for (var _i = 0, txtList_1 = txtList; _i < txtList_1.length; _i++) {
                    var txt_1 = txtList_1[_i];
                    var lab = Pool.alloc(TextFieldBase);
                    lab.touchEnabled = false;
                    lab.x = 13;
                    lab.lineSpacing = 6;
                    lab.width = 550;
                    lab.bold = true;
                    if (txt_1.charAt(0) === "$") {
                        lab.name = "1";
                        lab.textColor = 0x426e7b;
                        lab.textFlow = new HtmlTextParser().parse(StringUtil.replaceColorCode(txt_1.substring(1)));
                        lab.size = 20;
                    }
                    else if (txt_1.indexOf("<title>") > -1) {
                        lab.name = "2";
                        var gr = Pool.alloc(Group);
                        gr.height = 48;
                        gr.width = 202;
                        // 标题图片
                        var img = Pool.alloc(game.BitmapBase);
                        img.source = "common_titleBg24";
                        img.x = lab.x;
                        img.y = 5;
                        gr.addChild(img);
                        // 标题内容
                        txt_1 = txt_1.replace("<title>", " ");
                        lab.textColor = 0xffffff;
                        lab.stroke = 2;
                        lab.strokeColor = 0x426e7b;
                        lab.textFlow = new HtmlTextParser().parse(StringUtil.replaceColorCode(txt_1.substring(1)));
                        lab.size = 22;
                        lab.y = 15;
                        lab.x = (202 - lab.textWidth) * 0.5 + img.x;
                        gr.addChild(lab);
                        this._view.labelContainer.addChild(gr);
                        continue;
                    }
                    else {
                        lab.textColor = 0x426e7b;
                        lab.textFlow = new HtmlTextParser().parse(StringUtil.replaceColorCode(txt_1));
                        lab.size = 20;
                        // lab.x = 59;
                    }
                    this._view.labelContainer.addChild(lab);
                }
                this._view.labelContainer.touchChildren = false;
                this._view.labelContainer.touchEnabled = false;
                TimeMgr.addUpdateItem(this, 100);
            };
            NoticePanelMdr.prototype.clearLabContainer = function () {
                while (this._view.labelContainer.numChildren) {
                    var child = this._view.labelContainer.removeChildAt(0);
                    if (child instanceof TextFieldBase) {
                        child.name = "";
                    }
                    Pool.release(child);
                }
            };
            NoticePanelMdr.prototype.onHide = function () {
                this.clearLabContainer();
                TimeMgr.removeUpdateItem(this);
                _super.prototype.onHide.call(this);
            };
            NoticePanelMdr.prototype.update = function (time) {
                this.updateLabY();
                TimeMgr.removeUpdateItem(this);
            };
            NoticePanelMdr.prototype.updateLabY = function () {
                var num = this._view.labelContainer.numChildren;
                var labY = 5;
                var labList = this._view.labelContainer.$children.concat();
                for (var i = 0; i < num; ++i) {
                    var lab = labList[i]; ///as TextFieldBase
                    if (lab.name == "1") {
                        lab.y = labY + 6;
                        labY = lab.y + lab.height + 10;
                        // let img = Pool.alloc(BitmapBase);
                        // img.touchEnabled = false;
                        // img.source = "assets/ui_png/notice_title_bg.png";
                        // img.y = lab.y - 20;
                        // this._view.labelContainer.addChildAt(img, 0);
                    }
                    else if (lab.name == "2") {
                        // lab.y = labY + 30;
                        // labY = lab.y + lab.height + 6;
                    }
                    else {
                        lab.y = labY;
                        labY = lab.y + lab.height + 6;
                    }
                }
            };
            return NoticePanelMdr;
        }(Mdr));
        login.NoticePanelMdr = NoticePanelMdr;
        __reflect(NoticePanelMdr.prototype, "game.login.NoticePanelMdr", ["base.UpdateItem"]);
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
var game;
(function (game) {
    var login;
    (function (login) {
        var Mdr = base.Mdr;
        var TouchEvent = egret.TouchEvent;
        var TextFieldBase = uilib.TextFieldBase;
        var Pool = base.Pool;
        var TextEvent = egret.TextEvent;
        var PrivacyAlertMdr = /** @class */ (function (_super) {
            __extends(PrivacyAlertMdr, _super);
            function PrivacyAlertMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", login.PrivacyAlertView);
                return _this;
            }
            PrivacyAlertMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
            };
            PrivacyAlertMdr.prototype.addListeners = function () {
                var self = this;
                var addEventListener = self.onEgret.bind(self);
                addEventListener(self._view.btnClose, TouchEvent.TOUCH_TAP, self.hide);
                addEventListener(self._view.btnCancel, TouchEvent.TOUCH_TAP, self.hide);
                addEventListener(self._view.btnConfirm, TouchEvent.TOUCH_TAP, self.hide);
                addEventListener(self._view.labAgree, TextEvent.LINK, self.onTapLink);
            };
            PrivacyAlertMdr.prototype.onShow = function () {
                var self = this;
                var v = self._view;
                v.x = (v.parent.width - v.width) / 2;
                v.y = (v.parent.height - v.height) / 2;
            };
            PrivacyAlertMdr.prototype.clearLabContainer = function () {
                var self = this;
                while (self._view.labelContainer.numChildren) {
                    var child = self._view.labelContainer.removeChildAt(0);
                    if (child instanceof TextFieldBase) {
                        child.name = "";
                    }
                    Pool.release(child);
                }
            };
            PrivacyAlertMdr.prototype.onHide = function () {
                var self = this;
                self.clearLabContainer();
                _super.prototype.onHide.call(this);
            };
            PrivacyAlertMdr.prototype.onTapLink = function (e) {
                var txt = e.text;
                //用户协议
                // if(txt == GameUtil.yhxy) {
                //     this.showView(LoginViewType.Privacy,GameUtil.yhxy)
                // }
                //隐私政策
                // else if(txt = GameUtil.yszc){
                //     this.showView(LoginViewType.Privacy,GameUtil.yszc);
                // }
                this.hide();
            };
            return PrivacyAlertMdr;
        }(Mdr));
        login.PrivacyAlertMdr = PrivacyAlertMdr;
        __reflect(PrivacyAlertMdr.prototype, "game.login.PrivacyAlertMdr");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
var game;
(function (game) {
    var login;
    (function (login) {
        var HtmlTextParser = egret.HtmlTextParser;
        var StringUtil = game.StringUtil;
        var Mdr = base.Mdr;
        var TouchEvent = egret.TouchEvent;
        var TextFieldBase = uilib.TextFieldBase;
        var Pool = base.Pool;
        var TimeMgr = base.TimeMgr;
        var Group = eui.Group;
        var Handler = base.Handler;
        var facade = base.facade;
        var PrivacyMdr = /** @class */ (function (_super) {
            __extends(PrivacyMdr, _super);
            function PrivacyMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", login.PrivacyView);
                return _this;
            }
            PrivacyMdr.prototype.onInit = function () {
                _super.prototype.onInit.call(this);
            };
            PrivacyMdr.prototype.addListeners = function () {
                var addEventListener = this.onEgret.bind(this);
                addEventListener(this._view.btnClose, TouchEvent.TOUCH_TAP, this.hide);
                addEventListener(this._view.btnCancel, TouchEvent.TOUCH_TAP, this.cancel);
                addEventListener(this._view.btnConfirm, TouchEvent.TOUCH_TAP, this.confirm);
            };
            PrivacyMdr.prototype.onShow = function () {
                var txt = this._showArgs;
                var v = this._view;
                v.x = (v.parent.width - v.width) / 2;
                v.y = (v.parent.height - v.height) / 2;
                this._view.labelContainer.touchChildren = false;
                this._view.labelContainer.touchEnabled = false;
                TimeMgr.addUpdateItem(this, 100);
                var str = this.getLabStr();
                game.LoadMgr.ins.load("assets/data_server/" + str + ".txt", Handler.alloc(this, this.privacyTxt), game.LoadPri.Init, Handler.alloc(this, function () {
                    gAlert("加载失败");
                }));
            };
            PrivacyMdr.prototype.getLabStr = function () {
                var txt = this._showArgs;
                var str = "privacy"; //用户协议是同一个文件，保留判断好扩展
                switch (gso.channel) {
                    case "wanjianaudit" /* WANJIANAUDIT_SHOUQ */:
                    case "wanjiantest" /* WANJIANTEST_SHOUQ */:
                    case "wanjian" /* WANJIAN_SHOUQ */:
                        //str = txt == GameUtil.yszc ? "yszc_wanjian" : "privacy_wanjian";
                        break;
                }
                if (gso.isQQHall) {
                    //str = txt == GameUtil.yszc ? "yszc_qqhall" : "privacy_qqhall";
                }
                return str;
            };
            PrivacyMdr.prototype.privacyTxt = function (str, url) {
                this._txt = str;
                this.setTxt();
            };
            PrivacyMdr.prototype.setTxt = function () {
                if (this._view.labelContainer.numChildren) {
                    this.clearLabContainer();
                }
                var txtList = this._txt.replace(/\r/g, "").split("\n");
                for (var _i = 0, txtList_2 = txtList; _i < txtList_2.length; _i++) {
                    var txt = txtList_2[_i];
                    var lab = Pool.alloc(TextFieldBase);
                    lab.touchEnabled = false;
                    lab.x = 13;
                    lab.lineSpacing = 6;
                    lab.width = 550;
                    lab.bold = true;
                    if (txt.charAt(0) === "$") {
                        lab.name = "1";
                        lab.textColor = 0x426e7b;
                        lab.textFlow = new HtmlTextParser().parse(StringUtil.replaceColorCode(txt.substring(1)));
                        lab.size = 20;
                    }
                    else if (txt.indexOf("<title>") > -1) {
                        lab.name = "2";
                        var gr = Pool.alloc(Group);
                        gr.height = 48;
                        gr.width = 202;
                        // 标题图片
                        var img = Pool.alloc(game.BitmapBase);
                        img.source = "common_titleBg24";
                        img.x = lab.x;
                        img.y = 5;
                        gr.addChild(img);
                        // 标题内容
                        txt = txt.replace("<title>", " ");
                        lab.textColor = 0xffffff;
                        lab.stroke = 2;
                        lab.strokeColor = 0x426e7b;
                        lab.textFlow = new HtmlTextParser().parse(StringUtil.replaceColorCode(txt.substring(1)));
                        lab.size = 22;
                        lab.y = 15;
                        lab.x = (202 - lab.textWidth) * 0.5 + img.x;
                        gr.addChild(lab);
                        this._view.labelContainer.addChild(gr);
                        continue;
                    }
                    else {
                        lab.textColor = 0x426e7b;
                        lab.textFlow = new HtmlTextParser().parse(StringUtil.replaceColorCode(txt));
                        lab.size = 20;
                        // lab.x = 59;
                    }
                    this._view.labelContainer.addChild(lab);
                }
                this.updateLabY();
            };
            PrivacyMdr.prototype.clearLabContainer = function () {
                while (this._view.labelContainer.numChildren) {
                    var child = this._view.labelContainer.removeChildAt(0);
                    if (child instanceof TextFieldBase) {
                        child.name = "";
                    }
                    Pool.release(child);
                }
            };
            PrivacyMdr.prototype.onHide = function () {
                this.clearLabContainer();
                TimeMgr.removeUpdateItem(this);
                _super.prototype.onHide.call(this);
            };
            PrivacyMdr.prototype.update = function (time) {
                this.updateLabY();
                TimeMgr.removeUpdateItem(this);
            };
            PrivacyMdr.prototype.updateLabY = function () {
                var num = this._view.labelContainer.numChildren;
                var labY = 5;
                var labList = this._view.labelContainer.$children.concat();
                for (var i = 0; i < num; ++i) {
                    var lab = labList[i]; ///as TextFieldBase
                    if (lab.name == "1") {
                        lab.y = labY + 6;
                        labY = lab.y + lab.height + 10;
                    }
                    else if (lab.name == "2") {
                    }
                    else {
                        lab.y = labY;
                        labY = lab.y + lab.height + 6;
                    }
                }
            };
            PrivacyMdr.prototype.cancel = function () {
                var self = this;
                if (gso.isQQHall) {
                    self.onRefuse();
                    return;
                }
                var data = {
                    lab: "不同意隐私协议将退出游戏？", confirm: Handler.alloc(this, function () {
                        self.onRefuse();
                        if (gzyyou.sdk.exitMiniProgram) {
                            gzyyou.sdk.exitMiniProgram(null);
                        }
                    }), cancel: Handler.alloc(this, function () {
                        self.confirm();
                    }), ConfirmTxt: "退出", CancelTxt: "同意"
                };
                facade.showView("02" /* Login */, "06" /* Alert */, data);
            };
            PrivacyMdr.prototype.onRefuse = function () {
                var self = this;
                gso.isPrivacy = false;
                facade.sendNt("USER_ARGREEMENT_TIP_CONFIRM" /* USER_ARGREEMENT_TIP_CONFIRM */);
                self.hide();
            };
            PrivacyMdr.prototype.confirm = function () {
                gso.isPrivacy = true;
                facade.sendNt("USER_ARGREEMENT_TIP_CONFIRM" /* USER_ARGREEMENT_TIP_CONFIRM */);
                this.hide();
                //不是新号不直接进入游戏
                if (gso.all_is_new != 1)
                    return;
                var proxy = this.retProxy(1 /* Login */);
                ggo.loadVerbose("\u6B63\u5728\u83B7\u53D6\u670D\u52A1\u5668\u4FE1\u606F" /* GET_SERVER_INFO */);
                proxy.getServerInfo(gso.max_server.server_id);
            };
            return PrivacyMdr;
        }(Mdr));
        login.PrivacyMdr = PrivacyMdr;
        __reflect(PrivacyMdr.prototype, "game.login.PrivacyMdr", ["base.UpdateItem"]);
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var Mdr = base.Mdr;
        var ArrayList = uilib.ArrayList;
        var TouchEvent = egret.TouchEvent;
        var SelectServerMdr = /** @class */ (function (_super) {
            __extends(SelectServerMdr, _super);
            function SelectServerMdr() {
                var _this = _super.call(this, game.Layer.modal) || this;
                _this._view = _this.mark("_view", login.SelectServerView);
                _this.isEasyHide = true;
                return _this;
            }
            SelectServerMdr.prototype.onInit = function () {
                this._proxy = this.retProxy(1 /* Login */);
                this._view.listServer.itemRender = login.ServerItemRender;
                this._view.listServerType.itemRender = login.ServerTypeRender;
            };
            SelectServerMdr.prototype.onShow = function () {
                this._beginItem = null;
                var v = this._view;
                v.x = (v.parent.width - v.width) / 2;
                v.y = (v.parent.height - v.height) / 2;
                var serverIdList = this._proxy.serverIdList;
                serverIdList.sort(function (a, b) { return a - b; });
                var maxServerId = serverIdList[serverIdList.length - 1];
                var serverNum = 20;
                var typeNum = Math.ceil(maxServerId / serverNum);
                var typeList = [{ name: "\u6700\u8FD1\u767B\u5F55" /* RecentLogin */, min: -1, max: -1 }];
                while (typeNum > 0) {
                    var min = (typeNum - 1) * serverNum + 1;
                    var max = typeNum * serverNum;
                    var name = game.StringUtil.substitute("%s-%s\u670D" /* ServerType */, [min, max]);
                    typeList.push({ name: name, min: min, max: max });
                    typeNum--;
                }
                this._view.listServerType.dataProvider = new ArrayList(typeList);
                this._view.listServerType.selectedIndex = 0;
                this.updateServerList(typeList[0]);
            };
            SelectServerMdr.prototype.onHide = function () {
                this._beginItem = null;
                this._view.listServerType.dataProvider.removeAll();
                this._view.listServer.dataProvider.removeAll();
            };
            SelectServerMdr.prototype.addListeners = function () {
                var addEventListener = this.onEgret.bind(this);
                //addEventListener(this._view.listServer, LoginEvent.TAP_SELECT_SERVER, this.onTapServer);
                addEventListener(this._view.listServerType, "tap_server_type" /* TAP_SERVER_TYPE */, this.onTapType);
                addEventListener(this._view.btnClose, TouchEvent.TOUCH_TAP, this.hide);
                //addEventListener(this._view.listServer,TouchEvent.TOUCH_TAP,this.onTapServerTest);
                addEventListener(this._view.listServer, TouchEvent.TOUCH_BEGIN, this.onTapServerBegin);
                addEventListener(this._view.listServer, TouchEvent.TOUCH_END, this.onTapServerEnd);
                addEventListener(this._view.listServer, TouchEvent.TOUCH_CANCEL, this.onTapServerReset);
                addEventListener(this._view.listServer, TouchEvent.TOUCH_MOVE, this.onTapServerReset);
            };
            SelectServerMdr.prototype.onTapType = function (e) {
                this.updateServerList(e.data);
            };
            SelectServerMdr.prototype.onTapServerReset = function (e) {
                this._beginItem = null;
            };
            SelectServerMdr.prototype.onTapServerBegin = function (e) {
                this._beginItem = e.target;
            };
            SelectServerMdr.prototype.onTapServerEnd = function (e) {
                if (this._beginItem == e.target) {
                    this.sendNt("update_current_server" /* UPDATE_CURRENT_SERVER */, e.target.data);
                    this.hide();
                    this._beginItem = null;
                }
            };
            SelectServerMdr.prototype.updateServerList = function (type) {
                var list;
                if (type.min == -1) {
                    list = this._proxy.data.lastServer.concat();
                }
                else {
                    list = [];
                    for (var i = type.max; i >= type.min; i--) {
                        var server = this._proxy.getServerData(i);
                        if (!server) {
                            continue;
                        }
                        list.push(server);
                    }
                }
                if (this._view.listServer.dataProvider == null) {
                    this._view.listServer.dataProvider = new ArrayList(list);
                }
                else {
                    this._view.listServer.dataProvider.source = list;
                }
                this._view.listServer.scrollPos = 0;
            };
            SelectServerMdr.prototype.onTapServer = function (e) {
                var server = e.data;
                if (server == null) {
                    return;
                }
                this.sendNt("update_current_server" /* UPDATE_CURRENT_SERVER */, server);
                this.hide();
            };
            return SelectServerMdr;
        }(Mdr));
        login.SelectServerMdr = SelectServerMdr;
        __reflect(SelectServerMdr.prototype, "game.login.SelectServerMdr");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var login;
    (function (login) {
        var Mdr = base.Mdr;
        var TouchEvent = egret.TouchEvent;
        var TimeMgr = base.TimeMgr;
        var delayCall = base.delayCall;
        var Handler = base.Handler;
        var clearDelay = base.clearDelay;
        var TextEvent = egret.TextEvent;
        var StartMdr = /** @class */ (function (_super) {
            __extends(StartMdr, _super);
            function StartMdr() {
                var _this = _super.call(this, game.Layer.main) || this;
                _this._view = _this.mark("_view", login.StartView);
                _this._tapTick = 0;
                _this._delayId = 0;
                _this._dbgTapCnt = { time: 0, cnt: 0 };
                return _this;
            }
            StartMdr.prototype.onInit = function () {
                this._proxy = this.retProxy(1 /* Login */);
                gzyyou.sdk.loadReport("game_open" /* game_open */);
                this._view.imgAgreeGou.visible = false;
                //不可删除
                gso.updateServerObj = this;
            };
            StartMdr.prototype.onShow = function () {
                ggo.removeVerbose();
                // BgMgr.getIns().setBigBg("bg");
                game.LogUtil.printLogin("资源版本号：" + gso.version);
                game.LogUtil.printLogin("gso.versionDataIsLoaded = " + gso.versionIsLoaded);
                if (!gso.versionIsLoaded) {
                    gso.isRunStartMdr = true;
                    return;
                }
                gso.isRunStartMdr = false;
                var v = this._view;
                v.x = (v.parent.width - v.width) / 2;
                v.y = (v.parent.height - v.height) / 2;
                this.onShowNotice();
                this.updateServerFunc();
                if (gso.showServerAlert) {
                    this.tapSelect();
                    gso.showServerAlert = null;
                }
                this._delayId = delayCall(Handler.alloc(this, function () {
                    console.log("start preload");
                    game.PreloadMgr.startLoad();
                }), 1000);
                this._selectCy = gso.isConsent != 0;
                if (gso.isQQHall) {
                    //新用户第一次登录需要手动勾选，老用户可以默认勾选
                    this._selectCy = !!gso.agreement;
                }
                //this._view.imgLogo.visible = false;//todo,不显示logo
                // if(GameUtil.isShowYszc) {
                //     this._view.imgAgreeDi.visible = true;
                //     this._view.imgAgreeGou.visible = this._selectCy;
                //     this._view.labAgree.visible = true;
                //     this.updateLabAgree();
                // }else {
                //     this._view.imgAgreeDi.visible = false;
                //     this._view.imgAgreeGou.visible = false;
                //     this._view.labAgree.visible = false;
                // }
                this._view.imgAgreeDi.visible = false;
                this._view.imgAgreeGou.visible = false;
                this._view.labAgree.visible = false;
            };
            StartMdr.prototype.onHide = function () {
                gso.updateServerObj = null;
                clearDelay(this._delayId);
            };
            StartMdr.prototype.addListeners = function () {
                var self = this;
                var addEventListener = self.onEgret.bind(self);
                addEventListener(self._view.btnStart, TouchEvent.TOUCH_TAP, self.tapStart);
                addEventListener(self._view.btnSelectServer, TouchEvent.TOUCH_TAP, self.tapSelect);
                addEventListener(self._view.btnSelectServer2, TouchEvent.TOUCH_TAP, self.tapSelect);
                addEventListener(self._view.btnNotice, TouchEvent.TOUCH_TAP, self.tapNotice);
                addEventListener(self._view.imgDbg, TouchEvent.TOUCH_TAP, self.tapDbg);
                addEventListener(self._view.imgLastTag, TouchEvent.TOUCH_TAP, self.tapLastServer);
                addEventListener(self._view.labLastServer, TouchEvent.TOUCH_TAP, self.tapLastServer);
                addEventListener(self._view.btnIdentity, TouchEvent.TOUCH_TAP, self.tapIndetity);
                addEventListener(self._view.imgAgreeDi, TouchEvent.TOUCH_TAP, self.ontongyi);
                addEventListener(self._view.imgAgreeGou, TouchEvent.TOUCH_TAP, self.ontongyi2);
                addEventListener(self._view.labAgree, TextEvent.LINK, this.onTapLink);
                addEventListener(self._view.btnAgeTip, TouchEvent.TOUCH_TAP, self.tapAgeTip);
                self.onNt("show_notice" /* SHOW_NOTICE */, self.onShowNotice, self);
                self.onNt("update_current_server" /* UPDATE_CURRENT_SERVER */, self.updateCurrentServer, self);
                self.onNt("adult_change" /* ADULT_CHANGE */, self.refreshAdultState, self);
                self.onNt("USER_ARGREEMENT_TIP_CONFIRM" /* USER_ARGREEMENT_TIP_CONFIRM */, self.selectCy, self);
            };
            StartMdr.prototype.updateServerFunc = function () {
                if (gso.last_server) {
                    this._proxy.setServerData(gso.last_server.server_id, gso.last_server);
                    this._proxy.setServerData(gso.max_server.server_id, gso.max_server);
                    this.updateView(gso.last_server);
                    this.updateLastView(gso.max_server);
                }
            };
            StartMdr.prototype.updateCurrentServer = function (n) {
                this.updateView(n.body);
            };
            StartMdr.prototype.updateView = function (server) {
                this._server = server;
                this._view.labServer.text = server.name;
                var _str = game.ServerStatusImg[server.status];
                this._view.imgTag.source = _str ? "assets/login/" + _str + ".png" : "";
            };
            StartMdr.prototype.updateLastView = function (server) {
                this._newServer = server;
                this._view.labLastServer.text = server.name;
                var _str = game.ServerStatusImg[server.status];
                this._view.imgLastTag.source = _str ? "assets/login/" + _str + ".png" : "";
                this._view.labLastServer.textColor = game.ServerStatusColor[server.status];
            };
            StartMdr.prototype.tapStart = function (e) {
                if (this._selectCy == false) {
                    this.showView("06" /* Alert */, "请勾选同意用户协议");
                    return;
                }
                var t = egret.getTimer();
                if (this._tapTick == 0 || t - this._tapTick >= 5000) {
                    this._tapTick = t;
                    this._proxy.getServerInfo(this._server.server_id);
                    gzyyou.sdk.loadReport("dengluyouxi_click" /* dengluyouxi_click */);
                }
            };
            StartMdr.prototype.tapSelect = function (e) {
                if (this._proxy.data.gotServerList) {
                    this.showView("02" /* SelectServer */);
                }
                else {
                    this._proxy.getServerList();
                }
            };
            StartMdr.prototype.tapNotice = function (e) {
                this.showView("04" /* NoticePanel */);
            };
            StartMdr.prototype.onShowNotice = function () {
                var a = gso.isNoticeActive == true;
                this._view.btnNotice.visible = a;
                // this._view.btnNotice.visible = true;
                if (a) {
                    this.showView("04" /* NoticePanel */);
                }
            };
            StartMdr.prototype.tapDbg = function () {
                if (gso.islog != 1)
                    return;
                var self = this;
                var t = TimeMgr.time.time;
                if (t - self._dbgTapCnt.time > 5000) {
                    self._dbgTapCnt.cnt = 0;
                }
                self._dbgTapCnt.time = t;
                self._dbgTapCnt.cnt++;
                if (self._dbgTapCnt.cnt >= 5) {
                    self._dbgTapCnt.cnt = 0;
                    var str = "";
                    for (var key in gso.logList) {
                        str += gso.logList[key] + "\n";
                    }
                    this.showView("04" /* NoticePanel */, str);
                }
            };
            StartMdr.prototype.tapLastServer = function () {
                this.updateView(this._newServer);
            };
            StartMdr.prototype.tapIndetity = function (e) {
                var isAdult = gso.is_adult == "1"; //== "1";
                if (isAdult) {
                    this.showView("06" /* Alert */, "您已成功实名认证，无须继续认证");
                    return;
                }
                // 实名认证
                this.showView("09" /* AdultId */);
            };
            StartMdr.prototype.refreshAdultState = function () {
                var is_adult = gso.is_adult == "1"; //&& gso.is_adult == "1";
                this._view.labState.text = is_adult ? "您已完成实名认证" : "请先完成实名认证";
                this._view.labState.textColor = is_adult ? 0x00ff00 : 0xff0000;
                this._view.imgState.source = is_adult ? "lv" : "hong";
            };
            StartMdr.prototype.ontongyi = function (e) {
                this._view.imgAgreeGou.visible = true;
                this._selectCy = true;
            };
            StartMdr.prototype.ontongyi2 = function (e) {
                this._view.imgAgreeGou.visible = false;
                this._selectCy = false;
            };
            StartMdr.prototype.onTapLink = function (e) {
                var txt = e.text;
                //用户协议
                var alertPrivacy = false;
                // if(txt == GameUtil.yhxy) {
                //     //手Q渠道
                //     if(alertPrivacy) {
                //         this.showView(LoginViewType.Privacy,GameUtil.yhxy)
                //     } else{
                //         //yhxxl 云汉仙侠录
                //         ggo.myPolicy("https://image.asgardstudio.cn/static/xieyi.html", 0, 0);
                //     }
                //
                // }
                //隐私政策
                // else if(txt = GameUtil.yszc){
                //     //手Q渠道
                //     if(alertPrivacy) {
                //         this.showView(LoginViewType.Privacy,GameUtil.yszc);
                //     }else {
                //         ggo.myPolicy("https://image.asgardstudio.cn/static/yinsi.html", 0, 0);
                //     }
                // }
            };
            StartMdr.prototype.selectCy = function () {
                this._view.imgAgreeGou.visible = gso.isPrivacy;
                this._selectCy = gso.isPrivacy;
            };
            StartMdr.prototype.tapAgeTip = function () {
                this.showView("04" /* NoticePanel */, "1.\u672C\u6E38\u620F\u662F\u4E00\u6B3E\u653E\u7F6E\u7C7B\u578B\u7684\u4ED9\u4FA0\u6E38\u620F\uFF0C\u9002\u7528\u4E8E\u5E74\u6EE116\u5468\u5C81\u53CA\u4EE5\u4E0A\u7684\u7528\u6237\uFF0C\u5EFA\u8BAE\u672A\u6210\u5E74\u4EBA\u5728\u5BB6\u957F\u7684\u76D1\u62A4\u4E0B\u4F7F\u7528\u8BE5\u6E38\u620F\u4EA7\u54C1\u3002\n\n2.\u672C\u6E38\u620F\u57FA\u4E8E\u56FD\u98CE\u4ED9\u4FA0\u6545\u4E8B\u4E3A\u80CC\u666F\uFF0C\u753B\u9762\u98CE\u683C\u552F\u7F8E\uFF0C\u4EBA\u7269\u548C\u573A\u666F\u4E30\u5BCC\u591A\u6837\uFF0C\u6709\u4E30\u5BCC\u7684\u97F3\u6548\u6765\u70D8\u6258\u6E38\u620F\u6C1B\u56F4\uFF1B\u6E38\u620F\u4E3B\u8981\u73A9\u6CD5\u4E3A\u8DE8\u670D\u97F3\u6280\uFF0C\u9700\u8981\u73A9\u5BB6\u53C2\u4E0E\u591A\u4EBA\u5BF9\u6297\uFF0C\u73A9\u6CD5\u5177\u6709\u4E00\u5B9A\u7684\u7B56\u6027\u4E0E\u8DA3\u5473\u6027\uFF1B\u6E38\u620F\u4E2D\u6709\u57FA\u4E8E\u73A9\u5BB6\u4E0E\u964C\u751F\u4EBA\u804A\u5929\u7684\u793E\u4EA4\u7CFB\u7EDF\uFF0C\u793E\u4EA4\u7CFB\u7EDF\u7684\u7BA1\u7406\u9075\u5FAA\u76F8\u5173\u6CD5\u5F8B\u6CD5\u89C4\u3002\n\n3.\u672C\u6E38\u620F\u4E2D\u6709\u7528\u6237\u5B9E\u540D\u8BA4\u8BC1\u7CFB\u7EDF\uFF0C\u8BA4\u8BC1\u4E3A\u672A\u6210\u5E74\u4EBA\u7684\u7528\u6237\u5C06\u63A5\u53D7\u4EE5\u4E0B\u7BA1\u7406:\u6E38\u620F\u4E2D\u90E8\u5206\u73A9\u6CD5\u548C\u9053\u5177\u9700\u8981\u4ED8\u8D39\uFF0C\u672A\u6EE18\u5468\u5C81\u7684\u7528\u6237\u4E0D\u80FD\u4ED8\u8D39\uFF1B8\u5468\u5C81\u4EE5\u4E0A\u672A\u6EE116\u5468\u5C81\u7684\u672A\u6210\u5E74\u4EBA\u7528\u6237\uFF0C\u5355\u6B21\u5145\u503C\u91D1\u989D\u4E0D\u5F97\u8D85\u8FC750\u5143\u4EBA\u6C11\u5E01\uFF0C\u6BCF\u6708\u5145\u503C\u91D1\u989D\u7D2F\u8BA1\u4E0D\u5F97\u8D85\u8FC7200\u5143\u4EBA\u6C11\u5E01\uFF1B16~18\u5468\u5C81\u4EE5\u4E0A\u7684\u672A\u6210\u5E74\u4EBA\u7528\u6237\uFF0C\u5355\u6B21\u5145\u503C\u91D1\u989D\u4E0D\u5F97\u8D85\u8FC7100\u5143\u4EBA\u6C11\u5E01\uFF0C\u6BCF\u6708\u5145\u503C\u91D1\u989D\u7D2F\u8BA1\u4E0D\u5F97\u8D85\u8FC7400\u5143\u4EBA\u6C11\u5E01\u3002\u672A\u6210\u5E74\u8D26\u53F7\u4EC5\u5728\u5468\u4E94\u3001\u5468\u516D\u3001\u5468\u65E5\u548C\u6CD5\u5B9A\u8282\u5047\u65E5\u768420\u65F6\u81F321\u65F6\u62E5\u67091\u5C0F\u65F6\u6E38\u620F\u65F6\u95F4\u3002\n\n4.\u672C\u6E38\u620F\u4EE5Q\u7248\u4ED9\u4FA0\u4E3A\u4E3B\u9898\uFF0C\u5728\u573A\u666F\u4E2D\u7684\u7ADE\u6280\u6709\u52A9\u4E8E\u953B\u70BC\u73A9\u5BB6\u7684\u72EC\u7ACB\u601D\u8003\u80FD\u529B\u3001\u7A7A\u95F4\u611F\u77E5\u80FD\u529B\u548C\u903B\u8F91\u601D\u7EF4\u80FD\u529B\uFF1B\u9177\u70AB\u7684\u89D2\u8272\u6280\u80FD\u4E0E\u7279\u6548\uFF0C\u5C06\u5E26\u7ED9\u7528\u6237\u826F\u597D\u7684\u89C6\u89C9\u4EAB\u53D7\u4E0E\u6E38\u620F\u4EE3\u5165\u611F\uFF1B\u57FA\u4E8E\u56E2\u961F\u7ADE\u6280\u7684\u534F\u4F5C\u73A9\u6CD5\u53EF\u4EE5\u63D0\u5347\u73A9\u5BB6\u7684\u6C9F\u901A\u80FD\u529B\u3001\u56E2\u961F\u534F\u4F5C\u80FD\u529B\u548C\u5927\u5C40\u89C2\uFF0C\u9F13\u52B1\u73A9\u5BB6\u4E92\u5E2E\u4E92\u52A9\u3001\u7EF4\u6301\u826F\u597D\u7684\u793E\u7FA4\u5173\u7CFB\u3002" /* AgeTips1 */);
            };
            StartMdr.prototype.updateLabAgree = function () {
                var title = game.TextUtil.addLinkHtmlTxt("用户协议", 2330156 /* GREEN */, "yhxy") + "和";
                title += game.TextUtil.addLinkHtmlTxt("隐私政策", 2330156 /* GREEN */, "yszc");
                this._view.labAgree.textFlow =
                    game.TextUtil.parseHtml("\u6211\u5DF2\u9605\u8BFB\u5E76\u540C\u610F" /* AgreeTips */ + title);
            };
            return StartMdr;
        }(Mdr));
        login.StartMdr = StartMdr;
        __reflect(StartMdr.prototype, "game.login.StartMdr");
    })(login = game.login || (game.login = {}));
})(game || (game = {}));
//# sourceMappingURL=login.js.map