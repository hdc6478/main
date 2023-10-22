namespace game.scene {
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    import Handler = base.Handler;

    export class BaseEnterEffect implements UpdateItem {
        private _onComplete: Handler;
        private _stepStatus: { [key: string]: boolean } = {};

        constructor(onComplete: Handler) {
            this._onComplete = onComplete;
        }

        public start(): void {
        }

        public step(step: EnterEffectStep): void {
            this._stepStatus[step] = true;
            for (let k of EnterEffectAllStep) {
                if (!this._stepStatus[k]) {
                    return;
                }
            }
            this.stop(true);
        }

        public stop(callComplete: boolean = false): void {
            let h = this._onComplete;
            // this._onComplete = null;
            if (callComplete && h) {
                h.exec();
            }
            this._stepStatus = {};
            // Pool.release(h);
        }

        public update(time: Time): void {
        }

    }
}
