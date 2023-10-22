namespace game.scene {

    import Handler = base.Handler;
    import Pool = base.Pool;

    export class EftUIGroup extends BaseDraw {

        private _eftId: string | number;
        private _src: string;
        private _onDone: Handler;
        private _onEftDone: Handler;
        private _onEftChildDone: Handler;

        private _timeOut: number = 0;

        private _addEdEft: EftGroupChildCfg[] = [];
        private _eftList: EftGroupChildCfg[];
        private _len: number;
        private _startTime: number;
        private _elapseTime: number;

        private _actor: BaseActor;

        public layer: number = SceneLayerType.Effect;
        public _container:egret.DisplayObjectContainer;
        //public _skillEffects:SkillEffect[] = [];

        public setData(eftId: string | number, src: string, actor: BaseActor, cb: Handler,container:egret.DisplayObjectContainer,eftDone: Handler,eftChildDone: Handler) {
            let self = this;
            self.updateEnabled = false;
            self._onDone = cb;
            self._onEftDone = eftDone;
            self._onEftChildDone = eftChildDone;
            self._eftId = eftId;
            self._src = src;
            self._actor = actor;
            this._container = container;
            //this._skillEffects = [];
            LoadMgr.ins.addRef(src);
            LoadMgr.ins.load(src, Handler.alloc(self, self.onLoadSucc), LoadPri.Scene, Handler.alloc(self, this.onLoadFail));
        }

        private onLoadFail() {
            this.onComp();
        }

        private onLoadSucc(data: EftGroupCfg) {
            if (data.id != this._eftId) {
                return;
            }
            this._addEdEft = [];
            this._eftList = data.children;
            this._len = this._eftList.length;
            this._elapseTime = 0;
            this._startTime = 0;
            this.updateEnabled = true;
        }

        private resetActor() {
            if (this._actor && this._actor.dsp && !this._actor.dsp.visible) {
                this._actor.dsp.visible = true;
            }
        }

        private onComp() {
            this.resetActor();
            if (this._onDone) {
                this._onDone.exec();
            }
            this._eftList = null;
            this.dispose();
        }

        public advanceTime(elapseTime: number): void {
            super.advanceTime(elapseTime);
            this._elapseTime += elapseTime;
            let scaleX: number = this.scaleX;
            let scaleY: number = this.scaleY;
            for (let i = 0; i < this._len; ++i) {
                let eftCfg = this._eftList[i];
                let isAdded = this._addEdEft.indexOf(eftCfg) > -1;
                if (this._elapseTime - this._startTime >= eftCfg.delay && !isAdded) {
                    this._addEdEft.push(eftCfg);
                    let r = this.dsp.rotation * Math.PI / 180;
                    let x = this.x + (r != 0 ? eftCfg.x * Math.cos(r) - eftCfg.y * Math.sin(r) : eftCfg.x) * scaleX;
                    let y = this.y + (r != 0 ? eftCfg.x * Math.sin(r) + eftCfg.y * Math.cos(r) : eftCfg.y) * scaleY;
                    let dir = (scaleX > 0 ? 1 : -1);
                    let rotation = (eftCfg.r + this.dsp.rotation) * dir;
                    let eft:SkillEffect = SkillEftMgr.ins.showSkillEftUI(eftCfg.id, x, y, rotation, eftCfg, r, dir, this.scaleY,this.layer,this._container,this._onEftDone);
                    //this._skillEffects.push(eft);
                    this._onEftChildDone.exec(eft);
                    if (this._addEdEft.length == this._len) {
                        this.onComp();
                    }
                }
            }

        }

        public onRelease(): void {
            let self = this;
            self.x = 0;
            self.y = 0;
            self.dsp.rotation = 0;
            self.resetActor();
            self._actor = null;
            self._elapseTime = undefined;
            self._startTime = undefined;
            self._len = undefined;
            self._addEdEft.length = 0;
            self._eftList = undefined;
            base.clearDelay(self._timeOut);
            Pool.release(self._onDone);
            self._onDone = null;
            self.layer = SceneLayerType.Effect;
            LoadMgr.ins.decRef(self._src);
            self._src = null;
            super.onRelease();
        }

        public isFinished():boolean{
            return this._eftList == null;
        }
    }
}
