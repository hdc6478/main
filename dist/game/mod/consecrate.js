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
        var consecrate;
        (function (consecrate) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var ConsecrateShelfItem = /** @class */ (function (_super) {
                __extends(ConsecrateShelfItem, _super);
                function ConsecrateShelfItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ConsecrateShelfItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("57" /* Consecrate */).retProxy(225 /* Consecrate */);
                    // this.icon.addEventListener(TouchEvent.TOUCH_TAP, this.onClickIcon, this);
                    this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                ConsecrateShelfItem.prototype.dataChanged = function () {
                    if (this.data == null) {
                        return;
                    }
                    this.icon.setData(this.data);
                    this.lab_name.textFlow = this.icon.getPropName();
                    var cfg = this.data.cfg;
                    var score = cfg.param1[1][0];
                    this.lab_score.text = game.getLanById("consecrate_title3" /* consecrate_title3 */) + "\uFF1A+" + score;
                    var seconds = cfg.param1[0][0];
                    this.addBmpFont(game.TimeUtil.getConsecrateTime(seconds), game.BmpTextCfg[104 /* MainVip */], this.grp_time);
                };
                //外部指引调用
                ConsecrateShelfItem.prototype.onClick = function () {
                    this._proxy.c2s_consecrate_putin([this.data.index]);
                    facade.sendNt("on_close_consecrate_shelf" /* ON_CLOSE_CONSECRATE_SHELF */);
                };
                return ConsecrateShelfItem;
            }(mod.BaseRenderer));
            consecrate.ConsecrateShelfItem = ConsecrateShelfItem;
            __reflect(ConsecrateShelfItem.prototype, "game.mod.consecrate.ConsecrateShelfItem");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var ConsecrateMod = /** @class */ (function (_super) {
                __extends(ConsecrateMod, _super);
                function ConsecrateMod() {
                    return _super.call(this, "57" /* Consecrate */) || this;
                }
                ConsecrateMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                ConsecrateMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(225 /* Consecrate */, consecrate.ConsecrateProxy);
                };
                ConsecrateMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* Consecrate */, consecrate.ConsecrateMainMdr);
                    this.regMdr("02" /* ConsecrateShelf */, consecrate.ConsecrateShelfMdr);
                    this.regMdr("03" /* ConsecrateSpeedUp */, consecrate.ConsecrateSpeedUpMdr);
                    this.regMdr("04" /* ConsecrateLottery */, consecrate.ConsecrateLotteryMdr);
                    this.regMdr("05" /* ConsecratePreview */, consecrate.ConsecratePreviewRewardMdr);
                    this.regMdr("21" /* AmassUp */, consecrate.AmassUpMdr);
                    this.regMdr("22" /* AmassTips */, consecrate.AmassTipsMdr);
                };
                return ConsecrateMod;
            }(game.ModBase));
            consecrate.ConsecrateMod = ConsecrateMod;
            __reflect(ConsecrateMod.prototype, "game.mod.consecrate.ConsecrateMod");
            gso.modCls.push(ConsecrateMod);
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var c2s_consecrate_putin = msg.c2s_consecrate_putin;
            var c2s_consecrate_speedup = msg.c2s_consecrate_speedup;
            var c2s_consecrate_get = msg.c2s_consecrate_get;
            var c2s_consecrate_draw = msg.c2s_consecrate_draw;
            var c2s_consecrate_info = msg.c2s_consecrate_info;
            var s2c_consecrate_draw = msg.s2c_consecrate_draw;
            var s2c_consecrate_info = msg.s2c_consecrate_info;
            var c2s_consecrate_get_back = msg.c2s_consecrate_get_back;
            var c2s_amass_advance = msg.c2s_amass_advance;
            var s2c_amass_info = msg.s2c_amass_info;
            var ConsecrateProxy = /** @class */ (function (_super) {
                __extends(ConsecrateProxy, _super);
                function ConsecrateProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(ConsecrateProxy.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    enumerable: true,
                    configurable: true
                });
                ConsecrateProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new consecrate.ConsecrateModel();
                    this.onProto(s2c_consecrate_draw, this.s2c_consecrate_draw, this);
                    this.onProto(s2c_consecrate_info, this.s2c_consecrate_info, this);
                    this.onProto(s2c_amass_info, this.s2c_amass_info, this);
                };
                /**--------------------协议start-------------------- */
                /**
                 * 放入封魂
                 * @param prop_id
                 * @param pos 0则一键放入
                 * */
                ConsecrateProxy.prototype.c2s_consecrate_putin = function (prop_id) {
                    var msg = new c2s_consecrate_putin();
                    msg.prop_id = prop_id;
                    this.sendProto(msg);
                };
                /**卸下 */
                ConsecrateProxy.prototype.c2s_consecrate_get_back = function (pos) {
                    var msg = new c2s_consecrate_get_back();
                    msg.pos = pos;
                    this.sendProto(msg);
                };
                /**
                 * 加速封魂
                 * @param oper 1为单个加速 2为全部加速
                 * @param pos oper为1时需要传位置
                 * */
                ConsecrateProxy.prototype.c2s_consecrate_speedup = function (oper, pos) {
                    var msg = new c2s_consecrate_speedup();
                    msg.oper = oper;
                    msg.pos = pos;
                    this.sendProto(msg);
                };
                /**领取宝箱 */
                ConsecrateProxy.prototype.c2s_consecrate_get = function (oper, pos) {
                    var msg = new c2s_consecrate_get();
                    msg.oper = oper;
                    msg.pos = pos;
                    this.sendProto(msg);
                };
                /**封魔珍宝(抽奖) */
                ConsecrateProxy.prototype.c2s_consecrate_draw = function () {
                    var msg = new c2s_consecrate_draw();
                    this.sendProto(msg);
                };
                /**打开界面请求 */
                ConsecrateProxy.prototype.c2s_consecrate_info = function () {
                    var msg = new c2s_consecrate_info();
                    this.sendProto(msg);
                };
                /**抽奖返回 */
                ConsecrateProxy.prototype.s2c_consecrate_draw = function (n) {
                    var msg = n.body;
                    this.sendNt("on_tween_consecrate_open" /* ON_TWEEN_CONSECRATE_OPEN */, msg.index);
                };
                ConsecrateProxy.prototype.s2c_consecrate_info = function (n) {
                    var msg = n.body;
                    this._model.list = msg.list || [];
                    this._model.storage_time = msg.storage_time || 0;
                    game.RoleVo.ins.setValueByKey("storage_time" /* storage_time */, this._model.storage_time);
                    this.onUpdateHintSealDevil();
                    this.sendNt("on_update_consecrate_info" /* ON_UPDATE_CONSECRATE_INFO */);
                };
                /**--------------------协议end-------------------- */
                /**是否有可领奖励 */
                ConsecrateProxy.prototype.getIsReward = function () {
                    if (!this._model.list) {
                        return false;
                    }
                    for (var _i = 0, _a = this._model.list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.state == 3) {
                            return true;
                        }
                    }
                    return false;
                };
                /**正在封印的道具 */
                ConsecrateProxy.prototype.getDoingInfo = function () {
                    if (this._model.list) {
                        for (var _i = 0, _a = this._model.list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            if (info.state == 1) {
                                return info;
                            }
                        }
                    }
                    return null;
                };
                /**正在计算时间的道具 */
                ConsecrateProxy.prototype.getEndTime = function () {
                    var info = this.getDoingInfo();
                    if (info) {
                        var cfg = game.GameConfig.getPropConfigById(info.prop_id);
                        var seconds = cfg.param1[0][0];
                        return info.begin_time + seconds;
                    }
                    return 0;
                };
                /**根据位置获取数据 */
                ConsecrateProxy.prototype.getInfoByPos = function (pos) {
                    if (this._model.list) {
                        for (var _i = 0, _a = this._model.list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            if (info.pos == pos) {
                                return info;
                            }
                        }
                    }
                    return null;
                };
                /**上架魔魂的总时间 显示需要减去当前封印已经过去的时间 */
                ConsecrateProxy.prototype.getListSpeedUpTime = function () {
                    if (!this._model.list) {
                        return 0;
                    }
                    var time = 0;
                    for (var _i = 0, _a = this._model.list; _i < _a.length; _i++) {
                        var info = _a[_i];
                        if (info.state == 3) {
                            continue;
                        }
                        var prop = game.PropData.create(info.prop_id);
                        var seconds = prop.cfg.param1[0][0] || 0;
                        time += seconds;
                    }
                    return time;
                };
                /**获取空格数量 */
                ConsecrateProxy.prototype.getSpaceCount = function () {
                    var num = this.getConsecrateCount();
                    return this._model.num - num;
                };
                /**已经供奉的数量 */
                ConsecrateProxy.prototype.getConsecrateCount = function () {
                    return this._model.list && this._model.list.length || 0;
                };
                /**
                 * 上架弹窗显示列表
                 * type=1时间加速道具 param1 秒
                 * type=2魔魂道具 param1 秒,积分,掉落id1_掉落id2
                 * */
                ConsecrateProxy.prototype.getPropList = function (type) {
                    if (type === void 0) { type = 2; }
                    var propArr = mod.BagUtil.getBagsByTypeAndPropType(2 /* Material */, 12 /* Consecrate */);
                    var list = [];
                    for (var _i = 0, propArr_1 = propArr; _i < propArr_1.length; _i++) {
                        var prop = propArr_1[_i];
                        if (Math.floor(prop.index % 10000 / 1000) == type) {
                            list.push(prop);
                        }
                    }
                    return list.sort(this.sortByQuality);
                };
                ConsecrateProxy.prototype.sortByQuality = function (a, b) {
                    // todo 策划要求写死
                    if (a.index == 1451202024 || a.index == 1451202029) {
                        return -1;
                    }
                    if (b.index == 1451202024 || b.index == 1451202029) {
                        return 1;
                    }
                    if (a.quality != b.quality) {
                        return b.quality - a.quality;
                    }
                    return a.index - b.index;
                };
                ConsecrateProxy.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    var cfg = game.getConfigByNameId("param.json" /* Param */, "gongfeng_lottery");
                    if (keys.indexOf(game.PropIndexToKey[cfg.value[0]]) > -1) {
                        this.onUpdateHintSealDevil();
                    }
                };
                ConsecrateProxy.prototype.onBagUpdateByBagType = function (n) {
                    var bagTypes = n.body;
                    if (bagTypes.indexOf(2 /* Material */) > -1) {
                        this.onUpdateHintSealDevil();
                    }
                };
                /**是否有空格且背包有道具使用 */
                ConsecrateProxy.prototype.checkIsUse = function () {
                    var cnt = this.getSpaceCount();
                    if (!cnt) {
                        return false;
                    }
                    var list = this.getPropList();
                    if (list && list.length) {
                        return true;
                    }
                    return false;
                };
                /**封魔红点 */
                ConsecrateProxy.prototype.onUpdateHintSealDevil = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670161 /* Consecrate */)) {
                        return;
                    }
                    var root = ["57" /* Consecrate */, "01" /* Consecrate */, "01" /* TabBtnType01 */];
                    var ing = this.getDoingInfo();
                    var use = this.checkIsUse();
                    var reward = this.getIsReward();
                    var speedup = this._model.storage_time > 0 && !!ing;
                    var cfg = game.getConfigByNameId("param.json" /* Param */, "gongfeng_lottery");
                    var lottery = mod.BagUtil.checkPropCnt(cfg.value[0], cfg.value[1]);
                    var bool = use || reward || speedup || lottery;
                    mod.HintMgr.setHint(bool, root, 1041670161 /* Consecrate */);
                };
                /**--------------------异兽奇记start-------------------- */
                ConsecrateProxy.prototype.c2s_amass_advance = function (classId, type, index) {
                    var msg = new c2s_amass_advance();
                    msg.class_id = classId;
                    msg.type = type;
                    msg.index = index;
                    this.sendProto(msg);
                };
                ConsecrateProxy.prototype.s2c_amass_info = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.list) {
                        return;
                    }
                    if (!this._model.amassList) {
                        this._model.amassList = msg.list;
                    }
                    else {
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var info = _a[_i];
                            var pos = this.getInfoPos(info.index);
                            if (pos >= 0) {
                                this._model.amassList[pos] = info;
                            }
                            else {
                                this._model.amassList.push(info);
                            }
                        }
                    }
                    this.updateAmassHint();
                    this.sendNt("on_update_amass_info" /* ON_UPDATE_AMASS_INFO */);
                };
                ConsecrateProxy.prototype.getInfoPos = function (index) {
                    if (!this._model.amassList || !this._model.amassList.length) {
                        return -1;
                    }
                    var len = this._model.amassList.length;
                    for (var i = 0; i < len; ++i) {
                        var info = this._model.amassList[i];
                        if (info.index == index) {
                            return i;
                        }
                    }
                    return -1;
                };
                ConsecrateProxy.prototype.getAmassInfo = function (index) {
                    var pos = this.getInfoPos(index);
                    if (pos >= 0) {
                        return this._model.amassList[pos];
                    }
                    return null;
                };
                ConsecrateProxy.prototype.getAmassLv = function (index) {
                    var info = this.getAmassInfo(index);
                    return info && info.star || 0;
                };
                ConsecrateProxy.prototype.initAmassCfg = function () {
                    if (this._model.amassCfgList) {
                        return;
                    }
                    this._model.amassCfgList = {};
                    this._model.amassCfg = {};
                    var classId = 1;
                    while (classId) {
                        var cfgList = game.getConfigByNameId("amass.json" /* Amass */, classId);
                        if (!cfgList) {
                            classId = 0;
                        }
                        else {
                            for (var k in cfgList) {
                                var cfg = cfgList[k];
                                this._model.amassCfg[cfg.index] = cfg; //图鉴配置
                                if (!this._model.amassCfgList[classId]) {
                                    this._model.amassCfgList[classId] = {};
                                }
                                if (!this._model.amassCfgList[classId][cfg.type]) {
                                    this._model.amassCfgList[classId][cfg.type] = [];
                                }
                                this._model.amassCfgList[classId][cfg.type].push(cfg.index);
                            }
                            classId++;
                        }
                    }
                };
                ConsecrateProxy.prototype.getAmassTypes = function (classId) {
                    this.initAmassCfg();
                    var types = [];
                    var info = this._model.amassCfgList[classId];
                    for (var k in info) {
                        var type = parseInt(k);
                        var cfg = game.getConfigByNameId("amass_suit.json" /* AmassSuit */, type);
                        if (!cfg.show && !this.canAmassTypeUp(classId, type) && !this.getAmassActNum(classId, type)) {
                            //配置默认不显示时，可升级已激活的时候才显示
                            continue;
                        }
                        types.push(type);
                    }
                    return types;
                };
                ConsecrateProxy.prototype.getAmassIndexList = function (classId, type) {
                    this.initAmassCfg();
                    return this._model.amassCfgList[classId][type];
                };
                ConsecrateProxy.prototype.getAmassCfg = function (index) {
                    this.initAmassCfg();
                    return this._model.amassCfg[index];
                };
                ConsecrateProxy.prototype.getAmassActNum = function (classId, type) {
                    var cnt = 0;
                    var indexList = this.getAmassIndexList(classId, type);
                    for (var _i = 0, indexList_1 = indexList; _i < indexList_1.length; _i++) {
                        var index = indexList_1[_i];
                        var lv = this.getAmassLv(index);
                        if (lv > 0) {
                            cnt++;
                        }
                    }
                    return cnt;
                };
                ConsecrateProxy.prototype.canAmassItemUp = function (index) {
                    var cfg = this.getAmassCfg(index);
                    var lv = this.getAmassLv(index);
                    var maxLv = cfg.cost_num.length;
                    var isMax = lv >= maxLv; //已满级
                    if (isMax) {
                        return false;
                    }
                    var costCnt = cfg.cost_num[lv]; //升级消耗
                    return mod.BagUtil.checkPropCnt(index, costCnt);
                };
                ConsecrateProxy.prototype.canAmassTypeUp = function (classId, type) {
                    var indexList = this.getAmassIndexList(classId, type);
                    for (var _i = 0, indexList_2 = indexList; _i < indexList_2.length; _i++) {
                        var index = indexList_2[_i];
                        if (this.canAmassItemUp(index)) {
                            return true;
                        }
                    }
                    return false;
                };
                ConsecrateProxy.prototype.canAmassClassIdUp = function (classId) {
                    var types = this.getAmassTypes(classId);
                    for (var i = 0; i < types.length; ++i) {
                        var type = types[i];
                        if (this.canAmassTypeUp(classId, type)) {
                            return true;
                        }
                    }
                    return false;
                };
                /**更新红点*/
                ConsecrateProxy.prototype.updateAmassHint = function () {
                    this.setAmassHint(1041670162 /* Amass */, 1 /* Amass */, ["57" /* Consecrate */, "01" /* Consecrate */, "02" /* TabBtnType02 */]);
                    this.setAmassHint(1041670163 /* Amass2 */, 2 /* Amass2 */, ["57" /* Consecrate */, "01" /* Consecrate */, "03" /* TabBtnType03 */]);
                };
                ConsecrateProxy.prototype.setAmassHint = function (openIdx, classId, hintType) {
                    if (!mod.ViewMgr.getIns().checkViewOpen(openIdx)) {
                        return;
                    }
                    var hint = this.canAmassClassIdUp(classId);
                    mod.HintMgr.setHint(hint, hintType);
                };
                /**--------------------异兽奇记end-------------------- */
                ConsecrateProxy.prototype.onBagUpdateByPropType = function (n) {
                    var types = n.body;
                    if (types.indexOf(13 /* Amass */) < 0) {
                        return;
                    }
                    this.updateAmassHint();
                };
                return ConsecrateProxy;
            }(game.ProxyBase));
            consecrate.ConsecrateProxy = ConsecrateProxy;
            __reflect(ConsecrateProxy.prototype, "game.mod.consecrate.ConsecrateProxy", ["game.mod.IConsecrateProxy", "base.IProxy"]);
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var ConsecrateLotteryView = /** @class */ (function (_super) {
                __extends(ConsecrateLotteryView, _super);
                function ConsecrateLotteryView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.consecrate.ConsecrateLotterySkin";
                    return _this;
                }
                return ConsecrateLotteryView;
            }(eui.Component));
            consecrate.ConsecrateLotteryView = ConsecrateLotteryView;
            __reflect(ConsecrateLotteryView.prototype, "game.mod.consecrate.ConsecrateLotteryView");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var ConsecrateShelfView = /** @class */ (function (_super) {
                __extends(ConsecrateShelfView, _super);
                function ConsecrateShelfView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.consecrate.ConsecrateShelfSkin";
                    return _this;
                }
                return ConsecrateShelfView;
            }(eui.Component));
            consecrate.ConsecrateShelfView = ConsecrateShelfView;
            __reflect(ConsecrateShelfView.prototype, "game.mod.consecrate.ConsecrateShelfView");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var ConsecrateSpeedUpView = /** @class */ (function (_super) {
                __extends(ConsecrateSpeedUpView, _super);
                function ConsecrateSpeedUpView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.consecrate.ConsecrateSpeedUpSkin";
                    return _this;
                }
                return ConsecrateSpeedUpView;
            }(eui.Component));
            consecrate.ConsecrateSpeedUpView = ConsecrateSpeedUpView;
            __reflect(ConsecrateSpeedUpView.prototype, "game.mod.consecrate.ConsecrateSpeedUpView");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var ConsecrateView = /** @class */ (function (_super) {
                __extends(ConsecrateView, _super);
                function ConsecrateView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.consecrate.ConsecrateSkin";
                    return _this;
                }
                return ConsecrateView;
            }(eui.Component));
            consecrate.ConsecrateView = ConsecrateView;
            __reflect(ConsecrateView.prototype, "game.mod.consecrate.ConsecrateView");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var AmassTipsView = /** @class */ (function (_super) {
                __extends(AmassTipsView, _super);
                function AmassTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.consecrate.AmassTipsSkin";
                    return _this;
                }
                return AmassTipsView;
            }(eui.Component));
            consecrate.AmassTipsView = AmassTipsView;
            __reflect(AmassTipsView.prototype, "game.mod.consecrate.AmassTipsView");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var AmassUpView = /** @class */ (function (_super) {
                __extends(AmassUpView, _super);
                function AmassUpView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.consecrate.AmassUpSkin";
                    return _this;
                }
                return AmassUpView;
            }(eui.Component));
            consecrate.AmassUpView = AmassUpView;
            __reflect(AmassUpView.prototype, "game.mod.consecrate.AmassUpView");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var facade = base.facade;
            var ConsecrateIconItem = /** @class */ (function (_super) {
                __extends(ConsecrateIconItem, _super);
                function ConsecrateIconItem() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.consecrate.ConsecrateIconSkin";
                    return _this;
                }
                ConsecrateIconItem.prototype.onAddToStage = function () {
                    this._proxy = facade.retMod("57" /* Consecrate */).retProxy(225 /* Consecrate */);
                    //已遗弃，这种方式销毁时需要自己去移除侦听
                    // this.btn_reward.addEventListener(TouchEvent.TOUCH_TAP, this.onClickReward, this);
                    // this.btn_add.addEventListener(TouchEvent.TOUCH_TAP, this.onClickAdd, this);
                    // this.icon.addEventListener(TouchEvent.TOUCH_TAP, this.onClickIcon, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_reward, this.onClickReward, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.btn_add, this.onClickAdd, this);
                    this.addEventListenerEx(egret.TouchEvent.TOUCH_TAP, this.icon, this.onClickIcon, this);
                };
                ConsecrateIconItem.prototype.dataChanged = function () {
                    var data = this.data;
                    if (!data) {
                        this.icon.defaultIcon();
                        this.removeEft();
                        this.setStatus(0 /* Null */);
                        this.redPoint.visible = this._proxy.checkIsUse();
                        return;
                    }
                    this.setStatus(data.state);
                    this.redPoint.visible = data.state == 3 /* Reward */;
                    // if (!data.state || data.state == ConsecrateState.Reward) {
                    //     return;
                    // }
                    if (!data.state) {
                        return;
                    }
                    if (data.prop_id) {
                        var iconShowType = data.state != 1 /* Fengyin */ ? 3 /* NotTips */ : 1 /* Reward */;
                        this.icon.setData(data.prop_id, iconShowType);
                        this.icon.updateQualityImg("");
                        if (data.state == 3 /* Reward */) {
                            this.lab_name.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor("可领取", "#4DFD28"));
                            this.group_eft.removeChildren();
                            this.addEftByParent("wanchenggongfeng" /* WanChengGongFeng */, this.group_eft);
                        }
                        else {
                            this.lab_name.textFlow = this.icon.getPropName(false);
                        }
                    }
                };
                /**设置数据data，单个icon时候调用*/
                ConsecrateIconItem.prototype.setData = function (data) {
                    this.data = data;
                };
                ConsecrateIconItem.prototype.onClickReward = function () {
                    this._proxy.c2s_consecrate_get(1, this.data.pos);
                };
                ConsecrateIconItem.prototype.onClickAdd = function () {
                    var list = this._proxy.getPropList();
                    if (!list || !list.length) {
                        mod.ViewMgr.getIns().showGainWaysTips(1451202023 /* MoHun */);
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("57" /* Consecrate */, "02" /* ConsecrateShelf */);
                };
                //外部指引调用
                ConsecrateIconItem.prototype.onClick = function () {
                    if (!this.data) {
                        this.onClickAdd();
                        return;
                    }
                    if (this.data.state == 3 /* Reward */) {
                        this.onClickReward();
                        return;
                    }
                };
                ConsecrateIconItem.prototype.onClickIcon = function () {
                    if (this.data.state == 2 /* WaitingFengyin */) {
                        this._proxy.c2s_consecrate_get_back(this.data.pos);
                        return;
                    }
                };
                ConsecrateIconItem.prototype.setStatus = function (status) {
                    switch (status) {
                        case 1 /* Fengyin */:
                            this.btn_add.visible = false;
                            this.btn_reward.visible = false;
                            this.icon.visible = true;
                            this.grp_tips.visible = true;
                            this.grp_name.visible = true;
                            this.redPoint.visible = false;
                            break;
                        case 2 /* WaitingFengyin */:
                            this.btn_add.visible = false;
                            this.btn_reward.visible = false;
                            this.icon.visible = true;
                            this.grp_tips.visible = false;
                            this.grp_name.visible = true;
                            this.redPoint.visible = false;
                            break;
                        case 3 /* Reward */:
                            this.btn_add.visible = false;
                            this.btn_reward.visible = true;
                            this.icon.visible = false;
                            this.grp_tips.visible = false;
                            this.grp_name.visible = true;
                            this.redPoint.visible = false;
                            break;
                        default:
                            this.btn_add.visible = true;
                            this.btn_reward.visible = false;
                            this.icon.visible = false;
                            this.grp_tips.visible = false;
                            this.grp_name.visible = false;
                            this.redPoint.visible = false;
                            break;
                    }
                };
                return ConsecrateIconItem;
            }(mod.BaseRenderer));
            consecrate.ConsecrateIconItem = ConsecrateIconItem;
            __reflect(ConsecrateIconItem.prototype, "game.mod.consecrate.ConsecrateIconItem");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var ArrayCollection = eui.ArrayCollection;
            var ConsecratePreviewRewardItem = /** @class */ (function (_super) {
                __extends(ConsecratePreviewRewardItem, _super);
                function ConsecratePreviewRewardItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ConsecratePreviewRewardItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._rewardList = new ArrayCollection();
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._rewardList;
                };
                ConsecratePreviewRewardItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    var index = cfg.index;
                    this.img_type.source = "consecrate_type" + index;
                    this.lab_desc.text = "";
                    var rewards = [];
                    for (var _i = 0, _a = cfg.award; _i < _a.length; _i++) {
                        var i = _a[_i];
                        var reward = i.slice(0, 2);
                        rewards.push(reward);
                    }
                    this._rewardList.source = rewards;
                };
                return ConsecratePreviewRewardItem;
            }(mod.BaseRenderer));
            consecrate.ConsecratePreviewRewardItem = ConsecratePreviewRewardItem;
            __reflect(ConsecratePreviewRewardItem.prototype, "game.mod.consecrate.ConsecratePreviewRewardItem");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var ConsecrateModel = /** @class */ (function () {
                function ConsecrateModel() {
                    this.num = 7;
                }
                return ConsecrateModel;
            }());
            consecrate.ConsecrateModel = ConsecrateModel;
            __reflect(ConsecrateModel.prototype, "game.mod.consecrate.ConsecrateModel");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var TouchEvent = egret.TouchEvent;
            var Tween = base.Tween;
            var Linear = base.Linear;
            var Handler = base.Handler;
            var ConsecrateLotteryMdr = /** @class */ (function (_super) {
                __extends(ConsecrateLotteryMdr, _super);
                function ConsecrateLotteryMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", consecrate.ConsecrateLotteryView);
                    _this.round = 3;
                    _this.circle = 360;
                    _this.angle = 45;
                    _this.initAngle = 0;
                    _this.isTween = false;
                    _this.isEasyHide = true;
                    return _this;
                }
                ConsecrateLotteryMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(225 /* Consecrate */);
                    this._view.secondPop.bgStr = 'gongfeng_bg2';
                };
                ConsecrateLotteryMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onLottery, this);
                    addEventListener(this._view.checkbox, TouchEvent.TOUCH_TAP, this.onCheckBox, this);
                    this.onNt("on_tween_consecrate_open" /* ON_TWEEN_CONSECRATE_OPEN */, this.onOpenTween, this);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                };
                ConsecrateLotteryMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                    this._view.secondPop.updateBgSrc(game.ResUtil.getUiJpg("gongfeng_bg2"));
                };
                ConsecrateLotteryMdr.prototype.onUpdateView = function () {
                    this._view.img.rotation = this.initAngle;
                    var cfgArr = game.getConfigListByName("gongfeng_reward.json" /* GongfengReward */);
                    for (var _i = 0, cfgArr_1 = cfgArr; _i < cfgArr_1.length; _i++) {
                        var cfg = cfgArr_1[_i];
                        var icon = this._view["icon_" + cfg.index];
                        icon.setData(cfg.reward);
                    }
                    this._cfg = game.getConfigByNameId("param.json" /* Param */, "gongfeng_lottery");
                    var prop = game.PropData.create(this._cfg.value[0], this._cfg.value[1]);
                    this._view.lab_tips.text = "\u7D2F\u8BA1" + this._cfg.value[1] + prop.cfg.name + "\u53EF\u5F00\u542F\u4E00\u6B21";
                    this.onUpdateCount();
                };
                ConsecrateLotteryMdr.prototype.onUpdateCount = function () {
                    var num = mod.BagUtil.getPropCntByIdx(this._cfg.value[0]);
                    var count = Math.floor(num / this._cfg.value[1]);
                    this._view.lab_count.text = "\u5269\u4F59\u6B21\u6570:" + count;
                };
                ConsecrateLotteryMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf(game.PropIndexToKey[this._cfg.value[0]]) > -1) {
                        this.onUpdateCount();
                    }
                };
                ConsecrateLotteryMdr.prototype.onLottery = function () {
                    var isAct = mod.RoleUtil.isRoleRingAct(1 /* Type1 */);
                    if (!isAct) {
                        mod.ViewMgr.getIns().showConfirm("激活主角光环后开启，是否前往激活", Handler.alloc(this, this.onJumpRoleRing));
                        return;
                    }
                    if (!mod.BagUtil.checkPropCnt(this._cfg.value[0], this._cfg.value[1], 1 /* Dialog */)) {
                        return;
                    }
                    if (this.isTween) {
                        return;
                    }
                    this.isTween = true;
                    this._proxy.c2s_consecrate_draw();
                };
                ConsecrateLotteryMdr.prototype.onJumpRoleRing = function () {
                    mod.ViewMgr.getIns().showViewByID(38 /* RoleRing */);
                };
                ConsecrateLotteryMdr.prototype.onCheckBox = function () {
                    if (this._view.checkbox.selected) {
                        if (this.isTween) {
                            this.onTweenOver();
                        }
                    }
                };
                ConsecrateLotteryMdr.prototype.onOpenTween = function (n) {
                    this.indexs = n.body;
                    this.index = this.indexs[this.indexs.length - 1];
                    if (this._view.checkbox.selected) {
                        this.onTweenOver();
                        return;
                    }
                    this.onTween();
                };
                ConsecrateLotteryMdr.prototype.onTween = function () {
                    var rotation = (this.index - 1) * this.angle + this.round * this.circle + this.initAngle;
                    Tween.get(this._view.img).to({ rotation: rotation }, 1000, null, Linear.easeInOut).exec(Handler.alloc(this, this.onTweenOver));
                };
                ConsecrateLotteryMdr.prototype.onTweenOver = function () {
                    Tween.remove(this._view.img);
                    this.isTween = false;
                    var rotation = (this.index - 1) * this.angle + this.round * this.circle + this.initAngle;
                    this._view.img.rotation = rotation;
                    this.onPopupReward();
                };
                ConsecrateLotteryMdr.prototype.onPopupReward = function () {
                    var list = [];
                    for (var _i = 0, _a = this.indexs; _i < _a.length; _i++) {
                        var idx = _a[_i];
                        var cfg = game.getConfigByNameId("gongfeng_reward.json" /* GongfengReward */, idx);
                        list.push(cfg.reward);
                    }
                    mod.PropTipsMgr.getIns().showBestPropArray(list);
                    this.indexs = [];
                    this.index = 0;
                };
                ConsecrateLotteryMdr.prototype.onHide = function () {
                    Tween.remove(this._view.img);
                    this.isTween = false;
                    _super.prototype.onHide.call(this);
                };
                return ConsecrateLotteryMdr;
            }(game.MdrBase));
            consecrate.ConsecrateLotteryMdr = ConsecrateLotteryMdr;
            __reflect(ConsecrateLotteryMdr.prototype, "game.mod.consecrate.ConsecrateLotteryMdr");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var ConsecrateMainMdr = /** @class */ (function (_super) {
                __extends(ConsecrateMainMdr, _super);
                function ConsecrateMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: 'gongfengbiaoqiandubiao',
                            mdr: consecrate.ConsecrateMdr,
                            title: "consecrate_title" /* consecrate_title */,
                            bg: "gongfeng_bg",
                            coinIndex2: 1451201005 /* Gongfeng */,
                            hintTypes: ["57" /* Consecrate */, "01" /* Consecrate */, "01" /* TabBtnType01 */]
                        },
                        {
                            btnType: "02" /* TabBtnType02 */,
                            icon: "amass_tab",
                            mdr: consecrate.AmassMdr,
                            openIdx: 1041670162 /* Amass */,
                            title: "amass_tips1" /* amass_tips1 */,
                            bg: "",
                            hintTypes: ["57" /* Consecrate */, "01" /* Consecrate */, "02" /* TabBtnType02 */]
                        },
                        {
                            btnType: "03" /* TabBtnType03 */,
                            icon: "amass_tab2",
                            mdr: consecrate.AmassMdr2,
                            openIdx: 1041670163 /* Amass2 */,
                            title: "amass_tips2" /* amass_tips2 */,
                            bg: "",
                            hintTypes: ["57" /* Consecrate */, "01" /* Consecrate */, "03" /* TabBtnType03 */]
                        }
                    ];
                    return _this;
                }
                return ConsecrateMainMdr;
            }(mod.WndBaseMdr));
            consecrate.ConsecrateMainMdr = ConsecrateMainMdr;
            __reflect(ConsecrateMainMdr.prototype, "game.mod.consecrate.ConsecrateMainMdr");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var Handler = base.Handler;
            var ConsecrateMdr = /** @class */ (function (_super) {
                __extends(ConsecrateMdr, _super);
                function ConsecrateMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", consecrate.ConsecrateView);
                    _this.num = 7;
                    return _this;
                }
                ConsecrateMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(225 /* Consecrate */);
                };
                ConsecrateMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.grp_tips, TouchEvent.TOUCH_TAP, this.onClickSpeedUp, this);
                    addEventListener(this._view.btn_lottery, TouchEvent.TOUCH_TAP, this.onClickLottery, this);
                    addEventListener(this._view.btn_reward, TouchEvent.TOUCH_TAP, this.onClickPreview, this);
                    addEventListener(this._view.btn_auto, TouchEvent.TOUCH_TAP, this.onClickAuto, this);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd, this);
                    this.onNt("on_update_consecrate_info" /* ON_UPDATE_CONSECRATE_INFO */, this.onUpdateView, this);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                };
                ConsecrateMdr.prototype.onShow = function () {
                    this._proxy.c2s_consecrate_info();
                    _super.prototype.onShow.call(this);
                    this._storage_time = this._proxy.model.storage_time;
                    // this.onUpdateView();
                };
                ConsecrateMdr.prototype.onUpdateView = function () {
                    this._doing = this._proxy.getDoingInfo();
                    var bool = !!this._doing;
                    this._view.grp_tips.visible = bool;
                    // this._view.icon.visible = bool;
                    this._view.btn_add.visible = !bool;
                    if (bool) {
                        this._prop = game.PropData.create(this._doing.prop_id);
                        this._view.icon.setData(this._doing.prop_id);
                        this._view.lab_name.textFlow = this._view.icon.getPropName();
                        this.removeEft();
                        this.addEftByParent("gongfengdizuo" /* GongFengDiZuo */, this._view.group_eft);
                        TimeMgr.addUpdateItem(this, 1000);
                        this.onUpdateTime();
                    }
                    else {
                        this._view.icon.setData(null);
                        this.removeEft();
                        TimeMgr.removeUpdateItem(this);
                        this._view.lab_name.text = "";
                    }
                    for (var i = 0; i < this.num; i++) {
                        var pos = i + 1;
                        var item = this._view["item_" + pos];
                        var info = this._proxy.getInfoByPos(pos);
                        item.setData(info);
                        if (i == 0) {
                            //第一个位置做判断
                            if ((!info || info.state == 0 /* Null */)
                                || (info && info.state == 3 /* Reward */)) {
                                //当前没供奉的时候，或者可领取奖励的时候
                                mod.GuideMgr.getIns().show(28 /* ConsecrateIcon */, item, Handler.alloc(item, item.onClick)); //指引
                            }
                            if (this._view.grp_tips.visible) {
                                //封印中的时候提示加速
                                mod.GuideMgr.getIns().show(38 /* ConsecrateSpeed */, this._view.btn_speedup, Handler.alloc(this, this.onClickSpeedUp)); //指引
                            }
                        }
                        else if (i == this.num - 1) {
                            //最后一个位置做判断
                            mod.GuideMgr.getIns().show(40 /* ConsecrateIconFinal */, item, Handler.alloc(item, item.onClick)); //指引
                        }
                    }
                    var cfg = game.getConfigByNameId("param.json" /* Param */, "gongfeng_yijianlingqu");
                    var isAct = mod.ViewMgr.getIns().checkPass(cfg.value);
                    var isReward = this._proxy.getIsReward();
                    this._view.btn_auto.visible = isAct && isReward;
                    this._view.btn_auto.setHint(isReward);
                    this._view.lab_tips.visible = !isAct;
                    this._view.lab_tips.text = cfg.value + "\u5173\u5F00\u542F\u4E00\u952E\u9886\u53D6";
                    this.onUpdateCount();
                    if (this._proxy.model.storage_time < this._storage_time) {
                        game.PromptBox.getIns().show("\u52A0\u901F\u6210\u529F");
                        console.log("加速成功");
                    }
                    this._storage_time = this._proxy.model.storage_time;
                };
                ConsecrateMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    var cfg = game.getConfigByNameId("param.json" /* Param */, "gongfeng_lottery");
                    if (keys.indexOf(game.PropIndexToKey[cfg.value[0]]) > -1) {
                        this.onUpdateCount();
                    }
                };
                ConsecrateMdr.prototype.onUpdateCount = function () {
                    var cfg = game.getConfigByNameId("param.json" /* Param */, "gongfeng_lottery");
                    var num = mod.BagUtil.getPropCntByIdx(cfg.value[0]);
                    this._view.coin.initIcon(cfg.value[0]);
                    this._view.coin.lab_cost.text = num + "/" + cfg.value[1];
                    this._view.btn_lottery.updateCost(cfg.value, false, "", false);
                    this._view.btn_lottery.img_cost.visible = false;
                    this._view.btn_lottery.setHint(num >= cfg.value[1]);
                };
                ConsecrateMdr.prototype.update = function (time) {
                    if (!this._doing) {
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    this.onUpdateTime();
                };
                ConsecrateMdr.prototype.onUpdateTime = function () {
                    var cfg = this._prop.cfg;
                    var seconds = cfg.param1[0][0];
                    var endTime = this._doing.begin_time + seconds;
                    var leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    if (leftTime < 0) {
                        leftTime = 0;
                    }
                    this._view.lab_time.text = game.TimeUtil.formatSecond(leftTime, "d天H时", true);
                };
                ConsecrateMdr.prototype.onClickSpeedUp = function () {
                    mod.ViewMgr.getIns().showSecondPop("57" /* Consecrate */, "03" /* ConsecrateSpeedUp */);
                };
                ConsecrateMdr.prototype.onClickPreview = function () {
                    mod.ViewMgr.getIns().showSecondPop("57" /* Consecrate */, "05" /* ConsecratePreview */);
                };
                ConsecrateMdr.prototype.onClickLottery = function () {
                    mod.ViewMgr.getIns().showSecondPop("57" /* Consecrate */, "04" /* ConsecrateLottery */);
                };
                ConsecrateMdr.prototype.onClickAuto = function () {
                    this._proxy.c2s_consecrate_get(2);
                };
                ConsecrateMdr.prototype.onClickAdd = function () {
                    var list = this._proxy.getPropList();
                    if (!list || !list.length) {
                        //PromptBox.getIns().show("已无魔魂封印");
                        mod.ViewMgr.getIns().showGainWaysTips(1451202023 /* MoHun */);
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("57" /* Consecrate */, "02" /* ConsecrateShelf */);
                };
                ConsecrateMdr.prototype.onHide = function () {
                    mod.GuideMgr.getIns().clear(28 /* ConsecrateIcon */); //清除指引
                    mod.GuideMgr.getIns().clear(38 /* ConsecrateSpeed */); //清除指引
                    mod.GuideMgr.getIns().clear(40 /* ConsecrateIconFinal */); //清除指引
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                return ConsecrateMdr;
            }(game.EffectMdrBase));
            consecrate.ConsecrateMdr = ConsecrateMdr;
            __reflect(ConsecrateMdr.prototype, "game.mod.consecrate.ConsecrateMdr", ["base.UpdateItem"]);
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var ArrayCollection = eui.ArrayCollection;
            var ConsecratePreviewRewardMdr = /** @class */ (function (_super) {
                __extends(ConsecratePreviewRewardMdr, _super);
                function ConsecratePreviewRewardMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", mod.BasePreviewRewardView);
                    _this.isEasyHide = true;
                    return _this;
                }
                ConsecratePreviewRewardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.secondPop.titleStr = "relic2" /* relic2 */;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = consecrate.ConsecratePreviewRewardItem;
                    this._view.list_item.dataProvider = this._itemList;
                };
                ConsecratePreviewRewardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateItemList();
                };
                ConsecratePreviewRewardMdr.prototype.updateItemList = function () {
                    var cfgList = game.getConfigListByName("gongfeng_show.json" /* GongfengShow */);
                    if (this._itemList.source.length) {
                        this._itemList.replaceAll(cfgList);
                    }
                    else {
                        this._itemList.source = cfgList;
                    }
                };
                return ConsecratePreviewRewardMdr;
            }(game.MdrBase));
            consecrate.ConsecratePreviewRewardMdr = ConsecratePreviewRewardMdr;
            __reflect(ConsecratePreviewRewardMdr.prototype, "game.mod.consecrate.ConsecratePreviewRewardMdr");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var Handler = base.Handler;
            var PropertyEvent = eui.PropertyEvent;
            var ConsecrateShelfMdr = /** @class */ (function (_super) {
                __extends(ConsecrateShelfMdr, _super);
                function ConsecrateShelfMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", consecrate.ConsecrateShelfView);
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                ConsecrateShelfMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(225 /* Consecrate */);
                    this._view.list.itemRenderer = consecrate.ConsecrateShelfItem;
                    this._view.list.dataProvider = this._listData;
                };
                ConsecrateShelfMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn, TouchEvent.TOUCH_TAP, this.onClick, this);
                    addEventListener(this._view.list, PropertyEvent.PROPERTY_CHANGE, this.onListChange);
                    this.onNt("on_close_consecrate_shelf" /* ON_CLOSE_CONSECRATE_SHELF */, this.hide, this);
                };
                ConsecrateShelfMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                    this.showGuide();
                };
                ConsecrateShelfMdr.prototype.onUpdateView = function () {
                    this._list = this._proxy.getPropList();
                    // this._listData.source = this._list;
                    this._listData.replaceAll(this._list);
                };
                ConsecrateShelfMdr.prototype.onClick = function () {
                    var num = this._proxy.getSpaceCount();
                    var idxs = [];
                    for (var i = 0; i < this._list.length; i++) {
                        if (num <= 0) {
                            break;
                        }
                        var info = this._list[i];
                        var len = num > info.count ? info.count : num;
                        for (var i_1 = 0; i_1 < len; i_1++) {
                            idxs.push(info.index);
                        }
                        num -= info.count;
                    }
                    this._proxy.c2s_consecrate_putin(idxs);
                    this.hide();
                };
                ConsecrateShelfMdr.prototype.onHide = function () {
                    this._listData.removeAll();
                    //this._view.list.removeChildren();//需要清除下数据
                    mod.GuideMgr.getIns().clear(29 /* ConsecrateShelfItem */); //清除指引
                    _super.prototype.onHide.call(this);
                };
                //-------------------------------------指引相关------------------------------------------------
                ConsecrateShelfMdr.prototype.showGuide = function () {
                    var num = this._view.list.numChildren;
                    if (!num) {
                        return;
                    }
                    var btn = this._view.list.getChildAt(0);
                    mod.GuideMgr.getIns().show(29 /* ConsecrateShelfItem */, btn, Handler.alloc(btn, btn.onClick)); //指引
                };
                ConsecrateShelfMdr.prototype.onListChange = function (e) {
                    if (e.property == "contentHeight") {
                        this.showGuide();
                    }
                };
                return ConsecrateShelfMdr;
            }(game.MdrBase));
            consecrate.ConsecrateShelfMdr = ConsecrateShelfMdr;
            __reflect(ConsecrateShelfMdr.prototype, "game.mod.consecrate.ConsecrateShelfMdr");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var TimeMgr = base.TimeMgr;
            var TouchEvent = egret.TouchEvent;
            var Handler = base.Handler;
            var ConsecrateSpeedUpMdr = /** @class */ (function (_super) {
                __extends(ConsecrateSpeedUpMdr, _super);
                function ConsecrateSpeedUpMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", consecrate.ConsecrateSpeedUpView);
                    return _this;
                }
                ConsecrateSpeedUpMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(225 /* Consecrate */);
                };
                ConsecrateSpeedUpMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.grp_tips, TouchEvent.TOUCH_TAP, this.onClickSpeedUp, this);
                    addEventListener(this._view.grp_all, TouchEvent.TOUCH_TAP, this.onClickAllSpeedUp, this);
                    this.onNt("on_update_consecrate_info" /* ON_UPDATE_CONSECRATE_INFO */, this.onUpdateView, this);
                };
                ConsecrateSpeedUpMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    TimeMgr.addUpdateItem(this, 1000);
                    this.onUpdateView();
                    this._view.secondPop.updateBgSrc(game.ResUtil.getUiJpg("gongfeng_bg3"));
                    this.showGuide();
                    this.onUpdateTime();
                };
                ConsecrateSpeedUpMdr.prototype.onUpdateView = function () {
                    this._doing = this._proxy.getDoingInfo();
                    this._prop = game.PropData.create(this._doing.prop_id);
                    this._allTime = this._proxy.getListSpeedUpTime();
                    this._view.icon.setData(this._prop);
                    this._view.lab_name.textFlow = this._view.icon.getPropName();
                    var time = this._proxy.model.storage_time;
                    var str = game.TimeUtil.formatSecond(time, time > game.Second.Day ? "d天HH时" : "HH时mm分");
                    this._view.lab_havetime.text = "" + str;
                    console.error("this._doing.begin_time", this._doing.begin_time);
                };
                ConsecrateSpeedUpMdr.prototype.update = function (time) {
                    this.onUpdateTime();
                };
                ConsecrateSpeedUpMdr.prototype.onUpdateTime = function () {
                    var cfg = this._prop.cfg;
                    var seconds = cfg.param1[0][0];
                    var endTime = this._doing.begin_time + seconds;
                    this._leftTime = endTime - TimeMgr.time.serverTimeSecond;
                    if (this._leftTime < 0) {
                        this._leftTime = 0;
                    }
                    this._view.lab_time.text = game.TimeUtil.formatSecond(this._leftTime, this._leftTime > game.Second.Day ? "d天HH时" : "HH时mm分");
                    var allTime = this._doing.begin_time + this._allTime;
                    this._leftTime2 = allTime - TimeMgr.time.serverTimeSecond;
                    if (this._leftTime2 < 0) {
                        this._leftTime2 = 0;
                    }
                    this._view.lab_alltime.text = game.TimeUtil.formatSecond(this._leftTime2, this._leftTime2 > game.Second.Day ? "d天HH时" : "HH时mm分");
                };
                ConsecrateSpeedUpMdr.prototype.onClickSpeedUp = function () {
                    if (!this._proxy.model.storage_time) {
                        mod.ViewMgr.getIns().showGainWaysTips(1451201005 /* Gongfeng */);
                        return;
                    }
                    var time = Math.min(this._leftTime, this._proxy.model.storage_time);
                    var str = "\u662F\u5426\u6D88\u8017" + game.TextUtil.addColor(game.TimeUtil.formatSecond(time, time > game.Second.Day ? "d天HH时" : "HH时mm分"), 1022764 /* GREEN */) + "\u5FEB\u901F\u4F9B\u5949";
                    mod.ViewMgr.getIns().showConfirm(str, Handler.alloc(this, this.onSpeedUp));
                };
                ConsecrateSpeedUpMdr.prototype.onSpeedUp = function () {
                    this._proxy.c2s_consecrate_speedup(1, this._doing.pos);
                    this.hide();
                };
                ConsecrateSpeedUpMdr.prototype.onClickAllSpeedUp = function (notTips) {
                    if (!this._proxy.model.storage_time) {
                        mod.ViewMgr.getIns().showGainWaysTips(1451201005 /* Gongfeng */);
                        return;
                    }
                    if (notTips) {
                        this.onAllSpeedUp();
                        return;
                    }
                    var time = Math.min(this._leftTime2, this._proxy.model.storage_time);
                    var str = "\u662F\u5426\u6D88\u8017" + game.TextUtil.addColor(game.TimeUtil.formatSecond(time, time > game.Second.Day ? "d天HH时" : "HH时mm分"), 1022764 /* GREEN */) + "\u5FEB\u901F\u4F9B\u5949";
                    mod.ViewMgr.getIns().showConfirm(str, Handler.alloc(this, this.onAllSpeedUp));
                };
                ConsecrateSpeedUpMdr.prototype.onAllSpeedUp = function () {
                    this._proxy.c2s_consecrate_speedup(2);
                    this.hide();
                };
                ConsecrateSpeedUpMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    mod.GuideMgr.getIns().clear(39 /* ConsecrateSpeedAll */); //清除指引
                    _super.prototype.onHide.call(this);
                };
                ConsecrateSpeedUpMdr.prototype.showGuide = function () {
                    mod.GuideMgr.getIns().show(39 /* ConsecrateSpeedAll */, this._view.grp_all, Handler.alloc(this, this.onClickAllSpeedUp, [true])); //指引
                };
                return ConsecrateSpeedUpMdr;
            }(game.MdrBase));
            consecrate.ConsecrateSpeedUpMdr = ConsecrateSpeedUpMdr;
            __reflect(ConsecrateSpeedUpMdr.prototype, "game.mod.consecrate.ConsecrateSpeedUpMdr", ["base.UpdateItem"]);
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var AmassMdr = /** @class */ (function (_super) {
                __extends(AmassMdr, _super);
                function AmassMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.classId = 1 /* Amass */;
                    return _this;
                }
                return AmassMdr;
            }(mod.AmassBaseMdr));
            consecrate.AmassMdr = AmassMdr;
            __reflect(AmassMdr.prototype, "game.mod.consecrate.AmassMdr");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var AmassMdr2 = /** @class */ (function (_super) {
                __extends(AmassMdr2, _super);
                function AmassMdr2() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.classId = 2 /* Amass2 */;
                    return _this;
                }
                return AmassMdr2;
            }(mod.AmassBaseMdr));
            consecrate.AmassMdr2 = AmassMdr2;
            __reflect(AmassMdr2.prototype, "game.mod.consecrate.AmassMdr2");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var TouchEvent = egret.TouchEvent;
            var AmassTipsMdr = /** @class */ (function (_super) {
                __extends(AmassTipsMdr, _super);
                function AmassTipsMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", consecrate.AmassTipsView);
                    _this.isEasyHide = true;
                    return _this;
                }
                AmassTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(225 /* Consecrate */);
                };
                AmassTipsMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_goto, TouchEvent.TOUCH_TAP, this.onClickGoto);
                    //this.onNt(ViewEvent.ON_VIEW_HIDE, this.hide, this);
                };
                AmassTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateShow();
                    this.updateGoto();
                };
                AmassTipsMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                AmassTipsMdr.prototype.onClickGoto = function () {
                    if (!this._propData) {
                        this.hide();
                        return;
                    }
                    var index = this._propData.index;
                    var cfg = this._proxy.getAmassCfg(index);
                    var classId = cfg["class_id"]; //客户端没有导出字段定义
                    var jumpIdx = classId == 1 /* Amass */ ? 31 /* Amass */ : 32 /* Amass2 */;
                    mod.ViewMgr.getIns().showViewByID(jumpIdx);
                    this.hide();
                };
                AmassTipsMdr.prototype.updateShow = function () {
                    this._propData = this._showArgs;
                    var cfg = this._propData.cfg;
                    this._view.basePropTips.updateShow(this._propData);
                    this._view.power.setPowerValue(cfg.showPower);
                    var cnt = mod.BagUtil.getPropCntByIdx(this._propData.index);
                    this._view.lab_cnt.text = "拥有数量：" + cnt;
                    var bgStr = game.ResUtil.getBigIcon(cfg.icon);
                    this._view.img_bg.source = game.ResUtil.getUiPng(bgStr);
                    var index = this._propData.index;
                    this._view.img_status.source = this._proxy.getAmassLv(index) ? "yijihuo" : "weijihuo";
                    this._view.baseDescItem.updateShow(this._propData.desc);
                };
                AmassTipsMdr.prototype.updateGoto = function () {
                    var iconShowType = this._propData.iconShowType;
                    var showGoto = iconShowType == 2 /* Bag */;
                    this._view.btn_goto.visible = showGoto;
                };
                return AmassTipsMdr;
            }(game.EffectMdrBase));
            consecrate.AmassTipsMdr = AmassTipsMdr;
            __reflect(AmassTipsMdr.prototype, "game.mod.consecrate.AmassTipsMdr");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var consecrate;
        (function (consecrate) {
            var TouchEvent = egret.TouchEvent;
            var AmassUpMdr = /** @class */ (function (_super) {
                __extends(AmassUpMdr, _super);
                function AmassUpMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", consecrate.AmassUpView);
                    _this.isEasyHide = true;
                    return _this;
                }
                AmassUpMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(225 /* Consecrate */);
                };
                AmassUpMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_up, TouchEvent.TOUCH_TAP, this.onClickUp);
                    this.onNt("on_update_amass_info" /* ON_UPDATE_AMASS_INFO */, this.onInfoUpdate, this);
                    this.onNt("update_common_attr" /* UPDATE_COMMON_ATTR */, this.updatePower, this);
                    this.onNt("on_bag_update_by_prop_type" /* ON_BAG_UPDATE_BY_PROP_TYPE */, this.onBagUpdate, this);
                };
                AmassUpMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._classId = this._showArgs.classId;
                    this._cfg = this._showArgs.cfg;
                    this.initShow();
                    this.updateShow();
                    this.updatePower();
                };
                AmassUpMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                AmassUpMdr.prototype.onClickUp = function () {
                    if (!mod.BagUtil.checkPropCntUp(this._cost[0], this._cost[1])) {
                        return;
                    }
                    var index = this._cfg.index;
                    this._proxy.c2s_amass_advance(this._classId, 2 /* Up */, index);
                };
                AmassUpMdr.prototype.onInfoUpdate = function () {
                    this.updateShow();
                    this.updatePower();
                };
                /** 通用背包事件监听 */
                AmassUpMdr.prototype.onBagUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(13 /* Amass */) < 0) {
                        return;
                    }
                    this.updateShow();
                };
                AmassUpMdr.prototype.initShow = function () {
                    var index = this._cfg.index;
                    var propCfg = game.GameConfig.getPropConfigById(index);
                    var bgStr = game.ResUtil.getBigIcon(propCfg.icon);
                    this._view.img_bg.source = game.ResUtil.getUiPng(bgStr);
                    this._view.lab_name.text = this._cfg.name;
                    this._view.lab_name.textColor = game.ColorUtil.getColorByQuality2(propCfg.quality);
                    this._view.lab_desc.textFlow = game.TextUtil.parseHtml(this._cfg.desc);
                };
                AmassUpMdr.prototype.updateShow = function () {
                    var index = this._cfg.index;
                    var lv = this._proxy.getAmassLv(index);
                    this._lv = lv;
                    var stageStr = game.ResUtil.getChineseFontStr(lv) + "j";
                    this.addBmpFont(stageStr, game.BmpTextCfg[204 /* Stage */], this._view.grp_lv, false, 1, true);
                    var maxLv = this._cfg.cost_num.length;
                    var isMax = lv >= maxLv; //已满级
                    this._view.currentState = isMax ? "max" : "default";
                    var costCnt = isMax ? 1 : this._cfg.cost_num[lv]; //升级消耗
                    this._cost = [index, costCnt];
                    this._view.icon.setData(index);
                    this._view.icon.updateCostLab(this._cost);
                    var cnt = mod.BagUtil.getPropCntByIdx(index);
                    this._view.bar.show(cnt, costCnt, false, 0, false);
                    this._view.btn_up.redPoint.visible = this._proxy.canAmassItemUp(index);
                    this._view.btn_up.labelDisplay.text = lv > 0 ? game.getLanById("rank_up" /* rank_up */) : game.getLanById("active" /* active */);
                };
                AmassUpMdr.prototype.updatePower = function () {
                    var pos = this._lv > 0 ? this._lv - 1 : 0;
                    var attrId = this._cfg.attr_id[pos]; //属性id
                    var attr = mod.RoleUtil.getAttr(attrId);
                    var power = attr && attr.showpower ? attr.showpower.toNumber() : 0; //属性战力
                    var addVal = 0;
                    //套装加成
                    var curVal = this._proxy.getAmassActNum(this._classId, this._cfg.type); //已激活数量
                    var cfg = game.getConfigByNameId("amass_suit.json" /* AmassSuit */, this._cfg.type);
                    for (var _i = 0, _a = cfg.suit; _i < _a.length; _i++) {
                        var info = _a[_i];
                        var needCnt = info[0];
                        var suitId = info[1];
                        if (needCnt > curVal) {
                            break;
                        }
                        var suitCfg = game.getConfigByNameId("suit_effect.json" /* SuitEffect */, suitId);
                        if (suitCfg.type == 2 /* PowerAdd */) {
                            //战力加成
                            addVal += suitCfg.effect_value[0][0]; //万分比
                        }
                    }
                    if (addVal) {
                        power += Math.round(addVal / 10000 * power);
                    }
                    this._view.power.setPowerValue(power);
                };
                return AmassUpMdr;
            }(game.EffectMdrBase));
            consecrate.AmassUpMdr = AmassUpMdr;
            __reflect(AmassUpMdr.prototype, "game.mod.consecrate.AmassUpMdr");
        })(consecrate = mod.consecrate || (mod.consecrate = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=consecrate.js.map