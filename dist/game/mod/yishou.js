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
        var yishou;
        (function (yishou) {
            var YishouShouguEquipTipsMdr = /** @class */ (function (_super) {
                __extends(YishouShouguEquipTipsMdr, _super);
                function YishouShouguEquipTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yishou.YishouShouguEquipTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YishouShouguEquipTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(243 /* Yishou */);
                };
                YishouShouguEquipTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateBaseAttr, this);
                };
                YishouShouguEquipTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this._view.currentState = 'default';
                    this.updateView();
                };
                YishouShouguEquipTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YishouShouguEquipTipsMdr.prototype.updateBaseAttr = function () {
                    var index;
                    var attr;
                    if (this._showArgs instanceof game.PropData) {
                        index = this._showArgs.index;
                        var baseAttrId = this._showArgs.cfg.attr_id;
                        attr = mod.RoleUtil.getAttr(baseAttrId);
                    }
                    else {
                        //兽骨界面打开，传入number
                        index = this._showArgs;
                        var ary = this._proxy.getAryByParserIndex(index);
                        var type = ary[3];
                        var pos = ary[2];
                        var equipInfo = this._proxy.getEquipInfo(type, pos);
                        if (!equipInfo) {
                            return;
                        }
                        attr = equipInfo.regular_attrs;
                    }
                    this._view.propTips.updateShow(index);
                    this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
                    var attrDesc = game.TextUtil.getAttrTextAdd(attr);
                    this._view.descItem0.updateShow(attrDesc, game.getLanById("base_attr" /* base_attr */));
                };
                YishouShouguEquipTipsMdr.prototype.updateView = function () {
                    var index;
                    if (this._showArgs instanceof game.PropData) {
                        index = this._showArgs.index;
                    }
                    else {
                        index = this._showArgs;
                    }
                    var ary = this._proxy.getAryByParserIndex(index);
                    var type = ary[3];
                    //更新基础属性
                    this.updateBaseAttr();
                    //技能阶数
                    var curStage = this._proxy.getCurStage(type);
                    var nextStage = curStage + 1;
                    var cond = this._proxy.getStageCondition(type, nextStage);
                    var str = '';
                    if (cond) {
                        //有下一阶
                        str = game.StringUtil.substitute(game.getLanById("yishou_tips19" /* yishou_tips19 */), [game.ColorUtil.getColorChineseStrByQua2(cond[1]), cond[2]]);
                    }
                    else {
                        nextStage -= 1;
                    }
                    var titleDesc = nextStage + game.getLanById("tishi_43" /* tishi_43 */)
                        + game.TextUtil.addColor(str, 16719376 /* RED */);
                    var typeCfg = this._proxy.getYishoucfg(type);
                    var skill = typeCfg.skill;
                    var maxStage = this._proxy.getMaxStage(type);
                    var list = [];
                    var posNameList = this._proxy.getStagePosNameList(type);
                    if (posNameList && posNameList.length) {
                        list = list.concat(posNameList);
                    }
                    for (var i = 1; i <= maxStage; i++) {
                        var skillLvCfg = game.getConfigByNameId("skill_level.json" /* SkillLv */, skill + i);
                        if (!skillLvCfg) {
                            continue;
                        }
                        var desc = i + game.getLanById("tishi_43" /* tishi_43 */) + "\uFF1A" + skillLvCfg.describe;
                        var color = curStage >= i ? 8585074 /* GREEN */ : 7835024 /* GRAY */;
                        list.push(game.TextUtil.addColor(desc, color));
                    }
                    this._view.descItem1.updateShow(list.join('\n'), titleDesc);
                };
                return YishouShouguEquipTipsMdr;
            }(game.MdrBase));
            yishou.YishouShouguEquipTipsMdr = YishouShouguEquipTipsMdr;
            __reflect(YishouShouguEquipTipsMdr.prototype, "game.mod.yishou.YishouShouguEquipTipsMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var facade = base.facade;
            var YishouShoulingEquipIcon = /** @class */ (function (_super) {
                __extends(YishouShoulingEquipIcon, _super);
                function YishouShoulingEquipIcon() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShoulingEquipIconSkin";
                    return _this;
                }
                YishouShoulingEquipIcon.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("62" /* Yishou */, 243 /* Yishou */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
                };
                YishouShoulingEquipIcon.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                YishouShoulingEquipIcon.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        this.icon.defaultIcon();
                        this.gr_star.visible = false;
                        this.redPoint.visible = false;
                        return;
                    }
                    var cfg = this._proxy.getShoulingCfg(data.index);
                    if (!cfg) {
                        return;
                    }
                    var equipId = data.equipId;
                    var equipCfg = game.GameConfig.getEquipmentCfg(equipId);
                    if (!equipCfg) {
                        return;
                    }
                    this.icon.setData(equipId, 3 /* NotTips */);
                    this.icon.setImgActed(data.star > 0);
                    this.redPoint.visible = !!data.hint;
                    this.updateStarView();
                };
                YishouShoulingEquipIcon.prototype.updateStarView = function () {
                    this.gr_star.visible = true;
                    var star = this.data.star || 0;
                    if (star <= 5) {
                        this.lb_starcnt.text = '';
                        this.starView.updateStar(star, star);
                        return;
                    }
                    this.starView.updateStar(1, 1);
                    this.lb_starcnt.text = star + '';
                };
                YishouShoulingEquipIcon.prototype.onClick = function () {
                    facade.showView("62" /* Yishou */, "10" /* ShoulingEquipTips */, this.data);
                };
                return YishouShoulingEquipIcon;
            }(mod.BaseListenerRenderer));
            yishou.YishouShoulingEquipIcon = YishouShoulingEquipIcon;
            __reflect(YishouShoulingEquipIcon.prototype, "game.mod.yishou.YishouShoulingEquipIcon");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouModel = /** @class */ (function () {
                function YishouModel() {
                    var _a, _b, _c;
                    //进阶等级信息
                    this.info_list = {};
                    //兽灵列表
                    this.shouling_list = {};
                    //所有装备列表
                    this.equip_list = {};
                    //兽印数据
                    this.shouying_list = {};
                    //兽印羁绊数据
                    this.jiban_list = {};
                    this.hintPath = (_a = {},
                        _a[1] = ["62" /* Yishou */, "01" /* Main */, "01" /* Shougu */],
                        _a[2] = ["62" /* Yishou */, "01" /* Main */, "02" /* Shouhun */],
                        _a);
                    //兽灵页签红点
                    this.hintPath2 = (_b = {},
                        _b[1] = ["62" /* Yishou */, "01" /* Main */, "03" /* Shouling */, "01" /* TabBtnType01 */],
                        _b);
                    //兽印红点
                    this.hintPath3 = (_c = {},
                        _c[1 /* Type1 */] = ["62" /* Yishou */, "01" /* Main */, "04" /* Shouyin */, "01" /* TabBtnType01 */],
                        _c[2 /* Type2 */] = ["62" /* Yishou */, "01" /* Main */, "04" /* Shouyin */, "02" /* TabBtnType02 */],
                        _c[3 /* Type3 */] = ["62" /* Yishou */, "01" /* Main */, "04" /* Shouyin */, "03" /* TabBtnType03 */],
                        _c);
                    //兽印羁绊红点
                    this.jibanHint = ["62" /* Yishou */, "01" /* Main */, "04" /* Shouyin */, "08" /* YishouShouyin */];
                }
                return YishouModel;
            }());
            yishou.YishouModel = YishouModel;
            __reflect(YishouModel.prototype, "game.mod.yishou.YishouModel");
            var YishouEquipData = /** @class */ (function () {
                function YishouEquipData() {
                }
                return YishouEquipData;
            }());
            yishou.YishouEquipData = YishouEquipData;
            __reflect(YishouEquipData.prototype, "game.mod.yishou.YishouEquipData");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var attributes = msg.attributes;
            var s2c_yishou_base_info = msg.s2c_yishou_base_info;
            var c2s_yishou_equip_operate = msg.c2s_yishou_equip_operate;
            var s2c_yishou_equip_update = msg.s2c_yishou_equip_update;
            var c2s_yishou_equip_up_level = msg.c2s_yishou_equip_up_level;
            var c2s_yishou_equip_synthese = msg.c2s_yishou_equip_synthese;
            var c2s_yishou_equip_resolve = msg.c2s_yishou_equip_resolve;
            var c2s_yishou_shouhun_operate = msg.c2s_yishou_shouhun_operate;
            var c2s_yishou_skill_active = msg.c2s_yishou_skill_active;
            var c2s_yishou_shouling_up_level = msg.c2s_yishou_shouling_up_level;
            var s2c_yishou_shouling_up_level = msg.s2c_yishou_shouling_up_level;
            var s2c_yishou_base_update = msg.s2c_yishou_base_update;
            var c2s_yishou_shouling_active = msg.c2s_yishou_shouling_active;
            var s2c_yishou_shouling_active = msg.s2c_yishou_shouling_active;
            var s2c_yishou_equip_synthese = msg.s2c_yishou_equip_synthese;
            var c2s_yishou_shouying_up_star = msg.c2s_yishou_shouying_up_star;
            var s2c_yishou_shouying_up_star = msg.s2c_yishou_shouying_up_star;
            var c2s_yishou_shouying_jiban = msg.c2s_yishou_shouying_jiban;
            var s2c_yishou_shouying_jiban = msg.s2c_yishou_shouying_jiban;
            /**
             * @description 异兽系统（兽骨，兽魂，兽灵）
             */
            var YishouProxy = /** @class */ (function (_super) {
                __extends(YishouProxy, _super);
                function YishouProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**选择星级*/
                    _this.selStar = false;
                    /** [品质,星级,部位] */
                    _this.selComposeAry = [];
                    _this._actJibanMap = {};
                    _this._maxStageMap = {};
                    _this._skillLevelMap = {};
                    _this._maxLevelMap = {};
                    _this._composeCfgMap = {};
                    _this._shoulingCfgMap = {};
                    _this._shoulingEquipIdxMap = {};
                    /**================================ 兽印 ================================*/
                    _this._shouyinCfgMap = {};
                    _this._shouyinMaxStarMap = {};
                    return _this;
                }
                YishouProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    this._actJibanMap = {};
                };
                YishouProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new yishou.YishouModel();
                    this.onProto(s2c_yishou_base_info, this.s2c_yishou_base_info, this);
                    this.onProto(s2c_yishou_base_update, this.s2c_yishou_base_update, this);
                    this.onProto(s2c_yishou_equip_update, this.s2c_yishou_equip_update, this);
                    this.onProto(s2c_yishou_shouling_up_level, this.s2c_yishou_shouling_up_level, this);
                    this.onProto(s2c_yishou_shouling_active, this.s2c_yishou_shouling_active, this);
                    this.onProto(s2c_yishou_equip_synthese, this.s2c_yishou_equip_synthese, this);
                    this.onProto(s2c_yishou_shouying_up_star, this.s2c_yishou_shouying_up_star, this);
                    this.onProto(s2c_yishou_shouying_jiban, this.s2c_yishou_shouying_jiban, this);
                };
                ///登录下发
                YishouProxy.prototype.s2c_yishou_base_info = function (n) {
                    var msg = n.body;
                    this._model.info_list = {};
                    if (msg.info_list != null) {
                        for (var _i = 0, _a = msg.info_list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            this._model.info_list[item.type] = item;
                        }
                    }
                    this._model.shouling_list = {};
                    if (msg.shouling_list != null) {
                        for (var _b = 0, _c = msg.shouling_list; _b < _c.length; _b++) {
                            var item = _c[_b];
                            //group_id 兽灵id
                            this._model.shouling_list[item.group_id] = item;
                        }
                    }
                    this._model.equip_list = {};
                    if (msg.equip_list != null) {
                        for (var _d = 0, _e = msg.equip_list; _d < _e.length; _d++) {
                            var item = _e[_d];
                            this.updateEquipData(item);
                        }
                    }
                    if (msg.shouying_list != null) {
                        for (var _f = 0, _g = msg.shouying_list; _f < _g.length; _f++) {
                            var item = _g[_f];
                            this._model.shouying_list[item.index] = item;
                        }
                    }
                    if (msg.jiban_list != null) {
                        for (var _h = 0, _j = msg.jiban_list; _h < _j.length; _h++) {
                            var item = _j[_h];
                            this._model.jiban_list[item.index] = item;
                        }
                    }
                    this.updateHint();
                    this.sendNt("on_update_yishou_base_info" /* ON_UPDATE_YISHOU_BASE_INFO */);
                };
                ///单项更新（装备进阶，兽魂升阶，技能激活）
                YishouProxy.prototype.s2c_yishou_base_update = function (n) {
                    var msg = n.body;
                    if (msg.data != null) {
                        this._model.info_list[msg.data.type] = msg.data;
                    }
                    this.updateHint1();
                    this.updateHint2();
                    this.sendNt("on_update_yishou_base_info" /* ON_UPDATE_YISHOU_BASE_INFO */);
                };
                /**
                 * 装备操作
                 * @param type
                 * @param oper 1：穿  2：一键穿戴
                 * @param propId 装备的唯一id（一键穿戴可缺省）
                 */
                YishouProxy.prototype.c2s_yishou_equip_operate = function (type, oper, propId) {
                    var msg = new c2s_yishou_equip_operate();
                    msg.type = type;
                    msg.oper = oper;
                    if (propId) {
                        msg.prop_id = propId;
                    }
                    this.sendProto(msg);
                };
                ///装备更新
                YishouProxy.prototype.s2c_yishou_equip_update = function (n) {
                    var msg = n.body;
                    if (msg.equip_data != null) {
                        this.updateEquipData(msg.equip_data);
                    }
                    this.updateHint1();
                    this.updateHint2();
                    this.sendNt("on_update_yishou_equip_info" /* ON_UPDATE_YISHOU_EQUIP_INFO */);
                };
                YishouProxy.prototype.updateEquipData = function (data) {
                    if (!data) {
                        return;
                    }
                    var equipData = this._model.equip_list[data.type];
                    if (!equipData) {
                        equipData = new yishou.YishouEquipData();
                        equipData.equips = {};
                        this._model.equip_list[data.type] = equipData;
                    }
                    if (data.equips) {
                        for (var _i = 0, _a = data.equips; _i < _a.length; _i++) {
                            var equip = _a[_i];
                            var pos = equip.index.toNumber() % 10;
                            equipData.equips[pos] = equip;
                        }
                    }
                };
                ///装备进阶
                YishouProxy.prototype.c2s_yishou_equip_up_level = function (type) {
                    var msg = new c2s_yishou_equip_up_level();
                    msg.type = type;
                    this.sendProto(msg);
                };
                /**
                 * 合成
                 * @param type
                 * @param index 合成后的道具索引
                 * @param count 合成数量
                 */
                YishouProxy.prototype.c2s_yishou_equip_synthese = function (type, index, count) {
                    var msg = new c2s_yishou_equip_synthese();
                    msg.type = type;
                    msg.index = Long.fromNumber(index);
                    msg.count = count;
                    this.sendProto(msg);
                };
                //合成返回
                YishouProxy.prototype.s2c_yishou_equip_synthese = function (n) {
                    var msg = n.body;
                    var type = msg.type;
                    this.sendNt("on_update_yishou_synthese_success" /* ON_UPDATE_YISHOU_SYNTHESE_SUCCESS */, type);
                };
                //分解
                YishouProxy.prototype.c2s_yishou_equip_resolve = function (type, list) {
                    var msg = new c2s_yishou_equip_resolve();
                    msg.type = type;
                    msg.list = list;
                    this.sendProto(msg);
                };
                /// 兽魂升阶操作，oper 1：进阶  2：一键进阶
                YishouProxy.prototype.c2s_yishou_shouhun_operate = function (type, oper) {
                    var msg = new c2s_yishou_shouhun_operate();
                    msg.type = type;
                    msg.oper = oper;
                    this.sendProto(msg);
                };
                /// 技能激活
                YishouProxy.prototype.c2s_yishou_skill_active = function (type, skill_id) {
                    var msg = new c2s_yishou_skill_active();
                    msg.type = type;
                    msg.skill_id = skill_id;
                    this.sendProto(msg);
                };
                /// 兽灵：激活或者升级
                YishouProxy.prototype.c2s_yishou_shouling_up_level = function (index, idx) {
                    var msg = new c2s_yishou_shouling_up_level();
                    msg.group_id = index;
                    msg.index = Long.fromNumber(idx);
                    this.sendProto(msg);
                };
                /// 兽灵：激活或者升级返回
                YishouProxy.prototype.s2c_yishou_shouling_up_level = function (n) {
                    var msg = n.body;
                    if (msg.data != null) {
                        this._model.shouling_list[msg.data.group_id] = msg.data;
                    }
                    this.updateHint3();
                    this.sendNt("on_update_yishou_shouling_info" /* ON_UPDATE_YISHOU_SHOULING_INFO */);
                };
                /// 兽灵: 激活兽灵组
                YishouProxy.prototype.c2s_yishou_shouling_active = function (index) {
                    var msg = new c2s_yishou_shouling_active();
                    msg.group_id = index;
                    this.sendProto(msg);
                };
                /// 兽灵: 激活兽灵组返回
                YishouProxy.prototype.s2c_yishou_shouling_active = function (n) {
                    var msg = n.body;
                    if (msg.data != null) {
                        this._model.shouling_list[msg.data.group_id] = msg.data;
                    }
                    this.updateHint3();
                    this.sendNt("on_update_yishou_shouling_info" /* ON_UPDATE_YISHOU_SHOULING_INFO */);
                };
                /// 兽印: 激活或者升星
                YishouProxy.prototype.c2s_yishou_shouying_up_star = function (index) {
                    var msg = new c2s_yishou_shouying_up_star();
                    msg.index = index;
                    this.sendProto(msg);
                };
                /// 兽印: 激活或者升星返回
                YishouProxy.prototype.s2c_yishou_shouying_up_star = function (n) {
                    var msg = n.body;
                    if (msg.data != null) {
                        this._model.shouying_list[msg.data.index] = msg.data;
                    }
                    this.updateHint4();
                    this.sendNt("on_update_yishou_shouyin_info" /* ON_UPDATE_YISHOU_SHOUYIN_INFO */);
                };
                //激活兽印套装或激活兽印单位, 外显id(激活组不要传数值)
                YishouProxy.prototype.c2s_yishou_shouying_jiban = function (index, id) {
                    var msg = new c2s_yishou_shouying_jiban();
                    msg.index = index;
                    if (id) {
                        msg.id = id;
                        this._actJibanMap[id] = true;
                    }
                    this.sendProto(msg);
                };
                //激活兽印套装或激活兽印单位返回
                YishouProxy.prototype.s2c_yishou_shouying_jiban = function (n) {
                    var msg = n.body;
                    if (msg.data != null) {
                        this._model.jiban_list[msg.data.index] = msg.data;
                        if (msg.data.list && msg.data.list.length) {
                            for (var _i = 0, _a = msg.data.list; _i < _a.length; _i++) {
                                var id = _a[_i];
                                if (this._actJibanMap[id]) {
                                    mod.ViewMgr.getIns().showSuccessTips(1 /* Act */);
                                    this._actJibanMap[id] = null;
                                    delete this._actJibanMap[id];
                                }
                            }
                        }
                    }
                    this.updateHint4();
                    this.sendNt("on_update_yishou_shouyin_jiban_info" /* ON_UPDATE_YISHOU_SHOUYIN_JIBAN_INFO */);
                };
                /**================================= 协议end =================================*/
                //返回合成装备id 29002+1位品质+2位类型+1位星级+1位部位
                YishouProxy.prototype.getEquipIndex = function (type, quality, star, pos) {
                    return 290 /* Equip */ * 10000000 + 2 /* Yishou */ * 100000 + quality * 10000 + type * 100 + star * 10 + pos;
                };
                /**
                 * 从装备id获取 [品质,星级,部位,类型]
                 */
                YishouProxy.prototype.getAryByParserIndex = function (index) {
                    var quality = Math.floor(index / 10000) % 10;
                    var star = Math.floor(index / 10) % 10;
                    var pos = index % 10;
                    var type = Math.floor(index / 100) % 10;
                    return [quality, star, pos, type];
                };
                //获取背包数据
                YishouProxy.prototype.getBagDatas = function (type) {
                    var propList = mod.BagUtil.getBagsByType(8 /* Yishou */) || [];
                    var list = [];
                    for (var _i = 0, propList_1 = propList; _i < propList_1.length; _i++) {
                        var prop = propList_1[_i];
                        var subType = Math.floor(prop.index / 100) % 10;
                        if (subType == type) {
                            list.push(prop);
                        }
                    }
                    return list;
                };
                //获取背包数据
                YishouProxy.prototype.getBagDatasByIndex = function (index, isCompose) {
                    if (isCompose === void 0) { isCompose = true; }
                    var ary = this.getAryByParserIndex(index);
                    var type = ary[3];
                    var pos = ary[2];
                    var datas = this.getBagDatasByCond(type, ary[0], ary[1], pos);
                    //判断对应类型对应部位，是否穿戴，穿戴的话，其可以作为材料合成
                    if (isCompose) {
                        var info = this.getEquipInfo(type, pos);
                        if (info && info.index.toNumber() == index) {
                            var propData = game.PropData.create(index);
                            datas.unshift(propData);
                        }
                    }
                    return datas;
                };
                //获取背包数据
                YishouProxy.prototype.getBagDatasByCond = function (type, quality, star, pos) {
                    var propList = this.getBagDatas(type);
                    var list = [];
                    for (var _i = 0, propList_2 = propList; _i < propList_2.length; _i++) {
                        var prop = propList_2[_i];
                        var ary = this.getAryByParserIndex(prop.index);
                        if (quality == ary[0] && star == ary[1] && pos == ary[2]) {
                            list.push(prop);
                        }
                    }
                    return list;
                };
                //获取背包数据
                YishouProxy.prototype.getBagDatasByTypeAndPos = function (type, pos) {
                    var propList = this.getBagDatas(type);
                    var list = [];
                    for (var _i = 0, propList_3 = propList; _i < propList_3.length; _i++) {
                        var prop = propList_3[_i];
                        var propPos = prop.index % 10;
                        if (pos == propPos) {
                            list.push(prop);
                        }
                    }
                    return list;
                };
                YishouProxy.prototype.getYishoucfg = function (type) {
                    return game.getConfigByNameId("yishou.json" /* Yishou */, type);
                };
                //激活
                YishouProxy.prototype.checkTypeActed = function (type, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    var cfg = this.getYishoucfg(type);
                    var idx = cfg.open;
                    var roleIdx = game.RoleVo.ins.reincarnate;
                    if (roleIdx >= idx) {
                        return true;
                    }
                    if (isTips) {
                        var openDesc = mod.RoleUtil.getRebirthStr(idx);
                        game.PromptBox.getIns().show(openDesc + game.getLanById("boss_cue5" /* boss_cue5 */));
                    }
                    return false;
                };
                //可进阶
                YishouProxy.prototype.canJinjie = function (type) {
                    if (this.isMaxStage(type)) {
                        return false;
                    }
                    var curStage = this.getCurStage(type); //当前阶数
                    var nextStage = curStage + 1;
                    var condAry = this.getStageCondition(type, nextStage);
                    var satisfyCnt = this.getStageSatisfyCnt(type);
                    return satisfyCnt >= condAry[3];
                };
                //可一键替换
                YishouProxy.prototype.canOnekey = function (type) {
                    for (var _i = 0, YishouShouguPosAry_1 = game.YishouShouguPosAry; _i < YishouShouguPosAry_1.length; _i++) {
                        var pos = YishouShouguPosAry_1[_i];
                        if (this.canDressByTypeAndPos(type, pos)) {
                            return true;
                        }
                    }
                    return false;
                };
                //高战力可穿戴
                YishouProxy.prototype.canDressByTypeAndPos = function (type, pos, isReplace) {
                    if (isReplace === void 0) { isReplace = false; }
                    if (!this.checkTypeActed(type)) {
                        return false;
                    }
                    var bagDatas = this.getBagDatasByTypeAndPos(type, pos);
                    var posEquip = this.getEquipInfo(type, pos);
                    var reincarnate = game.RoleVo.ins.reincarnate;
                    if (!posEquip) {
                        if (!bagDatas || !bagDatas.length) {
                            return false;
                        }
                        for (var _i = 0, bagDatas_1 = bagDatas; _i < bagDatas_1.length; _i++) {
                            var prop = bagDatas_1[_i];
                            var rein = prop.cfg.rebirth_limit;
                            if (reincarnate >= rein) {
                                return true;
                            }
                        }
                        return false;
                    }
                    var curAttr = posEquip && posEquip.regular_attrs ? posEquip.regular_attrs : null;
                    var curPower = curAttr && curAttr.showpower ? curAttr.showpower.toNumber() : 0;
                    for (var _a = 0, bagDatas_2 = bagDatas; _a < bagDatas_2.length; _a++) {
                        var prop = bagDatas_2[_a];
                        var propAttr = prop.regular_attrs;
                        var propPower = propAttr && propAttr.showpower ? propAttr.showpower.toNumber() : 0;
                        var rein = prop.cfg.rebirth_limit;
                        if (isReplace) {
                            //单件穿戴替换不需要加战力限制
                            if (reincarnate >= rein) {
                                return true;
                            }
                        }
                        else {
                            if (propPower > curPower && reincarnate >= rein) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                //战力
                YishouProxy.prototype.getPower = function (type, mdrType) {
                    if (mdrType === void 0) { mdrType = 1 /* Shougu */; }
                    if (mdrType == 1 /* Shougu */) {
                        var attr_1 = this.getAttr(type, mdrType);
                        return attr_1 && attr_1.showpower ? attr_1.showpower.toNumber() : 0;
                    }
                    var power = 0;
                    var attr = this.getAttr(type, mdrType);
                    if (attr && attr.showpower) {
                        power += attr.showpower.toNumber();
                    }
                    var cfg = this.getYishoucfg(type);
                    if (cfg && cfg.skill_list) {
                        for (var _i = 0, _a = cfg.skill_list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            var skillId = item[1];
                            if (this.checkSkillActed(type, skillId)) {
                                var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                                if (skillCfg && skillCfg.powershow) {
                                    power += skillCfg.powershow;
                                }
                            }
                        }
                    }
                    return power;
                };
                //属性
                YishouProxy.prototype.getAttr = function (type, mdrType) {
                    if (mdrType === void 0) { mdrType = 1 /* Shougu */; }
                    var attr = new attributes();
                    // 兽骨
                    if (mdrType == 1 /* Shougu */) {
                        var info = this.getEquipInfos(type);
                        if (!info || !info.equips) {
                            return attr;
                        }
                        var attrs = [];
                        for (var pos in info.equips) {
                            var equip = info.equips[pos];
                            if (!equip || !equip.regular_attrs) {
                                continue;
                            }
                            attrs.push(equip.regular_attrs);
                        }
                        return game.TextUtil.calcAttrList(attrs);
                    }
                    // 兽魂
                    var shouhunInfo = this.getInfo(type);
                    if (shouhunInfo && shouhunInfo.attrs) {
                        return shouhunInfo.attrs;
                    }
                    return attr;
                };
                //装备信息
                YishouProxy.prototype.getEquipInfos = function (type) {
                    return this._model.equip_list[type];
                };
                //装备部位信息
                YishouProxy.prototype.getEquipInfo = function (type, pos) {
                    var infos = this.getEquipInfos(type);
                    if (!infos || !infos.equips) {
                        return null;
                    }
                    return infos.equips[pos];
                };
                //最大阶数
                YishouProxy.prototype.getMaxStage = function (type) {
                    if (this._maxStageMap[type]) {
                        return this._maxStageMap[type];
                    }
                    var cfgList = game.getConfigListByName("yishou.json" /* Yishou */);
                    for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                        var cfg = cfgList_1[_i];
                        var skillStage = cfg.skill_stage || [];
                        var lastStage = skillStage[skillStage.length - 1];
                        this._maxStageMap[cfg.type] = lastStage[0] || 0;
                    }
                    return this._maxStageMap[type] || 0;
                };
                //兽骨技能升阶满足条件的装备个数
                YishouProxy.prototype.getStageSatisfyCnt = function (type) {
                    var equipList = this.getEquipInfos(type);
                    if (!equipList) {
                        return 0;
                    }
                    var curStage = this.getCurStage(type);
                    var nextStage = curStage + 1;
                    var cond = this.getStageCondition(type, nextStage);
                    var quality = cond[1];
                    var star = cond[2];
                    var cnt = 0;
                    for (var pos in equipList.equips) {
                        var item = equipList.equips[pos];
                        if (!item) {
                            continue;
                        }
                        var itemAry = this.getAryByParserIndex(item.index.toNumber());
                        if (itemAry[0] >= quality && itemAry[1] >= star) {
                            cnt++;
                        }
                    }
                    return cnt;
                };
                //阶数的条件 [阶，品质，星级，数量]
                YishouProxy.prototype.getStageCondition = function (type, stage) {
                    var cfg = this.getYishoucfg(type);
                    var stages = cfg.skill_stage;
                    for (var _i = 0, stages_1 = stages; _i < stages_1.length; _i++) {
                        var item = stages_1[_i];
                        if (item && item[0] == stage) {
                            return item;
                        }
                    }
                    DEBUG && console.error("yishou getStageCondition error type:" + type + ", stage:" + stage);
                    return null;
                };
                //兽骨技能当前阶数
                YishouProxy.prototype.getCurStage = function (type) {
                    var info = this._model.info_list[type];
                    return info && info.stage || 0;
                };
                //兽骨技能满阶
                YishouProxy.prototype.isMaxStage = function (type) {
                    var maxStage = this.getMaxStage(type);
                    var curStage = this.getCurStage(type);
                    return curStage >= maxStage;
                };
                //获取部位名称，如圣龙之牙
                YishouProxy.prototype.getPosName = function (type, pos) {
                    var typeCfg = this.getYishoucfg(type);
                    var posName = "yishou_name" + pos; //LanDef.yishou_name0;
                    return typeCfg.type_name + '之' + game.getLanById(posName);
                };
                //获取阶数条件名
                YishouProxy.prototype.getStagePosNameList = function (type) {
                    var curStage = this.getCurStage(type);
                    var nextStage = curStage + 1;
                    if (this.isMaxStage(type)) {
                        nextStage = curStage;
                    }
                    var cond = this.getStageCondition(type, nextStage);
                    var list = [];
                    for (var _i = 0, YishouShouguPosAry_2 = game.YishouShouguPosAry; _i < YishouShouguPosAry_2.length; _i++) {
                        var pos = YishouShouguPosAry_2[_i];
                        var equipInfo = this.getEquipInfo(type, pos);
                        var str = this.getPosName(type, pos) + ': ';
                        if (!equipInfo) {
                            str += this.getCondStr(cond);
                            str = game.TextUtil.addColor(str, 7835024 /* GRAY */);
                        }
                        else {
                            var index = equipInfo.index.toNumber();
                            var quality = Math.floor(index / 10000) % 10; //当前品质
                            var star = Math.floor(index / 10) % 10; //当前星级
                            str += game.ColorUtil.getColorChineseStrByQua2(quality) + game.getLanById("se" /* se */) + star + game.getLanById("soul2" /* soul2 */);
                            var color = 7835024 /* GRAY */;
                            if (quality >= cond[1] && star >= cond[2]) {
                                color = 8585074 /* GREEN */;
                            }
                            str = game.TextUtil.addColor(str, color);
                        }
                        list.push(str);
                    }
                    return list;
                };
                //品质星级文本
                YishouProxy.prototype.getCondStr = function (cond) {
                    if (!cond || !cond.length) {
                        return '';
                    }
                    var qualityName = game.ColorUtil.getColorChineseStrByQua2(cond[1]);
                    return qualityName + game.getLanById("se" /* se */) + cond[2] + game.getLanById("soul2" /* soul2 */);
                };
                //兽魂被动技能是否激活
                YishouProxy.prototype.checkSkillActed = function (type, skillId) {
                    var info = this.getInfo(type);
                    var actedList = info && info.skill_list ? info.skill_list : [];
                    return actedList.indexOf(skillId) > -1;
                };
                //兽魂技能能否激活
                YishouProxy.prototype.canActSkill = function (type, skillId, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    //已激活
                    if (this.checkSkillActed(type, skillId)) {
                        return false;
                    }
                    var cfg = this.getYishoucfg(type);
                    if (!cfg || !cfg.skill_list) {
                        return false;
                    }
                    var level = this.getLevel(type);
                    var skillMap = this._skillLevelMap[type];
                    if (!skillMap) {
                        this._skillLevelMap[type] = skillMap = {};
                    }
                    var actLevel = skillMap[skillId];
                    if (actLevel == null) {
                        for (var _i = 0, _a = cfg.skill_list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            skillMap[item[1]] = item[0];
                        }
                    }
                    actLevel = skillMap[skillId] || 0;
                    if (level >= actLevel) {
                        return true;
                    }
                    if (isTips) {
                        game.PromptBox.getIns().show(game.StringUtil.substitute(game.getLanById("lingqi_tips10" /* lingqi_tips10 */), ['']));
                    }
                    return false;
                };
                //兽魂进阶
                YishouProxy.prototype.canShouHunUpLv = function (type, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isLevelMax(type)) {
                        return false;
                    }
                    var cfg = this.getShouhunCfg(type);
                    if (!cfg || !cfg.star_consume) {
                        return false;
                    }
                    var cost = cfg.star_consume[0];
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                //兽魂一键进阶
                YishouProxy.prototype.canShowhunOnekey = function (type, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    return this.canShouHunUpLv(type, isTips);
                };
                YishouProxy.prototype.getInfo = function (type) {
                    return this._model.info_list[type];
                };
                //兽魂等级
                YishouProxy.prototype.getLevel = function (type) {
                    var info = this.getInfo(type);
                    return info && info.level || 0;
                };
                //兽魂最大等级
                YishouProxy.prototype.getMaxLevel = function (type) {
                    if (this._maxLevelMap[type]) {
                        return this._maxLevelMap[type];
                    }
                    var cfgObj = game.getConfigByNameId("yishou_shouhun.json" /* YishouShouhun */, type);
                    if (!cfgObj) {
                        return 0;
                    }
                    this._maxLevelMap[type] = Object.keys(cfgObj).length - 1; //配表id从0开始
                    return this._maxLevelMap[type];
                };
                //兽魂满级
                YishouProxy.prototype.isLevelMax = function (type) {
                    var curLv = this.getLevel(type);
                    var maxLv = this.getMaxLevel(type);
                    return curLv >= maxLv;
                };
                //兽魂等级配置
                YishouProxy.prototype.getShouhunCfg = function (type, level) {
                    if (!level) {
                        level = this.getLevel(type);
                    }
                    var cfgObj = game.getConfigByNameId("yishou_shouhun.json" /* YishouShouhun */, type);
                    if (!cfgObj || !cfgObj[level]) {
                        return null;
                    }
                    return cfgObj[level];
                };
                //获取类型名称
                YishouProxy.prototype.getTypeName = function (type) {
                    var cfg = this.getYishoucfg(type);
                    return cfg.type_name;
                };
                YishouProxy.prototype.getComposeCfgs = function (type) {
                    if (this._composeCfgMap[type]) {
                        return this._composeCfgMap[type];
                    }
                    this._composeCfgMap[type] = [];
                    var cfgObj = game.getConfigByNameId("yishou_synthesis_type.json" /* YishouSynthesisType */, type);
                    for (var key in cfgObj) {
                        var cfg = cfgObj[key];
                        this._composeCfgMap[type].push(cfg);
                    }
                    return this._composeCfgMap[type];
                };
                //兽灵配置
                YishouProxy.prototype.getShoulingCfgs = function (type) {
                    if (this._shoulingCfgMap[type]) {
                        return this._shoulingCfgMap[type];
                    }
                    var cfgList = game.getConfigListByName("yishou_shouling.json" /* YishouShouling */);
                    for (var _i = 0, cfgList_2 = cfgList; _i < cfgList_2.length; _i++) {
                        var cfg = cfgList_2[_i];
                        if (!this._shoulingCfgMap[cfg.type]) {
                            this._shoulingCfgMap[cfg.type] = [];
                        }
                        this._shoulingCfgMap[cfg.type].push(cfg);
                    }
                    return this._shoulingCfgMap[type];
                };
                YishouProxy.prototype.getShoulingCfg = function (index) {
                    return game.getConfigByNameId("yishou_shouling.json" /* YishouShouling */, index);
                };
                YishouProxy.prototype.getShoulingEquipCfg = function (index, star) {
                    var cfgObj = game.getConfigByNameId("yishou_shouling_equip.json" /* YishouShoulingEquip */, index);
                    if (cfgObj && cfgObj[star]) {
                        return cfgObj[star];
                    }
                    return null;
                };
                //兽灵信息
                YishouProxy.prototype.getShoulingInfo = function (index) {
                    return this._model.shouling_list[index];
                };
                //兽灵激活否
                YishouProxy.prototype.isShoulingActed = function (index) {
                    var info = this._model.shouling_list[index];
                    return info && info.is_active;
                };
                //能否激活兽灵
                YishouProxy.prototype.canShoulingAct = function (index, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isShoulingActed(index)) {
                        return false;
                    }
                    var info = this.getShoulingInfo(index);
                    var len = info && info.list ? info.list.length : 0;
                    var cfg = this.getShoulingEquipCfg(index, 1);
                    var size = cfg && cfg.cost ? cfg.cost.length : 0;
                    if (len >= size) {
                        return true;
                    }
                    if (isTips) {
                        game.PromptBox.getIns().show(game.StringUtil.substitute(game.getLanById("lingqi_tips10" /* lingqi_tips10 */), ['']));
                    }
                    return false;
                };
                //兽灵装备索引
                YishouProxy.prototype.getShoulingEquipIdx = function (index, equipId) {
                    var map = this._shoulingEquipIdxMap[index];
                    if (map && map[equipId]) {
                        return map[equipId];
                    }
                    this._shoulingEquipIdxMap[index] = map = {};
                    var cfg = this.getShoulingEquipCfg(index, 1);
                    for (var i = 0; i < cfg.cost.length; i++) {
                        var item = cfg.cost[i];
                        map[item[0]] = i;
                    }
                    return map[equipId];
                };
                //兽灵装备红点
                YishouProxy.prototype.getShoulingEquipHint = function (index, equipId) {
                    return this.canShoulingEquipActOrUp(index, equipId);
                };
                //兽灵红点
                YishouProxy.prototype.getShoulingHint = function (index) {
                    if (this.canShoulingAct(index)) {
                        return true;
                    }
                    var cfg = this.getShoulingEquipCfg(index, 1);
                    if (!cfg || !cfg.cost) {
                        return false;
                    }
                    for (var _i = 0, _a = cfg.cost; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (this.getShoulingEquipHint(index, item[0])) {
                            return true;
                        }
                    }
                    return false;
                };
                //兽灵装备信息
                YishouProxy.prototype.getShoulingEquipInfo = function (index, equipId) {
                    var info = this.getShoulingInfo(index);
                    if (!info || !info.list) {
                        return null;
                    }
                    for (var _i = 0, _a = info.list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item && item.index.toNumber() == equipId) {
                            return item;
                        }
                    }
                    return null;
                };
                //兽灵装备激活升级
                YishouProxy.prototype.canShoulingEquipActOrUp = function (index, equipId, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    var equipInfo = this.getShoulingEquipInfo(index, equipId);
                    var star = equipInfo ? equipInfo.star : 0;
                    var cfg = this.getShoulingEquipCfg(index, star + 1);
                    if (!cfg) {
                        if (isTips) {
                            game.PromptBox.getIns().show(game.getLanById("maxlv" /* maxlv */));
                        }
                        return false;
                    }
                    var idx = this.getShoulingEquipIdx(index, equipId);
                    var cost = cfg.cost[idx];
                    return cost && mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                //兽灵属性
                YishouProxy.prototype.getShoulingAttr = function (index) {
                    var info = this.getShoulingInfo(index);
                    if (info && info.list) {
                        var attrList = [];
                        for (var _i = 0, _a = info.list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            var star = item.star;
                            var cfg = this.getShoulingEquipCfg(index, star);
                            var attr = mod.RoleUtil.getAttr(cfg.attr);
                            if (attr) {
                                attrList.push(attr);
                            }
                        }
                        return game.TextUtil.calcAttrList(attrList);
                    }
                    else {
                        var cfg = this.getShoulingEquipCfg(index, 1);
                        var attr = mod.RoleUtil.getAttr(cfg.attr);
                        if (attr) {
                            return game.TextUtil.calcAttr(attr, cfg.cost.length);
                        }
                    }
                    return new attributes();
                };
                //兽灵战力
                YishouProxy.prototype.getShoulingPower = function (index) {
                    var power = 0;
                    var attr = this.getShoulingAttr(index);
                    if (attr && attr.showpower) {
                        power += attr.showpower.toNumber();
                    }
                    var isActed = this.isShoulingActed(index);
                    if (isActed) {
                        var cfg = this.getShoulingCfg(index);
                        if (cfg && cfg.special_attr_id) {
                            var speCfg = game.getConfigByNameId("special_attr.json" /* SpecialAttr */, cfg.special_attr_id);
                            if (speCfg && speCfg.showpower) {
                                power += speCfg.showpower;
                            }
                        }
                    }
                    return power;
                };
                /**============================ hint ============================*/
                YishouProxy.prototype.updateHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670204 /* Yishou */)) {
                        return;
                    }
                    this.updateHint1();
                    this.updateHint2();
                    this.updateHint3();
                    this.updateHint4();
                };
                YishouProxy.prototype.getHintByType = function (type, mdrType) {
                    if (!this.checkTypeActed(type)) {
                        return false;
                    }
                    //兽魂
                    if (mdrType == 2 /* Shouhun */) {
                        if (this.canShouHunUpLv(type)) {
                            return true;
                        }
                        var typeCfg = this.getYishoucfg(type);
                        var skillList = typeCfg.skill_list || [];
                        for (var i = 0; i < skillList.length; i++) {
                            var skillId = skillList[i][1];
                            if (this.canActSkill(type, skillId)) {
                                return true;
                            }
                        }
                        return false;
                    }
                    //兽骨（穿戴，进阶，合成）
                    return this.canOnekey(type) || this.canJinjie(type) || this.getComposeTypeHint(type);
                };
                //兽骨红点
                YishouProxy.prototype.updateHint1 = function () {
                    this.updateTypeHint(1 /* Shougu */);
                };
                //兽魂红点
                YishouProxy.prototype.updateHint2 = function () {
                    this.updateTypeHint(2 /* Shouhun */);
                };
                YishouProxy.prototype.updateTypeHint = function (mdrType) {
                    var hint = false;
                    for (var _i = 0, YishouTypeAry_1 = game.YishouTypeAry; _i < YishouTypeAry_1.length; _i++) {
                        var type = YishouTypeAry_1[_i];
                        if (this.getHintByType(type, mdrType)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.hintPath[mdrType]);
                };
                //合成消耗材料
                YishouProxy.prototype.getComposeCost = function (equipId) {
                    var equipCfg = game.GameConfig.getEquipmentCfg(equipId);
                    if (!equipCfg || !equipCfg.compose) {
                        return null;
                    }
                    return equipCfg.compose[0];
                };
                //部位红点
                YishouProxy.prototype.getComposePosHint = function (type, quality, star, pos) {
                    var equipId = this.getEquipIndex(type, quality, star, pos); //合成的装备id
                    var cost = this.getComposeCost(equipId);
                    if (!cost) {
                        return false;
                    }
                    var bagDatas = this.getBagDatasByIndex(cost[0]);
                    return bagDatas && bagDatas.length >= 3;
                };
                //星级红点
                YishouProxy.prototype.getComposeStarHint = function (type, quality, star) {
                    var cfgObj = game.getConfigByNameId("yishou_synthesis_type.json" /* YishouSynthesisType */, type);
                    if (!cfgObj || !cfgObj[quality]) {
                        return false;
                    }
                    var cfg = cfgObj[quality];
                    if (!cfg || !cfg.star || cfg.star.indexOf(star) < 0) {
                        return false;
                    }
                    for (var _i = 0, YishouShouguPosAry_3 = game.YishouShouguPosAry; _i < YishouShouguPosAry_3.length; _i++) {
                        var pos = YishouShouguPosAry_3[_i];
                        if (this.getComposePosHint(type, quality, star, pos)) {
                            return true;
                        }
                    }
                    return false;
                };
                //返回红点星级
                YishouProxy.prototype.getComposeQualityStar = function (type, quality) {
                    var cfgObj = game.getConfigByNameId("yishou_synthesis_type.json" /* YishouSynthesisType */, type);
                    if (!cfgObj || !cfgObj[quality]) {
                        return 0;
                    }
                    var cfg = cfgObj[quality];
                    for (var _i = 0, _a = cfg.star; _i < _a.length; _i++) {
                        var star = _a[_i];
                        if (this.getComposeStarHint(type, quality, star)) {
                            return star;
                        }
                    }
                    return cfg.star[0];
                };
                //品质红点
                YishouProxy.prototype.getComposeQualityHint = function (type, quality) {
                    var cfgObj = game.getConfigByNameId("yishou_synthesis_type.json" /* YishouSynthesisType */, type);
                    if (!cfgObj || !cfgObj[quality]) {
                        return false;
                    }
                    var cfg = cfgObj[quality];
                    for (var _i = 0, _a = cfg.star; _i < _a.length; _i++) {
                        var star = _a[_i];
                        if (this.getComposeStarHint(type, quality, star)) {
                            return true;
                        }
                    }
                    return false;
                };
                //底部类型红点
                YishouProxy.prototype.getComposeTypeHint = function (type) {
                    var cfgs = this.getComposeCfgs(type);
                    if (!cfgs || !cfgs.length) {
                        return false;
                    }
                    for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                        var cfg = cfgs_1[_i];
                        if (this.getComposeQualityHint(type, cfg.quality)) {
                            return true;
                        }
                    }
                    return false;
                };
                //兽灵红点
                YishouProxy.prototype.updateHint3 = function () {
                    var cfgs = this.getShoulingCfgs(1);
                    var hint = false;
                    for (var _i = 0, cfgs_2 = cfgs; _i < cfgs_2.length; _i++) {
                        var cfg = cfgs_2[_i];
                        if (this.getShoulingHint(cfg.index)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.hintPath2[1]);
                };
                //兽魂消耗
                YishouProxy.prototype.getShouhunCost = function () {
                    if (this._shouhunCostAry) {
                        return this._shouhunCostAry;
                    }
                    this._shouhunCostAry = [];
                    for (var _i = 0, YishouTypeAry_2 = game.YishouTypeAry; _i < YishouTypeAry_2.length; _i++) {
                        var type = YishouTypeAry_2[_i];
                        var cfg = this.getShouhunCfg(type, 0);
                        if (!cfg || !cfg.star_consume) {
                            continue;
                        }
                        var cost = cfg.star_consume[0];
                        if (cost && this._shouhunCostAry.indexOf(cost[0]) < 0) {
                            this._shouhunCostAry.push(cost[0]);
                        }
                    }
                    return this._shouhunCostAry;
                };
                YishouProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670204 /* Yishou */)) {
                        return;
                    }
                    var indexs = n.body;
                    var costAry = this.getShouhunCost();
                    for (var _i = 0, indexs_1 = indexs; _i < indexs_1.length; _i++) {
                        var index = indexs_1[_i];
                        if (costAry.indexOf(index) > -1) {
                            this.updateHint2();
                            break;
                        }
                    }
                };
                YishouProxy.prototype.onBagUpdateByBagType = function (n) {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670204 /* Yishou */)) {
                        return;
                    }
                    var bagTypes = n.body;
                    if (bagTypes.indexOf(2 /* Material */) > -1) {
                        this.updateHint3();
                        this.updateHint4();
                    }
                    if (bagTypes.indexOf(8 /* Yishou */) > -1) {
                        this.updateHint1();
                    }
                };
                //兽印配置
                YishouProxy.prototype.getShouyinCfgList = function (type) {
                    if (this._shouyinCfgMap[type]) {
                        return this._shouyinCfgMap[type];
                    }
                    this._shouyinCfgMap = {};
                    var cfgList = game.getConfigListByName("yishou_shouying.json" /* YishouShouyin */);
                    for (var _i = 0, cfgList_3 = cfgList; _i < cfgList_3.length; _i++) {
                        var cfg = cfgList_3[_i];
                        var type_1 = cfg.type;
                        if (!this._shouyinCfgMap[type_1]) {
                            this._shouyinCfgMap[type_1] = [];
                        }
                        if (!cfg.show) {
                            continue;
                        }
                        this._shouyinCfgMap[type_1].push(cfg);
                    }
                    return this._shouyinCfgMap[type] || [];
                };
                YishouProxy.prototype.getShouyinCfg = function (index) {
                    return game.getConfigByNameId("yishou_shouying.json" /* YishouShouyin */, index);
                };
                //兽印数据
                YishouProxy.prototype.getShouyinInfo = function (index) {
                    return this._model.shouying_list[index];
                };
                YishouProxy.prototype.getShouyinMaxStar = function (index) {
                    if (this._shouyinMaxStarMap[index]) {
                        return this._shouyinMaxStarMap[index];
                    }
                    var cfg = this.getShouyinCfg(index);
                    if (!cfg || !cfg.material) {
                        return 0;
                    }
                    return this._shouyinMaxStarMap[index] = cfg.material.length;
                };
                //兽印星级
                YishouProxy.prototype.getShouyinStar = function (index) {
                    var info = this.getShouyinInfo(index);
                    return info && info.star || 0;
                };
                //兽印满星
                YishouProxy.prototype.isShouyinMaxStar = function (index) {
                    var curStar = this.getShouyinStar(index);
                    var maxStar = this.getShouyinMaxStar(index);
                    return curStar >= maxStar;
                };
                //兽印能否激活或升星
                YishouProxy.prototype.canShouyinActOrUp = function (index, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isShouyinMaxStar(index)) {
                        if (isTips) {
                            game.PromptBox.getIns().show(game.getLanById("maxstar" /* maxstar */));
                        }
                        return false;
                    }
                    var cfg = this.getShouyinCfg(index);
                    var curStar = this.getShouyinStar(index);
                    var cost = cfg.material[curStar];
                    return cost && mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                //兽印类型红点（激活升星红点）
                YishouProxy.prototype.getShouyinHintByType = function (type) {
                    var cfgList = this.getShouyinCfgList(type);
                    for (var _i = 0, cfgList_4 = cfgList; _i < cfgList_4.length; _i++) {
                        var cfg = cfgList_4[_i];
                        if (this.canShouyinActOrUp(cfg.index)) {
                            return true;
                        }
                    }
                    return false;
                };
                YishouProxy.prototype.updateHint4 = function () {
                    var ary = [1 /* Type1 */, 2 /* Type2 */, 3 /* Type3 */];
                    var jibanHint = this.getJibanBtnHint(); //羁绊红点
                    for (var _i = 0, ary_1 = ary; _i < ary_1.length; _i++) {
                        var type = ary_1[_i];
                        var hint = this.getShouyinHintByType(type) || jibanHint;
                        mod.HintMgr.setHint(hint, this._model.hintPath3[type]);
                    }
                    mod.HintMgr.setHint(jibanHint, this._model.jibanHint);
                };
                //羁绊数据
                YishouProxy.prototype.getJibanInfo = function (jibanIndex) {
                    return this._model.jiban_list[jibanIndex];
                };
                //羁绊组成是否激活
                YishouProxy.prototype.isJibanIconActed = function (jibanIndex, partnerIndex) {
                    var info = this.getJibanInfo(jibanIndex);
                    if (!info || !info.list) {
                        return false;
                    }
                    return info.list.indexOf(partnerIndex) > -1;
                };
                //羁绊是否激活
                YishouProxy.prototype.isJibanActed = function (jibanIndex) {
                    var info = this.getJibanInfo(jibanIndex);
                    return info && info.is_active;
                };
                //羁绊组成能否激活
                YishouProxy.prototype.canJibanIconAct = function (jibanIndex, partnerIndex) {
                    if (this.isJibanIconActed(jibanIndex, partnerIndex)) {
                        return false;
                    }
                    var shouyinInfo = this.getShouyinInfo(partnerIndex);
                    return !!(shouyinInfo && shouyinInfo.star);
                };
                //羁绊能否激活
                YishouProxy.prototype.canJibanAct = function (jibanIndex) {
                    if (this.isJibanActed(jibanIndex)) {
                        return false;
                    }
                    var jibanCfg = game.getConfigByNameId("yishou_shouying_suit.json" /* YishouShouyinSuit */, jibanIndex);
                    if (!jibanCfg || !jibanCfg.partners) {
                        return false;
                    }
                    var partnersLen = jibanCfg.partners.length;
                    var info = this.getJibanInfo(jibanIndex);
                    var actedLen = info && info.list ? info.list.length : 0;
                    return actedLen >= partnersLen;
                };
                //获取羁绊激活的外显id列表
                YishouProxy.prototype.getJibanIconActedList = function (jibanIndex) {
                    var info = this.getJibanInfo(jibanIndex);
                    return info && info.list ? info.list : [];
                };
                //羁绊红点
                YishouProxy.prototype.getJibanHint = function (jibanIndex) {
                    if (this.isJibanActed(jibanIndex)) {
                        return false;
                    }
                    if (this.canJibanAct(jibanIndex)) {
                        return true;
                    }
                    var jibanCfg = game.getConfigByNameId("yishou_shouying_suit.json" /* YishouShouyinSuit */, jibanIndex);
                    if (!jibanCfg || !jibanCfg.partners) {
                        return false;
                    }
                    for (var _i = 0, _a = jibanCfg.partners; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (this.canJibanIconAct(jibanIndex, item)) {
                            return true;
                        }
                    }
                    return false;
                };
                //羁绊按钮红点
                YishouProxy.prototype.getJibanBtnHint = function () {
                    var jibanCfgList = game.getConfigListByName("yishou_shouying_suit.json" /* YishouShouyinSuit */);
                    for (var _i = 0, jibanCfgList_1 = jibanCfgList; _i < jibanCfgList_1.length; _i++) {
                        var cfg = jibanCfgList_1[_i];
                        var hint = this.getJibanHint(cfg.index);
                        if (hint) {
                            return true;
                        }
                    }
                    return false;
                };
                //特殊属性文本
                YishouProxy.prototype.getSpecialAttrDesc = function (shoulingIndex) {
                    var proxy = game.getProxy("46" /* Surface */, 190 /* Surface */);
                    var shoulingCfg = this.getShoulingCfg(shoulingIndex);
                    return proxy.getSpecialAttrDesc(shoulingIndex, shoulingCfg.special_attr_id);
                };
                return YishouProxy;
            }(game.ProxyBase));
            yishou.YishouProxy = YishouProxy;
            __reflect(YishouProxy.prototype, "game.mod.yishou.YishouProxy", ["game.mod.IYishouProxy", "base.IProxy"]);
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var facade = base.facade;
            var YishouEquipIcon = /** @class */ (function (_super) {
                __extends(YishouEquipIcon, _super);
                function YishouEquipIcon() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouEquipIconSkin";
                    return _this;
                }
                YishouEquipIcon.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
                };
                YishouEquipIcon.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this.removeEft();
                };
                YishouEquipIcon.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.redPoint.visible = !!data.showHint;
                    this.gr_star.visible = !!data.isActed;
                    if (!data.isActed) {
                        this.img_icon.source = "icon_jia";
                        this.img_quality.source = game.ResUtil.getPropQualityImg(0, true);
                    }
                    else {
                        var cfg = game.GameConfig.getEquipmentCfg(data.index);
                        this.img_quality.source = game.ResUtil.getPropQualityImg(cfg && cfg.quality || 0, true);
                        this.img_icon.source = cfg && cfg.icon || '';
                        var star = Math.floor(data.index / 10) % 10;
                        this.gr_star.visible = star > 0;
                        this.starListView.updateStar(star, star);
                    }
                    this.addIconEft();
                };
                YishouEquipIcon.prototype.onClick = function () {
                    var data = this.data;
                    if (data && data.index) {
                        facade.showView("62" /* Yishou */, "06" /* ShouguEquipTips */, data.index);
                    }
                    else {
                        game.PromptBox.getIns().show(game.getLanById("not_equip" /* not_equip */));
                    }
                };
                YishouEquipIcon.prototype.addIconEft = function () {
                    var cfg = this.data.index ? game.GameConfig.getEquipmentCfg(this.data.index) : null;
                    if (!cfg || cfg.quality < 4 /* RED */) {
                        this.removeEft();
                        return;
                    }
                    var eftSrc = "pinzhihex_" + cfg.quality;
                    if (this.eftSrc == eftSrc) {
                        return;
                    }
                    this.removeEft();
                    this.addEftByParent(eftSrc, this.gr_eft);
                };
                return YishouEquipIcon;
            }(mod.BaseRenderer));
            yishou.YishouEquipIcon = YishouEquipIcon;
            __reflect(YishouEquipIcon.prototype, "game.mod.yishou.YishouEquipIcon");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var facade = base.facade;
            var YishouShouguBagTabItem = /** @class */ (function (_super) {
                __extends(YishouShouguBagTabItem, _super);
                function YishouShouguBagTabItem() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._selIdx = 0;
                    return _this;
                }
                YishouShouguBagTabItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("62" /* Yishou */, 243 /* Yishou */);
                    this.addEventListenerEx(eui.ItemTapEvent.ITEM_TAP, this.list_item, this.onClickList, this);
                    this.list_item.itemRenderer = yishou.YishouShouguBagTabStarItem;
                    this.list_item.dataProvider = this._listData = new eui.ArrayCollection();
                };
                YishouShouguBagTabItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                YishouShouguBagTabItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lab_type.text = game.ColorUtil.getColorChineseStrByQua2(data.cfg.quality) + game.getLanById("se" /* se */);
                    if (data.isSel) {
                        this.updateListData();
                    }
                    else {
                        this._listData.source = null;
                        this.list_item.selectedIndex = -1;
                    }
                    this.redPoint.visible = !!data.showHint;
                };
                YishouShouguBagTabItem.prototype.updateListData = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data.cfg;
                    var starList = cfg.star;
                    var list = [];
                    var selIdx;
                    for (var i = 0; i < starList.length; i++) {
                        var star = starList[i];
                        var showHint = this._proxy.getComposeStarHint(this.data.type, cfg.quality, star); //三级红点
                        list.push({
                            star: star,
                            showHint: showHint
                        });
                        if (selIdx == undefined && showHint) {
                            selIdx = i;
                        }
                    }
                    if (selIdx != undefined) {
                        this._selIdx = selIdx;
                    }
                    this._listData.source = list;
                    this.list_item.selectedIndex = this._selIdx;
                };
                //选择星级
                YishouShouguBagTabItem.prototype.onClickList = function (e) {
                    this._proxy.selStar = true;
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selIdx) {
                        return;
                    }
                    this._selIdx = itemIdx;
                    var itemData = e.item;
                    //抛出选中事件
                    facade.sendNt("on_update_yishou_compose_select" /* ON_UPDATE_YISHOU_COMPOSE_SELECT */, itemData.star);
                };
                return YishouShouguBagTabItem;
            }(mod.BaseListenerRenderer));
            yishou.YishouShouguBagTabItem = YishouShouguBagTabItem;
            __reflect(YishouShouguBagTabItem.prototype, "game.mod.yishou.YishouShouguBagTabItem");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouguBagTabStarItem = /** @class */ (function (_super) {
                __extends(YishouShouguBagTabStarItem, _super);
                function YishouShouguBagTabStarItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YishouShouguBagTabStarItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                };
                YishouShouguBagTabStarItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                YishouShouguBagTabStarItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lab_name.text = data.star + game.getLanById("soul2" /* soul2 */);
                    this.redPoint.visible = !!data.showHint;
                };
                return YishouShouguBagTabStarItem;
            }(mod.BaseListenerRenderer));
            yishou.YishouShouguBagTabStarItem = YishouShouguBagTabStarItem;
            __reflect(YishouShouguBagTabStarItem.prototype, "game.mod.yishou.YishouShouguBagTabStarItem");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouguDecomposeIcon = /** @class */ (function (_super) {
                __extends(YishouShouguDecomposeIcon, _super);
                function YishouShouguDecomposeIcon() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YishouShouguDecomposeIcon.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data || !data.prop) {
                        return;
                    }
                    var prop = data.prop;
                    this.icon.setData(prop, 3 /* NotTips */);
                    this.icon.updateName();
                    this.icon.updateQualityImg(game.ResUtil.getPropQualityImg(prop.quality));
                    this.icon.updateIconImg(prop.cfg.icon);
                    this.img_sel.visible = !!data.sel;
                };
                return YishouShouguDecomposeIcon;
            }(mod.IconSelMany));
            yishou.YishouShouguDecomposeIcon = YishouShouguDecomposeIcon;
            __reflect(YishouShouguDecomposeIcon.prototype, "game.mod.yishou.YishouShouguDecomposeIcon");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouTypeIcon = /** @class */ (function (_super) {
                __extends(YishouTypeIcon, _super);
                function YishouTypeIcon() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouTypeIconSkin";
                    return _this;
                }
                YishouTypeIcon.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                };
                YishouTypeIcon.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                YishouTypeIcon.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.gr_lock.visible = !data.isActed;
                    this.redPoint.visible = !!data.showHint;
                    this.img_icon.source = "yishou_type" + data.type;
                };
                return YishouTypeIcon;
            }(mod.BaseListenerRenderer));
            yishou.YishouTypeIcon = YishouTypeIcon;
            __reflect(YishouTypeIcon.prototype, "game.mod.yishou.YishouTypeIcon");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouTypeIconListComp = /** @class */ (function (_super) {
                __extends(YishouTypeIconListComp, _super);
                function YishouTypeIconListComp() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouTypeIconListSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                YishouTypeIconListComp.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("62" /* Yishou */, 243 /* Yishou */);
                    this.list.itemRenderer = yishou.YishouTypeIcon;
                    this.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                };
                YishouTypeIconListComp.prototype.onRemoveFromStage = function () {
                    this._listData.removeAll();
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                };
                /**更新类型*/
                YishouTypeIconListComp.prototype.updateListView = function (mdrType) {
                    if (mdrType === void 0) { mdrType = 1 /* Shougu */; }
                    var ary = game.YishouTypeAry;
                    var list = [];
                    for (var _i = 0, ary_2 = ary; _i < ary_2.length; _i++) {
                        var type = ary_2[_i];
                        list.push({
                            type: type,
                            isActed: this._proxy.checkTypeActed(type),
                            showHint: this.getHint(type, mdrType)
                        });
                    }
                    this._listData.replaceAll(list);
                };
                YishouTypeIconListComp.prototype.getHint = function (type, mdrType) {
                    if (mdrType === void 0) { mdrType = 1 /* Shougu */; }
                    return this._proxy.getHintByType(type, mdrType);
                };
                return YishouTypeIconListComp;
            }(eui.Component));
            yishou.YishouTypeIconListComp = YishouTypeIconListComp;
            __reflect(YishouTypeIconListComp.prototype, "game.mod.yishou.YishouTypeIconListComp");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var facade = base.facade;
            var Handler = base.Handler;
            var YishouShouguBagIconName = /** @class */ (function (_super) {
                __extends(YishouShouguBagIconName, _super);
                function YishouShouguBagIconName() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YishouShouguBagIconName.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._yishouProxy = game.getProxy("62" /* Yishou */, 243 /* Yishou */);
                };
                YishouShouguBagIconName.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    if (this.data) {
                        var data = this.data;
                        var index = data.index;
                        var type = Math.floor(index / 100) % 10;
                        var pos = index % 10;
                        var posEquip = this._yishouProxy.getEquipInfo(type, pos);
                        var equipAttr = posEquip && posEquip.regular_attrs ? posEquip.regular_attrs : null;
                        //当前穿戴的战力
                        var equipPower = equipAttr && equipAttr.showpower ? equipAttr.showpower.toNumber() : 0;
                        //此装备的战力
                        var propPower = data.regular_attrs && data.regular_attrs.showpower ? data.regular_attrs.showpower.toNumber() : 0;
                        var hint = false;
                        var reincarnate = game.RoleVo.ins.reincarnate;
                        var rein = data.cfg.rebirth_limit;
                        if (propPower > equipPower && reincarnate >= rein) {
                            hint = true;
                        }
                        this.setHint(hint);
                        this.setClickHandler(Handler.alloc(this, this.onClick));
                    }
                    else {
                        this.setHint(false);
                    }
                };
                YishouShouguBagIconName.prototype.onClick = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    facade.showView("62" /* Yishou */, "08" /* ShouguEquipTips2 */, data);
                };
                return YishouShouguBagIconName;
            }(mod.IconName));
            yishou.YishouShouguBagIconName = YishouShouguBagIconName;
            __reflect(YishouShouguBagIconName.prototype, "game.mod.yishou.YishouShouguBagIconName");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouguBagView = /** @class */ (function (_super) {
                __extends(YishouShouguBagView, _super);
                function YishouShouguBagView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShouguBagSkin";
                    return _this;
                }
                return YishouShouguBagView;
            }(eui.Component));
            yishou.YishouShouguBagView = YishouShouguBagView;
            __reflect(YishouShouguBagView.prototype, "game.mod.yishou.YishouShouguBagView");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouguComposeView = /** @class */ (function (_super) {
                __extends(YishouShouguComposeView, _super);
                function YishouShouguComposeView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShouguComposeSkin";
                    return _this;
                }
                return YishouShouguComposeView;
            }(eui.Component));
            yishou.YishouShouguComposeView = YishouShouguComposeView;
            __reflect(YishouShouguComposeView.prototype, "game.mod.yishou.YishouShouguComposeView");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouguDecomposeView = /** @class */ (function (_super) {
                __extends(YishouShouguDecomposeView, _super);
                function YishouShouguDecomposeView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShouguDecomposeSkin";
                    return _this;
                }
                return YishouShouguDecomposeView;
            }(eui.Component));
            yishou.YishouShouguDecomposeView = YishouShouguDecomposeView;
            __reflect(YishouShouguDecomposeView.prototype, "game.mod.yishou.YishouShouguDecomposeView");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouguEquipListComp = /** @class */ (function (_super) {
                __extends(YishouShouguEquipListComp, _super);
                function YishouShouguEquipListComp() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.ShouguEquipListSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                YishouShouguEquipListComp.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("62" /* Yishou */, 243 /* Yishou */);
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                };
                YishouShouguEquipListComp.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                };
                /**更新部位*/
                YishouShouguEquipListComp.prototype.updateEquipListView = function (type) {
                    var size = game.YishouShouguPosAry.length;
                    for (var i = 0; i < size; i++) {
                        var pos = game.YishouShouguPosAry[i];
                        var equip = this._proxy.getEquipInfo(type, pos);
                        var data = {
                            index: equip ? equip.index.toNumber() : 0,
                            showHint: this._proxy.canDressByTypeAndPos(type, pos),
                            isActed: !!equip
                        };
                        this["icon" + i].data = data;
                    }
                };
                return YishouShouguEquipListComp;
            }(eui.Component));
            yishou.YishouShouguEquipListComp = YishouShouguEquipListComp;
            __reflect(YishouShouguEquipListComp.prototype, "game.mod.yishou.YishouShouguEquipListComp");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouguEquipTipsView = /** @class */ (function (_super) {
                __extends(YishouShouguEquipTipsView, _super);
                function YishouShouguEquipTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShouguEquipTipsSkin";
                    return _this;
                }
                return YishouShouguEquipTipsView;
            }(eui.Component));
            yishou.YishouShouguEquipTipsView = YishouShouguEquipTipsView;
            __reflect(YishouShouguEquipTipsView.prototype, "game.mod.yishou.YishouShouguEquipTipsView");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var facade = base.facade;
            var YishouShouguSkillComp = /** @class */ (function (_super) {
                __extends(YishouShouguSkillComp, _super);
                function YishouShouguSkillComp() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShouguSkillCompSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                YishouShouguSkillComp.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("62" /* Yishou */, 243 /* Yishou */);
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.img_skill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSkill, this);
                    if (!this._hub) {
                        this._hub = new game.UIEftHub(this);
                    }
                };
                YishouShouguSkillComp.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.img_skill.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSkill, this);
                    if (this._hub) {
                        this._hub.removeAllEffects();
                    }
                };
                /**更新技能进阶*/
                YishouShouguSkillComp.prototype.updateSkillView = function (type) {
                    this._type = type;
                    var typeCfg = this._proxy.getYishoucfg(type);
                    var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, typeCfg.skill);
                    this.img_skill.source = skillCfg && skillCfg.icon || '';
                    var curStage = this._proxy.getCurStage(type);
                    this.img_type.source = "yishou_type_name" + type;
                    this._hub.addBmpFont(curStage + game.getLanById("tishi_43" /* tishi_43 */), game.BmpTextCfg[217 /* CommonStage1 */], this.gr_font, true, 1, false, 0, true);
                    this.addSkillEft();
                    //满阶
                    if (this._proxy.isMaxStage(type)) {
                        this.lb_cond.text = '';
                        return;
                    }
                    var cond = this._proxy.getStageCondition(type, curStage + 1);
                    var satisfyCnt = this._proxy.getStageSatisfyCnt(type); //满足条件个数
                    var qualityName = game.ColorUtil.getColorChineseStrByQua2(cond[1]);
                    var totalCnt = cond[3];
                    var color = satisfyCnt >= totalCnt ? 2330156 /* GREEN */ : 16719376 /* RED */;
                    var str = game.StringUtil.substitute(game.getLanById("yishou_tips18" /* yishou_tips18 */), [qualityName + "\u8272" + cond[2] + "\u661F", typeCfg.type_name]);
                    this.lb_cond.textFlow = game.TextUtil.parseHtml(game.getLanById("yishou_tips17" /* yishou_tips17 */) + ': '
                        + game.TextUtil.addColor(str, 15855403 /* YELLOW */)
                        + game.TextUtil.addColor("(" + satisfyCnt + "/" + totalCnt + ")", color));
                };
                YishouShouguSkillComp.prototype.onClickSkill = function () {
                    facade.showView("62" /* Yishou */, "05" /* ShouguSkillTips */, this._type);
                };
                YishouShouguSkillComp.prototype.addSkillEft = function () {
                    var curStage = this._proxy.getCurStage(this._type);
                    this.removeSkillEft();
                    if (curStage < 1) {
                        return;
                    }
                    this._skillEftId = this._hub.add("yishoujineng" /* Yishoujineng */, 0, 0, null, 0, this.gr_eft, -1);
                };
                YishouShouguSkillComp.prototype.removeSkillEft = function () {
                    if (this._skillEftId) {
                        this._hub.removeEffect(this._skillEftId);
                    }
                };
                return YishouShouguSkillComp;
            }(eui.Component));
            yishou.YishouShouguSkillComp = YishouShouguSkillComp;
            __reflect(YishouShouguSkillComp.prototype, "game.mod.yishou.YishouShouguSkillComp");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouguSkillTipsView = /** @class */ (function (_super) {
                __extends(YishouShouguSkillTipsView, _super);
                function YishouShouguSkillTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShouguSkillTipsSkin";
                    return _this;
                }
                return YishouShouguSkillTipsView;
            }(eui.Component));
            yishou.YishouShouguSkillTipsView = YishouShouguSkillTipsView;
            __reflect(YishouShouguSkillTipsView.prototype, "game.mod.yishou.YishouShouguSkillTipsView");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouguView = /** @class */ (function (_super) {
                __extends(YishouShouguView, _super);
                function YishouShouguView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShouguSkin";
                    return _this;
                }
                return YishouShouguView;
            }(eui.Component));
            yishou.YishouShouguView = YishouShouguView;
            __reflect(YishouShouguView.prototype, "game.mod.yishou.YishouShouguView");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouhunSkillTipsView = /** @class */ (function (_super) {
                __extends(YishouShouhunSkillTipsView, _super);
                function YishouShouhunSkillTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShouhunSkillTipsSkin";
                    return _this;
                }
                return YishouShouhunSkillTipsView;
            }(eui.Component));
            yishou.YishouShouhunSkillTipsView = YishouShouhunSkillTipsView;
            __reflect(YishouShouhunSkillTipsView.prototype, "game.mod.yishou.YishouShouhunSkillTipsView");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouhunView = /** @class */ (function (_super) {
                __extends(YishouShouhunView, _super);
                function YishouShouhunView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShouhunSkin";
                    return _this;
                }
                return YishouShouhunView;
            }(eui.Component));
            yishou.YishouShouhunView = YishouShouhunView;
            __reflect(YishouShouhunView.prototype, "game.mod.yishou.YishouShouhunView");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShoulingAvatarItem = /** @class */ (function (_super) {
                __extends(YishouShoulingAvatarItem, _super);
                function YishouShoulingAvatarItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YishouShoulingAvatarItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.starCom.visible = false;
                };
                YishouShoulingAvatarItem.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                };
                return YishouShoulingAvatarItem;
            }(mod.AvatarItem));
            yishou.YishouShoulingAvatarItem = YishouShoulingAvatarItem;
            __reflect(YishouShoulingAvatarItem.prototype, "game.mod.yishou.YishouShoulingAvatarItem");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouMod = /** @class */ (function (_super) {
                __extends(YishouMod, _super);
                function YishouMod() {
                    return _super.call(this, "62" /* Yishou */) || this;
                }
                YishouMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                YishouMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(243 /* Yishou */, yishou.YishouProxy);
                };
                YishouMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* Main */, yishou.YishouMainMdr);
                    this.regMdr("02" /* Bag */, yishou.YishouShouguBagMdr);
                    this.regMdr("03" /* Compose */, yishou.YishouShouguComposeMdr);
                    this.regMdr("04" /* Decompose */, yishou.YishouShouguDecomposeMdr);
                    this.regMdr("05" /* ShouguSkillTips */, yishou.YishouShouguSkillTipsMdr);
                    this.regMdr("06" /* ShouguEquipTips */, yishou.YishouShouguEquipTipsMdr);
                    this.regMdr("07" /* ShouhunSkillTips */, yishou.YishouShouhunSkillTipsMdr);
                    this.regMdr("08" /* ShouguEquipTips2 */, yishou.YishouShouguEquipTipsMdr2);
                    this.regMdr("09" /* ShoulingSkillTips */, yishou.YishouShoulingSkillTipsMdr);
                    this.regMdr("10" /* ShoulingEquipTips */, yishou.YishouShoulingEquipTipsMdr);
                    this.regMdr("11" /* ShoulingEquipTipsBag */, yishou.YishouShoulingEquipTipsBagMdr);
                };
                return YishouMod;
            }(game.ModBase));
            yishou.YishouMod = YishouMod;
            __reflect(YishouMod.prototype, "game.mod.yishou.YishouMod");
            gso.modCls.push(YishouMod);
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShoulingEquipTipsBagView = /** @class */ (function (_super) {
                __extends(YishouShoulingEquipTipsBagView, _super);
                function YishouShoulingEquipTipsBagView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShoulingEquipTipsBagSkin";
                    return _this;
                }
                return YishouShoulingEquipTipsBagView;
            }(eui.Component));
            yishou.YishouShoulingEquipTipsBagView = YishouShoulingEquipTipsBagView;
            __reflect(YishouShoulingEquipTipsBagView.prototype, "game.mod.yishou.YishouShoulingEquipTipsBagView");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShoulingEquipTipsView = /** @class */ (function (_super) {
                __extends(YishouShoulingEquipTipsView, _super);
                function YishouShoulingEquipTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShoulingEquipTipsSkin";
                    return _this;
                }
                return YishouShoulingEquipTipsView;
            }(eui.Component));
            yishou.YishouShoulingEquipTipsView = YishouShoulingEquipTipsView;
            __reflect(YishouShoulingEquipTipsView.prototype, "game.mod.yishou.YishouShoulingEquipTipsView");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var facade = base.facade;
            var YishouShoulingSkillComp = /** @class */ (function (_super) {
                __extends(YishouShoulingSkillComp, _super);
                function YishouShoulingSkillComp() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShoulingSkillCompSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                YishouShoulingSkillComp.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("62" /* Yishou */, 243 /* Yishou */);
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.skillItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    facade.onNt("surface_special_attr_update" /* SURFACE_SPECIAL_ATTR_UPDATE */, this.updateSpecialDesc, this);
                };
                YishouShoulingSkillComp.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.skillItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    facade.offNt("surface_special_attr_update" /* SURFACE_SPECIAL_ATTR_UPDATE */, this.updateSpecialDesc, this);
                };
                YishouShoulingSkillComp.prototype.onClick = function () {
                    facade.showView("62" /* Yishou */, "09" /* ShoulingSkillTips */, this._cfg);
                };
                YishouShoulingSkillComp.prototype.updateView = function (cfg) {
                    if (!cfg) {
                        return;
                    }
                    this._cfg = cfg;
                    this.skillItem.img_bg.source = "jinengkuang";
                    this.skillItem.img_icon.source = cfg.icon;
                    this.skillItem.img_icon.verticalCenter = -5.5;
                    this.lb_skillname.text = cfg.skill_name;
                    this.skillItem.redPoint.visible = this._proxy.canShoulingAct(cfg.index);
                    this._index = cfg.index;
                    this._specialindex = cfg.special_attr_id;
                    this.updateSpecialDesc();
                };
                //特殊属性更新
                YishouShoulingSkillComp.prototype.updateSpecialDesc = function () {
                    var descStr = this._proxy.getSpecialAttrDesc(this._index);
                    this.lb_skilldesc.textFlow = game.TextUtil.parseHtml(descStr);
                };
                return YishouShoulingSkillComp;
            }(eui.Component));
            yishou.YishouShoulingSkillComp = YishouShoulingSkillComp;
            __reflect(YishouShoulingSkillComp.prototype, "game.mod.yishou.YishouShoulingSkillComp");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShoulingSkillTipsView = /** @class */ (function (_super) {
                __extends(YishouShoulingSkillTipsView, _super);
                function YishouShoulingSkillTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShoulingSkillTipsSkin";
                    return _this;
                }
                return YishouShoulingSkillTipsView;
            }(eui.Component));
            yishou.YishouShoulingSkillTipsView = YishouShoulingSkillTipsView;
            __reflect(YishouShoulingSkillTipsView.prototype, "game.mod.yishou.YishouShoulingSkillTipsView");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShoulingView = /** @class */ (function (_super) {
                __extends(YishouShoulingView, _super);
                function YishouShoulingView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShoulingSkin";
                    return _this;
                }
                return YishouShoulingView;
            }(eui.Component));
            yishou.YishouShoulingView = YishouShoulingView;
            __reflect(YishouShoulingView.prototype, "game.mod.yishou.YishouShoulingView");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouyinView = /** @class */ (function (_super) {
                __extends(YishouShouyinView, _super);
                function YishouShouyinView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.yishou.YishouShouyinSkin";
                    return _this;
                }
                return YishouShouyinView;
            }(eui.Component));
            yishou.YishouShouyinView = YishouShouyinView;
            __reflect(YishouShouyinView.prototype, "game.mod.yishou.YishouShouyinView");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var facade = base.facade;
            var YishouShouguBagMdr = /** @class */ (function (_super) {
                __extends(YishouShouguBagMdr, _super);
                function YishouShouguBagMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yishou.YishouShouguBagView);
                    _this._selIdx = 0;
                    _this.isEasyHide = true;
                    return _this;
                }
                YishouShouguBagMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(243 /* Yishou */);
                    this._view.list.itemRenderer = yishou.YishouShouguBagIconName;
                    this._view.list.dataProvider = this._listIcon = new eui.ArrayCollection();
                    this._view.list_type.itemRenderer = mod.TabSecondItem;
                    this._view.list_type.dataProvider = this._listType = new eui.ArrayCollection();
                };
                YishouShouguBagMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_type, eui.ItemTapEvent.ITEM_TAP, this.onClickListType, this);
                    // addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickIcon, this);
                    // this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdateByBagType, this);
                    this.onNt("on_update_yishou_equip_info" /* ON_UPDATE_YISHOU_EQUIP_INFO */, this.onUpdateView, this);
                };
                YishouShouguBagMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                YishouShouguBagMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selIdx = 0;
                    this.initScroller();
                };
                YishouShouguBagMdr.prototype.initScroller = function () {
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollV = 0;
                };
                YishouShouguBagMdr.prototype.onUpdateView = function () {
                    this.updateListType();
                    this.updateView();
                };
                YishouShouguBagMdr.prototype.updateListType = function () {
                    var ary = game.YishouTypeAry;
                    var list = [];
                    for (var _i = 0, ary_3 = ary; _i < ary_3.length; _i++) {
                        var type = ary_3[_i];
                        list.push({
                            icon: "yishou_second_tap" + type,
                            showHint: this._proxy.canOnekey(type)
                        });
                    }
                    this._listType.replaceAll(list);
                    this._view.list_type.selectedIndex = this._selIdx = 0;
                };
                YishouShouguBagMdr.prototype.updateView = function () {
                    var list = this.getIconList();
                    var cnt = list.length;
                    if (list.length < game.YishouBagCnt) {
                        list.length = game.YishouBagCnt;
                    }
                    this._listIcon.replaceAll(list);
                    var bagProxy = game.getProxy("12" /* Bag */, 12 /* Bag */);
                    var totalCnt = bagProxy.getBagMaxCnt(8 /* Yishou */);
                    this._view.lb_num.textFlow = game.TextUtil.parseHtml(game.getLanById("yishou_tips9" /* yishou_tips9 */)
                        + game.TextUtil.addColor(cnt + "/" + totalCnt, 2330156 /* GREEN */));
                };
                YishouShouguBagMdr.prototype.getIconList = function () {
                    var type = this.getType();
                    return this._proxy.getBagDatas(type);
                };
                YishouShouguBagMdr.prototype.onClickListType = function (e) {
                    var idx = e.itemIndex;
                    if (this._selIdx == idx) {
                        return;
                    }
                    var type = game.YishouTypeAry[idx];
                    if (!this._proxy.checkTypeActed(type, true)) {
                        this._view.list_type.selectedIndex = this._selIdx;
                        return;
                    }
                    this._selIdx = idx;
                    this.initScroller();
                    this.updateView();
                };
                //获取类型
                YishouShouguBagMdr.prototype.getType = function () {
                    return game.YishouTypeAry[this._selIdx];
                };
                YishouShouguBagMdr.prototype.onBagUpdateByBagType = function (n) {
                    var types = n.body;
                    if (types.indexOf(8 /* Yishou */) > -1) {
                        this.onUpdateView();
                    }
                };
                YishouShouguBagMdr.prototype.onClickIcon = function (e) {
                    var data = e.item;
                    if (!data) {
                        return;
                    }
                    facade.showView("62" /* Yishou */, "08" /* ShouguEquipTips2 */, data);
                };
                return YishouShouguBagMdr;
            }(game.MdrBase));
            yishou.YishouShouguBagMdr = YishouShouguBagMdr;
            __reflect(YishouShouguBagMdr.prototype, "game.mod.yishou.YishouShouguBagMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouguComposeMdr = /** @class */ (function (_super) {
                __extends(YishouShouguComposeMdr, _super);
                function YishouShouguComposeMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yishou.YishouShouguComposeView);
                    _this._selQualityIdx = 0;
                    _this._selPosIdx = 0;
                    _this._costAry = []; //消耗的装备id和数量
                    _this._selCnt = 1; //合成数量
                    _this.isEasyHide = true;
                    return _this;
                }
                YishouShouguComposeMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(243 /* Yishou */);
                    this._view.list_name.itemRenderer = mod.TabSecondItem;
                    this._view.list_name.dataProvider = this._listBtn = new eui.ArrayCollection();
                    this._view.list_type.itemRenderer = yishou.YishouShouguBagTabItem;
                    this._view.list_type.dataProvider = this._listType = new eui.ArrayCollection();
                    this._view.list_item.itemRenderer = mod.BtnTabItem;
                    this._view.list_item.dataProvider = this._listItem = new eui.ArrayCollection();
                    this._view.scr["$hasScissor"] = true;
                    this._view.list_type.useVirtualLayout = false;
                };
                YishouShouguComposeMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_sub, egret.TouchEvent.TOUCH_TAP, this.onClickSub, this);
                    addEventListener(this._view.btn_add, egret.TouchEvent.TOUCH_TAP, this.onClickAdd, this);
                    addEventListener(this._view.btn_compose, egret.TouchEvent.TOUCH_TAP, this.onClickCompose, this);
                    addEventListener(this._view.list_type, eui.ItemTapEvent.ITEM_TAP, this.onClickType);
                    addEventListener(this._view.list_item, eui.ItemTapEvent.ITEM_TAP, this.onClickItem);
                    this.onNt("on_update_yishou_compose_select" /* ON_UPDATE_YISHOU_COMPOSE_SELECT */, this.updateStarUpdate, this);
                    // this.onNt(BagEvent.ON_BAG_UPDATE_BY_BAG_TYPE, this.onBagUpdateByBagType, this);
                    this.onNt("on_update_yishou_synthese_success" /* ON_UPDATE_YISHOU_SYNTHESE_SUCCESS */, this.onSyntheseSuccess, this);
                };
                YishouShouguComposeMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this.updateListBtn();
                    this.updateListType();
                    this.updateListItem();
                };
                YishouShouguComposeMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selQualityIdx = 0;
                    this._selPosIdx = 0;
                    this._costAry = null;
                    this._selCnt = 1;
                    this._equipId = null;
                    this._proxy.selComposeAry = [];
                };
                //底部按钮
                YishouShouguComposeMdr.prototype.updateListBtn = function () {
                    var type = this._showArgs;
                    var list = [];
                    list.push({
                        icon: "yishou_second_tap" + type,
                        showHint: this._proxy.getComposeTypeHint(type) //一级红点
                    });
                    this._listBtn.replaceAll(list);
                    this._view.list_name.selectedIndex = 0;
                };
                //左边类型
                YishouShouguComposeMdr.prototype.updateListType = function () {
                    var type = this._showArgs;
                    var cfgList = this._proxy.getComposeCfgs(type);
                    var list = [];
                    var selQualityIdx; //选中的品质索引
                    var selQuality; //选中的品质
                    var selStar; //选中的星级
                    for (var i = 0; i < cfgList.length; i++) {
                        var cfg = cfgList[i];
                        var showHint = this._proxy.getComposeQualityHint(type, cfg.quality); //二级红点
                        var isSel = false;
                        if (this._selQualityIdx != -1) {
                            if (showHint && selQualityIdx == undefined) {
                                selQualityIdx = i; //选中红点的
                                isSel = selQualityIdx != undefined && i == selQualityIdx;
                                if (isSel) {
                                    selQuality = cfg.quality;
                                    selStar = this._proxy.getComposeQualityStar(type, cfg.quality); //对应有红点的星级
                                }
                            }
                        }
                        var itemData = {
                            type: type, cfg: cfg, isSel: isSel, showHint: showHint
                        };
                        list.push(itemData);
                    }
                    // console.log(`yishou compose 1, selQualityIdx:${selQualityIdx}, selQuality:${selQuality},
                    // selStar:${selStar}, this._selQualityIdx:${this._selQualityIdx}`);
                    if (this._selQualityIdx != -1) {
                        if (selQualityIdx != undefined) {
                            this._selQualityIdx = selQualityIdx;
                        }
                        else {
                            //没有红点时候，默认第一个或点击的
                            var itemData = list[this._selQualityIdx];
                            itemData.isSel = true;
                            selQuality = itemData.cfg.quality;
                            selStar = itemData.cfg.star[0];
                        }
                    }
                    // console.log(`yishou compose 2, selQualityIdx:${selQualityIdx}, selQuality:${selQuality},
                    // selStar:${selStar}, this._selQualityIdx:${this._selQualityIdx}`);
                    this._listType.replaceAll(list);
                    this._view.list_type.selectedIndex = this._selQualityIdx;
                    if (this._selQualityIdx != -1) {
                        this.updateSelAry(selQuality, selStar);
                    }
                };
                //部位
                YishouShouguComposeMdr.prototype.updateListItem = function () {
                    var type = this._showArgs;
                    var posAry = game.YishouShouguPosAry;
                    var list = [];
                    var selPosIdx;
                    for (var i = 0; i < posAry.length; i++) {
                        var pos = posAry[i];
                        var hint = false;
                        var selAry = this._proxy.selComposeAry;
                        if (selAry[0] != null && selAry[1] != null) {
                            hint = this._proxy.getComposePosHint(type, selAry[0], selAry[1], pos);
                        }
                        if (hint && selPosIdx == undefined) {
                            selPosIdx = i; //选择有红点的部位
                        }
                        list.push({
                            name: this._proxy.getPosName(this._showArgs, pos),
                            showHint: hint //四级红点
                        });
                    }
                    if (selPosIdx != undefined) {
                        this._selPosIdx = selPosIdx;
                    }
                    this._listItem.replaceAll(list);
                    this._view.list_item.selectedIndex = this._selPosIdx;
                    this.updateSelAry(null, null, this._selPosIdx);
                };
                //更新选中的参数
                YishouShouguComposeMdr.prototype.updateSelAry = function (quality, star, pos) {
                    if (quality != null) {
                        this._proxy.selComposeAry[0] = quality;
                    }
                    if (star != null) {
                        this._proxy.selComposeAry[1] = star;
                    }
                    if (pos != null) {
                        this._proxy.selComposeAry[2] = pos;
                    }
                    var ary = this._proxy.selComposeAry;
                    if (ary[0] != null && ary[1] != null && ary[2] != null) {
                        this.updateView();
                    }
                };
                //更新道具
                YishouShouguComposeMdr.prototype.updateView = function () {
                    var type = this._showArgs;
                    var ary = this._proxy.selComposeAry;
                    var quality = ary[0];
                    var star = ary[1];
                    var pos = ary[2];
                    var equipId = this._proxy.getEquipIndex(type, quality, star, pos);
                    if (!equipId) {
                        DEBUG && console.log("yishouCompose equip id: " + equipId);
                        return;
                    }
                    var equipCfg = game.GameConfig.getEquipmentCfg(equipId);
                    if (!equipCfg) {
                        return;
                    }
                    //合成的装备
                    this._view.icon_center.data = equipId;
                    this._equipId = equipId;
                    this._view.lb_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(equipCfg.name, game.ColorUtil.getColorByQuality1(equipCfg.quality)));
                    //合成的来源
                    var compose = equipCfg.compose;
                    if (!compose) {
                        return;
                    }
                    var costIdx = compose[0][0]; //消耗index
                    this._costAry = compose[0];
                    var datas = this._proxy.getBagDatasByIndex(costIdx);
                    for (var i = 0; i < game.YishouComposeIconCnt; i++) {
                        // if (datas[i]) {
                        //     datas[i].iconShowType = IconShowType.Reward;
                        // }
                        this._view["icon" + i].data = datas[i] || null;
                    }
                    var hint = false;
                    if (ary[0] != null && ary[1] != null && ary[2] != null) {
                        hint = this._proxy.getComposePosHint(type, ary[0], ary[1], ary[2]);
                    }
                    this._view.btn_compose.setHint(hint);
                    this._selCnt = Math.max(Math.floor(datas.length / game.YishouComposeIconCnt), 1);
                    this.updateCnt();
                };
                YishouShouguComposeMdr.prototype.onClickSub = function () {
                    this._selCnt--;
                    if (this._selCnt < 1) {
                        this._selCnt = 1;
                    }
                    this.updateCnt();
                };
                YishouShouguComposeMdr.prototype.onClickAdd = function () {
                    if (!this._costAry) {
                        return;
                    }
                    var costIdx = this._costAry[0];
                    var datas = this._proxy.getBagDatasByIndex(costIdx);
                    var maxCnt = Math.max(Math.floor(datas.length / game.YishouComposeIconCnt), 1);
                    this._selCnt++;
                    if (this._selCnt > maxCnt) {
                        this._selCnt = maxCnt;
                    }
                    this.updateCnt();
                };
                YishouShouguComposeMdr.prototype.onClickCompose = function () {
                    if (!this._costAry) {
                        return;
                    }
                    var bagDatas = this._proxy.getBagDatasByIndex(this._costAry[0]);
                    if (bagDatas.length < game.YishouComposeIconCnt) {
                        game.PromptBox.getIns().show(game.getLanById("yishou_tips10" /* yishou_tips10 */));
                        return;
                    }
                    this._proxy.c2s_yishou_equip_synthese(this._showArgs, this._equipId, this._selCnt);
                };
                YishouShouguComposeMdr.prototype.updateCnt = function () {
                    this._view.lab_cnt.text = this._selCnt + '';
                };
                //点击左边类型列表
                YishouShouguComposeMdr.prototype.onClickType = function (e) {
                    if (this._proxy.selStar) {
                        this._proxy.selStar = false;
                        this._selPosIdx = 0; //重置为0
                        this.updateListItem();
                        return;
                    }
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selQualityIdx) {
                        this._view.list_type.selectedIndex = this._selQualityIdx = -1; //收起展开
                        this.updateListType();
                        return;
                    }
                    this._selQualityIdx = itemIdx;
                    this.updateListType();
                    this.updateListItem();
                };
                YishouShouguComposeMdr.prototype.onClickItem = function (e) {
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selPosIdx) {
                        return;
                    }
                    var pos = game.YishouShouguPosAry[itemIdx];
                    this._selPosIdx = itemIdx;
                    this.updateSelAry(null, null, pos);
                };
                //抛出星级
                YishouShouguComposeMdr.prototype.updateStarUpdate = function (n) {
                    var star = n.body;
                    this.updateSelAry(null, star, null);
                };
                YishouShouguComposeMdr.prototype.onBagUpdateByBagType = function (n) {
                    var types = n.body;
                    if (types.indexOf(8 /* Yishou */) > -1) {
                        this.updateListBtn();
                        this.updateListType();
                        this.updateListItem();
                        this.updateSelAry();
                    }
                };
                //合成返回
                YishouShouguComposeMdr.prototype.onSyntheseSuccess = function (n) {
                    var type = n.body;
                    if (type != this._showArgs) {
                        return;
                    }
                    this.updateListBtn();
                    this.updateListType();
                    this.updateListItem();
                    this.updateSelAry();
                };
                return YishouShouguComposeMdr;
            }(game.MdrBase));
            yishou.YishouShouguComposeMdr = YishouShouguComposeMdr;
            __reflect(YishouShouguComposeMdr.prototype, "game.mod.yishou.YishouShouguComposeMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var Handler = base.Handler;
            var YishouShouguDecomposeMdr = /** @class */ (function (_super) {
                __extends(YishouShouguDecomposeMdr, _super);
                function YishouShouguDecomposeMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yishou.YishouShouguDecomposeView);
                    _this._selIdx = 0;
                    _this._qualityAry = [3, 4, 5, 6, 7];
                    _this._checkBoxAry = [];
                    _this._selQualityAry = []; //选中的品质
                    _this._selProp = []; //选中的道具
                    _this.isEasyHide = true;
                    return _this;
                }
                YishouShouguDecomposeMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(243 /* Yishou */);
                    this._view.list.itemRenderer = yishou.YishouShouguDecomposeIcon;
                    this._view.list.dataProvider = this._listIcon = new eui.ArrayCollection();
                    this._view.list_type.itemRenderer = mod.TabSecondItem;
                    this._view.list_type.dataProvider = this._listBtn = new eui.ArrayCollection();
                    this._view.list.useVirtualLayout = false;
                    this._checkBoxAry = [];
                    var i = 0;
                    while (this._view["checkBox" + i]) {
                        this._checkBoxAry.push(this._view["checkBox" + i]);
                        i++;
                    }
                };
                YishouShouguDecomposeMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_type, eui.ItemTapEvent.ITEM_TAP, this.onClickListType, this);
                    addEventListener(this._view.btn_decompose, egret.TouchEvent.TOUCH_TAP, this.onClickDecompose, this);
                    addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    for (var _i = 0, _a = this._checkBoxAry; _i < _a.length; _i++) {
                        var checkbox = _a[_i];
                        addEventListener(checkbox, egret.TouchEvent.TOUCH_TAP, this.onClickCheckBox, this);
                    }
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickListIcon, this);
                    this.onNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, this.onBagUpdateByBagType, this);
                };
                YishouShouguDecomposeMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initSel();
                    this.updateListBtn();
                    this.updateView();
                };
                YishouShouguDecomposeMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selIdx = 0;
                    this._selQualityAry = [];
                    this._selProp = [];
                    this.initScroller();
                };
                YishouShouguDecomposeMdr.prototype.initScroller = function () {
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollV = 0;
                };
                //初始选中状态
                YishouShouguDecomposeMdr.prototype.initSel = function () {
                    for (var _i = 0, _a = this._checkBoxAry; _i < _a.length; _i++) {
                        var checkbox = _a[_i];
                        checkbox.selected = false;
                    }
                    this._view.checkBox0.selected = true;
                    this._selQualityAry = [this._qualityAry[0]];
                    this._selProp = [];
                };
                YishouShouguDecomposeMdr.prototype.updateListBtn = function () {
                    var ary = game.YishouTypeAry;
                    var list = [];
                    for (var _i = 0, ary_4 = ary; _i < ary_4.length; _i++) {
                        var type = ary_4[_i];
                        list.push({
                            icon: "yishou_second_tap" + type,
                            showHint: false
                        });
                    }
                    this._listBtn.replaceAll(list);
                    this._view.list_type.selectedIndex = this._selIdx = 0;
                };
                YishouShouguDecomposeMdr.prototype.updateListIcon = function () {
                    var type = game.YishouTypeAry[this._selIdx];
                    var bagDatas = this._proxy.getBagDatas(type);
                    bagDatas.sort(function (a, b) {
                        var indexA = a.index;
                        var indexB = b.index;
                        var qualityA = Math.floor(indexA / 10000) % 10;
                        var qualityB = Math.floor(indexB / 10000) % 10;
                        if (qualityA != qualityB) {
                            return qualityA - qualityB;
                        }
                        var starA = Math.floor(indexA / 10) % 10;
                        var starB = Math.floor(indexB / 10) % 10;
                        return starA - starB;
                    });
                    var list = [];
                    for (var _i = 0, bagDatas_3 = bagDatas; _i < bagDatas_3.length; _i++) {
                        var prop = bagDatas_3[_i];
                        var quality = Math.floor(prop.index / 10000) % 10;
                        var isSel = this._selQualityAry.indexOf(quality) > -1; //选中
                        var selIdx = this._selProp.indexOf(prop);
                        if (isSel) {
                            if (selIdx < 0) {
                                this._selProp.push(prop); //选中，加入选中列表
                            }
                        }
                        else {
                            if (selIdx > -1) {
                                this._selProp.splice(selIdx, 1); //没有选中且在列表中的，移除
                            }
                        }
                        list.push({
                            prop: prop,
                            sel: isSel
                        });
                    }
                    if (list.length < game.YishouBagCnt) {
                        list.length = game.YishouBagCnt;
                    }
                    this._listIcon.source = list;
                };
                YishouShouguDecomposeMdr.prototype.updateView = function () {
                    this.updateListIcon();
                    this.updateLabel();
                };
                YishouShouguDecomposeMdr.prototype.updateLabel = function () {
                    var list = this._selProp;
                    var len = list.length;
                    var cnt = 0;
                    var id;
                    if (len > 0) {
                        this._view.gr_lb.visible = true;
                        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                            var prop = list_1[_i];
                            if (!prop) {
                                continue;
                            }
                            var cfg = prop.cfg;
                            if (!cfg || !cfg.resolve) {
                                continue;
                            }
                            var resolve = cfg.resolve[0];
                            if (!id) {
                                id = resolve[0];
                            }
                            cnt += resolve[1];
                        }
                        var str = game.StringUtil.substitute(game.getLanById("yishou_tips4" /* yishou_tips4 */), ["" + game.TextUtil.addColor(len + '', 2330156 /* GREEN */)]);
                        this._view.lb_decompose.textFlow = game.TextUtil.parseHtml(str);
                        this._view.lb_decomposeNum.text = cnt + '';
                        var propCfg = game.GameConfig.getPropConfigById(id);
                        if (propCfg) {
                            this._view.img_decompose.source = propCfg.icon;
                        }
                    }
                    else {
                        this._view.gr_lb.visible = false;
                    }
                };
                YishouShouguDecomposeMdr.prototype.onClickDecompose = function () {
                    if (!this._selProp || !this._selProp.length) {
                        game.PromptBox.getIns().show(game.getLanById("yishou_tips11" /* yishou_tips11 */));
                        return;
                    }
                    var upQuality = this._qualityAry[2];
                    var haveUpQuality = false;
                    var list = [];
                    for (var _i = 0, _a = this._selProp; _i < _a.length; _i++) {
                        var prop = _a[_i];
                        var qua = Math.floor(prop.index / 10000) % 10;
                        if (qua >= upQuality && !haveUpQuality) {
                            haveUpQuality = true;
                        }
                        list.push(prop.prop_id);
                    }
                    var type = game.YishouTypeAry[this._selIdx];
                    if (haveUpQuality) {
                        mod.ViewMgr.getIns().showConfirm(game.getLanById("yishou_tips12" /* yishou_tips12 */), Handler.alloc(this, this.decomposeFunc, [type, list]));
                    }
                    else {
                        this.decomposeFunc(type, list);
                    }
                };
                YishouShouguDecomposeMdr.prototype.decomposeFunc = function (type, list) {
                    this._proxy.c2s_yishou_equip_resolve(type, list);
                    this._selProp = []; //清空数据
                };
                //点击checkbox，选择品质
                YishouShouguDecomposeMdr.prototype.onClickCheckBox = function (e) {
                    var checkbox = e.currentTarget;
                    var idx = this._checkBoxAry.indexOf(checkbox);
                    var quality = this._qualityAry[idx]; //点击的品质
                    var selIdx = this._selQualityAry.indexOf(quality);
                    var select = checkbox.selected; //状态
                    if (select) {
                        if (selIdx < 0) {
                            this._selQualityAry.push(quality);
                        }
                    }
                    else {
                        if (selIdx > -1) {
                            this._selQualityAry.splice(selIdx, 1);
                        }
                    }
                    this.updateView();
                };
                //点击底部类型按钮
                YishouShouguDecomposeMdr.prototype.onClickListType = function (e) {
                    var idx = e.itemIndex;
                    if (this._selIdx == idx) {
                        return;
                    }
                    var type = game.YishouTypeAry[idx];
                    if (!this._proxy.checkTypeActed(type, true)) {
                        this._view.list_type.selectedIndex = this._selIdx;
                        return;
                    }
                    this._selIdx = idx;
                    this.initSel();
                    this.initScroller();
                    this.updateView();
                };
                //点击装备icon
                YishouShouguDecomposeMdr.prototype.onClickListIcon = function (e) {
                    var item = e.item;
                    if (!item) {
                        return;
                    }
                    var isSel = !item.sel; //状态反转
                    var selIdx = this._selProp.indexOf(item.prop);
                    if (isSel) {
                        if (selIdx < 0) {
                            this._selProp.push(item.prop);
                        }
                    }
                    else {
                        if (selIdx > -1) {
                            this._selProp.splice(selIdx, 1);
                        }
                    }
                    item.sel = isSel;
                    this._listIcon.itemUpdated(item);
                    this.updateLabel();
                };
                YishouShouguDecomposeMdr.prototype.onBagUpdateByBagType = function (n) {
                    var types = n.body;
                    if (types.indexOf(8 /* Yishou */) > -1) {
                        this.initSel();
                        this.updateView();
                    }
                };
                return YishouShouguDecomposeMdr;
            }(game.MdrBase));
            yishou.YishouShouguDecomposeMdr = YishouShouguDecomposeMdr;
            __reflect(YishouShouguDecomposeMdr.prototype, "game.mod.yishou.YishouShouguDecomposeMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouMainMdr = /** @class */ (function (_super) {
                __extends(YishouMainMdr, _super);
                function YishouMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Shougu */,
                            icon: "yishoubiaoqiantubiao",
                            mdr: yishou.YishouShouguMdr,
                            title: "yishou_tips5" /* yishou_tips5 */,
                            bg: "yishou_bg",
                            openIdx: 0,
                            hintTypes: ["62" /* Yishou */, "01" /* Main */, "01" /* Shougu */]
                        },
                        {
                            btnType: "02" /* Shouhun */,
                            icon: "shouhunbiaoqiantubiao",
                            mdr: yishou.YishouShouhunMdr,
                            title: "yishou_tips6" /* yishou_tips6 */,
                            bg: "yishou_bg",
                            openIdx: 0,
                            hintTypes: ["62" /* Yishou */, "01" /* Main */, "02" /* Shouhun */]
                        },
                        {
                            btnType: "03" /* Shouling */,
                            icon: "shoulingbiaoqiantubiao",
                            mdr: yishou.YishouShoulingSecondMainMdr,
                            title: "yishou_tips7" /* yishou_tips7 */,
                            bg: "yishou_bg",
                            openIdx: 0,
                            hintTypes: ["62" /* Yishou */, "01" /* Main */, "03" /* Shouling */]
                        },
                        {
                            btnType: "04" /* Shouyin */,
                            icon: "shouyinbiaoqiantubiao",
                            mdr: yishou.YishouShouyinSecondMainMdr,
                            title: "yishou_tips8" /* yishou_tips8 */,
                            bg: "yishou_bg",
                            openIdx: 0,
                            hintTypes: ["62" /* Yishou */, "01" /* Main */, "04" /* Shouyin */]
                        }
                    ];
                    return _this;
                }
                return YishouMainMdr;
            }(mod.WndBaseMdr));
            yishou.YishouMainMdr = YishouMainMdr;
            __reflect(YishouMainMdr.prototype, "game.mod.yishou.YishouMainMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouguEquipTipsMdr2 = /** @class */ (function (_super) {
                __extends(YishouShouguEquipTipsMdr2, _super);
                function YishouShouguEquipTipsMdr2() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                YishouShouguEquipTipsMdr2.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_replace, egret.TouchEvent.TOUCH_TAP, this.onClickReplace, this);
                };
                YishouShouguEquipTipsMdr2.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.currentState = 'dress';
                };
                YishouShouguEquipTipsMdr2.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YishouShouguEquipTipsMdr2.prototype.updateBaseAttr = function () {
                    if (!(this._showArgs instanceof game.PropData)) {
                        return;
                    }
                    var prop = this._showArgs;
                    this._view.propTips.updateShow(prop.index);
                    var attr = prop.regular_attrs;
                    this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
                    var attrDesc = game.TextUtil.getAttrTextAdd(attr, 8585074 /* GREEN */);
                    this._view.descItem0.updateShow(attrDesc, game.getLanById("base_attr" /* base_attr */));
                };
                YishouShouguEquipTipsMdr2.prototype.updateView = function () {
                    _super.prototype.updateView.call(this);
                    var index;
                    if (this._showArgs instanceof game.PropData) {
                        index = this._showArgs.index;
                    }
                    else {
                        index = this._showArgs;
                    }
                    // [品质,星级,部位,类型]
                    var ary = this._proxy.getAryByParserIndex(index);
                    var equipInfo = this._proxy.getEquipInfo(ary[3], ary[2]);
                    this._view.btn_replace.label = equipInfo ? game.getLanById("weapon_tips25" /* weapon_tips25 */) : game.getLanById("soul1" /* soul1 */);
                };
                YishouShouguEquipTipsMdr2.prototype.onClickReplace = function () {
                    if (!(this._showArgs instanceof game.PropData)) {
                        return;
                    }
                    var prop = this._showArgs;
                    // [品质,星级,部位,类型]
                    var index = prop.index;
                    var ary = this._proxy.getAryByParserIndex(index);
                    var canDress = this._proxy.canDressByTypeAndPos(ary[3], ary[2], true);
                    if (!canDress) {
                        game.PromptBox.getIns().show("\u6761\u4EF6\u4E0D\u8DB3");
                        return;
                    }
                    this._proxy.c2s_yishou_equip_operate(ary[3], 1, prop.prop_id);
                    this.hide();
                };
                return YishouShouguEquipTipsMdr2;
            }(yishou.YishouShouguEquipTipsMdr));
            yishou.YishouShouguEquipTipsMdr2 = YishouShouguEquipTipsMdr2;
            __reflect(YishouShouguEquipTipsMdr2.prototype, "game.mod.yishou.YishouShouguEquipTipsMdr2");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var facade = base.facade;
            var YishouShouguMdr = /** @class */ (function (_super) {
                __extends(YishouShouguMdr, _super);
                function YishouShouguMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", yishou.YishouShouguView);
                    _this._selIdx = 0;
                    return _this;
                }
                YishouShouguMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(243 /* Yishou */);
                };
                YishouShouguMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.power2.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.btn_jinjie, egret.TouchEvent.TOUCH_TAP, this.onClickJinjie, this);
                    addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOnekey, this);
                    addEventListener(this._view.btn_bag, egret.TouchEvent.TOUCH_TAP, this.onClickBag, this);
                    addEventListener(this._view.btn_compose, egret.TouchEvent.TOUCH_TAP, this.onClickCompose, this);
                    addEventListener(this._view.btn_decompose, egret.TouchEvent.TOUCH_TAP, this.onClickDecompose, this);
                    addEventListener(this._view.iconListComp.list, eui.ItemTapEvent.ITEM_TAP, this.onClickIconList, this);
                    this.onNt("on_update_yishou_base_info" /* ON_UPDATE_YISHOU_BASE_INFO */, this.updateView, this);
                    this.onNt("on_update_yishou_equip_info" /* ON_UPDATE_YISHOU_EQUIP_INFO */, this.updateView, this);
                    this.onNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, this.onBagUpdateByBagType, this);
                };
                YishouShouguMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                    this._view.iconListComp.list.selectedIndex = this._selIdx = 0;
                };
                YishouShouguMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selIdx = 0;
                };
                YishouShouguMdr.prototype.getType = function () {
                    return game.YishouTypeAry[this._selIdx];
                };
                YishouShouguMdr.prototype.updateView = function () {
                    var type = this.getType();
                    this._view.iconListComp.updateListView();
                    this._view.skillComp.updateSkillView(type);
                    this._view.equipListComp.updateEquipListView(type);
                    this._view.power2.setPowerValue(this._proxy.getPower(type));
                    this._view.img_icon.source = game.ResUtil.getUiPng("yishou_model" + type);
                    //进阶按钮
                    var canJinjie = this._proxy.canJinjie(type);
                    this._view.gr_jinjie.visible = canJinjie;
                    this._view.btn_jinjie.setHint(canJinjie);
                    this._view.btn_jinjie.group_eft.removeChildren();
                    if (this._view.gr_jinjie.visible) {
                        this.addEftByParent("xitongjihuo" /* XiTongJiHuo */, this._view.btn_jinjie.group_eft, 4, 4);
                    }
                    //一键替换
                    var canOnekey = this._proxy.canOnekey(type);
                    this._view.btn_onekey.visible = !canJinjie && canOnekey;
                    if (this._view.btn_onekey.visible) {
                        this._view.btn_onekey.redPoint.visible = true;
                    }
                    this.updateBtnHint();
                };
                YishouShouguMdr.prototype.onClickAttr = function () {
                    var type = this.getType();
                    var attr = this._proxy.getAttr(type);
                    mod.ViewMgr.getIns().showAttrTipsWithoutGod(game.getLanById("yishou_tips14" /* yishou_tips14 */), attr, game.getLanById("xiandan_tips9" /* xiandan_tips9 */));
                };
                YishouShouguMdr.prototype.onClickJinjie = function () {
                    var type = this.getType();
                    if (this._proxy.canJinjie(type)) {
                        this._proxy.c2s_yishou_equip_up_level(type);
                    }
                };
                YishouShouguMdr.prototype.onClickOnekey = function () {
                    var type = this.getType();
                    if (this._proxy.canOnekey(type)) {
                        this._proxy.c2s_yishou_equip_operate(type, 2, null);
                    }
                };
                YishouShouguMdr.prototype.onClickBag = function () {
                    mod.ViewMgr.getIns().showSecondPop("62" /* Yishou */, "02" /* Bag */);
                };
                YishouShouguMdr.prototype.onClickCompose = function () {
                    mod.ViewMgr.getIns().showSecondPop("62" /* Yishou */, "03" /* Compose */, this.getType());
                };
                YishouShouguMdr.prototype.onClickDecompose = function () {
                    facade.showView("62" /* Yishou */, "04" /* Decompose */);
                };
                YishouShouguMdr.prototype.onClickIconList = function (e) {
                    var item = e.item;
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selIdx || !item
                        || !this._proxy.checkTypeActed(item.type, true)) {
                        this._view.iconListComp.list.selectedIndex = this._selIdx;
                        return;
                    }
                    this._selIdx = e.itemIndex;
                    this.updateView();
                };
                YishouShouguMdr.prototype.updateBtnHint = function () {
                    var type = this.getType();
                    //合成按钮红点
                    this._view.btn_compose.setHint(this._proxy.getComposeTypeHint(type));
                    //背包红点
                    this._view.btn_bag.setHint(this._proxy.canOnekey(type));
                };
                YishouShouguMdr.prototype.onBagUpdateByBagType = function (n) {
                    var types = n.body;
                    if (types.indexOf(8 /* Yishou */) > -1) {
                        this._view.iconListComp.updateListView();
                        this.updateView();
                    }
                };
                return YishouShouguMdr;
            }(game.EffectMdrBase));
            yishou.YishouShouguMdr = YishouShouguMdr;
            __reflect(YishouShouguMdr.prototype, "game.mod.yishou.YishouShouguMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouguSkillTipsMdr = /** @class */ (function (_super) {
                __extends(YishouShouguSkillTipsMdr, _super);
                function YishouShouguSkillTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yishou.YishouShouguSkillTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YishouShouguSkillTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(243 /* Yishou */);
                };
                YishouShouguSkillTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                YishouShouguSkillTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this.updateView();
                };
                YishouShouguSkillTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YishouShouguSkillTipsMdr.prototype.updateView = function () {
                    var type = this._showArgs;
                    var typeCfg = this._proxy.getYishoucfg(type);
                    var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, typeCfg.skill);
                    if (!skillCfg) {
                        return;
                    }
                    this._view.qualityTips.updateShow(skillCfg.quality);
                    this._view.lb_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(skillCfg.name, game.ColorUtil.getColorByQuality1(skillCfg.quality)));
                    this._view.img_skillType.source = "jineng_show_type_" + skillCfg.show_type;
                    //技能效果
                    this._view.descItem0.updateShow(skillCfg.describe, game.getLanById("maid_cue15" /* maid_cue15 */));
                    //技能属性 todo
                    //魂体进阶
                    var skill = typeCfg.skill;
                    var maxStage = this._proxy.getMaxStage(type);
                    var curStage = this._proxy.getCurStage(type);
                    var list = [];
                    for (var i = 1; i <= maxStage; i++) {
                        var skillLvCfg = game.getConfigByNameId("skill_level.json" /* SkillLv */, skill + i);
                        if (!skillLvCfg) {
                            continue;
                        }
                        var desc = i + "\u9636\uFF1A" + skillLvCfg.describe;
                        var color = curStage >= i ? 8585074 /* GREEN */ : 7835024 /* GRAY */;
                        list.push(game.TextUtil.addColor(desc, color));
                    }
                    this._view.descList.updateShow(list, game.getLanById("yishou_tips21" /* yishou_tips21 */));
                };
                return YishouShouguSkillTipsMdr;
            }(game.MdrBase));
            yishou.YishouShouguSkillTipsMdr = YishouShouguSkillTipsMdr;
            __reflect(YishouShouguSkillTipsMdr.prototype, "game.mod.yishou.YishouShouguSkillTipsMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var facade = base.facade;
            var YishouShouhunMdr = /** @class */ (function (_super) {
                __extends(YishouShouhunMdr, _super);
                function YishouShouhunMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", yishou.YishouShouhunView);
                    _this._selIdx = 0;
                    _this._barTween = false;
                    return _this;
                }
                YishouShouhunMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(243 /* Yishou */);
                    this._view.list_skill.itemRenderer = mod.SkillItemRender;
                    this._view.list_skill.dataProvider = this._listSkill = new eui.ArrayCollection();
                };
                YishouShouhunMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.power2.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickDo, this);
                    addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOnekey, this);
                    addEventListener(this._view.iconListComp.list, eui.ItemTapEvent.ITEM_TAP, this.onClickIconList, this);
                    addEventListener(this._view.list_skill, eui.ItemTapEvent.ITEM_TAP, this.onClickSkillList, this);
                    this.onNt("on_update_yishou_base_info" /* ON_UPDATE_YISHOU_BASE_INFO */, this.updateView, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePower, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateByPropIndex, this);
                };
                YishouShouhunMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                    this._view.iconListComp.list.selectedIndex = this._selIdx = 0;
                };
                YishouShouhunMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selIdx = 0;
                    this._barTween = false;
                };
                YishouShouhunMdr.prototype.getType = function () {
                    return game.YishouTypeAry[this._selIdx];
                };
                YishouShouhunMdr.prototype.updateView = function () {
                    var type = this.getType();
                    this._view.iconListComp.updateListView(2 /* Shouhun */);
                    this.updateSkill();
                    this.updateCost();
                    //战力
                    var attr = this._proxy.getAttr(this.getType(), 2 /* Shouhun */);
                    this._view.power2.setPowerValue(attr && attr.showpower || 0);
                    //名字，模型图片
                    var typeCfg = this._proxy.getYishoucfg(type);
                    this._view.nameItem.updateShow(typeCfg.type_name + game.getLanById("yishou_tips22" /* yishou_tips22 */));
                    this._view.img_icon.source = game.ResUtil.getUiPng("yishou_model" + type);
                };
                YishouShouhunMdr.prototype.updateSkill = function () {
                    var type = this.getType();
                    var typeCfg = this._proxy.getYishoucfg(type);
                    var idList = typeCfg.skill_list || [];
                    var list = [];
                    for (var i = 0; i < idList.length; i++) {
                        var item = idList[i];
                        var skillId = item[1];
                        list.push({
                            skillId: skillId,
                            showHint: this._proxy.canActSkill(type, skillId),
                            isAct: this._proxy.checkSkillActed(type, skillId)
                        });
                    }
                    this._listSkill.replaceAll(list);
                };
                YishouShouhunMdr.prototype.updateCost = function () {
                    var type = this.getType();
                    var info = this._proxy.getInfo(type);
                    var level = info && info.level || 0;
                    this._view.lb_level.text = level + '';
                    var isMax = this._proxy.isLevelMax(type);
                    if (isMax) {
                        this._view.bar.showMax();
                        this._view.img_max.visible = true;
                        this._view.costIcon.visible = this._view.btn_do.visible = this._view.btn_onekey.visible = false;
                    }
                    else {
                        var cfg = this._proxy.getShouhunCfg(type);
                        var cost = cfg.star_consume[0];
                        var singleCostExp = cost[1] * 10;
                        this._view.bar.show((info ? info.exp : 0) * singleCostExp, cfg.exp * singleCostExp, this._barTween, level, true, 1 /* Value */);
                        this._barTween = true;
                        this._view.img_max.visible = false;
                        this._view.costIcon.visible = this._view.btn_do.visible = this._view.btn_onekey.visible = true;
                        this._view.costIcon.updateShow(cfg.star_consume[0]);
                        this._view.btn_do.setHint(this._proxy.canShouHunUpLv(type));
                        this._view.btn_onekey.setHint(this._proxy.canShowhunOnekey(type));
                    }
                };
                YishouShouhunMdr.prototype.updatePower = function () {
                    this._view.power2.setPowerValue(this._proxy.getPower(this.getType(), 2 /* Shouhun */));
                };
                YishouShouhunMdr.prototype.onClickAttr = function () {
                    var attr = this._proxy.getAttr(this.getType(), 2 /* Shouhun */);
                    mod.ViewMgr.getIns().showAttrTipsWithoutGod(game.getLanById("yishou_tips14" /* yishou_tips14 */), attr, game.getLanById("xiandan_tips9" /* xiandan_tips9 */));
                };
                YishouShouhunMdr.prototype.onClickDo = function () {
                    var type = this.getType();
                    if (this._proxy.canShouHunUpLv(type, true)) {
                        this._proxy.c2s_yishou_shouhun_operate(type, 1);
                    }
                };
                YishouShouhunMdr.prototype.onClickOnekey = function () {
                    var type = this.getType();
                    if (this._proxy.canShowhunOnekey(type, true)) {
                        this._proxy.c2s_yishou_shouhun_operate(type, 2);
                    }
                };
                YishouShouhunMdr.prototype.onClickIconList = function (e) {
                    var item = e.item;
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selIdx || !item
                        || !this._proxy.checkTypeActed(item.type, true)) {
                        this._view.iconListComp.list.selectedIndex = this._selIdx;
                        return;
                    }
                    this._selIdx = e.itemIndex;
                    this._barTween = false;
                    this.updateView();
                };
                YishouShouhunMdr.prototype.onClickSkillList = function (e) {
                    var type = this.getType();
                    var itemIdx = e.itemIndex;
                    var typeCfg = this._proxy.getYishoucfg(type);
                    var data = typeCfg.skill_list[itemIdx]; //激活等级,技能id
                    facade.showView("62" /* Yishou */, "07" /* ShouhunSkillTips */, [type, itemIdx].concat(data));
                };
                YishouShouhunMdr.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    var costAry = this._proxy.getShouhunCost();
                    for (var _i = 0, indexs_2 = indexs; _i < indexs_2.length; _i++) {
                        var index = indexs_2[_i];
                        if (costAry && costAry.indexOf(index) > -1) {
                            this.updateCost();
                            this._view.iconListComp.updateListView(2 /* Shouhun */);
                            break;
                        }
                    }
                };
                return YishouShouhunMdr;
            }(game.MdrBase));
            yishou.YishouShouhunMdr = YishouShouhunMdr;
            __reflect(YishouShouhunMdr.prototype, "game.mod.yishou.YishouShouhunMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouhunSkillTipsMdr = /** @class */ (function (_super) {
                __extends(YishouShouhunSkillTipsMdr, _super);
                function YishouShouhunSkillTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yishou.YishouShouhunSkillTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YishouShouhunSkillTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(243 /* Yishou */);
                };
                YishouShouhunSkillTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.onNt("on_update_yishou_base_info" /* ON_UPDATE_YISHOU_BASE_INFO */, this.onSwitchState, this);
                };
                YishouShouhunSkillTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs || !Array.isArray(this._showArgs)) {
                        return;
                    }
                    this.updateView();
                };
                YishouShouhunSkillTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YishouShouhunSkillTipsMdr.prototype.onSwitchState = function () {
                    var type = this._showArgs[0];
                    var skillId = this._showArgs[3];
                    var isActed = this._proxy.checkSkillActed(type, skillId);
                    this._view.currentState = isActed ? 'acted' : 'default';
                };
                YishouShouhunSkillTipsMdr.prototype.updateView = function () {
                    var type = this._showArgs[0];
                    var skillId = this._showArgs[3];
                    var isActed = this._proxy.checkSkillActed(type, skillId);
                    this._view.currentState = isActed ? 'acted' : 'default';
                    var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                    if (!skillCfg) {
                        return;
                    }
                    //技能效果
                    this._view.descItem.updateShow(skillCfg.describe, game.getLanById("sp_tips1" /* sp_tips1 */));
                    this._view.power.setPowerValue(skillCfg.powershow || 0);
                    this._view.qualityTips.updateShow(skillCfg.quality);
                    this._view.lb_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(skillCfg.name, game.ColorUtil.getColorByQuality1(skillCfg.quality)));
                    this._view.img_skillType.source = "jineng_show_type_" + skillCfg.show_type;
                    //激活条件
                    var needLevel = this._showArgs[2];
                    var level = this._proxy.getLevel(type);
                    var color = level >= needLevel ? 2330156 /* GREEN */ : 16719376 /* RED */;
                    var desc = game.StringUtil.substitute(game.getLanById("yishou_tips15" /* yishou_tips15 */), [needLevel])
                        + game.TextUtil.addColor("(" + level + "/" + needLevel + ")", color);
                    this._view.lb_cond.textFlow = game.TextUtil.parseHtml(desc);
                    if (!isActed) {
                        this._view.btn_do.setHint(this._proxy.canActSkill(type, skillId));
                    }
                };
                YishouShouhunSkillTipsMdr.prototype.onClick = function () {
                    var type = this._showArgs[0];
                    var skillId = this._showArgs[3];
                    if (this._proxy.canActSkill(type, skillId, true)) {
                        this._proxy.c2s_yishou_skill_active(type, skillId);
                    }
                };
                return YishouShouhunSkillTipsMdr;
            }(game.MdrBase));
            yishou.YishouShouhunSkillTipsMdr = YishouShouhunSkillTipsMdr;
            __reflect(YishouShouhunSkillTipsMdr.prototype, "game.mod.yishou.YishouShouhunSkillTipsMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShoulingEquipTipsBagMdr = /** @class */ (function (_super) {
                __extends(YishouShoulingEquipTipsBagMdr, _super);
                function YishouShoulingEquipTipsBagMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yishou.YishouShoulingEquipTipsBagView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YishouShoulingEquipTipsBagMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(243 /* Yishou */);
                };
                YishouShoulingEquipTipsBagMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateBaseAttr, this);
                    this.onNt("on_view_hide" /* ON_VIEW_HIDE */, this.hide, this);
                };
                YishouShoulingEquipTipsBagMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this.updateView();
                };
                YishouShoulingEquipTipsBagMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YishouShoulingEquipTipsBagMdr.prototype.updateView = function () {
                    var data = this._showArgs;
                    var equipCfg = data.cfg;
                    if (!equipCfg) {
                        return;
                    }
                    this.updateTopView();
                    this.updateBaseAttr();
                    this.updateSuitAttr();
                    //道具描述
                    this._view.descItem1.updateShow(equipCfg.desc);
                    //获取途径
                    this._view.gainItem.updateShow(equipCfg.gain_id);
                };
                YishouShoulingEquipTipsBagMdr.prototype.getAttr = function () {
                    var data = this._showArgs;
                    var attr = data && data.regular_attrs ? data.regular_attrs : null;
                    if (!attr) {
                        //没有就获取一星的属性展示
                        var shoulingIndex = data.cfg.parm1[0];
                        var cfg = this._proxy.getShoulingEquipCfg(shoulingIndex, 1);
                        var attrId = cfg ? cfg.attr : 0;
                        attr = mod.RoleUtil.getAttr(attrId);
                    }
                    return attr;
                };
                YishouShoulingEquipTipsBagMdr.prototype.updateTopView = function () {
                    var data = this._showArgs;
                    this._view.propTips.updateShow(data.index);
                    var bagCnt = mod.BagUtil.getPropCntByIdx(data.index);
                    this._view.lb_cnt.text = game.StringUtil.substitute(game.getLanById("yysl1" /* yysl1 */), [bagCnt]);
                };
                //基础属性
                YishouShoulingEquipTipsBagMdr.prototype.updateBaseAttr = function () {
                    var attr = this.getAttr();
                    var power = attr && attr.showpower ? attr.showpower : 0;
                    this._view.power.setPowerValue(power);
                    var attrStr = game.TextUtil.getAttrTextAdd(attr, 8585074 /* GREEN */);
                    this._view.descItem.updateShow(attrStr, game.getLanById("base_attr" /* base_attr */));
                };
                //套装效果
                YishouShoulingEquipTipsBagMdr.prototype.updateSuitAttr = function () {
                    var data = this._showArgs;
                    var equipCfg = data.cfg;
                    var shoulingIndex = equipCfg.parm1[0];
                    if (!shoulingIndex) {
                        return;
                    }
                    var shoulingEquipcfg = this._proxy.getShoulingEquipCfg(shoulingIndex, 1);
                    var info = this._proxy.getShoulingInfo(shoulingIndex);
                    var totalCnt = shoulingEquipcfg.cost.length;
                    var actedCnt = info && info.list ? info.list.length : 0;
                    var equipMap = {};
                    if (actedCnt) {
                        for (var _i = 0, _a = info.list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            var id = item.index.toNumber();
                            equipMap[id] = item;
                        }
                    }
                    var descList = [];
                    for (var _b = 0, _c = shoulingEquipcfg.cost; _b < _c.length; _b++) {
                        var item = _c[_b];
                        var equipInfo = equipMap[item[0]];
                        var equipCfg_1 = game.GameConfig.getEquipmentCfg(item[0]);
                        if (!equipCfg_1) {
                            continue;
                        }
                        var color = 7835024 /* GRAY */;
                        var desc = equipCfg_1.name + '(' + game.getLanById("not_active" /* not_active */) + ')';
                        if (equipInfo) {
                            color = 8585074 /* GREEN */;
                            desc = equipCfg_1.name + ("(" + (equipInfo.star + game.getLanById("soul2" /* soul2 */)) + ")");
                        }
                        desc = game.TextUtil.addColor(desc, color);
                        descList.push(desc);
                    }
                    this._view.descList.updateShow(descList, game.getLanById("bagua_txt3" /* bagua_txt3 */) + ("(" + actedCnt + "/" + totalCnt + ")"));
                    var specialDesc = this._proxy.getSpecialAttrDesc(shoulingIndex);
                    this._view.lb_specialattr.textFlow = game.TextUtil.parseHtml(specialDesc);
                };
                //前往兽灵界面
                YishouShoulingEquipTipsBagMdr.prototype.onClick = function () {
                    mod.ViewMgr.getIns().showView("62" /* Yishou */, "01" /* Main */, "03" /* Shouling */);
                    this.hide();
                };
                return YishouShoulingEquipTipsBagMdr;
            }(game.MdrBase));
            yishou.YishouShoulingEquipTipsBagMdr = YishouShoulingEquipTipsBagMdr;
            __reflect(YishouShoulingEquipTipsBagMdr.prototype, "game.mod.yishou.YishouShoulingEquipTipsBagMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShoulingEquipTipsMdr = /** @class */ (function (_super) {
                __extends(YishouShoulingEquipTipsMdr, _super);
                function YishouShoulingEquipTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yishou.YishouShoulingEquipTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YishouShoulingEquipTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(243 /* Yishou */);
                };
                YishouShoulingEquipTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateBaseAttr, this);
                    this.onNt("on_update_yishou_shouling_info" /* ON_UPDATE_YISHOU_SHOULING_INFO */, this.onUpdateView, this);
                };
                YishouShoulingEquipTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this.updateView();
                };
                YishouShoulingEquipTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YishouShoulingEquipTipsMdr.prototype.onUpdateView = function () {
                    var data = this._showArgs;
                    var info = this._proxy.getShoulingEquipInfo(data.index, data.equipId);
                    data.star = info && info.star || 0; //修改星星等级
                    this.updateView();
                };
                YishouShoulingEquipTipsMdr.prototype.updateView = function () {
                    this.updateTopView();
                    this.updateBaseAttr();
                    this.updateSuitAttr();
                    this.updateCost();
                };
                YishouShoulingEquipTipsMdr.prototype.updateTopView = function () {
                    var data = this._showArgs;
                    var equipId = data.equipId;
                    var prop = game.PropData.create(equipId, 1, 3 /* NotTips */);
                    this._view.propTips.updateShow(prop, data.star);
                };
                //基础属性
                YishouShoulingEquipTipsMdr.prototype.updateBaseAttr = function () {
                    var data = this._showArgs;
                    var star = data.star || 1;
                    var cfg = this._proxy.getShoulingEquipCfg(data.index, star);
                    var attrId = cfg ? cfg.attr : 0;
                    var attr = mod.RoleUtil.getAttr(attrId);
                    this._view.power.setPowerValue(attr && attr.showpower || 0);
                    var attrStr = game.TextUtil.getAttrTextAdd(attr, 8585074 /* GREEN */);
                    this._view.descItem.updateShow(attrStr, game.getLanById("base_attr" /* base_attr */));
                };
                //套装效果
                YishouShoulingEquipTipsMdr.prototype.updateSuitAttr = function () {
                    var data = this._showArgs;
                    var shoulingEquipcfg = this._proxy.getShoulingEquipCfg(data.index, 1);
                    var info = this._proxy.getShoulingInfo(data.index);
                    var totalCnt = shoulingEquipcfg.cost.length;
                    var actedCnt = info && info.list ? info.list.length : 0;
                    var equipMap = {};
                    if (actedCnt) {
                        for (var _i = 0, _a = info.list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            var id = item.index.toNumber();
                            equipMap[id] = item;
                        }
                    }
                    var descList = [];
                    for (var _b = 0, _c = shoulingEquipcfg.cost; _b < _c.length; _b++) {
                        var item = _c[_b];
                        var equipInfo = equipMap[item[0]];
                        var equipCfg = game.GameConfig.getEquipmentCfg(item[0]);
                        if (!equipCfg) {
                            continue;
                        }
                        var color = 7835024 /* GRAY */;
                        var desc = equipCfg.name + '(未激活)';
                        if (equipInfo) {
                            color = 8585074 /* GREEN */;
                            desc = equipCfg.name + ("(" + equipInfo.star + "\u661F)");
                        }
                        desc = game.TextUtil.addColor(desc, color);
                        descList.push(desc);
                    }
                    this._view.descList.updateShow(descList, "\u5957\u88C5\u6548\u679C(" + actedCnt + "/" + totalCnt + ")");
                    this._view.lb_specialattr.textFlow = game.TextUtil.parseHtml(this._proxy.getSpecialAttrDesc(data.index));
                };
                YishouShoulingEquipTipsMdr.prototype.updateCost = function () {
                    var data = this._showArgs;
                    var info = this._proxy.getShoulingEquipInfo(data.index, data.equipId);
                    var star = (info && info.star || 0) + 1;
                    var cfg = this._proxy.getShoulingEquipCfg(data.index, star);
                    if (!cfg) {
                        this._view.img_max.visible = true;
                        this._view.icon_cost.visible = this._view.btn_do.visible = false;
                        return;
                    }
                    this._view.img_max.visible = false;
                    this._view.icon_cost.visible = this._view.btn_do.visible = true;
                    var cost = cfg.cost[data.idx];
                    this._view.icon_cost.data = cost;
                    this._view.icon_cost.updateCostLab(cost);
                    this._view.btn_do.label = info ? game.getLanById("uplv" /* uplv */) : game.getLanById("active" /* active */);
                    this._view.btn_do.setHint(this._proxy.canShoulingEquipActOrUp(data.index, data.equipId));
                };
                YishouShoulingEquipTipsMdr.prototype.onClick = function () {
                    var data = this._showArgs;
                    if (this._proxy.canShoulingEquipActOrUp(data.index, data.equipId, true)) {
                        this._proxy.c2s_yishou_shouling_up_level(data.index, data.equipId);
                    }
                };
                return YishouShoulingEquipTipsMdr;
            }(game.MdrBase));
            yishou.YishouShoulingEquipTipsMdr = YishouShoulingEquipTipsMdr;
            __reflect(YishouShoulingEquipTipsMdr.prototype, "game.mod.yishou.YishouShoulingEquipTipsMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShoulingMdr = /** @class */ (function (_super) {
                __extends(YishouShoulingMdr, _super);
                function YishouShoulingMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", yishou.YishouShoulingView);
                    /**二级页签类型*/
                    _this._type = 1;
                    return _this;
                }
                YishouShoulingMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(243 /* Yishou */);
                    this._view.list.itemRenderer = yishou.YishouShoulingAvatarItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                YishouShoulingMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.power2.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    this.onNt("on_update_yishou_shouling_info" /* ON_UPDATE_YISHOU_SHOULING_INFO */, this.onUpdateView, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePower, this);
                };
                YishouShoulingMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateListData();
                    this.updateView();
                };
                YishouShoulingMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selIdx = 0;
                    this._selCfg = null;
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollH = 0;
                };
                YishouShoulingMdr.prototype.updateListData = function () {
                    var cfgList = this._proxy.getShoulingCfgs(this._type);
                    var list = [];
                    for (var i = 0; i < cfgList.length; i++) {
                        var cfg = cfgList[i];
                        var isActed = this._proxy.isShoulingActed(cfg.index);
                        list.push({
                            cfg: cfg,
                            showHint: this._proxy.getShoulingHint(cfg.index),
                            star: isActed ? 1 : 0,
                            isBattle: false
                        });
                    }
                    list.sort(function (a, b) {
                        var actedA = a.star > 0;
                        var actedB = b.star > 0;
                        if (actedA != actedB) {
                            return actedB ? 1 : -1;
                        }
                        return a.cfg.index - b.cfg.index;
                    });
                    if (this._selCfg) {
                        var size_1 = list.length;
                        for (var i = 0; i < size_1; i++) {
                            var cfg = list[i].cfg;
                            if (cfg && cfg.index == this._selCfg.index) {
                                this._selIdx = i;
                                break;
                            }
                        }
                    }
                    else {
                        this._selIdx = 0;
                        this._selCfg = list[this._selIdx].cfg;
                    }
                    var size = list.length;
                    for (var i = 0; i < size; i++) {
                        list[i].isSel = this._selIdx == i;
                    }
                    this._listData.replaceAll(list);
                    this._view.list.selectedIndex = this._selIdx;
                };
                YishouShoulingMdr.prototype.onUpdateView = function () {
                    this.updateListData();
                    this.updateView();
                };
                YishouShoulingMdr.prototype.updateView = function () {
                    var cfg = this._selCfg;
                    if (!cfg) {
                        return;
                    }
                    this._view.specialAttrView.updateDesc(cfg);
                    this._view.skillComp.updateView(cfg);
                    this.updatePower();
                    var starCfg = this._proxy.getShoulingEquipCfg(cfg.index, 1);
                    if (!starCfg) {
                        return;
                    }
                    var len = starCfg.cost.length;
                    for (var i = 0; i < len; i++) {
                        var equipId = starCfg.cost[i][0];
                        var info = this._proxy.getShoulingEquipInfo(cfg.index, equipId);
                        var data = {
                            index: cfg.index,
                            equipId: equipId,
                            idx: i,
                            hint: this._proxy.getShoulingEquipHint(cfg.index, equipId),
                            star: info ? info.star : 0
                        };
                        this._view["icon" + i].data = data;
                    }
                };
                YishouShoulingMdr.prototype.updatePower = function () {
                    var power = 0;
                    if (this._selCfg) {
                        power = this._proxy.getShoulingPower(this._selCfg.index);
                    }
                    this._view.power2.setPowerValue(power);
                };
                YishouShoulingMdr.prototype.onClickList = function (e) {
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selIdx) {
                        return;
                    }
                    var list = this._listData.source;
                    var preData = list[this._selIdx];
                    if (preData) {
                        preData.isSel = false;
                        this._listData.itemUpdated(preData);
                    }
                    var data = e.item;
                    data.isSel = true;
                    this._listData.itemUpdated(data);
                    this._selIdx = itemIdx;
                    this._selCfg = data.cfg;
                    this.updateView();
                };
                YishouShoulingMdr.prototype.onClickAttr = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    var attr = this._proxy.getShoulingAttr(this._selCfg.index);
                    mod.ViewMgr.getIns().showAttrTipsWithoutGod('兽灵属性', attr, '激活属性');
                };
                return YishouShoulingMdr;
            }(game.MdrBase));
            yishou.YishouShoulingMdr = YishouShoulingMdr;
            __reflect(YishouShoulingMdr.prototype, "game.mod.yishou.YishouShoulingMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShoulingSecondMainMdr = /** @class */ (function (_super) {
                __extends(YishouShoulingSecondMainMdr, _super);
                function YishouShoulingSecondMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "shoulingtitubiao",
                            mdr: yishou.YishouShoulingMdr,
                            hintTypes: ["62" /* Yishou */, "01" /* Main */, "03" /* Shouling */, "01" /* TabBtnType01 */]
                        }
                    ];
                    return _this;
                }
                YishouShoulingSecondMainMdr.prototype.onTabChanged = function () {
                    _super.prototype.onTabChanged.call(this);
                    this.sendNt("update_wnd_second_mdr_top" /* UPDATE_WND_SECOND_MDR_TOP */);
                };
                return YishouShoulingSecondMainMdr;
            }(mod.WndSecondMdr));
            yishou.YishouShoulingSecondMainMdr = YishouShoulingSecondMainMdr;
            __reflect(YishouShoulingSecondMainMdr.prototype, "game.mod.yishou.YishouShoulingSecondMainMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShoulingSkillTipsMdr = /** @class */ (function (_super) {
                __extends(YishouShoulingSkillTipsMdr, _super);
                function YishouShoulingSkillTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", yishou.YishouShoulingSkillTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                YishouShoulingSkillTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(243 /* Yishou */);
                    this._surfaceProxy = game.getProxy("46" /* Surface */, 190 /* Surface */);
                };
                YishouShoulingSkillTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.onNt("on_update_yishou_shouling_info" /* ON_UPDATE_YISHOU_SHOULING_INFO */, this.updateState, this);
                };
                YishouShoulingSkillTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this.updateView();
                };
                YishouShoulingSkillTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YishouShoulingSkillTipsMdr.prototype.updateView = function () {
                    var cfg = this._showArgs;
                    this._view.skillItem.img_icon.source = cfg.icon;
                    this._view.lb_name.text = cfg.skill_name;
                    this._view.img_type.source = "jineng_show_type_" + cfg.skill_type;
                    var descStr = this._proxy.getSpecialAttrDesc(cfg.index);
                    this._view.descItem.updateShow(descStr, game.getLanById("base_attr" /* base_attr */));
                    var isActed = this._proxy.isShoulingActed(cfg.index);
                    this._view.currentState = isActed ? 'acted' : 'default';
                    this._view.btn_do.setHint(this._proxy.canShoulingAct(cfg.index));
                };
                YishouShoulingSkillTipsMdr.prototype.updateState = function () {
                    var cfg = this._showArgs;
                    var isActed = this._proxy.isShoulingActed(cfg.index);
                    this._view.currentState = isActed ? 'acted' : 'default';
                };
                YishouShoulingSkillTipsMdr.prototype.onClick = function () {
                    var cfg = this._showArgs;
                    if (this._proxy.canShoulingAct(cfg.index, true)) {
                        this._proxy.c2s_yishou_shouling_active(cfg.index);
                    }
                };
                return YishouShoulingSkillTipsMdr;
            }(game.MdrBase));
            yishou.YishouShoulingSkillTipsMdr = YishouShoulingSkillTipsMdr;
            __reflect(YishouShoulingSkillTipsMdr.prototype, "game.mod.yishou.YishouShoulingSkillTipsMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouyinMdr = /** @class */ (function (_super) {
                __extends(YishouShouyinMdr, _super);
                function YishouShouyinMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", yishou.YishouShouyinView);
                    /**二级页签类型*/
                    _this._type = 1 /* Type1 */;
                    _this._selIdx = 0;
                    return _this;
                }
                YishouShouyinMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(243 /* Yishou */);
                    this._view.list.itemRenderer = mod.AvatarItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                YishouShouyinMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_jiban, egret.TouchEvent.TOUCH_TAP, this.onClickJiban, this);
                    addEventListener(this._view.btn_upstar, egret.TouchEvent.TOUCH_TAP, this.onClickUpstar, this);
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    this.onNt("on_update_yishou_shouyin_info" /* ON_UPDATE_YISHOU_SHOUYIN_INFO */, this.onUpdateView, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePower, this);
                };
                YishouShouyinMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                YishouShouyinMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selIdx = 0;
                    this._selCfg = null;
                    this.removeEffect(this._effId);
                    this._effId = null;
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollH = 0;
                };
                YishouShouyinMdr.prototype.onUpdateView = function () {
                    this.updateListData();
                    this.updateView();
                };
                YishouShouyinMdr.prototype.updateListData = function () {
                    var cfgList = this._proxy.getShouyinCfgList(this._type);
                    var list = [];
                    for (var _i = 0, cfgList_5 = cfgList; _i < cfgList_5.length; _i++) {
                        var cfg = cfgList_5[_i];
                        var info = this._proxy.getShouyinInfo(cfg.index);
                        list.push({
                            cfg: cfg,
                            showHint: this._proxy.canShouyinActOrUp(cfg.index),
                            star: info && info.star || 0,
                            isBattle: false,
                            isSel: false
                        });
                    }
                    list.sort(function (a, b) {
                        if (a.showHint != b.showHint) {
                            return a.showHint ? -1 : 1;
                        }
                        if (a.star != b.star) {
                            return a.star ? -1 : 1;
                        }
                        return b.cfg.quality - a.cfg.quality;
                    });
                    var size = list.length || 0;
                    if (this._selCfg) {
                        for (var i = 0; i < size; i++) {
                            if (this._selCfg.index == list[i].cfg.index) {
                                this._selIdx = i;
                                break;
                            }
                        }
                    }
                    else {
                        if (list[this._selIdx]) {
                            this._selCfg = list[this._selIdx].cfg;
                        }
                    }
                    for (var i = 0; i < size; i++) {
                        list[i].isSel = this._selIdx == i;
                    }
                    this._listData.replaceAll(list);
                    this._view.list.selectedIndex = this._selIdx;
                };
                YishouShouyinMdr.prototype.updateView = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    var cfg = this._selCfg;
                    this._view.nameItem.updateShow(cfg.name, cfg.quality);
                    this._view.img_icon.source = game.ResUtil.getShouyinSrc(cfg.index);
                    // this.removeEffect(this._effId);
                    // this._effId = this.addAnimate(cfg.index, this._view.gr_eft);
                    this.updatePower();
                    this.updateCost();
                    this._view.btn_jiban.setHint(this._proxy.getJibanBtnHint());
                };
                YishouShouyinMdr.prototype.updatePower = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    var star = this._proxy.getShouyinStar(this._selCfg.index);
                    var starIdx = 0;
                    if (star) {
                        starIdx = star - 1;
                    }
                    var attrId = this._selCfg.attr_id[starIdx];
                    var attr = mod.RoleUtil.getAttr(attrId);
                    this._view.btn_god.updateGod(attr && attr.god || 0);
                    this._view.power.setPowerValue(attr && attr.showpower || 0);
                };
                YishouShouyinMdr.prototype.updateCost = function () {
                    var index = this._selCfg.index;
                    var isMax = this._proxy.isShouyinMaxStar(index);
                    if (isMax) {
                        this._view.btn_upstar.updateMaxStar();
                        return;
                    }
                    var star = this._proxy.getShouyinStar(index);
                    var cost = this._selCfg.material[star];
                    var tips = '';
                    if (star) {
                        var power = this._selCfg.star_power[star];
                        var starPower = Math.floor(power / 100);
                        tips = game.getLanById("upstar" /* upstar */) + game.getLanById("showpower" /* showpower */) + "\n"
                            + game.TextUtil.addColor("+" + starPower + "%", 2330156 /* GREEN */);
                    }
                    this._view.btn_upstar.updateCost(cost, !!star, tips);
                    this._view.btn_upstar.setHint(this._proxy.canShouyinActOrUp(index));
                };
                YishouShouyinMdr.prototype.onClickJiban = function () {
                    mod.ViewMgr.getIns().showView("47" /* Jiban */, "01" /* JibanMain */, "08" /* YishouShouyin */);
                };
                YishouShouyinMdr.prototype.onClickUpstar = function () {
                    var index = this._selCfg.index;
                    if (this._proxy.canShouyinActOrUp(index, true)) {
                        this._proxy.c2s_yishou_shouying_up_star(index);
                    }
                };
                YishouShouyinMdr.prototype.onClickList = function (e) {
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selIdx) {
                        return;
                    }
                    var list = this._listData.source;
                    var preData = list[this._selIdx];
                    if (preData) {
                        preData.isSel = false;
                        this._listData.itemUpdated(preData);
                    }
                    var curData = e.item;
                    curData.isSel = true;
                    this._listData.itemUpdated(curData);
                    this._selIdx = itemIdx;
                    this._selCfg = curData.cfg;
                    this.updateView();
                };
                return YishouShouyinMdr;
            }(game.EffectMdrBase));
            yishou.YishouShouyinMdr = YishouShouyinMdr;
            __reflect(YishouShouyinMdr.prototype, "game.mod.yishou.YishouShouyinMdr");
            var YishouShouyinMdr2 = /** @class */ (function (_super) {
                __extends(YishouShouyinMdr2, _super);
                function YishouShouyinMdr2() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._type = 2 /* Type2 */;
                    return _this;
                }
                return YishouShouyinMdr2;
            }(YishouShouyinMdr));
            yishou.YishouShouyinMdr2 = YishouShouyinMdr2;
            __reflect(YishouShouyinMdr2.prototype, "game.mod.yishou.YishouShouyinMdr2");
            var YishouShouyinMdr3 = /** @class */ (function (_super) {
                __extends(YishouShouyinMdr3, _super);
                function YishouShouyinMdr3() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._type = 3 /* Type3 */;
                    return _this;
                }
                return YishouShouyinMdr3;
            }(YishouShouyinMdr));
            yishou.YishouShouyinMdr3 = YishouShouyinMdr3;
            __reflect(YishouShouyinMdr3.prototype, "game.mod.yishou.YishouShouyinMdr3");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var yishou;
        (function (yishou) {
            var YishouShouyinSecondMainMdr = /** @class */ (function (_super) {
                __extends(YishouShouyinSecondMainMdr, _super);
                function YishouShouyinSecondMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "fanjieshouyintubiao",
                            mdr: yishou.YishouShouyinMdr,
                            hintTypes: ["62" /* Yishou */, "01" /* Main */, "04" /* Shouyin */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "mojieshouyintubiao",
                            mdr: yishou.YishouShouyinMdr2,
                            hintTypes: ["62" /* Yishou */, "01" /* Main */, "04" /* Shouyin */, "02" /* TabBtnType02 */]
                        },
                        {
                            icon: "xianjieshouyintubiao",
                            btnType: "03" /* TabBtnType03 */,
                            mdr: yishou.YishouShouyinMdr3,
                            hintTypes: ["62" /* Yishou */, "01" /* Main */, "04" /* Shouyin */, "03" /* TabBtnType03 */]
                        }
                    ];
                    return _this;
                }
                YishouShouyinSecondMainMdr.prototype.onTabChanged = function () {
                    _super.prototype.onTabChanged.call(this);
                    this.sendNt("update_wnd_second_mdr_top" /* UPDATE_WND_SECOND_MDR_TOP */);
                };
                return YishouShouyinSecondMainMdr;
            }(mod.WndSecondMdr));
            yishou.YishouShouyinSecondMainMdr = YishouShouyinSecondMainMdr;
            __reflect(YishouShouyinSecondMainMdr.prototype, "game.mod.yishou.YishouShouyinSecondMainMdr");
        })(yishou = mod.yishou || (mod.yishou = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=yishou.js.map