namespace game.scene {

    import Point = egret.Point;
    import GDirUtil = game.utils.GDirUtil;
    import Pool = base.Pool;
    import Handler = base.Handler;
    import Tween = base.Tween;

    export class MoveBaseAct extends BaseAct {
        protected _path: Point[];

        protected _startPt: Point;
        protected _stepPt: Point;
        protected _endTile: Point;
        protected _nextPt: Point;
        protected _tmpTile: Point;

        protected _curX: number;
        protected _curY: number;

        protected _curTime: number;
        protected _lastMoveTimeLeft: number = 0;
        protected _totalTime: number;
        protected _keepRun: boolean = false;
        private _isGhostShow: boolean = false;

        protected _onMoveEnd: Handler;

        protected _moveType: number;
        protected _target: ActorVo;

        protected _moveTime:number;

        public get endTile(): Point {
            return this._endTile;
        }

        public setPath(path: Point[], onMoveEnd?: Handler, moveType: number = MoveType.Normal,_moveTime?:number) {
            if (this._onMoveEnd) {
                Pool.release(this._onMoveEnd);
            }
            this._onMoveEnd = onMoveEnd;
            this._path = path;
            this._moveType = moveType;
            this._endTile = path[path.length - 1];
            this._moveTime = _moveTime;
        }

        public get path(): Point[] {
            return this._path;
        }

        public get moveType(): number {
            return this._moveType;
        }

        public set moveType(value: number) {
            this._moveType = value;
        }

        protected onStart() {
            let self = this;
            if (this._moveType == MoveType.Back) {
                self._actor.onBackStart();
            }
            // else if (this._moveType == MoveType.Push_Back) {
            //     super.onStart();
            //     let dst:Point = this._path[0];
            //     if(dst && this._moveTime){
            //
            //         let target = self._actor.dsp;
            //         let x = dst.x * MapData.ins.cellWidth;
            //         let y = dst.y * MapData.ins.cellHeight;
            //         self._actor.vo.x = dst.x;
            //         self._actor.vo.y = dst.y;
            //         Tween.get(target).to({x:x,y:y},this._moveTime).exec(Handler.alloc(this,function () {
            //             self.done();
            //             if(self._actor){
            //                 self._actor.setWorldPos(x,y);
            //             }
            //             Tween.remove(target);
            //         }));
            //     }
            //     else{
            //         console.error("dst = "+dst+","+"this._moveTime = "+this._moveTime);
            //     }
            //     return;
            // }
            else {
                self._actor.onMoveStart();
            }
            if (!self._path) {
                this.done();
                return;
            }
            let pt = self._path.shift();
            if (DEBUG) {
                if (gso.test_mask == "1") {
                    if (Math.abs(self._actor.vo.x - pt.x) > 2 || Math.abs(self._actor.vo.y - pt.y) > 2) {
                        console.error("移动坐标不一致！C Point：", self._actor.vo.x, self._actor.vo.y, "S Point" + pt,
                            "id:" + self._actor.vo.entity_id, "type:" + self._actor.vo.type);
                    }
                }
            }
            self._actor.setTilePos(pt.x, pt.y, false);
            Pool.release(pt);
            self._startPt = Pool.alloc(Point).setTo(self._actor.x, self._actor.y);
            self.shiftNext();
            super.onStart();
        }

        protected onDone() {
            super.onDone();
            if (this._actor) {
                this._actor.onMoveEnd();
            }
            if (this._onMoveEnd) {
                this._onMoveEnd.exec();
            }
        }

        public abort(keepRun: boolean = false): void {
            this._keepRun = keepRun;
            super.abort();
        }

        protected onAbort() {
            this._actor.onMoveEnd(this._keepRun);
            this._keepRun = false;
        }

