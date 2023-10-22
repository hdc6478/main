namespace game {
    import Handler = base.Handler;
    import Pool = base.Pool;
    import PoolObject = base.PoolObject;
    import ObjBase = base.ObjBase;

    export class ResExt extends ObjBase implements PoolObject {
        private _groups: string[];

        private _onComp: Handler;
        private _total: number;
        private _loaded: number;

        private load(groups: string[], onComp: Handler): void {
            this._groups = groups;
            this._onComp = onComp;
            this._total = groups.length;
            this._loaded = 0;

            for (let g of groups) {
                AssetsMgr.ins.loadGroup(g, Handler.alloc(this, this.onGroupCom));
            }
        }

        private onGroupCom(name: string): void {
            let idx: number = this._groups.indexOf(name);
            if (idx > -1) {
                this._loaded++;
            }
            if (this._loaded == this._total) {
                let h = this._onComp;
                this._onComp = undefined;
                if (h) {
                    h.exec(this);
                    Pool.release(h);
                }
                Pool.release(this);
            }
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            this._groups = undefined;
            this._loaded = 0;
            this._total = 0;
            if (this._onComp) {
                Pool.release(this._onComp);
            }
            this._onComp = undefined;
        }

        private static _listMap: { [key: number]: Handler } = {};

        public static loadGroupList(groups: string[], onComp: Handler): void {
            let self = ResExt;
            let r = Pool.alloc(ResExt);
            self._listMap[r.hashCode] = onComp;
            r.load(groups, Handler.alloc(self, self.onListComp));
        }

        private static onListComp(r: ResExt): void {
            let k = r.hashCode;
            let h = this._listMap[k];
            this._listMap[k] = null;
            delete this._listMap[k];
            if (h) {
                h.exec();
                Pool.release(h);
            }
        }

    }
}
