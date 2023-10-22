var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var s2c_scene_prepare_enter = msg.s2c_scene_prepare_enter;
            var c2s_scene_enter = msg.c2s_scene_enter;
            var s2c_scene_enter = msg.s2c_scene_enter;
            var c2s_scene_move = msg.c2s_scene_move;
            var s2c_scene_entity_update = msg.s2c_scene_entity_update;
            var s2c_scene_entity_delete = msg.s2c_scene_entity_delete;
            var s2c_scene_entity_move = msg.s2c_scene_entity_move;
            var s2c_scene_reset_coordinate = msg.s2c_scene_reset_coordinate;
            var s2c_scene_entity_add = msg.s2c_scene_entity_add;
            var c2s_battle_use_skill = msg.c2s_battle_use_skill;
            var s2c_battle_info = msg.s2c_battle_info;
            var s2c_instance_find_monster = msg.s2c_instance_find_monster;
            var s2c_instance_stop_hangup = msg.s2c_instance_stop_hangup;
            var ObjectVo = game.scene.ObjectVo;
            var s2c_scene_entity_stop_moving = msg.s2c_scene_entity_stop_moving;
            var PetVo = game.scene.PetVo;
            var c2s_role_scene_leave = msg.c2s_role_scene_leave;
            var c2s_instance_find_monster = msg.c2s_instance_find_monster;
            var c2s_instance_client_move_type = msg.c2s_instance_client_move_type;
            var s2c_instance_client_move_type = msg.s2c_instance_client_move_type;
            var s2c_instance_clear_find_entity = msg.s2c_instance_clear_find_entity;
            var SceneTools = game.scene.SceneTools;
            var c2s_scene_prepare_enter = msg.c2s_scene_prepare_enter;
            var MonsterVo = game.scene.MonsterVo;
            var Scene = game.scene.Scene;
            var MainGPlayerVo = game.scene.MainGPlayerVo;
            var facade = base.facade;
            var c2s_pop_progressbar = msg.c2s_pop_progressbar;
            var c2s_scene_print_entity = msg.c2s_scene_print_entity;
            var s2c_scene_print_entity = msg.s2c_scene_print_entity;
            var c2s_battle_role_relife = msg.c2s_battle_role_relife;
            var s2c_battle_role_die = msg.s2c_battle_role_die;
            var s2c_battle_role_relife = msg.s2c_battle_role_relife;
            var c2s_change_scene = msg.c2s_change_scene;
            var s2c_instance_start_hangup = msg.s2c_instance_start_hangup;
            var c2s_scene_ride_oper = msg.c2s_scene_ride_oper;
            var c2s_play_conversation = msg.c2s_play_conversation;
            var MainGPlayer = game.scene.MainGPlayer;
            var delayCall = base.delayCall;
            var Handler = base.Handler;
            var c2s_scene_exit = msg.c2s_scene_exit;
            var s2c_fly_bool = msg.s2c_fly_bool;
            var s2c_scene_add_effect = msg.s2c_scene_add_effect;
            var s2c_scene_del_effect = msg.s2c_scene_del_effect;
            var s2c_new_multiple_boss_hurt_rank = msg.s2c_new_multiple_boss_hurt_rank;
            var s2c_atk_role_max_hurt_role_info = msg.s2c_atk_role_max_hurt_role_info;
            var s2c_yijie_boss_hurt_rank = msg.s2c_yijie_boss_hurt_rank;
            var s2c_yongheng_boss_hurt_rank = msg.s2c_yongheng_boss_hurt_rank;
            var s2c_boss_srefresh_damage = msg.s2c_boss_srefresh_damage;
            var TimeMgr = base.TimeMgr;
            var s2c_zhuimo_boss_hurt_rank = msg.s2c_zhuimo_boss_hurt_rank;
            var s2c_scene_fuben_end_time = msg.s2c_scene_fuben_end_time;
            /** 场景通用Proxy*/
            var SceneProxy = /** @class */ (function (_super) {
                __extends(SceneProxy, _super);
                function SceneProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._ntData = {};
                    _this._scene_drop_datas = [];
                    return _this;
                }
                SceneProxy.prototype.getModel = function () {
                    return this._model;
                };
                SceneProxy.prototype.initialize = function () {
                    var self = this;
                    self._model = new scene.SceneModel();
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
                    self.onProto(s2c_scene_add_effect, self.scene_add_effect, self);
                    self.onProto(s2c_scene_del_effect, self.scene_del_effect, self);
                    this.onProto(s2c_new_multiple_boss_hurt_rank, this.s2c_new_multiple_boss_hurt_rank, this);
                    this.onProto(s2c_atk_role_max_hurt_role_info, this.s2c_atk_role_max_hurt_role_info, this);
                    this.onProto(s2c_yijie_boss_hurt_rank, this.s2c_yijie_boss_hurt_rank, this);
                    this.onProto(s2c_yongheng_boss_hurt_rank, this.s2c_yongheng_boss_hurt_rank, this);
                    this.onProto(s2c_boss_srefresh_damage, this.s2c_boss_srefresh_damage, this);
                    this.onProto(s2c_zhuimo_boss_hurt_rank, this.s2c_zhuimo_boss_hurt_rank, this);
                    this.onProto(s2c_scene_fuben_end_time, this.s2c_scene_fuben_end_time, this);
                    TimeMgr.addUpdateItem(this);
                };
                Object.defineProperty(SceneProxy.prototype, "curSceneIdx", {
                    get: function () {
                        return this._model.curSceneIdx;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "isEnterScene", {
                    get: function () {
                        return this._model.isEnterScene;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "isMapOk", {
                    get: function () {
                        return this._model.isMapOk;
                    },
                    set: function (v) {
                        this._model.isMapOk = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "lastSceneIdx", {
                    get: function () {
                        return this._model.lastSceneIdx;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "mainPlayerObj", {
                    get: function () {
                        return this._model.mainPlayer;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "scene", {
                    get: function () {
                        return this._model.scene;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "mainPlayerVo", {
                    get: function () {
                        return this._model.mainPlayerVo;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "enemyInfo", {
                    get: function () {
                        return this._model.enemyInfo;
                    },
                    set: function (value) {
                        this._model.enemyInfo = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "mainPlayerBuffList", {
                    get: function () {
                        return this.mainPlayerVo && this.mainPlayerVo.buffs;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "firstEnter", {
                    get: function () {
                        //return this.curSceneIdx == 0 || (this.isMapOk == false && this.lastSceneIdx == 0);
                        return this._model.isFirstEnter;
                    },
                    enumerable: true,
                    configurable: true
                });
                SceneProxy.prototype.setFirstEnter = function (ret) {
                    this._model.isFirstEnter = ret;
                };
                Object.defineProperty(SceneProxy.prototype, "curSceneType", {
                    get: function () {
                        return this.getSceneType(this.curSceneIdx);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "isAutoHangUp", {
                    get: function () {
                        return this._model.isAutoHangUp;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "isServerControl", {
                    get: function () {
                        return this._model.isServerControl;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "isSceneEft", {
                    get: function () {
                        return this._model.isSceneEft;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "voList", {
                    get: function () {
                        return this._model.voList;
                    },
                    enumerable: true,
                    configurable: true
                });
                SceneProxy.prototype.getSceneType = function (id) {
                    if (!id) {
                        return 0;
                    }
                    var cfg = game.getConfigByNameId("scene.json" /* Scene */, id);
                    if (!cfg) {
                        return 0;
                    }
                    return cfg.map_type;
                };
                SceneProxy.prototype.isTargetAtkEnable = function (id) {
                    if (!id) {
                        return false;
                    }
                    var target = this._model.voList[id.toString()];
                    if (!target) {
                        return false;
                    }
                    var main = this.mainPlayerVo;
                    if (!main || !SceneTools.isSelfReady(main)) {
                        return false;
                    }
                    if (!SceneTools.isTargetReady(target)) {
                        return false;
                    }
                    var dis = this.getMaxAtkDistance();
                    if (target instanceof MonsterVo && target.index) {
                        var cfg = game.getConfigByNameId("monster1.json" /* Monster */, target.index);
                        if (cfg && cfg.hit_scope) {
                            dis += cfg.hit_scope;
                        }
                    }
                    var path = Scene.findAtkPath(main.x, main.y, target.x, target.y, dis);
                    return !(!path || path.length > 2);
                };
                /** 获取仇恨目标 */
                SceneProxy.prototype.getFoeTarget = function (camp) {
                    var main = this.mainPlayerVo;
                    if (!SceneTools.isSelfReady(main)) {
                        return null;
                    }
                    var sType = this.curSceneType;
                    var totalPlayers = this.getVosByType(1 /* PLAYER */);
                    if (!totalPlayers || totalPlayers.length == 0) {
                        return null;
                    }
                    var dis = this.getMaxAtkDistance();
                    var enemies = [];
                    for (var _i = 0, totalPlayers_1 = totalPlayers; _i < totalPlayers_1.length; _i++) {
                        var p = totalPlayers_1[_i];
                        if (camp && p.camp != camp) {
                            continue;
                        }
                        if (this.foeTargetId && p.entity_id.eq(this.foeTargetId)) {
                            continue;
                        }
                        if (!SceneTools.isTargetReady(p)) {
                            continue;
                        }
                        var path = Scene.findAtkPath(main.x, main.y, p.x, p.y, dis);
                        if (!path) {
                            continue;
                        }
                        if (path.length < 2) {
                            enemies.push(p);
                        }
                    }
                    var len = enemies.length;
                    return enemies[Math.floor(Math.ceil(Math.random() * (len - 1)))] || enemies[0];
                };
                SceneProxy.prototype.addVo = function (vo, type) {
                    var list = this._model.typeVoMap[type];
                    list.push(vo);
                    var id = vo.entity_id;
                    this._model.voList[id.toString()] = vo;
                };
                SceneProxy.prototype.delVo = function (id) {
                    var key = id.toString();
                    var del = this._model.voList[key];
                    if (!del) {
                        return null;
                    }
                    var list = this._model.typeVoMap[del.type];
                    if (list != undefined) {
                        for (var i = 0, l = list.length; i < l; ++i) {
                            if (list[i] && list[i].entity_id && list[i].entity_id.eq(id)) {
                                game.ArrayUtil.removeAt(list, i);
                                break;
                            }
                        }
                    }
                    delete this._model.voList[key];
                    return del;
                };
                SceneProxy.prototype.getVosByCamp = function (camp) {
                    var vos = [];
                    for (var k in this._model.voList) {
                        var vo = this._model.voList[k];
                        if (vo.type == 6 /* TEAM_PLAYER */ || vo.type == 5 /* DROP_ITEM */) {
                            continue;
                        }
                        if (vo.camp == camp) {
                            vos.push(vo);
                        }
                    }
                    return vos;
                };
                /**
                 * 获取可攻击的敌人
                 * @param {number} type 指定返回敌人的类型
                 * @returns {game.scene.ActorVo[]}
                 */
                SceneProxy.prototype.getEnemyVos = function (type) {
                    var vos = [];
                    var mVo = this.mainPlayerVo;
                    for (var k in this._model.voList) {
                        var vo = this._model.voList[k];
                        if (mVo.entity_id.eq(vo.entity_id)) {
                            //过滤玩家自己
                            continue;
                        }
                        if (type && vo.type != type) {
                            //过滤非指定敌人类型
                            continue;
                        }
                        if (vo.type == 6 /* TEAM_PLAYER */ || vo.type == 5 /* DROP_ITEM */ || vo.type == 4 /* PET */) {
                            //过滤部分类型实体，todo,待整理
                            continue;
                        }
                        //存在阵营时优先判断同阵营，再判断战队帮派
                        if (mVo.camp) {
                            //玩家存在camp时，则过滤相同camp类型的敌人
                            if (vo.camp == mVo.camp) {
                                continue;
                            }
                        }
                        else if (type == 1 /* PLAYER */) {
                            //敌人为其他玩家时，过滤相同宗门和战队的玩家
                            var gPlayerVo = vo;
                            if (mVo.guild_id && gPlayerVo.guild_id == mVo.guild_id) {
                                continue;
                            }
                            if (mVo.team_id && !mVo.team_id.isZero() && gPlayerVo.team_id && gPlayerVo.team_id.eq(mVo.team_id)) {
                                continue;
                            }
                        }
                        vos.push(vo);
                    }
                    return vos;
                };
                SceneProxy.prototype.getBossVo = function () {
                    var vos = this.getEnemyVos(3 /* MONSTER */);
                    if (!vos || vos.length == 0) {
                        return null;
                    }
                    var bossList = [];
                    for (var _i = 0, vos_1 = vos; _i < vos_1.length; _i++) {
                        var v = vos_1[_i];
                        if (v.monsterType == 2 /* Boss */) {
                            bossList.push(v);
                        }
                    }
                    if (!bossList.length) {
                        return null;
                    }
                    if (bossList.length == 1) {
                        return bossList[0];
                    }
                    var minIdx = 0;
                    var minDis = game.PointUtil.distanceSquare(this.mainPlayerVo.x, this.mainPlayerVo.y, bossList[0].x, bossList[0].y);
                    for (var i = 1, l = bossList.length; i < l; ++i) {
                        var vo = bossList[i];
                        var dis = game.PointUtil.distanceSquare(this.mainPlayerVo.x, this.mainPlayerVo.y, vo.x, vo.y);
                        if (dis < minDis) {
                            minDis = dis;
                            minIdx = i;
                        }
                    }
                    return bossList[minIdx];
                };
                SceneProxy.prototype.getVosByType = function (type) {
                    return this._model.typeVoMap[type];
                };
                SceneProxy.prototype.getVoById = function (id) {
                    if (!id) {
                        return null;
                    }
                    return this._model.voList[id.toString()];
                };
                SceneProxy.prototype.getVosTypeById = function (_id) {
                    var _infos = this._model.typeVoMap;
                    for (var k in _infos) {
                        var data = _infos[k];
                        if (!data) {
                            continue;
                        }
                        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                            var v = data_1[_i];
                            if (v && v.entity_id.eq(_id)) {
                                return Number(k);
                            }
                        }
                    }
                    return -1;
                };
                SceneProxy.prototype.getVosByTeamId = function (teamId) {
                    var vos = [];
                    for (var i in this._model.voList) {
                        var vo = this._model.voList[i];
                        // if (vo instanceof GPlayerVo && vo.role_id.neq(this.mainPlayerVo.role_id) && (!teamId || !vo.guild_team_id || vo.guild_team_id.neq(teamId))) {
                        //     vos.push(vo);
                        // }
                    }
                    return vos;
                };
                SceneProxy.prototype.getRoleVoById = function (id) {
                    if (!id) {
                        return null;
                    }
                    var vos = this.getVosByType(1 /* PLAYER */);
                    if (!vos || vos.length == 0) {
                        return null;
                    }
                    for (var _i = 0, vos_2 = vos; _i < vos_2.length; _i++) {
                        var v = vos_2[_i];
                        if (v.entity_id.eq(id)) {
                            return v;
                        }
                    }
                    return null;
                };
                SceneProxy.prototype.getVoByRoleId = function (roleId, camp) {
                    if (!roleId) {
                        return null;
                    }
                    var vos = this.getVosByType(1 /* PLAYER */);
                    if (!vos || vos.length == 0) {
                        console.warn("class SceneProxy At getVoByRoleId error 1", vos);
                        return null;
                    }
                    for (var _i = 0, vos_3 = vos; _i < vos_3.length; _i++) {
                        var v = vos_3[_i];
                        if (camp != undefined && v.camp != camp) {
                            continue;
                        }
                        if (v.role_id.eq(roleId)) {
                            return v;
                        }
                    }
                    console.warn("class SceneProxy At getVoByRoleId error 2", vos);
                    return null;
                };
                SceneProxy.prototype.resetModel = function () {
                    this._model.isAutoHangUp = true;
                    for (var k in this._model.voList) {
                        this._model.voList[k] = null;
                        delete this._model.voList[k];
                    }
                    for (var k in this._model.typeVoMap) {
                        if (this._model.typeVoMap[k]) {
                            this._model.typeVoMap[k].length = 0;
                        }
                    }
                };
                /** 骑乘    0不坐 1坐 */
                SceneProxy.prototype.scene_ride_oper_c2s = function (ride_state, ride_x, ride_y) {
                    var msg = new c2s_scene_ride_oper();
                    msg.ride_state = ride_state;
                    if (ride_x != null) {
                        msg.ride_x = ride_x;
                        msg.ride_y = ride_y;
                    }
                    this.sendProto(msg);
                };
                SceneProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    //this._model.curSceneIdx = 0;
                    this._model.isFirstEnter = true;
                    this._model.isMapOk = false;
                    this.resetModel();
                };
                SceneProxy.prototype.enterScene = function (mapId) {
                    game.LogUtil.printLogin("请求进入场景(第一次握手)c2s_scene_prepare_enter mapId = " + mapId);
                    var c2s = new c2s_scene_prepare_enter();
                    c2s.scene_index = mapId;
                    this.sendProto(c2s);
                };
                SceneProxy.prototype.confirmEnterMap = function () {
                    var c = new c2s_scene_enter();
                    c.scene_id = this._model.sceneId;
                    c.scene_index = this._model.curSceneIdx;
                    this.sendProto(c);
                };
                SceneProxy.prototype.doMove = function (list, moveType) {
                    if (moveType === void 0) { moveType = 0 /* Normal */; }
                    if (this.isServerControl) {
                        return;
                    }
                    var c2s = new c2s_scene_move();
                    c2s.move_type = moveType;
                    c2s.coordinate_list = list;
                    this.sendProto(c2s);
                };
                SceneProxy.prototype.useSkill = function (skillIdx, focus, type, x, y, tx, ty) {
                    var c2s = new c2s_battle_use_skill();
                    c2s.skill_index = skillIdx;
                    c2s.focus = focus;
                    c2s.client_type = type;
                    c2s.x = x;
                    c2s.y = y;
                    c2s.focus_x = tx;
                    c2s.focus_y = ty;
                    this.sendProto(c2s);
                };
                SceneProxy.prototype.requestMonster = function (entity_id) {
                    var req = new c2s_instance_find_monster();
                    if (entity_id)
                        req.entity_id = entity_id;
                    this.sendProto(req);
                };
                //请求 服务器AI 1、停止 2、启动
                SceneProxy.prototype.requestControlAI = function (type) {
                    var req = new msg.c2s_control_ai();
                    req.type = type || 2 /* Start */;
                    req.scene_id = this._model.sceneId;
                    game.LogUtil.printLogin("客户端发给后端的 req.scene_id = " + req.scene_id);
                    this.sendProto(req);
                };
                SceneProxy.prototype.setAutoHangUp = function () {
                    this.sendProto(new c2s_instance_client_move_type());
                };
                SceneProxy.prototype.clearFoeTarget = function () {
                    this.foeTargetId = null;
                };
                SceneProxy.prototype.getMaxAtkDistance = function () {
                    if (!this.mainPlayerVo) {
                        return 0;
                    }
                    var skills = this.mainPlayerVo.skills;
                    if (!skills) {
                        return 0;
                    }
                    var dis = 0;
                    for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
                        var s = skills_1[_i];
                        var max_dis = game.SkillData.getCfg(s.skill_idx).max_distance;
                        if (max_dis > dis) {
                            dis = max_dis;
                        }
                    }
                    return dis;
                };
                SceneProxy.prototype.onSceneReady = function (n) {
                    game.LogUtil.printLogin("场景协议 s2c_scene_prepare_enter 第一次握手返回");
                    var s2c = n.body;
                    var loginProxy = facade.retMod("02" /* Login */).retProxy(1 /* Login */);
                    if (!loginProxy.role_id) {
                        game.LogUtil.printLogin("角色id 为空的");
                    }
                    if (!s2c.scene_index) {
                        game.LogUtil.printLogin("场景 scene_index 为空的");
                    }
                    this._model.isEnterScene = false;
                    this._model.isMapOk = false;
                    //this._model.lastSceneIdx = this._model.curSceneIdx;
                    if (this._model.isFirstEnter) {
                        this._model.lastSceneIdx = 0;
                    }
                    else {
                        this._model.lastSceneIdx = this._model.curSceneIdx;
                    }
                    this._model.curSceneIdx = s2c.scene_index;
                    this._model.sceneId = s2c.scene_id;
                    game.LogUtil.printLogin("服务器发过来的 s2c.scene_id = " + s2c.scene_id);
                    this._model.isServerControl = s2c.server_ctrl;
                    this._model.isSceneEft = s2c.sceneEft;
                    this._model.isAutoHangUp = true;
                    this._model.maxHurt = null; //进入场景时候清除下最高伤害攻击者，防止上一场数据影响
                    this.clearFoeTarget(); //进入场景时清除攻击目标
                    this.sendNt("on_scene_ready" /* ON_SCENE_READY */, s2c.scene_index);
                    //delayCall(Handler.alloc(this,(info:s2c_scene_prepare_enter)=>{
                    //LogUtil.printLogin("创建主角实体");
                    this._model.role_info = s2c.role_info;
                    this.addEntity(1 /* PLAYER */, this._model.role_info);
                    //this.addEntity(ObjectType.PLAYER, s2c.role_info);
                    //},[s2c]),500);
                };
                //添加主角实体
                SceneProxy.prototype.addMainEntity = function () {
                    this.addEntity(1 /* PLAYER */, this._model.role_info);
                };
                SceneProxy.prototype.onSceneEnter = function () {
                    game.LogUtil.printLogin("服务器返回 s2c_scene_enter ");
                    this._model.isEnterScene = true;
                    //this.sendNt(SceneEvent.ON_SCENE_ENTER);
                };
                SceneProxy.prototype.onEntityUpdate = function (n) {
                    var s2c = n.body;
                    if (s2c.role_infos) {
                        for (var _i = 0, _a = s2c.role_infos; _i < _a.length; _i++) {
                            var player = _a[_i];
                            this.updateVo(1 /* PLAYER */, player);
                        }
                    }
                    if (s2c.monster_infos) {
                        for (var _b = 0, _c = s2c.monster_infos; _b < _c.length; _b++) {
                            var monster = _c[_b];
                            this.updateVo(3 /* MONSTER */, monster);
                        }
                    }
                    if (s2c.npc_infos) {
                        for (var _d = 0, _e = s2c.npc_infos; _d < _e.length; _d++) {
                            var npc = _e[_d];
                            this.updateVo(2 /* NPC */, npc);
                        }
                    }
                    if (s2c.buddy_infos) {
                        for (var _f = 0, _g = s2c.buddy_infos; _f < _g.length; _f++) {
                            var pet = _g[_f];
                            this.updateVo(4 /* PET */, pet);
                        }
                    }
                    if (s2c.collect_infos) {
                        for (var _h = 0, _j = s2c.collect_infos; _h < _j.length; _h++) {
                            var collect = _j[_h];
                            this.updateVo(7 /* COLLECT */, collect);
                        }
                    }
                };
                SceneProxy.prototype.updateVo = function (type, data) {
                    var entityId;
                    if (type == 5 /* DROP_ITEM */) {
                        entityId = data.entity_id;
                    }
                    else {
                        entityId = data.walk_entity_info.entity_info.entity_id;
                    }
                    if (!entityId) {
                        console.error("updateVo entityId 错误", data);
                        return;
                    }
                    var old = this.getVoById(entityId);
                    if (!old) {
                        return;
                    }
                    if (type == 1 /* PLAYER */) { //角色复活添加
                        var updateData = data.walk_entity_info;
                        var d = old;
                        if (d.percent <= 0 && d.role_id && d.role_id.neq(game.RoleVo.ins.role_id) && updateData && updateData.percent > 0) {
                            old.applyUpdate(data);
                            this.sendNt("on_display_add" /* ON_OBJ_ADD */, old);
                            return;
                        }
                    }
                    var updateKeys = old.applyUpdate(data);
                    if (0 == updateKeys.length) {
                        return;
                    }
                    if (type == 1 /* PLAYER */) { //角色死亡删除
                        var d = old;
                        if (d.role_id && d.role_id.neq(game.RoleVo.ins.role_id) && d.percent <= 0) {
                            this.sendNt("on_display_del" /* ON_OBJ_DEL */, old);
                            return;
                        }
                    }
                    var tmp = this._ntData;
                    tmp.id = old.entity_id;
                    tmp.keys = updateKeys;
                    this.sendNt("on_display_update" /* ON_OBJ_UPDATE */, tmp);
                    delete tmp.id;
                    delete tmp.keys;
                    if (updateKeys.indexOf("coordinate_list") > -1) {
                        this.doObjMove(old.entity_id, data.coordinate_list, data.moveType);
                    }
                };
                //重置场景掉落数据
                SceneProxy.prototype.clearSceneDropDatas = function () {
                    this._scene_drop_datas = [];
                };
                SceneProxy.prototype.update = function (time) {
                    var index = 0;
                    while (index < 10) {
                        if (this._scene_drop_datas.length > 0) {
                            var data = this._scene_drop_datas.shift();
                            this.addEntity(5 /* DROP_ITEM */, data);
                        }
                        else {
                            break;
                        }
                        index++;
                    }
                };
                SceneProxy.prototype.onEntityAdd = function (n) {
                    var s2c = n.body;
                    //玩家
                    if (s2c.role_infos) {
                        for (var _i = 0, _a = s2c.role_infos; _i < _a.length; _i++) {
                            var player = _a[_i];
                            this.addEntity(1 /* PLAYER */, player);
                        }
                    }
                    //怪物
                    if (s2c.monster_infos) {
                        for (var _b = 0, _c = s2c.monster_infos; _b < _c.length; _b++) {
                            var monster = _c[_b];
                            // console.log("=========" + monster.walk_entity_info.entity_info.entity_id)
                            this.addEntity(3 /* MONSTER */, monster);
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
                        for (var _d = 0, _e = s2c.buddy_infos; _d < _e.length; _d++) {
                            var pet = _e[_d];
                            // @ts-ignore 把 Long 类型强制转换成 number
                            pet.index = pet.index.toNumber();
                            this.addEntity(4 /* PET */, pet);
                        }
                    }
                    //掉落物
                    if (s2c.drop_infos && gso.gameIsActivate) {
                        var length = s2c.drop_infos.length;
                        if (length >= 200) {
                            console.error("掉落物品数量:" + length + " 大于200了");
                        }
                        for (var _f = 0, _g = s2c.drop_infos; _f < _g.length; _f++) {
                            var drop = _g[_f];
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
                };
                /* data
                scene_role_data
                scene_monster_data
                scene_npc_data
                scene_buddy_data
                scene_drop_data
                scene_collect_data
                scene_trigger_data
                */
                SceneProxy.prototype.addEntity = function (type, data) {
                    // if(!this.checkBorn(data)){
                    //     return;
                    // }
                    var self = this;
                    var id;
                    if (type == 5 /* DROP_ITEM */) {
                        id = data.entity_id;
                    }
                    else if (type == 6 /* TEAM_PLAYER */) {
                        id = data.role_id;
                    }
                    else {
                        id = data.walk_entity_info.entity_info.entity_id;
                    }
                    if (!id) {
                        console.error("addEntity id 错误", type, data);
                        return;
                    }
                    if (type == 1 /* PLAYER */ && !data.role_id) {
                        console.error("场景添加角色,没有发role_id", data);
                        return;
                    }
                    var old = self.getVoById(id);
                    if (old) {
                        return;
                    }
                    var isMain = type == 1 /* PLAYER */ && game.RoleVo.ins.role_id.eq(data.role_id);
                    var vo;
                    if (isMain) {
                        vo = new MainGPlayerVo(1 /* PLAYER */);
                    }
                    else if (type == 4 /* PET */) {
                        var buddyData = data;
                        vo = new PetVo(type);
                        vo.isMainPet = self._model.mainPlayerVo && self._model.mainPlayerVo.entity_id.eq(buddyData.master_id);
                        // if (!(<PetVo>vo).isMainPet && (SceneTools.isOptimizeScene(this.curSceneType) || gso.maskPet)) {//至尊boss 世界boss场景不添加其他人的侍从
                        //     return;
                        // }
                    }
                    else {
                        var cls = ObjectVo[type];
                        if (!cls) {
                            return;
                        }
                        vo = new cls(type);
                    }
                    vo.applyUpdate(data);
                    if (isMain) {
                        self._model.mainPlayerVo = vo;
                    }
                    if (type == 6 /* TEAM_PLAYER */) {
                        vo.x = self._model.mainPlayerVo.x;
                        vo.y = self._model.mainPlayerVo.y;
                    }
                    self.addVo(vo, type);
                    if (!isMain && type == 1 /* PLAYER */ && vo.percent <= 0) {
                        return;
                    }
                    self.sendNt("on_display_add" /* ON_OBJ_ADD */, vo);
                };
                //实体移除
                SceneProxy.prototype.onEntityDel = function (n) {
                    var s2c = n.body;
                    if (!s2c.entity_ids) {
                        console.error("onEntityDel！", s2c);
                        return;
                    }
                    for (var _i = 0, _a = s2c.entity_ids; _i < _a.length; _i++) {
                        var id = _a[_i];
                        // console.log("++++++"+id);
                        var del = this.delVo(id);
                        if (del) {
                            this.sendNt("on_display_del" /* ON_OBJ_DEL */, del);
                        }
                    }
                };
                //停止移动
                SceneProxy.prototype.onStopMove = function (n) {
                    var msg = n.body;
                    this.resetPoint(msg.entity_id, msg.x, msg.y);
                };
                //实体移动
                SceneProxy.prototype.onEntityMove = function (n) {
                    var s2c = n.body;
                    if (!s2c.entity_coordinates) {
                        console.error("协议错误！s2c_scene_entity_move");
                        return;
                    }
                    for (var _i = 0, _a = s2c.entity_coordinates; _i < _a.length; _i++) {
                        var data = _a[_i];
                        if (!data.coordinate_list) {
                            console.error("移动协议没有发移动路径！", data);
                            continue;
                        }
                        if (MainGPlayer.ins && MainGPlayer.ins.vo.entity_id.eq(data.entity_id)) {
                            console.log("收到服务器叫主角移动协议");
                        }
                        if (data.move_type == 7 /* Push_Back */) {
                            game.LogUtil.printBeatBack("打了一次击退");
                        }
                        if (data.coordinate_list.length <= 1 && data.move_type != 6 /* Jump */ && data.move_type != 7 /* Push_Back */) {
                            this.resetPoint(data.entity_id, data.coordinate_list[0].x, data.coordinate_list[0].y);
                        }
                        else {
                            if (data.move_type == 7 /* Push_Back */) {
                                game.LogUtil.printBeatBack("击退:" + data.entity_id + "," + data.coordinate_list[0].x + "," + data.coordinate_list[0].y);
                            }
                            else {
                                var len = data.coordinate_list.length;
                                game.LogUtil.printBeatBack("走回来:" + data.entity_id + "," + data.coordinate_list[len - 1].x + "," + data.coordinate_list[len - 1].y);
                            }
                            this.doObjMove(data.entity_id, data.coordinate_list, data.move_type, data.time);
                        }
                    }
                };
                SceneProxy.prototype.doObjMove = function (id, path, moveType, moveTime) {
                    if (moveType === void 0) { moveType = 0 /* Normal */; }
                    this.sendNt("on_obj_move" /* ON_OBJ_MOVE */, { id: id, moveType: moveType, path: path, moveTime: moveTime });
                };
                SceneProxy.prototype.resetPoint = function (id, x, y) {
                    var tmp = this._ntData;
                    tmp.id = id;
                    tmp.x = x;
                    tmp.y = y;
                    this.sendNt("on_reset_player_pt" /* ON_RESET_PLAYER_PT */, tmp);
                    delete tmp.id;
                    delete tmp.x;
                    delete tmp.y;
                };
                SceneProxy.prototype.onResetMainPoint = function (n) {
                    var msg = n.body;
                    this.resetPoint(msg.entity_id, msg.x, msg.y);
                };
                //技能返回
                SceneProxy.prototype.onUseSkill = function (n) {
                    var msg = n.body;
                    if (!msg.skill_list || gso.dbg_stop_ai) {
                        return;
                    }
                    var self = this;
                    //
                    for (var _i = 0, _a = msg.skill_list; _i < _a.length; _i++) {
                        var skill = _a[_i];
                        if (skill.cure_info) {
                            self.sendNt("on_skill_buff" /* ON_SKILL_BUFF */, skill);
                            continue;
                        }
                        if (!skill.skill_index) {
                            continue;
                        }
                        //第二轮 瓢字逻辑
                        if (msg.round && msg.round > 1) {
                            this.sendNt("on_skill_text_show" /* ON_SKILL_TEXT_SHOW */, {
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
                            if (!game.SkillData.isCommonAtk(skill.skill_index)) {
                                console.log("skill.reason = " + skill.reason);
                                console.log("服务器返回 主角释放 skill.skill_index = " + skill.skill_index);
                            }
                            //console.log("服务器返回 主角释放 skill.skill_index = "+skill.skill_index);
                            //console.log("主角释放技能状态 skill.reason = "+ skill.reason);
                        }
                        //血条显示逻辑
                        for (var i = 0, len = skill.effect_list ? skill.effect_list.length : 0; i < len; i++) {
                            var vo = this.getVoById(skill.effect_list[i].target);
                            if (!vo) {
                                continue;
                            }
                            if (vo.type != 3 /* MONSTER */) {
                                continue;
                            }
                            vo.isTarget = true;
                        }
                        //技能展示
                        if (skill.reason == 0 /* SUCCESS */) {
                            self.sendNt("on_obj_use_skill" /* ON_OBJ_USE_SKILL */, { x: msg.x, y: msg.y, skill: skill });
                        }
                        else {
                            game.LogUtil.printSkill("技术人员看的 技能:" + skill.skill_index + " 在后端释放失败，错误码:" + skill.reason);
                        }
                    }
                };
                //
                SceneProxy.prototype.skillBattleFigure = function (skillId) {
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                    return cfg.battle_figure;
                };
                SceneProxy.prototype.onFindMonster = function (n) {
                    var msg = n.body;
                    console.log("s2c_instance_find_monster msg.entity_id = " + msg.entity_id);
                    this._model.isAutoHangUp = true;
                    if (!msg.path_coords && this._model.mainAi) {
                        delayCall(Handler.alloc(this._model.mainAi, this._model.mainAi.startHangUp), 1000);
                        return;
                    }
                    if (!this._model.isMapOk) {
                        return;
                    }
                    this.sendNt("on_find_monster" /* ON_FIND_MONSTER */, msg);
                };
                SceneProxy.prototype.onClearCurTarget = function (n) {
                    var msg = n.body;
                    if (!msg.entity_id) {
                        return;
                    }
                    if (this.foeTargetId && this.foeTargetId.eq(msg.entity_id)) {
                        this.clearFoeTarget();
                    }
                };
                SceneProxy.prototype.onStopHangUp = function () {
                    var self = this;
                    if (self._model.mainAi) {
                        game.LogUtil.printLogin("服务器通知前端停止AI");
                        self._model.mainAi.stopHandUp();
                    }
                };
                SceneProxy.prototype.onStartHangUp = function () {
                    var self = this;
                    if (self._model.mainAi) {
                        game.LogUtil.printLogin("服务器通知前端启动AI");
                        self._model.mainAi.startHangUp();
                    }
                };
                SceneProxy.prototype.onAutoHangUpUpdate = function (n) {
                    /**0是停止自动战斗，1是开启*/
                    var msg = n.body;
                    this._model.isAutoHangUp = msg.is_hangup == 1;
                    this.sendNt("on_auto_hang_up_update" /* ON_AUTO_HANG_UP_UPDATE */);
                };
                /** 添加客户端怪物数据 */
                SceneProxy.prototype.addMonsterDataClient = function (data) {
                    this.addEntity(3 /* MONSTER */, data);
                };
                /** 请求播放剧情对话*/
                SceneProxy.prototype.play_conversation_c2s = function (index) {
                    var msg = new c2s_play_conversation();
                    msg.index = index;
                    this.sendProto(msg);
                };
                /**
                 * 读条成功返回
                 * @param id
                 * @param ret
                 */
                SceneProxy.prototype.pop_progressbar_c2s = function (id, ret) {
                    if (ret === void 0) { ret = 1; }
                    var msg = new c2s_pop_progressbar();
                    msg.bar_id = id;
                    msg.ret = ret;
                    this.sendProto(msg);
                };
                /** 场景DEBUG */
                SceneProxy.prototype.scene_print_entity_s2c = function (n) {
                    if (DEBUG) {
                        this.sendNt("ON_SCENE_DEBUG_MOVE" /* ON_SCENE_DEBUG_MOVE */, n.body);
                    }
                };
                /** 场景DEBUG */
                SceneProxy.prototype.scene_print_entity_c2s = function (list) {
                    if (DEBUG) {
                        var msg_1 = new c2s_scene_print_entity();
                        msg_1.entity_ids = list;
                        this.sendProto(msg_1);
                    }
                };
                /** 角色死亡*/
                SceneProxy.prototype.battle_role_die_s2c = function (n) {
                    var msg = n.body;
                    var sceneType = this.curSceneType;
                    if (sceneType == 111 /* Yuanling */) {
                        facade.showView("49" /* Shilian */, "15" /* YuanLingDied */);
                    }
                    else if (game.NotShowRoleRevive.indexOf(sceneType) > -1) {
                        //不显示玩家复活提示
                        this._model.diedInfo = msg;
                        this.sendNt("on_role_die" /* ON_ROLE_DIE */);
                    }
                    else {
                        facade.showView("03" /* Scene */, "05" /* RoleRevive */, msg);
                    }
                    this.clearFoeTarget(); //玩家死亡时清除攻击目标，重新打怪
                };
                /** 角色复活*/
                SceneProxy.prototype.battle_role_relife_s2c = function (n) {
                    this.sendNt("on_role_relive" /* ON_ROLE_RELIVE */);
                };
                /** 复活角色*/
                SceneProxy.prototype.battle_role_relife_c2s = function () {
                    var msg = new c2s_battle_role_relife();
                    this.sendProto(msg);
                };
                /** 切换场景,默认不需要发场景index */
                SceneProxy.prototype.change_scene_c2s = function (scene_index) {
                    var msg = new c2s_change_scene();
                    msg.scene_index = scene_index;
                    this.sendProto(msg);
                };
                //////////////////////////////////////NPC///////////////////////////////////////////////////////////////////////
                /***
                 * 获取客户端NPCVo
                 * @param npc_id
                 */
                SceneProxy.prototype.getClientSceneNpc = function (npc_id) {
                    var npc_dict = this._model.npcDic;
                    for (var key in npc_dict) {
                        var tmpVo = npc_dict[key];
                        if (tmpVo.npc_id == npc_id || tmpVo.index == npc_id) {
                            return tmpVo;
                        }
                    }
                    return null;
                };
                /** 获取新的NPC ID */
                SceneProxy.prototype.getNpcEntityId = function () {
                    var self = this;
                    var curIdx = self._model.genClientEntityId();
                    var objVo = self.getVoById(curIdx);
                    while (objVo) {
                        curIdx = self._model.genClientEntityId();
                        objVo = self.getVoById(curIdx);
                    }
                    return curIdx;
                };
                SceneProxy.prototype.s2c_fly_bool = function (n) {
                    var msg = n.body;
                    this.sendNt("on_skill_text_show2" /* ON_SKILL_TEXT_SHOW2 */, msg);
                };
                SceneProxy.prototype.scene_add_effect = function (n) {
                    var msg = n.body;
                    this.sendNt("on_skill_buf_show" /* ON_SKILL_BUF_SHOW */, msg);
                };
                //预留
                SceneProxy.prototype.scene_del_effect = function (n) {
                    var msg = n.body;
                };
                ////////////////////////////////////触碰物///////////////////////////////////////////
                //点击退出，会弹结算界面
                SceneProxy.prototype.clickExit = function () {
                    var msg = new c2s_scene_exit();
                    this.sendProto(msg);
                };
                //退出场景
                SceneProxy.prototype.exitScene = function () {
                    var msg = new c2s_role_scene_leave();
                    this.sendProto(msg);
                };
                Object.defineProperty(SceneProxy.prototype, "curBossId", {
                    //当前挑战的boss
                    get: function () {
                        return this._model.curBossId;
                    },
                    set: function (curBossId) {
                        this._model.curBossId = curBossId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "foeTargetId", {
                    /**攻击目标*/
                    get: function () {
                        return this._model.foeTargetId;
                    },
                    set: function (value) {
                        //todo
                        if (this.curSceneType == 129 /* KuafuDoufa */) {
                            DEBUG && console.info("--kuafudoufa_set_foetargetId-- foeTargetId:" + this._model.foeTargetId + ", setValue:" + value);
                        }
                        var isChange = false;
                        if (!value || !this._model.foeTargetId || (value && this._model.foeTargetId && this._model.foeTargetId.neq(value))) {
                            isChange = true;
                            // todo 外部已监听到抛出，但是 foeTargetId 还没赋值，故而放到后面抛出
                            // this.sendNt(SceneEvent.FOE_TARGET_CHANGE);//攻击目标变更
                        }
                        this._model.foeTargetId = value;
                        if (isChange) {
                            this.sendNt("foe_target_change" /* FOE_TARGET_CHANGE */); //攻击目标变更;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "belong", {
                    ////////////////////////////////////场景伤害排行榜以及归属///////////////////////////////////////////
                    //当前归属
                    get: function () {
                        return this._model.belong;
                    },
                    set: function (belong) {
                        this._model.belong = belong;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "maxHurt", {
                    //最高伤害攻击者
                    get: function () {
                        return this._model.maxHurt;
                    },
                    enumerable: true,
                    configurable: true
                });
                SceneProxy.prototype.s2c_new_multiple_boss_hurt_rank = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this.updateHurtRank(msg.hurtlist, msg.my_info, msg.now_owner);
                };
                SceneProxy.prototype.updateHurtRank = function (hurtlist, my_info, now_owner) {
                    if (hurtlist || my_info) {
                        var info = { hurtList: hurtlist, myInfo: my_info };
                        this.sendNt("on_scene_rank_update" /* ON_SCENE_RANK_UPDATE */, info); //场景排行榜数据
                    }
                    if (now_owner) {
                        var lastBelong = mod.SceneUtil.getBelong();
                        if (lastBelong && lastBelong.role_id.eq(now_owner.role_id)) {
                            return; //归属者不变时，不需要发送事件
                        }
                        this.sendNt("on_scene_belong_update" /* ON_SCENE_BELONG_UPDATE */, now_owner); //归属者数据
                    }
                };
                SceneProxy.prototype.s2c_atk_role_max_hurt_role_info = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this.updateRoleInfo(msg.maxhurt_player);
                };
                SceneProxy.prototype.updateRoleInfo = function (maxhurt_player) {
                    if (maxhurt_player) {
                        var lastMaxHurt = mod.SceneUtil.getMaxHurt();
                        if (lastMaxHurt && lastMaxHurt.role_id.eq(maxhurt_player.role_id)) {
                            return; //最高伤害者不变时，不需要发送事件
                        }
                        this._model.maxHurt = maxhurt_player;
                        this.sendNt("on_scene_max_hurt_update" /* ON_SCENE_MAX_HURT_UPDATE */); //最高伤害者数据
                    }
                };
                SceneProxy.prototype.s2c_yijie_boss_hurt_rank = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.entity_id) {
                        var sceneProxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                        if (sceneProxy.curBossId && sceneProxy.curBossId.neq(msg.entity_id)) {
                            return; //过滤非当前挑战的boss
                        }
                    }
                    this.updateHurtRank(msg.hurtlist, msg.my_info, msg.now_owner);
                };
                SceneProxy.prototype.s2c_yongheng_boss_hurt_rank = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.entity_id) {
                        var sceneProxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                        if (sceneProxy.curBossId && sceneProxy.curBossId.neq(msg.entity_id)) {
                            return; //过滤非当前挑战的boss
                        }
                    }
                    this.updateHurtRank(msg.hurtlist, msg.my_info, msg.now_owner);
                };
                SceneProxy.prototype.s2c_zhuimo_boss_hurt_rank = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.entity_id) {
                        var sceneProxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                        if (sceneProxy.curBossId && sceneProxy.curBossId.neq(msg.entity_id)) {
                            return; //过滤非当前挑战的boss
                        }
                    }
                    this.updateHurtRank(msg.hurtlist, msg.my_info, null);
                    if (msg.hurtlist && msg.hurtlist[0]) {
                        this.updateRoleInfo(msg.hurtlist[0]);
                    }
                };
                ////////////////////////////////////场景伤害排行榜以及归属///////////////////////////////////////////
                ////////////////////////////////////场景伤害///////////////////////////////////////////
                SceneProxy.prototype.s2c_boss_srefresh_damage = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.damage_list) {
                        return;
                    }
                    this.sendNt("on_scene_damage_update" /* ON_SCENE_DAMAGE_UPDATE */, msg);
                };
                Object.defineProperty(SceneProxy.prototype, "mainAi", {
                    ////////////////////////////////////场景伤害///////////////////////////////////////////
                    //获取AI
                    get: function () {
                        return this._model.mainAi;
                    },
                    enumerable: true,
                    configurable: true
                });
                ////////////////////////////////////副本通用结束时间戳///////////////////////////////////////////
                SceneProxy.prototype.s2c_scene_fuben_end_time = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.endtime) {
                        return;
                    }
                    this._model.endTime = msg.endtime.toNumber();
                };
                Object.defineProperty(SceneProxy.prototype, "endTime", {
                    get: function () {
                        return this._model.endTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneProxy.prototype, "diedInfo", {
                    //死亡复活信息
                    get: function () {
                        return this._model.diedInfo;
                    },
                    enumerable: true,
                    configurable: true
                });
                return SceneProxy;
            }(game.ProxyBase));
            scene.SceneProxy = SceneProxy;
            __reflect(SceneProxy.prototype, "game.mod.scene.SceneProxy", ["game.mod.ISceneProxy", "base.IProxy"]);
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var BelongPlayerView = /** @class */ (function (_super) {
                __extends(BelongPlayerView, _super);
                function BelongPlayerView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.scene.BelongPlayerSkin";
                    return _this;
                }
                return BelongPlayerView;
            }(eui.Component));
            scene.BelongPlayerView = BelongPlayerView;
            __reflect(BelongPlayerView.prototype, "game.mod.scene.BelongPlayerView");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var InitSceneMdrCmd = /** @class */ (function (_super) {
                __extends(InitSceneMdrCmd, _super);
                function InitSceneMdrCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                InitSceneMdrCmd.prototype.exec = function (n) {
                    _super.prototype.exec.call(this, n);
                    this.owner.unregCmd("init_scene_mdr" /* INIT_SCENE_MDR */);
                    game.LogUtil.printLogin("创建场景mdr SceneMdr");
                    new scene.SceneMdr();
                };
                return InitSceneMdrCmd;
            }(game.CmdBase));
            scene.InitSceneMdrCmd = InitSceneMdrCmd;
            __reflect(InitSceneMdrCmd.prototype, "game.mod.scene.InitSceneMdrCmd");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var Handler = base.Handler;
            var SceneTools = game.scene.SceneTools;
            var TimeMgr = base.TimeMgr;
            var facade = base.facade;
            var LoadCfgCmd = /** @class */ (function (_super) {
                __extends(LoadCfgCmd, _super);
                function LoadCfgCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LoadCfgCmd.prototype.exec = function (n) {
                    var self = this;
                    this._proxy = self.retProxy(2 /* Scene */);
                    //let p: ISceneProxy = self.retProxy(ProxyType.Scene);
                    //self.firstEnter = p.firstEnter;
                    var mapId = self.getCurMapId();
                    if (!mapId) {
                        var proxy = this.retProxy(2 /* Scene */);
                        console.error("获取地图id错误！", proxy.curSceneIdx);
                        return;
                    }
                    var mskUrl = game.ResUtil.getMapMaskUrl(mapId);
                    game.LoadMgr.ins.addRef(mskUrl);
                    // gAlert("加载地图id111，"+mskUrl);
                    game.LoadMgr.ins.load(mskUrl, Handler.alloc(self, self.onLoadCfg), game.LoadPri.UIScene);
                };
                LoadCfgCmd.prototype.getCurMapId = function () {
                    var proxy = this.retProxy(2 /* Scene */);
                    return SceneTools.getMapIdByScene(proxy.curSceneIdx);
                };
                LoadCfgCmd.prototype.onLoadCfg = function (data, url) {
                    var self = this;
                    game.LoadMgr.ins.decRef(url);
                    var mapId = self.getCurMapId();
                    if (!mapId) {
                        console.error("onLoadCfg error1");
                        return;
                    }
                    if (url != game.ResUtil.getMapMaskUrl(mapId)) {
                        console.error("onLoadCfg error2");
                        return;
                    }
                    self.sendNt("scene_cfg_loaded" /* SCENE_CFG_LOADED */, data);
                    var blurUrl = game.ResUtil.getMapBlurUrl(mapId);
                    game.LoadMgr.ins.addRef(blurUrl);
                    game.LoadMgr.ins.load(blurUrl, Handler.alloc(self, self.onLoadBlur), game.LoadPri.UIScene);
                    if (this._proxy.firstEnter) {
                        this._proxy.setFirstEnter(false);
                        self.sendNt("start_game" /* START_GAME */);
                        var roleVo = game.RoleVo.ins;
                        var roleId = roleVo.role_id.toString();
                        var power = roleVo.showpower ? roleVo.showpower.toString() : 0;
                        var lv = roleVo.level;
                        var name = roleVo.name;
                        var vip = mod.VipUtil.getShowVipLv();
                        var money = roleVo.diamond.toString();
                        var time = TimeMgr.time.serverTimeSecond;
                        var loginProxy = facade.retMod("02" /* Login */).retProxy(1 /* Login */);
                        if (gzyyou.sdk.pointReport)
                            gzyyou.sdk.pointReport(3 /* Enter */, lv, roleId, name, vip, money, time, loginProxy && loginProxy.create_time);
                        gzyyou.sdk.loadReport("load_scene" /* SCENE */);
                        console.log("===============REPORT_LOAD.SCEN");
                        // gAlert("加载地图id333，");
                    }
                };
                LoadCfgCmd.prototype.onLoadBlur = function (texture, url) {
                    var self = this;
                    game.LoadMgr.ins.decRef(url);
                    var mapId = self.getCurMapId();
                    if (!mapId) {
                        return;
                    }
                    if (url != game.ResUtil.getMapBlurUrl(mapId)) {
                        return;
                    }
                    this.sendNt("scene_blur_loaded" /* SCENE_BLUR_LOADED */, texture);
                };
                return LoadCfgCmd;
            }(game.CmdBase));
            scene.LoadCfgCmd = LoadCfgCmd;
            __reflect(LoadCfgCmd.prototype, "game.mod.scene.LoadCfgCmd");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var npc_data = msg.npc_data;
            var NPCVo = game.scene.NPCVo;
            //import NpcConfig = game.config.NpcConfig;
            /** 添加客户端NPC */
            var OnAddClientNpcCmd = /** @class */ (function (_super) {
                __extends(OnAddClientNpcCmd, _super);
                function OnAddClientNpcCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OnAddClientNpcCmd.prototype.exec = function (n) {
                    var self = this;
                    var data = n.body;
                    self._proxy = self.retProxy(2 /* Scene */);
                    var model = self._proxy.getModel();
                    var vo;
                    if (data instanceof npc_data) {
                        vo = self.addDataNpc(data);
                    }
                    else {
                        //vo = self.addConfigNpc(data);
                    }
                    if (!vo)
                        return;
                    model.npcDic[vo.entity_id.toString()] = vo;
                    self._proxy.addVo(vo, 2 /* NPC */);
                    self.sendNt("on_display_add" /* ON_OBJ_ADD */, vo);
                };
                OnAddClientNpcCmd.prototype.addDataNpc = function (data) {
                    var self = this;
                    if (self._proxy.getClientSceneNpc(data.npc_id))
                        return null;
                    // 根据类型添加 客户端实体数据
                    var vo = new NPCVo(2 /* NPC */);
                    vo.x = data.x;
                    vo.y = data.y;
                    vo.name = data.name;
                    vo.entity_id = self._proxy.getNpcEntityId();
                    vo.index = data.npc_index;
                    vo.npc_id = data.npc_id;
                    vo.direction = data.direction;
                    return vo;
                };
                return OnAddClientNpcCmd;
            }(game.CmdBase));
            scene.OnAddClientNpcCmd = OnAddClientNpcCmd;
            __reflect(OnAddClientNpcCmd.prototype, "game.mod.scene.OnAddClientNpcCmd");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            /** 删除场景所有客户端NPC */
            var OnClearClientNpcCmd = /** @class */ (function (_super) {
                __extends(OnClearClientNpcCmd, _super);
                function OnClearClientNpcCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OnClearClientNpcCmd.prototype.exec = function (n) {
                    var self = this;
                    var proxy = self.retProxy(2 /* Scene */);
                    var model = proxy.getModel();
                    var dict = model.npcDic;
                    var list = Object.keys(dict);
                    for (var i = 0, len = list.length; i < len; i++) {
                        var key = list[i];
                        var tmpVo = dict[key];
                        var del = proxy.delVo(tmpVo.entity_id);
                        if (del) {
                            this.sendNt("on_display_del" /* ON_OBJ_DEL */, del);
                        }
                        delete dict[key];
                    }
                };
                return OnClearClientNpcCmd;
            }(game.CmdBase));
            scene.OnClearClientNpcCmd = OnClearClientNpcCmd;
            __reflect(OnClearClientNpcCmd.prototype, "game.mod.scene.OnClearClientNpcCmd");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            /** 删除客户端NPC */
            var OnDelClientNpcCmd = /** @class */ (function (_super) {
                __extends(OnDelClientNpcCmd, _super);
                function OnDelClientNpcCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OnDelClientNpcCmd.prototype.exec = function (n) {
                    var self = this;
                    var npc_id = n.body;
                    var proxy = self.retProxy(2 /* Scene */);
                    var model = proxy.getModel();
                    var dict = model.npcDic;
                    for (var key in dict) {
                        var tmpVo = dict[key];
                        if (npc_id == tmpVo.npc_id) {
                            var del = proxy.delVo(tmpVo.entity_id);
                            if (del) {
                                self.sendNt("on_display_del" /* ON_OBJ_DEL */, del);
                            }
                            delete dict[key];
                            break;
                        }
                    }
                };
                return OnDelClientNpcCmd;
            }(game.CmdBase));
            scene.OnDelClientNpcCmd = OnDelClientNpcCmd;
            __reflect(OnDelClientNpcCmd.prototype, "game.mod.scene.OnDelClientNpcCmd");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var facade = base.facade;
            var AutoHangUpChangedCmd = /** @class */ (function (_super) {
                __extends(AutoHangUpChangedCmd, _super);
                function AutoHangUpChangedCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                AutoHangUpChangedCmd.prototype.exec = function (n) {
                    _super.prototype.exec.call(this, n);
                    var p = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                    var model = p.getModel();
                    if (p.isAutoHangUp) {
                        model.mainAi.startHangUp();
                    }
                    else {
                        model.mainAi.stopHandUp();
                    }
                };
                return AutoHangUpChangedCmd;
            }(game.CmdBase));
            scene.AutoHangUpChangedCmd = AutoHangUpChangedCmd;
            __reflect(AutoHangUpChangedCmd.prototype, "game.mod.scene.AutoHangUpChangedCmd");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var _a;
            var CommonAi = game.scene.CommonAi;
            var Pool = base.Pool;
            var KuafuDoufaAi = game.scene.KuafuDoufaAi;
            /**不同场景类型Ai*/
            scene.SceneTypeAi = (_a = {},
                _a[129 /* KuafuDoufa */] = KuafuDoufaAi,
                _a);
            /** 添加客户端AI */
            var OnAddPlayerAiCmd = /** @class */ (function (_super) {
                __extends(OnAddPlayerAiCmd, _super);
                function OnAddPlayerAiCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OnAddPlayerAiCmd.prototype.exec = function (n) {
                    var self = this;
                    var _proxy = self.retProxy(2 /* Scene */);
                    var model = _proxy.getModel();
                    var player = model.mainPlayer;
                    var ai;
                    var cls = scene.SceneTypeAi[_proxy.curSceneType];
                    if (cls) {
                        ai = Pool.alloc(cls);
                    }
                    else {
                        ai = Pool.alloc(CommonAi);
                    }
                    if (ai)
                        player.add(ai);
                    model.mainAi = ai;
                };
                return OnAddPlayerAiCmd;
            }(game.CmdBase));
            scene.OnAddPlayerAiCmd = OnAddPlayerAiCmd;
            __reflect(OnAddPlayerAiCmd.prototype, "game.mod.scene.OnAddPlayerAiCmd");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var MoveAct = game.scene.MoveAct;
            var AttackAct = game.scene.AttackAct;
            var OnResetPlayerPtCmd = /** @class */ (function (_super) {
                __extends(OnResetPlayerPtCmd, _super);
                function OnResetPlayerPtCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OnResetPlayerPtCmd.prototype.exec = function (n) {
                    var proxy = this.retProxy(2 /* Scene */);
                    var model = proxy.getModel();
                    if (!model.scene.isSceneReady) {
                        return;
                    }
                    var _a = n.body, id = _a.id, x = _a.x, y = _a.y;
                    var obj = model.scene.ctrl.getObj(id);
                    if (!obj) {
                        return;
                    }
                    this.resetActor(obj, x, y);
                };
                OnResetPlayerPtCmd.prototype.resetActor = function (obj, x, y) {
                    var curAct = obj.actMgr.curAct;
                    if (curAct instanceof MoveAct || curAct instanceof AttackAct) {
                        curAct.abort();
                    }
                    obj.actMgr.removeAllActByCls(MoveAct);
                    obj.actMgr.removeAllActByCls(AttackAct);
                    obj.checkAct();
                    obj.setTilePos(x, y);
                };
                return OnResetPlayerPtCmd;
            }(game.CmdBase));
            scene.OnResetPlayerPtCmd = OnResetPlayerPtCmd;
            __reflect(OnResetPlayerPtCmd.prototype, "game.mod.scene.OnResetPlayerPtCmd");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var OnTapSkillCmd = /** @class */ (function (_super) {
                __extends(OnTapSkillCmd, _super);
                function OnTapSkillCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OnTapSkillCmd.prototype.exec = function (n) {
                    var proxy = this.retProxy(2 /* Scene */);
                    var model = proxy.getModel();
                    if (!model.mainPlayer || !model.mainAi) {
                        return;
                    }
                    var t = model.scene.sceneType;
                    //model.mainAi.addNextSkill(n.body);
                };
                return OnTapSkillCmd;
            }(game.CmdBase));
            scene.OnTapSkillCmd = OnTapSkillCmd;
            __reflect(OnTapSkillCmd.prototype, "game.mod.scene.OnTapSkillCmd");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            /**
             *场景点击对象
             */
            var OnSceneClickCmd = /** @class */ (function (_super) {
                __extends(OnSceneClickCmd, _super);
                function OnSceneClickCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OnSceneClickCmd.prototype.exec = function (n) {
                    // let obj: BaseActor = n.body;
                    // let proxy: SceneProxy = this.retProxy(ProxyType.Scene);
                    // let model = proxy.getModel();
                    //model.mainAi.onSceneClick(obj);
                };
                return OnSceneClickCmd;
            }(game.CmdBase));
            scene.OnSceneClickCmd = OnSceneClickCmd;
            __reflect(OnSceneClickCmd.prototype, "game.mod.scene.OnSceneClickCmd");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var facade = base.facade;
            var OnSceneEnterCmd = /** @class */ (function (_super) {
                __extends(OnSceneEnterCmd, _super);
                function OnSceneEnterCmd() {
                    var _a, _b;
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**场景类型映射副本界面，没有自己场景界面的不需要处理，todo*/
                    _this.sceneTypeToViewData = (_a = {},
                        _a[108 /* Fuben */] = ["49" /* Shilian */, "02" /* FubenScene */],
                        _a[110 /* Xianta */] = ["49" /* Shilian */, "06" /* XiantaScene */],
                        _a[109 /* Forbidden */] = ["49" /* Shilian */, "07" /* ForbiddenScene */],
                        _a[111 /* Yuanling */] = ["49" /* Shilian */, "08" /* YuanlingScene */],
                        _a[115 /* CrossBoss */] = ["22" /* Boss */, "06" /* CrossBossScene */],
                        _a[120 /* Yijie */] = ["56" /* Yijie */, "02" /* YijieScene */],
                        _a[121 /* YonghengYijie */] = ["56" /* Yijie */, "10" /* YonghengYijieScene */],
                        _a[122 /* XianlvShilian */] = ["58" /* Xianyuan */, "17" /* ShilianScene */],
                        _a[124 /* Abyss */] = ["22" /* Boss */, "08" /* AbyssScene */],
                        _a[125 /* Fengmo */] = ["61" /* More */, "86" /* FengmoScene */],
                        _a[126 /* Sea */] = ["56" /* Yijie */, "24" /* SeaScene */],
                        _a[129 /* KuafuDoufa */] = ["52" /* Compete */, "45" /* KuafuDoufaScene */],
                        _a[130 /* XianjieLuandou */] = ["61" /* More */, "172" /* XianjieLuandouScene */],
                        _a);
                    _this.pvpTypeToViewData = (_b = {},
                        _b[128 /* XianlvDoufa */] = ["58" /* Xianyuan */, "22" /* XianlvDoufaScene */],
                        _b);
                    return _this;
                }
                OnSceneEnterCmd.prototype.exec = function (n) {
                    _super.prototype.exec.call(this, n);
                    this._proxy = this.retProxy(2 /* Scene */);
                    this._cfg = game.getConfigByNameId("scene.json" /* Scene */, this._proxy.curSceneIdx);
                    game.LogUtil.printLogin("进入场景，打开界面");
                    this.showView(this._proxy.curSceneType);
                    this.checkLastScene(this._proxy.curSceneType, this._proxy.getSceneType(this._proxy.lastSceneIdx));
                    // 清掉落飘字队列
                    mod.PropTipsMgr.getIns().clear();
                    if (this._cfg && this._cfg.music && !gso.isBgMusic) {
                        game.SoundMgr.ins.setBg(game.ResUtil.getSoundUrl(this._cfg.music));
                    }
                };
                /**
                 * 检测上一个场景，用于关闭界面或者保存界面数据
                 * @param {number} type 当前
                 * @param {number} lastType 上一次
                 */
                OnSceneEnterCmd.prototype.checkLastScene = function (type, lastType) {
                    if (!lastType) {
                        return;
                    }
                    if (this.sceneTypeToViewData[lastType]) {
                        var data = this.sceneTypeToViewData[lastType];
                        facade.hideView(data[0], data[1]); //副本场景
                    }
                    if (this.pvpTypeToViewData[lastType]) {
                        var data = this.pvpTypeToViewData[lastType];
                        facade.hideView(data[0], data[1]); //pvp场景
                    }
                    if (type == 106 /* HangUp2 */ && lastType != 106 /* HangUp2 */) {
                        //副本返回挂机场景时，清除奖励预览id
                        mod.SceneUtil.resetReward();
                        //返回之前的副本界面
                        if (lastType == 108 /* Fuben */ && !gso.fubenChallenge) {
                            //上一次是个人副本界面时，且是第一次挑战
                            var miscProxy = facade.retMod("04" /* Misc */).retProxy(4 /* Misc */);
                            miscProxy.setSetting("fubenChallenge" /* fubenChallenge */, "1");
                            mod.ViewMgr.getIns().showMain();
                        }
                        else if (gso.isBackMain) {
                            // 1、挑战幻境之海最后一关，圣界副本 胜利 回到主界面，策划需求，后续要这样的需求，可以同用该变量
                            mod.ViewMgr.getIns().showMain();
                        }
                        else {
                            mod.ViewMgr.getIns().backLast();
                        }
                    }
                    if (lastType == 109 /* Forbidden */ || lastType == 110 /* Xianta */) {
                        var iProxy = facade.retMod("17" /* Result */).retProxy(17 /* Result */);
                        if (!iProxy.is_success && !mod.PayUtil.checkFirstCharge()) {
                            // facade.showView(ModName.Activity, MainActivityViewType.FirstCharge);
                            mod.ViewMgr.getIns().showSecondPop("27" /* Activity */, "49" /* FirstCharge */);
                        }
                    }
                };
                /**
                 * 进入场景(打开界面)
                 * @param {number} type
                 */
                OnSceneEnterCmd.prototype.showView = function (type) {
                    if (this.sceneTypeToViewData[type]) {
                        var data = this.sceneTypeToViewData[type];
                        facade.showView(data[0], data[1]); //副本场景
                    }
                    if (mod.SceneUtil.isPvpScene()) {
                        if (this.pvpTypeToViewData[type]) {
                            var data = this.pvpTypeToViewData[type];
                            facade.showView(data[0], data[1]);
                            return;
                        }
                        //PVP场景通用界面
                        facade.showView("03" /* Scene */, "06" /* PvpFight */);
                    }
                    //特殊场景自己处理下
                };
                return OnSceneEnterCmd;
            }(game.CmdBase));
            scene.OnSceneEnterCmd = OnSceneEnterCmd;
            __reflect(OnSceneEnterCmd.prototype, "game.mod.scene.OnSceneEnterCmd");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var facade = base.facade;
            var OnSceneReadyCmd = /** @class */ (function (_super) {
                __extends(OnSceneReadyCmd, _super);
                function OnSceneReadyCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OnSceneReadyCmd.prototype.exec = function (n) {
                    var self = this;
                    game.SoundMgr.ins.setBg(null);
                    //PVP场景设置模型缩放
                    //gso.avatarScale = SceneUtil.isPvpScene() ? 1 : 1.25;
                    var proxy = self.retProxy(2 /* Scene */);
                    self.checkEnter(proxy.curSceneType);
                    if (proxy.lastSceneIdx > 0) {
                        self.sendNt("clean_scene" /* CLEAN_SCENE */);
                        game.LoadMgr.ins.checkNow();
                    }
                    self.sendNt("load_scene_cfg" /* LOAD_SCENE_CFG */); //加载配置
                    self.sendNt("scene_change" /* SCENE_CHANGE */);
                };
                /**
                 * 进入场景关闭界面，资源为加载
                 * @param {number} type
                 */
                OnSceneReadyCmd.prototype.checkEnter = function (type) {
                    if (type != 111 /* Yuanling */) {
                        var yuanlingProxy = facade.retMod("49" /* Shilian */).retProxy(197 /* YuanlingFuben */);
                        yuanlingProxy.onClearInvitedTeam(); //清除组队信息
                    }
                    if (type == 106 /* HangUp2 */) {
                        //挂机战斗不关闭界面
                        var passProxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                        passProxy.challengeBoss = false; //重置挑战挂机boss
                        return;
                    }
                    //进入非挂机场景时，保存上一次的界面数据
                    mod.ViewMgr.getIns().saveLast();
                    /**一般不需要处理，统一走ViewMgr关闭就行了*/
                    mod.ViewMgr.getIns().hideMainView();
                };
                return OnSceneReadyCmd;
            }(game.CmdBase));
            scene.OnSceneReadyCmd = OnSceneReadyCmd;
            __reflect(OnSceneReadyCmd.prototype, "game.mod.scene.OnSceneReadyCmd");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var AllObjectType = game.scene.AllObjectType;
            var SceneModel = /** @class */ (function () {
                function SceneModel() {
                    this.isFirstEnter = true;
                    this._isAutoHangUp = true;
                    this.isEnterScene = false; //是否第二次确定进入场景
                    this.isMapOk = false;
                    this.lastSceneIdx = 0;
                    this.curSceneIdx = 0;
                    this._voList = {};
                    /** 客户端NPC */
                    this.npcDic = {};
                    this.client_entity_num = 0;
                    this.typeVoMap = {};
                    for (var _i = 0, AllObjectType_1 = AllObjectType; _i < AllObjectType_1.length; _i++) {
                        var type = AllObjectType_1[_i];
                        this.typeVoMap[type] = [];
                    }
                }
                Object.defineProperty(SceneModel.prototype, "isAutoHangUp", {
                    get: function () {
                        return this._isAutoHangUp;
                    },
                    set: function (value) {
                        this._isAutoHangUp = value;
                        if (this.mainPlayerVo) {
                            this.mainPlayerVo.isAutoHangUp = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SceneModel.prototype, "voList", {
                    get: function () {
                        return this._voList;
                    },
                    set: function (value) {
                        this._voList = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                SceneModel.prototype.genClientEntityId = function () {
                    if (!this.clientId) {
                        this.clientId = Long.fromValue(1000000000);
                    }
                    this.client_entity_num++;
                    if (this.client_entity_num > 90000) {
                        this.client_entity_num = 0;
                    }
                    return this.clientId.add(this.client_entity_num);
                };
                return SceneModel;
            }());
            scene.SceneModel = SceneModel;
            __reflect(SceneModel.prototype, "game.mod.scene.SceneModel");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var AiTools = /** @class */ (function () {
                function AiTools() {
                }
                return AiTools;
            }());
            scene.AiTools = AiTools;
            __reflect(AiTools.prototype, "game.mod.scene.AiTools");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var SceneMod = /** @class */ (function (_super) {
                __extends(SceneMod, _super);
                function SceneMod() {
                    return _super.call(this, "03" /* Scene */) || this;
                }
                SceneMod.prototype.initCmd = function () {
                    var self = this;
                    self.regCmd("init_scene_mdr" /* INIT_SCENE_MDR */, scene.InitSceneMdrCmd);
                    self.regCmd("load_scene_cfg" /* LOAD_SCENE_CFG */, scene.LoadCfgCmd);
                    self.regCmd("on_scene_ready" /* ON_SCENE_READY */, scene.OnSceneReadyCmd);
                    self.regCmd("on_scene_enter" /* ON_SCENE_ENTER */, scene.OnSceneEnterCmd);
                    self.regCmd("on_scene_click" /* ON_SCENE_CLICK */, scene.OnSceneClickCmd);
                    self.initPlayerCmd();
                    self.initNpcCmd();
                };
                SceneMod.prototype.initModel = function () {
                    var self = this;
                    self.regProxy(2 /* Scene */, scene.SceneProxy);
                };
                SceneMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    var self = this;
                    self.regMdr("05" /* RoleRevive */, scene.RoleReviveMdr);
                    self.regMdr("06" /* PvpFight */, scene.PvpFightMdr); /**PVP界面*/
                    self.regMdr("07" /* PvpFightEnter */, scene.PvpFightEnterMdr); /**PVP界面进场*/
                    self.regMdr("01" /* BigBossHp */, scene.BigBossHpMdr); /**boss血量提示*/
                    self.regMdr("03" /* ChallengeTips */, scene.ChallengeTipsMdr); /**挑战提示，第几层*/
                    self.regMdr("02" /* Belong */, scene.BelongPlayerMdr); /**归属玩家*/
                    self.regMdr("04" /* Enemy */, scene.EnemyMdr); /**敌人列表*/
                };
                SceneMod.prototype.initPlayerCmd = function () {
                    var self = this;
                    self.regCmd("on_reset_player_pt" /* ON_RESET_PLAYER_PT */, scene.OnResetPlayerPtCmd);
                    self.regCmd("on_tap_skill" /* ON_TAP_SKILL */, scene.OnTapSkillCmd);
                    self.regCmd("on_add_player_ai" /* ON_ADD_PLAYER_AI */, scene.OnAddPlayerAiCmd);
                    self.regCmd("on_auto_hang_up_update" /* ON_AUTO_HANG_UP_UPDATE */, scene.AutoHangUpChangedCmd);
                };
                SceneMod.prototype.initNpcCmd = function () {
                    var self = this;
                    self.regCmd("on_del_client_npc" /* ON_DEL_CLIENT_NPC */, scene.OnDelClientNpcCmd);
                    self.regCmd("on_add_client_npc" /* ON_ADD_CLIENT_NPC */, scene.OnAddClientNpcCmd);
                    self.regCmd("on_clear_all_client_npc" /* ON_CLEAR_CLIENT_NPC */, scene.OnClearClientNpcCmd);
                };
                return SceneMod;
            }(game.ModBase));
            scene.SceneMod = SceneMod;
            __reflect(SceneMod.prototype, "game.mod.scene.SceneMod");
            gso.modCls.push(SceneMod);
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var BigBossHpView = /** @class */ (function (_super) {
                __extends(BigBossHpView, _super);
                function BigBossHpView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.scene.BigBossHpSkin";
                    return _this;
                }
                return BigBossHpView;
            }(eui.Component));
            scene.BigBossHpView = BigBossHpView;
            __reflect(BigBossHpView.prototype, "game.mod.scene.BigBossHpView");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var ChallengeTipsView = /** @class */ (function (_super) {
                __extends(ChallengeTipsView, _super);
                function ChallengeTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.scene.challengeTipsSkin";
                    return _this;
                }
                return ChallengeTipsView;
            }(eui.Component));
            scene.ChallengeTipsView = ChallengeTipsView;
            __reflect(ChallengeTipsView.prototype, "game.mod.scene.ChallengeTipsView");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var EnemyItem = /** @class */ (function (_super) {
                __extends(EnemyItem, _super);
                function EnemyItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                EnemyItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_attack, this.onClick, this);
                };
                EnemyItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    this._proxy.foeTargetId = info.entity_id; //设置敌人为攻击目标
                };
                EnemyItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    this.head.updateHeadShow(info.head, info.head_frame, info.sex);
                    this.lab_name.text = game.getLanById("tongtian23" /* tongtian23 */) + "：" + info.name;
                    var guildName = info.guild_name || game.getLanById("bag_cue20" /* bag_cue20 */);
                    this.lab_team.text = game.getLanById("union_title_2" /* union_title_2 */) + "：" + guildName;
                    this.lab_power.text = game.StringUtil.getHurtNumStr(info.showpower.toNumber());
                    this.updateEnemyHp(this.data.percent);
                };
                /**更新血量*/
                EnemyItem.prototype.updateEnemyHp = function (percent) {
                    if (!this.data) {
                        return;
                    }
                    this.bar.show(percent, 10000, false, 0, false, 0 /* Percent */); //血量
                    var isDied = percent <= 0; //已死亡
                    var tipsStr = "";
                    if (isDied) {
                        //已死亡
                        tipsStr = game.TextUtil.addColor(game.getLanById("reviving" /* reviving */) + "...", 65280 /* GREEN */);
                        this.btn_attack.visible = false;
                    }
                    else {
                        var isAtack = this._proxy.foeTargetId && this._proxy.foeTargetId.eq(this.data.entity_id); //攻击中
                        this.btn_attack.visible = !isAtack;
                        tipsStr = game.TextUtil.addColor(game.getLanById("attacking" /* attacking */) + "...", 16711680 /* RED */);
                    }
                    this.lab_tips.textFlow = game.TextUtil.parseHtml(tipsStr);
                };
                return EnemyItem;
            }(mod.BaseListenerRenderer));
            scene.EnemyItem = EnemyItem;
            __reflect(EnemyItem.prototype, "game.mod.scene.EnemyItem");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var EnemyView = /** @class */ (function (_super) {
                __extends(EnemyView, _super);
                function EnemyView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.scene.EnemySkin";
                    return _this;
                }
                return EnemyView;
            }(eui.Component));
            scene.EnemyView = EnemyView;
            __reflect(EnemyView.prototype, "game.mod.scene.EnemyView");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var PvpFightView = /** @class */ (function (_super) {
                __extends(PvpFightView, _super);
                function PvpFightView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.scene.PvpFightSkin";
                    return _this;
                }
                return PvpFightView;
            }(eui.Component));
            scene.PvpFightView = PvpFightView;
            __reflect(PvpFightView.prototype, "game.mod.scene.PvpFightView");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var RoleReviveView = /** @class */ (function (_super) {
                __extends(RoleReviveView, _super);
                function RoleReviveView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.scene.RoleReviveSkin";
                    return _this;
                }
                return RoleReviveView;
            }(eui.Component));
            scene.RoleReviveView = RoleReviveView;
            __reflect(RoleReviveView.prototype, "game.mod.scene.RoleReviveView");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var SceneDamageItem = /** @class */ (function (_super) {
                __extends(SceneDamageItem, _super);
                function SceneDamageItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SceneDamageItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var nameStr = "";
                    var isRole = this.data.index.eq(game.RoleVo.ins.role_id);
                    if (isRole) {
                        nameStr = game.getLanById("role" /* role */);
                    }
                    else {
                        var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, this.data.index.toNumber());
                        nameStr = game.getLanById(game.ShenlingTypeName[cfg.type]) + game.getLanById("general_tips" /* general_tips */); //火神灵
                    }
                    this.lab_rank.text = nameStr;
                    this.lab_allDamage.text = game.StringUtil.getHurtNumStr(this.data.damage.toNumber());
                    this.lab_perDamage.text = game.StringUtil.getHurtNumStr(this.data.damage_s.toNumber()) + "/" + game.getLanById("shijian_4" /* shijian_4 */);
                };
                return SceneDamageItem;
            }(eui.ItemRenderer));
            scene.SceneDamageItem = SceneDamageItem;
            __reflect(SceneDamageItem.prototype, "game.mod.scene.SceneDamageItem");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var SceneRankItem = /** @class */ (function (_super) {
                __extends(SceneRankItem, _super);
                function SceneRankItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SceneRankItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.lab_rank.text = this.data.rank_num + "";
                    this.lab_name.text = this.data.name;
                    this.lab_hurt.text = game.StringUtil.getHurtNumStr(this.data.value.toNumber());
                };
                return SceneRankItem;
            }(eui.ItemRenderer));
            scene.SceneRankItem = SceneRankItem;
            __reflect(SceneRankItem.prototype, "game.mod.scene.SceneRankItem");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var BelongPlayerMdr = /** @class */ (function (_super) {
                __extends(BelongPlayerMdr, _super);
                function BelongPlayerMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", scene.BelongPlayerView);
                    return _this;
                }
                BelongPlayerMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.percentHeight = 100;
                    this._view.percentWidth = 100;
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(2 /* Scene */);
                };
                BelongPlayerMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.head1, TouchEvent.TOUCH_TAP, this.onClickBelong);
                    addEventListener(this._view.head2, TouchEvent.TOUCH_TAP, this.onClickEnemy);
                    addEventListener(this._view.head3, TouchEvent.TOUCH_TAP, this.onClickMaxHurt);
                    addEventListener(this._view.btn_enemy, TouchEvent.TOUCH_TAP, this.onClickEnemyList);
                    addEventListener(this._view.btn_belong, TouchEvent.TOUCH_TAP, this.onClickBelongInfo);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                    this.onNt("big_boss_hp_hide" /* BIG_BOSS_HP_HIDE */, this.hide, this);
                    this.onNt("on_scene_belong_update" /* ON_SCENE_BELONG_UPDATE */, this.onBelongUpdate, this); //归属者更新
                    this.onNt("on_scene_max_hurt_update" /* ON_SCENE_MAX_HURT_UPDATE */, this.onMaxHurtUpdate, this); //最高伤害者更新
                    this.onNt("on_display_add" /* ON_OBJ_ADD */, this.onObjAdd, this);
                    this.onNt("on_display_del" /* ON_OBJ_DEL */, this.onObjDel, this);
                };
                BelongPlayerMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.setBelongGrp(false);
                    this.updateBelong();
                    this.updateEnemy();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                BelongPlayerMdr.prototype.onHide = function () {
                    this._proxy.belong = null;
                    this._belongVo = null;
                    this._curEnemyVo = null;
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                BelongPlayerMdr.prototype.initShow = function () {
                    var showRight = mod.SceneUtil.isSceneType(113 /* ManyBoss */); //多人BOSS显示在右边
                    if (showRight) {
                        this._view.grp_base.right = 6;
                        this._view.grp_belong.x = -180;
                    }
                    else {
                        this._view.grp_base.left = 6;
                        this._view.grp_belong.x = 133;
                    }
                };
                /**点击归属者*/
                BelongPlayerMdr.prototype.onClickBelong = function () {
                    if (this._isMyBelong) {
                        return;
                    }
                    if (!!this._belongVo.camp && !!this._proxy.mainPlayerVo.camp && this._belongVo.camp == this._proxy.mainPlayerVo.camp) {
                        game.PromptBox.getIns().show("同一阵营不能抢夺");
                        return;
                    }
                    this._proxy.foeTargetId = this._belongVo.entity_id; //设置归属者为攻击目标
                };
                /**点击查看归属者信息*/
                BelongPlayerMdr.prototype.onClickBelongInfo = function () {
                    this.setBelongGrp(!this._openBelong);
                };
                /**点击敌人*/
                BelongPlayerMdr.prototype.onClickEnemy = function () {
                    if (!this._curEnemyVo) {
                        return;
                    }
                    this._proxy.foeTargetId = this._curEnemyVo.entity_id; //设置敌人为攻击目标
                };
                /**打开敌人列表*/
                BelongPlayerMdr.prototype.onClickEnemyList = function () {
                    if (!this._curEnemyVo) {
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("03" /* Scene */, "04" /* Enemy */);
                };
                BelongPlayerMdr.prototype.onObjAdd = function (n) {
                    this.updateEnemy();
                };
                BelongPlayerMdr.prototype.onObjDel = function (n) {
                    this.updateEnemy();
                };
                BelongPlayerMdr.prototype.onBelongUpdate = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        this.hide(); //没有归属者时关闭界面
                        return;
                    }
                    this._proxy.belong = msg;
                    this.updateBelong();
                };
                /**更新归属者*/
                BelongPlayerMdr.prototype.updateBelong = function () {
                    this.updateBelongInfo();
                    this.updateBelongHp();
                    this.updateBelongGrp();
                };
                /**更新归属者头像*/
                BelongPlayerMdr.prototype.updateBelongInfo = function () {
                    var info = this._proxy.belong;
                    this._view.head1.updateHeadShow(info.head, info.head_frame, info.sex);
                    this._isMyBelong = game.RoleVo.ins.role_id.eq(info.role_id);
                    this._view.img_tips1.visible = !this._isMyBelong; //不是自己就显示抢夺提示
                };
                /**更新归属者血量*/
                BelongPlayerMdr.prototype.updateBelongHp = function () {
                    var info = this._proxy.belong;
                    var belongVo = this._proxy.getVoById(info.entity_id);
                    this._belongVo = belongVo;
                    var value = belongVo && belongVo.percent || 0;
                    this._view.bar1.show(value, 10000, false, 0, false, 0 /* Percent */);
                };
                /**更新附近敌人*/
                BelongPlayerMdr.prototype.updateEnemy = function () {
                    var enemies = this._proxy.getEnemyVos(1 /* PLAYER */); //获取所有敌对玩家
                    this._curEnemyVo = enemies && enemies.length ? enemies[0] : null; //取第一个敌人
                    this.updateViewState();
                    if (!this._curEnemyVo) {
                        return;
                    }
                    this._view.head2.updateHeadShow(this._curEnemyVo.head, this._curEnemyVo.head_frame, this._curEnemyVo.sex);
                    this.updateEnemyHp();
                };
                /**更新敌人血量*/
                BelongPlayerMdr.prototype.updateEnemyHp = function () {
                    if (!this._curEnemyVo) {
                        return;
                    }
                    var value = this._curEnemyVo.percent || 0;
                    this._view.bar2.show(value, 10000, false, 0, false, 0 /* Percent */);
                };
                /**反击敌人*/
                BelongPlayerMdr.prototype.onClickMaxHurt = function () {
                    if (!this._proxy.maxHurt) {
                        return;
                    }
                    this._proxy.foeTargetId = this._proxy.maxHurt.entity_id; //设置敌人为攻击目标
                };
                BelongPlayerMdr.prototype.onMaxHurtUpdate = function (n) {
                    this.updateViewState();
                    this.updateMaxHurt();
                    this.updateMaxHurtHp();
                };
                /**更新复仇敌人*/
                BelongPlayerMdr.prototype.updateMaxHurt = function () {
                    var info = this._proxy.maxHurt;
                    this._view.head3.updateHeadShow(info.head, info.head_frame, info.sex);
                };
                /**更新复仇敌人血量*/
                BelongPlayerMdr.prototype.updateMaxHurtHp = function () {
                    if (!this._proxy.maxHurt) {
                        return;
                    }
                    var info = this._proxy.maxHurt;
                    var maxHurtVo = this._proxy.getVoById(info.entity_id);
                    var value = maxHurtVo && maxHurtVo.percent || 0;
                    this._view.bar3.show(value, 10000, false, 0, false, 0 /* Percent */);
                };
                BelongPlayerMdr.prototype.updateViewState = function () {
                    this._view.currentState = this._curEnemyVo ? (this._proxy.maxHurt ? "3" : "2") : "1";
                };
                BelongPlayerMdr.prototype.setBelongGrp = function (open) {
                    this._openBelong = open;
                    this._view.grp_belong.visible = open;
                    this._view.btn_belong.scaleY = open ? -1 : 1;
                };
                BelongPlayerMdr.prototype.updateBelongGrp = function () {
                    var info = this._proxy.belong;
                    this._view.lab_name.text = info.name;
                    var power = info.showpower ? info.showpower.toNumber() : 0;
                    this._view.lab_power.text = game.getLanById("showpower" /* showpower */) + "：" + game.StringUtil.getHurtNumStr(power);
                    var guildName = info.guild_name || game.getLanById("bag_cue20" /* bag_cue20 */);
                    this._view.lab_guild.text = game.getLanById("union_title_2" /* union_title_2 */) + "：" + guildName;
                };
                BelongPlayerMdr.prototype.update = function (time) {
                    this.updateBelongHp();
                    this.updateEnemyHp();
                    this.updateMaxHurtHp();
                };
                return BelongPlayerMdr;
            }(game.MdrBase));
            scene.BelongPlayerMdr = BelongPlayerMdr;
            __reflect(BelongPlayerMdr.prototype, "game.mod.scene.BelongPlayerMdr", ["base.UpdateItem"]);
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var TimeMgr = base.TimeMgr;
            var BitmapFillMode = egret.BitmapFillMode;
            var facade = base.facade;
            var Tween = base.Tween;
            var Handler = base.Handler;
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var BigBossHpMdr = /** @class */ (function (_super) {
                __extends(BigBossHpMdr, _super);
                function BigBossHpMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", scene.BigBossHpView);
                    _this._maxRank = 10; //显示前10名
                    return _this;
                }
                BigBossHpMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    var self = this;
                    self._view.top = 120;
                    self._view.horizontalCenter = 0;
                    self._view.touchEnabled = false;
                    self._proxy = self.retProxy(2 /* Scene */);
                    self._view.img_hp0.fillMode = self._view.img_mask.fillMode = self._view.img_bai.fillMode = BitmapFillMode.REPEAT;
                    this._rankList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = scene.SceneRankItem;
                    this._view.list_rank.dataProvider = this._rankList;
                    this._damageList = new ArrayCollection();
                    this._view.list_damage.itemRenderer = scene.SceneDamageItem;
                    this._view.list_damage.dataProvider = this._damageList;
                };
                BigBossHpMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
                    addEventListener(this._view.btn_damage, TouchEvent.TOUCH_TAP, this.onClickDamage);
                    this.onNt("on_display_del" /* ON_OBJ_DEL */, this.onObjDel, this);
                    this.onNt("on_boss_hp" /* ON_BOSS_HP */, this.onBossHpChanged, this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                    this.onNt("on_scene_rank_update" /* ON_SCENE_RANK_UPDATE */, this.onRankUpdate, this);
                    this.onNt("on_scene_damage_update" /* ON_SCENE_DAMAGE_UPDATE */, this.onDamageUpdate, this);
                    this.onNt("on_scene_belong_update" /* ON_SCENE_BELONG_UPDATE */, this.onBelongUpdate, this); //归属者更新，先放boss血条这里监听，后续需要的话再改
                };
                BigBossHpMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    // todo
                    if (mod.SceneUtil.getCurSceneType() == 130 /* XianjieLuandou */) {
                        this._view.top = 200;
                    }
                    this.initShow();
                    this.setBossInfo(this._showArgs);
                    this.updateReward();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                BigBossHpMdr.prototype.onHide = function () {
                    this._proxy.curBossId = null;
                    this._lastBossId = null;
                    this._isClearBoss = false;
                    this._lastNum = this._lastPer = this._maxLine = this._record = null;
                    this._isTweening = false;
                    TimeMgr.removeUpdateItem(this);
                    Tween.remove(this._view.img_mask);
                    _super.prototype.onHide.call(this);
                };
                BigBossHpMdr.prototype.initShow = function () {
                    this._view.grp_rank.visible = false;
                    this._showList = false;
                    this._rankInfo = null;
                    this._view.grp_damage.visible = false;
                    this._damageInfo = null;
                };
                BigBossHpMdr.prototype.hideHp = function () {
                    this.hide();
                    this.sendNt("big_boss_hp_hide" /* BIG_BOSS_HP_HIDE */);
                };
                /** 检测BOSS是否存活 */
                BigBossHpMdr.prototype.onObjDel = function (n) {
                    var _vo = n.body;
                    if (!_vo || _vo.entity_id.neq(this._proxy.curBossId)) {
                        return;
                    }
                    if (_vo.isDead) {
                        this.setBossHpTweenInfo(0, null);
                    }
                    else if (!this._isTweening) {
                        this.hideHp();
                    }
                    this._isClearBoss = true;
                };
                /// 血条更新///
                BigBossHpMdr.prototype.onBossHpChanged = function (n) {
                    var msg = n.body;
                    if (this._proxy.curBossId) {
                        var mainPlayerVo = this._proxy.mainPlayerVo;
                        var curBossVo = this._proxy.getVoById(this._proxy.curBossId);
                        var newBossVo = this._proxy.getVoById(msg.entity_id);
                        var curBossDis = void 0, newBossDis = void 0;
                        if (curBossVo)
                            curBossDis = game.PointUtil.distance(mainPlayerVo.x, mainPlayerVo.y, curBossVo.x, curBossVo.y);
                        if (newBossVo)
                            newBossDis = game.PointUtil.distance(mainPlayerVo.x, mainPlayerVo.y, newBossVo.x, newBossVo.y);
                        if (curBossVo && newBossVo && newBossDis > curBossDis) {
                            /**过滤距离比当前boss远的boss血量更新*/
                            return;
                        }
                    }
                    this.setBossInfo(msg);
                };
                //设置boss信息
                BigBossHpMdr.prototype.setBossInfo = function (info) {
                    this._curBossInfo = info;
                    this._proxy.curBossId = this._curBossInfo.entity_id;
                    this.updateBossShow();
                    this.setBossHpTweenInfo(this._curBossInfo.percent, this._curBossInfo.max_hp);
                };
                //显示boss信息
                BigBossHpMdr.prototype.updateBossShow = function () {
                    if (this._lastBossId && this._curBossInfo.entity_id.eq(this._lastBossId)) {
                        return;
                    }
                    this._lastBossId = this._curBossInfo.entity_id;
                    var cfg = this._curBossInfo.cfg;
                    this._view.lab_name.text = cfg.name;
                    this._view.img_icon.source = cfg.res_id;
                };
                //--------------------------------血条动画---------------------------------------------------------
                BigBossHpMdr.prototype.setBossHpTweenInfo = function (percent, max_hp) {
                    var self = this;
                    if (self._lastPer == percent) {
                        return;
                    }
                    self._lastPer = percent;
                    var _cur = 1;
                    var _per = 0;
                    if (percent > 0) {
                        this._maxLine = self.getHpLimit(max_hp);
                        var _one = Number(max_hp.div(self._maxLine));
                        var hp = max_hp.mul(percent).div(10000);
                        var _less = Number(hp) / _one;
                        _cur = Math.floor(_less);
                        if (_less > _cur) {
                            _cur++;
                        }
                        _less = Number(hp.mod(_one));
                        _per = _less > 0 ? _less / _one : 1;
                    }
                    if (!self._record) {
                        self._record = [[_per, _cur]];
                    }
                    else {
                        self._record.push([_per, _cur]);
                    }
                    if (!self._isTweening) {
                        self.setHpTweenShow();
                    }
                };
                BigBossHpMdr.prototype.getHpLimit = function (max_hp) {
                    var _line = 1;
                    var _cfgs = game.getConfigListByName("subsection.json" /* Subsection */);
                    if (_cfgs && _cfgs.length > 0) {
                        for (var _i = 0, _cfgs_1 = _cfgs; _i < _cfgs_1.length; _i++) {
                            var _temp = _cfgs_1[_i];
                            if (max_hp.lt(_temp.boss_hp)) {
                                break;
                            }
                            _line = _temp.hp_subsection;
                        }
                    }
                    return _line;
                };
                BigBossHpMdr.prototype.setHpTweenShow = function () {
                    var self = this;
                    if (self._lastNum != null) {
                        self._isTweening = true;
                        self.showRecordInfo();
                    }
                    else {
                        var _show = self._record.shift();
                        self.setOverShow(_show[0], _show[1]);
                    }
                };
                BigBossHpMdr.prototype.showProTween = function (_per, _cur, _isNext, _time) {
                    if (_time === void 0) { _time = 150; }
                    var self = this;
                    var _w = _isNext ? 0 : _per * 321;
                    self._view.img_hp0.width = _w;
                    Tween.get(self._view.img_bai)
                        .to({ alpha: 0 }, _time);
                    Tween.get(self._view.img_mask)
                        .delay(_time - 50)
                        .to({ width: _w }, _time + 50)
                        .exec(Handler.alloc(self, _isNext ? self.showHpFull : self.checkToShowNext, [_per, _cur]));
                };
                BigBossHpMdr.prototype.showHpFull = function (_per, _cur) {
                    var self = this;
                    self.setOverShow(1, self._lastNum - 1);
                    self.showProTween(_per, _cur, _cur != self._lastNum && self._lastNum > 0, 100);
                };
                BigBossHpMdr.prototype.checkToShowNext = function (_per, _cur) {
                    var self = this;
                    self.setOverShow(_per, _cur);
                    if (!self._record.length) {
                        self._isTweening = false;
                        if (_per == 0 && _cur < 2 || self._isClearBoss) {
                            this.hideHp();
                        }
                        return;
                    }
                    self.showRecordInfo();
                };
                BigBossHpMdr.prototype.showRecordInfo = function () {
                    var self = this;
                    var _show = self._record.pop();
                    self._record.length = 0;
                    self.showProTween(_show[0], _show[1], _show[1] != this._lastNum && this._lastNum > 0);
                };
                BigBossHpMdr.prototype.setOverShow = function (_per, _cur) {
                    var self = this;
                    self._view.img_hp0.width = self._view.img_mask.width = self._view.img_bai.width = _per * 321;
                    self._view.img_bai.alpha = 1;
                    self._lastNum = _cur;
                    this._view.lab_hp.text = _cur > 0 ? "x" + _cur : ""; //血条数量
                    var _line = _cur % 10; //Math.max(0, self._maxLine - _cur);
                    self._view.img_hp0.source = self._view.img_mask.source = "boss_hp" + (_line > 0 ? 10 - _line : 0);
                    _line = _line > 0 ? _line - 1 : 9;
                    self._view.img_hp1.source = _cur == 1 ? "" : "boss_hp" + (_line > 0 ? 10 - _line : 0);
                };
                //--------------------------------血条动画---------------------------------------------------------
                //-----------------------------------倒计时---------------------------------------------------------
                BigBossHpMdr.prototype.update = function (time) {
                    if (!this._curBossInfo) {
                        return;
                    }
                    this.setBossHpTweenInfo(this._curBossInfo.percent, this._curBossInfo.max_hp);
                };
                //-----------------------------------奖励预览-------------------------------
                BigBossHpMdr.prototype.onClickReward = function () {
                    mod.ViewMgr.getIns().bossReward(this._rewardId);
                };
                BigBossHpMdr.prototype.updateReward = function () {
                    this._rewardId = 0;
                    var rewardInfo = mod.SceneUtil.getReward();
                    if (rewardInfo && rewardInfo[0] == mod.SceneUtil.getCurSceneType()) {
                        this._rewardId = rewardInfo[1];
                    }
                    this._view.btn_reward.visible = !!this._rewardId;
                };
                //-----------------------------------奖励预览-------------------------------
                //-----------------------------------排行榜-------------------------------
                BigBossHpMdr.prototype.onClickRank = function () {
                    this._showList = !this._showList;
                    this.updateRank();
                };
                BigBossHpMdr.prototype.onRankUpdate = function (n) {
                    var msg = n.body;
                    this._view.grp_rank.visible = true;
                    this._rankInfo = msg;
                    this.updateRank();
                };
                BigBossHpMdr.prototype.updateRank = function () {
                    this._view.currentState = this._showList ? "2" : "1";
                    var info = this._rankInfo;
                    if (!info) {
                        return;
                    }
                    if (this._showList) {
                        this._rankList.source = info.hurtList && info.hurtList.length ? info.hurtList.slice(0, this._maxRank) : []; //显示前10名
                    }
                    else {
                        var rankStr = game.getLanById("fairy_magic_my_rank" /* fairy_magic_my_rank */); //我的排名：
                        rankStr += info.myInfo && info.myInfo.rank_num <= this._maxRank ? info.myInfo.rank_num : this._maxRank + "+"; //10+
                        this._view.lab_myRank.text = rankStr;
                        var myHurt = info.myInfo && info.myInfo.value ? info.myInfo.value.toNumber() : 0;
                        this._view.lab_myHurt.text = game.getLanById("exp_tip10" /* exp_tip10 */) + "：" + game.StringUtil.getHurtNumStr(myHurt); //伤害：0
                    }
                };
                //-----------------------------------排行榜-------------------------------
                //-----------------------------------归属者-------------------------------
                BigBossHpMdr.prototype.onBelongUpdate = function (n) {
                    var msg = n.body;
                    if (!this._proxy.belong) {
                        //当前未显示归属者时
                        this._proxy.belong = msg;
                        facade.showView("03" /* Scene */, "02" /* Belong */, msg);
                    }
                };
                //-----------------------------------归属者-------------------------------
                //-----------------------------------伤害-------------------------------
                BigBossHpMdr.prototype.onClickDamage = function () {
                    this._showList = !this._showList;
                    this.updateDamage();
                };
                BigBossHpMdr.prototype.onDamageUpdate = function (n) {
                    var msg = n.body;
                    if (this._rankInfo) {
                        console.error("场景存在排行榜时，不需要下发伤害！！！");
                        this._view.grp_damage.visible = false;
                        return;
                    }
                    this._view.grp_damage.visible = true;
                    this._damageInfo = msg;
                    this.updateDamage();
                };
                BigBossHpMdr.prototype.updateDamage = function () {
                    this._view.currentState = this._showList ? "2" : "1";
                    var info = this._damageInfo;
                    if (!info) {
                        return;
                    }
                    if (this._showList) {
                        var damageList = info.damage_list && info.damage_list.length ? info.damage_list : [];
                        damageList.sort(this.sortDamage);
                        this._damageList.source = damageList;
                    }
                    else {
                        var allDamage = Long.fromValue(0);
                        var perDamage = Long.fromValue(0);
                        if (info.damage_list && info.damage_list.length) {
                            for (var _i = 0, _a = info.damage_list; _i < _a.length; _i++) {
                                var i = _a[_i];
                                allDamage = allDamage.add(i.damage);
                                perDamage = perDamage.add(i.damage_s);
                            }
                        }
                        var damageStr = game.getLanById("all_damage" /* all_damage */) + "：" + game.StringUtil.getHurtNumStr(allDamage.toNumber()); //总伤害：
                        this._view.lab_allDamage.text = damageStr;
                        this._view.lab_perDamage.text = game.StringUtil.getHurtNumStr(perDamage.toNumber()) + "/" + game.getLanById("shijian_4" /* shijian_4 */);
                    }
                };
                BigBossHpMdr.prototype.sortDamage = function (a, b) {
                    var aRole = a.index.eq(game.RoleVo.ins.role_id) ? 0 : 1;
                    var bRole = b.index.eq(game.RoleVo.ins.role_id) ? 0 : 1;
                    if (aRole != bRole) {
                        return aRole - bRole;
                    }
                    var aCfg = game.getConfigByNameId("shenling.json" /* Shenling */, a.index.toNumber());
                    var aType = aCfg ? game.ShenLingTypeAry.indexOf(aCfg.type) : 0;
                    var bCfg = game.getConfigByNameId("shenling.json" /* Shenling */, b.index.toNumber());
                    var bType = bCfg ? game.ShenLingTypeAry.indexOf(bCfg.type) : 0;
                    if (aType != bType) {
                        return aType - bType;
                    }
                    return a.index.toNumber() - b.index.toNumber();
                };
                return BigBossHpMdr;
            }(game.MdrBase));
            scene.BigBossHpMdr = BigBossHpMdr;
            __reflect(BigBossHpMdr.prototype, "game.mod.scene.BigBossHpMdr", ["base.UpdateItem"]);
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var Tween = base.Tween;
            var Handler = base.Handler;
            var ChallengeTipsMdr = /** @class */ (function (_super) {
                __extends(ChallengeTipsMdr, _super);
                function ChallengeTipsMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", scene.ChallengeTipsView);
                    return _this;
                }
                ChallengeTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.top = 335;
                    this._view.touchEnabled = false;
                };
                ChallengeTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateLv();
                };
                ChallengeTipsMdr.prototype.onHide = function () {
                    Tween.remove(this._view);
                    _super.prototype.onHide.call(this);
                };
                ChallengeTipsMdr.prototype.updateLv = function () {
                    var lv = this._showArgs;
                    var curStr = "第" + lv + "层";
                    this.addBmpFont(curStr, game.BmpTextCfg[206 /* Layer */], this._view.grp_lv, true, 1, true);
                    Tween.remove(this._view);
                    Tween.get(this._view)
                        .delay(1000)
                        .exec(Handler.alloc(this, this.hide));
                };
                return ChallengeTipsMdr;
            }(game.EffectMdrBase));
            scene.ChallengeTipsMdr = ChallengeTipsMdr;
            __reflect(ChallengeTipsMdr.prototype, "game.mod.scene.ChallengeTipsMdr");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var EnemyMdr = /** @class */ (function (_super) {
                __extends(EnemyMdr, _super);
                function EnemyMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", scene.EnemyView);
                    _this.isEasyHide = true;
                    return _this;
                }
                EnemyMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = scene.EnemyItem;
                    this._view.list_item.dataProvider = this._itemList;
                    this._proxy = this.retProxy(2 /* Scene */);
                };
                EnemyMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                    this.onNt("on_display_add" /* ON_OBJ_ADD */, this.onObjAdd, this);
                    this.onNt("on_display_del" /* ON_OBJ_DEL */, this.onObjDel, this);
                };
                EnemyMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateEnemy();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                EnemyMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                EnemyMdr.prototype.onObjAdd = function (n) {
                    this.updateEnemy();
                };
                EnemyMdr.prototype.onObjDel = function (n) {
                    this.updateEnemy();
                };
                /**更新附近敌人*/
                EnemyMdr.prototype.updateEnemy = function () {
                    var enemies = this._proxy.getEnemyVos(1 /* PLAYER */); //获取所有敌对玩家
                    if (this._itemList.source.length) {
                        this._itemList.replaceAll(enemies);
                    }
                    else {
                        this._itemList.source = enemies;
                    }
                };
                /**更新敌人血量*/
                EnemyMdr.prototype.updateEnemyHp = function () {
                    if (!this._view.list_item.numChildren || !this._itemList.source.length) {
                        return;
                    }
                    var len = this._view.list_item.numChildren;
                    for (var i = 0; i < len; ++i) {
                        var item = this._view.list_item.getChildAt(i);
                        var data = item.data;
                        var vo = this._proxy.getVoById(data.entity_id);
                        if (!vo) {
                            continue;
                        }
                        item.updateEnemyHp(vo.percent);
                    }
                };
                EnemyMdr.prototype.update = function (time) {
                    this.updateEnemyHp();
                };
                return EnemyMdr;
            }(game.MdrBase));
            scene.EnemyMdr = EnemyMdr;
            __reflect(EnemyMdr.prototype, "game.mod.scene.EnemyMdr", ["base.UpdateItem"]);
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var Tween = base.Tween;
            var Elastic = base.Elastic;
            var Handler = base.Handler;
            var PvpFightEnterMdr = /** @class */ (function (_super) {
                __extends(PvpFightEnterMdr, _super);
                function PvpFightEnterMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", scene.PvpFightView);
                    _this.HP_WIDTH = 150; //血条宽度
                    _this.GRP_POS10 = [-50, 478];
                    _this.GRP_POS11 = [30, 478];
                    _this.GRP_POS20 = [407, 708];
                    _this.GRP_POS21 = [331, 708];
                    _this.GRP_Y30 = 574;
                    return _this;
                }
                PvpFightEnterMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(2 /* Scene */);
                };
                PvpFightEnterMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                };
                PvpFightEnterMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateSelf();
                    this.updateEnemy();
                    this.showTween();
                    this.removeEft();
                    this.addEftByParent("startfighting" /* StartFighting */, this._view.gr_eft2);
                };
                PvpFightEnterMdr.prototype.onHide = function () {
                    this._curEnemyVo = null;
                    Tween.remove(this._view.grp1);
                    Tween.remove(this._view.grp2);
                    Tween.remove(this._view.grp3);
                    this.sendNt("pvp_enter_end" /* PVP_ENTER_END */);
                    _super.prototype.onHide.call(this);
                };
                /**更新自己*/
                PvpFightEnterMdr.prototype.updateSelf = function () {
                    var vo = game.RoleVo.ins;
                    this._view.lab_name1.text = vo.name;
                    this._view.powerLabel1.setPowerValue(vo.showpower);
                    this._view.head1.updateShow(vo.head, vo.head_frame, vo.sex, vo.vip_lv);
                    this._view.img_hp1.width = this.HP_WIDTH;
                };
                /**更新敌人*/
                PvpFightEnterMdr.prototype.updateEnemy = function () {
                    this._curEnemyVo = this._showArgs;
                    if (!this._curEnemyVo) {
                        return;
                    }
                    var vo = this._curEnemyVo;
                    this._view.lab_name2.text = vo.name;
                    this._view.powerLabel2.setPowerValue(vo.showpower);
                    this._view.head2.updateShow(vo.head, vo.head_frame, vo.sex); //todo,vip
                    this._view.img_hp2.width = this.HP_WIDTH;
                };
                PvpFightEnterMdr.prototype.showTween = function () {
                    var _this = this;
                    this._view.grp1.visible = false;
                    this._view.grp1.x = this.GRP_POS10[0];
                    this._view.grp1.y = this.GRP_POS10[1];
                    var posX1 = this.GRP_POS11[0];
                    Tween.get(this._view.grp1)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp1.visible = true;
                    }))
                        .to({ x: posX1 }, 500, null, Elastic.easeOut);
                    this._view.grp2.visible = false;
                    this._view.grp2.x = this.GRP_POS20[0];
                    this._view.grp2.y = this.GRP_POS20[1];
                    var posX2 = this.GRP_POS21[0];
                    Tween.get(this._view.grp2)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp2.visible = true;
                    }))
                        .to({ x: posX2 }, 500, null, Elastic.easeOut);
                    this._view.grp3.alpha = 0;
                    this._view.grp3.y = this.GRP_Y30;
                    Tween.get(this._view.grp3)
                        .to({ alpha: 1 }, 200)
                        .delay(1000)
                        .exec(Handler.alloc(this, function () {
                        _this.hide();
                    }));
                };
                return PvpFightEnterMdr;
            }(game.EffectMdrBase));
            scene.PvpFightEnterMdr = PvpFightEnterMdr;
            __reflect(PvpFightEnterMdr.prototype, "game.mod.scene.PvpFightEnterMdr");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var TimeMgr = base.TimeMgr;
            var facade = base.facade;
            var delayCall = base.delayCall;
            var clearDelay = base.clearDelay;
            var Handler = base.Handler;
            var PvpFightMdr = /** @class */ (function (_super) {
                __extends(PvpFightMdr, _super);
                function PvpFightMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", scene.PvpFightView);
                    _this.HP_WIDTH = 150; //血条宽度
                    _this._showEnter = false; //弹入场动画
                    _this.DELAY_TICK = 2000; //延迟2秒弹窗
                    return _this;
                }
                PvpFightMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(2 /* Scene */);
                };
                PvpFightMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                    this.onNt("on_display_add" /* ON_OBJ_ADD */, this.onObjAdd, this);
                    this.onNt("pvp_enter_end" /* PVP_ENTER_END */, this.onPvpEnterEnd, this);
                };
                PvpFightMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.visible = false; //默认隐藏
                    this.updateSelf();
                    this.updateEnemy();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.removeEft();
                    this._view.img_vs.visible = false;
                    this._view.gr_eft2.visible = false;
                    this.addEftByParent("VS" /* VS */, this._view.gr_eft);
                };
                PvpFightMdr.prototype.onHide = function () {
                    this._curEnemyVo = null;
                    this._showEnter = false;
                    this.clearDelayEnter();
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                PvpFightMdr.prototype.onObjAdd = function (n) {
                    this.updateEnemy();
                };
                /**更新自己*/
                PvpFightMdr.prototype.updateSelf = function () {
                    var vo = game.RoleVo.ins;
                    this._view.lab_name1.text = vo.name;
                    this._view.powerLabel1.setPowerValue(vo.showpower);
                    this._view.head1.updateShow(vo.head, vo.head_frame, vo.sex, vo.vip_lv);
                    this.updateSelfHp();
                };
                /**更新自己血量*/
                PvpFightMdr.prototype.updateSelfHp = function () {
                    var vo = this._proxy.mainPlayerVo;
                    var percent = vo ? vo.percent : 0;
                    this._view.img_hp1.width = percent / 10000 * this.HP_WIDTH;
                };
                /**更新敌人*/
                PvpFightMdr.prototype.updateEnemy = function () {
                    var _this = this;
                    var enemies = this._proxy.getEnemyVos(1 /* PLAYER */); //获取所有敌对玩家
                    this._curEnemyVo = enemies && enemies.length ? enemies[0] : null; //取第一个敌人
                    if (!this._curEnemyVo) {
                        return;
                    }
                    this._proxy.foeTargetId = this._curEnemyVo.entity_id; //设置攻击目标
                    if (!this._showEnter) {
                        this.clearDelayEnter();
                        this._delayEnter = delayCall(Handler.alloc(this, function () {
                            facade.showView("03" /* Scene */, "07" /* PvpFightEnter */, _this._curEnemyVo);
                        }), this.DELAY_TICK);
                        this._showEnter = true;
                    }
                    var vo = this._curEnemyVo;
                    this._view.lab_name2.text = vo.name;
                    this._view.powerLabel2.setPowerValue(vo.showpower);
                    this._view.head2.updateShow(vo.head, vo.head_frame, vo.sex, vo.vip_lv);
                    this.updateEnemyHp();
                };
                /**更新敌人血量*/
                PvpFightMdr.prototype.updateEnemyHp = function () {
                    var percent = 0;
                    if (this._curEnemyVo) {
                        var vo = this._proxy.getVoById(this._curEnemyVo.entity_id);
                        percent = vo ? vo.percent : 0;
                    }
                    this._view.img_hp2.width = percent / 10000 * this.HP_WIDTH;
                };
                PvpFightMdr.prototype.update = function (time) {
                    this.updateSelfHp();
                    this.updateEnemyHp();
                };
                PvpFightMdr.prototype.onPvpEnterEnd = function () {
                    this._view.visible = true; //显示
                };
                PvpFightMdr.prototype.clearDelayEnter = function () {
                    if (this._delayEnter) {
                        clearDelay(this._delayEnter);
                        this._delayEnter = null;
                    }
                };
                return PvpFightMdr;
            }(game.EffectMdrBase));
            scene.PvpFightMdr = PvpFightMdr;
            __reflect(PvpFightMdr.prototype, "game.mod.scene.PvpFightMdr", ["base.UpdateItem"]);
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene) {
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var Handler = base.Handler;
            var facade = base.facade;
            var RoleReviveMdr = /** @class */ (function (_super) {
                __extends(RoleReviveMdr, _super);
                function RoleReviveMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", scene.RoleReviveView);
                    _this._reliveEndTime = 0;
                    return _this;
                }
                RoleReviveMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._view.lab_btn.text = game.getLanById("revive_now" /* revive_now */);
                    this._view.lab_tips.text = game.getLanById("revive_tips2" /* revive_tips2 */);
                };
                RoleReviveMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btnRelife, TouchEvent.TOUCH_TAP, this.onBtnRelive);
                    this.onNt("on_role_relive" /* ON_ROLE_RELIVE */, this.hide, this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                };
                RoleReviveMdr.prototype.updateKillName = function (name) {
                    if (name && name.trim() != "") {
                        this._view.lab_killBy.text = game.StringUtil.substitute(game.getLanById("kill_by" /* kill_by */), [name]);
                    }
                    else {
                        this._view.lab_killBy.text = "";
                    }
                };
                RoleReviveMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this.updateKillName(this._showArgs.from_entity_name);
                    this._reliveEndTime = +this._showArgs.relife_time | 0;
                    this._view.gr_btn.visible = this._showArgs.items.idx != undefined;
                    if (this._showArgs.items) {
                        var propCfg = game.getConfigByNameId("prop.json" /* Prop */, this._showArgs.items.idx.toNumber());
                        if (propCfg) {
                            this._view.img_icon.source = game.ResUtil.getUiProp(propCfg.icon);
                        }
                        this._view.lab_cnt.text = this._showArgs.items.cnt + "";
                    }
                    TimeMgr.addUpdateItem(this, 1000);
                    this.setTimeDown(TimeMgr.time.serverTimeSecond);
                };
                RoleReviveMdr.prototype.onBtnRelive = function () {
                    if (!this._showArgs || !this._showArgs.items.idx) {
                        return;
                    }
                    var msg = this._showArgs;
                    var propCfg = game.getConfigByNameId("prop.json" /* Prop */, msg.items.idx.toNumber());
                    var content = game.StringUtil.substitute(game.getLanById("revive_tips" /* revive_tips */) + "\n\n", [msg.items.cnt, propCfg.name]);
                    mod.ViewMgr.getIns().showConfirm(content, Handler.alloc(this, this.reliveRole));
                };
                RoleReviveMdr.prototype.reliveRole = function () {
                    if (!this._showArgs || !this._showArgs.items.idx) {
                        return;
                    }
                    if (mod.BagUtil.checkPropCntUp(this._showArgs.items.idx.toNumber(), this._showArgs.items.cnt)) {
                        var p = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                        p.battle_role_relife_c2s();
                    }
                };
                RoleReviveMdr.prototype.onHide = function () {
                    this._reliveEndTime = 0;
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                RoleReviveMdr.prototype.update = function (time) {
                    this.setTimeDown(time.serverTimeSecond);
                };
                RoleReviveMdr.prototype.setTimeDown = function (time) {
                    var t = this._reliveEndTime - time;
                    // let sec = TimeUtil.formatSecond(Math.max(t, 0), "ss");
                    this.addBmpFont(t.toString(), game.BmpTextCfg[123 /* ReviveNum */], this._view.gr_time, true, 1, true);
                    if (t <= 0) {
                        // TimeMgr.removeUpdateItem(this);
                        this.hide();
                    }
                };
                return RoleReviveMdr;
            }(game.EffectMdrBase));
            scene.RoleReviveMdr = RoleReviveMdr;
            __reflect(RoleReviveMdr.prototype, "game.mod.scene.RoleReviveMdr");
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var scene;
        (function (scene_1) {
            var Scene = game.scene.Scene;
            var MapData = game.scene.MapData;
            var facade = base.facade;
            var Point = egret.Point;
            var Pool = base.Pool;
            var BaseSceneCtrl = game.scene.BaseSceneCtrl;
            var MainGPlayer = game.scene.MainGPlayer;
            var MoveAct = game.scene.MoveAct;
            var GDirUtil = game.utils.GDirUtil;
            var BaseActor = game.scene.BaseActor;
            var Handler = base.Handler;
            var SkillEffectVo = game.scene.SkillEffectVo;
            var ObjectCls = game.scene.ObjectCls;
            var SceneTools = game.scene.SceneTools;
            var delayCall = base.delayCall;
            var clearDelay = base.clearDelay;
            var AttackAct = game.scene.AttackAct;
            var TimeMgr = base.TimeMgr;
            var Tween = base.Tween;
            var PetObjectCls = game.scene.PetObjectCls;
            var OptimalPath = game.scene.OptimalPath;
            var MOVE_AMEND_DIS = game.scene.MOVE_AMEND_DIS;
            var STxtMgr = game.scene.STxtMgr;
            var TriggerVo = game.scene.TriggerVo;
            var MonsterVo = game.scene.MonsterVo;
            var SceneMdr = /** @class */ (function (_super) {
                __extends(SceneMdr, _super);
                function SceneMdr() {
                    var _this = _super.call(this, null) || this;
                    _this._bezierPosArr = [];
                    _this._idx = 0;
                    _this._timeOut = 0;
                    _this._focusPt = Pool.alloc(Point);
                    _this.dbgTime = 0;
                    _this.dbgCount = 0;
                    _this.fps = 0;
                    _this.fpsCount = 0;
                    _this.onInit();
                    _this.addListeners();
                    return _this;
                }
                SceneMdr.prototype.onInit = function () {
                    var self = this;
                    self._scene = Pool.alloc(Scene);
                    self._proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                    self._model = self._proxy.getModel();
                    self._model.scene = self._scene;
                };
                SceneMdr.prototype.addMainPlayer = function (vo) {
                    var self = this;
                    if (!self._mainPlayer) {
                        var obj = Pool.alloc(MainGPlayer);
                        obj.vo = vo;
                        self._model.mainPlayer = self._mainPlayer = obj;
                        //obj.setShowShadow(this._scene.sceneType != SceneType.HangUp2);
                        obj.setShowShadow(false);
                        self._scene.addObj(self._mainPlayer);
                    }
                    else {
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
                    if (mod.SceneUtil.isPvpScene()) {
                        this._scene.setMapCenterFocus(); // 设置相机焦点为地图中间
                        //PVP场景不加AI，服务端控制
                        //this.sendNt(SceneEvent.ON_ADD_PLAYER_AI);
                    }
                    else {
                        self.sendNt("on_add_player_ai" /* ON_ADD_PLAYER_AI */);
                        var atk_delay = mod.SceneUtil.atkDelay();
                        if (atk_delay > 0) {
                            mod.SceneUtil.requestControlAI(1 /* Stop */);
                            if (self._model.mainAi) {
                                self._model.mainAi.stopAtk();
                            }
                            delayCall(Handler.alloc(self, function () {
                                if (self._model.mainAi) {
                                    self._model.mainAi.startAtk();
                                }
                            }), atk_delay * 10);
                        }
                        else {
                            if (self._model.mainAi) {
                                self._model.mainAi.startAtk();
                            }
                        }
                    }
                    TimeMgr.addUpdateItem(self);
                    return self._mainPlayer;
                };
                SceneMdr.prototype.clearMainPlayer = function () {
                    var self = this;
                    if (self._mainPlayer && self._mainPlayer.parent) {
                        self._mainPlayer.dispose();
                    }
                    self.clearMainPlayerAi();
                    self._model.mainPlayer = self._mainPlayer = null;
                    MainGPlayer.delIns();
                    self._scene.isAddedMain = false;
                    TimeMgr.removeUpdateItem(self);
                };
                SceneMdr.prototype.clearMainPlayerAi = function () {
                    var self = this;
                    if (self._model.mainAi && self._mainPlayer) {
                        self._mainPlayer.remove(self._model.mainAi);
                        self._model.mainAi = null;
                    }
                };
                SceneMdr.prototype.testBezierMove = function () {
                    var self = this;
                    if (self._idx == 0) {
                        self._starP = new Point(self._mainPlayer.x, self._mainPlayer.y);
                        self._midP = new Point(self._mainPlayer.x + 200, self._mainPlayer.y - 100);
                        self._endP = new Point(self._mainPlayer.x + 400, self._mainPlayer.y);
                    }
                    var arr = [];
                    if (self._idx % 2 == 0) {
                        arr.push(self._starP, self._midP, self._endP);
                    }
                    else {
                        arr.push(self._endP, self._midP, self._starP);
                    }
                    self._idx++;
                    self._bezierPosArr = game.BezierUtil.getBezierPos(arr, 10);
                    self.moveBezierPoint();
                };
                SceneMdr.prototype.moveBezierPoint = function () {
                    var self = this;
                    if (!self._bezierPosArr || self._bezierPosArr.length == 0) {
                        Tween.remove(self._mainPlayer);
                        return;
                    }
                    var s = self._bezierPosArr.shift();
                    Tween.get(self._mainPlayer).to({ x: s.x, y: s.y }, 200, Handler.alloc(self, function (obj) {
                    }, [this._mainPlayer])).exec(Handler.alloc(self, self.moveBezierPoint));
                };
                SceneMdr.prototype.update = function (time) {
                    var self = this;
                    if (DEBUG) {
                        self.debugSceneMove();
                    }
                    if (self.fpsTime != TimeMgr.time.serverTimeSecond) {
                        self.checkFps();
                        self.fps = 0;
                        self.fpsTime = TimeMgr.time.serverTimeSecond;
                    }
                    self.fps++;
                };
                SceneMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var self = this;
                    var addEventListener = self.onEgret.bind(self);
                    self.onNt("on_resize" /* ON_RESIZE */, self.onStageResize, self);
                    self.onNt("clean_scene" /* CLEAN_SCENE */, self.onCleanScene, self);
                    self.onNt("scene_cfg_loaded" /* SCENE_CFG_LOADED */, self.onCfgLoaded, self);
                    self.onNt("scene_blur_loaded" /* SCENE_BLUR_LOADED */, self.onBlurLoaded, self);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.playCSE, this);
                    self.onNt("on_display_add" /* ON_OBJ_ADD */, self.onObjAdd, self);
                    self.onNt("on_display_del" /* ON_OBJ_DEL */, self.onObjDel, self);
                    self.onNt("on_display_update" /* ON_OBJ_UPDATE */, self.onObjUpdate, self);
                    self.onNt("on_obj_move" /* ON_OBJ_MOVE */, self.onObjMove, self);
                    self.onNt("on_obj_use_skill" /* ON_OBJ_USE_SKILL */, self.onObjUseSkill, self);
                    self.onNt("on_skill_buff" /* ON_SKILL_BUFF */, self.onObjSkillBuff, self);
                    self.onNt("on_find_monster" /* ON_FIND_MONSTER */, self.onFindMonster, self);
                    self.onNt("on_control_main_player_move" /* ON_CONTROL_MAIN_PLAYER_MOVE */, self.onControlMainPlayerMove, self);
                    self.onNt("on_main_player_move" /* ON_MAIN_PLAYER_MOVE */, self.onMainPlayerMove, self);
                    self.onNt("set_hang_up" /* SET_HANG_UP */, self.onSetHangUp, self);
                    self.onNt("on_scene_shake" /* ON_SCENE_SHAKE */, self.onSceneShake, self);
                    this.onNt("on_skill_text_show" /* ON_SKILL_TEXT_SHOW */, this.onSkillTextShow, this);
                    this.onNt("on_skill_text_show2" /* ON_SKILL_TEXT_SHOW2 */, this.onSkillTextShow2, this);
                    this.onNt("on_skill_buf_show" /* ON_SKILL_BUF_SHOW */, this.onObjSkillBuffShow, this);
                    self.onNt("bezaier_start_move" /* BEZAIER_START_MOVE */, self.testBezierMove, self);
                    this.onNt("foe_target_change" /* FOE_TARGET_CHANGE */, this.onFoeTargetChange, this); //切换攻击目标
                    addEventListener(self._scene.dispatcher, "on_boss_hp" /* ON_BOSS_HP */, self.onBossHpChanged);
                    addEventListener(self._scene.dispatcher, "on_npc_camp" /* ON_NPC_CAMP */, self.onNpcCampChanged);
                    addEventListener(self._scene.dispatcher, "on_main_move" /* ON_MAIN_MOVE */, self.sendMainPlayerMove);
                    addEventListener(self._scene.dispatcher, "on_request_monster" /* ON_REQUEST_MONSTER */, self.requestMonster);
                    this.onNt("on_activate" /* ON_ACTIVATE */, this.onActivate, this);
                    this.onNt("on_deactivate" /* ON_DEACTIVATE */, this.onDeactivate, this);
                    if (DEBUG) {
                        self.onNt("ON_SCENE_DEBUG_MOVE" /* ON_SCENE_DEBUG_MOVE */, self.updateSceneDebugMove, self);
                    }
                };
                SceneMdr.prototype.onActivate = function (e) {
                    this.clearDropItems();
                };
                SceneMdr.prototype.clearDropItems = function () {
                    this._proxy.clearSceneDropDatas();
                    this._scene.clearDropItems();
                };
                SceneMdr.prototype.onDeactivate = function (e) {
                    this.clearDropItems();
                };
                /**
                 * 通知玩家移动
                 * @param n
                 */
                SceneMdr.prototype.onMainPlayerMove = function (n) {
                    var self = this;
                    var msg = n.body;
                    if (self._model.mainAi)
                        self._model.mainAi.stopHandUp();
                    if (msg.monsterIndex) {
                        this._mainPlayer.vo.target_idx = msg.monsterIndex;
                    }
                    self.moveMainPlayer(msg.x, msg.y, msg.moveType, msg.handler, msg.isOptPath, msg.dis);
                };
                /**
                 * 玩家移动
                 * @param endX
                 * @param endY
                 * @param moveType
                 * @param cb
                 * @param isOptPath
                 * @param dis
                 */
                SceneMdr.prototype.moveMainPlayer = function (endX, endY, moveType, cb, isOptPath, dis) {
                    if (!MapData.ins.isPointLegal(endX, endY)) {
                        if (DEBUG) {
                            console.warn("moveMainPlayer：目标点出屏幕外, ai停止 " + endX + " " + endY);
                        }
                        this._model.mainAi && this._model.mainAi.startHangUp();
                        return;
                    }
                    var player = this._mainPlayer;
                    if (!player) {
                        if (DEBUG) {
                            console.warn("moveMainPlayer：no Player, ai停止");
                        }
                        this._model.mainAi.startHangUp();
                        return;
                    }
                    var curAct = player.actMgr.curAct;
                    if (curAct instanceof MoveAct && (curAct.endTile.x == endX && curAct.endTile.y == endY || curAct.moveType == 6 /* Jump */)) {
                        //目标点一样和当前是跳跃return
                        return;
                    }
                    var path;
                    if (dis) {
                        path = Scene.findAtkPath(player.vo.x, player.vo.y, endX, endY, dis);
                    }
                    else {
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
                        var optPath = OptimalPath.getPath(path[0], path[path.length - 1], this._scene.mapId);
                        if (optPath && optPath.length > 1) {
                            path = optPath;
                        }
                    }
                    player.movePath(path, cb, moveType);
                };
                SceneMdr.prototype.onControlMainPlayerMove = function (n) {
                    if (!this._mainPlayer) {
                        return;
                    }
                    var dir = n.body;
                    var x = this._mainPlayer.vo.x;
                    var y = this._mainPlayer.vo.y;
                    var lastX = x;
                    var lastY = y;
                    if (dir == 3 /* RIGHT */ || dir == 4 /* RIGHT_DOWN */ || dir == 2 /* RIGHT_UP */) {
                        if (MapData.ins.isPointLegal(x + 1, y)) {
                            lastX = x + 1;
                        }
                    }
                    if (dir == 7 /* LEFT */ || dir == 6 /* LEFT_DOWN */ || dir === 8 /* LEFT_UP */) {
                        if (MapData.ins.isPointLegal(x - 1, y)) {
                            lastX = x - 1;
                        }
                    }
                    if (dir == 1 /* UP */ || dir == 2 /* RIGHT_UP */ || dir == 8 /* LEFT_UP */) {
                        if (MapData.ins.isPointLegal(x, y - 1)) {
                            lastY = y - 1;
                        }
                    }
                    if (dir == 5 /* DOWN */ || dir == 6 /* LEFT_DOWN */ || dir == 4 /* RIGHT_DOWN */) {
                        if (MapData.ins.isPointLegal(x, y + 1)) {
                            lastY = y + 1;
                        }
                    }
                    this.moveMainPlayer(lastX, lastY);
                };
                /// 血条更新///
                SceneMdr.prototype.onBossHpChanged = function (e) {
                    if (mod.SceneUtil.isSceneType(129 /* KuafuDoufa */) || mod.SceneUtil.isSceneType(130 /* XianjieLuandou */)) {
                        // DEBUG && console.log(`onBossHpChanged，过滤的场景类型：`, this._proxy.curSceneType);
                        this.sendNt("on_boss_hp_filter" /* ON_BOSS_HP_FILTER */, e ? e.data : null); //抛出给过滤的场景监听使用
                        return; //跨服斗法不弹boss血条，走自己界面显示
                    }
                    var msg = e.data;
                    if (msg.percent > 0 && !this._proxy.curBossId) {
                        //血量大于0且之前不在挑战boss状态
                        facade.showView("03" /* Scene */, "01" /* BigBossHp */, msg);
                    }
                    else {
                        this.sendNt("on_boss_hp" /* ON_BOSS_HP */, msg); //发送事件，在BigBossHpMdr里面监听
                    }
                };
                /// 血条更新end///
                SceneMdr.prototype.onNpcCampChanged = function (e) {
                    // this.sendNt(SceneEvent.ON_NPC_CAMP, e.data);
                };
                SceneMdr.prototype.requestMonster = function () {
                    var self = this;
                    var t = self._scene.sceneType;
                    self._proxy.requestMonster();
                };
                SceneMdr.prototype.moveSceneToObj = function (obj, duration, delay) {
                    if (duration === void 0) { duration = 800; }
                    if (delay === void 0) { delay = 200; }
                    if (!obj) {
                        return;
                    }
                    var self = this;
                    var cb;
                    var type = self._scene.sceneType;
                    var startObj = self._mainPlayer;
                    var startPt = self._focusPt.setTo(startObj.x, startObj.y);
                    var endPt = Pool.alloc(Point).setTo(obj.x, obj.y);
                    //
                    Tween.get(startPt).to({
                        x: endPt.x,
                        y: endPt.y
                    }, duration, Handler.alloc(self, self.updateFocus)).delay(delay).exec(cb);
                    Pool.release(endPt);
                };
                SceneMdr.prototype.updateFocus = function () {
                    this._scene.updateFocus(this._focusPt.x, this._focusPt.y);
                };
                SceneMdr.prototype.onFindMonster = function (n) {
                    var self = this;
                    var sType = this._scene.sceneType;
                    var msg = n.body;
                    if (msg.entity_id != undefined) {
                        self._proxy.foeTargetId = msg.entity_id;
                        var vo = self._proxy.getVoById(msg.entity_id);
                        if (vo) {
                            var dir = game.PointUtil.distance(self._mainPlayer.vo.x, self._mainPlayer.vo.y, vo.x, vo.y);
                            if (Math.round(dir) <= MOVE_AMEND_DIS && self._model.mainAi) {
                                self._model.mainAi.startHangUp();
                                return;
                            }
                        }
                        self._mainPlayer.vo.target_id = msg.entity_id;
                    }
                    self._mainPlayer.clearRequestStatus();
                    if (self._model.mainAi) {
                        self._model.mainAi.stopHandUp();
                    }
                    if (self._timeOut) {
                        clearDelay(self._timeOut);
                        self._timeOut = 0;
                    }
                    self.delayCallFind(msg);
                };
                SceneMdr.prototype.delayCallFind = function (msg) {
                    this.findMonster(msg.path_coords, msg.find_type);
                };
                SceneMdr.prototype.findMonster = function (pts, type) {
                    var self = this;
                    if (!pts || pts.length == 0 || !self._mainPlayer || !self._model.mainAi) {
                        return;
                    }
                    self._timeOut = 0;
                    var main = self._mainPlayer;
                    if (MapData.ins.isBlock(main.vo.x, main.vo.y)) { //容错处理，防止寻怪时人物停在了障碍点上
                        var randomPt = SceneTools.getRandomPt(main.vo.x, main.vo.y, 1, 3);
                        main.vo.x = randomPt.x;
                        main.vo.y = randomPt.y;
                        Pool.release(randomPt);
                    }
                    var moveType = 3 /* Find */;
                    var handle;
                    handle = Handler.alloc(this, this.onFindMonsterMoveEnd, [moveType]);
                    this.moveMainPlayer(pts[0].x, pts[0].y, moveType, handle, true); //这里只执行第一个点
                    if (pts.length > 1) {
                        console.info("path_coords下发了两个点，但是客户端只执行一个点");
                    }
                    //this.moveMainPlayer(pts[pts.length-1].x, pts[pts.length-1].y, moveType, handle, true);//执行最后一个点
                };
                //寻怪后
                SceneMdr.prototype.onFindMonsterMoveEnd = function (moveType) {
                    this._model.mainAi.startHangUp();
                };
                SceneMdr.prototype.sendMainPlayerMove = function (e) {
                    var msg = e.data;
                    this._proxy.doMove(msg.path, msg.mType);
                };
                SceneMdr.prototype.onObjSkillBuff = function (n) {
                    var msg = n.body;
                    if (!this._scene.isSceneReady) {
                        return;
                    }
                    var isMainPlayer = this._mainPlayer && this._mainPlayer.vo.entity_id.eq(msg.caster);
                    var attacker = isMainPlayer ? this._mainPlayer : this._scene.ctrl.getObj(msg.caster);
                    if (!attacker) {
                        return;
                    }
                };
                SceneMdr.prototype.showSkillTips = function (skillIdx) {
                    var cfg = game.SkillData.getCfg(skillIdx);
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
                };
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
                SceneMdr.prototype.onObjUseSkill = function (n) {
                    var info = n.body;
                    var msg = info.skill;
                    var scene = this._scene;
                    if (!scene.isSceneReady) {
                        return;
                    }
                    if (!msg.effect_list) {
                        return;
                    }
                    var posX = info.x;
                    var posY = info.y;
                    if (!posY || !posX) {
                        this.useSkillDirectly(msg);
                        return;
                    }
                    var isMainPlayer = this._mainPlayer && this._mainPlayer.vo.entity_id.eq(msg.caster);
                    var attacker = isMainPlayer ? this._mainPlayer : scene.ctrl.getObj(msg.caster);
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
                };
                // private moveEndUseSkillDirectly(skill: battle_use_skill) {
                //     let self = this;
                //     self.onFindMonsterMoveEnd(MoveType.Find);
                //     self.useSkillDirectly(skill);
                // }
                SceneMdr.prototype.useSkillDirectly = function (skill) {
                    var self = this;
                    var msg = skill;
                    var scene = self._scene;
                    var skillCfg = game.SkillData.getCfg(msg.skill_index);
                    if (skillCfg.type1 == 18 /* Huasheng */) {
                        //过滤化神
                        this.updateMainPlayerCD(msg);
                        //return ;
                    }
                    // isMainPlayer 表示施法者是否是主角
                    var isMainPlayer = self._mainPlayer && self._mainPlayer.vo.entity_id.eq(msg.caster);
                    var attacker = isMainPlayer ? self._mainPlayer : scene.ctrl.getObj(msg.caster);
                    if (!attacker || attacker.isDead) {
                        return;
                    }
                    var target = self._proxy.getVoById(msg.focus);
                    if (!target && skillCfg.type2 == 2 /* PassiveSkill */) {
                        //被动技能
                        this.sendNt("on_skill_text_show" /* ON_SKILL_TEXT_SHOW */, {
                            skill: skill,
                            x: msg.x,
                            y: msg.y,
                        });
                        return;
                    }
                    //主动技能瓢字
                    if (target && skillCfg.battle_figure2) {
                        this.showActiveSkillsTxt(target.entity_id, skillCfg.battle_figure2);
                    }
                    // if (!target && skillCfg.type1 != SkillType.YuLing) {
                    //     return;
                    // }
                    //主角被攻击
                    if (!isMainPlayer && msg.focus.eq(self._mainPlayer.vo.entity_id)) {
                        //玩家攻击主角
                        if (attacker.vo.type == 1 /* PLAYER */) {
                            //self.onMainBeAtk(attacker);
                        }
                        else if (attacker.vo.type == 3 /* MONSTER */) {
                            //怪物攻击主角
                            self.sendNt("on_main_player_be_monster_atk" /* ON_MAIN_PLAYER_BE_MONSTER_ATK */, attacker.vo);
                        }
                    }
                    var list = SkillEffectVo.allocList();
                    for (var _i = 0, _a = msg.effect_list; _i < _a.length; _i++) {
                        var e = _a[_i];
                        var target_1 = scene.ctrl.getObj(e.target);
                        if (target_1 == null) {
                            continue;
                        }
                        if (e.is_dead) {
                            target_1.onFatalAtk();
                        }
                        var effectVo = Pool.alloc(SkillEffectVo);
                        effectVo.target = target_1;
                        effectVo.target_id = e.target;
                        effectVo.b_value = e.b_value;
                        effectVo.is_dead = e.is_dead;
                        effectVo.push_x = e.push_x;
                        effectVo.push_y = e.push_y;
                        effectVo.skillCfg = skillCfg;
                        list.push(effectVo);
                    }
                    var targetPt = target ? Pool.alloc(Point).setTo(target.x, target.y) : Pool.alloc(Point).setTo(msg.x, msg.y);
                    var targetWorldPt = MapData.ins.getWorldPt(targetPt.x, targetPt.y, targetPt);
                    if (this._proxy.curSceneType == 106 /* HangUp2 */ && attacker.vo.camp == 1) {
                        var dir = self._mainPlayer.dir;
                        attacker.attack(msg.skill_index, msg.client_type, dir, list, targetWorldPt);
                    }
                    else {
                        var dir = GDirUtil.directionByTan2(attacker.x, attacker.y, targetPt.x, targetPt.y);
                        attacker.attack(msg.skill_index, msg.client_type, dir, list, targetWorldPt);
                    }
                    //施法者是主角，更新主句技能CD 时间
                    if (isMainPlayer) {
                        this.updateMainPlayerCD(msg);
                    }
                    //更新 仙法 仙剑 排队cd 时间
                    var skill_index = msg.skill_index;
                    if (game.SkillData.isSpecialSkill(skill_index)) {
                        var type1 = game.SkillData.getSkillType1(skill_index);
                        var ssData = game.SpecialSkillList[type1];
                        ssData.preTime = TimeMgr.time.time;
                        ssData.preSkillId = skill_index;
                    }
                    //更新其他特殊技能 排队cd时间，目前包括 神兵 坐骑 元灵
                    if (game.SkillData.isSpecialSkill2(skill_index)) {
                        game.SpecialSkillList2.preTime = TimeMgr.time.time;
                        game.SpecialSkillList2.preSkillId = skill_index;
                    }
                };
                //更新施法者是主句的技能CD
                SceneMdr.prototype.updateMainPlayerCD = function (msg) {
                    var skill = this._mainPlayer.vo.skillsMap[msg.skill_index];
                    if (skill) {
                        skill.use_time = msg.use_time;
                        skill.next_use_time = msg.next_use_time;
                    }
                };
                SceneMdr.prototype.onStageResize = function () {
                    this._scene.onStageResize();
                };
                SceneMdr.prototype.onCleanScene = function (n) {
                    var data = n.body;
                    var self = this;
                    var clearAll = data && data.clearAll;
                    if (clearAll) {
                        self.clearMainPlayer();
                    }
                    clearDelay(self._timeOut);
                    self._timeOut = 0;
                    self._proxy.resetModel();
                    if (self._model.mainAi) {
                        self._model.mainAi.stopHandUp();
                    }
                    var m = self._mainPlayer;
                    if (m) {
                        var curAct = m.actMgr.curAct;
                        if (curAct instanceof AttackAct) {
                            curAct.abort();
                        }
                        m.actMgr.removeAllActByCls(AttackAct);
                        m.checkAct();
                    }
                    self._scene.clean(clearAll);
                };
                SceneMdr.prototype.onObjMove = function (n) {
                    var _a = n.body, id = _a.id, path = _a.path, moveType = _a.moveType, moveTime = _a.moveTime;
                    if (!this._scene.isSceneReady) {
                        return;
                    }
                    var obj = this._scene.ctrl.getObj(id);
                    if (!obj) {
                        return;
                    }
                    if (moveType == 7 /* Push_Back */) {
                        obj.pushBack(path[0], moveTime);
                        return;
                    }
                    var pts = [];
                    if (moveType == 6 /* Jump */) {
                        pts.push(Pool.alloc(Point).setTo(obj.vo.x, obj.vo.y));
                    }
                    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
                        var p = path_1[_i];
                        pts.push(Pool.alloc(Point).setTo(p.x, p.y));
                    }
                    obj.movePath(pts, null, moveType, moveTime);
                };
                SceneMdr.prototype.onObjAdd = function (n) {
                    if (!this._scene.isSceneReady) {
                        return;
                    }
                    var vo = n.body;
                    var obj = this.addObj(vo);
                };
                SceneMdr.prototype.addObj = function (vo) {
                    var isMain = vo.type == 1 /* PLAYER */ && vo.role_id && game.RoleVo.ins.role_id.eq(vo.role_id);
                    if (isMain) {
                        return this.addMainPlayer(vo);
                    }
                    var cls;
                    if (vo.type == 4 /* PET */) {
                        var buddyType = vo.buddy_type;
                        cls = PetObjectCls[buddyType];
                    }
                    else {
                        cls = ObjectCls[vo.type];
                    }
                    if (!cls) {
                        return null;
                    }
                    var obj = Pool.alloc(cls);
                    obj.vo = vo;
                    if (obj instanceof BaseActor) {
                        obj.setShowShadow(false);
                        obj.setBodyIsShow(false);
                    }
                    if (obj.vo instanceof TriggerVo) {
                        obj.avatar.dsp.visible = false;
                    }
                    if (obj.vo instanceof MonsterVo) {
                        var monsterType = obj.vo.monsterType;
                        var self_1 = this;
                        if (monsterType == 2) {
                            var cfg = mod.SceneUtil.getCurSceneCfg();
                            if (cfg.boss == 1) {
                                //if(this._scene.sceneType == SceneType.HangUp2){
                                //触发boss 来袭效果
                                var isAdded_1 = false;
                                var addObjToScene = function () {
                                    if (!isAdded_1) {
                                        isAdded_1 = true;
                                        self_1._scene.addObj(obj);
                                    }
                                };
                                obj.dsp.visible = false;
                                //暂停AI
                                //SceneUtil.requestControlAI(ControlAIType.Stop);
                                if (self_1._model.mainAi) {
                                    self_1._model.mainAi.stopAtk();
                                }
                                addObjToScene();
                                //走boss 来袭流程
                                mod.PassBossTip.show(Handler.alloc(this, function () {
                                    //addObjToScene();
                                    if (obj.vo && self_1._proxy.getVoById(obj.vo.entity_id)) {
                                        obj.dsp.visible = true;
                                    }
                                }));
                                delayCall(Handler.alloc(self_1, function () {
                                    //self._proxy.requestControlAI(ControlAIType.Start);
                                    mod.SceneUtil.requestControlAI(2 /* Start */);
                                    game.LogUtil.printBattle("通知后端开打");
                                    //启动AI
                                    if (self_1._model.mainAi) {
                                        self_1._model.mainAi.startAtk();
                                    }
                                }), 2000);
                                //做的保护
                                // delayCall(Handler.alloc(this,function () {
                                //     //addObjToScene();
                                //     if(obj.vo && self._proxy.getVoById(obj.vo.entity_id)){
                                //         obj.dsp.visible = true;
                                //     }
                                // }),10000);
                            }
                            else {
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
                };
                SceneMdr.prototype.onObjDel = function (n) {
                    var delVo = n.body;
                    if (!this._scene.isSceneReady) {
                        return;
                    }
                    var proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                    this._scene.removeObj(delVo.entity_id);
                    var foeTargetId = proxy.getModel().foeTargetId;
                    if (foeTargetId && foeTargetId.eq(delVo.entity_id)) {
                        proxy.clearFoeTarget(); //被攻击目标死亡或者退出场景时，清除
                    }
                };
                /**攻击目标变更时，清除AI curTarget*/
                SceneMdr.prototype.onFoeTargetChange = function () {
                    if (!this._mainPlayer || !this._model.mainAi) {
                        return;
                    }
                    this._model.mainAi.curTarget = null;
                };
                /** 震屏 */
                SceneMdr.prototype.onSceneShake = function (n) {
                    var cfg = n.body;
                    this._scene.shake(cfg);
                };
                SceneMdr.prototype.onObjUpdate = function (n) {
                    var self = this;
                    var _a = n.body, id = _a.id, keys = _a.keys;
                    if (!self._scene.isSceneReady) {
                        return;
                    }
                    var obj = self._scene.ctrl.getObj(id);
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
                            self.sendNt("on_buff_update" /* ON_BUFF_UPDATE */);
                        }
                        if (keys.indexOf("skills") > -1) {
                            // self.sendNt(SpellEvent.ON_SKILL_DATA_UPDATE);
                        }
                    }
                };
                SceneMdr.prototype.updateAllPlayerCamp = function () {
                    var players = this._proxy.getVosByType(1 /* PLAYER */);
                    if (!players || players.length == 0) {
                        return;
                    }
                    for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
                        var p = players_1[_i];
                        var obj = this._scene.ctrl.getObj(p.entity_id);
                        if (obj) {
                            obj.onCampUpdate();
                        }
                    }
                };
                SceneMdr.prototype.playCSE = function () {
                    game.CloudEffectCtr.ins().show("scene_cloud", Handler.alloc(this, this.onCSEComp));
                };
                SceneMdr.prototype.onCSEComp = function () {
                    game.LogUtil.printLogin("场景云播放完后请求进入场景 c2s_scene_enter (第二次握手)");
                    this._proxy.confirmEnterMap();
                };
                SceneMdr.prototype.onCfgLoaded = function (n) {
                    var mapId = SceneTools.getMapIdByScene(this._proxy.curSceneIdx);
                    if (!mapId) {
                        console.log("scene onCfgLoaded mapId error!!!", "mapId = " + mapId, "sceneIndex = " + this._proxy.curSceneIdx);
                        return;
                    }
                    var data = n.body;
                    MapData.ins.setSource(data);
                    // //添加主角实体
                    // this._proxy.addMainEntity();
                    var handler = new BaseSceneCtrl();
                    var m = this._proxy;
                    m.isMapOk = true;
                    this._scene.initScene(mapId, handler, m.curSceneType, m.curSceneIdx);
                    var allVo = this._proxy.voList;
                    for (var k in allVo) {
                        var vo = allVo[k];
                        this.addObj(vo);
                    }
                    //
                    var cfg = mod.SceneUtil.getCurSceneCfg();
                    if (cfg.headline) {
                        this.showHeadline(cfg.headline);
                    }
                    else {
                        this._headLineGroup && (this._headLineGroup.alpha = 0);
                        this.sendNt("on_scene_enter" /* ON_SCENE_ENTER */);
                    }
                    if (Object.keys(allVo).length > 0 && !this._mainPlayer) {
                        return;
                    }
                };
                SceneMdr.prototype.showHeadline = function (headline) {
                    if (!this._headLineGroup) {
                        this._headLineGroup = new eui.Group();
                        this._headLineGroup.touchEnabled = false;
                        //底
                        var img = new eui.Image();
                        img.source = "scene_name_di";
                        this._headLineGroup.addChild(img);
                        img = new eui.Image();
                        img.source = headline;
                        img.name = "headline";
                        this._headLineGroup.addChild(img);
                        this._headLineGroup.x = 150;
                        this._headLineGroup.y = 200;
                        game.Layer.main.addChildAt(this._headLineGroup, 10000);
                    }
                    else {
                        var img = this._headLineGroup.getChildByName("headline");
                        img.source = headline;
                    }
                    this._headLineGroup.alpha = 1;
                    var self = this;
                    Tween.remove(this._headLineGroup);
                    Tween.get(this._headLineGroup).delay(2000).to({ alpha: 0 }, 500).exec(Handler.alloc(this, function () {
                        self.sendNt("on_scene_enter" /* ON_SCENE_ENTER */);
                        if (self._headLineGroup && game.Layer.main && game.Layer.main.removeChild) {
                            game.Layer.main.removeChild(self._headLineGroup); //移除
                            self._headLineGroup = null;
                        }
                    }));
                };
                SceneMdr.prototype.onBlurLoaded = function (n) {
                    var texture = n.body;
                    this._scene.setBlur(texture);
                };
                SceneMdr.prototype.onUpdateHangUp = function (n) {
                    var b = n.body;
                    if (b) {
                        this._model.mainAi.startHangUp();
                    }
                };
                /** 设置是否挂机 */
                SceneMdr.prototype.onSetHangUp = function (n) {
                    var open = n.body;
                    if (!this._model.mainAi)
                        return;
                    if (open) {
                        this._model.mainAi.startHangUp();
                    }
                    else {
                        this._model.mainAi.stopHandUp();
                    }
                };
                /**调试场景对象位置*/
                SceneMdr.prototype.debugSceneMove = function () {
                    if (DEBUG) {
                        if (TimeMgr.time.serverTime < this.dbgTime + 100) {
                            return;
                        }
                        this.dbgTime = TimeMgr.time.serverTime;
                        var isOpen = (gso.dbg_scene & 2) != 0;
                        if (isOpen) {
                            var model = this._proxy.getModel();
                            var keys = Object.keys(model.voList);
                            var list = [];
                            for (var i = 0, len = keys.length; i < len; i++) {
                                list.push(Long.fromValue(keys[i]));
                            }
                            if (list.length) {
                                this._proxy.scene_print_entity_c2s(list);
                            }
                        }
                        else {
                            if (this._scene.ctrl)
                                this._scene.ctrl.removeDebugAll();
                        }
                    }
                };
                SceneMdr.prototype.updateSceneDebugMove = function (n) {
                    if (DEBUG) {
                        var msg_2 = n.body;
                        var list = Object.keys(this._scene.ctrl.objDebugMap);
                        for (var i = 0, len = msg_2.print_entitys.length; i < len; i++) {
                            var entity = msg_2.print_entitys[i];
                            var key = entity.entity_id.toString();
                            var idx = list.indexOf(key);
                            var model = this._proxy.getModel();
                            var vo = model.voList[key];
                            if (idx != -1 || vo == null) {
                                game.ArrayUtil.removeAt(list, idx);
                            }
                            else {
                                var cls = void 0;
                                if (vo.type == 4 /* PET */) {
                                    cls = PetObjectCls[vo.buddy_type];
                                }
                                else {
                                    cls = ObjectCls[vo.type];
                                }
                                var obj = Pool.alloc(cls);
                                obj.vo = vo;
                                this._scene.ctrl.addDebugObj(obj);
                            }
                            var dbg_entity = this._scene.ctrl.objDebugMap[key];
                            var pt = MapData.ins.getWorldPt(entity.x, entity.y);
                            dbg_entity.setWorldPos(pt.x, pt.y);
                            dbg_entity.alpha = 0.5;
                            var real_entity = this._scene.ctrl.getObj(dbg_entity.vo.entity_id);
                            if (dbg_entity && real_entity) {
                                if (real_entity.vo.x == entity.x && real_entity.vo.y == entity.y) {
                                    dbg_entity.x = real_entity.x;
                                    dbg_entity.y = real_entity.y;
                                    dbg_entity.headMgr.alpha = 0;
                                }
                                else {
                                    dbg_entity.headMgr.alpha = 1;
                                }
                                dbg_entity.act = real_entity.act;
                                dbg_entity.dir = real_entity.dir;
                                dbg_entity.headMgr.setName("" + dbg_entity.vo.name, 65280 /* GREEN */);
                            }
                            // if (real_entity) real_entity.headMgr.setName(`${dbg_entity.vo.name}:${entity.entity_id}`, UIColor.RED);
                            Pool.release(pt);
                        }
                        if (list.length == 0)
                            return;
                        for (var i = 0, len = list.length; i < len; i++) {
                            this._scene.ctrl.removeDebugById(list[i]);
                        }
                    }
                };
                //系统设置
                SceneMdr.prototype._checkHideOtherObj = function (vo) {
                    // let objType: number = vo.type;
                    // let selfEntityId: Long = this._mainPlayer ? this._mainPlayer.vo.entity_id : null;
                    // let isPet = vo instanceof PetVo;
                    // if (objType == ObjectType.PLAYER && vo.entity_id.neq(selfEntityId)) {
                    //     return gso.isHideOtherPlayer;
                    // } else if (isPet) {
                    //     return gso.isHideOtherPartner || gso.isHideOtherPlayer;
                    // }
                    return false;
                };
                SceneMdr.prototype.refreshSettingInfo = function () {
                    var _objMap = this._scene.ctrl.getObjMap();
                    var key = Object.keys(_objMap);
                    if (key && key.length) {
                        var _obj = null;
                        var objType = null;
                        for (var _i = 0, key_1 = key; _i < key_1.length; _i++) {
                            var _k = key_1[_i];
                            _obj = _objMap[_k];
                            if (!_obj || !_obj.vo) {
                                continue;
                            }
                            objType = _obj.vo.type;
                            if (objType != 1 /* PLAYER */ && objType != 4 /* PET */) {
                                continue;
                            }
                            if (objType == 1 /* PLAYER */) {
                                this.updateOtherPlayerShow(_obj);
                            }
                            else if (objType == 4 /* PET */) {
                                this.updateOtherPartnerShow(_obj);
                            }
                        }
                    }
                };
                SceneMdr.prototype.updateOtherPartnerShow = function (obj) {
                    // if (gso.isHideOtherPartner) {
                    //     let _roleId: Long = (<PetVo>obj.vo).master_id;
                    //     if (!_roleId || this._mainPlayer.vo.entity_id.neq(_roleId)) {
                    //         if (obj.dsp.parent) obj.dsp.parent.removeChild(obj.dsp);
                    //     }
                    // } else {
                    //     if (!obj.dsp.parent) this._scene.addDsp(obj);
                    // }
                };
                SceneMdr.prototype.updateOtherPlayerShow = function (obj) {
                    var player = obj;
                    if (gso.isHideOtherPlayer) {
                        var _roleId = player.vo.role_id;
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
                    }
                    else {
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
                };
                SceneMdr.prototype.checkFps = function () {
                    var self = this;
                    // if (!SoundMgr.ins.isActivate) return;
                    if (self.fps < 15) { //长期低于15帧
                        self.fpsCount++;
                        if (self.fpsCount >= 20) { //长期指20秒
                            self.fpsCount = 0;
                            var misc = facade.retMod("04" /* Misc */).retProxy(4 /* Misc */);
                            var time = misc.getSetting("fpssetlowtime" /* FPSSetLowTime */);
                            var isCheck = true;
                            if (time) {
                                var t = Number(time);
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
                    }
                    else {
                        self.fpsCount = 0;
                    }
                };
                SceneMdr.prototype.onSkillTextShow = function (n) {
                    var altMsg = n.body;
                    if (!altMsg) {
                        return;
                    }
                    var scene = this._scene;
                    if (!scene.isSceneReady) {
                        return;
                    }
                    var msg = altMsg.skill;
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, msg.skill_index);
                    var ptyType = cfg.battle_figure;
                    var delay = cfg.delay || 250; //2000;//cfg.play_interval || 200;
                    var dir = game.MathUtil.randomDir(0 /* NONE */);
                    for (var i = 0, len = msg.effect_list ? msg.effect_list.length : 0; i < len; i++) {
                        var effect = msg.effect_list[i];
                        var target = scene.ctrl.getObj(effect.target);
                        if (!target) {
                            continue;
                        }
                        for (var j = 0, length = effect.b_value.length; j < length; j++) {
                            var v = effect.b_value[j];
                            var type = v.value_type;
                            if (effect.target == this._mainPlayer.vo.entity_id) {
                                continue;
                            }
                            else if (!altMsg.skill.caster.eq(this._mainPlayer.vo.entity_id)) {
                                continue;
                            }
                            //仙法技能强制修改了
                            if (ptyType) {
                                type = [ptyType];
                            }
                            STxtMgr.ins.show(v.value.toString(), target.x, target.y, dir, type, delay * i, target);
                        }
                    }
                };
                SceneMdr.prototype.onSkillTextShow2 = function (n) {
                    var msg = n.body;
                    var e = this._scene.ctrl.getObj(msg.entity_id);
                    if (e) {
                        var dir = game.MathUtil.randomDir(e.dir);
                        var strValue = msg.value.toString();
                        if (strValue == "0") {
                            strValue = "";
                        }
                        STxtMgr.ins.show(msg.value.toString(), e.x, e.y, dir, [msg.type], 0, e);
                    }
                    else {
                        console.log("实体 id = " + msg.entity_id + " 已被杀死，所以没瓢字");
                    }
                };
                SceneMdr.prototype.onObjSkillBuffShow = function (n) {
                    var msg = n.body;
                    var e = this._scene.ctrl.getObj(msg.entity_id);
                    if (e) {
                        var dir = game.MathUtil.randomDir(e.dir);
                        var cfg = game.getConfigByNameId("effect.json" /* Effect */, msg.effect_id);
                        if (cfg) {
                            STxtMgr.ins.show("", e.x, e.y, dir, [cfg.battle_figure], 0, e);
                        }
                    }
                };
                //主动技能瓢字
                SceneMdr.prototype.showActiveSkillsTxt = function (entity_id, hurtType) {
                    var e = this._scene.ctrl.getObj(entity_id);
                    if (e) {
                        var dir = game.MathUtil.randomDir(e.dir);
                        STxtMgr.ins.show("", e.x, e.y, dir, [hurtType], 0, e);
                    }
                };
                return SceneMdr;
            }(game.MdrBase));
            scene_1.SceneMdr = SceneMdr;
            __reflect(SceneMdr.prototype, "game.mod.scene.SceneMdr", ["base.UpdateItem"]);
        })(scene = mod.scene || (mod.scene = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=scene.js.map