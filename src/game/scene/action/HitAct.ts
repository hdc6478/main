namespace game.scene {

    import Handler = base.Handler;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;

    export class HitAct extends BaseAct {

        private _timeoutKey: number = 0;

        public eftDir: number;

        public isChangeAct: boolean = true;

        protected onStart(): void {
            super.onStart();
            let self = this;
            self._actor.onHitStart(self.isChangeAct);
            let dir = this.eftDir == undefined ? self._actor.dir : this.eftDir;
            this._actor.addEft(BossHitEftSrc, 0, -50, dir);
            let isBoss = (<MonsterVo>self._actor.vo).monsterType == MonsterType.Boss;
            let delay = isBoss ? 100 : 500;
            self._timeoutKey = delayCall(Handler.alloc(self, self.onTimeOut), delay);
        }

        private onTimeOut() {
            if (this.isDone) {
                return;
            }
            this.done();
        }

        public onEffCom() {
            if (this.isDone) {
                return;
            }
            this.done();
        }

        protected onDone(): void {
            super.onDone();
            if (this._actor) {
                this._actor.onHitEnd();
            }
        }

        protected onAbort(): void {
            super.onAbort();
            if (this._actor) {
                this._actor.onHitEnd();
            }
        }

        protected onAdded(): void {
            super.onAdded();
        }

        public onRelease(): void {
            let self = this;
            self.isChangeAct = true;
            clearDelay(self._timeoutKey);
            self._timeoutKey = 0;
            super.onRelease();
        }
    }

}
