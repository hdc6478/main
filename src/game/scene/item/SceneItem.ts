namespace game.scene {
    import Pool = base.Pool;
    import Handler = base.Handler;

    export class SceneItem extends BaseDraw {
        protected _ctrl: AnimCtrl;
        private _bmp: BitmapBase;
        private _data: MergedBmp;
        private _src: string;

        onAlloc() {
            super.onAlloc();
            let self = this;
            self._ctrl = Pool.alloc(AnimCtrl);
            self._ctrl.changeHandler = Handler.alloc(self, self.onFrame);
            self._bmp = Pool.alloc(BitmapBase);
            self.dsp.addChild(self._bmp);
        }

        public get src() {
            return this._src;
        }

        public set src(value: string) {
            let self = this;
            if (value == null) {
                return;
            }
            if (self._src == value && self._data && self._data.isLoaded) {
                self.onLoadComplete(self._data, value);
            } else {
                self.removeCurrent();
                LoadMgr.ins.addRef(value);
                self._src = value
                LoadMgr.ins.loadMerge(self.src, Handler.alloc(self, self.onLoadComplete), LoadPri.Scene);
            }
        }

        private onLoadComplete(data: MergedBmp, url: string): void {
            let self = this;
            if (url != self._src) {
                return;
            }
            self._data = data;
            self._bmp.scaleX = data.scale;
            self._bmp.scaleY = data.scale;
            let durList = [];
            for (let i: number = 0, n: number = data.numFrames; i < n; i++) {
                durList.push(data.getVal(i, "dur"));
            }
            self.onPartLoadCfg(durList, url)
            self.onFrame(0);
        }

        public onFrame(frame: number): void {
            let self = this;
            if (!self._data || !self._data.isLoaded) {
                return;
            }
            self._data.drawTo(self._bmp, frame);
        }

        private removeCurrent(): void {
            let self = this;
            LoadMgr.ins.decRef(self._src);
            self._data = undefined;
            self._src = undefined;
            if (self._bmp) {
                self._bmp.texture = null;
                self._bmp.scaleX = self._bmp.scaleY = 1;
            }
        }

        private onPartLoadCfg(duration: number[], url: string): void {
            this._ctrl.init(duration, url);
            this._ctrl.loop = true;
        }


        advanceTime(elapseTime: number) {
            super.advanceTime(elapseTime);
            let self = this;
            if (self._ctrl) {
                self._ctrl.advanceTime(elapseTime);
            }
        }

        onRelease() {
            super.onRelease();
            let self = this;
            Pool.release(self._ctrl);
            self._ctrl = null;
            self.removeCurrent();
            if (self._bmp && self._bmp.parent) {
                self._bmp.parent.removeChild(self._bmp);
            }
            Pool.release(self._bmp);
            self._bmp = null;
        }
    }
}