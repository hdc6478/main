namespace game.scene {


    import TimeMgr = base.TimeMgr;
    import Point = egret.Point;
    import Pool = base.Pool;

    export class SceneShake {

        private _scene: Scene;
        public isShake: boolean = false;
        private _shakeStartTime: number;
        private _curTimes: number;
        private _times: number;
        private _duration: number[] = [];
        private _curFrame: number;
        private _frameTime: number;
        private _shakeFocusPt: Point;
        private readonly MAX_FRAME = ShakeCfg.length;

        constructor(scene: Scene) {
            this._scene = scene;
        }

        public start(cfg: number[]) {

            if(this.isShake){
                console.log("正在抖动场景，不叠加");
                return;
            }

            this._shakeStartTime = TimeMgr.time.time;
            this._frameTime = 0;
            this._curFrame = 0;
            this._curTimes = 0;
            this._times = cfg[0];
            this._duration.length = 0;
            for (let i = 1, l = cfg.length; i < l; ++i) {
                this._duration.push(cfg[i]);
            }
            this.isShake = true;
            console.log("SceneShake start");
        }

        public remove() {
            console.log("SceneShake remove");
            this.isShake = false;
            this._duration.length = 0;
            this._frameTime = 0;
            this._shakeStartTime = 0;
            this._curFrame = 0;
            this._curTimes = 0;
            this._times = 1;

            if(this._shakeFocusPt){
                let wx = this._shakeFocusPt.x + 0;
                let wy = this._shakeFocusPt.y + CameraOffsetY + 0;
                this._scene.updateFocus(wx, wy);
            }

            Pool.release(this._shakeFocusPt);
            this._shakeFocusPt = null;
        }

        public updateShakeFocusPt() {
            this._shakeFocusPt = this._scene.getFocusPt();
        }

        public doShake() {
            if (this._curTimes <= this._times) {
                let time = TimeMgr.time.time;
                let passTime = time - this._shakeStartTime;
                if (passTime >= this._duration[this._curTimes]) {
                    if (this._curFrame == 0) {
                        this._frameTime = time;
                        this.updateShakeFocusPt();
                    }
                    let frameTime = time - this._frameTime;
                    let cfg: { x: number, y: number, t: number } = ShakeCfg[this._curFrame];
                    if (frameTime >= cfg.t) {
                        let wx = this._shakeFocusPt.x + cfg.x;
                        let wy = this._shakeFocusPt.y + CameraOffsetY + cfg.y;
                        this._scene.updateFocus(wx, wy);
                        this._curFrame++;
                        if (this._curFrame >= this.MAX_FRAME) {
                            this._curTimes++;
                            this._curFrame = 0;
                        }
                    }
                }
            } else {
                this.remove();
            }
        }
    }
}
