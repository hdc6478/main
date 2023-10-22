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
        var gift;
        (function (gift) {
            var GiftMod = /** @class */ (function (_super) {
                __extends(GiftMod, _super);
                function GiftMod() {
                    return _super.call(this, "53" /* Gift */) || this;
                }
                GiftMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                GiftMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(201 /* Gift */, gift.GiftProxy);
                };
                GiftMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* Main */, gift.GiftMainMdr);
                };
                return GiftMod;
            }(game.ModBase));
            gift.GiftMod = GiftMod;
            __reflect(GiftMod.prototype, "game.mod.gift.GiftMod");
            gso.modCls.push(GiftMod);
        })(gift = mod.gift || (mod.gift = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var gift;
        (function (gift) {
            var GiftModel = /** @class */ (function () {
                function GiftModel() {
                    var _a, _b, _c, _d;
                    /**礼包类型数据*/
                    this.giftMap = {};
                    //todo 配置
                    /**红点路径*/
                    this.giftTypes = (_a = {},
                        _a[1 /* Yuanling */] = ["53" /* Gift */, "01" /* Main */, 1 /* Yuanling */ + ''],
                        _a[7 /* Ring */] = ["58" /* Xianyuan */, "15" /* RingMain */, "01" /* Yuanjie */, "01" /* Main */],
                        _a[8 /* XianLvJinJie */] = ["41" /* Xianlu */, "01" /* XianluMain */, "01" /* Xiuxian */, "01" /* Main */],
                        _a);
                    /**icon资源*/
                    this.iconTypes = (_b = {},
                        _b[1 /* Yuanling */] = 'mubiaofanlibiaoqiantubiao',
                        _b[7 /* Ring */] = 'meizhoushangchengtubiao',
                        _b[8 /* XianLvJinJie */] = 'xiuxianlibaobiaoqiantubiao',
                        _b);
                    /**标题*/
                    this.titleTypes = (_c = {},
                        _c[1 /* Yuanling */] = "yuanling_tips5" /* yuanling_tips5 */,
                        _c[7 /* Ring */] = "jinjielibao_tips" /* jinjielibao_tips */,
                        _c[8 /* XianLvJinJie */] = "xiuxian_tips2" /* xiuxian_tips2 */,
                        _c);
                    /**广告图，默认png*/
                    this.bannerTypes = (_d = {},
                        _d[1 /* Yuanling */] = 'yuanlingshilian_guanggaotu',
                        _d[7 /* Ring */] = 'yuanlingshilian_guanggaotu',
                        _d[8 /* XianLvJinJie */] = 'xiuxianguanggaotu',
                        _d);
                }
                return GiftModel;
            }());
            gift.GiftModel = GiftModel;
            __reflect(GiftModel.prototype, "game.mod.gift.GiftModel");
        })(gift = mod.gift || (mod.gift = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var gift;
        (function (gift) {
            var c2s_jinjie_stage_get_list = msg.c2s_jinjie_stage_get_list;
            var c2s_jinjie_stage_get_reward = msg.c2s_jinjie_stage_get_reward;
            var s2c_jinjie_stage_get_list = msg.s2c_jinjie_stage_get_list;
            var common_reward_status = msg.common_reward_status;
            /**
             * @description 进阶礼包
             */
            var GiftProxy = /** @class */ (function (_super) {
                __extends(GiftProxy, _super);
                function GiftProxy() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._cfgMap = {};
                    return _this;
                }
                GiftProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new gift.GiftModel();
                    this.onProto(s2c_jinjie_stage_get_list, this.s2c_jinjie_stage_get_list, this);
                };
                /** 点击阶段奖励信息 */
                GiftProxy.prototype.c2s_jinjie_stage_get_list = function (type) {
                    var msg = new c2s_jinjie_stage_get_list();
                    msg.type = type;
                    this.sendProto(msg);
                };
                /**领取奖励*/
                GiftProxy.prototype.c2s_jinjie_stage_get_reward = function (type, index) {
                    var msg = new c2s_jinjie_stage_get_reward();
                    msg.type = type;
                    msg.index = index;
                    this.sendProto(msg);
                };
                /**奖励列表*/
                GiftProxy.prototype.s2c_jinjie_stage_get_list = function (n) {
                    var msg = n.body;
                    var types = []; //抛出 GiftType 类型
                    if (msg.list != null) {
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            this._model.giftMap[item.type] = item;
                            if (types.indexOf(item.type) < 0) {
                                types.push(item.type);
                            }
                        }
                    }
                    this.updateHint(types);
                    this.sendNt("on_update_gift_info" /* ON_UPDATE_GIFT_INFO */, types);
                };
                /**================================== 协议 end ==================================*/
                /**根据类型，获取对应的进阶奖励列表*/
                GiftProxy.prototype.getGiftInfo = function (type) {
                    return this._model.giftMap[type];
                };
                /**根据类型和索引，获取对应的奖励状态信息*/
                GiftProxy.prototype.getGiftStatus = function (type, index) {
                    var info = this.getGiftInfo(type);
                    var rewardStatus = new common_reward_status();
                    rewardStatus.finish_cnt = 0;
                    rewardStatus.status = 0; //默认未完成
                    if (!info || !info.reward_list) {
                        return rewardStatus;
                    }
                    if (type == 1 /* Yuanling */) {
                        //todo 更 common_reward_status 的 finish_cnt 次数
                        for (var _i = 0, _a = info.reward_list; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (item && item.index.eq(index)) {
                                return item;
                            }
                        }
                    }
                    else {
                        //todo 只更类型 jinjie_list 的 finish_cnt，单项的不更
                        for (var _b = 0, _c = info.reward_list; _b < _c.length; _b++) {
                            var item = _c[_b];
                            if (item && item.index.eq(index)) {
                                item.finish_cnt = info.finish_cnt; //类型的已完成次数
                                return item;
                            }
                        }
                        rewardStatus.finish_cnt = info && info.finish_cnt || 0; //类型的已完成次数
                    }
                    return rewardStatus;
                };
                /**根据 GiftType 获取对应配置*/
                GiftProxy.prototype.getCfgListByType = function (type) {
                    if (this._cfgMap[type]) {
                        return this._cfgMap[type];
                    }
                    this._cfgMap[type] = [];
                    var cfgObj = game.getConfigByNameId("dabiaojiangli.json" /* Dabiaojiangli */, type);
                    for (var idx in cfgObj) {
                        this._cfgMap[type].push(cfgObj[idx]);
                    }
                    return this._cfgMap[type];
                };
                /**根据 GiftType 获取红点*/
                GiftProxy.prototype.getHintByGiftType = function (type) {
                    var cfgList = this.getCfgListByType(type);
                    var hint = false;
                    for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                        var cfg = cfgList_1[_i];
                        if (!cfg) {
                            continue;
                        }
                        var status = this.getGiftStatus(type, cfg.index);
                        var cost = cfg.award_buy[0];
                        if (status && status.status == 1 && cost && mod.BagUtil.checkPropCnt(cost[0], cost[1])) {
                            hint = true;
                            break;
                        }
                    }
                    return hint;
                };
                GiftProxy.prototype.updateHint = function (types) {
                    if (!types || !types.length) {
                        return;
                    }
                    var changeTypes = [];
                    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                        var type = types_1[_i];
                        var hint = this.getHintByGiftType(type);
                        var hintTypes = this.getHintTypes(type);
                        if (hintTypes && hintTypes.length) {
                            var lastHint = mod.HintMgr.getHint(hintTypes);
                            if (lastHint != undefined && lastHint != hint) {
                                changeTypes.push(type); //红点变更
                            }
                            mod.HintMgr.setHint(hint, hintTypes);
                        }
                    }
                    //抛出红点变更的类型
                    if (changeTypes && changeTypes.length) {
                        this.sendNt("on_update_gift_hint" /* ON_UPDATE_GIFT_HINT */, changeTypes);
                    }
                };
                GiftProxy.prototype.onRoleUpdate = function (n) {
                    var ary = [1 /* Yuanling */, 2 /* SuitType1 */, 3 /* SuitType2 */,
                        4 /* SuitType3 */, 5 /* SuitType4 */, 6 /* SuitType5 */, 7 /* Ring */];
                    var keys = n.body;
                    if (keys.indexOf("diamond" /* diamond */) > -1) {
                        this.updateHint(ary);
                    }
                };
                /**获取红点路径*/
                GiftProxy.prototype.getHintTypes = function (type) {
                    return this._model.giftTypes[type];
                };
                /**icon资源*/
                GiftProxy.prototype.getIcon = function (type) {
                    return this._model.iconTypes[type];
                };
                /**标题*/
                GiftProxy.prototype.getTitle = function (type) {
                    return this._model.titleTypes[type];
                };
                /**banner资源，默认png*/
                GiftProxy.prototype.getBanner = function (type) {
                    return this._model.bannerTypes[type];
                };
                return GiftProxy;
            }(game.ProxyBase));
            gift.GiftProxy = GiftProxy;
            __reflect(GiftProxy.prototype, "game.mod.gift.GiftProxy", ["game.mod.IGiftProxy", "base.IProxy"]);
        })(gift = mod.gift || (mod.gift = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var gift;
        (function (gift) {
            var GiftItem = /** @class */ (function (_super) {
                __extends(GiftItem, _super);
                function GiftItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GiftItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = game.getProxy("53" /* Gift */, 201 /* Gift */);
                };
                GiftItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        return;
                    }
                    this._listData.replaceAll(data.cfg.award.concat());
                    this.img_bought.visible = data.status == 2 /* Draw */;
                    this.btn_buy.visible = !this.img_bought.visible;
                    if (this.btn_buy.visible) {
                        var cost = data.cfg.award_buy[0];
                        this.btn_buy.setCost(cost);
                        this.btn_buy.setHint(data.status == 1 /* Finish */ && mod.BagUtil.checkPropCnt(cost[0], cost[1]));
                    }
                    var target = data.cfg.target[0]; //todo 目标完成数量
                    if (data.giftType == 1 /* Yuanling */) {
                        target = data.cfg.target[1];
                    }
                    var desc = data.cfg && data.cfg.desc || '';
                    var str = game.StringUtil.substitute(desc, [target]) +
                        game.TextUtil.addColor("(" + data.finishCnt + "/" + target + ")", data.finishCnt >= target ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this.lb_desc.textFlow = game.TextUtil.parseHtml(str);
                };
                GiftItem.prototype.onClick = function () {
                    var data = this.data;
                    if (!data || !data.cfg || !data.cfg.award_buy) {
                        return;
                    }
                    if (data.status != 1 /* Finish */) {
                        game.PromptBox.getIns().show(game.getLanById("jinjielibao_tips2" /* jinjielibao_tips2 */));
                        return;
                    }
                    for (var _i = 0, _a = data.cfg.award_buy; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (!mod.BagUtil.checkPropCnt(item[0], item[1], 1 /* Dialog */)) {
                            return;
                        }
                    }
                    this._proxy.c2s_jinjie_stage_get_reward(data.giftType, data.cfg.index);
                };
                return GiftItem;
            }(mod.BaseGiftItemRender));
            gift.GiftItem = GiftItem;
            __reflect(GiftItem.prototype, "game.mod.gift.GiftItem");
        })(gift = mod.gift || (mod.gift = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var gift;
        (function (gift) {
            var GiftMainMdr = /** @class */ (function (_super) {
                __extends(GiftMainMdr, _super);
                function GiftMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [];
                    return _this;
                }
                GiftMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(201 /* Gift */);
                };
                GiftMainMdr.prototype.onShow = function () {
                    //传进来的是giftType
                    this._giftType = _super.prototype.decodeShowArgs.call(this);
                    _super.prototype.onShow.call(this);
                };
                GiftMainMdr.prototype.updateBtnList = function () {
                    var icon = this._proxy.getIcon(this._giftType);
                    var title = this._proxy.getTitle(this._giftType);
                    var hintTypes = this._proxy.getHintTypes(this._giftType);
                    this._btnData.push({
                        icon: icon,
                        title: title,
                        hintTypes: hintTypes,
                        btnType: "01" /* TabBtnType01 */,
                        mdr: gift.GiftMdr
                    });
                    _super.prototype.updateBtnList.call(this);
                };
                GiftMainMdr.prototype.updateViewShow = function () {
                    var type = "01" /* TabBtnType01 */;
                    this._tab.params = this._giftType;
                    this._tab.selectIndex = Math.max(this.getMdrPosByType(type), 0);
                    this._tab.show();
                };
                GiftMainMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._btnData = [];
                };
                return GiftMainMdr;
            }(mod.WndBaseMdr));
            gift.GiftMainMdr = GiftMainMdr;
            __reflect(GiftMainMdr.prototype, "game.mod.gift.GiftMainMdr");
        })(gift = mod.gift || (mod.gift = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var gift;
        (function (gift) {
            var GiftMdr = /** @class */ (function (_super) {
                __extends(GiftMdr, _super);
                function GiftMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mod.BaseGiftView);
                    return _this;
                }
                GiftMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(201 /* Gift */);
                    this._view.list.itemRenderer = gift.GiftItem;
                    this._view.list.dataProvider = this._listData = new eui.ArrayCollection();
                    this._view.timeItem.visible = false;
                };
                GiftMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_update_gift_info" /* ON_UPDATE_GIFT_INFO */, this.updateView, this);
                };
                GiftMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (!this._showArgs) {
                        return;
                    }
                    this._giftType = this._showArgs;
                    var banner = this._proxy.getBanner(this._giftType);
                    this._view.updateBanner(banner);
                    this.updateView();
                };
                GiftMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                GiftMdr.prototype.updateView = function () {
                    var cfgList = this._proxy.getCfgListByType(this._giftType);
                    var bigCfg = cfgList[cfgList.length - 1];
                    this._view.updateBigReward(bigCfg.award[0]);
                    var list = [];
                    for (var _i = 0, cfgList_2 = cfgList; _i < cfgList_2.length; _i++) {
                        var cfg = cfgList_2[_i];
                        var rewardStatus = this._proxy.getGiftStatus(this._giftType, cfg.index);
                        var status = rewardStatus ? rewardStatus.status : 0 /* NotFinish */;
                        list.push({
                            cfg: cfg,
                            finishCnt: rewardStatus && rewardStatus.finish_cnt || 0,
                            status: status,
                            giftType: this._giftType
                        });
                    }
                    game.SortTools.sortReward(list);
                    this._listData.replaceAll(list);
                };
                return GiftMdr;
            }(game.MdrBase));
            gift.GiftMdr = GiftMdr;
            __reflect(GiftMdr.prototype, "game.mod.gift.GiftMdr");
        })(gift = mod.gift || (mod.gift = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=gift.js.map