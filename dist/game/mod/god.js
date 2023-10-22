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
        var god;
        (function (god) {
            var GodHauntedView = /** @class */ (function (_super) {
                __extends(GodHauntedView, _super);
                function GodHauntedView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodHauntedSkin";
                    return _this;
                }
                return GodHauntedView;
            }(eui.Component));
            god.GodHauntedView = GodHauntedView;
            __reflect(GodHauntedView.prototype, "game.mod.god.GodHauntedView");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodMod = /** @class */ (function (_super) {
                __extends(GodMod, _super);
                function GodMod() {
                    return _super.call(this, "60" /* God */) || this;
                }
                GodMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                GodMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(232 /* God */, god.GodProxy);
                };
                GodMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* GodMain */, god.GodMainMdr);
                    this.regMdr("02" /* GodCommonMain */, god.GodCommonMainMdr);
                    this.regMdr("03" /* GodGiftMain */, god.GodGiftMainMdr);
                    this.regMdr("04" /* GodTreasure */, god.GodTreasureMainMdr);
                    this.regMdr("08" /* GodHaunted */, god.GodHauntedMainMdr);
                    this.regMdr("10" /* GodHauntedActivate */, god.GodHauntedActivateMdr);
                    this.regMdr("05" /* GodHauntedFight */, god.GodHauntedFightMdr);
                    this.regMdr("06" /* GodHauntedDetail */, god.GodHauntedDetailMdr);
                    this.regMdr("11" /* GodAvatar */, god.GodAvatarMainMdr);
                    this.regMdr("12" /* GodDragonoath */, god.GodDragonoathMainMdr);
                    this.regMdr("13" /* GodTravelTip */, god.GodTravelTipMdr);
                    this.regMdr("14" /* GodTravelChoose */, god.GodTravelChooseMdr);
                    this.regMdr("15" /* GodBuffTips */, god.GodBuffTipsMdr);
                    this.regMdr("16" /* GodDragonoathBuffTips */, god.GodDragonoathBuffTipsMdr);
                };
                return GodMod;
            }(game.ModBase));
            god.GodMod = GodMod;
            __reflect(GodMod.prototype, "game.mod.god.GodMod");
            gso.modCls.push(GodMod);
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodAvatarView = /** @class */ (function (_super) {
                __extends(GodAvatarView, _super);
                function GodAvatarView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodAvatarSkin";
                    return _this;
                }
                return GodAvatarView;
            }(eui.Component));
            god.GodAvatarView = GodAvatarView;
            __reflect(GodAvatarView.prototype, "game.mod.god.GodAvatarView");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var GodTravelChooseItem = /** @class */ (function (_super) {
                __extends(GodTravelChooseItem, _super);
                function GodTravelChooseItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GodTravelChooseItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("60" /* God */).retProxy(232 /* God */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
                };
                GodTravelChooseItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.lab_name.text = this.data.name;
                    this.img_icon.source = "god_icon_head_" + this.data.itype;
                    this.btn.setHint(false);
                };
                GodTravelChooseItem.prototype.onClick = function () {
                    this._proxy.saveChoose({ map_type: this._proxy.model.map_type, index: this.data.itype });
                };
                return GodTravelChooseItem;
            }(mod.BaseRenderer));
            god.GodTravelChooseItem = GodTravelChooseItem;
            __reflect(GodTravelChooseItem.prototype, "game.mod.god.GodTravelChooseItem");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodTravelChooseView = /** @class */ (function (_super) {
                __extends(GodTravelChooseView, _super);
                function GodTravelChooseView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodTravelChooseSkin";
                    return _this;
                }
                return GodTravelChooseView;
            }(eui.Component));
            god.GodTravelChooseView = GodTravelChooseView;
            __reflect(GodTravelChooseView.prototype, "game.mod.god.GodTravelChooseView");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var GodTravelItem = /** @class */ (function (_super) {
                __extends(GodTravelItem, _super);
                function GodTravelItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GodTravelItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("60" /* God */).retProxy(232 /* God */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_get, this.onClickGet, this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onClickAdd, this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_reward, this.onClickReward, this);
                };
                GodTravelItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var info = this._proxy.getYouli(cfg.map_type);
                    this.name_item.updateShow(cfg.name);
                    if (!info) {
                        this.currentState = "default";
                        return;
                    }
                    this.end_time = info.endtime;
                    if (info.endtime > TimeMgr.time.serverTimeSecond) {
                        this.currentState = "ing";
                        this.onUpdateTime();
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                    else {
                        this.currentState = "reward";
                    }
                    this.img_icon.source = "god_icon_head_" + info.index;
                };
                GodTravelItem.prototype.update = function (time) {
                    this.onUpdateTime();
                };
                GodTravelItem.prototype.onUpdateTime = function () {
                    var leftTime = this.end_time - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        leftTime = 0;
                        this.currentState = "reward";
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    this.lab_time.text = "游历中：" + game.TimeUtil.formatSecond(leftTime, leftTime > game.Second.Day ? "d天HH时" : "HH时mm分");
                };
                GodTravelItem.prototype.onClickGet = function () {
                    this._proxy.c2s_tiandi_youli_get_rewards(this.data.map_type);
                };
                GodTravelItem.prototype.onClickAdd = function () {
                    mod.ViewMgr.getIns().showSecondPop("60" /* God */, "13" /* GodTravelTip */);
                };
                GodTravelItem.prototype.onClickReward = function () {
                    mod.ViewMgr.getIns().showBoxReward("", this.data.rewards);
                };
                return GodTravelItem;
            }(mod.BaseRenderer));
            god.GodTravelItem = GodTravelItem;
            __reflect(GodTravelItem.prototype, "game.mod.god.GodTravelItem", ["base.UpdateItem"]);
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var GodTravelTipItem = /** @class */ (function (_super) {
                __extends(GodTravelTipItem, _super);
                function GodTravelTipItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GodTravelTipItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("60" /* God */).retProxy(232 /* God */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_get, this.onClickGet, this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onClickAdd, this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.img_icon, this.onClickAdd, this);
                };
                GodTravelTipItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this._proxy.getYouli(this.data.map_type);
                    if (info) {
                        this.end_time = info.endtime;
                        this.btn_add.visible = false;
                        this.img_icon.source = "god_icon_head_" + info.index;
                        if (this.end_time <= TimeMgr.time.serverTimeSecond) {
                            this.currentState = "reward";
                            TimeMgr.removeUpdateItem(this);
                        }
                        else {
                            this.currentState = "default";
                            this.grp_time.visible = true;
                            this.onUpdateTime();
                            TimeMgr.addUpdateItem(this, 1000);
                        }
                    }
                    else {
                        this.currentState = "default";
                        this.grp_time.visible = false;
                        var data = this._proxy.getSaveChoose(this.data.map_type);
                        if (data) {
                            this.btn_add.visible = false;
                            this.img_icon.visible = true;
                            this.img_icon.source = "god_icon_head_" + data.index;
                        }
                        else {
                            this.btn_add.visible = true;
                            this.img_icon.visible = false;
                        }
                    }
                    this.name_item.updateShow(this.data.name);
                };
                GodTravelTipItem.prototype.update = function (time) {
                    this.onUpdateTime();
                };
                GodTravelTipItem.prototype.onUpdateTime = function () {
                    var leftTime = this.end_time - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        leftTime = 0;
                        this.currentState = "reward";
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    this.lab_time.text = game.TimeUtil.formatSecond(leftTime, leftTime > game.Second.Day ? "d天HH时" : "HH时mm分");
                };
                GodTravelTipItem.prototype.onClickGet = function () {
                    this._proxy.c2s_tiandi_youli_get_rewards(this.data.map_type);
                };
                GodTravelTipItem.prototype.onClickAdd = function () {
                    if (this.end_time > 0) {
                        return;
                    }
                    this._proxy.model.map_type = this.data.map_type;
                    mod.ViewMgr.getIns().showSecondPop("60" /* God */, "14" /* GodTravelChoose */);
                };
                return GodTravelTipItem;
            }(mod.BaseRenderer));
            god.GodTravelTipItem = GodTravelTipItem;
            __reflect(GodTravelTipItem.prototype, "game.mod.god.GodTravelTipItem", ["base.UpdateItem"]);
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodTravelTipView = /** @class */ (function (_super) {
                __extends(GodTravelTipView, _super);
                function GodTravelTipView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodTravelTipSkin";
                    return _this;
                }
                return GodTravelTipView;
            }(eui.Component));
            god.GodTravelTipView = GodTravelTipView;
            __reflect(GodTravelTipView.prototype, "game.mod.god.GodTravelTipView");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodTravelView = /** @class */ (function (_super) {
                __extends(GodTravelView, _super);
                function GodTravelView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodTravelSkin";
                    return _this;
                }
                return GodTravelView;
            }(eui.Component));
            god.GodTravelView = GodTravelView;
            __reflect(GodTravelView.prototype, "game.mod.god.GodTravelView");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodAvatarMainMdr = /** @class */ (function (_super) {
                __extends(GodAvatarMainMdr, _super);
                function GodAvatarMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: 'zhuanxubaxibiaoqiantubiao',
                            mdr: god.GodAvatarMdr,
                            title: "tiandi_act_type4" /* tiandi_act_type4 */,
                            bg: "bg_zhuanxubaxi",
                            hintTypes: ["60" /* God */, "01" /* GodMain */, "02" /* GodCommonMain */, "04" /* Type4 */, "02" /* Act */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: 'youlibiaoqiantubiao',
                            mdr: god.GodTravelMdr,
                            title: "youli" /* youli */,
                            // bg: "tiandilubeijingtu",
                            hintTypes: ["60" /* God */, "01" /* GodMain */, "02" /* GodCommonMain */, "04" /* Type4 */, "02" /* Act */, "02" /* TabBtnType02 */]
                        }
                    ];
                    return _this;
                }
                return GodAvatarMainMdr;
            }(mod.WndBaseMdr));
            god.GodAvatarMainMdr = GodAvatarMainMdr;
            __reflect(GodAvatarMainMdr.prototype, "game.mod.god.GodAvatarMainMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var ItemTapEvent = eui.ItemTapEvent;
            var Handler = base.Handler;
            var GodAvatarMdr = /** @class */ (function (_super) {
                __extends(GodAvatarMdr, _super);
                function GodAvatarMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", god.GodAvatarView);
                    _this._listData = new ArrayCollection();
                    _this._listLevel = new ArrayCollection();
                    _this._listSkill = new ArrayCollection();
                    return _this;
                }
                GodAvatarMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(232 /* God */);
                    this._view.list.itemRenderer = god.GodAvatarItem;
                    this._view.list.dataProvider = this._listData;
                    this._view.list_item.itemRenderer = god.GodDragonoathLvItemRender;
                    this._view.list_item.dataProvider = this._listLevel;
                    this._view.list_skill.itemRenderer = god.GodBuffItem;
                    this._view.list_skill.dataProvider = this._listSkill;
                    var text = this._view.lab_tips.text;
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(text, 2330156 /* GREEN */));
                };
                GodAvatarMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_activate, TouchEvent.TOUCH_TAP, this.onClick);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClick);
                    addEventListener(this._view.list_skill, ItemTapEvent.ITEM_TAP, this.onClickSkill);
                    addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClickSelect, this);
                    addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.lab_tips, TouchEvent.TOUCH_TAP, this.onClickJump);
                    this.onNt("on_update_avatar_info" /* ON_UPDATE_AVATAR_INFO */, this.onUpdateTab, this);
                };
                GodAvatarMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onInitTab();
                };
                GodAvatarMdr.prototype.onInitTab = function () {
                    var cfgArr = game.getConfigListByName("tiandi_shifang.json" /* TiandiShifang */);
                    this._listData.source = cfgArr;
                    //todo 初始化index
                    var index = this._proxy.getInitType4Index();
                    this.onUpdateIndex(index);
                };
                GodAvatarMdr.prototype.onUpdateTab = function () {
                    var cfgArr = game.getConfigListByName("tiandi_shifang.json" /* TiandiShifang */);
                    this._listData.replaceAll(cfgArr);
                    this.onUpdateView();
                };
                GodAvatarMdr.prototype.onUpdateIndex = function (index) {
                    this._view.list.selectedIndex = index;
                    this.onUpdateView();
                };
                GodAvatarMdr.prototype.onUpdateView = function () {
                    this._cfg = this._listData.source[this._view.list.selectedIndex];
                    this._view.name_item.updateShow(this._cfg.name);
                    this._info = this._proxy.getType4Info(this._cfg.itype);
                    var level = this._info && this._info.level || 0;
                    var activate = !!this._info;
                    this._view.currentState = activate ? "activate" : "default";
                    this._view.img_icon.source = game.ResUtil.getUiPng("god_big_icon_" + this._cfg.itype);
                    var cfg = game.getConfigByNameId("rebirth.json" /* Rebirth */, this._cfg.condtion);
                    this._view.lab_limit.text = mod.RoleUtil.getRebirthLvStr(cfg.index) + "\u6FC0\u6D3B"; //仙人${cfg.relv}转
                    if (mod.ViewMgr.getIns().checkRebirth(this._cfg.condtion)) {
                        this._view.btn_activate.visible = true;
                        this._view.grp_lab.visible = false;
                    }
                    else {
                        this._view.btn_activate.visible = false;
                        this._view.grp_lab.visible = true;
                    }
                    this.onUpdateLevel(level);
                    this.onUpdateUp();
                    var power = 0;
                    if (this._info && this._info.attrs) {
                        power = this._info.attrs.showpower;
                    }
                    this._view.power.setPowerValue(power);
                    var stage = Math.floor(level / 10) || 1;
                    var stageStr = game.ResUtil.getChineseFontStr(stage) + "j";
                    this.addBmpFont(stageStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv, false, 1, true);
                    this.onUpdateSkill();
                };
                GodAvatarMdr.prototype.onUpdateUp = function () {
                    var level = this._info && this._info.level || 0;
                    var exp = this._info && this._info.exp || 0;
                    this.maxLevel = this._proxy.getMaxLevelType4(this._cfg.itype);
                    if (level >= this.maxLevel) {
                        this._view.bar.showMax();
                    }
                    else {
                        var maxExp = this._proxy.getMaxExpType4(this._cfg.itype);
                        this._view.bar.show(exp * game.DEFAULT_EXP, maxExp * game.DEFAULT_EXP, false);
                    }
                    if (this._info) {
                        var cost = this._proxy.getCostType4(this._cfg.itype, level);
                        this._view.cost.updateShow(cost.cost[0]);
                        this._view.btn_up.setHint(mod.BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1]));
                    }
                    else {
                        this._view.btn_up.setHint(false);
                    }
                };
                GodAvatarMdr.prototype.onUpdateSkill = function () {
                    var skills = this._cfg.buffs;
                    var datas = [];
                    for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
                        var skill = skills_1[_i];
                        var data = {};
                        data.skillId = skill[0];
                        data.isAct = this._info && this._info.indexs && this._info.indexs.indexOf(skill[0]) > -1;
                        data.showHint = !data.isAct && this._info && this._info.level > skill[1];
                        data.cur = this._info && this._info.level || 0;
                        data.limit = skill[1];
                        datas.push(data);
                    }
                    this._listSkill.replaceAll(datas);
                };
                GodAvatarMdr.prototype.onUpdateLevel = function (level) {
                    var list = [];
                    for (var i = 0; i < 10; i++) {
                        var bool = level % 10 >= i + 1 || level % 10 == 0 && level > 0;
                        list.push(bool);
                    }
                    this._listLevel.replaceAll(list);
                };
                GodAvatarMdr.prototype.onClick = function (e) {
                    var t;
                    switch (e.currentTarget) {
                        case this._view.btn_activate:
                            if (!mod.ViewMgr.getIns().checkRebirth(this._cfg.condtion)) {
                                game.PromptBox.getIns().show(mod.ViewMgr.getIns().checkRebirthStr(this._cfg.condtion));
                                return;
                            }
                            t = 1 /* Activate */;
                            break;
                        case this._view.btn_up:
                            var cost = this._proxy.getCostType4(this._cfg.itype, this._info && this._info.level);
                            if (!mod.BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1], 1 /* Dialog */)) {
                                return;
                            }
                            t = 2 /* Up */;
                            break;
                        default:
                            return;
                    }
                    this._proxy.c2s_tiandi_shifang_level_up(t, this._cfg.itype);
                };
                GodAvatarMdr.prototype.onClickSelect = function (e) {
                    this.onUpdateIndex(e.itemIndex);
                };
                GodAvatarMdr.prototype.onClickAttr = function () {
                    mod.ViewMgr.getIns().showAttrTips(game.getLanById("soul14" /* soul14 */), this._info ? this._info.attrs : null);
                };
                GodAvatarMdr.prototype.onClickSkill = function (e) {
                    var _this = this;
                    var data = e.item;
                    var skillId = data.skillId;
                    var isAct = data.isAct;
                    var confirm = Handler.alloc(this, function () {
                        _this._proxy.c2s_tiandi_shifang_skill_active(_this._cfg.itype, e.itemIndex + 1);
                    });
                    var cur = data.cur;
                    var limit = data.limit;
                    mod.ViewMgr.getIns().showSecondPop("60" /* God */, "15" /* GodBuffTips */, {
                        skillId: skillId, isAct: isAct, confirm: confirm, cur: cur, limit: limit
                    });
                };
                GodAvatarMdr.prototype.onClickJump = function () {
                    mod.ViewMgr.getIns().showView("41" /* Xianlu */, "01" /* XianluMain */);
                };
                GodAvatarMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return GodAvatarMdr;
            }(game.EffectMdrBase));
            god.GodAvatarMdr = GodAvatarMdr;
            __reflect(GodAvatarMdr.prototype, "game.mod.god.GodAvatarMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var TouchEvent = egret.TouchEvent;
            var GodBuffTipsMdr = /** @class */ (function (_super) {
                __extends(GodBuffTipsMdr, _super);
                function GodBuffTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.SkillTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                GodBuffTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                };
                GodBuffTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct);
                    this.onNt("surface_skill_update" /* SURFACE_SKILL_UPDATE */, this.onInfoUpdate, this);
                };
                GodBuffTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                GodBuffTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                GodBuffTipsMdr.prototype.onClickAct = function () {
                    if (this._showArgs.cur < this._showArgs.limit) {
                        game.PromptBox.getIns().show(game.getLanById("dragon_tips4" /* dragon_tips4 */));
                        return;
                    }
                    var confirm = this._showArgs.confirm;
                    confirm && confirm.exec();
                };
                GodBuffTipsMdr.prototype.onInfoUpdate = function (n) {
                    var isAct = n.body;
                    this.updateAct(isAct);
                };
                GodBuffTipsMdr.prototype.updateView = function () {
                    var skillId = this._showArgs.skillId;
                    var isAct = this._showArgs.isAct;
                    this._view.skill.setData(skillId);
                    this._view.img_tips.visible = false;
                    var cfg = game.getConfigByNameId("buff.json" /* Buff */, skillId);
                    this._view.lab_name.text = cfg.name;
                    this._view.power.setPowerValue(cfg.powershow);
                    this._view.baseDescItem.updateShow(cfg.des, game.getLanById("sp_tips1" /* sp_tips1 */));
                    if (!isAct) {
                        this._view.icon.visible = false;
                        this._view.lab_limit.horizontalCenter = 0;
                        this._view.lab_limit.visible = true;
                        this._view.btn_act.horizontalCenter = 0;
                        var str = game.TextUtil.addEnoughColor(this._showArgs.cur, this._showArgs.limit);
                        this._view.lab_limit.textFlow = game.TextUtil.parseHtml("\u5316\u8EAB" + this._showArgs.limit + "\u7EA7\u6FC0\u6D3B\uFF1A" + str);
                    }
                    this.updateAct(isAct);
                };
                GodBuffTipsMdr.prototype.updateAct = function (isAct) {
                    this._view.currentState = isAct ? "act" : "default";
                };
                return GodBuffTipsMdr;
            }(game.MdrBase));
            god.GodBuffTipsMdr = GodBuffTipsMdr;
            __reflect(GodBuffTipsMdr.prototype, "game.mod.god.GodBuffTipsMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var ArrayCollection = eui.ArrayCollection;
            var GodTravelChooseMdr = /** @class */ (function (_super) {
                __extends(GodTravelChooseMdr, _super);
                function GodTravelChooseMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", god.GodTravelChooseView);
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                GodTravelChooseMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(232 /* God */);
                    this._view.list.itemRenderer = god.GodTravelChooseItem;
                    this._view.list.dataProvider = this._listData;
                };
                GodTravelChooseMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    // this.onNt(GodEvent.ON_UPDATE_TRAVEL_LIST_INFO, this.onClose, this);
                };
                GodTravelChooseMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                GodTravelChooseMdr.prototype.onUpdateView = function () {
                    this._listData.source = this._proxy.getYouliChoose();
                };
                GodTravelChooseMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return GodTravelChooseMdr;
            }(game.EffectMdrBase));
            god.GodTravelChooseMdr = GodTravelChooseMdr;
            __reflect(GodTravelChooseMdr.prototype, "game.mod.god.GodTravelChooseMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var GodTravelMdr = /** @class */ (function (_super) {
                __extends(GodTravelMdr, _super);
                function GodTravelMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", god.GodTravelView);
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                GodTravelMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(232 /* God */);
                    this._view.list.itemRenderer = god.GodTravelItem;
                    this._view.list.dataProvider = this._listData;
                };
                GodTravelMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClickGet);
                    addEventListener(this._view.btn_travel, TouchEvent.TOUCH_TAP, this.onClickTravel);
                    this.onNt("on_update_travel_info" /* ON_UPDATE_TRAVEL_INFO */, this.onUpdateView, this);
                };
                GodTravelMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                GodTravelMdr.prototype.onUpdateView = function () {
                    var cfgArr = this._proxy.getYouliArr();
                    this._listData.replaceAll(cfgArr);
                };
                GodTravelMdr.prototype.onClickGet = function () {
                    this._proxy.c2s_tiandi_youli_get_rewards();
                };
                GodTravelMdr.prototype.onClickTravel = function () {
                    mod.ViewMgr.getIns().showSecondPop("60" /* God */, "13" /* GodTravelTip */);
                };
                GodTravelMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return GodTravelMdr;
            }(game.EffectMdrBase));
            god.GodTravelMdr = GodTravelMdr;
            __reflect(GodTravelMdr.prototype, "game.mod.god.GodTravelMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var GodTravelTipMdr = /** @class */ (function (_super) {
                __extends(GodTravelTipMdr, _super);
                function GodTravelTipMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", god.GodTravelTipView);
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                GodTravelTipMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(232 /* God */);
                    this._view.list.itemRenderer = god.GodTravelTipItem;
                    this._view.list.dataProvider = this._listData;
                    this._view.btn_travel.label = "\u5F00\u59CB" + game.getLanById("tiandilu_tips_3" /* tiandilu_tips_3 */);
                };
                GodTravelTipMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_travel, TouchEvent.TOUCH_TAP, this.onClick);
                    this.onNt("on_update_travel_list_info" /* ON_UPDATE_TRAVEL_LIST_INFO */, this.onUpdateView, this);
                };
                GodTravelTipMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                GodTravelTipMdr.prototype.onUpdateView = function () {
                    var cfgArr = this._proxy.getYouliArr();
                    this._listData.replaceAll(cfgArr);
                };
                GodTravelTipMdr.prototype.onClick = function () {
                    this._proxy.c2s_tiandi_youli_paiqian(this._proxy.model.saveChoose);
                    this._proxy.model.saveChoose = [];
                    this.hide();
                };
                GodTravelTipMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return GodTravelTipMdr;
            }(game.EffectMdrBase));
            god.GodTravelTipMdr = GodTravelTipMdr;
            __reflect(GodTravelTipMdr.prototype, "game.mod.god.GodTravelTipMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var facade = base.facade;
            var GodDragonoathItem = /** @class */ (function (_super) {
                __extends(GodDragonoathItem, _super);
                function GodDragonoathItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GodDragonoathItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("60" /* God */).retProxy(232 /* God */);
                };
                GodDragonoathItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var info = this._proxy.getType3Info(cfg.itype);
                    var level = info && info.level || 0;
                    this.img_lock.visible = level == 0;
                    this.lab_level.text = "" + level;
                    this.name_item.updateShow(cfg.name);
                    this.img_icon.source = "god_icon_img_" + cfg.itype;
                };
                return GodDragonoathItem;
            }(mod.BaseRenderer));
            god.GodDragonoathItem = GodDragonoathItem;
            __reflect(GodDragonoathItem.prototype, "game.mod.god.GodDragonoathItem");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodDragonoathLvItemRender = /** @class */ (function (_super) {
                __extends(GodDragonoathLvItemRender, _super);
                function GodDragonoathLvItemRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GodDragonoathLvItemRender.prototype.dataChanged = function () {
                    this.img_icon.source = this.data ? "shengpin_huangse" : "shengpin_huise";
                };
                return GodDragonoathLvItemRender;
            }(eui.ItemRenderer));
            god.GodDragonoathLvItemRender = GodDragonoathLvItemRender;
            __reflect(GodDragonoathLvItemRender.prototype, "game.mod.god.GodDragonoathLvItemRender");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodDragonoathSuitItem = /** @class */ (function (_super) {
                __extends(GodDragonoathSuitItem, _super);
                function GodDragonoathSuitItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodDragonoathSuitItemSkin";
                    return _this;
                }
                GodDragonoathSuitItem.prototype.setData = function (info) {
                    this.data = info;
                    if (!this.data) {
                        return;
                    }
                    this.lab_cnt.text = info[0] + "\u9636";
                    var cfg = game.getConfigByNameId("buff.json" /* Buff */, info[1]);
                    this.img_icon.source = cfg.icon;
                };
                return GodDragonoathSuitItem;
            }(eui.Component));
            god.GodDragonoathSuitItem = GodDragonoathSuitItem;
            __reflect(GodDragonoathSuitItem.prototype, "game.mod.god.GodDragonoathSuitItem");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodDragonoathView = /** @class */ (function (_super) {
                __extends(GodDragonoathView, _super);
                function GodDragonoathView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodDragonoathSkin";
                    return _this;
                }
                return GodDragonoathView;
            }(eui.Component));
            god.GodDragonoathView = GodDragonoathView;
            __reflect(GodDragonoathView.prototype, "game.mod.god.GodDragonoathView");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var ArrayCollection = eui.ArrayCollection;
            var GodDragonoathBuffTipsMdr = /** @class */ (function (_super) {
                __extends(GodDragonoathBuffTipsMdr, _super);
                function GodDragonoathBuffTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.SkillNormalTipsView);
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                GodDragonoathBuffTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(232 /* God */);
                    this._view.list.itemRenderer = mod.BaseDescItem;
                    this._view.list.dataProvider = this._listData;
                };
                GodDragonoathBuffTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                GodDragonoathBuffTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                GodDragonoathBuffTipsMdr.prototype.updateView = function () {
                    var list = [];
                    var buff = this._proxy.getBuff(this._showArgs.index);
                    var buffcfg = game.getConfigByNameId("buff.json" /* Buff */, buff[1]);
                    this._view.skill.setData(buffcfg.index);
                    var lineSpacing = 10;
                    list.push({ desc: buffcfg.des, title: game.getLanById("general9" /* general9 */), lineSpacing: lineSpacing });
                    this._view.currentState = buffcfg.powershow ? "power" : "default";
                    if (buffcfg.powershow) {
                        this._view.power.setPowerValue(buffcfg.powershow);
                    }
                    this._view.lab_name.text = buffcfg.name;
                    this._view.img_type.visible = false;
                    this._view.baseDescItem.visible = false;
                    this._view.list.visible = true;
                    var cfg = game.getConfigByNameId("tiandi_tianlong_jihuo.json" /* TiandiTianlongJihuo */, this._showArgs.index);
                    for (var _i = 0, _a = cfg.buffs; _i < _a.length; _i++) {
                        var b = _a[_i];
                        if (b[0] == buff[0] + 1) {
                            var nextbuffcfg = game.getConfigByNameId("buff.json" /* Buff */, b[1]);
                            list.push({ desc: nextbuffcfg.des, title: game.getLanById("general10" /* general10 */), lineSpacing: lineSpacing });
                            break;
                        }
                    }
                    this._listData.replaceAll(list);
                };
                return GodDragonoathBuffTipsMdr;
            }(game.MdrBase));
            god.GodDragonoathBuffTipsMdr = GodDragonoathBuffTipsMdr;
            __reflect(GodDragonoathBuffTipsMdr.prototype, "game.mod.god.GodDragonoathBuffTipsMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodDragonoathMainMdr = /** @class */ (function (_super) {
                __extends(GodDragonoathMainMdr, _super);
                function GodDragonoathMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: 'fuxibaguabiaoqiantubiao',
                            mdr: god.GodDragonoathMdr,
                            title: "tiandi_act_type3" /* tiandi_act_type3 */,
                            bg: "bg_fuxibagua",
                            hintTypes: ["60" /* God */, "01" /* GodMain */, "02" /* GodCommonMain */, "03" /* Type3 */, "02" /* Act */]
                        }
                    ];
                    return _this;
                }
                return GodDragonoathMainMdr;
            }(mod.WndBaseMdr));
            god.GodDragonoathMainMdr = GodDragonoathMainMdr;
            __reflect(GodDragonoathMainMdr.prototype, "game.mod.god.GodDragonoathMainMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god_1) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var ItemTapEvent = eui.ItemTapEvent;
            var GodDragonoathMdr = /** @class */ (function (_super) {
                __extends(GodDragonoathMdr, _super);
                function GodDragonoathMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", god_1.GodDragonoathView);
                    _this._listData = new ArrayCollection();
                    _this._listLevel = new ArrayCollection();
                    return _this;
                }
                GodDragonoathMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(232 /* God */);
                    this._view.list.itemRenderer = god_1.GodDragonoathItem;
                    this._view.list.dataProvider = this._listData;
                    this._view.list_item.itemRenderer = god_1.GodDragonoathLvItemRender;
                    this._view.list_item.dataProvider = this._listLevel;
                };
                GodDragonoathMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_activate, TouchEvent.TOUCH_TAP, this.onClick, this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClick, this);
                    addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClickSelect, this);
                    addEventListener(this._view.icon_suit, TouchEvent.TOUCH_TAP, this.onClickTips);
                    this.onNt("on_update_tianlong_info" /* ON_UPDATE_TIANLONG_INFO */, this.onUpdateTab, this);
                };
                GodDragonoathMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onInitTab();
                };
                GodDragonoathMdr.prototype.onInitTab = function () {
                    var cfgArr = game.getConfigListByName("tiandi_tianlong_jihuo.json" /* TiandiTianlongJihuo */);
                    this._listData.source = cfgArr;
                    //todo 初始化index
                    var index = this._proxy.getInitType3Index();
                    this.onUpdateIndex(index);
                };
                GodDragonoathMdr.prototype.onUpdateTab = function () {
                    var cfgArr = game.getConfigListByName("tiandi_tianlong_jihuo.json" /* TiandiTianlongJihuo */);
                    this._listData.replaceAll(cfgArr);
                    this.onUpdateView();
                };
                GodDragonoathMdr.prototype.onSelectIndex = function (n) {
                    var index = n.body;
                    this.onUpdateIndex(index);
                };
                GodDragonoathMdr.prototype.onUpdateIndex = function (index) {
                    this._view.list.selectedIndex = index;
                    this.onUpdateView();
                };
                GodDragonoathMdr.prototype.onUpdateView = function () {
                    this._cfg = this._listData.source[this._view.list.selectedIndex];
                    this._view.name_item.updateShow(this._cfg.name);
                    this._info = this._proxy.getType3Info(this._cfg.itype);
                    var level = this._info && this._info.level || 0;
                    var activate = !!this._info;
                    this._view.currentState = activate ? "activate" : "default";
                    this._view.img_icon.source = game.ResUtil.getUiPng("god_img_" + this._cfg.itype);
                    this.onUpdateLevel(level);
                    var power = this._info && this._info.attrs && this._info.attrs.showpower || 0;
                    this._view.power.setPowerValue(power);
                    var god = this._info && this._info.attrs && this._info.attrs.god || 0;
                    this._view.god_item.updateGod(god);
                    var stage = Math.floor(level / 10) || 1;
                    var stageStr = game.ResUtil.getChineseFontStr(stage) + "j";
                    this.addBmpFont(stageStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv, false, 1, true);
                    var buff = this._proxy.getBuff(this._cfg.itype);
                    var cfg = game.getConfigByNameId("buff.json" /* Buff */, buff[1]);
                    this._view.lab_name.text = cfg.name;
                    this._view.lab_desc.text = cfg.des;
                    this._view.icon_suit.setData(buff);
                    if (this._view.currentState == "default") {
                        this._view.lab_limit.text = "\u6FC0\u6D3B\u6761\u4EF6\uFF1A\u4ED9\u529B" + this._cfg.condtion;
                        if (god >= this._cfg.condtion) {
                            this._view.bar.showMax();
                            this._view.bar.showLabel("已达标");
                        }
                        else {
                            this._view.bar.show(god, this._cfg.condtion, false);
                        }
                    }
                    else {
                        this.onUpdateUp();
                    }
                };
                GodDragonoathMdr.prototype.onUpdateUp = function () {
                    var level = this._info && this._info.level || 0;
                    var exp = this._info && this._info.exp || 0;
                    this.maxLevel = this._proxy.getMaxLevelType3(this._cfg.itype);
                    if (level >= this.maxLevel) {
                        this._view.bar.showMax();
                    }
                    else {
                        var maxExp = this._proxy.getMaxExpType3(this._cfg.itype);
                        this._view.bar.show(exp * game.DEFAULT_EXP, maxExp * game.DEFAULT_EXP, false);
                    }
                    if (this._info) {
                        var cost = this._proxy.getCostType3(this._cfg.itype, level);
                        this._view.cost.updateShow(cost.cost[0]);
                        this._view.btn_up.setHint(mod.BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1]));
                    }
                    else {
                        this._view.btn_up.setHint(false);
                    }
                };
                GodDragonoathMdr.prototype.onUpdateLevel = function (level) {
                    var list = [];
                    for (var i = 0; i < 10; i++) {
                        var index = i + 1;
                        var bool = level % 10 >= index || level % 10 == 0 && level > 0;
                        list.push(bool);
                    }
                    this._listLevel.replaceAll(list);
                };
                GodDragonoathMdr.prototype.onClick = function (e) {
                    var t;
                    switch (e.currentTarget) {
                        case this._view.btn_activate:
                            if (!game.RoleVo.ins.god || game.RoleVo.ins.god < this._cfg.condtion) {
                                game.PromptBox.getIns().show(game.getLanById("dragon_tips4" /* dragon_tips4 */));
                                return;
                            }
                            t = 1 /* Activate */;
                            break;
                        case this._view.btn_up:
                            var cost = this._proxy.getCostType3(this._cfg.itype, this._info && this._info.level);
                            if (!mod.BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][0][1], 1 /* Dialog */)) {
                                return;
                            }
                            t = 2 /* Up */;
                            break;
                        default:
                            return;
                    }
                    this._proxy.c2s_tiandi_tianlong_level_up(t, this._cfg.itype);
                };
                GodDragonoathMdr.prototype.onClickSelect = function (e) {
                    this.onUpdateIndex(e.itemIndex);
                };
                GodDragonoathMdr.prototype.onClickTips = function () {
                    mod.ViewMgr.getIns().showSecondPop("60" /* God */, "16" /* GodDragonoathBuffTips */, { index: this._cfg.itype });
                };
                GodDragonoathMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return GodDragonoathMdr;
            }(game.EffectMdrBase));
            god_1.GodDragonoathMdr = GodDragonoathMdr;
            __reflect(GodDragonoathMdr.prototype, "game.mod.god.GodDragonoathMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodHauntedActivateView = /** @class */ (function (_super) {
                __extends(GodHauntedActivateView, _super);
                function GodHauntedActivateView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodHauntedActivateSkin";
                    return _this;
                }
                return GodHauntedActivateView;
            }(eui.Component));
            god.GodHauntedActivateView = GodHauntedActivateView;
            __reflect(GodHauntedActivateView.prototype, "game.mod.god.GodHauntedActivateView");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var facade = base.facade;
            var GodHauntedAttrItem = /** @class */ (function (_super) {
                __extends(GodHauntedAttrItem, _super);
                function GodHauntedAttrItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GodHauntedAttrItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("60" /* God */).retProxy(232 /* God */);
                };
                GodHauntedAttrItem.prototype.onRemoveFromStage = function () {
                };
                GodHauntedAttrItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var count = this._proxy.getActivateCount();
                    this.lab.textFlow = game.TextUtil.parseHtml(cfg.describe + game.TextUtil.addEnoughColor(count, cfg.num));
                };
                return GodHauntedAttrItem;
            }(mod.BaseRenderer));
            god.GodHauntedAttrItem = GodHauntedAttrItem;
            __reflect(GodHauntedAttrItem.prototype, "game.mod.god.GodHauntedAttrItem");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodHauntedDetailView = /** @class */ (function (_super) {
                __extends(GodHauntedDetailView, _super);
                function GodHauntedDetailView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodHauntedDetailSkin";
                    return _this;
                }
                return GodHauntedDetailView;
            }(eui.Component));
            god.GodHauntedDetailView = GodHauntedDetailView;
            __reflect(GodHauntedDetailView.prototype, "game.mod.god.GodHauntedDetailView");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodHauntedFightView = /** @class */ (function (_super) {
                __extends(GodHauntedFightView, _super);
                function GodHauntedFightView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodHauntedFightSkin";
                    return _this;
                }
                return GodHauntedFightView;
            }(eui.Component));
            god.GodHauntedFightView = GodHauntedFightView;
            __reflect(GodHauntedFightView.prototype, "game.mod.god.GodHauntedFightView");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var facade = base.facade;
            var GodHauntedItem = /** @class */ (function (_super) {
                __extends(GodHauntedItem, _super);
                function GodHauntedItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GodHauntedItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("60" /* God */).retProxy(232 /* God */);
                };
                GodHauntedItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    this.img_mark.visible = !this._proxy.getActivateCard(cfg.index);
                    this.name_item.updateShow(cfg.name);
                    this.name_item.updateSr("");
                    this.img_sr.source = "avatarquality" + cfg.quality;
                    this.img_bg.source = "tiandilu_datu" + cfg.index;
                };
                return GodHauntedItem;
            }(mod.BaseRenderer));
            god.GodHauntedItem = GodHauntedItem;
            __reflect(GodHauntedItem.prototype, "game.mod.god.GodHauntedItem");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var facade = base.facade;
            var GodAvatarItem = /** @class */ (function (_super) {
                __extends(GodAvatarItem, _super);
                function GodAvatarItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GodAvatarItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("60" /* God */).retProxy(232 /* God */);
                };
                GodAvatarItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this._proxy.getType4Info(this.data.itype);
                    this.img_gray.visible = !info;
                    this.img_name.source = "god_name_" + this.data.itype;
                    this.img_icon.source = "god_icon_head_" + this.data.itype;
                    this.redPoint.visible = false;
                };
                return GodAvatarItem;
            }(mod.BaseRenderer));
            god.GodAvatarItem = GodAvatarItem;
            __reflect(GodAvatarItem.prototype, "game.mod.god.GodAvatarItem");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodHauntedActivateMdr = /** @class */ (function (_super) {
                __extends(GodHauntedActivateMdr, _super);
                function GodHauntedActivateMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", god.GodHauntedActivateView);
                    _this.isEasyHide = true;
                    return _this;
                }
                GodHauntedActivateMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(232 /* God */);
                };
                GodHauntedActivateMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                GodHauntedActivateMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                GodHauntedActivateMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                GodHauntedActivateMdr.prototype.onUpdateView = function () {
                    var index = this._showArgs;
                    this._view.img_bg.source = game.ResUtil.getUiPng("baicaolu_" + index);
                    var cfg = game.getConfigByNameId("tiandi_fengdu_baiguilu.json" /* TiandiFengduBaiguilu */, index);
                    this._view.grp_desc.visible = cfg.text != "";
                    if (cfg.text) {
                        this._view.lab_desc.textFlow = game.TextUtil.parseHtml(cfg.text);
                    }
                    this._view.power.setPowerValue(cfg.power);
                    this._view.name_item.updateShow(cfg.name);
                };
                return GodHauntedActivateMdr;
            }(game.MdrBase));
            god.GodHauntedActivateMdr = GodHauntedActivateMdr;
            __reflect(GodHauntedActivateMdr.prototype, "game.mod.god.GodHauntedActivateMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var GodHauntedDetailMdr = /** @class */ (function (_super) {
                __extends(GodHauntedDetailMdr, _super);
                function GodHauntedDetailMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", god.GodHauntedDetailView);
                    _this.isEasyHide = true;
                    return _this;
                }
                GodHauntedDetailMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._rewardDatas = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._rewardDatas;
                    this._proxy = this.retProxy(232 /* God */);
                };
                GodHauntedDetailMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClick);
                };
                GodHauntedDetailMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                    this.addEftByParentScale(this._view.btn_get.group_eft);
                };
                GodHauntedDetailMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                GodHauntedDetailMdr.prototype.onUpdateView = function () {
                    this._cfg = game.getConfigByNameId("tiandi_fengdu_baiguilu.json" /* TiandiFengduBaiguilu */, this._showArgs);
                    this._rewardDatas.replaceAll(this._cfg.challenge_award);
                    this._view.grp_desc.visible = this._cfg.text != "";
                    if (this._cfg.text) {
                        this._view.lab_desc.textFlow = game.TextUtil.parseHtml(this._cfg.text);
                    }
                    this.addBmpFont(game.StringUtil.getPowerNumStr(this._cfg.limit_power, 1, "", 7), game.BmpTextCfg[206 /* Layer */], this._view.grp_power, true, 0.8, false, 0, true);
                };
                GodHauntedDetailMdr.prototype.onClick = function () {
                    var power = game.RoleVo.ins.showpower.toNumber();
                    if (power < this._cfg.limit_power) {
                        game.PromptBox.getIns().show("对方实力深不可测，暂且避其锋芒");
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("60" /* God */, "05" /* GodHauntedFight */, this._cfg.index);
                    this.hide();
                };
                return GodHauntedDetailMdr;
            }(game.EffectMdrBase));
            god.GodHauntedDetailMdr = GodHauntedDetailMdr;
            __reflect(GodHauntedDetailMdr.prototype, "game.mod.god.GodHauntedDetailMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var TimeMgr = base.TimeMgr;
            var callLater = egret.callLater;
            var GodHauntedFightMdr = /** @class */ (function (_super) {
                __extends(GodHauntedFightMdr, _super);
                function GodHauntedFightMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", god.GodHauntedFightView);
                    _this.HP_WIDTH = 350; //血条宽度
                    _this.ALL_HP = 10000;
                    _this.self = 10000;
                    _this.boss = 10000;
                    return _this;
                }
                GodHauntedFightMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(232 /* God */);
                };
                GodHauntedFightMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                GodHauntedFightMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateInfo();
                };
                GodHauntedFightMdr.prototype.update = function (time) {
                    if (this.boss <= 0) {
                        TimeMgr.removeUpdateItem(this);
                        this.onOver();
                        callLater(this.hide, this);
                        return;
                    }
                    this.onUpdateRandomHP();
                };
                GodHauntedFightMdr.prototype.onUpdateInfo = function () {
                    this.self = this.boss = this.ALL_HP;
                    var vo = game.RoleVo.ins;
                    this._view.lab_name1.text = vo.name;
                    this._view.powerLabel1.setPowerValue(vo.showpower);
                    this._view.head1.updateMyHead();
                    var cfg = game.getConfigByNameId("tiandi_fengdu_baiguilu.json" /* TiandiFengduBaiguilu */, this._showArgs);
                    this._view.lab_name2.text = cfg.name;
                    this._view.powerLabel2.setPowerValue(cfg.limit_power);
                    this._view.head2.updateBossHeadShow(cfg.monster_id, 0);
                    TimeMgr.addUpdateItem(this, 500);
                };
                GodHauntedFightMdr.prototype.onUpdateRandomHP = function () {
                    this.self -= Math.random() * 500;
                    this._view.img_hp1.width = this.self / this.ALL_HP * this.HP_WIDTH;
                    this.boss -= Math.random() * 500 + 500;
                    this._view.img_hp2.width = this.boss / this.ALL_HP * this.HP_WIDTH;
                };
                GodHauntedFightMdr.prototype.onOver = function () {
                    this._proxy.c2s_tiandi_fengdu_baiguilu(this._showArgs);
                    // facade.hideView(ModName.God, GodViewType.GodHauntedDetail);
                };
                return GodHauntedFightMdr;
            }(game.MdrBase));
            god.GodHauntedFightMdr = GodHauntedFightMdr;
            __reflect(GodHauntedFightMdr.prototype, "game.mod.god.GodHauntedFightMdr", ["base.UpdateItem"]);
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodHauntedMainMdr = /** @class */ (function (_super) {
                __extends(GodHauntedMainMdr, _super);
                function GodHauntedMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: 'baicaolubiaoqiantubiao',
                            mdr: god.GodHauntedMdr,
                            title: "tiandi_act_type2" /* tiandi_act_type2 */,
                            bg: "",
                            hintTypes: ["60" /* God */, "01" /* GodMain */, "02" /* GodCommonMain */, "01" /* Type1 */, "04" /* GodTreasure */]
                        }
                    ];
                    return _this;
                }
                return GodHauntedMainMdr;
            }(mod.WndBaseMdr));
            god.GodHauntedMainMdr = GodHauntedMainMdr;
            __reflect(GodHauntedMainMdr.prototype, "game.mod.god.GodHauntedMainMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var GodHauntedMdr = /** @class */ (function (_super) {
                __extends(GodHauntedMdr, _super);
                function GodHauntedMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", god.GodHauntedView);
                    _this._listData = new ArrayCollection();
                    _this._attrsData = new ArrayCollection();
                    return _this;
                }
                GodHauntedMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(232 /* God */);
                    this._view.list.itemRenderer = god.GodHauntedItem;
                    this._view.list.dataProvider = this._listData;
                    this._view.list_attr.itemRenderer = god.GodHauntedAttrItem;
                    this._view.list_attr.dataProvider = this._attrsData;
                };
                GodHauntedMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClick);
                    this.onNt("on_update_haunted_info" /* ON_UPDATE_HAUNTED_INFO */, this.onUpdateView, this);
                };
                GodHauntedMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                GodHauntedMdr.prototype.onUpdateView = function () {
                    var cfgArr = game.getConfigListByName("tiandi_fengdu_baiguilu.json" /* TiandiFengduBaiguilu */);
                    this._listData.replaceAll(cfgArr);
                    var cfgAttrs = game.getConfigListByName("tiandi_fengdu_taozhuang.json" /* TiandiFengduTaozhuang */);
                    this._attrsData.replaceAll(cfgAttrs);
                    var count = this._proxy.getActivateCount();
                    this._view.bar.setProValue(count, cfgArr.length);
                };
                GodHauntedMdr.prototype.onClick = function (e) {
                    var cfg = e.item;
                    var bool = this._proxy.getActivateCard(cfg.index);
                    if (bool) {
                        mod.ViewMgr.getIns().showSecondPop("60" /* God */, "10" /* GodHauntedActivate */, cfg.index);
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("60" /* God */, "06" /* GodHauntedDetail */, cfg.index);
                };
                GodHauntedMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return GodHauntedMdr;
            }(game.MdrBase));
            god.GodHauntedMdr = GodHauntedMdr;
            __reflect(GodHauntedMdr.prototype, "game.mod.god.GodHauntedMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodBuffItem = /** @class */ (function (_super) {
                __extends(GodBuffItem, _super);
                function GodBuffItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GodBuffItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    if (this.data.skillId != undefined) {
                        var cfg = game.getConfigByNameId("buff.json" /* Buff */, this.data.skillId);
                        this.img_icon.source = cfg && cfg.icon || "";
                    }
                    if (this.data.showHint != undefined) {
                        this.redPoint.visible = this.data.showHint;
                    }
                    if (this.data.isAct != undefined) {
                        this.img_lock.visible = !this.data.isAct;
                        if (this.data.lockStr) {
                            this.img_lock.source = this.data.lockStr;
                        }
                    }
                    if (this.data.bgStr != undefined) {
                        this.img_bg.source = this.data.bgStr;
                    }
                };
                /**单个技能外部调用*/
                GodBuffItem.prototype.setData = function (skillId) {
                    this.data = { skillId: skillId };
                };
                return GodBuffItem;
            }(eui.ItemRenderer));
            god.GodBuffItem = GodBuffItem;
            __reflect(GodBuffItem.prototype, "game.mod.god.GodBuffItem");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodCommonView = /** @class */ (function (_super) {
                __extends(GodCommonView, _super);
                function GodCommonView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodCommonSkin";
                    return _this;
                }
                return GodCommonView;
            }(eui.Component));
            god.GodCommonView = GodCommonView;
            __reflect(GodCommonView.prototype, "game.mod.god.GodCommonView");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var GodGiftItemRender = /** @class */ (function (_super) {
                __extends(GodGiftItemRender, _super);
                function GodGiftItemRender() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._canBuy = false;
                    return _this;
                }
                GodGiftItemRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("60" /* God */).retProxy(232 /* God */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
                    this._rewardList = new ArrayCollection();
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._rewardList;
                };
                GodGiftItemRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var index = this.data.index;
                    var info = this._proxy.getInfo(this._proxy.iType);
                    var stage = info && info.level || 0;
                    var cfg = game.getConfigByNameId("tiandi_type.json" /* TiandiType */, this._proxy.iType);
                    var pin = this._proxy.getPin();
                    var limit = Math.ceil(this.data.condtion / 10);
                    var str1 = game.StringUtil.substitute(game.getLanById("tiandi_tips1" /* tiandi_tips1 */), [cfg.name, limit]);
                    var str2 = game.TextUtil.addEnoughColor(pin, limit);
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(str1 + str2);
                    this._rewardList.source = this.data.rewards;
                    var buyBool = this._proxy.getBool(this._proxy.iType, index);
                    this._canBuy = stage >= this.data.condtion;
                    this.btn_buy.visible = !buyBool;
                    this.img_buy.visible = buyBool;
                    this.btn_buy.label = game.getLanById("tishi_29" /* tishi_29 */);
                    if (this.btn_buy.visible) {
                        this.btn_buy.redPoint.visible = this._canBuy;
                    }
                };
                GodGiftItemRender.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    var index = this.data.index;
                    if (!this._canBuy) {
                        game.PromptBox.getIns().show(game.getLanById("jinjielibao_tips2" /* jinjielibao_tips2 */));
                        return;
                    }
                    this._proxy.c2s_tiandi_get_level_rewards(this._proxy.iType, index);
                };
                return GodGiftItemRender;
            }(mod.BaseRenderer));
            god.GodGiftItemRender = GodGiftItemRender;
            __reflect(GodGiftItemRender.prototype, "game.mod.god.GodGiftItemRender");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var facade = base.facade;
            var GodItem = /** @class */ (function (_super) {
                __extends(GodItem, _super);
                function GodItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GodItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("60" /* God */).retProxy(232 /* God */);
                };
                GodItem.prototype.onRemoveFromStage = function () {
                };
                GodItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = game.getConfigByNameId("tiandi_type.json" /* TiandiType */, this.data.type);
                    this.img_mask.visible = !this._proxy.getActivate(this.itemIndex + 1);
                    this.img_bg.source = game.ResUtil.getUiPng("god_big_card_" + cfg.itype);
                    this.redPoint.visible = mod.HintMgr.getHint(["60" /* God */, "01" /* GodMain */, "02" /* GodCommonMain */, "0" + (this.itemIndex + 1)]);
                    var shenling = game.getConfigByNameId("shenling.json" /* Shenling */, cfg.image_id);
                    this.name_item.updateShow(cfg.name, shenling.quality);
                    var pin = this._proxy.getPin() || 1;
                    this.name_item.updateSr("pin_" + pin);
                    this.removeEft();
                    this.addEftByParent("nvshenlu" /* Nvshenlu */, this.group_eft);
                };
                return GodItem;
            }(mod.BaseRenderer));
            god.GodItem = GodItem;
            __reflect(GodItem.prototype, "game.mod.god.GodItem");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodListView = /** @class */ (function (_super) {
                __extends(GodListView, _super);
                function GodListView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodListSkin";
                    return _this;
                }
                return GodListView;
            }(eui.Component));
            god.GodListView = GodListView;
            __reflect(GodListView.prototype, "game.mod.god.GodListView");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var facade = base.facade;
            var GodLvItemRender = /** @class */ (function (_super) {
                __extends(GodLvItemRender, _super);
                function GodLvItemRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GodLvItemRender.prototype.dataChanged = function () {
                    var lv = this.itemIndex + 1;
                    var _proxy = facade.retMod("60" /* God */).retProxy(232 /* God */);
                    var info = _proxy.getInfo(_proxy.iType);
                    var level = info && info.level || 0;
                    // this.img_icon.source = level >= lv ? "lv_icon_404" : "lv_icon_gray_404";
                    this.img_icon.source = level % 10 >= lv || level % 10 == 0 && level > 0 ? "shengpin_huangse" : "shengpin_huise";
                };
                return GodLvItemRender;
            }(eui.ItemRenderer));
            god.GodLvItemRender = GodLvItemRender;
            __reflect(GodLvItemRender.prototype, "game.mod.god.GodLvItemRender");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodRoadView = /** @class */ (function (_super) {
                __extends(GodRoadView, _super);
                function GodRoadView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodRoadSkin";
                    return _this;
                }
                return GodRoadView;
            }(eui.Component));
            god.GodRoadView = GodRoadView;
            __reflect(GodRoadView.prototype, "game.mod.god.GodRoadView");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodCommonMainMdr = /** @class */ (function (_super) {
                __extends(GodCommonMainMdr, _super);
                function GodCommonMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: 'tiandilubiaoqiantubiao',
                            mdr: god.GodCommonMdr,
                            title: "tiandilu_tips" /* tiandilu_tips */,
                            bg: "tiandilubeijingtu2",
                            hintTypes: []
                        }
                    ];
                    return _this;
                }
                GodCommonMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = game.getProxy("60" /* God */, 232 /* God */);
                };
                GodCommonMainMdr.prototype.updateBtnList = function () {
                    var list = [];
                    var mdrs = [];
                    for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                        var data = _a[_i];
                        // if (data.openIdx && !ViewMgr.getIns().checkBtnShow(data.openIdx)) {
                        //     continue;
                        // }
                        //icon和hintTypes不一样
                        // data.icon = SurfaceConfigList[this._proxy.iType] + "_tab";
                        data.hintTypes = ["60" /* God */, "01" /* GodMain */, "02" /* GodCommonMain */, "0" + this._proxy.iType];
                        mdrs.push(data.mdr);
                        list.push(data);
                    }
                    this._btnList.source = list;
                    this._tab.mdrClsList = mdrs;
                };
                return GodCommonMainMdr;
            }(mod.WndBaseMdr));
            god.GodCommonMainMdr = GodCommonMainMdr;
            __reflect(GodCommonMainMdr.prototype, "game.mod.god.GodCommonMainMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var GodCommonMdr = /** @class */ (function (_super) {
                __extends(GodCommonMdr, _super);
                function GodCommonMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", god.GodCommonView);
                    _this._itemList = new ArrayCollection();
                    return _this;
                }
                GodCommonMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(232 /* God */);
                    this._view.list_item.itemRenderer = god.GodLvItemRender;
                    this._view.list_item.dataProvider = this._itemList;
                };
                GodCommonMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClick);
                    addEventListener(this._view.btn_onekey, TouchEvent.TOUCH_TAP, this.onClick);
                    addEventListener(this._view.btn_gift, TouchEvent.TOUCH_TAP, this.onClickGift);
                    addEventListener(this._view.btn_right, TouchEvent.TOUCH_TAP, this.onClickAct);
                    addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    this.onNt("on_update_road_info" /* ON_UPDATE_ROAD_INFO */, this.onUpdateView, this);
                };
                GodCommonMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                GodCommonMdr.prototype.onUpdateView = function () {
                    this._view.currentState = "default";
                    var cfg = game.getConfigByNameId("tiandi_type.json" /* TiandiType */, this._proxy.iType);
                    if (!this._proxy.getActivate(this._proxy.iType)) {
                        this._view.currentState = "lock";
                    }
                    this._view.power.btn_desc.visible = this._view.currentState != "lock";
                    this._view.god_item.visible = this._view.currentState != "lock";
                    this._view.grp_desc.visible = cfg.text != "";
                    if (cfg.text) {
                        this._view.lab_desc.textFlow = game.TextUtil.parseHtml(cfg.text);
                    }
                    var info = this._proxy.getInfo(this._proxy.iType);
                    var level = info && info.level || 0;
                    var exp = info && info.exp || 0;
                    this.maxLevel = this._proxy.getMaxLevel();
                    if (level >= this.maxLevel) {
                        this._view.bar.showMax();
                        this._view.currentState = "max";
                    }
                    else {
                        var maxExp = this._proxy.getMaxExp();
                        this._view.bar.show(exp * cfg.add_value, maxExp * cfg.add_value);
                    }
                    var arr = [];
                    arr.length = 10;
                    this._itemList.replaceAll(arr);
                    if (info) {
                        var cost = this._proxy.getCost(this._proxy.iType, level);
                        this._view.cost.updateShow(cost.cost[0]);
                        this._view.btn_up.setHint(mod.BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1]));
                        this._view.btn_onekey.setHint(mod.BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1] * 10));
                    }
                    else {
                        this._view.btn_up.setHint(false);
                        this._view.btn_onekey.setHint(false);
                    }
                    var bool = mod.HintMgr.getHint(this._proxy.common.concat(["0" + this._proxy.iType, "03" /* GodGiftMain */]));
                    this._view.btn_gift.setHint(bool);
                    var boolact = mod.HintMgr.getHint(this._proxy.common.concat(["0" + this._proxy.iType, "02" /* Act */]));
                    this._view.btn_right.setHint(boolact);
                    this._view.btn_right.icon = "btn_act_" + this._proxy.iType;
                    this.updateModel(cfg.image_id);
                    this.updatePower();
                };
                GodCommonMdr.prototype.updateModel = function (index, showName) {
                    if (showName === void 0) { showName = true; }
                    var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, index);
                    if (!cfg) {
                        return;
                    }
                    this._view.name_item.visible = showName;
                    this._view.name_item.updateShow(cfg.name, cfg.quality);
                    var pin = this._proxy.getPin() || 1;
                    this._view.name_item.updateSr("pin_" + pin);
                    this.addAnimate(index, this._view.grp_eff);
                    this._view.img_text.source = "tiandi_tips" + index;
                };
                GodCommonMdr.prototype.updatePower = function () {
                    var info = this._proxy.getInfo(this._proxy.iType);
                    var power = info && info.attrs && info.attrs.showpower || 0;
                    this._view.power.setPowerValue(power);
                    var godVal = info && info.attrs && info.attrs.god ? info.attrs.god : 0;
                    this._view.god_item.updateGod(godVal);
                };
                GodCommonMdr.prototype.onClick = function (e) {
                    var info = this._proxy.getInfo(this._proxy.iType);
                    var cfg = this._proxy.getCost(this._proxy.iType, info.level);
                    if (!mod.BagUtil.checkPropCnt(cfg.cost[0][0], cfg.cost[0][1], 1 /* Dialog */)) {
                        return;
                    }
                    var button_type = e.currentTarget == this._view.btn_up ? 1 : 2;
                    this._proxy.c2s_tiandi_level_up(button_type, this._proxy.iType);
                };
                GodCommonMdr.prototype.onClickGift = function () {
                    mod.ViewMgr.getIns().showView("60" /* God */, "03" /* GodGiftMain */);
                };
                GodCommonMdr.prototype.onClickAct = function () {
                    var act = this._proxy.getAct(this._proxy.iType);
                    if (!act) {
                        game.PromptBox.getIns().show("暂未开放");
                        return;
                    }
                    mod.ViewMgr.getIns().showView("60" /* God */, act);
                };
                GodCommonMdr.prototype.onClickAttr = function () {
                    var info = this._proxy.getInfo(this._proxy.iType);
                    mod.ViewMgr.getIns().showAttrTips(game.getLanById("soul14" /* soul14 */), info ? info.attrs : null);
                };
                GodCommonMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return GodCommonMdr;
            }(game.EffectMdrBase));
            god.GodCommonMdr = GodCommonMdr;
            __reflect(GodCommonMdr.prototype, "game.mod.god.GodCommonMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodGiftMainMdr = /** @class */ (function (_super) {
                __extends(GodGiftMainMdr, _super);
                function GodGiftMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Gift */,
                            icon: "shengpinhaoli",
                            mdr: god.GodGiftMdr,
                            title: "tiandilu_tips_2" /* tiandilu_tips_2 */,
                            bg: "p1_del_bg",
                            hintTypes: [],
                        }
                    ];
                    return _this;
                }
                GodGiftMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = game.getProxy("60" /* God */, 232 /* God */);
                };
                /**更新list数据*/
                GodGiftMainMdr.prototype.updateBtnList = function () {
                    var list = [];
                    var mdrs = [];
                    for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                        var data = _a[_i];
                        // if (data.openIdx && !ViewMgr.getIns().checkBtnShow(data.openIdx)) {
                        //     continue;
                        // }
                        // //icon和hintTypes不一样
                        // data.icon = SurfaceConfigList[this._proxy.iType] + "_tab";
                        data.hintTypes = ["60" /* God */, "01" /* GodMain */, "02" /* GodCommonMain */, "0" + this._proxy.iType, "03" /* GodGiftMain */];
                        mdrs.push(data.mdr);
                        list.push(data);
                    }
                    this._btnList.source = list;
                    this._tab.mdrClsList = mdrs;
                };
                return GodGiftMainMdr;
            }(mod.WndBaseMdr));
            god.GodGiftMainMdr = GodGiftMainMdr;
            __reflect(GodGiftMainMdr.prototype, "game.mod.god.GodGiftMainMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var ArrayCollection = eui.ArrayCollection;
            var GodGiftMdr = /** @class */ (function (_super) {
                __extends(GodGiftMdr, _super);
                function GodGiftMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.SurfaceGiftView);
                    return _this;
                }
                GodGiftMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(232 /* God */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = god.GodGiftItemRender;
                    this._view.list_item.dataProvider = this._itemList;
                };
                GodGiftMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_update_road_info" /* ON_UPDATE_ROAD_INFO */, this.updateItemList, this);
                };
                GodGiftMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initView();
                    this.updateReward();
                    this.updateItemList();
                };
                GodGiftMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                /**初始化显示不同的ui*/
                GodGiftMdr.prototype.initView = function () {
                    this._view.img_bg.source = game.ResUtil.getUiJpg("tiandilu_gift_bg");
                };
                GodGiftMdr.prototype.updateReward = function () {
                    var cfg = game.getConfigByNameId("tiandi_type.json" /* TiandiType */, this._proxy.iType);
                    this._view.icon.setData(cfg.rewards[0]);
                };
                GodGiftMdr.prototype.updateItemList = function () {
                    var cfgs = game.getConfigByNameId("tiandi_levelrewards.json" /* TiandiLevelrewards */, this._proxy.iType);
                    var cfgArr = [];
                    for (var key in cfgs) {
                        cfgArr.push(cfgs[key]);
                    }
                    var self = this;
                    cfgArr.sort(function (a, b) {
                        var b1 = self._proxy.getBool(self._proxy.iType, a.index);
                        var b2 = self._proxy.getBool(self._proxy.iType, b.index);
                        if (b1 != b2) {
                            return b1 ? 1 : -1;
                        }
                        return a.index - b.index;
                    });
                    this._itemList.source = cfgArr;
                };
                return GodGiftMdr;
            }(game.MdrBase));
            god.GodGiftMdr = GodGiftMdr;
            __reflect(GodGiftMdr.prototype, "game.mod.god.GodGiftMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var GodListMdr = /** @class */ (function (_super) {
                __extends(GodListMdr, _super);
                function GodListMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", god.GodListView);
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                GodListMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(232 /* God */);
                    this._view.list.itemRenderer = god.GodItem;
                    this._view.list.dataProvider = this._listData;
                };
                GodListMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClick);
                    this.onNt("on_update_road_info" /* ON_UPDATE_ROAD_INFO */, this.onUpdateView, this);
                };
                GodListMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                GodListMdr.prototype.onUpdateView = function () {
                    this._listData.replaceAll(this._proxy.list);
                    var str = game.TextUtil.addColor("(" + this._proxy.activateCount + "/" + 4 + ")", 0x228d2d);
                    this._view.lab.textFlow = game.TextUtil.parseHtml(game.StringUtil.substitute(game.getLanById("tiandi_tips3" /* tiandi_tips3 */), [str]));
                };
                GodListMdr.prototype.onClick = function (e) {
                    this._proxy.iType = e.itemIndex + 1;
                    //todo
                    if (this._proxy.iType == 3) {
                        game.PromptBox.getIns().show("\u656C\u8BF7\u671F\u5F85\uFF01");
                    }
                    else if (this._proxy.iType == 4) {
                        game.PromptBox.getIns().show("\u656C\u8BF7\u671F\u5F85\uFF01");
                    }
                    else {
                        mod.ViewMgr.getIns().showView("60" /* God */, "02" /* GodCommonMain */);
                    }
                };
                GodListMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return GodListMdr;
            }(game.MdrBase));
            god.GodListMdr = GodListMdr;
            __reflect(GodListMdr.prototype, "game.mod.god.GodListMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodMainMdr = /** @class */ (function (_super) {
                __extends(GodMainMdr, _super);
                function GodMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: 'xiuxianzhilubiaoqiantubiao',
                            mdr: god.GodRoadMdr,
                            title: "xunxianzhilu_tips" /* xunxianzhilu_tips */,
                            bg: "tiandilubeijingtu2",
                            hintTypes: ["60" /* God */, "01" /* GodMain */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            title: "tiandilu_tips" /* tiandilu_tips */,
                            icon: 'tiandilubiaoqiantubiao',
                            mdr: god.GodListMdr,
                            bg: "tiandilubeijingtu3",
                            hintTypes: ["60" /* God */, "01" /* GodMain */, "02" /* GodCommonMain */]
                        }
                    ];
                    return _this;
                }
                return GodMainMdr;
            }(mod.WndBaseMdr));
            god.GodMainMdr = GodMainMdr;
            __reflect(GodMainMdr.prototype, "game.mod.god.GodMainMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var TouchEvent = egret.TouchEvent;
            var GodRoadMdr = /** @class */ (function (_super) {
                __extends(GodRoadMdr, _super);
                function GodRoadMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", god.GodRoadView);
                    return _this;
                }
                GodRoadMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(232 /* God */);
                };
                GodRoadMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_left, TouchEvent.TOUCH_TAP, this.onClickAct);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward);
                    addEventListener(this._view.btn_once, TouchEvent.TOUCH_TAP, this.onClick);
                    addEventListener(this._view.btn_ten, TouchEvent.TOUCH_TAP, this.onClick);
                    addEventListener(this._view.btn_prop, TouchEvent.TOUCH_TAP, this.onClickProp);
                    addEventListener(this._view.btn_tiandi, TouchEvent.TOUCH_TAP, this.onClickTiandi);
                    this.onNt("on_update_road_info" /* ON_UPDATE_ROAD_INFO */, this.onUpdateView, this);
                };
                GodRoadMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                GodRoadMdr.prototype.onUpdateView = function () {
                    var cfg = game.getConfigByNameId("tiandi_type.json" /* TiandiType */, this._proxy.nowType);
                    var maxValue = this._proxy.maxValue;
                    if (this._proxy.value < maxValue) {
                        this._view.bar.show(this._proxy.value, maxValue);
                    }
                    else {
                        this._view.bar.showMax();
                    }
                    this._view.cost_once.updateShow(cfg.items[0]);
                    var items = [cfg.items[0][0], cfg.items[0][1] * 10];
                    this._view.cost_ten.updateShow(items);
                    this._view.icon.setData(cfg.rewards[0]);
                    this._view.grp_desc.visible = cfg.desc != "";
                    if (cfg.desc) {
                        this._view.lab_desc.textFlow = game.TextUtil.parseHtml(cfg.desc);
                    }
                    var str = game.getLanById("tiandi_tips2" /* tiandi_tips2 */);
                    var actname = game.getLanById(this._proxy.getActname(this._proxy.nowType));
                    this._view.lab_tips.text = "(" + game.StringUtil.substitute(str, [cfg.name, actname]) + ")";
                    this._view.btn_once.setImage("dancigongfeng");
                    this._view.btn_once.setHint(mod.BagUtil.checkPropCnt(cfg.costs[0], cfg.costs[1]));
                    this._view.btn_ten.setImage("shiliangongfeng");
                    this._view.btn_ten.setHint(mod.BagUtil.checkPropCnt(cfg.costs[0], cfg.costs[1] * 10));
                    this._view.btn_left.icon = "btn_act_" + this._proxy.nowType;
                    this.updateModel(cfg.image_id);
                };
                GodRoadMdr.prototype.updateModel = function (index, showName) {
                    if (showName === void 0) { showName = true; }
                    var cfg = game.getConfigByNameId("shenling.json" /* Shenling */, index);
                    if (!cfg) {
                        return;
                    }
                    this._view.name_item.visible = showName;
                    this._view.name_item.updateShow(cfg.name, cfg.quality);
                    this._view.name_item.updateSr("tiandi");
                    this.addAnimate(index, this._view.grp_eff);
                };
                GodRoadMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                GodRoadMdr.prototype.onClick = function (e) {
                    var cfg = game.getConfigByNameId("tiandi_type.json" /* TiandiType */, this._proxy.nowType);
                    var type = e.currentTarget == this._view.btn_once ? 1 : 2;
                    var cnt = type == 1 ? cfg.items[0][1] : cfg.items[0][1] * 10;
                    if (!mod.BagUtil.checkPropCntUp(cfg.items[0][0], cnt)) {
                        return;
                    }
                    this._proxy.c2s_tiandi_gongfeng(type);
                };
                GodRoadMdr.prototype.onClickTiandi = function (e) {
                    var cfg = game.getConfigByNameId("tiandi_type.json" /* TiandiType */, this._proxy.nowType);
                    mod.ViewMgr.getIns().showGainWaysTips(cfg.items[0][0]);
                };
                GodRoadMdr.prototype.onClickAct = function () {
                    var act = this._proxy.getAct(this._proxy.nowType);
                    mod.ViewMgr.getIns().showView("60" /* God */, act);
                };
                GodRoadMdr.prototype.onClickReward = function () {
                    var cfgArr = this._proxy.getPreviewReward(this._proxy.nowType);
                    var list = [];
                    for (var _i = 0, cfgArr_1 = cfgArr; _i < cfgArr_1.length; _i++) {
                        var cfg = cfgArr_1[_i];
                        list.push({
                            weight: cfg.weight,
                            award: cfg.award,
                            nameStr: "rolering_reward_type" + cfg.index
                        });
                    }
                    mod.ViewMgr.getIns().openPreviewReward(list);
                };
                GodRoadMdr.prototype.onClickProp = function () {
                    var cfg = game.getConfigByNameId("tiandi_type.json" /* TiandiType */, this._proxy.nowType);
                    mod.ViewMgr.getIns().showGainWaysTips(cfg.items[0][0]);
                };
                return GodRoadMdr;
            }(game.EffectMdrBase));
            god.GodRoadMdr = GodRoadMdr;
            __reflect(GodRoadMdr.prototype, "game.mod.god.GodRoadMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodModel = /** @class */ (function () {
                function GodModel() {
                    var _a, _b;
                    this.infos = {};
                    this.hintNodes = {};
                    this.is_sign = 0;
                    this.ids = [];
                    this.tianlong_list = {};
                    this.shifang_list = {};
                    this.travel_list = [];
                    this.actOfType = (_a = {},
                        _a[1 /* Type1 */] = "04" /* GodTreasure */,
                        _a[2 /* Type2 */] = "08" /* GodHaunted */,
                        _a[3 /* Type3 */] = "12" /* GodDragonoath */,
                        _a[4 /* Type4 */] = "11" /* GodAvatar */,
                        _a);
                    this.common = ["60" /* God */, "01" /* GodMain */, "02" /* GodCommonMain */];
                    this.actname = (_b = {},
                        _b[1 /* Type1 */] = "tiandi_act_type1" /* tiandi_act_type1 */,
                        _b[2 /* Type2 */] = "tiandi_act_type2" /* tiandi_act_type2 */,
                        _b[3 /* Type3 */] = "tiandi_act_type3" /* tiandi_act_type3 */,
                        _b[4 /* Type4 */] = "tiandi_act_type4" /* tiandi_act_type4 */,
                        _b);
                    this.saveChoose = [];
                }
                return GodModel;
            }());
            god.GodModel = GodModel;
            __reflect(GodModel.prototype, "game.mod.god.GodModel");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var c2s_tiandi_gongfeng = msg.c2s_tiandi_gongfeng;
            var s2c_tiandi_list = msg.s2c_tiandi_list;
            var c2s_tiandi_level_up = msg.c2s_tiandi_level_up;
            var c2s_tiandi_yuhuang_qiandao = msg.c2s_tiandi_yuhuang_qiandao;
            var s2c_tiandi_yuhuang_qiandao = msg.s2c_tiandi_yuhuang_qiandao;
            var c2s_tiandi_get_level_rewards = msg.c2s_tiandi_get_level_rewards;
            var c2s_tiandi_fengdu_baiguilu = msg.c2s_tiandi_fengdu_baiguilu;
            var s2c_tiandi_fengdu_baiguilu = msg.s2c_tiandi_fengdu_baiguilu;
            var c2s_tiandi_tianlong_level_up = msg.c2s_tiandi_tianlong_level_up;
            var s2c_tiandi_tianlong_list = msg.s2c_tiandi_tianlong_list;
            var c2s_tiandi_shifang_level_up = msg.c2s_tiandi_shifang_level_up;
            var c2s_tiandi_shifang_skill_active = msg.c2s_tiandi_shifang_skill_active;
            var s2c_tiandi_shifang_list = msg.s2c_tiandi_shifang_list;
            var c2s_tiandi_youli_paiqian = msg.c2s_tiandi_youli_paiqian;
            var s2c_tiandi_youli_paiqian_list = msg.s2c_tiandi_youli_paiqian_list;
            var c2s_tiandi_youli_get_rewards = msg.c2s_tiandi_youli_get_rewards;
            var TimeMgr = base.TimeMgr;
            var GodProxy = /** @class */ (function (_super) {
                __extends(GodProxy, _super);
                function GodProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(GodProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                GodProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new god.GodModel();
                    this.onProto(s2c_tiandi_list, this.s2c_tiandi_list, this);
                    this.onProto(s2c_tiandi_yuhuang_qiandao, this.s2c_tiandi_yuhuang_qiandao, this);
                    this.onProto(s2c_tiandi_fengdu_baiguilu, this.s2c_tiandi_fengdu_baiguilu, this);
                    this.onProto(s2c_tiandi_tianlong_list, this.s2c_tiandi_tianlong_list, this);
                    this.onProto(s2c_tiandi_shifang_list, this.s2c_tiandi_shifang_list, this);
                    this.onProto(s2c_tiandi_youli_paiqian_list, this.s2c_tiandi_youli_paiqian_list, this);
                };
                GodProxy.prototype.update = function (time) {
                    var root = this.common.concat(["04" /* Type4 */, "02" /* Act */, "02" /* TabBtnType02 */]);
                    var bool = false;
                    for (var _i = 0, _a = this._model.travel_list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.endtime - TimeMgr.time.serverTimeSecond > 0) {
                            bool = true;
                        }
                        else {
                            mod.HintMgr.setHint(true, root);
                        }
                    }
                    if (!bool) {
                        mod.HintMgr.setHint(false, root);
                        TimeMgr.removeUpdateItem(this);
                    }
                };
                //------------------协议---------------------
                GodProxy.prototype.c2s_tiandi_gongfeng = function (type) {
                    var msg = new c2s_tiandi_gongfeng();
                    msg.button_type = type;
                    this.sendProto(msg);
                };
                GodProxy.prototype.c2s_tiandi_get_level_rewards = function (itype, index) {
                    var msg = new c2s_tiandi_get_level_rewards();
                    msg.index = index;
                    msg.itype = itype;
                    this.sendProto(msg);
                };
                GodProxy.prototype.c2s_tiandi_level_up = function (button_type, itype) {
                    var msg = new c2s_tiandi_level_up();
                    msg.button_type = button_type;
                    msg.itype = itype;
                    this.sendProto(msg);
                };
                GodProxy.prototype.c2s_tiandi_yuhuang_qiandao = function (index) {
                    var msg = new c2s_tiandi_yuhuang_qiandao();
                    msg.index = index;
                    this.sendProto(msg);
                };
                GodProxy.prototype.c2s_tiandi_fengdu_baiguilu = function (index) {
                    var msg = new c2s_tiandi_fengdu_baiguilu();
                    msg.index = index;
                    this.sendProto(msg);
                };
                GodProxy.prototype.s2c_tiandi_yuhuang_qiandao = function (n) {
                    var msg = n.body;
                    this._model.is_sign = msg.is_sign || 0;
                    this._model.num = msg.num || 0;
                    this._model.rewards = msg.rewards || [];
                    this.onUpdateHintOfType1Act();
                    this.sendNt("on_update_treasure_info" /* ON_UPDATE_TREASURE_INFO */);
                };
                GodProxy.prototype.s2c_tiandi_list = function (n) {
                    var msg = n.body;
                    if (msg.now_itype) {
                        this._model.now_itype = msg.now_itype;
                        this.onUpdateHintOfMain();
                    }
                    if (msg.value) {
                        this._model.value = msg.value;
                    }
                    if (msg.tian_di_list) {
                        for (var _i = 0, _a = msg.tian_di_list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this._model.infos[info.itype] = info;
                            this.onUpdateHintOfGift(info.itype);
                            this.onUpdateHintOfUp(info.itype);
                            if (info.itype == 1) {
                                this.onUpdateHintOfType1Act();
                            }
                            else if (info.itype == 3) {
                                this.onUpdateHintOfType3Act();
                            }
                            else if (info.itype == 4) {
                                this.onUpdateHintOfType4Act();
                            }
                        }
                    }
                    this.sendNt("on_update_road_info" /* ON_UPDATE_ROAD_INFO */);
                };
                GodProxy.prototype.s2c_tiandi_fengdu_baiguilu = function (n) {
                    var msg = n.body;
                    if (msg.ids) {
                        this._model.ids = msg.ids;
                    }
                    this.sendNt("on_update_haunted_info" /* ON_UPDATE_HAUNTED_INFO */);
                };
                GodProxy.prototype.c2s_tiandi_tianlong_level_up = function (button_type, itype) {
                    var msg = new c2s_tiandi_tianlong_level_up();
                    msg.button_type = button_type;
                    msg.itype = itype;
                    this.sendProto(msg);
                };
                GodProxy.prototype.c2s_tiandi_shifang_level_up = function (button_type, itype) {
                    var msg = new c2s_tiandi_shifang_level_up();
                    msg.button_type = button_type;
                    msg.itype = itype;
                    this.sendProto(msg);
                };
                GodProxy.prototype.c2s_tiandi_shifang_skill_active = function (itype, index) {
                    var msg = new c2s_tiandi_shifang_skill_active();
                    msg.itype = itype;
                    msg.index = index;
                    this.sendProto(msg);
                };
                GodProxy.prototype.c2s_tiandi_youli_paiqian = function (request_list) {
                    var msg = new c2s_tiandi_youli_paiqian();
                    msg.request_list = request_list;
                    this.sendProto(msg);
                };
                GodProxy.prototype.c2s_tiandi_youli_get_rewards = function (map_type) {
                    var msg = new c2s_tiandi_youli_get_rewards();
                    msg.map_type = map_type;
                    this.sendProto(msg);
                };
                GodProxy.prototype.s2c_tiandi_tianlong_list = function (n) {
                    var msg = n.body;
                    if (msg.tianlong_list) {
                        for (var _i = 0, _a = msg.tianlong_list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this._model.tianlong_list[info.itype] = info;
                        }
                    }
                    this.onUpdateHintOfType3Act();
                    this.sendNt("on_update_tianlong_info" /* ON_UPDATE_TIANLONG_INFO */);
                };
                GodProxy.prototype.s2c_tiandi_shifang_list = function (n) {
                    var msg = n.body;
                    if (msg.shifang_list) {
                        for (var _i = 0, _a = msg.shifang_list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this._model.shifang_list[info.itype] = info;
                        }
                    }
                    this.onUpdateHintOfType4Act();
                    this.sendNt("on_update_avatar_info" /* ON_UPDATE_AVATAR_INFO */);
                };
                GodProxy.prototype.s2c_tiandi_youli_paiqian_list = function (n) {
                    var msg = n.body;
                    if (msg.list) {
                        this._model.travel_list = msg.list;
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                    this.sendNt("on_update_travel_info" /* ON_UPDATE_TRAVEL_INFO */);
                };
                Object.defineProperty(GodProxy.prototype, "common", {
                    //------------------协议---------------------
                    get: function () {
                        return this._model.common;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GodProxy.prototype, "iType", {
                    get: function () {
                        return this._model.iType;
                    },
                    set: function (v) {
                        this._model.iType = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GodProxy.prototype, "nowType", {
                    get: function () {
                        return this._model.now_itype;
                    },
                    enumerable: true,
                    configurable: true
                });
                GodProxy.prototype.getActivate = function (type) {
                    // return type < this.nowType;
                    return this.getInfo(type) != null;
                };
                Object.defineProperty(GodProxy.prototype, "activateCount", {
                    get: function () {
                        var count = 0;
                        for (var k in this._model.infos) {
                            count++;
                        }
                        return count;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**活动2激活卡片 */
                GodProxy.prototype.getActivateCount = function () {
                    return this._model.ids && this._model.ids.length || 0;
                };
                GodProxy.prototype.getActivateCard = function (index) {
                    return this._model.ids && this._model.ids.indexOf(index) > -1;
                };
                GodProxy.prototype.getHint = function (type) {
                    if (type === void 0) { type = this.iType; }
                    return this._model.hintNodes[type];
                };
                GodProxy.prototype.getStage = function (type) {
                    var info = this.getInfo(type);
                    return info && info.level || 0;
                };
                GodProxy.prototype.getInfo = function (type) {
                    return this._model.infos[type] || null;
                };
                GodProxy.prototype.getCost = function (type, level) {
                    var cfgs = game.getConfigByNameId("tiandi_level.json" /* TiandiLevel */, type);
                    for (var k in cfgs) {
                        if (+k == level) {
                            return cfgs[k];
                        }
                    }
                    return null;
                };
                GodProxy.prototype.getPin = function (type) {
                    if (type === void 0) { type = this.iType; }
                    var info = this.getInfo(type);
                    var level = info && info.level || 0;
                    return Math.ceil(level / 10);
                };
                GodProxy.prototype.getActname = function (type) {
                    return this._model.actname[type];
                };
                /**已购买 */
                GodProxy.prototype.getBool = function (type, index) {
                    var info = this.getInfo(type);
                    if (!info || !info.rewards) {
                        return false;
                    }
                    for (var _i = 0, _a = info.rewards; _i < _a.length; _i++) {
                        var reward = _a[_i];
                        if (+reward.index == index) {
                            return reward.status == 2;
                        }
                    }
                    return false;
                };
                Object.defineProperty(GodProxy.prototype, "value", {
                    get: function () {
                        return this._model.value || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GodProxy.prototype, "maxValue", {
                    get: function () {
                        var num = 0;
                        var cfgArr = game.getConfigListByName("tiandi_type.json" /* TiandiType */);
                        for (var _i = 0, cfgArr_2 = cfgArr; _i < cfgArr_2.length; _i++) {
                            var cfg = cfgArr_2[_i];
                            // num += cfg.value;
                            num = cfg.value;
                            if (cfg.itype == this._model.now_itype) {
                                return num;
                            }
                        }
                        return num;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GodProxy.prototype, "list", {
                    get: function () {
                        var list = [];
                        for (var type = 1; type <= 4; type++) {
                            var info = this._model.infos["" + type];
                            list.push({ type: type, info: info });
                        }
                        return list;
                    },
                    enumerable: true,
                    configurable: true
                });
                GodProxy.prototype.getMaxLevel = function (itype) {
                    if (itype === void 0) { itype = this.iType; }
                    var cfgArr = game.getConfigByNameId("tiandi_level.json" /* TiandiLevel */, itype);
                    var level = 0;
                    for (var key in cfgArr) {
                        level = cfgArr[key].sp_level;
                    }
                    return level;
                };
                GodProxy.prototype.getMaxExp = function (itype) {
                    if (itype === void 0) { itype = this.iType; }
                    var count = 0;
                    var info = this.getInfo(itype);
                    var level = info && info.level || 0;
                    var cfgArr = game.getConfigByNameId("tiandi_level.json" /* TiandiLevel */, itype);
                    for (var key in cfgArr) {
                        var cfg = cfgArr[key];
                        if (cfg.sp_level == level) {
                            return cfg.exp;
                        }
                    }
                    return count;
                };
                GodProxy.prototype.getMaxLevelType4 = function (itype) {
                    var cfgArr = game.getConfigByNameId("tiandi_shifnag_level.json" /* TiandiShifnagLevel */, itype);
                    var level = 0;
                    for (var key in cfgArr) {
                        level = cfgArr[key].sp_level;
                    }
                    return level;
                };
                GodProxy.prototype.getMaxLevelType3 = function (itype) {
                    var cfgArr = game.getConfigByNameId("tiandi_tianlong.json" /* TiandiTianlong */, itype);
                    var level = 0;
                    for (var key in cfgArr) {
                        level = cfgArr[key].sp_level;
                    }
                    return level;
                };
                GodProxy.prototype.getMaxExpType4 = function (itype) {
                    var count = 0;
                    var info = this.getInfo(itype);
                    var level = info && info.level || 0;
                    var cfgArr = game.getConfigByNameId("tiandi_shifnag_level.json" /* TiandiShifnagLevel */, itype);
                    for (var key in cfgArr) {
                        var cfg = cfgArr[key];
                        if (+key == 1) {
                            count = cfg.exp;
                        }
                        if (cfg.sp_level == level) {
                            return cfg.exp;
                        }
                    }
                    return count;
                };
                GodProxy.prototype.getMaxExpType3 = function (itype) {
                    var count = 0;
                    var info = this.getInfo(itype);
                    var level = info && info.level || 0;
                    var cfgArr = game.getConfigByNameId("tiandi_tianlong.json" /* TiandiTianlong */, itype);
                    for (var key in cfgArr) {
                        var cfg = cfgArr[key];
                        if (cfg.sp_level == level) {
                            return cfg.exp;
                        }
                    }
                    return count;
                };
                GodProxy.prototype.getCostType4 = function (type, level) {
                    var cfgs = game.getConfigByNameId("tiandi_shifnag_level.json" /* TiandiShifnagLevel */, type);
                    for (var k in cfgs) {
                        if (+k == level) {
                            return cfgs[k];
                        }
                    }
                    return null;
                };
                GodProxy.prototype.getCostType3 = function (type, level) {
                    var cfgs = game.getConfigByNameId("tiandi_tianlong.json" /* TiandiTianlong */, type);
                    for (var k in cfgs) {
                        if (+k == level) {
                            return cfgs[k];
                        }
                    }
                    return null;
                };
                GodProxy.prototype.getVipSignCfgArr = function () {
                    var cfgArr = game.getConfigListByName("tiandi_yuhuang_qiandao.json" /* TiandiYuhuangQiandao */);
                    var list = [];
                    for (var _i = 0, cfgArr_3 = cfgArr; _i < cfgArr_3.length; _i++) {
                        var cfg = cfgArr_3[_i];
                        if (cfg.other_rewards) {
                            list.push(cfg);
                        }
                    }
                    return list;
                };
                Object.defineProperty(GodProxy.prototype, "isSign", {
                    get: function () {
                        return this._model.is_sign == 1;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GodProxy.prototype, "signDay", {
                    get: function () {
                        return this._model.num || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                GodProxy.prototype.getAct = function (type) {
                    return this._model.actOfType[type];
                };
                GodProxy.prototype.getVipSignStatus = function (index) {
                    for (var _i = 0, _a = this._model.rewards; _i < _a.length; _i++) {
                        var reward = _a[_i];
                        if (+reward.index == index) {
                            return reward;
                        }
                    }
                    return null;
                };
                GodProxy.prototype.getInitType3Index = function () {
                    return 0;
                };
                GodProxy.prototype.getType3Info = function (index) {
                    return this._model.tianlong_list && this._model.tianlong_list[index] || null;
                };
                GodProxy.prototype.getBuff = function (index) {
                    var cfg = game.getConfigByNameId("tiandi_tianlong_jihuo.json" /* TiandiTianlongJihuo */, index);
                    var info = this.getType3Info(index);
                    if (!info) {
                        return cfg.buffs[0];
                    }
                    var buff = [];
                    for (var _i = 0, _a = cfg.buffs; _i < _a.length; _i++) {
                        var nums = _a[_i];
                        if (nums[2] <= info.level) {
                            buff = nums;
                        }
                    }
                    return buff;
                };
                GodProxy.prototype.getInitType4Index = function () {
                    return 0;
                };
                GodProxy.prototype.getType4Info = function (index) {
                    return this._model.shifang_list && this._model.shifang_list[index] || null;
                };
                GodProxy.prototype.getYouliArr = function () {
                    var cfgArr = game.getConfigListByName("tiandi_shifang_youli.json" /* TiandiShifangYouli */);
                    var list = [];
                    for (var _i = 0, cfgArr_4 = cfgArr; _i < cfgArr_4.length; _i++) {
                        var cfg = cfgArr_4[_i];
                        if (!cfg.condtions || mod.ViewMgr.getIns().checkViewOpen(cfg.condtions)) {
                            list.push(cfg);
                        }
                    }
                    return list;
                };
                GodProxy.prototype.getYouli = function (map_type) {
                    for (var _i = 0, _a = this._model.travel_list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.map_type == map_type) {
                            return info;
                        }
                    }
                    return null;
                };
                GodProxy.prototype.getYouliChoose = function () {
                    var list = [];
                    for (var k in this._model.shifang_list) {
                        var bool = false;
                        for (var _i = 0, _a = this._model.travel_list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            if (+k == info.index) {
                                bool = true;
                                break;
                            }
                        }
                        if (!bool) {
                            for (var _b = 0, _c = this._model.saveChoose; _b < _c.length; _b++) {
                                var info = _c[_b];
                                if (info.index == +k) {
                                    bool = true;
                                    break;
                                }
                            }
                        }
                        if (!bool) {
                            var cfg = game.getConfigByNameId("tiandi_shifang.json" /* TiandiShifang */, +k);
                            list.push(cfg);
                        }
                    }
                    return list;
                };
                GodProxy.prototype.saveChoose = function (data) {
                    for (var i = 0; i < this._model.saveChoose.length; i++) {
                        var info = this._model.saveChoose[i];
                        if (info.map_type == data.map_type) {
                            this._model.saveChoose[i].index == data.index;
                            mod.ViewMgr.getIns().showSecondPop("60" /* God */, "13" /* GodTravelTip */);
                            return;
                        }
                    }
                    this._model.saveChoose.push(data);
                    mod.ViewMgr.getIns().showSecondPop("60" /* God */, "13" /* GodTravelTip */);
                };
                GodProxy.prototype.getSaveChoose = function (map_type) {
                    for (var _i = 0, _a = this._model.saveChoose; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.map_type == map_type) {
                            return info;
                        }
                    }
                    return null;
                };
                GodProxy.prototype.getPreviewReward = function (type) {
                    var cfgs = game.getConfigByNameId("tiandi_random.json" /* TiandiRandom */, type);
                    var list = [];
                    for (var key in cfgs) {
                        var cfg = cfgs[key];
                        list.push(cfg);
                    }
                    return list;
                };
                GodProxy.prototype.onUpdateHintOfGift = function (type) {
                    var root = this.common.concat(["0" + type, "03" /* GodGiftMain */]);
                    var info = this.getInfo(type);
                    if (info && info.rewards) {
                        for (var _i = 0, _a = info.rewards; _i < _a.length; _i++) {
                            var reward = _a[_i];
                            if (reward.status == 1) {
                                mod.HintMgr.setHint(true, root);
                                return;
                            }
                        }
                    }
                    mod.HintMgr.setHint(false, root);
                };
                GodProxy.prototype.onUpdateHintOfUp = function (type) {
                    var root = this.common.concat(["0" + type, "01" /* Up */]);
                    var info = this.getInfo(type);
                    if (!info) {
                        mod.HintMgr.setHint(false, root);
                        return;
                    }
                    var cfg = this.getCost(type, info.level + 1);
                    if (!cfg) {
                        mod.HintMgr.setHint(false, root);
                        return;
                    }
                    if (mod.BagUtil.checkPropCnt(cfg.cost[0][0], cfg.cost[0][1])) {
                        mod.HintMgr.setHint(true, root);
                        return;
                    }
                    mod.HintMgr.setHint(false, root);
                };
                GodProxy.prototype.onUpdateHintOfType1Act = function () {
                    var root = this.common.concat(["01" /* Type1 */, "02" /* Act */]);
                    if (!this.getActivate(1 /* Type1 */)) {
                        mod.HintMgr.setHint(false, root);
                        return;
                    }
                    if (!this.isSign) {
                        mod.HintMgr.setHint(true, root);
                        return;
                    }
                    var cfg = game.getConfigByNameId("param.json" /* Param */, "tiandilu_condtion");
                    if (mod.VipUtil.getShowVipLv() < mod.VipUtil.getShowVipLv(cfg.value)) {
                        mod.HintMgr.setHint(false, root);
                        return;
                    }
                    if (this._model.rewards) {
                        for (var _i = 0, _a = this._model.rewards; _i < _a.length; _i++) {
                            var reward = _a[_i];
                            if (reward.status == 1) {
                                mod.HintMgr.setHint(true, root);
                                return;
                            }
                        }
                    }
                    mod.HintMgr.setHint(false, root);
                };
                GodProxy.prototype.onUpdateHintOfType3Act = function () {
                    var root = this.common.concat(["03" /* Type3 */, "02" /* Act */]);
                    if (!this.getActivate(3 /* Type3 */)) {
                        mod.HintMgr.setHint(false, root);
                        return;
                    }
                    var cfgArr = game.getConfigListByName("tiandi_tianlong_jihuo.json" /* TiandiTianlongJihuo */);
                    for (var _i = 0, cfgArr_5 = cfgArr; _i < cfgArr_5.length; _i++) {
                        var cfg = cfgArr_5[_i];
                        var info = this.getType3Info(cfg.itype);
                        if (info) {
                            var cost = this.getCostType3(info.itype, info.level);
                            if (cost && mod.BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1])) {
                                mod.HintMgr.setHint(true, root);
                                return;
                            }
                        }
                        else {
                            if (game.RoleVo.ins.god >= cfg.condtion) {
                                mod.HintMgr.setHint(true, root);
                                return;
                            }
                        }
                    }
                    mod.HintMgr.setHint(false, root);
                };
                GodProxy.prototype.onUpdateHintOfType4Act = function () {
                    var root = this.common.concat(["04" /* Type4 */, "02" /* Act */]);
                    if (!this.getActivate(4 /* Type4 */)) {
                        mod.HintMgr.setHint(false, root);
                        return;
                    }
                    var cfgArr = game.getConfigListByName("tiandi_shifang.json" /* TiandiShifang */);
                    var bool = false;
                    for (var _i = 0, cfgArr_6 = cfgArr; _i < cfgArr_6.length; _i++) {
                        var cfg = cfgArr_6[_i];
                        var info = this.getType4Info(cfg.itype);
                        if (info) {
                            var cost = this.getCostType3(info.itype, info.level);
                            if (cost && mod.BagUtil.checkPropCnt(cost.cost[0][0], cost.cost[0][1])) {
                                bool = true;
                                break;
                            }
                        }
                        else {
                            if (mod.ViewMgr.getIns().checkRebirth(cfg.condtion)) {
                                bool = true;
                                return;
                            }
                        }
                    }
                    mod.HintMgr.setHint(bool, root.concat(["01" /* TabBtnType01 */]));
                };
                GodProxy.prototype.onUpdateHintOfMain = function () {
                    var roots = ["60" /* God */, "01" /* GodMain */, "01" /* TabBtnType01 */];
                    var cfg = game.getConfigByNameId("tiandi_type.json" /* TiandiType */, this.nowType);
                    var index = cfg.costs[0];
                    var count = cfg.costs[1];
                    var bool = mod.BagUtil.checkPropCnt(index, count);
                    mod.HintMgr.setHint(bool, roots);
                };
                GodProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    if (!indexs) {
                        return;
                    }
                    for (var key in this._model.infos) {
                        var info = this._model.infos[key];
                        var cfg_1 = this.getCost(info.itype, info.level);
                        if (indexs.indexOf(cfg_1.cost[0][0]) > -1) {
                            this.onUpdateHintOfUp(info.itype);
                        }
                    }
                    if (!this.nowType) {
                        return;
                    }
                    var cfg = game.getConfigByNameId("tiandi_type.json" /* TiandiType */, this.nowType);
                    if (indexs.indexOf(cfg.costs[0]) > -1) {
                        this.onUpdateHintOfMain();
                    }
                };
                return GodProxy;
            }(game.ProxyBase));
            god.GodProxy = GodProxy;
            __reflect(GodProxy.prototype, "game.mod.god.GodProxy", ["base.UpdateItem", "game.mod.IGodProxy", "base.IProxy"]);
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodTreasureView = /** @class */ (function (_super) {
                __extends(GodTreasureView, _super);
                function GodTreasureView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.god.GodTreasureSkin";
                    return _this;
                }
                return GodTreasureView;
            }(eui.Component));
            god.GodTreasureView = GodTreasureView;
            __reflect(GodTreasureView.prototype, "game.mod.god.GodTreasureView");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodProgressItem = /** @class */ (function (_super) {
                __extends(GodProgressItem, _super);
                function GodProgressItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.common.ComProgressBar3Skin";
                    return _this;
                }
                GodProgressItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    if (!this.data.val) {
                        this.bar.show(0, this.data.target, false, 0, false, 2 /* NoValue */);
                    }
                    else {
                        var val = this.data.val - this.data.start;
                        val = val < 0 ? 0 : val;
                        var target = this.data.target - this.data.start;
                        this.bar.show(val, target, false, 0, false, 2 /* NoValue */);
                    }
                };
                return GodProgressItem;
            }(mod.BaseRenderer));
            god.GodProgressItem = GodProgressItem;
            __reflect(GodProgressItem.prototype, "game.mod.god.GodProgressItem");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var ArrayCollection = eui.ArrayCollection;
            var facade = base.facade;
            var GodProgressReward = /** @class */ (function (_super) {
                __extends(GodProgressReward, _super);
                function GodProgressReward() {
                    var _this = _super.call(this) || this;
                    _this._listData = new ArrayCollection();
                    _this._listReward = new ArrayCollection();
                    _this.skinName = "skins.common.ComProgressRewardSkin";
                    return _this;
                }
                GodProgressReward.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.list_progress.itemRenderer = god.GodProgressItem;
                    this.list_progress.dataProvider = this._listData;
                    this.list_reward.itemRenderer = god.GodProgressRewardItem;
                    this.list_reward.dataProvider = this._listReward;
                    this.img_tips.source = "qiandaoshu";
                };
                GodProgressReward.prototype.setData = function (val) {
                    this.lab_count.text = "" + val;
                    var proxy = facade.retMod("60" /* God */).retProxy(232 /* God */);
                    var cfgArr = proxy.getVipSignCfgArr();
                    var list = [];
                    for (var i = 0; i < cfgArr.length; i++) {
                        var cfg = cfgArr[i];
                        var cfgBefore = cfgArr[i - 1];
                        var start = cfgBefore && cfgBefore.index || 0;
                        var target = cfg.index;
                        list.push({ val: val, start: start, target: target });
                    }
                    this._listData.source = list;
                    this._listReward.source = cfgArr;
                };
                return GodProgressReward;
            }(mod.BaseRenderer));
            god.GodProgressReward = GodProgressReward;
            __reflect(GodProgressReward.prototype, "game.mod.god.GodProgressReward");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var GodProgressRewardItem = /** @class */ (function (_super) {
                __extends(GodProgressRewardItem, _super);
                function GodProgressRewardItem() {
                    return _super.call(this) || this;
                    // this.skinName = "skins.common.ComProgressRewardItem2Skin";
                }
                GodProgressRewardItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("60" /* God */).retProxy(232 /* God */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.icon, this.onClickBtn, this);
                };
                GodProgressRewardItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var info = this._proxy.getVipSignStatus(cfg.index);
                    var count = this._proxy.signDay;
                    if (!info) {
                        this.img_got.visible = false;
                    }
                    else {
                        var bool = count >= cfg.index && info.status != 2 || info.status == 1;
                        this.redPoint.visible = bool;
                        this.img_got.visible = info.status == 2;
                    }
                    this.barCnt.updateShow(cfg.index, count >= cfg.index);
                    this.icon.setData(cfg.other_rewards[0], info && info.status == 1 ? 3 /* NotTips */ : 1 /* Reward */);
                };
                GodProgressRewardItem.prototype.onClickBtn = function () {
                    var info = this._proxy.getVipSignStatus(this.data.index);
                    if (info && info.status == 2) {
                        return;
                    }
                    this._proxy.c2s_tiandi_yuhuang_qiandao(this.data.index);
                };
                return GodProgressRewardItem;
            }(mod.BaseRenderer));
            god.GodProgressRewardItem = GodProgressRewardItem;
            __reflect(GodProgressRewardItem.prototype, "game.mod.god.GodProgressRewardItem");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var GodTreasureMainMdr = /** @class */ (function (_super) {
                __extends(GodTreasureMainMdr, _super);
                function GodTreasureMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: 'xuanyuandikubiaoqiantubiao',
                            mdr: god.GodTreasureMdr,
                            title: "tiandi_act_type1" /* tiandi_act_type1 */,
                            bg: "tiandilubeijingtu",
                            hintTypes: ["60" /* God */, "01" /* GodMain */, "02" /* GodCommonMain */, "01" /* Type1 */, "02" /* Act */]
                        }
                    ];
                    return _this;
                }
                return GodTreasureMainMdr;
            }(mod.WndBaseMdr));
            god.GodTreasureMainMdr = GodTreasureMainMdr;
            __reflect(GodTreasureMainMdr.prototype, "game.mod.god.GodTreasureMainMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var god;
        (function (god) {
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var GodTreasureMdr = /** @class */ (function (_super) {
                __extends(GodTreasureMdr, _super);
                function GodTreasureMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", god.GodTreasureView);
                    _this._listData = new ArrayCollection();
                    return _this;
                }
                GodTreasureMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(232 /* God */);
                    this._view.list.itemRenderer = mod.IconReward;
                    this._view.list.dataProvider = this._listData;
                };
                GodTreasureMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClick);
                    this.onNt("on_update_treasure_info" /* ON_UPDATE_TREASURE_INFO */, this.onUpdateView, this);
                };
                GodTreasureMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                GodTreasureMdr.prototype.onUpdateView = function () {
                    var list = [];
                    var cfgArr = game.getConfigListByName("tiandi_yuhuang_qiandao.json" /* TiandiYuhuangQiandao */);
                    var day = this._proxy.signDay;
                    var sign = this._proxy.isSign;
                    for (var _i = 0, cfgArr_7 = cfgArr; _i < cfgArr_7.length; _i++) {
                        var cfg = cfgArr_7[_i];
                        var showHint = !sign && day + 1 == cfg.index && this._proxy.getActivate(1 /* Type1 */);
                        var isGot = day >= cfg.index;
                        var prop = game.PropData.create(cfg.rewards[0][0], cfg.rewards[0][1], showHint ? 3 /* NotTips */ : 1 /* Reward */);
                        list.push({ prop: prop, showHint: showHint, isGot: isGot });
                    }
                    this._listData.replaceAll(list);
                    this._view.reward.setData(day);
                };
                GodTreasureMdr.prototype.onClick = function (e) {
                    if (e.item.showHint) {
                        this._proxy.c2s_tiandi_yuhuang_qiandao();
                    }
                };
                GodTreasureMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return GodTreasureMdr;
            }(game.MdrBase));
            god.GodTreasureMdr = GodTreasureMdr;
            __reflect(GodTreasureMdr.prototype, "game.mod.god.GodTreasureMdr");
        })(god = mod.god || (mod.god = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=god.js.map