        public advanceTime(elapseTime: number): void {
            let self = this;
            if (self.isDone) {
                return;
            }
            if (self.isAbort) {
                return;
            }
            if (!self._startPt) {
                return;
            }
            if (this._lastMoveTimeLeft > 0) {
                this._curTime += this._lastMoveTimeLeft;
                this._lastMoveTimeLeft = 0;
            }
            self._curTime += elapseTime;
            let p = self._curTime / self._totalTime;
            if (isNaN(p) || p >= 1) {
                p = 1;
                this._lastMoveTimeLeft = Math.max(0, self._curTime - self._totalTime);
            }
            self._curX = self._startPt.x + (self._stepPt.x - self._startPt.x) * p;
            self._curY = self._startPt.y + (self._stepPt.y - self._startPt.y) * p;
            if (isNaN(self._curX) || isNaN(self._curY)) {
                this.abort();
                return;
            }
            self._actor.setWorldPos(self._curX, self._curY);
            self._tmpTile = MapData.ins.getCellPt(self._curX, self._curY, self._tmpTile);
            self.setTilePos();
            if (!self.isNextPt()) return;
            //检查互相为目标的情况
            if (self._actor instanceof MainGPlayer && self._target) {
                let dis = PointUtil.distance(self._actor.vo.x, self._actor.vo.y, self._target.x, self._target.y);
                if (dis <= MOVE_AMEND_DIS) {
                    let path: Point[] = Scene.findPath(self._actor.vo.x, self._actor.vo.y, self._target.x, self._target.y);
                    self._actor.onChangeMoveByPath(path, MoveType.Normal);
                    this.done();
                    Pool.releaseList(path);
                }
            }
            if (this._actor.vo.type == ObjectType.PLAYER && this.moveType == MoveType.Sprint) {
                self._isGhostShow = !self._isGhostShow;
                if (this._isGhostShow) {
                    let scene: any = this._actor.parent;
                    scene.addGhost(this._actor);
                }


            }
            // if (self._actor instanceof Ride && self._actor.isPlayGhost) {
            //     let scene: any = this._actor.parent;
            //     scene.addGhost(this._actor);
            // }
            if (p == 1) {
                self.shiftNext();
            }
        }

        /** 设置世界坐标 */
        protected setTilePos() {
            let self = this;
            let isTileChange = self._tmpTile.x >> 0 !== self._actor.vo.x >> 0 || self._tmpTile.y >> 0 !== self._actor.vo.y >> 0;
            if (isTileChange) {
                self._actor.setTilePos(self._tmpTile.x, self._tmpTile.y, false);
            }
        }

        protected isNextPt() {
            return true;
        }

        protected shiftNext() {
            let self = this;
            if (self._nextPt) {
                Pool.release(self._nextPt);
                self._nextPt = null;
            }
            if (self._path && self._path.length > 0) {
                if (self._stepPt) {
                    self._startPt.setTo(self._stepPt.x, self._stepPt.y);
                }
                self._nextPt = self._path.shift();
                self._stepPt = MapData.ins.getWorldPt(self._nextPt.x, self._nextPt.y, self._stepPt);
                if (this._moveType == MoveType.Back) {
                    // self._actor.dir = GDirUtil.calcDirection(self._stepPt, self._startPt);
                } else {
                    self._actor.dir = GDirUtil.calcDirection(self._startPt, self._stepPt);
                }
                this.updateDur(self._startPt, self._stepPt);
            } else {
                self.done();
            }
        }

        public onSpeedUpdate(): void {
            if (!this._startPt) {
                return;
            }
            this._startPt.setTo(this._actor.x, this._actor.y);
            this.updateDur(this._startPt, this._stepPt);
        }

        protected updateDur(startPt: Point, endPt: Point): void {
            let self = this;
            if (startPt.equals(endPt)) {
                self.shiftNext();
                return;
            }

            self._curTime = 0;
            let dis = PointUtil.distancePt(startPt, endPt);
            let speed = self._actor.getMoveSpeed(self._moveType);
            self._totalTime = dis / speed;
            if (!self._totalTime) {
                console.debug("计算移动总时间错误！", startPt.toString(), endPt.toString(), this._moveType, this._actor.vo.speed);
            }
        }

        public onRelease(): void {
            let self = this;
            Pool.release(self._nextPt);
            self._nextPt = null;
            self._moveType = null;
            Pool.release(self._onMoveEnd);
            self._onMoveEnd = null;
            Pool.release(self._startPt);
            self._startPt = null;
            Pool.release(self._stepPt);
            self._stepPt = null;
            Pool.release(self._tmpTile);
            self._tmpTile = null;
            Pool.releaseList(self._path);
            self._path = null;
            self._endTile = null;
            self._keepRun = false;
            self._isGhostShow = null;
            super.onRelease();
        }
    }
}
