namespace game.scene {
    import TimeMgr = base.TimeMgr;
    import MainGPlayer = game.scene.MainGPlayer;
    import scene_skill = msg.scene_skill;
    import MonsterVo = game.scene.MonsterVo;
    import Handler = base.Handler;
    import MoveType = game.scene.MoveType;
    import Point = egret.Point;
    import Scene = game.scene.Scene;
    import AttackAct = game.scene.AttackAct;
    import ObjectType = game.scene.ObjectType;
    import MoveAct = game.scene.MoveAct;
    import SceneTools = game.scene.SceneTools;
    import Pool = base.Pool;
    import BaseActor = game.scene.BaseActor;
    import BaseItem = game.scene.BaseItem;
    import facade = base.facade;
    import ActorVo = game.scene.ActorVo;
    import ISceneProxy = game.mod.ISceneProxy;
    import ParamConfig = game.config.ParamConfig;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import Monster1Config = game.config.Monster1Config;
    import GDirUtil = game.utils.GDirUtil;
    import SceneConfig = game.config.SceneConfig;
    import SceneUtil = game.mod.SceneUtil;

    /** 通用Ai */
    export class CommonAi extends BaseItem {
        protected _curTarget: ActorVo;
        protected _open: boolean;
        private _tickerCnt: number = 0;
        protected _isUsingSkill: boolean;
        protected _lastUsingTime: number;
        protected _lastUsingIdx: number;

        //上次一次的时间
        private preTime:number;
        //private useSkillInfo: { index?: number, type?: number[], focus?: Long, x?: number, y?: number, tx?: number, ty?: number } = {};


        /** 技能队列 */
        protected _queueSkills: scene_skill[] = [];
        protected _enableSkills: scene_skill[] = [];
        //普工技能列表
        protected _commonSkils:number[] = [];
        //化神普工
        protected _commonHuashengSkils:number[] = [];

        protected player: MainGPlayer;
        protected scene: Scene;
        protected _proxy: ISceneProxy;
        protected _isSprintAI = false;

        //protected _intervalTime = 0;
        //protected _preAtkTime = 0;

        protected _startAtk = true;

        protected _cellWidth:number;
        protected _tolerance = 1;

        //其他技能的时间戳
        protected _otherSkillTime = 0;

        protected _tmpTile:Point;


        onAlloc() {
            super.onAlloc();
            let self = this;
            self._proxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            self.resetData();
            this._cellWidth = MapData.ins.cellWidth;
            this._open = true;
        }

        protected onAdded() {
            super.onAdded();
            let self = this;
            self.player = self.parent as MainGPlayer;
            //self.player = MainGPlayer.ins;
            self.scene = self.player.parent as Scene;
            self._proxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            // self._proxyXianfa = facade.retMod(ModName.Xianfa).retProxy(ProxyType.Xianfa);
            // self._proxyXianjian = facade.retMod(ModName.Surface).retProxy(ProxyType.Xianjian);

            let param: ParamConfig = getConfigByNameId(ConfigName.Param, "normal_skill");
            this._commonSkils = param.value[0];

            let paramHuashen: ParamConfig = getConfigByNameId(ConfigName.Param, "huashen_attack");
            this._commonHuashengSkils[0] = paramHuashen.value;

            let cfg: SceneConfig = getConfigByNameId(ConfigName.Scene, this._proxy.curSceneIdx);
            if(!cfg){
                console.error("场景id:"+this._proxy.curSceneIdx+ " cfg 配置空了");
                return;
            }
            this._isSprintAI = (cfg.sprint_ai == 1);
        }

        /** 当前选中目标 */
        public get curTarget(): ActorVo {
            return this._curTarget;
        }

        public set curTarget(v: ActorVo) {
            this._curTarget = v;
        }

        public get open(): boolean {
            return this._open;
        }

        public set open(value: boolean) {
            let self = this;
            self._open = value;
            if (!value) {
                self.curTarget = null;
            }
        }

