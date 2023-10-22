/** @internal */ namespace uilib {
    import EventDispatcher = egret.EventDispatcher;
    import PoolObject = base.PoolObject;
    import Event = egret.Event;

    export class ArrayList extends EventDispatcher implements PoolObject {
        protected _source: any[];

        constructor(source?: any[]) {
            super();
            if (source) {
                this.source = source;
            }
        }

        public onAlloc(): void {
            this._source = [];
        }

        public onRelease(): void {
            if (this._source) {
                this._source.length = 0;
            }
            this._source = null;
        }

        public dispose(): void {
            this.onRelease();
        }

        public get length(): number {
            return this._source.length;
        }

        public set source(value: any[]) {
            let self = this;
            if (value && value != self._source) {
                self._source = value;
                self._internalDispatch(self.newEvent(ListDataEvent.REFRESH));
            }
        }

        public get source(): any[] {
            return this._source;
        }

        public addItemAt(item: any, index: number): void {
            if (index < 0 || index > this.length) {
                throw new RangeError("[ArrayList]位置 " + index + " 越界。");
            }
            this._source.splice(index, 0, item);
            this._internalDispatch(this.newEvent(ListDataEvent.ADD, index, item));
        }

        public addItem(item: any): void {
            this.addItemAt(item, this.length);
        }

        public getItemAt(index: number): any {
            if (index < 0 || index >= this.length) {
                throw new RangeError("[ArrayList]位置 " + index + " 越界。");
            }
            return this._source[index];
        }

        public getItemIndex(item: any): number {
            return this._source.indexOf(item);
        }

        public removeItemAt(index: number): void {
            if (index < 0 || index >= this.length) {
                throw new RangeError("[ArrayList]位置 " + index + " 越界。");
            }
            let item: any = this._source.splice(index, 1)[0];
            this._internalDispatch(this.newEvent(ListDataEvent.REMOVE, index, item));
        }

        public removeItem(item: any): void {
            let index: number = this.getItemIndex(item);
            if (index > -1) {
                this.removeItemAt(index);
            }
        }

        public addItemArray(array: any[]): void {
            let index: number = this.length - 1;
            for (let item of array) {
                this._source.push(item);
            }
            this._internalDispatch(this.newEvent(ListDataEvent.ADDARRAY, index, array));
        }

        public itemUpdated(index: number): void {
            if (index < 0 || index >= this.length) {
                throw new RangeError("[ArrayList]位置 " + index + " 越界。");
            }
            this._internalDispatch(this.newEvent(ListDataEvent.UPDATE, index, this.getItemAt(index)));
        }

        public setItemAt(item: any, index: number): void {
            if (index < 0 || index >= this.length) {
                throw new RangeError("[ArrayList]位置 " + index + " 越界。");
            }
            this._source[index] = item;
            this._internalDispatch(this.newEvent(ListDataEvent.UPDATE, index, item));
        }

        public removeAll(): void {
            this._source.splice(0, this.length);
            this._internalDispatch(this.newEvent(ListDataEvent.CLEAR));
        }

        protected _internalDispatch(e: Event): void {
            this.dispatchEvent(e);
        }

        private newEvent(type: string, index?: number, data?: any): ListDataEvent {
            let e: ListDataEvent = Event.create(ListDataEvent, type);
            e.index = index;
            e.data = data;
            return e;
        }

    }
}
