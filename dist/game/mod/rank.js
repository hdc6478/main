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
        var rank;
        (function (rank) {
            var NewRankView = /** @class */ (function (_super) {
                __extends(NewRankView, _super);
                function NewRankView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.rank.NewRankSkin";
                    return _this;
                }
                return NewRankView;
            }(eui.Component));
            rank.NewRankView = NewRankView;
            __reflect(NewRankView.prototype, "game.mod.rank.NewRankView");
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var RankMod = /** @class */ (function (_super) {
                __extends(RankMod, _super);
                function RankMod() {
                    return _super.call(this, "31" /* Rank */) || this;
                }
                RankMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                RankMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(72 /* Rank */, rank.RankProxy);
                    this.regProxy(233 /* NewRank */, rank.NewRankProxy);
                };
                RankMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* RankMain */, rank.RankMainMdr);
                    this.regMdr("02" /* RankGod */, rank.RankGodMdr);
                    this.regMdr("03" /* NewRankMain */, rank.NewRankMainMdr); //主界面上方排行榜按钮
                    this.regMdr("04" /* NewRankGod */, rank.NewRankGodMdr); //主界面上方排行榜按钮
                };
                return RankMod;
            }(game.ModBase));
            rank.RankMod = RankMod;
            __reflect(RankMod.prototype, "game.mod.rank.RankMod");
            gso.modCls.push(RankMod);
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var c2s_rank_req_rank = msg.c2s_rank_req_rank;
            var s2c_rank_info = msg.s2c_rank_info;
            var c2s_rank_worship = msg.c2s_rank_worship;
            var s2c_rank_worship = msg.s2c_rank_worship;
            var s2c_rank_base_info = msg.s2c_rank_base_info;
            var s2c_rank_update_reward = msg.s2c_rank_update_reward;
            var c2s_dashen_rank_award = msg.c2s_dashen_rank_award;
            var TimeMgr = base.TimeMgr;
            /**
             * @description 排行榜系统，主界面上方排行榜按钮
             */
            var NewRankProxy = /** @class */ (function (_super) {
                __extends(NewRankProxy, _super);
                function NewRankProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                NewRankProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new rank.NewRankModel();
                    this.onProto(s2c_rank_info, this.s2c_rank_info, this);
                    this.onProto(s2c_rank_worship, this.s2c_rank_worship, this);
                    this.onProto(s2c_rank_base_info, this.s2c_rank_base_info, this);
                    this.onProto(s2c_rank_update_reward, this.s2c_rank_update_reward, this);
                };
                /**
                 * 获取排行榜信息
                 * @param type 排行榜编号
                 * @param event_type 1.排行榜界面2.大神榜
                 * @param start  todo 后续补上滚动请求个数 2023.3.8
                 * @param end
                 */
                NewRankProxy.prototype.c2s_rank_req_rank = function (type, event_type, start, end) {
                    var msg = new c2s_rank_req_rank();
                    msg.index = type;
                    msg.event_type = event_type;
                    if (start != undefined) {
                        msg.start_num = start;
                    }
                    if (end != undefined) {
                        msg.end_num = end;
                    }
                    this.sendProto(msg);
                };
                //推送排行榜信息
                NewRankProxy.prototype.s2c_rank_info = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    var rankType = msg.index;
                    var rankInfo = this._model.rank_info[rankType];
                    if (!rankInfo) {
                        this._model.rank_info[rankType] = rankInfo = {};
                    }
                    rankInfo[msg.event_type] = msg;
                    this._model.time_map[rankType] = TimeMgr.time.serverTimeSecond; //记录请求返回时间
                    this.sendNt("on_new_rank_info_update" /* ON_NEW_RANK_INFO_UPDATE */, rankType);
                };
                //点赞
                NewRankProxy.prototype.c2s_rank_worship = function (type) {
                    var msg = new c2s_rank_worship();
                    msg.index = type;
                    this.sendProto(msg);
                };
                //点赞返回
                NewRankProxy.prototype.s2c_rank_worship = function (n) {
                    var msg = n.body;
                    var rankType = 0;
                    if (msg.rank_type != null) {
                        rankType = msg.rank_type;
                        var idx = this._model.worship_list.indexOf(rankType);
                        if (idx > -1) {
                            this._model.worship_list.splice(idx, 1);
                        }
                    }
                    this.updateHint();
                    this.sendNt("on_rank_worship_update" /* ON_RANK_WORSHIP_UPDATE */, rankType);
                };
                //登录下发和跨天下发
                NewRankProxy.prototype.s2c_rank_base_info = function (n) {
                    var msg = n.body;
                    if (msg.reward_list != null) {
                        for (var _i = 0, _a = msg.reward_list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            var map = this._model.reward_list[info.rank_type];
                            if (!map) {
                                this._model.reward_list[info.rank_type] = map = {};
                            }
                            map[info.index] = info;
                        }
                    }
                    else {
                        this._model.reward_list = [];
                    }
                    if (msg.worship_list != null) {
                        this._model.worship_list = msg.worship_list;
                    }
                    else {
                        this._model.worship_list = [];
                    }
                    this.updateHint();
                    this.sendNt("on_rank_base_info_update" /* ON_RANK_BASE_INFO_UPDATE */);
                };
                //请求领取大神榜 奖励
                NewRankProxy.prototype.c2s_dashen_rank_award = function (type, index) {
                    var msg = new c2s_dashen_rank_award();
                    msg.ranktype = type;
                    msg.index = index;
                    this.sendProto(msg);
                };
                //更新奖励信息
                NewRankProxy.prototype.s2c_rank_update_reward = function (n) {
                    var msg = n.body;
                    var rankType = 0;
                    if (msg.reward_list != null) {
                        for (var _i = 0, _a = msg.reward_list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            if (!rankType) {
                                rankType = info.rank_type;
                            }
                            var map = this._model.reward_list[info.rank_type];
                            if (!map) {
                                this._model.reward_list[info.rank_type] = map = {};
                            }
                            map[info.index] = info;
                        }
                    }
                    this.updateHint();
                    this.sendNt("on_rank_reward_update" /* ON_RANK_REWARD_UPDATE */, rankType);
                };
                //在一个小时内，请求不生效
                NewRankProxy.prototype.inOneHour = function (type) {
                    var lastReqTime = this._model.time_map[type];
                    return lastReqTime && TimeMgr.time.serverTimeSecond < lastReqTime + game.Second.Hour;
                };
                NewRankProxy.prototype.getConfCfg = function (type) {
                    return game.getConfigByNameId("rank_conf.json" /* RankConf */, type);
                };
                NewRankProxy.prototype.getRewardCfgList = function (type) {
                    var cfgList = [];
                    var cfgs = game.getConfigByNameId("rank_reward.json" /* RankReward */, type);
                    for (var k in cfgs) {
                        if (cfgs[k]) {
                            cfgList.push(cfgs[k]);
                        }
                    }
                    return cfgList;
                };
                NewRankProxy.prototype.getRankTypeList = function () {
                    var list = [];
                    var cfgList = game.getConfigListByName("rank_conf.json" /* RankConf */);
                    for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                        var cfg = cfgList_1[_i];
                        list.push(cfg.index);
                    }
                    return list;
                };
                NewRankProxy.prototype.getRankInfo = function (type, eventType) {
                    if (eventType === void 0) { eventType = 1; }
                    var info = this._model.rank_info[type];
                    if (!info) {
                        return null;
                    }
                    return info[eventType];
                };
                //大神榜奖励状态
                NewRankProxy.prototype.getRankRewardStatus = function (type, index) {
                    var map = this._model.reward_list[type];
                    if (!map || !map[index]) {
                        return 2 /* NotFinish */;
                    }
                    var data = map[index];
                    return data.status == 2 ? 3 /* Draw */ : 1 /* Finish */;
                };
                NewRankProxy.prototype.canWorship = function (type) {
                    return this._model.worship_list.indexOf(type) > -1;
                };
                NewRankProxy.prototype.canGetReward = function (type) {
                    var list = this._model.reward_list[type];
                    if (list) {
                        for (var key in list) {
                            var data = list[key];
                            if (data && data.status == 1) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                NewRankProxy.prototype.getMyRankTypeDesc = function (type, powerCN) {
                    if (powerCN === void 0) { powerCN = false; }
                    var ins = game.RoleVo.ins;
                    switch (type) {
                        case 2001 /* Zhanli */:
                            var power = ins.showpower && ins.showpower.toNumber() || 0;
                            var powerStr = game.TextUtil.addColor(game.StringUtil.getHurtNumStr(power), 2330156 /* GREEN */);
                            return this.getMyPowerDesc(type, true) + powerStr;
                        case 2003 /* Dengji */:
                            return game.getLanById("rank_txt1" /* rank_txt1 */) + game.getLanById("level" /* level */) + ':'
                                + game.TextUtil.addColor(ins.level + '', 2330156 /* GREEN */);
                        case 2004 /* Xiuxian */:
                            return game.TextUtil.addColor(mod.RoleUtil.getRebirthStr(), 2330156 /* GREEN */);
                        case 2002 /* Shenling */:
                        case 2005 /* Zuoqi */:
                        case 2006 /* Feijian */:
                        case 2007 /* Yuyi */:
                        case 2008 /* Shenbing */:
                        case 2009 /* Shizhuang */:
                        case 2010 /* Yuanling */:
                            var info = this.getRankInfo(type);
                            var val = info && info.my_value ? info.my_value.toNumber() : 0;
                            return this.getMyPowerDesc(type) + game.TextUtil.addColor("" + (powerCN ? game.StringUtil.getHurtNumStr(val) : val), 2330156 /* GREEN */);
                    }
                    return '';
                };
                //返回：我的xx战力:
                NewRankProxy.prototype.getMyPowerDesc = function (type, isPower) {
                    if (isPower === void 0) { isPower = false; }
                    if (isPower) {
                        return game.getLanById("rank_txt1" /* rank_txt1 */) + game.getLanById("showpower" /* showpower */) + ':';
                    }
                    return game.getLanById("rank_txt1" /* rank_txt1 */) + game.getLanById(game.RankTypeName[type]) + game.getLanById("showpower" /* showpower */) + ':';
                };
                NewRankProxy.prototype.getHintByType = function (type) {
                    return this.canWorship(type) || this.canGetReward(type);
                };
                NewRankProxy.prototype.updateHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670189 /* Rank */)) {
                        return;
                    }
                    var hint = false;
                    var typeList = this.getRankTypeList();
                    for (var _i = 0, typeList_1 = typeList; _i < typeList_1.length; _i++) {
                        var type = typeList_1[_i];
                        if (this.getHintByType(type)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.hintPath);
                };
                //可点赞类型
                NewRankProxy.prototype.getWorshipList = function () {
                    return this._model.worship_list.sort(function (a, b) { return a - b; });
                };
                //大神榜达标条件
                NewRankProxy.prototype.getGodCondition = function (type, param) {
                    if (type == 2004 /* Xiuxian */) {
                        return mod.RoleUtil.getRebirthStr(param);
                    }
                    return param + '';
                };
                //数值文本
                NewRankProxy.prototype.getPowerByRankInfo = function (type, data) {
                    if (!data) {
                        return '0';
                    }
                    var power;
                    switch (type) {
                        case 2001 /* Zhanli */:
                            power = data.showpower;
                            break;
                        case 2002 /* Shenling */:
                            power = data.shenling_showpower;
                            break;
                        case 2003 /* Dengji */:
                            return game.getLanById("level" /* level */) + ' ' + data.level; //等级
                        case 2004 /* Xiuxian */:
                            return mod.RoleUtil.getRebirthStr(data.xiuxian); //修仙
                        case 2005 /* Zuoqi */:
                            power = data.ride_showpower;
                            break;
                        case 2006 /* Feijian */:
                            power = data.feijian_showpower;
                            break;
                        case 2007 /* Yuyi */:
                            power = data.wings_showpower;
                            break;
                        case 2008 /* Shenbing */:
                            power = data.weapon_showpower;
                            break;
                        case 2009 /* Shizhuang */:
                            power = data.fashion_showpower;
                            break;
                        case 2010 /* Yuanling */:
                            power = data.yuanling_showpower;
                            break;
                    }
                    return power ? power.toString() : '0';
                };
                return NewRankProxy;
            }(game.ProxyBase));
            rank.NewRankProxy = NewRankProxy;
            __reflect(NewRankProxy.prototype, "game.mod.rank.NewRankProxy", ["game.mod.INewRankProxy", "base.IProxy"]);
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var RankModel = /** @class */ (function () {
                function RankModel() {
                    var _a;
                    this.infos = {};
                    this.godInfos = {};
                    /**排行榜类型映射红点类型，todo*/
                    this.rankTypeToHintTypes = (_a = {},
                        _a[1 /* Type1 */] = ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "69" /* XiantaRank1 */],
                        _a[2 /* Type2 */] = ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "70" /* XiantaRank2 */],
                        _a[3 /* Type3 */] = ["49" /* Shilian */, "01" /* ShilianMain */ + "03" /* Xianta */, "71" /* XiantaRank3 */],
                        _a);
                    /**排行榜类型映射功能id，todo*/
                    this.rankTypeToOpenIdx = {};
                }
                return RankModel;
            }());
            rank.RankModel = RankModel;
            __reflect(RankModel.prototype, "game.mod.rank.RankModel");
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var c2s_new_rank_req_rank = msg.c2s_new_rank_req_rank;
            var s2c_new_rank_info = msg.s2c_new_rank_info;
            var c2s_first_rank_award = msg.c2s_first_rank_award;
            var s2c_first_rank_server_award = msg.s2c_first_rank_server_award;
            var s2c_first_rank_award = msg.s2c_first_rank_award;
            var RankProxy = /** @class */ (function (_super) {
                __extends(RankProxy, _super);
                function RankProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RankProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new rank.RankModel();
                    this.onProto(s2c_new_rank_info, this.s2c_new_rank_info, this);
                    this.onProto(s2c_first_rank_server_award, this.s2c_first_rank_server_award, this);
                    this.onProto(s2c_first_rank_award, this.s2c_first_rank_award, this);
                };
                /**请求排行榜信息*/
                RankProxy.prototype.c2s_new_rank_req_rank = function (rankType) {
                    var msg = new c2s_new_rank_req_rank();
                    msg.ranktype = rankType;
                    this.sendProto(msg);
                };
                RankProxy.prototype.s2c_new_rank_info = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this._model.infos[msg.ranktype] = msg;
                    this.sendNt("on_rank_info_update" /* ON_RANK_INFO_UPDATE */, msg.ranktype);
                };
                /**请求领取大神榜 奖励*/
                RankProxy.prototype.c2s_first_rank_award = function (rankType, index) {
                    var msg = new c2s_first_rank_award();
                    msg.ranktype = rankType;
                    msg.index = index;
                    this.sendProto(msg);
                };
                RankProxy.prototype.s2c_first_rank_server_award = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (!info.infos) {
                            continue;
                        }
                        this.updateGodInfos(info.ranktype, info.infos);
                    }
                };
                RankProxy.prototype.s2c_first_rank_award = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this.updateGodRewardInfos(msg.ranktype, msg.index_list);
                };
                /**获取排行榜信息*/
                RankProxy.prototype.getRankInfo = function (rankType) {
                    return this._model.infos[rankType];
                };
                /**获取大神榜信息*/
                RankProxy.prototype.getGodInfos = function (rankType) {
                    if (!this._model.godInfos[rankType]) {
                        this.initGodInfos(rankType);
                    }
                    return this._model.godInfos[rankType];
                };
                /**初始化大神榜信息*/
                RankProxy.prototype.initGodInfos = function (rankType) {
                    var godInfos = [];
                    var cfgList = this.getCfgList(rankType);
                    for (var _i = 0, cfgList_2 = cfgList; _i < cfgList_2.length; _i++) {
                        var cfg = cfgList_2[_i];
                        var info = {};
                        info.rankType = rankType;
                        info.cfg = cfg;
                        info.status = 2 /* NotFinish */;
                        godInfos.push(info);
                    }
                    this._model.godInfos[rankType] = godInfos;
                };
                /**更新大神榜信息*/
                RankProxy.prototype.updateGodInfos = function (rankType, rankInfos) {
                    var godInfos = this.getGodInfos(rankType);
                    for (var i = 0; i < godInfos.length; ++i) {
                        var info = godInfos[i];
                        var cfg = info.cfg;
                        for (var j = 0; j < rankInfos.length; ++j) {
                            var rankInfo = rankInfos[j];
                            if (rankInfo.index == cfg.index) {
                                godInfos[i].status = info.status == 2 /* NotFinish */ ? 1 /* Finish */ : info.status; //切换为可领取状态
                                godInfos[i].rankInfo = rankInfo;
                                break;
                            }
                        }
                    }
                    this.setRankUpdate(rankType);
                };
                /**更新大神榜奖励信息*/
                RankProxy.prototype.updateGodRewardInfos = function (rankType, indexList) {
                    var godInfos = this.getGodInfos(rankType);
                    for (var i = 0; i < godInfos.length; ++i) {
                        var info = godInfos[i];
                        var cfg = info.cfg;
                        godInfos[i].status = indexList && indexList.indexOf(cfg.index) > -1 ? 3 /* Draw */ : info.status; //切换为已领取状态
                    }
                    this.setRankUpdate(rankType);
                };
                RankProxy.prototype.setRankUpdate = function (rankType) {
                    game.SortTools.sortMap(this.getGodInfos(rankType), "status"); //排序
                    this.updateHint(rankType);
                    this.sendNt("on_rank_reward_info_update" /* ON_RANK_REWARD_INFO_UPDATE */, rankType);
                };
                /**获取红点类型*/
                RankProxy.prototype.getHintTypes = function (rankType) {
                    return this._model.rankTypeToHintTypes[rankType];
                };
                RankProxy.prototype.updateHint = function (rankType) {
                    var hint = this.checkHint(rankType);
                    var hintType = this.getHintTypes(rankType);
                    if (!hintType) {
                        return;
                    }
                    mod.HintMgr.setHint(hint, hintType);
                };
                RankProxy.prototype.checkHint = function (rankType) {
                    var openIdx = this._model.rankTypeToOpenIdx[rankType];
                    switch (rankType) {
                        case 1 /* Type1 */:
                        case 2 /* Type2 */:
                        case 3 /* Type3 */:
                            var cfg = game.getConfigByNameId("xianta_fuben.json" /* XiantaFuben */, rankType);
                            openIdx = cfg.copy_open;
                            break;
                    }
                    if (openIdx && !mod.ViewMgr.getIns().checkViewOpen(openIdx)) {
                        return false;
                    }
                    var godInfos = this.getGodInfos(rankType);
                    for (var i = 0; i < godInfos.length; ++i) {
                        var info = godInfos[i];
                        if (info.status == 1 /* Finish */) {
                            return true;
                        }
                    }
                    return false;
                };
                RankProxy.prototype.getCfgList = function (rankType) {
                    var cfgList = [];
                    switch (rankType) {
                        case 1 /* Type1 */:
                        case 2 /* Type2 */:
                        case 3 /* Type3 */:
                            var cfgs = game.getConfigByNameId("xianta_reward.json" /* XiantaReward */, rankType);
                            for (var k in cfgs) {
                                var cfg = cfgs[k];
                                cfgList.push(cfg);
                            }
                            break;
                        //不同排行榜奖励配置不同，todo
                    }
                    var newRankProxy = game.getProxy("31" /* Rank */, 233 /* NewRank */);
                    var typeList = newRankProxy.getRankTypeList();
                    if (typeList && typeList.indexOf(rankType) > -1) {
                        var cfgs = game.getConfigByNameId("rank_reward.json" /* RankReward */, rankType);
                        for (var k in cfgs) {
                            if (cfgs[k]) {
                                cfgList.push(cfgs[k]);
                            }
                        }
                    }
                    return cfgList;
                };
                /**功能开启刷新按钮*/
                RankProxy.prototype.onOpenFuncUpdate = function (n) {
                    var addIdx = n.body;
                    for (var k in this._model.rankTypeToOpenIdx) {
                        var openIdx = this._model.rankTypeToOpenIdx[k];
                        if (addIdx.indexOf(openIdx) > -1) {
                            var rankType = parseInt(k);
                            this.updateHint(rankType);
                        }
                    }
                };
                return RankProxy;
            }(game.ProxyBase));
            rank.RankProxy = RankProxy;
            __reflect(RankProxy.prototype, "game.mod.rank.RankProxy", ["game.mod.IRankProxy", "base.IProxy"]);
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var NewRankGodRender = /** @class */ (function (_super) {
                __extends(NewRankGodRender, _super);
                function NewRankGodRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                NewRankGodRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("31" /* Rank */, 233 /* NewRank */);
                };
                NewRankGodRender.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                NewRankGodRender.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var confCfg = game.getConfigByNameId("rank_conf.json" /* RankConf */, data.rankType);
                    var cfg = data.cfg;
                    var desc = this._proxy.getGodCondition(data.rankType, cfg.level);
                    this.lab_title.text = game.StringUtil.substitute(confCfg.god_desc, [desc]);
                    var rankInfo = data.rankInfo;
                    this.currentState = rankInfo ? "2" : "1";
                    if (this.currentState == "2") {
                        //上榜玩家
                        this.head.updateHeadShow(rankInfo.head, rankInfo.head_frame, rankInfo.sex, rankInfo.role_id, rankInfo.server_id, rankInfo.is_robot);
                        this.lab_name.text = rankInfo.name;
                    }
                    this._itemList.source = cfg.award;
                    var canDraw = data.status == 1 /* Finish */;
                    var hasDraw = data.status == 3 /* Draw */;
                    this.img_get.visible = hasDraw;
                    this.btn_get.visible = !hasDraw;
                    this.btn_get.redPoint.visible = canDraw;
                    if (canDraw) {
                        this.btn_get.setYellow();
                    }
                    else {
                        this.btn_get.setDisabled();
                    }
                };
                NewRankGodRender.prototype.onClickGet = function () {
                    if (!this.data) {
                        return;
                    }
                    var data = this.data;
                    this._proxy.c2s_dashen_rank_award(data.rankType, data.cfg.index);
                };
                return NewRankGodRender;
            }(mod.RankGodRender));
            rank.NewRankGodRender = NewRankGodRender;
            __reflect(NewRankGodRender.prototype, "game.mod.rank.NewRankGodRender");
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var NewRankItem = /** @class */ (function (_super) {
                __extends(NewRankItem, _super);
                function NewRankItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.rank.NewRankItemSkin";
                    return _this;
                }
                NewRankItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("31" /* Rank */, 233 /* NewRank */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
                };
                NewRankItem.prototype.dataChanged = function () {
                    var rankNo = this.itemIndex + 2; //第二名开始
                    if (rankNo < 4) {
                        this.img_rank.visible = true;
                        this.lb_rank.visible = false;
                        this.img_rank.source = "rank" + rankNo;
                    }
                    else {
                        this.img_rank.visible = false;
                        this.lb_rank.visible = true;
                        this.lb_rank.text = rankNo + '';
                    }
                    this.currentState = rankNo < 4 ? 'first' : 'default';
                    var data = this.data;
                    if (!data || !data.info) {
                        this.head.defaultHeadShow();
                        this.lb_name.visible = this.lb_power.visible = false;
                        this.lb_notone.visible = true;
                        return;
                    }
                    var rankInfo = data.info;
                    var teammate = rankInfo.base_info;
                    if (teammate) {
                        this.head.updateHeadShow(teammate.head, teammate.head_frame, teammate.sex);
                        this.lb_name.text = teammate.name;
                    }
                    var powerDesc = this._proxy.getPowerByRankInfo(data.type, rankInfo);
                    if (data.type != 2004 /* Xiuxian */ && data.type != 2003 /* Dengji */) {
                        powerDesc = game.getLanById("showpower" /* showpower */) + ':' + powerDesc;
                    }
                    this.lb_power.text = powerDesc;
                    this.lb_name.visible = this.lb_power.visible = true;
                    this.lb_notone.visible = false;
                };
                NewRankItem.prototype.onClick = function () {
                    if (!this.data || !this.data.info) {
                        return;
                    }
                    var teammate = this.data.info.base_info;
                    if (teammate) {
                        mod.ViewMgr.getIns().showRoleTips(teammate.role_id, teammate.server_id);
                    }
                };
                return NewRankItem;
            }(mod.BaseListenerRenderer));
            rank.NewRankItem = NewRankItem;
            __reflect(NewRankItem.prototype, "game.mod.rank.NewRankItem");
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var NewRankModel = /** @class */ (function () {
                function NewRankModel() {
                    /**排行榜信息*/
                    this.rank_info = {};
                    /**大神榜奖励信息*/
                    this.reward_list = {};
                    /**可点赞信息*/
                    this.worship_list = [];
                    this.hintPath = ["31" /* Rank */, "03" /* NewRankMain */, "01" /* Rank */];
                    /**在一个小时内，请求不生效*/
                    this.time_map = {};
                }
                return NewRankModel;
            }());
            rank.NewRankModel = NewRankModel;
            __reflect(NewRankModel.prototype, "game.mod.rank.NewRankModel");
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var RankFirstNameItem = /** @class */ (function (_super) {
                __extends(RankFirstNameItem, _super);
                function RankFirstNameItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.rank.RankFirstNameItemSkin";
                    return _this;
                }
                RankFirstNameItem.prototype.updateShow = function (name) {
                    this.lb_name.textFlow = game.TextUtil.parseHtml(name);
                };
                return RankFirstNameItem;
            }(eui.Component));
            rank.RankFirstNameItem = RankFirstNameItem;
            __reflect(RankFirstNameItem.prototype, "game.mod.rank.RankFirstNameItem");
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var Tween = base.Tween;
            var NewRankGodMdr = /** @class */ (function (_super) {
                __extends(NewRankGodMdr, _super);
                function NewRankGodMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.RankGodView);
                    _this.isEasyHide = true;
                    return _this;
                }
                NewRankGodMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(233 /* NewRank */);
                    this._view.touchEnabled = false;
                    this._view.list_rank.itemRenderer = rank.NewRankGodRender;
                    this._view.list_rank.dataProvider = this._listData = new eui.ArrayCollection();
                };
                NewRankGodMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_new_rank_info_update" /* ON_NEW_RANK_INFO_UPDATE */, this.onUpdateView, this);
                    this.onNt("on_rank_reward_update" /* ON_RANK_REWARD_UPDATE */, this.onUpdateView, this);
                };
                NewRankGodMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.c2s_rank_req_rank(this._showArgs, 2);
                };
                NewRankGodMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    Tween.remove(this._view.scroller);
                };
                NewRankGodMdr.prototype.onUpdateView = function (n) {
                    var type = n.body;
                    if (type != this._showArgs) {
                        return;
                    }
                    this.updateView();
                };
                NewRankGodMdr.prototype.updateView = function () {
                    var type = this._showArgs;
                    var cfgList = this._proxy.getRewardCfgList(type);
                    var list = [];
                    var hintIdx;
                    for (var i = 0; i < cfgList.length; i++) {
                        var cfg = cfgList[i];
                        var status = this._proxy.getRankRewardStatus(type, cfg.index);
                        if (status == 1 /* Finish */ && hintIdx == null) {
                            hintIdx = i;
                        }
                        var data = {
                            rankType: this._showArgs,
                            cfg: cfg,
                            status: status,
                            rankInfo: this.getRecord(i)
                        };
                        list.push(data);
                    }
                    this._listData.replaceAll(list);
                    if (hintIdx != null) {
                        // egret.callLater(() => {
                        //     ScrollUtil.scrollToV(this._view.scroller, hintIdx, 1);
                        // }, this);
                        this.moveScroller(hintIdx);
                    }
                };
                NewRankGodMdr.prototype.moveScroller = function (pos) {
                    var scroller = this._view.scroller;
                    var viewport = scroller.viewport;
                    var childHeight = 346;
                    var gap = viewport.layout.gap;
                    // let childNum = this._listData.source.length;
                    // let contentHeight = childNum * childHeight + (childNum - 1) * gap;
                    var contentHeight = viewport.contentHeight;
                    var scrollerHeight = scroller.height;
                    var moveV = childHeight * pos + (pos - 1) * gap;
                    moveV = Math.max(0, Math.min(moveV, contentHeight - scrollerHeight));
                    viewport.scrollV = moveV;
                };
                NewRankGodMdr.prototype.getRecord = function (idx) {
                    var info = this._proxy.getRankInfo(this._showArgs, 2);
                    if (!info || !info.info_list || !info.info_list[idx]) {
                        return null;
                    }
                    var data = info.info_list[idx];
                    return data.base_info ? data.base_info : null;
                };
                return NewRankGodMdr;
            }(game.MdrBase));
            rank.NewRankGodMdr = NewRankGodMdr;
            __reflect(NewRankGodMdr.prototype, "game.mod.rank.NewRankGodMdr");
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var NewRankMainMdr = /** @class */ (function (_super) {
                __extends(NewRankMainMdr, _super);
                function NewRankMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Rank */,
                            icon: "ui_tab_rank_",
                            mdr: rank.NewRankMdr,
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                            openIdx: 1041670189 /* Rank */,
                            hintTypes: ["31" /* Rank */, "03" /* NewRankMain */, "01" /* Rank */]
                        }
                    ];
                    return _this;
                }
                return NewRankMainMdr;
            }(mod.WndBaseMdr));
            rank.NewRankMainMdr = NewRankMainMdr;
            __reflect(NewRankMainMdr.prototype, "game.mod.rank.NewRankMainMdr");
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var Tween = base.Tween;
            var NewRankMdr = /** @class */ (function (_super) {
                __extends(NewRankMdr, _super);
                function NewRankMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", rank.NewRankView);
                    _this._type = 2001 /* Zhanli */;
                    //文本展示否
                    _this._clickTypes = [];
                    _this._selIdx = 0;
                    return _this;
                }
                NewRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.gr_eft.touchEnabled = false;
                    this._view.gr_efttitle.touchEnabled = false;
                    this._proxy = this.retProxy(233 /* NewRank */);
                    this._view.list_ranktype.itemRenderer = mod.BtnTabItem;
                    this._view.list_ranktype.dataProvider = this._listRankType = new eui.ArrayCollection();
                    this._view.list_rank.itemRenderer = rank.NewRankItem;
                    this._view.list_rank.dataProvider = this._listRank = new eui.ArrayCollection();
                };
                NewRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_like, egret.TouchEvent.TOUCH_TAP, this.onClickLike, this);
                    addEventListener(this._view.btn_record, egret.TouchEvent.TOUCH_TAP, this.onClickRecord, this);
                    addEventListener(this._view.list_ranktype, eui.ItemTapEvent.ITEM_TAP, this.onClickRankType, this);
                    addEventListener(this._view.frameItem, egret.TouchEvent.TOUCH_TAP, this.onClickBubbleFrameItem, this);
                    this.onNt("on_new_rank_info_update" /* ON_NEW_RANK_INFO_UPDATE */, this.onUpdateView, this);
                    this.onNt("on_rank_base_info_update" /* ON_RANK_BASE_INFO_UPDATE */, this.onUpdateView, this);
                    this.onNt("on_rank_worship_update" /* ON_RANK_WORSHIP_UPDATE */, this.onUpdateLikeTime, this);
                    this.onNt("on_rank_reward_update" /* ON_RANK_REWARD_UPDATE */, this.updateBtnHint, this);
                };
                NewRankMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.scroller.viewport.scrollV = 0;
                    this.updateRankTypeList();
                    this.sendRankType();
                };
                NewRankMdr.prototype.sendRankType = function () {
                    // if (this._proxy.inOneHour(this._type)) {
                    //     this.onUpdateView();
                    //     return;
                    // }
                    this._proxy.c2s_rank_req_rank(this._type, 1);
                };
                NewRankMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._clickTypes = [];
                    this._type = 2001 /* Zhanli */;
                    this._selIdx = 0;
                    Tween.remove(this._view.scroller);
                };
                //排行榜类型按钮
                NewRankMdr.prototype.updateRankTypeList = function () {
                    var typeList = this._proxy.getRankTypeList();
                    var list = [];
                    for (var _i = 0, typeList_2 = typeList; _i < typeList_2.length; _i++) {
                        var type = typeList_2[_i];
                        list.push({
                            name: game.getLanById(game.RankTypeName[type]) + '榜',
                            showHint: this._proxy.getHintByType(type),
                            param: type //类型
                        });
                    }
                    this._listRankType.replaceAll(list);
                    this._view.list_ranktype.selectedIndex = this._selIdx;
                };
                NewRankMdr.prototype.onUpdateView = function () {
                    this.updateTopInfo();
                };
                NewRankMdr.prototype.updateTopInfo = function () {
                    var info = this._proxy.getRankInfo(this._type);
                    var info_list = info && info.info_list ? info.info_list : [];
                    var listRank = [];
                    for (var i = 1; i < info_list.length; i++) {
                        var info_1 = info_list[i];
                        listRank.push({
                            info: info_1,
                            type: this._type
                        });
                    }
                    listRank.length = game.MAX_RANK_NUM - 1;
                    this._listRank.replaceAll(listRank);
                    this.updateBtnHint();
                    //个人战力和排名
                    var myRankNum = game.MAX_RANK_NUM + '+'; //20+
                    if (info && info.my_rank_num && info.my_rank_num <= game.MAX_RANK_NUM) {
                        myRankNum = info.my_rank_num + '';
                    }
                    this._view.lb_myrank.textFlow = game.TextUtil.parseHtml(game.StringUtil.substitute(game.getLanById("compete_mars_4" /* compete_mars_4 */), [myRankNum]));
                    this._view.lb_mypower.textFlow = game.TextUtil.parseHtml(this._proxy.getMyRankTypeDesc(this._type));
                    //模型
                    var topPlayer = info && info.info_list ? info.info_list[0] : null;
                    this._view.gr_eft.removeChildren();
                    if (!topPlayer) {
                        this.notTopPlayerView();
                    }
                    else {
                        this.updateTopPlayerView();
                    }
                };
                //没有第一名玩家
                NewRankMdr.prototype.notTopPlayerView = function () {
                    this._view.gr_eft.removeChildren();
                    this.removeEffect(this._titleId);
                    this._view.nameItem.updateShow(game.getLanById("tishi_2" /* tishi_2 */));
                    this._view.lb_liketime.text = '0';
                    this._view.power.visible = this._view.frameItem.visible = false;
                    this._view.gr_value.visible = false;
                    this._view.img_sketch.visible = true;
                };
                NewRankMdr.prototype.updateTopPlayerView = function () {
                    var info = this._proxy.getRankInfo(this._type);
                    if (!info || !info.info_list) {
                        return;
                    }
                    var topPlayer = info.info_list[0];
                    var teammate = topPlayer.base_info;
                    var data = {
                        fashion: teammate.fashion,
                        weapon: teammate.weapon,
                        wing: teammate.wing,
                        sex: teammate.sex
                    };
                    this.updateRankUIRole(this._view.gr_eft, data);
                    this._view.img_sketch.visible = false;
                    var clicked = this._clickTypes.indexOf(this._type) > -1;
                    this._view.frameItem.visible = !clicked;
                    var cfg = this._proxy.getConfCfg(this._type);
                    if (cfg && this._view.frameItem.visible) {
                        this._view.frameItem.updateShow(cfg.desc);
                    }
                    if (cfg && cfg.title_id) {
                        this.removeEffect(this._titleId);
                        this._titleId = this.addEftByParent(game.ResUtil.getTitleSrc(cfg.title_id, 0), this._view.gr_efttitle);
                    }
                    this._view.nameItem.updateShow(teammate.name);
                    this.updateLikeTime(topPlayer.worshiped_times || 0);
                    this._view.gr_value.visible = this._type == 2003 /* Dengji */ || this._type == 2004 /* Xiuxian */;
                    this._view.power.visible = !this._view.gr_value.visible;
                    var valueDesc = this._proxy.getPowerByRankInfo(this._type, topPlayer);
                    if (this._view.power.visible) {
                        this._view.power.setPowerValue(valueDesc);
                    }
                    else {
                        this._view.lb_value.text = valueDesc;
                    }
                };
                //点赞前端自行更次数，重新请求再刷新
                NewRankMdr.prototype.onUpdateLikeTime = function (n) {
                    var _this = this;
                    //跳转到下一个可以点赞的类型
                    var worshipList = this._proxy.getWorshipList();
                    if (worshipList && worshipList.length) {
                        this._type = worshipList[0];
                        var typeList = this._proxy.getRankTypeList();
                        this._selIdx = typeList.indexOf(this._type);
                        this.sendRankType();
                        //滚动
                        if (this._selIdx > 7) {
                            egret.callLater(function () {
                                mod.ScrollUtil.moveVToAssign(_this._view.scroller, _this._selIdx, 66);
                            }, this);
                        }
                        return;
                    }
                    //没有下一个可点赞的，停留在当前
                    var type = n.body;
                    if (type != this._type) {
                        return;
                    }
                    var info = this._proxy.getRankInfo(type);
                    if (!info || !info.info_list) {
                        return;
                    }
                    var topPlayer = info.info_list[0];
                    topPlayer.worshiped_times = (topPlayer.worshiped_times || 0) + 1;
                    this.updateLikeTime(topPlayer.worshiped_times);
                    this.updateBtnHint();
                };
                NewRankMdr.prototype.updateLikeTime = function (cnt) {
                    this._view.lb_liketime.text = cnt + '';
                };
                NewRankMdr.prototype.onClickLike = function () {
                    if (this._proxy.canWorship(this._type)) {
                        this._proxy.c2s_rank_worship(this._type);
                    }
                };
                NewRankMdr.prototype.onClickRecord = function () {
                    mod.ViewMgr.getIns().showSecondPop("31" /* Rank */, "04" /* NewRankGod */, this._type);
                };
                NewRankMdr.prototype.onClickRankType = function (e) {
                    var item = e.item;
                    if (!item || item.param == this._type) {
                        return;
                    }
                    this._type = item.param;
                    var typeList = this._proxy.getRankTypeList();
                    this._selIdx = typeList.indexOf(this._type);
                    this.sendRankType();
                };
                //点击后隐藏
                NewRankMdr.prototype.onClickBubbleFrameItem = function () {
                    this._view.frameItem.visible = false;
                    if (this._clickTypes.indexOf(this._type) < 0) {
                        this._clickTypes.push(this._type);
                    }
                };
                NewRankMdr.prototype.updateBtnHint = function () {
                    this._view.btn_like.setHint(this._proxy.canWorship(this._type));
                    this._view.btn_record.setHint(this._proxy.canGetReward(this._type));
                    this.updateRankTypeList();
                };
                return NewRankMdr;
            }(game.EffectMdrBase));
            rank.NewRankMdr = NewRankMdr;
            __reflect(NewRankMdr.prototype, "game.mod.rank.NewRankMdr");
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var ArrayCollection = eui.ArrayCollection;
            var RankGodMdr = /** @class */ (function (_super) {
                __extends(RankGodMdr, _super);
                function RankGodMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.RankGodView);
                    _this.isEasyHide = true;
                    return _this;
                }
                RankGodMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankGodRender;
                    this._view.list_rank.dataProvider = this._itemList;
                };
                RankGodMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_rank_reward_info_update" /* ON_RANK_REWARD_INFO_UPDATE */, this.onRankRewardUpdate, this);
                };
                RankGodMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._rankType = this._showArgs;
                    this.updateItemList();
                };
                RankGodMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                RankGodMdr.prototype.onRankRewardUpdate = function (n) {
                    var rankType = n.body;
                    if (rankType == this._rankType) {
                        this.updateItemList();
                    }
                };
                RankGodMdr.prototype.updateItemList = function () {
                    var infos = mod.RankUtil.getGodInfos(this._rankType);
                    if (this._itemList.source.length) {
                        this._itemList.replaceAll(infos);
                    }
                    else {
                        this._itemList.source = infos;
                    }
                };
                return RankGodMdr;
            }(game.EffectMdrBase));
            rank.RankGodMdr = RankGodMdr;
            __reflect(RankGodMdr.prototype, "game.mod.rank.RankGodMdr");
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var RankMainMdr = /** @class */ (function (_super) {
                __extends(RankMainMdr, _super);
                function RankMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Rank */,
                            icon: "ui_tab_rank_",
                            title: "pass_rank" /* pass_rank */,
                            bg: "pass_rank_bg",
                            mdr: rank.RankMdr,
                        }
                    ];
                    return _this;
                }
                return RankMainMdr;
            }(mod.WndBaseMdr));
            rank.RankMainMdr = RankMainMdr;
            __reflect(RankMainMdr.prototype, "game.mod.rank.RankMainMdr");
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var rank;
        (function (rank) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var RankMdr = /** @class */ (function (_super) {
                __extends(RankMdr, _super);
                function RankMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    return _this;
                }
                RankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankRender;
                    this._view.list_rank.dataProvider = this._itemList;
                };
                RankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_god, TouchEvent.TOUCH_TAP, this.onClickGod);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                };
                RankMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.btn_god.visible = true;
                    this._rankType = this._showArgs[0];
                    this.updateShow();
                    this.updateHint();
                };
                RankMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                RankMdr.prototype.onClickGod = function () {
                    mod.ViewMgr.getIns().showSecondPop("31" /* Rank */, "02" /* RankGod */, this._rankType);
                };
                RankMdr.prototype.updateShow = function () {
                    var rankInfo = mod.RankUtil.getRankInfo(this._rankType);
                    var topInfo = rankInfo ? rankInfo.top_info : null;
                    if (topInfo) {
                        this.updateRankUIRole(this._view.grp_eff, topInfo);
                    }
                    var rankStr = game.getLanById("tishi_12" /* tishi_12 */) + "："; //我的排行：
                    rankStr += rankInfo && rankInfo.my_info && rankInfo.my_info.rank_no <= game.MAX_RANK_NUM ? rankInfo.my_info.rank_no : game.MAX_RANK_NUM + "+"; //20+
                    this._view.lab_rank.text = rankStr;
                    var count = rankInfo && rankInfo.my_info && rankInfo.my_info.count ? rankInfo.my_info.count : 0;
                    this._view.lab_num.text = game.getLanById("cycle_tower1" /* cycle_tower1 */) + "：" + count; //通关层数：0
                    var infos = rankInfo && rankInfo.info_list ? rankInfo.info_list : [];
                    this._itemList.source = infos;
                };
                /** 通用红点事件监听 */
                RankMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    if (!this._rankType) {
                        return;
                    }
                    var hintType = mod.RankUtil.getHintTypes(this._rankType);
                    if (data.node == mod.HintMgr.getType(hintType)) {
                        this.setHint(data.value);
                    }
                };
                /** 更新红点 */
                RankMdr.prototype.updateHint = function () {
                    var hintType = mod.RankUtil.getHintTypes(this._rankType);
                    this.setHint(mod.HintMgr.getHint(hintType));
                };
                /** 设置红点 */
                RankMdr.prototype.setHint = function (val) {
                    this._view.btn_god.redPoint.visible = val;
                };
                return RankMdr;
            }(game.EffectMdrBase));
            rank.RankMdr = RankMdr;
            __reflect(RankMdr.prototype, "game.mod.rank.RankMdr");
        })(rank = mod.rank || (mod.rank = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=rank.js.map