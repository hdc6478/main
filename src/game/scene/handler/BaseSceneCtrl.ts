namespace game.scene {
    import Pool = base.Pool;

    export class BaseSceneCtrl {
        private _scene: Scene;
        private _mapId: number;
        private _objMap: { [key: string]: BaseSceneObj };
        //private _soulWareMap: { [key: string]: SoulWare };
        //private _goryMap: { [key: string]: Gory };
        private _rideMap: { [key: string]: Ride };
        private _ghost: { [key: string]: BaseSceneObj };
        /** 调试专用 */
        public objDebugMap: { [key: string]: BaseSceneObj };

        private _ghostIdx: number;


        public getObj(id: Long): BaseSceneObj {
            if (!id) return null;
            return this._objMap[id.toString()];
        }

        // public getSoulWare(id: Long): SoulWare {
        //     if (!id) return null;
        //     return this._soulWareMap[id.toString()];
        // }

        // public getGory(id: Long): Gory {
        //     if (!id) return null;
        //     return this._goryMap[id.toString()];
        // }

        public getObjMap(): { [key: string]: BaseSceneObj } {
            return this._objMap;
        }

        public init(mapId: number, scene: Scene) {
            if (mapId == this._mapId) {
                return;
            }
            this._scene = scene;
            this._mapId = mapId;
            this._objMap = {};
            this._rideMap = {};
            //this._soulWareMap = {};
            //this._goryMap = {};
            this._ghostIdx = 0;
            this._ghost = {};
            if (DEBUG) {
                this.objDebugMap = {};
            }
            this.onInit();
        }

        public getRide(id: Long): Ride {
            return this._rideMap[id.toString()];
        }

        public addRide(obj: Ride) {
            let self = this;
            let idx: string = (obj.vo["master_id"] as Long).toString();
            self._rideMap[idx] = obj;
            self._scene.addActor(obj);
            this.onObjAdded(obj);
        }

        public removeRide(obj: Ride | string) {
            let _obj: Ride;
            if (obj instanceof Ride) {
                _obj = obj
            } else {
                _obj = this._rideMap[obj];
            }
            if (!_obj || !_obj.vo || !_obj.vo.master_id) return;
            delete this._rideMap[_obj.vo.master_id.toString()];
            this._scene.removeActor(_obj);
            this.onRemoved(_obj);
        }

        public addObj(obj: BaseSceneObj) {
            if (!obj || !obj.vo) {
                return;
            }
            // if (obj.vo.type == ObjectType.SoulWare) {
            //     let id: Long = (<SoulWareVo>obj.vo).mainId;
            //     this._soulWareMap[id.toString()] = <SoulWare>obj;
            // }
            // else if (obj.vo.type == ObjectType.Gory) {
            //     let id: Long = (<GoryVo>obj.vo).mainId;
            //     this._goryMap[id.toString()] = <Gory>obj;
            // }
            else {
                let id: Long = obj.vo.type == ObjectType.TEAM_PLAYER ? (<GPlayerVo>obj.vo).role_id : obj.vo.entity_id;
                this._objMap[id.toString()] = obj;
            }

            this._scene.addActor(obj);
            this.onObjAdded(obj);
        }

        public removeById(id: Long): boolean {
            //this.removeSoulWare(id);
            return this.removeObj(this.getObj(id));
        }

        // /** 移除灵器*/
        // public removeSoulWare(id: Long) {
        //     this.removeObj(this.getSoulWare(id));
        // }

        public removeObj(obj: BaseSceneObj): boolean {
            if (obj && obj.vo) {
                let id: Long;
                // if (obj.vo.type == ObjectType.SoulWare) {
                //     id = (<SoulWareVo>obj.vo).mainId;
                //     if (id) {
                //         delete this._soulWareMap[id.toString()];
                //     }
                // }
                // else if (obj.vo.type == ObjectType.Gory) {
                //     id = (<GoryVo>obj.vo).mainId;
                //     if (id) {
                //         delete this._goryMap[id.toString()];
                //     }
                // }
                // else {
                    id = obj.vo.entity_id;
                    if (id) {
                        delete this._objMap[id.toString()];
                    }
                //}
                if (!id) {
                    // console.error("移除没有实体id objType:", obj.vo.type);
                    return false;
                }
                if (obj.vo.type == ObjectType.MONSTER) {
                    let actor: BaseActor = <BaseActor>obj;
                    if (actor.isDying // 技能表现玩就死亡
                        || actor.isDead  //当前动作是死亡，而且还没有完成
                    ) {
                        actor.dieDel = true;
                        return true;
                    }
                }
                if (obj instanceof BaseActor && obj._shadow && !(obj instanceof MainGPlayer)) {
                    Pool.release(obj._shadow);
                    if (obj._shadow.dsp && obj._shadow.dsp.parent) {
                        obj._shadow.dsp.parent.removeChild(obj._shadow.dsp);
                    }
                    obj._shadow = null;
                }
                this._scene.removeActor(obj);
                this.onRemoved(obj);
                return true;
            }
            return false;
        }

        public addGhost(obj: BaseSceneObj) {
            let self = this;
            self._ghostIdx += 1;
            let idx: string = obj["_idx"] = self._ghostIdx.toString();
            self._ghost[idx] = obj;
            self._scene.addActor(obj);
            this.onObjAdded(obj);
        }

        public removeGhost(obj: BaseSceneObj) {
            let idx: string = obj["_idx"];
            delete this._ghost[idx];
            this._scene.removeActor(obj);
            this.onRemoved(obj);
        }

        /** SceneDebug */
        public addDebugObj(obj: BaseSceneObj) {
            if (DEBUG) {
                if (!obj || !obj.vo) {
                    return;
                }
                let id = obj.vo.type == ObjectType.TEAM_PLAYER ? (<GPlayerVo>obj.vo).role_id : obj.vo.entity_id;
                this.objDebugMap[id.toString()] = obj;
                this._scene.addActor(obj);
            }
        }

        /** SceneDebug */
        public removeDebugById(id: Long | string): boolean {
            if (DEBUG) {
                let obj = this.objDebugMap[id.toString()];
                delete this.objDebugMap[id.toString()];
                this._scene.remove(obj);
            }
            return false;
        }

        /** SceneDebug */
        public removeDebugAll() {
            if (DEBUG) {
                let list = Object.keys(this.objDebugMap);
                for (let i = 0, len = list.length; i < len; i++) {
                    this.removeDebugById(list[i]);
                }
            }
        }

        public dispose(): void {
            this._scene = null;
            this._objMap = null;
            this._rideMap = null;
            if (DEBUG) {
                this.objDebugMap = null;
            }
            this.onDispose();
        }

        protected onInit(): void {
        }

        protected onObjAdded(obj: BaseSceneObj): void {
        }

        protected onRemoved(obj: BaseSceneObj): void {
        }

        protected onDispose(): void {
        }

    }
}
