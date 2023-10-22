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
        var role;
        (function (role) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var ItemTapEvent = eui.ItemTapEvent;
            var DressUpInfoMdr = /** @class */ (function (_super) {
                __extends(DressUpInfoMdr, _super);
                function DressUpInfoMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", role.DressUpInfoView);
                    _this._type = 1 /* Head */;
                    return _this;
                }
                //private _selectedIndex:number;
                DressUpInfoMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(44 /* DressUp */);
                    this._view.touchEnabled = false;
                    this._typeList = new ArrayCollection();
                    this._view.list_menu.itemRenderer = mod.TabSecondItem;
                    this._view.list_menu.dataProvider = this._typeList;
                    this._view.btn_act.setLabelStyle3({ size: 24, textColor: 0x8a5226 });
                    this._view.btn_dress.setLabelStyle3({ size: 28, textColor: 0x8a5226 });
                    this.onInitDressList();
                    this._view.grp_head.visible = true;
                    this._view.grp_bubble.visible = false;
                };
                DressUpInfoMdr.prototype.onInitDressList = function () {
                    this._view.dressList.dataProvider = this._dressCol = new ArrayCollection();
                    this._view.dressList.itemRenderer = role.DressUpItemIcon;
                    this._view.dressList.itemRendererSkinName = "skins.role.DressUpItemSkin";
                };
                DressUpInfoMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    // addEventListener(this._view.dressList, DressUpEvent.DRESS_UP_ITEM_CLICK_BACK, this.updateItemSel);
                    addEventListener(this._view.dressList, ItemTapEvent.ITEM_TAP, this.updateItemSel);
                    addEventListener(this._view.list_menu, ItemTapEvent.ITEM_TAP, this.updateItemType);
                    addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onTap);
                    addEventListener(this._view.btn_dress, egret.TouchEvent.TOUCH_TAP, this.onDress);
                    this.onNt("DRESS_UP_INFO_UPDATE" /* DRESS_UP_INFO_UPDATE */, this.updateView, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateAttr, this);
                };
                DressUpInfoMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initTypeList();
                    this.setListData();
                    this._view.dressList.selectedIndex = 0;
                    this.curIndex = this._dressCol.source[this._view.dressList.selectedIndex].index;
                    this._proxy.selectedIndex = this.curIndex;
                    this._proxy.curIdxList[this._type - 1] = this.curIndex;
                    this.updateDressInfo();
                };
                DressUpInfoMdr.prototype.initTypeList = function () {
                    var datas = this._proxy.getTypes(this._type);
                    var typeDatas = [];
                    for (var i = 0; i < datas.length; i++) {
                        var icon = "dress_type_" + datas[i];
                        typeDatas.push({ icon: icon });
                    }
                    this._typeList.source = typeDatas;
                    this._selType = datas[0];
                    this._view.list_menu.selectedIndex = 0;
                    // this._selIndex = 0;
                };
                DressUpInfoMdr.prototype.updateView = function () {
                    this.setListData();
                    this.updateDressInfo();
                };
                DressUpInfoMdr.prototype.updateDressInfo = function () {
                    this.updateShowRes();
                    this.updateAttr();
                    this.updateStateView();
                    this.updateTypeListHint();
                };
                DressUpInfoMdr.prototype.getDressUpCfg = function (idx) {
                    return game.getConfigByNameId("dress.json" /* DressUp */, idx);
                };
                DressUpInfoMdr.prototype.updateStateView = function () {
                    if (!this.curIndex) {
                        this._view.costItem.visible = this._view.btn_act.visible
                            = this._view.btn_dress.visible = this._view.img_state.visible = false;
                    }
                    //未激活不出现穿戴按钮
                    var info = this._proxy.getDressByIdx(this.curIndex);
                    var cfg = this.getDressUpCfg(this.curIndex);
                    if (!cfg) {
                        return;
                    }
                    var str = "" + cfg.name;
                    if (info && info.lv) {
                        str += " " + (info && info.lv || 0) + "\u661F";
                    }
                    this._view.lab_name.text = str;
                    //未激活不出现穿戴按钮
                    var isDress = this._proxy.head == this.curIndex || this._proxy.head_frame == this.curIndex
                        || this._proxy.chat_frame == this.curIndex;
                    this._view.btn_dress.visible = info && info.lv > 0 && !isDress;
                    this._view.btn_dress.label = game.getLanById("soul1" /* soul1 */);
                    var param = game.GameConfig.getParamConfigById("liaotianzhuangban_shangxian");
                    var isMax = info && info.lv == param.value; //已满星
                    this._view.img_state.visible = !info || info.lv < 1 || isMax;
                    if (!info || info.lv < 1) {
                        this._view.img_state.source = 'hongseweijihuo';
                        this._view.img_state.x = 452;
                    }
                    else if (isMax) {
                        this._view.img_state.source = 'lvseyimanxing';
                        this._view.img_state.x = 120;
                    }
                    this._view.costItem.visible = this._view.btn_act.visible = !isMax && !!cfg.material;
                    if (isMax || !cfg.material) {
                        return;
                    }
                    var cost = cfg.material[0];
                    this._view.costItem.data = cost;
                    var bagCnt = mod.BagUtil.getPropCntByIdx(cost[0]);
                    var costCnt = cost[1];
                    var color = bagCnt >= costCnt ? 8585074 /* GREEN */ : 16731212 /* RED */;
                    this._view.costItem.updateCnt(game.TextUtil.addColor("" + game.StringUtil.getHurtNumStr(costCnt), color));
                    this._view.btn_act.label = game.getLanById(info && info.lv ? "upstar" /* upstar */ : "active" /* active */);
                    this._view.btn_act.setHint(this._proxy.canActOrUpStar(cfg.index));
                    if (cfg.activation_param) {
                        var _proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                        var shenling = _proxy.getInfoByIndex(cfg.activation_param[0]);
                        var isActed = shenling && shenling.star >= cfg.activation_param[1];
                        if (!isActed) {
                            var cfg_shenling = game.getConfigByNameId("shenling.json" /* Shenling */, cfg.activation_param[0]);
                            this._view.lab_tips.text = "" + cfg_shenling.name + cfg.activation_param[1] + "\u661F\u53EF\u6FC0\u6D3B";
                            return;
                        }
                    }
                    this._view.lab_tips.text = "";
                };
                DressUpInfoMdr.prototype.setListData = function () {
                    // this._data = this._proxy.getDressData();
                    // let selectedIndex = this.computerNumber();
                    // this._dressCol.replaceAll(this._data);
                    var list = this._proxy.getDressList(this._type, this._selType);
                    this._dressCol.replaceAll(list);
                    // this.showTheIndex(0);
                };
                DressUpInfoMdr.prototype.isHint = function (data) {
                    if (!data) {
                        return false;
                    }
                    for (var i = 0; i < data.length; i++) {
                        var d = data[i];
                        if (!d) {
                            continue;
                        }
                        var ret = this._proxy.canActOrUpStar(data[i].index);
                        if (ret) {
                            this.curIndex = data[i].index;
                            this._proxy.selectedIndex = this.curIndex;
                            return true;
                        }
                    }
                    return false;
                };
                //处理数据
                DressUpInfoMdr.prototype.computerNumber = function () {
                    var selectedIndex = 0;
                    var ret = false;
                    for (var i = 0; i < this._data.length; i = i + 2) {
                        var d1 = this._data[i];
                        var d2 = this._data[i + 1];
                        if (this.isHint(d1) || this.isHint(d2)) {
                            ret = true;
                            break;
                        }
                        selectedIndex++;
                    }
                    if (!ret) {
                        this.curIndex = null;
                        this._proxy.selectedIndex = null;
                        return 0;
                    }
                    return selectedIndex;
                };
                //展示到特定的那一行
                DressUpInfoMdr.prototype.showTheIndex = function (selectedIndex) {
                    var self = this;
                    egret.callLater(function () {
                        mod.ScrollUtil.moveVToAssign(self._view.dressScroller, selectedIndex, 148, 10);
                    }, this);
                };
                // 界面显示装扮效果
                DressUpInfoMdr.prototype.updateShowRes = function () {
                    var defIcon = [this._proxy.head, this._proxy.head_frame, this._proxy.chat_frame];
                    var curIdxList = this._proxy.curIdxList;
                    for (var i = 0; i < 3; i++) {
                        var index = curIdxList[i] ? curIdxList[i] : defIcon[i];
                        this.showResByIndex(index);
                    }
                };
                // 更新显示装扮
                DressUpInfoMdr.prototype.showResByIndex = function (index) {
                    var _type = this._proxy.getDressTypeByIdx(index);
                    var _cfg = this.getDressUpCfg(index);
                    var _resStr = _cfg ? game.ResUtil.getDressUpIcon(index, game.RoleVo.ins.sex) : "";
                    if (_type == 3 /* Bubble */) {
                        this._view.img_bubble.source = _resStr;
                        this._view.lbl_bubbleName.text = _cfg.name;
                    }
                    else if (_type == 1 /* Head */) {
                        this._view.img_head.source = _resStr;
                    }
                    else {
                        this._view.img_frame.source = _resStr;
                    }
                };
                DressUpInfoMdr.prototype.updateAttr = function () {
                    var _attr = this._proxy.getDressAttrs(this.curIndex ? this.curIndex : null);
                    if (!_attr) {
                        var cfg = game.getConfigByNameId("dress.json" /* DressUp */, this.curIndex);
                        if (cfg && cfg.attr_id) {
                            _attr = mod.RoleUtil.getAttr(cfg.attr_id[0]);
                        }
                    }
                    this._view.power.setPowerValue(_attr && _attr.showpower || 0);
                    var txt = game.TextUtil.getAttrTextAdd(_attr);
                    this._view.lb_attr.textFlow = game.TextUtil.parseHtml(txt);
                };
                //升星/激活
                DressUpInfoMdr.prototype.onTap = function () {
                    var cfg = this.getDressUpCfg(this.curIndex);
                    if (!cfg || !cfg.material) {
                        return;
                    }
                    if (cfg.activation_param) {
                        var _proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                        var shenling = _proxy.getInfoByIndex(cfg.activation_param[0]);
                        var isActed = shenling && shenling.star >= cfg.activation_param[1];
                        if (!isActed) {
                            var cfg_shenling = game.getConfigByNameId("shenling.json" /* Shenling */, cfg.activation_param[0]);
                            game.PromptBox.getIns().show("" + cfg_shenling.name + cfg.activation_param[1] + "\u661F\u53EF\u6FC0\u6D3B");
                            return;
                        }
                    }
                    var cost = cfg.material[0];
                    if (!mod.BagUtil.checkPropCnt(cost[0], cost[1], 2 /* Text */)) {
                        return;
                    }
                    this._proxy.c2s_base_surface_lvup(Long.fromNumber(this.curIndex), Long.fromNumber(cost[0]));
                };
                DressUpInfoMdr.prototype.onDress = function () {
                    var dress = this._proxy.getDressByIdx(this.curIndex);
                    if (!dress || !dress.lv) {
                        return;
                    }
                    this._proxy.c2s_base_surface_change(Long.fromNumber(this.curIndex));
                };
                // 装扮item点击
                DressUpInfoMdr.prototype.updateItemSel = function (e) {
                    var cfg = e.item;
                    this.curIndex = cfg.index;
                    this._proxy.selectedIndex = this.curIndex;
                    this._proxy.curIdxList[this._type - 1] = this.curIndex;
                    // if (n && n.data) {
                    //     this.curIndex = n.data;
                    //     this._proxy.selectedIndex = this.curIndex;
                    // }
                    // this._dressCol.replaceAll(this._dressCol.source);
                    this.updateDressInfo();
                };
                DressUpInfoMdr.prototype.updateItemType = function (e) {
                    var datas = this._proxy.getTypes(this._type);
                    this._view.list_menu.selectedIndex = e.itemIndex;
                    this._selType = datas[e.itemIndex];
                    this.setListData();
                    this._view.dressList.selectedIndex = 0;
                    this.curIndex = this._dressCol.source[this._view.dressList.selectedIndex].index;
                    this._proxy.selectedIndex = this.curIndex;
                    this._proxy.curIdxList[this._type - 1] = this.curIndex;
                    this.updateDressInfo();
                };
                DressUpInfoMdr.prototype.updateTypeListHint = function () {
                    var datas = this._proxy.getTypes(this._type);
                    var list = this._typeList.source;
                    var len = list ? list.length : 0;
                    for (var i = 0; i < len; i++) {
                        var type2 = datas[i];
                        var btnData = list[i];
                        var hint = this._proxy.getTypeHint(this._type, type2);
                        btnData.strCount = this._proxy.getDressActLen(this._type, type2) + "/" + this._proxy.getDressLen(this._type, type2);
                        if (!!btnData.showHint != hint) { //过滤undefined!=false
                            btnData.showHint = hint;
                            this._typeList.itemUpdated(btnData);
                        }
                    }
                };
                DressUpInfoMdr.prototype.onHide = function () {
                    this._proxy.curIdxList.length = 0;
                    this.curIndex = null;
                    this._proxy.selectedIndex = null;
                    //this._selectedIndex = -1;
                    _super.prototype.onHide.call(this);
                };
                return DressUpInfoMdr;
            }(game.MdrBase));
            role.DressUpInfoMdr = DressUpInfoMdr;
            __reflect(DressUpInfoMdr.prototype, "game.mod.role.DressUpInfoMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TouchEvent = egret.TouchEvent;
            /**苍天进阶*/
            var SuitType1Mdr = /** @class */ (function (_super) {
                __extends(SuitType1Mdr, _super);
                function SuitType1Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", role.SuitView);
                    /**苍天，炎天*/
                    _this._type = 1 /* CangTian */;
                    /**1进阶，2强化*/
                    _this._skinType = 1;
                    return _this;
                }
                SuitType1Mdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                };
                SuitType1Mdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_fanli, TouchEvent.TOUCH_TAP, this.onClickFanli, this);
                    addEventListener(this._view.btn_compose, TouchEvent.TOUCH_TAP, this.onClickCompose, this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickSuitTips, this);
                    addEventListener(this._view.btn_oneKey, TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
                    addEventListener(this._view.btn_stengthen, TouchEvent.TOUCH_TAP, this.onClickMaster, this);
                    addEventListener(this._view.power.btn_desc, TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.btn_onekeydress, TouchEvent.TOUCH_TAP, this.onClickBtnOneKeyDress, this);
                    this.onNt("ON_SUIT_EQUIP_INFO_UPDATE" /* ON_SUIT_EQUIP_INFO_UPDATE */, this.updateView, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onUpdateHint, this);
                };
                SuitType1Mdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.img_suittype.source = "taozhuangtype" + this._type;
                    this.addEftByParent("lilian_standby_" + this._type + "_1", this._view.gr_eff); //todo
                    this.updateView();
                };
                SuitType1Mdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SuitType1Mdr.prototype.getPower = function () {
                    if (this._skinType == 1) {
                        return this._proxy.getPowerForAdvance(this._type);
                    }
                    return this._proxy.getPowerForStrengthen(this._type);
                };
                SuitType1Mdr.prototype.updateView = function () {
                    this._view.iconComp.updateView(this._type, this._skinType);
                    this._view.power.setPowerValue(this.getPower());
                    this.switchView(this._skinType);
                    if (this._skinType == 1) {
                        this.updateAdvanceView();
                    }
                    else {
                        this.updateStrengthenView();
                    }
                    this.updateComposeBtnHint();
                };
                SuitType1Mdr.prototype.updateComposeBtnHint = function () {
                    var hint = mod.HintMgr.getHint(this._proxy.model.composeHintPath[1 /* CangTian */])
                        || mod.HintMgr.getHint(this._proxy.model.composeHintPath[2 /* YanTian */]);
                    this._view.btn_compose.setHint(hint);
                };
                SuitType1Mdr.prototype.updateAdvanceView = function () {
                    var type = this._type;
                    var curSuitLv = this._proxy.getSuitLv(type);
                    this._view.btn_up.setLock(curSuitLv == 0);
                    this.addBmpFont(curSuitLv + '', game.BmpTextCfg[209 /* CommonStage */], this._view.gr_font0, true, 0.7, false, -6, true);
                    if (this._proxy.isMaxSuitLv(type)) {
                        this._view.lb_next.text = '';
                    }
                    else {
                        var len = this._proxy.getSuitLvNotLess(type, curSuitLv + 1);
                        var stageStr = curSuitLv > 0 ? '下一阶段:' : '激活条件:';
                        var str = stageStr + ("\u5168\u8EAB" + (curSuitLv + 1) + "\u9636\u4EE5\u4E0A")
                            + game.TextUtil.addColor("(" + len + "/8)", 16719376 /* RED */);
                        this._view.lb_next.textFlow = game.TextUtil.parseHtml(str);
                    }
                    this._view.btn_up.group_eft.removeChildren();
                    if (curSuitLv > 0) {
                        this.addEftByParent("taozhuangjineng" /* TaoZhuangJiNeng */, this._view.btn_up.group_eft);
                    }
                    this.updateBtnDress();
                };
                //一键穿戴按钮（部位穿戴后，才可一键穿戴更高阶的）
                SuitType1Mdr.prototype.updateBtnDress = function () {
                    this._view.btn_onekeydress.visible = this._proxy.canDressOneKey(this._type);
                    if (this._view.btn_onekeydress.visible) {
                        this._view.btn_onekeydress.setHint(true);
                    }
                };
                //一键穿戴
                SuitType1Mdr.prototype.onClickBtnOneKeyDress = function () {
                    var list = this._proxy.getDressAdvancedEquipIdList(this._type);
                    if (list && list.length) {
                        this._proxy.c2s_suit_equip_onekey(this._type, list);
                    }
                };
                SuitType1Mdr.prototype.updateStrengthenView = function () {
                    var info = this._proxy.getSuitTypeInfo(this._type);
                    var isAct = info && info.master_lv > 0;
                    var curLv = isAct ? info.master_lv : 0;
                    this._view.btn_stengthen.updateLv(curLv);
                    var curCfg = this._proxy.getSuitStrengthenCfg(this._type, isAct ? curLv : curLv + 1);
                    var str = game.getLanById("all_strength" /* all_strength */) + ("+" + curCfg.strength + " ");
                    if (isAct) {
                        str += game.TextUtil.addColor("(" + game.getLanById("actived" /* actived */) + ")", 2330156 /* GREEN */);
                    }
                    else {
                        str += game.TextUtil.addColor("(" + game.getLanById("not_active" /* not_active */) + ")", 16719376 /* RED */);
                    }
                    this._view.lb_strengthen.textFlow = game.TextUtil.parseHtml(str);
                    this._view.img_desc.source = "suit_desc_" + this._type;
                    var fontTxt = '+0%';
                    var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, curCfg.buff_id);
                    if (buffCfg) {
                        var idx = buffCfg.des.indexOf('+');
                        fontTxt = buffCfg.des.slice(idx);
                    }
                    this.addBmpFont(fontTxt, game.BmpTextCfg[209 /* CommonStage */], this._view.gr_font, true, 1, false, -6);
                    this._view.btn_oneKey.setHint(this._proxy.canStrengthenOneKey(this._type));
                    this._view.btn_stengthen.setHint(this._proxy.canMasterUp(this._type));
                };
                SuitType1Mdr.prototype.switchView = function (type) {
                    if (type === void 0) { type = 1; }
                    this._view.gr_advance.visible = type == 1;
                    this._view.gr_strengthen.visible = !this._view.gr_advance.visible;
                };
                SuitType1Mdr.prototype.onClickFanli = function () {
                    mod.ViewMgr.getIns().showView("06" /* Role */, "15" /* SuitGiftMain */, [0, this._type + 1]);
                };
                SuitType1Mdr.prototype.onClickCompose = function () {
                    mod.ViewMgr.getIns().showSecondPop("06" /* Role */, "09" /* SuitCompose */);
                };
                //套装阶数tips
                SuitType1Mdr.prototype.onClickSuitTips = function () {
                    this.showView("08" /* SuitStageTips */, this._type);
                };
                SuitType1Mdr.prototype.onClickOneKey = function () {
                    if (!this._proxy.canStrengthenOneKey(this._type, true)) {
                        return;
                    }
                    this._proxy.c2s_suit_equip_lvup(1, this._type, null);
                };
                //套装阶数强化tips
                SuitType1Mdr.prototype.onClickMaster = function () {
                    this.showView("10" /* SuitStageStrengthenTips */, this._type);
                };
                SuitType1Mdr.prototype.onClickAttr = function () {
                    var info = this._proxy.getSuitTypeInfo(this._type);
                    var attr;
                    if (info && info.suit_attr && game.TextUtil.getAttrOrderKeys(info.suit_attr).length > 0) {
                        attr = info.suit_attr;
                    }
                    if (info && info.equips) {
                        var attrList = [attr];
                        for (var _i = 0, _a = info.equips; _i < _a.length; _i++) {
                            var equip = _a[_i];
                            if (equip && equip.attr) {
                                attrList.push(equip.attr);
                            }
                        }
                        attr = game.TextUtil.calcAttrList(attrList);
                    }
                    var attr_id;
                    if (!attr) {
                        var cfg = this._proxy.getSuitStageCfg(this._type, 1);
                        if (cfg && cfg.attr_id) {
                            attr_id = cfg.attr_id;
                        }
                    }
                    this.showView("14" /* SuitAttrTips */, {
                        title: game.getLanById("allmap3" /* allmap3 */),
                        attrTitle: game.getLanById("xiandan_tips9" /* xiandan_tips9 */),
                        attr: attr,
                        attr_id: attr_id
                    });
                };
                SuitType1Mdr.prototype.onUpdateHint = function (n) {
                    var data = n.body;
                    if (!data) {
                        return;
                    }
                    //合成按钮红点
                    if (data.node == mod.HintMgr.getType(this._proxy.model.composeHintPath[1 /* CangTian */])
                        || data.node == mod.HintMgr.getType(this._proxy.model.composeHintPath[2 /* YanTian */])) {
                        this.updateComposeBtnHint();
                    }
                };
                return SuitType1Mdr;
            }(game.EffectMdrBase));
            role.SuitType1Mdr = SuitType1Mdr;
            __reflect(SuitType1Mdr.prototype, "game.mod.role.SuitType1Mdr");
            /**苍天强化*/
            var SuitType1StrengthenMdr = /** @class */ (function (_super) {
                __extends(SuitType1StrengthenMdr, _super);
                function SuitType1StrengthenMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**苍天，炎天*/
                    _this._type = 1 /* CangTian */;
                    /**1进阶，2强化*/
                    _this._skinType = 2;
                    return _this;
                }
                SuitType1StrengthenMdr.prototype.onClickAttr = function () {
                    var info = this._proxy.getSuitTypeInfo(this._type);
                    var attr;
                    if (info && info.master_attr && game.TextUtil.getAttrOrderKeys(info.master_attr).length > 0) {
                        attr = info.master_attr;
                    }
                    if (info && info.equips) {
                        var attrList = [attr];
                        for (var _i = 0, _a = info.equips; _i < _a.length; _i++) {
                            var equip = _a[_i];
                            if (equip && equip.lv_attr) {
                                attrList.push(equip.lv_attr);
                            }
                        }
                        attr = game.TextUtil.calcAttrList(attrList);
                    }
                    var attr_id;
                    if (!attr) {
                        var cfg = this._proxy.getSuitStrengthenCfg(this._type, 1);
                        if (cfg && cfg.attr_id) {
                            attr_id = cfg.attr_id;
                        }
                    }
                    this.showView("14" /* SuitAttrTips */, {
                        title: game.getLanById("strength_attr" /* strength_attr */),
                        attrTitle: game.getLanById("xiandan_tips9" /* xiandan_tips9 */),
                        attr: attr,
                        attr_id: attr_id
                    });
                };
                return SuitType1StrengthenMdr;
            }(SuitType1Mdr));
            role.SuitType1StrengthenMdr = SuitType1StrengthenMdr;
            __reflect(SuitType1StrengthenMdr.prototype, "game.mod.role.SuitType1StrengthenMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TouchEvent = egret.TouchEvent;
            var attributes = msg.attributes;
            var facade = base.facade;
            //锻造
            var SuitType3ForgeMdr = /** @class */ (function (_super) {
                __extends(SuitType3ForgeMdr, _super);
                function SuitType3ForgeMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", role.SuitForgeView);
                    /**套装类型*/
                    _this._type = 3 /* HaoTian */;
                    return _this;
                }
                SuitType3ForgeMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                };
                SuitType3ForgeMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_master, TouchEvent.TOUCH_TAP, this.onClickMaster, this);
                    addEventListener(this._view.btn_forge, TouchEvent.TOUCH_TAP, this.onClickForge, this);
                    addEventListener(this._view.power.btn_desc, TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    addEventListener(this._view.icon_target, TouchEvent.TOUCH_TAP, this.onClickTargetIcon, this);
                    this.onNt("ON_SUIT_EQUIP_INFO_UPDATE_TWO" /* ON_SUIT_EQUIP_INFO_UPDATE_TWO */, this.updateView, this);
                    this.onNt("ON_SUIT_DUANZAO_SWITCH_ICON_INFO" /* ON_SUIT_DUANZAO_SWITCH_ICON_INFO */, this.onUpdateMiddleView, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateAttr, this);
                };
                SuitType3ForgeMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._curIcon = null;
                    //SuitType.HaoTian锻造界面特殊，有别于其他两个
                    this._view.currentState = this._type == 3 /* HaoTian */ ? 'normal' : 'special';
                    this.updateView();
                };
                SuitType3ForgeMdr.prototype.updateView = function () {
                    if (!this._curIcon) {
                        this._view.iconList.updateView2(this._type, 2 /* DuanZao */); //3表示锻造
                    }
                    else {
                        // this.updateMiddleView();
                        this._view.iconList.updateMinForgeLv();
                        this._view.iconList.updateListHint();
                    }
                    this.updatePower();
                };
                SuitType3ForgeMdr.prototype.updatePower = function () {
                    var power = this._proxy.getPower2(this._type, 2 /* DuanZao */);
                    this._view.power.setPowerValue(power);
                };
                SuitType3ForgeMdr.prototype.onClickForge = function () {
                    if (!this._curIcon || !this._proxy.canForge(this._type, this._curIcon.pos, true)) {
                        return;
                    }
                    this._proxy.c2s_suit_two_equip_lvup(0, 2 /* DuanZao */, this._type, this._curIcon.pos);
                };
                SuitType3ForgeMdr.prototype.onUpdateMiddleView = function (n) {
                    var data = n.body;
                    if (!data || data.type != this._type) {
                        return;
                    }
                    this._curIcon = data;
                    this.updateMiddleView();
                };
                //点击后，更新中间的展示
                SuitType3ForgeMdr.prototype.updateMiddleView = function () {
                    if (!this._curIcon) {
                        return;
                    }
                    var data = this._curIcon;
                    if (!data.isAct) {
                        this.updateNotDressView();
                        return;
                    }
                    var stageInfo = this._proxy.getPosEquipInfo2(data.type, data.pos, 1 /* JinJie */);
                    var operInfo = this._proxy.getPosEquipInfo2(data.type, data.pos, 2 /* DuanZao */);
                    var prop = game.PropData.create(data.index);
                    //强制设置基础属性
                    if (operInfo && operInfo.attr) {
                        prop.update2(operInfo.attr, 'regular_attrs');
                    }
                    this._view.icon_target.setData(prop, 3 /* NotTips */);
                    //【进阶x阶】名字+锻造lv
                    var cfg = game.getConfigById(data.index);
                    this._view.lb_name.text = "\u3010" + (stageInfo && stageInfo.lv || 0) + "\u9636\u3011" + (cfg ? cfg.name : '') + " +" + (operInfo && operInfo.lv || 0);
                    //消耗
                    var cost = this._proxy.getCost(data.type, 2 /* DuanZao */, operInfo ? operInfo.lv : 0);
                    if (cost) {
                        this._view.cost.updateShow(cost);
                    }
                    else {
                        //没有下一级消耗，满阶展示
                        this._view.cost.updateShow(this._proxy.getCost(data.type, 2 /* DuanZao */, operInfo && operInfo.lv - 1));
                    }
                    this._view.btn_forge.setHint(this._proxy.canForge(this._type, data.pos));
                    if (data.type == 3 /* HaoTian */) {
                        this.updateNormalView();
                    }
                    else {
                        this.updateSpecialView();
                    }
                };
                //套装类型4,5 special
                SuitType3ForgeMdr.prototype.updateSpecialView = function () {
                    var data = this._curIcon;
                    var operInfo = this._proxy.getPosEquipInfo2(data.type, data.pos, 2 /* DuanZao */);
                    //锻造属性
                    if (operInfo && operInfo.attr) {
                        this._view.attrComp0.updateAttrAdd(operInfo.attr);
                    }
                    else {
                        var lvCfg = this._proxy.getLevelCfg(data.type, 2 /* DuanZao */, 1);
                        this._notActAttrId = lvCfg ? lvCfg.level_attr : 0;
                        var attr = mod.RoleUtil.getAttr(this._notActAttrId);
                        if (attr) {
                            this.updateAttrView(attr, null);
                        }
                    }
                    //锻造效果
                    var typeCfg = this._proxy.getSuitTypeCfg(data.type);
                    var partId = typeCfg ? typeCfg.suit_part[2 /* DuanZao */ - 1][data.pos] : 0;
                    var partCfg = this._proxy.getSuitPartCfg(partId);
                    if (!partCfg) {
                        this._view.attrComp1.updateAttr(new attributes());
                        return;
                    }
                    var str = '';
                    if (partCfg.attribute_id) {
                        var attrId = partCfg.attribute_id[operInfo ? operInfo.lv - 1 : 0];
                        this.attrIds = attrId;
                        var attrList = mod.RoleUtil.getAttrList(attrId);
                        str = game.TextUtil.getAttrTextAdd(game.TextUtil.calcAttrList(attrList));
                    }
                    else if (partCfg.buff_id) {
                        var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, partCfg.buff_id[0][0]);
                        str = buffCfg ? buffCfg.des : '';
                    }
                    else if (partCfg.skill_id) {
                        var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, partCfg.skill_id[0][0]);
                        str = skillCfg ? skillCfg.describe : '';
                    }
                    this._view.lb_attr0.textFlow = game.TextUtil.parseHtml(str);
                };
                //锻造效果是属性的
                SuitType3ForgeMdr.prototype.updateAttr = function () {
                    if (this.attrIds) {
                        var attrList = mod.RoleUtil.getAttrList(this.attrIds);
                        if (attrList) {
                            var str = game.TextUtil.getAttrTextAdd(game.TextUtil.calcAttrList(attrList));
                            this._view.lb_attr0.textFlow = game.TextUtil.parseHtml(str);
                            this.attrIds = null;
                        }
                    }
                    if (this._notActAttrId) {
                        this.onUpdateAttrView();
                    }
                };
                //套装类型3 normal
                SuitType3ForgeMdr.prototype.updateNormalView = function () {
                    var data = this._curIcon;
                    var operInfo = this._proxy.getPosEquipInfo2(data.type, data.pos, 2 /* DuanZao */);
                    if (operInfo) {
                        this.updateAttrView(operInfo.attr, operInfo.next_attr);
                    }
                    else {
                        var lvCfg = this._proxy.getLevelCfg(data.type, 2 /* DuanZao */, 1); //锻造0级，读取等级表1级属性展示
                        this._notActAttrId = lvCfg ? lvCfg.level_attr : 0;
                        var attr = mod.RoleUtil.getAttr(this._notActAttrId);
                        if (attr) {
                            var curAttr = game.TextUtil.calcAttr(attr, 0);
                            this.updateAttrView(curAttr, attr);
                        }
                    }
                    // 锻造大师属性
                    var masterLv = this._proxy.getMasterLv();
                    var paramCfg = game.GameConfig.getParamConfigById('suit_forge_master');
                    var val = masterLv > 0 ? paramCfg.value[masterLv - 1] : 0;
                    this._view.btn_master.updateLv(masterLv);
                    this._view.lb_attr.textFlow = game.TextUtil.parseHtml("\u795E\u88C5\u5C5E\u6027" + game.TextUtil.addColor("+" + (val / 10000).toFixed(1) + "%", 8585074 /* GREEN */));
                };
                /**未锻造时候，读取等级表1级属性展示*/
                SuitType3ForgeMdr.prototype.onUpdateAttrView = function () {
                    var attr = mod.RoleUtil.getAttr(this._notActAttrId);
                    if (!attr) {
                        return;
                    }
                    var curAttr = game.TextUtil.calcAttr(attr, 0);
                    this.updateAttrView(curAttr, attr);
                    this._notActAttrId = null;
                };
                // normal 状态下，更新属性显示
                SuitType3ForgeMdr.prototype.updateAttrView = function (attr, next_attr) {
                    var data = this._curIcon;
                    if (attr) {
                        this._view.attrComp0.updateAttrAdd(this._proxy.getFilterAttr(data.type, data.pos, attr));
                    }
                    if (this._type != 3 /* HaoTian */) {
                        return;
                    }
                    if (next_attr && Object.keys(next_attr).length) {
                        this._view.attrComp1.updateAttrAdd(this._proxy.getFilterAttr(data.type, data.pos, next_attr));
                        this._view.attrComp1.visible = true;
                        this._view.img_max.visible = false;
                    }
                    else {
                        this._view.attrComp1.visible = false;
                        this._view.img_max.visible = true; //锻造满级了
                    }
                };
                // 点击未未穿戴的icon，中间部分显示效果
                SuitType3ForgeMdr.prototype.updateNotDressView = function () {
                    this._view.icon_target.data = null;
                    this._view.lb_name.text = '';
                };
                SuitType3ForgeMdr.prototype.onClickMaster = function () {
                    this.showView("13" /* SuitForgeMaster */, this._type);
                };
                SuitType3ForgeMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._curIcon = null;
                    this._notActAttrId = null;
                    this.attrIds = null;
                };
                SuitType3ForgeMdr.prototype.onClickAttr = function () {
                    var attr = this._proxy.getAttrByTypeAndOperType(this._type, 2 /* DuanZao */);
                    this.showView("14" /* SuitAttrTips */, {
                        title: '属性总览',
                        attrTitle: '激活属性',
                        attr: attr
                    });
                };
                SuitType3ForgeMdr.prototype.onClickTargetIcon = function () {
                    if (!this._curIcon) {
                        return;
                    }
                    facade.showView("06" /* Role */, "12" /* SuitEquipTips2 */, {
                        data: this._curIcon,
                        operType: 2 /* DuanZao */
                    });
                };
                return SuitType3ForgeMdr;
            }(game.MdrBase));
            role.SuitType3ForgeMdr = SuitType3ForgeMdr;
            __reflect(SuitType3ForgeMdr.prototype, "game.mod.role.SuitType3ForgeMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TouchEvent = egret.TouchEvent;
            //进阶
            var SuitType3Mdr = /** @class */ (function (_super) {
                __extends(SuitType3Mdr, _super);
                function SuitType3Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", role.SuitView2);
                    /**套装类型*/
                    _this._type = 3 /* HaoTian */;
                    /**操作类型*/
                    _this._operType = 1 /* JinJie */;
                    return _this;
                }
                SuitType3Mdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                };
                SuitType3Mdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickReward, this);
                    addEventListener(this._view.btn_do, TouchEvent.TOUCH_TAP, this.onClickOneKey, this);
                    addEventListener(this._view.power.btn_desc, TouchEvent.TOUCH_TAP, this.onClickAttr, this);
                    this.onNt("ON_SUIT_EQUIP_INFO_UPDATE_TWO" /* ON_SUIT_EQUIP_INFO_UPDATE_TWO */, this.updateView, this);
                };
                SuitType3Mdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.addEftByParent("lilian_standby_" + this._type + "_1", this._view.gr_eff); //todo
                    this.updateView();
                };
                SuitType3Mdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SuitType3Mdr.prototype.updateView = function () {
                    var operType = this._operType;
                    this._view.btn_reward.visible = operType == 1 /* JinJie */; //进阶展示进阶返利
                    this._view.btn_do.label = operType == 1 /* JinJie */ ? game.getLanById("advent_god_cue7" /* advent_god_cue7 */) : "一键精铸";
                    this._view.iconList.updateView2(this._type, operType);
                    this.updatePower();
                    var hint;
                    if (operType == 1 /* JinJie */) {
                        hint = this._proxy.canAdvanceOneKey(this._type);
                    }
                    else {
                        hint = this._proxy.canCastOneKey(this._type);
                    }
                    this._view.btn_do.setHint(hint);
                };
                SuitType3Mdr.prototype.updatePower = function () {
                    var power = this._proxy.getPower2(this._type, this._operType);
                    this._view.power.setPowerValue(power);
                };
                SuitType3Mdr.prototype.onClickReward = function () {
                    mod.ViewMgr.getIns().showView("06" /* Role */, "15" /* SuitGiftMain */, [0, this._type + 1]);
                };
                SuitType3Mdr.prototype.onClickOneKey = function () {
                    var operType = this._operType;
                    if (operType == 1 /* JinJie */) {
                        if (this._proxy.canAdvanceOneKey(this._type, true)) {
                            this._proxy.c2s_suit_two_equip_lvup(1, operType, this._type, null); //一键进阶
                        }
                    }
                    else {
                        if (this._proxy.canCastOneKey(this._type, true)) {
                            this._proxy.c2s_suit_two_equip_lvup(1, operType, this._type, null); //一键精铸
                        }
                    }
                };
                SuitType3Mdr.prototype.onClickAttr = function () {
                    var attr = this._proxy.getAttrByTypeAndOperType(this._type, this._operType);
                    this.showView("14" /* SuitAttrTips */, {
                        title: '属性总览',
                        attrTitle: '激活属性',
                        attr: attr
                    });
                };
                return SuitType3Mdr;
            }(game.EffectMdrBase));
            role.SuitType3Mdr = SuitType3Mdr;
            __reflect(SuitType3Mdr.prototype, "game.mod.role.SuitType3Mdr");
            //精铸
            var SuitType3CastMdr = /** @class */ (function (_super) {
                __extends(SuitType3CastMdr, _super);
                function SuitType3CastMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**套装类型*/
                    _this._type = 3 /* HaoTian */;
                    /**操作类型*/
                    _this._operType = 3 /* JingZhu */;
                    return _this;
                }
                return SuitType3CastMdr;
            }(SuitType3Mdr));
            role.SuitType3CastMdr = SuitType3CastMdr;
            __reflect(SuitType3CastMdr.prototype, "game.mod.role.SuitType3CastMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitType3SecondMdr = /** @class */ (function (_super) {
                __extends(SuitType3SecondMdr, _super);
                function SuitType3SecondMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**套装类型*/
                    _this._suitType = 3 /* HaoTian */;
                    _this._btnData = [
                        {
                            btnType: "01" /* Btn1 */,
                            icon: 'jinjie',
                            mdr: role.SuitType3Mdr,
                            bg: "suit_type1_bg",
                            openIdx: 1041670128 /* SuitType3 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "03" /* SuitType3 */, "01" /* Btn1 */]
                        },
                        {
                            btnType: "02" /* Btn2 */,
                            icon: 'duanzao',
                            mdr: role.SuitType3ForgeMdr,
                            bg: 'suit_duanzao_bg',
                            param: 1041670252 /* SuitForge3 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "03" /* SuitType3 */, "02" /* Btn2 */]
                        },
                        {
                            btnType: "03" /* Btn3 */,
                            icon: 'jingzhu',
                            mdr: role.SuitType3CastMdr,
                            bg: "suit_type1_bg",
                            param: 1041670131 /* SuitCast3 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "03" /* SuitType3 */, "03" /* Btn3 */]
                        }
                    ];
                    return _this;
                }
                SuitType3SecondMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                };
                SuitType3SecondMdr.prototype.onTabCheck = function (index) {
                    var data = this._btnList.source[index];
                    if (data && data.param && index != 0 && !mod.ViewMgr.getIns().checkViewOpen(data.param, true)) {
                        return false;
                    }
                    if (index == 1 && !this._proxy.checkOpenForge(this._suitType)) {
                        game.PromptBox.getIns().show("\u672A\u6709\u7A7F\u6234\u7684\u88C5\u5907");
                        return false;
                    }
                    return _super.prototype.onTabCheck.call(this, index);
                };
                return SuitType3SecondMdr;
            }(mod.WndSecondMdr));
            role.SuitType3SecondMdr = SuitType3SecondMdr;
            __reflect(SuitType3SecondMdr.prototype, "game.mod.role.SuitType3SecondMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TouchEvent = egret.TouchEvent;
            /**
             * 套装类型3,4,5的tips
             */
            var SuitEquipTipsMdr2 = /** @class */ (function (_super) {
                __extends(SuitEquipTipsMdr2, _super);
                function SuitEquipTipsMdr2() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.SuitEquipTipsView);
                    _this._isDressed = false; //用于穿戴成功后判断关闭此界面
                    _this.isEasyHide = true;
                    return _this;
                }
                SuitEquipTipsMdr2.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                };
                SuitEquipTipsMdr2.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct, this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp, this);
                    this.onNt("ON_SUIT_EQUIP_INFO_UPDATE_TWO" /* ON_SUIT_EQUIP_INFO_UPDATE_TWO */, this.updateView, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.onUpdateAttr, this);
                };
                SuitEquipTipsMdr2.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    if (!this._attrItem3) {
                        this._attrItem3 = new mod.BaseAttrItemAdd();
                    }
                    if (!this._suitItem) {
                        this._suitItem = new mod.BaseDescItem();
                    }
                    if (!this._nextStageItem) {
                        this._nextStageItem = new mod.BaseDescItem();
                    }
                    if (!this._buffItem) {
                        this._buffItem = new mod.BaseDescItem();
                    }
                    this._isDressed = false;
                    this.updateTopView();
                    this.updateView();
                    if (this._showArgs.operType == 2 /* DuanZao */) {
                        this._view.gr_act.visible = this._view.gr_up.visible = this._view.img_line.visible = false;
                    }
                };
                SuitEquipTipsMdr2.prototype.updateTopView = function () {
                    var data = this._showArgs.data;
                    this._view.tips.updateShow(data.index);
                };
                SuitEquipTipsMdr2.prototype.updateView = function () {
                    var data = this._showArgs.data;
                    var operType = this._showArgs.operType;
                    var operData = this._proxy.getPosEquipInfo2(data.type, data.pos, operType);
                    //穿戴成功后关闭界面
                    if (this._isDressed && operData) {
                        this.hide();
                        return;
                    }
                    this.doAdd(this._attrItem3, 0);
                    if (operData) {
                        this._view.gr_act.visible = false;
                        this._view.gr_up.visible = this._view.img_line.visible = true;
                        this._posEquip = operData;
                        var lvCfg = this._proxy.getLevelCfg(data.type, operType, operData && operData.lv || 0);
                        if (lvCfg && lvCfg.goods_id) {
                            this._view.costItem.updateShow(lvCfg.goods_id[0]);
                        }
                        var power = 0;
                        if (operData) {
                            power = operData.attr && operData.attr.showpower && operData.attr.showpower.toNumber() || 0;
                            this._attrItem3.updateShow(operData.attr, operData.next_attr);
                        }
                        this.updatePower(power);
                        this._view.btn_up.label = operType == 3 /* JingZhu */ ? '精铸' : '进阶';
                    }
                    else {
                        //激活，自己读取等级表配置展示消耗和属性
                        this._view.gr_up.visible = false;
                        this._view.gr_act.visible = this._view.img_line.visible = true;
                        this._view.icon_act.setData([data.index, 1]); //消耗本身
                        var lvCfg = this._proxy.getLevelCfg(data.type, operType, 1); //1阶属性
                        if (lvCfg && lvCfg.level_attr) {
                            var attr = mod.RoleUtil.getAttr(lvCfg.level_attr);
                            this.updateBaseAttrView(attr);
                            this._actAttrId = lvCfg.level_attr;
                        }
                        this._isDressed = true;
                    }
                    this.updateBtnHint();
                    this.updateSuitItem();
                };
                SuitEquipTipsMdr2.prototype.updateBtnHint = function () {
                    var hint = false;
                    var data = this._showArgs.data;
                    var operType = this._showArgs.operType;
                    if (this._posEquip) {
                        if (operType == 1 /* JinJie */) {
                            hint = this._proxy.canAdvance(data.type, data.pos);
                        }
                        else if (operType == 3 /* JingZhu */) {
                            hint = this._proxy.canCast(data.type, data.pos);
                        }
                        this._view.btn_up.setHint(hint);
                    }
                    else {
                        hint = this._proxy.canDress(data.index, false, operType);
                        this._view.btn_act.setHint(hint);
                    }
                };
                //更新套装组件
                SuitEquipTipsMdr2.prototype.updateSuitItem = function () {
                    var data = this._showArgs.data;
                    var operType = this._showArgs.operType;
                    var typeCfg = this._proxy.getSuitTypeCfg(data.type);
                    var partList = typeCfg ? typeCfg.suit_part[operType - 1] : []; //对应的套装组成
                    if (!partList) {
                        DEBUG && console.error(game.SuitTypeName[data.type] + "\u5957\u88C5\u6CA1\u6709\u6B64" + data.pos + "\u90E8\u4F4D\u7684\u5957\u88C5\u7EC4\u6210");
                        return;
                    }
                    var partId = partList[0]; //此部位所属套装index
                    var cfg; //对应的套装组成配置
                    for (var _i = 0, partList_1 = partList; _i < partList_1.length; _i++) {
                        var idx = partList_1[_i];
                        cfg = this._proxy.getSuitPartCfg(idx);
                        var posList = cfg && cfg.pos ? cfg.pos : [0]; //特殊处理，0不导出
                        if (posList.indexOf(data.pos) > -1) {
                            partId = idx;
                            break;
                        }
                    }
                    this.doAdd(this._suitItem);
                    var operInfo = this._proxy.getSuitOperInfo(data.type, operType);
                    var minLv; //套装部位的最低等级
                    var posMap = {};
                    var suitPosList = cfg.pos || [0]; //当前部位对应的套装的部位组成，特殊处理0不导出
                    var actCnt = 0; //套装部位组成中已激活的部位长度
                    if (operInfo && operInfo.attr_list) {
                        for (var _a = 0, _b = operInfo.attr_list; _a < _b.length; _a++) {
                            var item = _b[_a];
                            if (suitPosList.indexOf(item.pos) < 0) {
                                continue;
                            }
                            if (!minLv) {
                                minLv = item.lv;
                            }
                            posMap[item.pos] = item.lv;
                            actCnt++;
                        }
                    }
                    var showNextLv; //下一阶的属性展示
                    if (!minLv || actCnt != suitPosList.length) {
                        minLv = 1; //有未激活的部位
                        showNextLv = 1;
                    }
                    else {
                        showNextLv = minLv + 1;
                    }
                    var str = '';
                    var satisfyCnt = 0;
                    for (var i = 0; i < suitPosList.length; i++) {
                        var pos = suitPosList[i];
                        if (posMap[pos] >= minLv) {
                            satisfyCnt++;
                        }
                        var txt = "[" + minLv + "\u9636]" + this.getEquipName(data.type, operType, suitPosList[i]);
                        if (posMap[pos] != null) {
                            str += game.TextUtil.addColor(txt, 8585074 /* GREEN */);
                        }
                        else {
                            str += game.TextUtil.addColor(txt, 7835024 /* GRAY */);
                        }
                        if (i != suitPosList.length - 1) {
                            str += '\n';
                        }
                    }
                    var itemName = minLv + "\u9636" + cfg.name + "(" + satisfyCnt + "/" + suitPosList.length + ")";
                    this._suitItem.updateShow(str, itemName);
                    var showNextAttr;
                    if (cfg.attribute_id) {
                        if (showNextLv >= cfg.attribute_id.length) {
                            showNextAttr = cfg.attribute_id[cfg.attribute_id.length - 1]; //最后一阶
                        }
                        else {
                            showNextAttr = cfg.attribute_id[showNextLv - 1];
                        }
                    }
                    this._nextStageLv = showNextLv;
                    this._nextStageAttrIds = showNextAttr;
                    if (showNextAttr && showNextAttr.length) {
                        this.updateNextStageItem(mod.RoleUtil.getAttrList(showNextAttr));
                    }
                    if (cfg.buff_id) {
                        var buffId = cfg.buff_id[minLv - 1][0];
                        var buffCfg = game.getConfigByNameId("buff.json" /* Buff */, buffId);
                        if (buffCfg) {
                            this.doAdd(this._buffItem);
                            this._buffItem.updateShow(buffCfg.des, buffCfg.name);
                        }
                    }
                    else if (cfg.skill_id) {
                        var skillId = cfg.skill_id[minLv - 1][0];
                        var skillCfg = game.getConfigByNameId("battle_skill.json" /* Skill */, skillId);
                        if (skillCfg) {
                            this.doAdd(this._buffItem);
                            this._buffItem.updateShow(skillCfg.describe, skillCfg.name);
                        }
                    }
                };
                //下一阶套装效果属性
                SuitEquipTipsMdr2.prototype.updateNextStageItem = function (attr) {
                    if (!attr) {
                        return;
                    }
                    var attrStr = game.TextUtil.getAttrTextAdd(game.TextUtil.calcAttrList(attr));
                    var title = game.SuitTypeName[this._showArgs.data.type] + "\u5957\u88C5 " + this._nextStageLv + "\u9636\u6548\u679C";
                    this._nextStageItem.updateShow(attrStr, title);
                    // this.doAdd(this._nextStageItem); //todo 不展示下一阶套装效果属性
                };
                SuitEquipTipsMdr2.prototype.getEquipName = function (type, operType, pos) {
                    if (operType == 2 /* DuanZao */) {
                        operType = 1 /* JinJie */;
                    }
                    var index = this._proxy.getIndex2(type, pos, operType);
                    var equipCfg = game.getConfigByNameId("equipment.json" /* Equip */, index);
                    return equipCfg && equipCfg.name || '';
                };
                //更新需要动态加载的属性
                SuitEquipTipsMdr2.prototype.onUpdateAttr = function () {
                    if (this._actAttrId) {
                        this.updateBaseAttrView(mod.RoleUtil.getAttr(this._actAttrId));
                        this._actAttrId = null;
                    }
                    if (this._nextStageAttrIds) {
                        this.updateNextStageItem(mod.RoleUtil.getAttrList(this._nextStageAttrIds));
                        this._nextStageAttrIds = null;
                    }
                };
                //更新基础属性，未激活时候
                SuitEquipTipsMdr2.prototype.updateBaseAttrView = function (attr) {
                    if (!attr) {
                        this.updatePower(0);
                        return;
                    }
                    var data = this._showArgs.data;
                    attr = this._proxy.getFilterAttr(data.type, data.pos, attr);
                    this._attrItem3.updateShow(attr, null, game.getLanById("ywl_baseAttr" /* ywl_baseAttr */));
                    this.updatePower(attr && attr.showpower || 0);
                };
                SuitEquipTipsMdr2.prototype.updatePower = function (power) {
                    this._view.power.setPowerValue(power);
                };
                SuitEquipTipsMdr2.prototype.onClickAct = function () {
                    if (this._posEquip) {
                        return;
                    }
                    var data = this._showArgs.data;
                    if (this._showArgs.operType == 3 /* JingZhu */) {
                        if (!this._proxy.canDress(data.index, true, 3 /* JingZhu */)) {
                            return;
                        }
                        //精铸的激活，就是提升等级
                        this._proxy.c2s_suit_two_equip_lvup(0, 3 /* JingZhu */, data.type, data.pos);
                    }
                    else {
                        if (!this._proxy.canDress(data.index, true)) {
                            return;
                        }
                        this._proxy.c2s_suit_two_equip_takeon(data.type, data.pos, data.index);
                    }
                };
                SuitEquipTipsMdr2.prototype.onClickUp = function () {
                    var data = this._showArgs.data;
                    var operType = this._showArgs.operType;
                    var canUp = false;
                    if (operType == 1 /* JinJie */) {
                        canUp = this._proxy.canAdvance(data.type, data.pos, true);
                    }
                    else if (operType == 3 /* JingZhu */) {
                        canUp = this._proxy.canCast(data.type, data.pos, true);
                    }
                    canUp && this._proxy.c2s_suit_two_equip_lvup(0, this._showArgs.operType, data.type, data.pos);
                };
                SuitEquipTipsMdr2.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._posEquip = null;
                    this._actAttrId = null;
                    this._isDressed = false;
                    this.doRemove(this._attrItem3);
                    this._attrItem3 = null;
                    this.doRemove(this._suitItem);
                    this._suitItem = null;
                    this.doRemove(this._nextStageItem);
                    this._nextStageItem = null;
                    this.doRemove(this._buffItem);
                    this._buffItem = null;
                };
                SuitEquipTipsMdr2.prototype.doRemove = function (item) {
                    if (item && item.parent) {
                        item.parent.removeChild(item);
                    }
                };
                SuitEquipTipsMdr2.prototype.doAdd = function (item, idx) {
                    if (this._view.gr_attr.contains(item)) {
                        return;
                    }
                    if (idx != null) {
                        this._view.gr_attr.addChildAt(item, idx);
                    }
                    else {
                        this._view.gr_attr.addChild(item);
                    }
                };
                return SuitEquipTipsMdr2;
            }(game.MdrBase));
            role.SuitEquipTipsMdr2 = SuitEquipTipsMdr2;
            __reflect(SuitEquipTipsMdr2.prototype, "game.mod.role.SuitEquipTipsMdr2");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var DressUpInfo2Mdr = /** @class */ (function (_super) {
                __extends(DressUpInfo2Mdr, _super);
                function DressUpInfo2Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._type = 2 /* Frame */;
                    return _this;
                }
                DressUpInfo2Mdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.grp_head.visible = true;
                    this._view.grp_bubble.visible = false;
                };
                return DressUpInfo2Mdr;
            }(role.DressUpInfoMdr));
            role.DressUpInfo2Mdr = DressUpInfo2Mdr;
            __reflect(DressUpInfo2Mdr.prototype, "game.mod.role.DressUpInfo2Mdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var ArrayCollection = eui.ArrayCollection;
            var DressUpInfo3Mdr = /** @class */ (function (_super) {
                __extends(DressUpInfo3Mdr, _super);
                function DressUpInfo3Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._type = 3 /* Bubble */;
                    return _this;
                }
                DressUpInfo3Mdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.grp_head.visible = false;
                    this._view.grp_bubble.visible = true;
                };
                DressUpInfo3Mdr.prototype.onInitDressList = function () {
                    this._view.dressList.dataProvider = this._dressCol = new ArrayCollection();
                    this._view.dressList.itemRenderer = role.DressUpItemIcon;
                    this._view.dressList.itemRendererSkinName = "skins.role.DressUpItem2Skin";
                };
                return DressUpInfo3Mdr;
            }(role.DressUpInfoMdr));
            role.DressUpInfo3Mdr = DressUpInfo3Mdr;
            __reflect(DressUpInfo3Mdr.prototype, "game.mod.role.DressUpInfo3Mdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var RoleMod = /** @class */ (function (_super) {
                __extends(RoleMod, _super);
                function RoleMod() {
                    return _super.call(this, "06" /* Role */) || this;
                }
                RoleMod.prototype.initCmd = function () {
                };
                RoleMod.prototype.initModel = function () {
                    this.regProxy(5 /* Role */, role.RoleProxy);
                    this.regProxy(29 /* Title */, role.TitleProxy);
                    this.regProxy(44 /* DressUp */, role.DressUpProxy);
                    this.regProxy(76 /* Suit */, role.SuitProxy);
                    this.regProxy(258 /* XiuxianNvpu */, role.XiuxianNvpuProxy);
                };
                RoleMod.prototype.initView = function () {
                    this.regMdr("01" /* RoleMain */, role.RoleMainMdr);
                    this.regMdr("04" /* RoleAttrTips */, role.RoleAttrTipsMdr);
                    this.regMdr("05" /* RoleEquipTips */, role.RoleEquipTipsMdr);
                    this.regMdr("06" /* SuitMain */, role.SuitMainMdr);
                    this.regMdr("07" /* SuitEquipTips */, role.SuitEquipTipsMdr);
                    this.regMdr("08" /* SuitStageTips */, role.SuitStageTipsMdr);
                    this.regMdr("09" /* SuitCompose */, role.SuitComposeMdr);
                    this.regMdr("10" /* SuitStageStrengthenTips */, role.SuitStageStrengthenTipsMdr);
                    this.regMdr("11" /* SuitEquipStrengthenTips */, role.SuitEquipStrengthenTipsMdr);
                    this.regMdr("12" /* SuitEquipTips2 */, role.SuitEquipTipsMdr2);
                    this.regMdr("13" /* SuitForgeMaster */, role.SuitForgeMasterMdr);
                    this.regMdr("14" /* SuitAttrTips */, role.SuitAttrTipsMdr);
                    this.regMdr("15" /* SuitGiftMain */, role.SuitGiftMainMdr);
                    this.regMdr("16" /* Wing */, role.WingMainMdr);
                    this.regMdr("17" /* Weapon */, role.WeaponMainMdr);
                    this.regMdr("18" /* Body */, role.BodyMainMdr);
                    this.regMdr("20" /* RoleGod */, role.RoleGodMdr);
                    this.regMdr("21" /* RoleGodDesc */, role.RoleGodDescMdr);
                    this.regMdr("22" /* SuitEquipBagTips */, role.SuitEquipBagTipsMdr);
                    //修仙女仆
                    this.regMdr("23" /* XiuxianNvpuBuy */, role.XiuxianNvpuBuyMdr);
                    this.regMdr("24" /* XiuxianNvpuGrowMain */, role.XiuxianNvpuGrowMainMdr);
                    this.regMdr("25" /* XiuxianNvpuGiftMain */, role.XiuxianNvpuGiftMainMdr);
                    this.regMdr("26" /* XiuxianNvpuLike */, role.XiuxianNvpuLikeMdr);
                    this.regMdr("27" /* XiuxianNvpuOfflineSetting */, role.XiuxianNvpuOfflineSettingMdr);
                    this.regMdr("28" /* XiuxianNvpuOnlineSetting */, role.XiuxianNvpuOnlineSettingMdr);
                    this.regMdr("29" /* XiuxianNvpuResult */, role.XiuxianNvpuResultMdr);
                };
                return RoleMod;
            }(game.ModBase));
            role.RoleMod = RoleMod;
            __reflect(RoleMod.prototype, "game.mod.role.RoleMod");
            gso.modCls.push(RoleMod);
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var RoleModel = /** @class */ (function () {
                function RoleModel() {
                    var _a;
                    this.privilegeList = []; //特权集合
                    /**根据功能开启id 获取红点路径 */
                    this.openIdxToHintType = (_a = {},
                        _a[1041670124 /* Wing */] = ["06" /* Role */, "01" /* RoleMain */, "16" /* Wing */],
                        _a[1041670125 /* Body */] = ["06" /* Role */, "01" /* RoleMain */, "18" /* Body */],
                        _a[1041670123 /* Weapon */] = ["06" /* Role */, "01" /* RoleMain */, "17" /* Weapon */],
                        _a[1041670135 /* RoleHuanhua */] = ["06" /* Role */, "01" /* RoleMain */ + 1041670135 /* RoleHuanhua */],
                        _a[1041670134 /* RoleCollect */] = ["06" /* Role */, "01" /* RoleMain */ + 1041670134 /* RoleCollect */],
                        _a[1041670126 /* SuitType1 */] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */],
                        _a[1041670240 /* XiuxianNvpu */] = ["06" /* Role */, "01" /* RoleMain */, "24" /* XiuxianNvpuGrowMain */],
                        _a);
                }
                return RoleModel;
            }());
            role.RoleModel = RoleModel;
            __reflect(RoleModel.prototype, "game.mod.role.RoleModel");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var s2c_sync_role_attr = msg.s2c_sync_role_attr;
            var TimeMgr = base.TimeMgr;
            var s2c_on_new_day = msg.s2c_on_new_day;
            var s2c_privilege_info = msg.s2c_privilege_info;
            var RoleProxy = /** @class */ (function (_super) {
                __extends(RoleProxy, _super);
                function RoleProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RoleProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                };
                RoleProxy.prototype.initialize = function () {
                    this._model = new role.RoleModel();
                    game.RoleVo.setIns(this._roleVo = new game.RoleVo());
                    this.onProto(s2c_sync_role_attr, this.s2c_sync_role_attr, this);
                    this.onProto(s2c_on_new_day, this.s2c_on_new_day, this);
                    this.onProto(s2c_privilege_info, this.s2c_privilege_info, this);
                };
                RoleProxy.prototype.s2c_on_new_day = function (n) {
                    var msg = n.body;
                    this.updateDay(msg.server_day, msg.login_day);
                    this.sendNt("on_server_day_update" /* ON_SERVER_DAY_UPDATE */);
                };
                RoleProxy.prototype.updateDay = function (serverDay, loginDay) {
                    this._model.serverDay = serverDay;
                    this._model.loginDay = loginDay;
                };
                Object.defineProperty(RoleProxy.prototype, "serverDay", {
                    //开服天数，RoleUtil直接取
                    get: function () {
                        return this._model.serverDay;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RoleProxy.prototype, "loginDay", {
                    //登录天数，RoleUtil直接取
                    get: function () {
                        return this._model.loginDay;
                    },
                    enumerable: true,
                    configurable: true
                });
                RoleProxy.prototype.s2c_sync_role_attr = function (n) {
                    var msg = n.body;
                    if (!msg || (!msg.attrs && !msg.propertys)) {
                        return;
                    }
                    var updateKeys = this.updateRole(msg.propertys, msg.attrs);
                    if (updateKeys.length) {
                        this.sendNt("on_role_update" /* ON_ROLE_UPDATE */, updateKeys);
                    }
                };
                RoleProxy.prototype.updateRole = function (prop, attr) {
                    if (!prop && !attr) {
                        return null;
                    }
                    //this._roleVo.backup();
                    var keys = [];
                    if (prop) {
                        this._roleVo.update(prop, keys);
                    }
                    if (attr) {
                        this._roleVo.update(attr, keys);
                    }
                    return keys;
                };
                RoleProxy.prototype.getLeftTime = function (endDay) {
                    var openDate = new Date(this._model.openServerTime * 1000);
                    openDate.setDate(openDate.getDate() + endDay);
                    openDate.setHours(0, 0, 0, 0);
                    return openDate.getTime() - TimeMgr.time.serverTime;
                };
                /**根据功能开启id 获取红点路径 */
                RoleProxy.prototype.getOpenIdxToHintType = function (openIdx) {
                    return this._model.openIdxToHintType[openIdx] || null;
                };
                //主动推送特权
                RoleProxy.prototype.s2c_privilege_info = function (n) {
                    var msg = n.body;
                    if (msg.list) {
                        var addKey = [];
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            if (this.hasPrivilege(info.key)) {
                                continue;
                            }
                            addKey.push(info.key);
                        }
                        this._model.privilegeList = msg.list;
                        if (addKey.length) {
                            this.sendNt("on_role_privilege_update" /* ON_ROLE_PRIVILEGE_UPDATE */, addKey);
                        }
                    }
                };
                //是否有特权
                RoleProxy.prototype.hasPrivilege = function (key) {
                    for (var _i = 0, _a = this._model.privilegeList; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (key == info.key) {
                            return true;
                        }
                    }
                    return false;
                };
                //特权值
                RoleProxy.prototype.getPrivilegeValue = function (key) {
                    for (var _i = 0, _a = this._model.privilegeList; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (key == info.key) {
                            return info.value;
                        }
                    }
                    return 0;
                };
                return RoleProxy;
            }(game.ProxyBase));
            role.RoleProxy = RoleProxy;
            __reflect(RoleProxy.prototype, "game.mod.role.RoleProxy", ["game.mod.IRoleProxy", "base.IProxy"]);
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var Handler = base.Handler;
            var facade = base.facade;
            var BaseRoleEquipTipsView = /** @class */ (function (_super) {
                __extends(BaseRoleEquipTipsView, _super);
                function BaseRoleEquipTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.BaseRoleEquipTipsSkin";
                    return _this;
                }
                //顶部信息
                BaseRoleEquipTipsView.prototype.updateTopInfo = function (data) {
                    if (!data || !data.cfg) {
                        return;
                    }
                    var cfg = data.cfg;
                    this.lb_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(cfg.name + ("+" + (data.zengfu_lv || 0)), game.ColorUtil.getColorByQuality2(cfg.quality)));
                    this.icon.data = data;
                    this.qualityTips.updateShow(cfg.quality);
                    this.lb_type.text = game.getLanById(game.EquipPosName[cfg.index % 10]);
                };
                BaseRoleEquipTipsView.prototype.updatePower = function (power) {
                    this.power.setPowerValue(power);
                };
                //底部信息
                BaseRoleEquipTipsView.prototype.updateBottomInfo = function (data) {
                    if (!data) {
                        return;
                    }
                    //显示兑换
                    this.exchangeTips.updateExchangeTips(data, Handler.alloc(this, function () {
                        facade.sendNt("on_view_hide" /* ON_VIEW_HIDE */);
                    }));
                    var showExchange = this.exchangeTips.visible;
                    this.baseGain.visible = this.lb_desc_bottom.visible = !showExchange;
                    if (!showExchange) {
                        // 获取途径
                        var cfg = data.cfg;
                        if (cfg && cfg.gain_id) {
                            this.baseGain.updateShow(cfg.gain_id);
                        }
                        this.lb_desc_bottom.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(game.getLanById("equip_tips_lb" /* equip_tips_lb */), 0x4dfd28));
                    }
                };
                return BaseRoleEquipTipsView;
            }(eui.Component));
            role.BaseRoleEquipTipsView = BaseRoleEquipTipsView;
            __reflect(BaseRoleEquipTipsView.prototype, "game.mod.role.BaseRoleEquipTipsView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var RoleAttrTipsView = /** @class */ (function (_super) {
                __extends(RoleAttrTipsView, _super);
                function RoleAttrTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.NewRoleAttrTipsSkin";
                    return _this;
                }
                return RoleAttrTipsView;
            }(eui.Component));
            role.RoleAttrTipsView = RoleAttrTipsView;
            __reflect(RoleAttrTipsView.prototype, "game.mod.role.RoleAttrTipsView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var RoleEquipTipsView = /** @class */ (function (_super) {
                __extends(RoleEquipTipsView, _super);
                function RoleEquipTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.NewRoleEquipTipsSkin";
                    return _this;
                }
                return RoleEquipTipsView;
            }(eui.Component));
            role.RoleEquipTipsView = RoleEquipTipsView;
            __reflect(RoleEquipTipsView.prototype, "game.mod.role.RoleEquipTipsView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var RoleGemItem = /** @class */ (function (_super) {
                __extends(RoleGemItem, _super);
                function RoleGemItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.RoleGemItemSkin";
                    return _this;
                }
                /**
                 * 更新宝石属性
                 */
                RoleGemItem.prototype.updateView = function (propData, isSelf) {
                    if (!propData) {
                        return;
                    }
                    this._propData = propData;
                    this._isSelf = isSelf;
                    var gem_lv = 0; //宝石等级，所镶嵌的宝石等级相加
                    var gemInfo = this.getGems();
                    var map = {};
                    if (gemInfo) {
                        for (var _i = 0, gemInfo_1 = gemInfo; _i < gemInfo_1.length; _i++) {
                            var gem = gemInfo_1[_i];
                            map[gem.gem_type] = gem;
                            gem_lv += gem.index % 100;
                        }
                    }
                    // 1-4: 白虎，玄武，青龙，朱雀
                    for (var i = 1; i <= 4; i++) {
                        var info = map[i];
                        if (info && info.index) {
                            var propCfg = game.GameConfig.getPropConfigById(info.index);
                            var title = game.TextUtil.addColor(propCfg ? propCfg.name : '', game.ColorUtil.getColorByQuality2(propCfg.quality));
                            var attrStr = game.TextUtil.getAttrTextAdd(info.attrs, 8585074 /* GREEN */);
                            attrStr = attrStr.replace(/\n/g, '  ');
                            this["gemItem" + i].updateShow(title, attrStr);
                        }
                        else {
                            this["gemItem" + i].updateShow("[" + game.getLanById("unset" /* unset */) + "]", '');
                        }
                    }
                    this.nameItem.setTitle(game.getLanById("gem_attr" /* gem_attr */) + ("  (" + (game.getLanById("gem_level" /* gem_level */) + gem_lv) + ")"));
                };
                /**宝石列表 */
                RoleGemItem.prototype.getGems = function () {
                    if (this._isSelf) {
                        var pos = this._propData.index % 10; //装备部位
                        var enhanceProxy = game.getProxy("43" /* Enhance */, 187 /* Enhance */);
                        return enhanceProxy.getGemInfo(pos);
                    }
                    return this._propData.gems || [];
                };
                return RoleGemItem;
            }(eui.Component));
            role.RoleGemItem = RoleGemItem;
            __reflect(RoleGemItem.prototype, "game.mod.role.RoleGemItem");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var RoleGodDescItem = /** @class */ (function (_super) {
                __extends(RoleGodDescItem, _super);
                function RoleGodDescItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RoleGodDescItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                };
                return RoleGodDescItem;
            }(eui.ItemRenderer));
            role.RoleGodDescItem = RoleGodDescItem;
            __reflect(RoleGodDescItem.prototype, "game.mod.role.RoleGodDescItem");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var RoleGodDescView = /** @class */ (function (_super) {
                __extends(RoleGodDescView, _super);
                function RoleGodDescView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.RoleGodDescSkin";
                    _this.touchEnabled = false;
                    return _this;
                }
                return RoleGodDescView;
            }(eui.Component));
            role.RoleGodDescView = RoleGodDescView;
            __reflect(RoleGodDescView.prototype, "game.mod.role.RoleGodDescView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var RoleGodView = /** @class */ (function (_super) {
                __extends(RoleGodView, _super);
                function RoleGodView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.RoleGodSkin";
                    _this.touchEnabled = false;
                    return _this;
                }
                return RoleGodView;
            }(eui.Component));
            role.RoleGodView = RoleGodView;
            __reflect(RoleGodView.prototype, "game.mod.role.RoleGodView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var RoleInfoView = /** @class */ (function (_super) {
                __extends(RoleInfoView, _super);
                function RoleInfoView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.NewRoleInfoSkin";
                    _this.touchEnabled = false;
                    return _this;
                }
                return RoleInfoView;
            }(eui.Component));
            role.RoleInfoView = RoleInfoView;
            __reflect(RoleInfoView.prototype, "game.mod.role.RoleInfoView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var attributes = msg.attributes;
            var TouchEvent = egret.TouchEvent;
            /**
             * 角色属性
             */
            var RoleAttrTipsMdr = /** @class */ (function (_super) {
                __extends(RoleAttrTipsMdr, _super);
                function RoleAttrTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark('_view', role.RoleAttrTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                RoleAttrTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.list_attr.itemRenderer = mod.AttrItemRender;
                    this._view.list_attr.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.attr.setListGap(18);
                };
                RoleAttrTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                };
                RoleAttrTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateXianLiAttr();
                    this.updateNormalAttr();
                };
                RoleAttrTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this.removeAllEffects();
                };
                RoleAttrTipsMdr.prototype.updateXianLiAttr = function () {
                    var vo = game.RoleVo.ins;
                    var god = vo.god || 0;
                    var godPower = vo && vo.godpower && vo.godpower.toNumber() || 0;
                    var font = game.BmpTextCfg[201 /* CommonPower2 */];
                    this._view.xianliPower.setPowerValue(game.StringUtil.getPowerNumStr(god));
                    this.addBmpFont(game.StringUtil.getPowerNumStr(godPower, 2, '战力:'), font, this._view.gr_power, true, 1, false, -2, true);
                    var attr = new attributes();
                    var keyList = ["god_atk" /* god_atk */, "god_def" /* god_def */, "god_hp" /* god_hp */];
                    for (var _i = 0, keyList_1 = keyList; _i < keyList_1.length; _i++) {
                        var key = keyList_1[_i];
                        attr[key] = vo.getValueByKey(key);
                    }
                    this._view.attr.updateAttr(attr);
                };
                RoleAttrTipsMdr.prototype.updateNormalAttr = function () {
                    var vo = game.RoleVo.ins;
                    var power = vo.showpower && vo.godpower ? vo.showpower.sub(vo.godpower) : vo.showpower;
                    this.addBmpFont(game.StringUtil.getPowerNumStr(power ? power.toNumber() : 0, 2, '战力:'), game.BmpTextCfg[201 /* CommonPower2 */], this._view.gr_power1, true, 1, false, -2, true);
                    var cfgList = game.getConfigListByName("fightpower.json" /* Fightpower */);
                    var attr = new attributes();
                    for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                        var cfg = cfgList_1[_i];
                        if (cfg.ishide || cfg.specialflag) {
                            //隐藏属性，特殊属性不显示
                            continue;
                        }
                        attr[cfg.index] = vo.getValueByKey(cfg.index);
                    }
                    var infos = game.TextUtil.getAttrTextInfos(attr);
                    this._listData.source = infos;
                };
                return RoleAttrTipsMdr;
            }(game.EffectMdrBase));
            role.RoleAttrTipsMdr = RoleAttrTipsMdr;
            __reflect(RoleAttrTipsMdr.prototype, "game.mod.role.RoleAttrTipsMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var RoleEquipTipsMdr = /** @class */ (function (_super) {
                __extends(RoleEquipTipsMdr, _super);
                function RoleEquipTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.RoleEquipTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                RoleEquipTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._enhanceProxy = game.getProxy("43" /* Enhance */, 187 /* Enhance */);
                };
                RoleEquipTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.onUpdateCommonAttr, this);
                    this.onNt("on_view_hide" /* ON_VIEW_HIDE */, this.hide, this);
                };
                RoleEquipTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var data = this._showArgs.data;
                    this._isSelf = this._showArgs.isSelf;
                    this._isBag = this._showArgs.isBag;
                    if (data instanceof game.PropData) {
                        this._propData = data;
                    }
                    else if (typeof data === 'number') {
                        this._propData = game.PropData.create(data);
                    }
                    if (!this._propData) {
                        return;
                    }
                    this.updateView();
                };
                RoleEquipTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._view.gr_attr.removeChildren();
                    this.baseAttr = null;
                    this.jipinAttr = null;
                    this.baseStrengthen = null;
                    this.roleGemItem = null;
                    this.baseSuit = null;
                };
                RoleEquipTipsMdr.prototype.onUpdateCommonAttr = function () {
                    this.updateBaseAttr();
                    this._view.baseRoleEquipTips.updatePower(this.getPower());
                };
                RoleEquipTipsMdr.prototype.updateView = function () {
                    this._view.baseRoleEquipTips.updateTopInfo(this._propData);
                    this._view.baseRoleEquipTips.updateBottomInfo(this._propData);
                    this.updateScroller();
                    this._view.baseRoleEquipTips.updatePower(this.getPower());
                };
                //自动添加组件，自适应布局
                RoleEquipTipsMdr.prototype.updateScroller = function () {
                    this._view.gr_attr.removeChildren();
                    // 基础属性
                    this.updateBaseAttr();
                    // 极品属性
                    this.updateJipinAttr();
                    // 强化属性
                    this.updateStrengthenAttr();
                    // 宝石属性
                    this.updateGemAttr();
                    // 套装属性
                    this.updateSuitAttr();
                };
                RoleEquipTipsMdr.prototype.addToGroup = function (item) {
                    if (!item || item.parent) {
                        return;
                    }
                    this._view.gr_attr.addChild(item);
                };
                //基础属性
                RoleEquipTipsMdr.prototype.updateBaseAttr = function () {
                    if (!this.baseAttr) {
                        this.baseAttr = new mod.BaseDescItem();
                    }
                    this.addToGroup(this.baseAttr);
                    var desc = '';
                    var regular_attrs = this._propData.regular_attrs;
                    var zengfu_attrs = this._propData.zengfu_attrs;
                    if (regular_attrs && Object.keys(regular_attrs).length) {
                        var keys = game.TextUtil.getAttrOrderKeys(regular_attrs);
                        for (var i = 0, len = keys.length; i < len; i++) {
                            var key = keys[i];
                            var name = game.TextUtil.getAttrsText(key);
                            var val = game.TextUtil.getAttrsPerCent(key, regular_attrs[key]);
                            var zengfuDesc = this.getZengFuAttrDesc(zengfu_attrs, key);
                            desc += (name + game.TextUtil.addColor(' +' + val, 8585074 /* GREEN */) + zengfuDesc)
                                + (i == len - 1 ? '' : '\n');
                        }
                    }
                    else {
                        var cfg = this._propData.cfg;
                        var attr = mod.RoleUtil.getAttr(cfg.attr_id);
                        desc = game.TextUtil.getAttrTextAdd(attr, 8585074 /* GREEN */);
                    }
                    this.baseAttr.updateShow(desc, game.getLanById("ywl_baseAttr" /* ywl_baseAttr */));
                };
                //极品属性
                RoleEquipTipsMdr.prototype.updateJipinAttr = function () {
                    if (!this.jipinAttr) {
                        this.jipinAttr = new mod.BaseJipinAttrItem();
                    }
                    var jipinList = this._propData.jipin_list;
                    if (jipinList && jipinList.length) {
                        var jipinList_1 = this._propData.jipin_list;
                        var haveJipinAttr = jipinList_1 && jipinList_1.length > 0;
                        if (haveJipinAttr) {
                            this.addToGroup(this.jipinAttr);
                            this.jipinAttr.updateShow(jipinList_1, game.getLanById("jipinshuxing" /* jipinshuxing */));
                        }
                        return;
                    }
                    var cfg = this._propData.cfg;
                    if (cfg && cfg.jiping) {
                        this.addToGroup(this.jipinAttr);
                        this.jipinAttr.updateEquipJipinDesc(this._propData.index);
                    }
                };
                // 强化属性
                RoleEquipTipsMdr.prototype.updateStrengthenAttr = function () {
                    if (!this.baseStrengthen) {
                        this.baseStrengthen = new mod.BaseDescItem();
                    }
                    var strength_attr = this.getStrengthAttrs();
                    var haveStrengthAttr = this._isBag ? false : strength_attr && Object.keys(strength_attr).length > 0;
                    if (haveStrengthAttr) {
                        var strength_lv = this.getStrength();
                        this.baseStrengthen.updateShow(game.TextUtil.getAttrTextAdd(strength_attr, 8585074 /* GREEN */), game.getLanById("strength_attr" /* strength_attr */) + ("  " + game.TextUtil.addColor('(+' + strength_lv + ')', 8585074 /* GREEN */)));
                        this.addToGroup(this.baseStrengthen);
                    }
                };
                //宝石属性
                RoleEquipTipsMdr.prototype.updateGemAttr = function () {
                    if (!this.roleGemItem) {
                        this.roleGemItem = new role.RoleGemItem();
                    }
                    var haveGem = !this._isBag;
                    if (haveGem) {
                        this.roleGemItem.updateView(this._propData, this._isSelf);
                        this.addToGroup(this.roleGemItem);
                    }
                };
                // 套装属性
                RoleEquipTipsMdr.prototype.updateSuitAttr = function () {
                    if (!this.baseSuit) {
                        this.baseSuit = new mod.BaseDescItem();
                    }
                    var suitAttr = this.getSuitAttr();
                    var haveSuit = this._isBag ? false : suitAttr && Object.keys(suitAttr).length > 0;
                    if (haveSuit) {
                        this.baseSuit.updateShow(game.TextUtil.getAttrTextAdd(suitAttr, 8585074 /* GREEN */), game.getLanById("allmap3" /* allmap3 */));
                        this.addToGroup(this.baseSuit);
                    }
                };
                RoleEquipTipsMdr.prototype.getPower = function () {
                    var power = 0;
                    if (this.baseAttr && this.baseAttr.parent) {
                        var regular_attrs = this._propData.regular_attrs;
                        var zengfu_attrs = this._propData.zengfu_attrs;
                        if (regular_attrs && Object.keys(regular_attrs).length) {
                            if (regular_attrs && regular_attrs.showpower) {
                                power += regular_attrs.showpower.toNumber();
                            }
                            if (zengfu_attrs && zengfu_attrs.showpower) {
                                power += zengfu_attrs.showpower.toNumber();
                            }
                        }
                        else {
                            var attr = mod.RoleUtil.getAttr(this._propData.cfg.attr_id);
                            if (attr && attr.showpower) {
                                power += attr.showpower.toNumber();
                            }
                        }
                    }
                    if (this.jipinAttr && this.jipinAttr.parent) {
                        var jipinList = this._propData.jipin_list || [];
                        for (var _i = 0, jipinList_2 = jipinList; _i < jipinList_2.length; _i++) {
                            var item = jipinList_2[_i];
                            if (item && item.jipin_attrs && item.jipin_attrs.showpower) {
                                power += item.jipin_attrs.showpower.toNumber();
                            }
                        }
                    }
                    if (this.baseStrengthen && this.baseStrengthen.parent) {
                        var strength_attr = this.getStrengthAttrs();
                        if (strength_attr && strength_attr.showpower) {
                            power += strength_attr.showpower.toNumber();
                        }
                    }
                    if (this.roleGemItem && this.roleGemItem.parent) {
                        var gemInfo = this.getGems() || [];
                        for (var _a = 0, gemInfo_2 = gemInfo; _a < gemInfo_2.length; _a++) {
                            var gem = gemInfo_2[_a];
                            if (gem && gem.index && gem.attrs && gem.attrs.showpower) {
                                power += gem.attrs.showpower.toNumber();
                            }
                        }
                    }
                    if (this.baseSuit && this.baseSuit.parent) {
                        var suitAttr = this.getSuitAttr();
                        if (suitAttr && suitAttr.showpower) {
                            power += suitAttr.showpower.toNumber();
                        }
                    }
                    return power;
                };
                /**增幅属性描述*/
                RoleEquipTipsMdr.prototype.getZengFuAttrDesc = function (attrs, key) {
                    var str = '';
                    if (attrs && attrs[key]) {
                        str = game.TextUtil.getAttrsPerCent(key, attrs[key]);
                    }
                    if (!str) {
                        return '';
                    }
                    return game.TextUtil.addColor("  (" + game.getLanById("zengfu" /* zengfu */) + "+" + str + ")", 5893887 /* BLUE */);
                };
                /**强化等级*/
                RoleEquipTipsMdr.prototype.getStrength = function () {
                    if (this._isSelf) {
                        var strength_data = this._enhanceProxy.getStrengthInfo(this._propData.index % 10);
                        return strength_data && strength_data.strength_lv || 0;
                    }
                    return this._propData.strength || 0;
                };
                /**强化属性*/
                RoleEquipTipsMdr.prototype.getStrengthAttrs = function () {
                    if (this._isSelf) {
                        var strength_data = this._enhanceProxy.getStrengthInfo(this._propData.index % 10);
                        return strength_data && strength_data.attrs ? strength_data.attrs : null;
                    }
                    return this._propData.strength_attrs || null;
                };
                /**宝石列表 */
                RoleEquipTipsMdr.prototype.getGems = function () {
                    if (this._isSelf) {
                        var pos = this._propData.index % 10; //装备部位
                        return this._enhanceProxy.getGemInfo(pos);
                    }
                    return this._propData.gems || [];
                };
                /**套装属性*/
                RoleEquipTipsMdr.prototype.getSuitAttr = function () {
                    if (this._isSelf) {
                        var advancedMaster = this._enhanceProxy.getAdvancedMaster();
                        return advancedMaster && advancedMaster.attrs ? advancedMaster.attrs : null;
                    }
                    return this._propData.advanced_master_attrs;
                };
                return RoleEquipTipsMdr;
            }(game.MdrBase));
            role.RoleEquipTipsMdr = RoleEquipTipsMdr;
            __reflect(RoleEquipTipsMdr.prototype, "game.mod.role.RoleEquipTipsMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var ArrayCollection = eui.ArrayCollection;
            var facade = base.facade;
            var RoleGodDescMdr = /** @class */ (function (_super) {
                __extends(RoleGodDescMdr, _super);
                function RoleGodDescMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.RoleGodDescView);
                    _this.isEasyHide = true;
                    return _this;
                }
                RoleGodDescMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = mod.BaseDescItem;
                    this._view.list_item.dataProvider = this._itemList;
                };
                RoleGodDescMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var keyList = ["\u65F6\u88C5" /* Body */, "\u7FBD\u7FFC" /* Wing */, "\u795E\u5175" /* Weapon */, "\u5750\u9A91" /* Horse */,
                        "\u5143\u7075" /* Tianshen */, "\u795E\u7075" /* Shenling */, "\u4FEE\u4ED9" /* Xiuxian */, "\u5B50\u5973" /* XianlvChild */,
                        "\u5316\u795E" /* Huashen */, "\u4ED9\u5251" /* Xianjian */];
                    var godRate = game.RoleVo.ins.getValueByKey("god_rate" /* god_rate */); //万分比
                    var datas = [];
                    for (var _i = 0, keyList_2 = keyList; _i < keyList_2.length; _i++) {
                        var k = keyList_2[_i];
                        var desc = this.getGodStr(k, godRate);
                        var info = {
                            desc: desc,
                            title: k
                        };
                        datas.push(info);
                    }
                    this._itemList.source = datas;
                };
                RoleGodDescMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                RoleGodDescMdr.prototype.getGodStr = function (k, godRate) {
                    var attr;
                    switch (k) {
                        case "\u4FEE\u4ED9" /* Xiuxian */:
                            var _xianluProxy = facade.retMod("41" /* Xianlu */).retProxy(186 /* Xianlu */);
                            attr = _xianluProxy.xianpoattr;
                            break;
                        case "\u5B50\u5973" /* XianlvChild */:
                            var _childProxy = facade.retMod("58" /* Xianyuan */).retProxy(227 /* Child */);
                            attr = _childProxy.getAttr();
                            break;
                        case "\u795E\u7075" /* Shenling */:
                            var _shenLingProxy = facade.retMod("45" /* Shenling */).retProxy(189 /* Shenling */);
                            attr = _shenLingProxy.getAttr();
                            break;
                        case "\u4ED9\u5251" /* Xianjian */:
                            var _xianjianProxy = facade.retMod("46" /* Surface */).retProxy(239 /* Xianjian */);
                            attr = _xianjianProxy.getAttr();
                            break;
                        default:
                            var headType = game.RoleGodKeyToConfigHead[k];
                            if (headType) {
                                var _surfaceProxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                                attr = _surfaceProxy.getSurfaceAllAttr(headType);
                            }
                            break;
                    }
                    var god = attr && attr.god ? attr.god : 0;
                    //仙力*2500*(1+神识对应增幅系数)
                    var godPower = Math.round(god * 2500 * (1 + godRate / 10000));
                    var godStr = game.TextUtil.getAttrsText("god" /* god */) + "：" + god + "（" + game.getLanById("showpower" /* showpower */) + "：" + godPower + "）";
                    return godStr;
                };
                return RoleGodDescMdr;
            }(game.EffectMdrBase));
            role.RoleGodDescMdr = RoleGodDescMdr;
            __reflect(RoleGodDescMdr.prototype, "game.mod.role.RoleGodDescMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var facade = base.facade;
            var RoleGodMdr = /** @class */ (function (_super) {
                __extends(RoleGodMdr, _super);
                function RoleGodMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.RoleGodView);
                    _this.isEasyHide = true;
                    return _this;
                }
                RoleGodMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = mod.BaseZhuangshiItem;
                    this._view.list_item.dataProvider = this._itemList;
                    this._proxy = facade.retMod("41" /* Xianlu */).retProxy(186 /* Xianlu */);
                };
                RoleGodMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_desc, TouchEvent.TOUCH_TAP, this.onClickDesc);
                };
                RoleGodMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                };
                RoleGodMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                RoleGodMdr.prototype.onClickDesc = function () {
                    facade.showView("06" /* Role */, "21" /* RoleGodDesc */);
                };
                RoleGodMdr.prototype.updateShow = function () {
                    var vo = game.RoleVo.ins;
                    var god = vo.god || 0;
                    var godPower = vo && vo.godpower && vo.godpower.toNumber() || 0;
                    var font = game.BmpTextCfg[206 /* Layer */];
                    this.addBmpFont(god + "", font, this._view.grp_god);
                    this._view.power.setPowerValue(godPower);
                    var lv = this._proxy.xianpolevel;
                    var lvStr = game.getLanById("xianpo_tips" /* xianpo_tips */) + game.getLanById("level" /* level */) + "：" + lv;
                    var godRate = vo.getValueByKey("god_rate" /* god_rate */);
                    if (godRate) {
                        lvStr += "（仙力效果+" + (godRate / 100) + "%）";
                    }
                    this._view.lab_desc.text = lvStr;
                    var descList = [];
                    var keyList = ["god_atk" /* god_atk */, "god_def" /* god_def */, "god_hp" /* god_hp */];
                    for (var _i = 0, keyList_3 = keyList; _i < keyList_3.length; _i++) {
                        var key = keyList_3[_i];
                        var curVal = vo.getValueByKey(key);
                        var addStr = "";
                        if (godRate) {
                            //客户端用172500*(5000 / (5000+10000))计算出加成值57500，显示的时候就是172500（+57500）
                            //仙力效果
                            var addVal = Math.round(curVal * (godRate / (godRate + 10000)));
                            addStr = "（+" + addVal + "）";
                        }
                        var desc = game.TextUtil.getAttrsText(key) + "：" + curVal + game.TextUtil.addColor(addStr, 8585074 /* GREEN */);
                        descList.push(desc);
                    }
                    this._itemList.source = descList;
                };
                return RoleGodMdr;
            }(game.EffectMdrBase));
            role.RoleGodMdr = RoleGodMdr;
            __reflect(RoleGodMdr.prototype, "game.mod.role.RoleGodMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var Handler = base.Handler;
            var facade = base.facade;
            var PropertyEvent = eui.PropertyEvent;
            var RoleInfoMdr = /** @class */ (function (_super) {
                __extends(RoleInfoMdr, _super);
                function RoleInfoMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", role.RoleInfoView);
                    _this._btnData = [
                        {
                            icon: "yuyi_tab_icon",
                            openIdx: 1041670124 /* Wing */,
                            param: ["06" /* Role */, "16" /* Wing */],
                            rankType: 2007 /* Yuyi */
                        },
                        {
                            icon: "shizhuang_tab_icon",
                            openIdx: 1041670125 /* Body */,
                            param: ["06" /* Role */, "18" /* Body */],
                            guideKey: 19 /* RoleBody */
                        },
                        {
                            icon: "shenbing_tab_icon",
                            openIdx: 1041670123 /* Weapon */,
                            param: ["06" /* Role */, "17" /* Weapon */],
                            rankType: 2008 /* Shenbing */
                        },
                        {
                            icon: "lingbao_tab_icon",
                            openIdx: 0,
                            param: null
                        }
                    ];
                    return _this;
                }
                RoleInfoMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._equipProxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                    this._enhanceProxy = game.getProxy("43" /* Enhance */, 187 /* Enhance */);
                    this._proxy = this.retProxy(5 /* Role */);
                    this._view.list_btn.itemRenderer = mod.TabSecondItem;
                    this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
                    this._view.btn_xiuxiannupu.setHintStyle(-6, 0);
                };
                RoleInfoMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.power2.btn_desc, egret.TouchEvent.TOUCH_TAP, this.onClickAttr);
                    addEventListener(this._view.btn_oneKey, egret.TouchEvent.TOUCH_TAP, this.onClickOneKey);
                    addEventListener(this._view.icon0, egret.TouchEvent.TOUCH_TAP, this.onClick);
                    addEventListener(this._view.icon1, egret.TouchEvent.TOUCH_TAP, this.onClick);
                    addEventListener(this._view.icon2, egret.TouchEvent.TOUCH_TAP, this.onClick);
                    addEventListener(this._view.icon3, egret.TouchEvent.TOUCH_TAP, this.onClick);
                    addEventListener(this._view.btn_suit, egret.TouchEvent.TOUCH_TAP, this.onClickSuit);
                    addEventListener(this._view.btn_collect, egret.TouchEvent.TOUCH_TAP, this.onClickCollect);
                    addEventListener(this._view.btn_huanHua, egret.TouchEvent.TOUCH_TAP, this.onClickHuanHua);
                    addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickBtnList);
                    addEventListener(this._view.list_btn, PropertyEvent.PROPERTY_CHANGE, this.onListChange);
                    addEventListener(this._view.equip_list.list_equip, eui.ItemTapEvent.ITEM_TAP, this.onClickList);
                    addEventListener(this._view.btn_xiuxiannupu, egret.TouchEvent.TOUCH_TAP, this.onClickXiuxianNvpu);
                    this.onNt("equip_update_back" /* EQUIP_UPDATE_BACK */, this.updateViewByPost, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                    this.onNt("on_gather_info_update" /* ON_GATHER_INFO_UPDATE */, this.showCollectGuide, this);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                    this.onNt("on_update_punshlist_type" /* ON_UPDATE_PUNSHLIST_TYPE */, this.onUpdateBtn, this);
                };
                RoleInfoMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                    this._listBtn.replaceAll(this._btnData);
                    this.updateIcon(); //todo
                    this.updateBtnHint();
                    this.showGuide();
                    this.updateGod();
                    this.onUpdateBtn();
                    this.updateXiuxianNvpuBtn();
                };
                RoleInfoMdr.prototype.updateView = function () {
                    this._view.lb_name.text = game.RoleVo.ins.name + '';
                    this.updateViewByPost();
                    this.updateIconHint();
                };
                RoleInfoMdr.prototype.updateViewByPost = function () {
                    var lvList = [];
                    for (var _i = 0, EquipPosAry_1 = game.EquipPosAry; _i < EquipPosAry_1.length; _i++) {
                        var pos = EquipPosAry_1[_i];
                        var info1 = this._enhanceProxy.getStrengthInfo(pos);
                        lvList.push(info1 ? info1.strength_lv : 0);
                    }
                    this._view.equip_list.updateEquip(lvList);
                    this.updatePower();
                    this.updateRole();
                };
                RoleInfoMdr.prototype.updatePower = function () {
                    this._view.power2.setPowerValue(game.RoleVo.ins.showpower);
                };
                RoleInfoMdr.prototype.updateRole = function () {
                    this.updateSelfUIRole(this._view.gr_role);
                };
                RoleInfoMdr.prototype.updateGod = function () {
                    this._view.btn_god.updateGod(game.RoleVo.ins.god || 0);
                };
                RoleInfoMdr.prototype.onHide = function () {
                    mod.GuideMgr.getIns().clear(11 /* RoleEquip */); //清除指引
                    mod.GuideMgr.getIns().clear(13 /* RoleCollect */); //清除指引
                    mod.GuideMgr.getIns().clear(19 /* RoleBody */); //清除指引
                    _super.prototype.onHide.call(this);
                };
                RoleInfoMdr.prototype.onClickSuit = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670126 /* SuitType1 */, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showView("06" /* Role */, "06" /* SuitMain */);
                };
                //点击收集
                RoleInfoMdr.prototype.onClickCollect = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670134 /* RoleCollect */, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showView("47" /* Jiban */, "01" /* JibanMain */, "03" /* Collect */);
                };
                //点击幻化
                RoleInfoMdr.prototype.onClickHuanHua = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670135 /* RoleHuanhua */, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showView("47" /* Jiban */, "01" /* JibanMain */, "01" /* Huanhua */);
                };
                RoleInfoMdr.prototype.onClickBtnList = function (e) {
                    var d = e.item;
                    this.onClickBtn(d);
                };
                RoleInfoMdr.prototype.onClickBtn = function (d) {
                    if (d.openIdx && !mod.ViewMgr.getIns().checkViewOpen(d.openIdx, true)) {
                        return;
                    }
                    if (!d.param) {
                        game.PromptBox.getIns().show("\u5C1A\u672A\u5F00\u542F\uFF0C\u656C\u8BF7\u671F\u5F85\uFF01");
                        return;
                    }
                    mod.ViewMgr.getIns().showView(d.param[0], d.param[1]);
                };
                RoleInfoMdr.prototype.onClickAttr = function () {
                    mod.ViewMgr.getIns().showSecondPop("06" /* Role */, "04" /* RoleAttrTips */);
                };
                RoleInfoMdr.prototype.onClickOneKey = function () {
                    if (!this._equipProxy.checkOneKey()) {
                        game.PromptBox.getIns().show("\u6682\u65E0\u53EF\u7A7F\u6234\u88C5\u5907");
                        return;
                    }
                    this._equipProxy.c2s_equip_operate(3, null);
                };
                RoleInfoMdr.prototype.onClickList = function (e) {
                    var data = e.item;
                    if (!data) {
                        return;
                    }
                    if (typeof data.prop === 'number') {
                        game.PromptBox.getIns().show(game.getLanById("not_equip" /* not_equip */));
                        return;
                    }
                    mod.ViewMgr.getIns().showRoleEquipTips(data.prop, true);
                };
                RoleInfoMdr.prototype.onHintUpdate = function (n) {
                    var hint = n.body;
                    if (hint.node == mod.HintMgr.getType(this._proxy.getOpenIdxToHintType(1041670126 /* SuitType1 */))) {
                        this._view.btn_suit.setHint(hint.value);
                        return;
                    }
                    if (hint.node == mod.HintMgr.getType(this._proxy.getOpenIdxToHintType(1041670135 /* RoleHuanhua */))) {
                        this._view.btn_huanHua.setHint(hint.value);
                        return;
                    }
                    if (hint.node == mod.HintMgr.getType(this._proxy.getOpenIdxToHintType(1041670134 /* RoleCollect */))) {
                        this._view.btn_collect.setHint(hint.value);
                        return;
                    }
                    if (hint.node == mod.HintMgr.getType(this._proxy.getOpenIdxToHintType(1041670240 /* XiuxianNvpu */))) {
                        this._view.btn_xiuxiannupu.setHint(hint.value);
                        return;
                    }
                    if (hint.node.indexOf(mod.HintMgr.getType(this._equipProxy.getRoleEquipIconHint())) > -1) {
                        this.updateIconHint();
                    }
                    for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                        var item = _a[_i];
                        var hintType = this._proxy.getOpenIdxToHintType(item.openIdx);
                        if (hintType && hint.node == mod.HintMgr.getType(hintType)) {
                            item.showHint = hint.value;
                            this._listBtn.itemUpdated(item);
                        }
                    }
                };
                /**冲榜标签 */
                RoleInfoMdr.prototype.onUpdateBtn = function () {
                    var type = game.ActivityUtil.getType();
                    for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                        var item = _a[_i];
                        var bool = item.rankType && item.rankType == type;
                        if (bool) {
                            var open = game.ActivityUtil.checkOpen();
                            item.tag = open ? "chongbang1" : "";
                        }
                        else {
                            item.tag = "";
                        }
                        this._listBtn.itemUpdated(item);
                    }
                };
                RoleInfoMdr.prototype.updateIconHint = function () {
                    var hintPath = this._equipProxy.getRoleEquipIconHint();
                    this._view.btn_oneKey.setHint(mod.HintMgr.getHint(hintPath));
                    var hints = [];
                    var num = game.EquipPosAry.length;
                    for (var i = 0; i < num; i++) {
                        var pos = game.EquipPosAry[i] + '';
                        hints.push(mod.HintMgr.getHint(hintPath.concat([pos])));
                    }
                    this._view.equip_list.updateHint(hints);
                };
                //todo
                RoleInfoMdr.prototype.onClick = function () {
                    game.PromptBox.getIns().show("\u5C1A\u672A\u5F00\u542F\uFF0C\u656C\u8BF7\u671F\u5F85\uFF01");
                };
                //todo，icon按钮
                RoleInfoMdr.prototype.updateIcon = function () {
                    this._view.icon0.updateIconImg('xianyuanjiezhi_btn_icon');
                    this._view.icon0.setImgLock();
                    this._view.icon1.updateIconImg('wutongbaoshu_btn_icon');
                    this._view.icon1.setImgLock();
                    this._view.icon2.updateIconImg('hunlongtianyin_btn_icon');
                    this._view.icon2.setImgLock();
                    this._view.icon3.updateIconImg('huangguqishu_btn_icon');
                    this._view.icon3.setImgLock();
                };
                //更新按钮红点
                RoleInfoMdr.prototype.updateBtnHint = function () {
                    this._view.btn_suit.setHint(mod.HintMgr.getHint(["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */]));
                    this._view.btn_huanHua.setHint(mod.HintMgr.getHint(this._proxy.getOpenIdxToHintType(1041670135 /* RoleHuanhua */)));
                    this._view.btn_collect.setHint(mod.HintMgr.getHint(this._proxy.getOpenIdxToHintType(1041670134 /* RoleCollect */)));
                    for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (!item.openIdx) {
                            continue;
                        }
                        var node = this._proxy.getOpenIdxToHintType(item.openIdx);
                        if (!node) {
                            continue;
                        }
                        var bool = mod.HintMgr.getHint(node);
                        if (item.showHint != bool) {
                            item.showHint = bool;
                            this._listBtn.itemUpdated(item);
                        }
                    }
                };
                RoleInfoMdr.prototype.showGuide = function () {
                    mod.GuideMgr.getIns().show(11 /* RoleEquip */, this._view.btn_oneKey, Handler.alloc(this, this.onClickOneKey)); //任务指引
                    this.showCollectGuide();
                    this.showListGuide();
                };
                RoleInfoMdr.prototype.showCollectGuide = function () {
                    //收集指引，需要判断是否可以收集
                    var _proxy = facade.retMod("47" /* Jiban */).retProxy(205 /* ShoujiHuanhua */);
                    if (_proxy.canTaskActGather()) {
                        mod.GuideMgr.getIns().show(13 /* RoleCollect */, this._view.btn_collect, Handler.alloc(this, this.onClickCollect)); //任务指引
                    }
                };
                RoleInfoMdr.prototype.showListGuide = function () {
                    var num = this._view.list_btn.numChildren;
                    if (!num) {
                        return;
                    }
                    for (var i = 0; i < this._btnData.length && i < num; i++) {
                        var btnData = this._btnData[i];
                        var btn = this._view.list_btn.getChildAt(i);
                        if (btnData.guideKey) {
                            mod.GuideMgr.getIns().show(btnData.guideKey, btn, Handler.alloc(this, this.onClickBtn, [btnData])); //指引
                        }
                    }
                };
                RoleInfoMdr.prototype.onListChange = function (e) {
                    if (e.property == "contentWidth") {
                        this.showListGuide();
                    }
                };
                RoleInfoMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("god" /* god */) > -1) {
                        this.updateGod();
                    }
                };
                //修仙女仆
                RoleInfoMdr.prototype.updateXiuxianNvpuBtn = function () {
                    var xiuxianNvpuProxy = this.retProxy(258 /* XiuxianNvpu */);
                    this._view.btn_xiuxiannupu.visible = xiuxianNvpuProxy.isBought();
                    var hint = mod.HintMgr.getHint(this._proxy.getOpenIdxToHintType(1041670240 /* XiuxianNvpu */));
                    this._view.btn_xiuxiannupu.setHint(hint);
                };
                RoleInfoMdr.prototype.onClickXiuxianNvpu = function () {
                    mod.ViewMgr.getIns().showView("06" /* Role */, "24" /* XiuxianNvpuGrowMain */);
                };
                return RoleInfoMdr;
            }(game.EffectMdrBase));
            role.RoleInfoMdr = RoleInfoMdr;
            __reflect(RoleInfoMdr.prototype, "game.mod.role.RoleInfoMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var RoleMainMdr = /** @class */ (function (_super) {
                __extends(RoleMainMdr, _super);
                function RoleMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "role_tab",
                            mdr: role.RoleInfoMdr,
                            title: 'role_tips1',
                            bg: "p1_role_bg",
                            openIdx: 1041670089 /* Role */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "title_tab",
                            mdr: role.TitleSecondMainMdr,
                            title: 'surface_tips8',
                            bg: '',
                            openIdx: 1041670090 /* Title */,
                            hintTypes: ["06" /* Role */, "02" /* TitleMain */]
                        },
                        {
                            btnType: "03" /* TabBtnType03 */,
                            icon: "touxiangbiaoqiantubiao",
                            mdr: role.DressUpInfoMdr,
                            title: 'dressUp_cue',
                            bg: "p1_dressup_bg2",
                            openIdx: 1041670091 /* DressUp */,
                            hintTypes: ["06" /* Role */, "03" /* DressUpMain */, "03" /* TabBtnType03 */]
                        },
                        {
                            btnType: "04" /* TabBtnType04 */,
                            icon: "touxiangkuangbiaotiantubiao",
                            mdr: role.DressUpInfo2Mdr,
                            title: 'dressUp_cue',
                            bg: "p1_dressup_bg2",
                            openIdx: 1041670091 /* DressUp */,
                            hintTypes: ["06" /* Role */, "03" /* DressUpMain */, "04" /* TabBtnType04 */]
                        },
                        {
                            btnType: "05" /* TabBtnType05 */,
                            icon: "liaotiankuangbiaoqiantubiao",
                            mdr: role.DressUpInfo3Mdr,
                            title: 'dressUp_cue',
                            bg: "p1_dressup_bg2",
                            openIdx: 1041670091 /* DressUp */,
                            hintTypes: ["06" /* Role */, "03" /* DressUpMain */, "05" /* TabBtnType05 */]
                        },
                    ];
                    return _this;
                }
                return RoleMainMdr;
            }(mod.WndBaseMdr));
            role.RoleMainMdr = RoleMainMdr;
            __reflect(RoleMainMdr.prototype, "game.mod.role.RoleMainMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitModel = /** @class */ (function () {
                function SuitModel() {
                    var _a, _b, _c, _d, _e, _f, _g;
                    /** 苍天 炎天信息 */
                    this.infos = {};
                    /** 颢天、玄天、钧天信息 */
                    this.infos2 = {};
                    /**二级页签红点路径*/
                    this.hintPath = (_a = {},
                        _a[1 /* CangTian */] = (_b = {},
                            _b[1] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "01" /* SuitType1 */, "01" /* Btn1 */],
                            _b[2] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "01" /* SuitType1 */, "02" /* Btn2 */],
                            _b),
                        _a[2 /* YanTian */] = (_c = {},
                            _c[1] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "02" /* SuitType2 */, "01" /* Btn1 */],
                            _c[2] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "02" /* SuitType2 */, "02" /* Btn2 */],
                            _c),
                        _a[3 /* HaoTian */] = (_d = {},
                            _d[1 /* JinJie */] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "03" /* SuitType3 */, "01" /* Btn1 */],
                            _d[2 /* DuanZao */] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "03" /* SuitType3 */, "02" /* Btn2 */],
                            _d[3 /* JingZhu */] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "03" /* SuitType3 */, "03" /* Btn3 */],
                            _d),
                        _a[4 /* XuanTian */] = (_e = {},
                            _e[1 /* JinJie */] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "04" /* SuitType4 */, "01" /* Btn1 */],
                            _e[2 /* DuanZao */] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "04" /* SuitType4 */, "02" /* Btn2 */],
                            _e[3 /* JingZhu */] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "04" /* SuitType4 */, "03" /* Btn3 */],
                            _e),
                        _a[5 /* JunTian */] = (_f = {},
                            _f[1 /* JinJie */] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "05" /* SuitType5 */, "01" /* Btn1 */],
                            _f[2 /* DuanZao */] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "05" /* SuitType5 */, "02" /* Btn2 */],
                            _f[3 /* JingZhu */] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "05" /* SuitType5 */, "03" /* Btn3 */],
                            _f),
                        _a);
                    /**合成红点*/
                    this.composeHintPath = (_g = {},
                        _g[1 /* CangTian */] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "01" /* SuitType1 */, "01" /* Btn1 */, 'compose1'],
                        _g[2 /* YanTian */] = ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "02" /* SuitType2 */, "01" /* Btn1 */, 'compose2'],
                        _g);
                }
                return SuitModel;
            }());
            role.SuitModel = SuitModel;
            __reflect(SuitModel.prototype, "game.mod.role.SuitModel");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var s2c_suit_equip_info = msg.s2c_suit_equip_info;
            var c2s_suit_equip_takeon = msg.c2s_suit_equip_takeon;
            var c2s_suit_equip_lvup = msg.c2s_suit_equip_lvup;
            var attributes = msg.attributes;
            var c2s_suit_equip_synthesis = msg.c2s_suit_equip_synthesis;
            var c2s_suit_equip_master_lvup = msg.c2s_suit_equip_master_lvup;
            var s2c_suit_two_equip_info = msg.s2c_suit_two_equip_info;
            var c2s_suit_two_equip_takeon = msg.c2s_suit_two_equip_takeon;
            var c2s_suit_two_equip_lvup = msg.c2s_suit_two_equip_lvup;
            var s2c_suit_equip_synthesis = msg.s2c_suit_equip_synthesis;
            var facade = base.facade;
            var c2s_suit_equip_onekey = msg.c2s_suit_equip_onekey;
            /**
             * @description 套装系统
             */
            var SuitProxy = /** @class */ (function (_super) {
                __extends(SuitProxy, _super);
                function SuitProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**合成界面，点击选择list下的list*/
                    _this.composeSelSub = false;
                    _this.composeSelPos = false;
                    _this.composeSelPos2 = false;
                    /**SuitType对应的最大进阶数*/
                    _this.typeStage = {};
                    /**等级表消耗数组*/
                    _this._costIndexAry = [];
                    return _this;
                }
                Object.defineProperty(SuitProxy.prototype, "composeSelAry", {
                    get: function () {
                        return this._composeSelAry;
                    },
                    set: function (ary) {
                        DEBUG && console.log.apply(console, ["set compose ary: "].concat(ary));
                        this._composeSelAry = ary;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SuitProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                SuitProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new role.SuitModel();
                    this.onProto(s2c_suit_equip_info, this.s2c_suit_equip_info, this);
                    this.onProto(s2c_suit_two_equip_info, this.s2c_suit_two_equip_info, this);
                    this.onProto(s2c_suit_equip_synthesis, this.s2c_suit_equip_synthesis, this);
                    facade.onNt("on_forbidden_info_update" /* ON_FORBIDDEN_INFO_UPDATE */, this.onForbiddenInfoUpdate, this);
                };
                //苍天 炎天信息
                SuitProxy.prototype.s2c_suit_equip_info = function (n) {
                    var msg = n.body;
                    if (msg.infos != null) {
                        for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this._model.infos[info.type] = info;
                        }
                    }
                    this.updateHint1();
                    this.sendNt("ON_SUIT_EQUIP_INFO_UPDATE" /* ON_SUIT_EQUIP_INFO_UPDATE */);
                };
                //一键穿戴
                SuitProxy.prototype.c2s_suit_equip_onekey = function (type, list) {
                    var msg = new c2s_suit_equip_onekey();
                    msg.type = type;
                    var idList = [];
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var id = list_1[_i];
                        idList.push(Long.fromNumber(id));
                    }
                    msg.equipment_id = idList;
                    this.sendProto(msg);
                };
                //穿戴苍天 炎天装备
                SuitProxy.prototype.c2s_suit_equip_takeon = function (id, type, pos) {
                    var msg = new c2s_suit_equip_takeon();
                    msg.equipment_id = Long.fromNumber(id);
                    msg.type = type;
                    msg.pos = pos;
                    this.sendProto(msg);
                };
                // 装备强化 ope 0单件强化 1:一键强化
                SuitProxy.prototype.c2s_suit_equip_lvup = function (ope, type, pos) {
                    var msg = new c2s_suit_equip_lvup();
                    msg.opear = ope;
                    msg.type = type;
                    if (pos != null) {
                        msg.pos = pos;
                    }
                    this.sendProto(msg);
                };
                /** 套装装备合成 */
                SuitProxy.prototype.c2s_suit_equip_synthesis = function (id, type, pos, cnt) {
                    if (cnt === void 0) { cnt = 1; }
                    var msg = new c2s_suit_equip_synthesis();
                    msg.equipment_id = Long.fromNumber(id);
                    msg.type = type;
                    msg.pos = pos;
                    msg.cnt = cnt;
                    this.sendProto(msg);
                };
                SuitProxy.prototype.s2c_suit_equip_synthesis = function () {
                    this.sendNt("on_suit_equip_synthesis_update" /* ON_SUIT_EQUIP_SYNTHESIS_UPDATE */);
                };
                // 装备强化大师升级
                SuitProxy.prototype.c2s_suit_equip_master_lvup = function (type) {
                    var msg = new c2s_suit_equip_master_lvup();
                    msg.type = type;
                    this.sendProto(msg);
                };
                /** 颢天、玄天、钧天信息 */
                SuitProxy.prototype.s2c_suit_two_equip_info = function (n) {
                    var msg = n.body;
                    if (msg.infos != null) {
                        for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this._model.infos2[info.type] = info;
                        }
                    }
                    this.updateHint2();
                    this.sendNt("ON_SUIT_EQUIP_INFO_UPDATE_TWO" /* ON_SUIT_EQUIP_INFO_UPDATE_TWO */);
                };
                /** 穿戴颢天、玄天、钧天装备 */
                SuitProxy.prototype.c2s_suit_two_equip_takeon = function (type, pos, equipment_id) {
                    var msg = new c2s_suit_two_equip_takeon();
                    msg.type = type;
                    msg.pos = pos;
                    msg.equipment_id = Long.fromNumber(equipment_id);
                    this.sendProto(msg);
                };
                /**
                 * 颢天、玄天、钧天装备强化
                 * @param ope 0单件 1:一键
                 * @param ope_type 1 进阶 2 锻造 3 精铸
                 * @param type 3颢天 4玄天 5钧天
                 * @param pos 0-9部位
                 */
                SuitProxy.prototype.c2s_suit_two_equip_lvup = function (ope, ope_type, type, pos) {
                    var msg = new c2s_suit_two_equip_lvup();
                    msg.opear = ope;
                    msg.opear_type = ope_type;
                    msg.type = type;
                    if (pos != null) {
                        msg.pos = pos;
                    }
                    this.sendProto(msg);
                };
                /**================================= 配置 =================================*/
                /**进阶配置*/
                SuitProxy.prototype.getSuitStageCfg = function (type, lv) {
                    var obj = game.getConfigByNameId("suit_stage.json" /* SuitStage */, type);
                    if (!obj || !obj[lv]) {
                        DEBUG && console.log("\u6CA1\u6709\u5957\u88C5\u8FDB\u9636\u914D\u7F6E suit_type:" + type + " lv:" + lv);
                        return null;
                    }
                    return obj[lv];
                };
                /**强化配置*/
                SuitProxy.prototype.getSuitStrengthenCfg = function (type, lv) {
                    var obj = game.getConfigByNameId("suit_strength.json" /* SuitStrengthen */, type);
                    if (!obj || !obj[lv]) {
                        DEBUG && console.log("\u6CA1\u6709\u5957\u88C5\u5F3A\u5316\u914D\u7F6E suit_type:" + type + " lv:" + lv);
                        return null;
                    }
                    return obj[lv];
                };
                /**套装类型配置*/
                SuitProxy.prototype.getSuitTypeCfg = function (type) {
                    return game.getConfigByNameId("suit_type.json" /* SuitType */, type);
                };
                /**套装类型组成配置*/
                SuitProxy.prototype.getSuitPartCfg = function (index) {
                    return game.getConfigByNameId("suit_part.json" /* SuitPart */, index);
                };
                /**
                 * 158000000 + (套装类型 + 操作类型 ) * 100000 + 部位 * 1000 + 等级
                 * 套装类型（3颢天 4玄天 5钧天） 操作类型（1 进阶 2 锻造 3 精铸）
                 * @param type 3颢天 4玄天 5钧天
                 * @param operType 1 进阶 2 锻造 3 精铸
                 * @param lv
                 */
                SuitProxy.prototype.getLevelCfg = function (type, operType, lv) {
                    var index = 150000000 + (type - 1 + 80) * 100000 + operType * 10000 + lv;
                    return game.getConfigByNameId("level.json" /* Level */, index);
                };
                /**获取消耗*/
                SuitProxy.prototype.getCost = function (type, operType, lv) {
                    if (lv === void 0) { lv = 0; }
                    if (type < 3 /* HaoTian */) {
                        var index = 158 * 1000000 + (type + 4) * 100000 + lv;
                        var lvCfg_1 = game.getConfigByNameId("level.json" /* Level */, index);
                        if (lvCfg_1 && lvCfg_1.goods_id) {
                            return lvCfg_1.goods_id[0];
                        }
                        return null;
                    }
                    //进阶，精铸穿戴不需要消耗，只消耗本身 2023.1.4
                    if ((operType == 1 /* JinJie */ || operType == 3 /* JingZhu */) && lv == 0) {
                        return null;
                    }
                    var lvCfg = this.getLevelCfg(type, operType, lv);
                    if (lvCfg && lvCfg.goods_id) {
                        return lvCfg.goods_id[0];
                    }
                    return null;
                };
                SuitProxy.prototype.getEquipCfg = function (type, stage, pos) {
                    if (stage === void 0) { stage = 1; }
                    if (pos === void 0) { pos = 0 /* SWORD */; }
                    var idx = this.getIndex(type, stage, pos);
                    return game.getConfigByNameId("equipment.json" /* Equip */, idx);
                };
                /**==================================================================*/
                /**套装类型1，2数据*/
                SuitProxy.prototype.getSuitTypeInfo = function (type) {
                    var typeInfo = this._model.infos[type];
                    if (!typeInfo) {
                        return null;
                    }
                    return typeInfo;
                };
                /**套装类型3，4，5数据*/
                SuitProxy.prototype.getSuitTypeInfo2 = function (type) {
                    var typeInfo = this._model.infos2[type];
                    return typeInfo || null;
                };
                /**套装类型1，2部位数据*/
                SuitProxy.prototype.getPosEquipInfo = function (type, pos) {
                    var info = this.getSuitTypeInfo(type);
                    if (!info || !info.equips) {
                        return null;
                    }
                    for (var _i = 0, _a = info.equips; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item && item.pos == pos) {
                            return item;
                        }
                    }
                    return null;
                };
                /**套装类型3，4，5操作数据*/
                SuitProxy.prototype.getSuitOperInfo = function (type, operType) {
                    var info = this.getSuitTypeInfo2(type);
                    if (!info || !info.equips || !info.equips.length) {
                        return null;
                    }
                    for (var _i = 0, _a = info.equips; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item && item.oper_type == operType) {
                            return item;
                        }
                    }
                    return null;
                };
                /**套装类型3,4,5部位数据*/
                SuitProxy.prototype.getPosEquipInfo2 = function (type, pos, operType) {
                    var info = this.getSuitOperInfo(type, operType);
                    if (!info || !info.attr_list || !info.attr_list.length) {
                        return null;
                    }
                    for (var _i = 0, _a = info.attr_list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item && item.pos == pos) {
                            return item;
                        }
                    }
                    return null;
                };
                /**
                 * 获取套装类型1,2的装备index
                 * @param type 套装类型 SuitType
                 * @param stage 阶数
                 * @param pos 部位 EquipPos
                 */
                SuitProxy.prototype.getIndex = function (type, stage, pos) {
                    if (stage === void 0) { stage = 1; }
                    if (pos === void 0) { pos = 0 /* SWORD */; }
                    return 290 /* Equip */ * 10000000 + 8 /* Suit */ * 100000 + type * 10000 + stage * 100 + pos;
                };
                /**背包中可穿戴的*/
                SuitProxy.prototype.getIndexForBag = function (type, pos) {
                    if (pos === void 0) { pos = 0 /* SWORD */; }
                    var bagList = mod.BagUtil.getBagsByType(12 /* Suit */);
                    if (bagList && bagList.length) {
                        for (var _i = 0, bagList_1 = bagList; _i < bagList_1.length; _i++) {
                            var prop = bagList_1[_i];
                            if (prop && prop.equipPos == pos && prop.propType == 8 /* Suit */
                                && this.getIndexType(prop.index) == type) {
                                return prop.index;
                            }
                        }
                    }
                    return 0;
                };
                /**获取套装类型1,2的可穿戴index*/
                SuitProxy.prototype.getIndexForDress = function (type, pos) {
                    if (pos === void 0) { pos = 0 /* SWORD */; }
                    var bagIndex = this.getIndexForBag(type, pos);
                    if (bagIndex) {
                        return bagIndex;
                    }
                    return this.getIndex(type, 1, pos); //获取一阶
                };
                /**
                 * 获取套装类型3,4,5的装备index
                 * @param type 套装类型
                 * @param pos 部位
                 * @param operType 只有 1进阶，3精铸
                 * @param stage 阶数 默认都是1阶
                 */
                SuitProxy.prototype.getIndex2 = function (type, pos, operType, stage) {
                    if (stage === void 0) { stage = 1; }
                    return 290 /* Equip */ * 10000000 + 8 /* Suit */ * 100000 + type * 10000 + stage * 100 + operType * 10 + pos;
                };
                /**获取套装类型*/
                SuitProxy.prototype.getIndexType = function (index) {
                    return Number((index + '').slice(5, 6));
                };
                /**获取套装阶数*/
                SuitProxy.prototype.getIndexLv = function (index) {
                    return Number((index + '').slice(6, 8));
                };
                // 获取最大进阶数
                SuitProxy.prototype.getMaxStageByType = function (type) {
                    if (this.typeStage[type]) {
                        return this.typeStage[type];
                    }
                    var cfgObj = game.getConfigByNameId("suit_stage.json" /* SuitStage */, type);
                    var max = Object.keys(cfgObj).length;
                    this.typeStage[type] = max;
                    return max;
                };
                /**套装属性*/
                SuitProxy.prototype.getSuitAttr = function (type) {
                    var info = this.getSuitTypeInfo(type);
                    if (info && info.suit_attr) {
                        return info.suit_attr;
                    }
                    var attr = new attributes();
                    var cfg = this.getSuitStageCfg(type, 1);
                    if (cfg && cfg.attr_id) {
                        attr = mod.RoleUtil.getAttr(cfg.attr_id);
                    }
                    return attr;
                };
                /**强化属性*/
                SuitProxy.prototype.getStrengthenAttr = function (type) {
                    var info = this.getSuitTypeInfo(type);
                    if (info && info.master_attr) {
                        return info.master_attr;
                    }
                    var attr = new attributes();
                    var cfg = this.getSuitStrengthenCfg(type, 1);
                    if (cfg && cfg.attr_id) {
                        attr = mod.RoleUtil.getAttr(cfg.attr_id);
                    }
                    return attr;
                };
                /**套装类型3,4,5的操作类型属性总和*/
                SuitProxy.prototype.getAttrByTypeAndOperType = function (type, operType) {
                    var typeInfo = this.getSuitOperInfo(type, operType);
                    if (!typeInfo || !typeInfo.attr_list) {
                        return null;
                    }
                    var attrList = [];
                    for (var _i = 0, _a = typeInfo.attr_list; _i < _a.length; _i++) {
                        var equip = _a[_i];
                        if (equip && equip.attr) {
                            attrList.push(equip.attr);
                        }
                    }
                    return game.TextUtil.calcAttrList(attrList);
                };
                /**套装阶数*/
                SuitProxy.prototype.getSuitLv = function (type) {
                    var info = this.getSuitTypeInfo(type);
                    return info && info.suit_lv || 0;
                };
                /**套装达到最大阶数，类型1,2*/
                SuitProxy.prototype.isMaxSuitLv = function (type) {
                    var maxLv = this.getMaxStageByType(type);
                    var info = this.getSuitTypeInfo(type);
                    return info && info.suit_lv && info.suit_lv >= maxLv;
                };
                //全身进阶等级大于等于curLv的装备数量
                SuitProxy.prototype.getSuitLvNotLess = function (type, curLv) {
                    var info = this.getSuitTypeInfo(type);
                    if (!info || !info.equips) {
                        return 0;
                    }
                    var cfg = this.getSuitStageCfg(type, curLv);
                    if (!cfg) {
                        return 0;
                    }
                    var needLv = cfg.stage;
                    var cnt = 0;
                    for (var _i = 0, _a = info.equips; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item && item.stage >= needLv) {
                            cnt++;
                        }
                    }
                    return cnt;
                };
                //全身强化等级大于等于curLv的装备数量
                SuitProxy.prototype.getMasterLvNotLess = function (type, curLv) {
                    var info = this.getSuitTypeInfo(type);
                    if (!info || !info.equips) {
                        return 0;
                    }
                    var cfg = this.getSuitStrengthenCfg(type, curLv);
                    if (!cfg) {
                        return 0;
                    }
                    var needLv = cfg.strength;
                    var cnt = 0;
                    for (var _i = 0, _a = info.equips; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item && item.level >= needLv) {
                            cnt++;
                        }
                    }
                    return cnt;
                };
                SuitProxy.prototype.getChineseNum = function (num) {
                    if (num <= 10) {
                        return game.getLanById('shuzi_' + num);
                    }
                    var str;
                    var ten = Math.floor(num / 10);
                    var bit = num % 10;
                    if (ten == 1) {
                        str = game.getLanById("shuzi_10" /* shuzi_10 */); //十
                    }
                    else {
                        str = game.getLanById("shuzi_" + ten) + game.getLanById("shuzi_10" /* shuzi_10 */); //x十
                    }
                    if (bit != 0) {
                        str += game.getLanById("shuzi_" + bit);
                    }
                    return str;
                };
                /**强化大师能否强化，类型1,2才有*/
                SuitProxy.prototype.canMasterUp = function (type, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    var info = this.getSuitTypeInfo(type);
                    var size = game.SuitEquipPosAry.length;
                    if (!info || !info.equips || info.equips.length < size) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u6761\u4EF6\u4E0D\u8DB3");
                        }
                        return false;
                    }
                    var next_lv = (info.master_lv || 0) + 1; //下一个等级
                    if (!this.getSuitStrengthenCfg(type, next_lv)) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u5DF2\u8FBE\u6700\u5927\u9636");
                        }
                        return false;
                    }
                    var satisfyCnt = this.getMasterLvNotLess(type, next_lv);
                    if (satisfyCnt < size) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u6761\u4EF6\u4E0D\u8DB3");
                        }
                        return false;
                    }
                    return true;
                };
                /**======================================合成======================================*/
                //套装背包
                SuitProxy.prototype.getSuitEquipListByBagType = function () {
                    return mod.BagUtil.getBagsByType(12 /* Suit */);
                };
                //套装背包-指定套装类型
                SuitProxy.prototype.getSuitEquipListByType = function (type) {
                    var list = this.getSuitEquipListByBagType();
                    var rst = [];
                    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                        var item = list_2[_i];
                        if (item && this.getIndexType(item.index) == type) {
                            rst.push(item);
                        }
                    }
                    return rst;
                };
                //套装类型-指定套装类型和装备部位
                SuitProxy.prototype.getSuitEquipListByTypeAndPos = function (type, pos) {
                    var list = this.getSuitEquipListByType(type);
                    var rst = [];
                    for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                        var item = list_3[_i];
                        if (item && item.equipPos == pos) {
                            rst.push(item);
                        }
                    }
                    return rst;
                };
                //获取当前穿戴的
                SuitProxy.prototype.getCurDress = function (type, pos) {
                    var info = this.getSuitTypeInfo(type);
                    if (!info || !info.equips || !info.equips.length) {
                        return null;
                    }
                    for (var _i = 0, _a = info.equips; _i < _a.length; _i++) {
                        var eq = _a[_i];
                        if (eq.pos == pos) {
                            return eq;
                        }
                    }
                    return null;
                };
                //当前穿戴的是否可以用于合成
                SuitProxy.prototype.checkCurDressForCompose = function (type, lv, pos) {
                    var eq = this.getCurDress(type, pos);
                    if (!eq) {
                        return false;
                    }
                    //低一阶的用于合成
                    var equipLv = this.getIndexLv(eq.equipment_id.toNumber());
                    return equipLv == lv - 1;
                    // return Number(eq.equipment_id.toString().slice(6, 8)) == lv - 1;
                };
                // //获取装备阶数
                // public getLv(index: number): number {
                //     let lv = (index + '').slice(6, 8);
                //     return +lv;
                // }
                //获取可以合成的数据列表，底一阶的用于合成
                SuitProxy.prototype.getCanComposeList = function (type, lv, pos) {
                    var list = [];
                    if (this.checkCurDressForCompose(type, lv, pos)) {
                        var eq = this.getCurDress(type, pos);
                        list.push(game.PropData.create(eq.equipment_id));
                    }
                    var datas = this.getSuitEquipListByTypeAndPos(type, pos);
                    for (var _i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
                        var d = datas_1[_i];
                        if (d && this.getIndexLv(d.index) == lv - 1) {
                            list.push(d);
                        }
                    }
                    return list;
                };
                /**
                 * 合成红点
                 * @param type
                 * @param stageLv
                 * @param pos
                 */
                SuitProxy.prototype.getComposeHint = function (type, stageLv, pos) {
                    var list = this.getCanComposeList(type, stageLv, pos);
                    return list && list.length >= 3;
                };
                SuitProxy.prototype.getTotalComposeHint = function () {
                    return this.updateComposeHintByType(1 /* CangTian */) || this.updateComposeHintByType(2 /* YanTian */);
                };
                /**合成红点*/
                SuitProxy.prototype.updateComposeHintByType = function (type) {
                    var hintPath = this._model.composeHintPath[type];
                    var min = 2;
                    var max = this.getMaxStageByType(type);
                    var typeHint = false;
                    for (var i = min; i <= max; i++) {
                        for (var _i = 0, SuitEquipPosAry_1 = game.SuitEquipPosAry; _i < SuitEquipPosAry_1.length; _i++) {
                            var pos = SuitEquipPosAry_1[_i];
                            var hint = this.getComposeHint(type, i, pos);
                            // hintPath, 阶数, 部位
                            mod.HintMgr.setHint(hint, hintPath.concat([i + '', pos + '']));
                            if (hint) {
                                typeHint = hint;
                            }
                        }
                    }
                    return typeHint;
                };
                /**
                 * 获取可以合成的数据【套装,阶数,部位】
                 * 如果没有可以合成的，就选择当前选中的
                 * 如果都没有当前选中的，那就默认 [1, 2, 0]
                 */
                SuitProxy.prototype.getCanComposeData = function () {
                    var suitTypeAry = [1 /* CangTian */, 2 /* YanTian */];
                    var minLv = 2;
                    for (var _i = 0, suitTypeAry_1 = suitTypeAry; _i < suitTypeAry_1.length; _i++) {
                        var type = suitTypeAry_1[_i];
                        var maxLv = this.getMaxStageByType(type);
                        for (var lv = minLv; lv <= maxLv; lv++) {
                            for (var _a = 0, SuitEquipPosAry_2 = game.SuitEquipPosAry; _a < SuitEquipPosAry_2.length; _a++) {
                                var pos = SuitEquipPosAry_2[_a];
                                if (this.getComposeHint(type, lv, pos)) {
                                    return [type, lv, pos];
                                }
                            }
                        }
                    }
                    var ary = this.composeSelAry;
                    if (ary && ary.length) {
                        return ary;
                    }
                    return [suitTypeAry[0], minLv, game.SuitEquipPosAry[0]];
                };
                SuitProxy.prototype.getCanComposeDataByType = function (type) {
                    var minLv = 2;
                    var maxLv = this.getMaxStageByType(type);
                    for (var lv = minLv; lv <= maxLv; lv++) {
                        for (var _i = 0, SuitEquipPosAry_3 = game.SuitEquipPosAry; _i < SuitEquipPosAry_3.length; _i++) {
                            var pos = SuitEquipPosAry_3[_i];
                            if (this.getComposeHint(type, lv, pos)) {
                                return [type, lv, pos];
                            }
                        }
                    }
                    var ary = this.composeSelAry;
                    if (ary && ary.length && ary[0] == type) {
                        return ary;
                    }
                    return [type, minLv, game.SuitEquipPosAry[0]];
                };
                /**======================================合成 end======================================*/
                /**已达强化最大等级*/
                SuitProxy.prototype.isStrengthenMax = function (type, pos) {
                    var info = this.getPosEquipInfo(type, pos);
                    if (!info) {
                        return false;
                    }
                    var maxLv = game.GameConfig.getParamConfigById('taozhuang_maxlv').value;
                    return info.level >= maxLv;
                };
                /**能否一键强化，套装类型1,2*/
                SuitProxy.prototype.canStrengthenOneKey = function (type, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    var info = this.getSuitTypeInfo(type);
                    if (!info || !info.equips || !info.equips.length) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u6682\u65E0\u53EF\u5F3A\u5316\u88C5\u5907");
                        }
                        return false;
                    }
                    var isAllMax = true;
                    for (var _i = 0, SuitEquipPosAry_4 = game.SuitEquipPosAry; _i < SuitEquipPosAry_4.length; _i++) {
                        var pos = SuitEquipPosAry_4[_i];
                        if (!this.isStrengthenMax(type, pos)) {
                            isAllMax = false;
                            break;
                        }
                    }
                    if (isAllMax) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u5DF2\u8FBE\u6700\u5927\u5F3A\u5316\u7B49\u7EA7");
                        }
                        return false;
                    }
                    var cost;
                    for (var _a = 0, _b = info.equips; _a < _b.length; _a++) {
                        var eq = _b[_a];
                        if (eq && this.canStrengthen(type, eq.pos, false)) {
                            return true;
                        }
                        if (!this.isStrengthenMax(type, eq.pos) && !cost) {
                            cost = this.getCost(type, null, eq.level);
                        }
                    }
                    if (isTips && cost) {
                        return mod.BagUtil.checkPropCnt(cost[0], cost[1], 1 /* Dialog */);
                    }
                    return false;
                };
                /**能否强化，类型1,2*/
                SuitProxy.prototype.canStrengthen = function (type, pos, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    var info = this.getPosEquipInfo(type, pos);
                    if (!info) {
                        return false;
                    }
                    if (this.isStrengthenMax(type, pos)) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u5DF2\u8FBE\u6700\u5927\u5F3A\u5316\u7B49\u7EA7");
                        }
                        return false;
                    }
                    var cost = this.getCost(type, null, info.level);
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                /**能否进阶，类型3,4,5*/
                SuitProxy.prototype.canAdvance = function (type, pos, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isMaxOperLv(type, 1 /* JinJie */, pos)) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u5DF2\u8FBE\u6700\u5927\u8FDB\u9636\u7B49\u7EA7");
                        }
                        return false;
                    }
                    var operInfo = this.getPosEquipInfo2(type, pos, 1 /* JinJie */);
                    if (!operInfo) {
                        return false;
                    }
                    var cost = this.getCost(type, 1 /* JinJie */, operInfo.lv);
                    return cost && mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                /**能否一键进阶，类型3,4,5*/
                SuitProxy.prototype.canAdvanceOneKey = function (type, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (type < 3 /* HaoTian */) {
                        return false;
                    }
                    var info = this.getSuitOperInfo(type, 1 /* JinJie */);
                    //未有穿戴情况
                    if (!info || !info.attr_list) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u6761\u4EF6\u4E0D\u8DB3");
                        }
                        return false;
                    }
                    //全部已满级
                    var isAllMax = true;
                    for (var _i = 0, SuitEquipPosAry1_1 = game.SuitEquipPosAry1; _i < SuitEquipPosAry1_1.length; _i++) {
                        var pos = SuitEquipPosAry1_1[_i];
                        if (!this.isMaxOperLv(type, 1 /* JinJie */, pos)) {
                            isAllMax = false;
                            break;
                        }
                    }
                    if (isAllMax) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u5DF2\u6EE1\u7EA7");
                        }
                        return false;
                    }
                    //进阶判断，只要存在一个可以进阶
                    // let cost: number[];
                    for (var _a = 0, _b = info.attr_list; _a < _b.length; _a++) {
                        var equip = _b[_a];
                        if (this.canAdvance(type, equip.pos, false)) {
                            return true;
                        }
                        // if (!this.isMaxOperLv(type, SuitOperType.JinJie, equip.pos)) {
                        //     if (!cost) {
                        //         cost = this.getCost(type, SuitOperType.JinJie, equip.lv);
                        //     }
                        // }
                    }
                    // if (cost && isTips) {
                    //     return BagUtil.checkPropCnt(cost[0], cost[1], PropLackType.Dialog);
                    // }
                    if (isTips) {
                        game.PromptBox.getIns().show("\u6761\u4EF6\u4E0D\u8DB3");
                    }
                    return false;
                };
                /**进阶，锻造，精铸最大等级*/
                SuitProxy.prototype.isMaxOperLv = function (type, operType, pos) {
                    var maxLv = this.getSuitTypeCfg(type).maxLv;
                    var operInfo = this.getPosEquipInfo2(type, pos, operType);
                    if (!operInfo) {
                        return false;
                    }
                    return operInfo.lv >= maxLv;
                };
                /**能否精铸，类型3,4,5*/
                SuitProxy.prototype.canCast = function (type, pos, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (this.isMaxOperLv(type, 3 /* JingZhu */, pos)) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u5DF2\u8FBE\u6700\u5927\u7CBE\u94F8\u7B49\u7EA7");
                        }
                        return false;
                    }
                    var operInfo = this.getPosEquipInfo2(type, pos, 3 /* JingZhu */);
                    if (!operInfo) {
                        return false;
                    }
                    var cost = this.getCost(type, 3 /* JingZhu */, operInfo.lv);
                    return cost && mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                /**能否一键精铸，类型3,4,5*/
                SuitProxy.prototype.canCastOneKey = function (type, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (type < 3 /* HaoTian */) {
                        return false;
                    }
                    var info = this.getSuitOperInfo(type, 3 /* JingZhu */);
                    if (!info || !info.attr_list) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u6761\u4EF6\u4E0D\u8DB3");
                        }
                        return false;
                    }
                    //全部已满级
                    var isAllMax = true;
                    for (var _i = 0, SuitEquipPosAry1_2 = game.SuitEquipPosAry1; _i < SuitEquipPosAry1_2.length; _i++) {
                        var pos = SuitEquipPosAry1_2[_i];
                        if (!this.isMaxOperLv(type, 3 /* JingZhu */, pos)) {
                            isAllMax = false;
                            break;
                        }
                    }
                    if (isAllMax) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u5DF2\u6EE1\u7EA7");
                        }
                        return false;
                    }
                    //精铸判断，只要存在一个可以精铸
                    for (var _a = 0, _b = info.attr_list; _a < _b.length; _a++) {
                        var equip = _b[_a];
                        if (this.canCast(type, equip.pos, false)) {
                            return true;
                        }
                    }
                    if (isTips) {
                        game.PromptBox.getIns().show("\u6761\u4EF6\u4E0D\u8DB3");
                    }
                    return false;
                };
                /**能否锻造，类型3,4,5*/
                SuitProxy.prototype.canForge = function (type, pos, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (!this.checkOpenForge(type)) {
                        return false;
                    }
                    if (this.isMaxOperLv(type, 2 /* DuanZao */, pos)) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u5DF2\u8FBE\u6700\u5927\u953B\u9020\u7B49\u7EA7");
                        }
                        return false;
                    }
                    var operInfo = this.getPosEquipInfo2(type, pos, 1 /* JinJie */); //进阶的穿戴，没有穿戴不可锻造
                    if (!operInfo) {
                        return false;
                    }
                    var info = this.getPosEquipInfo2(type, pos, 2 /* DuanZao */);
                    var cost = this.getCost(type, 2 /* DuanZao */, info && info.lv || 0);
                    return cost && mod.BagUtil.checkPropCnt(cost[0], cost[1], isTips ? 1 /* Dialog */ : 0 /* None */);
                };
                /**判断能否打开锻造界面，只有进阶界面穿戴上了才可以*/
                SuitProxy.prototype.checkOpenForge = function (type) {
                    var info = this.getSuitOperInfo(type, 1 /* JinJie */);
                    return info && info.attr_list && info.attr_list.length > 0;
                };
                /**
                 * 装备表的穿戴条件。类型1,2消耗是自身，其他是等级表消耗
                 * @param index 装备index
                 * @param isTips
                 * @param operType 默认SuitOperType.JinJie。只有3,4,5类型才需要传参，而且只可为1,3
                 */
                SuitProxy.prototype.canDress = function (index, isTips, operType) {
                    if (isTips === void 0) { isTips = false; }
                    if (operType === void 0) { operType = 1 /* JinJie */; }
                    var cfg = game.getConfigByNameId("equipment.json" /* Equip */, index);
                    if (!cfg) {
                        DEBUG && console.error("\u88C5\u5907\u8868\u6CA1\u6709: " + index);
                        return false;
                    }
                    var suitType = this.getIndexType(index);
                    if (suitType < 3 /* HaoTian */) {
                        if (this.getPosEquipInfo(suitType, index % 10)) {
                            return false;
                        }
                    }
                    else {
                        var info = this.getPosEquipInfo2(suitType, index % 10, operType);
                        if (info) {
                            return false;
                        }
                    }
                    //通过条件
                    if (cfg.wear_condition) {
                        var shilianProxy = game.getProxy("49" /* Shilian */, 194 /* Shilian */);
                        var chapter = cfg.wear_condition[0]; //章
                        var gateId = cfg.wear_condition[1]; //关
                        var fbdCfgs = game.getConfigByNameId("forbidden_gate.json" /* ForbiddenGate */, chapter);
                        if (!fbdCfgs || !fbdCfgs[gateId]) {
                            return false;
                        }
                        var type = Math.floor(chapter / 100);
                        var info = shilianProxy.getFbdInfo(type);
                        if (!info || info.index < chapter || (chapter == info.index && gateId > info.id)) {
                            if (isTips) {
                                var fbdCfg = fbdCfgs[gateId];
                                game.PromptBox.getIns().show(game.ForbiddenTypeName[type] + chapter % 100 + '章' + fbdCfg.gate_id + '关开启');
                            }
                            return false;
                        }
                    }
                    // 道具条件
                    if (suitType < 3 /* HaoTian */) {
                        if (!mod.BagUtil.checkPropCnt(index, 1, isTips ? 1 /* Dialog */ : 0 /* None */)) {
                            return false;
                        }
                    }
                    else {
                        if (!mod.BagUtil.checkPropCnt(index, 1)) {
                            return false;
                        }
                        // if (operType == SuitOperType.DuanZao) {
                        //     operType = SuitOperType.JinJie;
                        // }
                        // let cost = this.getCost(suitType, operType, 0);//0级消耗
                        // if (!cost || !BagUtil.checkPropCnt(cost[0], cost[1], isTips ? PropLackType.Dialog :
                        // PropLackType.None)) { return false; }
                    }
                    return true;
                };
                //检查穿戴条件
                SuitProxy.prototype.checkWearCondition = function (cfg) {
                    if (!cfg) {
                        return false;
                    }
                    if (!cfg.wear_condition) {
                        return true; //没有穿戴条件返回 true
                    }
                    var shilianProxy = game.getProxy("49" /* Shilian */, 194 /* Shilian */);
                    var chapter = cfg.wear_condition[0]; //章
                    var gateId = cfg.wear_condition[1]; //关
                    var fbdCfgs = game.getConfigByNameId("forbidden_gate.json" /* ForbiddenGate */, chapter);
                    if (!fbdCfgs || !fbdCfgs[gateId]) {
                        return false;
                    }
                    var type = Math.floor(chapter / 100);
                    var info = shilianProxy.getFbdInfo(type);
                    return !(!info || info.index < chapter || (chapter == info.index && gateId > info.id));
                };
                //高阶装备的id（套装1，2）
                SuitProxy.prototype.getDressAdvancedEquipId = function (type, pos) {
                    if (type > 2 /* YanTian */) {
                        return null;
                    }
                    var info = this.getPosEquipInfo(type, pos);
                    if (!info) {
                        return null; //【未激活对应部位情况下，不可一键穿戴】
                    }
                    var props = this.getSuitEquipListByTypeAndPos(type, pos);
                    var maxStage = info ? this.getIndexLv(info.equipment_id.toNumber()) : 0; //最高阶
                    var maxStageIdx;
                    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                        var prop = props_1[_i];
                        var propStage = this.getIndexLv(prop.index);
                        var equipCfg = prop.cfg;
                        var rebirthLv = mod.RoleUtil.getRebirthLv();
                        var levelDemand = equipCfg.level_demand ? equipCfg.level_demand <= game.RoleVo.ins.level : true;
                        var rebirthLimit = equipCfg.rebirth_limit ? equipCfg.rebirth_limit <= rebirthLv : true;
                        var wearCondition = this.checkWearCondition(equipCfg);
                        if (propStage > maxStage && wearCondition && levelDemand && rebirthLimit) {
                            maxStage = propStage;
                            maxStageIdx = prop.index;
                        }
                    }
                    return maxStageIdx;
                };
                //所有部位的高阶装备的id（套装1，2）
                SuitProxy.prototype.getDressAdvancedEquipIdList = function (type) {
                    var list = [];
                    for (var _i = 0, SuitEquipPosAry_5 = game.SuitEquipPosAry; _i < SuitEquipPosAry_5.length; _i++) {
                        var pos = SuitEquipPosAry_5[_i];
                        var id = this.getDressAdvancedEquipId(type, pos);
                        if (id) {
                            list.push(id);
                        }
                    }
                    return list;
                };
                //有更高阶装备（套装1，2）【未激活对应部位情况下，不可一键穿戴】
                SuitProxy.prototype.canDressAdvanced = function (type, pos) {
                    if (type > 2 /* YanTian */) {
                        return false;
                    }
                    var info = this.getPosEquipInfo(type, pos);
                    if (!info) {
                        return false; //未激活，不可操作
                    }
                    var highId = this.getDressAdvancedEquipId(type, pos);
                    return !!highId;
                };
                //有更高阶装备，一键穿戴（套装1，2）
                SuitProxy.prototype.canDressOneKey = function (type) {
                    if (type > 2 /* YanTian */) {
                        return false;
                    }
                    for (var _i = 0, SuitEquipPosAry_6 = game.SuitEquipPosAry; _i < SuitEquipPosAry_6.length; _i++) {
                        var pos = SuitEquipPosAry_6[_i];
                        if (this.canDressAdvanced(type, pos)) {
                            return true;
                        }
                    }
                    return false;
                };
                /**================================= power =================================*/
                /**
                 * 套装1，2的进阶展示战力
                 * @param type
                 */
                SuitProxy.prototype.getPowerForAdvance = function (type) {
                    var info = this.getSuitTypeInfo(type);
                    if (!info) {
                        return 0;
                    }
                    var power = 0;
                    if (info.suit_attr && info.suit_attr.showpower) {
                        power += info.suit_attr.showpower.toNumber();
                    }
                    if (info.equips) {
                        for (var _i = 0, _a = info.equips; _i < _a.length; _i++) {
                            var equip = _a[_i];
                            var attr = equip.attr;
                            if (attr && attr.showpower) {
                                power += attr.showpower.toNumber();
                            }
                        }
                    }
                    return power;
                };
                /**
                 * 套装1，2的强化展示战力
                 * @param type
                 */
                SuitProxy.prototype.getPowerForStrengthen = function (type) {
                    var info = this.getSuitTypeInfo(type);
                    if (!info) {
                        return 0;
                    }
                    var power = 0;
                    if (info.master_attr && info.master_attr.showpower) {
                        power += info.master_attr.showpower.toNumber();
                    }
                    if (info.equips) {
                        for (var _i = 0, _a = info.equips; _i < _a.length; _i++) {
                            var equip = _a[_i];
                            var attr = equip.lv_attr;
                            if (attr && attr.showpower) {
                                power += attr.showpower.toNumber();
                            }
                        }
                    }
                    return power;
                };
                /**套装类型3,4,5的各种操作战力*/
                SuitProxy.prototype.getPower2 = function (type, operType) {
                    var typeInfo = this.getSuitOperInfo(type, operType);
                    if (!typeInfo || !typeInfo.attr_list) {
                        return 0;
                    }
                    var power = 0;
                    for (var _i = 0, _a = typeInfo.attr_list; _i < _a.length; _i++) {
                        var equip = _a[_i];
                        if (equip && equip.attr && equip.attr.showpower) {
                            power += equip.attr.showpower.toNumber();
                        }
                    }
                    //颢天的锻造需处理神装属性加成
                    if (type == 3 /* HaoTian */ && operType == 2 /* DuanZao */) {
                        var val = this.getShenZhuangVal();
                        power = power * (1 + val / 10000);
                    }
                    return Math.floor(power);
                };
                /**类型3的锻造大师等级*/
                SuitProxy.prototype.getMasterLv = function () {
                    var infos = this.getSuitOperInfo(3 /* HaoTian */, 2 /* DuanZao */);
                    if (!infos || !infos.attr_list || infos.attr_list.length < game.SuitEquipPosAry1.length) {
                        return 0;
                    }
                    var minLv;
                    for (var _i = 0, _a = infos.attr_list; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (minLv == undefined) {
                            minLv = item.lv;
                        }
                        minLv = Math.min(item.lv, minLv);
                    }
                    return minLv;
                };
                //神装属性
                SuitProxy.prototype.getShenZhuangVal = function () {
                    var lv = this.getMasterLv();
                    var paramCfg = game.GameConfig.getParamConfigById('suit_forge_master');
                    //神装属性万分比
                    return lv > 0 ? paramCfg.value[lv - 1] : 0;
                };
                //buff描述
                SuitProxy.prototype.getBuffDesc = function (buff_id) {
                    var cfg = game.getConfigByNameId("buff.json" /* Buff */, buff_id);
                    return cfg ? cfg.des : '';
                };
                SuitProxy.prototype.getFilterAttrKey = function (type, pos) {
                    if (!game.SuitTypePosAttr[pos]) {
                        return [];
                    }
                    return game.SuitTypePosAttr[pos][type] || [];
                };
                //获取不同套装不同部位展示的属性
                SuitProxy.prototype.getFilterAttr = function (type, pos, attr) {
                    var newAttr = new attributes();
                    if (!attr) {
                        return newAttr;
                    }
                    var attrKeys = this.getFilterAttrKey(type, pos);
                    var keys = Object.keys(attr);
                    for (var i = 0; i < keys.length; i++) {
                        if (attrKeys.indexOf(keys[i]) > -1) {
                            newAttr[keys[i]] = attr[keys[i]];
                        }
                    }
                    return newAttr;
                };
                /**================================= hint =================================*/
                //部位红点
                SuitProxy.prototype.getSuitIconHint = function (type, operType, pos) {
                    if (type >= 3 /* HaoTian */) {
                        //套装3，4，5
                        var index = this.getIndex2(type, pos, operType);
                        if (operType == 1 /* JinJie */) {
                            return this.canDress(index, false, 1 /* JinJie */) || this.canAdvance(type, pos);
                        }
                        else if (operType == 2 /* DuanZao */) {
                            return this.canForge(type, pos);
                        }
                        else {
                            return this.canDress(index, false, 3 /* JingZhu */) || this.canCast(type, pos);
                        }
                    }
                    //套装1，2
                    if (operType == 1 /* JinJie */) {
                        var index = this.getIndexForDress(type, pos);
                        return this.canDress(index, false, operType) || this.canDressAdvanced(type, pos);
                    }
                    else {
                        return this.canStrengthen(type, pos);
                    }
                };
                /**二级页签红点*/
                SuitProxy.prototype.getSuitHint = function (type, operType) {
                    var posAry = type < 3 /* HaoTian */ ? game.SuitEquipPosAry : game.SuitEquipPosAry1;
                    for (var _i = 0, posAry_1 = posAry; _i < posAry_1.length; _i++) {
                        var pos = posAry_1[_i];
                        if (this.getSuitIconHint(type, operType, pos)) {
                            return true;
                        }
                    }
                    return false;
                };
                /**类型1,2的红点*/
                SuitProxy.prototype.updateHint1 = function () {
                    var ary = [1 /* CangTian */, 2 /* YanTian */];
                    var operAry = [1 /* JinJie */, 2 /* DuanZao */];
                    for (var _i = 0, ary_1 = ary; _i < ary_1.length; _i++) {
                        var type = ary_1[_i];
                        if (!mod.ViewMgr.getIns().checkViewOpen(game.SuitTypeOpenIdx[type], false)) {
                            continue;
                        }
                        for (var _a = 0, operAry_1 = operAry; _a < operAry_1.length; _a++) {
                            var operType = operAry_1[_a];
                            var isHint = this.getSuitHint(type, operType);
                            if (operType == 1 /* JinJie */ && !isHint) {
                                isHint = isHint || this.getTotalComposeHint(); //合成红点
                            }
                            mod.HintMgr.setHint(isHint, this._model.hintPath[type][operType]);
                        }
                    }
                };
                /**类型3,4,5的红点*/
                SuitProxy.prototype.updateHint2 = function () {
                    var ary = [3 /* HaoTian */, 4 /* XuanTian */, 5 /* JunTian */];
                    var operAry = [1 /* JinJie */, 2 /* DuanZao */, 3 /* JingZhu */];
                    for (var _i = 0, ary_2 = ary; _i < ary_2.length; _i++) {
                        var type = ary_2[_i];
                        if (!mod.ViewMgr.getIns().checkViewOpen(game.SuitTypeOpenIdx[type], false)) {
                            continue;
                        }
                        for (var _a = 0, operAry_2 = operAry; _a < operAry_2.length; _a++) {
                            var operType = operAry_2[_a];
                            var isHint = this.getSuitHint(type, operType);
                            mod.HintMgr.setHint(isHint, this._model.hintPath[type][operType]);
                        }
                    }
                };
                /**背包类型更新*/
                SuitProxy.prototype.onBagUpdateByBagType = function (n) {
                    var types = n.body;
                    if (types.indexOf(12 /* Suit */) > -1) {
                        this.updateHint1();
                        this.updateHint2();
                    }
                };
                SuitProxy.prototype.getCostIndexAry = function () {
                    if (this._costIndexAry && this._costIndexAry.length) {
                        return this._costIndexAry;
                    }
                    var cost = this.getCost(1 /* CangTian */, null, 0);
                    if (cost) {
                        this._costIndexAry.push(cost[0]);
                    }
                    cost = this.getCost(2 /* YanTian */, null, 0);
                    if (cost && this._costIndexAry.indexOf(cost[0]) < 0) {
                        this._costIndexAry.push(cost[0]);
                    }
                    var typeAry = [3 /* HaoTian */, 4 /* XuanTian */, 5 /* JunTian */];
                    var operAry = [1 /* JinJie */, 2 /* DuanZao */, 3 /* JingZhu */];
                    for (var _i = 0, typeAry_1 = typeAry; _i < typeAry_1.length; _i++) {
                        var type = typeAry_1[_i];
                        for (var _a = 0, operAry_3 = operAry; _a < operAry_3.length; _a++) {
                            var operType = operAry_3[_a];
                            cost = this.getCost(type, operType, 0);
                            if (cost && this._costIndexAry.indexOf(cost[0]) < 0) {
                                this._costIndexAry.push(cost[0]);
                            }
                            //有部分穿戴不需要额外消耗
                            cost = this.getCost(type, operType, 1);
                            if (cost && this._costIndexAry.indexOf(cost[0]) < 0) {
                                this._costIndexAry.push(cost[0]);
                            }
                        }
                    }
                    return this._costIndexAry;
                };
                /**道具indexs更新*/
                SuitProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    var costAry = this.getCostIndexAry();
                    for (var _i = 0, costAry_1 = costAry; _i < costAry_1.length; _i++) {
                        var idx = costAry_1[_i];
                        if (indexs.indexOf(idx) > -1) {
                            this.updateHint1();
                            this.updateHint2();
                            break;
                        }
                    }
                };
                SuitProxy.prototype.onOpenFuncInit = function (n) {
                    this.onOpenFuncUpdate(n);
                };
                SuitProxy.prototype.onOpenFuncUpdate = function (n) {
                    var addIdxs = n.body;
                    var ary = [1041670126 /* SuitType1 */, 1041670127 /* SuitType2 */, 1041670128 /* SuitType3 */, 1041670129 /* SuitType4 */, 1041670130 /* SuitType5 */,
                        1041670252 /* SuitForge3 */, 1041670253 /* SuitForge4 */, 1041670254 /* SuitForge5 */, 1041670131 /* SuitCast3 */, 1041670132 /* SuitCast4 */, 1041670133 /* SuitCast5 */];
                    for (var _i = 0, addIdxs_1 = addIdxs; _i < addIdxs_1.length; _i++) {
                        var idx = addIdxs_1[_i];
                        if (ary.indexOf(idx) > -1) {
                            this.updateHint1();
                            this.updateHint2();
                            break;
                        }
                    }
                };
                SuitProxy.prototype.onForbiddenInfoUpdate = function () {
                    this.updateHint2();
                };
                return SuitProxy;
            }(game.ProxyBase));
            role.SuitProxy = SuitProxy;
            __reflect(SuitProxy.prototype, "game.mod.role.SuitProxy");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var ArrayCollection = eui.ArrayCollection;
            var Event = egret.Event;
            var facade = base.facade;
            var SuitComposeTypeTab = /** @class */ (function (_super) {
                __extends(SuitComposeTypeTab, _super);
                function SuitComposeTypeTab() {
                    var _this = _super.call(this) || this;
                    _this._curSelIdx = 0; //当前选择
                    _this.skinName = "skins.role.SuitComposeTypeTabSkin";
                    _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                SuitComposeTypeTab.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("06" /* Role */, 76 /* Suit */);
                    this.list_item.itemRenderer = role.SuitComposeTypeTabItem;
                    this.list_item.dataProvider = this._listData = new ArrayCollection();
                    this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.list_item.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    this.scr['$hasScissor'] = true;
                    this.list_item.useVirtualLayout = false;
                };
                SuitComposeTypeTab.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                };
                SuitComposeTypeTab.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lab_type.text = game.SuitTypeName[data.type]; //套装名称
                    this.redPoint.visible = !!data.hint;
                    if (data.sel) {
                        this.updateList();
                        var lv = this._proxy.composeSelAry[1] || 2; //阶数，从2阶开始
                        var selIdx = Math.max(lv - 2, 0);
                        this.list_item.selectedIndex = this._curSelIdx = selIdx;
                    }
                    else {
                        this._listData.replaceAll([]);
                    }
                };
                //更新阶数列表
                SuitComposeTypeTab.prototype.updateList = function () {
                    var ary = [];
                    var maxStage = this._proxy.getMaxStageByType(this.data.type);
                    var selLv = this._proxy.composeSelAry[1] || 2; //阶数，从2阶开始
                    for (var lv = 2; lv <= maxStage; lv++) {
                        var item = {
                            type: this.data.type,
                            lv: lv,
                            hint: mod.HintMgr.getHint(this._proxy.model.composeHintPath[this.data.type].concat([lv + ''])),
                            sel: this._curSelIdx != -1 && lv == selLv
                        };
                        ary.push(item);
                    }
                    if (this._listData.source && this._listData.source.length > 0) {
                        this._listData.replaceAll(ary);
                    }
                    else {
                        this._listData.source = ary;
                    }
                };
                //点击阶数
                SuitComposeTypeTab.prototype.onClickList = function (e) {
                    if (this._proxy.composeSelPos) {
                        this._proxy.composeSelPos = false;
                        return;
                    }
                    this._proxy.composeSelSub = true;
                    if (e.itemIndex == this._curSelIdx) {
                        this.list_item.selectedIndex = this._curSelIdx = -1;
                        this.updateList();
                        return;
                    }
                    //抛出数据刷新 mdr 的右边视图
                    facade.sendNt("ON_SUIT_COMPOSE_SELECT_UPDATE" /* ON_SUIT_COMPOSE_SELECT_UPDATE */, [this.data.type, e.itemIndex + 2, game.SuitEquipPosAry[0]]);
                    this._curSelIdx = e.itemIndex;
                    this.updateList();
                };
                return SuitComposeTypeTab;
            }(mod.BaseListenerRenderer));
            role.SuitComposeTypeTab = SuitComposeTypeTab;
            __reflect(SuitComposeTypeTab.prototype, "game.mod.role.SuitComposeTypeTab");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitComposeTypeTabItem = /** @class */ (function (_super) {
                __extends(SuitComposeTypeTabItem, _super);
                function SuitComposeTypeTabItem() {
                    var _this = _super.call(this) || this;
                    _this._curSelIdx = 0;
                    _this.skinName = "skins.role.SuitComposeTypeTabItemSkin";
                    return _this;
                }
                SuitComposeTypeTabItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.list_item.itemRenderer = role.SuitComposeTypeTabItemPos;
                    this.list_item.dataProvider = this._listData = new eui.ArrayCollection();
                    this._proxy = game.getProxy("06" /* Role */, 76 /* Suit */);
                    this.addEventListenerEx(eui.ItemTapEvent.ITEM_TAP, this.list_item, this.onClickList, this);
                };
                SuitComposeTypeTabItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                SuitComposeTypeTabItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lab_name.text = this._proxy.getChineseNum(data.lv) + '阶';
                    this.redPoint.visible = !!data.hint;
                    if (data.sel) {
                        var list = [];
                        for (var _i = 0, SuitEquipPosAry_7 = game.SuitEquipPosAry; _i < SuitEquipPosAry_7.length; _i++) {
                            var pos = SuitEquipPosAry_7[_i];
                            list.push({
                                pos: pos,
                                hint: mod.HintMgr.getHint(this._proxy.model.composeHintPath[data.type].concat([data.lv + '', pos + '']))
                            });
                        }
                        this._listData.replaceAll(list);
                        var selPos = this._proxy.composeSelAry[2] || 0; //当前选中的pos
                        var posIdx = game.SuitEquipPosAry.indexOf(selPos);
                        this.list_item.selectedIndex = this._curSelIdx = posIdx;
                    }
                    else {
                        this._listData.replaceAll([]);
                    }
                };
                //点击部位
                SuitComposeTypeTabItem.prototype.onClickList = function (e) {
                    this._proxy.composeSelPos = true;
                    this._proxy.composeSelPos2 = true;
                    if (e.itemIndex == this._curSelIdx) {
                        return;
                    }
                    this._curSelIdx = e.itemIndex;
                    // 点击部位，抛出事件更新mdr右边
                    base.facade.sendNt("ON_SUIT_COMPOSE_SELECT_UPDATE" /* ON_SUIT_COMPOSE_SELECT_UPDATE */, [this.data.type, this.data.lv, e.item.pos]);
                };
                return SuitComposeTypeTabItem;
            }(mod.BaseListenerRenderer));
            role.SuitComposeTypeTabItem = SuitComposeTypeTabItem;
            __reflect(SuitComposeTypeTabItem.prototype, "game.mod.role.SuitComposeTypeTabItem");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitComposeTypeTabItemPos = /** @class */ (function (_super) {
                __extends(SuitComposeTypeTabItemPos, _super);
                function SuitComposeTypeTabItemPos() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SuitComposeTypeTabItemPos.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lab_name.text = game.getLanById(game.EquipPosName[data.pos]);
                    this.redPoint.visible = !!data.hint;
                };
                return SuitComposeTypeTabItemPos;
            }(mod.BaseListenerRenderer));
            role.SuitComposeTypeTabItemPos = SuitComposeTypeTabItemPos;
            __reflect(SuitComposeTypeTabItemPos.prototype, "game.mod.role.SuitComposeTypeTabItemPos");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitComposeView = /** @class */ (function (_super) {
                __extends(SuitComposeView, _super);
                function SuitComposeView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.SuitComposeSkin";
                    return _this;
                }
                return SuitComposeView;
            }(eui.Component));
            role.SuitComposeView = SuitComposeView;
            __reflect(SuitComposeView.prototype, "game.mod.role.SuitComposeView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitEquipBagTipsView = /** @class */ (function (_super) {
                __extends(SuitEquipBagTipsView, _super);
                function SuitEquipBagTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.SuitEquipBagTipsSkin";
                    return _this;
                }
                return SuitEquipBagTipsView;
            }(eui.Component));
            role.SuitEquipBagTipsView = SuitEquipBagTipsView;
            __reflect(SuitEquipBagTipsView.prototype, "game.mod.role.SuitEquipBagTipsView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitEquipTipsView = /** @class */ (function (_super) {
                __extends(SuitEquipTipsView, _super);
                function SuitEquipTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.SuitEquipTipsSkin";
                    return _this;
                }
                return SuitEquipTipsView;
            }(eui.Component));
            role.SuitEquipTipsView = SuitEquipTipsView;
            __reflect(SuitEquipTipsView.prototype, "game.mod.role.SuitEquipTipsView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitForgeBtn = /** @class */ (function (_super) {
                __extends(SuitForgeBtn, _super);
                function SuitForgeBtn() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.SuitForgeBtnSkin";
                    return _this;
                }
                /**
                 * 更新等级
                 * @param lv
                 */
                SuitForgeBtn.prototype.updateLv = function (lv) {
                    this.lb_lv.text = lv + game.getLanById("lv" /* lv */);
                };
                return SuitForgeBtn;
            }(mod.Btn));
            role.SuitForgeBtn = SuitForgeBtn;
            __reflect(SuitForgeBtn.prototype, "game.mod.role.SuitForgeBtn");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitForgeMasterView = /** @class */ (function (_super) {
                __extends(SuitForgeMasterView, _super);
                function SuitForgeMasterView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.SuitForgeMasterSkin";
                    return _this;
                }
                return SuitForgeMasterView;
            }(eui.Component));
            role.SuitForgeMasterView = SuitForgeMasterView;
            __reflect(SuitForgeMasterView.prototype, "game.mod.role.SuitForgeMasterView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitForgeView = /** @class */ (function (_super) {
                __extends(SuitForgeView, _super);
                function SuitForgeView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.SuitForgeSkin";
                    return _this;
                }
                return SuitForgeView;
            }(eui.Component));
            role.SuitForgeView = SuitForgeView;
            __reflect(SuitForgeView.prototype, "game.mod.role.SuitForgeView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitGiftItemRender = /** @class */ (function (_super) {
                __extends(SuitGiftItemRender, _super);
                function SuitGiftItemRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SuitGiftItemRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("53" /* Gift */, 201 /* Gift */);
                };
                SuitGiftItemRender.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.img_bought.visible = data.status && data.status.status == 2; //2已领取
                    this.btn_buy.visible = !this.img_bought.visible;
                    if (this.btn_buy.visible) {
                        this.btn_buy.setCost(data.cfg.award_buy[0]);
                        this.btn_buy.setHint(data.status && data.status.status == 1); //1可领取
                    }
                    this._listData.replaceAll(data.cfg.award.slice());
                    var target = data.cfg.target[0];
                    var finish_cnt = data.status ? data.status.finish_cnt : 0;
                    var str = game.SuitTypeName[data.type] + '套装达到' + target + '阶可购买' +
                        game.TextUtil.addColor("(" + finish_cnt + "/" + target + ")", finish_cnt >= target ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(str);
                };
                SuitGiftItemRender.prototype.onClick = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    if (!data.status || data.status.status != 1) {
                        game.PromptBox.getIns().show("\u672A\u6EE1\u8DB3\u8D2D\u4E70\u6761\u4EF6");
                        return;
                    }
                    if (!data.cfg || !data.cfg.award_buy) {
                        return;
                    }
                    for (var _i = 0, _a = data.cfg.award_buy; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (!mod.BagUtil.checkPropCnt(item[0], item[1], 2 /* Text */)) {
                            return;
                        }
                    }
                    this._proxy.c2s_jinjie_stage_get_reward(data.type + 1, data.cfg.index);
                };
                return SuitGiftItemRender;
            }(mod.BaseGiftItemRender));
            role.SuitGiftItemRender = SuitGiftItemRender;
            __reflect(SuitGiftItemRender.prototype, "game.mod.role.SuitGiftItemRender");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TouchEvent = egret.TouchEvent;
            var SuitIcon = /** @class */ (function (_super) {
                __extends(SuitIcon, _super);
                function SuitIcon() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.SuitIconSkin";
                    return _this;
                }
                SuitIcon.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.lb_cond, this.onClickCond, this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.img_lock, this.onClickLock, this);
                };
                SuitIcon.prototype.dataChanged = function () {
                    var data = this.data;
                    this.redPoint.visible = data && data.showHint;
                    //未激活
                    if (!data || !data.isAct) {
                        this.defaultView();
                        return;
                    }
                    //已激活的
                    this.actedView();
                };
                SuitIcon.prototype.actedView = function () {
                    this.img_lock.visible = false;
                    this.lb_cond.visible = false;
                    var data = this.data;
                    var prop = game.PropData.create(data.index);
                    if (!prop) {
                        return;
                    }
                    this.icon.setData(prop, 3 /* NotTips */);
                    this.setSel(!!data.isSel);
                    var lvStr;
                    if (data.type >= 3 /* HaoTian */) {
                        lvStr = data.stage + "\u9636";
                        this.icon.updateStage(0);
                    }
                    else {
                        lvStr = "+" + data.level;
                        this.icon.updateStage(data.stage || 0, '阶');
                    }
                    this.icon.updateCnt(lvStr);
                    this.img_add.visible = false;
                };
                SuitIcon.prototype.defaultView = function () {
                    this.setSel(false);
                    this.icon.updateStage(0);
                    this.icon.updateIconImg("equip_icon_gray_" + this.data.pos);
                    this.img_lock.visible = false;
                    this.lb_cond.visible = false;
                    this.img_add.visible = false;
                    var operType = this.data.operType;
                    if (operType == 1 /* JinJie */) {
                        this.updateIcon();
                        this.lb_cond.visible = this.img_lock.visible = true;
                        this.lb_cond.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(this.data.cond || '', 0xFFF053));
                        this.img_lock.source = this.data.showHint ? "common_gray" : "common_gray_icon";
                    }
                    else if (operType == 2 /* DuanZao */) {
                        this.img_add.visible = this.data.type < 3 /* HaoTian */;
                    }
                    else if (operType == 3 /* JingZhu */) {
                        this.updateIcon();
                    }
                };
                SuitIcon.prototype.updateIcon = function () {
                    var equipCfg = game.getConfigByNameId("equipment.json" /* Equip */, this.data.index);
                    if (equipCfg) {
                        this.icon.updateIconImg(equipCfg.icon);
                        this.icon.updateQualityImg(game.ResUtil.getPropQualityImg(equipCfg.quality));
                    }
                };
                SuitIcon.prototype.onClickCond = function () {
                    if (this.data.type <= 2 /* YanTian */ && this.data.cond) {
                        var equipCfg = game.getConfigByNameId("equipment.json" /* Equip */, this.data.index);
                        var gainId = equipCfg && equipCfg.gain_id && equipCfg.gain_id[0] || 0;
                        mod.ViewMgr.getIns().showViewByID(gainId);
                        return;
                    }
                    if (this.data.operType == 1 /* JinJie */ && this.data.cond) {
                        this.onClickLock();
                        var fdbType = this.data.cond.slice(0, 1);
                        mod.ViewMgr.getIns().showView("49" /* Shilian */, "01" /* ShilianMain */, ["02" /* Forbidden */, +fdbType]);
                    }
                };
                SuitIcon.prototype.onClickLock = function () {
                    if (this.data.type <= 2 /* YanTian */ && this.data.cond) {
                        var equipCfg = game.getConfigByNameId("equipment.json" /* Equip */, this.data.index);
                        var gainId = equipCfg && equipCfg.gain_id && equipCfg.gain_id[0] || 0;
                        if (gainId && !mod.ViewMgr.getIns().showJumpBtn(gainId)) {
                            game.PromptBox.getIns().show("\u6682\u672A\u5F00\u542F");
                        }
                        return;
                    }
                    if (this.data.operType == 1 /* JinJie */ && this.data.cond) {
                        var fbdType = this.data.cond.slice(0, 1);
                        game.PromptBox.getIns().show(game.ForbiddenTypeName[+fbdType] + this.data.cond + '开启');
                    }
                };
                /**是否选中*/
                SuitIcon.prototype.setSel = function (isSel) {
                    if (isSel === void 0) { isSel = false; }
                    this.img_sel.visible = isSel;
                };
                return SuitIcon;
            }(mod.BaseListenerRenderer));
            role.SuitIcon = SuitIcon;
            __reflect(SuitIcon.prototype, "game.mod.role.SuitIcon");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var ArrayCollection = eui.ArrayCollection;
            var facade = base.facade;
            var SuitIconList = /** @class */ (function (_super) {
                __extends(SuitIconList, _super);
                function SuitIconList() {
                    var _this = _super.call(this) || this;
                    // 套装类型1,2  1进阶，2强化
                    // 套装类型3,4,5，SuitOperType 1进阶2锻造3精铸
                    _this._operType = 1;
                    _this.skinName = "skins.role.SuitIconListSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                SuitIconList.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("06" /* Role */, 76 /* Suit */);
                    this.list.itemRenderer = role.SuitIcon;
                    this.list.dataProvider = this._listData = new ArrayCollection();
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick, this);
                };
                SuitIconList.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClick, this);
                };
                /**
                 * @param type SuitType 1,2
                 * @param operType SuitOperType
                 */
                SuitIconList.prototype.updateView = function (type, operType) {
                    if (operType === void 0) { operType = 1 /* JinJie */; }
                    this._type = type;
                    this._operType = operType;
                    var list = [];
                    for (var _i = 0, SuitEquipPosAry_8 = game.SuitEquipPosAry; _i < SuitEquipPosAry_8.length; _i++) {
                        var pos = SuitEquipPosAry_8[_i];
                        var equip = this._proxy.getPosEquipInfo(type, pos);
                        var index = equip ? equip.equipment_id.toNumber() : this._proxy.getIndexForBag(type, pos);
                        var cond = void 0;
                        if (!index) {
                            index = this._proxy.getIndex(type, 1, pos);
                            cond = this.getOpenCond(index, operType);
                        }
                        var d = {
                            type: type,
                            operType: operType,
                            pos: pos,
                            index: index,
                            cond: cond,
                            isAct: !!equip,
                            showHint: this._proxy.getSuitIconHint(type, operType, pos),
                            stage: equip && equip.stage ? equip.stage : 0,
                            level: equip && equip.level ? equip.level : 0 //强化等级
                        };
                        list.push(d);
                    }
                    this._listData.replaceAll(list);
                };
                /**
                 * @param type SuitType 3,4,5
                 * @param operType SuitOperType
                 */
                SuitIconList.prototype.updateView2 = function (type, operType) {
                    this._type = type;
                    this._operType = operType;
                    var list = [];
                    var iconData;
                    //进阶激活，锻造就激活了。精铸另外激活
                    var oType = operType != 3 /* JingZhu */ ? 1 /* JinJie */ : 3 /* JingZhu */;
                    for (var i = 0; i < game.SuitEquipPosAry1.length; i++) {
                        var pos = game.SuitEquipPosAry1[i];
                        var operData = this._proxy.getPosEquipInfo2(type, pos, oType); //进阶或精铸
                        var operData1 = this._proxy.getPosEquipInfo2(type, pos, operType); //对应操作类型数据
                        var lv = operData1 && operData1.lv || 0; //对应操作类型的等级
                        var index = this._proxy.getIndex2(type, pos, oType); //装备id
                        var cond = void 0;
                        var isAct = operData && operData.lv > 0;
                        if (!isAct) {
                            cond = this.getOpenCond(index, operType);
                        }
                        var item = {
                            type: type,
                            operType: operType,
                            pos: pos,
                            index: index,
                            isAct: isAct,
                            stage: lv,
                            showHint: this._proxy.getSuitIconHint(type, operType, pos),
                            cond: cond
                        };
                        list.push(item);
                        if (!iconData && operData) {
                            iconData = item;
                            this._selIconIdx = i;
                        }
                    }
                    this._listData.replaceAll(list);
                    //选择第一个已穿戴的icon数据
                    if (iconData) {
                        facade.sendNt("ON_SUIT_DUANZAO_SWITCH_ICON_INFO" /* ON_SUIT_DUANZAO_SWITCH_ICON_INFO */, iconData);
                        if (operType == 2 /* DuanZao */) {
                            this.updateIconSel(this._selIconIdx, true);
                        }
                    }
                };
                /**
                 * 激活条件
                 * 类型1,2，读取跳转路径
                 * 类型3,4,5，读取装备穿戴条件
                 * @param index
                 * @param operType
                 * @private
                 */
                SuitIconList.prototype.getOpenCond = function (index, operType) {
                    if (operType != 1 /* JinJie */) {
                        return null;
                    }
                    //已有这件装备，不需要展示条件
                    if (mod.BagUtil.checkPropCnt(index, 1)) {
                        return null;
                    }
                    var equipCfg = game.getConfigByNameId("equipment.json" /* Equip */, index);
                    if (this._type <= 2 /* YanTian */ && equipCfg.gain_id[0]) {
                        var jumpCfg = game.getConfigByNameId("jump.json" /* Jump */, equipCfg.gain_id[0]);
                        if (jumpCfg) {
                            return jumpCfg.name;
                        }
                        return null;
                    }
                    var cond;
                    if (equipCfg && equipCfg.wear_condition) {
                        var fbdCfgs = game.getConfigByNameId("forbidden_gate.json" /* ForbiddenGate */, equipCfg.wear_condition[0]);
                        var fbdCfg = fbdCfgs ? fbdCfgs[equipCfg.wear_condition[1]] : null;
                        if (fbdCfg) {
                            cond = equipCfg.wear_condition[0] % 100 + "\u7AE0" + fbdCfg.gate_id + "\u5173";
                        }
                    }
                    return cond;
                };
                /**更新红点*/
                SuitIconList.prototype.updateListHint = function () {
                    var size = this._listData.source.length;
                    for (var i = 0; i < size; i++) {
                        var data = this._listData.source[i];
                        if (!data) {
                            continue;
                        }
                        data.showHint = this._proxy.getSuitIconHint(this._type, this._operType, data.pos);
                        this._listData.itemUpdated(data);
                    }
                };
                SuitIconList.prototype.onClick = function (e) {
                    var data = e.item;
                    if (!!data.cond) {
                        return;
                    }
                    if (this._type < 3 /* HaoTian */) {
                        //1,2套装
                        if (this._operType == 1) {
                            if (!data.isAct && !mod.BagUtil.checkPropCnt(data.index, 1, 1 /* Dialog */)) {
                                return;
                            }
                            facade.showView("06" /* Role */, "07" /* SuitEquipTips */, data);
                        }
                        else {
                            if (!data.isAct) {
                                return;
                            }
                            facade.showView("06" /* Role */, "11" /* SuitEquipStrengthenTips */, data);
                        }
                    }
                    else {
                        //3,4,5套装
                        if (this._operType == 2 /* DuanZao */ && !data.isAct) {
                            return;
                        }
                        if (this._operType == 1 /* JinJie */ && !data.isAct && !mod.BagUtil.checkPropCnt(data.index, 1, 1 /* Dialog */)) {
                            return;
                        }
                        if (this._operType == 2 /* DuanZao */) { //锻造点击不需要弹出tips
                            facade.sendNt("ON_SUIT_DUANZAO_SWITCH_ICON_INFO" /* ON_SUIT_DUANZAO_SWITCH_ICON_INFO */, data);
                            this.updateIconSel(this._selIconIdx, false);
                            this._selIconIdx = e.itemIndex;
                            this.updateIconSel(this._selIconIdx, true);
                            return;
                        }
                        if (!data.isAct && !mod.BagUtil.checkPropCnt(data.index, 1, 1 /* Dialog */)) {
                            return;
                        }
                        facade.showView("06" /* Role */, "12" /* SuitEquipTips2 */, { data: data, operType: this._operType });
                    }
                };
                /**设置选中*/
                SuitIconList.prototype.updateIconSel = function (index, isSel) {
                    if (isSel === void 0) { isSel = false; }
                    if (index != null && this._listData.source[index]) {
                        var iconData = this._listData.source[index];
                        iconData.isSel = isSel;
                        this._listData.itemUpdated(iconData);
                    }
                };
                // 锻造一次后，自动选择锻造等级最低那个
                SuitIconList.prototype.updateMinForgeLv = function () {
                    if (this._selIconIdx == null || this._operType != 2 /* DuanZao */) {
                        return;
                    }
                    var data = this._listData.source[this._selIconIdx];
                    var operInfo = this._proxy.getPosEquipInfo2(data.type, data.pos, 2 /* DuanZao */);
                    data.stage = operInfo && operInfo.lv || 0;
                    this._listData.itemUpdated(data);
                    var size = this._listData.source.length;
                    var minLv = 100000;
                    var minIdx = 0;
                    for (var i = 0; i < size; i++) {
                        var d = this._listData.source[i];
                        if (d.isAct && d.stage < minLv) {
                            minLv = d.stage;
                            minIdx = i;
                        }
                    }
                    if (this._selIconIdx != minIdx) {
                        this.updateIconSel(this._selIconIdx, false);
                        this._selIconIdx = minIdx;
                        this.updateIconSel(this._selIconIdx, true);
                    }
                    facade.sendNt("ON_SUIT_DUANZAO_SWITCH_ICON_INFO" /* ON_SUIT_DUANZAO_SWITCH_ICON_INFO */, this._listData.source[minIdx]);
                };
                return SuitIconList;
            }(eui.Component));
            role.SuitIconList = SuitIconList;
            __reflect(SuitIconList.prototype, "game.mod.role.SuitIconList");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitStageTipsView = /** @class */ (function (_super) {
                __extends(SuitStageTipsView, _super);
                function SuitStageTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.SuitStageTipsSkin";
                    return _this;
                }
                return SuitStageTipsView;
            }(eui.Component));
            role.SuitStageTipsView = SuitStageTipsView;
            __reflect(SuitStageTipsView.prototype, "game.mod.role.SuitStageTipsView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitStrengthenMasterBtn = /** @class */ (function (_super) {
                __extends(SuitStrengthenMasterBtn, _super);
                function SuitStrengthenMasterBtn() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.SuitStrengthenMasterBtnSkin";
                    return _this;
                }
                SuitStrengthenMasterBtn.prototype.updateLv = function (lv) {
                    this.lb_lv.text = lv + game.getLanById("tishi_43" /* tishi_43 */);
                };
                SuitStrengthenMasterBtn.prototype.setHint = function (hint) {
                    if (hint === void 0) { hint = false; }
                    this.redPoint.visible = hint;
                };
                return SuitStrengthenMasterBtn;
            }(eui.Component));
            role.SuitStrengthenMasterBtn = SuitStrengthenMasterBtn;
            __reflect(SuitStrengthenMasterBtn.prototype, "game.mod.role.SuitStrengthenMasterBtn");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitUpLvBtn = /** @class */ (function (_super) {
                __extends(SuitUpLvBtn, _super);
                function SuitUpLvBtn() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.SuitUpLvBtnSkin";
                    return _this;
                }
                SuitUpLvBtn.prototype.setLock = function (isLock) {
                    if (isLock === void 0) { isLock = true; }
                    this.gr_lock.visible = isLock;
                };
                return SuitUpLvBtn;
            }(mod.Btn));
            role.SuitUpLvBtn = SuitUpLvBtn;
            __reflect(SuitUpLvBtn.prototype, "game.mod.role.SuitUpLvBtn");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitView = /** @class */ (function (_super) {
                __extends(SuitView, _super);
                function SuitView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.SuitSkin";
                    return _this;
                }
                return SuitView;
            }(eui.Component));
            role.SuitView = SuitView;
            __reflect(SuitView.prototype, "game.mod.role.SuitView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            //套装类型 3,4,5 的 进阶、精铸皮肤
            var SuitView2 = /** @class */ (function (_super) {
                __extends(SuitView2, _super);
                function SuitView2() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.SuitSkin2";
                    return _this;
                }
                return SuitView2;
            }(eui.Component));
            role.SuitView2 = SuitView2;
            __reflect(SuitView2.prototype, "game.mod.role.SuitView2");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TouchEvent = egret.TouchEvent;
            var SuitAttrTipsMdr = /** @class */ (function (_super) {
                __extends(SuitAttrTipsMdr, _super);
                function SuitAttrTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.BaseAttrView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SuitAttrTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                    this._view.currentState = 'oneattr';
                    this._view.listAttr0.visible = false;
                    this._view.listAttr1.itemRenderer = mod.AttrItemRender;
                    this._view.listAttr1.dataProvider = this._listData = new eui.ArrayCollection();
                };
                SuitAttrTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.onUpdateAttrView, this);
                };
                SuitAttrTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    var args = this._showArgs;
                    this._view.secondPop.updateTitleStr(args.title);
                    this._view.name0.setTitle(args.attrTitle);
                    var attr = args.attr;
                    if (!attr && args.attr_id) {
                        attr = mod.RoleUtil.getAttr(args.attr_id);
                    }
                    this.updateAttrView(attr);
                };
                SuitAttrTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SuitAttrTipsMdr.prototype.onUpdateAttrView = function () {
                    if (!this._showArgs.attr_id) {
                        return;
                    }
                    var attr = mod.RoleUtil.getAttr(this._showArgs.attr_id);
                    this.updateAttrView(attr);
                };
                SuitAttrTipsMdr.prototype.updateAttrView = function (attr) {
                    var str = game.TextUtil.getAttrTextAdd(attr);
                    if (str) {
                        this._listData.replaceAll(str.split('\n'));
                    }
                };
                return SuitAttrTipsMdr;
            }(game.MdrBase));
            role.SuitAttrTipsMdr = SuitAttrTipsMdr;
            __reflect(SuitAttrTipsMdr.prototype, "game.mod.role.SuitAttrTipsMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var prop_tips_data = msg.prop_tips_data;
            var Tween = base.Tween;
            var SuitComposeMdr = /** @class */ (function (_super) {
                __extends(SuitComposeMdr, _super);
                function SuitComposeMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.SuitComposeView);
                    _this._curSelIdx = 0; //list_type当前选择
                    _this._selResolve = []; //已选中的分解
                    _this._skinType = 0; //0:compose, 1:resolve
                    _this._resolveCnt = 50; //格子数
                    _this._suitTypeAry = [1 /* CangTian */, 2 /* YanTian */]; //可合成的套装类型
                    _this._composeCnt = 3; //合成所需数量
                    _this._btnData = [
                        {
                            icon: 'hecheng',
                            showHint: false
                        },
                        {
                            icon: 'fenjie',
                            showHint: false
                        }
                    ];
                    _this._resolveMap = {};
                    _this.isEasyHide = true;
                    return _this;
                }
                SuitComposeMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                    this._view.list_type.itemRenderer = role.SuitComposeTypeTab;
                    this._view.list_type.dataProvider = this._listType = new ArrayCollection();
                    this._view.scroller['$hasScissor'] = true;
                    this._view.list_type.useVirtualLayout = false;
                    this._view.secondPop.bgStr = game.ResUtil.getUiJpg('suit_hecheng_bg');
                    this._view.list_btn.itemRenderer = mod.TabSecondItem;
                    this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
                    this._view.list_resolve.itemRenderer = mod.IconSelMany;
                    this._view.list_resolve.dataProvider = this._listResolve = new eui.ArrayCollection();
                };
                SuitComposeMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_type, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    addEventListener(this._view.btn_compose, TouchEvent.TOUCH_TAP, this.onClickCompose, this);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd, this);
                    addEventListener(this._view.btn_sub, TouchEvent.TOUCH_TAP, this.onClickSub, this);
                    addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickBtnList, this);
                    addEventListener(this._view.btn_resolve, TouchEvent.TOUCH_TAP, this.onClickResolve, this);
                    addEventListener(this._view.list_resolve, eui.ItemTapEvent.ITEM_TAP, this.onClickResolveList, this);
                    this.onNt("ON_SUIT_COMPOSE_SELECT_UPDATE" /* ON_SUIT_COMPOSE_SELECT_UPDATE */, this.onUpdateRightSide, this);
                    this.onNt("on_suit_equip_synthesis_update" /* ON_SUIT_EQUIP_SYNTHESIS_UPDATE */, this.onComposeUpdate, this);
                    this.onNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, this.onUpdateByBagType, this);
                };
                SuitComposeMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._listBtn.replaceAll(this._btnData);
                    this._view.list_btn.selectedIndex = 0;
                    this._skinType = 0;
                    this.updateViewBySkinType();
                    this.updateBtnHint();
                };
                SuitComposeMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._proxy.composeSelAry = [];
                    this._view.scroller.viewport.scrollV = 0;
                    this._view.scroller.stopAnimation();
                    this._curSelIdx = 0;
                };
                /**合成回调*/
                SuitComposeMdr.prototype.onComposeUpdate = function () {
                    if (this._skinType == 0) {
                        this.updateComposeView();
                        this.updateBtnHint();
                    }
                    else {
                        this.updateResolveView();
                    }
                };
                SuitComposeMdr.prototype.updateTypeList = function () {
                    var list = [];
                    var data = this._proxy.composeSelAry;
                    for (var _i = 0, _a = this._suitTypeAry; _i < _a.length; _i++) {
                        var type = _a[_i];
                        list.push({
                            type: type,
                            hint: mod.HintMgr.getHint(this._proxy.model.composeHintPath[type]),
                            sel: this._curSelIdx != -1 && data[0] && data[0] == type // -1表示没有选择
                        });
                    }
                    if (this._listType.source && this._listType.source.length > 0) {
                        this._listType.replaceAll(list);
                    }
                    else {
                        this._listType.source = list;
                    }
                };
                //点击套装
                SuitComposeMdr.prototype.onClickList = function (e) {
                    // 点击子项list的不能刷新
                    if (this._proxy.composeSelSub) {
                        this._proxy.composeSelSub = false;
                        return;
                    }
                    if (this._proxy.composeSelPos2) {
                        this._proxy.composeSelPos2 = false;
                        return;
                    }
                    this._view.scroller.viewport.scrollV = 0;
                    var idx = e.itemIndex;
                    //点击当前已选择的，就是关闭
                    if (idx == this._curSelIdx) {
                        this._view.list_type.selectedIndex = this._curSelIdx = -1;
                        this.updateTypeList();
                        return;
                    }
                    var curType = this._suitTypeAry[idx];
                    var data = this._proxy.getCanComposeDataByType(curType);
                    if (data && data.length && data[0] == curType) {
                        this.updateRightSide(data[0], data[1], data[2]);
                    }
                    else {
                        this.updateRightSide(curType, 2, game.SuitEquipPosAry[0]);
                    }
                    this._curSelIdx = idx;
                    this.updateTypeList();
                };
                //右边list下的list选择，更新右边视图
                SuitComposeMdr.prototype.onUpdateRightSide = function (n) {
                    var data = n.body;
                    var type = data[0], lv = data[1], pos = data[2]; //类型，阶级，部位
                    DEBUG && console.log("SuitComposeMdr: type: " + type + ", lv: " + lv + ", pos: " + pos);
                    this.updateRightSide(type, lv, pos);
                };
                SuitComposeMdr.prototype.updateRightSide = function (type, lv, pos) {
                    this._proxy.composeSelAry = [type, lv, pos]; //当前选中的合成数据
                    var cfg = this._proxy.getEquipCfg(type, lv, pos);
                    if (!cfg) {
                        console.log("\u6CA1\u6709\u5F53\u524D\u5957\u88C5\u88C5\u5907 index:" + this._proxy.getIndex(type, lv, pos) + " suitType:" + type + " lv:" + lv + " pos:" + pos);
                        return;
                    }
                    this._view.icon_target.data = game.PropData.create(cfg.index);
                    this._view.lb_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(cfg.name, game.ColorUtil.getColorByQuality1(cfg.quality)));
                    var list = this._proxy.getCanComposeList(type, lv, pos);
                    for (var i = 0; i < this._composeCnt; i++) {
                        var icon = this._view["icon" + i];
                        if (icon) {
                            icon.data = list[i] || null;
                        }
                    }
                    // 合成红点
                    this._view.btn_compose.setHint(list && list.length >= this._composeCnt);
                };
                SuitComposeMdr.prototype.onClickCompose = function () {
                    var d = this._proxy.composeSelAry;
                    var list = this._proxy.getCanComposeList(d[0], d[1], d[2]) || [];
                    if (list.length < this._composeCnt) {
                        game.PromptBox.getIns().show("\u5408\u6210\u6D88\u8017\u6570\u91CF\u4E0D\u8DB3");
                        return;
                    }
                    var target = this._view.icon_target.data;
                    this._proxy.c2s_suit_equip_synthesis(target.index, d[0], d[2], this.getNum());
                };
                SuitComposeMdr.prototype.onClickAdd = function () {
                    var d = this._proxy.composeSelAry;
                    var list = this._proxy.getCanComposeList(d[0], d[1], d[2]) || [];
                    var size = list.length;
                    var maxNum = size || 1; //获取最大数量
                    var num = this.getNum();
                    if (num > maxNum) {
                        return;
                    }
                    this.setNum(num++);
                };
                SuitComposeMdr.prototype.onClickSub = function () {
                    var num = this.getNum();
                    if (num <= 1) {
                        return;
                    }
                    this.setNum(num--);
                };
                //合成数量
                SuitComposeMdr.prototype.getNum = function () {
                    return +(this._view.lb_num.text) || 1;
                };
                SuitComposeMdr.prototype.setNum = function (num) {
                    this._view.lb_num.text = num + '';
                };
                SuitComposeMdr.prototype.onClickBtnList = function (e) {
                    this._skinType = e.itemIndex;
                    this.updateViewBySkinType();
                };
                SuitComposeMdr.prototype.updateViewBySkinType = function () {
                    this._view.currentState = this._skinType == 0 ? 'compose' : 'resolve';
                    this._view.secondPop.updateBgSrc(game.ResUtil.getUiJpg(this._skinType == 0 ? 'suit_hecheng_bg' : 'suit_fenjie_bg'));
                    if (this._skinType == 0) {
                        this._curSelIdx = 0;
                        this._listType.removeAll();
                        this._view.scroller.viewport.scrollV = 0;
                        this.updateComposeView();
                    }
                    else {
                        this._proxy.composeSelAry = [];
                        this.updateResolveView();
                        //切换到分解，icon清除数据
                        for (var i = 0; i < this._composeCnt; i++) {
                            var icon = this._view["icon" + i];
                            if (icon) {
                                icon.data = null;
                            }
                        }
                    }
                };
                SuitComposeMdr.prototype.updateComposeView = function () {
                    var data = this._proxy.getCanComposeData();
                    this.updateRightSide(data[0], data[1], data[2]); //先更右边数据，保存选中数据
                    this.updateTypeList();
                    this._view.list_type.selectedIndex = this._curSelIdx = Math.max(data[0] - 1, 0);
                    this.doMoveScroller();
                };
                SuitComposeMdr.prototype.doMoveScroller = function () {
                    egret.callLater(this.moveScroller, this);
                };
                //移动scroller
                SuitComposeMdr.prototype.moveScroller = function () {
                    var data = this._proxy.composeSelAry;
                    if (!data || !data.length) {
                        return;
                    }
                    var viewport = this._view.scroller.viewport;
                    var scrollerH = this._view.scroller.height;
                    var contentH = viewport.contentHeight;
                    var typeH = 70;
                    var lvH = 66;
                    var gap = 6;
                    if (!contentH) {
                        var maxS = this._proxy.getMaxStageByType(1);
                        contentH = typeH * 2 + gap + (maxS - 2) * lvH + (maxS - 2 - 1) * gap + 8 * 64 + (8 - 1) * 6;
                    }
                    var moveH = data[0] == 2 ? typeH + gap : 0; //为套装2时加上套装1的height
                    var lvIdx = data[1] - 2; //阶数从2开始，第几个item
                    moveH = moveH + lvIdx * lvH + Math.max(0, lvIdx - 1) * gap;
                    moveH = Math.max(0, Math.min(moveH, contentH - scrollerH));
                    viewport.scrollV = 0;
                    Tween.remove(viewport);
                    Tween.get(viewport).to({ scrollV: moveH }, 10);
                };
                /**================================== 分解 ==================================*/
                SuitComposeMdr.prototype.onUpdateByBagType = function (n) {
                    var types = n.body;
                    if (!types || !types.length || types.indexOf(12 /* Suit */) < 0) {
                        return;
                    }
                    if (this._skinType == 1) {
                        this.updateResolveView();
                    }
                };
                SuitComposeMdr.prototype.updateResolveView = function () {
                    this._listResolve.removeAll();
                    var list = this._proxy.getSuitEquipListByBagType();
                    var listData = [];
                    this._selResolve = [];
                    for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
                        var item = list_4[_i];
                        if (!item) {
                            continue;
                        }
                        var lv = this._proxy.getIndexLv(item.index); //当前装备阶数
                        var type = this._proxy.getIndexType(item.index); //当前套装类型
                        var curDressEquip = this._proxy.getPosEquipInfo(type, item.index % 10);
                        var curDressLv = curDressEquip ? this._proxy.getIndexLv(curDressEquip.equipment_id.toNumber()) : 0;
                        if (curDressEquip && curDressLv > lv + 2) {
                            listData.push({
                                prop: item,
                                sel: true
                            });
                            this._selResolve.push(item);
                        }
                        else {
                            listData.push({
                                prop: item,
                                sel: false
                            });
                        }
                    }
                    if (listData.length < this._resolveCnt) {
                        listData.length = this._resolveCnt;
                    }
                    this._listResolve.replaceAll(listData);
                    this.updateSelDesc();
                };
                SuitComposeMdr.prototype.onClickResolve = function () {
                    if (!this._selResolve || !this._selResolve.length) {
                        game.PromptBox.getIns().show(game.getLanById("resolve_tips5" /* resolve_tips5 */));
                        return;
                    }
                    var list = [];
                    for (var _i = 0, _a = this._selResolve; _i < _a.length; _i++) {
                        var item = _a[_i];
                        var d = new prop_tips_data();
                        d.idx = item.prop_id;
                        d.cnt = item.count;
                        list.push(d);
                    }
                    var bagProxy = game.getProxy("12" /* Bag */, 12 /* Bag */);
                    bagProxy.c2s_prop_one_key_resolve(list);
                };
                SuitComposeMdr.prototype.onClickResolveList = function (e) {
                    var d = e.item;
                    if (!d) {
                        return;
                    }
                    d.sel = !d.sel;
                    this._listResolve.itemUpdated(d);
                    this.updateSel(d);
                    this.updateSelDesc();
                };
                SuitComposeMdr.prototype.updateSel = function (data) {
                    if (data.sel) {
                        this._selResolve.push(data.prop);
                    }
                    else {
                        var idx = this._selResolve.indexOf(data.prop);
                        if (idx > -1) {
                            this._selResolve.splice(idx, 1);
                        }
                    }
                };
                SuitComposeMdr.prototype.updateSelDesc = function () {
                    this._resolveMap = {};
                    var idx; //只展示一个
                    for (var _i = 0, _a = this._selResolve; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (!item || !item.cfg) {
                            continue;
                        }
                        var cfg_1 = item.cfg;
                        var resolve = cfg_1.resolve || [];
                        for (var _b = 0, resolve_1 = resolve; _b < resolve_1.length; _b++) {
                            var re = resolve_1[_b];
                            if (!this._resolveMap[re[0]]) {
                                this._resolveMap[re[0]] = 0;
                            }
                            this._resolveMap[re[0]] += re[1];
                            idx = re[0];
                        }
                    }
                    this._view.lb_resolve.textFlow = game.TextUtil.parseHtml("\u5171\u9009\u62E9" + game.TextUtil.addColor(this._selResolve.length + '', 2330156 /* GREEN */) + "\u4EF6\uFF0C\u5206\u89E3\u83B7\u5F97");
                    if (!idx) {
                        var equipCfg = this._proxy.getEquipCfg(1 /* CangTian */);
                        idx = equipCfg && equipCfg.resolve ? equipCfg.resolve[0][0] : 0; //获取任一装备分解道具
                    }
                    var cfg = game.GameConfig.getPropConfigById(idx);
                    this._view.img_resolve.source = cfg ? cfg.icon : '';
                    this._view.lb_resolveNum.text = (this._resolveMap[idx] || 0) + '';
                };
                /**更新页签红点*/
                SuitComposeMdr.prototype.updateBtnHint = function () {
                    var btn = this._listBtn.source[0];
                    if (!btn) {
                        return;
                    }
                    btn.showHint = mod.HintMgr.getHint(this._proxy.model.composeHintPath[1 /* CangTian */]) ||
                        mod.HintMgr.getHint(this._proxy.model.composeHintPath[2 /* YanTian */]);
                    this._listBtn.itemUpdated(btn);
                };
                return SuitComposeMdr;
            }(game.MdrBase));
            role.SuitComposeMdr = SuitComposeMdr;
            __reflect(SuitComposeMdr.prototype, "game.mod.role.SuitComposeMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitEquipBagTipsMdr = /** @class */ (function (_super) {
                __extends(SuitEquipBagTipsMdr, _super);
                function SuitEquipBagTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.SuitEquipBagTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SuitEquipBagTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                };
                SuitEquipBagTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateBaseAttr, this);
                    this.onNt("on_view_hide" /* ON_VIEW_HIDE */, this.hide, this);
                };
                SuitEquipBagTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this._propData = this._showArgs;
                    this.updateView();
                };
                SuitEquipBagTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SuitEquipBagTipsMdr.prototype.updateView = function () {
                    this._view.basePropTips.updateShow(this._propData);
                    this.updateBaseAttr();
                    this.updateSuitAttr();
                    var cfg = this._propData.cfg;
                    if (cfg && cfg.gain_id) {
                        this._view.baseGain.updateShow(cfg.gain_id);
                    }
                };
                SuitEquipBagTipsMdr.prototype.updateBaseAttr = function () {
                    var cfg = this._propData.cfg;
                    var attr = mod.RoleUtil.getAttr(cfg.attr_id);
                    this._view.baseAttr.updateShow(game.TextUtil.getAttrTextAdd(attr, 8585074 /* GREEN */), game.getLanById("base_attr" /* base_attr */));
                    this._view.power.setPowerValue(attr && attr.showpower || 0);
                };
                SuitEquipBagTipsMdr.prototype.updateSuitAttr = function () {
                    var index = this._propData.index;
                    var suitType = Math.floor(index / 10000) % 10;
                    var maxStage = this._proxy.getMaxStageByType(suitType);
                    var maxStageCfg = this._proxy.getSuitStageCfg(suitType, maxStage);
                    this._view.baseSuit.updateShow(this._proxy.getBuffDesc(maxStageCfg.buff_id), game.SuitTypeName[suitType] + "\u5957\u88C5 " + maxStage + "\u9636\u6548\u679C");
                };
                return SuitEquipBagTipsMdr;
            }(game.MdrBase));
            role.SuitEquipBagTipsMdr = SuitEquipBagTipsMdr;
            __reflect(SuitEquipBagTipsMdr.prototype, "game.mod.role.SuitEquipBagTipsMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TouchEvent = egret.TouchEvent;
            var SuitEquipStrengthenTipsMdr = /** @class */ (function (_super) {
                __extends(SuitEquipStrengthenTipsMdr, _super);
                function SuitEquipStrengthenTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.SuitEquipTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SuitEquipStrengthenTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                    this._view.gr_up.visible = this._view.img_line.visible = true;
                    this._view.gr_act.visible = false;
                    if (!this._descItem0) {
                        this._descItem0 = new mod.BaseDescItem();
                        this._view.gr_attr.addChild(this._descItem0);
                    }
                    if (!this._attrItem3) {
                        this._attrItem3 = new mod.BaseAttrItemAdd();
                        this._view.gr_attr.addChild(this._attrItem3);
                    }
                    if (!this._descItem1) {
                        this._descItem1 = new mod.BaseDescItem();
                        this._view.gr_attr.addChild(this._descItem1);
                    }
                };
                SuitEquipStrengthenTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.onNt("ON_SUIT_EQUIP_INFO_UPDATE" /* ON_SUIT_EQUIP_INFO_UPDATE */, this.updateView, this);
                };
                SuitEquipStrengthenTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var data = this._showArgs;
                    if (!data) {
                        return;
                    }
                    this.updateView();
                };
                SuitEquipStrengthenTipsMdr.prototype.updateView = function () {
                    var data = this._showArgs;
                    var equip = this._proxy.getPosEquipInfo(data.type, data.pos);
                    if (!equip) {
                        return;
                    }
                    this._view.tips.updateShow(data.index);
                    this._view.power.setPowerValue(equip.attr && equip.attr.showpower ? equip.attr.showpower : 0);
                    this._descItem0.updateShow(game.TextUtil.getAttrTextAdd(equip.attr), game.getLanById("base_attr" /* base_attr */));
                    this._attrItem3.updateShow(equip.lv_attr, equip.next_lv_attr, '强化属性');
                    var cost = this._proxy.getCost(data.type, null, equip ? equip.level : 0);
                    //没有下一级消耗表示满级，读取上一级消耗展示
                    if (!cost) {
                        cost = this._proxy.getCost(data.type, null, equip ? equip.level - 1 : 0);
                    }
                    this._view.costItem.updateShow(cost);
                    this._view.btn_up.setHint(this._proxy.canStrengthen(data.type, data.pos));
                    this.updateSuitAttr();
                };
                //更新套装装备激活
                SuitEquipStrengthenTipsMdr.prototype.updateSuitAttr = function () {
                    var info = this._proxy.getSuitTypeInfo(this._showArgs.type); //类型数据
                    var minLv;
                    var satisfyCnt = 0;
                    var map = {}; //每个部位阶数map
                    var actCnt = 0;
                    if (info && info.equips) {
                        for (var _i = 0, _a = info.equips; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (!minLv) {
                                minLv = item.stage;
                            }
                            minLv = Math.min(minLv, item.stage);
                            map[item.pos] = item.stage;
                            actCnt++;
                        }
                    }
                    if (!minLv || actCnt != game.SuitEquipPosAry.length) {
                        minLv = 1;
                    }
                    var str = '';
                    for (var i = 0; i < game.SuitEquipPosAry.length; i++) {
                        var pos = game.SuitEquipPosAry[i];
                        if (map[pos] >= minLv) {
                            satisfyCnt++;
                        }
                        var equipCfg = this._proxy.getEquipCfg(this._showArgs.type, 1, pos); //1阶装备
                        str += game.TextUtil.addColor("[" + minLv + "\u9636]" + equipCfg.name, map[pos] >= minLv ? 8585074 /* GREEN */ : 7835024 /* GRAY */);
                        if (i != game.SuitEquipPosAry.length - 1) {
                            str += '\n';
                        }
                    }
                    this._descItem1.updateShow(str, minLv + "\u9636" + game.SuitTypeName[this._showArgs.type] + "\u5957\u88C5(" + satisfyCnt + "/" + game.SuitEquipPosAry.length + ")");
                };
                SuitEquipStrengthenTipsMdr.prototype.onClick = function () {
                    if (!this._proxy.canStrengthen(this._showArgs.type, this._showArgs.pos, true)) {
                        return;
                    }
                    this._proxy.c2s_suit_equip_lvup(0, this._showArgs.type, this._showArgs.pos);
                };
                SuitEquipStrengthenTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return SuitEquipStrengthenTipsMdr;
            }(game.MdrBase));
            role.SuitEquipStrengthenTipsMdr = SuitEquipStrengthenTipsMdr;
            __reflect(SuitEquipStrengthenTipsMdr.prototype, "game.mod.role.SuitEquipStrengthenTipsMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TouchEvent = egret.TouchEvent;
            var SuitEquipTipsMdr = /** @class */ (function (_super) {
                __extends(SuitEquipTipsMdr, _super);
                function SuitEquipTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.SuitEquipTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SuitEquipTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                };
                SuitEquipTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.onNt("ON_SUIT_EQUIP_INFO_UPDATE" /* ON_SUIT_EQUIP_INFO_UPDATE */, this.updateDressView, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateStageDescItem, this);
                };
                SuitEquipTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var data = this._showArgs;
                    if (!data) {
                        return;
                    }
                    if (!this._descItem) {
                        this._descItem = new mod.BaseDescItem();
                        this._view.gr_attr.addChildAt(this._descItem, 0);
                    }
                    if (!this._suitItem) {
                        this._suitItem = new mod.BaseDescItem();
                        this._view.gr_attr.addChild(this._suitItem);
                    }
                    if (!this._descItem2) {
                        this._descItem2 = new mod.BaseDescItem();
                        this._view.gr_attr.addChild(this._descItem2);
                    }
                    this._suitEquip = this._proxy.getPosEquipInfo(data.type, data.pos);
                    this.updateView();
                };
                SuitEquipTipsMdr.prototype.updateView = function () {
                    var index = this._showArgs.index;
                    var prop = game.PropData.create(index);
                    this._view.icon_act.data = prop;
                    this._view.tips.updateShow(prop);
                    var attr;
                    var power;
                    if (this._suitEquip) {
                        attr = this._suitEquip.attr;
                        power = attr && attr.showpower && attr.showpower.toNumber() || 0;
                    }
                    else {
                        attr = prop.regular_attrs;
                        power = 0;
                    }
                    this._view.power.setPowerValue(power);
                    this._descItem.updateShow(game.TextUtil.getAttrTextAdd(attr), game.getLanById("ywl_baseAttr" /* ywl_baseAttr */));
                    this.switchState();
                    this.updateSuitAttr();
                    this.updateStageDescItem();
                };
                //更新套装装备激活
                SuitEquipTipsMdr.prototype.updateSuitAttr = function () {
                    var info = this._proxy.getSuitTypeInfo(this._showArgs.type); //类型数据
                    var minLv;
                    var satisfyCnt = 0;
                    var map = {}; //每个部位阶数map
                    var actCnt = 0;
                    if (info && info.equips) {
                        for (var _i = 0, _a = info.equips; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (!minLv) {
                                minLv = item.stage;
                            }
                            minLv = Math.min(minLv, item.stage);
                            map[item.pos] = item.stage;
                            actCnt++;
                        }
                    }
                    if (!minLv || actCnt != game.SuitEquipPosAry.length) {
                        minLv = 1;
                    }
                    var str = '';
                    for (var i = 0; i < game.SuitEquipPosAry.length; i++) {
                        var pos = game.SuitEquipPosAry[i];
                        if (map[pos] >= minLv) {
                            satisfyCnt++;
                        }
                        var equipCfg = this._proxy.getEquipCfg(this._showArgs.type, 1, pos); //1阶装备
                        str += game.TextUtil.addColor("[" + minLv + "\u9636]" + equipCfg.name, map[pos] >= minLv ? 8585074 /* GREEN */ : 7835024 /* GRAY */);
                        if (i != game.SuitEquipPosAry.length - 1) {
                            str += '\n';
                        }
                    }
                    this._suitItem.updateShow(str, minLv + "\u9636" + game.SuitTypeName[this._showArgs.type] + "\u5957\u88C5(" + satisfyCnt + "/" + game.SuitEquipPosAry.length + ")");
                };
                //最高阶的套装效果
                SuitEquipTipsMdr.prototype.updateStageDescItem = function () {
                    if (!this._descItem2 || !this._descItem2.parent) {
                        return;
                    }
                    var type = this._showArgs.type;
                    var maxStage = this._proxy.getMaxStageByType(type);
                    var maxStageCfg = this._proxy.getSuitStageCfg(type, maxStage);
                    this._descItem2.updateShow(this._proxy.getBuffDesc(maxStageCfg.buff_id), game.SuitTypeName[type] + "\u5957\u88C5 " + maxStage + "\u9636\u6548\u679C");
                };
                SuitEquipTipsMdr.prototype.updateDressView = function () {
                    var data = this._showArgs;
                    this._suitEquip = this._proxy.getPosEquipInfo(data.type, data.pos);
                    // 穿戴成功后，关闭此界面
                    if (this._suitEquip && this._suitEquip.stage == 1) {
                        this.hide();
                        return;
                    }
                    this.switchState();
                };
                SuitEquipTipsMdr.prototype.switchState = function () {
                    if (this._suitEquip) {
                        this._view.gr_act.visible = this._view.gr_up.visible = this._view.img_line.visible = false;
                    }
                    else {
                        this._view.gr_act.visible = this._view.img_line.visible = true;
                        this._view.gr_up.visible = false;
                        this._view.btn_act.setHint(this._proxy.canDress(this._showArgs.index));
                    }
                };
                SuitEquipTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._suitEquip = null;
                };
                SuitEquipTipsMdr.prototype.onClick = function () {
                    if (this._suitEquip && this._suitEquip.equipment_id) {
                        return;
                    }
                    var args = this._showArgs;
                    if (!this._proxy.canDress(args.index, true)) {
                        return;
                    }
                    this._proxy.c2s_suit_equip_takeon(args.index, args.type, args.pos);
                };
                return SuitEquipTipsMdr;
            }(game.MdrBase));
            role.SuitEquipTipsMdr = SuitEquipTipsMdr;
            __reflect(SuitEquipTipsMdr.prototype, "game.mod.role.SuitEquipTipsMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var facade = base.facade;
            var BodyMainMdr = /** @class */ (function (_super) {
                __extends(BodyMainMdr, _super);
                function BodyMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        // {
                        //     btnType: WeaponMainBtnType.Weapon,
                        //     icon: "body_tab",
                        //     mdr: SurfaceMdr,
                        //     title: LanDef.surface_tips1,
                        //     bg: "horse_bg",
                        //     hintTypes: [ModName.Role, NewRoleViewType.RoleMain, NewRoleViewType.Body, BodyMainBtnType.Body],
                        // },
                        {
                            btnType: "02" /* BodyStar */,
                            icon: "huanhua_tab",
                            mdr: mod.SurfaceStarMdr,
                            title: "surface_tips1" /* surface_tips1 */,
                            bg: "horse_bg",
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "18" /* Body */, "02" /* BodyStar */],
                        }
                    ];
                    return _this;
                }
                BodyMainMdr.prototype.onShow = function () {
                    this._proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                    this._proxy.headType = 405 /* Body */;
                    _super.prototype.onShow.call(this);
                };
                return BodyMainMdr;
            }(mod.WndBaseMdr));
            role.BodyMainMdr = BodyMainMdr;
            __reflect(BodyMainMdr.prototype, "game.mod.role.BodyMainMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            //锻造界面的锻造大师，只有SuitType3有
            var SuitForgeMasterMdr = /** @class */ (function (_super) {
                __extends(SuitForgeMasterMdr, _super);
                function SuitForgeMasterMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.SuitForgeMasterView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SuitForgeMasterMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                };
                SuitForgeMasterMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                SuitForgeMasterMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                SuitForgeMasterMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                SuitForgeMasterMdr.prototype.updateView = function () {
                    var minLv = this._proxy.getMasterLv(); //最低锻造等级
                    this._view.lb_name.text = "\u795E\u88C5\u953B\u9020 " + minLv + "\u9636";
                    var val = this._proxy.getShenZhuangVal(); //神装属性万分比
                    var attr = this._proxy.getAttrByTypeAndOperType(3 /* HaoTian */, 2 /* DuanZao */);
                    attr = game.TextUtil.calcAttr(attr, 1 + val / 10000);
                    this._view.descItem0.updateShow(game.TextUtil.getAttrTextAdd(attr), "\u5F53\u524D\u9636\u6BB5  " + game.TextUtil.addColor('神装属性', 15262666 /* WHITE */)
                        + game.TextUtil.addColor("+" + (val / 10000).toFixed(1) + "%", 8585074 /* GREEN */));
                    this._view.power.setPowerValue(attr && attr.showpower && attr.showpower || 0);
                    //满阶
                    var paramCfg = game.GameConfig.getParamConfigById('suit_forge_master');
                    if (minLv >= paramCfg.value.length) {
                        this._view.descItem1.visible = false;
                        return;
                    }
                    this._view.descItem1.visible = true;
                    var nextLv = minLv + 1;
                    var infos = this._proxy.getSuitOperInfo(3 /* HaoTian */, 2 /* DuanZao */);
                    var satisfyCnt = 0;
                    if (infos && infos.attr_list) {
                        for (var _i = 0, _a = infos.attr_list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (item && item.lv >= nextLv) {
                                satisfyCnt++;
                            }
                        }
                    }
                    var nextVal = paramCfg.value[nextLv];
                    var str = "\u4E0B\u4E00\u9636\u6BB5 " + game.TextUtil.addColor("\u5168\u90E8\u88C5\u5907\u953B\u9020\u8FBE\u5230" + nextLv + "\u9636", 15262666 /* WHITE */)
                        + game.TextUtil.addColor("(" + satisfyCnt + "/" + game.SuitEquipPosAry1.length + ")", 16731212 /* RED */);
                    this._view.descItem1.updateShow(game.TextUtil.addColor("\u795E\u88C5\u5C5E\u6027+" + (nextVal / 10000).toFixed(1) + "%", 7835024 /* GRAY */), str);
                };
                return SuitForgeMasterMdr;
            }(game.MdrBase));
            role.SuitForgeMasterMdr = SuitForgeMasterMdr;
            __reflect(SuitForgeMasterMdr.prototype, "game.mod.role.SuitForgeMasterMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitGiftMainMdr = /** @class */ (function (_super) {
                __extends(SuitGiftMainMdr, _super);
                function SuitGiftMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Gift */,
                            icon: "jinjielibaobiaoqiantubiao",
                            mdr: role.SuitGiftMdr,
                            title: '进阶礼包',
                            hintTypes: ["06" /* Role */, "06" /* SuitMain */, "15" /* SuitGiftMain */, "01" /* Gift */]
                        }
                    ];
                    return _this;
                }
                SuitGiftMainMdr.prototype.onClickBack = function () {
                    _super.prototype.onClickBack.call(this);
                };
                return SuitGiftMainMdr;
            }(mod.WndBaseMdr));
            role.SuitGiftMainMdr = SuitGiftMainMdr;
            __reflect(SuitGiftMainMdr.prototype, "game.mod.role.SuitGiftMainMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitGiftMdr = /** @class */ (function (_super) {
                __extends(SuitGiftMdr, _super);
                function SuitGiftMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.BaseGiftView);
                    _this._cfgList = [];
                    return _this;
                }
                SuitGiftMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                    this._giftProxy = game.getProxy("53" /* Gift */, 201 /* Gift */);
                    this._view.list.itemRenderer = role.SuitGiftItemRender;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                SuitGiftMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_update_gift_info" /* ON_UPDATE_GIFT_INFO */, this.updateView, this);
                };
                SuitGiftMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this._cfgList = [];
                    this._type = this._showArgs[0];
                    this._view.updateBanner(this._type == 2 /* SuitType1 */ ? 'cangtian_guanggaotu' : 'yantian_guanggaotu');
                    var cfgs = game.getConfigByNameId("dabiaojiangli.json" /* Dabiaojiangli */, this._type);
                    for (var key in cfgs) {
                        this._cfgList.push(cfgs[key]);
                    }
                    this.updateView();
                };
                SuitGiftMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._cfgList = [];
                };
                SuitGiftMdr.prototype.updateView = function () {
                    var canList = [];
                    var list = [];
                    var doneList = [];
                    for (var i = 0; i < this._cfgList.length; i++) {
                        var cfg = this._cfgList[i];
                        if (!cfg) {
                            continue;
                        }
                        if (this._cfgList.length - 1 == i) {
                            this._view.updateBigReward(cfg.award[0]);
                        }
                        var info = this._giftProxy.getGiftStatus(this._type, cfg.index);
                        var item = {
                            cfg: cfg,
                            status: info,
                            type: this._type - 1 //套装类型需要-1
                        };
                        if (info && info.status == 2) {
                            doneList.push(item);
                        }
                        else if (info && info.status == 1) {
                            canList.push(item);
                        }
                        else {
                            list.push(item);
                        }
                    }
                    this._listData.replaceAll(canList.concat(list, doneList));
                };
                return SuitGiftMdr;
            }(game.MdrBase));
            role.SuitGiftMdr = SuitGiftMdr;
            __reflect(SuitGiftMdr.prototype, "game.mod.role.SuitGiftMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitMainMdr = /** @class */ (function (_super) {
                __extends(SuitMainMdr, _super);
                function SuitMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* SuitType1 */,
                            icon: "cangtianbiaoqiantubiao",
                            mdr: role.SuitType1SecondMdr,
                            title: game.SuitTypeName[1 /* CangTian */],
                            bg: "suit_type1_bg",
                            openIdx: 1041670126 /* SuitType1 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "01" /* SuitType1 */]
                        },
                        {
                            btnType: "02" /* SuitType2 */,
                            icon: "yantianbiaoqiantubiao",
                            mdr: role.SuitType2SecondMdr,
                            title: game.SuitTypeName[2 /* YanTian */],
                            bg: "suit_type1_bg",
                            openIdx: 1041670127 /* SuitType2 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "02" /* SuitType2 */]
                        },
                        {
                            btnType: "03" /* SuitType3 */,
                            icon: "haotianbiaoqiantubiao",
                            mdr: role.SuitType3SecondMdr,
                            title: game.SuitTypeName[3 /* HaoTian */],
                            bg: "suit_type1_bg",
                            openIdx: 1041670128 /* SuitType3 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "03" /* SuitType3 */]
                        },
                        {
                            btnType: "04" /* SuitType4 */,
                            icon: "xuantianbiaoqiantubiao",
                            mdr: role.SuitType4SecondMdr,
                            title: game.SuitTypeName[4 /* XuanTian */],
                            bg: "suit_type1_bg",
                            openIdx: 1041670129 /* SuitType4 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "04" /* SuitType4 */]
                        },
                        {
                            btnType: "05" /* SuitType5 */,
                            icon: "juntianbiaoqiantubiao",
                            mdr: role.SuitType5SecondMdr,
                            title: game.SuitTypeName[5 /* JunTian */],
                            bg: "suit_type1_bg",
                            openIdx: 1041670130 /* SuitType5 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "05" /* SuitType5 */]
                        }
                    ];
                    return _this;
                }
                SuitMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                };
                return SuitMainMdr;
            }(mod.WndBaseMdr));
            role.SuitMainMdr = SuitMainMdr;
            __reflect(SuitMainMdr.prototype, "game.mod.role.SuitMainMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TouchEvent = egret.TouchEvent;
            var SuitStageStrengthenTipsMdr = /** @class */ (function (_super) {
                __extends(SuitStageStrengthenTipsMdr, _super);
                function SuitStageStrengthenTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.SuitStageTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SuitStageStrengthenTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                };
                SuitStageStrengthenTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClick, this);
                    this.onNt("ON_SUIT_EQUIP_INFO_UPDATE" /* ON_SUIT_EQUIP_INFO_UPDATE */, this.updateView, this);
                };
                SuitStageStrengthenTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this._view.lb_name.text = game.SuitTypeName[this._showArgs] + game.getLanById("advance_suit" /* advance_suit */)
                        + game.getLanById("enhance_1" /* enhance_1 */);
                    this._view.icon.img_icon.source = 'taozhuangqianghua';
                    this.updateView();
                };
                SuitStageStrengthenTipsMdr.prototype.updateView = function () {
                    var info = this._proxy.getSuitTypeInfo(this._showArgs);
                    if (info && info.master_attr && info.master_attr.showpower) {
                        this._view.power.setPowerValue(info.master_attr.showpower);
                    }
                    else {
                        this._view.power.setPowerValue(0);
                    }
                    var isAct = info && info.master_lv > 0;
                    var curLv = isAct ? info.master_lv : 1;
                    var curCfg = this._proxy.getSuitStrengthenCfg(this._showArgs, curLv);
                    var nextCfg;
                    var lb;
                    var lbBtn;
                    if (isAct) {
                        lbBtn = "rank_up" /* rank_up */;
                        nextCfg = this._proxy.getSuitStrengthenCfg(this._showArgs, curLv + 1);
                        lb = game.getLanById("cur_step" /* cur_step */);
                    }
                    else {
                        lbBtn = "active" /* active */;
                        lb = game.getLanById("maid_cue13" /* maid_cue13 */);
                    }
                    this._view.btn_up.label = game.getLanById(lbBtn);
                    var size = game.SuitEquipPosAry.length;
                    // 当前阶段
                    var str = lb + " " + game.TextUtil.addColor(game.getLanById("all_strength" /* all_strength */) + '+' + curCfg.strength, 15262666 /* WHITE */);
                    var satisfy = this._proxy.getMasterLvNotLess(this._showArgs, curLv);
                    str += game.TextUtil.addColor(" (" + satisfy + "/" + size + ")", satisfy >= size ? 8585074 /* GREEN */ : 16731212 /* RED */);
                    var buffDesc = this._proxy.getBuffDesc(curCfg.buff_id);
                    this._view.baseDesc0.updateShow(buffDesc, "" + str);
                    // 下一阶段
                    if (!nextCfg) {
                        this._view.btn_up.setHint(!isAct && satisfy >= size); //激活红点
                        this._view.baseDesc1.visible = false;
                        return;
                    }
                    var str1 = game.getLanById("maid_cue13" /* maid_cue13 */) + (" " + game.TextUtil.addColor(game.getLanById("all_strength" /* all_strength */) + '+' + nextCfg.strength, 15262666 /* WHITE */));
                    var satisfy1 = this._proxy.getMasterLvNotLess(this._showArgs, curLv + 1);
                    str1 += game.TextUtil.addColor(" (" + satisfy1 + "/" + size + ")", satisfy1 >= size ? 8585074 /* GREEN */ : 16731212 /* RED */);
                    this._view.baseDesc1.visible = true;
                    this._view.baseDesc1.updateShow(this._proxy.getBuffDesc(nextCfg.buff_id), str1);
                    this._view.btn_up.setHint(satisfy1 >= size); //升阶红点
                };
                SuitStageStrengthenTipsMdr.prototype.onClick = function () {
                    if (!this._proxy.canMasterUp(this._showArgs, true)) {
                        return;
                    }
                    this._proxy.c2s_suit_equip_master_lvup(this._showArgs);
                };
                SuitStageStrengthenTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return SuitStageStrengthenTipsMdr;
            }(game.MdrBase));
            role.SuitStageStrengthenTipsMdr = SuitStageStrengthenTipsMdr;
            __reflect(SuitStageStrengthenTipsMdr.prototype, "game.mod.role.SuitStageStrengthenTipsMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitStageTipsMdr = /** @class */ (function (_super) {
                __extends(SuitStageTipsMdr, _super);
                function SuitStageTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.SuitStageTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                SuitStageTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(76 /* Suit */);
                    this._view.baseDesc1.visible = false;
                    this._view.img_line.visible = this._view.btn_up.visible = false;
                };
                SuitStageTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                SuitStageTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    var info = this._proxy.getSuitTypeInfo(this._showArgs);
                    this._view.icon.img_icon.source = "jinjieanniu";
                    var suit_lv = info && info.suit_lv > 0 ? info.suit_lv : 0;
                    this._view.lb_name.text = game.SuitTypeName[this._showArgs] + game.getLanById("advance_suit" /* advance_suit */)
                        + (" " + suit_lv) + game.getLanById("tishi_43" /* tishi_43 */);
                    this._view.power.setPowerValue(info && info.suit_attr && info.suit_attr.showpower || 0);
                    var nextCfg = this._proxy.getSuitStageCfg(this._showArgs, suit_lv + 1); //下一阶配置
                    // 0阶
                    if (suit_lv == 0) {
                        this._view.baseDesc1.visible = false;
                        var satisfyCnt_1 = this._proxy.getSuitLvNotLess(this._showArgs, nextCfg.stage);
                        var titleStr_1 = this.getStageStr(nextCfg.stage, true) + game.TextUtil.addColor(" (" + satisfyCnt_1 + "/" + game.SuitEquipPosAry.length + ")", 16731212 /* RED */);
                        this._view.baseDesc0.updateShow(this.getShowStr(nextCfg.buff_id), titleStr_1);
                        return;
                    }
                    //满阶
                    if (!nextCfg) {
                        this._view.baseDesc1.visible = false;
                        nextCfg = this._proxy.getSuitStageCfg(this._showArgs, info.suit_lv);
                        var titleStr_2 = this.getStageStr(nextCfg.stage);
                        this._view.baseDesc0.updateShow(this.getShowStr(nextCfg.buff_id), titleStr_2);
                        return;
                    }
                    var curCfg = this._proxy.getSuitStageCfg(this._showArgs, suit_lv);
                    var titleStr = this.getStageStr(curCfg.stage);
                    this._view.baseDesc0.updateShow(this.getShowStr(curCfg.buff_id), titleStr);
                    this._view.baseDesc1.visible = true;
                    var satisfyCnt = this._proxy.getSuitLvNotLess(this._showArgs, nextCfg.stage);
                    var nextTitleStr = this.getStageStr(nextCfg.stage, true) +
                        game.TextUtil.addColor(" (" + satisfyCnt + "/" + game.SuitEquipPosAry.length + ")", 16731212 /* RED */);
                    var str = this.getShowStr(nextCfg.buff_id).replace('#G', '');
                    this._view.baseDesc1.updateShow(game.TextUtil.addColor(str, 7835024 /* GRAY */), nextTitleStr);
                };
                SuitStageTipsMdr.prototype.getStageStr = function (stage, isNext, color) {
                    if (isNext === void 0) { isNext = false; }
                    if (color === void 0) { color = 15262666 /* WHITE */; }
                    var preStr = game.getLanById("cur_step" /* cur_step */);
                    if (isNext) {
                        preStr = game.getLanById("maid_cue13" /* maid_cue13 */);
                    }
                    return preStr + ' ' + game.TextUtil.addColor("\u5168\u8EAB" + stage + "\u9636\u4EE5\u4E0A", color);
                };
                SuitStageTipsMdr.prototype.getShowStr = function (buff_id) {
                    return this._proxy.getBuffDesc(buff_id);
                };
                SuitStageTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return SuitStageTipsMdr;
            }(game.MdrBase));
            role.SuitStageTipsMdr = SuitStageTipsMdr;
            __reflect(SuitStageTipsMdr.prototype, "game.mod.role.SuitStageTipsMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var DressUpModel = /** @class */ (function () {
                function DressUpModel() {
                    var _a;
                    this.curIdxList = [];
                    /** 装扮列表 */
                    this.surface_map = {};
                    /** 套装列表 */
                    this.surface_suit_list = [];
                    this.roots = (_a = {},
                        _a[1 /* Head */] = ["06" /* Role */, "03" /* DressUpMain */, "03" /* TabBtnType03 */],
                        _a[2 /* Frame */] = ["06" /* Role */, "03" /* DressUpMain */, "04" /* TabBtnType04 */],
                        _a[3 /* Bubble */] = ["06" /* Role */, "03" /* DressUpMain */, "05" /* TabBtnType05 */],
                        _a);
                }
                return DressUpModel;
            }());
            role.DressUpModel = DressUpModel;
            __reflect(DressUpModel.prototype, "game.mod.role.DressUpModel");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitType1SecondMdr = /** @class */ (function (_super) {
                __extends(SuitType1SecondMdr, _super);
                function SuitType1SecondMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Btn1 */,
                            icon: 'jinjie',
                            mdr: role.SuitType1Mdr,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "01" /* SuitType1 */, "01" /* Btn1 */]
                        },
                        {
                            btnType: "02" /* Btn2 */,
                            icon: 'qianghua',
                            mdr: role.SuitType1StrengthenMdr,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "01" /* SuitType1 */, "02" /* Btn2 */]
                        }
                    ];
                    return _this;
                }
                return SuitType1SecondMdr;
            }(mod.WndSecondMdr));
            role.SuitType1SecondMdr = SuitType1SecondMdr;
            __reflect(SuitType1SecondMdr.prototype, "game.mod.role.SuitType1SecondMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            /**炎天进阶*/
            var SuitType2Mdr = /** @class */ (function (_super) {
                __extends(SuitType2Mdr, _super);
                function SuitType2Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**苍天，炎天*/
                    _this._type = 2 /* YanTian */;
                    /**1进阶，2强化*/
                    _this._skinType = 1;
                    return _this;
                }
                return SuitType2Mdr;
            }(role.SuitType1Mdr));
            role.SuitType2Mdr = SuitType2Mdr;
            __reflect(SuitType2Mdr.prototype, "game.mod.role.SuitType2Mdr");
            /**炎天强化*/
            var SuitType2StrengthenMdr = /** @class */ (function (_super) {
                __extends(SuitType2StrengthenMdr, _super);
                function SuitType2StrengthenMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**苍天，炎天*/
                    _this._type = 2 /* YanTian */;
                    /**1进阶，2强化*/
                    _this._skinType = 2;
                    return _this;
                }
                return SuitType2StrengthenMdr;
            }(role.SuitType1StrengthenMdr));
            role.SuitType2StrengthenMdr = SuitType2StrengthenMdr;
            __reflect(SuitType2StrengthenMdr.prototype, "game.mod.role.SuitType2StrengthenMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitType2SecondMdr = /** @class */ (function (_super) {
                __extends(SuitType2SecondMdr, _super);
                function SuitType2SecondMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Btn1 */,
                            icon: 'jinjie',
                            mdr: role.SuitType2Mdr,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "02" /* SuitType2 */, "01" /* Btn1 */]
                        },
                        {
                            btnType: "02" /* Btn2 */,
                            icon: 'qianghua',
                            mdr: role.SuitType2StrengthenMdr,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "02" /* SuitType2 */, "02" /* Btn2 */]
                        }
                    ];
                    return _this;
                }
                return SuitType2SecondMdr;
            }(mod.WndSecondMdr));
            role.SuitType2SecondMdr = SuitType2SecondMdr;
            __reflect(SuitType2SecondMdr.prototype, "game.mod.role.SuitType2SecondMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var s2c_base_surface_open_ui = msg.s2c_base_surface_open_ui;
            var c2s_base_surface_change = msg.c2s_base_surface_change;
            var c2s_base_surface_lvup = msg.c2s_base_surface_lvup;
            var c2s_base_surface_open_ui = msg.c2s_base_surface_open_ui;
            /**
             * 装扮proxy
             */
            var DressUpProxy = /** @class */ (function (_super) {
                __extends(DressUpProxy, _super);
                function DressUpProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.dressCfgList = null;
                    return _this;
                }
                DressUpProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new role.DressUpModel();
                    this.onProto(s2c_base_surface_open_ui, this.s2c_base_surface_open_ui, this);
                };
                /**
                 * 发送装扮信息
                 */
                DressUpProxy.prototype.c2s_base_surface_open_ui = function () {
                    var req = new c2s_base_surface_open_ui();
                    this.sendProto(req);
                };
                /**
                 * 发送装扮穿戴/卸下
                 * @param index
                 */
                DressUpProxy.prototype.c2s_base_surface_change = function (index) {
                    var req = new c2s_base_surface_change();
                    req.index = index;
                    this.sendProto(req);
                };
                /**
                 * 发送装扮升星/激活
                 * @param index
                 * @param cost_idx
                 */
                DressUpProxy.prototype.c2s_base_surface_lvup = function (index, cost_idx) {
                    var req = new c2s_base_surface_lvup();
                    req.index = index;
                    req.cost_idx = cost_idx;
                    this.sendProto(req);
                };
                /**装扮信息*/
                DressUpProxy.prototype.s2c_base_surface_open_ui = function (n) {
                    var msg = n.body;
                    if (!msg)
                        return;
                    if (msg.chat_frame != undefined) {
                        this._model.chat_frame = msg.chat_frame;
                    }
                    if (msg.head_frame != undefined) {
                        this._model.head_frame = msg.head_frame;
                    }
                    if (msg.head != undefined) {
                        this._model.head = msg.head;
                    }
                    if (msg.chat_frame != undefined) {
                        this._model.chat_frame = msg.chat_frame;
                    }
                    if (msg.surface_list != undefined) {
                        if (!this._model.surface_map) {
                            this._model.surface_map = {};
                        }
                        for (var _i = 0, _a = msg.surface_list; _i < _a.length; _i++) {
                            var f = _a[_i];
                            this._model.surface_map[f.index.toNumber()] = f;
                        }
                    }
                    if (msg.surface_suit_list != undefined) {
                        for (var _b = 0, _c = msg.surface_suit_list; _b < _c.length; _b++) {
                            var f = _c[_b];
                            var old = this.getDressSuitByIdx(f.index.toNumber());
                            if (old) {
                                this._model.surface_suit_list[this._model.surface_suit_list.indexOf(old)] = f;
                            }
                            else {
                                this._model.surface_suit_list.push(f);
                            }
                        }
                    }
                    this.updateHint();
                    this.sendNt("DRESS_UP_INFO_UPDATE" /* DRESS_UP_INFO_UPDATE */);
                };
                /**
                 * 获取装扮配置
                 */
                // public getDressData(): DressConfig[][] {
                //     if (this.dressCfgList) {
                //         return this.dressCfgList;
                //     }
                //     let map: { [type: number]: DressConfig[] } = {};
                //     let configs: DressConfig[] = getConfigListByName(ConfigName.DressUp);
                //     for (let cfg of configs) {
                //         let sort = cfg.sort;
                //         if (!sort) {
                //             continue;
                //         }
                //         if (map[sort] == null) {
                //             map[sort] = [];
                //         }
                //         map[sort].push(cfg);
                //     }
                //
                //     let list: DressConfig[][] = [];
                //     for (let key in map) {
                //         list.push(map[key]);
                //     }
                //
                //     this.dressCfgList = list;
                //     return list;
                // }
                DressUpProxy.prototype.getDressList = function (type1, type2) {
                    var _this = this;
                    var cfgArr = game.getConfigListByName("dress.json" /* DressUp */);
                    var list = cfgArr.filter(function (v) {
                        return _this.getDressTypeByIdx(v.index) == type1 && v.type == type2;
                    });
                    var _proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var defIcon = [this.head, this.head_frame, this.chat_frame];
                    var dress = defIcon[type1 - 1];
                    var dressList = [];
                    var upList = [];
                    var actList = [];
                    var actedList = [];
                    var notAct = [];
                    for (var _i = 0, list_5 = list; _i < list_5.length; _i++) {
                        var cfg = list_5[_i];
                        if (cfg.index == dress) {
                            dressList.push(cfg);
                            continue;
                        }
                        var info = this.getDressByIdx(cfg.index);
                        if (cfg.activation_param) {
                            var shenling = _proxy.getInfoByIndex(cfg.show_param[0]);
                            var isActed = shenling && shenling.star >= cfg.show_param[1];
                            if (!isActed) {
                                continue;
                            }
                        }
                        else {
                            if (!cfg.show && !info) {
                                continue;
                            }
                        }
                        if (this.canActOrUpStar(cfg.index)) {
                            if (info && info.lv) {
                                upList.push(cfg);
                            }
                            else {
                                actList.push(cfg);
                            }
                            continue;
                        }
                        if (info && info.lv) {
                            actedList.push(cfg);
                            continue;
                        }
                        notAct.push(cfg);
                    }
                    upList.sort(this.defaultSort);
                    actList.sort(this.defaultSort);
                    actedList.sort(this.defaultSort);
                    notAct.sort(this.defaultSort);
                    return dressList.concat(upList, actList, actedList, notAct);
                };
                DressUpProxy.prototype.defaultSort = function (a, b) {
                    if (a.quality == b.quality) {
                        return a.index - b.index;
                    }
                    return a.quality - b.quality;
                };
                DressUpProxy.prototype.getDressLen = function (type1, type2) {
                    var list = this.getDressList(type1, type2);
                    return list && list.length || 0;
                };
                DressUpProxy.prototype.getDressActLen = function (type1, type2) {
                    var list = this.getDressList(type1, type2);
                    var count = 0;
                    for (var _i = 0, list_6 = list; _i < list_6.length; _i++) {
                        var cfg = list_6[_i];
                        var _info = this.getDressByIdx(cfg.index);
                        if (_info && _info.lv) {
                            count++;
                        }
                    }
                    return count;
                };
                DressUpProxy.prototype.getDressListByType = function (type1) {
                    var _this = this;
                    var cfgArr = game.getConfigListByName("dress.json" /* DressUp */);
                    return cfgArr.filter(function (v) {
                        return _this.getDressTypeByIdx(v.index) == type1;
                    });
                };
                DressUpProxy.prototype.getTypes = function (type1) {
                    var _this = this;
                    var cfgArr = game.getConfigListByName("dress.json" /* DressUp */);
                    var list = cfgArr.filter(function (v) {
                        return _this.getDressTypeByIdx(v.index) == type1;
                    });
                    var _proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var types = [];
                    for (var _i = 0, list_7 = list; _i < list_7.length; _i++) {
                        var cfg = list_7[_i];
                        if (type1 == 1 /* Head */ && cfg.type == 4) {
                            var info = _proxy.getInfoByIndex(cfg.show_param[0]);
                            var isActed = info && info.star >= cfg.show_param[1];
                            if (!isActed) {
                                continue;
                            }
                        }
                        if (types.indexOf(cfg.type) == -1) {
                            if (!!cfg.show || !!this.getDressByIdx(cfg.index)) {
                                types.push(cfg.type);
                            }
                        }
                    }
                    return types.sort(function (a, b) { return a - b; });
                };
                /**获取分类，DE两位  1:头像 2:相框 3:气泡*/
                DressUpProxy.prototype.getDressTypeByIdx = function (idx) {
                    return game.PropData.getPropParse(idx, 2 /* PropType */);
                };
                /**
                 * 根据index获取装扮信息
                 * @param idx 时装index
                 */
                DressUpProxy.prototype.getDressByIdx = function (idx) {
                    return this._model.surface_map[idx];
                };
                /**
                 * 根据index获装扮套装信息
                 * @param idx 时装index
                 */
                DressUpProxy.prototype.getDressSuitByIdx = function (idx) {
                    var suit_list = this._model.surface_suit_list;
                    if (!suit_list || !suit_list.length) {
                        return null;
                    }
                    for (var _i = 0, suit_list_1 = suit_list; _i < suit_list_1.length; _i++) {
                        var f = suit_list_1[_i];
                        if (f && f.index.toNumber() == idx) {
                            return f;
                        }
                    }
                    return null;
                };
                /** 获取装扮总属性*/
                DressUpProxy.prototype.getDressAttrs = function (index) {
                    var map = this._model.surface_map;
                    if (index) {
                        var _info = map[index];
                        if (!_info) {
                            return null;
                        }
                        return _info.attr;
                    }
                    var _attrs = new msg.attributes;
                    _attrs.showpower = Long.fromValue(0);
                    for (var key in map) {
                        var f = map[key];
                        if (!f) {
                            continue;
                        }
                        var _baseAttr = f.attr;
                        if (!_baseAttr) {
                            continue;
                        }
                        if (f.attr && f.attr.showpower) {
                            _attrs.showpower = _attrs.showpower.add(f.attr.showpower);
                        }
                        var keys = game.TextUtil.getAttrOrderKeys(_baseAttr);
                        for (var i = 0, len = keys.length; i < len; i++) {
                            var attrType = keys[i];
                            var val = f.attr ? Number(f.attr[attrType]) : 0;
                            if (!_attrs[attrType]) {
                                _attrs[attrType] = val;
                            }
                            else {
                                _attrs[attrType] += val;
                            }
                        }
                    }
                    return _attrs;
                };
                Object.defineProperty(DressUpProxy.prototype, "curIdxList", {
                    get: function () {
                        return this._model.curIdxList;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DressUpProxy.prototype, "head", {
                    get: function () {
                        return this._model.head.toNumber();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DressUpProxy.prototype, "head_frame", {
                    get: function () {
                        return this._model.head_frame.toNumber();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DressUpProxy.prototype, "chat_frame", {
                    get: function () {
                        return this._model.chat_frame.toNumber();
                    },
                    enumerable: true,
                    configurable: true
                });
                //---------------------------------------红点------------------------
                DressUpProxy.prototype.onBagUpdateByHeadType = function (n) {
                    var list = n.body;
                    if (!list || !list.length || list.indexOf(390 /* DressUp */) < 0) {
                        return;
                    }
                    this.updateHint();
                };
                DressUpProxy.prototype.getTypeHint = function (type1, type2) {
                    var cfgArr = this.getDressList(type1, type2);
                    for (var _i = 0, cfgArr_1 = cfgArr; _i < cfgArr_1.length; _i++) {
                        var cfg = cfgArr_1[_i];
                        var bool = this.canActOrUpStar(cfg.index);
                        if (bool) {
                            return bool;
                        }
                    }
                    return false;
                };
                DressUpProxy.prototype.updateHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670091 /* DressUp */)) {
                        return;
                    }
                    for (var key in this._model.roots) {
                        var root = this._model.roots[key];
                        var cfgArr = this.getDressListByType(+key);
                        mod.HintMgr.setHint(false, root);
                        for (var _i = 0, cfgArr_2 = cfgArr; _i < cfgArr_2.length; _i++) {
                            var cfg = cfgArr_2[_i];
                            var bool = this.canActOrUpStar(cfg.index);
                            if (bool) {
                                mod.HintMgr.setHint(bool, root);
                            }
                        }
                    }
                    // let isHint = false;
                    // let _data: DressConfig[][] = this.getDressData();
                    // if (!_data || !_data.length) {
                    //     return;
                    // }
                    // for (let _d of _data) {
                    //     if (!_d || !_d.length) {
                    //         continue;
                    //     }
                    //     for (let cfg of _d) {
                    //         isHint = this.canActOrUpStar(cfg.index);
                    //         if (isHint) {
                    //             break;
                    //         }
                    //     }
                    //     if (isHint) {
                    //         break;
                    //     }
                    // }
                    // HintMgr.setHint(isHint, [ModName.Role, NewRoleViewType.DressUpMain]);
                };
                /**能否激活或升星*/
                DressUpProxy.prototype.canActOrUpStar = function (idx) {
                    var cfg = game.getConfigByNameId("dress.json" /* DressUp */, idx);
                    var info = this.getDressByIdx(idx);
                    if (!cfg || !info) {
                        return false;
                    }
                    var len = cfg.material.length;
                    if (!len) {
                        return false;
                    }
                    // let cost = cfg.material[0];
                    var cost;
                    if (len == 1) {
                        cost = cfg.material[0];
                    }
                    else if (len == 2) {
                        cost = cfg.material[Number(info)];
                    }
                    else {
                        cost = cfg.material[Number(info && info.lv)];
                    }
                    if (!cost) {
                        return false;
                    }
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                };
                return DressUpProxy;
            }(game.ProxyBase));
            role.DressUpProxy = DressUpProxy;
            __reflect(DressUpProxy.prototype, "game.mod.role.DressUpProxy");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var DressUpInfoView = /** @class */ (function (_super) {
                __extends(DressUpInfoView, _super);
                function DressUpInfoView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.DressUpInfoSkin";
                    return _this;
                }
                return DressUpInfoView;
            }(eui.Component));
            role.DressUpInfoView = DressUpInfoView;
            __reflect(DressUpInfoView.prototype, "game.mod.role.DressUpInfoView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var DressUpItemIcon = /** @class */ (function (_super) {
                __extends(DressUpItemIcon, _super);
                function DressUpItemIcon() {
                    var _this = _super.call(this) || this;
                    _this._proxy = game.getProxy("06" /* Role */, 44 /* DressUp */);
                    return _this;
                }
                DressUpItemIcon.prototype.onRemoveFromStage = function () {
                };
                DressUpItemIcon.prototype.dataChanged = function () {
                    var _data = this.data;
                    if (!_data) {
                        return;
                    }
                    var _prop = game.PropData.create(_data.index);
                    // this.icon.setData(_prop,IconShowType.NotTips);
                    var _info = this._proxy.getDressByIdx(_data.index);
                    if (!_info || _info.lv == 0) {
                        this.img_mask.visible = true;
                        this.lb_starLv.visible = this.img_star.visible = false;
                    }
                    else {
                        this.img_mask.visible = false;
                        this.lb_starLv.visible = this.img_star.visible = true;
                    }
                    this.lb_starLv.text = _info && _info.lv.toString() || '0';
                    var _type = this._proxy.getDressTypeByIdx(_data.index);
                    var isWear;
                    var selectedIdx;
                    var curIdx = this._proxy.curIdxList[_type - 1];
                    if (_type == 3 /* Bubble */) {
                        isWear = _data.index == this._proxy.chat_frame;
                        selectedIdx = curIdx ? curIdx : this._proxy.chat_frame;
                        this.icon.source = _prop.cfg.resource;
                    }
                    else if (_type == 1 /* Head */) {
                        isWear = _data.index == this._proxy.head;
                        selectedIdx = curIdx ? curIdx : this._proxy.head;
                        this.img_yuan.visible = true;
                        this.icon.source = _prop.cfg.resource;
                    }
                    else {
                        isWear = _data.index == this._proxy.head_frame;
                        selectedIdx = curIdx ? curIdx : this._proxy.head_frame;
                        this.img_yuan.visible = false;
                        this.icon.source = _prop.cfg.resource;
                    }
                    // this.currentState = (selectedIdx == _data.index || _data.index == this._proxy.selectedIndex) ? "upAndSelected" : "up";
                    this.img_use.visible = isWear;
                    this.redPoint.visible = this._proxy.canActOrUpStar(_data.index);
                };
                return DressUpItemIcon;
            }(mod.BaseListenerRenderer));
            role.DressUpItemIcon = DressUpItemIcon;
            __reflect(DressUpItemIcon.prototype, "game.mod.role.DressUpItemIcon");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitType4ForgeMdr = /** @class */ (function (_super) {
                __extends(SuitType4ForgeMdr, _super);
                function SuitType4ForgeMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**套装类型*/
                    _this._type = 4 /* XuanTian */;
                    return _this;
                }
                return SuitType4ForgeMdr;
            }(role.SuitType3ForgeMdr));
            role.SuitType4ForgeMdr = SuitType4ForgeMdr;
            __reflect(SuitType4ForgeMdr.prototype, "game.mod.role.SuitType4ForgeMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitType4Mdr = /** @class */ (function (_super) {
                __extends(SuitType4Mdr, _super);
                function SuitType4Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**套装类型*/
                    _this._type = 4 /* XuanTian */;
                    /**操作类型*/
                    _this._operType = 1 /* JinJie */;
                    return _this;
                }
                return SuitType4Mdr;
            }(role.SuitType3Mdr));
            role.SuitType4Mdr = SuitType4Mdr;
            __reflect(SuitType4Mdr.prototype, "game.mod.role.SuitType4Mdr");
            var SuitType4CastMdr = /** @class */ (function (_super) {
                __extends(SuitType4CastMdr, _super);
                function SuitType4CastMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**套装类型*/
                    _this._type = 4 /* XuanTian */;
                    /**操作类型*/
                    _this._operType = 3 /* JingZhu */;
                    return _this;
                }
                return SuitType4CastMdr;
            }(role.SuitType3CastMdr));
            role.SuitType4CastMdr = SuitType4CastMdr;
            __reflect(SuitType4CastMdr.prototype, "game.mod.role.SuitType4CastMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitType4SecondMdr = /** @class */ (function (_super) {
                __extends(SuitType4SecondMdr, _super);
                function SuitType4SecondMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._suitType = 4 /* XuanTian */;
                    _this._btnData = [
                        {
                            btnType: "01" /* Btn1 */,
                            icon: 'jinjie',
                            mdr: role.SuitType4Mdr,
                            bg: "suit_type1_bg",
                            openIdx: 1041670129 /* SuitType4 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "04" /* SuitType4 */, "01" /* Btn1 */]
                        },
                        {
                            btnType: "02" /* Btn2 */,
                            icon: 'duanzao',
                            mdr: role.SuitType4ForgeMdr,
                            bg: 'suit_duanzao_bg',
                            param: 1041670253 /* SuitForge4 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "04" /* SuitType4 */, "02" /* Btn2 */]
                        },
                        {
                            btnType: "03" /* Btn3 */,
                            icon: 'jingzhu',
                            mdr: role.SuitType4CastMdr,
                            bg: "suit_type1_bg",
                            param: 1041670132 /* SuitCast4 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "04" /* SuitType4 */, "03" /* Btn3 */]
                        }
                    ];
                    return _this;
                }
                return SuitType4SecondMdr;
            }(role.SuitType3SecondMdr));
            role.SuitType4SecondMdr = SuitType4SecondMdr;
            __reflect(SuitType4SecondMdr.prototype, "game.mod.role.SuitType4SecondMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitType5ForgeMdr = /** @class */ (function (_super) {
                __extends(SuitType5ForgeMdr, _super);
                function SuitType5ForgeMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**套装类型*/
                    _this._type = 5 /* JunTian */;
                    return _this;
                }
                return SuitType5ForgeMdr;
            }(role.SuitType3ForgeMdr));
            role.SuitType5ForgeMdr = SuitType5ForgeMdr;
            __reflect(SuitType5ForgeMdr.prototype, "game.mod.role.SuitType5ForgeMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitType5Mdr = /** @class */ (function (_super) {
                __extends(SuitType5Mdr, _super);
                function SuitType5Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**套装类型*/
                    _this._type = 5 /* JunTian */;
                    /**操作类型*/
                    _this._operType = 1 /* JinJie */;
                    return _this;
                }
                return SuitType5Mdr;
            }(role.SuitType3Mdr));
            role.SuitType5Mdr = SuitType5Mdr;
            __reflect(SuitType5Mdr.prototype, "game.mod.role.SuitType5Mdr");
            var SuitType5CastMdr = /** @class */ (function (_super) {
                __extends(SuitType5CastMdr, _super);
                function SuitType5CastMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    /**套装类型*/
                    _this._type = 5 /* JunTian */;
                    /**操作类型*/
                    _this._operType = 3 /* JingZhu */;
                    return _this;
                }
                return SuitType5CastMdr;
            }(role.SuitType3CastMdr));
            role.SuitType5CastMdr = SuitType5CastMdr;
            __reflect(SuitType5CastMdr.prototype, "game.mod.role.SuitType5CastMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var SuitType5SecondMdr = /** @class */ (function (_super) {
                __extends(SuitType5SecondMdr, _super);
                function SuitType5SecondMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._suitType = 5 /* JunTian */;
                    _this._btnData = [
                        {
                            btnType: "01" /* Btn1 */,
                            icon: 'jinjie',
                            mdr: role.SuitType5Mdr,
                            bg: "suit_type1_bg",
                            openIdx: 1041670130 /* SuitType5 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "05" /* SuitType5 */, "01" /* Btn1 */]
                        },
                        {
                            btnType: "02" /* Btn2 */,
                            icon: 'duanzao',
                            mdr: role.SuitType5ForgeMdr,
                            bg: 'suit_duanzao_bg',
                            param: 1041670254 /* SuitForge5 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "05" /* SuitType5 */, "02" /* Btn2 */]
                        },
                        {
                            btnType: "03" /* Btn3 */,
                            icon: 'jingzhu',
                            mdr: role.SuitType5CastMdr,
                            bg: "suit_type1_bg",
                            param: 1041670133 /* SuitCast5 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "06" /* SuitMain */, "05" /* SuitType5 */, "03" /* Btn3 */]
                        }
                    ];
                    return _this;
                }
                return SuitType5SecondMdr;
            }(role.SuitType3SecondMdr));
            role.SuitType5SecondMdr = SuitType5SecondMdr;
            __reflect(SuitType5SecondMdr.prototype, "game.mod.role.SuitType5SecondMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TitleModel = /** @class */ (function () {
                function TitleModel() {
                    // /** 当前佩戴index   0表示未佩戴称号*/
                    // wearing: Long;
                    /** 称号列表Map*/
                    this.title_list = {};
                }
                return TitleModel;
            }());
            role.TitleModel = TitleModel;
            __reflect(TitleModel.prototype, "game.mod.role.TitleModel");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var c2s_title_info = msg.c2s_title_info;
            var c2s_title_operate = msg.c2s_title_operate;
            var s2c_title_info = msg.s2c_title_info;
            var s2c_title_update = msg.s2c_title_update;
            var TitleProxy = /** @class */ (function (_super) {
                __extends(TitleProxy, _super);
                function TitleProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._cfgMap = {};
                    //全都请求过则设为1
                    _this._reqType = [];
                    _this._typeAtteList = {};
                    return _this;
                }
                Object.defineProperty(TitleProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TitleProxy.prototype, "using", {
                    get: function () {
                        return this._model.using.toNumber();
                    },
                    enumerable: true,
                    configurable: true
                });
                TitleProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    this._reqType = [];
                };
                TitleProxy.prototype.initialize = function () {
                    this._model = new role.TitleModel();
                    _super.prototype.initialize.call(this);
                    this.onProto(s2c_title_info, this.s2c_title_info, this);
                    this.onProto(s2c_title_update, this.s2c_title_update, this);
                };
                /** 称号信息请求*/
                TitleProxy.prototype.c2s_title_info = function () {
                    var req = new c2s_title_info();
                    this.sendProto(req);
                };
                /**
                 * 称号操作
                 * @param index  称号index
                 * @param operate 操作  1:升星，2:幻化，3:卸下，4：佩戴，5：取消幻化，6：激活
                 */
                TitleProxy.prototype.c2s_title_operate = function (index, operate) {
                    var req = new c2s_title_operate();
                    req.index = Long.fromNumber(index);
                    req.operate = operate;
                    this.sendProto(req);
                };
                /** 称号信息返回*/
                TitleProxy.prototype.s2c_title_info = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    if (msg.using != null) {
                        this._model.using = msg.using;
                    }
                    if (!this._model.title_list) {
                        this._model.title_list = {};
                    }
                    if (msg.title_list != null) {
                        for (var _i = 0, _a = msg.title_list; _i < _a.length; _i++) {
                            var title = _a[_i];
                            this._model.title_list[title.index.toNumber()] = title;
                        }
                    }
                    this.updateHint();
                    this.sendNt("title_info_update" /* TITLE_INFO_UPDATE */);
                };
                /** 称号信息更新*/
                TitleProxy.prototype.s2c_title_update = function (n) {
                    var msg = n.body;
                    if (!msg)
                        return;
                    var preUsing = null;
                    if (msg.using != null) {
                        var using = this._model.using;
                        if (using && using.neq(msg.using)) {
                            preUsing = using;
                        }
                        this._model.using = msg.using;
                    }
                    if (msg.title_item != null) {
                        var id = msg.title_item.index.toNumber();
                        this._model.title_list[id] = msg.title_item;
                        var cfg = this.getTitleCfgByIdx(id);
                        if (cfg) {
                            this.updateHint(cfg.type);
                        }
                    }
                    this.sendNt("title_info_update" /* TITLE_INFO_UPDATE */, [preUsing, msg.using, msg.title_item]);
                };
                /**
                 * 根据index获取称号信息
                 * @param idx 称号index
                 */
                TitleProxy.prototype.getTitleInfoByIdx = function (idx) {
                    return this._model.title_list[idx];
                };
                TitleProxy.prototype.getTitleCfgByIdx = function (idx) {
                    return game.getConfigByNameId("title.json" /* Title */, idx);
                };
                TitleProxy.prototype.canActivateOrUpStar = function (index) {
                    var info = this.getTitleInfoByIdx(index);
                    var cfg = this.getTitleCfgByIdx(index);
                    if (!cfg || !cfg.skin_material || (info && info.star && cfg.star_max <= info.star)) {
                        return false;
                    }
                    //有时效的不能升星
                    if (info && info.star && info.del_time) {
                        return false;
                    }
                    var cost = cfg.skin_material[0];
                    return mod.BagUtil.checkPropCnt(cost[0], cost[1]);
                };
                TitleProxy.prototype.onBagUpdateByHeadType = function (n) {
                    var list = n.body;
                    if (!list || !list.length || list.indexOf(370 /* Title */) < 0) {
                        return;
                    }
                    this.updateHint();
                };
                /**三种称号类型*/
                TitleProxy.prototype.updateHint = function (type) {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670090 /* Title */)) {
                        return;
                    }
                    for (var i = 1; i <= 3; i++) {
                        if (type && i != type) {
                            continue;
                        }
                        var hint = false;
                        var infoList = this.getTitleCfgListByType(i);
                        for (var _i = 0, infoList_1 = infoList; _i < infoList_1.length; _i++) {
                            var info = infoList_1[_i];
                            if (this.canActivateOrUpStar(info.index)) {
                                hint = true;
                                break;
                            }
                        }
                        mod.HintMgr.setHint(hint, ["06" /* Role */, "02" /* TitleMain */, '0' + i]);
                    }
                };
                /**根据类型获取对应的称号列表，未排序*/
                TitleProxy.prototype.getTitleCfgListByType = function (type) {
                    if (type === void 0) { type = 1; }
                    if (this._cfgMap[type]) {
                        return this._cfgMap[type];
                    }
                    this._cfgMap = {};
                    var cfgs = game.getConfigListByName("title.json" /* Title */);
                    for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                        var cfg = cfgs_1[_i];
                        if (!this._cfgMap[cfg.type]) {
                            this._cfgMap[cfg.type] = [];
                        }
                        this._cfgMap[cfg.type].push(cfg);
                    }
                    return this._cfgMap[type] || [];
                };
                /**
                 * 根据类型获取排序的称号列表
                 */
                TitleProxy.prototype.getSortedTitleListByType = function (type) {
                    var list = this.getTitleCfgListByType(type) || [];
                    var rst = [];
                    var actedList = [];
                    var notActedList = [];
                    for (var _i = 0, list_8 = list; _i < list_8.length; _i++) {
                        var cfg = list_8[_i];
                        var info = this.getTitleInfoByIdx(cfg.index);
                        if (cfg.index == this.using) {
                            rst.unshift(cfg);
                        }
                        else if (info && info.star > 0) {
                            actedList.push(cfg);
                        }
                        else if (this.canActivateOrUpStar(cfg.index)) {
                            rst.push(cfg);
                        }
                        else {
                            notActedList.push(cfg);
                        }
                    }
                    rst = rst.concat(actedList, notActedList);
                    return rst;
                };
                //获取未激活的称号
                TitleProxy.prototype.getNotActedList = function (type) {
                    var list = this.getTitleCfgListByType(type);
                    var rst = [];
                    for (var _i = 0, list_9 = list; _i < list_9.length; _i++) {
                        var cfg = list_9[_i];
                        var info = this.getTitleInfoByIdx(cfg.index);
                        if (!info) {
                            rst.push(cfg);
                        }
                    }
                    return rst;
                };
                //未激活称号属性，还未请求
                TitleProxy.prototype.haveNotReqAttr = function (type) {
                    if (this._reqType[type] != null && this._reqType[type] == 1) {
                        return false;
                    }
                    var list = this.getNotActedList(type);
                    for (var _i = 0, list_10 = list; _i < list_10.length; _i++) {
                        var cfg = list_10[_i];
                        var attrs = mod.RoleUtil.checkAttrList(cfg.attr_id);
                        if (!attrs) {
                            return true; //某个称号的属性还没有请求
                        }
                    }
                    this._reqType[type] = 1; //只有全部属性都请求过，才会赋值。一般第二次就会赋值了
                    return false;
                };
                //某类型称号的全部属性id
                TitleProxy.prototype.getAttrIdList = function (type) {
                    if (this._typeAtteList && this._typeAtteList[type]) {
                        return this._typeAtteList[type];
                    }
                    var idList = [];
                    var cfgList = this.getTitleCfgListByType(type);
                    for (var _i = 0, cfgList_2 = cfgList; _i < cfgList_2.length; _i++) {
                        var cfg = cfgList_2[_i];
                        if (!cfg || !cfg.attr_id) {
                            continue;
                        }
                        var info = this.getTitleInfoByIdx(cfg.index);
                        if (info && info.attrs) {
                            continue;
                        }
                        var attrIds = cfg.attr_id;
                        for (var _a = 0, attrIds_1 = attrIds; _a < attrIds_1.length; _a++) {
                            var id = attrIds_1[_a];
                            if (idList.indexOf(id) < 0) {
                                idList.push(id);
                            }
                        }
                    }
                    this._typeAtteList[type] = idList;
                    return idList;
                };
                //有倒计时的称号，需开启定时器
                TitleProxy.prototype.haveDelTime = function (type) {
                    var cfgList = this.getTitleCfgListByType(type);
                    for (var _i = 0, cfgList_3 = cfgList; _i < cfgList_3.length; _i++) {
                        var cfg = cfgList_3[_i];
                        if (!cfg) {
                            continue;
                        }
                        var info = this.getTitleInfoByIdx(cfg.index);
                        if (info && info.del_time) {
                            return true;
                        }
                    }
                    return false;
                };
                return TitleProxy;
            }(game.ProxyBase));
            role.TitleProxy = TitleProxy;
            __reflect(TitleProxy.prototype, "game.mod.role.TitleProxy");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TimeMgr = base.TimeMgr;
            var TitleItem = /** @class */ (function (_super) {
                __extends(TitleItem, _super);
                function TitleItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.NewTitleItemSkin";
                    return _this;
                }
                TitleItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("06" /* Role */, 29 /* Title */);
                    this.costItem.setIconScale(0.5);
                    this.img_bg.source = game.ResUtil.getUiPng('p1_title_item_bg');
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_huanHua, this.onClickHuanHua, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_act, this.onClickAct, this);
                };
                TitleItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this.removeEft();
                };
                TitleItem.prototype.dataChanged = function () {
                    var cfg = this.data;
                    if (!cfg) {
                        return;
                    }
                    var index = cfg.index;
                    this.info = this._proxy.getTitleInfoByIdx(cfg.index);
                    var notAct = !this.info || this.info.star == 0; //未激活
                    var cost = cfg.skin_material && cfg.skin_material[0] || null;
                    var isCostEnough = cost ? mod.BagUtil.checkPropCnt(cost[0], cost[1]) : false; //道具足够否
                    if (notAct) {
                        this.img_notAct.visible = !isCostEnough;
                        this.img_notAct.source = 'hongseweijihuo';
                        this.costItem.visible = this.btn_act.visible = isCostEnough;
                        isCostEnough && this.costItem.updateShow(cost);
                        this.btn_act.label = game.getLanById("active" /* active */);
                    }
                    else if (this.info && this.info.star && this.info.star == cfg.star_max) {
                        this.img_notAct.visible = true;
                        this.img_notAct.source = 'lvseyimanxing';
                        this.costItem.visible = this.btn_act.visible = false;
                    }
                    else {
                        this.img_notAct.visible = false;
                        var canUp = cfg.star_max > 0; //能升星
                        this.costItem.visible = this.btn_act.visible = canUp;
                        this.costItem.updateShow(cost);
                        this.btn_act.label = game.getLanById("uplv" /* uplv */);
                    }
                    this.btn_act.visible && this.btn_act.setHint(this._proxy.canActivateOrUpStar(index));
                    //激活就能幻化
                    this.btn_huanHua.visible = !notAct && this._proxy.using != index;
                    this.img_using.visible = this._proxy.using == index;
                    this.gr_lb.visible = notAct;
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(cfg.text || '');
                    this.updateTime();
                    this.updateStar();
                    this.updateAttr();
                    this.removeEft();
                    this.addEftByParent(game.ResUtil.getTitleSrc(index, 0), this.gr_eft);
                };
                TitleItem.prototype.updateTime = function () {
                    var del_time = this.info && this.info.del_time || 0;
                    var leftTime = del_time - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this.lb_time.text = '';
                        return;
                    }
                    if (!this.lb_time.visible) {
                        this.lb_time.visible = true;
                    }
                    this.lb_time.textFlow = game.TextUtil.parseHtml(game.TimeUtil.formatSecond(leftTime, 'd天 HH:mm:ss'));
                };
                TitleItem.prototype.updateStar = function () {
                    if (!this.info || !this.info.star) {
                        this.gr_star.visible = false;
                        return;
                    }
                    this.gr_star.visible = true;
                    this.lb_starCount.text = this.info.star + '';
                };
                TitleItem.prototype.updateAttr = function () {
                    var attr;
                    if (this.info && this.info.attrs) {
                        attr = this.info.attrs;
                    }
                    else {
                        var attrs = mod.RoleUtil.getAttrList(this.data.attr_id);
                        attr = game.TextUtil.calcAttrList(attrs);
                    }
                    attr && this.attr.updateAttr(attr, 0x238e2c);
                };
                TitleItem.prototype.onClickHuanHua = function () {
                    if (!this.info || !this.info.star) {
                        return;
                    }
                    //卸下
                    if (this.data.index == this._proxy.using) {
                        this._proxy.c2s_title_operate(this.data.index, 5);
                        return;
                    }
                    //幻化
                    this._proxy.c2s_title_operate(this.data.index, 2);
                };
                TitleItem.prototype.onClickAct = function () {
                    var data = this.data;
                    if (!data || !data.skin_material) {
                        return;
                    }
                    var cost = data.skin_material[0];
                    if (cost && !mod.BagUtil.checkPropCnt(cost[0], cost[1], 2 /* Text */)) {
                        return;
                    }
                    //激活
                    if (!this.info || this.info.star == 0) {
                        this._proxy.c2s_title_operate(data.index, 6);
                        return;
                    }
                    // 有时限的称号不可升星
                    if (this.info.del_time) {
                        return;
                    }
                    //升星
                    this._proxy.c2s_title_operate(data.index, 1);
                };
                return TitleItem;
            }(mod.BaseRenderer));
            role.TitleItem = TitleItem;
            __reflect(TitleItem.prototype, "game.mod.role.TitleItem");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TitleView = /** @class */ (function (_super) {
                __extends(TitleView, _super);
                function TitleView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.NewTitleSkin";
                    return _this;
                }
                return TitleView;
            }(eui.Component));
            role.TitleView = TitleView;
            __reflect(TitleView.prototype, "game.mod.role.TitleView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var title_info = msg.title_info;
            var TimeMgr = base.TimeMgr;
            var TitleMdr = /** @class */ (function (_super) {
                __extends(TitleMdr, _super);
                function TitleMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", role.TitleView);
                    /**类型，1成就，2排行，3特殊*/
                    _this._type = 1;
                    return _this;
                }
                TitleMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(29 /* Title */);
                    this._view.list.itemRenderer = role.TitleItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                TitleMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("title_info_update" /* TITLE_INFO_UPDATE */, this.updateView, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateList, this);
                };
                TitleMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.list.parent.stopAnimation();
                    this._view.list.scrollV = 0;
                    //有未请求的属性，请求了再更新
                    if (this._proxy.haveNotReqAttr(this._type)) {
                        var idList = this._proxy.getAttrIdList(this._type);
                        if (idList && idList.length) {
                            mod.RoleUtil.getAttrList(idList);
                        }
                    }
                    else {
                        this.updateList();
                    }
                    if (this._proxy.haveDelTime(this._type)) {
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                };
                TitleMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                TitleMdr.prototype.updateList = function () {
                    this._listData.replaceAll(this._proxy.getSortedTitleListByType(this._type));
                };
                TitleMdr.prototype.updateView = function (n) {
                    var data = n.body;
                    if (!data) {
                        return;
                    }
                    var preUsing = data[0], curUsing = data[1], info = data[2];
                    var source = this._listData.source || [];
                    var size = source.length;
                    //上一次幻化的 || 当前幻化的
                    var itemUpdatedCnt = 0;
                    if (preUsing || curUsing) {
                        for (var i = 0; i < size; i++) {
                            if (!source[i]) {
                                continue;
                            }
                            if ((preUsing && source[i].index == preUsing)
                                || (curUsing && source[i].index == curUsing)) {
                                this._listData.itemUpdated(source[i]);
                                itemUpdatedCnt++;
                            }
                            if (itemUpdatedCnt >= 2) {
                                break;
                            }
                        }
                    }
                    if (curUsing) {
                        game.PromptBox.getIns().show(game.getLanById("huanhua_chenggong" /* huanhua_chenggong */));
                    }
                    //激活或者升星刷新某项
                    if (info && info instanceof title_info) {
                        for (var i = 0; i < size; i++) {
                            if (source[i] && source[i].index == info.index.toNumber()) {
                                this._listData.replaceItemAt(source[i], i);
                                break;
                            }
                        }
                        if (info.star == 1) {
                            game.PromptBox.getIns().show(game.getLanById("jihuo_chenggong" /* jihuo_chenggong */));
                        }
                    }
                };
                TitleMdr.prototype.update = function (time) {
                    var size = this._listData.source.length;
                    for (var i = 0; i < size; i++) {
                        var cfg = this._listData.source[i];
                        if (!cfg) {
                            continue;
                        }
                        var info = this._proxy.getTitleInfoByIdx(cfg.index);
                        if (!info || !info.del_time) {
                            continue;
                        }
                        var item = this._view.list.getChildAt(i);
                        if (item) {
                            item.updateTime();
                        }
                    }
                };
                return TitleMdr;
            }(game.MdrBase));
            role.TitleMdr = TitleMdr;
            __reflect(TitleMdr.prototype, "game.mod.role.TitleMdr", ["base.UpdateItem"]);
            var TitleMdr2 = /** @class */ (function (_super) {
                __extends(TitleMdr2, _super);
                function TitleMdr2() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._type = 2;
                    return _this;
                }
                return TitleMdr2;
            }(TitleMdr));
            role.TitleMdr2 = TitleMdr2;
            __reflect(TitleMdr2.prototype, "game.mod.role.TitleMdr2");
            var TitleMdr3 = /** @class */ (function (_super) {
                __extends(TitleMdr3, _super);
                function TitleMdr3() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._type = 3;
                    return _this;
                }
                return TitleMdr3;
            }(TitleMdr));
            role.TitleMdr3 = TitleMdr3;
            __reflect(TitleMdr3.prototype, "game.mod.role.TitleMdr3");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TitleSecondMainMdr = /** @class */ (function (_super) {
                __extends(TitleSecondMainMdr, _super);
                function TitleSecondMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "achievement_tab_icon",
                            mdr: role.TitleMdr,
                            title: 'surface_tips8',
                            openIdx: 0,
                            hintTypes: ["06" /* Role */, "02" /* TitleMain */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "rank_tab_icon",
                            mdr: role.TitleMdr2,
                            title: 'surface_tips8',
                            openIdx: 0,
                            hintTypes: ["06" /* Role */, "02" /* TitleMain */, "02" /* TabBtnType02 */]
                        },
                        {
                            btnType: "03" /* TabBtnType03 */,
                            icon: "special_tab_icon",
                            mdr: role.TitleMdr3,
                            title: 'surface_tips8',
                            openIdx: 0,
                            hintTypes: ["06" /* Role */, "02" /* TitleMain */, "03" /* TabBtnType03 */]
                        }
                    ];
                    return _this;
                }
                return TitleSecondMainMdr;
            }(mod.WndSecondMdr));
            role.TitleSecondMainMdr = TitleSecondMainMdr;
            __reflect(TitleSecondMainMdr.prototype, "game.mod.role.TitleSecondMainMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var facade = base.facade;
            var WeaponMainMdr = /** @class */ (function (_super) {
                __extends(WeaponMainMdr, _super);
                function WeaponMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Weapon */,
                            icon: "weapon_tab",
                            mdr: mod.SurfaceMdr,
                            title: "weapon_tips" /* weapon_tips */,
                            bg: "horse_bg",
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "17" /* Weapon */, "01" /* Weapon */],
                        },
                        {
                            btnType: "02" /* WeaponStar */,
                            icon: "huanhua_tab",
                            mdr: mod.SurfaceStarMdr,
                            title: "weapon_tips" /* weapon_tips */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "17" /* Weapon */, "02" /* WeaponStar */],
                        }
                    ];
                    return _this;
                }
                WeaponMainMdr.prototype.onShow = function () {
                    this._proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                    this._proxy.headType = 403 /* Weapon */;
                    _super.prototype.onShow.call(this);
                };
                /**默认选中的BtnType，可重写*/
                WeaponMainMdr.prototype.getDefaultBtnType = function () {
                    if (this._proxy.getActHint(this._proxy.headType)) {
                        return "02" /* WeaponStar */;
                    }
                    return "";
                };
                return WeaponMainMdr;
            }(mod.WndBaseMdr));
            role.WeaponMainMdr = WeaponMainMdr;
            __reflect(WeaponMainMdr.prototype, "game.mod.role.WeaponMainMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var facade = base.facade;
            var WingMainMdr = /** @class */ (function (_super) {
                __extends(WingMainMdr, _super);
                function WingMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Wing */,
                            icon: "wing_tab",
                            mdr: mod.SurfaceMdr,
                            title: "wing_tips" /* wing_tips */,
                            bg: "horse_bg",
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "16" /* Wing */],
                        },
                        {
                            btnType: "02" /* WingStar */,
                            icon: "huanhua_tab",
                            mdr: mod.SurfaceStarMdr,
                            title: "wing_tips" /* wing_tips */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "16" /* Wing */, "02" /* WingStar */],
                        }
                    ];
                    return _this;
                }
                WingMainMdr.prototype.onShow = function () {
                    this._proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                    this._proxy.headType = 404 /* Wing */;
                    _super.prototype.onShow.call(this);
                };
                /**默认选中的BtnType，可重写*/
                WingMainMdr.prototype.getDefaultBtnType = function () {
                    if (this._proxy.getActHint(this._proxy.headType)) {
                        return "02" /* WingStar */;
                    }
                    return "";
                };
                return WingMainMdr;
            }(mod.WndBaseMdr));
            role.WingMainMdr = WingMainMdr;
            __reflect(WingMainMdr.prototype, "game.mod.role.WingMainMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuModel = /** @class */ (function () {
                function XiuxianNvpuModel() {
                    this.giftHintPath = ["06" /* Role */, "01" /* RoleMain */, "24" /* XiuxianNvpuGrowMain */, "01" /* TabBtnType01 */, "01" /* TabBtnType01 */];
                    /**离线收益一次登陆弹窗界面处理*/
                    this.offlineRewardShow = true;
                    //天帝事件类型
                    this.tiandiMap = {};
                }
                return XiuxianNvpuModel;
            }());
            role.XiuxianNvpuModel = XiuxianNvpuModel;
            __reflect(XiuxianNvpuModel.prototype, "game.mod.role.XiuxianNvpuModel");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var s2c_update_ayah_info = msg.s2c_update_ayah_info;
            var s2c_ayah_offline_reward_show = msg.s2c_ayah_offline_reward_show;
            var c2s_ayah_buy_gift = msg.c2s_ayah_buy_gift;
            var c2s_ayah_edit_show = msg.c2s_ayah_edit_show;
            var c2s_ayah_apparent = msg.c2s_ayah_apparent;
            var c2s_ayah_get_reward = msg.c2s_ayah_get_reward;
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var Handler = base.Handler;
            var delayCall = base.delayCall;
            var clearDelay = base.clearDelay;
            /**
             * @description 修仙女仆系统 Fairy maid
             */
            var XiuxianNvpuProxy = /** @class */ (function (_super) {
                __extends(XiuxianNvpuProxy, _super);
                function XiuxianNvpuProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._firstTime30 = 0; //0表示没有，1表示执行1次了，
                    return _this;
                    /**====================== 在线挂机 end ======================*/
                }
                XiuxianNvpuProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    this.clearAllCall();
                    this.autoChallengeEventType = null;
                    this._model.offlineRewardShow = true;
                };
                XiuxianNvpuProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new role.XiuxianNvpuModel();
                    this.onProto(s2c_update_ayah_info, this.s2c_update_ayah_info, this);
                    this.onProto(s2c_ayah_offline_reward_show, this.s2c_ayah_offline_reward_show, this);
                    facade.onNt("update_main_pass_info" /* UPDATE_MAIN_PASS_INFO */, this.onUpdateMainPassInfo, this);
                    facade.onNt("on_xiuxiannvpu_special_challenge_next" /* ON_XIUXIANNVPU_SPECIAL_CHALLENGE_NEXT */, this.onSpecialChallengeNext, this);
                };
                XiuxianNvpuProxy.prototype.s2c_update_ayah_info = function (n) {
                    var msg = n.body;
                    if (msg.time != null) {
                        this._model.time = msg.time;
                    }
                    if (msg.level != null) {
                        this._model.level = msg.level;
                    }
                    if (msg.exp != null) {
                        this._model.exp = msg.exp;
                    }
                    if (msg.show_index != null) {
                        this._model.show_index = msg.show_index;
                    }
                    if (msg.buy_list != null) {
                        this._model.buy_list = msg.buy_list;
                    }
                    if (msg.finish_list != null) {
                        this._model.finish_list = msg.finish_list;
                    }
                    else {
                        this._model.finish_list = [];
                    }
                    if (msg.offline_list != null) {
                        this._model.offline_list = msg.offline_list;
                    }
                    else {
                        this._model.offline_list = [];
                    }
                    if (msg.online_list != null) {
                        this._model.online_list = msg.online_list;
                    }
                    else {
                        this._model.online_list = [];
                    }
                    this.dealAutoEventFunc();
                    this.updateHint();
                    this.sendNt("on_xiuxiannvpu_info_update" /* ON_XIUXIANNVPU_INFO_UPDATE */);
                };
                //离线挂机弹框界面
                XiuxianNvpuProxy.prototype.s2c_ayah_offline_reward_show = function (n) {
                    var msg = n.body;
                    if (msg.list != null) {
                        this._model.reward_list = msg.list;
                    }
                    if (msg.items != null) {
                        this._model.reward_items = msg.items;
                    }
                    this.sendNt("on_xiuxiannvpu_offline_reward_update" /* ON_XIUXIANNVPU_OFFLINE_REWARD_UPDATE */);
                    //离线收益界面
                    if (msg.list != null && this._model.offlineRewardShow) {
                        this._model.offlineRewardShow = false;
                        facade.showView("06" /* Role */, "29" /* XiuxianNvpuResult */, 2);
                    }
                };
                //购买礼包
                XiuxianNvpuProxy.prototype.c2s_ayah_buy_gift = function (index) {
                    var msg = new c2s_ayah_buy_gift();
                    msg.index = index;
                    this.sendProto(msg);
                };
                //编辑挂机框 oper: 1.离线挂机框编辑2.在线挂机框编辑
                XiuxianNvpuProxy.prototype.c2s_ayah_edit_show = function (oper, list) {
                    var msg = new c2s_ayah_edit_show();
                    msg.oper = oper;
                    msg.list = list;
                    this.sendProto(msg);
                };
                //幻化
                XiuxianNvpuProxy.prototype.c2s_ayah_apparent = function (lv) {
                    var msg = new c2s_ayah_apparent();
                    msg.level = lv;
                    this.sendProto(msg);
                };
                //领取挂机奖励 oper:1.在线领取2.离线领取
                XiuxianNvpuProxy.prototype.c2s_ayah_get_reward = function (oper) {
                    var msg = new c2s_ayah_get_reward();
                    msg.oper = oper;
                    this.sendProto(msg);
                };
                /**====================== 协议end ======================*/
                /**女仆是否激活，true为激活。isTips是否飘字，showConfirm是否展示确定弹窗*/
                XiuxianNvpuProxy.prototype.isActed = function (isTips, showConfirm) {
                    if (isTips === void 0) { isTips = false; }
                    if (showConfirm === void 0) { showConfirm = false; }
                    var isActed = this.isBought();
                    if (!isActed) {
                        if (isTips) {
                            game.PromptBox.getIns().show(game.getLanById("xiuxiannvpu_tips9" /* xiuxiannvpu_tips9 */));
                        }
                        if (showConfirm) {
                            mod.ViewMgr.getIns().showConfirm(game.getLanById("xiuxiannvpu_tips14" /* xiuxiannvpu_tips14 */), Handler.alloc(this, function () {
                                mod.ViewMgr.getIns().showSecondPop("06" /* Role */, "23" /* XiuxianNvpuBuy */);
                            }));
                        }
                        return false;
                    }
                    return true;
                };
                //是否已购买
                XiuxianNvpuProxy.prototype.isBought = function () {
                    var time = this._model.time;
                    return time && time > 0;
                };
                Object.defineProperty(XiuxianNvpuProxy.prototype, "day", {
                    //续费天数
                    get: function () {
                        var curTime = TimeMgr.time.serverTimeSecond;
                        var endTime = this._model.time ? this._model.time : 0;
                        var leftTime = endTime - curTime;
                        if (leftTime > 0) {
                            return Math.floor(leftTime / game.Second.Day);
                        }
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XiuxianNvpuProxy.prototype, "show_index", {
                    get: function () {
                        return this._model.show_index || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XiuxianNvpuProxy.prototype, "level", {
                    get: function () {
                        return this._model.level || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XiuxianNvpuProxy.prototype, "exp", {
                    get: function () {
                        return this._model.exp || 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XiuxianNvpuProxy.prototype, "online_list", {
                    get: function () {
                        return this._model.online_list || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XiuxianNvpuProxy.prototype, "offline_list", {
                    get: function () {
                        return this._model.offline_list || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XiuxianNvpuProxy.prototype, "buy_list", {
                    get: function () {
                        return this._model.buy_list || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XiuxianNvpuProxy.prototype, "reward_list", {
                    get: function () {
                        return this._model.reward_list || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XiuxianNvpuProxy.prototype, "finish_list", {
                    get: function () {
                        return this._model.finish_list || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                //礼包是否购买
                XiuxianNvpuProxy.prototype.isGiftBought = function (index) {
                    return this.buy_list.indexOf(index) > -1;
                };
                XiuxianNvpuProxy.prototype.isMaxLevel = function () {
                    var cfgList = game.getConfigListByName("ayah_level.json" /* XiuxianNvpuLevel */);
                    var maxLevel = cfgList.length;
                    return this.level >= maxLevel;
                };
                Object.defineProperty(XiuxianNvpuProxy.prototype, "shenlingId", {
                    //神灵id
                    get: function () {
                        var paramCfg = game.GameConfig.getParamConfigById('ayah_show');
                        if (paramCfg && paramCfg.value) {
                            return paramCfg.value[0];
                        }
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XiuxianNvpuProxy.prototype, "shenlingCfg", {
                    get: function () {
                        var id = this.shenlingId;
                        return game.getConfigByNameId("shenling.json" /* Shenling */, id);
                    },
                    enumerable: true,
                    configurable: true
                });
                //天帝是否激活
                XiuxianNvpuProxy.prototype.isTiandiActed = function (type) {
                    var tiandiProxy = game.getProxy("60" /* God */, 232 /* God */);
                    return tiandiProxy.getActivate(type);
                };
                //天帝类型
                XiuxianNvpuProxy.prototype.getTiandiList = function () {
                    if (this._model.tiandiList) {
                        return this._model.tiandiList;
                    }
                    this.buildTiandi();
                    return this._model.tiandiList || [];
                };
                //天帝事件类型
                XiuxianNvpuProxy.prototype.getTiandiEventList = function (id) {
                    if (this._model.tiandiMap[id]) {
                        return this._model.tiandiMap[id];
                    }
                    this.buildTiandi();
                    return this._model.tiandiMap[id] || [];
                };
                XiuxianNvpuProxy.prototype.buildTiandi = function () {
                    var list = [];
                    var cfgList = game.getConfigListByName("ayah_offline.json" /* XiuxianNvpuOffline */);
                    for (var _i = 0, cfgList_4 = cfgList; _i < cfgList_4.length; _i++) {
                        var cfg = cfgList_4[_i];
                        if (!cfg.time) {
                            continue;
                        }
                        var id = cfg.time[0];
                        if (list.indexOf(id) < 0) {
                            list.push(id);
                        }
                        if (!this._model.tiandiMap[id]) {
                            this._model.tiandiMap[id] = [];
                        }
                        this._model.tiandiMap[id].push(cfg.type);
                    }
                    this._model.tiandiList = list;
                };
                //获取事件类型名字
                XiuxianNvpuProxy.prototype.getEventName = function (event) {
                    var cfg = game.getConfigByNameId("ayah_event_func.json" /* XiuxianNvpuEventFunc */, event);
                    if (!cfg) {
                        return '';
                    }
                    var funCfg = game.getConfigByNameId("open_function.json" /* OpenFunction */, cfg.open_func);
                    return funCfg && funCfg.name || '';
                };
                //获取事件类型可领取次数
                XiuxianNvpuProxy.prototype.getEventCnt = function (event) {
                    var list = this.finish_list;
                    for (var _i = 0, list_11 = list; _i < list_11.length; _i++) {
                        var item = list_11[_i];
                        if (item && item.type == event) {
                            return item.count;
                        }
                    }
                    return 0;
                };
                /**====================== hint start ======================*/
                //礼包红点
                XiuxianNvpuProxy.prototype.getGiftHint = function () {
                    var cfgList = game.getConfigListByName("ayah_target.json" /* XiuxianNvpuTarget */);
                    var hint = false;
                    var level = this.level;
                    for (var _i = 0, cfgList_5 = cfgList; _i < cfgList_5.length; _i++) {
                        var cfg = cfgList_5[_i];
                        if (!cfg || cfg.level > level) {
                            continue;
                        }
                        if (this.isGiftBought(cfg.index)) {
                            continue;
                        }
                        if (cfg.type == 2 && cfg.product_id) {
                            var rmb = mod.PayUtil.getRmbValue(cfg.product_id);
                            if (rmb == 0) {
                                hint = true;
                                break;
                            }
                        }
                        if (cfg.type == 1 && cfg.cost && mod.BagUtil.checkPropCnt(cfg.cost[0], cfg.cost[1])) {
                            hint = true;
                            break;
                        }
                    }
                    return hint;
                };
                //todo
                XiuxianNvpuProxy.prototype.updateHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670240 /* XiuxianNvpu */) || !this.isActed()) {
                        return;
                    }
                    mod.HintMgr.setHint(this.getGiftHint(), this._model.giftHintPath);
                };
                /**====================== hint end ======================*/
                /**====================== 在线挂机 start ======================*/
                XiuxianNvpuProxy.prototype.onOpenFuncUpdate = function (n) {
                    var addIdx = n.body;
                    if (addIdx.indexOf(1041670240 /* XiuxianNvpu */) > -1) {
                        this.dealAutoEventFunc();
                    }
                };
                /**
                 * 需要做重置，然后重新处理
                 *      （比如扫荡界面关闭时候）
                 *      （比如个人副本发送重置协议后，需要重新处理才可以挑战或扫荡）
                 *      （比如仙塔不会出现扫荡结算界面，监听协议扫荡完成）
                 *      （比如异界boss手动退出，有30秒的限制进入时间）
                 */
                XiuxianNvpuProxy.prototype.onSpecialChallengeNext = function (n) {
                    var bool = n.body;
                    if (bool) {
                        this._firstTime30 = 0; //手动退出，重新计算30秒。用于异界boss复活等
                    }
                    this.onUpdateSceneEnter();
                };
                /**
                 * 从副本退出或者扫荡结束等等，继续处理下一个自动挑战或扫荡
                 */
                XiuxianNvpuProxy.prototype.onUpdateSceneEnter = function () {
                    if (!mod.SceneUtil.isShowMain()) {
                        this.clearAllCall();
                        return;
                    }
                    if (this.autoChallengeEventType) {
                        game.LogUtil.printNvpuChallenge("\u7ED3\u675F\u5904\u7406\u526F\u672C: " + this.autoChallengeEventType);
                    }
                    this.autoChallengeEventType = null;
                    this.dealAutoEventFunc(); //继续处理下一个
                };
                //闯关更新
                XiuxianNvpuProxy.prototype.onUpdateMainPassInfo = function () {
                    this.dealAutoEventFunc();
                };
                Object.defineProperty(XiuxianNvpuProxy.prototype, "autoChallengeEventType", {
                    /**当前正在处理的事件类型*/
                    get: function () {
                        return this._model.autoChallengeEventType;
                    },
                    set: function (type) {
                        this._model.autoChallengeEventType = type;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XiuxianNvpuProxy.prototype, "autoChallengeEventMap", {
                    /**可处理的事件类型集合*/
                    get: function () {
                        if (!this._model.autoChallengeEventMap) {
                            this._model.autoChallengeEventMap = new Map();
                        }
                        return this._model.autoChallengeEventMap;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XiuxianNvpuProxy.prototype, "sort_online_list", {
                    //排序后的挂机事件类型（可插队、优先级从高到低）
                    get: function () {
                        var _this = this;
                        var list = this.online_list.concat();
                        list.sort(function (a, b) {
                            var aLimit = _this.isLimitType(a);
                            var bLimit = _this.isLimitType(b);
                            var aPri = _this.getPriority(a);
                            var bPri = _this.getPriority(b);
                            if (aLimit != bLimit) {
                                return aLimit ? -1 : 1;
                            }
                            return bPri - aPri;
                        });
                        return list;
                    },
                    enumerable: true,
                    configurable: true
                });
                //主城等待时间
                XiuxianNvpuProxy.prototype.getWaitTime = function (type) {
                    if (type === void 0) { type = 0; }
                    var cfg = game.GameConfig.getParamConfigById('ayah_waittime');
                    return cfg && cfg.value && cfg.value[type] ? cfg.value[type] : (type == 0 ? 30 : 5);
                };
                //获取处理优先级，优先级高的先执行
                XiuxianNvpuProxy.prototype.getPriority = function (type) {
                    var cfg = game.getConfigByNameId("ayah_event_func.json" /* XiuxianNvpuEventFunc */, type);
                    return cfg && cfg.rank || 0;
                };
                //是否是限时副本
                XiuxianNvpuProxy.prototype.isLimitType = function (type) {
                    var cfg = game.getConfigByNameId("ayah_event_func.json" /* XiuxianNvpuEventFunc */, type);
                    return cfg && cfg.limit_activity && cfg.limit_activity != 0;
                };
                XiuxianNvpuProxy.prototype.clearAllCall = function () {
                    if (this._delayCall30) {
                        clearDelay(this._delayCall30);
                        this._delayCall30 = null;
                        game.LogUtil.printNvpuChallenge("\u6E05\u7406" + this.getWaitTime(0) + "\u79D2\u5012\u8BA1\u65F6");
                    }
                    if (this._delayCall5) {
                        clearDelay(this._delayCall5);
                        this._delayCall5 = null;
                        game.LogUtil.printNvpuChallenge("\u6E05\u7406" + this.getWaitTime(1) + "\u79D2\u5012\u8BA1\u65F6");
                    }
                };
                /**处理自动挂机事件*/
                XiuxianNvpuProxy.prototype.dealAutoEventFunc = function () {
                    if (DEBUG && window['stopNvpu']) { //todo debug，停止事件
                        return;
                    }
                    //功能未开启
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670240 /* XiuxianNvpu */)) {
                        return;
                    }
                    //未激活
                    if (!this.isActed()) {
                        return;
                    }
                    //自动挂机不处理
                    var mainProxy = game.getProxy("42" /* Pass */, 9 /* Pass */);
                    if (mainProxy && mainProxy.passIsAuto) {
                        this.clearAllCall();
                        this.autoChallengeEventType = null;
                        return;
                    }
                    //没有可执行的
                    var notExist = this.checkNotExistEventType();
                    if (notExist) {
                        this.clearAllCall();
                        this.autoChallengeEventType = null;
                        return;
                    }
                    //有正在处理的事件类型
                    if (this.autoChallengeEventType) {
                        return;
                    }
                    //主城挂机等待时间不足，等待时间已经处理过，无需再处理
                    if (this._firstTime30 == 0) {
                        var time0 = this.getWaitTime(0);
                        if (!this._delayCall30) {
                            game.LogUtil.printNvpuChallenge("\u5F00\u542F" + time0 + "\u79D2\u5012\u8BA1\u65F6");
                            this._delayCall30 = delayCall(Handler.alloc(this, this.delayCall30Func), time0 * 1000);
                        }
                        return;
                    }
                    //5秒等待
                    if (this._firstTime30 == 1) {
                        var time1 = this.getWaitTime(1);
                        if (!this._delayCall5) {
                            game.LogUtil.printNvpuChallenge("\u5F00\u542F" + time1 + "\u79D2\u5012\u8BA1\u65F6");
                            this._delayCall5 = delayCall(Handler.alloc(this, this.delayCall5Func), time1 * 1000);
                        }
                        return;
                    }
                };
                XiuxianNvpuProxy.prototype.delayCall30Func = function () {
                    this._firstTime30 = 1;
                    if (this._delayCall30) {
                        clearDelay(this._delayCall30);
                        this._delayCall30 = null;
                    }
                    var time0 = this.getWaitTime(0);
                    game.LogUtil.printNvpuChallenge("\u7ED3\u675F" + time0 + "\u79D2\u5012\u8BA1\u65F6");
                    this.execAutoEvent();
                };
                XiuxianNvpuProxy.prototype.delayCall5Func = function () {
                    if (this._delayCall5) {
                        clearDelay(this._delayCall5);
                        this._delayCall5 = null;
                    }
                    var time1 = this.getWaitTime(1);
                    game.LogUtil.printNvpuChallenge("\u7ED3\u675F" + time1 + "\u79D2\u5012\u8BA1\u65F6");
                    this.execAutoEvent();
                };
                /**执行副本事件*/
                XiuxianNvpuProxy.prototype.execAutoEvent = function () {
                    //不在主城
                    if (!mod.SceneUtil.isShowMain() || !this._autoChallengeMap) {
                        return;
                    }
                    var list = this.sort_online_list;
                    for (var _i = 0, list_12 = list; _i < list_12.length; _i++) {
                        var type = list_12[_i];
                        if (!this.checkFunOpen(type) || !this._autoChallengeMap.has(type)) {
                            continue;
                        }
                        // //正在挑战的是非限时，这个时候要处理限时的
                        // if (this.isLimitType(type) && this._curExtEventType && !this.isLimitType(this._curExtEventType)) {
                        //     SceneUtil.exitScene();
                        // }
                        game.LogUtil.printNvpuChallenge("\u5F00\u59CB\u5904\u7406\u526F\u672C: " + type);
                        var handler = this._autoChallengeMap.get(type);
                        handler.exec();
                        this.autoChallengeEventType = type;
                        // 新增一个处理，请求挑战副本后，n秒没有进入对应场景的，移除此事件 todo
                        break;
                    }
                };
                //待执行副本没有勾选的，无需开启
                XiuxianNvpuProxy.prototype.checkNotExistEventType = function () {
                    var onlineList = this.online_list;
                    if (onlineList && onlineList.length && this._autoChallengeMap && this._autoChallengeMap.size) {
                        var notExist = true; //没有可执行的
                        for (var _i = 0, onlineList_1 = onlineList; _i < onlineList_1.length; _i++) {
                            var type = onlineList_1[_i];
                            if (this._autoChallengeMap.has(type)) {
                                notExist = false;
                                break;
                            }
                        }
                        return notExist;
                    }
                    return false;
                };
                //对应功能开启否，加多层判断
                XiuxianNvpuProxy.prototype.checkFunOpen = function (type) {
                    var cfg = game.getConfigByNameId("ayah_event_func.json" /* XiuxianNvpuEventFunc */, type);
                    if (!cfg || !cfg.open_func) {
                        return false;
                    }
                    return mod.ViewMgr.getIns().checkViewOpen(cfg.open_func);
                };
                /**
                 * 添加可挑战的副本事件
                 */
                XiuxianNvpuProxy.prototype.addAutoChallengeEvent = function (type, handler) {
                    if (!this._autoChallengeMap) {
                        this._autoChallengeMap = new Map();
                    }
                    this._autoChallengeMap.set(type, handler);
                    //没有正在执行的，马上判断执行
                    if (this.autoChallengeEventType == null) {
                        this.dealAutoEventFunc();
                    }
                    else {
                        //有正在挑战，且是是非限时，待处理是限时的，马上终止当前挑战的
                        if (this.autoChallengeEventType && !this.isLimitType(this.autoChallengeEventType) && this.isLimitType(type)) {
                            mod.SceneUtil.exitScene();
                            this.clearAllCall();
                            this.autoChallengeEventType = null;
                            this.dealAutoEventFunc();
                        }
                    }
                };
                /**
                 * 移除副本事件
                 * @param type 事件类型
                 * @param isReset 当前正在处理类型==type且是特殊情况，马上重置处理下一轮，默认false。一般不需要传，退出副本或者关闭扫荡界面等，会重置处理下一轮。
                 *          比如：正在处理仙侣试炼或仙侣斗法匹配，但是被离婚了，那就马上移除当前事件，开始处理下一轮
                 *               正在处理仙宗封魔，但是被移除仙宗，也是同上处理
                 */
                XiuxianNvpuProxy.prototype.removeAutoChallengeEvent = function (type, isReset) {
                    if (isReset === void 0) { isReset = false; }
                    var exist = false;
                    if (this._autoChallengeMap && this._autoChallengeMap.get(type)) {
                        exist = true;
                        // let handler = this._autoChallengeMap.get(type);
                        // Pool.release(handler);
                        this._autoChallengeMap.delete(type);
                    }
                    if (exist) {
                        if (this.autoChallengeEventType == type && isReset) {
                            //移除的正是当前正在处理的，需要重置继续处理下一轮 todo 正在场景内的不处理
                            this.onUpdateSceneEnter();
                        }
                        var size = this._autoChallengeMap ? this._autoChallengeMap.size : 0;
                        if (!size) {
                            this.clearAllCall();
                            this.autoChallengeEventType = null;
                        }
                    }
                };
                /**判断挂机类型勾选状态*/
                XiuxianNvpuProxy.prototype.isNvpuOnlineSelected = function (eventType) {
                    var onlineList = this.online_list;
                    return onlineList && onlineList.indexOf(eventType) > -1;
                };
                /**修改勾选状态 selected表示勾选状态*/
                XiuxianNvpuProxy.prototype.setNvpuOnlineSetting = function (eventType, selected) {
                    var onlineList = this.online_list.concat();
                    var idx = onlineList.indexOf(eventType);
                    if (idx > -1) {
                        //存在
                        if (!selected) {
                            onlineList.splice(idx, 1);
                            this.c2s_ayah_edit_show(2, onlineList);
                        }
                    }
                    else {
                        //不存在
                        if (selected) {
                            onlineList.push(eventType);
                            this.c2s_ayah_edit_show(2, onlineList);
                        }
                    }
                };
                return XiuxianNvpuProxy;
            }(game.ProxyBase));
            role.XiuxianNvpuProxy = XiuxianNvpuProxy;
            __reflect(XiuxianNvpuProxy.prototype, "game.mod.role.XiuxianNvpuProxy", ["game.mod.IXiuxianNvpuProxy", "base.IProxy"]);
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuBuyView = /** @class */ (function (_super) {
                __extends(XiuxianNvpuBuyView, _super);
                function XiuxianNvpuBuyView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.XiuxianNvpuBuySkin";
                    return _this;
                }
                return XiuxianNvpuBuyView;
            }(eui.Component));
            role.XiuxianNvpuBuyView = XiuxianNvpuBuyView;
            __reflect(XiuxianNvpuBuyView.prototype, "game.mod.role.XiuxianNvpuBuyView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuGiftItem = /** @class */ (function (_super) {
                __extends(XiuxianNvpuGiftItem, _super);
                function XiuxianNvpuGiftItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                XiuxianNvpuGiftItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("06" /* Role */, 258 /* XiuxianNvpu */);
                };
                XiuxianNvpuGiftItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                XiuxianNvpuGiftItem.prototype.dataChanged = function () {
                    var cfg = this.data;
                    if (!cfg) {
                        return;
                    }
                    if (cfg.type == 1) {
                        this._listData.replaceAll(cfg.reward);
                    }
                    else {
                        this._listData.replaceAll(mod.PayUtil.getRewards(cfg.product_id));
                    }
                    var lv = this._proxy.level;
                    var str = game.StringUtil.substitute(game.getLanById("xiuxiannvpu_tips6" /* xiuxiannvpu_tips6 */), [cfg.level]) + game.TextUtil.addColor("(" + lv + "/" + cfg.level + ")", lv >= cfg.level ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(str);
                    //未完成
                    if (cfg.level > lv) {
                        this.img_bought.source = "hongseweiwancheng";
                        this.img_bought.visible = true;
                        this.btn_buy.visible = false;
                        return;
                    }
                    var isBought = this._proxy.isGiftBought(cfg.index);
                    this.img_bought.visible = isBought;
                    this.btn_buy.visible = !isBought;
                    if (!isBought) {
                        if (cfg.type == 2) {
                            var rmb = mod.PayUtil.getRmbValue(cfg.product_id);
                            this.btn_buy.resetCost();
                            this.btn_buy.label = rmb == 0 ? game.getLanById("bosshome_tips5" /* bosshome_tips5 */) : rmb + mod.PayUtil.getRmbUnit();
                            this.btn_buy.setHint(rmb == 0);
                        }
                        else {
                            this.btn_buy.label = '';
                            if (cfg.cost) {
                                this.btn_buy.setCost(cfg.cost);
                                this.btn_buy.setHint(mod.BagUtil.checkPropCnt(cfg.cost[0], cfg.cost[1]));
                            }
                        }
                    }
                };
                XiuxianNvpuGiftItem.prototype.onClick = function () {
                    var cfg = this.data;
                    if (!cfg) {
                        return;
                    }
                    if (cfg.type == 2 && cfg.product_id) {
                        mod.PayUtil.pay(cfg.product_id);
                        return;
                    }
                    var cost = cfg.cost;
                    if (cost && mod.BagUtil.checkPropCntUp(cost[0], cost[1])) {
                        this._proxy.c2s_ayah_buy_gift(cfg.index);
                    }
                };
                return XiuxianNvpuGiftItem;
            }(mod.BaseGiftItemRender));
            role.XiuxianNvpuGiftItem = XiuxianNvpuGiftItem;
            __reflect(XiuxianNvpuGiftItem.prototype, "game.mod.role.XiuxianNvpuGiftItem");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuGrowView = /** @class */ (function (_super) {
                __extends(XiuxianNvpuGrowView, _super);
                function XiuxianNvpuGrowView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.XiuxianNvpuGrowSkin";
                    return _this;
                }
                return XiuxianNvpuGrowView;
            }(eui.Component));
            role.XiuxianNvpuGrowView = XiuxianNvpuGrowView;
            __reflect(XiuxianNvpuGrowView.prototype, "game.mod.role.XiuxianNvpuGrowView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuIcon = /** @class */ (function (_super) {
                __extends(XiuxianNvpuIcon, _super);
                function XiuxianNvpuIcon() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.XiuxianNvpuIconSkin";
                    return _this;
                }
                XiuxianNvpuIcon.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("06" /* Role */, 258 /* XiuxianNvpu */);
                };
                XiuxianNvpuIcon.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                XiuxianNvpuIcon.prototype.dataChanged = function () {
                    var level = this.data;
                    if (!level) {
                        return;
                    }
                    this.likeBtn.data = { showHint: false, level: level };
                    var shenlingCfg = this._proxy.shenlingCfg;
                    if (shenlingCfg) {
                        var iconList = shenlingCfg.icons.split(',');
                        this.img_icon.source = iconList[this.itemIndex];
                    }
                    this.img_huanhua.visible = this._proxy.show_index == level;
                    this.img_lock.visible = level > this._proxy.level;
                };
                return XiuxianNvpuIcon;
            }(mod.BaseListenerRenderer));
            role.XiuxianNvpuIcon = XiuxianNvpuIcon;
            __reflect(XiuxianNvpuIcon.prototype, "game.mod.role.XiuxianNvpuIcon");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuLikeBtn = /** @class */ (function (_super) {
                __extends(XiuxianNvpuLikeBtn, _super);
                function XiuxianNvpuLikeBtn() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.XiuxianNvpuLikeBtnSkin";
                    return _this;
                }
                XiuxianNvpuLikeBtn.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    //this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this., this.onClick, this);
                };
                XiuxianNvpuLikeBtn.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                XiuxianNvpuLikeBtn.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.redPoint.visible = !!data.showHint;
                    this.labelDisplay.text = data.level + '';
                };
                return XiuxianNvpuLikeBtn;
            }(mod.BaseListenerRenderer));
            role.XiuxianNvpuLikeBtn = XiuxianNvpuLikeBtn;
            __reflect(XiuxianNvpuLikeBtn.prototype, "game.mod.role.XiuxianNvpuLikeBtn");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuLikeView = /** @class */ (function (_super) {
                __extends(XiuxianNvpuLikeView, _super);
                function XiuxianNvpuLikeView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.XiuxianNvpuLikeSkin";
                    return _this;
                }
                return XiuxianNvpuLikeView;
            }(eui.Component));
            role.XiuxianNvpuLikeView = XiuxianNvpuLikeView;
            __reflect(XiuxianNvpuLikeView.prototype, "game.mod.role.XiuxianNvpuLikeView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var facade = base.facade;
            var XiuxianNvpuOfflineSettingItem = /** @class */ (function (_super) {
                __extends(XiuxianNvpuOfflineSettingItem, _super);
                function XiuxianNvpuOfflineSettingItem() {
                    var _this = _super.call(this) || this;
                    _this._checkBoxSize = 3;
                    _this.skinName = "skins.role.XiuxianNvpuOfflineSettingItemSkin";
                    return _this;
                }
                XiuxianNvpuOfflineSettingItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("06" /* Role */, 258 /* XiuxianNvpu */);
                    for (var i = 0; i < this._checkBoxSize; i++) {
                        this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this['checkBox' + i], this.onClickCkeckbox, this);
                    }
                };
                XiuxianNvpuOfflineSettingItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                XiuxianNvpuOfflineSettingItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var tiandiCfg = game.getConfigByNameId("tiandi_type.json" /* TiandiType */, data);
                    this.lb_name.text = tiandiCfg.name;
                    var eventList = this._proxy.getTiandiEventList(data);
                    var offlineList = this._proxy.offline_list || [];
                    for (var i = 0; i < this._checkBoxSize; i++) {
                        var checkBox = this['checkBox' + i];
                        if (!checkBox) {
                            continue;
                        }
                        checkBox.visible = i < eventList.length;
                        if (checkBox.visible) {
                            var event = eventList[i];
                            checkBox.label = this._proxy.getEventName(event);
                            checkBox.name = event + '';
                            checkBox.selected = offlineList.indexOf(event) > -1;
                        }
                    }
                };
                //todo
                XiuxianNvpuOfflineSettingItem.prototype.onClickCkeckbox = function (e) {
                    var checkbox = e.target;
                    if (!this._proxy.isTiandiActed(this.data)) {
                        checkbox.selected = false;
                        var tiandiCfg = game.getConfigByNameId("tiandi_type.json" /* TiandiType */, this.data);
                        var str = game.StringUtil.substitute(game.getLanById("xiuxiannvpu_tips13" /* xiuxiannvpu_tips13 */), [tiandiCfg.name]);
                        game.PromptBox.getIns().show(str);
                        return;
                    }
                    if (checkbox.selected) {
                        facade.sendNt("on_xiuxiannvpu_offlineSetting_select" /* ON_XIUXIANNVPU_OFFLINESETTING_SELECT */, +checkbox.name);
                    }
                    else {
                        facade.sendNt("on_xiuxiannvpu_offlineSetting_select_del" /* ON_XIUXIANNVPU_OFFLINESETTING_SELECT_DEL */, +checkbox.name);
                    }
                };
                return XiuxianNvpuOfflineSettingItem;
            }(mod.BaseListenerRenderer));
            role.XiuxianNvpuOfflineSettingItem = XiuxianNvpuOfflineSettingItem;
            __reflect(XiuxianNvpuOfflineSettingItem.prototype, "game.mod.role.XiuxianNvpuOfflineSettingItem");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuOfflineSettingView = /** @class */ (function (_super) {
                __extends(XiuxianNvpuOfflineSettingView, _super);
                function XiuxianNvpuOfflineSettingView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.XiuxianNvpuOfflineSettingSkin";
                    return _this;
                }
                return XiuxianNvpuOfflineSettingView;
            }(eui.Component));
            role.XiuxianNvpuOfflineSettingView = XiuxianNvpuOfflineSettingView;
            __reflect(XiuxianNvpuOfflineSettingView.prototype, "game.mod.role.XiuxianNvpuOfflineSettingView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuOnlineSettingItem = /** @class */ (function (_super) {
                __extends(XiuxianNvpuOnlineSettingItem, _super);
                function XiuxianNvpuOnlineSettingItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.XiuxianNvpuOnlineSettingItemSkin";
                    return _this;
                }
                XiuxianNvpuOnlineSettingItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(data);
                };
                return XiuxianNvpuOnlineSettingItem;
            }(mod.BaseListenerRenderer));
            role.XiuxianNvpuOnlineSettingItem = XiuxianNvpuOnlineSettingItem;
            __reflect(XiuxianNvpuOnlineSettingItem.prototype, "game.mod.role.XiuxianNvpuOnlineSettingItem");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuOnlineSettingView = /** @class */ (function (_super) {
                __extends(XiuxianNvpuOnlineSettingView, _super);
                function XiuxianNvpuOnlineSettingView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.XiuxianNvpuOnlineSettingSkin";
                    return _this;
                }
                return XiuxianNvpuOnlineSettingView;
            }(eui.Component));
            role.XiuxianNvpuOnlineSettingView = XiuxianNvpuOnlineSettingView;
            __reflect(XiuxianNvpuOnlineSettingView.prototype, "game.mod.role.XiuxianNvpuOnlineSettingView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuResultView = /** @class */ (function (_super) {
                __extends(XiuxianNvpuResultView, _super);
                function XiuxianNvpuResultView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.XiuxianNvpuResultSkin";
                    return _this;
                }
                return XiuxianNvpuResultView;
            }(eui.Component));
            role.XiuxianNvpuResultView = XiuxianNvpuResultView;
            __reflect(XiuxianNvpuResultView.prototype, "game.mod.role.XiuxianNvpuResultView");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuBuyMdr = /** @class */ (function (_super) {
                __extends(XiuxianNvpuBuyMdr, _super);
                function XiuxianNvpuBuyMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.XiuxianNvpuBuyView);
                    _this._boughtCache = false; //是否购买，用于跳转界面
                    _this.isEasyHide = true;
                    return _this;
                }
                XiuxianNvpuBuyMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(258 /* XiuxianNvpu */);
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.list_desc.itemRenderer = mod.BaseZhuangshiItem;
                    this._view.list_desc.dataProvider = this._listDesc = new eui.ArrayCollection();
                };
                XiuxianNvpuBuyMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    addEventListener(this._view.img_gotoact, egret.TouchEvent.TOUCH_TAP, this.onClickGotoAct, this);
                    addEventListener(this._view.img_goto, egret.TouchEvent.TOUCH_TAP, this.onClickGoto, this);
                    addEventListener(this._view.btn_buy, egret.TouchEvent.TOUCH_TAP, this.onClickBtnBuy, this);
                    addEventListener(this._view.btn_renewal0, egret.TouchEvent.TOUCH_TAP, this.onClickBtnRenewal0, this);
                    addEventListener(this._view.btn_renewal1, egret.TouchEvent.TOUCH_TAP, this.onClickBtnRenewal1, this);
                    this.onNt("on_xiuxiannvpu_info_update" /* ON_XIUXIANNVPU_INFO_UPDATE */, this.onUpdateInfo, this);
                    this.onNt("on_view_hide" /* ON_VIEW_HIDE */, this.hide, this);
                };
                XiuxianNvpuBuyMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._boughtCache = this._proxy.isBought();
                    this.updateView();
                    this._view.gr_eft.removeChildren();
                    this.addEftByParent("assets/anim/general/general_16/ui_std4_5", this._view.gr_eft, 0, 0, 0, null, 0, 1.3);
                };
                XiuxianNvpuBuyMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._boughtCache = false;
                };
                XiuxianNvpuBuyMdr.prototype.updateView = function () {
                    var rewards = mod.PayUtil.getRewards(201501 /* Id201501 */);
                    this._listData.replaceAll(rewards);
                    var paramCfg = game.GameConfig.getParamConfigById('ayah_word');
                    var desc = paramCfg && paramCfg.value || '';
                    var descList = desc.split(/#n/gi);
                    this._listDesc.replaceAll(descList || []);
                    var paramCfg1 = game.GameConfig.getParamConfigById('ayah_show');
                    var value = paramCfg1 ? paramCfg1.value : [];
                    var power = value[2] || 0;
                    this._view.power.setPowerValue(power);
                    var shenlingCfg = this._proxy.shenlingCfg;
                    // if (shenlingCfg) {
                    //     this._view.nameItem.updateShow(shenlingCfg.name, shenlingCfg.quality);
                    // }
                    //this.addAnimate(shenlingCfg.index, this._view.gr_eft);
                    this.onUpdateInfo();
                };
                XiuxianNvpuBuyMdr.prototype.onUpdateInfo = function () {
                    var isBought = this._proxy.isBought();
                    if (isBought && !this._boughtCache) {
                        this.hide();
                        mod.ViewMgr.getIns().showView("06" /* Role */, "24" /* XiuxianNvpuGrowMain */); //激活后立马跳转到养成界面
                        return;
                    }
                    if (isBought) {
                        this.renewalView();
                    }
                    else {
                        this.buyView();
                    }
                };
                //购买激活界面
                XiuxianNvpuBuyMdr.prototype.buyView = function () {
                    this._view.currentState = 'default';
                    var roleRingProxy = game.getProxy("27" /* Activity */, 212 /* RoleRing */);
                    var isRoleActed = roleRingProxy.isRoleRingAct(); //主角光环是否激活
                    this._view.btn_buy.group_eft.removeChildren();
                    this.addEftByParentScale(this._view.btn_buy.group_eft);
                    var day;
                    if (isRoleActed) {
                        day = this.getRenewalDay(201501 /* Id201501 */);
                        var rmb = mod.PayUtil.getRmbValue(201501 /* Id201501 */);
                        var fakeRmb = mod.PayUtil.getFakeRmbValue(201501 /* Id201501 */);
                        this._view.btn_buy.clearFontPrice();
                        this._view.btn_buy.setTwoPrice(rmb, fakeRmb);
                    }
                    else {
                        day = this.getRenewalDay(201502 /* Id201502 */);
                        this._view.btn_buy.gr_price.visible = false;
                        var rmb = mod.PayUtil.getRmbValue(201502 /* Id201502 */);
                        this._view.btn_buy.setFontPrice(rmb);
                    }
                    var paramCfg = game.GameConfig.getParamConfigById('ayah_show');
                    var value = paramCfg ? paramCfg.value : [];
                    var discount = value[1]; //折扣
                    this.addBmpFont(discount + '折', game.BmpTextCfg[224 /* XiuxianNvpu */], this._view.gr_font);
                    this._view.img_gotoact.visible = !isRoleActed;
                    this.addBmpFont(day + '', game.BmpTextCfg[224 /* XiuxianNvpu */], this._view.gr_font0, true, 1, false, 0, true);
                };
                //续费天数
                XiuxianNvpuBuyMdr.prototype.getRenewalDay = function (productId) {
                    var shopCfg = game.getConfigByNameId("direct_shop.json" /* DirectShop */, 18);
                    if (shopCfg && shopCfg[productId]) {
                        var cfg = shopCfg[productId];
                        return cfg.param1 / game.Second.Day;
                    }
                    return 0;
                };
                //续费界面
                XiuxianNvpuBuyMdr.prototype.renewalView = function () {
                    this._view.currentState = 'bought';
                    var unit = mod.PayUtil.getRmbUnit();
                    var rmb1 = mod.PayUtil.getRmbValue(201501 /* Id201501 */);
                    var day1 = this.getRenewalDay(201501 /* Id201501 */);
                    this._view.btn_renewal0.label = rmb1 + unit + "\u7EED\u8D39" + day1 + "\u5929";
                    var rmb2 = mod.PayUtil.getRmbValue(201503 /* Id201503 */);
                    var day2 = this.getRenewalDay(201503 /* Id201503 */);
                    this._view.btn_renewal1.label = rmb2 + unit + "\u7EED\u8D39" + day2 + "\u5929";
                    this.addBmpFont(this._proxy.day + '', game.BmpTextCfg[224 /* XiuxianNvpu */], this._view.gr_fontday, true, 1, false, 0, true);
                };
                //激活特权
                XiuxianNvpuBuyMdr.prototype.onClickGotoAct = function () {
                    mod.ViewMgr.getIns().showViewByID(38 /* RoleRing */);
                };
                //挂机设置
                XiuxianNvpuBuyMdr.prototype.onClickGoto = function () {
                    mod.ViewMgr.getIns().showView("06" /* Role */, "28" /* XiuxianNvpuOnlineSetting */);
                    this.hide();
                };
                //购买
                XiuxianNvpuBuyMdr.prototype.onClickBtnBuy = function () {
                    var id = 201502 /* Id201502 */;
                    var roleRingProxy = game.getProxy("27" /* Activity */, 212 /* RoleRing */);
                    var isRoleActed = roleRingProxy.isRoleRingAct(); //主角光环是否激活
                    if (isRoleActed) {
                        id = 201501 /* Id201501 */;
                    }
                    mod.PayUtil.pay(id);
                };
                //续费
                XiuxianNvpuBuyMdr.prototype.onClickBtnRenewal0 = function () {
                    mod.PayUtil.pay(201501 /* Id201501 */);
                };
                //续费
                XiuxianNvpuBuyMdr.prototype.onClickBtnRenewal1 = function () {
                    mod.PayUtil.pay(201503 /* Id201503 */);
                };
                return XiuxianNvpuBuyMdr;
            }(game.EffectMdrBase));
            role.XiuxianNvpuBuyMdr = XiuxianNvpuBuyMdr;
            __reflect(XiuxianNvpuBuyMdr.prototype, "game.mod.role.XiuxianNvpuBuyMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuGiftMainMdr = /** @class */ (function (_super) {
                __extends(XiuxianNvpuGiftMainMdr, _super);
                function XiuxianNvpuGiftMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "mubiaofanli_icon",
                            mdr: role.XiuxianNvpuGiftMdr,
                            title: "yuanling_tips5" /* yuanling_tips5 */,
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "24" /* XiuxianNvpuGrowMain */, "01" /* TabBtnType01 */, "01" /* TabBtnType01 */]
                        }
                    ];
                    return _this;
                }
                return XiuxianNvpuGiftMainMdr;
            }(mod.WndBaseMdr));
            role.XiuxianNvpuGiftMainMdr = XiuxianNvpuGiftMainMdr;
            __reflect(XiuxianNvpuGiftMainMdr.prototype, "game.mod.role.XiuxianNvpuGiftMainMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuGiftMdr = /** @class */ (function (_super) {
                __extends(XiuxianNvpuGiftMdr, _super);
                function XiuxianNvpuGiftMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.BaseGiftView);
                    return _this;
                }
                XiuxianNvpuGiftMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(258 /* XiuxianNvpu */);
                    this._view.list.itemRenderer = role.XiuxianNvpuGiftItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.timeItem.visible = this._view.iconBigReward.visible = false;
                    this._view.img_banner.source = game.ResUtil.getUiPng("xiuxiannvpuguanggao");
                };
                XiuxianNvpuGiftMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_xiuxiannvpu_info_update" /* ON_XIUXIANNVPU_INFO_UPDATE */, this.updateView, this);
                };
                XiuxianNvpuGiftMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                XiuxianNvpuGiftMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XiuxianNvpuGiftMdr.prototype.updateView = function () {
                    var cfgList = game.getConfigListByName("ayah_target.json" /* XiuxianNvpuTarget */);
                    this._listData.replaceAll(cfgList);
                };
                return XiuxianNvpuGiftMdr;
            }(game.MdrBase));
            role.XiuxianNvpuGiftMdr = XiuxianNvpuGiftMdr;
            __reflect(XiuxianNvpuGiftMdr.prototype, "game.mod.role.XiuxianNvpuGiftMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuGrowMainMdr = /** @class */ (function (_super) {
                __extends(XiuxianNvpuGrowMainMdr, _super);
                function XiuxianNvpuGrowMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "nvpuyangcheng_icon",
                            mdr: role.XiuxianNvpuGrowMdr,
                            title: "xiuxiannvpu_tips4" /* xiuxiannvpu_tips4 */,
                            bg: "nvpuyangcheng_bg",
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */, "24" /* XiuxianNvpuGrowMain */, "01" /* TabBtnType01 */]
                        }
                    ];
                    return _this;
                }
                return XiuxianNvpuGrowMainMdr;
            }(mod.WndBaseMdr));
            role.XiuxianNvpuGrowMainMdr = XiuxianNvpuGrowMainMdr;
            __reflect(XiuxianNvpuGrowMainMdr.prototype, "game.mod.role.XiuxianNvpuGrowMainMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuGrowMdr = /** @class */ (function (_super) {
                __extends(XiuxianNvpuGrowMdr, _super);
                function XiuxianNvpuGrowMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", role.XiuxianNvpuGrowView);
                    return _this;
                }
                XiuxianNvpuGrowMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(258 /* XiuxianNvpu */);
                    this._view.list.itemRenderer = mod.BaseZhuangshiItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.btn_renewal.setImage('xufei');
                };
                XiuxianNvpuGrowMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_gift, egret.TouchEvent.TOUCH_TAP, this.onClickGift, this);
                    addEventListener(this._view.btn_guaji, egret.TouchEvent.TOUCH_TAP, this.onClickGuaji, this);
                    addEventListener(this._view.btn_like, egret.TouchEvent.TOUCH_TAP, this.onClickLike, this);
                    addEventListener(this._view.btn_offline, egret.TouchEvent.TOUCH_TAP, this.onClickOffline, this);
                    addEventListener(this._view.btn_renewal, egret.TouchEvent.TOUCH_TAP, this.onClickRenewal, this);
                    this.onNt("on_xiuxiannvpu_info_update" /* ON_XIUXIANNVPU_INFO_UPDATE */, this.updateView, this);
                };
                XiuxianNvpuGrowMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                XiuxianNvpuGrowMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this.removeEffect(this._effId);
                    this._effId = null;
                };
                XiuxianNvpuGrowMdr.prototype.updateView = function () {
                    var hourExp = game.GameConfig.getParamConfigById('ayah_exp').value;
                    this._view.lb_desc.textFlow = game.TextUtil.parseHtml(game.getLanById("xiuxiannvpu_tips8" /* xiuxiannvpu_tips8 */) + "\uFF1A" + game.TextUtil.addColor(hourExp, 0x00ff00));
                    if (this._proxy.isMaxLevel()) {
                        this._view.bar.showMax();
                    }
                    else {
                        var nextCfg = game.getConfigByNameId("ayah_level.json" /* XiuxianNvpuLevel */, this._proxy.level + 1);
                        this._view.bar.show(this._proxy.exp, nextCfg.exp, false, this._proxy.level, true, 1 /* Value */);
                    }
                    this.addBmpFont(this._proxy.day + '', game.BmpTextCfg[224 /* XiuxianNvpu */], this._view.gr_day, true, 1, false, 0, true);
                    this._view.btn_like.data = { showHint: false, level: this._proxy.level };
                    this._view.btn_gift.setHint(this._proxy.getGiftHint());
                    this.updateListData();
                    this.updateModel();
                };
                XiuxianNvpuGrowMdr.prototype.updateListData = function () {
                    var level = this._proxy.level;
                    var cfgList = game.getConfigListByName("ayah_level.json" /* XiuxianNvpuLevel */);
                    var strList = [];
                    for (var _i = 0, cfgList_6 = cfgList; _i < cfgList_6.length; _i++) {
                        var cfg = cfgList_6[_i];
                        if (cfg.level > level) {
                            continue;
                        }
                        for (var _a = 0, _b = cfg.event_list; _a < _b.length; _a++) {
                            var id = _b[_a];
                            var cfg_2 = game.getConfigByNameId("ayah_event_func.json" /* XiuxianNvpuEventFunc */, id);
                            if (!cfg_2 || !cfg_2.open_func) {
                                continue;
                            }
                            var funcCfg = game.getConfigByNameId("open_function.json" /* OpenFunction */, cfg_2.open_func);
                            if (funcCfg) {
                                strList.push(game.getLanById("xiuxiannvpu_tips7" /* xiuxiannvpu_tips7 */) + funcCfg.name);
                            }
                        }
                    }
                    this._listData.replaceAll(strList);
                };
                XiuxianNvpuGrowMdr.prototype.updateModel = function () {
                    var showIndex = this._proxy.show_index;
                    var shenlingCfg = this._proxy.shenlingCfg;
                    if (!shenlingCfg) {
                        return;
                    }
                    var name = shenlingCfg.names.split(',')[Math.max(0, showIndex - 1)];
                    this._view.nameItem.updateShow(name, shenlingCfg.quality);
                    var icon = shenlingCfg.icons.split(',')[Math.max(0, showIndex - 1)];
                    var modelUrl = game.ResUtil.getModelUrlByModelName(400 /* Shenling */, icon, 5 /* DOWN */, "std" /* STAND */, true, false);
                    var data = game.ResUtil.getSurfaceData(shenlingCfg.index, 5 /* DOWN */, "std" /* STAND */, true, false);
                    this.removeEffect(this._effId);
                    this._effId = this._effHub.add(modelUrl, 0, 0, null, 0, this._view.gr_model, -1, data && data.scale || 1);
                };
                XiuxianNvpuGrowMdr.prototype.onClickGift = function () {
                    mod.ViewMgr.getIns().showView("06" /* Role */, "25" /* XiuxianNvpuGiftMain */);
                };
                XiuxianNvpuGrowMdr.prototype.onClickGuaji = function () {
                    mod.ViewMgr.getIns().showView("06" /* Role */, "28" /* XiuxianNvpuOnlineSetting */);
                };
                XiuxianNvpuGrowMdr.prototype.onClickLike = function () {
                    mod.ViewMgr.getIns().showSecondPop("06" /* Role */, "26" /* XiuxianNvpuLike */);
                };
                XiuxianNvpuGrowMdr.prototype.onClickOffline = function () {
                    mod.ViewMgr.getIns().showSecondPop("06" /* Role */, "27" /* XiuxianNvpuOfflineSetting */);
                };
                XiuxianNvpuGrowMdr.prototype.onClickRenewal = function () {
                    mod.ViewMgr.getIns().showSecondPop("06" /* Role */, "23" /* XiuxianNvpuBuy */);
                };
                return XiuxianNvpuGrowMdr;
            }(game.EffectMdrBase));
            role.XiuxianNvpuGrowMdr = XiuxianNvpuGrowMdr;
            __reflect(XiuxianNvpuGrowMdr.prototype, "game.mod.role.XiuxianNvpuGrowMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuLikeMdr = /** @class */ (function (_super) {
                __extends(XiuxianNvpuLikeMdr, _super);
                function XiuxianNvpuLikeMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.XiuxianNvpuLikeView);
                    _this._selIdx = 0;
                    _this.isEasyHide = true;
                    return _this;
                }
                XiuxianNvpuLikeMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(258 /* XiuxianNvpu */);
                    this._view.list_btn.itemRenderer = role.XiuxianNvpuIcon;
                    this._view.list_btn.dataProvider = this._listBtn = new eui.ArrayCollection();
                    this._view.list_tequan.itemRenderer = mod.BaseZhuangshiItem;
                    this._view.list_tequan.dataProvider = this._listTequan = new eui.ArrayCollection();
                    this._view.list_arrow.dataProvider = this._listArrow = new eui.ArrayCollection();
                    this._view.secondPop.bgStr = game.ResUtil.getUiJpg('haogandu_bg');
                };
                XiuxianNvpuLikeMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    addEventListener(this._view.btn_huanhua, egret.TouchEvent.TOUCH_TAP, this.onClickBtnHuanhua, this);
                    addEventListener(this._view.list_btn, eui.ItemTapEvent.ITEM_TAP, this.onClickListBtn, this);
                    this.onNt("on_xiuxiannvpu_info_update" /* ON_XIUXIANNVPU_INFO_UPDATE */, this.onUpdateView, this);
                };
                XiuxianNvpuLikeMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                XiuxianNvpuLikeMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selIdx = 0;
                    this.removeEffect(this._effId);
                    this._effId = null;
                };
                XiuxianNvpuLikeMdr.prototype.onUpdateView = function () {
                    this.updateListBtn();
                    this.updateView();
                };
                XiuxianNvpuLikeMdr.prototype.updateView = function () {
                    this._view.btn_huanhua.visible = this._selIdx + 1 <= this._proxy.level && this._selIdx + 1 != this._proxy.show_index;
                    this._view.likeBtn.data = { showHint: false, level: this._selIdx + 1 };
                    this.updateModel();
                    this.updateListTequan();
                };
                XiuxianNvpuLikeMdr.prototype.updateModel = function () {
                    var shenlingCfg = this._proxy.shenlingCfg;
                    this._view.nameItem.updateShow(shenlingCfg.name, shenlingCfg.quality);
                    var icon = shenlingCfg.icons.split(',')[this._selIdx];
                    var modelUrl = game.ResUtil.getModelUrlByModelName(400 /* Shenling */, icon, 5 /* DOWN */, "std" /* STAND */, true, false);
                    var data = game.ResUtil.getSurfaceData(this._proxy.shenlingId, 5 /* DOWN */, "std" /* STAND */, true, false);
                    this.removeEffect(this._effId);
                    this._effId = this._effHub.add(modelUrl, 0, 0, null, 0, this._view.gr_eft, -1, data && data.scale || 1);
                };
                XiuxianNvpuLikeMdr.prototype.updateListBtn = function () {
                    var list = [];
                    var cfgList = game.getConfigListByName("ayah_level.json" /* XiuxianNvpuLevel */);
                    for (var _i = 0, cfgList_7 = cfgList; _i < cfgList_7.length; _i++) {
                        var cfg = cfgList_7[_i];
                        list.push(cfg.level);
                    }
                    this._listBtn.replaceAll(list);
                    this._view.list_btn.selectedIndex = this._selIdx;
                    var arrowAry = [];
                    arrowAry.length = list.length - 1;
                    this._listArrow.replaceAll(arrowAry);
                };
                XiuxianNvpuLikeMdr.prototype.updateListTequan = function () {
                    var cfg = game.getConfigByNameId("ayah_level.json" /* XiuxianNvpuLevel */, this._selIdx + 1);
                    var list = [];
                    if (cfg && cfg.event_list) {
                        for (var _i = 0, _a = cfg.event_list; _i < _a.length; _i++) {
                            var id = _a[_i];
                            var eventFuncCfg = game.getConfigByNameId("ayah_event_func.json" /* XiuxianNvpuEventFunc */, id);
                            if (!eventFuncCfg || !eventFuncCfg.open_func) {
                                continue;
                            }
                            var funcCfg = game.getConfigByNameId("open_function.json" /* OpenFunction */, eventFuncCfg.open_func);
                            if (funcCfg) {
                                list.push(game.getLanById("advent_god_cue8" /* advent_god_cue8 */) + game.getLanById("xiuxiannvpu_tips7" /* xiuxiannvpu_tips7 */) + funcCfg.name);
                            }
                        }
                    }
                    this._listTequan.replaceAll(list);
                };
                //todo
                XiuxianNvpuLikeMdr.prototype.onClickBtnHuanhua = function () {
                    this._proxy.c2s_ayah_apparent(this._selIdx + 1);
                };
                XiuxianNvpuLikeMdr.prototype.onClickListBtn = function (e) {
                    var itemIdx = e.itemIndex;
                    if (itemIdx == this._selIdx) {
                        return;
                    }
                    this._selIdx = itemIdx;
                    this.updateView();
                    this._view.scroller.viewport.scrollV = 0;
                };
                return XiuxianNvpuLikeMdr;
            }(game.EffectMdrBase));
            role.XiuxianNvpuLikeMdr = XiuxianNvpuLikeMdr;
            __reflect(XiuxianNvpuLikeMdr.prototype, "game.mod.role.XiuxianNvpuLikeMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuOfflineSettingMdr = /** @class */ (function (_super) {
                __extends(XiuxianNvpuOfflineSettingMdr, _super);
                function XiuxianNvpuOfflineSettingMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.XiuxianNvpuOfflineSettingView);
                    _this._eventTypes = [];
                    _this.isEasyHide = true;
                    return _this;
                }
                XiuxianNvpuOfflineSettingMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(258 /* XiuxianNvpu */);
                    this._view.list.itemRenderer = role.XiuxianNvpuOfflineSettingItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                XiuxianNvpuOfflineSettingMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_rule, egret.TouchEvent.TOUCH_TAP, this.onClickRule, this);
                    addEventListener(this._view.btn_goto, egret.TouchEvent.TOUCH_TAP, this.onClickGoto, this);
                    addEventListener(this._view.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide, this);
                    this.onNt("on_xiuxiannvpu_offlineSetting_select" /* ON_XIUXIANNVPU_OFFLINESETTING_SELECT */, this.onUpdateCheckboxSelected, this);
                    this.onNt("on_xiuxiannvpu_offlineSetting_select_del" /* ON_XIUXIANNVPU_OFFLINESETTING_SELECT_DEL */, this.onUpdateCheckboxSelectedDel, this);
                };
                XiuxianNvpuOfflineSettingMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._eventTypes = this._proxy.offline_list.concat();
                    this.updateView();
                };
                XiuxianNvpuOfflineSettingMdr.prototype.onHide = function () {
                    this.confirmEditCheckbox();
                    _super.prototype.onHide.call(this);
                };
                XiuxianNvpuOfflineSettingMdr.prototype.updateView = function () {
                    var tiandiList = this._proxy.getTiandiList();
                    this._listData.replaceAll(tiandiList);
                    var isAllActed = true;
                    var godProxy = game.getProxy("60" /* God */, 232 /* God */);
                    for (var _i = 0, tiandiList_1 = tiandiList; _i < tiandiList_1.length; _i++) {
                        var type = tiandiList_1[_i];
                        if (!godProxy.getActivate(type)) {
                            isAllActed = false;
                            break;
                        }
                    }
                    this._view.lb_acted.visible = isAllActed;
                    this._view.btn_goto.visible = !isAllActed;
                };
                XiuxianNvpuOfflineSettingMdr.prototype.onClickRule = function () {
                    mod.ViewMgr.getIns().showRuleTips(game.getLanById("xiuxiannvpu_tips2" /* xiuxiannvpu_tips2 */));
                };
                XiuxianNvpuOfflineSettingMdr.prototype.onClickGoto = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670200 /* Tiandilu */, true)) {
                        return;
                    }
                    if (!mod.RoleUtil.isRoleRingAct()) {
                        game.PromptBox.getIns().show("未激活主角光环");
                        return;
                    }
                    mod.ViewMgr.getIns().showView("60" /* God */, "01" /* GodMain */, "02" /* TabBtnType02 */);
                    this.hide();
                };
                //最终确定勾选框
                XiuxianNvpuOfflineSettingMdr.prototype.confirmEditCheckbox = function () {
                    var eventTypes = this._eventTypes || [];
                    var offlineList = this._proxy.offline_list;
                    if (eventTypes.length != offlineList.length) {
                        this._proxy.c2s_ayah_edit_show(1, this._eventTypes);
                        return;
                    }
                    var map = {};
                    for (var _i = 0, offlineList_1 = offlineList; _i < offlineList_1.length; _i++) {
                        var type = offlineList_1[_i];
                        map[type] = true;
                    }
                    var isSame = true;
                    for (var _a = 0, _b = this._eventTypes; _a < _b.length; _a++) {
                        var type = _b[_a];
                        if (!map[type]) {
                            isSame = false; //有一个不同
                            break;
                        }
                    }
                    if (!isSame) {
                        this._proxy.c2s_ayah_edit_show(1, this._eventTypes);
                    }
                };
                XiuxianNvpuOfflineSettingMdr.prototype.onUpdateCheckboxSelected = function (n) {
                    var eventType = n.body;
                    if (this._eventTypes.indexOf(eventType) < 0) {
                        this._eventTypes.push(eventType);
                    }
                };
                XiuxianNvpuOfflineSettingMdr.prototype.onUpdateCheckboxSelectedDel = function (n) {
                    var eventType = n.body;
                    var idx = this._eventTypes.indexOf(eventType);
                    if (idx > -1) {
                        this._eventTypes.splice(idx, 1);
                    }
                };
                return XiuxianNvpuOfflineSettingMdr;
            }(game.MdrBase));
            role.XiuxianNvpuOfflineSettingMdr = XiuxianNvpuOfflineSettingMdr;
            __reflect(XiuxianNvpuOfflineSettingMdr.prototype, "game.mod.role.XiuxianNvpuOfflineSettingMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var TimeMgr = base.TimeMgr;
            var XiuxianNvpuOnlineSettingMdr = /** @class */ (function (_super) {
                __extends(XiuxianNvpuOnlineSettingMdr, _super);
                function XiuxianNvpuOnlineSettingMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.XiuxianNvpuOnlineSettingView);
                    _this._checkBoxList = [];
                    _this._eventTypes = []; //当前勾选的
                    _this._initEventTypes = []; //全部的
                    _this._confirmEditTime = 5; //点击勾选后有一定延迟时间供玩家确认修改，不用频繁发送协议
                    _this._isClickCheckBox = false;
                    //todo
                    _this.map = {
                        1450000003: 'online_gain',
                        1450000001: 'online_yuenbo',
                        1450000006: '',
                        1450000008: 'online_xianqi'
                    };
                    _this.isEasyHide = true;
                    return _this;
                }
                XiuxianNvpuOnlineSettingMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(258 /* XiuxianNvpu */);
                    this._mainProxy = game.getProxy("05" /* Main */, 3 /* Main */);
                    this._passProxy = game.getProxy("42" /* Pass */, 9 /* Pass */);
                    this._view.list0.itemRenderer = role.XiuxianNvpuOnlineSettingItem;
                    this._view.list0.dataProvider = this._listData0 = new eui.ArrayCollection();
                    this._view.list1.itemRenderer = role.XiuxianNvpuOnlineSettingItem;
                    this._view.list1.dataProvider = this._listData1 = new eui.ArrayCollection();
                    this._view.list2.itemRenderer = role.XiuxianNvpuOnlineSettingItem;
                    this._view.list2.dataProvider = this._listData2 = new eui.ArrayCollection();
                    this._view.btn_receive.setImage('lingquguaji');
                    // this._view.img_bg.source = ResUtil.getUiJpg('xiuxiannvpu_guajishezhi_bg');
                };
                XiuxianNvpuOnlineSettingMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.checkBoxAll, egret.TouchEvent.TOUCH_TAP, this.onClickCheckboxAll, this);
                    addEventListener(this._view.lb_checkBoxAll, egret.TouchEvent.TOUCH_TAP, this.onClickCheckboxAllLab, this);
                    addEventListener(this._view.btn_act0, egret.TouchEvent.TOUCH_TAP, this.onClickBtnAct0, this);
                    addEventListener(this._view.btn_act1, egret.TouchEvent.TOUCH_TAP, this.onClickBtnAct1, this);
                    addEventListener(this._view.btn_receive, egret.TouchEvent.TOUCH_TAP, this.onClickBtnReceive, this);
                    addEventListener(this._view.btn_back, egret.TouchEvent.TOUCH_TAP, this.onClickBack, this);
                    this.onNt("on_xiuxiannvpu_info_update" /* ON_XIUXIANNVPU_INFO_UPDATE */, this.onUpdateView, this);
                    this.onNt("update_offline" /* UPDATE_OFFLINE */, this.updateList1, this);
                };
                XiuxianNvpuOnlineSettingMdr.prototype.onClickBack = function () {
                    mod.ViewMgr.getIns().back();
                };
                XiuxianNvpuOnlineSettingMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._mainProxy.c2s_hangup_get_rwd(1);
                    this.onUpdateView();
                };
                XiuxianNvpuOnlineSettingMdr.prototype.onHide = function () {
                    var _this = this;
                    this.confirmEdit();
                    _super.prototype.onHide.call(this);
                    this._checkBoxList.forEach(function (item) {
                        item.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickCheckBox, _this);
                        game.DisplayUtils.UnParent(item);
                    });
                    this._checkBoxList = [];
                    this._view.gr_checkbox.removeChildren();
                    this._eventTypes = [];
                    this._initEventTypes = [];
                    this._confirmEditTime = 5;
                    this._isClickCheckBox = false;
                };
                XiuxianNvpuOnlineSettingMdr.prototype.onUpdateView = function () {
                    this.updateView();
                    this.onUpdateReceive();
                };
                XiuxianNvpuOnlineSettingMdr.prototype.updateView = function () {
                    var shenlingCfg = this._proxy.shenlingCfg;
                    if (shenlingCfg) {
                        this._view.lb_title.text = shenlingCfg.name + game.getLanById("shouyi_tips" /* shouyi_tips */);
                    }
                    this.updateCheckBoxList();
                    this.updateList0();
                    this.updateList1();
                    this.updateList2();
                };
                //更新勾选框
                XiuxianNvpuOnlineSettingMdr.prototype.updateCheckBoxList = function () {
                    this._initEventTypes = [];
                    this._eventTypes = this._proxy.online_list.concat();
                    var curLevel = this._proxy.level;
                    var cfgList = game.getConfigListByName("ayah_level.json" /* XiuxianNvpuLevel */);
                    this._view.gr_checkbox.removeChildren();
                    for (var _i = 0, cfgList_8 = cfgList; _i < cfgList_8.length; _i++) {
                        var cfg = cfgList_8[_i];
                        if (cfg.level > curLevel) {
                            continue;
                        }
                        var eventList = cfg.event_list || [];
                        this._initEventTypes = this._initEventTypes.concat(eventList);
                        for (var _a = 0, eventList_1 = eventList; _a < eventList_1.length; _a++) {
                            var event = eventList_1[_a];
                            var check = new eui.CheckBox();
                            check.skinName = "skins.role.XiuxianNvpuOnlineCheckBoxSkin";
                            check.label = '自动挂机' + this._proxy.getEventName(event);
                            check.name = event + ''; //事件类型，用于事件抛出
                            check.selected = this._eventTypes.indexOf(+event) > -1;
                            check.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCheckBox, this);
                            this._checkBoxList.push(check);
                            this._view.gr_checkbox.addChild(check);
                        }
                    }
                    //全选框勾选状态
                    this._view.checkBoxAll.selected = this._initEventTypes.length == this._eventTypes.length;
                };
                XiuxianNvpuOnlineSettingMdr.prototype.updateList0 = function () {
                    var strList = [];
                    var gateCfg = game.getConfigByNameId("gate1.json" /* Gate */, this._passProxy.curIndex);
                    if (gateCfg && gateCfg.drop_show) {
                        for (var _i = 0, _a = gateCfg.drop_show; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (item[0] == 1450000006 /* Mucai */) {
                                continue;
                            }
                            var propCfg = game.getConfigById(item[0]);
                            if (!propCfg) {
                                continue;
                            }
                            var head = game.PropData.getPropParse(item[0], 1 /* Type */);
                            var key = this.map[item[0]];
                            var privilegeVal = '';
                            var name = propCfg.name;
                            if (head == 290 /* Equip */) {
                                name = '装备';
                            }
                            else {
                                var val = key ? mod.RoleUtil.getPrivilegeValue(key) : 0;
                                privilegeVal = '(+' + Math.floor(val / 100) + '%)';
                            }
                            strList.push(name + ' ' + item[1] + '/小时' + game.TextUtil.addColor(privilegeVal, 8585074 /* GREEN */));
                        }
                    }
                    this._listData0.replaceAll(strList);
                };
                XiuxianNvpuOnlineSettingMdr.prototype.updateList1 = function () {
                    var strList = [];
                    var rewards = this._mainProxy.rewards || [];
                    for (var _i = 0, rewards_1 = rewards; _i < rewards_1.length; _i++) {
                        var item = rewards_1[_i];
                        if (item) {
                            var propCfg = game.GameConfig.getPropConfigById(item.idx.toNumber());
                            if (propCfg) {
                                strList.push(propCfg.name + ' ' + item.cnt);
                            }
                        }
                    }
                    this._listData1.replaceAll(strList);
                    var roleRingProxy = game.getProxy("27" /* Activity */, 212 /* RoleRing */);
                    var isRoleActed = roleRingProxy.isRoleRingAct(); //主角光环是否激活
                    this._view.img_acted0.visible = isRoleActed;
                    this._view.btn_act0.visible = !isRoleActed;
                };
                XiuxianNvpuOnlineSettingMdr.prototype.updateList2 = function () {
                    var strList = [];
                    for (var _i = 0, _a = this._initEventTypes; _i < _a.length; _i++) {
                        var event = _a[_i];
                        var name = this._proxy.getEventName(event);
                        var cnt = this._proxy.getEventCnt(event);
                        strList.push(name + ': ' + game.TextUtil.addColor(cnt + '', 8585074 /* GREEN */));
                    }
                    this._listData2.replaceAll(strList);
                    var isActed = this._proxy.isBought();
                    this._view.img_acted1.visible = isActed;
                    this._view.btn_act1.visible = !isActed;
                };
                XiuxianNvpuOnlineSettingMdr.prototype.onClickCheckboxAll = function () {
                    this._confirmEditTime = 5; //reset
                    this._isClickCheckBox = true;
                    var selected = this._view.checkBoxAll.selected;
                    if (selected) {
                        this._eventTypes = this._initEventTypes.concat();
                    }
                    else {
                        this._eventTypes = [];
                    }
                    var size = this._view.gr_checkbox.numChildren;
                    for (var i = 0; i < size; i++) {
                        var checkBox = this._view.gr_checkbox.getChildAt(i);
                        if (checkBox) {
                            checkBox.selected = selected;
                        }
                    }
                };
                XiuxianNvpuOnlineSettingMdr.prototype.onClickCheckboxAllLab = function () {
                    this._view.checkBoxAll.selected = !this._view.checkBoxAll.selected;
                    this.onClickCheckboxAll();
                };
                XiuxianNvpuOnlineSettingMdr.prototype.onClickCheckBox = function (e) {
                    this._confirmEditTime = 5; //reset
                    this._isClickCheckBox = true;
                    var checkBox = e.target;
                    var selected = checkBox.selected;
                    var type = +checkBox.name;
                    var idx = this._eventTypes.indexOf(type);
                    if (selected) {
                        if (idx < 0) {
                            this._eventTypes.push(type);
                        }
                    }
                    else {
                        if (idx > -1) {
                            this._eventTypes.splice(idx, 1);
                        }
                    }
                    //更新全选按钮
                    this._view.checkBoxAll.selected = this._eventTypes.length == this._initEventTypes.length;
                };
                //激活主角光环
                XiuxianNvpuOnlineSettingMdr.prototype.onClickBtnAct0 = function () {
                    mod.ViewMgr.getIns().showViewByID(38 /* RoleRing */);
                    this.hide();
                };
                //激活修仙女仆
                XiuxianNvpuOnlineSettingMdr.prototype.onClickBtnAct1 = function () {
                    mod.ViewMgr.getIns().showSecondPop("06" /* Role */, "23" /* XiuxianNvpuBuy */);
                    this.hide();
                };
                XiuxianNvpuOnlineSettingMdr.prototype.onClickBtnReceive = function () {
                    this.confirmEdit(); //点击领取前，先判断是否操作过勾选框，若是则要马上发送一次
                    this._proxy.c2s_ayah_get_reward(1);
                };
                XiuxianNvpuOnlineSettingMdr.prototype.onUpdateReceive = function () {
                    if (TimeMgr.hasUpdateItem(this)) {
                        return;
                    }
                    this.update(TimeMgr.time);
                    TimeMgr.addUpdateItem(this, 1000);
                };
                //最终确定勾选框
                XiuxianNvpuOnlineSettingMdr.prototype.confirmEdit = function () {
                    if (!this._isClickCheckBox) {
                        return;
                    }
                    this._isClickCheckBox = false;
                    var onlineList = this._proxy.online_list.concat();
                    var curList = this._eventTypes.concat() || [];
                    if (onlineList.length != curList.length) {
                        this._proxy.c2s_ayah_edit_show(2, curList);
                        return;
                    }
                    var map = {};
                    for (var _i = 0, onlineList_2 = onlineList; _i < onlineList_2.length; _i++) {
                        var type = onlineList_2[_i];
                        map[type] = true;
                    }
                    var isSame = true;
                    for (var _a = 0, curList_1 = curList; _a < curList_1.length; _a++) {
                        var type = curList_1[_a];
                        if (!map[type]) {
                            isSame = false; //有一个不同
                            break;
                        }
                    }
                    if (!isSame) {
                        this._proxy.c2s_ayah_edit_show(2, curList);
                    }
                };
                XiuxianNvpuOnlineSettingMdr.prototype.update = function (time) {
                    this._confirmEditTime--;
                    if (this._confirmEditTime <= 0 && this._isClickCheckBox) {
                        this.confirmEdit();
                    }
                    var timeNum = this._mainProxy.offlineTotalTime;
                    var time1 = timeNum > this._mainProxy.offlineMaxtime ? this._mainProxy.offlineMaxtime : timeNum;
                    if (time1 < 0) {
                        return;
                    }
                    this._view.lb_time.textFlow = game.TextUtil.parseHtml("累计挂机 " + game.TimeUtil.formatSecond(time1, "HH:mm:ss"));
                };
                return XiuxianNvpuOnlineSettingMdr;
            }(game.MdrBase));
            role.XiuxianNvpuOnlineSettingMdr = XiuxianNvpuOnlineSettingMdr;
            __reflect(XiuxianNvpuOnlineSettingMdr.prototype, "game.mod.role.XiuxianNvpuOnlineSettingMdr", ["base.UpdateItem"]);
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var role;
        (function (role) {
            var XiuxianNvpuResultMdr = /** @class */ (function (_super) {
                __extends(XiuxianNvpuResultMdr, _super);
                function XiuxianNvpuResultMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", role.XiuxianNvpuResultView);
                    /**1.在线领取2.离线领取*/
                    _this._operType = 1;
                    _this.isEasyHide = true;
                    return _this;
                }
                XiuxianNvpuResultMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(258 /* XiuxianNvpu */);
                    this._view.list.itemRenderer = mod.BaseZhuangshiItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                XiuxianNvpuResultMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_do, egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                XiuxianNvpuResultMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._operType = this._showArgs;
                    this.updateView();
                };
                XiuxianNvpuResultMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                XiuxianNvpuResultMdr.prototype.updateView = function () {
                    var strList = [];
                    var list = this._proxy.reward_list;
                    for (var _i = 0, list_13 = list; _i < list_13.length; _i++) {
                        var item = list_13[_i];
                        var eventCfg = game.getConfigByNameId("ayah_event_func.json" /* XiuxianNvpuEventFunc */, item.type);
                        if (eventCfg && eventCfg.open_func) {
                            var funcCfg = game.getConfigByNameId("open_function.json" /* OpenFunction */, eventCfg.open_func);
                            if (!funcCfg) {
                                continue;
                            }
                            strList.push(game.getLanById("xiuxiannvpu_tips7" /* xiuxiannvpu_tips7 */) + (funcCfg.name + ": " + item.count + "\u6B21"));
                        }
                    }
                    this._listData.replaceAll(strList);
                };
                XiuxianNvpuResultMdr.prototype.onClick = function () {
                    this._proxy.c2s_ayah_get_reward(this._operType);
                    this.hide(); //todo
                };
                return XiuxianNvpuResultMdr;
            }(game.MdrBase));
            role.XiuxianNvpuResultMdr = XiuxianNvpuResultMdr;
            __reflect(XiuxianNvpuResultMdr.prototype, "game.mod.role.XiuxianNvpuResultMdr");
        })(role = mod.role || (mod.role = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=role.js.map