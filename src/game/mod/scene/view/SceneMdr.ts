namespace game.mod.scene {
    import Scene = game.scene.Scene;
    import GameNT = base.GameNT;
    import MapData = game.scene.MapData;
    import facade = base.facade;
    import Point = egret.Point;
    import SceneObjVo = game.scene.SceneObjVo;
    import Pool = base.Pool;
    import BaseSceneObj = game.scene.BaseSceneObj;
    import BaseSceneCtrl = game.scene.BaseSceneCtrl;
    import GPlayerVo = game.scene.GPlayerVo;
    import MainGPlayer = game.scene.MainGPlayer;
    import MoveAct = game.scene.MoveAct;
    import battle_use_skill = msg.battle_use_skill;
    import GDirUtil = game.utils.GDirUtil;
    import BaseActor = game.scene.BaseActor;
    import Handler = base.Handler;
    import SkillEffectVo = game.scene.SkillEffectVo;
    import ObjectCls = game.scene.ObjectCls;
    import ObjectType = game.scene.ObjectType;
    import PetVo = game.scene.PetVo;
    import s2c_instance_find_monster = msg.s2c_instance_find_monster;
    import SceneTools = game.scene.SceneTools;
    import delayCall = base.delayCall;
    import MoveType = game.scene.MoveType;
    import clearDelay = base.clearDelay;
    import AttackAct = game.scene.AttackAct;
    import TimeMgr = base.TimeMgr;
    import Tween = base.Tween;
    import GPlayer = game.scene.GPlayer;
    import MainGPlayerVo = game.scene.MainGPlayerVo;
    import UpdateItem = base.UpdateItem;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import PetObjectCls = game.scene.PetObjectCls;
    import Texture = egret.Texture;
    import s2c_scene_print_entity = msg.s2c_scene_print_entity;
    import SceneConfig = game.config.SceneConfig;
    import Trigger = game.scene.Trigger;
    import OptimalPath = game.scene.OptimalPath;
    import MOVE_AMEND_DIS = game.scene.MOVE_AMEND_DIS;
    import ActorVo = game.scene.ActorVo;
    import battle_effect = msg.battle_effect;
    import STxtMgr = game.scene.STxtMgr;
    import TriggerVo = game.scene.TriggerVo;
    import MonsterVo = game.scene.MonsterVo;
    import s2c_fly_bool = msg.s2c_fly_bool;
    import s2c_scene_add_effect = msg.s2c_scene_add_effect;
    import EffectConfig = game.config.EffectConfig;
    import Monster = game.scene.Monster;

    export class SceneMdr extends MdrBase implements UpdateItem {
        private _scene: Scene;
        private _proxy: SceneProxy;
        private _model: SceneModel;
        private _mainPlayer: MainGPlayer;
        private _headLineGroup:eui.Group;

        constructor() {
            super(null);
            this.onInit();
            this.addListeners();
        }

        protected onInit(): void {
            let self = this;
            self._scene = Pool.alloc(Scene);
            self._proxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            self._model = self._proxy.getModel();
            self._model.scene = self._scene;
        }

        private addMainPlayer(vo: MainGPlayerVo): MainGPlayer {
            let self = this;
            if (!self._mainPlayer) {
                let obj = Pool.alloc(MainGPlayer);
                obj.vo = vo;
                self._model.mainPlayer = self._mainPlayer = obj;
                //obj.setShowShadow(this._scene.sceneType != SceneType.HangUp2);
                obj.setShowShadow(false);
                self._scene.addObj(self._mainPlayer);
            } else {
                self._mainPlayer.vo = vo;
                self._scene.addObj(self._mainPlayer);
                self.clearMainPlayerAi();
                self._mainPlayer.updateVo();
            }

            //添加AI
            //delayCall(Handler.alloc(this,function () {
            //self.sendNt(SceneEvent.ON_ADD_PLAYER_AI);
            //}),2000);

            //self.sendNt(SceneEvent.PLAYER_GOD_SKILL_FLUS);

            // 设置相机焦点
            // SceneTools.setFocusEntityId(vo.entity_id);
            if (SceneUtil.isPvpScene()) {
                this._scene.setMapCenterFocus();// 设置相机焦点为地图中间
                //PVP场景不加AI，服务端控制
                //this.sendNt(SceneEvent.ON_ADD_PLAYER_AI);
            }
            else {

                self.sendNt(SceneEvent.ON_ADD_PLAYER_AI);
                let atk_delay = SceneUtil.atkDelay();
                if(atk_delay > 0){

                    SceneUtil.requestControlAI(ControlAIType.Stop);
                    if(self._model.mainAi){
                        self._model.mainAi.stopAtk();
                    }
                    delayCall(Handler.alloc(self,function () {
                        if(self._model.mainAi){
                            self._model.mainAi.startAtk();
                        }
                    }),atk_delay*10);
                }else{
                    if(self._model.mainAi){
                        self._model.mainAi.startAtk();
                    }
                }
            }

            TimeMgr.addUpdateItem(self);
            return self._mainPlayer;
        }

        private clearMainPlayer() {
            let self = this;
            if (self._mainPlayer && self._mainPlayer.parent) {
                self._mainPlayer.dispose();
            }
            self.clearMainPlayerAi();
            self._model.mainPlayer = self._mainPlayer = null;
            MainGPlayer.delIns();
            self._scene.isAddedMain = false;
            TimeMgr.removeUpdateItem(self);
        }

        private clearMainPlayerAi() {
            let self = this;
            if(self._model.mainAi && self._mainPlayer){
                self._mainPlayer.remove(self._model.mainAi);
                self._model.mainAi = null;
            }
        }

        private _bezierPosArr: Point[] = [];
        private _idx: number = 0;
        private _starP: Point;
        private _midP: Point;
        private _endP: Point;

        public testBezierMove(): void {
            let self = this;
            if (self._idx == 0) {
                self._starP = new Point(self._mainPlayer.x, self._mainPlayer.y);
                self._midP = new Point(self._mainPlayer.x + 200, self._mainPlayer.y - 100);
                self._endP = new Point(self._mainPlayer.x + 400, self._mainPlayer.y);
            }

            let arr: Point[] = [];
            if (self._idx % 2 == 0) {
                arr.push(self._starP, self._midP, self._endP);
            } else {
                arr.push(self._endP, self._midP, self._starP);
            }
            self._idx++;
            self._bezierPosArr = BezierUtil.getBezierPos(arr, 10);

            self.moveBezierPoint();
        }

        private moveBezierPoint(): void {
            let self = this;
            if (!self._bezierPosArr || self._bezierPosArr.length == 0) {
                Tween.remove(self._mainPlayer);
                return;
            }
            let s: Point = self._bezierPosArr.shift();
            Tween.get(self._mainPlayer).to({x: s.x, y: s.y}, 200, Handler.alloc(self, (obj: any) => {
            }, [this._mainPlayer])).exec(Handler.alloc(self, self.moveBezierPoint));
        }

        public update(time: base.Time): void {
            let self = this;
            if (DEBUG) {
                self.debugSceneMove();
            }
            if (self.fpsTime != TimeMgr.time.serverTimeSecond) {
                self.checkFps();
                self.fps = 0;
                self.fpsTime = TimeMgr.time.serverTimeSecond;
            }
            self.fps++;
        }

        protected addListeners(): void {
            super.addListeners();
            let self = this;
            let addEventListener = self.onEgret.bind(self);
            self.onNt(LauncherEvent.ON_RESIZE, self.onStageResize, self);
            self.onNt(SceneEvent.CLEAN_SCENE, self.onCleanScene, self);

            self.onNt(SceneEvent.SCENE_CFG_LOADED, self.onCfgLoaded, self);
            self.onNt(SceneEvent.SCENE_BLUR_LOADED, self.onBlurLoaded, self);

            this.onNt(SceneEvent.SCENE_CHANGE, this.playCSE, this);

            self.onNt(SceneEvent.ON_OBJ_ADD, self.onObjAdd, self);
            self.onNt(SceneEvent.ON_OBJ_DEL, self.onObjDel, self);
            self.onNt(SceneEvent.ON_OBJ_UPDATE, self.onObjUpdate, self);
            self.onNt(SceneEvent.ON_OBJ_MOVE, self.onObjMove, self);
            self.onNt(SceneEvent.ON_OBJ_USE_SKILL, self.onObjUseSkill, self);
            self.onNt(SceneEvent.ON_SKILL_BUFF, self.onObjSkillBuff, self);

            self.onNt(SceneEvent.ON_FIND_MONSTER, self.onFindMonster, self);
            self.onNt(SceneEvent.ON_CONTROL_MAIN_PLAYER_MOVE, self.onControlMainPlayerMove, self);
            self.onNt(SceneEvent.ON_MAIN_PLAYER_MOVE, self.onMainPlayerMove, self);
            self.onNt(SceneEvent.SET_HANG_UP, self.onSetHangUp, self);

            self.onNt(SceneEvent.ON_SCENE_SHAKE, self.onSceneShake, self);
            this.onNt(SceneEvent.ON_SKILL_TEXT_SHOW, this.onSkillTextShow, this);
            this.onNt(SceneEvent.ON_SKILL_TEXT_SHOW2, this.onSkillTextShow2, this);
            this.onNt(SceneEvent.ON_SKILL_BUF_SHOW, this.onObjSkillBuffShow, this);


            self.onNt(SceneEvent.BEZAIER_START_MOVE, self.testBezierMove, self);


            this.onNt(SceneEvent.FOE_TARGET_CHANGE, this.onFoeTargetChange, this);//切换攻击目标

            addEventListener(self._scene.dispatcher, SceneEvent.ON_BOSS_HP, self.onBossHpChanged);
            addEventListener(self._scene.dispatcher, SceneEvent.ON_NPC_CAMP, self.onNpcCampChanged);
            addEventListener(self._scene.dispatcher, SceneEvent.ON_MAIN_MOVE, self.sendMainPlayerMove);
            addEventListener(self._scene.dispatcher, SceneEvent.ON_REQUEST_MONSTER, self.requestMonster);

            this.onNt(LauncherEvent.ON_ACTIVATE, this.onActivate, this);
            this.onNt(LauncherEvent.ON_DEACTIVATE, this.onDeactivate, this);

            if (DEBUG) {
                self.onNt(SceneEvent.ON_SCENE_DEBUG_MOVE, self.updateSceneDebugMove, self);
            }
        }

        private onActivate(e: Event): void {
            this.clearDropItems();
        }

        private clearDropItems():void{
            this._proxy.clearSceneDropDatas();
            this._scene.clearDropItems();
        }

        private onDeactivate(e: Event): void {
            this.clearDropItems();
        }

        /**
         * 通知玩家移动
         * @param n
         */
        private onMainPlayerMove(n: GameNT) {
            let self = this;
            let msg: { x: number, y: number, moveType: number, handler: Handler, monsterIndex?: number, isOptPath?: boolean, dis?: number } = n.body;
            if (self._model.mainAi) self._model.mainAi.stopHandUp();
            if (msg.monsterIndex) {
                this._mainPlayer.vo.target_idx = msg.monsterIndex;
            }
            self.moveMainPlayer(msg.x, msg.y, msg.moveType, msg.handler, msg.isOptPath, msg.dis);
        }

        /**
         * 玩家移动
         * @param endX
         * @param endY
         * @param moveType
         * @param cb
         * @param isOptPath
         * @param dis
         */
        private moveMainPlayer(endX: number, endY: number, moveType?: number, cb?: Handler, isOptPath?: boolean, dis?: number) {
            if (!MapData.ins.isPointLegal(endX, endY)) {
                if (DEBUG) {
                    console.warn("moveMainPlayer：目标点出屏幕外, ai停止 "+ endX + " "+ endY);
                }
                this._model.mainAi && this._model.mainAi.startHangUp();
                return;
            }
            let player = this._mainPlayer;
            if (!player) {
                if (DEBUG) {
                    console.warn("moveMainPlayer：no Player, ai停止");
                }
                this._model.mainAi.startHangUp();
                return;
            }
            let curAct = player.actMgr.curAct;
            if (curAct instanceof MoveAct && (curAct.endTile.x == endX && curAct.endTile.y == endY || curAct.moveType == MoveType.Jump)) {
                //目标点一样和当前是跳跃return
                return;
            }
            let path;
            if (dis) {
                path = Scene.findAtkPath(player.vo.x, player.vo.y, endX, endY, dis);
            } else {
                path = Scene.findPath(player.vo.x, player.vo.y, endX, endY);
            }
            if (!path) {
                if (DEBUG) {
                    console.warn("moveMainPlayer：no path, ai停止");
                }
                this._model.mainAi.startHangUp();
                return;
            }
            if (path.length < 2) {
                if (cb) {
                    cb.exec();
                    Pool.release(cb);
                }
                return;
            }
            if (curAct instanceof AttackAct) {
                curAct.abort();
                player.actMgr.remove(curAct);
            }
            player.actMgr.removeAllActByCls(AttackAct);

            if (isOptPath && path.length > 2) { //最优路线
                let optPath = OptimalPath.getPath(path[0], path[path.length - 1], this._scene.mapId);
                if (optPath && optPath.length > 1) {
                    path = optPath;
                }
            }

            player.movePath(path, cb, moveType);
        }

        private onControlMainPlayerMove(n: GameNT) {
            if (!this._mainPlayer) {
                return;
            }
            let dir: number = n.body;
            let x = this._mainPlayer.vo.x;
            let y = this._mainPlayer.vo.y;
            let lastX = x;
            let lastY = y;
            if (dir == Direction.RIGHT || dir == Direction.RIGHT_DOWN || dir == Direction.RIGHT_UP) {
                if (MapData.ins.isPointLegal(x + 1, y)) {
                    lastX = x + 1;
                }
            }
            if (dir == Direction.LEFT || dir == Direction.LEFT_DOWN || dir === Direction.LEFT_UP) {
                if (MapData.ins.isPointLegal(x - 1, y)) {
                    lastX = x - 1;
                }
            }
            if (dir == Direction.UP || dir == Direction.RIGHT_UP || dir == Direction.LEFT_UP) {
                if (MapData.ins.isPointLegal(x, y - 1)) {
                    lastY = y - 1;
                }
            }
            if (dir == Direction.DOWN || dir == Direction.LEFT_DOWN || dir == Direction.RIGHT_DOWN) {
                if (MapData.ins.isPointLegal(x, y + 1)) {
                    lastY = y + 1;
                }
            }
            this.moveMainPlayer(lastX, lastY);
        }

        /// 血条更新///
        private onBossHpChanged(e: egret.Event) {
            if(SceneUtil.isSceneType(SceneType.KuafuDoufa) || SceneUtil.isSceneType(SceneType.XianjieLuandou)){
                // DEBUG && console.log(`onBossHpChanged，过滤的场景类型：`, this._proxy.curSceneType);
                this.sendNt(SceneEvent.ON_BOSS_HP_FILTER, e ? e.data : null);//抛出给过滤的场景监听使用
                return;//跨服斗法不弹boss血条，走自己界面显示
            }
            let msg: BossHpData = e.data;
            if (msg.percent > 0 && !this._proxy.curBossId) {
                //血量大于0且之前不在挑战boss状态
                facade.showView(ModName.Scene, SceneViewType.BigBossHp, msg);
            }
            else {
                this.sendNt(SceneEvent.ON_BOSS_HP, msg);//发送事件，在BigBossHpMdr里面监听
            }
        }

        /// 血条更新end///

        private onNpcCampChanged(e: egret.Event) {
            // this.sendNt(SceneEvent.ON_NPC_CAMP, e.data);
        }


        private requestMonster() {
            let self = this;
            let t = self._scene.sceneType;
            self._proxy.requestMonster();
        }

        private _timeOut: number = 0;

        private _tmpMsg: s2c_instance_find_monster;

        private _focusPt: Point = Pool.alloc(Point);

        private moveSceneToObj(obj: BaseSceneObj, duration: number = 800, delay: number = 200) {
            if (!obj) {
                return;
            }
            let self = this;
            let cb: Handler;
            let type = self._scene.sceneType;
            let startObj: BaseSceneObj = self._mainPlayer;
            let startPt = self._focusPt.setTo(startObj.x, startObj.y);
            let endPt: Point = Pool.alloc(Point).setTo(obj.x, obj.y);
            //
            Tween.get(startPt).to({
                x: endPt.x,
                y: endPt.y
            }, duration, Handler.alloc(self, self.updateFocus)).delay(delay).exec(cb);
            Pool.release(endPt);
        }

        private updateFocus() {
            this._scene.updateFocus(this._focusPt.x, this._focusPt.y);
        }

        private onFindMonster(n: GameNT) {
            let self = this;
            let sType = this._scene.sceneType;
            let msg: s2c_instance_find_monster = n.body;
            if (msg.entity_id != undefined) {
                self._proxy.foeTargetId = msg.entity_id;
                let vo = self._proxy.getVoById(msg.entity_id);
                if (vo) {
                    let dir = PointUtil.distance(self._mainPlayer.vo.x, self._mainPlayer.vo.y, vo.x, vo.y);
                    if (Math.round(dir) <= MOVE_AMEND_DIS && self._model.mainAi) {
                        self._model.mainAi.startHangUp();
                        return;
                    }
                }
                self._mainPlayer.vo.target_id = msg.entity_id;
            }

            self._mainPlayer.clearRequestStatus();
            if(self._model.mainAi){
                self._model.mainAi.stopHandUp();
            }
            if (self._timeOut) {
                clearDelay(self._timeOut);
                self._timeOut = 0;
            }
            self.delayCallFind(msg);
        }


        private delayCallFind(msg: s2c_instance_find_monster) {
            this.findMonster(msg.path_coords, msg.find_type);
        }

        private findMonster(pts: { x: number, y: number }[], type: number) {
            let self = this;
            if (!pts || pts.length == 0 || !self._mainPlayer || !self._model.mainAi) {
                return;
            }
            self._timeOut = 0;
            let main = self._mainPlayer;
            if (MapData.ins.isBlock(main.vo.x, main.vo.y)) {//容错处理，防止寻怪时人物停在了障碍点上
                let randomPt = SceneTools.getRandomPt(main.vo.x, main.vo.y, 1, 3);
                main.vo.x = randomPt.x;
                main.vo.y = randomPt.y;
                Pool.release(randomPt);
            }
            let moveType = MoveType.Find;
            let handle: Handler;
            handle = Handler.alloc(this, this.onFindMonsterMoveEnd, [moveType])
            this.moveMainPlayer(pts[0].x, pts[0].y, moveType, handle, true);//这里只执行第一个点
            if(pts.length > 1){
                console.info("path_coords下发了两个点，但是客户端只执行一个点");
            }
            //this.moveMainPlayer(pts[pts.length-1].x, pts[pts.length-1].y, moveType, handle, true);//执行最后一个点
        }

        //寻怪后
        private onFindMonsterMoveEnd(moveType: MoveType) {
            this._model.mainAi.startHangUp();
        }

        private sendMainPlayerMove(e: egret.Event) {
            let msg: { path: { x: number, y: number }[], mType: number } = e.data;
            this._proxy.doMove(msg.path, msg.mType);
        }

        private onObjSkillBuff(n: GameNT) {
            let msg: battle_use_skill = n.body;
            if (!this._scene.isSceneReady) {
                return;
            }
            let isMainPlayer: boolean = this._mainPlayer && this._mainPlayer.vo.entity_id.eq(msg.caster);
            let attacker: BaseActor = isMainPlayer ? this._mainPlayer : <BaseActor>this._scene.ctrl.getObj(msg.caster);
            if (!attacker) {
                return;
            }
        }

        private showSkillTips(skillIdx: number) {
            let cfg: BattleSkillConfig = SkillData.getCfg(skillIdx);
            if (!cfg) {
                return;
            }
            if (cfg.type2 > 4 && cfg.type2 != 13) { //没有资源暂时屏蔽
                return;
            }
            if (!this._scene.isShow) {
                return;
            }
            //技能类型显示
            // if(skillIdx == 123801000){
            //     GodSkillEftNameNew.getIns().show(skillIdx);
            // }else if (SkillData.isGodSkill(skillIdx)) {
            //     GodSkillEftName.getIns().show(skillIdx);
            // } else if (SkillData.isElementarySkill(skillIdx)) {
            //     SkillEftName.getIns().show(skillIdx);
            // }
        }

        // private onMainBeAtk(attacker: BaseActor) { //主角被其他玩家攻击时
        //     // let self = this;
        //     // let curTarget = self._model.mainAi.curTarget;
        //     // if (curTarget && curTarget.entity_id.neq(attacker.vo.entity_id)) {
        //     //     self._model.mainAi.curTarget = null;
        //     // }
        //     // self._proxy.foeTargetId = attacker.vo.entity_id;
        //     // self.sendNt(SceneEvent.ON_MAIN_PLAYER_BE_ATK, attacker.vo);
        // }

        //private preSkillTime = 0;

        private onObjUseSkill(n: GameNT) {
            let info: { x: number, y: number, skill: battle_use_skill } = n.body;
            let msg = info.skill;
            let scene = this._scene;

            if (!scene.isSceneReady) {
                return;
            }

            if (!msg.effect_list) {
                return;
            }

            let posX: number = info.x;
            let posY: number = info.y;
            if (!posY || !posX) {
                this.useSkillDirectly(msg);
                return;
            }

            let isMainPlayer: boolean = this._mainPlayer && this._mainPlayer.vo.entity_id.eq(msg.caster);
            let attacker: BaseActor = isMainPlayer ? this._mainPlayer : <BaseActor>scene.ctrl.getObj(msg.caster);
            if (!attacker || attacker.isDead || !attacker.parent) {
                return;
            }

            // if(attacker.enType == ObjectType.PET){
            //     if(this.preSkillTime == 0){
            //         console.log("第一次释放神灵技能");
            //         this.preSkillTime = Date.now();
            //     }else{
            //         let delay = Date.now()-this.preSkillTime;
            //         this.preSkillTime = Date.now();
            //         console.log("本次神灵技能跟上一次技能释放间隔时间 = "+ delay);
            //     }
            //
            // }

            // let target = this._proxy.getVoById(msg.focus);
            // if (!target && SkillData.getCfg(msg.skill_index).type1 != SkillType.YuLing) {
            //     return;
            // }

            // let atkX: number = attacker.x;
            // let atkY: number = attacker.y;
            // let curPt: Point = MapData.ins.getCellPt(atkX, atkY);
            //let dist: number = PointUtil.distance1(curPt, posX, posY);
            // let dis = 3;
            // if (dist > dis) {
            //     let tmpPath: Point[] = Scene.findPath(curPt.x, curPt.y, posX, posY);
            //     if (!tmpPath) {
            //         tmpPath = [];
            //         tmpPath[0] = Pool.alloc(Point).setTo(curPt.x, curPt.y);
            //         tmpPath[1] = Pool.alloc(Point).setTo(posX, posY);
            //     }
            //     attacker.movePath(tmpPath, Handler.alloc(this, this.moveEndUseSkillDirectly, [msg]));
            //     Pool.release(curPt);
            //     return;
            // }
            this.useSkillDirectly(msg);
        }

        // private moveEndUseSkillDirectly(skill: battle_use_skill) {
        //     let self = this;
        //     self.onFindMonsterMoveEnd(MoveType.Find);
        //     self.useSkillDirectly(skill);
        // }

        private useSkillDirectly(skill: battle_use_skill) {
            let self = this;
            let msg: battle_use_skill = skill;
            let scene = self._scene;
            let skillCfg = SkillData.getCfg(msg.skill_index);
            if(skillCfg.type1 == SkillType1.Huasheng){
                //过滤化神
                this.updateMainPlayerCD(msg);
                //return ;
            }

            // isMainPlayer 表示施法者是否是主角
            let isMainPlayer: boolean = self._mainPlayer && self._mainPlayer.vo.entity_id.eq(msg.caster);
            let attacker: BaseActor = isMainPlayer ? self._mainPlayer : <BaseActor>scene.ctrl.getObj(msg.caster);
            if (!attacker || attacker.isDead) {
                return;
            }
            let target = self._proxy.getVoById(msg.focus) as ActorVo;
            if(!target && skillCfg.type2 == SkillType2.PassiveSkill){
                //被动技能
                this.sendNt(SceneEvent.ON_SKILL_TEXT_SHOW, {
                    skill: skill,
                    x: msg.x,
                    y: msg.y,
                });
                return;
            }

            //主动技能瓢字
            if(target && skillCfg.battle_figure2){
                this.showActiveSkillsTxt(target.entity_id,skillCfg.battle_figure2);
            }

            // if (!target && skillCfg.type1 != SkillType.YuLing) {
            //     return;
            // }

            //主角被攻击
            if (!isMainPlayer && msg.focus.eq(self._mainPlayer.vo.entity_id)) {
                //玩家攻击主角
                if (attacker.vo.type == ObjectType.PLAYER) {
                    //self.onMainBeAtk(attacker);
                } else if (attacker.vo.type == ObjectType.MONSTER) {
                    //怪物攻击主角
                    self.sendNt(SceneEvent.ON_MAIN_PLAYER_BE_MONSTER_ATK, attacker.vo);
                }
            }


                let list = SkillEffectVo.allocList();
                for (let e of msg.effect_list) {
                    let target: BaseActor = <BaseActor>scene.ctrl.getObj(e.target);
                    if (target == null) {
                        continue;
                    }
                    if (e.is_dead) {
                        target.onFatalAtk();
                    }
                    let effectVo = Pool.alloc(SkillEffectVo);
                    effectVo.target = target;
                    effectVo.target_id = e.target;
                    effectVo.b_value = e.b_value;
                    effectVo.is_dead = e.is_dead;
                    effectVo.push_x = e.push_x;
                    effectVo.push_y = e.push_y;
                    effectVo.skillCfg = skillCfg;
                    list.push(effectVo);
                }

                let targetPt = target ? Pool.alloc(Point).setTo(target.x, target.y) : Pool.alloc(Point).setTo(msg.x, msg.y);
                let targetWorldPt = MapData.ins.getWorldPt(targetPt.x, targetPt.y, targetPt);

                if(this._proxy.curSceneType == SceneType.HangUp2 && attacker.vo.camp == 1){
                    let dir = self._mainPlayer.dir;
                    attacker.attack(msg.skill_index, msg.client_type, dir, list, targetWorldPt);
                }else{
                    let dir: number = GDirUtil.directionByTan2(attacker.x, attacker.y, targetPt.x, targetPt.y);
                    attacker.attack(msg.skill_index, msg.client_type, dir, list, targetWorldPt);
                }

            //施法者是主角，更新主句技能CD 时间
            if (isMainPlayer) {
                this.updateMainPlayerCD(msg);
            }

            //更新 仙法 仙剑 排队cd 时间
            let skill_index = msg.skill_index;
            if(SkillData.isSpecialSkill(skill_index)){
                let type1:SkillType1 = SkillData.getSkillType1(skill_index);
                let ssData = SpecialSkillList[type1];
                ssData.preTime = TimeMgr.time.time;
                ssData.preSkillId = skill_index;
            }

            //更新其他特殊技能 排队cd时间，目前包括 神兵 坐骑 元灵
            if(SkillData.isSpecialSkill2(skill_index)){
                SpecialSkillList2.preTime = TimeMgr.time.time;
                SpecialSkillList2.preSkillId = skill_index;
            }
        }

        //更新施法者是主句的技能CD
        private  updateMainPlayerCD(msg:battle_use_skill):void{
            let skill = this._mainPlayer.vo.skillsMap[msg.skill_index];
            if(skill){
                skill.use_time = msg.use_time;
                skill.next_use_time = msg.next_use_time;
            }
        }

        private onStageResize(): void {
            this._scene.onStageResize();
        }

        private onCleanScene(n?: GameNT): void {
            let data: CleanSceneData = n.body;
            let self = this;
            let clearAll = data && data.clearAll;
            if (clearAll) {
                self.clearMainPlayer();
            }
            clearDelay(self._timeOut);
            self._timeOut = 0;
            self._proxy.resetModel();
            if (self._model.mainAi) {
                self._model.mainAi.stopHandUp();
            }
            let m = self._mainPlayer;
            if (m) {
                let curAct = m.actMgr.curAct;
                if (curAct instanceof AttackAct) {
                    curAct.abort();
                }
                m.actMgr.removeAllActByCls(AttackAct);
                m.checkAct();
            }
            self._scene.clean(clearAll);
        }

        private onObjMove(n: GameNT) {
            let {id, path, moveType,moveTime} = n.body;
            if (!this._scene.isSceneReady) {
                return;
            }
            let obj: BaseActor = <BaseActor>this._scene.ctrl.getObj(id);
            if (!obj) {
                return;
            }

            if (moveType == MoveType.Push_Back) {
                (obj as Monster).pushBack(path[0],moveTime);
                return;
            }

            let pts: Point[] = [];
            if (moveType == MoveType.Jump) {
                pts.push(Pool.alloc(Point).setTo(obj.vo.x, obj.vo.y));
            }
            for (let p of path) {
                pts.push(Pool.alloc(Point).setTo(p.x, p.y));
            }

            obj.movePath(pts, null, moveType,moveTime);
        }

        private onObjAdd(n: GameNT) {
            if (!this._scene.isSceneReady) {
                return;
            }

            let vo: SceneObjVo = n.body;

            let obj = this.addObj(vo);
        }

        private addObj(vo: SceneObjVo): BaseSceneObj {
            let isMain = vo.type == ObjectType.PLAYER && (<GPlayerVo>vo).role_id && RoleVo.ins.role_id.eq((<GPlayerVo>vo).role_id);
            if (isMain) {
                return this.addMainPlayer(<MainGPlayerVo>vo);
            }
            let cls: new () => BaseSceneObj;
            if (vo.type == ObjectType.PET) {
                let buddyType: number = (<PetVo>vo).buddy_type
                cls = PetObjectCls[buddyType];
            } else {
                cls = ObjectCls[vo.type];
            }
            if (!cls) {
                return null;
            }

            let obj: BaseSceneObj = Pool.alloc(cls);
            obj.vo = vo;

            if(obj instanceof BaseActor){
                obj.setShowShadow(false);
                obj.setBodyIsShow(false);
            }

            if(obj.vo instanceof TriggerVo){
                (obj as Trigger).avatar.dsp.visible = false;
            }

            if(obj.vo instanceof MonsterVo){
                let  monsterType = (obj.vo as MonsterVo).monsterType;
                let self = this;
                if(monsterType == 2){
                    let cfg:SceneConfig = SceneUtil.getCurSceneCfg();
                    if(cfg.boss == 1){
                    //if(this._scene.sceneType == SceneType.HangUp2){
                        //触发boss 来袭效果
                        let isAdded = false;
                        let addObjToScene = function(){
                            if(!isAdded){
                                isAdded = true;
                                self._scene.addObj(obj);
                            }
                        }

                        obj.dsp.visible = false;

                        //暂停AI
                        //SceneUtil.requestControlAI(ControlAIType.Stop);

                        if(self._model.mainAi){
                            self._model.mainAi.stopAtk();
                        }
                        addObjToScene();


                        //走boss 来袭流程
                        PassBossTip.show(Handler.alloc(this,function () {
                            //addObjToScene();
                            if(obj.vo && self._proxy.getVoById(obj.vo.entity_id)){
                                obj.dsp.visible = true;
                            }
                        }));

                        delayCall(Handler.alloc(self,function () {
                            //self._proxy.requestControlAI(ControlAIType.Start);
                            SceneUtil.requestControlAI(ControlAIType.Start);
                            LogUtil.printBattle("通知后端开打");
                            //启动AI
                            if(self._model.mainAi){
                                self._model.mainAi.startAtk();
                            }
                        }),2000);

                        //做的保护
                        // delayCall(Handler.alloc(this,function () {
                        //     //addObjToScene();
                        //     if(obj.vo && self._proxy.getVoById(obj.vo.entity_id)){
                        //         obj.dsp.visible = true;
                        //     }
                        // }),10000);

                    } else {
                        //
                        // if(self._model.mainAi){
                        //     self._model.mainAi.setIntervalTime(2000);
                        // }
                        this._scene.addObj(obj);
                    }
                    return obj;
                }
            }

            this._scene.addObj(obj);
            return obj;
        }

        private onObjDel(n: GameNT) {
            let delVo: SceneObjVo = n.body;
            if (!this._scene.isSceneReady) {
                return;
            }

            let proxy: SceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            this._scene.removeObj(delVo.entity_id);

            let foeTargetId = proxy.getModel().foeTargetId;
            if (foeTargetId && foeTargetId.eq(delVo.entity_id)) {
                proxy.clearFoeTarget();//被攻击目标死亡或者退出场景时，清除
            }
        }

        /**攻击目标变更时，清除AI curTarget*/
        private onFoeTargetChange(): void {
            if (!this._mainPlayer || !this._model.mainAi) {
                return;
            }
            this._model.mainAi.curTarget = null;
        }

        /** 震屏 */
        private onSceneShake(n: GameNT) {
            let cfg: number[] = n.body;
            this._scene.shake(cfg);
        }

        private onObjUpdate(n: GameNT) {
            let self = this;
            let {id, keys} = n.body;
            if (!self._scene.isSceneReady) {
                return;
            }
            let obj = self._scene.ctrl.getObj(id);
            if (obj) {
                obj.applyUpdate(keys);
            }

            if (obj == self._mainPlayer) {
                if (keys.indexOf("camp") > -1) {
                    if (self._model.mainAi) {
                        self._model.mainAi.curTarget = null;
                    }
                    self.updateAllPlayerCamp();
                }
                if (keys.indexOf("buffs") > -1) {
                    self.sendNt(SceneEvent.ON_BUFF_UPDATE);
                }
                if (keys.indexOf("skills") > -1) {
                    // self.sendNt(SpellEvent.ON_SKILL_DATA_UPDATE);
                }
            }
        }

        private updateAllPlayerCamp() {
            let players = this._proxy.getVosByType(ObjectType.PLAYER);
            if (!players || players.length == 0) {
                return;
            }
            for (let p of players) {
                let obj = this._scene.ctrl.getObj(p.entity_id) as GPlayer;
                if (obj) {
                    obj.onCampUpdate();
                }
            }
        }

        private playCSE(): void {
            CloudEffectCtr.ins().show("scene_cloud", Handler.alloc(this, this.onCSEComp));
        }

        private onCSEComp() {
            LogUtil.printLogin("场景云播放完后请求进入场景 c2s_scene_enter (第二次握手)");
            this._proxy.confirmEnterMap();
        }

        private onCfgLoaded(n: GameNT): void {
            let mapId = SceneTools.getMapIdByScene(this._proxy.curSceneIdx);
            if (!mapId) {
                console.log("scene onCfgLoaded mapId error!!!", "mapId = " + mapId, "sceneIndex = " + this._proxy.curSceneIdx);
                return;
            }
            let data = n.body;
            MapData.ins.setSource(data);

            // //添加主角实体
            // this._proxy.addMainEntity();


            let handler = new BaseSceneCtrl();
            let m = this._proxy;
            m.isMapOk = true;
            this._scene.initScene(mapId, handler, m.curSceneType, m.curSceneIdx);
            let allVo = this._proxy.voList;
            for (let k in allVo) {
                let vo = allVo[k];
                this.addObj(vo);
            }

            //
            let cfg:SceneConfig = SceneUtil.getCurSceneCfg();
            if(cfg.headline){
                this.showHeadline(cfg.headline);
            }else{
                this._headLineGroup && (this._headLineGroup.alpha = 0);
                this.sendNt(SceneEvent.ON_SCENE_ENTER);
            }

            if (Object.keys(allVo).length > 0 && !this._mainPlayer) {
                return;
            }
        }

        private showHeadline(headline:string):void{

            if(!this._headLineGroup){
                this._headLineGroup = new eui.Group();
                this._headLineGroup.touchEnabled = false;
                //底
                let img = new eui.Image();
                img.source = "scene_name_di";
                this._headLineGroup.addChild(img);

                img = new eui.Image();
                img.source = headline;
                img.name = "headline";
                this._headLineGroup.addChild(img);

                this._headLineGroup.x = 150;
                this._headLineGroup.y = 200;
                Layer.main.addChildAt(this._headLineGroup,10000);
            }else{
                let img:eui.Image = this._headLineGroup.getChildByName("headline") as eui.Image;
                img.source = headline;
            }


            this._headLineGroup.alpha = 1;

            let self = this;
            Tween.remove(this._headLineGroup);
            Tween.get(this._headLineGroup).delay(2000).to({alpha: 0}, 500).exec(Handler.alloc(this,function () {
                 self.sendNt(SceneEvent.ON_SCENE_ENTER);
                if (self._headLineGroup && Layer.main && Layer.main.removeChild) {
                    Layer.main.removeChild(self._headLineGroup);//移除
                    self._headLineGroup = null;
                }
            }));
        }



        private onBlurLoaded(n: GameNT): void {
            let texture: Texture = n.body;
            this._scene.setBlur(texture);
        }

        private onUpdateHangUp(n: GameNT) {
            let b: boolean = n.body;
            if (b) {
                this._model.mainAi.startHangUp();
            }
        }

        /** 设置是否挂机 */
        private onSetHangUp(n: GameNT) {
            let open: boolean = n.body;
            if (!this._model.mainAi) return;
            if (open) {
                this._model.mainAi.startHangUp();
            } else {
                this._model.mainAi.stopHandUp();
            }
        }

        private dbgTime: number = 0;
        private dbgCount: number = 0;

        /**调试场景对象位置*/
        private debugSceneMove() {
            if (DEBUG) {
                if (TimeMgr.time.serverTime < this.dbgTime + 100) {
                    return;
                }
                this.dbgTime = TimeMgr.time.serverTime;
                let isOpen = (gso.dbg_scene & 2) != 0;
                if (isOpen) {
                    let model: SceneModel = this._proxy.getModel();
                    let keys = Object.keys(model.voList);
                    let list: Long[] = [];
                    for (let i = 0, len = keys.length; i < len; i++) {
                        list.push(Long.fromValue(keys[i]));
                    }
                    if (list.length) {
                        this._proxy.scene_print_entity_c2s(list);
                    }
                } else {
                    if (this._scene.ctrl) this._scene.ctrl.removeDebugAll();
                }
            }
        }

        private updateSceneDebugMove(n: GameNT) {
            if (DEBUG) {
                let msg: s2c_scene_print_entity = n.body;
                let list = Object.keys(this._scene.ctrl.objDebugMap);
                for (let i = 0, len = msg.print_entitys.length; i < len; i++) {
                    let entity = msg.print_entitys[i];
                    let key = entity.entity_id.toString();
                    let idx = list.indexOf(key);
                    let model: SceneModel = this._proxy.getModel();
                    let vo = model.voList[key];
                    if (idx != -1 || vo == null) {
                        ArrayUtil.removeAt(list, idx);
                    } else {
                        let cls: new () => BaseSceneObj;
                        if (vo.type == ObjectType.PET) {
                            cls = PetObjectCls[(<PetVo>vo).buddy_type];
                        } else {
                            cls = ObjectCls[vo.type];
                        }
                        let obj: BaseSceneObj = Pool.alloc(cls);
                        obj.vo = vo;
                        this._scene.ctrl.addDebugObj(obj);
                    }
                    let dbg_entity: BaseActor = this._scene.ctrl.objDebugMap[key] as BaseActor;
                    let pt = MapData.ins.getWorldPt(entity.x, entity.y);
                    dbg_entity.setWorldPos(pt.x, pt.y);
                    dbg_entity.alpha = 0.5;
                    let real_entity = this._scene.ctrl.getObj(dbg_entity.vo.entity_id) as BaseActor;
                    if (dbg_entity && real_entity) {
                        if (real_entity.vo.x == entity.x && real_entity.vo.y == entity.y) {
                            dbg_entity.x = real_entity.x;
                            dbg_entity.y = real_entity.y;
                            dbg_entity.headMgr.alpha = 0;
                        } else {
                            dbg_entity.headMgr.alpha = 1;
                        }
                        dbg_entity.act = real_entity.act;
                        dbg_entity.dir = real_entity.dir;
                        dbg_entity.headMgr.setName(`${dbg_entity.vo.name}`, UIColor.GREEN);
                    }
                    // if (real_entity) real_entity.headMgr.setName(`${dbg_entity.vo.name}:${entity.entity_id}`, UIColor.RED);
                    Pool.release(pt);
                }
                if (list.length == 0) return;
                for (let i = 0, len = list.length; i < len; i++) {
                    this._scene.ctrl.removeDebugById(list[i]);
                }
            }
        }

        //系统设置
        private _checkHideOtherObj(vo: SceneObjVo): boolean {
            // let objType: number = vo.type;
            // let selfEntityId: Long = this._mainPlayer ? this._mainPlayer.vo.entity_id : null;
            // let isPet = vo instanceof PetVo;
            // if (objType == ObjectType.PLAYER && vo.entity_id.neq(selfEntityId)) {
            //     return gso.isHideOtherPlayer;
            // } else if (isPet) {
            //     return gso.isHideOtherPartner || gso.isHideOtherPlayer;
            // }
            return false;
        }

        private refreshSettingInfo(): void {
            let _objMap: { [key: string]: BaseSceneObj } = this._scene.ctrl.getObjMap();
            let key = Object.keys(_objMap);
            if (key && key.length) {
                let _obj: BaseSceneObj = null;
                let objType: number = null;
                for (let _k of key) {
                    _obj = _objMap[_k];
                    if (!_obj || !_obj.vo) {
                        continue;
                    }

                    objType = _obj.vo.type;
                    if (objType != ObjectType.PLAYER && objType != ObjectType.PET) {
                        continue;
                    }

                    if (objType == ObjectType.PLAYER) {
                        this.updateOtherPlayerShow(_obj);

                    } else if (objType == ObjectType.PET) {
                        this.updateOtherPartnerShow(_obj);
                    }
                }
            }
        }

        private updateOtherPartnerShow(obj: BaseSceneObj) {
            // if (gso.isHideOtherPartner) {
            //     let _roleId: Long = (<PetVo>obj.vo).master_id;
            //     if (!_roleId || this._mainPlayer.vo.entity_id.neq(_roleId)) {
            //         if (obj.dsp.parent) obj.dsp.parent.removeChild(obj.dsp);
            //     }
            // } else {
            //     if (!obj.dsp.parent) this._scene.addDsp(obj);
            // }
        }

        private updateOtherPlayerShow(obj: BaseSceneObj): void {
            let player: GPlayer = obj as GPlayer;
            if (gso.isHideOtherPlayer) {
                let _roleId: Long = player.vo.role_id;
                if (!_roleId || this._mainPlayer.vo.role_id.neq(_roleId)) {
                    if (player.avatar.dsp && player.avatar.dsp.parent) {
                        player.dsp.removeChild(player.avatar.dsp);
                        // let shadow = Pool.alloc(ActorShadow);
                        // shadow.setActor(player);
                        // this._scene.addDsp(shadow);
                    }
                    // if (faQi && faQi.dsp.parent) faQi.dsp.parent.removeChild(faQi.dsp);
                    // if (plane && plane.dsp.parent) plane.dsp.parent.removeChild(plane.dsp);
                }
            } else {
                if (!player.avatar.dsp.parent) {
                    player.dsp.addChildAt(player.avatar.dsp, 1);
                    // if (player._shadow && player._shadow.parent) {
                    //     player._shadow.parent.remove(player._shadow);
                    //     player._shadow = null;
                    // }
                }
                // if (faQi && !faQi.dsp.parent) this._scene.addDsp(faQi);
                // if (plane && !plane.dsp.parent) this._scene.addDsp(plane);
            }
        }

        private fpsTime: number;
        private fps: number = 0;
        private fpsCount: number = 0;

        private checkFps() {
            let self = this;
            // if (!SoundMgr.ins.isActivate) return;
            if (self.fps < 15) {//长期低于15帧
                self.fpsCount++;
                if (self.fpsCount >= 20) { //长期指20秒
                    self.fpsCount = 0;
                    let misc: IMiscProxy = facade.retMod(ModName.Misc).retProxy(ProxyType.Misc);
                    let time = misc.getSetting(SettingKey.FPSSetLowTime);
                    let isCheck: boolean = true;
                    if (time) {
                        let t = Number(time);
                        if (TimeMgr.time.serverTimeSecond - t < 43200) {
                            isCheck = false;
                        }
                    }

                    // if (isCheck && (!gso.isHideOtherPlayer || !gso.isHideOtherPartner || !gso.isHideOtherPlayer)) {
                    //     gso.isHideOtherEft = true;
                    //     gso.isHideOtherPartner = true;
                    //     gso.isHideOtherPlayer = true;
                    //     self.refreshSettingInfo();
                    //     ViewMgr.getIns().show("检测游戏长期处于15帧以下已自动\n屏蔽其他玩家，屏蔽其他玩家伙伴，屏蔽其他玩家特效");
                    //     misc.setSetting(SettingKey.FPSSetLowTime, TimeMgr.time.serverTimeSecond.toString());
                    //     let proxy: IMainProxy = facade.retMod(ModName.Main).retProxy(ProxyType.Main);
                    //     proxy.saveSettingInfo();
                    // }

                }
            } else {
                self.fpsCount = 0;
            }
        }

        private onSkillTextShow(n: GameNT) {
            let altMsg: { skill: battle_use_skill, x: number, y: number } = n.body;
            if (!altMsg) {

                return;
            }
            let scene = this._scene;
            if (!scene.isSceneReady) {
                return;
            }
            let msg: battle_use_skill = altMsg.skill;

            let cfg:BattleSkillConfig = getConfigByNameId(ConfigName.Skill,msg.skill_index);
            let ptyType = cfg.battle_figure;

            let delay: number = cfg.delay || 250;//2000;//cfg.play_interval || 200;
            let dir = MathUtil.randomDir(Direction.NONE);
            for (let i = 0, len = msg.effect_list ? msg.effect_list.length : 0; i < len; i++) {
                let effect: battle_effect = msg.effect_list[i];
                let target: BaseActor = <BaseActor>scene.ctrl.getObj(effect.target);
                if (!target) {
                    continue;
                }

                for (let j = 0, length = effect.b_value.length; j < length; j++) {
                    let v = effect.b_value[j]
                    let type = v.value_type;
                    if (effect.target == this._mainPlayer.vo.entity_id) {
                        continue;
                    } else if (!altMsg.skill.caster.eq(this._mainPlayer.vo.entity_id)) {
                        continue;
                    }

                    //仙法技能强制修改了
                    if(ptyType){
                        type = [ptyType];
                    }

                    STxtMgr.ins.show(v.value.toString(), target.x, target.y, dir, type, delay * i,target);
                }
            }
        }

        private onSkillTextShow2(n: GameNT) {
            let msg: s2c_fly_bool = n.body;
            let e = this._scene.ctrl.getObj(msg.entity_id) as BaseActor;
            if(e){
                let dir = MathUtil.randomDir(e.dir);
                let strValue = msg.value.toString();
                if(strValue == "0"){
                    strValue = "";
                }
                STxtMgr.ins.show(msg.value.toString(), e.x, e.y, dir, [msg.type], 0,e);
            }else{
                console.log("实体 id = " + msg.entity_id + " 已被杀死，所以没瓢字");
            }
        }

        private onObjSkillBuffShow(n: GameNT){
            let msg: s2c_scene_add_effect = n.body;
            let e = this._scene.ctrl.getObj(msg.entity_id) as BaseActor;
            if(e){
                let dir = MathUtil.randomDir(e.dir);
                let cfg:EffectConfig = getConfigByNameId(ConfigName.Effect, msg.effect_id);
                if(cfg){
                    STxtMgr.ins.show("", e.x, e.y, dir, [cfg.battle_figure], 0,e);
                }
            }
        }

        //主动技能瓢字
        private showActiveSkillsTxt(entity_id:Long,hurtType:number):void{
            let e = this._scene.ctrl.getObj(entity_id) as BaseActor;
            if(e){
                let dir = MathUtil.randomDir(e.dir);
                STxtMgr.ins.show("", e.x, e.y, dir, [hurtType], 0,e);
            }
        }

    }
}