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
        var xianfa;
        (function (xianfa) {
            var XianfaStudyTipView = /** @class */ (function (_super) {
                __extends(XianfaStudyTipView, _super);
                function XianfaStudyTipView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianfa.XianfaStudyTipSkin";
                    return _this;
                }
                return XianfaStudyTipView;
            }(eui.Component));
            xianfa.XianfaStudyTipView = XianfaStudyTipView;
            __reflect(XianfaStudyTipView.prototype, "game.mod.xianfa.XianfaStudyTipView");
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianfa;
        (function (xianfa) {
            var XianfaMod = /** @class */ (function (_super) {
                __extends(XianfaMod, _super);
                function XianfaMod() {
                    return _super.call(this, "44" /* Xianfa */) || this;
                }
                XianfaMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                XianfaMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(188 /* Xianfa */, xianfa.XianfaProxy);
                };
                XianfaMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* XianfaMain */, xianfa.XianfaMainMdr);
                    this.regMdr("02" /* XianfaSkillTip */, xianfa.XianfaSkillTipMdr);
                    this.regMdr("03" /* XianfaStudyTip */, xianfa.XianfaStudyTipMdr);
                    this.regMdr("04" /* XianfaActiveTip */, xianfa.XianfaActiveTipsMdr);
                };
                return XianfaMod;
            }(game.ModBase));
            xianfa.XianfaMod = XianfaMod;
            __reflect(XianfaMod.prototype, "game.mod.xianfa.XianfaMod");
            gso.modCls.push(XianfaMod);
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianfa;
        (function (xianfa) {
            var facade = base.facade;
            var s2c_normalskill_info = msg.s2c_normalskill_info;
            var c2s_skill_levelup = msg.c2s_skill_levelup;
            var c2s_skill_takeon = msg.c2s_skill_takeon;
            var c2s_skill_takeoff = msg.c2s_skill_takeoff;
            var s2c_normalskill_ok = msg.s2c_normalskill_ok;
            var XianfaProxy = /** @class */ (function (_super) {
                __extends(XianfaProxy, _super);
                function XianfaProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XianfaProxy.prototype.getModel = function () {
                    return this._model;
                };
                XianfaProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new xianfa.XianfaModel();
                    this.onProto(s2c_normalskill_info, this.s2c_normalskill_info, this);
                    this.onProto(s2c_normalskill_ok, this.s2c_normalskill_ok, this);
                };
                XianfaProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("xianqi" /* xianqi */) >= 0) {
                        this.updateXianfaHint();
                    }
                };
                XianfaProxy.prototype.onBagUpdateByBagType = function (n) {
                    var keys = n.body;
                    if (keys.indexOf(2 /* Material */) >= 0) {
                        this.updateXianfaHint();
                    }
                };
                /**
                 * 仙法信息
                 * @param {number} type 1-仙法
                 */
                //前端暂时没使用到
                // public c2s_normalskill_info(type: XianfaType = XianfaType.Type1): void {
                //     let msg: c2s_normalskill_info = new c2s_normalskill_info();
                //     msg.type = type;
                //     this.sendProto(msg);
                // }
                XianfaProxy.prototype.s2c_normalskill_info = function (n) {
                    var msg = n.body;
                    this.skills = [];
                    if (msg.godallskill) {
                        for (var i = 0; i < msg.godallskill.length; i++) {
                            var d = msg.godallskill[i];
                            this.skills[i] = d.index;
                        }
                    }
                    this._model.updateInfos(msg.godallskill);
                    this._model.posSkills = msg.pos_godskill;
                    this.updateXianfaHint();
                    this.sendNt("update_xianfa_info" /* UPDATE_XIANFA_INFO */);
                };
                /**
                 * 仙法升级等
                 * @param type 1仙法
                 * @param oper 1:单次 2:一键（一键不用传index）
                 * @param operType 操作类型 1升级，2升星，3精研，4激活
                 * @param index 技能编号
                 * @return
                 */
                XianfaProxy.prototype.c2s_skill_levelup = function (type, oper, operType, index) {
                    if (type === void 0) { type = 1 /* Type1 */; }
                    var msg = new c2s_skill_levelup();
                    msg.type = type;
                    msg.oper = oper;
                    msg.index = index;
                    msg.oper_type = this._model.oper = operType;
                    this.sendProto(msg);
                };
                /**
                 * 仙法穿戴
                 * @param type 1仙法
                 * @param operType 操作类型 1:单次 2:一键（一键不用传index、pos）
                 * @param pos 装配到的位置，从1开始
                 * @param index 技能编号
                 * @return
                 */
                XianfaProxy.prototype.c2s_skill_takeon = function (type, operType, pos, index) {
                    if (type === void 0) { type = 1 /* Type1 */; }
                    var msg = new c2s_skill_takeon();
                    msg.type = type;
                    msg.index = index;
                    // msg.pos = pos;               // 改由服务端计算
                    msg.oper_type = operType;
                    this.sendProto(msg);
                };
                /**
                 * 仙法卸下
                 * @param type 1仙法
                 * @param pos 装配到的位置，从1开始
                 * @return
                 */
                XianfaProxy.prototype.c2s_skill_takeoff = function (type, pos) {
                    if (type === void 0) { type = 1 /* Type1 */; }
                    var msg = new c2s_skill_takeoff();
                    msg.type = type;
                    msg.pos = pos;
                    this.sendProto(msg);
                };
                /**
                 * 操作成功返回
                 * @return
                 */
                XianfaProxy.prototype.s2c_normalskill_ok = function (n) {
                    var msg = n.body;
                    if (msg.godallskill) {
                        this._model.updateInfos([msg.godallskill], true);
                    }
                    this._model.posSkills = msg.pos_godskill;
                    this.updateXianfaHint();
                    if (msg.is_auto && msg.godallskill) {
                        this.updateOneKeyUpgradeHint();
                        facade.showView("44" /* Xianfa */, "04" /* XianfaActiveTip */, msg.godallskill);
                    }
                    if (this._model.oper == 1) {
                        mod.ViewMgr.getIns().showSuccessTips(2 /* Up */);
                    }
                    else if (this._model.oper == 2) {
                        mod.ViewMgr.getIns().showSuccessTips(11 /* Star */);
                    }
                    this._model.oper = 0;
                    this.sendNt("update_xianfa_info" /* UPDATE_XIANFA_INFO */);
                };
                ////////////////////////////////////////红点///////////////////////////////////////
                /**
                 * 仙法入口、标签页红点
                 * @returns
                 */
                XianfaProxy.prototype.updateXianfaHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670103 /* Xianfa */)) {
                        return;
                    }
                    var infos = this._model.getAllInfos();
                    if (!infos) {
                        return;
                    }
                    var hint = false;
                    for (var id in infos) {
                        hint = this.updateListItemHint(Number(id));
                        if (hint) {
                            break;
                        }
                    }
                    if (!hint) {
                        hint = this.updateOneKeyWearHint();
                    }
                    mod.HintMgr.setHint(hint, this._model.xianfaHint);
                };
                XianfaProxy.prototype.updateOneKeyWearHint = function () {
                    var hint = this.getOneKeyWearHint();
                    mod.HintMgr.setHint(hint, this._model.oneKeyWearHint);
                    return hint;
                };
                /**
                 * 一键穿戴红点
                 * @returns
                 */
                XianfaProxy.prototype.getOneKeyWearHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670103 /* Xianfa */)) {
                        return false;
                    }
                    var hint = false;
                    var infos = this._model.getAllInfos();
                    if (!infos) {
                        return false;
                    }
                    var allWearInfos = this._model.getAllWearInfos();
                    if (Object.keys(infos).length > allWearInfos.length && allWearInfos.length < game.XianfaSkillNum) {
                        return true;
                    }
                    var minPower = 0;
                    for (var _i = 0, allWearInfos_1 = allWearInfos; _i < allWearInfos_1.length; _i++) {
                        var wearInfo = allWearInfos_1[_i];
                        if (wearInfo && (wearInfo.power < minPower || !minPower)) {
                            minPower = wearInfo.power;
                        }
                    }
                    for (var id in infos) {
                        var info = infos[id];
                        var isWear = this._model.isWear(info.index);
                        if (isWear) {
                            continue;
                        }
                        if (info.power > minPower) {
                            hint = true;
                            break;
                        }
                    }
                    return hint;
                };
                /**
                 * 一键升级红点
                 * @returns
                 */
                XianfaProxy.prototype.updateOneKeyUpgradeHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670103 /* Xianfa */)) {
                        return false;
                    }
                    var hint = false;
                    for (var i = 0; i < game.XianfaSkillNum; i++) {
                        var pos = i + 1;
                        var info = this._model.getPosInfo(pos);
                        if (!info) {
                            continue;
                        }
                        hint = this.updateUpgradeHint(info.index);
                        if (hint) {
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.oneKeyUpgradeHint);
                    return hint;
                };
                /**
                 * 单个激活红点，仙法是自动激活，无需红点
                 * @returns
                 */
                // public updateActiveHint(): boolean {
                //     if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Xianfa)){
                //         return false;
                //     }
                //     let hint = false;
                //     return hint;
                // }
                /**
                 * 仙法列表的单个仙法红点
                 * @returns
                 */
                XianfaProxy.prototype.updateListItemHint = function (id) {
                    var hint = this.updateUpgradeHint(id) || this.updateUpStarHint(id) || this.updateStudyHint(id);
                    return hint;
                };
                /**
                 * 单个升级红点
                 * @returns
                 */
                XianfaProxy.prototype.updateUpgradeHint = function (id) {
                    var info = this._model.getInfo(id);
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670103 /* Xianfa */) || !info) {
                        return false;
                    }
                    var hint = false;
                    var cfg = this._model.getXianfaCfg(id);
                    if (!cfg) {
                        return false;
                    }
                    var cost = this._model.getUpgradeCost(info.lv + 1, cfg.skill_quality);
                    if (!cost.length) {
                        return false;
                    }
                    var isEnough = mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                    hint = isEnough && !this._model.isMaxLv(id, info.lv); // 消耗足够，且未满级
                    return hint;
                };
                /**
                 * 单个升星红点
                 * @returns
                 */
                XianfaProxy.prototype.updateUpStarHint = function (id) {
                    var info = this._model.getInfo(id);
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670103 /* Xianfa */) || !info) {
                        return false;
                    }
                    var hint = false;
                    var cost = this._model.getUpStarCost(id);
                    if (!cost.length) {
                        return false;
                    }
                    var isEnough = mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                    hint = isEnough && this._model.isMaxLv(id, info.lv) && !this._model.isMaxStar(id); // 消耗足够，且已满级未满星
                    return hint;
                };
                /**
                 * 单个精研红点
                 * @returns
                 */
                XianfaProxy.prototype.updateStudyHint = function (id) {
                    var info = this._model.getInfo(id);
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670103 /* Xianfa */) || !info) {
                        return false;
                    }
                    var hint = false;
                    var cfg = this._model.getXianfaCultivateCfg(info.cultivate_level + 1);
                    var cfg1 = this._model.getXianfaCfg(id);
                    var cost = this._model.getStudyCost(info.cultivate_level + 1);
                    if (!cfg || !cost.length) {
                        return false;
                    }
                    var isEnough = mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                    hint = isEnough && info.lv >= cfg.yanxi_condition[cfg1.skill_quality - 1] && !this._model.isMaxStudy(id); // 消耗足够，且等级达到精研未满级
                    return hint;
                };
                Object.defineProperty(XianfaProxy.prototype, "posSkills", {
                    get: function () {
                        return this._model.posSkills;
                    },
                    enumerable: true,
                    configurable: true
                });
                return XianfaProxy;
            }(game.ProxyBase));
            xianfa.XianfaProxy = XianfaProxy;
            __reflect(XianfaProxy.prototype, "game.mod.xianfa.XianfaProxy", ["game.mod.IXianfaProxy", "base.IProxy"]);
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianfa;
        (function (xianfa) {
            var XianfaActiveTipsView = /** @class */ (function (_super) {
                __extends(XianfaActiveTipsView, _super);
                function XianfaActiveTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianfa.XianfaActiveTipsSkin";
                    return _this;
                }
                return XianfaActiveTipsView;
            }(eui.Component));
            xianfa.XianfaActiveTipsView = XianfaActiveTipsView;
            __reflect(XianfaActiveTipsView.prototype, "game.mod.xianfa.XianfaActiveTipsView");
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianfa;
        (function (xianfa) {
            var facade = base.facade;
            var XianfaItem = /** @class */ (function (_super) {
                __extends(XianfaItem, _super);
                function XianfaItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianfa.XianfaItemSkin";
                    _this.redPoint.visible = false;
                    _this._proxy = facade.retMod("44" /* Xianfa */).retProxy(188 /* Xianfa */);
                    _this._model = _this._proxy.getModel();
                    _this.data = { cfg: null, info: null };
                    return _this;
                }
                /**
                 * @param value 0-add，1-normal，2-normal2，3-normal3，4-normal4
                 */
                XianfaItem.prototype.setData = function (cfg, info, state) {
                    if (state === void 0) { state = 1; }
                    this.data.cfg = cfg;
                    this.data.info = info;
                    this.state = state;
                    if (!this.data.cfg) {
                        return;
                    }
                    this.img_quality_bg.source = "xf_quality_circle_" + this.data.cfg.skill_quality;
                    this.img_buff.source = (this.data.cfg.skill_heading > 0) ? "xf_buff_" + this.data.cfg.skill_heading : null;
                    this.lab_name.text = this._model.getXianfaShortName(this.data.cfg);
                    var skillId = this.data.cfg.index;
                    var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                    this.img_skill.source = skillCfg.icon;
                    this.lab_lv.text = (this.data.info && this.data.info.lv || 0) + "\u7EA7";
                };
                Object.defineProperty(XianfaItem.prototype, "state", {
                    set: function (value) {
                        if (value == 0) {
                            this.currentState = "add";
                        }
                        else {
                            this.currentState = "normal" + value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianfaItem.prototype, "isWear", {
                    get: function () {
                        return !!this.data.info;
                    },
                    enumerable: true,
                    configurable: true
                });
                return XianfaItem;
            }(eui.Component));
            xianfa.XianfaItem = XianfaItem;
            __reflect(XianfaItem.prototype, "game.mod.xianfa.XianfaItem");
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianfa;
        (function (xianfa) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var XianfaSkillItem = /** @class */ (function (_super) {
                __extends(XianfaSkillItem, _super);
                function XianfaSkillItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianfa.XianfaSkillItemSkin";
                    _this.redPoint.visible = false;
                    _this._proxy = facade.retMod("44" /* Xianfa */).retProxy(188 /* Xianfa */);
                    _this._model = _this._proxy.getModel();
                    return _this;
                }
                XianfaSkillItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this, this.onClick, this);
                };
                XianfaSkillItem.prototype.setData = function (d) {
                    this.data = d;
                };
                XianfaSkillItem.prototype.dataChanged = function () {
                    var isActived = !!this.data.info;
                    this.currentState = isActived ? "unlock" : "lock";
                    this.img_quality_bg.source = "xf_quality_rect_" + this.data.cfg.skill_quality;
                    this.img_buff.source = (this.data.cfg.skill_heading > 0) ? "xf_buff_" + this.data.cfg.skill_heading : null;
                    var skillId = this.data.cfg.index;
                    var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                    this.img_skill.source = game.ResUtil.getBigIcon(skillCfg.icon);
                    this.lab_name.text = this._model.getXianfaShortName(this.data.cfg);
                    if (isActived) {
                        this.img_is_wear.visible = this._model.isWear(this.data.cfg.index);
                        this.lab_lv.text = this.data.info.lv + "";
                        this.star.updateStar(this.data.star, 5);
                    }
                    else {
                        this.lab_lv.text = "0";
                        this.lab_jump.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(this.data.cfg.skip_txt, 16773203 /* YELLOW */, ""));
                    }
                    var hint = this._proxy.updateListItemHint(this.data.cfg.index);
                    this.redPoint.visible = hint;
                    this.cacheAsBitmap = true;
                };
                Object.defineProperty(XianfaSkillItem.prototype, "isActive", {
                    get: function () {
                        return !!this.data.info;
                    },
                    enumerable: true,
                    configurable: true
                });
                XianfaSkillItem.prototype.onClick = function (e) {
                    if (e.target == this.lab_jump) { // 功能跳转
                        mod.ViewMgr.getIns().showViewByID(this.data.cfg.skip_ui);
                    }
                    else { // 打开仙法技能
                        mod.ViewMgr.getIns().showSecondPop("44" /* Xianfa */, "02" /* XianfaSkillTip */, this.data.cfg.index);
                    }
                };
                return XianfaSkillItem;
            }(mod.BaseListenerRenderer));
            xianfa.XianfaSkillItem = XianfaSkillItem;
            __reflect(XianfaSkillItem.prototype, "game.mod.xianfa.XianfaSkillItem");
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianfa;
        (function (xianfa) {
            var XianfaSkillTipView = /** @class */ (function (_super) {
                __extends(XianfaSkillTipView, _super);
                function XianfaSkillTipView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianfa.XianfaSkillTipSkin";
                    _this.touchEnabled = false;
                    _this.grp_role_eff.touchEnabled = false;
                    return _this;
                }
                return XianfaSkillTipView;
            }(eui.Component));
            xianfa.XianfaSkillTipView = XianfaSkillTipView;
            __reflect(XianfaSkillTipView.prototype, "game.mod.xianfa.XianfaSkillTipView");
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianfa;
        (function (xianfa) {
            var XianfaModel = /** @class */ (function () {
                function XianfaModel() {
                    /**
                     * 所有已激活的仙法信息
                     */
                    this._infos = {};
                    this._posSkills = []; // 各槽位已穿戴的技能id，0-没有穿戴
                    this._showXianfaIdArrs = []; // 需显示的仙法，每个 type 只存其中一个技能
                    this.xianfaHint = ["44" /* Xianfa */, "01" /* XianfaMain */ + "01" /* BtnXianfa */]; //仙法入口、标签页红点
                    this.oneKeyUpgradeHint = ["44" /* Xianfa */, "01" /* XianfaMain */ + "01" /* BtnXianfa */, "22" /* XianfaOneKeyUpgrade */]; //仙法一键升级红点
                    this.oneKeyWearHint = ["44" /* Xianfa */, "01" /* XianfaMain */ + "01" /* BtnXianfa */, "23" /* XianfaOneKeyWear */]; //仙法一键穿戴红点
                }
                XianfaModel.prototype.updateInfos = function (value, flag) {
                    if (!value || value.length == 0) {
                        return;
                    }
                    if (!this._infos) {
                        this._infos = {};
                    }
                    if (!this._showXianfaIds) {
                        this.setCfgs();
                    }
                    this._showXianfaIdArrs = [];
                    if (this.isInUpStar && value.length > 0) {
                        var skill = value[0];
                        if (!skill || !skill.index) {
                            return;
                        }
                        for (var id in this._infos) {
                            var skill1 = this._infos[id];
                            if (skill1.index_type == skill.index_type) {
                                delete this._infos[id];
                                break;
                            }
                        }
                        this._infos[skill.index] = skill;
                        this._showXianfaIds[skill.index_type] = skill.index;
                        // this.isInUpStar = false;
                    }
                    else {
                        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                            var skill = value_1[_i];
                            if (!skill || !skill.index) {
                                break;
                            }
                            this._infos[skill.index] = skill;
                            this._showXianfaIds[skill.index_type] = skill.index;
                        }
                    }
                };
                Object.defineProperty(XianfaModel.prototype, "posSkills", {
                    get: function () {
                        return this._posSkills;
                    },
                    set: function (value) {
                        if (!value) {
                            return;
                        }
                        this._posSkills = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 所有已激活的仙法
                 * @returns
                 */
                XianfaModel.prototype.getAllInfos = function () {
                    return this._infos;
                };
                /**
                 * 所有已穿戴的仙法
                 * @returns
                 */
                XianfaModel.prototype.getAllWearInfos = function () {
                    if (!this._posSkills || !this._posSkills.length) {
                        return [];
                    }
                    var infos = [];
                    for (var _i = 0, _a = this._posSkills; _i < _a.length; _i++) {
                        var id = _a[_i];
                        if (!id) {
                            continue;
                        }
                        var info = this.getInfo(id);
                        infos.push(info);
                    }
                    return infos;
                };
                /**
                 * 取指定仙法信息（只含已激活的）
                 * @param id
                 * @returns null-未激活
                 */
                XianfaModel.prototype.getInfo = function (id) {
                    return this._infos && this._infos[id] || null;
                };
                /**
                 * 取指定仙法信息
                 * @param type
                 * @returns null-未激活
                 */
                XianfaModel.prototype.getInfoByType = function (type) {
                    if (!this._showXianfaIds) {
                        this.setCfgs();
                    }
                    var id = this._showXianfaIds[type];
                    return this.getInfo(id);
                };
                /**
                 * 取槽位的仙法信息
                 * @param pos 槽位，1~6
                 * @returns
                 */
                XianfaModel.prototype.getPosInfo = function (pos) {
                    if (!this._infos) {
                        return null;
                    }
                    var id = this._posSkills[pos - 1];
                    if (id == 0) {
                        return null;
                    }
                    return this._infos[id] || null;
                };
                XianfaModel.prototype.isWear = function (id) {
                    return this._posSkills.indexOf(id) != -1;
                };
                XianfaModel.prototype.getWearPos = function (id) {
                    return this._posSkills.indexOf(id) + 1;
                };
                Object.defineProperty(XianfaModel.prototype, "totalPower", {
                    get: function () {
                        if (!this._infos) {
                            return 0;
                        }
                        var power = 0;
                        for (var id in this._infos) {
                            var info = this._infos[id];
                            power += info.power;
                        }
                        return power;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 取仙法的星级
                 * @param id
                 * @returns
                 */
                XianfaModel.prototype.getStarCnt = function (id) {
                    var info = this.getInfo(id);
                    return info ? id % 10 : 0; // 未激活时为0
                };
                // ----------------------- 配置数据 -----------------------
                XianfaModel.prototype.setCfgs = function () {
                    this._allXianfaCfg = {};
                    this._showXianfaIds = {};
                    var cfgs = game.getConfigListByName("xianfa_skill_init.json" /* XianfaSkillInit */);
                    for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                        var cfg = cfgs_1[_i];
                        if (cfg.skill_type != 1 /* Type1 */) { // 非仙法技能
                            continue;
                        }
                        this._allXianfaCfg[cfg.index] = cfg;
                        if (cfg.activate_material) {
                            this._showXianfaIds[cfg.type] = cfg.index;
                        }
                    }
                };
                Object.defineProperty(XianfaModel.prototype, "showXianfaIds", {
                    get: function () {
                        if (!this._showXianfaIds) {
                            this.setCfgs();
                        }
                        if (!this._showXianfaIdArrs || this._showXianfaIdArrs.length == 0) {
                            this._showXianfaIdArrs = [];
                            for (var type in this._showXianfaIds) {
                                this._showXianfaIdArrs.push(this._showXianfaIds[type]);
                            }
                        }
                        return this._showXianfaIdArrs;
                    },
                    enumerable: true,
                    configurable: true
                });
                XianfaModel.prototype.getXianfaCfg = function (id) {
                    if (!this._allXianfaCfg) {
                        this.setCfgs();
                    }
                    return this._allXianfaCfg[id] || null;
                };
                XianfaModel.prototype.getXianfaLevelCfg = function (xianfaLv) {
                    var cfg = game.getConfigByNameId("xianfa_skill_level.json" /* XianfaSkillLevel */, xianfaLv);
                    return cfg;
                };
                XianfaModel.prototype.getXianfaCultivateCfg = function (studyLv) {
                    var cfg = game.getConfigByNameId("xianfa_skill_cultivate.json" /* XianfaSkillCultivate */, studyLv);
                    return cfg;
                };
                XianfaModel.prototype.getSkillShowCfg = function (id) {
                    var cfg = this.getXianfaCfg(id);
                    if (!cfg) {
                        return null;
                    }
                    var skillShowCfg = game.getConfigByNameId("skill_show.json" /* SkillShow */, cfg.effects);
                    return skillShowCfg;
                };
                XianfaModel.prototype.getXianfaShortName = function (cfg) {
                    if (!cfg) {
                        return "";
                    }
                    var name = cfg.name.split("·");
                    return name && name.length ? name[name.length - 1].trim() : cfg.name;
                };
                /**
                 * 升级消耗
                 * @param xianfaLv 待升级到的等级
                 * @param quality 品质，1-4
                 * @returns
                 */
                XianfaModel.prototype.getUpgradeCost = function (xianfaLv, quality) {
                    var cfg = this.getXianfaLevelCfg(xianfaLv);
                    if (!cfg) {
                        return [];
                    }
                    return (quality >= 1 && quality <= cfg.level_cost.length) ? cfg.level_cost[quality - 1] : cfg.level_cost[0];
                };
                /**
                 * 升星消耗
                 * @param id
                 * @returns
                 */
                XianfaModel.prototype.getUpStarCost = function (id) {
                    var cfg = this.getXianfaCfg(id);
                    if (!cfg) {
                        return [];
                    }
                    return cfg.upgrade_material && cfg.upgrade_material.length >= 1 ? cfg.upgrade_material[0] : [];
                };
                /**
                 * 精研消耗
                 * @param studyLv
                 * @returns
                 */
                XianfaModel.prototype.getStudyCost = function (studyLv) {
                    var cfg = this.getXianfaCultivateCfg(studyLv);
                    if (!cfg) {
                        return [];
                    }
                    return cfg.yanxi_cost && cfg.yanxi_cost.length >= 1 ? cfg.yanxi_cost[0] : [];
                };
                /**
                 * 等级属性
                 * @param xianfaLv
                 * @param quality 品质，1-4
                 * @returns
                 */
                XianfaModel.prototype.getLevelAttr = function (xianfaLv, quality) {
                    var cfg = this.getXianfaLevelCfg(xianfaLv);
                    return (quality >= 1 && quality <= cfg.level_value.length) ? cfg.level_value[quality - 1] : cfg.level_value[0];
                };
                /**
                 * 取最近的经验效果对应的精研配置
                 * @param studyLv
                 * @returns
                 */
                XianfaModel.prototype.getStudyEffCfg = function (studyLv) {
                    var cfgRtn;
                    var cfgs = game.getConfigListByName("xianfa_skill_cultivate.json" /* XianfaSkillCultivate */);
                    for (var _i = 0, cfgs_2 = cfgs; _i < cfgs_2.length; _i++) {
                        var cfg = cfgs_2[_i];
                        if (cfg.cultivate_level < studyLv) {
                            continue;
                        }
                        if (cfg.xianfa_jingyan > 0) {
                            cfgRtn = cfg;
                            break;
                        }
                    }
                    return cfgRtn;
                };
                // ----------------------- 其他 -----------------------
                XianfaModel.prototype.isMaxLv = function (id, lv) {
                    var b = false;
                    var cfg = this.getXianfaCfg(id);
                    b = cfg && lv >= cfg.max_level;
                    return b;
                };
                XianfaModel.prototype.isMaxStar = function (id) {
                    var star = this.getStarCnt(id);
                    return star >= 5;
                };
                XianfaModel.prototype.isMaxStudy = function (id) {
                    var info = this.getInfo(id);
                    return info && info.cultivate_level >= 5;
                };
                return XianfaModel;
            }());
            xianfa.XianfaModel = XianfaModel;
            __reflect(XianfaModel.prototype, "game.mod.xianfa.XianfaModel");
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianfa;
        (function (xianfa) {
            var XianfaView = /** @class */ (function (_super) {
                __extends(XianfaView, _super);
                function XianfaView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianfa.XianfaSkin";
                    return _this;
                }
                return XianfaView;
            }(eui.Component));
            xianfa.XianfaView = XianfaView;
            __reflect(XianfaView.prototype, "game.mod.xianfa.XianfaView");
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianfa;
        (function (xianfa) {
            var XianfaMainMdr = /** @class */ (function (_super) {
                __extends(XianfaMainMdr, _super);
                function XianfaMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* BtnXianfa */,
                            openIdx: 1041670103 /* Xianfa */,
                            icon: "ui_tab_xianfa_",
                            title: "xianfa_1" /* xianfa_1 */,
                            bg: "xianfa_bg",
                            mdr: xianfa.XianfaMdr,
                            hintTypes: ["44" /* Xianfa */, "01" /* XianfaMain */ + "01" /* BtnXianfa */],
                        },
                    ];
                    return _this;
                }
                return XianfaMainMdr;
            }(mod.WndBaseMdr));
            xianfa.XianfaMainMdr = XianfaMainMdr;
            __reflect(XianfaMainMdr.prototype, "game.mod.xianfa.XianfaMainMdr");
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianfa;
        (function (xianfa) {
            var Tween = base.Tween;
            var Sine = base.Sine;
            var Handler = base.Handler;
            var TouchEvent = egret.TouchEvent;
            var Cubic = base.Cubic;
            var XianfaActiveTipsMdr = /** @class */ (function (_super) {
                __extends(XianfaActiveTipsMdr, _super);
                function XianfaActiveTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianfa.XianfaActiveTipsView);
                    _this.isEasyHide = false;
                    return _this;
                }
                XianfaActiveTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(188 /* Xianfa */);
                    this._model = this._proxy.getModel();
                };
                XianfaActiveTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(gso.gameStage, TouchEvent.TOUCH_TAP, this.onClick);
                };
                XianfaActiveTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._isPlayed = false;
                    this.updateShow();
                    this.showTypeTween();
                };
                XianfaActiveTipsMdr.prototype.onHide = function () {
                    this.removeTypeTween();
                    this.removeBgTween();
                    _super.prototype.onHide.call(this);
                };
                //点击界面执行动画
                XianfaActiveTipsMdr.prototype.onClick = function () {
                    if (!this._isPlayed) {
                        return;
                    }
                    this._isPlayed = false;
                    this.showBgTween();
                    this.playIconFly();
                };
                XianfaActiveTipsMdr.prototype.updateShow = function () {
                    this._info = this._showArgs;
                    if (!this._info) {
                        return;
                    }
                    var cfg = this._model.getXianfaCfg(this._info.index);
                    this._cfg = cfg;
                    this._view.skill.setData(cfg, this._info, 4);
                    this._view.skill.visible = true;
                    this._view.power.setPowerValue(this._info.power);
                    this._view.img_bg.alpha = 1;
                };
                XianfaActiveTipsMdr.prototype.showTypeTween = function () {
                    var _this = this;
                    this.removeTypeTween();
                    this._view.grp_type.visible = false;
                    this._view.grp_type.scaleX = this._view.grp_type.scaleY = 0.1;
                    Tween.get(this._view.grp_type)
                        .delay(500)
                        .exec(Handler.alloc(this, function () {
                        _this._view.grp_type.visible = true;
                        _this._isPlayed = true;
                    }))
                        .to({ scaleX: 1, scaleY: 1 }, 300, null, Sine.easeIn);
                };
                XianfaActiveTipsMdr.prototype.removeTypeTween = function () {
                    Tween.remove(this._view.grp_type);
                };
                XianfaActiveTipsMdr.prototype.showBgTween = function () {
                    this.removeBgTween();
                    Tween.get(this._view.img_bg)
                        .to({ alpha: 0 }, 1000, null, Cubic.easeIn);
                };
                XianfaActiveTipsMdr.prototype.removeBgTween = function () {
                    Tween.remove(this._view.img_bg);
                };
                XianfaActiveTipsMdr.prototype.playIconFly = function () {
                    this._view.skill.visible = false;
                    var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, this._cfg.index);
                    var imgSource = skillCfg.icon;
                    var startPosX = this._view.skill.x + this._view.skill.img_skill.x;
                    var startPosY = this._view.skill.y + this._view.skill.img_skill.y;
                    var info = {
                        imgSource: imgSource,
                        layer: game.Layer.modal,
                        startPosX: startPosX,
                        startPosY: startPosY,
                        type: 1 /* Xianfa */,
                        handler: Handler.alloc(this, this.hide),
                        imgWidth: 82,
                        imgHeight: 82
                    };
                    this.sendNt("on_icon_image_fly" /* ON_ICON_IMAGE_FLY */, info);
                };
                return XianfaActiveTipsMdr;
            }(game.EffectMdrBase));
            xianfa.XianfaActiveTipsMdr = XianfaActiveTipsMdr;
            __reflect(XianfaActiveTipsMdr.prototype, "game.mod.xianfa.XianfaActiveTipsMdr");
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianfa;
        (function (xianfa) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var Handler = base.Handler;
            var XianfaMdr = /** @class */ (function (_super) {
                __extends(XianfaMdr, _super);
                function XianfaMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianfa.XianfaView);
                    return _this;
                }
                XianfaMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(188 /* Xianfa */);
                    this._model = this._proxy.getModel();
                    this._listData = new ArrayCollection();
                    this._view.list_skill.dataProvider = this._listData;
                    this._view.list_skill.itemRenderer = xianfa.XianfaSkillItem;
                };
                XianfaMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                    //this.onNt(RoleEvent.ON_ROLE_UPDATE, this.updateCost, this);
                    this.onNt("update_xianfa_info" /* UPDATE_XIANFA_INFO */, this.updateInfo, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_wear_one_key, TouchEvent.TOUCH_TAP, this.onWearOneKey);
                    addEventListener(this._view.btn_upgrade_one_key, TouchEvent.TOUCH_TAP, this.onUpgradeOneKey);
                    for (var i = 0; i < game.XianfaSkillNum; i++) {
                        var item = this._view["item" + i];
                        addEventListener(item, TouchEvent.TOUCH_TAP, this.onClickItem);
                    }
                };
                XianfaMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateInfo();
                    this.showGuide();
                };
                XianfaMdr.prototype.onHide = function () {
                    mod.GuideMgr.getIns().clear(18 /* XianfaOneUp */); //清除指引
                    _super.prototype.onHide.call(this);
                };
                XianfaMdr.prototype.updateInfo = function () {
                    this._view.power.setPowerValue(this._model.totalPower);
                    this.updateCost();
                    this.updateItem();
                    this.updateList();
                    this.updateHint();
                };
                XianfaMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("xianqi" /* xianqi */) >= 0) {
                        this.updateInfo();
                    }
                };
                XianfaMdr.prototype.updateCost = function () {
                    var cost = this._model.getUpgradeCost(1, 1);
                    this._cost = cost;
                    this._view.cost.updateShow(cost);
                    var cnt = mod.BagUtil.getPropCntByIdx(cost[0]);
                    this._view.cost.setLabCost(game.StringUtil.getHurtNumStr(cnt));
                    this._propData = game.PropData.create(cost[0], cost[1]);
                };
                XianfaMdr.prototype.updateItem = function () {
                    var item = null;
                    for (var i = 0; i < game.XianfaSkillNum; i++) {
                        item = this._view["item" + i];
                        item.pos = i + 1;
                        var info = this._model.getPosInfo(i + 1);
                        var cfg = info ? this._model.getXianfaCfg(info.index) : null;
                        item.setData(cfg, info, info ? 1 : 0);
                    }
                };
                XianfaMdr.prototype.updateList = function () {
                    var ids = this._model.showXianfaIds;
                    var list = [];
                    for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                        var id = ids_1[_i];
                        var cfg = this._model.getXianfaCfg(id);
                        if (!cfg) {
                            continue;
                        }
                        var info = this._model.getInfo(cfg.index);
                        var isWear = info ? this._model.isWear(id) : false;
                        var sort = 0;
                        if (info) {
                            sort = isWear ? -100 : -10;
                        }
                        else {
                            sort = cfg.sort;
                        }
                        var data = {
                            cfg: cfg,
                            info: info,
                            star: info ? this._model.getStarCnt(id) : 0,
                            sort: sort
                        };
                        if (cfg.show == 1) {
                            list.push(data);
                        }
                        else if (info || cfg.activate_material.length && cfg.activate_material[0].length
                            && mod.BagUtil.getPropCntByIdx(cfg.activate_material[0][0])) {
                            list.push(data);
                        }
                    }
                    list.sort(function (a, b) {
                        if (a.sort < 0 && b.sort < 0) {
                            if (a.sort != b.sort) {
                                return a.sort - b.sort;
                            }
                            if (a.cfg.skill_quality != b.cfg.skill_quality) {
                                return b.cfg.skill_quality - a.cfg.skill_quality;
                            }
                            if (a.star != b.star) {
                                return b.star - a.star;
                            }
                            return b.info.lv - a.info.lv;
                        }
                        return a.sort - b.sort;
                    });
                    this._listData.replaceAll(list);
                };
                XianfaMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    if (data.node == mod.HintMgr.getType(this._model.oneKeyUpgradeHint)) {
                        this._view.btn_upgrade_one_key.setHint(data.value);
                    }
                    else if (data.node == mod.HintMgr.getType(this._model.oneKeyWearHint)) {
                        this._view.btn_wear_one_key.setHint(data.value);
                    }
                };
                XianfaMdr.prototype.updateHint = function () {
                    var upgradeHint = this._proxy.updateOneKeyUpgradeHint();
                    this._view.btn_upgrade_one_key.setHint(upgradeHint);
                    this._isCanUpgrade = upgradeHint;
                    var wearHint = this._proxy.getOneKeyWearHint();
                    this._view.btn_wear_one_key.setHint(wearHint);
                    this._isCanWear = wearHint;
                };
                XianfaMdr.prototype.onClickItem = function (e) {
                    var item = e.currentTarget;
                    if (!item.isWear) {
                        game.PromptBox.getIns().show("未装配仙法技能");
                        return;
                    }
                    if (!item.data.cfg) {
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("44" /* Xianfa */, "02" /* XianfaSkillTip */, item.data.cfg.index);
                };
                XianfaMdr.prototype.onWearOneKey = function () {
                    if (!this._isCanWear) {
                        game.PromptBox.getIns().show("无更好的技能可佩戴");
                        return;
                    }
                    this._proxy.c2s_skill_takeon(1 /* Type1 */, 2);
                };
                XianfaMdr.prototype.onUpgradeOneKey = function () {
                    var enough = false;
                    // let infos: {[id: string]: skill_item} = this._model.getAllInfos();
                    // for (let id in infos) {
                    //     let info = infos[id];
                    //     if(!info) {
                    //         continue;
                    //     }
                    //     let cfg = this._model.getXianfaCfg(Number(id));
                    //     let curLv = info ? info.lv : 0;
                    //     let cost = this._model.getUpgradeCost(info ? curLv + 1 : 1, cfg.skill_quality);
                    //     if(!cost.length) {
                    //         continue;
                    //     }
                    //     enough = BagUtil.checkPropCnt(cost[0], cost[1]);          // 消耗足够
                    //     if(enough) {
                    //         break;
                    //     }
                    // }
                    for (var i = 0; i < game.XianfaSkillNum; i++) {
                        var pos = i + 1;
                        var info = this._model.getPosInfo(pos);
                        if (!info) {
                            continue;
                        }
                        var cfg = this._model.getXianfaCfg(info.index);
                        var curLv = info.lv;
                        var cost = this._model.getUpgradeCost(curLv + 1, cfg.skill_quality);
                        if (!cost.length) {
                            continue;
                        }
                        enough = mod.BagUtil.checkPropCnt(cost[0], cost[1]); // 消耗足够
                        if (enough) {
                            break;
                        }
                    }
                    if (!enough) {
                        // PromptBox.getIns().show("材料不足");
                        mod.ViewMgr.getIns().showGainWaysTips(this._cost[0]);
                        return;
                    }
                    else if (!this._isCanUpgrade) {
                        game.PromptBox.getIns().show("升星佩戴仙法可继续升级");
                        return;
                    }
                    this._proxy.c2s_skill_levelup(1 /* Type1 */, 2, 1);
                };
                //-------------------------------------指引相关------------------------------------------------
                XianfaMdr.prototype.showGuide = function () {
                    mod.GuideMgr.getIns().show(18 /* XianfaOneUp */, this._view.btn_upgrade_one_key, Handler.alloc(this, this.onUpgradeOneKey)); //指引
                };
                return XianfaMdr;
            }(game.EffectMdrBase));
            xianfa.XianfaMdr = XianfaMdr;
            __reflect(XianfaMdr.prototype, "game.mod.xianfa.XianfaMdr");
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianfa;
        (function (xianfa) {
            var TouchEvent = egret.TouchEvent;
            var Handler = base.Handler;
            var SkillEftMgr = game.scene.SkillEftMgr;
            var XianfaSkillTipMdr = /** @class */ (function (_super) {
                __extends(XianfaSkillTipMdr, _super);
                function XianfaSkillTipMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianfa.XianfaSkillTipView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XianfaSkillTipMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.verticalCenter = 0;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(188 /* Xianfa */);
                    this._model = this._proxy.getModel();
                };
                XianfaSkillTipMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                    this.onNt("update_xianfa_info" /* UPDATE_XIANFA_INFO */, this.updateInfo, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_play, TouchEvent.TOUCH_TAP, this.onClickPlay);
                    addEventListener(this._view.btn_wear, TouchEvent.TOUCH_TAP, this.onClickWear);
                    addEventListener(this._view.btn_study, TouchEvent.TOUCH_TAP, this.onClickStudy);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
                };
                XianfaSkillTipMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.btn_play.visible = true;
                    this._id = this._showArgs;
                    this._view.grp_role_skill_eff.removeChildren();
                    this.updateInfo();
                };
                XianfaSkillTipMdr.prototype.onHide = function () {
                    this._model.isInUpStar = false;
                    this._view.grp_role_skill_eff.removeChildren();
                    _super.prototype.onHide.call(this);
                };
                XianfaSkillTipMdr.prototype.updateInfo = function () {
                    if (!this._id) {
                        return;
                    }
                    this.updateRole(0.7, 5 /* DOWN */, "std" /* STAND */, true, true, null, true);
                    this._cfg = this._model.getXianfaCfg(this._id);
                    this._info = this._model.getInfoByType(this._cfg.type);
                    if (this._model.isInUpStar) { // 升星后，id会改变
                        this._model.isInUpStar = false;
                        this._id = this._info.index;
                        this._cfg = this._model.getXianfaCfg(this._id);
                    }
                    var starCnt = this._model.getStarCnt(this._cfg.index);
                    this._view.star.updateStar(starCnt, 5);
                    this._view.currentState = (starCnt == 5 && this._info && this._info.lv >= this._cfg.max_level) ? "max" : "normal";
                    this._view.lab_name.text = this._model.getXianfaShortName(this._cfg);
                    var descStr = game.StringUtil.substitute(this._cfg.describe, [game.TextUtil.addColor(this._cfg.skill_coefs / 100 + "", 2330156 /* GREEN */),
                        game.TextUtil.addColor(this._model.getLevelAttr(this._info ? this._info.lv : 1, this._cfg.skill_quality) + "", 2330156 /* GREEN */)]);
                    this._view.lab_desc.textFlow = game.TextUtil.parseHtml(descStr, true);
                    var isWear = this._info ? this._model.isWear(this._info.index) : false;
                    this._view.skill.setData(this._cfg, this._info, isWear ? 2 : 3);
                    if (!this._info) {
                        this._view.power.setPowerValue(0);
                        this._view.btn_up.label = "激活";
                        if (this._cfg.activate_material) {
                            this._cost = this._cfg.activate_material[0];
                            this._view.icon_cost.setData(this._cost[0]);
                            this._view.icon_cost.updateCostLab(this._cost);
                        }
                        this._upState = 0;
                        this._view.btn_up.setHint(false);
                        return;
                    }
                    this._view.power.setPowerValue(this._info.power);
                    this._wearState = isWear ? 1 : 0;
                    this._upState = (this._info.lv < this._cfg.max_level) ? 1 : 2;
                    this._view.btn_wear.iconDisplay.source = (this._wearState == 1) ? "xf_off" : "xf_wear";
                    this._view.btn_up.label = (this._upState == 1) ? "升级" : "升星";
                    if (this._upState == 1) {
                        // 升级
                        this._cost = this._model.getUpgradeCost(this._info.lv + 1, this._cfg.skill_quality);
                        this._view.icon_cost.setData(this._cost);
                    }
                    else if (this._cfg.upgrade_material) {
                        // 升星
                        this._cost = this._cfg.upgrade_material[0];
                        this._view.icon_cost.setData(this._cost[0]);
                        this._view.icon_cost.updateCostLab(this._cost);
                    }
                    this.updateHint();
                };
                XianfaSkillTipMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("xianqi" /* xianqi */) >= 0) {
                        this.updateInfo();
                    }
                };
                XianfaSkillTipMdr.prototype.updateRole = function (scale, dir, act, isUi, isLoop, handler, isSingle) {
                    if (scale === void 0) { scale = 1.1; }
                    if (dir === void 0) { dir = 5 /* DOWN */; }
                    if (act === void 0) { act = "std" /* STAND */; }
                    if (isUi === void 0) { isUi = true; }
                    if (isLoop === void 0) { isLoop = true; }
                    if (handler === void 0) { handler = null; }
                    if (isSingle === void 0) { isSingle = true; }
                    this.updateSelfUIRole(this._view.grp_role_eff, scale, dir, act, isUi, isSingle);
                    this.updateUIRoleAtr(isLoop, handler);
                };
                XianfaSkillTipMdr.prototype.updateHint = function () {
                    if (this._upState == 0) { // 激活，仙法是自动激活，无需红点
                        this._view.btn_up.setHint(false);
                    }
                    else if (this._upState == 1) { // 升级
                        var upgradeHint = this._proxy.updateUpgradeHint(this._info.index);
                        this._view.btn_up.setHint(upgradeHint);
                    }
                    else { // 升星
                        var upStarHint = this._proxy.updateUpStarHint(this._info.index);
                        this._view.btn_up.setHint(upStarHint);
                    }
                    var studyHint = this._proxy.updateStudyHint(this._info.index); // 精研
                    this._view.btn_study.setHint(studyHint);
                };
                XianfaSkillTipMdr.prototype.onClickPlay = function (e) {
                    var _this = this;
                    this._view.btn_play.visible = false;
                    var self = this;
                    this.updateRole(1.5, 2 /* RIGHT_UP */, "atk" /* ATTACK */ + "1", false, false, Handler.alloc(this, function () {
                        _this.updateRole(0.7, 5 /* DOWN */, "std" /* STAND */, true, true, null, true);
                        self._view.btn_play.visible = true;
                    }), false);
                    var skillShowCfg = this._model.getSkillShowCfg(this._id);
                    if (skillShowCfg) {
                        if (!skillShowCfg.temporary) {
                            console.error("技能表 skill_Show index " + skillShowCfg.index + " 字段 res 未配置");
                            return;
                        }
                        SkillEftMgr.ins.showGroupUIEft(skillShowCfg.res, 0, 0, 2 /* RIGHT_UP */, null, null, 1, this._view.grp_role_skill_eff);
                    }
                };
                XianfaSkillTipMdr.prototype.onClickWear = function (e) {
                    if (!this._info) {
                        game.PromptBox.getIns().show("未激活");
                        return;
                    }
                    if (this._wearState == 0) { // 穿戴
                        this._proxy.c2s_skill_takeon(1 /* Type1 */, 1, null, this._cfg.index);
                    }
                    else { // 卸下
                        var pos = this._model.getWearPos(this._info.index);
                        this._proxy.c2s_skill_takeoff(1 /* Type1 */, pos);
                    }
                };
                XianfaSkillTipMdr.prototype.onClickStudy = function (e) {
                    mod.ViewMgr.getIns().showSecondPop("44" /* Xianfa */, "03" /* XianfaStudyTip */, this._id);
                };
                XianfaSkillTipMdr.prototype.onClickUp = function (e) {
                    if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                        return;
                    }
                    if (this._upState == 0) { // 激活
                        this._proxy.c2s_skill_levelup(1 /* Type1 */, 1, 4, this._cfg.index);
                    }
                    else if (this._upState == 1) { // 升级
                        this._proxy.c2s_skill_levelup(1 /* Type1 */, 1, 1, this._cfg.index);
                    }
                    else { // 升星
                        this._model.isInUpStar = true;
                        this._proxy.c2s_skill_levelup(1 /* Type1 */, 1, 2, this._cfg.index);
                    }
                };
                return XianfaSkillTipMdr;
            }(game.EffectMdrBase));
            xianfa.XianfaSkillTipMdr = XianfaSkillTipMdr;
            __reflect(XianfaSkillTipMdr.prototype, "game.mod.xianfa.XianfaSkillTipMdr");
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianfa;
        (function (xianfa) {
            var TouchEvent = egret.TouchEvent;
            var XianfaStudyTipMdr = /** @class */ (function (_super) {
                __extends(XianfaStudyTipMdr, _super);
                function XianfaStudyTipMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianfa.XianfaStudyTipView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XianfaStudyTipMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.verticalCenter = 0;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(188 /* Xianfa */);
                    this._model = this._proxy.getModel();
                };
                XianfaStudyTipMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                    this.onNt("update_xianfa_info" /* UPDATE_XIANFA_INFO */, this.updateInfo, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_study, TouchEvent.TOUCH_TAP, this.onClickStudy);
                };
                XianfaStudyTipMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._id = this._showArgs;
                    this._lvReached = false;
                    this.updateInfo();
                };
                XianfaStudyTipMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XianfaStudyTipMdr.prototype.updateInfo = function () {
                    this._cfg = this._model.getXianfaCfg(this._id);
                    this._info = this._model.getInfo(this._id);
                    if (!this._id || !this._cfg) {
                        return;
                    }
                    var xfLv = this._info ? this._info.lv : 1;
                    var culLv = this._info ? this._info.cultivate_level : 0;
                    this._view.currentState = culLv == 5 ? "max" : "normal";
                    this._view.skill.setData(this._cfg, this._info, 4);
                    this._view.img_quality_bg.source = game.ResUtil.getBgQuality(this._cfg.skill_quality);
                    var nameStr = this._model.getXianfaShortName(this._cfg) + game.TextUtil.addColor(" +" + culLv, 2330156 /* GREEN */);
                    this._view.lab_skill_name.textFlow = game.TextUtil.parseHtml(nameStr);
                    var starCnt = this._model.getStarCnt(this._cfg.index);
                    this._view.star.updateStar(starCnt);
                    for (var i = 0; i < 5; i++) {
                        var bigStar = this._view["star_big" + i];
                        bigStar.visible = (i >= culLv);
                    }
                    this._view.lab_lv.text = "等级: " + xfLv;
                    var culCfg = this._model.getXianfaCultivateCfg(culLv);
                    var nextCfg = this._model.getXianfaCultivateCfg(culLv + 1);
                    var curRate = !culLv || !culCfg ? 0 : (culCfg.update_rate + culCfg.update_rate * culCfg.xianfa_jingyan / 10000) / 100;
                    var nextRate = !nextCfg ? curRate : (nextCfg.update_rate + nextCfg.update_rate * nextCfg.xianfa_jingyan / 10000) / 100;
                    this._view.lab_attr1.text = "\u7CBE\u7814 " + culLv + "\n\u4ED9\u6CD5\u4F24\u5BB3 " + curRate + "%";
                    this._view.lab_attr2.text = "+" + (culLv + 1) + "\n+" + nextRate + "%";
                    var effCfg = this._model.getStudyEffCfg(culLv);
                    var str = effCfg ? "精研" + game.TextUtil.addColor("+" + effCfg.cultivate_level, 2330156 /* GREEN */)
                        + "额外激活:精研效果提升" + game.TextUtil.addColor(effCfg.xianfa_jingyan / 100 + "%", 2330156 /* GREEN */) : "";
                    this._view.lab_desc.textFlow = game.TextUtil.parseHtml(str);
                    if (!nextCfg) {
                        return;
                    }
                    var nextCondition = nextCfg.yanxi_condition[this._cfg.skill_quality - 1];
                    var condStr = "精研条件: 仙法等级达到" + nextCondition
                        + game.TextUtil.addColor("(" + xfLv + "/" + nextCondition + ")", xfLv >= nextCondition ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this._view.lab_condition.textFlow = game.TextUtil.parseHtml(condStr);
                    this._view.icon_cost.setData(nextCfg.yanxi_cost[0]);
                    this._view.icon_cost.updateCostLab(nextCfg.yanxi_cost[0]);
                    this._cost = nextCfg.yanxi_cost;
                    this._lvReached = (xfLv >= nextCondition);
                    if (!this._info) {
                        return;
                    }
                    this.updateHint();
                };
                XianfaStudyTipMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("xianqi" /* xianqi */) >= 0) {
                        this.updateInfo();
                    }
                };
                XianfaStudyTipMdr.prototype.updateHint = function () {
                    var studyHint = this._proxy.updateStudyHint(this._info.index);
                    this._view.btn_study.setHint(studyHint);
                };
                XianfaStudyTipMdr.prototype.onClickStudy = function (e) {
                    var isEnough = mod.BagUtil.checkPropCnt(this._cost[0][0], this._cost[0][1], 1 /* Dialog */);
                    if (!isEnough) {
                        return;
                    }
                    if (!this._lvReached) {
                        game.PromptBox.getIns().show("条件未满足");
                        return;
                    }
                    this._proxy.c2s_skill_levelup(1 /* Type1 */, 1, 3, this._cfg.index);
                };
                return XianfaStudyTipMdr;
            }(game.MdrBase));
            xianfa.XianfaStudyTipMdr = XianfaStudyTipMdr;
            __reflect(XianfaStudyTipMdr.prototype, "game.mod.xianfa.XianfaStudyTipMdr");
        })(xianfa = mod.xianfa || (mod.xianfa = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=xianfa.js.map