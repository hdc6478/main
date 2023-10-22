namespace game.scene {

    import Handler = base.Handler;
    import TitleConfig = game.config.TitleConfig;
    import Pool = base.Pool;
    import Point = egret.Point;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import ISceneProxy = game.mod.ISceneProxy;
    import facade = base.facade;
    import SceneUtil = game.mod.SceneUtil;
    import SceneConfig = game.config.SceneConfig;
    import Image = eui.Image;
    import Rectangle = egret.Rectangle;
    import HorseConfig = game.config.HorseConfig;
    import HuashenConfig = game.config.HuashenConfig;

    //玩家
    export class GPlayer extends BaseActor {

        private _avatarOrigScale:number;
        protected _huaShengOffY:number = 30;

        constructor() {
            super();
            this._enType = ObjectType.PLAYER;
        }

        public get vo(): GPlayerVo {
            return <GPlayerVo>this._vo;
        }

        public set vo(value: GPlayerVo) {
            this._vo = value;
        }

        public closeAvatar(): void {
            this.avatar.close = false;
        }

        public updateAvatarClose(): void {
            this.avatar.close = gso.maskOthers;
        }

        public updateVo(): void {
            super.updateVo();
            let vo: GPlayerVo = <GPlayerVo>this.vo;
            if (!vo) {
                return;
            }
            if (vo.percent != undefined) {
                this._headMgr.setHp(vo.percent);
            }
            this.avatar.objType = ObjectType.PLAYER;
            this.updateAvatarClose();

            this.onTitleUpdate();

            this.onPlayerUpdate();
            this.onTeamNameUpdate();
            this.onCampUpdate();
            this.onUpdateMaxHp();
        }

        protected initUpdateCb(): void {
            super.initUpdateCb();
            // this.regUpdateCb("ride", this.onRideUpdate);
            this.regUpdateCb("wing", this.onWingUpdate);
            this.regUpdateCb("weapon", this.onWeaponUpdate);
            this.regUpdateCb("fashion", this.onBodyUpdate);
            this.regUpdateCb("sex", this.onBodyUpdate);
            this.regUpdateCb("title_index", this.onTitleUpdate);
            this.regUpdateCb("title_star", this.onTitleUpdate);
            this.regUpdateCb("camp", this.onCampUpdate);
            // this.regUpdateCb("guild_team_name", this.onTeamNameUpdate);
            //this.regUpdateCb("guild_team_id", this.onTeamNameUpdate);
            this.regUpdateCb("max_hp", this.onUpdateMaxHp);
            this.regUpdateCb("ride_state", this.onRideUpdate);
            this.regUpdateCb("ride", this.onHorseUpdate);
            this.regUpdateCb("mate_id", this.onMarryNameUpdate);
            this.regUpdateCb("level", this.onUpdateLevel);
            //化神
            this.regUpdateCb("the_god", this.onHuashenUpdate);
        }


        public advanceTime(elapseTime: number): void {
            super.advanceTime(elapseTime);
        }


        protected attackStart(type: number, dir: number, eftId: string) {
            let self = this;
            if (!eftId) {
                self.avatar.loop = false;
                self.avatar.onComplete = Handler.alloc(self, self.onAnimComp);
            }
            self.avatar.resetActDir();
            if (type == 8) {//8类型只有一个方向
                dir = MirDir[dir] != null ? Direction.LEFT : Direction.RIGHT;
            }
            self.act = ActionName.ATTACK + type;
            self.dir = dir;
        }

        public attack(idx: number, actIdx: number[], dir: number, list: SkillEffectVo[], focusPt: Point): void {
            //let cfg: BattleSkillConfig = SkillData.getCfg(idx);
            // let _isAdventGodAtk: boolean = false;
            // if (cfg) {
            //     _isAdventGodAtk = cfg && cfg.type1 === 32;
            // }
            this.dir = dir;
            // if (cfg.type1 == SkillType.YuLing) {
            //     let scene = this.parent as Scene;
            //     let gory = scene.ctrl.getGory(this.vo.entity_id);
            //     if (gory) {
            //         gory.attack();
            //     }
            // }
            super.attack(idx, actIdx, dir, list, focusPt);
        }

        public onPlayerUpdate(): void {
            let self = this;
            self.onBodyUpdate();
            self.onWingUpdate();
            self.onRideInit();
            self.onWeaponUpdate();
            self.updateHeadMgrY();
            self.onHuashenUpdate();
            //self.onUpdateSoulWare();
            //self.onUpdateGory();
            //self.onYsUpdate()
        }

        public onCampUpdate(): void {
            // this.onCreditLvUpdate();
            this.onNameChanged();
        }

        protected onMarryNameUpdate(): void {
            if (this.vo.mate_id.neq(Long.fromValue(0))) {
                let color = SceneTools.isEnemy(this.vo) ? UIColor.RED : UIColor.WHITE;
                this._headMgr.setPartnerName(this.vo.mate_name + "的伴侣", color);
            } else {
                this._headMgr.removeParnerName();
            }
            if (this._headMgr) {
                this._headMgr.setPartnerNameColor(UIColor.ORANGE);
            }
        }

        protected jumpAction: number = 2;

        public onMoveStart(): void {
            let self = this;
            let moveAct = <MoveAct>self._actMgr.curAct;
            let mType = moveAct.moveType;
            // if (self.vo.ride && self.vo.ride_state == 1) {
            //     self.act = ActionName.RIDE;
            //     return;
            // }
            if (self.act != ActionName.RUN && (mType == MoveType.Normal || mType == MoveType.Find)) {
                self.act = ActionName.RUN;
                return;
            }

            if (mType == MoveType.Sprint) {
                self.act = ActionName.JUMP + 3;
            } else if (mType == MoveType.Jump) {
                self.jumpAction = self.jumpAction == 1 ? 2 : 1;
                self.act = ActionName.JUMP + self.jumpAction;
            }
        }

        protected onReborn(): void {
            super.onReborn();
            this.onPlayerUpdate();
            // this.onWeaponUpdate();
            // this.onWingUpdate();
            //this.onUpdateSoulWare();
            //this.onUpdateGory();
            //this.onYsUpdate()
        }

        private onBodyUpdate(): void {
            let vo: GPlayerVo = <GPlayerVo>this.vo;
            if (vo.fashion) {
                let bodySrc = ResUtil.getModelName(vo.fashion, vo.sex);
                this.setBody(bodySrc);
            }
        }

        private onTitleUpdate(): void {
            let vo: GPlayerVo = <GPlayerVo>this.vo;
            let cfg: TitleConfig = getConfigById(vo.title_index);
            if (vo.title_index > 0 && cfg) {
                let title = ResUtil.getTitleSrc(vo.title_index, vo.title_star);
                this._headMgr.setTitle(title);
            } else {
                this._headMgr.removeTitle();
            }
        }

        /**战盟信息/队伍*/
        protected onTeamNameUpdate(): void {
            let scene = this.parent as Scene;
            // if (this.vo.guild_team_id && this.vo.guild_team_name && this.vo.guild_team_name.trim() != "")
            // if (this.vo.guild_team_id && this.vo.guild_team_id.gt(0)) {
            //     // let color = SceneTools.isEnemy(this.vo, scene.sceneType) ? UIColor.RED : UIColor.WHITE;
            //     // this._headMgr.setRepuName(this.vo.guild_team_name, color);
            //     this._headMgr.setTeamName(this.vo.guild_team_name);
            // } else {
            //     this._headMgr.setTeamName("");
            // }
        }

        /** 设置巅峰对决棋子显示*/
        public setFlagShow(src: string) {
            if (!this._headMgr) return;
            this._headMgr.setFlagShow(src);
        }

        public onRemoveFlag() {
            if (!this._headMgr) return;
            this._headMgr.removeFlag();
        }

        public onWeaponUpdate(): void {
            let vo: GPlayerVo = <GPlayerVo>this.vo;
            let weaponIdx = vo.weapon;
            if (weaponIdx) {
                let weaponSrc: string = ResUtil.getModelName(weaponIdx);
                this.setWeapon(weaponSrc);
            } else {
                this.setWeapon(null);
            }
        }

        /** 灵器*/
        // public onUpdateSoulWare() {
        //     let vo: GPlayerVo = <GPlayerVo>this.vo;
        //     let soulWare: number = vo.faqi;
        //     if (soulWare) {
        //         let scene = this.parent as Scene;
        //         let sw: SoulWare = scene.ctrl.getSoulWare(vo.entity_id);
        //         if (sw) {
        //             sw.vo.index = soulWare;
        //             sw.onIndexUpdate();
        //         } else {
        //             let sw = Pool.alloc(SoulWare);
        //             let swVo = new SoulWareVo(ObjectType.SoulWare);
        //             swVo.mainId = vo.entity_id;
        //             swVo.index = soulWare;
        //             swVo.x = vo.x;
        //             swVo.y = vo.y + 1;
        //             sw.vo = swVo;
        //             scene.addObj(sw);
        //         }
        //     }
        // }

        /** 御灵 */
        // public onUpdateGory() {
        //     let vo: GPlayerVo = <GPlayerVo>this.vo;
        //     let gory: number = vo.yuling;
        //     if (gory) {
        //         // 设置模型
        //         // let gorySrc: string = ResUtil.getSurfaceSrc(gory);
        //         // this.setGory(gorySrc);
        //
        //         // 设置实体
        //         let scene = this.parent as Scene;
        //         let g: Gory = scene.ctrl.getGory(vo.entity_id);
        //         if (g) {
        //             g.vo.index = gory;
        //         } else {
        //             let g = Pool.alloc(Gory);
        //             let gVo = new GoryVo(ObjectType.Gory);
        //             gVo.mainId = vo.entity_id;
        //             gVo.index = gory;
        //             gVo.x = vo.x;
        //             gVo.y = vo.y;
        //             g.vo = gVo;
        //             scene.addObj(g);
        //         }
        //     }
        // }

        private onWingUpdate(): void {
            let vo: GPlayerVo = <GPlayerVo>this.vo;
            if (vo.wing) {
                let wingSrc: string = ResUtil.getModelName(vo.wing);
                this.setWing(wingSrc);
            }
        }

        private onRideInit() {
            if (this.vo.ride_state == 1 && this.vo.ride) {
                let cfg: HorseConfig = getConfigById(this.vo.ride);
                let rideSrc: string = cfg.icon;
                this.setHorse(rideSrc, cfg && cfg.is_double == 1);
                this.setWeapon(null);
            } else {
                this.setHorse(null);
                this.onWeaponUpdate();
            }
        }

        public onRideUpdate(): void {
            let self = this;
            let sceneCfg: SceneConfig = SceneUtil.getCurSceneCfg();
            if (sceneCfg.riding_warfare) {
                if (self.vo.ride_state == 1) {
                    self.rideStart();
                } else {
                    self.rideOff();
                    self.setHorse(null);
                }
            } else {
                self.setHorse(null);
            }

        }

        private onHorseUpdate() {
            if (!this.vo || this.vo.ride_state != 1) {
                return;
            }
            let cfg: HorseConfig = getConfigById(this.vo.ride);
            let rideSrc: string = cfg.icon;
            this.setHorse(rideSrc, cfg && cfg.is_double == 1);
        }

        private rideStart() {
            let self = this;
            let _scene = self.parent as Scene;
            let _ride: Ride = _scene.ctrl.getRide(this.vo.entity_id) == null ? Pool.alloc(Ride) : _scene.ctrl.getRide(this.vo.entity_id);
            _ride.onStar(self.vo.entity_id, Handler.alloc(this, this.onRide), _scene)
        }

        private rideOff() {
            let self = this;
            let _scene = self.parent as Scene;
            let _ride: Ride = _scene.ctrl.getRide(this.vo.entity_id) == null ? Pool.alloc(Ride) : _scene.ctrl.getRide(this.vo.entity_id);
            _ride.onOff(self.vo.entity_id, Handler.alloc(this, this.onRide), _scene)
        }

        public getRideObj(): Ride {
            let self = this;
            let scene = self.parent as Scene;
            let map = scene.ctrl.getObjMap();
            let list: string[] = Object.keys(map);
            for (let i = 0, len = list.length; i < len; i++) {
                let obj = map[list[i]];
                if (obj instanceof Ride && obj.vo.buddy_type == PetType.Ride && obj.vo.master_id.eq(self.vo.entity_id)) {
                    return obj;
                }
            }
            return null
        }

        private onRide(ride: Ride, isStar: boolean) {
            let _scene = this.parent as Scene;
            if (_scene && _scene.ctrl) {
                _scene.ctrl.removeRide(ride);
            }
            // if (isStar && this.avatar) {
            //     this._act = ActionName.STAND;
            //     this.avatar.setAct(ActionName.STAND);
            // }
            if (ride) {
                ride.isPlayGhost = null
            }
            this.onHorseUpdate();
            // ride.isShowAvatar(isStar)
        }

        protected changeHpShow(): void {
            if (this._headMgr && this.vo.percent != undefined) {
                this._headMgr.setHp(this.vo.percent);
            }
        }

        protected onUpdateMaxHp() {
            if (this._headMgr && this.vo.max_hp != undefined) {
                this._headMgr.setGridHp(this.vo.max_hp);
            }
        }

        public onUpdateLevel() {
            // this.addBottomEft(UIEftSrc.LvBottomUp, 0, -120);
            // this.addEft(UIEftSrc.LvUp, 0, -150,2);//特效强制向右边展示
        }

        public setHorse(id: string, isHorse2?: boolean): void {
            this.avatar.setPart(ConfigHead.Horse, id);
            if (isHorse2) {
                this.avatar.setPart(ConfigHead.Horse2, id);
            } else {
                this.avatar.setPart(ConfigHead.Horse2, null);
            }
        }

        public setWeapon(id: string): void {
            if (this.act.indexOf(ActionName.DIE) > -1 && id != null) {
                return;
            }
            this.avatar.setPart(ConfigHead.Weapon, id);
        }

        public setWing(id: string): void {
            if (this.act.indexOf(ActionName.DIE) > -1 && id != null) {
                return;
            }
            this.avatar.setPart(ConfigHead.Wing, id);
        }

        // public setGory(id: string): void {
        //     if (this.act.indexOf(ActionName.DIE) > -1 && id != null) {
        //         return;
        //     }
        //     this.avatar.setPart(SurfaceType.Gory, id);
        // }

        // public onYsUpdate(): void {
        //     let self = this;
        //     let vo: GPlayerVo = <GPlayerVo>this.vo;
        //     if (vo.yuanshen_idx) {
        //         //let src: string = ResUtil.getSurfaceSrc(vo.yuanshen_idx);
        //         //self.setAdventGod(src);
        //     } else {
        //         self.setAdventGod(null);
        //     }
        // }

        // public setAdventGod(id: string): void {
        //     if (this.act.indexOf(ActionName.DIE) > -1 && id != null) {
        //         return;
        //     }
        //     this.avatar.setPart(SurfaceType.AdventGod, id);
        // }

        // public movePath(path: Point[], onMoveEnd?: Handler, moveType?: number,moveTime?:number): void {
        //     // let swPath: Point[] = [];
        //     // for (let item of path) {
        //     //     let p = Pool.alloc(Point);
        //     //     swPath.push(p.setTo(item.x, item.y + 1));
        //     // }
        //     super.movePath(path, onMoveEnd, moveType);
        //     // let scene = this.parent as Scene;
        //     // if (!scene.ctrl) return;
        //     // let sw = scene.ctrl.getSoulWare(this.vo.entity_id);
        //     // if (!sw) return;
        //     // sw.vo.speed = this.vo.speed;
        //     // let handler: Handler;
        //     // if (moveType == MoveType.Sprint && this.vo && this.vo.ride_state == 1) {
        //     //     handler = Handler.alloc(this, () => {
        //     //         let _proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
        //     //         _proxy.scene_ride_oper_c2s(0, this.vo.x, this.vo.y);
        //     //     })
        //     // }
        //     // sw.movePath(swPath, handler, moveType);
        // }

        public onDie(): void {
            this._dying = true;
            this.setWeapon(null);
            this.setWing(null);
            //this.setGory(null);
            super.onDie();
        }

        public onRelease(): void {
            super.onRelease();
        }

        public dispose() {
            let _scene = this.parent as Scene;
            if (_scene && _scene.ctrl) {
                _scene.ctrl.removeRide(this.vo.role_id.toString());
            }
            super.dispose();
        }

        /***********************化神相关的***************************/
        protected onHuashenUpdate(): void {
            if(!this._avatarOrigScale){
                this._avatarOrigScale = this.avatar.dsp.scaleX;
            }

            if (this.vo.the_god) {
                this.setBody(null);
                this.setWing(null);
                this.setWeapon(null);
                this.setHorse(null);
                let cfg: HuashenConfig = getConfigByNameId(ConfigName.Huashen, this.vo.the_god);
                let scale = (cfg.scene_scale || 10000 )/10000;
                this.avatar.dsp.scaleX = scale;
                this.avatar.dsp.scaleY = scale;
                let src: string = cfg.icon;
                this.setHuashen(src, !!cfg.is_double);
            } else {
                this.avatar.dsp.scaleX = this._avatarOrigScale;
                this.avatar.dsp.scaleY = this._avatarOrigScale;
                this.setHuashen(null);
                this.onBodyUpdate();
                this.onWingUpdate();
                this.onWeaponUpdate();
                this.onHorseUpdate();
            }
        }

        //isHuashen2：化神武器
        private setHuashen(id: string, isHuashen2?: boolean) {
            this.avatar.setPart(ConfigHead.Huashen, id);
            if (isHuashen2) {
                this.avatar.setPart(ConfigHead.Huashen2, id);
            } else {
                this.avatar.setPart(ConfigHead.Huashen2, null);
            }
        }
    }
}
