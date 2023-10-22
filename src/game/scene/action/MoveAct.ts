namespace game.scene {


    import Point = egret.Point;
    import Pool = base.Pool;
    import GDirUtil = game.utils.GDirUtil;
    import Monster1Config = game.config.Monster1Config;

    export class MoveAct extends MoveBaseAct {

        protected setTilePos() {
            let self = this;
            let isTileChange = self._tmpTile.x >> 0 !== self._actor.vo.x >> 0 || self._tmpTile.y >> 0 !== self._actor.vo.y >> 0;
            if (isTileChange && MapData.ins.isPointLegal(self._tmpTile.x, self._tmpTile.y)) {
                self._actor.setTilePos(self._tmpTile.x, self._tmpTile.y, false);
            }
        }

        protected isNextPt() {
            let self = this;
            if (self._moveType != MoveType.Find) return true;
            if (self._actor == null || self._actor.vo == null) return true;
            if (!(self._actor instanceof MainGPlayer)) return true;
            // if (self._actor.vo.yuanshen_idx) return true;
            let isLast: boolean = self._endTile.equals(self._nextPt);
            if (self.findTarget()) return true;
            if (!isLast) return true;
            let isPlayer = self._target && self._target instanceof GPlayerVo;
            if (!self._endTile.equals(self._tmpTile) && !isPlayer) {
                self.sprintMove();
            }
            return true;
        }

        /**冲刺*/
        private sprintMove() {
            let self = this;
            let dis = PointUtil.distancePt(self._tmpTile, self._endTile);
            let isSprint = dis <= SPRINT_DIS_MAX && dis >= SPRINT_DIS_MIN;
            let actor = self._actor as MainGPlayer;
            let scene: Scene = actor.parent as Scene;
            if (!scene) return;
            if (isSprint) {
                actor.onStartSprint(self._tmpTile.x, self._tmpTile.y, self._endTile.x, self._endTile.y);
                self._moveType = MoveType.Sprint;
                self._startPt.setTo(self._curX, self._curY);
                self.updateDur(self._startPt, self._stepPt);
                self.checkDir();
                // let soulWare: SoulWare = scene.ctrl.getSoulWare(self._actor.vo.entity_id);
                // if (soulWare) {
                //     let move = Pool.alloc(MoveAct);
                //     // let handler: Handler;
                //     // if (actor.vo && actor.vo.ride_state == 1) {
                //     //     handler = Handler.alloc(this, () => {
                //     //         let _proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
                //     //         _proxy.scene_ride_oper_c2s(0, self._actor.vo.x, self._actor.vo.y);
                //     //     })
                //     // }
                //     move.setPath([Pool.alloc(Point).setTo(self._tmpTile.x, self._tmpTile.y), Pool.alloc(Point).setTo(self._endTile.x, self._endTile.y)], null, MoveType.Sprint);
                //     soulWare.actMgr.add(move);
                // }
                // if (actor.vo.ride_state == 1) {
                //
                //     // _proxy.scene_ride_oper_c2s(0);
                // }
            }
        }

        protected findTarget(): boolean {
            let self = this;
            let actor = self._actor as MainGPlayer;
            let scene = this._actor.parent as Scene;
            if (actor.vo.target_id) {
                let obj = scene.ctrl.getObj(actor.vo.target_id);
                if (!obj) return true;
                self._target = obj.vo as ActorVo;
            } else if (actor.vo.target_idx) {
                let obj = scene.getNearByObjType(ObjectType.MONSTER, actor.vo.target_idx);
                if (!obj) return true;
                self._target = obj.vo as ActorVo;
            }
            let atk_x: number, atk_y: number;
            if (self._target && (actor.vo.target_id || actor.vo.target_idx)) {
                actor.vo.target_id = null;
                actor.vo.target_idx = null;
                let dis = MOVE_AMEND_DIS;
                if (self._target instanceof MonsterVo && self._target.index) {
                    let cfg: Monster1Config = getConfigByNameId(ConfigName.Monster, self._target.index);
                    if (cfg && cfg.hit_scope) dis += cfg.hit_scope;
                }
                let curDis = PointUtil.distance(self._actor.vo.x, self._actor.vo.y, self._target.x, self._target.y);
                if (curDis <= dis) {
                    self.done();
                    return true;
                }
                let path = Scene.findPath(actor.vo.x, actor.vo.y, self._target.x, self._target.y);
                if (!path) return true;
                if (path.length > 2) {
                    let lastPt2: Point = path[path.length - 2];
                    let curDis = PointUtil.distancePt(lastPt2, self._endTile);
                    if (curDis <= dis) {//最后第二个点能攻击的情况
                        let time = 1;
                        for (let i = 3; i < path.length; i++) {
                            lastPt2 = path[path.length - i];
                            if (!lastPt2) break;
                            curDis = PointUtil.distancePt(lastPt2, self._endTile);
                            if (curDis > dis) {
                                time = i - 2;
                                lastPt2 = path[path.length - (i - 1)];
                                break;
                            }
                        }
                        for (let i = 0; i < time; i++) {
                            let pt = path.pop();
                            Pool.release(pt);
                        }
                        atk_x = lastPt2.x;
                        atk_y = lastPt2.y;
                    } else {
                        let r: number = GDirUtil.getRadian2(lastPt2.x, lastPt2.y, self._target.x, self._target.y);
                        atk_x = Math.round(self._target.x - dis * Math.cos(r));
                        atk_y = Math.round(self._target.y - dis * Math.sin(r));
                    }
                } else { //最后2点之间
                    let r: number = GDirUtil.getRadian2(actor.vo.x, actor.vo.y, self._target.x, self._target.y);
                    atk_x = Math.round(self._target.x - dis * Math.cos(r));
                    atk_y = Math.round(self._target.y - dis * Math.sin(r));
                }
                if (!MapData.ins.isBlock(atk_x, atk_y) && (atk_x != actor.vo.x && atk_y != actor.vo.y)) {
                    if (atk_x != null) {
                        Pool.releaseList(path);
                        path = Scene.findPath(actor.vo.x, actor.vo.y, atk_x, atk_y);
                    }
                    actor.onChangeMoveByPath(path, self._moveType);
                    self._startPt.setTo(self._curX, self._curY);
                    let last = path[path.length - 1];
                    self._endTile.setTo(last.x, last.y);
                    let p = path[1] ? path[1] : path[0];
                    self._nextPt.setTo(p.x, p.y);
                    self._stepPt = MapData.ins.getWorldPt(p.x, p.y, self._stepPt);
                    self.updateDur(self._startPt, self._stepPt);
                    self.checkDir();
                    // console.log(`路径x:${atk_x} y:${atk_y}  dis${PointUtil.distance(atk_x, atk_y, target.vo.x, target.vo.y)}`);
                }
                Pool.releaseList(path);
                path.length = 0;
            }
            return false;
        }

        private checkDir() {
            let self = this;
            self._actor.dir = GDirUtil.calcDirection(self._startPt, self._stepPt);
        }

        onRelease() {
            let self = this;
            self._target = null;
            super.onRelease();
        }
    }
}