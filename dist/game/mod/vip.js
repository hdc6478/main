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
        var vip;
        (function (vip) {
            var VipPrivilegeItem = /** @class */ (function (_super) {
                __extends(VipPrivilegeItem, _super);
                function VipPrivilegeItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.vip.VipPrivilegeItemSkin";
                    return _this;
                }
                VipPrivilegeItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                };
                VipPrivilegeItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                VipPrivilegeItem.prototype.dataChanged = function () {
                    var data = this.data;
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(data || '');
                };
                return VipPrivilegeItem;
            }(mod.BaseListenerRenderer));
            vip.VipPrivilegeItem = VipPrivilegeItem;
            __reflect(VipPrivilegeItem.prototype, "game.mod.vip.VipPrivilegeItem");
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var vip;
        (function (vip) {
            var VipMainMdr = /** @class */ (function (_super) {
                __extends(VipMainMdr, _super);
                function VipMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Vip */,
                            icon: "VIPbiaoqiantubiao",
                            mdr: vip.VipMdr,
                            title: "VIP",
                            bg: "vip_bg0",
                            openIdx: 0,
                            hintTypes: ["28" /* Vip */, "01" /* VipMain */, "01" /* Vip */]
                        },
                        {
                            btnType: "02" /* VipPrivilege */,
                            icon: "VIPtequanbiaoqiantubiao",
                            mdr: vip.VipPrivilegeMdr,
                            title: "VIP",
                            bg: "vip_bg1",
                            openIdx: 0,
                            hintTypes: ["28" /* Vip */, "01" /* VipMain */, "02" /* VipPrivilege */]
                        }
                    ];
                    return _this;
                }
                return VipMainMdr;
            }(mod.WndBaseMdr));
            vip.VipMainMdr = VipMainMdr;
            __reflect(VipMainMdr.prototype, "game.mod.vip.VipMainMdr");
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var vip;
        (function (vip) {
            var VipModel = /** @class */ (function () {
                function VipModel() {
                    /** 当前vip等级索引 直接初始vip0*/
                    this.idx = 110000000;
                    /** 当前vip经验 */
                    this.exp = 0;
                    /** vip奖励信息 */
                    this.reward_list = {};
                    this.hintPath = ["28" /* Vip */, "01" /* VipMain */, "01" /* Vip */];
                }
                return VipModel;
            }());
            vip.VipModel = VipModel;
            __reflect(VipModel.prototype, "game.mod.vip.VipModel");
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var vip;
        (function (vip) {
            var c2s_vip_receive_gift = msg.c2s_vip_receive_gift;
            var c2s_vip_info = msg.c2s_vip_info;
            var s2c_vip_info = msg.s2c_vip_info;
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            /**
             * @description VIP系统
             */
            var VipProxy = /** @class */ (function (_super) {
                __extends(VipProxy, _super);
                function VipProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._isLogin = true; //是否登陆情况
                    _this._vipCfgs = [];
                    return _this;
                }
                Object.defineProperty(VipProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                VipProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new vip.VipModel();
                    this.onProto(s2c_vip_info, this.s2c_vip_info, this);
                };
                /**
                 * 领取礼包或购买
                 * @param type 1.领取2.购买
                 * @param idx
                 */
                VipProxy.prototype.c2s_vip_receive_gift = function (type, idx) {
                    var msg = new c2s_vip_receive_gift();
                    msg.type = type;
                    msg.idx = idx;
                    this.sendProto(msg);
                };
                VipProxy.prototype.c2s_vip_info = function () {
                    this.sendProto(new c2s_vip_info());
                };
                VipProxy.prototype.s2c_vip_info = function (n) {
                    var msg = n.body;
                    var preIdx = this._model.idx;
                    if (msg.idx != null) {
                        this._model.idx = msg.idx;
                    }
                    if (msg.exp != null) {
                        this._model.exp = msg.exp;
                    }
                    if (msg.reward_list != null) {
                        for (var _i = 0, _a = msg.reward_list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            this._model.reward_list[item.idx] = item;
                        }
                    }
                    this.updateHint();
                    this.sendNt("update_vip_info" /* UPDATE_VIP_INFO */);
                    if (preIdx != this._model.idx && !this._isLogin) {
                        facade.showView("28" /* Vip */, "02" /* VipUp */);
                    }
                    if (this._isLogin) {
                        this._isLogin = false;
                    }
                };
                /**=================================================================*/
                /**当前能展示的最大vip等级的配置*/
                VipProxy.prototype.getShowVipCfgList = function () {
                    var cfgs = game.getConfigListByName("vip.json" /* Vip */);
                    var rst = [];
                    var maxShowVip = this.getMaxShowVip();
                    for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                        var cfg = cfgs_1[_i];
                        var type = Number((cfg.index + '').slice(5, 6));
                        if (cfg && type == 0 && mod.VipUtil.getShowVipLv(cfg.index) <= maxShowVip) {
                            rst.push(cfg);
                        }
                    }
                    return rst;
                };
                /**vip相关全部配置，F=0是vip等级*/
                VipProxy.prototype.getVipCfgList = function () {
                    if (this._vipCfgs && this._vipCfgs.length) {
                        return this._vipCfgs;
                    }
                    var cfgs = game.getConfigListByName("vip.json" /* Vip */);
                    var rst = [];
                    for (var _i = 0, cfgs_2 = cfgs; _i < cfgs_2.length; _i++) {
                        var cfg = cfgs_2[_i];
                        var type = Number((cfg.index + '').slice(5, 6));
                        if (cfg && type == 0) {
                            rst.push(cfg);
                        }
                    }
                    this._vipCfgs = rst;
                    return rst;
                };
                /**当前能展示的最大vip等级  1-10,11-13,14-16*/
                VipProxy.prototype.getMaxShowVip = function () {
                    var lv = mod.VipUtil.getShowVipLv(this._model.idx);
                    var maxLv;
                    if (lv < 10) {
                        maxLv = 10;
                    }
                    else if (lv < 13) {
                        maxLv = 13;
                    }
                    else {
                        maxLv = 16;
                    }
                    var maxVip = this.getVipCfgList().length - 1;
                    maxLv = Math.min(maxLv, maxVip);
                    return maxLv;
                };
                VipProxy.prototype.getVipCfg = function (idx) {
                    return game.getConfigByNameId("vip.json" /* Vip */, idx);
                };
                /**是否已达最大vip等级*/
                VipProxy.prototype.isMaxVip = function () {
                    var idx = this._model.idx;
                    if (!this.getVipCfg(idx + 1)) {
                        return true;
                    }
                    return false;
                };
                /**是否领取了奖励*/
                VipProxy.prototype.isActed = function (idx) {
                    var info = this._model.reward_list[idx];
                    return info && info.state == 2;
                };
                VipProxy.prototype.getRewardInfo = function (idx) {
                    return this._model.reward_list[idx];
                };
                VipProxy.prototype.canGetReward = function (idx) {
                    var info = this.getRewardInfo(idx);
                    if (info && info.state == 2) {
                        return false;
                    }
                    //小于等于当前vip等级，且不是领取状态，表示可以领取
                    if (idx <= this._model.idx && info && info.state != 2) {
                        return true;
                    }
                    // //当前vip等级，未领取但进度条已满
                    // if (idx == this._model.idx && info && info.state != 2) {
                    //     let cfg = this.getVipCfg(idx);
                    //     return this._model.exp >= cfg.levelup_exp;
                    // }
                    return false;
                };
                /**当前能购买奖励的vip的index*/
                VipProxy.prototype.getMinBuyIdx = function () {
                    var cfgs = this.getShowVipCfgList();
                    for (var _i = 0, cfgs_3 = cfgs; _i < cfgs_3.length; _i++) {
                        var cfg = cfgs_3[_i];
                        if (this.canBuy(cfg.index)) {
                            return cfg.index;
                        }
                    }
                    return 0;
                };
                //能否购买vip礼包
                VipProxy.prototype.canBuy = function (index) {
                    var cfg = this.getVipCfg(index);
                    if (!cfg) {
                        return false;
                    }
                    var info = this.getRewardInfo(index);
                    if (info && info.timer != 0 && info.timer > TimeMgr.time.serverTimeSecond) {
                        return false;
                    }
                    if (info && info.state == 2) {
                        var cost = void 0;
                        if (info.timer) {
                            cost = cfg.daily_cost_item[0];
                        }
                        else {
                            cost = cfg.cost_item[0];
                        }
                        return cost && mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                    }
                    var vipLv = mod.VipUtil.getShowVipLv(index);
                    if (vipLv == 0) {
                        var cost = cfg.cost_item[0];
                        return cost && mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                    }
                    return false;
                };
                VipProxy.prototype.updateHint = function () {
                    var list = this.getShowVipCfgList();
                    var hint = false;
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var cfg = list_1[_i];
                        if (this.canGetReward(cfg.index) || this.canBuy(cfg.index)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.hintPath);
                };
                VipProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("diamond" /* diamond */) > -1) {
                        this.updateHint();
                    }
                };
                /**当前vip等级的index*/
                VipProxy.prototype.getIdx = function () {
                    return this._model.idx;
                };
                /**当前vip经验*/
                VipProxy.prototype.getExp = function () {
                    return this._model.exp;
                };
                return VipProxy;
            }(game.ProxyBase));
            vip.VipProxy = VipProxy;
            __reflect(VipProxy.prototype, "game.mod.vip.VipProxy", ["game.mod.IVipProxy", "base.IProxy"]);
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var vip;
        (function (vip) {
            var TouchEvent = egret.TouchEvent;
            var VipBarComp = /** @class */ (function (_super) {
                __extends(VipBarComp, _super);
                function VipBarComp() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.vip.VipBarCompSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    _this._hub = new game.UIEftHub(_this);
                    return _this;
                }
                VipBarComp.prototype.onAddToStage = function () {
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.btn_charge.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                    this._proxy = game.getProxy("28" /* Vip */, 51 /* Vip */);
                };
                VipBarComp.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.btn_charge.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                    this._hub.removeAllEffects();
                    this._hub.clearAllFont();
                };
                VipBarComp.prototype.onClick = function () {
                    mod.ViewMgr.getIns().openCommonRechargeView();
                };
                VipBarComp.prototype.updateView = function (cfg) {
                    var model = this._proxy.model;
                    //当前vip等级
                    this._hub.addBmpFont((mod.VipUtil.getShowVipLv(model.idx)) + '', game.BmpTextCfg[211 /* Vip1 */], this.gr_vip, true, 1, true);
                    //已达最大vip等级
                    if (this._proxy.isMaxVip()) {
                        this.bar.show(model.exp, model.exp, false);
                        this._hub.clearFont(this.gr_vipNum, true);
                        this._hub.clearFont(this.gr_vipFont, true);
                        this.img_desc1.visible = false;
                        this.img_desc.source = 'ninyidadaozuigaoVIPdengji';
                        return;
                    }
                    if (cfg.index <= model.idx) {
                        cfg = this._proxy.getVipCfg(model.idx + 1);
                    }
                    var disExp = this.getDisExp(cfg.index);
                    this.bar.show(model.exp, disExp, false);
                    //需要充值多少钱到下一级 钱:经验=1:100
                    var need = Math.floor((disExp - model.exp) / 100);
                    this._hub.addBmpFont(need + '', game.BmpTextCfg[210 /* Vip */], this.gr_vipNum, true, 1, false, 0, true);
                    //下一级
                    this._hub.addBmpFont((mod.VipUtil.getShowVipLv(cfg.index)) + '', game.BmpTextCfg[210 /* Vip */], this.gr_vipFont);
                    this.img_desc.source = 'zaichongzhi';
                    this.img_desc1.visible = true;
                };
                /**两个vip等级exp差距*/
                VipBarComp.prototype.getDisExp = function (targetIdx) {
                    var idx = this._proxy.model.idx;
                    var exp = 0;
                    while (idx < targetIdx) {
                        var cfg = this._proxy.getVipCfg(idx);
                        exp += (cfg && cfg.levelup_exp || 0);
                        idx++;
                    }
                    return exp;
                };
                return VipBarComp;
            }(eui.Component));
            vip.VipBarComp = VipBarComp;
            __reflect(VipBarComp.prototype, "game.mod.vip.VipBarComp");
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var vip;
        (function (vip) {
            var VipEffComp = /** @class */ (function (_super) {
                __extends(VipEffComp, _super);
                function VipEffComp() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.vip.VipEffCompSkin";
                    _this._hub = new game.UIEftHub(_this);
                    return _this;
                }
                VipEffComp.prototype.updateView = function (cfg) {
                    this._hub.addBmpFont(mod.VipUtil.getShowVipLv(cfg.index) + '', game.BmpTextCfg[211 /* Vip1 */], this.gr_vip, true, 1, true);
                    this.img_tips.source = cfg.tagline1;
                };
                return VipEffComp;
            }(eui.Component));
            vip.VipEffComp = VipEffComp;
            __reflect(VipEffComp.prototype, "game.mod.vip.VipEffComp");
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var vip;
        (function (vip) {
            var VipPrivilegeBtn = /** @class */ (function (_super) {
                __extends(VipPrivilegeBtn, _super);
                function VipPrivilegeBtn() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.vip.VipPivilegeBtnSkin";
                    return _this;
                }
                VipPrivilegeBtn.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.addBmpFont("V" + mod.VipUtil.getShowVipLv(data), game.BmpTextCfg[210 /* Vip */], this.gr_vip, true, 1, true);
                };
                return VipPrivilegeBtn;
            }(mod.BaseRenderer));
            vip.VipPrivilegeBtn = VipPrivilegeBtn;
            __reflect(VipPrivilegeBtn.prototype, "game.mod.vip.VipPrivilegeBtn");
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var vip;
        (function (vip) {
            var VipMod = /** @class */ (function (_super) {
                __extends(VipMod, _super);
                function VipMod() {
                    return _super.call(this, "28" /* Vip */) || this;
                }
                VipMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                VipMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(51 /* Vip */, vip.VipProxy);
                };
                VipMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* VipMain */, vip.VipMainMdr);
                    this.regMdr("02" /* VipUp */, vip.VipUpMdr);
                };
                return VipMod;
            }(game.ModBase));
            vip.VipMod = VipMod;
            __reflect(VipMod.prototype, "game.mod.vip.VipMod");
            gso.modCls.push(VipMod);
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var vip;
        (function (vip) {
            var VipPrivilegeView = /** @class */ (function (_super) {
                __extends(VipPrivilegeView, _super);
                function VipPrivilegeView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.vip.VipPrivilegeSkin";
                    return _this;
                }
                return VipPrivilegeView;
            }(eui.Component));
            vip.VipPrivilegeView = VipPrivilegeView;
            __reflect(VipPrivilegeView.prototype, "game.mod.vip.VipPrivilegeView");
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var vip;
        (function (vip) {
            var VipUpView = /** @class */ (function (_super) {
                __extends(VipUpView, _super);
                function VipUpView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.vip.VipUpSkin";
                    return _this;
                }
                return VipUpView;
            }(eui.Component));
            vip.VipUpView = VipUpView;
            __reflect(VipUpView.prototype, "game.mod.vip.VipUpView");
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var vip;
        (function (vip) {
            var VipView = /** @class */ (function (_super) {
                __extends(VipView, _super);
                function VipView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.vip.VipSkin";
                    return _this;
                }
                return VipView;
            }(eui.Component));
            vip.VipView = VipView;
            __reflect(VipView.prototype, "game.mod.vip.VipView");
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var vip;
        (function (vip) {
            var TouchEvent = egret.TouchEvent;
            var Tween = base.Tween;
            var TimeMgr = base.TimeMgr;
            var VipMdr = /** @class */ (function (_super) {
                __extends(VipMdr, _super);
                function VipMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", vip.VipView);
                    _this._showTween = false;
                    _this._curIdx = 0; //当前展示vip的index
                    _this._effIdx = 0;
                    _this._effCompY = 0;
                    return _this;
                }
                VipMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(51 /* Vip */);
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.lb_privilege.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(this._view.lb_privilege.text, 0x41ff28));
                    this._effCompY = this._view.effComp.y;
                };
                VipMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_left, TouchEvent.TOUCH_TAP, this.onClickLeft, this);
                    addEventListener(this._view.btn_right, TouchEvent.TOUCH_TAP, this.onClickRight, this);
                    addEventListener(this._view.btn_go, TouchEvent.TOUCH_TAP, this.onClickGoCharge, this);
                    addEventListener(this._view.lb_privilege, TouchEvent.TOUCH_TAP, this.onClickGo, this);
                    addEventListener(this._view.btn_buy, TouchEvent.TOUCH_TAP, this.onClickBuy, this);
                    this.onNt("update_vip_info" /* UPDATE_VIP_INFO */, this.onUpdateView, this);
                };
                VipMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._curIdx = this.getIdx();
                    this.updateView();
                };
                VipMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    if (TimeMgr.hasUpdateItem(this)) {
                        TimeMgr.removeUpdateItem(this);
                    }
                    this._showTween = false;
                    Tween.remove(this._view.effComp);
                    this._view.effComp.y = this._effCompY;
                    this._cost = null;
                };
                //跳到下一个可以领取奖励的，没有则是当前等级的下一级
                VipMdr.prototype.getIdx = function () {
                    var minIdx = this._proxy.getMinBuyIdx();
                    if (minIdx) {
                        return minIdx;
                    }
                    var idx = this._proxy.model.idx;
                    if (this._proxy.isMaxVip()) {
                        return idx;
                    }
                    return idx + 1;
                };
                VipMdr.prototype.onUpdateView = function () {
                    this._curIdx = this.getIdx();
                    this.updateView();
                };
                VipMdr.prototype.updateView = function () {
                    var cfg = this._proxy.getVipCfg(this._curIdx);
                    if (!cfg) {
                        return;
                    }
                    this._view.btn_left.visible = (mod.VipUtil.getShowVipLv(this._curIdx)) != 0;
                    this._view.btn_left.setHint(this.getBtnHint());
                    this._view.btn_right.visible = this.canShowRightBtn();
                    this._view.btn_right.setHint(this.getBtnHint(false));
                    this._view.img_next.text = game.StringUtil.substitute(game.getLanById("vip_tips1" /* vip_tips1 */), [mod.VipUtil.getVipStr(this._curIdx)]);
                    this._view.img_vipdesc.source = game.ResUtil.getUiPng(cfg.tagline2);
                    var info = this._proxy.getRewardInfo(this._curIdx);
                    var curTime = TimeMgr.time.serverTimeSecond;
                    this._view.lb_time.text = '';
                    var rewards;
                    if (info && info.timer != 0 && info.timer > curTime) {
                        this._view.btn_buy.visible = this._view.btn_go.visible = false;
                        var leftTime = info.timer - curTime;
                        this.updateTime(leftTime);
                        TimeMgr.addUpdateItem(this, leftTime > game.Second.Hour ? 1000 * 60 : 1000);
                        rewards = cfg.daily_gift_bag;
                    }
                    else if (info && info.state == 2) {
                        var cost = void 0;
                        if (info.timer) {
                            cost = cfg.daily_cost_item[0];
                        }
                        else {
                            cost = cfg.cost_item[0];
                        }
                        this._view.btn_buy.setCost(cost);
                        this._cost = cost;
                        this._view.btn_buy.visible = true;
                        this._view.btn_go.visible = false;
                        this._view.btn_buy.setHint(cost && mod.BagUtil.checkPropCnt(cost[0], cost[1]));
                        TimeMgr.removeUpdateItem(this);
                        rewards = info.timer ? cfg.daily_gift_bag : cfg.privilege_gift_bag; //有时间，表示非第一次购买
                    }
                    else {
                        var vipLv = mod.VipUtil.getShowVipLv(this._curIdx);
                        if (vipLv == 0) {
                            this._view.btn_buy.visible = true;
                            var cost = cfg.cost_item[0];
                            this._cost = cost;
                            this._view.btn_buy.setCost(cost);
                            this._view.btn_go.visible = false;
                            this._view.btn_buy.setHint(cost && mod.BagUtil.checkPropCnt(cost[0], cost[1]));
                        }
                        else {
                            this._view.btn_buy.visible = false;
                            this._view.btn_go.visible = true;
                            var canGet = this._proxy.canGetReward(this._curIdx);
                            this._view.btn_go.label = canGet ? game.getLanById("tishi_29" /* tishi_29 */) : game.getLanById("exp_pool15" /* exp_pool15 */);
                            this._view.btn_go.setHint(canGet);
                        }
                        TimeMgr.removeUpdateItem(this);
                        rewards = cfg.privilege_gift_bag;
                    }
                    this._listData.source = rewards;
                    this.removeEffect(this._effIdx);
                    this._view.gr_eff.y = cfg.modelY;
                    if (cfg.showmodel) {
                        this._effIdx = this.addEftByParent(cfg.showmodel, this._view.gr_eff, 0, 0, -1, null, 0, cfg.modelSize || 1);
                    }
                    else if (rewards && rewards[0]) {
                        var propCfg = game.GameConfig.getPropConfigById(rewards[0][0]);
                        if (propCfg && propCfg.param1) {
                            this._effIdx = this.addAnimate(propCfg.param1[0][0], this._view.gr_eff);
                        }
                    }
                    this.updateEffCompView();
                    this._view.barComp.updateView(cfg);
                    var ary = cfg && cfg.explain ? cfg.explain.split('#N') : [];
                    var cnt = ary.length;
                    this._view.lb_privilegecnt.text = game.StringUtil.substitute(game.getLanById("vip_tips2" /* vip_tips2 */), [cnt]);
                };
                VipMdr.prototype.updateEffCompView = function () {
                    if (!this._showTween) {
                        var cfg = this._proxy.getVipCfg(this._curIdx);
                        this._view.effComp.visible = true;
                        this._view.effComp.updateView(cfg);
                        this.showTween();
                    }
                    else {
                        Tween.remove(this._view.effComp);
                        this._view.effComp.visible = false;
                    }
                };
                VipMdr.prototype.showTween = function () {
                    this._showTween = true;
                    var y = this._effCompY;
                    Tween.get(this._view.effComp, { loop: true })
                        .to({ y: y + 15 }, 1000)
                        .to({ y: y }, 1000);
                };
                VipMdr.prototype.onClickLeft = function () {
                    this._curIdx--;
                    this.updateView();
                };
                VipMdr.prototype.onClickRight = function () {
                    if (!this.canShowRightBtn()) {
                        return;
                    }
                    this._curIdx++;
                    this.updateView();
                };
                VipMdr.prototype.canShowRightBtn = function () {
                    var curLv = mod.VipUtil.getShowVipLv(this._proxy.model.idx);
                    var nextLv = mod.VipUtil.getShowVipLv(this._curIdx);
                    var maxShowVip = this._proxy.getMaxShowVip();
                    if (curLv <= maxShowVip && nextLv + 1 > maxShowVip) {
                        return false;
                    }
                    return true;
                };
                VipMdr.prototype.onClickGoCharge = function () {
                    if (this._view.btn_go.redPoint.visible) {
                        this._proxy.c2s_vip_receive_gift(1, this._curIdx);
                        return;
                    }
                    mod.ViewMgr.getIns().openCommonRechargeView();
                };
                // 调整到vip特权界面
                VipMdr.prototype.onClickGo = function () {
                    mod.ViewMgr.getIns().showView("28" /* Vip */, "01" /* VipMain */, "02" /* VipPrivilege */);
                };
                VipMdr.prototype.onClickBuy = function () {
                    if (!this._cost || !mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                        return;
                    }
                    this._proxy.c2s_vip_receive_gift(2, this._curIdx);
                };
                VipMdr.prototype.update = function (time) {
                    var info = this._proxy.getRewardInfo(this._curIdx);
                    var cfg = this._proxy.getVipCfg(this._curIdx);
                    var leftTime = (info && info.timer || 0) - time.serverTimeSecond;
                    if (!info || !cfg || leftTime < 1) {
                        TimeMgr.removeUpdateItem(this);
                        this.updateView();
                        return;
                    }
                    this.updateTime(leftTime);
                };
                VipMdr.prototype.updateTime = function (leftTime) {
                    this._view.lb_time.text = game.TimeUtil.formatSecond(leftTime, leftTime > game.Second.Hour ? game.getLanById("time_tips1" /* time_tips1 */) : game.getLanById("time_tips2" /* time_tips2 */)) + '后可继续购买';
                };
                VipMdr.prototype.getBtnHint = function (isLeft) {
                    if (isLeft === void 0) { isLeft = true; }
                    var cfgList = this._proxy.getShowVipCfgList();
                    for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                        var cfg = cfgList_1[_i];
                        if (!cfg) {
                            continue;
                        }
                        if ((isLeft && cfg.index < this._curIdx) || (!isLeft && cfg.index > this._curIdx)) {
                            if (this._proxy.canBuy(cfg.index) || this._proxy.canGetReward(cfg.index)) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                return VipMdr;
            }(game.EffectMdrBase));
            vip.VipMdr = VipMdr;
            __reflect(VipMdr.prototype, "game.mod.vip.VipMdr", ["base.UpdateItem"]);
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var vip;
        (function (vip) {
            var Tween = base.Tween;
            var VipPrivilegeMdr = /** @class */ (function (_super) {
                __extends(VipPrivilegeMdr, _super);
                function VipPrivilegeMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", vip.VipPrivilegeView);
                    return _this;
                }
                VipPrivilegeMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(51 /* Vip */);
                    this._view.list.itemRenderer = vip.VipPrivilegeBtn;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.list_desc.itemRenderer = vip.VipPrivilegeItem;
                    this._view.list_desc.dataProvider = this._listDesc = new eui.ArrayCollection();
                };
                VipPrivilegeMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClick, this);
                };
                VipPrivilegeMdr.prototype.onShow = function () {
                    var _this = this;
                    _super.prototype.onShow.call(this);
                    var idx = this._proxy.model.idx;
                    if (!this._proxy.isMaxVip()) {
                        idx += 1;
                    }
                    var cfg = this._proxy.getVipCfg(idx);
                    this._view.barComp.updateView(cfg);
                    var cfgs = this._proxy.getShowVipCfgList();
                    var listData = [];
                    for (var _i = 0, cfgs_4 = cfgs; _i < cfgs_4.length; _i++) {
                        var cfg_1 = cfgs_4[_i];
                        if (cfg_1 && mod.VipUtil.getShowVipLv(cfg_1.index) != 0) {
                            listData.push(cfg_1.index);
                        }
                    }
                    this._listData.replaceAll(listData);
                    var selIdx = mod.VipUtil.getShowVipLv(idx) - 1;
                    this._view.list.selectedIndex = selIdx;
                    if (selIdx > 9) {
                        egret.callLater(function () {
                            mod.ScrollUtil.moveVToAssign(_this._view.scroller, selIdx, 84);
                        }, this);
                    }
                    this.updateRightView(idx); //todo
                };
                VipPrivilegeMdr.prototype.updateRightView = function (idx) {
                    var cfg = this._proxy.getVipCfg(idx);
                    var descAry = cfg && cfg.explain && cfg.explain.split('#N') || [];
                    this._listDesc.replaceAll(descAry);
                    this.addBmpFont("V" + mod.VipUtil.getShowVipLv(idx), game.BmpTextCfg[211 /* Vip1 */], this._view.gr_vip, true, 1, false, 0, true);
                };
                VipPrivilegeMdr.prototype.onHide = function () {
                    Tween.remove(this._view.scroller.viewport);
                    _super.prototype.onHide.call(this);
                };
                VipPrivilegeMdr.prototype.onClick = function (e) {
                    var index = e.item;
                    this.updateRightView(index);
                };
                return VipPrivilegeMdr;
            }(game.EffectMdrBase));
            vip.VipPrivilegeMdr = VipPrivilegeMdr;
            __reflect(VipPrivilegeMdr.prototype, "game.mod.vip.VipPrivilegeMdr");
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var vip;
        (function (vip) {
            var VipUpMdr = /** @class */ (function (_super) {
                __extends(VipUpMdr, _super);
                function VipUpMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", vip.VipUpView);
                    _this.isEasyHide = true;
                    return _this;
                }
                VipUpMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(51 /* Vip */);
                };
                VipUpMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                VipUpMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var idx = this._proxy.getIdx();
                    this.addBmpFont((mod.VipUtil.getShowVipLv(idx)) + '', game.BmpTextCfg[211 /* Vip1 */], this._view.gr_eff, true, 2, true);
                };
                VipUpMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return VipUpMdr;
            }(game.EffectMdrBase));
            vip.VipUpMdr = VipUpMdr;
            __reflect(VipUpMdr.prototype, "game.mod.vip.VipUpMdr");
        })(vip = mod.vip || (mod.vip = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=vip.js.map