namespace game.scene {
    import Pool = base.Pool;
    import Handler = base.Handler;
    import DisplayObjectContainer = egret.DisplayObjectContainer;

    export class BaseTitle extends BaseDraw {

        constructor() {
            super();
        }

        protected _titleBmp: BitmapBase;
        private group: DisplayObjectContainer;
        private _width: number;
        private _height: number;
        private _ctrl: AnimCtrl;
        private _data: MergedBmp;
        private _src: string;

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            let self = this;
            self._height = value;
            self.dsp.height = value;
        }

        protected initDsp(): void {
            super.initDsp();
            let self = this;
            let g: DisplayObjectContainer = new DisplayObjectContainer();
            self.group = self.dsp.addChild(g) as DisplayObjectContainer;
            self._titleBmp = <BitmapBase>self.group.addChild(Pool.alloc(BitmapBase));
            // this.height = 27;
        }

        public setTitle(src: string): void {
            let self = this;
            src = src.replace(".png", "");
            if (self._src == src) {
                return;
            }
            self.removeCurrent();
            self._src = src;
            LoadMgr.ins.addRef(src);
            LoadMgr.ins.loadMerge(src, Handler.alloc(self, self.onLoaded), LoadPri.Scene);
        }

        private onLoaded(data: MergedBmp, url: string): void {
            let self = this;
            if (self._src != url || self.parent == null) {
                return;
            }
            self._data = data;
            let durList = [];
            for (let i: number = 0, n: number = data.numFrames; i < n; i++) {
                durList.push(data.getVal(i, "dur"));
            }
            if (self._ctrl) {
                self._ctrl.init(durList, url);
                self._ctrl.loop = true;
                self._ctrl.play();
                self.onFrameChange(0);
                self.width = 0;
                self.height = 70;
                self.group.y = self.height / 2;
                (<HeadMgr>self.parent).sort = true;
            }
        }

        private removeCurrent(): void {
            let self = this;
            self._data = undefined;
            LoadMgr.ins.decRef(self._src);
            self._src = undefined;
            if (self._ctrl) {
                self._ctrl.stop();
            }
            self._titleBmp.texture = null;
        }

        public advanceTime(elapseTime: number): void {
            super.advanceTime(elapseTime);
            let self = this;
            if (self._ctrl) {
                self._ctrl.advanceTime(elapseTime);
            }
        }

        private onFrameChange(frame: number) {
            this._data.drawTo(this._titleBmp, frame);
        }

        public onAlloc(): void {
            super.onAlloc();
            let self = this;
            self._ctrl = Pool.alloc(AnimCtrl);
            self._ctrl.changeHandler = Handler.alloc(self, self.onFrameChange);
        }

        public onRelease(): void {
            super.onRelease();
            let self = this;
            self.removeCurrent();
            Pool.release(self._ctrl);
            self._ctrl = undefined;
            self._titleBmp.source = null;
        }
    }
}