        public startAtk():void{
            this._startAtk = true;
        }

        public stopAtk():void{
            this._startAtk = false;
        }

        advanceTime(elapseTime: number) {
            super.advanceTime(elapseTime);
            this.ticker();
        }

        private isAtked = false;

        private ticker() {
            let self = this;
            if (!self._open || !self.player || !self.scene || gso.dbg_stop_ai) {
                return;
            }

            if(!this.preTime){
                this.preTime = TimeMgr.time.time;
            }

            // if(TimeMgr.time.time - this.preTime > 2000 && this.isAtked){
            //     this.preTime = TimeMgr.time.time;
            //     self.player.showCommonAtkEfect();
            // }

            if (self._isUsingSkill && self._lastUsingTime != undefined && TimeMgr.time.serverTime - self._lastUsingTime >= 2000) {
                console.log("使用技能后，超过2秒没有返回正确结果！", self.player.vo.x, self.player.vo.y, self.curTarget && self.curTarget.x, self.curTarget && self.curTarget.y);
                self._isUsingSkill = false;
            }

            if (self._isUsingSkill){
                return;
            }

            //判定对象是否活着的，是否眩晕
            if (!SceneTools.isSelfReady(self.player.vo)){
                return;
            }

            let curAct = self.player.actMgr.curAct;
            if (curAct && (curAct instanceof MoveAct || curAct instanceof AttackAct) && !curAct.isAbort && !curAct.isDone){
                return;
            }

            //判读是否处于CD 时间内
            let speed = RoleVo.ins.atkspeed || gso.defaultSpeed;
            let CDTime = speed/10;  //speed/10000*1000;
            let lastUsingTime = self._lastUsingTime || 0;
            let delay = TimeMgr.time.serverTime - lastUsingTime;
            if( delay <= CDTime){
                //console.log("主角处于公共CD时间内");
                return;
            }

            if (!self.findTarget()){
                return;
            }

            let skillIdx: number = self.getEnableSkillIdx();
            if (!skillIdx){
                return;
            }

            self.attackTarget(skillIdx);

        }

        protected findTarget(): boolean {
            let self = this;
            if (!SceneTools.isTargetReady(self._curTarget)) {
                self._curTarget = self.commonFindTarget();
            }

            return self._curTarget != null;
        }

        // public setIntervalTime(time:number):void{
        //     //this._intervalTime = time;
        //     //this._preAtkTime = Date.now();
        // }


