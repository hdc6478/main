namespace game.scene {
    import Pool = base.Pool;
    import Point = egret.Point;

    /***
     * 阴影
     */
    export class ActorShadow extends BaseDraw {
        private _bmp: BitmapBase;
        private _actor: BaseActor;

        public setActor(actor: BaseActor) {
            this._actor = actor;
            this._actor.setShadow(this);
            this.resetPos();
        }

        public updatePos(wx: number, wy: number) {
            let self = this;
            if (isNaN(wx) || isNaN(wy)) {
                self.resetPos();
                return;
            }
            self.x = wx;
            self.y = wy;
        }

        private resetPos() {
            let self = this;
            let worldPt: Point = self._actor.vo.worldPt;
            self.x = worldPt.x;
            self.y = worldPt.y;
        }

        public onAlloc(): void {
            super.onAlloc();
            let self = this;
            this._bmp = <BitmapBase>this.dsp.addChild(Pool.alloc(BitmapBase));
            self._bmp.source = "moxing_di";
            self._bmp.anchorOffsetX = 42;
            self._bmp.anchorOffsetY = 25;
            self._bmp.touchEnabled = false;
        }

        public onRelease(): void {
            let self = this;
            if (self._bmp) {
                self._bmp.anchorOffsetX = 0;
                self._bmp.anchorOffsetY = 0;
                if (self._bmp.parent) {
                    self._bmp.parent.removeChild(this._bmp);
                    self.removeDsp(this);
                }

            }
            Pool.release(self._bmp);
            self._bmp = undefined;
            self._actor = undefined;
            self.dsp.visible = true;
            super.onRelease();
        }
    }
}