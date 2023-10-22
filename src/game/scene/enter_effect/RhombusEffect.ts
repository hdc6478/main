namespace game.scene {
    import Shape = egret.Shape;
    import Time = base.Time;
    import TimeMgr = base.TimeMgr;

    export class RhombusEffect extends BaseEnterEffect {
        private readonly _sps: Shape[] = [];

        private _pos: number;

        public start(): void {
            super.start();
            this._pos = 1;
            let parent = Layer.tip;
            let w = 16;
            let h = w;
            let sx = gso.gameStage.stageWidth / w;
            let sy = gso.gameStage.stageHeight / h;

            let sp: Shape;
            sp = new Shape();
            sp.scaleX = sx;
            sp.scaleY = sy;
            sp.graphics.beginFill(0);
            sp.graphics.moveTo(0, 0);
            sp.graphics.lineTo(w, 0);
            sp.graphics.lineTo(0, h);
            sp.graphics.lineTo(0, 0);
            sp.graphics.endFill();
            parent.addChild(sp);
            this._sps.push(sp);

            sp = new Shape();
            sp.scaleX = sx;
            sp.scaleY = sy;
            sp.graphics.beginFill(0);
            sp.graphics.moveTo(w, 0);
            sp.graphics.lineTo(w, h);
            sp.graphics.lineTo(0, h);
            sp.graphics.lineTo(w, 0);
            sp.graphics.endFill();
            parent.addChild(sp);
            this._sps.push(sp);

            sp = new Shape();
            sp.scaleX = sx;
            sp.scaleY = sy;
            sp.graphics.beginFill(0);
            sp.graphics.moveTo(0, 0);
            sp.graphics.lineTo(w, 0);
            sp.graphics.lineTo(w, h);
            sp.graphics.lineTo(0, 0);
            sp.graphics.endFill();
            parent.addChild(sp);
            this._sps.push(sp);

            sp = new Shape();
            sp.scaleX = sx;
            sp.scaleY = sy;
            sp.graphics.beginFill(0);
            sp.graphics.moveTo(0, 0);
            sp.graphics.lineTo(0, h);
            sp.graphics.lineTo(w, h);
            sp.graphics.lineTo(0, 0);
            sp.graphics.endFill();
            parent.addChild(sp);
            this._sps.push(sp);

            this.draw();
            TimeMgr.addUpdateItem(this);
        }

        public stop(callComplete: boolean = false): void {
            for (let sp of this._sps) {
                if (sp) {
                    sp.graphics.clear();
                    if (sp.parent) {
                        sp.parent.removeChild(sp);
                    }
                }
            }
            this._sps.length = 0;
            TimeMgr.removeUpdateItem(this);
            super.stop(callComplete);
        }

        public update(time: Time): void {
            super.update(time);
            this._pos -= 0.03;
            this.draw();
            if (this._pos <= 0) {
                this.step(EnterEffectStep.ANIM);
            }
        }

        private draw() {
            let self = this;
            let iX = Layer.tip.x;
            let iY = Layer.tip.y;
            let sw = Layer.tip.stage.stageWidth;
            let sh = Layer.tip.stage.stageHeight;
            let p = self._pos;
            let sp: Shape;
            sp = self._sps[0];
            sp.x = -(1 - p) * sw - iX;
            sp.y = -(1 - p) * sh - iY;
            sp = self._sps[1];
            sp.x = (1 - p) * sw - iX;
            sp.y = (1 - p) * sh - iY;
            sp = self._sps[2];
            sp.x = (1 - p) * sw - iX;
            sp.y = -(1 - p) * sh - iY;
            sp = self._sps[3];
            sp.x = -(1 - p) * sw - iX;
            sp.y = (1 - p) * sh - iY;
        }

    }
}
