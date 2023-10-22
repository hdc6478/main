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
        var shilian;
        (function (shilian) {
            var TimeMgr = base.TimeMgr;
            var facade = base.facade;
            // 队伍列表item
            var YuanLingTeamItem = /** @class */ (function (_super) {
                __extends(YuanLingTeamItem, _super);
                function YuanLingTeamItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.YuanLingTeamItemSkin";
                    return _this;
                }
                YuanLingTeamItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("49" /* Shilian */, 197 /* YuanlingFuben */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_do, this.onClick, this);
                    this.gr_invite.visible = this.img_zhanli.visible = false;
                };
                YuanLingTeamItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                YuanLingTeamItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var teamCnt = this._proxy.getTeamCount();
                    this.lb_power.text = "\u4EBA\u6570\uFF1A" + data.count + "/" + teamCnt;
                    if (data.fight || data.count >= teamCnt) {
                        this.btn_do.visible = false;
                        this.lb_state.text = data.fight ? '正在战斗中' : '人员已满';
                    }
                    else {
                        this.btn_do.visible = true;
                        this.lb_state.visible = false;
                    }
                    var topPlayer = data.info ? data.info[0] : null;
                    if (!topPlayer) {
                        return;
                    }
                    this.lb_name.text = topPlayer.name;
                    this.head.updateShow(topPlayer.head.toNumber(), topPlayer.head_frame.toNumber(), topPlayer.sex, (topPlayer.vip || 0) % 100);
                };
                YuanLingTeamItem.prototype.onClick = function () {
                    var data = this.data;
                    var kick_out_team = this._proxy.model.kick_out_team;
                    //被提出队伍的，一分钟内无法再进入此队伍
                    if (kick_out_team[data.team_id] != null) {
                        var time = kick_out_team[data.team_id] || 0;
                        var serverTime = TimeMgr.time.serverTimeSecond;
                        var left = time + 60 - serverTime;
                        if (left > 0) {
                            game.PromptBox.getIns().show("\u5728" + left + "\u79D2\u540E\u624D\u53EF\u8FDB\u5165\u6B64\u961F\u4F0D");
                            return;
                        }
                        kick_out_team[data.team_id] = null;
                        delete kick_out_team[data.team_id];
                    }
                    this._proxy.c2s_yuanling_jion_team(data.team_id, this._proxy.curDiffType);
                };
                return YuanLingTeamItem;
            }(mod.BaseListenerRenderer));
            shilian.YuanLingTeamItem = YuanLingTeamItem;
            __reflect(YuanLingTeamItem.prototype, "game.mod.shilian.YuanLingTeamItem");
            // 邀请列表item，被邀请
            var YuanLingTeamItem2 = /** @class */ (function (_super) {
                __extends(YuanLingTeamItem2, _super);
                function YuanLingTeamItem2() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YuanLingTeamItem2.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.lb_state.visible = this.btn_do.visible = false;
                    this.gr_invite.visible = true;
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_cancel, this.onClickCancel, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_ok, this.onClickOk, this);
                };
                YuanLingTeamItem2.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var leader = data.leader ? data.leader[0] : null;
                    this.lb_name.text = leader ? leader.name : '';
                    this.lb_power.text = "\u4EBA\u6570\uFF1A" + data.count + "/" + this._proxy.getTeamCount();
                    this.lb_diff.text = "\u9080\u8BF7\u4F60\u6311\u6218" + game.YuanLingDiffAry[data.index] + "\u5143\u7075";
                    if (leader) {
                        this.head.updateShow(leader.head, leader.head_frame, leader.sex, (leader.vip || 0) % 100);
                    }
                };
                // 抛出一个事件，刷新上级list数据，移除当前项
                YuanLingTeamItem2.prototype.onClickCancel = function () {
                    facade.sendNt("on_yuanling_invite_list_item_delete" /* ON_YUANLING_INVITE_LIST_ITEM_DELETE */, this.data);
                };
                /**
                 * 如果点击接受的队伍已经开了或者满了，则会提示队伍已不存在，服务端飘字提示。
                 * 前端不管服务端如何处理，不论是加入队伍还是不给加入队伍，都删除这条信息。
                 * （若是加入队伍成功，就会跳到组队界面，全部被邀请信息都会清空了）
                 */
                YuanLingTeamItem2.prototype.onClickOk = function () {
                    var data = this.data;
                    facade.sendNt("on_yuanling_invite_list_item_delete" /* ON_YUANLING_INVITE_LIST_ITEM_DELETE */, data);
                    this._proxy.c2s_yuanling_jion_team(data.team_id, data.index);
                };
                return YuanLingTeamItem2;
            }(YuanLingTeamItem));
            shilian.YuanLingTeamItem2 = YuanLingTeamItem2;
            __reflect(YuanLingTeamItem2.prototype, "game.mod.shilian.YuanLingTeamItem2");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var YuanLingSceneView = /** @class */ (function (_super) {
                __extends(YuanLingSceneView, _super);
                function YuanLingSceneView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.YuanLingSceneSkin";
                    return _this;
                }
                return YuanLingSceneView;
            }(eui.Component));
            shilian.YuanLingSceneView = YuanLingSceneView;
            __reflect(YuanLingSceneView.prototype, "game.mod.shilian.YuanLingSceneView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var s2c_material_update = msg.s2c_material_update;
            var c2s_material_enter = msg.c2s_material_enter;
            var c2s_material_reset = msg.c2s_material_reset;
            var c2s_material_sweep = msg.c2s_material_sweep;
            var s2c_material_skip = msg.s2c_material_skip;
            var s2c_material_lvl = msg.s2c_material_lvl;
            var s2c_forbidden_update = msg.s2c_forbidden_update;
            var c2s_forbidden_get_info = msg.c2s_forbidden_get_info;
            var s2c_forbidden_reward = msg.s2c_forbidden_reward;
            var c2s_get_reward = msg.c2s_get_reward;
            var c2s_forbidden_enter = msg.c2s_forbidden_enter;
            var c2s_forbidden_sweep = msg.c2s_forbidden_sweep;
            var c2s_challenge_xiantower = msg.c2s_challenge_xiantower;
            var c2s_xiantower_sweep = msg.c2s_xiantower_sweep;
            var c2s_xiantower_get_rewards = msg.c2s_xiantower_get_rewards;
            var s2c_xiantower_info = msg.s2c_xiantower_info;
            var Handler = base.Handler;
            var ShilianProxy = /** @class */ (function (_super) {
                __extends(ShilianProxy, _super);
                function ShilianProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    //发送副本重置协议
                    _this._sendFubenReset = false;
                    return _this;
                    /**============== 修仙女仆自动挂机 ==============*/
                }
                ShilianProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    this._sendFubenReset = false;
                };
                ShilianProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new shilian.ShilianModel();
                    this.onProto(s2c_material_update, this.s2c_material_update, this);
                    this.onProto(s2c_material_lvl, this.s2c_material_lvl, this);
                    this.onProto(s2c_material_skip, this.s2c_material_skip, this);
                    this.onProto(s2c_forbidden_update, this.s2c_forbidden_update, this);
                    this.onProto(s2c_forbidden_reward, this.s2c_forbidden_reward, this);
                    this.onProto(s2c_xiantower_info, this.s2c_xiantower_info, this);
                };
                ShilianProxy.prototype.c2s_material_enter = function (type) {
                    var msg = new c2s_material_enter();
                    msg.type = type;
                    this._model.type = type; //用于服务端数据未及时返回时候
                    this.sendProto(msg);
                };
                ShilianProxy.prototype.c2s_material_reset = function (type) {
                    var msg = new c2s_material_reset();
                    msg.type = type;
                    this.sendProto(msg);
                };
                ShilianProxy.prototype.c2s_material_sweep = function (type) {
                    var msg = new c2s_material_sweep();
                    msg.type = type;
                    this.sendProto(msg);
                };
                ShilianProxy.prototype.s2c_material_update = function (n) {
                    var msg = n.body;
                    if (!this._model.infos) {
                        this._model.infos = msg.infos;
                    }
                    else {
                        for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                            var info = _a[_i];
                            var pos = this.getInfoPos(info.type);
                            if (pos >= 0) {
                                this._model.infos[pos] = info;
                            }
                            else {
                                this._model.infos.push(info);
                            }
                        }
                    }
                    if (this._sendFubenReset) {
                        //先发送重置协议，收到监听再处理挑战或者扫荡
                        this._sendFubenReset = false;
                        this.sendNt("on_xiuxiannvpu_special_challenge_next" /* ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT */); //发送重置协议，需重新处理
                    }
                    this.updateFubenHint();
                    this.sendNt("on_fuben_info_update" /* ON_FUBEN_INFO_UPDATE */);
                };
                ShilianProxy.prototype.getInfoPos = function (type) {
                    if (!this._model.infos || !this._model.infos.length) {
                        return -1;
                    }
                    var len = this._model.infos.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.infos[i];
                        if (info.type == type) {
                            return i;
                        }
                    }
                    return -1;
                };
                /**副本信息*/
                ShilianProxy.prototype.getFubenInfo = function (type) {
                    var pos = this.getInfoPos(type);
                    if (pos >= 0) {
                        return this._model.infos[pos];
                    }
                    return null;
                };
                ShilianProxy.prototype.s2c_material_lvl = function (n) {
                    var msg = n.body;
                    if (msg.type != undefined) {
                        this._model.type = msg.type;
                    }
                    if (msg.lv != undefined) {
                        this._model.lv = msg.lv;
                    }
                    if (msg.total_count != undefined) {
                        this._model.total_count = msg.total_count;
                    }
                    this.sendNt("on_fuben_scene_update" /* ON_FUBEN_SCENE_UPDATE */);
                };
                Object.defineProperty(ShilianProxy.prototype, "type", {
                    get: function () {
                        return this._model.type;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ShilianProxy.prototype, "lv", {
                    get: function () {
                        return this._model.lv;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ShilianProxy.prototype, "totalCount", {
                    get: function () {
                        return this._model.total_count;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ShilianProxy.prototype, "selType", {
                    get: function () {
                        return this._model.selType;
                    },
                    set: function (type) {
                        this._model.selType = type;
                    },
                    enumerable: true,
                    configurable: true
                });
                ShilianProxy.prototype.s2c_material_skip = function (n) {
                    var msg = n.body;
                    if (msg.st_lv != undefined) {
                        this._model.st_lv = msg.st_lv;
                    }
                    if (msg.end_lv != undefined) {
                        this._model.end_lv = msg.end_lv;
                    }
                    this.sendNt("on_fuben_skip_update" /* ON_FUBEN_SKIP_UPDATE */);
                };
                Object.defineProperty(ShilianProxy.prototype, "stLv", {
                    get: function () {
                        return this._model.st_lv;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ShilianProxy.prototype, "endLv", {
                    get: function () {
                        return this._model.end_lv;
                    },
                    enumerable: true,
                    configurable: true
                });
                ShilianProxy.prototype.resetLvInfo = function () {
                    this._model.st_lv = this._model.end_lv = this._model.lv = 0;
                };
                /**默认道具index*/
                ShilianProxy.prototype.getPropIndex = function (type) {
                    return this._model.typeToPropIndex[type];
                };
                ShilianProxy.prototype.isFubenOpen = function (type, showTips) {
                    var cfg = game.getConfigByNameId("material_fuben.json" /* MaterialFuben */, type);
                    return mod.ViewMgr.getIns().checkViewOpen(cfg.copy_open, showTips);
                };
                Object.defineProperty(ShilianProxy.prototype, "typeList", {
                    //材料副本，仙塔副本共用，需要时再分开
                    get: function () {
                        return this._model.typeList;
                    },
                    enumerable: true,
                    configurable: true
                });
                //获取特权加成，返回百分比
                ShilianProxy.prototype.getPrivilegeAdd = function (cfg, type) {
                    var addVal = 0;
                    if (!cfg) {
                        return addVal;
                    }
                    switch (type) {
                        case 1 /* Type1 */:
                            addVal = cfg.fenmo_income;
                            break;
                        case 2 /* Type2 */:
                            addVal = cfg.jingui_income;
                            break;
                        case 3 /* Type3 */:
                            addVal = cfg.penglai_income;
                            break;
                    }
                    return addVal / 100;
                };
                /**挑战红点类型*/
                ShilianProxy.prototype.getChallengeHintType = function (type) {
                    return this._model.challengeHints[type - 1];
                };
                /**重置红点类型*/
                ShilianProxy.prototype.getResetHintType = function (type) {
                    return this._model.resetHints[type - 1];
                };
                /**更新红点*/
                ShilianProxy.prototype.updateFubenHint = function () {
                    this.updateAllChallengeHint();
                    this.updateAllResetHint();
                    this.checkAutoChallengeFuben();
                };
                /**更新挑战红点*/
                ShilianProxy.prototype.updateAllChallengeHint = function () {
                    var typeList = this._model.typeList;
                    for (var i = 0; i < typeList.length; ++i) {
                        var type = typeList[i];
                        this.updateChallengeHint(type);
                    }
                };
                ShilianProxy.prototype.updateChallengeHint = function (type) {
                    if (!this.isFubenOpen(type)) {
                        return;
                    }
                    var hint = this.checkChallengeHint(type);
                    var hintType = this.getChallengeHintType(type);
                    var cfg = game.getConfigByNameId("material_fuben.json" /* MaterialFuben */, type);
                    mod.HintMgr.setHint(hint, hintType, cfg.copy_open);
                };
                ShilianProxy.prototype.checkChallengeHint = function (type) {
                    var selInfo = this.getFubenInfo(type);
                    var maxLv = selInfo && selInfo.history_lv ? selInfo.history_lv : 0;
                    var curLv = selInfo && selInfo.lvl ? selInfo.lvl : 1;
                    var cfgList = game.getConfigByNameId("material_scene.json" /* MaterialScene */, type);
                    var isMax = maxLv == curLv && !cfgList[maxLv + 1];
                    var selCfg = game.getConfigByNameId("material_fuben.json" /* MaterialFuben */, type);
                    var openLimit = selCfg.mopup_open;
                    var canSweep = maxLv >= openLimit && maxLv > curLv - 1 && !isMax; //可扫荡
                    if (canSweep) {
                        return true;
                    }
                    var cfg = cfgList[curLv];
                    var power = cfg.show_power;
                    var canChallenge = game.RoleVo.ins.showpower.toNumber() >= power && !isMax;
                    return canChallenge;
                };
                /**更新重置红点*/
                ShilianProxy.prototype.updateAllResetHint = function () {
                    var typeList = this._model.typeList;
                    for (var i = 0; i < typeList.length; ++i) {
                        var type = typeList[i];
                        this.updateResetHint(type);
                    }
                };
                ShilianProxy.prototype.updateResetHint = function (type) {
                    if (!this.isFubenOpen(type)) {
                        return;
                    }
                    var hint = this.checkResetHint(type);
                    var hintType = this.getResetHintType(type);
                    mod.HintMgr.setHint(hint, hintType);
                };
                ShilianProxy.prototype.checkResetHint = function (type) {
                    var selInfo = this.getFubenInfo(type);
                    var curLv = selInfo && selInfo.lvl ? selInfo.lvl : 1;
                    if (curLv <= 1) {
                        return false;
                    }
                    var isFree = selInfo && !!selInfo.free;
                    if (isFree) {
                        return true;
                    }
                    var selCfg = game.getConfigByNameId("material_fuben.json" /* MaterialFuben */, type);
                    var cost = selCfg.cost[0];
                    var idx = cost[0];
                    var costCnt = cost[1];
                    return mod.BagUtil.checkPropCnt(idx, costCnt);
                };
                ShilianProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("showpower" /* showpower */) >= 0) {
                        this.updateAllChallengeHint();
                        this.updateAllXiantaChallengeHint();
                        this.updateFbdHint();
                    }
                };
                ShilianProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    if (indexs.indexOf(1450703001 /* Jinguiling */) >= 0) {
                        this.updateResetHint(1 /* Type1 */);
                    }
                    else if (indexs.indexOf(1450702001 /* Fengmoling */) >= 0) {
                        this.updateResetHint(2 /* Type2 */);
                    }
                    else if (indexs.indexOf(1450704001 /* Penglailing */) >= 0) {
                        this.updateResetHint(3 /* Type3 */);
                    }
                };
                /************************** 禁地副本 *************************/
                /**
                 * 禁地副本基本信息
                 */
                ShilianProxy.prototype.s2c_forbidden_update = function (n) {
                    var msg = n.body;
                    if (!msg.infos) {
                        return;
                    }
                    if (!this._model.fbdInfos) {
                        this._model.fbdInfos = {};
                    }
                    var isSend = false;
                    for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                        var info = _a[_i];
                        var lastInfo = this._model.fbdInfos[info.tab_id];
                        var lastCnt = lastInfo && lastInfo.free || 0;
                        var curCnt = info && info.free || 0;
                        this._model.fbdInfos[info.tab_id] = info;
                        //扫荡次数变化
                        if (!isSend && lastCnt && curCnt != lastCnt) {
                            isSend = true;
                            this.sendNt("on_xiuxiannvpu_special_challenge_next" /* ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT */); //扫荡重置
                        }
                    }
                    this.checkAutoSweepJindi();
                    this.updateFbdHint();
                    this.sendNt("on_forbidden_info_update" /* ON_FORBIDDEN_INFO_UPDATE */);
                };
                /**
                 * 取禁地信息
                 */
                ShilianProxy.prototype.c2s_forbidden_get_info = function () {
                    var msg = new c2s_forbidden_get_info();
                    this.sendProto(msg);
                };
                /**
                 * 通关大奖推送
                 */
                ShilianProxy.prototype.s2c_forbidden_reward = function (n) {
                    var msg = n.body;
                    if (!msg.infos) {
                        return;
                    }
                    if (!this._model.fbdAwds) {
                        this._model.fbdAwds = {};
                    }
                    for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.flag == 2) {
                            //已领取
                            this.updateFbdHasDrawAwds(info.index, info.id);
                        }
                        if (info.flag != 1) {
                            continue;
                        }
                        var cfg = game.getConfigByNameId("forbidden_fuben.json" /* ForbiddenFuben */, info.index);
                        if (!this._model.fbdAwds[cfg.tabid]) {
                            this._model.fbdAwds[cfg.tabid] = {};
                        }
                        if (!this._model.fbdAwds[cfg.tabid][info.index]) {
                            this._model.fbdAwds[cfg.tabid][info.index] = [];
                        }
                        var curAwds = this._model.fbdAwds[cfg.tabid][info.index];
                        var exist = void 0;
                        for (var _b = 0, curAwds_1 = curAwds; _b < curAwds_1.length; _b++) {
                            var awd = curAwds_1[_b];
                            if (awd.index == info.index && awd.id == info.id) {
                                exist = true;
                                break;
                            }
                        }
                        if (!exist) {
                            curAwds.push(info);
                        }
                    }
                    this.updateFbdHint();
                    this.sendNt("on_forbidden_awd_update" /* ON_FORBIDDEN_AWD_UPDATE */);
                };
                //更新已领取列表
                ShilianProxy.prototype.updateFbdHasDrawAwds = function (index, id) {
                    if (!this._model.hasDrawAwds[index]) {
                        this._model.hasDrawAwds[index] = [];
                    }
                    var pos = this._model.hasDrawAwds[index].indexOf(id);
                    if (pos < 0) {
                        this._model.hasDrawAwds[index].push(id);
                    }
                };
                //是否已领取
                ShilianProxy.prototype.hasDrawAwds = function (index, id) {
                    if (!this._model.hasDrawAwds[index]) {
                        return false;
                    }
                    return this._model.hasDrawAwds[index].indexOf(id) >= 0;
                };
                /**
                 * 领取通关大奖
                 * @param bigGateId
                 * @param smallGateId
                 */
                ShilianProxy.prototype.c2s_get_reward = function (bigGateId, smallGateId) {
                    var msg = new c2s_get_reward();
                    msg.index = bigGateId;
                    msg.id = smallGateId;
                    this.sendProto(msg);
                };
                /**
                 * 进入挑战
                 * @param type
                 */
                ShilianProxy.prototype.c2s_forbidden_enter = function (type) {
                    var msg = new c2s_forbidden_enter();
                    msg.index = type;
                    this.sendProto(msg);
                };
                /**
                 * 请求扫荡
                 */
                ShilianProxy.prototype.c2s_forbidden_sweep = function (type) {
                    var msg = new c2s_forbidden_sweep();
                    msg.tab_id = type;
                    this.sendProto(msg);
                };
                /**
                 * 指定类型禁地副本是否已开启
                 * @param type
                 */
                ShilianProxy.prototype.isFbdTypeOpen = function (type, showTips) {
                    var cfg = this.getFbdFirstFubenCfg(type);
                    if (!cfg) {
                        return false;
                    }
                    var isOpen = mod.RoleUtil.isLimitOpen(cfg.open);
                    if (!isOpen && showTips) {
                        var openStr = mod.RoleUtil.getLimitStr(cfg.open, false, false);
                        game.PromptBox.getIns().show(openStr);
                    }
                    return isOpen;
                };
                ShilianProxy.prototype.getFbdTypes = function () {
                    return this._model.fbdTypes;
                };
                ShilianProxy.prototype.getFbdInfo = function (type) {
                    return this._model.fbdInfos[type];
                };
                /**
                 * 取通关大奖
                 * @param type
                 * @param bigGateId
                 * @returns
                 */
                ShilianProxy.prototype.getFbdAwd = function (type) {
                    var awds = [];
                    var awds1 = this._model.fbdAwds[type];
                    for (var id in awds1) {
                        var awds2 = awds1[id];
                        awds = awds.concat(awds2);
                    }
                    return awds;
                };
                /**
                 * 取通关大奖
                 * @param type
                 * @param bigGateId
                 * @returns
                 */
                ShilianProxy.prototype.getFbdAwd2 = function (type, bigGateId) {
                    var typeAwds = this._model.fbdAwds[type];
                    var awds = typeAwds ? typeAwds[bigGateId] : [];
                    return awds;
                };
                ShilianProxy.prototype.getFbdFubenCfgByType = function (type) {
                    if (this._model.fbdFubenCfg[type]) {
                        return this._model.fbdFubenCfg[type];
                    }
                    var cfgs = game.getConfigListByName("forbidden_fuben.json" /* ForbiddenFuben */);
                    var cfgs1 = {};
                    for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                        var cfg = cfgs_1[_i];
                        if (cfg.tabid == type) {
                            cfgs1[cfg.index] = cfg;
                        }
                    }
                    this._model.fbdFubenCfg[type] = cfgs1;
                    return cfgs1;
                };
                /**
                 * 取指定类型的第一个禁地副本配置
                 * @param type
                 * @returns
                 */
                ShilianProxy.prototype.getFbdFirstFubenCfg = function (type) {
                    if (this._model.fbdFirstFubenCfg[type]) {
                        return this._model.fbdFirstFubenCfg[type];
                    }
                    var cfgs = game.getConfigListByName("forbidden_fuben.json" /* ForbiddenFuben */);
                    var cfg1;
                    for (var _i = 0, cfgs_2 = cfgs; _i < cfgs_2.length; _i++) {
                        var cfg = cfgs_2[_i];
                        if (cfg.tabid == type) {
                            cfg1 = cfg;
                            break;
                        }
                    }
                    if (!cfg1) {
                        return null;
                    }
                    this._model.fbdFirstFubenCfg[type] = cfg1;
                    return cfg1;
                };
                /**
                 * 取当前已通关的最大小关卡id
                 * @param type
                 * @param bigGateId
                 */
                ShilianProxy.prototype.getCurSmallGateId = function (type, bigGateId) {
                    var isPass = this.isBigGateFinished(type, bigGateId);
                    if (isPass) {
                        return this.getGateEndCfg(bigGateId).gate_id;
                    }
                    var info = this.getFbdInfo(type);
                    if (!info || bigGateId > info.index) {
                        return 0;
                    }
                    return info ? info.id : 0;
                };
                /**
                 * 取领取通关大奖需完成的小关卡数量
                 * @param bigGateId
                 * @param curSmallGateId
                 * @returns
                 */
                ShilianProxy.prototype.getBigAwdCondition = function (bigGateId, curSmallGateId) {
                    var cnt = 0;
                    var cfgs = game.getConfigByNameId("forbidden_gate.json" /* ForbiddenGate */, bigGateId);
                    if (!cfgs) {
                        return 0;
                    }
                    for (var id in cfgs) {
                        var cfg = cfgs[id];
                        if (cfg.gate_id < curSmallGateId) {
                            continue;
                        }
                        cnt++;
                        if (cfg.gate_show_reward > 0) {
                            break;
                        }
                    }
                    return cnt;
                };
                /**
                 * 取最近的可领取的通关大奖配置（已领取的排除）
                 * @param bigGateId
                 * @returns
                 */
                ShilianProxy.prototype.getNearBigAwdCfg = function (bigGateId) {
                    var cfgs = game.getConfigByNameId("forbidden_gate.json" /* ForbiddenGate */, bigGateId);
                    if (!cfgs) {
                        return null;
                    }
                    var cfg1;
                    for (var id in cfgs) {
                        var cfg = cfgs[id];
                        if (!cfg.gate_show_reward) {
                            //不存在奖励
                            continue;
                        }
                        cfg1 = cfg;
                        var hasDraw = this.hasDrawAwds(bigGateId, cfg.gate_id);
                        if (!hasDraw) {
                            //未领取时，结束循环
                            break;
                        }
                    }
                    return cfg1;
                };
                /**
                 * 每大关的最后一小关配置（扫荡奖励等用）
                 * @param bigGateId
                 * @returns
                 */
                ShilianProxy.prototype.getGateEndCfg = function (bigGateId) {
                    if (this._model.fbdGateEndCfg[bigGateId]) {
                        return this._model.fbdGateEndCfg[bigGateId];
                    }
                    var cfgs = game.getConfigByNameId("forbidden_gate.json" /* ForbiddenGate */, bigGateId);
                    if (!cfgs) {
                        return null;
                    }
                    var cfg;
                    for (var id in cfgs) { // 取最后一个
                        cfg = cfgs[id];
                    }
                    if (cfg) {
                        this._model.fbdGateEndCfg[bigGateId] = cfg;
                    }
                    return cfg;
                };
                /**
                 * 大关卡是否已通关
                 * @param bigGateId
                 * @returns
                 */
                ShilianProxy.prototype.isBigGateFinished = function (type, bigGateId) {
                    // let passSmallGateId = this.getCurSmallGateId(type, bigGateId);
                    // let fbdGateCfg = this.getGateEndCfg(bigGateId);
                    // return passSmallGateId >= fbdGateCfg.gate_id;
                    var info = this.getFbdInfo(type);
                    var isFinished = info ? info.index > bigGateId ||
                        info.index >= bigGateId && this.isEndSmallGate2(bigGateId, info.id) : false;
                    return isFinished;
                };
                ShilianProxy.prototype.isFinishByType = function (type) {
                    var cfgMap = this.getFbdFubenCfgByType(type);
                    for (var k in cfgMap) {
                        var cfg = cfgMap[k];
                        var bool = this.isBigGateFinished(type, cfg.index);
                        if (!bool) {
                            return false;
                        }
                    }
                    return true;
                };
                Object.defineProperty(ShilianProxy.prototype, "isEndSmallGate", {
                    /**
                     * 已通关最后一小关卡
                     */
                    get: function () {
                        var info = this.getFbdInfo(this.curFbdType);
                        if (!info) {
                            return false;
                        }
                        return this.isEndSmallGate2(info.index, info.id);
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 是否为最后一小关卡
                 */
                ShilianProxy.prototype.isEndSmallGate2 = function (bigGateId, curSmallGateId) {
                    var endCfg = this.getGateEndCfg(bigGateId);
                    if (curSmallGateId >= endCfg.gate_id) {
                        return true;
                    }
                    return false;
                };
                /**
                 * 有无大奖可领取
                 * @param type
                 * @returns
                 */
                ShilianProxy.prototype.hasBigAwd = function (type, bigGateId) {
                    var awd = this.getFbdAwd2(type, bigGateId);
                    return awd ? !!awd.length : false;
                };
                /**
                 * 取剩余扫荡次数
                 * @param type
                 */
                ShilianProxy.prototype.getSaodangTimes = function (type) {
                    var info = this.getFbdInfo(type);
                    return info ? info.free : 0;
                };
                ShilianProxy.prototype.updateFbdHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670113 /* Forbidden */)) {
                        return;
                    }
                    var hint = false;
                    for (var type = 1 /* Type1 */; type <= 5 /* Type5 */; type++) {
                        if (this.getFbdTypeHint(type)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.fbdHint);
                };
                ShilianProxy.prototype.getFbdTypeHint = function (type) {
                    if (this.getSaodangHint(type)) {
                        return true;
                    }
                    var awd = this.getFbdAwd(type);
                    if (awd && awd.length) {
                        return true;
                    }
                    return this.getChallengeHint(type);
                };
                //扫荡红点应该是绑定类型的，而不是具体的关卡，跟设定有关
                ShilianProxy.prototype.getSaodangHint = function (type) {
                    var finished = false; //只要有一个关卡通关，即可扫荡
                    var cfgs = this.getFbdFubenCfgByType(type);
                    for (var idx in cfgs) {
                        var cfg = cfgs[idx];
                        if (this.isBigGateFinished(type, cfg.index)) {
                            finished = true;
                            break;
                        }
                    }
                    if (!finished) {
                        return false;
                    }
                    var times = this.getSaodangTimes(type);
                    return times > 0;
                };
                //挑战红点，达到推荐战力时候显示，跟类型绑定就行了
                ShilianProxy.prototype.getChallengeHint = function (type) {
                    var cfgs = this.getFbdFubenCfgByType(type);
                    var curCfg; //当前挑战的大关卡配置
                    for (var idx in cfgs) {
                        var cfg = cfgs[idx];
                        if (this.isBigGateFinished(type, cfg.index)) {
                            continue; //已通关的关卡跳过判断
                        }
                        curCfg = cfg;
                        break;
                    }
                    if (!curCfg) {
                        return false; //全部关卡已通关，不提示挑战红点，不能根据服务端的数据做判断，拿到的数据可能是已挑战的关卡
                    }
                    var isLimitOpen = mod.RoleUtil.isLimitOpen(curCfg.open); //是否达到开启限制条件
                    if (!isLimitOpen) {
                        return false; //未开启时候不提示
                    }
                    var curInfo = this.getFbdInfo(type);
                    //取当前小关卡ID，服务端传的可能是0
                    var gateId = curInfo && curInfo.index == curCfg.index && curInfo.id ? curInfo.id : 0;
                    gateId++;
                    // 红点判断的是下一关的战力 gateId取的是已通关的id
                    var gateCfgs = game.getConfigByNameId("forbidden_gate.json" /* ForbiddenGate */, curCfg.index);
                    var gateCfg = gateCfgs[gateId];
                    var power = gateCfg.show_power;
                    return game.RoleVo.ins.showpower.toNumber() >= power;
                };
                Object.defineProperty(ShilianProxy.prototype, "curFbdType", {
                    get: function () {
                        return this._model.curFbdType;
                    },
                    set: function (value) {
                        this._model.curFbdType = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ShilianProxy.prototype, "curFbdBigGateId", {
                    get: function () {
                        return this._model.curFbdBigGateId;
                    },
                    set: function (value) {
                        this._model.curFbdBigGateId = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                /********************************仙塔副本*********************************/
                ShilianProxy.prototype.c2s_challenge_xiantower = function (type) {
                    var msg = new c2s_challenge_xiantower();
                    msg.type = type;
                    this.sendProto(msg);
                };
                ShilianProxy.prototype.c2s_xiantower_sweep = function (type) {
                    var msg = new c2s_xiantower_sweep();
                    msg.type = type;
                    this.sendProto(msg);
                };
                ShilianProxy.prototype.c2s_xiantower_get_rewards = function (type) {
                    var msg = new c2s_xiantower_get_rewards();
                    msg.type = type;
                    this.sendProto(msg);
                };
                ShilianProxy.prototype.s2c_xiantower_info = function (n) {
                    var msg = n.body;
                    if (!this._model.xiantaInfos) {
                        this._model.xiantaInfos = msg.list;
                    }
                    else {
                        var isSend = false;
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            var pos = this.getXiantaInfoPos(info.type);
                            if (pos >= 0) {
                                var lastInfo = this._model.xiantaInfos[pos];
                                var lastSweepCnt = lastInfo && lastInfo.count || 0; //上一次扫荡次数
                                this._model.xiantaInfos[pos] = info;
                                var curSweepCnt = info.count; //当前扫荡次数
                                if (!isSend && lastSweepCnt && lastSweepCnt != curSweepCnt) {
                                    isSend = true;
                                    this.sendNt("on_xiuxiannvpu_special_challenge_next" /* ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT */); //扫荡次数变化，抛出事件
                                }
                            }
                            else {
                                this._model.xiantaInfos.push(info);
                            }
                        }
                    }
                    this.updateXiantaHint();
                    this.sendNt("on_xianta_info_update" /* ON_XIANTA_INFO_UPDATE */);
                };
                ShilianProxy.prototype.getXiantaInfoPos = function (type) {
                    if (!this._model.xiantaInfos || !this._model.xiantaInfos.length) {
                        return -1;
                    }
                    var len = this._model.xiantaInfos.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.xiantaInfos[i];
                        if (info.type == type) {
                            return i;
                        }
                    }
                    return -1;
                };
                /**副本信息*/
                ShilianProxy.prototype.getXiantaInfo = function (type) {
                    var pos = this.getXiantaInfoPos(type);
                    if (pos >= 0) {
                        return this._model.xiantaInfos[pos];
                    }
                    return null;
                };
                ShilianProxy.prototype.getXiantaBigRewardCfg = function (type) {
                    var cfgList = game.getConfigByNameId("xianta_scene.json" /* XiantaScene */, type); //层数配置
                    var lv = 1;
                    var info = this.getXiantaInfo(type);
                    if (info && info.reward) {
                        lv = info.reward.layer + 1; //从已领取的奖励开始算起
                    }
                    var cfg = cfgList[lv];
                    while (cfg && !cfg.big_reward) {
                        lv++;
                        cfg = cfgList[lv]; //向下寻找奖励
                    }
                    return cfg; //返回空时不显示大奖
                };
                ShilianProxy.prototype.isXiantaOpen = function (type, showTips) {
                    //todo，客户端关闭第三个仙塔
                    if (type == 3 /* Type3 */) {
                        if (showTips) {
                            game.PromptBox.getIns().show(game.getLanById("world_boss1" /* world_boss1 */));
                        }
                        return false;
                    }
                    var cfg = game.getConfigByNameId("xianta_fuben.json" /* XiantaFuben */, type);
                    return mod.ViewMgr.getIns().checkViewOpen(cfg.copy_open, showTips);
                };
                Object.defineProperty(ShilianProxy.prototype, "selXiantaType", {
                    get: function () {
                        return this._model.selXiantaType;
                    },
                    set: function (type) {
                        this._model.selXiantaType = type;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**仙塔只显示退出按钮，满级或者小于推荐战力*/
                ShilianProxy.prototype.isXiantaShowExit = function () {
                    var type = this._model.selXiantaType;
                    return !this.checkXiantaChallengeHint(type);
                };
                /**红点*/
                ShilianProxy.prototype.getXiantaHint = function (type) {
                    if (!this.isXiantaOpen(type)) {
                        return false;
                    }
                    var hintType1 = this.getXiantaChallengeHintType(type);
                    var hintType2 = this.getXiantaSweepHintType(type);
                    var hintType3 = this.getXiantaRewardHintType(type);
                    var hintType4 = this.getXiantaRankHintType(type);
                    return mod.HintMgr.getHint(hintType1) || mod.HintMgr.getHint(hintType2) || mod.HintMgr.getHint(hintType3) || mod.HintMgr.getHint(hintType4);
                };
                /**挑战红点类型*/
                ShilianProxy.prototype.getXiantaChallengeHintType = function (type) {
                    return this._model.xiantaChallengeHints[type - 1];
                };
                /**扫荡红点类型*/
                ShilianProxy.prototype.getXiantaSweepHintType = function (type) {
                    return this._model.xiantaSweepHints[type - 1];
                };
                /**奖励红点类型*/
                ShilianProxy.prototype.getXiantaRewardHintType = function (type) {
                    return this._model.xiantaRewardHints[type - 1];
                };
                /**奖励红点类型*/
                ShilianProxy.prototype.getXiantaRankHintType = function (type) {
                    return this._model.xiantaRankHints[type - 1];
                };
                /**更新红点*/
                ShilianProxy.prototype.updateXiantaHint = function () {
                    this.updateAllXiantaChallengeHint();
                    this.updateAllXiantaSweepHint();
                    this.updateAllXiantaRewardHint();
                    this.checkAutoChallengeXianta();
                };
                /**更新挑战红点*/
                ShilianProxy.prototype.updateAllXiantaChallengeHint = function () {
                    var typeList = this._model.xiantaTypeList;
                    for (var i = 0; i < typeList.length; ++i) {
                        var type = typeList[i];
                        this.updateXiantaChallengeHint(type);
                    }
                };
                ShilianProxy.prototype.updateXiantaChallengeHint = function (type) {
                    if (!this.isXiantaOpen(type)) {
                        return;
                    }
                    var hint = this.checkXiantaChallengeHint(type);
                    var hintType = this.getXiantaChallengeHintType(type);
                    //let cfg: XiantaFubenConfig = getConfigByNameId(ConfigName.XiantaFuben, type);
                    //HintMgr.setHint(hint, hintType, cfg.copy_open);
                    mod.HintMgr.setHint(hint, hintType); //先不设置功能id，根据需求来处理
                };
                ShilianProxy.prototype.checkXiantaChallengeHint = function (type) {
                    var cfgList = game.getConfigByNameId("xianta_scene.json" /* XiantaScene */, type);
                    var selInfo = this.getXiantaInfo(type);
                    var passLv = selInfo && selInfo.layer ? selInfo.layer : 0;
                    var curLv = passLv + 1;
                    if (!cfgList[curLv]) {
                        return false;
                    }
                    var cfg = cfgList[curLv];
                    var power = cfg.show_power;
                    return game.RoleVo.ins.showpower.toNumber() >= power;
                };
                /**更新扫荡红点*/
                ShilianProxy.prototype.updateAllXiantaSweepHint = function () {
                    var typeList = this._model.xiantaTypeList;
                    for (var i = 0; i < typeList.length; ++i) {
                        var type = typeList[i];
                        this.updateXiantaSweepHint(type);
                    }
                };
                ShilianProxy.prototype.updateXiantaSweepHint = function (type) {
                    if (!this.isXiantaOpen(type)) {
                        return;
                    }
                    var hint = this.checkXiantaSweepHint(type);
                    var hintType = this.getXiantaSweepHintType(type);
                    mod.HintMgr.setHint(hint, hintType);
                };
                ShilianProxy.prototype.checkXiantaSweepHint = function (type) {
                    var selInfo = this.getXiantaInfo(type);
                    var passLv = selInfo && selInfo.layer ? selInfo.layer : 0;
                    if (!passLv) {
                        return false; //未通关不能扫荡
                    }
                    var cnt = selInfo && selInfo.count ? selInfo.count : 0;
                    return cnt > 0; //可扫荡
                };
                /**更新奖励红点*/
                ShilianProxy.prototype.updateAllXiantaRewardHint = function () {
                    var typeList = this._model.xiantaTypeList;
                    for (var i = 0; i < typeList.length; ++i) {
                        var type = typeList[i];
                        this.updateXiantaRewardHint(type);
                    }
                };
                ShilianProxy.prototype.updateXiantaRewardHint = function (type) {
                    if (!this.isXiantaOpen(type)) {
                        return;
                    }
                    var hint = this.checkXiantaRewardHint(type);
                    var hintType = this.getXiantaRewardHintType(type);
                    mod.HintMgr.setHint(hint, hintType);
                };
                ShilianProxy.prototype.checkXiantaRewardHint = function (type) {
                    var selInfo = this.getXiantaInfo(type);
                    var passLv = selInfo && selInfo.layer ? selInfo.layer : 0;
                    if (!passLv) {
                        return false;
                    }
                    var bigCfg = this.getXiantaBigRewardCfg(type);
                    if (bigCfg) {
                        var needLv = bigCfg.lvl;
                        return passLv >= needLv;
                    }
                    return false;
                };
                /**需要监听的，子类重写下*/
                ShilianProxy.prototype.onMainPassGuanqiaUpdate = function (n) {
                    this.updateFbdHint();
                };
                /**============== 修仙女仆自动挂机 ==============*/
                ShilianProxy.prototype.canAutoSweepFuben = function (type) {
                    var selInfo = this.getFubenInfo(type);
                    var maxLv = selInfo && selInfo.history_lv ? selInfo.history_lv : 0;
                    var curLv = selInfo && selInfo.lvl ? selInfo.lvl : 1;
                    var cfgList = game.getConfigByNameId("material_scene.json" /* MaterialScene */, type);
                    var isMax = maxLv == curLv && !cfgList[maxLv + 1];
                    var selCfg = game.getConfigByNameId("material_fuben.json" /* MaterialFuben */, type);
                    var openLimit = selCfg.mopup_open;
                    var canSweep = maxLv >= openLimit && maxLv > curLv - 1 && !isMax; //可扫荡
                    if (canSweep) {
                        return true;
                    }
                    return false;
                };
                ShilianProxy.prototype.canAutoChallengeFuben = function (type) {
                    return this.checkChallengeHint(type) || this.checkResetHint(type);
                };
                ShilianProxy.prototype.sendAutoChallengeFuben = function (fubenType) {
                    this.selType = fubenType; //副本结算界面用到
                    if (this.canAutoSweepFuben(fubenType)) {
                        this.c2s_material_sweep(fubenType);
                    }
                    else if (this.checkChallengeHint(fubenType)) {
                        this.c2s_material_enter(fubenType);
                    }
                    else {
                        var info = this.getFubenInfo(fubenType);
                        var curLv = info && info.lvl ? info.lvl : 1;
                        if (curLv > 1) {
                            this.c2s_material_reset(fubenType);
                            this._sendFubenReset = true; //发送重置协议
                        }
                    }
                };
                //11.封魔圣殿 12.金龟宝穴 13.蓬莱仙境
                ShilianProxy.prototype.checkAutoChallengeFuben = function () {
                    var list = this._model.typeList;
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var type = list_1[_i];
                        var eventType = game.FubenToNvpuEventType[type];
                        var cfg = game.getConfigByNameId("ayah_event_func.json" /* XiuxianNvpuEventFunc */, eventType);
                        if (!cfg || !cfg.open_func || !mod.ViewMgr.getIns().checkViewOpen(cfg.open_func)) {
                            continue;
                        }
                        if (this.canAutoChallengeFuben(type)) {
                            mod.RoleUtil.addAutoChallengeEvent(eventType, Handler.alloc(this, this.sendAutoChallengeFuben, [type]));
                        }
                        else {
                            mod.RoleUtil.removeAutoChallengeEvent(eventType);
                        }
                    }
                };
                ShilianProxy.prototype.canAutoSweepXianta = function (type) {
                    if (!this.isXiantaOpen(type)) {
                        return false;
                    }
                    return this.checkXiantaSweepHint(type);
                };
                ShilianProxy.prototype.sendAutoSweepXianta = function (type) {
                    var can = this.canAutoSweepXianta(type);
                    if (can) {
                        this.c2s_xiantower_sweep(type);
                    }
                };
                //15.万剑仙塔  16.灵兽仙塔
                ShilianProxy.prototype.checkAutoChallengeXianta = function () {
                    var list = this._model.typeList;
                    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                        var type = list_2[_i];
                        var eventType = game.XiantaTypeToNvpuEventType[type];
                        if (!this.isXiantaOpen(type) || !eventType) {
                            continue;
                        }
                        if (this.canAutoSweepXianta(type)) {
                            mod.RoleUtil.addAutoChallengeEvent(eventType, Handler.alloc(this, this.sendAutoSweepXianta, [type]));
                        }
                        else {
                            mod.RoleUtil.removeAutoChallengeEvent(eventType);
                        }
                    }
                };
                ShilianProxy.prototype.canSweepJindi = function (type) {
                    if (!this.isFbdTypeOpen(type)) {
                        return false;
                    }
                    return this.getSaodangHint(type);
                };
                ShilianProxy.prototype.sendAutoSweepJindi = function (type) {
                    if (this.canSweepJindi(type)) {
                        this.c2s_forbidden_sweep(type);
                    }
                };
                //17-20
                ShilianProxy.prototype.checkAutoSweepJindi = function () {
                    for (var type = 2 /* Type2 */; type <= 5 /* Type5 */; type++) {
                        var eventType = game.JindiToNvpuEventType[type];
                        var cfg = game.getConfigByNameId("ayah_event_func.json" /* XiuxianNvpuEventFunc */, eventType);
                        if (!cfg || !cfg.open_func || !mod.ViewMgr.getIns().checkViewOpen(cfg.open_func)) {
                            continue;
                        }
                        if (this.canSweepJindi(type)) {
                            mod.RoleUtil.addAutoChallengeEvent(eventType, Handler.alloc(this, this.sendAutoSweepJindi, [type]));
                        }
                        else {
                            mod.RoleUtil.removeAutoChallengeEvent(eventType);
                        }
                    }
                };
                return ShilianProxy;
            }(game.ProxyBase));
            shilian.ShilianProxy = ShilianProxy;
            __reflect(ShilianProxy.prototype, "game.mod.shilian.ShilianProxy", ["game.mod.IShilianProxy", "base.IProxy"]);
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var YuanLingModel = /** @class */ (function () {
                function YuanLingModel() {
                    /** 已使用收益次数 */
                    this.count = 0;
                    /** 已通关的难度 */
                    this.diff = 0;
                    /** 已经购买次数 */
                    this.buy = 0;
                    /** 单个难度信息 */
                    this.info = {};
                    /** 队伍列表信息 */
                    this.team_list = [];
                    /** 自己队伍的难度 */
                    this.own_index = 0;
                    /** 自己队伍的id */
                    this.own_team_id = 0;
                    /** 自己队伍信息 */
                    this.own_team_infos = [];
                    /** buff时间 */
                    this.buff_info = {};
                    /**被提出的队伍 [队伍id:被踢出的时间戳]*/
                    this.kick_out_team = {};
                    /**收到组队邀请*/
                    this.be_invited_team = {};
                    /**可邀请列表*/
                    this.invite_list = [];
                    /**进入副本挑战*/
                    this.scene_index = 0; //难度
                    this.scene_layer = 0; //第几层
                    /**伤害排行*/
                    this.damage_info = [];
                    /**各难度通关次数*/
                    this.challenge_counts = {};
                    /**元灵试炼红点*/
                    this.hintPath = ["49" /* Shilian */, "01" /* ShilianMain */ + "04" /* YuanLing */];
                }
                return YuanLingModel;
            }());
            shilian.YuanLingModel = YuanLingModel;
            __reflect(YuanLingModel.prototype, "game.mod.shilian.YuanLingModel");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var s2c_yuanling_info = msg.s2c_yuanling_info;
            var s2c_yuanling_team_list = msg.s2c_yuanling_team_list;
            var c2s_yuanling_jion_team = msg.c2s_yuanling_jion_team;
            var c2s_yuanling_out_time = msg.c2s_yuanling_out_time;
            var s2c_yuanling_team_info = msg.s2c_yuanling_team_info;
            var c2s_yuanling_check = msg.c2s_yuanling_check;
            var c2s_yuanling_buyCount = msg.c2s_yuanling_buyCount;
            var c2s_yuanling_enter = msg.c2s_yuanling_enter;
            var s2c_yuanling_buff_info = msg.s2c_yuanling_buff_info;
            var c2s_yuanling_buyBuff = msg.c2s_yuanling_buyBuff;
            var s2c_yuanling_exit_team = msg.s2c_yuanling_exit_team;
            var c2s_yuanling_invita = msg.c2s_yuanling_invita;
            var s2c_yuanling_invita = msg.s2c_yuanling_invita;
            var c2s_yuanling_info = msg.c2s_yuanling_info;
            var c2s_yuanling_team_list = msg.c2s_yuanling_team_list;
            var c2s_yuanling_role_list = msg.c2s_yuanling_role_list;
            var s2c_yuanling_role_list = msg.s2c_yuanling_role_list;
            var c2s_yuanling_create_team = msg.c2s_yuanling_create_team;
            var s2c_yuanling_fb_info = msg.s2c_yuanling_fb_info;
            var c2s_yuanling_exit_team = msg.c2s_yuanling_exit_team;
            var s2c_yuanling_damage = msg.s2c_yuanling_damage;
            var s2c_yuanling_counts = msg.s2c_yuanling_counts;
            var c2s_yuanling_room_invita = msg.c2s_yuanling_room_invita;
            var facade = base.facade;
            /**
             * @description 元灵试炼系统
             */
            var YuanLingProxy = /** @class */ (function (_super) {
                __extends(YuanLingProxy, _super);
                function YuanLingProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**当前困难度*/
                    _this.curDiffType = 1;
                    /**收到组队邀请延迟回调*/
                    _this._delayId = null;
                    /**被邀请时候，进入界面附带的参数。解决直接带参数打开界面，又打开其他界面，back的时候有参数*/
                    _this.inviteParam = [];
                    return _this;
                }
                Object.defineProperty(YuanLingProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                YuanLingProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new shilian.YuanLingModel();
                    this.onProto(s2c_yuanling_info, this.s2c_yuanling_info, this);
                    this.onProto(s2c_yuanling_team_list, this.s2c_yuanling_team_list, this);
                    this.onProto(s2c_yuanling_exit_team, this.s2c_yuanling_exit_team, this);
                    this.onProto(s2c_yuanling_team_info, this.s2c_yuanling_team_info, this);
                    this.onProto(s2c_yuanling_buff_info, this.s2c_yuanling_buff_info, this);
                    this.onProto(s2c_yuanling_role_list, this.s2c_yuanling_role_list, this);
                    this.onProto(s2c_yuanling_invita, this.s2c_yuanling_invita, this);
                    this.onProto(s2c_yuanling_fb_info, this.s2c_yuanling_fb_info, this);
                    this.onProto(s2c_yuanling_damage, this.s2c_yuanling_damage, this);
                    this.onProto(s2c_yuanling_counts, this.s2c_yuanling_counts, this);
                    facade.onNt("on_update_gift_hint" /* ON_UPDATE_GIFT_HINT */, this.onUpdateGiftHint, this);
                };
                /** 请求副本信息 */
                YuanLingProxy.prototype.c2s_yuanling_info = function () {
                    this.sendProto(new c2s_yuanling_info());
                };
                /** 副本信息 */
                YuanLingProxy.prototype.s2c_yuanling_info = function (n) {
                    var msg = n.body;
                    if (msg.count != null) {
                        this._model.count = msg.count;
                    }
                    if (msg.diff != null) {
                        this._model.diff = msg.diff;
                    }
                    if (msg.buy != null) {
                        this._model.buy = msg.buy;
                    }
                    if (msg.info != null) {
                        for (var _i = 0, _a = msg.info; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this._model.info[info.idx] = info;
                        }
                    }
                    this.updateHint();
                    this.sendNt("on_yuanling_info_update" /* ON_YUANLING_INFO_UPDATE */);
                };
                /** 创建队伍 */
                YuanLingProxy.prototype.c2s_yuanling_create_team = function (index) {
                    var msg = new c2s_yuanling_create_team();
                    msg.index = index;
                    this.sendProto(msg);
                };
                /** 加入队伍 */
                YuanLingProxy.prototype.c2s_yuanling_jion_team = function (team_id, index) {
                    var msg = new c2s_yuanling_jion_team();
                    msg.team_id = team_id;
                    msg.index = index;
                    this.sendProto(msg);
                };
                /** 退出队伍 */
                YuanLingProxy.prototype.c2s_yuanling_exit_team = function () {
                    this.sendProto(new c2s_yuanling_exit_team());
                };
                /** 返回退出队伍 */
                YuanLingProxy.prototype.s2c_yuanling_exit_team = function (n) {
                    var msg = n.body;
                    // 1被踢的。2正常
                    if (msg.flag && msg.flag == 1) {
                        this._model.kick_out_team[msg.team_id] = msg.time;
                    }
                    // 推出队伍后，就把个人的队伍信息清空
                    this._model.own_team_id = 0;
                    this._model.own_team_infos = [];
                    this.sendNt("on_yuanling_jump_to_view" /* ON_YUANLING_JUMP_TO_VIEW */, 1);
                };
                /** 踢出队伍 */
                YuanLingProxy.prototype.c2s_yuanling_out_time = function (role_id) {
                    var msg = new c2s_yuanling_out_time();
                    msg.role_id = role_id;
                    this.sendProto(msg);
                };
                /** 自己的队伍信息 */
                YuanLingProxy.prototype.s2c_yuanling_team_info = function (n) {
                    var msg = n.body;
                    this._model.own_index = msg.index != null ? msg.index : 0;
                    this._model.own_team_id = msg.team_id != null ? msg.team_id : 0;
                    this._model.own_team_infos = msg.infos != null ? msg.infos : [];
                    // 队伍解散，返回自己的队伍信息为空，这时候需要切换回奖励界面1
                    this.sendNt("on_yuanling_team_info_update" /* ON_YUANLING_TEAM_INFO_UPDATE */, [msg.index, msg.team_id != null ? 2 : 1]);
                    // 加入队伍后，被邀请按钮不需要显示了
                    if (Object.keys(this._model.be_invited_team).length > 0 && msg.team_id != null) {
                        this._model.be_invited_team = {};
                        this.sendNt("on_yuanling_team_invite" /* ON_YUANLING_TEAM_INVITE */);
                        this.sendNt("on_yuanling_team_invite_btn" /* ON_YUANLING_TEAM_INVITE_BTN */);
                    }
                };
                /** 勾选收益次数 1选择；2取消 */
                YuanLingProxy.prototype.c2s_yuanling_check = function (check) {
                    var msg = new c2s_yuanling_check();
                    msg.check = check;
                    this.sendProto(msg);
                };
                /** 购买收益次数 */
                YuanLingProxy.prototype.c2s_yuanling_buyCount = function () {
                    this.sendProto(new c2s_yuanling_buyCount());
                };
                /** 开始战斗;单人匹配也是这个 */
                YuanLingProxy.prototype.c2s_yuanling_enter = function (index) {
                    var msg = new c2s_yuanling_enter();
                    msg.index = index;
                    this.sendProto(msg);
                };
                /** 更新buff时间 */
                YuanLingProxy.prototype.s2c_yuanling_buff_info = function (n) {
                    var msg = n.body;
                    var idx = 0;
                    var time = 0;
                    if (msg.index != null) {
                        this._model.buff_info[msg.index] = msg.time || 0;
                        idx = msg.index;
                        time = msg.time;
                    }
                    this.sendNt("on_yuanling_buff_info_update" /* ON_YUANLING_BUFF_INFO_UPDATE */, [idx, time]);
                    var cfg = this.getConfig(this.curDiffType);
                    if (cfg && cfg.buff_info && cfg.buff_info[idx - 1]) {
                        var buffId = cfg.buff_info[idx - 1][0];
                        if (!buffId) {
                            return;
                        }
                        var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, buffId);
                        if (!buffCfg) {
                            return;
                        }
                        game.PromptBox.getIns().show(game.RoleVo.ins.name + '激活了' + buffCfg.name);
                    }
                };
                /** 购买buff */
                YuanLingProxy.prototype.c2s_yuanling_buyBuff = function (index) {
                    var msg = new c2s_yuanling_buyBuff();
                    msg.index = index;
                    this.sendProto(msg);
                };
                /** 邀请 */
                YuanLingProxy.prototype.c2s_yuanling_invita = function (role_id, index) {
                    var msg = new c2s_yuanling_invita();
                    msg.role_id = role_id;
                    msg.index = index;
                    this.sendProto(msg);
                };
                /** 聊天组队邀请 */
                YuanLingProxy.prototype.c2s_yuanling_room_invita = function (type) {
                    var msg = new c2s_yuanling_room_invita();
                    msg.channel_type = type;
                    this.sendProto(msg);
                };
                /** 收到组队邀请 */
                YuanLingProxy.prototype.s2c_yuanling_invita = function (n) {
                    var msg = n.body;
                    if (msg.team_id != null) {
                        this._model.be_invited_team[msg.team_id] = msg;
                    }
                    this.sendNt("on_yuanling_team_invite" /* ON_YUANLING_TEAM_INVITE */);
                    this.sendNt("on_yuanling_team_invite_btn" /* ON_YUANLING_TEAM_INVITE_BTN */);
                };
                /** 请求可邀请列表 */
                YuanLingProxy.prototype.c2s_yuanling_role_list = function (index) {
                    var msg = new c2s_yuanling_role_list();
                    msg.index = index;
                    this.sendProto(msg);
                };
                /** 可邀请列表 */
                YuanLingProxy.prototype.s2c_yuanling_role_list = function (n) {
                    var msg = n.body;
                    this._model.invite_list = [];
                    if (msg.info != null) {
                        for (var _i = 0, _a = msg.info; _i < _a.length; _i++) {
                            var item = _a[_i];
                            //过滤自己
                            if (!item || item.role_id.eq(game.RoleVo.ins.role_id)) {
                                continue;
                            }
                            this._model.invite_list.push(item);
                        }
                    }
                    this.sendNt("on_yuanling_role_list_update" /* ON_YUANLING_ROLE_LIST_UPDATE */);
                };
                /** 请求队伍列表 */
                YuanLingProxy.prototype.c2s_yuanling_team_list = function (idx) {
                    var msg = new c2s_yuanling_team_list();
                    msg.index = idx;
                    this.sendProto(msg);
                };
                /** 队伍列表 */
                YuanLingProxy.prototype.s2c_yuanling_team_list = function (n) {
                    var msg = n.body;
                    this._model.team_list = msg.infos != null ? msg.infos : [];
                    this.sendNt("on_yuanling_team_list_update" /* ON_YUANLING_TEAM_LIST_UPDATE */);
                };
                /** 更新副本内信息 */
                YuanLingProxy.prototype.s2c_yuanling_fb_info = function (n) {
                    var msg = n.body;
                    if (msg.index != null) {
                        this._model.scene_index = msg.index;
                    }
                    if (msg.layer != null) {
                        this._model.scene_layer = msg.layer;
                    }
                    this.sendNt("on_yuanling_fuben_info_update" /* ON_YUANLING_FUBEN_INFO_UPDATE */);
                    mod.ViewMgr.getIns().showChallengeTips(msg.layer);
                };
                YuanLingProxy.prototype.s2c_yuanling_damage = function (n) {
                    var msg = n.body;
                    this._model.damage_info = msg.infos != null ? msg.infos : [];
                    this.sendNt("on_yuanling_damage_info_update" /* ON_YUANLING_DAMAGE_INFO_UPDATE */, msg.infos);
                };
                // 通关次数
                YuanLingProxy.prototype.s2c_yuanling_counts = function (n) {
                    var msg = n.body;
                    if (msg.counts != null) {
                        for (var _i = 0, _a = msg.counts; _i < _a.length; _i++) {
                            var item = _a[_i];
                            this._model.challenge_counts[item.index] = item.count;
                        }
                    }
                };
                /**=================================协议 end=================================*/
                YuanLingProxy.prototype.getConfig = function (type) {
                    return game.getConfigByNameId("yuanling_fuben.json" /* YuanLingFuben */, type);
                };
                // 元灵副本组队上限
                YuanLingProxy.prototype.getTeamCount = function () {
                    var cfg = game.GameConfig.getParamConfigById('yuanling_team_count');
                    return cfg && cfg.value || 0;
                };
                // 元灵副本每日收益次数
                YuanLingProxy.prototype.getCount = function () {
                    var cfg = game.GameConfig.getParamConfigById('yuanling_count');
                    return cfg && cfg.value || 0;
                };
                // 元灵副本购买次数上限
                YuanLingProxy.prototype.getMaxBuy = function () {
                    var cfg = game.GameConfig.getParamConfigById('yuanling_max_buy');
                    return cfg && cfg.value || 0;
                };
                // 元灵副本购买次数消耗
                YuanLingProxy.prototype.getCost = function () {
                    var cfg = game.GameConfig.getParamConfigById('yuanling_cost');
                    return cfg && cfg.value || [];
                };
                // 判断本人是否是队长
                YuanLingProxy.prototype.isMineLeader = function () {
                    var team_infos = this._model.own_team_infos;
                    var myId = game.RoleVo.ins.role_id;
                    for (var _i = 0, team_infos_1 = team_infos; _i < team_infos_1.length; _i++) {
                        var info = team_infos_1[_i];
                        if (!info || !info.leader) {
                            continue;
                        }
                        if (info.info[0] && info.info[0].role_id.eq(myId)) {
                            return true;
                        }
                    }
                    return false;
                };
                /**获取邀请列表*/
                YuanLingProxy.prototype.getInvitedTeamList = function () {
                    //已加入队伍，主界面不需要再出现按钮
                    if (this._model.own_team_id) {
                        DEBUG && console.log('s2c_yuanling_invita-getInvitedTeamList: 已有自己队伍', this._model.own_team_id);
                        return null;
                    }
                    var team = this._model.be_invited_team;
                    if (!team) {
                        DEBUG && console.log('s2c_yuanling_invita-getInvitedTeamList: 没有队伍信息1');
                        return null;
                    }
                    var list = [];
                    var keys = Object.keys(team);
                    if (!keys || !keys.length) {
                        DEBUG && console.log('s2c_yuanling_invita-getInvitedTeamList: 没有队伍信息2');
                        return null;
                    }
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var key = keys_1[_i];
                        var item = team[key];
                        if (item) {
                            list.push(item);
                        }
                    }
                    return list;
                };
                /**有队伍*/
                YuanLingProxy.prototype.onTeam = function () {
                    return this._model.own_team_id != 0;
                };
                /**当前挑战层数*/
                YuanLingProxy.prototype.curLayer = function () {
                    return this._model.scene_layer;
                };
                /**当前难度*/
                YuanLingProxy.prototype.getCurDiff = function () {
                    var param = this.inviteParam || [];
                    if (param[0] != null) {
                        return param[0];
                    }
                    var idx = this._model.scene_index;
                    this._model.scene_index = 0;
                    this._model.scene_layer = 0;
                    return idx || 1;
                };
                /**当前皮肤状态，1奖励，2组队*/
                YuanLingProxy.prototype.getCurState = function () {
                    var param = this.inviteParam || [];
                    if (param[1] != null) {
                        return param[1];
                    }
                    else if (this._model.own_team_id) {
                        return 2;
                    }
                    return 1;
                };
                YuanLingProxy.prototype.onClearInvitedTeam = function () {
                    this._model.be_invited_team = {};
                };
                /**进去其他副本，或者掉线，默认全部拒绝邀请*/
                YuanLingProxy.prototype.clearInvitedTeam = function (team_id) {
                    var team = this._model.be_invited_team;
                    if (team && team[team_id]) {
                        team[team_id] = null;
                        delete team[team_id];
                    }
                };
                /**============================== hint ==============================*/
                /**收益次数红点*/
                YuanLingProxy.prototype.getCntHint = function () {
                    var usedCnt = this._model.count; //已使用次数
                    var bought = this._model.buy; //已购买次数
                    var cfgCnt = this.getCount(); //每日收益次数
                    return cfgCnt + bought - usedCnt > 0;
                };
                //页签红点（次数红点，礼包红点）
                YuanLingProxy.prototype.getAllHint = function () {
                    return this.getCntHint() || this.getGiftHint();
                };
                YuanLingProxy.prototype.updateHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670115 /* Yuanling */)) {
                        return;
                    }
                    mod.HintMgr.setHint(this.getAllHint(), this._model.hintPath);
                };
                //成就红点
                YuanLingProxy.prototype.getGiftHint = function () {
                    var giftProxy = game.getProxy("53" /* Gift */, 201 /* Gift */);
                    return giftProxy.getHintByGiftType(1 /* Yuanling */);
                };
                YuanLingProxy.prototype.onUpdateGiftHint = function (n) {
                    var types = n.body;
                    if (types.indexOf(1 /* Yuanling */) > -1) {
                        this.updateHint();
                    }
                };
                return YuanLingProxy;
            }(game.ProxyBase));
            shilian.YuanLingProxy = YuanLingProxy;
            __reflect(YuanLingProxy.prototype, "game.mod.shilian.YuanLingProxy", ["game.mod.IYuanLingProxy", "base.IProxy"]);
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var ForbiddenGateAwd = /** @class */ (function (_super) {
                __extends(ForbiddenGateAwd, _super);
                function ForbiddenGateAwd() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.ForbiddenGateAwdSkin";
                    return _this;
                }
                ForbiddenGateAwd.prototype.setData = function (bigGateCfg, canGet0) {
                    var bigAwdPreCfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, bigGateCfg.gate_show_reward);
                    var awd = bigAwdPreCfg ? bigAwdPreCfg.content[0] : null;
                    this._canGet = canGet0;
                    if (canGet0) {
                        this.icon.setData(awd, 3 /* NotTips */);
                    }
                    else {
                        this.icon.setData(awd, 1 /* Reward */);
                    }
                    this.redPoint.visible = canGet0;
                };
                Object.defineProperty(ForbiddenGateAwd.prototype, "canGet", {
                    get: function () {
                        return this._canGet;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ForbiddenGateAwd;
            }(eui.Component));
            shilian.ForbiddenGateAwd = ForbiddenGateAwd;
            __reflect(ForbiddenGateAwd.prototype, "game.mod.shilian.ForbiddenGateAwd");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var facade = base.facade;
            var ForbiddenGateItemRender = /** @class */ (function (_super) {
                __extends(ForbiddenGateItemRender, _super);
                function ForbiddenGateItemRender() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.ForbiddenGateItemSkin";
                    return _this;
                }
                ForbiddenGateItemRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var openStr = "";
                    if (this.data.showOpenStr) {
                        openStr = this.data.isLimitOpen ? "可挑战" : mod.RoleUtil.getLimitStr(this.data.cfg.open, false, false);
                    }
                    var mcfg = game.getConfigByNameId("monster1.json" /* Monster */, this.data.cfg.bossId[0]);
                    if (!mcfg) {
                        console.error("monster1.json\u7F3A\u5C11\u602A\u7269id" + this.data.cfg.bossId[0] + "\uFF0C\u8BF7\u68C0\u67E5\u914D\u7F6E");
                    }
                    this.lab_name.text = this.data.isOpen ? mcfg.name : openStr;
                    this.img_icon.source = mcfg.res_id;
                    this.img_lock.visible = !this.data.isOpen;
                    this.img_finished.visible = this.data.isOpen && this.data.isFinished;
                    var _proxy = facade.retMod("49" /* Shilian */).retProxy(194 /* Shilian */);
                    this.redPoint.visible = _proxy.hasBigAwd(_proxy.curFbdType, this.data.cfg.index) ||
                        (_proxy.getSaodangHint(_proxy.curFbdType) && this.data.isOpen) || //扫荡红点
                        (_proxy.getChallengeHint(_proxy.curFbdType) && this.data.isOpen && !this.data.isFinished); //挑战红点绑定到当前开启的关卡上
                };
                return ForbiddenGateItemRender;
            }(eui.ItemRenderer));
            shilian.ForbiddenGateItemRender = ForbiddenGateItemRender;
            __reflect(ForbiddenGateItemRender.prototype, "game.mod.shilian.ForbiddenGateItemRender");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var ArrayCollection = eui.ArrayCollection;
            var ForbiddenSaodangRender = /** @class */ (function (_super) {
                __extends(ForbiddenSaodangRender, _super);
                function ForbiddenSaodangRender() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.ForbiddenSaodangItemSkin";
                    return _this;
                }
                ForbiddenSaodangRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._listData = new ArrayCollection();
                    this.list_awd.itemRenderer = mod.Icon;
                    this.list_awd.dataProvider = this._listData;
                };
                ForbiddenSaodangRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var chap = this.data.fbdFubenCfg.index % 100;
                    var finishedStr = this.data.isFinished ? game.TextUtil.addColor("(已完成)", 2330156 /* GREEN */)
                        : game.TextUtil.addColor("(\u901A\u5173\u53EF\u626B\u8361" + this.data.passSmallGateId + "/" + this.data.fbdGateCfg.gate_id + ")", 16719376 /* RED */);
                    this.lab_title.textFlow = game.TextUtil.parseHtml("\u7B2C" + chap + "\u7AE0" + finishedStr);
                    var listAwdPreCfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, this.data.fbdGateCfg.show_reward);
                    listAwdPreCfg && this._listData.replaceAll(listAwdPreCfg.content);
                };
                return ForbiddenSaodangRender;
            }(mod.BaseListenerRenderer));
            shilian.ForbiddenSaodangRender = ForbiddenSaodangRender;
            __reflect(ForbiddenSaodangRender.prototype, "game.mod.shilian.ForbiddenSaodangRender");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var ForbiddenSaodangView = /** @class */ (function (_super) {
                __extends(ForbiddenSaodangView, _super);
                function ForbiddenSaodangView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.ForbiddenSaodangSkin";
                    return _this;
                }
                return ForbiddenSaodangView;
            }(eui.Component));
            shilian.ForbiddenSaodangView = ForbiddenSaodangView;
            __reflect(ForbiddenSaodangView.prototype, "game.mod.shilian.ForbiddenSaodangView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var ForbiddenView = /** @class */ (function (_super) {
                __extends(ForbiddenView, _super);
                function ForbiddenView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.ForbiddenSkin";
                    return _this;
                }
                return ForbiddenView;
            }(eui.Component));
            shilian.ForbiddenView = ForbiddenView;
            __reflect(ForbiddenView.prototype, "game.mod.shilian.ForbiddenView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var FubenLayerItem1 = /** @class */ (function (_super) {
                __extends(FubenLayerItem1, _super);
                function FubenLayerItem1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                FubenLayerItem1.prototype.dataChanged = function () {
                    if (this.data == null) {
                        return;
                    }
                    if (this.data.layer != undefined) {
                        var curStr = this.data.layer + "";
                        this.addBmpFont(curStr, game.BmpTextCfg[206 /* Layer */], this.grp_layer);
                    }
                    if (this.data.isCur != undefined) {
                        this.grp_layer.visible = this.data.isCur;
                    }
                };
                return FubenLayerItem1;
            }(mod.BaseRenderer));
            shilian.FubenLayerItem1 = FubenLayerItem1;
            __reflect(FubenLayerItem1.prototype, "game.mod.shilian.FubenLayerItem1");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var FubenLayerItem2 = /** @class */ (function (_super) {
                __extends(FubenLayerItem2, _super);
                function FubenLayerItem2() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                FubenLayerItem2.prototype.dataChanged = function () {
                    if (this.data == null) {
                        return;
                    }
                    var curStr = this.data + "";
                    this.addBmpFont(curStr, game.BmpTextCfg[206 /* Layer */], this.grp_layer);
                    this.grp_layer.alpha = 0.6;
                };
                return FubenLayerItem2;
            }(mod.BaseRenderer));
            shilian.FubenLayerItem2 = FubenLayerItem2;
            __reflect(FubenLayerItem2.prototype, "game.mod.shilian.FubenLayerItem2");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var FubenSceneView = /** @class */ (function (_super) {
                __extends(FubenSceneView, _super);
                function FubenSceneView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.FubenSceneSkin";
                    return _this;
                }
                return FubenSceneView;
            }(eui.Component));
            shilian.FubenSceneView = FubenSceneView;
            __reflect(FubenSceneView.prototype, "game.mod.shilian.FubenSceneView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var FubenView = /** @class */ (function (_super) {
                __extends(FubenView, _super);
                function FubenView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.FubenSkin";
                    return _this;
                }
                return FubenView;
            }(eui.Component));
            shilian.FubenView = FubenView;
            __reflect(FubenView.prototype, "game.mod.shilian.FubenView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var ResultFubenView = /** @class */ (function (_super) {
                __extends(ResultFubenView, _super);
                function ResultFubenView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.ResultFubenSkin";
                    return _this;
                }
                return ResultFubenView;
            }(eui.Component));
            shilian.ResultFubenView = ResultFubenView;
            __reflect(ResultFubenView.prototype, "game.mod.shilian.ResultFubenView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var XiantaSceneView = /** @class */ (function (_super) {
                __extends(XiantaSceneView, _super);
                function XiantaSceneView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.XiantaSceneSkin";
                    return _this;
                }
                return XiantaSceneView;
            }(eui.Component));
            shilian.XiantaSceneView = XiantaSceneView;
            __reflect(XiantaSceneView.prototype, "game.mod.shilian.XiantaSceneView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var XiantaView = /** @class */ (function (_super) {
                __extends(XiantaView, _super);
                function XiantaView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.XiantaSkin";
                    return _this;
                }
                return XiantaView;
            }(eui.Component));
            shilian.XiantaView = XiantaView;
            __reflect(XiantaView.prototype, "game.mod.shilian.XiantaView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var delayCall = base.delayCall;
            var Handler = base.Handler;
            var clearDelay = base.clearDelay;
            var YuanLingBuffItem = /** @class */ (function (_super) {
                __extends(YuanLingBuffItem, _super);
                function YuanLingBuffItem() {
                    var _this = _super.call(this) || this;
                    _this._radius = 0;
                    _this._delayId = 0;
                    _this.skinName = "skins.common.SkillItemSkin";
                    return _this;
                }
                YuanLingBuffItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    facade.onNt("on_yuanling_buff_info_update" /* ON_YUANLING_BUFF_INFO_UPDATE */, this.onUpdateInfo, this);
                    this._proxy = game.getProxy("49" /* Shilian */, 197 /* YuanlingFuben */);
                };
                YuanLingBuffItem.prototype.childrenCreated = function () {
                    _super.prototype.childrenCreated.call(this);
                    if (!this._shape) {
                        this._shape = new egret.Shape();
                        this.addChild(this._shape);
                    }
                    if (!this._gr) {
                        this._gr = new eui.Group();
                        this._gr.horizontalCenter = 0;
                        this._gr.verticalCenter = 0;
                        this.addChild(this._gr);
                    }
                };
                YuanLingBuffItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    facade.offNt("on_yuanling_buff_info_update" /* ON_YUANLING_BUFF_INFO_UPDATE */, this.onUpdateInfo, this);
                    this._delayId && clearDelay(this._delayId);
                };
                YuanLingBuffItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, data.index);
                    if (!buffCfg) {
                        return;
                    }
                    this.img_icon.source = buffCfg.icon;
                };
                YuanLingBuffItem.prototype.onUpdateInfo = function (n) {
                    var _a = n.body, idx = _a[0], time = _a[1];
                    if (idx && this.itemIndex + 1 != idx) {
                        return;
                    }
                    this.update(TimeMgr.time);
                    TimeMgr.addUpdateItem(this, 1000);
                    this._shape.x = this.width * 0.5;
                    this._shape.y = this.height * 0.5;
                    this._radius = this.width * 0.5;
                    this.img_lock.mask = this._shape;
                };
                YuanLingBuffItem.prototype.update = function (time) {
                    var _this = this;
                    var boughtTime = this._proxy.model.buff_info[this.itemIndex + 1];
                    if (!boughtTime) {
                        this.setBuyView();
                        return;
                    }
                    var leftTime = boughtTime + this.data.duraTime + this.data.cd - time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this.setBuyView();
                        return;
                    }
                    this.img_lock.visible = true;
                    var font = game.BmpTextCfg[201 /* CommonPower2 */]; //todo
                    if (time.serverTimeSecond <= boughtTime + this.data.duraTime) {
                        if (this._delayId) {
                            return;
                        }
                        this.clearFont(this._gr);
                        this.addBmpFont(this.data.cd + '', font, this._gr, true, 1, true);
                        this._delayId = delayCall(Handler.alloc(this, function () {
                            _this.drawCircle(360);
                        }), 100);
                        return;
                    }
                    this.clearFont(this._gr);
                    this.addBmpFont(leftTime + '', font, this._gr, true, 1, true);
                    var totalCd = this.data.cd;
                    var angle = (totalCd - leftTime) / totalCd * 360;
                    // todo 遮罩倒计时
                    this.drawCircle(angle);
                };
                YuanLingBuffItem.prototype.setBuyView = function () {
                    TimeMgr.removeUpdateItem(this);
                    this.img_lock.visible = false;
                    this.clearFont(this._gr);
                    this._shape.graphics.clear();
                };
                YuanLingBuffItem.prototype.drawCircle = function (angle) {
                    var shape = this._shape;
                    shape.graphics.clear();
                    shape.graphics.beginFill(0xff0000, 0.8);
                    shape.graphics.moveTo(0, 0);
                    shape.graphics.lineTo(0, -this._radius);
                    shape.graphics.drawArc(0, 0, this._radius, -90 * Math.PI / 180, -(angle + 90) * Math.PI / 180, false);
                    shape.graphics.lineTo(0, 0);
                    shape.graphics.endFill();
                };
                return YuanLingBuffItem;
            }(mod.BaseRenderer));
            shilian.YuanLingBuffItem = YuanLingBuffItem;
            __reflect(YuanLingBuffItem.prototype, "game.mod.shilian.YuanLingBuffItem", ["base.UpdateItem"]);
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var YuanLingResultItem = /** @class */ (function (_super) {
                __extends(YuanLingResultItem, _super);
                function YuanLingResultItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.YuanLingResultItemSkin";
                    return _this;
                }
                YuanLingResultItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                };
                YuanLingResultItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                YuanLingResultItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lb_num.text = "" + (this.itemIndex + 1);
                    this.lb_name.text = data.name;
                    this.lb_damage.text = game.StringUtil.getHurtNumStr(data.damage.toNumber());
                };
                return YuanLingResultItem;
            }(mod.BaseListenerRenderer));
            shilian.YuanLingResultItem = YuanLingResultItem;
            __reflect(YuanLingResultItem.prototype, "game.mod.shilian.YuanLingResultItem");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var YuanLingResultView = /** @class */ (function (_super) {
                __extends(YuanLingResultView, _super);
                function YuanLingResultView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.YuanLingResultSkin";
                    return _this;
                }
                return YuanLingResultView;
            }(eui.Component));
            shilian.YuanLingResultView = YuanLingResultView;
            __reflect(YuanLingResultView.prototype, "game.mod.shilian.YuanLingResultView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var Handler = base.Handler;
            var YuanLingRewardItem = /** @class */ (function (_super) {
                __extends(YuanLingRewardItem, _super);
                function YuanLingRewardItem() {
                    var _this = _super.call(this) || this;
                    //进行转换，使用 backcard_ 和 card_ 资源  紫橙红
                    _this._cardAry = [4, 1, 2];
                    _this._backEftSrc = ["backcard4" /* Backcard4 */, "backcard1" /* Backcard1 */, "backcard2" /* Backcard2 */];
                    _this._eftSrc = [null, "card1" /* Card1 */, "card2" /* Card2 */];
                    _this._turnEftSrc = ["turncard4" /* TurnCard4 */, "turncard1" /* TurnCard1 */, "turncard2" /* TurnCard2 */];
                    _this.skinName = "skins.shilian.YuanLingRewardItemSkin";
                    return _this;
                }
                YuanLingRewardItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                };
                YuanLingRewardItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                YuanLingRewardItem.prototype.dataChanged = function () {
                    var data = this.data;
                    var pos = Math.floor(this.itemIndex / 4);
                    this.img_bg.visible = false;
                    if (!data) {
                        this.icon.visible = false;
                        this.addEftByParent(this._backEftSrc[pos], this.gr_eft); //背面特效
                        return;
                    }
                    this.setTurnEft(pos);
                };
                //翻牌特效
                YuanLingRewardItem.prototype.setTurnEft = function (pos) {
                    this.removeEft();
                    this.addEftByParent(this._turnEftSrc[pos], this.gr_eft, 0, 0, 0, Handler.alloc(this, this.endEft, [pos]), 1);
                };
                //翻牌后，显示正面特效和道具
                YuanLingRewardItem.prototype.endEft = function (pos) {
                    if (!this.data) {
                        return;
                    }
                    this.icon.data = this.data;
                    this.icon.visible = true;
                    //正面特效
                    this.removeEft();
                    var eftSrc = this._eftSrc[pos];
                    if (eftSrc) {
                        this.addEftByParent(this._eftSrc[pos], this.gr_eft);
                    }
                    else {
                        var card = this._cardAry[pos];
                        this.img_bg.visible = true;
                        this.img_bg.source = "card_" + card;
                    }
                };
                return YuanLingRewardItem;
            }(mod.BaseRenderer));
            shilian.YuanLingRewardItem = YuanLingRewardItem;
            __reflect(YuanLingRewardItem.prototype, "game.mod.shilian.YuanLingRewardItem");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var YuanLingRewardView = /** @class */ (function (_super) {
                __extends(YuanLingRewardView, _super);
                function YuanLingRewardView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.YuanLingRewardSkin";
                    return _this;
                }
                return YuanLingRewardView;
            }(eui.Component));
            shilian.YuanLingRewardView = YuanLingRewardView;
            __reflect(YuanLingRewardView.prototype, "game.mod.shilian.YuanLingRewardView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var YuanLingSceneDiedView = /** @class */ (function (_super) {
                __extends(YuanLingSceneDiedView, _super);
                function YuanLingSceneDiedView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.YuanLingSceneDiedSkin";
                    return _this;
                }
                return YuanLingSceneDiedView;
            }(eui.Component));
            shilian.YuanLingSceneDiedView = YuanLingSceneDiedView;
            __reflect(YuanLingSceneDiedView.prototype, "game.mod.shilian.YuanLingSceneDiedView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            /**场景组队head信息*/
            var YuanLingSceneHeadVipItem = /** @class */ (function (_super) {
                __extends(YuanLingSceneHeadVipItem, _super);
                function YuanLingSceneHeadVipItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.YuanLingHeadVipSkin";
                    return _this;
                }
                YuanLingSceneHeadVipItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.bar.labelDisplay.visible = false;
                };
                YuanLingSceneHeadVipItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                YuanLingSceneHeadVipItem.prototype.dataChanged = function () {
                    var info = this.data;
                    if (!info) {
                        return;
                    }
                    var vip = info['vip'] ? info['vip'] : 0; //todo
                    this.head.updateShow(info.head, info.head_frame, info.sex, vip);
                    // 血量更新 todo
                    var sceneProxy = game.getProxy("03" /* Scene */, 2 /* Scene */);
                    var vo = sceneProxy.getVoByRoleId(info.role_id);
                    this.bar.show(vo.hp.toNumber(), vo.max_hp.toNumber(), false, 0, false);
                };
                return YuanLingSceneHeadVipItem;
            }(mod.BaseListenerRenderer));
            shilian.YuanLingSceneHeadVipItem = YuanLingSceneHeadVipItem;
            __reflect(YuanLingSceneHeadVipItem.prototype, "game.mod.shilian.YuanLingSceneHeadVipItem");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var ShilianModel = /** @class */ (function () {
                function ShilianModel() {
                    var _a;
                    this.type = 1 /* Type1 */;
                    this.lv = 0; ///当前层数
                    this.total_count = 0; ///累计奖励数量
                    this.st_lv = 0;
                    this.end_lv = 0;
                    this.typeList = [1 /* Type1 */, 2 /* Type2 */, 3 /* Type3 */]; //材料副本
                    this.typeToPropIndex = (_a = {},
                        _a[1 /* Type1 */] = 1450000003 /* Zhujuejingyan */,
                        _a[2 /* Type2 */] = 1450000001 /* Yuanbao */,
                        _a[3 /* Type3 */] = 1450000008 /* Xianqi */,
                        _a);
                    this.challengeHints = [
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "01" /* Fuben */, "50" /* FubenChallenge1 */],
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "01" /* Fuben */, "51" /* FubenChallenge2 */],
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "01" /* Fuben */, "52" /* FubenChallenge3 */],
                    ]; //副本挑战红点
                    this.resetHints = [
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "01" /* Fuben */, "53" /* FubenReset1 */],
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "01" /* Fuben */, "54" /* FubenReset2 */],
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "01" /* Fuben */, "55" /* FubenReset3 */],
                    ]; //副本重置红点
                    /************************** 禁地副本 *************************/
                    this.fbdTypes = [1 /* Type1 */, 2 /* Type2 */,
                        3 /* Type3 */, 4 /* Type4 */, 5 /* Type5 */]; // 固定5个禁地副本类型id
                    this.fbdInfos = {}; // 基本信息
                    this.fbdAwds = {}; // 通关大奖（只含可领取的）
                    this.hasDrawAwds = {}; // 通关大奖（已领取的，存的是大关卡ID：小关卡ID数组）
                    this.fbdFubenCfg = {}; // 禁地副本配置
                    this.fbdFirstFubenCfg = {}; // 每类型的第一个禁地副本配置
                    this.fbdGateEndCfg = {}; // 禁地副本每大关的最后一小关配置（扫荡用）
                    this.fbdHint = ["49" /* Shilian */, "01" /* ShilianMain */ + "02" /* Forbidden */]; //禁地入口、标签页红点
                    this.xiantaTypeList = [1 /* Type1 */, 2 /* Type2 */, 3 /* Type3 */]; //仙塔副本
                    this.xiantaChallengeHints = [
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "60" /* XiantaChallenge1 */],
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "61" /* XiantaChallenge2 */],
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "62" /* XiantaChallenge3 */],
                    ]; //副本挑战红点
                    this.xiantaSweepHints = [
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "63" /* XiantaSweep1 */],
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "64" /* XiantaSweep2 */],
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "65" /* XiantaSweep3 */],
                    ]; //副本扫荡红点
                    this.xiantaRewardHints = [
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "66" /* XiantaReward1 */],
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "67" /* XiantaReward2 */],
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "68" /* XiantaReward3 */],
                    ]; //副本奖励红点
                    this.xiantaRankHints = [
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "69" /* XiantaRank1 */],
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "70" /* XiantaRank2 */],
                        ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "71" /* XiantaRank3 */],
                    ]; //副本大神榜奖励红点
                }
                return ShilianModel;
            }());
            shilian.ShilianModel = ShilianModel;
            __reflect(ShilianModel.prototype, "game.mod.shilian.ShilianModel");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var Handler = base.Handler;
            var YuanLingTeammateItem = /** @class */ (function (_super) {
                __extends(YuanLingTeammateItem, _super);
                function YuanLingTeammateItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.YuanLingTeammateItemSkin";
                    return _this;
                }
                YuanLingTeammateItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("49" /* Shilian */, 197 /* YuanlingFuben */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.img_add, this.onClickAdd, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_del, this.onDel, this);
                    this.lb_add.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(this.lb_add.text, 2904685 /* DEFAULT2 */));
                };
                YuanLingTeammateItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        this.currentState = 'add';
                        return;
                    }
                    this.currentState = 'head';
                    this.img_captain.visible = !!data.leader;
                    if (data.leader) {
                        this.img_captain.visible = true;
                        this.btn_del.visible = false;
                    }
                    else if (this._proxy.isMineLeader()) {
                        this.img_captain.visible = false;
                        this.btn_del.visible = true;
                    }
                    else {
                        this.btn_del.visible = this.img_captain.visible = false;
                    }
                    var info = data.info ? data.info[0] : null;
                    if (!info) {
                        return;
                    }
                    this.lb_name.text = info.name;
                    this.lb_power.text = info.showpower.toString();
                    this.head.updateHeadShow(info.head.toNumber(), info.head_frame.toNumber(), info.sex);
                };
                // 组队邀请界面
                YuanLingTeammateItem.prototype.onClickAdd = function () {
                    mod.ViewMgr.getIns().showSecondPop("49" /* Shilian */, "10" /* YuanLingInvite */);
                };
                // 踢人，队长才有权限
                YuanLingTeammateItem.prototype.onDel = function () {
                    console.log("\u961F\u957F\u8E22\u4EBA\uFF0C\u961F\u5458roleid : " + this.data.info[0].role_id);
                    mod.ViewMgr.getIns().showConfirm('确定将此队友请离队伍吗，被请离的队友在一分钟以内无法再进入队伍。', Handler.alloc(this, this.onConfirm, [this.data.info[0].role_id]));
                };
                YuanLingTeammateItem.prototype.onConfirm = function (roleId) {
                    console.log("\u961F\u957F\u8E22\u4EBA\uFF0C\u961F\u5458roleid : c2s_yuanling_out_time " + roleId);
                    this._proxy.c2s_yuanling_out_time(roleId);
                };
                return YuanLingTeammateItem;
            }(mod.BaseListenerRenderer));
            shilian.YuanLingTeammateItem = YuanLingTeammateItem;
            __reflect(YuanLingTeammateItem.prototype, "game.mod.shilian.YuanLingTeammateItem");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            /**副本首杀玩家信息*/
            var YuanLingTopPlayerComp = /** @class */ (function (_super) {
                __extends(YuanLingTopPlayerComp, _super);
                function YuanLingTopPlayerComp() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.YuanLingTopPlayerSkin";
                    return _this;
                }
                /**更新信息*/
                YuanLingTopPlayerComp.prototype.updatePlayerInfo = function (info) {
                    if (!info) {
                        this.head.defaultHeadShow();
                        this.img_di.visible = this.lb_name.visible = false;
                        return;
                    }
                    this.img_di.visible = this.lb_name.visible = true;
                    this.head.updateHeadShow(info.head, info.head_frame, info.sex);
                    this.lb_name.text = info.name;
                };
                return YuanLingTopPlayerComp;
            }(eui.Component));
            shilian.YuanLingTopPlayerComp = YuanLingTopPlayerComp;
            __reflect(YuanLingTopPlayerComp.prototype, "game.mod.shilian.YuanLingTopPlayerComp");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var YuanLingView = /** @class */ (function (_super) {
                __extends(YuanLingView, _super);
                function YuanLingView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.YuanLingSkin";
                    return _this;
                }
                return YuanLingView;
            }(eui.Component));
            shilian.YuanLingView = YuanLingView;
            __reflect(YuanLingView.prototype, "game.mod.shilian.YuanLingView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            /**组队邀请item*/
            var YuanLingTeamInviteItem = /** @class */ (function (_super) {
                __extends(YuanLingTeamInviteItem, _super);
                function YuanLingTeamInviteItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YuanLingTeamInviteItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.btn_do.visible = true;
                    this.img_zhanli.visible = true;
                    this.btn_do.label = '邀请';
                    this.lb_state.text = '';
                    this.lb_name.text = data.name;
                    this.lb_power.x = 237;
                    this.lb_power.text = game.StringUtil.getHurtNumStr(data.showpower.toNumber());
                    this.head.updateShow(data.head.toNumber(), data.head_frame.toNumber(), data.sex, data.vip);
                };
                YuanLingTeamInviteItem.prototype.onClick = function () {
                    var data = this.data;
                    this._proxy.c2s_yuanling_invita(data.role_id, this._proxy.curDiffType);
                    this.btn_do.visible = false;
                    this.lb_state.text = '已邀请';
                    game.PromptBox.getIns().show("\u9080\u8BF7\u6210\u529F");
                };
                return YuanLingTeamInviteItem;
            }(shilian.YuanLingTeamItem));
            shilian.YuanLingTeamInviteItem = YuanLingTeamInviteItem;
            __reflect(YuanLingTeamInviteItem.prototype, "game.mod.shilian.YuanLingTeamInviteItem");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            /**组队邀请界面*/
            var YuanLingTeamInviteView = /** @class */ (function (_super) {
                __extends(YuanLingTeamInviteView, _super);
                function YuanLingTeamInviteView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.YuanLingTeamInviteSkin";
                    return _this;
                }
                return YuanLingTeamInviteView;
            }(eui.Component));
            shilian.YuanLingTeamInviteView = YuanLingTeamInviteView;
            __reflect(YuanLingTeamInviteView.prototype, "game.mod.shilian.YuanLingTeamInviteView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var ShilianMod = /** @class */ (function (_super) {
                __extends(ShilianMod, _super);
                function ShilianMod() {
                    return _super.call(this, "49" /* Shilian */) || this;
                }
                ShilianMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                ShilianMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(194 /* Shilian */, shilian.ShilianProxy);
                    this.regProxy(197 /* YuanlingFuben */, shilian.YuanLingProxy);
                };
                ShilianMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* ShilianMain */, shilian.ShilianMainMdr);
                    this.regMdr("02" /* FubenScene */, shilian.FubenSceneMdr);
                    this.regMdr("03" /* ResultFuben */, shilian.ResultFubenMdr);
                    this.regMdr("05" /* ForbiddenSaodang */, shilian.ForbiddenSaodangMdr);
                    this.regMdr("06" /* XiantaScene */, shilian.XiantaSceneMdr);
                    this.regMdr("07" /* ForbiddenScene */, shilian.ForbiddenSceneMdr);
                    this.regMdr("08" /* YuanlingScene */, shilian.YuanLingSceneMdr);
                    this.regMdr("09" /* YuanLingTeam */, shilian.YuanLingTeamListMdr);
                    this.regMdr("10" /* YuanLingInvite */, shilian.YuanLingTeamInviteMdr);
                    this.regMdr("12" /* YuanLingBeInvited */, shilian.YuanLingTeamListInvitedMdr);
                    this.regMdr("13" /* YuanLingResult */, shilian.YuanLingResultMdr);
                    this.regMdr("14" /* YuanLingReward */, shilian.YuanLingRewardMdr);
                    this.regMdr("15" /* YuanLingDied */, shilian.YuanLingSceneDiedMdr);
                };
                return ShilianMod;
            }(game.ModBase));
            shilian.ShilianMod = ShilianMod;
            __reflect(ShilianMod.prototype, "game.mod.shilian.ShilianMod");
            gso.modCls.push(ShilianMod);
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            /**队伍列表以及被邀请列表界面*/
            var YuanLingTeamListView = /** @class */ (function (_super) {
                __extends(YuanLingTeamListView, _super);
                function YuanLingTeamListView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shilian.YuanLingTeamListSkin";
                    return _this;
                }
                return YuanLingTeamListView;
            }(eui.Component));
            shilian.YuanLingTeamListView = YuanLingTeamListView;
            __reflect(YuanLingTeamListView.prototype, "game.mod.shilian.YuanLingTeamListView");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var ShilianMainMdr = /** @class */ (function (_super) {
                __extends(ShilianMainMdr, _super);
                function ShilianMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Fuben */,
                            icon: "fuben_tab",
                            mdr: shilian.FubenMdr,
                            hintTypes: ["49" /* Shilian */, "01" /* ShilianMain */ + "01" /* Fuben */],
                        },
                        {
                            btnType: "02" /* Forbidden */,
                            icon: "forbidden_tab",
                            title: "forbidden" /* forbidden */,
                            mdr: shilian.ForbiddenMdr,
                            openIdx: 1041670113 /* Forbidden */,
                            hintTypes: ["49" /* Shilian */, "01" /* ShilianMain */ + "02" /* Forbidden */],
                        },
                        {
                            btnType: "03" /* Xianta */,
                            icon: "xianta_tab",
                            mdr: shilian.XiantaMdr,
                            openIdx: 1041670114 /* Xianta */,
                            hintTypes: ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */],
                        },
                        {
                            btnType: "04" /* YuanLing */,
                            icon: "yuanlingshilian_tab",
                            mdr: shilian.YuanLingMdr,
                            openIdx: 1041670115 /* Yuanling */,
                            bg: 'yuanlingshilian_bg',
                            title: "yuanling_tips1" /* yuanling_tips1 */,
                            hintTypes: ["49" /* Shilian */, "01" /* ShilianMain */ + "04" /* YuanLing */],
                        },
                    ];
                    return _this;
                }
                return ShilianMainMdr;
            }(mod.WndBaseMdr));
            shilian.ShilianMainMdr = ShilianMainMdr;
            __reflect(ShilianMainMdr.prototype, "game.mod.shilian.ShilianMainMdr");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var ItemTapEvent = eui.ItemTapEvent;
            var facade = base.facade;
            var ForbiddenMdr = /** @class */ (function (_super) {
                __extends(ForbiddenMdr, _super);
                function ForbiddenMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", shilian.ForbiddenView);
                    _this._curBigGateSelIdx = 0; // 当前选中的大关卡索引
                    _this.BTN_CENTER = 360;
                    _this.BTN_SAODANG = 250;
                    _this.BTN_FIGHT = 483;
                    return _this;
                }
                ForbiddenMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(194 /* Shilian */);
                    this._listTypeData = new ArrayCollection();
                    this._view.list_type.dataProvider = this._listTypeData;
                    this._view.list_type.itemRenderer = mod.TabSecondItem;
                    this._listBigGateData = new ArrayCollection();
                    this._view.list_big_gate.dataProvider = this._listBigGateData;
                    this._view.list_big_gate.itemRenderer = shilian.ForbiddenGateItemRender;
                    this._listAwdData = new ArrayCollection();
                    this._view.list_awd.dataProvider = this._listAwdData;
                    this._view.list_awd.itemRenderer = mod.Icon;
                };
                ForbiddenMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_forbidden_info_update" /* ON_FORBIDDEN_INFO_UPDATE */, this.onInfoUpdate, this);
                    this.onNt("on_forbidden_awd_update" /* ON_FORBIDDEN_AWD_UPDATE */, this.onInfoUpdate, this);
                    // this.onNt(HintEvent.ON_COMMON_HINT_UPDATE, this.onHintUpdate, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickTypeList);
                    addEventListener(this._view.list_big_gate, ItemTapEvent.ITEM_TAP, this.onClickBigGateList);
                    addEventListener(this._view.gate_awd, TouchEvent.TOUCH_TAP, this.onClickGateAwd);
                    addEventListener(this._view.btn_saodan, TouchEvent.TOUCH_TAP, this.onClickSaodan);
                    addEventListener(this._view.btn_fight, TouchEvent.TOUCH_TAP, this.onClickFight);
                };
                ForbiddenMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    // let types = this._proxy.getFbdTypes();
                    // if(this._listTypeData.length) {
                    //     this._listTypeData.replaceAll(types);
                    // } else {
                    //     this._listTypeData.source = types;
                    // }
                    this.updateInfo(true);
                };
                ForbiddenMdr.prototype.onHide = function () {
                    this._effId = 0;
                    _super.prototype.onHide.call(this);
                };
                ForbiddenMdr.prototype.onInfoUpdate = function () {
                    this.updateInfo();
                };
                ForbiddenMdr.prototype.updateInfo = function (isInit) {
                    var typeDatas = [];
                    var bool = false;
                    this._proxy.curFbdType = 1;
                    for (var type = 1; type <= 5; type++) {
                        var isOpen = this._proxy.isFbdTypeOpen(type);
                        var tData = {
                            icon: "fbd_type" + type,
                            nameIcon: "fbd_title" + type,
                            showHint: this._proxy.getFbdTypeHint(type),
                            gray: !isOpen
                        };
                        typeDatas.push(tData);
                        var finish = this._proxy.isFinishByType(type);
                        if ((!this._proxy.curFbdType || bool != finish) && isOpen) {
                            bool = finish;
                            this._proxy.curFbdType = type;
                            this._curTypeSelIdx = type - 1;
                        }
                    }
                    this._listTypeData.replaceAll(typeDatas);
                    if (isInit) {
                        //判断外部界面是否跳转进来，优先选中跳转的
                        var selType = _super.prototype.decodeShowArgs.call(this, true);
                        if (selType != null) {
                            var type = selType;
                            this._proxy.curFbdType = type;
                            this._curTypeSelIdx = type - 1;
                        }
                    }
                    this._view.list_type.selectedIndex = this._curTypeSelIdx;
                    this.updateCurTypeInfo();
                };
                ForbiddenMdr.prototype.clearShow = function () {
                    this._listBigGateData.removeAll();
                    this._view.lab_gate.text = "";
                    this._view.lab_boss_name.text = "";
                    this._view.gate_awd.visible = false;
                    this._view.grp_eff.visible = false;
                    // this._view.btn_saodan.visible = false;
                    this._view.btn_fight.visible = false;
                    // this._view.lab_saodang_times.text = "";
                    this._view.grp_awd_list.visible = false;
                    this._view.grp_saodang.visible = false;
                };
                /**
                 * 更新当前选中类型数据
                 */
                ForbiddenMdr.prototype.updateCurTypeInfo = function () {
                    var bgStr = "forbidden_bg_" + this._proxy.curFbdType;
                    this.sendNt("update_wnd_base_mdr_bg" /* UPDATE_WND_BASE_MDR_BG */, bgStr);
                    this._curBigGateData = null;
                    var curInfo = this._proxy.getFbdInfo(this._proxy.curFbdType);
                    var fbdFubenCfgs = this._proxy.getFbdFubenCfgByType(this._proxy.curFbdType);
                    if (!curInfo || !fbdFubenCfgs) {
                        this.clearShow();
                        return;
                    }
                    var bigGateDatas = [];
                    var flag = false;
                    var oldFinished; // 前一关已完成
                    var lastOpen;
                    var i = 0;
                    for (var idx in fbdFubenCfgs) {
                        var cfg = fbdFubenCfgs[idx];
                        var info1 = (curInfo.index == cfg.index) ? curInfo : null;
                        var isFinished = this._proxy.isBigGateFinished(this._proxy.curFbdType, cfg.index);
                        var isLimitOpen = mod.RoleUtil.isLimitOpen(cfg.open); //是否达到开启限制条件
                        var isOpen = cfg.index <= curInfo.index || (oldFinished && isLimitOpen);
                        // let isCur = (cfg.index == curInfo.index && !isFinished
                        //     || (cfg.index > curInfo.index && oldFinished && RoleUtil.isLimitOpen(cfg.open)));       // 当前大关卡
                        var isCur = cfg.index == curInfo.index //已完成的也可以选中，防止取不到数据
                            || (cfg.index > curInfo.index && oldFinished && isLimitOpen); // 当前大关卡
                        var gateData = {
                            info: info1,
                            cfg: cfg,
                            isOpen: isOpen,
                            isFinished: isFinished,
                            //showOpenStr: lastOpen && !isLimitOpen//限制条件开启后不显示文本
                            showOpenStr: lastOpen,
                            isLimitOpen: isLimitOpen
                        };
                        if (isCur && (!this._curBigGateData || isFinished != oldFinished)) {
                            this._curBigGateData = gateData;
                            this._curBigGateSelIdx = i;
                            this._proxy.curFbdBigGateId = this._curBigGateData.cfg.index;
                            flag = true;
                        }
                        bigGateDatas.push(gateData);
                        oldFinished = isFinished;
                        lastOpen = isOpen;
                        i++;
                    }
                    this._listBigGateData.replaceAll(bigGateDatas);
                    if (flag) {
                        this._view.list_big_gate.selectedIndex = this._curBigGateSelIdx;
                    }
                    this.updateCurBigGateInfo();
                };
                /**
                 * 更新大关卡数据
                 */
                ForbiddenMdr.prototype.updateCurBigGateInfo = function () {
                    //已通关，扫荡和挑战
                    //已通关的情况下，不显示挑战，（ForbiddenType.Type1显示已通关，其他的扫荡居中）
                    var isFinished = this._proxy.isBigGateFinished(this._proxy.curFbdType, this._curBigGateData.cfg.index);
                    this._view.btn_fight.visible = !isFinished;
                    this._view.btn_fight.redPoint.visible = this._proxy.getChallengeHint(this._proxy.curFbdType); //挑战红点
                    if (this._proxy.curFbdType == 1 /* Type1 */) {
                        //没有扫荡
                        this._view.grp_saodang.visible = false;
                        this._view.img_finished.visible = isFinished;
                        this._view.btn_fight.x = this.BTN_CENTER;
                    }
                    else {
                        //没有已完成
                        this._view.img_finished.visible = false;
                        this._view.grp_saodang.visible = true;
                        this._view.grp_saodang.x = isFinished ? this.BTN_CENTER : this.BTN_SAODANG;
                        this._view.btn_fight.x = this.BTN_FIGHT;
                    }
                    var bigGateCfg0 = game.getConfigByNameId("forbidden_gate.json" /* ForbiddenGate */, this._curBigGateData.cfg.index);
                    if (bigGateCfg0) {
                        var smallGateId = void 0;
                        if (this._curBigGateData.info) {
                            smallGateId = isFinished ? this._curBigGateData.info.id : this._curBigGateData.info.id + 1;
                        }
                        this._bigGateCfg = this._curBigGateData.info && bigGateCfg0[smallGateId] || bigGateCfg0[1]; // 默认取小关卡1的数据
                    }
                    if (!this._bigGateCfg) {
                        return;
                    }
                    var cfg = this._proxy.getGateEndCfg(this._curBigGateData.cfg.index);
                    this._view.lab_gate.text = "\u7B2C" + (isFinished ? cfg.gate_id : this._bigGateCfg.gate_id) + "/" + cfg.gate_id + "\u5173";
                    // boss
                    var mcfg = game.getConfigByNameId("monster1.json" /* Monster */, this._curBigGateData.cfg.bossId[0]);
                    this._view.lab_boss_name.text = mcfg ? mcfg.name : "";
                    if (this._effId) {
                        this.removeEffect(this._effId);
                    }
                    this._view.grp_eff.visible = true;
                    this._effId = this.addMonster(this._curBigGateData.cfg.bossId[0], this._view.grp_eff);
                    // 大奖数据
                    this.updateBigAwd();
                    // 列表奖励数据
                    this._view.grp_awd_list.visible = true;
                    var listAwdPreCfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, this._bigGateCfg.show_reward);
                    listAwdPreCfg && this._listAwdData.replaceAll(listAwdPreCfg.content);
                    var showpower = this._bigGateCfg.show_power;
                    this.addBmpFont(showpower + '', game.BmpTextCfg[100 /* CommonPower */], this._view.grp_font, true, 1, false, 0, true);
                    var times = this._proxy.getSaodangTimes(this._proxy.curFbdType);
                    //let str: string = "扫荡次数:" + TextUtil.addColor(`${times}/1`, WhiteColor.GREEN);
                    //this._view.lab_saodang_times.textFlow = TextUtil.parseHtml(str);
                    this._view.btn_saodan.label = "\u626B\u8361(" + times + ")";
                    this._view.btn_saodan.redPoint.visible = this._proxy.getSaodangHint(this._proxy.curFbdType);
                };
                ForbiddenMdr.prototype.updateBigAwd = function () {
                    var type = this._proxy.curFbdType;
                    var index = this._curBigGateData.cfg.index;
                    var canGet = this._proxy.hasBigAwd(type, index);
                    var cfg = this._proxy.getNearBigAwdCfg(index);
                    this._view.gate_awd.setData(cfg, canGet);
                    var maxGate = cfg.gate_id;
                    var passGate = this._curBigGateData.info ? this._curBigGateData.info.id : 0; // 已通关的小关卡数
                    var curInfo = this._proxy.getFbdInfo(type);
                    if (curInfo && curInfo.index > index) {
                        //已通关大关卡大于当前选中的关卡时，进度取最大值
                        var cfg_1 = this._proxy.getGateEndCfg(index);
                        passGate = cfg_1.gate_id;
                    }
                    this._view.gate_awd.pro_rate.show(passGate, maxGate, false, 0, false);
                    var hasDraw = this._proxy.hasDrawAwds(this._curBigGateData.cfg.index, maxGate); //是否领取完大奖
                    this._view.gate_awd.visible = (passGate < maxGate || canGet) && !hasDraw;
                };
                // private onHintUpdate(n: GameNT) {
                //     let data: IHintData = n.body;
                // }
                ForbiddenMdr.prototype.onClickTypeList = function (e) {
                    var itemIdx = e.itemIndex;
                    var type = itemIdx + 1;
                    if (type == this._proxy.curFbdType) {
                        return;
                    }
                    var cfg = this._proxy.getFbdFirstFubenCfg(type);
                    if (!cfg) {
                        this._view.list_type.selectedIndex = this._curTypeSelIdx;
                        game.PromptBox.getIns().show("即将开启");
                        return;
                    }
                    var isOpen = this._proxy.isFbdTypeOpen(type, true);
                    if (!isOpen) {
                        this._view.list_type.selectedIndex = this._curTypeSelIdx;
                        return;
                    }
                    this._proxy.curFbdType = type;
                    this._curTypeSelIdx = itemIdx;
                    this.updateCurTypeInfo();
                };
                ForbiddenMdr.prototype.onClickBigGateList = function (e) {
                    var itemData = e.item;
                    if (!itemData.isOpen) {
                        var tips = "战力深不可测";
                        if (itemData.showOpenStr) {
                            tips = itemData.isLimitOpen ? "请先通关前面关卡" : "暂未开启";
                        }
                        game.PromptBox.getIns().show(tips);
                        this._view.list_big_gate.selectedIndex = this._curBigGateSelIdx;
                        return;
                    }
                    this._curBigGateData = itemData;
                    this._curBigGateSelIdx = e.itemIndex;
                    this._proxy.curFbdBigGateId = this._curBigGateData.cfg.index;
                    this.updateCurBigGateInfo();
                };
                ForbiddenMdr.prototype.onClickGateAwd = function (e) {
                    var awd0 = this._proxy.getFbdAwd2(this._proxy.curFbdType, this._curBigGateData.cfg.index);
                    if (!awd0 || !awd0.length || !this._view.gate_awd.canGet) {
                        return;
                    }
                    var awd = awd0.shift();
                    this._proxy.c2s_get_reward(awd.index, awd.id);
                };
                ForbiddenMdr.prototype.onClickSaodan = function (e) {
                    var times = this._proxy.getSaodangTimes(this._proxy.curFbdType);
                    var tips = "\u5DF2\u901A\u5173" + this._bigGateCfg.gate_id + "\u5C42,\u626B\u8361\u53EF\u5F97:";
                    var tips1 = "\u5C42\u6570\u8D8A\u9AD8,\u5956\u52B1\u8D8A\u9AD8";
                    var listAwdPreCfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, this._bigGateCfg.show_reward);
                    if (times > 0) {
                        mod.ViewMgr.getIns().showBoxReward(tips, listAwdPreCfg.content, tips1);
                        mod.ViewMgr.getIns().showSecondPop("49" /* Shilian */, "05" /* ForbiddenSaodang */, [this._proxy.curFbdType, this._curBigGateData]);
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("49" /* Shilian */, "05" /* ForbiddenSaodang */, [this._proxy.curFbdType, this._curBigGateData]);
                };
                ForbiddenMdr.prototype.onClickFight = function (e) {
                    if (!this._curBigGateData) {
                        return;
                    }
                    this._proxy.c2s_forbidden_enter(this._proxy.curFbdType);
                    facade.hideView("49" /* Shilian */, "01" /* ShilianMain */);
                };
                return ForbiddenMdr;
            }(game.EffectMdrBase));
            shilian.ForbiddenMdr = ForbiddenMdr;
            __reflect(ForbiddenMdr.prototype, "game.mod.shilian.ForbiddenMdr");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var ForbiddenSaodangMdr = /** @class */ (function (_super) {
                __extends(ForbiddenSaodangMdr, _super);
                function ForbiddenSaodangMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shilian.ForbiddenSaodangView);
                    _this.isEasyHide = true;
                    return _this;
                }
                ForbiddenSaodangMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.verticalCenter = 0;
                    this._view.horizontalCenter = 0;
                    this._listData = new ArrayCollection();
                    this._view.list_item.itemRenderer = shilian.ForbiddenSaodangRender;
                    this._view.list_item.dataProvider = this._listData;
                    this._proxy = this.retProxy(194 /* Shilian */);
                };
                ForbiddenSaodangMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_forbidden_info_update" /* ON_FORBIDDEN_INFO_UPDATE */, this.updateInfo, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn_saodang, TouchEvent.TOUCH_TAP, this.onClickGemUse);
                };
                ForbiddenSaodangMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._curType = this._showArgs[0];
                    this._canSaodang = false; //打开界面时候初始化
                    // this._curBigGateData = this._showArgs[1];
                    this.updateInfo();
                };
                ForbiddenSaodangMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ForbiddenSaodangMdr.prototype.updateInfo = function () {
                    var cfgs = this._proxy.getFbdFubenCfgByType(this._curType);
                    var arr = [];
                    var i = 0;
                    for (var idx in cfgs) {
                        var cfg = cfgs[idx];
                        var finished = this._proxy.isBigGateFinished(this._curType, cfg.index);
                        if (finished && !this._canSaodang) {
                            this._canSaodang = true;
                        }
                        var data = {
                            fbdFubenCfg: cfg,
                            fbdGateCfg: this._proxy.getGateEndCfg(cfg.index),
                            passSmallGateId: this._proxy.getCurSmallGateId(this._curType, cfg.index),
                            isFinished: finished
                        };
                        arr.push(data);
                        i++;
                    }
                    this._listData.replaceAll(arr);
                    var times = this._proxy.getSaodangTimes(this._curType);
                    this._view.btn_saodang.label = "\u514D\u8D39\u626B\u8361(" + times + "/1)";
                    this._view.currentState = this._canSaodang ? "can_fight" : "can_not_fight";
                    this._view.btn_saodang.redPoint.visible = this._canSaodang && times >= 1;
                    if (!this._canSaodang && this._listData.length) {
                        var firstData = this._listData.getItemAt(0);
                        var finishedStr = game.TextUtil.addColor("\u5F53\u524D\u8FDB\u5EA6\uFF1A" + firstData.passSmallGateId + "/" + firstData.fbdGateCfg.gate_id, 16719376 /* RED */);
                        this._view.lab_tip.textFlow = game.TextUtil.parseHtml(finishedStr);
                    }
                };
                ForbiddenSaodangMdr.prototype.onClickGemUse = function () {
                    var times = this._proxy.getSaodangTimes(this._curType);
                    if (!this._curType || !this._canSaodang || times < 1) {
                        game.PromptBox.getIns().show("每日0点重置扫荡次数");
                        return;
                    }
                    this._proxy.c2s_forbidden_sweep(this._curType);
                };
                return ForbiddenSaodangMdr;
            }(game.MdrBase));
            shilian.ForbiddenSaodangMdr = ForbiddenSaodangMdr;
            __reflect(ForbiddenSaodangMdr.prototype, "game.mod.shilian.ForbiddenSaodangMdr");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var TouchEvent = egret.TouchEvent;
            var ForbiddenSceneMdr = /** @class */ (function (_super) {
                __extends(ForbiddenSceneMdr, _super);
                function ForbiddenSceneMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", shilian.XiantaSceneView);
                    _this._curLv = 0;
                    _this._lastLayer = 0;
                    return _this;
                }
                ForbiddenSceneMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.percentHeight = 100;
                    this._view.percentWidth = 100;
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(194 /* Shilian */);
                };
                ForbiddenSceneMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_forbidden_info_update" /* ON_FORBIDDEN_INFO_UPDATE */, this.updateShow, this);
                    this.onNt("on_forbidden_awd_update" /* ON_FORBIDDEN_AWD_UPDATE */, this.updateShow, this);
                    this.onNt("fuben_continue_battle" /* FUBEN_CONTINUE_BATTLE */, this.updateTips, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.icon, TouchEvent.TOUCH_TAP, this.onClickGateAwd);
                };
                ForbiddenSceneMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.updateTips();
                };
                ForbiddenSceneMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ForbiddenSceneMdr.prototype.updateShow = function () {
                    this._curInfo = this._proxy.getFbdInfo(this._proxy.curFbdType);
                    var fbdFubenCfgs = this._proxy.getFbdFubenCfgByType(this._proxy.curFbdType);
                    var curBigGateCfg = fbdFubenCfgs[this._proxy.curFbdBigGateId];
                    if (!curBigGateCfg) {
                        return;
                    }
                    var index = curBigGateCfg.index;
                    var bigGateCfg = this._proxy.getNearBigAwdCfg(index);
                    if (!bigGateCfg) {
                        return;
                    }
                    var isEndSmall = this._proxy.isEndSmallGate2(this._curInfo.index, this._curInfo.id);
                    var bigAwdPreCfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, bigGateCfg.gate_show_reward);
                    this._curLv = this._curInfo && !isEndSmall ? this._curInfo.id : 0;
                    // let maxGate = this._proxy.getBigAwdCondition(curBigGateCfg.index, this._curLv);
                    this._canGet = this._proxy.hasBigAwd(this._proxy.curFbdType, index);
                    this._view.lab_name.text = "通关大奖";
                    var maxGate = bigGateCfg.gate_id;
                    var passGate = this._curInfo ? this._curInfo.id : 0; // 已通关的小关卡数
                    if (this._curInfo && this._curInfo.index < index) {
                        //已通关大关卡小于当前选中的关卡时，进度取0
                        passGate = 0;
                    }
                    this._view.bar.show(passGate, maxGate, false, 0, false);
                    if (!bigAwdPreCfg) {
                        return;
                    }
                    if (this._canGet) {
                        this._view.icon.setData(bigAwdPreCfg.content[0], 3 /* NotTips */);
                        this._view.icon.setHint(true);
                    }
                    else {
                        this._view.icon.setData(bigAwdPreCfg.content[0], 1 /* Reward */);
                        this._view.icon.setHint(false);
                    }
                    this._awdData = this._proxy.getFbdAwd2(this._proxy.curFbdType, curBigGateCfg.index);
                };
                ForbiddenSceneMdr.prototype.updateTips = function () {
                    var curLayer = this._curLv + 1;
                    if (this._lastLayer != curLayer) {
                        mod.ViewMgr.getIns().showChallengeTips(curLayer);
                        this._lastLayer = curLayer;
                    }
                };
                ForbiddenSceneMdr.prototype.onClickGateAwd = function (e) {
                    if (!this._awdData || !this._canGet || !this._awdData.length) {
                        return;
                    }
                    var awd = this._awdData.pop();
                    this._proxy.c2s_get_reward(awd.index, awd.id);
                };
                return ForbiddenSceneMdr;
            }(game.MdrBase));
            shilian.ForbiddenSceneMdr = ForbiddenSceneMdr;
            __reflect(ForbiddenSceneMdr.prototype, "game.mod.shilian.ForbiddenSceneMdr");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var Event = egret.Event;
            var Handler = base.Handler;
            var FubenMdr = /** @class */ (function (_super) {
                __extends(FubenMdr, _super);
                function FubenMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", shilian.FubenView);
                    return _this;
                }
                FubenMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(194 /* Shilian */);
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                    this._btnList = new ArrayCollection();
                    this._view.list_type.itemRenderer = mod.TabSecondItem;
                    this._view.list_type.dataProvider = this._btnList;
                };
                FubenMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_type, Event.CHANGING, this.onClickType);
                    addEventListener(this._view.img_cost, TouchEvent.TOUCH_TAP, this.onClickCost);
                    addEventListener(this._view.btn_more1, TouchEvent.TOUCH_TAP, this.onClickMore1);
                    addEventListener(this._view.btn_more2, TouchEvent.TOUCH_TAP, this.onClickMore2);
                    addEventListener(this._view.btn_more3, TouchEvent.TOUCH_TAP, this.onClickMore3);
                    addEventListener(this._view.btn_reset, TouchEvent.TOUCH_TAP, this.onClickReset);
                    addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
                    this.onNt("on_fuben_info_update" /* ON_FUBEN_INFO_UPDATE */, this.onInfoUpdate, this);
                };
                FubenMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.initTypeList();
                    this.typeUpdateInfo();
                    this.updateTypeListHint();
                };
                FubenMdr.prototype.onHide = function () {
                    mod.GuideMgr.getIns().clear(9 /* FubenChallege */); //清除指引
                    _super.prototype.onHide.call(this);
                };
                FubenMdr.prototype.initShow = function () {
                    this.addEftByParent("btn" /* Btn */, this._view.btn_challenge.group_eft);
                };
                FubenMdr.prototype.onClickType = function (e) {
                    var type = this._proxy.typeList[this._view.list_type.selectedIndex];
                    if (type == this._selType) {
                        return;
                    }
                    if (!this._proxy.isFubenOpen(type, true)) {
                        e.preventDefault();
                        return;
                    }
                    this.setSelType(type);
                    this.typeUpdateInfo();
                };
                FubenMdr.prototype.onClickCost = function () {
                    var idx = this._cost[0];
                    mod.ViewMgr.getIns().showPropTips(idx);
                };
                FubenMdr.prototype.onClickMore1 = function () {
                    mod.ViewMgr.getIns().openVipView();
                };
                FubenMdr.prototype.onClickMore2 = function () {
                    mod.ViewMgr.getIns().showViewByID(70 /* PrerogativeWrit2 */);
                };
                FubenMdr.prototype.onClickMore3 = function () {
                    mod.ViewMgr.getIns().showViewByID(38 /* RoleRing */);
                };
                FubenMdr.prototype.onClickReset = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    var isFree = this._selInfo && this._selInfo.free;
                    if (!isFree) {
                        if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                            return;
                        }
                    }
                    var self = this;
                    mod.ViewMgr.getIns().showConfirm("是否重置副本进度?重置进度后可再次挑战获得奖励", Handler.alloc(this, function () {
                        self._proxy.c2s_material_reset(self._selType);
                    }));
                };
                FubenMdr.prototype.onClickChallenge = function () {
                    if (this._isMax) {
                        game.PromptBox.getIns().show(game.getLanById("pass" /* pass */));
                        return;
                    }
                    if (this._canSweep) {
                        this._proxy.c2s_material_sweep(this._selType);
                        return;
                    }
                    this._proxy.c2s_material_enter(this._selType);
                };
                FubenMdr.prototype.onInfoUpdate = function () {
                    this.updateTypeListHint();
                    this.updateInfo();
                };
                FubenMdr.prototype.initTypeList = function () {
                    var datas = [];
                    for (var i = 0; i < this._proxy.typeList.length; ++i) {
                        var type_1 = this._proxy.typeList[i];
                        var icon = "fuben_type_" + type_1;
                        var nameIcon = "fuben_name_" + type_1;
                        datas.push({ icon: icon, nameIcon: nameIcon });
                    }
                    this._btnList.source = datas;
                    var type = this._proxy.typeList[0];
                    var selType = _super.prototype.decodeShowArgs.call(this, true);
                    if (selType != null) {
                        type = selType;
                    }
                    this.setSelType(type);
                    this._view.list_type.selectedIndex = this._selType - 1;
                };
                FubenMdr.prototype.setSelType = function (type) {
                    this._selType = type;
                    this._proxy.selType = this._selType;
                    mod.ViewMgr.getIns().lastData = ["01" /* Fuben */, this._selType + ""];
                    this.showGuide();
                };
                FubenMdr.prototype.updateTypeListHint = function () {
                    var list = this._btnList.source;
                    var len = list ? list.length : 0;
                    for (var i = 0; i < len; i++) {
                        var btnData = list[i];
                        var type = this._proxy.typeList[i];
                        var hintType1 = this._proxy.getChallengeHintType(type);
                        var hintType2 = this._proxy.getResetHintType(type);
                        var hint = mod.HintMgr.getHint(hintType1) || mod.HintMgr.getHint(hintType2);
                        if (!!btnData.showHint != hint) { //过滤undefined!=false
                            btnData.showHint = hint;
                            this._btnList.itemUpdated(btnData);
                        }
                    }
                };
                FubenMdr.prototype.typeUpdateInfo = function () {
                    this._selCfg = game.getConfigByNameId("material_fuben.json" /* MaterialFuben */, this._selType);
                    this.updateShow();
                    this.updateInfo();
                    this.updateMore();
                };
                FubenMdr.prototype.updateShow = function () {
                    var titleStr = this._selCfg.name;
                    this.sendNt("update_wnd_base_mdr_title" /* UPDATE_WND_BASE_MDR_TITLE */, titleStr);
                    var bgStr = "fuben_bg_" + this._selType;
                    this.sendNt("update_wnd_base_mdr_bg" /* UPDATE_WND_BASE_MDR_BG */, bgStr);
                    var giftStr = "fuben_gift_" + this._selType;
                    this._view.btn_gift.iconDisplay.source = giftStr;
                    this._view.btn_gift.updateGift(this._selCfg.buyId);
                    var index = this._proxy.getPropIndex(this._selType);
                    var cfg = game.GameConfig.getPropConfigById(index);
                    var moreStr = game.getLanById("gengduo" /* gengduo */) + cfg.name;
                    this._view.lab_more.text = moreStr;
                };
                FubenMdr.prototype.updateInfo = function () {
                    this._selInfo = this._proxy.getFubenInfo(this._selType);
                    var maxLv = this._selInfo && this._selInfo.history_lv ? this._selInfo.history_lv : 0;
                    var curLv = this._selInfo && this._selInfo.lvl ? this._selInfo.lvl : 1;
                    var cfgList = game.getConfigByNameId("material_scene.json" /* MaterialScene */, this._selType);
                    this._isMax = maxLv == curLv && !cfgList[maxLv + 1];
                    var maxStr = maxLv + "层";
                    this.addBmpFont(maxStr, game.BmpTextCfg[206 /* Layer */], this._view.grp_maxLv, true, 0.8, false, 0, true);
                    // let lvStr = "d" + ResUtil.getChineseFontStr(curLv) + "c";
                    var lvStr = "第" + game.StringUtil.getCNBynumber(+curLv) + "层";
                    this.addBmpFont(lvStr, game.BmpTextCfg[205 /* ChineseLayer */], this._view.grp_lv, false, 1, true);
                    //奖励
                    var cfg = cfgList[curLv];
                    var rewardId = cfg.reward;
                    var rewardCfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, rewardId);
                    this._itemList.source = rewardCfg.content;
                    var openLimit = this._selCfg.mopup_open;
                    this._canSweep = maxLv >= openLimit && maxLv > curLv - 1 && !this._isMax; //可扫荡
                    this._view.btn_challenge.labelDisplay.text = this._canSweep ? game.getLanById("sweep" /* sweep */) : game.getLanById("tishi_30" /* tishi_30 */);
                    var power = cfg.show_power;
                    var canChallenge = game.RoleVo.ins.showpower.toNumber() >= power && !this._isMax;
                    this._view.btn_challenge.redPoint.visible = this._canSweep || canChallenge;
                    this._view.grp_reset.visible = curLv > 1;
                    if (this._view.grp_reset.visible) {
                        this.updateResetGrp();
                    }
                    this._view.recommendPower.setPowerValue(power);
                };
                FubenMdr.prototype.updateResetGrp = function () {
                    var isFree = this._selInfo && !!this._selInfo.free;
                    var str = "";
                    var canReset = isFree;
                    this._cost = this._selCfg.cost[0];
                    var idx = this._cost[0];
                    var cfg = game.GameConfig.getPropConfigById(idx);
                    if (isFree) {
                        str = game.TextUtil.addColor(game.getLanById("bosshome_tips5" /* bosshome_tips5 */), 8585074 /* GREEN */);
                    }
                    else {
                        var costCnt = this._cost[1];
                        var curCnt = mod.BagUtil.getPropCntByIdx(idx);
                        canReset = curCnt >= costCnt;
                        str = game.TextUtil.addColor(curCnt + "", canReset ? 8585074 /* GREEN */ : 16731212 /* RED */);
                    }
                    this._view.img_cost.source = cfg.icon;
                    this._view.lab_cost.textFlow = game.TextUtil.parseHtml(str);
                    this._view.btn_reset.redPoint.visible = canReset;
                };
                FubenMdr.prototype.showGuide = function () {
                    if (this._selType == 1 /* Type1 */) {
                        mod.GuideMgr.getIns().show(9 /* FubenChallege */, this._view.btn_challenge, Handler.alloc(this, this.onClickChallenge)); //任务指引
                    }
                    else {
                        mod.GuideMgr.getIns().clear(9 /* FubenChallege */); //清除指引
                    }
                };
                //刷新更多加成
                FubenMdr.prototype.updateMore = function () {
                    //当前vip加成
                    var vipCfg = game.getConfigByNameId("vip.json" /* Vip */, game.RoleVo.ins.vip_lv);
                    var addVal1 = 0;
                    if (vipCfg) {
                        var cfg1 = game.getConfigByNameId("new_privilege.json" /* NewPrivilege */, vipCfg.privilege_id);
                        addVal1 = this._proxy.getPrivilegeAdd(cfg1, this._selCfg.type);
                    }
                    this._view.btn_more1.labelDisplay.text = addVal1 + "%";
                    //上清令加成
                    var cfgs = mod.StoreUtil.getDirectShopCfgListByType(6 /* PrerogativeWrit */);
                    var productId2 = cfgs[2 /* Shangqing */ - 1].product_id;
                    var cfgList = mod.PayUtil.getPrivilegeCfgList(productId2);
                    var cfg2 = cfgList[0] || null;
                    var addVal2 = this._proxy.getPrivilegeAdd(cfg2, this._selCfg.type);
                    this._view.btn_more2.labelDisplay.text = addVal2 + "%";
                    //主角光环加成
                    var cfg3 = game.getConfigByNameId("new_privilege.json" /* NewPrivilege */, 1006 /* RoleRing */);
                    var addVal3 = this._proxy.getPrivilegeAdd(cfg3, this._selCfg.type);
                    this._view.btn_more3.labelDisplay.text = addVal3 + "%";
                };
                return FubenMdr;
            }(game.EffectMdrBase));
            shilian.FubenMdr = FubenMdr;
            __reflect(FubenMdr.prototype, "game.mod.shilian.FubenMdr");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var Tween = base.Tween;
            var Handler = base.Handler;
            var delayCall = base.delayCall;
            var clearDelay = base.clearDelay;
            var ArrayCollection = eui.ArrayCollection;
            var FubenSceneMdr = /** @class */ (function (_super) {
                __extends(FubenSceneMdr, _super);
                function FubenSceneMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", shilian.FubenSceneView);
                    _this._lastLv = 0;
                    _this._leftTime = 300; //剩余时间
                    _this._timeOut = 0;
                    _this._timeOutLv = 0;
                    _this.LAYER_NUM = 30; //大于等于30层时不做层级滚动表现
                    return _this;
                }
                FubenSceneMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.percentHeight = 100;
                    this._view.percentWidth = 100;
                    this._view.touchEnabled = false;
                    this._itemList1 = new ArrayCollection();
                    this._view.list_layer1.itemRenderer = shilian.FubenLayerItem1;
                    this._view.list_layer1.dataProvider = this._itemList1;
                    this._itemList2 = new ArrayCollection();
                    this._view.list_layer2.itemRenderer = shilian.FubenLayerItem2;
                    this._view.list_layer2.dataProvider = this._itemList2;
                    this._proxy = this.retProxy(194 /* Shilian */);
                };
                FubenSceneMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
                    this.onNt("on_fuben_scene_update" /* ON_FUBEN_SCENE_UPDATE */, this.onSceneUpdate, this);
                    this.onNt("on_fuben_skip_update" /* ON_FUBEN_SKIP_UPDATE */, this.updateJump, this);
                };
                FubenSceneMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.setViewIndex();
                    this._selCfg = game.getConfigByNameId("material_fuben.json" /* MaterialFuben */, this._proxy.type);
                    this.updateJump();
                    this.updateShow();
                    this.updateTime();
                    this.updateGiftTips();
                };
                FubenSceneMdr.prototype.onHide = function () {
                    this._lastLv = 0;
                    this._curLv = 0;
                    this._showJump = false;
                    this._leftTime = 300;
                    this._proxy.resetLvInfo();
                    TimeMgr.removeUpdateItem(this);
                    if (this._timeOut) {
                        clearDelay(this._timeOut);
                        this._timeOut = 0;
                    }
                    this.clearTimeOutLv();
                    if (this._view.scr1) {
                        Tween.remove(this._view.scr1.viewport);
                    }
                    if (this._view.scr2) {
                        Tween.remove(this._view.scr2.viewport);
                    }
                    Tween.remove(this._view.grp_lv0);
                    this.removeTipsTween();
                    _super.prototype.onHide.call(this);
                };
                FubenSceneMdr.prototype.clearTimeOutLv = function () {
                    if (this._timeOutLv) {
                        clearDelay(this._timeOutLv);
                        this._timeOutLv = 0;
                    }
                };
                FubenSceneMdr.prototype.onSceneUpdate = function () {
                    this.updateShow();
                    if (this._proxy.lv == this._proxy.endLv + 1) {
                        this.updateTips();
                    }
                };
                FubenSceneMdr.prototype.onClickGift = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    this.setGiftTips(false);
                    mod.ViewMgr.getIns().showGift(this._selCfg.buyId);
                };
                FubenSceneMdr.prototype.updateShow = function () {
                    var lv = this._proxy.lv;
                    if (!lv) {
                        return;
                    }
                    if (this._lastLv != lv) {
                        this._leftTime = this._selCfg.time; //重置时间
                        TimeMgr.addUpdateItem(this, 1000);
                        //显示第几层
                        if (!this._showJump) {
                            mod.ViewMgr.getIns().showChallengeTips(lv);
                        }
                        this._lastLv = lv;
                    }
                    var lvStr = game.getLanById("cycle_tower1" /* cycle_tower1 */) + "：" + game.TextUtil.addColor((lv - 1) + "", 8585074 /* GREEN */);
                    //let lvStr = getLanById(LanDef.cycle_tower1) + "：" + TextUtil.addColor(lv + "", BlackColor.GREEN);
                    this._view.lab_cur.textFlow = game.TextUtil.parseHtml(lvStr);
                    var cnt = this._proxy.totalCount;
                    var index = this._proxy.getPropIndex(this._proxy.type);
                    var cfg = game.GameConfig.getPropConfigById(index);
                    var cntStr = game.getLanById("leiji" /* leiji */) + cfg.name + "：" + game.TextUtil.addColor(game.StringUtil.getHurtNumStr(cnt) + "", 8585074 /* GREEN */);
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                    this._view.lab_name.text = this._selCfg.name;
                };
                FubenSceneMdr.prototype.update = function (time) {
                    this.updateTime();
                    if (this._leftTime > 0) {
                        this._leftTime--;
                    }
                    else {
                        mod.SceneUtil.clickExit();
                        TimeMgr.removeUpdateItem(this);
                    }
                };
                FubenSceneMdr.prototype.updateTime = function () {
                    var timeStr = game.getLanById("battle_cue40" /* battle_cue40 */) + "：" + game.TextUtil.addColor(this._leftTime + "秒", 8585074 /* GREEN */);
                    this._view.lab_time.textFlow = game.TextUtil.parseHtml(timeStr);
                };
                FubenSceneMdr.prototype.updateJump = function () {
                    var _this = this;
                    if (this._proxy.stLv == this._proxy.endLv) {
                        this._view.grp_lv0.visible = false;
                        this._view.grp_tips.visible = false;
                        return;
                    }
                    this._showJump = true;
                    this.updateTips();
                    this._timeOut = delayCall(Handler.alloc(this, function () {
                        _this._timeOut = 0;
                        //this._curLv = this._proxy.stLv;
                        _this._view.grp_lv0.visible = true;
                        _this._view.grp_tips.visible = true;
                        _this.showJumpTween();
                    }), 1000);
                };
                FubenSceneMdr.prototype.showJumpTween = function () {
                    var _this = this;
                    var maxLv = this._proxy.endLv + 1;
                    if (maxLv >= this.LAYER_NUM) {
                        //不做表现
                        this.showLv(maxLv);
                    }
                    else {
                        //滚动动画
                        this._view.grp_lv.visible = false;
                        this._view.grp_lv_show.visible = true;
                        var infos2 = [];
                        for (var i = 0; i <= maxLv; ++i) {
                            var layer2 = i % 10;
                            infos2.push(layer2);
                        }
                        this._itemList2.source = infos2;
                        var pos = maxLv + 1;
                        var timeTick = Math.min(maxLv * 100, 1500);
                        mod.ScrollUtil.moveVToAssign(this._view.scr2, pos, 44, timeTick);
                        this._timeOut = delayCall(Handler.alloc(this, function () {
                            _this._timeOut = 0;
                            _this.showLv(maxLv);
                        }), timeTick);
                        if (maxLv >= 10) {
                            //显示两位数
                            var infos1 = [{ layer: 0, isCur: false }]; //先塞0进去
                            var layerNum = Math.floor(maxLv / 10); //向下取整
                            for (var i = 0; i <= layerNum; ++i) {
                                infos1.push({ layer: i, isCur: i == 0 });
                            }
                            this._itemList1.source = infos1;
                            if (!this._view.scr1.parent) {
                                this._view.grp_lv_show.addChildAt(this._view.scr1, 1);
                            }
                            var perTick = timeTick / maxLv;
                            var totalTick = perTick * 9;
                            var _loop_1 = function (i) {
                                totalTick = totalTick * i;
                                var pos_1 = i + 2;
                                delayCall(Handler.alloc(this_1, function () {
                                    var list = _this._itemList1.source;
                                    var btnData = list[i + 1];
                                    btnData.isCur = true;
                                    _this._itemList1.itemUpdated(btnData);
                                    mod.ScrollUtil.moveVToAssign(_this._view.scr1, pos_1, 44, 200, undefined, true);
                                    delayCall(Handler.alloc(_this, function () {
                                        var btnData2 = list[i];
                                        btnData2.isCur = false;
                                        _this._itemList1.itemUpdated(btnData2);
                                    }), 200);
                                }), totalTick);
                            };
                            var this_1 = this;
                            for (var i = 1; i <= layerNum; ++i) {
                                _loop_1(i);
                            }
                        }
                        else {
                            //显示一位数
                            if (this._view.scr1 && this._view.scr1.parent) {
                                this._view.scr1.parent.removeChild(this._view.scr1); //移除十位数
                            }
                        }
                    }
                };
                FubenSceneMdr.prototype.showLv = function (lv) {
                    var _this = this;
                    this._view.grp_lv.visible = true;
                    this._view.grp_lv_show.visible = false;
                    var curStr = "第" + lv + "层";
                    this.addBmpFont(curStr, game.BmpTextCfg[206 /* Layer */], this._view.grp_lv, true, 1, true);
                    this._timeOut = delayCall(Handler.alloc(this, function () {
                        _this._timeOut = 0;
                        _this._view.grp_lv0.visible = false;
                        _this._view.grp_tips.visible = false;
                        _this._showJump = false;
                    }), 1000);
                };
                FubenSceneMdr.prototype.updateTips = function () {
                    var cnt = this._proxy.totalCount;
                    var layerStr = game.TextUtil.addColor(this._proxy.endLv + "", 8585074 /* GREEN */);
                    var tipsStr = game.StringUtil.substitute(game.getLanById("fuben_skip_tips" /* fuben_skip_tips */), [layerStr]);
                    var index = this._proxy.getPropIndex(this._proxy.type);
                    var cfg = game.GameConfig.getPropConfigById(index);
                    tipsStr += game.TextUtil.addColor(game.StringUtil.getHurtNumStr(cnt), 8585074 /* GREEN */) + cfg.name;
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(tipsStr);
                };
                FubenSceneMdr.prototype.updateGiftTips = function () {
                    var productId = this._selCfg.buyId;
                    var showGift = mod.PayUtil.checkShowGift(productId);
                    this._view.grp_gift.visible = showGift;
                    if (showGift) {
                        var hasBuy = mod.PayUtil.hasBuy(productId);
                        this.setGiftTips(!hasBuy);
                        var cfgList = mod.PayUtil.getPrivilegeCfgList(productId);
                        var cfg = cfgList[0] || null;
                        var addVal = this._proxy.getPrivilegeAdd(cfg, this._selCfg.type);
                        var addStr = game.getLanById("shouyi_tips" /* shouyi_tips */) + "+" + addVal + "%";
                        this._view.lab_add.text = addStr;
                    }
                };
                FubenSceneMdr.prototype.setGiftTips = function (show) {
                    this._view.img_tips.visible = show;
                    if (show) {
                        this._view.img_tips.x = -57;
                        Tween.get(this._view.img_tips, { loop: true })
                            .to({ x: -20 }, 500)
                            .to({ x: -57 }, 500);
                    }
                    else {
                        this.removeTipsTween();
                    }
                };
                FubenSceneMdr.prototype.removeTipsTween = function () {
                    Tween.remove(this._view.img_tips);
                };
                return FubenSceneMdr;
            }(game.EffectMdrBase));
            shilian.FubenSceneMdr = FubenSceneMdr;
            __reflect(FubenSceneMdr.prototype, "game.mod.shilian.FubenSceneMdr", ["base.UpdateItem"]);
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var Handler = base.Handler;
            var ResultFubenMdr = /** @class */ (function (_super) {
                __extends(ResultFubenMdr, _super);
                function ResultFubenMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shilian.ResultFubenView);
                    _this.isEasyHide = true;
                    return _this;
                }
                ResultFubenMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(194 /* Shilian */);
                };
                ResultFubenMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                ResultFubenMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
                };
                ResultFubenMdr.prototype.onHide = function () {
                    if (mod.SceneUtil.getCurSceneType() == 108 /* Fuben */) {
                        mod.SceneUtil.exitScene();
                    }
                    _super.prototype.onHide.call(this);
                    this.sendNt("on_xiuxiannvpu_special_challenge_next" /* ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT */);
                };
                ResultFubenMdr.prototype.updateShow = function () {
                    var rewardInfo = this._showArgs;
                    // 1:区分扫荡或者挑战(0扫荡，1挑战)
                    // 2:总的货币数量
                    // 3:特权加成数量
                    // 4:历史最高层
                    var maxLv = rewardInfo.params && rewardInfo.params.length && rewardInfo.params.length > 3 ? rewardInfo.params[3] : 0;
                    var lvStr = maxLv + "";
                    this.addBmpFont(lvStr, game.BmpTextCfg[206 /* Layer */], this._view.grp_lv, true, 0.7);
                    this.addBmpFont(lvStr, game.BmpTextCfg[206 /* Layer */], this._view.grp_maxLv, true, 0.7);
                    var cnt = rewardInfo.params && rewardInfo.params.length && rewardInfo.params.length > 1 ? rewardInfo.params[1] : 0;
                    var addCnt = rewardInfo.params && rewardInfo.params.length && rewardInfo.params.length > 2 ? rewardInfo.params[2] : 0;
                    var index = this._proxy.getPropIndex(this._proxy.selType);
                    var cfg = game.GameConfig.getPropConfigById(index);
                    var cntStr = "基础" + cfg.name + "  " + game.TextUtil.addColor("+" + game.StringUtil.getHurtNumStr(cnt), 8585074 /* GREEN */);
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                    var addStr = "特权加成  " + game.TextUtil.addColor("+" + game.StringUtil.getHurtNumStr(addCnt), 8585074 /* GREEN */);
                    this._view.lab_add.textFlow = game.TextUtil.parseHtml(addStr);
                };
                return ResultFubenMdr;
            }(game.EffectMdrBase));
            shilian.ResultFubenMdr = ResultFubenMdr;
            __reflect(ResultFubenMdr.prototype, "game.mod.shilian.ResultFubenMdr");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var Event = egret.Event;
            var Handler = base.Handler;
            var XiantaMdr = /** @class */ (function (_super) {
                __extends(XiantaMdr, _super);
                function XiantaMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", shilian.XiantaView);
                    _this._rankList = [1 /* Type1 */, 2 /* Type2 */, 3 /* Type3 */];
                    return _this;
                }
                /**排行榜类型*/
                XiantaMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(194 /* Shilian */);
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                    this._btnList = new ArrayCollection();
                    this._view.list_type.itemRenderer = mod.TabSecondItem;
                    this._view.list_type.dataProvider = this._btnList;
                };
                XiantaMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_type, Event.CHANGING, this.onClickType);
                    addEventListener(this._view.btn_sweep, TouchEvent.TOUCH_TAP, this.onClickSweep);
                    addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
                    addEventListener(this._view.icon, TouchEvent.TOUCH_TAP, this.onClickIcon);
                    this.onNt("on_xianta_info_update" /* ON_XIANTA_INFO_UPDATE */, this.onInfoUpdate, this);
                    this.onNt("on_rank_info_update" /* ON_RANK_INFO_UPDATE */, this.onRankUpdate, this);
                };
                XiantaMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initTypeList();
                    this.typeUpdateInfo();
                    this.updateTypeListHint();
                };
                XiantaMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XiantaMdr.prototype.onClickType = function (e) {
                    var type = this._proxy.typeList[this._view.list_type.selectedIndex];
                    if (type == this._selType) {
                        return;
                    }
                    if (!this._proxy.isXiantaOpen(type, true)) {
                        //策划配置同一个功能ID
                        e.preventDefault();
                        return;
                    }
                    this.setSelType(type);
                    this.typeUpdateInfo();
                };
                XiantaMdr.prototype.onClickSweep = function () {
                    var _this = this;
                    this._selInfo = this._proxy.getXiantaInfo(this._selType);
                    var passLv = this._selInfo && this._selInfo.layer ? this._selInfo.layer : 0;
                    var tips = "\u5DF2\u901A\u5173" + passLv + "\u5C42,\u626B\u8361\u53EF\u5F97:";
                    var tips1 = "\u5C42\u6570\u8D8A\u9AD8,\u5956\u52B1\u8D8A\u9AD8";
                    if (this._canSweep) {
                        mod.ViewMgr.getIns().showBoxReward(tips, this._itemList.source, tips1, Handler.alloc(this, function () { _this._proxy.c2s_xiantower_sweep(_this._selType); }));
                        return;
                    }
                    game.PromptBox.getIns().show(game.getLanById("fight_soul_altar_tips4" /* fight_soul_altar_tips4 */));
                };
                XiantaMdr.prototype.onClickChallenge = function () {
                    if (this._isMax) {
                        game.PromptBox.getIns().show(game.getLanById("pass" /* pass */));
                        return;
                    }
                    this._proxy.c2s_challenge_xiantower(this._selType);
                };
                XiantaMdr.prototype.onClickIcon = function () {
                    if (this._canDraw) {
                        this._proxy.c2s_xiantower_get_rewards(this._selType);
                        return;
                    }
                    var data = this._view.icon.data;
                    mod.ViewMgr.getIns().showPropTips(data[0]);
                };
                XiantaMdr.prototype.onInfoUpdate = function () {
                    this.updateTypeListHint();
                    this.updateInfo();
                };
                XiantaMdr.prototype.onRankUpdate = function () {
                    this.updateRankInfo();
                };
                XiantaMdr.prototype.initTypeList = function () {
                    var datas = [];
                    for (var i = 0; i < this._proxy.typeList.length; ++i) {
                        var type_2 = this._proxy.typeList[i];
                        var icon = "xianta_type_" + type_2;
                        var nameIcon = "xianta_name_" + type_2;
                        var gray = !this._proxy.isXiantaOpen(type_2);
                        datas.push({ icon: icon, nameIcon: nameIcon, gray: gray });
                    }
                    this._btnList.source = datas;
                    var type = this._proxy.typeList[0];
                    var selType = _super.prototype.decodeShowArgs.call(this, true);
                    if (selType != null) {
                        type = selType;
                    }
                    this.setSelType(type);
                    this._view.list_type.selectedIndex = this._selType - 1;
                };
                XiantaMdr.prototype.setSelType = function (type) {
                    this._selType = type;
                    this._proxy.selXiantaType = this._selType;
                    var rankType = this._rankList[type - 1];
                    this._rankType = rankType;
                    mod.RankUtil.c2s_new_rank_req_rank(rankType);
                    mod.ViewMgr.getIns().lastData = ["03" /* Xianta */, this._selType + ""];
                };
                XiantaMdr.prototype.updateTypeListHint = function () {
                    var list = this._btnList.source;
                    var len = list ? list.length : 0;
                    for (var i = 0; i < len; i++) {
                        var btnData = list[i];
                        var type = this._proxy.typeList[i];
                        var hint = this._proxy.getXiantaHint(type);
                        if (!!btnData.showHint != hint) { //过滤undefined!=false
                            btnData.showHint = hint;
                            this._btnList.itemUpdated(btnData);
                        }
                    }
                };
                XiantaMdr.prototype.typeUpdateInfo = function () {
                    this._selCfg = game.getConfigByNameId("xianta_fuben.json" /* XiantaFuben */, this._selType);
                    this.updateShow();
                    this.updateInfo();
                    this.updateRankInfo();
                };
                XiantaMdr.prototype.updateShow = function () {
                    var titleStr = this._selCfg.name;
                    this.sendNt("update_wnd_base_mdr_title" /* UPDATE_WND_BASE_MDR_TITLE */, titleStr);
                    var bgStr = "xianta_bg_" + this._selType;
                    this.sendNt("update_wnd_base_mdr_bg" /* UPDATE_WND_BASE_MDR_BG */, bgStr);
                };
                XiantaMdr.prototype.updateInfo = function () {
                    this._selInfo = this._proxy.getXiantaInfo(this._selType);
                    var passLv = this._selInfo && this._selInfo.layer ? this._selInfo.layer : 0;
                    var curLv = passLv + 1;
                    var cfgList = game.getConfigByNameId("xianta_scene.json" /* XiantaScene */, this._selType);
                    this._isMax = !cfgList[curLv]; //取不到下级配置
                    if (this._isMax) {
                        curLv = passLv; //同全部关卡时显示当前关卡
                    }
                    // let lvStr = "d" + ResUtil.getChineseFontStr(curLv) + "c";
                    var lvStr = "第" + game.StringUtil.getCNBynumber(+curLv) + "层";
                    this.addBmpFont(lvStr, game.BmpTextCfg[205 /* ChineseLayer */], this._view.grp_lv, false, 1, true);
                    var cfg = cfgList[curLv];
                    var cnt = this._selInfo && this._selInfo.count ? this._selInfo.count : 0;
                    var showSeep = curLv > 1;
                    this._view.currentState = showSeep ? "2" : "1";
                    this._canSweep = showSeep && cnt > 0; //可扫荡
                    this._view.btn_sweep.label = "\u626B\u8361(" + cnt + ")";
                    this._view.btn_sweep.redPoint.visible = this._canSweep;
                    // let maxFree = this._selCfg.free;
                    // let sweepStr = getLanById(LanDef.saodang_times) + ":" + TextUtil.addColor(cnt + "/" + maxFree, cnt > 0 ? WhiteColor.GREEN : WhiteColor.RED);
                    // this._view.lab_sweepCnt.textFlow = TextUtil.parseHtml(sweepStr);
                    var power = cfg.show_power;
                    var canChallenge = game.RoleVo.ins.showpower.toNumber() >= power && !this._isMax;
                    this._view.btn_challenge.redPoint.visible = canChallenge;
                    //奖励
                    var rewardId = cfg.reward;
                    var rewardCfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, rewardId);
                    this._itemList.source = rewardCfg.content;
                    //显示推荐战力
                    this.addBmpFont(power + '', game.BmpTextCfg[100 /* CommonPower */], this._view.grp_font, true, 1, false, 0, true);
                    //大奖
                    var bigCfg = this._proxy.getXiantaBigRewardCfg(this._selType);
                    this._view.icon.visible = this._view.bar.visible = !!bigCfg;
                    this._canDraw = false;
                    if (this._view.icon.visible) {
                        var reward = bigCfg.big_reward[0];
                        this._view.icon.setData(reward, 3 /* NotTips */);
                        var needLv = bigCfg.lvl;
                        this._canDraw = passLv >= needLv;
                        this._view.icon.setHint(this._canDraw);
                        this._view.bar.show(passLv, needLv, false, 0, false);
                    }
                };
                XiantaMdr.prototype.updateRankInfo = function () {
                    var rankInfo = mod.RankUtil.getRankInfo(this._rankType);
                    if (rankInfo && rankInfo.top_info) {
                        var nameStr = rankInfo.top_info.name;
                        var cntStr = game.getLanById("tongtian24" /* tongtian24 */) + rankInfo.info_list[0].count;
                        this._view.rankFirstItem.updateShow(this._rankType, nameStr, cntStr);
                    }
                    else {
                        this._view.rankFirstItem.updateShow(this._rankType);
                    }
                };
                return XiantaMdr;
            }(game.EffectMdrBase));
            shilian.XiantaMdr = XiantaMdr;
            __reflect(XiantaMdr.prototype, "game.mod.shilian.XiantaMdr");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var TouchEvent = egret.TouchEvent;
            var XiantaSceneMdr = /** @class */ (function (_super) {
                __extends(XiantaSceneMdr, _super);
                function XiantaSceneMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", shilian.XiantaSceneView);
                    _this._lastLv = 0;
                    return _this;
                }
                XiantaSceneMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.percentHeight = 100;
                    this._view.percentWidth = 100;
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(194 /* Shilian */);
                };
                XiantaSceneMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.icon, TouchEvent.TOUCH_TAP, this.onClickIcon);
                    this.onNt("on_xianta_info_update" /* ON_XIANTA_INFO_UPDATE */, this.updateShow, this);
                    this.onNt("fuben_continue_battle" /* FUBEN_CONTINUE_BATTLE */, this.updateTips, this);
                };
                XiantaSceneMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.updateTips();
                };
                XiantaSceneMdr.prototype.onHide = function () {
                    this._lastLv = 0;
                    _super.prototype.onHide.call(this);
                };
                XiantaSceneMdr.prototype.onClickIcon = function () {
                    if (this._canDraw) {
                        this._proxy.c2s_xiantower_get_rewards(this._proxy.selXiantaType);
                        return;
                    }
                    var data = this._view.icon.data;
                    mod.ViewMgr.getIns().showPropTips(data[0]);
                };
                XiantaSceneMdr.prototype.updateShow = function () {
                    //大奖
                    var selInfo = this._proxy.getXiantaInfo(this._proxy.selXiantaType);
                    var passLv = selInfo && selInfo.layer ? selInfo.layer : 0;
                    this._passLv = passLv;
                    var bigCfg = this._proxy.getXiantaBigRewardCfg(this._proxy.selXiantaType);
                    this._view.grp_reward.visible = !!bigCfg;
                    this._canDraw = false;
                    if (this._view.grp_reward.visible) {
                        var reward = bigCfg.big_reward[0];
                        this._view.icon.setData(reward, 3 /* NotTips */);
                        var needLv = bigCfg.lvl;
                        this._canDraw = passLv >= needLv;
                        this._view.icon.setHint(this._canDraw);
                        this._view.bar.show(passLv, needLv, false, 0, false);
                        this._view.lab_name.text = game.StringUtil.substitute(game.getLanById("xianta_tips" /* xianta_tips */), [bigCfg.lvl]);
                    }
                };
                XiantaSceneMdr.prototype.updateTips = function () {
                    var curLv = this._passLv + 1;
                    if (this._lastLv != curLv) {
                        mod.ViewMgr.getIns().showChallengeTips(curLv);
                        this._lastLv = this._passLv;
                    }
                };
                return XiantaSceneMdr;
            }(game.MdrBase));
            shilian.XiantaSceneMdr = XiantaSceneMdr;
            __reflect(XiantaSceneMdr.prototype, "game.mod.shilian.XiantaSceneMdr");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var Handler = base.Handler;
            var TimeMgr = base.TimeMgr;
            var YuanLingMdr = /** @class */ (function (_super) {
                __extends(YuanLingMdr, _super);
                function YuanLingMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", shilian.YuanLingView);
                    _this._stateType = 1; //皮肤类型，1：主界面，2：组队界面
                    _this._type = 1; //困难度
                    _this._enterCd = 30; //组队进入场景倒计时
                    _this._enterTime = 0; //进入时间戳
                    return _this;
                }
                YuanLingMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(197 /* YuanlingFuben */);
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._listReward = new eui.ArrayCollection();
                    this._view.list_team.itemRenderer = shilian.YuanLingTeammateItem;
                    this._view.list_team.dataProvider = this._listTeam = new eui.ArrayCollection();
                    this._view.list_type.itemRenderer = mod.TabSecondItem;
                    this._view.list_type.dataProvider = this._listBtn = new eui.ArrayCollection();
                    this._view.btn_go.setBlue();
                    this._view.btn_quit.setBlue();
                    this._view.addComp.setYellow();
                };
                YuanLingMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_achievement, egret.TouchEvent.TOUCH_TAP, this.onClickAchieve, this);
                    addEventListener(this._view.btn_team, egret.TouchEvent.TOUCH_TAP, this.onClickTeam, this);
                    addEventListener(this._view.btn_go, egret.TouchEvent.TOUCH_TAP, this.onClickBattle, this);
                    addEventListener(this._view.btn_room, egret.TouchEvent.TOUCH_TAP, this.onClickCreateTeam, this);
                    addEventListener(this._view.playerComp, egret.TouchEvent.TOUCH_TAP, this.onClickTopPlayer, this);
                    addEventListener(this._view.addComp.btn_add, egret.TouchEvent.TOUCH_TAP, this.onClickAddCnt, this);
                    addEventListener(this._view.btn_quit, egret.TouchEvent.TOUCH_TAP, this.onClickEquip, this);
                    addEventListener(this._view.btn_start, egret.TouchEvent.TOUCH_TAP, this.onClickTeamBattle, this);
                    addEventListener(this._view.btn_chat, egret.TouchEvent.TOUCH_TAP, this.onClickChat, this);
                    addEventListener(this._view.list_type, eui.ItemTapEvent.ITEM_TAP, this.onClickType, this);
                    this.onNt("on_yuanling_jump_to_view" /* ON_YUANLING_JUMP_TO_VIEW */, this.onJumpToView, this);
                    this.onNt("on_yuanling_team_info_update" /* ON_YUANLING_TEAM_INFO_UPDATE */, this.onTeamInfoUpdate, this);
                    this.onNt("on_yuanling_info_update" /* ON_YUANLING_INFO_UPDATE */, this.updateView, this);
                };
                YuanLingMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._type = this._proxy.getCurDiff(); //从副本结算返回到对应的难度
                    this.switchState(this._proxy.getCurState());
                    this._proxy.inviteParam = []; //从被邀请界面进来后，需要清除参数
                    this.updateBtnHint();
                };
                YuanLingMdr.prototype.updateTypeList = function () {
                    var diff = this._proxy.model.diff + 1; //下一难度
                    var list = [];
                    for (var i = 1; i <= 4; i++) {
                        list.push({
                            icon: 'yuanling_second_tab' + i,
                            nameIcon: 'yuanling_tabname' + i,
                            gray: i > diff,
                            showHint: this._proxy.getAllHint() && i <= diff
                        });
                    }
                    this._listBtn.replaceAll(list);
                    this._view.list_type.selectedIndex = this._type - 1;
                };
                YuanLingMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this.sendExitTeam();
                    TimeMgr.removeUpdateItem(this);
                };
                // 创建队伍返回，打开创建队伍界面
                YuanLingMdr.prototype.onTeamInfoUpdate = function (n) {
                    var state = n.body;
                    this.switchState(state[1]);
                };
                YuanLingMdr.prototype.onJumpToView = function (n) {
                    var state = n.body;
                    this.switchState(state);
                };
                YuanLingMdr.prototype.switchState = function (state) {
                    if (state === void 0) { state = 1; }
                    this._stateType = state;
                    this.updateView();
                };
                YuanLingMdr.prototype.updateView = function () {
                    this.updateTopPlayer();
                    this.updateTypeList();
                    this.updateAddComp();
                    if (this._stateType == 1) {
                        this.updateMainView();
                    }
                    else {
                        this.updateTeamView();
                    }
                };
                YuanLingMdr.prototype.updateMainView = function () {
                    this._view.currentState = 'main';
                    var cfg = this._proxy.getConfig(this._type);
                    if (!cfg) {
                        return;
                    }
                    this._listReward.replaceAll(cfg.show_reward.concat());
                };
                YuanLingMdr.prototype.updateTeamView = function () {
                    this._view.currentState = 'team';
                    var model = this._proxy.model;
                    var teamCnt = this._proxy.getTeamCount();
                    var list = [];
                    for (var _i = 0, _a = model.own_team_infos; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item && item.leader) {
                            list.unshift(item);
                        }
                        else {
                            list.push(item);
                        }
                    }
                    for (var i = list.length; i < teamCnt; i++) {
                        list.push(null);
                    }
                    this._listTeam.replaceAll(list);
                    if (model.own_team_infos.length == teamCnt) {
                        TimeMgr.addUpdateItem(this, 1000);
                        this._view.lb_enterTime.text = game.StringUtil.substitute(game.getLanById("yuanling_tips6" /* yuanling_tips6 */), [this._enterCd]);
                        this._view.lb_enterTime.visible = true;
                        this._enterTime = TimeMgr.time.serverTimeSecond + this._enterCd;
                    }
                    else {
                        TimeMgr.removeUpdateItem(this);
                        this._view.lb_enterTime.visible = false;
                    }
                };
                YuanLingMdr.prototype.getEarnCnt = function () {
                    var model = this._proxy.model;
                    var cfgCnt = this._proxy.getCount(); //每日收益次数
                    var usedCnt = model.count; //已使用收益次数
                    var boughtCnt = model.buy; //已经购买次数
                    return cfgCnt + boughtCnt - usedCnt;
                };
                YuanLingMdr.prototype.updateAddComp = function () {
                    var cnt = this.getEarnCnt();
                    if (this._stateType == 2) {
                        this._view.checkbox.visible = cnt > 0;
                        this._view.checkbox.selected = cnt > 0;
                    }
                    this._view.addComp.updateShow(game.TextUtil.addColor(cnt + "/" + this._proxy.getCount(), cnt > 0 ? 8585074 /* GREEN */ : 16731212 /* RED */));
                };
                //首杀玩家信息
                YuanLingMdr.prototype.updateTopPlayer = function () {
                    var info = this._proxy.model.info[this._type];
                    var topPlayer = info && info.info ? info.info[0] : null;
                    this._view.playerComp.updatePlayerInfo(topPlayer);
                };
                YuanLingMdr.prototype.onClickAchieve = function () {
                    mod.ViewMgr.getIns().openGiftView(1 /* Yuanling */);
                };
                YuanLingMdr.prototype.onClickTeam = function () {
                    if (this._proxy.model.own_team_id) {
                        game.PromptBox.getIns().show(game.getLanById("yuanling_tips7" /* yuanling_tips7 */));
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("49" /* Shilian */, "09" /* YuanLingTeam */, this._type);
                };
                // 单人挑战
                YuanLingMdr.prototype.onClickBattle = function () {
                    this._proxy.c2s_yuanling_enter(this._type);
                };
                // 组队挑战
                YuanLingMdr.prototype.onClickCreateTeam = function () {
                    this._proxy.c2s_yuanling_create_team(this._type);
                };
                YuanLingMdr.prototype.onClickAddCnt = function () {
                    var cfgBuyCnt = this._proxy.getMaxBuy(); //购买次数上限
                    var boughtCnt = this._proxy.model.buy; //已经购买次数
                    if (boughtCnt >= cfgBuyCnt) {
                        game.PromptBox.getIns().show(game.getLanById("yuanling_tips8" /* yuanling_tips8 */));
                        return;
                    }
                    var cost = this._proxy.getCost();
                    var txt = '';
                    for (var i = 0; i < cost.length; i++) {
                        var cfg = game.GameConfig.getPropConfigById(cost[i][0]);
                        if (!cfg) {
                            continue;
                        }
                        txt += (cost[i][1] + cfg.name) + (i == cost.length - 1 ? '' : '、');
                    }
                    txt = game.StringUtil.substitute(game.getLanById("yuanling_tips9" /* yuanling_tips9 */), [txt]);
                    mod.ViewMgr.getIns().showConfirm(txt, Handler.alloc(this, this.onBuyCount));
                };
                // 购买收益次数
                YuanLingMdr.prototype.onBuyCount = function () {
                    var cost = this._proxy.getCost() || [];
                    for (var _i = 0, cost_1 = cost; _i < cost_1.length; _i++) {
                        var item = cost_1[_i];
                        if (!mod.BagUtil.checkPropCnt(item[0], item[1], 1 /* Dialog */)) {
                            return;
                        }
                    }
                    this._proxy.c2s_yuanling_buyCount();
                };
                //退出队伍
                YuanLingMdr.prototype.onClickEquip = function () {
                    this._proxy.c2s_yuanling_exit_team();
                };
                // 组队挑战 确定是否勾选收益次数，判断人数足够，然后再挑战
                YuanLingMdr.prototype.onClickTeamBattle = function () {
                    if (!this._proxy.isMineLeader()) {
                        game.PromptBox.getIns().show(game.getLanById("yuanling_tips10" /* yuanling_tips10 */));
                        return;
                    }
                    var team_infos = this._proxy.model.own_team_infos || [];
                    if (team_infos.length >= this._proxy.getTeamCount()) {
                        this.gotoBattle();
                    }
                    else {
                        mod.ViewMgr.getIns().showConfirm(game.getLanById("yuanling_tips11" /* yuanling_tips11 */), Handler.alloc(this, this.gotoBattle));
                    }
                };
                YuanLingMdr.prototype.gotoBattle = function () {
                    var isCheck = this._view.checkbox.selected;
                    this._proxy.c2s_yuanling_check(isCheck ? 1 : 2);
                    this.onClickBattle();
                };
                YuanLingMdr.prototype.onClickType = function (e) {
                    var index = e.itemIndex + 1;
                    if (index == this._type) {
                        return;
                    }
                    if (index > this._proxy.model.diff + 1) {
                        game.PromptBox.getIns().show(game.getLanById("yuanling_tips12" /* yuanling_tips12 */));
                        this._view.list_type.selectedIndex = this._type - 1;
                        return;
                    }
                    this.sendExitTeam();
                    this._proxy.curDiffType = this._type = index;
                    this.switchState();
                };
                // 进入副本情况下关闭界面，不能退出队伍。非队长玩家，被动进入场景时不退出
                YuanLingMdr.prototype.sendExitTeam = function () {
                    if (this._stateType == 2 && mod.SceneUtil.getCurSceneType() != 111 /* Yuanling */) {
                        this._proxy.c2s_yuanling_exit_team();
                    }
                };
                YuanLingMdr.prototype.update = function (time) {
                    var leftTime = this._enterTime - time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this._proxy.c2s_yuanling_enter(this._type);
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    this._view.lb_enterTime.text = game.StringUtil.substitute(game.getLanById("yuanling_tips6" /* yuanling_tips6 */), [leftTime]);
                };
                // todo
                YuanLingMdr.prototype.onClickChat = function () {
                    if (mod.RoleUtil.getGuildId()) {
                        mod.ViewMgr.getIns().showView("25" /* Chat */, "01" /* ChatMain */, "04" /* Union */);
                    }
                    else {
                        mod.ViewMgr.getIns().showView("25" /* Chat */, "01" /* ChatMain */);
                    }
                };
                // todo
                YuanLingMdr.prototype.onClickTopPlayer = function () {
                    var info = this._proxy.model.info[this._type];
                    var topPlayer = info && info.info ? info.info[0] : null;
                    if (!topPlayer) {
                        return;
                    }
                    mod.ViewMgr.getIns().showRoleTips(topPlayer.role_id, topPlayer.server_id);
                };
                YuanLingMdr.prototype.updateBtnHint = function () {
                    this._view.btn_achievement.setHint(this._proxy.getGiftHint());
                };
                return YuanLingMdr;
            }(game.MdrBase));
            shilian.YuanLingMdr = YuanLingMdr;
            __reflect(YuanLingMdr.prototype, "game.mod.shilian.YuanLingMdr", ["base.UpdateItem"]);
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var TimeMgr = base.TimeMgr;
            var facade = base.facade;
            var YuanLingResultMdr = /** @class */ (function (_super) {
                __extends(YuanLingResultMdr, _super);
                function YuanLingResultMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shilian.YuanLingResultView);
                    _this._endTime = 0;
                    _this.isEasyHide = true;
                    return _this;
                }
                YuanLingResultMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(197 /* YuanlingFuben */);
                    this._view.list.itemRenderer = shilian.YuanLingResultItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                YuanLingResultMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_yuanling_damage_info_update" /* ON_YUANLING_DAMAGE_INFO_UPDATE */, this.onUpdateList, this);
                };
                YuanLingResultMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var msg = this._showArgs;
                    if (!msg) {
                        return;
                    }
                    var param = msg.params;
                    this._view.lb_layer.text = param[1] + '';
                    var time = param[2];
                    var mins = Math.floor(time / 60);
                    var seconds = time % 60;
                    this._view.lb_time.text = (mins < 10 ? '0' + mins : mins) + "\u5206" + (seconds < 10 ? '0' + seconds : seconds) + "\u79D2";
                    this._endTime = TimeMgr.time.serverTimeSecond + 10;
                    TimeMgr.addUpdateItem(this, 1000);
                    this._view.lb_cd.text = game.StringUtil.substitute(game.getLanById("close_countdown" /* close_countdown */), [10]);
                    this.onUpdateList();
                };
                YuanLingResultMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    // 打开翻牌界面 判断是否使用收益次数。使用则不需要打开这个界面
                    var isUse = this._showArgs && this._showArgs.params && this._showArgs.params[3] || 0;
                    if (isUse != 1) {
                        mod.SceneUtil.exitScene();
                        return;
                    }
                    facade.showView("49" /* Shilian */, "14" /* YuanLingReward */, this._showArgs);
                };
                YuanLingResultMdr.prototype.update = function (time) {
                    var leftTime = this._endTime - time.serverTimeSecond;
                    if (leftTime <= 0) {
                        TimeMgr.removeUpdateItem(this);
                        this.hide();
                        return;
                    }
                    this._view.lb_cd.text = game.StringUtil.substitute(game.getLanById("close_countdown" /* close_countdown */), [leftTime]);
                };
                YuanLingResultMdr.prototype.onUpdateList = function () {
                    this._listData.replaceAll(this._proxy.model.damage_info);
                };
                return YuanLingResultMdr;
            }(game.MdrBase));
            shilian.YuanLingResultMdr = YuanLingResultMdr;
            __reflect(YuanLingResultMdr.prototype, "game.mod.shilian.YuanLingResultMdr", ["base.UpdateItem"]);
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var TimeMgr = base.TimeMgr;
            var YuanLingRewardMdr = /** @class */ (function (_super) {
                __extends(YuanLingRewardMdr, _super);
                function YuanLingRewardMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shilian.YuanLingRewardView);
                    _this._endTime = 0;
                    _this._isSecondClick = false; //第二次点击关闭倒计时
                    _this._reward = {}; //每行对应的奖励
                    _this._rowAry = ['紫', '橙', '红'];
                    _this.isEasyHide = true;
                    return _this;
                }
                YuanLingRewardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(197 /* YuanlingFuben */);
                    this._view.list.itemRenderer = shilian.YuanLingRewardItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                YuanLingRewardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                };
                YuanLingRewardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var msg = this._showArgs;
                    if (!msg) {
                        return;
                    }
                    var reward = msg.reward || [];
                    for (var i = 0; i < 3; i++) {
                        this._reward[i] = reward.slice(i * 4, (i + 1) * 4);
                    }
                    this._view.lb_cnt.text = (reward.length || 0) + '';
                    var ary = ['', 'C', 'B', 'A', 'S', 'SS', 'SSS']; //对应的评分
                    this.addBmpFont(ary[msg.params[0] || 0], game.BmpTextCfg[208 /* Score */], this._view.gr_eft, true, 1, true);
                    this._view.lb_cd.text = game.StringUtil.substitute(game.getLanById("yuanling_tips13" /* yuanling_tips13 */), [10]);
                    this._endTime = TimeMgr.time.serverTimeSecond + 10;
                    TimeMgr.addUpdateItem(this, 1000);
                    var source = [];
                    source.length = 12;
                    this._listData.replaceAll(source);
                };
                YuanLingRewardMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    mod.SceneUtil.exitScene();
                };
                // 第一次点击是自动翻牌，第二次点击才是关闭
                YuanLingRewardMdr.prototype.doHide = function (disposeImmediately) {
                    if (!this._isSecondClick) {
                        this.autoOpenReward();
                        return;
                    }
                    _super.prototype.doHide.call(this, disposeImmediately);
                };
                YuanLingRewardMdr.prototype.onClickList = function (e) {
                    //已翻牌
                    if (e.item) {
                        return;
                    }
                    var idx = e.itemIndex;
                    var row = Math.floor(idx / 4);
                    var reward = this._reward[row].pop();
                    if (!reward) {
                        var str = game.StringUtil.substitute(game.getLanById("yuanling_tips14" /* yuanling_tips14 */), [row * 4 + 1 + "-" + (row + 1) * 4, this._rowAry[row]]);
                        game.PromptBox.getIns().show(str);
                        return;
                    }
                    this._listData.replaceItemAt(reward, idx);
                };
                YuanLingRewardMdr.prototype.update = function (time) {
                    var leftTime = this._endTime - time.serverTimeSecond;
                    if (!this._isSecondClick) {
                        if (leftTime <= 0) {
                            this.autoOpenReward();
                            this._isSecondClick = true;
                            this._view.lb_cd.text = game.getLanById("click_tips" /* click_tips */) + ("(" + 10 + ")");
                            this._endTime = time.serverTimeSecond + 10;
                            return;
                        }
                        this._view.lb_cd.text = game.StringUtil.substitute(game.getLanById("yuanling_tips13" /* yuanling_tips13 */), [leftTime]);
                    }
                    else {
                        if (leftTime <= 0) {
                            TimeMgr.removeUpdateItem(this);
                            this.hide();
                            return;
                        }
                        this._view.lb_cd.text = game.getLanById("click_tips" /* click_tips */) + ("(" + leftTime + ")");
                    }
                };
                // 自动翻牌
                YuanLingRewardMdr.prototype.autoOpenReward = function () {
                    for (var i = 0; i < 12; i++) {
                        var data = this._listData.source[i];
                        //已翻牌
                        if (data) {
                            continue;
                        }
                        var row = Math.floor(i / 4);
                        var reward = this._reward[row].pop();
                        reward && this._listData.replaceItemAt(reward, i);
                    }
                    this._isSecondClick = true;
                };
                return YuanLingRewardMdr;
            }(game.EffectMdrBase));
            shilian.YuanLingRewardMdr = YuanLingRewardMdr;
            __reflect(YuanLingRewardMdr.prototype, "game.mod.shilian.YuanLingRewardMdr", ["base.UpdateItem"]);
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var YuanLingSceneDiedMdr = /** @class */ (function (_super) {
                __extends(YuanLingSceneDiedMdr, _super);
                function YuanLingSceneDiedMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", shilian.YuanLingSceneDiedView);
                    return _this;
                }
                YuanLingSceneDiedMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                };
                YuanLingSceneDiedMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_role_relive" /* ON_ROLE_RELIVE */, this.hide, this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                };
                YuanLingSceneDiedMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    game.Layer.main.setChildIndex(this._view, 0);
                };
                YuanLingSceneDiedMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return YuanLingSceneDiedMdr;
            }(game.MdrBase));
            shilian.YuanLingSceneDiedMdr = YuanLingSceneDiedMdr;
            __reflect(YuanLingSceneDiedMdr.prototype, "game.mod.shilian.YuanLingSceneDiedMdr");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var Handler = base.Handler;
            var TimeMgr = base.TimeMgr;
            var YuanLingSceneMdr = /** @class */ (function (_super) {
                __extends(YuanLingSceneMdr, _super);
                function YuanLingSceneMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", shilian.YuanLingSceneView);
                    _this._buffCost = {};
                    _this._endTime = 0;
                    return _this;
                }
                YuanLingSceneMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.percentHeight = 100;
                    this._view.percentWidth = 100;
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(197 /* YuanlingFuben */);
                    this._view.list_player.itemRenderer = shilian.YuanLingSceneHeadVipItem;
                    this._view.list_player.dataProvider = this._listPlayer = new eui.ArrayCollection();
                    this._view.list_buff.itemRenderer = shilian.YuanLingBuffItem;
                    this._view.list_buff.dataProvider = this._listBuff = new eui.ArrayCollection();
                };
                YuanLingSceneMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_buff, eui.ItemTapEvent.ITEM_TAP, this.onClickBuffList, this);
                    this.onNt("on_yuanling_fuben_info_update" /* ON_YUANLING_FUBEN_INFO_UPDATE */, this.updateView, this);
                };
                YuanLingSceneMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    // this.updateView();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                YuanLingSceneMdr.prototype.updateView = function () {
                    this._cfg = this._proxy.getConfig(this._proxy.model.scene_index);
                    if (!this._cfg) {
                        return;
                    }
                    this.updateLvInfo();
                    this.updateBuff();
                    this.updatePlayer();
                };
                YuanLingSceneMdr.prototype.updateLvInfo = function () {
                    var layer_score = this._cfg.layer_score;
                    var curLayer = this._proxy.model.scene_layer;
                    var layerStr = ['C', 'B', 'A', 'S'];
                    var _curIdx = 0;
                    for (var i = 0; i < layer_score.length; i++) {
                        var item = layer_score[i];
                        if ((item && item[0] <= curLayer && curLayer <= item[1]) || !curLayer) {
                            _curIdx = i;
                            break;
                        }
                    }
                    this.addBmpFont(layerStr[_curIdx], game.BmpTextCfg[208 /* Score */], this._view.gr_eft, true, 0.7, true);
                    var _next = layerStr[_curIdx + 1] || layerStr[layerStr.length - 1];
                    var str = game.StringUtil.substitute(game.getLanById("yuanling_tips15" /* yuanling_tips15 */), [game.TextUtil.addColor(_next, 8585074 /* GREEN */)]);
                    this._view.lb_nextLv.textFlow = game.TextUtil.parseHtml(str);
                    var passStr;
                    if (_curIdx == layer_score.length - 1) {
                        passStr = curLayer + '';
                    }
                    else {
                        passStr = curLayer + '/' + layer_score[_curIdx][1];
                    }
                    var str1 = game.StringUtil.substitute(game.getLanById("yuanling_tips16" /* yuanling_tips16 */), [game.TextUtil.addColor(passStr, 8585074 /* GREEN */)]);
                    this._view.lb_pass.textFlow = game.TextUtil.parseHtml(str1);
                };
                YuanLingSceneMdr.prototype.updateBuff = function () {
                    var list = [];
                    var buff_info = this._cfg.buff_info;
                    for (var i = 0; i < buff_info.length; i++) {
                        var item = buff_info[i];
                        var cfg = game.getConfigByNameId("effect.json" /* Effect */, item[0]);
                        list.push({
                            index: item[0],
                            duraTime: cfg && cfg.life_time || 0,
                            cd: item[3] || 0
                        });
                    }
                    this._listBuff.replaceAll(list);
                };
                YuanLingSceneMdr.prototype.updatePlayer = function () {
                    var proxy = game.getProxy("03" /* Scene */, 2 /* Scene */);
                    this._listPlayer.replaceAll(proxy.getVosByType(1 /* PLAYER */));
                };
                YuanLingSceneMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._buffCost = {};
                };
                YuanLingSceneMdr.prototype.onClickBuffList = function (e) {
                    var item = e.item;
                    if (!item) {
                        return;
                    }
                    var boughtTime = this._proxy.model.buff_info[e.itemIndex + 1] || 0;
                    var endTime = boughtTime + item.duraTime + item.cd;
                    var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, item.index);
                    if (!buffCfg || leftTime > 0) {
                        if (leftTime > 0) {
                            game.PromptBox.getIns().show(game.getLanById("yuanling_tips17" /* yuanling_tips17 */));
                        }
                        return;
                    }
                    var cost = this.getBuffCost(item.index);
                    var propCfg = game.GameConfig.getPropConfigById(cost[0]);
                    if (!propCfg) {
                        return;
                    }
                    var lanAry = ["yuanling_tips19" /* yuanling_tips19 */, "yuanling_tips20" /* yuanling_tips20 */, "yuanling_tips21" /* yuanling_tips21 */];
                    var txt = game.getLanById(lanAry[e.itemIndex]);
                    // // 使用%s\n%s秒内%s\n消耗%s
                    // let txt = StringUtil.substitute(getLanById(LanDef.yuanling_tips18),
                    //     [TextUtil.addColor(buffCfg.name, BlackColor.RED), cost[2], buffCfg.des, TextUtil.addColor(cost[1] + propCfg.name, WhiteColor.GREEN)]);
                    mod.ViewMgr.getIns().showConfirm(txt, Handler.alloc(this, this.sendBuyBuff, [e.itemIndex + 1]), null, true);
                };
                YuanLingSceneMdr.prototype.sendBuyBuff = function (idx) {
                    this._proxy.c2s_yuanling_buyBuff(idx);
                };
                YuanLingSceneMdr.prototype.getBuffCost = function (idx) {
                    if (this._buffCost && this._buffCost[idx]) {
                        return this._buffCost[idx];
                    }
                    this._buffCost = {};
                    var buff_info = this._cfg.buff_info;
                    for (var i = 0; i < buff_info.length; i++) {
                        var item = buff_info[i];
                        this._buffCost[item[0]] = [item[1], item[2], item[3]];
                    }
                    return this._buffCost[idx];
                };
                YuanLingSceneMdr.prototype.update = function (time) {
                    if (!this._cfg) {
                        this._endTime = 0;
                        return;
                    }
                    if (!this._endTime) {
                        this._endTime = time.serverTimeSecond + this._cfg.time;
                    }
                    var leftTime = this._endTime - time.serverTimeSecond;
                    if (leftTime <= 0) {
                        TimeMgr.removeUpdateItem(this);
                        this._endTime = 0;
                        return;
                    }
                    var mins = Math.floor(leftTime / 60);
                    var minsStr = mins < 10 ? "0" + mins : mins;
                    var seconds = leftTime % 60;
                    var secondsStr = seconds < 10 ? "0" + seconds : seconds;
                    this._view.lb_time.text = minsStr + ":" + secondsStr;
                };
                return YuanLingSceneMdr;
            }(game.EffectMdrBase));
            shilian.YuanLingSceneMdr = YuanLingSceneMdr;
            __reflect(YuanLingSceneMdr.prototype, "game.mod.shilian.YuanLingSceneMdr", ["base.UpdateItem"]);
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            var TouchEvent = egret.TouchEvent;
            /**元灵组队邀请*/
            var YuanLingTeamInviteMdr = /** @class */ (function (_super) {
                __extends(YuanLingTeamInviteMdr, _super);
                function YuanLingTeamInviteMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shilian.YuanLingTeamInviteView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YuanLingTeamInviteMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(197 /* YuanlingFuben */);
                    this._view.list.itemRenderer = shilian.YuanLingTeamInviteItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                YuanLingTeamInviteMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn_kuafu, egret.TouchEvent.TOUCH_TAP, this.onClickKuafu, this);
                    addEventListener(this._view.btn_zongmen, egret.TouchEvent.TOUCH_TAP, this.onClickZongmen, this);
                    this.onNt("on_yuanling_role_list_update" /* ON_YUANLING_ROLE_LIST_UPDATE */, this.updateView, this);
                };
                YuanLingTeamInviteMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.c2s_yuanling_role_list(this._proxy.curDiffType);
                };
                YuanLingTeamInviteMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YuanLingTeamInviteMdr.prototype.updateView = function () {
                    this._listData.replaceAll(this._proxy.model.invite_list);
                };
                YuanLingTeamInviteMdr.prototype.onClickKuafu = function () {
                    this._proxy.c2s_yuanling_room_invita(1 /* Cross */);
                };
                YuanLingTeamInviteMdr.prototype.onClickZongmen = function () {
                    this._proxy.c2s_yuanling_room_invita(4 /* Union */);
                };
                return YuanLingTeamInviteMdr;
            }(game.MdrBase));
            shilian.YuanLingTeamInviteMdr = YuanLingTeamInviteMdr;
            __reflect(YuanLingTeamInviteMdr.prototype, "game.mod.shilian.YuanLingTeamInviteMdr");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            /**被邀请列表*/
            var YuanLingTeamListInvitedMdr = /** @class */ (function (_super) {
                __extends(YuanLingTeamListInvitedMdr, _super);
                function YuanLingTeamListInvitedMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shilian.YuanLingTeamListView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YuanLingTeamListInvitedMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(197 /* YuanlingFuben */);
                    this._view.list.itemRenderer = shilian.YuanLingTeamItem2;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                YuanLingTeamListInvitedMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_yuanling_team_invite" /* ON_YUANLING_TEAM_INVITE */, this.updateView, this);
                    this.onNt("on_yuanling_invite_list_item_delete" /* ON_YUANLING_INVITE_LIST_ITEM_DELETE */, this.onDeleteListItem, this);
                    this.onNt("on_yuanling_team_info_update" /* ON_YUANLING_TEAM_INFO_UPDATE */, this.onUpdateJoinTeam, this);
                };
                YuanLingTeamListInvitedMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    //避免打开界面时候，队伍信息都移除了，导致界面数据为null
                    var list = this._proxy.getInvitedTeamList();
                    if (!list || !list.length) {
                        this.hide();
                        return;
                    }
                    this._view.currentState = 'invite';
                    this._view.secondPop.updateTitleStr(game.getLanById("yuanling_tips3" /* yuanling_tips3 */));
                    this.updateView();
                };
                YuanLingTeamListInvitedMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    //处理下主界面邀请按钮，移除队伍信息无队伍后，隐藏主界面按钮
                    this.sendNt("on_yuanling_team_invite_btn" /* ON_YUANLING_TEAM_INVITE_BTN */);
                };
                YuanLingTeamListInvitedMdr.prototype.updateView = function () {
                    var list = this._proxy.getInvitedTeamList();
                    this._listData.replaceAll(list);
                };
                // 移除 _listData 数据项
                YuanLingTeamListInvitedMdr.prototype.onDeleteListItem = function (n) {
                    var data = n.body;
                    if (!data) {
                        return;
                    }
                    var size = this._listData.source.length;
                    for (var i = 0; i < size; i++) {
                        var item = this._listData.source[i];
                        if (item == data) {
                            this._listData.removeItemAt(i);
                            break;
                        }
                    }
                    this._proxy.clearInvitedTeam(data.team_id);
                };
                YuanLingTeamListInvitedMdr.prototype.onUpdateJoinTeam = function (n) {
                    var state = n.body;
                    this._proxy.inviteParam = state;
                    mod.ViewMgr.getIns().showView("49" /* Shilian */, "01" /* ShilianMain */, "04" /* YuanLing */);
                };
                return YuanLingTeamListInvitedMdr;
            }(game.MdrBase));
            shilian.YuanLingTeamListInvitedMdr = YuanLingTeamListInvitedMdr;
            __reflect(YuanLingTeamListInvitedMdr.prototype, "game.mod.shilian.YuanLingTeamListInvitedMdr");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shilian;
        (function (shilian) {
            /**元灵队伍列表*/
            var YuanLingTeamListMdr = /** @class */ (function (_super) {
                __extends(YuanLingTeamListMdr, _super);
                function YuanLingTeamListMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shilian.YuanLingTeamListView);
                    _this._index = 1; //难度
                    _this.isEasyHide = true;
                    return _this;
                }
                YuanLingTeamListMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(197 /* YuanlingFuben */);
                    this._view.list.itemRenderer = shilian.YuanLingTeamItem;
                    this._view.list.dataProvider = this._listTeam = new eui.ArrayCollection();
                };
                YuanLingTeamListMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_create, egret.TouchEvent.TOUCH_TAP, this.onClickCreate, this);
                    this.onNt("on_yuanling_team_list_update" /* ON_YUANLING_TEAM_LIST_UPDATE */, this.updateView, this);
                    this.onNt("on_yuanling_team_info_update" /* ON_YUANLING_TEAM_INFO_UPDATE */, this.onUpdateJoinTeam, this);
                };
                YuanLingTeamListMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._index = this._showArgs;
                    this._view.secondPop.updateTitleStr(game.getLanById("yuanling_tips4" /* yuanling_tips4 */));
                    this._proxy.c2s_yuanling_team_list(this._index);
                };
                YuanLingTeamListMdr.prototype.updateView = function () {
                    var list = this._proxy.model.team_list;
                    if (!list || !list.length) {
                        this._view.currentState = 'noteam';
                        return;
                    }
                    this._view.currentState = 'team';
                    this._listTeam.replaceAll(list);
                };
                YuanLingTeamListMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                // 创建队伍
                YuanLingTeamListMdr.prototype.onClickCreate = function () {
                    this._proxy.c2s_yuanling_create_team(this._index);
                };
                // 收到队伍信息，关闭这个界面，跳到创建队伍界面，抛出事件带有参数2，2表示皮肤创建队伍界面
                YuanLingTeamListMdr.prototype.onUpdateJoinTeam = function () {
                    this.sendNt("on_yuanling_jump_to_view" /* ON_YUANLING_JUMP_TO_VIEW */, 2);
                    this.hide();
                };
                return YuanLingTeamListMdr;
            }(game.MdrBase));
            shilian.YuanLingTeamListMdr = YuanLingTeamListMdr;
            __reflect(YuanLingTeamListMdr.prototype, "game.mod.shilian.YuanLingTeamListMdr");
        })(shilian = mod.shilian || (mod.shilian = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=shilian.js.map