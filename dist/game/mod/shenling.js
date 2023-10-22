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
        var shenling;
        (function (shenling) {
            var Handler = base.Handler;
            var ShenLingLingQiTipsMdr = /** @class */ (function (_super) {
                __extends(ShenLingLingQiTipsMdr, _super);
                function ShenLingLingQiTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shenling.ShenLingLingQiTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                ShenLingLingQiTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(221 /* ShenlingLingqi */);
                };
                ShenLingLingQiTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.onUpdateAttr, this);
                    this.onNt("on_shen_ling_ling_qi_update" /* ON_SHEN_LING_LING_QI_UPDATE */, this.updateView, this);
                };
                ShenLingLingQiTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this._view.currentState = 'default';
                    this.updateView();
                };
                ShenLingLingQiTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollV = 0;
                    this._baseAttrIds = null;
                    this._fengyinAttrIds = null;
                    this._suitAttrIds = null;
                    this._suitBuffIds = null;
                };
                ShenLingLingQiTipsMdr.prototype.onClickBtn = function () {
                    var args = this._showArgs;
                    if (!this._proxy.canActOrUp(args.slIndex, args.idx, true)) {
                        return;
                    }
                    if (this._costCnt) {
                        this._view.bar.show(this._costCnt, this._costCnt, true, 0, false, 1 /* Value */, Handler.alloc(this, this.onceCallBack));
                    }
                };
                ShenLingLingQiTipsMdr.prototype.onceCallBack = function () {
                    this._proxy.c2s_god_brother_lingqi_click(1, this._showArgs.slIndex, this._showArgs.idx);
                };
                ShenLingLingQiTipsMdr.prototype.updateView = function () {
                    var info = this._proxy.getLingQiInfo(this._showArgs.slIndex, this._showArgs.idx);
                    this._showArgs.star = info ? info.star : 0;
                    this._showArgs.isAct = !!info;
                    this.updateTopView();
                    this.updateMiddleView();
                    this.updateBottomView();
                };
                ShenLingLingQiTipsMdr.prototype.updateTopView = function () {
                    var args = this._showArgs;
                    var cfg = game.GameConfig.getEquipmentCfg(args.index);
                    if (!cfg) {
                        return;
                    }
                    this._view.qualityTips.updateShow(cfg.quality);
                    this._view.lingqiIcon.data = __assign({}, this._showArgs, { isAct: true, hint: false });
                    this._view.lb_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(cfg.name, game.ColorUtil.getColorByQuality1(cfg.quality)));
                };
                ShenLingLingQiTipsMdr.prototype.updateMiddleView = function () {
                    var _a, _b;
                    var args = this._showArgs;
                    var info = this._proxy.getLingQiInfo(args.slIndex, args.idx);
                    var lqCfg = this._proxy.getLingQiCfg(args.slIndex, info && info.star || 1);
                    if (info && info.base_attrs) {
                        this.updateBaseAttr(info.base_attrs);
                    }
                    else {
                        if (lqCfg && lqCfg.attr_base) {
                            var attrs = mod.RoleUtil.getAttrList(lqCfg.attr_base[args.idx - 1]);
                            if (attrs && attrs.length) {
                                this.updateBaseAttr(game.TextUtil.calcAttrList(attrs));
                            }
                            else {
                                this._baseAttrIds = lqCfg.attr_base[args.idx - 1];
                            }
                        }
                    }
                    if (info && info.fengyin_attrs) {
                        this.updateFengyinAttr(info.fengyin_attrs);
                    }
                    else {
                        if (lqCfg && lqCfg.attr_fengyin) {
                            var attrs = mod.RoleUtil.getAttrList(lqCfg.attr_fengyin[args.idx - 1]);
                            if (attrs && attrs.length) {
                                this.updateFengyinAttr(game.TextUtil.calcAttrList(attrs));
                            }
                            else {
                                this._fengyinAttrIds = lqCfg.attr_fengyin[args.idx - 1];
                            }
                        }
                    }
                    var idList = this._proxy.getLingQiIdList(args.slIndex) || [];
                    if (idList && idList.length) {
                        var descList = [];
                        for (var i = 0; i < idList.length; i++) {
                            var info_1 = this._proxy.getLingQiInfo(args.slIndex, i + 1);
                            var cfg = game.GameConfig.getEquipmentCfg(idList[i]);
                            if (!cfg) {
                                continue;
                            }
                            descList.push([game.TextUtil.addColor(cfg.name + ("\uFF08" + (info_1 ? info_1.star + game.getLanById("soul2" /* soul2 */) : game.getLanById("not_active" /* not_active */)) + "\uFF09"), info_1 && info_1.star ? 8585074 /* GREEN */ : 7835024 /* GRAY */)]);
                        }
                        this._view.suitDescItem1.updateShow(descList, game.getLanById("lingqi_tips2" /* lingqi_tips2 */));
                    }
                    this._suitAttrIds = [];
                    this._suitBuffIds = [];
                    var cfgObj = this._proxy.getLingQiCfgObj(args.slIndex);
                    for (var key in cfgObj) {
                        var cfg = cfgObj[key];
                        if (!cfg) {
                            continue;
                        }
                        if (cfg.suit_attr) {
                            (_a = this._suitAttrIds).push.apply(_a, cfg.suit_attr);
                        }
                        else if (cfg.suit_buff) {
                            (_b = this._suitBuffIds).push.apply(_b, cfg.suit_buff);
                        }
                    }
                    this.updateSuitView();
                };
                ShenLingLingQiTipsMdr.prototype.updateBottomView = function () {
                    var args = this._showArgs;
                    var nextCfg = this._proxy.getLingQiCfg(args.slIndex, args.star + 1);
                    this._view.gr_cost.visible = !!nextCfg;
                    this._view.img_max.visible = !this._view.gr_cost.visible;
                    if (!nextCfg) {
                        //满星状态
                        return;
                    }
                    var cost = nextCfg.cost[args.idx - 1];
                    this._view.icon_cost.data = cost;
                    this._view.icon_cost.updateCostLab(cost);
                    this._view.btn_do.label = args.star == 0 ? game.getLanById("active" /* active */) : game.getLanById("enhance_3" /* enhance_3 */);
                    this._view.btn_do.redPoint.visible = this._proxy.canActOrUp(args.slIndex, args.idx);
                    this._costCnt = cost[1];
                    this._view.bar.show(0, cost[1], false, 0, false, 1 /* Value */);
                };
                ShenLingLingQiTipsMdr.prototype.onUpdateAttr = function () {
                    var baseAttrs = mod.RoleUtil.getAttrList(this._baseAttrIds);
                    if (this._baseAttrIds && baseAttrs && baseAttrs.length) {
                        this.updateBaseAttr(game.TextUtil.calcAttrList(baseAttrs));
                        this._baseAttrIds = null;
                    }
                    var fengyinAttrs = mod.RoleUtil.getAttrList(this._fengyinAttrIds);
                    if (this._fengyinAttrIds && fengyinAttrs && fengyinAttrs.length) {
                        this.updateFengyinAttr(game.TextUtil.calcAttrList(fengyinAttrs));
                        this._fengyinAttrIds = null;
                    }
                    this.updateSuitView();
                };
                //防止没有套装效果1的情况下，没有更新到套装效果2
                ShenLingLingQiTipsMdr.prototype.updateSuitView = function () {
                    if (this._suitAttrIds && this._suitAttrIds.length) {
                        var suitAttrs = mod.RoleUtil.getAttrList(this._suitAttrIds);
                        if (suitAttrs && suitAttrs.length) {
                            this.updateSuitAttrBuff();
                        }
                    }
                    else {
                        if (this._suitBuffIds && this._suitBuffIds.length) {
                            this.updateSuitAttrBuff();
                        }
                    }
                };
                ShenLingLingQiTipsMdr.prototype.updatePower = function (power) {
                    this._view.power.setPowerValue(power);
                };
                ShenLingLingQiTipsMdr.prototype.updateFengyinPower = function (power) {
                    this.addBmpFont(power + '', game.BmpTextCfg[100 /* CommonPower */], this._view.gr_power);
                };
                ShenLingLingQiTipsMdr.prototype.updateBaseAttr = function (attr) {
                    if (!attr) {
                        return;
                    }
                    var color = this._showArgs.isAct ? 8585074 /* GREEN */ : 7835024 /* GRAY */;
                    var attrStr = game.TextUtil.getAttrTextInfos(attr, color, '\n', ' +', this._showArgs.isAct ? null : color).join('\n');
                    this._view.baseAttrItem.updateShow(attrStr, game.getLanById("ywl_baseAttr" /* ywl_baseAttr */));
                    this.updatePower(attr && attr.showpower && attr.showpower.toNumber() || 0);
                };
                ShenLingLingQiTipsMdr.prototype.updateFengyinAttr = function (attr) {
                    var isSlActed = this._proxy.isShenlingActed(this._showArgs.slIndex);
                    var txt;
                    if (isSlActed) {
                        txt = game.TextUtil.addColor(game.getLanById("lingqi_tips3" /* lingqi_tips3 */), 8585074 /* GREEN */);
                    }
                    else {
                        var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, this._showArgs.slIndex);
                        txt = game.TextUtil.addColor(game.StringUtil.substitute(game.getLanById("lingqi_tips4" /* lingqi_tips4 */), [cfg.name]), 16731212 /* RED */);
                    }
                    var color = this._showArgs.isAct ? 8585074 /* GREEN */ : 7835024 /* GRAY */;
                    var attrStr = game.TextUtil.getAttrTextInfos(attr, color, '\n', ' +', this._showArgs.isAct ? null : color).join('\n');
                    this._view.fengyinAttrItem.updateShow(attrStr, game.getLanById("lingqi_tips5" /* lingqi_tips5 */) + txt);
                    this._view.gr_jiefengzhanli.visible = !isSlActed;
                    if (!isSlActed) {
                        this.updateFengyinPower(attr && attr.showpower && attr.showpower.toNumber() || 0);
                    }
                    else {
                        this.updatePower(attr && attr.showpower && attr.showpower.toNumber() || 0); //已激活的神灵，只需要显示战力即可，这个战力为解封战力。
                    }
                };
                ShenLingLingQiTipsMdr.prototype.updateSuitAttrBuff = function () {
                    var descList = [];
                    var cfgObj = this._proxy.getLingQiCfgObj(this._showArgs.slIndex);
                    var actedCnt = 0;
                    var totalCnt = 0;
                    for (var key in cfgObj) {
                        var cfg = cfgObj[key];
                        if (!cfg) {
                            continue;
                        }
                        var isStarActed = this._proxy.isStarAllActed(this._showArgs.slIndex, cfg.index);
                        if (isStarActed) {
                            actedCnt++;
                        }
                        var color = isStarActed ? 8585074 /* GREEN */ : 7835024 /* GRAY */;
                        var desc = '';
                        if (cfg.suit_attr) {
                            totalCnt++;
                            var attr = game.TextUtil.calcAttrList(mod.RoleUtil.getAttrList(cfg.suit_attr));
                            desc = game.TextUtil.getAttrTextInfos(attr, color, '\n', ' +', isStarActed ? null : color).join('\n');
                        }
                        else if (cfg.suit_buff) {
                            totalCnt++;
                            var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, cfg.suit_buff[0]);
                            if (!buffCfg) {
                                continue;
                            }
                            desc = game.TextUtil.addColor(buffCfg.des, isStarActed ? 15262666 /* WHITE */ : 7835024 /* GRAY */);
                        }
                        if (!desc) {
                            continue;
                        }
                        var ary = [game.TextUtil.addColor(game.StringUtil.substitute(game.getLanById("lingqi_tips6" /* lingqi_tips6 */), [cfg.index]), isStarActed ? 15262666 /* WHITE */ : color), desc];
                        descList.push(ary);
                    }
                    var title = game.StringUtil.substitute(game.getLanById("lingqi_tips7" /* lingqi_tips7 */), [actedCnt + '/' + totalCnt]);
                    this._view.suitDescItem2.updateShow(descList, title);
                };
                return ShenLingLingQiTipsMdr;
            }(game.EffectMdrBase));
            shenling.ShenLingLingQiTipsMdr = ShenLingLingQiTipsMdr;
            __reflect(ShenLingLingQiTipsMdr.prototype, "game.mod.shenling.ShenLingLingQiTipsMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingLingQiIcon = /** @class */ (function (_super) {
                __extends(ShenLingLingQiIcon, _super);
                function ShenLingLingQiIcon() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenLingLingQiIconSkin";
                    return _this;
                }
                ShenLingLingQiIcon.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
                };
                ShenLingLingQiIcon.prototype.dataChanged = function () {
                    if (!this.data) {
                        this.icon.defaultIcon();
                        this.redPoint.visible = false;
                        this.gr_star.visible = false;
                        return;
                    }
                    var data = this.data;
                    var cfg = game.GameConfig.getEquipmentCfg(data.index);
                    if (!cfg) {
                        return;
                    }
                    this.icon.setData(data.index, 3 /* NotTips */);
                    if (data.isAct) {
                        this.icon.setImgGray('');
                    }
                    else {
                        this.icon.setImgGray();
                    }
                    this.updateStarView();
                    this.redPoint.visible = !!data.hint;
                };
                ShenLingLingQiIcon.prototype.updateStarView = function () {
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
                ShenLingLingQiIcon.prototype.onClick = function () {
                    mod.ViewMgr.getIns().showSecondPop("45" /* Shenling */, "07" /* ShenlingLingqiTips */, __assign({}, this.data));
                };
                return ShenLingLingQiIcon;
            }(mod.BaseListenerRenderer));
            shenling.ShenLingLingQiIcon = ShenLingLingQiIcon;
            __reflect(ShenLingLingQiIcon.prototype, "game.mod.shenling.ShenLingLingQiIcon");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var c2s_god_brother_lingqi_click = msg.c2s_god_brother_lingqi_click;
            var s2c_god_brother_lingqi_info = msg.s2c_god_brother_lingqi_info;
            /**
             * @description 神灵灵器系统
             */
            var ShenLingLingQiProxy = /** @class */ (function (_super) {
                __extends(ShenLingLingQiProxy, _super);
                function ShenLingLingQiProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._maxUpStarMap = {};
                    _this._buffIdMap = {};
                    _this._lingqiMap = {};
                    _this._showErrorMap = {};
                    return _this;
                }
                Object.defineProperty(ShenLingLingQiProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                ShenLingLingQiProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new shenling.ShenLingLingQiModel();
                    this.onProto(s2c_god_brother_lingqi_info, this.s2c_god_brother_lingqi_info, this);
                };
                /**
                 * @param button_type 1为指定激活/升星   2为一键激活/升星
                 * @param bro_index 神灵index
                 * @param index 灵器索引 1,2,3
                 */
                ShenLingLingQiProxy.prototype.c2s_god_brother_lingqi_click = function (button_type, bro_index, index) {
                    var msg = new c2s_god_brother_lingqi_click();
                    msg.button_type = button_type;
                    msg.bro_index = Long.fromNumber(bro_index);
                    if (index) {
                        msg.index = index;
                    }
                    this.sendProto(msg);
                };
                ShenLingLingQiProxy.prototype.s2c_god_brother_lingqi_info = function (n) {
                    var msg = n.body;
                    if (msg.all_datas != null) {
                        for (var _i = 0, _a = msg.all_datas; _i < _a.length; _i++) {
                            var data = _a[_i];
                            this._model.all_datas[data.bro_index.toNumber()] = data;
                        }
                    }
                    this.updateHint();
                    this.sendNt("on_shen_ling_ling_qi_update" /* ON_SHEN_LING_LING_QI_UPDATE */);
                };
                ShenLingLingQiProxy.prototype.getMaxUpStar = function (slIndex) {
                    if (this._maxUpStarMap[slIndex]) {
                        return this._maxUpStarMap[slIndex];
                    }
                    var cfgObj = this.getLingQiCfgObj(slIndex);
                    if (!cfgObj) {
                        return 0;
                    }
                    var keys = Object.keys(cfgObj);
                    var cfg = cfgObj[+keys[keys.length - 1]];
                    if (!cfg) {
                        return 0;
                    }
                    this._maxUpStarMap[slIndex] = cfg.index;
                    return cfg.index;
                };
                ShenLingLingQiProxy.prototype.getBuffId = function (slIndex) {
                    if (this._buffIdMap[slIndex]) {
                        return this._buffIdMap[slIndex];
                    }
                    var cfgObj = this.getLingQiCfgObj(slIndex);
                    if (!cfgObj) {
                        return 0;
                    }
                    var buffId = 0;
                    var keys = Object.keys(cfgObj);
                    for (var i = keys.length - 1; i >= 0; i--) {
                        var cfg = cfgObj[keys[i]];
                        if (cfg && cfg.suit_buff) {
                            buffId = cfg.suit_buff[0];
                            break;
                        }
                    }
                    this._buffIdMap[slIndex] = buffId;
                    return buffId;
                };
                //灵器index列表
                ShenLingLingQiProxy.prototype.getLingQiIdList = function (slIndex) {
                    if (this._lingqiMap[slIndex]) {
                        return this._lingqiMap[slIndex];
                    }
                    var cfgObj = this.getLingQiCfgObj(slIndex);
                    if (!cfgObj || !cfgObj[1]) {
                        return null;
                    }
                    var cfg = cfgObj[1];
                    var ary = [];
                    for (var _i = 0, _a = cfg.cost; _i < _a.length; _i++) {
                        var cost = _a[_i];
                        ary.push(cost[0]);
                    }
                    this._lingqiMap[slIndex] = ary;
                    return ary;
                };
                //获取灵器索引，从1开始
                ShenLingLingQiProxy.prototype.getLingqiIdx = function (index) {
                    var equipCfg = game.GameConfig.getEquipmentCfg(index);
                    var slIndex = equipCfg.parm1 && equipCfg.parm1[0] || 0;
                    if (!slIndex) {
                        return 1;
                    }
                    var lingqiCfg = this.getLingQiCfg(slIndex, 1);
                    if (!lingqiCfg) {
                        return 1;
                    }
                    for (var i = 0; i < lingqiCfg.cost.length; i++) {
                        var cost = lingqiCfg.cost[0];
                        if (cost && cost[0] == index) {
                            return i + 1;
                        }
                    }
                    return 1;
                };
                ShenLingLingQiProxy.prototype.getLingQiCfgObj = function (slIndex) {
                    var obj = game.getConfigByNameId("shenling_lingqi.json" /* ShenlingLingqi */, slIndex);
                    if (!obj) {
                        if (!this._showErrorMap[slIndex]) {
                            DEBUG && console.error("shenling_lingqi.json \u6CA1\u6709" + slIndex + "\u7684\u914D\u7F6E");
                            this._showErrorMap[slIndex] = true;
                        }
                        return null;
                    }
                    return obj;
                };
                ShenLingLingQiProxy.prototype.getLingQiCfg = function (slIndex, star) {
                    var cfgObj = this.getLingQiCfgObj(slIndex);
                    if (!cfgObj || !cfgObj[star]) {
                        return null;
                    }
                    return cfgObj[star];
                };
                ShenLingLingQiProxy.prototype.getLingQiInfos = function (slIndex) {
                    var slInfo = this.model.all_datas[slIndex];
                    if (slInfo && slInfo.list) {
                        return slInfo.list;
                    }
                    return null;
                };
                /**
                 * @param slIndex 神灵index
                 * @param idx 灵器索引(1,2,3)
                 */
                ShenLingLingQiProxy.prototype.getLingQiInfo = function (slIndex, idx) {
                    var slInfo = this.model.all_datas[slIndex];
                    if (!slInfo || !slInfo.list) {
                        return null;
                    }
                    for (var _i = 0, _a = slInfo.list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item && item.index == idx) {
                            return item;
                        }
                    }
                    return null;
                };
                //系列战力
                ShenLingLingQiProxy.prototype.getPowerByType = function (type) {
                    var shenlingProxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var cfgList = shenlingProxy.getShenLingCfgListByType(type);
                    var power = 0;
                    for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                        var cfg = cfgList_1[_i];
                        var singlePower = this.getPower(cfg.index);
                        power += singlePower;
                    }
                    return power;
                };
                ShenLingLingQiProxy.prototype.getPower = function (slIndex) {
                    var info = this._model.all_datas[slIndex];
                    if (!info) {
                        return 0;
                    }
                    var power = 0;
                    if (info.suit_attrs && info.suit_attrs.showpower) {
                        power += info.suit_attrs.showpower.toNumber();
                    }
                    if (info.list && info.list.length) {
                        var isActed = this.isShenlingActed(slIndex);
                        for (var _i = 0, _a = info.list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (!item) {
                                continue;
                            }
                            //神灵未激活前，读取基础属性，激活后读取封印属性
                            if (isActed) {
                                if (item.fengyin_attrs && item.fengyin_attrs.showpower) {
                                    power += item.fengyin_attrs.showpower.toNumber();
                                }
                            }
                            else {
                                if (item.base_attrs && item.base_attrs.showpower) {
                                    power += item.base_attrs.showpower.toNumber();
                                }
                            }
                        }
                    }
                    return power;
                };
                /**
                 * @param slIndex 神灵index
                 * @param idx 灵器索引 (1,2,3)
                 */
                ShenLingLingQiProxy.prototype.isMaxUpStar = function (slIndex, idx) {
                    var maxUpStar = this.getMaxUpStar(slIndex);
                    var info = this.getLingQiInfo(slIndex, idx);
                    return info && info.star >= maxUpStar;
                };
                ShenLingLingQiProxy.prototype.canOneKey = function (slIndex) {
                    for (var i = 1; i <= 3; i++) {
                        if (this.canActOrUp(slIndex, i)) {
                            return true;
                        }
                    }
                    return false;
                };
                ShenLingLingQiProxy.prototype.getShenlingStar = function (slIndex) {
                    var proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var info = proxy.getInfoByIndex(slIndex);
                    return info ? info.star : 0;
                };
                ShenLingLingQiProxy.prototype.isShenlingActed = function (slIndex) {
                    var proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var info = proxy && proxy.getInfoByIndex(slIndex);
                    return !!info;
                };
                //tips:激活/进阶条件不足，升星神灵可提高灵器进阶上限
                ShenLingLingQiProxy.prototype.canActOrUp = function (slIndex, idx, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isMaxUpStar(slIndex, idx)) {
                        if (isTips) {
                            game.PromptBox.getIns().show(game.getLanById("lingqi_tips8" /* lingqi_tips8 */));
                        }
                        return false;
                    }
                    var info = this.getLingQiInfo(slIndex, idx);
                    var curStar = info ? info.star : 0;
                    var nextCfg = this.getLingQiCfg(slIndex, curStar + 1);
                    if (!nextCfg) {
                        return false;
                    }
                    var shenlingStar = this.getShenlingStar(slIndex);
                    if (shenlingStar < nextCfg.lmt_star) {
                        if (isTips) {
                            game.PromptBox.getIns().show(game.getLanById("lingqi_tips9" /* lingqi_tips9 */));
                        }
                        return false;
                    }
                    var cost = nextCfg.cost[idx - 1];
                    if (!mod.BagUtil.checkPropCnt(cost[0], cost[1])) {
                        if (isTips) {
                            var txt = game.getLanById(curStar == 0 ? "active" /* active */ : "rank_up" /* rank_up */);
                            game.PromptBox.getIns().show(game.StringUtil.substitute(game.getLanById("lingqi_tips10" /* lingqi_tips10 */), [txt]));
                        }
                        return false;
                    }
                    return true;
                };
                //只有存在一个灵器激活即可
                ShenLingLingQiProxy.prototype.haveOneLqActed = function (slIndex) {
                    var info = this.getLingQiInfos(slIndex);
                    return !!(info && info.length);
                };
                //此神灵的最大星级套装buff属性是否激活
                ShenLingLingQiProxy.prototype.isActedSuit = function (slIndex) {
                    var cfgObj = this.getLingQiCfgObj(slIndex);
                    var keys = Object.keys(cfgObj);
                    for (var i = keys.length - 1; i >= 0; i--) {
                        var cfg = cfgObj[+keys[i]];
                        if (!cfg) {
                            continue;
                        }
                        if (cfg.suit_buff) {
                            return this.isStarAllActed(slIndex, cfg.index);
                        }
                    }
                    return false;
                };
                ShenLingLingQiProxy.prototype.getLingQiActedCnt = function (slIndex, star) {
                    var info = this.getLingQiInfos(slIndex) || [];
                    var cnt = 0;
                    for (var _i = 0, info_2 = info; _i < info_2.length; _i++) {
                        var item = info_2[_i];
                        if (item && item.star >= star) {
                            cnt++;
                        }
                    }
                    return cnt;
                };
                //三个灵器都达到star星级否
                ShenLingLingQiProxy.prototype.isStarAllActed = function (slIndex, star) {
                    var actedCnt = this.getLingQiActedCnt(slIndex, star);
                    var idList = this.getLingQiIdList(slIndex) || [];
                    return actedCnt >= idList.length;
                };
                ShenLingLingQiProxy.prototype.getHintByIndex = function (slIndex) {
                    return this.canOneKey(slIndex);
                };
                ShenLingLingQiProxy.prototype.getHintByType = function (type) {
                    var proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var cfgList = proxy.getShenLingCfgListByType(type);
                    for (var _i = 0, cfgList_2 = cfgList; _i < cfgList_2.length; _i++) {
                        var cfg = cfgList_2[_i];
                        if (cfg && this.getHintByIndex(cfg.index)) {
                            return true;
                        }
                    }
                    return false;
                };
                ShenLingLingQiProxy.prototype.onBagUpdateByBagType = function (n) {
                    var bagTypes = n.body;
                    if (bagTypes.indexOf(4 /* ShenlingEquip */) > -1) {
                        this.updateHint();
                    }
                };
                ShenLingLingQiProxy.prototype.updateHint = function () {
                    var hint = false;
                    for (var _i = 0, ShenLingTypeAry_1 = game.ShenLingTypeAry; _i < ShenLingTypeAry_1.length; _i++) {
                        var type = ShenLingTypeAry_1[_i];
                        if (this.getHintByType(type)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.hintPath);
                };
                return ShenLingLingQiProxy;
            }(game.ProxyBase));
            shenling.ShenLingLingQiProxy = ShenLingLingQiProxy;
            __reflect(ShenLingLingQiProxy.prototype, "game.mod.shenling.ShenLingLingQiProxy");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingModel = /** @class */ (function () {
                function ShenLingModel() {
                    /**神灵类型信息*/
                    this.list = {};
                    /**羁绊列表*/
                    this.jiBanList = {};
                    /**单个神灵奖励状态*/
                    this.rewardList = {};
                    /**神灵主界面红点路径*/
                    this.mainHintPath = ["45" /* Shenling */, "01" /* ShenLingMain */ + "01" /* Main */];
                    /**神灵升星红点路径*/
                    this.upStarHintPath = ["45" /* Shenling */, "01" /* ShenLingMain */ + "02" /* UpStar */];
                    /**羁绊红点路径*/
                    this.jibanHintPath = ["47" /* Jiban */, "01" /* JibanMain */ + "02" /* ShenLing */];
                }
                return ShenLingModel;
            }());
            shenling.ShenLingModel = ShenLingModel;
            __reflect(ShenLingModel.prototype, "game.mod.shenling.ShenLingModel");
            /**
             *  对应 god_brother_type_data 进行结构调整，将 list 改成 k-v 模式
             */
            var GodBrotherTypeData = /** @class */ (function () {
                function GodBrotherTypeData() {
                    this.skill_list = []; //灵宝技能{技能id,技能id,...}未激活则为0
                    this.splevel_list = []; // 已突破的等级 列表
                    this.list = {}; //已激活的神灵列表
                }
                return GodBrotherTypeData;
            }());
            shenling.GodBrotherTypeData = GodBrotherTypeData;
            __reflect(GodBrotherTypeData.prototype, "game.mod.shenling.GodBrotherTypeData");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var s2c_god_brother_info = msg.s2c_god_brother_info;
            var c2s_god_brother_levelup = msg.c2s_god_brother_levelup;
            var c2s_god_brother_starup = msg.c2s_god_brother_starup;
            var c2s_god_brother_groupup = msg.c2s_god_brother_groupup;
            var c2s_god_brother_levelrewards = msg.c2s_god_brother_levelrewards;
            var c2s_god_brother_s_skill = msg.c2s_god_brother_s_skill;
            var c2s_god_brother_uporchange = msg.c2s_god_brother_uporchange;
            var s2c_god_brother_group_list = msg.s2c_god_brother_group_list;
            var s2c_god_brother_unit_reward_list = msg.s2c_god_brother_unit_reward_list;
            var c2s_god_brother_evolve = msg.c2s_god_brother_evolve;
            /**
             * @description 神灵系统
             */
            var ShenLingProxy = /** @class */ (function (_super) {
                __extends(ShenLingProxy, _super);
                function ShenLingProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._actList = []; //请求激活的神灵index
                    _this._actJibanMap = {}; //羁绊神灵激活
                    //todo 错误提示，避免提示太多
                    _this._errorStarCfg = {};
                    /**神迹奖励长度*/
                    _this._shenjiMap = {};
                    _this._consumeList = [];
                    _this._evolveMaxQuality = {};
                    return _this;
                }
                Object.defineProperty(ShenLingProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                ShenLingProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    this._actList = [];
                    this._actJibanMap = {};
                    this._upStarData = null;
                };
                ShenLingProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new shenling.ShenLingModel();
                    this.onProto(s2c_god_brother_info, this.s2c_god_brother_info, this);
                    this.onProto(s2c_god_brother_group_list, this.s2c_god_brother_group_list, this);
                    this.onProto(s2c_god_brother_unit_reward_list, this.s2c_god_brother_unit_reward_list, this);
                };
                /**
                 * 升级
                 * @param posType
                 * @param btnType 1为升级 2为一键升级 3为突破
                 */
                ShenLingProxy.prototype.c2s_god_brother_levelup = function (posType, btnType) {
                    var msg = new c2s_god_brother_levelup();
                    msg.postype = posType;
                    msg.buttontype = btnType;
                    this.sendProto(msg);
                };
                // 激活 升星
                ShenLingProxy.prototype.c2s_god_brother_starup = function (index) {
                    var msg = new c2s_god_brother_starup();
                    msg.index = Long.fromNumber(index);
                    if (this._actList && this._actList.indexOf(index) < 0 /*&& !this.getInfoByIndex(index)*/) {
                        this._actList.push(index);
                    }
                    this.sendProto(msg);
                };
                /**
                 *  羁绊激活
                 *  [index + shenlingIndex] => 激活对应的羁绊神灵index
                 *  [index + rewardList] => 激活对应的羁绊奖励
                 * @param index 羁绊ID
                 * @param rewardList 带rewardindex字段时表示领取羁绊组合达标奖励,不带则表示激活
                 * @param shenlingIndex
                 */
                ShenLingProxy.prototype.c2s_god_brother_groupup = function (index, rewardList, shenlingIndex) {
                    var msg = new c2s_god_brother_groupup();
                    msg.groupindex = index;
                    if (rewardList && rewardList.length) {
                        msg.rewardindex = rewardList;
                    }
                    if (shenlingIndex) {
                        msg.unitindex = Long.fromNumber(shenlingIndex);
                        if (this._actJibanMap[shenlingIndex] == undefined) {
                            this._actJibanMap[shenlingIndex] = true;
                        }
                    }
                    this.sendProto(msg);
                };
                // 典籍奖励领取
                ShenLingProxy.prototype.c2s_god_brother_levelrewards = function (index, rewardIdx) {
                    var msg = new c2s_god_brother_levelrewards();
                    msg.index = Long.fromNumber(index);
                    msg.rewardindex = rewardIdx;
                    this.sendProto(msg);
                };
                // 合击技能升级  激活灵宝技能
                ShenLingProxy.prototype.c2s_god_brother_s_skill = function (posType, slot) {
                    var msg = new c2s_god_brother_s_skill();
                    msg.postype = posType;
                    msg.slot = slot;
                    this.sendProto(msg);
                };
                // 上阵或替换
                ShenLingProxy.prototype.c2s_god_brother_uporchange = function (posType, index) {
                    var msg = new c2s_god_brother_uporchange();
                    msg.postype = posType;
                    msg.index = Long.fromNumber(index);
                    this.sendProto(msg);
                };
                // 单个类型神灵也是用该协议更新
                ShenLingProxy.prototype.s2c_god_brother_info = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.list) {
                        return;
                    }
                    var oldList = this.getActedList();
                    var oldTypeList = this.getActedTypeList();
                    for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        this.updateInfo(info);
                    }
                    var newList = this.getActedList();
                    var newTypeList = this.getActedTypeList();
                    this.checkCnt(oldList, newList); //检测神灵数量
                    this.checkType(oldTypeList, newTypeList); //检测神灵类型
                    this.updateHint();
                    this.sendNt("on_shen_ling_update_info" /* ON_SHEN_LING_UPDATE_INFO */);
                };
                //是否是突破等级
                ShenLingProxy.prototype.isBreakThroughLv = function (data) {
                    if (!data || !data.splevel_list) {
                        return false;
                    }
                    var isBreak = data.splevel_list.indexOf(data.level) > -1; //已经突破
                    if (isBreak) {
                        return false;
                    }
                    var cfg = this.getLevelCfg(data.level);
                    if (cfg && cfg.tupo_consume) {
                        return true;
                    }
                    return false;
                };
                /** 根据 postype 更新对应系列神灵信息 */
                ShenLingProxy.prototype.updateInfo = function (msg) {
                    if (!msg) {
                        return;
                    }
                    var info = this._model.list[msg.postype];
                    var isBhLv = this.isBreakThroughLv(info); //用于神灵突破弹窗
                    if (!info) {
                        info = this._model.list[msg.postype] = new shenling.GodBrotherTypeData();
                    }
                    var keys = Object.keys(msg);
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var key = keys_1[_i];
                        if (key == 'list') {
                            continue;
                        }
                        if (key == 'upindex') {
                            info.upindex = msg.upindex.toNumber();
                        }
                        else {
                            info[key] = msg[key];
                        }
                    }
                    if (msg.list != null) {
                        if (!info.list) {
                            info.list = {};
                        }
                        for (var _a = 0, _b = msg.list; _a < _b.length; _a++) {
                            var item = _b[_a];
                            var index = item.index.toNumber();
                            if (this._actList && this._actList.indexOf(index) > -1) {
                                var isShowSurfaceTips = false;
                                //外显激活弹窗
                                if (item.star == 1) {
                                    isShowSurfaceTips = true;
                                    mod.ViewMgr.getIns().showSurfaceTips(index);
                                }
                                //升星成功弹窗
                                if (item.star != 0) {
                                    var curStar = item.star || 0;
                                    var maxUpStar = this.getMaxStar(index); //升星的最大星级（非觉醒星级）
                                    if (curStar <= maxUpStar) {
                                        var god = item.attrs && item.attrs["god" /* god */] || 0;
                                        var lastStarCfg = this.getStarCfg(index, curStar - 1);
                                        var lastGod = 0;
                                        if (lastStarCfg && lastStarCfg.star_property) {
                                            var lastAttr = mod.RoleUtil.getAttr(lastStarCfg.star_property[0]);
                                            lastGod = lastAttr && lastAttr["god" /* god */] || 0;
                                        }
                                        var skillId = this.getSkillIdByIndex(index, curStar);
                                        var upStarData = {
                                            star: curStar,
                                            skillId: skillId,
                                            attrFont1: god > 0 ? "+" + god : '',
                                            attrFont0: god > 0 ? "\u4ED9\u529B+" + lastGod : '' //有仙力+0情况，用god>0判断
                                        };
                                        if (isShowSurfaceTips) {
                                            this._upStarData = upStarData;
                                        }
                                        else {
                                            this._upStarData = null;
                                            mod.ViewMgr.getIns().showUpStarTips(upStarData);
                                        }
                                    }
                                }
                                this._actList.splice(this._actList.indexOf(index), 1);
                            }
                            info.list[item.index.toNumber()] = item;
                        }
                    }
                    //升级突破弹窗
                    var isBhLv2 = this.isBreakThroughLv(info);
                    if (isBhLv && !isBhLv2) {
                        var typeCfg = this.getTypeCfg(msg.postype);
                        mod.ViewMgr.getIns().showSurfaceUpTips(typeCfg.heji_id, info.skilllevel, true);
                    }
                };
                //升星成功弹窗
                ShenLingProxy.prototype.onSurfaceTipsHide = function () {
                    if (this._upStarData) {
                        var data = mod.RoleUtil.clone(this._upStarData);
                        mod.ViewMgr.getIns().showUpStarTips(data);
                        this._upStarData = null;
                    }
                };
                //升星所激活的技能id
                ShenLingProxy.prototype.getSkillIdByIndex = function (index, star) {
                    var cfg = this.getShenLingCfg(index);
                    if (!cfg) {
                        return 0;
                    }
                    var info = this.getInfoByIndex(index);
                    if (star == undefined) {
                        star = info && info.star || 0;
                    }
                    for (var _i = 0, _a = cfg.talent1; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item[0] == star) {
                            return item[1];
                        }
                    }
                    return 0;
                };
                // 羁绊列表
                ShenLingProxy.prototype.s2c_god_brother_group_list = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.list) {
                        return;
                    }
                    for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        this._model.jiBanList[item.groupindex] = item;
                        if (item.idlist) {
                            for (var _b = 0, _c = item.idlist; _b < _c.length; _b++) {
                                var longId = _c[_b];
                                if (this._actJibanMap[longId.toNumber()]) {
                                    mod.ViewMgr.getIns().showSuccessTips(1 /* Act */);
                                    this._actJibanMap[longId.toNumber()] = null;
                                    delete this._actJibanMap[longId.toNumber()];
                                }
                            }
                        }
                    }
                    this.updateHint();
                    this.sendNt("on_shen_ling_ji_ban_update" /* ON_SHEN_LING_JI_BAN_UPDATE */, msg.list && msg.list[0]);
                };
                // 单个神灵奖励状态更新也走该协议
                ShenLingProxy.prototype.s2c_god_brother_unit_reward_list = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.list) {
                        return;
                    }
                    for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        this._model.rewardList[item.index.toNumber()] = item.status;
                    }
                    this.updateHint();
                    this.sendNt("on_shen_ling_reward_update" /* ON_SHEN_LING_REWARD_UPDATE */);
                };
                // 神灵进化
                ShenLingProxy.prototype.c2s_god_brother_evolve = function (index) {
                    var msg = new c2s_god_brother_evolve();
                    msg.index = Long.fromNumber(index);
                    this.sendProto(msg);
                };
                /**====================================== 协议 end ===================================*/
                /**系列神灵信息*/
                ShenLingProxy.prototype.getTypeInfo = function (type) {
                    return this._model.list[type];
                };
                ShenLingProxy.prototype.getInfoByIndex = function (index) {
                    var type = this.getShenLingType(index);
                    var infos = this.getTypeInfo(type);
                    if (!infos || !infos.list) {
                        return null;
                    }
                    return infos.list[index];
                };
                //神灵是否激活
                ShenLingProxy.prototype.isActed = function (index) {
                    var info = this.getInfoByIndex(index);
                    return info && info.star > 0;
                };
                /**获取羁绊信息*/
                ShenLingProxy.prototype.getJiBanInfo = function (index) {
                    return this._model.jiBanList[index];
                };
                /**根据类型获取已激活的神灵列表，按战力高低排序*/
                ShenLingProxy.prototype.getActedListByType = function (type, sort) {
                    var _this = this;
                    if (sort === void 0) { sort = true; }
                    var infos = this.getTypeInfo(type);
                    if (!infos) {
                        return [];
                    }
                    var list = [];
                    for (var index in infos.list) {
                        var info = infos.list[index];
                        if (!info) {
                            continue;
                        }
                        list.push(info);
                    }
                    if (sort) {
                        list.sort(function (a, b) { return _this.getSinglePower(b) - _this.getSinglePower(a); });
                    }
                    return list;
                };
                /**获取已激活的神灵index列表*/
                ShenLingProxy.prototype.getActedList = function () {
                    var list = [];
                    for (var k in this._model.list) {
                        var type = parseInt(k);
                        var actedList = this.getActedListByType(type);
                        for (var _i = 0, actedList_1 = actedList; _i < actedList_1.length; _i++) {
                            var info = actedList_1[_i];
                            list.push(info.index.toNumber());
                        }
                    }
                    return list;
                };
                //神灵战力
                ShenLingProxy.prototype.getSinglePower = function (info) {
                    if (!info || !info.attrs || !info.attrs.showpower) {
                        return 0;
                    }
                    return info.attrs.showpower.toNumber();
                };
                //神灵战力
                ShenLingProxy.prototype.getSinglePowerByIndex = function (index) {
                    var info = this.getInfoByIndex(index);
                    return this.getSinglePower(info);
                };
                //等级战力+系列升星战力
                ShenLingProxy.prototype.getPowerByType = function (type) {
                    var infos = this.getTypeInfo(type);
                    if (!infos || !infos.list) {
                        return 0;
                    }
                    var totalPower = 0;
                    if (infos.now_attrs && infos.now_attrs.showpower) {
                        totalPower = infos.now_attrs.showpower.toNumber();
                    }
                    for (var idx in infos.list) {
                        var info = infos.list[idx];
                        if (!info || !info.attrs || !info.attrs.showpower) {
                            continue;
                        }
                        totalPower += info.attrs.showpower.toNumber();
                    }
                    return totalPower;
                };
                /**系列神灵属性总和 + 当前阵位的升级属性*/
                ShenLingProxy.prototype.getAttrByType = function (type) {
                    var infos = this.getTypeInfo(type);
                    if (!infos || !infos.list) {
                        return null;
                    }
                    var attrList = [];
                    for (var idx in infos.list) {
                        var info = infos.list[idx];
                        if (!info || !info.attrs) {
                            continue;
                        }
                        attrList.push(info.attrs);
                    }
                    if (infos.now_attrs) {
                        attrList.push(infos.now_attrs);
                    }
                    return game.TextUtil.calcAttrList(attrList);
                };
                /**神灵总属性*/
                ShenLingProxy.prototype.getAttr = function () {
                    var attrList = [];
                    for (var _i = 0, ShenLingTypeAry_2 = game.ShenLingTypeAry; _i < ShenLingTypeAry_2.length; _i++) {
                        var type = ShenLingTypeAry_2[_i];
                        var attr = this.getAttrByType(type);
                        attrList.push(attr);
                    }
                    return game.TextUtil.calcAttrList(attrList);
                };
                /**单个神灵属性*/
                ShenLingProxy.prototype.getAttrByIndex = function (index) {
                    var info = this.getInfoByIndex(index);
                    return info ? info.attrs : null;
                };
                /**升级是否满级了*/
                ShenLingProxy.prototype.isMaxLv = function (type) {
                    var info = this.getTypeInfo(type);
                    if (!info) {
                        return false;
                    }
                    var cfg = this.getLevelCfg(info.level);
                    var nextCfg = this.getLevelCfg(info.level + 1);
                    //没有下一级配置，就是满级了
                    return !!(!nextCfg && cfg);
                };
                ShenLingProxy.prototype.canUpLv = function (type, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isMaxLv(type)) {
                        if (isTips) {
                            game.PromptBox.getIns().show(game.getLanById("maxlv" /* maxlv */));
                        }
                        return false;
                    }
                    var info = this.getTypeInfo(type);
                    if (!info || this.isBreakThrough(type)) {
                        return false;
                    }
                    var lvCfg = this.getLevelCfg(info.level);
                    if (!lvCfg || !lvCfg.star_consume) {
                        return false;
                    }
                    for (var _i = 0, _a = lvCfg.star_consume; _i < _a.length; _i++) {
                        var cost = _a[_i];
                        if (!mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 2 /* Text */ : 0 /* None */)) {
                            return false;
                        }
                    }
                    return true;
                };
                /**
                 * 是否到突破阶段了。
                 * @param type
                 */
                ShenLingProxy.prototype.isBreakThrough = function (type) {
                    var info = this.getTypeInfo(type);
                    if (!info || this.isMaxLv(type)) {
                        return false;
                    }
                    var cfg = this.getLevelCfg(info.level);
                    var isBh = !!(cfg && cfg.tupo_consume); //需要突破
                    if (isBh && info.splevel_list.indexOf(cfg.index) > -1) {
                        return false;
                    }
                    return isBh;
                };
                ShenLingProxy.prototype.canBreakThrough = function (type, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    var info = this.getTypeInfo(type);
                    if (!info || !this.isBreakThrough(type)) {
                        return false;
                    }
                    var lvCfg = this.getLevelCfg(info.level);
                    if (!lvCfg || !lvCfg.tupo_consume || info.splevel_list.indexOf(lvCfg.index) > -1) {
                        return false;
                    }
                    for (var _i = 0, _a = lvCfg.tupo_consume; _i < _a.length; _i++) {
                        var cost = _a[_i];
                        if (!mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */)) {
                            return false;
                        }
                    }
                    return true;
                };
                /**是否有觉醒阶段*/
                ShenLingProxy.prototype.haveAwakenStatue = function (index) {
                    var awakenStar = this.getMaxAwakenStar(index);
                    return awakenStar != null;
                };
                /**是否觉醒阶段了*/
                ShenLingProxy.prototype.isAwaken = function (index) {
                    var info = this.getInfoByIndex(index);
                    if (!info || !this.haveAwakenStatue(index)) {
                        return false;
                    }
                    return info.star >= this.getMaxStar(index);
                };
                ShenLingProxy.prototype.canUpStar = function (index, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    var info = this.getInfoByIndex(index);
                    if (info && info.star >= this.getMaxStar(index)) {
                        if (isTips) {
                            game.PromptBox.getIns().show(game.getLanById("lingqi_tips8" /* lingqi_tips8 */));
                        }
                        return false;
                    }
                    var cfg = this.getStarCfg(index, info ? info.star + 1 : 1);
                    if (!cfg || !cfg.star_consume || cfg.awaken) {
                        return false;
                    }
                    var cnt = 0;
                    var cost = cfg.star_consume[0];
                    if (cost) {
                        cnt = mod.BagUtil.getPropCntByIdx(cost[0]);
                    }
                    var commonId = this.getCommonCost(index);
                    if (commonId) {
                        cnt += mod.BagUtil.getPropCntByIdx(commonId);
                    }
                    if (cnt >= cost[1]) {
                        return true;
                    }
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                ShenLingProxy.prototype.canAwaken = function (index, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    var info = this.getInfoByIndex(index);
                    if (!info || info.star < this.getMaxStar(index)) {
                        return false;
                    }
                    var maxStar = this.getMaxAwakenStar(index);
                    if (info.star >= maxStar) {
                        if (isTips) {
                            game.PromptBox.getIns().show(game.getLanById("shenling_tips12" /* shenling_tips12 */));
                        }
                        return false;
                    }
                    var cfg = this.getStarCfg(index, info ? info.star + 1 : this.getMaxStar(index) + 1);
                    if (!cfg || !cfg.star_consume) {
                        return false;
                    }
                    for (var _i = 0, _a = cfg.star_consume; _i < _a.length; _i++) {
                        var cost = _a[_i];
                        if (!mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 2 /* Text */ : 0 /* None */)) {
                            return false;
                        }
                    }
                    return true;
                };
                /**获取某个系列第一个可以激活的神灵配置*/
                ShenLingProxy.prototype.getFirstActByType = function (type) {
                    var info = this.getTypeInfo(type);
                    if (info && info.upindex) {
                        return null;
                    }
                    var cfgs = this.getShenLingCfgListByType(type);
                    if (!cfgs || !cfgs.length) {
                        return null;
                    }
                    for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                        var cfg = cfgs_1[_i];
                        var starCfg = this.getStarCfg(cfg.index, 1);
                        if (!starCfg) {
                            continue;
                        }
                        var cost = starCfg.star_consume[0];
                        if (mod.BagUtil.checkPropCnt(cost[0], cost[1])) {
                            return cfg;
                        }
                    }
                    return null;
                };
                /**================================= config =================================*/
                /**神灵类型配置*/
                ShenLingProxy.prototype.getTypeCfg = function (type) {
                    return game.getConfigByNameId("shenling_leixing.json" /* ShenlingType */, type);
                };
                /**神灵羁绊配置*/
                ShenLingProxy.prototype.getJiBanCfg = function (index) {
                    if (!this._jiBanCfgMap) {
                        this.buildJiBanCfgMap();
                    }
                    return this._jiBanCfgMap[index] || [];
                };
                /**神灵配置*/
                ShenLingProxy.prototype.getShenLingCfg = function (index) {
                    return game.getConfigByNameId("shenling.json" /* Shenling */, index);
                };
                /**神灵等级配置*/
                ShenLingProxy.prototype.getLevelCfg = function (lv) {
                    return game.getConfigByNameId("shenling_dengji.json" /* ShenlingLevel */, lv);
                };
                /**神灵星级配置*/
                ShenLingProxy.prototype.getStarCfg = function (index, star) {
                    if (!this._starCfgMap) {
                        this.buildStarCfgMap();
                    }
                    if (!this._starCfgMap[index]) {
                        if (!this._errorStarCfg[index]) {
                            DEBUG && console.error("\u795E\u7075\u661F\u7EA7\u914D\u7F6E\u6CA1\u6709 " + index);
                            this._errorStarCfg[index] = true;
                        }
                        return null;
                    }
                    return this._starCfgMap[index][star];
                };
                /**获取具体神灵所有星级配置信息*/
                ShenLingProxy.prototype.getStarCfgList = function (index) {
                    if (!this._starCfgMap) {
                        this.buildStarCfgMap();
                    }
                    if (!this._starCfgMap[index]) {
                        if (!this._errorStarCfg[index]) {
                            DEBUG && console.error("\u795E\u7075\u661F\u7EA7\u914D\u7F6E\u6CA1\u6709 " + index);
                            this._errorStarCfg[index] = true;
                        }
                        return null;
                    }
                    return this._starCfgMap[index];
                };
                ShenLingProxy.prototype.buildStarCfgMap = function () {
                    var cfgs = game.getConfigListByName("shenling_xingji.json" /* ShenlingStar */);
                    var cfgMap = this._starCfgMap = {};
                    var starMap = this._maxStarMap = {};
                    for (var _i = 0, cfgs_2 = cfgs; _i < cfgs_2.length; _i++) {
                        var cfg = cfgs_2[_i];
                        if (!cfg) {
                            continue;
                        }
                        var index = cfg.shenling_index;
                        if (!cfgMap[index]) {
                            cfgMap[index] = {};
                        }
                        cfgMap[index][cfg.shenling_star] = cfg;
                        if (!starMap[index]) {
                            starMap[index] = [];
                        }
                        if (!cfg.awaken) {
                            starMap[index][0] = Math.max(starMap[index][0] || 0, cfg.shenling_star);
                        }
                        else {
                            starMap[index][1] = Math.max(starMap[index][1] || 0, cfg.shenling_star);
                        }
                    }
                };
                /**升星的最大星级*/
                ShenLingProxy.prototype.getMaxStar = function (index) {
                    if (!this._maxStarMap) {
                        this.buildStarCfgMap();
                    }
                    if (!this._maxStarMap[index]) {
                        return 0;
                    }
                    return this._maxStarMap[index][0];
                };
                /**觉醒的最大星级*/
                ShenLingProxy.prototype.getMaxAwakenStar = function (index) {
                    if (!this._maxStarMap) {
                        this.buildStarCfgMap();
                    }
                    if (!this._maxStarMap[index]) {
                        return 0;
                    }
                    return this._maxStarMap[index][1];
                };
                ShenLingProxy.prototype.buildShenLingCfgMap = function () {
                    this._typeCfgMap = {};
                    var cfgs = game.getConfigListByName("shenling.json" /* Shenling */);
                    for (var _i = 0, cfgs_3 = cfgs; _i < cfgs_3.length; _i++) {
                        var cfg = cfgs_3[_i];
                        if (!cfg) {
                            continue; //过滤不展示的
                        }
                        if (!this._typeCfgMap[cfg.type]) {
                            this._typeCfgMap[cfg.type] = [];
                        }
                        this._typeCfgMap[cfg.type].push(cfg);
                    }
                };
                //是否有对应碎片
                ShenLingProxy.prototype.haveStarCost = function (index) {
                    var starCfg = this.getStarCfg(index, 1);
                    if (!starCfg || !starCfg.star_consume) {
                        return false;
                    }
                    var cost = starCfg.star_consume[0];
                    var costIdx = cost[0];
                    return mod.BagUtil.checkPropCnt(costIdx, 1);
                };
                //神灵能否展示出来
                ShenLingProxy.prototype.canShowShenling = function (cfg) {
                    if (!cfg) {
                        return false;
                    }
                    return cfg.show == 1 || this.haveStarCost(cfg.index) || !!this.getInfoByIndex(cfg.index);
                };
                /**获取类型神灵列表*/
                ShenLingProxy.prototype.getShenLingCfgListByType = function (type) {
                    if (!this._typeCfgMap) {
                        this.buildShenLingCfgMap();
                    }
                    //再过滤一波，show==0，有碎片就展示，没有不展示 2023.8.2
                    var rst = [];
                    var cfgList = this._typeCfgMap[type] || [];
                    for (var _i = 0, cfgList_3 = cfgList; _i < cfgList_3.length; _i++) {
                        var cfg = cfgList_3[_i];
                        if (this.canShowShenling(cfg)) {
                            rst.push(cfg);
                        }
                    }
                    return rst;
                };
                /**获取神灵类型*/
                ShenLingProxy.prototype.getShenLingType = function (index) {
                    var cfg = this.getShenLingCfg(index);
                    if (!cfg) {
                        DEBUG && console.error("\u4E0D\u5B58\u5728\u795E\u7075: " + index);
                        return 0;
                    }
                    return cfg.type;
                };
                ShenLingProxy.prototype.buildJiBanCfgMap = function () {
                    this._jiBanCfgMap = {};
                    this._jiBanIdxList = [];
                    var cfgs = game.getConfigListByName("shenling_jiban.json" /* ShenlingJiBan */);
                    for (var _i = 0, cfgs_4 = cfgs; _i < cfgs_4.length; _i++) {
                        var cfg = cfgs_4[_i];
                        if (!cfg) {
                            continue;
                        }
                        var id = cfg.jibanid;
                        if (!this._jiBanCfgMap[id]) {
                            this._jiBanCfgMap[id] = [];
                        }
                        if (this._jiBanIdxList.indexOf(id) < 0) {
                            this._jiBanIdxList.push(id);
                        }
                        this._jiBanCfgMap[id].push(cfg);
                    }
                };
                /**羁绊配置的羁绊id列表*/
                ShenLingProxy.prototype.getJiBanIdxList = function () {
                    if (!this._jiBanIdxList) {
                        this.buildJiBanCfgMap();
                    }
                    return this._jiBanIdxList || [];
                };
                /**================================= hint =================================*/
                /**羁绊红点*/
                ShenLingProxy.prototype.getJiBanHint = function () {
                    var idxList = this.getJiBanIdxList();
                    var hint = false;
                    for (var _i = 0, idxList_1 = idxList; _i < idxList_1.length; _i++) {
                        var index = idxList_1[_i];
                        if (this.getJiBanActHint(index) || this.getJiBanRewardHint(index)) {
                            hint = true;
                            break;
                        }
                        var cfgs = this.getJiBanCfg(index);
                        if (!cfgs || !cfgs.length) {
                            continue;
                        }
                        var partners = cfgs[0].partners;
                        for (var _a = 0, partners_1 = partners; _a < partners_1.length; _a++) {
                            var shenlingIdx = partners_1[_a];
                            if (this.getJiBanShenLingActHint(index, shenlingIdx)) {
                                hint = true;
                                break;
                            }
                        }
                        if (hint) {
                            break;
                        }
                    }
                    // 羁绊面板的神灵羁绊红点
                    mod.HintMgr.setHint(hint, this._model.jibanHintPath);
                    return hint;
                };
                /**
                 * 羁绊神灵激活红点
                 * @param jbIndex 羁绊ID
                 * @param index 神灵index
                 */
                ShenLingProxy.prototype.getJiBanShenLingActHint = function (jbIndex, index) {
                    var jiBanInfo = this.getJiBanInfo(jbIndex);
                    var actedList = jiBanInfo && jiBanInfo.idlist || []; //激活的神灵index
                    for (var _i = 0, actedList_2 = actedList; _i < actedList_2.length; _i++) {
                        var id = actedList_2[_i];
                        if (id.eq(Long.fromNumber(index))) {
                            return false;
                        }
                    }
                    var info = this.getInfoByIndex(index);
                    return !!info;
                };
                /**羁绊神灵激活红点*/
                ShenLingProxy.prototype.getJibanShenlingHint = function (jbIndex) {
                    var cfgs = this.getJiBanCfg(jbIndex);
                    if (!cfgs || !cfgs.length) {
                        return false;
                    }
                    var partners = cfgs[0].partners;
                    for (var _i = 0, partners_2 = partners; _i < partners_2.length; _i++) {
                        var shenlingIdx = partners_2[_i];
                        if (this.getJiBanShenLingActHint(jbIndex, shenlingIdx)) {
                            return true;
                        }
                    }
                    return false;
                };
                /**羁绊激活和升级红点*/
                ShenLingProxy.prototype.getJiBanActHint = function (index, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    var mainInfo = this.getJiBanInfo(index);
                    var cfgs = this.getJiBanCfg(index);
                    if (mainInfo && cfgs && mainInfo.level >= cfgs.length) {
                        return false;
                    }
                    //神灵有未激活
                    if (!mainInfo || !cfgs || !cfgs.length || !mainInfo.idlist || mainInfo.idlist.length < cfgs[0].partners.length) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u672A\u8FBE\u5230\u6FC0\u6D3B\u6761\u4EF6");
                        }
                        return false;
                    }
                    var lv = mainInfo.level || 0;
                    for (var i = lv; i < cfgs.length; i++) {
                        var cfg = cfgs[i];
                        if (!cfg) {
                            continue;
                        }
                        var actNum = 0;
                        var totalNum = cfg.partners.length;
                        for (var _i = 0, _a = cfg.partners; _i < _a.length; _i++) {
                            var idx = _a[_i];
                            var info = this.getInfoByIndex(idx);
                            if (info && info.star >= cfg.star) {
                                actNum++;
                            }
                        }
                        if (actNum >= totalNum) {
                            return true;
                        }
                    }
                    if (isTips) {
                        game.PromptBox.getIns().show("\u672A\u8FBE\u5230\u8FDB\u9636\u6761\u4EF6");
                    }
                    return false;
                };
                /**羁绊奖励红点*/
                ShenLingProxy.prototype.getJiBanRewardHint = function (index) {
                    var info = this.getJiBanInfo(index);
                    if (!info || !info.level) {
                        return false;
                    }
                    var rewardList = info.reward_list || [];
                    for (var _i = 0, rewardList_1 = rewardList; _i < rewardList_1.length; _i++) {
                        var item = rewardList_1[_i];
                        if (item == 1) {
                            return true;
                        }
                    }
                    return false;
                };
                /**羁绊item的红点：神灵激活红点，羁绊激活升级红点，羁绊奖励红点*/
                ShenLingProxy.prototype.getJibanHint = function (jbIndex) {
                    return this.getJibanShenlingHint(jbIndex)
                        || this.getJiBanActHint(jbIndex)
                        || this.getJiBanRewardHint(jbIndex);
                };
                /**判断灵宝技能是否可激活*/
                ShenLingProxy.prototype.checkLingBaoSkillAct = function (type, skillIdx) {
                    var info = this.getTypeInfo(type);
                    if (!info || !info.upindex) {
                        return false;
                    }
                    var actedList = info.skill_list || [];
                    if (actedList.indexOf(skillIdx) > -1) {
                        return false;
                    }
                    var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillIdx);
                    if (!skillCfg || !skillCfg.act_material) {
                        return false;
                    }
                    var cost = skillCfg.act_material[0];
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                };
                /**主界面的灵宝技能激活红点*/
                ShenLingProxy.prototype.getLingBaoSkillHint = function (type) {
                    var cfg = this.getTypeCfg(type);
                    if (!cfg) {
                        return false;
                    }
                    var skills = cfg.skill_array || [];
                    for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
                        var idx = skills_1[_i];
                        if (this.checkLingBaoSkillAct(type, idx)) {
                            return true;
                        }
                    }
                    return false;
                };
                /**上阵红点*/
                ShenLingProxy.prototype.getShangZhenHint = function () {
                    var isHint = false;
                    for (var _i = 0, ShenLingTypeAry_3 = game.ShenLingTypeAry; _i < ShenLingTypeAry_3.length; _i++) {
                        var type = ShenLingTypeAry_3[_i];
                        var typeInfo = this.getTypeInfo(type);
                        if (!typeInfo || !typeInfo.upindex) {
                            continue;
                        }
                        var curPower = this.getSinglePower(this.getInfoByIndex(typeInfo.upindex));
                        var actedList = this.getActedListByType(type);
                        for (var _a = 0, actedList_3 = actedList; _a < actedList_3.length; _a++) {
                            var info = actedList_3[_a];
                            if (info && info.index.toNumber() == typeInfo.upindex) {
                                continue;
                            }
                            if (this.getSinglePower(info) > curPower) {
                                isHint = true;
                                break;
                            }
                        }
                        if (isHint) {
                            break;
                        }
                    }
                    return isHint;
                };
                /**判断未激活阵位的是否有可以激活的神灵*/
                ShenLingProxy.prototype.checkActByNotUpType = function (type) {
                    var cfg = this.getFirstActByType(type);
                    return !!cfg;
                };
                /**神灵主界面的类型红点*/
                ShenLingProxy.prototype.getMainHintByType = function (type) {
                    var typeInfo = this.getTypeInfo(type);
                    if (!typeInfo || !typeInfo.upindex) {
                        return this.checkActByNotUpType(type);
                    }
                    return this.getJiBanHint() || this.canBreakThrough(type)
                        || this.canUpLv(type) || this.getLingBaoSkillHint(type)
                        || this.getShangZhenHint();
                };
                ShenLingProxy.prototype.getShenJiRewardLen = function (index) {
                    if (this._shenjiMap[index] != null) {
                        return this._shenjiMap[index];
                    }
                    var cfgs = this.getStarCfgList(index);
                    var size = 0;
                    for (var idx in cfgs) {
                        var cfg = cfgs[idx];
                        if (cfg && !cfg.awaken) {
                            size++;
                        }
                    }
                    this._shenjiMap[index] = size;
                    return size;
                };
                /**神迹奖励红点*/
                ShenLingProxy.prototype.getShenJiRewardHint = function (index) {
                    var rewardList = this._model.rewardList[index];
                    if (!rewardList || !rewardList.length) {
                        return false;
                    }
                    var size = this.getShenJiRewardLen(index);
                    var list = rewardList.slice(0, size); //神迹奖励位，服务端下发包括觉醒奖励，服务端不过滤
                    return list.indexOf(1) > -1;
                };
                /**升星界面的单个神灵*/
                ShenLingProxy.prototype.getStarHintByIndex = function (index) {
                    return this.canUpStar(index) || this.canAwaken(index) || this.getShenJiRewardHint(index) || this.getEvolveHint(index);
                };
                /**升星界面的类型红点*/
                ShenLingProxy.prototype.getStarHintByType = function (type) {
                    if (this.checkActByNotUpType(type)) {
                        return true;
                    }
                    var cfgList = this.getShenLingCfgListByType(type);
                    if (!cfgList || !cfgList.length) {
                        return false;
                    }
                    for (var _i = 0, cfgList_4 = cfgList; _i < cfgList_4.length; _i++) {
                        var cfg = cfgList_4[_i];
                        if (!cfg) {
                            continue;
                        }
                        if (this.getStarHintByIndex(cfg.index)) {
                            return true;
                        }
                    }
                    return false;
                };
                ShenLingProxy.prototype.updateHint = function () {
                    if (!this.checkOpenIdx()) {
                        return;
                    }
                    var mainHint = false;
                    var upStarHint = false;
                    for (var _i = 0, ShenLingTypeAry_4 = game.ShenLingTypeAry; _i < ShenLingTypeAry_4.length; _i++) {
                        var type = ShenLingTypeAry_4[_i];
                        if (!mainHint && this.getMainHintByType(type)) {
                            mainHint = true;
                        }
                        if (!upStarHint && this.getStarHintByType(type)) {
                            upStarHint = true;
                        }
                        mod.HintMgr.setHint(mainHint, this._model.mainHintPath.concat(["" + type]));
                        mod.HintMgr.setHint(upStarHint, this._model.upStarHintPath.concat(["" + type]));
                    }
                };
                /**等级升级和突破消耗，星级消耗，灵宝技能消耗*/
                ShenLingProxy.prototype.getConsumeList = function () {
                    var _this = this;
                    if (this._consumeList && this._consumeList.length) {
                        return this._consumeList;
                    }
                    var lvCfgs = game.getConfigListByName("shenling_dengji.json" /* ShenlingLevel */);
                    for (var _i = 0, lvCfgs_1 = lvCfgs; _i < lvCfgs_1.length; _i++) {
                        var cfg = lvCfgs_1[_i];
                        if (!cfg) {
                            continue;
                        }
                        if (cfg.star_consume) {
                            cfg.star_consume.forEach(function (item) {
                                if (_this._consumeList.indexOf(item[0]) < 0) {
                                    _this._consumeList.push(item[0]);
                                }
                            });
                        }
                        if (cfg.tupo_consume) {
                            cfg.tupo_consume.forEach(function (item) {
                                if (_this._consumeList.indexOf(item[0]) < 0) {
                                    _this._consumeList.push(item[0]);
                                }
                            });
                            break; //读取到有消耗的就退出循环
                        }
                    }
                    var starCfgs = game.getConfigListByName("shenling_xingji.json" /* ShenlingStar */);
                    for (var _a = 0, starCfgs_1 = starCfgs; _a < starCfgs_1.length; _a++) {
                        var cfg = starCfgs_1[_a];
                        if (!cfg) {
                            continue;
                        }
                        if (cfg.star_consume) {
                            cfg.star_consume.forEach(function (item) {
                                if (_this._consumeList.indexOf(item[0]) < 0) {
                                    _this._consumeList.push(item[0]);
                                }
                            });
                        }
                    }
                    var typeCfgs = game.getConfigListByName("shenling_leixing.json" /* ShenlingType */);
                    for (var _b = 0, typeCfgs_1 = typeCfgs; _b < typeCfgs_1.length; _b++) {
                        var cfg = typeCfgs_1[_b];
                        if (!cfg || !cfg.skill_array) {
                            continue;
                        }
                        for (var _c = 0, _d = cfg.skill_array; _c < _d.length; _c++) {
                            var skillIdx = _d[_c];
                            var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillIdx);
                            if (!skillCfg || !skillCfg.act_material) {
                                continue;
                            }
                            var cost = skillCfg.act_material[0];
                            if (this._consumeList.indexOf(cost[0]) < 0) {
                                this._consumeList.push(cost[0]);
                            }
                        }
                    }
                    return this._consumeList;
                };
                /**星级消耗*/
                ShenLingProxy.prototype.onBagUpdateByPropTypeAndSubType = function (n) {
                    if (!this.checkOpenIdx()) {
                        return;
                    }
                    var list = n.body;
                    for (var type in list) {
                        if ((+type) == 11 /* Surface */) {
                            var types = list[type];
                            if (types && types.indexOf(3 /* Shenling */) > -1) {
                                this.updateHint();
                                break;
                            }
                        }
                    }
                };
                /**升级，突破，星级觉醒消耗*/
                ShenLingProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    if (!this.checkOpenIdx()) {
                        return;
                    }
                    var list = n.body;
                    var consumeList = this.getConsumeList();
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var idx = list_1[_i];
                        if (consumeList.indexOf(idx) > -1) {
                            this.updateHint();
                            break;
                        }
                    }
                };
                ShenLingProxy.prototype.checkOpenIdx = function () {
                    return mod.ViewMgr.getIns().checkViewOpen(1041670102 /* Shenling */);
                };
                /**================================= 属性 =================================*/
                /**
                 * 获取阵位神灵的特殊属性信息 例如：风蚀等级: 100, 风蚀攻击: 100
                 * @param type 阵位类型
                 */
                ShenLingProxy.prototype.getSpecialAttrsByType = function (type) {
                    var attrs = this.getAttrByType(type);
                    var attrKeys = game.ShenLingTypeAttrKey[type];
                    var rst = [];
                    //等级
                    if (attrs && attrs[attrKeys[0]]) {
                        var txt = game.TextUtil.getAttrsText(attrKeys[0]) + ': ' +
                            game.TextUtil.addColor((attrs[attrKeys[0]]) + '', 2330156 /* GREEN */);
                        rst.push(txt);
                    }
                    if (attrs && attrs[attrKeys[1]]) {
                        var txt1 = game.TextUtil.getAttrsText(attrKeys[1]) + ': ' +
                            game.TextUtil.addColor((attrs[attrKeys[1]]) + '', 2330156 /* GREEN */);
                        rst.push(txt1);
                    }
                    return rst;
                };
                /**
                 * 单个神灵的特殊属性信息 例如：风蚀等级: 100, 风蚀攻击: 100
                 * @param index
                 */
                ShenLingProxy.prototype.getSpecialAttrsByIdx = function (index) {
                    var type = this.getShenLingType(index);
                    var attrKeys = game.ShenLingTypeAttrKey[type];
                    var attrs = this.getAttrByIndex(index);
                    var rst = [];
                    //等级
                    if (attrs && attrs[attrKeys[0]]) {
                        var txt = game.TextUtil.getAttrsText(attrKeys[0]) + ': ' +
                            game.TextUtil.addColor((attrs[attrKeys[0]]) + '', 2330156 /* GREEN */);
                        rst.push(txt);
                    }
                    //攻击
                    if (attrs && attrs[attrKeys[1]]) {
                        var txt1 = game.TextUtil.getAttrsText(attrKeys[1]) + ': ' +
                            game.TextUtil.addColor((attrs[attrKeys[1]]) + '', 2330156 /* GREEN */);
                        rst.push(txt1);
                    }
                    return rst;
                };
                /**检测神灵数量是否变更*/
                ShenLingProxy.prototype.checkCnt = function (oldList, newList) {
                    if (oldList.length != newList.length) {
                        this.sendNt("on_shen_ling_update_cnt" /* ON_SHEN_LING_UPDATE_CNT */);
                    }
                };
                ShenLingProxy.prototype.isTypeActed = function (type) {
                    var info = this.getTypeInfo(type);
                    return !!info;
                };
                ShenLingProxy.prototype.getActedTypeList = function () {
                    var ary = [];
                    for (var _i = 0, ShenLingTypeAry_5 = game.ShenLingTypeAry; _i < ShenLingTypeAry_5.length; _i++) {
                        var type = ShenLingTypeAry_5[_i];
                        if (this.isTypeActed(type)) {
                            ary.push(type);
                        }
                    }
                    return ary;
                };
                ShenLingProxy.prototype.checkType = function (oldTypes, newTypes) {
                    if (oldTypes.length != newTypes.length) {
                        this.sendNt("on_shen_ling_update_type" /* ON_SHEN_LING_UPDATE_TYPE */);
                    }
                };
                //某个类型可以升级
                ShenLingProxy.prototype.haveUpLvType = function () {
                    for (var _i = 0, ShenLingTypeAry_6 = game.ShenLingTypeAry; _i < ShenLingTypeAry_6.length; _i++) {
                        var type = ShenLingTypeAry_6[_i];
                        if (this.canUpLv(type)) {
                            return true;
                        }
                    }
                    return false;
                };
                /**某阵位可激活，isFirst判断阵位*/
                ShenLingProxy.prototype.haveActType = function (isFirst) {
                    if (isFirst === void 0) { isFirst = true; }
                    for (var _i = 0, ShenLingTypeAry_7 = game.ShenLingTypeAry; _i < ShenLingTypeAry_7.length; _i++) {
                        var type = ShenLingTypeAry_7[_i];
                        var cfg = isFirst ? this.getFirstActByType(type) : this.canActByType(type);
                        if (cfg) {
                            return true;
                        }
                    }
                    return false;
                };
                //某个类型有可激活的
                ShenLingProxy.prototype.canActByType = function (type) {
                    var cfgList = this.getShenLingCfgListByType(type);
                    for (var _i = 0, cfgList_5 = cfgList; _i < cfgList_5.length; _i++) {
                        var cfg = cfgList_5[_i];
                        if (this.isActed(cfg.index)) {
                            continue;
                        }
                        if (this.canUpStar(cfg.index)) {
                            return true;
                        }
                    }
                    return false;
                };
                //某个类型可以升星
                ShenLingProxy.prototype.canUpStarByType = function (type) {
                    var cfgList = this.getShenLingCfgListByType(type);
                    for (var _i = 0, cfgList_6 = cfgList; _i < cfgList_6.length; _i++) {
                        var cfg = cfgList_6[_i];
                        if (this.canUpStar(cfg.index)) {
                            return true;
                        }
                    }
                    return false;
                };
                /**某阵位可升星*/
                ShenLingProxy.prototype.haveUpStarType = function () {
                    for (var _i = 0, ShenLingTypeAry_8 = game.ShenLingTypeAry; _i < ShenLingTypeAry_8.length; _i++) {
                        var type = ShenLingTypeAry_8[_i];
                        if (this.canUpStarByType(type)) {
                            return true;
                        }
                    }
                    return false;
                };
                //是否有激活的阵位
                ShenLingProxy.prototype.haveShangzhen = function () {
                    for (var _i = 0, ShenLingTypeAry_9 = game.ShenLingTypeAry; _i < ShenLingTypeAry_9.length; _i++) {
                        var type = ShenLingTypeAry_9[_i];
                        var info = this.getTypeInfo(type);
                        if (info && info.upindex) {
                            return true;
                        }
                    }
                    return false;
                };
                /**
                 * 点击主界面神灵按钮，进入界面优先选中的一级页签
                 * 可激活阵位，可升星，可升级或突破，有上阵的是0，否则是1
                 */
                ShenLingProxy.prototype.getSelTab = function () {
                    //存在激活和升级指引时，优先指引选中
                    var guideKeyList = [3 /* ShenlingAct */, 5 /* ShenlingOneUp */, 35 /* ShenlingOneUpAutoSel */];
                    if (this.haveActType() || mod.GuideMgr.getIns().hasGuideKey(guideKeyList)) {
                        return 0;
                    }
                    if (this.haveUpStarType()) {
                        return 1;
                    }
                    if (this.haveUpLvType()) {
                        return 0;
                    }
                    if (this.haveShangzhen()) {
                        return 0;
                    }
                    return 1;
                };
                //升星界面的类型选择，优先可升星类型，默认首个
                ShenLingProxy.prototype.getUpStarSelType = function (getNext) {
                    if (getNext === void 0) { getNext = false; }
                    for (var _i = 0, ShenLingTypeAry_10 = game.ShenLingTypeAry; _i < ShenLingTypeAry_10.length; _i++) {
                        var type = ShenLingTypeAry_10[_i];
                        if (this.canUpStarByType(type)) {
                            return type;
                        }
                    }
                    return getNext ? 0 : game.ShenLingTypeAry[0];
                };
                /**================================神灵进化================================*/
                //是否有进化功能
                ShenLingProxy.prototype.haveEvolve = function (index) {
                    var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, index);
                    return cfg && cfg.subtype == 1;
                };
                //已进化次数
                ShenLingProxy.prototype.getEvolvedCnt = function (index) {
                    var info = this.getInfoByIndex(index);
                    return info && info.evolutions || 0;
                };
                //神灵品质
                ShenLingProxy.prototype.getCurQuality = function (index) {
                    var cfg = this.getShenLingCfg(index);
                    if (!this.haveEvolve(index)) {
                        return cfg && cfg.quality || 0;
                    }
                    var evolvedCnt = this.getEvolvedCnt(index);
                    var qualityRange = this.getEvolveQualityRange(index);
                    var initQua = qualityRange[0] || 0;
                    return Math.max(initQua, initQua + evolvedCnt - 1);
                };
                //已进化后当前的品质
                ShenLingProxy.prototype.getCurEvolvedQuality = function (index) {
                    if (!this.haveEvolve(index) || !this.isActed(index)) {
                        return 0;
                    }
                    var qualityRange = this.getEvolveQualityRange(index);
                    var cnt = this.getEvolvedCnt(index);
                    return qualityRange[0] + cnt - 1;
                };
                //下一阶进化品质
                ShenLingProxy.prototype.getNextEvolvedQuality = function (index) {
                    if (!this.haveEvolve(index) || !this.isActed(index)) {
                        return 0;
                    }
                    var curQuality = this.getCurEvolvedQuality(index);
                    var qualityRange = this.getEvolveQualityRange(index);
                    if (curQuality >= qualityRange[1]) {
                        return qualityRange[1];
                    }
                    return curQuality + 1;
                };
                //进化的任务id列表
                ShenLingProxy.prototype.getEvolveTaskIds = function (index) {
                    var cfg = this.getShenLingCfg(index);
                    if (!this.isActed(index) || !cfg) {
                        return [];
                    }
                    var evolvedCnt = this.getEvolvedCnt(index);
                    var idx = Math.max(evolvedCnt - 1, 0);
                    var task_id = cfg.task_id;
                    return task_id && task_id[idx] ? task_id[idx] : [];
                };
                //某阶进化的任务是否全部完成
                ShenLingProxy.prototype.isEvolveTaskAllDone = function (index) {
                    var taskIds = this.getEvolveTaskIds(index);
                    var allDone = true;
                    for (var _i = 0, taskIds_1 = taskIds; _i < taskIds_1.length; _i++) {
                        var taskId = taskIds_1[_i];
                        var taskData = mod.TaskUtil.getTask(taskId);
                        if (!taskData || !mod.TaskUtil.hasRewardDraw(taskData)) {
                            allDone = false;
                            break;
                        }
                    }
                    return allDone;
                };
                //能否进阶
                ShenLingProxy.prototype.canEvolve = function (index) {
                    if (!this.haveEvolve(index) || this.isMaxEvolve(index)) {
                        return false;
                    }
                    //任务完成且未进化
                    if (this.isEvolveTaskAllDone(index)) {
                        return true;
                    }
                    return false;
                };
                //进化的阶数范围
                ShenLingProxy.prototype.getEvolveQualityRange = function (index) {
                    if (this._evolveMaxQuality[index]) {
                        return this._evolveMaxQuality[index];
                    }
                    var cfg = this.getShenLingCfg(index);
                    if (!cfg || !cfg.character || !this.haveEvolve(index)) {
                        return [0, 0];
                    }
                    this._evolveMaxQuality[index] = cfg.character;
                    return cfg.character;
                };
                //是否进化到最高阶了
                ShenLingProxy.prototype.isMaxEvolve = function (index) {
                    var qualityAry = this.getEvolveQualityRange(index);
                    if (!qualityAry) {
                        return false;
                    }
                    var cnt = this.getEvolvedCnt(index);
                    var needCnt = qualityAry[1] - qualityAry[0] + 1;
                    return cnt >= needCnt;
                };
                //进化红点
                ShenLingProxy.prototype.getEvolveHint = function (index) {
                    if (!this.haveEvolve(index) || this.isMaxEvolve(index) || !this.isActed(index)) {
                        return false;
                    }
                    var taskIds = this.getEvolveTaskIds(index);
                    for (var _i = 0, taskIds_2 = taskIds; _i < taskIds_2.length; _i++) {
                        var taskId = taskIds_2[_i];
                        var taskData = mod.TaskUtil.getTask(taskId);
                        if (!taskData) {
                            continue;
                        }
                        if (mod.TaskUtil.canRewardDraw(taskData)) {
                            return true;
                        }
                    }
                    if (this.canEvolve(index)) {
                        return true;
                    }
                    return false;
                };
                ShenLingProxy.prototype.onTaskUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(42 /* ShenlingEvolve */) > -1) {
                        this.updateHint();
                    }
                };
                /**神灵模型名称*/
                ShenLingProxy.prototype.getShenlingModelName = function (index) {
                    var cfg = this.getShenLingCfg(index);
                    if (!cfg) {
                        return '';
                    }
                    if (!this.haveEvolve(index)) {
                        return cfg.icon;
                    }
                    var evolvedCnt = this.getEvolvedCnt(index); //已进化次数
                    var idx = Math.max(0, evolvedCnt - 1); //模型名称索引
                    var icons = cfg.icons.split(',');
                    return icons[idx] || icons[0];
                };
                /**================================神灵进化end================================*/
                /**
                 * 通用升星碎片id，只用于非进化神灵的升星。
                 * （激活不可使用，进化神灵不可使用）
                 * @param index
                 */
                ShenLingProxy.prototype.getCommonCost = function (index) {
                    var info = this.getInfoByIndex(index);
                    if (!info || !info.star) {
                        return 0;
                    }
                    var cfg = this.getShenLingCfg(index);
                    if (!cfg || cfg.subtype == 1) {
                        return 0;
                    }
                    var paramCfg = game.GameConfig.getParamConfigById('shenling_star_prop');
                    var value = paramCfg.value;
                    return value[cfg.quality - 1];
                };
                //神灵页签的战力显示
                ShenLingProxy.prototype.getAllPowerByType = function (type) {
                    var power = 0;
                    var lingqiProxy = game.getProxy("45" /* Shenling */, 221 /* ShenlingLingqi */);
                    power += lingqiProxy.getPowerByType(type);
                    var lingpoProxy = game.getProxy("45" /* Shenling */, 222 /* ShenlingLingpo */);
                    power += lingpoProxy.getPowerByType(type);
                    var lingliProxy = game.getProxy("45" /* Shenling */, 223 /* ShenlingLingli */);
                    power += lingliProxy.getPowerByType(type);
                    power += this.getPowerByType(type);
                    return power;
                };
                return ShenLingProxy;
            }(game.ProxyBase));
            shenling.ShenLingProxy = ShenLingProxy;
            __reflect(ShenLingProxy.prototype, "game.mod.shenling.ShenLingProxy", ["game.mod.IShenLingProxy", "base.IProxy"]);
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingliModel = /** @class */ (function () {
                function ShenlingLingliModel() {
                    this.all_datas = {};
                    this.hintPath = ["45" /* Shenling */, "01" /* ShenLingMain */ + "05" /* Lingli */];
                }
                return ShenlingLingliModel;
            }());
            shenling.ShenlingLingliModel = ShenlingLingliModel;
            __reflect(ShenlingLingliModel.prototype, "game.mod.shenling.ShenlingLingliModel");
            //改造 god_brother_lingli_datas 结构体
            var GodBrotherLingliDatas = /** @class */ (function () {
                function GodBrotherLingliDatas() {
                    this.skill_data = {};
                }
                return GodBrotherLingliDatas;
            }());
            shenling.GodBrotherLingliDatas = GodBrotherLingliDatas;
            __reflect(GodBrotherLingliDatas.prototype, "game.mod.shenling.GodBrotherLingliDatas");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var c2s_god_brother_lingli_click = msg.c2s_god_brother_lingli_click;
            var c2s_god_brother_lingli_reset_point = msg.c2s_god_brother_lingli_reset_point;
            var s2c_god_brother_lingli_info = msg.s2c_god_brother_lingli_info;
            var facade = base.facade;
            /**
             * @description 神灵灵力系统
             */
            var ShenlingLingliProxy = /** @class */ (function (_super) {
                __extends(ShenlingLingliProxy, _super);
                function ShenlingLingliProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._maxLvMap = {};
                    return _this;
                }
                ShenlingLingliProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new shenling.ShenlingLingliModel();
                    this.onProto(s2c_god_brother_lingli_info, this.s2c_god_brother_lingli_info, this);
                    facade.onNt("on_shen_ling_update_type" /* ON_SHEN_LING_UPDATE_TYPE */, this.updateHint, this);
                };
                /**
                 * @param type 类型
                 * @param index 灵力索引  999为主动技能的索引
                 */
                ShenlingLingliProxy.prototype.c2s_god_brother_lingli_click = function (type, index) {
                    var msg = new c2s_god_brother_lingli_click();
                    msg.itype = type;
                    msg.index = index;
                    this.sendProto(msg);
                };
                ShenlingLingliProxy.prototype.c2s_god_brother_lingli_reset_point = function (type) {
                    var msg = new c2s_god_brother_lingli_reset_point();
                    msg.itype = type;
                    this.sendProto(msg);
                };
                ShenlingLingliProxy.prototype.s2c_god_brother_lingli_info = function (n) {
                    var msg = n.body;
                    if (msg.all_datas != null) {
                        for (var _i = 0, _a = msg.all_datas; _i < _a.length; _i++) {
                            var data = _a[_i];
                            this.dealTypeData(data);
                        }
                    }
                    this.updateHint();
                    this.sendNt("on_shen_ling_ling_li_update" /* ON_SHEN_LING_LING_LI_UPDATE */);
                };
                ShenlingLingliProxy.prototype.dealTypeData = function (typeData) {
                    if (!typeData) {
                        return;
                    }
                    var struct = this._model.all_datas[typeData.itype];
                    if (!struct) {
                        this._model.all_datas[typeData.itype] = struct = new shenling.GodBrotherLingliDatas();
                    }
                    if (typeData.list != null) {
                        for (var _i = 0, _a = typeData.list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            struct.skill_data[item.index] = item;
                        }
                    }
                    else {
                        struct.skill_data = {};
                    }
                };
                ShenlingLingliProxy.prototype.getTypeData = function (type) {
                    return this._model.all_datas[type];
                };
                /**
                 * @param type
                 * @param idx 索引
                 */
                ShenlingLingliProxy.prototype.getSkillData = function (type, idx) {
                    var data = this.getTypeData(type);
                    if (data && data.skill_data) {
                        return data.skill_data[idx];
                    }
                    return null;
                };
                ShenlingLingliProxy.prototype.getMainSkillData = function (type) {
                    return this.getSkillData(type, game.LingliMainSkillIdx);
                };
                ShenlingLingliProxy.prototype.isActed = function (type) {
                    var data = this.getMainSkillData(type);
                    return data && data.level > 0;
                };
                ShenlingLingliProxy.prototype.isSkillActed = function (type, idx) {
                    var data = this.getSkillData(type, idx);
                    return data && data.level > 0;
                };
                ShenlingLingliProxy.prototype.getMaxLevel = function (type) {
                    if (this._maxLvMap[type]) {
                        return this._maxLvMap[type];
                    }
                    var cfgObj = game.getConfigByNameId("shenling_lingli.json" /* ShenlingLingli */, type);
                    if (!cfgObj) {
                        return 0;
                    }
                    var keys = Object.keys(cfgObj) || [];
                    this._maxLvMap[type] = keys.length;
                    return keys.length;
                };
                ShenlingLingliProxy.prototype.isMaxLevel = function (type, idx) {
                    var data = this.getSkillData(type, idx);
                    if (!data || !data.level) {
                        return false;
                    }
                    var maxLv = this.getMaxLevel(type);
                    return data.level >= maxLv;
                };
                ShenlingLingliProxy.prototype.getConfig = function (type, lv) {
                    var cfgObj = game.getConfigByNameId("shenling_lingli.json" /* ShenlingLingli */, type);
                    if (cfgObj) {
                        return cfgObj[lv];
                    }
                    DEBUG && console.error("shenling_lingli \u4E0D\u5B58\u5728id:" + type + ", level:" + lv);
                    return null;
                };
                ShenlingLingliProxy.prototype.canActOrUp = function (type, idx, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isMaxLevel(type, idx)) {
                        return false;
                    }
                    var data = this.getSkillData(type, idx);
                    var lv = data && data.level || 0;
                    var nextCfg = this.getConfig(type, lv + 1);
                    if (!nextCfg) {
                        return false;
                    }
                    var isMain = idx == game.LingliMainSkillIdx;
                    var cost = isMain ? nextCfg.main_cost : nextCfg.buff_costs[idx - 1];
                    if (!cost || !cost.length) {
                        return false;
                    }
                    if (!isMain) {
                        var preCondAry = nextCfg.condition[idx - 1];
                        var preData = this.getSkillData(type, preCondAry[0]);
                        if (!preData || preData.level < preCondAry[1]) {
                            if (isTips) {
                                game.PromptBox.getIns().show(game.getLanById("lingqi_tips10" /* lingqi_tips10 */).replace('%s', ''));
                            }
                            return false;
                        }
                    }
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 2 /* Text */ : 0 /* None */);
                };
                ShenlingLingliProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    for (var _i = 0, LingliPointAry_1 = game.LingliPointAry; _i < LingliPointAry_1.length; _i++) {
                        var key = LingliPointAry_1[_i];
                        if (keys.indexOf(game.PropIndexToKey[key]) > -1) {
                            this.updateHint();
                        }
                    }
                };
                ShenlingLingliProxy.prototype.getHintByType = function (type) {
                    var cfg = this.getConfig(type, 1);
                    if (!cfg) {
                        return false;
                    }
                    if (this.canActOrUp(type, game.LingliMainSkillIdx)) {
                        return true;
                    }
                    var buff_skills = cfg.buff_skills || [];
                    for (var i = 0; i < buff_skills.length; i++) {
                        if (this.canActOrUp(type, i + 1)) {
                            return true;
                        }
                    }
                    return false;
                };
                ShenlingLingliProxy.prototype.updateHint = function () {
                    var proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var types = proxy.getActedTypeList();
                    var hint = false;
                    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                        var type = types_1[_i];
                        if (this.getHintByType(type)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.hintPath);
                };
                //系列战力
                ShenlingLingliProxy.prototype.getPowerByType = function (type) {
                    var info = this.getTypeData(type);
                    if (!info || !info.skill_data) {
                        return 0;
                    }
                    var power = 0;
                    var skillData = info.skill_data;
                    for (var idx in skillData) {
                        var info_3 = skillData[idx];
                        var cfg = this.getConfig(type, info_3.level);
                        if (!cfg) {
                            continue;
                        }
                        if (+idx == game.LingliMainSkillIdx) {
                            var skillId = cfg.main_skill;
                            var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                            if (skillCfg && skillCfg.powershow) {
                                power += skillCfg.powershow;
                            }
                        }
                        else {
                            var buffId = cfg.buff_skills[+idx - 1];
                            var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, buffId);
                            if (buffCfg && buffCfg.powershow) {
                                power += buffCfg.powershow;
                            }
                        }
                    }
                    return power;
                };
                return ShenlingLingliProxy;
            }(game.ProxyBase));
            shenling.ShenlingLingliProxy = ShenlingLingliProxy;
            __reflect(ShenlingLingliProxy.prototype, "game.mod.shenling.ShenlingLingliProxy");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingpoModel = /** @class */ (function () {
                function ShenlingLingpoModel() {
                    /** 各灵魄数据 */
                    this.all_datas = {};
                    this.hintPath = ["45" /* Shenling */, "01" /* ShenLingMain */ + "04" /* Lingpo */];
                }
                return ShenlingLingpoModel;
            }());
            shenling.ShenlingLingpoModel = ShenlingLingpoModel;
            __reflect(ShenlingLingpoModel.prototype, "game.mod.shenling.ShenlingLingpoModel");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var c2s_god_brother_lingpo_click = msg.c2s_god_brother_lingpo_click;
            var s2c_god_brother_lingpo_info = msg.s2c_god_brother_lingpo_info;
            var facade = base.facade;
            /**
             * @description 神灵灵魄系统
             */
            var ShenlingLingpoProxy = /** @class */ (function (_super) {
                __extends(ShenlingLingpoProxy, _super);
                function ShenlingLingpoProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._typeCfgMap = {};
                    _this._maxSuitLvMap = {};
                    return _this;
                }
                Object.defineProperty(ShenlingLingpoProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                ShenlingLingpoProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new shenling.ShenlingLingpoModel();
                    this.onProto(s2c_god_brother_lingpo_info, this.s2c_god_brother_lingpo_info, this);
                    facade.onNt("on_shen_ling_update_type" /* ON_SHEN_LING_UPDATE_TYPE */, this.updateHint, this);
                };
                /**
                 * @param button_type 1为指定激活/升星   2为一键激活/升星  3套装升级
                 * @param id 灵魄id（配置表索引）
                 * @param index 灵魄子索引（8个位置索引）
                 */
                ShenlingLingpoProxy.prototype.c2s_god_brother_lingpo_click = function (button_type, id, index) {
                    var msg = new c2s_god_brother_lingpo_click();
                    msg.button_type = button_type;
                    msg.id = id;
                    if (index) {
                        msg.index = index;
                    }
                    this.sendProto(msg);
                };
                ShenlingLingpoProxy.prototype.s2c_god_brother_lingpo_info = function (n) {
                    var msg = n.body;
                    if (msg.all_datas != null) {
                        for (var _i = 0, _a = msg.all_datas; _i < _a.length; _i++) {
                            var item = _a[_i];
                            this._model.all_datas[item.id] = item;
                        }
                    }
                    this.updateHint();
                    this.sendNt("on_shen_ling_ling_po_update" /* ON_SHEN_LING_LING_PO_UPDATE */);
                };
                ShenlingLingpoProxy.prototype.checkShow = function (id) {
                    var info = this.getInfo(id);
                    if (info && info.list && info.list.length) {
                        return true;
                    }
                    var cfgObj = this.getCfgObj(id);
                    if (!cfgObj || !cfgObj[id]) {
                        return false;
                    }
                    var cfg = cfgObj[id];
                    var cost = cfg.cost[0];
                    if (mod.BagUtil.checkPropCnt(cost[0], cost[1])) {
                        return true;
                    }
                    return false;
                };
                ShenlingLingpoProxy.prototype.canShowTypeCfg = function (cfg) {
                    if (!cfg || !cfg.show) {
                        return false;
                    }
                    if (cfg.show == 1 || (cfg.show == 2 && this.checkShow(cfg.id))) {
                        return true;
                    }
                    return false;
                };
                ShenlingLingpoProxy.prototype.getShowTypeCfgList = function (type) {
                    var showTypes = this.getShowShenlingTypes();
                    if (showTypes.indexOf(type) < 0) {
                        return [];
                    }
                    var cfgList = this.getTypeCfgList(type);
                    var list = [];
                    for (var _i = 0, cfgList_7 = cfgList; _i < cfgList_7.length; _i++) {
                        var cfg = cfgList_7[_i];
                        if (this.canShowTypeCfg(cfg)) {
                            list.push(cfg);
                        }
                    }
                    return list;
                };
                ShenlingLingpoProxy.prototype.getTypeCfgList = function (type) {
                    if (this._typeCfgMap[type]) {
                        return this._typeCfgMap[type];
                    }
                    this._typeCfgMap = {};
                    var list = game.getConfigListByName("shenling_lingpo_type.json" /* ShenlingLingpoType */);
                    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                        var cfg = list_2[_i];
                        if (!cfg) {
                            continue;
                        }
                        if (!this._typeCfgMap[cfg.itype]) {
                            this._typeCfgMap[cfg.itype] = [];
                        }
                        this._typeCfgMap[cfg.itype].push(cfg);
                    }
                    return this._typeCfgMap[type];
                };
                ShenlingLingpoProxy.prototype.getCfgObj = function (id) {
                    return game.getConfigByNameId("shenling_lingpo.json" /* ShenlingLingpo */, id);
                };
                ShenlingLingpoProxy.prototype.getConfig = function (id, lv) {
                    var cfgObj = this.getCfgObj(id);
                    if (cfgObj && cfgObj[lv]) {
                        return cfgObj[lv];
                    }
                    return null;
                };
                ShenlingLingpoProxy.prototype.getTypeCfg = function (id) {
                    return game.getConfigByNameId("shenling_lingpo_type.json" /* ShenlingLingpoType */, id);
                };
                ShenlingLingpoProxy.prototype.getInfo = function (id) {
                    return this._model.all_datas[id];
                };
                ShenlingLingpoProxy.prototype.getIconInfo = function (id, idx) {
                    var info = this.getInfo(id);
                    if (!info || !info.list) {
                        return null;
                    }
                    for (var _i = 0, _a = info.list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item && item.index == idx) {
                            return item;
                        }
                    }
                    return null;
                };
                //系列战力
                ShenlingLingpoProxy.prototype.getPowerByType = function (type) {
                    var cfgList = this.getShowTypeCfgList(type);
                    var power = 0;
                    for (var _i = 0, cfgList_8 = cfgList; _i < cfgList_8.length; _i++) {
                        var cfg = cfgList_8[_i];
                        var singlePower = this.getPower(cfg.id);
                        power += singlePower;
                    }
                    return power;
                };
                ShenlingLingpoProxy.prototype.getPower = function (id) {
                    var info = this.getInfo(id);
                    if (!info) {
                        return 0;
                    }
                    var power = 0;
                    if (info.suit_attrs && info.suit_attrs.showpower) {
                        power += info.suit_attrs.showpower.toNumber();
                    }
                    if (info.list && info.list.length) {
                        for (var _i = 0, _a = info.list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (item && item.base_attrs && item.base_attrs.showpower) {
                                power += item.base_attrs.showpower.toNumber();
                            }
                        }
                    }
                    return power;
                };
                ShenlingLingpoProxy.prototype.getMaxLevel = function (id) {
                    return this.getMaxSuitLevel(id);
                };
                ShenlingLingpoProxy.prototype.getCurLevel = function (id, idx) {
                    var info = this.getIconInfo(id, idx);
                    return info ? info.level : 0;
                };
                ShenlingLingpoProxy.prototype.isMaxLevel = function (id, idx) {
                    var maxLv = this.getMaxLevel(id);
                    var curLv = this.getCurLevel(id, idx);
                    return maxLv <= curLv;
                };
                ShenlingLingpoProxy.prototype.getMaxSuitLevel = function (id) {
                    if (this._maxSuitLvMap[id]) {
                        return this._maxSuitLvMap[id];
                    }
                    var cfgObj = this.getCfgObj(id);
                    if (!cfgObj) {
                        return 0;
                    }
                    this._maxSuitLvMap[id] = Object.keys(cfgObj).length;
                    return this._maxSuitLvMap[id];
                };
                ShenlingLingpoProxy.prototype.isSuitActed = function (id) {
                    var info = this.getInfo(id);
                    return info && info.suit_level > 0;
                };
                ShenlingLingpoProxy.prototype.isSuitLevelMax = function (id) {
                    var suitLv = this.getSuitLevel(id);
                    var maxLv = this.getMaxSuitLevel(id);
                    return suitLv >= maxLv;
                };
                ShenlingLingpoProxy.prototype.getSuitLevel = function (id) {
                    var info = this.getInfo(id);
                    return info && info.suit_level || 0;
                };
                ShenlingLingpoProxy.prototype.getSuitLevelProgressCnt = function (id, lv) {
                    if (this.isSuitLevelMax(id)) {
                        return game.LingPoMaxCnt;
                    }
                    var info = this.getInfo(id);
                    if (!info || !info.list) {
                        return 0;
                    }
                    if (lv == null) {
                        lv = this.getSuitLevel(id);
                    }
                    var cnt = 0;
                    for (var _i = 0, _a = info.list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item && item.level >= lv) {
                            cnt++;
                        }
                    }
                    return cnt;
                };
                /**
                 * @param id 灵魄id
                 * @param idx 第几个灵魄icon，从1开始
                 * @param isTips
                 */
                ShenlingLingpoProxy.prototype.canActOrUp = function (id, idx, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isMaxLevel(id, idx)) {
                        return false;
                    }
                    var curLv = this.getCurLevel(id, idx);
                    var nextCfg = this.getConfig(id, curLv + 1);
                    if (!nextCfg) {
                        return false;
                    }
                    var cost = nextCfg.cost[idx - 1];
                    if (!cost || !mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 2 /* Text */ : 0 /* None */)) {
                        return false;
                    }
                    return true;
                };
                ShenlingLingpoProxy.prototype.canOneKey = function (id) {
                    for (var i = 1; i <= game.LingPoMaxCnt; i++) {
                        if (this.canActOrUp(id, i)) {
                            return true;
                        }
                    }
                    return false;
                };
                ShenlingLingpoProxy.prototype.canActOrUpSuit = function (id, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isSuitLevelMax(id)) {
                        return false;
                    }
                    var nextLv = this.getSuitLevel(id) + 1;
                    var progressCnt = this.getSuitLevelProgressCnt(id, nextLv);
                    if (progressCnt < game.LingPoMaxCnt) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u6761\u4EF6\u4E0D\u8DB3");
                        }
                        return false;
                    }
                    return true;
                };
                ShenlingLingpoProxy.prototype.canOneKeySuit = function (id) {
                    return this.canActOrUpSuit(id);
                };
                ShenlingLingpoProxy.prototype.isActed = function (id) {
                    var info = this.getInfo(id);
                    return info && info.list && info.list.length >= game.LingPoMaxCnt || false;
                };
                ShenlingLingpoProxy.prototype.isActedAllIcon = function (id) {
                    var info = this.getInfo(id);
                    var actedLen = info && info.list && info.list.length || 0;
                    var cfg = this.getConfig(id, 1);
                    var allLen = cfg && cfg.cost && cfg.cost.length || game.LingPoMaxCnt;
                    return actedLen >= allLen;
                };
                ShenlingLingpoProxy.prototype.onBagUpdateByBagType = function (n) {
                    var bagTypes = n.body;
                    if (bagTypes.indexOf(4 /* ShenlingEquip */) > -1) {
                        this.updateHint();
                    }
                };
                ShenlingLingpoProxy.prototype.getIconHint = function (id, idx) {
                    return this.canActOrUp(id, idx);
                };
                ShenlingLingpoProxy.prototype.getHintById = function (id) {
                    if (this.canOneKeySuit(id)) {
                        return true;
                    }
                    for (var i = 1; i <= game.LingPoMaxCnt; i++) {
                        if (this.getIconHint(id, i)) {
                            return true;
                        }
                    }
                    return false;
                };
                ShenlingLingpoProxy.prototype.getHintByType = function (type) {
                    var list = this.getShowTypeCfgList(type);
                    if (!list || !list.length) {
                        return false;
                    }
                    for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                        var cfg = list_3[_i];
                        if (cfg && this.getHintById(cfg.id)) {
                            return true;
                        }
                    }
                    return false;
                };
                ShenlingLingpoProxy.prototype.canShowMdr = function () {
                    var ary = this.getShowShenlingTypes();
                    return ary && ary.length > 0;
                };
                ShenlingLingpoProxy.prototype.getShowShenlingTypes = function () {
                    var proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    return proxy.getActedTypeList();
                };
                ShenlingLingpoProxy.prototype.updateHint = function () {
                    if (!this.canShowMdr()) {
                        return;
                    }
                    var hint = false;
                    var types = this.getShowShenlingTypes();
                    for (var _i = 0, types_2 = types; _i < types_2.length; _i++) {
                        var type = types_2[_i];
                        if (this.getHintByType(type)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.hintPath);
                };
                return ShenlingLingpoProxy;
            }(game.ProxyBase));
            shenling.ShenlingLingpoProxy = ShenlingLingpoProxy;
            __reflect(ShenlingLingpoProxy.prototype, "game.mod.shenling.ShenlingLingpoProxy");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingEvolveItem = /** @class */ (function (_super) {
                __extends(ShenlingEvolveItem, _super);
                function ShenlingEvolveItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingEvolveItemSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                ShenlingEvolveItem.prototype.onAddToStage = function () {
                    if (!this._hub) {
                        this._hub = new game.UIEftHub(this);
                    }
                    this._proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                };
                ShenlingEvolveItem.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this._hub.removeEffect(this._eftId);
                };
                //type:1进化，2进化预览
                ShenlingEvolveItem.prototype.updateView = function (cfg, type, specialQua) {
                    if (type === void 0) { type = 1; }
                    if (!cfg) {
                        return;
                    }
                    this.img_type.source = type == 1 ? 'jinhua' : 'jinhuayulan';
                    //todo
                    var cnt = this._proxy.getEvolvedCnt(cfg.index);
                    this.avatarBaseItem.img_bg.source = game.ResUtil.getBigBg(0, specialQua);
                    this.avatarBaseItem.img_frame.source = game.ResUtil.getBigFrame(0, specialQua);
                    var icon = cfg.icons ? cfg.icons.split(',')[cnt] : cfg.icon;
                    this.avatarBaseItem.img_avatar.source = game.ResUtil.getBigIcon(icon);
                    this.avatarBaseItem.img_quality.source = '';
                    var eftSrc = game.SpecialQualityEftSrc[specialQua];
                    this._hub.removeEffect(this._eftId);
                    if (eftSrc) {
                        this._eftId = this._hub.add(eftSrc, 0, 0, null, 0, this.gr_eft, -1);
                    }
                };
                return ShenlingEvolveItem;
            }(eui.Component));
            shenling.ShenlingEvolveItem = ShenlingEvolveItem;
            __reflect(ShenlingEvolveItem.prototype, "game.mod.shenling.ShenlingEvolveItem");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingEvolvePreviewView = /** @class */ (function (_super) {
                __extends(ShenlingEvolvePreviewView, _super);
                function ShenlingEvolvePreviewView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingEvolvePreviewSkin";
                    return _this;
                }
                return ShenlingEvolvePreviewView;
            }(eui.Component));
            shenling.ShenlingEvolvePreviewView = ShenlingEvolvePreviewView;
            __reflect(ShenlingEvolvePreviewView.prototype, "game.mod.shenling.ShenlingEvolvePreviewView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingEvolveSkillItem = /** @class */ (function (_super) {
                __extends(ShenlingEvolveSkillItem, _super);
                function ShenlingEvolveSkillItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingEvolveSkillItemSkin";
                    return _this;
                }
                //更新技能
                ShenlingEvolveSkillItem.prototype.updateView = function (skillId, quality, isInit) {
                    var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                    if (!skillCfg) {
                        return;
                    }
                    this.lb_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(skillCfg.name + '', game.ColorUtil.getColorByQuality1(skillCfg.quality)));
                    this.img_icon.source = skillCfg.icon;
                    this.img_quality.source = "specialquality" + quality;
                    if (isInit) {
                        this.lb_desc.textFlow = game.TextUtil.parseHtml(skillCfg.describe);
                    }
                    else {
                        var skillLvCfg = game.getConfigByNameId("skill_level.json" /* SkillLv */, skillId + quality);
                        if (!skillLvCfg) {
                            DEBUG && console.error("skill_level.json" /* SkillLv */ + '没有: ' + skillId + quality);
                            return;
                        }
                        this.lb_desc.textFlow = game.TextUtil.parseHtml(skillLvCfg.describe);
                    }
                };
                return ShenlingEvolveSkillItem;
            }(eui.Component));
            shenling.ShenlingEvolveSkillItem = ShenlingEvolveSkillItem;
            __reflect(ShenlingEvolveSkillItem.prototype, "game.mod.shenling.ShenlingEvolveSkillItem");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingEvolveTaskItem = /** @class */ (function (_super) {
                __extends(ShenlingEvolveTaskItem, _super);
                function ShenlingEvolveTaskItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingEvolveTaskItemSkin";
                    return _this;
                }
                ShenlingEvolveTaskItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_do, this.onClick, this);
                };
                ShenlingEvolveTaskItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                ShenlingEvolveTaskItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var taskId = data.task_id;
                    var taskCfg = mod.TaskUtil.getCfg(taskId);
                    if (!taskCfg) {
                        return;
                    }
                    this._jump = taskCfg.jump;
                    this.lab_desc.text = taskCfg.desc;
                    this.icon.data = taskCfg.rewards[0];
                    var state = data.status || 0 /* NotFinish */;
                    if (state == 2 /* Draw */) {
                        this.btn_do.visible = false;
                        this.img_done.visible = true;
                        this.lab_schedule.text = '';
                    }
                    else {
                        this.btn_do.visible = true;
                        this.img_done.visible = false;
                        this.btn_do.label = state == 0 ? "\u524D \u5F80" : "\u9886 \u53D6";
                        if (state == 0 /* NotFinish */) {
                            this.btn_do.setBlue();
                        }
                        else {
                            this.btn_do.setYellow();
                        }
                        this.btn_do.setHint(state == 1);
                        this.lab_schedule.textFlow = game.TextUtil.parseHtml(mod.TaskUtil.getTaskSchedule(data));
                    }
                };
                ShenlingEvolveTaskItem.prototype.onClick = function () {
                    if (this.data && this.data.status == 1 /* Finish */) {
                        mod.TaskUtil.clickTask(this.data);
                        return;
                    }
                    if (this._jump) {
                        mod.ViewMgr.getIns().showViewByID(this._jump);
                    }
                };
                return ShenlingEvolveTaskItem;
            }(mod.BaseListenerRenderer));
            shenling.ShenlingEvolveTaskItem = ShenlingEvolveTaskItem;
            __reflect(ShenlingEvolveTaskItem.prototype, "game.mod.shenling.ShenlingEvolveTaskItem");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingEvolveTypeIcon = /** @class */ (function (_super) {
                __extends(ShenlingEvolveTypeIcon, _super);
                function ShenlingEvolveTypeIcon() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ShenlingEvolveTypeIcon.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.img_lock.visible = this.gr_lv.visible = this.lb_act.visible
                        = this.redPoint.visible = false;
                };
                ShenlingEvolveTypeIcon.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, data.index);
                    if (!cfg || !cfg.subtype) {
                        return;
                    }
                    var initQuality = cfg.character[0];
                    var idx = data.quality - initQuality;
                    var icons = cfg.icons.split(',');
                    this.img_icon.source = icons[idx];
                    this.img_shuxing.source = game.ResUtil.getSrQuality(0, data.quality);
                    this.img_shuxing.scaleX = this.img_shuxing.scaleY = 1;
                    this.img_di.source = "shenling_yuan_" + game.SpecialQuality[data.quality]; //todo
                };
                return ShenlingEvolveTypeIcon;
            }(mod.BaseListenerRenderer));
            shenling.ShenlingEvolveTypeIcon = ShenlingEvolveTypeIcon;
            __reflect(ShenlingEvolveTypeIcon.prototype, "game.mod.shenling.ShenlingEvolveTypeIcon");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingEvolveView = /** @class */ (function (_super) {
                __extends(ShenlingEvolveView, _super);
                function ShenlingEvolveView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingEvolveSkin";
                    return _this;
                }
                return ShenlingEvolveView;
            }(eui.Component));
            shenling.ShenlingEvolveView = ShenlingEvolveView;
            __reflect(ShenlingEvolveView.prototype, "game.mod.shenling.ShenlingEvolveView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingModelItem = /** @class */ (function (_super) {
                __extends(ShenLingModelItem, _super);
                function ShenLingModelItem() {
                    var _this = _super.call(this) || this;
                    _this._effId = 0;
                    _this.skinName = "skins.shenling.ShenLingModelItemSkin";
                    _this._hub = new game.UIEftHub(_this);
                    _this.touchEnabled = false;
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                ShenLingModelItem.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                };
                ShenLingModelItem.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                };
                /**神灵index*/
                ShenLingModelItem.prototype.updateModel = function (index) {
                    var haveEvolve = this._proxy.haveEvolve(index);
                    if (!haveEvolve) {
                        this.updateDefaultModel(index);
                    }
                    else {
                        var curQua = this._proxy.getCurEvolvedQuality(index);
                        if (curQua == 0) {
                            var qualityRange = this._proxy.getEvolveQualityRange(index);
                            curQua = qualityRange[0]; //初始品质
                        }
                        this.updateEvolveModel(index, curQua);
                    }
                };
                /**默认模型，没有进化功能*/
                ShenLingModelItem.prototype.updateDefaultModel = function (index) {
                    var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, index);
                    if (!cfg || (this._defaultIdx && this._defaultIdx == index)) {
                        return;
                    }
                    this._defaultIdx = index;
                    var name = cfg.name;
                    var showIdx = mod.RoleUtil.getNvpuShowIndex();
                    if (mod.RoleUtil.getNvpuShenlingId() == index && showIdx && cfg.names) {
                        //女仆的幻化神灵处理
                        name = cfg.names.split(',')[showIdx - 1];
                    }
                    this.nameItem.updateShow(name, cfg.quality);
                    this.removeEft();
                    var surfaceData = this.getSurfaceData(index);
                    this._effId = this._hub.add(surfaceData.url, 0, 0, null, 0, this.gr_eft, -1, surfaceData && surfaceData.scale || 1);
                };
                /**
                 * 神灵进化
                 * @param index 神灵id
                 * @param quality 要展示的品质
                 */
                ShenLingModelItem.prototype.updateEvolveModel = function (index, quality) {
                    var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, index);
                    if (!cfg) {
                        return;
                    }
                    var names = cfg.names.split(',');
                    var idx = this.getIdx(cfg, quality);
                    if (idx < 0) {
                        idx = 0;
                    }
                    this.nameItem.updateShow(names[idx], cfg.quality, quality);
                    this.removeEft();
                    var surfaceData = this.getSurfaceData(index, idx);
                    if (!surfaceData) {
                        return;
                    }
                    this._effId = this._hub.add(surfaceData.url, 0, 0, null, 0, this.gr_eft, -1, surfaceData && surfaceData.scale || 1);
                };
                //模型数据
                ShenLingModelItem.prototype.getSurfaceData = function (index, evolveIdx) {
                    var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, index);
                    var modelName = cfg.icon;
                    if (evolveIdx != undefined && cfg.subtype && cfg.subtype == 1) {
                        //进化神灵
                        var icons = cfg.icons.split(',');
                        modelName = icons[evolveIdx];
                    }
                    else if (mod.RoleUtil.getNvpuShenlingId() == index && mod.RoleUtil.getNvpuShowIndex()) {
                        //女仆的幻化神灵
                        var icons = cfg.icons.split(',');
                        modelName = icons[mod.RoleUtil.getNvpuShowIndex()];
                    }
                    var modelUrl = game.ResUtil.getModelUrlByModelName(400 /* Shenling */, modelName, 5 /* DOWN */, "std" /* STAND */, true, false);
                    var data = game.ResUtil.getSurfaceData(index, 5 /* DOWN */, "std" /* STAND */, true, false);
                    data.url = modelUrl;
                    return data;
                };
                //特殊品质转化为索引，从0开始
                ShenLingModelItem.prototype.getIdx = function (cfg, quality) {
                    var character = cfg.character;
                    var initQua = character[0];
                    return quality - initQua;
                };
                ShenLingModelItem.prototype.removeModel = function () {
                    this.removeEft();
                    this._defaultIdx = null;
                };
                ShenLingModelItem.prototype.removeEft = function () {
                    if (!this._effId) {
                        return;
                    }
                    this._hub.removeEffect(this._effId);
                    this._effId = null;
                };
                return ShenLingModelItem;
            }(eui.Component));
            shenling.ShenLingModelItem = ShenLingModelItem;
            __reflect(ShenLingModelItem.prototype, "game.mod.shenling.ShenLingModelItem");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingTypeIcon = /** @class */ (function (_super) {
                __extends(ShenLingTypeIcon, _super);
                function ShenLingTypeIcon() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenLingTypeIconSkin";
                    return _this;
                }
                ShenLingTypeIcon.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                };
                ShenLingTypeIcon.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.redPoint.visible = !!data.hint;
                    if (data.mdrType == 4 /* Lingpo */ || data.mdrType == 5 /* Lingli */) {
                        this.img_icon.source = "sl_type_" + data.type;
                        this.img_di.source = 'tubiaokuang';
                        this.switchVisible(false);
                        return;
                    }
                    this.switchVisible();
                    this.img_shuxing.source = "shuxingtubiao_" + data.type;
                    var info = this._proxy.getTypeInfo(data.type);
                    if (info && info.upindex) {
                        this.actView();
                        return;
                    }
                    var cfg = this._proxy.getFirstActByType(data.type);
                    if (cfg) {
                        this.canActView();
                    }
                    else {
                        this.notActView();
                    }
                };
                ShenLingTypeIcon.prototype.switchVisible = function (isShow) {
                    if (isShow === void 0) { isShow = true; }
                    this.img_shuxing.visible = this.gr_lv.visible
                        = this.img_lock.visible = this.lb_act.visible = isShow;
                };
                /**有第一个神灵可激活的情况*/
                ShenLingTypeIcon.prototype.canActView = function () {
                    this.gr_lv.visible = false;
                    this.img_lock.visible = this.lb_act.visible = true;
                    var cfg = this._proxy.getFirstActByType(this.data.type);
                    var icon = cfg.icon;
                    var quality = cfg.quality;
                    if (cfg.subtype && cfg.subtype == 1) {
                        icon = cfg.icons.split(',')[0];
                        quality = game.SpecialQuality[cfg.character[0]];
                    }
                    this.img_icon.source = icon;
                    this.img_di.source = "shenling_yuan_" + quality;
                };
                /**已激活的情况*/
                ShenLingTypeIcon.prototype.actView = function () {
                    this.gr_lv.visible = true;
                    this.img_lock.visible = this.lb_act.visible = false;
                    var data = this.data;
                    var info = this._proxy.getTypeInfo(data.type);
                    this.lb_num.text = info.level + '';
                    var cfg = this._proxy.getShenLingCfg(info.upindex);
                    var icon = cfg.icon;
                    var quality = cfg.quality;
                    if (cfg.subtype && cfg.subtype == 1) {
                        var singleInfo = this._proxy.getInfoByIndex(info.upindex);
                        var evolveCnt = singleInfo && singleInfo.evolutions || 0;
                        var icons = cfg.icons.split(',');
                        var cnt = Math.max(evolveCnt - 1, 0);
                        icon = icons[cnt];
                        var initQua = cfg.character[0];
                        quality = game.SpecialQuality[initQua + cnt];
                    }
                    this.img_icon.source = icon;
                    this.img_di.source = "shenling_yuan_" + quality;
                };
                /**未激活情况*/
                ShenLingTypeIcon.prototype.notActView = function () {
                    this.gr_lv.visible = false;
                    this.img_lock.visible = this.lb_act.visible = false;
                    this.img_icon.source = 'icon_jia';
                    this.img_di.source = "shenling_yuan_0";
                };
                return ShenLingTypeIcon;
            }(mod.BaseListenerRenderer));
            shenling.ShenLingTypeIcon = ShenLingTypeIcon;
            __reflect(ShenLingTypeIcon.prototype, "game.mod.shenling.ShenLingTypeIcon");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingTypeListView = /** @class */ (function (_super) {
                __extends(ShenLingTypeListView, _super);
                function ShenLingTypeListView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenLingTypeListSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                ShenLingTypeListView.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    this._lqProxy = game.getProxy("45" /* Shenling */, 221 /* ShenlingLingqi */);
                    this._lpProxy = game.getProxy("45" /* Shenling */, 222 /* ShenlingLingpo */);
                    this._llProxy = game.getProxy("45" /* Shenling */, 223 /* ShenlingLingli */);
                    this.list_menu.itemRenderer = shenling.ShenLingTypeIcon;
                    this.list_menu.dataProvider = this._listData = new eui.ArrayCollection();
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                };
                ShenLingTypeListView.prototype.onRemoveFromStage = function () {
                    this._listData.removeAll();
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                };
                /**更新类型按钮，灵魄灵力只展示激活的类型*/
                ShenLingTypeListView.prototype.updateListView = function (mdrType) {
                    var list = [];
                    var typeAry = game.ShenLingTypeAry;
                    if (mdrType == 4 /* Lingpo */ || mdrType == 5 /* Lingli */) {
                        typeAry = this._proxy.getActedTypeList();
                    }
                    for (var _i = 0, typeAry_1 = typeAry; _i < typeAry_1.length; _i++) {
                        var type = typeAry_1[_i];
                        list.push({
                            type: type,
                            mdrType: mdrType,
                            hint: this.getHint(mdrType, type)
                        });
                    }
                    this._typeAry = typeAry;
                    this._listData.replaceAll(list);
                };
                /**更新选中类型*/
                ShenLingTypeListView.prototype.updateSelType = function (type) {
                    if (!this.list_menu) {
                        return;
                    }
                    this.list_menu.selectedIndex = this._typeAry.indexOf(type);
                };
                ShenLingTypeListView.prototype.updateListHint = function (mdrType) {
                    var size = this._listData.source.length;
                    for (var i = 0; i < size; i++) {
                        var data = this._listData.source[i];
                        if (!data) {
                            continue;
                        }
                        data.hint = this.getHint(mdrType, data.type);
                        this._listData.itemUpdated(data);
                    }
                };
                ShenLingTypeListView.prototype.getHint = function (mdrType, type) {
                    if (mdrType == 1 /* Main */) {
                        return this._proxy.getMainHintByType(type);
                    }
                    else if (mdrType == 2 /* UpStar */) {
                        return this._proxy.getStarHintByType(type);
                    }
                    else if (mdrType == 3 /* Lingqi */) {
                        return this._lqProxy.getHintByType(type);
                    }
                    else if (mdrType == 4 /* Lingpo */) {
                        return this._lpProxy.getHintByType(type);
                    }
                    else if (mdrType == 5 /* Lingli */) {
                        return this._llProxy.getHintByType(type);
                    }
                    return false;
                };
                return ShenLingTypeListView;
            }(eui.Component));
            shenling.ShenLingTypeListView = ShenLingTypeListView;
            __reflect(ShenLingTypeListView.prototype, "game.mod.shenling.ShenLingTypeListView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingliLine = /** @class */ (function (_super) {
                __extends(ShenlingLingliLine, _super);
                function ShenlingLingliLine() {
                    var _this = _super.call(this) || this;
                    _this._maxVal = 1;
                    _this.skinName = "skins.shenling.ShenlingLingliLineSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                ShenlingLingliLine.prototype.onAddToStage = function () {
                    this.img_light.height = 0;
                };
                ShenlingLingliLine.prototype.setMax = function (max) {
                    if (max === void 0) { max = 1; }
                    this._maxVal = max;
                };
                ShenlingLingliLine.prototype.updateLine = function (val) {
                    var height = this.height;
                    this.img_light.height = height * (val / this._maxVal || 0);
                };
                return ShenlingLingliLine;
            }(eui.Component));
            shenling.ShenlingLingliLine = ShenlingLingliLine;
            __reflect(ShenlingLingliLine.prototype, "game.mod.shenling.ShenlingLingliLine");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingliSkillDescComp = /** @class */ (function (_super) {
                __extends(ShenlingLingliSkillDescComp, _super);
                function ShenlingLingliSkillDescComp() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingLingliSkillDescCompSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                ShenlingLingliSkillDescComp.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("45" /* Shenling */, 223 /* ShenlingLingli */);
                };
                /**
                 * @param type
                 * @param idx 序号
                 */
                ShenlingLingliSkillDescComp.prototype.updateView = function (type, idx) {
                    var data = this._proxy.getSkillData(type, idx);
                    var lv = data ? data.level : 1;
                    var lingliCfg = this._proxy.getConfig(type, lv);
                    if (!lingliCfg) {
                        return;
                    }
                    var isMain = idx == game.LingliMainSkillIdx;
                    var index = isMain ? lingliCfg.main_skill : lingliCfg.buff_skills[idx - 1];
                    var cfg;
                    if (isMain) {
                        cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, index);
                    }
                    else {
                        cfg = game.getConfigByNameId("buff.json" /* Buff */, index);
                    }
                    if (!cfg) {
                        DEBUG && console.error("\u6280\u80FD\u8868\u6216buff\u8868\uFF0C\u6CA1\u6709 " + index);
                        return;
                    }
                    this.img_icon.source = cfg.icon;
                    var quality = isMain ? cfg.quality : cfg.buff_quality;
                    this.lb_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(cfg.name, game.ColorUtil.getColorByQuality1(quality)));
                    var isActed = data && data.level > 0;
                    var desc = isMain ? cfg.describe : cfg.des;
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(desc, isActed ? 3496307 /* DEFAULT */ : 8618626 /* GRAY */));
                    this.img_icongray.visible = !isActed;
                    this.gr_lv.visible = isActed;
                    this.lb_lv.text = "LV." + (data && data.level || 0);
                    this.img_tag.source = isMain ? 'zhudonglingli' : 'beidonglingli';
                };
                return ShenlingLingliSkillDescComp;
            }(eui.Component));
            shenling.ShenlingLingliSkillDescComp = ShenlingLingliSkillDescComp;
            __reflect(ShenlingLingliSkillDescComp.prototype, "game.mod.shenling.ShenlingLingliSkillDescComp");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingliSkillIcon = /** @class */ (function (_super) {
                __extends(ShenlingLingliSkillIcon, _super);
                function ShenlingLingliSkillIcon() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingLingliSkillIconSkin";
                    return _this;
                }
                ShenlingLingliSkillIcon.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.img_main.visible = false;
                    this.img_sel.visible = false;
                };
                ShenlingLingliSkillIcon.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                ShenlingLingliSkillIcon.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.img_gray.visible = data.isMain && !data.lv;
                    this.img_gray1.visible = !data.isMain && !data.lv;
                    this.redPoint.visible = !!data.hint;
                    var txt;
                    if (data.isMaxLv) {
                        txt = game.TextUtil.addColor(game.getLanById("manji" /* manji */), 16719376 /* RED */);
                    }
                    else if (data.lv) {
                        txt = "LV." + data.lv;
                    }
                    else {
                        txt = game.getLanById("not_active" /* not_active */);
                    }
                    this.lb_lv.textFlow = game.TextUtil.parseHtml(txt);
                    var cfg; //BattleSkillConfig, BuffConfig
                    if (data.isMain) {
                        cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, data.index);
                    }
                    else {
                        cfg = game.getConfigByNameId("buff.json" /* Buff */, data.index);
                    }
                    if (!cfg) {
                        DEBUG && console.error("battle_skill.json \u6216 buff.json \u6CA1\u6709 " + data.index);
                    }
                    this.img_icon.source = cfg ? cfg.icon : '';
                    this.img_tag.source = cfg && cfg.logo ? cfg.logo : '';
                    this.img_main.visible = data.isMain;
                };
                ShenlingLingliSkillIcon.prototype.setSel = function (isSel) {
                    if (isSel === void 0) { isSel = false; }
                    this.img_sel.visible = isSel;
                };
                ShenlingLingliSkillIcon.prototype.isSeled = function () {
                    return this.img_sel.visible;
                };
                return ShenlingLingliSkillIcon;
            }(mod.BaseListenerRenderer));
            shenling.ShenlingLingliSkillIcon = ShenlingLingliSkillIcon;
            __reflect(ShenlingLingliSkillIcon.prototype, "game.mod.shenling.ShenlingLingliSkillIcon");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var facade = base.facade;
            var ShenlingLingliSkillListComp = /** @class */ (function (_super) {
                __extends(ShenlingLingliSkillListComp, _super);
                function ShenlingLingliSkillListComp() {
                    var _this = _super.call(this) || this;
                    _this._leftAry = [1, 3, 5, 8, 11, 14, 17, 20, 23, 26, 27];
                    _this._middleAry = [null, 6, 9, 12, 15, 18, 21, 24];
                    _this._rightAry = [2, 4, 7, 10, 13, 16, 19, 22, 25];
                    _this.skinName = "skins.shenling.ShenlingLingliSkillListCompSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                ShenlingLingliSkillListComp.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("45" /* Shenling */, 223 /* ShenlingLingli */);
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    var i = 0;
                    while (this["icon" + i]) {
                        this["icon" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
                        i++;
                    }
                    facade.onNt("on_ling_li_main_icon_select" /* ON_LING_LI_MAIN_ICON_SELECT */, this.onUpdateSel, this);
                    this.line_left.setMax(this._leftAry.length - 1);
                    this.line_middle0.setMax(1);
                    this.line_middle1.setMax(this._middleAry.length - 1);
                    this.line_right.setMax(this._rightAry.length - 1);
                };
                ShenlingLingliSkillListComp.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    var i = 0;
                    while (this["icon" + i]) {
                        this["icon" + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickIcon, this);
                        i++;
                    }
                    facade.offNt("on_ling_li_main_icon_select" /* ON_LING_LI_MAIN_ICON_SELECT */, this.onUpdateSel, this);
                    this._selIcon = null;
                    this.resetLineView();
                };
                ShenlingLingliSkillListComp.prototype.resetLineView = function () {
                    this.line_left.updateLine(0);
                    this.line_middle0.updateLine(0);
                    this.line_middle1.updateLine(0);
                    this.line_right.updateLine(0);
                };
                ShenlingLingliSkillListComp.prototype.updateView = function (type) {
                    this.resetLineView();
                    var cfg = this._proxy.getConfig(type, 1);
                    if (!cfg) {
                        return;
                    }
                    var buffAry = cfg.buff_skills || [];
                    for (var i = 0; i < buffAry.length; i++) {
                        var skillData = this._proxy.getSkillData(type, i + 1);
                        var data = {
                            type: type,
                            index: buffAry[i],
                            idx: i + 1,
                            lv: skillData && skillData.level || 0,
                            isMaxLv: this._proxy.isMaxLevel(type, i + 1),
                            hint: this._proxy.canActOrUp(type, i + 1)
                        };
                        this.setIconData(i, data);
                    }
                };
                ShenlingLingliSkillListComp.prototype.setIconData = function (i, data) {
                    var icon = this["icon" + i];
                    if (icon) {
                        icon.data = data;
                        this.updateLineView(data);
                    }
                };
                ShenlingLingliSkillListComp.prototype.updateLineView = function (data) {
                    if (!data || !data.lv) {
                        return;
                    }
                    var idx = data.idx;
                    if (this._leftAry.indexOf(idx) > -1) {
                        var val = this._leftAry.indexOf(idx);
                        this.line_left.updateLine(val);
                    }
                    else if (this._middleAry.indexOf(idx) > -1) {
                        var val = this._middleAry.indexOf(idx);
                        this.line_middle1.updateLine(val);
                        this.line_middle0.updateLine(1);
                    }
                    else if (this._rightAry.indexOf(idx) > -1) {
                        var val = this._rightAry.indexOf(idx);
                        this.line_right.updateLine(val);
                    }
                };
                ShenlingLingliSkillListComp.prototype.onClickIcon = function (e) {
                    var icon = e.currentTarget;
                    if (!icon || icon.isSeled()) {
                        return;
                    }
                    icon.setSel(true);
                    if (this._selIcon) {
                        this._selIcon.setSel(false);
                    }
                    this._selIcon = icon;
                    if (icon.data) {
                        facade.sendNt("on_ling_li_icon_select" /* ON_LING_LI_ICON_SELECT */, [icon.data.type, icon.data.idx]);
                    }
                };
                ShenlingLingliSkillListComp.prototype.onUpdateSel = function () {
                    if (this._selIcon) {
                        this._selIcon.setSel(false);
                    }
                    this._selIcon = null;
                };
                return ShenlingLingliSkillListComp;
            }(eui.Component));
            shenling.ShenlingLingliSkillListComp = ShenlingLingliSkillListComp;
            __reflect(ShenlingLingliSkillListComp.prototype, "game.mod.shenling.ShenlingLingliSkillListComp");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingliView = /** @class */ (function (_super) {
                __extends(ShenlingLingliView, _super);
                function ShenlingLingliView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingLingliSkin";
                    return _this;
                }
                return ShenlingLingliView;
            }(eui.Component));
            shenling.ShenlingLingliView = ShenlingLingliView;
            __reflect(ShenlingLingliView.prototype, "game.mod.shenling.ShenlingLingliView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingpoAttrItem = /** @class */ (function (_super) {
                __extends(ShenlingLingpoAttrItem, _super);
                function ShenlingLingpoAttrItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingLingpoAttrItemSkin";
                    return _this;
                }
                ShenlingLingpoAttrItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("45" /* Shenling */, 222 /* ShenlingLingpo */);
                };
                //当前
                ShenlingLingpoAttrItem.prototype.updateInfo = function (id, attr) {
                    var isActed = this._proxy.isSuitActed(id);
                    var suitLv = this._proxy.getSuitLevel(id);
                    var lv = isActed ? suitLv : 1;
                    var title = isActed ? "general9" /* general9 */ : "bagua_txt3" /* bagua_txt3 */;
                    var desc = game.StringUtil.substitute(game.getLanById("lingpo_tips2" /* lingpo_tips2 */), [lv])
                        + (isActed ? "(" + game.getLanById("actived" /* actived */) + ")" : "(" + this._proxy.getSuitLevelProgressCnt(id, lv) + "/" + game.LingPoMaxCnt + ")");
                    desc = game.TextUtil.addColor(desc, isActed ? 8585074 /* GREEN */ : 16731212 /* RED */);
                    this.updateView(game.getLanById(title), desc, attr, isActed ? 8585074 /* GREEN */ : 7835024 /* GRAY */, isActed ? 4435385 /* DEFAULT */ : 7835024 /* GRAY */);
                };
                //下阶
                ShenlingLingpoAttrItem.prototype.updateNextInfo = function (id, attr) {
                    var title = game.getLanById("lingpo_tips3" /* lingpo_tips3 */);
                    var lv = this._proxy.getSuitLevel(id);
                    var progressCnt = this._proxy.getSuitLevelProgressCnt(id, lv + 1);
                    var str = game.StringUtil.substitute(game.getLanById("lingpo_tips2" /* lingpo_tips2 */), [lv + 1]);
                    var desc = game.TextUtil.addColor(str + ("(" + progressCnt + "/" + game.LingPoMaxCnt + ")"), progressCnt >= game.LingPoMaxCnt ? 8585074 /* GREEN */ : 16731212 /* RED */);
                    this.updateView(title, desc, attr, 7835024 /* GRAY */, 7835024 /* GRAY */);
                };
                ShenlingLingpoAttrItem.prototype.updateView = function (title, desc, attr, color, defaultColor) {
                    if (color === void 0) { color = 2330156 /* GREEN */; }
                    this.baseNameItem.setTitle(title);
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(desc);
                    this.attrList.updateAttrAdd(attr, color, '\n', ' +', defaultColor, 'zhuangshi1');
                };
                return ShenlingLingpoAttrItem;
            }(mod.BaseRenderer));
            shenling.ShenlingLingpoAttrItem = ShenlingLingpoAttrItem;
            __reflect(ShenlingLingpoAttrItem.prototype, "game.mod.shenling.ShenlingLingpoAttrItem");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingpoIcon = /** @class */ (function (_super) {
                __extends(ShenlingLingpoIcon, _super);
                function ShenlingLingpoIcon() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingLingpoIconSkin";
                    return _this;
                }
                ShenlingLingpoIcon.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
                };
                ShenlingLingpoIcon.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                ShenlingLingpoIcon.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.img_gray.visible = !data.level;
                    this.lb_num.text = data.level + '';
                    this.gr_lv.visible = data.level > 0;
                    this.redPoint.visible = !!data.hint;
                    var cfg = game.GameConfig.getPropConfigById(data.index);
                    this.img_icon.source = cfg ? cfg.icon : '';
                };
                ShenlingLingpoIcon.prototype.onClick = function () {
                    mod.ViewMgr.getIns().showSecondPop("45" /* Shenling */, "08" /* ShenlingLingpoTips */, this.data);
                };
                return ShenlingLingpoIcon;
            }(mod.BaseListenerRenderer));
            shenling.ShenlingLingpoIcon = ShenlingLingpoIcon;
            __reflect(ShenlingLingpoIcon.prototype, "game.mod.shenling.ShenlingLingpoIcon");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingpoIconListComp = /** @class */ (function (_super) {
                __extends(ShenlingLingpoIconListComp, _super);
                function ShenlingLingpoIconListComp() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingLingpoIconListSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                ShenlingLingpoIconListComp.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("45" /* Shenling */, 222 /* ShenlingLingpo */);
                };
                /**
                 * @param type 神灵类型
                 * @param id 灵魄id
                 */
                ShenlingLingpoIconListComp.prototype.updateView = function (type, id) {
                    var cfg = this._proxy.getConfig(id, 1);
                    if (!cfg) {
                        return;
                    }
                    for (var i = 0; i < cfg.cost.length; i++) {
                        this.updateIcon(id, i + 1, cfg.cost[i][0]);
                    }
                };
                ShenlingLingpoIconListComp.prototype.updateIcon = function (id, idx, index) {
                    var info = this._proxy.getIconInfo(id, idx);
                    var level = info ? info.level : 0;
                    var data = {
                        id: id,
                        level: level,
                        hint: this._proxy.getIconHint(id, idx),
                        index: index,
                        idx: idx
                    };
                    this["icon" + (idx - 1)].data = data;
                };
                return ShenlingLingpoIconListComp;
            }(eui.Component));
            shenling.ShenlingLingpoIconListComp = ShenlingLingpoIconListComp;
            __reflect(ShenlingLingpoIconListComp.prototype, "game.mod.shenling.ShenlingLingpoIconListComp");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingpoIconTipsBagView = /** @class */ (function (_super) {
                __extends(ShenlingLingpoIconTipsBagView, _super);
                function ShenlingLingpoIconTipsBagView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingLingpoIconTipsBagSkin";
                    return _this;
                }
                return ShenlingLingpoIconTipsBagView;
            }(eui.Component));
            shenling.ShenlingLingpoIconTipsBagView = ShenlingLingpoIconTipsBagView;
            __reflect(ShenlingLingpoIconTipsBagView.prototype, "game.mod.shenling.ShenlingLingpoIconTipsBagView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingpoIconTipsView = /** @class */ (function (_super) {
                __extends(ShenlingLingpoIconTipsView, _super);
                function ShenlingLingpoIconTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingLingpoIconTipsSkin";
                    return _this;
                }
                return ShenlingLingpoIconTipsView;
            }(eui.Component));
            shenling.ShenlingLingpoIconTipsView = ShenlingLingpoIconTipsView;
            __reflect(ShenlingLingpoIconTipsView.prototype, "game.mod.shenling.ShenlingLingpoIconTipsView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingpoItem = /** @class */ (function (_super) {
                __extends(ShenlingLingpoItem, _super);
                function ShenlingLingpoItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingLingpoItemSkin";
                    return _this;
                }
                ShenlingLingpoItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                };
                ShenlingLingpoItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                ShenlingLingpoItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.avatarBaseItem.updateShow(data.cfg);
                    this.redPoint.visible = !!data.hint;
                    this.img_gray.visible = !data.isActed;
                    this.gr_lv.visible = data.progress >= game.LingPoMaxCnt;
                    this.lb_num.text = data.lv + '';
                    this.lb_progress.visible = !this.gr_lv.visible;
                    this.lb_progress.text = "(" + data.progress + "/" + game.LingPoMaxCnt + ")";
                    this.removeEft();
                    if (data.isSel) {
                        this.addEftByParent("surface_sel" /* SurfaceSel */, this.gr_eft);
                    }
                };
                return ShenlingLingpoItem;
            }(mod.BaseRenderer));
            shenling.ShenlingLingpoItem = ShenlingLingpoItem;
            __reflect(ShenlingLingpoItem.prototype, "game.mod.shenling.ShenlingLingpoItem");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingpoSuitBtn = /** @class */ (function (_super) {
                __extends(ShenlingLingpoSuitBtn, _super);
                function ShenlingLingpoSuitBtn() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingLingpoSuitBtnSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                ShenlingLingpoSuitBtn.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("45" /* Shenling */, 222 /* ShenlingLingpo */);
                    this._shape = new egret.Shape();
                    this._shape.x = this.width * 0.5;
                    this._shape.y = this.height * 0.5;
                    this.addChild(this._shape);
                    this.img_mask.mask = this._shape;
                    // facade.onNt('update_lingpo_cnt', this.onChange, this);
                };
                /**
                 * @param type 神灵类型
                 * @param id 灵魄id
                 */
                ShenlingLingpoSuitBtn.prototype.updateView = function (type, id) {
                    this.lb_num.text = this._proxy.getSuitLevel(id) + '';
                    var cfg = this._proxy.getTypeCfg(id);
                    this.img_icon.source = cfg && cfg.icon ? "yuan_big_" + cfg.icon : '';
                    var nextLv = this._proxy.getSuitLevel(id) + 1;
                    var cnt = this._proxy.getSuitLevelProgressCnt(id, nextLv);
                    this.changeGraphics(cnt);
                };
                // private onChange(n: GameNT): void {
                //     let cnt = n.body as number;
                //     this.changeGraphics(cnt);
                // }
                ShenlingLingpoSuitBtn.prototype.changeGraphics = function (cnt) {
                    var angle = cnt / game.LingPoMaxCnt * 360;
                    var radius = this.height * 0.5;
                    var shape = this._shape;
                    shape.graphics.clear();
                    shape.graphics.beginFill(0xffffff, 1);
                    shape.graphics.moveTo(0, 0);
                    shape.graphics.lineTo(0, this.height * 0.5);
                    shape.graphics.drawArc(0, 0, radius, 90 * Math.PI / 180, (angle + 90) * Math.PI / 180, false);
                    shape.graphics.lineTo(0, 0);
                    shape.graphics.endFill();
                };
                return ShenlingLingpoSuitBtn;
            }(eui.Component));
            shenling.ShenlingLingpoSuitBtn = ShenlingLingpoSuitBtn;
            __reflect(ShenlingLingpoSuitBtn.prototype, "game.mod.shenling.ShenlingLingpoSuitBtn");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingpoView = /** @class */ (function (_super) {
                __extends(ShenlingLingpoView, _super);
                function ShenlingLingpoView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenlingLingpoSkin";
                    return _this;
                }
                return ShenlingLingpoView;
            }(eui.Component));
            shenling.ShenlingLingpoView = ShenlingLingpoView;
            __reflect(ShenlingLingpoView.prototype, "game.mod.shenling.ShenlingLingpoView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingLingQiModel = /** @class */ (function () {
                function ShenLingLingQiModel() {
                    /** 各神灵灵器数据 */
                    this.all_datas = {};
                    this.hintPath = ["45" /* Shenling */, "01" /* ShenLingMain */ + "03" /* Lingqi */];
                }
                return ShenLingLingQiModel;
            }());
            shenling.ShenLingLingQiModel = ShenLingLingQiModel;
            __reflect(ShenLingLingQiModel.prototype, "game.mod.shenling.ShenLingLingQiModel");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingLingQiSuitComp = /** @class */ (function (_super) {
                __extends(ShenLingLingQiSuitComp, _super);
                function ShenLingLingQiSuitComp() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenLingLingQiSuitCompSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                ShenLingLingQiSuitComp.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("45" /* Shenling */, 221 /* ShenlingLingqi */);
                };
                /**神灵index*/
                ShenLingLingQiSuitComp.prototype.updateView = function (index) {
                    if (this._index == index) {
                        return;
                    }
                    this._index = index;
                    var cfg = game.getConfigByNameId("buff.json" /* Buff */, this._proxy.getBuffId(index));
                    if (!cfg) {
                        this.lb_desc.text = this.lb_name.text = '';
                        this.img_icon.source = '';
                        return;
                    }
                    this.img_icon.source = cfg.icon;
                    this.lb_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(cfg.name, game.ColorUtil.getColorByQuality1(cfg.buff_quality)));
                    var isAct = this._proxy.isActedSuit(index);
                    this.img_icongray.visible = !isAct;
                    var color = isAct ? 3496307 /* DEFAULT */ : 8618626 /* GRAY */;
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(cfg.des, color));
                };
                return ShenLingLingQiSuitComp;
            }(eui.Component));
            shenling.ShenLingLingQiSuitComp = ShenLingLingQiSuitComp;
            __reflect(ShenLingLingQiSuitComp.prototype, "game.mod.shenling.ShenLingLingQiSuitComp");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingLingQiTipsView = /** @class */ (function (_super) {
                __extends(ShenLingLingQiTipsView, _super);
                function ShenLingLingQiTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenLingLingQiTipsSkin";
                    return _this;
                }
                return ShenLingLingQiTipsView;
            }(eui.Component));
            shenling.ShenLingLingQiTipsView = ShenLingLingQiTipsView;
            __reflect(ShenLingLingQiTipsView.prototype, "game.mod.shenling.ShenLingLingQiTipsView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingLingQiView = /** @class */ (function (_super) {
                __extends(ShenLingLingQiView, _super);
                function ShenLingLingQiView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenLingLingQiSkin";
                    return _this;
                }
                return ShenLingLingQiView;
            }(eui.Component));
            shenling.ShenLingLingQiView = ShenLingLingQiView;
            __reflect(ShenLingLingQiView.prototype, "game.mod.shenling.ShenLingLingQiView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingqiBagTipsView = /** @class */ (function (_super) {
                __extends(ShenlingLingqiBagTipsView, _super);
                function ShenlingLingqiBagTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenLingLingQiBagTipsSkin";
                    return _this;
                }
                return ShenlingLingqiBagTipsView;
            }(eui.Component));
            shenling.ShenlingLingqiBagTipsView = ShenlingLingqiBagTipsView;
            __reflect(ShenlingLingqiBagTipsView.prototype, "game.mod.shenling.ShenlingLingqiBagTipsView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingShangZhenView = /** @class */ (function (_super) {
                __extends(ShenLingShangZhenView, _super);
                function ShenLingShangZhenView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenLingShangZhenSkin";
                    return _this;
                }
                return ShenLingShangZhenView;
            }(eui.Component));
            shenling.ShenLingShangZhenView = ShenLingShangZhenView;
            __reflect(ShenLingShangZhenView.prototype, "game.mod.shenling.ShenLingShangZhenView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingSkillTipsView = /** @class */ (function (_super) {
                __extends(ShenLingSkillTipsView, _super);
                function ShenLingSkillTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenLingSkillTipsSkin";
                    return _this;
                }
                return ShenLingSkillTipsView;
            }(eui.Component));
            shenling.ShenLingSkillTipsView = ShenLingSkillTipsView;
            __reflect(ShenLingSkillTipsView.prototype, "game.mod.shenling.ShenLingSkillTipsView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingView = /** @class */ (function (_super) {
                __extends(ShenLingView, _super);
                function ShenLingView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenLingSkin";
                    _this.touchEnabled = false;
                    return _this;
                }
                return ShenLingView;
            }(eui.Component));
            shenling.ShenLingView = ShenLingView;
            __reflect(ShenLingView.prototype, "game.mod.shenling.ShenLingView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingAwakenView = /** @class */ (function (_super) {
                __extends(ShenLingAwakenView, _super);
                function ShenLingAwakenView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenLingAwakenSkin";
                    return _this;
                }
                return ShenLingAwakenView;
            }(eui.Component));
            shenling.ShenLingAwakenView = ShenLingAwakenView;
            __reflect(ShenLingAwakenView.prototype, "game.mod.shenling.ShenLingAwakenView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var facade = base.facade;
            var ShenLingShenJiItem = /** @class */ (function (_super) {
                __extends(ShenLingShenJiItem, _super);
                function ShenLingShenJiItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ShenLingShenJiItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
                    this._proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_get, this.onClick, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.skillIcon, this.onClickSkill, this);
                };
                ShenLingShenJiItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this._listData.removeAll();
                };
                ShenLingShenJiItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var cfg = this._proxy.getShenLingCfg(data.index);
                    var str = game.TextUtil.addColor("(" + data.curStar + "/" + data.cfg.shenling_star + ")", data.curStar >= data.cfg.shenling_star ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    var txt = cfg.name + "\u8FDB\u9636\u81F3" + data.cfg.shenling_star + "\u53EF\u83B7\u5F97" + str;
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(txt);
                    var isGotten = data.status == 2;
                    this.img_statue.visible = isGotten;
                    this.btn_get.visible = !isGotten;
                    this.btn_get.visible && this.btn_get.setHint(data.status == 1);
                    this._listData.replaceAll(data.cfg.star_award);
                    if (!data.talent_index) {
                        this.skillIcon.visible = false;
                        return;
                    }
                    this.skillIcon.visible = true;
                    this.skillIcon.data = {
                        skill_index: data.talent_index,
                        is_act: true,
                        skill_type: 4 /* Talent */
                    };
                };
                ShenLingShenJiItem.prototype.onClick = function () {
                    var cfg = this.data.cfg;
                    if (!cfg || this.data.status != 1) {
                        return;
                    }
                    this._proxy.c2s_god_brother_levelrewards(cfg.shenling_index, cfg.shenling_star);
                };
                ShenLingShenJiItem.prototype.onClickSkill = function () {
                    facade.showView("45" /* Shenling */, "05" /* ShenLingSkill */, {
                        index: this.data.index,
                        skill_index: this.data.talent_index,
                        skill_type: 4 /* Talent */
                    });
                };
                return ShenLingShenJiItem;
            }(mod.BaseListenerRenderer));
            shenling.ShenLingShenJiItem = ShenLingShenJiItem;
            __reflect(ShenLingShenJiItem.prototype, "game.mod.shenling.ShenLingShenJiItem");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingShenJiView = /** @class */ (function (_super) {
                __extends(ShenLingShenJiView, _super);
                function ShenLingShenJiView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenLingShenJiSkin";
                    return _this;
                }
                return ShenLingShenJiView;
            }(eui.Component));
            shenling.ShenLingShenJiView = ShenLingShenJiView;
            __reflect(ShenLingShenJiView.prototype, "game.mod.shenling.ShenLingShenJiView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingUpStarView = /** @class */ (function (_super) {
                __extends(ShenLingUpStarView, _super);
                function ShenLingUpStarView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.shenling.ShenLingUpStarSkin";
                    _this.touchEnabled = false;
                    return _this;
                }
                return ShenLingUpStarView;
            }(eui.Component));
            shenling.ShenLingUpStarView = ShenLingUpStarView;
            __reflect(ShenLingUpStarView.prototype, "game.mod.shenling.ShenLingUpStarView");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingMainMdr = /** @class */ (function (_super) {
                __extends(ShenLingMainMdr, _super);
                function ShenLingMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._initBtnData = [
                        {
                            btnType: "01" /* Main */,
                            icon: "shenlingbiaoqiantubiao",
                            mdr: shenling.ShenLingMdr,
                            title: "general_tips",
                            bg: "p1_shenlingbeijingtu",
                            openIdx: 0,
                            hintTypes: ["45" /* Shenling */, "01" /* ShenLingMain */ + "01" /* Main */]
                        },
                        {
                            btnType: "02" /* UpStar */,
                            icon: "shengxingbiaoqiantubiao",
                            mdr: shenling.ShenLingUpStarMdr,
                            title: "upstar",
                            bg: "p1_shenlingbeijingtu",
                            openIdx: 0,
                            hintTypes: ["45" /* Shenling */, "01" /* ShenLingMain */ + "02" /* UpStar */]
                        },
                        {
                            btnType: "03" /* Lingqi */,
                            icon: "shenqibiaoqiantubiao",
                            mdr: shenling.ShenLingLingQiMdr,
                            title: "lingqi_tips1",
                            bg: "p1_shenlingbeijingtu",
                            openIdx: 0,
                            hintTypes: ["45" /* Shenling */, "01" /* ShenLingMain */ + "03" /* Lingqi */]
                        },
                        {
                            btnType: "04" /* Lingpo */,
                            icon: "lingpobiaoqiantubiao",
                            mdr: shenling.ShenlingLingpoMdr,
                            title: "lingpo_tips1",
                            bg: "lingpo_bg",
                            openIdx: 0,
                            hintTypes: ["45" /* Shenling */, "01" /* ShenLingMain */ + "04" /* Lingpo */]
                        },
                        {
                            btnType: "05" /* Lingli */,
                            icon: "linglibiaoqiantubiao",
                            mdr: shenling.ShenlingLingliMdr,
                            title: "lingli_tips1",
                            bg: "lingli_bg1",
                            openIdx: 0,
                            hintTypes: ["45" /* Shenling */, "01" /* ShenLingMain */ + "05" /* Lingli */]
                        }
                    ];
                    _this._isShowSpecialMdr = false;
                    return _this;
                }
                ShenLingMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(189 /* Shenling */);
                };
                ShenLingMainMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_shen_ling_update_type" /* ON_SHEN_LING_UPDATE_TYPE */, this.onUpdateMdr, this);
                };
                ShenLingMainMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                };
                ShenLingMainMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selIdx = null;
                };
                ShenLingMainMdr.prototype.updateBtnData = function () {
                    this._btnData = [];
                    var typeAry = this._proxy.getActedTypeList();
                    var isShowSpecialMdr = typeAry && typeAry.length > 0;
                    for (var _i = 0, _a = this._initBtnData; _i < _a.length; _i++) {
                        var btnData = _a[_i];
                        if (btnData.btnType == "04" /* Lingpo */ || btnData.btnType == "05" /* Lingli */) {
                            if (!isShowSpecialMdr) {
                                continue;
                            }
                            if (btnData.btnType == "05" /* Lingli */) {
                                btnData.bg = "lingli_bg" + typeAry[0];
                            }
                            this._btnData.push(btnData);
                            this._isShowSpecialMdr = true;
                        }
                        else {
                            this._btnData.push(btnData);
                        }
                    }
                };
                ShenLingMainMdr.prototype.updateBtnList = function () {
                    this.updateBtnData();
                    _super.prototype.updateBtnList.call(this);
                };
                ShenLingMainMdr.prototype.updateViewShow = function () {
                    //前两个页签，不支持传入。根据选中规则自行选中 2023.1.14
                    var args = this._showArgs;
                    var ary = ["01" /* Main */, "02" /* UpStar */];
                    if (args && Array.isArray(args) && args.length == 1 && ary.indexOf(args[0]) < 0) {
                        _super.prototype.updateViewShow.call(this);
                        return;
                    }
                    var selectedIdx = this._selIdx ? this._selIdx : this._proxy.getSelTab();
                    this._tab.selectIndex = selectedIdx;
                    this._selIdx = selectedIdx;
                    this._tab.show();
                };
                ShenLingMainMdr.prototype.onTabCheck = function (index) {
                    if (index == 0) {
                        if (this.canClickFirstPage()) {
                            return true;
                        }
                        game.PromptBox.getIns().show(game.getLanById("shenling_tips16" /* shenling_tips16 */));
                        return false;
                    }
                    return _super.prototype.onTabCheck.call(this, index);
                };
                ShenLingMainMdr.prototype.canClickFirstPage = function () {
                    return this._proxy.haveShangzhen() || this._proxy.haveActType();
                };
                ShenLingMainMdr.prototype.onTabChanged = function () {
                    _super.prototype.onTabChanged.call(this);
                    this._selIdx = this._tab.selectIndex;
                };
                //激活上阵阵位后，展示灵魄灵力页签
                ShenLingMainMdr.prototype.onUpdateMdr = function () {
                    if (this._isShowSpecialMdr) {
                        return;
                    }
                    this.updateBtnList();
                    this.updateViewShow();
                    this.updateTabHint();
                };
                return ShenLingMainMdr;
            }(mod.WndBaseMdr));
            shenling.ShenLingMainMdr = ShenLingMainMdr;
            __reflect(ShenLingMainMdr.prototype, "game.mod.shenling.ShenLingMainMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingEvolveMdr = /** @class */ (function (_super) {
                __extends(ShenlingEvolveMdr, _super);
                function ShenlingEvolveMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shenling.ShenlingEvolveView);
                    _this._evolvedIdx = 0; //已进化次数
                    _this.isEasyHide = true;
                    return _this;
                }
                ShenlingEvolveMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.list.itemRenderer = shenling.ShenlingEvolveTaskItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this._proxy = this.retProxy(189 /* Shenling */);
                };
                ShenlingEvolveMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.evolveItem, egret.TouchEvent.TOUCH_TAP, this.onClickEvolveItem, this);
                    addEventListener(this._view.btn_jinjie, egret.TouchEvent.TOUCH_TAP, this.onClickJinjie, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePower, this);
                    this.onNt("on_task_update" /* ON_TASK_UPDATE */, this.onUpdateTask, this);
                    this.onNt("on_shen_ling_update_info" /* ON_SHEN_LING_UPDATE_INFO */, this.onUpdateView, this);
                    this.onNt("on_view_hide" /* ON_VIEW_HIDE */, this.hide, this);
                };
                ShenlingEvolveMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.secondPop.updateTitleStr('进化');
                    this.updateView();
                };
                ShenlingEvolveMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ShenlingEvolveMdr.prototype.onUpdateView = function () {
                    if (this._proxy.isMaxEvolve(this._showArgs.index)) {
                        this.hide();
                    }
                };
                ShenlingEvolveMdr.prototype.updateView = function () {
                    var index = this._showArgs.index;
                    this._evolvedIdx = this._proxy.getEvolvedCnt(index);
                    //展示下一阶的
                    var nextQua = this._proxy.getNextEvolvedQuality(index);
                    this._view.modelItem.updateEvolveModel(index, nextQua);
                    //展示最高阶的
                    var maxQua = this._showArgs.character[1];
                    this._view.evolveItem.updateView(this._showArgs, 2, maxQua);
                    this.updateTaskData();
                    this.updateSkillItem();
                    this.updatePower();
                    var isTaskDone = this._proxy.isEvolveTaskAllDone(index);
                    if (isTaskDone) {
                        this._view.list.visible = false;
                        this._view.btn_jinjie.visible = true;
                        this._view.btn_jinjie.redPoint.visible = true;
                    }
                    else {
                        this._view.list.visible = true;
                        this._view.btn_jinjie.visible = false;
                    }
                };
                ShenlingEvolveMdr.prototype.onClickEvolveItem = function () {
                    mod.ViewMgr.getIns().showSecondPop("45" /* Shenling */, "12" /* ShenlingEvolvePreview */, this._showArgs);
                };
                //任务更新
                ShenlingEvolveMdr.prototype.onUpdateTask = function (n) {
                    var types = n.body;
                    if (types.indexOf(42 /* ShenlingEvolve */) > -1) {
                        this.updateView();
                    }
                };
                //更新任务
                ShenlingEvolveMdr.prototype.updateTaskData = function () {
                    var cfg = this._showArgs;
                    var taskIds = this._proxy.getEvolveTaskIds(cfg.index);
                    var list = [];
                    for (var _i = 0, taskIds_3 = taskIds; _i < taskIds_3.length; _i++) {
                        var id = taskIds_3[_i];
                        list.push(mod.TaskUtil.getTask(id));
                    }
                    list.sort(game.SortTools.sortTask);
                    this._listData.replaceAll(list);
                };
                //技能
                ShenlingEvolveMdr.prototype.updateSkillItem = function () {
                    var cfg = this._showArgs;
                    var character = cfg.character;
                    var initQuality = character[0]; //初始进化品质
                    var nextQua = this._proxy.getNextEvolvedQuality(cfg.index); //展示的品质
                    this._view.skillItem.updateView(this._showArgs.common, nextQua, initQuality == nextQua);
                };
                //展示下一阶的
                ShenlingEvolveMdr.prototype.updatePower = function () {
                    var cfg = this._showArgs;
                    var attrId = cfg.attr[this._evolvedIdx - 1];
                    var attr = mod.RoleUtil.getAttr(attrId);
                    this._view.power.setPowerValue(attr && attr.showpower || 0);
                    this._view.btn_god.updateGod(attr && attr.god || 0);
                };
                ShenlingEvolveMdr.prototype.onClickJinjie = function () {
                    var index = this._showArgs.index;
                    if (this._proxy.canEvolve(index)) {
                        this._proxy.c2s_god_brother_evolve(index);
                    }
                };
                return ShenlingEvolveMdr;
            }(game.MdrBase));
            shenling.ShenlingEvolveMdr = ShenlingEvolveMdr;
            __reflect(ShenlingEvolveMdr.prototype, "game.mod.shenling.ShenlingEvolveMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingEvolvePreviewMdr = /** @class */ (function (_super) {
                __extends(ShenlingEvolvePreviewMdr, _super);
                function ShenlingEvolvePreviewMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shenling.ShenlingEvolvePreviewView);
                    _this._selIdx = 0;
                    return _this;
                    // this.isEasyHide = true;
                }
                ShenlingEvolvePreviewMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.list_type.itemRenderer = shenling.ShenlingEvolveTypeIcon;
                    this._view.list_type.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.list_arrow.dataProvider = this._listArrow = new eui.ArrayCollection();
                    this._proxy = this.retProxy(189 /* Shenling */);
                };
                ShenlingEvolvePreviewMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_type, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateGod, this);
                };
                ShenlingEvolvePreviewMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.secondPop.updateTitleStr('进化预览');
                    this.updateListData();
                    this.updateView();
                };
                ShenlingEvolvePreviewMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ShenlingEvolvePreviewMdr.prototype.updateListData = function () {
                    if (!this._showArgs.character) {
                        return;
                    }
                    var ary = this._showArgs.character;
                    var list = [];
                    for (var i = ary[0]; i <= ary[1]; i++) {
                        list.push({
                            index: this._showArgs.index,
                            quality: i
                        });
                    }
                    this._listData.replaceAll(list);
                    this._view.list_type.selectedIndex = this._selIdx = 0;
                    var arrowAry = [];
                    arrowAry.length = list.length - 1;
                    this._listArrow.replaceAll(arrowAry);
                };
                ShenlingEvolvePreviewMdr.prototype.getSpeQuality = function () {
                    var cfg = this._showArgs;
                    var initQua = cfg.character[0];
                    return initQua + this._selIdx;
                };
                ShenlingEvolvePreviewMdr.prototype.updateView = function () {
                    var index = this._showArgs.index;
                    this._view.modelItem.updateEvolveModel(index, this.getSpeQuality());
                    this.updateGod();
                    var character = this._showArgs.character;
                    var initQuality = character[0]; //初始进化品质
                    var speQuality = initQuality + this._selIdx; //进化品质
                    this._view.skillItem.updateView(this._showArgs.common, speQuality, initQuality == speQuality);
                    var num = character[1] - character[0] + 1;
                    var numStr = game.StringUtil.getCNBynumber(num);
                    this._view.lb_desc.text = numStr + '阶形态进化，激发无限潜力';
                };
                ShenlingEvolvePreviewMdr.prototype.onClickList = function (e) {
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selIdx) {
                        return;
                    }
                    this._selIdx = itemIdx;
                    this.updateView();
                };
                ShenlingEvolvePreviewMdr.prototype.updateGod = function () {
                    var attrId = this._showArgs.attr[this._selIdx];
                    var attr = mod.RoleUtil.getAttr(attrId);
                    this._view.btn_god.updateGod(attr && attr.god || 0);
                };
                return ShenlingEvolvePreviewMdr;
            }(game.MdrBase));
            shenling.ShenlingEvolvePreviewMdr = ShenlingEvolvePreviewMdr;
            __reflect(ShenlingEvolvePreviewMdr.prototype, "game.mod.shenling.ShenlingEvolvePreviewMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var Handler = base.Handler;
            var ShenlingLingliMdr = /** @class */ (function (_super) {
                __extends(ShenlingLingliMdr, _super);
                function ShenlingLingliMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", shenling.ShenlingLingliView);
                    _this._scrollerH = 0;
                    _this._skillListCompH = 0;
                    _this._selType = 0;
                    _this._selIdx = 0; //技能序号，默认主动技能 LingliMainSkillIdx
                    return _this;
                }
                ShenlingLingliMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(223 /* ShenlingLingli */);
                    this._scrollerH = this._view.scroller.height;
                    this._skillListCompH = this._view.skillListComp.height;
                    this._view.line0_0.setMax();
                    this._view.line0_1.setMax();
                    this._view.line1_0.setMax();
                    this._view.line1_1.setMax();
                };
                ShenlingLingliMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.typeListComp.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickType, this);
                    addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
                    addEventListener(this._view.btn_reset, egret.TouchEvent.TOUCH_TAP, this.onClickReset, this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickBtnDo, this);
                    addEventListener(this._view.icon_main, egret.TouchEvent.TOUCH_TAP, this.onClickIconMain, this);
                    this.onNt("on_ling_li_icon_select" /* ON_LING_LI_ICON_SELECT */, this.onUpdateIconMainSel, this);
                    this.onNt("on_shen_ling_ling_li_update" /* ON_SHEN_LING_LING_LI_UPDATE */, this.onUpdateView, this);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                };
                ShenlingLingliMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.resetScroller();
                    this._view.typeListComp.updateListView(5 /* Lingli */);
                    var proxy = this.retProxy(189 /* Shenling */);
                    var typeAry = proxy.getActedTypeList();
                    this.onSwitchType(typeAry[0]);
                };
                ShenlingLingliMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selIdx = 0;
                };
                ShenlingLingliMdr.prototype.resetScroller = function () {
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollV = this._skillListCompH - this._scrollerH;
                };
                ShenlingLingliMdr.prototype.onSwitchType = function (type) {
                    this._selType = type;
                    this._selIdx = game.LingliMainSkillIdx;
                    this.sendNt("update_wnd_base_mdr_bg" /* UPDATE_WND_BASE_MDR_BG */, "lingli_bg" + type);
                    this._view.typeListComp.updateSelType(type);
                    this.updateView();
                    this.onClickIconMain();
                };
                ShenlingLingliMdr.prototype.onUpdateView = function () {
                    this.updateView();
                    this.updateSkillDesc();
                };
                ShenlingLingliMdr.prototype.updateView = function () {
                    this._view.typeListComp.updateListHint(5 /* Lingli */);
                    this._view.skillListComp.updateView(this._selType);
                    var skill_data = this._proxy.getMainSkillData(this._selType);
                    var skill_lv = skill_data ? skill_data.level : 1;
                    var cfg = this._proxy.getConfig(this._selType, skill_lv);
                    this._view.icon_main.data = {
                        type: this._selType,
                        index: cfg ? cfg.main_skill : 0,
                        idx: game.LingliMainSkillIdx,
                        lv: skill_data && skill_data.level || 0,
                        isMaxLv: this._proxy.isMaxLevel(this._selType, game.LingliMainSkillIdx),
                        hint: this._proxy.canActOrUp(this._selType, game.LingliMainSkillIdx),
                        isMain: true
                    };
                    this.updateResetCost();
                    this.updateCost();
                    this.updateLine();
                };
                ShenlingLingliMdr.prototype.updateLine = function () {
                    var isActed1 = this._proxy.isSkillActed(this._selType, 1);
                    var lineVal1 = isActed1 ? 1 : 0;
                    this._view.line0_0.updateLine(lineVal1);
                    this._view.line0_1.updateLine(lineVal1);
                    var isActed2 = this._proxy.isSkillActed(this._selType, 2);
                    var lineVal2 = isActed2 ? 1 : 0;
                    this._view.line1_0.updateLine(lineVal2);
                    this._view.line1_1.updateLine(lineVal2);
                };
                ShenlingLingliMdr.prototype.updateSkillDesc = function () {
                    this._view.skillDescComp.updateView(this._selType, this._selIdx);
                };
                ShenlingLingliMdr.prototype.updateResetCost = function () {
                    var cfg = this._proxy.getConfig(this._selType, 1);
                    if (!cfg) {
                        return;
                    }
                    var costIndex = cfg.main_cost[0];
                    var propCfg = game.GameConfig.getPropConfigById(costIndex);
                    if (propCfg) {
                        var cnt = mod.BagUtil.getPropCntByIdx(costIndex);
                        var txt = game.TextUtil.addColor(cnt + '', cnt > 0 ? 8585074 /* GREEN */ : 0xFEFDDB);
                        this._view.lb_resetcost.textFlow = game.TextUtil.parseHtml(propCfg.name + ":" + txt);
                    }
                };
                ShenlingLingliMdr.prototype.updateCost = function () {
                    var isMaxLv = this._proxy.isMaxLevel(this._selType, this._selIdx);
                    this._view.img_max.visible = isMaxLv;
                    this._view.gr_cost.visible = !isMaxLv;
                    if (isMaxLv) {
                        return;
                    }
                    var skill_data = this._proxy.getSkillData(this._selType, this._selIdx);
                    var isMain = this._selIdx == game.LingliMainSkillIdx;
                    var skill_lv = skill_data ? skill_data.level : 0;
                    var nextCfg = this._proxy.getConfig(this._selType, skill_lv + 1);
                    if (!nextCfg) {
                        return;
                    }
                    var cost = isMain ? nextCfg.main_cost : nextCfg.buff_costs[this._selIdx - 1];
                    var propCfg = game.GameConfig.getPropConfigById(cost[0]);
                    if (!propCfg) {
                        return;
                    }
                    //消耗处理
                    var bagCnt = mod.BagUtil.getPropCntByIdx(cost[0]);
                    var costCnt = cost[1];
                    var costTxt = game.TextUtil.addColor(bagCnt + "/" + costCnt, bagCnt >= costCnt ? 8585074 /* GREEN */ : 16731212 /* RED */);
                    this._view.lb_cost.textFlow = game.TextUtil.parseHtml(propCfg.name + ":" + costTxt);
                    //前置条件处理
                    var txt;
                    if (isMain) {
                        txt = '';
                    }
                    else {
                        var cond = nextCfg.condition[this._selIdx - 1];
                        var preIdx = cond[0];
                        var preNeedLv = cond[1];
                        var name = void 0;
                        if (preIdx == game.LingliMainSkillIdx) {
                            var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, nextCfg.main_skill);
                            name = cfg ? cfg.name : '';
                        }
                        else {
                            var buffId = nextCfg.buff_skills[this._selIdx - 1];
                            var cfg = game.getConfigByNameId("buff.json" /* Buff */, buffId);
                            name = cfg ? cfg.name : '';
                        }
                        var preData = this._proxy.getSkillData(this._selType, preIdx);
                        var preLv = preData ? preData.level : 0;
                        txt = game.getLanById("lingli_tips2" /* lingli_tips2 */) + (name + " ") + game.TextUtil.addColor("(" + preLv + "/" + preNeedLv + ")", preLv >= preNeedLv ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    }
                    this._view.lb_precondition.textFlow = game.TextUtil.parseHtml(txt);
                    this._view.btn_do.label = skill_lv == 0 ? game.getLanById("active" /* active */) : game.getLanById("uplv" /* uplv */);
                    this._view.btn_do.setHint(this._proxy.canActOrUp(this._selType, this._selIdx));
                };
                ShenlingLingliMdr.prototype.onClickType = function (e) {
                    if (!e) {
                        return;
                    }
                    var type = e.item.type;
                    if (type == this._selType) {
                        return;
                    }
                    this._view.icon_main.setSel(false);
                    this.resetScroller();
                    this.onSwitchType(type);
                };
                ShenlingLingliMdr.prototype.onClickRule = function () {
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("lingli_tips5" /* lingli_tips5 */));
                };
                ShenlingLingliMdr.prototype.onClickReset = function () {
                    if (!this._proxy.isActed(this._selType)) {
                        game.PromptBox.getIns().show(game.getLanById("lingli_tips3" /* lingli_tips3 */));
                        return;
                    }
                    var paramCfg = game.GameConfig.getParamConfigById('lingli_reset');
                    if (!paramCfg) {
                        return;
                    }
                    var cost = paramCfg.value;
                    var propCfg = game.GameConfig.getPropConfigById(cost[0]);
                    var txt = game.StringUtil.substitute(game.getLanById("lingli_tips4" /* lingli_tips4 */), [game.TextUtil.addColor("" + cost[1] + propCfg.name, 2330156 /* GREEN */)]);
                    mod.ViewMgr.getIns().showConfirm(txt, Handler.alloc(this, this.reset, [this._selType]));
                };
                ShenlingLingliMdr.prototype.reset = function (type) {
                    this._proxy.c2s_god_brother_lingli_reset_point(type);
                };
                ShenlingLingliMdr.prototype.onClickBtnDo = function () {
                    if (this._proxy.canActOrUp(this._selType, this._selIdx, true)) {
                        this._proxy.c2s_god_brother_lingli_click(this._selType, this._selIdx);
                    }
                };
                ShenlingLingliMdr.prototype.onClickIconMain = function () {
                    if (this._view.icon_main.isSeled()) {
                        return;
                    }
                    this._view.icon_main.setSel(true);
                    this._selIdx = game.LingliMainSkillIdx;
                    this.updateSkillDesc();
                    this.updateCost();
                    this.sendNt("on_ling_li_main_icon_select" /* ON_LING_LI_MAIN_ICON_SELECT */);
                };
                ShenlingLingliMdr.prototype.onUpdateIconMainSel = function (n) {
                    var _a = n.body, type = _a[0], idx = _a[1];
                    if (type != this._selType) {
                        return;
                    }
                    this._view.icon_main.setSel(false);
                    this._selIdx = idx;
                    this.updateSkillDesc();
                    this.updateCost();
                };
                ShenlingLingliMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    for (var _i = 0, LingliPointAry_2 = game.LingliPointAry; _i < LingliPointAry_2.length; _i++) {
                        var key = LingliPointAry_2[_i];
                        if (keys.indexOf(game.PropIndexToKey[key]) > -1) {
                            this.updateView();
                        }
                    }
                };
                return ShenlingLingliMdr;
            }(game.MdrBase));
            shenling.ShenlingLingliMdr = ShenlingLingliMdr;
            __reflect(ShenlingLingliMdr.prototype, "game.mod.shenling.ShenlingLingliMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingpoIconTipsBagMdr = /** @class */ (function (_super) {
                __extends(ShenlingLingpoIconTipsBagMdr, _super);
                function ShenlingLingpoIconTipsBagMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shenling.ShenlingLingpoIconTipsBagView);
                    _this.isEasyHide = true;
                    return _this;
                }
                ShenlingLingpoIconTipsBagMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(222 /* ShenlingLingpo */);
                };
                ShenlingLingpoIconTipsBagMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.onUpdateAttr, this);
                };
                ShenlingLingpoIconTipsBagMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this._view.propTips.updateShow(this._showArgs.index);
                    this._view.power.setPowerValue(this._showArgs.cfg.showPower);
                    this.updateView();
                };
                ShenlingLingpoIconTipsBagMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollV = 0;
                    this._baseAttrIds = null;
                    this._suitAttrIds = null;
                    this._nextSuitAttrIds = null;
                };
                //[灵魄Id, 几号位]
                ShenlingLingpoIconTipsBagMdr.prototype.getLingpoAry = function () {
                    var cfg = this._showArgs.cfg;
                    return cfg.param1[0];
                };
                ShenlingLingpoIconTipsBagMdr.prototype.updateView = function () {
                    var data = this._showArgs;
                    var cfg = data.cfg;
                    var ary = this.getLingpoAry();
                    var lingpoId = ary[0];
                    var lingpoIdx = ary[1];
                    //基础属性
                    var info = this._proxy.getIconInfo(lingpoId, lingpoIdx);
                    if (info && info.base_attrs) {
                        this.updateBaseAttr(info.base_attrs);
                    }
                    else {
                        var nextCfg = this._proxy.getConfig(lingpoId, 1);
                        this._baseAttrIds = nextCfg.attr_base[lingpoIdx - 1];
                        var attrs = mod.RoleUtil.getAttrList(this._baseAttrIds);
                        if (attrs) {
                            this.updateBaseAttr(game.TextUtil.calcAttrList(attrs));
                        }
                    }
                    //套装属性
                    var suitLv = this._proxy.getSuitLevel(lingpoId);
                    var suitCfg = this._proxy.getConfig(lingpoId, suitLv || 1);
                    this._suitAttrIds = suitCfg ? suitCfg.suit_attr : null;
                    var suitAttrs = mod.RoleUtil.getAttrList(this._suitAttrIds);
                    if (suitAttrs && suitAttrs.length) {
                        this.updateSuitAttr(game.TextUtil.calcAttrList(suitAttrs));
                    }
                    var isMax = this._proxy.isSuitLevelMax(lingpoId) || 0;
                    var isShowNext = !isMax && suitLv > 0;
                    if (isShowNext) {
                        this._view.lingpoAttrItem1.includeInLayout = true;
                        this._view.lingpoAttrItem1.visible = true;
                        var nextCfg = this._proxy.getConfig(lingpoId, suitLv + 1);
                        this._nextSuitAttrIds = nextCfg.suit_attr;
                        var suitAttrs_1 = mod.RoleUtil.getAttrList(this._nextSuitAttrIds);
                        if (suitAttrs_1 && suitAttrs_1.length) {
                            this.updateNextSuitAttr(game.TextUtil.calcAttrList(suitAttrs_1));
                        }
                    }
                    else {
                        this._view.lingpoAttrItem1.includeInLayout = false;
                        this._view.lingpoAttrItem1.visible = false;
                    }
                    //道具描述
                    this._view.descItem1.updateShow(cfg.desc);
                    //获取途径
                    this._view.propGainList.updateShow(cfg.gain_id);
                };
                ShenlingLingpoIconTipsBagMdr.prototype.onUpdateAttr = function () {
                    var attrs = mod.RoleUtil.getAttrList(this._baseAttrIds);
                    if (this._baseAttrIds && attrs && attrs.length) {
                        this.updateBaseAttr(game.TextUtil.calcAttrList(attrs));
                        this._baseAttrIds = null;
                    }
                    var suitAttrs = mod.RoleUtil.getAttrList(this._suitAttrIds);
                    if (suitAttrs && suitAttrs.length) {
                        this.updateSuitAttr(game.TextUtil.calcAttrList(suitAttrs));
                        this._suitAttrIds = null;
                    }
                    var nextSuitAttrs = mod.RoleUtil.getAttrList(this._nextSuitAttrIds);
                    if (nextSuitAttrs && nextSuitAttrs.length) {
                        this.updateNextSuitAttr(game.TextUtil.calcAttrList(nextSuitAttrs));
                        this._nextSuitAttrIds = null;
                    }
                };
                ShenlingLingpoIconTipsBagMdr.prototype.updateBaseAttr = function (attr) {
                    if (!attr) {
                        return;
                    }
                    this._view.descItem0.updateShow(game.TextUtil.getAttrTextInfos(attr, 8585074 /* GREEN */, '\n', ' +', 4435385 /* DEFAULT */).join('\n'), '基础属性');
                };
                ShenlingLingpoIconTipsBagMdr.prototype.updateSuitAttr = function (attr) {
                    if (!attr) {
                        return;
                    }
                    var ary = this.getLingpoAry();
                    this._view.lingpoAttrItem0.updateInfo(ary[0], attr);
                };
                ShenlingLingpoIconTipsBagMdr.prototype.updateNextSuitAttr = function (attr) {
                    if (!attr) {
                        return;
                    }
                    var ary = this.getLingpoAry();
                    this._view.lingpoAttrItem1.updateNextInfo(ary[0], attr);
                };
                return ShenlingLingpoIconTipsBagMdr;
            }(game.MdrBase));
            shenling.ShenlingLingpoIconTipsBagMdr = ShenlingLingpoIconTipsBagMdr;
            __reflect(ShenlingLingpoIconTipsBagMdr.prototype, "game.mod.shenling.ShenlingLingpoIconTipsBagMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var Handler = base.Handler;
            var ShenlingLingpoIconTipsMdr = /** @class */ (function (_super) {
                __extends(ShenlingLingpoIconTipsMdr, _super);
                function ShenlingLingpoIconTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shenling.ShenlingLingpoIconTipsView);
                    _this._costCnt = 0;
                    _this.isEasyHide = true;
                    return _this;
                }
                ShenlingLingpoIconTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(222 /* ShenlingLingpo */);
                };
                ShenlingLingpoIconTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);
                    this.onNt("on_shen_ling_ling_po_update" /* ON_SHEN_LING_LING_PO_UPDATE */, this.onUpdateView, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.onUpdateAttr, this);
                };
                ShenlingLingpoIconTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this._view.propTips.updateShow(this._showArgs.index);
                    this.updateView();
                };
                ShenlingLingpoIconTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollV = 0;
                    this._baseAttrIds = null;
                    this._suitAttrIds = null;
                    this._nextSuitAttrIds = null;
                };
                ShenlingLingpoIconTipsMdr.prototype.onUpdateView = function () {
                    var info = this._proxy.getIconInfo(this._showArgs.id, this._showArgs.idx);
                    if (info) {
                        this._showArgs.level = info.level; //重赋值level，避免意外使用到level出现bug
                    }
                    this.updateView();
                };
                ShenlingLingpoIconTipsMdr.prototype.updateView = function () {
                    var args = this._showArgs;
                    var info = this._proxy.getIconInfo(args.id, args.idx);
                    var level = info && info.level || 0;
                    var nextCfg = this._proxy.getConfig(args.id, level + 1);
                    this._view.btn_do.label = level > 0 ? game.getLanById("uplv" /* uplv */) : game.getLanById("active" /* active */);
                    this._view.gr_cost.visible = this._view.btn_do.visible = !!nextCfg;
                    this._view.img_max.visible = !this._view.btn_do.visible;
                    if (nextCfg) {
                        this._view.img_max.visible = false;
                        var cost = nextCfg.cost[args.idx - 1];
                        this._view.icon_cost.data = cost;
                        this._view.icon_cost.updateCostLab(cost);
                        this._costCnt = cost[1];
                        this._view.btn_do.setHint(this._proxy.canActOrUp(args.id, args.idx));
                        this._view.bar.show(0, cost[1], false, 0, false, 1 /* Value */);
                    }
                    else {
                        nextCfg = this._proxy.getConfig(args.id, level); //没有则获取满阶配置
                    }
                    if (info && info.base_attrs) {
                        this.updateBaseAttr(info.base_attrs);
                    }
                    else {
                        this._baseAttrIds = nextCfg.attr_base[args.idx - 1];
                        var attrs = mod.RoleUtil.getAttrList(this._baseAttrIds);
                        if (attrs) {
                            this.updateBaseAttr(game.TextUtil.calcAttrList(attrs));
                        }
                    }
                    var suitLv = this._proxy.getSuitLevel(args.id);
                    var suitCfg = this._proxy.getConfig(args.id, suitLv || 1);
                    this._suitAttrIds = suitCfg ? suitCfg.suit_attr : null;
                    var suitAttrs = mod.RoleUtil.getAttrList(this._suitAttrIds);
                    if (suitAttrs && suitAttrs.length) {
                        this.updateSuitAttr(game.TextUtil.calcAttrList(suitAttrs));
                    }
                    var isMax = this._proxy.isSuitLevelMax(args.id) || 0;
                    var isShowNext = !isMax && suitLv > 0;
                    this._view.lingpoAttrItem1.visible = isShowNext;
                    if (isShowNext) {
                        var nextCfg_1 = this._proxy.getConfig(args.id, suitLv + 1);
                        this._nextSuitAttrIds = nextCfg_1.suit_attr;
                        var suitAttrs_2 = mod.RoleUtil.getAttrList(this._nextSuitAttrIds);
                        if (suitAttrs_2 && suitAttrs_2.length) {
                            this.updateNextSuitAttr(game.TextUtil.calcAttrList(suitAttrs_2));
                        }
                    }
                };
                ShenlingLingpoIconTipsMdr.prototype.onUpdateAttr = function () {
                    var attrs = mod.RoleUtil.getAttrList(this._baseAttrIds);
                    if (this._baseAttrIds && attrs && attrs.length) {
                        this.updateBaseAttr(game.TextUtil.calcAttrList(attrs));
                        this._baseAttrIds = null;
                    }
                    var suitAttrs = mod.RoleUtil.getAttrList(this._suitAttrIds);
                    if (suitAttrs && suitAttrs.length) {
                        this.updateSuitAttr(game.TextUtil.calcAttrList(suitAttrs));
                        this._suitAttrIds = null;
                    }
                    var nextSuitAttrs = mod.RoleUtil.getAttrList(this._nextSuitAttrIds);
                    if (nextSuitAttrs && nextSuitAttrs.length) {
                        this.updateNextSuitAttr(game.TextUtil.calcAttrList(nextSuitAttrs));
                        this._nextSuitAttrIds = null;
                    }
                };
                ShenlingLingpoIconTipsMdr.prototype.updateBaseAttr = function (attr) {
                    if (!attr) {
                        return;
                    }
                    this._view.descItem.updateShow(game.TextUtil.getAttrTextInfos(attr, 8585074 /* GREEN */, '\n', ' +', 4435385 /* DEFAULT */).join('\n'), '基础属性');
                };
                ShenlingLingpoIconTipsMdr.prototype.updateSuitAttr = function (attr) {
                    if (!attr) {
                        return;
                    }
                    this._view.lingpoAttrItem0.updateInfo(this._showArgs.id, attr);
                };
                ShenlingLingpoIconTipsMdr.prototype.updateNextSuitAttr = function (attr) {
                    if (!attr) {
                        return;
                    }
                    this._view.lingpoAttrItem1.updateNextInfo(this._showArgs.id, attr);
                };
                ShenlingLingpoIconTipsMdr.prototype.onClickBtn = function () {
                    var args = this._showArgs;
                    if (!this._proxy.canActOrUp(args.id, args.idx, true)) {
                        return;
                    }
                    if (this._costCnt) {
                        this._view.bar.show(this._costCnt, this._costCnt, true, 0, false, 1 /* Value */, Handler.alloc(this, this.onceCallBack));
                    }
                };
                ShenlingLingpoIconTipsMdr.prototype.onceCallBack = function () {
                    this._proxy.c2s_god_brother_lingpo_click(1, this._showArgs.id, this._showArgs.idx);
                };
                return ShenlingLingpoIconTipsMdr;
            }(game.MdrBase));
            shenling.ShenlingLingpoIconTipsMdr = ShenlingLingpoIconTipsMdr;
            __reflect(ShenlingLingpoIconTipsMdr.prototype, "game.mod.shenling.ShenlingLingpoIconTipsMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingpoMdr = /** @class */ (function (_super) {
                __extends(ShenlingLingpoMdr, _super);
                function ShenlingLingpoMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", shenling.ShenlingLingpoView);
                    _this._selType = 0;
                    _this._selIdx = 0;
                    _this._cfgId = 0;
                    _this._preId = 0; //一键操作的灵魄id，没有下一个可一键操作的时候停留在当前灵魄
                    return _this;
                }
                ShenlingLingpoMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(222 /* ShenlingLingpo */);
                    this._slProxy = this.retProxy(189 /* Shenling */);
                    this._view.list.itemRenderer = shenling.ShenlingLingpoItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                ShenlingLingpoMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.typeListComp.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickType, this);
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
                    addEventListener(this._view.suitBtn, egret.TouchEvent.TOUCH_TAP, this.onClickSuitBtn, this);
                    addEventListener(this._view.lb_gain, egret.TextEvent.LINK, this.onClickGain, this);
                    this.onNt("on_shen_ling_ling_po_update" /* ON_SHEN_LING_LING_PO_UPDATE */, this.onUpdateView, this);
                    this.onNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, this.onUpdateByBagType, this);
                };
                ShenlingLingpoMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.typeListComp.updateListView(4 /* Lingpo */);
                    var typeAry = this._proxy.getShowShenlingTypes();
                    this.onSwitchType(typeAry[0]);
                };
                ShenlingLingpoMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selType = 0;
                    this._selIdx = 0;
                    this._cfgId = 0;
                    this._preId = null;
                };
                ShenlingLingpoMdr.prototype.onSwitchType = function (type) {
                    this._selIdx = 0;
                    this._preId = null;
                    this._selType = type;
                    this._view.typeListComp.updateSelType(type);
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollH = 0;
                    this.updateView();
                };
                ShenlingLingpoMdr.prototype.getNextOneKeyType = function () {
                    if (this._proxy.getHintByType(this._selType)) {
                        return this._selType;
                    }
                    var typeAry = this._proxy.getShowShenlingTypes();
                    for (var _i = 0, typeAry_2 = typeAry; _i < typeAry_2.length; _i++) {
                        var type = typeAry_2[_i];
                        if (this._proxy.getHintByType(type)) {
                            return type;
                        }
                    }
                    return this._selType;
                };
                ShenlingLingpoMdr.prototype.onUpdateView = function () {
                    var nextType = this.getNextOneKeyType();
                    if (this._preId && nextType != this._selType) {
                        this.onSwitchType(nextType);
                        return;
                    }
                    this.updateView();
                };
                ShenlingLingpoMdr.prototype.updateView = function () {
                    this._view.typeListComp.updateListHint(4 /* Lingpo */);
                    this.updateListView();
                    this.updateTopView();
                };
                ShenlingLingpoMdr.prototype.updateListView = function () {
                    var cfgList = this._proxy.getShowTypeCfgList(this._selType);
                    var list = [];
                    var selFirst = false;
                    for (var _i = 0, cfgList_9 = cfgList; _i < cfgList_9.length; _i++) {
                        var cfg = cfgList_9[_i];
                        var hint = this._proxy.getHintById(cfg.id);
                        var data = {
                            isActed: this._proxy.isActed(cfg.id),
                            cfg: cfg,
                            hint: hint,
                            lv: this._proxy.getSuitLevel(cfg.id),
                            progress: this._proxy.getSuitLevelProgressCnt(cfg.id),
                            isSel: false
                        };
                        if (hint) {
                            selFirst = true;
                        }
                        list.push(data);
                    }
                    list.sort(function (a, b) {
                        if (a.hint != b.hint) {
                            return a.hint ? -1 : 1;
                        }
                        if (a.isActed != b.isActed) {
                            return b.isActed ? 1 : -1;
                        }
                        if (a.lv != b.lv) {
                            return b.lv > 0 ? 1 : -1;
                        }
                        return a.cfg.id - b.cfg.id;
                    });
                    if (selFirst) {
                        this._selIdx = 0;
                    }
                    else if (this._preId) {
                        for (var i = 0; i < list.length; i++) {
                            var item = list[i];
                            if (item && item.cfg.id == this._preId) {
                                this._selIdx = i;
                                break;
                            }
                        }
                    }
                    var size = list.length;
                    for (var i = 0; i < size; i++) {
                        list[i].isSel = this._selIdx == i;
                    }
                    this._listData.replaceAll(list);
                    this._view.list.selectedIndex = this._selIdx;
                    if (list && list[this._selIdx]) {
                        this._cfgId = list[this._selIdx].cfg.id;
                    }
                };
                ShenlingLingpoMdr.prototype.updateTopView = function () {
                    this._view.power.setPowerValue(this._proxy.getPower(this._cfgId));
                    this._view.listComp.updateView(this._selType, this._cfgId);
                    this._view.suitBtn.updateView(this._selType, this._cfgId);
                    var canOneKey = this._proxy.canOneKey(this._cfgId);
                    var canOneKeySuit = this._proxy.canOneKeySuit(this._cfgId);
                    this._view.btn_onekey.visible = canOneKey || canOneKeySuit;
                    this._view.gr_gain.visible = false;
                    if (canOneKey) {
                        this._view.btn_onekey.label = this._proxy.isActedAllIcon(this._cfgId) ? game.getLanById("onekeyup" /* onekeyup */) : game.getLanById("yijianjihuo" /* yijianjihuo */);
                    }
                    else if (canOneKeySuit) {
                        this._view.btn_onekey.label = game.getLanById("lingpo_tips4" /* lingpo_tips4 */);
                    }
                    else {
                        var isMax = this._proxy.isSuitLevelMax(this._cfgId);
                        if (!isMax) {
                            this._view.gr_gain.visible = true;
                            var cfg = this._proxy.getTypeCfg(this._cfgId);
                            var jumpCfg = game.getConfigByNameId("jump.json" /* Jump */, cfg.gain_id[0]);
                            this._view.lb_gain.textFlow = game.TextUtil.parseHtml(game.getLanById("bag_cue21" /* bag_cue21 */) + "\uFF1A" + game.TextUtil.addLinkHtmlTxt(jumpCfg.name, 16773203 /* YELLOW */, ''));
                        }
                    }
                    if (this._view.btn_onekey.visible) {
                        this._view.btn_onekey.setHint(true);
                    }
                };
                ShenlingLingpoMdr.prototype.onClickType = function (e) {
                    if (!e) {
                        return;
                    }
                    var type = e.item.type;
                    if (type == this._selType) {
                        return;
                    }
                    this.onSwitchType(type);
                };
                ShenlingLingpoMdr.prototype.onClickList = function (e) {
                    if (!e || !e.item || this._selIdx == e.itemIndex) {
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
                    this._selIdx = e.itemIndex;
                    this._cfgId = e.item.cfg.id;
                    this._preId = null;
                    this.updateTopView();
                };
                ShenlingLingpoMdr.prototype.onClickOneKey = function () {
                    if (this._proxy.canOneKey(this._cfgId)) {
                        this._preId = this._cfgId;
                        this._proxy.c2s_god_brother_lingpo_click(2, this._cfgId);
                    }
                    else if (this._proxy.canOneKeySuit(this._cfgId)) {
                        this.onClickSuitBtn();
                    }
                };
                ShenlingLingpoMdr.prototype.onClickSuitBtn = function () {
                    mod.ViewMgr.getIns().showSecondPop("45" /* Shenling */, "09" /* ShenlingLingpoSuitTips */, this._cfgId);
                };
                ShenlingLingpoMdr.prototype.onClickGain = function () {
                    var cfg = this._proxy.getTypeCfg(this._cfgId);
                    mod.ViewMgr.getIns().showViewByID(cfg.gain_id[0]);
                };
                ShenlingLingpoMdr.prototype.onUpdateByBagType = function (n) {
                    var bagTypes = n.body;
                    if (bagTypes.indexOf(4 /* ShenlingEquip */) > -1) {
                        this.updateView();
                    }
                };
                return ShenlingLingpoMdr;
            }(game.MdrBase));
            shenling.ShenlingLingpoMdr = ShenlingLingpoMdr;
            __reflect(ShenlingLingpoMdr.prototype, "game.mod.shenling.ShenlingLingpoMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingpoSuitTipsMdr = /** @class */ (function (_super) {
                __extends(ShenlingLingpoSuitTipsMdr, _super);
                function ShenlingLingpoSuitTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shenling.ShenlingLingpoIconTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                ShenlingLingpoSuitTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(222 /* ShenlingLingpo */);
                    this._view.gr_cost.visible = false;
                    this._view.btn_do.x = 276;
                    this._view.btn_do.y = 880;
                    if (this._view.descItem.parent) {
                        this._view.descItem.parent.removeChild(this._view.descItem);
                    }
                };
                ShenlingLingpoSuitTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickBtn, this);
                    this.onNt("on_shen_ling_ling_po_update" /* ON_SHEN_LING_LING_PO_UPDATE */, this.updateView, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.onUpdateAttr, this);
                };
                ShenlingLingpoSuitTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this._cfg = this._proxy.getTypeCfg(this._showArgs);
                    if (!this._cfg) {
                        return;
                    }
                    this.updateView();
                };
                ShenlingLingpoSuitTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._suitAttrIds = null;
                    this._nextSuitAttrIds = null;
                };
                ShenlingLingpoSuitTipsMdr.prototype.updateView = function () {
                    this._view.propTips.updateShowByArgs(this._cfg.quality, this._cfg.name, this._cfg.icon);
                    var isMax = this._proxy.isSuitLevelMax(this._showArgs);
                    this._view.img_max.visible = isMax;
                    this._view.btn_do.visible = !this._view.img_max.visible;
                    var info = this._proxy.getInfo(this._showArgs);
                    var suitLv = info && info.suit_level || 0;
                    this._view.btn_do.label = suitLv ? game.getLanById("rank_up" /* rank_up */) : game.getLanById("active" /* active */);
                    if (this._view.btn_do.visible) {
                        this._view.btn_do.setHint(this._proxy.canActOrUpSuit(this._showArgs));
                    }
                    if (info && info.suit_attrs && Object.keys(info.suit_attrs).length > 0) {
                        this.updateSuitAttr(info.suit_attrs);
                    }
                    else {
                        var cfg = this._proxy.getConfig(this._showArgs, 1);
                        this._suitAttrIds = cfg.suit_attr;
                        var suitAttrs = mod.RoleUtil.getAttrList(this._suitAttrIds);
                        if (suitAttrs && suitAttrs.length) {
                            this.updateSuitAttr(game.TextUtil.calcAttrList(suitAttrs));
                        }
                    }
                    var isShowNext = !isMax && suitLv > 0;
                    this._view.lingpoAttrItem1.visible = isShowNext;
                    if (isShowNext) {
                        var nextCfg = this._proxy.getConfig(this._showArgs, suitLv + 1);
                        this._nextSuitAttrIds = nextCfg.suit_attr;
                        var suitAttrs = mod.RoleUtil.getAttrList(this._nextSuitAttrIds);
                        if (suitAttrs && suitAttrs.length) {
                            this.updateNextSuitAttr(game.TextUtil.calcAttrList(suitAttrs));
                        }
                    }
                };
                ShenlingLingpoSuitTipsMdr.prototype.onUpdateAttr = function () {
                    var suitAttrs = mod.RoleUtil.getAttrList(this._suitAttrIds);
                    if (suitAttrs && suitAttrs.length) {
                        this.updateSuitAttr(game.TextUtil.calcAttrList(suitAttrs));
                        this._suitAttrIds = null;
                    }
                    var nextSuitAttrs = mod.RoleUtil.getAttrList(this._nextSuitAttrIds);
                    if (nextSuitAttrs && nextSuitAttrs.length) {
                        this.updateNextSuitAttr(game.TextUtil.calcAttrList(nextSuitAttrs));
                        this._nextSuitAttrIds = null;
                    }
                };
                ShenlingLingpoSuitTipsMdr.prototype.updateSuitAttr = function (attr) {
                    if (!attr) {
                        return;
                    }
                    this._view.lingpoAttrItem0.updateInfo(this._showArgs, attr);
                };
                ShenlingLingpoSuitTipsMdr.prototype.updateNextSuitAttr = function (attr) {
                    if (!attr) {
                        return;
                    }
                    this._view.lingpoAttrItem1.updateNextInfo(this._showArgs, attr);
                };
                ShenlingLingpoSuitTipsMdr.prototype.onClickBtn = function () {
                    if (!this._proxy.canActOrUpSuit(this._showArgs, true)) {
                        return;
                    }
                    this._proxy.c2s_god_brother_lingpo_click(3, this._showArgs);
                };
                return ShenlingLingpoSuitTipsMdr;
            }(game.MdrBase));
            shenling.ShenlingLingpoSuitTipsMdr = ShenlingLingpoSuitTipsMdr;
            __reflect(ShenlingLingpoSuitTipsMdr.prototype, "game.mod.shenling.ShenlingLingpoSuitTipsMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingLingQiMdr = /** @class */ (function (_super) {
                __extends(ShenLingLingQiMdr, _super);
                function ShenLingLingQiMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", shenling.ShenLingLingQiView);
                    _this._selType = 0;
                    _this._selIdx = 0;
                    _this._curIndex = 0; //当前选择神灵
                    _this._preIndex = 0; //一键操作的神灵index，没有下一个可一键操作的时候停留在此神灵
                    _this._effIdx = 0;
                    return _this;
                }
                ShenLingLingQiMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._slProxy = this.retProxy(189 /* Shenling */);
                    this._proxy = this.retProxy(221 /* ShenlingLingqi */);
                    this._view.list.itemRenderer = mod.AvatarItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                ShenLingLingQiMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.typeListComp.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickType, this);
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
                    this.onNt("on_shen_ling_ling_qi_update" /* ON_SHEN_LING_LING_QI_UPDATE */, this.onUpdateView, this);
                    this.onNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, this.onUpdateByBagType, this);
                };
                ShenLingLingQiMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.typeListComp.updateListView(3 /* Lingqi */);
                    this.onSwitchType(game.ShenLingTypeAry[0]);
                };
                ShenLingLingQiMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selType = 0;
                    this._selIdx = 0;
                    this._curIndex = 0;
                    this._preIndex = null;
                    this.removeModelEft();
                };
                ShenLingLingQiMdr.prototype.removeModelEft = function () {
                    if (this._effIdx) {
                        this.removeEffect(this._effIdx);
                    }
                    this._effIdx = null;
                };
                ShenLingLingQiMdr.prototype.onSwitchType = function (type) {
                    this._selIdx = 0;
                    this._preIndex = null;
                    this._selType = type;
                    this._view.typeListComp.updateSelType(type);
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollH = 0;
                    this.updateView();
                };
                //可一键操作的神灵类型
                ShenLingLingQiMdr.prototype.getNextOneKetType = function () {
                    if (this._proxy.getHintByType(this._selType)) {
                        return this._selType;
                    }
                    for (var _i = 0, ShenLingTypeAry_11 = game.ShenLingTypeAry; _i < ShenLingTypeAry_11.length; _i++) {
                        var type = ShenLingTypeAry_11[_i];
                        if (this._proxy.getHintByType(type)) {
                            return type;
                        }
                    }
                    return this._selType;
                };
                ShenLingLingQiMdr.prototype.onUpdateView = function () {
                    //下一个可一键操作的类型
                    var nextType = this.getNextOneKetType();
                    if (this._preIndex && nextType != this._selType) {
                        this.onSwitchType(nextType);
                        return;
                    }
                    this.updateView();
                };
                ShenLingLingQiMdr.prototype.updateView = function () {
                    this._view.typeListComp.updateListHint(3 /* Lingqi */);
                    this.updateListView();
                    this.updateTopView();
                };
                ShenLingLingQiMdr.prototype.updateListView = function () {
                    var cfgList = this._slProxy.getShenLingCfgListByType(this._selType) || [];
                    var canActOrUpList = [];
                    var actedList = [];
                    var notActedList = [];
                    var typeInfo = this._slProxy.getTypeInfo(this._selType);
                    var atWhichList = 0; //1激活或升星，2上阵
                    var selFirst = false;
                    for (var _i = 0, cfgList_10 = cfgList; _i < cfgList_10.length; _i++) {
                        var cfg = cfgList_10[_i];
                        if (!cfg.show) {
                            continue;
                        }
                        var info = this._slProxy.getInfoByIndex(cfg.index);
                        var isAct = !!info;
                        var isBattle = typeInfo && typeInfo.upindex && typeInfo.upindex == cfg.index;
                        var canOneKey = this._proxy.canOneKey(cfg.index);
                        var data = {
                            quality: cfg.quality,
                            data: {
                                cfg: cfg,
                                showHint: canOneKey,
                                star: info && info.star || 0,
                                isBattle: isBattle
                            }
                        };
                        if (canOneKey && isBattle) {
                            canActOrUpList.unshift(data);
                            atWhichList = 1;
                            selFirst = true;
                        }
                        else if (canOneKey) {
                            canActOrUpList.push(data);
                            selFirst = true;
                        }
                        else if (isBattle) {
                            actedList.unshift(data);
                            atWhichList = 2;
                        }
                        else if (isAct) {
                            actedList.push(data);
                        }
                        else {
                            notActedList.push(data);
                        }
                    }
                    if (atWhichList == 1 && canActOrUpList.length > 1) {
                        game.SortTools.sortMap(canActOrUpList.slice(1), 'quality');
                    }
                    if (atWhichList == 2 && actedList.length > 1) {
                        game.SortTools.sortMap(actedList.slice(1), 'quality');
                    }
                    game.SortTools.sortMap(notActedList, 'quality');
                    canActOrUpList = canActOrUpList.concat(actedList, notActedList);
                    var list = [];
                    for (var _a = 0, canActOrUpList_1 = canActOrUpList; _a < canActOrUpList_1.length; _a++) {
                        var item = canActOrUpList_1[_a];
                        list.push(item.data);
                    }
                    if (selFirst) {
                        this._selIdx = 0; //有下一个可一键操作的，默认都已经排在第一位了
                    }
                    else {
                        //没有下一个可一键操作的，停留在上次一键操作的神灵界面
                        if (this._preIndex) {
                            for (var i = 0; i < list.length; i++) {
                                var item = list[i];
                                if (item && item.cfg.index == this._preIndex) {
                                    this._selIdx = i;
                                    break;
                                }
                            }
                        }
                    }
                    var size = list.length;
                    for (var i = 0; i < size; i++) {
                        list[i].isSel = this._selIdx == i;
                    }
                    this._listData.replaceAll(list);
                    this._view.list.selectedIndex = this._selIdx;
                    if (list[this._selIdx]) {
                        this._curIndex = list[this._selIdx].cfg.index;
                    }
                };
                ShenLingLingQiMdr.prototype.updateTopView = function () {
                    var curIndex = this._curIndex;
                    var cfg = this._slProxy.getShenLingCfg(curIndex);
                    if (!cfg) {
                        return;
                    }
                    this.removeModelEft();
                    this._effIdx = this.addAnimate(cfg.index, this._view.gr_eff);
                    this._view.power.setPowerValue(this._proxy.getPower(curIndex));
                    var canOneKey = this._proxy.canOneKey(curIndex);
                    this._view.btn_onekey.visible = canOneKey; //激活或者升星才会出现按钮
                    if (canOneKey) {
                        var isAct = this._proxy.haveOneLqActed(curIndex);
                        this._view.btn_onekey.label = isAct ? game.getLanById("onekeyup_jie" /* onekeyup_jie */) : game.getLanById("yijianjihuo" /* yijianjihuo */);
                        this._view.btn_onekey.setHint(canOneKey);
                    }
                    this._view.suitComp.updateView(curIndex);
                    var lingqiList = this._proxy.getLingQiIdList(curIndex);
                    if (lingqiList && lingqiList.length) {
                        for (var i = 0; i < lingqiList.length; i++) {
                            var icon = this._view["icon" + i];
                            if (!icon) {
                                continue;
                            }
                            var info = this._proxy.getLingQiInfo(curIndex, i + 1);
                            icon.data = {
                                slIndex: curIndex,
                                index: lingqiList[i],
                                idx: i + 1,
                                hint: this._proxy.canActOrUp(curIndex, i + 1),
                                isAct: !!info,
                                star: info && info.star || 0
                            };
                        }
                    }
                    else {
                        for (var i = 0; i < 3; i++) {
                            this._view["icon" + i].data = null;
                        }
                    }
                };
                ShenLingLingQiMdr.prototype.onClickType = function (e) {
                    if (!e) {
                        return;
                    }
                    var type = e.item.type;
                    if (type == this._selType) {
                        return;
                    }
                    this.onSwitchType(type);
                };
                ShenLingLingQiMdr.prototype.onClickList = function (e) {
                    if (!e || !e.item || this._selIdx == e.itemIndex) {
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
                    this._curIndex = data.cfg.index;
                    this._selIdx = e.itemIndex;
                    this._preIndex = null;
                    this.updateTopView();
                };
                ShenLingLingQiMdr.prototype.onClickOneKey = function () {
                    var curIndex = this._curIndex;
                    if (this._proxy.canOneKey(curIndex)) {
                        this._preIndex = curIndex;
                        this._proxy.c2s_god_brother_lingqi_click(2, curIndex);
                    }
                };
                ShenLingLingQiMdr.prototype.onUpdateByBagType = function (n) {
                    var bagTypes = n.body;
                    if (bagTypes.indexOf(4 /* ShenlingEquip */) > -1) {
                        this.updateView();
                    }
                };
                return ShenLingLingQiMdr;
            }(game.EffectMdrBase));
            shenling.ShenLingLingQiMdr = ShenLingLingQiMdr;
            __reflect(ShenLingLingQiMdr.prototype, "game.mod.shenling.ShenLingLingQiMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingMod = /** @class */ (function (_super) {
                __extends(ShenLingMod, _super);
                function ShenLingMod() {
                    return _super.call(this, "45" /* Shenling */) || this;
                }
                ShenLingMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                ShenLingMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(189 /* Shenling */, shenling.ShenLingProxy);
                    this.regProxy(221 /* ShenlingLingqi */, shenling.ShenLingLingQiProxy);
                    this.regProxy(222 /* ShenlingLingpo */, shenling.ShenlingLingpoProxy);
                    this.regProxy(223 /* ShenlingLingli */, shenling.ShenlingLingliProxy);
                };
                ShenLingMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* ShenLingMain */, shenling.ShenLingMainMdr);
                    this.regMdr("03" /* ShenLingAttr */, shenling.ShenLingAttrMdr);
                    this.regMdr("02" /* ShenLingShangZhen */, shenling.ShenlingShanzhenSecondMainMdr);
                    this.regMdr("04" /* ShenLingAwaken */, shenling.ShenLingAwakenMdr);
                    this.regMdr("05" /* ShenLingSkill */, shenling.ShenLingSkillTipsMdr);
                    this.regMdr("06" /* ShenLingShenJi */, shenling.ShenLingShenJiMdr);
                    this.regMdr("07" /* ShenlingLingqiTips */, shenling.ShenLingLingQiTipsMdr);
                    this.regMdr("08" /* ShenlingLingpoTips */, shenling.ShenlingLingpoIconTipsMdr);
                    this.regMdr("09" /* ShenlingLingpoSuitTips */, shenling.ShenlingLingpoSuitTipsMdr);
                    this.regMdr("10" /* ShenlingLingqiBagTips */, shenling.ShenlingLingqiBagTipsMdr);
                    this.regMdr("11" /* ShenlingEvolve */, shenling.ShenlingEvolveMdr);
                    this.regMdr("12" /* ShenlingEvolvePreview */, shenling.ShenlingEvolvePreviewMdr);
                    this.regMdr("13" /* ShenlingLingpoIconTipsBag */, shenling.ShenlingLingpoIconTipsBagMdr);
                };
                return ShenLingMod;
            }(game.ModBase));
            shenling.ShenLingMod = ShenLingMod;
            __reflect(ShenLingMod.prototype, "game.mod.shenling.ShenLingMod");
            gso.modCls.push(ShenLingMod);
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingLingqiBagTipsMdr = /** @class */ (function (_super) {
                __extends(ShenlingLingqiBagTipsMdr, _super);
                function ShenlingLingqiBagTipsMdr() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ShenlingLingqiBagTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(221 /* ShenlingLingqi */);
                };
                ShenlingLingqiBagTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                ShenlingLingqiBagTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.currentState = 'bag';
                };
                ShenlingLingqiBagTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ShenlingLingqiBagTipsMdr.prototype.updateView = function () {
                    //灵器index，_showArgs是PropData
                    var index = this._showArgs.index;
                    var equipCfg = game.GameConfig.getEquipmentCfg(index);
                    if (!equipCfg) {
                        return;
                    }
                    var slIndex = equipCfg.parm1 && equipCfg.parm1[0] || 0;
                    if (!slIndex) {
                        DEBUG && console.error("\u7075\u5668 " + index + " \u6CA1\u6709\u914D\u7F6E\u5BF9\u5E94\u7684\u795E\u7075ID");
                        return;
                    }
                    var lingqiCfg = this._proxy.getLingQiCfg(slIndex, 1);
                    if (!lingqiCfg) {
                        return;
                    }
                    this._showArgs = {
                        slIndex: slIndex,
                        index: index,
                        idx: this._proxy.getLingqiIdx(index),
                        hint: false,
                        isAct: true,
                        star: 0
                    };
                    this.updateTopView();
                    this.updateMiddleView();
                    this._view.descItem.updateShow(equipCfg.desc || '');
                    if (this._view.basePropGainList) {
                        this._view.basePropGainList.updateShow(equipCfg.gain_id);
                    }
                };
                return ShenlingLingqiBagTipsMdr;
            }(shenling.ShenLingLingQiTipsMdr));
            shenling.ShenlingLingqiBagTipsMdr = ShenlingLingqiBagTipsMdr;
            __reflect(ShenlingLingqiBagTipsMdr.prototype, "game.mod.shenling.ShenlingLingqiBagTipsMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenLingAttrMdr = /** @class */ (function (_super) {
                __extends(ShenLingAttrMdr, _super);
                function ShenLingAttrMdr() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ShenLingAttrMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(189 /* Shenling */);
                };
                ShenLingAttrMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                };
                ShenLingAttrMdr.prototype.updateView = function () {
                    this.updateTitleStr(game.getLanById("shenling_tips13" /* shenling_tips13 */));
                    this._type = this._showArgs[0];
                    this._index = this._showArgs[1];
                    if (this._index) {
                        this._showArgs.attrs = this._proxy.getAttrByIndex(this._index);
                    }
                    else {
                        this._showArgs.attrs = this._proxy.getAttrByType(this._type);
                    }
                    this.updateXianLiAttr();
                    //基础属性
                    var list = this._index ? this._proxy.getSpecialAttrsByIdx(this._index) : this._proxy.getSpecialAttrsByType(this._type);
                    if (!list || !list.length) {
                        this._view.name1.visible = this._view.scroller.visible = false;
                        return;
                    }
                    this._view.name1.visible = this._view.scroller.visible = true;
                    this._listAttr1.replaceAll(list);
                };
                ShenLingAttrMdr.prototype.updateBaseAttr = function () {
                };
                ShenLingAttrMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return ShenLingAttrMdr;
            }(mod.BaseAttrMdr));
            shenling.ShenLingAttrMdr = ShenLingAttrMdr;
            __reflect(ShenLingAttrMdr.prototype, "game.mod.shenling.ShenLingAttrMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var facade = base.facade;
            var Handler = base.Handler;
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var ShenLingMdr = /** @class */ (function (_super) {
                __extends(ShenLingMdr, _super);
                function ShenLingMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", shenling.ShenLingView);
                    _this._type = 1; //系列神灵
                    _this._changeExp = false; //经验变化
                    _this._skillIdx = 0; //当前点击的灵宝技能index
                    _this._curIndex = 0; //当前对应的上阵的神灵index，如果还未上阵但有可激活的情况，就是此可激活的神灵index
                    return _this;
                }
                ShenLingMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(189 /* Shenling */);
                    this._giftProxy = game.getProxy("27" /* Activity */, 246 /* ShenlingGift */);
                    this._view.list_lingbao.itemRenderer = mod.ShenLingSkillIcon;
                    this._view.list_lingbao.dataProvider = this._listSkill = new eui.ArrayCollection();
                    this._view.list_cost.itemRenderer = mod.CostIcon;
                    this._view.list_cost.dataProvider = this._listCost = new eui.ArrayCollection();
                    this._view.btn_jiban.setHintStyle(0, 14);
                    this._view.btn_shangzhen.setHintStyle(0, 14);
                };
                ShenLingMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.typeListComp.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.btn_jiban, egret.TouchEvent.TOUCH_TAP, this.onClickJiBan, this);
                    addEventListener(this._view.btn_shangzhen, egret.TouchEvent.TOUCH_TAP, this.onClickShangZhen, this);
                    addEventListener(this._view.btn_lv, egret.TouchEvent.TOUCH_TAP, this.onClickUpLv, this);
                    addEventListener(this._view.btn_oneKey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
                    addEventListener(this._view.icon_heji, egret.TouchEvent.TOUCH_TAP, this.onClickHeJi, this);
                    addEventListener(this._view.list_lingbao, eui.ItemTapEvent.ITEM_TAP, this.onClickLingBao, this);
                    addEventListener(this._view.btn_act, egret.TouchEvent.TOUCH_TAP, this.onClickAct, this);
                    addEventListener(this._view.btn_activity, TouchEvent.TOUCH_TAP, this.onClickActivity);
                    addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
                    this.onNt("on_shen_ling_update_info" /* ON_SHEN_LING_UPDATE_INFO */, this.onUpdateInfo, this);
                    this.onNt("on_shen_ling_ji_ban_update" /* ON_SHEN_LING_JI_BAN_UPDATE */, this.onUpdateJiBanHint, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onUpdateByPropIndex, this);
                    this.onNt("on_update_punshlist_type" /* ON_UPDATE_PUNSHLIST_TYPE */, this.onUpdateAct, this);
                    this.onNt("on_shenling_gift_info_update" /* ON_SHENLING_GIFT_INFO_UPDATE */, this.updateTalentGift, this);
                };
                ShenLingMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    mod.GuideMgr.getIns().recordSpecialGuideMap(4 /* Back */);
                    mod.GuideMgr.getIns().recordSpecialGuideMap(2 /* Shenling */);
                    this._view.typeListComp.updateListView(1 /* Main */);
                    this.onSwitchType(this.getDefaultType());
                    this.updateGift();
                    this.updateTalentGift();
                };
                ShenLingMdr.prototype.updateTalentGift = function () {
                    this._view.btn_gift.visible = this._giftProxy.canOpen();
                    this.updateShenlingGiftHint();
                };
                ShenLingMdr.prototype.updateGift = function () {
                    var isShow = !mod.PayUtil.checkFirstCharge();
                    this._view.btn_first.visible = isShow;
                    if (!isShow) {
                        return;
                    }
                    this._view.btn_first.updateGift(null, true, Handler.alloc(this, this.onClickFirst));
                };
                //类型选择规则，可激活的阵位 > 可升级或突破 > 顺序第一个激活的 > 默认首个
                ShenLingMdr.prototype.getDefaultType = function () {
                    for (var _i = 0, ShenLingTypeAry_12 = game.ShenLingTypeAry; _i < ShenLingTypeAry_12.length; _i++) {
                        var type = ShenLingTypeAry_12[_i];
                        var cfg = this._proxy.getFirstActByType(type);
                        if (cfg) {
                            this._curIndex = cfg.index;
                            return type;
                        }
                    }
                    //指引自动选中
                    var autoSel = mod.GuideMgr.getIns().hasGuideKey([35 /* ShenlingOneUpAutoSel */]); //会默认选中等级第2大的神灵
                    if (autoSel) {
                        var selType = void 0;
                        var selInfo = null;
                        for (var i = 1; i < game.ShenLingTypeAry.length; ++i) {
                            //从第2个开始查找
                            var type = game.ShenLingTypeAry[i];
                            var info = this._proxy.getTypeInfo(type);
                            if (!info || !info.upindex) {
                                continue;
                            }
                            if (!selInfo || selInfo.level < info.level) {
                                selInfo = info; //选中等级最大的
                                selType = type;
                            }
                        }
                        if (selInfo) {
                            this._curIndex = selInfo.upindex;
                            return selType;
                        }
                    }
                    for (var _a = 0, ShenLingTypeAry_13 = game.ShenLingTypeAry; _a < ShenLingTypeAry_13.length; _a++) {
                        var type = ShenLingTypeAry_13[_a];
                        if (this._proxy.canUpLv(type) || this._proxy.canBreakThrough(type)) {
                            var info = this._proxy.getTypeInfo(type);
                            if (info && info.upindex) {
                                this._curIndex = info.upindex;
                                return type;
                            }
                        }
                    }
                    for (var _b = 0, ShenLingTypeAry_14 = game.ShenLingTypeAry; _b < ShenLingTypeAry_14.length; _b++) {
                        var type = ShenLingTypeAry_14[_b];
                        if (this._proxy.isTypeActed(type)) {
                            return type;
                        }
                    }
                    return game.ShenLingTypeAry[0];
                };
                ShenLingMdr.prototype.onSwitchType = function (type) {
                    if (type === void 0) { type = 1; }
                    this._type = type;
                    this._typeCfg = this._proxy.getTypeCfg(this._type);
                    this._view.typeListComp.updateSelType(type);
                    this._changeExp = false;
                    this.onUpdateInfo();
                };
                ShenLingMdr.prototype.onHide = function () {
                    mod.GuideMgr.getIns().recordSpecialGuideMap(3 /* ShenlingAct */);
                    mod.GuideMgr.getIns().firstFailedPass = false;
                    mod.GuideMgr.getIns().clear(3 /* ShenlingAct */); //清除指引
                    mod.GuideMgr.getIns().clear(5 /* ShenlingOneUp */); //清除指引
                    mod.GuideMgr.getIns().clear(35 /* ShenlingOneUpAutoSel */); //清除指引
                    this._view.moItem.removeModel();
                    _super.prototype.onHide.call(this);
                    if (game.ActivityUtil.getFirstChargeCacheTimes() && !mod.PayUtil.checkFirstCharge()) {
                        mod.ViewMgr.getIns().showSecondPop("27" /* Activity */, "49" /* FirstCharge */);
                    }
                };
                ShenLingMdr.prototype.onUpdateInfo = function () {
                    this.updateTopInfo();
                    this.updateHeJiSkillInfo();
                    this.updateLingBaoSkillInfo();
                    this.updateLvInfo();
                    this.onUpdateAct();
                    this.updateHint();
                };
                ShenLingMdr.prototype.updateTopInfo = function () {
                    this._view.power.setPowerValue(this._proxy.getAllPowerByType(this._type));
                    var index = this._curIndex;
                    var info = this._proxy.getTypeInfo(this._type);
                    if (info && info.upindex) {
                        index = info.upindex;
                        this._view.power.btn_desc.visible = true;
                    }
                    else {
                        this._view.power.btn_desc.visible = false;
                    }
                    this._view.moItem.updateModel(index);
                };
                ShenLingMdr.prototype.updateHeJiSkillInfo = function () {
                    var typeInfo = this._proxy.getTypeInfo(this._type);
                    this._view.icon_heji.data = {
                        skill_index: this._typeCfg.heji_id,
                        is_act: typeInfo && typeInfo.level > 0,
                        lv: typeInfo && typeInfo.skilllevel || 0,
                        skill_type: 1 /* HeJi */
                    };
                };
                // 灵宝技能
                ShenLingMdr.prototype.updateLingBaoSkillInfo = function () {
                    var typeInfo = this._proxy.getTypeInfo(this._type);
                    var skillList = typeInfo && typeInfo.skill_list || [];
                    var list = [];
                    for (var _i = 0, _a = this._typeCfg.skill_array; _i < _a.length; _i++) {
                        var idx = _a[_i];
                        var isAct = skillList.indexOf(idx) > -1;
                        list.push({
                            skill_index: idx,
                            is_act: isAct,
                            hint: this._proxy.checkLingBaoSkillAct(this._type, idx)
                        });
                        if (this._skillIdx && this._skillIdx == idx && isAct) {
                            this.sendNt("surface_skill_update" /* SURFACE_SKILL_UPDATE */, isAct);
                            this._skillIdx = null;
                        }
                    }
                    this._listSkill.replaceAll(list);
                };
                ShenLingMdr.prototype.updateLvInfo = function () {
                    var info = this._proxy.getTypeInfo(this._type);
                    this._view.img_max.visible = false;
                    //神灵激活
                    mod.GuideMgr.getIns().clear(3 /* ShenlingAct */);
                    if ((!info || !info.upindex) && this._curIndex) {
                        this._view.gr_uplv.visible = false;
                        this._view.btn_act.visible = true;
                        this._view.btn_act.setHint(true);
                        mod.GuideMgr.getIns().show(3 /* ShenlingAct */, this._view.btn_act, Handler.alloc(this, this.onClickAct), 4 /* Back */);
                        return;
                    }
                    this._view.gr_uplv.visible = true;
                    this._view.btn_act.visible = false;
                    var lvCfg = this._proxy.getLevelCfg(info.level);
                    if (!lvCfg) {
                        return;
                    }
                    var cost = lvCfg.star_consume;
                    var time = 10;
                    if (cost && cost[0]) {
                        time *= cost[0][1];
                    }
                    this._view.lb_level.text = info.level + '';
                    var isMax = this._proxy.isMaxLv(this._type);
                    if (isMax) {
                        this._view.bar.showMax();
                    }
                    else {
                        this._view.bar.show(info.exp * time, lvCfg.exp * time, this._changeExp, info.level);
                    }
                    this._changeExp = false;
                    if (isMax) {
                        this._view.img_max.visible = true;
                        this._view.list_cost.visible = this._view.btn_lv.visible
                            = this._view.btn_oneKey.visible = this._view.btn_act.visible = false;
                        return;
                    }
                    this._view.btn_lv.visible = true;
                    this._view.list_cost.visible = true;
                    this.updateCost();
                };
                ShenLingMdr.prototype.updateCost = function () {
                    var info = this._proxy.getTypeInfo(this._type);
                    var lvCfg = this._proxy.getLevelCfg(info.level);
                    if (!lvCfg) {
                        return;
                    }
                    var cost = [];
                    if (this._proxy.isBreakThrough(this._type)) {
                        this._view.btn_lv.x = 261;
                        this._view.btn_lv.label = game.getLanById("weapon_tips34" /* weapon_tips34 */);
                        this._view.btn_lv.setYellow();
                        this._view.btn_lv.setHint(this._proxy.canBreakThrough(this._type));
                        this._view.bar.visible = this._view.gr_lv.visible = false;
                        cost.push.apply(cost, lvCfg.tupo_consume);
                        this._view.btn_oneKey.visible = false;
                        this._view.list_cost.y = 60;
                        mod.GuideMgr.getIns().show(5 /* ShenlingOneUp */, this._view.btn_lv, Handler.alloc(this, this.onClickUpLv)); //神灵突破指引
                        mod.GuideMgr.getIns().show(35 /* ShenlingOneUpAutoSel */, this._view.btn_lv, Handler.alloc(this, this.onClickUpLv)); //神灵突破指引
                    }
                    else {
                        this._view.list_cost.y = 81;
                        this._view.btn_lv.x = 100;
                        this._view.btn_lv.label = game.getLanById("uplv" /* uplv */);
                        this._view.btn_lv.setBlue();
                        this._view.bar.visible = this._view.gr_lv.visible = true;
                        cost.push.apply(cost, lvCfg.star_consume);
                        this._view.btn_oneKey.visible = true;
                        var isHint = this._proxy.canUpLv(this._type);
                        this._view.btn_lv.setHint(isHint);
                        this._view.btn_oneKey.setHint(isHint);
                        mod.GuideMgr.getIns().show(5 /* ShenlingOneUp */, this._view.btn_oneKey, Handler.alloc(this, this.onClickOneKey)); //神灵升级指引
                        mod.GuideMgr.getIns().show(35 /* ShenlingOneUpAutoSel */, this._view.btn_oneKey, Handler.alloc(this, this.onClickOneKey)); //神灵升级指引
                    }
                    this._listCost.replaceAll(cost);
                };
                ShenLingMdr.prototype.onClickList = function (e) {
                    if (!e) {
                        return;
                    }
                    var type = e.item.type;
                    var info = this._proxy.getTypeInfo(type);
                    if (!info || !info.upindex) {
                        var canActCfg = this._proxy.getFirstActByType(type);
                        if (!canActCfg) {
                            this._view.typeListComp.updateSelType(this._type);
                            mod.ViewMgr.getIns().showGainWaysTips(1451000004 /* ShenlingSuipian */);
                            return;
                        }
                        this._curIndex = canActCfg.index;
                    }
                    else {
                        this._curIndex = info.upindex;
                    }
                    mod.GuideMgr.getIns().clear(3 /* ShenlingAct */); //清除指引
                    this.onSwitchType(type);
                };
                ShenLingMdr.prototype.onClickAttr = function () {
                    mod.ViewMgr.getIns().showSecondPop("45" /* Shenling */, "03" /* ShenLingAttr */, [this._type]);
                };
                ShenLingMdr.prototype.onClickJiBan = function () {
                    mod.ViewMgr.getIns().showView("47" /* Jiban */, "01" /* JibanMain */, "02" /* ShenLing */);
                };
                ShenLingMdr.prototype.onClickShangZhen = function () {
                    mod.ViewMgr.getIns().showSecondPop("45" /* Shenling */, "02" /* ShenLingShangZhen */);
                };
                ShenLingMdr.prototype.onClickUpLv = function () {
                    var isBt = this._proxy.isBreakThrough(this._type);
                    if ((isBt && !this._proxy.canBreakThrough(this._type, true))
                        || (!isBt && !this._proxy.canUpLv(this._type, true))) {
                        return;
                    }
                    this._changeExp = true;
                    this._proxy.c2s_god_brother_levelup(this._type, isBt ? 3 : 1);
                };
                ShenLingMdr.prototype.onClickOneKey = function () {
                    if (!this._proxy.canUpLv(this._type, true)) {
                        return;
                    }
                    this._changeExp = true;
                    this._proxy.c2s_god_brother_levelup(this._type, 2);
                };
                ShenLingMdr.prototype.onClickHeJi = function (e) {
                    var sData = e.currentTarget.data;
                    var data = {
                        index: this._curIndex,
                        skill_index: sData.skill_index,
                        skill_type: 1 /* HeJi */
                    };
                    facade.showView("45" /* Shenling */, "05" /* ShenLingSkill */, data);
                };
                ShenLingMdr.prototype.onClickLingBao = function (e) {
                    var sData = e.item;
                    if (!sData) {
                        return;
                    }
                    this._skillIdx = sData.skill_index;
                    var skillData = this.getSkillStatue(sData.skill_index);
                    mod.ViewMgr.getIns().showSkillTips(sData.skill_index, skillData.is_act, Handler.alloc(this, this.clickLingBaoSkillHandler, [this._type, skillData.slot]), Handler.alloc(this, this.lingBaoCondHandler));
                };
                ShenLingMdr.prototype.getSkillStatue = function (skill_index) {
                    var skillList = this._typeCfg.skill_array;
                    var typeInfo = this._proxy.getTypeInfo(this._type);
                    var actedList = typeInfo && typeInfo.skill_list || [];
                    for (var i = 0; i < skillList.length; i++) {
                        var item = skillList[i];
                        if (item && item == skill_index) {
                            return {
                                is_act: actedList.indexOf(skill_index) > -1,
                                slot: i + 1
                            };
                        }
                    }
                    return { is_act: false, slot: 0 };
                };
                ShenLingMdr.prototype.onClickAct = function () {
                    if (this._curIndex) {
                        mod.GuideMgr.getIns().recordSpecialGuideMap(3 /* ShenlingAct */);
                        mod.GuideMgr.getIns().firstFailedPass = false;
                        this._proxy.c2s_god_brother_starup(this._curIndex);
                    }
                };
                ShenLingMdr.prototype.onClickActivity = function () {
                    mod.ViewMgr.getIns().showView("27" /* Activity */, "78" /* PunshList */);
                };
                ShenLingMdr.prototype.onClickFirst = function () {
                    mod.ViewMgr.getIns().showSecondPop("27" /* Activity */, "49" /* FirstCharge */);
                };
                /**点击灵宝技能激活按钮回调*/
                ShenLingMdr.prototype.clickLingBaoSkillHandler = function () {
                    var data = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        data[_i] = arguments[_i];
                    }
                    this._proxy.c2s_god_brother_s_skill(data[0], data[1]);
                };
                /**灵宝技能激活条件*/
                ShenLingMdr.prototype.lingBaoCondHandler = function () {
                    var info = this._proxy.getTypeInfo(this._type);
                    return !!(info && info.upindex);
                };
                ShenLingMdr.prototype.onUpdateByPropIndex = function (n) {
                    if (!this._proxy.isTypeActed(this._type)) {
                        return;
                    }
                    var list = n.body;
                    var costList = this._proxy.getConsumeList();
                    for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
                        var idx = list_4[_i];
                        if (costList.indexOf(idx) > -1) {
                            this.updateHint();
                            this.updateLingBaoSkillInfo();
                            this.updateCost();
                            break;
                        }
                    }
                };
                //羁绊红点
                ShenLingMdr.prototype.onUpdateJiBanHint = function () {
                    this._view.btn_jiban.setHint(this._proxy.getJiBanHint());
                };
                ShenLingMdr.prototype.onUpdateAct = function () {
                    var rankType = game.ActivityUtil.getRankTypeByOpenIdx(1041670102 /* Shenling */);
                    var type = game.ActivityUtil.getType();
                    if (rankType == type && mod.ViewMgr.getIns().checkViewOpen(1041670203 /* PunshList */)) {
                        this._actTime = game.ActivityUtil.getPunshListEndTime();
                        if (this._actTime > 0 && !TimeMgr.hasUpdateItem(this)) {
                            TimeMgr.addUpdateItem(this, 1000);
                            this.update(TimeMgr.time);
                        }
                        this._view.grp_act.visible = true;
                    }
                    else {
                        this._actTime = 0;
                        this._view.grp_act.visible = false;
                        TimeMgr.removeUpdateItem(this);
                    }
                };
                ShenLingMdr.prototype.updateHint = function () {
                    this._view.typeListComp.updateListHint(1 /* Main */); //类型按钮红点
                    this._view.btn_shangzhen.setHint(this._proxy.getShangZhenHint()); //上阵红点
                    this.onUpdateJiBanHint();
                    this.onUpdateActHint();
                };
                ShenLingMdr.prototype.onUpdateActHint = function () {
                    if (this._view.grp_act.visible) {
                        var rankType = game.ActivityUtil.getRankTypeByOpenIdx(1041670102 /* Shenling */);
                        this._view.btn_activity.setHint(mod.HintMgr.getHint(game.ActivityUtil.getSurfaceHintNodes(rankType)));
                    }
                };
                ShenLingMdr.prototype.update = function (time) {
                    var leftTime = this._actTime - time.serverTimeSecond;
                    if (leftTime <= 0) {
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    if (leftTime <= 0) {
                        this._view.lab_time.text = '';
                        return;
                    }
                    var format = 'mm分ss秒';
                    if (leftTime >= game.Second.Day) {
                        format = 'dd天HH时';
                    }
                    else if (leftTime >= game.Second.Hour) {
                        format = 'HH时mm分';
                    }
                    this._view.lab_time.text = game.TimeUtil.formatSecond(leftTime, format) + "";
                };
                ShenLingMdr.prototype.onClickGift = function () {
                    facade.showView("27" /* Activity */, "92" /* ShenlingGift */);
                    this._giftProxy.giftHint = false;
                    this.updateShenlingGiftHint();
                };
                ShenLingMdr.prototype.updateShenlingGiftHint = function () {
                    this._view.btn_gift.setHint(this._giftProxy.giftHint);
                };
                return ShenLingMdr;
            }(game.EffectMdrBase));
            shenling.ShenLingMdr = ShenLingMdr;
            __reflect(ShenLingMdr.prototype, "game.mod.shenling.ShenLingMdr", ["base.UpdateItem"]);
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            /**
             * 上阵逻辑处理：
             * 只有关闭界面或者点击一键上阵按钮，才是最终的上阵 （功能会议时候提出假上阵展示）
             */
            var ShenLingShangZhenMdr = /** @class */ (function (_super) {
                __extends(ShenLingShangZhenMdr, _super);
                function ShenLingShangZhenMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", shenling.ShenLingShangZhenView);
                    _this._selectedType = 0 /* Default */; //当前类型按钮选择
                    _this._selectedList = []; //当前选择的神灵index
                    _this._maxType = 6; //神灵类型数量
                    return _this;
                }
                ShenLingShangZhenMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(189 /* Shenling */);
                    this._view.list.itemRenderer = mod.AvatarIconLongPress;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.list_menu.itemRenderer = mod.ShenlingTypeBtn;
                    this._view.list_menu.dataProvider = this._listMenu = new eui.ArrayCollection();
                };
                ShenLingShangZhenMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickListMenu, this);
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    addEventListener(this._view.btn_oneKey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
                    this.onNt("on_shen_ling_update_info" /* ON_SHEN_LING_UPDATE_INFO */, this.updateList, this);
                };
                ShenLingShangZhenMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.currentState = game.ShenLingTypeAry.length + '';
                    this._listMenu.replaceAll(game.ShenLingTypeBtnAry);
                    //初始选择所有已上阵的神灵index
                    for (var _i = 0, ShenLingTypeAry_15 = game.ShenLingTypeAry; _i < ShenLingTypeAry_15.length; _i++) {
                        var type = ShenLingTypeAry_15[_i];
                        var list = this._proxy.getTypeInfo(type);
                        this._selectedList[type] = list && list.upindex || 0;
                    }
                    this.onSwitchType();
                    this._view.list_menu.selectedIndex = 0;
                    this.updateBtnHint();
                };
                ShenLingShangZhenMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this.finallySelected();
                    this._selectedList = [];
                };
                ShenLingShangZhenMdr.prototype.onSwitchType = function (type) {
                    if (type === void 0) { type = 0 /* Default */; }
                    this._selectedType = type;
                    var list = this.getList();
                    var listData = [];
                    for (var _i = 0, list_5 = list; _i < list_5.length; _i++) {
                        var item = list_5[_i];
                        var info = this._proxy.getInfoByIndex(item.index);
                        listData.push({
                            cfg: this._proxy.getShenLingCfg(item.index),
                            showHint: this.haveShangzhenHint(item.index),
                            isBattle: item.isBattle,
                            star: info && info.star || 0
                        });
                    }
                    this._listData.replaceAll(listData);
                    this.updateTopInfo();
                };
                ShenLingShangZhenMdr.prototype.updateList = function () {
                    this.onSwitchType(this._selectedType);
                    this.updateBtnHint();
                };
                ShenLingShangZhenMdr.prototype.getList = function () {
                    if (this._selectedType != 0 /* Default */) {
                        return this.getListData(this._selectedType);
                    }
                    var list = [];
                    var _list = [];
                    for (var _i = 0, ShenLingTypeAry_16 = game.ShenLingTypeAry; _i < ShenLingTypeAry_16.length; _i++) {
                        var i = ShenLingTypeAry_16[_i];
                        var typeList = this.getListData(i);
                        if (!typeList || !typeList.length) {
                            continue;
                        }
                        var item = typeList.shift();
                        list.push(item);
                        _list.push.apply(_list, typeList);
                    }
                    list = list.concat(_list);
                    return list;
                };
                ShenLingShangZhenMdr.prototype.getListData = function (type) {
                    var list = [];
                    var infoList = this._proxy.getActedListByType(type);
                    for (var _i = 0, infoList_1 = infoList; _i < infoList_1.length; _i++) {
                        var info = infoList_1[_i];
                        var data = {
                            index: info.index.toNumber(),
                            isBattle: false
                        };
                        if (this.isBattle(type, info.index.toNumber())) {
                            data.isBattle = true;
                            list.unshift(data);
                        }
                        else {
                            list.push(data);
                        }
                    }
                    return list;
                };
                //是否上阵
                ShenLingShangZhenMdr.prototype.isBattle = function (type, index) {
                    var upindex = this._selectedList[type];
                    return upindex && upindex == index;
                };
                ShenLingShangZhenMdr.prototype.updateTopInfo = function () {
                    var selectedList = [];
                    for (var _i = 0, ShenLingTypeAry_17 = game.ShenLingTypeAry; _i < ShenLingTypeAry_17.length; _i++) {
                        var type = ShenLingTypeAry_17[_i];
                        if (this._selectedList[type]) {
                            selectedList.push(this._selectedList[type]);
                        }
                    }
                    for (var i = 0; i < this._maxType; i++) {
                        var index = selectedList[i];
                        var avatarData = null;
                        if (index) {
                            var info = this._proxy.getInfoByIndex(index);
                            avatarData = {
                                cfg: this._proxy.getShenLingCfg(index),
                                star: info && info.star || 0,
                                isBattle: true,
                                showHint: false
                            };
                        }
                        this._view["item" + i].data = avatarData;
                    }
                };
                ShenLingShangZhenMdr.prototype.onClickListMenu = function (e) {
                    if (!e) {
                        return;
                    }
                    var type = e.item;
                    if (type == this._selectedType) {
                        return;
                    }
                    if (type != 0) {
                        var info = this._proxy.getTypeInfo(type);
                        if (!info || !info.upindex) {
                            game.PromptBox.getIns().show(game.getLanById("shenling_tips5" /* shenling_tips5 */));
                            this._view.list_menu.selectedIndex = game.ShenLingTypeBtnAry.indexOf(this._selectedType);
                            return;
                        }
                    }
                    this._view.scroller.viewport.scrollV = 0;
                    this.onSwitchType(type);
                };
                ShenLingShangZhenMdr.prototype.onClickList = function (e) {
                    if (!e || !e.item) {
                        return;
                    }
                    var data = e.item;
                    var type = this._proxy.getShenLingType(data.cfg.index);
                    if (this._selectedList[type] == data.cfg.index) {
                        game.PromptBox.getIns().show(game.getLanById("shenling_tips15" /* shenling_tips15 */));
                        return;
                    }
                    var preIndex = this._selectedList[type];
                    var curIndex = data.cfg.index;
                    var preIdx = 0;
                    var curIdx = 0;
                    var size = this._listData.source.length;
                    for (var i = 0; i < size; i++) {
                        var item = this._listData.source[i];
                        if (item && item.cfg.index == preIndex) {
                            preIdx = i;
                        }
                        if (item && item.cfg.index == curIndex) {
                            curIdx = i;
                        }
                    }
                    this._selectedList[type] = curIndex;
                    var curInfo = this._proxy.getInfoByIndex(curIndex);
                    var curData = {
                        cfg: this._proxy.getShenLingCfg(curIndex),
                        star: curInfo && curInfo.star || 0,
                        showHint: this.haveShangzhenHint(curIndex),
                        isBattle: true
                    };
                    this._listData.replaceItemAt(curData, preIdx);
                    var preInfo = this._proxy.getInfoByIndex(preIndex);
                    var preData = {
                        cfg: this._proxy.getShenLingCfg(preIndex),
                        star: preInfo && preInfo.star || 0,
                        showHint: this.haveShangzhenHint(preIndex),
                        isBattle: false
                    };
                    this._listData.replaceItemAt(preData, curIdx);
                    game.PromptBox.getIns().show(game.getLanById("shenling_tips14" /* shenling_tips14 */));
                    this.updateTopInfo();
                    this.updateBtnHint(type);
                };
                //一键上阵，选择所有类型阵位的最高战力
                ShenLingShangZhenMdr.prototype.onClickOneKey = function () {
                    var isBest = true;
                    for (var _i = 0, ShenLingTypeAry_18 = game.ShenLingTypeAry; _i < ShenLingTypeAry_18.length; _i++) {
                        var type = ShenLingTypeAry_18[_i];
                        var list = this._proxy.getActedListByType(type);
                        var bestIndex = list && list[0] ? list[0].index.toNumber() : 0;
                        if (this._selectedList[type] != bestIndex) {
                            this._selectedList[type] = bestIndex;
                            isBest = false;
                        }
                    }
                    if (isBest) {
                        game.PromptBox.getIns().show(game.getLanById("shenling_tips17" /* shenling_tips17 */));
                        return;
                    }
                    this.finallySelected();
                };
                ShenLingShangZhenMdr.prototype.finallySelected = function () {
                    for (var _i = 0, ShenLingTypeAry_19 = game.ShenLingTypeAry; _i < ShenLingTypeAry_19.length; _i++) {
                        var i = ShenLingTypeAry_19[_i];
                        var idx = this._selectedList[i];
                        if (idx) {
                            this._proxy.c2s_god_brother_uporchange(i, idx);
                        }
                    }
                };
                /**替换神灵后，若有高战力的需要出现红点*/
                ShenLingShangZhenMdr.prototype.updateBtnHint = function (curType) {
                    var isHint = false;
                    for (var _i = 0, _a = this._selectedList; _i < _a.length; _i++) {
                        var index = _a[_i];
                        if (!index) {
                            continue;
                        }
                        var type = this._proxy.getShenLingType(index);
                        if (curType && curType != type) {
                            continue;
                        }
                        var actedList = this._proxy.getActedListByType(type);
                        var curPower = this._proxy.getSinglePowerByIndex(index) || 0; //当前假上阵的神灵战力
                        for (var _b = 0, actedList_4 = actedList; _b < actedList_4.length; _b++) {
                            var info = actedList_4[_b];
                            if (info && info.index.toNumber() == index) {
                                continue;
                            }
                            if (this._proxy.getSinglePower(info) > curPower) {
                                isHint = true;
                                break;
                            }
                        }
                        if (isHint) {
                            break;
                        }
                    }
                    this._view.btn_oneKey.setHint(isHint);
                    mod.HintMgr.setHint(isHint, ["45" /* Shenling */, "01" /* ShenLingMain */ + "01" /* Main */, "02" /* ShenLingShangZhen */, "01" /* TabBtnType01 */]);
                };
                //上阵红点
                ShenLingShangZhenMdr.prototype.haveShangzhenHint = function (index) {
                    var type = this._proxy.getShenLingType(index);
                    var upIndex = this._selectedList[type];
                    var upPower = this._proxy.getSinglePowerByIndex(upIndex);
                    var curPower = this._proxy.getSinglePowerByIndex(index);
                    return curPower > upPower;
                };
                return ShenLingShangZhenMdr;
            }(game.MdrBase));
            shenling.ShenLingShangZhenMdr = ShenLingShangZhenMdr;
            __reflect(ShenLingShangZhenMdr.prototype, "game.mod.shenling.ShenLingShangZhenMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var Pool = base.Pool;
            /**神灵技能tips*/
            var ShenLingSkillTipsMdr = /** @class */ (function (_super) {
                __extends(ShenLingSkillTipsMdr, _super);
                function ShenLingSkillTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shenling.ShenLingSkillTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                ShenLingSkillTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.verticalCenter = 0;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(189 /* Shenling */);
                };
                ShenLingSkillTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                ShenLingSkillTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var data = this._showArgs;
                    if (!data) {
                        return;
                    }
                    this._type = this._proxy.getShenLingType(data.index);
                    this._cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, data.skill_index);
                    if (!this._cfg) {
                        return;
                    }
                    this.updateTopInfo();
                    this.addBaseInfo();
                    var type = data.skill_type;
                    if (type == 4 /* Talent */) {
                        this._view.currentState = 'talent';
                    }
                    else {
                        this._view.currentState = 'normal';
                    }
                    if (type == 4 /* Talent */) {
                        this.updateTalent();
                    }
                    else if (type == 3 /* PuGong */) {
                        this.updatePuGong();
                    }
                    else if (type == 1 /* HeJi */) {
                        this.updateHeJi();
                    }
                };
                /**顶部基础信息*/
                ShenLingSkillTipsMdr.prototype.updateTopInfo = function () {
                    var data = this._showArgs;
                    this._view.icon.data = {
                        skill_index: data.skill_index,
                        is_act: true,
                        skill_type: data.skill_type
                    };
                    var txt = '';
                    if (data.skill_type == 1 /* HeJi */) {
                        var info = this._proxy.getTypeInfo(this._type);
                        if (info && info.skilllevel) {
                            txt = "" + info.skilllevel + game.getLanById("tishi_43" /* tishi_43 */);
                        }
                    }
                    this._view.lb_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(this._cfg.name + ' ' + txt, game.ColorUtil.getColorByQuality1(this._cfg.quality)));
                    this._view.tips.updateShow(this._cfg.quality);
                    this._view.img_showType.source = "jineng_show_type_" + this._cfg.show_type;
                };
                /**通用的【技能效果】*/
                ShenLingSkillTipsMdr.prototype.addBaseInfo = function () {
                    var txt = this._cfg.describe;
                    var skillLv = 1; //技能等级，默认1
                    if (this._showArgs.skill_type == 1 /* HeJi */) {
                        var typeInfo = this._proxy.getTypeInfo(this._type);
                        skillLv = typeInfo && typeInfo.skilllevel || 1; //合计技能等级
                        txt = game.TextUtil.getSkillDesc(this._cfg, skillLv, false, true);
                    }
                    else if (this._showArgs.skill_type == 4 /* Talent */) {
                        var isAct = false;
                        var info = this._proxy.getInfoByIndex(this._showArgs.index);
                        var curStar = info ? info.star : 0;
                        var slCfg = this._proxy.getShenLingCfg(this._showArgs.index);
                        if (slCfg && slCfg.talent1) {
                            for (var _i = 0, _a = slCfg.talent1; _i < _a.length; _i++) {
                                var talent = _a[_i];
                                if (talent && talent[1] == this._showArgs.skill_index) {
                                    isAct = talent[0] <= curStar;
                                    break;
                                }
                            }
                        }
                        txt = game.TextUtil.addColor(txt, isAct ? 8585074 /* GREEN */ : 7835024 /* GRAY */);
                    }
                    var descItem = Pool.alloc(mod.BaseDescItem);
                    descItem.updateShow(txt, game.getLanById("sp_tips1" /* sp_tips1 */));
                    this.addToScroller(descItem);
                };
                /**普攻技能*/
                ShenLingSkillTipsMdr.prototype.updatePuGong = function () {
                    var cfg = game.getConfigByNameId("skill_level.json" /* SkillLv */, this._cfg.index + 1);
                    if (!cfg) {
                        return;
                    }
                    var attrComp = new mod.SkillAttrList();
                    var txtList = [];
                    for (var i = 0; i < game.ShenLingPuGongAttr.length; i++) {
                        txtList.push([game.ShenLingPuGongAttrName[i], this.getVal(game.ShenLingPuGongAttr[i])]);
                    }
                    attrComp.updateAttr(txtList);
                    this.addToScroller(attrComp);
                };
                /**ShenLingPuGongAttr 前两项来源 ConfigName.SkillLv，后一项来源 ConfigName.Skill*/
                ShenLingSkillTipsMdr.prototype.getVal = function (key) {
                    var cfg = game.getConfigByNameId("skill_level.json" /* SkillLv */, this._cfg.index + 1);
                    var rst = '';
                    switch (key) {
                        case 'skill_coefs':
                            rst = ((cfg.skill_coefs && cfg.skill_coefs[0] || 0) / 100) + '%';
                            break;
                        case 'fixdma':
                            rst = "" + (cfg.fixdma && cfg.fixdma[0] || 0);
                            break;
                        case 'next_cd':
                            rst = "" + this._cfg.cd / 1000 + game.getLanById("shijian_4" /* shijian_4 */);
                            break;
                    }
                    return rst;
                };
                /**天赋技能*/
                ShenLingSkillTipsMdr.prototype.updateTalent = function () {
                    var item = Pool.alloc(mod.BaseLabelItem);
                    item.setLabel(game.TextUtil.addColor(game.getLanById("shenling_tips8" /* shenling_tips8 */), 16757068 /* ORANGE */));
                    this.addToScroller(item);
                    this._view.img_acted.visible = this._view.lb_actDesc.visible = false;
                    var args = this._showArgs;
                    var cfg = this._proxy.getShenLingCfg(args.index);
                    if (!cfg) {
                        return;
                    }
                    var info = this._proxy.getInfoByIndex(cfg.index);
                    var num = 0; //激活所需星级
                    for (var _i = 0, _a = cfg.talent1; _i < _a.length; _i++) {
                        var item_1 = _a[_i];
                        if (item_1[1] == args.skill_index) {
                            num = item_1[0];
                            break;
                        }
                    }
                    if (info && info.star >= num) {
                        this._view.img_acted.visible = true;
                        return;
                    }
                    var str = "(" + (info && info.star || 0) + "/" + num + ")";
                    var txt = game.StringUtil.substitute(game.getLanById("shenling_tips9" /* shenling_tips9 */), [cfg.name + num, game.TextUtil.addColor(str, 16719376 /* RED */)]);
                    this._view.lb_actDesc.textFlow = game.TextUtil.parseHtml(txt);
                    this._view.lb_actDesc.visible = true;
                };
                /**合击技能*/
                ShenLingSkillTipsMdr.prototype.updateHeJi = function () {
                    var attrKeys = game.ShenLingHeJiAttrType[this._type];
                    var names = game.ShenLingHeJiAttrTypeName[this._type];
                    var attrComp = new mod.SkillAttrList();
                    var txtList = [];
                    for (var i = 0; i < attrKeys.length; i++) {
                        var name = void 0;
                        if (i == 0) {
                            name = game.TextUtil.getAttrsText(attrKeys[i]);
                        }
                        else {
                            name = names[i];
                        }
                        txtList.push([name, this.getHeJiVal(attrKeys[i])]);
                    }
                    attrComp.updateAttr(txtList);
                    this.addToScroller(attrComp);
                    var nameItem = Pool.alloc(mod.BaseNameItem);
                    nameItem.setTitle(game.getLanById("shenling_tips10" /* shenling_tips10 */));
                    this.addToScroller(nameItem);
                    var cfg = this._proxy.getTypeCfg(this._type);
                    if (!cfg) {
                        return;
                    }
                    var info = this._proxy.getTypeInfo(this._type);
                    var actedSkillList = info ? info.skill_list : [];
                    for (var _i = 0, _a = cfg.skill_array; _i < _a.length; _i++) {
                        var index = _a[_i];
                        var cfg_1 = game.getConfigByNameId("battle_skill.json" /* Skill */, index);
                        if (!cfg_1) {
                            continue;
                        }
                        var isAct = actedSkillList.indexOf(index) > -1;
                        var color = isAct ? 8585074 /* GREEN */ : 7835024 /* GRAY */;
                        var item = Pool.alloc(mod.BaseZhuangShiDescItem);
                        item.updateShow(game.TextUtil.addColor(cfg_1.name, color), game.TextUtil.addColor(cfg_1.describe, color));
                        this.addToScroller(item);
                    }
                };
                ShenLingSkillTipsMdr.prototype.getHeJiVal = function (key) {
                    var rst = '0';
                    switch (key) {
                        case 'cd':
                            rst = (this._cfg.cd / 1000) + game.getLanById("shijian_4" /* shijian_4 */);
                            break;
                        case 'probability':
                            var prob = this.getSkillProbability(this._cfg.index);
                            var info = this._proxy.getTypeInfo(this._type);
                            var actedSkillList = info ? info.skill_list : [];
                            for (var _i = 0, actedSkillList_1 = actedSkillList; _i < actedSkillList_1.length; _i++) {
                                var skillId = actedSkillList_1[_i];
                                if (skillId) {
                                    prob += this.getSkillProbability(skillId);
                                }
                            }
                            rst = Math.floor(prob / 100) + '%';
                            break;
                        default:
                            var attrs = this._proxy.getAttrByType(this._type);
                            if (attrs && attrs[key]) {
                                rst = attrs[key] + '';
                            }
                    }
                    return rst;
                };
                ShenLingSkillTipsMdr.prototype.getSkillProbability = function (skill_index) {
                    var skillLv = game.getConfigByNameId("skill_level.json" /* SkillLv */, skill_index + 1);
                    if (!skillLv || !skillLv.buff_effect) {
                        return 0;
                    }
                    var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, skillLv.buff_effect[0]);
                    if (buffCfg && buffCfg.probability != null) {
                        return buffCfg.probability;
                    }
                    return 0;
                };
                /**添加到scroller的滚动区域内*/
                ShenLingSkillTipsMdr.prototype.addToScroller = function (com) {
                    if (com) {
                        this._view.gr_attr.addChild(com);
                    }
                };
                ShenLingSkillTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._view.gr_attr.removeChildren();
                };
                return ShenLingSkillTipsMdr;
            }(game.MdrBase));
            shenling.ShenLingSkillTipsMdr = ShenLingSkillTipsMdr;
            __reflect(ShenLingSkillTipsMdr.prototype, "game.mod.shenling.ShenLingSkillTipsMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var ShenlingShanzhenSecondMainMdr = /** @class */ (function (_super) {
                __extends(ShenlingShanzhenSecondMainMdr, _super);
                function ShenlingShanzhenSecondMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._height = 1120;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "shenlingshangzhen",
                            mdr: shenling.ShenLingShangZhenMdr,
                            title: "shangzhen" /* shangzhen */,
                            hintTypes: ["45" /* Shenling */, "01" /* ShenLingMain */ + "01" /* Main */, "02" /* ShenLingShangZhen */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "baojuchuzhan",
                            mdr: null,
                            title: "shangzhen" /* shangzhen */,
                            hintTypes: []
                        }
                    ];
                    return _this;
                }
                ShenlingShanzhenSecondMainMdr.prototype.onTabCheck = function (index) {
                    var data = this._btnList.source[index];
                    if (data && data.btnType == "02" /* TabBtnType02 */) {
                        game.PromptBox.getIns().show("\u656C\u8BF7\u671F\u5F85"); //todo
                        return false;
                    }
                    return true;
                };
                return ShenlingShanzhenSecondMainMdr;
            }(mod.WndSecondMainMdr));
            shenling.ShenlingShanzhenSecondMainMdr = ShenlingShanzhenSecondMainMdr;
            __reflect(ShenlingShanzhenSecondMainMdr.prototype, "game.mod.shenling.ShenlingShanzhenSecondMainMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var TouchEvent = egret.TouchEvent;
            var ShenLingAwakenMdr = /** @class */ (function (_super) {
                __extends(ShenLingAwakenMdr, _super);
                function ShenLingAwakenMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shenling.ShenLingAwakenView);
                    _this.isEasyHide = true;
                    return _this;
                }
                ShenLingAwakenMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(189 /* Shenling */);
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._listReward = new eui.ArrayCollection();
                    this._view.list_cost.itemRenderer = mod.CostIcon3;
                    this._view.list_cost.dataProvider = this._listCost = new eui.ArrayCollection();
                };
                ShenLingAwakenMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn_awaken, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.onNt("on_shen_ling_update_info" /* ON_SHEN_LING_UPDATE_INFO */, this.updateView, this);
                };
                ShenLingAwakenMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this.updateView();
                };
                ShenLingAwakenMdr.prototype.updateView = function () {
                    var args = this._showArgs;
                    var info = this._proxy.getInfoByIndex(args.index);
                    if (!info) {
                        return;
                    }
                    var data = {
                        cfg: this._proxy.getShenLingCfg(args.index),
                        star: info.star,
                        showHint: false,
                        isBattle: false
                    };
                    this._view.item0.data = data;
                    this._view.item0.setGray(false);
                    var awakenStar = this._proxy.getMaxAwakenStar(args.index);
                    var data1 = {
                        cfg: this._proxy.getShenLingCfg(args.index),
                        star: info.star >= awakenStar ? info.star : info.star + 1,
                        showHint: false,
                        isBattle: false
                    };
                    this._view.item1.data = data1;
                    this._view.item1.setGray(false);
                    this._view.power.setPowerValue(info.attrs && info.attrs.showpower || 0);
                    var maxStar = this._proxy.getMaxAwakenStar(args.index);
                    var isMax = info.star >= maxStar;
                    this._view.btn_awaken.visible = !isMax;
                    this._view.img_max.visible = isMax;
                    var cfg = this._proxy.getStarCfg(args.index, isMax ? maxStar : info.star + 1);
                    if (!cfg) {
                        return;
                    }
                    this._listReward.replaceAll(cfg.star_award.concat());
                    this._listCost.replaceAll(cfg.star_consume.concat());
                    this._view.btn_awaken.setHint(this._proxy.canAwaken(args.index));
                };
                ShenLingAwakenMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ShenLingAwakenMdr.prototype.onClick = function () {
                    if (!this._proxy.canAwaken(this._showArgs.index, true)) {
                        return;
                    }
                    this._proxy.c2s_god_brother_starup(this._showArgs.index);
                };
                return ShenLingAwakenMdr;
            }(game.MdrBase));
            shenling.ShenLingAwakenMdr = ShenLingAwakenMdr;
            __reflect(ShenLingAwakenMdr.prototype, "game.mod.shenling.ShenLingAwakenMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var delayCall = base.delayCall;
            var Handler = base.Handler;
            var clearDelay = base.clearDelay;
            /**神迹*/
            var ShenLingShenJiMdr = /** @class */ (function (_super) {
                __extends(ShenLingShenJiMdr, _super);
                function ShenLingShenJiMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", shenling.ShenLingShenJiView);
                    _this._starMap = {}; //星级对应的天赋
                    _this.isEasyHide = true;
                    return _this;
                }
                ShenLingShenJiMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(189 /* Shenling */);
                    this._view.list.itemRenderer = shenling.ShenLingShenJiItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.list_awaken.itemRenderer = mod.Icon;
                    this._view.list_awaken.dataProvider = this._listAwaken = new eui.ArrayCollection();
                };
                ShenLingShenJiMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_shen_ling_reward_update" /* ON_SHEN_LING_REWARD_UPDATE */, this.updateList, this);
                };
                ShenLingShenJiMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._type = this._showArgs[0];
                    this._index = this._showArgs[1];
                    if (!this._index) {
                        return;
                    }
                    this._view.scroller.viewport.scrollV = 0;
                    this.updateInfo();
                    this.updateList();
                    if (this._proxy.haveAwakenStatue(this._index)) {
                        this._view.currentState = 'awaken';
                        this.updateAwakenReward();
                    }
                    else {
                        this._view.currentState = 'noAwaken';
                    }
                    var txt = '';
                    var keys = Object.keys(this._starMap);
                    for (var i = 0; i < keys.length; i++) {
                        var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, this._starMap[keys[i]]);
                        if (!cfg) {
                            continue;
                        }
                        txt += cfg.name + (i & 1 ? '\n' : '、');
                    }
                    this._view.lb_skillName.text = txt;
                    this._delayId = delayCall(Handler.alloc(this, this.updateScrollerView), 35);
                };
                ShenLingShenJiMdr.prototype.updateInfo = function () {
                    var info = this._proxy.getInfoByIndex(this._index);
                    var data = {
                        cfg: this._proxy.getShenLingCfg(this._index),
                        showHint: false,
                        star: info && info.star || 0,
                        isBattle: false
                    };
                    this._view.avatarItem.data = data;
                    this._view.avatarItem.setGray(false);
                    var cfg = this._proxy.getShenLingCfg(this._index);
                    this._view.lb_name.text = cfg.name;
                };
                ShenLingShenJiMdr.prototype.updateAwakenReward = function () {
                    var star = this._proxy.getMaxStar(this._index) + 1;
                    var cfg = this._proxy.getStarCfg(this._index, star);
                    this._listAwaken.replaceAll(cfg.star_award);
                };
                ShenLingShenJiMdr.prototype.updateList = function () {
                    var cfgObj = this._proxy.getStarCfgList(this._index);
                    var rewardList = this._proxy.model.rewardList[this._index] || [];
                    var info = this._proxy.getInfoByIndex(this._index);
                    var list = [];
                    var i = 0;
                    for (var star in cfgObj) {
                        var cfg = cfgObj[star];
                        if (cfg.awaken) {
                            continue;
                        }
                        list.push({
                            index: cfg.shenling_index,
                            cfg: cfg,
                            status: rewardList[i] || 0,
                            talent_index: this.getTalentIndex(cfg.shenling_star),
                            curStar: info && info.star || 0
                        });
                        i++;
                    }
                    this._listData.replaceAll(list);
                };
                ShenLingShenJiMdr.prototype.getTalentIndex = function (star) {
                    if (this._starMap[star]) {
                        return this._starMap[star];
                    }
                    var cfg = this._proxy.getShenLingCfg(this._index);
                    for (var _i = 0, _a = cfg.talent1; _i < _a.length; _i++) {
                        var item = _a[_i];
                        this._starMap[item[0]] = item[1];
                    }
                    return this._starMap[star];
                };
                ShenLingShenJiMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this.clearDelayId();
                };
                ShenLingShenJiMdr.prototype.updateScrollerView = function () {
                    var size = this._listData.source.length;
                    var curItemIndex = 0;
                    for (var i = 0; i < size; i++) {
                        var item = this._listData.source[i];
                        if (item && item.status != 2) {
                            curItemIndex = i;
                            break;
                        }
                    }
                    var layout = this._view.list.layout;
                    var gap = layout && layout.gap || 6;
                    var itemH = 152;
                    var scrollV = curItemIndex * itemH + gap * curItemIndex;
                    var viewport = this._view.scroller.viewport;
                    var contentH = viewport.contentHeight;
                    var viewH = this._view.scroller.height;
                    if (scrollV >= contentH - viewH) {
                        scrollV = contentH - viewH;
                    }
                    viewport.scrollV = scrollV;
                    this.clearDelayId();
                };
                ShenLingShenJiMdr.prototype.clearDelayId = function () {
                    if (this._delayId) {
                        clearDelay(this._delayId);
                    }
                };
                return ShenLingShenJiMdr;
            }(game.MdrBase));
            shenling.ShenLingShenJiMdr = ShenLingShenJiMdr;
            __reflect(ShenLingShenJiMdr.prototype, "game.mod.shenling.ShenLingShenJiMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var shenling;
        (function (shenling) {
            var facade = base.facade;
            var Handler = base.Handler;
            var Tween = base.Tween;
            var ShenLingUpStarMdr = /** @class */ (function (_super) {
                __extends(ShenLingUpStarMdr, _super);
                function ShenLingUpStarMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", shenling.ShenLingUpStarView);
                    _this._type = 1; //系列神灵
                    _this._selIdx = 0;
                    return _this;
                }
                ShenLingUpStarMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(189 /* Shenling */);
                    this._view.list_talent.itemRenderer = mod.ShenLingSkillIcon;
                    this._view.list_talent.dataProvider = this._listSkill = new eui.ArrayCollection();
                    this._view.list.itemRenderer = mod.AvatarItem;
                    this._view.list.dataProvider = this._listShenLing = new eui.ArrayCollection();
                    this._view.skill_normal.setBg('jinengkuang');
                };
                ShenLingUpStarMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.typeListComp.list_menu, eui.ItemTapEvent.ITEM_TAP, this.onClickListMenu, this);
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    addEventListener(this._view.list_talent, eui.ItemTapEvent.ITEM_TAP, this.onClickTalent, this);
                    addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickUp, this);
                    addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.btn_shenji, egret.TouchEvent.TOUCH_TAP, this.onClickShenJi, this);
                    addEventListener(this._view.skill_normal, egret.TouchEvent.TOUCH_TAP, this.onClickSkill, this);
                    addEventListener(this._view.evolveItem, egret.TouchEvent.TOUCH_TAP, this.onClickEvolveItem, this);
                    this.onNt("on_shen_ling_update_info" /* ON_SHEN_LING_UPDATE_INFO */, this.onUpdateInfo, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePowerView, this);
                    this.onNt("on_bag_update_by_prop_type_and_subtype" /* ON_BAG_UPDATE_BY_PROP_TYPE_AND_SUBTYPE */, this.onUpdateByPropTypeAndSubType, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onUpdateByPropIndex, this);
                    this.onNt("on_shen_ling_reward_update" /* ON_SHEN_LING_REWARD_UPDATE */, this.onUpdateHintByShenjiReward, this);
                    this.onNt("on_task_hint" /* ON_TASK_HINT */, this.onTaskHint, this);
                };
                ShenLingUpStarMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.typeListComp.updateListView(2 /* UpStar */);
                    var selType = this._proxy.getUpStarSelType();
                    this.onSwitchType(selType);
                };
                ShenLingUpStarMdr.prototype.onSwitchType = function (type) {
                    if (type === void 0) { type = 1; }
                    this._type = type;
                    this._typeCfg = this._proxy.getTypeCfg(this._type);
                    this._view.typeListComp.updateSelType(type);
                    var list = this.getListData();
                    this._selIdx = 0;
                    for (var i = 0; i < list.length; i++) {
                        var cfg = list[i].cfg;
                        if (this._proxy.canUpStar(cfg.index)) {
                            this._selIdx = i;
                            break;
                        }
                    }
                    for (var i = 0; i < list.length; i++) {
                        list[i].isSel = this._selIdx == i;
                    }
                    this._listShenLing.replaceAll(list);
                    this._view.list.selectedIndex = this._selIdx;
                    this._curIndex = list[this._selIdx].cfg.index;
                    if (this._selIdx > 3) {
                        this.moveScroller();
                    }
                    else {
                        this._view.scroller.stopAnimation();
                        this._view.scroller.viewport.scrollH = 0;
                    }
                    this.updateView();
                };
                ShenLingUpStarMdr.prototype.onHide = function () {
                    this._view.moItem.removeModel();
                    this._curIndex = null;
                    mod.GuideMgr.getIns().clear(25 /* ShenlingUpStar */); //清除指引
                    this._selIdx = 0;
                    Tween.remove(this._view.scroller);
                    _super.prototype.onHide.call(this);
                };
                ShenLingUpStarMdr.prototype.updateView = function () {
                    this._cfg = this._proxy.getShenLingCfg(this._curIndex);
                    if (!this._cfg) {
                        DEBUG && console.error("\u6CA1\u6709\u627E\u5230\u795E\u7075\u914D\u7F6E\uFF1A" + this._curIndex);
                        return;
                    }
                    this.updateInfo();
                };
                //下一个可以激活或升星的神灵
                ShenLingUpStarMdr.prototype.onUpdateInfo = function () {
                    var list = this._listShenLing.source;
                    var size = list.length;
                    var haveNext = false;
                    var selIdx = this._selIdx;
                    for (var i = 0; i < size; i++) {
                        var cfg = list[i].cfg;
                        if (this._proxy.canUpStar(cfg.index)) {
                            selIdx = i;
                            haveNext = true;
                            break;
                        }
                    }
                    //当前系列没有可以激活或升星的
                    if (!haveNext) {
                        //获取下一个有激活升星的系列
                        var nextType = this._proxy.getUpStarSelType(true);
                        if (nextType) {
                            this.onSwitchType(nextType);
                            return;
                        }
                    }
                    var preData = list[this._selIdx];
                    if (preData) {
                        preData.isSel = false;
                        this._listShenLing.itemUpdated(preData);
                    }
                    this._selIdx = selIdx;
                    var curData = list[this._selIdx];
                    curData.isSel = true;
                    this._listShenLing.itemUpdated(curData);
                    this._view.list.selectedIndex = this._selIdx;
                    this._curIndex = list[this._selIdx].cfg.index;
                    this.moveScroller();
                    this.updateView();
                };
                ShenLingUpStarMdr.prototype.moveScroller = function () {
                    // egret.callLater(() => {
                    // ScrollUtil.moveHToAssign(this._view.scroller, this._selIdx, 137, 0);
                    // }, this);
                };
                ShenLingUpStarMdr.prototype.updateInfo = function () {
                    var haveEvolve = this._proxy.haveEvolve(this._curIndex);
                    var isActed = this._proxy.isActed(this._curIndex);
                    var maxEvolve = this._proxy.isMaxEvolve(this._curIndex);
                    this._view.evolveItem.visible = haveEvolve && isActed && !maxEvolve;
                    if (this._view.evolveItem.visible) {
                        var nextQua = this._proxy.getNextEvolvedQuality(this._curIndex);
                        this._view.evolveItem.updateView(this._cfg, 1, nextQua);
                        this.updateEvolveHint();
                    }
                    this.updateTopInfo();
                    this.updateSkillInfo();
                    this.updateHint();
                };
                ShenLingUpStarMdr.prototype.getListData = function () {
                    var cfgList = this._proxy.getShenLingCfgListByType(this._type);
                    if (!cfgList || !cfgList.length) {
                        return null;
                    }
                    var typeInfo = this._proxy.getTypeInfo(this._type);
                    var battle = [];
                    var actOrUp = [];
                    var actedList = [];
                    var notAct = [];
                    for (var _i = 0, cfgList_11 = cfgList; _i < cfgList_11.length; _i++) {
                        var cfg = cfgList_11[_i];
                        var info = this._proxy.getInfoByIndex(cfg.index);
                        var isBattle = typeInfo && typeInfo.upindex && typeInfo.upindex == cfg.index;
                        var itemData = {
                            cfg: cfg,
                            showHint: this._proxy.getStarHintByIndex(cfg.index),
                            star: info && info.star || 0,
                            isBattle: !!isBattle,
                            isSel: false,
                            evolution: info && info.evolutions ? info.evolutions : 0 //进化神灵的进化次数
                        };
                        if (isBattle) {
                            // actOrUp.unshift(itemData);
                            battle.push(itemData);
                        }
                        else if (this._proxy.canUpStar(cfg.index)) {
                            actOrUp.push(itemData);
                        }
                        else if (itemData.star) {
                            actedList.push(itemData);
                        }
                        else {
                            notAct.push(itemData);
                        }
                    }
                    actOrUp.sort(this.sortFunc);
                    actedList.sort(this.sortFunc);
                    notAct.sort(this.sortFunc);
                    return battle.concat(actOrUp, actedList, notAct);
                };
                ShenLingUpStarMdr.prototype.sortFunc = function (a, b) {
                    if (a.cfg.quality == b.cfg.quality) {
                        return a.cfg.index - b.cfg.index;
                    }
                    return a.cfg.quality - b.cfg.quality;
                };
                ShenLingUpStarMdr.prototype.updatePowerView = function () {
                    var info = this._proxy.getInfoByIndex(this._curIndex);
                    this._view.power.btn_desc.visible = !!info;
                    var attr = info && info.attrs;
                    if (!attr || !Object.keys(attr).length) {
                        var cfg = this._proxy.getStarCfg(this._curIndex, 1);
                        if (cfg && cfg.star_property) {
                            attr = mod.RoleUtil.getAttr(cfg.star_property[0]);
                        }
                    }
                    this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
                    this._view.btn_god.updateGod(attr && attr.god ? attr.god : 0);
                };
                ShenLingUpStarMdr.prototype.updateTopInfo = function () {
                    this._view.moItem.updateModel(this._curIndex);
                    this.updatePowerView();
                    // let info = this._proxy.getInfoByIndex(this._curIndex);
                    // let curStar = info && info.star || 0;
                    // let maxUpStar = this._proxy.getMaxStar(this._curIndex);
                    // let maxStar = info && info.star > maxUpStar ? this._proxy.getMaxAwakenStar(this._curIndex) : maxUpStar;
                    // if (curStar > maxUpStar) {
                    //     this._view.starCom.updateStarSrc(curStar - maxUpStar, 'moon_yellow');
                    // } else {
                    //     this._view.starCom.updateStar(curStar, maxStar);
                    // }
                    this._view.starCom.updateSurfaceStar(this._curIndex);
                };
                ShenLingUpStarMdr.prototype.updateSkillInfo = function () {
                    var info = this._proxy.getInfoByIndex(this._curIndex);
                    var list = [];
                    for (var _i = 0, _a = this._cfg.talent1; _i < _a.length; _i++) {
                        var item = _a[_i];
                        var is_act = false;
                        if (info && item[0] <= info.star) {
                            is_act = true;
                        }
                        list.push({
                            skill_index: item[1],
                            is_act: is_act
                        });
                    }
                    this._listSkill.replaceAll(list);
                    this._view.skill_normal.data = {
                        skill_index: this._cfg.common,
                        is_act: !!info,
                        skill_type: 3 /* PuGong */
                    };
                };
                ShenLingUpStarMdr.prototype.updateCostInfo = function () {
                    var info = this._proxy.getInfoByIndex(this._curIndex);
                    var isAwaken = this._proxy.isAwaken(this._curIndex);
                    var isLvMax = info ? info.star >= this._proxy.getMaxStar(this._curIndex) : false;
                    mod.GuideMgr.getIns().clear(25 /* ShenlingUpStar */);
                    //觉醒状态
                    if (isAwaken) {
                        this._view.btn_up.updateJuexing();
                        this._view.btn_up.setHint(this._proxy.canAwaken(this._curIndex));
                        return;
                    }
                    //满级状态
                    if (isLvMax) {
                        this._view.btn_up.updateMaxStar();
                        this._view.btn_up.setHint(false);
                        return;
                    }
                    var cfg = this._proxy.getStarCfg(this._curIndex, info ? info.star + 1 : 1);
                    if (!cfg || !cfg.star_consume) {
                        return;
                    }
                    var tips = '';
                    var isAct = info && info.star;
                    if (isAct) {
                        var cfg1 = this._proxy.getStarCfg(this._curIndex, info.star);
                        var starPower = Math.floor(cfg1.star_power / 100);
                        tips = game.getLanById("upstar" /* upstar */) + game.getLanById("showpower" /* showpower */) + "\n"
                            + game.TextUtil.addColor("+" + starPower + "%", 2330156 /* GREEN */);
                    }
                    var cost = cfg.star_consume[0];
                    var commonCostId = this._proxy.getCommonCost(this._curIndex);
                    var costCnt = mod.BagUtil.getPropCntByIdx(cost[0]);
                    if (commonCostId) {
                        costCnt += mod.BagUtil.getPropCntByIdx(commonCostId);
                    }
                    this._view.btn_up.updateCost(cost, !!isAct, tips, true, costCnt);
                    var canUp = this._proxy.canUpStar(this._curIndex);
                    if (canUp) {
                        //请求所有升星的属性，为了升星弹窗属性展示
                        var maxStar = this._proxy.getMaxStar(this._curIndex);
                        var attrList = [];
                        for (var i = 1; i <= maxStar; i++) {
                            var starCfg = this._proxy.getStarCfg(this._curIndex, i);
                            if (starCfg && starCfg.star_property) {
                                attrList = attrList.concat(starCfg.star_property);
                            }
                        }
                        mod.RoleUtil.getAttrList(attrList);
                    }
                    this._view.btn_up.setHint(canUp);
                    if (canUp) {
                        mod.GuideMgr.getIns().show(25 /* ShenlingUpStar */, this._view.btn_up, Handler.alloc(this, this.onClickUp)); //任务指引
                    }
                };
                ShenLingUpStarMdr.prototype.onClickListMenu = function (e) {
                    if (!e) {
                        return;
                    }
                    var type = e.item.type;
                    if (type == this._type) {
                        return;
                    }
                    this.onSwitchType(type);
                };
                ShenLingUpStarMdr.prototype.onClickList = function (e) {
                    if (!e || !e.item) {
                        return;
                    }
                    var list = this._listShenLing.source;
                    var preData = list[this._selIdx];
                    if (preData) {
                        preData.isSel = false;
                        this._listShenLing.itemUpdated(preData);
                    }
                    var data = e.item;
                    data.isSel = true;
                    this._listShenLing.itemUpdated(data);
                    this._selIdx = e.itemIndex;
                    this._curIndex = data.cfg.index;
                    this.updateView();
                };
                ShenLingUpStarMdr.prototype.onClickUp = function () {
                    if (this._proxy.isAwaken(this._curIndex)) {
                        mod.ViewMgr.getIns().showSecondPop("45" /* Shenling */, "04" /* ShenLingAwaken */, {
                            type: this._type,
                            index: this._curIndex
                        });
                        return;
                    }
                    if (this._proxy.canUpStar(this._curIndex, true)) {
                        this._proxy.c2s_god_brother_starup(this._curIndex);
                    }
                };
                ShenLingUpStarMdr.prototype.onClickAttr = function () {
                    mod.ViewMgr.getIns().showSecondPop("45" /* Shenling */, "03" /* ShenLingAttr */, [this._type, this._curIndex]);
                };
                ShenLingUpStarMdr.prototype.onClickShenJi = function () {
                    mod.ViewMgr.getIns().showSecondPop("45" /* Shenling */, "06" /* ShenLingShenJi */, [this._type, this._curIndex]);
                };
                ShenLingUpStarMdr.prototype.onClickTalent = function (e) {
                    var sData = e.item;
                    var data = {
                        index: this._curIndex || 0,
                        skill_index: sData.skill_index,
                        skill_type: 4 /* Talent */
                    };
                    facade.showView("45" /* Shenling */, "05" /* ShenLingSkill */, data);
                };
                ShenLingUpStarMdr.prototype.onClickSkill = function (e) {
                    var sData = e.currentTarget.data;
                    var data = {
                        index: this._curIndex,
                        skill_index: sData.skill_index,
                        skill_type: 3 /* PuGong */
                    };
                    facade.showView("45" /* Shenling */, "05" /* ShenLingSkill */, data);
                };
                ShenLingUpStarMdr.prototype.updateHint = function () {
                    //升星按钮红点
                    this.updateCostInfo();
                    //神迹红点
                    this._view.btn_shenji.setHint(this._proxy.getShenJiRewardHint(this._curIndex));
                    //类型按钮红点
                    this._view.typeListComp.updateListHint(2 /* UpStar */);
                    //神灵列表
                    this.updateShenLingList();
                };
                ShenLingUpStarMdr.prototype.updateEvolveHint = function () {
                    if (this._view.evolveItem.visible) {
                        this._view.evolveItem.redPoint.visible = this._proxy.getEvolveHint(this._curIndex);
                    }
                };
                ShenLingUpStarMdr.prototype.updateShenLingList = function () {
                    var size = this._listShenLing.source.length;
                    var typeInfo = this._proxy.getTypeInfo(this._type);
                    for (var i = 0; i < size; i++) {
                        var item = this._listShenLing.source[i];
                        if (!item || !item.cfg) {
                            continue;
                        }
                        var index = item.cfg.index;
                        var info = this._proxy.getInfoByIndex(index);
                        item.star = info && info.star || 0;
                        item.showHint = this._proxy.getStarHintByIndex(index);
                        var isBattle = typeInfo && typeInfo.upindex && typeInfo.upindex == index;
                        item.isBattle = !!isBattle;
                        this._listShenLing.itemUpdated(item);
                    }
                };
                ShenLingUpStarMdr.prototype.onUpdateByPropTypeAndSubType = function (n) {
                    var list = n.body;
                    for (var type in list) {
                        if ((+type) == 11 /* Surface */) {
                            this.updateHint();
                            break;
                        }
                    }
                };
                ShenLingUpStarMdr.prototype.onUpdateByPropIndex = function (n) {
                    var list = n.body;
                    var costList = this._proxy.getConsumeList();
                    for (var _i = 0, list_6 = list; _i < list_6.length; _i++) {
                        var idx = list_6[_i];
                        if (costList.indexOf(idx) > -1) {
                            this.updateHint();
                            break;
                        }
                    }
                };
                //神迹奖励领取
                ShenLingUpStarMdr.prototype.onUpdateHintByShenjiReward = function () {
                    this.updateHint();
                };
                ShenLingUpStarMdr.prototype.onClickEvolveItem = function () {
                    mod.ViewMgr.getIns().showSecondPop("45" /* Shenling */, "11" /* ShenlingEvolve */, this._cfg);
                };
                ShenLingUpStarMdr.prototype.onTaskHint = function (n) {
                    var types = n.body;
                    if (types.indexOf(42 /* ShenlingEvolve */) > -1) {
                        this._view.typeListComp.updateListHint(2 /* UpStar */);
                        this.updateShenLingList();
                        this.updateEvolveHint();
                    }
                };
                return ShenLingUpStarMdr;
            }(game.EffectMdrBase));
            shenling.ShenLingUpStarMdr = ShenLingUpStarMdr;
            __reflect(ShenLingUpStarMdr.prototype, "game.mod.shenling.ShenLingUpStarMdr");
        })(shenling = mod.shenling || (mod.shenling = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=shenling.js.map