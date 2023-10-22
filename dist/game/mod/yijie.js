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
        var yijie;
        (function (yijie) {
            var YijieView = /** @class */ (function (_super) {
                __extends(YijieView, _super);
                function YijieView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.YijieSkin";
                    return _this;
                }
                return YijieView;
            }(eui.Component));
            yijie.YijieView = YijieView;
            __reflect(YijieView.prototype, "game.mod.yijie.YijieView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var YijieMod = /** @class */ (function (_super) {
                __extends(YijieMod, _super);
                function YijieMod() {
                    return _super.call(this, "56" /* Yijie */) || this;
                }
                YijieMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                YijieMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(220 /* Yijie */, yijie.YijieProxy);
                    this.regProxy(262 /* Sea */, yijie.SeaProxy);
                };
                YijieMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* YijieMain */, yijie.YijieMainMdr);
                    this.regMdr("02" /* YijieScene */, yijie.YijieSceneMdr);
                    this.regMdr("03" /* YijieBoss */, yijie.YijieBossMdr);
                    this.regMdr("04" /* YijieLucky */, yijie.YijieLuckyMdr);
                    this.regMdr("05" /* YijieResult */, yijie.YijieResultMdr);
                    this.regMdr("07" /* YijieResult2 */, yijie.YijieResultMdr); //结算界面用同一个，需要支持弹两次
                    this.regMdr("06" /* YijieBossList */, yijie.YijieBossListMdr); ///Boss列表*/
                    this.regMdr("10" /* YonghengYijieScene */, yijie.YonghengYijieSceneMdr);
                    this.regMdr("11" /* YonghengYijieOpen */, yijie.YonghengYijieOpenMdr);
                    this.regMdr("20" /* SeaMain */, yijie.SeaMainMdr);
                    this.regMdr("21" /* SeaTask */, yijie.SeaTaskMdr);
                    this.regMdr("23" /* SeaFubenMain */, yijie.SeaFubenMainMdr);
                    this.regMdr("24" /* SeaScene */, yijie.SeaSceneMdr);
                    this.regMdr("22" /* SeaReward */, yijie.SeaRewardMdr);
                    this.regMdr("25" /* SeaBossMain */, yijie.SeaBossMainMdr);
                    this.regMdr("26" /* SeaRankMain */, yijie.SeaRankMainMdr);
                    this.regMdr("27" /* SeaRankSection */, yijie.SeaRankSectionMdr);
                };
                return YijieMod;
            }(game.ModBase));
            yijie.YijieMod = YijieMod;
            __reflect(YijieMod.prototype, "game.mod.yijie.YijieMod");
            gso.modCls.push(YijieMod);
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var c2s_huanjingzhihai_click = msg.c2s_huanjingzhihai_click;
            var s2c_huanjingzhihai_info = msg.s2c_huanjingzhihai_info;
            var TimeMgr = base.TimeMgr;
            var s2c_huanjingzhihai_single_rank_info = msg.s2c_huanjingzhihai_single_rank_info;
            var SeaProxy = /** @class */ (function (_super) {
                __extends(SeaProxy, _super);
                function SeaProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SeaProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new yijie.SeaModel();
                    this.onProto(s2c_huanjingzhihai_info, this.s2c_huanjingzhihai_info, this);
                    this.onProto(s2c_huanjingzhihai_single_rank_info, this.s2c_huanjingzhihai_single_rank_info, this);
                };
                SeaProxy.prototype.c2s_huanjingzhihai_click = function (opType, index) {
                    var msg = new c2s_huanjingzhihai_click();
                    msg.button_type = opType;
                    msg.index = index;
                    this.sendProto(msg);
                };
                SeaProxy.prototype.s2c_huanjingzhihai_info = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.datas) {
                        return;
                    }
                    var openSea = []; //已开启的区域
                    for (var _i = 0, _a = msg.datas; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info && !!info.is_open) {
                            openSea.push(info.index);
                        }
                        var oldInfo = this.getInfo(info.index);
                        if (!oldInfo) {
                            this._model.infoList[info.index] = info;
                            continue;
                        }
                        //更新
                        for (var k in info) {
                            this._model.infoList[info.index][k] = info[k];
                        }
                    }
                    this.updateHint();
                    this.sendNt("on_sea_info_update" /* ON_SEA_INFO_UPDATE */, openSea);
                };
                SeaProxy.prototype.getInfo = function (type) {
                    return this._model.infoList[type] || null;
                };
                Object.defineProperty(SeaProxy.prototype, "type", {
                    get: function () {
                        return this._model.type;
                    },
                    set: function (type) {
                        this._model.type = type;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SeaProxy.prototype, "rankType", {
                    get: function () {
                        return this._model.rankType;
                    },
                    set: function (type) {
                        this._model.rankType = type;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SeaProxy.prototype, "bigGate", {
                    get: function () {
                        return this._model.bigGate;
                    },
                    set: function (bigGate) {
                        this._model.bigGate = bigGate;
                    },
                    enumerable: true,
                    configurable: true
                });
                SeaProxy.prototype.isEnter = function (type) {
                    var info = this.getInfo(type);
                    return info && !!info.is_open;
                };
                SeaProxy.prototype.getEnterCnt = function (type) {
                    var info = this.getInfo(type);
                    return info && info.count || 0;
                };
                //当前通关的大关id
                SeaProxy.prototype.getCurBigGate = function (type) {
                    var info = this.getInfo(type);
                    return info && info.big_gate || (type * 100 + 1); //默认101，201，301
                };
                //已通关的小关id
                SeaProxy.prototype.getPassSmallGate = function (type) {
                    var info = this.getInfo(type);
                    return info && info.small_gate || 0;
                };
                //每个大关卡已通关的小关id
                SeaProxy.prototype.getSmallGate = function (type, bigGate) {
                    var curBigGate = this.getCurBigGate(type);
                    if (bigGate == curBigGate) {
                        return this.getPassSmallGate(type);
                    }
                    else if (bigGate > curBigGate) {
                        return 0;
                    }
                    else {
                        return this.getMaxSmallGate(bigGate);
                    }
                };
                SeaProxy.prototype.getMaxSmallGate = function (bigGate) {
                    if (!this._model.maxSmallGate[bigGate]) {
                        var maxSmallGate = 0;
                        var cfgList = game.getConfigByNameId("huanjingzhihai_gate.json" /* HuanjingzhihaiGate */, bigGate);
                        for (var k in cfgList) {
                            var cfg = cfgList[k];
                            if (cfg.small_gate > maxSmallGate) {
                                maxSmallGate = cfg.small_gate;
                            }
                        }
                        this._model.maxSmallGate[bigGate] = maxSmallGate;
                    }
                    return this._model.maxSmallGate[bigGate];
                };
                SeaProxy.prototype.isOpen = function (type, bigGate) {
                    var lastBigGate = bigGate - 1;
                    var cfgList = game.getConfigByNameId("huanjingzhihai_gate.json" /* HuanjingzhihaiGate */, lastBigGate);
                    if (!cfgList) {
                        return true;
                    }
                    return this.isFinish(type, lastBigGate);
                };
                SeaProxy.prototype.isFinish = function (type, bigGate) {
                    var smallGate = this.getSmallGate(type, bigGate);
                    if (smallGate <= 0) {
                        return false;
                    }
                    var maxSmallGate = this.getMaxSmallGate(bigGate);
                    return smallGate >= maxSmallGate;
                };
                SeaProxy.prototype.getBigGateCfg = function (type, bigGate) {
                    var cfgInfos = game.getConfigByNameId("huanjingzhihai_type.json" /* HuanjingzhihaiType */, type);
                    var cfg = cfgInfos[bigGate];
                    return cfg;
                };
                SeaProxy.prototype.getSmallGateCfg = function (bigGate, smallGate) {
                    var cfgInfos = game.getConfigByNameId("huanjingzhihai_gate.json" /* HuanjingzhihaiGate */, bigGate);
                    var cfg = cfgInfos[smallGate];
                    return cfg;
                };
                SeaProxy.prototype.checkBigGateHint = function (type, bigGate) {
                    var isOpen = this.isOpen(type, bigGate);
                    if (!isOpen) {
                        return false;
                    }
                    var isFinish = this.isFinish(type, bigGate);
                    if (isFinish) {
                        return false;
                    }
                    var smallGate = this.getSmallGate(type, bigGate);
                    var curSmallGate = smallGate + 1; //当前挑战的关卡
                    var smallGateCfg = this.getSmallGateCfg(bigGate, curSmallGate);
                    var curPower = game.RoleVo.ins.showpower.toNumber();
                    return curPower >= smallGateCfg.show_power;
                };
                //是否解锁挂机收益
                SeaProxy.prototype.isRewardOpen = function (type) {
                    var cfg = game.getConfigByNameId("huanjingzhihai_index.json" /* HuanjingzhihaiIndex */, type);
                    var openGate = cfg.gate;
                    if (!openGate) {
                        return true;
                    }
                    var openBigGate = openGate[0];
                    var openSmallGate = openGate[1];
                    var bigGate = this.getCurBigGate(type);
                    if (bigGate > openBigGate) {
                        return true;
                    }
                    var smallGate = this.getPassSmallGate(type);
                    return bigGate == openBigGate && smallGate >= openSmallGate;
                };
                //是否可以领取挂机收益
                SeaProxy.prototype.canRewardDraw = function (type) {
                    var nextTime = this.getNextTime(type);
                    if (!nextTime) {
                        return false;
                    }
                    var curTime = TimeMgr.time.serverTimeSecond;
                    return curTime >= nextTime;
                };
                SeaProxy.prototype.getNextTime = function (type) {
                    var info = this.getInfo(type);
                    var rewardTime = info && info.reward_time;
                    if (!rewardTime || rewardTime.isZero()) {
                        return 0;
                    }
                    var startTime = rewardTime.toNumber();
                    var cfg = game.getConfigByNameId("huanjingzhihai_index.json" /* HuanjingzhihaiIndex */, type);
                    return startTime + cfg.per_time * game.Second.Hour;
                };
                /** 本次挂机收益开始时间戳 */
                SeaProxy.prototype.getStartTime = function (type) {
                    var info = this.getInfo(type);
                    var rewardTime = info && info.reward_time;
                    if (!rewardTime || rewardTime.isZero()) {
                        return 0;
                    }
                    var startTime = rewardTime.toNumber();
                    return startTime;
                };
                SeaProxy.prototype.getHintType = function (type) {
                    return this._model.hintType[type];
                };
                SeaProxy.prototype.updateHint = function () {
                    this.updateEnterHint();
                    this.updateRewardHint();
                    this.updateFubenHint();
                    this.updateBossAttackHint();
                    this.updateRankHint();
                    this.updateOrderHint();
                };
                SeaProxy.prototype.updateEnterHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670244 /* Sea */)) {
                        return; //功能未开启
                    }
                    for (var type = 1; type <= 3 /* Sea3 */; ++type) {
                        this.updateEnterHintByType(type);
                    }
                };
                SeaProxy.prototype.updateEnterHintByType = function (type) {
                    var hint = this.checkEnterHint(type);
                    var hintType = this.getEnterHintType(type);
                    mod.HintMgr.setHint(hint, hintType);
                };
                SeaProxy.prototype.getEnterHintType = function (type) {
                    return this._model.enterHintType[type];
                };
                SeaProxy.prototype.checkEnterHint = function (type) {
                    var openIdx = this._model.openIdxList[type];
                    if (!mod.ViewMgr.getIns().checkViewOpen(openIdx)) {
                        return false;
                    }
                    var isEnter = this.isEnter(type);
                    if (isEnter) {
                        return false;
                    }
                    var taskType = game.SeaTypeToTaskType[type];
                    var taskHint = mod.TaskUtil.getTaskHint(taskType);
                    if (taskHint) {
                        return true; //任务红点
                    }
                    var cfg = game.getConfigByNameId("huanjingzhihai_index.json" /* HuanjingzhihaiIndex */, type);
                    var cost = cfg.active_cost[0];
                    var costIndex = cost[0];
                    var costCnt = cost[1];
                    var curCnt = mod.BagUtil.getPropCntByIdx(costIndex);
                    return curCnt >= costCnt;
                };
                SeaProxy.prototype.updateRewardHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670244 /* Sea */)) {
                        return; //功能未开启
                    }
                    for (var type = 1; type <= 3 /* Sea3 */; ++type) {
                        this.updateRewardHintByType(type);
                    }
                };
                SeaProxy.prototype.updateRewardHintByType = function (type) {
                    var hint = this.checkRewardHint(type);
                    if (!hint) {
                        var nextTime = this.getNextTime(type);
                        if (nextTime > 0) {
                            var timeEventType = this._model.timeEventTypeList[type];
                            mod.HintMgr.addTimeEvent(timeEventType, nextTime, this, this.updateRewardHintByType, [type]);
                        }
                    }
                    var hintType = this.getRewardHintType(type);
                    mod.HintMgr.setHint(hint, hintType);
                };
                SeaProxy.prototype.getRewardHintType = function (type) {
                    return this._model.rewardHintType[type];
                };
                SeaProxy.prototype.checkRewardHint = function (type) {
                    var openIdx = this._model.openIdxList[type];
                    if (!mod.ViewMgr.getIns().checkViewOpen(openIdx)) {
                        return false;
                    }
                    if (this.canRewardDraw(type)) {
                        return true;
                    }
                    return false;
                };
                SeaProxy.prototype.updateFubenHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670244 /* Sea */)) {
                        return; //功能未开启
                    }
                    for (var type = 1; type <= 3 /* Sea3 */; ++type) {
                        var hint = this.checkFubenHint(type);
                        var hintType = this.getFubenHintType(type);
                        mod.HintMgr.setHint(hint, hintType);
                    }
                };
                SeaProxy.prototype.checkFubenHint = function (type) {
                    var openIdx = this._model.openIdxList[type];
                    if (!mod.ViewMgr.getIns().checkViewOpen(openIdx)) {
                        return false;
                    }
                    var isEnter = this.isEnter(type);
                    if (!isEnter) {
                        return false;
                    }
                    var bigGate = this.getCurBigGate(type);
                    return this.checkBigGateHint(type, bigGate);
                };
                SeaProxy.prototype.getFubenHintType = function (type) {
                    return this._model.fubenHintType[type];
                };
                SeaProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("showpower" /* showpower */) >= 0) {
                        this.updateFubenHint(); //战力变更时刷新挑战红点
                    }
                    if (keys.indexOf("xjzh_nl" /* xjzh_nl */) >= 0) {
                        this.updateEnterHintByType(1 /* Sea1 */);
                    }
                    if (keys.indexOf("sjzh_nl" /* sjzh_nl */) >= 0) {
                        this.updateEnterHintByType(2 /* Sea2 */);
                    }
                    if (keys.indexOf("sgjzh_nl" /* sgjzh_nl */) >= 0) {
                        this.updateEnterHintByType(3 /* Sea3 */);
                    }
                };
                SeaProxy.prototype.onTaskHint = function (n) {
                    var types = n.body;
                    if (types.indexOf(50 /* Sea1 */) >= 0) {
                        this.updateEnterHintByType(1 /* Sea1 */);
                    }
                    if (types.indexOf(51 /* Sea2 */) >= 0) {
                        this.updateEnterHintByType(2 /* Sea2 */);
                    }
                    if (types.indexOf(52 /* Sea3 */) >= 0) {
                        this.updateEnterHintByType(3 /* Sea3 */);
                    }
                };
                SeaProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    if (indexs.indexOf(1450100158 /* HuanjingBossTiaozhanling */) > -1) {
                        this.updateBossAttackHint();
                    }
                };
                /********************************幻境boss**********************************/
                SeaProxy.prototype.s2c_huanjingzhihai_single_rank_info = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this._model.rankList[msg.index] = msg;
                    this.sendNt("on_sea_rank_update" /* ON_SEA_RANK_UPDATE */);
                };
                SeaProxy.prototype.isRankRewardDraw = function (type) {
                    var info = this.getInfo(type);
                    return info && info.is_get == 2 /* Draw */;
                };
                SeaProxy.prototype.getBossIndex = function (type) {
                    var info = this.getInfo(type);
                    return info && info.boss_index || 1;
                };
                SeaProxy.prototype.getBossHp = function (type) {
                    var info = this.getInfo(type);
                    return info && info.boss_hp || 0;
                };
                SeaProxy.prototype.getBossStartIndex = function (type) {
                    var index = this.getBossIndex(type);
                    return Math.floor((index - 1) / game.SeaBossPosNum) * game.SeaBossPosNum + 1;
                };
                SeaProxy.prototype.getBossCfg = function (type, bossIndex) {
                    var cfgInfos = game.getConfigByNameId("huanjingzhihai_boss.json" /* HuanjingzhihaiBoss */, type);
                    var cfg = cfgInfos[bossIndex];
                    return cfg;
                };
                SeaProxy.prototype.getMyRank = function (type) {
                    var info = this._model.rankList[type];
                    return info && info.my_rank || null;
                };
                SeaProxy.prototype.getRankList = function (type) {
                    var info = this._model.rankList[type];
                    return info && info.all_ranks || [];
                };
                SeaProxy.prototype.getTopRank = function (type) {
                    var rankList = this.getRankList(type);
                    return rankList.length && rankList[0] || null;
                };
                SeaProxy.prototype.getMaxRank = function (type) {
                    var maxRank = 0;
                    var cfgList = game.getConfigByNameId("huanjingzhihai_boss_rank.json" /* HuanjingzhihaiBossRank */, type);
                    for (var k in cfgList) {
                        var cfg = cfgList[k];
                        var rankStart = cfg.ranks[0];
                        if (maxRank < rankStart) {
                            maxRank = rankStart - 1;
                        }
                    }
                    return maxRank;
                };
                SeaProxy.prototype.getBossHintType = function (type) {
                    return this._model.bossHintType[type];
                };
                SeaProxy.prototype.updateBossAttackHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670244 /* Sea */)) {
                        return; //功能未开启
                    }
                    for (var type = 1; type <= 3 /* Sea3 */; ++type) {
                        var hint = this.checkBossAttackHint(type);
                        var hintType = this.getBossAttackHintType(type);
                        mod.HintMgr.setHint(hint, hintType);
                    }
                };
                SeaProxy.prototype.checkBossAttackHint = function (type) {
                    var openIdx = this._model.openIdxList[type];
                    if (!mod.ViewMgr.getIns().checkViewOpen(openIdx)) {
                        return false;
                    }
                    var isEnter = this.isEnter(type);
                    if (!isEnter) {
                        return false;
                    }
                    return mod.BagUtil.checkPropCnt(1450100158 /* HuanjingBossTiaozhanling */);
                };
                SeaProxy.prototype.getBossAttackHintType = function (type) {
                    return this._model.bossAttackHintType[type];
                };
                SeaProxy.prototype.updateRankHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670244 /* Sea */)) {
                        return; //功能未开启
                    }
                    for (var type = 1; type <= 3 /* Sea3 */; ++type) {
                        var hint = this.checkRankHint(type);
                        var hintType = this.getRankHintType(type);
                        mod.HintMgr.setHint(hint, hintType);
                    }
                };
                SeaProxy.prototype.checkRankHint = function (type) {
                    var openIdx = this._model.openIdxList[type];
                    if (!mod.ViewMgr.getIns().checkViewOpen(openIdx)) {
                        return false;
                    }
                    var isEnter = this.isEnter(type);
                    if (!isEnter) {
                        return false;
                    }
                    return !this.isRankRewardDraw(type);
                };
                SeaProxy.prototype.getRankHintType = function (type) {
                    return this._model.rankHintType[type];
                };
                //战令红点
                SeaProxy.prototype.onUpdateGivingList = function (n) {
                    var types = n.body;
                    if (types.indexOf(6 /* Huanjing */) > -1) {
                        this.updateOrderHint();
                    }
                };
                SeaProxy.prototype.updateOrderHint = function () {
                    var hintPath = ["27" /* Activity */, "38" /* Giving */, "06" /* TabBtnType06 */];
                    var hint = mod.HintMgr.getHint(hintPath);
                    for (var type = 1; type <= 3 /* Sea3 */; ++type) {
                        var isEnter = this.isEnter(type);
                        if (!isEnter) {
                            continue;
                        }
                        var hintType = this.getOrderHintType(type);
                        mod.HintMgr.setHint(hint, hintType);
                    }
                };
                SeaProxy.prototype.getOrderHintType = function (type) {
                    return this._model.orderHintType[type];
                };
                /**能否开启排行榜，幻境系统有用到*/
                SeaProxy.prototype.canOpenRank = function () {
                    var ary = ["01" /* Sea1 */, "02" /* Sea2 */, "03" /* Sea3 */];
                    for (var _i = 0, ary_1 = ary; _i < ary_1.length; _i++) {
                        var type = ary_1[_i];
                        if (this.isEnter(parseInt(type))) {
                            return true;
                        }
                    }
                    return false;
                };
                return SeaProxy;
            }(game.ProxyBase));
            yijie.SeaProxy = SeaProxy;
            __reflect(SeaProxy.prototype, "game.mod.yijie.SeaProxy", ["game.mod.ISeaProxy", "base.IProxy"]);
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var YijieModel = /** @class */ (function () {
                function YijieModel() {
                    this.bossInfos = []; /**boss信息*/
                    this.count = 0; //幸运次数
                    this.selState = false; //勾选三倍
                    this.memberNum = 0; //宗门人员数量
                    this.bossValue = 0; //击杀普通boss的进度个数
                    this.bossList = [];
                    this.bossHint = ["56" /* Yijie */, "01" /* YijieMain */ + "01" /* Yijie */]; //异界红点
                    /************************************永恒异界****************************************/
                    this.yonghengBossInfos = []; /**boss信息*/
                    this.yonghengCount = 0; //幸运次数
                    this.goodCount = 0; //天选爆率次数
                    this.yonghengBossHint = ["56" /* Yijie */, "01" /* YijieMain */ + "02" /* YonghengYijie */]; //永恒异界红点
                }
                return YijieModel;
            }());
            yijie.YijieModel = YijieModel;
            __reflect(YijieModel.prototype, "game.mod.yijie.YijieModel");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var s2c_yijie_open_ui_ret = msg.s2c_yijie_open_ui_ret;
            var c2s_yijie_open_ui = msg.c2s_yijie_open_ui;
            var c2s_yijie_boss_challenge = msg.c2s_yijie_boss_challenge;
            var c2s_yijie_sanbei = msg.c2s_yijie_sanbei;
            var s2c_yijie_update_date = msg.s2c_yijie_update_date;
            var c2s_yijie_show_reward = msg.c2s_yijie_show_reward;
            var s2c_yijie_show_reward_ret = msg.s2c_yijie_show_reward_ret;
            var c2s_yijie_boss_info = msg.c2s_yijie_boss_info;
            var s2c_yijie_boss_info_ret = msg.s2c_yijie_boss_info_ret;
            var s2c_yijie_rate_boss_update = msg.s2c_yijie_rate_boss_update;
            var facade = base.facade;
            var s2c_yijie_boss_roll_point = msg.s2c_yijie_boss_roll_point;
            var s2c_yijie_sanbei_ret = msg.s2c_yijie_sanbei_ret;
            var c2s_yongheng_boss_challenge = msg.c2s_yongheng_boss_challenge;
            var c2s_yongheng_open_ui = msg.c2s_yongheng_open_ui;
            var s2c_yongheng_open_ui_ret = msg.s2c_yongheng_open_ui_ret;
            var s2c_yongheng_update_date = msg.s2c_yongheng_update_date;
            var c2s_yongheng_show_reward = msg.c2s_yongheng_show_reward;
            var s2c_yongheng_show_reward_ret = msg.s2c_yongheng_show_reward_ret;
            var c2s_yongheng_boss_info = msg.c2s_yongheng_boss_info;
            var s2c_yongheng_boss_info_ret = msg.s2c_yongheng_boss_info_ret;
            var Handler = base.Handler;
            var YijieProxy = /** @class */ (function (_super) {
                __extends(YijieProxy, _super);
                function YijieProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YijieProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new yijie.YijieModel();
                    this.onProto(s2c_yijie_open_ui_ret, this.s2c_yijie_open_ui_ret, this);
                    this.onProto(s2c_yijie_sanbei_ret, this.s2c_yijie_sanbei_ret, this);
                    this.onProto(s2c_yijie_update_date, this.s2c_yijie_update_date, this);
                    this.onProto(s2c_yijie_show_reward_ret, this.s2c_yijie_show_reward_ret, this);
                    this.onProto(s2c_yijie_boss_info_ret, this.s2c_yijie_boss_info_ret, this);
                    this.onProto(s2c_yijie_rate_boss_update, this.s2c_yijie_rate_boss_update, this);
                    this.onProto(s2c_yijie_boss_roll_point, this.s2c_yijie_boss_roll_point, this);
                    this.onProto(s2c_yongheng_open_ui_ret, this.s2c_yongheng_open_ui_ret, this);
                    this.onProto(s2c_yongheng_update_date, this.s2c_yongheng_update_date, this);
                    this.onProto(s2c_yongheng_show_reward_ret, this.s2c_yongheng_show_reward_ret, this);
                    this.onProto(s2c_yongheng_boss_info_ret, this.s2c_yongheng_boss_info_ret, this);
                };
                YijieProxy.prototype.c2s_yijie_open_ui = function () {
                    var msg = new c2s_yijie_open_ui();
                    this.sendProto(msg);
                };
                YijieProxy.prototype.c2s_yijie_boss_challenge = function (stage) {
                    var msg = new c2s_yijie_boss_challenge();
                    msg.stage = stage;
                    this.sendProto(msg);
                };
                YijieProxy.prototype.c2s_yijie_sanbei = function () {
                    var msg = new c2s_yijie_sanbei();
                    msg.state = !this.selState;
                    this.sendProto(msg);
                };
                YijieProxy.prototype.c2s_yijie_show_reward = function () {
                    var msg = new c2s_yijie_show_reward();
                    this.sendProto(msg);
                };
                YijieProxy.prototype.c2s_yijie_boss_info = function () {
                    var msg = new c2s_yijie_boss_info();
                    this.sendProto(msg);
                };
                YijieProxy.prototype.s2c_yijie_open_ui_ret = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.count != undefined) {
                        this._model.count = msg.count;
                    }
                    if (msg.list) {
                        this._model.bossInfos = msg.list;
                    }
                    if (msg.state != undefined) {
                        this._model.selState = msg.state;
                        this.updateBossHint();
                    }
                    this.sendNt("on_yijie_info_update" /* ON_YIJIE_INFO_UPDATE */);
                };
                YijieProxy.prototype.s2c_yijie_sanbei_ret = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.state != undefined) {
                        this._model.selState = msg.state;
                        this.updateBossHint();
                        this.sendNt("on_yijie_sel_update" /* ON_YIJIE_SEL_UPDATE */);
                    }
                };
                YijieProxy.prototype.s2c_yijie_update_date = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.count != undefined) {
                        this._model.count = msg.count;
                    }
                    if (msg.member_num != undefined) {
                        this._model.memberNum = msg.member_num;
                    }
                    if (msg.value != undefined) {
                        this._model.bossValue = msg.value;
                    }
                    this.sendNt("on_yijie_scene_update" /* ON_YIJIE_SCENE_UPDATE */);
                };
                YijieProxy.prototype.s2c_yijie_show_reward_ret = function (n) {
                    var msg = n.body;
                    mod.ViewMgr.getIns().bossRewardShow(msg.props);
                };
                YijieProxy.prototype.s2c_yijie_boss_info_ret = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.boss_list != undefined) {
                        this._model.bossList = msg.boss_list;
                        this.sendNt("boss_list_info_update" /* BOSS_LIST_INFO_UPDATE */);
                    }
                };
                YijieProxy.prototype.s2c_yijie_rate_boss_update = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    facade.showView("56" /* Yijie */, "03" /* YijieBoss */, msg);
                };
                YijieProxy.prototype.s2c_yijie_boss_roll_point = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("56" /* Yijie */, "04" /* YijieLucky */, msg);
                };
                /**boss信息*/
                YijieProxy.prototype.getBossInfo = function (stage, type) {
                    var infos = type == 2 /* YonghengYijie */ ? this._model.yonghengBossInfos : this._model.bossInfos;
                    var len = infos.length;
                    for (var i = 0; i < len; ++i) {
                        var info = infos[i];
                        if (info.stage == stage) {
                            return info;
                        }
                    }
                    return null;
                };
                YijieProxy.prototype.getBossCfgs = function (type) {
                    var infos = type == 2 /* YonghengYijie */ ? this._model.yonghengBossCfgs : this._model.bossCfgs;
                    var cfgName = type == 2 /* YonghengYijie */ ? "yongheng.json" /* Yongheng */ : "yijie.json" /* Yijie */;
                    if (!infos) {
                        infos = {};
                        var stage = 1;
                        while (stage) {
                            var cfgList = game.getConfigByNameId(cfgName, stage);
                            if (!cfgList) {
                                stage = 0;
                            }
                            else {
                                for (var k in cfgList) {
                                    var cfg = cfgList[k];
                                    if (!infos[stage]) {
                                        infos[stage] = [];
                                    }
                                    infos[stage].push(cfg);
                                }
                                stage++;
                            }
                        }
                    }
                    return infos;
                };
                YijieProxy.prototype.getBossList = function (type) {
                    var bossList = [];
                    var cfgs = this.getBossCfgs(type);
                    for (var k in cfgs) {
                        var cfg = cfgs[k][0];
                        bossList.push(cfg);
                    }
                    return bossList;
                };
                YijieProxy.prototype.getBossCfg = function (stage, index, type) {
                    var cfgName = type == 2 /* YonghengYijie */ ? "yongheng.json" /* Yongheng */ : "yijie.json" /* Yijie */;
                    var cfgList = game.getConfigByNameId(cfgName, stage);
                    var cfg = cfgList[index];
                    return cfg;
                };
                YijieProxy.prototype.isBossOpen = function (cfg, showTips) {
                    var lv = cfg.open;
                    var isOpen = mod.ViewMgr.getIns().checkRebirth(lv);
                    if (!isOpen && showTips) {
                        var tips = mod.ViewMgr.getIns().checkRebirthStr(lv);
                        game.PromptBox.getIns().show(tips);
                    }
                    return isOpen;
                };
                Object.defineProperty(YijieProxy.prototype, "count", {
                    get: function () {
                        return this._model.count;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(YijieProxy.prototype, "selState", {
                    get: function () {
                        return this._model.selState;
                    },
                    enumerable: true,
                    configurable: true
                });
                YijieProxy.prototype.getCost = function () {
                    var cfg = game.GameConfig.getParamConfigById("yijie_cost");
                    var index = cfg && cfg.value;
                    var cnt = this.selState ? 3 : 1; //勾选三倍后消耗显示3
                    return [index, cnt];
                };
                YijieProxy.prototype.getCostInfo = function () {
                    var cfg = game.GameConfig.getParamConfigById("yongheng_cost");
                    return cfg && cfg.value;
                };
                Object.defineProperty(YijieProxy.prototype, "memberNum", {
                    get: function () {
                        return this._model.memberNum;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(YijieProxy.prototype, "bossValue", {
                    get: function () {
                        return this._model.bossValue;
                    },
                    enumerable: true,
                    configurable: true
                });
                YijieProxy.prototype.getBossMaxValue = function () {
                    var cfg = game.GameConfig.getParamConfigById("yijie_kill_num");
                    return cfg && cfg.value;
                };
                Object.defineProperty(YijieProxy.prototype, "bossList", {
                    get: function () {
                        return this._model.bossList;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**更新红点*/
                YijieProxy.prototype.updateBossHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670156 /* Yijie */)) {
                        return;
                    }
                    var hint = this.checkBossHint();
                    var hintType = this._model.bossHint;
                    mod.HintMgr.setHint(hint, hintType, 1041670156 /* Yijie */);
                };
                YijieProxy.prototype.checkBossHint = function () {
                    var cost = this.getCost();
                    var index = cost[0];
                    var cnt = cost[1];
                    return mod.BagUtil.getPropCntByIdx(index) >= cnt;
                };
                /** 通用背包事件监听 */
                YijieProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    var cost = this.getCost();
                    var index = cost[0];
                    if (indexs.indexOf(index) >= 0) {
                        this.updateBossHint();
                        this.checkAutoChallengeYijie();
                    }
                    var costInfo = this.getCostInfo();
                    var index2 = costInfo[0];
                    if (indexs.indexOf(index2) >= 0) {
                        this.updateYonghengBossHint();
                    }
                };
                Object.defineProperty(YijieProxy.prototype, "curType", {
                    get: function () {
                        return this._model.curType;
                    },
                    set: function (type) {
                        this._model.curType = type;
                    },
                    enumerable: true,
                    configurable: true
                });
                /************************************永恒异界****************************************/
                YijieProxy.prototype.c2s_yongheng_open_ui = function () {
                    var msg = new c2s_yongheng_open_ui();
                    this.sendProto(msg);
                };
                YijieProxy.prototype.c2s_yongheng_boss_challenge = function (cfg) {
                    var msg = new c2s_yongheng_boss_challenge();
                    msg.stage = cfg["stage"]; //字段定义没导出
                    this.selCfg = cfg;
                    this.sendProto(msg);
                };
                YijieProxy.prototype.c2s_yongheng_show_reward = function () {
                    var msg = new c2s_yongheng_show_reward();
                    this.sendProto(msg);
                };
                YijieProxy.prototype.c2s_yongheng_boss_info = function () {
                    var msg = new c2s_yongheng_boss_info();
                    this.sendProto(msg);
                };
                YijieProxy.prototype.s2c_yongheng_open_ui_ret = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.count != undefined) {
                        this._model.yonghengCount = msg.count;
                    }
                    if (msg.good_count != undefined) {
                        this._model.goodCount = msg.good_count;
                    }
                    if (msg.list) {
                        this._model.yonghengBossInfos = msg.list;
                    }
                    this.sendNt("on_yongheng_yijie_info_update" /* ON_YONGHENG_YIJIE_INFO_UPDATE */);
                };
                YijieProxy.prototype.s2c_yongheng_update_date = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.count != undefined) {
                        this._model.yonghengCount = msg.count;
                    }
                    if (msg.member_num != undefined) {
                        this._model.memberNum = msg.member_num;
                    }
                    if (msg.good_count != undefined) {
                        this._model.goodCount = msg.good_count;
                    }
                    this.sendNt("on_yongheng_yijie_scene_update" /* ON_YONGHENG_YIJIE_SCENE_UPDATE */);
                };
                YijieProxy.prototype.s2c_yongheng_show_reward_ret = function (n) {
                    var msg = n.body;
                    mod.ViewMgr.getIns().bossRewardShow(msg.props);
                };
                YijieProxy.prototype.s2c_yongheng_boss_info_ret = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.boss_list != undefined) {
                        this._model.bossList = msg.boss_list;
                        this.sendNt("boss_list_info_update" /* BOSS_LIST_INFO_UPDATE */);
                    }
                };
                Object.defineProperty(YijieProxy.prototype, "yonghengCount", {
                    get: function () {
                        return this._model.yonghengCount;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(YijieProxy.prototype, "goodCount", {
                    get: function () {
                        return this._model.goodCount;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(YijieProxy.prototype, "selCfg", {
                    get: function () {
                        return this._model.selCfg;
                    },
                    set: function (cfg) {
                        this._model.selCfg = cfg;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**更新红点*/
                YijieProxy.prototype.updateYonghengBossHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670157 /* YonghengYijie */)) {
                        return;
                    }
                    var hint = this.checkYonghengBossHint();
                    var hintType = this._model.yonghengBossHint;
                    mod.HintMgr.setHint(hint, hintType);
                };
                YijieProxy.prototype.checkYonghengBossHint = function () {
                    var costInfo = this.getCostInfo();
                    var index = costInfo[0];
                    var cnt = costInfo[1];
                    return mod.BagUtil.getPropCntByIdx(index) >= cnt;
                };
                /**============== 修仙女仆自动挂机 ==============*/
                //能挑战的配置
                YijieProxy.prototype.getCanAutoChallengeYijieCfg = function () {
                    var cfgList = this.getBossList();
                    for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                        var cfg = cfgList_1[_i];
                        if (cfg && this.isBossOpen(cfg)) {
                            return cfg;
                        }
                    }
                    return null;
                };
                YijieProxy.prototype.canAutoChallengeYijie = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670156 /* Yijie */)) {
                        return false;
                    }
                    var cost = this.getCost();
                    if (!cost || !mod.BagUtil.checkPropCnt(cost[0], cost[1])) {
                        return false;
                    }
                    var cfg = this.getCanAutoChallengeYijieCfg();
                    return !!cfg;
                };
                YijieProxy.prototype.sendAutoChallengeYijie = function () {
                    var cfg = this.getCanAutoChallengeYijieCfg();
                    if (cfg) {
                        this.c2s_yijie_boss_challenge(cfg['stage']);
                    }
                };
                YijieProxy.prototype.checkAutoChallengeYijie = function () {
                    var cost = this.getCost();
                    if ((!cost || !mod.BagUtil.checkPropCnt(cost[0], cost[1]))
                        && mod.RoleUtil.getAutoChallengeEventType() == 3 /* Yijie */) {
                        mod.SceneUtil.exitScene();
                        mod.RoleUtil.removeAutoChallengeEvent(3 /* Yijie */);
                        return;
                    }
                    if (this.canAutoChallengeYijie()) {
                        mod.RoleUtil.addAutoChallengeEvent(3 /* Yijie */, Handler.alloc(this, this.sendAutoChallengeYijie));
                    }
                    else {
                        mod.RoleUtil.removeAutoChallengeEvent(3 /* Yijie */);
                    }
                };
                YijieProxy.prototype.onOpenFuncInit = function (n) {
                    this.checkFuncOpen(n);
                };
                YijieProxy.prototype.onOpenFuncUpdate = function (n) {
                    this.checkFuncOpen(n);
                };
                YijieProxy.prototype.checkFuncOpen = function (n) {
                    var addIdx = n.body;
                    if (addIdx.indexOf(1041670156 /* Yijie */) > -1) {
                        this.checkAutoChallengeYijie();
                    }
                };
                return YijieProxy;
            }(game.ProxyBase));
            yijie.YijieProxy = YijieProxy;
            __reflect(YijieProxy.prototype, "game.mod.yijie.YijieProxy");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaBaseView = /** @class */ (function (_super) {
                __extends(SeaBaseView, _super);
                function SeaBaseView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.SeaBaseSkin";
                    return _this;
                }
                return SeaBaseView;
            }(eui.Component));
            yijie.SeaBaseView = SeaBaseView;
            __reflect(SeaBaseView.prototype, "game.mod.yijie.SeaBaseView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var SeaBossPosItem = /** @class */ (function (_super) {
                __extends(SeaBossPosItem, _super);
                function SeaBossPosItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SeaBossPosItem.prototype.onAddToStage = function () {
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_reward, this.onClick, this);
                    _super.prototype.onAddToStage.call(this);
                };
                SeaBossPosItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var bossIndex = this.data;
                    var proxy = facade.retMod("56" /* Yijie */).retProxy(262 /* Sea */);
                    var curIndex = proxy.getBossIndex(proxy.type);
                    var isPass = curIndex > bossIndex;
                    var isCur = curIndex == bossIndex;
                    this.currentState = isCur ? "cur" : (isPass ? "pass" : "lock");
                    this.lab_index.text = bossIndex + "";
                };
                SeaBossPosItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    var bossIndex = this.data;
                    var proxy = facade.retMod("56" /* Yijie */).retProxy(262 /* Sea */);
                    var cfg = proxy.getBossCfg(proxy.type, bossIndex);
                    var tipsStr = game.TextUtil.addColor(game.StringUtil.substitute(game.getLanById("sea_tips12" /* sea_tips12 */), [bossIndex]), 15855403 /* YELLOW */);
                    mod.ViewMgr.getIns().showRewardTips("", cfg.show_reward, 0 /* NotFinish */, null, tipsStr);
                };
                return SeaBossPosItem;
            }(mod.BaseListenerRenderer));
            yijie.SeaBossPosItem = SeaBossPosItem;
            __reflect(SeaBossPosItem.prototype, "game.mod.yijie.SeaBossPosItem");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaBossSceneView = /** @class */ (function (_super) {
                __extends(SeaBossSceneView, _super);
                function SeaBossSceneView() {
                    var _this = _super.call(this) || this;
                    _this._infos = {}; //存储激活的神灵信息，pos:0~3，存的是神灵index
                    _this._posXList = {}; //存储未激活神灵的X坐标
                    _this.skinName = "skins.yijie.SeaBossSceneSkin";
                    return _this;
                }
                SeaBossSceneView.prototype.setIndex = function (pos, index) {
                    this._infos[pos] = index;
                };
                SeaBossSceneView.prototype.getInfos = function () {
                    return this._infos;
                };
                SeaBossSceneView.prototype.getIndex = function (pos) {
                    return this._infos[pos];
                };
                SeaBossSceneView.prototype.setPosX = function (pos, posX) {
                    this._posXList[pos] = posX;
                };
                SeaBossSceneView.prototype.getPosX = function (pos) {
                    return this._posXList[pos];
                };
                return SeaBossSceneView;
            }(eui.Component));
            yijie.SeaBossSceneView = SeaBossSceneView;
            __reflect(SeaBossSceneView.prototype, "game.mod.yijie.SeaBossSceneView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaBossView = /** @class */ (function (_super) {
                __extends(SeaBossView, _super);
                function SeaBossView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.SeaBossSkin";
                    return _this;
                }
                return SeaBossView;
            }(eui.Component));
            yijie.SeaBossView = SeaBossView;
            __reflect(SeaBossView.prototype, "game.mod.yijie.SeaBossView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var SeaFubenItem = /** @class */ (function (_super) {
                __extends(SeaFubenItem, _super);
                function SeaFubenItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SeaFubenItem.prototype.onAddToStage = function () {
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_item, this.onClick, this);
                    _super.prototype.onAddToStage.call(this);
                };
                SeaFubenItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var type = data["index"];
                    var bigGate = data.big_gate;
                    var proxy = facade.retMod("56" /* Yijie */).retProxy(262 /* Sea */);
                    var maxSmallGate = proxy.getMaxSmallGate(bigGate);
                    this._isOpen = proxy.isOpen(type, bigGate);
                    this._isFinish = proxy.isFinish(type, bigGate);
                    this.img_lock0.visible = this.img_lock.visible = !this._isOpen;
                    var maxSmallGateCfg = proxy.getSmallGateCfg(bigGate, maxSmallGate);
                    this.icon.setData(maxSmallGateCfg.show_reward[0]);
                    var nameStr = data.name;
                    if (this._isFinish) {
                        nameStr += game.TextUtil.addColor("（" + game.getLanById("pass" /* pass */) + "）", 8585074 /* GREEN */);
                    }
                    else if (this._isOpen) {
                        var smallGate = proxy.getSmallGate(type, bigGate);
                        nameStr += game.TextUtil.addColor("（" + smallGate + "/" + maxSmallGate + "）", 16731212 /* RED */);
                    }
                    this.lab_name.textFlow = game.TextUtil.parseHtml(nameStr);
                    this.btn_item.icon = "sea_event" + (data.big_gate % 10);
                    this.btn_item.redPoint.visible = proxy.checkBigGateHint(type, bigGate);
                };
                SeaFubenItem.prototype.onClick = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    if (!this._isOpen) {
                        game.PromptBox.getIns().show(game.getLanById("sea_tips8" /* sea_tips8 */));
                        return;
                    }
                    if (this._isFinish) {
                        game.PromptBox.getIns().show(game.getLanById("pass" /* pass */));
                        return;
                    }
                    var bigGate = data.big_gate;
                    var proxy = facade.retMod("56" /* Yijie */).retProxy(262 /* Sea */);
                    proxy.bigGate = bigGate;
                    mod.ViewMgr.getIns().showView("56" /* Yijie */, "23" /* SeaFubenMain */);
                };
                return SeaFubenItem;
            }(mod.BaseListenerRenderer));
            yijie.SeaFubenItem = SeaFubenItem;
            __reflect(SeaFubenItem.prototype, "game.mod.yijie.SeaFubenItem");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaFubenView = /** @class */ (function (_super) {
                __extends(SeaFubenView, _super);
                function SeaFubenView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.SeaFubenSkin";
                    return _this;
                }
                return SeaFubenView;
            }(eui.Component));
            yijie.SeaFubenView = SeaFubenView;
            __reflect(SeaFubenView.prototype, "game.mod.yijie.SeaFubenView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaRewardItem = /** @class */ (function (_super) {
                __extends(SeaRewardItem, _super);
                function SeaRewardItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SeaRewardItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.updateShow(this.cost1, data[0]);
                    this.updateShow(this.cost2, data[1]);
                };
                SeaRewardItem.prototype.updateShow = function (cost, costData) {
                    var index = costData[0];
                    var cnt = costData[1];
                    cost.updateIndex(index);
                    var str = cnt + "/" + game.getLanById("zongmen_hour" /* zongmen_hour */);
                    cost.setLabCost(str);
                };
                SeaRewardItem.prototype.setData = function (data) {
                    this.data = data;
                };
                return SeaRewardItem;
            }(eui.ItemRenderer));
            yijie.SeaRewardItem = SeaRewardItem;
            __reflect(SeaRewardItem.prototype, "game.mod.yijie.SeaRewardItem");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaRewardView = /** @class */ (function (_super) {
                __extends(SeaRewardView, _super);
                function SeaRewardView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.SeaRewardSkin";
                    return _this;
                }
                return SeaRewardView;
            }(eui.Component));
            yijie.SeaRewardView = SeaRewardView;
            __reflect(SeaRewardView.prototype, "game.mod.yijie.SeaRewardView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaSceneView = /** @class */ (function (_super) {
                __extends(SeaSceneView, _super);
                function SeaSceneView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.SeaSceneSkin";
                    return _this;
                }
                return SeaSceneView;
            }(eui.Component));
            yijie.SeaSceneView = SeaSceneView;
            __reflect(SeaSceneView.prototype, "game.mod.yijie.SeaSceneView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaShenlingItem = /** @class */ (function (_super) {
                __extends(SeaShenlingItem, _super);
                function SeaShenlingItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return SeaShenlingItem;
            }(eui.Component));
            yijie.SeaShenlingItem = SeaShenlingItem;
            __reflect(SeaShenlingItem.prototype, "game.mod.yijie.SeaShenlingItem");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaTaskView = /** @class */ (function (_super) {
                __extends(SeaTaskView, _super);
                function SeaTaskView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.SeaTaskSkin";
                    return _this;
                }
                return SeaTaskView;
            }(eui.Component));
            yijie.SeaTaskView = SeaTaskView;
            __reflect(SeaTaskView.prototype, "game.mod.yijie.SeaTaskView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaView = /** @class */ (function (_super) {
                __extends(SeaView, _super);
                function SeaView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.SeaSkin";
                    return _this;
                }
                return SeaView;
            }(eui.Component));
            yijie.SeaView = SeaView;
            __reflect(SeaView.prototype, "game.mod.yijie.SeaView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var YijieBossItem = /** @class */ (function (_super) {
                __extends(YijieBossItem, _super);
                function YijieBossItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YijieBossItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("56" /* Yijie */).retProxy(220 /* Yijie */);
                    this._sceneProxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_attack, this.onClick, this);
                };
                YijieBossItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    //不能直接设置boss为攻击目标，有可能找不到boss
                    //this._sceneProxy.foeTargetId = info.entity_id;//设置boss为攻击目标
                    this._sceneProxy.requestMonster(info.entity_id);
                };
                YijieBossItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    var stage = info.stage;
                    var index = info.index;
                    var cfg = this._proxy.getBossCfg(stage, index, this._proxy.curType);
                    var monsterIndex = cfg.monster_index[0];
                    var monsterCfg = game.getConfigByNameId("monster1.json" /* Monster */, monsterIndex);
                    this.img_icon.source = monsterCfg.res_id;
                    var isRate = index == game.YijieBossNum && this._proxy.curType == 1 /* Yijie */; //是否稀有boss
                    this.img_rate.visible = isRate;
                    var bossTime = info && info.recover_time && info.recover_time.toNumber() || 0;
                    var isShowRate = isRate && bossTime == -1; //展示稀有boss
                    var nameStr = monsterCfg.name;
                    if (isShowRate) {
                        //稀有boss为刷新
                        nameStr = "？？？";
                    }
                    this.lab_name.text = nameStr;
                    var belongInfo = info.owerinfo;
                    var hasBelong = !!(belongInfo && belongInfo.role_id); //是否有归属
                    var belongStr = "";
                    if (!hasBelong) {
                        //归属者：无
                        belongStr = game.getLanById("yijie_tips14" /* yijie_tips14 */) + "：" + game.getLanById("bag_cue20" /* bag_cue20 */);
                    }
                    else {
                        belongStr = game.getLanById("yijie_tips14" /* yijie_tips14 */) + "：" + belongInfo.name + "\n" + game.getLanById("yijie_tips15" /* yijie_tips15 */) + "：";
                        belongStr += belongInfo.guild_name ? belongInfo.guild_name : game.getLanById("bag_cue20" /* bag_cue20 */);
                    }
                    this.lab_belong.text = belongStr;
                    var hp = info && info.hp || 0;
                    this.bar.show(hp, 100, false, 0, false, 0 /* Percent */); //血量
                    var tipsStr = "";
                    if (isShowRate) {
                        //展示稀有boss
                        this.btn_attack.visible = false;
                        var maxValue = this._proxy.getBossMaxValue();
                        tipsStr = game.StringUtil.substitute(game.getLanById("yijie_tips16" /* yijie_tips16 */), [maxValue]); //击败%s个#N妖怪刷新
                    }
                    else {
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
                    }
                    this.lab_tips.text = tipsStr;
                };
                return YijieBossItem;
            }(mod.BaseListenerRenderer));
            yijie.YijieBossItem = YijieBossItem;
            __reflect(YijieBossItem.prototype, "game.mod.yijie.YijieBossItem");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var YijieBossListView = /** @class */ (function (_super) {
                __extends(YijieBossListView, _super);
                function YijieBossListView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.YijieBossListSkin";
                    return _this;
                }
                return YijieBossListView;
            }(eui.Component));
            yijie.YijieBossListView = YijieBossListView;
            __reflect(YijieBossListView.prototype, "game.mod.yijie.YijieBossListView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var YijieBossView = /** @class */ (function (_super) {
                __extends(YijieBossView, _super);
                function YijieBossView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.YijieBossSkin";
                    return _this;
                }
                return YijieBossView;
            }(eui.Component));
            yijie.YijieBossView = YijieBossView;
            __reflect(YijieBossView.prototype, "game.mod.yijie.YijieBossView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var YijieItem = /** @class */ (function (_super) {
                __extends(YijieItem, _super);
                function YijieItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YijieItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var monsterIndex = cfg.monster_index[0];
                    var monsterCfg = game.getConfigByNameId("monster1.json" /* Monster */, monsterIndex);
                    this.img_icon.source = monsterCfg.res_id;
                    var proxy = facade.retMod("56" /* Yijie */).retProxy(220 /* Yijie */);
                    var isOpen = proxy.isBossOpen(cfg);
                    var nameStr = "";
                    if (isOpen) {
                        nameStr = cfg.name;
                    }
                    else {
                        var lv = cfg.open;
                        nameStr = mod.RoleUtil.getRebirthLvStr(lv) + game.getLanById("boss_cue5" /* boss_cue5 */);
                    }
                    this.lab_name.text = nameStr;
                    var type = cfg.fight_type;
                    this.img_type1.visible = true;
                    this.img_type2.visible = type == 3 /* All */;
                    if (type == 3 /* All */) {
                        this.img_type1.source = "boss_type_1";
                        this.img_type2.source = "boss_type_2";
                    }
                    else {
                        this.img_type1.source = "boss_type_" + type;
                    }
                    this._info = proxy.getBossInfo(cfg["stage"], proxy.curType); //字段定义没导出
                    var bossTime = this._info && this._info.time.toNumber() || 0;
                    var isDied = bossTime - TimeMgr.time.serverTimeSecond > 0; //已死亡
                    this.img_lock.visible = !isOpen || isDied;
                    this.timeItem.visible = isDied;
                    this.updateTime();
                };
                YijieItem.prototype.updateTime = function () {
                    if (!this.data || !this._info) {
                        return;
                    }
                    if (!this.timeItem.visible) {
                        return;
                    }
                    var bossTime = this._info.time.toNumber();
                    var nextTime = bossTime - TimeMgr.time.serverTimeSecond;
                    if (nextTime == 0) {
                        facade.sendNt("update_boss_list" /* UPDATE_BOSS_lIST */);
                    }
                    this.timeItem.updateLeftTime(nextTime);
                };
                return YijieItem;
            }(eui.ItemRenderer));
            yijie.YijieItem = YijieItem;
            __reflect(YijieItem.prototype, "game.mod.yijie.YijieItem");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var YijieLuckyItem = /** @class */ (function (_super) {
                __extends(YijieLuckyItem, _super);
                function YijieLuckyItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YijieLuckyItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var nameStr = this.data.name + game.StringUtil.substitute(game.getLanById("yijie_tips18" /* yijie_tips18 */), [this.data.value.toString()]);
                    this.lab_name.textFlow = game.TextUtil.parseHtml(nameStr);
                };
                return YijieLuckyItem;
            }(eui.ItemRenderer));
            yijie.YijieLuckyItem = YijieLuckyItem;
            __reflect(YijieLuckyItem.prototype, "game.mod.yijie.YijieLuckyItem");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var YijieLuckyView = /** @class */ (function (_super) {
                __extends(YijieLuckyView, _super);
                function YijieLuckyView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.YijieLuckySkin";
                    return _this;
                }
                return YijieLuckyView;
            }(eui.Component));
            yijie.YijieLuckyView = YijieLuckyView;
            __reflect(YijieLuckyView.prototype, "game.mod.yijie.YijieLuckyView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var YijieResultView = /** @class */ (function (_super) {
                __extends(YijieResultView, _super);
                function YijieResultView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.YijieResultSkin";
                    return _this;
                }
                return YijieResultView;
            }(eui.Component));
            yijie.YijieResultView = YijieResultView;
            __reflect(YijieResultView.prototype, "game.mod.yijie.YijieResultView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var YijieSceneView = /** @class */ (function (_super) {
                __extends(YijieSceneView, _super);
                function YijieSceneView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.YijieSceneSkin";
                    return _this;
                }
                return YijieSceneView;
            }(eui.Component));
            yijie.YijieSceneView = YijieSceneView;
            __reflect(YijieSceneView.prototype, "game.mod.yijie.YijieSceneView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaModel = /** @class */ (function () {
                function SeaModel() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    this.infoList = {};
                    this.maxSmallGate = {};
                    this.hintType = (_a = {},
                        _a[1 /* Sea1 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "01" /* Sea1 */],
                        _a[2 /* Sea2 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "02" /* Sea2 */],
                        _a[3 /* Sea3 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "03" /* Sea3 */],
                        _a);
                    this.enterHintType = (_b = {},
                        _b[1 /* Sea1 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "01" /* Sea1 */,
                            "01" /* TabBtnType01 */],
                        _b[2 /* Sea2 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "02" /* Sea2 */,
                            "01" /* TabBtnType01 */],
                        _b[3 /* Sea3 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "03" /* Sea3 */,
                            "01" /* TabBtnType01 */] //加多一个TabBtnType01
                    ,
                        _b);
                    this.rewardHintType = (_c = {},
                        _c[1 /* Sea1 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "01" /* Sea1 */,
                            "02" /* TabBtnType02 */],
                        _c[2 /* Sea2 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "02" /* Sea2 */,
                            "02" /* TabBtnType02 */],
                        _c[3 /* Sea3 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "03" /* Sea3 */,
                            "02" /* TabBtnType02 */] //加多一个TabBtnType02
                    ,
                        _c);
                    this.fubenHintType = (_d = {},
                        _d[1 /* Sea1 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "01" /* Sea1 */,
                            "23" /* SeaFubenMain */, "01" /* TabBtnType01 */],
                        _d[2 /* Sea2 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "02" /* Sea2 */,
                            "23" /* SeaFubenMain */, "02" /* TabBtnType02 */],
                        _d[3 /* Sea3 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "03" /* Sea3 */,
                            "23" /* SeaFubenMain */, "03" /* TabBtnType03 */],
                        _d);
                    this.openIdxList = (_e = {},
                        _e[1 /* Sea1 */] = 1041670245 /* Sea1 */,
                        _e[2 /* Sea2 */] = 1041670246 /* Sea2 */,
                        _e[3 /* Sea3 */] = 1041670247 /* Sea3 */,
                        _e);
                    this.timeEventTypeList = (_f = {},
                        _f[1 /* Sea1 */] = 13 /* Sea1 */,
                        _f[2 /* Sea2 */] = 14 /* Sea2 */,
                        _f[3 /* Sea3 */] = 15 /* Sea3 */,
                        _f);
                    this.rankList = {};
                    this.bossHintType = (_g = {},
                        _g[1 /* Sea1 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "01" /* Sea1 */,
                            "25" /* SeaBossMain */, "01" /* TabBtnType01 */],
                        _g[2 /* Sea2 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "02" /* Sea2 */,
                            "25" /* SeaBossMain */, "02" /* TabBtnType02 */],
                        _g[3 /* Sea3 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "03" /* Sea3 */,
                            "25" /* SeaBossMain */, "03" /* TabBtnType03 */],
                        _g); //分页按钮用
                    this.bossAttackHintType = (_h = {},
                        _h[1 /* Sea1 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "01" /* Sea1 */,
                            "25" /* SeaBossMain */, "01" /* TabBtnType01 */, "01" /* TabBtnType01 */],
                        _h[2 /* Sea2 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "02" /* Sea2 */,
                            "25" /* SeaBossMain */, "02" /* TabBtnType02 */, "01" /* TabBtnType01 */],
                        _h[3 /* Sea3 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "03" /* Sea3 */,
                            "25" /* SeaBossMain */, "03" /* TabBtnType03 */, "01" /* TabBtnType01 */],
                        _h);
                    this.rankHintType = (_j = {},
                        _j[1 /* Sea1 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "01" /* Sea1 */,
                            "25" /* SeaBossMain */, "01" /* TabBtnType01 */, "26" /* SeaRankMain */, "01" /* Sea1 */],
                        _j[2 /* Sea2 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "02" /* Sea2 */,
                            "25" /* SeaBossMain */, "02" /* TabBtnType02 */, "26" /* SeaRankMain */, "02" /* Sea2 */],
                        _j[3 /* Sea3 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "03" /* Sea3 */,
                            "25" /* SeaBossMain */, "03" /* TabBtnType03 */, "26" /* SeaRankMain */, "03" /* Sea3 */],
                        _j);
                    this.orderHintType = (_k = {},
                        _k[1 /* Sea1 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "01" /* Sea1 */,
                            "25" /* SeaBossMain */, "01" /* TabBtnType01 */, "02" /* TabBtnType02 */],
                        _k[2 /* Sea2 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "02" /* Sea2 */,
                            "25" /* SeaBossMain */, "02" /* TabBtnType02 */, "02" /* TabBtnType02 */],
                        _k[3 /* Sea3 */] = ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "03" /* Sea3 */,
                            "25" /* SeaBossMain */, "03" /* TabBtnType03 */, "02" /* TabBtnType02 */],
                        _k);
                }
                return SeaModel;
            }());
            yijie.SeaModel = SeaModel;
            __reflect(SeaModel.prototype, "game.mod.yijie.SeaModel");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var YonghengYijieOpenView = /** @class */ (function (_super) {
                __extends(YonghengYijieOpenView, _super);
                function YonghengYijieOpenView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.YonghengYijieOpenSkin";
                    return _this;
                }
                return YonghengYijieOpenView;
            }(eui.Component));
            yijie.YonghengYijieOpenView = YonghengYijieOpenView;
            __reflect(YonghengYijieOpenView.prototype, "game.mod.yijie.YonghengYijieOpenView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var YonghengYijieSceneView = /** @class */ (function (_super) {
                __extends(YonghengYijieSceneView, _super);
                function YonghengYijieSceneView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yijie.YonghengYijieSceneSkin";
                    return _this;
                }
                return YonghengYijieSceneView;
            }(eui.Component));
            yijie.YonghengYijieSceneView = YonghengYijieSceneView;
            __reflect(YonghengYijieSceneView.prototype, "game.mod.yijie.YonghengYijieSceneView");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var YijieMainMdr = /** @class */ (function (_super) {
                __extends(YijieMainMdr, _super);
                function YijieMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Yijie */,
                            icon: "yijie_tab",
                            mdr: yijie.YijieMdr,
                            title: "yijie" /* yijie */,
                            bg: "manyboss_bg",
                            openIdx: 1041670156 /* Yijie */,
                            hintTypes: ["56" /* Yijie */, "01" /* YijieMain */ + "01" /* Yijie */],
                        },
                        {
                            btnType: "02" /* YonghengYijie */,
                            icon: "yonghengyijie_tab",
                            mdr: yijie.YonghengYijieMdr,
                            title: "yonghengyijie" /* yonghengyijie */,
                            bg: "manyboss_bg",
                            openIdx: 1041670157 /* YonghengYijie */,
                            hintTypes: ["56" /* Yijie */, "01" /* YijieMain */ + "02" /* YonghengYijie */],
                        },
                        {
                            btnType: "03" /* Sea */,
                            icon: "sea_tab",
                            mdr: yijie.SeaMdr,
                            title: "sea_tips" /* sea_tips */,
                            bg: "sea_bg",
                            openIdx: 1041670244 /* Sea */,
                            hintTypes: ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */],
                        }
                    ];
                    return _this;
                }
                return YijieMainMdr;
            }(mod.WndBaseMdr));
            yijie.YijieMainMdr = YijieMainMdr;
            __reflect(YijieMainMdr.prototype, "game.mod.yijie.YijieMainMdr");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var SeaBaseMdr = /** @class */ (function (_super) {
                __extends(SeaBaseMdr, _super);
                function SeaBaseMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", yijie.SeaBaseView);
                    _this._itemList = [];
                    _this._fuchenlinghuHint = ["27" /* Activity */, "31" /* SummonMain */, "03" /* Fuchenlinghu */];
                    _this._huanjingMainHint = ["61" /* More */, "140" /* HuanjingMain */, "01" /* Btn1 */];
                    return _this;
                }
                SeaBaseMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(262 /* Sea */);
                };
                SeaBaseMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.grp_task, TouchEvent.TOUCH_TAP, this.onClickTask);
                    addEventListener(this._view.btn_enter, TouchEvent.TOUCH_TAP, this.onClickEnter);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    addEventListener(this._view.btn_boss, TouchEvent.TOUCH_TAP, this.onClickBoss);
                    addEventListener(this._view.btn1, TouchEvent.TOUCH_TAP, this.onClick1);
                    addEventListener(this._view.btn2, TouchEvent.TOUCH_TAP, this.onClick2);
                    addEventListener(this._view.btn3, TouchEvent.TOUCH_TAP, this.onClick3);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this); //属性刷新，有货币
                    this.onNt("on_sea_info_update" /* ON_SEA_INFO_UPDATE */, this.updateView, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                    this.onNt("on_task_update" /* ON_TASK_UPDATE */, this.onTaskUpdate, this);
                };
                SeaBaseMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var proxy = facade.retMod("61" /* More */).retProxy(264 /* Huanjing */);
                    //配置表 huanjin_param 配置的
                    var system_id = 1;
                    this._huanjingGrowMainHint = proxy.getGrowHintPath(system_id);
                    this.removeEft();
                    this.initShow();
                    this.updateView();
                };
                SeaBaseMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SeaBaseMdr.prototype.onClickTask = function () {
                    if (this._canEnter) {
                        return; //可以进入的时候，不能打开
                    }
                    facade.showView("56" /* Yijie */, "21" /* SeaTask */);
                };
                SeaBaseMdr.prototype.onClickEnter = function () {
                    var type = this._proxy.type;
                    this._proxy.c2s_huanjingzhihai_click(1 /* Enter */, type);
                };
                SeaBaseMdr.prototype.onClickReward = function () {
                    facade.showView("56" /* Yijie */, "22" /* SeaReward */);
                };
                SeaBaseMdr.prototype.onClickBoss = function () {
                    mod.ViewMgr.getIns().showView("56" /* Yijie */, "25" /* SeaBossMain */);
                };
                SeaBaseMdr.prototype.onClick1 = function () {
                    var linghuProxy = facade.retMod("27" /* Activity */).retProxy(266 /* Fuchenlinghu */);
                    if (linghuProxy.isOpenSea(1 /* Sea1 */, true)) {
                        mod.ViewMgr.getIns().showView("27" /* Activity */, "31" /* SummonMain */, "03" /* Fuchenlinghu */);
                    }
                };
                SeaBaseMdr.prototype.onClick2 = function () {
                    if (mod.ViewMgr.getIns().checkViewOpen(1041670248 /* Huanjing */, true)) {
                        mod.ViewMgr.getIns().showView("61" /* More */, "140" /* HuanjingMain */);
                    }
                };
                SeaBaseMdr.prototype.onClick3 = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670248 /* Huanjing */, true)) {
                        return;
                    }
                    var systemId = this._proxy.type;
                    var cfg = game.getConfigByNameId("huanjin_param.json" /* HuanJingParam */, systemId);
                    if (cfg && cfg.open_id && mod.ViewMgr.getIns().checkViewOpen(cfg.open_id, true)) {
                        var huanjingProxy = facade.retMod("61" /* More */).retProxy(264 /* Huanjing */);
                        if (!huanjingProxy.getSurfaceActedNum(systemId)) {
                            game.PromptBox.getIns().show(game.getLanById("xiandi_tips21" /* xiandi_tips21 */));
                        }
                        else {
                            mod.ViewMgr.getIns().showView("61" /* More */, "141" /* HuanjingGrowMain */, ["01" /* Btn1 */, systemId]);
                        }
                    }
                };
                SeaBaseMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    var roleKey = game.SeaTypeToRoleKey[this._proxy.type];
                    if (keys.indexOf(roleKey) >= 0) {
                        this.updateDefault();
                    }
                };
                /** 通用红点事件监听 */
                SeaBaseMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    var type = this._proxy.type;
                    var hintType = this._proxy.getRewardHintType(type);
                    var bossHintType = this._proxy.getBossHintType(type);
                    if (data.node == mod.HintMgr.getType(hintType)) {
                        this.updateRewardHint(data.value);
                    }
                    else if (data.node == mod.HintMgr.getType(bossHintType)) {
                        this.updateBossHint(data.value);
                    }
                    else if (data.node == mod.HintMgr.getType(this._fuchenlinghuHint)) {
                        this.updateLinghuHint(data.value);
                    }
                    else if (data.node == mod.HintMgr.getType(this._huanjingMainHint)) {
                        this.updateHuanjingMainHint(data.value);
                    }
                    // else if(data.node == HintMgr.getType(this.huanjingGrowMainHint)){
                    //     this.updateHuanjingGrowMainHint(data.value);
                    // }
                };
                SeaBaseMdr.prototype.onTaskUpdate = function (n) {
                    var types = n.body;
                    var taskType = game.SeaTypeToTaskType[this._proxy.type];
                    if (types.indexOf(taskType) > -1) {
                        this.updateTaskHint();
                    }
                };
                SeaBaseMdr.prototype.initShow = function () {
                    var type = this._proxy.type;
                    var cfg = game.getConfigByNameId("huanjingzhihai_index.json" /* HuanjingzhihaiIndex */, type);
                    var descStr = game.StringUtil.substitute(game.getLanById("sea_tips3" /* sea_tips3 */), [cfg.name]);
                    this._view.lab_desc.text = descStr;
                    var item = this._view.btn_boss["item"];
                    item.setData(1450100158 /* HuanjingBossTiaozhanling */);
                    this._view.img_icon1.source = "sea" + type + "_icon1";
                    this._view.img_icon2.source = "sea" + type + "_icon2";
                    this._view.img_icon3.source = "sea" + type + "_icon3";
                    this._view.btn3.iconDisplay.source = "sea" + type + "_btn3";
                    this._itemList = [
                        this._view.item1,
                        this._view.item2,
                        this._view.item3,
                        this._view.item4,
                        this._view.item5
                    ];
                };
                SeaBaseMdr.prototype.updateView = function () {
                    var type = this._proxy.type;
                    var isEnter = this._proxy.isEnter(type);
                    this._view.grp_enter.visible = isEnter;
                    this._view.grp_default.visible = !isEnter;
                    if (isEnter) {
                        this.updateEnter();
                        this.updateHint();
                        this._view.group_eft.removeChildren();
                        this.sendNt("update_wnd_base_mdr_bg" /* UPDATE_WND_BASE_MDR_BG */, "sea_enter_bg1"); //todo，只有一个背景
                    }
                    else {
                        this.updateDefault();
                        this.updateTaskHint();
                        this.sendNt("update_wnd_base_mdr_bg" /* UPDATE_WND_BASE_MDR_BG */, "sea_bg1"); //todo，只有一个背景
                        this._view.group_eft.removeChildren();
                        this.addEftByParent("huanjingfangdian" /* HuanJingFangDian */, this._view.group_eft);
                    }
                };
                SeaBaseMdr.prototype.updateDefault = function () {
                    var type = this._proxy.type;
                    var cfg = game.getConfigByNameId("huanjingzhihai_index.json" /* HuanjingzhihaiIndex */, type);
                    var cost = cfg.active_cost[0];
                    var costIndex = cost[0];
                    var costCnt = cost[1];
                    var curCnt = mod.BagUtil.getPropCntByIdx(costIndex);
                    var needCnt = costCnt - curCnt;
                    this._canEnter = needCnt <= 0; //可以进入幻境之海
                    this._view.btn_enter.visible = this._view.btn_enter.redPoint.visible = this._canEnter;
                    this.addEftByParent("xitongjihuo" /* XiTongJiHuo */, this._view.btn_enter.group_eft);
                    var tips1 = "";
                    if (this._canEnter) {
                        //可以进入
                        tips1 = game.TextUtil.addColor(game.getLanById("sea_tips6" /* sea_tips6 */), 8585074 /* GREEN */) + game.getLanById("sea_tips" /* sea_tips */);
                    }
                    else {
                        var needCntStr = game.TextUtil.addColor(needCnt + "", 16731212 /* RED */);
                        tips1 = game.StringUtil.substitute(game.getLanById("sea_tips4" /* sea_tips4 */), [needCntStr]);
                    }
                    this._view.lab_tips1.textFlow = game.TextUtil.parseHtml(tips1);
                    var cnt = this._proxy.getEnterCnt(type);
                    var cntStr = game.TextUtil.addColor(cnt + "", 8585074 /* GREEN */);
                    var tips2 = game.StringUtil.substitute(game.getLanById("sea_tips5" /* sea_tips5 */), [cntStr]) + cfg.name;
                    this._view.lab_tips2.textFlow = game.TextUtil.parseHtml(tips2);
                    var taskVal = Math.round(curCnt * 100 / costCnt);
                    this._view.lab_task.text = taskVal + "%";
                };
                SeaBaseMdr.prototype.updateEnter = function () {
                    var type = this._proxy.type;
                    var cfgList = [];
                    var cfgInfos = game.getConfigByNameId("huanjingzhihai_type.json" /* HuanjingzhihaiType */, type);
                    for (var k in cfgInfos) {
                        var cfg = cfgInfos[k];
                        cfgList.push(cfg);
                    }
                    for (var i = 0; i < this._itemList.length && i < cfgList.length; ++i) {
                        var item = this._itemList[i];
                        var cfg = cfgList[i];
                        item.data = cfg;
                    }
                };
                SeaBaseMdr.prototype.updateHint = function () {
                    var type = this._proxy.type;
                    var hintType = this._proxy.getRewardHintType(type);
                    this.updateRewardHint(mod.HintMgr.getHint(hintType));
                    var bossHintType = this._proxy.getBossHintType(type);
                    this.updateBossHint(mod.HintMgr.getHint(bossHintType));
                    this.updateLinghuHint(mod.HintMgr.getHint(this._fuchenlinghuHint));
                    this.updateHuanjingMainHint(mod.HintMgr.getHint(this._huanjingMainHint));
                    this.updateHuanjingGrowMainHint(mod.HintMgr.getHint(this._huanjingGrowMainHint));
                };
                SeaBaseMdr.prototype.updateRewardHint = function (hint) {
                    this._view.btn_reward.redPoint.visible = hint;
                };
                SeaBaseMdr.prototype.updateBossHint = function (hint) {
                    this._view.btn_boss.redPoint.visible = hint;
                };
                SeaBaseMdr.prototype.updateTaskHint = function () {
                    var type = this._proxy.type;
                    var taskType = game.SeaTypeToTaskType[type];
                    var taskHint = mod.TaskUtil.getTaskHint(taskType);
                    this._view.redPoint.visible = taskHint && !this._canEnter;
                };
                SeaBaseMdr.prototype.updateLinghuHint = function (hint) {
                    this._view.btn1.redPoint.visible = hint;
                };
                SeaBaseMdr.prototype.updateHuanjingMainHint = function (hint) {
                    this._view.btn2.redPoint.visible = hint;
                };
                SeaBaseMdr.prototype.updateHuanjingGrowMainHint = function (hint) {
                    this._view.btn3.redPoint.visible = hint;
                };
                return SeaBaseMdr;
            }(game.EffectMdrBase));
            yijie.SeaBaseMdr = SeaBaseMdr;
            __reflect(SeaBaseMdr.prototype, "game.mod.yijie.SeaBaseMdr");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaBossMainMdr = /** @class */ (function (_super) {
                __extends(SeaBossMainMdr, _super);
                function SeaBossMainMdr() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SeaBossMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(262 /* Sea */);
                };
                SeaBossMainMdr.prototype.onShow = function () {
                    this._proxy.type = this._showArgs && parseInt(this._showArgs[0]) || 1;
                    this.initBtnList();
                    _super.prototype.onShow.call(this);
                };
                SeaBossMainMdr.prototype.initBtnList = function () {
                    var type = this._proxy.type;
                    var btnType = "0" + type;
                    var icon = "sea_boss_tab" + type + "_";
                    var title = "sea_boss_tips" + type;
                    var hintType = this._proxy.getBossHintType(type);
                    this._btnData = [
                        {
                            btnType: btnType,
                            icon: icon,
                            mdr: yijie.SeaBossMdr,
                            title: title,
                            hintTypes: hintType,
                        }
                    ];
                };
                return SeaBossMainMdr;
            }(mod.WndBaseMdr));
            yijie.SeaBossMainMdr = SeaBossMainMdr;
            __reflect(SeaBossMainMdr.prototype, "game.mod.yijie.SeaBossMainMdr");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var Handler = base.Handler;
            var Tween = base.Tween;
            var delayCall = base.delayCall;
            var SeaBossMdr = /** @class */ (function (_super) {
                __extends(SeaBossMdr, _super);
                function SeaBossMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", yijie.SeaBossView);
                    _this._itemList = [];
                    _this._moveCnt = 0; //场景移动的次数
                    return _this;
                }
                SeaBossMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(262 /* Sea */);
                };
                SeaBossMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
                    addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
                    addEventListener(this._view.btn_ling, TouchEvent.TOUCH_TAP, this.onClickLing);
                    addEventListener(this._view.btn_rule, TouchEvent.TOUCH_TAP, this.onClickRule);
                    addEventListener(this._view.btn_attack, TouchEvent.TOUCH_TAP, this.onClickAttack);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateIndex, this);
                    this.onNt("on_sea_info_update" /* ON_SEA_INFO_UPDATE */, this.onInfoUpdate, this);
                    this.onNt("on_sea_rank_update" /* ON_SEA_RANK_UPDATE */, this.updateTopRank, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                };
                SeaBossMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.updateGiftTips();
                    this.updateTime();
                    this.reqRankInfo();
                    this.updateTopRank();
                    this.updateHint();
                    this.onInfoUpdate();
                    this.updateScene();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                SeaBossMdr.prototype.onHide = function () {
                    this._effId = 0;
                    this._lastIndex = 0;
                    this._playingMove = false;
                    this._playingAttack = false;
                    this._moveCnt = 0;
                    this.removeAttackEft();
                    this.resetMoveData();
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                SeaBossMdr.prototype.onClickRank = function () {
                    var type = this._proxy.type;
                    var btnType = "0" + type;
                    mod.ViewMgr.getIns().showView("56" /* Yijie */, "26" /* SeaRankMain */, btnType);
                };
                SeaBossMdr.prototype.onClickGift = function () {
                    this.setGiftTips(false);
                    mod.ViewMgr.getIns().showGift(201801 /* Id201801 */);
                };
                SeaBossMdr.prototype.onClickLing = function () {
                    mod.ViewMgr.getIns().showView("27" /* Activity */, "38" /* Giving */, "06" /* TabBtnType06 */);
                };
                SeaBossMdr.prototype.onClickRule = function () {
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("sea_rule_tips" /* sea_rule_tips */));
                };
                SeaBossMdr.prototype.onClickAttack = function () {
                    if (this._playingMove) {
                        return; //正在移动
                    }
                    var curTime = TimeMgr.time.serverTime;
                    if (this._attackTime && curTime - this._attackTime < 500) {
                        //点击限制，0.5秒点击一次
                        return;
                    }
                    this._attackTime = curTime;
                    if (!mod.BagUtil.checkPropCntUp(1450100158 /* HuanjingBossTiaozhanling */)) {
                        return;
                    }
                    this.playAttack();
                    var type = this._proxy.type;
                    this._proxy.c2s_huanjingzhihai_click(4 /* Attack */, type);
                };
                /** 通用背包事件监听 */
                SeaBossMdr.prototype.onBagUpdateIndex = function (n) {
                    var indexs = n.body;
                    if (indexs.indexOf(1450100158 /* HuanjingBossTiaozhanling */) >= 0) {
                        this._view.costItem.updateShow();
                    }
                };
                /** 通用红点事件监听 */
                SeaBossMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    var type = this._proxy.type;
                    var hintType = this._proxy.getRankHintType(type);
                    var orderHintType = this._proxy.getOrderHintType(type);
                    if (data.node == mod.HintMgr.getType(hintType)) {
                        this.updateRankHint(data.value);
                    }
                    else if (data.node == mod.HintMgr.getType(orderHintType)) {
                        this.updateOrderHint(data.value);
                    }
                };
                SeaBossMdr.prototype.onInfoUpdate = function () {
                    this.updateItemList();
                    this.updateShow();
                };
                SeaBossMdr.prototype.initShow = function () {
                    this._view.costItem.setDataYellow(1450100158 /* HuanjingBossTiaozhanling */);
                    this._itemList = [
                        this._view.item0,
                        this._view.item1,
                        this._view.item2,
                        this._view.item3,
                        this._view.item4
                    ];
                    this._view.scene1.img_bg.source = game.ResUtil.getUiJpg("sea_boss_bg1");
                    this._view.scene2.img_bg.source = game.ResUtil.getUiJpg("sea_boss_bg2");
                };
                SeaBossMdr.prototype.reqRankInfo = function () {
                    var type = this._proxy.type;
                    this._proxy.c2s_huanjingzhihai_click(5 /* Rank */, type);
                };
                SeaBossMdr.prototype.updateGiftTips = function () {
                    var productId = 201801 /* Id201801 */;
                    var showGift = mod.PayUtil.checkShowGift(productId);
                    this._view.btn_gift.visible = showGift;
                    if (showGift) {
                        var hasBuy = mod.PayUtil.hasBuy(productId);
                        this.setGiftTips(!hasBuy);
                        if (!hasBuy) {
                            this._view.lab_gift.text = game.getLanById("sea_tips11" /* sea_tips11 */);
                        }
                    }
                    else {
                        this.setGiftTips(false);
                    }
                };
                SeaBossMdr.prototype.setGiftTips = function (show) {
                    this._view.grp_gift.visible = show;
                };
                SeaBossMdr.prototype.updateItemList = function () {
                    var type = this._proxy.type;
                    var startIndex = this._proxy.getBossStartIndex(type);
                    for (var i = 0; i < this._itemList.length; ++i) {
                        var item = this._itemList[i];
                        var index = startIndex + i;
                        item.data = index;
                    }
                };
                SeaBossMdr.prototype.updateShow = function () {
                    var type = this._proxy.type;
                    var curIndex = this._proxy.getBossIndex(type);
                    var cfg = this._proxy.getBossCfg(type, curIndex);
                    var damageStr = game.StringUtil.getHurtNumStr(cfg.damage_shenling);
                    var tipsStr = game.StringUtil.substitute(game.getLanById("sea_tips10" /* sea_tips10 */), [damageStr]);
                    this._view.lab_tips.text = tipsStr;
                    var hp = this._proxy.getBossHp(type);
                    var maxHp = cfg.boss_hp;
                    this._view.bar.show(hp, maxHp, false, 0, false); //boss血量
                    if (curIndex == this._lastIndex) {
                        return;
                    }
                    if (this._lastIndex) {
                        this.playMove();
                    }
                    this._lastIndex = curIndex;
                    if (this._effId) {
                        this.removeEffect(this._effId);
                    }
                    //todo，怪物没有向下方向的模型
                    this._effId = this.addMonsterByRes(cfg.res_id, this._view.scene1.grp_monster, 6 /* LEFT_DOWN */);
                };
                SeaBossMdr.prototype.update = function (time) {
                    this.updateTime();
                };
                SeaBossMdr.prototype.updateTime = function () {
                    var endTime = game.TimeUtil.getNextWeekTime();
                    var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    this._view.timeItem.updateLeftTime(leftTime);
                };
                SeaBossMdr.prototype.updateTopRank = function () {
                    var type = this._proxy.type;
                    var topInfo = this._proxy.getTopRank(type);
                    if (topInfo && topInfo.name) {
                        this._view.lab_name.text = topInfo.name;
                        this._view.head.updateHeadShow(topInfo.head, topInfo.head_frame, topInfo.sex, topInfo.role_id, topInfo.server_id);
                    }
                    else {
                        this._view.lab_name.text = game.getLanById("tishi_2" /* tishi_2 */);
                        this._view.head.defaultHeadShow();
                    }
                };
                SeaBossMdr.prototype.updateHint = function () {
                    var type = this._proxy.type;
                    var hintType = this._proxy.getRankHintType(type);
                    this.updateRankHint(mod.HintMgr.getHint(hintType));
                    var orderHintType = this._proxy.getOrderHintType(type);
                    this.updateOrderHint(mod.HintMgr.getHint(orderHintType));
                };
                SeaBossMdr.prototype.updateRankHint = function (hint) {
                    this._view.btn_rank.redPoint.visible = hint;
                };
                SeaBossMdr.prototype.updateOrderHint = function (hint) {
                    this._view.btn_ling.redPoint.visible = hint;
                };
                SeaBossMdr.prototype.updateScene = function () {
                    this.playRoleStand();
                    var type = this._proxy.type;
                    var cfg = game.getConfigByNameId("huanjingzhihai_index.json" /* HuanjingzhihaiIndex */, type);
                    for (var i = 0; i < cfg.shenling.length; ++i) {
                        var index = cfg.shenling[i];
                        var shenling = this._view.scene1["shenling" + i];
                        var dir = game.SeaShenlingDir[i];
                        var star = mod.SurfaceUtil.getStar(index);
                        var isAct = star > 0;
                        this.addAnimate(index, shenling.grp_shenling, dir, "std" /* STAND */, false, false, !isAct);
                        if (isAct) {
                            this._view.scene1.setIndex(i, index);
                            shenling.starListView.visible = true;
                            shenling.starListView.updateStar(star, star);
                        }
                        else {
                            shenling.starListView.visible = false;
                            this._view.scene1.setPosX(i, shenling.x); //缓存未激活神灵坐标
                        }
                    }
                };
                SeaBossMdr.prototype.removeAttackEft = function () {
                    if (this._eftId_player) {
                        this.removeEffect(this._eftId_player);
                        this._eftId_player = null;
                    }
                };
                //播放攻击
                SeaBossMdr.prototype.playAttack = function () {
                    //todo，怪物没有受击动作
                    var _this = this;
                    this.removeAttackEft();
                    //播放玩家攻击特效
                    this._eftId_player = this.addEftByParent("luolei" /* Luolei */, this._view.grp_eff, 0, 0, -1, null, 1, 2);
                    if (this._playingAttack) {
                        return; //正在播放攻击动作
                    }
                    this._playingAttack = true;
                    //玩家攻击动作
                    this.updateRoleAct(this._view.scene1.grp_player, 2 /* RIGHT_UP */, "atk" /* ATTACK */ + "1", false, Handler.alloc(this, function () {
                        _this.playRoleStand();
                    }));
                    //神灵攻击动作和特效
                    this.playShenlingAttack();
                };
                //玩家站立
                SeaBossMdr.prototype.playRoleStand = function () {
                    this._playingAttack = false;
                    this.updateRoleAct(this._view.scene1.grp_player, 2 /* RIGHT_UP */, "std" /* STAND */);
                };
                //神灵站立
                SeaBossMdr.prototype.playShenlingStand = function () {
                    var infos = this._view.scene1.getInfos();
                    for (var i in infos) {
                        var index = infos[i];
                        var shenling = this._view.scene1["shenling" + i];
                        shenling.grp_shenling.removeChildren();
                        var dir = game.SeaShenlingDir[i];
                        this.addAnimate(index, shenling.grp_shenling, dir, "std" /* STAND */, false);
                    }
                };
                //神灵攻击
                SeaBossMdr.prototype.playShenlingAttack = function () {
                    var _this = this;
                    var infos = this._view.scene1.getInfos();
                    var _loop_1 = function (i) {
                        var index = infos[i];
                        var shenling = this_1._view.scene1["shenling" + i];
                        shenling.grp_shenling.removeChildren();
                        var dir = game.SeaShenlingDir[i];
                        this_1.addAnimate(index, shenling.grp_shenling, dir, "atk" /* ATTACK */ + "1", false, false, false, Handler.alloc(this_1, function () {
                            _this.addAnimate(index, shenling.grp_shenling, dir, "std" /* STAND */, false);
                        }), 1);
                        var eftSrc = game.ResUtil.getSkillEftUrl(game.SeaShenlingEft[i]);
                        var grpEft = this_1._view["grp_eff_shenling" + i];
                        var rotation = game.SeaShenlingEftRotation[i];
                        this_1.addEftByParent(eftSrc, grpEft, 0, 0, -1, null, 1, 1, true, 1, false, 0, rotation);
                    };
                    var this_1 = this;
                    for (var i in infos) {
                        _loop_1(i);
                    }
                };
                //播放移动
                SeaBossMdr.prototype.playMove = function () {
                    var _this = this;
                    this._playingMove = true;
                    this.setBossVisible(false); //隐藏boss相关
                    delayCall(Handler.alloc(this, function () {
                        //玩家移动，延迟1秒执行
                        _this.updateRoleAct(_this._view.scene1.grp_player, 3 /* RIGHT */, "run" /* RUN */, true);
                        _this.playShenlingMove();
                        _this.playSceneMove();
                    }), 1000);
                };
                //神灵移动
                SeaBossMdr.prototype.playShenlingMove = function () {
                    var infos = this._view.scene1.getInfos();
                    for (var i in infos) {
                        var index = infos[i];
                        var shenling = this._view.scene1["shenling" + i];
                        shenling.grp_shenling.removeChildren();
                        this.addAnimate(index, shenling.grp_shenling, 3 /* RIGHT */, "run" /* RUN */, false);
                    }
                };
                //场景移动
                SeaBossMdr.prototype.playSceneMove = function () {
                    var _this = this;
                    //背景移动
                    this._moveCnt++;
                    var cntVal = this._moveCnt % 3 || 3; //循环1~3
                    var bgNum = cntVal == 1 ? 3 : (cntVal == 2 ? 2 : 1);
                    var bgWidth = 690;
                    Tween.get(this._view.scene1.img_bg)
                        .to({ x: -bgWidth }, 1000)
                        .exec(Handler.alloc(this, function () {
                        _this._view.scene1.img_bg.x = bgWidth;
                        //设置背景资源，移动一次背景3，移动两次背景2，移动三次背景1，如此循环
                        var bgStr1 = "sea_boss_bg" + bgNum;
                        _this._view.scene1.img_bg.source = game.ResUtil.getUiJpg(bgStr1);
                        //设置boss可见，移动boss位置
                        _this.setSceneVisible(true, bgWidth); //显示boss相关
                    }))
                        .to({ x: 0 }, 1000)
                        .exec(Handler.alloc(this, this.onMoveEnd));
                    Tween.get(this._view.scene2.img_bg)
                        .to({ x: -bgWidth * 2 }, 2000)
                        .exec(Handler.alloc(this, function () {
                        _this._view.scene2.img_bg.x = 0;
                        var bgNum2 = (bgNum + 1) % 3 || 3;
                        var bgStr2 = "sea_boss_bg" + bgNum2;
                        _this._view.scene2.img_bg.source = game.ResUtil.getUiJpg(bgStr2);
                    }));
                    //移动BOSS
                    var bossX = this._view.scene1.grp_monster.x;
                    Tween.get(this._view.scene1.grp_monster)
                        .delay(1000)
                        .to({ x: bossX }, 1000);
                    //移动神灵
                    for (var i = 0; i < game.SeaShenlingNum; ++i) {
                        var index = this._view.scene1.getIndex(i);
                        if (index) {
                            continue;
                        }
                        var shenling = this._view.scene1["shenling" + i];
                        var shenlingX = shenling.x;
                        Tween.get(shenling)
                            .delay(1000)
                            .to({ x: shenlingX }, 1000);
                    }
                };
                SeaBossMdr.prototype.resetMoveData = function () {
                    Tween.remove(this._view.scene1.img_bg);
                    this._view.scene1.img_bg.x = 0;
                    Tween.remove(this._view.scene2.img_bg);
                    this._view.scene2.img_bg.x = 0;
                    Tween.remove(this._view.scene1.grp_monster);
                    this._view.scene1.grp_monster.x = 345; //默认居中
                    //移动神灵
                    for (var i = 0; i < game.SeaShenlingNum; ++i) {
                        var index = this._view.scene1.getIndex(i);
                        if (index) {
                            continue;
                        }
                        var shenling = this._view.scene1["shenling" + i];
                        Tween.remove(shenling);
                        shenling.x = this._view.scene1.getPosX(i);
                    }
                    this.setBossVisible(true); //重置显示
                };
                //玩家移动结束
                SeaBossMdr.prototype.onMoveEnd = function () {
                    this._playingMove = false;
                    this.setBossVisible(true); //显示boss相关
                    this.playRoleStand();
                    this.playShenlingStand();
                };
                SeaBossMdr.prototype.setBossVisible = function (visible) {
                    this._view.bar.visible = visible; //设置boss血条显示隐藏
                    this.setSceneVisible(visible);
                };
                //设置场景相关BOSS神灵显示隐藏
                SeaBossMdr.prototype.setSceneVisible = function (visible, moveX) {
                    this._view.scene1.grp_monster.visible = visible;
                    if (moveX) {
                        this._view.scene1.grp_monster.x += moveX;
                    }
                    //设置未激活的神灵显示隐藏
                    for (var i = 0; i < game.SeaShenlingNum; ++i) {
                        var index = this._view.scene1.getIndex(i);
                        if (index) {
                            continue;
                        }
                        var shenling = this._view.scene1["shenling" + i];
                        shenling.visible = visible;
                        if (moveX) {
                            shenling.x += moveX;
                        }
                    }
                };
                return SeaBossMdr;
            }(game.EffectMdrBase));
            yijie.SeaBossMdr = SeaBossMdr;
            __reflect(SeaBossMdr.prototype, "game.mod.yijie.SeaBossMdr", ["base.UpdateItem"]);
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaFubenMainMdr = /** @class */ (function (_super) {
                __extends(SeaFubenMainMdr, _super);
                function SeaFubenMainMdr() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SeaFubenMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(262 /* Sea */);
                };
                SeaFubenMainMdr.prototype.onShow = function () {
                    this.initBtnList();
                    _super.prototype.onShow.call(this);
                    this.checkHide();
                };
                SeaFubenMainMdr.prototype.initBtnList = function () {
                    var type = this._proxy.type;
                    var btnType = "0" + type;
                    var icon = "sea_fuben_tab" + type + "_";
                    var title = "sea_fuben_tips" + type;
                    var hintType = this._proxy.getFubenHintType(type);
                    this._btnData = [
                        {
                            btnType: btnType,
                            icon: icon,
                            mdr: yijie.SeaFubenMdr,
                            title: title,
                            bg: "sea_fuben_bg",
                            hintTypes: hintType,
                        }
                    ];
                };
                SeaFubenMainMdr.prototype.checkHide = function () {
                    //场景返回时，检测副本是否已通关
                    var type = this._proxy.type;
                    var bigGate = this._proxy.bigGate;
                    var isFinish = this._proxy.isFinish(type, bigGate);
                    if (isFinish) {
                        this.onClickBack();
                    }
                };
                return SeaFubenMainMdr;
            }(mod.WndBaseMdr));
            yijie.SeaFubenMainMdr = SeaFubenMainMdr;
            __reflect(SeaFubenMainMdr.prototype, "game.mod.yijie.SeaFubenMainMdr");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var SeaFubenMdr = /** @class */ (function (_super) {
                __extends(SeaFubenMdr, _super);
                function SeaFubenMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", yijie.SeaFubenView);
                    return _this;
                }
                SeaFubenMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                    this._proxy = this.retProxy(262 /* Sea */);
                };
                SeaFubenMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
                };
                SeaFubenMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                };
                SeaFubenMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SeaFubenMdr.prototype.onClickChallenge = function () {
                    var type = this._proxy.type;
                    this._proxy.c2s_huanjingzhihai_click(3 /* Challenge */, type);
                };
                SeaFubenMdr.prototype.updateShow = function () {
                    var type = this._proxy.type;
                    var bigGate = this._proxy.bigGate;
                    var bigGateCfg = this._proxy.getBigGateCfg(type, bigGate);
                    this._view.avatarNameItem.updateShow(bigGateCfg.name);
                    var maxSmallGate = this._proxy.getMaxSmallGate(bigGate);
                    var maxSmallGateCfg = this._proxy.getSmallGateCfg(bigGate, maxSmallGate);
                    this._view.icon.setData(maxSmallGateCfg.show_reward[0]);
                    var smallGate = this._proxy.getSmallGate(type, bigGate);
                    this._view.bar.show(smallGate, maxSmallGate, false, 0, false);
                    var curSmallGate = smallGate + 1; //当前挑战的关卡
                    var smallGateCfg = this._proxy.getSmallGateCfg(bigGate, curSmallGate);
                    if (!smallGateCfg) {
                        return;
                    }
                    this._view.seaRewardItem.setData(smallGateCfg.pass_reward);
                    var gateStr = game.StringUtil.substitute(game.getLanById("sea_tips7" /* sea_tips7 */), [curSmallGate, maxSmallGate]);
                    this._view.lab_gate.text = gateStr;
                    //回到主界面标识 目前用于 挑战幻境之海最后一关，圣界副本 胜利
                    gso.isBackMain = curSmallGate == maxSmallGate;
                    this._itemList.source = smallGateCfg.show_reward;
                    //显示推荐战力
                    var power = smallGateCfg.show_power;
                    this.addBmpFont(power + '', game.BmpTextCfg[100 /* CommonPower */], this._view.grp_font, true, 1, false, 0, true);
                    var curPower = game.RoleVo.ins.showpower.toNumber();
                    this._view.btn_challenge.redPoint.visible = curPower >= smallGateCfg.show_power;
                };
                return SeaFubenMdr;
            }(game.EffectMdrBase));
            yijie.SeaFubenMdr = SeaFubenMdr;
            __reflect(SeaFubenMdr.prototype, "game.mod.yijie.SeaFubenMdr");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaMainMdr = /** @class */ (function (_super) {
                __extends(SeaMainMdr, _super);
                function SeaMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Sea1 */,
                            icon: "sea_tab1_",
                            mdr: yijie.SeaBaseMdr,
                            title: "sea_type_tips1" /* sea_type_tips1 */,
                            openIdx: 1041670245 /* Sea1 */,
                            hintTypes: ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "01" /* Sea1 */],
                        },
                        {
                            btnType: "02" /* Sea2 */,
                            icon: "sea_tab2_",
                            mdr: yijie.SeaBaseMdr,
                            title: "sea_type_tips2" /* sea_type_tips2 */,
                            openIdx: 1041670246 /* Sea2 */,
                            hintTypes: ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "02" /* Sea2 */],
                        },
                        {
                            btnType: "03" /* Sea3 */,
                            icon: "sea_tab3_",
                            mdr: yijie.SeaBaseMdr,
                            title: "sea_type_tips3" /* sea_type_tips3 */,
                            openIdx: 1041670247 /* Sea3 */,
                            hintTypes: ["56" /* Yijie */, "01" /* YijieMain */ + "03" /* Sea */, "03" /* Sea3 */],
                        }
                    ];
                    return _this;
                }
                SeaMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(262 /* Sea */);
                };
                /**分页点击时检测*/
                SeaMainMdr.prototype.onTabCheck = function (index) {
                    var data = this._btnList.source[index];
                    var isOpen = mod.ViewMgr.getIns().checkViewOpen(data.openIdx, true);
                    if (isOpen) {
                        this._proxy.type = parseInt(data.btnType);
                    }
                    return isOpen;
                };
                return SeaMainMdr;
            }(mod.WndBaseMdr));
            yijie.SeaMainMdr = SeaMainMdr;
            __reflect(SeaMainMdr.prototype, "game.mod.yijie.SeaMainMdr");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var TextUtil = game.TextUtil;
            var SeaMdr = /** @class */ (function (_super) {
                __extends(SeaMdr, _super);
                function SeaMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", yijie.SeaView);
                    return _this;
                }
                SeaMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(262 /* Sea */);
                };
                SeaMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_sea1, TouchEvent.TOUCH_TAP, this.onClickSea1);
                    addEventListener(this._view.btn_sea2, TouchEvent.TOUCH_TAP, this.onClickSea2);
                    addEventListener(this._view.btn_sea3, TouchEvent.TOUCH_TAP, this.onClickSea3);
                    addEventListener(this._view.btn_sea4, TouchEvent.TOUCH_TAP, this.onClickSea4);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                };
                SeaMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.updateHint();
                };
                SeaMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SeaMdr.prototype.onClickSea1 = function () {
                    this.checkSea(1041670245 /* Sea1 */, "01" /* Sea1 */);
                };
                SeaMdr.prototype.onClickSea2 = function () {
                    this.checkSea(1041670246 /* Sea2 */, "02" /* Sea2 */);
                };
                SeaMdr.prototype.onClickSea3 = function () {
                    this.checkSea(1041670247 /* Sea3 */, "03" /* Sea3 */);
                };
                SeaMdr.prototype.checkSea = function (openIdx, btnType) {
                    if (!mod.ViewMgr.getIns().checkViewOpen(openIdx, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showView("56" /* Yijie */, "20" /* SeaMain */, btnType);
                };
                SeaMdr.prototype.onClickSea4 = function () {
                    game.PromptBox.getIns().show(game.getLanById("sea_tips1" /* sea_tips1 */));
                };
                SeaMdr.prototype.updateShow = function () {
                    this.updateSea(1041670245 /* Sea1 */, this._view.btn_sea1);
                    this.updateSea(1041670246 /* Sea2 */, this._view.btn_sea2);
                    this.updateSea(1041670247 /* Sea3 */, this._view.btn_sea3);
                };
                SeaMdr.prototype.updateSea = function (openIdx, btn) {
                    var isOpen = mod.ViewMgr.getIns().checkViewOpen(openIdx);
                    var str = TextUtil.addColor(game.getLanById(isOpen ? "sea_tips2" /* sea_tips2 */ : "sea_tips1" /* sea_tips1 */), isOpen ? 8585074 /* GREEN */ : 16773203 /* YELLOW */);
                    var text = btn.labelDisplay;
                    text.textFlow = TextUtil.parseHtml(str);
                };
                /** 通用红点事件监听 */
                SeaMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    var hintType1 = this._proxy.getHintType(1 /* Sea1 */);
                    var hintType2 = this._proxy.getHintType(2 /* Sea2 */);
                    var hintType3 = this._proxy.getHintType(3 /* Sea3 */);
                    if (data.node == mod.HintMgr.getType(hintType1)) {
                        this.updateSeaHint(data.value, this._view.btn_sea1);
                    }
                    else if (data.node == mod.HintMgr.getType(hintType2)) {
                        this.updateSeaHint(data.value, this._view.btn_sea2);
                    }
                    else if (data.node == mod.HintMgr.getType(hintType3)) {
                        this.updateSeaHint(data.value, this._view.btn_sea3);
                    }
                };
                SeaMdr.prototype.updateHint = function () {
                    var hintType1 = this._proxy.getHintType(1 /* Sea1 */);
                    this.updateSeaHint(mod.HintMgr.getHint(hintType1), this._view.btn_sea1);
                    var hintType2 = this._proxy.getHintType(2 /* Sea2 */);
                    this.updateSeaHint(mod.HintMgr.getHint(hintType2), this._view.btn_sea2);
                    var hintType3 = this._proxy.getHintType(3 /* Sea3 */);
                    this.updateSeaHint(mod.HintMgr.getHint(hintType3), this._view.btn_sea3);
                };
                SeaMdr.prototype.updateSeaHint = function (hint, btn) {
                    btn.redPoint.visible = hint;
                };
                return SeaMdr;
            }(game.MdrBase));
            yijie.SeaMdr = SeaMdr;
            __reflect(SeaMdr.prototype, "game.mod.yijie.SeaMdr");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var SeaRankMainMdr = /** @class */ (function (_super) {
                __extends(SeaRankMainMdr, _super);
                function SeaRankMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Sea1 */,
                            icon: "sea_rank_tab1_",
                            mdr: yijie.SeaRankMdr,
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                            openIdx: 1041670245 /* Sea1 */
                        },
                        {
                            btnType: "02" /* Sea2 */,
                            icon: "sea_rank_tab2_",
                            mdr: yijie.SeaRankMdr,
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                            openIdx: 1041670246 /* Sea2 */
                        },
                        {
                            btnType: "03" /* Sea3 */,
                            icon: "sea_rank_tab3_",
                            mdr: yijie.SeaRankMdr,
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                            openIdx: 1041670247 /* Sea3 */
                        }
                    ];
                    return _this;
                }
                SeaRankMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(262 /* Sea */);
                };
                /**更新list数据*/
                SeaRankMainMdr.prototype.updateBtnList = function () {
                    var list = [];
                    var mdrs = [];
                    //重写，未开启时候不显示
                    for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                        var data = _a[_i];
                        var type = parseInt(data.btnType);
                        if (!this._proxy.isEnter(type)) {
                            continue;
                        }
                        var hintType = this._proxy.getRankHintType(type);
                        data.hintTypes = hintType;
                        mdrs.push(data.mdr);
                        list.push(data);
                    }
                    this._btnList.source = list;
                    this._tab.mdrClsList = mdrs;
                };
                /**分页点击时检测*/
                SeaRankMainMdr.prototype.onTabCheck = function (index) {
                    var data = this._btnList.source[index];
                    this._proxy.rankType = parseInt(data.btnType);
                    return true;
                };
                return SeaRankMainMdr;
            }(mod.WndBaseMdr));
            yijie.SeaRankMainMdr = SeaRankMainMdr;
            __reflect(SeaRankMainMdr.prototype, "game.mod.yijie.SeaRankMainMdr");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var ArrayCollection = eui.ArrayCollection;
            var Handler = base.Handler;
            var facade = base.facade;
            var SeaRankMdr = /** @class */ (function (_super) {
                __extends(SeaRankMdr, _super);
                function SeaRankMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    return _this;
                }
                SeaRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(262 /* Sea */);
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankRewardRender;
                    this._view.list_rank.dataProvider = this._itemList;
                };
                SeaRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    this.onNt("on_sea_rank_update" /* ON_SEA_RANK_UPDATE */, this.updateShow, this);
                    this.onNt("on_sea_info_update" /* ON_SEA_INFO_UPDATE */, this.updateReward, this);
                };
                SeaRankMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.reqRankInfo();
                    this.initShow();
                    this.updateShow();
                    this.updateReward();
                    this.updateTime();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                SeaRankMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                SeaRankMdr.prototype.onClickReward = function () {
                    if (!this._canDraw) {
                        game.PromptBox.getIns().show(game.getLanById("shoulie_point" /* shoulie_point */));
                        return;
                    }
                    var type = this._proxy.rankType;
                    this._proxy.c2s_huanjingzhihai_click(6 /* RankReward */, type);
                };
                SeaRankMdr.prototype.reqRankInfo = function () {
                    var type = this._proxy.rankType;
                    this._proxy.c2s_huanjingzhihai_click(5 /* Rank */, type);
                };
                SeaRankMdr.prototype.initShow = function () {
                    this._view.timeItem.visible = true;
                    this._view.btn_reward.visible = true;
                    this._view.img_type2.source = "leijijibai";
                    this._view.img_type3.source = "paimingjiangli";
                };
                SeaRankMdr.prototype.updateShow = function () {
                    var type = this._proxy.rankType;
                    var topInfo = this._proxy.getTopRank(type);
                    if (topInfo && topInfo.value) {
                        //场景排行榜做上榜限制
                        this.updateRankUIRole(this._view.grp_eff, topInfo);
                    }
                    var myRankInfo = this._proxy.getMyRank(type);
                    var cfg = game.getConfigByNameId("huanjingzhihai_index.json" /* HuanjingzhihaiIndex */, type);
                    var limit = cfg.rank_limit;
                    var curIndex = this._proxy.getBossIndex(type);
                    var rankStr = "";
                    if (curIndex <= limit) {
                        //上榜条件: 累计击败%s次BOSS上榜
                        rankStr = game.StringUtil.substitute(game.getLanById("sea_tips13" /* sea_tips13 */), [game.StringUtil.getHurtNumStr(limit)]);
                    }
                    else {
                        rankStr = game.getLanById("tishi_12" /* tishi_12 */) + "："; //我的排行：
                        if (myRankInfo && myRankInfo.rank_num) {
                            var maxRank = this._proxy.getMaxRank(type);
                            rankStr += myRankInfo.rank_num <= maxRank ? myRankInfo.rank_num : maxRank + "+"; //10+
                        }
                        else {
                            rankStr += game.getLanById("tishi_13" /* tishi_13 */); //未上榜
                        }
                    }
                    this._view.lab_rank.text = rankStr;
                    var count = myRankInfo && myRankInfo.value ? myRankInfo.value.toNumber() : 0;
                    this._view.lab_num.text = game.getLanById("sea_tips14" /* sea_tips14 */) + "：" + game.StringUtil.getHurtNumStr(count); //我的击败：0
                    var ranks = this._proxy.getRankList(type);
                    var infos = [];
                    var cfgList = game.getConfigByNameId("huanjingzhihai_boss_rank.json" /* HuanjingzhihaiBossRank */, type);
                    for (var k in cfgList) {
                        var cfg_1 = cfgList[k];
                        var rankStart = cfg_1.ranks[0];
                        var rankEnd = cfg_1.ranks[1];
                        var rankStr_1 = rankStart + "";
                        var name = "";
                        var hurtStr = "";
                        var reward = cfg_1.rewards.slice(0, 3);
                        var lookHandler = null;
                        if (rankStart != rankEnd) {
                            //4-10
                            var nextIndex = parseInt(k) + 1;
                            var nextCfg = cfgList[nextIndex];
                            rankStr_1 = nextCfg ? rankStart + "-" + rankEnd : (rankStart - 1) + "+"; //11-50或者50+
                            if (nextCfg) {
                                lookHandler = Handler.alloc(this, this.onClickRank, [rankStart, rankEnd]);
                            }
                        }
                        else {
                            var rankInfo = ranks.length >= rankStart ? ranks[rankStart - 1] : null;
                            if (rankInfo) {
                                name = rankInfo.name;
                                hurtStr = game.StringUtil.getHurtNumStr(rankInfo.value.toNumber());
                            }
                            else {
                                name = game.getLanById("tishi_2" /* tishi_2 */); //虚位以待
                            }
                        }
                        var info = {
                            rank: rankStart,
                            rankStr: rankStr_1,
                            name: name,
                            hurtStr: hurtStr,
                            reward: reward,
                            lookHandler: lookHandler
                        };
                        infos.push(info);
                    }
                    this._itemList.replaceAll(infos);
                };
                SeaRankMdr.prototype.updateReward = function () {
                    var type = this._proxy.rankType;
                    this._canDraw = !this._proxy.isRankRewardDraw(type);
                    this._view.btn_reward.redPoint.visible = this._canDraw;
                    this._view.btn_reward.iconDisplay.source = this._canDraw ? "box_close" : "box_open";
                };
                SeaRankMdr.prototype.update = function (time) {
                    this.updateTime();
                };
                SeaRankMdr.prototype.updateTime = function () {
                    var endTime = game.TimeUtil.getNextWeekTime();
                    var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    this._view.timeItem.updateLeftTime(leftTime);
                };
                SeaRankMdr.prototype.onClickRank = function (rankStart, rankEnd) {
                    facade.showView("56" /* Yijie */, "27" /* SeaRankSection */, { start: rankStart, end: rankEnd });
                };
                return SeaRankMdr;
            }(game.EffectMdrBase));
            yijie.SeaRankMdr = SeaRankMdr;
            __reflect(SeaRankMdr.prototype, "game.mod.yijie.SeaRankMdr", ["base.UpdateItem"]);
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var SeaRankSectionMdr = /** @class */ (function (_super) {
                __extends(SeaRankSectionMdr, _super);
                function SeaRankSectionMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.RankSectionView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SeaRankSectionMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list.itemRenderer = mod.RankSectionItem;
                    this._view.list.dataProvider = this._itemList;
                    this._proxy = this.retProxy(262 /* Sea */);
                };
                SeaRankSectionMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                };
                SeaRankSectionMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.secondPop.updateTitleStr(game.getLanById("pass_rank" /* pass_rank */));
                    this._view.img_type2.source = "leijijibai";
                    this._start = this._showArgs && this._showArgs.start;
                    this._end = this._showArgs && this._showArgs.end;
                    this.updateRank();
                };
                SeaRankSectionMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                //当前排名
                SeaRankSectionMdr.prototype.updateRank = function () {
                    var type = this._proxy.rankType;
                    var myRankInfo = this._proxy.getMyRank(type);
                    var rankStr = game.getLanById("tishi_12" /* tishi_12 */) + "："; //我的排行：
                    if (myRankInfo && myRankInfo.rank_num) {
                        var maxRank = this._proxy.getMaxRank(type);
                        rankStr += myRankInfo.rank_num <= maxRank ? myRankInfo.rank_num : maxRank + "+"; //10+
                    }
                    else {
                        rankStr += game.getLanById("tishi_13" /* tishi_13 */); //未上榜
                    }
                    this._view.lab_rank.text = rankStr;
                    var count = myRankInfo && myRankInfo.value ? myRankInfo.value.toNumber() : 0;
                    this._view.lab_score.text = game.getLanById("sea_tips14" /* sea_tips14 */) + "：" + game.StringUtil.getHurtNumStr(count); //我的击败：0
                    var ranks = this._proxy.getRankList(type);
                    var rankList = [];
                    for (var _i = 0, ranks_1 = ranks; _i < ranks_1.length; _i++) {
                        var rankInfo = ranks_1[_i];
                        if (rankInfo.rank_num >= this._start && rankInfo.rank_num <= this._end) {
                            rankList.push(rankInfo);
                        }
                    }
                    var showRank = this._end - this._start + 1;
                    var list = [];
                    for (var i = 0; i < showRank; ++i) {
                        var rankInfo = rankList.length > i ? rankList[i] : null;
                        var rankNo = this._start ? i + this._start : i + 1;
                        var rankData = {
                            rank: rankNo,
                            name: rankInfo ? rankInfo.name : game.getLanById("tishi_2" /* tishi_2 */),
                            value: rankInfo && rankInfo.value ? rankInfo.value.toString() : ""
                        };
                        list.push(rankData);
                    }
                    if (this._itemList.source.length) {
                        this._itemList.replaceAll(list);
                    }
                    else {
                        this._itemList.source = list;
                    }
                };
                return SeaRankSectionMdr;
            }(game.MdrBase));
            yijie.SeaRankSectionMdr = SeaRankSectionMdr;
            __reflect(SeaRankSectionMdr.prototype, "game.mod.yijie.SeaRankSectionMdr");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var SeaRewardMdr = /** @class */ (function (_super) {
                __extends(SeaRewardMdr, _super);
                function SeaRewardMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yijie.SeaRewardView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SeaRewardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(262 /* Sea */);
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                    var type = this._proxy.type;
                    var titleStr = game.getLanById("sea_reward_tips" + type);
                    this._view.secondPop.updateTitleStr(titleStr);
                };
                SeaRewardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_draw, TouchEvent.TOUCH_TAP, this.onClickDraw);
                    this.onNt("on_sea_info_update" /* ON_SEA_INFO_UPDATE */, this.updateState, this);
                };
                SeaRewardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.removeEft();
                    this.addEftByParent("xingkongguding" /* XingKongGuDing */, this._view.group_eft);
                };
                SeaRewardMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                SeaRewardMdr.prototype.onClickDraw = function () {
                    var type = this._proxy.type;
                    this._proxy.c2s_huanjingzhihai_click(2 /* Reward */, type);
                };
                SeaRewardMdr.prototype.updateShow = function () {
                    var type = this._proxy.type;
                    var cfg = game.getConfigByNameId("huanjingzhihai_index.json" /* HuanjingzhihaiIndex */, type);
                    var bigGate = this._proxy.getCurBigGate(type);
                    var smallGate = this._proxy.getPassSmallGate(type);
                    var smallGateCfg = this._proxy.getSmallGateCfg(bigGate, smallGate);
                    if (!smallGateCfg) {
                        smallGateCfg = this._proxy.getSmallGateCfg(bigGate, smallGate + 1); //防报错处理
                    }
                    this._view.seaRewardItem.setData(smallGateCfg.pass_reward);
                    var startTime = this._proxy.getStartTime(type);
                    //累计挂机时间
                    var hour = 0;
                    if (startTime) {
                        var time = TimeMgr.time.serverTimeSecond - startTime;
                        hour = Math.floor(time / 3600);
                    }
                    var rate = 0;
                    if (hour) {
                        if (hour < cfg.per_time) {
                            rate = cfg.per_time;
                        }
                        else if (cfg.per_time < hour && hour < cfg.max_time) {
                            rate = hour;
                        }
                        else {
                            rate = cfg.max_time;
                        }
                    }
                    else {
                        rate = 0;
                    }
                    //对数据进行修改
                    var data = smallGateCfg.pass_reward.concat();
                    for (var i = 0; i < data.length; i++) {
                        data[i] = smallGateCfg.pass_reward[i].concat();
                        data[i][1] = data[i][1] * rate;
                    }
                    this._itemList.source = data;
                    var isOpen = this._proxy.isRewardOpen(type);
                    if (!isOpen) {
                        this._view.currentState = "lock";
                        this._view.lab_tips.text = cfg.desc;
                    }
                    else {
                        this.updateState();
                    }
                };
                SeaRewardMdr.prototype.updateState = function () {
                    var type = this._proxy.type;
                    var canDraw = this._proxy.canRewardDraw(type);
                    if (canDraw) {
                        this._view.currentState = "draw";
                        this._view.btn_draw.redPoint.visible = true;
                    }
                    else {
                        this._view.currentState = "time";
                        TimeMgr.addUpdateItem(this, 1000);
                        this.updateTime();
                    }
                };
                SeaRewardMdr.prototype.update = function (time) {
                    this.updateTime();
                };
                SeaRewardMdr.prototype.updateTime = function () {
                    var type = this._proxy.type;
                    var nextTime = this._proxy.getNextTime(type);
                    this._view.timeItem.updateTime(nextTime, game.getLanById("sea_tips9" /* sea_tips9 */));
                    var leftTime = nextTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        TimeMgr.removeUpdateItem(this);
                        this.updateState();
                    }
                };
                return SeaRewardMdr;
            }(game.EffectMdrBase));
            yijie.SeaRewardMdr = SeaRewardMdr;
            __reflect(SeaRewardMdr.prototype, "game.mod.yijie.SeaRewardMdr", ["base.UpdateItem"]);
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TimeMgr = base.TimeMgr;
            var SeaSceneMdr = /** @class */ (function (_super) {
                __extends(SeaSceneMdr, _super);
                function SeaSceneMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", yijie.SeaSceneView);
                    return _this;
                }
                SeaSceneMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.percentHeight = 100;
                    this._view.percentWidth = 100;
                    this._view.touchEnabled = false;
                };
                SeaSceneMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_scene_damage_update" /* ON_SCENE_DAMAGE_UPDATE */, this.onDamageUpdate, this);
                };
                SeaSceneMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateTime();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                SeaSceneMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                SeaSceneMdr.prototype.onDamageUpdate = function (n) {
                    var msg = n.body;
                    this.updateDamage(msg);
                };
                SeaSceneMdr.prototype.update = function (time) {
                    this.updateTime();
                };
                SeaSceneMdr.prototype.updateTime = function () {
                    var endTime = mod.SceneUtil.getEndTime();
                    if (!endTime) {
                        return;
                    }
                    var curTime = TimeMgr.time.serverTimeSecond;
                    var leftTime = endTime - curTime;
                    this._view.lab_time.text = game.TimeUtil.formatSecond(leftTime, "mm:ss");
                    if (leftTime <= 0) {
                        mod.SceneUtil.clickExit();
                        TimeMgr.removeUpdateItem(this);
                    }
                };
                SeaSceneMdr.prototype.updateDamage = function (info) {
                    var allDamage = Long.fromValue(0);
                    if (info.damage_list && info.damage_list.length) {
                        for (var _i = 0, _a = info.damage_list; _i < _a.length; _i++) {
                            var i = _a[_i];
                            allDamage = allDamage.add(i.damage);
                        }
                    }
                    this._view.lab_damage.text = game.StringUtil.getHurtNumStr(allDamage.toNumber()); //总伤害：
                };
                return SeaSceneMdr;
            }(game.MdrBase));
            yijie.SeaSceneMdr = SeaSceneMdr;
            __reflect(SeaSceneMdr.prototype, "game.mod.yijie.SeaSceneMdr", ["base.UpdateItem"]);
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var ArrayCollection = eui.ArrayCollection;
            var SeaTaskMdr = /** @class */ (function (_super) {
                __extends(SeaTaskMdr, _super);
                function SeaTaskMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yijie.SeaTaskView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SeaTaskMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(262 /* Sea */);
                    this._taskList = new ArrayCollection();
                    this._view.list_task.itemRenderer = mod.TaskRenderIcon;
                    this._view.list_task.dataProvider = this._taskList;
                };
                SeaTaskMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_task_update" /* ON_TASK_UPDATE */, this.onTaskUpdate, this);
                    this.onNt("on_view_hide" /* ON_VIEW_HIDE */, this.hide, this);
                };
                SeaTaskMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateTaskList();
                };
                SeaTaskMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SeaTaskMdr.prototype.onTaskUpdate = function (n) {
                    var types = n.body;
                    var taskType = game.SeaTypeToTaskType[this._proxy.type];
                    if (types.indexOf(taskType) > -1) {
                        this.updateTaskList();
                    }
                };
                SeaTaskMdr.prototype.updateTaskList = function () {
                    var taskType = game.SeaTypeToTaskType[this._proxy.type];
                    var tasks = mod.TaskUtil.getTaskList(taskType);
                    if (this._taskList.source.length > 0) {
                        this._taskList.replaceAll(tasks);
                    }
                    else {
                        this._taskList.source = tasks;
                    }
                    if (tasks.length <= 0) {
                        this.hide();
                    }
                };
                return SeaTaskMdr;
            }(game.MdrBase));
            yijie.SeaTaskMdr = SeaTaskMdr;
            __reflect(SeaTaskMdr.prototype, "game.mod.yijie.SeaTaskMdr");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var yijie_boss_data = msg.yijie_boss_data;
            var YijieBossListMdr = /** @class */ (function (_super) {
                __extends(YijieBossListMdr, _super);
                function YijieBossListMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yijie.YijieBossListView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YijieBossListMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = yijie.YijieBossItem;
                    this._view.list_item.dataProvider = this._itemList;
                    this._proxy = this.retProxy(220 /* Yijie */);
                };
                YijieBossListMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.hide, this);
                    this.onNt("boss_list_info_update" /* BOSS_LIST_INFO_UPDATE */, this.updateBoss, this);
                };
                YijieBossListMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._type = this._showArgs;
                    this.reqBossInfo();
                    this.updateBoss();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                YijieBossListMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                /**更新boss*/
                YijieBossListMdr.prototype.updateBoss = function () {
                    var bossList = this._proxy.bossList.concat();
                    game.SortTools.sortMap(bossList, "index"); //排序
                    if (this._type != 2 /* YonghengYijie */ && bossList.length < game.YijieBossNum) {
                        var stage = bossList.length ? bossList[0].stage : 1;
                        var info = new yijie_boss_data(); //显示稀有boss
                        info.stage = stage;
                        info.index = game.YijieBossNum;
                        info.recover_time = Long.fromValue(-1); //-1表示未刷新
                        bossList.push(info);
                    }
                    if (this._itemList.source.length) {
                        this._itemList.replaceAll(bossList);
                    }
                    else {
                        this._itemList.source = bossList;
                    }
                };
                YijieBossListMdr.prototype.update = function (time) {
                    this.reqBossInfo();
                };
                YijieBossListMdr.prototype.reqBossInfo = function () {
                    if (this._type == 2 /* YonghengYijie */) {
                        this._proxy.c2s_yongheng_boss_info();
                        return;
                    }
                    this._proxy.c2s_yijie_boss_info();
                };
                return YijieBossListMdr;
            }(game.MdrBase));
            yijie.YijieBossListMdr = YijieBossListMdr;
            __reflect(YijieBossListMdr.prototype, "game.mod.yijie.YijieBossListMdr", ["base.UpdateItem"]);
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var YijieBossMdr = /** @class */ (function (_super) {
                __extends(YijieBossMdr, _super);
                function YijieBossMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yijie.YijieBossView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YijieBossMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._sceneProxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                    this._proxy = this.retProxy(220 /* Yijie */);
                };
                YijieBossMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_goto, TouchEvent.TOUCH_TAP, this.onClickGoto);
                };
                YijieBossMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateBoss();
                };
                YijieBossMdr.prototype.onHide = function () {
                    this._effId = 0;
                    _super.prototype.onHide.call(this);
                };
                YijieBossMdr.prototype.onClickGoto = function () {
                    var info = this._showArgs;
                    this._sceneProxy.requestMonster(info.entity_id);
                    this.hide();
                };
                YijieBossMdr.prototype.updateBoss = function () {
                    var info = this._showArgs;
                    var stage = info.stage;
                    var index = info.index;
                    var cfg = this._proxy.getBossCfg(stage, index);
                    if (this._effId) {
                        this.removeEffect(this._effId);
                    }
                    var monsterIndex = cfg.monster_index[0];
                    this._effId = this.addMonster(monsterIndex, this._view.grp_eff);
                };
                return YijieBossMdr;
            }(game.EffectMdrBase));
            yijie.YijieBossMdr = YijieBossMdr;
            __reflect(YijieBossMdr.prototype, "game.mod.yijie.YijieBossMdr");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var ArrayCollection = eui.ArrayCollection;
            var YijieLuckyMdr = /** @class */ (function (_super) {
                __extends(YijieLuckyMdr, _super);
                function YijieLuckyMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yijie.YijieLuckyView);
                    _this._showPoint = false; //是否显示点数
                    _this.TIME_TICK = 10; //10秒
                    _this.isEasyHide = true;
                    return _this;
                }
                YijieLuckyMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(220 /* Yijie */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = yijie.YijieLuckyItem;
                    this._view.list_item.dataProvider = this._itemList;
                };
                YijieLuckyMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                };
                YijieLuckyMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateReward();
                    this.updateViewState();
                };
                YijieLuckyMdr.prototype.onHide = function () {
                    this._showPoint = false;
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                YijieLuckyMdr.prototype.onClickReward = function () {
                    this.changeShowPoint();
                };
                YijieLuckyMdr.prototype.changeShowPoint = function () {
                    this._showPoint = true;
                    this.updateViewState();
                    TimeMgr.removeUpdateItem(this);
                };
                YijieLuckyMdr.prototype.updateReward = function () {
                    var info = this._showArgs;
                    var stage = info.stage;
                    var index = info.index;
                    var cfg = this._proxy.getBossCfg(stage, index);
                    var rewardIndex = cfg.rare_reward_show;
                    this._view.icon.setData(rewardIndex);
                    this._view.lab_name.textFlow = this._view.icon.getPropName();
                };
                YijieLuckyMdr.prototype.updateViewState = function () {
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
                YijieLuckyMdr.prototype.updateInfo = function () {
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
                YijieLuckyMdr.prototype.updateTime = function () {
                    var tipsStr = game.getLanById("yijie_tips10" /* yijie_tips10 */) + "\n" + game.TextUtil.addColor(this._time + game.getLanById("yijie_tips11" /* yijie_tips11 */), 2330156 /* GREEN */);
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(tipsStr);
                };
                YijieLuckyMdr.prototype.update = function (time) {
                    this._time--;
                    if (this._time <= 0) {
                        this.changeShowPoint();
                    }
                    this.updateTime();
                };
                return YijieLuckyMdr;
            }(game.MdrBase));
            yijie.YijieLuckyMdr = YijieLuckyMdr;
            __reflect(YijieLuckyMdr.prototype, "game.mod.yijie.YijieLuckyMdr", ["base.UpdateItem"]);
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var Handler = base.Handler;
            var Event = egret.Event;
            var YijieMdr = /** @class */ (function (_super) {
                __extends(YijieMdr, _super);
                function YijieMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", yijie.YijieView);
                    return _this;
                }
                YijieMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(220 /* Yijie */);
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                    this._bossList = new ArrayCollection();
                    this._view.list_boss.itemRenderer = yijie.YijieItem;
                    this._view.list_boss.dataProvider = this._bossList;
                };
                YijieMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_boss, Event.CHANGING, this.onClickBoss);
                    addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    addEventListener(this._view.btn_magic, TouchEvent.TOUCH_TAP, this.onClickMagic);
                    addEventListener(this._view.btn_rule, TouchEvent.TOUCH_TAP, this.onClickRule);
                    addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
                    addEventListener(this._view.checkbox, TouchEvent.TOUCH_TAP, this.onClickCheckbox);
                    this.onNt("on_yijie_info_update" /* ON_YIJIE_INFO_UPDATE */, this.onInfoUpdate, this);
                    this.onNt("on_yijie_sel_update" /* ON_YIJIE_SEL_UPDATE */, this.onSelUpdate, this);
                    this.onNt("update_boss_list" /* UPDATE_BOSS_lIST */, this.reqBossInfo, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateIndex, this);
                };
                YijieMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.curType = 1 /* Yijie */;
                    this._selIndex = 0;
                    this.reqBossInfo();
                    this.updateItemList();
                    this.indexUpdateInfo();
                    this.updateCount();
                    this.updateSel();
                    this.updateCost();
                    TimeMgr.addUpdateItem(this, 1000);
                    this._view.btn_gift.visible = mod.PayUtil.checkShowGift(100014 /* Id100014 */);
                    this._view.currentState = "1";
                    this._view.checkBoxNvpu.updateShow(3 /* Yijie */);
                };
                YijieMdr.prototype.onHide = function () {
                    this._effId = 0;
                    this._lastIndex = 0;
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                YijieMdr.prototype.onClickBoss = function (e) {
                    var index = this._view.list_boss.selectedIndex;
                    if (index == this._selIndex) {
                        return;
                    }
                    var cfg = this._view.list_boss.selectedItem;
                    if (!this._proxy.isBossOpen(cfg, true)) {
                        e.preventDefault();
                        return;
                    }
                    this._selIndex = index;
                    this.indexUpdateInfo();
                };
                YijieMdr.prototype.onClickGift = function () {
                    mod.ViewMgr.getIns().showGift(100014 /* Id100014 */);
                };
                YijieMdr.prototype.onClickReward = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    var tipStr1 = game.TextUtil.addColor(game.getLanById("yijie_tips1" /* yijie_tips1 */), 3496307 /* DEFAULT */);
                    var tipStr2 = game.TextUtil.addColor(game.getLanById("yijie_tips2" /* yijie_tips2 */), 3496307 /* DEFAULT */);
                    var tips = [tipStr1, tipStr2];
                    mod.ViewMgr.getIns().bossReward(this._selCfg.reward_big, tips);
                };
                YijieMdr.prototype.onClickMagic = function () {
                    mod.ViewMgr.getIns().showViewByID(33 /* Consecrate */);
                };
                YijieMdr.prototype.onClickRule = function () {
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("yijie_tips" /* yijie_tips */));
                };
                YijieMdr.prototype.onClickChallenge = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    mod.SceneUtil.setReward(120 /* Yijie */, this._selCfg.reward_big);
                    this._proxy.c2s_yijie_boss_challenge(this._selCfg["stage"]); //字段定义没导出
                };
                YijieMdr.prototype.onClickCheckbox = function () {
                    var _this = this;
                    if (this._view.checkbox.selected) {
                        //勾选时提示确认
                        mod.ViewMgr.getIns().showConfirm(game.getLanById("yijie_open_tips" /* yijie_open_tips */), Handler.alloc(this, function () {
                            _this._proxy.c2s_yijie_sanbei();
                        }), Handler.alloc(this, function () {
                            _this._view.checkbox.selected = false;
                        }));
                    }
                    else {
                        this._proxy.c2s_yijie_sanbei();
                    }
                };
                YijieMdr.prototype.onInfoUpdate = function () {
                    this.updateItemList();
                    this.updateCount();
                    this.updateSel();
                };
                YijieMdr.prototype.onSelUpdate = function () {
                    this.updateCost();
                    this.updateSel();
                };
                /** 通用背包事件监听 */
                YijieMdr.prototype.onBagUpdateIndex = function (n) {
                    var indexs = n.body;
                    if (indexs.indexOf(this._costIdx) < 0) {
                        return;
                    }
                    this.updateCost();
                };
                YijieMdr.prototype.updateItemList = function () {
                    var bossList = this._proxy.getBossList();
                    if (this._bossList.source.length) {
                        this._bossList.replaceAll(bossList);
                    }
                    else {
                        this._bossList.source = bossList;
                    }
                    this._view.list_boss.selectedIndex = this._selIndex;
                };
                YijieMdr.prototype.indexUpdateInfo = function () {
                    var bossList = this._proxy.getBossList();
                    this._selCfg = bossList[this._selIndex];
                    this._selInfo = this._proxy.getBossInfo(this._selCfg["stage"]); //字段定义没导出
                    if (!this._selCfg) {
                        return;
                    }
                    this.updateBoss();
                    this.updateReward();
                };
                YijieMdr.prototype.updateBoss = function () {
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
                YijieMdr.prototype.updateReward = function () {
                    var index = this._selCfg.reward_big;
                    var cfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, index);
                    this._itemList.source = cfg.content.slice(0, 8); //取前面奖励
                };
                YijieMdr.prototype.updateCount = function () {
                    var cnt = this._proxy.count;
                    var fontStr = cnt + "";
                    this.addBmpFont(fontStr, game.BmpTextCfg[214 /* XianYu1 */], this._view.grp_cnt, true, 0.8, true);
                };
                YijieMdr.prototype.updateSel = function () {
                    var isAct = mod.RoleUtil.isRoleRingAct(2 /* Type2 */);
                    this._view.checkbox.visible = isAct;
                    if (isAct) {
                        this._view.checkbox.selected = this._proxy.selState;
                    }
                };
                YijieMdr.prototype.updateCost = function () {
                    var cost = this._proxy.getCost();
                    var index = cost[0];
                    var cnt = cost[1];
                    this._costIdx = index;
                    this._view.cost.updateShow([index, cnt]);
                };
                YijieMdr.prototype.reqBossInfo = function () {
                    this._proxy.c2s_yijie_open_ui();
                };
                YijieMdr.prototype.update = function (time) {
                    var len = this._view.list_boss.numChildren;
                    for (var i = 0; i < len; ++i) {
                        var item = this._view.list_boss.getChildAt(i);
                        item.updateTime();
                    }
                };
                return YijieMdr;
            }(game.EffectMdrBase));
            yijie.YijieMdr = YijieMdr;
            __reflect(YijieMdr.prototype, "game.mod.yijie.YijieMdr", ["base.UpdateItem"]);
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var Handler = base.Handler;
            var TextEvent = egret.TextEvent;
            var delayCall = base.delayCall;
            var YijieResultMdr = /** @class */ (function (_super) {
                __extends(YijieResultMdr, _super);
                function YijieResultMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yijie.YijieResultView);
                    _this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    return _this;
                }
                YijieResultMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(220 /* Yijie */);
                };
                YijieResultMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.lab_goto, TextEvent.LINK, this.onClickGoto);
                };
                YijieResultMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    this._view.closeTips.visible = false;
                    this.updateReward();
                    this.updateShow();
                };
                YijieResultMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YijieResultMdr.prototype.onClickGoto = function () {
                    this.hide();
                    mod.ViewMgr.getIns().showViewByID(38 /* RoleRing */);
                };
                //显示奖励
                YijieResultMdr.prototype.updateReward = function () {
                    var info = this._showArgs;
                    this._view.resultReward.updateRewardList(info.reward, Handler.alloc(this, this.onRewardTweenEnd));
                };
                YijieResultMdr.prototype.updateShow = function () {
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(game.getLanById("yijie_tips17" /* yijie_tips17 */));
                    var isAct = mod.RoleUtil.isRoleRingAct(2 /* Type2 */);
                    this._view.currentState = isAct ? "act" : "notAct";
                    if (!isAct) {
                        var actStr = game.getLanById("yijie_tips13" /* yijie_tips13 */);
                        this._view.lab_act.text = actStr;
                        this._view.lab_goto.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(game.getLanById("go_act" /* go_act */), 8585074 /* GREEN */, ""));
                    }
                };
                /**********************奖励表现相关**********************/
                //结束动画后执行
                YijieResultMdr.prototype.onRewardTweenEnd = function () {
                    var _this = this;
                    this._view.closeTips.visible = true;
                    this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
                    delayCall(Handler.alloc(this, function () {
                        _this.isEasyHide = true; //动画表现结束后设置为可点击
                    }), 200);
                };
                return YijieResultMdr;
            }(game.MdrBase));
            yijie.YijieResultMdr = YijieResultMdr;
            __reflect(YijieResultMdr.prototype, "game.mod.yijie.YijieResultMdr");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var Tween = base.Tween;
            var YijieSceneMdr = /** @class */ (function (_super) {
                __extends(YijieSceneMdr, _super);
                function YijieSceneMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", yijie.YijieSceneView);
                    return _this;
                }
                YijieSceneMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.percentHeight = 100;
                    this._view.percentWidth = 100;
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(220 /* Yijie */);
                };
                YijieSceneMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    addEventListener(this._view.btn_rateBoss, TouchEvent.TOUCH_TAP, this.onClickRateBoss);
                    addEventListener(this._view.btn_boss, TouchEvent.TOUCH_TAP, this.onClickBoss);
                    this.onNt("on_yijie_scene_update" /* ON_YIJIE_SCENE_UPDATE */, this.updateInfo, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateIndex, this);
                };
                YijieSceneMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateGiftTips();
                    this.updateInfo();
                    this.updateCost();
                };
                YijieSceneMdr.prototype.onHide = function () {
                    this.removeTipsTween();
                    _super.prototype.onHide.call(this);
                };
                YijieSceneMdr.prototype.onClickGift = function () {
                    this.setGiftTips(false);
                    mod.ViewMgr.getIns().showGift(100015 /* Id100015 */);
                };
                YijieSceneMdr.prototype.onClickReward = function () {
                    this._proxy.c2s_yijie_show_reward();
                };
                YijieSceneMdr.prototype.onClickRateBoss = function () {
                    var value = this._proxy.bossValue;
                    var maxValue = this._proxy.getBossMaxValue();
                    var cnt = maxValue - value;
                    var tipsStr = game.StringUtil.substitute(game.getLanById("yijie_tips5" /* yijie_tips5 */), [cnt]);
                    game.PromptBox.getIns().show(tipsStr);
                };
                YijieSceneMdr.prototype.onClickBoss = function () {
                    mod.ViewMgr.getIns().showSecondPop("56" /* Yijie */, "06" /* YijieBossList */);
                };
                /** 通用背包事件监听 */
                YijieSceneMdr.prototype.onBagUpdateIndex = function (n) {
                    var indexs = n.body;
                    if (indexs.indexOf(this._costIdx) < 0) {
                        return;
                    }
                    this.updateCost();
                };
                YijieSceneMdr.prototype.updateGiftTips = function () {
                    var productId = 100015 /* Id100015 */;
                    var showGift = mod.PayUtil.checkShowGift(productId);
                    this._view.grp_gift.visible = showGift;
                    if (showGift) {
                        var hasBuy = mod.PayUtil.hasBuy(productId);
                        this.setGiftTips(!hasBuy);
                        var cfgList = mod.PayUtil.getPrivilegeCfgList(productId);
                        var cfg = cfgList && cfgList[0] || null;
                        var addVal = cfg && cfg.yijie_xianchong_count || 5;
                        var addStr = game.getLanById("yijie_tips3" /* yijie_tips3 */) + "+" + addVal;
                        this._view.lab_add.text = addStr;
                    }
                };
                YijieSceneMdr.prototype.setGiftTips = function (show) {
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
                YijieSceneMdr.prototype.removeTipsTween = function () {
                    Tween.remove(this._view.img_tips);
                };
                YijieSceneMdr.prototype.updateInfo = function () {
                    var luckyStr = game.getLanById("yijie_tips3" /* yijie_tips3 */) + "：" + game.TextUtil.addColor(this._proxy.count + "", 8585074 /* GREEN */);
                    this._view.lab_lucky.textFlow = game.TextUtil.parseHtml(luckyStr);
                    var cntStr = game.getLanById("yijie_tips4" /* yijie_tips4 */) + "：" + game.TextUtil.addColor(this._proxy.memberNum + "", 8585074 /* GREEN */);
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                    var value = this._proxy.bossValue;
                    var maxValue = this._proxy.getBossMaxValue();
                    this._view.bar.show(value, maxValue, false, 0, false);
                };
                YijieSceneMdr.prototype.updateCost = function () {
                    var cost = this._proxy.getCost();
                    var index = cost[0];
                    var cnt = cost[1];
                    this._costIdx = index;
                    this._view.cost.updateShow([index, cnt]);
                };
                return YijieSceneMdr;
            }(game.MdrBase));
            yijie.YijieSceneMdr = YijieSceneMdr;
            __reflect(YijieSceneMdr.prototype, "game.mod.yijie.YijieSceneMdr");
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var Event = egret.Event;
            var facade = base.facade;
            var YonghengYijieMdr = /** @class */ (function (_super) {
                __extends(YonghengYijieMdr, _super);
                function YonghengYijieMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", yijie.YijieView);
                    return _this;
                }
                YonghengYijieMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(220 /* Yijie */);
                    this._dailyLimitTimeActProxy = facade.retMod("48" /* Daily */).retProxy(195 /* DailyLimitTime */);
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                    this._bossList = new ArrayCollection();
                    this._view.list_boss.itemRenderer = yijie.YijieItem;
                    this._view.list_boss.dataProvider = this._bossList;
                };
                YonghengYijieMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_boss, Event.CHANGING, this.onClickBoss);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    addEventListener(this._view.btn_auction, TouchEvent.TOUCH_TAP, this.onClickAuction);
                    addEventListener(this._view.btn_demon, TouchEvent.TOUCH_TAP, this.onClickDemon);
                    addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
                    this.onNt("on_yongheng_yijie_info_update" /* ON_YONGHENG_YIJIE_INFO_UPDATE */, this.onInfoUpdate, this);
                    this.onNt("update_boss_list" /* UPDATE_BOSS_lIST */, this.reqBossInfo, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateIndex, this);
                };
                YonghengYijieMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.curType = 2 /* YonghengYijie */;
                    this._selIndex = 0;
                    this.reqBossInfo();
                    this.updateItemList();
                    this.indexUpdateInfo();
                    this.updateCount();
                    this.updateCost();
                    this.updateTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this._view.currentState = "2";
                };
                YonghengYijieMdr.prototype.onHide = function () {
                    this._effId = 0;
                    this._lastIndex = 0;
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                YonghengYijieMdr.prototype.onClickBoss = function (e) {
                    var index = this._view.list_boss.selectedIndex;
                    if (index == this._selIndex) {
                        return;
                    }
                    var cfg = this._view.list_boss.selectedItem;
                    if (!this._proxy.isBossOpen(cfg, true)) {
                        e.preventDefault();
                        return;
                    }
                    this._selIndex = index;
                    this.indexUpdateInfo();
                };
                YonghengYijieMdr.prototype.onClickReward = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    var tipStr1 = game.TextUtil.addColor(game.getLanById("yijie_tips1" /* yijie_tips1 */), 3496307 /* DEFAULT */);
                    var tipStr2 = game.TextUtil.addColor(game.getLanById("yijie_tips2" /* yijie_tips2 */), 3496307 /* DEFAULT */);
                    var tips = [tipStr1, tipStr2];
                    mod.ViewMgr.getIns().bossReward(this._selCfg.reward_big, tips);
                };
                YonghengYijieMdr.prototype.onClickAuction = function () {
                    //todo
                    game.PromptBox.getIns().show("敬请期待");
                };
                YonghengYijieMdr.prototype.onClickDemon = function () {
                    facade.showView("56" /* Yijie */, "11" /* YonghengYijieOpen */, this._selCfg);
                };
                YonghengYijieMdr.prototype.onClickChallenge = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    mod.SceneUtil.setReward(121 /* YonghengYijie */, this._selCfg.reward_big);
                    this._proxy.c2s_yongheng_boss_challenge(this._selCfg); //字段定义没导出
                };
                YonghengYijieMdr.prototype.onInfoUpdate = function () {
                    this.updateItemList();
                    this.updateCount();
                };
                /** 通用背包事件监听 */
                YonghengYijieMdr.prototype.onBagUpdateIndex = function (n) {
                    var indexs = n.body;
                    ;
                    if (indexs.indexOf(this._costIdx) < 0) {
                        return;
                    }
                    this.updateCost();
                };
                YonghengYijieMdr.prototype.updateItemList = function () {
                    var bossList = this._proxy.getBossList(this._proxy.curType);
                    if (this._bossList.source.length) {
                        this._bossList.replaceAll(bossList);
                    }
                    else {
                        this._bossList.source = bossList;
                    }
                    this._view.list_boss.selectedIndex = this._selIndex;
                };
                YonghengYijieMdr.prototype.indexUpdateInfo = function () {
                    var bossList = this._proxy.getBossList(this._proxy.curType);
                    this._selCfg = bossList[this._selIndex];
                    this._selInfo = this._proxy.getBossInfo(this._selCfg["stage"], this._proxy.curType); //字段定义没导出
                    if (!this._selCfg) {
                        return;
                    }
                    this.updateBoss();
                    this.updateReward();
                };
                YonghengYijieMdr.prototype.updateBoss = function () {
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
                YonghengYijieMdr.prototype.updateReward = function () {
                    var index = this._selCfg.reward_big;
                    var cfg = game.getConfigByNameId("reward_preview.json" /* RewardPreview */, index);
                    this._itemList.source = cfg.content.slice(0, 8); //取前面奖励
                };
                YonghengYijieMdr.prototype.updateCount = function () {
                    var cnt = this._proxy.yonghengCount;
                    var fontStr = cnt + "";
                    this.addBmpFont(fontStr, game.BmpTextCfg[214 /* XianYu1 */], this._view.grp_cnt, true, 0.8, true);
                    var goodCnt = this._proxy.goodCount;
                    var goodStr = goodCnt + "";
                    this.addBmpFont(goodStr, game.BmpTextCfg[214 /* XianYu1 */], this._view.grp_goodCnt, true, 1, true);
                    var isAct = mod.RoleUtil.isRoleRingAct(3 /* Type3 */);
                    this._view.grp_good.visible = isAct; //未激活不显示天选爆率
                };
                YonghengYijieMdr.prototype.updateCost = function () {
                    var costInfo = this._proxy.getCostInfo();
                    var index = costInfo[0];
                    var cnt = costInfo[1];
                    this._costIdx = index;
                    this._view.cost.updateShow([index, cnt]);
                };
                YonghengYijieMdr.prototype.reqBossInfo = function () {
                    this._proxy.c2s_yongheng_open_ui();
                };
                YonghengYijieMdr.prototype.update = function (time) {
                    var len = this._view.list_boss.numChildren;
                    for (var i = 0; i < len; ++i) {
                        var item = this._view.list_boss.getChildAt(i);
                        item.updateTime();
                    }
                    this.updateTime();
                };
                YonghengYijieMdr.prototype.updateTime = function () {
                    var isOpen = this._dailyLimitTimeActProxy.isOpen(3 /* YonghengYijie */);
                    if (isOpen) {
                        this._view.timeItem.lab_time.text = game.getLanById("battle_cue32" /* battle_cue32 */); //进行中
                        return;
                    }
                    var nextTime = this._dailyLimitTimeActProxy.getNextStartTime(3 /* YonghengYijie */);
                    this._view.timeItem.updateTime(nextTime);
                };
                return YonghengYijieMdr;
            }(game.EffectMdrBase));
            yijie.YonghengYijieMdr = YonghengYijieMdr;
            __reflect(YonghengYijieMdr.prototype, "game.mod.yijie.YonghengYijieMdr", ["base.UpdateItem"]);
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var YonghengYijieOpenMdr = /** @class */ (function (_super) {
                __extends(YonghengYijieOpenMdr, _super);
                function YonghengYijieOpenMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yijie.YonghengYijieOpenView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YonghengYijieOpenMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._sceneProxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                    this._proxy = this.retProxy(220 /* Yijie */);
                    this._dailyLimitTimeActProxy = facade.retMod("48" /* Daily */).retProxy(195 /* DailyLimitTime */);
                    this._itemList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._itemList;
                };
                YonghengYijieOpenMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickChallenge);
                    this.onNt("update_limit_act_info" /* UPDATE_LIMIT_ACT_INFO */, this.onInfoUpdate, this);
                };
                YonghengYijieOpenMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._selCfg = this._showArgs;
                    this.updateReward();
                    this.updateOpen();
                };
                YonghengYijieOpenMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                YonghengYijieOpenMdr.prototype.onInfoUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(3 /* YonghengYijie */) < 0) {
                        return;
                    }
                    this.updateOpen();
                };
                YonghengYijieOpenMdr.prototype.onClickChallenge = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    if (mod.SceneUtil.getCurSceneType() == 121 /* YonghengYijie */) {
                        //已在活动场景则将攻击目标切换目标为存活的一个活动boss
                        this._sceneProxy.requestMonster();
                    }
                    else {
                        mod.SceneUtil.setReward(121 /* YonghengYijie */, this._selCfg.reward_big);
                        this._proxy.c2s_yongheng_boss_challenge(this._selCfg); //字段定义没导出
                    }
                    this.hide();
                };
                YonghengYijieOpenMdr.prototype.updateReward = function () {
                    var cfg = game.getConfigByNameId("daily_limit_time.json" /* DailyLimitTime */, 3 /* YonghengYijie */);
                    this._itemList.source = cfg.reward;
                };
                YonghengYijieOpenMdr.prototype.update = function (time) {
                    this.updateTime();
                };
                YonghengYijieOpenMdr.prototype.updateTime = function () {
                    var nextTime = this._dailyLimitTimeActProxy.getNextStartTime(3 /* YonghengYijie */);
                    this._view.timeItem.updateTime(nextTime, game.getLanById("material3" /* material3 */));
                };
                YonghengYijieOpenMdr.prototype.updateOpen = function () {
                    var isOpen = this._dailyLimitTimeActProxy.isOpen(3 /* YonghengYijie */);
                    this._view.btn_challenge.visible = isOpen;
                    this._view.timeItem.visible = !isOpen;
                    if (!isOpen) {
                        //未开启
                        this.updateTime();
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                    else {
                        TimeMgr.removeUpdateItem(this);
                    }
                };
                return YonghengYijieOpenMdr;
            }(game.MdrBase));
            yijie.YonghengYijieOpenMdr = YonghengYijieOpenMdr;
            __reflect(YonghengYijieOpenMdr.prototype, "game.mod.yijie.YonghengYijieOpenMdr", ["base.UpdateItem"]);
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yijie;
        (function (yijie) {
            var TouchEvent = egret.TouchEvent;
            var TextEvent = egret.TextEvent;
            var Handler = base.Handler;
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var YonghengYijieSceneMdr = /** @class */ (function (_super) {
                __extends(YonghengYijieSceneMdr, _super);
                function YonghengYijieSceneMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", yijie.YonghengYijieSceneView);
                    return _this;
                }
                YonghengYijieSceneMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.percentHeight = 100;
                    this._view.percentWidth = 100;
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(220 /* Yijie */);
                    this._dailyLimitTimeActProxy = facade.retMod("48" /* Daily */).retProxy(195 /* DailyLimitTime */);
                };
                YonghengYijieSceneMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.lab_guild, TextEvent.LINK, this.onClickGuild);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    addEventListener(this._view.btn_demon, TouchEvent.TOUCH_TAP, this.onClickDemon);
                    addEventListener(this._view.btn_boss, TouchEvent.TOUCH_TAP, this.onClickBoss);
                    this.onNt("on_yongheng_yijie_scene_update" /* ON_YONGHENG_YIJIE_SCENE_UPDATE */, this.updateInfo, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateIndex, this);
                    this.onNt("update_limit_act_info" /* UPDATE_LIMIT_ACT_INFO */, this.onInfoUpdate, this);
                    this.onNt("on_role_ring_update" /* ON_ROLE_RING_UPDATE */, this.updateView, this);
                };
                YonghengYijieSceneMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.updateInfo();
                    this.updateCost();
                    this.updateOpen();
                    this.updateView();
                };
                YonghengYijieSceneMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                YonghengYijieSceneMdr.prototype.onClickGuild = function () {
                    if (mod.RoleUtil.isInUnion()) {
                        //有仙宗
                        mod.ViewMgr.getIns().showConfirm(game.getLanById("guild_invite_tips" /* guild_invite_tips */), Handler.alloc(this, function () {
                            //todo
                            game.PromptBox.getIns().show("仙宗邀请，待处理");
                        }));
                        return;
                    }
                    //跳转仙宗界面
                    mod.ViewMgr.getIns().showViewByID(36 /* Union */);
                };
                YonghengYijieSceneMdr.prototype.onClickReward = function () {
                    this._proxy.c2s_yongheng_show_reward();
                };
                YonghengYijieSceneMdr.prototype.onClickDemon = function () {
                    facade.showView("56" /* Yijie */, "11" /* YonghengYijieOpen */, this._proxy.selCfg);
                };
                YonghengYijieSceneMdr.prototype.onClickBoss = function () {
                    mod.ViewMgr.getIns().showSecondPop("56" /* Yijie */, "06" /* YijieBossList */, 2 /* YonghengYijie */);
                };
                /** 通用背包事件监听 */
                YonghengYijieSceneMdr.prototype.onBagUpdateIndex = function (n) {
                    var indexs = n.body;
                    if (indexs.indexOf(this._costIdx) < 0) {
                        return;
                    }
                    this.updateCost();
                };
                YonghengYijieSceneMdr.prototype.onInfoUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(3 /* YonghengYijie */) < 0) {
                        return;
                    }
                    this.updateOpen();
                };
                YonghengYijieSceneMdr.prototype.initShow = function () {
                    this._view.lab_guild.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(game.getLanById("guild_invite" /* guild_invite */), 8585074 /* GREEN */, ""));
                };
                YonghengYijieSceneMdr.prototype.updateInfo = function () {
                    var luckyStr = game.getLanById("yijie_tips3" /* yijie_tips3 */) + "：" + game.TextUtil.addColor(this._proxy.yonghengCount + "", 8585074 /* GREEN */);
                    this._view.lab_lucky.textFlow = game.TextUtil.parseHtml(luckyStr);
                    var goodStr = game.getLanById("yijie_tips19" /* yijie_tips19 */) + "：" + game.TextUtil.addColor(this._proxy.goodCount + "", 8585074 /* GREEN */);
                    this._view.lab_goodCnt.textFlow = game.TextUtil.parseHtml(goodStr);
                    var cntStr = game.getLanById("yijie_tips4" /* yijie_tips4 */) + "：" + game.TextUtil.addColor(this._proxy.memberNum + "", 8585074 /* GREEN */);
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                };
                YonghengYijieSceneMdr.prototype.updateCost = function () {
                    var costInfo = this._proxy.getCostInfo();
                    var index = costInfo[0];
                    var cnt = costInfo[1];
                    this._costIdx = index;
                    this._view.cost.updateShow([index, cnt]);
                };
                YonghengYijieSceneMdr.prototype.update = function (time) {
                    this.updateTime();
                };
                YonghengYijieSceneMdr.prototype.updateTime = function () {
                    var nextTime = this._dailyLimitTimeActProxy.getNextStartTime(3 /* YonghengYijie */);
                    this._view.timeItem.updateTime(nextTime);
                };
                YonghengYijieSceneMdr.prototype.updateOpen = function () {
                    var isOpen = this._dailyLimitTimeActProxy.isOpen(3 /* YonghengYijie */);
                    if (!isOpen) {
                        //未开启
                        this.updateTime();
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                    else {
                        this._view.timeItem.lab_time.text = game.getLanById("battle_cue32" /* battle_cue32 */); //进行中
                        TimeMgr.removeUpdateItem(this);
                    }
                };
                YonghengYijieSceneMdr.prototype.updateView = function () {
                    var isAct = mod.RoleUtil.isRoleRingAct(3 /* Type3 */);
                    this._view.currentState = isAct ? "act" : "notAct";
                };
                return YonghengYijieSceneMdr;
            }(game.MdrBase));
            yijie.YonghengYijieSceneMdr = YonghengYijieSceneMdr;
            __reflect(YonghengYijieSceneMdr.prototype, "game.mod.yijie.YonghengYijieSceneMdr", ["base.UpdateItem"]);
        })(yijie = mod.yijie || (mod.yijie = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=yijie.js.map