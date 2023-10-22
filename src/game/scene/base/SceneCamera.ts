namespace game.scene {
    import Rectangle = egret.Rectangle;
    import Point = egret.Point;
    import Pool = base.Pool;
    import GDirUtil = game.utils.GDirUtil;
    import SceneUtil = game.mod.SceneUtil;

    export class SceneCamera {
        private static Fix: number = 100;
        private _mw: number = 0; // map width
        private _mh: number = 0; // map height
        private _sliceW: number; // slice width
        private _sliceH: number; // slice height
        private _sw: number; // stage width
        private _sh: number; // stage height
        private _fx: number; // focus x
        private _fy: number; // focus y
        public _scene: Scene;
        private _viewPort: Rectangle = new Rectangle();
        private _scale: number;

        private _isStartMove: boolean = false;
        private _speedMove: number;
        private _curMovePosX: number;
        private _curMovePosY: number;
        private _startPosX: number;
        private _startPosY: number;
        private _endPosX: number;
        private _endPosY: number;
        private _totalDist: number;
        private _curTime: number;
        private isUpdate: boolean = false;
        private _update_average_time_queue: number[] = [];

        constructor(scene: Scene) {
            this._scene = scene;
        }

        public init(): void {
            let self = this;
            self._mw = MapData.ins.mapWidth;
            self._mh = MapData.ins.mapHeight;
            self._sliceW = MapData.ins.sliceWidth;
            self._sliceH = MapData.ins.sliceHeight;
            self._fx = NaN;
            self._fy = NaN;
            self._curMovePosX = null;
            self._curMovePosY = null;
            self._startPosX = null;
            self._startPosY = null;
            self._endPosX = null;
            self._endPosY = null;
            self._speedMove = MapData.ins.cellWidth / DefaultSpeed;
            self._update_average_time_queue.length = 0;
        }

        public onResize(sw: number, sh: number): void {
            let self = this;
            self._sw = sw;
            self._sh = sh;
            if (self._mw == 0 || self._mh == 0) {
                return;
            }
            if (!isNaN(self._fx) && !isNaN(self._fy)) {
                /**聚焦时候需要计算上偏移量*/
                self.setFocus(self._fx, self._fy + CameraOffsetY, false, self._scale);
            }
        }

        private equal(fx: number, fy: number): boolean {
            let Fix = SceneCamera.Fix;
            let cx = Math.floor(this._fx * Fix);
            let cy = Math.floor(this._fy * Fix);
            let tx = Math.floor(fx * Fix);
            let ty = Math.floor(fy * Fix);
            return cx == tx && cy == ty;
        }
        /**PVP里面的场景才会用到，设置镜头居中*/
        public setMapCenterFocus(): void {
            // if (SceneUtil.getCurSceneType() == SceneType.CompeteMars) {  // 竞技场地图策划弄不好
            //     posY = 0.4;
            // }
            this.setFocus(this._mw * 0.47, this._mh * 0.47, false);
        }

        public setFocus(focusX: number, focusY: number, smooth: boolean = true, scale: number = 1): void {
            let self = this;
            if (self.equal(focusX, focusY)) {
                return;
            }
            // console.log(`X:${focusX} Y:${focusY}`)
            if (self._startPosX == null) {
                self._startPosX = focusX;
                self._startPosY = focusY - CameraOffsetY;
                smooth = false;
            }
            self._fx = focusX;
            self._fy = focusY - CameraOffsetY;
            self._scale = scale;
            if (smooth) {
                self._startPosX = self._curMovePosX ? self._curMovePosX : self._startPosX;
                self._startPosY = self._curMovePosY ? self._curMovePosY : self._startPosY;
                self._endPosX = focusX;
                self._endPosY = focusY - CameraOffsetY;
                self._curTime = 0;
                self.isUpdate = true;
            } else {
                self._isStartMove = false;
                self._totalDist = 0
                self.checkToStopUpdate();
                self.updateViewPort(focusX, focusY - CameraOffsetY);
            }
        }

        public update(elapseTime: number) {
            let self = this;
            if (self.isUpdate) {
                let r = GDirUtil.getRadian2(self._curMovePosX, self._curMovePosY, self._endPosX, self._endPosY);
                self._totalDist = Math.sqrt(PointUtil.distanceSquare(self._curMovePosX, self._curMovePosY, self._endPosX, self._endPosY));
                // this.addAverageTime(self._totalDist);//平均值
                let dist = self._totalDist;
                let isStop = false;
                if (dist < 1) {
                    self._totalDist = 0;
                    isStop = true;
                }
                if (isStop) {
                    self.checkToStopUpdate();
                    self.updateViewPort(self._endPosX, self._endPosY);
                } else {
                    let value = dist / 5;
                    // this.addAverageTime(value);//平均值
                    // value = this.getAverageTime();
                    let x = Math.cos(r) * value;
                    let y = Math.sin(r) * value;
                    self._curMovePosX += x;
                    self._curMovePosY += y;
                    self.updateViewPort(self._curMovePosX, self._curMovePosY);
                }
            }
        }

        private checkToStopUpdate() {
            if (this._totalDist == 0) {
                this._curMovePosY = this._fy;
                this._curMovePosX = this._fx;
                this.isUpdate = false;
            }
        }


        public getFocusPt(): Point {
            return Pool.alloc(Point).setTo(this._fx, this._fy);
        }

        private updateViewPort(fX: number, fY: number): void {
            let self = this;
            let sw: number = self._sw / self._scale;
            let mw: number = self._mw;
            let sh: number = self._sh / self._scale;
            let mh: number = self._mh;
            let hW: number = Math.min(sw, mw) / 2;
            let hH: number = Math.min(sh, mh) / 2;
            let cX: number = MathUtil.clamp(fX, hW, Math.max(sw, mw) - hW);
            let cY: number = MathUtil.clamp(fY, hH, Math.max(sh, mh) - hH);
            let w2 = cX - hW;
            let h2 = cY - hH;
            self._viewPort.setTo(w2, h2, sw, sh);
            if(gso.dbg_scene == 4){
                console.info("主角坐标（",fX,",",fY,")");
                console.info("屏幕左上角坐标（",w2,",",h2,")");
                console.info("屏幕右上角坐标（",w2+sw,",",h2,")");
                let cellWidth = MapData.ins.cellWidth;
                console.info("主角网格坐标（",fX / cellWidth,",",fY / cellWidth,")");
                console.info("屏幕左上角网格坐标（",w2 / cellWidth,",",h2 / cellWidth,")");
                console.info("屏幕右上角网格坐标（",(w2+sw) / cellWidth,",",h2 / cellWidth,")");
            }
            self._scene.updateViewPort(self._viewPort);
            this.updateMapTiles(this._viewPort);
        }

        private updateMapTiles(viewRect: Rectangle): void {
            let self = this;
            let viewSX: number = viewRect.x;
            let viewSY: number = viewRect.y;
            let viewW: number = viewRect.width;
            let viewH: number = viewRect.height;
            let viewEX: number = viewSX + viewW;
            let viewEY: number = viewSY + viewH;
            let sc: number = Math.floor(viewSX / self._sliceW);//左上方第一块地图坐标（sc,sr）
            let sr: number = Math.floor(viewSY / self._sliceH);
            let ec: number = Math.floor(viewEX / self._sliceW) + ((viewEX % self._sliceW == 0) ? 0 : 1);//右下方最后一块地图坐标（ec,er）
            let er: number = Math.floor(viewEY / self._sliceH) + ((viewEY % self._sliceH == 0) ? 0 : 1);

            self._scene.updateTiles(sc, sr, ec, er);
        }

        public get viewPort(): Rectangle {
            return this._viewPort;
        }

    }

}
