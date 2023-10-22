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
        var store;
        (function (store) {
            var Handler = base.Handler;
            var TimeMgr = base.TimeMgr;
            var StoreType3Mdr = /** @class */ (function (_super) {
                __extends(StoreType3Mdr, _super);
                function StoreType3Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", store.StoreType3View);
                    _this._endTime = 0; // 结束时间戳
                    _this._getMoney = 0; //领取大奖的指定充值金额
                    //对应配置表类型，3每日，4每周
                    _this._type = 3 /* Daily */;
                    return _this;
                }
                StoreType3Mdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(56 /* Store */);
                    this._view.list.itemRenderer = store.StoreType3Item;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.img_bg.source = game.ResUtil.getUiPng('meirishangchengguanggaotu');
                };
                StoreType3Mdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_update_daily_weekly_info" /* ON_UPDATE_DAILY_WEEKLY_INFO */, this.onUpdateInfo, this);
                };
                StoreType3Mdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateInfo();
                    this._endTime = this.getEndTime();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                };
                StoreType3Mdr.prototype.getEndTime = function () {
                    return game.TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, 1);
                };
                StoreType3Mdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    TimeMgr.removeUpdateItem(this);
                };
                StoreType3Mdr.prototype.onUpdateInfo = function () {
                    this.updateListData();
                    this.updateBigRewardView();
                };
                StoreType3Mdr.prototype.updateListData = function () {
                    var cfgs = this._proxy.getDirectShopCfgList(this._type);
                    var list = [];
                    for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                        var cfg = cfgs_1[_i];
                        if (!mod.PayUtil.checkShowGift(cfg.product_id)) {
                            continue;
                        }
                        list.push({
                            cfg: cfg,
                            type: this.getPbType()
                        });
                    }
                    this._listData.replaceAll(list);
                };
                StoreType3Mdr.prototype.updateBigRewardView = function () {
                    var pbType = this.getPbType();
                    var id = "direct_shop_big_award" + pbType;
                    var cfg = game.GameConfig.getParamConfigById(id);
                    if (!cfg) {
                        return;
                    }
                    this._view.icon_bigreward.data = cfg.value[0];
                    this._view.icon_bigreward.setClickHandler(Handler.alloc(this, this.getBigReward));
                    var info = this._proxy.model.infos[pbType];
                    var change = info ? info.change : 0;
                    var money = cfg.value[1];
                    this._getMoney = money;
                    this._view.bar.show(change, money, false, 0, false, 1 /* Value */);
                    this._view.icon_bigreward.setHint(change >= money);
                };
                StoreType3Mdr.prototype.getBigReward = function () {
                    var pbType = this.getPbType();
                    var info = this._proxy.model.infos[pbType];
                    if (info && info.change >= this._getMoney) {
                        this._proxy.c2s_daily_mall_get_award(pbType);
                    }
                    else {
                        var id = "direct_shop_big_award" + pbType;
                        var cfg = game.GameConfig.getParamConfigById(id);
                        if (!cfg) {
                            return;
                        }
                        mod.ViewMgr.getIns().showPropTips(cfg.value[0]);
                    }
                };
                StoreType3Mdr.prototype.getPbType = function () {
                    return game.DirectType2PbType[this._type];
                };
                StoreType3Mdr.prototype.update = function (time) {
                    var leftTime = this._endTime - time.serverTimeSecond;
                    if (leftTime <= 0) {
                        return;
                    }
                    var formatStr = this._type == 3 /* Daily */ ? 'HH时mm分' : 'dd天HH时';
                    this._view.lb_time.textFlow = game.TextUtil.parseHtml(game.getLanById("battle_cue40" /* battle_cue40 */) + "\uFF1A" + game.TimeUtil.formatSecond(leftTime, formatStr));
                };
                return StoreType3Mdr;
            }(game.MdrBase));
            store.StoreType3Mdr = StoreType3Mdr;
            __reflect(StoreType3Mdr.prototype, "game.mod.store.StoreType3Mdr", ["base.UpdateItem"]);
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var StoreType2Item = /** @class */ (function (_super) {
                __extends(StoreType2Item, _super);
                function StoreType2Item() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.store.StoreType2ItemSkin";
                    return _this;
                }
                StoreType2Item.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("29" /* Store */, 56 /* Store */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
                };
                StoreType2Item.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                StoreType2Item.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    var no_mul = this._proxy.model.no_multi_product_ids.indexOf(data.product_id) > -1;
                    this.img_tag.visible = no_mul ? false : !!data.param1;
                    if (this.img_tag.visible) {
                        this.img_tag.source = data.param1 + "beifanli";
                    }
                    var cfg = game.GameConfig.getPropConfigById(1450000002 /* Xianyu */);
                    this.img_cost.source = cfg.icon;
                    var rmb = mod.PayUtil.getRmbValue(data.product_id);
                    var cfgList = game.getConfigByNameId("direct_shop.json" /* DirectShop */, 1 /* Xianyu */);
                    var dsCfg = cfgList[data.product_id];
                    var rate = dsCfg.param1 || 1;
                    this.addBmpFont((rmb * 10 * rate) + '', game.BmpTextCfg[213 /* XianYu */], this.gr_num, true, 1, false, 0, true);
                    this.img_icon.source = "xianyu_icon" + data.product_id % 100;
                    this.btn_buy.label = rmb + "\u5143";
                };
                StoreType2Item.prototype.onClick = function () {
                    mod.PayUtil.pay(this.data.product_id);
                };
                return StoreType2Item;
            }(mod.BaseRenderer));
            store.StoreType2Item = StoreType2Item;
            __reflect(StoreType2Item.prototype, "game.mod.store.StoreType2Item");
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var StoreModel = /** @class */ (function () {
                function StoreModel() {
                    var _a;
                    /**=========== 藏宝阁 ===========*/
                    this.treasureInfos = {};
                    /**=========== 仙玉商城 ===========*/
                    /** 存在代表没有倍数 */
                    this.no_multi_product_ids = [];
                    /** 1 代表没有 */
                    this.no_first_charge = 0;
                    /** 每日礼包领取状态 1:已领取 0:未领取 */
                    this.daily_reward_state = 0;
                    /**=========== 1每日商城，2每周商城 ===========*/
                    this.infos = {};
                    /**红点路径*/
                    this.storeHint = (_a = {},
                        _a["01" /* Btn1 */] = ["29" /* Store */, "01" /* StoreMain */, "01" /* Btn1 */],
                        _a["03" /* Btn3 */] = ["29" /* Store */, "01" /* StoreMain */, "03" /* Btn3 */],
                        _a["04" /* Btn4 */] = ["29" /* Store */, "01" /* StoreMain */, "04" /* Btn4 */] //藏宝阁红点路径
                    ,
                        _a);
                }
                return StoreModel;
            }());
            store.StoreModel = StoreModel;
            __reflect(StoreModel.prototype, "game.mod.store.StoreModel");
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var c2s_treasure_house_info = msg.c2s_treasure_house_info;
            var c2s_treasure_house_buy_prop = msg.c2s_treasure_house_buy_prop;
            var s2c_treasure_house_info = msg.s2c_treasure_house_info;
            var c2s_open_charge_ui = msg.c2s_open_charge_ui;
            var s2c_open_charge_ui = msg.s2c_open_charge_ui;
            var c2s_daily_mall_get_award = msg.c2s_daily_mall_get_award;
            var s2c_daily_mall_info = msg.s2c_daily_mall_info;
            /**
             * @description 商城系统
             */
            var StoreProxy = /** @class */ (function (_super) {
                __extends(StoreProxy, _super);
                function StoreProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.typeMap = {};
                    return _this;
                }
                Object.defineProperty(StoreProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                StoreProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new store.StoreModel();
                    this.onProto(s2c_treasure_house_info, this.s2c_treasure_house_info, this);
                    this.onProto(s2c_open_charge_ui, this.s2c_open_charge_ui, this);
                    this.onProto(s2c_daily_mall_info, this.s2c_daily_mall_info, this);
                };
                /**请求商品信息, type1*/
                StoreProxy.prototype.c2s_treasure_house_info = function () {
                    this.sendProto(new c2s_treasure_house_info());
                };
                /**
                 * 购买商品 type1
                 * @param index 商品编号
                 * @param cnt 购买数量
                 */
                StoreProxy.prototype.c2s_treasure_house_buy_prop = function (index, cnt) {
                    if (cnt === void 0) { cnt = 1; }
                    var msg = new c2s_treasure_house_buy_prop();
                    msg.index = index;
                    msg.buy_cnt = cnt;
                    this.sendProto(msg);
                };
                /**返回商品信息 type1*/
                StoreProxy.prototype.s2c_treasure_house_info = function (n) {
                    var msg = n.body;
                    this._model.treasureInfos = {};
                    if (msg.infos != null) {
                        for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this._model.treasureInfos[info.index] = info;
                        }
                    }
                    this.updateStoreHint1();
                    this.sendNt("on_update_type_info_1" /* ON_UPDATE_TYPE_INFO_1 */);
                };
                /**充值，仙玉商城*/
                StoreProxy.prototype.c2s_open_charge_ui = function () {
                    this.sendProto(new c2s_open_charge_ui());
                };
                /**充值回调*/
                StoreProxy.prototype.s2c_open_charge_ui = function (n) {
                    var msg = n.body;
                    if (msg.no_first_charge != null) {
                        this._model.no_first_charge = msg.no_first_charge;
                    }
                    if (msg.daily_reward_state != null) {
                        this._model.daily_reward_state = msg.daily_reward_state;
                    }
                    if (msg.oper != null && msg.oper == 1) {
                        this._model.no_multi_product_ids = [];
                    }
                    if (msg.no_multi_product_ids != null) {
                        this._model.no_multi_product_ids = msg.no_multi_product_ids;
                    }
                    this.sendNt("on_update_charge_info" /* ON_UPDATE_CHARGE_INFO */);
                };
                /**
                 * 每日、每周商城
                 * 领取大奖
                 * @param type 1 每日 2 每周
                 */
                StoreProxy.prototype.c2s_daily_mall_get_award = function (type) {
                    var msg = new c2s_daily_mall_get_award();
                    msg.type = type;
                    this.sendProto(msg);
                };
                /**每日、每周商城*/
                StoreProxy.prototype.s2c_daily_mall_info = function (n) {
                    var msg = n.body;
                    if (msg.is_new_day != null && msg.is_new_day == 1) {
                        this._model.infos = {};
                    }
                    if (msg.infos != null) {
                        for (var _i = 0, _a = msg.infos; _i < _a.length; _i++) {
                            var info = _a[_i];
                            this._model.infos[info.type] = info;
                        }
                    }
                    this.updateStoreHint3();
                    this.sendNt("on_update_daily_weekly_info" /* ON_UPDATE_DAILY_WEEKLY_INFO */);
                };
                /**==========================================================================*/
                /**根据类型获取不同的商品id配置*/
                StoreProxy.prototype.getDirectShopCfgList = function (type) {
                    return mod.StoreUtil.getDirectShopCfgListByType(type);
                };
                StoreProxy.prototype.getTypeCfgList = function (type) {
                    if (this.typeMap[type]) {
                        return this.typeMap[type];
                    }
                    var cfgs = game.getConfigListByName("shop.json" /* Store */);
                    for (var _i = 0, cfgs_2 = cfgs; _i < cfgs_2.length; _i++) {
                        var cfg = cfgs_2[_i];
                        if (!this.typeMap[cfg.type]) {
                            this.typeMap[cfg.type] = [];
                        }
                        this.typeMap[cfg.type].push(cfg);
                    }
                    return this.typeMap[type];
                };
                /**藏宝阁能展示的配置*/
                StoreProxy.prototype.getShowCfgListForType1 = function () {
                    var info = this._model.treasureInfos;
                    var sortNum = [];
                    for (var key in info) {
                        var cfg = game.getConfigByNameId("shop.json" /* Store */, +key);
                        if (cfg && sortNum.indexOf(cfg.sort) < 0) {
                            sortNum.push(cfg.sort);
                        }
                    }
                    var rst = [];
                    var cfgs = this.getTypeCfgList(1 /* Cangbaoge */);
                    cfgs.sort(function (a, b) { return a.sort - b.sort; });
                    var addSort = []; //已添加的排序
                    for (var _i = 0, cfgs_3 = cfgs; _i < cfgs_3.length; _i++) {
                        var cfg = cfgs_3[_i];
                        if (!mod.StoreUtil.checkStoreCfgShow(cfg)) {
                            continue;
                        }
                        //sort相同的只能存在一个
                        if (sortNum.indexOf(cfg.sort) > -1 && !info[cfg.index]) {
                            continue;
                        }
                        if (addSort.indexOf(cfg.sort) > -1) {
                            continue;
                        }
                        addSort.push(cfg.sort);
                        rst.push(cfg);
                    }
                    return rst;
                };
                /**
                 * 每日、每周商城的购买信息
                 * @param type 1每日，2每周
                 * @param index
                 */
                StoreProxy.prototype.getShopBuyInfo = function (type, index) {
                    var info = this._model.infos[type];
                    if (!info || !info.shop_info) {
                        return null;
                    }
                    for (var _i = 0, _a = info.shop_info; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item.index == index) {
                            return item;
                        }
                    }
                    return null;
                };
                //已购买次数 type 1每日，2每周
                StoreProxy.prototype.getBoughtCnt = function (type, index) {
                    var info = this.getShopBuyInfo(type, index);
                    return info && info.bought_cnt || 0;
                };
                //是否售罄 type 1每日，2每周
                StoreProxy.prototype.isSoldOut = function (type, index) {
                    var boughtCnt = this.getBoughtCnt(type, index);
                    var directType = type == 1 ? 3 /* Daily */ : 4 /* Weekly */;
                    var directCfgObj = game.getConfigByNameId("direct_shop.json" /* DirectShop */, directType);
                    var totalCnt = 0;
                    if (directCfgObj && directCfgObj[index]) {
                        var directCfg = directCfgObj[index];
                        totalCnt = directCfg.param1;
                    }
                    return boughtCnt >= totalCnt;
                };
                /**===================================== hint =====================================*/
                StoreProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    // 仙玉更新，vip变化
                    if (keys.indexOf("diamond" /* diamond */) > -1
                        || keys.indexOf("vip_lv" /* vip_lv */) > -1) {
                        this.updateStoreHint1();
                    }
                };
                /**藏宝阁红点*/
                StoreProxy.prototype.updateStoreHint1 = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670138 /* Store */)) {
                        return;
                    }
                    var cfgs = this.getShowCfgListForType1();
                    var hint = false;
                    for (var _i = 0, cfgs_4 = cfgs; _i < cfgs_4.length; _i++) {
                        var cfg = cfgs_4[_i];
                        var info = this._model.treasureInfos[cfg.index];
                        var bought_cnt = info && info.bought_cnt || 0; //已购买次数
                        var left_cnt = cfg.lmt_cnt - bought_cnt; //剩余购买次数
                        var cost_cnt = cfg.price;
                        if (cfg.discount) {
                            cost_cnt = Math.floor(cfg.price * cfg.discount / 10000);
                        }
                        if (left_cnt > 0 && mod.BagUtil.checkPropCnt(cfg.coin_type, cost_cnt)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.storeHint["01" /* Btn1 */]);
                };
                /**每日商城，每周商城红点*/
                StoreProxy.prototype.updateStoreHint3 = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670149 /* StoreDaily */)) {
                        return;
                    }
                    var directTypes = [3 /* Daily */, 4 /* Weekly */];
                    for (var _i = 0, directTypes_1 = directTypes; _i < directTypes_1.length; _i++) {
                        var directType = directTypes_1[_i];
                        var directCfgs = this.getDirectShopCfgList(directType);
                        var pbType = game.DirectType2PbType[directType];
                        var btnType = pbType == 1 ? "03" /* Btn3 */ : "04" /* Btn4 */;
                        //0元购买红点
                        var hint = false;
                        for (var _a = 0, directCfgs_1 = directCfgs; _a < directCfgs_1.length; _a++) {
                            var cfg = directCfgs_1[_a];
                            var rmb = mod.PayUtil.getRmbValue(cfg.product_id);
                            var isSoldOut = this.isSoldOut(pbType, cfg.product_id);
                            if (rmb == 0 && !isSoldOut) {
                                hint = true;
                                break;
                            }
                        }
                        if (!hint) {
                            //大奖红点
                            var info = this._model.infos[pbType];
                            if (info) {
                                var change = info && info.change || 0;
                                var cfg = game.GameConfig.getParamConfigById("direct_shop_big_award" + pbType);
                                var money = cfg && cfg.value[1] || 0;
                                hint = change >= money;
                            }
                        }
                        mod.HintMgr.setHint(hint, this._model.storeHint[btnType]);
                    }
                };
                StoreProxy.prototype.onOpenFuncUpdate = function (n) {
                    var addIdxs = n.body;
                    if (addIdxs.indexOf(1041670138 /* Store */) > -1) {
                        this.updateStoreHint1();
                    }
                    if (addIdxs.indexOf(1041670149 /* StoreDaily */) > -1) {
                        this.updateStoreHint3();
                    }
                };
                return StoreProxy;
            }(game.ProxyBase));
            store.StoreProxy = StoreProxy;
            __reflect(StoreProxy.prototype, "game.mod.store.StoreProxy");
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var facade = base.facade;
            var StoreBarView = /** @class */ (function (_super) {
                __extends(StoreBarView, _super);
                function StoreBarView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.store.StoreBarSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    _this._hub = new game.UIEftHub(_this);
                    return _this;
                }
                StoreBarView.prototype.onAddToStage = function () {
                    this._proxy = game.getProxy("28" /* Vip */, 51 /* Vip */);
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.btn_charge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    facade.onNt("update_vip_info" /* UPDATE_VIP_INFO */, this.updateView, this);
                    this.updateView();
                };
                StoreBarView.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.btn_charge.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
                    facade.offNt("update_vip_info" /* UPDATE_VIP_INFO */, this.updateView, this);
                };
                StoreBarView.prototype.onClick = function () {
                    mod.ViewMgr.getIns().openVipView();
                };
                StoreBarView.prototype.updateView = function () {
                    var idx = this._proxy.getIdx();
                    var exp = this._proxy.getExp();
                    var vipLv = mod.VipUtil.getShowVipLv(idx);
                    this._hub.addBmpFont(vipLv + '', game.BmpTextCfg[211 /* Vip1 */], this.gr_vip, true, 1, true);
                    //满级vip
                    if (this._proxy.isMaxVip()) {
                        this.bar.show(exp, exp, false);
                        this._hub.clearFont(this.gr_vipNum, true);
                        this._hub.clearFont(this.gr_vipFont, true);
                        this.img_desc.source = 'ninyidadaozuigaoVIPdengji';
                        this.img_desc0.visible = false;
                        return;
                    }
                    var cfg = game.getConfigByNameId("vip.json" /* Vip */, idx);
                    this.bar.show(exp, cfg.levelup_exp, false);
                    var left = Math.floor((cfg.levelup_exp - exp) / 100); //钱:经验=1:100
                    //需要充值多少钱到下一级
                    this._hub.addBmpFont(left + '', game.BmpTextCfg[210 /* Vip */], this.gr_vipNum, true, 1, false, 0, true);
                    //下一级
                    this._hub.addBmpFont((vipLv + 1) + '', game.BmpTextCfg[210 /* Vip */], this.gr_vipFont);
                    this.img_desc.source = 'zaichongzhi';
                    this.img_desc0.visible = true;
                };
                return StoreBarView;
            }(eui.Component));
            store.StoreBarView = StoreBarView;
            __reflect(StoreBarView.prototype, "game.mod.store.StoreBarView");
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var StorePriceItem = /** @class */ (function (_super) {
                __extends(StorePriceItem, _super);
                function StorePriceItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.store.StorePriceItemSkin";
                    return _this;
                }
                /**
                 * @param idx 消耗货币
                 * @param price 价格
                 * @param showDel 展示删除线，默认false
                 */
                StorePriceItem.prototype.updateView = function (idx, price, showDel) {
                    if (showDel === void 0) { showDel = false; }
                    var cfg = game.GameConfig.getPropConfigById(idx);
                    this.img_price.source = cfg.icon;
                    this.lb_price.text = price + '';
                    this.rect_del.visible = showDel;
                    var txt = price + '';
                    if (!showDel) {
                        txt = game.TextUtil.addColor(txt, 2330156 /* GREEN */);
                    }
                    this.lb_price.textFlow = game.TextUtil.parseHtml(txt);
                };
                return StorePriceItem;
            }(eui.Component));
            store.StorePriceItem = StorePriceItem;
            __reflect(StorePriceItem.prototype, "game.mod.store.StorePriceItem");
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var Handler = base.Handler;
            var StoreType1Item = /** @class */ (function (_super) {
                __extends(StoreType1Item, _super);
                function StoreType1Item() {
                    var _this = _super.call(this) || this;
                    _this._cost = 0; //消耗数量
                    _this._leftCnt = 0;
                    _this.skinName = "skins.store.StoreType1ItemSkin";
                    return _this;
                }
                StoreType1Item.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("29" /* Store */, 56 /* Store */);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
                };
                StoreType1Item.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                StoreType1Item.prototype.dataChanged = function () {
                    var cfg = this.data;
                    if (!cfg) {
                        return;
                    }
                    this.icon.data = cfg.prop[0];
                    var propCfg = game.GameConfig.getPropConfigById(cfg.prop[0][0]);
                    var name = game.TextUtil.truncateString(propCfg.name);
                    this.lb_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(name, game.ColorUtil.getColorByQuality1(propCfg.quality)));
                    this.lb_cnt.visible = cfg.lmt_type != 0;
                    var info = this._proxy.model.treasureInfos[cfg.index];
                    var bought_cnt = info ? info.bought_cnt : 0; //已购买次数
                    var lmt_cnt = cfg.lmt_cnt; //限购次数
                    var left_cnt = lmt_cnt - bought_cnt; //剩余购买次数
                    this._leftCnt = left_cnt;
                    var str = cfg.lmt_type == 1 ? game.getLanById("store5" /* store5 */) : (cfg.lmt_type == 2 ? game.getLanById("store6" /* store6 */) : game.getLanById("store7" /* store7 */));
                    this.lb_cnt.textFlow = game.TextUtil.parseHtml(str + game.TextUtil.addColor(left_cnt + "/" + lmt_cnt, left_cnt > 0 ? 2330156 /* GREEN */ : 16719376 /* RED */));
                    if (cfg.discount) {
                        this.priceItem0.updateView(cfg.coin_type, cfg.price, true);
                        this.priceItem1.visible = true;
                        this._cost = Math.floor(cfg.price * cfg.discount / 10000);
                        this.priceItem1.updateView(cfg.coin_type, this._cost, false);
                    }
                    else {
                        this._cost = cfg.price;
                        this.priceItem0.updateView(cfg.coin_type, cfg.price, false);
                        this.priceItem1.visible = false;
                    }
                    this.btn_buy.visible = left_cnt > 0;
                    this.img_bought.visible = left_cnt <= 0;
                    if (left_cnt > 0) {
                        this.btn_buy.setHint(mod.BagUtil.checkPropCnt(cfg.coin_type, this._cost));
                    }
                    this.img_tag.visible = !!cfg.tag;
                    if (cfg.tag) {
                        this.img_tag.source = cfg.tag;
                    }
                };
                StoreType1Item.prototype.onClick = function () {
                    mod.ViewMgr.getIns().openStoreBuyTips(this.data.index, this._leftCnt, Handler.alloc(this._proxy, this._proxy.c2s_treasure_house_buy_prop, [this.data.index]));
                };
                return StoreType1Item;
            }(mod.BaseListenerRenderer));
            store.StoreType1Item = StoreType1Item;
            __reflect(StoreType1Item.prototype, "game.mod.store.StoreType1Item");
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var StoreType1View = /** @class */ (function (_super) {
                __extends(StoreType1View, _super);
                function StoreType1View() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.store.StoreType1Skin";
                    return _this;
                }
                return StoreType1View;
            }(eui.Component));
            store.StoreType1View = StoreType1View;
            __reflect(StoreType1View.prototype, "game.mod.store.StoreType1View");
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var StoreMod = /** @class */ (function (_super) {
                __extends(StoreMod, _super);
                function StoreMod() {
                    return _super.call(this, "29" /* Store */) || this;
                }
                StoreMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                StoreMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(56 /* Store */, store.StoreProxy);
                };
                StoreMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* StoreMain */, store.StoreMainMdr);
                    this.regMdr("02" /* StoreBuyTips */, mod.StoreBuyTipsMdr);
                };
                return StoreMod;
            }(game.ModBase));
            store.StoreMod = StoreMod;
            __reflect(StoreMod.prototype, "game.mod.store.StoreMod");
            gso.modCls.push(StoreMod);
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var StoreType2View = /** @class */ (function (_super) {
                __extends(StoreType2View, _super);
                function StoreType2View() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.store.StoreType2Skin";
                    return _this;
                }
                return StoreType2View;
            }(eui.Component));
            store.StoreType2View = StoreType2View;
            __reflect(StoreType2View.prototype, "game.mod.store.StoreType2View");
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var StoreType3Item = /** @class */ (function (_super) {
                __extends(StoreType3Item, _super);
                function StoreType3Item() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.store.StoreType3ItemSkin";
                    return _this;
                }
                StoreType3Item.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("29" /* Store */, 56 /* Store */);
                    this.list.itemRenderer = mod.Icon;
                    this.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_buy, this.onClick, this);
                };
                StoreType3Item.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                };
                StoreType3Item.prototype.dataChanged = function () {
                    if (!this.data || !this.data.cfg) {
                        return;
                    }
                    var cfg = this.data.cfg;
                    this.img_icon.source = "xianyu_icon" + cfg.product_id % 100;
                    var rewards = mod.PayUtil.getRewards(cfg.product_id) || [];
                    this._listData.replaceAll(rewards.slice());
                    var bought_cnt = this._proxy.getBoughtCnt(this.data.type, cfg.product_id);
                    var isSoldOut = bought_cnt >= cfg.param1; //购买完全部
                    var left_cnt = cfg.param1 - bought_cnt;
                    var str = isSoldOut ? game.getLanById("tongtiange_tips7" /* tongtiange_tips7 */)
                        : game.getLanById("tongtiange_tips8" /* tongtiange_tips8 */) + game.TextUtil.addColor(left_cnt + "/" + cfg.param1, left_cnt >= 0 ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this.lb_limit.textFlow = game.TextUtil.parseHtml(str);
                    var rmb = mod.PayUtil.getRmbValue(cfg.product_id);
                    this.img_bought.visible = isSoldOut;
                    this.btn_buy.visible = !isSoldOut;
                    this.btn_buy.label = rmb == 0 ? game.getLanById("bosshome_tips5" /* bosshome_tips5 */) : (rmb + mod.PayUtil.getRmbUnit());
                    //0元购红点
                    if (!isSoldOut) {
                        this.btn_buy.setHint(rmb == 0);
                    }
                };
                StoreType3Item.prototype.onClick = function () {
                    if (this.data && this.data.cfg) {
                        mod.PayUtil.pay(this.data.cfg.product_id);
                    }
                };
                return StoreType3Item;
            }(mod.BaseListenerRenderer));
            store.StoreType3Item = StoreType3Item;
            __reflect(StoreType3Item.prototype, "game.mod.store.StoreType3Item");
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var StoreType3View = /** @class */ (function (_super) {
                __extends(StoreType3View, _super);
                function StoreType3View() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.store.StoreType3Skin";
                    return _this;
                }
                return StoreType3View;
            }(eui.Component));
            store.StoreType3View = StoreType3View;
            __reflect(StoreType3View.prototype, "game.mod.store.StoreType3View");
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var TimeMgr = base.TimeMgr;
            var StoreType1Mdr = /** @class */ (function (_super) {
                __extends(StoreType1Mdr, _super);
                function StoreType1Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", store.StoreType1View);
                    _this._endTime = 0; //结束时间
                    return _this;
                }
                StoreType1Mdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(56 /* Store */);
                    this._view.list.itemRenderer = store.StoreType1Item;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                StoreType1Mdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_update_type_info_1" /* ON_UPDATE_TYPE_INFO_1 */, this.onUpdateInfo, this);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                };
                StoreType1Mdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._endTime = game.TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, 1);
                    this.updateListData();
                    this.updateBigReward();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.update(TimeMgr.time);
                };
                StoreType1Mdr.prototype.updateListData = function () {
                    var cfgs = this._proxy.getShowCfgListForType1();
                    this._listData.replaceAll(cfgs.slice());
                };
                StoreType1Mdr.prototype.onUpdateInfo = function () {
                    this.updateListData();
                };
                StoreType1Mdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    TimeMgr.removeUpdateItem(this);
                };
                StoreType1Mdr.prototype.updateBigReward = function () {
                    var cfg = game.GameConfig.getParamConfigById('store_big_reward');
                    if (cfg) {
                        this._view.icon_bigreward.data = cfg.value;
                    }
                };
                StoreType1Mdr.prototype.update = function (time) {
                    var leftTime = this._endTime - time.serverTimeSecond;
                    if (leftTime < 0) {
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    this._view.lb_time.textFlow = game.TextUtil.parseHtml(game.getLanById("battle_cue40" /* battle_cue40 */) + "\uFF1A" + game.TimeUtil.formatSecond(leftTime, 'HH时mm分'));
                };
                StoreType1Mdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("vip_lv" /* vip_lv */) > -1) {
                        this.updateListData();
                    }
                };
                return StoreType1Mdr;
            }(game.MdrBase));
            store.StoreType1Mdr = StoreType1Mdr;
            __reflect(StoreType1Mdr.prototype, "game.mod.store.StoreType1Mdr", ["base.UpdateItem"]);
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var StoreType2Mdr = /** @class */ (function (_super) {
                __extends(StoreType2Mdr, _super);
                function StoreType2Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", store.StoreType2View);
                    return _this;
                }
                StoreType2Mdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(56 /* Store */);
                    this._view.list.itemRenderer = store.StoreType2Item;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                };
                StoreType2Mdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_update_charge_info" /* ON_UPDATE_CHARGE_INFO */, this.onUpdateInfo, this);
                };
                StoreType2Mdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateListData();
                };
                StoreType2Mdr.prototype.updateListData = function () {
                    this._listData.replaceAll(this._proxy.getDirectShopCfgList(1 /* Xianyu */));
                };
                StoreType2Mdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                StoreType2Mdr.prototype.onUpdateInfo = function () {
                    this.updateListData();
                };
                return StoreType2Mdr;
            }(game.MdrBase));
            store.StoreType2Mdr = StoreType2Mdr;
            __reflect(StoreType2Mdr.prototype, "game.mod.store.StoreType2Mdr");
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var StoreMainMdr = /** @class */ (function (_super) {
                __extends(StoreMainMdr, _super);
                function StoreMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Btn1 */,
                            icon: "cangbaogetubiao",
                            mdr: store.StoreType1Mdr,
                            title: "商城",
                            bg: "shangcheng_bg",
                            openIdx: 1041670138 /* Store */,
                            hintTypes: ["29" /* Store */, "01" /* StoreMain */, "01" /* Btn1 */]
                        },
                        {
                            btnType: "02" /* Btn2 */,
                            icon: "xianyushangchengtubiao",
                            mdr: store.StoreType2Mdr,
                            title: "商城",
                            bg: "shangcheng_bg",
                            openIdx: 1041670148 /* StoreXianyu */
                        },
                        {
                            btnType: "03" /* Btn3 */,
                            icon: "meirishangchengtubiao",
                            mdr: store.StoreType3Mdr,
                            title: "商城",
                            bg: "shangcheng_bg",
                            openIdx: 1041670149 /* StoreDaily */,
                            hintTypes: ["29" /* Store */, "01" /* StoreMain */, "03" /* Btn3 */]
                        },
                        {
                            btnType: "04" /* Btn4 */,
                            icon: "meizhoushangchengtubiao",
                            mdr: store.StoreType4Mdr,
                            title: "商城",
                            bg: "shangcheng_bg",
                            openIdx: 1041670149 /* StoreDaily */,
                            hintTypes: ["29" /* Store */, "01" /* StoreMain */, "04" /* Btn4 */]
                        }
                    ];
                    return _this;
                }
                return StoreMainMdr;
            }(mod.WndBaseMdr));
            store.StoreMainMdr = StoreMainMdr;
            __reflect(StoreMainMdr.prototype, "game.mod.store.StoreMainMdr");
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var store;
        (function (store) {
            var TimeMgr = base.TimeMgr;
            var StoreType4Mdr = /** @class */ (function (_super) {
                __extends(StoreType4Mdr, _super);
                function StoreType4Mdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._type = 4 /* Weekly */; //对应配置表类型，3每日，4每周
                    return _this;
                }
                StoreType4Mdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.img_bg.source = game.ResUtil.getUiPng('meizhoushangchengguanggaotu');
                };
                //下周一0点
                StoreType4Mdr.prototype.getEndTime = function () {
                    var time = TimeMgr.time.serverTime;
                    var date = new Date(time);
                    var day = date.getDay();
                    if (day == 0) {
                        day = 7;
                    }
                    var leftDay = 7 - day + 1; //间隔天数
                    return game.TimeUtil.getNextDayTime(TimeMgr.time.serverTimeSecond, false, leftDay);
                };
                return StoreType4Mdr;
            }(store.StoreType3Mdr));
            store.StoreType4Mdr = StoreType4Mdr;
            __reflect(StoreType4Mdr.prototype, "game.mod.store.StoreType4Mdr");
        })(store = mod.store || (mod.store = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=store.js.map