namespace game.scene {

    import Handler = base.Handler;
    import Pool = base.Pool;

    export class ActorEftMgr extends BaseDraw {

        private _actor: BaseActor;
        private _id: number = 0;
        private readonly _effect: { [id: number]: { animate: SkillEffect, cb: Handler } } = {};

        public addEft(eftId: string, x: number, y: number, dir: number, scale: number = 1, cb: Handler = null, times: number = 1,isRotation?: boolean, isScene?: boolean): number {
            let self = this;
            let id = ++self._id;
            let animate: SkillEffect = Pool.alloc(SkillEffect);
            animate.x = x;
            animate.y = y;
            animate.scale = scale || 1;
            animate.times = times || 1;
            let source = ResUtil.getSkillEftUrl(eftId);
            if (isScene) {
                this.parent.add(animate);
            } else {
                this.add(animate);
            }
            animate.playEft(eftId, source, dir != undefined ? dir : this._actor.dir, Handler.alloc(this, this.onPlayComp, [id]));
            self._effect[id] = {animate, cb};
            return id;
        }

        private onPlayComp(id: number): void {
            let effect = this._effect[id];
            if (!effect) {
                return;
            }
            let cb = effect.cb;
            effect.cb = null;
            if (cb) {
                cb.exec();
                Pool.release(cb);
            }
            this.removeEffect(id);
        }

        public removeEffect(id: number | string): void {
            let effect = this._effect[id];
            this._effect[id] = null;
            delete this._effect[id];
            if (effect) {
                this.remove(effect.animate);
                if (effect.cb) {
                    Pool.release(effect.cb);
                    effect.cb = null;
                }
                Pool.release(effect.animate);
            }
        }

        public removeAllEffects() {
            let self = this;
            for (let k in self._effect) {
                self.removeEffect(k);
            }
        }

        protected onAdded(): void {
            super.onAdded();
            this._actor = <BaseActor>this.parent;
        }

        public onRelease(): void {
            this.removeAllEffects();
            this._id = 0;
            this._actor = null;
            super.onRelease();
        }
    }
}