        /** 攻击目标 */
        public attackTarget(skillIdx: number) {
            let self = this;
            let skillCfg: BattleSkillConfig = SkillData.getCfg(skillIdx);
            if (!skillCfg) {
                console.error("缺少技能 id = "+skillIdx +" 配置");
                return;
            }

            let targetVo = self.curTarget;
            if (!targetVo) {
                return;
            }

            let target = this.scene.ctrl.getObj(targetVo.entity_id);
            if(!target){
                this.curTarget = null;
                return;
            }

            // if(target instanceof  Monster && target.isBoss()){
            //     // if(!target.bodyIsShow()){
            //     //     return;
            //     // }
            // }


            // if(Date.now() - this._preAtkTime <= this._intervalTime){
            //     return;
            // }
            //
            // this._intervalTime = 0;

            //target.vo.x = target.x / 32;
            //target.vo.y = target.y / 32;

            //防止vo 数据跟 实际 坐标不一致
            // self._tmpTile = MapData.ins.getCellPt(target.x, target.x,self._tmpTile);
            // target.vo.x = self._tmpTile.x;
            // target.vo.y = self._tmpTile.y;

            let curDis = PointUtil.distance(self.player.vo.x, self.player.vo.y, target.vo.x, target.vo.y);
            let dis = skillCfg.max_distance;

            if (targetVo instanceof MonsterVo && targetVo.index) {
                let cfg: Monster1Config = getConfigByNameId(ConfigName.Monster, targetVo.index);
                if (cfg && cfg.hit_scope){
                    dis += cfg.hit_scope;// * this._cellWidth;
                }
            }


            //像素比较
            if (this._startAtk &&(curDis <= (dis + this._tolerance) || skillCfg.max_distance == 0)) {
                let dir: number = GDirUtil.directionByTan2(self.player.vo.x, self.player.vo.y, targetVo.x,targetVo.y);
                self.player.dir = dir;
                this.turnPetDir(dir);
                this.isAtked = true;

                //记录最近一次仙法释放的时间戳
                let ssData:SpecialSkillData = SpecialSkillList[skillCfg.type1];
                if(ssData){
                    ssData.preTime = TimeMgr.time.time;
                }

                self.useSkill(skillIdx); //攻击范围内直接攻击

                //普工特效
                if(TimeMgr.time.time - this.preTime > 2000 && this.isAtked && !SkillData.isHuashenXing()){
                    this.preTime = TimeMgr.time.time;
                    self.player.showCommonAtkEfect();
                }

                return;
             }else{

                if(!this._isSprintAI){
                    this.curTarget = null;
                    return;
                }

                if(targetVo.hashCode != self.player.hashCode && self.isDoneSprint){
                    let dir: number = GDirUtil.directionByTan2(targetVo.x,targetVo.y,self.player.vo.x,self.player.vo.y);
                    let cellXY = Pool.alloc(Point);
                    cellXY.setTo(targetVo.x,targetVo.y);
                    for(let i = dis; i > 1; i--){
                        cellXY = this.getCellXY(targetVo.x,targetVo.y,self.player.vo.x,self.player.vo.y,dir,dis);
                        if(MapData.ins.isPointLegal(cellXY.x,cellXY.y)){
                            break;
                        }
                    }

                    let path: Point[] = Scene.findPath(self.player.vo.x,self.player.vo.y,cellXY.x,cellXY.y);
                    this.isDoneSprint = false;
                    self.player.movePath(path,Handler.alloc(this,function () {
                        self.isDoneSprint = true;
                    }),MoveType.Sprint);
                }
            }
        }

        private isDoneSprint = true;

        //被攻击者为中心
        // x1 y1 为被攻击者格子坐标 x2,y2 为攻击者格子坐标
        public getCellXY(x1:number,y1:number,x2:number,y2:number,dir:number,atkDis:number):Point
        {
            let x = x1;
            let y = y1;
            let dis = Math.min(4,atkDis-1);
            if(dir == Direction.RIGHT_UP){
                x += dis;
                y -= dis;
            }else if(dir == Direction.RIGHT){
                x += dis;
            }else if(dir == Direction.RIGHT_DOWN){
                x += dis;
                y += dis;
            }else if(dir == Direction.LEFT_UP){
                x -= dis;
                y -= dis;
            }else if(dir == Direction.LEFT){
                x -= dis;
            }else if(dir == Direction.LEFT_DOWN){
                x -= dis;
                y += dis;
            }
            return Pool.alloc(Point).setTo(x,y);
        }

        private turnPetDir(dir:number):void{
            let sceneProxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            let petList:SceneObjVo[] = sceneProxy.getVosByType(ObjectType.PET) || [];
            let roleId = this.player.vo.entity_id.toNumber();
            for(let i = 0;i < petList.length; i++ ){
                let data = petList[i];
                let master_id = (data as PetVo).master_id.toNumber();
                if(master_id == roleId){
                    let obj = this.scene.ctrl.getObj(data.entity_id) as BaseActor;
                    if(obj.dir != dir){
                        obj.dir = dir;
                    }
                }
            }
        }


