namespace game.scene {
    import DisplayObjectContainer = egret.DisplayObjectContainer;

    export class BaseDraw extends BaseCont {
        protected _dsp: DisplayObjectContainer;

        constructor() {
            super();
        }

        protected init(): void {
            super.init();
            this.initDsp();
        }

        protected initDsp() {
            this._dsp = new DisplayObjectContainer();
            this._dsp.name = "BaseDraw";
        }

        public get dsp(): DisplayObjectContainer {
            return this._dsp;
        }

        public set dsp(value: DisplayObjectContainer) {
            this._dsp = value;
        }

        public add(child: BaseItem): void {
            super.add(child);
            if (child instanceof BaseDraw) {
                child.dsp.visible = true;
                this.addDsp(child);
            }
        }

        protected addDsp(child: BaseDraw): void {
            this._dsp.addChild(child.dsp);
        }

        public remove(child: BaseItem): void {
            if (child.parent != this) {
                return;
            }
            if (child instanceof BaseDraw) {
                this.removeDsp(child);
            }
            super.remove(child);
        }

        protected removeDsp(child: BaseDraw): void {
            if (child.dsp.parent) {
                child.dsp.parent.removeChild(child.dsp);
            }
        }

        public get x(): number {
            return this._dsp.x;
        }

        public set x(value: number) {
            this._dsp.x = value;
        }

        public get y(): number {
            return this._dsp.y;
        }

        public set y(value: number) {
            if (this._dsp.y == value) {
                return;
            }
            this._dsp.y = value;
        }

        public set alpha(value: number) {
            this._dsp.alpha = value;
        }

        public get alpha(): number {
            return this._dsp.alpha;
        }

        public set scale(value: number) {
            this.scaleX = this.scaleY = value;
        }

        public get scale(): number {
            return this.scaleX;
        }

        public set scaleX(value: number) {
            this._dsp.scaleX = value;
        }

        public get scaleX(): number {
            return this._dsp.scaleX;
        }

        public get scaleY(): number {
            return this._dsp.scaleY;
        }

        public set scaleY(value: number) {
            this._dsp.scaleY = value;
        }

        public onAlloc(): void {
            super.onAlloc();
            this.alpha = 1;
            this.scale = 1;
        }

        public onRelease(): void {
            this._dsp.visible = true;
            super.onRelease();
        }

    }

}
