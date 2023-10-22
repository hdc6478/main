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
        var xianlu;
        (function (xianlu) {
            var XiuxianBreakItem = /** @class */ (function (_super) {
                __extends(XiuxianBreakItem, _super);
                function XiuxianBreakItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XiuxianBreakItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.img_icon.source = this.data.icon;
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(this.data.desc);
                };
                return XiuxianBreakItem;
            }(eui.ItemRenderer));
            xianlu.XiuxianBreakItem = XiuxianBreakItem;
            __reflect(XiuxianBreakItem.prototype, "game.mod.xianlu.XiuxianBreakItem");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XianluMod = /** @class */ (function (_super) {
                __extends(XianluMod, _super);
                function XianluMod() {
                    return _super.call(this, "41" /* Xianlu */) || this;
                }
                XianluMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                XianluMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    var self = this;
                    self.regProxy(186 /* Xianlu */, xianlu.XianluProxy);
                };
                XianluMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    var self = this;
                    self.regMdr("01" /* XianluMain */, xianlu.XianluMainMdr);
                    self.regMdr("02" /* XiuxianPreview */, xianlu.XiuxianPreviewMdr);
                    self.regMdr("03" /* XiuxianTips */, xianlu.XiuxianTipsMdr);
                    self.regMdr("04" /* XiandanTips */, xianlu.XiandanTipsMdr);
                    self.regMdr("05" /* LingchiDetail */, xianlu.LingchiDetailMdr);
                    self.regMdr("06" /* LingchiBattle */, xianlu.LingchiBattleMdr);
                    self.regMdr("07" /* LingmaiDetail */, xianlu.LingmaiDetailMdr);
                    self.regMdr("08" /* LingmaiUp */, xianlu.LingmaiUpMdr);
                    self.regMdr("09" /* XiuxianBreakTips */, xianlu.XiuxianBreakTipsMdr);
                };
                return XianluMod;
            }(game.ModBase));
            xianlu.XianluMod = XianluMod;
            __reflect(XianluMod.prototype, "game.mod.xianlu.XianluMod");
            gso.modCls.push(XianluMod);
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var s2c_xianlu_reinc_info = msg.s2c_xianlu_reinc_info;
            var c2s_xianlu_reinc_levelup = msg.c2s_xianlu_reinc_levelup;
            var c2s_xianlu_reinc_getreward = msg.c2s_xianlu_reinc_getreward;
            var c2s_xian_dan_use_pill = msg.c2s_xian_dan_use_pill;
            var s2c_xian_dan_all_info = msg.s2c_xian_dan_all_info;
            var attributes = msg.attributes;
            var c2s_lingpool_time_reward = msg.c2s_lingpool_time_reward;
            var c2s_lingpool_levelup = msg.c2s_lingpool_levelup;
            var c2s_lingpool_add_unit = msg.c2s_lingpool_add_unit;
            var s2c_lingpool_data_info = msg.s2c_lingpool_data_info;
            var TimeMgr = base.TimeMgr;
            var c2s_lingpool_onekey_unit = msg.c2s_lingpool_onekey_unit;
            var s2c_lingmai_data_info = msg.s2c_lingmai_data_info;
            var s2c_linggen_data_info = msg.s2c_linggen_data_info;
            var c2s_lingmai_levelup = msg.c2s_lingmai_levelup;
            var c2s_linggen_levelup = msg.c2s_linggen_levelup;
            var facade = base.facade;
            var XianluProxy = /** @class */ (function (_super) {
                __extends(XianluProxy, _super);
                function XianluProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(XianluProxy.prototype, "model", {
                    /**获取模块数据，对模块内开放*/
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                XianluProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new xianlu.XianluModel();
                    this.onProto(s2c_xianlu_reinc_info, this.s2c_xianlu_reinc_info, this);
                    this.onProto(s2c_xian_dan_all_info, this.s2c_xian_dan_all_info, this);
                    this.onProto(s2c_lingpool_data_info, this.s2c_lingpool_data_info, this);
                    this.onProto(s2c_lingmai_data_info, this.s2c_lingmai_data_info, this);
                    this.onProto(s2c_linggen_data_info, this.s2c_linggen_data_info, this);
                    facade.onNt("on_shen_ling_update_cnt" /* ON_SHEN_LING_UPDATE_CNT */, this.updatePoolBattleHint, this);
                };
                XianluProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    this._model.index = null;
                };
                XianluProxy.prototype.s2c_xianlu_reinc_info = function (n) {
                    var msg = n.body;
                    //飞升成功提示
                    var info;
                    if (this._model.index && msg.index && msg.index > this._model.index) {
                        //转生index变化时，判断当前下发的转生index重数是否为1
                        var lv = mod.RoleUtil.getRebirthSubLv(msg.index);
                        if (lv == 1) {
                            ////上一转生index，上一仙魄等级，上一级仙魄属性
                            info = { lastIndex: this._model.index, lastLv: this._model.xianpolevel, lastXianpoAttr: mod.RoleUtil.clone(this._model.xianpo_attr) };
                        }
                    }
                    //设置仙力效果进玩家 RoleVo，这样原来的代码就不用改多少了。
                    //仙魄等级
                    var xianpolevel = msg.xianpolevel;
                    var cfg = game.getConfigByNameId("godpower.json" /* Godpower */, xianpolevel);
                    if (cfg) {
                        game.RoleVo.ins.setValueByKey("god_rate" /* god_rate */, cfg.god_rate);
                    }
                    else {
                        game.RoleVo.ins.setValueByKey("god_rate" /* god_rate */, 0);
                    }
                    for (var k in msg) {
                        this._model[k] = msg[k];
                    }
                    if (info) {
                        this.sendNt("reincarnate_info_update" /* REINCARNATE_INFO_UPDATE */); //转数发送变化才发送
                        facade.showView("41" /* Xianlu */, "09" /* XiuxianBreakTips */, info);
                    }
                    if (msg.rewardstatus != undefined) {
                        var hint = msg.rewardstatus == 1 /* Finish */;
                        mod.HintMgr.setHint(hint, this._model.rewardHint);
                    }
                    if (msg.index != undefined) {
                        //转生等级变化
                        this.updatePillHint();
                        this.updatePoolUpHint();
                        this.updatePoolBattleHint();
                        this.updateLingmaiHint();
                        this.updateLinggenHint();
                    }
                    this.sendNt("xiuxian_info_update" /* XIUXIAN_INFO_UPDATE */);
                };
                XianluProxy.prototype.c2s_xianlu_reinc_levelup = function () {
                    var msg = new c2s_xianlu_reinc_levelup();
                    this.sendProto(msg);
                };
                XianluProxy.prototype.c2s_xianlu_reinc_getreward = function () {
                    var msg = new c2s_xianlu_reinc_getreward();
                    this.sendProto(msg);
                };
                XianluProxy.prototype.getEndTime = function () {
                    return game.TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, 1);
                };
                /**修仙是否可以飞升*/
                XianluProxy.prototype.canBreak = function () {
                    var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, this._model.index);
                    if (!cfg) {
                        return false;
                    }
                    var nextIndex = cfg.next_index;
                    if (!nextIndex) {
                        /**满级*/
                        return false;
                    }
                    // let nextCfg: RebirthConfig = getConfigByNameId(ConfigName.Rebirth, nextIndex);
                    // if(cfg.relv == nextCfg.relv){
                    //     /**下一级不是突破*/
                    //     return false;
                    // }
                    return mod.TaskUtil.hasRewardAllDraw(3 /* Xiuxian */);
                };
                /**修仙是否还有下一转*/
                XianluProxy.prototype.getNextCfg = function () {
                    var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, this._model.index);
                    if (!cfg) {
                        return null;
                    }
                    var nextIndex = cfg.next_index;
                    if (!nextIndex) {
                        /**满级*/
                        return null;
                    }
                    var nextCfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, nextIndex);
                    while (nextCfg && cfg.relv == nextCfg.relv) {
                        /**下一级不是突破*/
                        nextIndex = nextCfg.next_index;
                        nextCfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, nextIndex);
                    }
                    if (nextCfg && cfg.relv < nextCfg.relv) {
                        return nextCfg; //下一转的index
                    }
                    return null;
                };
                /**修仙当前最大重数*/
                XianluProxy.prototype.getMaxChongLv = function () {
                    var maxLv = 3;
                    var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, this._model.index);
                    if (!cfg) {
                        return maxLv;
                    }
                    var nextIndex = cfg.next_index;
                    if (!nextIndex) {
                        /**满级*/
                        return cfg.relv2;
                    }
                    var nextCfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, nextIndex);
                    while (nextCfg && cfg.relv == nextCfg.relv) {
                        /**下一级不是突破*/
                        nextIndex = nextCfg.next_index;
                        nextCfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, nextIndex);
                        if (nextCfg.relv2 > maxLv) {
                            maxLv = nextCfg.relv2;
                        }
                    }
                    return maxLv;
                };
                XianluProxy.prototype.c2s_xian_dan_use_pill = function (index) {
                    var msg = new c2s_xian_dan_use_pill();
                    msg.pillindex = index;
                    this.sendProto(msg);
                };
                XianluProxy.prototype.s2c_xian_dan_all_info = function (n) {
                    var msg = n.body;
                    if (!this._model.pill_list) {
                        this._model.pill_list = msg.pill_list;
                    }
                    else {
                        for (var _i = 0, _a = msg.pill_list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            var pos = this.getPillPos(info.pillindex);
                            if (pos >= 0) {
                                this._model.pill_list[pos] = info;
                            }
                            else {
                                this._model.pill_list.push(info);
                            }
                        }
                    }
                    this.updatePillHint();
                    this.sendNt("xiandan_info_update" /* XIANDAN_INFO_UPDATE */);
                };
                XianluProxy.prototype.getPillPos = function (index) {
                    if (!this._model.pill_list || !this._model.pill_list.length) {
                        return -1;
                    }
                    var len = this._model.pill_list.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.pill_list[i];
                        if (info.pillindex == index) {
                            return i;
                        }
                    }
                    return -1;
                };
                /**仙丹使用数量*/
                XianluProxy.prototype.getPillUseCnt = function (index) {
                    var pos = this.getPillPos(index);
                    if (pos >= 0) {
                        return this._model.pill_list[pos].usecount;
                    }
                    return 0;
                };
                /**仙丹最大使用数量*/
                XianluProxy.prototype.getPillMaxUseCnt = function (cfg, nextIndex) {
                    var limitLv = this.getLimitLv(cfg); //吞噬限制转生等级
                    var index = nextIndex ? nextIndex : this._model.index;
                    return this.calcMaxCnt(cfg.type, limitLv, index);
                };
                //吞噬限制转生等级
                XianluProxy.prototype.getLimitLv = function (cfg) {
                    var limitIndex = cfg.eat_limit;
                    var rebirthCfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, limitIndex);
                    return rebirthCfg.relv;
                };
                //限制吞噬数量 * (转生等级 + 1 - 吞噬限制转生等级)
                XianluProxy.prototype.calcMaxCnt = function (type, limitLv, index) {
                    var limitNum = this.getLimitNum(type, limitLv); //限制吞噬数量
                    var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, index);
                    var curLv = cfg.relv; //转生等级
                    return limitNum * (curLv + 1 - limitLv);
                };
                //限制吞噬数量
                XianluProxy.prototype.getLimitNum = function (type, limitLv) {
                    var limitNum = 0; //限制吞噬数量
                    var limitCfg = game.getConfigByNameId("elixir_limit.json" /* Elixir_limit */, limitLv);
                    switch (type) {
                        case 1 /* Danyao */:
                            limitNum = limitCfg.limit_num;
                            break;
                        case 2 /* Lingdan */:
                            limitNum = limitCfg.limit_num2;
                            break;
                        case 3 /* Xiandan */:
                            limitNum = limitCfg.limit_num3;
                            break;
                    }
                    return limitNum;
                };
                XianluProxy.prototype.getPillCfgList = function (type) {
                    if (!this._model.pillCfgList[type]) {
                        var cfgList = game.getConfigListByName("elixir_init.json" /* Elixir_init */);
                        for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                            var cfg = cfgList_1[_i];
                            if (!this._model.pillCfgList[cfg.type]) {
                                this._model.pillCfgList[cfg.type] = [];
                            }
                            this._model.pillCfgList[cfg.type].push(cfg);
                        }
                    }
                    return this._model.pillCfgList[type];
                };
                XianluProxy.prototype.isPillOpen = function (cfg) {
                    var limitIndex = cfg.eat_limit;
                    return this._model.index >= limitIndex;
                };
                XianluProxy.prototype.canPillUse = function (cfg) {
                    if (!this.isPillOpen(cfg)) {
                        return false;
                    }
                    var useCnt = this.getPillUseCnt(cfg.index);
                    var maxCnt = this.getPillMaxUseCnt(cfg);
                    if (useCnt >= maxCnt) {
                        return false;
                    }
                    return mod.BagUtil.checkPropCnt(cfg.itemid);
                };
                XianluProxy.prototype.getPillAttrByType = function (type) {
                    if (!this._model.pill_list || !this._model.pill_list.length) {
                        return null;
                    }
                    var totalAttr = new attributes();
                    var len = this._model.pill_list.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.pill_list[i];
                        var index = info.pillindex;
                        var cfg = game.getConfigByNameId("elixir_init.json" /* Elixir_init */, index);
                        if (cfg.type != type) {
                            continue;
                        }
                        var useCnt = info.usecount;
                        var attr = mod.RoleUtil.getAttr(cfg.ability_index);
                        attr = game.TextUtil.calcAttr(attr, useCnt);
                        totalAttr = game.TextUtil.calcAttrList([attr, totalAttr]);
                    }
                    return totalAttr;
                };
                XianluProxy.prototype.getPillAgeByType = function (type) {
                    if (!this._model.pill_list || !this._model.pill_list.length) {
                        return 0;
                    }
                    var totalAge = 0;
                    var len = this._model.pill_list.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.pill_list[i];
                        var index = info.pillindex;
                        var cfg = game.getConfigByNameId("elixir_init.json" /* Elixir_init */, index);
                        if (cfg.type != type) {
                            continue;
                        }
                        var useCnt = info.usecount;
                        var age = useCnt * cfg.age;
                        totalAge += age;
                    }
                    return totalAge;
                };
                /**isMin：取不到buff时是否显示最小buff*/
                XianluProxy.prototype.getBuffIndex = function (type, age) {
                    var cfg = game.getConfigByNameId("elixir_buff.json" /* Elixir_buff */, type);
                    var index = 0;
                    for (var i = 0; i < cfg.age.length; ++i) {
                        var limitAge = cfg.age[i];
                        if (age < limitAge) {
                            break;
                        }
                        index = cfg.buff_index[i];
                    }
                    return index;
                };
                /**取下一阶修为和buff的index*/
                XianluProxy.prototype.getNextAgeIndex = function (type) {
                    var age = this.getPillAgeByType(type);
                    var cfg = game.getConfigByNameId("elixir_buff.json" /* Elixir_buff */, type);
                    for (var i = 0; i < cfg.age.length; ++i) {
                        var limitAge = cfg.age[i];
                        if (age < limitAge) {
                            return i;
                        }
                    }
                    return -1;
                };
                /**更新红点*/
                XianluProxy.prototype.updatePillHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670085 /* Xiandan */)) {
                        return;
                    }
                    for (var i = 1; i <= 3 /* Xiandan */; ++i) {
                        var hint = false;
                        var hintType = this._model.pillHints[i - 1];
                        var cfgList = this.getPillCfgList(i);
                        for (var _i = 0, cfgList_2 = cfgList; _i < cfgList_2.length; _i++) {
                            var cfg = cfgList_2[_i];
                            if (this.canPillUse(cfg)) {
                                hint = true;
                                break;
                            }
                        }
                        mod.HintMgr.setHint(hint, hintType);
                    }
                };
                XianluProxy.prototype.c2s_lingpool_time_reward = function () {
                    var msg = new c2s_lingpool_time_reward();
                    this.sendProto(msg);
                };
                XianluProxy.prototype.c2s_lingpool_levelup = function (type) {
                    var msg = new c2s_lingpool_levelup();
                    msg.pooltype = type;
                    this.sendProto(msg);
                };
                XianluProxy.prototype.c2s_lingpool_add_unit = function (type, index) {
                    var msg = new c2s_lingpool_add_unit();
                    msg.pooltype = type;
                    msg.unitid = Long.fromValue(index);
                    this.sendProto(msg);
                };
                XianluProxy.prototype.c2s_lingpool_onekey_unit = function (type) {
                    var msg = new c2s_lingpool_onekey_unit();
                    msg.pooltype = type;
                    this.sendProto(msg);
                };
                XianluProxy.prototype.s2c_lingpool_data_info = function (n) {
                    var msg = n.body;
                    if (!this._model.pool_list) {
                        this._model.pool_list = msg.poollist;
                    }
                    else {
                        for (var _i = 0, _a = msg.poollist; _i < _a.length; _i++) {
                            var info = _a[_i];
                            var pos = this.getPoolPos(info.pooltype);
                            if (pos >= 0) {
                                this._model.pool_list[pos] = info;
                            }
                            else {
                                this._model.pool_list.push(info);
                            }
                        }
                    }
                    this.updatePoolHint();
                    this.sendNt("lingchi_info_update" /* LINGCHI_INFO_UPDATE */);
                };
                XianluProxy.prototype.getPoolPos = function (type) {
                    if (!this._model.pool_list || !this._model.pool_list.length) {
                        return -1;
                    }
                    var len = this._model.pool_list.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.pool_list[i];
                        if (info.pooltype == type) {
                            return i;
                        }
                    }
                    return -1;
                };
                XianluProxy.prototype.isPoolOpen = function (cfg) {
                    return this._model.index >= cfg.pool_condition;
                };
                /**灵池格子是否开启*/
                XianluProxy.prototype.isPoolGridOpen = function (index) {
                    return this._model.index >= index;
                };
                XianluProxy.prototype.getPoolInfo = function (type) {
                    var pos = this.getPoolPos(type);
                    if (pos >= 0) {
                        return this._model.pool_list[pos];
                    }
                    return null;
                };
                XianluProxy.prototype.getPoolGridInfos = function (type) {
                    var info = this.getPoolInfo(type);
                    var list = [];
                    if (!info.unitlist) {
                        return list;
                    }
                    for (var _i = 0, _a = info.unitlist; _i < _a.length; _i++) {
                        var i = _a[_i];
                        if (!i.unitid) {
                            //服务端会存0
                            continue;
                        }
                        list.push(i);
                    }
                    return list;
                };
                XianluProxy.prototype.getPoolGridIndex = function (type, pos) {
                    var infos = this.getPoolGridInfos(type);
                    for (var _i = 0, infos_1 = infos; _i < infos_1.length; _i++) {
                        var i = infos_1[_i];
                        if (i.pos == pos) {
                            return i.unitid.toNumber();
                        }
                    }
                    return 0;
                };
                /**收益加成，出战神灵品质计算）,万分比，index神灵index*/
                XianluProxy.prototype.getShenlingAdd = function (index) {
                    var pCfg = game.GameConfig.getParamConfigById("lingchi_dispatch");
                    var datas = pCfg.value;
                    var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, index);
                    if (!cfg) {
                        return 0;
                    }
                    var quality = cfg.quality;
                    for (var _i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
                        var i = datas_1[_i];
                        if (i[0] == quality) {
                            return i[1];
                        }
                    }
                    return datas[0][1]; //取不到返回第一个
                };
                /**单个灵池总的收益加成，根据出战神灵品质计算）,万分比*/
                //实际神灵精华获取数量 = 产出材料基础数据output * （1 + 对应品质灵将增幅系数之和_参数表lingchi_dispatch + 特权）
                XianluProxy.prototype.calcPoolAdd = function (info) {
                    var shenlingAdd = this.calcShenlingAdd(info);
                    var privilegeValue = mod.RoleUtil.getPrivilegeValue("lingchi_income" /* lingchi_income */); //万分比
                    return shenlingAdd + privilegeValue; //特权加成
                };
                /**计算神灵加成*/
                XianluProxy.prototype.calcShenlingAdd = function (info) {
                    var totalAdd = 0;
                    if (!info.unitlist || !info.unitlist.length) {
                        return totalAdd;
                    }
                    for (var _i = 0, _a = info.unitlist; _i < _a.length; _i++) {
                        var i = _a[_i];
                        if (!i.unitid) {
                            continue;
                        }
                        totalAdd += this.getShenlingAdd(i.unitid.toNumber());
                    }
                    return totalAdd;
                };
                /**单次收获*/
                /**实际神灵精华获取数量 = 产出材料基础数据_output * （1 + 对应品质灵将增幅系数之和_参数表lingchi_dispatch + buff提升）*/
                XianluProxy.prototype.calcPoolPerGain = function (info) {
                    var cfg = this.getPoolCfg(info.pooltype, info.level);
                    if (!cfg) {
                        return 0;
                    }
                    var output = cfg.output[0][1];
                    return Math.floor(output * (1 + this.calcPoolAdd(info) / 10000));
                };
                /**计算单个灵池总收获*/
                XianluProxy.prototype.calcPoolAllGain = function (info) {
                    var perGain = this.calcPoolPerGain(info);
                    var startTime = info.opentime;
                    var pCfg1 = game.GameConfig.getParamConfigById("lingchi_limit");
                    var maxTime = pCfg1.value;
                    var allTime = Math.min(maxTime, TimeMgr.time.serverTimeSecond - startTime);
                    var pCfg2 = game.GameConfig.getParamConfigById("lingchi_once");
                    var perTime = pCfg2.value;
                    var cnt = Math.floor(allTime / perTime);
                    return perGain * cnt;
                };
                XianluProxy.prototype.getPoolCfg = function (type, lv) {
                    //147001001
                    var index = 147000000 + type * 1000 + lv;
                    return game.getConfigByNameId("pool.json" /* Pool */, index);
                };
                Object.defineProperty(XianluProxy.prototype, "poolType", {
                    get: function () {
                        return this._model.poolType;
                    },
                    set: function (type) {
                        this._model.poolType = type;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianluProxy.prototype, "battleView", {
                    get: function () {
                        return this._model.battleView;
                    },
                    set: function (val) {
                        this._model.battleView = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**获取当前可以出战的神灵列表，withoutType：去掉当前已经派遣的神灵*/
                XianluProxy.prototype.getShenlingList = function (type, withoutType) {
                    var proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var list = proxy.getActedList();
                    var battleList = [];
                    var tmpList = [];
                    for (var _i = 0, _a = this._model.pool_list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.pooltype == type && !withoutType) {
                            continue;
                        }
                        if (!info.unitlist) {
                            continue;
                        }
                        for (var _b = 0, _c = info.unitlist; _b < _c.length; _b++) {
                            var i = _c[_b];
                            if (!i.unitid) {
                                continue;
                            }
                            battleList.push(i.unitid.toNumber());
                        }
                    }
                    for (var _d = 0, list_1 = list; _d < list_1.length; _d++) {
                        var index = list_1[_d];
                        if (battleList.indexOf(index) > -1) {
                            continue;
                        }
                        tmpList.push(index);
                    }
                    var allList = [];
                    for (var _e = 0, tmpList_1 = tmpList; _e < tmpList_1.length; _e++) {
                        var i = tmpList_1[_e];
                        var order = this.getShenlingAdd(i) + i;
                        if (this.isBattle(type, i)) {
                            order += 1000;
                        }
                        allList.push({ index: i, order: order });
                    }
                    allList.sort(function (v1, v2) {
                        return v2.order - v1.order;
                    });
                    tmpList = [];
                    for (var _f = 0, allList_1 = allList; _f < allList_1.length; _f++) {
                        var item = allList_1[_f];
                        tmpList.push(item.index);
                    }
                    return tmpList;
                };
                XianluProxy.prototype.isBattle = function (type, index) {
                    var infos = this.getPoolGridInfos(type);
                    for (var _i = 0, infos_2 = infos; _i < infos_2.length; _i++) {
                        var i = infos_2[_i];
                        if (i.unitid.toNumber() == index) {
                            return true;
                        }
                    }
                    return false;
                };
                XianluProxy.prototype.updatePoolHint = function () {
                    this.updatePoolRewardHint();
                    this.updatePoolUpHint();
                    this.updatePoolBattleHint();
                };
                XianluProxy.prototype.updatePoolRewardHint = function () {
                    var hint = false;
                    for (var _i = 0, _a = this._model.pool_list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        var allGain = this.calcPoolAllGain(info);
                        if (allGain > 0) {
                            hint = true;
                            break;
                        }
                    }
                    if (!hint) {
                        var minNextTime = this.getPoolMinNextTime();
                        if (minNextTime > 0) {
                            mod.HintMgr.addTimeEvent(3 /* Lingchi */, minNextTime + TimeMgr.time.serverTimeSecond, this, this.updatePoolRewardHint);
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.poolRewardHint);
                };
                /**获取灵池下次最小收益时间*/
                XianluProxy.prototype.getPoolMinNextTime = function () {
                    var minNextTime = 0;
                    var pCfg1 = game.GameConfig.getParamConfigById("lingchi_limit");
                    var maxTime = pCfg1.value;
                    var pCfg2 = game.GameConfig.getParamConfigById("lingchi_once");
                    var perTime = pCfg2.value;
                    for (var _i = 0, _a = this._model.pool_list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        var startTime = info.opentime;
                        var leftTime = startTime + maxTime - TimeMgr.time.serverTimeSecond;
                        if (leftTime <= 0) {
                            continue;
                        }
                        var nextTime = leftTime % perTime;
                        if (!minNextTime || minNextTime < nextTime) {
                            minNextTime = nextTime;
                        }
                    }
                    return minNextTime;
                };
                /**道具变更时需要刷新*/
                XianluProxy.prototype.updatePoolUpHint = function () {
                    if (!this._model.pool_list || !this._model.pool_list.length) {
                        return;
                    }
                    var hint = false;
                    for (var _i = 0, _a = this._model.pool_list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (this.canPoolUp(info)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.poolUpHint);
                };
                XianluProxy.prototype.canPoolUp = function (info) {
                    var type = info.pooltype;
                    var lv = info.level;
                    var cfg = this.getPoolCfg(type, lv);
                    var cost = cfg.upgrade;
                    var isMax = !cost || !cost.length;
                    if (isMax) {
                        return false;
                    }
                    for (var _i = 0, cost_1 = cost; _i < cost_1.length; _i++) {
                        var i = cost_1[_i];
                        if (!mod.BagUtil.checkPropCnt(i[0], i[1])) {
                            return false;
                        }
                    }
                    return true;
                };
                /**神灵变更时需要刷新*/
                XianluProxy.prototype.updatePoolBattleHint = function () {
                    if (!this._model.pool_list || !this._model.pool_list.length) {
                        return;
                    }
                    var hint = false;
                    for (var _i = 0, _a = this._model.pool_list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (this.canPoolBattle(info)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.poolBattleHint);
                };
                XianluProxy.prototype.canPoolBattle = function (info) {
                    var cfg = game.getConfigByNameId("grid.json" /* Grid */, info.pooltype);
                    for (var i = 0; i < cfg.grid_condition.length; ++i) {
                        var index = cfg.grid_condition[i]; //index：开启条件，转生index
                        var isOpen = this.isPoolGridOpen(index);
                        if (!isOpen) {
                            continue;
                        }
                        var pos = i + 1;
                        if (this.canPoolGridBattle(info.pooltype, pos)) {
                            return true;
                        }
                    }
                    return false;
                };
                XianluProxy.prototype.canPoolGridBattle = function (type, pos) {
                    var curIndex = this.getPoolGridIndex(type, pos);
                    var datas = this.getShenlingList(type, true);
                    if (!curIndex) {
                        return !!datas.length;
                    }
                    //更好的神灵可以派遣
                    for (var _i = 0, datas_2 = datas; _i < datas_2.length; _i++) {
                        var i = datas_2[_i];
                        if (this.checkBestShenling(i, curIndex)) {
                            return true;
                        }
                    }
                    return false;
                };
                XianluProxy.prototype.checkBestShenling = function (index, curIndex) {
                    var addNum = this.getShenlingAdd(index);
                    var curAddNum = this.getShenlingAdd(curIndex);
                    return addNum > curAddNum;
                };
                XianluProxy.prototype.checkBestShenlingByIndex = function (type, gridIndex) {
                    var cfg = game.getConfigByNameId("grid.json" /* Grid */, type);
                    for (var i = 0; i < cfg.grid_condition.length; ++i) {
                        var index = cfg.grid_condition[i]; //index：开启条件，转生index
                        var isOpen = this.isPoolGridOpen(index);
                        if (!isOpen) {
                            continue;
                        }
                        var pos = i + 1;
                        var curIndex = this.getPoolGridIndex(type, pos);
                        if (!curIndex) {
                            return true;
                        }
                        if (this.checkBestShenling(gridIndex, curIndex)) {
                            return true;
                        }
                    }
                    return false;
                };
                XianluProxy.prototype.getPoolHint = function (info) {
                    if (this.canPoolUp(info)) {
                        return true;
                    }
                    if (this.canPoolBattle(info)) {
                        return true;
                    }
                    return false;
                };
                ////////////////////仙路-灵脉///////////////
                XianluProxy.prototype.c2s_lingmai_levelup = function (type) {
                    var msg = new c2s_lingmai_levelup();
                    msg.type = type;
                    this.sendProto(msg);
                };
                XianluProxy.prototype.s2c_lingmai_data_info = function (n) {
                    var msg = n.body;
                    if (!this._model.lingmai_list) {
                        this._model.lingmai_list = msg.list;
                    }
                    else {
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            var pos = this.getLingmaiPos(info.type);
                            if (pos >= 0) {
                                this._model.lingmai_list[pos] = info;
                            }
                            else {
                                this._model.lingmai_list.push(info);
                            }
                        }
                    }
                    this.updateLingmaiHint();
                    this.sendNt("lingmai_info_update" /* LINGMAI_INFO_UPDATE */);
                };
                XianluProxy.prototype.getLingmaiPos = function (type) {
                    if (!this._model.lingmai_list || !this._model.lingmai_list.length) {
                        return -1;
                    }
                    var len = this._model.lingmai_list.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.lingmai_list[i];
                        if (info.type == type) {
                            return i;
                        }
                    }
                    return -1;
                };
                XianluProxy.prototype.getLingmaiInfo = function (type) {
                    var pos = this.getLingmaiPos(type);
                    if (pos >= 0) {
                        return this._model.lingmai_list[pos];
                    }
                    return null;
                };
                /**总战力*/
                XianluProxy.prototype.getLingmaiPower = function () {
                    var power = Long.fromValue(0);
                    if (!this._model.lingmai_list || !this._model.lingmai_list.length) {
                        return power;
                    }
                    for (var _i = 0, _a = this._model.lingmai_list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        power = power.add(this.getLingmaiPerPower(info));
                    }
                    return power;
                };
                /**单个灵脉战力，需要计算突破属性*/
                XianluProxy.prototype.getLingmaiPerPower = function (info) {
                    var power = Long.fromValue(0);
                    if (!info) {
                        return power;
                    }
                    if (info.attr && info.attr.showpower) {
                        power = power.add(info.attr.showpower);
                    }
                    var cfg = game.getConfigByNameId("lingmai.json" /* Lingmai */, info.type);
                    var infos = cfg.break_property;
                    var indexList = [];
                    for (var _i = 0, infos_3 = infos; _i < infos_3.length; _i++) {
                        var i = infos_3[_i];
                        var lv = i[0]; //重数_属性ID_BUFFID
                        var attrIndex = i[1]; //重数_属性ID_BUFFID
                        if (attrIndex && info.splv >= lv) {
                            indexList.push(attrIndex);
                        }
                    }
                    var attrList = mod.RoleUtil.getAttrList(indexList); //返回所有属性
                    for (var _a = 0, attrList_1 = attrList; _a < attrList_1.length; _a++) {
                        var attr = attrList_1[_a];
                        power = power.add(attr.showpower);
                    }
                    return power;
                };
                /**灵脉达到最大重数*/
                XianluProxy.prototype.isLingmaiMax = function (info) {
                    if (!info) {
                        return false;
                    }
                    if (!this._model.lingmaiMaxLv) {
                        this._model.lingmaiMaxLv = 0;
                        var cfgList = game.getConfigByNameId("lingmai_level.json" /* LingmaiLevel */, info.type);
                        for (var k in cfgList) {
                            var lv = parseInt(k);
                            if (this._model.lingmaiMaxLv < lv) {
                                this._model.lingmaiMaxLv = lv;
                            }
                        }
                    }
                    return info.splv >= this._model.lingmaiMaxLv && info.lv >= game.LingmaiMaxLv;
                };
                XianluProxy.prototype.updateLingmaiHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670088 /* Lingmai */)) {
                        return;
                    }
                    var cfgList = game.getConfigListByName("lingmai.json" /* Lingmai */);
                    var hint = false;
                    for (var _i = 0, cfgList_3 = cfgList; _i < cfgList_3.length; _i++) {
                        var cfg = cfgList_3[_i];
                        if (this.canLingmaiUp(cfg)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.lingmaiUpHint);
                };
                XianluProxy.prototype.canLingmaiUp = function (cfg) {
                    var _info = this.getLingmaiInfo(cfg.index);
                    //let _isAct = _info && _info.splv > 0;//已激活
                    var _isAct = !!_info; //取得到信息表示已激活
                    var cost;
                    if (_isAct) {
                        //已激活
                        var isMax = this.isLingmaiMax(_info);
                        if (isMax) {
                            //已满级
                            return false;
                        }
                        var _isBreak = _info.lv >= game.LingmaiMaxLv;
                        if (_isBreak) {
                            cost = cfg.break_item[_info.splv];
                        }
                        else {
                            var cfgList = game.getConfigByNameId("lingmai_level.json" /* LingmaiLevel */, _info.type);
                            var cfg_1 = cfgList[_info.splv];
                            cost = cfg_1.grade_item[_info.lv];
                        }
                    }
                    else {
                        //未激活
                        var infos = cfg.activate_condition;
                        for (var _i = 0, infos_4 = infos; _i < infos_4.length; _i++) {
                            var info = infos_4[_i];
                            if (!mod.RoleUtil.isLimitOpen(info)) {
                                return false;
                            }
                        }
                        //满足激活条件
                        cost = cfg.break_item[0];
                    }
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                };
                ////////////////////仙路-灵根///////////////
                XianluProxy.prototype.c2s_linggen_levelup = function (index) {
                    var msg = new c2s_linggen_levelup();
                    msg.index = index;
                    this.sendProto(msg);
                };
                XianluProxy.prototype.s2c_linggen_data_info = function (n) {
                    var msg = n.body;
                    if (!this._model.linggen_list) {
                        this._model.linggen_list = msg.list;
                    }
                    else {
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            var pos = this.getLinggenPos(info.index);
                            if (pos >= 0) {
                                this._model.linggen_list[pos] = info;
                            }
                            else {
                                this._model.linggen_list.push(info);
                            }
                        }
                    }
                    this.updateLinggenHint();
                    this.sendNt("linggen_info_update" /* LINGGEN_INFO_UPDATE */);
                };
                XianluProxy.prototype.getLinggenPos = function (index) {
                    if (!this._model.linggen_list || !this._model.linggen_list.length) {
                        return -1;
                    }
                    var len = this._model.linggen_list.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.linggen_list[i];
                        if (info.index == index) {
                            return i;
                        }
                    }
                    return -1;
                };
                XianluProxy.prototype.getLinggenInfo = function (index) {
                    var pos = this.getLinggenPos(index);
                    if (pos >= 0) {
                        return this._model.linggen_list[pos];
                    }
                    return null;
                };
                XianluProxy.prototype.isLinggenTypeOpen = function (cfg, showTips) {
                    if (this._model.index < cfg.activate_condition) {
                        if (showTips) {
                            var lv = mod.RoleUtil.getRebirthLv(cfg.activate_condition);
                            var str = lv > 9 ? "common_act_tips5" /* common_act_tips5 */ : "common_act_tips1" /* common_act_tips1 */;
                            lv = lv > 9 ? (lv - 9) : lv;
                            var tipsStr = game.StringUtil.substitute(game.getLanById(str), [lv]);
                            game.PromptBox.getIns().show(tipsStr);
                        }
                        return false;
                    }
                    return true;
                };
                XianluProxy.prototype.isLinggenOpen = function (cfg) {
                    var infos = cfg.premise;
                    if (!infos) {
                        return true;
                    }
                    for (var _i = 0, infos_5 = infos; _i < infos_5.length; _i++) {
                        var info = infos_5[_i];
                        var index = info[0];
                        var lv = info[1];
                        var curInfo = this.getLinggenInfo(index);
                        if (!curInfo || curInfo.lv < lv) {
                            return false;
                        }
                    }
                    return true;
                };
                XianluProxy.prototype.getLinggenCfgList = function (type) {
                    if (!this._model.linggenCfgList[type]) {
                        var typeCfg = game.getConfigByNameId("linggen_leixing.json" /* LinggenLeixing */, type);
                        var indexList = typeCfg.linggen_index;
                        for (var _i = 0, indexList_1 = indexList; _i < indexList_1.length; _i++) {
                            var i = indexList_1[_i];
                            var cfg = game.getConfigByNameId("linggen.json" /* Linggen */, i);
                            if (!this._model.linggenCfgList[type]) {
                                this._model.linggenCfgList[type] = [];
                            }
                            this._model.linggenCfgList[type].push(cfg);
                        }
                    }
                    return this._model.linggenCfgList[type];
                };
                XianluProxy.prototype.getLinggenHint = function (cfg) {
                    var isOpen = this.isLinggenOpen(cfg);
                    if (!isOpen) {
                        return false;
                    }
                    var info = this.getLinggenInfo(cfg.index);
                    var lv = info ? info.lv : 0;
                    var maxLv = cfg.upgrade_item.length;
                    var isMax = lv >= maxLv;
                    if (isMax) {
                        return false;
                    }
                    var cost = cfg.upgrade_item[lv];
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                };
                XianluProxy.prototype.getLinggenTypeHint = function (cfg) {
                    if (!this.isLinggenTypeOpen(cfg)) {
                        return false;
                    }
                    var cfgList = this.getLinggenCfgList(cfg.type);
                    for (var _i = 0, cfgList_4 = cfgList; _i < cfgList_4.length; _i++) {
                        var cfg_2 = cfgList_4[_i];
                        if (this.getLinggenHint(cfg_2)) {
                            return true;
                        }
                    }
                    return false;
                };
                XianluProxy.prototype.updateLinggenHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670092 /* Linggen */)) {
                        return;
                    }
                    var cfgList = game.getConfigListByName("linggen_leixing.json" /* LinggenLeixing */);
                    var hint = false;
                    for (var _i = 0, cfgList_5 = cfgList; _i < cfgList_5.length; _i++) {
                        var cfg = cfgList_5[_i];
                        if (this.getLinggenTypeHint(cfg)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.linggenUpHint);
                };
                XianluProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    if (indexs.indexOf(1450100001 /* Lingmaishengdan */) >= 0) {
                        this.updateLingmaiHint();
                    }
                    if (indexs.indexOf(1450100002 /* Genjishengguo */) >= 0) {
                        this.updateLinggenHint();
                    }
                };
                XianluProxy.prototype.onBagUpdateByPropType = function (n) {
                    var types = n.body;
                    if (types.indexOf(9 /* XianDan */) < 0) {
                        return;
                    }
                    this.updatePillHint();
                };
                XianluProxy.prototype.onTaskHint = function (n) {
                    var types = n.body;
                    var type = 3 /* Xiuxian */;
                    if (types.indexOf(type) < 0) {
                        return;
                    }
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670084 /* Xiuxian */)) {
                        return;
                    }
                    var taskHint = mod.TaskUtil.getTaskHint(type);
                    mod.HintMgr.setHint(taskHint, ["41" /* Xianlu */, "01" /* XianluMain */ + "01" /* Xiuxian */, "01" /* XiuxianTask */]); //任务红点
                };
                XianluProxy.prototype.onTaskUpdate = function (n) {
                    var types = n.body;
                    var type = 3 /* Xiuxian */;
                    if (types.indexOf(type) < 0) {
                        return;
                    }
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670084 /* Xiuxian */)) {
                        return;
                    }
                    var breakHint = this.canBreak();
                    mod.HintMgr.setHint(breakHint, ["41" /* Xianlu */, "01" /* XianluMain */ + "01" /* Xiuxian */, "02" /* XiuxianBreak */]); //飞升红点
                };
                XianluProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("diamond" /* diamond */) >= 0 || keys.indexOf("wood" /* wood */) >= 0) {
                        this.updatePoolUpHint();
                    }
                    if (keys.indexOf("maiqi" /* maiqi */) >= 0) {
                        this.updateLingmaiHint();
                    }
                };
                Object.defineProperty(XianluProxy.prototype, "xianpolevel", {
                    get: function () {
                        return this._model.xianpolevel;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianluProxy.prototype, "xianpoattr", {
                    get: function () {
                        return this._model.xianpo_attr;
                    },
                    enumerable: true,
                    configurable: true
                });
                return XianluProxy;
            }(game.ProxyBase));
            xianlu.XianluProxy = XianluProxy;
            __reflect(XianluProxy.prototype, "game.mod.xianlu.XianluProxy", ["game.mod.IXianluProxy", "base.IProxy"]);
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var LingchiBattleView = /** @class */ (function (_super) {
                __extends(LingchiBattleView, _super);
                function LingchiBattleView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianlu.LingchiBattleSkin";
                    return _this;
                }
                return LingchiBattleView;
            }(eui.Component));
            xianlu.LingchiBattleView = LingchiBattleView;
            __reflect(LingchiBattleView.prototype, "game.mod.xianlu.LingchiBattleView");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var LingchiDetailView = /** @class */ (function (_super) {
                __extends(LingchiDetailView, _super);
                function LingchiDetailView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianlu.LingchiDetailSkin";
                    return _this;
                }
                return LingchiDetailView;
            }(eui.Component));
            xianlu.LingchiDetailView = LingchiDetailView;
            __reflect(LingchiDetailView.prototype, "game.mod.xianlu.LingchiDetailView");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var facade = base.facade;
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var Tween = base.Tween;
            var Handler = base.Handler;
            var LingchiItemRender = /** @class */ (function (_super) {
                __extends(LingchiItemRender, _super);
                function LingchiItemRender() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._posY = -13;
                    _this._iconY1 = 47;
                    _this._iconY2 = 190;
                    return _this;
                }
                LingchiItemRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("41" /* Xianlu */).retProxy(186 /* Xianlu */);
                    this._itemList = new ArrayCollection();
                    this.list_item.itemRenderer = xianlu.LingchiShenlingHeadRender;
                    this.list_item.dataProvider = this._itemList;
                    this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                LingchiItemRender.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                    _super.prototype.onRemoveFromStage.call(this);
                };
                LingchiItemRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var type = cfg.index;
                    this.currentState = type == 1 ? "big" : "default";
                    this.img_type.source = "lingchi_type" + type;
                    this._isOpen = this._proxy.isPoolOpen(cfg);
                    this.img_bg.source = this._isOpen ? "lingchi_icon" : "lingchi_icon_hui";
                    var desc = "";
                    var lv = 0;
                    if (this._isOpen) {
                        this.grp_item.visible = true;
                        this._info = this._proxy.getPoolInfo(type);
                        lv = this._info.level;
                        var infos = this._proxy.getPoolGridInfos(type);
                        this._itemList.source = infos;
                        var poolCfg = this._proxy.getPoolCfg(type, 1);
                        var propId = poolCfg && poolCfg.output ? poolCfg.output[0][0] : 1450000005 /* Shenlingjinghua */;
                        var propCfg = game.GameConfig.getPropConfigById(propId);
                        this.img_icon.source = this.img_icon2.source = propCfg.icon;
                        var allGain = this._proxy.calcPoolAllGain(this._info);
                        this.lab_cnt.text = allGain + "";
                        this.grp_icon.visible = allGain > 0;
                        if (this.grp_icon.visible) {
                            this.playTween();
                        }
                        var addNum = this._proxy.calcPoolAdd(this._info) / 100;
                        desc = game.TextUtil.addColor(game.getLanById("shouyi_tips" /* shouyi_tips */) + "+" + addNum + "%", 2330156 /* GREEN */);
                        this.redPoint.visible = this._proxy.getPoolHint(this._info);
                    }
                    else {
                        //未开启
                        this.grp_icon.visible = this.timeItem.visible = this.grp_item.visible = false;
                        var limitIndex = cfg.pool_condition;
                        var limitCfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, limitIndex);
                        var limitLv = limitCfg.relv;
                        var curCfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, this._proxy.model.index);
                        var curLv = curCfg.relv;
                        var openStr = game.getLanById("xiuxian_tips" /* xiuxian_tips */) + limitLv + game.getLanById("tishi_43" /* tishi_43 */);
                        desc = game.TextUtil.addColor(openStr + "(" + curLv + "/" + limitLv + ")", 16711680 /* RED */);
                        this._openStr = openStr + game.getLanById("boss_cue5" /* boss_cue5 */);
                        this.redPoint.visible = false;
                    }
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(desc);
                    this.lab_lv.text = lv + "";
                };
                LingchiItemRender.prototype.updateTime = function () {
                    if (!this.data) {
                        return;
                    }
                    if (!this._isOpen) {
                        return;
                    }
                    var nextTime = this.getPoolNextTime();
                    if (!nextTime) {
                        this.timeItem.visible = false;
                    }
                    else {
                        this.timeItem.visible = true;
                        this.timeItem.updateLeftTime(nextTime);
                    }
                };
                LingchiItemRender.prototype.getPoolNextTime = function () {
                    var startTime = this._info.opentime;
                    var pCfg1 = game.GameConfig.getParamConfigById("lingchi_limit");
                    var maxTime = pCfg1.value;
                    var leftTime = startTime + maxTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        return 0;
                    }
                    var pCfg2 = game.GameConfig.getParamConfigById("lingchi_once");
                    var perTime = pCfg2.value;
                    var nextTime = leftTime % perTime;
                    if (nextTime == 0) {
                        facade.sendNt("lingchi_time_update" /* LINGCHI_TIME_UPDATE */);
                    }
                    return nextTime;
                };
                LingchiItemRender.prototype.onClick = function () {
                    if (!this._isOpen) {
                        game.PromptBox.getIns().show(this._openStr);
                        return;
                    }
                    var type = this.data.index;
                    mod.ViewMgr.getIns().showSecondPop("41" /* Xianlu */, "05" /* LingchiDetail */, type);
                };
                LingchiItemRender.prototype.playTween = function () {
                    var _this = this;
                    this.removeTween();
                    this.grp_icon.y = this._posY;
                    Tween.get(this.grp_icon, { loop: true })
                        .to({ y: this._posY - 15 }, 1000)
                        .to({ y: this._posY }, 1000);
                    this.img_icon2.y = this._iconY2;
                    Tween.get(this.img_icon2, { loop: true })
                        .to({ y: this._iconY1 }, 1700)
                        .to({ alpha: 0 }, 300)
                        .exec(Handler.alloc(this, function () {
                        _this.img_icon2.y = _this._iconY2;
                        _this.img_icon2.alpha = 1;
                    }));
                };
                LingchiItemRender.prototype.removeTween = function () {
                    Tween.remove(this.grp_icon);
                    Tween.remove(this.img_icon2);
                };
                return LingchiItemRender;
            }(mod.BaseListenerRenderer));
            xianlu.LingchiItemRender = LingchiItemRender;
            __reflect(LingchiItemRender.prototype, "game.mod.xianlu.LingchiItemRender");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var LingchiShenlingHeadRender = /** @class */ (function (_super) {
                __extends(LingchiShenlingHeadRender, _super);
                function LingchiShenlingHeadRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LingchiShenlingHeadRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var index = this.data.unitid;
                    this.icon.setData(index);
                };
                return LingchiShenlingHeadRender;
            }(eui.ItemRenderer));
            xianlu.LingchiShenlingHeadRender = LingchiShenlingHeadRender;
            __reflect(LingchiShenlingHeadRender.prototype, "game.mod.xianlu.LingchiShenlingHeadRender");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var facade = base.facade;
            var LingchiShenlingItemRender = /** @class */ (function (_super) {
                __extends(LingchiShenlingItemRender, _super);
                function LingchiShenlingItemRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LingchiShenlingItemRender.prototype.dataChanged = function () {
                    if (this.data == null) {
                        return;
                    }
                    var index = this.data;
                    var _proxy = facade.retMod("41" /* Xianlu */).retProxy(186 /* Xianlu */);
                    var isOpen = _proxy.isPoolGridOpen(index);
                    if (isOpen) {
                        this.currentState = "unlock";
                        var pos = this.itemIndex + 1;
                        var gridIndex = _proxy.getPoolGridIndex(_proxy.poolType, pos);
                        if (gridIndex) {
                            //已派遣
                            this.grp_item2.visible = true;
                            this.img_add.visible = false;
                            var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, gridIndex);
                            this.item.setData(cfg);
                            var addNum = _proxy.getShenlingAdd(gridIndex) / 100;
                            this.lab_add.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor("+" + addNum + "%", 65280 /* GREEN */));
                        }
                        else {
                            //未派遣
                            this.grp_item2.visible = false;
                            this.img_add.visible = true;
                        }
                        //红点
                        this.redPoint.visible = !_proxy.battleView && _proxy.canPoolGridBattle(_proxy.poolType, pos);
                    }
                    else {
                        this.currentState = "lock";
                        var lockStr = game.TextUtil.addColor(mod.RoleUtil.getRebirthLvStr(index), 16776960 /* YELLOW */);
                        this.lab_lock.textFlow = game.TextUtil.parseHtml(lockStr);
                        this.redPoint.visible = false;
                    }
                };
                return LingchiShenlingItemRender;
            }(eui.ItemRenderer));
            xianlu.LingchiShenlingItemRender = LingchiShenlingItemRender;
            __reflect(LingchiShenlingItemRender.prototype, "game.mod.xianlu.LingchiShenlingItemRender");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var facade = base.facade;
            var LingchiShenlingSelItemRender = /** @class */ (function (_super) {
                __extends(LingchiShenlingSelItemRender, _super);
                function LingchiShenlingSelItemRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LingchiShenlingSelItemRender.prototype.dataChanged = function () {
                    if (this.data == null) {
                        return;
                    }
                    var gridIndex = this.data;
                    var _proxy = facade.retMod("41" /* Xianlu */).retProxy(186 /* Xianlu */);
                    var isBattle = _proxy.isBattle(_proxy.poolType, gridIndex);
                    this.currentState = isBattle ? "upAndSelected" : "unlock";
                    //已派遣
                    this.grp_item2.visible = true;
                    this.img_add.visible = false;
                    var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, gridIndex);
                    this.item.setData(cfg);
                    var addNum = _proxy.getShenlingAdd(gridIndex) / 100;
                    this.lab_add.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor("+" + addNum + "%", 65280 /* GREEN */));
                    //红点
                    this.redPoint.visible = !isBattle && _proxy.checkBestShenlingByIndex(_proxy.poolType, gridIndex);
                };
                return LingchiShenlingSelItemRender;
            }(eui.ItemRenderer));
            xianlu.LingchiShenlingSelItemRender = LingchiShenlingSelItemRender;
            __reflect(LingchiShenlingSelItemRender.prototype, "game.mod.xianlu.LingchiShenlingSelItemRender");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var LingchiView = /** @class */ (function (_super) {
                __extends(LingchiView, _super);
                function LingchiView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianlu.LingchiSkin";
                    return _this;
                }
                return LingchiView;
            }(eui.Component));
            xianlu.LingchiView = LingchiView;
            __reflect(LingchiView.prototype, "game.mod.xianlu.LingchiView");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var facade = base.facade;
            var LinggenItemRender = /** @class */ (function (_super) {
                __extends(LinggenItemRender, _super);
                function LinggenItemRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LinggenItemRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var _proxy = facade.retMod("41" /* Xianlu */).retProxy(186 /* Xianlu */);
                    var isOpen = _proxy.isLinggenOpen(cfg);
                    this.img_lock.visible = !isOpen;
                    var maxLv = cfg.upgrade_item.length;
                    var info = _proxy.getLinggenInfo(cfg.index);
                    var curLv = info ? info.lv : 0;
                    var lvStr = curLv + "/" + maxLv;
                    if (curLv >= maxLv) {
                        lvStr = game.TextUtil.addColor(game.getLanById("maxlv" /* maxlv */), 16719376 /* RED */);
                    }
                    this.lab_lv.textFlow = game.TextUtil.parseHtml(lvStr);
                    this.redPoint.visible = _proxy.getLinggenHint(cfg);
                    //todo
                    var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, cfg.buff_index[0]);
                    this.img_icon.source = buffCfg && buffCfg.icon || '';
                };
                return LinggenItemRender;
            }(eui.ItemRenderer));
            xianlu.LinggenItemRender = LinggenItemRender;
            __reflect(LinggenItemRender.prototype, "game.mod.xianlu.LinggenItemRender");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var facade = base.facade;
            var LinggenTabItem = /** @class */ (function (_super) {
                __extends(LinggenTabItem, _super);
                function LinggenTabItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LinggenTabItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var _proxy = facade.retMod("41" /* Xianlu */).retProxy(186 /* Xianlu */);
                    var isOpen = _proxy.isLinggenTypeOpen(cfg);
                    var iconStr = isOpen ? "linggen_icon" : "linggen_icon_hui";
                    this.img_icon.source = iconStr + cfg.type;
                    this.redPoint.visible = _proxy.getLinggenTypeHint(cfg);
                };
                return LinggenTabItem;
            }(eui.ItemRenderer));
            xianlu.LinggenTabItem = LinggenTabItem;
            __reflect(LinggenTabItem.prototype, "game.mod.xianlu.LinggenTabItem");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var LinggenView = /** @class */ (function (_super) {
                __extends(LinggenView, _super);
                function LinggenView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianlu.LinggenSkin";
                    return _this;
                }
                return LinggenView;
            }(eui.Component));
            xianlu.LinggenView = LinggenView;
            __reflect(LinggenView.prototype, "game.mod.xianlu.LinggenView");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var LingmaiBreakItemRender = /** @class */ (function (_super) {
                __extends(LingmaiBreakItemRender, _super);
                function LingmaiBreakItemRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LingmaiBreakItemRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var isAct = this.data.isAct;
                    this.img_tag.source = isAct ? "xiaotubiaolvse" : "xiaotubiaohuise";
                    this.lab_desc.textColor = isAct ? 3496307 /* DEFAULT */ : 8618626 /* GRAY */;
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(this.data.desc);
                };
                return LingmaiBreakItemRender;
            }(eui.ItemRenderer));
            xianlu.LingmaiBreakItemRender = LingmaiBreakItemRender;
            __reflect(LingmaiBreakItemRender.prototype, "game.mod.xianlu.LingmaiBreakItemRender");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var LingmaiDetailView = /** @class */ (function (_super) {
                __extends(LingmaiDetailView, _super);
                function LingmaiDetailView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianlu.LingmaiDetailSkin";
                    return _this;
                }
                return LingmaiDetailView;
            }(eui.Component));
            xianlu.LingmaiDetailView = LingmaiDetailView;
            __reflect(LingmaiDetailView.prototype, "game.mod.xianlu.LingmaiDetailView");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var LingmaiItemRender = /** @class */ (function (_super) {
                __extends(LingmaiItemRender, _super);
                function LingmaiItemRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LingmaiItemRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var lv = this.data.lv;
                    var isAct = this.data.isAct;
                    this.img_icon.source = "lingmai_lv" + lv;
                    if (lv == game.LingmaiMaxLv) {
                        this.img_lock.visible = false;
                        if (!isAct) {
                            this.img_icon.source = "lingmai_lingqiuhui";
                        }
                    }
                    else {
                        this.img_lock.visible = !isAct;
                    }
                };
                return LingmaiItemRender;
            }(eui.ItemRenderer));
            xianlu.LingmaiItemRender = LingmaiItemRender;
            __reflect(LingmaiItemRender.prototype, "game.mod.xianlu.LingmaiItemRender");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var LingmaiUpView = /** @class */ (function (_super) {
                __extends(LingmaiUpView, _super);
                function LingmaiUpView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianlu.LingmaiUpSkin";
                    return _this;
                }
                return LingmaiUpView;
            }(eui.Component));
            xianlu.LingmaiUpView = LingmaiUpView;
            __reflect(LingmaiUpView.prototype, "game.mod.xianlu.LingmaiUpView");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var LingmaiView = /** @class */ (function (_super) {
                __extends(LingmaiView, _super);
                function LingmaiView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianlu.LingmaiSkin";
                    return _this;
                }
                return LingmaiView;
            }(eui.Component));
            xianlu.LingmaiView = LingmaiView;
            __reflect(LingmaiView.prototype, "game.mod.xianlu.LingmaiView");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var facade = base.facade;
            var XiandanPillRender = /** @class */ (function (_super) {
                __extends(XiandanPillRender, _super);
                function XiandanPillRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XiandanPillRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var propIndex = cfg.itemid;
                    this.icon.setData([propIndex, mod.BagUtil.getPropCntByIdx(propIndex)], 3 /* NotTips */);
                    var _proxy = facade.retMod("41" /* Xianlu */).retProxy(186 /* Xianlu */);
                    this.redPoint.visible = _proxy.canPillUse(cfg);
                };
                return XiandanPillRender;
            }(mod.IconSel));
            xianlu.XiandanPillRender = XiandanPillRender;
            __reflect(XiandanPillRender.prototype, "game.mod.xianlu.XiandanPillRender");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XiandanRender = /** @class */ (function (_super) {
                __extends(XiandanRender, _super);
                function XiandanRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XiandanRender.prototype.dataChanged = function () {
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(this.data);
                };
                Object.defineProperty(XiandanRender.prototype, "isUp", {
                    get: function () {
                        return this._isUp;
                    },
                    set: function (isUp) {
                        this._isUp = isUp;
                        this.img_bg1.visible = isUp;
                        this.img_bg2.visible = !isUp;
                    },
                    enumerable: true,
                    configurable: true
                });
                return XiandanRender;
            }(eui.ItemRenderer));
            xianlu.XiandanRender = XiandanRender;
            __reflect(XiandanRender.prototype, "game.mod.xianlu.XiandanRender");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XiandanTipsView = /** @class */ (function (_super) {
                __extends(XiandanTipsView, _super);
                function XiandanTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianlu.XiandanTipsSkin";
                    return _this;
                }
                return XiandanTipsView;
            }(eui.Component));
            xianlu.XiandanTipsView = XiandanTipsView;
            __reflect(XiandanTipsView.prototype, "game.mod.xianlu.XiandanTipsView");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XiandanView = /** @class */ (function (_super) {
                __extends(XiandanView, _super);
                function XiandanView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianlu.XiandanSkin";
                    return _this;
                }
                return XiandanView;
            }(eui.Component));
            xianlu.XiandanView = XiandanView;
            __reflect(XiandanView.prototype, "game.mod.xianlu.XiandanView");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XianluModel = /** @class */ (function () {
                function XianluModel() {
                    this.xianpolevel = 0; //当前仙魄等级
                    this.rewardindex = 143001001; //当前领取的仙魄奖励索引
                    this.rewardstatus = 0 /* NotFinish */; //当前领取的仙魄奖励状态 0不可领取  1可以领取   2已领取
                    this.rewardHint = ["41" /* Xianlu */, "01" /* XianluMain */ + "01" /* Xiuxian */, "00" /* XiuxianReward */]; //奖励红点
                    this.pillCfgList = {}; /**客户端分类好的仙丹index*/
                    this.pillHints = [
                        ["41" /* Xianlu */, "01" /* XianluMain */ + "02" /* Xiandan */, "03" /* XiandanType1 */],
                        ["41" /* Xianlu */, "01" /* XianluMain */ + "02" /* Xiandan */, "04" /* XiandanType2 */],
                        ["41" /* Xianlu */, "01" /* XianluMain */ + "02" /* Xiandan */, "05" /* XiandanType3 */],
                    ]; //仙丹红点
                    this.poolRewardHint = ["41" /* Xianlu */, "01" /* XianluMain */ + "03" /* Lingchi */, "06" /* LingchiReward */]; //奖励红点
                    this.poolUpHint = ["41" /* Xianlu */, "01" /* XianluMain */ + "03" /* Lingchi */, "07" /* LingchiUp */]; //升级红点
                    this.poolBattleHint = ["41" /* Xianlu */, "01" /* XianluMain */ + "03" /* Lingchi */, "08" /* LingchiBattle */]; //派遣红点
                    this.lingmaiUpHint = ["41" /* Xianlu */, "01" /* XianluMain */ + "04" /* Lingmai */, "09" /* LingmaiUp */]; //升级红点
                    this.linggenCfgList = {}; /**客户端分类好的灵根index*/
                    this.linggenUpHint = ["41" /* Xianlu */, "01" /* XianluMain */ + "05" /* Linggen */, "10" /* LinggenUp */]; //升级红点
                }
                return XianluModel;
            }());
            xianlu.XianluModel = XianluModel;
            __reflect(XianluModel.prototype, "game.mod.xianlu.XianluModel");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XiuxianBreakTipsView = /** @class */ (function (_super) {
                __extends(XiuxianBreakTipsView, _super);
                function XiuxianBreakTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianlu.XiuxianBreakTipsSkin";
                    return _this;
                }
                return XiuxianBreakTipsView;
            }(eui.Component));
            xianlu.XiuxianBreakTipsView = XiuxianBreakTipsView;
            __reflect(XiuxianBreakTipsView.prototype, "game.mod.xianlu.XiuxianBreakTipsView");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XiuxianFireRender = /** @class */ (function (_super) {
                __extends(XiuxianFireRender, _super);
                function XiuxianFireRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XiuxianFireRender.prototype.dataChanged = function () {
                    var isAct = this.data && this.data > this.itemIndex;
                    var eftSrc = isAct ? "xianlu_3" /* Xianlu_3 */ : "xianlu_4" /* Xianlu_4 */;
                    this.removeEft();
                    this.addEftByParent(eftSrc, this.group_eft);
                };
                return XiuxianFireRender;
            }(mod.BaseRenderer));
            xianlu.XiuxianFireRender = XiuxianFireRender;
            __reflect(XiuxianFireRender.prototype, "game.mod.xianlu.XiuxianFireRender");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XiuxianItemRender = /** @class */ (function (_super) {
                __extends(XiuxianItemRender, _super);
                function XiuxianItemRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XiuxianItemRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.lab_desc.text = this.data;
                };
                return XiuxianItemRender;
            }(eui.ItemRenderer));
            xianlu.XiuxianItemRender = XiuxianItemRender;
            __reflect(XiuxianItemRender.prototype, "game.mod.xianlu.XiuxianItemRender");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XiuxianPreviewView = /** @class */ (function (_super) {
                __extends(XiuxianPreviewView, _super);
                function XiuxianPreviewView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianlu.XiuxianPreviewSkin";
                    return _this;
                }
                return XiuxianPreviewView;
            }(eui.Component));
            xianlu.XiuxianPreviewView = XiuxianPreviewView;
            __reflect(XiuxianPreviewView.prototype, "game.mod.xianlu.XiuxianPreviewView");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XiuxianTipsView = /** @class */ (function (_super) {
                __extends(XiuxianTipsView, _super);
                function XiuxianTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianlu.XiuxianTipsSkin";
                    return _this;
                }
                return XiuxianTipsView;
            }(eui.Component));
            xianlu.XiuxianTipsView = XiuxianTipsView;
            __reflect(XiuxianTipsView.prototype, "game.mod.xianlu.XiuxianTipsView");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XiuxianView = /** @class */ (function (_super) {
                __extends(XiuxianView, _super);
                function XiuxianView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianlu.XiuxianSkin";
                    return _this;
                }
                return XiuxianView;
            }(eui.Component));
            xianlu.XiuxianView = XiuxianView;
            __reflect(XiuxianView.prototype, "game.mod.xianlu.XiuxianView");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var XiuxianXianpoRender = /** @class */ (function (_super) {
                __extends(XiuxianXianpoRender, _super);
                function XiuxianXianpoRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XiuxianXianpoRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_xianpo, this.onClick, this);
                };
                XiuxianXianpoRender.prototype.dataChanged = function () {
                    if (this.data == null) {
                        return;
                    }
                    var lv = this.data;
                    this.lab_lv.text = lv + game.getLanById("tishi_43" /* tishi_43 */);
                };
                XiuxianXianpoRender.prototype.onClick = function () {
                    var lv = this.data;
                    facade.showView("41" /* Xianlu */, "03" /* XiuxianTips */, lv);
                };
                XiuxianXianpoRender.prototype.setData = function (lv) {
                    this.data = lv;
                };
                return XiuxianXianpoRender;
            }(mod.BaseListenerRenderer));
            xianlu.XiuxianXianpoRender = XiuxianXianpoRender;
            __reflect(XiuxianXianpoRender.prototype, "game.mod.xianlu.XiuxianXianpoRender");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XianluMainMdr = /** @class */ (function (_super) {
                __extends(XianluMainMdr, _super);
                function XianluMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Xiuxian */,
                            icon: "xiuxian_tab",
                            mdr: xianlu.XiuxianMdr,
                            title: "xiuxian_tips" /* xiuxian_tips */,
                            bg: "p1_xiuxian_bg",
                            openIdx: 1041670084 /* Xiuxian */,
                            hintTypes: ["41" /* Xianlu */, "01" /* XianluMain */ + "01" /* Xiuxian */],
                        },
                        {
                            btnType: "02" /* Xiandan */,
                            icon: "xiandan_tab",
                            mdr: xianlu.XiandanMdr,
                            title: "xiandan_tips" /* xiandan_tips */,
                            bg: "p1_xiandan_bg",
                            openIdx: 1041670085 /* Xiandan */,
                            hintTypes: ["41" /* Xianlu */, "01" /* XianluMain */ + "02" /* Xiandan */],
                        },
                        {
                            btnType: "03" /* Lingchi */,
                            icon: "lingchi_tab",
                            mdr: xianlu.LingchiMdr,
                            title: "lingchi_tips" /* lingchi_tips */,
                            bg: "p1_lingchi_bg",
                            openIdx: 1041670086 /* Lingchi */,
                            hintTypes: ["41" /* Xianlu */, "01" /* XianluMain */ + "03" /* Lingchi */],
                        },
                        {
                            btnType: "04" /* Lingmai */,
                            icon: "lingmai_tab",
                            mdr: xianlu.LingmaiMdr,
                            title: "lingmai_tips" /* lingmai_tips */,
                            bg: "p1_lingmai_bg",
                            openIdx: 1041670088 /* Lingmai */,
                            hintTypes: ["41" /* Xianlu */, "01" /* XianluMain */ + "04" /* Lingmai */],
                        },
                        {
                            btnType: "05" /* Linggen */,
                            icon: "linggen_tab",
                            mdr: xianlu.LinggenMdr,
                            title: "linggen_tips" /* linggen_tips */,
                            bg: "p1_linggen_bg",
                            openIdx: 1041670092 /* Linggen */,
                            hintTypes: ["41" /* Xianlu */, "01" /* XianluMain */ + "05" /* Linggen */],
                        }
                    ];
                    return _this;
                }
                return XianluMainMdr;
            }(mod.WndBaseMdr));
            xianlu.XianluMainMdr = XianluMainMdr;
            __reflect(XianluMainMdr.prototype, "game.mod.xianlu.XianluMainMdr");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var LingchiBattleMdr = /** @class */ (function (_super) {
                __extends(LingchiBattleMdr, _super);
                function LingchiBattleMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianlu.LingchiBattleView);
                    _this.isEasyHide = true;
                    return _this;
                }
                LingchiBattleMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList1 = new ArrayCollection();
                    this._view.list_item1.itemRenderer = xianlu.LingchiShenlingItemRender;
                    this._view.list_item1.dataProvider = this._itemList1;
                    this._itemList2 = new ArrayCollection();
                    this._view.list_item2.itemRenderer = xianlu.LingchiShenlingSelItemRender;
                    this._view.list_item2.dataProvider = this._itemList2;
                    this._proxy = this.retProxy(186 /* Xianlu */);
                };
                LingchiBattleMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_battle, TouchEvent.TOUCH_TAP, this.onClickBattle);
                    addEventListener(this._view.list_item2, ItemTapEvent.ITEM_TAP, this.onClickItem);
                    this.onNt("lingchi_info_update" /* LINGCHI_INFO_UPDATE */, this.onInfoUpdate, this);
                };
                LingchiBattleMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.poolType = this._showArgs;
                    this._proxy.battleView = true;
                    this.onInfoUpdate();
                };
                LingchiBattleMdr.prototype.onHide = function () {
                    this._proxy.battleView = false;
                    _super.prototype.onHide.call(this);
                };
                LingchiBattleMdr.prototype.onClickBattle = function () {
                    //一键派遣
                    if (!this._itemList2.source || !this._itemList2.source.length) {
                        game.PromptBox.getIns().show(game.getLanById("shenling_tips4" /* shenling_tips4 */));
                        return;
                    }
                    this._proxy.c2s_lingpool_onekey_unit(this._showArgs);
                };
                LingchiBattleMdr.prototype.onInfoUpdate = function () {
                    this.updateView();
                    this.updateItemList1();
                    this.updateItemList2();
                };
                LingchiBattleMdr.prototype.updateView = function () {
                    var type = this._showArgs;
                    var _info = this._proxy.getPoolInfo(type);
                    var totalAdd = this._proxy.calcPoolAdd(_info) / 100;
                    var fontStr = "s" + totalAdd + "%";
                    this.addBmpFont(fontStr, game.BmpTextCfg[100 /* CommonPower */], this._view.grp_add);
                    this._view.btn_battle.redPoint.visible = this._proxy.canPoolBattle(_info);
                };
                LingchiBattleMdr.prototype.updateItemList1 = function () {
                    var cfg = game.getConfigByNameId("grid.json" /* Grid */, this._showArgs);
                    var datas = cfg.grid_condition;
                    if (this._itemList1.source.length > 0) {
                        this._itemList1.replaceAll(datas);
                    }
                    else {
                        this._itemList1.source = datas;
                    }
                };
                LingchiBattleMdr.prototype.updateItemList2 = function () {
                    var type = this._showArgs;
                    var datas = this._proxy.getShenlingList(type);
                    this._itemList2.source = datas;
                };
                LingchiBattleMdr.prototype.onClickItem = function (e) {
                    var index = e.item;
                    var type = this._showArgs;
                    this._proxy.c2s_lingpool_add_unit(type, index);
                };
                return LingchiBattleMdr;
            }(game.EffectMdrBase));
            xianlu.LingchiBattleMdr = LingchiBattleMdr;
            __reflect(LingchiBattleMdr.prototype, "game.mod.xianlu.LingchiBattleMdr");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var LingchiDetailMdr = /** @class */ (function (_super) {
                __extends(LingchiDetailMdr, _super);
                function LingchiDetailMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianlu.LingchiDetailView);
                    _this.isEasyHide = true;
                    return _this;
                }
                LingchiDetailMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = xianlu.LingchiShenlingItemRender;
                    this._view.list_item.dataProvider = this._itemList;
                    this._proxy = this.retProxy(186 /* Xianlu */);
                };
                LingchiDetailMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
                    addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
                    addEventListener(this._view.img_icon1, TouchEvent.TOUCH_TAP, this.onClickImg);
                    this.onNt("lingchi_info_update" /* LINGCHI_INFO_UPDATE */, this.onInfoUpdate, this);
                };
                LingchiDetailMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.poolType = this._showArgs;
                    this.onInfoUpdate();
                };
                LingchiDetailMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._imgIndex = null;
                };
                LingchiDetailMdr.prototype.onClickUp = function () {
                    //升级
                    if (!mod.BagUtil.checkPropCntUp(this._cost1[0], this._cost1[1])) {
                        return;
                    }
                    if (!mod.BagUtil.checkPropCntUp(this._cost2[0], this._cost2[1])) {
                        return;
                    }
                    this._proxy.c2s_lingpool_levelup(this._showArgs);
                };
                LingchiDetailMdr.prototype.onClickItem = function (e) {
                    var index = e.item;
                    var isOpen = this._proxy.isPoolGridOpen(index);
                    if (isOpen) {
                        var type = this._showArgs;
                        mod.ViewMgr.getIns().showSecondPop("41" /* Xianlu */, "06" /* LingchiBattle */, type);
                    }
                };
                LingchiDetailMdr.prototype.onClickImg = function () {
                    if (this._imgIndex) {
                        mod.ViewMgr.getIns().showPropTips(this._imgIndex);
                    }
                };
                LingchiDetailMdr.prototype.onInfoUpdate = function () {
                    this.updateView();
                    this.updateItemList();
                };
                LingchiDetailMdr.prototype.updateView = function () {
                    var type = this._showArgs;
                    this._view.img_type.source = "lingchi_type" + type;
                    this._info = this._proxy.getPoolInfo(type);
                    var lv = this._info.level;
                    this._view.lab_lv.text = lv + "";
                    var descStr1 = game.getLanById("chanchu_tips" /* chanchu_tips */) + "：";
                    this._view.lab_desc1.text = descStr1;
                    var cfg = this._proxy.getPoolCfg(type, lv);
                    var cost1 = cfg.output[0];
                    this._imgIndex = cost1[0];
                    var propCfg = game.GameConfig.getPropConfigById(cost1[0]);
                    this._view.img_icon1.source = propCfg.icon;
                    var perGain = this._proxy.calcPoolPerGain(this._info);
                    var pCfg2 = game.GameConfig.getParamConfigById("lingchi_once");
                    var perTime = pCfg2.value;
                    var hourGain = 3600 / perTime * perGain; //每小时产出
                    var addNum = this._proxy.calcPoolAdd(this._info) / 100;
                    var addStr1 = hourGain + "/" + game.getLanById("zongmen_hour" /* zongmen_hour */) + "（+ " + addNum + "%）";
                    this._view.lab_add1.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(addStr1, 2330156 /* GREEN */));
                    // let cfg: PoolConfig = this._proxy.getPoolCfg(type, lv);
                    var propIndex = cfg.special_item[0][0];
                    propCfg = game.GameConfig.getPropConfigById(propIndex);
                    this._view.img_icon2.source = propCfg.icon;
                    var shenlingAdd = this._proxy.calcShenlingAdd(this._info); //万分比
                    var shenlingAddStr = shenlingAdd / 100; //比如32%
                    //实际获取特殊道具的概率 = 基础概率_special_probability * （1 + 对应品质灵将增幅系数之和_参数表lingchi_dispatch ）向下取整
                    var baseNum = Math.floor(cfg.special_probability * (1 + shenlingAdd / 10000) / 100);
                    var addStr2 = game.TextUtil.addColor(propCfg.name, game.ColorUtil.getColorByQuality1(propCfg.quality)) + game.getLanById("chanchu_tips" /* chanchu_tips */) +
                        game.getLanById("gailv_tips" /* gailv_tips */) + "：" + game.TextUtil.addColor(baseNum + "%（+" + shenlingAddStr + "%）", 2330156 /* GREEN */);
                    this._view.lab_add2.textFlow = game.TextUtil.parseHtml(addStr2);
                    var descStr2 = game.getLanById("shenling_tips" /* shenling_tips */);
                    this._view.lab_desc2.text = descStr2;
                    var cost = cfg.upgrade;
                    var isMax = !cost || !cost.length;
                    if (!isMax) {
                        this._cost1 = cost[0];
                        this._cost2 = cost[1];
                        this._view.cost1.updateShow(this._cost1);
                        this._view.cost2.updateShow(this._cost2);
                    }
                    this._view.currentState = isMax ? "max" : "default";
                    this._view.btn_up.redPoint.visible = this._proxy.canPoolUp(this._info);
                };
                LingchiDetailMdr.prototype.updateItemList = function () {
                    var cfg = game.getConfigByNameId("grid.json" /* Grid */, this._showArgs);
                    var datas = cfg.grid_condition;
                    if (this._itemList.source.length > 0) {
                        this._itemList.replaceAll(datas);
                    }
                    else {
                        this._itemList.source = datas;
                    }
                };
                return LingchiDetailMdr;
            }(game.MdrBase));
            xianlu.LingchiDetailMdr = LingchiDetailMdr;
            __reflect(LingchiDetailMdr.prototype, "game.mod.xianlu.LingchiDetailMdr");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var Tween = base.Tween;
            var Pool = base.Pool;
            var Handler = base.Handler;
            var LingchiMdr = /** @class */ (function (_super) {
                __extends(LingchiMdr, _super);
                function LingchiMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianlu.LingchiView);
                    _this._posInfos = [670, 500, 240, 106]; //存的是y坐标
                    return _this;
                }
                LingchiMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(186 /* Xianlu */);
                };
                LingchiMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_draw, TouchEvent.TOUCH_TAP, this.onClickDraw);
                    this.onNt("lingchi_info_update" /* LINGCHI_INFO_UPDATE */, this.onInfoUpdate, this);
                    this.onNt("lingchi_time_update" /* LINGCHI_TIME_UPDATE */, this.onInfoUpdate, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                };
                LingchiMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._itemList = this._rewardList = [];
                    this.updatePoolList();
                    this.updateTime();
                    this.updateHint();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                LingchiMdr.prototype.onHide = function () {
                    this.removeTween();
                    this.clearIcon();
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                LingchiMdr.prototype.onClickDraw = function () {
                    //领取奖励
                    var allGain = 0;
                    if (this._proxy.model.pool_list) {
                        for (var i = 1; i <= this._proxy.model.pool_list.length; ++i) {
                            var info = this._proxy.model.pool_list[i - 1];
                            var perGain = this._proxy.calcPoolAllGain(info);
                            if (perGain <= 0) {
                                continue;
                            }
                            var item = this._view["item" + i];
                            this._rewardList.push(item);
                            allGain += perGain;
                        }
                        /**放到外层出来，因为需要计算播放特效的灵池*/
                        if (allGain > 0) {
                            this._proxy.c2s_lingpool_time_reward();
                            this.playRewardTween();
                        }
                    }
                    if (allGain == 0) {
                        game.PromptBox.getIns().show(game.getLanById("reward_tips" /* reward_tips */));
                    }
                };
                LingchiMdr.prototype.onInfoUpdate = function () {
                    this.updatePoolList();
                };
                /** 通用红点事件监听 */
                LingchiMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    if (data.node == mod.HintMgr.getType(this._proxy.model.poolRewardHint)) {
                        this.updateRewardHint(data.value);
                    }
                };
                LingchiMdr.prototype.updatePoolList = function () {
                    var cfgList = game.getConfigListByName("grid.json" /* Grid */);
                    var tmpList = [];
                    for (var i = 1; i <= cfgList.length; ++i) {
                        var cfg = cfgList[i - 1];
                        var item = this._view["item" + i];
                        item.data = cfg;
                        if (this._proxy.isPoolOpen(cfg)) {
                            tmpList.push(item);
                        }
                    }
                    if (tmpList.length != this._itemList.length) {
                        this._itemList = tmpList;
                        this.playTween();
                    }
                };
                LingchiMdr.prototype.update = function (time) {
                    this.updateTime();
                };
                LingchiMdr.prototype.updateTime = function () {
                    for (var i = 0; i < this._itemList.length; ++i) {
                        var item = this._itemList[i];
                        item.updateTime();
                    }
                };
                /** 更新红点 */
                LingchiMdr.prototype.updateHint = function () {
                    this.updateRewardHint(mod.HintMgr.getHint(this._proxy.model.poolRewardHint));
                };
                LingchiMdr.prototype.updateRewardHint = function (hint) {
                    this._view.btn_draw.redPoint.visible = hint;
                };
                LingchiMdr.prototype.playTween = function () {
                    this.removeTween();
                    for (var i = 0; i < this._itemList.length; ++i) {
                        var item = this._itemList[i];
                        var posY = this._posInfos[i];
                        item.y = posY;
                        Tween.get(item, { loop: true })
                            .to({ y: posY - 20 }, 1000)
                            .to({ y: posY }, 1000);
                    }
                };
                LingchiMdr.prototype.removeTween = function () {
                    for (var i = 0; i < this._itemList.length; ++i) {
                        var item = this._itemList[i];
                        item.removeTween();
                        Tween.remove(item);
                    }
                };
                LingchiMdr.prototype.playRewardTween = function () {
                    //奖励飘动
                    var num = 5;
                    var tarX = this._view.x + this._view.width - 170;
                    var tarY = this._view.y;
                    this._iconList = [];
                    for (var _i = 0, _a = this._rewardList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        var cfg = item.data;
                        var poolCfg = this._proxy.getPoolCfg(cfg.index, 1); //获取第一个
                        var propId = poolCfg && poolCfg.output ? poolCfg.output[0][0] : 1450000005 /* Shenlingjinghua */;
                        var propCfg = game.GameConfig.getPropConfigById(propId); //原本写死改成动态获取配置
                        for (var i = 0; i < num; i++) {
                            var icon = Pool.alloc(game.BitmapBase);
                            icon.source = propCfg.icon;
                            icon.width = icon.height = 36;
                            icon.x = item.x + item.grp_icon.x + item.img_icon.x;
                            icon.y = item.y + item.grp_icon.y + item.img_icon.y;
                            icon.alpha = 0;
                            this._view.addChild(icon);
                            this._iconList.push(icon);
                            var numX = Math.random() > 0.5 ? 1 : -1;
                            var numY = Math.random() > 0.5 ? 1 : -1;
                            var posX = Math.random() * 60 * numX + icon.x;
                            var posY = Math.random() * 60 * numY + icon.y;
                            Tween.get(icon)
                                .to({ alpha: 1, x: posX, y: posY }, 200)
                                .delay(800)
                                .to({ x: tarX, y: tarY }, 400)
                                .exec(Handler.alloc(this, this.clearPerIcon, [icon]));
                        }
                    }
                };
                LingchiMdr.prototype.clearPerIcon = function (icon) {
                    if (icon.parent) {
                        icon.parent.removeChild(icon);
                    }
                    this._rewardList = [];
                };
                LingchiMdr.prototype.clearIcon = function () {
                    if (!this._iconList || !this._iconList.length) {
                        return;
                    }
                    this._rewardList = [];
                    for (var _i = 0, _a = this._iconList; _i < _a.length; _i++) {
                        var icon = _a[_i];
                        Tween.remove(icon);
                        Pool.release(icon);
                        if (icon.parent) {
                            icon.parent.removeChild(icon);
                        }
                    }
                };
                return LingchiMdr;
            }(game.MdrBase));
            xianlu.LingchiMdr = LingchiMdr;
            __reflect(LingchiMdr.prototype, "game.mod.xianlu.LingchiMdr", ["base.UpdateItem"]);
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var Event = egret.Event;
            var LinggenMdr = /** @class */ (function (_super) {
                __extends(LinggenMdr, _super);
                function LinggenMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianlu.LinggenView);
                    _this._itemList = [];
                    return _this;
                }
                LinggenMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._btnList = new ArrayCollection();
                    this._view.list_type.itemRenderer = xianlu.LinggenTabItem;
                    this._view.list_type.dataProvider = this._btnList;
                    this._proxy = this.retProxy(186 /* Xianlu */);
                };
                LinggenMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
                    //this._itemList = [];
                    // for(let i = 1; i <= this._maxNum; ++i){
                    //     let btn = this._view["item" + i];
                    //     this._itemList.push(btn);
                    //     addEventListener(btn, TouchEvent.TOUCH_TAP, this.onClickIcon);
                    // }
                    addEventListener(this._view.list_type, Event.CHANGING, this.onClickType);
                    this.onNt("linggen_info_update" /* LINGGEN_INFO_UPDATE */, this.onInfoUpdate, this);
                };
                LinggenMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initTypeList();
                    this.typeUpdateInfo();
                };
                LinggenMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                LinggenMdr.prototype.onClickUp = function () {
                    if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                        return;
                    }
                    if (!this._selCfg) {
                        return;
                    }
                    this._proxy.c2s_linggen_levelup(this._selCfg.index);
                };
                LinggenMdr.prototype.onClickIcon = function (e) {
                    var imgBg = e.target;
                    for (var i = 0; i < this._itemList.length; ++i) {
                        var btn = this._itemList[i];
                        if (btn.img_bg == imgBg) {
                            if (this._selIndex == i) {
                                return;
                            }
                            this._selIndex = i;
                            this.indexUpdateInfo();
                            break;
                        }
                    }
                };
                LinggenMdr.prototype.onInfoUpdate = function () {
                    this.typeUpdateInfo();
                    this.updateTypeListHint();
                };
                LinggenMdr.prototype.onClickType = function (e) {
                    var cfg = this._view.list_type.selectedItem;
                    if (!this._proxy.isLinggenTypeOpen(cfg, true)) {
                        e.preventDefault();
                        return;
                    }
                    var type = cfg.type;
                    if (type == this._selType) {
                        return;
                    }
                    this._selType = type;
                    this._selIndex = 0;
                    this.typeUpdateInfo();
                };
                LinggenMdr.prototype.initTypeList = function () {
                    this._cfgList = game.getConfigListByName("linggen_leixing.json" /* LinggenLeixing */);
                    this._btnList.source = this._cfgList;
                    this._selType = 1;
                    this._view.list_type.selectedIndex = this._selType - 1;
                    this._selIndex = 0;
                };
                LinggenMdr.prototype.updateTypeListHint = function () {
                    this._btnList.replaceAll(this._btnList.source);
                };
                LinggenMdr.prototype.typeUpdateInfo = function () {
                    this.updateItemList();
                    this.indexUpdateInfo();
                };
                LinggenMdr.prototype.updateItemList = function () {
                    var items = this._proxy.getLinggenCfgList(this._selType);
                    // for(let i = 0; i < this._itemList.length && i < items.length; ++i) {
                    //     let btn = this._itemList[i];
                    //     let data = items[i];
                    //     btn.data = data;
                    // }
                    this._view.item1.data = items[0];
                    this._itemList.push(this._view.item1);
                    var addEventListener = this.onEgret.bind(this);
                    for (var i = 0; i < this._view.itemGroup.numChildren; i++) {
                        var item = this._view.itemGroup.getChildAt(i);
                        if (item == this._view.m_right || item == this._view.m_left) {
                            continue;
                        }
                        item.removeEventListener(TouchEvent.TOUCH_TAP, this.onClickIcon, item);
                    }
                    var leftCount = 0;
                    var rightCount = 0;
                    for (var i = 1; i < items.length; i++) {
                        var data = items[i];
                        var item = new xianlu.LinggenItemRender();
                        item.skinName = "skins.xianlu.LinggenItemSkin";
                        if (i % 2 != 0) {
                            //左
                            item.x = 131;
                            item.y = 26 + leftCount * 122;
                            leftCount++;
                        }
                        else {
                            //右
                            item.x = 479;
                            item.y = 26 + rightCount * 122;
                            rightCount++;
                        }
                        item.data = data;
                        this._view.itemGroup.addChild(item);
                        this._itemList.push(item);
                        addEventListener(item, TouchEvent.TOUCH_TAP, this.onClickIcon);
                    }
                    this._view.m_left.height = Math.max(leftCount * 100, 300);
                    this._view.m_right.height = Math.max(rightCount * 100, 300);
                    //todo
                    //this._selIndex = 0;
                };
                LinggenMdr.prototype.indexUpdateInfo = function () {
                    var items = this._proxy.getLinggenCfgList(this._selType);
                    this._selCfg = items[this._selIndex];
                    if (!this._selCfg) {
                        return;
                    }
                    this.updateItemSel();
                    this.updateDesc();
                };
                LinggenMdr.prototype.updateItemSel = function () {
                    for (var i = 0; i < this._itemList.length; ++i) {
                        var btn = this._itemList[i];
                        var sel = this._selIndex == i;
                        btn.img_sel.visible = sel;
                    }
                };
                LinggenMdr.prototype.updateDesc = function () {
                    var lv = 0;
                    var nextLv = 0;
                    var isOpen = this._proxy.isLinggenOpen(this._selCfg);
                    if (!isOpen) {
                        //未开启
                        this._view.currentState = "lock";
                        var infos = this._selCfg.premise;
                        var info = infos[0];
                        var limitIndex = info[0];
                        var limitLv = info[1];
                        var limitCfg = game.getConfigByNameId("linggen.json" /* Linggen */, limitIndex);
                        var limitStr = game.StringUtil.substitute(game.getLanById("linggen_tips2" /* linggen_tips2 */), [limitCfg.name, limitLv + ""]);
                        this._view.lab_limit.text = limitStr;
                        nextLv = lv + 1;
                    }
                    else {
                        var info = this._proxy.getLinggenInfo(this._selCfg.index);
                        lv = info ? info.lv : 0;
                        var maxLv = this._selCfg.upgrade_item.length;
                        var isMax = lv >= maxLv;
                        this._view.currentState = isMax ? "max" : "default";
                        if (!isMax) {
                            nextLv = lv + 1;
                            this._cost = this._selCfg.upgrade_item[lv];
                            this._view.cost.updateShow(this._cost);
                            this._view.btn_up.redPoint.visible = this._proxy.getLinggenHint(this._selCfg);
                        }
                    }
                    var lvStr = this._selCfg.name + "Lv." + lv;
                    this._view.lab_lv.text = lvStr;
                    var desc = "";
                    if (lv == 0) {
                        desc = game.getLanById("not_active" /* not_active */);
                    }
                    else {
                        var buffIndex = this._selCfg.buff_index[lv - 1];
                        var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, buffIndex);
                        desc = buffCfg.des;
                    }
                    this._view.lab_desc.textFlow = game.TextUtil.parseHtml(desc);
                    if (nextLv != 0) {
                        var nextLvStr = this._selCfg.name + "Lv." + nextLv;
                        this._view.lab_nextLv.text = nextLvStr;
                        var nextBuffIndex = this._selCfg.buff_index[nextLv - 1];
                        var nextBuffCfg = game.getConfigByNameId("buff.json" /* Buff */, nextBuffIndex);
                        var nextDesc = nextBuffCfg.des;
                        this._view.lab_nextDesc.textFlow = game.TextUtil.parseHtml(nextDesc);
                    }
                };
                return LinggenMdr;
            }(game.MdrBase));
            xianlu.LinggenMdr = LinggenMdr;
            __reflect(LinggenMdr.prototype, "game.mod.xianlu.LinggenMdr");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var LingmaiDetailMdr = /** @class */ (function (_super) {
                __extends(LingmaiDetailMdr, _super);
                function LingmaiDetailMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianlu.LingmaiDetailView);
                    _this.isEasyHide = true;
                    return _this;
                }
                LingmaiDetailMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = xianlu.LingmaiBreakItemRender;
                    this._view.list_item.dataProvider = this._itemList;
                    this._limitList = new ArrayCollection();
                    this._view.list_limit.itemRenderer = mod.CommonLimitItemRender;
                    this._view.list_limit.dataProvider = this._limitList;
                    this._proxy = this.retProxy(186 /* Xianlu */);
                };
                LingmaiDetailMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateItemList, this);
                    this.onNt("lingmai_info_update" /* LINGMAI_INFO_UPDATE */, this.onInfoUpdate, this);
                };
                LingmaiDetailMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                    this.updateInfo();
                };
                LingmaiDetailMdr.prototype.onHide = function () {
                    this._isAct = this._isActLast = false;
                    _super.prototype.onHide.call(this);
                };
                LingmaiDetailMdr.prototype.onClickUp = function () {
                    //激活
                    var cfg = this._showArgs;
                    if (this._isAct) {
                        mod.ViewMgr.getIns().showSecondPop("41" /* Xianlu */, "08" /* LingmaiUp */, cfg);
                        return;
                    }
                    var infos = cfg.activate_condition;
                    for (var _i = 0, infos_6 = infos; _i < infos_6.length; _i++) {
                        var info = infos_6[_i];
                        if (!mod.RoleUtil.isLimitOpen(info)) {
                            game.PromptBox.getIns().show(game.getLanById("lingmai_act_tips2" /* lingmai_act_tips2 */));
                            return;
                        }
                    }
                    if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                        return;
                    }
                    this._proxy.c2s_lingmai_levelup(cfg.index);
                };
                LingmaiDetailMdr.prototype.onInfoUpdate = function () {
                    if (!this._isActLast) {
                        var cfg = this._showArgs;
                        mod.ViewMgr.getIns().showSecondPop("41" /* Xianlu */, "08" /* LingmaiUp */, cfg);
                    }
                    this.updateInfo();
                    this._isActLast = this._isAct;
                };
                LingmaiDetailMdr.prototype.updateInfo = function () {
                    this._info = this._proxy.getLingmaiInfo(this._showArgs.index);
                    this.updatePower();
                    this.updateItemList();
                    this.updateLimitList();
                };
                LingmaiDetailMdr.prototype.updateView = function () {
                    var cfg = this._showArgs;
                    var type = cfg.index % 10;
                    this._view.img_name.source = "lingmai_name" + type;
                    this._view.lab_desc.text = game.getLanById("lingmai_tips" + type);
                };
                LingmaiDetailMdr.prototype.updatePower = function () {
                    var power = this._proxy.getLingmaiPerPower(this._info);
                    this._view.power.setPowerValue(power);
                };
                LingmaiDetailMdr.prototype.updateItemList = function () {
                    var cfg = this._showArgs;
                    var infos = cfg.break_property;
                    var indexList = [];
                    for (var _i = 0, infos_7 = infos; _i < infos_7.length; _i++) {
                        var i = infos_7[_i];
                        var attrIndex = i[1]; //重数_属性ID_BUFFID
                        if (attrIndex) {
                            indexList.push(attrIndex);
                        }
                    }
                    var attrList = mod.RoleUtil.getAttrList(indexList); //返回所有属性
                    var items = []; //属性或者buff描述，是否激活
                    for (var _a = 0, infos_8 = infos; _a < infos_8.length; _a++) {
                        var i = infos_8[_a];
                        var lv = i[0]; //重数_属性ID_BUFFID
                        var attrIndex = i[1];
                        var buffIndex = i[2];
                        var desc = "[" + game.StringUtil.ChineseNum[lv] + game.getLanById("lingmai_act_tips" /* lingmai_act_tips */) + "]";
                        var isAct = this._info && this._info.splv >= lv; //已激活的重数
                        if (attrIndex) {
                            var attrPos = indexList.indexOf(attrIndex);
                            var attr = attrList[attrPos];
                            var attrText = game.TextUtil.getAttrText(attr, 2330156 /* GREEN */, " ");
                            if (attrText == "") {
                                continue;
                            }
                            desc += attrText;
                        }
                        if (buffIndex) {
                            var cfg_3 = game.getConfigByNameId("buff.json" /* Buff */, buffIndex);
                            desc += cfg_3.des;
                        }
                        items.push({ desc: desc, isAct: isAct });
                    }
                    if (this._itemList.source.length > 0) {
                        this._itemList.replaceAll(items);
                    }
                    else {
                        this._itemList.source = items;
                    }
                };
                LingmaiDetailMdr.prototype.updateLimitList = function () {
                    var cfg = this._showArgs;
                    //this._isAct = this._info && this._info.splv > 0;//已激活
                    this._isAct = !!this._info; //取得到信息表示已激活
                    this._view.currentState = this._isAct ? "isAct" : "default";
                    if (this._isAct) {
                        //已激活
                        this._view.lab_lv.text = game.getLanById("tishi_38" /* tishi_38 */) + "：" + game.StringUtil.ChineseNum[this._info.splv] + game.getLanById("chong" /* chong */) +
                            this._info.lv + "/" + game.LingmaiMaxLv;
                        this._view.btn_up.labelDisplay.text = game.getLanById("xiulian_tips" /* xiulian_tips */);
                    }
                    else {
                        //未激活
                        var infos = this._showArgs.activate_condition;
                        if (this._limitList.source.length > 0) {
                            this._limitList.replaceAll(infos);
                        }
                        else {
                            this._limitList.source = infos;
                        }
                        this._cost = this._showArgs.break_item[0];
                        this._view.cost.updateShow(this._cost);
                        this._view.btn_up.labelDisplay.text = game.getLanById("active" /* active */);
                    }
                    this._view.btn_up.redPoint.visible = this._proxy.canLingmaiUp(cfg);
                };
                return LingmaiDetailMdr;
            }(game.MdrBase));
            xianlu.LingmaiDetailMdr = LingmaiDetailMdr;
            __reflect(LingmaiDetailMdr.prototype, "game.mod.xianlu.LingmaiDetailMdr");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var TouchEvent = egret.TouchEvent;
            var LingmaiMdr = /** @class */ (function (_super) {
                __extends(LingmaiMdr, _super);
                function LingmaiMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianlu.LingmaiView);
                    _this._btnList = [];
                    return _this;
                }
                LingmaiMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(186 /* Xianlu */);
                };
                LingmaiMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this._btnList = [];
                    for (var i = 1; i < game.LingmaiMaxLv; ++i) {
                        var btn = this._view["btn_icon" + i];
                        this._btnList.push(btn);
                        addEventListener(btn, TouchEvent.TOUCH_TAP, this.onClickIcon);
                    }
                    this.onNt("lingmai_info_update" /* LINGMAI_INFO_UPDATE */, this.onInfoUpdate, this);
                };
                LingmaiMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initCfgList();
                    this.onInfoUpdate();
                };
                LingmaiMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                LingmaiMdr.prototype.onClickIcon = function (e) {
                    var clickBtn = e.target;
                    for (var i = 1; i < game.LingmaiMaxLv; ++i) {
                        var btn = this._view["btn_icon" + i];
                        if (btn == clickBtn) {
                            var cfg = this._cfgList[i - 1];
                            mod.ViewMgr.getIns().showSecondPop("41" /* Xianlu */, "07" /* LingmaiDetail */, cfg);
                            break;
                        }
                    }
                };
                LingmaiMdr.prototype.onInfoUpdate = function () {
                    this.updateIconList();
                    this.updatePower();
                };
                LingmaiMdr.prototype.initCfgList = function () {
                    this._cfgList = game.getConfigListByName("lingmai.json" /* Lingmai */);
                };
                LingmaiMdr.prototype.updateIconList = function () {
                    for (var i = 1; i < game.LingmaiMaxLv && i <= this._cfgList.length; ++i) {
                        var btn = this._view["btn_icon" + i];
                        var cfg = this._cfgList[i - 1];
                        var info = this._proxy.getLingmaiInfo(cfg.index);
                        var isAct = !!info;
                        btn.group_eft.removeChildren();
                        if (isAct) {
                            btn.iconDisplay.source = "";
                            this.addEftByParent("xianlu_8" /* Xianlu_8 */, btn.group_eft);
                        }
                        else {
                            btn.iconDisplay.source = "lingmai_lingqiuhui";
                        }
                        btn.redPoint.visible = this._proxy.canLingmaiUp(cfg);
                    }
                };
                LingmaiMdr.prototype.updatePower = function () {
                    var power = this._proxy.getLingmaiPower();
                    this._view.power.setPowerValue(power);
                };
                return LingmaiMdr;
            }(game.EffectMdrBase));
            xianlu.LingmaiMdr = LingmaiMdr;
            __reflect(LingmaiMdr.prototype, "game.mod.xianlu.LingmaiMdr");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var TouchEvent = egret.TouchEvent;
            var LingmaiUpMdr = /** @class */ (function (_super) {
                __extends(LingmaiUpMdr, _super);
                function LingmaiUpMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianlu.LingmaiUpView);
                    _this.isEasyHide = true;
                    return _this;
                }
                LingmaiUpMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(186 /* Xianlu */);
                };
                LingmaiUpMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
                    this.onNt("lingmai_info_update" /* LINGMAI_INFO_UPDATE */, this.onInfoUpdate, this);
                };
                LingmaiUpMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                    this.onInfoUpdate();
                };
                LingmaiUpMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                LingmaiUpMdr.prototype.onClickUp = function () {
                    //升级
                    if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                        return;
                    }
                    var cfg = this._showArgs;
                    this._proxy.c2s_lingmai_levelup(cfg.index);
                };
                LingmaiUpMdr.prototype.onInfoUpdate = function () {
                    this._info = this._proxy.getLingmaiInfo(this._showArgs.index);
                    this.updatePower();
                    this.updateUp();
                    this.updateItemList();
                };
                LingmaiUpMdr.prototype.updateView = function () {
                    var type = this._showArgs.index % 10;
                    this._view.img_name.source = "lingmai_name" + type;
                    this._itemList = [];
                    for (var i = 1; i <= game.LingmaiMaxLv; ++i) {
                        var item = this._view["item" + i];
                        this._itemList.push(item);
                    }
                    this._lineList = [
                        [this._view.img_line1],
                        [this._view.img_line2],
                        [this._view.img_line3],
                        [this._view.img_line4],
                        [this._view.img_line5],
                        [this._view.img_line6],
                        [this._view.img_line71, this._view.img_line72],
                        [this._view.img_line8],
                        [this._view.img_line9],
                    ];
                };
                LingmaiUpMdr.prototype.updatePower = function () {
                    var power = this._proxy.getLingmaiPerPower(this._info);
                    this._view.power.setPowerValue(power);
                };
                LingmaiUpMdr.prototype.updateUp = function () {
                    var splv = this._info.splv; //重数
                    var lv = this._info.lv; //等级
                    var fontStr = "d" + (splv == game.LingmaiMaxLv ? 0 : splv) + "c";
                    this.addBmpFont(fontStr, game.BmpTextCfg[200 /* RebirthLv */], this._view.grp_lv);
                    var buffStr = "";
                    var cfg = this._showArgs;
                    var infos = cfg.break_property;
                    for (var _i = 0, infos_9 = infos; _i < infos_9.length; _i++) {
                        var i = infos_9[_i];
                        var limitLv = i[0]; //重数_属性ID_BUFFID
                        var attrIndex = i[1];
                        var buffIndex = i[2];
                        if (splv >= limitLv) {
                            continue;
                        }
                        buffStr = "[" + game.StringUtil.ChineseNum[limitLv] + game.getLanById("lingmai_act_tips" /* lingmai_act_tips */) + "]";
                        if (attrIndex) {
                            var attr = mod.RoleUtil.getAttr(attrIndex);
                            buffStr += game.TextUtil.getAttrText(attr);
                        }
                        if (buffIndex) {
                            var cfg_4 = game.getConfigByNameId("buff.json" /* Buff */, buffIndex);
                            buffStr += cfg_4.des;
                        }
                        break;
                    }
                    this._view.lab_buff.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(buffStr, 16719376 /* RED */));
                    this._view.list_attr.updateAttr(this._info.attr);
                    var isMax = this._proxy.isLingmaiMax(this._info);
                    if (!isMax) {
                        this._isBreak = this._info.lv >= game.LingmaiMaxLv;
                        this._view.btn_up.labelDisplay.text = this._isBreak ? game.getLanById("weapon_tips34" /* weapon_tips34 */) : game.getLanById("xiulian_tips" /* xiulian_tips */);
                        this._view.btn_up.redPoint.visible = this._proxy.canLingmaiUp(cfg);
                        if (this._isBreak) {
                            this._cost = this._showArgs.break_item[splv];
                        }
                        else {
                            var cfgList = game.getConfigByNameId("lingmai_level.json" /* LingmaiLevel */, this._info.type);
                            var lvCfg = cfgList[splv];
                            this._cost = lvCfg.grade_item[lv];
                        }
                        this._view.cost.updateShow(this._cost);
                    }
                    this._view.currentState = isMax ? "max" : "default";
                };
                LingmaiUpMdr.prototype.updateItemList = function () {
                    var lv = this._info.lv; //等级
                    for (var i = 0; i < this._itemList.length; ++i) {
                        var item = this._itemList[i];
                        var curLv = i + 1;
                        var isAct = lv >= curLv;
                        item.data = { lv: curLv, isAct: isAct };
                    }
                    for (var i = 0; i < this._lineList.length; ++i) {
                        var imgList = this._lineList[i];
                        var curLv = i + 2;
                        var isAct = lv >= curLv;
                        for (var _i = 0, imgList_1 = imgList; _i < imgList_1.length; _i++) {
                            var img = imgList_1[_i];
                            img.source = isAct ? "lanseliangxian" : "lanseliangxianhui";
                        }
                    }
                };
                return LingmaiUpMdr;
            }(game.EffectMdrBase));
            xianlu.LingmaiUpMdr = LingmaiUpMdr;
            __reflect(LingmaiUpMdr.prototype, "game.mod.xianlu.LingmaiUpMdr");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var facade = base.facade;
            var ItemTapEvent = eui.ItemTapEvent;
            var PropertyEvent = eui.PropertyEvent;
            var Tween = base.Tween;
            var Handler = base.Handler;
            var XiandanMdr = /** @class */ (function (_super) {
                __extends(XiandanMdr, _super);
                function XiandanMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianlu.XiandanView);
                    return _this;
                }
                XiandanMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = xianlu.XiandanPillRender;
                    this._view.list_item.dataProvider = this._itemList;
                    this._btnList = new ArrayCollection();
                    this._view.list_type.itemRenderer = mod.TabSecondItem;
                    this._view.list_type.dataProvider = this._btnList;
                    this._proxy = this.retProxy(186 /* Xianlu */);
                };
                XiandanMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_change, TouchEvent.TOUCH_TAP, this.onClickChange);
                    addEventListener(this._view.btn_desc, TouchEvent.TOUCH_TAP, this.onClickDesc);
                    addEventListener(this._view.btn_use, TouchEvent.TOUCH_TAP, this.onClickUse);
                    addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
                    addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
                    addEventListener(this._view.btn_last, TouchEvent.TOUCH_TAP, this.onScrollMove);
                    addEventListener(this._view.btn_next, TouchEvent.TOUCH_TAP, this.onScrollMove);
                    addEventListener(this._view.scr_item.viewport, PropertyEvent.PROPERTY_CHANGE, this.move);
                    this.onNt("xiandan_info_update" /* XIANDAN_INFO_UPDATE */, this.onInfoUpdate, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateAttr, this);
                    this.onNt("on_bag_update_by_prop_type" /* ON_BAG_UPDATE_BY_PROP_TYPE */, this.onBagUpdate, this);
                };
                XiandanMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initTypeList();
                    this.typeUpdateInfo();
                    this.initPosInfo();
                };
                XiandanMdr.prototype.onHide = function () {
                    this.resetItemPos();
                    Tween.remove(this._view.scr_item.viewport);
                    _super.prototype.onHide.call(this);
                };
                XiandanMdr.prototype.onClickDesc = function () {
                    facade.showView("41" /* Xianlu */, "04" /* XiandanTips */, this._selType);
                };
                XiandanMdr.prototype.onClickUse = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    var propIndex = this._selCfg.itemid;
                    if (!mod.BagUtil.checkPropCntUp(propIndex)) {
                        return;
                    }
                    if (!this._proxy.canPillUse(this._selCfg)) {
                        game.PromptBox.getIns().show(this._view.lab_tips.text);
                        return;
                    }
                    this._proxy.c2s_xian_dan_use_pill(this._selCfg.index);
                };
                XiandanMdr.prototype.onClickType = function (e) {
                    var type = e.itemIndex + 1;
                    if (type == this._selType) {
                        return;
                    }
                    this._selType = type;
                    this._selIndex = 0;
                    this.typeUpdateInfo();
                    this.resetItemPos();
                };
                XiandanMdr.prototype.onClickItem = function (e) {
                    var index = e.itemIndex;
                    if (index == this._selIndex) {
                        return;
                    }
                    this._selIndex = index;
                    this.indexUpdateInfo();
                };
                XiandanMdr.prototype.onInfoUpdate = function () {
                    this.typeUpdateInfo();
                };
                /** 通用背包事件监听 */
                XiandanMdr.prototype.onBagUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(9 /* XianDan */) < 0) {
                        return;
                    }
                    this.updateItemList();
                    this.indexUpdateInfo();
                };
                /** 通用红点事件监听 */
                XiandanMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    var list = this._btnList.source;
                    var len = list ? list.length : 0;
                    for (var i = 0; i < len; i++) {
                        var btnData = list[i];
                        var hintType = this._proxy.model.pillHints[i];
                        var type = mod.HintMgr.getType(hintType); /**转化为红点类型*/
                        if (type != data.node) {
                            continue;
                        }
                        if (!!btnData.showHint != data.value) { //过滤undefined!=false
                            btnData.showHint = data.value;
                            this._btnList.itemUpdated(btnData);
                        }
                        break; /**找到对应红点后则break，减少循环*/
                    }
                };
                XiandanMdr.prototype.initTypeList = function () {
                    var datas = [];
                    for (var i = 1; i <= 3 /* Xiandan */; ++i) {
                        var icon = "danyao_icon" + i;
                        var hintType = this._proxy.model.pillHints[i - 1];
                        var hint = mod.HintMgr.getHint(hintType);
                        datas.push({ icon: icon, showHint: hint });
                    }
                    this._btnList.source = datas;
                    this._selType = 1 /* Danyao */;
                    this._view.list_type.selectedIndex = this._selType - 1;
                    this._selIndex = 0;
                };
                XiandanMdr.prototype.typeUpdateInfo = function () {
                    this.updateItemList();
                    this.updateDesc();
                    this.updateBuff();
                    this.indexUpdateInfo();
                };
                XiandanMdr.prototype.updateItemList = function () {
                    var items = this._proxy.getPillCfgList(this._selType);
                    this._itemList.source = items;
                    /**选中可使用的index*/
                    for (var i = 0; i < items.length; ++i) {
                        var cfg = items[i];
                        if (this._proxy.canPillUse(cfg)) {
                            this._selIndex = i;
                            break;
                        }
                    }
                    this._view.list_item.selectedIndex = this._selIndex;
                };
                XiandanMdr.prototype.updateDesc = function () {
                    this._view.img_type.source = "danyaoyaoling" + this._selType;
                    var age = this._proxy.getPillAgeByType(this._selType);
                    var fontStr = age >= 100000 ? Math.floor(age / 10000) + "wn" : age + "n";
                    this.addBmpFont(fontStr, game.BmpTextCfg[100 /* CommonPower */], this._view.grp_lv);
                };
                XiandanMdr.prototype.updateBuff = function () {
                    var cfg = game.getConfigByNameId("elixir_buff.json" /* Elixir_buff */, this._selType);
                    var nextAgeDesc = ""; //下一阶药龄提示
                    var buffIndex = 0;
                    var nextIndex = this._proxy.getNextAgeIndex(this._selType);
                    if (nextIndex >= 0) {
                        //存在下一级buff
                        var nextBuffIndex = cfg.buff_index[nextIndex];
                        if (nextIndex == 0) {
                            //未激活buff
                            this._view.item2.visible = this._view.btn_change.visible = false;
                            buffIndex = nextBuffIndex; //未激活buff时，取下一级buff
                        }
                        else {
                            //显示下一级buff
                            this._view.item2.visible = this._view.btn_change.visible = true;
                            var nextBuffCfg = game.getConfigByNameId("buff.json" /* Buff */, nextBuffIndex);
                            this._view.item2.data = nextBuffCfg ? nextBuffCfg.des : "";
                            buffIndex = cfg.buff_index[nextIndex - 1]; //当前buff
                        }
                        var nextAge = cfg.age[nextIndex];
                        nextAgeDesc = game.StringUtil.substitute(game.getLanById("xiandan_buff_tips" /* xiandan_buff_tips */), [nextAge]);
                    }
                    else {
                        //不存在下一级buff
                        this._view.item2.visible = this._view.btn_change.visible = false;
                        buffIndex = cfg.buff_index[cfg.buff_index.length - 1];
                    }
                    var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, buffIndex);
                    var curDesc = buffCfg ? buffCfg.des : ""; //当前buff描述c
                    if (nextAgeDesc) {
                        curDesc += "\n" + game.TextUtil.addColor(nextAgeDesc, 16719376 /* RED */);
                    }
                    this._view.item1.data = curDesc;
                };
                XiandanMdr.prototype.indexUpdateInfo = function () {
                    var items = this._proxy.getPillCfgList(this._selType);
                    this._selCfg = items[this._selIndex];
                    if (!this._selCfg) {
                        return;
                    }
                    this.updateCnt();
                    this.updateAttr();
                };
                XiandanMdr.prototype.updateCnt = function () {
                    var propIndex = this._selCfg.itemid;
                    this._view.icon.setData(propIndex);
                    this._view.lab_name.textFlow = this._view.icon.getPropName();
                    this._view.btn_use.redPoint.visible = this._proxy.canPillUse(this._selCfg); //可使用红点
                    var tipsStr = "";
                    var isOpen = this._proxy.isPillOpen(this._selCfg);
                    if (isOpen) {
                        //可使用
                        var useCnt = this._proxy.getPillUseCnt(this._selCfg.index);
                        var maxUseCnt = this._proxy.getPillMaxUseCnt(this._selCfg);
                        tipsStr = game.getLanById("xiandan_tips2" /* xiandan_tips2 */) + game.TextUtil.addColor("(" + useCnt + "/" + maxUseCnt + ")", 2330156 /* GREEN */) + "颗";
                        var nextCfg = this._proxy.getNextCfg();
                        if (nextCfg) {
                            var nextMaxCnt = this._proxy.getPillMaxUseCnt(this._selCfg, nextCfg.index);
                            tipsStr += "\n" + game.getLanById("xiandan_tips3" /* xiandan_tips3 */) + mod.RoleUtil.getRebirthLvStr(nextCfg.index) + game.getLanById("xiandan_tips11" /* xiandan_tips11 */)
                                + game.TextUtil.addColor(nextMaxCnt + "", 2330156 /* GREEN */) + game.getLanById("xiandan_tips10" /* xiandan_tips10 */);
                        }
                    }
                    else {
                        //修仙至XXX可服用
                        var limitIndex = this._selCfg.eat_limit;
                        var rebirthCfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, limitIndex);
                        tipsStr = game.getLanById("xiandan_tips3" /* xiandan_tips3 */) + rebirthCfg.name + game.getLanById("xiandan_tips11" /* xiandan_tips11 */);
                    }
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(tipsStr);
                };
                XiandanMdr.prototype.updateAttr = function () {
                    var attrStr = "";
                    var useCnt = this._proxy.getPillUseCnt(this._selCfg.index);
                    var attr = mod.RoleUtil.getAttr(this._selCfg.ability_index);
                    var totalAttr = game.TextUtil.calcAttr(attr, useCnt);
                    var keys = game.TextUtil.getAttrOrderKeys(attr);
                    for (var i = 0, len = keys.length; i < len; i++) {
                        var k = keys[i];
                        var a = game.TextUtil.getAttrsText(k);
                        var v = game.TextUtil.getAttrsPerCent(k, attr[k]);
                        var totalv = game.TextUtil.getAttrsPerCent(k, totalAttr[k]);
                        attrStr += a + "：" + game.TextUtil.addColor(totalv + "（" + game.getLanById("xiandan_tips6" /* xiandan_tips6 */) + "+" + v + "）", 2330156 /* GREEN */) + "\n";
                    }
                    var age = useCnt * this._selCfg.age;
                    attrStr += game.TextUtil.addColor(game.getLanById("xiandan_tips5" /* xiandan_tips5 */) + "+" + age, 16719376 /* RED */) + game.TextUtil.addColor("（" + game.getLanById("xiandan_tips6" /* xiandan_tips6 */) + "+" + this._selCfg.age + "）", 2330156 /* GREEN */);
                    this._view.lab_attr.textFlow = game.TextUtil.parseHtml(attrStr);
                };
                /** 滚动 */
                XiandanMdr.prototype.onScrollMove = function (e) {
                    mod.ScrollUtil.moveH(this._view.scr_item, e.currentTarget == this._view.btn_last ? 1 : 2);
                };
                /** 滚动 */
                XiandanMdr.prototype.move = function (e) {
                    if (e.property == "scrollH" || e.property == "contentWidth") {
                        egret.callLater(this.refreshPos, this);
                    }
                };
                /** 显示左右按钮 */
                XiandanMdr.prototype.refreshPos = function () {
                    mod.ScrollUtil.changeBtnShow(this._view.scr_item, this._view.btn_last, this._view.btn_next, 94);
                };
                XiandanMdr.prototype.initPosInfo = function () {
                    var index1 = this._view.getChildIndex(this._view.item1);
                    this._posInfo1 = [this._view.item1.x, this._view.item1.y, index1];
                    var index2 = this._view.getChildIndex(this._view.item2);
                    this._posInfo2 = [this._view.item2.x, this._view.item2.y, index2];
                    this.resetItemPos();
                };
                XiandanMdr.prototype.resetItemPos = function () {
                    this._view.item1.x = this._posInfo1[0];
                    this._view.item1.y = this._posInfo1[1];
                    this._view.setChildIndex(this._view.item1, this._posInfo1[2]);
                    this._view.item1.isUp = true;
                    this._view.item2.x = this._posInfo2[0];
                    this._view.item2.y = this._posInfo2[1];
                    this._view.setChildIndex(this._view.item2, this._posInfo2[2]);
                    this._view.item2.isUp = false;
                    this._isChanging = false;
                    Tween.remove(this._view.item1);
                    Tween.remove(this._view.item2);
                };
                XiandanMdr.prototype.onClickChange = function () {
                    var _this = this;
                    if (this._isChanging) {
                        return;
                    }
                    this._isChanging = true;
                    var pos1 = [this._view.item1.x, this._view.item1.y];
                    var pos2 = [this._view.item2.x, this._view.item2.y];
                    Tween.get(this._view.item1).to({ x: pos2[0], y: pos2[1] }, 200);
                    Tween.get(this._view.item2).to({ x: pos1[0], y: pos1[1] }, 200).exec(Handler.alloc(this, function () {
                        var index1 = _this._view.getChildIndex(_this._view.item1);
                        var index2 = _this._view.getChildIndex(_this._view.item2);
                        _this._view.setChildIndex(_this._view.item1, index2);
                        _this._view.item1.isUp = !_this._view.item1.isUp;
                        _this._view.setChildIndex(_this._view.item2, index1);
                        _this._view.item2.isUp = !_this._view.item2.isUp;
                        _this._isChanging = false;
                    }));
                };
                return XiandanMdr;
            }(game.EffectMdrBase));
            xianlu.XiandanMdr = XiandanMdr;
            __reflect(XiandanMdr.prototype, "game.mod.xianlu.XiandanMdr");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XiandanTipsMdr = /** @class */ (function (_super) {
                __extends(XiandanTipsMdr, _super);
                function XiandanTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianlu.XiandanTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XiandanTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(186 /* Xianlu */);
                };
                XiandanTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                XiandanTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                XiandanTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XiandanTipsMdr.prototype.updateView = function () {
                    this._view.lab_title.text = game.getLanById("xiandan_tips8" /* xiandan_tips8 */);
                    var desc = "";
                    var attr = this._proxy.getPillAttrByType(this._showArgs);
                    if (attr && attr.showpower) {
                        desc = game.TextUtil.getAttrText(attr, 8585074 /* GREEN */);
                    }
                    var age = this._proxy.getPillAgeByType(this._showArgs);
                    var buffIndex = this._proxy.getBuffIndex(this._showArgs, age);
                    if (buffIndex) {
                        var cfg = game.getConfigByNameId("buff.json" /* Buff */, buffIndex);
                        desc += "\n" + (cfg ? cfg.des : "");
                    }
                    this._view.baseDescItem.updateShow(desc, game.getLanById("xiandan_tips9" /* xiandan_tips9 */), 20);
                };
                return XiandanTipsMdr;
            }(game.MdrBase));
            xianlu.XiandanTipsMdr = XiandanTipsMdr;
            __reflect(XiandanTipsMdr.prototype, "game.mod.xianlu.XiandanTipsMdr");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var Tween = base.Tween;
            var Sine = base.Sine;
            var Handler = base.Handler;
            var ArrayCollection = eui.ArrayCollection;
            var XiuxianBreakTipsMdr = /** @class */ (function (_super) {
                __extends(XiuxianBreakTipsMdr, _super);
                function XiuxianBreakTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianlu.XiuxianBreakTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XiuxianBreakTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.verticalCenter = 0;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = xianlu.XiuxianBreakItem;
                    this._view.list_item.dataProvider = this._itemList;
                    this._proxy = this.retProxy(186 /* Xianlu */);
                };
                XiuxianBreakTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateAttr, this);
                };
                XiuxianBreakTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.updateAttr();
                    this.showTitleTween();
                    //this.showBgTween();
                    this.showGrpTween();
                    this.showItemTween(this._view.item1);
                    this.showItemTween(this._view.item2);
                    this.showOpenTween();
                    this.showTipsTween();
                    this.showEffect();
                };
                XiuxianBreakTipsMdr.prototype.onHide = function () {
                    this.removeTitleTween();
                    //this.removeBgTween();
                    this.removeGrpTween();
                    this.removeOpenTween();
                    this.removeItemTween();
                    this.removeTipsTween();
                    _super.prototype.onHide.call(this);
                };
                XiuxianBreakTipsMdr.prototype.updateShow = function () {
                    var index1 = this._showArgs.lastIndex; //上一转生index
                    var lv1 = this._showArgs.lastLv; //上一仙魄等级
                    this._xianpoAttr1 = this._showArgs.lastXianpoAttr; //上一级仙魄属性
                    var cfg1 = game.getConfigByNameId("rebirth.json" /* Rebirth */, index1);
                    this._cfg1 = cfg1;
                    var index2 = cfg1.next_index;
                    var cfg2 = game.getConfigByNameId("rebirth.json" /* Rebirth */, index2);
                    this._cfg2 = cfg2;
                    var fontStr1 = game.ResUtil.getRebirthFontStr(index1);
                    this.addBmpFont(fontStr1, game.BmpTextCfg[200 /* RebirthLv */], this._view.grp_lv1, true, 1, true);
                    var fontStr2 = game.ResUtil.getRebirthFontStr(index2);
                    this.addBmpFont(fontStr2, game.BmpTextCfg[200 /* RebirthLv */], this._view.grp_lv2, true, 1, true);
                    this._view.item1.setData(lv1);
                    var lv2 = this._proxy.model.xianpolevel;
                    this._view.item2.setData(lv2);
                    var infos = [];
                    var i = 1;
                    while (cfg2["icon" + i] && cfg2["desc" + i]) {
                        infos.push({ icon: cfg2["icon" + i], desc: cfg2["desc" + i] });
                        i++;
                    }
                    this._itemList.source = infos;
                };
                XiuxianBreakTipsMdr.prototype.updateAttr = function () {
                    //属性需要显示：转生属性+仙魄属性
                    var attrIndex1 = this._cfg1.attr_index;
                    var attr1 = mod.RoleUtil.getAttr(attrIndex1); //上一级转生属性
                    var xianpoAttr1 = this._xianpoAttr1; //上一级仙魄属性
                    var attrIndex2 = this._cfg2.attr_index;
                    var attr2 = mod.RoleUtil.getAttr(attrIndex2); //当前转生属性
                    var xianpoAttr2 = this._proxy.model.xianpo_attr; //当前仙魄属性
                    var totalAttr1 = game.TextUtil.calcAttrList([attr1, xianpoAttr1]); //合并后的属性
                    var totalAttr2 = game.TextUtil.calcAttrList([attr2, xianpoAttr2]); //合并后的属性
                    var keys1 = game.TextUtil.getAttrOrderKeys(totalAttr1); //上一级属性keys
                    var keys2 = game.TextUtil.getAttrOrderKeys(totalAttr2); //当前属性keys
                    var desc1 = "";
                    if (keys1.length != keys2.length) {
                        //长度不一致时，取当前的
                        for (var i = 0, len = keys2.length; i < len; i++) {
                            var k = keys2[i];
                            var a = game.TextUtil.getAttrsText(k);
                            var val = totalAttr1[k] || 0;
                            var v = game.TextUtil.getAttrsPerCent(k, val);
                            desc1 += a + game.TextUtil.addColor(" +" + v, 8585074 /* GREEN */) + (i < len - 1 ? "\n" : "");
                        }
                    }
                    else {
                        desc1 = game.TextUtil.getAttrTextAdd(totalAttr1, 8585074 /* GREEN */);
                    }
                    this._view.lab_desc1.textFlow = game.TextUtil.parseHtml(desc1);
                    var desc2 = game.TextUtil.getAttrTextAdd(totalAttr2, 8585074 /* GREEN */, "\n", " +", undefined, "");
                    this._view.lab_desc2.textFlow = game.TextUtil.parseHtml(desc2);
                };
                XiuxianBreakTipsMdr.prototype.showTitleTween = function () {
                    this._view.img_title.scaleX = this._view.img_title.scaleY = 7;
                    Tween.get(this._view.img_title)
                        .to({ scaleX: 1, scaleY: 1 }, 200);
                };
                XiuxianBreakTipsMdr.prototype.removeTitleTween = function () {
                    Tween.remove(this._view.img_title);
                };
                XiuxianBreakTipsMdr.prototype.showBgTween = function () {
                    var _this = this;
                    this._view.img_bg.visible = false;
                    this._view.img_bg.height = 0;
                    Tween.get(this._view.img_bg)
                        .delay(200)
                        .exec(Handler.alloc(this, function () {
                        _this._view.img_bg.visible = true;
                    }))
                        .to({ height: 720 }, 200, null, Sine.easeIn);
                };
                XiuxianBreakTipsMdr.prototype.removeBgTween = function () {
                    Tween.remove(this._view.img_bg);
                };
                XiuxianBreakTipsMdr.prototype.showGrpTween = function () {
                    var _this = this;
                    this._view.grp_show.visible = false;
                    this._view.grp_show.x = 0;
                    Tween.get(this._view.grp_show)
                        .delay(400)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp_show.visible = true;
                    }))
                        .to({ x: 110 }, 200, null, Sine.easeIn);
                };
                XiuxianBreakTipsMdr.prototype.removeGrpTween = function () {
                    Tween.remove(this._view.grp_show);
                };
                XiuxianBreakTipsMdr.prototype.showOpenTween = function () {
                    var _this = this;
                    this._view.grp_open.visible = false;
                    this._view.grp_open.x = 0;
                    Tween.get(this._view.grp_open)
                        .delay(600)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp_open.visible = true;
                    }))
                        .to({ x: 175 }, 200, null, Sine.easeIn);
                };
                XiuxianBreakTipsMdr.prototype.removeOpenTween = function () {
                    Tween.remove(this._view.grp_open);
                };
                XiuxianBreakTipsMdr.prototype.showItemTween = function (item) {
                    item.visible = false;
                    item.scaleX = item.scaleY = 3;
                    Tween.get(item)
                        .delay(800)
                        .exec(Handler.alloc(this, function () {
                        item.visible = true;
                    }))
                        .to({ scaleX: 1, scaleY: 1 }, 200, null, Sine.easeIn);
                };
                XiuxianBreakTipsMdr.prototype.removeItemTween = function () {
                    Tween.remove(this._view.item1);
                    Tween.remove(this._view.item2);
                };
                XiuxianBreakTipsMdr.prototype.showTipsTween = function () {
                    var _this = this;
                    this._view.closeTips.visible = false;
                    Tween.get(this._view.closeTips)
                        .delay(1000)
                        .exec(Handler.alloc(this, function () {
                        _this._view.closeTips.visible = true;
                    }));
                };
                XiuxianBreakTipsMdr.prototype.removeTipsTween = function () {
                    Tween.remove(this._view.closeTips);
                };
                XiuxianBreakTipsMdr.prototype.showEffect = function () {
                    this.removeEft();
                    this.addEftByParent("success" /* Success */, this._view.grp_eft, 0, 0, 0, null, 1);
                    this.addEftByParent("tips_bg" /* TipsBg */, this._view.grp_eft2);
                };
                return XiuxianBreakTipsMdr;
            }(game.EffectMdrBase));
            xianlu.XiuxianBreakTipsMdr = XiuxianBreakTipsMdr;
            __reflect(XiuxianBreakTipsMdr.prototype, "game.mod.xianlu.XiuxianBreakTipsMdr");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var XiuxianMdr = /** @class */ (function (_super) {
                __extends(XiuxianMdr, _super);
                function XiuxianMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianlu.XiuxianView);
                    _this._endTime = 0;
                    return _this;
                }
                XiuxianMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = xianlu.XiuxianFireRender;
                    this._view.list_item.dataProvider = this._itemList;
                    this._taskList = new ArrayCollection();
                    this._view.list_task.itemRenderer = mod.TaskRender2;
                    this._view.list_task.dataProvider = this._taskList;
                    this._proxy = this.retProxy(186 /* Xianlu */);
                    this._proxy2 = facade.retMod("27" /* Activity */).retProxy(248 /* TehuiLibao */);
                };
                XiuxianMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_preview, TouchEvent.TOUCH_TAP, this.onClickPreview);
                    addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickLibao);
                    addEventListener(this._view.btn_gift1, TouchEvent.TOUCH_TAP, this.onClickGift1);
                    addEventListener(this._view.btn_gift2, TouchEvent.TOUCH_TAP, this.onClickGift2);
                    addEventListener(this._view.btn_war, TouchEvent.TOUCH_TAP, this.onClickWar);
                    addEventListener(this._view.btn_xianpo, TouchEvent.TOUCH_TAP, this.onClickXianpo);
                    addEventListener(this._view.btn_break, TouchEvent.TOUCH_TAP, this.onClickBreak);
                    this.onNt("on_task_update" /* ON_TASK_UPDATE */, this.onTaskUpdate, this);
                    this.onNt("xiuxian_info_update" /* XIUXIAN_INFO_UPDATE */, this.onInfoUpdate, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                };
                XiuxianMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.updateTaskList();
                    this.updateInfo();
                    this.updateBreak();
                    this.updateHint();
                    this.onUpdateTime();
                    this.isShowIcon();
                };
                XiuxianMdr.prototype.isShowIcon = function () {
                    var productId = this._proxy2.getInfo(3);
                    var hasBuy = mod.PayUtil.hasBuy(productId);
                    this._view.btn_gift2.visible = !hasBuy;
                };
                XiuxianMdr.prototype.onUpdateTime = function () {
                    this._view.btn_gift2.img_bg.visible = false;
                    this._view.btn_gift2.gr_time.visible = true;
                    this._endTime = this._proxy.getEndTime();
                    if (this._endTime) {
                        TimeMgr.addUpdateItem(this, 1000);
                        this.update(TimeMgr.time);
                    }
                };
                XiuxianMdr.prototype.update = function (time) {
                    var leftTime = this._endTime - time.serverTimeSecond;
                    if (leftTime <= 0) {
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    this._view.btn_gift2.lb_time.text = game.TimeUtil.formatSecond(leftTime, 'd天H时', true);
                };
                XiuxianMdr.prototype.onHide = function () {
                    this._effId_break = 0;
                    this._effId_xianpo = 0;
                    TimeMgr.removeUpdateItem(this);
                    this._endTime = 0;
                    _super.prototype.onHide.call(this);
                };
                XiuxianMdr.prototype.initShow = function () {
                    //this.addEftByParent(UIEftSrc.Xianlu_1, this._view.group_eft1);
                    //this.addEftByParent(UIEftSrc.Xianlu_6, this._view.group_eft2);
                    this.addEftByParent2("xianlu_1" /* Xianlu_1 */, this._view.group_eft1, true, 0.5);
                    this.addEftByParent2("xianlu_6" /* Xianlu_6 */, this._view.group_eft2, true, 0.5);
                    this.addEftByParent("xianlu_7" /* Xianlu_7 */, this._view.btn_war.group_eft);
                };
                XiuxianMdr.prototype.onClickPreview = function () {
                    mod.ViewMgr.getIns().showSecondPop("41" /* Xianlu */, "02" /* XiuxianPreview */);
                };
                XiuxianMdr.prototype.onClickGift1 = function () {
                    //todo
                    game.PromptBox.getIns().show("修仙特惠");
                };
                //修仙礼包
                XiuxianMdr.prototype.onClickGift2 = function () {
                    mod.ViewMgr.getIns().showSecondPop("27" /* Activity */, "93" /* TehuiLibao */, 3 /* XiuXianJieji */);
                    //ViewMgr.getIns().showGift(ProductId.Id201903);
                };
                XiuxianMdr.prototype.onClickWar = function () {
                    //todo
                    //PromptBox.getIns().show("修仙令");
                    // let props: msg.prop_tips_data[] = [];
                    // for(let i = 0; i < 8; ++i){
                    //     props.push({idx: Long.fromValue(1450401001 + i), cnt: i + 1})
                    // }
                    // PropTipsMgr.getIns().show(props);
                    mod.ViewMgr.getIns().showViewByID(72 /* Xiuxianling */);
                };
                XiuxianMdr.prototype.onClickXianpo = function () {
                    //点击仙魄，弹出仙魄tips
                    facade.showView("41" /* Xianlu */, "03" /* XiuxianTips */);
                };
                XiuxianMdr.prototype.onClickBreak = function () {
                    //可以突破下一境界
                    this._proxy.c2s_xianlu_reinc_levelup();
                };
                XiuxianMdr.prototype.onClickJinji = function () {
                    //修仙礼包
                    mod.ViewMgr.getIns().showSecondPop("27" /* Activity */, "93" /* TehuiLibao */, 3 /* XiuXianJieji */);
                };
                //坐骑进阶礼包
                XiuxianMdr.prototype.onClickLibao = function () {
                    mod.ViewMgr.getIns().showViewByID(138 /* XianLvJinJie */);
                };
                XiuxianMdr.prototype.onTaskUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(3 /* Xiuxian */) > -1) {
                        this.updateTaskList();
                        this.updateBreak();
                    }
                };
                XiuxianMdr.prototype.onInfoUpdate = function () {
                    this.updateInfo();
                    this.updateBreak();
                    this.isShowIcon();
                };
                /** 通用红点事件监听 */
                XiuxianMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    if (data.node == mod.HintMgr.getType(this._proxy.model.rewardHint)) {
                        this.updateRewardHint(data.value);
                    }
                };
                XiuxianMdr.prototype.updateTaskList = function () {
                    var tasks = mod.TaskUtil.getTaskList(3 /* Xiuxian */);
                    if (this._taskList.source.length > 0) {
                        this._taskList.replaceAll(tasks);
                    }
                    else {
                        this._taskList.source = tasks;
                    }
                };
                XiuxianMdr.prototype.updateInfo = function () {
                    var index = this._proxy.model.index;
                    var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, index);
                    if (!cfg) {
                        return;
                    }
                    this._view.lab_name.text = cfg.name;
                    var fontStr = game.ResUtil.getRebirthFontStr(index);
                    this.addBmpFont(fontStr, game.BmpTextCfg[200 /* RebirthLv */], this._view.grp_lv, true, 1, true);
                    var chongLv = cfg.relv2;
                    var maxLv = this._proxy.getMaxChongLv();
                    var items = [];
                    for (var i = 0; i < maxLv; ++i) {
                        items.push(chongLv);
                    }
                    if (this._itemList.source.length > 0) {
                        this._itemList.replaceAll(items);
                    }
                    else {
                        this._itemList.source = items;
                    }
                };
                XiuxianMdr.prototype.updateBreak = function () {
                    var canBreak = this._proxy.canBreak();
                    this._view.btn_break.visible = this._view.btn_break.redPoint.visible = canBreak;
                    if (this._view.btn_break.visible && !this._effId_break) {
                        this._effId_break = this.addEftByParent("xianlu_2" /* Xianlu_2 */, this._view.btn_break.group_eft);
                    }
                    this._view.btn_xianpo.visible = !canBreak;
                    if (this._view.btn_xianpo.visible && !this._effId_xianpo) {
                        this._effId_xianpo = this.addEftByParent("xianlu_5" /* Xianlu_5 */, this._view.btn_xianpo.group_eft);
                    }
                };
                /** 更新红点 */
                XiuxianMdr.prototype.updateHint = function () {
                    this.updateRewardHint(mod.HintMgr.getHint(this._proxy.model.rewardHint));
                };
                XiuxianMdr.prototype.updateRewardHint = function (hint) {
                    this._view.btn_preview.redPoint.visible = hint;
                };
                return XiuxianMdr;
            }(game.EffectMdrBase));
            xianlu.XiuxianMdr = XiuxianMdr;
            __reflect(XiuxianMdr.prototype, "game.mod.xianlu.XiuxianMdr", ["base.UpdateItem"]);
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var XiuxianPreviewMdr = /** @class */ (function (_super) {
                __extends(XiuxianPreviewMdr, _super);
                function XiuxianPreviewMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianlu.XiuxianPreviewView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XiuxianPreviewMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList1 = new ArrayCollection();
                    this._view.list_item1.itemRenderer = xianlu.XiuxianItemRender;
                    this._view.list_item1.dataProvider = this._itemList1;
                    this._itemList2 = new ArrayCollection();
                    this._view.list_item2.itemRenderer = xianlu.XiuxianItemRender;
                    this._view.list_item2.dataProvider = this._itemList2;
                    this._rewardList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._rewardList;
                    this._proxy = this.retProxy(186 /* Xianlu */);
                };
                XiuxianPreviewMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn_draw, TouchEvent.TOUCH_TAP, this.onClickDraw);
                    addEventListener(this._view.btn_vip, TouchEvent.TOUCH_TAP, this.onClickVip);
                    this.onNt("xiuxian_info_update" /* XIUXIAN_INFO_UPDATE */, this.updateReward, this);
                };
                XiuxianPreviewMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                    this.updateReward();
                };
                XiuxianPreviewMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XiuxianPreviewMdr.prototype.onClickVip = function () {
                    mod.ViewMgr.getIns().openVipView();
                };
                XiuxianPreviewMdr.prototype.onClickDraw = function () {
                    //领取奖励
                    this._proxy.c2s_xianlu_reinc_getreward();
                };
                XiuxianPreviewMdr.prototype.updateView = function () {
                    var index = this._proxy.model.index;
                    if (!index) {
                        return;
                    }
                    var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, index);
                    if (!cfg) {
                        return;
                    }
                    var fontStr = game.ResUtil.getRebirthFontStr(index, true);
                    this.addBmpFont(fontStr, game.BmpTextCfg[200 /* RebirthLv */], this._view.grp_lv, true, 1, true);
                    var itemData1 = cfg.open_show2.split("#N");
                    this._itemList1.source = itemData1;
                    var curLv = this._proxy.model.xianpolevel;
                    this._view.item1.setData(curLv);
                    var nextCfg = this._proxy.getNextCfg();
                    this._nextIndex = nextCfg ? nextCfg.index : 0;
                    if (!this._nextIndex) {
                        this._view.currentState = "max";
                        return;
                    }
                    var nextFontStr = game.ResUtil.getRebirthFontStr(this._nextIndex, true);
                    this.addBmpFont(nextFontStr, game.BmpTextCfg[200 /* RebirthLv */], this._view.grp_nextLv, true, 1, true);
                    var itemData2 = nextCfg.open_show2.split("#N");
                    this._itemList2.source = itemData2;
                    var nextLv = curLv;
                    var godpowerCfg = game.getConfigByNameId("godpower.json" /* Godpower */, curLv + 1);
                    if (godpowerCfg && godpowerCfg.advance_limit <= this._nextIndex) {
                        /**下一转升级仙魄*/
                        nextLv++;
                    }
                    this._view.item2.setData(nextLv);
                };
                XiuxianPreviewMdr.prototype.updateReward = function () {
                    var index = this._proxy.model.rewardindex;
                    var status = this._proxy.model.rewardstatus;
                    if (!index || (index && status == 2 /* Draw */ && this._nextIndex)) {
                        index = this._nextIndex; //服务端未记录下一转的奖励
                        status = 0 /* NotFinish */;
                    }
                    var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, index);
                    if (!cfg) {
                        return;
                    }
                    this._view.lab_reward.text = mod.RoleUtil.getRebirthLvStr(index) + game.getLanById("award" /* award */);
                    var reward = cfg.advance_reward;
                    this._rewardList.source = reward;
                    var hasDraw = status == 2 /* Draw */;
                    this._view.img_draw.visible = hasDraw;
                    this._view.btn_draw.visible = !hasDraw;
                    if (this._view.btn_draw.visible) {
                        var canDraw = status == 1 /* Finish */;
                        this._view.btn_draw.redPoint.visible = canDraw;
                        this._view.btn_draw.labelDisplay.text = game.getLanById("tishi_29" /* tishi_29 */);
                        if (canDraw) {
                            this._view.btn_draw.setYellow();
                        }
                        else {
                            this._view.btn_draw.setDisabled();
                        }
                    }
                };
                return XiuxianPreviewMdr;
            }(game.EffectMdrBase));
            xianlu.XiuxianPreviewMdr = XiuxianPreviewMdr;
            __reflect(XiuxianPreviewMdr.prototype, "game.mod.xianlu.XiuxianPreviewMdr");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianlu;
        (function (xianlu) {
            var XiuxianTipsMdr = /** @class */ (function (_super) {
                __extends(XiuxianTipsMdr, _super);
                function XiuxianTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianlu.XiuxianTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XiuxianTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(186 /* Xianlu */);
                };
                XiuxianTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                XiuxianTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                XiuxianTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XiuxianTipsMdr.prototype.updateView = function () {
                    var lv = this._showArgs || this._proxy.model.xianpolevel || 1;
                    var nameStr = game.getLanById("xianpo_tips" /* xianpo_tips */) + "·" + lv + game.getLanById("tishi_43" /* tishi_43 */);
                    this._view.lab_name.text = nameStr;
                    var attrStr = game.getLanById("bag_cue20" /* bag_cue20 */);
                    var curLv = this._proxy.model.xianpolevel;
                    var attr = lv > curLv ? this._proxy.model.xianpo_nextattr : this._proxy.model.xianpo_attr;
                    var godRate = 0; //仙力效果加成万分比
                    if (attr && attr.showpower) {
                        //godRate = attr[AttrKey.god_rate]; @yys
                        godRate = game.RoleVo.ins.getValueByKey("god_rate" /* god_rate */);
                        //@yys
                        var cfg_5 = game.getConfigByNameId("godpower.json" /* Godpower */, curLv);
                        attr["god_rate" /* god_rate */] = cfg_5 && cfg_5.god_rate || 0;
                        attrStr = game.TextUtil.getAttrText(attr, 8585074 /* GREEN */);
                    }
                    var desc1 = game.TextUtil.addColor(game.getLanById("xianli_effect_tips" /* xianli_effect_tips */), 16773203 /* YELLOW */) + "\n" + attrStr;
                    this._view.baseDescItem1.updateShow(desc1, game.getLanById("soul8" /* soul8 */), 20);
                    var desc2 = game.getLanById("tishi_38" /* tishi_38 */) + game.TextUtil.getAttrsText("god" /* god */) + "："
                        + game.TextUtil.addColor(game.RoleVo.ins.getValueByKey("god" /* god */) + "", 8585074 /* GREEN */) + "\n";
                    var keyList = ["god_atk" /* god_atk */, "god_def" /* god_def */, "god_hp" /* god_hp */];
                    for (var _i = 0, keyList_1 = keyList; _i < keyList_1.length; _i++) {
                        var key = keyList_1[_i];
                        var curVal = game.RoleVo.ins.getValueByKey(key);
                        var addStr = "";
                        if (godRate) {
                            //客户端用172500*(5000 / (5000+10000))计算出加成值57500，显示的时候就是172500（+57500）
                            //仙力效果
                            var addVal = Math.round(curVal * (godRate / (godRate + 10000)));
                            addStr = "（+" + addVal + "）";
                        }
                        desc2 += game.TextUtil.getAttrsText(key) + "：" + game.TextUtil.addColor(curVal + addStr, 8585074 /* GREEN */) + "\n";
                    }
                    this._view.baseDescItem2.updateShow(desc2, game.getLanById("xianli_tips" /* xianli_tips */) + game.getLanById("tishi_54" /* tishi_54 */), 20);
                    var godpowerCfg = game.getConfigByNameId("godpower.json" /* Godpower */, lv);
                    var index = godpowerCfg.advance_limit;
                    var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, index);
                    var zhuanLv = cfg.relv;
                    var curCfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, this._proxy.model.index);
                    var curZhuanLv = curCfg.relv;
                    var actStr = game.StringUtil.substitute(game.getLanById("xianli_act_tips" /* xianli_act_tips */), [zhuanLv]);
                    actStr += game.TextUtil.addColor("（" + curZhuanLv + "/" + +zhuanLv + "）", curZhuanLv >= zhuanLv ? 8585074 /* GREEN */ : 16731212 /* RED */);
                    this._view.lab_act.textFlow = game.TextUtil.parseHtml(actStr);
                };
                return XiuxianTipsMdr;
            }(game.MdrBase));
            xianlu.XiuxianTipsMdr = XiuxianTipsMdr;
            __reflect(XiuxianTipsMdr.prototype, "game.mod.xianlu.XiuxianTipsMdr");
        })(xianlu = mod.xianlu || (mod.xianlu = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=xianlu.js.map