        private useSkill(skillIdx: number) {

            if(!SkillData.isCommonAtk(skillIdx)){
                console.log("前端主角 通知后端 释放 useSkill = " + skillIdx);
            }

            //console.log("前端主角 通知后端 释放 useSkill = " + skillIdx);

            let self = this;
            self._isUsingSkill = true;
            self._lastUsingTime = TimeMgr.time.serverTime;
            self._lastUsingIdx = skillIdx;
            let entityId =  self.curTarget.entity_id;
            self.curTarget.isTarget = true;

            let type = SkillData.getActIdx(skillIdx);
            SceneUtil.useSkill(skillIdx, entityId, type, self.player.vo.x, self.player.vo.y, self.curTarget.x, self.curTarget.y);
        }

        /** 获取能使用的技能 */
        protected getEnableSkillIdx(): number {
            let self = this;
            let skillId = 0;
            let skill: scene_skill;
            skill = self.getQueueSkill();
            if (skill) {
                return skill.skill_idx;
            }

            //if (TimeMgr.time.serverTime - SkillData.USE_SKILL_TIME >= SkillData.NEXT_SKILL_CD) {
            skill = self.getReadySkill();
            skillId = skill && skill.skill_idx;
            //}

            if (!skill) {

                if(SkillData.isHuashenXing()){
                    //化神变身后，走的是化神普工
                    skillId = self.getCommonAtk(this._commonHuashengSkils || []);
                }else{
                    //化神变身前，走的是正常的普工
                    skillId = self.getCommonAtk(this._commonSkils);
                }


                if(self.player && self.player.vo){
                   let skill2 :scene_skill = self.player.vo.skillsMap[skillId];
                    if(!SkillData.isEnable(skill2)){
                        //处于普工CD 时间内
                        return 0;
                    }
                }
            }
            return skillId;
        }

        /** 获取普通攻击 包括化神普工*/
        protected getCommonAtk(commonSkils:number[]): number {
            let commonSkillId = 0;
            let len = commonSkils.length;
            if(len == 1){
                commonSkillId = commonSkils[0];
            }else{
                let idx = Math.ceil(Math.random() * len);
                commonSkillId = commonSkils[idx-1] || commonSkils[0];
            }
            return commonSkillId;
        }

        /** 获取队列中技能 */
        protected getQueueSkill(): scene_skill {
            let self = this;
            let len = self._queueSkills.length;
            if (len == 0) {
                return null;
            }
            for (let i = 0; i < len; ++i) {
                let skill = self._queueSkills[i];
                if (SkillData.isEnable(skill)) {
                    return ArrayUtil.removeAt(self._queueSkills, i);
                }
            }
            return null;
        }

