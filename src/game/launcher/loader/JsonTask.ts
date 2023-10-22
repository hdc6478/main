namespace game {
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    import Handler = base.Handler;
    import TimeMgr = base.TimeMgr;
    import Pool = base.Pool;

    export class JsonTask implements UpdateItem {
        /** @internal */ private _source: string[];
        /** @internal */ private _onStep: Handler;
        /** @internal */ private _onDone: Handler;

        constructor() {
        }

        public start(source: string[], onStep: Handler, onDone: Handler = undefined): void {
            if (!source || !source.length || !onStep) {
                return;
            }
            this._source = source;
            this._onStep = onStep;
            this._onDone = onDone;
            TimeMgr.addUpdateItem(this, 15);
        }

        public stop(): void {
            let self = this;
            if (!self._source) {
                return;
            }
            TimeMgr.removeUpdateItem(self);
            self._source = null;
            Pool.release(self._onStep);
            self._onStep = null;
            if (self._onDone) {
                self._onDone.exec();
            }
            Pool.release(self._onDone);
            self._onDone = null;
        }

        public update(time: Time): void {
            let self = this;
            let source = self._source;
            if (!source) {
                return;
            }
            let t0: number = egret.getTimer();
            for (let i = 0; i < 100; i++) {
                if (source.length) {
                    self._onStep.exec(JSON.parse(source.shift()));
                    if (egret.getTimer() - t0 > 15) {
                        break;
                    }
                } else {
                    self.stop();
                    return;
                }
            }
        }

    }
}