namespace game.scene {
    import Pool = base.Pool;
    import Handler = base.Handler;

    export class BaseSceneObj extends BaseDraw {
        protected _vo: SceneObjVo;
        //�Ƿ���ʾ��Ӱ
        protected _isShowShadow = false;

        private readonly _updateCb: { [key: string]: Handler } = {};

        public get vo(): SceneObjVo {
            return this._vo;
        }

        public set vo(value: SceneObjVo) {
            this._vo = value;
        }

        protected initUpdateCb(): void {
        }

        protected regUpdateCb(key: string, cb: () => any) {
            this._updateCb[key] = Handler.alloc(this, cb);
        }

        public applyUpdate(keys: string[]): void {
            if (!this._updateCb) {
                return;
            }
            for (let k of keys) {
                let cb = this._updateCb[k];
                if (cb && cb instanceof Handler) {
                    cb.exec();
                }
            }
        }

        public onAlloc(): void {
            super.onAlloc();
            (<SceneDisplay><any>this.dsp).addTime = TimeUtil.getSyncTimer();
            this.dsp.visible = true;
            this.initUpdateCb();
        }

        public onRelease(): void {
            let self = this;
            this._vo = null;
            let keys: string[] = Object.keys(self._updateCb);
            for (let k of keys) {
                Pool.release(self._updateCb[k]);
                self._updateCb[k] = null;
                delete self._updateCb[k];
            }
            this.dsp.visible = true;
            super.onRelease();
        }

        protected onAdded(): void {
            super.onAdded();
            this.updateVo();
        }

        public updateVo(): void {
            let self = this;
            (<SceneDisplay><any>self.dsp).addTime = TimeUtil.getSyncTimer();
            if (self.vo) {
                let pt = self.vo.worldPt;
                self.setWorldPos(pt.x, pt.y);
            }
        }

        public setWorldPos(wx: number, wy: number): void {
            this.x = wx;
            this.y = wy;
        }

        public setTilePos(tx: number, ty: number, updateWorld: boolean = true): void {
            this.vo.x = tx;
            this.vo.y = ty;
            if (updateWorld) {
                let pt = MapData.ins.getWorldPt(tx, ty);
                this.setWorldPos(pt.x, pt.y);
                Pool.release(pt);
            }
        }
    }
}