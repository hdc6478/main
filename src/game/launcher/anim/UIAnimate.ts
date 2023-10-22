namespace game {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import Time = base.Time;
    import UpdateItem = base.UpdateItem;
    import PoolObject = base.PoolObject;
    import Handler = base.Handler;
    import TimeMgr = base.TimeMgr;
    import Pool = base.Pool;

    export class UIAnimate extends DisplayObjectContainer implements UpdateItem, PoolObject {
        private _bmp: BitmapBase;
        private _scaleXBmp: BitmapBase;
        private _scaleXBmpOffX:number = 0;
        private _ctrl: AnimCtrl;
        private _data: MergedBmp;

        private _source: string;
        private _rate: number;
        private _failTimes: number;

        private _curTimes: number = 0;

        public times: number = 0;
        public complete: Handler;
        public id: number;
        public id2: number;//双重坐骑用
        public speed: number = 1;
        public _playing: boolean = true;

        constructor() {
            super();
            this.touchEnabled = this.touchChildren = false;
            this.name = "UIAnimate";
            this.init();
        }

        private init(): void {
            this._bmp = <BitmapBase>this.addChild(Pool.alloc(BitmapBase));
        }

        public load(source: string, frameRate: number = 12, isFailBack: boolean = false,
                    isMirror:boolean = false,scaleXBmpOffX:number = 0) {
            let self = this;
            if (self._source == source) {
                return;
            }

            if(isMirror && !this._scaleXBmp){
                this._scaleXBmp = <BitmapBase>this.addChild(Pool.alloc(BitmapBase));
                self._scaleXBmp.scaleX = -1;
                self._scaleXBmpOffX = scaleXBmpOffX;
            }

            self.removeCurrent();
            self._failTimes = 0;
            self._source = source;
            self._rate = frameRate;
            self._playing = true;
            LoadMgr.ins.addRef(source);
            LoadMgr.ins.loadMerge(source, Handler.alloc(self, self.onLoaded), LoadPri.UI, frameRate);
        }

        private onLoaded(data: MergedBmp, url: string): void {
            if (this._source != url || !data) {
                return;
            }
            let self = this;
            self._bmp.scaleX = self._bmp.scaleY = data.scale;
            self._data = data;
            let durList = [];
            for (let i: number = 0, n: number = data.numFrames; i < n; i++) {
                durList.push(data.getVal(i, "dur"));
            }
            self._ctrl.init(durList, url, self.speed);
            self._ctrl.loop = false;
            if (self._playing) {
                self.play();
            } else {
                self.stop();
            }
            self.onFrameChange(0);
        }

        private removeCurrent(): void {
            let self = this;
            self._data = undefined;
            LoadMgr.ins.decRef(self._source);
            self._source = undefined;
            self._rate = undefined;
            self._failTimes = undefined;
            self.stop();
            self._bmp.texture = null;
            if(self._scaleXBmp){
                self._scaleXBmp.texture = null;
                self._bmp.scaleX = -1;
            }
            self._bmp.scaleX = self._bmp.scaleY = 1;
        }

        public play(): void {
            let self = this;
            self._playing = true;
            if (self._ctrl) self._ctrl.play();
            this._curTimes = 0;
            TimeMgr.addUpdateItem(self);
        }

        public stop(): void {
            let self = this;
            self._playing = false;
            if (self._ctrl) self._ctrl.stop();
            TimeMgr.removeUpdateItem(self);
        }

        public get bmp():BitmapBase{
            return this._bmp;
        }

        public get playing() {
            return this._playing;
        }

        public update(time: Time) {
            this._ctrl.advanceTime(TimeMgr.getElapseTime(this));
        }

        private onFrameChange(frame: number) {
            this._data.drawTo(this._bmp, frame);
            if(this._scaleXBmp){
                this._data.drawTo(this._scaleXBmp, frame);
                this._scaleXBmp.x *= -1;
                this._scaleXBmp.x += this._scaleXBmpOffX;
            }
        }

        private onComplete() {
            let self = this;
            self._curTimes++;
            if (self.times <= 0 || self._curTimes < self.times) {
                self._ctrl.curFrame = 0;
                self._ctrl.play();
            } else {
                if (self.complete) {
                    self.complete.exec(self);
                }
            }
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
            let self = this;
            self._ctrl = Pool.alloc(AnimCtrl);
            self._ctrl.compHandler = Handler.alloc(self, self.onComplete);
            self._ctrl.changeHandler = Handler.alloc(self, self.onFrameChange);
        }

        public onRelease(): void {
            let self = this;
            self.removeCurrent();
            Pool.release(self.complete);
            self.times = 0;
            self.alpha = 1;
            self.scaleX = self.scaleY = 1;
            self.complete = undefined;
            self.speed = 1;
            Pool.release(self._ctrl);
            self._ctrl = undefined;
            self._playing = true;
            this._scaleXBmp = null;
            self.anchorOffsetX = 0;
            self.rotation = 0;
            self._bmp.width= NaN;
        }
    }
}
