namespace game.scene {

    import Handler = base.Handler;
    import delayCall = base.delayCall;
    import clearDelay = base.clearDelay;
    import Point = egret.Point;
    import Pool = base.Pool;
    import GDirUtil = game.utils.GDirUtil;
    import SkillShowConfig = game.config.SkillShowConfig;
    import Direction = game.Direction;
    import SceneUtil = game.mod.SceneUtil;

    export class AttackAct extends BaseAct {

        public actType: number[];
        private _idx: number;
        private _atkEft: string;
        private _skillEft: string;
        private _dir: number;
        private _list: SkillEffectVo[];

        private _timeoutKey: number = 0;

        private _eftListTimeOut: number = 0;

        private _focusPt: Point;
        //private _isAdventGodAtk: boolean;

        public get idx() {
            return this._idx;
        }

        public setData(idx: number, actIdx: number[], dir: number, list: SkillEffectVo[], focusPt?: Point) {
            if (this._list) {
                this.clearList();
            }
            let cfg = SkillData.getCfg(idx);
            let showCfg: SkillShowConfig = SkillData.getEffCfg(cfg.skillshow);
            this._idx = idx;
            this._list = list;
            // this._isAdventGodAtk = _isAdventGodAtk;
            // if (this._actor) {
            //     this._actor.isAdventGodAtk = _isAdventGodAtk;
            // }
            if (showCfg) {
                if (showCfg.res && showCfg.isrotate == 1) {
                    let urlDir = MirDir[dir] ? MirDir[dir] : dir;
                    this._skillEft = `${showCfg.res}_${urlDir}`;
                } else {
                    this._skillEft = showCfg.res;
                }
                this._atkEft = showCfg.act_effect;//[actIdx[0]]
            }
            this.actType = actIdx;
            if (this.actType == undefined) {
                console.debug("攻击动作错误,技能index=" + idx, "actIdx=" + actIdx);
                this.actType = [1];
            }
            this._dir = dir;
            this._focusPt = focusPt;
        }

        protected onStart(): void {
            super.onStart();
            let self = this;
            self._actor.onAttackStart(self.actType, self._dir, self._atkEft);
            if (self._actor == null) return;
            let x = self._actor.x;
            let y = self._actor.y;
            let dir = self._actor.dir;
            let isMainPlayer = self._actor instanceof MainGPlayer;
            if (self._atkEft && SceneTools.isShowEft(isMainPlayer)) {
                this.playCastEft()
            }
            let cfg = SkillData.getCfg(this._idx);
            let atkCfg: SkillShowConfig = SkillData.getEffCfg(cfg.skillshow);
            self._timeoutKey = delayCall(Handler.alloc(self, self.onAtkTimeOut), Math.max(cfg.next_cd, 3000));
            if (self._list) {
                // self._eftListTimeOut = delayCall(Handler.alloc(self, self.eftList), 300);
                self.eftList();
            }
            if (SceneTools.isShieldingSkillEft(self._actor)) {
                return;
            }
            if (self._skillEft && SceneTools.isShowEft(isMainPlayer)) {
                // if (atkCfg.focus == 1 && this._focusPt) {
                //     x = this._focusPt.x;
                //     y = this._focusPt.y;
                // }
                if(this._focusPt){
                    if(atkCfg.focus == 1){
                        x = this._focusPt.x;
                        y = this._focusPt.y;
                    }else if(atkCfg.focus == 3 && isMainPlayer){
                        //在屏幕中间释放
                        y =  y-CameraOffsetY;
                        dir = 0;
                    }else if(atkCfg.focus == 4 && isMainPlayer){
                        //脚底下
                    } else{
                        y = y - 80;
                    }
                }

                // if (OffYEft.indexOf(self._skillEft) > -1) {
                //     y -= 30;
                // }

                let scale = 1;
                // if (NoScaleSurface.indexOf(self._actor.avatar.resType) == -1) {
                //     scale *= gso.avatarScale;
                // }

                // console.log("x = " + x);
                // console.log("y = " + y);
                // console.log("CameraOffsetY = " + CameraOffsetY);
                // console.log("MainGPlayer.ins.x = " + MainGPlayer.ins.x);
                // console.log("MainGPlayer.ins.y = " + MainGPlayer.ins.y);

                if(self._skillEft != "0"){
                    SkillEftMgr.ins.showGroupEft(self._skillEft, x, y, dir, atkCfg, self._actor, null,scale);
                }
            }
            if (atkCfg && atkCfg.sound && atkCfg.sound.trim() != "") {
                let soundSrc = ResUtil.getSoundUrl(atkCfg.sound);
                SoundMgr.ins.playEffect(soundSrc);
            }
        }


        public onEffCom() {
            clearDelay(this._timeoutKey);
            this._timeoutKey = 0;
            this.done();
        }

        private onAtkTimeOut() {
            if (this.isDone) {
                return;
            }
            this.onEffCom();
        }

