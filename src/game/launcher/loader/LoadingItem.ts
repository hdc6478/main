/** @internal */ namespace game {
    import PoolObject = base.PoolObject;
    import Handler = base.Handler;
    import Pool = base.Pool;

    export class LoadingItem implements PoolObject {
        public priority: number;
        public errCnt: number;
        public mergedBmp: MergedBmp;

        /** @internal */ private _loader: ResLdr;
        /** @internal */ private _url: string;
        /** @internal */ private _type: string;
        /** @internal */ private _succHandler: Handler[];
        /** @internal */ private _failHandler: Handler[];
        /** @internal */ private _running: boolean;

        public get type(): string {
            return this._type;
        }

        public get url(): string {
            return this._url;
        }

        public set url(value: string) {
            this._url = value;
            if (value) {
                this._type = getResType(getUrlExt(value));
            } else {
                this._type = null;
            }
        }

        public get loader(): ResLdr {
            return this._loader;
        }

        public set loader(value: ResLdr) {
            if (value == null) {
                if (this._loader) {
                    Pool.release(this._loader);
                }
            }
            this._loader = value;
        }

        public get running(): boolean {
            return this._running;
        }

        public addSucc(handler: Handler): void {
            this.addToList(handler, this._succHandler);
        }

        public addFail(handler: Handler): void {
            this.addToList(handler, this._failHandler);
        }

        public onSucc(data: any): void {
            this.callList(this._succHandler, [data, this._url]);
        }

        public onFail(): void {
            this.callList(this._failHandler, [null,this._url]);
        }

        /** @internal */ private addToList(handler: Handler, list: Handler[]): void {
            if (handler == null) {
                return;
            }
            if (list.indexOf(handler) > -1) {
                return;
            }
            for (let h of list) {
                if (Handler.equal(handler, h)) {
                    Pool.release(handler);
                    return;
                }
            }
            list.push(handler);
        }

        /** @internal */ private callList(list: Handler[], data: any = null): void {
            this._running = true;
            for (let h of list) {
                h.exec(data);
                Pool.release(h);
            }
            list.length = 0;
            this._running = false;
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
            this.errCnt = 0;
            this._running = false;
            this._succHandler = [];
            this._failHandler = [];
        }

        public onRelease(): void {
            let self = this;
            self.mergedBmp = null;
            self.loader = null;
            self.errCnt = 0;
            self._running = false;
            self._url = null;
            self._type = null;
            let h;
            if (self._succHandler) {
                for (h of self._succHandler) {
                    Pool.release(h);
                }
                self._succHandler = undefined;
            }
            if (self._failHandler) {
                for (h of self._failHandler) {
                    Pool.release(h);
                }
                self._failHandler = undefined;
            }
        }

    }

}
