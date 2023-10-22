namespace game.scene {
    import ObjBase = base.ObjBase;
    import PoolObject = base.PoolObject;

    export class BaseItem extends ObjBase implements PoolObject {
        private _parent: BaseCont;

        protected _isInit: boolean = false;
        protected _updateEnabled: boolean = false;

        constructor() {
            super();
        }

        public set parent(value: BaseCont) {
            if (this._parent == value) {
                return;
            }
            this._parent = value;
            if (this._parent) {
                this.onAdded();
            }
        }

        public get parent(): BaseCont {
            return this._parent;
        }

        public get updateEnabled(): boolean {
            return this._updateEnabled;
        }

        public set updateEnabled(value: boolean) {
            this._updateEnabled = value;
        }

        protected init(): void {
            this._isInit = true;
            this._updateEnabled = true;
        }

        public dispose(): void {
            // this.onRelease();
            if (this.parent) {
                this.parent.remove(this);
            }
        }

        public onAlloc(): void {
            if (!this._isInit) {
                this.init();
            }
        }

        public onRelease(): void {
            if (this._parent) {
                this._parent.remove(this);
                return;
            }
        }

        public advanceTime(elapseTime: number): void {
        }

        protected onAdded(): void {
        }

    }
}
