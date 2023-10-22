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
        var enhance;
        (function (enhance) {
            var StrengthMasterRender = /** @class */ (function (_super) {
                __extends(StrengthMasterRender, _super);
                function StrengthMasterRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                StrengthMasterRender.prototype.dataChanged = function () {
                    var isMax = !this.data.isCur && (!this.data.attr || !this.data.attr.showpower);
                    this.lab_title.text = this.data.isCur ? game.getLanById("cur_step" /* cur_step */) + "：" : game.getLanById("next_step" /* next_step */) + "：";
                    var hasAttr = this.data.attr && !!this.data.attr.showpower;
                    // this.list_attr.visible = hasAttr;
                    this.lab_limit.bold = isMax;
                    if (isMax) {
                        var fullStr = game.TextUtil.addColor(game.getLanById("max_step" /* max_step */), 16719376 /* RED */);
                        this.lab_limit.textFlow = game.TextUtil.parseHtml(fullStr);
                    }
                    else if (hasAttr) {
                        var isAct = this.data.isCur;
                        var canAct = (this.data.curReachCnt >= this.data.needReachCnt);
                        var str1 = game.TextUtil.addColor(" (" + game.getLanById("actived" /* actived */) + ")", 2330156 /* GREEN */);
                        var str2 = " (" + this.data.curReachCnt + "/" + this.data.needReachCnt + ")";
                        var str3 = game.TextUtil.addColor(str2, canAct ? 2330156 /* GREEN */ : 16719376 /* RED */);
                        this.lab_limit.textFlow = game.TextUtil.parseHtml(this.data.reachTitle + (isAct ? str1 : str3));
                        // this.list_attr.updateAttrAdd(this.data.attr);
                        if (this.data.isCur) {
                            this.lab_attr.textFlow = game.TextUtil.parseHtml(game.TextUtil.getAttrText(this.data.attr, 2330156 /* GREEN */, "\n", " "));
                        }
                        else { // 下一阶始终灰色
                            this.lab_attr.textColor = 8618626 /* GRAY */;
                            this.lab_attr.textFlow = game.TextUtil.parseHtml(game.TextUtil.getAttrText(this.data.attr, 8618626 /* GRAY */, "\n", " "));
                        }
                    }
                    else {
                        this.lab_limit.text = "";
                    }
                };
                return StrengthMasterRender;
            }(mod.BaseRenderer));
            enhance.StrengthMasterRender = StrengthMasterRender;
            __reflect(StrengthMasterRender.prototype, "game.mod.enhance.StrengthMasterRender");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var EnhanceMod = /** @class */ (function (_super) {
                __extends(EnhanceMod, _super);
                function EnhanceMod() {
                    return _super.call(this, "43" /* Enhance */) || this;
                }
                EnhanceMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                EnhanceMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(187 /* Enhance */, enhance.EnhanceProxy);
                };
                EnhanceMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* StrengthMain */, enhance.EnhanceMainMdr);
                    this.regMdr("02" /* StrengthMaster */, enhance.StrengthMasterMdr);
                    this.regMdr("03" /* GemSyn */, enhance.GemSynMdr);
                    this.regMdr("04" /* GemMaster */, enhance.GemMasterMdr);
                    this.regMdr("05" /* GemAttr */, enhance.GemAttrInfoMdr);
                    this.regMdr("07" /* AdvancedMaster */, enhance.AdvancedMasterMdr);
                };
                return EnhanceMod;
            }(game.ModBase));
            enhance.EnhanceMod = EnhanceMod;
            __reflect(EnhanceMod.prototype, "game.mod.enhance.EnhanceMod");
            gso.modCls.push(EnhanceMod);
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var c2s_equip_operate_gem = msg.c2s_equip_operate_gem;
            var s2c_equip_update_gem = msg.s2c_equip_update_gem;
            var s2c_equip_online_gem_request = msg.s2c_equip_online_gem_request;
            var c2s_equip_gem_takeon = msg.c2s_equip_gem_takeon;
            var c2s_equip_gem_takeoff = msg.c2s_equip_gem_takeoff;
            var c2s_equip_gem_combine = msg.c2s_equip_gem_combine;
            var c2s_equip_gem_attrs = msg.c2s_equip_gem_attrs;
            var s2c_equip_gem_attrs = msg.s2c_equip_gem_attrs;
            var c2s_equip_gem_master = msg.c2s_equip_gem_master;
            var s2c_equip_gem_master = msg.s2c_equip_gem_master;
            var s2c_equip_strength_master = msg.s2c_equip_strength_master;
            var s2c_equip_update_strength = msg.s2c_equip_update_strength;
            var c2s_equip_strength = msg.c2s_equip_strength;
            var c2s_equip_strength_master = msg.c2s_equip_strength_master;
            var s2c_equip_online_strength_request = msg.s2c_equip_online_strength_request;
            var s2c_equip_online_advanced_request = msg.s2c_equip_online_advanced_request;
            var c2s_equip_advanced = msg.c2s_equip_advanced;
            var s2c_equip_update_advanced = msg.s2c_equip_update_advanced;
            var c2s_equip_advanced_master = msg.c2s_equip_advanced_master;
            var s2c_equip_advanced_master = msg.s2c_equip_advanced_master;
            var EnhanceProxy = /** @class */ (function (_super) {
                __extends(EnhanceProxy, _super);
                function EnhanceProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._isInset = false; //是否点了一键镶嵌
                    return _this;
                }
                EnhanceProxy.prototype.getModel = function () {
                    return this._model;
                };
                EnhanceProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new enhance.EnhanceModel();
                    this.onProto(s2c_equip_online_strength_request, this.s2c_equip_online_strength_request, this);
                    this.onProto(s2c_equip_update_strength, this.s2c_equip_update_strength, this);
                    this.onProto(s2c_equip_strength_master, this.s2c_equip_strength_master, this);
                    this.onProto(s2c_equip_gem_attrs, this.s2c_equip_gem_attrs, this);
                    this.onProto(s2c_equip_gem_master, this.s2c_equip_gem_master, this);
                    this.onProto(s2c_equip_update_gem, this.s2c_equip_update_gem, this);
                    this.onProto(s2c_equip_online_gem_request, this.s2c_equip_online_gem_request, this);
                    this.onProto(s2c_equip_online_advanced_request, this.s2c_equip_online_advanced_request, this);
                    this.onProto(s2c_equip_update_advanced, this.s2c_equip_update_advanced, this);
                    this.onProto(s2c_equip_advanced_master, this.s2c_equip_advanced_master, this);
                };
                EnhanceProxy.prototype.onBagUpdateByBagType = function (n) {
                    var types = n.body;
                    if (types.indexOf(2 /* Material */) < 0) {
                        return;
                    }
                    this.updateHint();
                };
                /**更新强化和大师*/
                EnhanceProxy.prototype.s2c_equip_online_strength_request = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this._model.strengthInfos = msg.strengths || [];
                    this._model.strengthMaster = msg.strength_master;
                    this._model.curStrengthPos = msg.cur_pos;
                    this.setStrengthOther();
                    this.sendNt("update_strength_info" /* UPDATE_STRENGTH_INFO */);
                    this.sendNt("update_strength_master_info" /* UPDATE_STRENGTH_MASTER_INFO */);
                };
                /** 计算强化总等级、强化战力、大师战力*/
                EnhanceProxy.prototype.setStrengthOther = function () {
                    this._model.strengthPower.low = 0;
                    this._model.strengthPower.high = 0;
                    this._model.strengthMasterPower.low = 0;
                    this._model.strengthMasterPower.high = 0;
                    if (this._model.strengthInfos) {
                        this._model.strengthMinLv = 10000;
                        this._model.strengthMasterReachCnt = 0;
                        for (var _i = 0, _a = this._model.strengthInfos; _i < _a.length; _i++) {
                            var sInfo = _a[_i];
                            if (sInfo.attrs.showpower) {
                                this._model.strengthPower = this._model.strengthPower.add(sInfo.attrs.showpower);
                            }
                            this._model.strengthMinLv = Math.min(this._model.strengthMinLv, sInfo.strength_lv);
                            if (this._model.strengthMaster && sInfo.strength_lv >= this._model.strengthMaster.reach_level) {
                                this._model.strengthMasterReachCnt++;
                            }
                        }
                    }
                    if (this._model.strengthMaster) {
                        if (this._model.strengthMaster.attrs && this._model.strengthMaster.attrs.showpower) {
                            this._model.strengthMasterPower = this._model.strengthMasterPower.add(this._model.strengthMaster.attrs.showpower);
                        }
                    }
                    this.updateHint();
                };
                /** 强化更新*/
                EnhanceProxy.prototype.s2c_equip_update_strength = function (n) {
                    var msg = n.body;
                    if (msg.strengths) {
                        if (!this._model.strengthInfos) {
                            this._model.strengthInfos = msg.strengths;
                        }
                        else {
                            for (var _i = 0, _a = msg.strengths; _i < _a.length; _i++) {
                                var temp = _a[_i];
                                var idx = this._model.getStrengthInfoIdx(temp.equip_type);
                                if (idx != -1) {
                                    this._model.strengthInfos[idx] = temp;
                                }
                            }
                        }
                    }
                    /**成功提示*/
                    mod.ViewMgr.getIns().showSuccessTips(7 /* Strength */);
                    this._model.curStrengthPos = msg.cur_pos;
                    this.setStrengthOther();
                    this.sendNt("update_strength_info" /* UPDATE_STRENGTH_INFO */);
                };
                /**
                 * 装备强化
                 * @param type 1-强化，2-一键强化
                 */
                EnhanceProxy.prototype.c2s_equip_strength = function (type, pos) {
                    var msg = new c2s_equip_strength();
                    msg.buttontype = type;
                    msg.pos = pos;
                    this.sendProto(msg);
                };
                /** 大师升阶*/
                EnhanceProxy.prototype.c2s_equip_strength_master = function () {
                    this.sendProto(new c2s_equip_strength_master());
                };
                /** 强化大师*/
                EnhanceProxy.prototype.s2c_equip_strength_master = function (n) {
                    var msg = n.body;
                    this._model.strengthMaster = msg.info;
                    this.setStrengthOther();
                    this.sendNt("update_strength_master_info" /* UPDATE_STRENGTH_MASTER_INFO */);
                };
                //--------------------------宝石-----------------------------------
                EnhanceProxy.prototype.s2c_equip_online_gem_request = function (n) {
                    var msg = n.body;
                    if (msg.gems) {
                        if (!this._model.gemInfos) {
                            this._model.gemInfos = {};
                        }
                        for (var _i = 0, _a = msg.gems; _i < _a.length; _i++) {
                            var gem = _a[_i];
                            this._model.gemInfos[gem.equip_type] = gem.gems;
                        }
                    }
                    this._model.gemMaster = msg.gem_master;
                    this.updateGemPowerAndLv();
                    this.updateHint();
                    this.sendNt("update_gem_info" /* UPDATE_GEM_INFO */);
                };
                /**
                 * 宝石升级、镶嵌
                 * @param {number} type 1一键升级，2一键镶嵌
                 * @param {number} _equip 装备部位
                 */
                EnhanceProxy.prototype.c2s_equip_operate_gem = function (type, eqType) {
                    var msg = new c2s_equip_operate_gem();
                    this._isInset = (type == 2);
                    msg.op_type = type;
                    msg.equip_type = eqType;
                    this.sendProto(msg);
                };
                EnhanceProxy.prototype.s2c_equip_update_gem = function (n) {
                    var isInset = false; //镶嵌成功
                    var msg = n.body;
                    if (msg.gem) {
                        if (!this._model.gemInfos) {
                            this._model.gemInfos = {};
                        }
                        for (var _i = 0, _a = msg.gem; _i < _a.length; _i++) {
                            var gem = _a[_i];
                            isInset = this.isInset1(gem);
                            this._model.gemInfos[gem.equip_type] = gem.gems;
                        }
                    }
                    this.updateGemPowerAndLv();
                    this.updateHint();
                    this.sendNt("update_gem_info" /* UPDATE_GEM_INFO */);
                    if (isInset) {
                        this.sendNt("update_gem_one_key_inset" /* UPDATE_GEM_ONE_KEY_INSET */);
                        // PromptBox.getIns().show("镶嵌成功");
                    }
                };
                /** 是否为镶嵌操作 */
                EnhanceProxy.prototype.isInset1 = function (gem) {
                    var b = false;
                    var oldGems = this._model.gemInfos[gem.equip_type];
                    for (var j = 0, len = oldGems.length; j < len; j++) {
                        var oldGem = oldGems[j];
                        var newGem = gem.gems[j];
                        if (!b && newGem.index > 0 && newGem.index != oldGem.index && this._isInset) {
                            b = true;
                            break;
                        }
                    }
                    return b;
                };
                /** 宝石镶嵌*/
                EnhanceProxy.prototype.c2s_equip_gem_takeon = function (eqType, gemType, gemId) {
                    var msg = new c2s_equip_gem_takeon();
                    msg.equip_type = eqType;
                    msg.gem_type = gemType;
                    msg.gem_id = gemId;
                    this.sendProto(msg);
                    this._isInset = true;
                };
                /** 宝石拆除*/
                EnhanceProxy.prototype.c2s_equip_gem_takeoff = function (eqPos, gemType) {
                    var msg = new c2s_equip_gem_takeoff();
                    msg.gem_type = gemType;
                    msg.equip_type = eqPos;
                    this.sendProto(msg);
                };
                /**
                 *  宝石合成
                 * @param {number} 1:合成 2:单类型一键合成 3:所有一键合成
                 */
                EnhanceProxy.prototype.c2s_equip_gem_combine = function (eqPos, gemType, idx, type) {
                    var msg = new c2s_equip_gem_combine();
                    msg.equip_type = eqPos;
                    msg.gem_index = idx;
                    msg.gem_type = gemType;
                    msg.flag = type;
                    this.sendProto(msg);
                };
                EnhanceProxy.prototype.c2s_equip_gem_attrs = function (idx) {
                    var msg = new c2s_equip_gem_attrs();
                    msg.index = idx;
                    this._gemAttrIdx = idx;
                    this.sendProto(msg);
                };
                EnhanceProxy.prototype.s2c_equip_gem_attrs = function (n) {
                    var msg = n.body;
                    if (!this._model.gemAttrs) {
                        this._model.gemAttrs = {};
                    }
                    if (this._gemAttrIdx) {
                        this._model.gemAttrs[this._gemAttrIdx] = msg.attrs;
                        this._gemAttrIdx = null;
                        this.sendNt("on_gem_attr_back" /* ON_GEM_ATTR_BACK */, msg.attrs);
                    }
                };
                EnhanceProxy.prototype.getGemAttr = function (idx) {
                    var info = this._model.gemAttrs;
                    if (info && info[idx]) {
                        return info[idx];
                    }
                    else {
                        this.c2s_equip_gem_attrs(idx);
                    }
                    return null;
                };
                /**宝石大师升阶*/
                EnhanceProxy.prototype.c2s_equip_gem_master = function () {
                    this.sendProto(new c2s_equip_gem_master());
                };
                EnhanceProxy.prototype.s2c_equip_gem_master = function (n) {
                    var msg = n.body;
                    if (msg.info) {
                        this._model.gemMaster = msg.info;
                        this._model.gemMasterPower = msg.info.attrs.showpower;
                    }
                    this.updateHint();
                    this.sendNt("update_gem_master_info" /* UPDATE_GEM_MASTER_INFO */);
                };
                /**宝石总战力和等级*/
                EnhanceProxy.prototype.updateGemPowerAndLv = function () {
                    var lv = 0;
                    var power = Long.fromValue(0);
                    var infos = this._model.gemInfos;
                    if (infos) {
                        for (var pos in infos) {
                            var gems = infos[pos];
                            if (!gems) {
                                continue;
                            }
                            for (var _i = 0, gems_1 = gems; _i < gems_1.length; _i++) {
                                var item = gems_1[_i];
                                if (item && item.attrs && item.attrs.showpower) {
                                    power = power.add(item.attrs.showpower);
                                }
                                if (item && item.index) {
                                    lv += item.index % 100;
                                }
                            }
                        }
                    }
                    //宝石大师
                    var master = this._model.gemMaster;
                    if (master && master.attrs) {
                        power = power.add(master.attrs.showpower);
                        this._model.gemMasterPower = master.attrs.showpower;
                    }
                    this._model.gemPower = power;
                    this._model.gemTotalLv = lv;
                };
                /**判断是否满级宝石 */
                EnhanceProxy.prototype.checkGemMax = function (index) {
                    var cfg = game.getConfigByNameId("prop.json" /* Prop */, index + 1);
                    return !!cfg;
                };
                //--------------------------进阶-----------------------------------
                /**更新进阶和大师*/
                EnhanceProxy.prototype.s2c_equip_online_advanced_request = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    this._model.advancedInfos = msg.advanceds || [];
                    this._model.advancedMaster = msg.advanced_master;
                    this._model.curAdvancedPos = msg.cur_pos;
                    this.setAdvancedOther();
                    this.updateHint();
                    this.sendNt("update_advanced_info" /* UPDATE_ADVANCED_INFO */);
                };
                /** 计算进阶总等级、进阶战力、大师战力*/
                EnhanceProxy.prototype.setAdvancedOther = function () {
                    this._model.advancedPower.low = 0;
                    this._model.advancedPower.high = 0;
                    this._model.advancedMasterPower.low = 0;
                    this._model.advancedMasterPower.high = 0;
                    if (this._model.advancedInfos) {
                        this._model.advancedMinLv = 10000;
                        for (var _i = 0, _a = this._model.advancedInfos; _i < _a.length; _i++) {
                            var sInfo = _a[_i];
                            if (sInfo.attrs.showpower) {
                                this._model.advancedPower = this._model.advancedPower.add(sInfo.attrs.showpower);
                            }
                            this._model.advancedMinLv = Math.min(this._model.advancedMinLv, sInfo.advanced_lv);
                            if (this._model.advancedMaster && sInfo.advanced_lv >= this._model.advancedMaster.rench_level) {
                                this._model.advancedMasterReachCnt++;
                            }
                        }
                    }
                    if (this._model.advancedMaster && this._model.advancedMaster.attrs && this._model.advancedMaster.attrs.showpower) {
                        this._model.advancedMasterPower = this._model.advancedMasterPower.add(this._model.advancedMaster.attrs.showpower);
                    }
                };
                /**
                 * 装备进阶
                 */
                EnhanceProxy.prototype.c2s_equip_advanced = function (pos) {
                    var msg = new c2s_equip_advanced();
                    msg.equiptype = pos;
                    this.sendProto(msg);
                };
                /** 进阶更新*/
                EnhanceProxy.prototype.s2c_equip_update_advanced = function (n) {
                    var msg = n.body;
                    if (!msg.advanceds) {
                        return;
                    }
                    if (!this._model.advancedInfos) {
                        this._model.advancedInfos = msg.advanceds;
                    }
                    else {
                        for (var _i = 0, _a = msg.advanceds; _i < _a.length; _i++) {
                            var temp = _a[_i];
                            var idx = this._model.getAdvancedInfoIdx(temp.equip_type);
                            (idx != -1) && (this._model.advancedInfos[idx] = temp);
                        }
                    }
                    // this._model.curAdvancedPos = msg.cur_pos;
                    this.setAdvancedOther();
                    this.updateHint();
                    this.sendNt("update_advanced_info" /* UPDATE_ADVANCED_INFO */);
                    game.PromptBox.getIns().show("进阶成功");
                };
                /** 大师进阶*/
                EnhanceProxy.prototype.c2s_equip_advanced_master = function () {
                    this.sendProto(new c2s_equip_advanced_master());
                };
                /** 进阶大师*/
                EnhanceProxy.prototype.s2c_equip_advanced_master = function (n) {
                    var msg = n.body;
                    this._model.advancedMaster = msg.info;
                    this.setAdvancedOther();
                    this.updateHint();
                    this.sendNt("update_advance_master_info" /* UPDATE_ADVANCED_MASTER_INFO */);
                };
                ////////////////////////////////////////红点///////////////////////////////////////
                /**
                 * 强化入口、标签页红点
                 * @returns
                 */
                EnhanceProxy.prototype.updateHint = function () {
                    var strengthHint = this.updateStrengthOneKeyBtnHint() || this.updateStrengthMasterBtnHint();
                    var gemHint = this.gemOneKeyInlayHint() || this.checkGemMasterHint();
                    var advanceHint = this.updateAdvanceBtnHint() || this.updateAdvanceMasterBtnHint();
                    mod.HintMgr.setHint(strengthHint, this._model.StrengthHint);
                    mod.HintMgr.setHint(gemHint, this._model.GemHint);
                    mod.HintMgr.setHint(advanceHint, this._model.AdvancedHint);
                };
                /**
                 * 一键强化红点
                 * @returns
                 */
                EnhanceProxy.prototype.updateStrengthOneKeyBtnHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670094 /* Strength */)) {
                        return false;
                    }
                    var hint = false;
                    var equipProxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                    for (var _i = 0, EquipPosAry_1 = game.EquipPosAry; _i < EquipPosAry_1.length; _i++) {
                        var pos1 = EquipPosAry_1[_i];
                        var propData = equipProxy.getEquipByPos(pos1); // 有无穿戴装备
                        if (!propData) {
                            continue;
                        }
                        var equip = this._model.getStrengthInfo(pos1);
                        if (!equip) {
                            continue;
                        }
                        var lvId = this.getStrengthLvId(equip.strength_lv + 1);
                        var cfg = game.getConfigByNameId("level.json" /* Level */, lvId);
                        if (cfg && cfg.goods_id && cfg.goods_id.length) {
                            var isEnough = mod.BagUtil.checkPropCnt(cfg.goods_id[0][0], cfg.goods_id[0][1]);
                            hint = isEnough && !!equip.next_attrs; // 消耗足够，且未满级
                            if (hint) {
                                break;
                            }
                        }
                    }
                    return hint;
                };
                /**
                 * 强化大师红点
                 * @returns
                 */
                EnhanceProxy.prototype.updateStrengthMasterBtnHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670094 /* Strength */) || !this._model.strengthMaster) {
                        return false;
                    }
                    var hint = false;
                    var nextLvCfg = this._model.getLvCfg(this.getStrengthMasterLvId(this._model.strengthMaster.level + 1));
                    var isMax = this._model.isStrengthMasterMaxLv();
                    var needLv = (nextLvCfg ? nextLvCfg.levelup_exp : 0);
                    hint = (this._model.strengthMinLv >= needLv) && !isMax;
                    return hint;
                };
                //装备部位
                EnhanceProxy.prototype.checkEquipGemHint = function (pos) {
                    // let eq: PropData = RoleUtil.getRoleEuqipData(pos);
                    // if (!eq) {
                    //     return false;
                    // }
                    //
                    // let info: equip_gem_data = this._model.getGemInfo(pos);
                    // if (!info || !info.gems) {
                    //     return false;
                    // }
                    // for (let item of info.gems) {
                    //     if (this.checkGemPosHint(eq, item)) {
                    //         return true;
                    //     }
                    // }
                    return false;
                };
                //宝石孔位红点
                EnhanceProxy.prototype.checkGemPosHint = function (equipData, gem, eqPos, gemPos) {
                    if (!equipData || equipData.index == 0 || !gem) {
                        return false;
                    }
                    var bagGems = mod.BagUtil.getBagsByType(5 /* Gem */);
                    if (!bagGems || bagGems.length < 1) {
                        return false;
                    }
                    var gemType = this.getGemType(gem.index) || gemPos + 1;
                    var hint = false;
                    for (var _i = 0, bagGems_1 = bagGems; _i < bagGems_1.length; _i++) {
                        var bagG = bagGems_1[_i];
                        var cfg = game.getConfigById(bagG.index);
                        if (!cfg || this.getGemType(bagG.index) != gemType) {
                            continue;
                        }
                        if (!gem.index || bagG.index > gem.index) { // 镶嵌
                            hint = true;
                            break;
                        }
                    }
                    var synHint = this.checkGemAKeySynHint(bagGems, gemType);
                    return hint || synHint;
                };
                //单个宝石镶嵌红点
                EnhanceProxy.prototype.gemSettledHint = function (holeGem, bagGem) {
                    if (bagGem && !holeGem.index) {
                        return true;
                    }
                    var bagGems = mod.BagUtil.getBagsByType(5 /* Gem */);
                    if (!bagGems || bagGems.length < 1) {
                        return false;
                    }
                    var hint = false;
                    if (bagGem.index > holeGem.index) {
                        hint = true;
                    }
                    return hint;
                };
                //一键合成
                EnhanceProxy.prototype.checkGemAKeySynHint = function (props, type) {
                    if (!props) {
                        props = mod.BagUtil.getBagsByType(5 /* Gem */);
                    }
                    if (!props || props.length <= 0) {
                        return false;
                    }
                    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                        var temp = props_1[_i];
                        if (type && this.getGemType(temp.index) != type) {
                            continue;
                        }
                        if (this.checkGemSynHint(temp)) {
                            return true;
                        }
                    }
                    return false;
                };
                /**
                 * 一键镶嵌宝石红点
                 */
                EnhanceProxy.prototype.gemOneKeyInlayHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670095 /* Gem */)) {
                        return false;
                    }
                    var hint = false;
                    var bagDatas = mod.BagUtil.getBagsByType(5 /* Gem */);
                    var equipProxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                    for (var _i = 0, EquipPosAry_2 = game.EquipPosAry; _i < EquipPosAry_2.length; _i++) {
                        var pos = EquipPosAry_2[_i];
                        var propData = equipProxy.getEquipByPos(pos);
                        if (!propData) {
                            continue;
                        }
                        for (var i = 0; i < 4; i++) {
                            var setted = this._model.getGemHoleInfo(pos, i);
                            for (var _a = 0, bagDatas_1 = bagDatas; _a < bagDatas_1.length; _a++) {
                                var bagD = bagDatas_1[_a];
                                var bagGemType = this.getGemType(bagD.index);
                                if (!setted && bagGemType == i + 1) {
                                    hint = true;
                                    return hint;
                                }
                                else if (setted && bagGemType == setted.gem_type && bagD.index > setted.index) {
                                    hint = true;
                                    return hint;
                                }
                            }
                        }
                    }
                    return hint;
                };
                /**
                 * 单个宝石合成红点
                 * @param gem
                 * @returns
                 */
                EnhanceProxy.prototype.checkGemSynHint = function (gem) {
                    if (!gem) {
                        return false;
                    }
                    if (gem.count < 2) {
                        return false;
                    }
                    var hint = false;
                    var bagDatas = mod.BagUtil.getBagsByType(5 /* Gem */);
                    var gemType = this.getGemType(gem.index);
                    for (var _i = 0, bagDatas_2 = bagDatas; _i < bagDatas_2.length; _i++) {
                        var bagD = bagDatas_2[_i];
                        if (this.getGemType(bagD.index) == gemType && bagD.count >= 2 && this.checkGemMax(bagD.index)) {
                            hint = true;
                            return hint;
                        }
                    }
                    return hint;
                };
                //宝石大师红点
                EnhanceProxy.prototype.checkGemMasterHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670095 /* Gem */)) {
                        return false;
                    }
                    var master = this._model.gemMaster;
                    if (!master) {
                        return false;
                    }
                    var nextNeedLv = master.next_gem_lv ? master.next_gem_lv : 0;
                    return nextNeedLv > 0 && this._model.gemTotalLv >= nextNeedLv;
                };
                /**
                 * 进阶按钮红点（判断全部格子）
                 * @returns
                 */
                EnhanceProxy.prototype.updateAdvanceBtnHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670096 /* Advanced */)) {
                        return false;
                    }
                    var hint = false;
                    var equipProxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                    for (var _i = 0, EquipPosAry_3 = game.EquipPosAry; _i < EquipPosAry_3.length; _i++) {
                        var pos1 = EquipPosAry_3[_i];
                        var propData = equipProxy.getEquipByPos(pos1); // 有无穿戴装备
                        if (!propData) {
                            continue;
                        }
                        hint = this.updateAdvanceHintByPos(pos1);
                        if (hint) {
                            break;
                        }
                    }
                    return hint;
                };
                /**
                 * 指定格子的进阶按钮红点
                 * @param pos 装备位置
                 * @returns
                 */
                EnhanceProxy.prototype.updateAdvanceHintByPos = function (pos) {
                    var hint = false;
                    var equip = this._model.getAdvancedInfo(pos);
                    if (!equip) {
                        return hint;
                    }
                    var lvId = this.getAdvancedLvId(equip.advanced_lv + 1);
                    var cfg = game.getConfigByNameId("level.json" /* Level */, lvId);
                    if (cfg && cfg.goods_id && cfg.goods_id.length) {
                        var isEnough = mod.BagUtil.checkPropCnt(cfg.goods_id[0][0], cfg.goods_id[0][1]);
                        hint = isEnough && !!equip.next_attrs; // 消耗足够，且未满级
                    }
                    return hint;
                };
                /**
                 * 进阶大师红点
                 * @returns
                 */
                EnhanceProxy.prototype.updateAdvanceMasterBtnHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670096 /* Advanced */)) {
                        return false;
                    }
                    var hint = false;
                    var master = this._model.advancedMaster;
                    if (!master) {
                        return hint;
                    }
                    var reachCnt = master.rench_level;
                    hint = (master && master.next_attrs && this._model.advancedMinLv >= reachCnt && reachCnt != 0);
                    mod.HintMgr.setHint(hint, this._model.AdvancedMasterBtnHint);
                    return hint;
                };
                /**
                 * 取强化的等级表id
                 * @param strengthLv
                 * @returns
                 */
                EnhanceProxy.prototype.getStrengthLvId = function (strengthLv) {
                    return 150100000 /* STRENGTH_BASE */ + strengthLv;
                };
                /**
                 * 取进阶的等级表id
                 * @param advancedLv
                 * @returns
                 */
                EnhanceProxy.prototype.getAdvancedLvId = function (advancedLv) {
                    return 158101000 /* ADVANDE_BASE */ + advancedLv;
                };
                /**
                 * 取强化大师的等级表id
                 * @param strengthMasterLv
                 * @returns
                 */
                EnhanceProxy.prototype.getStrengthMasterLvId = function (strengthMasterLv) {
                    return 150200000 /* STRENGTH_MASTER_BASE */ + strengthMasterLv;
                };
                /**
                 * 取宝石大师的等级表id
                 * @param gemMasterLv
                 * @returns
                 */
                EnhanceProxy.prototype.getGemMasterLvId = function (gemMasterLv) {
                    return 150300000 /* GEM_BASE */ + gemMasterLv;
                };
                /**
                 * 取进阶大师的等级表id
                 * @param advancedMasterLv
                 * @returns
                 */
                EnhanceProxy.prototype.getAdvancedMasterLvId = function (advancedMasterLv) {
                    return 158000000 /* ADVANCE_MASTER_BASE */ + advancedMasterLv;
                };
                /**
                 * 取宝石类型
                 * @param id 宝石id
                 * @returns
                 */
                EnhanceProxy.prototype.getGemType = function (id) {
                    return Math.floor((id % 145040) / 1000);
                };
                /**
                 * 取某类型的宝石
                 * @param type
                 * @returns
                 */
                EnhanceProxy.prototype.getGemsByType = function (type) {
                    var tmpBags = [];
                    var bags = mod.BagUtil.getBagsByType(5 /* Gem */);
                    for (var _i = 0, bags_1 = bags; _i < bags_1.length; _i++) {
                        var prop = bags_1[_i];
                        if (type != prop.propSubType) {
                            continue;
                        }
                        tmpBags.push(prop);
                    }
                    return tmpBags;
                };
                /**
                 * 装备位置转 list 索引
                 * @param pos
                 * @returns
                 */
                EnhanceProxy.prototype.getListIdxByPos = function (pos) {
                    var idxArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
                    return pos < idxArr.length ? idxArr[pos] : 0;
                };
                /**
                 * 装备 list 索引转位置
                 * @param idx
                 * @returns
                 */
                EnhanceProxy.prototype.getPosByListIdx = function (idx) {
                    return game.EquipPosAry[idx];
                };
                /**
                 * 根据部位获取强化信息
                 * @param pos
                 */
                EnhanceProxy.prototype.getStrengthInfo = function (pos) {
                    return this._model.getStrengthInfo(pos);
                };
                /**
                 * 宝石数据
                 * @param pos 部位，0~9
                 * @returns
                 */
                EnhanceProxy.prototype.getGemInfo = function (pos) {
                    return this._model.getGemInfo(pos);
                };
                /**
                 * 进阶大师属性（套装属性）
                 */
                EnhanceProxy.prototype.getAdvancedMaster = function () {
                    return this._model.advancedMaster;
                };
                return EnhanceProxy;
            }(game.ProxyBase));
            enhance.EnhanceProxy = EnhanceProxy;
            __reflect(EnhanceProxy.prototype, "game.mod.enhance.EnhanceProxy", ["game.mod.IEnhanceProxy", "base.IProxy"]);
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var AdvancedView = /** @class */ (function (_super) {
                __extends(AdvancedView, _super);
                function AdvancedView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.enhance.AdvancedSkin";
                    return _this;
                }
                return AdvancedView;
            }(eui.Component));
            enhance.AdvancedView = AdvancedView;
            __reflect(AdvancedView.prototype, "game.mod.enhance.AdvancedView");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var GemAttrInfoView = /** @class */ (function (_super) {
                __extends(GemAttrInfoView, _super);
                function GemAttrInfoView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.enhance.GemAttrInfoSkin";
                    return _this;
                }
                return GemAttrInfoView;
            }(eui.Component));
            enhance.GemAttrInfoView = GemAttrInfoView;
            __reflect(GemAttrInfoView.prototype, "game.mod.enhance.GemAttrInfoView");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var GemBtnItem = /** @class */ (function (_super) {
                __extends(GemBtnItem, _super);
                function GemBtnItem() {
                    return _super.call(this) || this;
                }
                GemBtnItem.prototype.setEffect = function (effStr) {
                    if (!this.gr_eff)
                        return;
                    if (!this.effId) {
                        this.effId = this.addEftByParent(effStr, this.gr_eff);
                    }
                };
                GemBtnItem.prototype.removePosEff = function () {
                    if (this.effId) {
                        this.removeEffect(this.effId);
                        this.effId = null;
                    }
                };
                Object.defineProperty(GemBtnItem.prototype, "pos", {
                    get: function () {
                        return this._pos;
                    },
                    set: function (value) {
                        this._pos = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GemBtnItem.prototype, "txtIcon", {
                    set: function (icon) {
                        if (this.icon_txt) {
                            this.icon_txt.source = icon;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return GemBtnItem;
            }(mod.BaseRenderer));
            enhance.GemBtnItem = GemBtnItem;
            __reflect(GemBtnItem.prototype, "game.mod.enhance.GemBtnItem");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var GemMasterView = /** @class */ (function (_super) {
                __extends(GemMasterView, _super);
                function GemMasterView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.enhance.GemMasterSkin";
                    return _this;
                }
                Object.defineProperty(GemMasterView.prototype, "isAdvance", {
                    set: function (value) {
                        this.currentState = value ? "advance" : "normal";
                    },
                    enumerable: true,
                    configurable: true
                });
                return GemMasterView;
            }(eui.Component));
            enhance.GemMasterView = GemMasterView;
            __reflect(GemMasterView.prototype, "game.mod.enhance.GemMasterView");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var GemSynRender = /** @class */ (function (_super) {
                __extends(GemSynRender, _super);
                function GemSynRender() {
                    return _super.call(this) || this;
                }
                GemSynRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    this.icon.setData(this.data, 3 /* NotTips */);
                };
                return GemSynRender;
            }(mod.IconSel));
            enhance.GemSynRender = GemSynRender;
            __reflect(GemSynRender.prototype, "game.mod.enhance.GemSynRender");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var GemSynView = /** @class */ (function (_super) {
                __extends(GemSynView, _super);
                function GemSynView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.enhance.GemSynSkin";
                    return _this;
                }
                return GemSynView;
            }(eui.Component));
            enhance.GemSynView = GemSynView;
            __reflect(GemSynView.prototype, "game.mod.enhance.GemSynView");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var GemView = /** @class */ (function (_super) {
                __extends(GemView, _super);
                function GemView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.enhance.GemSkin";
                    return _this;
                }
                return GemView;
            }(eui.Component));
            enhance.GemView = GemView;
            __reflect(GemView.prototype, "game.mod.enhance.GemView");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var facade = base.facade;
            var StrengthEquipIcon = /** @class */ (function (_super) {
                __extends(StrengthEquipIcon, _super);
                function StrengthEquipIcon() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._pos = 0;
                    _this._isEqpListIcon = true;
                    _this._lv = 0;
                    return _this;
                }
                Object.defineProperty(StrengthEquipIcon.prototype, "pos", {
                    get: function () {
                        return this._pos;
                    },
                    enumerable: true,
                    configurable: true
                });
                // public get hasEquip(): boolean {
                //     return this._hasEquip;
                // }
                StrengthEquipIcon.prototype.dataChanged = function () {
                    if (this.data == null) {
                        this.icon.defaultIcon();
                        return;
                    }
                    this.img_sel.visible = false;
                    this._proxy = facade.retMod("43" /* Enhance */).retProxy(187 /* Enhance */);
                    this._model = this._proxy.getModel();
                    var data1 = this.data;
                    this._pos = data1.pos;
                    //this._hasEquip = !!data1.equip;
                    // 已装备
                    if (data1.equip && data1.info) {
                        var propData = data1.equip;
                        propData.count = data1.info.advanced_lv;
                        this.nameUrl = data1.info.advanced_lv ? "jinjie_" + data1.info.advanced_lv : "";
                        this.nameUrl2 = data1.info.advanced_lv;
                        this.hint = data1.hint;
                        this.icon.setData(propData, 3 /* NotTips */);
                        this._lv = data1.info.advanced_lv;
                    }
                    else {
                        this.icon.updateIconImg("equip_icon_gray_" + data1.pos);
                    }
                    this.select(this.pos == this._model.curAdvancedPos);
                };
                StrengthEquipIcon.prototype.select = function (b) {
                    this.selected = b;
                    if (this.selected && this._isEqpListIcon) {
                        this._model.curEqpItem = this;
                    }
                };
                Object.defineProperty(StrengthEquipIcon.prototype, "nameUrl", {
                    /**
                     * 暂时用 nameUrl2 代替
                     */
                    set: function (value) {
                        // if(!this._nameImg) {
                        //     this._nameImg = new eui.Image();
                        //     this._nameImg.scaleX = 0.55;
                        //     this._nameImg.scaleY = 0.55;
                        //     this._nameImg.x = 5;
                        //     this._nameImg.y = 5;
                        //     this.addChildAt(this._nameImg, this.getChildIndex(this.icon) + 1);
                        // }
                        // this._nameImg.source = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StrengthEquipIcon.prototype, "nameUrl2", {
                    set: function (lv) {
                        if (!this._nameImg) {
                            this._nameImg = new eui.Image();
                            // this._nameImg.scaleX = 0.55;
                            // this._nameImg.scaleY = 0.55;
                            this._nameImg.x = 6;
                            this._nameImg.y = 6;
                            this.addChildAt(this._nameImg, this.getChildIndex(this.icon) + 1);
                        }
                        this._nameImg.source = lv ? 'role_advance_lv' + lv : '';
                        // if (!lv || lv < 1) {
                        //     if (this._eft) {
                        //         this._eft.clearAllFont();
                        //     }
                        //     return;
                        // }
                        // if (!this._grp) {
                        //     this._grp = new eui.Group();
                        //     this._grp.x = 15;
                        //     this.addChild(this._grp);
                        // }
                        // if (!this._eft) {
                        //     this._eft = new UIEftHub(this);
                        // }
                        // this._eft.addBmpFont(lv + "", BmpTextCfg[BmpTextType.CommonPower], this._grp, true, 1, true);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StrengthEquipIcon.prototype, "hint", {
                    set: function (value) {
                        this.redPoint.visible = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StrengthEquipIcon.prototype, "isEqpListIcon", {
                    set: function (value) {
                        this._isEqpListIcon = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StrengthEquipIcon.prototype, "lv", {
                    get: function () {
                        return this._lv;
                    },
                    enumerable: true,
                    configurable: true
                });
                return StrengthEquipIcon;
            }(mod.IconSel));
            enhance.StrengthEquipIcon = StrengthEquipIcon;
            __reflect(StrengthEquipIcon.prototype, "game.mod.enhance.StrengthEquipIcon");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var EnhanceModel = /** @class */ (function () {
                function EnhanceModel() {
                    this.strengthMinLv = 0; // 已装备的最低强化等级
                    this.strengthMasterReachCnt = 0; // 达标数量
                    this.strengthPower = Long.fromValue(0);
                    this.strengthMasterPower = Long.fromValue(0);
                    this.curGemPos = -1;
                    this.gemInfos = {}; // 已装备的宝石数据，pos：0~9
                    this.gemMasterPower = Long.fromValue(0);
                    this.gemPower = Long.fromValue(0);
                    this.gemTotalLv = 0;
                    this.advancedMinLv = 0; // 已装备的最低进阶等级
                    this.advancedMasterReachCnt = 0;
                    this.advancedPower = Long.fromValue(0);
                    this.advancedMasterPower = Long.fromValue(0);
                    this.StrengthHint = ["43" /* Enhance */, "01" /* StrengthMain */ + "01" /* BtnStrength */]; //主界面入口、强化标签页红点
                    this.GemHint = ["43" /* Enhance */, "01" /* StrengthMain */ + "02" /* BtnGem */]; //宝石标签页红点
                    this.AdvancedHint = ["43" /* Enhance */, "01" /* StrengthMain */ + "03" /* BtnAdvanced */]; //进阶标签页红点
                    // public StrengthBtnHint: string[] = [ModName.Enhance, EnhanceViewType.StrengthMain + EnhanceMainBtnType.BtnStrength, HintType.StrengthBtn];  //强化按钮红点
                    // public StrengthOneKeyBtnHint: string[] = [ModName.Enhance, EnhanceViewType.StrengthMain + EnhanceMainBtnType.BtnStrength, HintType.StrengthOneKeyBtn];  //一键强化按钮红点
                    // public StrengthMasterBtnHint: string[] = [ModName.Enhance, EnhanceViewType.StrengthMain + EnhanceMainBtnType.BtnStrength, HintType.StrengthMasterBtn];  //强化大师按钮红点
                    this.AdvancedMasterBtnHint = ["43" /* Enhance */, "06" /* Advanced */ + "03" /* BtnAdvanced */, "20" /* AdvancedMasterBtn */]; //进阶大师按钮红点
                }
                Object.defineProperty(EnhanceModel.prototype, "curStrengthPos", {
                    get: function () {
                        if (this.lastPos >= 0) {
                            return this.lastPos;
                        }
                        else {
                            return this._curStrengthPos;
                        }
                    },
                    set: function (value) {
                        this._curStrengthPos = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 当前点击的宝石槽位的镶嵌的宝石id
                 * @param eqpPos
                 * @param gemPos
                 * @returns
                 */
                EnhanceModel.prototype.getCurGemId = function (eqpPos, gemPos) {
                    var holeInfo = this.getGemHoleInfo(eqpPos, gemPos);
                    return holeInfo ? holeInfo.index : 0;
                };
                Object.defineProperty(EnhanceModel.prototype, "curAdvancedPos", {
                    get: function () {
                        if (this.curEqpItem) {
                            return this.curEqpItem.pos;
                        }
                        else {
                            return this._curAdvancedPos;
                        }
                    },
                    set: function (value) {
                        this._curAdvancedPos = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 宝石数据
                 * @param pos 部位，0~9
                 * @returns
                 */
                EnhanceModel.prototype.getGemInfo = function (pos) {
                    return this.gemInfos ? this.gemInfos[pos] : [];
                };
                /**
                 * 宝石孔位已镶嵌的宝石数据
                 * @param pos 装备部位，0~9
                 * @param gemPos 宝石孔位，0~3
                 * @return 没有穿戴时为null
                 */
                EnhanceModel.prototype.getGemHoleInfo = function (pos, gemPos) {
                    var gems = this.getGemInfo(pos);
                    if (!gems) {
                        return null;
                    }
                    for (var _i = 0, gems_2 = gems; _i < gems_2.length; _i++) {
                        var gem = gems_2[_i];
                        if (gem && gem.gem_type - 1 == gemPos) {
                            return gem;
                        }
                    }
                    return null;
                };
                /**
                 * 取强化信息
                 * @param pos 部位
                 * @returns
                 */
                EnhanceModel.prototype.getStrengthInfo = function (pos) {
                    var infos = this.strengthInfos;
                    var len = infos && infos.length ? infos.length : 0;
                    for (var i = 0; i < len; i++) {
                        if (infos[i] && infos[i].equip_type == pos) {
                            return infos[i];
                        }
                    }
                    return null;
                };
                /**
                 * 取强化数据索引
                 * @param equipType
                 * @returns
                 */
                EnhanceModel.prototype.getStrengthInfoIdx = function (equipType) {
                    var infos = this.strengthInfos;
                    var len = infos && infos.length ? infos.length : 0;
                    for (var i = 0; i < len; i++) {
                        if (infos[i] && infos[i].equip_type == equipType) {
                            return i;
                        }
                    }
                    return -1;
                };
                /**
                 * 取进阶信息
                 * @param pos 部位
                 * @returns
                 */
                EnhanceModel.prototype.getAdvancedInfo = function (pos) {
                    var infos = this.advancedInfos;
                    var len = infos && infos.length ? infos.length : 0;
                    for (var i = 0; i < len; i++) {
                        if (infos[i] && infos[i].equip_type == pos) {
                            return infos[i];
                        }
                    }
                    return null;
                };
                /**
                 * 取进阶数据索引
                 * @param equipType
                 * @returns
                 */
                EnhanceModel.prototype.getAdvancedInfoIdx = function (equipType) {
                    var infos = this.advancedInfos;
                    var len = infos && infos.length ? infos.length : 0;
                    for (var i = 0; i < len; i++) {
                        if (infos[i] && infos[i].equip_type == equipType) {
                            return i;
                        }
                    }
                    return -1;
                };
                EnhanceModel.prototype.isStrengthMasterMaxLv = function () {
                    var isMax = !this.strengthMaster.next_attrs || !this.strengthMaster.next_attrs.showpower;
                    return isMax;
                };
                EnhanceModel.prototype.isGemMasterMaxLv = function () {
                    var isMax = !this.gemMaster.next_attrs || !this.gemMaster.next_attrs.showpower;
                    return isMax;
                };
                EnhanceModel.prototype.isAdvancedMasterMaxLv = function () {
                    var isMax = !this.advancedMaster.next_attrs || !this.advancedMaster.next_attrs.showpower;
                    return isMax;
                };
                // ----------------------- 配置数据 -----------------------
                /**
                 * 取等级表配置
                 * @param lvId 等级表id
                 * @returns
                 */
                EnhanceModel.prototype.getLvCfg = function (lvId) {
                    var cfg = game.getConfigByNameId("level.json" /* Level */, lvId);
                    return cfg;
                };
                return EnhanceModel;
            }());
            enhance.EnhanceModel = EnhanceModel;
            __reflect(EnhanceModel.prototype, "game.mod.enhance.EnhanceModel");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var StrengthView = /** @class */ (function (_super) {
                __extends(StrengthView, _super);
                function StrengthView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.enhance.StrengthSkin";
                    return _this;
                }
                return StrengthView;
            }(eui.Component));
            enhance.StrengthView = StrengthView;
            __reflect(StrengthView.prototype, "game.mod.enhance.StrengthView");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var EnhanceMainMdr = /** @class */ (function (_super) {
                __extends(EnhanceMainMdr, _super);
                function EnhanceMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* BtnStrength */,
                            openIdx: 1041670094 /* Strength */,
                            icon: "ui_tab_strength_",
                            title: "enhance_1" /* enhance_1 */,
                            bg: "strength_bg",
                            mdr: enhance.StrengthMdr,
                            hintTypes: ["43" /* Enhance */, "01" /* StrengthMain */ + "01" /* BtnStrength */],
                        },
                        {
                            btnType: "02" /* BtnGem */,
                            openIdx: 1041670095 /* Gem */,
                            icon: "ui_tab_gem_",
                            title: "enhance_2" /* enhance_2 */,
                            bg: "gem_bg",
                            mdr: enhance.GemMdr,
                            hintTypes: ["43" /* Enhance */, "01" /* StrengthMain */ + "02" /* BtnGem */],
                        },
                        {
                            btnType: "03" /* BtnAdvanced */,
                            openIdx: 1041670096 /* Advanced */,
                            icon: "ui_tab_advanced_",
                            title: "enhance_3" /* enhance_3 */,
                            bg: "advanced_bg",
                            mdr: enhance.AdvancedMdr,
                            hintTypes: ["43" /* Enhance */, "01" /* StrengthMain */ + "03" /* BtnAdvanced */],
                        },
                    ];
                    return _this;
                }
                return EnhanceMainMdr;
            }(mod.WndBaseMdr));
            enhance.EnhanceMainMdr = EnhanceMainMdr;
            __reflect(EnhanceMainMdr.prototype, "game.mod.enhance.EnhanceMainMdr");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var AdvancedMasterMdr = /** @class */ (function (_super) {
                __extends(AdvancedMasterMdr, _super);
                function AdvancedMasterMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", enhance.GemMasterView);
                    _this.isEasyHide = true;
                    return _this;
                }
                AdvancedMasterMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.verticalCenter = 0;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(187 /* Enhance */);
                    this._model = this._proxy.getModel();
                    this._list = new ArrayCollection();
                    this._view.list_attr.itemRenderer = enhance.StrengthMasterRender;
                    this._view.list_attr.dataProvider = this._list;
                };
                AdvancedMasterMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_advance_master_info" /* UPDATE_ADVANCED_MASTER_INFO */, this.initMaster, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_use, TouchEvent.TOUCH_TAP, this.onClickAdvancedUse);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                };
                AdvancedMasterMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.img_icon.source = "adv_master";
                    this._view.secondPop.updateTitleStr(game.getLanById("advance_suit" /* advance_suit */));
                    this._view.isAdvance = true;
                    this.initMaster();
                };
                AdvancedMasterMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                /** 初始化数据*/
                AdvancedMasterMdr.prototype.initMaster = function () {
                    this._view.power.setPowerValue(this._model.advancedMasterPower);
                    this._view.img_icon2.source = this._model.advancedMaster.level ? "jinjie_" + this._model.advancedMaster.level : "";
                    this._view.img_icon2.x = this._model.advancedMaster.level ? 159 : 80;
                    this._view.lab_tip.text = "";
                    this._view.btn_use.redPoint.visible = this._proxy.updateAdvanceMasterBtnHint();
                    var master = this._model.advancedMaster;
                    if (!master) {
                        return;
                    }
                    var curLvCfg = this._model.getLvCfg(this._proxy.getAdvancedMasterLvId(master.level));
                    var nextLvCfg = this._model.getLvCfg(this._proxy.getAdvancedMasterLvId(master.level + 1));
                    var data;
                    var masterDatas = [];
                    if (master.attrs && !!master.attrs.showpower) {
                        var txt1 = game.TextUtil.addColor((curLvCfg ? curLvCfg.levelup_exp : 0) + "", 2330156 /* GREEN */);
                        data = {
                            isCur: true,
                            masterLv: master.level,
                            attr: master.attrs,
                            reachTitle: game.StringUtil.substitute(game.getLanById("advance_request" /* advance_request */), [txt1]),
                            curReachCnt: this._model.advancedMinLv,
                            needReachCnt: (curLvCfg ? curLvCfg.levelup_exp : 0),
                        };
                        masterDatas.push(data);
                    }
                    if (master.next_attrs && !!master.next_attrs.showpower) {
                        var txt2 = game.TextUtil.addColor((nextLvCfg ? nextLvCfg.levelup_exp : 0) + "", 2330156 /* GREEN */);
                        data = {
                            isCur: false,
                            masterLv: master.level + 1,
                            attr: master.next_attrs,
                            reachTitle: game.StringUtil.substitute(game.getLanById("advance_request" /* advance_request */), [txt2]),
                            curReachCnt: this._model.advancedMinLv,
                            needReachCnt: (nextLvCfg ? nextLvCfg.levelup_exp : 0),
                        };
                        masterDatas.push(data);
                    }
                    this._list.replaceAll(masterDatas);
                    this._view.btn_use.label = game.getLanById("enhance_3" /* enhance_3 */);
                    var max = !!master.rench_level;
                    this._view.btn_use.enabled = max;
                    this._view.btn_use.visible = max;
                    this._view.img_max.visible = !max;
                };
                /** 升阶*/
                AdvancedMasterMdr.prototype.onClickAdvancedUse = function () {
                    this._proxy.c2s_equip_advanced_master();
                };
                return AdvancedMasterMdr;
            }(game.MdrBase));
            enhance.AdvancedMasterMdr = AdvancedMasterMdr;
            __reflect(AdvancedMasterMdr.prototype, "game.mod.enhance.AdvancedMasterMdr");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var TouchEvent = egret.TouchEvent;
            var equip_advanced_data = msg.equip_advanced_data;
            var ArrayCollection = eui.ArrayCollection;
            var delayCall = base.delayCall;
            var Handler = base.Handler;
            var TimeMgr = base.TimeMgr;
            var AdvancedMdr = /** @class */ (function (_super) {
                __extends(AdvancedMdr, _super);
                function AdvancedMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", enhance.AdvancedView);
                    _this._costs = [];
                    return _this;
                }
                AdvancedMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(187 /* Enhance */);
                    this._model = this._proxy.getModel();
                    this._equipProxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                    this._listData = new ArrayCollection();
                    this._view.list_equip.dataProvider = this._listData;
                    this._view.list_equip.itemRenderer = enhance.StrengthEquipIcon;
                };
                AdvancedMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_advanced_info" /* UPDATE_ADVANCED_INFO */, this.onUpdateInfo, this);
                    this.onNt("update_advance_master_info" /* UPDATE_ADVANCED_MASTER_INFO */, this.onUpdateMaster, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_equip, eui.ItemTapEvent.ITEM_TAP, this.onClickList);
                    addEventListener(this._view.btn_advanced, TouchEvent.TOUCH_TAP, this.onClickedAdvanced);
                    addEventListener(this._view.btn_master, TouchEvent.TOUCH_TAP, this.onClickMaster);
                };
                AdvancedMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateInfo();
                };
                AdvancedMdr.prototype.onHide = function () {
                    this._model.curEqpItem = null;
                    this.removeAllEffects();
                    _super.prototype.onHide.call(this);
                };
                /** 更新强化*/
                AdvancedMdr.prototype.onUpdateInfo = function () {
                    var info = this._model.advancedInfos;
                    if (!info || info.length == 0) {
                        return;
                    }
                    var list = [];
                    for (var _i = 0, EquipPosAry_4 = game.EquipPosAry; _i < EquipPosAry_4.length; _i++) {
                        var pos = EquipPosAry_4[_i];
                        var propData = this._equipProxy.getEquipByPos(pos);
                        var info1 = this._model.getAdvancedInfo(pos);
                        var hint = this._proxy.updateAdvanceHintByPos(pos);
                        var equipData = { pos: pos, equip: propData, info: info1, hint: hint };
                        list.push(equipData);
                    }
                    this._listData.replaceAll(list);
                    if (this._model.curAdvancedPos != null) {
                        //delayCall(Handler.alloc(this, this.updateCurrentInfo));
                        //@yys 当事人写得太烂了，临时解决下
                        if (this._view.list_equip.numChildren >= 8) {
                            this.updateCurrentInfo();
                        }
                        else {
                            TimeMgr.addUpdateItem(this, 500);
                        }
                    }
                    this.onUpdateMaster();
                };
                AdvancedMdr.prototype.update = function (time) {
                    if (this._view.list_equip.numChildren >= 8) {
                        this.updateCurrentInfo();
                        TimeMgr.removeUpdateItem(this);
                    }
                };
                /** 更新大师*/
                AdvancedMdr.prototype.onUpdateMaster = function () {
                    if (!this._model.advancedPower.equals(0)) {
                        this._view.power.setPowerValue(this._model.advancedPower.add(this._model.advancedMasterPower));
                    }
                    else {
                        var _basicPower = Long.fromValue(0);
                        this._view.power.setPowerValue(_basicPower);
                    }
                    var attr;
                    var level = this._model.advancedMaster.level;
                    var color = "";
                    if (!level) {
                        level = 1;
                        color = game.TextUtil.addColor("(" + game.getLanById("not_active" /* not_active */) + ")", 2330156 /* GREEN */);
                        attr = this._model.advancedMaster.next_attrs;
                    }
                    else {
                        color = game.TextUtil.addColor("(" + game.getLanById("actived" /* actived */) + ")", 2330156 /* GREEN */);
                        attr = this._model.advancedMaster.attrs;
                    }
                    var cfg = game.getConfigByNameId("advance_lv.json" /* AdvanceLv */, level);
                    var levelStr = "" + level + game.getLanById("tishi_43" /* tishi_43 */);
                    var taozhuang = "" + cfg.name + game.getLanById("advance_suit" /* advance_suit */);
                    this._view.lab_suit_name.textFlow = game.TextUtil.parseHtml(levelStr + " " + taozhuang + color);
                    this._view.lab_attr.textFlow = game.TextUtil.parseHtml(game.TextUtil.getAttrText(attr, 2330156 /* GREEN */, " "));
                    this._view.btn_master.redPoint.visible = this._proxy.updateAdvanceMasterBtnHint();
                };
                /** 更新需要强化部位*/
                AdvancedMdr.prototype.updateCurrentInfo = function (bool) {
                    var _this = this;
                    if (bool === void 0) { bool = true; }
                    var equip = this._model.getAdvancedInfo(this._model.curAdvancedPos);
                    if (!equip) {
                        return;
                    }
                    // if(this._operating) {
                    //     this._operating = false;
                    if (bool) {
                        this._oldItem = this._model.curEqpItem;
                        if (this._oldItem) {
                            this._oldItem.select(false);
                        }
                        var item = void 0;
                        var newItem = void 0;
                        for (var i = 0, len = this._view.list_equip.numChildren; i < len; i++) {
                            item = this._view.list_equip.getChildAt(i);
                            if (!this._listData.source[i].equip) {
                                continue;
                            }
                            if (!newItem || item.lv < newItem.lv) {
                                newItem = item;
                            }
                        }
                        newItem.isEqpListIcon = true;
                        this._model.curEqpItem = newItem;
                        newItem.select(true);
                    }
                    // }
                    equip = this._model.getAdvancedInfo(this._model.curAdvancedPos);
                    var isMaxLv = !equip.next_attrs;
                    this._view.gr_max.visible = !isMaxLv;
                    this._view.img_max.visible = isMaxLv;
                    this._view.currentState = isMaxLv ? "maxLv" : "normal";
                    // 消耗
                    var lvId = this._proxy.getAdvancedLvId(equip.advanced_lv + 1);
                    var cfg = game.getConfigByNameId("level.json" /* Level */, lvId);
                    if (cfg && cfg.goods_id && cfg.goods_id.length) {
                        this._costs = cfg.goods_id[0];
                        this._view.cost.updateShow(cfg.goods_id[0]);
                    }
                    this._view.lab_pos_name.text = game.getLanById(game.EquipPosName[this._model.curAdvancedPos]);
                    if (!this._model.curEqpItem) {
                        return;
                    }
                    var b1 = false, b2 = false;
                    if (this._model.curEqpItem.data && this._model.curEqpItem.data.equip) {
                        b1 = true;
                        this._view.eqp_cur.isEqpListIcon = false;
                        this._view.eqp_cur.data = this._model.curEqpItem.data;
                        this._view.eqp_cur.nameUrl = this._model.curEqpItem.data.info.advanced_lv ? "jinjie_"
                            + this._model.curEqpItem.data.info.advanced_lv : "";
                        this._view.eqp_cur.nameUrl2 = this._model.curEqpItem.data.info.advanced_lv;
                        var stageStr = equip.advanced_lv + game.getLanById("tishi_43" /* tishi_43 */);
                        if (equip.advanced_lv) {
                            var advance_lv = game.getConfigByNameId("advance_lv.json" /* AdvanceLv */, equip.advanced_lv);
                            var taozhuang = "" + advance_lv.name;
                            stageStr += " " + taozhuang;
                        }
                        this._view.lab_eqp_cur.text = stageStr;
                    }
                    else {
                        this._view.eqp_cur.isEqpListIcon = false;
                        this._view.eqp_cur.nameUrl = "";
                        this._view.eqp_cur.nameUrl2 = 0;
                        this._view.eqp_cur.icon.defaultIcon();
                        this._view.eqp_cur.icon.updateIconImg("equip_icon_gray_" + this._model.curEqpItem.pos);
                        this._view.lab_eqp_cur.text = "";
                    }
                    this._view.eqp_cur.hint = false;
                    var nextData;
                    if (!isMaxLv && (this._model.curEqpItem.data.info instanceof equip_advanced_data)) {
                        var data1 = this._model.curEqpItem.data;
                        nextData = { pos: data1.pos, equip: data1.equip, info: data1.info, hint: false };
                        var nextLv = nextData.info.advanced_lv + 1;
                        if (this._model.curEqpItem.data && this._model.curEqpItem.data.equip && nextData) {
                            b2 = true;
                            this._view.eqp_next.isEqpListIcon = false;
                            this._view.eqp_next.data = nextData;
                            this._view.eqp_next.nameUrl = nextLv ? "jinjie_" + nextLv : "";
                            this._view.eqp_next.nameUrl2 = nextLv;
                            var advance_lv = game.getConfigByNameId("advance_lv.json" /* AdvanceLv */, nextLv);
                            var stageStr = nextLv + game.getLanById("tishi_43" /* tishi_43 */);
                            var taozhuang = "" + advance_lv.name;
                            this._view.lab_eqp_next.text = stageStr + " " + taozhuang;
                        }
                        else {
                            this._view.eqp_next.isEqpListIcon = false;
                            this._view.eqp_next.nameUrl = "";
                            this._view.eqp_next.nameUrl2 = 0;
                            this._view.eqp_next.icon.defaultIcon();
                            this._view.eqp_next.icon.updateIconImg("equip_icon_gray_" + this._model.curEqpItem.pos);
                            this._view.lab_eqp_next.text = "";
                        }
                    }
                    this._view.btn_advanced.redPoint.visible = this._proxy.updateAdvanceHintByPos(this._model.curAdvancedPos);
                    delayCall(Handler.alloc(this, function () {
                        _this._view.eqp_cur.select(false);
                        _this._view.eqp_cur.img_sel.visible = false;
                        _this._view.eqp_cur.touchChildren = false;
                        _this._view.eqp_next.select(false);
                        _this._view.eqp_next.img_sel.visible = false;
                        _this._view.eqp_next.touchChildren = false;
                        if (b1) {
                            _this._view.eqp_cur.icon.updateCnt("+" + _this._model.curEqpItem.data.info.advanced_lv);
                        }
                        if (b2) {
                            _this._view.eqp_next.icon.updateCnt("+" + (nextData.info.advanced_lv + 1));
                        }
                    }), 20);
                };
                /** 通用红点事件监听 */
                AdvancedMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    if (data.node == mod.HintMgr.getType(this._model.AdvancedMasterBtnHint)) {
                        this._view.btn_master.setHint(data.value);
                    }
                };
                AdvancedMdr.prototype.onClickList = function (e) {
                    this._oldItem = this._model.curEqpItem;
                    if (this._oldItem) {
                        this._oldItem.select(false);
                        // this._oldItem.currentState = "up";
                    }
                    var newItem = e.itemRenderer;
                    if (this._model.curEqpItem == newItem) {
                        return;
                    }
                    newItem.isEqpListIcon = true;
                    this._model.curEqpItem = newItem;
                    newItem.select(true);
                    this.updateCurrentInfo(false);
                };
                AdvancedMdr.prototype.onClickedAdvanced = function () {
                    if (!this._model.curEqpItem) {
                        return;
                    }
                    else if (!this._model.curEqpItem.data.equip) {
                        game.PromptBox.getIns().show(game.getLanById("gem_tip7" /* gem_tip7 */));
                        return;
                    }
                    if (this._costs.length > 1 && mod.BagUtil.checkPropCnt(this._costs[0], this._costs[1], 1 /* Dialog */)) {
                        this._proxy.c2s_equip_advanced(this._model.curEqpItem.pos);
                        this._operating = true;
                    }
                };
                AdvancedMdr.prototype.onClickMaster = function () {
                    mod.ViewMgr.getIns().showSecondPop("43" /* Enhance */, "07" /* AdvancedMaster */);
                };
                return AdvancedMdr;
            }(game.EffectMdrBase));
            enhance.AdvancedMdr = AdvancedMdr;
            __reflect(AdvancedMdr.prototype, "game.mod.enhance.AdvancedMdr", ["base.UpdateItem"]);
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var ArrayCollection = eui.ArrayCollection;
            var attributes = msg.attributes;
            var TouchEvent = egret.TouchEvent;
            var GemAttrInfoMdr = /** @class */ (function (_super) {
                __extends(GemAttrInfoMdr, _super);
                function GemAttrInfoMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", enhance.GemAttrInfoView);
                    _this.isEasyHide = true;
                    return _this;
                }
                GemAttrInfoMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.verticalCenter = 0;
                    this._view.horizontalCenter = 0;
                    this._listAttr = new ArrayCollection();
                    this._view.list_gemAttr.dataProvider = this._listAttr;
                    this._view.list_gemAttr.itemRenderer = mod.AttrItemRender;
                };
                GemAttrInfoMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                };
                GemAttrInfoMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var attrs = [];
                    for (var _i = 0, _a = this._showArgs; _i < _a.length; _i++) {
                        var gemInfo = _a[_i];
                        if (!gemInfo) {
                            continue;
                        }
                        var perAttr = gemInfo.attrs;
                        if (!perAttr) {
                            continue;
                        }
                        attrs.push(perAttr);
                    }
                    var totalAttr = game.TextUtil.calcAttrList(attrs);
                    var attr = new attributes();
                    attr.atk = Long.fromValue(0);
                    attr.armor = 0;
                    attr.max_hp = Long.fromValue(0);
                    attr.crit = 0;
                    if (totalAttr) {
                        for (var k in totalAttr) {
                            attr[k] = totalAttr[k];
                        }
                    }
                    var infos = game.TextUtil.getAttrTextInfos(attr);
                    this._listAttr.replaceAll(infos);
                    var power = totalAttr.showpower || 0;
                    this._view.power.setPowerValue(power);
                };
                GemAttrInfoMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return GemAttrInfoMdr;
            }(game.MdrBase));
            enhance.GemAttrInfoMdr = GemAttrInfoMdr;
            __reflect(GemAttrInfoMdr.prototype, "game.mod.enhance.GemAttrInfoMdr");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var GemMasterMdr = /** @class */ (function (_super) {
                __extends(GemMasterMdr, _super);
                function GemMasterMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", enhance.GemMasterView);
                    _this.isEasyHide = true;
                    return _this;
                }
                GemMasterMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.verticalCenter = 0;
                    this._view.horizontalCenter = 0;
                    this._list = new ArrayCollection();
                    this._view.list_attr.itemRenderer = enhance.StrengthMasterRender;
                    this._proxy = this.retProxy(187 /* Enhance */);
                    this._model = this._proxy.getModel();
                    this._view.secondPop.titleStr = game.getLanById("strengthen5" /* strengthen5 */);
                };
                GemMasterMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_gem_master_info" /* UPDATE_GEM_MASTER_INFO */, this.updateGemMstAttr, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn_use, TouchEvent.TOUCH_TAP, this.onClickGemUse);
                };
                GemMasterMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.img_icon.source = "btn_gem_master";
                    this._view.secondPop.updateTitleStr(game.getLanById("gem_master" /* gem_master */));
                    this._view.list_attr.dataProvider = this._list;
                    this.updateGemMstAttr();
                };
                GemMasterMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                GemMasterMdr.prototype.onClickGemUse = function () {
                    this._proxy.c2s_equip_gem_master();
                };
                //属性
                GemMasterMdr.prototype.updateGemMstAttr = function () {
                    var master = this._model.gemMaster;
                    if (!master) {
                        return;
                    }
                    this._view.power.setPowerValue(this._model.gemMasterPower);
                    this._view.lab_title.text = game.StringUtil.substitute(game.getLanById("gem_master_step" /* gem_master_step */), [master.level]);
                    var curLv = master.level;
                    this._view.btn_use.label = curLv > 0 ? game.getLanById("rank_up" /* rank_up */) : game.getLanById("active" /* active */);
                    var allLv = this._showArgs || 0;
                    this._view.lab_tip.text = game.getLanById("gem_tip1" /* gem_tip1 */) + "：" + allLv;
                    var data;
                    var masterDatas = [];
                    if (master.attrs && !!master.attrs.showpower) {
                        var txt1 = master.gem_lv || 0;
                        data = {
                            isCur: true,
                            masterLv: curLv,
                            attr: master.attrs,
                            reachTitle: game.getLanById("gem_lv_request" /* gem_lv_request */) + " " + game.TextUtil.addColor("+" + txt1, 2330156 /* GREEN */),
                            curReachCnt: allLv,
                            needReachCnt: master.gem_lv || 0
                        };
                        masterDatas.push(data);
                    }
                    if (master.next_attrs && !!master.next_attrs.showpower) {
                        var txt2 = master.next_gem_lv || 0;
                        data = {
                            isCur: false,
                            masterLv: curLv + 1,
                            attr: master.next_attrs,
                            reachTitle: game.getLanById("gem_lv_request" /* gem_lv_request */) + " " + game.TextUtil.addColor("+" + txt2, 2330156 /* GREEN */),
                            curReachCnt: allLv,
                            needReachCnt: master.next_gem_lv || 0
                        };
                        masterDatas.push(data);
                    }
                    this._list.replaceAll(masterDatas);
                    var nextLev = (master.next_gem_lv || 0);
                    this._view.btn_use.redPoint.visible = nextLev > 0 && allLv >= nextLev;
                    var notMax = master.next_attrs && !!master.next_attrs.showpower;
                    this._view.btn_use.visible = notMax;
                    this._view.img_max.visible = !notMax;
                };
                return GemMasterMdr;
            }(game.MdrBase));
            enhance.GemMasterMdr = GemMasterMdr;
            __reflect(GemMasterMdr.prototype, "game.mod.enhance.GemMasterMdr");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var delayCall = base.delayCall;
            var Handler = base.Handler;
            var GemMdr = /** @class */ (function (_super) {
                __extends(GemMdr, _super);
                function GemMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", enhance.GemView);
                    _this._equipPos = []; // 已有装备的位置
                    _this._showTips = false;
                    return _this;
                }
                GemMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(187 /* Enhance */);
                    this._model = this._proxy.getModel();
                    this._equipProxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                };
                GemMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_gem_info" /* UPDATE_GEM_INFO */, this.updateGemInfo, this);
                    this.onNt("update_gem_master_info" /* UPDATE_GEM_MASTER_INFO */, this.updateGemPower, this);
                    this.onNt("update_gem_one_key_inset" /* UPDATE_GEM_ONE_KEY_INSET */, this.inlaySuc, this);
                    this.onNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, this.mergeSuc, this);
                    this.onNt("on_bag_update_by_prop_type" /* ON_BAG_UPDATE_BY_PROP_TYPE */, this.mergeSuc, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.equip_list.list_equip, eui.ItemTapEvent.ITEM_TAP, this.onClickList);
                    addEventListener(this._view.btn_attr, TouchEvent.TOUCH_TAP, this.onClickAttr);
                    addEventListener(this._view.btn_master, TouchEvent.TOUCH_TAP, this.onClickGemMaster);
                    addEventListener(this._view.btn_merge, TouchEvent.TOUCH_TAP, this.onClickMerge);
                    addEventListener(this._view.btn_inlay, TouchEvent.TOUCH_TAP, this.onClickInlay);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClickGet);
                    for (var i = 0; i < 4; i++) {
                        var btn = this._view["btn_gem" + i];
                        btn.pos = i;
                        addEventListener(btn, TouchEvent.TOUCH_TAP, this.onClickGem);
                    }
                };
                GemMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.isInInlay = false;
                    this.updateInfo();
                };
                GemMdr.prototype.onHide = function () {
                    this._model.curGemPos = -1;
                    this._model.gemAttrs = null;
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                GemMdr.prototype.updateInfo = function () {
                    this._equipPos = [];
                    for (var _i = 0, EquipPosAry_5 = game.EquipPosAry; _i < EquipPosAry_5.length; _i++) {
                        var pos = EquipPosAry_5[_i];
                        var propData = this._equipProxy.getEquipByPos(pos);
                        if (!propData) {
                            continue;
                        }
                        this._equipPos.push(pos);
                        if (this._model.curGemPos == -1) { // 默认选中第一个装备
                            this._model.curGemPos = pos;
                        }
                    }
                    if (this._model.curGemPos == -1) {
                        this._model.curGemPos = 0;
                    }
                    this._view.equip_list.updateEquip();
                    this.updateGemPower();
                    delayCall(Handler.alloc(this, this.updateCurrentInfo));
                    var bagDatas = mod.BagUtil.getBagsByType(5 /* Gem */);
                    this._view.btn_merge.redPoint.visible = this._proxy.checkGemAKeySynHint(bagDatas);
                };
                GemMdr.prototype.updateGemInfo = function () {
                    this.updateCurrentInfo();
                    this.updateGemPower();
                    this.updateEquipGemHint();
                };
                GemMdr.prototype.update = function (time) {
                    this._tmpPos++;
                    var isCan = this._proxy.gemOneKeyInlayHint();
                    if (isCan && this._tmpPos < this._equipPos.length) {
                        var pos = this._equipPos[this._tmpPos];
                        this.inlayGem(pos);
                        return;
                    }
                    TimeMgr.removeUpdateItem(this);
                    this.isInInlay = false;
                    if (this._showTips) {
                        mod.ViewMgr.getIns().showSuccessTips(3 /* Xiangqian */);
                        egret.callLater(function () {
                            game.PromptBox.getIns().show("镶嵌成功");
                        }, this);
                        this._showTips = false;
                    }
                };
                /**
                 * 镶嵌操作
                 * @param pos
                 * @returns
                 */
                GemMdr.prototype.inlayGem = function (pos) {
                    if (this._equipPos.indexOf(pos) == -1 || pos > 9) {
                        return;
                    }
                    this._view.equip_list.updateSelByPos(pos);
                    this._model.curGemPos = pos;
                    this.updateCurrentInfo();
                    this._proxy.c2s_equip_operate_gem(2, pos);
                };
                //战力、总镶嵌
                GemMdr.prototype.updateGemPower = function () {
                    this._view.power.setPowerValue(this._model.gemPower);
                    this._allGemLv = this._model.gemTotalLv;
                    //宝石大师
                    var master = this._model.gemMaster;
                    var next = master && master.next_gem_lv ? master.next_gem_lv : 0;
                    this._view.pro_rate.show(this._allGemLv, next, false, 0, false);
                    this._view.pro_rate.labelDisplay.visible = false;
                    this._view.lab_pro.text = this._allGemLv + "/" + next;
                    var lv = master && master.level ? master.level : 0;
                    this._view.lab_step.text = lv + game.getLanById("tishi_43" /* tishi_43 */);
                    this._view.btn_master.redPoint.visible = next > 0 && this._allGemLv >= next;
                };
                //当前选中
                GemMdr.prototype.updateCurrentInfo = function () {
                    var equipData = this._equipProxy.getEquipByPos(this._model.curGemPos);
                    if (equipData) {
                        this._view.icon_gem.setData(equipData);
                    }
                    else {
                        this._view.icon_gem.updateIconImg("equip_icon_gray_" + this._model.curGemPos);
                    }
                    this._view.equip_list.updateSelByPos(this._model.curGemPos);
                    // 宝石属性
                    this._gemList = [];
                    var gem = null;
                    var hint = false;
                    var btn = null;
                    var icon = "";
                    var idx = 0;
                    var cfg = null;
                    for (var i = 0; i < 4; i++) {
                        gem = this._model.getGemHoleInfo(this._model.curGemPos, i);
                        hint = this._proxy.checkGemPosHint(equipData, gem, this._model.curGemPos, i);
                        btn = this._view["btn_gem" + i];
                        btn.redPoint.visible = hint;
                        idx = gem && gem.index ? gem.index : 0;
                        btn.img_add.visible = idx == 0;
                        if (idx > 0) { //有镶嵌
                            cfg = game.getConfigByNameId("prop.json" /* Prop */, idx);
                            if (cfg) {
                                icon = game.ResUtil.getUiProp(cfg.icon);
                            }
                            btn.currentState = "up";
                        }
                        else {
                            icon = "";
                            btn.currentState = "notSet";
                        }
                        btn.iconDisplay.source = icon;
                        this._gemList.push(gem);
                    }
                    this._view.btn_inlay.redPoint.visible = this._proxy.gemOneKeyInlayHint();
                };
                GemMdr.prototype.updateEquipGemHint = function () {
                    // let btnHint = false;
                    // for (let i: number = 0, len = this._view.list_equip.numChildren; i < len; i++) {
                    //     let equipIcon = this._view.list_equip.getChildAt(i) as StrengthEquipIcon;
                    //     let isRed = this._proxy.checkEquipGemHint(equipIcon.pos);
                    //     equipIcon.redPoint.visible = isRed;
                    //     if (isRed) {
                    //         btnHint = true;
                    //         break;
                    //     }
                    // }
                    // this._view.btn_merge.redPoint.visible = this._proxy.checkGemAKeySynHint(null);
                    // this._view.btn_inlay.redPoint.visible = btnHint;
                };
                // 镶嵌成功
                GemMdr.prototype.inlaySuc = function () {
                    this._showTips = true;
                    // if (!this.isInInlay) {
                    //     PromptBox.getIns().show("镶嵌成功");
                    //     ViewMgr.getIns().showSuccessTips(SuccessTipsType.Xiangqian);
                    // }
                    this.updateInfo();
                };
                // 合成成功
                GemMdr.prototype.mergeSuc = function (n) {
                    var types = n.body;
                    if (!types || !types.length || types.indexOf(5 /* Gem */) < 0) {
                        return;
                    }
                    this.updateCurrentInfo();
                    this.updateEquipGemHint();
                    var bagDatas = mod.BagUtil.getBagsByType(5 /* Gem */);
                    this._view.btn_merge.redPoint.visible = this._proxy.checkGemAKeySynHint(bagDatas);
                };
                GemMdr.prototype.onClickList = function (e) {
                    this._model.curGemPos = this._proxy.getPosByListIdx(e.itemIndex);
                    this.updateCurrentInfo();
                };
                /**
                 * 宝石属性
                 */
                GemMdr.prototype.onClickAttr = function () {
                    var allGemList = [];
                    for (var _i = 0, EquipPosAry_6 = game.EquipPosAry; _i < EquipPosAry_6.length; _i++) {
                        var pos = EquipPosAry_6[_i];
                        for (var i = 0; i < 4; i++) {
                            var gem = this._model.getGemHoleInfo(pos, i);
                            if (gem && gem.index > 0) {
                                allGemList.push(gem);
                            }
                        }
                    }
                    mod.ViewMgr.getIns().showSecondPop("43" /* Enhance */, "05" /* GemAttr */, allGemList);
                };
                /**
                 * 宝石大师
                 */
                GemMdr.prototype.onClickGemMaster = function () {
                    mod.ViewMgr.getIns().showSecondPop("43" /* Enhance */, "04" /* GemMaster */, this._allGemLv);
                };
                GemMdr.prototype.onClickGem = function (e) {
                    var btn = e.currentTarget;
                    // let gem: gem_data = this._model.getGemHoleInfo(this._model.curEqpItem.pos, btn.pos);
                    // if(!gem) {
                    //     return;
                    // }
                    mod.ViewMgr.getIns().showSecondPop("43" /* Enhance */, "03" /* GemSyn */, {
                        eqPos: this._model.curGemPos,
                        gemPos: btn.pos,
                    });
                };
                GemMdr.prototype.onClickGet = function () {
                    mod.ViewMgr.getIns().showGainWaysTips(1451000003 /* Baoshi */);
                };
                //一键合成
                GemMdr.prototype.onClickMerge = function () {
                    var isCan = this._proxy.checkGemAKeySynHint(null);
                    if (!isCan) {
                        game.PromptBox.getIns().show(game.getLanById("gem_tip0" /* gem_tip0 */));
                        return;
                    }
                    this._proxy.c2s_equip_gem_combine(null, null, null, 3);
                };
                //一键镶嵌
                GemMdr.prototype.onClickInlay = function () {
                    var isCan = this._proxy.gemOneKeyInlayHint();
                    if (!isCan) {
                        game.PromptBox.getIns().show(game.getLanById("no_suit_gem" /* no_suit_gem */));
                        return;
                    }
                    if (!this.isInInlay) {
                        this.isInInlay = true;
                        this._tmpPos = 0;
                        this.inlayGem(this._equipPos[this._tmpPos]);
                        TimeMgr.addUpdateItem(this, 200);
                    }
                };
                return GemMdr;
            }(game.EffectMdrBase));
            enhance.GemMdr = GemMdr;
            __reflect(GemMdr.prototype, "game.mod.enhance.GemMdr", ["base.UpdateItem"]);
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var GemSynMdr = /** @class */ (function (_super) {
                __extends(GemSynMdr, _super);
                function GemSynMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", enhance.GemSynView);
                    _this._curWearGemId = 0; // 当前槽位的镶嵌的宝石id
                    _this._selectIdx = -1;
                    _this.isEasyHide = true;
                    return _this;
                }
                GemSynMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.verticalCenter = 0;
                    this._view.horizontalCenter = 0;
                    this._bagList = new ArrayCollection();
                    this._view.list_bag.dataProvider = this._bagList;
                    this._view.list_bag.itemRenderer = enhance.GemSynRender;
                    this._proxy = this.retProxy(187 /* Enhance */);
                    this._model = this._proxy.getModel();
                };
                GemSynMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_gem_info" /* UPDATE_GEM_INFO */, this.updateGemBag, this);
                    this.onNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, this.onUpdateBag, this);
                    this.onNt("on_gem_attr_back" /* ON_GEM_ATTR_BACK */, this.updateCurAttr, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn_off, TouchEvent.TOUCH_TAP, this.onClickOff);
                    addEventListener(this._view.btn_merge, TouchEvent.TOUCH_TAP, this.onClickMerge);
                    addEventListener(this._view.btn_one_key_merge, TouchEvent.TOUCH_TAP, this.onClickOneKeyMerge);
                    addEventListener(this._view.list_bag, ItemTapEvent.ITEM_TAP, this.onClickGem);
                };
                GemSynMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateGemBag();
                };
                GemSynMdr.prototype.onHide = function () {
                    this._selectIdx = -1;
                    _super.prototype.onHide.call(this);
                };
                //背包列表
                GemSynMdr.prototype.updateGemBag = function () {
                    this._settedGem = this._model.getGemHoleInfo(this._showArgs.eqPos, this._showArgs.gemPos);
                    var prop = this._settedGem && this._settedGem.index ? game.PropData.create(this._settedGem.index) : null;
                    this._curWearGemId = this._model.getCurGemId(this._showArgs.eqPos, this._showArgs.gemPos);
                    var bagDatas = mod.BagUtil.getBagsByType(5 /* Gem */);
                    bagDatas.sort(this.sortGemBagList);
                    var list = prop ? [prop] : [];
                    list = list.concat(bagDatas);
                    // let b = this._proxy.getGemsByType(PropSubType4.Type2);
                    var list1 = [];
                    var selIdx = -1;
                    for (var i = 0, len = list.length; i < len; i++) {
                        var d = list[i];
                        var type2 = this._proxy.getGemType(d.index);
                        if (this._showArgs.gemPos == type2 - 1) {
                            list1.push(d);
                        }
                        if (selIdx == -1 && d.index == this._curWearGemId) {
                            selIdx = i;
                        }
                    }
                    if (!this._bagList.source.length) {
                        this._bagList.source = list1;
                    }
                    else {
                        this._bagList.replaceAll(list1);
                    }
                    if (this._selectIdx != -1) {
                        this._view.list_bag.selectedIndex = this._selectIdx;
                        this.updateCurSelect(this._selectIdx, this._curWearGemId);
                    }
                    else if (selIdx != -1) {
                        this._view.list_bag.selectedIndex = selIdx;
                        this.updateCurSelect(selIdx, this._curWearGemId);
                        this._selectIdx = selIdx;
                    }
                    else if (list1.length) {
                        this._view.list_bag.selectedIndex = 0;
                        this.updateCurSelect(0, list1[0].index);
                    }
                    else {
                        this.updateCurSelect();
                    }
                    this._isCanMergeOneKey = this._view.btn_one_key_merge.redPoint.visible =
                        (this._proxy.checkGemAKeySynHint(list1) && list1.length > 0);
                };
                GemSynMdr.prototype.sortGemBagList = function (a, b) {
                    return (a == null && b != null) || (a != null && b != null && b.index > a.index) ? 1 : -1;
                };
                //当前选中
                GemSynMdr.prototype.updateCurSelect = function (bagPos, gemId) {
                    if (bagPos === void 0) { bagPos = -1; }
                    if (gemId === void 0) { gemId = -1; }
                    var prop = this._bagList.source[bagPos];
                    if (bagPos == -1 || gemId == -1 || !prop) {
                        this._view.icon_tar.setData(null);
                        this.updateGemAttrShow(null);
                        this._view.lab_name.text = "";
                        this._view.btn_off.label = game.getLanById("set" /* set */);
                        this._view.btn_off.redPoint.visible = false;
                        this._view.btn_merge.redPoint.visible = false;
                        return;
                    }
                    this._curBagPos = bagPos;
                    this._view.icon_tar.setData(prop);
                    var isSetted = (bagPos == 0) && (gemId == this._curWearGemId) && this._curWearGemId > 0; // 是否镶嵌
                    this._view.btn_off.label = game.getLanById(isSetted ? "disboard" /* disboard */ : "set" /* set */);
                    var propCfg = prop ? prop.cfg : null;
                    this._view.lab_name.textFlow = propCfg ?
                        game.TextUtil.parseHtml(game.TextUtil.addColor(propCfg.name, game.ColorUtil.getColorByQuality(prop.quality))) : null;
                    var attr = propCfg ? this._proxy.getGemAttr(propCfg.index) : null;
                    if (attr) {
                        this.updateGemAttrShow(attr);
                    }
                    this._view.btn_off.redPoint.visible = isSetted ? false : this._proxy.gemSettledHint(this._settedGem, prop);
                    this._view.btn_merge.redPoint.visible = this._proxy.checkGemSynHint(prop);
                };
                GemSynMdr.prototype.updateGemAttrShow = function (attr) {
                    this._view.lab_des.textFlow = game.TextUtil.parseHtml(game.TextUtil.getAttrText(attr));
                };
                GemSynMdr.prototype.updateCurAttr = function (n) {
                    this.updateGemAttrShow(n.body);
                };
                GemSynMdr.prototype.onUpdateBag = function (n) {
                    var types = n && n.body;
                    if (!types || !types.length || types.indexOf(5 /* Gem */) < 0) {
                        return;
                    }
                    this.updateGemBag();
                };
                GemSynMdr.prototype.onClickOff = function () {
                    var prop = this._bagList.source[this._curBagPos];
                    if (!prop) {
                        return;
                    }
                    if (prop && (prop.index == this._curWearGemId) && this._curBagPos == 0) {
                        this._proxy.c2s_equip_gem_takeoff(this._showArgs.eqPos, this._showArgs.gemPos + 1);
                    }
                    else {
                        this._proxy.c2s_equip_gem_takeon(this._showArgs.eqPos, this._showArgs.gemPos + 1, prop.prop_id);
                    }
                };
                GemSynMdr.prototype.onClickMerge = function () {
                    var prop = this._bagList.source[this._curBagPos];
                    var isSetted = prop && (prop.index == this._curWearGemId);
                    if (isSetted) {
                        this._proxy.c2s_equip_gem_combine(this._showArgs.eqPos, this._showArgs.gemPos + 1, null, null);
                    }
                    else if (prop) {
                        this._proxy.c2s_equip_gem_combine(null, null, prop.index, 1);
                    }
                };
                GemSynMdr.prototype.onClickOneKeyMerge = function () {
                    if (!this._isCanMergeOneKey) {
                        game.PromptBox.getIns().show("暂无可合成的宝石");
                        return;
                    }
                    this._proxy.c2s_equip_gem_combine(null, this._showArgs.gemPos + 1, null, 2);
                };
                GemSynMdr.prototype.onClickGem = function (e) {
                    if (this._curBagPos == e.itemIndex) {
                        return;
                    }
                    this._selectIdx = e.itemIndex;
                    this.updateCurSelect(e.itemIndex, e.item.index);
                };
                return GemSynMdr;
            }(game.MdrBase));
            enhance.GemSynMdr = GemSynMdr;
            __reflect(GemSynMdr.prototype, "game.mod.enhance.GemSynMdr");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var StrengthMasterMdr = /** @class */ (function (_super) {
                __extends(StrengthMasterMdr, _super);
                function StrengthMasterMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", enhance.GemMasterView);
                    _this.isEasyHide = true;
                    return _this;
                }
                StrengthMasterMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.verticalCenter = 0;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(187 /* Enhance */);
                    this._model = this._proxy.getModel();
                    this._list = new ArrayCollection();
                    this._view.list_attr.itemRenderer = enhance.StrengthMasterRender;
                    this._view.list_attr.dataProvider = this._list;
                };
                StrengthMasterMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("update_strength_master_info" /* UPDATE_STRENGTH_MASTER_INFO */, this.initMaster, this);
                    addEventListener(this._view.btn_use, TouchEvent.TOUCH_TAP, this.onClickStrengthUse);
                };
                StrengthMasterMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.img_icon.source = "strength_master";
                    this.initMaster();
                    this.updateBtnHint();
                };
                StrengthMasterMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                /** 初始化数据*/
                StrengthMasterMdr.prototype.initMaster = function () {
                    this._view.power.setPowerValue(this._model.strengthMasterPower);
                    this._view.lab_title.text = game.StringUtil.substitute(game.getLanById("strength_master_step" /* strength_master_step */), [this._model.strengthMaster.level]);
                    var master = this._model.strengthMaster;
                    if (!master) {
                        return;
                    }
                    var reachCnt = this._model.strengthMasterReachCnt;
                    var curLvCfg = this._model.getLvCfg(this._proxy.getStrengthMasterLvId(master.level));
                    var nextLvCfg = this._model.getLvCfg(this._proxy.getStrengthMasterLvId(master.level + 1));
                    var data;
                    var masterDatas = [];
                    if (master.attrs && !!master.attrs.showpower) {
                        var txt1 = (curLvCfg ? curLvCfg.levelup_exp : "");
                        data = {
                            isCur: true,
                            masterLv: master.level,
                            attr: master.attrs,
                            reachTitle: game.getLanById("all_strength" /* all_strength */) + " " + game.TextUtil.addColor("+" + txt1, 2330156 /* GREEN */),
                            curReachCnt: this._model.strengthMinLv,
                            needReachCnt: (curLvCfg ? curLvCfg.levelup_exp : 0),
                        };
                        masterDatas.push(data);
                    }
                    if (master.next_attrs && !!master.next_attrs.showpower) {
                        var txt2 = (nextLvCfg ? nextLvCfg.levelup_exp : "");
                        data = {
                            isCur: false,
                            masterLv: master.level + 1,
                            attr: master.next_attrs,
                            reachTitle: game.getLanById("all_strength" /* all_strength */) + " " + game.TextUtil.addColor("+" + txt2, 2330156 /* GREEN */),
                            curReachCnt: this._model.strengthMinLv,
                            needReachCnt: (nextLvCfg ? nextLvCfg.levelup_exp : 0),
                        };
                        masterDatas.push(data);
                    }
                    this._list.replaceAll(masterDatas);
                    this._view.btn_use.label = game.getLanById("rank_up" /* rank_up */);
                    var str = !!master.reach_level ? game.getLanById("strengthen6" /* strengthen6 */) : game.getLanById("strength_total_lv" /* strength_total_lv */);
                    var max = !!master.reach_level;
                    this._view.btn_use.visible = max;
                    this._view.img_max.visible = !max;
                    this._view.lab_tip.text = str + reachCnt;
                    this.updateBtnHint();
                };
                /**
                 * 升阶按钮红点
                 * @returns
                 */
                StrengthMasterMdr.prototype.updateBtnHint = function () {
                    var hint = this._proxy.updateStrengthMasterBtnHint();
                    this._view.btn_use.setHint(hint);
                };
                /** 升阶*/
                StrengthMasterMdr.prototype.onClickStrengthUse = function () {
                    var isMax = this._model.isStrengthMasterMaxLv();
                    if (isMax) {
                        game.PromptBox.getIns().show(game.getLanById("max_step" /* max_step */));
                        return;
                    }
                    this._proxy.c2s_equip_strength_master();
                };
                return StrengthMasterMdr;
            }(game.MdrBase));
            enhance.StrengthMasterMdr = StrengthMasterMdr;
            __reflect(StrengthMasterMdr.prototype, "game.mod.enhance.StrengthMasterMdr");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var enhance;
        (function (enhance) {
            var TouchEvent = egret.TouchEvent;
            var StrengthMdr = /** @class */ (function (_super) {
                __extends(StrengthMdr, _super);
                function StrengthMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", enhance.StrengthView);
                    _this._costs = [];
                    return _this;
                }
                StrengthMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(187 /* Enhance */);
                    this._model = this._proxy.getModel();
                    this._equipProxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                };
                StrengthMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("equip_update_back" /* EQUIP_UPDATE_BACK */, this.onUpdateInfo, this);
                    this.onNt("update_strength_info" /* UPDATE_STRENGTH_INFO */, this.onUpdateInfo, this);
                    this.onNt("update_strength_master_info" /* UPDATE_STRENGTH_MASTER_INFO */, this.onUpdateMaster, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.equip_list.list_equip, eui.ItemTapEvent.ITEM_TAP, this.onClickList);
                    addEventListener(this._view.btn_strength, TouchEvent.TOUCH_TAP, this.onceStrength);
                    addEventListener(this._view.btn_one_key, TouchEvent.TOUCH_TAP, this.oneKeyStrength);
                    addEventListener(this._view.btn_master, TouchEvent.TOUCH_TAP, this.onClickMaster);
                };
                StrengthMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.lab_tip.text = game.getLanById("tishi_37" /* tishi_37 */);
                    this._model.lastPos = this._model.curStrengthPos = this.getInitPos();
                    this.onUpdateInfo();
                    this.addEftByParent("qianghuajiantou" /* QiangHuaJianTou */, this._view.group_eft);
                };
                StrengthMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                /** 更新强化*/
                StrengthMdr.prototype.onUpdateInfo = function () {
                    var info = this._model.strengthInfos;
                    if (!info || info.length == 0) {
                        return;
                    }
                    this._lvs = [];
                    for (var _i = 0, EquipPosAry_7 = game.EquipPosAry; _i < EquipPosAry_7.length; _i++) {
                        var pos = EquipPosAry_7[_i];
                        var info1 = this._model.getStrengthInfo(pos);
                        this._lvs.push(info1 ? info1.strength_lv : 0);
                    }
                    this._view.equip_list.updateEquip(this._lvs);
                    // if (this._model.curStrengthPos >= 0) {
                    //     this.updateCurrentInfo();
                    // }
                    this.updateCurrentInfo();
                    this.onUpdateMaster();
                    this.updateOneKeyBtnHint();
                    this.updateMasterBtnHint();
                };
                /** 更新大师*/
                StrengthMdr.prototype.onUpdateMaster = function () {
                    var master = this._model.strengthMaster;
                    if (master) {
                        this._view.lab_rate.text = master.level + game.getLanById("tishi_43" /* tishi_43 */);
                    }
                    if (!this._model.strengthPower.equals(0)) {
                        this._view.power.setPowerValue(this._model.strengthPower.add(this._model.strengthMasterPower));
                    }
                    else {
                        var _basicPower = Long.fromValue(0);
                        this._view.power.setPowerValue(_basicPower);
                    }
                    this.updateMasterBtnHint();
                };
                /** 更新需要强化部位*/
                StrengthMdr.prototype.updateCurrentInfo = function () {
                    var equip = this._model.getStrengthInfo(this._model.curStrengthPos);
                    if (!equip) {
                        return;
                    }
                    var selPoss = [];
                    if (this._operating) {
                        this._operating = false;
                        var minLvIdx = this.getMinLvIdx();
                        for (var i = 0, len = game.EquipPosAry.length; i < len; i++) {
                            if (i == minLvIdx) {
                                this._model.lastPos = game.EquipPosAry[i];
                            }
                            selPoss.push(i == minLvIdx);
                        }
                    }
                    else {
                        for (var _i = 0, EquipPosAry_8 = game.EquipPosAry; _i < EquipPosAry_8.length; _i++) {
                            var pos = EquipPosAry_8[_i];
                            selPoss.push(this._model.curStrengthPos == pos);
                        }
                    }
                    // this._view.equip_list.updateSelByPos(this._model.curStrengthPos);            // 强化后的选中有问题
                    this._view.equip_list.updateSel(selPoss);
                    // 属性
                    var s1 = equip.attrs && !!Object.keys(equip.attrs).length ?
                        game.TextUtil.addColor(game.TextUtil.getAttrText(equip.attrs, 2330156 /* GREEN */, " ", " "), 0x355973) :
                        game.TextUtil.addColor(game.TextUtil.getAttrText(equip.next_attrs, 2330156 /* GREEN */, " ", " ", 0), 0x355973);
                    this._view.lab_attr1.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(game.getLanById("tishi_38" /* tishi_38 */) + "：", 0xaf3d1a) + s1);
                    var s2 = "";
                    this._view.cost.visible = !!equip.next_attrs;
                    this._view.img_max.visible = !equip.next_attrs;
                    this._view.lab_attr2.visible = !!equip.next_attrs;
                    if (equip.next_attrs) {
                        s2 = game.TextUtil.addColor(game.TextUtil.getAttrText(equip.next_attrs, 2330156 /* GREEN */, " ", " "), 0x355973);
                        this._view.lab_attr2.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(game.getLanById("tishi_39" /* tishi_39 */) + "：", 0xaf3d1a) + s2);
                    }
                    // 消耗
                    var lvId = this._proxy.getStrengthLvId(equip.strength_lv + 1);
                    var cfg = game.getConfigByNameId("level.json" /* Level */, lvId);
                    if (cfg && cfg.goods_id && cfg.goods_id.length) {
                        this._costs = cfg.goods_id[0];
                        this._view.cost.updateShow(cfg.goods_id[0]);
                    }
                    this.updateStrengthBtnHint(this._model.curStrengthPos, cfg, !equip.next_attrs);
                };
                StrengthMdr.prototype.getMinLvIdx = function () {
                    var _lv;
                    for (var i = 0, len = game.EquipPosAry.length; i < len; i++) {
                        var pos = game.EquipPosAry[i];
                        var equip = this._equipProxy.getEquipByPos(pos);
                        if (!equip) {
                            continue;
                        }
                        if (_lv === undefined) {
                            _lv = this._lvs[i];
                        }
                        else {
                            _lv = Math.min(_lv, this._lvs[i]);
                        }
                    }
                    return this._lvs.indexOf(_lv);
                };
                StrengthMdr.prototype.getInitPos = function () {
                    var _pos = 0;
                    var _lv;
                    for (var _i = 0, EquipPosAry_9 = game.EquipPosAry; _i < EquipPosAry_9.length; _i++) {
                        var pos = EquipPosAry_9[_i];
                        var equip = this._equipProxy.getEquipByPos(pos);
                        if (!equip) {
                            continue;
                        }
                        var info = this._model.getStrengthInfo(pos);
                        if (!info) {
                            return _pos = pos;
                        }
                        if (_lv === undefined) {
                            _lv = info.strength_lv;
                        }
                        else {
                            if (info.strength_lv < _lv) {
                                _pos = pos;
                                _lv = info.strength_lv;
                            }
                        }
                    }
                    return _pos;
                };
                /** 通用红点事件监听 */
                StrengthMdr.prototype.onHintUpdate = function (n) {
                };
                /**
                 * 强化按钮红点
                 * @returns
                 */
                StrengthMdr.prototype.updateStrengthBtnHint = function (pos, cfg, isMax) {
                    var propData = this._equipProxy.getEquipByPos(pos); // 有无穿戴装备
                    if (!propData || !cfg) {
                        this._view.btn_strength.setHint(false);
                        return;
                    }
                    var isEnough = mod.BagUtil.checkPropCnt(cfg.goods_id[0][0], cfg.goods_id[0][1]);
                    var hint = isEnough && !isMax; // 消耗足够，且未满级
                    this._view.btn_strength.setHint(hint);
                };
                /**
                 * 一键强化按钮红点
                 * @returns
                 */
                StrengthMdr.prototype.updateOneKeyBtnHint = function () {
                    var hint = this._proxy.updateStrengthOneKeyBtnHint();
                    this._view.btn_one_key.setHint(hint);
                };
                /**
                 * 大师强化按钮红点
                 * @returns
                 */
                StrengthMdr.prototype.updateMasterBtnHint = function () {
                    var hint = this._proxy.updateStrengthMasterBtnHint();
                    this._view.btn_master.setHint(hint);
                };
                StrengthMdr.prototype.onClickList = function (e) {
                    var data1 = e.item;
                    if (!data1.prop) {
                        return;
                    }
                    this._model.lastPos = (data1.prop instanceof game.PropData) ? data1.prop.equipPos : data1.prop;
                    this.updateCurrentInfo();
                };
                StrengthMdr.prototype.onceStrength = function () {
                    var equip = this._equipProxy.getEquipByPos(this._model.curStrengthPos);
                    if (!equip) {
                        game.PromptBox.getIns().show(game.getLanById("gem_tip7" /* gem_tip7 */));
                        return;
                    }
                    if (this._costs.length > 1 && mod.BagUtil.checkPropCnt(this._costs[0], this._costs[1], 1 /* Dialog */)) {
                        this._proxy.c2s_equip_strength(1, this._model.curStrengthPos);
                        this._operating = true;
                    }
                };
                StrengthMdr.prototype.oneKeyStrength = function () {
                    if (this._costs.length > 1 && mod.BagUtil.checkPropCnt(this._costs[0], this._costs[1], 1 /* Dialog */)) {
                        this._proxy.c2s_equip_strength(2);
                        this._operating = true;
                    }
                };
                StrengthMdr.prototype.onClickMaster = function () {
                    mod.ViewMgr.getIns().showSecondPop("43" /* Enhance */, "02" /* StrengthMaster */);
                };
                return StrengthMdr;
            }(game.EffectMdrBase));
            enhance.StrengthMdr = StrengthMdr;
            __reflect(StrengthMdr.prototype, "game.mod.enhance.StrengthMdr");
        })(enhance = mod.enhance || (mod.enhance = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=enhance.js.map