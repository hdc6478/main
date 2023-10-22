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
        var boss;
        (function (boss) {
            var c2s_new_vip_boss_enter = msg.c2s_new_vip_boss_enter;
            var s2c_new_vip_boss_info = msg.s2c_new_vip_boss_info;
            var c2s_new_vip_boss_sweep = msg.c2s_new_vip_boss_sweep;
            var c2s_new_multiple_boss_challenge = msg.c2s_new_multiple_boss_challenge;
            var c2s_new_multiple_boss_info = msg.c2s_new_multiple_boss_info;
            var s2c_new_multiple_boss_list = msg.s2c_new_multiple_boss_list;
            var TimeMgr = base.TimeMgr;
            var facade = base.facade;
            var c2s_single_boss_sweep = msg.c2s_single_boss_sweep;
            var c2s_single_boss_enter = msg.c2s_single_boss_enter;
            var s2c_single_boss_info = msg.s2c_single_boss_info;
            var c2s_new_cross_boss_challenge = msg.c2s_new_cross_boss_challenge;
            var c2s_new_cross_boss_hurt_reward = msg.c2s_new_cross_boss_hurt_reward;
            var s2c_new_cross_boss = msg.s2c_new_cross_boss;
            var c2s_new_cross_boss_buy_count = msg.c2s_new_cross_boss_buy_count;
            var s2c_new_cross_boss_scene = msg.s2c_new_cross_boss_scene;
            var s2c_new_cross_boss_hurt_reward = msg.s2c_new_cross_boss_hurt_reward;
            var s2c_new_cross_boss_roll_point = msg.s2c_new_cross_boss_roll_point;
            var c2s_new_cross_boss = msg.c2s_new_cross_boss;
            var c2s_zhuimo_open_ui = msg.c2s_zhuimo_open_ui;
            var c2s_zhuimo_boss_challenge = msg.c2s_zhuimo_boss_challenge;
            var c2s_zhuimo_boss_info = msg.c2s_zhuimo_boss_info;
            var c2s_zhuimo_show_reward = msg.c2s_zhuimo_show_reward;
            var c2s_zhuimo_army_ui_show = msg.c2s_zhuimo_army_ui_show;
            var c2s_zhuimo_army_oper = msg.c2s_zhuimo_army_oper;
            var s2c_zhuimo_boss_info_ret = msg.s2c_zhuimo_boss_info_ret;
            var s2c_zhuimo_update_date = msg.s2c_zhuimo_update_date;
            var s2c_zhuimo_open_ui_ret = msg.s2c_zhuimo_open_ui_ret;
            var s2c_zhuimo_show_reward_ret = msg.s2c_zhuimo_show_reward_ret;
            var s2c_zhuimo_boss_roll_point = msg.s2c_zhuimo_boss_roll_point;
            var s2c_zhuimo_army_ui_show = msg.s2c_zhuimo_army_ui_show;
            var s2c_zhuimo_update_buff_info = msg.s2c_zhuimo_update_buff_info;
            var s2c_new_cross_boss_ranks_list = msg.s2c_new_cross_boss_ranks_list;
            var Handler = base.Handler;
            var BossProxy = /** @class */ (function (_super) {
                __extends(BossProxy, _super);
                function BossProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                BossProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new boss.BossModel();
                    this.onProto(s2c_new_vip_boss_info, this.s2c_new_vip_boss_info, this);
                    this.onProto(s2c_new_multiple_boss_list, this.s2c_new_multiple_boss_list, this);
                    this.onProto(s2c_single_boss_info, this.s2c_single_boss_info, this);
                    this.onProto(s2c_new_cross_boss, this.s2c_new_cross_boss, this);
                    this.onProto(s2c_new_cross_boss_scene, this.s2c_new_cross_boss_scene, this);
                    this.onProto(s2c_new_cross_boss_hurt_reward, this.s2c_new_cross_boss_hurt_reward, this);
                    this.onProto(s2c_new_cross_boss_roll_point, this.s2c_new_cross_boss_roll_point, this);
                    this.onProto(s2c_new_cross_boss_ranks_list, this.s2c_new_cross_boss_ranks_list, this);
                    this.onProto(s2c_zhuimo_boss_info_ret, this.s2c_zhuimo_boss_info_ret, this);
                    // this.onProto(s2c_zhuimo_boss_hurt_rank, this.s2c_zhuimo_boss_hurt_rank, this);
                    this.onProto(s2c_zhuimo_update_date, this.s2c_zhuimo_update_date, this);
                    this.onProto(s2c_zhuimo_open_ui_ret, this.s2c_zhuimo_open_ui_ret, this);
                    this.onProto(s2c_zhuimo_show_reward_ret, this.s2c_zhuimo_show_reward_ret, this);
                    this.onProto(s2c_zhuimo_boss_roll_point, this.s2c_zhuimo_boss_roll_point, this);
                    this.onProto(s2c_zhuimo_army_ui_show, this.s2c_zhuimo_army_ui_show, this);
                    this.onProto(s2c_zhuimo_update_buff_info, this.s2c_zhuimo_update_buff_info, this);
                };
                BossProxy.prototype.onUpdateTips = function () {
                    var time = this.openTime;
                    if (!time) {
                        // if (SceneUtil.isShowMain()) {
                        //     facade.showView(ModName.Boss, BossViewType.AbyssTips);
                        // }
                        mod.PropTipsMgr.getIns().showBoss(2 /* Abyss */, this.endTime);
                        this.onUpdateHintByAbyss();
                        mod.HintMgr.addTimeEvent(12 /* AbyssBossClose */, this.endTime, this, this.onUpdateHintByAbyss);
                        var openTime = this.getOpenTime(false);
                        mod.HintMgr.addTimeEvent(10 /* AbyssBoss */, openTime, this, this.onUpdateTips);
                        return;
                    }
                    mod.HintMgr.addTimeEvent(10 /* AbyssBoss */, time, this, this.onUpdateTips);
                };
                BossProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                };
                BossProxy.prototype.c2s_new_multiple_boss_challenge = function (index) {
                    var msg = new c2s_new_multiple_boss_challenge();
                    msg.index = index;
                    this.sendProto(msg);
                };
                BossProxy.prototype.c2s_new_multiple_boss_info = function () {
                    var msg = new c2s_new_multiple_boss_info();
                    this.sendProto(msg);
                };
                BossProxy.prototype.s2c_new_multiple_boss_list = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.count != undefined) {
                        this._model.bossCount = msg.count;
                    }
                    if (msg.recover_count_time != undefined) {
                        this._model.bossTime = msg.recover_count_time.toNumber();
                    }
                    if (msg.use_luck_count != undefined) {
                        this._model.luckyCount = msg.use_luck_count;
                    }
                    if (msg.bosslit) {
                        if (!this._model.bossInfos) {
                            this._model.bossInfos = msg.bosslit;
                        }
                        else {
                            for (var _i = 0, _a = msg.bosslit; _i < _a.length; _i++) {
                                var info = _a[_i];
                                var pos = this.getInfoPos(info.index);
                                if (pos >= 0) {
                                    this._model.bossInfos[pos] = info;
                                }
                                else {
                                    this._model.bossInfos.push(info);
                                }
                            }
                        }
                    }
                    this.updateBossHint();
                    this.checkBossRevive(); //检测BOSS复活
                    this.sendNt("on_many_boss_update" /* ON_MANY_BOSS_UPDATE */);
                };
                BossProxy.prototype.getInfoPos = function (index) {
                    if (!this._model.bossInfos || !this._model.bossInfos.length) {
                        return -1;
                    }
                    var len = this._model.bossInfos.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.bossInfos[i];
                        if (info.index == index) {
                            return i;
                        }
                    }
                    return -1;
                };
                /**boss信息*/
                BossProxy.prototype.getBossInfo = function (index) {
                    var pos = this.getInfoPos(index);
                    if (pos >= 0) {
                        return this._model.bossInfos[pos];
                    }
                    return null;
                };
                Object.defineProperty(BossProxy.prototype, "bossCount", {
                    /**boss挑战次数*/
                    get: function () {
                        return this._model.bossCount;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "bossMaxCount", {
                    /**boss挑战次数上限*/
                    get: function () {
                        var cfg = game.GameConfig.getParamConfigById("BOSS_challenge_limit");
                        return cfg.value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "bossTime", {
                    /**boss次数恢复时间戳*/
                    get: function () {
                        return this._model.bossTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "bossCostIndex", {
                    /**boss挑战次数道具*/
                    get: function () {
                        return 1450701001 /* DuorenBoss */;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "luckyCount", {
                    /**幸运爆率次数*/
                    get: function () {
                        return this._model.luckyCount;
                    },
                    enumerable: true,
                    configurable: true
                });
                //玩法总次数获取
                BossProxy.prototype.getCurVal = function () {
                    return this.bossCount + mod.BagUtil.getPropCntByIdx(this.bossCostIndex); //每日剩余次数+物品剩余数量
                };
                BossProxy.prototype.getBossCfgs = function () {
                    if (!this._model.bossCfgs) {
                        this._model.bossCfgs = {};
                        var type = 0;
                        var cfgList = game.getConfigListByName("new_multiple_boss.json" /* NewMultipleBoss */);
                        for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                            var cfg = cfgList_1[_i];
                            if (!this._model.bossCfgs[type]) {
                                this._model.bossCfgs[type] = [cfg];
                                continue;
                            }
                            var firstCfg = this._model.bossCfgs[type][0];
                            if (cfg.open[0] != firstCfg.open[0] || cfg.open[1] != firstCfg.open[1]) {
                                type++;
                                this._model.bossCfgs[type] = [cfg];
                                continue;
                            }
                            this._model.bossCfgs[type].push(cfg);
                        }
                    }
                    return this._model.bossCfgs;
                };
                BossProxy.prototype.isBossOpen = function (type, showTips) {
                    var cfgs = this.getBossCfgs();
                    var cfgList = cfgs[type];
                    var cfg = cfgList[0];
                    var bossType = cfg.open[0];
                    var lv = cfg.open[1];
                    var isOpen;
                    if (bossType == 1 /* Lv */) {
                        isOpen = mod.ViewMgr.getIns().checkLv(lv);
                        if (!isOpen && showTips) {
                            game.PromptBox.getIns().show(mod.ViewMgr.getIns().checkLvStr(lv));
                        }
                    }
                    else {
                        isOpen = mod.ViewMgr.getIns().checkRebirth(lv);
                        if (!isOpen && showTips) {
                            game.PromptBox.getIns().show(mod.ViewMgr.getIns().checkRebirthStr(lv));
                        }
                    }
                    return isOpen;
                };
                // /**是否可以挑战*/
                // public canChallengeBoss(): boolean {
                //     let cnt = this.bossCount;
                //     if(cnt > 0){
                //         return true;
                //     }
                //     let index = this.bossCostIndex;
                //     let propCnt = BagUtil.getPropCntByIdx(index);
                //     return propCnt > 0;
                // }
                // private getBossHint(index: number): boolean {
                //     let info = this.getBossInfo(index);
                //     let isDied = !info || info.hp <= 0;//boss已死亡
                //     return !isDied;
                // }
                // public getBossHintByType(type: number): boolean {
                //     if(!this.isBossOpen(type)){
                //         return false;
                //     }
                //     let cfgs = this.getBossCfgs();
                //     let cfgList = cfgs[type];
                //     for(let cfg of cfgList){
                //         if(this.getBossHint(cfg.index)){
                //             return true;
                //         }
                //     }
                //     return false;
                // }
                /**更新红点*/
                BossProxy.prototype.updateBossHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670118 /* Boss */)) {
                        return;
                    }
                    var hint = this.checkBossChallengeHint();
                    if (!hint) {
                        mod.HintMgr.addTimeEvent(1 /* ManyBoss */, this.bossTime, this, this.c2s_new_multiple_boss_info);
                    }
                    var hintType = this._model.bossChallengeHint;
                    mod.HintMgr.setHint(hint, hintType, 1041670118 /* Boss */);
                    this.checkAutoChallengeManyBoss();
                };
                BossProxy.prototype.checkBossChallengeHint = function () {
                    // if(!this.canChallengeBoss()){
                    //     //没有挑战次数时
                    //     return false;
                    // }
                    // let cfgs = this.getBossCfgs();
                    // for(let k in cfgs){
                    //     let type = parseInt(k);
                    //     if(this.getBossHintByType(type)){
                    //         return true;
                    //     }
                    // }
                    return this.bossCount > 0;
                };
                //检测BOSS复活
                BossProxy.prototype.checkBossRevive = function () {
                    if (!this.bossCount) {
                        return; //没有次数时候不需要检测
                    }
                    if (mod.HintMgr.hasTimeEvent(6 /* ManyBossRevive */)) {
                        return; //已经存在定时器
                    }
                    var selType = 0;
                    var cfgs = this.getBossCfgs();
                    for (var k in cfgs) {
                        var type = parseInt(k);
                        var isOpen = this.isBossOpen(type);
                        if (isOpen) {
                            selType = type; //默认选中最高的
                        }
                        else {
                            break;
                        }
                    }
                    //取到最近一只复活的BOSS
                    var nextTime = 0;
                    var monsterIndex; //boss怪物index
                    var bossList = cfgs[selType].concat(); //防止修改配置数据
                    for (var _i = 0, bossList_1 = bossList; _i < bossList_1.length; _i++) {
                        var cfg = bossList_1[_i];
                        var info = this.getBossInfo(cfg.index);
                        if (!info) {
                            continue;
                        }
                        var isDied = info.hp <= 0; //boss已死亡
                        if (!isDied) {
                            continue;
                        }
                        var bossTime = info.recover_time.toNumber();
                        if ((!nextTime || nextTime > bossTime) && bossTime) {
                            nextTime = bossTime; //取最小值
                            monsterIndex = cfg.monster_index[0];
                        }
                    }
                    if (!nextTime) {
                        return; //没有死亡的BOSS
                    }
                    mod.HintMgr.addTimeEvent(6 /* ManyBossRevive */, nextTime, this, this.onBossRevive, [monsterIndex]);
                };
                BossProxy.prototype.onBossRevive = function (index) {
                    var nameStr = game.getLanById("many_boss_title" /* many_boss_title */);
                    var data = {
                        nameStr: nameStr,
                        index: index,
                        jumpId: 6 /* Boss */
                    };
                    this.checkAutoChallengeManyBoss();
                    this.sendNt("on_boss_revive_update" /* ON_BOSS_REVIVE_UPDATE */, data);
                };
                BossProxy.prototype.reincarnateInfoUpdate = function (n) {
                    mod.HintMgr.removeTimeEvent(6 /* ManyBossRevive */);
                    this.checkBossRevive(); //检测BOSS复活
                    mod.HintMgr.removeTimeEvent(7 /* VipBossRevive */);
                    this.checkVipBossRevive(); //检测BOSS复活
                };
                /************************** 个人 boss *************************/
                BossProxy.prototype.c2s_single_boss_enter = function (index) {
                    var msg = new c2s_single_boss_enter();
                    msg.index = index;
                    this.sendProto(msg);
                };
                BossProxy.prototype.c2s_single_boss_sweep = function () {
                    var msg = new c2s_single_boss_sweep();
                    this.sendProto(msg);
                };
                BossProxy.prototype.s2c_single_boss_info = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.infos) {
                        return;
                    }
                    if (!this._model.personalBossInfos) {
                        this._model.personalBossInfos = msg.infos;
                    }
                    else {
                        for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                            var info = _a[_i];
                            var pos = this.getPersonalInfoPos(info.index);
                            if (pos >= 0) {
                                this._model.personalBossInfos[pos] = info;
                            }
                            else {
                                this._model.personalBossInfos.push(info);
                            }
                        }
                    }
                    this.updatePersonalBossHint();
                    this.sendNt("on_personal_boss_update" /* ON_PERSONAL_BOSS_UPDATE */);
                };
                BossProxy.prototype.getPersonalInfoPos = function (index) {
                    if (!this._model.personalBossInfos || !this._model.personalBossInfos.length) {
                        return -1;
                    }
                    var len = this._model.personalBossInfos.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.personalBossInfos[i];
                        if (info.index == index) {
                            return i;
                        }
                    }
                    return -1;
                };
                /**boss信息*/
                BossProxy.prototype.getPersonalBossInfo = function (index) {
                    var pos = this.getPersonalInfoPos(index);
                    if (pos >= 0) {
                        return this._model.personalBossInfos[pos];
                    }
                    return null;
                };
                BossProxy.prototype.isPersonalBossOpen = function (cfg) {
                    var bossType = cfg.open[0];
                    var lv = cfg.open[1];
                    var isOpen;
                    if (bossType == 1 /* Lv */) {
                        isOpen = mod.ViewMgr.getIns().checkLv(lv);
                    }
                    else {
                        isOpen = mod.ViewMgr.getIns().checkRebirth(lv);
                    }
                    return isOpen;
                };
                /**更新红点*/
                BossProxy.prototype.updatePersonalBossHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670116 /* PersonalBoss */)) {
                        return;
                    }
                    var hint = this.checkPersonalBossChallengeHint();
                    if (!hint) {
                        var reviveTime = this.getPersonalBossMinReviveTime();
                        if (reviveTime) {
                            mod.HintMgr.addTimeEvent(2 /* PersonalBoss */, reviveTime, this, this.updatePersonalBossHint);
                        }
                    }
                    this.checkAutoChallengePersonalBoss();
                    var hintType = this._model.personalBossChallengeHint;
                    mod.HintMgr.setHint(hint, hintType);
                };
                BossProxy.prototype.checkPersonalBossChallengeHint = function () {
                    var cfgList = game.getConfigListByName("personal_boss.json" /* PersonalBoss */);
                    var maxCnt = this.getPersonalBossMaxCnt();
                    for (var _i = 0, cfgList_2 = cfgList; _i < cfgList_2.length; _i++) {
                        var cfg = cfgList_2[_i];
                        if (!this.isPersonalBossOpen(cfg)) {
                            continue;
                        }
                        var info = this.getPersonalBossInfo(cfg.index);
                        var bossTime = info && info.revive_time || 0;
                        var isDied = bossTime - TimeMgr.time.serverTimeSecond > 0;
                        if (isDied) {
                            continue;
                        }
                        var useCnt = info && info.used_cnt || 0;
                        if (maxCnt - useCnt > 0) {
                            return true; //剩余可挑战
                        }
                    }
                    return false;
                };
                /**获取个人boss最小复活时间*/
                BossProxy.prototype.getPersonalBossMinReviveTime = function () {
                    var reviveTime = 0;
                    if (!this._model.personalBossInfos || !this._model.personalBossInfos.length) {
                        return reviveTime;
                    }
                    var maxCnt = this.getPersonalBossMaxCnt();
                    var len = this._model.personalBossInfos.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.personalBossInfos[i];
                        var bossTime = info && info.revive_time || 0;
                        var useCnt = info && info.used_cnt || 0;
                        if (useCnt < maxCnt && bossTime && (bossTime < reviveTime || reviveTime == 0)) {
                            reviveTime = bossTime;
                        }
                    }
                    return reviveTime;
                };
                BossProxy.prototype.getPersonalBossMaxCnt = function () {
                    var cfg = game.GameConfig.getParamConfigById("personal_count");
                    return cfg && cfg.value;
                };
                BossProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("level" /* level */) >= 0 || keys.indexOf("reincarnate" /* reincarnate */) >= 0) {
                        this.updatePersonalBossHint();
                    }
                };
                /************************** 跨服 boss *************************/
                BossProxy.prototype.c2s_new_cross_boss_challenge = function (index) {
                    var msg = new c2s_new_cross_boss_challenge();
                    msg.index = index;
                    this.sendProto(msg);
                };
                BossProxy.prototype.c2s_new_cross_boss = function (index, type) {
                    var msg = new c2s_new_cross_boss();
                    msg.index = index;
                    msg.button_type = type;
                    this.sendProto(msg);
                };
                BossProxy.prototype.c2s_new_cross_boss_hurt_reward = function (index) {
                    var msg = new c2s_new_cross_boss_hurt_reward();
                    msg.index = Long.fromValue(index);
                    msg.boss_index = this.selCrossBossCfg.index; //服务端要求加上boss index
                    this.sendProto(msg);
                };
                BossProxy.prototype.c2s_new_cross_boss_buy_count = function () {
                    var msg = new c2s_new_cross_boss_buy_count();
                    this.sendProto(msg);
                };
                BossProxy.prototype.s2c_new_cross_boss = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (!this._model.crossBossInfo) {
                        this._model.crossBossInfo = msg;
                    }
                    else {
                        for (var k in msg) {
                            this._model.crossBossInfo[k] = msg[k];
                        }
                    }
                    // 1.请求boss数据(role_id, index,hp, next_recover_time,endtime,count,buycount)
                    // 2.boss开启 复活(hp, next_recover_time,endtime,count)
                    // 3.购买次数(count,buycount)
                    if (msg.count != undefined || msg.endtime || msg.next_recover_time) {
                        this.updateCrossBossHint(); //只有这些数据需要刷新红点
                    }
                    if (msg.endtime && !msg.index) {
                        this.updateCrossBossTips(); //跨服boss开启
                    }
                    if (msg.count != undefined || msg.buycount != undefined) {
                        this.sendNt("on_cross_boss_update" /* ON_CROSS_BOSS_UPDATE */); //只有次数需要监听刷新
                    }
                };
                BossProxy.prototype.s2c_new_cross_boss_ranks_list = function (n) {
                    var msg = n.body;
                    this._model.crossBossRankInfo = msg;
                    this.sendNt("on_cross_boss_rank_update" /* ON_CROSS_BOSS_RANK_UPDATE */);
                };
                BossProxy.prototype.s2c_new_cross_boss_scene = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (!this._model.crossBossSceneRankInfo) {
                        this._model.crossBossSceneRankInfo = msg;
                    }
                    else {
                        for (var k in msg) {
                            this._model.crossBossSceneRankInfo[k] = msg[k];
                        }
                    }
                    if (msg.player_ranks || msg.my_info) {
                        var info = { hurtList: msg.player_ranks || [], myInfo: msg.my_info }; //防报错处理
                        this.sendNt("on_scene_rank_update" /* ON_SCENE_RANK_UPDATE */, info); //场景排行榜数据
                    }
                };
                BossProxy.prototype.s2c_new_cross_boss_hurt_reward = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (!this._model.crossBossReward) {
                        this._model.crossBossReward = msg.list;
                    }
                    else {
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            var pos = this.getRewardPos(info.index.toNumber());
                            if (pos >= 0) {
                                this._model.crossBossReward[pos] = info;
                            }
                            else {
                                this._model.crossBossReward.push(info);
                            }
                        }
                    }
                    this.sendNt("on_cross_boss_reward_update" /* ON_CROSS_BOSS_REWARD_UPDATE */);
                };
                BossProxy.prototype.getRewardPos = function (index) {
                    if (!this._model.crossBossReward) {
                        return -1;
                    }
                    var len = this._model.crossBossReward.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.crossBossReward[i];
                        if (info.index.toNumber() == index) {
                            return i;
                        }
                    }
                    return -1;
                };
                BossProxy.prototype.s2c_new_cross_boss_roll_point = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    facade.hideView("22" /* Boss */, "04" /* CrossBossLuckyReward */);
                    facade.showView("22" /* Boss */, "04" /* CrossBossLuckyReward */, msg);
                };
                Object.defineProperty(BossProxy.prototype, "crossBossInfo", {
                    get: function () {
                        return this._model.crossBossInfo;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "crossBossRankInfo", {
                    get: function () {
                        return this._model.crossBossRankInfo;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "selCrossBossCfg", {
                    get: function () {
                        return this._model.selCrossBossCfg;
                    },
                    set: function (cfg) {
                        this._model.selCrossBossCfg = cfg;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "crossBossSceneRank", {
                    get: function () {
                        return this._model.crossBossSceneRank;
                    },
                    set: function (val) {
                        this._model.crossBossSceneRank = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                BossProxy.prototype.clearCrossBossSceneRankInfo = function () {
                    this._model.crossBossSceneRankInfo = null;
                    this._model.crossBossReward = null;
                };
                BossProxy.prototype.getPersonalRanks = function () {
                    if (this.crossBossSceneRank) {
                        //场景排行榜
                        return this._model.crossBossSceneRankInfo && this._model.crossBossSceneRankInfo.player_ranks || [];
                    }
                    return this._model.crossBossRankInfo && this._model.crossBossRankInfo.player_ranks || [];
                };
                BossProxy.prototype.getMyPersonalRank = function () {
                    if (this.crossBossSceneRank) {
                        //场景排行榜
                        return this._model.crossBossSceneRankInfo && this._model.crossBossSceneRankInfo.my_info || null;
                    }
                    return this._model.crossBossRankInfo && this._model.crossBossRankInfo.my_info || null;
                };
                BossProxy.prototype.getGuildRanks = function () {
                    if (this.crossBossSceneRank) {
                        //场景排行榜
                        return this._model.crossBossSceneRankInfo && this._model.crossBossSceneRankInfo.guild_ranks || [];
                    }
                    return this._model.crossBossRankInfo && this._model.crossBossRankInfo.guild_ranks || [];
                };
                BossProxy.prototype.getMyGuildRank = function () {
                    if (this.crossBossSceneRank) {
                        //场景排行榜
                        return this._model.crossBossSceneRankInfo && this._model.crossBossSceneRankInfo.my_guild_info || null;
                    }
                    return this._model.crossBossRankInfo && this._model.crossBossRankInfo.my_guild_info || null;
                };
                /**实际状态为客户端用的排序状态*/
                BossProxy.prototype.getCrossBossRewardStatus = function (index) {
                    var pos = this.getRewardPos(index);
                    if (pos >= 0) {
                        var info = this._model.crossBossReward[pos];
                        return info.status == 0 /* NotFinish */ ? 2 /* NotFinish */ :
                            (info.status == 1 /* Finish */ ? 1 /* Finish */ : 3 /* Draw */);
                    }
                    return 2 /* NotFinish */;
                };
                /**跨服boss开启，登录时候客户端主动检测下*/
                BossProxy.prototype.updateCrossBossTips = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670119 /* CrossBoss */)) {
                        return;
                    }
                    var bossInfo = this.crossBossInfo;
                    var cnt = bossInfo && bossInfo.count || 0;
                    if (!cnt) {
                        return; //没次数时不提示
                    }
                    var endTime = bossInfo && bossInfo.endtime ? bossInfo.endtime.toNumber() : 0; //0说明boss未开，有时间表示boss已开，时间为本次结束时间
                    var curTime = TimeMgr.time.serverTimeSecond;
                    if (endTime > curTime && bossInfo.hp > 0) {
                        //修改：BOSS死亡的时候不弹窗
                        //facade.showView(ModName.Boss, BossViewType.CrossBossTips);
                        mod.PropTipsMgr.getIns().showBoss(1 /* CrossBoss */, endTime);
                    }
                };
                /**更新红点*/
                BossProxy.prototype.updateCrossBossHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670119 /* CrossBoss */)) {
                        return;
                    }
                    var hint = this.checkCrossBossChallengeHint();
                    var hintType = this._model.crossBossChallengeHint;
                    mod.HintMgr.setHint(hint, hintType);
                    this.checkAutoChallengeCrossBoss(); //修仙女仆的自动挑战跨服boss
                };
                BossProxy.prototype.checkCrossBossChallengeHint = function () {
                    var bossInfo = this.crossBossInfo;
                    var cnt = bossInfo && bossInfo.count || 0;
                    if (!cnt) {
                        return false;
                    }
                    var hp = bossInfo && bossInfo.hp || 0;
                    var endTime = bossInfo && bossInfo.endtime ? bossInfo.endtime.toNumber() : 0; //0说明boss未开，有时间表示boss已开，时间为本次结束时间
                    var curTime = TimeMgr.time.serverTimeSecond;
                    var showTime = !endTime || curTime > endTime || !hp; //boss未开启或者已结束或者已死亡
                    return !showTime;
                };
                /************************** vip boss *************************/
                /**
                 * 请求进入对应BOSS关卡
                 * @param index 关卡id
                 */
                BossProxy.prototype.c2s_new_vip_boss_enter = function (index) {
                    var msg = new c2s_new_vip_boss_enter();
                    msg.index = index;
                    this.sendProto(msg);
                };
                /**
                 * vip boss基本信息
                 */
                BossProxy.prototype.s2c_new_vip_boss_info = function (n) {
                    var msg = n.body;
                    if (!msg.infos) {
                        return;
                    }
                    if (!this._model.vipBossInfos) {
                        this._model.vipBossInfos = {};
                    }
                    for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                        var info = _a[_i];
                        var cfg = this.getVipBossFubenCfgByBossId(info.boss_id.toNumber());
                        if (!cfg) {
                            continue;
                        }
                        this._model.vipBossInfos[cfg.index] = info;
                    }
                    this.updateVipBossHint();
                    this.checkVipBossRevive(); //检测BOSS复活
                    this.sendNt("on_vip_boss_info_update" /* ON_VIP_BOSS_INFO_UPDATE */);
                };
                /**
                 * 碾压
                 * @param index 关卡id
                 */
                BossProxy.prototype.c2s_new_vip_boss_sweep = function (index) {
                    var msg = new c2s_new_vip_boss_sweep();
                    msg.index = index;
                    this.sendProto(msg);
                };
                /**
                 * 取 vip boss 信息
                 * @param index new_vip_boss 表 index
                 * @returns
                 */
                BossProxy.prototype.getVipBossInfo = function (index) {
                    var gateId = index % 10;
                    return this._model.vipBossInfos && this._model.vipBossInfos[gateId] || null;
                };
                /**
                 * vip boss 副本配置
                 * @param index new_vip_boss_fuben 表 index
                 * @returns
                 */
                BossProxy.prototype.getVipBossFubenCfg = function (index) {
                    if (this._model.vipBossFubenCfg[index]) {
                        return this._model.vipBossFubenCfg[index];
                    }
                    var cfgs = game.getConfigListByName("new_vip_boss_fuben.json" /* NewVipBossFuben */);
                    for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                        var cfg = cfgs_1[_i];
                        this._model.vipBossFubenCfg[cfg.index] = cfg;
                    }
                    return this._model.vipBossFubenCfg[index];
                };
                /**
                 * vip boss 副本配置
                 * @param bossId
                 * @returns
                 */
                BossProxy.prototype.getVipBossFubenCfgByBossId = function (bossId) {
                    if (this._model.vipBossFubenCfg2[bossId]) {
                        return this._model.vipBossFubenCfg2[bossId];
                    }
                    var cfgs = game.getConfigListByName("new_vip_boss_fuben.json" /* NewVipBossFuben */);
                    for (var _i = 0, cfgs_2 = cfgs; _i < cfgs_2.length; _i++) {
                        var cfg = cfgs_2[_i];
                        this._model.vipBossFubenCfg2[cfg.bossId[0]] = cfg;
                    }
                    return this._model.vipBossFubenCfg2[bossId];
                };
                /**
                 * vip boss 配置
                 * @param index
                 * @returns
                 */
                BossProxy.prototype.getVipBossCfg = function (index) {
                    if (this._model.vipBossCfg[index]) {
                        return this._model.vipBossCfg[index];
                    }
                    var cfgs = game.getConfigListByName("new_vip_boss.json" /* NewVipBoss */);
                    for (var _i = 0, cfgs_3 = cfgs; _i < cfgs_3.length; _i++) {
                        var cfg = cfgs_3[_i];
                        this._model.vipBossCfg[cfg.index] = cfg;
                    }
                    return this._model.vipBossCfg[index];
                };
                /**
                 * 当前转生对应的 vip boss 配置列表
                 * @returns
                 */
                BossProxy.prototype.getRebVipBossCfg = function () {
                    var curZs = mod.RoleUtil.getRebirthLv(); // 当前转生数
                    if (this._model.rebVipBossCfg[curZs]) {
                        return this._model.rebVipBossCfg[curZs];
                    }
                    var vipBossCfg = {};
                    var cfgs = game.getConfigListByName("new_vip_boss.json" /* NewVipBoss */);
                    for (var _i = 0, cfgs_4 = cfgs; _i < cfgs_4.length; _i++) {
                        var cfg = cfgs_4[_i];
                        var isOpen = this.isVipBossOpen(cfg.open[0]);
                        if (isOpen) {
                            vipBossCfg[cfg.index] = cfg;
                        }
                    }
                    this._model.rebVipBossCfg[curZs] = vipBossCfg;
                    return vipBossCfg;
                };
                /**
                 * 当前 vip 等级是否达到指定关卡vip限制
                 * @param index new_vip_boss_fuben 表 index
                 */
                BossProxy.prototype.isVipEnough = function (index) {
                    var cfg = this.getVipBossFubenCfg(index);
                    var curVip = mod.VipUtil.getShowVipLv();
                    return curVip >= cfg.VIP_lv;
                };
                /**
                 * 取关卡状态
                 * @param index new_vip_boss 表 index
                 */
                BossProxy.prototype.getState = function (index) {
                    var gateId = index % 10;
                    return this.getState2(gateId);
                };
                /**
                 * 取关卡状态
                 * @param gateId new_vip_boss_fuben 表 index
                 */
                BossProxy.prototype.getState2 = function (gateId) {
                    var vipEnough = this.isVipEnough(gateId);
                    if (!vipEnough) {
                        return 1 /* NonActivited */;
                    }
                    var info = this.getVipBossInfo(gateId);
                    if (!info) {
                        return 1 /* NonActivited */;
                    }
                    if (info.is_finished) {
                        if (info.next_boss_time > TimeMgr.time.serverTimeSecond) {
                            return 4 /* CD */;
                        }
                        var cfg_next = this.getVipBossFubenCfg(gateId % 10 + 1);
                        if (!cfg_next || this.isVipEnough(gateId + 1)) {
                            return 3 /* CanSaoDan */;
                        }
                    }
                    return 2 /* CanFight */;
                };
                Object.defineProperty(BossProxy.prototype, "vipBossRebirthIds", {
                    /**
                     * 所有转生 id
                     */
                    get: function () {
                        if (this._model.vipBossRebirthIds.length) {
                            return this._model.vipBossRebirthIds;
                        }
                        var cfgs = game.getConfigListByName("new_vip_boss.json" /* NewVipBoss */);
                        for (var _i = 0, cfgs_5 = cfgs; _i < cfgs_5.length; _i++) {
                            var cfg = cfgs_5[_i];
                            if (this._model.vipBossRebirthIds.indexOf(cfg.open[0]) == -1) {
                                this._model.vipBossRebirthIds.push(cfg.open[0]);
                            }
                        }
                        return this._model.vipBossRebirthIds;
                    },
                    enumerable: true,
                    configurable: true
                });
                BossProxy.prototype.isVipBossOpen = function (index) {
                    var curLv = mod.RoleUtil.getRebirthLv(); // 当前转生数
                    var lv = mod.RoleUtil.getRebirthLv(index); // 转生数
                    return curLv == lv;
                };
                BossProxy.prototype.updateVipBossHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670117 /* VipBoss */)) {
                        return;
                    }
                    var reIds = this.vipBossRebirthIds;
                    var flag;
                    for (var _i = 0, reIds_1 = reIds; _i < reIds_1.length; _i++) {
                        var reid = reIds_1[_i];
                        var isOpen = this.isVipBossOpen(reid);
                        if (isOpen) {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) { // 转生条件没达到
                        return;
                    }
                    var hint = false;
                    for (var type = 1 /* Type1 */; type <= 5 /* Type5 */; type++) {
                        var state = this.getState2(type);
                        hint = (state == 2 /* CanFight */ || state == 3 /* CanSaoDan */);
                        if (hint) {
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.vipBossHint);
                    this.checkAutoChallengeVipBoss();
                };
                //检测BOSS复活
                BossProxy.prototype.checkVipBossRevive = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670117 /* VipBoss */)) {
                        return;
                    }
                    if (mod.HintMgr.hasTimeEvent(7 /* VipBossRevive */)) {
                        return; //已经存在定时器
                    }
                    //取到最近一只复活的BOSS
                    var nextTime = 0;
                    var monsterIndex; //boss怪物index
                    var cfgs = this.getRebVipBossCfg();
                    for (var idx in cfgs) {
                        var cfg = cfgs[idx];
                        var info = this.getVipBossInfo(cfg.index);
                        if (!info) {
                            continue;
                        }
                        var gateId = cfg.index % 10;
                        var vipEnough = this.isVipEnough(gateId);
                        if (!vipEnough) {
                            continue;
                        }
                        var bossTime = info.next_boss_time;
                        if ((!nextTime || nextTime > bossTime) && bossTime) {
                            nextTime = bossTime; //取最小值
                            var fbCfg = game.getConfigByNameId("new_vip_boss_fuben.json" /* NewVipBossFuben */, cfg.index % 10);
                            monsterIndex = fbCfg.bossId[0];
                        }
                    }
                    if (!nextTime) {
                        return; //没有死亡的BOSS
                    }
                    mod.HintMgr.addTimeEvent(7 /* VipBossRevive */, nextTime, this, this.onVipBossRevive, [monsterIndex]);
                };
                BossProxy.prototype.onVipBossRevive = function (index) {
                    var nameStr = game.getLanById("boss_vip" /* boss_vip */);
                    var data = {
                        nameStr: nameStr,
                        index: index,
                        jumpId: 51 /* VipBoos */
                    };
                    this.checkAutoChallengeVipBoss();
                    this.sendNt("on_boss_revive_update" /* ON_BOSS_REVIVE_UPDATE */, data);
                };
                //---------------------------坠魔深渊---------------------------
                BossProxy.prototype.c2s_zhuimo_open_ui = function () {
                    var msg = new c2s_zhuimo_open_ui();
                    this.sendProto(msg);
                };
                BossProxy.prototype.c2s_zhuimo_boss_challenge = function () {
                    var msg = new c2s_zhuimo_boss_challenge();
                    this.sendProto(msg);
                };
                BossProxy.prototype.c2s_zhuimo_boss_info = function () {
                    var msg = new c2s_zhuimo_boss_info();
                    this.sendProto(msg);
                };
                BossProxy.prototype.c2s_zhuimo_show_reward = function () {
                    var msg = new c2s_zhuimo_show_reward();
                    this.sendProto(msg);
                };
                BossProxy.prototype.c2s_zhuimo_army_ui_show = function (type) {
                    var msg = new c2s_zhuimo_army_ui_show();
                    msg.type = type;
                    this.sendProto(msg);
                    this._model.open_view = type == 3;
                };
                BossProxy.prototype.c2s_zhuimo_army_oper = function (type, role_id, army_id) {
                    var msg = new c2s_zhuimo_army_oper();
                    this._model.oper_type = msg.type = type;
                    if (role_id) {
                        msg.role_id = role_id;
                    }
                    if (army_id) {
                        msg.army_id = army_id;
                    }
                    this.sendProto(msg);
                };
                BossProxy.prototype.s2c_zhuimo_boss_info_ret = function (n) {
                    var msg = n.body;
                    if (msg.boss_list) {
                        this._model.bossList = msg.boss_list;
                    }
                    this.sendNt("boss_list_info_update" /* BOSS_LIST_INFO_UPDATE */);
                };
                // private s2c_zhuimo_boss_hurt_rank(n: GameNT): void {
                //     let msg: s2c_zhuimo_boss_hurt_rank = n.body;
                // }
                BossProxy.prototype.s2c_zhuimo_update_date = function (n) {
                    var msg = n.body;
                    if (msg.total) {
                        this._model.total = msg.total;
                    }
                    if (msg.member_num) {
                        this._model.member_num = msg.member_num;
                    }
                    this.sendNt("on_abyss_scene_update" /* ON_ABYSS_SCENE_UPDATE */);
                };
                BossProxy.prototype.s2c_zhuimo_open_ui_ret = function (n) {
                    var msg = n.body;
                    if (msg.reward_name_list) {
                        this._model.reward_name_list = msg.reward_name_list;
                    }
                    this.sendNt("on_abyss_main_update" /* ON_ABYSS_MAIN_UPDATE */);
                };
                BossProxy.prototype.s2c_zhuimo_show_reward_ret = function (n) {
                    var msg = n.body;
                    mod.ViewMgr.getIns().bossRewardShow(msg.props);
                };
                BossProxy.prototype.s2c_zhuimo_boss_roll_point = function (n) {
                    var msg = n.body;
                    mod.ViewMgr.getIns().showSecondPop("22" /* Boss */, "10" /* AbyssLucky */, msg);
                };
                BossProxy.prototype.s2c_zhuimo_army_ui_show = function (n) {
                    var msg = n.body;
                    if (msg.army_id) {
                        this._model.army_id = msg.army_id;
                        if (!this._model.army_id) {
                            this._model.my_team = [];
                        }
                    }
                    // if (msg.army_list) {
                    // }
                    this._model.army_list = msg.army_list || [];
                    if (msg.my_team) {
                        this._model.my_team = msg.my_team;
                    }
                    if (msg.duiyou_list) {
                        this._model.duiyou_list = msg.duiyou_list;
                        this.sendNt("on_abyss_team_invite_update" /* ON_ABYSS_TEAM_INVITE_UPDATE */);
                    }
                    if (this._model.oper_type) {
                        switch (this._model.oper_type) {
                            case 1:
                                facade.hideView("22" /* Boss */, "12" /* AbyssInvite */);
                                mod.ViewMgr.getIns().showSecondPop("22" /* Boss */, "13" /* AbyssMyTeam */);
                                break;
                            case 2:
                                facade.hideView("22" /* Boss */, "11" /* AbyssTeam */);
                                mod.ViewMgr.getIns().showSecondPop("22" /* Boss */, "13" /* AbyssMyTeam */);
                                break;
                            case 3:
                                facade.hideView("22" /* Boss */, "13" /* AbyssMyTeam */);
                                break;
                        }
                        this._model.oper_type = 0;
                    }
                    if (this._model.open_view) {
                        this._model.open_view = false;
                        if (msg.my_team && msg.my_team.length > 1) {
                            mod.ViewMgr.getIns().showSecondPop("22" /* Boss */, "13" /* AbyssMyTeam */);
                        }
                        else {
                            mod.ViewMgr.getIns().showSecondPop("22" /* Boss */, "14" /* AbyssNoTeam */);
                        }
                    }
                };
                BossProxy.prototype.s2c_zhuimo_update_buff_info = function (n) {
                    var msg = n.body;
                    this._model.army_step = msg.army_step || 0;
                    this._model.guild_step = msg.guild_step || 0;
                    this.sendNt("on_abyss_hurt_update" /* ON_ABYSS_HURT_UPDATE */);
                };
                Object.defineProperty(BossProxy.prototype, "openTime", {
                    /**return second */
                    get: function () {
                        return this.getOpenTime();
                    },
                    enumerable: true,
                    configurable: true
                });
                /**bool是否返回0做开启判断 */
                BossProxy.prototype.getOpenTime = function (bool) {
                    if (bool === void 0) { bool = true; }
                    var serverTime = TimeMgr.time.serverTimeSecond * 1000;
                    var time = new Date(serverTime);
                    var hours = time.getHours();
                    var endTime = 0;
                    if (bool && hours == this.openHours1 || hours == this.openHours2) {
                        return endTime;
                    }
                    if (hours < this.openHours1) {
                        endTime = time.setHours(this.openHours1, 0, 0, 0);
                    }
                    else if (hours < this.openHours2) {
                        endTime = time.setHours(this.openHours2, 0, 0, 0);
                    }
                    else {
                        time.setDate(time.getDate() + 1);
                        endTime = time.setHours(this.openHours1, 0, 0, 0);
                    }
                    return Math.floor(endTime / 1000);
                };
                Object.defineProperty(BossProxy.prototype, "endTime", {
                    get: function () {
                        var serverTime = TimeMgr.time.serverTimeSecond * 1000;
                        var time = new Date(serverTime);
                        var hours = time.getHours();
                        if (hours == this.openHours1 || hours == this.openHours2) {
                            return time.setHours(hours + 1, 0, 0, 0) / 1000;
                        }
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "openHours1", {
                    get: function () {
                        return this._model.openHours1;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "openHours2", {
                    get: function () {
                        return this._model.openHours2;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "bossList", {
                    get: function () {
                        return this._model.bossList;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "total", {
                    get: function () {
                        return this._model.total || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "memberNum", {
                    get: function () {
                        return this._model.member_num || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "reward_name_list", {
                    get: function () {
                        return this._model.reward_name_list || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "team_add_hurt", {
                    get: function () {
                        var zhuimo_zudui = game.GameConfig.getParamConfigById("zhuimo_zudui");
                        var zhuimo_xianzong = game.GameConfig.getParamConfigById("zhuimo_xianzong");
                        var count = 0;
                        count += zhuimo_zudui.value * this._model.army_step;
                        count += zhuimo_xianzong.value * this._model.guild_step;
                        return count;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "my_team", {
                    get: function () {
                        return this._model.my_team || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "army_list", {
                    get: function () {
                        return this._model.army_list || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "duiyou_list", {
                    get: function () {
                        return this._model.duiyou_list || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "leader", {
                    get: function () {
                        return this._model.my_team[0];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "preview_id", {
                    get: function () {
                        return this._model.previewId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "zhuimo_jiangli", {
                    get: function () {
                        if (!this._model.zhuimo_jiangli) {
                            var cfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, this.preview_id);
                            this._model.zhuimo_jiangli = cfg.content;
                        }
                        return this._model.zhuimo_jiangli;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "zhuimo_dajiang", {
                    get: function () {
                        if (!this._model.zhuimo_dajiang) {
                            var param = game.GameConfig.getParamConfigById("zhuimo_dajinag");
                            this._model.zhuimo_dajiang = param.value;
                        }
                        return this._model.zhuimo_dajiang;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BossProxy.prototype, "zhuimo_cost", {
                    get: function () {
                        if (!this._model.zhuimo_cost) {
                            var param = game.GameConfig.getParamConfigById("zhuimo_cost");
                            this._model.zhuimo_cost = param.value;
                        }
                        return this._model.zhuimo_cost;
                    },
                    enumerable: true,
                    configurable: true
                });
                BossProxy.prototype.onUpdateHintByAbyss = function () {
                    var open = !this.openTime;
                    var bool = mod.BagUtil.checkPropCnt(this.zhuimo_cost[0], this.zhuimo_cost[1]);
                    mod.HintMgr.setHint(open && bool, ["22" /* Boss */, "01" /* BossMain */ + "05" /* Abyss */]);
                    this.checkAutoChallengeAbyss(); //自动挑战abyss
                };
                BossProxy.prototype.onUpdateSceneEnter = function (n) {
                    var sceneProxy = game.getProxy("03" /* Scene */, 2 /* Scene */);
                    var lastType = sceneProxy.getSceneType(sceneProxy.lastSceneIdx);
                    if (lastType == 124 /* Abyss */) {
                        //从场景中退出，判断下还可以挑战否。限时被动退出检测 todo
                        this.checkAutoChallengeAbyss();
                    }
                };
                //---------------------------坠魔深渊---------------------------
                /**============== 修仙女仆自动挂机 ==============*/
                //可挑战id
                BossProxy.prototype.getChallengeManyBossIdx = function () {
                    var cfgObj = this.getBossCfgs();
                    var rebirthLv = mod.RoleUtil.getRebirthLv(); //转数
                    if (rebirthLv == 0 && game.RoleVo.ins.level < 50) {
                        return null; //0转且未达50级
                    }
                    var cfgList = cfgObj[rebirthLv];
                    if (!cfgList) {
                        return null;
                    }
                    for (var _i = 0, cfgList_3 = cfgList; _i < cfgList_3.length; _i++) {
                        var cfg = cfgList_3[_i];
                        var bossInfo = this.getBossInfo(cfg.index);
                        var bossTime = bossInfo ? bossInfo.recover_time.toNumber() : 0;
                        var nextTime = bossTime - TimeMgr.time.serverTimeSecond;
                        var showTime = bossTime && nextTime >= 0;
                        if (!showTime && this.bossCount > 0) {
                            return cfg.index;
                        }
                    }
                    return null;
                };
                BossProxy.prototype.canChallengeManyBoss = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670118 /* Boss */)) {
                        return false;
                    }
                    var idx = this.getChallengeManyBossIdx();
                    return !!idx;
                };
                //挑战boss
                BossProxy.prototype.sendAutoChallengeManyBoss = function () {
                    var idx = this.getChallengeManyBossIdx();
                    if (idx) {
                        this.c2s_new_multiple_boss_challenge(idx);
                    }
                };
                // 1.多人boss
                BossProxy.prototype.checkAutoChallengeManyBoss = function () {
                    if (this.canChallengeManyBoss()) {
                        mod.RoleUtil.addAutoChallengeEvent(1 /* ManyBoss */, Handler.alloc(this, this.sendAutoChallengeManyBoss));
                    }
                    else {
                        mod.RoleUtil.removeAutoChallengeEvent(1 /* ManyBoss */);
                    }
                };
                BossProxy.prototype.canChallengeAbyss = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670237 /* Abyss */) || this.openTime > 0) {
                        return false;
                    }
                    var cost = this.zhuimo_cost;
                    return cost && mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                };
                // 2.坠魔深渊
                BossProxy.prototype.checkAutoChallengeAbyss = function () {
                    var index = this.zhuimo_cost[0];
                    var curCnt = mod.BagUtil.getPropCntByIdx(index);
                    if (curCnt <= 0 && mod.RoleUtil.getAutoChallengeEventType() == 2 /* Zhuimoshenyuan */) {
                        mod.SceneUtil.exitScene();
                        mod.RoleUtil.removeAutoChallengeEvent(2 /* Zhuimoshenyuan */);
                        return;
                    }
                    if (this.canChallengeAbyss()) {
                        mod.RoleUtil.addAutoChallengeEvent(2 /* Zhuimoshenyuan */, Handler.alloc(this, this.c2s_zhuimo_boss_challenge));
                    }
                    else {
                        mod.RoleUtil.removeAutoChallengeEvent(2 /* Zhuimoshenyuan */);
                    }
                };
                BossProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    var cost = this.zhuimo_cost;
                    if (cost && indexs.indexOf(cost[0]) > -1) {
                        this.checkAutoChallengeAbyss(); //数量变化处理
                        this.onUpdateHintByAbyss();
                    }
                };
                BossProxy.prototype.getCanChallengePersonalBossCfg = function () {
                    var cfgList = game.getConfigListByName("personal_boss.json" /* PersonalBoss */);
                    var maxCnt = this.getPersonalBossMaxCnt();
                    for (var _i = 0, cfgList_4 = cfgList; _i < cfgList_4.length; _i++) {
                        var cfg = cfgList_4[_i];
                        //未开启
                        if (!this.isPersonalBossOpen(cfg)) {
                            continue;
                        }
                        var info = this.getPersonalBossInfo(cfg.index);
                        var useCnt = info && info.used_cnt || 0;
                        var leftCnt = maxCnt - useCnt;
                        //次数挑战完毕
                        if (leftCnt <= 0) {
                            continue;
                        }
                        var bossTime = info && info.revive_time || 0;
                        var isDied = bossTime - TimeMgr.time.serverTimeSecond > 0;
                        //已死亡
                        if (isDied) {
                            continue;
                        }
                        return cfg;
                    }
                    return null;
                };
                BossProxy.prototype.canChallengePersonalBoss = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670116 /* PersonalBoss */)) {
                        return false;
                    }
                    var cfg = this.getCanChallengePersonalBossCfg();
                    return !!cfg;
                };
                BossProxy.prototype.sendAutoChallengePersonalBoss = function () {
                    var cfg = this.getCanChallengePersonalBossCfg();
                    if (cfg) {
                        this.c2s_single_boss_enter(cfg.index);
                    }
                };
                // 9.个人boss
                BossProxy.prototype.checkAutoChallengePersonalBoss = function () {
                    if (this.canChallengePersonalBoss()) {
                        mod.RoleUtil.addAutoChallengeEvent(9 /* PersonalBoss */, Handler.alloc(this, this.sendAutoChallengePersonalBoss));
                    }
                    else {
                        mod.RoleUtil.removeAutoChallengeEvent(9 /* PersonalBoss */);
                    }
                };
                BossProxy.prototype.getCanChallengeVipBossCfg = function () {
                    var cfgs = this.getRebVipBossCfg();
                    for (var idx in cfgs) {
                        var cfg = cfgs[idx];
                        var info = this.getVipBossInfo(cfg.index);
                        if (!info) {
                            continue;
                        }
                        var state = this.getState(cfg.index);
                        if (state == 2 /* CanFight */) {
                            return cfg;
                        }
                    }
                    return null;
                };
                BossProxy.prototype.canChallengeVipBoss = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670117 /* VipBoss */)) {
                        return false;
                    }
                    var cfg = this.getCanChallengeVipBossCfg();
                    return !!cfg;
                };
                BossProxy.prototype.sendAutoChallengeVipBoss = function () {
                    var cfg = this.getCanChallengeVipBossCfg();
                    if (cfg) {
                        this.c2s_new_vip_boss_enter(cfg.index);
                    }
                };
                // 10.vipboss
                BossProxy.prototype.checkAutoChallengeVipBoss = function () {
                    if (this.canChallengeVipBoss()) {
                        mod.RoleUtil.addAutoChallengeEvent(10 /* VipBoss */, Handler.alloc(this, this.sendAutoChallengeVipBoss));
                    }
                    else {
                        mod.RoleUtil.removeAutoChallengeEvent(10 /* VipBoss */);
                    }
                };
                BossProxy.prototype.canAutoChallengeCrossBoss = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670119 /* CrossBoss */)) {
                        return false;
                    }
                    var cfg = this.getAutoChallengeCrossBossCfg();
                    if (!cfg) {
                        return false;
                    }
                    return this.checkCrossBossChallengeHint();
                };
                BossProxy.prototype.getAutoChallengeCrossBossCfg = function () {
                    var cfgList = game.getConfigListByName("cross_boss.json" /* CrossBoss */);
                    var bossList = [];
                    var selIndex = -1;
                    for (var _i = 0, cfgList_5 = cfgList; _i < cfgList_5.length; _i++) {
                        var cfg = cfgList_5[_i];
                        bossList.push(cfg);
                        var lv = cfg.open[0];
                        if (!mod.ViewMgr.getIns().checkRebirth(lv)) {
                            //转生条件未开启
                            break;
                        }
                        selIndex++;
                    }
                    selIndex = Math.max(selIndex, 0); //默认选第一个
                    return bossList[selIndex];
                };
                BossProxy.prototype.sendAutoChallengeCrossBoss = function () {
                    var cfg = this.getAutoChallengeCrossBossCfg();
                    if (cfg) {
                        this.selCrossBossCfg = cfg;
                        this.c2s_new_cross_boss_challenge(cfg.index);
                    }
                };
                //14.跨服boss
                BossProxy.prototype.checkAutoChallengeCrossBoss = function () {
                    if (this.canAutoChallengeCrossBoss()) {
                        mod.RoleUtil.addAutoChallengeEvent(14 /* KuafuBoss */, Handler.alloc(this, this.sendAutoChallengeCrossBoss));
                    }
                    else {
                        // this.selCrossBossCfg = null;
                        mod.RoleUtil.removeAutoChallengeEvent(14 /* KuafuBoss */);
                    }
                };
                return BossProxy;
            }(game.ProxyBase));
            boss.BossProxy = BossProxy;
            __reflect(BossProxy.prototype, "game.mod.boss.BossProxy", ["game.mod.IBossProxy", "base.IProxy"]);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var facade = base.facade;
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var PersonalBossItem = /** @class */ (function (_super) {
                __extends(PersonalBossItem, _super);
                function PersonalBossItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                PersonalBossItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("22" /* Boss */).retProxy(199 /* Boss */);
                    this.btn_challenge.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                    this._rewardList = new ArrayCollection();
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._rewardList;
                };
                PersonalBossItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this.btn_challenge.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                PersonalBossItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var monsterIndex = cfg.monster_index[0];
                    var monsterCfg = game.getConfigByNameId("monster1.json" /* Monster */, monsterIndex);
                    this.img_icon.source = monsterCfg.res_id;
                    var nameStr = "";
                    var bossType = cfg.open[0];
                    var lv = cfg.open[1];
                    if (bossType == 1 /* Lv */) {
                        nameStr = lv + game.getLanById("lv" /* lv */);
                    }
                    else {
                        nameStr = mod.RoleUtil.getRebirthLvStr(lv);
                    }
                    this.lab_name.text = nameStr;
                    var rewardCfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, cfg.reward_big);
                    this._rewardList.source = rewardCfg.content.slice(0, 3);
                    var isOpen = this._proxy.isPersonalBossOpen(cfg);
                    this.btn_challenge.visible = false;
                    this.lab_limit.visible = false;
                    this.img_has.visible = false;
                    this.lab_cnt.visible = false;
                    this.timeItem.visible = false;
                    if (!isOpen) {
                        //未开启
                        this.lab_limit.visible = true;
                        this.lab_limit.text = nameStr + game.getLanById("boss_cue5" /* boss_cue5 */);
                    }
                    else {
                        var maxCnt = this._proxy.getPersonalBossMaxCnt();
                        var info = this._proxy.getPersonalBossInfo(cfg.index);
                        this._info = info;
                        var useCnt = info && info.used_cnt || 0;
                        var leftCnt = maxCnt - useCnt;
                        if (leftCnt > 0) {
                            var bossTime = info && info.revive_time || 0;
                            var isDied = bossTime - TimeMgr.time.serverTimeSecond > 0; //已死亡
                            if (isDied) {
                                //复活中
                                this.lab_cnt.visible = true;
                                this.timeItem.visible = true;
                                var cntStr = game.getLanById("times" /* times */) + "：" + game.TextUtil.addColor(leftCnt + "/" + maxCnt, 2330156 /* GREEN */);
                                this.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                                this.updateTime();
                            }
                            else {
                                //可挑战
                                this.btn_challenge.visible = true;
                                this.btn_challenge.redPoint.visible = true;
                            }
                        }
                        else {
                            //已挑战
                            this.img_has.visible = true;
                        }
                    }
                };
                PersonalBossItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    if (mod.BagUtil.checkBagFull()) {
                        return;
                    }
                    var index = this.data.index;
                    this._proxy.c2s_single_boss_enter(index);
                };
                PersonalBossItem.prototype.updateTime = function () {
                    if (!this.data || !this._info) {
                        return;
                    }
                    if (!this.timeItem.visible) {
                        return;
                    }
                    var bossTime = this._info.revive_time || 0;
                    var nextTime = bossTime - TimeMgr.time.serverTimeSecond;
                    if (nextTime == 0) {
                        facade.sendNt("update_boss_list" /* UPDATE_BOSS_lIST */);
                    }
                    this.timeItem.updateLeftTime(nextTime);
                };
                return PersonalBossItem;
            }(mod.BaseRenderer));
            boss.PersonalBossItem = PersonalBossItem;
            __reflect(PersonalBossItem.prototype, "game.mod.boss.PersonalBossItem");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var BossMod = /** @class */ (function (_super) {
                __extends(BossMod, _super);
                function BossMod() {
                    return _super.call(this, "22" /* Boss */) || this;
                }
                BossMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                BossMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(199 /* Boss */, boss.BossProxy);
                };
                BossMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* BossMain */, boss.BossMainMdr);
                    this.regMdr("02" /* BossReward */, boss.BossRewardMdr);
                    this.regMdr("07" /* BossRewardShow */, boss.BossRewardShowMdr);
                    this.regMdr("03" /* CrossBossHurtReward */, boss.CrossBossHurtRewardMdr);
                    this.regMdr("04" /* CrossBossLuckyReward */, boss.CrossBossLuckyRewardMdr);
                    this.regMdr("05" /* CrossBossRankMain */, boss.CrossBossRankMainMdr);
                    this.regMdr("06" /* CrossBossScene */, boss.CrossBossSceneMdr);
                    this.regMdr("08" /* AbyssScene */, boss.AbyssSceneMdr);
                    this.regMdr("09" /* AbyssList */, boss.AbyssBossListMdr);
                    this.regMdr("10" /* AbyssLucky */, boss.AbyssLuckyMdr);
                    this.regMdr("11" /* AbyssTeam */, boss.AbyssTeamListMdr);
                    this.regMdr("12" /* AbyssInvite */, boss.AbyssInviteListMdr);
                    this.regMdr("13" /* AbyssMyTeam */, boss.AbyssMyTeamMdr);
                    this.regMdr("14" /* AbyssNoTeam */, boss.AbyssNoTeamMdr);
                    this.regMdr("15" /* AbyssTips */, boss.AbyssTipsMdr);
                    this.regMdr("16" /* CrossBossTips */, boss.CrossBossTipsMdr);
                };
                return BossMod;
            }(game.ModBase));
            boss.BossMod = BossMod;
            __reflect(BossMod.prototype, "game.mod.boss.BossMod");
            gso.modCls.push(BossMod);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var AbyssBossItem = /** @class */ (function (_super) {
                __extends(AbyssBossItem, _super);
                function AbyssBossItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                AbyssBossItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("22" /* Boss */, 199 /* Boss */);
                    this._sceneProxy = game.getProxy("03" /* Scene */, 2 /* Scene */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_attack, this.onClick, this);
                };
                AbyssBossItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    this._sceneProxy.requestMonster(info.entity_id);
                };
                AbyssBossItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    var index = info.index;
                    var cfg = game.getConfigByNameId("zhuimo_boss.json" /* ZhuimoBoss */, index);
                    var monsterIndex = cfg.monster_index[0];
                    var monsterCfg = game.getConfigByNameId("monster1.json" /* Monster */, monsterIndex);
                    this.img_icon.source = monsterCfg.res_id;
                    var bossTime = info && info.recover_time && info.recover_time.toNumber() || 0;
                    var nameStr = monsterCfg.name;
                    this.lab_name.text = nameStr;
                    var hp = info && info.hp || 0;
                    this.bar.show(hp, 100, false, 0, false, 0 /* Percent */); //血量
                    var tipsStr = "";
                    var leftTime = bossTime - TimeMgr.time.serverTimeSecond;
                    var isDied = leftTime > 0; //已死亡
                    if (isDied) {
                        //已死亡
                        this.btn_attack.visible = false;
                        tipsStr = game.TimeUtil.formatSecond(leftTime, "HH:mm:ss") + game.getLanById("vip_boss13" /* vip_boss13 */); //00:00:00复活
                    }
                    else {
                        var isAtack = this._sceneProxy.foeTargetId && this._sceneProxy.foeTargetId.eq(this.data.entity_id); //攻击中
                        this.btn_attack.visible = !isAtack;
                        if (isAtack) {
                            tipsStr = game.getLanById("attacking" /* attacking */) + "..."; //攻击中
                        }
                    }
                    this.lab_tips.text = tipsStr;
                };
                return AbyssBossItem;
            }(mod.BaseListenerRenderer));
            boss.AbyssBossItem = AbyssBossItem;
            __reflect(AbyssBossItem.prototype, "game.mod.boss.AbyssBossItem");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var AbyssBossListView = /** @class */ (function (_super) {
                __extends(AbyssBossListView, _super);
                function AbyssBossListView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.AbyssBossListSkin";
                    return _this;
                }
                return AbyssBossListView;
            }(eui.Component));
            boss.AbyssBossListView = AbyssBossListView;
            __reflect(AbyssBossListView.prototype, "game.mod.boss.AbyssBossListView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TouchEvent = egret.TouchEvent;
            var AbyssInviteItem = /** @class */ (function (_super) {
                __extends(AbyssInviteItem, _super);
                function AbyssInviteItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                AbyssInviteItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("22" /* Boss */, 199 /* Boss */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
                    this.img_leader.visible = false;
                    this.btn.label = "邀请";
                };
                AbyssInviteItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
                    this.lab_name.textFlow = game.TextUtil.parseHtml(info.name);
                    var count = game.TextUtil.addColor("" + (info.showpower && info.showpower.toNumber() || 0), 3496307 /* DEFAULT */);
                    this.lab_count.textFlow = game.TextUtil.parseHtml("战力：" + count);
                };
                AbyssInviteItem.prototype.onClick = function () {
                    this._proxy.c2s_zhuimo_army_oper(1, this.data.role_id, null);
                };
                return AbyssInviteItem;
            }(mod.BaseListenerRenderer));
            boss.AbyssInviteItem = AbyssInviteItem;
            __reflect(AbyssInviteItem.prototype, "game.mod.boss.AbyssInviteItem");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var AbyssLuckyItem = /** @class */ (function (_super) {
                __extends(AbyssLuckyItem, _super);
                function AbyssLuckyItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                AbyssLuckyItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var nameStr = this.data.name + game.StringUtil.substitute(game.getLanById("yijie_tips18" /* yijie_tips18 */), [this.data.value.toString()]);
                    this.lab_name.textFlow = game.TextUtil.parseHtml(nameStr);
                };
                return AbyssLuckyItem;
            }(eui.ItemRenderer));
            boss.AbyssLuckyItem = AbyssLuckyItem;
            __reflect(AbyssLuckyItem.prototype, "game.mod.boss.AbyssLuckyItem");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var AbyssLuckyView = /** @class */ (function (_super) {
                __extends(AbyssLuckyView, _super);
                function AbyssLuckyView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.YijieLuckySkin";
                    return _this;
                }
                return AbyssLuckyView;
            }(eui.Component));
            boss.AbyssLuckyView = AbyssLuckyView;
            __reflect(AbyssLuckyView.prototype, "game.mod.boss.AbyssLuckyView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TouchEvent = egret.TouchEvent;
            var AbyssMyTeamItem = /** @class */ (function (_super) {
                __extends(AbyssMyTeamItem, _super);
                function AbyssMyTeamItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                AbyssMyTeamItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("22" /* Boss */, 199 /* Boss */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onClickAdd, this);
                    this.btn.label = "离开队伍";
                };
                AbyssMyTeamItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        this.currentState = "2";
                        this.btn_add.setImage("jiahao2");
                        return;
                    }
                    this.currentState = "1";
                    var info = this.data;
                    this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
                    this.lab_name.textFlow = game.TextUtil.parseHtml(info.name);
                    this.lab_count.textFlow = game.TextUtil.parseHtml("\u6218\u529B\uFF1A" + (info.showpower && info.showpower.toNumber() || 0));
                    this.btn.visible = info.role_id.eq(game.RoleVo.ins.role_id);
                    this.img_leader.visible = info.role_id.eq(this._proxy.leader.role_id);
                };
                AbyssMyTeamItem.prototype.onClick = function () {
                    this._proxy.c2s_zhuimo_army_oper(3);
                };
                AbyssMyTeamItem.prototype.onClickAdd = function () {
                    mod.ViewMgr.getIns().showSecondPop("22" /* Boss */, "12" /* AbyssInvite */);
                };
                return AbyssMyTeamItem;
            }(mod.BaseListenerRenderer));
            boss.AbyssMyTeamItem = AbyssMyTeamItem;
            __reflect(AbyssMyTeamItem.prototype, "game.mod.boss.AbyssMyTeamItem");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var AbyssMyTeamView = /** @class */ (function (_super) {
                __extends(AbyssMyTeamView, _super);
                function AbyssMyTeamView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.AbyssMyTeamSkin";
                    return _this;
                }
                return AbyssMyTeamView;
            }(eui.Component));
            boss.AbyssMyTeamView = AbyssMyTeamView;
            __reflect(AbyssMyTeamView.prototype, "game.mod.boss.AbyssMyTeamView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var AbyssNoTeamView = /** @class */ (function (_super) {
                __extends(AbyssNoTeamView, _super);
                function AbyssNoTeamView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.AbyssNoTeamSkin";
                    return _this;
                }
                return AbyssNoTeamView;
            }(eui.Component));
            boss.AbyssNoTeamView = AbyssNoTeamView;
            __reflect(AbyssNoTeamView.prototype, "game.mod.boss.AbyssNoTeamView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var AbyssRewardView = /** @class */ (function (_super) {
                __extends(AbyssRewardView, _super);
                function AbyssRewardView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.AbyssRewardSkin";
                    return _this;
                }
                return AbyssRewardView;
            }(eui.Component));
            boss.AbyssRewardView = AbyssRewardView;
            __reflect(AbyssRewardView.prototype, "game.mod.boss.AbyssRewardView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var AbyssSceneView = /** @class */ (function (_super) {
                __extends(AbyssSceneView, _super);
                function AbyssSceneView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.AbyssSceneSkin";
                    return _this;
                }
                return AbyssSceneView;
            }(eui.Component));
            boss.AbyssSceneView = AbyssSceneView;
            __reflect(AbyssSceneView.prototype, "game.mod.boss.AbyssSceneView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TouchEvent = egret.TouchEvent;
            var AbyssTeamItem = /** @class */ (function (_super) {
                __extends(AbyssTeamItem, _super);
                function AbyssTeamItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                AbyssTeamItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("22" /* Boss */, 199 /* Boss */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
                    this.img_leader.visible = false;
                    this.btn.label = "加入";
                };
                AbyssTeamItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data.lead;
                    this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
                    var str = game.TextUtil.addColor("(的队伍)", 2330156 /* GREEN */);
                    this.lab_name.textFlow = game.TextUtil.parseHtml(info.name + str);
                    var count = game.TextUtil.addColor(this.data.total + "/3", 3496307 /* DEFAULT */);
                    this.lab_count.textFlow = game.TextUtil.parseHtml("人数：" + count);
                };
                AbyssTeamItem.prototype.onClick = function () {
                    this._proxy.c2s_zhuimo_army_oper(2, null, this.data.army_id);
                };
                return AbyssTeamItem;
            }(mod.BaseListenerRenderer));
            boss.AbyssTeamItem = AbyssTeamItem;
            __reflect(AbyssTeamItem.prototype, "game.mod.boss.AbyssTeamItem");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var AbyssTeamListView = /** @class */ (function (_super) {
                __extends(AbyssTeamListView, _super);
                function AbyssTeamListView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.AbyssTeamListSkin";
                    return _this;
                }
                return AbyssTeamListView;
            }(eui.Component));
            boss.AbyssTeamListView = AbyssTeamListView;
            __reflect(AbyssTeamListView.prototype, "game.mod.boss.AbyssTeamListView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var AbyssView = /** @class */ (function (_super) {
                __extends(AbyssView, _super);
                function AbyssView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.AbyssSkin";
                    return _this;
                }
                return AbyssView;
            }(eui.Component));
            boss.AbyssView = AbyssView;
            __reflect(AbyssView.prototype, "game.mod.boss.AbyssView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var CrossBossHurtRewardItem = /** @class */ (function (_super) {
                __extends(CrossBossHurtRewardItem, _super);
                function CrossBossHurtRewardItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                CrossBossHurtRewardItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("22" /* Boss */).retProxy(199 /* Boss */);
                    this.btn_draw.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                    this._rewardList = new ArrayCollection();
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._rewardList;
                };
                CrossBossHurtRewardItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this.btn_draw.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                CrossBossHurtRewardItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var index = this.data.index;
                    var hurt = this.data.hurt;
                    var rewardId = this.data.rewardId;
                    var status = this.data.status;
                    var myRank = this._proxy.getMyPersonalRank();
                    var curHurt = myRank && myRank.value.toNumber() || 0;
                    var hurtStr = game.StringUtil.getHurtNumStr(hurt);
                    var curHurtStr = game.StringUtil.getHurtNumStr(curHurt);
                    var desc = game.StringUtil.substitute(game.getLanById("cross_boss_tips3" /* cross_boss_tips3 */), [hurtStr])
                        + game.TextUtil.addColor("（" + curHurtStr + "/" + hurtStr + "）", curHurt >= hurt ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(desc);
                    var cfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, rewardId);
                    this._rewardList.source = cfg.content.slice(0, 3);
                    var notFinish = status == 2 /* NotFinish */;
                    var canDraw = status == 1 /* Finish */;
                    var hasDraw = status == 3 /* Draw */;
                    this.img_not.visible = notFinish;
                    this.btn_draw.visible = this.btn_draw.redPoint.visible = canDraw;
                    this.img_draw.visible = hasDraw;
                };
                CrossBossHurtRewardItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    var index = this.data.index;
                    this._proxy.c2s_new_cross_boss_hurt_reward(index);
                };
                return CrossBossHurtRewardItem;
            }(mod.BaseRenderer));
            boss.CrossBossHurtRewardItem = CrossBossHurtRewardItem;
            __reflect(CrossBossHurtRewardItem.prototype, "game.mod.boss.CrossBossHurtRewardItem");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var CrossBossHurtRewardView = /** @class */ (function (_super) {
                __extends(CrossBossHurtRewardView, _super);
                function CrossBossHurtRewardView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.CrossBossHurtRewardSkin";
                    return _this;
                }
                return CrossBossHurtRewardView;
            }(eui.Component));
            boss.CrossBossHurtRewardView = CrossBossHurtRewardView;
            __reflect(CrossBossHurtRewardView.prototype, "game.mod.boss.CrossBossHurtRewardView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var facade = base.facade;
            var CrossBossItem = /** @class */ (function (_super) {
                __extends(CrossBossItem, _super);
                function CrossBossItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                CrossBossItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var monsterIndex = cfg.monster_index[0];
                    var monsterCfg = game.getConfigByNameId("monster1.json" /* Monster */, monsterIndex);
                    this.img_icon.source = monsterCfg.res_id;
                    var lv1 = cfg.open[0];
                    var lv2 = cfg.open[1];
                    var nameStr = mod.RoleUtil.getRebirthLvStrNoZhuan(lv1) + "-" + mod.RoleUtil.getRebirthLvStr(lv2);
                    this.lab_name.text = nameStr;
                    var proxy = facade.retMod("22" /* Boss */).retProxy(199 /* Boss */);
                    var canChanllenge = mod.ViewMgr.getIns().checkRebirth(lv1) && proxy.selCrossBossCfg.index == cfg.index;
                    this.img_lock.visible = !canChanllenge;
                };
                return CrossBossItem;
            }(eui.ItemRenderer));
            boss.CrossBossItem = CrossBossItem;
            __reflect(CrossBossItem.prototype, "game.mod.boss.CrossBossItem");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var CrossBossLuckyRewardItem = /** @class */ (function (_super) {
                __extends(CrossBossLuckyRewardItem, _super);
                function CrossBossLuckyRewardItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                CrossBossLuckyRewardItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.lab_name.text = this.data.name;
                    this.lab_value.text = this.data.value.toString();
                };
                return CrossBossLuckyRewardItem;
            }(eui.ItemRenderer));
            boss.CrossBossLuckyRewardItem = CrossBossLuckyRewardItem;
            __reflect(CrossBossLuckyRewardItem.prototype, "game.mod.boss.CrossBossLuckyRewardItem");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var CrossBossLuckyRewardView = /** @class */ (function (_super) {
                __extends(CrossBossLuckyRewardView, _super);
                function CrossBossLuckyRewardView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.CrossBossLuckyRewardSkin";
                    return _this;
                }
                return CrossBossLuckyRewardView;
            }(eui.Component));
            boss.CrossBossLuckyRewardView = CrossBossLuckyRewardView;
            __reflect(CrossBossLuckyRewardView.prototype, "game.mod.boss.CrossBossLuckyRewardView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var CrossBossSceneView = /** @class */ (function (_super) {
                __extends(CrossBossSceneView, _super);
                function CrossBossSceneView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.CrossBossSceneSkin";
                    return _this;
                }
                return CrossBossSceneView;
            }(eui.Component));
            boss.CrossBossSceneView = CrossBossSceneView;
            __reflect(CrossBossSceneView.prototype, "game.mod.boss.CrossBossSceneView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var CrossBossView = /** @class */ (function (_super) {
                __extends(CrossBossView, _super);
                function CrossBossView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.CrossBossSkin";
                    return _this;
                }
                return CrossBossView;
            }(eui.Component));
            boss.CrossBossView = CrossBossView;
            __reflect(CrossBossView.prototype, "game.mod.boss.CrossBossView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var BossRewardShowView = /** @class */ (function (_super) {
                __extends(BossRewardShowView, _super);
                function BossRewardShowView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.BossRewardShowSkin";
                    return _this;
                }
                return BossRewardShowView;
            }(eui.Component));
            boss.BossRewardShowView = BossRewardShowView;
            __reflect(BossRewardShowView.prototype, "game.mod.boss.BossRewardShowView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var BossRewardView = /** @class */ (function (_super) {
                __extends(BossRewardView, _super);
                function BossRewardView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.BossRewardSkin";
                    return _this;
                }
                return BossRewardView;
            }(eui.Component));
            boss.BossRewardView = BossRewardView;
            __reflect(BossRewardView.prototype, "game.mod.boss.BossRewardView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var ManyBossItem = /** @class */ (function (_super) {
                __extends(ManyBossItem, _super);
                function ManyBossItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ManyBossItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var monsterIndex = cfg.monster_index[0];
                    var monsterCfg = game.getConfigByNameId("monster1.json" /* Monster */, monsterIndex);
                    this.img_icon.source = monsterCfg.res_id;
                    //todo，boss类型定义
                    var proxy = facade.retMod("22" /* Boss */).retProxy(199 /* Boss */);
                    this._info = proxy.getBossInfo(cfg.index);
                    var isDied = !this._info || this._info.hp <= 0; //boss已死亡
                    this.img_lock.visible = this.timeItem.visible = isDied;
                    this.bar.visible = !isDied;
                    if (this.bar.visible) {
                        this.bar.show(this._info.hp, 100, false, 0, false, 0 /* Percent */); //boss血量
                    }
                    this.updateTime();
                    // this.redPoint.visible = !isDied && proxy.canChallengeBoss();
                };
                ManyBossItem.prototype.updateTime = function () {
                    if (!this.data || !this._info) {
                        return;
                    }
                    if (!this.timeItem.visible) {
                        return;
                    }
                    var bossTime = this._info.recover_time.toNumber();
                    var nextTime = bossTime - TimeMgr.time.serverTimeSecond;
                    if (nextTime == 0) {
                        facade.sendNt("update_boss_list" /* UPDATE_BOSS_lIST */);
                    }
                    this.timeItem.updateLeftTime(nextTime);
                };
                return ManyBossItem;
            }(eui.ItemRenderer));
            boss.ManyBossItem = ManyBossItem;
            __reflect(ManyBossItem.prototype, "game.mod.boss.ManyBossItem");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ManyBossView = /** @class */ (function (_super) {
                __extends(ManyBossView, _super);
                function ManyBossView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.ManyBossSkin";
                    return _this;
                }
                return ManyBossView;
            }(eui.Component));
            boss.ManyBossView = ManyBossView;
            __reflect(ManyBossView.prototype, "game.mod.boss.ManyBossView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var BossModel = /** @class */ (function () {
                function BossModel() {
                    /**boss挑战次数*/
                    this.bossCount = 0;
                    this.bossChallengeHint = ["22" /* Boss */, "01" /* BossMain */ + "01" /* Many */, "80" /* BossChallenge */]; //挑战红点
                    /**幸运爆率次数*/
                    this.luckyCount = 0;
                    this.personalBossChallengeHint = ["22" /* Boss */, "01" /* BossMain */ + "02" /* Personal */, "81" /* PersonalBossChallenge */]; //挑战红点
                    this.crossBossChallengeHint = ["22" /* Boss */, "01" /* BossMain */ + "04" /* Cross */, "82" /* CrossBossChallenge */]; //挑战红点
                    /************************** vip boss *************************/
                    this.vipBossInfos = {}; // vip boss 基本信息，index 为 new_vip_boss_fuben 表 index
                    this.vipBossFubenCfg = {}; // vip boss 副本配置
                    this.vipBossFubenCfg2 = {}; // vip boss 副本配置
                    this.vipBossCfg = {}; // vip boss 配置
                    this.rebVipBossCfg = {}; // 当前转生数对应的 vip boss 配置列表
                    this.vipBossRebirthIds = []; // 所有可显示的转生 id 列表
                    this.vipBossHint = ["22" /* Boss */, "01" /* BossMain */ + "03" /* Vip */]; //入口、标签页红点
                    /************************** 坠魔深渊 *************************/
                    this.bossList = [];
                    this.total = 0;
                    this.member_num = 0;
                    this.reward_name_list = [];
                    this.duiyou_list = [];
                    this.army_id = 0;
                    this.army_list = [];
                    this.my_team = [];
                    this.army_step = 0;
                    this.guild_step = 0;
                    this.openHours1 = 12;
                    this.openHours2 = 18;
                    this.open_view = false;
                    this.previewId = 260081001;
                }
                return BossModel;
            }());
            boss.BossModel = BossModel;
            __reflect(BossModel.prototype, "game.mod.boss.BossModel");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var PersonalBossView = /** @class */ (function (_super) {
                __extends(PersonalBossView, _super);
                function PersonalBossView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.PersonalBossSkin";
                    return _this;
                }
                return PersonalBossView;
            }(eui.Component));
            boss.PersonalBossView = PersonalBossView;
            __reflect(PersonalBossView.prototype, "game.mod.boss.PersonalBossView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var VipBossItemRender = /** @class */ (function (_super) {
                __extends(VipBossItemRender, _super);
                function VipBossItemRender() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.VipBossItemSkin";
                    return _this;
                }
                VipBossItemRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.lab_name, this.onClick, this);
                };
                VipBossItemRender.prototype.onRemoveFromStage = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onRemoveFromStage.call(this);
                };
                VipBossItemRender.prototype.dataChanged = function () {
                    if (!this.data || !this.data.info) {
                        return;
                    }
                    var cfg = this.data.cfg;
                    var fbCfg = game.getConfigByNameId("new_vip_boss_fuben.json" /* NewVipBossFuben */, cfg.index % 10);
                    this.addBmpFont(fbCfg.VIP_lv + "", game.BmpTextCfg[104 /* MainVip */], this.grp_vip_num);
                    var mcfg = game.getConfigByNameId("monster1.json" /* Monster */, fbCfg.bossId[0]);
                    this.img_icon.source = mcfg.res_id;
                    this._time = this.data.info.next_boss_time - TimeMgr.time.serverTimeSecond;
                    if (this._time > 0) { // cd 时间
                        this.timeItem.visible = true;
                        this.lab_name.visible = false;
                        this.update(null);
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                    else {
                        this.timeItem.visible = false;
                        this.lab_name.visible = true;
                        if (this.data.state == 1 /* NonActivited */) { // 未激活
                            this.lab_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt("前往激活", 16773203 /* YELLOW */, ""));
                        }
                        else { // 可挑战、或可碾压
                            this.lab_name.text = "已刷新";
                        }
                        TimeMgr.removeUpdateItem(this);
                    }
                    //cd或者未激活
                    this.img_lock.visible = this._time > 0 || this.data.state == 1 /* NonActivited */; // (this.data.state == VipBossState.CD || this.data.state == VipBossState.NonActivited);
                    this.redPoint.visible = !this.img_lock.visible;
                };
                //倒计时
                VipBossItemRender.prototype.update = function (time) {
                    this._time--;
                    this.timeItem.updateLeftTime(this._time);
                    if (this._time <= 0) {
                        this.dataChanged();
                        TimeMgr.removeUpdateItem(this);
                    }
                };
                VipBossItemRender.prototype.onClick = function (e) {
                    if (!this.data || !this.data.info) {
                        return;
                    }
                    if (this.data.state == 1 /* NonActivited */) {
                        mod.ViewMgr.getIns().openCommonRechargeView();
                    }
                };
                return VipBossItemRender;
            }(mod.BaseRenderer));
            boss.VipBossItemRender = VipBossItemRender;
            __reflect(VipBossItemRender.prototype, "game.mod.boss.VipBossItemRender", ["base.UpdateItem"]);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var VipBossView = /** @class */ (function (_super) {
                __extends(VipBossView, _super);
                function VipBossView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.boss.VipBossSkin";
                    return _this;
                }
                return VipBossView;
            }(eui.Component));
            boss.VipBossView = VipBossView;
            __reflect(VipBossView.prototype, "game.mod.boss.VipBossView");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var BossMainMdr = /** @class */ (function (_super) {
                __extends(BossMainMdr, _super);
                function BossMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Many */,
                            icon: "many_tab",
                            mdr: boss.ManyBossMdr,
                            title: "many_boss_title" /* many_boss_title */,
                            bg: "manyboss_bg",
                            hintTypes: ["22" /* Boss */, "01" /* BossMain */ + "01" /* Many */],
                        },
                        {
                            btnType: "02" /* Personal */,
                            icon: "personal_tab",
                            mdr: boss.PersonalBossMdr,
                            title: "boss_cue1" /* boss_cue1 */,
                            openIdx: 1041670116 /* PersonalBoss */,
                            bg: "",
                            hintTypes: ["22" /* Boss */, "01" /* BossMain */ + "02" /* Personal */],
                        },
                        {
                            btnType: "03" /* Vip */,
                            icon: "vip_tab",
                            mdr: boss.VipBossMdr,
                            title: "boss_vip" /* boss_vip */,
                            openIdx: 1041670117 /* VipBoss */,
                            bg: "manyboss_bg",
                            hintTypes: ["22" /* Boss */, "01" /* BossMain */ + "03" /* Vip */],
                        },
                        {
                            btnType: "04" /* Cross */,
                            icon: "cross_tab",
                            mdr: boss.CrossBossMdr,
                            title: "cross_boss_tips1" /* cross_boss_tips1 */,
                            openIdx: 1041670119 /* CrossBoss */,
                            bg: "crossboss_bg",
                            hintTypes: ["22" /* Boss */, "01" /* BossMain */ + "04" /* Cross */],
                        },
                        {
                            btnType: "05" /* Abyss */,
                            icon: "zhuimoshenyuanbiaoqiantubiao",
                            mdr: boss.AbyssMdr,
                            title: "zhuimoshenyuan_tips9" /* zhuimoshenyuan_tips9 */,
                            openIdx: 1041670237 /* Abyss */,
                            bg: "zhuimoshenyuanbeijingtu",
                            hintTypes: ["22" /* Boss */, "01" /* BossMain */ + "05" /* Abyss */],
                        }
                    ];
                    return _this;
                }
                return BossMainMdr;
            }(mod.WndBaseMdr));
            boss.BossMainMdr = BossMainMdr;
            __reflect(BossMainMdr.prototype, "game.mod.boss.BossMainMdr");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var AbyssBossListMdr = /** @class */ (function (_super) {
                __extends(AbyssBossListMdr, _super);
                function AbyssBossListMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", boss.AbyssBossListView);
                    _this.isEasyHide = true;
                    return _this;
                }
                AbyssBossListMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = boss.AbyssBossItem;
                    this._view.list_item.dataProvider = this._itemList;
                    this._proxy = this.retProxy(199 /* Boss */);
                };
                AbyssBossListMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                    this.onNt("boss_list_info_update" /* BOSS_LIST_INFO_UPDATE */, this.updateBoss, this);
                };
                AbyssBossListMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.reqBossInfo();
                    this.updateBoss();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                AbyssBossListMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                /**更新boss*/
                AbyssBossListMdr.prototype.updateBoss = function () {
                    var bossList = this._proxy.bossList.concat();
                    game.SortTools.sortMap(bossList, "index");
                    this._itemList.replaceAll(bossList);
                };
                AbyssBossListMdr.prototype.update = function (time) {
                    // todo 只更新时间 时间结束再请求
                    this.reqBossInfo();
                };
                AbyssBossListMdr.prototype.reqBossInfo = function () {
                    this._proxy.c2s_zhuimo_boss_info();
                };
                return AbyssBossListMdr;
            }(game.MdrBase));
            boss.AbyssBossListMdr = AbyssBossListMdr;
            __reflect(AbyssBossListMdr.prototype, "game.mod.boss.AbyssBossListMdr", ["base.UpdateItem"]);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ArrayCollection = eui.ArrayCollection;
            var AbyssInviteListMdr = /** @class */ (function (_super) {
                __extends(AbyssInviteListMdr, _super);
                function AbyssInviteListMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", boss.AbyssTeamListView);
                    _this.isEasyHide = true;
                    return _this;
                }
                AbyssInviteListMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this.onInitList();
                };
                AbyssInviteListMdr.prototype.onInitList = function () {
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = boss.AbyssInviteItem;
                    this._view.list_item.dataProvider = this._itemList;
                };
                AbyssInviteListMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                    this.onNt("on_abyss_team_invite_update" /* ON_ABYSS_TEAM_INVITE_UPDATE */, this.onUpdateView, this);
                };
                AbyssInviteListMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.c2s_zhuimo_army_ui_show(1);
                };
                AbyssInviteListMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                AbyssInviteListMdr.prototype.onUpdateView = function () {
                    this._itemList.replaceAll(this._proxy.duiyou_list);
                };
                return AbyssInviteListMdr;
            }(game.MdrBase));
            boss.AbyssInviteListMdr = AbyssInviteListMdr;
            __reflect(AbyssInviteListMdr.prototype, "game.mod.boss.AbyssInviteListMdr");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var ArrayCollection = eui.ArrayCollection;
            var AbyssLuckyMdr = /** @class */ (function (_super) {
                __extends(AbyssLuckyMdr, _super);
                function AbyssLuckyMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", boss.AbyssLuckyView);
                    _this._showPoint = false; //是否显示点数
                    _this.TIME_TICK = 10; //10秒
                    _this.isEasyHide = true;
                    return _this;
                }
                AbyssLuckyMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = boss.AbyssLuckyItem;
                    this._view.list_item.dataProvider = this._itemList;
                };
                AbyssLuckyMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                };
                AbyssLuckyMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateReward();
                    this.updateViewState();
                };
                AbyssLuckyMdr.prototype.onHide = function () {
                    this._showPoint = false;
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                AbyssLuckyMdr.prototype.onClickReward = function () {
                    this.changeShowPoint();
                };
                AbyssLuckyMdr.prototype.changeShowPoint = function () {
                    this._showPoint = true;
                    this.updateViewState();
                    TimeMgr.removeUpdateItem(this);
                };
                AbyssLuckyMdr.prototype.updateReward = function () {
                    var info = this._showArgs;
                    var index = info.index;
                    var cfg = game.getConfigByNameId("zhuimo_boss.json" /* ZhuimoBoss */, index);
                    var rewardIndex = cfg.rare_reward_show;
                    this._view.icon.setData(rewardIndex);
                    this._view.lab_name.textFlow = this._view.icon.getPropName();
                };
                AbyssLuckyMdr.prototype.updateViewState = function () {
                    this._view.currentState = this._showPoint ? "2" : "1";
                    if (this._showPoint) {
                        this.updateInfo();
                    }
                    else {
                        this._view.lab_point.text = game.getLanById("yijie_tips6" /* yijie_tips6 */) + "：" + game.getLanById("yijie_tips7" /* yijie_tips7 */);
                        this._time = this.TIME_TICK;
                        this.updateTime();
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                };
                /**显示点数*/
                AbyssLuckyMdr.prototype.updateInfo = function () {
                    var info = this._showArgs;
                    var myPoint = info.my_roll_point;
                    var pointStr = game.getLanById("yijie_tips6" /* yijie_tips6 */) + "：" + game.TextUtil.addColor(myPoint + "", 2330156 /* GREEN */) + game.getLanById("yijie_tips9" /* yijie_tips9 */);
                    this._view.lab_point.textFlow = game.TextUtil.parseHtml(pointStr);
                    game.SortTools.sortMap(info.point_list, "value", 2 /* LOWER */); //排序
                    var ranks = info.point_list;
                    var firstInfo = ranks[0];
                    var firstStr = game.getLanById("yijie_tips8" /* yijie_tips8 */) + "：" + game.TextUtil.addColor(firstInfo.value + "", 2330156 /* GREEN */) + game.getLanById("yijie_tips9" /* yijie_tips9 */);
                    this._view.lab_first.textFlow = game.TextUtil.parseHtml(firstStr);
                    this._itemList.source = ranks;
                };
                AbyssLuckyMdr.prototype.updateTime = function () {
                    var tipsStr = game.getLanById("yijie_tips10" /* yijie_tips10 */) + "\n" + game.TextUtil.addColor(this._time + game.getLanById("yijie_tips11" /* yijie_tips11 */), 2330156 /* GREEN */);
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(tipsStr);
                };
                AbyssLuckyMdr.prototype.update = function (time) {
                    this._time--;
                    if (this._time <= 0) {
                        this.changeShowPoint();
                    }
                    this.updateTime();
                };
                return AbyssLuckyMdr;
            }(game.MdrBase));
            boss.AbyssLuckyMdr = AbyssLuckyMdr;
            __reflect(AbyssLuckyMdr.prototype, "game.mod.boss.AbyssLuckyMdr", ["base.UpdateItem"]);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var AbyssMdr = /** @class */ (function (_super) {
                __extends(AbyssMdr, _super);
                function AbyssMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", boss.AbyssView);
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                AbyssMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._listData;
                };
                AbyssMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickFight);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickPreview);
                    this.onNt("on_abyss_main_update" /* ON_ABYSS_MAIN_UPDATE */, this.onUpdateView, this);
                };
                AbyssMdr.prototype.onShow = function () {
                    this._proxy.c2s_zhuimo_open_ui();
                    _super.prototype.onShow.call(this);
                    this.endTime = this._proxy.openTime;
                    this.update(TimeMgr.time);
                    TimeMgr.addUpdateItem(this, 1000);
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(game.getLanById("zhuimoshenyuan_tips4" /* zhuimoshenyuan_tips4 */));
                };
                AbyssMdr.prototype.onUpdateView = function () {
                    var strs = this._proxy.reward_name_list;
                    this._view.lab_name.text = strs && strs.length ? strs.join("\n") : game.getLanById("tishi_2" /* tishi_2 */);
                    var list = this._proxy.zhuimo_jiangli.filter(function (v, i) {
                        return i < 10;
                    });
                    this._listData.replaceAll(list);
                    this._view.icon.setData(this._proxy.zhuimo_dajiang);
                    this._view.costIcon.updateShow(this._proxy.zhuimo_cost);
                };
                AbyssMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    TimeMgr.removeUpdateItem(this);
                };
                AbyssMdr.prototype.onClickFight = function () {
                    this._proxy.c2s_zhuimo_boss_challenge();
                };
                AbyssMdr.prototype.onClickAdd = function () {
                    mod.ViewMgr.getIns().showGainWaysTips(this._proxy.zhuimo_cost[0]);
                };
                AbyssMdr.prototype.onClickPreview = function () {
                    mod.ViewMgr.getIns().bossReward(this._proxy.preview_id, ["组队模式共享尾刀奖励", "击败BOSS有几率触发roll点获取坠魔宝匣"]);
                };
                AbyssMdr.prototype.update = function (time) {
                    if (!this._endTime) {
                        this.endTime = this._proxy.openTime;
                        if (!this._endTime) {
                            return;
                        }
                    }
                    var leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this.endTime = this._proxy.openTime;
                        return;
                    }
                    this._view.timeItem.updateLeftTime(leftTime);
                };
                Object.defineProperty(AbyssMdr.prototype, "endTime", {
                    set: function (v) {
                        if (this._endTime == v) {
                            return;
                        }
                        var bool = !v;
                        this._view.btn_challenge.visible = bool;
                        if (bool) {
                            this._view.btn_challenge.setHint(mod.HintMgr.getHint(["22" /* Boss */, "01" /* BossMain */ + "05" /* Abyss */]));
                        }
                        this._view.timeItem.visible = !bool;
                        this._endTime = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AbyssMdr;
            }(game.EffectMdrBase));
            boss.AbyssMdr = AbyssMdr;
            __reflect(AbyssMdr.prototype, "game.mod.boss.AbyssMdr", ["base.UpdateItem"]);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ArrayCollection = eui.ArrayCollection;
            var AbyssMyTeamMdr = /** @class */ (function (_super) {
                __extends(AbyssMyTeamMdr, _super);
                function AbyssMyTeamMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", boss.AbyssMyTeamView);
                    _this.isEasyHide = true;
                    return _this;
                }
                AbyssMyTeamMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this.onInitList();
                };
                AbyssMyTeamMdr.prototype.onInitList = function () {
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = boss.AbyssMyTeamItem;
                    this._view.list_item.dataProvider = this._itemList;
                };
                AbyssMyTeamMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                    // this.onNt(BossEvent.ON_ABYSS_TEAM_UPDATE, this.onUpdateView, this);
                };
                AbyssMyTeamMdr.prototype.onShow = function () {
                    // this._proxy.c2s_zhuimo_army_ui_show(3);
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                AbyssMyTeamMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                AbyssMyTeamMdr.prototype.onUpdateView = function () {
                    if (this._proxy.my_team.length < 3) {
                        this._proxy.my_team.length = 3;
                    }
                    this._itemList.replaceAll(this._proxy.my_team);
                    var str = game.TextUtil.addColor("+" + this._proxy.team_add_hurt / 100 + "%", 2330156 /* GREEN */);
                    this._view.lab_hurt.textFlow = game.TextUtil.parseHtml("\u7EC4\u961F\u589E\u76CA: \u4F24\u5BB3" + str);
                };
                return AbyssMyTeamMdr;
            }(game.MdrBase));
            boss.AbyssMyTeamMdr = AbyssMyTeamMdr;
            __reflect(AbyssMyTeamMdr.prototype, "game.mod.boss.AbyssMyTeamMdr");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TouchEvent = egret.TouchEvent;
            var AbyssNoTeamMdr = /** @class */ (function (_super) {
                __extends(AbyssNoTeamMdr, _super);
                function AbyssNoTeamMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", boss.AbyssNoTeamView);
                    _this.isEasyHide = true;
                    return _this;
                }
                AbyssNoTeamMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                };
                AbyssNoTeamMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_invite, TouchEvent.TOUCH_TAP, this.onClickInvite);
                    addEventListener(this._view.btn_union, TouchEvent.TOUCH_TAP, this.onClickUnion);
                    addEventListener(this._view.btn_team, TouchEvent.TOUCH_TAP, this.onClickTeam);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                };
                AbyssNoTeamMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.lab_tips1.textFlow = game.TextUtil.parseHtml(game.getLanById("zhuimoshenyuan_tips1" /* zhuimoshenyuan_tips1 */));
                    this._view.lab_tips2.textFlow = game.TextUtil.parseHtml(game.getLanById("zhuimoshenyuan_tips2" /* zhuimoshenyuan_tips2 */));
                };
                AbyssNoTeamMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                AbyssNoTeamMdr.prototype.onClickInvite = function () {
                    this.hide();
                    mod.ViewMgr.getIns().showSecondPop("22" /* Boss */, "12" /* AbyssInvite */);
                };
                AbyssNoTeamMdr.prototype.onClickUnion = function () {
                    this._proxy.c2s_zhuimo_army_ui_show(2);
                };
                AbyssNoTeamMdr.prototype.onClickTeam = function () {
                    this.hide();
                    mod.ViewMgr.getIns().showSecondPop("22" /* Boss */, "11" /* AbyssTeam */);
                };
                return AbyssNoTeamMdr;
            }(game.MdrBase));
            boss.AbyssNoTeamMdr = AbyssNoTeamMdr;
            __reflect(AbyssNoTeamMdr.prototype, "game.mod.boss.AbyssNoTeamMdr");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var AbyssRewardMdr = /** @class */ (function (_super) {
                __extends(AbyssRewardMdr, _super);
                function AbyssRewardMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", boss.AbyssRewardView);
                    _this.isEasyHide = true;
                    return _this;
                }
                AbyssRewardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                };
                AbyssRewardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_confirm, TouchEvent.TOUCH_TAP, this.hide);
                };
                AbyssRewardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateReward();
                };
                AbyssRewardMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                AbyssRewardMdr.prototype.updateReward = function () {
                    this._itemList.replaceAll(this._showArgs);
                };
                return AbyssRewardMdr;
            }(game.MdrBase));
            boss.AbyssRewardMdr = AbyssRewardMdr;
            __reflect(AbyssRewardMdr.prototype, "game.mod.boss.AbyssRewardMdr");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var AbyssSceneMdr = /** @class */ (function (_super) {
                __extends(AbyssSceneMdr, _super);
                function AbyssSceneMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", boss.AbyssSceneView);
                    return _this;
                }
                AbyssSceneMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.percentHeight = 100;
                    this._view.percentWidth = 100;
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                };
                AbyssSceneMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    addEventListener(this._view.btn_boss, TouchEvent.TOUCH_TAP, this.onClickBoss);
                    addEventListener(this._view.btn_team, TouchEvent.TOUCH_TAP, this.onClickTeam);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    this.onNt("on_abyss_hurt_update" /* ON_ABYSS_HURT_UPDATE */, this.onUpdateTeam, this);
                    this.onNt("on_abyss_scene_update" /* ON_ABYSS_SCENE_UPDATE */, this.updateInfo, this);
                    this.onNt("on_scene_max_hurt_update" /* ON_SCENE_MAX_HURT_UPDATE */, this.onUpdateHead, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateIndex, this);
                };
                AbyssSceneMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._endTime = this._proxy.endTime;
                    this.updateInfo();
                    this.updateCost();
                    this.onUpdateTeam();
                    this.onUpdateHead();
                    this.update(TimeMgr.time);
                    TimeMgr.addUpdateItem(this, 1000);
                };
                AbyssSceneMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                AbyssSceneMdr.prototype.onClickReward = function () {
                    this._proxy.c2s_zhuimo_show_reward();
                };
                AbyssSceneMdr.prototype.onClickBoss = function () {
                    mod.ViewMgr.getIns().showSecondPop("22" /* Boss */, "09" /* AbyssList */);
                };
                AbyssSceneMdr.prototype.onClickTeam = function () {
                    // if (this._proxy.my_team && this._proxy.my_team.length > 1) {
                    //     ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.AbyssMyTeam);
                    // } else {
                    //     ViewMgr.getIns().showSecondPop(ModName.Boss, BossViewType.AbyssNoTeam);
                    // }
                    this._proxy.c2s_zhuimo_army_ui_show(3);
                };
                AbyssSceneMdr.prototype.onClickAdd = function () {
                    // let param:ParamConfig = GameConfig.getParamConfigById("")
                    mod.ViewMgr.getIns().showGainWaysTips(this._costIdx);
                };
                /** 通用背包事件监听 */
                AbyssSceneMdr.prototype.onBagUpdateIndex = function (n) {
                    var indexs = n.body;
                    if (indexs.indexOf(this._costIdx) < 0) {
                        return;
                    }
                    this.updateCost();
                };
                AbyssSceneMdr.prototype.updateInfo = function () {
                    var peopleStr = "副本人数：" + game.TextUtil.addColor("" + this._proxy.total, 8585074 /* GREEN */);
                    this._view.lab_people.textFlow = game.TextUtil.parseHtml(peopleStr);
                    var cntStr = game.getLanById("yijie_tips4" /* yijie_tips4 */) + "：" + game.TextUtil.addColor("" + this._proxy.memberNum, 8585074 /* GREEN */);
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                };
                AbyssSceneMdr.prototype.onUpdateTeam = function () {
                    this._view.lab_hurt.text = "\u4F24\u5BB3+" + this._proxy.team_add_hurt / 100 + "%";
                };
                AbyssSceneMdr.prototype.onUpdateHead = function () {
                    var info = mod.SceneUtil.getMaxHurt();
                    this._view.grp_hurt.visible = !!info;
                    if (info) {
                        this._view.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
                        this._view.lab_name.text = info.name;
                    }
                };
                AbyssSceneMdr.prototype.updateCost = function () {
                    // let cost = this._proxy.getCost();
                    var index = this._proxy.zhuimo_cost[0];
                    var cnt = this._proxy.zhuimo_cost[1];
                    this._costIdx = index;
                    this._view.cost.updateShow([index, cnt]);
                };
                AbyssSceneMdr.prototype.update = function (time) {
                    var leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    this._view.timeItem.updateLeftTime(leftTime);
                };
                return AbyssSceneMdr;
            }(game.MdrBase));
            boss.AbyssSceneMdr = AbyssSceneMdr;
            __reflect(AbyssSceneMdr.prototype, "game.mod.boss.AbyssSceneMdr", ["base.UpdateItem"]);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ArrayCollection = eui.ArrayCollection;
            var AbyssTeamListMdr = /** @class */ (function (_super) {
                __extends(AbyssTeamListMdr, _super);
                function AbyssTeamListMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", boss.AbyssTeamListView);
                    _this.isEasyHide = true;
                    return _this;
                }
                AbyssTeamListMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this.onInitList();
                };
                AbyssTeamListMdr.prototype.onInitList = function () {
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = boss.AbyssTeamItem;
                    this._view.list_item.dataProvider = this._itemList;
                };
                AbyssTeamListMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                    // this.onNt(BossEvent.ON_ABYSS_TEAM_ADD_UPDATE, this.onUpdateView, this);
                };
                AbyssTeamListMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    // this._proxy.c2s_zhuimo_army_ui_show(3);
                    this.onUpdateView();
                };
                AbyssTeamListMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                AbyssTeamListMdr.prototype.onUpdateView = function () {
                    this._itemList.replaceAll(this._proxy.army_list);
                };
                return AbyssTeamListMdr;
            }(game.MdrBase));
            boss.AbyssTeamListMdr = AbyssTeamListMdr;
            __reflect(AbyssTeamListMdr.prototype, "game.mod.boss.AbyssTeamListMdr");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TimeMgr = base.TimeMgr;
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var AbyssTipsMdr = /** @class */ (function (_super) {
                __extends(AbyssTipsMdr, _super);
                function AbyssTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.BossTipsView);
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                AbyssTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._listData;
                };
                AbyssTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClick);
                };
                AbyssTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._endTime = this._proxy.endTime;
                    TimeMgr.addUpdateItem(this, 1000);
                    this.onUpdateView();
                };
                AbyssTipsMdr.prototype.onUpdateView = function () {
                    var list = this._proxy.zhuimo_jiangli.filter(function (v, i) {
                        return i < 4;
                    });
                    this._listData.replaceAll(list);
                    this.update(TimeMgr.time);
                    this._view.lab_desc.textFlow = game.TextUtil.parseHtml(game.getLanById("zhuimoshenyuan_tips3" /* zhuimoshenyuan_tips3 */));
                    this._view.btn_get.setEffect("tiaozhan" /* Tiaozhan */);
                };
                AbyssTipsMdr.prototype.onClick = function () {
                    // this._proxy.c2s_zhuimo_boss_challenge();
                    mod.ViewMgr.getIns().showView("22" /* Boss */, "01" /* BossMain */, "05" /* Abyss */);
                    this.hide();
                };
                AbyssTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    TimeMgr.removeUpdateItem(this);
                    mod.PropTipsMgr.getIns().closeBoss(); //继续boss弹窗
                };
                AbyssTipsMdr.prototype.update = function (time) {
                    var leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this.hide();
                        return;
                    }
                    this._view.timeItem.updateLeftTime(leftTime);
                };
                return AbyssTipsMdr;
            }(game.EffectMdrBase));
            boss.AbyssTipsMdr = AbyssTipsMdr;
            __reflect(AbyssTipsMdr.prototype, "game.mod.boss.AbyssTipsMdr", ["base.UpdateItem"]);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ArrayCollection = eui.ArrayCollection;
            var CrossBossGuildRankMdr = /** @class */ (function (_super) {
                __extends(CrossBossGuildRankMdr, _super);
                function CrossBossGuildRankMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    return _this;
                }
                CrossBossGuildRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankRewardRender;
                    this._view.list_rank.dataProvider = this._itemList;
                };
                CrossBossGuildRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_scene_rank_update" /* ON_SCENE_RANK_UPDATE */, this.updateShow, this);
                };
                CrossBossGuildRankMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.updateShow();
                };
                CrossBossGuildRankMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                CrossBossGuildRankMdr.prototype.initShow = function () {
                    this._view.btn_god.visible = false;
                    this._view.img_type2.source = "shanghai";
                    this._view.img_type3.source = "paimingjiangli";
                    this._view.img_myRank.visible = false;
                    this._view.lab_rank.x = this._view.img_myRank.x;
                };
                CrossBossGuildRankMdr.prototype.updateShow = function () {
                    var limit = this._proxy.selCrossBossCfg.rank_limit1;
                    if (limit) {
                        var rankStr = game.StringUtil.substitute(game.getLanById("cross_boss_tips7" /* cross_boss_tips7 */), [game.StringUtil.getHurtNumStr(limit)]);
                        this._view.lab_rank.text = rankStr;
                    }
                    else {
                        this._view.lab_rank.text = "";
                    }
                    var ranks = this._proxy.getGuildRanks();
                    var topInfo = ranks && ranks.length ? ranks[0] : null;
                    if (topInfo && topInfo.value && (topInfo.value.toNumber() >= limit || !this._proxy.crossBossSceneRank)) {
                        //场景排行榜做上榜限制
                        var leaderInfo = topInfo.leaderinfo;
                        this.updateRankUIRole(this._view.grp_eff, leaderInfo);
                    }
                    var myRankInfo = this._proxy.getMyGuildRank();
                    var count = myRankInfo && myRankInfo.value ? myRankInfo.value.toNumber() : 0;
                    this._view.lab_num.text = game.getLanById("cross_boss_tips9" /* cross_boss_tips9 */) + "：" + game.StringUtil.getHurtNumStr(count); //宗门伤害：0
                    var infos = [];
                    for (var i = 0; i < game.MAX_RANK_NUM; ++i) {
                        var rank = i + 1;
                        var name = game.getLanById("tishi_2" /* tishi_2 */); //虚位以待
                        var hurtStr = "";
                        var reward = this.getReward(rank);
                        var rankInfo = ranks.length > i ? ranks[i] : null;
                        if (rankInfo && (rankInfo.value.toNumber() >= limit || !this._proxy.crossBossSceneRank)) {
                            //场景排行榜做上榜限制
                            name = rankInfo.guild_name + "\n" + game.getLanById("cross_boss_tips10" /* cross_boss_tips10 */) + "：" + rankInfo.leaderinfo.name;
                            hurtStr = game.StringUtil.getHurtNumStr(rankInfo.value.toNumber());
                        }
                        var info = {
                            rank: rank,
                            name: name,
                            hurtStr: hurtStr,
                            reward: reward
                        };
                        infos.push(info);
                    }
                    this._itemList.replaceAll(infos);
                };
                CrossBossGuildRankMdr.prototype.getReward = function (rank) {
                    var rewards = this._proxy.selCrossBossCfg.rank_reward_show1;
                    for (var _i = 0, rewards_1 = rewards; _i < rewards_1.length; _i++) {
                        var info = rewards_1[_i];
                        var rankStart = info[0];
                        var rankEnd = info[1];
                        if (rank >= rankStart && rank <= rankEnd) {
                            var rewardId = info[2];
                            var cfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, rewardId);
                            return cfg.content.slice(0, 3);
                        }
                    }
                    return [];
                };
                return CrossBossGuildRankMdr;
            }(game.EffectMdrBase));
            boss.CrossBossGuildRankMdr = CrossBossGuildRankMdr;
            __reflect(CrossBossGuildRankMdr.prototype, "game.mod.boss.CrossBossGuildRankMdr");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ArrayCollection = eui.ArrayCollection;
            var CrossBossHurtRewardMdr = /** @class */ (function (_super) {
                __extends(CrossBossHurtRewardMdr, _super);
                function CrossBossHurtRewardMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", boss.CrossBossHurtRewardView);
                    _this.isEasyHide = true;
                    return _this;
                }
                CrossBossHurtRewardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = boss.CrossBossHurtRewardItem;
                    this._view.list_reward.dataProvider = this._itemList;
                    this._proxy = this.retProxy(199 /* Boss */);
                };
                CrossBossHurtRewardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                    this.onNt("on_cross_boss_reward_update" /* ON_CROSS_BOSS_REWARD_UPDATE */, this.updateReward, this);
                    this.onNt("on_scene_rank_update" /* ON_SCENE_RANK_UPDATE */, this.updateReward, this);
                };
                CrossBossHurtRewardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateReward();
                };
                CrossBossHurtRewardMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                CrossBossHurtRewardMdr.prototype.updateReward = function () {
                    var rewards = this._proxy.selCrossBossCfg.hurt_reward_show;
                    var infos = [];
                    for (var i = 0; i < rewards.length; ++i) {
                        var index = i + 1;
                        var info = rewards[i];
                        var hurt = info[0];
                        var rewardId = info[1];
                        var status = this._proxy.getCrossBossRewardStatus(index);
                        infos.push({ index: index, hurt: hurt, rewardId: rewardId, status: status });
                    }
                    game.SortTools.sortMap(infos, "status"); //排序
                    if (this._itemList.source.length) {
                        this._itemList.replaceAll(infos);
                    }
                    else {
                        this._itemList.source = infos;
                    }
                };
                return CrossBossHurtRewardMdr;
            }(game.MdrBase));
            boss.CrossBossHurtRewardMdr = CrossBossHurtRewardMdr;
            __reflect(CrossBossHurtRewardMdr.prototype, "game.mod.boss.CrossBossHurtRewardMdr");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var CrossBossLuckyRewardMdr = /** @class */ (function (_super) {
                __extends(CrossBossLuckyRewardMdr, _super);
                function CrossBossLuckyRewardMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", boss.CrossBossLuckyRewardView);
                    _this._showPoint = false; //是否显示点数
                    _this.TIME_TICK = 10; //10秒
                    return _this;
                }
                CrossBossLuckyRewardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = boss.CrossBossLuckyRewardItem;
                    this._view.list_item.dataProvider = this._itemList;
                };
                CrossBossLuckyRewardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.onClickClose);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                };
                CrossBossLuckyRewardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateReward();
                    this.updateViewState();
                };
                CrossBossLuckyRewardMdr.prototype.onHide = function () {
                    this._showPoint = false;
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                CrossBossLuckyRewardMdr.prototype.onClickClose = function () {
                    if (!this._showPoint) {
                        this.checkMyFirst();
                    }
                    this.hide();
                };
                CrossBossLuckyRewardMdr.prototype.onClickReward = function () {
                    this.changeShowPoint();
                };
                CrossBossLuckyRewardMdr.prototype.updateReward = function () {
                    var info = this._showArgs;
                    var percent = info.percent / 100;
                    var percentStr = game.TextUtil.addColor(percent + "%", 2330156 /* GREEN */);
                    var tipsStr = game.StringUtil.substitute(game.getLanById("cross_boss_tips5" /* cross_boss_tips5 */), [percentStr]);
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(tipsStr);
                    var rewards = this._proxy.selCrossBossCfg.lucky_reward;
                    this._view.icon.setData(rewards[0]);
                };
                CrossBossLuckyRewardMdr.prototype.changeShowPoint = function () {
                    this._showPoint = true;
                    this.updateViewState();
                    TimeMgr.removeUpdateItem(this);
                };
                CrossBossLuckyRewardMdr.prototype.updateViewState = function () {
                    this._view.currentState = this._showPoint ? "2" : "1";
                    if (this._showPoint) {
                        this.updateInfo();
                    }
                    else {
                        this._time = this.TIME_TICK;
                        this.updateTime();
                        TimeMgr.addUpdateItem(this, 1000);
                        this.addEftByParent("kuafuboss_1" /* CrossBoss1 */, this._view.btn_reward.group_eft);
                    }
                };
                /**显示点数*/
                CrossBossLuckyRewardMdr.prototype.updateInfo = function () {
                    var info = this._showArgs;
                    var myPoint = info.my_roll_point;
                    this._view.lab_value.text = myPoint + "";
                    game.SortTools.sortMap(info.point_list, "value", 2 /* LOWER */); //排序
                    var ranks = info.point_list;
                    var firstInfo = ranks[0];
                    var firstStr = game.getLanById("cross_boss_tips11" /* cross_boss_tips11 */) + "：" + firstInfo.name;
                    this._view.lab_first.text = firstStr;
                    this._itemList.source = ranks;
                    var isFirst = firstInfo.role_id.eq(game.RoleVo.ins.role_id);
                    this.checkMyFirst(isFirst);
                };
                CrossBossLuckyRewardMdr.prototype.updateTime = function () {
                    this._view.lab_time.text = "(" + this._time + game.getLanById("shijian_4" /* shijian_4 */) + ")";
                };
                CrossBossLuckyRewardMdr.prototype.update = function (time) {
                    this._time--;
                    if (this._time <= 0) {
                        this.changeShowPoint();
                    }
                    this.updateTime();
                };
                CrossBossLuckyRewardMdr.prototype.checkMyFirst = function (isFirst) {
                    if (isFirst == undefined) {
                        var info = this._showArgs;
                        var ranks = info.point_list;
                        game.SortTools.sortMap(ranks, "value", 2 /* LOWER */); //排序
                        var firstInfo = ranks[0];
                        isFirst = firstInfo.role_id.eq(game.RoleVo.ins.role_id);
                    }
                    if (isFirst) {
                        var rewards = this._proxy.selCrossBossCfg.lucky_reward;
                        mod.PropTipsMgr.getIns().showBestPropArray(rewards);
                    }
                };
                return CrossBossLuckyRewardMdr;
            }(game.EffectMdrBase));
            boss.CrossBossLuckyRewardMdr = CrossBossLuckyRewardMdr;
            __reflect(CrossBossLuckyRewardMdr.prototype, "game.mod.boss.CrossBossLuckyRewardMdr", ["base.UpdateItem"]);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var Event = egret.Event;
            var TimeMgr = base.TimeMgr;
            var TextEvent = egret.TextEvent;
            var Handler = base.Handler;
            var CrossBossMdr = /** @class */ (function (_super) {
                __extends(CrossBossMdr, _super);
                function CrossBossMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", boss.CrossBossView);
                    _this.TIME_TICK = 3; //定时请求boss信息
                    _this._lastShowTime = true; //显示复活倒计时
                    return _this;
                }
                CrossBossMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                    this._bossList = new ArrayCollection();
                    this._view.list_boss.itemRenderer = boss.CrossBossItem;
                    this._view.list_boss.dataProvider = this._bossList;
                };
                CrossBossMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_boss, Event.CHANGING, this.onClickBoss);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
                    addEventListener(this._view.lab_rank, TextEvent.LINK, this.onClickRank);
                    this._view.lab_rank.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(game.getLanById("pass_rank" /* pass_rank */), 8585074 /* GREEN */, ""));
                    this.onNt("on_cross_boss_update" /* ON_CROSS_BOSS_UPDATE */, this.onInfoUpdate, this);
                    this.onNt("on_cross_boss_rank_update" /* ON_CROSS_BOSS_RANK_UPDATE */, this.updateRank, this);
                };
                CrossBossMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateItemList();
                    this.indexUpdateInfo();
                    this.reqBossInfo();
                    this.reqRankInfo();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                CrossBossMdr.prototype.onHide = function () {
                    this._effId = 0;
                    this._lastIndex = 0;
                    this._lastShowTime = true;
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                CrossBossMdr.prototype.onClickBoss = function (e) {
                    var index = this._view.list_boss.selectedIndex;
                    if (index == this._selIndex) {
                        return;
                    }
                    e.preventDefault();
                    game.PromptBox.getIns().show(game.getLanById("cross_boss_tips4" /* cross_boss_tips4 */));
                };
                CrossBossMdr.prototype.onClickReward = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    mod.ViewMgr.getIns().bossReward(this._selCfg.reward_big);
                    // 测试数据
                    // let msg: s2c_new_cross_boss_roll_point = new s2c_new_cross_boss_roll_point();
                    // msg.percent = 8000;
                    // msg.my_roll_point = 666;
                    // msg.point_list = [];
                    // for(let i = 0; i < 10; ++i){
                    //     let info: teammate = new teammate();
                    //     if(i == 0){
                    //         info.name = RoleVo.ins.name;
                    //         info.role_id = RoleVo.ins.role_id;
                    //         info.value = Long.fromValue(666);
                    //     }
                    //     else {
                    //         info.name = "测试玩家名字" + i;
                    //         info.role_id = Long.fromValue(1000);
                    //         info.value = Long.fromValue(Math.random() * 700);
                    //     }
                    //     msg.point_list.push(info);
                    // }
                    // facade.showView(ModName.Boss,BossViewType.CrossBossLuckyReward, msg);
                };
                CrossBossMdr.prototype.onClickAdd = function () {
                    var _this = this;
                    var buyCnt = this._proxy.crossBossInfo && this._proxy.crossBossInfo.buycount || 0;
                    var cfg = game.GameConfig.getParamConfigById("cross_boss_count_buy");
                    var maxBuyCnt = cfg && cfg.value;
                    var leftBuyCnt = maxBuyCnt - buyCnt;
                    if (leftBuyCnt <= 0) {
                        game.PromptBox.getIns().show(game.getLanById("yuanling_tips8" /* yuanling_tips8 */));
                        return;
                    }
                    var costCfg = game.GameConfig.getParamConfigById("cross_boss_count_consume");
                    var costIdx = costCfg.value[0];
                    var costCnt = costCfg.value[1];
                    var propCfg = game.GameConfig.getPropConfigById(costIdx);
                    var tips1 = costCnt + propCfg.name;
                    var tips2 = leftBuyCnt + "";
                    var tipsStr = game.StringUtil.substitute(game.getLanById("bahuang_tips13" /* bahuang_tips13 */), [tips1, tips2]);
                    mod.ViewMgr.getIns().showConfirm(tipsStr, Handler.alloc(this, function () {
                        _this._proxy.c2s_new_cross_boss_buy_count();
                    }));
                };
                CrossBossMdr.prototype.onClickChallenge = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    if (mod.BagUtil.checkBagFull()) {
                        return;
                    }
                    mod.SceneUtil.setReward(113 /* ManyBoss */, this._selCfg.reward_big);
                    this._proxy.c2s_new_cross_boss_challenge(this._selCfg.index);
                };
                CrossBossMdr.prototype.onClickRank = function () {
                    this._proxy.crossBossSceneRank = false;
                    mod.ViewMgr.getIns().showView("22" /* Boss */, "05" /* CrossBossRankMain */);
                };
                CrossBossMdr.prototype.onInfoUpdate = function () {
                    this.updateCount();
                };
                CrossBossMdr.prototype.updateItemList = function () {
                    var cfgList = game.getConfigListByName("cross_boss.json" /* CrossBoss */);
                    var bossList = [];
                    var selIndex = -1;
                    for (var _i = 0, cfgList_6 = cfgList; _i < cfgList_6.length; _i++) {
                        var cfg = cfgList_6[_i];
                        bossList.push(cfg);
                        var lv = cfg.open[0];
                        if (!mod.ViewMgr.getIns().checkRebirth(lv)) {
                            //转生条件未开启
                            break;
                        }
                        selIndex++;
                    }
                    selIndex = Math.max(selIndex, 0); //默认选第一个
                    if (this._bossList.source.length) {
                        this._bossList.replaceAll(bossList);
                    }
                    else {
                        this._bossList.source = bossList;
                    }
                    this._selIndex = selIndex;
                    this._view.list_boss.selectedIndex = selIndex;
                    this._selCfg = bossList[selIndex];
                    this._proxy.selCrossBossCfg = this._selCfg;
                };
                CrossBossMdr.prototype.indexUpdateInfo = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    this.updateBoss();
                    this.updateReward();
                    this.updateRank();
                    this.updateReviveTime();
                    this.updateBossHp();
                };
                CrossBossMdr.prototype.updateBoss = function () {
                    var index = this._selCfg.index;
                    if (index == this._lastIndex) {
                        return;
                    }
                    this._lastIndex = index;
                    if (this._effId) {
                        this.removeEffect(this._effId);
                    }
                    var monsterIndex = this._selCfg.monster_index[0];
                    this._effId = this.addMonster(monsterIndex, this._view.grp_eff);
                    var monsterCfg = game.getConfigByNameId("monster1.json" /* Monster */, monsterIndex);
                    this._view.avatarNameItem.updateShow(monsterCfg.name);
                };
                CrossBossMdr.prototype.updateReward = function () {
                    var index = this._selCfg.reward_big;
                    var cfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, index);
                    this._itemList.source = cfg.content.slice(0, 8); //取前面奖励
                };
                CrossBossMdr.prototype.updateRank = function () {
                    var bossInfo = this._proxy.crossBossRankInfo;
                    var info = bossInfo && bossInfo.player_ranks && bossInfo.player_ranks.length ? bossInfo.player_ranks[0] : null;
                    var nameStr = "";
                    if (info && info.name) {
                        nameStr = info.name + "\n" + game.getLanById("exp_tip10" /* exp_tip10 */) + ":" + game.StringUtil.getHurtNumStr(info.value.toNumber());
                    }
                    else {
                        nameStr = game.getLanById("tishi_2" /* tishi_2 */); //虚位以待
                    }
                    this._view.lab_name.text = nameStr;
                };
                CrossBossMdr.prototype.updateReviveTime = function () {
                    var bossInfo = this._proxy.crossBossInfo;
                    var hp = bossInfo && bossInfo.hp || 0;
                    var endTime = bossInfo && bossInfo.endtime ? bossInfo.endtime.toNumber() : 0; //0说明boss未开，有时间表示boss已开，时间为本次结束时间
                    var curTime = TimeMgr.time.serverTimeSecond;
                    var showTime = !endTime || curTime > endTime || !hp; //boss未开启或者已结束或者已死亡
                    if (showTime) {
                        var bossTime = bossInfo && bossInfo.next_recover_time ? bossInfo.next_recover_time.toNumber() : 0; //下一次复活时间戳
                        var nextTime = bossTime - curTime;
                        this._view.timeItem.updateLeftTime(nextTime);
                    }
                    this._view.timeItem.visible = showTime;
                    this._view.btn_challenge.visible = this._view.bar.visible = !showTime;
                    if (showTime != this._lastShowTime) {
                        this._lastShowTime = showTime;
                        if (!showTime) {
                            this.reqBossInfo(); //切换状态时请求boss血量
                        }
                    }
                };
                CrossBossMdr.prototype.updateBossHp = function () {
                    if (!this._view.bar.visible) {
                        return;
                    }
                    var bossInfo = this._proxy.crossBossInfo;
                    var hp = bossInfo && bossInfo.hp || 0;
                    this._view.bar.show(hp, 100, false, 0, false, 0 /* Percent */); //boss血量
                };
                CrossBossMdr.prototype.update = function (time) {
                    this.updateReviveTime();
                    this.updateBossHp();
                    //if(this._view.bar.visible){
                    this._time--;
                    if (this._time <= 0) {
                        this.reqBossInfo();
                    }
                    //}
                };
                CrossBossMdr.prototype.updateCount = function () {
                    var cnt = this._proxy.crossBossInfo && this._proxy.crossBossInfo.count || 0;
                    var cfg = game.GameConfig.getParamConfigById("cross_boss_count");
                    var maxCnt = cfg && cfg.value;
                    var cntStr = game.getLanById("times" /* times */) + "：" + game.TextUtil.addColor(cnt + "/" + maxCnt, 8585074 /* GREEN */);
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                    this._view.btn_challenge.redPoint.visible = cnt > 0;
                };
                CrossBossMdr.prototype.reqBossInfo = function () {
                    this._proxy.c2s_new_cross_boss(this._selCfg.index, 1 /* Base */);
                    this._time = this.TIME_TICK;
                };
                CrossBossMdr.prototype.reqRankInfo = function () {
                    this._proxy.c2s_new_cross_boss(this._selCfg.index, 2 /* Rank */);
                };
                return CrossBossMdr;
            }(game.EffectMdrBase));
            boss.CrossBossMdr = CrossBossMdr;
            __reflect(CrossBossMdr.prototype, "game.mod.boss.CrossBossMdr", ["base.UpdateItem"]);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ArrayCollection = eui.ArrayCollection;
            var CrossBossPersonalRankMdr = /** @class */ (function (_super) {
                __extends(CrossBossPersonalRankMdr, _super);
                function CrossBossPersonalRankMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    return _this;
                }
                CrossBossPersonalRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankRewardRender;
                    this._view.list_rank.dataProvider = this._itemList;
                };
                CrossBossPersonalRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_scene_rank_update" /* ON_SCENE_RANK_UPDATE */, this.updateShow, this);
                };
                CrossBossPersonalRankMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.updateShow();
                };
                CrossBossPersonalRankMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                CrossBossPersonalRankMdr.prototype.initShow = function () {
                    this._view.btn_god.visible = false;
                    this._view.img_type2.source = "shanghai";
                    this._view.img_type3.source = "paimingjiangli";
                    this._view.img_myRank.visible = false;
                    this._view.lab_rank.x = this._view.img_myRank.x;
                };
                CrossBossPersonalRankMdr.prototype.updateShow = function () {
                    var limit = this._proxy.selCrossBossCfg.rank_limit2;
                    var rankStr = game.StringUtil.substitute(game.getLanById("cross_boss_tips6" /* cross_boss_tips6 */), [game.StringUtil.getHurtNumStr(limit)]);
                    this._view.lab_rank.text = rankStr;
                    var ranks = this._proxy.getPersonalRanks();
                    var topInfo = ranks && ranks.length ? ranks[0] : null;
                    if (topInfo && topInfo.value && (topInfo.value.toNumber() >= limit || !this._proxy.crossBossSceneRank)) {
                        //场景排行榜做上榜限制
                        this.updateRankUIRole(this._view.grp_eff, topInfo);
                    }
                    var myRankInfo = this._proxy.getMyPersonalRank();
                    var count = myRankInfo && myRankInfo.value ? myRankInfo.value.toNumber() : 0;
                    this._view.lab_num.text = game.getLanById("cross_boss_tips8" /* cross_boss_tips8 */) + "：" + game.StringUtil.getHurtNumStr(count); //个人伤害：0
                    var infos = [];
                    for (var i = 0; i < game.MAX_RANK_NUM; ++i) {
                        var rank = i + 1;
                        var name = game.getLanById("tishi_2" /* tishi_2 */); //虚位以待
                        var hurtStr = "";
                        var reward = this.getReward(rank);
                        var rankInfo = ranks.length > i ? ranks[i] : null;
                        if (rankInfo && (rankInfo.value.toNumber() >= limit || !this._proxy.crossBossSceneRank)) {
                            //场景排行榜做上榜限制
                            var guildName = rankInfo.guild_name || game.getLanById("bag_cue20" /* bag_cue20 */);
                            name = rankInfo.name + "\n" + game.getLanById("zongmen" /* zongmen */) + "：" + guildName;
                            hurtStr = game.StringUtil.getHurtNumStr(rankInfo.value.toNumber());
                        }
                        var info = {
                            rank: rank,
                            name: name,
                            hurtStr: hurtStr,
                            reward: reward
                        };
                        infos.push(info);
                    }
                    this._itemList.replaceAll(infos);
                };
                CrossBossPersonalRankMdr.prototype.getReward = function (rank) {
                    var rewards = this._proxy.selCrossBossCfg.rank_reward_show2;
                    for (var _i = 0, rewards_2 = rewards; _i < rewards_2.length; _i++) {
                        var info = rewards_2[_i];
                        var rankStart = info[0];
                        var rankEnd = info[1];
                        if (rank >= rankStart && rank <= rankEnd) {
                            var rewardId = info[2];
                            var cfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, rewardId);
                            return cfg.content.slice(0, 3);
                        }
                    }
                    return [];
                };
                return CrossBossPersonalRankMdr;
            }(game.EffectMdrBase));
            boss.CrossBossPersonalRankMdr = CrossBossPersonalRankMdr;
            __reflect(CrossBossPersonalRankMdr.prototype, "game.mod.boss.CrossBossPersonalRankMdr");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var CrossBossRankMainMdr = /** @class */ (function (_super) {
                __extends(CrossBossRankMainMdr, _super);
                function CrossBossRankMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Zongmen */,
                            icon: "xianzongpaimingbiaoqiantubiao",
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                            mdr: boss.CrossBossGuildRankMdr,
                        },
                        {
                            btnType: "02" /* Personal */,
                            icon: "personal_rank_",
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                            mdr: boss.CrossBossPersonalRankMdr,
                        }
                    ];
                    return _this;
                }
                return CrossBossRankMainMdr;
            }(mod.WndBaseMdr));
            boss.CrossBossRankMainMdr = CrossBossRankMainMdr;
            __reflect(CrossBossRankMainMdr.prototype, "game.mod.boss.CrossBossRankMainMdr");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TouchEvent = egret.TouchEvent;
            var CrossBossSceneMdr = /** @class */ (function (_super) {
                __extends(CrossBossSceneMdr, _super);
                function CrossBossSceneMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", boss.CrossBossSceneView);
                    return _this;
                }
                CrossBossSceneMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.percentHeight = 100;
                    this._view.percentWidth = 100;
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                };
                CrossBossSceneMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    this.onNt("on_scene_rank_update" /* ON_SCENE_RANK_UPDATE */, this.onRankUpdate, this);
                    this.onNt("on_cross_boss_reward_update" /* ON_CROSS_BOSS_REWARD_UPDATE */, this.updateRewardHint, this);
                };
                CrossBossSceneMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateMvp();
                    this.updateRewatd();
                    this.updateRewardHint();
                };
                CrossBossSceneMdr.prototype.onHide = function () {
                    this._proxy.clearCrossBossSceneRankInfo(); //清除场景排行榜信息
                    _super.prototype.onHide.call(this);
                };
                CrossBossSceneMdr.prototype.onClickRank = function () {
                    this._proxy.crossBossSceneRank = true;
                    mod.ViewMgr.getIns().showView("22" /* Boss */, "05" /* CrossBossRankMain */);
                };
                CrossBossSceneMdr.prototype.onClickReward = function () {
                    this._proxy.crossBossSceneRank = true;
                    mod.ViewMgr.getIns().showSecondPop("22" /* Boss */, "03" /* CrossBossHurtReward */);
                };
                CrossBossSceneMdr.prototype.onRankUpdate = function (n) {
                    var msg = n.body;
                    this.updateMvp(msg);
                };
                CrossBossSceneMdr.prototype.updateMvp = function (info) {
                    if (info && info.hurtList && info.hurtList.length) {
                        var firstInfo = info.hurtList[0];
                        this._view.head.updateHeadShow(firstInfo.head, firstInfo.head_frame, firstInfo.sex);
                    }
                    else {
                        this._view.head.defaultHeadShow();
                    }
                };
                CrossBossSceneMdr.prototype.updateRewatd = function () {
                    var rewards = this._proxy.selCrossBossCfg.lucky_reward;
                    this._view.icon.setData(rewards[0]);
                };
                CrossBossSceneMdr.prototype.updateRewardHint = function () {
                    var hint = false;
                    var rewards = this._proxy.selCrossBossCfg.hurt_reward_show;
                    for (var i = 0; i < rewards.length; ++i) {
                        var index = i + 1;
                        var status = this._proxy.getCrossBossRewardStatus(index);
                        var canDraw = status == 1 /* Finish */;
                        if (canDraw) {
                            hint = true;
                            break;
                        }
                    }
                    this._view.btn_reward.redPoint.visible = hint;
                };
                return CrossBossSceneMdr;
            }(game.MdrBase));
            boss.CrossBossSceneMdr = CrossBossSceneMdr;
            __reflect(CrossBossSceneMdr.prototype, "game.mod.boss.CrossBossSceneMdr");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TimeMgr = base.TimeMgr;
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var CrossBossTipsMdr = /** @class */ (function (_super) {
                __extends(CrossBossTipsMdr, _super);
                function CrossBossTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.BossTipsView);
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                CrossBossTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._listData;
                };
                CrossBossTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClick);
                };
                CrossBossTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                    this.updateLeftTime();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                CrossBossTipsMdr.prototype.onUpdateView = function () {
                    var bossInfo = this._proxy.crossBossInfo;
                    this._endTime = bossInfo.endtime ? bossInfo.endtime.toNumber() : 0;
                    var cfg = game.GameConfig.getParamConfigById("cross_boss_reward");
                    var list = cfg.value;
                    this._listData.source = list;
                    this._view.lab_desc.textFlow = game.TextUtil.parseHtml(game.getLanById("cross_boss_tips12" /* cross_boss_tips12 */));
                    this._view.btn_get.setEffect("tiaozhan" /* Tiaozhan */);
                };
                CrossBossTipsMdr.prototype.onClick = function () {
                    //挑战跨服boss界面
                    mod.ViewMgr.getIns().showViewByID(78 /* CrossBoss */);
                    this.hide();
                };
                CrossBossTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    mod.PropTipsMgr.getIns().closeBoss(); //继续boss弹窗
                    TimeMgr.removeUpdateItem(this);
                };
                CrossBossTipsMdr.prototype.update = function (time) {
                    this.updateLeftTime();
                };
                CrossBossTipsMdr.prototype.updateLeftTime = function () {
                    var leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this.hide();
                        return;
                    }
                    this._view.timeItem.updateLeftTime(leftTime);
                };
                return CrossBossTipsMdr;
            }(game.EffectMdrBase));
            boss.CrossBossTipsMdr = CrossBossTipsMdr;
            __reflect(CrossBossTipsMdr.prototype, "game.mod.boss.CrossBossTipsMdr", ["base.UpdateItem"]);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var BossRewardMdr = /** @class */ (function (_super) {
                __extends(BossRewardMdr, _super);
                function BossRewardMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", boss.BossRewardView);
                    _this.isEasyHide = true;
                    return _this;
                }
                BossRewardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                    this._tipsList = new ArrayCollection();
                    this._view.list_tips.itemRenderer = mod.BaseZhuangshiItem;
                    this._view.list_tips.dataProvider = this._tipsList;
                };
                BossRewardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_confirm, TouchEvent.TOUCH_TAP, this.hide);
                };
                BossRewardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateReward();
                };
                BossRewardMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                BossRewardMdr.prototype.updateReward = function () {
                    var index = this._showArgs.rewardId;
                    var cfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, index);
                    this._itemList.source = cfg.content;
                    var tips = this._showArgs.tips;
                    if (tips && tips.length) {
                        this._view.currentState = "tips";
                        this._tipsList.source = tips;
                    }
                    else {
                        this._view.currentState = "default";
                    }
                };
                return BossRewardMdr;
            }(game.MdrBase));
            boss.BossRewardMdr = BossRewardMdr;
            __reflect(BossRewardMdr.prototype, "game.mod.boss.BossRewardMdr");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var BossRewardShowMdr = /** @class */ (function (_super) {
                __extends(BossRewardShowMdr, _super);
                function BossRewardShowMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", boss.BossRewardShowView);
                    _this.isEasyHide = true;
                    return _this;
                }
                BossRewardShowMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                };
                BossRewardShowMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_confirm, TouchEvent.TOUCH_TAP, this.hide);
                };
                BossRewardShowMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateReward();
                };
                BossRewardShowMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                BossRewardShowMdr.prototype.updateReward = function () {
                    var rewards = this._showArgs;
                    this._itemList.source = rewards;
                };
                return BossRewardShowMdr;
            }(game.MdrBase));
            boss.BossRewardShowMdr = BossRewardShowMdr;
            __reflect(BossRewardShowMdr.prototype, "game.mod.boss.BossRewardShowMdr");
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ItemTapEvent = eui.ItemTapEvent;
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var Event = egret.Event;
            var TimeMgr = base.TimeMgr;
            var Tween = base.Tween;
            var Handler = base.Handler;
            var ManyBossMdr = /** @class */ (function (_super) {
                __extends(ManyBossMdr, _super);
                function ManyBossMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", boss.ManyBossView);
                    _this.TIME_TICK = 3; //定时请求boss信息
                    _this._firstEnter = true; //首次进入界面时，选中存活的BOSS
                    return _this;
                }
                ManyBossMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                    this._btnList = new ArrayCollection();
                    this._view.list_type.itemRenderer = mod.TabSecondItem;
                    this._view.list_type.dataProvider = this._btnList;
                    this._bossList = new ArrayCollection();
                    this._view.list_boss.itemRenderer = boss.ManyBossItem;
                    this._view.list_boss.dataProvider = this._bossList;
                };
                ManyBossMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_type, Event.CHANGING, this.onClickType);
                    addEventListener(this._view.list_boss, ItemTapEvent.ITEM_TAP, this.onClickBoss);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
                    this.onNt("on_many_boss_update" /* ON_MANY_BOSS_UPDATE */, this.onInfoUpdate, this);
                    this.onNt("update_boss_list" /* UPDATE_BOSS_lIST */, this.reqBossInfo, this);
                };
                ManyBossMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initTypeList();
                    this.reqBossInfo();
                    this.showGuide();
                    TimeMgr.addUpdateItem(this, 1000);
                    this._view.btn_gift.updateGift(100013 /* Id100013 */);
                    this._view.checkBoxNvpu.updateShow(1 /* ManyBoss */);
                };
                ManyBossMdr.prototype.onHide = function () {
                    this._effId = 0;
                    this._lastIndex = 0;
                    this._firstEnter = true;
                    Tween.remove(this._view.scroller.viewport);
                    TimeMgr.removeUpdateItem(this);
                    mod.GuideMgr.getIns().clear(36 /* BossChallenge */); //清除指引
                    _super.prototype.onHide.call(this);
                };
                ManyBossMdr.prototype.onClickType = function (e) {
                    var type = this._view.list_type.selectedIndex;
                    if (type == this._selType) {
                        return;
                    }
                    if (!this._proxy.isBossOpen(type, true)) {
                        e.preventDefault();
                        return;
                    }
                    var selIndex = this.getSelIndex(type);
                    this.setSelType(type, selIndex);
                    this.typeUpdateInfo();
                };
                ManyBossMdr.prototype.onClickBoss = function (e) {
                    var index = e.itemIndex;
                    if (index == this._selIndex) {
                        return;
                    }
                    this._selIndex = index;
                    this.indexUpdateInfo();
                };
                ManyBossMdr.prototype.onClickReward = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    mod.ViewMgr.getIns().bossReward(this._selCfg.reward_big);
                };
                ManyBossMdr.prototype.onClickAdd = function () {
                    var index = this._proxy.bossCostIndex;
                    if (!mod.BagUtil.checkPropCntUp(index)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showPropTips(index, 2 /* Bag */);
                };
                ManyBossMdr.prototype.onClickChallenge = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    var cnt = this._proxy.bossCount;
                    if (!cnt) {
                        this.onClickAdd();
                        return;
                    }
                    if (mod.BagUtil.checkBagFull()) {
                        return;
                    }
                    mod.SceneUtil.setReward(113 /* ManyBoss */, this._selCfg.reward_big);
                    this._proxy.c2s_new_multiple_boss_challenge(this._selCfg.index);
                };
                ManyBossMdr.prototype.onInfoUpdate = function () {
                    if (this._firstEnter) {
                        //首次进去界面时，自动选中存活boss
                        this._firstEnter = false;
                        var selIndex = this.getSelIndex(this._selType);
                        this.setSelType(this._selType, selIndex);
                    }
                    this.typeUpdateInfo();
                    this.updateCount();
                    this.updateTime();
                    //this.updateTypeListHint();
                };
                ManyBossMdr.prototype.initTypeList = function () {
                    var _this = this;
                    var datas = [];
                    var cfgs = this._proxy.getBossCfgs();
                    var selType = 0;
                    var selIndex = 0;
                    for (var k in cfgs) {
                        var type = parseInt(k);
                        var cfgList = cfgs[k];
                        var cfg = cfgList[0];
                        var icon = "many_boss_" + (type % 5); //图标循环使用
                        var bossType = cfg.open[0];
                        var lv = cfg.open[1];
                        var nameIcon = "";
                        var nameGrpStr = "";
                        var nameGrpFont = "";
                        if (bossType == 1 /* Lv */) {
                            nameIcon = "many_boss_lv_" + lv;
                        }
                        else {
                            //nameIcon = "zhuan_" + RoleUtil.getRebirthLv(lv);
                            nameGrpStr = game.ResUtil.getRebirthFontStr(lv, true);
                            nameGrpFont = game.BmpTextCfg[200 /* RebirthLv */];
                        }
                        var isOpen = this._proxy.isBossOpen(type);
                        datas.push({ icon: icon, nameIcon: nameIcon, gray: !isOpen, nameGrpStr: nameGrpStr, nameGrpFont: nameGrpFont });
                        if (!isOpen) {
                            if (lv >= game.BossShowRebirthLimit) {
                                break; //9转后只显示一个未开启的boss
                            }
                        }
                        else {
                            selType = type; //默认选中最高的
                        }
                    }
                    this._btnList.source = datas;
                    if (this._showArgs && Array.isArray(this._showArgs) && this._showArgs.length) {
                        selType = +this._showArgs.shift(); //选中上一次的类型
                        if (this._showArgs.length) {
                            selIndex = +this._showArgs.shift(); //跳转选中boss
                            this._firstEnter = false; //跳转boss时候，不自动选择存活boss
                        }
                    }
                    this.setSelType(selType, selIndex);
                    this._view.list_type.selectedIndex = this._selType;
                    if (this._selType > 3) {
                        egret.callLater(function () {
                            mod.ScrollUtil.moveHToAssign(_this._view.scroller, _this._selType, 127);
                        }, this);
                    }
                };
                ManyBossMdr.prototype.setSelType = function (type, index) {
                    if (index === void 0) { index = 0; }
                    this._selType = type;
                    this._selIndex = index;
                    mod.ViewMgr.getIns().lastData = ["01" /* Many */, this._selType + ""];
                };
                //返回活着的第一只BOSS
                ManyBossMdr.prototype.getSelIndex = function (type) {
                    var cfgs = this._proxy.getBossCfgs();
                    var bossList = cfgs[type].concat(); //防止修改配置数据
                    for (var i = 0; i < bossList.length; ++i) {
                        var cfg = bossList[i];
                        var info = this._proxy.getBossInfo(cfg.index);
                        var isDied = !info || info.hp <= 0; //boss已死亡
                        if (!isDied) {
                            return i;
                        }
                    }
                    return 0;
                };
                ManyBossMdr.prototype.typeUpdateInfo = function () {
                    this.updateItemList();
                    this.indexUpdateInfo();
                };
                ManyBossMdr.prototype.updateItemList = function () {
                    var cfgs = this._proxy.getBossCfgs();
                    var bossList = cfgs[this._selType].concat(); //防止修改配置数据
                    if (this._bossList.source.length) {
                        this._bossList.replaceAll(bossList);
                    }
                    else {
                        this._bossList.source = bossList;
                    }
                    this._view.list_boss.selectedIndex = this._selIndex;
                };
                ManyBossMdr.prototype.indexUpdateInfo = function () {
                    var cfgs = this._proxy.getBossCfgs();
                    var bossList = cfgs[this._selType].concat(); //防止修改配置数据
                    this._selCfg = bossList[this._selIndex];
                    this._selInfo = this._proxy.getBossInfo(this._selCfg.index);
                    if (!this._selCfg) {
                        return;
                    }
                    this.updateBoss();
                    this.updateReward();
                    this.updateBelong();
                    this.updateReviveTime();
                };
                ManyBossMdr.prototype.updateBoss = function () {
                    var index = this._selCfg.index;
                    if (index == this._lastIndex) {
                        return;
                    }
                    this._lastIndex = index;
                    if (this._effId) {
                        this.removeEffect(this._effId);
                    }
                    var monsterIndex = this._selCfg.monster_index[0];
                    this._effId = this.addMonster(monsterIndex, this._view.grp_eff);
                    var monsterCfg = game.getConfigByNameId("monster1.json" /* Monster */, monsterIndex);
                    this._view.avatarNameItem.updateShow(monsterCfg.name);
                };
                ManyBossMdr.prototype.updateReward = function () {
                    var index = this._selCfg.reward_big;
                    var cfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, index);
                    this._itemList.source = cfg.content.slice(0, 4); //取前面奖励
                };
                ManyBossMdr.prototype.updateBelong = function () {
                    var info = this._selInfo && this._selInfo.owerinfo ? this._selInfo.owerinfo : null;
                    if (info && info.name) {
                        this._view.lab_name.text = info.name;
                        this._view.head.updateHeadShow(info.head, info.head_frame, info.sex, info.role_id, info.server_id, info.is_robot);
                    }
                    else {
                        this._view.lab_name.text = "";
                        this._view.head.defaultHeadShow();
                    }
                };
                ManyBossMdr.prototype.updateCount = function () {
                    var cnt = this._proxy.bossCount;
                    var maxCnt = this._proxy.bossMaxCount;
                    var cntStr = game.getLanById("times" /* times */) + "：" + game.TextUtil.addColor(cnt + "/" + maxCnt, 8585074 /* GREEN */);
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                    this._isMaxCnt = cnt >= maxCnt;
                    //幸运爆率
                    var hasPrivilege = mod.RoleUtil.hasPrivilege("multiple_boss_count" /* multiple_boss_count */);
                    this._view.grp_luckyCnt0.visible = hasPrivilege; //有特权的时候才显示
                    if (hasPrivilege) {
                        var luckyCount = this._proxy.luckyCount;
                        var fontStr = luckyCount + "";
                        this.addBmpFont(fontStr, game.BmpTextCfg[214 /* XianYu1 */], this._view.grp_luckyCnt, true, 0.8, true);
                    }
                    // let index = this._proxy.bossCostIndex;
                    // let propCnt = BagUtil.getPropCntByIdx(index);
                    // let showProp = !cnt && propCnt > 0;//挑战次数为0时，且有道具时显示道具
                    // this._view.grp_cnt.visible = !showProp;
                    // this._view.cost.visible = showProp;
                    // if(showProp){
                    //     this._view.cost.updateShow([index, 1]);
                    // }
                    //this._view.btn_challenge.redPoint.visible = cnt > 0 || propCnt > 0;
                };
                ManyBossMdr.prototype.updateTime = function () {
                    var timeStr = "";
                    var bossTime = this._proxy.bossTime;
                    if (bossTime && !this._isMaxCnt) {
                        var nextTime = bossTime - TimeMgr.time.serverTimeSecond;
                        if (nextTime == 0) {
                            this.reqBossInfo();
                        }
                        if (nextTime >= 0) {
                            timeStr = game.TimeUtil.formatSecond(nextTime, "mm:ss") + game.getLanById("compete_mars_xmzb" /* compete_mars_xmzb */);
                        }
                    }
                    this._view.lab_time.text = timeStr;
                };
                ManyBossMdr.prototype.updateReviveTime = function () {
                    var bossTime = this._selInfo ? this._selInfo.recover_time.toNumber() : 0;
                    var nextTime = bossTime - TimeMgr.time.serverTimeSecond;
                    var showTime = bossTime && nextTime >= 0;
                    if (showTime) {
                        this._view.timeItem.updateLeftTime(nextTime);
                    }
                    this._view.timeItem.visible = showTime;
                    this._view.btn_challenge.visible = !showTime;
                };
                ManyBossMdr.prototype.update = function (time) {
                    this.updateTime();
                    this.updateReviveTime();
                    var len = this._view.list_boss.numChildren;
                    for (var i = 0; i < len; ++i) {
                        var item = this._view.list_boss.getChildAt(i);
                        item.updateTime();
                    }
                    if (!this._selType) {
                        //单个boss不做数据定时请求，优化处理
                        return;
                    }
                    this._time--;
                    if (this._time <= 0) {
                        this.reqBossInfo();
                    }
                };
                ManyBossMdr.prototype.reqBossInfo = function () {
                    this._proxy.c2s_new_multiple_boss_info();
                    this._time = this.TIME_TICK;
                };
                // private updateTypeListHint(): void {
                //     let list: TabBaseItemData[]  = this._btnList.source;
                //     let len: number = list ? list.length : 0;
                //     for (let i = 0; i < len; i++) {
                //         let btnData = list[i];
                //         let type = i;
                //         let hint = this._proxy.getBossHintByType(type);
                //         if(!!btnData.showHint != hint){//过滤undefined!=false
                //             btnData.showHint = hint;
                //             this._btnList.itemUpdated(btnData);
                //         }
                //     }
                // }
                ManyBossMdr.prototype.showGuide = function () {
                    mod.GuideMgr.getIns().show(36 /* BossChallenge */, this._view.btn_challenge, Handler.alloc(this, this.onClickChallenge)); //任务指引
                };
                return ManyBossMdr;
            }(game.EffectMdrBase));
            boss.ManyBossMdr = ManyBossMdr;
            __reflect(ManyBossMdr.prototype, "game.mod.boss.ManyBossMdr", ["base.UpdateItem"]);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var TextEvent = egret.TextEvent;
            var PersonalBossMdr = /** @class */ (function (_super) {
                __extends(PersonalBossMdr, _super);
                function PersonalBossMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", boss.PersonalBossView);
                    return _this;
                }
                PersonalBossMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this._bossList = new ArrayCollection();
                    this._view.list_boss.itemRenderer = boss.PersonalBossItem;
                    this._view.list_boss.dataProvider = this._bossList;
                };
                PersonalBossMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_sweep, TouchEvent.TOUCH_TAP, this.onClickSweep);
                    addEventListener(this._view.lab_vip, TextEvent.LINK, this.onClickVip);
                    this.onNt("on_personal_boss_update" /* ON_PERSONAL_BOSS_UPDATE */, this.updateItemList, this);
                    this.onNt("update_boss_list" /* UPDATE_BOSS_lIST */, this.updateItemList, this);
                };
                PersonalBossMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateItemList();
                    this.updateVip();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                PersonalBossMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                PersonalBossMdr.prototype.onClickSweep = function () {
                    if (mod.BagUtil.checkBagFull()) {
                        return;
                    }
                    this._proxy.c2s_single_boss_sweep();
                };
                PersonalBossMdr.prototype.onClickVip = function () {
                    mod.ViewMgr.getIns().openVipView();
                };
                PersonalBossMdr.prototype.updateItemList = function () {
                    var cfgList = game.getConfigListByName("personal_boss.json" /* PersonalBoss */);
                    // if(this._bossList.source.length){
                    //     this._bossList.replaceAll(cfgList);
                    // }
                    // else {
                    //     this._bossList.source = cfgList;
                    // }
                    var list = [];
                    for (var _i = 0, cfgList_7 = cfgList; _i < cfgList_7.length; _i++) {
                        var cfg = cfgList_7[_i];
                        var openType = cfg.open[0];
                        var openLv = cfg.open[1];
                        if (openLv < game.BossShowRebirthLimit) {
                            list.push(cfg);
                            continue;
                        }
                        if (openType == 1 /* Lv */) {
                            if (mod.ViewMgr.getIns().checkLv(openLv)) {
                                list.push(cfg);
                                continue;
                            }
                        }
                        else {
                            if (mod.ViewMgr.getIns().checkRebirth(openLv)) {
                                list.push(cfg);
                                continue;
                            }
                        }
                        if (openLv >= game.BossShowRebirthLimit) {
                            list.push(cfg);
                        }
                        break;
                    }
                    this._bossList.replaceAll(list);
                };
                PersonalBossMdr.prototype.update = function (time) {
                    var len = this._view.list_boss.numChildren;
                    for (var i = 0; i < len; ++i) {
                        var item = this._view.list_boss.getChildAt(i);
                        item.updateTime();
                    }
                };
                PersonalBossMdr.prototype.updateVip = function () {
                    var cfg = game.GameConfig.getParamConfigById("personal_vip_count");
                    var info = cfg && cfg.value;
                    var vipIndex = info[0];
                    if (game.RoleVo.ins.vip_lv >= vipIndex) {
                        this._view.lab_vip.visible = false;
                        return;
                    }
                    this._view.lab_vip.visible = true;
                    var vipCnt = info[1];
                    var vipStr = mod.VipUtil.getVipStr(vipIndex) + "增加" + vipCnt + "次";
                    this._view.lab_vip.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(vipStr, 15855403 /* YELLOW */, ""));
                };
                return PersonalBossMdr;
            }(game.MdrBase));
            boss.PersonalBossMdr = PersonalBossMdr;
            __reflect(PersonalBossMdr.prototype, "game.mod.boss.PersonalBossMdr", ["base.UpdateItem"]);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var boss;
        (function (boss) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var ItemTapEvent = eui.ItemTapEvent;
            var TimeMgr = base.TimeMgr;
            var Tween = base.Tween;
            var VipBossMdr = /** @class */ (function (_super) {
                __extends(VipBossMdr, _super);
                function VipBossMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", boss.VipBossView);
                    _this._curTypeSelIdx = -1; // 当前选中的分类索引
                    _this._curGateSelIdx = 0; // 当前选中的关卡索引
                    return _this;
                }
                VipBossMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(199 /* Boss */);
                    this._listTypeData = new ArrayCollection();
                    this._view.list_type.dataProvider = this._listTypeData;
                    this._view.list_type.itemRenderer = mod.TabSecondItem;
                    this._listGateData = new ArrayCollection();
                    this._view.list_gate.dataProvider = this._listGateData;
                    this._view.list_gate.itemRenderer = boss.VipBossItemRender;
                    this._listAwdData = new ArrayCollection();
                    this._view.list_awd.dataProvider = this._listAwdData;
                    this._view.list_awd.itemRenderer = mod.Icon;
                };
                VipBossMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_vip_boss_info_update" /* ON_VIP_BOSS_INFO_UPDATE */, this.updateInfo, this);
                    // this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickTypeList);
                    addEventListener(this._view.list_gate, ItemTapEvent.ITEM_TAP, this.onClickGateList);
                    addEventListener(this._view.btn_awd_preview, TouchEvent.TOUCH_TAP, this.onClickAwdPreview);
                    addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onClickFight);
                };
                VipBossMdr.prototype.onShow = function () {
                    var _this = this;
                    _super.prototype.onShow.call(this);
                    this.updateInfo();
                    if (this._curTypeSelIdx > 3) {
                        egret.callLater(function () {
                            mod.ScrollUtil.moveHToAssign(_this._view.scroller, _this._curTypeSelIdx, 127);
                        }, this);
                    }
                };
                VipBossMdr.prototype.onHide = function () {
                    this._effId = 0;
                    this._curGateSelIdx = 0;
                    this._curGateData = null;
                    Tween.remove(this._view.scroller.viewport);
                    _super.prototype.onHide.call(this);
                };
                //倒计时
                VipBossMdr.prototype.update = function (time) {
                    this._time--;
                    this._view.timeItem.updateLeftTime(this._time);
                    if (this._time <= 0) {
                        TimeMgr.removeUpdateItem(this);
                        this.updateCurTypeInfo();
                    }
                };
                VipBossMdr.prototype.updateInfo = function () {
                    var typeDatas = [];
                    var reIds = this._proxy.vipBossRebirthIds;
                    var flag;
                    var i = 0;
                    for (var _i = 0, reIds_2 = reIds; _i < reIds_2.length; _i++) {
                        var reid = reIds_2[_i];
                        var isOpen = this._proxy.isVipBossOpen(reid);
                        var nameGrpStr = game.ResUtil.getRebirthFontStr(reid, true);
                        var nameGrpFont = game.BmpTextCfg[200 /* RebirthLv */];
                        var zs = mod.RoleUtil.getRebirthLv(reid); // 转生数
                        var tData = {
                            icon: "many_boss_" + (zs % 5),
                            showHint: false,
                            gray: !isOpen,
                            nameGrpStr: nameGrpStr,
                            nameGrpFont: nameGrpFont
                        };
                        typeDatas.push(tData);
                        if (flag) { // 当前所处转生后，再取一个就停止了
                            if (reid >= game.BossShowRebirthLimit) {
                                break; //9转后只显示一个未开启的boss
                            }
                        }
                        if (isOpen) {
                            this._curTypeSelIdx = i;
                            flag = true;
                        }
                        i++;
                    }
                    this._listTypeData.replaceAll(typeDatas);
                    this._view.list_type.selectedIndex = this._curTypeSelIdx;
                    this.updateCurTypeInfo();
                    this._view.img_title.visible = !mod.VipUtil.getShowVipLv();
                };
                /**
                 * 更新当前选中类型数据
                 */
                VipBossMdr.prototype.updateCurTypeInfo = function () {
                    var cfgs = this._proxy.getRebVipBossCfg();
                    var gateDatas = [];
                    var flag = false; //表示自动选中
                    var firstGateData;
                    var i = 0;
                    for (var idx in cfgs) {
                        var cfg = cfgs[idx];
                        var info1 = this._proxy.getVipBossInfo(cfg.index);
                        if (!info1) {
                            break;
                        }
                        var state = this._proxy.getState(cfg.index);
                        var isSel = (state == 2 /* CanFight */ || state == 3 /* CanSaoDan */);
                        var gateData = {
                            info: info1,
                            cfg: cfg,
                            state: state
                        };
                        if (!firstGateData) {
                            firstGateData = gateData;
                        }
                        if (this._curGateData && this._curGateData.cfg.index == gateData.cfg.index) {
                            this._curGateData = gateData;
                        }
                        if (isSel && !flag) {
                            this._curGateData = gateData;
                            this._curGateSelIdx = i;
                            flag = true;
                        }
                        gateDatas.push(gateData);
                        i++;
                        if (state == 1 /* NonActivited */ && i == 3) {
                            break; //未开启的只显示一个
                        }
                    }
                    this._listGateData.replaceAll(gateDatas);
                    //if(flag) {
                    this._view.list_gate.selectedIndex = this._curGateSelIdx;
                    //}
                    //没有自动选中的时候，默认选中第一个
                    if (!this._curGateData) {
                        this._curGateData = firstGateData;
                    }
                    this.updateCurGateInfo();
                };
                /**
                 * 更新当前关卡数据
                 */
                VipBossMdr.prototype.updateCurGateInfo = function () {
                    if (!this._curGateData) {
                        return;
                    }
                    // let info = this._proxy.getVipBossInfo(this._curGateData.cfg.index);
                    var info = this._curGateData.info;
                    // 可挑战状态
                    TimeMgr.removeUpdateItem(this);
                    // this._curState = this._proxy.getState(this._curGateData.cfg.index);
                    this._curState = this._curGateData.state;
                    switch (this._curState) {
                        case 1 /* NonActivited */:
                        case 2 /* CanFight */:
                            this._view.currentState = "fight";
                            break;
                        case 3 /* CanSaoDan */:
                            this._view.currentState = "saodan";
                            break;
                        case 4 /* CD */:
                            this._view.currentState = "saodancd";
                            this._time = info.next_boss_time - TimeMgr.time.serverTimeSecond;
                            if (this._time > 0) { // cd 时间
                                this.update(null);
                                TimeMgr.addUpdateItem(this, 1000);
                            }
                            break;
                        default:
                            break;
                    }
                    this._view.btn_fight.redPoint.visible = (this._curState == 2 /* CanFight */ || this._curState == 3 /* CanSaoDan */);
                    // boss
                    var gateCfg = this._proxy.getVipBossFubenCfg(this._curGateData.cfg.index % 10);
                    var mcfg = game.getConfigByNameId("monster1.json" /* Monster */, gateCfg.bossId[0]);
                    this._view.lab_boss_name.text = mcfg ? mcfg.name : "";
                    if (this._effId) {
                        this.removeEffect(this._effId);
                    }
                    this._effId = this.addMonster(gateCfg.bossId[0], this._view.grp_eff);
                    // 列表奖励数据
                    var listAwdPreCfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, this._curGateData.cfg.reward_big);
                    var awd = listAwdPreCfg.content.slice(0, 4);
                    listAwdPreCfg && this._listAwdData.replaceAll(awd);
                    var data = this._listGateData.getItemAt(this._view.list_gate.selectedIndex);
                    var cfg_next = this._proxy.getVipBossFubenCfg(data.cfg.index % 10 + 1);
                    if (cfg_next && mod.VipUtil.getShowVipLv() < cfg_next.VIP_lv) {
                        this._view.lab_tips.text = "VIP" + cfg_next.VIP_lv + "\u53EF\u78BE\u538B";
                    }
                    else {
                        this._view.lab_tips.text = "";
                    }
                };
                // private onHintUpdate(n: GameNT) {
                //     let data: IHintData = n.body;
                // }
                VipBossMdr.prototype.onClickTypeList = function (e) {
                    var itemIdx = e.itemIndex;
                    var reIds = this._proxy.vipBossRebirthIds;
                    var reId = itemIdx < reIds.length ? reIds[itemIdx] : 0;
                    if (itemIdx != this._curTypeSelIdx && reId) {
                        // let cfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, reId);
                        // PromptBox.getIns().show(`转生至${cfg.relv}转${cfg.relv2}重开启`);
                        this._view.list_type.selectedIndex = this._curTypeSelIdx;
                    }
                };
                VipBossMdr.prototype.onClickGateList = function (e) {
                    var itemData = e.item;
                    if (itemData.cfg.index == this._curGateData.cfg.index) {
                        return;
                    }
                    // if(!itemData.isOpen) {
                    //     PromptBox.getIns().show("暂未开启");
                    //     this._view.list_big_gate.selectedIndex = this._curBigGateSelIdx;
                    //     return;
                    // }
                    this._curGateData = itemData;
                    this.updateCurGateInfo();
                };
                VipBossMdr.prototype.onClickAwdPreview = function (e) {
                    mod.ViewMgr.getIns().bossReward(this._curGateData.cfg.reward_big);
                };
                VipBossMdr.prototype.onClickFight = function (e) {
                    if (!this._curGateData) {
                        return;
                    }
                    if (this._curState == 2 /* CanFight */) { // 挑战
                        if (mod.BagUtil.checkBagFull()) {
                            return;
                        }
                        this._proxy.c2s_new_vip_boss_enter(this._curGateData.cfg.index);
                    }
                    else if (this._curState == 3 /* CanSaoDan */) { // 扫荡
                        if (mod.BagUtil.checkBagFull()) {
                            return;
                        }
                        this._proxy.c2s_new_vip_boss_sweep(this._curGateData.cfg.index);
                    }
                    else if (this._curState == 1 /* NonActivited */) { //未激活
                        mod.VipUtil.showTips();
                    }
                };
                return VipBossMdr;
            }(game.EffectMdrBase));
            boss.VipBossMdr = VipBossMdr;
            __reflect(VipBossMdr.prototype, "game.mod.boss.VipBossMdr", ["base.UpdateItem"]);
        })(boss = mod.boss || (mod.boss = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=boss.js.map