namespace game {
    import Handler = base.Handler;
    import Pool = base.Pool;
    import ObjBase = base.ObjBase;
    import PoolObject = base.PoolObject;

    export class AnimCtrl extends ObjBase implements PoolObject {
        private _url: {[key:number]:string};
        private _durations: number[] = [];
        private _startTimes: number[] = [];

        private _curFrame: number;
        private _playing: boolean;
        private _loop: boolean;

        private _curTime: number;
        private _totalTime: number;
        private _finalFrame: number;

        private _speed: number = 1;

        private _compHandler: Handler;
        public set compHandler(value: Handler) {
            Pool.release(this._compHandler);
            this._compHandler = value;
        }

        private _changeHandler: Handler;
        public set changeHandler(value: Handler) {
            Pool.release(this._changeHandler);
            this._changeHandler = value;
        }

        public init(durations: number[], url: string, speed: number = 1,isLoop:boolean = true,isStart:boolean = true): void {
            let self = this;
            if(!self._url){
                self._url = {};
            }

            if(isStart){

                self._finalFrame = durations.length - 1;
                self._totalTime = 0;
                self._durations.length = 0;
                self._startTimes.length = 0;
                self._curFrame = 0;
                self._curTime = 0;
                self._playing = true;
                self._loop = isLoop;
                self._speed = speed;

                //≤‚ ‘
                // self._durations.push(1);
                // self._startTimes.push(1);
                // self._finalFrame = 0;
                // self._finalFrame += durations.length- 1;

            }else{
                self._finalFrame += durations.length;
            }

            let startIndex = self._durations.length;
            for (let i: number = 0, n: number = durations.length; i < n; i++) {
                let dur = durations[i];
                self._durations[startIndex] = dur;
                self._startTimes[startIndex] = self._totalTime;
                self._totalTime += dur;

                if(!self._url[url]){
                    self._url[startIndex] = url;
                }

                startIndex++;
            }
        }

        public set curFrame(value: number) {
            let self = this;
            self._curFrame = value;
            self._curTime = 0;

            for (let i: number = 0; i < value; i++) {
                self._curTime += self._durations[i];
            }

            self.onFrameChange();
        }

        public get curFrame(): number {
            return this._curFrame;
        }

        public set loop(value: boolean) {
            this._loop = value;
        }

        public get loop(): boolean {
            return this._loop;
        }

        public get isPlaying(): boolean {
            return this._playing;
        }

        public get isComplete(): boolean {
            let self = this;
            if (isNaN(self._totalTime) || isNaN(self._curTime)) {
                return false;
            }
            return !self._loop && self._curTime >= self._totalTime;
        }

        public play(): void {
            this._playing = true;
        }

        public stop(): void {
            this._playing = false;
        }

        public get playing() {
            return this._playing;
        }

        public advanceTime(elapseTime: number): void {
            let self = this;
            if (!self._playing || elapseTime <= 0) {
                return;
            }

            let preFrame: number = self._curFrame;
            let isComplete: boolean = false;
            if (self._loop && self._curTime >= self._totalTime) {
                self._curTime = 0;
                self._curFrame = 0;
            }

            if (self._curTime < self._totalTime) {
                self._curTime += elapseTime * self._speed;
                while (self._curTime > self._startTimes[self._curFrame] + self._durations[self._curFrame]) {
                    if (self._curFrame == self._finalFrame) {
                        if (self._loop) {
                            self._curTime -= self._totalTime;
                            self._curFrame = 0;
                        } else {
                            isComplete = true;
                            self._curTime = self._totalTime;
                            break;
                        }
                    } else {
                        self._curFrame++;
                    }
                }
                if (self._curFrame == self._finalFrame && self._curTime == self._totalTime) {
                    isComplete = true;
                }
            }
            if (self._curFrame != preFrame) {
                self.onFrameChange();
            }
            if (isComplete) {
                self.onComplete();
            }
        }

        private onFrameChange(): void {
            if (this._changeHandler) {
                let url = this._url[this._curFrame];
                this._changeHandler.exec([this._curFrame,url]);
            }
        }

        private onComplete(): void {
            if (this._compHandler) {
                this._compHandler.exec();
            }
        }

        public dispose(): void {
            this.onRelease();
        }

        public onAlloc(): void {
        }

        public onRelease(): void {
            let self = this;
            Pool.release(self._compHandler);
            self._compHandler = null;
            Pool.release(self._changeHandler);
            self._changeHandler = null;
            self._url = [];
            self._finalFrame = 0;
            self._totalTime = 0;
            self._durations.length = 0;
            self._startTimes.length = 0;
            self._curFrame = 0;
            self._curTime = 0;
            self._playing = false;
            self._loop = true;
            self._speed = 1;
        }
    }
}
