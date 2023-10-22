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
        var xianyuan;
        (function (xianyuan) {
            var ChildShenbingMdr = /** @class */ (function (_super) {
                __extends(ChildShenbingMdr, _super);
                function ChildShenbingMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianyuan.ChildShenbingView);
                    /**大类*/
                    _this._surfaceType = 1 /* Shenbing */;
                    /**二级页签类型*/
                    _this._tabType = 1 /* Type1 */;
                    _this._selIdx = 0;
                    return _this;
                }
                ChildShenbingMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.gr_eff.touchEnabled = false;
                    this._proxy = this.retProxy(227 /* Child */);
                    this._view.list.itemRenderer = mod.AvatarItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                ChildShenbingMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickUp, this);
                    addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    this.onNt("on_update_child_shenbing_info" /* ON_UPDATE_CHILD_SHENBING_INFO */, this.onUpdateView, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePower, this);
                    this.onNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, this.onBagUpdateByBagType, this);
                };
                ChildShenbingMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                ChildShenbingMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this.removeModelEft();
                    this._selIdx = 0;
                    this._selCfg = null;
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollH = 0;
                };
                ChildShenbingMdr.prototype.removeModelEft = function () {
                    if (this._eftIdx) {
                        this.removeEffect(this._eftIdx);
                        this._eftIdx = null;
                    }
                };
                ChildShenbingMdr.prototype.onUpdateView = function () {
                    this.updateListData();
                    this.updateView();
                };
                ChildShenbingMdr.prototype.updateView = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    this.updateModel();
                    this.updatePower();
                    this.updateCost();
                };
                ChildShenbingMdr.prototype.updateListData = function () {
                    var list = [];
                    var cfgList = this._proxy.getSurfaceCfgList(this._surfaceType, this._tabType);
                    if (!cfgList) {
                        return;
                    }
                    for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                        var cfg = cfgList_1[_i];
                        var info = this._proxy.getSurfaceInfo(this._surfaceType, cfg.index);
                        list.push({
                            cfg: cfg,
                            showHint: this._proxy.canActOrUpSurface(this._surfaceType, cfg.index),
                            star: info ? info.shenbin_lv : 0,
                            isBattle: false
                        });
                    }
                    list.sort(function (a, b) {
                        if (a.showHint != b.showHint) {
                            return a.showHint ? -1 : 1;
                        }
                        if (a.star != b.star) {
                            return b.star > 0 ? 1 : -1;
                        }
                        if (a.cfg.quality != b.cfg.quality) {
                            return a.cfg.quality - b.cfg.quality;
                        }
                        return a.cfg.index - b.cfg.index;
                    });
                    if (this._selCfg) {
                        for (var i = 0; i < list.length; i++) {
                            if (list[i].cfg.index == this._selCfg.index) {
                                this._selIdx = i;
                                break;
                            }
                        }
                    }
                    else {
                        // this._selIdx = 0;
                        this._selCfg = list[this._selIdx].cfg;
                    }
                    var size = list.length;
                    for (var i = 0; i < size; i++) {
                        list[i].isSel = i == this._selIdx;
                    }
                    this._listData.replaceAll(list);
                    this._view.list.selectedIndex = this._selIdx;
                };
                ChildShenbingMdr.prototype.updateModel = function () {
                    this.removeModelEft();
                    var index = this._selCfg.index;
                    var headType = game.PropData.getPropParse(index);
                    if (headType == 602 /* ChildShenbing */) {
                        this._view.gr_eff.x = 480; //todo 模型位置要调整
                    }
                    else {
                        this._view.gr_eff.x = 360;
                    }
                    this._eftIdx = this.addAnimate(index, this._view.gr_eff);
                    this._view.nameItem.updateShow(this._selCfg.name, this._selCfg.quality);
                    var isActed = this._proxy.isActedSurface(this._surfaceType, index);
                    this._view.power.btn_desc.visible = isActed;
                    this._view.starComp.visible = isActed;
                    if (isActed) {
                        var info = this._proxy.getSurfaceInfo(this._surfaceType, index);
                        this._view.starComp.updateStar(info ? info.shenbin_lv : 0, this._proxy.getMaxStarSurface(this._surfaceType, index));
                    }
                    this._view.specialAttr.updateDesc(this._selCfg);
                };
                ChildShenbingMdr.prototype.updatePower = function () {
                    var info = this._proxy.getSurfaceInfo(this._surfaceType, this._selCfg.index);
                    var attr = info ? info.shenbin_attr : null;
                    if (!attr) {
                        var attrId = this._selCfg.attr_id[0];
                        attr = mod.RoleUtil.getAttr(attrId);
                    }
                    this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
                    this._view.godItem.updateGod(attr && attr.god ? attr.god : 0);
                };
                ChildShenbingMdr.prototype.updateCost = function () {
                    var isMax = this._proxy.isMaxStarSurface(this._surfaceType, this._selCfg.index);
                    if (isMax) {
                        this._view.btn_up.updateMaxStar();
                        return;
                    }
                    var curStar = this._proxy.getStarSurface(this._surfaceType, this._selCfg.index);
                    var power = this._selCfg.star_power[curStar] || 0;
                    var str = game.StringUtil.substitute(game.getLanById("xianlv_tips26" /* xianlv_tips26 */), [game.TextUtil.addColor(Math.floor(power / 100) + '%', 2330156 /* GREEN */)]);
                    var cost = this._proxy.getCostSurface(this._surfaceType, this._selCfg.index);
                    this._view.btn_up.updateCost(cost, !!curStar, str);
                    this._view.btn_up.setHint(this._proxy.canActOrUpSurface(this._surfaceType, this._selCfg.index));
                };
                ChildShenbingMdr.prototype.onClickUp = function () {
                    if (this._selCfg && this._proxy.canActOrUpSurface(this._surfaceType, this._selCfg.index, true)) {
                        this._proxy.c2s_child_oper_shenbin(this._surfaceType, this._selCfg.index);
                    }
                };
                ChildShenbingMdr.prototype.onClickAttr = function () {
                    var info = this._proxy.getSurfaceInfo(this._surfaceType, this._selCfg.index);
                    mod.ViewMgr.getIns().showAttrTips(game.XianlvSurfaceName[this._surfaceType] + game.getLanById("maid_cue12" /* maid_cue12 */), info ? info.shenbin_attr : null);
                };
                ChildShenbingMdr.prototype.onClickList = function (e) {
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
                ChildShenbingMdr.prototype.onBagUpdateByBagType = function (n) {
                    var bagTypes = n.body;
                    if (bagTypes.indexOf(2 /* Material */) > -1) {
                        this.onUpdateView();
                    }
                };
                return ChildShenbingMdr;
            }(game.EffectMdrBase));
            xianyuan.ChildShenbingMdr = ChildShenbingMdr;
            __reflect(ChildShenbingMdr.prototype, "game.mod.xianyuan.ChildShenbingMdr");
            var ChildShenbingMdr2 = /** @class */ (function (_super) {
                __extends(ChildShenbingMdr2, _super);
                function ChildShenbingMdr2() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._surfaceType = 1 /* Shenbing */;
                    _this._tabType = 2 /* Type2 */;
                    return _this;
                }
                return ChildShenbingMdr2;
            }(ChildShenbingMdr));
            xianyuan.ChildShenbingMdr2 = ChildShenbingMdr2;
            __reflect(ChildShenbingMdr2.prototype, "game.mod.xianyuan.ChildShenbingMdr2");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvDoufaWinMdr = /** @class */ (function (_super) {
                __extends(XianlvDoufaWinMdr, _super);
                function XianlvDoufaWinMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.XianlvDoufaWinView);
                    _this._type = 1 /* Win */;
                    _this.isEasyHide = true;
                    return _this;
                }
                XianlvDoufaWinMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(263 /* XianlvDoufa */);
                };
                XianlvDoufaWinMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                XianlvDoufaWinMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    // if (this._showArgs instanceof s2c_xianlv_pvp_nianya_win) {
                    //     // this.onUpdateCrush();
                    //     let info: s2c_xianlv_pvp_nianya_win = this._showArgs;
                    //     this._view.resultReward.updateRewardList(info.reward, base.Handler.alloc(this, this.onRewardTweenEnd));
                    // } else {
                    //     let info: s2c_instance_fin = this._showArgs;
                    //     this._view.resultReward.updateRewardList(info.reward, base.Handler.alloc(this, this.onRewardTweenEnd));
                    // }
                    var info = this._showArgs;
                    this._view.resultReward.updateRewardList(info.reward, base.Handler.alloc(this, this.onRewardTweenEnd));
                    this.onUpdateView();
                };
                XianlvDoufaWinMdr.prototype.onUpdateView = function () {
                    this.isEasyHide = false;
                    this._view.closeTips.visible = false;
                    var info = this._showArgs;
                    this._view.head1.updateMyHead();
                    var bool1 = false;
                    if (this._type == 1 /* Win */) {
                        if (info && info.long_params) {
                            bool1 = !this.onCheckParams(game.RoleVo.ins.role_id);
                        }
                    }
                    else {
                        bool1 = true;
                    }
                    this.onSetHeadDead(this._view.head1, bool1);
                    var xianlv = mod.RoleUtil.getBanlvInfo();
                    this._view.head2.updateShow(xianlv.head, xianlv.head_frame, xianlv.sex, xianlv.vip);
                    var bool2 = false;
                    if (this._type == 1 /* Win */) {
                        if (info && info.long_params) {
                            bool2 = !this.onCheckParams(xianlv.role_id);
                        }
                    }
                    else {
                        bool2 = true;
                    }
                    this.onSetHeadDead(this._view.head2, bool2);
                    var enemy1 = this._proxy.player_info[0];
                    if (enemy1) {
                        this._view.head3.updateShow(enemy1.head, enemy1.head_frame, enemy1.sex, enemy1.vip);
                        var bool3 = false;
                        if (this._type == 1 /* Win */) {
                            bool3 = true;
                        }
                        else {
                            if (info && info.long_params) {
                                bool3 = !this.onCheckParams(enemy1.role_id);
                            }
                        }
                        this.onSetHeadDead(this._view.head3, bool3);
                    }
                    var enemy2 = this._proxy.player_info[1];
                    if (enemy2) {
                        this._view.head4.updateShow(enemy2.head, enemy2.head_frame, enemy2.sex, enemy2.vip);
                        var bool4 = false;
                        if (this._type == 1 /* Win */) {
                            bool4 = true;
                        }
                        else {
                            if (info && info.long_params) {
                                bool4 = !this.onCheckParams(enemy2.role_id);
                            }
                        }
                        this.onSetHeadDead(this._view.head4, bool4);
                    }
                };
                XianlvDoufaWinMdr.prototype.onCheckParams = function (id) {
                    var info = this._showArgs;
                    return info.long_params.some(function (v) { return v.eq(id); });
                };
                XianlvDoufaWinMdr.prototype.onSetHeadDead = function (item, bool) {
                    item.updateHeadMask(bool ? "yizhenwang" : "");
                };
                XianlvDoufaWinMdr.prototype.onRewardTweenEnd = function () {
                    var _this = this;
                    this._view.closeTips.visible = true;
                    this._view.closeTips.updateShow(10, base.Handler.alloc(this, this.hide));
                    base.delayCall(base.Handler.alloc(this, function () {
                        _this.isEasyHide = true;
                    }), 200);
                };
                XianlvDoufaWinMdr.prototype.onHide = function () {
                    mod.SceneUtil.exitScene();
                    _super.prototype.onHide.call(this);
                    this.sendNt("on_update_xianlv_doufa_auto" /* ON_UPDATE_XIANLV_DOUFA_AUTO */, false);
                    this.sendNt("on_xiuxiannvpu_special_challenge_next" /* ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT */);
                };
                return XianlvDoufaWinMdr;
            }(game.MdrBase));
            xianyuan.XianlvDoufaWinMdr = XianlvDoufaWinMdr;
            __reflect(XianlvDoufaWinMdr.prototype, "game.mod.xianyuan.XianlvDoufaWinMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvInviteRecordView = /** @class */ (function (_super) {
                __extends(XianlvInviteRecordView, _super);
                function XianlvInviteRecordView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvInviteRecordSkin";
                    return _this;
                }
                return XianlvInviteRecordView;
            }(eui.Component));
            xianyuan.XianlvInviteRecordView = XianlvInviteRecordView;
            __reflect(XianlvInviteRecordView.prototype, "game.mod.xianyuan.XianlvInviteRecordView");
            var XianlvInviteRecordItem = /** @class */ (function (_super) {
                __extends(XianlvInviteRecordItem, _super);
                function XianlvInviteRecordItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvInviteRecordItemSkin";
                    return _this;
                }
                XianlvInviteRecordItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("58" /* Xianyuan */, 226 /* Xianlv */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_cancel, this.onClickCancel, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_confirm, this.onClickConfirm, this);
                };
                XianlvInviteRecordItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lb_name.text = data.name;
                    this.powerLabel.setPowerValue(data.showpower);
                    this.headVip.updateShow(data.head, data.head_frame, data.sex, data.vip, data.role_id);
                };
                XianlvInviteRecordItem.prototype.onClickCancel = function () {
                    this._proxy.c2s_xianlv_seeking(this.data.role_id, 2);
                };
                XianlvInviteRecordItem.prototype.onClickConfirm = function () {
                    this._proxy.c2s_xianlv_seeking(this.data.role_id, 1);
                };
                return XianlvInviteRecordItem;
            }(mod.BaseListenerRenderer));
            xianyuan.XianlvInviteRecordItem = XianlvInviteRecordItem;
            __reflect(XianlvInviteRecordItem.prototype, "game.mod.xianyuan.XianlvInviteRecordItem");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var c2s_xianlv_child_starup = msg.c2s_xianlv_child_starup;
            var s2c_xianlv_child_info = msg.s2c_xianlv_child_info;
            var c2s_child_oper_jiban = msg.c2s_child_oper_jiban;
            var s2c_child_oper_jiban = msg.s2c_child_oper_jiban;
            var c2s_child_oper_shenbin = msg.c2s_child_oper_shenbin;
            var s2c_child_shenbin_info = msg.s2c_child_shenbin_info;
            var c2s_child_share_skill_act = msg.c2s_child_share_skill_act;
            var c2s_child_equip = msg.c2s_child_equip;
            var c2s_child_into_battle = msg.c2s_child_into_battle;
            var s2c_child_share_info = msg.s2c_child_share_info;
            /**
             * @description 仙侣-子女系统
             */
            var ChildProxy = /** @class */ (function (_super) {
                __extends(ChildProxy, _super);
                function ChildProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._actJibanMap = {};
                    _this._errorMap = {};
                    _this._maxStarMap = {};
                    /**=============================== 神兵，灵翼 ===============================*/
                    _this._surfaceMap = {};
                    _this._surfaceStarMap = {};
                    _this._skillCost = [];
                    return _this;
                }
                ChildProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    this._actJibanMap = {};
                };
                ChildProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new xianyuan.ChildModel();
                    this.onProto(s2c_xianlv_child_info, this.s2c_xianlv_child_info, this);
                    this.onProto(s2c_child_oper_jiban, this.s2c_child_oper_jiban, this);
                    this.onProto(s2c_child_shenbin_info, this.s2c_child_shenbin_info, this);
                    this.onProto(s2c_child_share_info, this.s2c_child_share_info, this);
                };
                // 子女升星
                ChildProxy.prototype.c2s_xianlv_child_starup = function (index) {
                    var msg = new c2s_xianlv_child_starup();
                    msg.child_index = index;
                    this.sendProto(msg);
                };
                // 子女信息返回
                ChildProxy.prototype.s2c_xianlv_child_info = function (n) {
                    var msg = n.body;
                    if (msg.infos != null) {
                        for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this._model.child_infos[info.child_index] = info;
                        }
                    }
                    this.updateUpstarHint();
                    this.sendNt("on_update_child_info" /* ON_UPDATE_CHILD_INFO */);
                };
                // 子女羁绊
                ChildProxy.prototype.c2s_child_oper_jiban = function (jiban_index, child_index) {
                    var msg = new c2s_child_oper_jiban();
                    msg.jiban_index = jiban_index;
                    if (child_index) {
                        msg.child_index = child_index;
                        this._actJibanMap[child_index] = true;
                    }
                    this.sendProto(msg);
                };
                // 子女羁绊返回
                ChildProxy.prototype.s2c_child_oper_jiban = function (n) {
                    var msg = n.body;
                    if (msg.infos != null) {
                        for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this._model.jiban_infos[info.jiban_index] = info;
                            if (info.child_index && info.child_index.length) {
                                for (var _b = 0, _c = info.child_index; _b < _c.length; _b++) {
                                    var id = _c[_b];
                                    if (this._actJibanMap[id]) {
                                        mod.ViewMgr.getIns().showSuccessTips(1 /* Act */);
                                        this._actJibanMap[id] = null;
                                        delete this._actJibanMap[id];
                                    }
                                }
                            }
                        }
                    }
                    this.updateJibanHint();
                    this.updateUpstarHint();
                    this.sendNt("on_update_child_jiban_info" /* ON_UPDATE_CHILD_JIBAN_INFO */);
                };
                // 激活/升星 神兵
                ChildProxy.prototype.c2s_child_oper_shenbin = function (type, index) {
                    var msg = new c2s_child_oper_shenbin();
                    msg.shenbin_type = type;
                    msg.shenbin_index = index;
                    this.sendProto(msg);
                };
                // 子女神兵返回
                ChildProxy.prototype.s2c_child_shenbin_info = function (n) {
                    var msg = n.body;
                    if (msg.infos != null) {
                        for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                            var info = _a[_i];
                            if (!this._model.infos[info.shenbin_type]) {
                                this._model.infos[info.shenbin_type] = {};
                            }
                            this._model.infos[info.shenbin_type][info.shenbin_index] = info;
                        }
                    }
                    this.updateSurfaceHint();
                    this.sendNt("on_update_child_shenbing_info" /* ON_UPDATE_CHILD_SHENBING_INFO */);
                };
                //子女共享技能激活
                ChildProxy.prototype.c2s_child_share_skill_act = function (skill_index) {
                    var msg = new c2s_child_share_skill_act();
                    msg.skill_index = skill_index;
                    this.sendProto(msg);
                };
                /**
                 * 子女装备神兵灵翼
                 * 一键装备，1就是一键，null就传下面两个数据
                 */
                ChildProxy.prototype.c2s_child_equip = function (child_index, is_onekey, type, index) {
                    var msg = new c2s_child_equip();
                    msg.child_index = child_index;
                    msg.is_onekey = is_onekey || 0;
                    if (type) {
                        msg.shenbin_type = type;
                    }
                    if (index) {
                        msg.shenbin_index = index;
                    }
                    this.sendProto(msg);
                };
                // 子女上阵
                ChildProxy.prototype.c2s_child_into_battle = function (child_index, pos) {
                    var msg = new c2s_child_into_battle();
                    msg.child_index = child_index;
                    msg.pos = pos;
                    this.sendProto(msg);
                };
                // 子女共享返回
                ChildProxy.prototype.s2c_child_share_info = function (n) {
                    var msg = n.body;
                    this._model.child_list = msg.child_list != null ? msg.child_list : [];
                    this._model.skill_list = msg.skill_list != null ? msg.skill_list : [];
                    this.updateShareSkillHint();
                    this.sendNt("on_update_child_share_info" /* ON_UPDATE_CHILD_SHARE_INFO */);
                };
                /**=============================== 协议 end ===============================*/
                ChildProxy.prototype.getChildInfos = function () {
                    return this._model.child_infos;
                };
                ChildProxy.prototype.getChildInfo = function (index) {
                    return this._model.child_infos[index];
                };
                ChildProxy.prototype.getJibanInfo = function (jiban_index) {
                    return this._model.jiban_infos[jiban_index];
                };
                ChildProxy.prototype.getChildCfg = function (index) {
                    var cfg = game.getConfigByNameId("child.json" /* Child */, index);
                    if (!cfg) {
                        DEBUG && console.error("\u4ED9\u4FA3-\u5B50\u5973\u6CA1\u6709\u914D\u7F6E\uFF1A" + index);
                        return null;
                    }
                    return cfg;
                };
                ChildProxy.prototype.getChildCfgsByType = function (type) {
                    if (this._childCfgsMap && this._childCfgsMap[type]) {
                        return this._childCfgsMap[type];
                    }
                    this._childCfgsMap = {};
                    var cfgList = game.getConfigListByName("child.json" /* Child */);
                    for (var _i = 0, cfgList_2 = cfgList; _i < cfgList_2.length; _i++) {
                        var cfg = cfgList_2[_i];
                        if (!this._childCfgsMap[cfg.type]) {
                            this._childCfgsMap[cfg.type] = [];
                        }
                        this._childCfgsMap[cfg.type].push(cfg);
                    }
                    return this._childCfgsMap[type];
                };
                ChildProxy.prototype.getJibanCfg = function (jiban_index) {
                    var cfg = game.getConfigByNameId("child_jiban.json" /* ChildJiban */, jiban_index);
                    if (!cfg) {
                        DEBUG && console.error("\u4ED9\u4FA3-\u5B50\u5973\u7F81\u7ECA\u6CA1\u6709\u914D\u7F6E: " + jiban_index);
                        return null;
                    }
                    return cfg;
                };
                ChildProxy.prototype.getChildStarCfgObj = function (index) {
                    var cfgObj = game.getConfigByNameId("child_shengxing.json" /* ChildStar */, index);
                    if (!cfgObj) {
                        if (!this._errorMap[index]) {
                            DEBUG && console.error("\u4ED9\u4FA3-\u5B50\u5973\u5347\u661F\u6CA1\u6709\u914D\u7F6E: " + index);
                            this._errorMap[index] = true;
                        }
                        return null;
                    }
                    return cfgObj;
                };
                ChildProxy.prototype.getChildStarCfg = function (index, star) {
                    var cfgObj = this.getChildStarCfgObj(index);
                    if (!cfgObj || !cfgObj[star]) {
                        return null;
                    }
                    return cfgObj[star];
                };
                ChildProxy.prototype.getMaxStar = function (index) {
                    if (this._maxStarMap[index] != null) {
                        return this._maxStarMap[index];
                    }
                    var cfgObj = this.getChildStarCfgObj(index);
                    this._maxStarMap[index] = Object.keys(cfgObj).length;
                    return this._maxStarMap[index];
                };
                ChildProxy.prototype.isMaxStar = function (index) {
                    var info = this.getChildInfo(index);
                    if (!info) {
                        return false;
                    }
                    var maxStar = this.getMaxStar(index);
                    return info.star_lv >= maxStar;
                };
                ChildProxy.prototype.getStar = function (index) {
                    var info = this.getChildInfo(index);
                    return info ? info.star_lv : 0;
                };
                /**
                 * @param index
                 * @param star 可不传，则获取下一星级
                 */
                ChildProxy.prototype.getCost = function (index, star) {
                    if (star == null) {
                        if (this.isMaxStar(index)) {
                            star = this.getMaxStar(index);
                        }
                        else {
                            star = this.getStar(index) || 0;
                            star += 1;
                        }
                    }
                    var cfg = this.getChildStarCfg(index, star);
                    return cfg ? cfg.star_consume : null;
                };
                ChildProxy.prototype.canActOrUp = function (index, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isMaxStar(index)) {
                        if (isTips) {
                            game.PromptBox.getIns().show(game.getLanById("maxstar" /* maxstar */));
                        }
                        return false;
                    }
                    var cost = this.getCost(index);
                    if (!cost) {
                        return false;
                    }
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                ChildProxy.prototype.isActed = function (index) {
                    var info = this.getChildInfo(index);
                    return info && info.star_lv > 0;
                };
                ChildProxy.prototype.isActedJiban = function (jiban_index) {
                    var info = this.getJibanInfo(jiban_index);
                    return info && info.is_acted;
                };
                ChildProxy.prototype.isJibanChildActed = function (jiban_index, child_index) {
                    var info = this.getJibanInfo(jiban_index);
                    return info && info.child_index && info.child_index.indexOf(child_index) > -1;
                };
                ChildProxy.prototype.canActJiban = function (jiban_index, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isActedJiban(jiban_index)) {
                        return false;
                    }
                    var info = this.getJibanInfo(jiban_index);
                    var actedLen = info && info.child_index ? info.child_index.length : 0;
                    var jibanCfg = this.getJibanCfg(jiban_index);
                    var len = jibanCfg && jibanCfg.partners ? jibanCfg.partners.length : 0;
                    if (actedLen < len) {
                        if (isTips) {
                            // PromptBox.getIns().show(`条件不足`);
                            game.PromptBox.getIns().show(game.getLanById("jiban_tips1" /* jiban_tips1 */));
                        }
                        return false;
                    }
                    return true;
                };
                ChildProxy.prototype.canActJibanChild = function (jiban_index, child_index) {
                    if (this.isJibanChildActed(jiban_index, child_index)) {
                        return false;
                    }
                    return this.isActed(child_index);
                };
                ChildProxy.prototype.isSkillActed = function (index, idx) {
                    var star = this.getStar(index);
                    var cfg = this.getChildCfg(index);
                    var skillItem = cfg && cfg.passive_skill_idc ? cfg.passive_skill_idc[idx] : [];
                    var needStar = skillItem[1] || 0;
                    return star >= needStar;
                };
                //todo
                ChildProxy.prototype.getVipList = function () {
                    var paramCfg = game.GameConfig.getParamConfigById('child_pos_vip');
                    if (!paramCfg) {
                        return [2, 4, 6, 8];
                    }
                    return paramCfg.value;
                };
                ChildProxy.prototype.getActedSkillList = function () {
                    return this._model.skill_list || [];
                };
                ChildProxy.prototype.getBattleChildList = function () {
                    return this._model.child_list || [];
                };
                ChildProxy.prototype.getChildList = function () {
                    var infos = this._model.child_infos;
                    var list = [];
                    for (var key in infos) {
                        list.push(infos[key]);
                    }
                    return list;
                };
                ChildProxy.prototype.haveChildForShangzhen = function () {
                    return this.getChildList().length > 0;
                };
                ChildProxy.prototype.getChildPower = function () {
                    var infos = this._model.child_infos;
                    var power = 0;
                    for (var key in infos) {
                        var info = infos[key];
                        if (info && info.star_attr && info.star_attr.showpower) {
                            power += info.star_attr.showpower.toNumber();
                        }
                    }
                    return power;
                };
                ChildProxy.prototype.isBattle = function (child_index) {
                    var battleList = this.getBattleChildList();
                    return battleList.indexOf(child_index) > -1;
                };
                //子女的装备index，[神兵, 灵翼]
                ChildProxy.prototype.getEquipList = function (child_index) {
                    var info = this.getChildInfo(child_index);
                    if (!info || !info.equip_list) {
                        return [];
                    }
                    if (info.equip_list.length == 2) {
                        return info.equip_list.sort(function (a, b) { return a - b; });
                    }
                    var index = info.equip_list[0];
                    var propType = game.PropData.getPropParse(index);
                    var isShenbing = propType == 602 /* ChildShenbing */;
                    return isShenbing ? [index, null] : [null, index];
                };
                ChildProxy.prototype.getShareSkillList = function () {
                    var paramCfg = game.GameConfig.getParamConfigById('child_skill');
                    return paramCfg ? paramCfg.value : [];
                };
                ChildProxy.prototype.getSurfaceCfgList = function (type, tabType) {
                    if (this._surfaceMap[type] && this._surfaceMap[type][tabType]) {
                        return this._surfaceMap[type][tabType];
                    }
                    var map = this._surfaceMap[type];
                    if (!map) {
                        this._surfaceMap[type] = map = {};
                    }
                    var configName = type == 1 /* Shenbing */ ? "child_shenbing.json" /* ChildShenbing */ : "child_lingyi.json" /* ChildLingyi */;
                    var cfgList = game.getConfigListByName(configName);
                    for (var _i = 0, cfgList_3 = cfgList; _i < cfgList_3.length; _i++) {
                        var cfg = cfgList_3[_i];
                        if (!map[cfg.type]) {
                            map[cfg.type] = [];
                        }
                        map[cfg.type].push(cfg);
                    }
                    return map[tabType];
                };
                ChildProxy.prototype.getSurfaceCfg = function (type, index) {
                    var configName = type == 1 /* Shenbing */ ? "child_shenbing.json" /* ChildShenbing */ : "child_lingyi.json" /* ChildLingyi */;
                    var cfg = game.getConfigByNameId(configName, index);
                    if (!cfg) {
                        DEBUG && console.error(configName + " \u6CA1\u6709\u914D\u7F6E\uFF1A" + index);
                        return null;
                    }
                    return cfg;
                };
                ChildProxy.prototype.getSurfaceTypeInfo = function (type) {
                    return this._model.infos[type];
                };
                ChildProxy.prototype.getSurfaceInfo = function (type, index) {
                    var info = this.getSurfaceTypeInfo(type);
                    return info && info[index];
                };
                ChildProxy.prototype.isActedSurface = function (type, index) {
                    var info = this.getSurfaceInfo(type, index);
                    return info && info.shenbin_lv > 0;
                };
                ChildProxy.prototype.getBattleSurfaceList = function () {
                    var infos = this._model.child_infos;
                    var list = [];
                    for (var key in infos) {
                        var info = infos[key];
                        if (!info || !info.equip_list) {
                            continue;
                        }
                        list.push.apply(list, info.equip_list);
                    }
                    return list;
                };
                ChildProxy.prototype.getMaxStarSurface = function (type, index) {
                    if (this._surfaceStarMap[type] && this._surfaceStarMap[type][index]) {
                        return this._surfaceStarMap[type][index];
                    }
                    var map = this._surfaceStarMap[type];
                    if (!map) {
                        this._surfaceStarMap[type] = map = {};
                    }
                    var cfg = this.getSurfaceCfg(type, index);
                    var len = cfg && cfg.material ? cfg.material.length : 0;
                    map[index] = len;
                    return len;
                };
                ChildProxy.prototype.getStarSurface = function (type, index) {
                    var info = this.getSurfaceInfo(type, index);
                    return info && info.shenbin_lv || 0;
                };
                ChildProxy.prototype.isMaxStarSurface = function (type, index) {
                    var curStar = this.getStarSurface(type, index);
                    var maxStar = this.getMaxStarSurface(type, index);
                    return curStar >= maxStar;
                };
                ChildProxy.prototype.getCostSurface = function (type, index) {
                    var curStar = this.getStarSurface(type, index);
                    if (!this.isMaxStarSurface(type, index)) {
                        curStar += 1;
                    }
                    var cfg = this.getSurfaceCfg(type, index);
                    if (!cfg || !cfg.material[curStar - 1]) {
                        return null;
                    }
                    return cfg.material[curStar - 1];
                };
                ChildProxy.prototype.canActOrUpSurface = function (type, index, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isMaxStarSurface(type, index)) {
                        if (isTips) {
                            game.PromptBox.getIns().show(game.getLanById("maxstar" /* maxstar */));
                        }
                        return false;
                    }
                    var cost = this.getCostSurface(type, index);
                    if (!cost) {
                        return false;
                    }
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                // type: 1主动技能，2被动技能
                ChildProxy.prototype.getChildSkill = function (type) {
                    var cfg = game.GameConfig.getParamConfigById('child_skill');
                    if (!cfg) {
                        return null;
                    }
                    return type == 1 ? [cfg.value[0]] : cfg.value.slice(1).slice();
                };
                ChildProxy.prototype.checkOneKeyPower = function (equipId) {
                    var type = game.PropData.getPropParse(equipId) == 602 /* ChildShenbing */ ? 1 /* Shenbing */ : 2 /* Lingyi */;
                    var typeInfo = this.getSurfaceTypeInfo(type);
                    if (!typeInfo) {
                        return false;
                    }
                    var info = this.getSurfaceInfo(type, equipId);
                    var power = info && info.shenbin_attr && info.shenbin_attr.showpower ? info.shenbin_attr.showpower.toNumber() : 0;
                    for (var key in typeInfo) {
                        var item = typeInfo[key];
                        var itemPower = item && item.shenbin_attr && item.shenbin_attr.showpower ? item.shenbin_attr.showpower.toNumber() : 0;
                        if (itemPower > power) {
                            return true;
                        }
                    }
                    return false;
                };
                ChildProxy.prototype.canOneKey = function (child_index, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    var infos = this._model.infos;
                    var can = infos && Object.keys(infos).length > 0;
                    if (!can) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u65E0\u88C5\u5907\u53EF\u7A7F\u6234");
                        }
                        return false;
                    }
                    var equipList = this.getEquipList(child_index);
                    if (equipList && equipList.length) {
                        //已穿戴的，检查战力高
                        for (var i = 0; i < equipList.length; i++) {
                            var equipId = equipList[i];
                            if (!equipId) {
                                equipId = i == 0 ? 602 /* ChildShenbing */ : 603 /* ChildLingyi */;
                            }
                            if (equipId && this.checkOneKeyPower(equipId)) {
                                return true;
                            }
                        }
                    }
                    else {
                        //未穿戴的，有相应装备即可
                        var ary = [1 /* Shenbing */, 2 /* Lingyi */];
                        for (var _i = 0, ary_1 = ary; _i < ary_1.length; _i++) {
                            var type = ary_1[_i];
                            if (infos[type]) {
                                return true;
                            }
                        }
                    }
                    if (isTips) {
                        game.PromptBox.getIns().show("\u65E0\u88C5\u5907\u53EF\u7A7F\u6234");
                    }
                    return false;
                };
                // todo 子女战力+子女翅膀+子女神兵
                ChildProxy.prototype.getPower = function () {
                    var attr = this.getAttr();
                    return attr && attr.showpower ? attr.showpower.toNumber() : 0;
                };
                //总属性
                ChildProxy.prototype.getAttr = function () {
                    var attrList = [];
                    var childMap = this._model.child_infos;
                    for (var key in childMap) {
                        var item = childMap[key];
                        if (item && item.star_attr && item.star_attr.showpower) {
                            attrList.push(item.star_attr);
                        }
                    }
                    var map = this._model.infos;
                    for (var key in map) {
                        var map1 = map[key];
                        if (!map1) {
                            continue;
                        }
                        for (var index in map1) {
                            var item = map1[index];
                            if (item && item.shenbin_attr && item.shenbin_attr.showpower) {
                                attrList.push(item.shenbin_attr);
                            }
                        }
                    }
                    return game.TextUtil.calcAttrList(attrList);
                };
                //上阵子女战力
                ChildProxy.prototype.getSharePower = function () {
                    var childList = this._model.child_list || [];
                    var power = 0;
                    for (var _i = 0, childList_1 = childList; _i < childList_1.length; _i++) {
                        var id = childList_1[_i];
                        var info = this.getChildInfo(id);
                        if (info && info.star_attr && info.star_attr.showpower) {
                            power += info.star_attr.showpower.toNumber();
                        }
                    }
                    return power;
                };
                /**=============================== hint ===============================*/
                ChildProxy.prototype.getSkillHint = function (skillId) {
                    var actedList = this.getActedSkillList();
                    if (actedList && actedList.indexOf(skillId) > -1) {
                        return false;
                    }
                    var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                    if (!skillCfg || !skillCfg.act_material) {
                        return false;
                    }
                    var cost = skillCfg.act_material[0];
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                };
                //被动技能红点
                ChildProxy.prototype.updateShareSkillHint = function () {
                    var skillList = this.getShareSkillList();
                    var hint = false;
                    for (var i = 1; i < skillList.length; i++) {
                        var skillId = skillList[i];
                        if (this.getSkillHint(skillId)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.hintPath[1]);
                };
                ChildProxy.prototype.getSkillActCost = function () {
                    if (this._skillCost && this._skillCost.length) {
                        return this._skillCost;
                    }
                    var skillList = this.getShareSkillList();
                    for (var _i = 0, skillList_1 = skillList; _i < skillList_1.length; _i++) {
                        var skill = skillList_1[_i];
                        var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skill);
                        if (skillCfg && skillCfg.act_material) {
                            var cost = skillCfg.act_material[0];
                            if (cost && this._skillCost.indexOf(cost[0]) < 0) {
                                this._skillCost.push(cost[0]);
                            }
                        }
                    }
                    return this._skillCost;
                };
                ChildProxy.prototype.getHintByChildIndex = function (index) {
                    return this.canActOrUp(index);
                };
                ChildProxy.prototype.getHintByJibanIndex = function (jiban_index) {
                    var jibanCfg = this.getJibanCfg(jiban_index);
                    if (!jibanCfg || !jibanCfg.partners) {
                        return false;
                    }
                    for (var _i = 0, _a = jibanCfg.partners; _i < _a.length; _i++) {
                        var idx = _a[_i];
                        if (this.canActJibanChild(jiban_index, idx)) {
                            return true;
                        }
                    }
                    return this.canActJiban(jiban_index);
                };
                ChildProxy.prototype.getJibanHint = function () {
                    var cfgList = game.getConfigListByName("child_jiban.json" /* ChildJiban */);
                    var hint = false;
                    for (var _i = 0, cfgList_4 = cfgList; _i < cfgList_4.length; _i++) {
                        var cfg = cfgList_4[_i];
                        if (this.getHintByJibanIndex(cfg.index)) {
                            hint = true;
                            break;
                        }
                    }
                    return hint;
                };
                ChildProxy.prototype.updateJibanHint = function () {
                    var hint = this.getJibanHint();
                    mod.HintMgr.setHint(hint, this._model.jibanHintPath);
                };
                ChildProxy.prototype.getUpstarHintBytype = function (type) {
                    var cfgList = this.getChildCfgsByType(type);
                    var hint = false;
                    for (var _i = 0, cfgList_5 = cfgList; _i < cfgList_5.length; _i++) {
                        var cfg = cfgList_5[_i];
                        if (this.getHintByChildIndex(cfg.index) || this.getJibanHint()) {
                            hint = true;
                            break;
                        }
                    }
                    return hint;
                };
                //升星红点
                ChildProxy.prototype.updateUpstarHint = function () {
                    for (var i = 1; i <= 4; i++) {
                        var hint = this.getUpstarHintBytype(i);
                        mod.HintMgr.setHint(hint, this._model.hintPath[2][i]);
                    }
                };
                ChildProxy.prototype.getSurfaceHint = function (type, tabType) {
                    var cfgList = this.getSurfaceCfgList(type, tabType);
                    for (var _i = 0, cfgList_6 = cfgList; _i < cfgList_6.length; _i++) {
                        var cfg = cfgList_6[_i];
                        if (this.canActOrUpSurface(type, cfg.index)) {
                            return true;
                        }
                    }
                    return false;
                };
                //神兵，灵翼红点
                ChildProxy.prototype.updateSurfaceHint = function () {
                    var surfaceType = [1 /* Shenbing */, 2 /* Lingyi */];
                    var tabType = [1 /* Type1 */, 2 /* Type2 */];
                    for (var _i = 0, surfaceType_1 = surfaceType; _i < surfaceType_1.length; _i++) {
                        var type = surfaceType_1[_i];
                        for (var _a = 0, tabType_1 = tabType; _a < tabType_1.length; _a++) {
                            var tab = tabType_1[_a];
                            var hint = this.getSurfaceHint(type, tab);
                            mod.HintMgr.setHint(hint, this._model.hintPath[type + 2][tab]); //需加2，对应一级页签
                        }
                    }
                };
                ChildProxy.prototype.onBagUpdateByBagType = function (n) {
                    var bagTypes = n.body;
                    if (bagTypes.indexOf(2 /* Material */) > -1) {
                        this.updateUpstarHint();
                        this.updateSurfaceHint();
                    }
                };
                ChildProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    var skillCost = this.getSkillActCost();
                    for (var _i = 0, skillCost_1 = skillCost; _i < skillCost_1.length; _i++) {
                        var id = skillCost_1[_i];
                        if (indexs.indexOf(id) > -1) {
                            this.updateShareSkillHint();
                            break;
                        }
                    }
                };
                return ChildProxy;
            }(game.ProxyBase));
            xianyuan.ChildProxy = ChildProxy;
            __reflect(ChildProxy.prototype, "game.mod.xianyuan.ChildProxy", ["game.mod.IChildProxy", "base.IProxy"]);
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildHuanzhuangIconSel = /** @class */ (function (_super) {
                __extends(ChildHuanzhuangIconSel, _super);
                function ChildHuanzhuangIconSel() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ChildHuanzhuangIconSel.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.icon.setImgActed(true);
                    this.icon.updateIconImg(data.icon);
                    this.icon.updateQualityImg(game.ResUtil.getPropQualityImg(data.quality));
                    this.redPoint.visible = false;
                };
                return ChildHuanzhuangIconSel;
            }(mod.IconSel));
            xianyuan.ChildHuanzhuangIconSel = ChildHuanzhuangIconSel;
            __reflect(ChildHuanzhuangIconSel.prototype, "game.mod.xianyuan.ChildHuanzhuangIconSel");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildHuanzhuangView = /** @class */ (function (_super) {
                __extends(ChildHuanzhuangView, _super);
                function ChildHuanzhuangView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.ChildHuanzhuangSkin";
                    return _this;
                }
                return ChildHuanzhuangView;
            }(eui.Component));
            xianyuan.ChildHuanzhuangView = ChildHuanzhuangView;
            __reflect(ChildHuanzhuangView.prototype, "game.mod.xianyuan.ChildHuanzhuangView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var facade = base.facade;
            var ChildItem = /** @class */ (function (_super) {
                __extends(ChildItem, _super);
                function ChildItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.ChildItemSkin";
                    return _this;
                }
                ChildItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("58" /* Xianyuan */, 227 /* Child */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
                };
                ChildItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.img_add.visible = data.isActed && !data.childIndex;
                    this.lb_cond.visible = !data.isActed;
                    this.img_sketch.visible = !data.childIndex;
                    this.lb_cond.text = game.StringUtil.substitute(game.getLanById("xianlv_tips19" /* xianlv_tips19 */), [this.data.vip]);
                    if (data.childIndex) {
                        var cfg = this._proxy.getChildCfg(data.childIndex);
                        this.removeEft();
                        this.addAnimate(data.childIndex, this.gr_eft);
                    }
                };
                ChildItem.prototype.onClick = function () {
                    if (!this.data.isActed) {
                        var txt = game.StringUtil.substitute(game.getLanById("xianlv_tips19" /* xianlv_tips19 */), [this.data.vip]);
                        game.PromptBox.getIns().show(txt);
                        return;
                    }
                    if (!this._proxy.haveChildForShangzhen()) {
                        // PromptBox.getIns().show(getLanById(LanDef.xianlv_tips18));
                        facade.showView("58" /* Xianyuan */, "07" /* Zhaohuan */);
                        return;
                    }
                    facade.showView("58" /* Xianyuan */, "13" /* ChildShangzhen */, this.data.pos);
                };
                return ChildItem;
            }(mod.BaseRenderer));
            xianyuan.ChildItem = ChildItem;
            __reflect(ChildItem.prototype, "game.mod.xianyuan.ChildItem");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildShangzhenView = /** @class */ (function (_super) {
                __extends(ChildShangzhenView, _super);
                function ChildShangzhenView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.ChildShangzhenSkin";
                    return _this;
                }
                return ChildShangzhenView;
            }(eui.Component));
            xianyuan.ChildShangzhenView = ChildShangzhenView;
            __reflect(ChildShangzhenView.prototype, "game.mod.xianyuan.ChildShangzhenView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildShenbingView = /** @class */ (function (_super) {
                __extends(ChildShenbingView, _super);
                function ChildShenbingView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.ChildShenbingSkin";
                    return _this;
                }
                return ChildShenbingView;
            }(eui.Component));
            xianyuan.ChildShenbingView = ChildShenbingView;
            __reflect(ChildShenbingView.prototype, "game.mod.xianyuan.ChildShenbingView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildSkillTipsView = /** @class */ (function (_super) {
                __extends(ChildSkillTipsView, _super);
                function ChildSkillTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.ChildSkillTipsSkin";
                    return _this;
                }
                return ChildSkillTipsView;
            }(eui.Component));
            xianyuan.ChildSkillTipsView = ChildSkillTipsView;
            __reflect(ChildSkillTipsView.prototype, "game.mod.xianyuan.ChildSkillTipsView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildUpStarView = /** @class */ (function (_super) {
                __extends(ChildUpStarView, _super);
                function ChildUpStarView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.ChildUpStarSkin";
                    return _this;
                }
                return ChildUpStarView;
            }(eui.Component));
            xianyuan.ChildUpStarView = ChildUpStarView;
            __reflect(ChildUpStarView.prototype, "game.mod.xianyuan.ChildUpStarView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildView = /** @class */ (function (_super) {
                __extends(ChildView, _super);
                function ChildView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.ChildSkin";
                    return _this;
                }
                return ChildView;
            }(eui.Component));
            xianyuan.ChildView = ChildView;
            __reflect(ChildView.prototype, "game.mod.xianyuan.ChildView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildHuanzhuangMdr = /** @class */ (function (_super) {
                __extends(ChildHuanzhuangMdr, _super);
                function ChildHuanzhuangMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.ChildHuanzhuangView);
                    _this._selBtnIdx = 0;
                    _this._selItemIdx = 0;
                    _this._selAvatarIdx = 0;
                    _this.isEasyHide = true;
                    return _this;
                }
                ChildHuanzhuangMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.gr_eft.touchEnabled = false;
                    this._proxy = this.retProxy(227 /* Child */);
                    this._view.list_avatar.itemRenderer = mod.AvatarItem;
                    this._view.list_avatar.dataProvider = this._listAvatar = new eui.ArrayCollection();
                    this._view.list_item.itemRenderer = xianyuan.ChildHuanzhuangIconSel;
                    this._view.list_item.dataProvider = this._listItem = new eui.ArrayCollection();
                    this._view.list_btn.itemRenderer = mod.TabSecondItem;
                    this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
                };
                ChildHuanzhuangMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
                    addEventListener(this._view.list_avatar, eui.ItemTapEvent.ITEM_TAP, this.onClickListAvatar, this);
                    addEventListener(this._view.list_item, eui.ItemTapEvent.ITEM_TAP, this.onClickListItem, this);
                    addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickListBtn, this);
                    this.onNt("on_update_child_info" /* ON_UPDATE_CHILD_INFO */, this.updateModel, this);
                };
                ChildHuanzhuangMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateListBtn();
                    this.updateListItem();
                    this.updateInfo();
                    this.updateModel();
                };
                ChildHuanzhuangMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selBtnIdx = 0;
                    this._selItemIdx = 0;
                    this._selAvatarIdx = 0;
                    this._selChildCfg = null;
                    this.removeEffect(this._eftIdx);
                    this._eftIdx = null;
                };
                ChildHuanzhuangMdr.prototype.updateListBtn = function () {
                    var list = [];
                    var iconAry = ['tubiao_shenbing', 'tubiao_lingyi'];
                    for (var _i = 0, iconAry_1 = iconAry; _i < iconAry_1.length; _i++) {
                        var icon = iconAry_1[_i];
                        list.push({
                            icon: icon,
                            showHint: false //todo
                        });
                    }
                    this._listBtn.replaceAll(list);
                    this._view.list_btn.selectedIndex = this._selBtnIdx = 0;
                };
                ChildHuanzhuangMdr.prototype.updateListItem = function () {
                    var infoObj = this._proxy.getChildInfos();
                    var list = [];
                    if (infoObj) {
                        for (var key in infoObj) {
                            var info = infoObj[key];
                            if (!info) {
                                continue;
                            }
                            var cfg = this._proxy.getChildCfg(info.child_index);
                            if (cfg) {
                                list.push(cfg);
                            }
                        }
                    }
                    this._listItem.replaceAll(list);
                    this._view.list_item.selectedIndex = this._selItemIdx = 0;
                    this._selChildCfg = list[this._selItemIdx];
                };
                ChildHuanzhuangMdr.prototype.updateListAvatar = function () {
                    var type = this._selBtnIdx + 1;
                    var surfaceTypeObj = this._proxy.getSurfaceTypeInfo(type);
                    var battleList = this._proxy.getBattleSurfaceList();
                    var list = [];
                    for (var key in surfaceTypeObj) {
                        var info = surfaceTypeObj[key];
                        if (!info) {
                            continue;
                        }
                        var cfg = this._proxy.getSurfaceCfg(type, info.shenbin_index);
                        if (!cfg) {
                            continue;
                        }
                        list.push({
                            cfg: cfg,
                            showHint: false,
                            star: info.shenbin_lv,
                            isBattle: false // battleList.indexOf(info.shenbin_index) > -1
                        });
                    }
                    this._listAvatar.replaceAll(list);
                    this._view.list_avatar.selectedIndex = this._selAvatarIdx = 0;
                };
                ChildHuanzhuangMdr.prototype.updateInfo = function () {
                    var type = this._selBtnIdx + 1; //神兵，灵翼
                    var typeName = game.XianlvSurfaceName[type];
                    this._view.lb_select.text = game.StringUtil.substitute(game.getLanById("xianlv_tips22" /* xianlv_tips22 */), [typeName]);
                    var surfaceTypeObj = this._proxy.getSurfaceTypeInfo(type);
                    var haveAvatar = surfaceTypeObj && Object.keys(surfaceTypeObj).length > 0;
                    this._view.scroller_avatar.visible = haveAvatar;
                    this._view.lb_desc.visible = !haveAvatar;
                    if (!haveAvatar) {
                        this._view.lb_desc.text = game.StringUtil.substitute(game.getLanById("xianlv_tips21" /* xianlv_tips21 */), [typeName]);
                    }
                    if (haveAvatar) {
                        this.updateListAvatar();
                    }
                };
                ChildHuanzhuangMdr.prototype.updateModel = function () {
                    if (!this._selChildCfg) {
                        return;
                    }
                    var cfg = this._selChildCfg;
                    this._view.nameItem.updateShow(cfg.name, cfg.quality);
                    this.removeEffect(this._eftIdx);
                    this._eftIdx = this.addAnimate(cfg.index, this._view.gr_eft);
                    var equipList = this._proxy.getEquipList(cfg.index);
                    var equipCfg;
                    if (equipList[0]) {
                        equipCfg = this._proxy.getSurfaceCfg(1 /* Shenbing */, equipList[0]);
                    }
                    var icon = equipCfg ? equipCfg.icon : 'icon_jia';
                    this._view.icon0.updateIconImg(icon);
                    this._view.icon0.updateQualityImg(game.ResUtil.getPropQualityImg(equipCfg && equipCfg.quality || 0));
                    if (equipList[1]) {
                        equipCfg = this._proxy.getSurfaceCfg(2 /* Lingyi */, equipList[1]);
                    }
                    else {
                        equipCfg = null;
                    }
                    icon = equipCfg ? equipCfg.icon : 'icon_jia';
                    this._view.icon1.updateIconImg(icon);
                    this._view.icon1.updateQualityImg(game.ResUtil.getPropQualityImg(equipCfg && equipCfg.quality || 0));
                };
                ChildHuanzhuangMdr.prototype.onClickOneKey = function () {
                    if (this._proxy.canOneKey(this._selChildCfg.index, true)) {
                        this._proxy.c2s_child_equip(this._selChildCfg.index, 1);
                    }
                };
                ChildHuanzhuangMdr.prototype.onClickListAvatar = function (e) {
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selAvatarIdx) {
                        return;
                    }
                    this._selAvatarIdx = itemIdx;
                    this.updateModel();
                };
                ChildHuanzhuangMdr.prototype.onClickListItem = function (e) {
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selItemIdx) {
                        return;
                    }
                    this._selItemIdx = itemIdx;
                    this._selChildCfg = e.item;
                    this.updateModel();
                };
                ChildHuanzhuangMdr.prototype.onClickListBtn = function (e) {
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selBtnIdx) {
                        return;
                    }
                    this._selBtnIdx = itemIdx;
                    this.updateListItem();
                    this.updateInfo();
                    this.updateModel();
                };
                return ChildHuanzhuangMdr;
            }(game.EffectMdrBase));
            xianyuan.ChildHuanzhuangMdr = ChildHuanzhuangMdr;
            __reflect(ChildHuanzhuangMdr.prototype, "game.mod.xianyuan.ChildHuanzhuangMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildLingyiMainMdr = /** @class */ (function (_super) {
                __extends(ChildLingyiMainMdr, _super);
                function ChildLingyiMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "child_lingyi_tab1",
                            mdr: xianyuan.ChildLingyiMdr,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "04" /* Lingyi */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "child_lingyi_tab2",
                            mdr: xianyuan.ChildLingyiMdr2,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "04" /* Lingyi */, "02" /* TabBtnType02 */]
                        }
                    ];
                    return _this;
                }
                ChildLingyiMainMdr.prototype.onTabChanged = function () {
                    _super.prototype.onTabChanged.call(this);
                    this.sendNt("update_wnd_second_mdr_top" /* UPDATE_WND_SECOND_MDR_TOP */);
                };
                return ChildLingyiMainMdr;
            }(mod.WndSecondMdr));
            xianyuan.ChildLingyiMainMdr = ChildLingyiMainMdr;
            __reflect(ChildLingyiMainMdr.prototype, "game.mod.xianyuan.ChildLingyiMainMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildLingyiMdr = /** @class */ (function (_super) {
                __extends(ChildLingyiMdr, _super);
                function ChildLingyiMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._surfaceType = 2 /* Lingyi */;
                    _this._tabType = 1 /* Type1 */;
                    return _this;
                }
                ChildLingyiMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                };
                ChildLingyiMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                ChildLingyiMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                };
                ChildLingyiMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return ChildLingyiMdr;
            }(xianyuan.ChildShenbingMdr));
            xianyuan.ChildLingyiMdr = ChildLingyiMdr;
            __reflect(ChildLingyiMdr.prototype, "game.mod.xianyuan.ChildLingyiMdr");
            var ChildLingyiMdr2 = /** @class */ (function (_super) {
                __extends(ChildLingyiMdr2, _super);
                function ChildLingyiMdr2() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._surfaceType = 2 /* Lingyi */;
                    _this._tabType = 2 /* Type2 */;
                    return _this;
                }
                return ChildLingyiMdr2;
            }(ChildLingyiMdr));
            xianyuan.ChildLingyiMdr2 = ChildLingyiMdr2;
            __reflect(ChildLingyiMdr2.prototype, "game.mod.xianyuan.ChildLingyiMdr2");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var Handler = base.Handler;
            var facade = base.facade;
            var ChildMdr = /** @class */ (function (_super) {
                __extends(ChildMdr, _super);
                function ChildMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianyuan.ChildView);
                    return _this;
                }
                ChildMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(227 /* Child */);
                    this._xianlvProxy = this.retProxy(226 /* Xianlv */);
                    this._view.list_skill.itemRenderer = mod.SkillItemRender;
                    this._view.list_skill.dataProvider = this._listSkill = new eui.ArrayCollection();
                    this._view.list.itemRenderer = xianyuan.ChildItem;
                    this._view.list.dataProvider = this._listChild = new eui.ArrayCollection();
                };
                ChildMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.btn_check, egret.TouchEvent.TOUCH_TAP, this.onClickCheck, this);
                    addEventListener(this._view.skillItem, egret.TouchEvent.TOUCH_TAP, this.onClickSkill, this);
                    addEventListener(this._view.list_skill, eui.ItemTapEvent.ITEM_TAP, this.onClickListSkill, this);
                    this.onNt("on_update_child_share_info" /* ON_UPDATE_CHILD_SHARE_INFO */, this.updateView, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateByPropIndex, this);
                };
                ChildMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                ChildMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._skillTipsId = null;
                };
                ChildMdr.prototype.updateView = function () {
                    this._view.power.setPowerValue(this._proxy.getChildPower());
                    this.updateChildView();
                    this.updateSkillView();
                };
                ChildMdr.prototype.updateChildView = function () {
                    var list = [];
                    var vipList = this._proxy.getVipList();
                    var vipLv = mod.VipUtil.getShowVipLv();
                    var battleList = this._proxy.getBattleChildList();
                    for (var i = 0; i < vipList.length; i++) {
                        var vip = vipList[i];
                        list.push({
                            vip: vip,
                            isActed: vipLv >= vip,
                            childIndex: battleList[i],
                            pos: i + 1
                        });
                    }
                    this._listChild.replaceAll(list);
                };
                ChildMdr.prototype.updateSkillView = function () {
                    var skillList = this._proxy.getActedSkillList();
                    var shareSkillList = this._proxy.getShareSkillList();
                    var mainSkillId = shareSkillList[0];
                    this._view.skillItem.data = {
                        skillId: mainSkillId,
                        isAct: skillList.indexOf(mainSkillId) > -1
                    };
                    var list = [];
                    for (var i = 1; i < shareSkillList.length; i++) {
                        var skillId = shareSkillList[i];
                        var isActed = skillList.indexOf(skillId) > -1;
                        list.push({
                            skillId: skillId,
                            isAct: isActed,
                            showHint: this._proxy.getSkillHint(skillId)
                        });
                        if (this._skillTipsId && this._skillTipsId == skillId && isActed) {
                            this.sendNt("surface_skill_update" /* SURFACE_SKILL_UPDATE */, true);
                        }
                    }
                    this._listSkill.replaceAll(list);
                };
                ChildMdr.prototype.onClickAttr = function () {
                    mod.ViewMgr.getIns().showSecondPop("58" /* Xianyuan */, "04" /* AttrView */);
                };
                ChildMdr.prototype.onClickCheck = function () {
                    var banlvInfo = this._xianlvProxy.getBanlvInfo();
                    if (!banlvInfo) {
                        game.PromptBox.getIns().show(game.getLanById("xianlv_tips25" /* xianlv_tips25 */));
                        return;
                    }
                    mod.ViewMgr.getIns().showRoleTips(banlvInfo.role_id, banlvInfo.server_id);
                };
                //主动技能
                ChildMdr.prototype.onClickSkill = function () {
                    facade.showView("58" /* Xianyuan */, "14" /* ChildSkillTips */);
                };
                //被动技能
                ChildMdr.prototype.onClickListSkill = function (e) {
                    var data = e.item;
                    if (!data) {
                        return;
                    }
                    this._skillTipsId = data.skillId;
                    mod.ViewMgr.getIns().showSkillTips(data.skillId, data.isAct, Handler.alloc(this, this.confirmAct, [data]));
                };
                ChildMdr.prototype.confirmAct = function (data) {
                    if (data) {
                        this._proxy.c2s_child_share_skill_act(data.skillId);
                    }
                };
                ChildMdr.prototype.updateSkillListHint = function () {
                    var size = this._listSkill.source.length;
                    for (var i = 0; i < size; i++) {
                        var data = this._listSkill.source[i];
                        if (!data) {
                            continue;
                        }
                        data.showHint = this._proxy.getSkillHint(data.skillId);
                        this._listSkill.itemUpdated(data);
                    }
                };
                ChildMdr.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    var skillCost = this._proxy.getSkillActCost();
                    for (var _i = 0, skillCost_2 = skillCost; _i < skillCost_2.length; _i++) {
                        var id = skillCost_2[_i];
                        if (indexs.indexOf(id) > -1) {
                            this.updateSkillListHint();
                            break;
                        }
                    }
                };
                return ChildMdr;
            }(game.MdrBase));
            xianyuan.ChildMdr = ChildMdr;
            __reflect(ChildMdr.prototype, "game.mod.xianyuan.ChildMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildShangzhenMdr = /** @class */ (function (_super) {
                __extends(ChildShangzhenMdr, _super);
                function ChildShangzhenMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.ChildShangzhenView);
                    _this._selIdx = 0;
                    _this._childIndex = 0;
                    _this.isEasyHide = true;
                    return _this;
                }
                ChildShangzhenMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.gr_eft.touchEnabled = false;
                    this._proxy = this.retProxy(227 /* Child */);
                    this._view.list.itemRenderer = mod.AvatarItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                ChildShangzhenMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    addEventListener(this._view.btn_shangzhen, egret.TouchEvent.TOUCH_TAP, this.onClickShangzhen, this);
                    addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    this.onNt("on_update_child_share_info" /* ON_UPDATE_CHILD_SHARE_INFO */, this.updateView, this);
                };
                ChildShangzhenMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                ChildShangzhenMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this.removeModelEft();
                    this._childIndex = null;
                    this._selIdx = 0;
                };
                ChildShangzhenMdr.prototype.removeModelEft = function () {
                    if (this._eftIdx) {
                        this.removeEffect(this._eftIdx);
                        this._eftIdx = null;
                    }
                };
                ChildShangzhenMdr.prototype.updateView = function () {
                    this.updateListData();
                    this.updateTopView();
                };
                ChildShangzhenMdr.prototype.updateListData = function () {
                    var childList = this._proxy.getChildList();
                    var list = [];
                    var battleList = [];
                    for (var _i = 0, childList_2 = childList; _i < childList_2.length; _i++) {
                        var child = childList_2[_i];
                        var info = this._proxy.getChildInfo(child.child_index);
                        var star = info ? info.star_lv : 0;
                        var cfg = this._proxy.getChildCfg(child.child_index);
                        var isBattle = this._proxy.isBattle(child.child_index);
                        var itemData = {
                            cfg: cfg, star: star, isBattle: isBattle
                        };
                        if (isBattle) {
                            battleList.push(itemData);
                        }
                        else {
                            list.push(itemData);
                        }
                    }
                    list = list.concat(battleList);
                    this._listData.replaceAll(list);
                    if (this._childIndex) {
                        for (var i = 0; i < list.length; i++) {
                            if (list[i].cfg.index == this._childIndex) {
                                this._selIdx = i;
                                break;
                            }
                        }
                    }
                    else {
                        this._selIdx = 0;
                        this._childIndex = list[this._selIdx].cfg.index;
                    }
                    this._view.list.selectedIndex = this._selIdx;
                };
                ChildShangzhenMdr.prototype.updateTopView = function () {
                    if (!this._childIndex) {
                        return;
                    }
                    var cfg = this._proxy.getChildCfg(this._childIndex);
                    if (!cfg) {
                        return;
                    }
                    this.removeModelEft();
                    this._eftIdx = this.addAnimate(this._childIndex, this._view.gr_eft);
                    this._view.nameItem.updateShow(cfg.name, cfg.quality);
                    var info = this._proxy.getChildInfo(this._childIndex);
                    var power = info && info.star_attr && info.star_attr.showpower || 0;
                    this._view.power.setPowerValue(power);
                    var isShangzhen = this._proxy.isBattle(this._childIndex);
                    this._view.btn_shangzhen.visible = !isShangzhen;
                    //装备
                    var equipList = this._proxy.getEquipList(this._childIndex);
                    var shenbingCfg;
                    if (equipList[0]) {
                        shenbingCfg = this._proxy.getSurfaceCfg(1 /* Shenbing */, equipList[0]);
                    }
                    var icon = shenbingCfg ? shenbingCfg.icon : 'icon_jia';
                    this._view.icon0.updateIconImg(icon);
                    this._view.icon0.updateQualityImg(game.ResUtil.getPropQualityImg(shenbingCfg && shenbingCfg.quality || 0));
                    var lingyiCfg;
                    if (equipList[1]) {
                        lingyiCfg = this._proxy.getSurfaceCfg(2 /* Lingyi */, equipList[1]);
                    }
                    var icon1 = lingyiCfg ? lingyiCfg.icon : 'icon_jia';
                    this._view.icon1.updateIconImg(icon1);
                    this._view.icon1.updateQualityImg(game.ResUtil.getPropQualityImg(lingyiCfg && lingyiCfg.quality || 0));
                };
                ChildShangzhenMdr.prototype.onClickShangzhen = function () {
                    if (this._childIndex) {
                        this._proxy.c2s_child_into_battle(this._childIndex, this._showArgs);
                    }
                };
                ChildShangzhenMdr.prototype.onClickList = function (e) {
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selIdx) {
                        return;
                    }
                    this._selIdx = itemIdx;
                    this._childIndex = e.item.cfg.index;
                    this.updateView();
                };
                // todo
                ChildShangzhenMdr.prototype.onClickAttr = function () {
                    this.showView("04" /* AttrView */);
                };
                return ChildShangzhenMdr;
            }(game.EffectMdrBase));
            xianyuan.ChildShangzhenMdr = ChildShangzhenMdr;
            __reflect(ChildShangzhenMdr.prototype, "game.mod.xianyuan.ChildShangzhenMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildShenbingMainMdr = /** @class */ (function (_super) {
                __extends(ChildShenbingMainMdr, _super);
                function ChildShenbingMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "child_shenbing_tab1",
                            mdr: xianyuan.ChildShenbingMdr,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "03" /* Shenbing */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "child_shenbing_tab2",
                            mdr: xianyuan.ChildShenbingMdr2,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "03" /* Shenbing */, "02" /* TabBtnType02 */]
                        }
                    ];
                    return _this;
                }
                ChildShenbingMainMdr.prototype.onTabChanged = function () {
                    _super.prototype.onTabChanged.call(this);
                    this.sendNt("update_wnd_second_mdr_top" /* UPDATE_WND_SECOND_MDR_TOP */);
                };
                return ChildShenbingMainMdr;
            }(mod.WndSecondMdr));
            xianyuan.ChildShenbingMainMdr = ChildShenbingMainMdr;
            __reflect(ChildShenbingMainMdr.prototype, "game.mod.xianyuan.ChildShenbingMainMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianyuanMod = /** @class */ (function (_super) {
                __extends(XianyuanMod, _super);
                function XianyuanMod() {
                    return _super.call(this, "58" /* Xianyuan */) || this;
                }
                XianyuanMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                XianyuanMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(226 /* Xianlv */, xianyuan.XianlvProxy);
                    this.regProxy(227 /* Child */, xianyuan.ChildProxy);
                    this.regProxy(228 /* Ring */, xianyuan.RingProxy);
                    this.regProxy(230 /* XianlvShilian */, xianyuan.XianlvShilianProxy);
                    this.regProxy(263 /* XianlvDoufa */, xianyuan.XianlvDoufaProxy);
                };
                XianyuanMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* Xianlv */, xianyuan.XianlvMainMdr);
                    this.regMdr("04" /* AttrView */, xianyuan.XianlvAttrMdr);
                    this.regMdr("05" /* InviteRecord */, xianyuan.XianlvInviteRecordMdr);
                    this.regMdr("06" /* InviteAdd */, xianyuan.XianlvInviteAddMdr);
                    this.regMdr("07" /* Zhaohuan */, xianyuan.XianlvZhaohuanMdr);
                    this.regMdr("08" /* Breakup */, xianyuan.XianlvBreakupMdr);
                    this.regMdr("09" /* ChildMain */, xianyuan.ChildMainMdr);
                    this.regMdr("12" /* SkillConditionTips */, xianyuan.SkillConditionTipsMdr);
                    this.regMdr("13" /* ChildShangzhen */, xianyuan.ChildShangzhenMdr);
                    this.regMdr("11" /* ChildHuanzhuang */, xianyuan.ChildHuanzhuangMdr);
                    this.regMdr("14" /* ChildSkillTips */, xianyuan.ChildSkillTipsMdr);
                    this.regMdr("15" /* RingMain */, xianyuan.RingMainMdr);
                    this.regMdr("16" /* ShilianSaodang */, xianyuan.ShilianSaodangMdr);
                    this.regMdr("17" /* ShilianScene */, xianyuan.ShilianSceneMdr);
                    this.regMdr("18" /* ShilianResult */, xianyuan.ShilianResultMdr);
                    this.regMdr("19" /* ShilianRank */, xianyuan.ShilianRankMainMdr);
                    this.regMdr("20" /* ShilianRankReward */, xianyuan.ShilianRankRewardMdr);
                    this.regMdr("23" /* XianlvDoufaWin */, xianyuan.XianlvDoufaWinMdr);
                    this.regMdr("24" /* XianlvDoufaFail */, xianyuan.XianlvDoufaFailMdr);
                    this.regMdr("25" /* XianlvDoufaRank */, xianyuan.XianlvDoufaRankMainMdr);
                    this.regMdr("26" /* XianlvDoufaSection */, xianyuan.XianlvDoufaSectionMdr);
                    this.regMdr("21" /* XianlvDoufaTips */, xianyuan.XianlvDoufaTipsMdr);
                    this.regMdr("22" /* XianlvDoufaScene */, xianyuan.XianlvDoufaSceneMdr);
                    this.regMdr("27" /* RingGiftTips */, xianyuan.RingGiftTipsMdr);
                };
                return XianyuanMod;
            }(game.ModBase));
            xianyuan.XianyuanMod = XianyuanMod;
            __reflect(XianyuanMod.prototype, "game.mod.xianyuan.XianyuanMod");
            gso.modCls.push(XianyuanMod);
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildSkillTipsMdr = /** @class */ (function (_super) {
                __extends(ChildSkillTipsMdr, _super);
                function ChildSkillTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.ChildSkillTipsView);
                    _this._isShow = false;
                    _this._atrrList = [];
                    _this._openIdx = 1041670174 /* XianlvChild */;
                    _this.isEasyHide = true;
                    return _this;
                }
                ChildSkillTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(227 /* Child */);
                };
                ChildSkillTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_common_surface_attr" /* UPDATE_COMMON_SURFACE_ATTR */, this.onInfoUpdate, this);
                };
                ChildSkillTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._isShow = true;
                    this.updateView();
                };
                ChildSkillTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._isShow = false;
                };
                ChildSkillTipsMdr.prototype.onInfoUpdate = function (n) {
                    var attrs = n.body;
                    for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
                        var i = attrs_1[_i];
                        if (i.sys_id == this._openIdx) {
                            this.updateAttr(i);
                            break;
                        }
                    }
                };
                ChildSkillTipsMdr.prototype.updateAttr = function (attr) {
                    var critical = attr.crit;
                    this._attrInfos[2][1] = Math.floor(critical / 100) + "%";
                    this._view.skillAttrList.updateAttr(this._attrInfos);
                };
                ChildSkillTipsMdr.prototype.updateView = function () {
                    var skillId = this._proxy.getChildSkill(1);
                    if (!skillId) {
                        return;
                    }
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId[0]);
                    if (!cfg) {
                        return;
                    }
                    this._view.qualityTips.updateShow(cfg.quality);
                    this._view.skillIcon.setData(skillId[0]);
                    this._view.lb_name.text = cfg.name;
                    this._view.img_type.source = "jineng_show_type_" + cfg.show_type;
                    //技能效果
                    this._view.baseDescItem.updateShow(game.TextUtil.getSkillDesc(cfg, 1, null, true), game.getLanById("sp_tips1" /* sp_tips1 */));
                    var attrName = game.TextUtil.getAttrsText("child_crit" /* child_crit */);
                    var attrVal = game.TextUtil.getAttrsPerCent("child_crit" /* child_crit */, game.RoleVo.ins.getValueByKey("child_crit" /* child_crit */));
                    this._attrInfos = [
                        ['攻击目标', "" + cfg.max_count],
                        [game.getLanById("tishi_15" /* tishi_15 */), (cfg.cd / 1000).toFixed(2) + "\u79D2"],
                        [attrName, attrVal]
                    ];
                    mod.RoleUtil.getSurfaceAttr(this._openIdx);
                    // 天赋效果
                    var descList = [];
                    var skillList = this._proxy.getChildSkill(2) || [];
                    for (var _i = 0, skillList_2 = skillList; _i < skillList_2.length; _i++) {
                        var id = skillList_2[_i];
                        var cfg_1 = game.getConfigByNameId("battle_skill.json" /* Skill */, id);
                        if (cfg_1) {
                            descList.push(cfg_1.describe);
                        }
                    }
                    this._view.baseDescList.updateShow(descList, game.getLanById("tianfu_tips1" /* tianfu_tips1 */));
                };
                return ChildSkillTipsMdr;
            }(game.MdrBase));
            xianyuan.ChildSkillTipsMdr = ChildSkillTipsMdr;
            __reflect(ChildSkillTipsMdr.prototype, "game.mod.xianyuan.ChildSkillTipsMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildUpStarMainMdr = /** @class */ (function (_super) {
                __extends(ChildUpStarMainMdr, _super);
                function ChildUpStarMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "child_tab1",
                            mdr: xianyuan.ChildUpStarMdr,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "02" /* Shengxing */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "child_tab2",
                            mdr: xianyuan.ChildUpStarMdr2,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "02" /* Shengxing */, "02" /* TabBtnType02 */]
                        },
                        {
                            btnType: "03" /* TabBtnType03 */,
                            icon: "child_tab3",
                            mdr: xianyuan.ChildUpStarMdr3,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "02" /* Shengxing */, "03" /* TabBtnType03 */]
                        },
                        {
                            btnType: "04" /* TabBtnType04 */,
                            icon: "child_tab4",
                            mdr: xianyuan.ChildUpStarMdr4,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "02" /* Shengxing */, "04" /* TabBtnType04 */]
                        }
                    ];
                    return _this;
                }
                ChildUpStarMainMdr.prototype.onTabChanged = function () {
                    _super.prototype.onTabChanged.call(this);
                    this.sendNt("update_wnd_second_mdr_top" /* UPDATE_WND_SECOND_MDR_TOP */);
                };
                return ChildUpStarMainMdr;
            }(mod.WndSecondMdr));
            xianyuan.ChildUpStarMainMdr = ChildUpStarMainMdr;
            __reflect(ChildUpStarMainMdr.prototype, "game.mod.xianyuan.ChildUpStarMainMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildUpStarMdr = /** @class */ (function (_super) {
                __extends(ChildUpStarMdr, _super);
                function ChildUpStarMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianyuan.ChildUpStarView);
                    /**二级页签类型*/
                    _this.childType = 1 /* Type1 */;
                    _this._selIdx = 0;
                    _this._skillList = [];
                    return _this;
                }
                ChildUpStarMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.gr_eff.touchEnabled = false;
                    this._proxy = this.retProxy(227 /* Child */);
                    this._view.list.itemRenderer = mod.AvatarItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                ChildUpStarMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickUp, this);
                    addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.btn_jiban, egret.TouchEvent.TOUCH_TAP, this.onClickJiban, this);
                    addEventListener(this._view.btn_huanzhuang, egret.TouchEvent.TOUCH_TAP, this.onClickHuanzhuang, this);
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    var i = 0;
                    while (this._view["skillItem" + i]) {
                        addEventListener(this._view["skillItem" + i], egret.TouchEvent.TOUCH_TAP, this.onClickSkill, this);
                        this._skillList.push(this._view["skillItem" + i]);
                        i++;
                    }
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePower, this);
                    this.onNt("on_update_child_info" /* ON_UPDATE_CHILD_INFO */, this.updateView, this);
                    this.onNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, this.onBagUpdateByBagType, this);
                };
                ChildUpStarMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                ChildUpStarMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selIdx = 0;
                    this._selCfg = null;
                    this.removeModelEft();
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollH = 0;
                };
                ChildUpStarMdr.prototype.removeModelEft = function () {
                    if (this._eftIdxx) {
                        this.removeEffect(this._eftIdxx);
                        this._eftIdxx = null;
                    }
                };
                ChildUpStarMdr.prototype.updateView = function () {
                    this.updateList();
                    this.updateTop();
                    this.updateSkill();
                    this._view.btn_jiban.setHint(this._proxy.getJibanHint());
                };
                ChildUpStarMdr.prototype.updateList = function () {
                    var list = [];
                    var cfgList = this._proxy.getChildCfgsByType(this.childType);
                    for (var _i = 0, cfgList_7 = cfgList; _i < cfgList_7.length; _i++) {
                        var cfg = cfgList_7[_i];
                        var info = this._proxy.getChildInfo(cfg.index);
                        list.push({
                            cfg: cfg,
                            showHint: this._proxy.getHintByChildIndex(cfg.index),
                            star: info ? info.star_lv : 0,
                            isBattle: false,
                            isSel: false
                        });
                    }
                    list.sort(function (a, b) {
                        if (a.showHint != b.showHint) {
                            return a.showHint ? -1 : 1;
                        }
                        if (a.star != b.star) {
                            return b.star > 0 ? 1 : -1;
                        }
                        return a.cfg.index - b.cfg.index;
                    });
                    if (this._selCfg) {
                        for (var i = 0; i < list.length; i++) {
                            var cfg = list[i].cfg;
                            if (cfg.index == this._selCfg.index) {
                                this._selIdx = i;
                                break;
                            }
                        }
                    }
                    else {
                        // this._selIdx = 0;
                        this._selCfg = list[this._selIdx].cfg;
                    }
                    var size = list.length;
                    for (var i = 0; i < size; i++) {
                        list[i].isSel = i == this._selIdx;
                    }
                    this._listData.replaceAll(list);
                    this._view.list.selectedIndex = this._selIdx;
                };
                ChildUpStarMdr.prototype.updateTop = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    this.updatePower();
                    this.updateModel();
                    this.updateBtnUp();
                    var isActed = this._proxy.isActed(this._selCfg.index);
                    this._view.power.btn_desc.visible = isActed;
                    this._view.btn_huanzhuang.visible = isActed;
                    this._view.specialAttr.updateDesc(this._selCfg);
                };
                ChildUpStarMdr.prototype.updatePower = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    var info = this._proxy.getChildInfo(this._selCfg.index);
                    var attr = info ? info.star_attr : null;
                    if (!attr) {
                        var starCfg = this._proxy.getChildStarCfg(this._selCfg.index, 1);
                        var attrs = mod.RoleUtil.getAttrList(starCfg && starCfg.attr || null);
                        if (attrs && attrs.length) {
                            attr = game.TextUtil.calcAttrList(attrs);
                        }
                    }
                    this._view.power.setPowerValue(attr && attr.showpower || 0);
                    this._view.godItem.updateGod(attr && attr.god || 0);
                };
                ChildUpStarMdr.prototype.updateModel = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    this.removeModelEft();
                    this._eftIdxx = this.addAnimate(this._selCfg.index, this._view.gr_eff);
                    this._view.nameItem.updateShow(this._selCfg.name, this._selCfg.quality);
                };
                ChildUpStarMdr.prototype.updateBtnUp = function () {
                    var index = this._selCfg.index;
                    var isMax = this._proxy.isMaxStar(index);
                    if (isMax) {
                        this._view.btn_up.updateMaxStar();
                        return;
                    }
                    var str = '';
                    var star = this._proxy.getStar(index);
                    var starCfg = this._proxy.getChildStarCfg(index, star || 1);
                    if (starCfg && starCfg.star_power) {
                        var power = Math.floor(starCfg.star_power / 100);
                        str = "\u5347\u661F\u6218\u529B\n" + game.TextUtil.addColor(power + '%', 2330156 /* GREEN */);
                    }
                    var cost = this._proxy.getCost(index);
                    this._view.btn_up.updateCost(cost, !!star, str);
                    this._view.btn_up.setHint(this._proxy.canActOrUp(index));
                };
                ChildUpStarMdr.prototype.updateSkill = function () {
                    var info = this._proxy.getChildInfo(this._selCfg.index);
                    var star = info ? info.star_lv : 0;
                    var skillList = this._selCfg.passive_skill_idc || [];
                    for (var i = 0; i < skillList.length; i++) {
                        var skillIcon = this._view["skillItem" + i];
                        if (!skillIcon) {
                            continue;
                        }
                        var item = skillList[i];
                        skillIcon.data = {
                            skillId: item[0],
                            isAct: item[1] <= star
                        };
                    }
                };
                ChildUpStarMdr.prototype.onClickUp = function () {
                    if (this._selCfg && this._proxy.canActOrUp(this._selCfg.index, true)) {
                        this._proxy.c2s_xianlv_child_starup(this._selCfg.index);
                    }
                };
                ChildUpStarMdr.prototype.onClickList = function (e) {
                    var itemIndex = e.itemIndex;
                    if (itemIndex == this._selIdx) {
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
                    this._selIdx = itemIndex;
                    this._selCfg = data.cfg;
                    this.updateView();
                };
                ChildUpStarMdr.prototype.onClickSkill = function (e) {
                    var obj = e.currentTarget;
                    var idx = this._skillList.indexOf(obj);
                    var skillItem = this._selCfg.passive_skill_idc[idx];
                    var star = this._proxy.getStar(this._selCfg.index);
                    var isSkillActed = star >= skillItem[1];
                    var str = "" + this._selCfg.name + skillItem[1] + "\u661F\u6FC0\u6D3B\uFF08" + star + "/" + skillItem[1] + "\uFF09";
                    mod.ViewMgr.getIns().showSkillConditionTips(skillItem[0], isSkillActed, str);
                };
                ChildUpStarMdr.prototype.onClickAttr = function () {
                    var info = this._proxy.getChildInfo(this._selCfg.index);
                    var attr = info ? info.star_attr : null;
                    mod.ViewMgr.getIns().showAttrTips('子女属性', attr);
                };
                ChildUpStarMdr.prototype.onClickJiban = function () {
                    mod.ViewMgr.getIns().showView("47" /* Jiban */, "01" /* JibanMain */, "05" /* Child */, true);
                };
                ChildUpStarMdr.prototype.onClickHuanzhuang = function () {
                    mod.ViewMgr.getIns().showSecondPop("58" /* Xianyuan */, "11" /* ChildHuanzhuang */);
                };
                ChildUpStarMdr.prototype.onBagUpdateByBagType = function (n) {
                    var bagTypes = n.body;
                    if (bagTypes.indexOf(2 /* Material */) > -1) {
                        this.updateView();
                    }
                };
                return ChildUpStarMdr;
            }(game.EffectMdrBase));
            xianyuan.ChildUpStarMdr = ChildUpStarMdr;
            __reflect(ChildUpStarMdr.prototype, "game.mod.xianyuan.ChildUpStarMdr");
            var ChildUpStarMdr2 = /** @class */ (function (_super) {
                __extends(ChildUpStarMdr2, _super);
                function ChildUpStarMdr2() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.childType = 2 /* Type2 */;
                    return _this;
                }
                return ChildUpStarMdr2;
            }(ChildUpStarMdr));
            xianyuan.ChildUpStarMdr2 = ChildUpStarMdr2;
            __reflect(ChildUpStarMdr2.prototype, "game.mod.xianyuan.ChildUpStarMdr2");
            var ChildUpStarMdr3 = /** @class */ (function (_super) {
                __extends(ChildUpStarMdr3, _super);
                function ChildUpStarMdr3() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.childType = 3 /* Type3 */;
                    return _this;
                }
                return ChildUpStarMdr3;
            }(ChildUpStarMdr));
            xianyuan.ChildUpStarMdr3 = ChildUpStarMdr3;
            __reflect(ChildUpStarMdr3.prototype, "game.mod.xianyuan.ChildUpStarMdr3");
            var ChildUpStarMdr4 = /** @class */ (function (_super) {
                __extends(ChildUpStarMdr4, _super);
                function ChildUpStarMdr4() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.childType = 4 /* Type4 */;
                    return _this;
                }
                return ChildUpStarMdr4;
            }(ChildUpStarMdr));
            xianyuan.ChildUpStarMdr4 = ChildUpStarMdr4;
            __reflect(ChildUpStarMdr4.prototype, "game.mod.xianyuan.ChildUpStarMdr4");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            /**技能激活条件*/
            var SkillConditionTipsMdr = /** @class */ (function (_super) {
                __extends(SkillConditionTipsMdr, _super);
                function SkillConditionTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.SkillConditionTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SkillConditionTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                };
                SkillConditionTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                SkillConditionTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                SkillConditionTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SkillConditionTipsMdr.prototype.updateView = function () {
                    var args = this._showArgs;
                    var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, args.skillId);
                    if (!skillCfg) {
                        return;
                    }
                    this._view.skill.setData(args.skillId);
                    this._view.lab_name.text = skillCfg.name;
                    this._view.img_type.source = "jineng_show_type_" + skillCfg.show_type;
                    var color = args.isActed ? 4435385 /* DEFAULT */ : 7835024 /* GRAY */;
                    this._view.baseDescItem.updateShow(game.TextUtil.addColor(skillCfg.describe || '', color), game.getLanById("sp_tips1" /* sp_tips1 */));
                    this._view.currentState = args.isActed ? 'act' : 'default';
                    if (!args.isActed) {
                        this._view.lb_act.textFlow = game.TextUtil.parseHtml(args.actStr || '');
                    }
                };
                return SkillConditionTipsMdr;
            }(game.MdrBase));
            xianyuan.SkillConditionTipsMdr = SkillConditionTipsMdr;
            __reflect(SkillConditionTipsMdr.prototype, "game.mod.xianyuan.SkillConditionTipsMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var RingMainMdr = /** @class */ (function (_super) {
                __extends(RingMainMdr, _super);
                function RingMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Yuanjie */,
                            icon: "xianjiebiaoqiantubiao",
                            mdr: xianyuan.RingMdr,
                            title: "ring_tips1" /* ring_tips1 */,
                            bg: "xianlv_beijingtu4",
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "15" /* RingMain */, "01" /* Yuanjie */]
                        },
                        {
                            btnType: "02" /* Huanhua */,
                            icon: "huanhuabiaoqiantubiao",
                            mdr: xianyuan.RingHuanhuaMainMdr,
                            title: "ring_tips1" /* ring_tips1 */,
                            bg: "xianlv_beijingtu4",
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "15" /* RingMain */, "02" /* Huanhua */]
                        }
                    ];
                    return _this;
                }
                return RingMainMdr;
            }(mod.WndBaseMdr));
            xianyuan.RingMainMdr = RingMainMdr;
            __reflect(RingMainMdr.prototype, "game.mod.xianyuan.RingMainMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var RingModel = /** @class */ (function () {
                function RingModel() {
                    /** 已幻化列表 */
                    this.ring_list = {};
                    /** 已领取激活礼包列表 */
                    this.ring_act_libao = [];
                    /** 是否领取2阶奖励 默认false */
                    this.is_get_class_reward = false;
                    this.hintPath = {
                        1: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "15" /* RingMain */, "01" /* Yuanjie */],
                        2: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "15" /* RingMain */, "02" /* Huanhua */, "01" /* TabBtnType01 */]
                    };
                }
                return RingModel;
            }());
            xianyuan.RingModel = RingModel;
            __reflect(RingModel.prototype, "game.mod.xianyuan.RingModel");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var c2s_ring_uplv = msg.c2s_ring_uplv;
            var c2s_ring_upstar = msg.c2s_ring_upstar;
            var s2c_ring_info = msg.s2c_ring_info;
            var c2s_ring_huanhua = msg.c2s_ring_huanhua;
            var c2s_ring_act_libao = msg.c2s_ring_act_libao;
            var c2s_ring_get_reward = msg.c2s_ring_get_reward;
            /**
             * @description 仙侣-仙戒系统
             */
            var RingProxy = /** @class */ (function (_super) {
                __extends(RingProxy, _super);
                function RingProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**初始升级index*/
                    _this.defaultIndex = 604000001;
                    _this._login = true;
                    _this._cfgMap = {};
                    _this._maxLv = 0;
                    return _this;
                }
                RingProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new xianyuan.RingModel();
                    this.onProto(s2c_ring_info, this.s2c_ring_info, this);
                };
                // 升级类型 1单点，2一键
                RingProxy.prototype.c2s_ring_uplv = function (type) {
                    var msg = new c2s_ring_uplv();
                    msg.type = type;
                    this.sendProto(msg);
                };
                // 升星
                RingProxy.prototype.c2s_ring_upstar = function (index) {
                    var msg = new c2s_ring_upstar();
                    msg.index = index;
                    this.sendProto(msg);
                };
                // 幻化
                RingProxy.prototype.c2s_ring_huanhua = function (index) {
                    var msg = new c2s_ring_huanhua();
                    msg.index = index;
                    this.sendProto(msg);
                };
                RingProxy.prototype.s2c_ring_info = function (n) {
                    var msg = n.body;
                    if (msg.ring_struct != null) {
                        this._model.ring_struct = msg.ring_struct;
                    }
                    if (msg.ring_list != null) {
                        if (!this._login) {
                            for (var _i = 0, _a = msg.ring_list; _i < _a.length; _i++) {
                                var item = _a[_i];
                                var oldInfo = this.getInfo(item.ring_index);
                                if (!oldInfo && item && item.star == 1) {
                                    mod.ViewMgr.getIns().showSurfaceTips(item.ring_index);
                                }
                            }
                        }
                        for (var _b = 0, _c = msg.ring_list; _b < _c.length; _b++) {
                            var item = _c[_b];
                            this._model.ring_list[item.ring_index] = item;
                        }
                        this._login = false;
                    }
                    if (msg.ring_act_libao != null) {
                        this._model.ring_act_libao = msg.ring_act_libao;
                    }
                    if (msg.is_get_class_reward != null) {
                        this._model.is_get_class_reward = msg.is_get_class_reward;
                    }
                    this.updateHint();
                    this.sendNt("on_update_ring_info" /* ON_UPDATE_RING_INFO */);
                };
                // 领取激活礼包
                RingProxy.prototype.c2s_ring_act_libao = function (index) {
                    var msg = new c2s_ring_act_libao();
                    msg.index = index;
                    this.sendProto(msg);
                };
                /// 领取2阶奖励
                RingProxy.prototype.c2s_ring_get_reward = function () {
                    this.sendProto(new c2s_ring_get_reward());
                };
                /**=========================协议end*/
                RingProxy.prototype.isGetReward = function (index) {
                    var list = this._model.ring_act_libao;
                    return list.indexOf(index) > -1;
                };
                RingProxy.prototype.canGetReward = function (index) {
                    var list = this._model.ring_act_libao;
                    if (list.indexOf(index) > -1) {
                        return false;
                    }
                    var info = this.getInfo(index);
                    return info && info.star >= 1;
                };
                RingProxy.prototype.getInfo = function (index) {
                    return this._model.ring_list[index];
                };
                RingProxy.prototype.isActed = function (index) {
                    var info = this.getInfo(index);
                    return info && info.star > 0;
                };
                RingProxy.prototype.isHuanhua = function (index) {
                    var idx = this.getHuanhuaIndex();
                    return idx == index;
                };
                RingProxy.prototype.canShowHuanhua = function (index) {
                    if (!this.isActed(index)) {
                        return false;
                    }
                    var idx = this.getHuanhuaIndex();
                    return idx != index;
                };
                RingProxy.prototype.isMaxStar = function (index) {
                    var info = this.getInfo(index);
                    var star = info ? info.star : 0;
                    var maxStar = this.getMaxStar(index);
                    return star >= maxStar;
                };
                RingProxy.prototype.getCfgListByType = function (type) {
                    if (this._cfgMap[type]) {
                        return this._cfgMap[type];
                    }
                    var cfgList = game.getConfigListByName("ring.json" /* Ring */);
                    for (var _i = 0, cfgList_8 = cfgList; _i < cfgList_8.length; _i++) {
                        var cfg = cfgList_8[_i];
                        if (!cfg || !cfg.show) {
                            continue;
                        }
                        if (!this._cfgMap[cfg.type]) {
                            this._cfgMap[cfg.type] = [];
                        }
                        this._cfgMap[cfg.type].push(cfg);
                    }
                    return this._cfgMap[type];
                };
                RingProxy.prototype.getConfig = function (index) {
                    return game.getConfigByNameId("ring.json" /* Ring */, index);
                };
                RingProxy.prototype.getMaxStar = function (index) {
                    var cfg = this.getConfig(index);
                    return cfg ? cfg.material.length : 0;
                };
                RingProxy.prototype.getStar = function (index) {
                    var info = this.getInfo(index);
                    return info && info.star || 0;
                };
                RingProxy.prototype.getUpstarCost = function (index) {
                    var star = this.getStar(index);
                    var cfg = this.getConfig(index);
                    if (!cfg || !cfg.material) {
                        return null;
                    }
                    return cfg.material[star];
                };
                RingProxy.prototype.getUplvInfo = function () {
                    return this._model.ring_struct;
                };
                //当前进阶等级
                RingProxy.prototype.getStage = function () {
                    var info = this.getUplvInfo();
                    return info ? info.level : 0;
                };
                RingProxy.prototype.getStagePerLv = function () {
                    return 10;
                };
                RingProxy.prototype.getHuanhuaIndex = function () {
                    var info = this._model.ring_struct;
                    if (info && info.ring_index) {
                        return info.ring_index;
                    }
                    return 0;
                };
                RingProxy.prototype.getUplvIndex = function () {
                    var index = this.getHuanhuaIndex();
                    if (index) {
                        return index;
                    }
                    return this.defaultIndex;
                };
                RingProxy.prototype.getMaxLv = function () {
                    if (this._maxLv) {
                        return this._maxLv;
                    }
                    var cfgList = game.getConfigListByName("ring_dengji.json" /* RingDengji */);
                    return this._maxLv = cfgList.length - 1;
                };
                RingProxy.prototype.isMaxLv = function () {
                    var info = this.getUplvInfo();
                    var lv = info && info.level || 0;
                    return lv >= this.getMaxLv();
                };
                RingProxy.prototype.getLvConfig = function (lv) {
                    return game.getConfigByNameId("ring_dengji.json" /* RingDengji */, lv);
                };
                RingProxy.prototype.getLvCost = function (lv) {
                    var cfg = this.getLvConfig(lv);
                    return cfg ? cfg.consume : null;
                };
                RingProxy.prototype.canUplv = function (isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isMaxLv()) {
                        return false;
                    }
                    var lv = this.getStage();
                    var cost = this.getLvCost(lv);
                    return cost && mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                RingProxy.prototype.canOnekey = function (isTips) {
                    if (isTips === void 0) { isTips = false; }
                    return this.canUplv(isTips);
                };
                RingProxy.prototype.canUpstar = function (index, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isMaxStar(index)) {
                        if (isTips) {
                            game.PromptBox.getIns().show(game.getLanById("maxstar" /* maxstar */));
                        }
                        return false;
                    }
                    var cost = this.getUpstarCost(index);
                    if (!cost) {
                        return false;
                    }
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                RingProxy.prototype.getPower = function () {
                    var map = this._model.ring_list;
                    var power = 0;
                    for (var key in map) {
                        var item = map[key];
                        if (item && item.attr && item.attr.showpower) {
                            power += item.attr.showpower.toNumber();
                        }
                    }
                    return power;
                };
                //升星红点+激活礼包红点
                RingProxy.prototype.getUpstarHintByIndex = function (index) {
                    return this.canUpstar(index) || this.canGetReward(index);
                };
                //进阶礼包红点
                RingProxy.prototype.getGiftHint = function () {
                    var giftProxy = game.getProxy("53" /* Gift */, 201 /* Gift */);
                    return this.canGetClassReward() || giftProxy.getHintByGiftType(7 /* Ring */);
                };
                //升级红点+礼包红点
                RingProxy.prototype.getUplvHint = function () {
                    return this.canUplv() || this.getGiftHint();
                };
                RingProxy.prototype.updateHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670175 /* XianlvRing */)) {
                        return;
                    }
                    var starHint = false;
                    var cfgList = game.getConfigListByName("ring.json" /* Ring */);
                    for (var _i = 0, cfgList_9 = cfgList; _i < cfgList_9.length; _i++) {
                        var cfg = cfgList_9[_i];
                        if (cfg && cfg.show && this.getUpstarHintByIndex(cfg.index)) {
                            starHint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(starHint, this._model.hintPath[2]);
                    mod.HintMgr.setHint(this.getUplvHint(), this._model.hintPath[1]);
                };
                RingProxy.prototype.onBagUpdateByBagType = function (n) {
                    var types = n.body;
                    if (types.indexOf(2 /* Material */) > -1) {
                        this.updateHint();
                    }
                };
                //进阶豪礼的仙戒碎片id和数量
                RingProxy.prototype.getGiftProp = function () {
                    var cfg = game.GameConfig.getParamConfigById('xianlv_jinjiehaoli_gift');
                    return cfg.value;
                };
                //进阶豪礼需要达成的仙戒阶数
                RingProxy.prototype.getGiftStage = function () {
                    var cfg = game.GameConfig.getParamConfigById('xianlv_jinjiehaoli_target');
                    return cfg.value;
                };
                Object.defineProperty(RingProxy.prototype, "is_get_class_reward", {
                    //是否领取了开启奖励
                    get: function () {
                        return this._model.is_get_class_reward;
                    },
                    enumerable: true,
                    configurable: true
                });
                //能否领取开启经历
                RingProxy.prototype.canGetClassReward = function () {
                    if (this.is_get_class_reward) {
                        return false;
                    }
                    var stage = this.getStage();
                    stage = mod.SurfaceUtil.calcSurfaceStage(stage, 604 /* Ring */);
                    return stage >= this.getGiftStage();
                };
                //能否打开进阶礼包界面
                RingProxy.prototype.canOpenGift = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670175 /* XianlvRing */)) {
                        return false;
                    }
                    return !!this.is_get_class_reward;
                };
                return RingProxy;
            }(game.ProxyBase));
            xianyuan.RingProxy = RingProxy;
            __reflect(RingProxy.prototype, "game.mod.xianyuan.RingProxy", ["game.mod.IRingProxy", "base.IProxy"]);
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var RingGiftTipsView = /** @class */ (function (_super) {
                __extends(RingGiftTipsView, _super);
                function RingGiftTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.RingGiftTipsSkin";
                    return _this;
                }
                return RingGiftTipsView;
            }(eui.Component));
            xianyuan.RingGiftTipsView = RingGiftTipsView;
            __reflect(RingGiftTipsView.prototype, "game.mod.xianyuan.RingGiftTipsView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var RingHuanhuaView = /** @class */ (function (_super) {
                __extends(RingHuanhuaView, _super);
                function RingHuanhuaView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.RingHuanhuaSkin";
                    return _this;
                }
                return RingHuanhuaView;
            }(eui.Component));
            xianyuan.RingHuanhuaView = RingHuanhuaView;
            __reflect(RingHuanhuaView.prototype, "game.mod.xianyuan.RingHuanhuaView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var RingItem = /** @class */ (function (_super) {
                __extends(RingItem, _super);
                function RingItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RingItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("58" /* Xianyuan */, 228 /* Ring */);
                };
                RingItem.prototype.dataChanged = function () {
                    var lv = this.itemIndex + 1;
                    var curLv = this._proxy.getStage();
                    var perLv = this._proxy.getStagePerLv();
                    if (curLv != 0) {
                        curLv = curLv % perLv ? curLv % perLv : perLv;
                    }
                    this.img_icon.source = curLv >= lv ? 'lv_icon_404' : 'lv_icon_gray_404'; //todo
                };
                return RingItem;
            }(mod.BaseListenerRenderer));
            xianyuan.RingItem = RingItem;
            __reflect(RingItem.prototype, "game.mod.xianyuan.RingItem");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var RingView = /** @class */ (function (_super) {
                __extends(RingView, _super);
                function RingView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.RingSkin";
                    return _this;
                }
                return RingView;
            }(eui.Component));
            xianyuan.RingView = RingView;
            __reflect(RingView.prototype, "game.mod.xianyuan.RingView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var RingGiftTipsMdr = /** @class */ (function (_super) {
                __extends(RingGiftTipsMdr, _super);
                function RingGiftTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.RingGiftTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                RingGiftTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(228 /* Ring */);
                };
                RingGiftTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.onNt("on_update_ring_info" /* ON_UPDATE_RING_INFO */, this.onUpdateInfo, this);
                };
                RingGiftTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                RingGiftTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                RingGiftTipsMdr.prototype.updateView = function () {
                    var prop = this._proxy.getGiftProp();
                    if (!prop) {
                        return;
                    }
                    var propData = game.PropData.create(prop[0], prop[1]);
                    this._view.basePropTips.updateShow(propData);
                    var cfg = game.GameConfig.getPropConfigById(prop[0]);
                    this._view.power.setPowerValue(cfg.showPower);
                    this._view.baseSurfaceItem.updateShow(cfg.param1[0][0], 0, false, null, false);
                    this._view.icon.data = propData;
                    var stage = this._proxy.getGiftStage();
                    this._view.lb_cond.textFlow = game.TextUtil.parseHtml(game.StringUtil.substitute(game.getLanById("ring_tips3" /* ring_tips3 */), [stage]));
                    var canGet = this._proxy.canGetClassReward();
                    this._view.btn_do.visible = canGet;
                    this._view.btn_do.setHint(canGet);
                    this._view.lb_cond.visible = !canGet;
                };
                RingGiftTipsMdr.prototype.onClick = function () {
                    if (!this._proxy.canGetClassReward()) {
                        return;
                    }
                    this._proxy.c2s_ring_get_reward();
                };
                RingGiftTipsMdr.prototype.onUpdateInfo = function () {
                    if (this._proxy.is_get_class_reward) {
                        this.hide();
                        mod.ViewMgr.getIns().showViewByID(83 /* XianlvRing */);
                    }
                };
                return RingGiftTipsMdr;
            }(game.EffectMdrBase));
            xianyuan.RingGiftTipsMdr = RingGiftTipsMdr;
            __reflect(RingGiftTipsMdr.prototype, "game.mod.xianyuan.RingGiftTipsMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var RingHuanhuaMainMdr = /** @class */ (function (_super) {
                __extends(RingHuanhuaMainMdr, _super);
                function RingHuanhuaMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "xianlv_second_tab_1",
                            mdr: xianyuan.RingHuanhuaMdr,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "15" /* RingMain */, "02" /* Huanhua */, "01" /* TabBtnType01 */]
                        }
                    ];
                    return _this;
                }
                RingHuanhuaMainMdr.prototype.onTabChanged = function () {
                    _super.prototype.onTabChanged.call(this);
                    this.sendNt("update_wnd_second_mdr_top" /* UPDATE_WND_SECOND_MDR_TOP */);
                };
                return RingHuanhuaMainMdr;
            }(mod.WndSecondMdr));
            xianyuan.RingHuanhuaMainMdr = RingHuanhuaMainMdr;
            __reflect(RingHuanhuaMainMdr.prototype, "game.mod.xianyuan.RingHuanhuaMainMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var Handler = base.Handler;
            var RingHuanhuaMdr = /** @class */ (function (_super) {
                __extends(RingHuanhuaMdr, _super);
                function RingHuanhuaMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianyuan.RingHuanhuaView);
                    /**二级页签分类*/
                    _this._type = 1;
                    _this._selIdx = 0;
                    _this._openReward = false;
                    return _this;
                }
                RingHuanhuaMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.gr_eft.touchEnabled = false;
                    this._proxy = this.retProxy(228 /* Ring */);
                    this._view.list.itemRenderer = mod.AvatarItem;
                    this._view.list.dataProvider = this._listAvatar = new eui.ArrayCollection();
                };
                RingHuanhuaMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickUp, this);
                    addEventListener(this._view.list, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.btn_reward, egret.TouchEvent.TOUCH_TAP, this.onClickReward, this);
                    addEventListener(this._view.btn_huanhua, egret.TouchEvent.TOUCH_TAP, this.onClickHuanhua, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePower, this);
                    this.onNt("on_update_ring_info" /* ON_UPDATE_RING_INFO */, this.updateView, this);
                };
                RingHuanhuaMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                RingHuanhuaMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selCfg = null;
                    this._selIdx = 0;
                    this._eftIdx = 0;
                    this._openReward = false;
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollH = 0;
                };
                RingHuanhuaMdr.prototype.updateView = function () {
                    this.updateListAvatar();
                    this.updateInfo();
                };
                RingHuanhuaMdr.prototype.updateInfo = function () {
                    this.updateModel();
                    this.updatePower();
                    this.updateCost();
                    var index = this._selCfg.index;
                    this._view.btn_huanhua.visible = this._proxy.canShowHuanhua(index);
                    this._view.btn_reward.visible = this._proxy.canGetReward(index);
                    if (this._view.btn_reward.visible) {
                        this._view.btn_reward.setHint(true);
                    }
                    if (this._openReward && this._proxy.isGetReward(index)) {
                        this.sendNt("update_base_reward_mdr_state" /* UPDATE_BASE_REWARD_MDR_STATE */, 2);
                        this._openReward = false;
                    }
                };
                RingHuanhuaMdr.prototype.updateModel = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    var cfg = this._selCfg;
                    this._view.nameItem.updateShow(cfg.name, cfg.quality);
                    // this.removeEffect(this._eftIdx);
                    // this._eftIdx = this.addAnimate(cfg.index, this._view.gr_eft);
                    this._view.img_icon.source = game.ResUtil.getRingSrc(cfg.index);
                    this._view.specialAttr.updateDesc(cfg);
                };
                RingHuanhuaMdr.prototype.updateCost = function () {
                    var index = this._selCfg.index;
                    var isMax = this._proxy.isMaxStar(index);
                    if (isMax) {
                        this._view.btn_up.updateMaxStar();
                        return;
                    }
                    var cost = this._proxy.getUpstarCost(index);
                    var star = this._proxy.getStar(index);
                    var power = this._selCfg.star_power[star] || 0;
                    var str = game.StringUtil.substitute(game.getLanById("xianlv_tips26" /* xianlv_tips26 */), [game.TextUtil.addColor(Math.floor(power / 100) + '%', 2330156 /* GREEN */)]);
                    this._view.btn_up.updateCost(cost, !!star, str);
                    this._view.btn_up.setHint(this._proxy.canUpstar(index));
                };
                RingHuanhuaMdr.prototype.updatePower = function () {
                    var info = this._proxy.getInfo(this._selCfg.index);
                    var attr = info && info.attr ? info.attr : null;
                    if (!attr) {
                        var attrId = this._selCfg.attr_id[0];
                        attr = mod.RoleUtil.getAttr(attrId);
                    }
                    this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
                    this._view.power.btn_desc.visible = info && info.star > 0;
                };
                RingHuanhuaMdr.prototype.updateListAvatar = function () {
                    var cfgList = this._proxy.getCfgListByType(this._type);
                    var list = [];
                    for (var _i = 0, cfgList_10 = cfgList; _i < cfgList_10.length; _i++) {
                        var cfg = cfgList_10[_i];
                        list.push({
                            cfg: cfg,
                            star: this._proxy.getStar(cfg.index),
                            isBattle: this._proxy.isHuanhua(cfg.index),
                            showHint: this._proxy.getUpstarHintByIndex(cfg.index) || false,
                            isSel: false
                        });
                    }
                    list.sort(function (a, b) {
                        if (a.isBattle) {
                            return -1;
                        }
                        if (b.isBattle) {
                            return 1;
                        }
                        if (a.showHint != b.showHint) {
                            return a.showHint ? -1 : 1;
                        }
                        if (a.star != b.star) {
                            return b.star - a.star;
                        }
                        if (a.cfg.quality != b.cfg.quality) {
                            return a.cfg.quality - b.cfg.quality;
                        }
                        return b.cfg.index - a.cfg.index;
                    });
                    if (this._selCfg) {
                        for (var i = 0; i < list.length; i++) {
                            if (this._selCfg.index == list[i].cfg.index) {
                                this._selIdx = i;
                                break;
                            }
                        }
                    }
                    else {
                        // this._selIdx = 0;
                        this._selCfg = list[this._selIdx].cfg;
                    }
                    var size = list.length;
                    for (var i = 0; i < size; i++) {
                        list[i].isSel = i == this._selIdx;
                    }
                    this._listAvatar.source = list;
                    this._view.list.selectedIndex = this._selIdx;
                };
                RingHuanhuaMdr.prototype.onClickUp = function () {
                    if (this._selCfg && this._proxy.canUpstar(this._selCfg.index, true)) {
                        this._proxy.c2s_ring_upstar(this._selCfg.index);
                    }
                };
                RingHuanhuaMdr.prototype.onClickList = function (e) {
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selIdx) {
                        return;
                    }
                    var list = this._listAvatar.source;
                    var preData = list[this._selIdx];
                    if (preData) {
                        preData.isSel = false;
                        this._listAvatar.itemUpdated(preData);
                    }
                    var data = e.item;
                    data.isSel = true;
                    this._listAvatar.itemUpdated(data);
                    this._selCfg = data.cfg;
                    this._selIdx = itemIdx;
                    this.updateInfo();
                    this._openReward = false;
                };
                RingHuanhuaMdr.prototype.onClickAttr = function () {
                    var info = this._proxy.getInfo(this._selCfg.index);
                    mod.ViewMgr.getIns().showAttrTips(game.getLanById("ring_tips2" /* ring_tips2 */), info && info.attr ? info.attr : null);
                };
                RingHuanhuaMdr.prototype.onClickReward = function () {
                    this._openReward = true;
                    mod.ViewMgr.getIns().showRewardTips(game.getLanById("lingchong_tips6" /* lingchong_tips6 */), this._selCfg.reward, 1, Handler.alloc(this, this.onGetReward, [this._selCfg.index]));
                };
                RingHuanhuaMdr.prototype.onGetReward = function (index) {
                    this._proxy.c2s_ring_act_libao(index);
                };
                RingHuanhuaMdr.prototype.onClickHuanhua = function () {
                    this._proxy.c2s_ring_huanhua(this._selCfg.index);
                };
                return RingHuanhuaMdr;
            }(game.EffectMdrBase));
            xianyuan.RingHuanhuaMdr = RingHuanhuaMdr;
            __reflect(RingHuanhuaMdr.prototype, "game.mod.xianyuan.RingHuanhuaMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var facade = base.facade;
            var RingMdr = /** @class */ (function (_super) {
                __extends(RingMdr, _super);
                function RingMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianyuan.RingView);
                    return _this;
                }
                RingMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.gr_eft.touchEnabled = false;
                    this._proxy = this.retProxy(228 /* Ring */);
                    this._view.list_item.itemRenderer = xianyuan.RingItem;
                    this._view.list_item.dataProvider = this._listItem = new eui.ArrayCollection();
                };
                RingMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, egret.TouchEvent.TOUCH_TAP, this.onClickUp, this);
                    addEventListener(this._view.btn_onekey, egret.TouchEvent.TOUCH_TAP, this.onClickOnekey, this);
                    addEventListener(this._view.btn_gift, egret.TouchEvent.TOUCH_TAP, this.onClickGift, this);
                    addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePower, this);
                    this.onNt("on_update_ring_info" /* ON_UPDATE_RING_INFO */, this.updateView, this);
                };
                RingMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._index = this._proxy.getUplvIndex();
                    this._cfg = this._proxy.getConfig(this._index);
                    this.updateModel();
                    this.updateView();
                };
                RingMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._index = null;
                    this._eftIdx = null;
                };
                RingMdr.prototype.updateView = function () {
                    if (!this._index) {
                        return;
                    }
                    var list = [];
                    list.length = this._proxy.getStagePerLv();
                    this._listItem.replaceAll(list);
                    this.updateCost();
                    this.updatePower();
                    var lv = this._proxy.getStage();
                    lv = mod.SurfaceUtil.calcSurfaceStage(lv, 604 /* Ring */);
                    var lvStr = game.ResUtil.getChineseFontStr(lv) + "j";
                    this.addBmpFont(lvStr, game.BmpTextCfg[204 /* Stage */], this._view.gr_lv, false, 1, true);
                    this._view.btn_gift.setHint(this._proxy.getGiftHint());
                };
                RingMdr.prototype.updateModel = function () {
                    // this.removeEffect(this._eftIdx);
                    // this._eftIdx = this.addAnimate(this._index, this._view.gr_eft);
                    this._view.img_icon.source = game.ResUtil.getRingSrc(this._index);
                    this._view.specialAttr.updateDesc(this._cfg);
                    this._view.nameItem.updateShow(this._cfg.name, this._cfg.quality);
                };
                RingMdr.prototype.updatePower = function () {
                    var info = this._proxy.getUplvInfo();
                    var attr = info && info.attr ? info.attr : null;
                    var power = attr && attr.showpower ? attr.showpower : 0;
                    this._view.power.setPowerValue(power);
                };
                RingMdr.prototype.updateCost = function () {
                    if (this._proxy.isMaxLv()) {
                        this.switchCurrentState(true);
                        this._view.bar.showMax();
                        return;
                    }
                    this.switchCurrentState(false);
                    var lv = this._proxy.getStage();
                    var cost = this._proxy.getLvCost(lv);
                    this._view.costIcon.updateShow(cost);
                    this._view.btn_onekey.setHint(this._proxy.canOnekey());
                    var cfg = this._proxy.getLvConfig(lv);
                    var info = this._proxy.getUplvInfo();
                    var exp = info && info.exp ? info.exp * game.SurfacePerExp : 0;
                    var upExp = cfg && cfg.exp ? cfg.exp * game.SurfacePerExp : 0;
                    this._view.bar.show(exp * cost[1], upExp * cost[1], false, lv);
                };
                RingMdr.prototype.switchCurrentState = function (showMax) {
                    if (showMax === void 0) { showMax = true; }
                    this._view.img_max.visible = showMax;
                    this._view.btn_up.visible = this._view.btn_onekey.visible = this._view.costIcon.visible = !showMax;
                };
                RingMdr.prototype.onClickUp = function () {
                    if (this._proxy.canUplv(true)) {
                        this._proxy.c2s_ring_uplv(1);
                    }
                };
                RingMdr.prototype.onClickOnekey = function () {
                    if (this._proxy.canOnekey(true)) {
                        this._proxy.c2s_ring_uplv(2);
                    }
                };
                RingMdr.prototype.onClickGift = function () {
                    if (!this._proxy.canOpenGift()) {
                        facade.showView("58" /* Xianyuan */, "27" /* RingGiftTips */);
                        return;
                    }
                    mod.ViewMgr.getIns().showViewByID(83 /* XianlvRing */);
                };
                RingMdr.prototype.onClickAttr = function () {
                    var info = this._proxy.getUplvInfo();
                    mod.ViewMgr.getIns().showAttrTips(game.getLanById("ring_tips2" /* ring_tips2 */), info && info.attr ? info.attr : null);
                };
                return RingMdr;
            }(game.EffectMdrBase));
            xianyuan.RingMdr = RingMdr;
            __reflect(RingMdr.prototype, "game.mod.xianyuan.RingMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvMainMdr = /** @class */ (function (_super) {
                __extends(XianlvMainMdr, _super);
                function XianlvMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Xianlv */,
                            icon: "xianlvbiaoqiantubiao",
                            mdr: xianyuan.XianlvMdr,
                            title: "xianlv_tips1",
                            bg: "xianlv_beijingtu1",
                            openIdx: 1041670173 /* Xianlv */,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */]
                        },
                        {
                            btnType: "02" /* Renwu */,
                            icon: "renwubiaoqiantubiao",
                            mdr: xianyuan.TaskMdr,
                            title: "xianlv_tips2",
                            bg: "",
                            openIdx: 1041670176 /* XianlvRenwu */,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "02" /* Renwu */]
                        },
                        {
                            btnType: "03" /* Shilian */,
                            icon: "shilianbiaoqiantubiao",
                            mdr: xianyuan.ShilianMdr,
                            title: "xianlv_tips3",
                            bg: "",
                            openIdx: 1041670177 /* XianlvShilian */,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "03" /* Shilian */]
                        },
                        {
                            btnType: "04" /* Zhanchang */,
                            icon: "xianlvdoufa",
                            mdr: xianyuan.XianlvDoufaMdr,
                            title: "xianlv_tips4",
                            bg: "xianlv_beijingtu7",
                            openIdx: 1041670178 /* XianlvZhanchang */,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "04" /* Zhanchang */]
                        }
                    ];
                    return _this;
                }
                XianlvMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(226 /* Xianlv */);
                };
                XianlvMainMdr.prototype.onTabCheck = function (index) {
                    if (index == 2 || index == 3) {
                        var txt = index == 2 ? '仙侣试炼' : '仙侣斗法';
                        if (!this._proxy.isMarried()) {
                            game.PromptBox.getIns().show("\u6682\u65E0\u4F34\u4FA3\u65E0\u6CD5\u53C2\u4E0E" + txt);
                            return false;
                        }
                    }
                    return _super.prototype.onTabCheck.call(this, index);
                };
                return XianlvMainMdr;
            }(mod.WndBaseMdr));
            xianyuan.XianlvMainMdr = XianlvMainMdr;
            __reflect(XianlvMainMdr.prototype, "game.mod.xianyuan.XianlvMainMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvDoufaModel = /** @class */ (function () {
                function XianlvDoufaModel() {
                    this.max_win_count = 0;
                    /**0没开启挑战 */
                    this.count = 0;
                    this.buy_count = 0;
                    this.reward = 0;
                    this.show_tips = false;
                    this.auto = false;
                }
                return XianlvDoufaModel;
            }());
            xianyuan.XianlvDoufaModel = XianlvDoufaModel;
            __reflect(XianlvDoufaModel.prototype, "game.mod.xianyuan.XianlvDoufaModel");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var s2c_xianlv_pvp_base_info = msg.s2c_xianlv_pvp_base_info;
            var s2c_xianlv_pvp_rank_info = msg.s2c_xianlv_pvp_rank_info;
            var s2c_xianlv_pvp_challenge_info = msg.s2c_xianlv_pvp_challenge_info;
            var s2c_xianlv_pvp_nianya_win = msg.s2c_xianlv_pvp_nianya_win;
            var c2s_xianlv_pvp_challenge = msg.c2s_xianlv_pvp_challenge;
            var c2s_xianlv_pvp_oper = msg.c2s_xianlv_pvp_oper;
            var Handler = base.Handler;
            var facade = base.facade;
            var XianlvDoufaProxy = /** @class */ (function (_super) {
                __extends(XianlvDoufaProxy, _super);
                function XianlvDoufaProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**----------------------- 红点 --------------------------- */
                    /**============== 修仙女仆自动挂机 ==============*/
                    _this._sendAutoChallengeEnter = false; //入场标识
                    return _this;
                    /**============== 修仙女仆自动挂机 ==============*/
                }
                XianlvDoufaProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new xianyuan.XianlvDoufaModel();
                    this.onProto(s2c_xianlv_pvp_base_info, this.s2c_xianlv_pvp_base_info, this);
                    this.onProto(s2c_xianlv_pvp_rank_info, this.s2c_xianlv_pvp_rank_info, this);
                    this.onProto(s2c_xianlv_pvp_challenge_info, this.s2c_xianlv_pvp_challenge_info, this);
                    this.onProto(s2c_xianlv_pvp_nianya_win, this.s2c_xianlv_pvp_nianya_win, this);
                };
                /**1 基础信息 3 入场 4 一键领取奖励(s2c_xianlv_pvp_base_info) 2 排行信息(s2c_xianlv_pvp_rank_info)  */
                XianlvDoufaProxy.prototype.c2s_xianlv_pvp_oper = function (type) {
                    var msg = new c2s_xianlv_pvp_oper();
                    msg.type = type;
                    this.sendProto(msg);
                };
                /**1 开始匹配 2 开始战斗 3 自动战斗 */
                XianlvDoufaProxy.prototype.c2s_xianlv_pvp_challenge = function (type) {
                    var msg = new c2s_xianlv_pvp_challenge();
                    msg.type = type;
                    this.sendProto(msg);
                };
                XianlvDoufaProxy.prototype.s2c_xianlv_pvp_base_info = function (n) {
                    var msg = n.body;
                    this._model.count = msg.count || 0;
                    this._model.buy_count = msg.buy_count || 0;
                    this._model.reward = msg.reward || 0;
                    this._model.max_win_count = msg.max_win_count || 0;
                    if (msg.hasOwnProperty("total_count") && msg.hasOwnProperty("total_score")) {
                        this._model.total_count = msg.total_count;
                        this._model.total_score = msg.total_score;
                        this.show_tips = true;
                    }
                    this.onUpdateHint();
                    this.checkAutoChallengeDoufa();
                    this.sendNt("on_update_xianlv_doufa_info" /* ON_UPDATE_XIANLV_DOUFA_INFO */);
                };
                XianlvDoufaProxy.prototype.s2c_xianlv_pvp_rank_info = function (n) {
                    var msg = n.body;
                    if (msg.my_rank) {
                        this._model.my_rank = msg.my_rank;
                    }
                    if (msg.geren_rank) {
                        this._model.geren_rank = msg.geren_rank;
                    }
                    if (msg.first_info) {
                        this._model.first_info = msg.first_info;
                    }
                    this.sendNt("on_update_xianlv_doufa_rank" /* ON_UPDATE_XIANLV_DOUFA_RANK */);
                };
                XianlvDoufaProxy.prototype.s2c_xianlv_pvp_challenge_info = function (n) {
                    var _this = this;
                    var msg = n.body;
                    if (!msg.is_success) {
                        this.auto = false;
                        game.PromptBox.getIns().show("匹配失败,请重新开始挑战");
                        this.resetAutoChallengeDoufa();
                        return;
                    }
                    var myData = { name: game.RoleVo.ins.name, sex: game.RoleVo.ins.sex, showpower: game.RoleVo.ins.showpower };
                    if (msg.player_info) {
                        this._model.player_info = msg.player_info;
                        mod.ViewMgr.getIns().showCommonMatch({
                            type: 2,
                            players: [myData, mod.RoleUtil.getBanlvInfo()],
                            enemys: msg.player_info,
                            handler: base.Handler.alloc(this, function () {
                                _this.c2s_xianlv_pvp_challenge(2);
                            })
                        });
                    }
                    this.sendNt("on_update_xianlv_doufa_auto" /* ON_UPDATE_XIANLV_DOUFA_AUTO */, true);
                };
                XianlvDoufaProxy.prototype.s2c_xianlv_pvp_nianya_win = function (n) {
                    var msg = n.body;
                    mod.ViewMgr.getIns().showSecondPop("58" /* Xianyuan */, "23" /* XianlvDoufaWin */, msg);
                };
                Object.defineProperty(XianlvDoufaProxy.prototype, "count", {
                    /**----------------------- 数据 --------------------------- */
                    get: function () {
                        return this._model.count || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "auto", {
                    get: function () {
                        return this._model.auto;
                    },
                    set: function (v) {
                        this._model.auto = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "my_rank", {
                    get: function () {
                        return this._model.my_rank;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "ranks", {
                    get: function () {
                        return this._model.geren_rank || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "first_info", {
                    get: function () {
                        return this._model.first_info || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "player_info", {
                    get: function () {
                        return this._model.player_info;
                    },
                    enumerable: true,
                    configurable: true
                });
                XianlvDoufaProxy.prototype.getRankList = function () {
                    var ranks = this.ranks;
                    var cfgArr = game.getConfigListByName("xianlvdoufa_rank.json" /* XianlvDoufaRank */);
                    var list = [];
                    var _loop_1 = function (k) {
                        var cfg = cfgArr[k];
                        var start = cfg.ranks[0];
                        var end = cfg.ranks[1];
                        if (start == end) {
                            var item = ranks && ranks[start - 1];
                            var name = this_1.getRankItemName(item);
                            list.push({
                                rank: start,
                                name: name,
                                hurtStr: item && item.value.toString() || "",
                                reward: cfg.rewards
                            });
                        }
                        else {
                            // let str: string = TextUtil.addLinkHtmlTxt(getLanById(LanDef.tongtiange_tips12),
                            // WhiteColor.DEFAULT, "");
                            var isMax = start > game.MAX_RANK_NUM;
                            var rank_1 = isMax ? start - 1 + "+" : start + "-" + end;
                            var lookHandler = base.Handler.alloc(this_1, function () {
                                mod.ViewMgr.getIns().showSecondPop("58" /* Xianyuan */, "26" /* XianlvDoufaSection */, { rank: rank_1 });
                            });
                            list.push({
                                rank: rank_1,
                                // name: start > MAX_RANK_NUM ? "" : str,
                                name: "",
                                reward: cfg.rewards,
                                lookHandler: !isMax && lookHandler
                            });
                        }
                    };
                    var this_1 = this;
                    for (var k in cfgArr) {
                        _loop_1(k);
                    }
                    return list;
                };
                XianlvDoufaProxy.prototype.getRankItemName = function (item) {
                    if (!item) {
                        return game.getLanById("tishi_2" /* tishi_2 */);
                    }
                    return item.name + "\n" + item.xianlv_name;
                };
                XianlvDoufaProxy.prototype.getRankSection = function (rank) {
                    var strArr = rank.split("-");
                    var start = +strArr[0];
                    var end = +strArr[1];
                    var ranks = this.ranks;
                    var list = [];
                    for (var i = start - 1; i < end; i++) {
                        var item = ranks && ranks[i];
                        var rank_2 = item && item.rank_num || i + 1;
                        var name = this.getRankItemName(item);
                        var value = item && +item.value || 0;
                        list.push({ rank: rank_2, name: name, value: value });
                    }
                    return list;
                };
                XianlvDoufaProxy.prototype.getRankStr = function () {
                    var info = this.my_rank;
                    if (info && info.rank_num) {
                        var str = game.TextUtil.addColor("" + info.rank_num, 2330156 /* GREEN */);
                        var lan = game.getLanById("compete_mars_4" /* compete_mars_4 */);
                        return game.StringUtil.substitute(lan, [str]);
                    }
                    var param = game.GameConfig.getParamConfigById("xianlvdoufa_rank");
                    return game.StringUtil.substitute(game.getLanById("xianlvdoufa_tips4" /* xianlvdoufa_tips4 */), [param.value]);
                };
                XianlvDoufaProxy.prototype.getRankCountStr = function () {
                    var info = this.my_rank;
                    var str = game.TextUtil.addColor("" + (info && info.value || 0), 2330156 /* GREEN */);
                    return game.StringUtil.substitute(game.getLanById("fairy_my_point" /* fairy_my_point */), [str]);
                };
                Object.defineProperty(XianlvDoufaProxy.prototype, "show_tips", {
                    get: function () {
                        return this._model.show_tips;
                    },
                    set: function (v) {
                        this._model.show_tips = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "total_score", {
                    get: function () {
                        return this._model.total_score || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "total_count", {
                    get: function () {
                        return this._model.total_count || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "reward", {
                    get: function () {
                        return this._model.reward || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "max_win_count", {
                    get: function () {
                        return this._model.max_win_count || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                XianlvDoufaProxy.prototype.getRewardState = function (cfg) {
                    if (this.max_win_count >= cfg.win_time) {
                        if (this.reward >= cfg.index) {
                            return 2 /* Done */;
                        }
                        else {
                            return 1 /* Reward */;
                        }
                    }
                    return 0 /* NotReward */;
                };
                Object.defineProperty(XianlvDoufaProxy.prototype, "buy_count", {
                    get: function () {
                        return this.xianlvdoufa_buy - this._model.buy_count;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "xianlvdoufa_xiandeng", {
                    /**----------------------- 数据 --------------------------- */
                    /**----------------------- 参数表 --------------------------- */
                    get: function () {
                        if (!this._model.xianlvdoufa_xiandeng) {
                            var param = game.GameConfig.getParamConfigById("xianlvdoufa_xiandeng");
                            this._model.xianlvdoufa_xiandeng = param.value;
                        }
                        return this._model.xianlvdoufa_xiandeng;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "xianlvdoufa_cost", {
                    get: function () {
                        if (!this._model.xianlvdoufa_cost) {
                            var param = game.GameConfig.getParamConfigById("xianlvdoufa_cost");
                            this._model.xianlvdoufa_cost = param.value;
                        }
                        return this._model.xianlvdoufa_cost;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "xianlvdoufa_buycost", {
                    get: function () {
                        if (!this._model.xianlvdoufa_buycost) {
                            var param = game.GameConfig.getParamConfigById("xianlvdoufa_buycost");
                            this._model.xianlvdoufa_buycost = param.value;
                        }
                        return this._model.xianlvdoufa_buycost;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "xianlvdoufa_rank", {
                    get: function () {
                        if (!this._model.xianlvdoufa_rank) {
                            var param = game.GameConfig.getParamConfigById("xianlvdoufa_rank");
                            this._model.xianlvdoufa_rank = param.value;
                        }
                        return this._model.xianlvdoufa_rank;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "xianlvdoufa_time", {
                    get: function () {
                        if (!this._model.xianlvdoufa_time) {
                            var param = game.GameConfig.getParamConfigById("xianlvdoufa_time");
                            this._model.xianlvdoufa_time = param.value;
                        }
                        return this._model.xianlvdoufa_time;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XianlvDoufaProxy.prototype, "xianlvdoufa_buy", {
                    get: function () {
                        if (!this._model.xianlvdoufa_buy) {
                            var param = game.GameConfig.getParamConfigById("xianlvdoufa_buy");
                            this._model.xianlvdoufa_buy = param.value;
                        }
                        return this._model.xianlvdoufa_buy;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**----------------------- 参数表 --------------------------- */
                /**----------------------- 红点 --------------------------- */
                XianlvDoufaProxy.prototype.onUpdateHint = function () {
                    var roots = ["58" /* Xianyuan */, "01" /* Xianlv */, "04" /* Zhanchang */];
                    if (!mod.RoleUtil.getBanlvInfo()) {
                        mod.HintMgr.setHint(false, roots);
                        return;
                    }
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670178 /* XianlvZhanchang */)) {
                        return;
                    }
                    var cfgArr = game.getConfigListByName("xianlvdoufa_reward.json" /* XianlvDoufaReward */);
                    for (var _i = 0, cfgArr_1 = cfgArr; _i < cfgArr_1.length; _i++) {
                        var cfg = cfgArr_1[_i];
                        var state = this.getRewardState(cfg);
                        if (state == 1 /* Reward */) {
                            mod.HintMgr.setHint(true, roots);
                            return;
                        }
                    }
                    var cnt = mod.BagUtil.getPropCntByIdx(this.xianlvdoufa_cost[0]);
                    if (cnt > 0 || this.count > 0) {
                        mod.HintMgr.setHint(true, roots);
                        return;
                    }
                    mod.HintMgr.setHint(false, roots);
                };
                XianlvDoufaProxy.prototype.canAutoChallengeDoufa = function () {
                    //没有伴侣
                    if (!mod.RoleUtil.getBanlvInfo()) {
                        return false;
                    }
                    //可以挑战
                    if (this.count > 0) {
                        return true;
                    }
                    //可以入场
                    if (this.count == 0) {
                        return true;
                    }
                    return false;
                };
                XianlvDoufaProxy.prototype.sendChallengeDoufa = function () {
                    if (this.count) {
                        this.c2s_xianlv_pvp_challenge(1); //开始匹配
                    }
                    else {
                        this._sendAutoChallengeEnter = false;
                        var cost = this.xianlvdoufa_cost;
                        if (cost && mod.BagUtil.checkPropCnt(cost[0], cost[1])) {
                            this._sendAutoChallengeEnter = true;
                            this.c2s_xianlv_pvp_oper(3); //入场
                        }
                    }
                };
                //伴侣信息变化
                XianlvDoufaProxy.prototype.onBanlvInfoUpdate = function () {
                    this.onUpdateHint();
                    this.checkAutoChallengeDoufa();
                };
                //7.仙侣斗法
                XianlvDoufaProxy.prototype.checkAutoChallengeDoufa = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670178 /* XianlvZhanchang */)) {
                        return;
                    }
                    //突然离婚
                    if (!mod.RoleUtil.getBanlvInfo()) {
                        mod.RoleUtil.removeAutoChallengeEvent(7 /* Xianlvdoufa */, true);
                        return;
                    }
                    //发了入场协议的，回调时候马上匹配战斗
                    if (this._sendAutoChallengeEnter) {
                        this._sendAutoChallengeEnter = false;
                        this.sendChallengeDoufa();
                        return;
                    }
                    if (this.canAutoChallengeDoufa()) {
                        mod.RoleUtil.addAutoChallengeEvent(7 /* Xianlvdoufa */, Handler.alloc(this, this.sendChallengeDoufa));
                    }
                    else {
                        mod.RoleUtil.removeAutoChallengeEvent(7 /* Xianlvdoufa */);
                    }
                };
                //失败情况处理
                XianlvDoufaProxy.prototype.resetAutoChallengeDoufa = function () {
                    mod.RoleUtil.removeAutoChallengeEvent(7 /* Xianlvdoufa */);
                    facade.sendNt("on_xiuxiannvpu_special_challenge_next" /* ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT */);
                    this.checkAutoChallengeDoufa();
                };
                return XianlvDoufaProxy;
            }(game.ProxyBase));
            xianyuan.XianlvDoufaProxy = XianlvDoufaProxy;
            __reflect(XianlvDoufaProxy.prototype, "game.mod.xianyuan.XianlvDoufaProxy");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvModel = /** @class */ (function () {
                function XianlvModel() {
                    var _a;
                    /** 同修天数 */
                    this.days = 0;
                    /** 返回邀请记录 */
                    this.invite_records = [];
                    /**页签红点*/
                    this.hintPath = {
                        1: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */],
                        2: ["58" /* Xianyuan */, "01" /* Xianlv */, "02" /* Renwu */],
                        3: ["58" /* Xianyuan */, "01" /* Xianlv */, "03" /* Shilian */],
                        4: ["58" /* Xianyuan */, "01" /* Xianlv */, "04" /* Zhanchang */]
                    };
                    /**按钮功能开启id*/
                    this.btnOpenIdxAry = [1041670174 /* XianlvChild */, 1041670175 /* XianlvRing */, null, null];
                    /**按钮红点路径*/
                    this.btnHintPath = (_a = {},
                        _a[this.btnOpenIdxAry[0]] = ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */],
                        _a[this.btnOpenIdxAry[1]] = ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "15" /* RingMain */],
                        _a);
                }
                return XianlvModel;
            }());
            xianyuan.XianlvModel = XianlvModel;
            __reflect(XianlvModel.prototype, "game.mod.xianyuan.XianlvModel");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var c2s_xianlv_seeking_info = msg.c2s_xianlv_seeking_info;
            var s2c_xianlv_seeking_info = msg.s2c_xianlv_seeking_info;
            var c2s_xianlv_seeking = msg.c2s_xianlv_seeking;
            var s2c_xianlv_banlv_info = msg.s2c_xianlv_banlv_info;
            var c2s_xianlv_propose = msg.c2s_xianlv_propose;
            var c2s_xianlv_lihun = msg.c2s_xianlv_lihun;
            var c2s_xianlv_choujiang = msg.c2s_xianlv_choujiang;
            var facade = base.facade;
            /**
             * @description 仙侣系统
             */
            var XianlvProxy = /** @class */ (function (_super) {
                __extends(XianlvProxy, _super);
                function XianlvProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XianlvProxy.prototype.getBtnOpenIdxAry = function () {
                    return this._model.btnOpenIdxAry;
                };
                XianlvProxy.prototype.getBtnHintPath = function (openIdx) {
                    return this._model.btnHintPath[openIdx];
                };
                XianlvProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new xianyuan.XianlvModel();
                    this.onProto(s2c_xianlv_banlv_info, this.s2c_xianlv_banlv_info, this);
                    this.onProto(s2c_xianlv_seeking_info, this.s2c_xianlv_seeking_info, this);
                };
                //求婚，oper：1强制 2普通
                XianlvProxy.prototype.c2s_xianlv_propose = function (role_id, oper, server_id) {
                    var msg = new c2s_xianlv_propose();
                    msg.role_id = role_id;
                    msg.oper = oper;
                    msg.server_id = server_id;
                    this.sendProto(msg);
                };
                //是否同意，oper：1同意 2拒绝
                XianlvProxy.prototype.c2s_xianlv_seeking = function (role_id, oper) {
                    var msg = new c2s_xianlv_seeking();
                    msg.role_id = role_id;
                    msg.oper = oper;
                    this.sendProto(msg);
                };
                //返回伴侣信息
                XianlvProxy.prototype.s2c_xianlv_banlv_info = function (n) {
                    var msg = n.body;
                    var oldInfo = this._model.banlv_infos;
                    if (oldInfo && !msg.infos) {
                        //解除仙侣时候，删除对应私聊信息
                        var chatProxy = facade.retMod("25" /* Chat */).retProxy(35 /* Chat */);
                        chatProxy.deletePrivateInfo(oldInfo.role_id);
                    }
                    this._model.banlv_infos = msg.infos ? msg.infos : null;
                    this._model.days = msg.days ? msg.days : 0;
                    this.sendNt("on_update_banlv_info" /* ON_UPDATE_BANLV_INFO */);
                };
                //邀请记录
                XianlvProxy.prototype.c2s_xianlv_seeking_info = function () {
                    var msg = new c2s_xianlv_seeking_info();
                    this.sendProto(msg);
                };
                //返回邀请记录
                XianlvProxy.prototype.s2c_xianlv_seeking_info = function (n) {
                    var msg = n.body;
                    if (msg.infos != null) {
                        this._model.invite_records = msg.infos;
                    }
                    else {
                        this._model.invite_records = [];
                    }
                    this.sendNt("on_update_invite_records" /* ON_UPDATE_INVITE_RECORDS */);
                };
                //离婚
                XianlvProxy.prototype.c2s_xianlv_lihun = function () {
                    this.sendProto(new c2s_xianlv_lihun());
                };
                // 抽奖 1 低级 2 高级
                XianlvProxy.prototype.c2s_xianlv_choujiang = function (oper) {
                    var msg = new c2s_xianlv_choujiang();
                    msg.oper = oper;
                    this.sendProto(msg);
                };
                //强制结婚消耗
                XianlvProxy.prototype.getForceMarryCost = function () {
                    return [1450100133 /* Kunxiansheng */, 1];
                };
                //同修天数
                XianlvProxy.prototype.getTogetherDay = function () {
                    return this._model.days;
                };
                //todo（子女战力+婚戒战力+子女翅膀+子女神兵....）
                XianlvProxy.prototype.getPower = function () {
                    var ringProxy = game.getProxy("58" /* Xianyuan */, 228 /* Ring */);
                    var ringPower = ringProxy.getPower();
                    var childProxy = game.getProxy("58" /* Xianyuan */, 227 /* Child */);
                    var childPower = childProxy.getPower();
                    return ringPower + childPower;
                };
                XianlvProxy.prototype.isMarried = function () {
                    return !!this._model.banlv_infos;
                };
                XianlvProxy.prototype.getBanlvInfo = function () {
                    return this._model.banlv_infos;
                };
                XianlvProxy.prototype.getInviteRecords = function () {
                    return this._model.invite_records;
                };
                XianlvProxy.prototype.getZhaohuanCosts = function () {
                    var paramCfg = game.GameConfig.getParamConfigById('xianlv_zhaohuancost');
                    return paramCfg ? paramCfg.value : [];
                };
                XianlvProxy.prototype.canZhaohuan = function () {
                    for (var i = 1; i <= 2; i++) {
                        if (this.canZhaohuanByOper(i)) {
                            return true;
                        }
                    }
                    return false;
                };
                //1 低级 2 高级
                XianlvProxy.prototype.canZhaohuanByOper = function (oper, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    var costs = this.getZhaohuanCosts();
                    var cost = costs[oper - 1];
                    return cost && cost.length && mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                //仙侣红点
                XianlvProxy.prototype.updateHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670173 /* Xianlv */)) {
                        return;
                    }
                    var zhaohuanHint = this.canZhaohuan();
                    mod.HintMgr.setHint(zhaohuanHint, this._model.hintPath[1]);
                };
                //仙侣任务红点
                XianlvProxy.prototype.updateHint2 = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670176 /* XianlvRenwu */)) {
                        return;
                    }
                    var taskList = mod.TaskUtil.getTaskList(38 /* Xianlv */);
                    var hint = false;
                    for (var _i = 0, taskList_1 = taskList; _i < taskList_1.length; _i++) {
                        var task = taskList_1[_i];
                        if (task && mod.TaskUtil.canRewardDraw(task)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.hintPath[2]);
                };
                XianlvProxy.prototype.onOpenFuncUpdate = function (n) {
                    var addIdx = n.body;
                    if (addIdx.indexOf(1041670173 /* Xianlv */) > -1) {
                        this.updateHint();
                    }
                    if (addIdx.indexOf(1041670176 /* XianlvRenwu */) > -1) {
                        this.updateHint2();
                    }
                };
                XianlvProxy.prototype.onTaskHint = function (n) {
                    var types = n.body;
                    if (types.indexOf(38 /* Xianlv */) > -1) {
                        this.updateHint2();
                    }
                };
                XianlvProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("xtlqcoin" /* Xtlqcoin */) > -1) {
                        this.updateHint();
                    }
                };
                XianlvProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    var zhaohuanCosts = this.getZhaohuanCosts();
                    var idx = zhaohuanCosts && zhaohuanCosts[1] && zhaohuanCosts[1][0] || 0;
                    if (indexs.indexOf(idx) > -1) {
                        this.updateHint();
                    }
                };
                //能否开启试炼
                XianlvProxy.prototype.isOpenShilian = function () {
                    return this.isMarried() && mod.ViewMgr.getIns().checkViewOpen(1041670177 /* XianlvShilian */);
                };
                return XianlvProxy;
            }(game.ProxyBase));
            xianyuan.XianlvProxy = XianlvProxy;
            __reflect(XianlvProxy.prototype, "game.mod.xianyuan.XianlvProxy", ["game.mod.IXianlvProxy", "base.IProxy"]);
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvShilianModel = /** @class */ (function () {
                function XianlvShilianModel() {
                    this.list = {};
                    this.rank_info = [];
                    this.my_score = 0;
                    this.my_rank_no = 0;
                    this.rank_one_info = [];
                    this.jifen_info = [];
                    this.hintPath = ["58" /* Xianyuan */, "01" /* Xianlv */, "03" /* Shilian */];
                    this.rankHintPath = ["58" /* Xianyuan */, "19" /* ShilianRank */, "01" /* TabBtnType01 */];
                }
                return XianlvShilianModel;
            }());
            xianyuan.XianlvShilianModel = XianlvShilianModel;
            __reflect(XianlvShilianModel.prototype, "game.mod.xianyuan.XianlvShilianModel");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var c2s_challenge_shilian = msg.c2s_challenge_shilian;
            var c2s_shilian_sweep = msg.c2s_shilian_sweep;
            var c2s_shilian_get_reward = msg.c2s_shilian_get_reward;
            var s2c_shilian_info = msg.s2c_shilian_info;
            var c2s_xianlv_shilian_openui = msg.c2s_xianlv_shilian_openui;
            var s2c_shilian_damage = msg.s2c_shilian_damage;
            var c2s_shilian_rank_info = msg.c2s_shilian_rank_info;
            var s2c_shilian_rank_info = msg.s2c_shilian_rank_info;
            var c2s_shilian_jifen_info = msg.c2s_shilian_jifen_info;
            var c2s_shilian_jifen_oper = msg.c2s_shilian_jifen_oper;
            var s2c_shilian_jifen_info = msg.s2c_shilian_jifen_info;
            var Handler = base.Handler;
            /**
             * @description 仙侣试炼系统
             */
            var XianlvShilianProxy = /** @class */ (function (_super) {
                __extends(XianlvShilianProxy, _super);
                function XianlvShilianProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**当前挑战的副本类型*/
                    _this.curType = 0;
                    _this._maxLayer = {};
                    return _this;
                    /**============== 修仙女仆自动挂机 ==============*/
                }
                Object.defineProperty(XianlvShilianProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                XianlvShilianProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new xianyuan.XianlvShilianModel();
                    this.onProto(s2c_shilian_info, this.s2c_shilian_info, this);
                    this.onProto(s2c_shilian_damage, this.s2c_shilian_damage, this);
                    this.onProto(s2c_shilian_rank_info, this.s2c_shilian_rank_info, this);
                    this.onProto(s2c_shilian_jifen_info, this.s2c_shilian_jifen_info, this);
                };
                // 挑战副本
                XianlvShilianProxy.prototype.c2s_challenge_shilian = function (type) {
                    var msg = new c2s_challenge_shilian();
                    msg.type = type;
                    this.curType = type;
                    this.sendProto(msg);
                };
                // 副本扫荡
                XianlvShilianProxy.prototype.c2s_shilian_sweep = function (type, cnt) {
                    var msg = new c2s_shilian_sweep();
                    msg.type = type;
                    msg.cnt = cnt;
                    this.sendProto(msg);
                };
                // 领取类型奖励
                XianlvShilianProxy.prototype.c2s_shilian_get_reward = function (type) {
                    var msg = new c2s_shilian_get_reward();
                    msg.type = type;
                    this.sendProto(msg);
                };
                // 试炼数据
                XianlvShilianProxy.prototype.s2c_shilian_info = function (n) {
                    var msg = n.body;
                    if (msg.list != null) {
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            this._model.list[item.type] = item;
                        }
                    }
                    if (msg.score != null) {
                        this._model.my_score = msg.score;
                    }
                    this.checkAutoChallengeShilian();
                    this.updateHint();
                    this.sendNt("on_update_shilian_info" /* ON_UPDATE_SHILIAN_INFO */);
                };
                //请求主界面
                XianlvShilianProxy.prototype.c2s_xianlv_shilian_openui = function () {
                    var msg = new c2s_xianlv_shilian_openui();
                    this.sendProto(msg);
                };
                XianlvShilianProxy.prototype.s2c_shilian_damage = function (n) {
                    var msg = n.body;
                    var damage = msg.damage && msg.damage.toNumber() || 0;
                    this.sendNt("on_update_shilian_damage" /* ON_UPDATE_SHILIAN_DAMAGE */, damage);
                };
                /// 排行榜请求
                XianlvShilianProxy.prototype.c2s_shilian_rank_info = function () {
                    var msg = new c2s_shilian_rank_info();
                    this.sendProto(msg);
                };
                XianlvShilianProxy.prototype.s2c_shilian_rank_info = function (n) {
                    var msg = n.body;
                    if (msg.rank_info != null) {
                        this._model.rank_info = msg.rank_info;
                    }
                    if (msg.my_score != null) {
                        this._model.my_score = msg.my_score;
                    }
                    if (msg.my_rank_no != null) {
                        this._model.my_rank_no = msg.my_rank_no;
                    }
                    if (msg.rank_one_info != null) {
                        this._model.rank_one_info = msg.rank_one_info;
                    }
                    this.updateHint();
                    this.sendNt("on_update_shilian_rank_info" /* ON_UPDATE_SHILIAN_RANK_INFO */);
                };
                // 请求排行榜积分奖励信息
                XianlvShilianProxy.prototype.c2s_shilian_jifen_info = function () {
                    var msg = new c2s_shilian_jifen_info();
                    this.sendProto(msg);
                };
                XianlvShilianProxy.prototype.c2s_shilian_jifen_oper = function (index) {
                    var msg = new c2s_shilian_jifen_oper();
                    msg.index = index;
                    this.sendProto(msg);
                };
                XianlvShilianProxy.prototype.s2c_shilian_jifen_info = function (n) {
                    var msg = n.body;
                    if (msg.info != null) {
                        this._model.jifen_info = msg.info;
                    }
                    this.updateHint();
                    this.sendNt("ON_UPDATE_SHILIAN_JIFEN_INFO" /* ON_UPDATE_SHILIAN_JIFEN_INFO */);
                };
                XianlvShilianProxy.prototype.getSceneConfig = function (type, layer) {
                    var cfgObj = game.getConfigByNameId("xianlv_shilian_scene.json" /* XianlvShilianScene */, type);
                    if (!layer) {
                        var info = this.getInfo(type);
                        layer = info && info.layer || 1;
                    }
                    return cfgObj[layer];
                };
                XianlvShilianProxy.prototype.getInfo = function (type) {
                    return this._model.list[type];
                };
                XianlvShilianProxy.prototype.getMaxLayer = function (type) {
                    if (this._maxLayer[type]) {
                        return this._maxLayer[type];
                    }
                    var cfgObj = game.getConfigByNameId("xianlv_shilian_scene.json" /* XianlvShilianScene */, type);
                    var len = Object.keys(cfgObj).length;
                    return this._maxLayer[type] = len;
                };
                XianlvShilianProxy.prototype.isMaxLayer = function (type) {
                    var info = this.getInfo(type);
                    if (!info) {
                        return false;
                    }
                    var curLayer = info && info.layer || 1;
                    return curLayer >= this.getMaxLayer(type);
                };
                XianlvShilianProxy.prototype.canChallenge = function (type, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    // if (this.isMaxLayer(type)) {
                    //     if (isTips) {
                    //         PromptBox.getIns().show(getLanById(LanDef.cross_boss_tips4));
                    //     }
                    //     return false;
                    // }
                    var cost = this.getChallengeCost();
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                XianlvShilianProxy.prototype.getChallengeCost = function () {
                    var paramCfg = game.GameConfig.getParamConfigById('xianlv_fuben_cost');
                    var idx = paramCfg.value;
                    return [idx, 1];
                };
                //展示排行名次
                XianlvShilianProxy.prototype.getRankShow = function () {
                    var paramCfg = game.GameConfig.getParamConfigById('xianlv_rankshow');
                    return paramCfg.value || game.MAX_RANK_NUM;
                };
                XianlvShilianProxy.prototype.getRankReward = function (rank_no) {
                    var cfgList = game.getConfigListByName("xianlv_rank.json" /* XianlvRank */);
                    for (var _i = 0, cfgList_11 = cfgList; _i < cfgList_11.length; _i++) {
                        var cfg = cfgList_11[_i];
                        var section = cfg.rank_section;
                        if (section[0] <= rank_no && rank_no <= section[1]) {
                            return cfg.reward;
                        }
                    }
                    return [];
                };
                XianlvShilianProxy.prototype.getJifenCfgList = function () {
                    return game.getConfigListByName("xianlv_jifen.json" /* XianlvJifen */);
                };
                XianlvShilianProxy.prototype.isJifenGotten = function (index) {
                    return this._model.jifen_info.indexOf(index) > -1;
                };
                XianlvShilianProxy.prototype.getRankRewardHint = function () {
                    var cfgList = this.getJifenCfgList();
                    var myScore = this._model.my_score;
                    for (var _i = 0, cfgList_12 = cfgList; _i < cfgList_12.length; _i++) {
                        var cfg = cfgList_12[_i];
                        if (!this.isJifenGotten(cfg.index) && myScore >= cfg.score) {
                            return true;
                        }
                    }
                    return false;
                };
                XianlvShilianProxy.prototype.updateHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670177 /* XianlvShilian */)) {
                        return;
                    }
                    //未结婚
                    if (!mod.RoleUtil.getBanlvInfo()) {
                        mod.HintMgr.setHint(false, this._model.hintPath);
                        return;
                    }
                    var cfgList = game.getConfigListByName("xianlv_shilian_fuben.json" /* XianlvShilianFuben */);
                    //排行榜红点
                    var hint = this.getRankRewardHint();
                    mod.HintMgr.setHint(hint, this._model.rankHintPath);
                    //挑战和奖励红点
                    if (!hint) {
                        for (var _i = 0, cfgList_13 = cfgList; _i < cfgList_13.length; _i++) {
                            var cfg = cfgList_13[_i];
                            if (cfg && this.canChallenge(cfg.type)) {
                                hint = true;
                                break;
                            }
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.hintPath);
                };
                XianlvShilianProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    var cost = this.getChallengeCost();
                    if (cost && indexs && indexs.indexOf(cost[0]) > -1) {
                        this.updateHint();
                        this.checkAutoChallengeShilian();
                    }
                };
                /**============== 修仙女仆自动挂机 ==============*/
                XianlvShilianProxy.prototype.canAutoChallengeShilian = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670177 /* XianlvShilian */) || !mod.RoleUtil.getBanlvInfo()) {
                        return false;
                    }
                    var cost = this.getChallengeCost();
                    if (cost && !mod.BagUtil.checkPropCnt(cost[0], cost[1])) {
                        return false;
                    }
                    var type = this.getAutoChallengeShilianType();
                    return !!type;
                };
                XianlvShilianProxy.prototype.getAutoChallengeShilianType = function () {
                    var list = this.model.list;
                    if (!list) {
                        return null;
                    }
                    for (var key in list) {
                        var info = list[key];
                        if (info && !info.max_damage_record && info.status == 0) {
                            return info.type;
                        }
                    }
                    return null;
                };
                XianlvShilianProxy.prototype.sendAutoChallengeShilian = function () {
                    var type = this.getAutoChallengeShilianType();
                    if (type) {
                        this.c2s_challenge_shilian(type);
                    }
                };
                XianlvShilianProxy.prototype.checkAutoChallengeShilian = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670177 /* XianlvShilian */)) {
                        return;
                    }
                    //突然被离婚
                    if (!mod.RoleUtil.getBanlvInfo()) {
                        mod.RoleUtil.removeAutoChallengeEvent(6 /* Xianlvshilian */, true);
                        return;
                    }
                    if (this.canAutoChallengeShilian()) {
                        mod.RoleUtil.addAutoChallengeEvent(6 /* Xianlvshilian */, Handler.alloc(this, this.sendAutoChallengeShilian));
                    }
                    else {
                        mod.RoleUtil.removeAutoChallengeEvent(6 /* Xianlvshilian */);
                    }
                };
                XianlvShilianProxy.prototype.onBanlvInfoUpdate = function () {
                    this.updateHint();
                    this.checkAutoChallengeShilian();
                };
                return XianlvShilianProxy;
            }(game.ProxyBase));
            xianyuan.XianlvShilianProxy = XianlvShilianProxy;
            __reflect(XianlvShilianProxy.prototype, "game.mod.xianyuan.XianlvShilianProxy");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvAttrView = /** @class */ (function (_super) {
                __extends(XianlvAttrView, _super);
                function XianlvAttrView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvAttrSkin";
                    return _this;
                }
                return XianlvAttrView;
            }(eui.Component));
            xianyuan.XianlvAttrView = XianlvAttrView;
            __reflect(XianlvAttrView.prototype, "game.mod.xianyuan.XianlvAttrView");
            var XianlvAttrItem = /** @class */ (function (_super) {
                __extends(XianlvAttrItem, _super);
                function XianlvAttrItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvAttrItemSkin";
                    return _this;
                }
                XianlvAttrItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lb_name.text = data.title == 1 ? game.getLanById("xianlv_tips16" /* xianlv_tips16 */) : game.getLanById("xianlv_tips17" /* xianlv_tips17 */);
                    this.lb_attr.textFlow = game.TextUtil.parseHtml(data.attrStr);
                };
                return XianlvAttrItem;
            }(mod.BaseListenerRenderer));
            xianyuan.XianlvAttrItem = XianlvAttrItem;
            __reflect(XianlvAttrItem.prototype, "game.mod.xianyuan.XianlvAttrItem");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvBreakupView = /** @class */ (function (_super) {
                __extends(XianlvBreakupView, _super);
                function XianlvBreakupView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvBreakupSkin";
                    return _this;
                }
                return XianlvBreakupView;
            }(eui.Component));
            xianyuan.XianlvBreakupView = XianlvBreakupView;
            __reflect(XianlvBreakupView.prototype, "game.mod.xianyuan.XianlvBreakupView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var facade = base.facade;
            var XianlvChildIcon = /** @class */ (function (_super) {
                __extends(XianlvChildIcon, _super);
                function XianlvChildIcon() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvChildIconSkin";
                    return _this;
                }
                XianlvChildIcon.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this, this.onClick, this);
                };
                XianlvChildIcon.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                XianlvChildIcon.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    if (data.childIndex) {
                        var childCfg = game.getConfigByNameId("child.json" /* Child */, data.childIndex);
                        this.img_icon.source = childCfg ? childCfg.icon : '';
                        this.img_lock.visible = this.img_add.visible = false;
                        this.img_bg.source = 'zinvtouxiangkuang';
                    }
                    else {
                        this.img_icon.source = '';
                        this.img_bg.source = 'zinvtouxiangkongkuang';
                        this.img_add.visible = data.isActed;
                        this.img_lock.visible = !data.isActed;
                    }
                    // todo
                };
                XianlvChildIcon.prototype.onClick = function () {
                    var data = this.data;
                    if (!data.isActed) {
                        var txt = game.StringUtil.substitute(game.getLanById("xianlv_tips19" /* xianlv_tips19 */), [data.vip]);
                        game.PromptBox.getIns().show(txt);
                        return;
                    }
                    if (data.isActed && !data.childIndex) {
                        // PromptBox.getIns().show(getLanById(LanDef.xianlv_tips18));
                        facade.showView("58" /* Xianyuan */, "07" /* Zhaohuan */);
                        return;
                    }
                    // todo
                };
                return XianlvChildIcon;
            }(mod.BaseListenerRenderer));
            xianyuan.XianlvChildIcon = XianlvChildIcon;
            __reflect(XianlvChildIcon.prototype, "game.mod.xianyuan.XianlvChildIcon");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var Handler = base.Handler;
            var XianlvInviteAddView = /** @class */ (function (_super) {
                __extends(XianlvInviteAddView, _super);
                function XianlvInviteAddView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvInviteAddSkin";
                    return _this;
                }
                return XianlvInviteAddView;
            }(eui.Component));
            xianyuan.XianlvInviteAddView = XianlvInviteAddView;
            __reflect(XianlvInviteAddView.prototype, "game.mod.xianyuan.XianlvInviteAddView");
            var XianlvInviteAddItem = /** @class */ (function (_super) {
                __extends(XianlvInviteAddItem, _super);
                function XianlvInviteAddItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvInviteAddItemSkin";
                    return _this;
                }
                XianlvInviteAddItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("58" /* Xianyuan */, 226 /* Xianlv */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_force, this.onClickForce, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_invite, this.onClickInvite, this);
                };
                XianlvInviteAddItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lb_name.text = data.name;
                    this.lb_zongmen.text = data.guild_name;
                    this.powerLabel.setPowerValue(data.showpower, 2904685 /* DEFAULT2 */);
                    this.lb_goodmanval.text = (data.friendship || 0) + '';
                    this.headVip.updateShow(data.head, data.head_frame, data.sex, data.vip_lv, data.role_id);
                    var online = data.is_online;
                    this.img_online.source = online ? 'zaixian_lv' : 'zaixian_hui';
                    this.lb_online.text = online ? game.getLanById("guild_online" /* guild_online */) : game.getLanById("guild_offline" /* guild_offline */);
                };
                XianlvInviteAddItem.prototype.onClickForce = function () {
                    var _this = this;
                    var cost = this._proxy.getForceMarryCost();
                    var propCfg = game.GameConfig.getPropConfigById(cost[0]);
                    if (!propCfg) {
                        return;
                    }
                    var costStr = game.TextUtil.addColor(propCfg.name + 'x' + cost[1], 16773203 /* YELLOW */);
                    var bagCnt = mod.BagUtil.getPropCntByIdx(cost[0]);
                    var leftCnt = game.TextUtil.addColor(bagCnt + '', bagCnt > 0 ? 8585074 /* GREEN */ : 16731212 /* RED */);
                    var txt = game.StringUtil.substitute(game.getLanById("xianlv_tips8" /* xianlv_tips8 */), [costStr, leftCnt]);
                    mod.ViewMgr.getIns().showConfirm(txt, Handler.alloc(this, function () {
                        if (!mod.BagUtil.checkPropCntUp(cost[0], cost[1])) {
                            return;
                        }
                        _this._proxy.c2s_xianlv_propose(_this.data.role_id, 1, _this.data.server_id);
                    }));
                };
                XianlvInviteAddItem.prototype.onClickInvite = function () {
                    var _this = this;
                    mod.ViewMgr.getIns().showConfirm(game.getLanById("xianlv_tips9" /* xianlv_tips9 */), Handler.alloc(this, function () {
                        _this._proxy.c2s_xianlv_propose(_this.data.role_id, 2, _this.data.server_id);
                    }));
                };
                return XianlvInviteAddItem;
            }(mod.BaseListenerRenderer));
            xianyuan.XianlvInviteAddItem = XianlvInviteAddItem;
            __reflect(XianlvInviteAddItem.prototype, "game.mod.xianyuan.XianlvInviteAddItem");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildMainMdr = /** @class */ (function (_super) {
                __extends(ChildMainMdr, _super);
                function ChildMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Gongxiang */,
                            icon: "gongxiangbiaoqiantubiao",
                            mdr: xianyuan.ChildMdr,
                            title: "xianlv_tips24",
                            bg: "xianlv_beijingtu2",
                            openIdx: 0,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "01" /* Gongxiang */]
                        },
                        {
                            btnType: "02" /* Shengxing */,
                            icon: "xianlvshengxingbiaoqiantubiao",
                            mdr: xianyuan.ChildUpStarMainMdr,
                            title: "xianlv_tips24",
                            bg: "xianlv_beijingtu4",
                            openIdx: 0,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "02" /* Shengxing */]
                        },
                        {
                            btnType: "03" /* Shenbing */,
                            icon: "shenbingbiaoqiantubiao",
                            mdr: xianyuan.ChildShenbingMainMdr,
                            title: "xianlv_tips24",
                            bg: "xianlv_beijingtu4",
                            openIdx: 0,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "03" /* Shenbing */]
                        },
                        {
                            btnType: "04" /* Lingyi */,
                            icon: "yuyibiaoqiantubiao",
                            mdr: xianyuan.ChildLingyiMainMdr,
                            title: "xianlv_tips24",
                            bg: "xianlv_beijingtu4",
                            openIdx: 0,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "04" /* Lingyi */]
                        }
                    ];
                    return _this;
                }
                return ChildMainMdr;
            }(mod.WndBaseMdr));
            xianyuan.ChildMainMdr = ChildMainMdr;
            __reflect(ChildMainMdr.prototype, "game.mod.xianyuan.ChildMainMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var teammate = msg.teammate;
            var facade = base.facade;
            var XianlvRoleComp = /** @class */ (function (_super) {
                __extends(XianlvRoleComp, _super);
                function XianlvRoleComp() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvRoleCompSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                XianlvRoleComp.prototype.onAddToStage = function () {
                    this._hub = new game.UIEftHub(this);
                    this._proxy = game.getProxy("58" /* Xianyuan */, 226 /* Xianlv */);
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.btn_chat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickChat, this);
                    this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickAdd, this);
                };
                XianlvRoleComp.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.btn_chat.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickChat, this);
                    this.btn_add.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickAdd, this);
                    this.gr_eft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRole, this);
                    this._hub.removeAllEffects();
                    this._roleId = this._serverId = null;
                };
                XianlvRoleComp.prototype.updateViewForMyself = function () {
                    var info = new teammate();
                    var ins = game.RoleVo.ins;
                    info.role_id = ins.role_id;
                    info.name = ins.name;
                    info.sex = ins.sex;
                    info.fashion = ins.fashion;
                    info.weapon = ins.weapon;
                    info.wing = ins.wing;
                    info.server_id = ins.server_id;
                    this.updateView(info, true);
                };
                XianlvRoleComp.prototype.updateView = function (teammate, isMyself) {
                    if (isMyself === void 0) { isMyself = false; }
                    this.teammate = teammate;
                    if (!teammate) {
                        this.defaultView();
                        return;
                    }
                    this.btn_add.visible = this.img_sketch.visible = false;
                    this.lb_name.text = teammate.name;
                    this.btn_chat.visible = !isMyself;
                    var body = game.ResUtil.getModelName(teammate.fashion, teammate.sex);
                    var weapon = game.ResUtil.getModelName(teammate.weapon);
                    var wing = game.ResUtil.getModelName(teammate.wing, teammate.sex, true);
                    this._hub.removeAllEffects();
                    this._hub.updateUIRole(body, weapon, wing, this.gr_eft);
                    if (!isMyself) {
                        this._roleId = teammate.role_id;
                        this._serverId = teammate.server_id;
                        this.gr_eft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRole, this);
                    }
                };
                XianlvRoleComp.prototype.defaultView = function () {
                    this.btn_add.visible = this.img_sketch.visible = true;
                    this.btn_chat.visible = false;
                    this._hub.removeAllEffects();
                    this.lb_name.text = game.getLanById("xianlv_tips7" /* xianlv_tips7 */);
                };
                //打开私聊界面
                XianlvRoleComp.prototype.onClickChat = function () {
                    mod.ViewMgr.getIns().chat(this.teammate);
                };
                XianlvRoleComp.prototype.onClickAdd = function () {
                    facade.showView("58" /* Xianyuan */, "06" /* InviteAdd */);
                };
                XianlvRoleComp.prototype.onClickRole = function () {
                    if (this._roleId) {
                        mod.ViewMgr.getIns().showRoleTips(this._roleId, this._serverId);
                    }
                };
                return XianlvRoleComp;
            }(eui.Component));
            xianyuan.XianlvRoleComp = XianlvRoleComp;
            __reflect(XianlvRoleComp.prototype, "game.mod.xianyuan.XianlvRoleComp");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvView = /** @class */ (function (_super) {
                __extends(XianlvView, _super);
                function XianlvView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvSkin";
                    return _this;
                }
                return XianlvView;
            }(eui.Component));
            xianyuan.XianlvView = XianlvView;
            __reflect(XianlvView.prototype, "game.mod.xianyuan.XianlvView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvZhaohuanBtn = /** @class */ (function (_super) {
                __extends(XianlvZhaohuanBtn, _super);
                function XianlvZhaohuanBtn() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvZhaohuanBtnSkin";
                    return _this;
                }
                XianlvZhaohuanBtn.prototype.updateView = function (val, maxVal) {
                    var progress = val / maxVal;
                    if (progress >= 1) {
                        progress = 1;
                    }
                    this.lb_progress.text = Math.floor(progress * 100) + '%';
                };
                XianlvZhaohuanBtn.prototype.setHint = function (hint) {
                    if (hint === void 0) { hint = false; }
                    this.redPoint.visible = hint;
                };
                return XianlvZhaohuanBtn;
            }(eui.Component));
            xianyuan.XianlvZhaohuanBtn = XianlvZhaohuanBtn;
            __reflect(XianlvZhaohuanBtn.prototype, "game.mod.xianyuan.XianlvZhaohuanBtn");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvZhaohuanView = /** @class */ (function (_super) {
                __extends(XianlvZhaohuanView, _super);
                function XianlvZhaohuanView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvZhaohuanSkin";
                    return _this;
                }
                return XianlvZhaohuanView;
            }(eui.Component));
            xianyuan.XianlvZhaohuanView = XianlvZhaohuanView;
            __reflect(XianlvZhaohuanView.prototype, "game.mod.xianyuan.XianlvZhaohuanView");
            var XianlvZhaohuanItem = /** @class */ (function (_super) {
                __extends(XianlvZhaohuanItem, _super);
                function XianlvZhaohuanItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvZhaohuanItemSkin";
                    return _this;
                }
                XianlvZhaohuanItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("58" /* Xianyuan */, 226 /* Xianlv */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn, this.onClick, this);
                };
                XianlvZhaohuanItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.img_bg.source = game.ResUtil.getUiPng("zhaohuan_bg" + data.oper);
                    this.btn.setPriceCost(data.cost);
                    this.btn.setHint(mod.BagUtil.checkPropCnt(data.cost[0], data.cost[1]));
                    this.removeAllEffects();
                    this.addEftByParentScale(this.btn.group_eft);
                };
                XianlvZhaohuanItem.prototype.onClick = function () {
                    if (this._proxy.canZhaohuanByOper(this.data.oper, true)) {
                        this._proxy.c2s_xianlv_choujiang(this.data.oper);
                    }
                };
                return XianlvZhaohuanItem;
            }(mod.BaseRenderer));
            xianyuan.XianlvZhaohuanItem = XianlvZhaohuanItem;
            __reflect(XianlvZhaohuanItem.prototype, "game.mod.xianyuan.XianlvZhaohuanItem");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvDoufaFailView = /** @class */ (function (_super) {
                __extends(XianlvDoufaFailView, _super);
                function XianlvDoufaFailView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvDoufaFailSkin";
                    return _this;
                }
                return XianlvDoufaFailView;
            }(eui.Component));
            xianyuan.XianlvDoufaFailView = XianlvDoufaFailView;
            __reflect(XianlvDoufaFailView.prototype, "game.mod.xianyuan.XianlvDoufaFailView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvDoufaLightItem = /** @class */ (function (_super) {
                __extends(XianlvDoufaLightItem, _super);
                function XianlvDoufaLightItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XianlvDoufaLightItem.prototype.dataChanged = function () {
                    this.img_light.source = "" + (this.data ? "light" : "light2");
                };
                return XianlvDoufaLightItem;
            }(mod.BaseRenderer));
            xianyuan.XianlvDoufaLightItem = XianlvDoufaLightItem;
            __reflect(XianlvDoufaLightItem.prototype, "game.mod.xianyuan.XianlvDoufaLightItem");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ArrayCollection = eui.ArrayCollection;
            var XianlvDoufaRewardItem = /** @class */ (function (_super) {
                __extends(XianlvDoufaRewardItem, _super);
                function XianlvDoufaRewardItem() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._listData = new ArrayCollection();
                    _this._listReward = new ArrayCollection();
                    return _this;
                }
                XianlvDoufaRewardItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("58" /* Xianyuan */, 263 /* XianlvDoufa */);
                    this.list_progress.itemRenderer = mod.ComProgressItem;
                    this.list_progress.dataProvider = this._listData;
                    this.list_reward.itemRenderer = mod.ComProgressRewardItem;
                    this.list_reward.dataProvider = this._listReward;
                    this.img_tips.source = "shengchang";
                };
                XianlvDoufaRewardItem.prototype.updateShow = function () {
                    var _this = this;
                    var val = this._proxy.max_win_count;
                    this.scroller.maxWidth = mod.ITEM_WIDTH * 4;
                    this.lab_count.text = "" + val;
                    var cfgArr = game.getConfigListByName("xianlvdoufa_reward.json" /* XianlvDoufaReward */);
                    var list = [];
                    for (var i = 0; i < cfgArr.length; i++) {
                        var cfg = cfgArr[i];
                        var cfgBefore = cfgArr[i - 1];
                        var start = cfgBefore && cfgBefore.win_time || 0;
                        var target = cfg.win_time;
                        list.push({ val: val, start: start, target: target });
                    }
                    this._listData.replaceAll(list);
                    var rewards = [];
                    for (var _i = 0, cfgArr_2 = cfgArr; _i < cfgArr_2.length; _i++) {
                        var cfg = cfgArr_2[_i];
                        var state = this._proxy.getRewardState(cfg);
                        var content = game.StringUtil.substitute(game.getLanById("xianlvdoufa_tips5" /* xianlvdoufa_tips5 */), [cfg.win_time]) + game.TextUtil.addEnoughColor(val, cfg.win_time);
                        rewards.push({
                            state: state,
                            content: content,
                            count: cfg.win_time,
                            rewards: cfg.reward,
                            handler: base.Handler.alloc(this, function () {
                                _this._proxy.c2s_xianlv_pvp_oper(4);
                            })
                        });
                    }
                    this._listReward.replaceAll(rewards);
                };
                return XianlvDoufaRewardItem;
            }(mod.BaseRenderer));
            xianyuan.XianlvDoufaRewardItem = XianlvDoufaRewardItem;
            __reflect(XianlvDoufaRewardItem.prototype, "game.mod.xianyuan.XianlvDoufaRewardItem");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvDoufaSceneView = /** @class */ (function (_super) {
                __extends(XianlvDoufaSceneView, _super);
                function XianlvDoufaSceneView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvDoufaSceneSkin";
                    return _this;
                }
                return XianlvDoufaSceneView;
            }(eui.Component));
            xianyuan.XianlvDoufaSceneView = XianlvDoufaSceneView;
            __reflect(XianlvDoufaSceneView.prototype, "game.mod.xianyuan.XianlvDoufaSceneView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvDoufaTipsView = /** @class */ (function (_super) {
                __extends(XianlvDoufaTipsView, _super);
                function XianlvDoufaTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvDoufaTipsSkin";
                    return _this;
                }
                return XianlvDoufaTipsView;
            }(eui.Component));
            xianyuan.XianlvDoufaTipsView = XianlvDoufaTipsView;
            __reflect(XianlvDoufaTipsView.prototype, "game.mod.xianyuan.XianlvDoufaTipsView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvDoufaView = /** @class */ (function (_super) {
                __extends(XianlvDoufaView, _super);
                function XianlvDoufaView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvDoufaSkin";
                    return _this;
                }
                return XianlvDoufaView;
            }(eui.Component));
            xianyuan.XianlvDoufaView = XianlvDoufaView;
            __reflect(XianlvDoufaView.prototype, "game.mod.xianyuan.XianlvDoufaView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvDoufaWinView = /** @class */ (function (_super) {
                __extends(XianlvDoufaWinView, _super);
                function XianlvDoufaWinView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.XianlvDoufaWinSkin";
                    return _this;
                }
                return XianlvDoufaWinView;
            }(eui.Component));
            xianyuan.XianlvDoufaWinView = XianlvDoufaWinView;
            __reflect(XianlvDoufaWinView.prototype, "game.mod.xianyuan.XianlvDoufaWinView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var facade = base.facade;
            var ShilianItem = /** @class */ (function (_super) {
                __extends(ShilianItem, _super);
                function ShilianItem() {
                    var _this = _super.call(this) || this;
                    _this._isReward = false;
                    _this.skinName = "skins.xianyuan.ShilianItemSkin";
                    return _this;
                }
                ShilianItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("58" /* Xianyuan */, 230 /* XianlvShilian */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_challenge, this.onClickChallenge, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_saodang, this.onClickSaodang, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_reward, this.onClickReward, this);
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
                };
                ShilianItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this._isReward = false;
                };
                ShilianItem.prototype.dataChanged = function () {
                    var cfg = this.data;
                    if (!cfg) {
                        return;
                    }
                    var monsterId = cfg.bossId[0][0];
                    var monsterCfg = game.getConfigByNameId("monster1.json" /* Monster */, monsterId);
                    if (!monsterCfg) {
                        return;
                    }
                    this.img_icon.source = monsterCfg.res_id;
                    this.lb_bossname.text = monsterCfg.name;
                    this.img_type.source = "boss_buff_" + cfg.type;
                    this.img_typebg.source = game.ResUtil.getUiPng("xianlv_shilian_type" + cfg.type);
                    var info = this._proxy.getInfo(cfg.type);
                    var showHint;
                    if (info && info.status == 1) {
                        this._isReward = true;
                        this.rewardView();
                        showHint = true;
                    }
                    else {
                        this._isReward = false;
                        if (info && info.max_damage_record) {
                            this.sweepView();
                        }
                        else {
                            this.challengeView();
                        }
                        showHint = this._proxy.canChallenge(cfg.type);
                    }
                    this.btn_challenge.redPoint.visible = showHint;
                    var layer = info && info.layer || 1;
                    var chineseNum = game.StringUtil.getCNBynumber(layer);
                    this.lb_lvname.text = game.StringUtil.substitute(game.getLanById("xianlv_tips30" /* xianlv_tips30 */), [cfg.name, chineseNum]);
                    this.bar.show(info && info.left_hp || 100, 100, false, 0, false, 0 /* Percent */);
                    var layerCfg = this._proxy.getSceneConfig(cfg.type, layer);
                    this._listData.replaceAll(layerCfg.big_reward);
                };
                ShilianItem.prototype.onClickChallenge = function () {
                    var type = this.data.type;
                    if (this._isReward) {
                        this._proxy.c2s_shilian_get_reward(type);
                        return;
                    }
                    if (this._proxy.canChallenge(type, true)) {
                        this._proxy.c2s_challenge_shilian(type);
                    }
                };
                ShilianItem.prototype.onClickSaodang = function () {
                    facade.showView("58" /* Xianyuan */, "16" /* ShilianSaodang */, this.data);
                };
                ShilianItem.prototype.onClickReward = function () {
                    var cfg = this._proxy.getSceneConfig(this.data.type);
                    mod.ViewMgr.getIns().showBoxReward('', cfg.big_reward);
                };
                //奖励界面
                ShilianItem.prototype.rewardView = function () {
                    this.scroller.visible = true;
                    this.btn_saodang.visible = false;
                    this.gr_challenge.visible = false;
                    this.btn_challenge.label = '领取';
                    this.btn_challenge.y = 82;
                };
                //挑战界面
                ShilianItem.prototype.challengeView = function () {
                    this.scroller.visible = false;
                    this.btn_saodang.visible = false;
                    this.gr_challenge.visible = true;
                    this.btn_challenge.label = '挑战';
                    this.btn_challenge.y = 82;
                };
                //扫荡界面
                ShilianItem.prototype.sweepView = function () {
                    this.scroller.visible = false;
                    this.gr_challenge.visible = true;
                    this.btn_challenge.label = '挑战';
                    this.btn_challenge.y = 111;
                    this.btn_saodang.visible = true;
                    this.btn_saodang.y = 45;
                };
                return ShilianItem;
            }(mod.BaseListenerRenderer));
            xianyuan.ShilianItem = ShilianItem;
            __reflect(ShilianItem.prototype, "game.mod.xianyuan.ShilianItem");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ShilianRankItem = /** @class */ (function (_super) {
                __extends(ShilianRankItem, _super);
                function ShilianRankItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.common.RankItemSkin";
                    return _this;
                }
                ShilianRankItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("58" /* Xianyuan */, 230 /* XianlvShilian */);
                    this.lab_num.visible = false;
                    this.list_reward.visible = true;
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
                };
                ShilianRankItem.prototype.dataChanged = function () {
                    var data = this.data;
                    var rank_no = this.itemIndex + 1; //名次
                    this.currentState = rank_no == 1 ? 'first' : 'default';
                    var name = game.getLanById("tishi_2" /* tishi_2 */);
                    if (data && data.role_name) {
                        name = data.role_name + (data.role_name_2 ? '\n' + data.role_name_2 : '');
                    }
                    this.lab_name.text = name;
                    var score = data && data.score ? game.StringUtil.getHurtNumStr(data.score) : 0;
                    this.lab_power.text = score + '';
                    if (rank_no <= 3) {
                        this.img_rank.visible = true;
                        this.img_rank.source = "rank" + rank_no;
                        this.lab_rank.text = '';
                    }
                    else {
                        this.img_rank.visible = false;
                        var lastRankNo = this._proxy.getRankShow();
                        if (rank_no == lastRankNo + 1) {
                            this.lab_rank.text = lastRankNo + '+';
                            this.lab_name.text = '';
                            this.lab_power.text = '';
                        }
                        else {
                            this.lab_rank.text = rank_no + '';
                        }
                    }
                    var rewards = this._proxy.getRankReward(rank_no);
                    this._listData.source = rewards;
                };
                return ShilianRankItem;
            }(mod.BaseListenerRenderer));
            xianyuan.ShilianRankItem = ShilianRankItem;
            __reflect(ShilianRankItem.prototype, "game.mod.xianyuan.ShilianRankItem");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ShilianRankRewardItem = /** @class */ (function (_super) {
                __extends(ShilianRankRewardItem, _super);
                function ShilianRankRewardItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ShilianRankRewardItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._shilianProxy = game.getProxy("58" /* Xianyuan */, 230 /* XianlvShilian */);
                };
                ShilianRankRewardItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var cfgScore = data.cfg.score;
                    var str = game.TextUtil.addColor(data.score + "/" + cfgScore, data.score >= cfgScore ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this.lb_desc.textFlow = game.TextUtil.parseHtml("\u8BD5\u70BC\u79EF\u5206\u8FBE\u5230" + cfgScore + "\uFF0C\u53EF\u9886\u53D6" + str);
                    this._listData.source = data.cfg.reward;
                    this.btn_buy.visible = data.status == 1 /* Finish */;
                    this.img_bought.visible = !this.btn_buy.visible;
                    if (this.btn_buy.visible) {
                        this.btn_buy.label = game.getLanById("tishi_29" /* tishi_29 */);
                        this.btn_buy.setHint(true);
                    }
                    if (data.status == 0 /* NotFinish */) {
                        this.img_bought.source = 'hongseweiwancheng';
                    }
                    else if (data.status == 2 /* Draw */) {
                        this.img_bought.source = 'lvseyilingqu';
                    }
                };
                ShilianRankRewardItem.prototype.onClick = function () {
                    if (this.btn_buy.visible) {
                        this._shilianProxy.c2s_shilian_jifen_oper(this.data.cfg.index);
                    }
                };
                return ShilianRankRewardItem;
            }(mod.BaseGiftItemRender));
            xianyuan.ShilianRankRewardItem = ShilianRankRewardItem;
            __reflect(ShilianRankRewardItem.prototype, "game.mod.xianyuan.ShilianRankRewardItem");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ShilianRankRewardView = /** @class */ (function (_super) {
                __extends(ShilianRankRewardView, _super);
                function ShilianRankRewardView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.ShilianRankRewardSkin";
                    return _this;
                }
                return ShilianRankRewardView;
            }(eui.Component));
            xianyuan.ShilianRankRewardView = ShilianRankRewardView;
            __reflect(ShilianRankRewardView.prototype, "game.mod.xianyuan.ShilianRankRewardView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ShilianResultView = /** @class */ (function (_super) {
                __extends(ShilianResultView, _super);
                function ShilianResultView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.ShilianResultSkin";
                    return _this;
                }
                return ShilianResultView;
            }(eui.Component));
            xianyuan.ShilianResultView = ShilianResultView;
            __reflect(ShilianResultView.prototype, "game.mod.xianyuan.ShilianResultView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ShilianSaodangView = /** @class */ (function (_super) {
                __extends(ShilianSaodangView, _super);
                function ShilianSaodangView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.ShilianSaodangSkin";
                    return _this;
                }
                return ShilianSaodangView;
            }(eui.Component));
            xianyuan.ShilianSaodangView = ShilianSaodangView;
            __reflect(ShilianSaodangView.prototype, "game.mod.xianyuan.ShilianSaodangView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ShilianSceneView = /** @class */ (function (_super) {
                __extends(ShilianSceneView, _super);
                function ShilianSceneView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.ShilianSceneSkin";
                    return _this;
                }
                return ShilianSceneView;
            }(eui.Component));
            xianyuan.ShilianSceneView = ShilianSceneView;
            __reflect(ShilianSceneView.prototype, "game.mod.xianyuan.ShilianSceneView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ShilianView = /** @class */ (function (_super) {
                __extends(ShilianView, _super);
                function ShilianView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.ShilianSkin";
                    return _this;
                }
                return ShilianView;
            }(eui.Component));
            xianyuan.ShilianView = ShilianView;
            __reflect(ShilianView.prototype, "game.mod.xianyuan.ShilianView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var TaskItem = /** @class */ (function (_super) {
                __extends(TaskItem, _super);
                function TaskItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                TaskItem.prototype.dataChanged = function () {
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
                    this._listData.source = taskCfg.rewards.concat();
                    var schedule = data.schedule;
                    var target = data.target;
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(taskCfg.desc + game.TextUtil.addColor("(" + schedule + "/" + target + ")", schedule >= target ? 2330156 /* GREEN */ : 16719376 /* RED */));
                    var status = data.status;
                    if (status == 2 /* Draw */) {
                        this.btn_buy.visible = false;
                        this.img_bought.visible = true;
                        return;
                    }
                    this.btn_buy.visible = true;
                    this.img_bought.visible = false;
                    this.btn_buy.label = status == 0 /* NotFinish */ ? game.getLanById("goto" /* goto */) : game.getLanById("tishi_29" /* tishi_29 */);
                    if (status == 0 /* NotFinish */) {
                        this.btn_buy.setBlue();
                    }
                    else {
                        this.btn_buy.setYellow();
                    }
                    this.btn_buy.setHint(status == 1 /* Finish */);
                };
                TaskItem.prototype.onClick = function () {
                    if (this.data && this.data.status == 1 /* Finish */) {
                        mod.TaskUtil.clickTask(this.data);
                        return;
                    }
                    if (this._jump) {
                        mod.ViewMgr.getIns().showViewByID(this._jump);
                    }
                };
                return TaskItem;
            }(mod.BaseGiftItemRender));
            xianyuan.TaskItem = TaskItem;
            __reflect(TaskItem.prototype, "game.mod.xianyuan.TaskItem");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var facade = base.facade;
            var TaskPropItem = /** @class */ (function (_super) {
                __extends(TaskPropItem, _super);
                function TaskPropItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.TaskPropItemSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                TaskPropItem.prototype.onAddToStage = function () {
                    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    facade.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                    this.updateCost(1450000029 /* Ssscoin */);
                };
                TaskPropItem.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    facade.offNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                };
                TaskPropItem.prototype.updateCost = function (index) {
                    var cnt = mod.BagUtil.getPropCntByIdx(index);
                    this.lb_cost.text = cnt + '';
                    var cfg = game.GameConfig.getPropConfigById(index);
                    this.img_cost.source = cfg.icon;
                };
                TaskPropItem.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("ssscoin" /* Ssscoin */) > -1) {
                        this.updateCost(1450000029 /* Ssscoin */);
                    }
                };
                TaskPropItem.prototype.onClick = function () {
                    mod.ViewMgr.getIns().openExchangeShopView("0" + 10 /* Type5 */);
                };
                return TaskPropItem;
            }(eui.Component));
            xianyuan.TaskPropItem = TaskPropItem;
            __reflect(TaskPropItem.prototype, "game.mod.xianyuan.TaskPropItem");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var TaskView = /** @class */ (function (_super) {
                __extends(TaskView, _super);
                function TaskView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.xianyuan.TaskSkin";
                    return _this;
                }
                return TaskView;
            }(eui.Component));
            xianyuan.TaskView = TaskView;
            __reflect(TaskView.prototype, "game.mod.xianyuan.TaskView");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvAttrMdr = /** @class */ (function (_super) {
                __extends(XianlvAttrMdr, _super);
                function XianlvAttrMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.XianlvAttrView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XianlvAttrMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(226 /* Xianlv */);
                    this._childProxy = this.retProxy(227 /* Child */);
                    this._view.list.itemRenderer = xianyuan.XianlvAttrItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                XianlvAttrMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                };
                XianlvAttrMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                XianlvAttrMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XianlvAttrMdr.prototype.updateView = function () {
                    var isMarried = this._proxy.isMarried();
                    var list = [];
                    list.push({
                        title: 1,
                        attrStr: game.StringUtil.substitute(game.getLanById("xianlv_tips20" /* xianlv_tips20 */), [game.TextUtil.addColor(this._childProxy.getSharePower() + '', 2330156 /* GREEN */)])
                    });
                    if (isMarried) {
                        list.push({
                            title: 2,
                            attrStr: game.StringUtil.substitute(game.getLanById("xianlv_tips20" /* xianlv_tips20 */), [game.TextUtil.addColor('0', 2330156 /* GREEN */)]) //todo
                        });
                    }
                    this._listData.replaceAll(list);
                };
                return XianlvAttrMdr;
            }(game.MdrBase));
            xianyuan.XianlvAttrMdr = XianlvAttrMdr;
            __reflect(XianlvAttrMdr.prototype, "game.mod.xianyuan.XianlvAttrMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var Handler = base.Handler;
            var XianlvBreakupMdr = /** @class */ (function (_super) {
                __extends(XianlvBreakupMdr, _super);
                function XianlvBreakupMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.XianlvBreakupView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XianlvBreakupMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(226 /* Xianlv */);
                };
                XianlvBreakupMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                };
                XianlvBreakupMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                };
                XianlvBreakupMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XianlvBreakupMdr.prototype.onClick = function () {
                    var banlvInfo = this._proxy.getBanlvInfo();
                    var name = banlvInfo ? banlvInfo.name : '';
                    var txt = game.StringUtil.substitute(game.getLanById("xianlv_tips6" /* xianlv_tips6 */), [name]);
                    mod.ViewMgr.getIns().showConfirm(txt, Handler.alloc(this, this.confirm));
                };
                XianlvBreakupMdr.prototype.confirm = function () {
                    this._proxy.c2s_xianlv_lihun();
                    this.hide();
                };
                return XianlvBreakupMdr;
            }(game.MdrBase));
            xianyuan.XianlvBreakupMdr = XianlvBreakupMdr;
            __reflect(XianlvBreakupMdr.prototype, "game.mod.xianyuan.XianlvBreakupMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvInviteAddMdr = /** @class */ (function (_super) {
                __extends(XianlvInviteAddMdr, _super);
                function XianlvInviteAddMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.XianlvInviteAddView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XianlvInviteAddMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(226 /* Xianlv */);
                    this._friendProxy = game.getProxy("59" /* Friend */, 231 /* Friend */);
                    this._view.list.itemRenderer = xianyuan.XianlvInviteAddItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.lb_desc.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(game.getLanById("xianlv_tips33" /* xianlv_tips33 */), 2330156 /* GREEN */));
                };
                XianlvInviteAddMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    addEventListener(this._view.lb_desc, egret.TouchEvent.TOUCH_TAP, this.onClickGo, this);
                    this.onNt("on_friend_update" /* ON_FRIEND_UPDATE */, this.onUpdateFriendInfo, this);
                    this.onNt("on_view_hide" /* ON_VIEW_HIDE */, this.hide, this);
                    this.onNt("on_update_banlv_info" /* ON_UPDATE_BANLV_INFO */, this.onUpdateBanlvInfo, this);
                };
                XianlvInviteAddMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._friendProxy.c2s_friend_list(1 /* Friend */);
                };
                XianlvInviteAddMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XianlvInviteAddMdr.prototype.onUpdateFriendInfo = function () {
                    var list = this._friendProxy.friendList;
                    this._view.currentState = list && list.length ? 'friend' : 'notfriend';
                    if (list && list.length) {
                        this._listData.replaceAll(list);
                    }
                };
                XianlvInviteAddMdr.prototype.onUpdateBanlvInfo = function () {
                    if (this._proxy.getBanlvInfo()) {
                        this.hide();
                    }
                };
                XianlvInviteAddMdr.prototype.onClickGo = function () {
                    mod.ViewMgr.getIns().showView("59" /* Friend */, "01" /* FriendMain */, "01" /* Friend */);
                    this.hide();
                };
                return XianlvInviteAddMdr;
            }(game.MdrBase));
            xianyuan.XianlvInviteAddMdr = XianlvInviteAddMdr;
            __reflect(XianlvInviteAddMdr.prototype, "game.mod.xianyuan.XianlvInviteAddMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvInviteRecordMdr = /** @class */ (function (_super) {
                __extends(XianlvInviteRecordMdr, _super);
                function XianlvInviteRecordMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.XianlvInviteRecordView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XianlvInviteRecordMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(226 /* Xianlv */);
                    this._view.list.itemRenderer = xianyuan.XianlvInviteRecordItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                XianlvInviteRecordMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    this.onNt("on_update_invite_records" /* ON_UPDATE_INVITE_RECORDS */, this.updateView, this);
                };
                XianlvInviteRecordMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.c2s_xianlv_seeking_info();
                };
                XianlvInviteRecordMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XianlvInviteRecordMdr.prototype.updateView = function () {
                    var records = this._proxy.getInviteRecords();
                    if (records && records.length) {
                        this._view.currentState = 'record';
                        this._listData.replaceAll(records);
                    }
                    else {
                        this._view.currentState = 'notrecord';
                    }
                };
                return XianlvInviteRecordMdr;
            }(game.MdrBase));
            xianyuan.XianlvInviteRecordMdr = XianlvInviteRecordMdr;
            __reflect(XianlvInviteRecordMdr.prototype, "game.mod.xianyuan.XianlvInviteRecordMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvMdr = /** @class */ (function (_super) {
                __extends(XianlvMdr, _super);
                function XianlvMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianyuan.XianlvView);
                    return _this;
                }
                XianlvMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(226 /* Xianlv */);
                    this._childProxy = this.retProxy(227 /* Child */);
                    this._view.list_child.itemRenderer = xianyuan.XianlvChildIcon;
                    this._view.list_child.dataProvider = this._listChild = new eui.ArrayCollection();
                    this._view.list_tap.itemRenderer = mod.TabSecondItem;
                    this._view.list_tap.dataProvider = this._listBtn = new eui.ArrayCollection();
                };
                XianlvMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.power.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickDo, this);
                    addEventListener(this._view.btn_zhaohuan, egret.TouchEvent.TOUCH_TAP, this.onClickZhaohuan, this);
                    addEventListener(this._view.list_tap, eui.ItemTapEvent.ITEM_TAP, this.onClickListTap, this);
                    this.onNt("on_update_banlv_info" /* ON_UPDATE_BANLV_INFO */, this.updateView, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onUpdateHint, this);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateByPropIndex, this);
                };
                XianlvMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                    this.updateListTap();
                };
                XianlvMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XianlvMdr.prototype.updateView = function () {
                    this._view.power.setPowerValue(this._proxy.getPower());
                    var isMarried = this._proxy.isMarried();
                    this._view.btn_do.icon = isMarried ? 'yijue' : 'tubiao_jiqingjilu';
                    this._view.gr_day.visible = this._proxy.isMarried();
                    this._view.lb_day.text = game.StringUtil.substitute(game.getLanById("xianlv_tips11" /* xianlv_tips11 */), [this._proxy.getTogetherDay()]);
                    this._view.roleComp0.updateViewForMyself();
                    var banlvInfo = this._proxy.getBanlvInfo();
                    this._view.roleComp1.updateView(banlvInfo, false);
                    this.updateListChild();
                    this.updateZhaohuanBtn();
                };
                XianlvMdr.prototype.updateListChild = function () {
                    var vipAry = this._childProxy.getVipList();
                    var list = [];
                    var vipLv = mod.VipUtil.getShowVipLv();
                    var childList = this._childProxy.getBattleChildList();
                    for (var i = 0; i < vipAry.length; i++) {
                        var vip = vipAry[i];
                        var childIndex = childList[i] || 0;
                        list.push({
                            vip: vip,
                            childIndex: childIndex,
                            isActed: vipLv >= vip
                        });
                    }
                    this._listChild.replaceAll(list);
                };
                XianlvMdr.prototype.updateZhaohuanBtn = function () {
                    var costList = this._proxy.getZhaohuanCosts();
                    var cost;
                    for (var i = costList.length - 1; i >= 0; i--) {
                        var item = costList[i];
                        var bagCnt = mod.BagUtil.getPropCntByIdx(item[0]);
                        if (bagCnt > 0) {
                            cost = [bagCnt, item[1]];
                            break;
                        }
                    }
                    if (!cost) {
                        var item = costList[1];
                        var bagCnt = mod.BagUtil.getPropCntByIdx(item[0]);
                        cost = [bagCnt, item[1]];
                    }
                    this._view.btn_zhaohuan.updateView(cost[0], cost[1]);
                    this._view.btn_zhaohuan.setHint(this._proxy.canZhaohuan());
                };
                XianlvMdr.prototype.onClickAttr = function () {
                    this.showView("04" /* AttrView */);
                };
                XianlvMdr.prototype.onClickDo = function () {
                    if (this._proxy.isMarried()) {
                        this.showView("08" /* Breakup */);
                    }
                    else {
                        this.showView("05" /* InviteRecord */);
                    }
                };
                XianlvMdr.prototype.onClickZhaohuan = function () {
                    this.showView("07" /* Zhaohuan */);
                };
                //只更子女等按钮红点 todo
                XianlvMdr.prototype.onUpdateHint = function (n) {
                    var data = n.body;
                    var openIdxAry = this._proxy.getBtnOpenIdxAry();
                    for (var i = 0; i < openIdxAry.length; i++) {
                        var btnData = this._listBtn.getItemAt(i);
                        var hintType = this._proxy.getBtnHintPath(openIdxAry[i]);
                        if (btnData && hintType && data.node == mod.HintMgr.getType(hintType)) {
                            btnData.showHint = data.value;
                            this._listBtn.itemUpdated(btnData);
                        }
                    }
                };
                XianlvMdr.prototype.updateListTap = function () {
                    var btnData = [];
                    var openIdxAry = this._proxy.getBtnOpenIdxAry();
                    for (var i = 0; i < openIdxAry.length; i++) {
                        var hintPath = this._proxy.getBtnHintPath(openIdxAry[i]);
                        var param = void 0;
                        if (hintPath) {
                            param = ["58" /* Xianyuan */, hintPath[hintPath.length - 1]];
                        }
                        btnData.push({
                            icon: 'xianlv_second_tab_' + i,
                            showHint: hintPath ? mod.HintMgr.getHint(hintPath) : false,
                            openIdx: openIdxAry[i],
                            param: param
                        });
                    }
                    this._listBtn.replaceAll(btnData);
                };
                XianlvMdr.prototype.updateListBtnHint = function () {
                    var size = this._listBtn.source.length;
                    for (var i = 0; i < size; i++) {
                        var data = this._listBtn.source[i];
                        if (!data) {
                            continue;
                        }
                        data.showHint = false; //todo
                        this._listBtn.itemUpdated(data);
                    }
                };
                //todo
                XianlvMdr.prototype.onClickListTap = function (e) {
                    var data = e.item;
                    if (!data || !data.param) {
                        game.PromptBox.getIns().show("\u5C1A\u672A\u5F00\u542F\uFF0C\u656C\u8BF7\u671F\u5F85\uFF01");
                        return;
                    }
                    if (data.openIdx && !mod.ViewMgr.getIns().checkViewOpen(data.openIdx, true)) {
                        return;
                    }
                    var _a = data.param, m = _a[0], v = _a[1];
                    mod.ViewMgr.getIns().showView(m, v, true);
                };
                XianlvMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("xtlqcoin" /* Xtlqcoin */) > -1) {
                        this.updateZhaohuanBtn();
                    }
                };
                XianlvMdr.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    var costs = this._proxy.getZhaohuanCosts();
                    if (costs[1] && costs[1][0] && indexs.indexOf(costs[1][0]) > -1) {
                        this.updateZhaohuanBtn();
                    }
                };
                return XianlvMdr;
            }(game.MdrBase));
            xianyuan.XianlvMdr = XianlvMdr;
            __reflect(XianlvMdr.prototype, "game.mod.xianyuan.XianlvMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvZhaohuanMdr = /** @class */ (function (_super) {
                __extends(XianlvZhaohuanMdr, _super);
                function XianlvZhaohuanMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.XianlvZhaohuanView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XianlvZhaohuanMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(226 /* Xianlv */);
                    this._view.list.itemRenderer = xianyuan.XianlvZhaohuanItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                XianlvZhaohuanMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateByPropIndex, this);
                };
                XianlvZhaohuanMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                XianlvZhaohuanMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XianlvZhaohuanMdr.prototype.updateView = function () {
                    var list = [];
                    var costs = this._proxy.getZhaohuanCosts();
                    for (var i = 0; i < costs.length; i++) {
                        list.push({
                            cost: costs[i],
                            hint: this._proxy.canZhaohuanByOper(i + 1),
                            oper: i + 1
                        });
                    }
                    this._listData.replaceAll(list);
                };
                XianlvZhaohuanMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("xtlqcoin" /* Xtlqcoin */) > -1) {
                        this.updateView();
                    }
                };
                XianlvZhaohuanMdr.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    var costs = this._proxy.getZhaohuanCosts();
                    for (var _i = 0, costs_1 = costs; _i < costs_1.length; _i++) {
                        var cost = costs_1[_i];
                        if (indexs.indexOf(cost[0]) > -1) {
                            this.updateView();
                            break;
                        }
                    }
                };
                return XianlvZhaohuanMdr;
            }(game.MdrBase));
            xianyuan.XianlvZhaohuanMdr = XianlvZhaohuanMdr;
            __reflect(XianlvZhaohuanMdr.prototype, "game.mod.xianyuan.XianlvZhaohuanMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvDoufaFailMdr = /** @class */ (function (_super) {
                __extends(XianlvDoufaFailMdr, _super);
                function XianlvDoufaFailMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianyuan.XianlvDoufaFailView);
                    _this._type = 2 /* Fail */;
                    return _this;
                }
                return XianlvDoufaFailMdr;
            }(xianyuan.XianlvDoufaWinMdr));
            xianyuan.XianlvDoufaFailMdr = XianlvDoufaFailMdr;
            __reflect(XianlvDoufaFailMdr.prototype, "game.mod.xianyuan.XianlvDoufaFailMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var XianlvDoufaMdr = /** @class */ (function (_super) {
                __extends(XianlvDoufaMdr, _super);
                function XianlvDoufaMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianyuan.XianlvDoufaView);
                    _this._listData = new ArrayCollection();
                    _this.TIME_TICK = 3;
                    return _this;
                }
                XianlvDoufaMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(263 /* XianlvDoufa */);
                    this._view.list.itemRenderer = xianyuan.XianlvDoufaLightItem;
                    this._view.list.dataProvider = this._listData;
                };
                XianlvDoufaMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_fight, egret.TouchEvent.TOUCH_TAP, this.onClickFight);
                    addEventListener(this._view.checkbox, egret.TouchEvent.TOUCH_TAP, this.onClickCheckBox);
                    addEventListener(this._view.btn_rank, egret.TouchEvent.TOUCH_TAP, this.onClickRank);
                    addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule);
                    this.onNt("on_update_xianlv_doufa_info" /* ON_UPDATE_XIANLV_DOUFA_INFO */, this.onUpdateView, this);
                    this.onNt("on_update_xianlv_doufa_auto" /* ON_UPDATE_XIANLV_DOUFA_AUTO */, this.onUpdateSuccess, this);
                };
                XianlvDoufaMdr.prototype.onShow = function () {
                    // this._proxy.c2s_xianlv_pvp_oper(1);
                    _super.prototype.onShow.call(this);
                    this._success = false;
                    this.onUpdateView();
                    this.onUpdateTime();
                    if (this._proxy.count) {
                        this.onUpdateAuto();
                    }
                    if (this._proxy.show_tips) {
                        mod.ViewMgr.getIns().showSecondPop("58" /* Xianyuan */, "21" /* XianlvDoufaTips */);
                    }
                };
                XianlvDoufaMdr.prototype.onUpdateTime = function () {
                    this._endTime = game.TimeUtil.getNextWeekTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                };
                XianlvDoufaMdr.prototype.onUpdateSuccess = function (n) {
                    this._success = n.body;
                    if (!this._success) {
                        this.onUpdateAuto();
                    }
                };
                XianlvDoufaMdr.prototype.onUpdateView = function () {
                    if (this._proxy.count) {
                        this._view.currentState = "2";
                        var xianlvdoufa_xiandeng = this._proxy.xianlvdoufa_xiandeng;
                        var list = [];
                        for (var i = 0; i < xianlvdoufa_xiandeng; i++) {
                            list.push(i < this._proxy.count);
                        }
                        this._listData.replaceAll(list);
                        this._view.btn_fight.setHint(this._proxy.count > 0);
                    }
                    else {
                        this._view.currentState = "1";
                        this._proxy.auto = false;
                        var xianlvdoufa_cost = this._proxy.xianlvdoufa_cost;
                        this._view.coinItem.setData(xianlvdoufa_cost[0]);
                        this._view.btn_fight.setHint(mod.BagUtil.checkPropCnt(xianlvdoufa_cost[0], xianlvdoufa_cost[1]));
                    }
                    this._view.reward.updateShow();
                };
                XianlvDoufaMdr.prototype.onUpdateAuto = function () {
                    this._view.checkbox.selected = this._proxy.auto;
                    if (this._proxy.auto) {
                        this._time = this.TIME_TICK;
                    }
                    this.onUpdateAutoTime();
                };
                XianlvDoufaMdr.prototype.onUpdateAutoTime = function () {
                    if (this._proxy.auto) {
                        if (this._time <= 0) {
                            this._view.checkbox.labelDisplay.text = game.getLanById("xiuxiannvpu_tips7" /* xiuxiannvpu_tips7 */);
                        }
                        else {
                            this._view.checkbox.labelDisplay.text = this._time + "S\u540E\u81EA\u52A8\u6311\u6218";
                        }
                        // this._view.checkbox.labelDisplay.text = `${this._time}S后自动挑战`;
                    }
                    else {
                        this._view.checkbox.labelDisplay.text = game.getLanById("xiuxiannvpu_tips7" /* xiuxiannvpu_tips7 */);
                    }
                };
                XianlvDoufaMdr.prototype.onClickFight = function () {
                    this._proxy.auto = false;
                    this.onFight();
                };
                XianlvDoufaMdr.prototype.onFight = function () {
                    var _this = this;
                    if (this._proxy.count) {
                        this._proxy.c2s_xianlv_pvp_challenge(1);
                    }
                    else {
                        if (!mod.BagUtil.checkPropCnt(this._proxy.xianlvdoufa_cost[0], this._proxy.xianlvdoufa_cost[1])) {
                            var xianlvdoufa_buycost = this._proxy.xianlvdoufa_buycost;
                            var prop = game.PropData.create(xianlvdoufa_buycost[0], xianlvdoufa_buycost[1]);
                            var cost = "" + prop.count + prop.cfg.name;
                            var count = this._proxy.buy_count + "/" + this._proxy.xianlvdoufa_buy;
                            var content = game.StringUtil.substitute(game.getLanById("xianlvdoufa_tips2" /* xianlvdoufa_tips2 */), [cost, count]);
                            mod.ViewMgr.getIns().showConfirm(content, base.Handler.alloc(this, function () {
                                _this._proxy.c2s_xianlv_pvp_oper(5);
                            }));
                            return;
                        }
                        mod.ViewMgr.getIns().showConfirm(game.getLanById("xianlvdoufa_tips1" /* xianlvdoufa_tips1 */), base.Handler.alloc(this, function () {
                            _this._proxy.c2s_xianlv_pvp_oper(3);
                        }));
                    }
                };
                XianlvDoufaMdr.prototype.onClickCheckBox = function () {
                    this._proxy.auto = !this._proxy.auto;
                    this.onUpdateAuto();
                };
                XianlvDoufaMdr.prototype.onClickRank = function () {
                    mod.ViewMgr.getIns().showView("58" /* Xianyuan */, "25" /* XianlvDoufaRank */);
                };
                XianlvDoufaMdr.prototype.onClickRule = function () {
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("xianlvdoufa_tips3" /* xianlvdoufa_tips3 */));
                };
                XianlvDoufaMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                    this._success = false;
                };
                XianlvDoufaMdr.prototype.update = function (time) {
                    var leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this._endTime = game.TimeUtil.getNextWeekTime();
                    }
                    this._view.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                    if (this._proxy.auto) {
                        this._time--;
                        this.onUpdateAutoTime();
                        if (this._time <= 0 && !this._success) {
                            this.onFight();
                        }
                    }
                };
                return XianlvDoufaMdr;
            }(game.MdrBase));
            xianyuan.XianlvDoufaMdr = XianlvDoufaMdr;
            __reflect(XianlvDoufaMdr.prototype, "game.mod.xianyuan.XianlvDoufaMdr", ["base.UpdateItem"]);
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvDoufaRankMainMdr = /** @class */ (function (_super) {
                __extends(XianlvDoufaRankMainMdr, _super);
                function XianlvDoufaRankMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "personal_rank_",
                            mdr: xianyuan.XianlvDoufaRankMdr,
                            bg: 'pass_rank_bg',
                            title: "pass_rank" /* pass_rank */,
                            hintTypes: []
                        }
                    ];
                    return _this;
                }
                return XianlvDoufaRankMainMdr;
            }(mod.WndBaseMdr));
            xianyuan.XianlvDoufaRankMainMdr = XianlvDoufaRankMainMdr;
            __reflect(XianlvDoufaRankMainMdr.prototype, "game.mod.xianyuan.XianlvDoufaRankMainMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var XianlvDoufaRankMdr = /** @class */ (function (_super) {
                __extends(XianlvDoufaRankMdr, _super);
                function XianlvDoufaRankMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    return _this;
                }
                XianlvDoufaRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(263 /* XianlvDoufa */);
                    this._view.grp_eff.x = 200;
                    this._view.grp_eff.touchEnabled = false;
                    this._view.grp_eff0.x = 520;
                    this._view.grp_eff0.visible = true;
                    this._view.grp_eff0.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_rank.itemRenderer = mod.RankRewardRender;
                    this._view.list_rank.dataProvider = this._itemList;
                    this._view.btn_god.visible = false;
                    this._view.timeItem.visible = true;
                    this._view.img_type2.source = "jingjijifen";
                    this._view.img_type3.source = "paimingjiangli";
                };
                XianlvDoufaRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_update_xianlv_doufa_rank" /* ON_UPDATE_XIANLV_DOUFA_RANK */, this.onUpdateView, this);
                };
                XianlvDoufaRankMdr.prototype.onShow = function () {
                    this._proxy.c2s_xianlv_pvp_oper(2);
                    _super.prototype.onShow.call(this);
                    this.onUpdateTime();
                };
                XianlvDoufaRankMdr.prototype.onUpdateTime = function () {
                    this._endTime = game.TimeUtil.getNextWeekTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                };
                XianlvDoufaRankMdr.prototype.onUpdateView = function () {
                    // let list = this._proxy.ranks;
                    // let topInfo = list && list[0];
                    // if (topInfo && topInfo.value) {
                    //     this.updateRankUIRole(this._view.grp_eff, topInfo);
                    // }
                    var first = this._proxy.first_info;
                    if (first && first[0]) {
                        this.updateRankUIRole(this._view.grp_eff, first[0]);
                    }
                    if (first && first[1]) {
                        this.updateRankUIRole(this._view.grp_eff0, first[1], 1, true);
                    }
                    var infos = this._proxy.getRankList();
                    this._itemList.replaceAll(infos);
                    this._view.lab_rank.textFlow = game.TextUtil.parseHtml(this._proxy.getRankStr());
                    this._view.lab_num.textFlow = game.TextUtil.parseHtml(this._proxy.getRankCountStr());
                };
                XianlvDoufaRankMdr.prototype.update = function (time) {
                    this.updateTime();
                };
                XianlvDoufaRankMdr.prototype.updateTime = function () {
                    var leftTime = this._endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        TimeMgr.removeUpdateItem(this);
                    }
                    this._view.timeItem.updateLeftTime(leftTime, "", game.getLanById("battle_cue29" /* battle_cue29 */));
                };
                XianlvDoufaRankMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                return XianlvDoufaRankMdr;
            }(game.EffectMdrBase));
            xianyuan.XianlvDoufaRankMdr = XianlvDoufaRankMdr;
            __reflect(XianlvDoufaRankMdr.prototype, "game.mod.xianyuan.XianlvDoufaRankMdr", ["base.UpdateItem"]);
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var TimeMgr = base.TimeMgr;
            var XianlvDoufaSceneMdr = /** @class */ (function (_super) {
                __extends(XianlvDoufaSceneMdr, _super);
                function XianlvDoufaSceneMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", xianyuan.XianlvDoufaSceneView);
                    return _this;
                }
                XianlvDoufaSceneMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(263 /* XianlvDoufa */);
                };
                XianlvDoufaSceneMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_scene_damage_update" /* ON_SCENE_DAMAGE_UPDATE */, this.onUpdateHurt, this);
                };
                XianlvDoufaSceneMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._endTIme = TimeMgr.time.serverTimeSecond + this._proxy.xianlvdoufa_time;
                    this.onUpdateView();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                XianlvDoufaSceneMdr.prototype.onUpdateView = function () {
                    this._view.head1.updateMyHead();
                    this._xianlv = mod.RoleUtil.getBanlvInfo();
                    this._view.head2.updateShow(this._xianlv);
                    this._enemy1 = this._proxy.player_info[0];
                    this._view.head3.updateShow(this._enemy1);
                    this._enemy2 = this._proxy.player_info[1];
                    this._view.head4.updateShow(this._enemy2);
                    this._view.lab_hurt1.text = game.StringUtil.getHurtNumStr(0);
                    this._view.lab_hurt2.text = game.StringUtil.getHurtNumStr(0);
                };
                XianlvDoufaSceneMdr.prototype.onUpdateHurt = function (n) {
                    var msg = n.body;
                    var hurt = 0;
                    var type = 1;
                    var xianlv = mod.RoleUtil.getBanlvInfo();
                    for (var _i = 0, _a = msg.damage_list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.index.eq(game.RoleVo.ins.role_id)) {
                            type = 1;
                        }
                        if (info.index.eq(xianlv.role_id)) {
                            type = 2;
                        }
                        var damage = info.damage && info.damage.toNumber() || 0;
                        hurt += damage;
                    }
                    this._view["lab_hurt" + type].text = game.StringUtil.getHurtNumStr(hurt);
                };
                XianlvDoufaSceneMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                XianlvDoufaSceneMdr.prototype.update = function (time) {
                    this.onUpdateHP();
                    var leftTime = this._endTIme - TimeMgr.time.serverTimeSecond;
                    this._view.lab_time.textFlow = game.TextUtil.parseHtml(game.TimeUtil.formatSecond(leftTime, 'mm:ss', true));
                };
                XianlvDoufaSceneMdr.prototype.onUpdateHP = function () {
                    var vo1 = mod.SceneUtil.getMainPlayerVo();
                    this._view.head1.updateHP(vo1 && vo1.percent || 0);
                    var vo2 = mod.SceneUtil.getVoByRoleId(this._xianlv.role_id);
                    this._view.head2.updateHP(vo2 && vo2.percent || 0);
                    var vo3 = mod.SceneUtil.getVoByRoleId(this._enemy1.role_id);
                    this._view.head3.updateHP(vo3 && vo3.percent || 0);
                    var vo4 = mod.SceneUtil.getVoByRoleId(this._enemy2.role_id);
                    this._view.head4.updateHP(vo4 && vo4.percent || 0);
                };
                return XianlvDoufaSceneMdr;
            }(game.EffectMdrBase));
            xianyuan.XianlvDoufaSceneMdr = XianlvDoufaSceneMdr;
            __reflect(XianlvDoufaSceneMdr.prototype, "game.mod.xianyuan.XianlvDoufaSceneMdr", ["base.UpdateItem"]);
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ArrayCollection = eui.ArrayCollection;
            var XianlvDoufaSectionMdr = /** @class */ (function (_super) {
                __extends(XianlvDoufaSectionMdr, _super);
                function XianlvDoufaSectionMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.RankSectionView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XianlvDoufaSectionMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(263 /* XianlvDoufa */);
                    this._itemList = new ArrayCollection();
                    this._view.list.itemRenderer = mod.RankSectionItem;
                    this._view.list.dataProvider = this._itemList;
                };
                XianlvDoufaSectionMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._section = this._showArgs.rank;
                    this.onRankUpdate();
                };
                XianlvDoufaSectionMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XianlvDoufaSectionMdr.prototype.onRankUpdate = function () {
                    if (this._section) {
                        this._itemList.source = this._proxy.getRankSection(this._section);
                    }
                    this._view.img_type2.source = "jingjijifen";
                    this._view.lab_rank.textFlow = game.TextUtil.parseHtml(this._proxy.getRankStr());
                    this._view.lab_score.textFlow = game.TextUtil.parseHtml(this._proxy.getRankCountStr());
                };
                return XianlvDoufaSectionMdr;
            }(game.EffectMdrBase));
            xianyuan.XianlvDoufaSectionMdr = XianlvDoufaSectionMdr;
            __reflect(XianlvDoufaSectionMdr.prototype, "game.mod.xianyuan.XianlvDoufaSectionMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var XianlvDoufaTipsMdr = /** @class */ (function (_super) {
                __extends(XianlvDoufaTipsMdr, _super);
                function XianlvDoufaTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.XianlvDoufaTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                XianlvDoufaTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(263 /* XianlvDoufa */);
                };
                XianlvDoufaTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                XianlvDoufaTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.show_tips = false;
                    this.onUpdateView();
                };
                XianlvDoufaTipsMdr.prototype.onUpdateView = function () {
                    this.addBmpFont("" + this._proxy.total_count, game.BmpTextCfg[209 /* CommonStage */], this._view.grp_font);
                    this._view.lab_score.text = "+" + this._proxy.total_score;
                };
                XianlvDoufaTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return XianlvDoufaTipsMdr;
            }(game.EffectMdrBase));
            xianyuan.XianlvDoufaTipsMdr = XianlvDoufaTipsMdr;
            __reflect(XianlvDoufaTipsMdr.prototype, "game.mod.xianyuan.XianlvDoufaTipsMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ChildModel = /** @class */ (function () {
                function ChildModel() {
                    this.child_infos = {};
                    this.jiban_infos = {};
                    /**神兵，灵翼数据*/
                    this.infos = {};
                    /**上阵子女index*/
                    this.child_list = [];
                    /**激活的技能index*/
                    this.skill_list = [];
                    //页签红点 todo
                    this.hintPath = {
                        1: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "01" /* Gongxiang */],
                        2: {
                            1: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "02" /* Shengxing */, "01" /* TabBtnType01 */],
                            2: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "02" /* Shengxing */, "02" /* TabBtnType02 */],
                            3: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "02" /* Shengxing */, "03" /* TabBtnType03 */],
                            4: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "02" /* Shengxing */, "04" /* TabBtnType04 */]
                        },
                        3: {
                            1: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "03" /* Shenbing */, "01" /* TabBtnType01 */],
                            2: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "03" /* Shenbing */, "02" /* TabBtnType02 */]
                        },
                        4: {
                            1: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "04" /* Lingyi */, "01" /* TabBtnType01 */],
                            2: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "04" /* Lingyi */, "02" /* TabBtnType02 */]
                        }
                    };
                    //羁绊红点
                    this.jibanHintPath = ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "02" /* Shengxing */, 'jiban'];
                }
                return ChildModel;
            }());
            xianyuan.ChildModel = ChildModel;
            __reflect(ChildModel.prototype, "game.mod.xianyuan.ChildModel");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var TimeMgr = base.TimeMgr;
            var ShilianMdr = /** @class */ (function (_super) {
                __extends(ShilianMdr, _super);
                function ShilianMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianyuan.ShilianView);
                    _this._endTime = 0;
                    return _this;
                }
                ShilianMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(230 /* XianlvShilian */);
                    this._view.list.itemRenderer = xianyuan.ShilianItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.scroller["$hasScissor"] = true;
                };
                ShilianMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
                    addEventListener(this._view.btn_rank, egret.TouchEvent.TOUCH_TAP, this.onClickRank, this);
                    addEventListener(this._view.btn_add, egret.TouchEvent.TOUCH_TAP, this.onClickAdd, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateByPropIndex, this);
                    this.onNt("on_update_shilian_info" /* ON_UPDATE_SHILIAN_INFO */, this.updateView, this);
                };
                ShilianMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.c2s_xianlv_shilian_openui();
                    this._endTime = game.TimeUtil.getNextWeekTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                    this.updateBtnRankHint();
                };
                ShilianMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ShilianMdr.prototype.updateView = function () {
                    this.updateProp();
                    var list = game.getConfigListByName("xianlv_shilian_fuben.json" /* XianlvShilianFuben */);
                    this._listData.replaceAll(list);
                };
                ShilianMdr.prototype.updateProp = function () {
                    var cost = this._proxy.getChallengeCost();
                    var idx = cost[0];
                    var cnt = mod.BagUtil.getPropCntByIdx(idx);
                    var cfg = game.GameConfig.getPropConfigById(idx);
                    this._view.img_cost.source = cfg.icon;
                    this._view.lb_cost.text = cnt + '';
                };
                ShilianMdr.prototype.onClickRule = function () {
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("xianlv_tips29" /* xianlv_tips29 */));
                };
                ShilianMdr.prototype.onClickRank = function () {
                    mod.ViewMgr.getIns().showView("58" /* Xianyuan */, "19" /* ShilianRank */, null, true);
                };
                ShilianMdr.prototype.onClickAdd = function () {
                    var cost = this._proxy.getChallengeCost();
                    mod.ViewMgr.getIns().showGainWaysTips(cost[0]);
                };
                ShilianMdr.prototype.update = function (time) {
                    this._view.timeItem.updateTime(this._endTime);
                };
                ShilianMdr.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    var cost = this._proxy.getChallengeCost();
                    if (indexs && indexs.indexOf(cost[0]) > -1) {
                        this.updateView();
                    }
                };
                ShilianMdr.prototype.updateBtnRankHint = function () {
                    this._view.btn_rank.setHint(this._proxy.getRankRewardHint());
                };
                return ShilianMdr;
            }(game.MdrBase));
            xianyuan.ShilianMdr = ShilianMdr;
            __reflect(ShilianMdr.prototype, "game.mod.xianyuan.ShilianMdr", ["base.UpdateItem"]);
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ShilianRankMainMdr = /** @class */ (function (_super) {
                __extends(ShilianRankMainMdr, _super);
                function ShilianRankMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "ui_tab_rank_",
                            mdr: xianyuan.ShilianRankMdr,
                            title: "pass_rank",
                            bg: "pass_rank_bg",
                            openIdx: 0,
                            hintTypes: ["58" /* Xianyuan */, "19" /* ShilianRank */, "01" /* TabBtnType01 */]
                        }
                    ];
                    return _this;
                }
                return ShilianRankMainMdr;
            }(mod.WndBaseMdr));
            xianyuan.ShilianRankMainMdr = ShilianRankMainMdr;
            __reflect(ShilianRankMainMdr.prototype, "game.mod.xianyuan.ShilianRankMainMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var TimeMgr = base.TimeMgr;
            var ShilianRankMdr = /** @class */ (function (_super) {
                __extends(ShilianRankMdr, _super);
                function ShilianRankMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.RankView);
                    _this._endTime = 0;
                    return _this;
                }
                ShilianRankMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.grp_eff.x = 200;
                    this._view.grp_eff.touchEnabled = false;
                    this._view.grp_eff0.x = 520;
                    this._view.grp_eff0.visible = true;
                    this._view.grp_eff0.touchEnabled = false;
                    this._proxy = this.retProxy(230 /* XianlvShilian */);
                    this._view.btn_god.visible = true;
                    this._view.timeItem.visible = true;
                    this._view.img_type2.source = "shilianjifen";
                    this._view.img_type3.source = "paimingjiangli";
                    this._view.list_rank.itemRenderer = xianyuan.ShilianRankItem;
                    this._view.list_rank.dataProvider = this._listData = new eui.ArrayCollection();
                };
                ShilianRankMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_god, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.onNt("on_update_shilian_rank_info" /* ON_UPDATE_SHILIAN_RANK_INFO */, this.updateView, this);
                    this.onNt("ON_UPDATE_SHILIAN_JIFEN_INFO" /* ON_UPDATE_SHILIAN_JIFEN_INFO */, this.updateRankRewardHint, this);
                };
                ShilianRankMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.c2s_shilian_rank_info();
                    this._endTime = game.TimeUtil.getNextWeekTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                };
                ShilianRankMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    TimeMgr.removeUpdateItem(this);
                };
                ShilianRankMdr.prototype.updateView = function () {
                    var model = this._proxy.model;
                    var rankShow = this._proxy.getRankShow();
                    var rank_info = model.rank_info;
                    if (!rank_info || rank_info.length < rankShow) {
                        rank_info.length = rankShow + 1; //加多一条，显示20+
                    }
                    this._listData.source = rank_info;
                    var myRankNo = model.my_rank_no;
                    var rankNo = myRankNo + '';
                    if (!myRankNo || myRankNo > rankShow) {
                        rankNo = rankShow + "+";
                    }
                    this._view.lab_rank.text = '我的排行：' + rankNo;
                    this._view.lab_num.text = game.getLanById("immortal12" /* immortal12 */) + model.my_score;
                    var rank_one_info = model.rank_one_info;
                    if (rank_one_info && rank_one_info[0]) {
                        this.updateRankUIRole(this._view.grp_eff, rank_one_info[0]);
                    }
                    if (rank_one_info && rank_one_info[1]) {
                        this.updateRankUIRole(this._view.grp_eff0, rank_one_info[1], 1.1, true);
                    }
                    this.updateRankRewardHint();
                };
                ShilianRankMdr.prototype.onClick = function () {
                    mod.ViewMgr.getIns().showSecondPop("58" /* Xianyuan */, "20" /* ShilianRankReward */);
                };
                ShilianRankMdr.prototype.update = function (time) {
                    var leftTime = this._endTime - time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this._endTime = game.TimeUtil.getNextWeekTime();
                    }
                    this._view.timeItem.updateTime(this._endTime);
                };
                ShilianRankMdr.prototype.updateRankRewardHint = function () {
                    this._view.btn_god.setHint(this._proxy.getRankRewardHint());
                };
                return ShilianRankMdr;
            }(game.EffectMdrBase));
            xianyuan.ShilianRankMdr = ShilianRankMdr;
            __reflect(ShilianRankMdr.prototype, "game.mod.xianyuan.ShilianRankMdr", ["base.UpdateItem"]);
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ShilianRankRewardMdr = /** @class */ (function (_super) {
                __extends(ShilianRankRewardMdr, _super);
                function ShilianRankRewardMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.ShilianRankRewardView);
                    _this.isEasyHide = true;
                    return _this;
                }
                ShilianRankRewardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(230 /* XianlvShilian */);
                    this._view.list.itemRenderer = xianyuan.ShilianRankRewardItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                ShilianRankRewardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("ON_UPDATE_SHILIAN_JIFEN_INFO" /* ON_UPDATE_SHILIAN_JIFEN_INFO */, this.updateView, this);
                };
                ShilianRankRewardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                ShilianRankRewardMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ShilianRankRewardMdr.prototype.updateView = function () {
                    var cfgList = this._proxy.getJifenCfgList();
                    var myScore = this._proxy.model.my_score;
                    this._view.lb_num.text = myScore + '';
                    var lastCfg = cfgList[cfgList.length - 1];
                    if (lastCfg && lastCfg.reward && lastCfg.reward[0]) {
                        this._view.icon_bigreward.setData(lastCfg.reward[0]);
                    }
                    var list = [];
                    for (var _i = 0, cfgList_14 = cfgList; _i < cfgList_14.length; _i++) {
                        var cfg = cfgList_14[_i];
                        var status = 0 /* NotFinish */;
                        if (this._proxy.isJifenGotten(cfg.index)) {
                            status = 2 /* Draw */;
                        }
                        else if (myScore >= cfg.score) {
                            status = 1 /* Finish */;
                        }
                        list.push({
                            cfg: cfg,
                            status: status,
                            score: myScore
                        });
                    }
                    game.SortTools.sortReward(list);
                    this._listData.replaceAll(list);
                };
                return ShilianRankRewardMdr;
            }(game.MdrBase));
            xianyuan.ShilianRankRewardMdr = ShilianRankRewardMdr;
            __reflect(ShilianRankRewardMdr.prototype, "game.mod.xianyuan.ShilianRankRewardMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var Handler = base.Handler;
            var delayCall = base.delayCall;
            var ShilianResultMdr = /** @class */ (function (_super) {
                __extends(ShilianResultMdr, _super);
                function ShilianResultMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.ShilianResultView);
                    _this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    return _this;
                }
                ShilianResultMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                };
                ShilianResultMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                    this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    this._view.closeTips.visible = false;
                };
                ShilianResultMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    mod.SceneUtil.exitScene();
                };
                ShilianResultMdr.prototype.updateView = function () {
                    var msg = this._showArgs;
                    this._view.lb_damage.text = game.StringUtil.getHurtNumStr(msg.params[0]);
                    this._view.lb_hp.text = msg.params[1] + '%';
                    this._view.resultReward.updateRewardList(msg.reward, Handler.alloc(this, this.onRewardTweenEnd));
                };
                /**********************奖励表现相关**********************/
                //结束动画后执行
                ShilianResultMdr.prototype.onRewardTweenEnd = function () {
                    var _this = this;
                    this._view.closeTips.visible = true;
                    this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
                    delayCall(Handler.alloc(this, function () {
                        _this.isEasyHide = true; //动画表现结束后设置为可点击
                    }), 200);
                };
                return ShilianResultMdr;
            }(game.MdrBase));
            xianyuan.ShilianResultMdr = ShilianResultMdr;
            __reflect(ShilianResultMdr.prototype, "game.mod.xianyuan.ShilianResultMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var ShilianSaodangMdr = /** @class */ (function (_super) {
                __extends(ShilianSaodangMdr, _super);
                function ShilianSaodangMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", xianyuan.ShilianSaodangView);
                    _this._cnt = 0;
                    _this.isEasyHide = true;
                    return _this;
                }
                ShilianSaodangMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(230 /* XianlvShilian */);
                    this._view.list.itemRenderer = mod.Icon;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.secondPop.updateBgSrc(game.ResUtil.getUiJpg('xianlv_beijingtu6'));
                };
                ShilianSaodangMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClickDo, this);
                    addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateSweepView, this);
                    this.onNt("on_btn_buy_cnt_post" /* ON_BTN_BUY_CNT_POST */, this.onUpdateSweepCnt, this);
                    this.onNt("on_update_shilian_info" /* ON_UPDATE_SHILIAN_INFO */, this.onUpdateView, this);
                };
                ShilianSaodangMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.secondPop.updateTitleStr(this._showArgs.name);
                    this.updateView();
                    this.updateSweepView();
                };
                ShilianSaodangMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ShilianSaodangMdr.prototype.onUpdateView = function () {
                    var info = this._proxy.getInfo(this._showArgs.type);
                    if (info && info.status == 1) {
                        this.hide();
                        return;
                    }
                    this._cnt = 0; //重置次数
                    this.updateView();
                    this.updateSweepView();
                };
                ShilianSaodangMdr.prototype.updateView = function () {
                    var monsterId = this._showArgs.bossId[0][0];
                    var monsterCfg = game.getConfigByNameId("monster1.json" /* Monster */, monsterId);
                    if (!monsterCfg) {
                        return;
                    }
                    this._view.img_icon.source = monsterCfg.res_id;
                    var info = this._proxy.getInfo(this._showArgs.type);
                    var layer = info && info.layer || 1;
                    var leftHp = info && info.left_hp || 100;
                    this._view.lb_layer.text = game.StringUtil.substitute(game.getLanById("xianlv_tips30" /* xianlv_tips30 */), [this._showArgs.name, layer]);
                    this._view.bar.show(leftHp, 100, false, 0, false, 0 /* Percent */);
                    var recordStr = game.TextUtil.addColor(game.StringUtil.getHurtNumStr(info && info.max_damage_record || 0), 0xf9de41);
                    var str = game.StringUtil.substitute(game.getLanById("xianlv_tips31" /* xianlv_tips31 */), [recordStr]);
                    this._view.lb_record.textFlow = game.TextUtil.parseHtml(str);
                    var sceneCfg = this._proxy.getSceneConfig(this._showArgs.type);
                    if (!sceneCfg) {
                        return;
                    }
                    this._listData.replaceAll(sceneCfg.big_reward);
                };
                ShilianSaodangMdr.prototype.updateSweepView = function () {
                    var sweepCnt = this.getRealSweepCnt();
                    this._view.btnListView.setMaxCnt(sweepCnt);
                    var cnt = 0;
                    if (sweepCnt) {
                        cnt = 1;
                    }
                    this.updateSweetCost(cnt);
                };
                ShilianSaodangMdr.prototype.updateSweetCost = function (cnt) {
                    if (cnt === void 0) { cnt = 0; }
                    this._cnt = cnt;
                    var cost = this._proxy.getChallengeCost();
                    this._view.btnListView.setCostCnt(cost[0], cnt, null);
                    var leftDamage = this.getMonsterLeftHp();
                    var singleDamage = this.getSingleSweepDamage();
                    var realDamage = Math.min(cnt * singleDamage, leftDamage);
                    var str = game.StringUtil.substitute(game.getLanById("xianlv_tips32" /* xianlv_tips32 */), [game.TextUtil.addColor(realDamage + '', 0x238e2c)]);
                    this._view.lb_hurt.textFlow = game.TextUtil.parseHtml(str);
                };
                ShilianSaodangMdr.prototype.onUpdateSweepCnt = function (n) {
                    var cnt = n.body;
                    this.updateSweetCost(cnt);
                };
                //获取boss血量
                ShilianSaodangMdr.prototype.getMonsterHp = function () {
                    var cfg = this._proxy.getSceneConfig(this._showArgs.type);
                    if (!cfg) {
                        return 0;
                    }
                    var attr = mod.RoleUtil.getAttr(cfg.attr_id);
                    if (attr && attr.max_hp) {
                        return attr.max_hp.toNumber();
                    }
                    return 0;
                };
                //boss剩余血量 todo
                ShilianSaodangMdr.prototype.getMonsterLeftHp = function () {
                    var info = this._proxy.getInfo(this._showArgs.type);
                    var leftHp = info && info.left_hp || 1;
                    var maxHp = this.getMonsterHp();
                    return Math.floor(maxHp * leftHp);
                };
                //扫荡一次的伤害
                ShilianSaodangMdr.prototype.getSingleSweepDamage = function () {
                    var info = this._proxy.getInfo(this._showArgs.type);
                    return info && info.max_damage_record || 1;
                };
                //杀死boss所需扫荡次数，Math.ceil(剩余血量/一次扫荡伤害)
                ShilianSaodangMdr.prototype.getLeftSweepCnt = function () {
                    var hp = this.getMonsterHp();
                    var singleDamage = this.getSingleSweepDamage();
                    return Math.ceil(hp / singleDamage);
                };
                ShilianSaodangMdr.prototype.getRealSweepCnt = function () {
                    var leftCnt = this.getLeftSweepCnt();
                    var cost = this._proxy.getChallengeCost();
                    var bagCnt = mod.BagUtil.getPropCntByIdx(cost[0]);
                    var needCnt = Math.floor(bagCnt / cost[1]);
                    return Math.min(leftCnt, needCnt);
                };
                ShilianSaodangMdr.prototype.onClickDo = function () {
                    if (this._cnt > 0) {
                        this._proxy.c2s_shilian_sweep(this._showArgs.type, this._cnt);
                    }
                    else {
                        var cost = this._proxy.getChallengeCost();
                        mod.BagUtil.checkPropCntUp(cost[0], cost[1]);
                    }
                };
                return ShilianSaodangMdr;
            }(game.MdrBase));
            xianyuan.ShilianSaodangMdr = ShilianSaodangMdr;
            __reflect(ShilianSaodangMdr.prototype, "game.mod.xianyuan.ShilianSaodangMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var TimeMgr = base.TimeMgr;
            var ShilianSceneMdr = /** @class */ (function (_super) {
                __extends(ShilianSceneMdr, _super);
                function ShilianSceneMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", xianyuan.ShilianSceneView);
                    _this._endTime = 0;
                    return _this;
                }
                ShilianSceneMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(230 /* XianlvShilian */);
                };
                ShilianSceneMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_update_shilian_damage" /* ON_UPDATE_SHILIAN_DAMAGE */, this.onUpdateDamage, this);
                };
                ShilianSceneMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._cfg = this._proxy.getSceneConfig(this._proxy.curType);
                    if (!this._cfg) {
                        return;
                    }
                    this._endTime = TimeMgr.time.serverTimeSecond + this._cfg.challenge_time;
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                    this.updateView();
                };
                ShilianSceneMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ShilianSceneMdr.prototype.updateView = function () {
                    this._view.lb_damage0.text = '0';
                };
                ShilianSceneMdr.prototype.onUpdateDamage = function (n) {
                    var num = n.body || 0;
                    this._view.lb_damage0.text = game.StringUtil.getPowerNumStr(num);
                };
                ShilianSceneMdr.prototype.update = function (time) {
                    var leftTime = this._endTime - time.serverTimeSecond;
                    if (leftTime <= 0) {
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    this._view.lb_time.text = game.TimeUtil.formatSecond(leftTime, 'HH:mm:ss');
                };
                return ShilianSceneMdr;
            }(game.MdrBase));
            xianyuan.ShilianSceneMdr = ShilianSceneMdr;
            __reflect(ShilianSceneMdr.prototype, "game.mod.xianyuan.ShilianSceneMdr", ["base.UpdateItem"]);
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var xianyuan;
        (function (xianyuan) {
            var TaskMdr = /** @class */ (function (_super) {
                __extends(TaskMdr, _super);
                function TaskMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", xianyuan.TaskView);
                    return _this;
                }
                TaskMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(226 /* Xianlv */);
                    this._view.list.itemRenderer = xianyuan.TaskItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                TaskMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_task_update" /* ON_TASK_UPDATE */, this.onUpdateTask, this);
                };
                TaskMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                TaskMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                TaskMdr.prototype.updateView = function () {
                    var taskList = mod.TaskUtil.getTaskList(38 /* Xianlv */) || [];
                    this._listData.source = taskList;
                };
                TaskMdr.prototype.onUpdateTask = function (n) {
                    var types = n.body;
                    if (types.indexOf(38 /* Xianlv */) > -1) {
                        this.updateView();
                    }
                };
                return TaskMdr;
            }(game.MdrBase));
            xianyuan.TaskMdr = TaskMdr;
            __reflect(TaskMdr.prototype, "game.mod.xianyuan.TaskMdr");
        })(xianyuan = mod.xianyuan || (mod.xianyuan = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=xianyuan.js.map