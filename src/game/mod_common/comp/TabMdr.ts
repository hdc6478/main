namespace game.mod {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Handler = base.Handler;
    import List = eui.List;
    import Event = egret.Event;
    import Pool = base.Pool;

    export class TabMdr implements MdrTab {
        public condCheck: Handler;
        public changeHandler: Handler;
        public params: any;

        private _owner: ModBase;
        private _parent: DisplayObjectContainer;
        private _mdrClsList: MdrClsList;
        private _selectIndex: number = -1;
        private _mdrInstList: MdrBase[];

        private _btnList: List;

        constructor(m: ModBase, p: DisplayObjectContainer, list?: MdrClsList) {
            this._owner = m;
            this._parent = p;
            this._mdrClsList = list;
            if (list) {
                this._mdrInstList = new Array(list.length);
            }
        }

        public set mdrClsList(value: MdrClsList) {
            if (!this._mdrInstList) {
                this._mdrClsList = value;
                this._mdrInstList = new Array(value.length);
                return;
            }
            //this.hideCurMdr();//设置mdr列表的时候，不清除当前选中的分页，防止中途开启新分页时候，刷新显示异常
            let i: number, n: number, m: MdrBase;
            for (i = 0 , n = value.length; i < n; i++) {
                m = i < this._mdrInstList.length ? this._mdrInstList[i] : null;
                if (m && m.constructor !== value[i]) {
                    this._mdrInstList[i] = null;
                    m.dispose();
                }
            }
            for (i = value.length, n = this._mdrInstList.length; i < n; i++) {
                m = this._mdrInstList[i];
                if (m) {
                    this._mdrInstList[i] = null;
                    m.dispose();
                }
            }

            this._mdrClsList = value;
            this._mdrInstList.length = value.length;
        }

        public get mdrClsList(): MdrClsList {
            return this._mdrClsList;
        }

        public get btnList(): eui.List {
            return this._btnList;
        }

        public set btnList(value: eui.List) {
            this._btnList = value;
        }

        public get selectIndex(): number {
            return this._selectIndex;
        }

        public set selectIndex(value: number) {
            let self = this;
            // if (value == self._selectIndex) { //2级wnd使用 透传
            //     return;
            // }
            if (self.condCheck && !self.condCheck.exec(value)) {
                return;
            }
            if (!self._mdrClsList || self._mdrClsList.length == 0) {
                return;
            }
            self.hideCurMdr();
            self._selectIndex = value;
            self._btnList.selectedIndex = value;

            let mdr: MdrBase = self._mdrInstList[value];
            if (!mdr) {
                let t = self._mdrClsList[value];
                if (null == t) {
                    return;
                }
                self._mdrInstList[value] = mdr = new t(self._parent);
                mdr.$setOwner(self._owner);
            }
            mdr.show(self.params);

            if (self.changeHandler) {
                self.changeHandler.exec();
            }

            let group: eui.Group = self._parent["moveArea"];
            if (group) {
                self._parent.setChildIndex(group, self._parent.numChildren - 1)
            }
        }

        public show(): void {
            let self = this;
            if (self._btnList) {
                self._btnList.addEventListener(Event.CHANGE, self.onBtnSelected, self);
                self._btnList.addEventListener(Event.CHANGING, self.onBtnChanging, self);
            }
        }

        public hide(): void {
            let self = this;
            self.hideCurMdr();
            if (self._btnList) {
                self._btnList.removeEventListener(Event.CHANGE, self.onBtnSelected, self);
                self._btnList.removeEventListener(Event.CHANGING, self.onBtnChanging, self);
            }
        }

        public hideCurMdr(): void {
            let self = this;
            if (self._selectIndex != -1 && self._mdrInstList[self._selectIndex]) {
                self._mdrInstList[self._selectIndex].hide();
            }
            self._selectIndex = -1;
        }

        private onBtnSelected(e: Event): void {
            //跳转时候params不为空，切换tab时应该把params清空
            this.params = undefined;
            this.selectIndex = this._btnList.selectedIndex;
        }

        private onBtnChanging(e: Event): void {
            let res = true;
            if (this.condCheck) {
                res = this.condCheck.exec(this._btnList.selectedIndex);
            }
            if (!res) {
                e.preventDefault();
            }
        }

        public dispose(): void {
            let self = this;
            self.hide();
            Pool.release(self.condCheck);
            self.condCheck = undefined;
            Pool.release(self.changeHandler);
            self.changeHandler = undefined;
            self._owner = undefined;
            self._parent = undefined;
            self._mdrClsList = undefined;
            if (self._mdrInstList) {
                for (let m of self._mdrInstList) {
                    if (m) {
                        m.dispose();
                    }
                }
            }
            self._mdrInstList = undefined;
            self._btnList = undefined;
            self.params = undefined;
        }

    }

}