        private eftList() {
            if (!this._list) {
                return;
            }
            if (this._actor && this._actor.vo) {
                let scene = this._actor.parent as Scene;
                if (!scene) return;
                // if (this._actor.vo.type == ObjectType.MONSTER && scene && scene.sceneType == SceneType.HangUp) { //挂机场景不显示怪物攻击飘字
                //     this.clearList();
                //     return;
                // }
                let dir = MathUtil.randomDir(Direction.NONE);
                for (let e of this._list) {
                    e = (e as SkillEffectVo);
                    if (!e.target || !e.target.vo) {
                        continue;
                    }
                    if (e.is_dead) {
                        e.target.killBy(this._actor);
                    }
                    if (!e.is_dead && e.push_x) {
                        if (MapData.ins.isPointLegal(e.push_x, e.push_y)) {
                            let p = Scene.findPath(e.target.vo.x, e.target.vo.y, e.push_x, e.push_y);
                            e.target.movePath(p, null, MoveType.Back);
                        }
                    }
                    if (!e.is_dead && this._actor instanceof MainGPlayer && e.target.vo.type == ObjectType.MONSTER) {
                        let dir;
                        if ((<MonsterVo>e.target.vo).monsterType == MonsterType.Boss) {
                            dir = GDirUtil.reversalDir(e.target.dir);
                        } else {
                            dir = this._actor.dir;
                        }
                        e.target.hit(dir);
                    }
                    if (!e.b_value || e.b_value.length == 0) {
                        continue;
                    }
                    //let dir = MathUtil.randomDir(e.target.dir);
                    let delay: number = e.skillCfg.delay || 250;// 2000;
                    for (let i = 0, l = e.b_value.length; i < l; ++i) {
                        let v = e.b_value[i];
                        let type = v.value_type;

                        if (e.target instanceof MainGPlayer) {//角色搜到伤害飘字
                            this.roleBeAttack(v.value.toString(), e.target.x, e.target.y, dir, type, delay * i,e.target);
                            continue;
                        }

                        if (this.isShowDmgTxt(e.target_id)) {
                            //属性伤害飘字
                            STxtMgr.ins.show(v.value.toString(), e.target.x, e.target.y, dir, type, delay * i,e.target);
                        }
                        if (e.target instanceof Monster && e.target.vo.monsterType == MonsterType.Common) {
                            e.target.decreaseHp(v.value);
                        }
                    }


                    //查找问题代码，估计比较常用，暂时不删除
                   // let ret = false;
                   //
                   //  for(let i = 0; i < e.b_value.length; i++){
                   //      let v = e.b_value[i];
                   //      let type = v.value_type;
                   //      if(type.indexOf(9) > -1){
                   //          ret = true;
                   //          break;
                   //      }
                    //}

                    // if(ret) {
                    //     console.error("e.b_value.length = " + e.b_value.length);
                    //     for (let i = 0; i < e.b_value.length; i++) {
                    //         let v = e.b_value[i];
                    //         let type = v.value_type;
                    //         console.error("type  = " + type.toString());
                    //         console.error("value  = " + v.value.toNumber());
                    //     }
                    //     let pp = 90;
                    // }
                }
            }
            this.clearList();
        }

        private roleBeAttack(v: string, x: number, y: number, dir: number, types: number[], delay: number,target:BaseActor) {
            for(let i = 0; i < types.length;i++){
                if(types[i] == BmpTextType.ATK){
                    types[i] = BmpTextType.ROLE_ATK;
                }
            }
            STxtMgr.ins.show(v, x, y, dir, types, delay,target);
        }

        private isShowDmgTxt(targetId: Long): boolean {
            if (!this._actor) {
                return false;
            }
            //怪物打玩家
            if (this._actor instanceof Monster && !SceneTools.isMainPlayer(targetId)) {
                return false;
            }
            //伙伴输出
            if (this._actor instanceof Partner && this._actor.vo.isMainPet) {
                return true
            }
            //
            if (!(this._actor instanceof Monster) && !SceneTools.isMainPlayer(this._actor.vo.entity_id) && !SceneTools.isMainPlayer(targetId)) {
                return false;
            }
            return true;
        }

        private clearList() {
            SkillEffectVo.releaseList(this._list);
            this._list = null;
        }

        protected onDone(): void {
            super.onDone();
            if (this._actor) {
                this._actor.onAttackEnd();
            }
        }

        protected onAbort(): void {
            super.onAbort();
            if (this._actor) {
                this._actor.onAttackEnd();
            }
        }

        public onRelease(): void {
            let self = this;
            clearDelay(self._eftListTimeOut);
            self._eftListTimeOut = 0;
            if (this._list) {
                this.eftList();
            }
            clearDelay(self._timeoutKey);
            self._timeoutKey = 0;
            self._atkEft = null;
            self._skillEft = null;
            self._dir = null;
            Pool.release(self._focusPt);
            self._focusPt = null;
            super.onRelease();
        }

        private playCastEft(): void {
            let showCfg: SkillShowConfig = SkillData.getEffCfg(this._idx);
            if (!showCfg) {
                return;
            }
            let self = this;
            let x = self._actor.x;
            let y = self._actor.y;
            let dir = self._actor.dir;
            let scale = 1;
            if (NoScaleSurface.indexOf(self._actor.avatar.resType) == -1) {
                scale = gso.avatarScale;
            }
            SkillEftMgr.ins.showAtkEft(self._atkEft, x, y, dir, Handler.alloc(self, self.onEffCom), scale,showCfg.layer);
            // SkillEftMgr.ins.showCastEft(self._castEft, x, y, dir, self._actor, null, isRotate, eft_group_key);
        }
    }
}
