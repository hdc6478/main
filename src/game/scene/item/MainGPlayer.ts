namespace game.scene {

    import Point = egret.Point;
    import TimeMgr = base.TimeMgr;
    import Pool = base.Pool;
    import Tween = base.Tween;
    import facade = base.facade;
    import GDirUtil = game.utils.GDirUtil;
    import ISceneProxy = game.mod.ISceneProxy;
    import SceneUtil = game.mod.SceneUtil;

    //主角
    export class MainGPlayer extends GPlayer {

        /** 闲置时间 */
        public standTime: number = 0;
        /** 是否遥感移动 */
        public isControlMove: boolean = false;

        private _requestCnt: number = 0;
        private _lastRequestTime: number = 0;


        private static _moveTmp: any = {};
        private static _ins:MainGPlayer;

        constructor() {
            super();
            MainGPlayer._ins = this;
        }

        public static get ins():MainGPlayer{
            return MainGPlayer._ins;
        }

        public static delIns():void {
            MainGPlayer._ins = null;
        }

        public get vo(): MainGPlayerVo {
            return <MainGPlayerVo>this._vo;
        }

        public set vo(value: MainGPlayerVo) {
            this._vo = value;
        }

        public advanceTime(elapseTime: number): void {
            super.advanceTime(elapseTime);
            let self = this;
            if (!self.vo.isAutoHangUp) {
                self.standTime += elapseTime;
                if (self.standTime >= 15000) {
                    self.standTime = 0;
                    facade.sendNt(SceneEvent.SET_HANG_UP, true);
                }
            }
        }

        public set act(value: string) {
            if (!value) {
                return;
            }
            if (this._act == ActionName.RUN && this.isControlMove && value == ActionName.STAND) {
                return;
            }
            this._act = value;
            this.avatar.setAct(value);
        }

        public get act(): string {
            return this._act;
        }

        // public setAdTitle(type: s2c_ad_limit_gift_info) {
        //     if (this._headMgr) {
        //         this._headMgr.setAdTitle(type);
        //     }
        // }

        updateAvatarClose(): void {

        }

        public updateVo(): void {
            super.updateVo();
            //console.log("MainGPlayer updateVo");
            let self = this;
            let startX = self.x;
            let offX = self.dir < Direction.DOWN ? -110 : 110;
            // SkillEftMgr.ins.showGroupEft(EnterPortal, self.x + offX, self.y, self.dir); //传送门效果
            self.scale = 0.2;
            self.x = self.x + offX;
            Tween.get(self).delay(300).to({scale: 1, x: startX}, 500);
            RoleVo.ins.entity_id = this.vo.entity_id;
            // this.setFlag(null);
        }

        public get x(): number {
            return this._dsp.x;
        }

        public set x(value: number) {
            this._dsp.x = value;
        }

        public get y(): number {
            return this._dsp.y;
        }

        public set y(value: number) {

            if (this._dsp.y == value) {
                return;
            }


            this._dsp.y = value;

        }

        // protected onCreditLvUpdate(): void {
        //     super.onCreditLvUpdate();
        //     if (this.vo.credit_lv) {
        //         // this.headMgr.setRepuNameColor(UIColor.ORANGE);
        //     }
        // }

        protected onTeamNameUpdate(): void {
            super.onTeamNameUpdate();
            // if (this.vo.guild_team_id && this.vo.guild_team_name && this.vo.guild_team_name.trim() != "") {
            //     // this.headMgr.setRepuNameColor(UIColor.ORANGE);
            // }
        }

        public onNameChanged(): void {
            super.onNameChanged();
            if (this._headMgr && this.vo.name) {
                this.headMgr.setNameColor(UIColor.GREEN);
            }
        }

        public setAdTitle(lv: number) {
            if (this._headMgr) {
                this._headMgr.setAdTitle(lv);
            }
        }

        // protected onMarryNameUpdate(): void {
        //     super.onMarryNameUpdate();
        //     if (this._headMgr) {
        //         this._headMgr.setPartnerNameColor(UIColor.ORANGE);
        //     }
        // }

        public requestMonster() {
            if (!this.vo.isAutoHangUp) {
                return;
            }
            if (!SceneTools.isSelfReady(this.vo)) {
                return;
            }
            let t = TimeMgr.time.serverTimeSecond;
            let s = (<Scene>this.parent);
            if (t - this._lastRequestTime < 5 || this._requestCnt >= 5) {
                return;
            }
            this._requestCnt++;
            this._lastRequestTime = t;
            s.dispatcher.dispatchEventWith(SceneEvent.ON_REQUEST_MONSTER, false);
        }

        public clearRequestStatus(): void {
            this._requestCnt = 0;
            this._lastRequestTime = 0;
        }

        private _sprintPt1: Point;
        private _sprintPt2: Point;
        private _sprintPath: Point[];

        public onStartSprint(sx: number, sy: number, ex: number, ey: number): void {
            if (!this._sprintPath) {
                this._sprintPath = [this._sprintPt1 = Pool.alloc(Point), this._sprintPt2 = Pool.alloc(Point)];
            }
            this._sprintPt1.setTo(sx, sy);
            this._sprintPt2.setTo(ex, ey);
            this.act = ActionName.JUMP + 3;
            this.doMove(this._sprintPath, MoveType.Sprint);
        }

        public onChangeMoveByPath(path: { x: number, y: number }[], moveType: number = MoveType.Find) {
            this.doMove(path, moveType);
        }

        public attack(idx: number, actIdx: number[], dir: number, list: SkillEffectVo[], focusPt: Point): void {
            let self = this;
            self.standTime = 0;
            //console.log("前端主角 MainGPlayer attack ");
            super.attack(idx, actIdx, dir, list, focusPt);
        }

        public showCommonAtkEfect():void{
            let param:any = {};
            //let rotation = 0;
            // let rotation = -45;
            // let isRotate = false;
            // switch (this.dir) {
            //     case  Direction.LEFT_UP:
            //         rotation = -115;
            //         isRotate = true;
            //         break;
            //     case  Direction.LEFT_DOWN:
            //         rotation = 115;
            //         break;
            //     case  Direction.RIGHT_UP:
            //         rotation = -65;
            //         isRotate = false;
            //         break;
            //     case  Direction.RIGHT_DOWN:
            //         rotation = 65;
            //         break;
            // }

            //SkillEftMgr.ins.showSkillEft("210101000",this.x,this.y-100,rotation,param);

            //showGroupEft(eftId: string, x: number, y: number, dir: number, shakeCfg?: number[], actor?: BaseActor, cb?: Handler, isRotate?: b
            SkillEftMgr.ins.showGroupEft("pg_1",this.x,this.y-100,this.dir,null,null,null);

            // SkillEftMgr.ins.showSkillEft("210101000",this.x,this.y-50,-45,test);
            // SkillEftMgr.ins.showSkillEft("210101000",this.x,this.y-50,-135,test);
            // SkillEftMgr.ins.showSkillEft("210101000",this.x,this.y-50,45,test);
            // SkillEftMgr.ins.showSkillEft("210101000",this.x,this.y-50,135,test);
        }

        public setWorldPos(wx: number, wy: number): void {
            super.setWorldPos(wx, wy);
            if (wx <= 0 || wy <= 0) {
                console.error("人物移到场景外！", wx, wy, this.vo.x, this.vo.y);
            }

            //console.log("MainGPlayer setWorldPos wx = "+wx);
            //console.log("MainGPlayer setWorldPos wy = "+wy);

            let scene: Scene = <Scene>this.parent;
            // let sw: SoulWare = scene.ctrl.getSoulWare(this.vo.entity_id);
            // if (sw) {
            //     sw.setWorldPos(wx, wy);
            // }
            // 是否为主视角
            // if (SceneTools.isFocusEntity(this.vo.entity_id)) {
            if (!SceneUtil.isPvpScene()) {
                scene.updateFocus(wx, wy);
                scene.updateShakeFocusPt();
            }
        }

        public onMoveStart(): void {
            super.onMoveStart();
            this.standTime = 0;
            let self = this;
            let moveAct = <MoveAct>self._actMgr.curAct;
            let mType = moveAct.moveType;
            if (mType == MoveType.Find) {
                mType = MoveType.Normal;
            }
            if (moveAct.path.length < 2) {
                console.error("自己移动路径错误！");
            }
            this.doMove(moveAct.path, mType);
        }

        public doMove(p: { x: number, y: number }[], mType: number) {
            let t = MainGPlayer._moveTmp;
            t.path = p;
            t.mType = mType;
            (<Scene>this.parent).dispatcher.dispatchEventWith(SceneEvent.ON_MAIN_MOVE, false, t);
            delete t.path;
            delete t.mType;
        }

        public setTilePos(tx: number, ty: number, updateWorld: boolean = true): void {
            super.setTilePos(tx, ty, updateWorld);
            if (DEBUG) {
                if (gso.test_mask == "1") {
                    this._headMgr.setName(tx + "," + ty);
                }
            }
        }

        public onDie(): void {
            (<Scene>this.parent).removeShake();
            //(<Scene>this.parent).ctrl.removeSoulWare(this.vo.entity_id);
            super.onDie();
        }

        public onDieEnd(): void {
            //主角死后不移除
        }

        public onAlloc(): void {
            super.onAlloc();
            this.avatar.loadPri = LoadPri.SceneMain;
        }

        public onRelease(): void {
            let s = this;
            Tween.remove(s);
            s._sprintPath = undefined;
            Pool.release(s._sprintPt1);
            s._sprintPt1 = null;
            Pool.release(s._sprintPt2);
            s._sprintPt2 = null;
            super.onRelease();
        }

        /***********************化神相关的***************************/
        protected onHuashenUpdate(): void {
            super.onHuashenUpdate();
            let curId = this.vo && this.vo.the_god;
            facade.sendNt(HuashenEvent.ON_SCENE_HUASHEN_ID, curId);
        }

    }
}
