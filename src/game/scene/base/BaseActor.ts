namespace game.scene {

    import Pool = base.Pool;
    import Point = egret.Point;
    import Handler = base.Handler;
    import battle_value = msg.battle_value;
    import delayCall = base.delayCall;
    import ViewMgr = game.mod.ViewMgr;

    export class BaseActor extends BaseSceneObj {
        public avatar: Avatar;
        //public clickArea: BaseClickArea;
        protected _act: string;
        protected _dir: number;
        protected _actMgr: ActMgr;
        protected _headMgr: HeadMgr;
        protected _eftTopMgr: ActorEftMgr;
        protected _eftBottomMgr: ActorEftMgr;
        protected _chatTxt: ChatText;
        protected _taskChatTxt: ChatText;
        protected _dying: boolean;
        public dieDel: boolean = false;
        protected _atkList: number[];
        protected _fixFrame: number;
        protected _enType:number;

        constructor() {
            super();
            this._enType = ObjectType.NONE;
        }

        public get enType(){
            return this._enType;
        }

        public get vo(): ActorVo {
            return <ActorVo>this._vo;
        }

        public set vo(value: ActorVo) {
            this._vo = value;
        }

        protected initUpdateCb(): void {
            super.initUpdateCb();
            this.regUpdateCb("direction", this.onDirChange);
            this.regUpdateCb("percent", this.onHpChanged);
            this.regUpdateCb("ex_hp_percent", this.onHpChanged);
            this.regUpdateCb("speed", this.onSpeedUpdate);
            this.regUpdateCb("name", this.onNameChanged);
            //this.regUpdateCb("buffs", this.onBuffsUpdate);
            // this.regUpdateCb("say_index", this.onChatTxtChanged);
            this.regUpdateCb("camp", this.onCampChanged);
        }

        private _curBuffIdx: number;

        //body 是否显示出来
        public bodyIsShow():boolean{
            return this.avatar && this.avatar.bodyIsShow;
        }

        public setBodyIsShow(ret:boolean):void{
            this.avatar && (this.avatar.bodyIsShow = ret);
        }

        // protected onBuffsUpdate(): void {
        //     if (!this.vo.buffs || this.vo.buffs.length == 0) {
        //         this.clearBuffEft();
        //         return;
        //     }
        //     let showBuff = this.vo.getBuffByType(BuffType.Invincible);
        //     if (showBuff) {
        //         this.showBuffEft(showBuff.buff_index);
        //         return;
        //     }
        //     showBuff = this.vo.getBuffByType(BuffType.Crit);
        //     if (showBuff) {
        //         this.showBuffEft(showBuff.buff_index);
        //         return;
        //     }
        //     this.showBuffEft(null);
        // }

        // private showBuffEft(buffIndex: number) {
        //     if (!buffIndex) {
        //         this.clearBuffEft();
        //         return;
        //     }
        //     if (this._curBuffIdx == buffIndex) {
        //         return;
        //     }
        //     // let src = ResUtil.getBuffEftSrc(buffIndex);
        //     // if (!src) {
        //     //     return;
        //     // }
        //     // this._curBuffIdx = buffIndex;
        //     // this.setBuff(src);
        // }

        // private clearBuffEft() {
        //     this.setBuff(null);
        //     this._curBuffIdx = null;
        // }

        // protected setBuff(src: string) {
        //     this.avatar.setPart(SurfaceType.Buff, src);
        // }

        protected onChatTxtChanged(): void {
            // let self = this;
            // let index = this.vo.say_index;
            // let params = this.vo.say_params;
            // let str: string = getConfigByNameId(ConfigName.ServerTips, index);
            // str = StringUtil.substitute(str, params);
            // if (!str || str.trim() == "") {
            //     self.removeChatTxt();
            // } else {
            //     self.setChatTxt(str);
            // }
        }

        protected setChatTxt(content: string): void {
            let self = this;
            if (!self._chatTxt) {
                self._chatTxt = Pool.alloc(ChatText);
                self._chatTxt.x = 0;
                self.add(self._chatTxt);
            }
            if (!self._chatTxt.parent) {
                self.add(self._chatTxt);
            }
            self._chatTxt.setChatTxt(content);
            self._chatTxt.y = -(self.getBodyHeight() + self._chatTxt.height + 35);
            delayCall(Handler.alloc(self, self.removeChatTxt), 3000);
        }

        protected removeChatTxt(): void {
            if (this._chatTxt && this._chatTxt.parent) {
                this.remove(this._chatTxt);
            }
        }

        public setTaskChatTxt(content: string): void {
            let self = this;
            if (!self._taskChatTxt || !this._taskChatTxt.parent) {
                self._taskChatTxt = Pool.alloc(ChatText);
                self._taskChatTxt.x = 0;
                self.add(self._taskChatTxt);
            }
            self._taskChatTxt.setChatTxt(content);
            self._taskChatTxt.y = -(self.getBodyHeight() + self._taskChatTxt.height - 10);
        }

        public removeTaskChatTxt(): void {
            if (this._taskChatTxt && this._taskChatTxt.parent) {
                this.remove(this._taskChatTxt);
            }
        }

        protected onSpeedUpdate(): void {
            let cur = this._actMgr.curAct;
            if (cur instanceof MoveAct && !cur.isDone && !cur.isAbort) {
                cur.onSpeedUpdate();
            }
        }

        public setShowShadow(isShow:boolean):void{
            this._isShowShadow = isShow;
        }

        protected onAdded() {
            super.onAdded();
            let self = this;
            //if (self instanceof SoulWare) return;
            if (self instanceof Monster && self.vo.monsterType == MonsterType.Boss) return;
            if (self instanceof Trigger) return;
            if (self instanceof Ride) return;
            //if (self instanceof Gory) return;

            //暂时屏蔽影影子
            if(this._isShowShadow){
                if (self._shadow){
                    return;
                }

                let shadow = Pool.alloc(ActorShadow);
                shadow.setActor(self);
                (self.parent as Scene).addDsp(shadow);
            }
        }

        public updateVo(): void {
            super.updateVo();
            let vo = this.vo;
            if (!vo) {
                return;
            }
            let list = vo.coordinate_list;
            if (list && list.length > 1 && (list[list.length - 1].x != vo.x && list[list.length - 1].y != vo.y)) {
                this.movePath(vo.coordinate_list);
            }
            if (vo.direction != undefined) {
                this.dir = vo.direction;
            }
            this.onHpChanged();
            //this.onBuffsUpdate();
            this.onNameChanged();
        }

        public get headMgr(): HeadMgr {
            return this._headMgr;
        }

        public get actMgr(): ActMgr {
            return this._actMgr;
        }

        public set act(value: string) {
            if (!value) {
                return;
            }
            this._act = value;
            this.avatar.setAct(value);
        }

        public get act(): string {
            return this._act;
        }

        public get dir(): number {
            return this._dir;
        }

        public set dir(value: number) {
            if (!value) {
                return;
            }
            this._dir = value;
            this.avatar.setDir(value);
        }

        public get isDying(): boolean {
            return this._dying;
        }

        public get isDead(): boolean {
            if (this._actMgr) {
                return this._actMgr.has(DieAct);
            }
            return false;
        }

        public get isMoving(): boolean {
            if (this._actMgr) {
                return this._actMgr.has(MoveAct);
            }
            return false;
        }

        // public set isAdventGodAtk(val: boolean) {
        //     let self = this;
        //     self.avatar.isAdventGodAtk = val;
        // }

        public setBody(id: string,func?:Handler) {
            this.avatar.setPart(ConfigHead.Body, id,func);
        }

        private onDirChange() {
            this.dir = (<ActorVo>this.vo).direction;
        }

        protected getBodyHeight(): number {
            return 140 * gso.avatarScale;
        }

        protected onHpChanged() {
            this.changeHpShow();
            let vo: ActorVo = <ActorVo>this.vo;
            if (vo.percent <= 0) {
                if (!this.isDead && !this._dying) {
                    let act = Pool.alloc(DieAct);
                    this.actMgr.add(act);
                }
            } else if (this.isDead || this.isDying || this.act.indexOf(ActionName.DIE) > -1) {
                let dieAct = this._actMgr.curAct;
                if (dieAct instanceof DieAct) {
                    dieAct.done();
                    this._actMgr.remove(dieAct);
                }
                // if(ViewMgr.getIns().isShow(ModName.Scene, SceneViewType.RoleRevive) && vo.percent < 10000){
                //     //死亡等待复活状态，不给改变死亡状态
                //     return;
                // }
                if(vo.percent < 10000){
                    return;
                }
                this.onReborn();
            }
        }

        protected changeHpShow(): void {
        }

        protected onReborn(): void {
            this._dying = false;
            this.dieDel = false;
            this.act = ActionName.STAND;
            this.avatar.loop = true;
        }

        protected onCampChanged() {
            this.onNameChanged();
            this.changeCampShow();
        }

        protected changeCampShow(): void {

        }

        public onNameChanged() {
            let self = this;
            if (self._headMgr && self.vo.name) {
                // let color = SceneTools.getNameColor(self.vo, (<Scene>self.parent).sceneType);
                self._headMgr.setName();
            }
            let scene = self.parent as Scene;
            // if (scene.sceneType == SceneType.FairyMagic && self.vo.type == ObjectType.PLAYER) {
            //     self._headMgr.setCampName(getLanById(SceneCampName[self.vo.camp]), SceneTools.getNameColor(self.vo, scene.sceneType));
            // } else {
                self._headMgr.setCampName("");
            // }
        }


        /**添加角色表面特效*/
        public addEft(eftId: string, x: number = 0, y: number = 0, dir?: number, scale?: number, cb?: Handler, loop?: boolean, isRotation?: boolean, isScene?: boolean): number {
            if (!this._eftTopMgr) {
                return 0;
            }
            let times: number = !!loop ? -1 : 1;
            return this._eftTopMgr.addEft(eftId, x, y, dir, scale, cb, times, isRotation, isScene);
        }

        /**添加角色底下特效*/
        public addBottomEft(eftId: string, x: number = 0, y: number = 0, dir?: number, scale?: number, cb?: Handler,): number {
            if (!this._eftBottomMgr) {
                return 0;
            }
            return this._eftBottomMgr.addEft(eftId, x, y, dir, scale, cb);
        }

        public hit(dir: number) {
            let hit = Pool.alloc(HitAct);
            hit.eftDir = dir;
            this._actMgr.add(hit);
        }

        public onHitStart(isChangedAct: boolean = true) {
            if (isChangedAct) {
                this.act = ActionName.HIT + 1;
            }
        }

        public onHitEnd() {
            this.checkAct();
        }

        public addBlood(battleValue: battle_value): void {
            let act = Pool.alloc(AddBloodAct);
            act.setData(battleValue);
            this._actMgr.add(act);
        }

        public addImmune(battleValue: battle_value): void {
            let act = Pool.alloc(AddImmuneAct);
            act.setData(battleValue);
            this._actMgr.add(act);
        }

        public attack(idx: number, actIdx: number[] = [1], dir: number, list: SkillEffectVo[], focusPt?: Point): void {
            if (this.isDead) {
                SkillEffectVo.releaseList(list);
                Pool.release(focusPt);
                return;
            }
            if(!actIdx || actIdx.length <= 0){
                //忽略动作的
                return ;
            }
            let cfg = SkillData.getCfg(idx);
            let atk;
            atk = Pool.alloc(AttackAct);
            atk.setData(idx, actIdx, dir, list, focusPt);
            this._actMgr.add(atk);
        }

        public onAttackStart(type: number[], dir: number, eftId: string) {
            this._atkList = type;
            let atkType = this._atkList.shift();
            this.attackStart(atkType, dir, eftId);
        }

        protected attackStart(type: number, dir: number, eftId: string) {
            let self = this;
            // if (!eftId) {
            self.avatar.loop = false;
            self.avatar.onComplete = Handler.alloc(self, self.onAnimComp);
            // }
            //self.avatar.resetActDir();
            self.act = ActionName.ATTACK + type;
            self.dir = dir;
        }

        public onAttackEnd() {
            if (this.avatar) {
                this.avatar.loop = true;
            }
            this.checkAct();
        }

        public checkAct() {
            if (this.isDead || this._dying) {
                return;
            }
            if (this._actMgr.isEmpty) {
                this.act = ActionName.STAND;
                return;
            }
            let enableAct: number = 0;
            for (let i = 0; i < this._actMgr.children.length; i++) {
                let act: BaseAct = this._actMgr.children[i] as BaseAct;
                if (act.isDone || act.isAbort) {
                    continue;
                }
                enableAct++;
            }
            if (enableAct == 0) {
                this.act = ActionName.STAND;
            }
        }

        public setActStand() {
            if (this.vo && this.vo.percent > 0 && this.actMgr && !this.actMgr.curAct) {
                this.act = ActionName.STAND;
            }
        }

        public onAnimComp(): void {
            if (this.act.indexOf(ActionName.ATTACK) != -1 && this._atkList && this._atkList.length != 0) {
                let atkType = this._atkList.shift();
                this.act = ActionName.ATTACK + atkType;
                return;
            }
            if (this.avatar && this.avatar.isComplete) {
                this.avatar.loop = true;
                this.avatar.onComplete = null;
            }
            if (this._actMgr) {
                let curAct = this._actMgr.curAct;
                if (curAct instanceof DieAct) {
                    curAct.onAnimComp();
                }
                if (curAct instanceof AttackAct) {
                    curAct.onEffCom();
                    if (curAct.parent) {
                        this._actMgr.remove(curAct);
                        this._actMgr.doNext();
                    }
                }
            }
        }

        public onDie(): void {
            this.avatar.loop = false;
            this.avatar.onComplete = Handler.alloc(this, this.onAnimComp);
            this.avatar.bodyIsShow = false;
            if (this.vo.type == ObjectType.MONSTER && (<MonsterVo>this.vo).monsterType == MonsterType.Boss) {
                // this.addEft(BossDieEftSrc, 0, -100, null, 3);
                return;
            }
            this.act = ActionName.DIE;

        }

        public onDieEnd(): void {
            this._dying = false;
            if (this.dieDel && this.parent) {
                this.dispose();
            }
        }

        /** 最后一击 */
        public onFatalAtk(): void {
        }

        /** 击杀 */
        public killBy(attacker: BaseActor): void {
        }

        public movePath(path: Point[], onMoveEnd?: Handler, moveType?: number,moveTime?:number): void {
            if (!path || (path.length < 2 && moveType != MoveType.Jump && moveType != MoveType.Push_Back) || this.isDead || this.act.indexOf(ActionName.DIE) > -1) {
                Pool.releaseList(path);
                Pool.release(onMoveEnd);
                return;
            }
            // if(moveType && moveType == MoveType.Jump){
            //     let jumpAct:JumpMoveAct = Pool.alloc(JumpMoveAct);
            //     jumpAct.setPath(path, moveType, onMoveEnd);
            //     this._actMgr.add(jumpAct);
            //     console.log("跳跃路径,",path);
            //     return;
            // }
            let act = Pool.alloc(MoveAct);
            act.setPath(path, onMoveEnd, moveType,moveTime);
            this._actMgr.add(act);
        }

        public onBackStart(): void {
        }

        public onMoveStart(): void {
            this.act = ActionName.JUMP + 1;
        }

        public onMoveEnd(keepRun: boolean = false): void {
            if (!keepRun) {
                this.act = ActionName.STAND;
            }
        }

        public setTilePos(tx: number, ty: number, updateWorld: boolean = true): void {
            if (isNaN(tx) || isNaN(ty)) {
                console.error("test setTilePos 坐标错误！", tx, ty, updateWorld, this.vo.type, this.vo.entity_id.toString());
            }
            super.setTilePos(tx, ty, updateWorld);
            this.refreshTileChange();
        }

        /**
         * 遮挡效果
         */
        protected refreshTileChange(): void {
            let isShelter: boolean = MapData.ins.isShelter(this.vo.x, this.vo.y);
            this.dsp.alpha = isShelter ? 0.4 : 1;
        }

        public getMoveSpeed(mType: number): number {

            let w = MapData.ins.cellWidth;
            let sp = this.vo.speed || DefaultSpeed;//防止服务端没有发移动速度导致报错
            switch (mType) {
                case MoveType.Normal:
                case MoveType.Find:
                    return w / sp;
                case MoveType.Sprint:
                case MoveType.Jump:
                case MoveType.Back:
                    return w / sp * 2;
            }
            return w / sp;
        }

        public onAlloc(): void {
            super.onAlloc();
            let self = this;
            self._actMgr = Pool.alloc(ActMgr);
            self.add(self._actMgr);

            self._eftBottomMgr = Pool.alloc(ActorEftMgr);
            self.add(this._eftBottomMgr);

            self.avatar = Pool.alloc(Avatar);
            self.avatar.ower = this;
            self.add(self.avatar);

            // self.clickArea = Pool.alloc(BaseClickArea);
            // self.add(self.clickArea);

            self._headMgr = Pool.alloc(HeadMgr);
            self.add(self._headMgr);

            self._eftTopMgr = Pool.alloc(ActorEftMgr);
            self.add(this._eftTopMgr);

            self.act = ActionName.STAND;
            self.dir = Direction.RIGHT_DOWN;
        }

        public updateHeadMgrY() {
            if (!this._headMgr) {
                return;
            }
            this._headMgr.y = -(this.getBodyHeight() + this._headMgr.height);
           //this.updateClickArea();
        }

        // public updateClickArea() {
        //     if (!this.clickArea) {
        //         return;
        //     }
        //     this.clickArea.height = this.getBodyHeight();
        //     this.clickArea.y = -this.clickArea.height;
        // }

        //-----------------------------阴影--------------------------
        public _shadow: ActorShadow;

        public setShadow(shadow: ActorShadow) {
            this._shadow = shadow;
        }


        setWorldPos(wx: number, wy: number) {

            if(gso.dbg_scene == 4 && (this._enType == ObjectType.MONSTER || this._enType == ObjectType.PLAYER)){
                let x = Math.floor(wx/32);
                let y = Math.floor(wy/32);
                    //console.log("怪物格子 " + x +","+y);
                let curPt: string = StringUtil.substitute("(%s,%s):%s", [x,y, (this.vo.entity_id != null ? this.vo.entity_id.toNumber() : NaN)]);
                this._headMgr.setTeamName(curPt, UIColor.WHITE);
            }

            super.setWorldPos(wx, wy);
            if (this._shadow) {
                this._shadow.updatePos(wx, wy);
            }
            if ((gso.dbg_scene & 1) != 0 || (gso.dbg_scene & 2) != 0) {
                let tilePt: Point = MapData.ins.getCellPt(wx, wy);
                if (!this.vo.entity_id) return;
                let curPt: string = StringUtil.substitute("(%s,%s):%s", [Math.floor(tilePt.x), Math.floor(tilePt.y), (this.vo.entity_id != null ? this.vo.entity_id.toNumber() : NaN)]);
                this._headMgr.setTeamName(curPt, UIColor.WHITE);
                Pool.release(tilePt);
            }
        }

        public onRelease(): void {
            let self = this;
            self._curBuffIdx = undefined;
            self._actMgr = undefined;
            self._headMgr = undefined;
            self._eftTopMgr = undefined;
            self._eftBottomMgr = undefined;
            self.avatar = undefined;
            //self.clickArea = undefined;
            self._dying = undefined;
            self.dieDel = undefined;
            self._act = undefined;
            self._dir = undefined;
            self._chatTxt = undefined;
            self._taskChatTxt = undefined;
            self._fixFrame = undefined;
            if (self._shadow) {
                Pool.release(self._shadow);
                self._shadow = undefined;
            }
            super.onRelease();
        }

        public setFixFrame(frame: number) {
            this._fixFrame = frame;
            this.avatar.setFixFrame(frame);
        }

        public get fixFrame() {
            return this._fixFrame;
        }

    }
}