        /** 随机获取冷却好的技能 */
        protected getReadySkill(): scene_skill {
            let self = this;
            let skills = self.player.vo.skills;
            if (!skills || !skills.length) {
                return null;
            }
            self._enableSkills.length = 0;


            let roleOtherSpecialList:scene_skill[] = [];
            let roleSpecialListMap:{[key:number]:scene_skill[]} = {};
            for (let s of skills) {
                if (SkillData.isEnable(s)) {

                    if(this._commonSkils.indexOf(s.skill_idx) > -1){
                        //把普工过滤掉
                        continue;
                    }

                    if(SkillData.isHuashenCommonSkill(s.skill_idx)){
                        //化神普工
                        //this._commonHuashengSkils.push(s.skill_idx);
                        continue;
                    }

                    // if(SkillData.isHuashenSkill(s.skill_idx)){
                    //     //过滤化神技能，化神技能需要手动释放
                    //     continue;
                    // }

                    if(SkillData.isSpecialSkill(s.skill_idx)){
                        let skillCfg = SkillData.getCfg(s.skill_idx);
                        let ssData:SpecialSkillData = SpecialSkillList[skillCfg.type1];
                        if(TimeMgr.time.time - ssData.preTime < ssData.delay){
                            //上一次释放技能间隔时间少于 ssData.delay 秒，过滤掉
                            continue;
                        }

                        if(!roleSpecialListMap[skillCfg.type1]){
                            roleSpecialListMap[skillCfg.type1] = [];
                        }
                        roleSpecialListMap[skillCfg.type1].push(s);
                        continue;
                    }

                    if(SkillData.isSpecialSkill2(s.skill_idx)){
                        if(TimeMgr.time.time - SpecialSkillList2.preTime < SpecialSkillList2.delay){
                            //上一次释放技能间隔时间少于 20000 秒，过滤掉
                            continue;
                        }
                        roleOtherSpecialList.push(s);
                        continue;
                    }

                    self._enableSkills.push(s);
                }
            }

            //处理仙法技能释放顺序和间隔
            //let xianfaList:number[] = self._proxyXianfa.skills;
            // if(roleSpecialListMap[SkillType1.Immortal]){
            //     let ssData:SpecialSkillData = SpecialSkillList[SkillType1.Immortal];
            //     this.processSpecialSkill(roleSpecialListMap[SkillType1.Immortal],ssData.preSkillId);
            // }
            //
            // //处理仙剑技能释放顺序和间隔
            // //let xianjianList:number[] = self._proxyXianjian.skills;
            // if(roleSpecialListMap[SkillType1.Xianjian]){
            //     let ssData:SpecialSkillData = SpecialSkillList[SkillType1.Xianjian];
            //     this.processSpecialSkill(roleSpecialListMap[SkillType1.Xianjian],ssData.preSkillId);
            // }

            //处理仙法 仙剑
            for(let skillType1 in roleSpecialListMap){
                let ssData:SpecialSkillData = SpecialSkillList[skillType1];
                this.processSpecialSkill(roleSpecialListMap[skillType1],ssData.preSkillId);
            }

            //处理 神兵 坐骑 元灵
            this.processSpecialSkill2(roleOtherSpecialList);


            if (self._enableSkills.length == 0) {
                return null;
            }

            let len = self._enableSkills.length;
            let idx = Math.ceil(Math.random()*len);
            return self._enableSkills[idx-1] || self._enableSkills[0];
        }

        private processSpecialSkill2(roleSpecialList:scene_skill[]):void{
            if(roleSpecialList && roleSpecialList.length > 0){
                //放优先级最高的技能进队列
                let index = 0;
                for(let i = 0; i < roleSpecialList.length;i++) {
                    let s = roleSpecialList[i];
                    if (s.skill_idx == SpecialSkillList2.preSkillId) {
                        index = i+1;
                        break;
                    }
                }
                index = index >= roleSpecialList.length?0:index;
                this._enableSkills.push(roleSpecialList[index]);
            }
        }

        /** 注意 skills 不是玩家已经挂上的技能，这里只是为了他的顺序 */
        private processSpecialSkill(roleSpecialList:scene_skill[],
                                    preSkillId:number):void{
            if(roleSpecialList && roleSpecialList.length > 0){
                //放优先级最高的技能进队列
                let result:scene_skill = null;
                if(preSkillId == 0){
                    // for(let i = 0; i < skills.length;i++) {
                    //     let skillID = skills[i];
                    //     let s = roleSpecialList[skillID];
                    //     if (s) {
                    //         result = s;
                    //         break;
                    //     }
                    // }
                    result = roleSpecialList[0];
                }else{
                    let index = 0;
                    for(let i = 0; i < roleSpecialList.length;i++){
                        let s = roleSpecialList[i];
                        if(s.skill_idx == preSkillId){
                            index = i+1;
                            break;
                        }
                    }
                    index = index >= roleSpecialList.length ?0:index;
                    result = roleSpecialList[index];
                }

                this._enableSkills.push(result);
            }
        }

