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
        var daily;
        (function (daily) {
            var ArrayCollection = eui.ArrayCollection;
            var LivenessProgressReward = /** @class */ (function (_super) {
                __extends(LivenessProgressReward, _super);
                function LivenessProgressReward() {
                    var _this = _super.call(this) || this;
                    _this._listData = new ArrayCollection();
                    _this._listReward = new ArrayCollection();
                    _this.skinName = "skins.common.ComProgressRewardSkin";
                    return _this;
                }
                LivenessProgressReward.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.list_progress.itemRenderer = daily.LivenessProgressItem;
                    this.list_progress.dataProvider = this._listData;
                    this.list_reward.itemRenderer = daily.LivenessProgressRewardItem;
                    this.list_reward.dataProvider = this._listReward;
                    this.img_tips.source = "huoyuedu";
                };
                LivenessProgressReward.prototype.setData = function (val) {
                    this.lab_count.text = "" + val;
                    // let cfgArr: ShengtanScoreConfig[] = getConfigListByName(ConfigName.ShengtanScore);
                    var cfgArr = game.getConfigListByName("active_award.json" /* ActiveAward */);
                    var list = [];
                    for (var i = 0; i < cfgArr.length; i++) {
                        var cfg = cfgArr[i];
                        var cfgBefore = cfgArr[i - 1];
                        var start = cfgBefore && cfgBefore.activation || 0;
                        var target = cfg.activation;
                        list.push({ val: val, start: start, target: target });
                    }
                    this._listData.source = list;
                    this._listReward.source = cfgArr;
                };
                return LivenessProgressReward;
            }(mod.BaseRenderer));
            daily.LivenessProgressReward = LivenessProgressReward;
            __reflect(LivenessProgressReward.prototype, "game.mod.daily.LivenessProgressReward");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var DailyMod = /** @class */ (function (_super) {
                __extends(DailyMod, _super);
                function DailyMod() {
                    return _super.call(this, "48" /* Daily */) || this;
                }
                DailyMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                DailyMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(193 /* Daily */, daily.DailyProxy);
                    this.regProxy(195 /* DailyLimitTime */, daily.DailyLimitTimeActProxy);
                };
                DailyMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* DailyMain */, daily.DailyMainMdr);
                };
                return DailyMod;
            }(game.ModBase));
            daily.DailyMod = DailyMod;
            __reflect(DailyMod.prototype, "game.mod.daily.DailyMod");
            gso.modCls.push(DailyMod);
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var TimeMgr = base.TimeMgr;
            var s2c_limit_act_info = msg.s2c_limit_act_info;
            /**
             * @description 日常限时活动
             */
            var DailyLimitTimeActProxy = /** @class */ (function (_super) {
                __extends(DailyLimitTimeActProxy, _super);
                function DailyLimitTimeActProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._curList = [];
                    return _this;
                }
                DailyLimitTimeActProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new daily.DailyLimitTimeActModel();
                    this.onProto(s2c_limit_act_info, this.s2c_limit_act_info, this);
                };
                DailyLimitTimeActProxy.prototype.s2c_limit_act_info = function (n) {
                    var msg = n.body;
                    var hasMsg = msg && msg.indexs && msg.indexs.length;
                    if (hasMsg) {
                        if (msg.oper == 1) {
                            this._model.indexs = msg.indexs;
                        }
                        else {
                            for (var _i = 0, _a = msg.indexs; _i < _a.length; _i++) {
                                var index = _a[_i];
                                var idx = this._model.indexs.indexOf(index);
                                if (idx < 0 && msg.oper == 3) {
                                    this._model.indexs.push(index);
                                }
                                else if (idx > -1 && msg.oper == 2) {
                                    this._model.indexs.splice(idx, 1);
                                }
                            }
                        }
                    }
                    this.updateHint();
                    if (hasMsg) {
                        var types = this.changeIndexs(msg.indexs);
                        this._model.types = types;
                        this.sendNt("update_limit_act_info" /* UPDATE_LIMIT_ACT_INFO */, types);
                    }
                };
                DailyLimitTimeActProxy.prototype.getConfig = function (index) {
                    return game.getConfigByNameId("daily_limit_time.json" /* DailyLimitTime */, index);
                };
                DailyLimitTimeActProxy.prototype.getConfigListByToday = function () {
                    var day = mod.RoleUtil.getCurWeekDay();
                    if (this._curDay && day == this._curDay) {
                        return this._curList;
                    }
                    this._curDay = day;
                    var cfgs = game.getConfigListByName("daily_limit_time.json" /* DailyLimitTime */);
                    var cfgList = [];
                    for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                        var cfg = cfgs_1[_i];
                        if (cfg && cfg.week_day && (cfg.week_day.indexOf(day) > -1 || cfg.week_day.indexOf(8) > -1)) {
                            cfgList.push(cfg);
                        }
                    }
                    this._curList = cfgList;
                    return cfgList;
                };
                /**从后端index获取前端index*/
                DailyLimitTimeActProxy.prototype.getTypes = function () {
                    return this._model.types || [];
                };
                DailyLimitTimeActProxy.prototype.changeIndexs = function (indexs) {
                    var types = [];
                    for (var _i = 0, indexs_1 = indexs; _i < indexs_1.length; _i++) {
                        var idx = indexs_1[_i];
                        var type = +(idx + '').slice(4, 6);
                        if (types.indexOf(type) < 0) {
                            types.push(type);
                        }
                    }
                    return types;
                };
                /**是否是今天的活动*/
                DailyLimitTimeActProxy.prototype.isTodayAct = function (cfg) {
                    if (!cfg || !cfg.week_day) {
                        return false;
                    }
                    return cfg.week_day.indexOf(mod.RoleUtil.getCurWeekDay()) > -1 || cfg.week_day.indexOf(8) > -1;
                };
                DailyLimitTimeActProxy.prototype.getConfigList = function () {
                    var cfgs = game.getConfigListByName("daily_limit_time.json" /* DailyLimitTime */);
                    var topList = []; //置顶活动，已开启的
                    var notList = []; //开启但不置顶活动，未开启活动
                    var endList = []; //已结束活动
                    var curTime = TimeMgr.time.serverTime; //当前时间
                    var types = this.getTypes(); //在开启中的前端index
                    for (var _i = 0, cfgs_2 = cfgs; _i < cfgs_2.length; _i++) {
                        var cfg = cfgs_2[_i];
                        var date = game.TimeUtil.getServerTime();
                        var startTime = 0;
                        var endTime = 0;
                        var endTimeAry = cfg.act_time[cfg.act_time.length - 1]; //最后一个结束时间
                        date.setHours(endTimeAry[0], endTimeAry[1], 0, 0);
                        endTime = date.getTime();
                        var isToday = this.isTodayAct(cfg); //是否今天的活动
                        //已结束的活动
                        if (isToday && curTime >= endTime) {
                            endList.push({
                                cfg: cfg,
                                showHint: false,
                                endTime: 0,
                                startTime: 0,
                                state: 0
                            });
                            continue;
                        }
                        //不是今天的活动，不在进行中的活动，玩家未达条件的活动
                        if (!isToday || types.indexOf(cfg.index) < 0 || (cfg.open_id && !mod.ViewMgr.getIns().checkViewOpen(cfg.open_id))) {
                            notList.push({
                                cfg: cfg,
                                showHint: false,
                                startTime: 0,
                                endTime: 0,
                                state: 2
                            });
                            continue;
                        }
                        //正在进行的活动
                        for (var i = 0; i < cfg.act_time.length; i += 2) {
                            date.setHours(cfg.act_time[i][0], cfg.act_time[i][1], 0, 0);
                            startTime = date.getTime();
                            date.setHours(cfg.act_time[i + 1][0], cfg.act_time[i + 1][1], 0, 0);
                            endTime = date.getTime();
                            if (startTime <= curTime && curTime <= endTime) {
                                var d = {
                                    cfg: cfg,
                                    showHint: !this.getClickHint(cfg.index),
                                    startTime: startTime,
                                    endTime: endTime,
                                    state: 1
                                };
                                topList.push(d);
                                // if (cfg.is_top) {
                                //     topList.push(d);
                                // } else {
                                //     notList.push(d);
                                // }
                            }
                        }
                    }
                    if (topList && topList.length) {
                        topList.sort(function (a, b) { return a.startTime - b.startTime; });
                    }
                    return topList.concat(notList, endList);
                };
                /**活动是否正在进行*/
                DailyLimitTimeActProxy.prototype.isOpen = function (type) {
                    var types = this.getTypes(); //在开启中的前端index
                    return types.indexOf(type) > -1;
                };
                /**活动下一次开启时间，返回的是秒*/
                DailyLimitTimeActProxy.prototype.getNextStartTime = function (type) {
                    var cfg = this.getConfig(type);
                    var nextStartTime = 0;
                    var curTime = TimeMgr.time.serverTime; //当前时间
                    var date = game.TimeUtil.getServerTime();
                    var isToday = this.isTodayAct(cfg); //是否今天的活动
                    if (isToday) {
                        //今天的活动，取下一次开启时间
                        for (var i = 0; i < cfg.act_time.length; i += 2) {
                            date.setHours(cfg.act_time[i][0], cfg.act_time[i][1], 0, 0);
                            var startTime = date.getTime();
                            if (startTime > curTime) {
                                nextStartTime = startTime; //取到下一次开启时间，则跳出循环
                                break;
                            }
                        }
                    }
                    if (!nextStartTime) {
                        //取不到下一次开启时间，则往下一个活动日取时间
                        var curDay = mod.RoleUtil.getCurWeekDay();
                        var nextDay = 0; //下一次活动在几天后开启
                        if (cfg.week_day.indexOf(8) > -1) {
                            //每天开启的活动
                            nextDay = 1;
                        }
                        else {
                            //周几开启的活动
                            for (var _i = 0, _a = cfg.week_day; _i < _a.length; _i++) {
                                var d = _a[_i];
                                if (d > curDay) {
                                    //大于当前活动日
                                    nextDay = d - curDay;
                                    break;
                                }
                            }
                            if (!nextDay) {
                                //当前周取不到下一个活动日，则往下一周的第一个活动日取时间
                                nextDay = cfg.week_day[0] + 7 - curDay;
                            }
                        }
                        var nextDayTime = game.TimeUtil.getNextDayTime(curTime, true, nextDay); //下一个活动日的0点时间
                        date.setTime(nextDayTime * 1000); //设置为0点时间
                        date.setHours(cfg.act_time[0][0], cfg.act_time[0][1], 0, 0); //下一个活动日的第一个时间
                        nextStartTime = date.getTime();
                    }
                    return nextStartTime / 1000;
                };
                DailyLimitTimeActProxy.prototype.getClickHint = function (index) {
                    return this._model.clickHint.indexOf(index) > -1;
                };
                DailyLimitTimeActProxy.prototype.setClickHint = function (index) {
                    if (this._model.clickHint.indexOf(index) > -1) {
                        return;
                    }
                    this._model.clickHint.push(index);
                    this.updateHint();
                };
                DailyLimitTimeActProxy.prototype.updateHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670112 /* DailyLimitTime */)) {
                        return;
                    }
                    var list = this.getConfigList() || [];
                    var isHint = false;
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var data = list_1[_i];
                        if (data && data.showHint) {
                            isHint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(isHint, this._model.hintPath);
                };
                return DailyLimitTimeActProxy;
            }(game.ProxyBase));
            daily.DailyLimitTimeActProxy = DailyLimitTimeActProxy;
            __reflect(DailyLimitTimeActProxy.prototype, "game.mod.daily.DailyLimitTimeActProxy", ["game.mod.IDailyLimitTimeActProxy", "base.IProxy"]);
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var DailyModel = /** @class */ (function () {
                function DailyModel() {
                    this.sumCup = 0; // 当前奖杯数
                    this.nextCup = 0; // 升级所需奖杯数
                    this.curLv = 0; // 勋章等级
                    this.curIndex = 0; // 当前勋章
                    //进入活跃奖励
                    this.curExp = 0; // 当前历练值（总活跃度）
                    this.awdState = 0; // 当前已领取到哪个阶段（1-->n 表示第1-->n阶段已经领取   0：表示还没领取任何阶段)
                    this.awdList = []; // 已领取的宝箱奖励id列表
                    this.livenessHint = ["48" /* Daily */, "01" /* DailyMain */ + "01" /* BtnLiveness */]; // 活跃度红点
                }
                return DailyModel;
            }());
            daily.DailyModel = DailyModel;
            __reflect(DailyModel.prototype, "game.mod.daily.DailyModel");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var c2s_medal_info = msg.c2s_medal_info;
            var c2s_medal_oper = msg.c2s_medal_oper;
            var s2c_medal_new_info = msg.s2c_medal_new_info;
            var s2c_medal_daily_reward = msg.s2c_medal_daily_reward;
            var c2s_medal_daily_reward = msg.c2s_medal_daily_reward;
            var DailyProxy = /** @class */ (function (_super) {
                __extends(DailyProxy, _super);
                function DailyProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DailyProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new daily.DailyModel();
                    this.onProto(s2c_medal_new_info, this.s2c_medal_new_info, this);
                    this.onProto(s2c_medal_daily_reward, this.s2c_medal_daily_reward, this);
                };
                DailyProxy.prototype.getModel = function () {
                    return this._model;
                };
                DailyProxy.prototype.c2s_medal_info = function () {
                    var req = new c2s_medal_info();
                    this.sendProto(req);
                };
                /**
                 * 新勋章信息协议
                 * operate 1.全部 2.缺省
                 * @param n
                 */
                DailyProxy.prototype.s2c_medal_new_info = function (n) {
                    var msg = n.body;
                    if (!msg)
                        return;
                    if (msg.operate == 1) {
                        this._model.curIndex = msg.cur_index;
                        this._model.showPower = msg.show_power;
                        this._model.curAttr = msg.attr;
                        this._model.nextAttr = msg.next_attr;
                        this._model.sumCup = msg.sum_cup_count;
                        this._model.nextCup = msg.next_cup_count;
                        this._model.curLv = msg.lv;
                    }
                    else {
                        if (msg.cur_index) {
                            this._model.curIndex = msg.cur_index;
                        }
                        if (msg.show_power) {
                            this._model.showPower = msg.show_power;
                        }
                        if (msg.attr) {
                            this._model.curAttr = msg.attr;
                        }
                        if (msg.next_attr) {
                            this._model.nextAttr = msg.next_attr;
                        }
                        if (msg.sum_cup_count) {
                            this._model.sumCup = msg.sum_cup_count;
                        }
                        if (msg.next_cup_count) {
                            this._model.nextCup = msg.next_cup_count;
                        }
                        if (msg.lv) {
                            this._model.curLv = msg.lv;
                        }
                    }
                    this.sendNt("medal_info_update" /* MEDAL_INFO_UPDATE */);
                };
                /**
                 * 勋章操作
                 * @param operate  1:升级勋章 2:特权领奖 3:激活勋章 4:幻化
                 * @param index
                 */
                DailyProxy.prototype.c2s_medal_oper = function (operate, index) {
                    var req = new c2s_medal_oper();
                    req.oper = operate;
                    req.medal_idx = index;
                    this.sendProto(req);
                };
                DailyProxy.prototype.c2s_medal_daily_reward = function (index) {
                    var req = new c2s_medal_daily_reward();
                    req.index = index;
                    this.sendProto(req);
                };
                DailyProxy.prototype.s2c_medal_daily_reward = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.cur_experience != undefined) { // 跨天重置后，可能归0
                        this._model.curExp = msg.cur_experience;
                    }
                    if (msg.state) {
                        this._model.awdState = msg.state;
                    }
                    if (msg.rwd_list) {
                        this._model.awdList = msg.rwd_list;
                    }
                    else {
                        this._model.awdList = [];
                    }
                    this.updateLivenessHint();
                    this.sendNt("medal_award_update" /* MEDAL_AWARD_UPDATE */);
                };
                Object.defineProperty(DailyProxy.prototype, "allPower", {
                    /**
                     * 获取总战力
                     */
                    get: function () {
                        var power = Number(this._model.showPower) || 0;
                        return power;
                    },
                    enumerable: true,
                    configurable: true
                });
                DailyProxy.prototype.onTaskUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(35 /* Liveness */) == -1) {
                        return;
                    }
                    this.updateLivenessHint();
                };
                DailyProxy.prototype.updateLivenessHint = function () {
                    var hint = this.getBoxHint();
                    if (!hint) {
                        hint = this.getTaskHint();
                    }
                    mod.HintMgr.setHint(hint, this._model.livenessHint);
                };
                /**
                 * 获取宝箱奖励红点
                 */
                DailyProxy.prototype.getBoxHint = function () {
                    var cfgArr = game.getConfigListByName("active_award.json" /* ActiveAward */);
                    var hint = false;
                    for (var _i = 0, cfgArr_1 = cfgArr; _i < cfgArr_1.length; _i++) {
                        var cfg = cfgArr_1[_i];
                        var isGot = this.checkActRewardIsGot(cfg.index);
                        if (!isGot && this._model.curExp >= cfg.activation) {
                            hint = true;
                            break;
                        }
                    }
                    return hint;
                };
                /**
                 * 获取任务奖励红点
                 */
                DailyProxy.prototype.getTaskHint = function () {
                    var hint = false;
                    var tasks = mod.TaskUtil.getTaskList(35 /* Liveness */);
                    for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
                        var task = tasks_1[_i];
                        if (task.status == 1 /* Finish */) {
                            hint = true;
                            break;
                        }
                    }
                    return hint;
                };
                /**
                 * 判断某档活跃度奖励是否已经领取
                 * @param rewardId
                 */
                DailyProxy.prototype.checkActRewardIsGot = function (rewardId) {
                    if (this._model.awdList) {
                        return this._model.awdList.indexOf(rewardId) >= 0;
                    }
                    return false;
                };
                /**
                 * 获取玩法系统外部系统红点
                 */
                DailyProxy.prototype.getOtherHint = function () {
                    var cfgList = game.getConfigListByName("daily_wanfa.json" /* DailyWanfa */);
                    for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                        var cfg = cfgList_1[_i];
                        var openIdx = cfg.open_id;
                        if (mod.HintMgr.getHintByOpenIdx(openIdx)) {
                            return true;
                        }
                    }
                    return false;
                };
                /**
                 * 是否是玩法系统外部系统红点
                 */
                DailyProxy.prototype.isOtherHint = function (node) {
                    var cfgList = game.getConfigListByName("daily_wanfa.json" /* DailyWanfa */);
                    for (var _i = 0, cfgList_2 = cfgList; _i < cfgList_2.length; _i++) {
                        var cfg = cfgList_2[_i];
                        var openIdx = cfg.open_id;
                        var type = mod.HintMgr.getTypeByOpenIdx(openIdx);
                        if (type == node) {
                            return true;
                        }
                    }
                    return false;
                };
                return DailyProxy;
            }(game.ProxyBase));
            daily.DailyProxy = DailyProxy;
            __reflect(DailyProxy.prototype, "game.mod.daily.DailyProxy", ["game.mod.IDailyProxy", "base.IProxy"]);
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var DailyLimitTimeActItem = /** @class */ (function (_super) {
                __extends(DailyLimitTimeActItem, _super);
                function DailyLimitTimeActItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.daily.DailyLimitTimeActItemSkin";
                    return _this;
                }
                DailyLimitTimeActItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("48" /* Daily */, 195 /* DailyLimitTime */);
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_desc, this.onClickDesc, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_go, this.onClickGo, this);
                };
                DailyLimitTimeActItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data || !data.cfg) {
                        return;
                    }
                    var cfg = data.cfg;
                    this._listData.replaceAll(cfg.reward);
                    this.img_bg.source = game.ResUtil.getUiPng(cfg.banner);
                    var isOpening = data.state == 1 /* Opening */;
                    this.img_doing.visible = isOpening;
                    this.removeEft();
                    if (isOpening) {
                        this.addEftByParent("btn" /* Btn */, this.btn_go.group_eft);
                    }
                    this.img_end.visible = data.state == 0 /* End */;
                    this.btn_go.visible = !this.img_end.visible;
                    this.btn_go.setHint(data.showHint);
                    var isOpen = mod.ViewMgr.getIns().checkViewOpen(cfg.open_id);
                    if (cfg.open_id && !isOpen) {
                        var txt = mod.ViewMgr.getIns().getOpenFuncShow(cfg.open_id);
                        if (cfg.act_type == 1) {
                            txt += " \uFF08\u5DF2\u8FBE" + game.RoleVo.ins.level + "\u7EA7\uFF09";
                        }
                        else if (cfg.act_type == 2) {
                            txt += " \uFF08\u5DF2\u8FBE" + mod.RoleUtil.getRebirthStr() + "\uFF09";
                        }
                        this.lb_time.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(txt, 16719376 /* RED */));
                        this.lb_desc.visible = false;
                        return;
                    }
                    var timeStr = '';
                    var act_time = cfg.act_time;
                    for (var i = 0; i < act_time.length; i += 2) {
                        var txt = this.getTimeStr(act_time[i][0]) + ":" + this.getTimeStr(act_time[i][1]) + "-" + this.getTimeStr(act_time[i + 1][0]) + ":" + this.getTimeStr(act_time[i + 1][1]);
                        timeStr += txt + '  ';
                    }
                    this.lb_time.visible = this.lb_desc.visible = true;
                    this.lb_time.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor("\u6D3B\u52A8\u65F6\u95F4:" + game.TextUtil.addColor(timeStr, 2330156 /* GREEN */), data.state == 1 /* Opening */ ? 2330156 /* GREEN */ : 3496307 /* DEFAULT */));
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(cfg.desc, data.state == 1 /* Opening */ ? 2330156 /* GREEN */ : 3496307 /* DEFAULT */));
                };
                DailyLimitTimeActItem.prototype.getTimeStr = function (time) {
                    return time < 10 ? '0' + time : time + '';
                };
                DailyLimitTimeActItem.prototype.onClickDesc = function () {
                    mod.ViewMgr.getIns().showRuleTips(this.data.cfg.desc1);
                };
                DailyLimitTimeActItem.prototype.onClickGo = function () {
                    var cfg = this.data.cfg;
                    if (!cfg || !mod.ViewMgr.getIns().checkViewOpen(cfg.open_id, true)) {
                        return;
                    }
                    this._proxy.setClickHint(cfg.index);
                    mod.ViewMgr.getIns().showViewByID(cfg.jump_id);
                };
                return DailyLimitTimeActItem;
            }(mod.BaseRenderer));
            daily.DailyLimitTimeActItem = DailyLimitTimeActItem;
            __reflect(DailyLimitTimeActItem.prototype, "game.mod.daily.DailyLimitTimeActItem");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var DailyLimitTimeActView = /** @class */ (function (_super) {
                __extends(DailyLimitTimeActView, _super);
                function DailyLimitTimeActView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.daily.DailyLimitTimeActSkin";
                    return _this;
                }
                return DailyLimitTimeActView;
            }(eui.Component));
            daily.DailyLimitTimeActView = DailyLimitTimeActView;
            __reflect(DailyLimitTimeActView.prototype, "game.mod.daily.DailyLimitTimeActView");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var LivenessBoxItem = /** @class */ (function (_super) {
                __extends(LivenessBoxItem, _super);
                function LivenessBoxItem() {
                    var _this = _super.call(this) || this;
                    _this._isGot = false;
                    _this._isCanGet = false;
                    _this.skinName = "skins.daily.LivenessBoxItemSkin";
                    return _this;
                }
                LivenessBoxItem.prototype.setRewardBox = function (cfg, curExp, isGot0) {
                    this._awdCfg = cfg;
                    this.btn_box.icon = "baoxiang" + cfg.index;
                    this.lab_value.text = cfg.activation + "";
                    this._isGot = isGot0;
                    this._isCanGet = isGot0 ? false : curExp >= this._awdCfg.activation;
                    this.img_got.visible = isGot0;
                    this.redPoint.visible = this._isCanGet;
                };
                Object.defineProperty(LivenessBoxItem.prototype, "isGot", {
                    get: function () {
                        return this._isGot;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LivenessBoxItem.prototype, "isCanGet", {
                    get: function () {
                        return this._isCanGet;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LivenessBoxItem.prototype, "cfg", {
                    get: function () {
                        return this._awdCfg;
                    },
                    enumerable: true,
                    configurable: true
                });
                return LivenessBoxItem;
            }(eui.Component));
            daily.LivenessBoxItem = LivenessBoxItem;
            __reflect(LivenessBoxItem.prototype, "game.mod.daily.LivenessBoxItem");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var LivenessItem = /** @class */ (function (_super) {
                __extends(LivenessItem, _super);
                function LivenessItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LivenessItem.prototype.onAddToStage = function () {
                    this.touchEnabled = false;
                };
                LivenessItem.prototype.onRemoveFromStage = function () {
                    if (this._effId) {
                        this.removeEffect(this._effId);
                    }
                    this._effStr = null;
                };
                LivenessItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var medalCfg = game.getConfigByNameId("adventure_medal.json" /* AdventureMedal */, this.data.medalId);
                    if (!medalCfg) {
                        return;
                    }
                    if (this._effStr != medalCfg.model) {
                        this._effStr = medalCfg.model;
                        this.removeEffect(this._effId);
                        this._effId = this.addEftByParent(this._effStr + "_" + game.RoleVo.ins.sex, this.gr_model, this.width / 2, this.width / 2);
                    }
                    this.lab_lock.text = game.StringUtil.substitute(game.getLanById("medal_cond1" /* medal_cond1 */), [medalCfg.activation_level]);
                    var isAct = this.data.curLv >= medalCfg.activation_level;
                    this.gr_lock.visible = !isAct;
                    // this.redPoint.visible = HintMgr.getHint(
                    //     ModName.Daily, DailyTabHintKey.Medal, DailyMainHintKey.Medal, MedalHint[this.itemIndex + 1]);
                };
                return LivenessItem;
            }(mod.BaseRenderer));
            daily.LivenessItem = LivenessItem;
            __reflect(LivenessItem.prototype, "game.mod.daily.LivenessItem");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var LivenessProgressItem = /** @class */ (function (_super) {
                __extends(LivenessProgressItem, _super);
                function LivenessProgressItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.common.ComProgressItemSkin";
                    return _this;
                }
                LivenessProgressItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    if (!this.data.val) {
                        this.progress.show(0, this.data.target, false, 0, false, 2 /* NoValue */);
                    }
                    else {
                        var val = this.data.val - this.data.start;
                        val = val < 0 ? 0 : val;
                        var target = this.data.target - this.data.start;
                        this.progress.show(val, target, false, 0, false, 2 /* NoValue */);
                    }
                };
                return LivenessProgressItem;
            }(mod.BaseRenderer));
            daily.LivenessProgressItem = LivenessProgressItem;
            __reflect(LivenessProgressItem.prototype, "game.mod.daily.LivenessProgressItem");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var DailyLimitTimeActModel = /** @class */ (function () {
                function DailyLimitTimeActModel() {
                    /**红点path*/
                    this.hintPath = ["48" /* Daily */, "01" /* DailyMain */ + "03" /* BtnLimitTimeAct */];
                    /**红点记录，点击过一次消失*/
                    this.clickHint = [];
                    /**开启的活动index*/
                    this.indexs = [];
                    /**开启的活动类型*/
                    this.types = [];
                }
                return DailyLimitTimeActModel;
            }());
            daily.DailyLimitTimeActModel = DailyLimitTimeActModel;
            __reflect(DailyLimitTimeActModel.prototype, "game.mod.daily.DailyLimitTimeActModel");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var TouchEvent = egret.TouchEvent;
            var LivenessProgressRewardItem = /** @class */ (function (_super) {
                __extends(LivenessProgressRewardItem, _super);
                function LivenessProgressRewardItem() {
                    var _this = _super.call(this) || this;
                    _this.is_got = false;
                    _this.is_lingqu = false;
                    _this.skinName = "skins.common.ComProgressRewardItemSkin";
                    return _this;
                }
                LivenessProgressRewardItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("48" /* Daily */, 193 /* Daily */);
                    this.addEventListener(TouchEvent.TOUCH_TAP, this.onClickBtn, this);
                };
                LivenessProgressRewardItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.currentState = "" + (this.itemIndex + 1);
                    // this.btn_box.icon = "box_close";
                    var cfg = this.data;
                    this.lab_value.text = "" + cfg.activation;
                    this.is_got = this._proxy.checkActRewardIsGot(cfg.index);
                    var exp = this._proxy.getModel().curExp;
                    this.is_lingqu = !this.is_got && exp >= cfg.activation;
                    this.img_got.visible = this.is_got;
                    this.redPoint.visible = this.is_lingqu;
                };
                LivenessProgressRewardItem.prototype.onClickBtn = function () {
                    var cfg = this.data;
                    if (!cfg || this.is_got) {
                        return;
                    }
                    if (this.is_lingqu) {
                        this._proxy.c2s_medal_daily_reward(cfg.index);
                    }
                    else {
                        var tips = "\u6D3B\u8DC3\u5EA6\u8FBE\u5230" + cfg.activation + "\u53EF\u9886\u53D6\u5956\u52B1";
                        mod.ViewMgr.getIns().showBoxReward(tips, cfg.award);
                    }
                    // let info = this._proxy.getShengStatus(this.data.index);
                    // if (!info) {
                    //     let str: string = TextUtil.addColor(`(${this._proxy.getShengCount()}/${this.data.score})`, Color.RED);
                    //     let tips = StringUtil.substitute(getLanById(LanDef.union_tips_2), [this.data.score, str]);
                    //     ViewMgr.getIns().showBoxReward(tips, this.data.reward);
                    //     return;
                    // }
                    // if (info && info.state == 2) {
                    //     return;
                    // }
                    // this._proxy.c2s_guild_shengtan_score_reward(this.data.index);
                };
                return LivenessProgressRewardItem;
            }(mod.BaseRenderer));
            daily.LivenessProgressRewardItem = LivenessProgressRewardItem;
            __reflect(LivenessProgressRewardItem.prototype, "game.mod.daily.LivenessProgressRewardItem");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var LivenessTaskRender = /** @class */ (function (_super) {
                __extends(LivenessTaskRender, _super);
                function LivenessTaskRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LivenessTaskRender.prototype.onClickDraw = function () {
                    mod.TaskUtil.clickTask(this.data, this.btn_go);
                };
                return LivenessTaskRender;
            }(mod.TaskRender));
            daily.LivenessTaskRender = LivenessTaskRender;
            __reflect(LivenessTaskRender.prototype, "game.mod.daily.LivenessTaskRender");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var LivenessView = /** @class */ (function (_super) {
                __extends(LivenessView, _super);
                function LivenessView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.daily.LivenessSkin";
                    return _this;
                }
                return LivenessView;
            }(eui.Component));
            daily.LivenessView = LivenessView;
            __reflect(LivenessView.prototype, "game.mod.daily.LivenessView");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var WanfaRender = /** @class */ (function (_super) {
                __extends(WanfaRender, _super);
                function WanfaRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                WanfaRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_go, this.onClickGo, this);
                    this._proxy = facade.retMod("48" /* Daily */).retProxy(193 /* Daily */);
                    this._bossProxy = facade.retMod("22" /* Boss */).retProxy(199 /* Boss */);
                    this._competeProxy = facade.retMod("52" /* Compete */).retProxy(200 /* Compete */);
                    this._consecrateProxy = facade.retMod("57" /* Consecrate */).retProxy(225 /* Consecrate */);
                };
                WanfaRender.prototype.onClickGo = function () {
                    if (!this.data.jump) {
                        return;
                    }
                    mod.ViewMgr.getIns().showViewByID(this.data.jump);
                };
                WanfaRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.img_icon.source = "wanfa_icon_" + this.data.index; //图标
                    var openIdx = this.data.open_id;
                    var cfg = game.getConfigByNameId("open_function.json" /* OpenFunction */, openIdx);
                    var descStr = cfg.name;
                    var target = this.data.target;
                    this._target = target;
                    if (target) {
                        var curVal = this.getCurVal(openIdx);
                        this._curVal = curVal;
                        descStr += "(" + curVal + "/" + target + ")"; //(0/1)
                    }
                    else {
                        descStr += "(" + target + ")"; //(0)
                    }
                    this.lab_desc.text = descStr; //描述文本+进度显示
                    var isOpen = mod.ViewMgr.getIns().checkViewOpen(openIdx);
                    this.lab_open_tip.text = isOpen ? "" : mod.ViewMgr.getIns().getOpenFuncShow(openIdx, 4);
                    this.btn_go.visible = isOpen;
                    if (this.btn_go.visible) {
                        var hint = mod.HintMgr.getHintByOpenIdx(openIdx);
                        this.btn_go.redPoint.visible = hint;
                    }
                    this.updateState();
                };
                /**获取状态文本*/
                WanfaRender.prototype.getStateStr = function (status) {
                    switch (status) {
                        case 0 /* None */:
                            return "闲置";
                        case 1 /* Challenge */:
                            return "可挑战";
                        case 2 /* Gongfeng */:
                            return "可供奉";
                    }
                    return "";
                };
                /**获取当前进度*/
                WanfaRender.prototype.getCurVal = function (openIdx) {
                    //todo
                    switch (openIdx) {
                        case 1041670118 /* Boss */:
                            return this._bossProxy.getCurVal();
                        case 1041670121 /* Youli */:
                            return this._competeProxy.getCurVal();
                        case 1041670156 /* Yijie */:
                            var cfg = game.GameConfig.getParamConfigById("yijie_cost");
                            var index = cfg && cfg.value;
                            return mod.BagUtil.getPropCntByIdx(index);
                        case 1041670122 /* Doufa */:
                            return this._competeProxy.getCurValDoufa();
                        case 1041670161 /* Consecrate */:
                            return this._consecrateProxy.getConsecrateCount();
                    }
                    return 0;
                };
                /**获取冷却时间*/
                WanfaRender.prototype.getNextTime = function (openIdx) {
                    switch (openIdx) {
                        case 1041670118 /* Boss */:
                            return this._bossProxy.bossTime;
                        case 1041670121 /* Youli */:
                            var time = this._competeProxy.nextFightTime;
                            if (time) {
                                return time;
                            }
                            break;
                        case 1041670161 /* Consecrate */:
                            return this._consecrateProxy.getEndTime();
                    }
                    //默认取第二天的0点时间戳
                    var curTime = TimeMgr.time.serverTimeSecond;
                    return game.TimeUtil.getNextDayTime(curTime, false, 1);
                };
                /**刷新状态文本显示*/
                WanfaRender.prototype.updateState = function () {
                    var stateStr = "";
                    var nextTime = this.getNextTime(this.data.open_id);
                    if (this._target && this.isShowTime) {
                        //存在目标值，且当前值为0时
                        var leftTime = nextTime - TimeMgr.time.serverTimeSecond;
                        if (leftTime == 0) {
                            facade.sendNt("update_wanfa_list" /* UPDATE_WANFAN_LIST */); //倒计时结束时候，刷新列表
                        }
                        stateStr = game.TextUtil.addColor(game.TimeUtil.formatSecond(leftTime, "d天H时", true), 16777215 /* WHITE */);
                    }
                    else {
                        stateStr = game.TextUtil.addColor(this.getStateStr(this.data.status), 2330156 /* GREEN */);
                    }
                    this.lab_state.textFlow = game.TextUtil.parseHtml(stateStr); //状态文本
                };
                Object.defineProperty(WanfaRender.prototype, "isShowTime", {
                    get: function () {
                        if (this.data.open_id == 1041670161 /* Consecrate */) {
                            var nextTime = this.getNextTime(this.data.open_id);
                            if (this._curVal && nextTime > 0) {
                                return true;
                            }
                        }
                        else {
                            if (!this._curVal) {
                                return true;
                            }
                        }
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                return WanfaRender;
            }(mod.BaseListenerRenderer));
            daily.WanfaRender = WanfaRender;
            __reflect(WanfaRender.prototype, "game.mod.daily.WanfaRender");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var WanfaView = /** @class */ (function (_super) {
                __extends(WanfaView, _super);
                function WanfaView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.daily.WanfaSkin";
                    return _this;
                }
                return WanfaView;
            }(eui.Component));
            daily.WanfaView = WanfaView;
            __reflect(WanfaView.prototype, "game.mod.daily.WanfaView");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var DailyMainMdr = /** @class */ (function (_super) {
                __extends(DailyMainMdr, _super);
                function DailyMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* BtnLiveness */,
                            icon: "ui_tab_liveness_",
                            title: "liveness" /* liveness */,
                            bg: "liveness_bg",
                            mdr: daily.LivenessMdr,
                            hintTypes: ["48" /* Daily */, "01" /* DailyMain */ + "01" /* BtnLiveness */]
                        },
                        {
                            btnType: "02" /* BtnWanfa */,
                            icon: "ui_tab_wanfa_",
                            title: 'wanfa',
                            bg: "",
                            mdr: daily.WanfaMdr,
                            hintTypes: ["48" /* Daily */, "01" /* DailyMain */ + "02" /* BtnWanfa */]
                        },
                        {
                            btnType: "03" /* BtnLimitTimeAct */,
                            openIdx: 1041670112 /* DailyLimitTime */,
                            icon: "xianshibiaoqiantubiao",
                            title: 'xianshi',
                            bg: "",
                            mdr: daily.DailyLimitTimeActMdr,
                            hintTypes: ["48" /* Daily */, "01" /* DailyMain */ + "03" /* BtnLimitTimeAct */]
                        }
                    ];
                    return _this;
                }
                DailyMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(193 /* Daily */);
                };
                /** 刷新分页红点 ,重写*/
                DailyMainMdr.prototype.updateTabHint = function () {
                    var list = this._btnList.source;
                    var len = list ? list.length : 0;
                    for (var i = 0; i < len; i++) {
                        var btnData = list[i];
                        if (!btnData.hintTypes) {
                            continue;
                        }
                        var hint = mod.HintMgr.getHint(btnData.hintTypes);
                        if (!hint && btnData.btnType == "02" /* BtnWanfa */) {
                            hint = this._proxy.getOtherHint();
                        }
                        if (!!btnData.showHint != hint) { //过滤undefined!=false
                            btnData.showHint = hint;
                            this._btnList.itemUpdated(btnData);
                        }
                    }
                };
                return DailyMainMdr;
            }(mod.WndBaseMdr));
            daily.DailyMainMdr = DailyMainMdr;
            __reflect(DailyMainMdr.prototype, "game.mod.daily.DailyMainMdr");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var DailyLimitTimeActMdr = /** @class */ (function (_super) {
                __extends(DailyLimitTimeActMdr, _super);
                function DailyLimitTimeActMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark('_view', daily.DailyLimitTimeActView);
                    return _this;
                }
                DailyLimitTimeActMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(195 /* DailyLimitTime */);
                    this._view.list.itemRenderer = daily.DailyLimitTimeActItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                DailyLimitTimeActMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_limit_act_info" /* UPDATE_LIMIT_ACT_INFO */, this.updateView, this);
                };
                DailyLimitTimeActMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.list.scrollV = 0;
                    this.updateView();
                };
                DailyLimitTimeActMdr.prototype.updateView = function () {
                    var list = this._proxy.getConfigList();
                    this._listData.replaceAll(list);
                };
                DailyLimitTimeActMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return DailyLimitTimeActMdr;
            }(game.MdrBase));
            daily.DailyLimitTimeActMdr = DailyLimitTimeActMdr;
            __reflect(DailyLimitTimeActMdr.prototype, "game.mod.daily.DailyLimitTimeActMdr");
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var Pool = base.Pool;
            var Tween = base.Tween;
            var Handler = base.Handler;
            var TouchEvent = egret.TouchEvent;
            var LivenessMdr = /** @class */ (function (_super) {
                __extends(LivenessMdr, _super);
                function LivenessMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", daily.LivenessView);
                    _this._oldCup = 0;
                    return _this;
                }
                LivenessMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(193 /* Daily */);
                    this._model = this._proxy.getModel();
                    this._listTaskData = new ArrayCollection();
                    this._view.list_task.itemRenderer = daily.LivenessTaskRender;
                    this._view.list_task.dataProvider = this._listTaskData;
                    this._proxy.c2s_medal_info();
                };
                LivenessMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("medal_info_update" /* MEDAL_INFO_UPDATE */, this.updateInfo, this);
                    this.onNt("on_task_update" /* ON_TASK_UPDATE */, this.onTaskUpdate, this);
                    this.onNt("medal_award_update" /* MEDAL_AWARD_UPDATE */, this.updateBoxAwd, this);
                    //this.onNt(LivenessEvent.MEDAL_PLAY_TWEEN, this.onPlayTween, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_left, TouchEvent.TOUCH_TAP, this.onLast);
                    addEventListener(this._view.btn_right, TouchEvent.TOUCH_TAP, this.onNext);
                    addEventListener(this._view.box1, TouchEvent.TOUCH_TAP, this.onBoxClick);
                    addEventListener(this._view.box2, TouchEvent.TOUCH_TAP, this.onBoxClick);
                    addEventListener(this._view.box3, TouchEvent.TOUCH_TAP, this.onBoxClick);
                    addEventListener(this._view.box4, TouchEvent.TOUCH_TAP, this.onBoxClick);
                    addEventListener(this._view.box5, TouchEvent.TOUCH_TAP, this.onBoxClick);
                };
                //子类重写，调用setAddEft()
                LivenessMdr.prototype.updateAddEft = function (n) {
                    var btn = n.body;
                    _super.prototype.setAddEft.call(this, this._view.reward, btn.group_eft, this._view.reward.group_eft1);
                };
                LivenessMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._medalCfgs) {
                        this._medalCfgs = game.getConfigListByName("adventure_medal.json" /* AdventureMedal */);
                    }
                    this.updateInfo();
                };
                LivenessMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    while (this._view.grp_icon.numChildren) {
                        var target = this._view.grp_icon.removeChildAt(0);
                        if (target) {
                            Tween.remove(target);
                            Pool.release(target);
                            target.parent && target.parent.removeChild(target);
                            target = null;
                        }
                    }
                    this._showIdx = 0;
                    this._view.grp_icon.visible = false;
                    _super.prototype.onHide.call(this);
                };
                LivenessMdr.prototype.updateInfo = function () {
                    this._view.power.setPowerValue(this._proxy.allPower);
                    this._showIdx = this._model.curIndex;
                    this._view.lab_lv.text = "Lv. " + (this._model.curLv ? this._model.curLv + "" : "0");
                    this._view.progressComp.show(this._model.sumCup, this._model.nextCup, false);
                    this.updateMedal();
                    this.updateAttr();
                    this.updateBoxAwd();
                    this.updateTask();
                };
                LivenessMdr.prototype.updateMedal = function () {
                    var cfg = game.getConfigByNameId("adventure_medal.json" /* AdventureMedal */, this._showIdx);
                    this._view.lab_name.text = cfg ? cfg.name : "";
                    this._view.model_item.data = { medalId: this._showIdx, curLv: this._model.curLv };
                    this._view.btn_left.visible = this._showIdx > 1;
                    this._view.btn_right.visible = this._showIdx < this._medalCfgs.length;
                };
                LivenessMdr.prototype.updateAttr = function () {
                    var curAttr = this._model.curAttr || this._model.nextAttr;
                    this._view.lab_curAttr.textFlow = game.TextUtil.parseHtml(game.TextUtil.getAttrText(curAttr, 2330156 /* GREEN */, " "));
                    if (this._model.nextAttr) {
                        this._view.currentState = "default";
                        this._view.lab_nextAttr.textFlow = game.TextUtil.parseHtml(game.TextUtil.getAttrText(this._model.nextAttr, 2330156 /* GREEN */, " "));
                    }
                    else {
                        this._view.currentState = "maxLv";
                        this._view.lab_nextAttr.text = "";
                    }
                };
                LivenessMdr.prototype.updateBoxAwd = function () {
                    var cfgArr = game.getConfigListByName("active_award.json" /* ActiveAward */);
                    if (!cfgArr || cfgArr.length == 0) {
                        return;
                    }
                    var maxNeed = cfgArr[cfgArr.length - 1].activation;
                    this._view.lab_my_liveness.text = this._model.curExp + "";
                    this._view.img_box_prog2.width = 560 * this._model.curExp / maxNeed;
                    for (var i = 0, len = cfgArr.length; i < len && i < 5; i++) {
                        var rewardItem = this._view["box" + (i + 1)];
                        var cfg = cfgArr[i];
                        var isGot = this._proxy.checkActRewardIsGot(cfg.index);
                        rewardItem.setRewardBox(cfg, this._model.curExp, isGot);
                    }
                    this._view.reward.setData(this._model.curExp);
                };
                LivenessMdr.prototype.updateTask = function () {
                    var tasks = mod.TaskUtil.getTaskList(35 /* Liveness */, true, true);
                    this._listTaskData.replaceAll(tasks);
                };
                /** 设置奖杯数增加动画*/
                LivenessMdr.prototype.update = function (time) {
                    this._oldCup++;
                    if (this._oldCup >= this._model.sumCup) {
                        this._oldCup = this._model.sumCup;
                        TimeMgr.removeUpdateItem(this);
                    }
                    this._view.progressComp.show(this._oldCup, this._model.nextCup, false);
                };
                /** 升级动画*/
                LivenessMdr.prototype.onPlayTween = function (n) {
                    this._view.grp_icon.visible = true;
                    TimeMgr.addUpdateItem(this, 20);
                    this._start = n.body;
                    this._view.globalToLocal(this._start.x, this._start.y, this._start);
                    for (var i = 0, len = this._model.sumCup - this._oldCup; i < len; i++) {
                        var target = Pool.alloc(eui.Image);
                        target.source = "liveness_lvsetubiao1";
                        this._view.grp_icon.addChild(target);
                        this.setTween(target, i);
                    }
                };
                /** 设置动画*/
                LivenessMdr.prototype.setTween = function (target, idx) {
                    var firstX = this._start.x + this.randomPos();
                    var firstY = this._start.y + this.randomPos();
                    var num = this._model.sumCup - this._oldCup;
                    target.x = firstX;
                    target.y = firstY;
                    Tween.get(target).to({ x: this._view.progressComp.x + this._view.progressComp.width / 2, y: this._view.progressComp.y - 40 }, 50 * (idx + num)).exec(Handler.alloc(this, function () {
                        Tween.remove(target);
                        Pool.release(target);
                        target.parent && target.parent.removeChild(target);
                        target = null;
                    }));
                };
                LivenessMdr.prototype.randomPos = function () {
                    var sign = Math.random() > 0.5 ? 1 : -1;
                    return sign * Math.random() * 30;
                };
                LivenessMdr.prototype.onTaskUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(35 /* Liveness */) == -1) {
                        return;
                    }
                    this.updateTask();
                };
                LivenessMdr.prototype.onLast = function () {
                    this._showIdx--;
                    if (this._showIdx <= 0) {
                        this._showIdx = 1;
                    }
                    this.updateMedal();
                };
                LivenessMdr.prototype.onNext = function () {
                    this._showIdx++;
                    if (!this._medalCfgs[this._showIdx]) {
                        this._showIdx = this._medalCfgs.length;
                    }
                    this.updateMedal();
                };
                LivenessMdr.prototype.onBoxClick = function (e) {
                    var item = e.currentTarget;
                    var cfg = item.cfg;
                    if (!cfg || item.isGot) {
                        return;
                    }
                    if (item.isCanGet) {
                        this._proxy.c2s_medal_daily_reward(cfg.index);
                    }
                    else {
                        var tips = "\u6D3B\u8DC3\u5EA6\u8FBE\u5230" + cfg.activation + "\u53EF\u9886\u53D6\u5956\u52B1";
                        mod.ViewMgr.getIns().showBoxReward(tips, cfg.award);
                    }
                };
                return LivenessMdr;
            }(game.EffectMdrBase));
            daily.LivenessMdr = LivenessMdr;
            __reflect(LivenessMdr.prototype, "game.mod.daily.LivenessMdr", ["base.UpdateItem"]);
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var daily;
        (function (daily) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var WanfaMdr = /** @class */ (function (_super) {
                __extends(WanfaMdr, _super);
                function WanfaMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", daily.WanfaView);
                    return _this;
                }
                WanfaMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._listTaskData = new ArrayCollection();
                    this._view.list_item.itemRenderer = daily.WanfaRender;
                    this._view.list_item.dataProvider = this._listTaskData;
                };
                WanfaMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_wanfa_list" /* UPDATE_WANFAN_LIST */, this.updateInfo, this);
                };
                WanfaMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateInfo();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                WanfaMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                WanfaMdr.prototype.updateInfo = function () {
                    if (!this._wanfaCfgs) {
                        this._wanfaCfgs = game.getConfigListByName("daily_wanfa.json" /* DailyWanfa */);
                    }
                    this._listTaskData.replaceAll(this._wanfaCfgs);
                };
                WanfaMdr.prototype.update = function (time) {
                    var len = this._view.list_item.numChildren;
                    for (var i = 0; i < len; ++i) {
                        var item = this._view.list_item.getChildAt(i);
                        item.updateState();
                    }
                };
                return WanfaMdr;
            }(game.MdrBase));
            daily.WanfaMdr = WanfaMdr;
            __reflect(WanfaMdr.prototype, "game.mod.daily.WanfaMdr", ["base.UpdateItem"]);
        })(daily = mod.daily || (mod.daily = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=daily.js.map