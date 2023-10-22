namespace game.scene {

    import Point = egret.Point;
    import Handler = base.Handler;
    import Tween = base.Tween;

    export class JumpMoveAct extends  BaseAct{
        private _bezierPosArr:Point[] = [];
        private _starP:Point;
        private _midP:Point;
        private _endP:Point;
        private _onMoveEnd:Handler;
        private _moveType:number;
        /**
         * 每段贝塞尔曲线运动花费的时间
         */
        private _timePerDis:number = 0;
        /**
         * 贝塞尔曲线的段数
         */
        private _disCnt:number = 10;
        /**
         * 是否已经计算过速度
         */
        private _isCountSpeed:boolean = false;
        protected onStart() {
            let self = this;
            if(!self._starP || !self._midP || !self._endP){
                self.done();
                return;
            }
            console.log("......start do bezerMove......");
            self.moveBezierPoint();
            super.onStart();
        }

        public setPath(path: Point[], moveType:number,onMoveEnd?: Handler):void{
            let self = this;
            if(path.length != 3){
                self._starP = null;
                self._midP = null;
                self._endP = null;
                console.log("路点信息是不对的，只能是3个");
                return;
            }
            self._moveType = moveType;
            self._onMoveEnd = onMoveEnd;

            self._starP = MapData.ins.getWorldPt(path[0].x, path[0].y, self._starP);
            self._midP = MapData.ins.getWorldPt(path[1].x, path[1].y, self._midP);
            self._endP = MapData.ins.getWorldPt(path[2].x, path[2].y, self._endP);

            let arr:Point[] = [];
            arr.push(self._starP,self._midP,self._endP);
            self._bezierPosArr = BezierUtil.getBezierPos(arr,self._disCnt);
            self._isCountSpeed = false;
        }

        private moveBezierPoint():void{
            let self = this;
            if(!self._bezierPosArr || self._bezierPosArr.length == 0){
                if(self._onMoveEnd){
                    self._onMoveEnd.exec();
                }
                console.log("......end do bezerMove......");
                self.done();
                Tween.remove(self);
                return;
            }
            if(!self._isCountSpeed){
                self._isCountSpeed = true;
                let dis = PointUtil.distancePt(self._starP, self._endP);
                let speed = self._actor.getMoveSpeed(self._moveType);
                self._timePerDis = dis/speed/self._disCnt;
                if (!self._timePerDis) {
                    console.debug("计算移动时间错误！", self._starP.toString(), self._endP.toString(), this._moveType, this._actor.vo.speed);
                }
            }
            let s:Point = self._bezierPosArr.shift();
            Tween.get(self._actor).to({x:s.x,y:s.y},self._timePerDis,Handler.alloc(self,self.flusCameraPos,[{x:self._actor.x,y:self._actor.y}])).exec(Handler.alloc(self,self.moveBezierPoint));
        }

        private flusCameraPos(obj:any):void{
            let self = this;
            console.log("...镜头位置...，",obj.x,obj.y);
            let scene: Scene = this._actor.parent as Scene;
            let p = MapData.ins.getCellPt(obj.x, obj.y, self._starP);
            scene.updateFocus(obj.x,obj.y);
        }
    }

}