        // /** 添加下一个技能 服务器控制 */
        // public addNextSkill(skill: scene_skill) {
        //     let self = this;
        //     if (self.player.vo.isTie) {
        //         PromptBox.getIns().show(getLanById(LanDef.tie_tips));
        //         return;
        //     }
        //     if (!SkillData.isEnable(skill)) {
        //         return;
        //     }
        //
        //     if (!this.hasAttackTarget()) {//没有目标，屏蔽支持空技能
        //         return;
        //     }
        //
        //     if (self._queueSkills.length > 0) {
        //         let last = self._queueSkills[self._queueSkills.length - 1];
        //         if (last.skill_idx == skill.skill_idx) {
        //             if(skill.skill_idx == 123801000) {
        //                 if(!gso.isAutoUseGodSkill){
        //                     PromptBox.getIns().show(getLanById(LanDef.zhujineng_tips));
        //                 }
        //             }
        //             return;
        //         }
        //     }
        //     self._queueSkills.push(skill);
        // }
        //
        // /** 服务端控制的情况下，主动释放技能  服务器控制*/
        // private activelyUseSkill(skill: scene_skill) {
        //     let self = this;
        //     if (!SceneTools.isTargetReady(self.curTarget)) {
        //         self.curTarget = self.commonFindTarget();
        //     }
        //
        //     if (!this.hasAttackTarget()) {//没有目标，屏蔽支持空技能
        //         return;
        //     }
        //
        //     self.attackTarget(skill.skill_idx);
        // }


        /** 清除能使用技能状态 */
        public clearUsingSkillStatus() {
            this._isUsingSkill = false;
        }


        /** 寻找目标 */
        protected commonFindTarget(): ActorVo {
            if(this._proxy.foeTargetId){
                //优先攻击目标
                let vo = this._proxy.getVoById(this._proxy.foeTargetId) as ActorVo;
                if(vo){
                    return vo;
                }
            }
            return this.findMinDisTarget(ObjectType.MONSTER);//获取怪物，区分ObjectType，敌人攻击走上面
        }

        protected findMinDisTarget(type: number): ActorVo {
            let enemies: ActorVo[] =  this._proxy.getEnemyVos(type);
            if (!enemies || 0 == enemies.length) {
                return null;
            }

            let minIdx: number = 0;
            let minDis: number = 0;
            for (let i = 0, l = enemies.length; i < l; ++i) {
                let vo = enemies[i];
                if (!SceneTools.isTargetReady(vo)) {
                    continue;
                }
                let dis = PointUtil.distanceSquare(this.player.vo.x, this.player.vo.y, vo.x, vo.y);
                if (!minDis || dis < minDis) {
                    minDis = dis;
                    minIdx = i;
                }
            }
            let targetVo = enemies[minIdx];
            if (!SceneTools.isTargetReady(targetVo)) {
                return null;
            }
            return targetVo;
        }


        /** 开始挂机 */
        public startHangUp() {
            let self = this;
            self._tickerCnt = 99;
            self.open = true;
            this.isAtked = false;
        }

        /** 停止挂机 */
        public stopHandUp() {
            let self = this;

            self.resetData();

            let curAct = self.player.actMgr.curAct;
            if (curAct instanceof MoveAct) {
                curAct.abort();
            }
            self.player.actMgr.removeAllActByCls(MoveAct);
            self.player.checkAct();
        }

        public resetData() {
            let self = this;
            self.open = false;
            self._isUsingSkill = false;
            self._lastUsingTime = undefined;
            self._lastUsingIdx = undefined;
            self.curTarget = null;
            self._queueSkills.length = 0;
            this.isAtked = false;
            for(let k in SpecialSkillList){
                SpecialSkillList[k].preTime = 0;
                SpecialSkillList[k].preSkillId = 0;
            }

            SpecialSkillList2.preSkillId = 0;
            SpecialSkillList2.preTime = 0;

        }

        onRelease() {
            super.onRelease();
            let self = this;
            self._queueSkills.length = 0;
            self.player = null;
            self.scene = null;
            self._tickerCnt = 0;
            this.isAtked = false;
        }

        //获取可攻击目标
        public getAttackTarget(): ActorVo {
            let curTarget = this.commonFindTarget();//用寻怪来判断
            if (!curTarget) {
                return null;
            }
            return curTarget;
        }
    }
}