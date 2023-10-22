namespace game.scene {
    import Handler = base.Handler;
    import GDirUtil = game.utils.GDirUtil;
    import Pool = base.Pool;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;
    import TimeMgr = base.TimeMgr;
    import EffectSubConfig = game.config.EffectSubConfig;

    export class SkillEffect extends BaseDraw {
        private _bmp: BitmapBase;
        private _ctrl: AnimCtrl;
        private _data:{[key:string]:MergedBmp} ;
        private _dataBit:{[key:string]:number} ;

        private _source: string[];
        private _sourceFrames:{[key:string]:number};

        private _curTimes: number = 0;
        public times: number = 1;
        public duration: number = 0;
        public speed: number = 1;
        private _replayTimeOut = 0;

        private _onDone: Handler;
        private _timeoutTick: number = 0;

        private _removeTimeOut: number = 0;
        private _removeDelay: number = 0;

        private _twList: number[][];
        private _twCnt: number = 0;
        private _twCurTime: number;
        private _twLen: number;

        private _sx: number;
        private _sy: number;

        public groupR: number;

        public layer: number = SceneLayerType.Effect;

        private _isRemove: boolean = false;
        private _setRotation: number;
        private _bmpScaleX: number;

        constructor() {
            super();
            this._data = {};
            this._source = [];
            this._dataBit = {};
            this._sourceFrames = {};
        }

        public playEft(eftId: string, src: string, dir: number, cb?: Handler): void {
            let self = this;
            self._onDone = cb;

            let mirDir = GDirUtil.getMir(dir);
            self._bmpScaleX = dir != mirDir ? -1 : 1;

            if (eftId == GuideLuoJian) {
                self._bmpScaleX = 1;
            }
            self.loadEft(eftId,src);
        }

        public playSkillEft(eftId:string,src: string, rotation: number, eftCfg: EftGroupChildCfg, scaleX?: number,cb?: Handler): void {
            let self = this;
            self._bmpScaleX = scaleX || 1;
            self.times = eftCfg.times != null ? eftCfg.times : 1;
            self.duration = eftCfg.duration != null ? eftCfg.duration : 0;
            self._setRotation = rotation;
            self._removeDelay = +eftCfg.rDelay | 0;
            self.dsp.rotation = +rotation | 0;

            self._onDone = cb;

            self.scaleX = eftCfg.sx != null ? eftCfg.sx : 1;
            self.scaleY = eftCfg.sy != null ? eftCfg.sy : 1;
            if (eftCfg.tw) {
                self._twCnt = 0;
                self._twLen = eftCfg.tw.length;
                self._twList = eftCfg.tw;
                self._sx = self.x;
                self._sy = self.y;
                self._twCurTime = 0;
            }
            self.loadEft(eftId,src);
        }

        private loadEft(eftId:string,src: string) {

            let self = this;
            self.removeCurrent();
            self._isRemove = false;
            self._curTimes = 0;

            self._source = [];
            self._dataBit = {};
            let cfg:EffectSubConfig = getConfigByNameId(ConfigName.EfectSub,eftId);
            if(cfg && cfg.subNumber > 1){
                for(let i = 1;i <= cfg.subNumber;i++){
                    let d = ResUtil.getSkillEftSubUrl(eftId,i);
                    self._source.push(d);
                    this._dataBit[d] = 0;
                }
            }else{
                self._source.push(src);
                this._dataBit[src] = 0;
            }

            let preFrames = 0;
            for(let i = 0; i < self._source.length;i++){
                let srcSub = self._source[i];
                this._sourceFrames[srcSub] = preFrames;
                LoadMgr.ins.addRef(srcSub);
                let durList: number[] = LoadMgr.ins.getAnimDur(srcSub);
                if (durList) {
                    let t: number = 0;
                    for (let i = 0, n = durList.length; i < n; i++) {
                        t += durList[i];
                    }

                    if(i == 0){
                        self._timeoutTick = TimeMgr.time.time + t * self.times + 100;
                    }else{
                        self._timeoutTick += t * self.times + 100;
                    }
                    preFrames += durList.length;
                }

                //LoadMgr.ins.loadMerge(srcSub, Handler.alloc(self, self.initCtrl), LoadPri.Scene);
                LoadMgr.ins.loadMerge(srcSub, Handler.alloc(self, self.oneLoaded), LoadPri.Scene);
            }
        }

        private removeCurrent() {
            let self = this;
            if (self._ctrl) {
                self._ctrl.stop();
            }

            self._data = {};
            for(let i = 0; i < self._source.length; i++){
                LoadMgr.ins.decRef(self._source[i]);
            }
            self._source = [];

            if (self._bmp) {
                self._bmp.texture = null;
                self._bmp.scaleX = self._bmp.scaleY = 1;
            }
        }

        private oneLoaded(data: MergedBmp, url: string):void{

            this._dataBit[url] = data.numFrames;
            this._data[url] = data;
            let ret = true;
            for(let k in this._dataBit){
                let d = this._dataBit[k];
                if(!d){
                    ret = false;
                    break;
                }
            }

            if(ret){
                for(let i = 0; i < this._source.length;i++){
                    let u = this._source[i];
                    this.initCtrl(this._data[u],u);
                }
            }
        }

        private initCtrl(data: MergedBmp, url: string): void {
            let self = this;
            if (self._source.indexOf(url) < 0 ) {
                return;
            }

            self._data[url] = data;
            let durList = [];
            for (let i: number = 0, n: number = data.numFrames; i < n; i++) {
                durList.push(data.getVal(i, "dur"));
            }

            let isStart = self._source[0] == url;
            self._ctrl.init(durList, url, self.speed,true,isStart);

            if(isStart){
                self._ctrl.loop = false;
                self._bmp.scaleY = data.scale;
                self._bmp.scaleX = data.scale * self._bmpScaleX;
            }

            let index = self._source.length-1;
            if(self._source[index] == url){
                self.onFrameChange(0,self._source[0]);
            }
        }

        private onComplete() {
            let self = this;
            self._curTimes++;
            if (self.times <= 0 || self._curTimes < self.times) {
                if (self.duration > 0) {
                    self._bmp.texture = null;
                    self._replayTimeOut = delayCall(Handler.alloc(self, self.replay), self.duration);
                } else {
                    self.replay();
                }
            } else {
                self.removeSelf();
            }
        }

        private replay() {
            this._ctrl.curFrame = 0;
            this._ctrl.play();
        }

        private removeSelf() {
            let self = this;
            if (self._isRemove) {
                return;
            }
            self._isRemove = true;
            if (self._removeDelay > 0) {
                self._removeTimeOut = base.delayCall(Handler.alloc(self, self.onRemoveTimeOut), self._removeDelay);
            } else {
                self.onRemoveTimeOut();
            }
        }

        private onRemoveTimeOut() {
            let self = this;
            if (self._onDone) {
                self._onDone.exec(this);
            }
            this.dispose();
        }

        public advanceTime(elapseTime: number): void {
            super.advanceTime(elapseTime);
            let self = this;
            if (self.times > 0 && TimeMgr.time.time >= self._timeoutTick) {
                self.removeSelf();
                return;
            }

            self._ctrl.advanceTime(elapseTime);

            if (self._twCurTime != null) {
                self._twCurTime += elapseTime;
            }
            if (self._twList && self._twCnt < self._twLen) {
                let preFrame = self._twCnt;
                let tw: number[] = self._twList[self._twCnt]; //[time,x,y,scaleX,scaleY,rotation,alpha]
                while (self._twCurTime > tw[0]) {
                    self._twCnt++;
                    if (self._twCnt == self._twLen) {
                        return;
                    }
                    tw = self._twList[self._twCnt];
                }
                if (preFrame != self._twCnt) {
                    let r = self.groupR;
                    let needR = r != 0 && r != null;
                    let x = (needR ? tw[1] * Math.cos(r) - tw[2] * Math.sin(r) : tw[1]) * self._bmpScaleX;
                    let y = needR ? tw[1] * Math.sin(r) + tw[2] * Math.cos(r) : tw[2];
                    // x = tw[1];
                    // y = tw[2];
                    self.x = self._sx + x;
                    self.y = self._sy + y;
                    self.scaleX = tw[3];
                    self.scaleY = tw[4];

                    if(self._setRotation == 0){
                        self.dsp.rotation = tw[5];
                    }
                    //self.dsp.rotation = tw[5] + self._setRotation;
                    self.alpha = tw[6];
                }
            }
        }

        private onFrameChange(frame: number,url:string) {
            if (frame == null) {
                console.error("SkillEffect onFrameChange error!");
                return;
            }
            let self = this;
            if (self._data) {
                let  tframe = frame - this._sourceFrames[url];
                self._data[url].drawTo(self._bmp, tframe, self._bmpScaleX);
            }
        }

        protected initDsp(): void {
            super.initDsp();
            this._bmp = <BitmapBase>this.dsp.addChild(Pool.alloc(BitmapBase));
        }

        public onAlloc(): void {
            super.onAlloc();
            let self = this;
            self._ctrl = Pool.alloc(AnimCtrl);
            self._ctrl.compHandler = Handler.alloc(self, self.onComplete);
            self._ctrl.changeHandler = Handler.alloc(self, self.onFrameChange);
            self._bmpScaleX = 1;
        }

        public onRelease(): void {
            let self = this;
            self._isRemove = false;
            self.removeCurrent();
            clearDelay(self._replayTimeOut);
            self._replayTimeOut = 0;
            self._timeoutTick = 0;
            clearDelay(self._removeTimeOut);
            self._removeTimeOut = 0;
            self._twCnt = 0;
            self._twLen = null;
            self._twList = null;
            self._twCurTime = null;
            self.groupR = null;
            self._removeDelay = 0;
            self.x = 0;
            self.y = 0;
            self.scaleX = 1;
            self.scaleY = 1;
            self.alpha = 1;
            self.dsp.rotation = 0;
            self._setRotation = 0;
            Pool.release(self._ctrl);
            self._ctrl = null;
            Pool.release(self._onDone);
            self._onDone = null;
            self._curTimes = 0;
            self.times = 1;
            self.duration = 0;
            self.speed = 1;
            self._dataBit = {};
            this._sourceFrames = {};
            self.layer = SceneLayerType.Effect;
        }
    }
}
