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
        var bag;
        (function (bag) {
            var ItemTapEvent = eui.ItemTapEvent;
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var BagBaseMdr = /** @class */ (function (_super) {
                __extends(BagBaseMdr, _super);
                function BagBaseMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", bag.BagView);
                    return _this;
                }
                BagBaseMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(12 /* Bag */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = bag.IconBag;
                    this._view.list_item.dataProvider = this._itemList;
                    this._btnList = new ArrayCollection();
                    this._view.list_type.itemRenderer = mod.TabSecondItem;
                    this._view.list_type.dataProvider = this._btnList;
                };
                BagBaseMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    this.onNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, this.onBagUpdate, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                };
                BagBaseMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initTypeList();
                    this.initScroller();
                    this.typeUpdateInfo();
                };
                BagBaseMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                /** 通用背包事件监听 */
                BagBaseMdr.prototype.onBagUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(this._selType) < 0) {
                        return;
                    }
                    this.typeUpdateInfo();
                };
                BagBaseMdr.prototype.onClickAdd = function () {
                    //todo，统一跳转VIP特权
                    mod.ViewMgr.getIns().showViewByID(122 /* VipPrivilege */);
                };
                BagBaseMdr.prototype.onClickType = function (e) {
                    var type = this.typeList[e.itemIndex].bagType;
                    if (type == this._selType) {
                        return;
                    }
                    this.setSelType(type);
                    this.initScroller();
                    this.typeUpdateInfo();
                };
                BagBaseMdr.prototype.initTypeList = function () {
                    var datas = [];
                    for (var i = 0; i < this.typeList.length; ++i) {
                        var type_1 = this.typeList[i].bagType;
                        var hintType = this.typeList[i].hintTypes;
                        var icon = "bag_icon" + type_1;
                        var hint = false;
                        if (hintType) {
                            hint = mod.HintMgr.getHint(hintType);
                        }
                        datas.push({ icon: icon, showHint: hint });
                    }
                    this._btnList.source = datas;
                    var selIndex = 0; //默认选中第一个
                    var type = this.typeList[selIndex].bagType;
                    var selType = _super.prototype.decodeShowArgs.call(this, true);
                    if (selType != null) {
                        type = selType;
                        for (var i = 0; i < this.typeList.length; ++i) {
                            if (type == this.typeList[i].bagType) {
                                selIndex = i;
                                break;
                            }
                        }
                    }
                    this.setSelType(type);
                    this._view.list_type.selectedIndex = selIndex;
                };
                BagBaseMdr.prototype.setSelType = function (type) {
                    this._selType = type;
                    mod.ViewMgr.getIns().lastData = [this.btnType, this._selType + ""];
                };
                BagBaseMdr.prototype.initScroller = function () {
                    this._view.scroller.stopAnimation();
                    this._view.scroller.viewport.scrollV = 0;
                };
                BagBaseMdr.prototype.typeUpdateInfo = function () {
                    this.updateItemList();
                };
                BagBaseMdr.prototype.updateItemList = function () {
                    var items = mod.BagUtil.getBagsByType(this._selType, true);
                    var curCnt = items.length;
                    var baseCnt = this._proxy.getBagBaseCnt(this._selType);
                    if (items.length < baseCnt) {
                        items.length = baseCnt;
                    }
                    this._itemList.replaceAll(items);
                    var maxCnt = this._proxy.getBagMaxCnt(this._selType);
                    var isTips = curCnt + game.BagEquipTipsCnt >= maxCnt;
                    var cntStr = game.BagTypeToName[this._selType] + "：" + game.TextUtil.addColor(curCnt + "/" + maxCnt, isTips ? 16731212 /* RED */ : 16777215 /* WHITE */);
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                };
                /** 通用红点事件监听 */
                BagBaseMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    var list = this._btnList.source;
                    var len = list ? list.length : 0;
                    for (var i = 0; i < len && i < this.typeList.length; i++) {
                        var btnData = list[i];
                        var hintType = this.typeList[i].hintTypes;
                        if (!hintType) {
                            continue;
                        }
                        var type = mod.HintMgr.getType(hintType); /**转化为红点类型*/
                        if (type != data.node) {
                            continue;
                        }
                        if (!!btnData.showHint != data.value) { //过滤undefined!=false
                            btnData.showHint = data.value;
                            this._btnList.itemUpdated(btnData);
                        }
                        break; /**找到对应红点后则break，减少循环*/
                    }
                };
                return BagBaseMdr;
            }(game.MdrBase));
            bag.BagBaseMdr = BagBaseMdr;
            __reflect(BagBaseMdr.prototype, "game.mod.bag.BagBaseMdr");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var PropPillTipsView = /** @class */ (function (_super) {
                __extends(PropPillTipsView, _super);
                function PropPillTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.bag.PropPillTipsSkin";
                    return _this;
                }
                return PropPillTipsView;
            }(eui.Component));
            bag.PropPillTipsView = PropPillTipsView;
            __reflect(PropPillTipsView.prototype, "game.mod.bag.PropPillTipsView");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var BagModel = /** @class */ (function () {
                function BagModel() {
                    this.bags = {}; /**type：背包类型，根据背包类型划分数据*/
                    //存放的是key value  value 就是道具 PropData
                    this.items = {}; /**根据物品唯一id存放数据*/
                    this.bagIndexs = {}; /**物品index映射数据*/
                    this.bagBaseCnt = {}; /**type：背包类型，背包基础格子数*/
                    this.bagMaxCnt = {}; /**type：背包类型，背包最大格子数*/
                    this.selSub = false; //合成是否选中子分页
                    this.lastSelIndex = 0; //上一次选中的合成道具下标
                    this.composeHint = ["12" /* Bag */, "01" /* BagMain */ + "04" /* Compose */, "21" /* BagCompose */]; //合成红点
                    this.propHint = ["12" /* Bag */, "01" /* BagMain */ + "01" /* Bag */, "110" /* BagProp */]; //背包红点
                    this.meltHint = ["12" /* Bag */, "01" /* BagMain */ + "03" /* Melt */]; //熔炼红点
                    this.meltTip = false; //熔炼提示
                    this.meltVal = 0; //熔炼值
                    this.meltMaxVal = 0; //熔炼值上限
                    this.useProps = []; //自动熔炼和使用的道具，存的是配置表index
                    this.props = []; //恭喜获得奖励
                    this.easyUse = [];
                }
                return BagModel;
            }());
            bag.BagModel = BagModel;
            __reflect(BagModel.prototype, "game.mod.bag.BagModel");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var c2s_bag_props = msg.c2s_bag_props;
            var s2c_bag_update_prop_attr = msg.s2c_bag_update_prop_attr;
            var s2c_bag_props = msg.s2c_bag_props;
            var c2s_melt_equip = msg.c2s_melt_equip;
            var c2s_prop_one_key_resolve = msg.c2s_prop_one_key_resolve;
            var c2s_prop_synthesis = msg.c2s_prop_synthesis;
            var s2c_prop_synthesis = msg.s2c_prop_synthesis;
            var s2c_prop_tips = msg.s2c_prop_tips;
            var delayCall = base.delayCall;
            var clearDelay = base.clearDelay;
            var Handler = base.Handler;
            var c2s_prop_list_use = msg.c2s_prop_list_use;
            var s2c_melt_equip_coin = msg.s2c_melt_equip_coin;
            var s2c_melt_equip = msg.s2c_melt_equip;
            var facade = base.facade;
            var s2c_first_get_prop_check_use = msg.s2c_first_get_prop_check_use;
            var BagProxy = /** @class */ (function (_super) {
                __extends(BagProxy, _super);
                function BagProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**恭喜获得掉落*/
                BagProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new bag.BagModel();
                    this.onProto(s2c_bag_props, this.s2c_bag_props, this);
                    this.onProto(s2c_bag_update_prop_attr, this.s2c_bag_update_prop_attr, this);
                    this.onProto(s2c_melt_equip, this.s2c_melt_equip, this);
                    this.onProto(s2c_melt_equip_coin, this.s2c_melt_equip_coin, this);
                    this.onProto(s2c_prop_synthesis, this.s2c_prop_synthesis, this);
                    this.onProto(s2c_prop_tips, this.s2c_prop_tips, this);
                    this.onProto(s2c_first_get_prop_check_use, this.s2c_first_get_prop_check_use, this);
                    facade.onNt("equip_update_back" /* EQUIP_UPDATE_BACK */, this.equipUpdateBack, this);
                };
                BagProxy.prototype.onStartReconnect = function () {
                    this._model.composeCfgs = null;
                    _super.prototype.onStartReconnect.call(this);
                };
                //判断是否有某个 id(index)
                BagProxy.prototype.isHasItem = function (itemId) {
                    if (this.theItemNumber(itemId) > 0) {
                        return true;
                    }
                    return false;
                };
                //获取特定 id(index) 的数量
                BagProxy.prototype.theItemNumber = function (itemId) {
                    var items = this._model.bagIndexs[itemId + ""];
                    if (items && items.length > 0) {
                        return items.length;
                    }
                    return 0;
                };
                //-------------------------------------背包-----------------------------------------
                /**前端请求背包信息*/
                BagProxy.prototype.c2s_bag_props = function () {
                    var msg = new c2s_bag_props();
                    this.sendProto(msg);
                };
                BagProxy.prototype.s2c_bag_props = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.all_bag) {
                        return;
                    }
                    this.updateBag(msg.all_bag);
                };
                /**更新物品协议*/
                BagProxy.prototype.s2c_bag_update_prop_attr = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.all_data) {
                        return;
                    }
                    this.updateBag(msg.all_data, true);
                };
                BagProxy.prototype.updateBag = function (all_bag, isUpdate) {
                    var bags = this._model.bags;
                    var items = this._model.items;
                    var bagIndexs = this._model.bagIndexs;
                    var types = []; //道具类型，仅限道具表
                    var bagTypes = []; //背包类型
                    var indexs = []; //道具index，仅限道具表物品类型
                    var headTypes = []; //抛出非道具表表头
                    var propTypeAndSubTypes = {}; //道具类型和子类型，仅限道具表
                    var bagCntTypes = []; //背包类型，最大格子数更新使用
                    var autoUses = []; //自动使用道具
                    for (var _i = 0, all_bag_1 = all_bag; _i < all_bag_1.length; _i++) {
                        var d = all_bag_1[_i];
                        if (d.bag_cap) {
                            this._model.bagMaxCnt[d.bag_type] = d.bag_cap; //背包最大格子数
                            bagCntTypes.push(d.bag_type);
                        }
                        if (!d.update_info) {
                            continue;
                        }
                        if (!bags[d.bag_type]) {
                            bags[d.bag_type] = [];
                        }
                        for (var _a = 0, _b = d.update_info; _a < _b.length; _a++) {
                            var p = _b[_a];
                            var prop_id = p.prop_id.toString();
                            var d2 = items[prop_id];
                            if (!d2) {
                                //新增道具
                                if (!p.index) {
                                    console.error("服务端下发道具更新协议时，新增道具时缺少道具index：", JSON.stringify(msg));
                                    continue;
                                }
                                var propData = game.PropData.fromData(p);
                                if (!propData || !propData.type || propData.count == 0) {
                                    continue;
                                }
                                d2 = propData; //临时存储
                                //存储数据
                                items[prop_id] = propData;
                                bags[d.bag_type].push(propData);
                                if (!bagIndexs[propData.index]) {
                                    bagIndexs[propData.index] = [];
                                }
                                bagIndexs[propData.index].push(propData);
                                // if (isUpdate) {
                                //     /**更新背包时，检测是否是外显*/
                                //     this.checkSurfaceProp(propData);
                                // }
                                if (d2.cfg.easyuse == 2 /* Auto */) {
                                    autoUses.push({ prop_id: d2.prop_id, use_cnt: d2.count });
                                }
                                this.checkProp(d2);
                            }
                            else {
                                this.checkPropUse(d2, p); //检测道具使用
                                if (p.count == 0) {
                                    //删除
                                    delete items[prop_id];
                                    var idx = bags[d.bag_type].indexOf(d2);
                                    var propIdx = bagIndexs[d2.index].indexOf(d2);
                                    game.ArrayUtil.removeAt(bags[d.bag_type], idx);
                                    game.ArrayUtil.removeAt(bagIndexs[d2.index], propIdx);
                                    if (!bagIndexs[d2.index].length) {
                                        delete bagIndexs[d2.index];
                                    }
                                    this.checkProp(game.PropData.create(d2.index, p.count));
                                }
                                else {
                                    //修改
                                    //let oldCnt = d2.count;
                                    d2.update(p, true);
                                    this.checkProp(d2);
                                    // if (isUpdate && oldCnt < d2.count) {
                                    //     /**更新背包时，检测是否是外显*/
                                    //     this.checkSurfaceProp(d2);
                                    // }
                                }
                            }
                            if (d.bag_type == 1 /* Goods */ || d.bag_type == 2 /* Material */) {
                                /**道具表才做类型判断*/
                                var type = d2.type;
                                var propType = d2.propType;
                                if (type != 145 /* Prop */) {
                                    /**非道具表的道具，用表头来判断*/
                                    headTypes.push(type);
                                }
                                else if (propType == 1 /* Good */ || propType == 7 /* ChallengeProp */) {
                                    /**道具类型为1和7，不做类型区分，判断具体index*/
                                    if (indexs.indexOf(d2.index) < 0) {
                                        indexs.push(d2.index);
                                    }
                                }
                                else if (game.PropListenerSubType.indexOf(propType) > -1) {
                                    /**如果是需要区分子子类型的*/
                                    var propSubType = d2.propSubType;
                                    if (!propTypeAndSubTypes[propType]) {
                                        propTypeAndSubTypes[propType] = [];
                                    }
                                    if (propTypeAndSubTypes[propType].indexOf(propSubType) < 0) {
                                        propTypeAndSubTypes[propType].push(propSubType);
                                    }
                                }
                                else if (types.indexOf(propType) < 0) {
                                    /**物品类型区分*/
                                    types.push(propType);
                                }
                            }
                        }
                        if (bagTypes.indexOf(d.bag_type) < 0) {
                            bagTypes.push(d.bag_type);
                        }
                    }
                    if (headTypes.length) {
                        this.sendNt("on_bag_update_by_head_type" /* ON_BAG_UPDATE_BY_HEAD_TYPE */, headTypes);
                    }
                    if (indexs.length) {
                        this.sendNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, indexs);
                    }
                    if (types.length) {
                        this.sendNt("on_bag_update_by_prop_type" /* ON_BAG_UPDATE_BY_PROP_TYPE */, types);
                    }
                    if (bagTypes.length) {
                        this.sendNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, bagTypes);
                    }
                    if (mod.RoleUtil.hasObj(propTypeAndSubTypes)) {
                        this.sendNt("on_bag_update_by_prop_type_and_subtype" /* ON_BAG_UPDATE_BY_PROP_TYPE_AND_SUBTYPE */, propTypeAndSubTypes);
                    }
                    if (bagCntTypes.length) {
                        this.sendNt("on_bag_max_cnt_update" /* ON_BAG_MAX_CNT_UPDATE */, bagCntTypes);
                    }
                    if (autoUses.length) {
                        this.c2s_prop_list_use(autoUses);
                    }
                    if (this._model.easyUse.length) {
                        this.sendNt("on_update_easy_use_prop" /* ON_UPDATE_EASY_USE_PROP */);
                    }
                    this.bagUpdateComposeHint(bagTypes, types); //合成红点
                    this.bagUpdatePropHint(types); //道具红点
                    this.updateMeltTip(bagTypes, bagCntTypes); //熔炼提示
                };
                /**更新背包时，检测是否是外显*/
                // private checkSurfaceProp(prop: PropData): void {
                //     if (prop.propType != PropType.Surface) {
                //         //非外显则返回
                //         return;
                //     }
                //     let cfg: PropConfig = prop.cfg;
                //     let cost: number[] = cfg.param1 ? cfg.param1[0] : null;
                //     if(!cost || !cost.length){
                //         return;
                //     }
                //     let surfaceIndex = cost[0];
                //     if(SurfaceUtil.isAct(surfaceIndex)){
                //         //已激活的不提示
                //         return;
                //     }
                //     let costCnt = cost.length > 1 ? cost[1] : 20;//读不到配置时，默认20个碎片激活
                //     let curCnt = prop.count;
                //     if(curCnt >= costCnt){
                //         //可激活
                //         ViewMgr.getIns().showSurfaceTips(surfaceIndex);
                //     }
                // }
                /**更新物品时，检测道具使用*/
                BagProxy.prototype.checkPropUse = function (oldProp, prop) {
                    var propType = oldProp.propType;
                    var headType = oldProp.type;
                    if (headType == 145 /* Prop */ && propType == 8 /* VipExp */) {
                        //VIP经验券使用时跳转vip界面
                        if (oldProp.count > prop.count) {
                            mod.ViewMgr.getIns().openVipView();
                        }
                    }
                };
                //-------------------------------------熔炼-----------------------------------------
                BagProxy.prototype.c2s_melt_equip = function () {
                    var msg = new c2s_melt_equip();
                    this.sendProto(msg);
                };
                BagProxy.prototype.s2c_melt_equip = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    /**成功提示*/
                    //ViewMgr.getIns().showSuccessTips(SuccessTipsType.Melt);
                    facade.showView("12" /* Bag */, "10" /* MeltTips */, msg);
                };
                BagProxy.prototype.s2c_melt_equip_coin = function (n) {
                    var msg = n.body;
                    if (msg.value) {
                        this._model.meltVal = msg.value;
                    }
                    if (msg.up_value) {
                        this._model.meltMaxVal = msg.up_value;
                    }
                    this.sendNt("on_bag_melt_value_update" /* ON_BAG_MELT_VALUE_UPDATE */);
                };
                Object.defineProperty(BagProxy.prototype, "meltVal", {
                    get: function () {
                        return this._model.meltVal;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BagProxy.prototype, "meltMaxVal", {
                    get: function () {
                        return this._model.meltMaxVal;
                    },
                    enumerable: true,
                    configurable: true
                });
                BagProxy.prototype.updateMeltTip = function (bagTypes, bagCntTypes) {
                    var type = 3 /* RoleEquip */;
                    if (bagTypes.indexOf(type) < 0 && bagCntTypes.indexOf(type) < 0) {
                        return;
                    }
                    var meltTip = this.checkMeltTip(type);
                    if (meltTip != this._model.meltTip) {
                        this._model.meltTip = meltTip;
                        this.sendNt("on_bag_melt_tip" /* ON_BAG_MELT_TIP */);
                    }
                    mod.HintMgr.setHint(meltTip, this._model.meltHint);
                };
                Object.defineProperty(BagProxy.prototype, "meltHint", {
                    get: function () {
                        return this._model.meltHint;
                    },
                    enumerable: true,
                    configurable: true
                });
                BagProxy.prototype.checkMeltTip = function (type) {
                    var bags = this.getBagByType(type);
                    var maxCnt = this.getBagMaxCnt(type);
                    var leftCnt = maxCnt - bags.length;
                    if (leftCnt >= game.BagEquipTipsCnt) {
                        /**装备背包剩余数量小于20时提示熔炼*/
                        return false;
                    }
                    var meltBag = this.getMeltBag(); //有可熔炼装备时
                    return meltBag.length > 0;
                };
                /**熔炼背包*/
                BagProxy.prototype.getMeltBag = function () {
                    return mod.BagUtil.getBagsByTypeAndQuality(3 /* RoleEquip */, 1, game.EquipMeltQuality);
                };
                Object.defineProperty(BagProxy.prototype, "meltTip", {
                    /**熔炼提示*/
                    get: function () {
                        return this._model.meltTip;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**点击熔炼*/
                BagProxy.prototype.clickMelt = function (items) {
                    if (!items) {
                        items = this.getMeltBag();
                    }
                    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                        var p = items_1[_i];
                        this._model.useProps.push(p.index);
                    }
                    this.c2s_melt_equip();
                };
                //-------------------------------------分解-----------------------------------------
                BagProxy.prototype.c2s_prop_one_key_resolve = function (props) {
                    var msg = new c2s_prop_one_key_resolve();
                    msg.props = props;
                    this.sendProto(msg);
                };
                //-------------------------------------合成-----------------------------------------
                BagProxy.prototype.c2s_prop_synthesis = function (index, cnt) {
                    var msg = new c2s_prop_synthesis();
                    msg.index = index;
                    msg.count = cnt;
                    this.sendProto(msg);
                };
                BagProxy.prototype.s2c_prop_synthesis = function (n) {
                    //let msg: s2c_prop_synthesis = n.body;
                    /**成功提示*/
                    mod.ViewMgr.getIns().showSuccessTips(4 /* Compose */);
                    this.sendNt("on_prop_compose_success" /* ON_PROP_COMPOSE_SUCCESS */); //合成成功
                };
                Object.defineProperty(BagProxy.prototype, "selTypeCfg", {
                    get: function () {
                        return this._model.selTypeCfg;
                    },
                    set: function (cfg) {
                        this._model.selTypeCfg = cfg;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BagProxy.prototype, "selIndex", {
                    get: function () {
                        return this._model.selIndex;
                    },
                    set: function (index) {
                        this._model.selIndex = index;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BagProxy.prototype, "lastSelIndex", {
                    get: function () {
                        return this._model.lastSelIndex;
                    },
                    set: function (index) {
                        this._model.lastSelIndex = index;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BagProxy.prototype, "selSub", {
                    get: function () {
                        return this._model.selSub;
                    },
                    set: function (sel) {
                        this._model.selSub = sel;
                    },
                    enumerable: true,
                    configurable: true
                });
                BagProxy.prototype.initComposeCfgs = function () {
                    if (this._model.composeCfgs) {
                        return;
                    }
                    this._model.composeCfgs = {};
                    var cfgList = game.getConfigListByName("synthesis_type.json" /* SynthesisType */);
                    for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                        var cfg = cfgList_1[_i];
                        this._model.composeCfgs[cfg.index] = {};
                        for (var i = 0; i < cfg.prop.length; ++i) {
                            var star = this.calcStar(cfg, i); //道具设置star为0，表示是道具
                            if (!this._model.composeCfgs[cfg.index][star]) {
                                this._model.composeCfgs[cfg.index][star] = [];
                            }
                            this._model.composeCfgs[cfg.index][star].push(cfg.prop[i]);
                        }
                    }
                };
                /**计算星级*/
                BagProxy.prototype.calcStar = function (cfg, pos) {
                    var star = 0; //道具设置star为0，表示是道具
                    if (!cfg.is_prop) {
                        var index = cfg.prop[pos];
                        var equip = game.PropData.create(index);
                        star = equip.equipStar;
                    }
                    return star;
                };
                BagProxy.prototype.getStarList = function (type) {
                    this.initComposeCfgs();
                    var starList = [];
                    var infos = this._model.composeCfgs[type];
                    for (var k in infos) {
                        starList.push(parseInt(k));
                    }
                    return starList;
                };
                //获取星级对应的合成道具
                BagProxy.prototype.getItemList = function (type, star) {
                    this.initComposeCfgs();
                    var infos = this._model.composeCfgs[type];
                    return infos[star];
                };
                BagProxy.prototype.canComposeByTypeCfg = function (cfg) {
                    for (var _i = 0, _a = cfg.prop; _i < _a.length; _i++) {
                        var index = _a[_i];
                        if (this.canComposeByIndex(index)) {
                            return true;
                        }
                    }
                    return false;
                };
                BagProxy.prototype.canComposeByStar = function (type, star) {
                    var indexList = this.getItemList(type, star);
                    for (var _i = 0, indexList_1 = indexList; _i < indexList_1.length; _i++) {
                        var i = indexList_1[_i];
                        if (this.canComposeByIndex(i)) {
                            return true;
                        }
                    }
                    return false;
                };
                BagProxy.prototype.canComposeByIndex = function (index) {
                    var cfg = game.getConfigByNameId("synthesis.json" /* Synthesis */, index);
                    if (!cfg) {
                        return false;
                    }
                    var propCost = cfg.synthesis_prop;
                    for (var i = 0; i < propCost.length; ++i) {
                        var info = propCost[i];
                        var idx = info[0];
                        var costCnt = info[1];
                        var cnt = mod.BagUtil.calcPropCnt(idx, i, propCost, true);
                        if (cnt < costCnt) {
                            return false;
                        }
                    }
                    var cost = cfg.consume;
                    if (cost && cost.length) {
                        for (var _i = 0, cost_1 = cost; _i < cost_1.length; _i++) {
                            var info = cost_1[_i];
                            var idx = info[0];
                            var costCnt = info[1];
                            if (!mod.BagUtil.checkPropCnt(idx, costCnt)) {
                                return false;
                            }
                        }
                    }
                    return true;
                };
                /**刷新合成的红点*/
                BagProxy.prototype.bagUpdateComposeHint = function (bagTypes, types) {
                    if (bagTypes.indexOf(3 /* RoleEquip */) < 0 && types.indexOf(2 /* Compose */) < 0) {
                        return;
                    }
                    this.updateComposeHint();
                };
                //展示的合成大类型
                BagProxy.prototype.getShowComposeCfgs = function () {
                    var cfgs = game.getConfigListByName("synthesis_type.json" /* SynthesisType */);
                    var list = [];
                    var rein = game.RoleVo.ins.reincarnate || 0;
                    for (var _i = 0, cfgs_1 = cfgs; _i < cfgs_1.length; _i++) {
                        var cfg = cfgs_1[_i];
                        if (rein >= cfg.open_level) {
                            list.push(cfg);
                        }
                    }
                    return list;
                };
                /**刷新合成的红点*/
                BagProxy.prototype.updateComposeHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670100 /* BagCompose */)) {
                        return;
                    }
                    var cfgList = this.getShowComposeCfgs();
                    var hint = false;
                    for (var _i = 0, cfgList_2 = cfgList; _i < cfgList_2.length; _i++) {
                        var cfg = cfgList_2[_i];
                        if (this.canComposeByTypeCfg(cfg)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.composeHint);
                };
                /**刷新道具红点，道具类型为3*/
                BagProxy.prototype.bagUpdatePropHint = function (types) {
                    if (types.indexOf(3 /* Box */) < 0) {
                        return;
                    }
                    this.updatePropHint();
                };
                /**刷新道具红点，道具类型为3*/
                BagProxy.prototype.updatePropHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670097 /* Bag */)) {
                        return;
                    }
                    var hint = false;
                    var bags = mod.BagUtil.getBagsByType(1 /* Goods */);
                    for (var _i = 0, bags_1 = bags; _i < bags_1.length; _i++) {
                        var i = bags_1[_i];
                        if (this.getPropHint(i)) {
                            hint = true;
                            break;
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.propHint);
                };
                //道具红点，目前只做道具类型3的
                BagProxy.prototype.getPropHint = function (prop) {
                    if (!prop || prop.type != 145 /* Prop */ || prop.propType != 3 /* Box */) {
                        return false;
                    }
                    var cfg = prop.cfg;
                    var useStr = this.getUseStr(cfg.condition, prop);
                    return useStr == ""; //返回空的时候，表示能使用
                };
                //使用限制文本，返回空的时候，表示能使用
                BagProxy.prototype.getUseStr = function (condition, propData) {
                    var useStr = "";
                    if (!condition || !condition.length) {
                        return useStr;
                    }
                    for (var _i = 0, condition_1 = condition; _i < condition_1.length; _i++) {
                        var info = condition_1[_i];
                        var type = info[0];
                        var limitValue = info[1];
                        switch (type) {
                            case 1 /* VIP_INDEX */:
                                //vip
                                if (limitValue > game.RoleVo.ins.vip_lv) {
                                    useStr = mod.VipUtil.getVipStr(limitValue) + game.getLanById("bag_use_tips1" /* bag_use_tips1 */);
                                }
                                break;
                            case 2 /* LOGINDAY */:
                                //登录天数
                                var leftDay = limitValue - mod.RoleUtil.getLoginDay();
                                if (leftDay > 0) {
                                    useStr = game.StringUtil.substitute(game.getLanById("bag_use_tips3" /* bag_use_tips3 */), [leftDay]);
                                }
                                break;
                            case 7 /* OwnLoginDay */:
                                var ownLoginDay = propData.born_login_days || 0; //得到时候玩家的登录天数
                                var loginDay = mod.RoleUtil.getLoginDay() - ownLoginDay + 1 - limitValue;
                                if (loginDay < 0) {
                                    useStr = game.StringUtil.substitute(game.getLanById("bag_use_tips3" /* bag_use_tips3 */), [Math.abs(loginDay)]);
                                }
                                break;
                        }
                    }
                    return useStr;
                };
                BagProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("vip_lv" /* vip_lv */) >= 0) {
                        this.updatePropHint();
                    }
                    if (keys.indexOf("reincarnate" /* reincarnate */) >= 0) {
                        this.updateComposeHint();
                    }
                };
                BagProxy.prototype.onServerDayUpdate = function (n) {
                    this.updatePropHint();
                };
                //-------------------------------------合成-----------------------------------------
                //-------------------------------------使用道具-----------------------------------------
                /**返回统一走下面：s2c_prop_tips*/
                BagProxy.prototype.c2s_prop_list_use = function (props) {
                    var msg = new c2s_prop_list_use();
                    msg.props = props;
                    this.sendProto(msg);
                };
                /**自动使用宝箱*/
                BagProxy.prototype.autoUseBox = function () {
                    var bags = mod.BagUtil.getBagsByTypeAndPropType(1 /* Goods */, 3 /* Box */);
                    //快速开启背包宝箱（除自选宝箱外的所有宝箱）
                    var props = [];
                    for (var _i = 0, bags_2 = bags; _i < bags_2.length; _i++) {
                        var p = bags_2[_i];
                        if (p.propSubType != 2 /* Type2 */) {
                            props.push({ prop_id: p.prop_id, use_cnt: p.count });
                            this._model.useProps.push(p.index);
                        }
                    }
                    if (props.length) {
                        this.c2s_prop_list_use(props);
                    }
                };
                BagProxy.prototype.equipUpdateBack = function () {
                    this.onCheckEasyUseEquip();
                    this.updateComposeHint();
                };
                BagProxy.prototype.onCheckEasyUseEquip = function () {
                    var proxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                    for (var i = this._model.easyUse.length - 1; i > 0; i--) {
                        var p = this._model.easyUse[i];
                        if (p.equipPos && p.propType == 1 /* RoleEquip */) {
                            var equip = proxy.getEquipByPos(p.equipPos);
                            var power1 = p && p.regular_attrs && p.regular_attrs.showpower.toNumber() || 0;
                            var power2 = equip && equip.regular_attrs && equip.regular_attrs.showpower.toNumber() || 0;
                            if (power2 >= power1) {
                                this._model.easyUse.splice(i, 1);
                            }
                        }
                    }
                    this.sendNt("on_update_easy_use_prop" /* ON_UPDATE_EASY_USE_PROP */);
                };
                /** */
                BagProxy.prototype.checkProp = function (p) {
                    if (p.cfg.easyuse == 1 /* Easy */) {
                        if (p.propType == 1 /* RoleEquip */) {
                            this.checkEquip(p);
                        }
                        else {
                            this.checkUse(p);
                            this.sendNt("on_update_easy_use_prop_count" /* ON_UPDATE_EASY_USE_PROP_COUNT */, p);
                        }
                    }
                };
                BagProxy.prototype.checkUse = function (p) {
                    var idx = this._model.easyUse.findIndex(function (v) {
                        return v.index == p.index;
                    });
                    if (!p.count) {
                        if (idx > -1) {
                            this._model.easyUse.splice(idx, 1);
                        }
                    }
                    else {
                        if (idx > -1) {
                            this._model.easyUse[idx] = p;
                        }
                        else {
                            this._model.easyUse.push(p);
                        }
                    }
                };
                BagProxy.prototype.checkEquip = function (p) {
                    var proxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                    if (!proxy.checkEquipLimit(p)) {
                        return;
                    }
                    var equip = proxy.getEquipByPos(p.equipPos);
                    var power1 = p && p.regular_attrs && p.regular_attrs.showpower.toNumber() || 0;
                    var power2 = equip && equip.regular_attrs && equip.regular_attrs.showpower.toNumber() || 0;
                    if (power2 >= power1) {
                        return;
                    }
                    for (var i in this._model.easyUse) {
                        var prop = this._model.easyUse[i];
                        if (!p.equipPos || p.equipPos !== prop.equipPos) {
                            continue;
                        }
                        var power3 = prop && prop.regular_attrs && prop.regular_attrs.showpower.toNumber() || 0;
                        if (power1 > power3) {
                            this._model.easyUse[i] = p;
                        }
                        return;
                    }
                    this._model.easyUse.push(p);
                };
                Object.defineProperty(BagProxy.prototype, "easyUse", {
                    get: function () {
                        this._model.easyUse.sort(function (a, b) {
                            if (a.propType == b.propType && a.propType == 1 /* RoleEquip */) {
                                return a.equipPos - b.equipPos;
                            }
                            else {
                                if (a.propType == 1 /* RoleEquip */) {
                                    return -1;
                                }
                                else if (b.propType == 1 /* RoleEquip */) {
                                    return 1;
                                }
                                else {
                                    return a.index - b.index;
                                }
                            }
                        });
                        return this._model.easyUse.shift();
                    },
                    enumerable: true,
                    configurable: true
                });
                //-------------------------------------掉落提示-----------------------------------------
                BagProxy.prototype.s2c_prop_tips = function (n) {
                    var msg = n.body;
                    if (!msg.reason_type) {
                        //居中的恭喜获得
                        mod.PropTipsMgr.getIns().showBestPropCenter(msg.props);
                    }
                    else if (msg.reason_type == 1) {
                        //掉落黑底提示
                        if (!mod.SceneUtil.isShowMain) {
                            mod.PropTipsMgr.getIns().show(msg.props); //主界面挂机时候不提示
                        }
                    }
                    else if (msg.reason_type == 2) {
                        //下方的恭喜获得
                        this._model.props = this._model.props.concat(msg.props);
                        if (this._delayProp) {
                            clearDelay(this._delayProp);
                        }
                        this._delayProp = delayCall(Handler.alloc(this, this.showPropTips), 400);
                    }
                };
                BagProxy.prototype.showPropTips = function () {
                    //恭喜获得的道具需要过滤掉熔炼的装备
                    if (this._model.useProps && this._model.useProps.length) {
                        var len = this._model.props.length;
                        for (var i = len - 1; i >= 0; --i) {
                            var prop = this._model.props[i];
                            if (this._model.useProps.indexOf(prop.idx.toNumber()) > -1) {
                                this._model.props.splice(i, 1);
                            }
                        }
                        this._model.useProps = [];
                    }
                    if (this._model.props.length) {
                        mod.PropTipsMgr.getIns().showBestProp(this._model.props.concat());
                    }
                    this._model.props = [];
                };
                /**
                 * 通过背包类型获取基础背包格子数量
                 * @param type：背包类型
                 */
                BagProxy.prototype.getBagBaseCnt = function (type) {
                    if (!this._model.bagBaseCnt[type]) {
                        var cfg = game.GameConfig.getParamConfigById("bag_capacity");
                        var infos = cfg ? cfg.value : [];
                        for (var _i = 0, infos_1 = infos; _i < infos_1.length; _i++) {
                            var info = infos_1[_i];
                            if (info[0] == type) {
                                this._model.bagBaseCnt[type] = info[1];
                                break;
                            }
                        }
                    }
                    return this._model.bagBaseCnt[type];
                };
                /**
                 * 通过背包类型获取背包最大格子数量
                 * @param type：背包类型
                 */
                BagProxy.prototype.getBagMaxCnt = function (type) {
                    return this._model.bagMaxCnt[type] || 0;
                };
                //外显弹窗
                BagProxy.prototype.s2c_first_get_prop_check_use = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.ids) {
                        return;
                    }
                    for (var _i = 0, _a = msg.ids; _i < _a.length; _i++) {
                        var i = _a[_i];
                        mod.ViewMgr.getIns().showSurfaceTips(i, false);
                    }
                };
                //---------------------对外接口----------------------------
                /**
                 * 通过背包类型获取背包数据
                 * @param type：背包类型
                 */
                BagProxy.prototype.getBagByType = function (type) {
                    return this._model.bags[type] || [];
                };
                /**
                 * 通过index获取背包道具
                 * @param index：配置表index
                 */
                BagProxy.prototype.getPropsByIndex = function (index) {
                    return this._model.bagIndexs[index] || [];
                };
                return BagProxy;
            }(game.ProxyBase));
            bag.BagProxy = BagProxy;
            __reflect(BagProxy.prototype, "game.mod.bag.BagProxy", ["game.mod.IBagProxy", "base.IProxy"]);
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var facade = base.facade;
            var BagComposeTabItemRender = /** @class */ (function (_super) {
                __extends(BagComposeTabItemRender, _super);
                function BagComposeTabItemRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                BagComposeTabItemRender.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("12" /* Bag */).retProxy(12 /* Bag */);
                };
                BagComposeTabItemRender.prototype.dataChanged = function () {
                    if (this.data == null) {
                        return;
                    }
                    var isProp = this.data == 0; //0星表示道具
                    var nameStr = isProp ? game.getLanById("cailiao" /* cailiao */) : this.data + game.getLanById("soul2" /* soul2 */);
                    this.lab_name.text = nameStr;
                    //星级红点
                    this.redPoint.visible = this._proxy.canComposeByStar(this._proxy.selTypeCfg.index, this.data);
                };
                return BagComposeTabItemRender;
            }(mod.BaseRenderer));
            bag.BagComposeTabItemRender = BagComposeTabItemRender;
            __reflect(BagComposeTabItemRender.prototype, "game.mod.bag.BagComposeTabItemRender");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var facade = base.facade;
            var BagComposeTabRender = /** @class */ (function (_super) {
                __extends(BagComposeTabRender, _super);
                function BagComposeTabRender() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._record = 0;
                    return _this;
                }
                BagComposeTabRender.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._listPro = new ArrayCollection();
                    this.list_item.itemRenderer = bag.BagComposeTabItemRender;
                    this.list_item.dataProvider = this._listPro;
                    this.list_item.addEventListener(ItemTapEvent.ITEM_TAP, this.onSelectProp, this);
                    this._proxy = facade.retMod("12" /* Bag */).retProxy(12 /* Bag */);
                };
                BagComposeTabRender.prototype.onRemoveFromStage = function () {
                    _super.prototype.onRemoveFromStage.call(this);
                    this.list_item.removeEventListener(ItemTapEvent.ITEM_TAP, this.onSelectProp, this);
                };
                BagComposeTabRender.prototype.dataChanged = function () {
                    if (!this.data)
                        return;
                    this.lab_type.text = this.data.title;
                    if (this.selected && this._proxy.lastSelIndex >= 0) {
                        var starList = this._proxy.getStarList(this.data.index);
                        this._listPro.replaceAll(starList);
                        var isProp = this.data.is_prop;
                        var _sel = 0; //道具默认选中第一个，材料
                        if (!isProp) {
                            var pos = this.data.prop.indexOf(this._proxy.selIndex);
                            var index = this.data.prop[0]; //起始的装备，11转是2星开始合成的
                            var equip = game.PropData.create(index);
                            var star = this._proxy.calcStar(this.data, pos);
                            _sel = star - equip.equipStar; //计算选中的道具对应的星级下标
                        }
                        this.list_item.selectedIndex = this._record = _sel;
                    }
                    else {
                        this._record = 0;
                        this._listPro.source = null;
                    }
                    this.redPoint.visible = this._proxy.canComposeByTypeCfg(this.data);
                };
                BagComposeTabRender.prototype.onSelectProp = function (e) {
                    this._proxy.selSub = true;
                    if (this._record == e.itemIndex) {
                        return;
                    }
                    this._record = e.itemIndex;
                    var isProp = this.data.is_prop;
                    var pos = 0; //道具默认选中第一个，材料
                    if (!isProp) {
                        var posNum = game.EquipPosAry.length;
                        pos = this._record * posNum;
                    }
                    this._proxy.selIndex = this.data.prop[pos];
                    facade.sendNt("on_prop_compose_sel_update" /* ON_PROP_COMPOSE_SEL_UPDATE */);
                };
                return BagComposeTabRender;
            }(mod.BaseRenderer));
            bag.BagComposeTabRender = BagComposeTabRender;
            __reflect(BagComposeTabRender.prototype, "game.mod.bag.BagComposeTabRender");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var BagComposeView = /** @class */ (function (_super) {
                __extends(BagComposeView, _super);
                function BagComposeView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.bag.BagComposeSkin";
                    return _this;
                }
                return BagComposeView;
            }(eui.Component));
            bag.BagComposeView = BagComposeView;
            __reflect(BagComposeView.prototype, "game.mod.bag.BagComposeView");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var BagDelView = /** @class */ (function (_super) {
                __extends(BagDelView, _super);
                function BagDelView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.bag.BagDelSkin";
                    return _this;
                }
                return BagDelView;
            }(eui.Component));
            bag.BagDelView = BagDelView;
            __reflect(BagDelView.prototype, "game.mod.bag.BagDelView");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var BagMeltView = /** @class */ (function (_super) {
                __extends(BagMeltView, _super);
                function BagMeltView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.bag.BagMeltSkin";
                    return _this;
                }
                return BagMeltView;
            }(eui.Component));
            bag.BagMeltView = BagMeltView;
            __reflect(BagMeltView.prototype, "game.mod.bag.BagMeltView");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var BagView = /** @class */ (function (_super) {
                __extends(BagView, _super);
                function BagView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.bag.BagSkin";
                    return _this;
                }
                return BagView;
            }(eui.Component));
            bag.BagView = BagView;
            __reflect(BagView.prototype, "game.mod.bag.BagView");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var facade = base.facade;
            var Handler = base.Handler;
            var IconBag = /** @class */ (function (_super) {
                __extends(IconBag, _super);
                function IconBag() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                IconBag.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    this.iconShowType = 2 /* Bag */;
                    var hint = false;
                    if (this.propData) {
                        var proxy = facade.retMod("12" /* Bag */).retProxy(12 /* Bag */);
                        hint = proxy.getPropHint(this.propData);
                    }
                    this.setHint(hint);
                    this.setClickHandler(Handler.alloc(this, this.onClickThis));
                };
                IconBag.prototype.onClickThis = function () {
                    if (!this.propData || !this.propData.cfg) {
                        return;
                    }
                    if (this.iconShowType == 3 /* NotTips */) {
                        return;
                    }
                    if (this.propData.type == 290 /* Equip */ && this.propData.propType == 1 /* RoleEquip */) {
                        mod.ViewMgr.getIns().showRoleEquipTips(this.propData, null, true);
                        return;
                    }
                    mod.ViewMgr.getIns().showPropTips(this.propData);
                };
                return IconBag;
            }(mod.Icon));
            bag.IconBag = IconBag;
            __reflect(IconBag.prototype, "game.mod.bag.IconBag");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var BestPropTipsView = /** @class */ (function (_super) {
                __extends(BestPropTipsView, _super);
                function BestPropTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.bag.BestPropTipsSkin";
                    return _this;
                }
                return BestPropTipsView;
            }(eui.Component));
            bag.BestPropTipsView = BestPropTipsView;
            __reflect(BestPropTipsView.prototype, "game.mod.bag.BestPropTipsView");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var TouchEvent = egret.TouchEvent;
            /**
             * 基础道具来源跳转组件
             */
            var GainWaysTipsItem = /** @class */ (function (_super) {
                __extends(GainWaysTipsItem, _super);
                function GainWaysTipsItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GainWaysTipsItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this, this.onClick, this);
                };
                GainWaysTipsItem.prototype.onClick = function () {
                    if (!this.data || !this.btn_gain.visible) {
                        return;
                    }
                    mod.ViewMgr.getIns().showViewByID(this.data);
                };
                GainWaysTipsItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var id = this.data;
                    var cfg = game.getConfigByNameId("jump.json" /* Jump */, id);
                    if (!cfg) {
                        console.error("\u8DF3\u8F6C\u8868\u6CA1\u6709\u5BF9\u5E94\u7684\u914D\u7F6E\uFF1A" + id);
                        return;
                    }
                    var showJump = mod.ViewMgr.getIns().showJumpBtn(id); //是否显示跳转按钮
                    this.btn_gain.visible = showJump;
                    // this.lab_desc.text = showJump ? cfg.name : "";
                    // this.lab_desc_center.text = !showJump ? cfg.name : "";
                    /**统一改成居左处理*/
                    this.lab_desc.text = cfg.name;
                    this.lab_desc_center.text = "";
                };
                return GainWaysTipsItem;
            }(mod.BaseListenerRenderer));
            bag.GainWaysTipsItem = GainWaysTipsItem;
            __reflect(GainWaysTipsItem.prototype, "game.mod.bag.GainWaysTipsItem");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var GainWaysTipsView = /** @class */ (function (_super) {
                __extends(GainWaysTipsView, _super);
                function GainWaysTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.bag.GainWaysTipsSkin";
                    return _this;
                }
                return GainWaysTipsView;
            }(eui.Component));
            bag.GainWaysTipsView = GainWaysTipsView;
            __reflect(GainWaysTipsView.prototype, "game.mod.bag.GainWaysTipsView");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var MeltTipsView = /** @class */ (function (_super) {
                __extends(MeltTipsView, _super);
                function MeltTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.bag.MeltTipsSkin";
                    return _this;
                }
                return MeltTipsView;
            }(eui.Component));
            bag.MeltTipsView = MeltTipsView;
            __reflect(MeltTipsView.prototype, "game.mod.bag.MeltTipsView");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var PropGainView = /** @class */ (function (_super) {
                __extends(PropGainView, _super);
                function PropGainView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.bag.PropGainSkin";
                    return _this;
                }
                return PropGainView;
            }(eui.Component));
            bag.PropGainView = PropGainView;
            __reflect(PropGainView.prototype, "game.mod.bag.PropGainView");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var BagMod = /** @class */ (function (_super) {
                __extends(BagMod, _super);
                function BagMod() {
                    return _super.call(this, "12" /* Bag */) || this;
                }
                BagMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                BagMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(12 /* Bag */, bag.BagProxy);
                };
                BagMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* BagMain */, bag.BagMainMdr);
                    this.regMdr("03" /* PropGain */, bag.PropGainMdr);
                    this.regMdr("04" /* BestPropTips */, bag.BestPropTipsMdr);
                    this.regMdr("101" /* PropTips1 */, bag.PropTipsMdr); /**道具提示，道具提示需要支持同时存在多个界面*/
                    this.regMdr("102" /* PropTips2 */, bag.PropTipsMdr);
                    this.regMdr("103" /* PropTips3 */, bag.PropTipsMdr);
                    this.regMdr("104" /* PropTips4 */, bag.PropTipsMdr);
                    this.regMdr("105" /* PropTips5 */, bag.PropTipsMdr);
                    this.regMdr("07" /* GainWaysTips */, bag.GainWaysTipsMdr);
                    this.regMdr("08" /* PropSurfaceTips */, bag.PropSurfaceTipsMdr);
                    this.regMdr("10" /* MeltTips */, bag.MeltTipsMdr);
                    this.regMdr("11" /* PropPillTips */, bag.PropPillTipsMdr);
                };
                return BagMod;
            }(game.ModBase));
            bag.BagMod = BagMod;
            __reflect(BagMod.prototype, "game.mod.bag.BagMod");
            gso.modCls.push(BagMod);
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var PropSurfaceTipsView = /** @class */ (function (_super) {
                __extends(PropSurfaceTipsView, _super);
                function PropSurfaceTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.bag.PropSurfaceTipsSkin";
                    return _this;
                }
                return PropSurfaceTipsView;
            }(eui.Component));
            bag.PropSurfaceTipsView = PropSurfaceTipsView;
            __reflect(PropSurfaceTipsView.prototype, "game.mod.bag.PropSurfaceTipsView");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var PropTipsView = /** @class */ (function (_super) {
                __extends(PropTipsView, _super);
                function PropTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.bag.PropTipsSkin";
                    return _this;
                }
                return PropTipsView;
            }(eui.Component));
            bag.PropTipsView = PropTipsView;
            __reflect(PropTipsView.prototype, "game.mod.bag.PropTipsView");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var BagMainMdr = /** @class */ (function (_super) {
                __extends(BagMainMdr, _super);
                function BagMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Bag */,
                            icon: "bag_tab",
                            mdr: bag.BagMdr,
                            title: "bag_tips" /* bag_tips */,
                            bg: "",
                            openIdx: 1041670097 /* Bag */,
                            hintTypes: ["12" /* Bag */, "01" /* BagMain */ + "01" /* Bag */],
                        },
                        {
                            btnType: "02" /* Equip */,
                            icon: "equip_tab",
                            mdr: bag.BagEquipMdr,
                            title: "equipment_tips" /* equipment_tips */,
                            bg: "",
                            openIdx: 1041670098 /* BagEquip */,
                        },
                        {
                            btnType: "03" /* Melt */,
                            icon: "melt_tab",
                            mdr: bag.BagMeltMdr,
                            title: "ronglian_tips" /* ronglian_tips */,
                            bg: "p1_melt_bg",
                            openIdx: 1041670099 /* BagMelt */,
                            hintTypes: ["12" /* Bag */, "01" /* BagMain */ + "03" /* Melt */],
                        },
                        {
                            btnType: "04" /* Compose */,
                            icon: "compose_tab",
                            mdr: bag.BagComposeMdr,
                            title: "compound_tips1" /* compound_tips1 */,
                            bg: "p1_compose_bg",
                            openIdx: 1041670100 /* BagCompose */,
                            hintTypes: ["12" /* Bag */, "01" /* BagMain */ + "04" /* Compose */],
                        },
                        {
                            btnType: "05" /* Del */,
                            icon: "del_tab",
                            mdr: bag.BagDelMdr,
                            title: "fenjie_tips" /* fenjie_tips */,
                            bg: "p1_del_bg",
                            openIdx: 1041670101 /* BagDel */,
                        }
                    ];
                    return _this;
                }
                return BagMainMdr;
            }(mod.WndBaseMdr));
            bag.BagMainMdr = BagMainMdr;
            __reflect(BagMainMdr.prototype, "game.mod.bag.BagMainMdr");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var ItemTapEvent = eui.ItemTapEvent;
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var BagComposeMdr = /** @class */ (function (_super) {
                __extends(BagComposeMdr, _super);
                function BagComposeMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", bag.BagComposeView);
                    return _this;
                }
                BagComposeMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(12 /* Bag */);
                    this._typeList = new ArrayCollection();
                    this._view.list_type.itemRenderer = bag.BagComposeTabRender;
                    this._view.list_type.dataProvider = this._typeList;
                    this._view.scr["$hasScissor"] = true;
                    this._view.list_type.useVirtualLayout = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = mod.BtnTabItem;
                    this._view.list_item.dataProvider = this._itemList;
                };
                BagComposeMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
                    addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
                    addEventListener(this._view.btn_compose, TouchEvent.TOUCH_TAP, this.onClickCompose);
                    addEventListener(this._view.btn_min, TouchEvent.TOUCH_TAP, this.onClickMin);
                    addEventListener(this._view.btn_subtract, TouchEvent.TOUCH_TAP, this.onClickSubtract);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    addEventListener(this._view.btn_max, TouchEvent.TOUCH_TAP, this.onClickMax);
                    this.onNt("on_prop_compose_sel_update" /* ON_PROP_COMPOSE_SEL_UPDATE */, this.onSelectedChanged, this);
                    this.onNt("on_prop_compose_success" /* ON_PROP_COMPOSE_SUCCESS */, this.onSuccess, this);
                };
                BagComposeMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateTypeList();
                    this.updateTypeListSel();
                    this.updateItemList();
                    this.updateInfo();
                };
                BagComposeMdr.prototype.onHide = function () {
                    this._proxy.selIndex = 0;
                    this._proxy.lastSelIndex = 0;
                    _super.prototype.onHide.call(this);
                };
                BagComposeMdr.prototype.onSuccess = function (n) {
                    this.updateTypeListSel();
                    this.onSelectedChanged();
                };
                BagComposeMdr.prototype.onClickCompose = function () {
                    if (!this._proxy.selIndex) {
                        return;
                    }
                    var propCost = this._selCfg.synthesis_prop;
                    for (var _i = 0, propCost_1 = propCost; _i < propCost_1.length; _i++) {
                        var info = propCost_1[_i];
                        var idx = info[0];
                        var costCnt = info[1];
                        if (!mod.BagUtil.checkPropCnt(idx, costCnt)) {
                            game.PromptBox.getIns().show(game.getLanById("compose_tips" /* compose_tips */));
                            return;
                        }
                    }
                    var cost = this._selCfg.consume;
                    if (cost && cost.length) {
                        for (var _a = 0, cost_2 = cost; _a < cost_2.length; _a++) {
                            var info = cost_2[_a];
                            var idx = info[0];
                            var costCnt = info[1];
                            if (!mod.BagUtil.checkPropCntUp(idx, costCnt)) {
                                return;
                            }
                        }
                    }
                    this._proxy.c2s_prop_synthesis(Long.fromValue(this._proxy.selIndex), this._selCnt);
                };
                BagComposeMdr.prototype.onClickMin = function () {
                    this.checkCnt(1, false);
                };
                BagComposeMdr.prototype.onClickSubtract = function () {
                    this.subtractSelCnt(1);
                };
                BagComposeMdr.prototype.onClickAdd = function () {
                    if (!this._proxy.selIndex) {
                        return;
                    }
                    var maxCnt = this.getMaxCnt();
                    var cnt = Math.min(maxCnt, this._selCnt + 1);
                    this.checkCnt(cnt, true);
                };
                BagComposeMdr.prototype.onClickMax = function () {
                    if (!this._proxy.selIndex) {
                        return;
                    }
                    var maxCnt = this.getMaxCnt();
                    this.checkCnt(maxCnt, true);
                };
                BagComposeMdr.prototype.getMaxCnt = function () {
                    var maxCnt = -1;
                    var propCost = this._selCfg.synthesis_prop;
                    for (var i = 0; i < propCost.length; ++i) {
                        var info = propCost[i];
                        var idx = info[0];
                        var costCnt = info[1];
                        var cnt = mod.BagUtil.calcPropCnt(idx, i, propCost, true);
                        var perCnt = Math.floor(cnt / costCnt);
                        if (maxCnt == -1 || perCnt < maxCnt) {
                            maxCnt = perCnt;
                        }
                    }
                    return Math.max(maxCnt, 1);
                };
                BagComposeMdr.prototype.subtractSelCnt = function (subtractCnt) {
                    if (!this._proxy.selIndex) {
                        return;
                    }
                    var cnt = Math.max(1, this._selCnt - subtractCnt);
                    this.checkCnt(cnt, false);
                };
                BagComposeMdr.prototype.checkCnt = function (cnt, isAdd) {
                    if (cnt == this._selCnt) {
                        var tips = isAdd ? "max_value" /* max_value */ : "min_value" /* min_value */;
                        game.PromptBox.getIns().show(game.getLanById(tips));
                        return;
                    }
                    this.setSelCnt(cnt);
                };
                BagComposeMdr.prototype.setSelCnt = function (cnt) {
                    this._selCnt = cnt;
                    this.selCntUpdate();
                    this.updateCost();
                };
                BagComposeMdr.prototype.onClickType = function (e) {
                    if (this._proxy.selSub) {
                        this._proxy.selSub = false;
                        return;
                    }
                    if (e.itemIndex == this._proxy.lastSelIndex) {
                        this._view.list_type.selectedIndex = -1;
                        this._proxy.lastSelIndex = -1;
                        this.updateTypeList();
                        return;
                    }
                    this._proxy.lastSelIndex = this._view.list_type.selectedIndex;
                    var info = e.item;
                    this._proxy.selTypeCfg = info;
                    this._proxy.selIndex = this._proxy.selTypeCfg.prop[0];
                    this.onSelectedChanged();
                    // if(this._view.scr.viewport.height <= this._view.scr.viewport.contentHeight) {
                    //     this._view.scr.viewport.scrollV = 0;
                    // }
                };
                BagComposeMdr.prototype.onClickItem = function (e) {
                    var index = e.itemIndex;
                    if (index == this._lastItemIndex) {
                        return;
                    }
                    this._lastItemIndex = index;
                    var data = e.item;
                    this._proxy.selIndex = data.param;
                    this.updateInfo();
                };
                /**选中类型刷新*/
                BagComposeMdr.prototype.onSelectedChanged = function () {
                    this.updateTypeList();
                    this.updateItemList();
                    this.updateInfo();
                };
                BagComposeMdr.prototype.updateTypeList = function () {
                    var infos = this._proxy.getShowComposeCfgs();
                    if (this._typeList.source.length > 0) {
                        this._typeList.replaceAll(infos);
                    }
                    else {
                        this._typeList.source = infos;
                    }
                };
                BagComposeMdr.prototype.updateItemList = function () {
                    var infos = [];
                    var selTypeCfg = this._proxy.selTypeCfg;
                    var pos = selTypeCfg.prop.indexOf(this._proxy.selIndex);
                    var star = this._proxy.calcStar(selTypeCfg, pos);
                    var itemList = this._proxy.getItemList(selTypeCfg.index, star);
                    for (var _i = 0, itemList_1 = itemList; _i < itemList_1.length; _i++) {
                        var i = itemList_1[_i];
                        var cfg = game.getConfigByNameId("synthesis.json" /* Synthesis */, i);
                        var posName = cfg.title;
                        var data = { name: posName, showHint: this._proxy.canComposeByIndex(i), param: i };
                        infos.push(data);
                    }
                    if (this._itemList.source.length > 0) {
                        this._itemList.replaceAll(infos);
                    }
                    else {
                        this._itemList.source = infos;
                    }
                    var itemPos = itemList.indexOf(this._proxy.selIndex); //index计算部位
                    this._view.list_item.selectedIndex = itemPos;
                    this._lastItemIndex = itemPos;
                };
                /**首次进入界面，自动选中可合成选项*/
                BagComposeMdr.prototype.updateTypeListSel = function () {
                    var typePos = this.genSelTypePos();
                    this._proxy.selTypeCfg = this._typeList.source[typePos];
                    this._proxy.selIndex = this.genSelIndex();
                    this._view.list_type.selectedIndex = typePos;
                    this._proxy.lastSelIndex = typePos;
                };
                /**返回的是列表下标*/
                BagComposeMdr.prototype.genSelTypePos = function () {
                    var cfgList = this._typeList.source;
                    for (var i = 0; i < cfgList.length; ++i) {
                        var cfg = cfgList[i];
                        if (this._proxy.canComposeByTypeCfg(cfg)) {
                            return i;
                        }
                    }
                    return this._proxy.lastSelIndex;
                };
                /**返回的是道具index*/
                BagComposeMdr.prototype.genSelIndex = function () {
                    var infos = this._proxy.selTypeCfg.prop;
                    for (var i = 0; i < infos.length; ++i) {
                        var index = infos[i];
                        if (this._proxy.canComposeByIndex(index)) {
                            return index;
                        }
                    }
                    return this._proxy.selIndex ? this._proxy.selIndex : infos[0];
                };
                /**选中刷新*/
                BagComposeMdr.prototype.updateInfo = function () {
                    this.updateTarIcon();
                    var idx = this._proxy.selIndex;
                    this._selCfg = game.getConfigByNameId("synthesis.json" /* Synthesis */, idx);
                    var maxCnt = this.getMaxCnt();
                    this.setSelCnt(maxCnt);
                };
                BagComposeMdr.prototype.updateTarIcon = function () {
                    var idx = this._proxy.selIndex;
                    var prop = game.PropData.create(idx);
                    this._view.icon.setData(prop);
                    this._view.lab_name.textFlow = this._view.icon.getPropName();
                };
                BagComposeMdr.prototype.selCntUpdate = function () {
                    this._view.lab_cnt.text = this._selCnt + "";
                };
                BagComposeMdr.prototype.updateCost = function () {
                    var propCost = this._selCfg.synthesis_prop;
                    for (var i = 0; i < 3; ++i) {
                        if (propCost[i]) {
                            var prop = game.PropData.create(propCost[i][0]);
                            var bagPropDatas = this._proxy.getPropsByIndex(propCost[i][0]);
                            var bagProp = bagPropDatas && bagPropDatas[i] ? bagPropDatas[i] : null;
                            var iconShowType = 3 /* NotTips */;
                            if (bagProp) {
                                prop = bagProp;
                                iconShowType = 2 /* Bag */; //拥有对应装备才可点击
                            }
                            this._view["consume" + i].setData(prop, iconShowType);
                            var costInfo = propCost[i].concat();
                            if (this._selCnt > 1) {
                                costInfo[1] = costInfo[1] * this._selCnt;
                            }
                            var costIdx = costInfo[0];
                            var cnt = mod.BagUtil.calcPropCnt(costIdx, i, propCost, true);
                            this._view["consume" + i].updateCostLab(costInfo, cnt);
                            this._view["consume" + i].setImgGray('');
                        }
                        else {
                            this._view["consume" + i].defaultIcon();
                            this._view["consume" + i].setImgLock();
                        }
                    }
                    var cost = this._selCfg.consume;
                    var showCost = !!(cost && cost.length);
                    this._view.currentState = showCost ? "cost" : "default";
                    if (showCost) {
                        this._view.cost.updateShow(cost[0]);
                    }
                    this._view.btn_compose.redPoint.visible = this._proxy.canComposeByIndex(this._proxy.selIndex);
                };
                return BagComposeMdr;
            }(game.MdrBase));
            bag.BagComposeMdr = BagComposeMdr;
            __reflect(BagComposeMdr.prototype, "game.mod.bag.BagComposeMdr");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var ItemTapEvent = eui.ItemTapEvent;
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var prop_tips_data = msg.prop_tips_data;
            var BagDelMdr = /** @class */ (function (_super) {
                __extends(BagDelMdr, _super);
                function BagDelMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", bag.BagDelView);
                    _this._itemCnt2 = 5; //格子数
                    _this._itemCnt = 20; //格子数
                    return _this;
                }
                BagDelMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(12 /* Bag */);
                    this._itemList2 = new ArrayCollection();
                    this._view.list_item2.itemRenderer = mod.Icon;
                    this._view.list_item2.dataProvider = this._itemList2;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = mod.IconSelMany;
                    this._view.list_item.dataProvider = this._itemList;
                };
                BagDelMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_del, TouchEvent.TOUCH_TAP, this.onClickDel);
                    addEventListener(this._view.btn_min, TouchEvent.TOUCH_TAP, this.onClickMin);
                    addEventListener(this._view.btn_subtractTen, TouchEvent.TOUCH_TAP, this.onClickSubtractTen);
                    addEventListener(this._view.btn_subtract, TouchEvent.TOUCH_TAP, this.onClickSubtract);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    addEventListener(this._view.btn_addTen, TouchEvent.TOUCH_TAP, this.onClickAddTen);
                    addEventListener(this._view.btn_max, TouchEvent.TOUCH_TAP, this.onClickMax);
                    addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
                    addEventListener(this._view.btn_gotoact, egret.TouchEvent.TOUCH_TAP, this.onClickGotoAct, this);
                    this.onNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, this.onBagUpdate, this);
                };
                BagDelMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initViewShow();
                    this.onInfoUpdate();
                };
                BagDelMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                /** 通用背包事件监听 */
                BagDelMdr.prototype.onBagUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(2 /* Material */) < 0 && types.indexOf(3 /* RoleEquip */) < 0) {
                        return;
                    }
                    this.onInfoUpdate();
                };
                //前往捐献
                BagDelMdr.prototype.onClickGotoAct = function () {
                    mod.ViewMgr.getIns().showViewByID(123 /* UnionStorage */, null, true, game.getLanById("xianzong_tips21" /* xianzong_tips21 */));
                };
                BagDelMdr.prototype.onClickItem = function (e) {
                    var data = e.item;
                    if (!data) {
                        return;
                    }
                    var item = e.itemRenderer;
                    data.selTrue = data.sel = !data.sel;
                    item.setData(data);
                    this.updateItemSel(data);
                    this.selItemUpdate();
                };
                BagDelMdr.prototype.onClickDel = function () {
                    if (!this._finalItems || !this._finalItems.length) {
                        game.PromptBox.getIns().show(game.getLanById("resolve_tips5" /* resolve_tips5 */));
                        return;
                    }
                    var props = [];
                    for (var _i = 0, _a = this._finalItems; _i < _a.length; _i++) {
                        var p = _a[_i];
                        var d = new prop_tips_data();
                        d.idx = p.prop_id;
                        d.cnt = p.count;
                        props.push(d);
                    }
                    this._proxy.c2s_prop_one_key_resolve(props);
                };
                BagDelMdr.prototype.onClickMin = function () {
                    this.checkCnt(1, false);
                };
                BagDelMdr.prototype.onClickSubtractTen = function () {
                    this.subtractSelCnt(10);
                };
                BagDelMdr.prototype.onClickSubtract = function () {
                    this.subtractSelCnt(1);
                };
                BagDelMdr.prototype.onClickAdd = function () {
                    this.addSelCnt(1);
                };
                BagDelMdr.prototype.onClickAddTen = function () {
                    this.addSelCnt(10);
                };
                BagDelMdr.prototype.onClickMax = function () {
                    if (!this._selItem) {
                        return;
                    }
                    var maxCnt = this._selItem.count;
                    this.checkCnt(maxCnt, true);
                };
                BagDelMdr.prototype.subtractSelCnt = function (subtractCnt) {
                    if (!this._selItem) {
                        return;
                    }
                    var cnt = Math.max(1, this._selCnt - subtractCnt);
                    this.checkCnt(cnt, false);
                };
                BagDelMdr.prototype.addSelCnt = function (addCnt) {
                    if (!this._selItem) {
                        return;
                    }
                    var cnt = Math.min(this._selItem.count, this._selCnt + addCnt);
                    this.checkCnt(cnt, true);
                };
                BagDelMdr.prototype.checkCnt = function (cnt, isAdd) {
                    if (cnt == this._selCnt) {
                        var tips = isAdd ? "max_value" /* max_value */ : "min_value" /* min_value */;
                        game.PromptBox.getIns().show(game.getLanById(tips));
                        return;
                    }
                    this.setSelCnt(cnt);
                };
                BagDelMdr.prototype.setSelCnt = function (cnt) {
                    this._selCnt = cnt;
                    this.selCntUpdate();
                };
                BagDelMdr.prototype.initViewShow = function () {
                    this._view.lab_desc1.text = game.getLanById("resolve_tips2" /* resolve_tips2 */);
                    this._view.lab_desc2.text = game.getLanById("resolve_tips4" /* resolve_tips4 */);
                    this._selCnt = 1;
                };
                BagDelMdr.prototype.onInfoUpdate = function () {
                    this.updateItemList();
                    this.initSelItems();
                    this.selItemUpdate();
                };
                BagDelMdr.prototype.updateItemList = function () {
                    this._items = mod.BagUtil.getBagsByTypeAndQuality(3 /* RoleEquip */, game.EquipMeltQuality + 1);
                    var propList = mod.BagUtil.getBagsByType(2 /* Material */);
                    for (var _i = 0, propList_1 = propList; _i < propList_1.length; _i++) {
                        var p = propList_1[_i];
                        if (!p.resolve || !p.resolve.length) {
                            continue;
                        }
                        this._items.push(p);
                    }
                    this._items.sort(game.SortTools.sortProp);
                    var items = [];
                    for (var _a = 0, _b = this._items; _a < _b.length; _a++) {
                        var p = _b[_a];
                        items.push({ prop: p, sel: false, selTrue: false });
                    }
                    if (items.length < this._itemCnt) {
                        items.length = this._itemCnt;
                    }
                    this._itemList.replaceAll(items);
                };
                /**【ID1015569】分解优化。不需要默认勾选第一个，满足品质全勾选即可*/
                BagDelMdr.prototype.initSelItems = function () {
                    // this._selItems = this._items.length ? [this._items[0]] : [];
                    // this._finalItems = this._items.length ? [PropData.clone(this._items[0])] : [];
                    // if(this._selItems.length){
                    //     let list: IconSelManyData[]  = this._itemList.source;
                    //     let itemData = list[0];
                    //     itemData.sel = true;
                    //     this._itemList.itemUpdated(itemData);
                    // }
                    //【ID1015424】 分解优化
                    var selItems = [];
                    if (this._items.length) {
                        var list = this._itemList.source;
                        var size = list.length;
                        for (var i = 0; i < size; i++) {
                            var itemData = list[i];
                            if (!itemData || !itemData.prop) {
                                continue;
                            }
                            //【ID1015569】分解优化。不需要默认勾选第一个，满足品质全勾选即可
                            var prop = itemData.prop;
                            var headType = game.PropData.getPropParse(prop.index);
                            if (headType == 290 /* Equip */) {
                                var propType = game.PropData.getPropParse(prop.index, 2 /* PropType */);
                                if (propType == 1 /* RoleEquip */ && prop.quality <= 4 /* RED */) { //需求是选中红色品质以下的角色装备
                                    itemData.selTrue = itemData.sel = true;
                                    selItems.push(game.PropData.clone(itemData.prop));
                                }
                            }
                            this._itemList.itemUpdated(itemData);
                        }
                    }
                    this._selItems = selItems.concat();
                    this._finalItems = selItems.concat();
                };
                BagDelMdr.prototype.updateItemSel = function (data) {
                    if (data.sel) {
                        //选中
                        this._selItems.push(data.prop);
                        this._finalItems.push(game.PropData.clone(data.prop));
                    }
                    else {
                        //取消选中
                        for (var i = 0; i < this._selItems.length; ++i) {
                            var p = this._selItems[i];
                            if (p.prop_id.eq(data.prop.prop_id)) {
                                this._selItems.splice(i, 1);
                                this._finalItems.splice(i, 1);
                                break;
                            }
                        }
                    }
                };
                /**选中刷新时候更新*/
                BagDelMdr.prototype.selItemUpdate = function () {
                    this.updateSelItem();
                    this.selCntUpdate();
                };
                //显示最后一个选中的道具
                BagDelMdr.prototype.updateSelItem = function () {
                    var lastSelId = this._selItem ? this._selItem.prop_id : null;
                    this._selItem = this._selItems.length ? this._selItems[this._selItems.length - 1] : null;
                    this._view.item.setData(game.PropData.clone(this._selItem), 1 /* Reward */);
                    this._view.item.lab_cnt.visible = false;
                    var cnt = this._selItem ? 1 : 0;
                    this._view.lab_sel.text = game.StringUtil.substitute(game.getLanById("resolve_tips1" /* resolve_tips1 */), [cnt]);
                    if (!this._selItem || (lastSelId && lastSelId.neq(this._selItem.prop_id))) {
                        this._selCnt = 1;
                    }
                };
                BagDelMdr.prototype.selCntUpdate = function () {
                    this._view.lab_cnt.text = this._selCnt + "";
                    //分解可获得
                    var items = [];
                    for (var _i = 0, _a = this._finalItems; _i < _a.length; _i++) {
                        var p = _a[_i];
                        if (this._selItem.prop_id.eq(p.prop_id)) {
                            p.count = this._selCnt;
                        }
                        for (var _b = 0, _c = p.resolve; _b < _c.length; _b++) {
                            var info = _c[_b];
                            var index = info[0];
                            var cnt = info[1] * p.count;
                            var prop = game.PropData.create(index, cnt);
                            items.push(prop);
                        }
                    }
                    items = mod.BagUtil.mergeRewards(items);
                    if (items.length < this._itemCnt2) {
                        items.length = this._itemCnt2;
                    }
                    this._itemList2.replaceAll(items);
                };
                return BagDelMdr;
            }(game.MdrBase));
            bag.BagDelMdr = BagDelMdr;
            __reflect(BagDelMdr.prototype, "game.mod.bag.BagDelMdr");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var BagEquipMdr = /** @class */ (function (_super) {
                __extends(BagEquipMdr, _super);
                function BagEquipMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.typeList = [
                        { bagType: 3 /* RoleEquip */ },
                        { bagType: 4 /* ShenlingEquip */ },
                        { bagType: 6 /* YuanlinEquip */ }
                    ]; /**背包类型*/
                    _this.btnType = "02" /* Equip */; //分页按钮类型
                    return _this;
                }
                return BagEquipMdr;
            }(bag.BagBaseMdr));
            bag.BagEquipMdr = BagEquipMdr;
            __reflect(BagEquipMdr.prototype, "game.mod.bag.BagEquipMdr");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var BagMdr = /** @class */ (function (_super) {
                __extends(BagMdr, _super);
                function BagMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.typeList = [
                        { bagType: 1 /* Goods */, hintTypes: ["12" /* Bag */, "01" /* BagMain */ + "01" /* Bag */, "110" /* BagProp */] },
                        { bagType: 2 /* Material */ },
                        { bagType: 5 /* Gem */ }
                    ]; /**背包类型*/
                    _this.btnType = "01" /* Bag */; //分页按钮类型
                    return _this;
                }
                return BagMdr;
            }(bag.BagBaseMdr));
            bag.BagMdr = BagMdr;
            __reflect(BagMdr.prototype, "game.mod.bag.BagMdr");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var TextEvent = egret.TextEvent;
            var BagMeltMdr = /** @class */ (function (_super) {
                __extends(BagMeltMdr, _super);
                function BagMeltMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", bag.BagMeltView);
                    _this._itemCnt = 25;
                    return _this;
                }
                BagMeltMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(12 /* Bag */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = mod.Icon;
                    this._view.list_item.dataProvider = this._itemList;
                };
                BagMeltMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_shop, TouchEvent.TOUCH_TAP, this.onClickShop);
                    addEventListener(this._view.lab_add, TextEvent.LINK, this.onClickVip);
                    addEventListener(this._view.btn_roleRing, TouchEvent.TOUCH_TAP, this.onClickRoleRing);
                    addEventListener(this._view.btn_melt, TouchEvent.TOUCH_TAP, this.onClickMelt);
                    this.onNt("on_bag_update_by_bag_type" /* ON_BAG_UPDATE_BY_BAG_TYPE */, this.onBagUpdate, this);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateIndex, this);
                    this.onNt("on_bag_melt_value_update" /* ON_BAG_MELT_VALUE_UPDATE */, this.updateMeltCnt, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                };
                BagMeltMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initViewShow();
                    this.updateItemList();
                    this.updateCnt();
                    this.updateMeltCnt();
                    this.updateHint();
                    this.updateRoleRing();
                };
                BagMeltMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                /** 通用背包事件监听 */
                BagMeltMdr.prototype.onBagUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(3 /* RoleEquip */) < 0) {
                        return;
                    }
                    this.updateItemList();
                };
                /** 通用背包事件监听 */
                BagMeltMdr.prototype.onBagUpdateIndex = function (n) {
                    var indexs = n.body;
                    if (indexs.indexOf(1450100005 /* Ronglianjingshi */) < 0) {
                        return;
                    }
                    this.updateCnt();
                };
                BagMeltMdr.prototype.onClickShop = function () {
                    mod.ViewMgr.getIns().showViewByID(54 /* ExchangeType1 */);
                };
                BagMeltMdr.prototype.onClickVip = function () {
                    mod.ViewMgr.getIns().openVipView();
                };
                BagMeltMdr.prototype.onClickMelt = function () {
                    if (!this._items || !this._items.length) {
                        game.PromptBox.getIns().show(game.getLanById("ronglian_tips2" /* ronglian_tips2 */));
                        return;
                    }
                    this._proxy.clickMelt(this._items);
                };
                BagMeltMdr.prototype.initViewShow = function () {
                    this._view.item.setData(1450100005 /* Ronglianjingshi */);
                    var cfg = game.GameConfig.getPropConfigById(1450100005 /* Ronglianjingshi */);
                    this._view.img_icon.source = cfg.icon;
                    this._view.lab_desc.text = game.getLanById("ronglian_tips4" /* ronglian_tips4 */);
                    this._view.lab_add.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(game.getLanById("equip_Rresolve_tips4" /* equip_Rresolve_tips4 */), 2330156 /* GREEN */, ""));
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(game.getLanById("ronglian_tips3" /* ronglian_tips3 */), 2330156 /* GREEN */));
                };
                BagMeltMdr.prototype.updateItemList = function () {
                    this._items = this._proxy.getMeltBag();
                    var items = this._items.concat();
                    if (items.length < this._itemCnt) {
                        items.length = this._itemCnt;
                    }
                    this._itemList.replaceAll(items);
                };
                BagMeltMdr.prototype.updateCnt = function () {
                    this._view.item.updateShow();
                };
                BagMeltMdr.prototype.updateMeltCnt = function () {
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor(this._proxy.meltVal + "/" + this._proxy.meltMaxVal, 2330156 /* GREEN */));
                };
                /** 通用红点事件监听 */
                BagMeltMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    if (data.node == mod.HintMgr.getType(this._proxy.meltHint)) {
                        this.updateMeltHint(data.value);
                    }
                };
                /** 更新红点 */
                BagMeltMdr.prototype.updateHint = function () {
                    this.updateMeltHint(mod.HintMgr.getHint(this._proxy.meltHint));
                };
                BagMeltMdr.prototype.updateMeltHint = function (hint) {
                    this._view.btn_melt.redPoint.visible = hint;
                };
                BagMeltMdr.prototype.updateRoleRing = function () {
                    var isAct = mod.RoleUtil.isRoleRingAct();
                    this._view.grp_roleRing.visible = !isAct;
                };
                BagMeltMdr.prototype.onClickRoleRing = function () {
                    mod.ViewMgr.getIns().showViewByID(38 /* RoleRing */);
                };
                return BagMeltMdr;
            }(game.MdrBase));
            bag.BagMeltMdr = BagMeltMdr;
            __reflect(BagMeltMdr.prototype, "game.mod.bag.BagMeltMdr");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var ArrayCollection = eui.ArrayCollection;
            var Tween = base.Tween;
            var Handler = base.Handler;
            var Quint = base.Quint;
            var BestPropTipsMdr = /** @class */ (function (_super) {
                __extends(BestPropTipsMdr, _super);
                function BestPropTipsMdr() {
                    var _this = _super.call(this, game.Layer.tip) || this;
                    _this._view = _this.mark("_view", bag.BestPropTipsView);
                    return _this;
                }
                BestPropTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    //this._view.bottom = 113;
                    this._view.verticalCenter = 201;
                    this._rewardList = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._rewardList;
                };
                BestPropTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                BestPropTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initReward();
                    this.showImgBgTween();
                };
                BestPropTipsMdr.prototype.onHide = function () {
                    this.removeImgBgTween();
                    mod.PropTipsMgr.getIns().closeBestProp();
                    _super.prototype.onHide.call(this);
                };
                BestPropTipsMdr.prototype.initReward = function () {
                    this._rewardList.source = this._showArgs;
                    this._view.scr_reward.visible = false;
                };
                BestPropTipsMdr.prototype.showImgBgTween = function () {
                    var _this = this;
                    this._view.img_bg.y = 0;
                    this._view.img_bg.scaleX = this._view.img_bg.scaleY = 0.1;
                    Tween.get(this._view.img_bg)
                        .to({ scaleX: 1, scaleY: 1 }, 200, null, Quint.easeIn)
                        .exec(Handler.alloc(this, function () {
                        _this._view.scr_reward.visible = true;
                    }))
                        .delay(900)
                        .exec(Handler.alloc(this, function () {
                        _this._view.scr_reward.visible = false;
                    }))
                        .to({ scaleX: 0.1, scaleY: 0.1, y: 200 }, 200, null, Quint.easeOut)
                        .exec(Handler.alloc(this, function () {
                        _this.hide();
                    }));
                };
                BestPropTipsMdr.prototype.removeImgBgTween = function () {
                    Tween.remove(this._view.img_bg);
                };
                return BestPropTipsMdr;
            }(game.MdrBase));
            bag.BestPropTipsMdr = BestPropTipsMdr;
            __reflect(BestPropTipsMdr.prototype, "game.mod.bag.BestPropTipsMdr");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var ArrayCollection = eui.ArrayCollection;
            var GainWaysTipsMdr = /** @class */ (function (_super) {
                __extends(GainWaysTipsMdr, _super);
                function GainWaysTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", bag.GainWaysTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                GainWaysTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._attrList = new ArrayCollection();
                    this._view.list_item.itemRenderer = bag.GainWaysTipsItem;
                    this._view.list_item.dataProvider = this._attrList;
                };
                GainWaysTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_view_hide" /* ON_VIEW_HIDE */, this.hide, this);
                };
                GainWaysTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                };
                GainWaysTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                GainWaysTipsMdr.prototype.updateShow = function () {
                    var index = this._showArgs;
                    var prop = game.PropData.create(index);
                    this._view.icon.setData(prop);
                    var cfg = prop.cfg;
                    var itemList = cfg.gain_id || [];
                    this._attrList.source = itemList;
                    if (prop.quality == 6 /* GREEN */) {
                        this._view.lab_name.textColor = 0x2FFA28;
                        this._view.lab_name.text = cfg.name;
                        return;
                    }
                    this._view.lab_name.textFlow = prop.getPropName();
                };
                return GainWaysTipsMdr;
            }(game.MdrBase));
            bag.GainWaysTipsMdr = GainWaysTipsMdr;
            __reflect(GainWaysTipsMdr.prototype, "game.mod.bag.GainWaysTipsMdr");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var Tween = base.Tween;
            var TimeMgr = base.TimeMgr;
            var MeltTipsMdr = /** @class */ (function (_super) {
                __extends(MeltTipsMdr, _super);
                function MeltTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", bag.MeltTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                MeltTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.verticalCenter = 0;
                };
                MeltTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                MeltTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initReward();
                    this.showTween();
                    this.showEffect();
                    TimeMgr.addUpdateItem(this, 15);
                };
                MeltTipsMdr.prototype.onHide = function () {
                    this.removeTween();
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                MeltTipsMdr.prototype.initReward = function () {
                    if (!this._showArgs || !this._showArgs.props) {
                        this.hide();
                        return;
                    }
                    var reward = this._showArgs.props[0];
                    this._view.icon.setData(reward, 4 /* NotCnt */);
                    //let value = this._showArgs.value ? this._showArgs.value : 0;
                    //let cntStr = "+" + reward.cnt + TextUtil.addColor("(+" + value + "%)", WhiteColor.GREEN);
                    //this._view.lab_cnt.textFlow = TextUtil.parseHtml(cntStr);
                    this._curCnt = 0;
                    this._addCnt = reward.cnt;
                    this._perAdd = Math.max(Math.ceil(this._addCnt / 100), 1);
                    this._view.lab_cnt.text = "";
                };
                MeltTipsMdr.prototype.showTween = function () {
                    this.removeTween();
                    this._view.img_type.scaleX = this._view.img_type.scaleY = 7;
                    Tween.get(this._view.img_type)
                        .to({ scaleX: 1, scaleY: 1 }, 200);
                };
                MeltTipsMdr.prototype.removeTween = function () {
                    Tween.remove(this._view.img_type);
                };
                MeltTipsMdr.prototype.showEffect = function () {
                    this.removeEft();
                    this.addEftByParent("success" /* Success */, this._view.grp_eft, 0, 0, 0, null, 1);
                    this.addEftByParent("tips_bg" /* TipsBg */, this._view.grp_eft2);
                };
                MeltTipsMdr.prototype.update = function (time) {
                    this.showCntTween();
                };
                MeltTipsMdr.prototype.showCntTween = function () {
                    this._curCnt = Math.min(this._curCnt + this._perAdd, this._addCnt);
                    var value = this._showArgs.value ? this._showArgs.value : 0;
                    var cntStr = "+" + this._curCnt + game.TextUtil.addColor("(+" + value + "%)", 2330156 /* GREEN */);
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                    if (this._curCnt >= this._addCnt) {
                        TimeMgr.removeUpdateItem(this);
                    }
                };
                return MeltTipsMdr;
            }(game.EffectMdrBase));
            bag.MeltTipsMdr = MeltTipsMdr;
            __reflect(MeltTipsMdr.prototype, "game.mod.bag.MeltTipsMdr", ["base.UpdateItem"]);
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var Handler = base.Handler;
            var Tween = base.Tween;
            var delayCall = base.delayCall;
            var PropGainMdr = /** @class */ (function (_super) {
                __extends(PropGainMdr, _super);
                function PropGainMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", bag.PropGainView);
                    _this.ROW_C = 6; //最多显示6行奖励，即24个奖励
                    _this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    return _this;
                }
                PropGainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.verticalCenter = 0;
                };
                PropGainMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    this._view.closeTips.visible = false;
                    this.showEffect();
                    this.showTween();
                    this.updateReward();
                };
                PropGainMdr.prototype.onHide = function () {
                    this.removeTween();
                    mod.PropTipsMgr.getIns().closeBestPropCenter();
                    _super.prototype.onHide.call(this);
                };
                PropGainMdr.prototype.showEffect = function () {
                    this.removeEft();
                    this.addEftByParent("success" /* Success */, this._view.grp_eft, 0, 0, 0, null, 1);
                    this.addEftByParent("tips_bg" /* TipsBg */, this._view.grp_eft2);
                };
                //显示奖励
                PropGainMdr.prototype.updateReward = function () {
                    var rewards = this._showArgs;
                    this._view.resultReward.updateRewardList(rewards, Handler.alloc(this, this.onRewardTweenEnd), true, this.ROW_C);
                };
                PropGainMdr.prototype.showTween = function () {
                    this.removeTween();
                    this._view.img_type.scaleX = this._view.img_type.scaleY = 7;
                    Tween.get(this._view.img_type)
                        .to({ scaleX: 1, scaleY: 1 }, 200);
                };
                PropGainMdr.prototype.removeTween = function () {
                    Tween.remove(this._view.img_type);
                };
                /**********************奖励表现相关**********************/
                //结束动画后执行
                PropGainMdr.prototype.onRewardTweenEnd = function () {
                    var _this = this;
                    this._view.closeTips.visible = true;
                    this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
                    delayCall(Handler.alloc(this, function () {
                        _this.isEasyHide = true; //动画表现结束后设置为可点击
                    }), 200);
                };
                return PropGainMdr;
            }(game.EffectMdrBase));
            bag.PropGainMdr = PropGainMdr;
            __reflect(PropGainMdr.prototype, "game.mod.bag.PropGainMdr");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var TouchEvent = egret.TouchEvent;
            var PropPillTipsMdr = /** @class */ (function (_super) {
                __extends(PropPillTipsMdr, _super);
                function PropPillTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", bag.PropPillTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                PropPillTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(12 /* Bag */);
                };
                PropPillTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_goto, TouchEvent.TOUCH_TAP, this.onClickGoto);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updateAttr, this);
                    this.onNt("on_view_hide" /* ON_VIEW_HIDE */, this.hide, this);
                };
                PropPillTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.updateAttr();
                };
                PropPillTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                PropPillTipsMdr.prototype.onClickGoto = function () {
                    if (!this._propData) {
                        return;
                    }
                    var propSubType = this._propData.propSubType;
                    var jumpIdx = game.LianshendanToJumpIdx[propSubType];
                    mod.ViewMgr.getIns().showViewByID(jumpIdx);
                };
                PropPillTipsMdr.prototype.updateShow = function () {
                    this._propData = this._showArgs;
                    this._view.basePropTips.updateShow(this._propData);
                    var curCnt = mod.BagUtil.getPropCntByIdx(this._propData.index);
                    var cntStr = "拥有数量：" + curCnt;
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                    this._view.baseDescItem.updateShow(this._propData.desc); //道具描述
                    if (this._view.basePropGainList) {
                        this._view.basePropGainList.updateShow(this._propData.gain_id); //获取途径
                    }
                };
                PropPillTipsMdr.prototype.updateAttr = function () {
                    var propCfg = this._propData.cfg;
                    var attrIndex = propCfg.param1[0][0];
                    var attr = mod.RoleUtil.getAttr(attrIndex);
                    if (!attr) {
                        return;
                    }
                    this._view.power.setPowerValue(attr.showpower);
                    this._view.baseAttrItem.updateShow(attr, true);
                };
                return PropPillTipsMdr;
            }(game.MdrBase));
            bag.PropPillTipsMdr = PropPillTipsMdr;
            __reflect(PropPillTipsMdr.prototype, "game.mod.bag.PropPillTipsMdr");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var PropSurfaceTipsMdr = /** @class */ (function (_super) {
                __extends(PropSurfaceTipsMdr, _super);
                function PropSurfaceTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", bag.PropSurfaceTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                PropSurfaceTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(12 /* Bag */);
                    this._view.list_skill.itemRenderer = mod.ShenLingSkillIconTap;
                    this._view.list_skill.dataProvider = this._listSkill = new eui.ArrayCollection();
                };
                PropSurfaceTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_skill, TouchEvent.TOUCH_TAP, this.onClickSkill);
                    addEventListener(this._view.list_skill, eui.ItemTapEvent.ITEM_TAP, this.onClickTalent, this);
                    this.onNt("on_view_hide" /* ON_VIEW_HIDE */, this.hide, this);
                };
                PropSurfaceTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.updateShenling();
                };
                PropSurfaceTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                PropSurfaceTipsMdr.prototype.onClickSkill = function (e) {
                    var sData = e.currentTarget.data;
                    var data = {
                        index: this._index,
                        skill_index: sData.skill_index,
                        skill_type: 3 /* PuGong */
                    };
                    facade.showView("45" /* Shenling */, "05" /* ShenLingSkill */, data);
                };
                PropSurfaceTipsMdr.prototype.onClickTalent = function (e) {
                    var sData = e.item;
                    var data = {
                        index: this._cfg.index,
                        skill_index: sData.skill_index,
                        skill_type: 4 /* Talent */
                    };
                    facade.showView("45" /* Shenling */, "05" /* ShenLingSkill */, data);
                };
                PropSurfaceTipsMdr.prototype.updateShow = function () {
                    this._propData = this._showArgs;
                    var cfg = this._propData.cfg;
                    this._view.basePropTips.updateShow(this._propData);
                    var power = mod.RoleUtil.getSurfacePower(cfg.god, cfg.showPower);
                    this._view.power.setPowerValue(power);
                    var index = cfg.param1 ? cfg.param1[0][0] : 0;
                    this._index = index;
                    if (index) {
                        this._view.img_status.source = mod.SurfaceUtil.isAct(index) ? "yijihuo" : "weijihuo";
                        this._view.baseSurfaceItem.updateShow(index, cfg.god);
                    }
                    this._view.baseDescItem.updateShow(this._propData.desc);
                    if (this._view.basePropGainList) {
                        this._view.basePropGainList.updateShow(this._propData.gain_id);
                    }
                };
                PropSurfaceTipsMdr.prototype.updateShenling = function () {
                    if (!this._index) {
                        return;
                    }
                    var headType = game.PropData.getPropParse(this._index, 1 /* Type */);
                    if (headType != 400 /* Shenling */) {
                        this._view.currentState = "default";
                        return;
                    }
                    this._view.currentState = "shenling";
                    var _proxy = game.getProxy("45" /* Shenling */, 189 /* Shenling */);
                    var cfg = _proxy.getShenLingCfg(this._index);
                    this._cfg = cfg;
                    this._view.img_type.source = "shuxingtubiao_" + cfg.type;
                    this._view.btn_skill.data = {
                        skill_index: cfg.common,
                        is_act: true,
                        skill_type: 3 /* PuGong */
                    };
                    var starCfg = _proxy.getStarCfg(this._index, 1);
                    var power = starCfg && starCfg.star_power || 0;
                    this.addBmpFont("+" + power / 100 + "%", game.BmpTextCfg[100 /* CommonPower */], this._view.gr_power);
                    this._view.name0.setTitle(game.getLanById("shenling_tips7" /* shenling_tips7 */));
                    var list = [];
                    for (var _i = 0, _a = cfg.talent1; _i < _a.length; _i++) {
                        var item = _a[_i];
                        list.push({
                            skill_index: item[1],
                            is_act: true
                        });
                    }
                    this._listSkill.replaceAll(list);
                };
                return PropSurfaceTipsMdr;
            }(game.EffectMdrBase));
            bag.PropSurfaceTipsMdr = PropSurfaceTipsMdr;
            __reflect(PropSurfaceTipsMdr.prototype, "game.mod.bag.PropSurfaceTipsMdr");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var bag;
        (function (bag) {
            var TouchEvent = egret.TouchEvent;
            var prop_use = msg.prop_use;
            var prop_use_params = msg.prop_use_params;
            var Handler = base.Handler;
            var PropTipsMdr = /** @class */ (function (_super) {
                __extends(PropTipsMdr, _super);
                function PropTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", bag.PropTipsView);
                    _this.SCR_H_USE_AND_EXCHANGE = 426; //有使用按钮或者兑换时，滚动区域高度
                    _this.SCR_H_GOTO = 500; //有前往按钮时，滚动区域高度
                    _this.SCR_H = 624; //没有使用按钮时，滚动区域高度
                    _this.isEasyHide = true;
                    return _this;
                }
                PropTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(12 /* Bag */);
                };
                PropTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_use, TouchEvent.TOUCH_TAP, this.onClickUse);
                    addEventListener(this._view.btn_subtractTen, TouchEvent.TOUCH_TAP, this.onClickSubtractTen);
                    addEventListener(this._view.btn_subtract, TouchEvent.TOUCH_TAP, this.onClickSubtract);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    addEventListener(this._view.btn_addTen, TouchEvent.TOUCH_TAP, this.onClickAddTen);
                    addEventListener(this._view.btn_goto, TouchEvent.TOUCH_TAP, this.onClickGoto);
                    this.onNt("on_view_hide" /* ON_VIEW_HIDE */, this.hide, this);
                };
                PropTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.updateReward();
                    this.updateUse();
                };
                PropTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                PropTipsMdr.prototype.onClickUse = function () {
                    if (!this._propData) {
                        return;
                    }
                    var prop = new prop_use();
                    prop.prop_id = this._propData.prop_id;
                    prop.use_cnt = this._selCnt;
                    if (this._isSel) {
                        //选中奖励
                        var index = this._view.baseRewardList.getSelIndex();
                        if (index < 0) {
                            game.PromptBox.getIns().show(game.getLanById("select_reward_tips" /* select_reward_tips */));
                            return;
                        }
                        prop.use_params = new prop_use_params();
                        prop.use_params.choose = index + 1; //服务端需要下标+1
                    }
                    this._proxy.c2s_prop_list_use([prop]);
                    this.hide();
                };
                PropTipsMdr.prototype.onClickSubtractTen = function () {
                    this.subtractSelCnt(10);
                };
                PropTipsMdr.prototype.onClickSubtract = function () {
                    this.subtractSelCnt(1);
                };
                PropTipsMdr.prototype.onClickAdd = function () {
                    this.addSelCnt(1);
                };
                PropTipsMdr.prototype.onClickAddTen = function () {
                    this.addSelCnt(10);
                };
                PropTipsMdr.prototype.subtractSelCnt = function (subtractCnt) {
                    var cnt = Math.max(1, this._selCnt - subtractCnt);
                    if (cnt == this._selCnt) {
                        game.PromptBox.getIns().show(game.getLanById("min_value" /* min_value */));
                        return;
                    }
                    this.setSelCnt(cnt);
                };
                PropTipsMdr.prototype.addSelCnt = function (addCnt) {
                    var cnt = Math.min(this._propData.count, this._selCnt + addCnt);
                    if (cnt == this._selCnt) {
                        game.PromptBox.getIns().show(game.getLanById("max_value" /* max_value */));
                        return;
                    }
                    this.setSelCnt(cnt);
                };
                PropTipsMdr.prototype.setSelCnt = function (cnt) {
                    this._selCnt = cnt;
                    this.updateUseCnt();
                };
                PropTipsMdr.prototype.onClickGoto = function () {
                    if (!this._propData) {
                        return;
                    }
                    var cfg = this._propData.cfg;
                    var jumpIdx = cfg.jump_id;
                    mod.ViewMgr.getIns().showViewByID(jumpIdx);
                };
                PropTipsMdr.prototype.updateShow = function () {
                    this._propData = this._showArgs;
                    var cfg = this._propData.cfg;
                    this._view.basePropTips.updateShow(this._propData);
                    var curCnt = mod.BagUtil.getPropCntByIdx(this._propData.index);
                    var cntStr = "拥有数量：" + curCnt;
                    if (cfg.condition && cfg.condition.length) {
                        //背包使用条件
                        cntStr = this.getLimitStr(cfg.condition) + "\n" + cntStr;
                    }
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                    this._view.baseDescItem.updateShow(this._propData.desc);
                    if (this._view.basePropGainList) {
                        this._view.basePropGainList.updateShow(this._propData.gain_id);
                    }
                };
                //显示奖励
                PropTipsMdr.prototype.updateReward = function () {
                    var cfg = this._propData.cfg;
                    var rewards = [];
                    this._isSel = false; //是否可选择
                    if (cfg.show_reward) {
                        //策划配置了展示道具
                        rewards = cfg.show_reward;
                    }
                    else if (this._propData.propType == 3 /* Box */ && this._propData.propSubType == 2 /* Type2 */) {
                        //自选宝箱
                        rewards = cfg.param1;
                        this._isSel = true;
                    }
                    if (!rewards.length) {
                        this._view.currentState = "default";
                        return;
                    }
                    this._view.currentState = "reward";
                    this._view.baseRewardList.updateShow(rewards, this._isSel);
                };
                PropTipsMdr.prototype.updateUse = function () {
                    //优先显示兑换
                    this._view.exchangeTips.updateExchangeTips(this._propData, Handler.alloc(this, this.hide));
                    var showExchange = this._view.exchangeTips.visible;
                    var iconShowType = this._propData.iconShowType;
                    var cfg = this._propData.cfg;
                    var showUse = false; //显示使用
                    var showGoto = false; //显示前往
                    if (!showExchange && iconShowType == 2 /* Bag */) {
                        showUse = !!cfg.usable;
                        showGoto = !showUse && !!cfg.jump_id; //两者只能二选一
                    }
                    this._view.grp_use.visible = showUse;
                    this._view.btn_goto.visible = showGoto;
                    this._view.scr.height = showUse || showExchange ? this.SCR_H_USE_AND_EXCHANGE : (showGoto ? this.SCR_H_GOTO : this.SCR_H);
                    if (showUse) {
                        //判断选择最大数量
                        var selCnt = cfg.max_number ? this._propData.count : 1;
                        this.setSelCnt(selCnt);
                        //使用时判断使用条件
                        var useStr = this._proxy.getUseStr(cfg.condition, this._propData);
                        this._view.lab_useTips.text = useStr;
                        this._view.btn_use.visible = useStr == ""; //返回空的时候，表示能使用
                    }
                };
                PropTipsMdr.prototype.updateUseCnt = function () {
                    this._view.lab_useCnt.text = this._selCnt + "";
                };
                //使用条件文本
                PropTipsMdr.prototype.getLimitStr = function (condition) {
                    var limitStr = game.getLanById("bag_use_tips" /* bag_use_tips */) + "：";
                    for (var _i = 0, condition_2 = condition; _i < condition_2.length; _i++) {
                        var info = condition_2[_i];
                        var type = info[0];
                        var limitValue = info[1];
                        switch (type) {
                            case 1 /* VIP_INDEX */:
                                //vip
                                limitStr += mod.VipUtil.getVipStr(limitValue);
                                break;
                            case 2 /* LOGINDAY */:
                                //登录天数
                                limitStr += game.StringUtil.substitute(game.getLanById("bag_use_tips2" /* bag_use_tips2 */), [limitValue]);
                                break;
                            case 7 /* OwnLoginDay */:
                                //拥有天数
                                limitStr += game.StringUtil.substitute(game.getLanById("bag_use_tips2" /* bag_use_tips2 */), [limitValue]);
                                break;
                        }
                    }
                    return limitStr;
                };
                return PropTipsMdr;
            }(game.MdrBase));
            bag.PropTipsMdr = PropTipsMdr;
            __reflect(PropTipsMdr.prototype, "game.mod.bag.PropTipsMdr");
        })(bag = mod.bag || (mod.bag = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=bag.js.map