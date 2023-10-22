namespace game.mod.scene {
    import GameNT = base.GameNT;
    import s2c_scene_prepare_enter = msg.s2c_scene_prepare_enter;
    import c2s_scene_enter = msg.c2s_scene_enter;
    import s2c_scene_enter = msg.s2c_scene_enter;
    import c2s_scene_move = msg.c2s_scene_move;
    import s2c_scene_entity_update = msg.s2c_scene_entity_update;
    import s2c_scene_entity_delete = msg.s2c_scene_entity_delete;
    import scene_drop_data = msg.scene_drop_data;
    import scene_npc_data = msg.scene_npc_data;
    import GPlayerVo = game.scene.GPlayerVo;
    import s2c_scene_entity_move = msg.s2c_scene_entity_move;
    import s2c_scene_reset_coordinate = msg.s2c_scene_reset_coordinate;
    import s2c_scene_entity_add = msg.s2c_scene_entity_add;
    import c2s_battle_use_skill = msg.c2s_battle_use_skill;
    import s2c_battle_info = msg.s2c_battle_info;
    import s2c_instance_find_monster = msg.s2c_instance_find_monster;
    import s2c_instance_stop_hangup = msg.s2c_instance_stop_hangup;
    import MoveType = game.scene.MoveType;
    import ObjectType = game.scene.ObjectType;
    import ObjectVo = game.scene.ObjectVo;
    import s2c_scene_entity_stop_moving = msg.s2c_scene_entity_stop_moving;
    import PetVo = game.scene.PetVo;
    import scene_buddy_data = msg.scene_buddy_data;
    import SceneObjVo = game.scene.SceneObjVo;
    import system_team_members = msg.system_team_members;
    import c2s_role_scene_leave = msg.c2s_role_scene_leave;
    import c2s_instance_find_monster = msg.c2s_instance_find_monster;
    import c2s_instance_client_move_type = msg.c2s_instance_client_move_type;
    import s2c_instance_client_move_type = msg.s2c_instance_client_move_type;
    import coordinate = msg.coordinate;
    import s2c_instance_clear_find_entity = msg.s2c_instance_clear_find_entity;
    import SceneTools = game.scene.SceneTools;
    import c2s_scene_prepare_enter = msg.c2s_scene_prepare_enter;
    import scene_role_data = msg.scene_role_data;
    import battle_buff = msg.battle_buff;
    import SceneConfig = game.config.SceneConfig;
    import MonsterVo = game.scene.MonsterVo;
    import ActorVo = game.scene.ActorVo;
    import Scene = game.scene.Scene;
    import MonsterType = game.scene.MonsterType;
    import MainGPlayerVo = game.scene.MainGPlayerVo;
    import facade = base.facade;
    import c2s_pop_progressbar = msg.c2s_pop_progressbar;
    import c2s_scene_print_entity = msg.c2s_scene_print_entity;
    import s2c_scene_print_entity = msg.s2c_scene_print_entity;
    import teammate = msg.teammate;
    import c2s_battle_role_relife = msg.c2s_battle_role_relife;
    import s2c_battle_role_die = msg.s2c_battle_role_die;
    import s2c_battle_role_relife = msg.s2c_battle_role_relife;
    import c2s_change_scene = msg.c2s_change_scene;
    import NPCVo = game.scene.NPCVo;
    import s2c_instance_start_hangup = msg.s2c_instance_start_hangup;
    import c2s_scene_ride_oper = msg.c2s_scene_ride_oper;
    import scene_monster_data = msg.scene_monster_data;
    import c2s_play_conversation = msg.c2s_play_conversation;
    import MainGPlayer = game.scene.MainGPlayer;
    import Monster1Config = game.config.Monster1Config;
    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import c2s_scene_exit = msg.c2s_scene_exit;
    import SkillUseStatus = game.scene.SkillUseStatus;
    import s2c_fly_bool = msg.s2c_fly_bool;
    import s2c_scene_add_effect = msg.s2c_scene_add_effect;
    import s2c_scene_del_effect = msg.s2c_scene_del_effect;
    import BattleSkillConfig = game.config.BattleSkillConfig;
    import s2c_new_multiple_boss_hurt_rank = msg.s2c_new_multiple_boss_hurt_rank;
    import s2c_atk_role_max_hurt_role_info = msg.s2c_atk_role_max_hurt_role_info;
    import s2c_yijie_boss_hurt_rank = msg.s2c_yijie_boss_hurt_rank;
    import s2c_yongheng_boss_hurt_rank = msg.s2c_yongheng_boss_hurt_rank;
    import s2c_boss_srefresh_damage = msg.s2c_boss_srefresh_damage;
    import TimeMgr = base.TimeMgr;
    import Time = base.Time;
    import CommonAi = game.scene.CommonAi;
    import s2c_zhuimo_boss_hurt_rank = msg.s2c_zhuimo_boss_hurt_rank;
    import s2c_scene_fuben_end_time = msg.s2c_scene_fuben_end_time;

    /** 场景通用Proxy*/
    export class SceneProxy extends ProxyBase implements ISceneProxy {

        private _model: SceneModel;
        private _ntData: any = {};
        private _scene_drop_datas:msg.scene_drop_data[] = [];


        public getModel(): SceneModel {
            return this._model;
        }

        public initialize() {
            let self = this;
            self._model = new SceneModel();
            self.onProto(s2c_scene_prepare_enter, self.onSceneReady, self);
            self.onProto(s2c_scene_enter, self.onSceneEnter, self);
            self.onProto(s2c_scene_entity_add, self.onEntityAdd, self);
            self.onProto(s2c_scene_entity_update, self.onEntityUpdate, self);
            self.onProto(s2c_scene_entity_delete, self.onEntityDel, self);
            self.onProto(s2c_scene_entity_move, self.onEntityMove, self);
            self.onProto(s2c_scene_reset_coordinate, self.onResetMainPoint, self);
            self.onProto(s2c_battle_info, self.onUseSkill, self);
            self.onProto(s2c_instance_find_monster, self.onFindMonster, self);
            self.onProto(s2c_instance_stop_hangup, self.onStopHangUp, self);
            self.onProto(s2c_instance_start_hangup, self.onStartHangUp, self);
            self.onProto(s2c_scene_entity_stop_moving, self.onStopMove, self);
            self.onProto(s2c_instance_client_move_type, self.onAutoHangUpUpdate, self);
            self.onProto(s2c_instance_clear_find_entity, self.onClearCurTarget, self);
            if (DEBUG) {
                self.onProto(s2c_scene_print_entity, self.scene_print_entity_s2c, self);
            }
            self.onProto(s2c_battle_role_die, self.battle_role_die_s2c, self);
            self.onProto(s2c_battle_role_relife, self.battle_role_relife_s2c, self);

            self.onProto(s2c_fly_bool, self.s2c_fly_bool, self);
            self.onProto(s2c_scene_add_effect, self.scene_add_effect,self);
            self.onProto(s2c_scene_del_effect, self.scene_del_effect,self);

            this.onProto(s2c_new_multiple_boss_hurt_rank, this.s2c_new_multiple_boss_hurt_rank, this);
            this.onProto(s2c_atk_role_max_hurt_role_info, this.s2c_atk_role_max_hurt_role_info, this);
            this.onProto(s2c_yijie_boss_hurt_rank, this.s2c_yijie_boss_hurt_rank, this);
            this.onProto(s2c_yongheng_boss_hurt_rank, this.s2c_yongheng_boss_hurt_rank, this);
            this.onProto(s2c_boss_srefresh_damage, this.s2c_boss_srefresh_damage, this);

            this.onProto(s2c_zhuimo_boss_hurt_rank,this.s2c_zhuimo_boss_hurt_rank,this);

            this.onProto(s2c_scene_fuben_end_time,this.s2c_scene_fuben_end_time,this);

            TimeMgr.addUpdateItem(this);
        }


        public get curSceneIdx(): number {
            return this._model.curSceneIdx;
        }

        public get isEnterScene(): boolean {
            return this._model.isEnterScene;
        }

        public get isMapOk(): boolean {
            return this._model.isMapOk;
        }

        public set isMapOk(v: boolean) {
            this._model.isMapOk = v;
        }

        public get lastSceneIdx(): number {
            return this._model.lastSceneIdx;
        }

        public get mainPlayerObj(): MainGPlayer {
            return this._model.mainPlayer;
        }

        public get scene(): Scene {
            return this._model.scene;
        }

        public get mainPlayerVo(): MainGPlayerVo {
            return this._model.mainPlayerVo;
        }

        public get enemyInfo(): { id: Long, type: number } {
            return this._model.enemyInfo;
        }

        public set enemyInfo(value: { id: Long, type: number }) {
            this._model.enemyInfo = value;
        }

        public get mainPlayerBuffList(): battle_buff[] {
            return this.mainPlayerVo && this.mainPlayerVo.buffs;
        }

        public get firstEnter(): boolean {
            //return this.curSceneIdx == 0 || (this.isMapOk == false && this.lastSceneIdx == 0);
            return this._model.isFirstEnter;
        }

        public setFirstEnter(ret:boolean):void{
            this._model.isFirstEnter = ret;
        }

        public get curSceneType(): number {
            return this.getSceneType(this.curSceneIdx);
        }

        public get isAutoHangUp(): boolean {
            return this._model.isAutoHangUp;
        }

        public get isServerControl(): boolean {
            return this._model.isServerControl;
        }

        public get isSceneEft(): number {
            return this._model.isSceneEft;
        }

        public get voList(): { [key: string]: SceneObjVo } {
            return this._model.voList;
        }

        public getSceneType(id: number): number {
            if (!id) {
                return 0;
            }
            let cfg: SceneConfig = getConfigByNameId(ConfigName.Scene, id);
            if (!cfg) {
                return 0;
            }
            return cfg.map_type;
        }

        public isTargetAtkEnable(id: Long): boolean {
            if (!id) {
                return false;
            }
            let target = this._model.voList[id.toString()] as ActorVo;
            if (!target) {
                return false;
            }
            let main = this.mainPlayerVo;
            if (!main || !SceneTools.isSelfReady(main)) {
                return false;
            }
            if (!SceneTools.isTargetReady(<ActorVo>target)) {
                return false;
            }
            let dis = this.getMaxAtkDistance();
            if (target instanceof MonsterVo && target.index) {
                let cfg: Monster1Config = getConfigByNameId(ConfigName.Monster, target.index);
                if (cfg && cfg.hit_scope) {
                    dis += cfg.hit_scope;
                }
            }
            let path = Scene.findAtkPath(main.x, main.y, target.x, target.y, dis);
            return !(!path || path.length > 2);
        }

        /** 获取仇恨目标 */
        public getFoeTarget(camp?: number): GPlayerVo {
            let main = this.mainPlayerVo;
            if (!SceneTools.isSelfReady(main)) {
                return null;
            }
            let sType = this.curSceneType;
            let totalPlayers: GPlayerVo[] = this.getVosByType(ObjectType.PLAYER) as GPlayerVo[];
            if (!totalPlayers || totalPlayers.length == 0) {
                return null;
            }
            let dis = this.getMaxAtkDistance();
            let enemies = [];
            for (let p of totalPlayers) {
                if (camp && p.camp != camp) {
                    continue;
                }
                if (this.foeTargetId && p.entity_id.eq(this.foeTargetId)) {
                    continue;
                }
                if (!SceneTools.isTargetReady(p)) {
                    continue;
                }
                let path = Scene.findAtkPath(main.x, main.y, p.x, p.y, dis);
                if (!path) {
                    continue;
                }
                if (path.length < 2) {
                    enemies.push(p);
                }
            }
            let len = enemies.length;
            return enemies[Math.floor(Math.ceil(Math.random() * (len-1)))] || enemies[0];
        }

        public addVo(vo: SceneObjVo, type: number) {
            let list = this._model.typeVoMap[type];
            list.push(vo);
            let id: Long = vo.entity_id;
            this._model.voList[id.toString()] = vo;
        }

        public delVo(id: Long): SceneObjVo {
            let key = id.toString();
            let del: SceneObjVo = this._model.voList[key];
            if (!del) {
                return null;
            }

            let list = this._model.typeVoMap[del.type];
            if (list != undefined) {
                for (let i = 0, l = list.length; i < l; ++i) {
                    if (list[i] && list[i].entity_id && list[i].entity_id.eq(id)) {
                        ArrayUtil.removeAt(list, i);
                        break;
                    }
                }
            }
            delete this._model.voList[key];
            return del;
        }

        public getVosByCamp(camp: number): ActorVo[] {
            let vos = [];
            for (let k in this._model.voList) {
                let vo = this._model.voList[k] as ActorVo;
                if (vo.type == ObjectType.TEAM_PLAYER || vo.type == ObjectType.DROP_ITEM) {
                    continue;
                }
                if (vo.camp == camp) {
                    vos.push(vo);
                }
            }
            return vos;
        }

        /**
         * 获取可攻击的敌人
         * @param {number} type 指定返回敌人的类型
         * @returns {game.scene.ActorVo[]}
         */
        public getEnemyVos(type?: number): ActorVo[] {
            let vos = [];
            let mVo = this.mainPlayerVo;
            for (let k in this._model.voList) {
                let vo = this._model.voList[k] as ActorVo;
                if (mVo.entity_id.eq(vo.entity_id)) {
                    //过滤玩家自己
                    continue;
                }
                if (type && vo.type != type) {
                    //过滤非指定敌人类型
                    continue;
                }
                if (vo.type == ObjectType.TEAM_PLAYER || vo.type == ObjectType.DROP_ITEM || vo.type == ObjectType.PET) {
                    //过滤部分类型实体，todo,待整理
                    continue;
                }

                //存在阵营时优先判断同阵营，再判断战队帮派
                if (mVo.camp) {
                    //玩家存在camp时，则过滤相同camp类型的敌人
                    if(vo.camp == mVo.camp){
                        continue;
                    }
                }
                else if(type == ObjectType.PLAYER){
                    //敌人为其他玩家时，过滤相同宗门和战队的玩家
                    let gPlayerVo = vo as GPlayerVo;
                    if(mVo.guild_id && gPlayerVo.guild_id == mVo.guild_id){
                        continue;
                    }
                    if(mVo.team_id && !mVo.team_id.isZero() && gPlayerVo.team_id && gPlayerVo.team_id.eq(mVo.team_id)){
                        continue;
                    }
                }
                vos.push(vo);
            }
            return vos;
        }

        public getBossVo(): MonsterVo {
            let vos = this.getEnemyVos(ObjectType.MONSTER) as MonsterVo[];
            if (!vos || vos.length == 0) {
                return null;
            }
            let bossList = [];
            for (let v of vos) {
                if (v.monsterType == MonsterType.Boss) {
                    bossList.push(v);
                }
            }
            if (!bossList.length) {
                return null;
            }
            if (bossList.length == 1) {
                return bossList[0];
            }
            let minIdx: number = 0;
            let minDis: number = PointUtil.distanceSquare(this.mainPlayerVo.x, this.mainPlayerVo.y, bossList[0].x, bossList[0].y);
            for (let i = 1, l = bossList.length; i < l; ++i) {
                let vo = bossList[i];
                let dis = PointUtil.distanceSquare(this.mainPlayerVo.x, this.mainPlayerVo.y, vo.x, vo.y);
                if (dis < minDis) {
                    minDis = dis;
                    minIdx = i;
                }
            }
            return bossList[minIdx];
        }

        public getVosByType(type: number): SceneObjVo[] {
            return this._model.typeVoMap[type];
        }

        public getVoById(id: Long): SceneObjVo {
            if (!id) {
                return null;
            }
            return this._model.voList[id.toString()];
        }

        public getVosTypeById(_id: Long): number {
            let _infos: { [type: number]: SceneObjVo[] } = this._model.typeVoMap;
            for (let k in _infos) {
                let data = _infos[k];
                if (!data) {
                    continue;
                }

                for (let v of data) {
                    if (v && v.entity_id.eq(_id)) {
                        return Number(k);
                    }
                }
            }
            return -1;
        }

        public getVosByTeamId(teamId?: Long): GPlayerVo[] {
            let vos: GPlayerVo[] = [];
            for (let i in this._model.voList) {
                let vo = this._model.voList[i];
                // if (vo instanceof GPlayerVo && vo.role_id.neq(this.mainPlayerVo.role_id) && (!teamId || !vo.guild_team_id || vo.guild_team_id.neq(teamId))) {
                //     vos.push(vo);
                // }
            }
            return vos;
        }

        public getRoleVoById(id: Long): GPlayerVo {
            if (!id) {
                return null;
            }
            let vos: GPlayerVo[] = this.getVosByType(ObjectType.PLAYER) as GPlayerVo[];
            if (!vos || vos.length == 0) {
                return null;
            }
            for (let v of vos) {
                if (v.entity_id.eq(id)) {
                    return v;
                }
            }
            return null;
        }

        public getVoByRoleId(roleId: Long, camp?: number): GPlayerVo {
            if (!roleId) {
                return null;
            }
            let vos: GPlayerVo[] = this.getVosByType(ObjectType.PLAYER) as GPlayerVo[];
            if (!vos || vos.length == 0) {
                console.warn("class SceneProxy At getVoByRoleId error 1",vos);
                return null;
            }
            for (let v of vos) {
                if (camp != undefined && v.camp != camp) {
                    continue;
                }
                if (v.role_id.eq(roleId)) {
                    return v;
                }
            }
            console.warn("class SceneProxy At getVoByRoleId error 2",vos);
            return null;
        }

        public resetModel(): void {
            this._model.isAutoHangUp = true;

            for (let k in this._model.voList) {
                this._model.voList[k] = null;
                delete this._model.voList[k];
            }
            for (let k in this._model.typeVoMap) {
                if (this._model.typeVoMap[k]) {
                    this._model.typeVoMap[k].length = 0;
                }
            }
        }

        /** 骑乘    0不坐 1坐 */
        public scene_ride_oper_c2s(ride_state: number, ride_x?: number, ride_y?: number) {
            let msg: c2s_scene_ride_oper = new c2s_scene_ride_oper();
            msg.ride_state = ride_state;
            if (ride_x != null) {
                msg.ride_x = ride_x;
                msg.ride_y = ride_y;
            }
            this.sendProto(msg);
        }

        public onStartReconnect(): void {
            super.onStartReconnect();
            //this._model.curSceneIdx = 0;
            this._model.isFirstEnter = true;
            this._model.isMapOk = false;
            this.resetModel();
        }

        public enterScene(mapId: number): void {
            LogUtil.printLogin("请求进入场景(第一次握手)c2s_scene_prepare_enter mapId = " + mapId);
            let c2s: c2s_scene_prepare_enter = new c2s_scene_prepare_enter();
            c2s.scene_index = mapId;
            this.sendProto(c2s);
        }

        public confirmEnterMap() {
            let c = new c2s_scene_enter();
            c.scene_id = this._model.sceneId;
            c.scene_index = this._model.curSceneIdx;
            this.sendProto(c);
        }

        public doMove(list: { x: number, y: number }[], moveType: number = MoveType.Normal): void {
            if (this.isServerControl) {
                return;
            }
            let c2s: c2s_scene_move = new c2s_scene_move();
            c2s.move_type = moveType;
            c2s.coordinate_list = list;
            this.sendProto(c2s);
        }

        public useSkill(skillIdx: number, focus: Long, type?: number[], x?: number, y?: number, tx?: number, ty?: number) {
            let c2s: c2s_battle_use_skill = new c2s_battle_use_skill();
            c2s.skill_index = skillIdx;
            c2s.focus = focus;
            c2s.client_type = type;
            c2s.x = x;
            c2s.y = y;
            c2s.focus_x = tx;
            c2s.focus_y = ty;
            this.sendProto(c2s);
        }

        public requestMonster(entity_id?: Long) {
            let req: c2s_instance_find_monster = new c2s_instance_find_monster();
            if (entity_id) req.entity_id = entity_id;
            this.sendProto(req);
        }

        //请求 服务器AI 1、停止 2、启动
         public requestControlAI(type?:number) {
            let req: msg.c2s_control_ai = new msg.c2s_control_ai();
            req.type = type || ControlAIType.Start;
            req.scene_id = this._model.sceneId;
             LogUtil.printLogin("客户端发给后端的 req.scene_id = "+req.scene_id);
            this.sendProto(req);
        }


        public setAutoHangUp() {
            this.sendProto(new c2s_instance_client_move_type());
        }

        public clearFoeTarget() {
            this.foeTargetId = null;
        }

        public getMaxAtkDistance(): number {
            if (!this.mainPlayerVo) {
                return 0;
            }
            let skills = this.mainPlayerVo.skills;
            if (!skills) {
                return 0;
            }
            let dis: number = 0;
            for (let s of skills) {
                let max_dis = SkillData.getCfg(s.skill_idx).max_distance;
                if (max_dis > dis) {
                    dis = max_dis;
                }
            }
            return dis;
        }

        private onSceneReady(n: GameNT): void {
            LogUtil.printLogin("场景协议 s2c_scene_prepare_enter 第一次握手返回");
            let s2c: s2c_scene_prepare_enter = n.body;
            let loginProxy: ILoginProxy = facade.retMod(ModName.Login).retProxy(ProxyType.Login);
            if (!loginProxy.role_id) {
                LogUtil.printLogin("角色id 为空的");
            }

            if (!s2c.scene_index) {
                LogUtil.printLogin("场景 scene_index 为空的");
            }

            this._model.isEnterScene = false;
            this._model.isMapOk = false;
            //this._model.lastSceneIdx = this._model.curSceneIdx;
            if(this._model.isFirstEnter){
                this._model.lastSceneIdx = 0;
            }else{
                this._model.lastSceneIdx = this._model.curSceneIdx;
            }
            this._model.curSceneIdx = s2c.scene_index;
            this._model.sceneId = s2c.scene_id;
            LogUtil.printLogin("服务器发过来的 s2c.scene_id = "+s2c.scene_id);
            this._model.isServerControl = s2c.server_ctrl;
            this._model.isSceneEft = s2c.sceneEft;
            this._model.isAutoHangUp = true;
            this._model.maxHurt = null;//进入场景时候清除下最高伤害攻击者，防止上一场数据影响

            this.clearFoeTarget();//进入场景时清除攻击目标
            this.sendNt(SceneEvent.ON_SCENE_READY, s2c.scene_index);

            //delayCall(Handler.alloc(this,(info:s2c_scene_prepare_enter)=>{
                //LogUtil.printLogin("创建主角实体");
                this._model.role_info = s2c.role_info;
                this.addEntity(ObjectType.PLAYER, this._model.role_info);
                //this.addEntity(ObjectType.PLAYER, s2c.role_info);
            //},[s2c]),500);
        }

        //添加主角实体
        public addMainEntity():void{
            this.addEntity(ObjectType.PLAYER, this._model.role_info);
        }

        private onSceneEnter(): void {
            LogUtil.printLogin("服务器返回 s2c_scene_enter ");
            this._model.isEnterScene = true;
            //this.sendNt(SceneEvent.ON_SCENE_ENTER);
        }

        private onEntityUpdate(n: GameNT) {
            let s2c: s2c_scene_entity_update = n.body;
            if (s2c.role_infos) {
                for (let player of s2c.role_infos) {
                    this.updateVo(ObjectType.PLAYER, player);
                }
            }
            if (s2c.monster_infos) {
                for (let monster of s2c.monster_infos) {
                    this.updateVo(ObjectType.MONSTER, monster);
                }
            }
            if (s2c.npc_infos) {
                for (let npc of s2c.npc_infos) {
                    this.updateVo(ObjectType.NPC, npc);
                }
            }
            if (s2c.buddy_infos) {
                for (let pet of s2c.buddy_infos) {
                    this.updateVo(ObjectType.PET, pet);
                }
            }
            if (s2c.collect_infos) {
                for (let collect of s2c.collect_infos) {
                    this.updateVo(ObjectType.COLLECT, collect);
                }
            }
        }

        private updateVo(type: number, data: any) {
            let entityId;
            if (type == ObjectType.DROP_ITEM) {
                entityId = (<scene_drop_data>data).entity_id;
            } else {
                entityId = (<scene_npc_data>data).walk_entity_info.entity_info.entity_id;
            }
            if (!entityId) {
                console.error("updateVo entityId 错误", data);
                return;
            }
            let old = this.getVoById(entityId);
            if (!old) {
                return;
            }

            if (type == ObjectType.PLAYER) { //角色复活添加
                let updateData = (<scene_role_data>data).walk_entity_info;
                let d = <GPlayerVo>old;
                if (d.percent <= 0 && d.role_id && d.role_id.neq(RoleVo.ins.role_id) && updateData && updateData.percent > 0) {
                    old.applyUpdate(data);
                    this.sendNt(SceneEvent.ON_OBJ_ADD, old);
                    return;
                }
            }
            let updateKeys: string[] = old.applyUpdate(data);
            if (0 == updateKeys.length) {
                return;
            }
            if (type == ObjectType.PLAYER) { //角色死亡删除
                let d = <GPlayerVo>old;
                if (d.role_id && d.role_id.neq(RoleVo.ins.role_id) && d.percent <= 0) {
                    this.sendNt(SceneEvent.ON_OBJ_DEL, old);
                    return;
                }
            }
            let tmp = this._ntData;
            tmp.id = old.entity_id;
            tmp.keys = updateKeys;
            this.sendNt(SceneEvent.ON_OBJ_UPDATE, tmp);
            delete tmp.id;
            delete tmp.keys;
            if (updateKeys.indexOf("coordinate_list") > -1) {
                this.doObjMove(old.entity_id, data.coordinate_list, data.moveType);
            }
        }

        //重置场景掉落数据
        public clearSceneDropDatas():void{
            this._scene_drop_datas = [];
        }

        update(time: Time): void{
            let index = 0;
            while(index < 10){
                if(this._scene_drop_datas.length > 0){
                    let data = this._scene_drop_datas.shift();
                    this.addEntity(ObjectType.DROP_ITEM,data);
                }else{
                    break;
                }
                index++;
            }
        }

        private onEntityAdd(n: GameNT) {
            let s2c: s2c_scene_entity_add = n.body;

            //玩家
            if (s2c.role_infos) {
                for (let player of s2c.role_infos) {
                    this.addEntity(ObjectType.PLAYER, player);
                }
            }

            //怪物
            if (s2c.monster_infos) {
                for (let monster of s2c.monster_infos) {
                    // console.log("=========" + monster.walk_entity_info.entity_info.entity_id)
                    this.addEntity(ObjectType.MONSTER, monster);
                }
            }

            //NPC 人物
            // if (s2c.npc_infos) {
            //     for (let npc of s2c.npc_infos) {
            //         this.addEntity(ObjectType.NPC, npc);
            //     }
            // }

            //伙伴
            if (s2c.buddy_infos) {
                for (let pet of s2c.buddy_infos) {
                    // @ts-ignore 把 Long 类型强制转换成 number
                    pet.index = pet.index.toNumber();
                    this.addEntity(ObjectType.PET, pet);
                }
            }

            //掉落物
            if (s2c.drop_infos && gso.gameIsActivate) {
                let length = s2c.drop_infos.length;
                if(length >= 200){
                    console.error("掉落物品数量:"+length+" 大于200了");
                }
                for(let drop of s2c.drop_infos) {
                    this._scene_drop_datas.push(drop);
                }
            }

            //采集物
            // if (s2c.collect_infos) {
            //     for (let collect of s2c.collect_infos) {
            //         this.addEntity(ObjectType.COLLECT, collect);
            //     }
            // }

            //可交互的实体
            // if (s2c.trigger_infos) {
            //     for (let trigger of s2c.trigger_infos) {
            //         this.addEntity(ObjectType.TRIGGER, trigger);
            //     }
            // }
        }

        /* data
        scene_role_data
        scene_monster_data
        scene_npc_data
        scene_buddy_data
        scene_drop_data
        scene_collect_data
        scene_trigger_data
        */
        private addEntity(type: number, data:any) {

            // if(!this.checkBorn(data)){
            //     return;
            // }

            let self = this;
            let id;
            if (type == ObjectType.DROP_ITEM) {
                id = (<scene_drop_data>data).entity_id;
            } else if (type == ObjectType.TEAM_PLAYER) {
                id = (<system_team_members>data).role_id;
            } else {
                id = (<scene_npc_data>data).walk_entity_info.entity_info.entity_id;
            }
            if (!id) {
                console.error("addEntity id 错误", type, data);
                return;
            }
            if (type == ObjectType.PLAYER && !data.role_id) {
                console.error("场景添加角色,没有发role_id", data);
                return;
            }
            let old = self.getVoById(id);
            if (old) {
                return;
            }
            let isMain = type == ObjectType.PLAYER && RoleVo.ins.role_id.eq((<GPlayerVo>data).role_id);
            let vo: SceneObjVo;
            if (isMain) {
                vo = new MainGPlayerVo(ObjectType.PLAYER);
            } else if (type == ObjectType.PET) {
                let buddyData: scene_buddy_data = data;
                vo = new PetVo(type);
                (<PetVo>vo).isMainPet = self._model.mainPlayerVo && self._model.mainPlayerVo.entity_id.eq(buddyData.master_id);
                // if (!(<PetVo>vo).isMainPet && (SceneTools.isOptimizeScene(this.curSceneType) || gso.maskPet)) {//至尊boss 世界boss场景不添加其他人的侍从
                //     return;
                // }
            } else {
                let cls = ObjectVo[type];
                if (!cls) {
                    return;
                }
                vo = new cls(type);
            }
            vo.applyUpdate(data);
            if (isMain) {
                self._model.mainPlayerVo = <MainGPlayerVo>vo;
            }
            if (type == ObjectType.TEAM_PLAYER) {
                vo.x = self._model.mainPlayerVo.x;
                vo.y = self._model.mainPlayerVo.y;
            }
            self.addVo(vo, type);

            if (!isMain && type == ObjectType.PLAYER && (<GPlayerVo>vo).percent <= 0) {
                return;
            }
            self.sendNt(SceneEvent.ON_OBJ_ADD, vo);
        }

        //实体移除
        private onEntityDel(n: GameNT) {
            let s2c: s2c_scene_entity_delete = n.body;
            if (!s2c.entity_ids) {
                console.error("onEntityDel！", s2c);
                return;
            }
            for (let id of s2c.entity_ids) {
                // console.log("++++++"+id);
                let del = this.delVo(id);
                if (del) {
                    this.sendNt(SceneEvent.ON_OBJ_DEL, del);
                }
            }
        }

        //停止移动
        private onStopMove(n: GameNT) {
            let msg: s2c_scene_entity_stop_moving = n.body;
            this.resetPoint(msg.entity_id, msg.x, msg.y);
        }

        //实体移动
        private onEntityMove(n: GameNT) {
            let s2c: s2c_scene_entity_move = n.body;
            if (!s2c.entity_coordinates) {
                console.error("协议错误！s2c_scene_entity_move");
                return;
            }
            for (let data of s2c.entity_coordinates) {
                if (!data.coordinate_list) {
                    console.error("移动协议没有发移动路径！", data);
                    continue;
                }


                if(MainGPlayer.ins && MainGPlayer.ins.vo.entity_id.eq(data.entity_id)){
                    console.log("收到服务器叫主角移动协议");
                }


                if(data.move_type == MoveType.Push_Back){
                    LogUtil.printBeatBack("打了一次击退");
                }

                if (data.coordinate_list.length <= 1 && data.move_type != MoveType.Jump && data.move_type != MoveType.Push_Back) {
                    this.resetPoint(data.entity_id, data.coordinate_list[0].x, data.coordinate_list[0].y);
                } else {

                    if(data.move_type == MoveType.Push_Back){
                        LogUtil.printBeatBack("击退:"+data.entity_id+","+data.coordinate_list[0].x+","+data.coordinate_list[0].y);
                    }else{
                        let len = data.coordinate_list.length;
                        LogUtil.printBeatBack("走回来:"+data.entity_id+","+data.coordinate_list[len-1].x+","+data.coordinate_list[len-1].y);
                    }

                    this.doObjMove(data.entity_id, data.coordinate_list, data.move_type,data.time);
                }
            }
        }

        private doObjMove(id: Long, path: coordinate[], moveType = MoveType.Normal,moveTime?:number) {
            this.sendNt(SceneEvent.ON_OBJ_MOVE, {id:id,moveType:moveType,path:path,moveTime:moveTime});
        }

        private resetPoint(id: Long, x: number, y: number) {
            let tmp = this._ntData;
            tmp.id = id;
            tmp.x = x;
            tmp.y = y;
            this.sendNt(SceneEvent.ON_RESET_PLAYER_PT, tmp);
            delete tmp.id;
            delete tmp.x;
            delete tmp.y;
        }


        private onResetMainPoint(n: GameNT) {
            let msg: s2c_scene_reset_coordinate = n.body;
            this.resetPoint(msg.entity_id, msg.x, msg.y);
        }


        //技能返回
        private onUseSkill(n: GameNT) {
            let msg: s2c_battle_info = n.body;
            if (!msg.skill_list || gso.dbg_stop_ai) {
                return;
            }

            let self = this;
            //
            for (let skill of msg.skill_list) {
                if (skill.cure_info) {
                    self.sendNt(SceneEvent.ON_SKILL_BUFF, skill);
                    continue;
                }
                if (!skill.skill_index) {
                    continue;
                }

                //第二轮 瓢字逻辑
                if (msg.round && msg.round > 1) {
                    this.sendNt(SceneEvent.ON_SKILL_TEXT_SHOW, {
                        skill: skill,
                        x: msg.x,
                        y: msg.y,
                    });
                    continue;
                }

                //施法者是主角
                if (skill.caster && self.mainPlayerVo && skill.caster.eq(self.mainPlayerVo.entity_id)) {
                    if (self._model.mainAi) {
                        self._model.mainAi.clearUsingSkillStatus();
                    }

                    if(!SkillData.isCommonAtk(skill.skill_index)){
                        console.log("skill.reason = "+skill.reason);
                        console.log("服务器返回 主角释放 skill.skill_index = "+skill.skill_index);
                    }
                    //console.log("服务器返回 主角释放 skill.skill_index = "+skill.skill_index);
                    //console.log("主角释放技能状态 skill.reason = "+ skill.reason);
                }

                //血条显示逻辑
                for (let i = 0, len = skill.effect_list ? skill.effect_list.length : 0; i < len; i++) {

                    let vo = this.getVoById(skill.effect_list[i].target);
                    if (!vo){
                        continue;
                    }

                    if (vo.type != ObjectType.MONSTER) {
                        continue;
                    }

                    (vo as MonsterVo).isTarget = true;
                }

                //技能展示
                if (skill.reason == SkillUseStatus.SUCCESS) {
                    self.sendNt(SceneEvent.ON_OBJ_USE_SKILL, {x:msg.x,y:msg.y,skill:skill});
                }else{
                    LogUtil.printSkill("技术人员看的 技能:"+skill.skill_index + " 在后端释放失败，错误码:"+skill.reason);
                }
            }
        }

        //
        public skillBattleFigure(skillId:number){
            let cfg:BattleSkillConfig = getConfigByNameId(ConfigName.Skill, skillId);
            return cfg.battle_figure;
        }

        private onFindMonster(n: GameNT) {

            let msg: s2c_instance_find_monster = n.body;

            console.log("s2c_instance_find_monster msg.entity_id = " + msg.entity_id);

            this._model.isAutoHangUp = true;
            if (!msg.path_coords && this._model.mainAi) {
                delayCall(Handler.alloc(this._model.mainAi, this._model.mainAi.startHangUp), 1000);
                return;
            }
            if (!this._model.isMapOk) {
                return;
            }
            this.sendNt(SceneEvent.ON_FIND_MONSTER, msg);
        }

        private onClearCurTarget(n: GameNT) {
            let msg: s2c_instance_clear_find_entity = n.body;
            if (!msg.entity_id) {
                return;
            }
            if (this.foeTargetId && this.foeTargetId.eq(msg.entity_id)) {
                this.clearFoeTarget();
            }
        }

        private onStopHangUp() {
            let self = this;
            if (self._model.mainAi) {
                LogUtil.printLogin("服务器通知前端停止AI");
                self._model.mainAi.stopHandUp();
            }
        }

        private onStartHangUp() {
            let self = this;
            if (self._model.mainAi) {
                LogUtil.printLogin("服务器通知前端启动AI");
                self._model.mainAi.startHangUp();
            }
        }

        private onAutoHangUpUpdate(n: GameNT) {
            /**0是停止自动战斗，1是开启*/
            let msg: s2c_instance_client_move_type = n.body;
            this._model.isAutoHangUp = msg.is_hangup == 1;
            this.sendNt(SceneEvent.ON_AUTO_HANG_UP_UPDATE);
        }

        /** 添加客户端怪物数据 */
        public addMonsterDataClient(data: scene_monster_data): void {
            this.addEntity(ObjectType.MONSTER, data);
        }

        /** 请求播放剧情对话*/
        public play_conversation_c2s(index: number) {
            let msg: c2s_play_conversation = new c2s_play_conversation();
            msg.index = index;
            this.sendProto(msg);
        }

        /**
         * 读条成功返回
         * @param id
         * @param ret
         */
        public pop_progressbar_c2s(id: number, ret: number = 1) {
            let msg: c2s_pop_progressbar = new c2s_pop_progressbar();
            msg.bar_id = id;
            msg.ret = ret;
            this.sendProto(msg);
        }

        /** 场景DEBUG */
        private scene_print_entity_s2c(n: GameNT) {
            if (DEBUG) {
                this.sendNt(SceneEvent.ON_SCENE_DEBUG_MOVE, n.body);
            }
        }

        /** 场景DEBUG */
        public scene_print_entity_c2s(list: Long[]) {
            if (DEBUG) {
                let msg: c2s_scene_print_entity = new c2s_scene_print_entity();
                msg.entity_ids = list;
                this.sendProto(msg)
            }
        }

        /** 角色死亡*/
        private battle_role_die_s2c(n: GameNT) {
            let msg: s2c_battle_role_die = n.body;
            let sceneType = this.curSceneType;
            if (sceneType == SceneType.Yuanling) {
                facade.showView(ModName.Shilian, ShilianViewType.YuanLingDied);
            }
            else if(NotShowRoleRevive.indexOf(sceneType) > -1){
                //不显示玩家复活提示
                this._model.diedInfo = msg;
                this.sendNt(SceneEvent.ON_ROLE_DIE);
            }
            else {
                facade.showView(ModName.Scene, SceneViewType.RoleRevive, msg);
            }
            this.clearFoeTarget();//玩家死亡时清除攻击目标，重新打怪
        }

        /** 角色复活*/
        private battle_role_relife_s2c(n: GameNT) {
            this.sendNt(SceneEvent.ON_ROLE_RELIVE);
        }

        /** 复活角色*/
        public battle_role_relife_c2s() {
            let msg: c2s_battle_role_relife = new c2s_battle_role_relife();
            this.sendProto(msg);
        }

        /** 切换场景,默认不需要发场景index */
        public change_scene_c2s(scene_index?: number) {
            let msg: c2s_change_scene = new c2s_change_scene();
            msg.scene_index = scene_index;
            this.sendProto(msg);
        }

        //////////////////////////////////////NPC///////////////////////////////////////////////////////////////////////
        /***
         * 获取客户端NPCVo
         * @param npc_id
         */
        public getClientSceneNpc(npc_id: number): NPCVo {
            let npc_dict = this._model.npcDic;
            for (let key in npc_dict) {
                let tmpVo: NPCVo = npc_dict[key];
                if (tmpVo.npc_id == npc_id || tmpVo.index == npc_id) {
                    return tmpVo;
                }
            }
            return null;
        }

        /** 获取新的NPC ID */
        public getNpcEntityId(): Long {
            let self = this;
            let curIdx: Long = self._model.genClientEntityId();
            let objVo: SceneObjVo = self.getVoById(curIdx);
            while (objVo) {
                curIdx = self._model.genClientEntityId();
                objVo = self.getVoById(curIdx);
            }
            return curIdx;
        }

        private s2c_fly_bool(n: GameNT): void {
            let msg: s2c_fly_bool = n.body;
            this.sendNt(SceneEvent.ON_SKILL_TEXT_SHOW2,msg);
        }

        private scene_add_effect(n: GameNT):void{
            let msg: s2c_scene_add_effect = n.body;
            this.sendNt(SceneEvent.ON_SKILL_BUF_SHOW,msg);
        }

        //预留
        private scene_del_effect(n: GameNT):void{
            let msg: s2c_scene_del_effect = n.body;
        }

        ////////////////////////////////////触碰物///////////////////////////////////////////

        //点击退出，会弹结算界面
        public clickExit() {
            let msg:c2s_scene_exit = new c2s_scene_exit();
            this.sendProto(msg);
        }
        //退出场景
        public exitScene(): void {
            let msg:c2s_role_scene_leave = new c2s_role_scene_leave()
            this.sendProto(msg);
        }

        //当前挑战的boss
        public get curBossId(): Long {
            return this._model.curBossId;
        }
        public set curBossId(curBossId: Long) {
            this._model.curBossId = curBossId;
        }

        /**攻击目标*/
        public get foeTargetId(): Long {
            return this._model.foeTargetId;
        }
        public set foeTargetId(value: Long) {
            //todo
            if (this.curSceneType == SceneType.KuafuDoufa) {
                DEBUG && console.info(`--kuafudoufa_set_foetargetId-- foeTargetId:${this._model.foeTargetId}, setValue:${value}`);
            }
            let isChange = false;
            if(!value || !this._model.foeTargetId || (value && this._model.foeTargetId && this._model.foeTargetId.neq(value))){
                isChange = true;
                // todo 外部已监听到抛出，但是 foeTargetId 还没赋值，故而放到后面抛出
                // this.sendNt(SceneEvent.FOE_TARGET_CHANGE);//攻击目标变更
            }
            this._model.foeTargetId = value;
            if (isChange) {
                this.sendNt(SceneEvent.FOE_TARGET_CHANGE);//攻击目标变更;
            }
        }

        ////////////////////////////////////场景伤害排行榜以及归属///////////////////////////////////////////
        //当前归属
        public get belong(): teammate {
            return this._model.belong;
        }
        public set belong(belong: teammate) {
            this._model.belong = belong;
        }

        //最高伤害攻击者
        public get maxHurt(): teammate {
            return this._model.maxHurt;
        }

        private s2c_new_multiple_boss_hurt_rank(n: GameNT) {
            let msg: s2c_new_multiple_boss_hurt_rank = n.body;
            if (!msg) {
                return;
            }
            this.updateHurtRank(msg.hurtlist, msg.my_info, msg.now_owner);
        }

        private updateHurtRank(hurtlist: teammate[], my_info: teammate, now_owner: teammate): void {
            if(hurtlist || my_info){
                let info: SceneRankData = {hurtList: hurtlist, myInfo: my_info};
                this.sendNt(SceneEvent.ON_SCENE_RANK_UPDATE, info);//场景排行榜数据
            }
            if(now_owner){
                let lastBelong = SceneUtil.getBelong();
                if(lastBelong && lastBelong.role_id.eq(now_owner.role_id)){
                    return;//归属者不变时，不需要发送事件
                }
                this.sendNt(SceneEvent.ON_SCENE_BELONG_UPDATE, now_owner);//归属者数据
            }
        }

        private s2c_atk_role_max_hurt_role_info(n: GameNT) {
            let msg: s2c_atk_role_max_hurt_role_info = n.body;
            if (!msg) {
                return;
            }
            this.updateRoleInfo(msg.maxhurt_player);
        }

        private updateRoleInfo(maxhurt_player: teammate): void {
            if(maxhurt_player){
                let lastMaxHurt = SceneUtil.getMaxHurt();
                if(lastMaxHurt && lastMaxHurt.role_id.eq(maxhurt_player.role_id)){
                    return;//最高伤害者不变时，不需要发送事件
                }
                this._model.maxHurt = maxhurt_player;
                this.sendNt(SceneEvent.ON_SCENE_MAX_HURT_UPDATE);//最高伤害者数据
            }
        }

        private s2c_yijie_boss_hurt_rank(n: GameNT) {
            let msg: s2c_yijie_boss_hurt_rank = n.body;
            if (!msg) {
                return;
            }
            if(msg.entity_id){
                let sceneProxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
                if(sceneProxy.curBossId && sceneProxy.curBossId.neq(msg.entity_id)){
                    return;//过滤非当前挑战的boss
                }
            }
            this.updateHurtRank(msg.hurtlist, msg.my_info, msg.now_owner);
        }

        private s2c_yongheng_boss_hurt_rank(n: GameNT) {
            let msg: s2c_yongheng_boss_hurt_rank = n.body;
            if (!msg) {
                return;
            }
            if(msg.entity_id){
                let sceneProxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
                if(sceneProxy.curBossId && sceneProxy.curBossId.neq(msg.entity_id)){
                    return;//过滤非当前挑战的boss
                }
            }
            this.updateHurtRank(msg.hurtlist, msg.my_info, msg.now_owner);
        }

        private s2c_zhuimo_boss_hurt_rank(n:GameNT):void{
            let msg :s2c_zhuimo_boss_hurt_rank = n.body;
            if(!msg){
                return;
            }
            if(msg.entity_id){
                let sceneProxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
                if(sceneProxy.curBossId && sceneProxy.curBossId.neq(msg.entity_id)){
                    return;//过滤非当前挑战的boss
                }
            }
            this.updateHurtRank(msg.hurtlist, msg.my_info,null);
            if(msg.hurtlist&&msg.hurtlist[0]){
                this.updateRoleInfo(msg.hurtlist[0]);
            }
        }
        ////////////////////////////////////场景伤害排行榜以及归属///////////////////////////////////////////
        ////////////////////////////////////场景伤害///////////////////////////////////////////
        private s2c_boss_srefresh_damage(n: GameNT) {
            let msg: s2c_boss_srefresh_damage = n.body;
            if(!msg || !msg.damage_list) {
                return;
            }

            this.sendNt(SceneEvent.ON_SCENE_DAMAGE_UPDATE, msg);
        }
        ////////////////////////////////////场景伤害///////////////////////////////////////////
        //获取AI
        public get mainAi(): CommonAi {
            return this._model.mainAi;
        }
        ////////////////////////////////////副本通用结束时间戳///////////////////////////////////////////
        private s2c_scene_fuben_end_time(n:GameNT):void {
            let msg: s2c_scene_fuben_end_time = n.body;
            if (!msg || !msg.endtime) {
                return;
            }
            this._model.endTime = msg.endtime.toNumber();
        }
        public get endTime(): number {
            return this._model.endTime;
        }
        //死亡复活信息
        public get diedInfo(): s2c_battle_role_die {
            return this._model.diedInfo;
        }
    }
}
