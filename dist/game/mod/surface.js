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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var c2s_fly_sword_operation = msg.c2s_fly_sword_operation;
            var c2s_fly_sword_into_battle = msg.c2s_fly_sword_into_battle;
            var s2c_fly_sword_info = msg.s2c_fly_sword_info;
            var s2c_fly_sword_battle_pos = msg.s2c_fly_sword_battle_pos;
            /**
             * @description 仙剑系统
             */
            var XianjianProxy = /** @class */ (function (_super) {
                __extends(XianjianProxy, _super);
                function XianjianProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(XianjianProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                XianjianProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    this._model.upStarIdx = null;
                    this._model.upStarData = null;
                };
                XianjianProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new surface.XianjianModel();
                    this.onProto(s2c_fly_sword_info, this.s2c_fly_sword_info, this);
                    this.onProto(s2c_fly_sword_battle_pos, this.s2c_fly_sword_battle_pos, this);
                };
                XianjianProxy.prototype.c2s_fly_sword_operation = function (index, op, param) {
                    var msg = new c2s_fly_sword_operation();
                    if (index) {
                        msg.index = index;
                    }
                    if (param) {
                        msg.param = param;
                    }
                    msg.op = op;
                    this.sendProto(msg);
                    if (op == 5) {
                        this._model.isAct = true;
                    }
                    else if (op == 1) {
                        this._model.upStarIdx = index; //升星的index
                    }
                };
                XianjianProxy.prototype.c2s_fly_sword_into_battle = function (pos, index) {
                    var msg = new c2s_fly_sword_into_battle();
                    msg.pos = pos;
                    msg.index = index;
                    this.sendProto(msg);
                };
                XianjianProxy.prototype.s2c_fly_sword_battle_pos = function (n) {
                    var msg = n.body;
                    if (msg.info) {
                        this._model.shangzhen = {};
                        this.skills = [];
                        for (var i = 0; i < msg.info.length; i++) {
                            var d = msg.info[i];
                            var cfg = game.getConfigByNameId("xianjian.json" /* Xianjian */, d.index);
                            if (cfg.skill) {
                                this.skills.push(cfg.skill);
                            }
                            this._model.shangzhen[d.pos] = d;
                        }
                    }
                    this.sendNt("on_update_shangzhen_info" /* ON_UPDATE_SHANGZHEN_INFO */);
                };
                XianjianProxy.prototype.s2c_fly_sword_info = function (n) {
                    var msg = n.body;
                    if (msg.info) {
                        for (var _i = 0, _a = msg.info; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this._model.infos.set(info.index, info);
                            var isShowSurfaceTips = false;
                            //外显激活弹窗
                            if (info.star == 1 && this._model.upStarIdx == info.index) {
                                isShowSurfaceTips = true;
                                mod.ViewMgr.getIns().showSurfaceTips(info.index);
                            }
                            //升星成功弹窗
                            if (info.star != 0 && this._model.upStarIdx == info.index) {
                                var curStar = info.star;
                                var cfg = game.getConfigByNameId("xianjian.json" /* Xianjian */, info.index);
                                var god = info.all_attr && info.all_attr["god" /* god */] || 0;
                                var lastGod = 0;
                                if (cfg && cfg.attr_id && cfg.attr_id[curStar - 2]) {
                                    var lastAttr = mod.RoleUtil.getAttr(cfg.attr_id[curStar - 2]);
                                    lastGod = lastAttr && lastAttr["god" /* god */] || 0;
                                }
                                var upStarData = {
                                    star: curStar,
                                    attrFont1: god > 0 ? "+" + god : '',
                                    attrFont0: god > 0 ? "\u4ED9\u529B+" + lastGod : ''
                                };
                                if (isShowSurfaceTips) {
                                    this._model.upStarData = upStarData;
                                }
                                else {
                                    this._model.upStarData = null;
                                    mod.ViewMgr.getIns().showUpStarTips(upStarData);
                                }
                            }
                        }
                        this._model.upStarIdx = null;
                    }
                    this.onInitData();
                    if (this._model.isAct && msg.jiban_list && this._model.jiban.length != msg.jiban_list.length) {
                        mod.ViewMgr.getIns().showSuccessTips(1 /* Act */);
                        this._model.isAct = false;
                    }
                    if (msg.jiban_list) {
                        this._model.jiban = msg.jiban_list;
                    }
                    this.onUpdateHint();
                    this.sendNt("on_update_xianjian_info" /* ON_UPDATE_XIANJIAN_INFO */);
                    this.sendNt("surface_jiban_info_update" /* SURFACE_JIBAN_INFO_UPDATE */, 408 /* Xianjian */);
                };
                //升星成功弹窗
                XianjianProxy.prototype.onSurfaceTipsHide = function () {
                    if (this._model.upStarData) {
                        var data = mod.RoleUtil.clone(this._model.upStarData);
                        mod.ViewMgr.getIns().showUpStarTips(data);
                        this._model.upStarData = null;
                    }
                };
                XianjianProxy.prototype.getInfo = function (index) {
                    return this._model.infos.get(index);
                };
                /**仙剑总属性*/
                XianjianProxy.prototype.getAttr = function () {
                    var keys = Array.from(this._model.infos.keys());
                    var attrList = [];
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var k = keys_1[_i];
                        var info = this.getInfo(+k);
                        attrList.push(info.all_attr);
                    }
                    return game.TextUtil.calcAttrList(attrList);
                };
                XianjianProxy.prototype.getCfgArr = function () {
                    var keys = Array.from(this._model.infos.keys());
                    var list = [];
                    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                        var k = keys_2[_i];
                        var info = this.getInfo(+k);
                        var cfg = game.getConfigByNameId("xianjian.json" /* Xianjian */, info.index);
                        list.push(cfg);
                    }
                    return list;
                };
                Object.defineProperty(XianjianProxy.prototype, "countOfActive", {
                    get: function () {
                        var keys = Array.from(this._model.infos.keys());
                        return keys.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                XianjianProxy.prototype.getShangzhen = function (pos) {
                    return this._model.shangzhen && this._model.shangzhen[pos] || null;
                };
                XianjianProxy.prototype.getXianjianCfgList = function (type, buwei) {
                    if (buwei === void 0) { buwei = false; }
                    var cfgArr = game.getConfigListByName("xianjian.json" /* Xianjian */);
                    var list = [];
                    for (var _i = 0, cfgArr_1 = cfgArr; _i < cfgArr_1.length; _i++) {
                        var cfg = cfgArr_1[_i];
                        if (cfg.type != type) {
                            continue;
                        }
                        // let info = this.getInfo(cfg.index);
                        // if (!cfg.show && !info) {
                        //     //未激活且不满足激活
                        //     continue;
                        // }
                        if (buwei) {
                            var cfgs = game.getConfigByNameId("jianfa.json" /* Jianfa */, cfg.index);
                            if (!cfgs) {
                                continue;
                            }
                        }
                        list.push(cfg);
                    }
                    return list;
                };
                XianjianProxy.prototype.getMinStage = function (index) {
                    var info = this.getInfo(index);
                    if (!info || !info.buwei_info) {
                        return 0;
                    }
                    var min = 0;
                    for (var i = 0; i < 4; i++) {
                        var buwei = info.buwei_info[i];
                        var lv = buwei && buwei.level || 0;
                        min = Math.min(min, lv);
                    }
                    return min;
                };
                XianjianProxy.prototype.getNextStage = function (index) {
                    var info = this.getInfo(index);
                    var cfg = game.getConfigByNameId("xianjian.json" /* Xianjian */, index);
                    var idx = info ? info.active_skill_level - 1 : 0;
                    var condition = cfg.condition[idx];
                    if (condition) {
                        return condition;
                    }
                    return 0;
                };
                XianjianProxy.prototype.getCountByStage = function (index, stage) {
                    var info = this.getInfo(index);
                    if (!info || !info.buwei_info) {
                        return 0;
                    }
                    var count = 0;
                    for (var _i = 0, _a = info.buwei_info; _i < _a.length; _i++) {
                        var buwei = _a[_i];
                        if (buwei.level >= stage) {
                            count++;
                        }
                    }
                    return count;
                };
                XianjianProxy.prototype.getBuwei = function (data) {
                    var info = this.getInfo(data.index);
                    if (!info || !info.buwei_info) {
                        return null;
                    }
                    for (var _i = 0, _a = info.buwei_info; _i < _a.length; _i++) {
                        var buwei = _a[_i];
                        if (buwei.index == data.pos) {
                            return buwei;
                        }
                    }
                    return null;
                };
                XianjianProxy.prototype.getXianjianBuwei = function (info) {
                    var cfgs = game.getConfigByNameId("jianfa.json" /* Jianfa */, info.index);
                    for (var k in cfgs) {
                        var cfg = cfgs[k];
                        if (cfg.pos == info.pos) {
                            return cfg;
                        }
                    }
                    return null;
                };
                XianjianProxy.prototype.getBuweiNext = function (info) {
                    var cfgs = game.getConfigByNameId("jianfa.json" /* Jianfa */, info.index);
                    for (var k in cfgs) {
                        var cfg = cfgs[k];
                        if (cfg.pos == info.pos) {
                            var buwei = this.getBuwei(info);
                            return cfg.cost[buwei && buwei.level || 0] || null;
                        }
                    }
                    return null;
                };
                XianjianProxy.prototype.getCfgSkill = function (index, pos, level) {
                    var cfg = game.getConfigByNameId("xianjian.json" /* Xianjian */, index);
                    var cfgs = game.getConfigByNameId("xianjian_skill_pos.json" /* XianjianSkillPos */, cfg.quality);
                    var lv = level || this.getSkillLv(index, pos) || 1;
                    for (var k in cfgs) {
                        var cfg_pos = cfgs[k];
                        if (cfg_pos.level == lv) {
                            return cfg_pos.skills[pos - 1];
                        }
                    }
                    return 0;
                };
                /**被动技能等级 */
                XianjianProxy.prototype.getSkillLv = function (index, pos) {
                    var info = this.getInfo(index);
                    if (info && info.skill_index) {
                        for (var _i = 0, _a = info.skill_index; _i < _a.length; _i++) {
                            var skill = _a[_i];
                            if (skill.index == pos) {
                                return skill.level;
                            }
                        }
                    }
                    return 0;
                };
                XianjianProxy.prototype.getSkillCost = function (index, level) {
                    var xianjian = game.getConfigByNameId("xianjian.json" /* Xianjian */, index);
                    var cfg = game.getConfigByNameId("xianjian_skill_cost.json" /* XianjianSkillCost */, xianjian.quality);
                    var cost = cfg.cost[level];
                    if (cost && cost.length) {
                        return cost;
                    }
                    return [];
                };
                Object.defineProperty(XianjianProxy.prototype, "jibans", {
                    get: function () {
                        return this._model.jiban;
                    },
                    enumerable: true,
                    configurable: true
                });
                XianjianProxy.prototype.onUpdateHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670201 /* Xianjian */)) {
                        return;
                    }
                    var types = this.getTypes();
                    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                        var type = types_1[_i];
                        this.onUpdateHintByType(type);
                    }
                    this.onUpdateHintByBuwei();
                };
                XianjianProxy.prototype.onUpdateHintByBuwei = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670201 /* Xianjian */)) {
                        return;
                    }
                    for (var _i = 0, _a = this.buwei_types; _i < _a.length; _i++) {
                        var type = _a[_i];
                        this.onUpdateHintBySkill(type);
                    }
                };
                XianjianProxy.prototype.onUpdateHintBySkill = function (type) {
                    var roots = ["46" /* Surface */, "18" /* Xianjian */, "02" /* TabBtnType02 */, "0" + type];
                    mod.HintMgr.setHint(this.getTypeHintBySkill(type), roots);
                };
                XianjianProxy.prototype.getTypeHintBySkill = function (type) {
                    var cfgArr = this.getXianjianCfgList(type, true);
                    for (var _i = 0, cfgArr_2 = cfgArr; _i < cfgArr_2.length; _i++) {
                        var cfg = cfgArr_2[_i];
                        if (this.getItemHintBySkill(cfg.index)) {
                            return true;
                        }
                    }
                    return false;
                };
                XianjianProxy.prototype.getItemHintBySkill = function (index) {
                    var info = this.getInfo(index);
                    if (!info) {
                        return false;
                    }
                    if (this.getSkillUp(index)) {
                        return true;
                    }
                    var cfgs = game.getConfigByNameId("jianfa.json" /* Jianfa */, index);
                    for (var k in cfgs) {
                        var cfg = cfgs[k];
                        if (this.getBuweiUp(index, cfg)) {
                            return true;
                        }
                    }
                    return false;
                };
                XianjianProxy.prototype.getSkillUp = function (index) {
                    var count = this.getCountByStage(index, this.getNextStage(index));
                    if (count >= 4) {
                        return true;
                    }
                    return false;
                };
                XianjianProxy.prototype.getBuweiUp = function (index, cfg) {
                    var nextCost = this.getBuweiNext({ index: index, pos: cfg.pos });
                    if (nextCost && nextCost.length) {
                        return mod.BagUtil.checkPropCnt(nextCost[0], nextCost[1]);
                    }
                    return false;
                };
                XianjianProxy.prototype.onUpdateHintByType = function (type) {
                    var roots = ["46" /* Surface */, "18" /* Xianjian */, "01" /* TabBtnType01 */, "0" + type];
                    var bool = this.getTypeHint(type);
                    mod.HintMgr.setHint(bool, roots);
                };
                XianjianProxy.prototype.getTypeHint = function (type) {
                    var cfgArr = this.getXianjianCfgList(type);
                    for (var _i = 0, cfgArr_3 = cfgArr; _i < cfgArr_3.length; _i++) {
                        var cfg = cfgArr_3[_i];
                        if (this.getItemHint(cfg.index)) {
                            return true;
                        }
                    }
                    return false;
                };
                XianjianProxy.prototype.getItemHint = function (index) {
                    if (this.canUpStar(index)) {
                        return true;
                    }
                    if (this.canUpJiban(index)) {
                        return true;
                    }
                    if (this.canUpLevel(index)) {
                        return true;
                    }
                    return false;
                };
                XianjianProxy.prototype.canUpJiban = function (index) {
                    var info = this.getInfo(index);
                    if (!info) {
                        return false;
                    }
                    var cfgArr = game.getConfigListByName("xianjian_jiban.json" /* XianjianJiban */);
                    var _loop_1 = function (cfg) {
                        if (cfg.partners.indexOf(index) == -1) {
                            return "continue";
                        }
                        var jiban = this_1.jibans.find(function (v) { return v.index == cfg.index; });
                        if (jiban && jiban.is_active_jiban) {
                            return { value: false };
                        }
                        if (!jiban || jiban.ride_index.indexOf(index) == -1) {
                            return { value: true };
                        }
                        if (jiban.ride_index.length == cfg.partners.length) {
                            return { value: true };
                        }
                    };
                    var this_1 = this;
                    for (var _i = 0, cfgArr_4 = cfgArr; _i < cfgArr_4.length; _i++) {
                        var cfg = cfgArr_4[_i];
                        var state_1 = _loop_1(cfg);
                        if (typeof state_1 === "object")
                            return state_1.value;
                    }
                    return false;
                };
                XianjianProxy.prototype.canUpLevel = function (index) {
                    var info = this.getInfo(index);
                    if (!info) {
                        return false;
                    }
                    var xianjian = game.getConfigByNameId("xianjian.json" /* Xianjian */, index);
                    var level = info.level + 1;
                    var cfgs = game.getConfigByNameId("xianjian_dengji.json" /* XianjianDengji */, xianjian.quality);
                    var cfg = cfgs[level];
                    var cost = cfg && cfg.star_consume || null;
                    if (this._model.costIndex.indexOf(cost[0][0]) == -1) {
                        this._model.costIndex.push(cost[0][0]);
                    }
                    if (cost && mod.BagUtil.checkPropCnt(cost[0][0], cost[0][1])) {
                        return true;
                    }
                    for (var i = 1; i <= 4; i++) {
                        if (level <= xianjian.skill_condition[i][1]) {
                            return false;
                        }
                        var lv = this.getSkillLv(index, i);
                        var cost_1 = this.getSkillCost(index, lv);
                        if (this._model.costIndex.indexOf(cost_1[0]) == -1) {
                            this._model.costIndex.push(cost_1[0]);
                        }
                        if (cost_1 && mod.BagUtil.checkPropCnt(cost_1[0], cost_1[1])) {
                            return true;
                        }
                        // let skillLevel = this.getSkillLv(index, i);
                        // let nextCfg: XianjianSkillCostConfig = getConfigByNameId(ConfigName.XianjianSkillCost, xianjian.quality);
                        // let nextCost: number[] = nextCfg.cost[skillLevel - 1];
                        // if (skillLevel && nextCfg && nextCost && BagUtil.checkPropCnt(nextCost[0], nextCost[1])) {
                        //     return true;
                        // }
                    }
                    return false;
                };
                XianjianProxy.prototype.canJibanAct = function (cfg) {
                    var info = this.jibans.find(function (v) {
                        return v.index == cfg.index;
                    });
                    if (!info || info.is_active_jiban) {
                        return false;
                    }
                    var infos = cfg.partners;
                    return infos.every(function (v) {
                        return info.ride_index.indexOf(v) > -1;
                    });
                };
                XianjianProxy.prototype.canUpStar = function (index) {
                    var headType = game.PropData.getPropParse(index, 1 /* Type */);
                    var info = this.getInfo(index);
                    var param = game.GameConfig.getParamConfigById("xianjian_max_star");
                    var maxStar = param && param.value || 5;
                    var star = info && info.star || 0;
                    if (star >= maxStar) {
                        return false;
                    }
                    var cfg = game.getConfigById(index);
                    var cost = cfg.material[star];
                    var idx = cost[0];
                    var costCnt = cost[1];
                    var curCnt = this.getStarPropCnt(headType, cfg.quality, idx, star);
                    if (curCnt >= costCnt) {
                        return true;
                    }
                    return false;
                };
                //外显品质，道具propIndex
                XianjianProxy.prototype.getStarPropCnt = function (headType, quality, propIndex, star) {
                    var curCnt = mod.BagUtil.getPropCntByIdx(propIndex);
                    if (!star) {
                        return curCnt;
                    }
                    var cfg = game.GameConfig.getParamConfigById(game.SurfaceConfigList[headType] + "_star_prop");
                    var infos = cfg && cfg.value ? cfg.value : [];
                    var idx = infos.length >= quality ? infos[quality - 1] : 0;
                    if (idx) {
                        curCnt += mod.BagUtil.getPropCntByIdx(idx);
                    }
                    return curCnt;
                };
                XianjianProxy.prototype.getListData = function (type, buwei) {
                    if (buwei === void 0) { buwei = false; }
                    var cfgList = this.getXianjianCfgList(type, buwei);
                    if (!cfgList || !cfgList.length) {
                        return null;
                    }
                    // let typeInfo = this._proxy.getTypeInfo(this._type);
                    var actOrUp = [];
                    var actedList = [];
                    var notAct = [];
                    for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                        var cfg = cfgList_1[_i];
                        // if (!cfg.show) {
                        //     continue;
                        // }
                        var info = this.getInfo(cfg.index);
                        // let isBattle = typeInfo && typeInfo.upindex && typeInfo.upindex == cfg.index;
                        var itemData = {
                            cfg: cfg,
                            showHint: this.getItemHint(cfg.index),
                            star: info && info.star || 0,
                            isSel: false
                        };
                        // if (isBattle) {
                        //     actOrUp.unshift(itemData);
                        // } else
                        if (this.canUpStar(cfg.index)) {
                            actOrUp.push(itemData);
                        }
                        else if (itemData.star) {
                            actedList.push(itemData);
                        }
                        else {
                            if (!cfg.show) {
                                continue;
                            }
                            notAct.push(itemData);
                        }
                    }
                    actOrUp.sort(this.defaultSort);
                    actedList.sort(this.defaultSort);
                    notAct.sort(this.defaultSort);
                    return actOrUp.concat(actedList, notAct);
                };
                XianjianProxy.prototype.defaultSort = function (a, b) {
                    if (a.cfg.quality == b.cfg.quality) {
                        return a.cfg.index - b.cfg.index;
                    }
                    return a.cfg.quality - b.cfg.quality;
                };
                XianjianProxy.prototype.onInitData = function () {
                    var cfgArr = game.getConfigListByName("xianjian.json" /* Xianjian */);
                    for (var _i = 0, cfgArr_5 = cfgArr; _i < cfgArr_5.length; _i++) {
                        var cfg = cfgArr_5[_i];
                        // let nums: number[] = [];
                        // if (this._model.starProps.has(cfg.type)) {
                        //     nums = this._model.starProps.get(cfg.type);
                        // }
                        for (var _a = 0, _b = cfg.material; _a < _b.length; _a++) {
                            var cost = _b[_a];
                            var prop = cost[0];
                            if (this._model.starProps.indexOf(prop) == -1) {
                                this._model.starProps.push(prop);
                                var indexs = [];
                                if (this._model.propToIndex.has(prop)) {
                                    indexs = this._model.propToIndex.get(prop);
                                }
                                if (indexs.indexOf(cfg.index) == -1) {
                                    indexs.push(cfg.index);
                                }
                                this._model.propToIndex.set(prop, indexs);
                            }
                        }
                        // this._model.starProps.set(cfg.type, nums);
                        this.setType(cfg);
                    }
                };
                XianjianProxy.prototype.setType = function (cfg) {
                    var info = this.getInfo(cfg.index);
                    if (!cfg.show && !info) {
                        var cost = cfg.material[info && info.star || 0];
                        if (!mod.BagUtil.checkPropCnt(cost[0], cost[1])) {
                            return;
                        }
                        if (this._model.types.indexOf(cfg.type) == -1) {
                            this._model.types.push(cfg.type);
                        }
                        return;
                    }
                    // if (this._model.types.indexOf(cfg.type) == -1) {
                    //     this._model.types.push(cfg.type);
                    // }
                    this.setBuweiTypes(cfg.index, cfg.type);
                    // let info = this.getInfo(cfg.index);
                    // if (info) {
                    //     this.setBuweiTypes(cfg.index, cfg.type);
                    // }
                    // let cost: number[] = cfg.material[info && info.star || 0];
                    // if (!BagUtil.checkPropCnt(cost[0], cost[1])) {
                    //     return;
                    // }
                    if (this._model.types.indexOf(cfg.type) == -1) {
                        this._model.types.push(cfg.type);
                    }
                };
                /**获取材料更新仙剑类型列表 */
                // private updateType(prop: number): void {
                //     let xianjians: number[] = this._model.propToIndex.get(prop);
                //     for (let xianjian of xianjians) {
                //         let cfg: XianjianConfig = getConfigByNameId(ConfigName.Xianjian, xianjian);
                //         let types: number[] = this.getTypes();
                //         if (types.indexOf(cfg.type) > -1) {
                //             continue;
                //         }
                //         let info = this.getInfo(cfg.index);
                //         if (info) {
                //             this.setBuweiTypes(cfg.type);
                //         }
                //         let cost: number[] = cfg.material[info && info.star || 0];
                //         if (!BagUtil.checkPropCnt(cost[0], cost[1])) {
                //             continue;
                //         }
                //         this._model.types.push(cfg.type);
                //     }
                // }
                XianjianProxy.prototype.getTypes = function () {
                    return this._model.types;
                };
                Object.defineProperty(XianjianProxy.prototype, "buwei_types", {
                    get: function () {
                        return this._model.buwei_types;
                    },
                    enumerable: true,
                    configurable: true
                });
                XianjianProxy.prototype.setBuweiTypes = function (index, type) {
                    var buwei = game.getConfigByNameId("jianfa.json" /* Jianfa */, index);
                    if (!buwei) {
                        return;
                    }
                    if (this.buwei_types.indexOf(type) == -1) {
                        this._model.buwei_types.push(type);
                    }
                };
                XianjianProxy.prototype.onBagUpdateByPropTypeAndSubType = function (n) {
                    var list = n.body;
                    for (var type in list) {
                        if ((+type) == 11 /* Surface */) {
                            this.onInitData();
                            this.onUpdateHint();
                        }
                        else if ((+type) == 15 /* XianjianBuwei */) {
                            this.onUpdateHintByBuwei();
                        }
                    }
                };
                XianjianProxy.prototype.onBagUpdateByBagType = function (n) {
                    var bagTypes = n.body;
                    if (bagTypes.indexOf(2 /* Material */) > -1) {
                        this.onUpdateHintByBuwei();
                    }
                };
                XianjianProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    for (var _i = 0, indexs_1 = indexs; _i < indexs_1.length; _i++) {
                        var index = indexs_1[_i];
                        if (this._model.costIndex.indexOf(index) > -1) {
                            this.onUpdateHint();
                            return;
                        }
                    }
                };
                return XianjianProxy;
            }(game.ProxyBase));
            surface.XianjianProxy = XianjianProxy;
            __reflect(XianjianProxy.prototype, "game.mod.surface.XianjianProxy", ["game.mod.IXianjianProxy", "base.IProxy"]);
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TouchEvent = egret.TouchEvent;
            var SkillTipsMdr = /** @class */ (function (_super) {
                __extends(SkillTipsMdr, _super);
                function SkillTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.SkillTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SkillTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                };
                SkillTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct);
                    this.onNt("surface_skill_update" /* SURFACE_SKILL_UPDATE */, this.onInfoUpdate, this);
                };
                SkillTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                SkillTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SkillTipsMdr.prototype.onClickAct = function () {
                    var condHandler = this._showArgs.condHandler;
                    var condRst = true; //其他激活条件
                    if (condHandler) {
                        condRst = condHandler.exec();
                    }
                    if (!condRst || !mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                        return;
                    }
                    var confirm = this._showArgs.confirm;
                    confirm && confirm.exec();
                };
                SkillTipsMdr.prototype.onInfoUpdate = function (n) {
                    var isAct = n.body;
                    this.updateAct(isAct);
                };
                SkillTipsMdr.prototype.updateView = function () {
                    var skillId = this._showArgs.skillId;
                    var isAct = this._showArgs.isAct;
                    this._view.skill.setData(skillId);
                    this.onUpdateItem();
                    this.updateAct(isAct);
                    this.onUpdateCost();
                };
                SkillTipsMdr.prototype.onUpdateItem = function () {
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, this._showArgs.skillId);
                    this._view.lab_name.text = cfg.name;
                    this._view.power.setPowerValue(cfg.powershow);
                    this._view.baseDescItem.updateShow(cfg.describe, game.getLanById("sp_tips1" /* sp_tips1 */));
                };
                SkillTipsMdr.prototype.onUpdateCost = function () {
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, this._showArgs.skillId);
                    this._cost = cfg.act_material[0];
                    this._view.icon.setData(this._cost);
                    this._view.icon.updateCostLab(this._cost);
                    this._view.btn_act.redPoint.visible = mod.BagUtil.checkPropCnt(this._cost[0], this._cost[1]);
                };
                SkillTipsMdr.prototype.updateAct = function (isAct) {
                    this._view.currentState = isAct ? "act" : "default";
                };
                return SkillTipsMdr;
            }(game.MdrBase));
            surface.SkillTipsMdr = SkillTipsMdr;
            __reflect(SkillTipsMdr.prototype, "game.mod.surface.SkillTipsMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var sys_attrs = msg.sys_attrs;
            var SurfaceSkillTipsMdr = /** @class */ (function (_super) {
                __extends(SurfaceSkillTipsMdr, _super);
                function SurfaceSkillTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", surface.SurfaceSkillTipsView);
                    _this._attrKeys = ["skill_add_damage" /* skill_add_damage */, "cd" /* cd */, "crit" /* crit */, "critval" /* critval */]; //显示的属性key
                    _this._huashenAttrKeys = ["skill_add_damage" /* skill_add_damage */, "theGod_addtime" /* theGod_addtime */]; //化神显示的属性key
                    _this._state = "default";
                    _this.isEasyHide = true;
                    return _this;
                }
                SurfaceSkillTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(190 /* Surface */);
                };
                SurfaceSkillTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("update_common_surface_attr" /* UPDATE_COMMON_SURFACE_ATTR */, this.onInfoUpdate, this);
                };
                SurfaceSkillTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.currentState = this._state;
                    this.initView();
                    this.initAttr();
                    this.reqSurfaceAttr();
                    this.updateAttr();
                    this.updateSkill();
                    this.updateDesc2();
                    this.updateDesc3();
                    this.onUpdateDesc2();
                };
                SurfaceSkillTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SurfaceSkillTipsMdr.prototype.onInfoUpdate = function (n) {
                    var attrs = n.body;
                    for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
                        var i = attrs_1[_i];
                        if (i.sys_id == this._openIdx) {
                            this.updateAttr(i);
                            break;
                        }
                    }
                };
                SurfaceSkillTipsMdr.prototype.reqSurfaceAttr = function () {
                    this._openIdx = this._proxy.getOpenIdx(this._proxy.headType);
                    mod.RoleUtil.getSurfaceAttr(this._openIdx);
                };
                //技能效果
                SurfaceSkillTipsMdr.prototype.initView = function () {
                    var skillId = this._showArgs.skillId;
                    var lv = this._showArgs.lv;
                    var showZero = this._showArgs.showZero;
                    this._view.skill.setData(skillId);
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                    if (!cfg) {
                        console.error("\u68C0\u67E5" + "battle_skill.json" /* Skill */ + "\u914D\u7F6E\u7F3A\u5C11\u7D22\u5F15" + skillId);
                    }
                    this._cfg = cfg;
                    this._view.lab_name.text = cfg.name;
                    var desc = game.TextUtil.getSkillDesc(cfg, lv, showZero);
                    this._view.baseDescItem.updateShow(desc, game.getLanById("sp_tips1" /* sp_tips1 */));
                };
                //技能属性
                SurfaceSkillTipsMdr.prototype.initAttr = function () {
                    this._attrs = new sys_attrs();
                    var attrKeys = this._proxy.headType == 409 /* Huashen */ ? this._huashenAttrKeys : this._attrKeys;
                    for (var _i = 0, attrKeys_1 = attrKeys; _i < attrKeys_1.length; _i++) {
                        var k = attrKeys_1[_i];
                        var val = k == "cd" /* cd */ ? this._cfg.cd : 0;
                        this._attrs[k] = val;
                    }
                };
                SurfaceSkillTipsMdr.prototype.updateAttr = function (attr) {
                    var replaceStr = [];
                    if (this._proxy.headType == 409 /* Huashen */) {
                        //化神的另外处理
                        replaceStr = [{ key: "skill_add_damage" /* skill_add_damage */, aStr: "变身伤害" }];
                    }
                    else {
                        var aStr = game.TextUtil.getAttrsText("crit" /* crit */);
                        var indexStr = game.SurfaceConfigList[this._proxy.headType] + "_tips";
                        aStr = game.getLanById(indexStr) + aStr;
                        replaceStr = [{ key: "crit" /* crit */, aStr: aStr }];
                    }
                    var infos = game.TextUtil.getSkillListDesc(this._attrs, attr, replaceStr);
                    this._view.skillAttrList.updateAttr(infos);
                };
                //天赋效果
                SurfaceSkillTipsMdr.prototype.updateSkill = function () {
                    var descList = [];
                    var skillList = this._proxy.getSurfaceSkillList(this._proxy.headType);
                    for (var _i = 0, skillList_1 = skillList; _i < skillList_1.length; _i++) {
                        var skillId = skillList_1[_i];
                        var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                        descList.push(cfg.describe);
                    }
                    this._view.baseDescList.visible = !!descList.length;
                    if (this._view.baseDescList.visible) {
                        this._view.baseDescList.updateShow(descList, game.getLanById("tianfu_tips1" /* tianfu_tips1 */));
                    }
                };
                //被动效果
                SurfaceSkillTipsMdr.prototype.updateDesc2 = function () {
                    var descList = [];
                    var datas = this._proxy.getSurfaceTypes(this._proxy.headType);
                    for (var _i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
                        var type = datas_1[_i];
                        var items = this._proxy.getSurfaceCfgList(this._proxy.headType, type);
                        for (var _a = 0, items_1 = items; _a < items_1.length; _a++) {
                            var i = items_1[_a];
                            var star = this._proxy.getSurfacePerStar(i.index);
                            if (!star) {
                                continue; //过滤未激活
                            }
                            if (!i.special_attr_id) {
                                continue;
                            }
                            var desc = i.name + "：" + this._proxy.getSpecialAttrDesc(i.index, i.special_attr_id);
                            descList.push(desc);
                        }
                    }
                    this._view.baseDescList2.visible = !!descList.length;
                    if (this._view.baseDescList2.visible) {
                        this._view.baseDescList2.updateShow(descList, game.getLanById("skill_tips2" /* skill_tips2 */));
                    }
                };
                //羁绊效果
                SurfaceSkillTipsMdr.prototype.updateDesc3 = function () {
                    var descList = [];
                    var items = this._proxy.getJibanCfgList(this._proxy.headType);
                    for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                        var i = items_2[_i];
                        if (!this._proxy.isJibanAct(this._proxy.headType, i.index)) {
                            continue; //过滤未激活
                        }
                        descList.push(i.desc);
                    }
                    this._view.baseDescList3.visible = !!descList.length;
                    if (this._view.baseDescList3.visible) {
                        this._view.baseDescList3.updateShow(descList, game.getLanById("jiban_tips3" /* jiban_tips3 */));
                    }
                };
                SurfaceSkillTipsMdr.prototype.onUpdateDesc2 = function () {
                    this._view.baseDescItem2.visible = false;
                };
                return SurfaceSkillTipsMdr;
            }(game.MdrBase));
            surface.SurfaceSkillTipsMdr = SurfaceSkillTipsMdr;
            __reflect(SurfaceSkillTipsMdr.prototype, "game.mod.surface.SurfaceSkillTipsMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TouchEvent = egret.TouchEvent;
            var Handler = base.Handler;
            var Tween = base.Tween;
            var LingChongMdr = /** @class */ (function (_super) {
                __extends(LingChongMdr, _super);
                function LingChongMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", surface.LingChongView);
                    _this._selIdx = 0;
                    /**灵宠类型*/
                    _this._type = 1;
                    /**页签类型*/
                    _this._littleType = 1;
                    return _this;
                }
                LingChongMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(192 /* Lingchong */);
                    this._view.list.itemRenderer = mod.AvatarItem;
                    this._view.list.dataProvider = this._listAvatar = new eui.ArrayCollection();
                    this._view.touchEnabled = false;
                };
                LingChongMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.power.btn_desc, TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.btn_award, TouchEvent.TOUCH_TAP, this.onClickAward, this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp, this);
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    this.onNt("ling_chong_info_update" /* LING_CHONG_INFO_UPDATE */, this.onUpdateInfo, this);
                    this.onNt("on_bag_update_by_prop_type_and_subtype" /* ON_BAG_UPDATE_BY_PROP_TYPE_AND_SUBTYPE */, this.onUpdateByBagPropType, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePowerView, this);
                };
                LingChongMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.special_attr.visible = this._type == 1;
                    this._view.gr_treasure.visible = this._type == 2;
                    this._view.btn_treasure.visible = this._type == 2;
                    this._view.btn_award.y = this._type == 1 ? 415 : 288;
                    this.updateListData();
                    this.updateView();
                };
                LingChongMdr.prototype.onUpdateInfo = function () {
                    var list = this.getListData();
                    this._listAvatar.replaceAll(list);
                    var size = list.length;
                    //下一个可以激活或升星的
                    var selIdx;
                    for (var i = 0; i < size; i++) {
                        var data = list[i];
                        if (!data || !data.cfg) {
                            continue;
                        }
                        var cfg = data.cfg;
                        if (this._proxy.canUpStar(cfg.index)) {
                            selIdx = i;
                            break;
                        }
                    }
                    if (selIdx != null) {
                        var curData = list[selIdx];
                        curData.isSel = true;
                        this._listAvatar.itemUpdated(curData);
                        this._curIndex = curData.cfg.index;
                        this._view.list.selectedIndex = this._selIdx = selIdx;
                    }
                    else {
                        var selIdx0 = 0;
                        for (var i = 0; i < size; i++) {
                            var data = list[i];
                            if (data && data.cfg && data.cfg.index == this._curIndex) {
                                data.isSel = true;
                                this._listAvatar.itemUpdated(data);
                                selIdx0 = i;
                                break;
                            }
                        }
                        this._view.list.selectedIndex = this._selIdx = selIdx0;
                        this.jumpSecondTab();
                    }
                    this.updateView();
                };
                //跳转到二级页签的其他页签
                LingChongMdr.prototype.jumpSecondTab = function () {
                };
                LingChongMdr.prototype.getListData = function () {
                    var type = this._type;
                    var littleType = this._littleType;
                    var cfgs = this._proxy.getConfigListByType(type, littleType);
                    if (!cfgs || !cfgs.length) {
                        DEBUG && console.error("\u7075\u5BA0\u914D\u7F6E\uFF0C\u6CA1\u6709\u5BF9\u5E94\u7C7B\u578B\u914D\u7F6E\uFF0C\u5927\u7C7B" + type + ", \u5C0F\u7C7B" + littleType);
                        return [];
                    }
                    var list = [];
                    var canActList = [];
                    var notActedList = [];
                    for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                        var cfg = cfgs_1[_i];
                        if (cfg.type != type || cfg.type_little != littleType || !cfg.show) {
                            continue;
                        }
                        var info = this._proxy.getInfo(cfg.index);
                        var item = {
                            cfg: cfg,
                            showHint: this._proxy.getSingleHint(cfg.index),
                            star: info ? info.star : 0,
                            isBattle: false,
                            isSel: false
                        };
                        if (this._proxy.canUpStar(cfg.index)) {
                            canActList.push(item);
                        }
                        else if (info && info.star) {
                            list.push(item);
                        }
                        else {
                            notActedList.push(item);
                        }
                    }
                    canActList.sort(this.sortFunc);
                    list.sort(this.sortFunc);
                    notActedList.sort(this.sortFunc);
                    list = canActList.concat(list, notActedList);
                    return list;
                };
                LingChongMdr.prototype.updateListData = function () {
                    var list = this.getListData();
                    this._listAvatar.replaceAll(list);
                    //默认第一个
                    if (list[0] && list[0].cfg) {
                        this._curIndex = list[0].cfg.index;
                    }
                    this._selIdx = 0;
                    var size = list.length;
                    for (var i = 0; i < size; i++) {
                        list[i].isSel = i == this._selIdx;
                    }
                    this._view.list.selectedIndex = this._selIdx;
                    this._view.scroller.viewport.scrollH = 0;
                };
                LingChongMdr.prototype.sortFunc = function (a, b) {
                    if (a.cfg.quality == b.cfg.quality) {
                        return a.cfg.index - b.cfg.index;
                    }
                    return a.cfg.quality - b.cfg.quality;
                };
                LingChongMdr.prototype.updatePowerView = function () {
                    var info = this._proxy.getInfo(this._curIndex);
                    var cfg = this._proxy.getConfig(this._curIndex);
                    this._view.power.btn_desc.visible = info && info.star > 0;
                    if (info && info.star) {
                        this._view.power.setPowerValue(info.attr && info.attr.showpower ? info.attr.showpower : 0);
                    }
                    else {
                        var attrId = cfg.active_attr[0];
                        var attr = mod.RoleUtil.getAttr(attrId);
                        this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
                    }
                };
                LingChongMdr.prototype.updateView = function () {
                    if (!this._curIndex) {
                        return;
                    }
                    this.updatePowerView();
                    var info = this._proxy.getInfo(this._curIndex);
                    this._view.starCom.updateStar(info && info.star || 0, this._proxy.getMaxStar());
                    var cfg = this._proxy.getConfig(this._curIndex);
                    this._view.nameItem.updateShow(cfg.name, cfg.quality);
                    if (!this._curEftIndex || this._curEftIndex != cfg.index) {
                        this.removeEffect(this._effIdx);
                        this._effIdx = this.addAnimate(cfg.index, this._view.gr_eft);
                        this._curEftIndex = cfg.index;
                    }
                    if (this._proxy.isMaxStar(this._curIndex)) {
                        this._view.btn_up.updateMaxStar();
                        this._view.btn_up.setHint(false);
                    }
                    else {
                        var curStar = info ? info.star + 1 : 1;
                        var tips = '';
                        var isAct = info && info.star;
                        if (isAct) {
                            var starPower = Math.floor((cfg.star_power[info.star - 1] || 0) / 100);
                            tips = game.getLanById("upstar" /* upstar */) + game.getLanById("showpower" /* showpower */) + "\n"
                                + game.TextUtil.addColor("+" + starPower + "%", 2330156 /* GREEN */);
                        }
                        this._view.btn_up.updateCost(cfg.cost[curStar - 1], !!isAct, tips);
                        var canUp = this._proxy.canUpStar(this._curIndex);
                        this._view.btn_up.setHint(canUp);
                        if (canUp) {
                            //请求所有升星的属性，为了升星弹窗属性展示
                            var cfg_1 = this._proxy.getConfig(this._curIndex);
                            mod.RoleUtil.getAttrList(cfg_1.active_attr);
                        }
                    }
                    this._view.btn_award.visible = info && info.star > 0 && info.state == 1;
                    this.updateAttrView();
                    this.updateTaskView();
                    this.updateBtnHint();
                };
                //属性
                LingChongMdr.prototype.updateAttrView = function () {
                    var cfg = this._proxy.getConfig(this._curIndex);
                    this._view.special_attr.updateDesc(cfg, 360);
                };
                //任务
                LingChongMdr.prototype.updateTaskView = function () {
                };
                LingChongMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this.removeEffect(this._effIdx);
                    this._curEftIndex = null;
                    this._view.scroller.stopAnimation();
                    Tween.remove(this._view.scroller);
                    this._curIndex = null;
                    this._selIdx = 0;
                };
                LingChongMdr.prototype.onClickAttr = function () {
                    var info = this._proxy.getInfo(this._curIndex);
                    mod.ViewMgr.getIns().showAttrTipsWithoutGod(game.getLanById("lingchong_tips5" /* lingchong_tips5 */), info ? info.attr : null, game.getLanById("xiandan_tips9" /* xiandan_tips9 */), 1);
                };
                LingChongMdr.prototype.onClickAward = function () {
                    var info = this._proxy.getInfo(this._curIndex);
                    var cfg = this._proxy.getConfig(this._curIndex);
                    mod.ViewMgr.getIns().showRewardTips(game.getLanById("lingchong_tips6" /* lingchong_tips6 */), cfg ? cfg.reward : [], info ? info.state : 0, Handler.alloc(this, this.onGetReward, [this._curIndex]));
                };
                LingChongMdr.prototype.onClickUp = function () {
                    if (!this._proxy.canUpStar(this._curIndex, true)) {
                        return;
                    }
                    this._proxy.c2s_lingchong_oper(this._curIndex, 1);
                };
                LingChongMdr.prototype.onGetReward = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    this._proxy.c2s_lingchong_oper(args[0], 2);
                };
                LingChongMdr.prototype.onClickList = function (e) {
                    if (!e || !e.item) {
                        return;
                    }
                    var data = e.item;
                    var list = this._listAvatar.source;
                    var preData = list[this._selIdx];
                    if (preData) {
                        preData.isSel = false;
                        this._listAvatar.itemUpdated(preData);
                    }
                    data.isSel = true;
                    this._listAvatar.itemUpdated(data);
                    this._selIdx = e.itemIndex;
                    this._curIndex = data.cfg.index;
                    this.updateView();
                };
                //激活礼包，宝藏红点
                LingChongMdr.prototype.updateBtnHint = function () {
                    if (this._view.btn_award.visible) {
                        this._view.btn_award.setHint(this._proxy.getRewardHint(this._curIndex));
                    }
                    if (this._view.btn_treasure.visible) {
                        this._view.btn_treasure.setHint(this._proxy.getTreasureHint(this._curIndex));
                    }
                };
                LingChongMdr.prototype.onUpdateByBagPropType = function (n) {
                    var list = n.body;
                    for (var type in list) {
                        if ((+type) == 11 /* Surface */) {
                            this.updateView(); //更新界面消耗道具以及按钮红点
                            this.onUpdateListHint(); //更新列表红点
                            break;
                        }
                    }
                };
                LingChongMdr.prototype.onUpdateListHint = function () {
                    var size = this._listAvatar.source.length;
                    for (var i = 0; i < size; i++) {
                        var data = this._listAvatar.source[i];
                        if (!data || !data.cfg) {
                            continue;
                        }
                        data.showHint = this._proxy.getSingleHint(data.cfg.index);
                        this._listAvatar.itemUpdated(data);
                    }
                };
                return LingChongMdr;
            }(game.EffectMdrBase));
            surface.LingChongMdr = LingChongMdr;
            __reflect(LingChongMdr.prototype, "game.mod.surface.LingChongMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var XianjianView = /** @class */ (function (_super) {
                __extends(XianjianView, _super);
                function XianjianView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.XianjianSkin";
                    return _this;
                }
                return XianjianView;
            }(eui.Component));
            surface.XianjianView = XianjianView;
            __reflect(XianjianView.prototype, "game.mod.surface.XianjianView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var XianjianModel = /** @class */ (function () {
                function XianjianModel() {
                    this.infos = new Map();
                    this.shangzhen = {};
                    this.types = [];
                    this.buwei_types = [];
                    this.jiban = [];
                    this.isAct = false;
                    /**升星消耗道具 */
                    // public starProps: Map<number, number[]> = new Map();
                    this.starProps = [];
                    /**根据道具获取index */
                    this.propToIndex = new Map();
                    this.costIndex = [];
                }
                return XianjianModel;
            }());
            surface.XianjianModel = XianjianModel;
            __reflect(XianjianModel.prototype, "game.mod.surface.XianjianModel");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var SurfaceMod = /** @class */ (function (_super) {
                __extends(SurfaceMod, _super);
                function SurfaceMod() {
                    return _super.call(this, "46" /* Surface */) || this;
                }
                SurfaceMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                SurfaceMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(190 /* Surface */, surface.SurfaceProxy);
                    this.regProxy(192 /* Lingchong */, surface.LingChongProxy);
                    this.regProxy(239 /* Xianjian */, surface.XianjianProxy);
                };
                SurfaceMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* SurfaceMain */, surface.SurfaceMainMdr);
                    this.regMdr("02" /* HorseMain */, surface.HorseMainMdr);
                    this.regMdr("03" /* SurfaceSkillTips */, surface.SurfaceSkillTipsMdr);
                    this.regMdr("05" /* SurfaceGiftMain */, surface.SurfaceGiftMainMdr);
                    this.regMdr("06" /* SurfacePillTips */, surface.SurfacePillTipsMdr);
                    this.regMdr("07" /* SkillTips */, surface.SkillTipsMdr);
                    this.regMdr("08" /* TianshenMain */, surface.TianshenMainMdr);
                    this.regMdr("09" /* TianshenEquip */, surface.TianshenEquipMdr);
                    this.regMdr("10" /* TianshenEquipTips */, surface.TianshenEquipTipsMdr);
                    this.regMdr("11" /* TianshenSuitTips */, surface.TianshenSuitTipsMdr);
                    this.regMdr("12" /* LingChongMain */, surface.LingChongMainMdr);
                    this.regMdr("13" /* LingChongTreasure */, surface.LingChongTreasureMdr);
                    this.regMdr("14" /* LingChongTask */, surface.LingChongTaskMdr);
                    this.regMdr("18" /* Xianjian */, surface.XianjianMainMdr);
                    this.regMdr("21" /* XianjianUp */, surface.XianjianUpMdr);
                    this.regMdr("20" /* XianjianChoose */, surface.XianjianChooseMdr);
                    this.regMdr("22" /* XianjianBuwei */, surface.XianjianBuweiTipsMdr);
                    this.regMdr("23" /* XianjianSkillTips */, surface.XianjianSkillTipsMdr);
                    this.regMdr("24" /* XianjianBattleSkillTips */, surface.XianjianBattleSkillTipsMdr);
                    this.regMdr("15" /* SurfaceTips */, surface.SurfaceTipsMdr);
                    this.regMdr("16" /* SurfaceUpTips */, surface.SurfaceUpTipsMdr);
                    this.regMdr("19" /* SurfaceUpTips2 */, surface.SurfaceUpTipsMdr2);
                    this.regMdr("17" /* SkillNormalTips */, surface.SkillNormalTipsMdr);
                };
                return SurfaceMod;
            }(game.ModBase));
            surface.SurfaceMod = SurfaceMod;
            __reflect(SurfaceMod.prototype, "game.mod.surface.SurfaceMod");
            gso.modCls.push(SurfaceMod);
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var SurfaceBaseView = /** @class */ (function (_super) {
                __extends(SurfaceBaseView, _super);
                function SurfaceBaseView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.SurfaceBaseSkin";
                    return _this;
                }
                return SurfaceBaseView;
            }(eui.Component));
            surface.SurfaceBaseView = SurfaceBaseView;
            __reflect(SurfaceBaseView.prototype, "game.mod.surface.SurfaceBaseView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var SurfaceGiftItemRender = /** @class */ (function (_super) {
                __extends(SurfaceGiftItemRender, _super);
                function SurfaceGiftItemRender() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._canBuy = false;
                    return _this;
                }
                SurfaceGiftItemRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                    this.btn_buy.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                    this._rewardList = new ArrayCollection();
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._rewardList;
                };
                SurfaceGiftItemRender.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this.btn_buy.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                SurfaceGiftItemRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var index = this.data.index;
                    var curStage = this._proxy.getSurfaceStage(this._proxy.headType);
                    var desc = game.StringUtil.substitute(game.getLanById(game.SurfaceConfigList[this._proxy.headType] + "_gift_tips"), [index])
                        + game.TextUtil.addColor("（" + curStage + "/" + index + "）", curStage >= index ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(desc);
                    var rewards = this.data[game.SurfaceConfigList[this._proxy.headType] + "_award"];
                    this._rewardList.source = rewards;
                    var hasBuy = this._proxy.hasGiftBuy(this._proxy.headType, index);
                    this._canBuy = curStage >= index;
                    this.btn_buy.visible = !hasBuy;
                    this.img_buy.visible = hasBuy;
                    if (this.btn_buy.visible) {
                        this._cost = this.data.award_buy[0];
                        this.btn_buy.setCost(this._cost);
                        this.btn_buy.redPoint.visible = this._canBuy && mod.BagUtil.checkPropCnt(this._cost[0], this._cost[1]);
                    }
                };
                SurfaceGiftItemRender.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    var index = this.data.index;
                    if (!this._canBuy) {
                        game.PromptBox.getIns().show(game.getLanById("jinjielibao_tips2" /* jinjielibao_tips2 */));
                        return;
                    }
                    if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                        return;
                    }
                    this._proxy.c2s_buy_reward(this._proxy.headType, index);
                };
                return SurfaceGiftItemRender;
            }(mod.BaseRenderer));
            surface.SurfaceGiftItemRender = SurfaceGiftItemRender;
            __reflect(SurfaceGiftItemRender.prototype, "game.mod.surface.SurfaceGiftItemRender");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var SurfacePillTipsView = /** @class */ (function (_super) {
                __extends(SurfacePillTipsView, _super);
                function SurfacePillTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.SurfacePillTipsSkin";
                    return _this;
                }
                return SurfacePillTipsView;
            }(eui.Component));
            surface.SurfacePillTipsView = SurfacePillTipsView;
            __reflect(SurfacePillTipsView.prototype, "game.mod.surface.SurfacePillTipsView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var SurfaceSkillTipsView = /** @class */ (function (_super) {
                __extends(SurfaceSkillTipsView, _super);
                function SurfaceSkillTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.SurfaceSkillTipsSkin";
                    return _this;
                }
                return SurfaceSkillTipsView;
            }(eui.Component));
            surface.SurfaceSkillTipsView = SurfaceSkillTipsView;
            __reflect(SurfaceSkillTipsView.prototype, "game.mod.surface.SurfaceSkillTipsView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var SurfaceTipsView = /** @class */ (function (_super) {
                __extends(SurfaceTipsView, _super);
                function SurfaceTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.SurfaceTipsSkin";
                    return _this;
                }
                return SurfaceTipsView;
            }(eui.Component));
            surface.SurfaceTipsView = SurfaceTipsView;
            __reflect(SurfaceTipsView.prototype, "game.mod.surface.SurfaceTipsView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var SurfaceUpTipsView = /** @class */ (function (_super) {
                __extends(SurfaceUpTipsView, _super);
                function SurfaceUpTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.SurfaceUpTipsSkin";
                    return _this;
                }
                return SurfaceUpTipsView;
            }(eui.Component));
            surface.SurfaceUpTipsView = SurfaceUpTipsView;
            __reflect(SurfaceUpTipsView.prototype, "game.mod.surface.SurfaceUpTipsView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var SurfaceUpTipsView2 = /** @class */ (function (_super) {
                __extends(SurfaceUpTipsView2, _super);
                function SurfaceUpTipsView2() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.SurfaceUpTipsSkin2";
                    return _this;
                }
                return SurfaceUpTipsView2;
            }(eui.Component));
            surface.SurfaceUpTipsView2 = SurfaceUpTipsView2;
            __reflect(SurfaceUpTipsView2.prototype, "game.mod.surface.SurfaceUpTipsView2");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var LingChongAwardBtn = /** @class */ (function (_super) {
                __extends(LingChongAwardBtn, _super);
                function LingChongAwardBtn() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LingChongAwardBtn.prototype.setTip = function (cnt) {
                    this.gr_tips.visible = cnt && cnt > 0;
                    this.lb_num.text = cnt + '';
                };
                return LingChongAwardBtn;
            }(mod.Btn));
            surface.LingChongAwardBtn = LingChongAwardBtn;
            __reflect(LingChongAwardBtn.prototype, "game.mod.surface.LingChongAwardBtn");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var LingChongTaskItem = /** @class */ (function (_super) {
                __extends(LingChongTaskItem, _super);
                function LingChongTaskItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.LingChongTaskItemSkin";
                    return _this;
                }
                LingChongTaskItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                };
                LingChongTaskItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                LingChongTaskItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(data[0]);
                    this.lb_time.textFlow = game.TextUtil.parseHtml(data[1]);
                };
                return LingChongTaskItem;
            }(mod.BaseListenerRenderer));
            surface.LingChongTaskItem = LingChongTaskItem;
            __reflect(LingChongTaskItem.prototype, "game.mod.surface.LingChongTaskItem");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var LingChongTaskView = /** @class */ (function (_super) {
                __extends(LingChongTaskView, _super);
                function LingChongTaskView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.LingChongTaskSkin";
                    return _this;
                }
                return LingChongTaskView;
            }(eui.Component));
            surface.LingChongTaskView = LingChongTaskView;
            __reflect(LingChongTaskView.prototype, "game.mod.surface.LingChongTaskView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var LingChongTreasureView = /** @class */ (function (_super) {
                __extends(LingChongTreasureView, _super);
                function LingChongTreasureView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.LingChongTreasureSkin";
                    return _this;
                }
                return LingChongTreasureView;
            }(eui.Component));
            surface.LingChongTreasureView = LingChongTreasureView;
            __reflect(LingChongTreasureView.prototype, "game.mod.surface.LingChongTreasureView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var LingChongView = /** @class */ (function (_super) {
                __extends(LingChongView, _super);
                function LingChongView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.LingChongSkin";
                    return _this;
                }
                return LingChongView;
            }(eui.Component));
            surface.LingChongView = LingChongView;
            __reflect(LingChongView.prototype, "game.mod.surface.LingChongView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TianshenEquipTipsView = /** @class */ (function (_super) {
                __extends(TianshenEquipTipsView, _super);
                function TianshenEquipTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.TianshenEquipTipsSkin";
                    return _this;
                }
                return TianshenEquipTipsView;
            }(eui.Component));
            surface.TianshenEquipTipsView = TianshenEquipTipsView;
            __reflect(TianshenEquipTipsView.prototype, "game.mod.surface.TianshenEquipTipsView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TianshenEquipView = /** @class */ (function (_super) {
                __extends(TianshenEquipView, _super);
                function TianshenEquipView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.TianshenEquipSkin";
                    return _this;
                }
                return TianshenEquipView;
            }(eui.Component));
            surface.TianshenEquipView = TianshenEquipView;
            __reflect(TianshenEquipView.prototype, "game.mod.surface.TianshenEquipView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TianshenSuitItem = /** @class */ (function (_super) {
                __extends(TianshenSuitItem, _super);
                function TianshenSuitItem() {
                    var _this = _super.call(this) || this;
                    _this.needHint = true;
                    _this.skinName = "skins.surface.TianshenSuitItemSkin";
                    return _this;
                }
                TianshenSuitItem.prototype.setData = function (info) {
                    this.data = info;
                    if (!this.data) {
                        return;
                    }
                    this.redPoint.visible = this.needHint && this.data.hint;
                    this.lab_cnt.text = this.data.step + "\u9636";
                    this.img_icon.source = "tianshentz_" + info.type;
                    var isActive = info.suit && !!info.suit.level;
                    this.img_lock.visible = !isActive;
                };
                return TianshenSuitItem;
            }(eui.Component));
            surface.TianshenSuitItem = TianshenSuitItem;
            __reflect(TianshenSuitItem.prototype, "game.mod.surface.TianshenSuitItem");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TianshenSuitTipsView = /** @class */ (function (_super) {
                __extends(TianshenSuitTipsView, _super);
                function TianshenSuitTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.TianshenSuitTipsSkin";
                    return _this;
                }
                return TianshenSuitTipsView;
            }(eui.Component));
            surface.TianshenSuitTipsView = TianshenSuitTipsView;
            __reflect(TianshenSuitTipsView.prototype, "game.mod.surface.TianshenSuitTipsView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TianshenTypeRender = /** @class */ (function (_super) {
                __extends(TianshenTypeRender, _super);
                function TianshenTypeRender() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.common.TianshenTypeSkin";
                    return _this;
                }
                TianshenTypeRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.img_icon.source = "tianshen_type_" + this.data.type;
                    this.img_qua.source = "tiansen_qua_" + this.data.type;
                    this.lab_num.text = "\uFF08" + this.data.reachCnt + "/" + 8 + "\uFF09";
                    this.redPoint.visible = this.data.hint;
                    this.img_gray.visible = !this.data.suitActive;
                    if (this.data.isSel != undefined) {
                        this.removeEft(); //移除选中特效
                        //防止刷新其他数据时影响到选中特效
                        if (this.data.isSel) {
                            //选中添加特效
                            this.addEftByParent("surface_sel" /* SurfaceSel */, this.grp_eft);
                        }
                    }
                };
                return TianshenTypeRender;
            }(mod.BaseRenderer));
            surface.TianshenTypeRender = TianshenTypeRender;
            __reflect(TianshenTypeRender.prototype, "game.mod.surface.TianshenTypeRender");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var XianjianBattleSkillItem = /** @class */ (function (_super) {
            __extends(XianjianBattleSkillItem, _super);
            function XianjianBattleSkillItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            XianjianBattleSkillItem.prototype.dataChanged = function () {
                if (!this.data) {
                    return;
                }
                if (this.data.skillId) {
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, this.data.skillId);
                    this.img_icon.source = cfg.icon;
                }
                if (this.data.showHint != undefined) {
                    this.redPoint.visible = this.data.showHint;
                }
                this.grp.visible = this.data.skillType && this.data.skillType.length > 0;
                this.img_buff.source = this.data.skillType;
            };
            /**单个技能外部调用*/
            XianjianBattleSkillItem.prototype.setData = function (skillId, skillType) {
                this.data = { skillId: skillId, skillType: skillType };
            };
            XianjianBattleSkillItem.prototype.setBg = function (img) {
                this.img_bg.source = img;
            };
            return XianjianBattleSkillItem;
        }(eui.ItemRenderer));
        mod.XianjianBattleSkillItem = XianjianBattleSkillItem;
        __reflect(XianjianBattleSkillItem.prototype, "game.mod.XianjianBattleSkillItem");
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var XianjianBuweiItem = /** @class */ (function (_super) {
                __extends(XianjianBuweiItem, _super);
                function XianjianBuweiItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XianjianBuweiItem.prototype.dataChanged = function () {
                    if (this.data.prop) {
                        this.propData = game.PropData.create(this.data.prop);
                        this.img_icon.source = game.ResUtil.getUiProp(this.propData.cfg.icon);
                    }
                    if (this.data.lv) {
                        this.lab_level.text = "" + this.data.lv;
                        this.currentState = "default";
                    }
                    else {
                        this.currentState = "lock";
                    }
                };
                XianjianBuweiItem.prototype.setData = function (prop, lv) {
                    this.data = { prop: prop, lv: lv };
                };
                return XianjianBuweiItem;
            }(eui.ItemRenderer));
            surface.XianjianBuweiItem = XianjianBuweiItem;
            __reflect(XianjianBuweiItem.prototype, "game.mod.surface.XianjianBuweiItem");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var XianjianBuweiTipsView = /** @class */ (function (_super) {
                __extends(XianjianBuweiTipsView, _super);
                // public gr_cost: eui.Group;
                // public icon_cost: game.mod.Icon;
                // public basePropGainList: game.mod.BasePropGainList;
                function XianjianBuweiTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.XianjianBuweiTipsSkin";
                    return _this;
                }
                return XianjianBuweiTipsView;
            }(eui.Component));
            surface.XianjianBuweiTipsView = XianjianBuweiTipsView;
            __reflect(XianjianBuweiTipsView.prototype, "game.mod.surface.XianjianBuweiTipsView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var XianjianChooseView = /** @class */ (function (_super) {
                __extends(XianjianChooseView, _super);
                function XianjianChooseView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.XianjianChooseSkin";
                    return _this;
                }
                return XianjianChooseView;
            }(eui.Component));
            surface.XianjianChooseView = XianjianChooseView;
            __reflect(XianjianChooseView.prototype, "game.mod.surface.XianjianChooseView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var XianjianGroupItem = /** @class */ (function (_super) {
                __extends(XianjianGroupItem, _super);
                function XianjianGroupItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XianjianGroupItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("46" /* Surface */).retProxy(239 /* Xianjian */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onClickAdd, this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_exchange, this.onClickAdd, this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.lab_jump, this.onClickVip, this);
                };
                XianjianGroupItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    // default lock action
                    // this.currentState = "";
                    this.removeAllEffects();
                    if (this.data.unlock_type == 1) {
                        var mine = mod.VipUtil.getShowVipLv();
                        var limit = mod.VipUtil.getShowVipLv(this.data.unlock_value);
                        var lock = mine < limit;
                        if (limit && lock) {
                            this.currentState = "lock";
                            this.lab_lock.text = "VIP" + limit + "\u89E3\u9501";
                            this.lab_limit.text = "VIP开启剑阵槽位";
                            this.lab_jump.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt("立即前往", 2330156 /* GREEN */));
                            return;
                        }
                    }
                    else if (this.data.unlock_type == 2) {
                        var lock = !mod.ViewMgr.getIns().checkPass(this.data.unlock_value);
                        if (this.data.unlock_value && lock) {
                            this.currentState = "lock";
                            this.lab_lock.text = "\u5173\u5361" + this.data.unlock_value + "\u89E3\u9501";
                            this.lab_limit.text = "关卡解锁剑阵槽位";
                            this.lab_jump.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt("立即前往", 2330156 /* GREEN */));
                            return;
                        }
                    }
                    var info = this._proxy.getShangzhen(this.data.pos);
                    if (!info || !info.index) {
                        this.currentState = "default";
                    }
                    else {
                        this.currentState = "action";
                        var cfg = game.getConfigByNameId("xianjian.json" /* Xianjian */, info.index);
                        this.addAnimate(cfg.index, this.grp_eff);
                        var skill = game.getConfigByNameId("battle_skill.json" /* Skill */, cfg.skill);
                        this.lab_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(cfg.name, game.ColorUtil.getColorByQuality1(cfg.quality)));
                        this.lab_tips.textFlow = game.TextUtil.parseHtml(skill.describe);
                    }
                };
                XianjianGroupItem.prototype.onClickAdd = function () {
                    if (this._proxy.countOfActive <= 0) {
                        game.PromptBox.getIns().show("没有激活的仙剑");
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("46" /* Surface */, "20" /* XianjianChoose */, this.data.pos);
                };
                XianjianGroupItem.prototype.onClickVip = function () {
                    if (this.data.unlock_type == 2) {
                        mod.ViewMgr.getIns().showSecondPop("42" /* Pass */, "01" /* PassMain */);
                        return;
                    }
                    if (mod.PayUtil.checkFirstCharge()) {
                        mod.ViewMgr.getIns().openVipView();
                    }
                    else {
                        mod.ViewMgr.getIns().showSecondPop("27" /* Activity */, "49" /* FirstCharge */);
                    }
                };
                return XianjianGroupItem;
            }(mod.BaseRenderer));
            surface.XianjianGroupItem = XianjianGroupItem;
            __reflect(XianjianGroupItem.prototype, "game.mod.surface.XianjianGroupItem");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var XianjianGroupView = /** @class */ (function (_super) {
                __extends(XianjianGroupView, _super);
                function XianjianGroupView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.XianjianGroupSkin";
                    return _this;
                }
                return XianjianGroupView;
            }(eui.Component));
            surface.XianjianGroupView = XianjianGroupView;
            __reflect(XianjianGroupView.prototype, "game.mod.surface.XianjianGroupView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var XianjianSkillItem = /** @class */ (function (_super) {
                __extends(XianjianSkillItem, _super);
                function XianjianSkillItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XianjianSkillItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    if (this.data.skillId) {
                        var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, this.data.skillId);
                        this.img_icon.source = cfg.icon;
                    }
                    if (this.data.showHint != undefined) {
                        this.redPoint.visible = this.data.showHint;
                    }
                    if (this.data.imgTag != undefined) {
                        this.img_tag.visible = true;
                        this.img_tag.source = this.data.imgTag;
                    }
                    this.img_lock.visible = !this.data.lv;
                    this.grp_lv.visible = !!this.data.lv || !this.data.hideTips; //显示等级
                    this.lab_lv.text = this.data.lv ? this.data.lv + "\u9636" : this.data.limit + "\u7EA7\u89E3\u9501";
                };
                /**单个技能外部调用*/
                XianjianSkillItem.prototype.setData = function (skillId, limit, lv) {
                    this.data = { skillId: skillId, lv: lv, limit: limit };
                };
                return XianjianSkillItem;
            }(eui.ItemRenderer));
            surface.XianjianSkillItem = XianjianSkillItem;
            __reflect(XianjianSkillItem.prototype, "game.mod.surface.XianjianSkillItem");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var XianjianSkillSuitComp = /** @class */ (function (_super) {
                __extends(XianjianSkillSuitComp, _super);
                function XianjianSkillSuitComp() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XianjianSkillSuitComp.prototype.updateView = function (index) {
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, index);
                    if (!cfg) {
                        this.lb_desc.text = this.lb_name.text = '';
                        this.img_icon.source = '';
                        return;
                    }
                    this.img_icon.source = cfg.icon;
                    this.lb_name.textFlow = game.TextUtil.parseHtml(cfg.name);
                    this.img_icongray.visible = false;
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(cfg.describe, 3496307 /* DEFAULT */));
                };
                return XianjianSkillSuitComp;
            }(eui.Component));
            surface.XianjianSkillSuitComp = XianjianSkillSuitComp;
            __reflect(XianjianSkillSuitComp.prototype, "game.mod.surface.XianjianSkillSuitComp");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var XianjianSkillView = /** @class */ (function (_super) {
                __extends(XianjianSkillView, _super);
                function XianjianSkillView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.XianjianSkillSkin";
                    return _this;
                }
                return XianjianSkillView;
            }(eui.Component));
            surface.XianjianSkillView = XianjianSkillView;
            __reflect(XianjianSkillView.prototype, "game.mod.surface.XianjianSkillView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var XianjianUpView = /** @class */ (function (_super) {
                __extends(XianjianUpView, _super);
                function XianjianUpView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.surface.XianjianUpSkin";
                    return _this;
                }
                return XianjianUpView;
            }(eui.Component));
            surface.XianjianUpView = XianjianUpView;
            __reflect(XianjianUpView.prototype, "game.mod.surface.XianjianUpView");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var LingChongModel = /** @class */ (function () {
                function LingChongModel() {
                    /**灵宠列表，以及是否领取*/
                    this.list = {};
                    /**灵宠任务，{灵宠index: {任务index: lingchong_task_item}}*/
                    this.task_list = {};
                    /**灵宠Tab -> 灵宠secondTab hint*/
                    this.mainHintPath = ["46" /* Surface */, "12" /* LingChongMain */, "01" /* Lingchong */, "01" /* Lingchong */];
                    /**远古神兽Tab -> 四神兽secondTab hint*/
                    this.ygshHintPath1 = ["46" /* Surface */, "12" /* LingChongMain */, "02" /* Yuangushenshou */, "02" /* Sishenshou */];
                    /**远古神兽Tab -> 远古神兽secondTab hint*/
                    this.ygshHintPath2 = ["46" /* Surface */, "12" /* LingChongMain */, "02" /* Yuangushenshou */, "03" /* Yuangushenshou */];
                }
                return LingChongModel;
            }());
            surface.LingChongModel = LingChongModel;
            __reflect(LingChongModel.prototype, "game.mod.surface.LingChongModel");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var SkillNormalTipsMdr = /** @class */ (function (_super) {
                __extends(SkillNormalTipsMdr, _super);
                function SkillNormalTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.SkillNormalTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SkillNormalTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                };
                SkillNormalTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                SkillNormalTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                SkillNormalTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SkillNormalTipsMdr.prototype.updateView = function () {
                    var skillId = this._showArgs.skillId;
                    var lv = this._showArgs.lv;
                    var isXianfaSkill = this._showArgs.isXianfaSkill;
                    this._view.skill.setData(skillId);
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                    this._view.lab_name.text = cfg.name;
                    var typeStr = cfg.type2 == 1 /* Skill */ ? "jineng_show_type_4" : "jineng_show_type_2";
                    this._view.img_type.source = typeStr;
                    this._view.currentState = cfg.powershow ? "power" : "default";
                    if (cfg.powershow) {
                        this._view.power.setPowerValue(cfg.powershow);
                    }
                    if (lv) {
                        var descStr = "";
                        if (isXianfaSkill) {
                            var xianfaCfg = game.getConfigByNameId("xianfa_skill_init.json" /* XianfaSkillInit */, skillId);
                            descStr = game.StringUtil.substitute(xianfaCfg.describe, [game.TextUtil.addColor(xianfaCfg.skill_coefs / 100 + "", 2330156 /* GREEN */),
                                game.TextUtil.addColor(this.getLevelAttr(lv || 1, xianfaCfg.skill_quality) + "", 2330156 /* GREEN */)]);
                        }
                        else {
                            descStr = game.TextUtil.getSkillDesc(cfg, lv);
                        }
                        this._view.baseDescItem.updateShow(descStr, game.getLanById("sp_tips1" /* sp_tips1 */));
                    }
                    else {
                        this._view.baseDescItem.updateShow(cfg.describe, game.getLanById("sp_tips1" /* sp_tips1 */));
                    }
                };
                /**
                 * 等级属性
                 * @param xianfaLv
                 * @param quality 品质，1-4
                 * @returns
                 */
                SkillNormalTipsMdr.prototype.getLevelAttr = function (xianfaLv, quality) {
                    var cfg = this.getXianfaLevelCfg(xianfaLv);
                    return (quality >= 1 && quality <= cfg.level_value.length) ? cfg.level_value[quality - 1] : cfg.level_value[0];
                };
                SkillNormalTipsMdr.prototype.getXianfaLevelCfg = function (xianfaLv) {
                    var cfg = game.getConfigByNameId("xianfa_skill_level.json" /* XianfaSkillLevel */, xianfaLv);
                    return cfg;
                };
                return SkillNormalTipsMdr;
            }(game.MdrBase));
            surface.SkillNormalTipsMdr = SkillNormalTipsMdr;
            __reflect(SkillNormalTipsMdr.prototype, "game.mod.surface.SkillNormalTipsMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var c2s_lingchong_oper = msg.c2s_lingchong_oper;
            var s2c_lingchong_item = msg.s2c_lingchong_item;
            var c2s_lingchong_get_task_reward = msg.c2s_lingchong_get_task_reward;
            var s2c_lingchong_task_list = msg.s2c_lingchong_task_list;
            /**
             * @description 灵宠系统
             */
            var LingChongProxy = /** @class */ (function (_super) {
                __extends(LingChongProxy, _super);
                function LingChongProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._actList = []; //请求激活的灵宠index
                    /**================================= config =================================*/
                    /**灵宠配置，根据类型分类*/
                    _this._cfgMap = {};
                    return _this;
                }
                Object.defineProperty(LingChongProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                LingChongProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new surface.LingChongModel();
                    this.onProto(s2c_lingchong_item, this.s2c_lingchong_item, this);
                    this.onProto(s2c_lingchong_task_list, this.s2c_lingchong_task_list, this);
                };
                /**
                 * 幻化激活/升星、领取激活礼包
                 * @param index
                 * @param oper 1为激活升星，2为领取激活礼包
                 */
                LingChongProxy.prototype.c2s_lingchong_oper = function (index, oper) {
                    var msg = new c2s_lingchong_oper();
                    msg.index = Long.fromNumber(index);
                    msg.oper = oper;
                    if (this._actList && this._actList.indexOf(index) < 0 && oper == 1) {
                        this._actList.push(index);
                    }
                    this.sendProto(msg);
                };
                LingChongProxy.prototype.s2c_lingchong_item = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.lingchong_list != null) {
                        var size = msg.lingchong_list.length;
                        var oldInfo = void 0;
                        var item = msg.lingchong_list[0]; //第一个
                        if (size == 1) {
                            oldInfo = this._model.list[item.index.toNumber()];
                        }
                        for (var _i = 0, _a = msg.lingchong_list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            var index = info.index.toNumber();
                            if (this._actList && this._actList.length && this._actList.indexOf(index) > -1) {
                                var isShowSurfaceTips = false;
                                //外显激活弹窗
                                if (info.star == 1) {
                                    isShowSurfaceTips = true;
                                    mod.ViewMgr.getIns().showSurfaceTips(index);
                                }
                                //升星成功弹窗
                                if (info.star != 0) {
                                    var cfg = this.getConfig(index);
                                    var curAttr = info.attr; //当前属性
                                    var lastAttr = mod.RoleUtil.getAttr(cfg.active_attr[info.star - 2]); //上一星的属性
                                    var curAttrAry = [];
                                    var lastAttrAry = [];
                                    var attrKeys = game.TextUtil.getAttrOrderKeys(curAttr);
                                    for (var _b = 0, attrKeys_2 = attrKeys; _b < attrKeys_2.length; _b++) {
                                        var key = attrKeys_2[_b];
                                        var curVal = curAttr[key] || 0;
                                        var lastVal = lastAttr && lastAttr[key] || 0;
                                        var name = game.TextUtil.getAttrsText(key);
                                        curAttrAry.push(game.TextUtil.addColor('+' + curVal, 8585074 /* GREEN */));
                                        lastAttrAry.push(name + ' ' + game.TextUtil.addColor('+' + lastVal, 8585074 /* GREEN */));
                                    }
                                    var upStarData = {
                                        star: info.star,
                                        attrDesc0: lastAttrAry.join('\n'),
                                        attrDesc1: curAttrAry.join('\n')
                                    };
                                    if (isShowSurfaceTips) {
                                        this._upStarData = upStarData;
                                    }
                                    else {
                                        this._upStarData = null;
                                        mod.ViewMgr.getIns().showUpStarTips(upStarData);
                                    }
                                }
                                this._actList.splice(this._actList.indexOf(index), 1);
                            }
                            this._model.list[info.index.toNumber()] = info;
                        }
                        var newInfo = this._model.list[item.index.toNumber()];
                        if (oldInfo && newInfo && oldInfo.state != 2 && newInfo.state == 2) {
                            //更新激活礼包状态
                            this.sendNt("update_base_reward_mdr_state" /* UPDATE_BASE_REWARD_MDR_STATE */, newInfo.state);
                        }
                    }
                    this.sendNt("ling_chong_info_update" /* LING_CHONG_INFO_UPDATE */);
                    this.updateHint();
                };
                LingChongProxy.prototype.onSurfaceTipsHide = function () {
                    if (this._upStarData) {
                        var data = mod.RoleUtil.clone(this._upStarData);
                        mod.ViewMgr.getIns().showUpStarTips(data);
                        this._upStarData = null;
                    }
                };
                /**
                 * 领取任务
                 * @param index 灵宠index
                 */
                LingChongProxy.prototype.c2s_lingchong_get_task_reward = function (index) {
                    var msg = new c2s_lingchong_get_task_reward();
                    msg.index = Long.fromNumber(index);
                    this.sendProto(msg);
                };
                LingChongProxy.prototype.s2c_lingchong_task_list = function (n) {
                    var msg = n.body;
                    if (msg.task_item != null) {
                        for (var _i = 0, _a = msg.task_item; _i < _a.length; _i++) {
                            var item = _a[_i];
                            var index = item.lingchong_id.toNumber();
                            if (!this._model.task_list[index]) {
                                this._model.task_list[index] = {};
                            }
                            this._model.task_list[index][item.task_index] = item;
                        }
                    }
                    this.updateHint();
                    this.sendNt("ling_chong_info_update" /* LING_CHONG_INFO_UPDATE */);
                };
                /**==========================================================================*/
                LingChongProxy.prototype.getInfo = function (index) {
                    return this._model.list[index];
                };
                LingChongProxy.prototype.isMaxStar = function (index) {
                    var cfg = this.getConfig(index);
                    var info = this.getInfo(index);
                    if (!cfg) {
                        return false;
                    }
                    return info && info.star >= cfg.cost.length;
                };
                LingChongProxy.prototype.canUpStar = function (index, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isMaxStar(index)) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u5DF2\u8FBE\u6700\u5927\u661F\u7EA7");
                        }
                        return false;
                    }
                    var cfg = this.getConfig(index);
                    if (!cfg || !cfg.cost) {
                        return false;
                    }
                    var info = this.getInfo(index);
                    var curStar = info ? info.star + 1 : 1; //当前星级
                    var cost = cfg.cost[curStar - 1];
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                LingChongProxy.prototype.isActed = function (index) {
                    var info = this.getInfo(index);
                    return info && info.star > 0;
                };
                LingChongProxy.prototype.getTaskInfo = function (index) {
                    return this._model.task_list[index];
                };
                /**灵宠对应的所有任务可领取次数叠加*/
                LingChongProxy.prototype.getTreasureReceiveCnt = function (index) {
                    var taskInfo = this.getTaskInfo(index);
                    if (!taskInfo) {
                        return 0;
                    }
                    var cnt = 0;
                    for (var taskId in taskInfo) {
                        var taskCfg = this.getTaskConfig(+taskId);
                        if (!taskCfg) {
                            continue;
                        }
                        cnt += Math.floor(taskInfo[taskId].step / taskCfg.target);
                    }
                    return cnt;
                };
                LingChongProxy.prototype.getConfigListByType = function (type, littleType) {
                    if (this._cfgMap[type] && this._cfgMap[type][littleType]) {
                        return this._cfgMap[type][littleType];
                    }
                    this._cfgMap = {};
                    var cfgs = game.getConfigListByName("xianchong.json" /* Lingchong */);
                    for (var _i = 0, cfgs_2 = cfgs; _i < cfgs_2.length; _i++) {
                        var cfg = cfgs_2[_i];
                        if (!cfg || !cfg.show) {
                            continue;
                        }
                        if (!this._cfgMap[cfg.type]) {
                            this._cfgMap[cfg.type] = {};
                        }
                        if (!this._cfgMap[cfg.type][cfg.type_little]) {
                            this._cfgMap[cfg.type][cfg.type_little] = [];
                        }
                        this._cfgMap[cfg.type][cfg.type_little].push(cfg);
                    }
                    return this._cfgMap[type][littleType] || [];
                };
                LingChongProxy.prototype.getConfig = function (index) {
                    return game.getConfigByNameId("xianchong.json" /* Lingchong */, index);
                };
                LingChongProxy.prototype.getTaskConfig = function (index) {
                    return game.getConfigByNameId("repetition_task.json" /* RepetitionTask */, index);
                };
                LingChongProxy.prototype.getMaxStar = function (index) {
                    if (this._maxStar) {
                        return this._maxStar;
                    }
                    var cfg = this.getConfig(index);
                    this._maxStar = cfg && cfg.cost ? cfg.cost.length : 5;
                    return this._maxStar;
                };
                /**================================= hint =================================*/
                /**激活礼包*/
                LingChongProxy.prototype.getRewardHint = function (index) {
                    var info = this.getInfo(index);
                    return info && info.state == 1;
                };
                /**远古神兽的宝藏红点*/
                LingChongProxy.prototype.getTreasureHint = function (index) {
                    var cfg = this.getConfig(index);
                    if (!cfg || cfg.type != 2) {
                        return false;
                    }
                    var info = this.getInfo(index);
                    if (!info || !info.star) {
                        return false;
                    }
                    var cnt = this.getTreasureReceiveCnt(index);
                    return cnt > 0;
                };
                /**单个灵宠红点：激活和升星，激活礼包，宝藏*/
                LingChongProxy.prototype.getSingleHint = function (index) {
                    return this.getRewardHint(index) || this.canUpStar(index)
                        || this.getTreasureHint(index);
                };
                /**1:灵宠  2:远古神兽*/
                LingChongProxy.prototype.getHintByType = function (type, littleType) {
                    var cfgs = this.getConfigListByType(type, littleType);
                    if (!cfgs || !cfgs.length) {
                        return false;
                    }
                    for (var _i = 0, cfgs_3 = cfgs; _i < cfgs_3.length; _i++) {
                        var cfg = cfgs_3[_i];
                        if (this.getSingleHint(cfg.index)) {
                            return true;
                        }
                    }
                    return false;
                };
                //激活，升星红点
                LingChongProxy.prototype.getActOrUpHintByType = function (type, littleType) {
                    var cfgs = this.getConfigListByType(type, littleType);
                    if (!cfgs || !cfgs.length) {
                        return false;
                    }
                    for (var _i = 0, cfgs_4 = cfgs; _i < cfgs_4.length; _i++) {
                        var cfg = cfgs_4[_i];
                        if (this.canUpStar(cfg.index)) {
                            return true;
                        }
                    }
                    return false;
                };
                LingChongProxy.prototype.updateHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670105 /* Lingchong */)) {
                        return;
                    }
                    mod.HintMgr.setHint(this.getHintByType(1, 1), this._model.mainHintPath);
                    mod.HintMgr.setHint(this.getHintByType(2, 1), this._model.ygshHintPath1);
                    mod.HintMgr.setHint(this.getHintByType(2, 2), this._model.ygshHintPath2);
                };
                /**碎片更新*/
                LingChongProxy.prototype.onBagUpdateByPropTypeAndSubType = function (n) {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670105 /* Lingchong */)) {
                        return;
                    }
                    var list = n.body;
                    for (var type in list) {
                        if ((+type) == 11 /* Surface */) {
                            this.updateHint();
                            break;
                        }
                    }
                };
                return LingChongProxy;
            }(game.ProxyBase));
            surface.LingChongProxy = LingChongProxy;
            __reflect(LingChongProxy.prototype, "game.mod.surface.LingChongProxy", ["game.mod.ILingChongProxy", "base.IProxy"]);
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TouchEvent = egret.TouchEvent;
            var Handler = base.Handler;
            var SurfaceBaseMdr = /** @class */ (function (_super) {
                __extends(SurfaceBaseMdr, _super);
                function SurfaceBaseMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", surface.SurfaceBaseView);
                    _this._headTypes = [360 /* Horse */, 640 /* Tianshen */, 361 /* Lingchong */, 408 /* Xianjian */]; //外显列表
                    return _this;
                }
                SurfaceBaseMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(190 /* Surface */);
                };
                SurfaceBaseMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_horse, TouchEvent.TOUCH_TAP, this.onClickHorse);
                    addEventListener(this._view.btn_tianshen, TouchEvent.TOUCH_TAP, this.onClickTianshen);
                    addEventListener(this._view.btn_lingchong, TouchEvent.TOUCH_TAP, this.onClickLingChong);
                    addEventListener(this._view.btn_xianjian, TouchEvent.TOUCH_TAP, this.onClickXianjian);
                    this.onNt("on_update_punshlist_type" /* ON_UPDATE_PUNSHLIST_TYPE */, this.onUpdateBtn, this);
                };
                SurfaceBaseMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateModel();
                    this.updateHint();
                    this.onUpdateBtn();
                    this.showGuide();
                };
                SurfaceBaseMdr.prototype.onHide = function () {
                    mod.GuideMgr.getIns().clear(33 /* YulingHorse */); //清除指引
                    _super.prototype.onHide.call(this);
                };
                SurfaceBaseMdr.prototype.onUpdateBtn = function () {
                    var type = game.ActivityUtil.getType();
                    var open = game.ActivityUtil.checkOpen();
                    this._view.img_tag1.visible = type == 2005 /* Zuoqi */ && open;
                    this._view.img_tag3.visible = type == 2010 /* Yuanling */ && open;
                };
                SurfaceBaseMdr.prototype.onClickHorse = function () {
                    //点击坐骑
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670104 /* Horse */, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showView("46" /* Surface */, "02" /* HorseMain */);
                };
                SurfaceBaseMdr.prototype.onClickTianshen = function () {
                    //点击元灵
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670106 /* Tianshen */, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showView("46" /* Surface */, "08" /* TianshenMain */);
                };
                //灵宠
                SurfaceBaseMdr.prototype.onClickLingChong = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670105 /* Lingchong */, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showView("46" /* Surface */, "12" /* LingChongMain */);
                };
                SurfaceBaseMdr.prototype.onClickXianjian = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670201 /* Xianjian */, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showView("46" /* Surface */, "18" /* Xianjian */);
                };
                SurfaceBaseMdr.prototype.updateModel = function () {
                    //显示坐骑模型
                    for (var i = 0; i < this._headTypes.length; ++i) {
                        var type = this._headTypes[i];
                        var index = this._proxy.getSurfaceId(type) || this._proxy.getDefaultId(type);
                        if (!index) {
                            continue;
                        }
                        this.addAnimate(index, this._view["grp_eff" + (i + 1)]);
                    }
                };
                SurfaceBaseMdr.prototype.updateHint = function () {
                    this._view.redPoint1.visible = mod.HintMgr.getHint(["46" /* Surface */, "02" /* HorseMain */]);
                    this._view.redPoint2.visible = mod.HintMgr.getHint(["46" /* Surface */, "08" /* TianshenMain */]);
                    this._view.redPoint3.visible = mod.HintMgr.getHint(["46" /* Surface */, "12" /* LingChongMain */]);
                    this._view.redPoint4.visible = mod.HintMgr.getHint(["46" /* Surface */, "18" /* Xianjian */]);
                };
                //-------------------------------------指引相关------------------------------------------------
                SurfaceBaseMdr.prototype.showGuide = function () {
                    mod.GuideMgr.getIns().show(33 /* YulingHorse */, this._view.grp_horse, Handler.alloc(this, this.onClickHorse)); //任务指引
                };
                return SurfaceBaseMdr;
            }(game.EffectMdrBase));
            surface.SurfaceBaseMdr = SurfaceBaseMdr;
            __reflect(SurfaceBaseMdr.prototype, "game.mod.surface.SurfaceBaseMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var SurfaceGiftMainMdr = /** @class */ (function (_super) {
                __extends(SurfaceGiftMainMdr, _super);
                function SurfaceGiftMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Gift */,
                            icon: "horse_tab",
                            mdr: surface.SurfaceGiftMdr,
                            title: "jinjielibao_tips" /* jinjielibao_tips */,
                            bg: "p1_del_bg",
                            hintTypes: ["46" /* Surface */, "02" /* HorseMain */, "01" /* Horse */, "33" /* HorseGift */],
                        }
                    ];
                    return _this;
                }
                SurfaceGiftMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(190 /* Surface */);
                };
                SurfaceGiftMainMdr.prototype.onShow = function () {
                    if (this._showArgs) {
                        var type = void 0;
                        if (Array.isArray(this._showArgs)) {
                            type = this._showArgs.shift();
                        }
                        else {
                            type = this._showArgs;
                        }
                        this._proxy.headType = parseInt(type);
                    }
                    _super.prototype.onShow.call(this);
                };
                /**更新list数据*/
                SurfaceGiftMainMdr.prototype.updateBtnList = function () {
                    var list = [];
                    var mdrs = [];
                    for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                        var data = _a[_i];
                        if (data.openIdx && !mod.ViewMgr.getIns().checkBtnShow(data.openIdx)) {
                            continue;
                        }
                        //icon和hintTypes不一样
                        data.icon = game.SurfaceConfigList[this._proxy.headType] + "_tab";
                        data.hintTypes = this._proxy.getGiftHint(this._proxy.headType);
                        mdrs.push(data.mdr);
                        list.push(data);
                    }
                    this._btnList.source = list;
                    this._tab.mdrClsList = mdrs;
                };
                return SurfaceGiftMainMdr;
            }(mod.WndBaseMdr));
            surface.SurfaceGiftMainMdr = SurfaceGiftMainMdr;
            __reflect(SurfaceGiftMainMdr.prototype, "game.mod.surface.SurfaceGiftMainMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var ArrayCollection = eui.ArrayCollection;
            var SurfaceGiftMdr = /** @class */ (function (_super) {
                __extends(SurfaceGiftMdr, _super);
                function SurfaceGiftMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.SurfaceGiftView);
                    return _this;
                }
                SurfaceGiftMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(190 /* Surface */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = surface.SurfaceGiftItemRender;
                    this._view.list_item.dataProvider = this._itemList;
                };
                SurfaceGiftMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("surface_gift_info_update" /* SURFACE_GIFT_INFO_UPDATE */, this.updateItemList, this);
                };
                SurfaceGiftMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initView();
                    this.updateReward();
                    this.updateItemList();
                };
                SurfaceGiftMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                /**初始化显示不同的ui*/
                SurfaceGiftMdr.prototype.initView = function () {
                    this._view.img_bg.source = game.ResUtil.getUiJpg("jinjiehaoli_" + this._proxy.headType);
                };
                SurfaceGiftMdr.prototype.updateReward = function () {
                    var items = game.getConfigListByName("jinjiejiangli.json" /* Jinjiejiangli */);
                    var cfg = items[items.length - 1];
                    var rewards = cfg[game.SurfaceConfigList[this._proxy.headType] + "_award"];
                    this._view.icon.setData(rewards[0]);
                };
                SurfaceGiftMdr.prototype.updateItemList = function () {
                    var items = game.getConfigListByName("jinjiejiangli.json" /* Jinjiejiangli */);
                    var tmps = [];
                    for (var i = 0; i < items.length; ++i) {
                        var cfg = items[i];
                        var sort = i;
                        if (this._proxy.hasGiftBuy(this._proxy.headType, cfg.index)) {
                            sort += 10000;
                        }
                        tmps.push({ cfg: cfg, sort: sort });
                    }
                    tmps.sort(game.SortTools.sortByRort);
                    items = [];
                    for (var _i = 0, tmps_1 = tmps; _i < tmps_1.length; _i++) {
                        var i = tmps_1[_i];
                        items.push(i.cfg);
                    }
                    this._itemList.replaceAll(items);
                };
                return SurfaceGiftMdr;
            }(game.MdrBase));
            surface.SurfaceGiftMdr = SurfaceGiftMdr;
            __reflect(SurfaceGiftMdr.prototype, "game.mod.surface.SurfaceGiftMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var SurfaceMainMdr = /** @class */ (function (_super) {
                __extends(SurfaceMainMdr, _super);
                function SurfaceMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Main */,
                            icon: "surface_tab",
                            mdr: surface.SurfaceBaseMdr,
                            title: "yuling_tips" /* yuling_tips */,
                            bg: "yuling_bg",
                            hintTypes: ["46" /* Surface */],
                        }
                    ];
                    return _this;
                }
                return SurfaceMainMdr;
            }(mod.WndBaseMdr));
            surface.SurfaceMainMdr = SurfaceMainMdr;
            __reflect(SurfaceMainMdr.prototype, "game.mod.surface.SurfaceMainMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var ArrayCollection = eui.ArrayCollection;
            var SurfacePillTipsMdr = /** @class */ (function (_super) {
                __extends(SurfacePillTipsMdr, _super);
                function SurfacePillTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", surface.SurfacePillTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SurfacePillTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._attrList = new ArrayCollection();
                    this._view.list_attr.itemRenderer = mod.BaseZhuangshiItem;
                    this._view.list_attr.dataProvider = this._attrList;
                    this._proxy = this.retProxy(190 /* Surface */);
                };
                SurfacePillTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateAttr, this);
                };
                SurfacePillTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                    this.updateAttr();
                };
                SurfacePillTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SurfacePillTipsMdr.prototype.updateView = function () {
                    var selData = this._showArgs.selData;
                    var data = this._showArgs.data;
                    var cfg = selData.cfg;
                    var index = data[0];
                    this._propData = game.PropData.create(index);
                    this._view.basePropTips.updateShow(this._propData);
                    var maxCnt = selData.star ? data[1] : 0;
                    var useCnt = this._proxy.getPillUseCnt(cfg.index, index);
                    this._view.lab_cnt.text = game.getLanById("tundan_tips3" /* tundan_tips3 */) + "：" + useCnt + "/" + maxCnt;
                };
                SurfacePillTipsMdr.prototype.updateAttr = function () {
                    var selData = this._showArgs.selData;
                    var data = this._showArgs.data;
                    var cfg = selData.cfg;
                    var index = data[0];
                    var propCfg = this._propData.cfg;
                    var attrIndex = propCfg.param1[0][0];
                    var attr = mod.RoleUtil.getAttr(attrIndex);
                    if (!attr) {
                        return;
                    }
                    this._view.power.setPowerValue(attr.showpower);
                    this._view.baseAttrItem.updateShow(attr, true, game.getLanById("add_attr_tips" /* add_attr_tips */));
                    var desc = propCfg.desc + "\n" + game.TextUtil.addColor(game.StringUtil.substitute(game.getLanById("tundan_tips2" /* tundan_tips2 */), [cfg.name]), 4435385 /* DEFAULT */);
                    this._view.baseDescItem.updateShow(desc, game.getLanById("tundan_tips1" /* tundan_tips1 */));
                    var headType = game.PropData.getPropParse(cfg.index, 1 /* Type */);
                    var costList = this._proxy.getSurfacePillCostList(cfg.quality, headType, index);
                    var infos = [];
                    for (var i = 0; i < costList.length; ++i) {
                        var upStar = i + 1;
                        var costInfo = costList[i];
                        var cost = costInfo[1];
                        // let propType = PropData.propType(costInfo[0]);
                        var isAct = selData.star >= upStar;
                        var starStr = upStar + game.getLanById("soul2" /* soul2 */);
                        var costStr = "" + cost;
                        if (isAct) {
                            starStr = game.TextUtil.addColor(starStr, 8585074 /* GREEN */);
                            costStr = game.TextUtil.addColor(costStr, 8585074 /* GREEN */);
                        }
                        var desc_1 = starStr + "，" + game.getLanById("tundan_tips1" /* tundan_tips1 */) + costStr;
                        if (!isAct) {
                            desc_1 = game.TextUtil.addColor(desc_1 + "（" + selData.star + "/" + upStar + "）", 7835024 /* GRAY */);
                        }
                        infos.push(desc_1);
                    }
                    this._attrList.source = infos;
                };
                return SurfacePillTipsMdr;
            }(game.MdrBase));
            surface.SurfacePillTipsMdr = SurfacePillTipsMdr;
            __reflect(SurfacePillTipsMdr.prototype, "game.mod.surface.SurfacePillTipsMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var SurfaceModel = /** @class */ (function () {
                function SurfaceModel() {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
                    this.pillInfos = {}; //吞噬丹信息
                    this.surfaceInfos = {}; //外显信息
                    this.surfaceTypes = {}; //外显类型信息
                    this.surfaceCfgs = {}; //外显类型配置信息，comType=headType+type
                    this.battleFlag = false; //请求幻化标志
                    this.rewardList = [];
                    this.skillProps = {}; //外显技能激活道具
                    this.specialAttrInfos = {}; //特殊的属性信息
                    /**以下需要做类型映射*/
                    this.headTypes = [360 /* Horse */, 640 /* Tianshen */, 404 /* Wing */, 405 /* Body */, 403 /* Weapon */]; //礼包可购买刷新用
                    /**默认初始化外显id */
                    this.headTypeToDefaultId = (_a = {},
                        // [ConfigHead.Horse]: 360240001,//类型映射默认显示外显index
                        // [ConfigHead.Tianshen]: 640025002,//类型映射默认显示外显index
                        // [ConfigHead.Wing]: 404011001,
                        // [ConfigHead.Body]: 405011001,
                        // [ConfigHead.Weapon]: 403011001,
                        //通用的直接读配置
                        _a[361 /* Lingchong */] = 3610000101,
                        _a[408 /* Xianjian */] = 408011001,
                        _a);
                    /**功能开启id */
                    this.headTypeToOpenIdx = (_b = {},
                        _b[360 /* Horse */] = 1041670104 /* Horse */,
                        _b[640 /* Tianshen */] = 1041670106 /* Tianshen */,
                        _b[361 /* Lingchong */] = 1041670115 /* Yuanling */,
                        _b[405 /* Body */] = 1041670125 /* Body */,
                        _b[404 /* Wing */] = 1041670124 /* Wing */,
                        _b[403 /* Weapon */] = 1041670123 /* Weapon */,
                        _b[409 /* Huashen */] = 1041670202 /* Huashen */,
                        _b);
                    /** 根据headType获取ModName.Surface下的SurfaceViewType 用于点击模型跳转界面 */
                    this.headTypeToViewType = (_c = {},
                        _c[360 /* Horse */] = "02" /* HorseMain */,
                        _c[640 /* Tianshen */] = "08" /* TianshenMain */,
                        _c[361 /* Lingchong */] = "12" /* LingChongMain */,
                        _c);
                    this.headTypeToBtnType = (_d = {},
                        _d[360 /* Horse */] = "04" /* Horse */,
                        _d[640 /* Tianshen */] = "06" /* Tianshen */,
                        _d);
                    /**外显升级红点 */
                    this.upHints = (_e = {},
                        _e[360 /* Horse */] = ["46" /* Surface */, "02" /* HorseMain */, "01" /* Horse */, "30" /* HorseUp */],
                        _e[640 /* Tianshen */] = ["46" /* Surface */, "08" /* TianshenMain */, "01" /* Tianshen */, "40" /* TianshenUp */],
                        _e[404 /* Wing */] = ["06" /* Role */, "01" /* RoleMain */, "16" /* Wing */, "01" /* Wing */, "87" /* WingUp */],
                        _e[403 /* Weapon */] = ["06" /* Role */, "01" /* RoleMain */, "17" /* Weapon */, "01" /* Weapon */, "93" /* WeaponUp */],
                        // [ConfigHead.Body]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Body, BodyMainBtnType.Body, HintType.BodyUp],//升级红点
                        _e[409 /* Huashen */] = ["61" /* More */, "02" /* HuashenMain */, "01" /* Huashen */, "120" /* HuashenUp */],
                        _e);
                    this.upPropToHeadType = (_f = {},
                        _f[1450100042 /* Zuoqijinjiedan */] = 360 /* Horse */,
                        _f[1450100064 /* Yuanlingjinjiedan */] = 640 /* Tianshen */,
                        _f[1450100105 /* Shenbinjiedan */] = 403 /* Weapon */,
                        _f[1450100106 /* Yuyijinjiedan */] = 404 /* Wing */,
                        _f[1450100046 /* Huashenjinjiedan */] = 409 /* Huashen */,
                        _f);
                    this.subTypeToHeadType11 = (_g = {},
                        _g[1 /* Horse */] = 360 /* Horse */,
                        _g[2 /* Tianshen */] = 640 /* Tianshen */,
                        _g[6 /* Weapon */] = 403 /* Weapon */,
                        _g[7 /* Wing */] = 404 /* Wing */,
                        _g[8 /* Body */] = 405 /* Body */,
                        _g[9 /* Huashen */] = 409 /* Huashen */,
                        _g);
                    this.subTypeToHeadType17 = (_h = {},
                        _h[1 /* Horse */] = 360 /* Horse */,
                        _h[2 /* Tianshen */] = 640 /* Tianshen */,
                        _h[3 /* Wing */] = 404 /* Wing */,
                        _h[4 /* Weapon */] = 403 /* Weapon */,
                        _h[5 /* Body */] = 405 /* Body */,
                        _h[6 /* Huashen */] = 409 /* Huashen */,
                        _h);
                    this.subTypeToHeadType32 = (_j = {},
                        _j[1 /* Horse */] = 360 /* Horse */,
                        _j[3 /* Tianshen */] = 640 /* Tianshen */,
                        _j[5 /* Wing */] = 404 /* Wing */,
                        _j[7 /* Weapon */] = 403 /* Weapon */,
                        _j[6 /* Body */] = 405 /* Body */,
                        _j[9 /* Huashen */] = 409 /* Huashen */,
                        _j);
                    /**外显技能红点提示 */
                    this.skillHints = (_k = {},
                        _k[360 /* Horse */] = ["46" /* Surface */, "02" /* HorseMain */, "01" /* Horse */, "31" /* HorseSkill */],
                        _k[640 /* Tianshen */] = ["46" /* Surface */, "08" /* TianshenMain */, "01" /* Tianshen */, "41" /* TianshenSkill */],
                        _k[404 /* Wing */] = ["06" /* Role */, "01" /* RoleMain */, "16" /* Wing */, "01" /* Wing */, "88" /* WingSkill */],
                        _k[403 /* Weapon */] = ["06" /* Role */, "01" /* RoleMain */, "17" /* Weapon */, "01" /* Weapon */, "91" /* WeaponSkill */],
                        // [ConfigHead.Body]: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Body, BodyMainBtnType.Body, HintType.BodySkill],
                        _k[409 /* Huashen */] = ["61" /* More */, "02" /* HuashenMain */, "01" /* Huashen */, "121" /* HuashenSkill */],
                        _k);
                    this.jibanHints = (_l = {},
                        _l[360 /* Horse */] = ["46" /* Surface */, "02" /* HorseMain */, "01" /* Horse */, "32" /* HorseJiban */],
                        _l[640 /* Tianshen */] = ["46" /* Surface */, "08" /* TianshenMain */, "01" /* Tianshen */, "42" /* TianshenJiban */],
                        _l);
                    this.giftHints = (_m = {},
                        _m[360 /* Horse */] = ["46" /* Surface */, "02" /* HorseMain */, "01" /* Horse */, "33" /* HorseGift */],
                        _m[640 /* Tianshen */] = ["46" /* Surface */, "08" /* TianshenMain */, "01" /* Tianshen */, "43" /* TianshenGift */],
                        _m[404 /* Wing */] = ["06" /* Role */, "01" /* RoleMain */, "16" /* Wing */, "01" /* Wing */, "86" /* WingGift */],
                        _m[403 /* Weapon */] = ["06" /* Role */, "01" /* RoleMain */, "17" /* Weapon */, "01" /* Weapon */, "92" /* WeaponGift */],
                        _m);
                    this.actHints = (_o = {},
                        _o[360 /* Horse */] = ["46" /* Surface */, "02" /* HorseMain */, "02" /* HorseStar */, "34" /* HorseAct */],
                        _o[640 /* Tianshen */] = ["46" /* Surface */, "08" /* TianshenMain */, "02" /* TianshenStar */, "44" /* TianshenAct */],
                        _o[404 /* Wing */] = ["06" /* Role */, "01" /* RoleMain */, "16" /* Wing */, "02" /* WingStar */, "89" /* WingAct */],
                        _o[403 /* Weapon */] = ["06" /* Role */, "01" /* RoleMain */, "17" /* Weapon */, "02" /* WeaponStar */, "94" /* WeaponAct */],
                        _o[405 /* Body */] = ["06" /* Role */, "01" /* RoleMain */, "18" /* Body */, "02" /* BodyStar */, "99" /* BodyAct */],
                        _o[409 /* Huashen */] = ["61" /* More */, "02" /* HuashenMain */, "02" /* HuashenStar */, "122" /* HuashenAct */],
                        _o);
                    /**幻化界面 吞噬丹红点 */
                    this.pillHints = (_p = {},
                        _p[360 /* Horse */] = ["46" /* Surface */, "02" /* HorseMain */, "02" /* HorseStar */, "35" /* HorsePill */],
                        _p[640 /* Tianshen */] = ["46" /* Surface */, "08" /* TianshenMain */, "02" /* TianshenStar */, "45" /* TianshenPill */],
                        _p[404 /* Wing */] = ["06" /* Role */, "01" /* RoleMain */, "16" /* Wing */, "02" /* WingStar */, "90" /* WingPill */],
                        _p[403 /* Weapon */] = ["06" /* Role */, "01" /* RoleMain */, "17" /* Weapon */, "02" /* WeaponStar */, "95" /* WeaponPill */],
                        _p[405 /* Body */] = ["06" /* Role */, "01" /* RoleMain */, "18" /* Body */, "02" /* BodyStar */, "100" /* BodyPill */],
                        _p[409 /* Huashen */] = ["61" /* More */, "02" /* HuashenMain */, "02" /* HuashenStar */, "123" /* HuashenPill */],
                        _p);
                    /**功能主界面跳转幻化界面红点 */
                    this.starHint = (_q = {},
                        _q[404 /* Wing */] = ["06" /* Role */, "01" /* RoleMain */, "16" /* Wing */, "02" /* WingStar */],
                        _q[403 /* Weapon */] = ["06" /* Role */, "01" /* RoleMain */, "17" /* Weapon */, "02" /* WeaponStar */],
                        _q);
                    /**幻化跳转页签*/
                    this.starJumpData = (_r = {},
                        _r[404 /* Wing */] = "02" /* WingStar */,
                        _r[403 /* Weapon */] = "02" /* WeaponStar */,
                        _r);
                    /**上阵红点 */
                    this.battleHints = (_s = {},
                        _s[409 /* Huashen */] = ["61" /* More */, "02" /* HuashenMain */, "02" /* HuashenStar */, "04" /* HuashenBattleMain */, "01" /* TabBtnType01 */],
                        _s);
                    /************************** 元灵.装备 *************************/
                    this.yuanlinEqpInfo = {}; // 元灵装备信息
                    this.yuanlinSuitInfo = {}; // 元灵套装信息
                    this.yuanlinEquipPower = {}; // 元灵装备战力
                    this.yuanlinSuitPower = {}; // 元灵套装战力
                    this.yuanlinHint = ["46" /* Surface */, "08" /* TianshenMain */, "03" /* TianshenEquip */]; //元灵红点
                    this.yuanlinEqpOpeHint = ["46" /* Surface */, "08" /* TianshenMain */, "03" /* TianshenEquip */, "46" /* TianshenEqpOpe */]; //元灵装备激活、升阶红点
                    this.yuanlinSuitOpeHint = ["46" /* Surface */, "08" /* TianshenMain */, "03" /* TianshenEquip */, "47" /* TianshenSuitOpe */]; //元灵套装激活、升阶红点
                }
                return SurfaceModel;
            }());
            surface.SurfaceModel = SurfaceModel;
            __reflect(SurfaceModel.prototype, "game.mod.surface.SurfaceModel");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var Tween = base.Tween;
            var Sine = base.Sine;
            var Handler = base.Handler;
            var SurfaceTipsMdr = /** @class */ (function (_super) {
                __extends(SurfaceTipsMdr, _super);
                function SurfaceTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", surface.SurfaceTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SurfaceTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                };
                SurfaceTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                SurfaceTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.showTypeTween();
                    this.showNameTween();
                    this.showSrTween();
                    this.showEffect();
                    mod.ViewMgr.getIns().shakeUI(this._view);
                    this._triggerGuide = this._showArgs.triggerGuide;
                };
                SurfaceTipsMdr.prototype.onHide = function () {
                    this.removeTypeTween();
                    this.removeNameTween();
                    this.removeSrTween();
                    mod.PropTipsMgr.getIns().closeSurface();
                    if (this._triggerGuide) {
                        mod.GuideMgr.getIns().triggerGuide(); //触发返回指引
                    }
                    Tween.remove(this._view);
                    this.sendNt("on_surface_tips_hide" /* ON_SURFACE_TIPS_HIDE */);
                    _super.prototype.onHide.call(this);
                };
                SurfaceTipsMdr.prototype.updateShow = function () {
                    var index = this._showArgs.index;
                    var prop = game.PropData.create(index); //外显作为道具
                    this._view.lab_name.textFlow = prop.getPropName(false);
                    this._view.img_type.source = "surface_type_" + prop.type;
                    this._view.img_quality.source = game.ResUtil.getSrQuality(prop.quality);
                    this.addAnimate(index, this._view.grp_eff);
                    if (prop.type == 408 /* Xianjian */) {
                        this._view.grp_eff.y = 650;
                    }
                };
                SurfaceTipsMdr.prototype.showTypeTween = function () {
                    var _this = this;
                    this.removeTypeTween();
                    this._view.grp_type.visible = false;
                    this._view.grp_type.scaleX = this._view.grp_type.scaleY = 0.1;
                    Tween.get(this._view.grp_type)
                        .delay(500)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp_type.visible = true;
                    }))
                        .to({ scaleX: 1, scaleY: 1 }, 300, null, Sine.easeIn);
                };
                SurfaceTipsMdr.prototype.removeTypeTween = function () {
                    Tween.remove(this._view.grp_type);
                };
                SurfaceTipsMdr.prototype.showNameTween = function () {
                    var _this = this;
                    this.removeNameTween();
                    this._view.grp_name.visible = false;
                    this._view.grp_name.y = 410;
                    Tween.get(this._view.grp_name)
                        .delay(500)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp_name.visible = true;
                    }))
                        .to({ y: 479 }, 300, null, Sine.easeIn);
                };
                SurfaceTipsMdr.prototype.removeNameTween = function () {
                    Tween.remove(this._view.grp_name);
                };
                SurfaceTipsMdr.prototype.showSrTween = function () {
                    var _this = this;
                    this.removeSrTween();
                    this._view.img_quality.visible = false;
                    this._view.img_quality.scaleX = this._view.img_quality.scaleY = 2;
                    Tween.get(this._view.img_quality)
                        .delay(500)
                        .exec(Handler.alloc(this, function () {
                        _this._view.img_quality.visible = true;
                    }))
                        .to({ scaleX: 1, scaleY: 1 }, 200, null, Sine.easeIn)
                        .delay(400)
                        .to({ scaleX: 1.5, scaleY: 1.5 }, 100, null, Sine.easeIn)
                        .to({ scaleX: 1, scaleY: 1 }, 100, null, Sine.easeIn);
                };
                SurfaceTipsMdr.prototype.removeSrTween = function () {
                    Tween.remove(this._view.img_quality);
                };
                SurfaceTipsMdr.prototype.showEffect = function () {
                    this.removeEft();
                    this.addEftByParent("jihuo" /* SurfaceTips */, this._view.grp_eft2, 0, 0, 0, null, 1, 2);
                };
                return SurfaceTipsMdr;
            }(game.EffectMdrBase));
            surface.SurfaceTipsMdr = SurfaceTipsMdr;
            __reflect(SurfaceTipsMdr.prototype, "game.mod.surface.SurfaceTipsMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var Tween = base.Tween;
            var Sine = base.Sine;
            var Handler = base.Handler;
            var SurfaceUpTipsMdr = /** @class */ (function (_super) {
                __extends(SurfaceUpTipsMdr, _super);
                function SurfaceUpTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", surface.SurfaceUpTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SurfaceUpTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                };
                SurfaceUpTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                SurfaceUpTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.showTitleTween();
                    this.showBgTween();
                    this.showGrpTween();
                    this.showDescTween();
                    this.showSkillTween();
                    this.showTipsTween();
                    this.showEffect();
                };
                SurfaceUpTipsMdr.prototype.onHide = function () {
                    this.removeTitleTween();
                    this.removeBgTween();
                    this.removeGrpTween();
                    this.removeDescTween();
                    this.removeSkillTween();
                    this.removeTipsTween();
                    _super.prototype.onHide.call(this);
                };
                SurfaceUpTipsMdr.prototype.updateShow = function () {
                    var skillId = this._showArgs.skillId;
                    var lv = this._showArgs.lv;
                    var lvDesc = this._showArgs.lvDesc;
                    var lastLv = lv - 1;
                    var lvStr = game.ResUtil.getChineseFontStr(lv) + "j";
                    var lastLvStr = game.ResUtil.getChineseFontStr(lastLv) + "j";
                    this.addBmpFont(lvStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv2);
                    this.addBmpFont(lastLvStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv1);
                    this._view.skill.setData(skillId);
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                    this._view.lab_name.text = cfg.name;
                    var desc = game.TextUtil.getSkillDesc(cfg, lv, false, lvDesc);
                    this._view.lab_desc.textFlow = game.TextUtil.parseHtml(desc);
                };
                SurfaceUpTipsMdr.prototype.showTitleTween = function () {
                    this._view.img_title.scaleX = this._view.img_title.scaleY = 7;
                    Tween.get(this._view.img_title)
                        .to({ scaleX: 1, scaleY: 1 }, 200);
                };
                SurfaceUpTipsMdr.prototype.removeTitleTween = function () {
                    Tween.remove(this._view.img_title);
                };
                SurfaceUpTipsMdr.prototype.showBgTween = function () {
                    var _this = this;
                    this._view.img_bg.visible = false;
                    this._view.img_bg.height = 0;
                    Tween.get(this._view.img_bg)
                        .delay(200)
                        .exec(Handler.alloc(this, function () {
                        _this._view.img_bg.visible = true;
                    }))
                        .to({ height: 400 }, 200, null, Sine.easeIn);
                };
                SurfaceUpTipsMdr.prototype.removeBgTween = function () {
                    Tween.remove(this._view.img_bg);
                };
                SurfaceUpTipsMdr.prototype.showGrpTween = function () {
                    var _this = this;
                    this._view.grp_show.visible = false;
                    this._view.grp_show.x = 0;
                    Tween.get(this._view.grp_show)
                        .delay(400)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp_show.visible = true;
                    }))
                        .to({ x: 175 }, 200, null, Sine.easeIn);
                };
                SurfaceUpTipsMdr.prototype.removeGrpTween = function () {
                    Tween.remove(this._view.grp_show);
                };
                SurfaceUpTipsMdr.prototype.showDescTween = function () {
                    var _this = this;
                    this._view.grp_desc.visible = false;
                    this._view.grp_desc.x = 0;
                    Tween.get(this._view.grp_desc)
                        .delay(600)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp_desc.visible = true;
                    }))
                        .to({ x: 244 }, 200, null, Sine.easeIn);
                };
                SurfaceUpTipsMdr.prototype.removeDescTween = function () {
                    Tween.remove(this._view.grp_desc);
                };
                SurfaceUpTipsMdr.prototype.showSkillTween = function () {
                    var _this = this;
                    this._view.skill.visible = false;
                    this._view.skill.scaleX = this._view.skill.scaleY = 3;
                    Tween.get(this._view.skill)
                        .delay(800)
                        .exec(Handler.alloc(this, function () {
                        _this._view.skill.visible = true;
                    }))
                        .to({ scaleX: 1, scaleY: 1 }, 200, null, Sine.easeIn);
                };
                SurfaceUpTipsMdr.prototype.removeSkillTween = function () {
                    Tween.remove(this._view.skill);
                };
                SurfaceUpTipsMdr.prototype.showTipsTween = function () {
                    var _this = this;
                    this._view.closeTips.visible = false;
                    Tween.get(this._view.closeTips)
                        .delay(1000)
                        .exec(Handler.alloc(this, function () {
                        _this._view.closeTips.visible = true;
                    }));
                };
                SurfaceUpTipsMdr.prototype.removeTipsTween = function () {
                    Tween.remove(this._view.closeTips);
                };
                SurfaceUpTipsMdr.prototype.showEffect = function () {
                    this.removeEft();
                    this.addEftByParent("success" /* Success */, this._view.grp_eft, 0, 0, 0, null, 1);
                    this.addEftByParent("tips_bg" /* TipsBg */, this._view.grp_eft2);
                };
                return SurfaceUpTipsMdr;
            }(game.EffectMdrBase));
            surface.SurfaceUpTipsMdr = SurfaceUpTipsMdr;
            __reflect(SurfaceUpTipsMdr.prototype, "game.mod.surface.SurfaceUpTipsMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var Tween = base.Tween;
            var Sine = base.Sine;
            var Handler = base.Handler;
            var SurfaceUpTipsMdr2 = /** @class */ (function (_super) {
                __extends(SurfaceUpTipsMdr2, _super);
                function SurfaceUpTipsMdr2() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", surface.SurfaceUpTipsView2);
                    _this.isEasyHide = true;
                    return _this;
                }
                SurfaceUpTipsMdr2.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                };
                SurfaceUpTipsMdr2.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                SurfaceUpTipsMdr2.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.showTitleTween();
                    this.showBgTween();
                    this.showGrpTween();
                    this.showDescTween(this._view.grp_desc1, 116);
                    this.showDescTween(this._view.grp_desc2, 398);
                    this.showSkillTween(this._view.skill1);
                    this.showSkillTween(this._view.skill2);
                    this.showTipsTween();
                    this.showEffect();
                };
                SurfaceUpTipsMdr2.prototype.onHide = function () {
                    this.removeTitleTween();
                    this.removeBgTween();
                    this.removeGrpTween();
                    this.removeDescTween();
                    this.removeSkillTween();
                    this.removeTipsTween();
                    _super.prototype.onHide.call(this);
                };
                SurfaceUpTipsMdr2.prototype.updateShow = function () {
                    var skillId = this._showArgs.skillId;
                    var lv = this._showArgs.lv;
                    var lvDesc = this._showArgs.lvDesc;
                    var lastLv = lv - 1;
                    var lvStr = game.ResUtil.getChineseFontStr(lv) + "j";
                    var lastLvStr = game.ResUtil.getChineseFontStr(lastLv) + "j";
                    this.addBmpFont(lvStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv2);
                    this.addBmpFont(lastLvStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv1);
                    this._view.lab_lv1.text = lastLv + game.getLanById("tishi_43" /* tishi_43 */);
                    this._view.lab_lv2.text = lv + game.getLanById("tishi_43" /* tishi_43 */);
                    this._view.skill1.setData(skillId);
                    this._view.skill2.setData(skillId);
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                    this._view.lab_name1.text = this._view.lab_name2.text = cfg.name;
                    var desc1 = game.TextUtil.getSkillDesc(cfg, lastLv, false, lvDesc);
                    this._view.lab_desc1.textFlow = game.TextUtil.parseHtml(desc1);
                    var desc2 = game.TextUtil.getSkillDesc(cfg, lv, false, lvDesc);
                    this._view.lab_desc2.textFlow = game.TextUtil.parseHtml(desc2);
                };
                SurfaceUpTipsMdr2.prototype.showTitleTween = function () {
                    this._view.img_title.scaleX = this._view.img_title.scaleY = 7;
                    Tween.get(this._view.img_title)
                        .to({ scaleX: 1, scaleY: 1 }, 200);
                };
                SurfaceUpTipsMdr2.prototype.removeTitleTween = function () {
                    Tween.remove(this._view.img_title);
                };
                SurfaceUpTipsMdr2.prototype.showBgTween = function () {
                    var _this = this;
                    this._view.img_bg.visible = false;
                    this._view.img_bg.height = 0;
                    Tween.get(this._view.img_bg)
                        .delay(200)
                        .exec(Handler.alloc(this, function () {
                        _this._view.img_bg.visible = true;
                    }))
                        .to({ height: 500 }, 200, null, Sine.easeIn);
                };
                SurfaceUpTipsMdr2.prototype.removeBgTween = function () {
                    Tween.remove(this._view.img_bg);
                };
                SurfaceUpTipsMdr2.prototype.showGrpTween = function () {
                    var _this = this;
                    this._view.grp_show.visible = false;
                    this._view.grp_show.x = 0;
                    Tween.get(this._view.grp_show)
                        .delay(400)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp_show.visible = true;
                    }))
                        .to({ x: 175 }, 200, null, Sine.easeIn);
                };
                SurfaceUpTipsMdr2.prototype.removeGrpTween = function () {
                    Tween.remove(this._view.grp_show);
                };
                SurfaceUpTipsMdr2.prototype.showDescTween = function (grp, posX) {
                    grp.visible = false;
                    grp.x = 0;
                    Tween.get(grp)
                        .delay(600)
                        .exec(Handler.alloc(this, function () {
                        grp.visible = true;
                    }))
                        .to({ x: posX }, 200, null, Sine.easeIn);
                };
                SurfaceUpTipsMdr2.prototype.removeDescTween = function () {
                    Tween.remove(this._view.grp_desc1);
                    Tween.remove(this._view.grp_desc2);
                };
                SurfaceUpTipsMdr2.prototype.showSkillTween = function (skill) {
                    skill.visible = false;
                    skill.scaleX = skill.scaleY = 3;
                    Tween.get(skill)
                        .delay(800)
                        .exec(Handler.alloc(this, function () {
                        skill.visible = true;
                    }))
                        .to({ scaleX: 1, scaleY: 1 }, 200, null, Sine.easeIn);
                };
                SurfaceUpTipsMdr2.prototype.removeSkillTween = function () {
                    Tween.remove(this._view.skill1);
                    Tween.remove(this._view.skill2);
                };
                SurfaceUpTipsMdr2.prototype.showTipsTween = function () {
                    var _this = this;
                    this._view.closeTips.visible = false;
                    Tween.get(this._view.closeTips)
                        .delay(1000)
                        .exec(Handler.alloc(this, function () {
                        _this._view.closeTips.visible = true;
                    }));
                };
                SurfaceUpTipsMdr2.prototype.removeTipsTween = function () {
                    Tween.remove(this._view.closeTips);
                };
                SurfaceUpTipsMdr2.prototype.showEffect = function () {
                    this.removeEft();
                    this.addEftByParent("success" /* Success */, this._view.grp_eft, 0, 0, 0, null, 1);
                    this.addEftByParent("tips_bg" /* TipsBg */, this._view.grp_eft2);
                };
                return SurfaceUpTipsMdr2;
            }(game.EffectMdrBase));
            surface.SurfaceUpTipsMdr2 = SurfaceUpTipsMdr2;
            __reflect(SurfaceUpTipsMdr2.prototype, "game.mod.surface.SurfaceUpTipsMdr2");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var HorseMainMdr = /** @class */ (function (_super) {
                __extends(HorseMainMdr, _super);
                function HorseMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Horse */,
                            icon: "horse_tab",
                            mdr: mod.SurfaceMdr,
                            title: "horse_tips" /* horse_tips */,
                            bg: "horse_bg",
                            hintTypes: ["46" /* Surface */, "02" /* HorseMain */, "01" /* Horse */],
                        },
                        {
                            btnType: "02" /* HorseStar */,
                            icon: "huanhua_tab",
                            mdr: mod.SurfaceStarMdr,
                            title: "horse_tips" /* horse_tips */,
                            hintTypes: ["46" /* Surface */, "02" /* HorseMain */, "02" /* HorseStar */],
                        }
                    ];
                    return _this;
                }
                HorseMainMdr.prototype.onShow = function () {
                    this._proxy = this.retProxy(190 /* Surface */);
                    this._proxy.headType = 360 /* Horse */;
                    _super.prototype.onShow.call(this);
                };
                /**默认选中的BtnType，可重写*/
                HorseMainMdr.prototype.getDefaultBtnType = function () {
                    if (this._proxy.getActHint(this._proxy.headType)) {
                        return "02" /* HorseStar */;
                    }
                    return "";
                };
                return HorseMainMdr;
            }(mod.WndBaseMdr));
            surface.HorseMainMdr = HorseMainMdr;
            __reflect(HorseMainMdr.prototype, "game.mod.surface.HorseMainMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var LingChongMainMdr = /** @class */ (function (_super) {
                __extends(LingChongMainMdr, _super);
                function LingChongMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Lingchong */,
                            icon: "lingchongtubiao",
                            mdr: surface.LingChongSecondMainMdr,
                            title: "lingchong_tips",
                            bg: "horse_bg",
                            hintTypes: ["46" /* Surface */, "12" /* LingChongMain */, "01" /* Lingchong */]
                        },
                        {
                            btnType: "02" /* Yuangushenshou */,
                            icon: "yuangushenshoutubiao",
                            mdr: surface.YuanGuShenShouSecondMdr,
                            title: "lingchong_tips2",
                            bg: "horse_bg",
                            hintTypes: ["46" /* Surface */, "12" /* LingChongMain */, "02" /* Yuangushenshou */]
                        }
                    ];
                    return _this;
                }
                return LingChongMainMdr;
            }(mod.WndBaseMdr));
            surface.LingChongMainMdr = LingChongMainMdr;
            __reflect(LingChongMainMdr.prototype, "game.mod.surface.LingChongMainMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var c2s_lianshendan_swal = msg.c2s_lianshendan_swal;
            var s2c_lianshendan_surface_info = msg.s2c_lianshendan_surface_info;
            var c2s_ride_oper_up = msg.c2s_ride_oper_up;
            var c2s_ride_oper_skill_active = msg.c2s_ride_oper_skill_active;
            var c2s_ride_oper_up_star = msg.c2s_ride_oper_up_star;
            var s2c_ride_info = msg.s2c_ride_info;
            var c2s_buy_reward = msg.c2s_buy_reward;
            var s2c_buy_reward_lisrt = msg.s2c_buy_reward_lisrt;
            var c2s_ride_oper_jiban = msg.c2s_ride_oper_jiban;
            var c2s_yuanling_equip_levelup = msg.c2s_yuanling_equip_levelup;
            var s2c_yuanling_equip_info = msg.s2c_yuanling_equip_info;
            var c2s_yuanling_equip_suit_levelup = msg.c2s_yuanling_equip_suit_levelup;
            var s2c_yuanling_equip_suit_info = msg.s2c_yuanling_equip_suit_info;
            var s2c_module_event_add_attr_info = msg.s2c_module_event_add_attr_info;
            var s2c_bethegod_time = msg.s2c_bethegod_time;
            var SurfaceProxy = /** @class */ (function (_super) {
                __extends(SurfaceProxy, _super);
                function SurfaceProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(SurfaceProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                SurfaceProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new surface.SurfaceModel();
                    this.onProto(s2c_lianshendan_surface_info, this.s2c_lianshendan_surface_info, this);
                    this.onProto(s2c_ride_info, this.s2c_ride_info, this);
                    this.onProto(s2c_buy_reward_lisrt, this.s2c_buy_reward_lisrt, this);
                    this.onProto(s2c_module_event_add_attr_info, this.s2c_module_event_add_attr_info, this);
                    this.onProto(s2c_yuanling_equip_info, this.s2c_yuanling_equip_info, this);
                    this.onProto(s2c_yuanling_equip_suit_info, this.s2c_yuanling_equip_suit_info, this);
                    this.onProto(s2c_bethegod_time, this.s2c_bethegod_time, this);
                };
                /******************************炼神丹*********************************/
                SurfaceProxy.prototype.s2c_lianshendan_surface_info = function (n) {
                    var msg = n.body;
                    if (!msg.datas) {
                        return;
                    }
                    var headTypes = []; //抛出表头
                    for (var _i = 0, _a = msg.datas; _i < _a.length; _i++) {
                        var info = _a[_i];
                        var index = info.surface_index;
                        var headType = game.PropData.getPropParse(index, 1 /* Type */);
                        if (headTypes.indexOf(headType) < 0) {
                            headTypes.push(headType);
                        }
                        var oldInfo = this._model.pillInfos[index];
                        if (!oldInfo) {
                            //不存在
                            this._model.pillInfos[index] = info.datas;
                            continue;
                        }
                        for (var k in info.datas) {
                            this._model.pillInfos[index][k] = info.datas[k];
                        }
                    }
                    for (var _b = 0, headTypes_1 = headTypes; _b < headTypes_1.length; _b++) {
                        var type = headTypes_1[_b];
                        this.updatePillHint(type);
                    }
                    this.sendNt("lianshendan_info_update" /* LIANSHENDAN_INFO_UPDATE */, headTypes);
                };
                /**使用炼神丹*/
                SurfaceProxy.prototype.c2s_lianshendan_swal = function (surfaceId, index) {
                    var msg = new c2s_lianshendan_swal();
                    msg.surface_index = surfaceId;
                    msg.index = index;
                    msg.oper_type = 2; //暂时用不到单次的
                    this.sendProto(msg);
                };
                /**外显炼神丹信息*/
                SurfaceProxy.prototype.getPillInfo = function (surfaceId) {
                    return this._model.pillInfos[surfaceId] || [];
                };
                /**炼神丹信息*/
                SurfaceProxy.prototype.getPillInfoByIndex = function (surfaceId, index) {
                    var infos = this.getPillInfo(surfaceId);
                    for (var _i = 0, infos_1 = infos; _i < infos_1.length; _i++) {
                        var i = infos_1[_i];
                        if (i.index == index) {
                            return i;
                        }
                    }
                    return null;
                };
                /**炼神丹使用数量*/
                SurfaceProxy.prototype.getPillUseCnt = function (surfaceId, index) {
                    var info = this.getPillInfoByIndex(surfaceId, index);
                    return info && info.swal_cnt ? info.swal_cnt : 0;
                };
                /**炼神丹使用属性*/
                SurfaceProxy.prototype.getPillAttr = function (surfaceId, index) {
                    var info = this.getPillInfoByIndex(surfaceId, index);
                    return info && info.attrs ? info.attrs : null;
                };
                /**外显是否可以使用炼神丹*/
                SurfaceProxy.prototype.canPillUse = function (surfaceId) {
                    var star = this.getSurfacePerStar(surfaceId);
                    if (!star) {
                        return false;
                    }
                    var cfg = game.getConfigById(surfaceId);
                    var headType = game.PropData.getPropParse(surfaceId, 1 /* Type */);
                    var infos = this.getSurfacePillCost(cfg.quality, star, headType);
                    for (var i = 0; i < infos.length; ++i) {
                        var info = infos[i];
                        var index = info[0];
                        var maxCnt = info[1];
                        var useCnt = this.getPillUseCnt(surfaceId, index);
                        var curCnt = mod.BagUtil.getPropCntByIdx(index);
                        var canUseCnt = Math.min(curCnt, maxCnt - useCnt);
                        if (canUseCnt > 0) {
                            return true;
                        }
                    }
                    return false;
                };
                /******************************外显系统*********************************/
                /**升级突破*/
                SurfaceProxy.prototype.c2s_ride_oper_up = function (oper, headType) {
                    var msg = new c2s_ride_oper_up();
                    msg.oper = oper; // 1:单次升级，2:一键升级
                    msg.head_type = headType;
                    this.sendProto(msg);
                };
                /**激活被动技能*/
                SurfaceProxy.prototype.c2s_ride_oper_skill_active = function (skillId, headType) {
                    var msg = new c2s_ride_oper_skill_active();
                    msg.skill_index = skillId;
                    msg.head_type = headType;
                    this.sendProto(msg);
                };
                /**幻化激活/升星*/
                SurfaceProxy.prototype.c2s_ride_oper_up_star = function (oper, surfaceId, headType, pos) {
                    var msg = new c2s_ride_oper_up_star();
                    msg.oper = oper;
                    msg.index = surfaceId;
                    msg.head_type = headType;
                    msg.pos = pos;
                    if (oper == 2 /* Battle */) {
                        this._model.battleFlag = true;
                    }
                    this.sendProto(msg);
                };
                SurfaceProxy.prototype.s2c_ride_info = function (n) {
                    var msg = n.body;
                    if (!msg.info) {
                        return;
                    }
                    var info = msg.info;
                    if (info.cur_ride && this._model.battleFlag) {
                        this._model.battleFlag = false;
                        game.PromptBox.getIns().show(game.getLanById("huanhua_chenggong" /* huanhua_chenggong */)); //幻化成功
                    }
                    var headType = info.head_type;
                    var oldInfo = this._model.surfaceInfos[headType];
                    if (!oldInfo) {
                        //不存在
                        this._model.surfaceInfos[headType] = info;
                    }
                    else {
                        var actIndex = void 0; //激活的外显index
                        var upStarIndex = void 0; //升星的外显index
                        var curStage = mod.SurfaceUtil.calcSurfaceStage(info.level, headType);
                        var oldStage = mod.SurfaceUtil.calcSurfaceStage(oldInfo.level, headType);
                        if (curStage > oldStage) {
                            var skillId = this.getSurfaceSkillId(headType);
                            mod.ViewMgr.getIns().showSurfaceUpTips(skillId, curStage); //进阶成功
                        }
                        if (info.ride_list) {
                            //激活外显弹窗
                            for (var _i = 0, _a = info.ride_list; _i < _a.length; _i++) {
                                var rideInfo = _a[_i];
                                var oldRideInfo = this.getSurfacePerInfo(rideInfo.index);
                                if ((!oldRideInfo || !oldRideInfo.star) && rideInfo.star) {
                                    /**激活成功弹窗*/
                                    mod.ViewMgr.getIns().showSurfaceTips(rideInfo.index);
                                    actIndex = rideInfo.index;
                                    break;
                                }
                                //升星成功弹窗
                                var oldRideStar = oldRideInfo && oldRideInfo.star || 0;
                                var curRideStar = rideInfo && rideInfo.star || 0;
                                if (curRideStar != oldRideStar) {
                                    upStarIndex = rideInfo.index;
                                    break;
                                }
                            }
                        }
                        if (info.jiban_list) {
                            //激活羁绊提示
                            for (var _b = 0, _c = info.jiban_list; _b < _c.length; _b++) {
                                var jibanInfo = _c[_b];
                                var oldJibanInfo = this.getJibanInfo(headType, jibanInfo.index);
                                if ((!oldJibanInfo || !oldJibanInfo.is_active_jiban) && jibanInfo.is_active_jiban) {
                                    /**激活成功提示*/
                                    mod.ViewMgr.getIns().showSuccessTips(1 /* Act */);
                                    break;
                                }
                            }
                        }
                        for (var k in info) {
                            this._model.surfaceInfos[headType][k] = info[k];
                        }
                        if (info.pos_list && headType == 409 /* Huashen */) {
                            this.updateHuashenIds(info.pos_list); //更新化神出战
                        }
                        //升星成功弹窗
                        if (actIndex || upStarIndex) {
                            var rideInfo = this.getSurfacePerInfo(actIndex || upStarIndex);
                            var curRideStar = rideInfo && rideInfo.star;
                            var god = rideInfo.attr && rideInfo.attr["god" /* god */] || 0;
                            var lastGod = 0;
                            var cfg = game.getConfigById(rideInfo.index);
                            if (cfg && cfg.attr_id && cfg.attr_id[curRideStar - 2]) {
                                var lastAttr = mod.RoleUtil.getAttr(cfg.attr_id[curRideStar - 2]);
                                lastGod = lastAttr && lastAttr["god" /* god */] || 0;
                            }
                            var upStarData = {
                                star: curRideStar,
                                attrFont1: god > 0 ? "+" + god : '',
                                attrFont0: god > 0 ? "\u4ED9\u529B+" + lastGod : ''
                            };
                            if (actIndex) {
                                this._upStarData = upStarData;
                            }
                            else {
                                this._upStarData = null;
                                mod.ViewMgr.getIns().showUpStarTips(upStarData);
                            }
                        }
                        this.sendNt("surface_act_update" /* SURFACE_ACT_UPDATE */, actIndex); //激活的外显index
                    }
                    this.updateHint(headType);
                    this.sendNt("surface_info_update" /* SURFACE_INFO_UPDATE */, headType);
                };
                //升星成功弹窗
                SurfaceProxy.prototype.onSurfaceTipsHide = function () {
                    if (this._upStarData) {
                        var data = mod.RoleUtil.clone(this._upStarData);
                        mod.ViewMgr.getIns().showUpStarTips(data);
                        this._upStarData = null;
                    }
                };
                /**外显信息*/
                SurfaceProxy.prototype.getSurfaceInfo = function (headType) {
                    return this._model.surfaceInfos[headType] || null;
                };
                /**幻化的外显index*/
                SurfaceProxy.prototype.getSurfaceId = function (headType) {
                    var info = this.getSurfaceInfo(headType);
                    if (!info || !info.cur_ride) {
                        return 0;
                    }
                    return info.cur_ride;
                };
                /**默认显示的外显index*/
                SurfaceProxy.prototype.getDefaultId = function (headType) {
                    var indexStr = game.SurfaceConfigList[headType] + "_default";
                    var cfg = game.GameConfig.getParamConfigById(indexStr);
                    if (cfg && cfg.value) {
                        return cfg.value; //默认读配置
                    }
                    return this._model.headTypeToDefaultId[headType];
                };
                /**默认显示的外显是否激活*/
                SurfaceProxy.prototype.isDefaultAct = function (headType) {
                    var index = this.getDefaultId(headType);
                    var star = this.getSurfacePerStar(index);
                    return !!star;
                };
                /**等级*/
                SurfaceProxy.prototype.getSurfaceLv = function (headType) {
                    var info = this.getSurfaceInfo(headType);
                    if (!info || !info.level) {
                        return 0;
                    }
                    return info.level;
                };
                /**阶级*/
                SurfaceProxy.prototype.getSurfaceStage = function (headType) {
                    var lv = this.getSurfaceLv(headType);
                    if (!lv) {
                        return 0;
                    }
                    return mod.SurfaceUtil.calcSurfaceStage(lv, headType);
                };
                /**小等级*/
                SurfaceProxy.prototype.getSurfaceSmallLv = function (headType) {
                    var lv = this.getSurfaceLv(headType);
                    if (!lv) {
                        return 0;
                    }
                    var perLv = this.getSurfacePerLv(headType);
                    var smallLv = lv % perLv;
                    return smallLv ? smallLv : perLv;
                };
                /**突破一次所需等级*/
                SurfaceProxy.prototype.getSurfacePerLv = function (headType) {
                    var indexStr = game.SurfaceConfigList[headType] + "_lv";
                    var cfg = game.GameConfig.getParamConfigById(indexStr);
                    return cfg ? cfg.value : game.SurfacePerLv;
                };
                /**升级经验*/
                SurfaceProxy.prototype.getSurfaceExp = function (headType) {
                    var info = this.getSurfaceInfo(headType);
                    if (!info || !info.exp) {
                        return 0;
                    }
                    return info.exp * game.SurfacePerExp;
                };
                /**升级所需经验*/
                SurfaceProxy.prototype.getSurfaceUpExp = function (headType, index) {
                    var cfg = this.getSurfaceLvCfg(headType, index);
                    if (!cfg) {
                        return 0;
                    }
                    return cfg.exp * game.SurfacePerExp;
                };
                /**总属性*/
                SurfaceProxy.prototype.getSurfaceAllAttr = function (headType) {
                    var info = this.getSurfaceInfo(headType);
                    if (!info || !info.all_attr) {
                        return null;
                    }
                    return info.all_attr;
                };
                /**主动技能*/
                SurfaceProxy.prototype.getSurfaceSkillId = function (headType) {
                    var indexStr = game.SurfaceConfigList[headType] + "_skill";
                    var cfg = game.GameConfig.getParamConfigById(indexStr);
                    return cfg ? cfg.value[0] : 0;
                };
                /**被动技能列表*/
                SurfaceProxy.prototype.getSurfaceSkillList = function (headType) {
                    var indexStr = game.SurfaceConfigList[headType] + "_skill";
                    var cfg = game.GameConfig.getParamConfigById(indexStr);
                    var skills = cfg ? cfg.value : [];
                    return skills.slice(1, skills.length);
                };
                /**被动技能是否激活*/
                SurfaceProxy.prototype.isSurfaceSkillAct = function (headType, skillId) {
                    var info = this.getSurfaceInfo(headType);
                    var skills = info && info.skill_index ? info.skill_index : [];
                    return skills.indexOf(skillId) > -1;
                };
                /**升级消耗*/
                SurfaceProxy.prototype.getSurfaceUpCost = function (headType, index) {
                    var cfg = this.getSurfaceLvCfg(headType, index);
                    return cfg ? cfg.star_consume : null;
                };
                Object.defineProperty(SurfaceProxy.prototype, "headType", {
                    get: function () {
                        return this._model.headType;
                    },
                    set: function (index) {
                        this._model.headType = index;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SurfaceProxy.prototype, "selData", {
                    get: function () {
                        return this._model.selData;
                    },
                    set: function (cfg) {
                        this._model.selData = cfg;
                    },
                    enumerable: true,
                    configurable: true
                });
                SurfaceProxy.prototype.getSurfaceTypes = function (headType) {
                    if (!this._model.surfaceTypes[headType]) {
                        this._model.surfaceTypes[headType] = [];
                        var cfgList = game.getConfigListByName(game.SurfaceConfigList[headType] + ".json");
                        for (var _i = 0, cfgList_2 = cfgList; _i < cfgList_2.length; _i++) {
                            var cfg = cfgList_2[_i];
                            var type = cfg.type;
                            if (this._model.surfaceTypes[headType].indexOf(type) < 0) {
                                this._model.surfaceTypes[headType].push(type);
                            }
                            var comType = "" + headType + type;
                            if (!this._model.surfaceCfgs[comType]) {
                                this._model.surfaceCfgs[comType] = [];
                            }
                            if (cfg.attr_id) {
                                this._model.surfaceCfgs[comType].push(cfg);
                            }
                        }
                        this._model.surfaceTypes[headType].sort(game.SortTools.sortNum);
                    }
                    //化神特殊处理，四魔神未激活时候不显示
                    if (headType == 409 /* Huashen */) {
                        var tmpsTypes = [];
                        for (var _a = 0, _b = this._model.surfaceTypes[headType]; _a < _b.length; _a++) {
                            var type = _b[_a];
                            if (type == 2 /* Type2 */) {
                                //四魔神
                                var cfgList = this.getSurfaceCfgList(headType, type);
                                if (!cfgList.length) {
                                    continue;
                                }
                            }
                            tmpsTypes.push(type);
                        }
                        return tmpsTypes;
                    }
                    return this._model.surfaceTypes[headType];
                };
                SurfaceProxy.prototype.getSurfaceCfgList = function (headType, type) {
                    var comType = headType + "" + type;
                    var cfgList = this._model.surfaceCfgs[comType] || [];
                    var tmpList = [];
                    for (var _i = 0, cfgList_3 = cfgList; _i < cfgList_3.length; _i++) {
                        var cfg = cfgList_3[_i];
                        if (!cfg.show) {
                            //默认不显示
                            var star = this.getSurfacePerStar(cfg.index);
                            if (!star && !this.canUpStar(cfg.index)) {
                                //未激活且不满足激活
                                continue;
                            }
                        }
                        tmpList.push(cfg);
                    }
                    return tmpList;
                };
                /**外显列表*/
                SurfaceProxy.prototype.getSurfaceListInfo = function (headType) {
                    var info = this.getSurfaceInfo(headType);
                    if (!info || !info.ride_list) {
                        return [];
                    }
                    return info.ride_list;
                };
                SurfaceProxy.prototype.getSurfacePerInfoPos = function (index) {
                    var headType = game.PropData.getPropParse(index, 1 /* Type */);
                    var infos = this.getSurfaceListInfo(headType);
                    for (var i = 0; i < infos.length; ++i) {
                        var info = infos[i];
                        if (info.index == index) {
                            return i;
                        }
                    }
                    return -1;
                };
                /**单个外显信息*/
                SurfaceProxy.prototype.getSurfacePerInfo = function (index) {
                    var headType = game.PropData.getPropParse(index, 1 /* Type */);
                    var pos = this.getSurfacePerInfoPos(index);
                    if (pos > -1) {
                        return this._model.surfaceInfos[headType].ride_list[pos];
                    }
                    return null;
                };
                /**单个外显属性*/
                SurfaceProxy.prototype.getSurfacePerAttr = function (index) {
                    var info = this.getSurfacePerInfo(index);
                    return info ? info.attr : null;
                };
                /**单个外显星级*/
                SurfaceProxy.prototype.getSurfacePerStar = function (index) {
                    var info = this.getSurfacePerInfo(index);
                    return info ? info.star : 0;
                };
                /**外显属性丹信息*/
                SurfaceProxy.prototype.getSurfacePillCost = function (quality, star, headType) {
                    var cfgList = game.getConfigByNameId("tunshi.json" /* Tunshi */, quality);
                    var configStr = game.SurfaceConfigList[headType] + "_cost";
                    star = star == 0 ? 1 : star;
                    return cfgList[star][configStr];
                };
                /**属性丹各个星级消耗信息*/
                SurfaceProxy.prototype.getSurfacePillCostList = function (quality, headType, index) {
                    var infos = [];
                    var cfgList = game.getConfigByNameId("tunshi.json" /* Tunshi */, quality);
                    var configStr = game.SurfaceConfigList[headType] + "_cost";
                    for (var k in cfgList) {
                        var cfg = cfgList[k];
                        var cost = cfg[configStr];
                        for (var _i = 0, cost_2 = cost; _i < cost_2.length; _i++) {
                            var i = cost_2[_i];
                            if (i[0] == index) {
                                infos.push(i);
                                break;
                            }
                        }
                    }
                    return infos;
                };
                /**外显最大星级*/
                SurfaceProxy.prototype.getSurfaceMaxStar = function (headType) {
                    var configStr = game.SurfaceConfigList[headType] + "_max_star";
                    var cfg = game.GameConfig.getParamConfigById(configStr);
                    return cfg ? cfg.value : 5;
                };
                //是否可激活，升星
                SurfaceProxy.prototype.canUpStar = function (index) {
                    var headType = game.PropData.getPropParse(index, 1 /* Type */);
                    var maxStar = this.getSurfaceMaxStar(headType);
                    var star = this.getSurfacePerStar(index);
                    if (star >= maxStar) {
                        return false;
                    }
                    var cfg = game.getConfigById(index);
                    if (!cfg) {
                        console.error(index + "无配置");
                        return false;
                    }
                    var cost = cfg.material[star];
                    var idx = cost[0];
                    var costCnt = cost[1];
                    var curCnt = this.getStarPropCnt(headType, cfg.quality, idx, star);
                    if (curCnt >= costCnt) {
                        return true;
                    }
                    return false;
                };
                //外显品质，道具propIndex
                SurfaceProxy.prototype.getStarPropCnt = function (headType, quality, propIndex, star) {
                    var curCnt = mod.BagUtil.getPropCntByIdx(propIndex);
                    if (!star) {
                        return curCnt;
                    }
                    var cfg = game.GameConfig.getParamConfigById(game.SurfaceConfigList[headType] + "_star_prop");
                    var infos = cfg && cfg.value ? cfg.value : [];
                    var idx = infos.length >= quality ? infos[quality - 1] : 0;
                    if (idx) {
                        curCnt += mod.BagUtil.getPropCntByIdx(idx);
                    }
                    return curCnt;
                };
                SurfaceProxy.prototype.getSurfacePerHint = function (cfg) {
                    if (this.canUpStar(cfg.index)) {
                        return true;
                    }
                    if (this.canPillUse(cfg.index)) {
                        return true;
                    }
                    return false;
                };
                SurfaceProxy.prototype.getSurfaceTypeHint = function (headType, type) {
                    var items = this.getSurfaceCfgList(headType, type);
                    for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                        var i = items_3[_i];
                        if (this.getSurfacePerHint(i)) {
                            return true;
                        }
                    }
                    return false;
                };
                /**升级配置*/
                SurfaceProxy.prototype.getSurfaceLvCfg = function (headType, index) {
                    var configStr = game.SurfaceConfigList[headType] + "_dengji.json";
                    var cfg = game.getConfigByNameId(configStr, index);
                    return cfg;
                };
                /**************************进阶礼包*************************/
                /**购买礼包*/
                SurfaceProxy.prototype.c2s_buy_reward = function (headType, index) {
                    var msg = new c2s_buy_reward();
                    msg.head_type = headType;
                    msg.index = index;
                    this.sendProto(msg);
                };
                SurfaceProxy.prototype.s2c_buy_reward_lisrt = function (n) {
                    var msg = n.body;
                    if (!msg.buy_reward_lisrt) {
                        return;
                    }
                    this._model.rewardList = this._model.rewardList.concat(msg.buy_reward_lisrt);
                    var headType = msg.buy_reward_lisrt[0].head_type;
                    this.updateGiftHint(headType);
                    this.sendNt("surface_gift_info_update" /* SURFACE_GIFT_INFO_UPDATE */, headType);
                };
                SurfaceProxy.prototype.hasGiftBuy = function (headType, index) {
                    for (var _i = 0, _a = this._model.rewardList; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.head_type == headType && info.index == index) {
                            return true;
                        }
                    }
                    return false;
                };
                /**************************羁绊*************************/
                SurfaceProxy.prototype.c2s_ride_oper_jiban = function (headType, index, rideIndex) {
                    var msg = new c2s_ride_oper_jiban();
                    msg.head_type = headType;
                    msg.index = index;
                    msg.ride_index = rideIndex;
                    this.sendProto(msg);
                };
                /**已激活羁绊列表*/
                SurfaceProxy.prototype.getJibanList = function (headType) {
                    var info = this.getSurfaceInfo(headType);
                    if (!info || !info.jiban_list) {
                        return [];
                    }
                    return info.jiban_list;
                };
                /**单个羁绊信息*/
                SurfaceProxy.prototype.getJibanInfo = function (headType, index) {
                    var pos = this.getJibanInfoPos(headType, index);
                    if (pos > -1) {
                        return this._model.surfaceInfos[headType].jiban_list[pos];
                    }
                    return null;
                };
                SurfaceProxy.prototype.getJibanInfoPos = function (headType, index) {
                    var infos = this.getJibanList(headType);
                    for (var i = 0; i < infos.length; ++i) {
                        var info = infos[i];
                        if (info.index == index) {
                            return i;
                        }
                    }
                    return -1;
                };
                /**羁绊是否已激活*/
                SurfaceProxy.prototype.isJibanAct = function (headType, index) {
                    var info = this.getJibanInfo(headType, index);
                    return info && info.is_active_jiban;
                };
                /**羁绊单个外显是否已激活*/
                SurfaceProxy.prototype.isJibanItemAct = function (headType, index, rideIndex) {
                    if (this.isJibanAct(headType, index)) {
                        return true;
                    }
                    var info = this.getJibanInfo(headType, index);
                    return info && info.ride_index && info.ride_index.indexOf(rideIndex) > -1;
                };
                /**羁绊配置列表*/
                SurfaceProxy.prototype.getJibanCfgList = function (headType) {
                    var configStr = game.SurfaceConfigList[headType] + "_jiban.json";
                    return game.getConfigListByName(configStr) || [];
                };
                /**羁绊系统是否可以激活*/
                SurfaceProxy.prototype.canJibanSysAct = function (headType, cfg) {
                    if (this.canJibanAct(headType, cfg)) {
                        return true;
                    }
                    var infos = cfg.partners;
                    for (var i = 0; i < infos.length; ++i) {
                        var index = infos[i];
                        if (this.canJibanItemAct(headType, cfg, index)) {
                            return true;
                        }
                    }
                    return false;
                };
                /**羁绊是否可以激活*/
                SurfaceProxy.prototype.canJibanAct = function (headType, cfg) {
                    if (this.isJibanAct(headType, cfg.index)) {
                        return false;
                    }
                    var infos = cfg.partners;
                    for (var i = 0; i < infos.length; ++i) {
                        var index = infos[i];
                        if (!this.isJibanItemAct(headType, cfg.index, index)) {
                            return false;
                        }
                    }
                    return true;
                };
                /**羁绊外显是否可以激活*/
                SurfaceProxy.prototype.canJibanItemAct = function (headType, cfg, index) {
                    if (this.isJibanItemAct(headType, cfg.index, index)) {
                        return false;
                    }
                    var star = this.getSurfacePerStar(index);
                    return !!star;
                };
                Object.defineProperty(SurfaceProxy.prototype, "selJibanCfg", {
                    get: function () {
                        return this._model.selJibanCfg;
                    },
                    set: function (cfg) {
                        this._model.selJibanCfg = cfg;
                    },
                    enumerable: true,
                    configurable: true
                });
                SurfaceProxy.prototype.getBtnType = function (headType) {
                    return this._model.headTypeToBtnType[headType];
                };
                /**************************红点*************************/
                SurfaceProxy.prototype.checkOpen = function (headType) {
                    var openIdx = this._model.headTypeToOpenIdx[headType];
                    if (openIdx && !mod.ViewMgr.getIns().checkViewOpen(openIdx)) {
                        return false;
                    }
                    if (headType == 409 /* Huashen */) {
                        //化神系统红点需要额外判断是否完成任务激活系统
                        var isAct = this.isDefaultAct(headType);
                        if (!isAct) {
                            return false;
                        }
                    }
                    return true;
                };
                SurfaceProxy.prototype.getOpenIdx = function (headType) {
                    return this._model.headTypeToOpenIdx[headType];
                };
                SurfaceProxy.prototype.updateHint = function (headType) {
                    this.updateUpHint(headType);
                    this.updateSkillHint(headType);
                    this.updateGiftHint(headType);
                    this.updateActHint(headType);
                    this.updatePillHint(headType);
                    this.updateJibanHint(headType);
                    this.updateBattleHint(headType);
                };
                SurfaceProxy.prototype.updateUpHint = function (headType) {
                    if (!this.checkOpen(headType) || !this._model.upHints[headType]) {
                        return;
                    }
                    var hint = false;
                    var lv = this.getSurfaceLv(headType);
                    var exp = this.getSurfaceExp(headType);
                    var upExp = this.getSurfaceUpExp(headType, lv);
                    var cost = this.getSurfaceUpCost(headType, lv);
                    var nextCost = this.getSurfaceUpCost(headType, lv + 1);
                    var isMax = !nextCost && exp >= upExp;
                    if (!isMax) {
                        hint = mod.BagUtil.checkPropCnt(cost[0][0], cost[0][1]);
                    }
                    mod.HintMgr.setHint(hint, this._model.upHints[headType]);
                };
                SurfaceProxy.prototype.updateSkillHint = function (headType) {
                    if (!this.checkOpen(headType) || !this._model.skillHints[headType]) {
                        return;
                    }
                    var hint = false;
                    var skillList = this.getSurfaceSkillList(headType);
                    for (var i = 0; i < skillList.length; ++i) {
                        var skillId = skillList[i];
                        var isAct = this.isSurfaceSkillAct(headType, skillId);
                        if (isAct) {
                            continue;
                        }
                        var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                        var cost = cfg.act_material[0];
                        this.initSkillProps(headType, cost[0]);
                        if (mod.BagUtil.checkPropCnt(cost[0], cost[1])) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.skillHints[headType]);
                };
                /**被动技能激活消耗道具*/
                SurfaceProxy.prototype.initSkillProps = function (headType, index) {
                    if (!this._model.skillProps[headType]) {
                        this._model.skillProps[headType] = [];
                    }
                    if (this._model.skillProps[headType].indexOf(index) < 0) {
                        this._model.skillProps[headType].push(index);
                    }
                };
                SurfaceProxy.prototype.updateJibanHint = function (headType) {
                    if (!this.checkOpen(headType) || !this._model.jibanHints[headType]) {
                        return;
                    }
                    var hint = false;
                    var items = this.getJibanCfgList(headType);
                    for (var _i = 0, items_4 = items; _i < items_4.length; _i++) {
                        var cfg = items_4[_i];
                        if (this.canJibanSysAct(headType, cfg)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.jibanHints[headType]);
                };
                SurfaceProxy.prototype.getJibanHint = function (headType) {
                    return this._model.jibanHints[headType];
                };
                SurfaceProxy.prototype.updateGiftHint = function (headType) {
                    if (!this.checkOpen(headType) || !this._model.giftHints[headType]) {
                        return;
                    }
                    var hint = false;
                    var items = game.getConfigListByName("jinjiejiangli.json" /* Jinjiejiangli */);
                    for (var _i = 0, items_5 = items; _i < items_5.length; _i++) {
                        var cfg = items_5[_i];
                        var index = cfg.index;
                        if (this.hasGiftBuy(headType, index)) {
                            continue;
                        }
                        var curStage = this.getSurfaceStage(headType);
                        if (curStage < index) {
                            continue;
                        }
                        if (mod.BagUtil.checkPropCnt(cfg.award_buy[0][0], cfg.award_buy[0][1])) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.giftHints[headType]);
                };
                SurfaceProxy.prototype.getGiftHint = function (headType) {
                    return this._model.giftHints[headType];
                };
                SurfaceProxy.prototype.updateActHint = function (headType) {
                    if (!this.checkOpen(headType)) {
                        return;
                    }
                    var hint = false;
                    var datas = this.getSurfaceTypes(headType);
                    for (var _i = 0, datas_2 = datas; _i < datas_2.length; _i++) {
                        var type = datas_2[_i];
                        var items = this.getSurfaceCfgList(headType, type);
                        for (var _a = 0, items_6 = items; _a < items_6.length; _a++) {
                            var i = items_6[_a];
                            if (this.canUpStar(i.index)) {
                                hint = true;
                                break;
                            }
                        }
                        if (hint) {
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.actHints[headType]);
                };
                //可激活红点
                SurfaceProxy.prototype.getActHint = function (headType) {
                    var hintType = this._model.actHints[headType];
                    if (!hintType) {
                        return false;
                    }
                    return mod.HintMgr.getHint(hintType);
                };
                SurfaceProxy.prototype.updatePillHint = function (headType) {
                    if (!this.checkOpen(headType) || !this._model.pillHints[headType]) {
                        return;
                    }
                    var hint = false;
                    var datas = this.getSurfaceTypes(headType);
                    for (var _i = 0, datas_3 = datas; _i < datas_3.length; _i++) {
                        var type = datas_3[_i];
                        var items = this.getSurfaceCfgList(headType, type);
                        for (var _a = 0, items_7 = items; _a < items_7.length; _a++) {
                            var i = items_7[_a];
                            if (this.canPillUse(i.index)) {
                                hint = true;
                                break;
                            }
                        }
                        if (hint) {
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.pillHints[headType]);
                };
                SurfaceProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    for (var _i = 0, indexs_2 = indexs; _i < indexs_2.length; _i++) {
                        var i = indexs_2[_i];
                        for (var k in this._model.skillProps) {
                            var props = this._model.skillProps[k];
                            if (props.indexOf(i) < 0) {
                                continue;
                            }
                            this.updateSkillHint(parseInt(k));
                        }
                        var type = this._model.upPropToHeadType[i];
                        if (!type) {
                            continue;
                        }
                        this.updateUpHint(type);
                    }
                };
                SurfaceProxy.prototype.onBagUpdateByBagType = function (n) {
                    var types = n.body;
                    if (types.indexOf(6 /* YuanlinEquip */) < 0) {
                        return;
                    }
                    this.updateYuanlinHint();
                };
                SurfaceProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("diamond" /* diamond */) >= 0) {
                        /**写死仙玉变更时候刷新，需要其他道具时再做支持*/
                        for (var _i = 0, _a = this._model.headTypes; _i < _a.length; _i++) {
                            var type = _a[_i];
                            this.updateGiftHint(type);
                        }
                    }
                    if (keys.indexOf("god" /* god */) >= 0) {
                        /**仙力变更后刷新出战红点*/
                        for (var k in this._model.battleHints) {
                            var type = parseInt(k);
                            this.updateBattleHint(type);
                        }
                    }
                };
                SurfaceProxy.prototype.onBagUpdateByPropTypeAndSubType = function (n) {
                    var propTypeAndSubTypes = n.body;
                    for (var k in propTypeAndSubTypes) {
                        var propType = parseInt(k);
                        var types = propTypeAndSubTypes[k];
                        if (propType == 11 /* Surface */) {
                            for (var _i = 0, types_2 = types; _i < types_2.length; _i++) {
                                var t = types_2[_i];
                                var headType = this._model.subTypeToHeadType11[t];
                                if (!headType) {
                                    continue;
                                }
                                this.updateActHint(headType);
                            }
                        }
                        else if (propType == 17 /* Lianshendan */) {
                            for (var _a = 0, types_3 = types; _a < types_3.length; _a++) {
                                var t = types_3[_a];
                                var headType = this._model.subTypeToHeadType17[t];
                                if (!headType) {
                                    continue;
                                }
                                this.updatePillHint(headType);
                            }
                        }
                        else if (propType == 32 /* UpStar */) {
                            for (var _b = 0, types_4 = types; _b < types_4.length; _b++) {
                                var t = types_4[_b];
                                var headType = this._model.subTypeToHeadType32[t];
                                if (!headType) {
                                    continue;
                                }
                                this.updateActHint(headType);
                            }
                        }
                    }
                };
                /************************** 元灵.装备 *************************/
                /**
                 * 元灵装备信息
                 */
                SurfaceProxy.prototype.s2c_yuanling_equip_info = function (n) {
                    var msg = n.body;
                    if (!msg.equiplist) {
                        return;
                    }
                    for (var i = 1; i <= 4; i++) {
                        if (!this._model.yuanlinEquipPower[i]) {
                            this._model.yuanlinEquipPower[i] = Long.fromValue(0);
                        }
                        this._model.yuanlinEquipPower[i].low = 0;
                        this._model.yuanlinEquipPower[i].high = 0;
                    }
                    for (var _i = 0, _a = msg.equiplist; _i < _a.length; _i++) {
                        var eqp = _a[_i];
                        if (!this._model.yuanlinEqpInfo[eqp.quality]) {
                            this._model.yuanlinEqpInfo[eqp.quality] = {};
                        }
                        this._model.yuanlinEqpInfo[eqp.quality][eqp.pos] = eqp;
                        if (eqp.attrs.showpower) {
                            var oldPower = this._model.yuanlinEquipPower[eqp.quality];
                            this._model.yuanlinEquipPower[eqp.quality] = oldPower.add(eqp.attrs.showpower);
                        }
                    }
                    this.updateYuanlinHint();
                    this.sendNt("yuanlin_equip_info_update" /* YUANLIN_EQUIP_INFO_UPDATE */);
                };
                /**
                 * 元灵装备激活、进阶信息
                 * @param {number} type 元灵类型
                 * @param {number} pos 位置
                 */
                SurfaceProxy.prototype.c2s_yuanling_equip_levelup = function (type, pos) {
                    var msg = new c2s_yuanling_equip_levelup();
                    msg.quality = type;
                    msg.pos = pos;
                    this.sendProto(msg);
                };
                /**
                 * 元灵套装信息
                 */
                SurfaceProxy.prototype.s2c_yuanling_equip_suit_info = function (n) {
                    var msg = n.body;
                    if (!msg.suitlist) {
                        return;
                    }
                    for (var i = 1; i <= 4; i++) {
                        if (!this._model.yuanlinSuitPower[i]) {
                            this._model.yuanlinSuitPower[i] = Long.fromValue(0);
                        }
                        this._model.yuanlinSuitPower[i].low = 0;
                        this._model.yuanlinSuitPower[i].high = 0;
                    }
                    for (var _i = 0, _a = msg.suitlist; _i < _a.length; _i++) {
                        var suit = _a[_i];
                        this._model.yuanlinSuitInfo[suit.quality] = suit;
                        if (suit.attrs.showpower) {
                            var oldPower = this._model.yuanlinSuitPower[suit.quality];
                            this._model.yuanlinSuitPower[suit.quality] = oldPower.add(suit.attrs.showpower);
                        }
                    }
                    this.updateYuanlinHint();
                    this.sendNt("yuanlin_suit_info_update" /* YUANLIN_SUIT_INFO_UPDATE */);
                };
                /**
                 * 元灵套装激活、进阶信息
                 * @param {number} type 元灵类型
                 */
                SurfaceProxy.prototype.c2s_yuanling_equip_suit_levelup = function (type) {
                    var msg = new c2s_yuanling_equip_suit_levelup();
                    msg.quality = type;
                    this.sendProto(msg);
                };
                SurfaceProxy.prototype.getYuanlinEqpInfo = function (type, pos) {
                    return this._model.yuanlinEqpInfo && this._model.yuanlinEqpInfo[type] && this._model.yuanlinEqpInfo[type][pos];
                };
                SurfaceProxy.prototype.getYuanlinEqpInfo2 = function (type) {
                    return this._model.yuanlinEqpInfo && this._model.yuanlinEqpInfo[type];
                };
                SurfaceProxy.prototype.getYuanlinSuitInfo = function (type) {
                    return this._model.yuanlinSuitInfo && this._model.yuanlinSuitInfo[type];
                };
                SurfaceProxy.prototype.getYuanlinPower = function (type) {
                    var eqpPower = this._model.yuanlinEquipPower[type];
                    var suitPower = this._model.yuanlinSuitPower[type];
                    if (eqpPower && suitPower) {
                        return eqpPower.add(suitPower);
                    }
                    else {
                        return eqpPower || suitPower || Long.ZERO;
                    }
                };
                SurfaceProxy.prototype.getYuanlinEqpCfg = function (id) {
                    var cfg = game.getConfigByNameId("yuanling_zhuangbei.json" /* TianshenZhuangBei */, id);
                    return cfg;
                };
                SurfaceProxy.prototype.getYuanlinSuitCfg = function (type, lv) {
                    var cfg = game.getConfigByNameId("yuanling_taozhuang.json" /* TianshenTaoZhuang */, type);
                    return cfg && cfg[lv];
                };
                /**
                 * 取未激活时的默认装备
                 * @param type
                 * @returns
                 */
                SurfaceProxy.prototype.getDefaultEqpCfg = function (type, pos) {
                    var id = this.getYuanlinEqpId(type, pos, 1);
                    var cfgs = this.getYuanlinEqpCfg(id);
                    return cfgs;
                };
                /**
                 * 取未激活时的默认套装
                 * @param type
                 * @returns
                 */
                SurfaceProxy.prototype.getDefaultSuitCfg = function (type) {
                    var cfg = game.getConfigByNameId("yuanling_taozhuang.json" /* TianshenTaoZhuang */, type);
                    return cfg && cfg[1];
                };
                /**
                 * 装备阶级达标数量
                 * @param type
                 * @returns
                 */
                SurfaceProxy.prototype.getEqpReachCnt = function (type) {
                    var cnt = 0;
                    var eqpInfos = this.getYuanlinEqpInfo2(type);
                    if (!eqpInfos) {
                        return cnt;
                    }
                    var suitInfo = this.getYuanlinSuitInfo(type);
                    var isSuitActive = suitInfo && !!suitInfo.level;
                    var suitCfg;
                    if (isSuitActive) { // 已激活
                        suitCfg = this.getYuanlinSuitCfg(type, suitInfo.nextlevel);
                    }
                    else {
                        suitCfg = this.getDefaultSuitCfg(type);
                    }
                    if (!suitCfg) {
                        return cnt;
                    }
                    var needReach = suitCfg.reach_class;
                    for (var pos in eqpInfos) {
                        var eqp = eqpInfos[pos];
                        if (eqp.index.isZero()) {
                            continue;
                        }
                        if (this.getYuanlinEqpStep(eqp.index.toNumber()) >= needReach) {
                            cnt++;
                        }
                    }
                    return cnt;
                };
                /**
                 * 取元灵装备类型（1~4）
                 */
                SurfaceProxy.prototype.getYuanlinEqpType = function (id) {
                    return Math.floor(id % 10000000 / 1000000);
                };
                /**
                 * 取元灵装备部位（1~8）
                 */
                SurfaceProxy.prototype.getYuanlinEqpPos = function (id) {
                    return Math.floor(id % 10000 / 1000);
                };
                /**
                 * 取元灵装备阶级
                 */
                SurfaceProxy.prototype.getYuanlinEqpStep = function (id) {
                    return id && id % 100;
                };
                /**
                 * 取元灵套装阶级
                 */
                SurfaceProxy.prototype.getYuanlinSuitStep = function (cfg) {
                    return cfg ? cfg.lv : 0;
                };
                //元灵装备套装属性描述转换
                SurfaceProxy.prototype.changeInfos = function (desc, nameColor, valColor) {
                    var infos = [];
                    var attrList = desc.split(",");
                    for (var _i = 0, attrList_1 = attrList; _i < attrList_1.length; _i++) {
                        var i = attrList_1[_i];
                        var attr = i.split("+");
                        var info = game.TextUtil.addColor(attr[0], nameColor) + game.TextUtil.addColor(" +" + attr[1], valColor);
                        infos.push(info);
                    }
                    return infos;
                };
                /**
                 * 取元灵装备id
                 * @param type 1~4
                 * @param pos 1~8
                 * @param step 阶级 1~
                 * @returns
                 */
                SurfaceProxy.prototype.getYuanlinEqpId = function (type, pos, step) {
                    return 64000000000 + type * 1000000 + pos * 1000 + step;
                };
                /**元灵套装id数组*/
                SurfaceProxy.prototype.getYuanlingSuitTypeAry = function () {
                    var _this = this;
                    if (this._yuanlingSuitTypeAry) {
                        return this._yuanlingSuitTypeAry;
                    }
                    this._yuanlingSuitTypeAry = [];
                    var cfgObj = game.getConfigByName("yuanling_taozhuang.json" /* TianshenTaoZhuang */);
                    var keys = Object.keys(cfgObj);
                    keys.forEach(function (key) {
                        _this._yuanlingSuitTypeAry.push(+key);
                    });
                    return this._yuanlingSuitTypeAry;
                };
                SurfaceProxy.prototype.updateYuanlinHint = function () {
                    var eqpHint = false;
                    var typeAry = this.getYuanlingSuitTypeAry();
                    for (var _i = 0, typeAry_1 = typeAry; _i < typeAry_1.length; _i++) {
                        var type = typeAry_1[_i];
                        eqpHint = this.getYuanlinEqpTypeHint(type);
                        if (eqpHint) {
                            break;
                        }
                    }
                    mod.HintMgr.setHint(eqpHint, this._model.yuanlinEqpOpeHint);
                };
                // private updateYuanlinTypeHint(type: number): boolean {
                //     return false;
                // }
                // private updateYuanlinEqpHint(type: number, pos: number): void {
                //     if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Tianshen)){
                //         return;
                //     }
                //     let hint = this.getYuanlinEqpHint(type, pos);
                //     HintMgr.setHint(hint, this._model.yuanlinEqpOpeHint);
                // }
                // private updateYuanlinSuitHint(type: number): boolean {
                //     return false;
                // }
                SurfaceProxy.prototype.getYuanlinEqpTypeHint = function (type) {
                    var hint = false;
                    var hint2 = false;
                    for (var pos = 1; pos <= 8; pos++) {
                        hint = this.getYuanlinEqpHint(type, pos);
                        if (hint) {
                            break;
                        }
                    }
                    hint2 = this.getYuanlinSuitHint(type);
                    return hint || hint2;
                };
                SurfaceProxy.prototype.getYuanlinEqpHint = function (type, pos) {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670106 /* Tianshen */)) {
                        return false;
                    }
                    var hint = false;
                    var eqpInfo = this.getYuanlinEqpInfo(type, pos);
                    var eqpCfg;
                    var isEqpActive = eqpInfo && !eqpInfo.index.isZero();
                    if (isEqpActive) { // 已激活
                        eqpCfg = this.getYuanlinEqpCfg(eqpInfo.index.toNumber());
                    }
                    else {
                        eqpCfg = this.getDefaultEqpCfg(type, pos);
                    }
                    var cost = eqpCfg.consume[0];
                    if (!cost.length) {
                        hint = false;
                    }
                    else {
                        var isEnough = mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                        hint = isEnough && !!eqpCfg.next_id; // 消耗足够，且未满级
                    }
                    return hint;
                };
                SurfaceProxy.prototype.getYuanlinSuitHint = function (type) {
                    var suitInfo = this.getYuanlinSuitInfo(type);
                    var isMax = suitInfo && (!suitInfo.nextattrs || !suitInfo.nextattrs.showpower);
                    var nextSuitCfg;
                    var isSuitActive = suitInfo && !!suitInfo.level;
                    if (isSuitActive) { // 已激活
                        nextSuitCfg = this.getYuanlinSuitCfg(type, suitInfo.nextlevel);
                    }
                    else {
                        nextSuitCfg = this.getDefaultSuitCfg(type);
                    }
                    var reachCnt = this.getEqpReachCnt(type);
                    var canOpe = nextSuitCfg && reachCnt >= nextSuitCfg.wear_quantity && !isMax;
                    mod.HintMgr.setHint(canOpe, this._model.yuanlinSuitOpeHint);
                    return canOpe;
                };
                /**获取功能主界面幻化按钮红点路径 */
                SurfaceProxy.prototype.getHeadTypeToStarHint = function (headType) {
                    return this._model.starHint[headType];
                };
                /**是否显示主界面幻化按钮 */
                SurfaceProxy.prototype.isStar = function (headType) {
                    if (headType === void 0) { headType = this._model.headType; }
                    return !!this._model.starHint[headType];
                };
                /**根据headType获取幻化跳转路径 */
                SurfaceProxy.prototype.getStarRoadByHeadType = function (headType) {
                    if (headType === void 0) { headType = this._model.headType; }
                    return this._model.starJumpData[headType];
                };
                /**是否有羁绊功能 */
                SurfaceProxy.prototype.isJiban = function (headType) {
                    if (headType === void 0) { headType = this._model.headType; }
                    return !!this._model.headTypeToBtnType[headType];
                };
                /**************************通用的事件完成协议*************************/
                SurfaceProxy.prototype.s2c_module_event_add_attr_info = function (n) {
                    var msg = n.body;
                    if (!msg.list) {
                        return;
                    }
                    for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        var composeIndex = this.getSpecialComposeIndex(info.index.toNumber(), info.specialindex);
                        this._model.specialAttrInfos[composeIndex] = info;
                    }
                    this.sendNt("surface_special_attr_update" /* SURFACE_SPECIAL_ATTR_UPDATE */);
                };
                SurfaceProxy.prototype.getSpecialComposeIndex = function (index, specialindex) {
                    return parseInt(index + "" + specialindex);
                };
                /**通用的属性信息*/
                SurfaceProxy.prototype.getSpecialAttrInfo = function (index, specialindex) {
                    var composeIndex = this.getSpecialComposeIndex(index, specialindex);
                    return this._model.specialAttrInfos[composeIndex] || null;
                };
                /**通用的属性信息描述*/
                SurfaceProxy.prototype.getSpecialAttrDesc = function (index, specialindex) {
                    var cfg = game.getConfigByNameId("special_attr.json" /* SpecialAttr */, specialindex);
                    if (!cfg) {
                        return "";
                    }
                    var descStr = cfg.desc;
                    if (descStr.indexOf("%s") > -1) {
                        var info = this.getSpecialAttrInfo(index, specialindex);
                        var curVal = info && info.step ? info.step : 0;
                        descStr = game.StringUtil.substitute(descStr, [curVal]);
                    }
                    return descStr;
                };
                /**是否出战*/
                SurfaceProxy.prototype.isBattle = function (headType, index) {
                    var curIndex = this.getSurfaceId(headType);
                    if (curIndex == index) {
                        return true;
                    }
                    if (headType == 409 /* Huashen */) {
                        //化神特殊处理
                        var posList = this.getPosList(headType);
                        for (var _i = 0, posList_1 = posList; _i < posList_1.length; _i++) {
                            var info = posList_1[_i];
                            if (info.unitid == index) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                /************************化神相关******************************/
                //化神变身结束时间戳
                SurfaceProxy.prototype.s2c_bethegod_time = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this.huashenTime = msg.time;
                };
                Object.defineProperty(SurfaceProxy.prototype, "huashenTime", {
                    //化神变身持续时间
                    get: function () {
                        return this._model.huashenTime;
                    },
                    //支持外部调用，方便测试
                    set: function (time) {
                        this._model.huashenTime = time;
                        this.sendNt("on_scene_huashen_time" /* ON_SCENE_HUASHEN_TIME */);
                    },
                    enumerable: true,
                    configurable: true
                });
                /**外显上阵相关，化神有用到*/
                SurfaceProxy.prototype.getPosList = function (headType) {
                    var info = this.getSurfaceInfo(headType);
                    if (!info || !info.pos_list) {
                        return [];
                    }
                    return info.pos_list;
                };
                Object.defineProperty(SurfaceProxy.prototype, "huashenIds", {
                    /**已上阵的化神列表*/
                    get: function () {
                        if (!this._model.huashenIds || !this._model.huashenIds.length) {
                            //不存在化神信息时
                            this.resetHuashenIds();
                        }
                        return this._model.huashenIds || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                //更新化神信息，中途变更化神才重置
                SurfaceProxy.prototype.updateHuashenIds = function (posList) {
                    for (var _i = 0, posList_2 = posList; _i < posList_2.length; _i++) {
                        var i = posList_2[_i];
                        //let index = this.getPosIndex(ConfigHead.Huashen, i.pos);
                        var index = this.huashenIds[i.pos - 1] || 0;
                        if (index != i.unitid) {
                            this.resetHuashenIds();
                            break;
                        }
                    }
                };
                //初始化重置化神信息，化神变身时间结束的时候也会重置，中途变更化神也会重置
                SurfaceProxy.prototype.resetHuashenIds = function () {
                    var posList = this.getPosList(409 /* Huashen */);
                    game.SortTools.sortMap(posList, "pos");
                    this._model.huashenIds = [];
                    for (var _i = 0, posList_3 = posList; _i < posList_3.length; _i++) {
                        var i = posList_3[_i];
                        if (i.unitid) {
                            this._model.huashenIds.push(i.unitid);
                        }
                    }
                    this._model.lastHuashenId = 0;
                };
                //场景化神ID变化时设置化神数据
                SurfaceProxy.prototype.setHuashenIds = function (curId) {
                    // let proxy: ISceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
                    // let vo = proxy.mainPlayerVo;
                    // let curId = vo && vo.the_god;//当前变身的化神
                    if (!curId) {
                        this.resetHuashenIds(); //场景不存在化神ID时，则重置数据
                        return;
                    }
                    if (!this._model.lastHuashenId) {
                        //上一次不存在化神ID时，则不需要交换化神位置
                        this._model.lastHuashenId = curId;
                        return;
                    }
                    //找到当前化神ID上一次的位置，将主战位的化神切换到对应位置
                    for (var i = 0; i < this._model.huashenIds.length; ++i) {
                        var id = this._model.huashenIds[i];
                        if (id == curId) {
                            this._model.huashenIds[i] = this._model.huashenIds[0];
                            break;
                        }
                    }
                    this._model.huashenIds[0] = curId;
                    this._model.lastHuashenId = curId;
                };
                /**获取上阵的外显*/
                SurfaceProxy.prototype.getPosIndex = function (headType, pos) {
                    var posList = this.getPosList(headType);
                    for (var _i = 0, posList_4 = posList; _i < posList_4.length; _i++) {
                        var info = posList_4[_i];
                        if (info.pos == pos) {
                            return info.unitid;
                        }
                    }
                    return 0;
                };
                /**获取可上阵的外显，不包含当前已上阵的外显*/
                SurfaceProxy.prototype.getCanBattleInfos = function (headType) {
                    var infos = this.getSurfaceListInfo(headType);
                    var tmpInfos = [];
                    for (var _i = 0, infos_2 = infos; _i < infos_2.length; _i++) {
                        var info = infos_2[_i];
                        if (this.isBattle(headType, info.index)) {
                            continue;
                        }
                        tmpInfos.push(info);
                    }
                    return tmpInfos;
                };
                /**部位是否可上阵*/
                SurfaceProxy.prototype.canPosBattle = function (headType) {
                    var infos = this.getCanBattleInfos(headType);
                    return infos && infos.length > 0;
                };
                /**部位可上阵红点*/
                SurfaceProxy.prototype.getPosBattleHint = function (headType, pos, limit) {
                    var isOpen = mod.RoleUtil.isLimitOpen([3 /* God */, limit]);
                    if (!isOpen) {
                        return false; //未开启
                    }
                    var index = this.getPosIndex(headType, pos);
                    if (index) {
                        return false; //已上阵
                    }
                    return this.canPosBattle(headType);
                };
                SurfaceProxy.prototype.updateBattleHint = function (headType) {
                    if (!this.checkOpen(headType)) {
                        return;
                    }
                    var hintType = this._model.battleHints[headType];
                    if (!hintType) {
                        return;
                    }
                    var hint = false;
                    var indexStr = game.SurfaceConfigList[headType] + "_battle_open";
                    var cfg = game.GameConfig.getParamConfigById(indexStr);
                    var datas = cfg.value; //仙力开启条件
                    for (var i = 0; i < datas.length; ++i) {
                        var limit = datas[i]; //仙力
                        var pos = i + 1;
                        if (this.getPosBattleHint(headType, pos, limit)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, hintType);
                };
                SurfaceProxy.prototype.getBattleHint = function (headType) {
                    return this._model.battleHints[headType];
                };
                /**外显激活数量*/
                SurfaceProxy.prototype.getSurfaceActCnt = function (headType) {
                    var cnt = 0;
                    var infos = this.getSurfaceListInfo(headType);
                    for (var i = 0; i < infos.length; ++i) {
                        var info = infos[i];
                        if (info.star > 0) {
                            cnt++;
                        }
                    }
                    return cnt;
                };
                return SurfaceProxy;
            }(game.ProxyBase));
            surface.SurfaceProxy = SurfaceProxy;
            __reflect(SurfaceProxy.prototype, "game.mod.surface.SurfaceProxy", ["game.mod.ISurfaceProxy", "base.IProxy"]);
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var LingChongSecondMainMdr = /** @class */ (function (_super) {
                __extends(LingChongSecondMainMdr, _super);
                function LingChongSecondMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Lingchong */,
                            icon: "lingchongtubiao",
                            mdr: surface.LingChongMdr,
                            title: 'lingchong_tips',
                            hintTypes: ["46" /* Surface */, "12" /* LingChongMain */, "01" /* Lingchong */, "01" /* Lingchong */]
                        }
                    ];
                    return _this;
                }
                return LingChongSecondMainMdr;
            }(mod.WndSecondMdr));
            surface.LingChongSecondMainMdr = LingChongSecondMainMdr;
            __reflect(LingChongSecondMainMdr.prototype, "game.mod.surface.LingChongSecondMainMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TouchEvent = egret.TouchEvent;
            var LingChongTaskMdr = /** @class */ (function (_super) {
                __extends(LingChongTaskMdr, _super);
                function LingChongTaskMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", surface.LingChongTaskView);
                    _this.isEasyHide = true;
                    return _this;
                }
                LingChongTaskMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(192 /* Lingchong */);
                    this._view.list.itemRenderer = surface.LingChongTaskItem;
                    this._view.list.dataProvider = this._listTask = new eui.ArrayCollection();
                };
                LingChongTaskMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                };
                LingChongTaskMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var index = this._showArgs; //灵宠index
                    var cfg = this._proxy.getConfig(index);
                    if (!cfg || !cfg.taskid) {
                        return;
                    }
                    var list = [];
                    var info = this._proxy.getTaskInfo(index);
                    for (var _i = 0, _a = cfg.taskid; _i < _a.length; _i++) {
                        var taskId = _a[_i];
                        var taskCfg = this._proxy.getTaskConfig(taskId);
                        if (!taskCfg) {
                            continue;
                        }
                        var curTarget = info && info[taskId] ? info[taskId].step : 0; //当前次数
                        var getCnt = Math.floor(curTarget / taskCfg.target); //可领取次数
                        if (taskCfg.maxlimit) {
                            var gottenCnt = info && info[taskId] ? info[taskId].get_count : 0;
                            getCnt = Math.min(taskCfg.maxlimit - gottenCnt, getCnt);
                        }
                        var taskDesc = taskCfg.desc + ': ' + game.TextUtil.addColor(curTarget + "/" + taskCfg.target, 2330156 /* GREEN */);
                        var receiveDesc = game.StringUtil.substitute(game.getLanById("lingchong_tips7" /* lingchong_tips7 */), [game.TextUtil.addColor(getCnt + '', 2330156 /* GREEN */)]);
                        list.push([taskDesc, receiveDesc]);
                    }
                    this._listTask.replaceAll(list);
                };
                LingChongTaskMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return LingChongTaskMdr;
            }(game.MdrBase));
            surface.LingChongTaskMdr = LingChongTaskMdr;
            __reflect(LingChongTaskMdr.prototype, "game.mod.surface.LingChongTaskMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TouchEvent = egret.TouchEvent;
            var LingChongTreasureMdr = /** @class */ (function (_super) {
                __extends(LingChongTreasureMdr, _super);
                function LingChongTreasureMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", surface.LingChongTreasureView);
                    _this._canReceiveCnt = 0; //可领取次数
                    _this.isEasyHide = true;
                    return _this;
                }
                LingChongTreasureMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(192 /* Lingchong */);
                    this._view.img_state.visible = false;
                    this._view.list.itemRenderer = mod.Icon;
                    this._view.list.dataProvider = this._listReward = new eui.ArrayCollection();
                };
                LingChongTreasureMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.onNt("ling_chong_info_update" /* LING_CHONG_INFO_UPDATE */, this.updateView, this);
                };
                LingChongTreasureMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this.updateView();
                };
                LingChongTreasureMdr.prototype.updateView = function () {
                    var index = this._showArgs;
                    var info = this._proxy.getInfo(index);
                    this._view.btn_get.visible = info && info.star > 0;
                    this._view.lb_actDesc.visible = !this._view.btn_get.visible;
                    var cfg = this._proxy.getConfig(index);
                    if (!cfg || !cfg.taskid) {
                        return;
                    }
                    var rewardMap = {};
                    var task_info = this._proxy.getTaskInfo(index);
                    this._canReceiveCnt = 0;
                    var rewardList = []; //奖励
                    if (cfg.type_little == 2) {
                        //特殊处理类型
                        for (var i = cfg.taskid.length - 1; i >= 0; i--) {
                            var id = cfg.taskid[i];
                            var taskCfg = this._proxy.getTaskConfig(id);
                            if (!taskCfg) {
                                continue;
                            }
                            var time = task_info && task_info[id] ? Math.floor(task_info[id].step / taskCfg.target) : 0;
                            this._canReceiveCnt += time;
                            if (taskCfg.eventtype == 113 /* ManyBoss */) {
                                var params = taskCfg.params;
                                if (params && params[0] == 2) { //2为转生条件
                                    var rein = game.RoleVo.ins.reincarnate;
                                    if (params[1] <= rein) {
                                        rewardList = taskCfg.reward.concat();
                                        break;
                                    }
                                }
                            }
                            else if (taskCfg.eventtype == 120 /* Yijie */) {
                                var layer = taskCfg.params[0];
                                var yijieObj = game.getConfigByNameId("yijie.json" /* Yijie */, layer);
                                if (yijieObj && yijieObj[1]) {
                                    var openIdx = yijieObj[1].open;
                                    if (mod.ViewMgr.getIns().checkViewOpen(openIdx)) {
                                        rewardList = taskCfg.reward.concat();
                                        break;
                                    }
                                }
                            }
                            //没有满足的，默认第一条
                            if (i == 0 && !rewardList.length) {
                                rewardList = taskCfg.reward.concat();
                            }
                        }
                    }
                    else {
                        for (var _i = 0, _a = cfg.taskid; _i < _a.length; _i++) {
                            var id = _a[_i];
                            var taskCfg = this._proxy.getTaskConfig(id);
                            if (!taskCfg) {
                                continue;
                            }
                            var time = task_info && task_info[id] ? Math.floor(task_info[id].step / taskCfg.target) : 0;
                            this._canReceiveCnt += time;
                            if (taskCfg && taskCfg.reward) {
                                for (var _b = 0, _c = taskCfg.reward; _b < _c.length; _b++) {
                                    var reward = _c[_b];
                                    if (!rewardMap[reward[0]]) {
                                        rewardMap[reward[0]] = 0;
                                    }
                                    rewardMap[reward[0]] = rewardMap[reward[0]] + reward[1] * Math.max(time, 1);
                                }
                            }
                        }
                        for (var key in rewardMap) {
                            rewardList.push([+key, rewardMap[key]]);
                        }
                    }
                    this._listReward.replaceAll(rewardList);
                    this._view.lb_desc.textFlow = game.TextUtil.parseHtml(game.StringUtil.substitute(game.getLanById("lingchong_tips8" /* lingchong_tips8 */), [game.TextUtil.addColor(this._canReceiveCnt + '', 2330156 /* GREEN */)]));
                };
                LingChongTreasureMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                LingChongTreasureMdr.prototype.onClick = function () {
                    if (this._showArgs && this._canReceiveCnt) {
                        this._proxy.c2s_lingchong_get_task_reward(this._showArgs);
                    }
                };
                return LingChongTreasureMdr;
            }(game.MdrBase));
            surface.LingChongTreasureMdr = LingChongTreasureMdr;
            __reflect(LingChongTreasureMdr.prototype, "game.mod.surface.LingChongTreasureMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TouchEvent = egret.TouchEvent;
            var YuanGuShenShouMdr = /** @class */ (function (_super) {
                __extends(YuanGuShenShouMdr, _super);
                function YuanGuShenShouMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._type = 2;
                    _this._littleType = 1;
                    return _this;
                }
                YuanGuShenShouMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_treasure, TouchEvent.TOUCH_TAP, this.onClickTreasure, this);
                    addEventListener(this._view.btn_task, TouchEvent.TOUCH_TAP, this.onClickTask, this);
                };
                YuanGuShenShouMdr.prototype.updateAttrView = function () {
                };
                YuanGuShenShouMdr.prototype.updateTaskView = function () {
                    var cfg = this._proxy.getConfig(this._curIndex);
                    if (!cfg || cfg.type != this._type || cfg.type_little != this._littleType || !cfg.taskid) {
                        this._view.gr_treasure.visible = false;
                        return;
                    }
                    var reinLv = mod.RoleUtil.getRebirthLv();
                    var task_list = this._proxy.getTaskInfo(this._curIndex);
                    var curTaskIdx; //默认当前第一条的任务，然后根据转数变化
                    for (var _i = 0, _a = cfg.taskid; _i < _a.length; _i++) {
                        var id = _a[_i];
                        var taskCfg = this._proxy.getTaskConfig(id);
                        if (!taskCfg || !taskCfg.params || taskCfg.params[0] != 1) { //非转数过滤，1表示转数
                            continue;
                        }
                        if (taskCfg.params[1] >= reinLv) { //找出当前转数，或者比这个转数大的最接近的那一转
                            curTaskIdx = taskCfg.index;
                            break;
                        }
                    }
                    if (!curTaskIdx) {
                        curTaskIdx = cfg.taskid[0];
                    }
                    var curTaskCfg = this._proxy.getTaskConfig(curTaskIdx);
                    if (!curTaskCfg) {
                        return;
                    }
                    var curTaskInfo = task_list ? task_list[curTaskIdx] : null;
                    var step = curTaskInfo ? curTaskInfo.step : 0;
                    var curGetCnt = Math.floor(step / curTaskCfg.target); //当前可领取次数
                    var gottenCnt = curTaskInfo ? curTaskInfo.get_count : 0; //统计的已领取次数
                    var getCnt; //可领取次数
                    if (curTaskCfg.maxlimit) {
                        getCnt = Math.min(curTaskCfg.maxlimit - gottenCnt, curGetCnt); //有领取上限
                    }
                    else {
                        getCnt = curGetCnt;
                    }
                    var txt = game.TextUtil.addColor(step + "/" + curTaskCfg.target, 16757068 /* ORANGE */);
                    this._view.lb_desc.textFlow = game.TextUtil.parseHtml(game.StringUtil.substitute(curTaskCfg.desc, [curTaskCfg.target]) + ': ' + txt + '\n'
                        + game.StringUtil.substitute(game.getLanById("lingchong_tips7" /* lingchong_tips7 */), [game.TextUtil.addColor(getCnt + '', 16757068 /* ORANGE */)]));
                    this._view.gr_treasure.visible = true;
                    this._view.btn_treasure.setTip(this._proxy.getTreasureReceiveCnt(this._curIndex));
                };
                YuanGuShenShouMdr.prototype.onClickTreasure = function () {
                    mod.ViewMgr.getIns().showSecondPop("46" /* Surface */, "13" /* LingChongTreasure */, this._curIndex);
                };
                YuanGuShenShouMdr.prototype.onClickTask = function () {
                    mod.ViewMgr.getIns().showSecondPop("46" /* Surface */, "14" /* LingChongTask */, this._curIndex);
                };
                //跳到远古神兽
                YuanGuShenShouMdr.prototype.jumpSecondTab = function () {
                    if (this._proxy.getActOrUpHintByType(this._type, 2)) {
                        mod.ViewMgr.getIns().showView("46" /* Surface */, "12" /* LingChongMain */, ["02" /* Yuangushenshou */, "03" /* Yuangushenshou */]);
                    }
                };
                return YuanGuShenShouMdr;
            }(surface.LingChongMdr));
            surface.YuanGuShenShouMdr = YuanGuShenShouMdr;
            __reflect(YuanGuShenShouMdr.prototype, "game.mod.surface.YuanGuShenShouMdr");
            var YuanGuShenShou2Mdr = /** @class */ (function (_super) {
                __extends(YuanGuShenShou2Mdr, _super);
                function YuanGuShenShou2Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._type = 2;
                    _this._littleType = 2;
                    return _this;
                }
                //跳到四神兽
                YuanGuShenShou2Mdr.prototype.jumpSecondTab = function () {
                    if (this._proxy.getActOrUpHintByType(this._type, 1)) {
                        mod.ViewMgr.getIns().showView("46" /* Surface */, "12" /* LingChongMain */, ["02" /* Yuangushenshou */, "02" /* Sishenshou */]);
                    }
                };
                return YuanGuShenShou2Mdr;
            }(YuanGuShenShouMdr));
            surface.YuanGuShenShou2Mdr = YuanGuShenShou2Mdr;
            __reflect(YuanGuShenShou2Mdr.prototype, "game.mod.surface.YuanGuShenShou2Mdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var YuanGuShenShouSecondMdr = /** @class */ (function (_super) {
                __extends(YuanGuShenShouSecondMdr, _super);
                function YuanGuShenShouSecondMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "02" /* Sishenshou */,
                            icon: "sishenshoutubiao",
                            mdr: surface.YuanGuShenShouMdr,
                            title: 'lingchong_tips2',
                            hintTypes: ["46" /* Surface */, "12" /* LingChongMain */, "02" /* Yuangushenshou */, "02" /* Sishenshou */]
                        },
                        {
                            btnType: "03" /* Yuangushenshou */,
                            icon: "yuangushenshoutubiao",
                            mdr: surface.YuanGuShenShou2Mdr,
                            title: 'lingchong_tips2',
                            hintTypes: ["46" /* Surface */, "12" /* LingChongMain */, "02" /* Yuangushenshou */, "03" /* Yuangushenshou */]
                        }
                    ];
                    return _this;
                }
                return YuanGuShenShouSecondMdr;
            }(mod.WndSecondMdr));
            surface.YuanGuShenShouSecondMdr = YuanGuShenShouSecondMdr;
            __reflect(YuanGuShenShouSecondMdr.prototype, "game.mod.surface.YuanGuShenShouSecondMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var ItemTapEvent = eui.ItemTapEvent;
            var TianshenEquipMdr = /** @class */ (function (_super) {
                __extends(TianshenEquipMdr, _super);
                function TianshenEquipMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", surface.TianshenEquipView);
                    _this._equipPos = []; // 已有装备的位置
                    _this._posCnt = 8;
                    return _this;
                }
                TianshenEquipMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(190 /* Surface */);
                    this._listEquipData = new ArrayCollection();
                    this._view.list_equip.dataProvider = this._listEquipData;
                    this._view.list_equip.itemRenderer = surface.TianshenIconEquip;
                    this._listTypeData = new ArrayCollection();
                    this._view.list_type.dataProvider = this._listTypeData;
                    this._view.list_type.itemRenderer = surface.TianshenTypeRender;
                };
                TianshenEquipMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("yuanlin_equip_info_update" /* YUANLIN_EQUIP_INFO_UPDATE */, this.updateInfo, this);
                    this.onNt("yuanlin_suit_info_update" /* YUANLIN_SUIT_INFO_UPDATE */, this.updateInfo, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_equip, ItemTapEvent.ITEM_TAP, this.onClickEquipList);
                    addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickTypeList);
                    addEventListener(this._view.icon_suit, TouchEvent.TOUCH_TAP, this.onClickSuitIcon);
                };
                TianshenEquipMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateInfo();
                };
                TianshenEquipMdr.prototype.onHide = function () {
                    this._effId = 0;
                    _super.prototype.onHide.call(this);
                };
                TianshenEquipMdr.prototype.updateInfo = function () {
                    if (!this._curType) {
                        this._curType = 1;
                    }
                    var typeDatas = [];
                    var typeAry = this._proxy.getYuanlingSuitTypeAry();
                    for (var _i = 0, typeAry_2 = typeAry; _i < typeAry_2.length; _i++) {
                        var type = typeAry_2[_i];
                        var suitInfo = this._proxy.getYuanlinSuitInfo(type);
                        var isSuitActive = suitInfo && !!suitInfo.level;
                        var tData = {
                            type: type,
                            suitActive: isSuitActive,
                            reachCnt: this._proxy.getEqpReachCnt(type),
                            hint: this._proxy.getYuanlinEqpTypeHint(type),
                            isSel: type == this._curType
                        };
                        typeDatas.push(tData);
                    }
                    this._listTypeData.replaceAll(typeDatas);
                    this._view.list_type.selectedIndex = this._curType - 1;
                    this.updateCurrentInfo();
                };
                //当前选中
                TianshenEquipMdr.prototype.updateCurrentInfo = function () {
                    this._view.power.setPowerValue(this._proxy.getYuanlinPower(this._curType));
                    // 模型
                    // if(this._effId){
                    //     this.removeEffect(this._effId);
                    // }
                    if (!this._effId) {
                        var cfg = game.getConfigByNameId("yuanling_taozhuang.json" /* TianshenTaoZhuang */, this._curType);
                        if (cfg && cfg[1] && cfg[1].icon) {
                            var modelName = game.ResUtil.getModelUrlByModelName(640 /* Tianshen */, cfg[1].icon, 5 /* DOWN */, "std" /* STAND */, true, false);
                            var scale = cfg[1]['scale'] ? cfg[1]['scale'] / 10000 : 1; //缩放
                            this._effId = this.addEftByParent(modelName, this._view.grp_eff, 0, 0, -1, null, -1, scale);
                        }
                        else {
                            this._effId = this.addAnimate(640025009, this._view.grp_eff);
                        }
                    }
                    // 装备
                    var list = [];
                    this._equipPos = [];
                    for (var pos = 1; pos <= this._posCnt; pos++) {
                        var eqpInfo = this._proxy.getYuanlinEqpInfo(this._curType, pos);
                        var eqpCfg = void 0;
                        var isEqpActive = eqpInfo && !eqpInfo.index.isZero();
                        if (isEqpActive) { // 已激活
                            eqpCfg = this._proxy.getYuanlinEqpCfg(eqpInfo.index.toNumber());
                            this._equipPos.push(pos);
                        }
                        else {
                            eqpCfg = this._proxy.getDefaultEqpCfg(this._curType, pos);
                        }
                        var eqpData = {
                            type: this._curType,
                            pos: pos,
                            step: isEqpActive && eqpCfg ? this._proxy.getYuanlinEqpStep(eqpCfg.index) : 0,
                            cfg: eqpCfg,
                            eqp: eqpInfo,
                            hint: this._proxy.getYuanlinEqpHint(this._curType, pos)
                        };
                        list.push(eqpData);
                    }
                    this._listEquipData.replaceAll(list);
                    // 套装
                    var suitInfo = this._proxy.getYuanlinSuitInfo(this._curType);
                    var isSuitActive = suitInfo && !!suitInfo.level;
                    var suitCfg;
                    if (isSuitActive) { // 已激活
                        suitCfg = this._proxy.getYuanlinSuitCfg(this._curType, suitInfo.level);
                    }
                    else {
                        suitCfg = this._proxy.getDefaultSuitCfg(this._curType);
                    }
                    this._suitData = {
                        type: this._curType,
                        step: isSuitActive && suitCfg ? this._proxy.getYuanlinSuitStep(suitCfg) : 0,
                        cfg: suitCfg,
                        suit: suitInfo,
                        hint: this._proxy.getYuanlinSuitHint(this._curType)
                    };
                    var sAttrCfg = game.getConfigByNameId("special_attr.json" /* SpecialAttr */, suitCfg.special_property);
                    this._view.icon_suit.setData(this._suitData);
                    this._view.lab_suit_name.text = "\u5143\u7075\u5957\u88C5\uFF1A" + suitCfg.name;
                    var desc = suitCfg.desc + "\n" + sAttrCfg.desc.replace(/#N/g, "\n");
                    this._view.lab_suit_desc.text = game.StringUtil.substitute(desc, [sAttrCfg.maxlimit]);
                };
                TianshenEquipMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    if (data.node == "46" /* TianshenEqpOpe */) { // 装备
                        var list = [];
                        for (var i = 0, len = this._listEquipData.length; i < len; i++) {
                            var eqpData = this._listEquipData.getItemAt(i);
                            eqpData.hint = this._proxy.getYuanlinEqpHint(this._curType, eqpData.pos);
                            list.push(eqpData);
                        }
                        this._listEquipData.replaceAll(list);
                        this.updateTypeHint();
                    }
                    else if (data.node == "47" /* TianshenSuitOpe */) { // 套装
                        this._view.icon_suit.redPoint.visible = data.value;
                        this.updateTypeHint();
                    }
                };
                TianshenEquipMdr.prototype.updateTypeHint = function () {
                    var typeDatas = [];
                    for (var i = 0, len = this._listTypeData.length; i <= len; i++) {
                        var tData = this._listTypeData.getItemAt(i);
                        if (!tData) {
                            continue;
                        }
                        tData.hint = this._proxy.getYuanlinEqpTypeHint(tData.type);
                        typeDatas.push(tData);
                    }
                    this._listTypeData.replaceAll(typeDatas);
                };
                TianshenEquipMdr.prototype.onClickEquipList = function (e) {
                    mod.ViewMgr.getIns().showSecondPop("46" /* Surface */, "10" /* TianshenEquipTips */, e.item);
                };
                TianshenEquipMdr.prototype.onClickTypeList = function (e) {
                    var typeData = e.item;
                    if (typeData.type == this._curType) {
                        return;
                    }
                    //清除选中特效
                    var datas = this._listTypeData.source;
                    var lastData = datas[this._curType - 1];
                    lastData.isSel = false;
                    this._listTypeData.itemUpdated(lastData);
                    this._curType = typeData.type;
                    //选中特效
                    var curData = datas[this._curType - 1];
                    curData.isSel = true;
                    this._listTypeData.itemUpdated(curData);
                    //切换移除模型，重新加载
                    if (this._effId) {
                        this.removeEffect(this._effId);
                        this._effId = null;
                    }
                    this.updateCurrentInfo();
                };
                TianshenEquipMdr.prototype.onClickSuitIcon = function (e) {
                    if (!this._suitData) {
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("46" /* Surface */, "11" /* TianshenSuitTips */, this._suitData);
                };
                return TianshenEquipMdr;
            }(game.EffectMdrBase));
            surface.TianshenEquipMdr = TianshenEquipMdr;
            __reflect(TianshenEquipMdr.prototype, "game.mod.surface.TianshenEquipMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TouchEvent = egret.TouchEvent;
            var TianshenEquipTipsMdr = /** @class */ (function (_super) {
                __extends(TianshenEquipTipsMdr, _super);
                function TianshenEquipTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", surface.TianshenEquipTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                TianshenEquipTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(190 /* Surface */);
                };
                TianshenEquipTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("yuanlin_equip_info_update" /* YUANLIN_EQUIP_INFO_UPDATE */, this.updateInfo, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateAttr, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_operate, TouchEvent.TOUCH_TAP, this.onClickOperate);
                };
                TianshenEquipTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._data = this._showArgs;
                    this._view.currentState = "default";
                    this._view.icon_equip.needHint = false;
                    this._view.attrListZhuangshiView1.setListX();
                    this._view.attrListZhuangshiView2.setListX();
                    this.updateInfo();
                };
                TianshenEquipTipsMdr.prototype.onHide = function () {
                    this._isOperating = false;
                    _super.prototype.onHide.call(this);
                };
                TianshenEquipTipsMdr.prototype.updateInfo = function () {
                    if (!this._data) {
                        return;
                    }
                    if (this._isOperating) { // 激活、升阶后，id会改变
                        this._isOperating = false;
                        var eqpInfo = this._proxy.getYuanlinEqpInfo(this._data.type, this._data.pos);
                        var eqpCfg = this._proxy.getYuanlinEqpCfg(eqpInfo.index.toNumber());
                        this._data.step = eqpCfg ? this._proxy.getYuanlinEqpStep(eqpCfg.index) : 0;
                        this._data.cfg = eqpCfg;
                        this._data.eqp = eqpInfo;
                        this._data.hint = this._proxy.getYuanlinEqpHint(this._data.type, this._data.pos);
                    }
                    var isMax = this._data.eqp && (!this._data.eqp.nextattrs || !this._data.eqp.nextattrs.showpower);
                    if (isMax) {
                        this._view.currentState = "max";
                    }
                    // 当前装备信息
                    var prop = game.getConfigByNameId("prop.json" /* Prop */, this._data.cfg.consume[0][0]);
                    var isEqpActive = this._data.eqp && !this._data.eqp.index.isZero();
                    this._view.icon_equip.data = this._data;
                    this._view.lab_name.text = prop.name;
                    // 套装信息
                    this._suitInfo = this._proxy.getYuanlinSuitInfo(this._data.type);
                    var isSuitActive = this._suitInfo && !!this._suitInfo.level;
                    var nextSuitCfg;
                    if (isSuitActive) { // 已激活
                        this._suitCfg = this._proxy.getYuanlinSuitCfg(this._data.type, this._suitInfo.level);
                        nextSuitCfg = this._proxy.getYuanlinSuitCfg(this._data.type, this._suitInfo.nextlevel);
                        var desc = game.TextUtil.addColor("\u5DF2\u6FC0\u6D3B" + this._suitInfo.level + "\u9636\u6548\u679C", 8585074 /* GREEN */);
                        this._view.baseDescItem.updateShow(desc, "\u5143\u7075\u5957\u88C5." + this._suitCfg.name);
                    }
                    else {
                        this._suitCfg = this._proxy.getDefaultSuitCfg(this._data.type);
                        nextSuitCfg = this._suitCfg;
                        this._view.baseDescItem.updateShow("", "\u5143\u7075\u5957\u88C5." + this._suitCfg.name);
                    }
                    var reachCnt = this._proxy.getEqpReachCnt(this._data.type);
                    var conditionStr = nextSuitCfg ? "\u88C5\u5907\u5747\u8FBE" + nextSuitCfg.reach_class + "\u9636\u53EF\u8FDB\u9636(" + reachCnt + "/" + nextSuitCfg.wear_quantity + ")" : "";
                    this._view.lab_condition.lb_desc.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(conditionStr, nextSuitCfg && reachCnt >= nextSuitCfg.wear_quantity ? 8585074 /* GREEN */ : 16731212 /* RED */));
                    if (!isMax) {
                        this._cost = this._data.cfg.consume[0];
                        this._view.icon_cost.setData(this._cost);
                        this._view.btn_operate.label = isEqpActive ? "升阶" : "激活";
                    }
                    //修改，属性读取配置描述
                    this._view.attrListZhuangshiView1.visible = isSuitActive;
                    if (isSuitActive) {
                        var infos1 = this._proxy.changeInfos(this._suitCfg.desc, 4435385 /* DEFAULT */, 8585074 /* GREEN */);
                        this._view.attrListZhuangshiView1.updateAttrByDescList(infos1);
                    }
                    else {
                        this._view.attrListZhuangshiView1.updateAttrByDescList([]);
                    }
                    var hasNext = !!nextSuitCfg && !isMax;
                    this._view.attrListZhuangshiView2.visible = hasNext;
                    if (hasNext) {
                        var infos2 = this._proxy.changeInfos(nextSuitCfg.desc, 7835024 /* GRAY */, 7835024 /* GRAY */);
                        this._view.attrListZhuangshiView2.updateAttrByDescList(infos2);
                    }
                    this.updateAttr();
                    this.updateHint();
                };
                TianshenEquipTipsMdr.prototype.updateAttr = function () {
                    // 装备属性
                    var attr;
                    if (this._data.eqp) {
                        attr = this._data.eqp.attrs.showpower ? this._data.eqp.attrs : this._data.eqp.nextattrs;
                    }
                    if (!attr) { // 未激活
                        attr = mod.RoleUtil.getAttr(this._data.cfg.wear_property);
                    }
                    attr && this._view.baseAttrItem.updateShow(attr, true, game.getLanById("base_attr" /* base_attr */));
                    // 套装属性
                    // let suitAttr = this._suitInfo && this._suitInfo.attrs;          // 未激活时不显示当前属性，无需额外请求属性
                    // let suitNextAttr = this._suitInfo ? this._suitInfo.nextattrs : RoleUtil.getAttr(this._suitCfg.property);
                    // // if(suitAttr && suitAttr.showpower) {
                    //     this._view.attrListZhuangshiView1.updateAttrAdd(suitAttr, BlackColor.GREEN, "\n", " +", BlackColor.DEFAULT);
                    // // }
                    // // if(suitNextAttr && suitNextAttr.showpower) {
                    //     this._view.attrListZhuangshiView2.updateAttrAdd(suitNextAttr, BlackColor.GRAY, "\n", " +", BlackColor.GRAY);
                    // // }
                };
                TianshenEquipTipsMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    if (data.node == "46" /* TianshenEqpOpe */) {
                        var hint = this._proxy.getYuanlinEqpHint(this._data.type, this._data.pos);
                        this._view.btn_operate.setHint(hint); // data.value 不能区分不同的 pos
                    }
                };
                TianshenEquipTipsMdr.prototype.updateHint = function () {
                    this._view.btn_operate.setHint(this._data.hint);
                };
                TianshenEquipTipsMdr.prototype.onClickOperate = function (e) {
                    if (!this._data) {
                        return;
                    }
                    if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                        return;
                    }
                    this._isOperating = true;
                    this._proxy.c2s_yuanling_equip_levelup(this._data.type, this._data.pos);
                };
                return TianshenEquipTipsMdr;
            }(game.MdrBase));
            surface.TianshenEquipTipsMdr = TianshenEquipTipsMdr;
            __reflect(TianshenEquipTipsMdr.prototype, "game.mod.surface.TianshenEquipTipsMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TianshenIconEquip = /** @class */ (function (_super) {
                __extends(TianshenIconEquip, _super);
                function TianshenIconEquip() {
                    var _this = _super.call(this) || this;
                    _this.needHint = true;
                    _this.skinName = "skins.common.IconEquipSkin";
                    return _this;
                }
                TianshenIconEquip.prototype.dataChanged = function () {
                    if (this.data == null) {
                        this.icon.defaultIcon();
                        return;
                    }
                    this.redPoint.visible = this.needHint && this.data.hint;
                    var prop = game.getConfigByNameId("prop.json" /* Prop */, this.data.cfg.consume[0][0]);
                    this.icon.updateIconImg(prop.icon);
                    this.icon.updateCnt(this.data.step ? this.data.step + "阶" : "");
                    var isEqpActive = this.data.eqp && !this.data.eqp.index.isZero();
                    if (isEqpActive) {
                        this.icon.setImgGray("");
                    }
                    else {
                        this.icon.setImgGray();
                    }
                };
                TianshenIconEquip.prototype.setData = function (data) {
                    this.data = data;
                };
                return TianshenIconEquip;
            }(eui.ItemRenderer));
            surface.TianshenIconEquip = TianshenIconEquip;
            __reflect(TianshenIconEquip.prototype, "game.mod.surface.TianshenIconEquip");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TianshenMainMdr = /** @class */ (function (_super) {
                __extends(TianshenMainMdr, _super);
                function TianshenMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Tianshen */,
                            icon: "yuanling_tab",
                            mdr: mod.SurfaceMdr,
                            title: "yuanling_tips" /* yuanling_tips */,
                            bg: "horse_bg",
                            hintTypes: ["46" /* Surface */, "08" /* TianshenMain */, "01" /* Tianshen */],
                        },
                        {
                            btnType: "02" /* TianshenStar */,
                            icon: "huanhua_tab",
                            mdr: mod.SurfaceStarMdr,
                            title: "yuanling_tips" /* yuanling_tips */,
                            bg: "horse_bg",
                            hintTypes: ["46" /* Surface */, "08" /* TianshenMain */, "02" /* TianshenStar */],
                        },
                        {
                            btnType: "03" /* TianshenEquip */,
                            icon: "lingzuang_tab",
                            mdr: surface.TianshenEquipMdr,
                            title: "yuanling_tips" /* yuanling_tips */,
                            bg: "horse_bg",
                            hintTypes: ["46" /* Surface */, "08" /* TianshenMain */, "03" /* TianshenEquip */],
                        }
                    ];
                    return _this;
                }
                TianshenMainMdr.prototype.onShow = function () {
                    this._proxy = this.retProxy(190 /* Surface */);
                    this._proxy.headType = 640 /* Tianshen */;
                    _super.prototype.onShow.call(this);
                };
                /**默认选中的BtnType，可重写*/
                TianshenMainMdr.prototype.getDefaultBtnType = function () {
                    if (this._proxy.getActHint(this._proxy.headType)) {
                        return "02" /* TianshenStar */;
                    }
                    return "";
                };
                return TianshenMainMdr;
            }(mod.WndBaseMdr));
            surface.TianshenMainMdr = TianshenMainMdr;
            __reflect(TianshenMainMdr.prototype, "game.mod.surface.TianshenMainMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TouchEvent = egret.TouchEvent;
            var TianshenSuitTipsMdr = /** @class */ (function (_super) {
                __extends(TianshenSuitTipsMdr, _super);
                function TianshenSuitTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", surface.TianshenSuitTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                TianshenSuitTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(190 /* Surface */);
                };
                TianshenSuitTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("yuanlin_suit_info_update" /* YUANLIN_SUIT_INFO_UPDATE */, this.updateInfo, this);
                    //this.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_operate, TouchEvent.TOUCH_TAP, this.onClickOperate);
                };
                TianshenSuitTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._data = this._showArgs;
                    this._view.icon_suit.needHint = false;
                    this._view.attrListZhuangshiView1.setListX();
                    this._view.attrListZhuangshiView2.setListX();
                    this.updateInfo();
                };
                TianshenSuitTipsMdr.prototype.onHide = function () {
                    this._isOperating = false;
                    _super.prototype.onHide.call(this);
                };
                TianshenSuitTipsMdr.prototype.updateInfo = function () {
                    if (!this._data) {
                        return;
                    }
                    if (this._isOperating) { // 激活、升阶后，id会改变
                        this._isOperating = false;
                        var suitInfo = this._proxy.getYuanlinSuitInfo(this._data.type);
                        var suitCfg = this._proxy.getYuanlinSuitCfg(this._data.type, suitInfo.level);
                        this._data.step = suitCfg ? this._proxy.getYuanlinSuitStep(suitCfg) : 0;
                        this._data.cfg = suitCfg;
                        this._data.suit = suitInfo;
                        this._data.hint = this._proxy.getYuanlinSuitHint(this._data.type);
                    }
                    var isMax = this._data.suit && (!this._data.suit.nextattrs || !this._data.suit.nextattrs.showpower);
                    this._view.icon_suit.setData(this._data);
                    this._view.lab_name.text = "\u5143\u7075\u5957\u88C5." + this._data.cfg.name;
                    // 套装信息
                    var nextSuitCfg;
                    var isSuitActive = this._data.suit && !!this._data.suit.level;
                    this._view.currentState = isMax ? "max" : (isSuitActive ? "actived" : "notActived");
                    if (isSuitActive) { // 已激活
                        nextSuitCfg = this._proxy.getYuanlinSuitCfg(this._data.type, this._data.suit.nextlevel);
                        var desc = game.TextUtil.addColor("\u5DF2\u6FC0\u6D3B" + this._data.suit.level + "\u9636\u6548\u679C", 8585074 /* GREEN */);
                        this._view.baseDescItem1.updateShow(desc, "当前效果");
                    }
                    else {
                        nextSuitCfg = this._proxy.getDefaultSuitCfg(this._data.type);
                    }
                    var reachCnt = this._proxy.getEqpReachCnt(this._data.type);
                    this._conditionStr = nextSuitCfg ? "\u88C5\u5907\u5747\u8FBE" + nextSuitCfg.reach_class + "\u9636\u53EF\u8FDB\u9636" : "";
                    var conditionStr = nextSuitCfg ? this._conditionStr + ("(" + reachCnt + "/" + nextSuitCfg.wear_quantity + ")") : "";
                    var canUp = nextSuitCfg && reachCnt >= nextSuitCfg.wear_quantity;
                    var conditionStr2 = game.TextUtil.addColor(conditionStr, canUp ? 8585074 /* GREEN */ : 16731212 /* RED */);
                    if (canUp) {
                        this._conditionStr = ""; //用来判断是否可以激活升阶
                    }
                    this._view.baseDescItem2.updateShow(conditionStr2, "下阶效果");
                    if (!isMax) {
                        this._view.btn_operate.label = isSuitActive ? "升阶" : "激活";
                    }
                    //修改，属性读取配置描述
                    var infos1 = this._proxy.changeInfos(this._data.cfg.desc, 4435385 /* DEFAULT */, 8585074 /* GREEN */);
                    this._view.attrListZhuangshiView1.updateAttrByDescList(infos1);
                    var hasNext = !!nextSuitCfg;
                    this._view.baseDescItem2.visible = this._view.attrListZhuangshiView2.visible = hasNext;
                    if (hasNext) {
                        var infos2 = this._proxy.changeInfos(nextSuitCfg.desc, 7835024 /* GRAY */, 7835024 /* GRAY */);
                        this._view.attrListZhuangshiView2.updateAttrByDescList(infos2);
                    }
                    //this.updateAttr();
                    this.updateHint();
                };
                // private updateAttr() {
                //     let suitAttr = this._data.suit && this._data.suit.attrs;          // 未激活时不显示当前属性，无需额外请求属性
                //     let suitNextAttr = this._data.suit ? this._data.suit.nextattrs : RoleUtil.getAttr(this._data.cfg.property);
                //     // if(suitAttr && suitAttr.showpower) {
                //         this._view.attrListZhuangshiView1.updateAttrAdd(suitAttr, BlackColor.GREEN, "\n", " +", BlackColor.DEFAULT);
                //     // }
                //     // if(suitNextAttr && suitNextAttr.showpower) {
                //         this._view.attrListZhuangshiView2.updateAttrAdd(suitNextAttr, BlackColor.GRAY, "\n", " +", BlackColor.GRAY);
                //     // }
                //     this._view.baseDescItem2.visible = suitNextAttr && !!suitNextAttr.showpower;
                // }
                TianshenSuitTipsMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    if (data.node == "47" /* TianshenSuitOpe */) {
                        var hint = this._proxy.getYuanlinSuitHint(this._data.type);
                        this._view.btn_operate.setHint(hint);
                    }
                };
                TianshenSuitTipsMdr.prototype.updateHint = function () {
                    this._view.btn_operate.setHint(this._data.hint);
                };
                TianshenSuitTipsMdr.prototype.onClickOperate = function (e) {
                    if (!this._data) {
                        return;
                    }
                    if (this._conditionStr) {
                        game.PromptBox.getIns().show(this._conditionStr);
                        return;
                    }
                    this._isOperating = true;
                    this._proxy.c2s_yuanling_equip_suit_levelup(this._data.type);
                };
                return TianshenSuitTipsMdr;
            }(game.MdrBase));
            surface.TianshenSuitTipsMdr = TianshenSuitTipsMdr;
            __reflect(TianshenSuitTipsMdr.prototype, "game.mod.surface.TianshenSuitTipsMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TouchEvent = egret.TouchEvent;
            var XianjianBattleSkillTipsMdr = /** @class */ (function (_super) {
                __extends(XianjianBattleSkillTipsMdr, _super);
                function XianjianBattleSkillTipsMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._state = "xianjian";
                    return _this;
                }
                XianjianBattleSkillTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateBtn();
                };
                XianjianBattleSkillTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick);
                    this.onNt("on_update_xianjian_info" /* ON_UPDATE_XIANJIAN_INFO */, this.onUpdateBtn, this);
                };
                XianjianBattleSkillTipsMdr.prototype.onUpdateBtn = function () {
                    var proxy = game.getProxy("46" /* Surface */, 239 /* Xianjian */);
                    var bool = proxy.getSkillUp(this._showArgs.index);
                    this._view.btn.setHint(bool);
                };
                XianjianBattleSkillTipsMdr.prototype.onUpdateDesc2 = function () {
                    var proxy = this.retProxy(239 /* Xianjian */);
                    var info = proxy.getInfo(this._showArgs.index);
                    var cfg = game.getConfigByNameId("xianjian.json" /* Xianjian */, this._showArgs.index);
                    var skill = game.getConfigByNameId("battle_skill.json" /* Skill */, cfg.skill);
                    var next = proxy.getNextStage(this._showArgs.index);
                    var count = proxy.getCountByStage(this._showArgs.index, next);
                    var buwei = 4;
                    var color = count == buwei ? 0xFFF053 : 7835024 /* GRAY */;
                    var title = game.TextUtil.addColor("\u4E0B\u4E00\u9636\u6BB5 \u6240\u6709\u90E8\u4F4D" + next + "\u9636(" + count + "/" + buwei + ")", color);
                    var desc = "";
                    if (!info || !info.active_skill_level) {
                        desc = skill.describe;
                    }
                    else {
                        var nextIndex = cfg.skill + info.active_skill_level + 1;
                        var skilllv = game.getConfigByNameId("skill_level.json" /* SkillLv */, nextIndex);
                        if (!skilllv) {
                            this._view.baseDescItem2.visible = false;
                            return;
                        }
                        desc = skilllv.describe;
                    }
                    this._view.baseDescItem2.visible = true;
                    this._view.baseDescItem2.updateShow(desc, title);
                };
                XianjianBattleSkillTipsMdr.prototype.onClick = function () {
                    var proxy = this.retProxy(239 /* Xianjian */);
                    var next = proxy.getNextStage(this._showArgs.index);
                    var count = proxy.getCountByStage(this._showArgs.index, next);
                    if (count >= 4) {
                        proxy.c2s_fly_sword_operation(this._showArgs.index, 3);
                    }
                    else {
                        game.PromptBox.getIns().show(game.getLanById("general3" /* general3 */));
                    }
                };
                return XianjianBattleSkillTipsMdr;
            }(surface.SurfaceSkillTipsMdr));
            surface.XianjianBattleSkillTipsMdr = XianjianBattleSkillTipsMdr;
            __reflect(XianjianBattleSkillTipsMdr.prototype, "game.mod.surface.XianjianBattleSkillTipsMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var XianjianBuweiTipsMdr = /** @class */ (function (_super) {
                __extends(XianjianBuweiTipsMdr, _super);
                function XianjianBuweiTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", surface.XianjianBuweiTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XianjianBuweiTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(239 /* Xianjian */);
                };
                XianjianBuweiTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.onUpdateAttr, this);
                };
                XianjianBuweiTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this.updateView();
                };
                XianjianBuweiTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollV = 0;
                };
                XianjianBuweiTipsMdr.prototype.onClickBtn = function () {
                    var next = this._proxy.getBuweiNext(this._showArgs);
                    if (!mod.BagUtil.checkPropCnt(next[0], next[1], 1 /* Dialog */)) {
                        return;
                    }
                    this._proxy.c2s_fly_sword_operation(this._showArgs.index, 4, this._showArgs.pos);
                    this.hide();
                };
                XianjianBuweiTipsMdr.prototype.updateView = function () {
                    this.updateTopView();
                    this.updateMiddleView();
                    this.updateBottomView();
                };
                XianjianBuweiTipsMdr.prototype.updateTopView = function () {
                    var buwei = this._proxy.getXianjianBuwei(this._showArgs);
                    var prop = game.PropData.create(buwei.cost[0][0]);
                    var cfg = prop.cfg;
                    if (!cfg) {
                        return;
                    }
                    this._view.qualityTips.updateShow(cfg.quality);
                    this._view.icon.setData(cfg.index, 3 /* NotTips */);
                    this._view.lb_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(cfg.name, game.ColorUtil.getColorByQuality1(cfg.quality)));
                };
                XianjianBuweiTipsMdr.prototype.onUpdateAttr = function () {
                    var buwei = this._proxy.getBuwei(this._showArgs);
                    var buwei_cfg = this._proxy.getXianjianBuwei(this._showArgs);
                    var attr = buwei && buwei.attr || mod.RoleUtil.getAttr(buwei_cfg.attrs[0]);
                    this._view.baseAttrItem.updateShow(attr);
                    this._view.power.setPowerValue(attr && attr.showpower && attr.showpower.toNumber() || 0);
                };
                XianjianBuweiTipsMdr.prototype.updateMiddleView = function () {
                    var info = this._proxy.getInfo(this._showArgs.index);
                    this.onUpdateAttr();
                    var desc = "";
                    var cfgs = game.getConfigByNameId("jianfa.json" /* Jianfa */, this._showArgs.index);
                    for (var k in cfgs) {
                        var cfg = cfgs[k];
                        var bool = false;
                        if (info && info.buwei_info) {
                            for (var _i = 0, _a = info.buwei_info; _i < _a.length; _i++) {
                                var data = _a[_i];
                                if (data.index == +k) {
                                    var prop = game.GameConfig.getPropConfigById(cfg.cost[0][0]);
                                    desc += game.TextUtil.addColor((desc.length == 0 ? "" : "#N") + "[" + data.level + "\u9636]" + prop.name, 2330156 /* GREEN */);
                                    bool = true;
                                }
                            }
                        }
                        if (!bool) {
                            var prop = game.GameConfig.getPropConfigById(cfg.cost[0][0]);
                            desc += game.TextUtil.addColor((desc.length == 0 ? "" : "#N") + "[1\u9636]" + prop.name, 8618626 /* GRAY */);
                        }
                    }
                    this._view.taozhuangItem.updateShow(desc);
                    var xianjian = game.getConfigByNameId("xianjian.json" /* Xianjian */, this._showArgs.index);
                    var skill = game.getConfigByNameId("battle_skill.json" /* Skill */, xianjian.skill);
                    this._view.skillItem.updateShow(skill.describe, skill.name);
                };
                XianjianBuweiTipsMdr.prototype.updateBottomView = function () {
                    var next = this._proxy.getBuweiNext(this._showArgs);
                    this._view.img_max.visible = !next;
                    this._view.btn_up.visible = !this._view.img_max.visible;
                    var buwei_cfg = this._proxy.getXianjianBuwei(this._showArgs);
                    this._view.btn_up.setHint(this._proxy.getBuweiUp(this._showArgs.index, buwei_cfg));
                    this._view.cost.visible = !this._view.img_max.visible;
                    this._view.grp_bar.visible = !this._view.img_max.visible;
                    if (!next) {
                        return;
                    }
                    this._view.cost.setData(next);
                    var cnt = mod.BagUtil.getPropCntByIdx(next[0]);
                    this._view.bar.show(cnt, next[1], false, 0, false, 1 /* Value */);
                };
                return XianjianBuweiTipsMdr;
            }(game.EffectMdrBase));
            surface.XianjianBuweiTipsMdr = XianjianBuweiTipsMdr;
            __reflect(XianjianBuweiTipsMdr.prototype, "game.mod.surface.XianjianBuweiTipsMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var TouchEvent = egret.TouchEvent;
            var XianjianChooseMdr = /** @class */ (function (_super) {
                __extends(XianjianChooseMdr, _super);
                function XianjianChooseMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", surface.XianjianChooseView);
                    _this._headType = 408 /* Xianjian */;
                    _this.isEasyHide = true;
                    return _this;
                }
                XianjianChooseMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(239 /* Xianjian */);
                    this._listData = new ArrayCollection();
                    this._view.list.itemRenderer = mod.AvatarItem;
                    this._view.list.dataProvider = this._listData;
                };
                XianjianChooseMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClickItem);
                    addEventListener(this._view.btn_shangzhen, TouchEvent.TOUCH_TAP, this.onClickBtn);
                };
                XianjianChooseMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._selIndex = 0;
                    this._selCfg = null;
                    this.typeUpdateInfo();
                };
                XianjianChooseMdr.prototype.onHide = function () {
                    this._effIdx = 0;
                    this._lastIndex = 0;
                    _super.prototype.onHide.call(this);
                };
                XianjianChooseMdr.prototype.onClickBtn = function () {
                    this._proxy.c2s_fly_sword_into_battle(this._showArgs, this._selCfg.index);
                    this.hide();
                };
                XianjianChooseMdr.prototype.onClickItem = function (e) {
                    var index = e.itemIndex;
                    if (index == this._selIndex) {
                        return;
                    }
                    //清除选中特效
                    var datas = this._listData.source;
                    var lastData = datas[this._selIndex];
                    lastData.isSel = false;
                    this._listData.itemUpdated(lastData);
                    this._selIndex = index;
                    //选中特效
                    var curData = datas[this._selIndex];
                    curData.isSel = true;
                    this._listData.itemUpdated(curData);
                    this.indexUpdateInfo();
                };
                XianjianChooseMdr.prototype.indexUpdateInfo = function () {
                    this._selCfg = this._listData.source[this._selIndex].cfg;
                    var posInfo = this._proxy.getShangzhen(this._showArgs);
                    this._view.btn_shangzhen.visible = !posInfo || posInfo.index !== this._selCfg.index;
                    this.updatePower();
                    this.updateModel();
                    this.onUpdateSkill();
                };
                XianjianChooseMdr.prototype.onUpdateSkill = function () {
                    var skill = this._selCfg.skill;
                    this._view.suit_item.updateView(skill);
                };
                XianjianChooseMdr.prototype.updateModel = function () {
                    var index = this._selCfg.index;
                    if (index == this._lastIndex) {
                        return;
                    }
                    this._lastIndex = index;
                    if (this._effIdx) {
                        this.removeEffect(this._effIdx);
                    }
                    this._effIdx = this.addAnimate(index, this._view.grp_eff);
                    this._view.name_item.updateShow(this._selCfg.name, this._selCfg.quality);
                };
                XianjianChooseMdr.prototype.updatePower = function () {
                    var info = this._proxy.getInfo(this._selCfg.index);
                    var attr = info && info.all_attr;
                    if (!attr) {
                        attr = mod.RoleUtil.getAttr(this._selCfg.attr_id[0]);
                    }
                    var power = attr && attr.showpower ? attr.showpower : 0;
                    this._view.power.setPowerValue(power);
                };
                XianjianChooseMdr.prototype.typeUpdateInfo = function () {
                    this.updateItemList();
                    this.indexUpdateInfo();
                };
                XianjianChooseMdr.prototype.updateItemList = function () {
                    var cfgArr = this._proxy.getCfgArr();
                    var posInfo = this._proxy.getShangzhen(this._showArgs);
                    var list = [];
                    var i = 0;
                    for (var _i = 0, cfgArr_6 = cfgArr; _i < cfgArr_6.length; _i++) {
                        var cfg = cfgArr_6[_i];
                        var info = this._proxy.getInfo(cfg.index);
                        var star = info && info.star || 0;
                        var showHint = false;
                        var isSel = posInfo && posInfo.index == cfg.index || !posInfo && this._selIndex == i;
                        if (isSel) {
                            this._selIndex = i;
                        }
                        list.push({ cfg: cfg, star: star, showHint: showHint, isSel: isSel });
                        i++;
                    }
                    this._listData.replaceAll(list);
                    this._view.list.selectedIndex = this._selIndex;
                };
                return XianjianChooseMdr;
            }(game.EffectMdrBase));
            surface.XianjianChooseMdr = XianjianChooseMdr;
            __reflect(XianjianChooseMdr.prototype, "game.mod.surface.XianjianChooseMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var ArrayCollection = eui.ArrayCollection;
            var facade = base.facade;
            var XianjianGroupMdr = /** @class */ (function (_super) {
                __extends(XianjianGroupMdr, _super);
                function XianjianGroupMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", surface.XianjianGroupView);
                    return _this;
                }
                XianjianGroupMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                    this._listData = new ArrayCollection();
                    this._view.list.itemRenderer = surface.XianjianGroupItem;
                    this._view.list.dataProvider = this._listData;
                };
                XianjianGroupMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_update_shangzhen_info" /* ON_UPDATE_SHANGZHEN_INFO */, this.onUpdateView, this);
                };
                XianjianGroupMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                XianjianGroupMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XianjianGroupMdr.prototype.onUpdateView = function () {
                    var cfgArr = game.getConfigListByName("jianzhen.json" /* Jianzhen */);
                    this._listData.replaceAll(cfgArr);
                };
                return XianjianGroupMdr;
            }(game.EffectMdrBase));
            surface.XianjianGroupMdr = XianjianGroupMdr;
            __reflect(XianjianGroupMdr.prototype, "game.mod.surface.XianjianGroupMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var XianjianMainMdr = /** @class */ (function (_super) {
                __extends(XianjianMainMdr, _super);
                function XianjianMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "xianjiantubiao",
                            mdr: surface.XianjianMdr,
                            title: "xianjian_tips1" /* xianjian_tips1 */,
                            bg: "horse_bg",
                            hintTypes: ["46" /* Surface */, "18" /* Xianjian */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "xianfatubiao",
                            mdr: surface.XianjianSkillMdr,
                            title: "xianjian_tips2" /* xianjian_tips2 */,
                            bg: "jianfa_bg",
                            hintTypes: ["46" /* Surface */, "18" /* Xianjian */, "02" /* TabBtnType02 */]
                        },
                        {
                            btnType: "03" /* TabBtnType03 */,
                            icon: "jianzhentubiao",
                            mdr: surface.XianjianGroupMdr,
                            title: "xianjian_tips3" /* xianjian_tips3 */,
                            bg: "horse_bg",
                            hintTypes: ["46" /* Surface */, "18" /* Xianjian */, "03" /* TabBtnType03 */]
                        }
                    ];
                    return _this;
                }
                XianjianMainMdr.prototype.onShow = function () {
                    this._proxy = this.retProxy(190 /* Surface */);
                    this._proxy.headType = 408 /* Xianjian */;
                    _super.prototype.onShow.call(this);
                };
                return XianjianMainMdr;
            }(mod.WndBaseMdr));
            surface.XianjianMainMdr = XianjianMainMdr;
            __reflect(XianjianMainMdr.prototype, "game.mod.surface.XianjianMainMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var ItemTapEvent = eui.ItemTapEvent;
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var XianjianMdr = /** @class */ (function (_super) {
                __extends(XianjianMdr, _super);
                function XianjianMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", surface.XianjianView);
                    _this._headType = 408 /* Xianjian */;
                    return _this;
                }
                XianjianMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(239 /* Xianjian */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = mod.AvatarItem;
                    this._view.list_item.dataProvider = this._itemList;
                    this._typeList = new ArrayCollection();
                    this._view.list_type.itemRenderer = mod.TabSecondItem;
                    this._view.list_type.dataProvider = this._typeList;
                };
                XianjianMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.power2.btn_desc, TouchEvent.TOUCH_TAP, this.onClickDesc);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickStar);
                    addEventListener(this._view.btn_duanlian, TouchEvent.TOUCH_TAP, this.onClickDuanlian);
                    addEventListener(this._view.btn_jiban, TouchEvent.TOUCH_TAP, this.onClickJiban);
                    addEventListener(this._view.item_skill, TouchEvent.TOUCH_TAP, this.onClickItemSkill);
                    addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
                    addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
                    addEventListener(this._view.btn_flyRank, TouchEvent.TOUCH_TAP, this.onClickFlyRank);
                    this.onNt("on_update_xianjian_info" /* ON_UPDATE_XIANJIAN_INFO */, this.typeUpdateInfo, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePower, this);
                };
                XianjianMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._selIndex = 0;
                    this._selCfg = null;
                    this.initTypeList();
                    this.typeUpdateInfo();
                    this.updateFlyRank();
                };
                XianjianMdr.prototype.onHide = function () {
                    this._effIdx = 0;
                    this._lastIndex = 0;
                    this._flyRankTime = 0;
                    this._flyRankActInfo = null;
                    _super.prototype.onHide.call(this);
                };
                XianjianMdr.prototype.update = function (time) {
                    this.updateFlyRankTime();
                };
                XianjianMdr.prototype.updateFlyRank = function () {
                    var actInfo = this.getFlyRank();
                    this._flyRankActInfo = actInfo;
                    if (!actInfo) {
                        this._view.grp_flyRank.visible = false; //没有对应的飞升榜
                        return;
                    }
                    this._view.grp_flyRank.visible = true;
                    this._flyRankTime = actInfo.c_end_time;
                    this.updateFlyRankTime();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                //飞升榜
                XianjianMdr.prototype.getFlyRank = function () {
                    //获取对应的飞升榜
                    var index = 1450100140; //通过唯一道具id判断显示飞升榜按钮入口
                    var jumpIdx = game.FlyPropToJumpIdx[index];
                    if (!jumpIdx) {
                        return null;
                    }
                    var activityProxy = facade.retMod("27" /* Activity */).retProxy(50 /* Activity */);
                    var actList = activityProxy.getOperActList(8 /* FlyRank */);
                    var flyRankProxy = facade.retMod("27" /* Activity */).retProxy(245 /* FlyRank */);
                    for (var _i = 0, actList_1 = actList; _i < actList_1.length; _i++) {
                        var actInfo = actList_1[_i];
                        var propIndex = flyRankProxy.getRankProp(actInfo);
                        if (propIndex == index) {
                            return actInfo;
                        }
                    }
                    return null;
                };
                XianjianMdr.prototype.updateFlyRankTime = function () {
                    var leftTime = this._flyRankTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this._view.grp_flyRank.visible = false; //没有对应的飞升榜
                        return;
                    }
                    this._view.lab_flyRank.text = game.TimeUtil.formatSecond(leftTime, 'd天H时', true);
                };
                XianjianMdr.prototype.onClickFlyRank = function () {
                    mod.ViewMgr.getIns().showView("27" /* Activity */, "80" /* ActMain */, this._flyRankActInfo);
                };
                XianjianMdr.prototype.onClickDesc = function () {
                    var info = this._proxy.getInfo(this._selCfg.index);
                    var attr = info && info.all_attr;
                    mod.ViewMgr.getIns().showAttrTips(game.getLanById(game.SurfaceConfigList[this._headType] + "_attr"), attr);
                };
                XianjianMdr.prototype.onClickJiban = function () {
                    mod.ViewMgr.getIns().showView("47" /* Jiban */, "01" /* JibanMain */, "07" /* Xianjian */, true);
                };
                XianjianMdr.prototype.onClickDuanlian = function () {
                    mod.ViewMgr.getIns().showSecondPop("46" /* Surface */, "21" /* XianjianUp */, this._selCfg.index);
                };
                XianjianMdr.prototype.onClickStar = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    var param = game.GameConfig.getParamConfigById("xianjian_max_star");
                    var info = this._proxy.getInfo(this._selCfg.index);
                    var star = info && info.star || 0;
                    var cost = this._selCfg.material[star];
                    if (star >= param.value) {
                        game.PromptBox.getIns().show(game.getLanById("maxstar" /* maxstar */));
                        return;
                    }
                    if (!this._proxy.canUpStar(this._selCfg.index)) {
                        mod.BagUtil.checkPropCntUp(cost[0], cost[1]);
                        return;
                    }
                    this._proxy.c2s_fly_sword_operation(this._selCfg.index, 1, null);
                };
                XianjianMdr.prototype.onClickType = function (e) {
                    var type = this._typeDatas[e.itemIndex];
                    if (type == this._selType) {
                        return;
                    }
                    this._selType = type;
                    this._selIndex = 0;
                    this.typeUpdateInfo();
                };
                XianjianMdr.prototype.onClickItemSkill = function () {
                    var data = this._view.item_skill.data;
                    facade.showView("46" /* Surface */, "24" /* XianjianBattleSkillTips */, __assign({}, data, { index: this._selCfg.index }));
                };
                XianjianMdr.prototype.onClickItem = function (e) {
                    var index = e.itemIndex;
                    if (index == this._selIndex) {
                        return;
                    }
                    //清除选中特效
                    var datas = this._itemList.source;
                    var lastData = datas[this._selIndex];
                    lastData.isSel = false;
                    this._itemList.itemUpdated(lastData);
                    this._selIndex = index;
                    //选中特效
                    var curData = datas[this._selIndex];
                    curData.isSel = true;
                    this._itemList.itemUpdated(curData);
                    this.indexUpdateInfo();
                };
                XianjianMdr.prototype.initTypeList = function () {
                    var _this = this;
                    this._typeDatas = this._proxy.getTypes();
                    var typeDatas = this._typeDatas.map(function (v) { return { icon: "surface_type_" + _this._headType + "_" + v }; });
                    this._typeList.source = typeDatas;
                    this._selType = this._typeDatas[0];
                    this._selIndex = 0;
                    this._view.list_type.selectedIndex = this._selIndex;
                };
                XianjianMdr.prototype.typeUpdateInfo = function () {
                    this.updateItemList();
                    this.indexUpdateInfo();
                    this.updateTypeListHint();
                };
                XianjianMdr.prototype.updateItemList = function () {
                    var list = this._proxy.getListData(this._selType);
                    this._itemList.replaceAll(list);
                    var curData = this._itemList.source[this._selIndex];
                    curData.isSel = true;
                    this._itemList.itemUpdated(curData);
                };
                XianjianMdr.prototype.indexUpdateInfo = function () {
                    this._selCfg = this._itemList.source[this._selIndex].cfg;
                    this.updatePower();
                    this.updateModel();
                    this.updateStar();
                    this.onUpdateSkill();
                    this.onUpdateLevel();
                };
                XianjianMdr.prototype.onUpdateLevel = function () {
                    var info = this._proxy.getInfo(this._selCfg.index);
                    var level = info && info.level || 0;
                    this._view.grp_duanlian.visible = this._view.btn_jiban.visible = !!level;
                    this._view.lab_count.text = level + "\u7EA7";
                    this._view.btn_duanlian.setHint(this._proxy.canUpLevel(this._selCfg.index));
                    this._view.btn_jiban.setHint(this._proxy.canUpJiban(this._selCfg.index));
                };
                XianjianMdr.prototype.onUpdateSkill = function () {
                    this._view.item_skill.setData(this._selCfg.skill, "jianyi");
                };
                XianjianMdr.prototype.updatePower = function () {
                    var info = this._proxy.getInfo(this._selCfg.index);
                    var attr = info && info.all_attr;
                    if (!attr || !Object.keys(attr).length) {
                        var attrId = this._selCfg.attr_id[0];
                        attr = mod.RoleUtil.getAttr(attrId);
                    }
                    var power = attr && attr.showpower ? attr.showpower : 0;
                    this._view.power2.setPowerValue(power);
                    var godVal = attr && attr.god ? attr.god : 0;
                    this._view.god_item.updateGod(godVal);
                };
                XianjianMdr.prototype.updateModel = function () {
                    var index = this._selCfg.index;
                    if (index == this._lastIndex) {
                        return;
                    }
                    this._lastIndex = index;
                    if (this._effIdx) {
                        this.removeEffect(this._effIdx);
                    }
                    this._effIdx = this.addAnimate(index, this._view.grp_eff);
                    this._view.name_item.updateShow(this._selCfg.name, this._selCfg.quality);
                };
                XianjianMdr.prototype.updateStar = function () {
                    var param = game.GameConfig.getParamConfigById("xianjian_max_star");
                    var info = this._proxy.getInfo(this._selCfg.index);
                    var star = info && info.star || 0;
                    if (star >= param.value) {
                        this._view.btn_up.updateMaxStar();
                        this._view.btn_up.setHint(false);
                        return;
                    }
                    var tips = '';
                    if (star) {
                        var starPower = Math.floor(this._selCfg.star_power[star] / 100);
                        tips = game.StringUtil.substitute(game.getLanById("xianlv_tips26" /* xianlv_tips26 */), [game.TextUtil.addColor("+" + starPower + "%", 2330156 /* GREEN */)]);
                    }
                    var prop = this._selCfg.material[star];
                    var cnt = this._proxy.getStarPropCnt(this._headType, this._selCfg.quality, prop[0], star);
                    // let curCnt: number = BagUtil.getPropCntByIdx(prop[0]);
                    this._view.btn_up.updateCost(prop, !!star, tips, true, cnt);
                    var bool = cnt >= prop[1];
                    this._view.btn_up.setHint(bool);
                    if (bool) {
                        mod.RoleUtil.getAttrList(this._selCfg.attr_id); //用于升星成功弹窗属性展示
                    }
                };
                XianjianMdr.prototype.updateTypeListHint = function () {
                    var list = this._typeList.source;
                    var len = list ? list.length : 0;
                    var ret = false;
                    for (var i = 0; i < len; i++) {
                        var btnData = list[i];
                        var type = this._typeDatas[i];
                        var hint = this._proxy.getTypeHint(type);
                        if (hint) {
                            ret = true;
                        }
                        if (!!btnData.showHint != hint) { //过滤undefined!=false
                            btnData.showHint = hint;
                            this._typeList.itemUpdated(btnData);
                        }
                    }
                    mod.HintMgr.setHint(ret, ["46" /* Surface */, "18" /* Xianjian */, "01" /* TabBtnType01 */]);
                };
                return XianjianMdr;
            }(game.EffectMdrBase));
            surface.XianjianMdr = XianjianMdr;
            __reflect(XianjianMdr.prototype, "game.mod.surface.XianjianMdr", ["base.UpdateItem"]);
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var ItemTapEvent = eui.ItemTapEvent;
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var facade = base.facade;
            var XianjianSkillMdr = /** @class */ (function (_super) {
                __extends(XianjianSkillMdr, _super);
                function XianjianSkillMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", surface.XianjianSkillView);
                    _this._headType = 408 /* Xianjian */;
                    _this._buweis = 4;
                    return _this;
                }
                XianjianSkillMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(239 /* Xianjian */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = mod.AvatarItem;
                    this._view.list_item.dataProvider = this._itemList;
                    this._typeList = new ArrayCollection();
                    this._view.list_type.itemRenderer = mod.TabSecondItem;
                    this._view.list_type.dataProvider = this._typeList;
                };
                XianjianSkillMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.power2.btn_desc, TouchEvent.TOUCH_TAP, this.onClickDesc);
                    addEventListener(this._view.item_skill, TouchEvent.TOUCH_TAP, this.onClickItemSkill);
                    addEventListener(this._view.icon_1, TouchEvent.TOUCH_TAP, this.onClickTips);
                    addEventListener(this._view.icon_2, TouchEvent.TOUCH_TAP, this.onClickTips);
                    addEventListener(this._view.icon_3, TouchEvent.TOUCH_TAP, this.onClickTips);
                    addEventListener(this._view.icon_4, TouchEvent.TOUCH_TAP, this.onClickTips);
                    addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
                    addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
                    this.onNt("on_update_xianjian_info" /* ON_UPDATE_XIANJIAN_INFO */, this.typeUpdateInfo, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                };
                XianjianSkillMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._selIndex = 0;
                    this._selCfg = null;
                    this.initTypeList();
                    this.typeUpdateInfo();
                    this.updateTypeListHint();
                };
                XianjianSkillMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XianjianSkillMdr.prototype.onClickDesc = function () {
                    var info = this._proxy.getInfo(this._selCfg.index);
                    var attr = info && info.all_attr;
                    mod.ViewMgr.getIns().showAttrTips(game.getLanById(game.SurfaceConfigList[this._headType] + "_attr"), attr);
                };
                XianjianSkillMdr.prototype.onClickItemSkill = function () {
                    var data = this._view.item_skill.data;
                    facade.showView("46" /* Surface */, "24" /* XianjianBattleSkillTips */, __assign({}, data, { index: this._selCfg.index }));
                };
                XianjianSkillMdr.prototype.onClickType = function (e) {
                    var type = this._proxy.buwei_types[e.itemIndex];
                    if (type == this._selType) {
                        return;
                    }
                    this._selType = type;
                    this._selIndex = 0;
                    this.typeUpdateInfo();
                };
                XianjianSkillMdr.prototype.onClickItem = function (e) {
                    var index = e.itemIndex;
                    if (index == this._selIndex) {
                        return;
                    }
                    //清除选中特效
                    var datas = this._itemList.source;
                    var lastData = datas[this._selIndex];
                    lastData.isSel = false;
                    this._itemList.itemUpdated(lastData);
                    this._selIndex = index;
                    //选中特效
                    var curData = datas[this._selIndex];
                    curData.isSel = true;
                    this._itemList.itemUpdated(curData);
                    this.indexUpdateInfo();
                };
                XianjianSkillMdr.prototype.onClickTips = function (e) {
                    var curData = this._itemList.source[this._selIndex];
                    if (!curData) {
                        return;
                    }
                    if (!curData.star) {
                        game.PromptBox.getIns().show("请先激活仙剑");
                        return;
                    }
                    var pos = 0;
                    switch (e.currentTarget) {
                        case this._view.icon_1:
                            pos = 1;
                            break;
                        case this._view.icon_2:
                            pos = 2;
                            break;
                        case this._view.icon_3:
                            pos = 3;
                            break;
                        case this._view.icon_4:
                            pos = 4;
                            break;
                    }
                    mod.ViewMgr.getIns().showSecondPop("46" /* Surface */, "22" /* XianjianBuwei */, {
                        index: this._selCfg.index,
                        pos: pos
                    });
                };
                XianjianSkillMdr.prototype.initTypeList = function () {
                    var datas = this._proxy.buwei_types;
                    var typeDatas = [];
                    for (var i = 0; i < datas.length; ++i) {
                        var type = datas[i];
                        var icon = "surface_type_" + this._headType + "_" + type;
                        typeDatas.push({ icon: icon, param: type });
                    }
                    this._typeList.source = typeDatas;
                    this._view.list_type.selectedIndex = this._selIndex = 0;
                    this._selType = datas[this._view.list_type.selectedIndex];
                };
                XianjianSkillMdr.prototype.updateTypeListHint = function () {
                    var list = this._typeList.source;
                    var len = list ? list.length : 0;
                    for (var i = 0; i < len; i++) {
                        var btnData = list[i];
                        var type = this._proxy.buwei_types[i];
                        var hint = this._proxy.getTypeHintBySkill(type);
                        if (!!btnData.showHint != hint) { //过滤undefined!=false
                            btnData.showHint = hint;
                            this._typeList.itemUpdated(btnData);
                        }
                    }
                };
                XianjianSkillMdr.prototype.typeUpdateInfo = function () {
                    this.updateItemList();
                    this.indexUpdateInfo();
                };
                XianjianSkillMdr.prototype.updateItemList = function () {
                    // let cfgArr: XianjianConfig[] = this._proxy.getXianjianCfgList(this._selType, true);
                    // let list: AvatarItemData[] = [];
                    // let i: number = 0;
                    // for (let cfg of cfgArr) {
                    //     let info = this._proxy.getInfo(cfg.index);
                    //     let star: number = info && info.star || 0;
                    //     let showHint: boolean = false;
                    //     let isSel: boolean = this._selIndex == i;
                    //     list.push({cfg, star, showHint, isSel});
                    //     i++;
                    // }
                    // this._itemList.replaceAll(list);
                    var list = this._proxy.getListData(this._selType, true);
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var info = list_1[_i];
                        info.showHint = this._proxy.getItemHintBySkill(info.cfg.index);
                    }
                    this._itemList.replaceAll(list);
                    var curData = this._itemList.source[this._selIndex];
                    curData.isSel = true;
                    this._itemList.itemUpdated(curData);
                };
                XianjianSkillMdr.prototype.indexUpdateInfo = function () {
                    this._selCfg = this._itemList.source[this._selIndex].cfg;
                    this._view.lab_name.text = this._selCfg.name;
                    this._view.img_sr.source = "avatarquality" + this._selCfg.quality;
                    var cfgs = game.getConfigByNameId("jianfa.json" /* Jianfa */, this._selCfg.index);
                    for (var k in cfgs) {
                        var cfg = cfgs[k];
                        var icon = this._view["icon_" + cfg.pos];
                        var buwei = this._proxy.getBuwei({ index: this._selCfg.index, pos: cfg.pos });
                        var lv = buwei && buwei.level || 0;
                        var porp = cfg.cost[0][0];
                        icon.setData(porp, lv);
                        icon.redPoint.visible = this._proxy.getBuweiUp(this._selCfg.index, cfg);
                    }
                    var info = this._proxy.getInfo(this._selCfg.index);
                    var star = info && info.star || 0;
                    if (!star) {
                        var countStr = game.TextUtil.addEnoughColor(0, 1);
                        this._view.lab.textFlow = game.TextUtil.parseHtml("\u6FC0\u6D3B" + this._selCfg.name + "\u5F00\u542F" + countStr);
                    }
                    else {
                        var next = this._proxy.getNextStage(this._selCfg.index);
                        var count = this._proxy.getCountByStage(this._selCfg.index, next);
                        var countStr = game.TextUtil.addEnoughColor(count, this._buweis);
                        this._view.lab.textFlow = game.TextUtil.parseHtml("\u6240\u6709\u90E8\u4F4D" + next + "\u9636\u53EF\u5347\u9636" + countStr);
                    }
                    this.updatePower();
                    this.updateModel();
                    this.updateSkill();
                };
                XianjianSkillMdr.prototype.updateSkill = function () {
                    this._view.item_skill.setData(this._selCfg.skill, "");
                    this._view.item_skill.setBg("xianjian_tubiaokuang2");
                    this._view.item_skill.redPoint.visible = this._proxy.getSkillUp(this._selCfg.index);
                };
                XianjianSkillMdr.prototype.updatePower = function () {
                    var info = this._proxy.getInfo(this._selCfg.index);
                    var attr = info && info.all_attr;
                    var power = attr && attr.showpower ? attr.showpower : 0;
                    this._view.power2.setPowerValue(power);
                };
                XianjianSkillMdr.prototype.updateModel = function () {
                    var index = this._selCfg.index;
                    if (this._effIdx) {
                        this.removeEffect(this._effIdx);
                    }
                    this._effIdx = this.addAnimate(index, this._view.grp_eff);
                };
                /** 通用红点事件监听 */
                XianjianSkillMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    var roots = ["46" /* Surface */, "18" /* Xianjian */, "02" /* TabBtnType02 */];
                    if (data.node.indexOf(mod.HintMgr.getType(roots)) > -1) {
                        this.updateTypeListHint();
                    }
                };
                return XianjianSkillMdr;
            }(game.EffectMdrBase));
            surface.XianjianSkillMdr = XianjianSkillMdr;
            __reflect(XianjianSkillMdr.prototype, "game.mod.surface.XianjianSkillMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var XianjianSkillTipsMdr = /** @class */ (function (_super) {
                __extends(XianjianSkillTipsMdr, _super);
                function XianjianSkillTipsMdr() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XianjianSkillTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(239 /* Xianjian */);
                };
                XianjianSkillTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_update_artifact_info" /* ON_UPDATE_ARTIFACT_INFO */, this.updateView, this);
                };
                XianjianSkillTipsMdr.prototype.onClickAct = function () {
                    _super.prototype.onClickAct.call(this);
                    this.hide();
                };
                XianjianSkillTipsMdr.prototype.onUpdateItem = function () {
                    /**飞剑index */
                    var index = this._showArgs.index;
                    /**飞机技能槽位置 */
                    var pos = this._showArgs.pos;
                    /**飞剑技能等级 */
                    var level = this._proxy.getSkillLv(index, pos);
                    var cfg;
                    if (!level) {
                        var skill_id = this._proxy.getCfgSkill(index, pos, level + 1);
                        cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skill_id);
                        this._view.baseDescItem.updateShow(cfg.describe, "下阶效果", 10, 7835024 /* GRAY */);
                        this._view.baseDescItem2.visible = false;
                    }
                    else {
                        var skill_id = this._proxy.getCfgSkill(index, pos, level);
                        cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skill_id);
                        this._view.baseDescItem.updateShow(cfg.describe, "本阶效果", 10, 4435385 /* DEFAULT */);
                        var next_id = this._proxy.getCfgSkill(index, pos, level + 1);
                        this._view.baseDescItem2.visible = !!next_id;
                        if (this._view.baseDescItem2.visible) {
                            var next_cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, next_id);
                            this._view.baseDescItem2.updateShow(next_cfg.describe, "下阶效果", 10, 7835024 /* GRAY */);
                        }
                    }
                    this._view.lab_name.text = cfg.name;
                    this._view.power.setPowerValue(cfg.powershow);
                };
                XianjianSkillTipsMdr.prototype.onUpdateCost = function () {
                    var index = this._showArgs.index;
                    var pos = this._showArgs.pos;
                    var skill_level = this._proxy.getSkillLv(index, pos);
                    var next_id = this._proxy.getCfgSkill(index, pos, skill_level + 1);
                    if (!next_id) {
                        this.updateAct(true);
                        this._view.img_act.source = "lvseyimanjie";
                        return;
                    }
                    var cfg = game.getConfigByNameId("xianjian.json" /* Xianjian */, index);
                    var limit = cfg.skill_condition[this._showArgs.pos - 1][1];
                    var info = this._proxy.getInfo(index);
                    var level = info && info.level || 0;
                    if (limit > level) {
                        this._view.btn_act.visible = false;
                        this._view.icon.visible = false;
                        this._view.lab_limit.visible = true;
                        this._view.lab_limit.text = "\u953B\u70BC" + limit + "\u7EA7\u53EF\u6FC0\u6D3B(" + level + "/" + limit + ")";
                    }
                    else {
                        this._view.btn_act.visible = true;
                        this._view.icon.visible = true;
                        this._view.lab_limit.visible = false;
                        var lv = this._proxy.getSkillLv(index, pos);
                        this._cost = this._proxy.getSkillCost(index, lv);
                        this._view.icon.setData(this._cost);
                        this._view.icon.updateCostLab(this._cost);
                        this._view.btn_act.redPoint.visible = mod.BagUtil.checkPropCnt(this._cost[0], this._cost[1]);
                    }
                };
                return XianjianSkillTipsMdr;
            }(surface.SkillTipsMdr));
            surface.XianjianSkillTipsMdr = XianjianSkillTipsMdr;
            __reflect(XianjianSkillTipsMdr.prototype, "game.mod.surface.XianjianSkillTipsMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var surface;
        (function (surface) {
            var TouchEvent = egret.TouchEvent;
            var Handler = base.Handler;
            var XianjianUpMdr = /** @class */ (function (_super) {
                __extends(XianjianUpMdr, _super);
                function XianjianUpMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", surface.XianjianUpView);
                    _this._headType = 408 /* Xianjian */;
                    _this.isEasyHide = true;
                    return _this;
                }
                XianjianUpMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(239 /* Xianjian */);
                };
                XianjianUpMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
                    addEventListener(this._view.skill_1, TouchEvent.TOUCH_TAP, this.onClickSkill);
                    addEventListener(this._view.skill_2, TouchEvent.TOUCH_TAP, this.onClickSkill);
                    addEventListener(this._view.skill_3, TouchEvent.TOUCH_TAP, this.onClickSkill);
                    addEventListener(this._view.skill_4, TouchEvent.TOUCH_TAP, this.onClickSkill);
                    this.onNt("on_update_xianjian_info" /* ON_UPDATE_XIANJIAN_INFO */, this.onUpdateView, this);
                };
                XianjianUpMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._selCfg = game.getConfigByNameId("xianjian.json" /* Xianjian */, this._showArgs);
                    this.onUpdateView();
                };
                XianjianUpMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XianjianUpMdr.prototype.onUpdateView = function () {
                    var info = this._proxy.getInfo(this._selCfg.index);
                    var lv = info && info.level || 0;
                    this._view.lab_level.text = lv + "\u7EA7";
                    var exp = info && info.exp || 0;
                    var configStr = game.SurfaceConfigList[this._headType] + "_dengji.json";
                    var index = lv + 1;
                    var cfgs = game.getConfigByNameId(configStr, this._selCfg.quality);
                    var cfg;
                    for (var k in cfgs) {
                        var c = cfgs[k];
                        if (c.level == index) {
                            cfg = c;
                            break;
                        }
                    }
                    var upExp = cfg && cfg.exp * game.SurfacePerExp;
                    var cost = cfg && cfg.star_consume;
                    var isMax = !cfg && exp >= upExp;
                    if (!isMax) {
                        this._cost = cost[0];
                        this._view.bar.show(exp * this._cost[1], upExp * this._cost[1], false, lv);
                        this._view.btn_up.setHint(!!info && mod.BagUtil.checkPropCnt(this._cost[0], this._cost[1]));
                    }
                    else {
                        this._view.bar.showMax();
                        this._view.btn_up.setHint(false);
                    }
                    var cnt = mod.BagUtil.getPropCntByIdx(this._cost[0]);
                    this._view.icon.setData([this._cost[0], cnt]);
                    this.onUpdateAttr();
                    this.onUpdateSkill();
                };
                XianjianUpMdr.prototype.onUpdateSkill = function () {
                    for (var i = 0; i < 4; i++) {
                        var skill = this._view["skill_" + (i + 1)];
                        var pos = this._selCfg.skill_condition[i][0];
                        var skillid = this._proxy.getCfgSkill(this._selCfg.index, pos);
                        var lv = this._proxy.getSkillLv(this._selCfg.index, pos);
                        skill.setData(skillid, this._selCfg.skill_condition[i][1], lv);
                    }
                };
                XianjianUpMdr.prototype.onUpdateAttr = function () {
                    var info = this._proxy.getInfo(this._selCfg.index);
                    var attr = info && info.all_attr;
                    var power = attr && attr.showpower ? attr.showpower : 0;
                    this._view.power.setPowerValue(power);
                };
                XianjianUpMdr.prototype.onClickUp = function () {
                    var info = this._proxy.getInfo(this._selCfg.index);
                    if (!info) {
                        game.PromptBox.getIns().show(game.getLanById("not_active" /* not_active */));
                        return;
                    }
                    if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                        return;
                    }
                    this._proxy.c2s_fly_sword_operation(this._selCfg.index, 2, null);
                };
                XianjianUpMdr.prototype.onClickSkill = function (e) {
                    var _this = this;
                    var pos = 0;
                    switch (e.currentTarget) {
                        case this._view.skill_1:
                            pos = 1;
                            break;
                        case this._view.skill_2:
                            pos = 2;
                            break;
                        case this._view.skill_3:
                            pos = 3;
                            break;
                        case this._view.skill_4:
                            pos = 4;
                            break;
                    }
                    var index = this._selCfg.index;
                    var confirm = Handler.alloc(this, function () {
                        _this._proxy.c2s_fly_sword_operation(_this._selCfg.index, 6, pos);
                    });
                    mod.ViewMgr.getIns().showSecondPop("46" /* Surface */, "23" /* XianjianSkillTips */, { confirm: confirm, index: index, pos: pos });
                };
                return XianjianUpMdr;
            }(game.EffectMdrBase));
            surface.XianjianUpMdr = XianjianUpMdr;
            __reflect(XianjianUpMdr.prototype, "game.mod.surface.XianjianUpMdr");
        })(surface = mod.surface || (mod.surface = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=surface.js.map