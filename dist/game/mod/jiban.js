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
        var jiban;
        (function (jiban) {
            var ItemTapEvent = eui.ItemTapEvent;
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var ArrayCollection = eui.ArrayCollection;
            var JibanBaseMdr = /** @class */ (function (_super) {
                __extends(JibanBaseMdr, _super);
                function JibanBaseMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", jiban.JibanBaseView);
                    _this._maxCnt = 6;
                    _this._headType = 360 /* Horse */; //子类重写
                    return _this;
                }
                JibanBaseMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                    this._jProxy = this.retProxy(191 /* Jiban */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = jiban.JibanBaseRender;
                    this._view.list_item.dataProvider = this._itemList;
                };
                JibanBaseMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
                    addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePower, this);
                    this.onNt("surface_info_update" /* SURFACE_INFO_UPDATE */, this.onInfoUpdate, this);
                    this.onNt("surface_jiban_info_update" /* SURFACE_JIBAN_INFO_UPDATE */, this.onInfoUpdate, this);
                };
                JibanBaseMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.updateItemList();
                };
                JibanBaseMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                JibanBaseMdr.prototype.onClickItem = function (e) {
                    var index = e.itemIndex;
                    if (index == this._selIndex) {
                        return;
                    }
                    this._selIndex = index;
                    this.indexUpdateInfo();
                };
                /**重载，激活整套羁绊*/
                JibanBaseMdr.prototype.onClickAct = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    if (!this._canAct) {
                        game.PromptBox.getIns().show(game.getLanById("jiban_tips1" /* jiban_tips1 */));
                        return;
                    }
                    this._proxy.c2s_ride_oper_jiban(this._headType, this._selCfg.index);
                };
                JibanBaseMdr.prototype.onInfoUpdate = function (n) {
                    var headType = n.body;
                    if (headType == this._headType) {
                        this.updateItemListHint();
                        this.updateModel();
                        this.updateAct();
                    }
                };
                JibanBaseMdr.prototype.initShow = function () {
                    this._selIndex = 0;
                    this._curStar = 0;
                    this._view.img_icon.source = "jiban_icon_" + this._headType;
                };
                JibanBaseMdr.prototype.updateItemList = function () {
                    var items = this.getJibanCfgList();
                    this._itemList.source = items;
                    this._view.list_item.selectedIndex = this._selIndex;
                    this.indexUpdateInfo();
                };
                JibanBaseMdr.prototype.updateItemListHint = function () {
                    var items = this.getJibanCfgList();
                    this._itemList.replaceAll(items);
                };
                JibanBaseMdr.prototype.indexUpdateInfo = function () {
                    var items = this.getJibanCfgList();
                    this._selCfg = items[this._selIndex].cfg;
                    this._proxy.selJibanCfg = this._selCfg;
                    if (!this._selCfg) {
                        return;
                    }
                    this.updatePower();
                    this.updateShow();
                    this.updateModel();
                    this.updateNameItem();
                    this.updateAct();
                };
                /**更新战力*/
                JibanBaseMdr.prototype.updatePower = function () {
                    var attr = mod.RoleUtil.getAttr(this._selCfg.property);
                    var power = attr && attr.showpower ? attr.showpower : 0;
                    this._view.power.setPowerValue(power);
                    var god = attr && attr.god ? attr.god : 0;
                    this._view.god_item.updateGod(god);
                };
                JibanBaseMdr.prototype.updateShow = function () {
                    var pos = this._selIndex + 1;
                    this._view.img_name.source = "jiban_name_" + this._headType + "_" + pos;
                    this._view.img_eff.source = "jiban_" + this._headType + "_" + pos;
                };
                JibanBaseMdr.prototype.updateModel = function () {
                    var infos = this._selCfg.partners;
                    this._curStar = 0;
                    for (var i = 0; i < this._maxCnt; ++i) {
                        var item = this._view["item" + i];
                        item.visible = i <= infos.length - 1;
                        if (item.visible) {
                            var index = infos[i];
                            var itemData = {
                                headType: this._headType,
                                cfg: game.getConfigById(index),
                                jibanCfg: this._selCfg,
                                isActed: this._proxy.isJibanItemAct(this._headType, this._selCfg.index, index),
                                showHint: this._proxy.canJibanItemAct(this._headType, this._selCfg, index)
                            };
                            item.data = itemData;
                            var star = this.getStar(index);
                            this._curStar += Math.min(star, 1);
                        }
                    }
                    this._view.currentState = infos.length + "";
                    this._view.img_item.source = "surface_" + this._headType + "_" + this._selCfg.index;
                    this._maxStar = infos.length;
                };
                JibanBaseMdr.prototype.updateNameItem = function () {
                    //let cfg: HorseConfig = getConfigById(this._selCfg.partners[this._selCfg.partners.length - 1]);
                    this._view.name_item.updateShow(this._selCfg.name, this._selCfg.quality);
                };
                JibanBaseMdr.prototype.getStar = function (index) {
                    return this._proxy.getSurfacePerStar(index);
                };
                JibanBaseMdr.prototype.getAct = function (index) {
                    return this._proxy.isJibanAct(this._headType, index);
                };
                /**羁绊icon数据*/
                JibanBaseMdr.prototype.getJibanCfgList = function () {
                    var cfgList = this._proxy.getJibanCfgList(this._headType);
                    var list = [];
                    for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                        var cfg = cfgList_1[_i];
                        list.push({
                            cfg: cfg,
                            isActed: this._proxy.isJibanAct(this._headType, cfg.index),
                            showHint: this._proxy.canJibanSysAct(this._headType, cfg)
                        });
                    }
                    return list;
                };
                /**更新激活条件和激活状态*/
                JibanBaseMdr.prototype.updateAct = function () {
                    var index = this._selCfg.index;
                    var isAct = this.getAct(index);
                    this._view.btn_act.visible = this._view.lab_tips.visible = !isAct;
                    this._view.img_act.visible = isAct;
                    if (!isAct) {
                        this._canAct = this._proxy.canJibanAct(this._headType, this._selCfg);
                        this._view.btn_act.redPoint.visible = this._canAct;
                        var tipsStr = "[" + this._selCfg.name + "]" + game.getLanById("jiban_tips2" /* jiban_tips2 */);
                        tipsStr += game.TextUtil.addColor("(" + this._curStar + "/" + this._maxStar + ")", this._curStar >= this._maxStar ? 2330156 /* GREEN */ : 16719376 /* RED */);
                        this._view.lab_tips.textFlow = game.TextUtil.parseHtml(tipsStr);
                    }
                };
                return JibanBaseMdr;
            }(game.MdrBase));
            jiban.JibanBaseMdr = JibanBaseMdr;
            __reflect(JibanBaseMdr.prototype, "game.mod.jiban.JibanBaseMdr");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var ShenLingJiBanAwardItem = /** @class */ (function (_super) {
                __extends(ShenLingJiBanAwardItem, _super);
                function ShenLingJiBanAwardItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ShenLingJiBanAwardItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._listData = new eui.ArrayCollection();
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_get, this.onClick, this);
                };
                ShenLingJiBanAwardItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this._listData.removeAll();
                };
                ShenLingJiBanAwardItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.btn_get.visible = data.status == 1;
                    this.btn_get.visible && this.btn_get.setHint(true);
                    this.img_statue.visible = !this.btn_get.visible;
                    this.img_statue.source = data.status == 0 ? 'hongseweiwancheng' : 'lvseyilingqu';
                    var str = game.TextUtil.addColor("(" + data.jiBanLv + "/" + (this.itemIndex + 1) + ")", data.jiBanLv >= this.itemIndex + 1 ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this.lb_cond.textFlow = game.TextUtil.parseHtml(str);
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(game.StringUtil.substitute(game.getLanById("shenling_tips6" /* shenling_tips6 */), [game.TextUtil.addColor((this.itemIndex + 1) + '', 2330156 /* GREEN */)]));
                    this._listData.replaceAll(data.cfg.prop);
                };
                ShenLingJiBanAwardItem.prototype.onClick = function () {
                    var data = this.data;
                    if (data.status == 1) {
                        this._proxy.c2s_god_brother_groupup(data.index, [this.itemIndex + 1], null);
                    }
                };
                return ShenLingJiBanAwardItem;
            }(mod.BaseListenerRenderer));
            jiban.ShenLingJiBanAwardItem = ShenLingJiBanAwardItem;
            __reflect(ShenLingJiBanAwardItem.prototype, "game.mod.jiban.ShenLingJiBanAwardItem");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var JibanProxy = /** @class */ (function (_super) {
                __extends(JibanProxy, _super);
                function JibanProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                JibanProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new jiban.JibanModel();
                    //this.onProto(s2c_spirit_pet_array_info, this.setMatrixInfo, this);
                };
                Object.defineProperty(JibanProxy.prototype, "headType", {
                    // private s2c_faerie_info(n: GameNT) {
                    //     let msg: s2c_faerie_info = n.body;
                    // }
                    // public c2s_faerie_info() {
                    //     let msg = new c2s_faerie_info();
                    //     this.sendProto(msg);
                    // }
                    get: function () {
                        return this._model.headType;
                    },
                    set: function (index) {
                        this._model.headType = index;
                    },
                    enumerable: true,
                    configurable: true
                });
                return JibanProxy;
            }(game.ProxyBase));
            jiban.JibanProxy = JibanProxy;
            __reflect(JibanProxy.prototype, "game.mod.jiban.JibanProxy");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var ShoujiHuanhuaModel = /** @class */ (function () {
                function ShoujiHuanhuaModel() {
                    //幻化
                    this.huanhua_map = {};
                    //收集
                    this.equip_map = {};
                }
                return ShoujiHuanhuaModel;
            }());
            jiban.ShoujiHuanhuaModel = ShoujiHuanhuaModel;
            __reflect(ShoujiHuanhuaModel.prototype, "game.mod.jiban.ShoujiHuanhuaModel");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var c2s_huanhua_act = msg.c2s_huanhua_act;
            var s2c_huanhua_get_list = msg.s2c_huanhua_get_list;
            var c2s_equip_gather_act = msg.c2s_equip_gather_act;
            var s2c_equip_gather_get_list = msg.s2c_equip_gather_get_list;
            /**
             * @description 角色面板的收集和幻化系统
             */
            var ShoujiHuanhuaProxy = /** @class */ (function (_super) {
                __extends(ShoujiHuanhuaProxy, _super);
                function ShoujiHuanhuaProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.headTypes = [405 /* Body */, 403 /* Weapon */, 404 /* Wing */];
                    _this._actJibanMap = {}; //激活的外显
                    _this._actJibanEquipMap = {};
                    //转生对应的index
                    _this._rebirthIdxMap = {};
                    /**进度条收集阶段*/
                    _this.partMap = {};
                    return _this;
                }
                Object.defineProperty(ShoujiHuanhuaProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                ShoujiHuanhuaProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    this._actJibanMap = {};
                    this._actJibanEquipMap = {};
                };
                ShoujiHuanhuaProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new jiban.ShoujiHuanhuaModel();
                    this.onProto(s2c_huanhua_get_list, this.s2c_huanhua_get_list, this);
                    this.onProto(s2c_equip_gather_get_list, this.s2c_equip_gather_get_list, this);
                };
                /**
                 * 激活
                 * @param oper 激活类型 0 激活单件 1 激活套装
                 * @param index 套装index
                 * @param waixian_id 外显id
                 */
                ShoujiHuanhuaProxy.prototype.c2s_huanhua_act = function (oper, index, waixian_id) {
                    var msg = new c2s_huanhua_act();
                    msg.oper = oper;
                    msg.index = index;
                    if (waixian_id != null) {
                        msg.waixian_id = waixian_id;
                        this._actJibanMap[waixian_id] = true;
                    }
                    this.sendProto(msg);
                };
                //幻化数据
                ShoujiHuanhuaProxy.prototype.s2c_huanhua_get_list = function (n) {
                    var msg = n.body;
                    if (msg && msg.list != null) {
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            this._model.huanhua_map[item.index] = item;
                            if (item.waixian_id && item.waixian_id.length) {
                                for (var _b = 0, _c = item.waixian_id; _b < _c.length; _b++) {
                                    var waixianId = _c[_b];
                                    if (this._actJibanMap[waixianId]) {
                                        mod.ViewMgr.getIns().showSuccessTips(1 /* Act */);
                                        this._actJibanMap[waixianId] = null;
                                        delete this._actJibanMap[waixianId];
                                    }
                                }
                            }
                        }
                    }
                    this.updateHuanHuaHint();
                    this.sendNt("on_huanhua_info_update" /* ON_HUANHUA_INFO_UPDATE */);
                };
                /**
                 * 激活
                 * oper 1 激活 2 领取大奖
                 */
                ShoujiHuanhuaProxy.prototype.c2s_equip_gather_act = function (index, oper) {
                    var msg = new c2s_equip_gather_act();
                    msg.index = index;
                    msg.oper = oper;
                    if (oper == 1) {
                        this._actJibanEquipMap[index] = true;
                    }
                    this.sendProto(msg);
                };
                //收集数据
                ShoujiHuanhuaProxy.prototype.s2c_equip_gather_get_list = function (n) {
                    var msg = n.body;
                    if (msg && msg.list != null) {
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            this._model.equip_map[item.index] = item;
                            var partAry = this.getPartAry(item.index);
                            if (this._actJibanEquipMap[item.index] && item && item.act_cnt
                                && partAry.indexOf(item.act_cnt) > -1) {
                                mod.ViewMgr.getIns().showSuccessTips(1 /* Act */);
                                this._actJibanEquipMap[item.index] = null;
                                delete this._actJibanEquipMap[item.index];
                            }
                        }
                    }
                    this.updateGatherHint();
                    this.sendNt("on_gather_info_update" /* ON_GATHER_INFO_UPDATE */);
                };
                /**=============================== 协议end ===============================*/
                ShoujiHuanhuaProxy.prototype.getBodyJiBanCfgList = function () {
                    var cfgs = game.getConfigListByName("body_jiban.json" /* BodyJiban */);
                    cfgs.sort(function (a, b) { return a.order - b.order; });
                    return cfgs;
                };
                ShoujiHuanhuaProxy.prototype.getHuanHuaInfo = function (index) {
                    return this._model.huanhua_map[index];
                };
                // 套装是否激活
                ShoujiHuanhuaProxy.prototype.isActed = function (index) {
                    var info = this._model.huanhua_map[index];
                    return info && info.is_act != null && info.is_act == 2;
                };
                ShoujiHuanhuaProxy.prototype.getIdxByRebirthLv = function (rebirthLv) {
                    if (this._rebirthIdxMap && this._rebirthIdxMap[rebirthLv] != null) {
                        return this._rebirthIdxMap[rebirthLv];
                    }
                    var cfgs = game.getConfigListByName("gather.json" /* Gather */);
                    this._rebirthIdxMap = {};
                    for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                        var cfg = cfgs_1[_i];
                        this._rebirthIdxMap[cfg.level] = cfg.index;
                    }
                    return this._rebirthIdxMap[rebirthLv];
                };
                ShoujiHuanhuaProxy.prototype.getGatherCfgList = function () {
                    var rebirthLv = mod.RoleUtil.getRebirthLv();
                    var showRebirthLv;
                    if (rebirthLv <= 9) {
                        //1-9转只显示1-9转的
                        showRebirthLv = 9;
                    }
                    else {
                        //>9后，就显示到当前转，后续的转不展示。假若当前转的收集完成后，可显示下一转的
                        showRebirthLv = rebirthLv;
                        var index = this.getIdxByRebirthLv(rebirthLv);
                        if (this.isActedGather(index)) {
                            showRebirthLv += 1;
                        }
                    }
                    var cfgs = game.getConfigListByName("gather.json" /* Gather */);
                    var list = [];
                    for (var _i = 0, cfgs_2 = cfgs; _i < cfgs_2.length; _i++) {
                        var cfg = cfgs_2[_i];
                        if (cfg.level <= showRebirthLv) {
                            list.push(cfg);
                        }
                    }
                    list.sort(function (a, b) { return a.order - b.order; });
                    return list;
                };
                ShoujiHuanhuaProxy.prototype.getGatherInfo = function (index) {
                    return this._model.equip_map[index];
                };
                //能否收集
                ShoujiHuanhuaProxy.prototype.canGather = function (index) {
                    var list = this.getGatherCfgList();
                    //第一个默认可以收集
                    if (list && list[0] && list[0].index == index) {
                        return true;
                    }
                    var preIndex = 0; //前一套
                    for (var i = 1; i < list.length; i++) {
                        var cfg = list[i];
                        if (cfg && cfg.index == index) {
                            preIndex = list[i - 1].index;
                            break;
                        }
                    }
                    //前一套收集了
                    if (this.isActedGather(preIndex)) {
                        return true;
                    }
                    return false;
                };
                /**
                 * 是否已收集
                 * 领取大奖点了激活才有十件套属性
                 * @param index
                 */
                ShoujiHuanhuaProxy.prototype.isActedGather = function (index) {
                    var info = this.getGatherInfo(index);
                    if (!info || !info.gather_id) {
                        return false;
                    }
                    var cfg = game.getConfigByNameId("gather.json" /* Gather */, index);
                    if (!cfg) {
                        return false;
                    }
                    var act_cnt = cfg.attribute[cfg.attribute.length - 1][0];
                    return info.act_cnt == act_cnt && info.is_get == 2;
                };
                ShoujiHuanhuaProxy.prototype.getPartAry = function (index) {
                    if (this.partMap[index]) {
                        return this.partMap[index];
                    }
                    var cfg = game.getConfigByNameId("gather.json" /* Gather */, index);
                    if (!cfg) {
                        return [];
                    }
                    var ary = [];
                    for (var _i = 0, _a = cfg.attribute; _i < _a.length; _i++) {
                        var item = _a[_i];
                        ary.push(item[0]);
                    }
                    this.partMap[index] = ary;
                    return ary;
                };
                //任务收集指引
                ShoujiHuanhuaProxy.prototype.canTaskActGather = function () {
                    if (!mod.GuideMgr.getIns().hasGuideKey([14 /* RoleCollectAct */])) {
                        return false;
                    }
                    var task = mod.TaskUtil.getMainTask();
                    var index = 1; //套数index
                    var cnt = task.target; //套数数量
                    //todo，可激活数量大于等于cnt
                    return this.canActByCnt(index, cnt);
                };
                /**
                 * 套装的x件套属性能否激活
                 * @param index
                 * @param cnt
                 */
                ShoujiHuanhuaProxy.prototype.canActByCnt = function (index, cnt) {
                    var gatherCnt = this.getGatherCnt(index);
                    return gatherCnt >= cnt;
                };
                //已收集的数量
                ShoujiHuanhuaProxy.prototype.getGatherCnt = function (index) {
                    var info = this.getGatherInfo(index);
                    return info && info.gather_id ? info.gather_id.length : 0;
                };
                /**
                 * 能否激活收集的套装
                 * @param index
                 * @param isTips
                 */
                ShoujiHuanhuaProxy.prototype.canActGather = function (index, isTips) {
                    if (isTips === void 0) { isTips = false; }
                    if (!this.canGather(index)) {
                        return false;
                    }
                    var info = this.getGatherInfo(index);
                    if (this.isActedGather(index)) {
                        return false;
                    }
                    if (!info || !info.gather_id) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u6536\u96C6\u4E0D\u8DB3");
                        }
                        return false;
                    }
                    var cfg = game.getConfigByNameId("gather.json" /* Gather */, index);
                    if (!cfg || !cfg.fashion_part) {
                        return false;
                    }
                    var act_cnt = info.act_cnt || 0; //当前激活的x件套
                    var gather_cnt = info.gather_id.length; //当前收集的数量
                    var part_ary = this.getPartAry(index); //进度条阶段
                    //存在阶段激活情况，不包含大奖阶段
                    if (act_cnt < gather_cnt && act_cnt != part_ary[part_ary.length - 2]) {
                        for (var i = act_cnt + 1; i <= gather_cnt; i++) {
                            if (part_ary.indexOf(i) > -1) {
                                return true;
                            }
                        }
                    }
                    if (gather_cnt < cfg.fashion_part.length) {
                        if (isTips) {
                            game.PromptBox.getIns().show("\u6536\u96C6\u4E0D\u8DB3");
                        }
                        return false;
                    }
                    // 需求变更：先激活10件套属性，再领取奖励。原来是领取才能激活 2023.1.12
                    // if (info && info.is_get != null && info.is_get != 2) {
                    //     if (isTips) {
                    //         PromptBox.getIns().show(`请领取大奖`);
                    //     }
                    //     return false;
                    // }
                    return true;
                };
                /**能否领取大奖*/
                ShoujiHuanhuaProxy.prototype.canGetBigReward = function (index) {
                    if (!this.canGather(index)) {
                        return false;
                    }
                    if (this.isActedGather(index)) {
                        return false;
                    }
                    var info = this.getGatherInfo(index);
                    return info && info.is_get == 1;
                    // 需求变更
                    // let cfg: GatherConfig = getConfigByNameId(ConfigName.Gather, index);
                    // if (!info || !cfg) {
                    //     return false;
                    // }
                    // let part = this.getPartAry(index);
                    // // gather_id长度等于部位长度，is_get=1，act_cnt等于倒数第二个阶段
                    // if (info.gather_id && info.gather_id.length == cfg.fashion_part.length
                    //     && info.is_get == 1 && info.act_cnt == part[part.length - 2]) {
                    //     return true;
                    // }
                    // return false;
                };
                /**=============================== hint ===============================*/
                //单个外显激活，刷新红点
                ShoujiHuanhuaProxy.prototype.onSurfaceInfoUpdate = function (n) {
                    var type = n.body;
                    if (this.headTypes.indexOf(type) > -1) {
                        this.updateHuanHuaHint();
                    }
                };
                //能否激活幻化icon
                ShoujiHuanhuaProxy.prototype.canActHuanHuaIcon = function (index, waixianId) {
                    var info = this.getHuanHuaInfo(index);
                    if (info && info.waixian_id.indexOf(waixianId) > -1) {
                        return false;
                    }
                    return mod.SurfaceUtil.isAct(waixianId);
                };
                /**幻化套装红点*/
                ShoujiHuanhuaProxy.prototype.getHuanHuaHint = function (index) {
                    var cfg = game.getConfigByNameId("body_jiban.json" /* BodyJiban */, index);
                    if (!cfg) {
                        return false;
                    }
                    for (var _i = 0, _a = cfg.fashion_part; _i < _a.length; _i++) {
                        var id = _a[_i];
                        if (this.canActHuanHuaIcon(index, id)) {
                            return true;
                        }
                    }
                    var info = this.getHuanHuaInfo(index);
                    return info && info.is_act && info.is_act == 1;
                };
                /**幻化红点*/
                ShoujiHuanhuaProxy.prototype.updateHuanHuaHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670135 /* RoleHuanhua */)) {
                        return;
                    }
                    var list = this.getBodyJiBanCfgList();
                    var hint = false;
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var cfg = list_1[_i];
                        if (cfg && this.getHuanHuaHint(cfg.index)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, ["06" /* Role */, "01" /* RoleMain */ + 1041670135 /* RoleHuanhua */]);
                };
                /**收集红点*/
                ShoujiHuanhuaProxy.prototype.updateGatherHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670134 /* RoleCollect */)) {
                        return;
                    }
                    var list = this.getGatherCfgList();
                    var hint = false;
                    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                        var cfg = list_2[_i];
                        if (this.canActGather(cfg.index) || this.canGetBigReward(cfg.index)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, ["06" /* Role */, "01" /* RoleMain */ + 1041670134 /* RoleCollect */]);
                };
                ShoujiHuanhuaProxy.prototype.onOpenFuncUpdate = function (n) {
                    var idxs = n.body;
                    if (idxs.indexOf(1041670135 /* RoleHuanhua */) > -1) {
                        this.updateHuanHuaHint();
                    }
                    if (idxs.indexOf(1041670134 /* RoleCollect */) > -1) {
                        this.updateGatherHint();
                    }
                };
                return ShoujiHuanhuaProxy;
            }(game.ProxyBase));
            jiban.ShoujiHuanhuaProxy = ShoujiHuanhuaProxy;
            __reflect(ShoujiHuanhuaProxy.prototype, "game.mod.jiban.ShoujiHuanhuaProxy", ["game.mod.IShoujiHuanhuaProxy", "base.IProxy"]);
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var facade = base.facade;
            var Handler = base.Handler;
            var JibanBaseItemRender = /** @class */ (function (_super) {
                __extends(JibanBaseItemRender, _super);
                function JibanBaseItemRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                JibanBaseItemRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                    this.lab_gain.touchEnabled = true;
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.lab_gain, this.onClick, this);
                    // this.lab_gain.addEventListener(TextEvent.LINK, this.onClick, this);
                    this.icon.setClickHandler(Handler.alloc(this, this.onClickIcon));
                };
                JibanBaseItemRender.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    // this.lab_gain.removeEventListener(TextEvent.LINK, this.onClick, this);
                };
                JibanBaseItemRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var data = this.data;
                    var propData = game.PropData.create(data.cfg.index);
                    this.icon.setData(propData);
                    var isAct = data.isActed;
                    this._canAct = data.showHint;
                    this.lab_gain.visible = !isAct;
                    if (!isAct) {
                        this.icon.setImgGray();
                        this._gainId = propData.gain_id && propData.gain_id[0];
                        var cfg = game.getConfigByNameId("jump.json" /* Jump */, this._gainId);
                        this.lab_gain.textFlow = cfg ? game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(cfg.name, 16773203 /* YELLOW */)) : game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(game.getLanById("huodong" /* huodong */), 16773203 /* YELLOW */));
                    }
                    else {
                        this.icon.setImgGray("");
                        this._gainId = 0;
                    }
                    this.icon.setHint(this._canAct);
                };
                JibanBaseItemRender.prototype.onClickIcon = function () {
                    if (!this.data) {
                        return;
                    }
                    //子女
                    if (this.data.headType == 601 /* Child */) {
                        this.onChildClick();
                        return;
                    }
                    if (this.data.headType == 606 /* Shouyin */) {
                        this.onClickYishouShouyin();
                        return;
                    }
                    if (this.data.headType == 408 /* Xianjian */) {
                        this.onClickXianjian();
                        return;
                    }
                    var data = this.data;
                    var index = data.cfg.index;
                    if (this._canAct) {
                        this._proxy.c2s_ride_oper_jiban(data.headType, data.jibanCfg.index, index);
                        return;
                    }
                    this.showPropTips(data.cfg);
                };
                JibanBaseItemRender.prototype.onClick = function () {
                    if (!this._gainId) {
                        return;
                    }
                    mod.ViewMgr.getIns().showViewByID(this._gainId);
                };
                //展示tips
                JibanBaseItemRender.prototype.showPropTips = function (cfg) {
                    if (!cfg) {
                        return;
                    }
                    var idx = cfg && cfg.material[0][0];
                    mod.ViewMgr.getIns().showPropTips(idx);
                };
                //子女
                JibanBaseItemRender.prototype.onChildClick = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var childProxy = game.getProxy("58" /* Xianyuan */, 227 /* Child */);
                    if (data.showHint) {
                        childProxy.c2s_child_oper_jiban(data.jibanCfg.index, data.cfg.index);
                        return;
                    }
                    var cost = childProxy.getCost(data.cfg.index, 1);
                    mod.ViewMgr.getIns().showPropTips(cost[0]);
                };
                //异兽兽印
                JibanBaseItemRender.prototype.onClickYishouShouyin = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var yishouProxy = game.getProxy("62" /* Yishou */, 243 /* Yishou */);
                    if (data.showHint) {
                        yishouProxy.c2s_yishou_shouying_jiban(data.jibanCfg.index, data.cfg.index);
                        return;
                    }
                    this.showPropTips(data.cfg);
                };
                JibanBaseItemRender.prototype.onClickXianjian = function () {
                    var data = this.data;
                    var proxy = game.getProxy("46" /* Surface */, 239 /* Xianjian */);
                    if (data.showHint) {
                        proxy.c2s_fly_sword_operation(data.cfg.index, 5, data.jibanCfg.index);
                        return;
                    }
                    this.showPropTips(data.cfg);
                };
                return JibanBaseItemRender;
            }(mod.BaseRenderer));
            jiban.JibanBaseItemRender = JibanBaseItemRender;
            __reflect(JibanBaseItemRender.prototype, "game.mod.jiban.JibanBaseItemRender");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var JibanBaseRender = /** @class */ (function (_super) {
                __extends(JibanBaseRender, _super);
                function JibanBaseRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                JibanBaseRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data.cfg;
                    var propIndex = cfg.partners[0];
                    var propCfg = game.getConfigById(propIndex);
                    this.icon.updateQualityImg(game.ResUtil.getPropQualityImg(propCfg.quality));
                    this.icon.updateIconImg(propCfg.icon);
                    var isAct = this.data.isActed;
                    if (!isAct) {
                        this.icon.setImgGray();
                    }
                    else {
                        this.icon.setImgGray("");
                    }
                    this.redPoint.visible = this.data.showHint;
                };
                return JibanBaseRender;
            }(mod.IconSel));
            jiban.JibanBaseRender = JibanBaseRender;
            __reflect(JibanBaseRender.prototype, "game.mod.jiban.JibanBaseRender");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var JibanBaseView = /** @class */ (function (_super) {
                __extends(JibanBaseView, _super);
                function JibanBaseView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.jiban.JibanBaseSkin";
                    return _this;
                }
                return JibanBaseView;
            }(eui.Component));
            jiban.JibanBaseView = JibanBaseView;
            __reflect(JibanBaseView.prototype, "game.mod.jiban.JibanBaseView");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var RoleGatherBarItem = /** @class */ (function (_super) {
                __extends(RoleGatherBarItem, _super);
                function RoleGatherBarItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.jiban.RoleGatherBarItemSkin";
                    return _this;
                }
                RoleGatherBarItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.lb_cnt.text = data.cnt + '';
                    this.img_bg.source = data.isActed ? "xiaokuang_huangse" : 'xiaokuang_huise';
                };
                return RoleGatherBarItem;
            }(mod.BaseListenerRenderer));
            jiban.RoleGatherBarItem = RoleGatherBarItem;
            __reflect(RoleGatherBarItem.prototype, "game.mod.jiban.RoleGatherBarItem");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var RoleGatherBtnItem = /** @class */ (function (_super) {
                __extends(RoleGatherBtnItem, _super);
                function RoleGatherBtnItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.jiban.RoleGatherBtnItemSkin";
                    return _this;
                }
                RoleGatherBtnItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                };
                RoleGatherBtnItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                RoleGatherBtnItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.img_collected.visible = !!data.isActed;
                    this.img_icon.source = data.cfg.icon;
                    this.lb_desc.text = data.cfg.name;
                    this.img_gray.visible = !data.isOpen;
                    this.redPoint.visible = !!data.hint;
                };
                return RoleGatherBtnItem;
            }(mod.BaseListenerRenderer));
            jiban.RoleGatherBtnItem = RoleGatherBtnItem;
            __reflect(RoleGatherBtnItem.prototype, "game.mod.jiban.RoleGatherBtnItem");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var Handler = base.Handler;
            var RoleGatherIconItem = /** @class */ (function (_super) {
                __extends(RoleGatherIconItem, _super);
                function RoleGatherIconItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.jiban.RoleGatherIconItemSkin";
                    return _this;
                }
                RoleGatherIconItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.lb_cond, this.onClickGo, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.img_gray, this.onClickGo, this);
                    this.icon.setClickHandler(Handler.alloc(this, this.onClickIcon));
                };
                RoleGatherIconItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                RoleGatherIconItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var cfg = game.getConfigByNameId("equipment.json" /* Equip */, data.index);
                    this.icon.data = game.PropData.create(data.index);
                    this.img_gray.visible = !data.isActed;
                    this.lb_cond.visible = !data.isActed;
                    var gain_id = cfg.gain_id && cfg.gain_id[0] || 0;
                    if (gain_id) {
                        this._gainId = gain_id;
                        var jumpCfg = game.getConfigByNameId("jump.json" /* Jump */, gain_id);
                        this.lb_cond.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(jumpCfg && jumpCfg.name || '', 16773203 /* YELLOW */));
                    }
                };
                RoleGatherIconItem.prototype.onClickGo = function () {
                    var type = this.data.type;
                    var bossProxy = game.getProxy("22" /* Boss */, 199 /* Boss */);
                    if (!bossProxy.isBossOpen(type, true)) {
                        return;
                    }
                    if (this._gainId) {
                        mod.ViewMgr.getIns().showViewByID(this._gainId, type);
                    }
                };
                RoleGatherIconItem.prototype.onClickIcon = function () {
                    mod.ViewMgr.getIns().showPropTips(this.data.index);
                };
                return RoleGatherIconItem;
            }(mod.BaseListenerRenderer));
            jiban.RoleGatherIconItem = RoleGatherIconItem;
            __reflect(RoleGatherIconItem.prototype, "game.mod.jiban.RoleGatherIconItem");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var RoleGatherView = /** @class */ (function (_super) {
                __extends(RoleGatherView, _super);
                function RoleGatherView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.role.RoleGatherSkin";
                    return _this;
                }
                return RoleGatherView;
            }(eui.Component));
            jiban.RoleGatherView = RoleGatherView;
            __reflect(RoleGatherView.prototype, "game.mod.jiban.RoleGatherView");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var RoleHuanHuaIconItem = /** @class */ (function (_super) {
                __extends(RoleHuanHuaIconItem, _super);
                function RoleHuanHuaIconItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.jiban.JibanBaseItemSkin";
                    return _this;
                }
                RoleHuanHuaIconItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.img_di.visible = false;
                    this.lab_gain.touchEnabled = true;
                    this._proxy = game.getProxy("47" /* Jiban */, 205 /* ShoujiHuanhua */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.lab_gain, this.onClickGain, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.icon, this.onClickIcon, this);
                };
                RoleHuanHuaIconItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this._gainId = null;
                };
                RoleHuanHuaIconItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var cfg = game.getConfigById(data.index);
                    if (!cfg) {
                        DEBUG && console.error("RoleHuanHuaIconItem \u627E\u4E0D\u5230\u914D\u7F6E " + data.index);
                        return;
                    }
                    this.icon.setHint(!!data.hint);
                    this.icon.updateIconImg(cfg.icon);
                    this.icon.updateQualityImg(game.ResUtil.getPropQualityImg(cfg.quality));
                    var jumpCfg = game.getConfigByNameId("jump.json" /* Jump */, cfg.gain_id);
                    var gainName = jumpCfg && jumpCfg.name || '';
                    if (cfg.gain_vip) {
                        var vipLv = mod.VipUtil.getShowVipLv(cfg.gain_vip);
                        gainName = gainName + vipLv;
                    }
                    this.lab_gain.textFlow = jumpCfg ? game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(gainName, 16773203 /* YELLOW */)) : game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(game.getLanById("huodong" /* huodong */), 16773203 /* YELLOW */));
                    this.lab_gain.visible = !data.isAct;
                    if (data.isAct) {
                        this.icon.setImgGray('');
                        this._gainId = null;
                    }
                    else {
                        if (Array.isArray(cfg.gain_id)) {
                            this._gainId = cfg.gain_id[0];
                        }
                        else {
                            this._gainId = cfg.gain_id;
                        }
                        this.icon.setImgGray();
                    }
                };
                RoleHuanHuaIconItem.prototype.onClickGain = function () {
                    if (this._gainId) {
                        mod.ViewMgr.getIns().showViewByID(this._gainId);
                    }
                };
                RoleHuanHuaIconItem.prototype.onClickIcon = function () {
                    if (this._proxy.canActHuanHuaIcon(this.data.suitIndex, this.data.index)) {
                        this._proxy.c2s_huanhua_act(0, this.data.suitIndex, this.data.index);
                        return;
                    }
                    var cfg = game.getConfigById(this.data.index);
                    if (cfg && cfg.material) {
                        mod.ViewMgr.getIns().showPropTips(cfg.material[0][0]);
                    }
                };
                return RoleHuanHuaIconItem;
            }(mod.BaseListenerRenderer));
            jiban.RoleHuanHuaIconItem = RoleHuanHuaIconItem;
            __reflect(RoleHuanHuaIconItem.prototype, "game.mod.jiban.RoleHuanHuaIconItem");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var RoleHuanHuaItem = /** @class */ (function (_super) {
                __extends(RoleHuanHuaItem, _super);
                function RoleHuanHuaItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RoleHuanHuaItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this.icon.updateIconImg(data.icon);
                    this.icon.updateQualityImg(game.ResUtil.getPropQualityImg(data['quality'] || 5));
                    var proxy = game.getProxy("47" /* Jiban */, 205 /* ShoujiHuanhua */);
                    var isAct = proxy.isActed(data.index);
                    if (isAct) {
                        this.icon.setImgGray('');
                    }
                    else {
                        this.icon.setImgGray();
                    }
                    this.redPoint.visible = proxy.getHuanHuaHint(data.index);
                };
                return RoleHuanHuaItem;
            }(mod.IconSel));
            jiban.RoleHuanHuaItem = RoleHuanHuaItem;
            __reflect(RoleHuanHuaItem.prototype, "game.mod.jiban.RoleHuanHuaItem");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var RoleHuanHuaView = /** @class */ (function (_super) {
                __extends(RoleHuanHuaView, _super);
                function RoleHuanHuaView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.jiban.RoleHuanHuaSkin";
                    _this.touchEnabled = false;
                    return _this;
                }
                return RoleHuanHuaView;
            }(eui.Component));
            jiban.RoleHuanHuaView = RoleHuanHuaView;
            __reflect(RoleHuanHuaView.prototype, "game.mod.jiban.RoleHuanHuaView");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var JibanModel = /** @class */ (function () {
                function JibanModel() {
                }
                return JibanModel;
            }());
            jiban.JibanModel = JibanModel;
            __reflect(JibanModel.prototype, "game.mod.jiban.JibanModel");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var ShenLingJiBanAwardView = /** @class */ (function (_super) {
                __extends(ShenLingJiBanAwardView, _super);
                function ShenLingJiBanAwardView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.jiban.ShenLingJiBanAwarkSkin";
                    return _this;
                }
                return ShenLingJiBanAwardView;
            }(eui.Component));
            jiban.ShenLingJiBanAwardView = ShenLingJiBanAwardView;
            __reflect(ShenLingJiBanAwardView.prototype, "game.mod.jiban.ShenLingJiBanAwardView");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var ShenLingJiBanItem = /** @class */ (function (_super) {
                __extends(ShenLingJiBanItem, _super);
                function ShenLingJiBanItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.jiban.ShenLingJiBanItemSkin";
                    return _this;
                }
                ShenLingJiBanItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    this.list.itemRenderer = mod.AvatarItem;
                    this.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_act, this.onClickAct, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_reward, this.onClickReward, this);
                    this.addEventListenerEx(eui.ItemTapEvent.ITEM_TAP, this.list, this.onClickList, this);
                    // facade.onNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
                    this.btn_reward.setHintStyle(-3, -8);
                };
                ShenLingJiBanItem.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    // facade.offNt(MainEvent.UPDATE_COMMON_ATTR, this.updateAttr, this);
                };
                ShenLingJiBanItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var jibanCfg = this._proxy.getJiBanCfg(data.index)[0];
                    if (!jibanCfg) {
                        return;
                    }
                    this.lb_name.text = jibanCfg.name;
                    var info = data.info;
                    this.updateAttr();
                    var actNum = 0;
                    var listData = [];
                    var actedList = info && info.idlist ? info.idlist : [];
                    var actedMap = {}; //激活的神灵
                    for (var _i = 0, actedList_1 = actedList; _i < actedList_1.length; _i++) {
                        var id = actedList_1[_i];
                        actedMap[id.toNumber()] = true;
                    }
                    for (var _a = 0, _b = jibanCfg.partners; _a < _b.length; _a++) {
                        var index = _b[_a];
                        var info_1 = this._proxy.getInfoByIndex(index);
                        if (info_1) {
                            actNum++;
                        }
                        var isAct = !!actedMap[index];
                        var showHint = this._proxy.getJiBanShenLingActHint(data.index, index);
                        var avatarItem = {
                            cfg: this._proxy.getShenLingCfg(index),
                            showHint: showHint,
                            star: !isAct ? 0 : (info_1 && info_1.star || 0),
                            isBattle: false,
                            isSel: showHint //红点就有选中框
                        };
                        listData.push(avatarItem);
                    }
                    this._listData.replaceAll(listData);
                    var isMax = info && info.level >= data.maxLv;
                    this.img_max.visible = isMax;
                    this.btn_act.visible = !isMax;
                    if (!isMax) {
                        this.btn_act.label = game.getLanById((!info || info.level < 1) ? "active" /* active */ : "uplv" /* uplv */);
                        this.btn_act.setHint(this._proxy.getJiBanActHint(data.index));
                    }
                    var totalNum = jibanCfg.partners.length;
                    var color = actNum >= totalNum ? 2330156 /* GREEN */ : 16719376 /* RED */;
                    this.lb_num.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor("(" + actNum + "/" + totalNum + ")", color));
                    this.btn_reward.setHint(this._proxy.getJiBanRewardHint(data.index));
                };
                ShenLingJiBanItem.prototype.onClickReward = function () {
                    mod.ViewMgr.getIns().showSecondPop("47" /* Jiban */, "02" /* ShenLingJiBanAward */, this.data.index);
                };
                ShenLingJiBanItem.prototype.onClickAct = function () {
                    var data = this.data;
                    if (!data || !this._proxy.getJiBanActHint(data.index, true)) {
                        return;
                    }
                    if (!data.info || data.info.level >= data.maxLv) {
                        return;
                    }
                    this._proxy.c2s_god_brother_groupup(data.index, null, null);
                };
                ShenLingJiBanItem.prototype.onClickList = function (e) {
                    var item = e.item;
                    if (item && item.showHint) {
                        this._proxy.c2s_god_brother_groupup(this.data.index, null, item.cfg.index);
                        return;
                    }
                    mod.ViewMgr.getIns().showPropTips(item.cfg.index);
                    this.list.selectedIndex = null;
                };
                ShenLingJiBanItem.prototype.updateAttr = function () {
                    var info = this.data.info;
                    var jibanCfg = this._proxy.getJiBanCfg(this.data.index)[0];
                    var attrs;
                    if (info && info.level) {
                        attrs = info.attrs;
                        jibanCfg = this._proxy.getJiBanCfg(this.data.index)[info.level - 1];
                    }
                    else {
                        attrs = mod.RoleUtil.getAttr(jibanCfg && jibanCfg.property || 0);
                    }
                    this.power.setPowerValue(attrs && attrs.showpower ? attrs.showpower : 0);
                    var key = "god" /* god */;
                    var txt = (jibanCfg && jibanCfg.desc || '') + '\n' +
                        game.TextUtil.getAttrsText(key) + game.TextUtil.addColor(' +' + (attrs && attrs[key] || 0), 2330156 /* GREEN */);
                    this.lb_attr.textFlow = game.TextUtil.parseHtml(txt, true);
                };
                return ShenLingJiBanItem;
            }(mod.BaseListenerRenderer));
            jiban.ShenLingJiBanItem = ShenLingJiBanItem;
            __reflect(ShenLingJiBanItem.prototype, "game.mod.jiban.ShenLingJiBanItem");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var ShenLingJiBanView = /** @class */ (function (_super) {
                __extends(ShenLingJiBanView, _super);
                function ShenLingJiBanView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.jiban.ShenLingJiBanSkin";
                    return _this;
                }
                return ShenLingJiBanView;
            }(eui.Component));
            jiban.ShenLingJiBanView = ShenLingJiBanView;
            __reflect(ShenLingJiBanView.prototype, "game.mod.jiban.ShenLingJiBanView");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var JibanMod = /** @class */ (function (_super) {
                __extends(JibanMod, _super);
                function JibanMod() {
                    return _super.call(this, "47" /* Jiban */) || this;
                }
                JibanMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                JibanMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(191 /* Jiban */, jiban.JibanProxy);
                    this.regProxy(205 /* ShoujiHuanhua */, jiban.ShoujiHuanhuaProxy);
                };
                JibanMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* JibanMain */, jiban.JibanMainMdr);
                    this.regMdr("02" /* ShenLingJiBanAward */, jiban.ShenLingJiBanAwardMdr);
                };
                return JibanMod;
            }(game.ModBase));
            jiban.JibanMod = JibanMod;
            __reflect(JibanMod.prototype, "game.mod.jiban.JibanMod");
            gso.modCls.push(JibanMod);
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var JibanMainMdr = /** @class */ (function (_super) {
                __extends(JibanMainMdr, _super);
                function JibanMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Huanhua */,
                            icon: "huanhuabiaoqiantubiao",
                            mdr: jiban.RoleHuanHuaMdr,
                            title: "title_cue3" /* title_cue3 */,
                            openIdx: 1041670135 /* RoleHuanhua */,
                            bg: 'horse_bg',
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */ + 1041670135 /* RoleHuanhua */]
                        },
                        {
                            btnType: "02" /* ShenLing */,
                            icon: "shenlingbiaoqiantubiao",
                            mdr: jiban.ShenLingJiBanMdr,
                            title: "general_tips" /* general_tips */,
                            //bg: "p1_xiuxian_bg",
                            openIdx: 1041670102 /* Shenling */,
                            hintTypes: ["47" /* Jiban */, "01" /* JibanMain */ + "02" /* ShenLing */]
                        },
                        {
                            btnType: "03" /* Collect */,
                            icon: "zhuangbeibiaoqiantubiao",
                            mdr: jiban.RoleGatherMdr,
                            title: "equipment_tips" /* equipment_tips */,
                            openIdx: 1041670134 /* RoleCollect */,
                            bg: 'horse_bg',
                            hintTypes: ["06" /* Role */, "01" /* RoleMain */ + 1041670134 /* RoleCollect */]
                        },
                        {
                            btnType: "04" /* Horse */,
                            icon: "horse_tab",
                            mdr: jiban.HorseJibanMdr,
                            title: "horse_tips" /* horse_tips */,
                            bg: "p1_del_bg",
                            openIdx: 1041670104 /* Horse */,
                            hintTypes: ["46" /* Surface */, "02" /* HorseMain */, "01" /* Horse */, "32" /* HorseJiban */]
                        },
                        {
                            btnType: "05" /* Child */,
                            icon: "zinvbiaoqiantubiao",
                            mdr: jiban.ChildJibanMdr,
                            title: "xianlv_tips24" /* xianlv_tips24 */,
                            bg: "p1_del_bg",
                            openIdx: 1041670174 /* XianlvChild */,
                            hintTypes: ["58" /* Xianyuan */, "01" /* Xianlv */, "01" /* Xianlv */, "09" /* ChildMain */, "02" /* Shengxing */, 'jiban']
                        },
                        {
                            btnType: "06" /* Tianshen */,
                            icon: "yuanling_tab",
                            mdr: jiban.TianshenJibanMdr,
                            title: "yuanling_tips" /* yuanling_tips */,
                            bg: "p1_del_bg",
                            openIdx: 1041670106 /* Tianshen */,
                            hintTypes: ["46" /* Surface */, "08" /* TianshenMain */, "01" /* Tianshen */, "42" /* TianshenJiban */]
                        },
                        {
                            btnType: "07" /* Xianjian */,
                            icon: "xianjiantubiao",
                            mdr: jiban.XianjianJibanMdr,
                            title: "xianjian_tips1" /* xianjian_tips1 */,
                            bg: "p1_del_bg",
                            openIdx: 1041670201 /* Xianjian */,
                            hintTypes: ["46" /* Surface */, "18" /* Xianjian */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "08" /* YishouShouyin */,
                            icon: "shouyinbiaoqiantubiao",
                            mdr: jiban.YishouShouyinJibanMdr,
                            title: "yishou_tips8" /* yishou_tips8 */,
                            bg: "p1_del_bg",
                            openIdx: 1041670204 /* Yishou */,
                            hintTypes: ["62" /* Yishou */, "01" /* Main */, "04" /* Shouyin */, "08" /* YishouShouyin */]
                        }
                    ];
                    return _this;
                }
                return JibanMainMdr;
            }(mod.WndBaseMdr));
            jiban.JibanMainMdr = JibanMainMdr;
            __reflect(JibanMainMdr.prototype, "game.mod.jiban.JibanMainMdr");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var ChildJibanMdr = /** @class */ (function (_super) {
                __extends(ChildJibanMdr, _super);
                function ChildJibanMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", jiban.JibanBaseView);
                    _this._selIdx = 0;
                    return _this;
                }
                ChildJibanMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = game.getProxy("58" /* Xianyuan */, 227 /* Child */);
                    this._view.list_item.itemRenderer = jiban.JibanBaseRender;
                    this._view.list_item.dataProvider = this._listData = new eui.ArrayCollection();
                };
                ChildJibanMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_item, eui.ItemTapEvent.ITEM_TAP, this.onClickItem);
                    addEventListener(this._view.btn_act, egret.TouchEvent.TOUCH_TAP, this.onClickAct);
                    this.onNt("on_update_child_jiban_info" /* ON_UPDATE_CHILD_JIBAN_INFO */, this.onUpdateView, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePower, this);
                };
                ChildJibanMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                ChildJibanMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._selCfg = null;
                    this._selIdx = 0;
                };
                ChildJibanMdr.prototype.onUpdateView = function () {
                    this.updateList();
                    this.updateView();
                };
                ChildJibanMdr.prototype.updateList = function () {
                    var cfgList = game.getConfigListByName("child_jiban.json" /* ChildJiban */);
                    var list = [];
                    for (var _i = 0, cfgList_2 = cfgList; _i < cfgList_2.length; _i++) {
                        var cfg = cfgList_2[_i];
                        var itemData = {
                            cfg: cfg,
                            showHint: this._proxy.getHintByJibanIndex(cfg.index),
                            isActed: this._proxy.isActedJiban(cfg.index)
                        };
                        list.push(itemData);
                    }
                    // list.sort((a, b) => {
                    //     if (a.hint != b.hint) {
                    //         return a.hint ? -1 : 1;
                    //     }
                    //     return a.cfg.index - b.cfg.index;
                    // });
                    this._listData.replaceAll(list);
                    if (this._selCfg) {
                        for (var i = 0; i < list.length; i++) {
                            if (list[i].cfg.index == this._selCfg.index) {
                                this._selIdx = i;
                                break;
                            }
                        }
                    }
                    else {
                        this._selIdx = 0;
                        this._selCfg = list[this._selIdx].cfg;
                    }
                    this._view.list_item.selectedIndex = this._selIdx;
                };
                ChildJibanMdr.prototype.updateView = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    this.updateIcon();
                    this.updatePower();
                    this.updateAct();
                    this._view.img_icon.source = "jiban_icon_" + 601 /* Child */;
                    this._view.img_name.source = "jiban_name_" + 601 /* Child */ + "_" + this._selCfg.index;
                    this._view.img_eff.source = "jiban_" + 601 /* Child */ + "_" + this._selCfg.index;
                    this._view.name_item.updateShow(this._selCfg.name, this._selCfg.quality);
                };
                ChildJibanMdr.prototype.updateIcon = function () {
                    var partners = this._selCfg.partners || [];
                    var len = partners.length;
                    this._view.currentState = len + '';
                    for (var i = 0; i < 6; i++) {
                        var icon = this._view["item" + i];
                        if (!icon) {
                            continue;
                        }
                        icon.visible = i < len;
                        if (!icon.visible) {
                            continue;
                        }
                        var iconData = {
                            jibanCfg: this._selCfg,
                            cfg: game.getConfigByNameId("child.json" /* Child */, partners[i]),
                            showHint: this._proxy.canActJibanChild(this._selCfg.index, partners[i]),
                            isActed: this._proxy.isJibanChildActed(this._selCfg.index, partners[i]),
                            headType: 601 /* Child */
                        };
                        icon.data = iconData;
                        this._view.img_item.source = "surface_" + iconData.headType + "_" + this._selCfg.index;
                    }
                };
                ChildJibanMdr.prototype.updatePower = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    var info = this._proxy.getJibanInfo(this._selCfg.index);
                    var attr = info ? info.jiban_attr : null;
                    if (!attr) {
                        attr = mod.RoleUtil.getAttr(this._selCfg.property);
                    }
                    this._view.power.setPowerValue(attr && attr.showpower ? attr.showpower : 0);
                    this._view.god_item.updateGod(attr && attr.god ? attr.god : 0);
                };
                ChildJibanMdr.prototype.updateAct = function () {
                    var isAct = this._proxy.isActedJiban(this._selCfg.index);
                    this._view.img_act.visible = isAct;
                    this._view.btn_act.visible = this._view.lab_tips.visible = !isAct;
                    if (isAct) {
                        return;
                    }
                    var info = this._proxy.getJibanInfo(this._selCfg.index);
                    var partners = this._selCfg.partners.length;
                    var actedLen = info && info.child_index ? info.child_index.length : 0;
                    var str = "\u6FC0\u6D3B\u6240\u6709" + this._selCfg.name + "\u5B50\u5973" + game.TextUtil.addColor("(" + actedLen + "/" + partners + ")", actedLen >= partners ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(str);
                    this._view.btn_act.setHint(this._proxy.canActJiban(this._selCfg.index));
                };
                ChildJibanMdr.prototype.onClickItem = function (e) {
                    var idx = e.itemIndex;
                    if (idx == this._selIdx) {
                        return;
                    }
                    this._selIdx = idx;
                    this._selCfg = e.item.cfg;
                    this.updateView();
                };
                ChildJibanMdr.prototype.onClickAct = function () {
                    if (this._selCfg && this._proxy.canActJiban(this._selCfg.index, true)) {
                        this._proxy.c2s_child_oper_jiban(this._selCfg.index, null);
                    }
                };
                return ChildJibanMdr;
            }(game.MdrBase));
            jiban.ChildJibanMdr = ChildJibanMdr;
            __reflect(ChildJibanMdr.prototype, "game.mod.jiban.ChildJibanMdr");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var HorseJibanMdr = /** @class */ (function (_super) {
                __extends(HorseJibanMdr, _super);
                function HorseJibanMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._headType = 360 /* Horse */; //子类重写
                    return _this;
                }
                return HorseJibanMdr;
            }(jiban.JibanBaseMdr));
            jiban.HorseJibanMdr = HorseJibanMdr;
            __reflect(HorseJibanMdr.prototype, "game.mod.jiban.HorseJibanMdr");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var Handler = base.Handler;
            var RoleGatherMdr = /** @class */ (function (_super) {
                __extends(RoleGatherMdr, _super);
                function RoleGatherMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", jiban.RoleGatherView);
                    _this._curIdx = 0; //当前点击的套装
                    _this._curDealIdx = 0; //当前待收集的套装
                    return _this;
                }
                RoleGatherMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(205 /* ShoujiHuanhua */);
                    this._view.list_equip.itemRenderer = jiban.RoleGatherIconItem;
                    this._view.list_equip.dataProvider = this._listEquip = new eui.ArrayCollection();
                    this._view.list_item.itemRenderer = jiban.RoleGatherBtnItem;
                    this._view.list_item.dataProvider = this._listItem = new eui.ArrayCollection();
                };
                RoleGatherMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_item, eui.ItemTapEvent.ITEM_TAP, this.onClickListItem, this);
                    addEventListener(this._view.btn_act, egret.TouchEvent.TOUCH_TAP, this.onClickAct, this);
                    addEventListener(this._view.icon_reward, egret.TouchEvent.TOUCH_TAP, this.onClickReward, this);
                    addEventListener(this._view.img_got, egret.TouchEvent.TOUCH_TAP, this.onClickReward, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.onUpdateAttr, this);
                    this.onNt("on_gather_info_update" /* ON_GATHER_INFO_UPDATE */, this.onUpdateView, this);
                };
                RoleGatherMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateItemList();
                    this.showGuide();
                };
                RoleGatherMdr.prototype.onHide = function () {
                    mod.GuideMgr.getIns().clear(14 /* RoleCollectAct */); //清除指引
                    mod.GuideMgr.getIns().clear(34 /* RoleCollectIcon */); //清除指引
                    _super.prototype.onHide.call(this);
                };
                RoleGatherMdr.prototype.onUpdateAttr = function () {
                    if (!this._attrAry) {
                        return;
                    }
                    var attr = mod.RoleUtil.getAttr(this._attrAry[1]);
                    this.updateAttr(this._attrAry[0], attr);
                    this._attrAry = null;
                };
                RoleGatherMdr.prototype.updateAttr = function (cnt, attr) {
                    if (!attr) {
                        return;
                    }
                    var attrStr = game.TextUtil.getAttrTextAdd(attr, 2330156 /* GREEN */, '    ');
                    this._view.lb_attr.textFlow = game.TextUtil.parseHtml(cnt + "\u4EF6\u5C5E\u6027  " + game.TextUtil.addColor(attrStr, 2330156 /* GREEN */));
                };
                RoleGatherMdr.prototype.onUpdateView = function () {
                    this.updateItemList();
                };
                RoleGatherMdr.prototype.updateRewardView = function () {
                    var info = this._proxy.getGatherInfo(this._curCfg.index);
                    var prop = game.PropData.create(this._curCfg.award[0], this._curCfg.award[1]);
                    this._view.icon_reward.setData(prop, 3 /* NotTips */);
                    this._view.img_got.visible = info && info.is_get == 2; //大奖是否领取
                    var rewardHint = this._proxy.canGetBigReward(this._curCfg.index);
                    this._view.icon_reward.setHint(rewardHint);
                    if (rewardHint) {
                        mod.GuideMgr.getIns().show(34 /* RoleCollectIcon */, this._view.icon_reward, Handler.alloc(this, this.onClickReward)); //任务指引
                    }
                    var propCfg = game.GameConfig.getPropConfigById(this._curCfg.award[0]);
                    this._view.lb_awardname.text = propCfg && propCfg.name || '';
                    this._effId && this.removeEffect(this._effId);
                    if (propCfg && propCfg.param1) {
                        this._effId = this.addAnimate(propCfg.param1[0][0], this._view.gr_eff);
                    }
                };
                RoleGatherMdr.prototype.updateView = function () {
                    if (this._curIdx != null && this._listItem.source[this._curIdx]) {
                        this._curCfg = this._listItem.source[this._curIdx].cfg;
                    }
                    if (!this._curCfg) {
                        return;
                    }
                    this._view.img_name.source = "role_shouji_title" + this._curCfg.index;
                    this.updateRewardView();
                    var info = this._proxy.getGatherInfo(this._curCfg.index);
                    var act_cnt = info && info.act_cnt || 0; //当前激活x件套
                    var attribute = this._curCfg.attribute;
                    for (var i = 0; i < attribute.length; i++) {
                        if (!this._view["barItem" + i]) {
                            continue;
                        }
                        var cnt = attribute[i][0]; //x件套
                        this._view["barItem" + i].data = {
                            cnt: cnt,
                            isActed: cnt <= act_cnt
                        };
                    }
                    var part_ary = this._proxy.getPartAry(this._curCfg.index);
                    var nextIdx = part_ary.indexOf(act_cnt) + 1; //下个进度条阶段
                    var isActed = nextIdx >= attribute.length; //激活否，没有下一阶
                    this._attrAry = attribute[nextIdx];
                    var barMax = attribute[attribute.length - 1][0]; //进度条最大值
                    // if (info && info.is_get == 2) {//领取了大奖
                    //     act_cnt = barMax;
                    // }
                    this._view.bar.show(act_cnt, barMax, false, 0, false, 0 /* Percent */);
                    if (this._attrAry) {
                        var attr = mod.RoleUtil.getAttr(this._attrAry[1]);
                        this.updateAttr(this._attrAry[0], attr);
                    }
                    var fashion_part = this._curCfg.fashion_part;
                    var totalCnt = fashion_part.length;
                    var doneCnt = info && info.gather_id ? info.gather_id.length : 0;
                    var str = game.TextUtil.addColor("(" + doneCnt + "/" + totalCnt + ")", doneCnt >= totalCnt ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this._view.lb_suitcnt.textFlow = game.TextUtil.parseHtml("\u6536\u96C6" + this._curCfg.name + " " + str);
                    var list = [];
                    var gather_id = info ? info.gather_id : [];
                    for (var i = 0; i < fashion_part.length; i++) {
                        list.push({
                            type: this._curCfg.level,
                            index: fashion_part[i],
                            isActed: gather_id.indexOf(i) > -1
                        });
                    }
                    this._listEquip.replaceAll(list);
                    //激活整套成功
                    this._view.lb_attr.visible = this._view.btn_act.visible = !isActed;
                    if (this._view.btn_act.visible) {
                        this._view.btn_act.setHint(this._proxy.canActGather(this._curCfg.index));
                    }
                };
                RoleGatherMdr.prototype.updateItemList = function () {
                    var cfgList = this._proxy.getGatherCfgList();
                    var list = [];
                    var curIdx;
                    for (var i = 0; i < cfgList.length; i++) {
                        var cfg = cfgList[i];
                        var isActed = this._proxy.isActedGather(cfg.index); //收集激活了
                        var hint = false;
                        if (!isActed && curIdx == null) {
                            curIdx = i; //当前在收集中的
                            hint = this._proxy.canActGather(cfg.index) || this._proxy.canGetBigReward(cfg.index);
                        }
                        var isOpen = true;
                        if (curIdx != null && i > curIdx) {
                            isOpen = false;
                        }
                        list.push({
                            cfg: cfg,
                            hint: hint,
                            isActed: isActed,
                            isOpen: isOpen
                        });
                    }
                    if (curIdx == null) {
                        curIdx = list.length - 1; //选择最后一个
                    }
                    this._listItem.replaceAll(list);
                    this._view.list_item.selectedIndex = this._curIdx = curIdx;
                    this._curDealIdx = curIdx;
                    this.updateView();
                };
                RoleGatherMdr.prototype.onClickListItem = function (e) {
                    if (e.itemIndex == this._curIdx) {
                        return;
                    }
                    if (e.itemIndex > this._curDealIdx) {
                        game.PromptBox.getIns().show("\u8BF7\u5148\u6FC0\u6D3B\u524D\u4E00\u5957");
                        this._view.list_item.selectedIndex = this._curIdx;
                        return;
                    }
                    this.switchView(e.itemIndex);
                };
                RoleGatherMdr.prototype.switchView = function (idx) {
                    this._curIdx = idx;
                    this.updateView();
                };
                RoleGatherMdr.prototype.onClickAct = function () {
                    if (!this._curCfg || !this._proxy.canActGather(this._curCfg.index, true)) {
                        return;
                    }
                    this._proxy.c2s_equip_gather_act(this._curCfg.index, 1); //激活套装
                    // 激活后，切换到下一个套装，如果没有下一个，就保留当前
                    // let nextIdx = this._curIdx + 1;
                    // if (!this._listItem.source[nextIdx]) {
                    //     return;
                    // }
                    // this._view.list_item.selectedIndex = nextIdx;
                    // this.switchView(nextIdx);
                    this.updateItemList();
                };
                RoleGatherMdr.prototype.onClickReward = function () {
                    if (!this._curCfg) {
                        return;
                    }
                    var info = this._proxy.getGatherInfo(this._curCfg.index);
                    if (info && info.is_get == 1) {
                        this._proxy.c2s_equip_gather_act(this._curCfg.index, 2); //领取大奖
                        return;
                    }
                    var data = this._view.icon_reward.data;
                    mod.ViewMgr.getIns().showPropTips(data);
                };
                RoleGatherMdr.prototype.showGuide = function () {
                    if (this._proxy.canTaskActGather()) {
                        mod.GuideMgr.getIns().show(14 /* RoleCollectAct */, this._view.btn_act, Handler.alloc(this, this.onClickAct)); //任务指引
                    }
                };
                return RoleGatherMdr;
            }(game.EffectMdrBase));
            jiban.RoleGatherMdr = RoleGatherMdr;
            __reflect(RoleGatherMdr.prototype, "game.mod.jiban.RoleGatherMdr");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var RoleHuanHuaMdr = /** @class */ (function (_super) {
                __extends(RoleHuanHuaMdr, _super);
                function RoleHuanHuaMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", jiban.RoleHuanHuaView);
                    _this._curIdx = -1; //当前选中的
                    return _this;
                }
                RoleHuanHuaMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(205 /* ShoujiHuanhua */);
                    this._view.list_item.itemRenderer = jiban.RoleHuanHuaItem;
                    this._view.list_item.dataProvider = this._listData = new eui.ArrayCollection();
                };
                RoleHuanHuaMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_item, eui.ItemTapEvent.ITEM_TAP, this.onClickList, this);
                    addEventListener(this._view.btn_act, TouchEvent.TOUCH_TAP, this.onClickAct, this);
                    this.onNt("on_huanhua_info_update" /* ON_HUANHUA_INFO_UPDATE */, this.onUpdateView, this);
                    this.onNt("surface_info_update" /* SURFACE_INFO_UPDATE */, this.onUpdateSurfaceInfo, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.onUpdateAttr, this);
                };
                RoleHuanHuaMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateListData();
                };
                RoleHuanHuaMdr.prototype.updateListData = function () {
                    this._listData.replaceAll(this._proxy.getBodyJiBanCfgList());
                    this._view.list_item.selectedIndex = 0;
                    this._curIdx = 0;
                    this.updateView();
                };
                RoleHuanHuaMdr.prototype.onUpdateView = function () {
                    this._listData.replaceAll(this._proxy.getBodyJiBanCfgList());
                    // this._view.list_item.selectedIndex = this._curIdx;
                    this.updateView();
                };
                RoleHuanHuaMdr.prototype.updateView = function () {
                    if (!this._listData.source[this._curIdx]) {
                        return;
                    }
                    var cfg = this._listData.source[this._curIdx];
                    if (!cfg) {
                        return;
                    }
                    this._view.img_name.source = "role_huanhua_title" + cfg.index;
                    this._view.img_eff.source = "role_huanhua" + cfg.index;
                    this._curCfg = cfg;
                    this._view.nameItem.updateShow(cfg.name, cfg['quality'] || 1);
                    var info = this._proxy.getHuanHuaInfo(cfg.index);
                    this.onUpdateAttr();
                    var isAct = this._proxy.isActed(cfg.index);
                    if (isAct) {
                        this._view.img_acted.visible = true;
                        this._view.btn_act.visible = this._view.lb_actCond.visible = false;
                    }
                    else {
                        this._view.img_acted.visible = false;
                        this._view.btn_act.visible = this._view.lb_actCond.visible = true;
                    }
                    var fashionPart = cfg.fashion_part;
                    var rankInfo = {
                        fashion: fashionPart[2],
                        weapon: fashionPart[1],
                        wing: fashionPart[0],
                        sex: game.RoleVo.ins.sex
                    }; //性别取玩家性别
                    this.updateRankUIRole(this._view.gr_eff, rankInfo);
                    var actCnt = 0;
                    for (var i = 0; i < fashionPart.length; i++) {
                        var part = fashionPart[i];
                        var acted = false;
                        if (info && info.waixian_id && info.waixian_id.indexOf(part) > -1) {
                            acted = true;
                            actCnt++;
                        }
                        this.updateIconView(part, i, acted, this._proxy.canActHuanHuaIcon(this._curCfg.index, part));
                    }
                    if (this._view.lb_actCond.visible) {
                        var str = game.TextUtil.addColor("(" + actCnt + "/" + fashionPart.length + ")", actCnt >= fashionPart.length ? 2330156 /* GREEN */ : 16719376 /* RED */);
                        this._view.lb_actCond.textFlow = game.TextUtil.parseHtml("\u6FC0\u6D3B\u6761\u4EF6\uFF1A\u5957\u88C5\u6536\u96C6" + str);
                    }
                    var isHint = info && info.is_act && info.is_act == 1;
                    this._view.btn_act.setHint(isHint);
                };
                RoleHuanHuaMdr.prototype.onUpdateAttr = function () {
                    if (!this._listData.source[this._curIdx]) {
                        return;
                    }
                    var cfg = this._listData.source[this._curIdx];
                    if (!cfg) {
                        return;
                    }
                    var info = this._proxy.getHuanHuaInfo(cfg.index);
                    var isActed = info && info.is_act && info.is_act == 2;
                    var attr = mod.RoleUtil.getAttr(cfg.once_property);
                    var godRate = 0;
                    if (isActed) {
                        var xianluProxy = facade.retMod("41" /* Xianlu */).retProxy(186 /* Xianlu */);
                        var xianlvAttr = xianluProxy.xianpoattr;
                        //@yys
                        godRate = game.RoleVo.ins.getValueByKey("god_rate" /* god_rate */);
                        //godRate = xianlvAttr && xianlvAttr[AttrKey.god_rate] || 0;
                    }
                    var power = attr && attr.showpower ? attr.showpower.toNumber() : 0; // 战力
                    var godPower = attr && attr.god ? attr.god : 0; //仙力
                    if (godRate) {
                        power = power + power * godRate / 10000;
                        godPower = godPower + godPower * godRate / 10000;
                    }
                    this._view.power.setPowerValue(power);
                    this._view.godItem.updateGod(godPower);
                };
                RoleHuanHuaMdr.prototype.updateIconView = function (index, idx, isAct, hint) {
                    this._view["icon" + idx].data = {
                        index: index, idx: idx, isAct: isAct, hint: hint,
                        suitIndex: this._curCfg.index
                    };
                };
                RoleHuanHuaMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                RoleHuanHuaMdr.prototype.onClickList = function (e) {
                    this._curIdx = e.itemIndex;
                    this.updateView();
                };
                RoleHuanHuaMdr.prototype.onClickAct = function () {
                    if (!this._curCfg) {
                        return;
                    }
                    var info = this._proxy.getHuanHuaInfo(this._curCfg.index);
                    if (info && info.is_act == 1) {
                        this._proxy.c2s_huanhua_act(1, this._curCfg.index, null);
                    }
                    else {
                        game.PromptBox.getIns().show("\u6FC0\u6D3B\u6761\u4EF6\u4E0D\u8DB3");
                    }
                };
                RoleHuanHuaMdr.prototype.onUpdateSurfaceInfo = function (n) {
                    var type = n.body;
                    if (this._proxy.headTypes.indexOf(type) > -1) {
                        this.updateView();
                    }
                };
                return RoleHuanHuaMdr;
            }(game.EffectMdrBase));
            jiban.RoleHuanHuaMdr = RoleHuanHuaMdr;
            __reflect(RoleHuanHuaMdr.prototype, "game.mod.jiban.RoleHuanHuaMdr");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var TouchEvent = egret.TouchEvent;
            var ShenLingJiBanAwardMdr = /** @class */ (function (_super) {
                __extends(ShenLingJiBanAwardMdr, _super);
                function ShenLingJiBanAwardMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", jiban.ShenLingJiBanAwardView);
                    _this._rewardList = []; //能够一键领取的奖励
                    _this.isEasyHide = true;
                    return _this;
                }
                ShenLingJiBanAwardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    this._view.list.itemRenderer = jiban.ShenLingJiBanAwardItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                ShenLingJiBanAwardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_oneKey, TouchEvent.TOUCH_TAP, this.onClick, this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    this.onNt("on_shen_ling_ji_ban_update" /* ON_SHEN_LING_JI_BAN_UPDATE */, this.onUpdateInfo, this);
                };
                ShenLingJiBanAwardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._jiBanIndex = this._showArgs;
                    if (!this._jiBanIndex) {
                        return;
                    }
                    this.onUpdateInfo();
                };
                ShenLingJiBanAwardMdr.prototype.onUpdateInfo = function () {
                    var index = this._jiBanIndex;
                    var cfgs = this._proxy.getJiBanCfg(index);
                    var jiBanInfo = this._proxy.getJiBanInfo(index);
                    var rewardList = jiBanInfo && jiBanInfo.reward_list ? jiBanInfo.reward_list : [];
                    var list = [];
                    for (var i = 0; i < cfgs.length; i++) {
                        var cfg = cfgs[i];
                        if (!cfg) {
                            continue;
                        }
                        list.push({
                            index: cfg.jibanid,
                            cfg: cfg,
                            status: rewardList[i] || 0,
                            jiBanLv: jiBanInfo && jiBanInfo.level || 0
                        });
                    }
                    this._listData.replaceAll(list);
                    this._rewardList = [];
                    for (var i = 0; i < rewardList.length; i++) {
                        if (rewardList[i] == 1) {
                            this._rewardList.push(i + 1);
                        }
                    }
                    this._view.btn_oneKey.setHint(this._rewardList.length > 0);
                };
                ShenLingJiBanAwardMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                ShenLingJiBanAwardMdr.prototype.onClick = function () {
                    if (this._rewardList && this._rewardList.length) {
                        this._proxy.c2s_god_brother_groupup(this._showArgs, this._rewardList, null);
                    }
                };
                return ShenLingJiBanAwardMdr;
            }(game.MdrBase));
            jiban.ShenLingJiBanAwardMdr = ShenLingJiBanAwardMdr;
            __reflect(ShenLingJiBanAwardMdr.prototype, "game.mod.jiban.ShenLingJiBanAwardMdr");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var ShenLingJiBanMdr = /** @class */ (function (_super) {
                __extends(ShenLingJiBanMdr, _super);
                function ShenLingJiBanMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", jiban.ShenLingJiBanView);
                    return _this;
                }
                ShenLingJiBanMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    this._view.list.itemRenderer = jiban.ShenLingJiBanItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                ShenLingJiBanMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_shen_ling_ji_ban_update" /* ON_SHEN_LING_JI_BAN_UPDATE */, this.onUpdateInfo, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateListData, this);
                };
                ShenLingJiBanMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var attrIds = this.getJibanAttrIds();
                    if (mod.RoleUtil.checkAttrList(attrIds)) {
                        this.updateListData();
                    }
                    else {
                        mod.RoleUtil.getAttrList(attrIds); //请求回调刷新list
                        this.updateListData();
                    }
                };
                //羁绊属性列表
                ShenLingJiBanMdr.prototype.getJibanAttrIds = function () {
                    var idxList = this._proxy.getJiBanIdxList();
                    var list = [];
                    for (var _i = 0, idxList_1 = idxList; _i < idxList_1.length; _i++) {
                        var id = idxList_1[_i];
                        var cfgs = this._proxy.getJiBanCfg(id);
                        if (cfgs && cfgs[0] && cfgs[0].property && list.indexOf(cfgs[0].property) < 0) {
                            list.push(cfgs[0].property);
                        }
                    }
                    return list;
                };
                ShenLingJiBanMdr.prototype.updateListData = function () {
                    var idxList = this._proxy.getJiBanIdxList();
                    var listData = [];
                    var pos;
                    for (var i = 0; i < idxList.length; i++) {
                        var idx = idxList[i];
                        var cfgs = this._proxy.getJiBanCfg(idx);
                        var hint = this._proxy.getJibanHint(idx);
                        if (hint && pos == undefined) {
                            pos = i;
                        }
                        var itemData = {
                            index: idx,
                            info: this._proxy.getJiBanInfo(idx),
                            maxLv: cfgs.length
                        };
                        listData.push(itemData);
                    }
                    this._listData.source = listData;
                    if (pos != null) {
                        this.gotoPos(pos);
                    }
                };
                ShenLingJiBanMdr.prototype.onUpdateInfo = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    var num = this._listData.source.length;
                    for (var i = 0; i < num; i++) {
                        var data = this._listData.source[i];
                        if (data && data.index && data.index == msg.groupindex) {
                            data.info = msg;
                            this._listData.itemUpdated(data);
                            break;
                        }
                    }
                    var nextPos = this.getNextPos();
                    console.log("next pos: " + nextPos);
                    this.gotoPos(nextPos);
                };
                ShenLingJiBanMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._pos = null;
                };
                ShenLingJiBanMdr.prototype.gotoPos = function (pos) {
                    var _this = this;
                    if (pos == this._pos) {
                        return;
                    }
                    this._pos = pos;
                    var size = this._listData.source.length;
                    egret.callLater(function () {
                        mod.ScrollUtil.moveVToAssign(_this._view.scroller, pos, 335, 10, size);
                    }, this);
                };
                ShenLingJiBanMdr.prototype.getNextPos = function () {
                    var size = this._listData.source.length;
                    for (var i = 0; i < size; i++) {
                        var data = this._listData.source[i];
                        if (!data) {
                            continue;
                        }
                        var hint = this._proxy.getJibanHint(data.index);
                        if (hint) {
                            return i;
                        }
                    }
                    return this._pos;
                };
                return ShenLingJiBanMdr;
            }(game.MdrBase));
            jiban.ShenLingJiBanMdr = ShenLingJiBanMdr;
            __reflect(ShenLingJiBanMdr.prototype, "game.mod.jiban.ShenLingJiBanMdr");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var TianshenJibanMdr = /** @class */ (function (_super) {
                __extends(TianshenJibanMdr, _super);
                function TianshenJibanMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._headType = 640 /* Tianshen */; //子类重写
                    return _this;
                }
                return TianshenJibanMdr;
            }(jiban.JibanBaseMdr));
            jiban.TianshenJibanMdr = TianshenJibanMdr;
            __reflect(TianshenJibanMdr.prototype, "game.mod.jiban.TianshenJibanMdr");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var facade = base.facade;
            var XianjianJibanMdr = /** @class */ (function (_super) {
                __extends(XianjianJibanMdr, _super);
                function XianjianJibanMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._headType = 408 /* Xianjian */; //子类重写
                    return _this;
                }
                XianjianJibanMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._xianjianProxy = facade.retMod("46" /* Surface */).retProxy(239 /* Xianjian */);
                };
                XianjianJibanMdr.prototype.updateModel = function () {
                    var infos = this._selCfg.partners;
                    this._curStar = 0;
                    for (var i = 0; i < this._maxCnt; ++i) {
                        var item = this._view["item" + i];
                        item.visible = i <= infos.length - 1;
                        if (item.visible) {
                            var index = infos[i];
                            var itemData = {
                                headType: this._headType,
                                cfg: game.getConfigById(index),
                                jibanCfg: this._selCfg,
                                isActed: this.isJibanItemAct(this._selCfg.index, index),
                                showHint: this.canJibanItemAct(this._selCfg, index)
                            };
                            item.data = itemData;
                            var star = this.getStar(index);
                            this._curStar += Math.min(star, 1);
                        }
                    }
                    this._view.currentState = infos.length + "";
                    this._view.img_item.source = "surface_" + this._headType + "_" + this._selCfg.index;
                    this._maxStar = infos.length;
                };
                XianjianJibanMdr.prototype.onClickAct = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    if (!this._canAct) {
                        game.PromptBox.getIns().show(game.getLanById("jiban_tips1" /* jiban_tips1 */));
                        return;
                    }
                    this._xianjianProxy.c2s_fly_sword_operation(null, 5, this._selCfg.index);
                };
                /**羁绊icon数据*/
                XianjianJibanMdr.prototype.getJibanCfgList = function () {
                    var cfgList = this._proxy.getJibanCfgList(this._headType);
                    var list = [];
                    for (var _i = 0, cfgList_3 = cfgList; _i < cfgList_3.length; _i++) {
                        var cfg = cfgList_3[_i];
                        list.push({
                            cfg: cfg,
                            isActed: this.getAct(cfg.index),
                            showHint: this.getCanAct(cfg)
                        });
                    }
                    return list;
                };
                XianjianJibanMdr.prototype.getStar = function (index) {
                    return this._xianjianProxy.getInfo(index) ? 1 : 0;
                };
                XianjianJibanMdr.prototype.getAct = function (index) {
                    var info = this._xianjianProxy.jibans.find(function (v) {
                        return v.index == index;
                    });
                    return info && info.is_active_jiban;
                };
                XianjianJibanMdr.prototype.getCanAct = function (cfg) {
                    if (!cfg) {
                        cfg = this._selCfg;
                    }
                    return this._xianjianProxy.canJibanAct(cfg);
                };
                /**羁绊单个外显是否已激活*/
                XianjianJibanMdr.prototype.isJibanItemAct = function (index, rideIndex) {
                    var info = this._xianjianProxy.jibans.find(function (v) {
                        return v.index == index;
                    });
                    if (info && info.is_active_jiban) {
                        return true;
                    }
                    return info && info.ride_index && info.ride_index.indexOf(rideIndex) > -1;
                };
                /**羁绊外显是否可以激活*/
                XianjianJibanMdr.prototype.canJibanItemAct = function (cfg, index) {
                    if (this.isJibanItemAct(cfg.index, index)) {
                        return false;
                    }
                    return !!this._xianjianProxy.getInfo(index);
                };
                /**更新激活条件和激活状态*/
                XianjianJibanMdr.prototype.updateAct = function () {
                    _super.prototype.updateAct.call(this);
                    this._canAct = this.getCanAct();
                    this._view.btn_act.redPoint.visible = this._canAct;
                };
                return XianjianJibanMdr;
            }(jiban.JibanBaseMdr));
            jiban.XianjianJibanMdr = XianjianJibanMdr;
            __reflect(XianjianJibanMdr.prototype, "game.mod.jiban.XianjianJibanMdr");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var jiban;
        (function (jiban) {
            var YishouShouyinJibanMdr = /** @class */ (function (_super) {
                __extends(YishouShouyinJibanMdr, _super);
                function YishouShouyinJibanMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._headType = 606 /* Shouyin */;
                    return _this;
                }
                YishouShouyinJibanMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._yishouProxy = game.getProxy("62" /* Yishou */, 243 /* Yishou */);
                };
                YishouShouyinJibanMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_update_yishou_shouyin_jiban_info" /* ON_UPDATE_YISHOU_SHOUYIN_JIBAN_INFO */, this.onUpdateView, this);
                    this.offNt("surface_info_update" /* SURFACE_INFO_UPDATE */);
                    this.offNt("surface_jiban_info_update" /* SURFACE_JIBAN_INFO_UPDATE */);
                };
                YishouShouyinJibanMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                };
                YishouShouyinJibanMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                YishouShouyinJibanMdr.prototype.onUpdateView = function () {
                    var items = this.getJibanCfgList();
                    this._itemList.replaceAll(items);
                    this.updateModel();
                    this.updateAct();
                };
                YishouShouyinJibanMdr.prototype.getJibanCfgList = function () {
                    var cfgList = game.getConfigListByName("yishou_shouying_suit.json" /* YishouShouyinSuit */);
                    var list = [];
                    for (var _i = 0, cfgList_4 = cfgList; _i < cfgList_4.length; _i++) {
                        var cfg = cfgList_4[_i];
                        list.push({
                            cfg: cfg,
                            showHint: this._yishouProxy.getJibanHint(cfg.index),
                            isActed: this._yishouProxy.isJibanActed(cfg.index)
                        });
                    }
                    return list;
                };
                YishouShouyinJibanMdr.prototype.onClickAct = function () {
                    if (!this._selCfg) {
                        return;
                    }
                    var jibanIndex = this._selCfg.index;
                    if (!this._yishouProxy.canJibanAct(jibanIndex)) {
                        game.PromptBox.getIns().show(game.getLanById("jiban_tips1" /* jiban_tips1 */));
                        return;
                    }
                    this._yishouProxy.c2s_yishou_shouying_jiban(jibanIndex);
                };
                YishouShouyinJibanMdr.prototype.updateAct = function () {
                    var jibanIndex = this._selCfg.index;
                    var isActed = this._yishouProxy.isJibanActed(jibanIndex);
                    this._view.img_act.visible = isActed;
                    this._view.btn_act.visible = this._view.lab_tips.visible = !isActed;
                    if (isActed) {
                        return;
                    }
                    this._view.btn_act.setHint(this._yishouProxy.canJibanAct(jibanIndex));
                    var tipsStr = "[" + this._selCfg.name + "]" + game.getLanById("jiban_tips2" /* jiban_tips2 */);
                    var actedList = this._yishouProxy.getJibanIconActedList(jibanIndex);
                    var actedLen = actedList.length;
                    var totalLen = this._selCfg.partners.length;
                    tipsStr += game.TextUtil.addColor("(" + actedLen + "/" + totalLen + ")", actedLen >= totalLen ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(tipsStr);
                };
                YishouShouyinJibanMdr.prototype.updateModel = function () {
                    var jibanIndex = this._selCfg.index;
                    var infos = this._selCfg.partners;
                    for (var i = 0; i < this._maxCnt; ++i) {
                        var item = this._view["item" + i];
                        item.visible = i <= infos.length - 1;
                        if (item.visible) {
                            var index = infos[i];
                            var itemData = {
                                headType: this._headType,
                                cfg: game.getConfigById(index),
                                jibanCfg: this._selCfg,
                                isActed: this._yishouProxy.isJibanIconActed(jibanIndex, index),
                                showHint: this._yishouProxy.canJibanIconAct(jibanIndex, index)
                            };
                            item.data = itemData;
                        }
                    }
                    this._view.currentState = infos.length + "";
                    this._view.img_item.source = "surface_" + this._headType + "_" + this._selCfg.index;
                };
                YishouShouyinJibanMdr.prototype.updatePower = function () {
                    var attrId = this._selCfg['group_id'];
                    var attr = mod.RoleUtil.getAttr(attrId);
                    // let oneAttrId = this._selCfg['once_property'];
                    // let oneAttr = RoleUtil.getAttr(oneAttrId);
                    // let jibanIndex = this._selCfg.index;
                    // let infos = this._selCfg.partners;
                    // let actedCnt = 0;
                    // for (let i = 0; i < this._maxCnt; ++i) {
                    //     if (i <= infos.length - 1) {
                    //         let index = infos[i];
                    //         let isActed = this._yishouProxy.isJibanIconActed(jibanIndex, index);
                    //         if (isActed) {
                    //             actedCnt++;
                    //         }
                    //     }
                    // }
                    // oneAttr = TextUtil.calcAttr(oneAttr, actedCnt);
                    var power = 0;
                    var god = 0;
                    if (attr && attr.showpower) {
                        power += attr.showpower.toNumber();
                    }
                    // if (oneAttr && oneAttr.showpower) {
                    //     power += oneAttr.showpower.toNumber();
                    // }
                    if (attr && attr.god) {
                        god += attr.god;
                    }
                    // if (oneAttr && oneAttr.god) {
                    //     god += oneAttr.god;
                    // }
                    this._view.power.setPowerValue(power);
                    this._view.god_item.updateGod(god);
                };
                return YishouShouyinJibanMdr;
            }(jiban.JibanBaseMdr));
            jiban.YishouShouyinJibanMdr = YishouShouyinJibanMdr;
            __reflect(YishouShouyinJibanMdr.prototype, "game.mod.jiban.YishouShouyinJibanMdr");
        })(jiban = mod.jiban || (mod.jiban = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=jiban.js.map