namespace game.scene {

    import Pool = base.Pool;
    import Point = egret.Point;
    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import clearDelay = base.clearDelay;

    export class DieAct extends BaseAct {
        public attacker: BaseActor;

        private _start: Point;
        private _flyEnd: Point;
        private _curTime: number;
        private _moveTime: number;
        private _totalTime: number;

        private _timeOutKey: number = 0;

        protected onStart(): void {
            super.onStart();
            this._actor.onDie();
            this._timeOutKey = delayCall(Handler.alloc(this, this.onDieTimeOut), 150);
        }

        protected onAbort(): void {
            super.onAbort();
            this._actor.onDieEnd();
        }

        protected onDone(): void {
            super.onDone();
            this._actor.onDieEnd();
        }

        private onDieTimeOut() {
            this.onAnimComp();
        }

        public onAnimComp(): void {
            let self = this;
            clearDelay(this._timeOutKey);
            this._timeOutKey = 0;
            if (!self.attacker) {
                this.done();
                return;
            }
            let angle = PointUtil.angle(self.attacker.x, self.attacker.y, self._actor.x, self._actor.y);
            self._start = Pool.alloc(Point).setTo(self._actor.x, self._actor.y);
            let dis = 230 * 0.6;
            self._flyEnd = PointUtil.getDistPt(self._start, angle, dis);
            self._curTime = 0;
            self._moveTime = dis / 0.5;
            self._totalTime = self._moveTime + 1000;
        }

        public advanceTime(elapseTime: number): void {
            super.advanceTime(elapseTime);
            let self = this;
            if (!self._flyEnd) {
                return;
            }
            self._curTime += elapseTime;
            if (self._curTime >= self._totalTime) {
                self.done();
                return;
            }
            let p = self._curTime / self._moveTime;
            if (p <= 1) {
                self._actor.x = self._start.x + (self._flyEnd.x - self._start.x) * p;
                self._actor.y = self._start.y + (self._flyEnd.y - self._start.y) * p;
            }
            if (self._curTime > self._moveTime) {
                self._actor.alpha = 1 - (self._curTime - self._moveTime) / 1000;
            }
        }

        public onRelease(): void {
            clearDelay(this._timeOutKey);
            this._timeOutKey = 0;
            this.attacker = null;
            Pool.release(this._start);
            this._start = null;
            Pool.release(this._flyEnd);
            this._flyEnd = null;
            super.onRelease();
        }

    }
}
