namespace game.scene {
    import Pool = base.Pool;

    export class BaseCont extends BaseItem {
        protected _children: BaseItem[];

        constructor() {
            super();
        }

        protected init(): void {
            super.init();
            this._children = [];
        }

        public get numChildren(): number {
            return this._children.length;
        }

        public get children(): BaseItem[] {
            return this._children;
        }

        public add(child: BaseItem): void {
            child.parent = this;
            if (this._children.indexOf(child) < 0) {
                this._children.push(child);
            }
        }

        public remove(child: BaseItem): void {
            if (child.parent == this) {
                let idx: number = this._children.indexOf(child);
                if (idx > -1) {
                    ArrayUtil.removeAt(this._children, idx);
                }
                child.parent = null;
                Pool.release(child);
            }
        }

        public removeAll(): void {
            let n = this._children.length;
            while (n) {
                this.remove(this._children[n - 1]);
                n--;
            }
        }

        public advanceTime(elapseTime: number): void {
            super.advanceTime(elapseTime);
            for (let i: number = 0, n: number = this._children.length; i < n; i++) {
                let child = this._children[i];
                if (child && child.updateEnabled) {
                    try {
                        child.advanceTime(elapseTime);
                    } catch (e) {
                        console.error(egret.getQualifiedClassName(child), e);
                    }
                }
            }
        }

        public onAlloc(): void {
            super.onAlloc();
            this._children.length = 0;
        }

        public onRelease(): void {
            this.removeAll();
            super.onRelease();
        }

    }
}
