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
        var main;
        (function (main) {
            var TouchEvent = egret.TouchEvent;
            var StrongerItem = /** @class */ (function (_super) {
                __extends(StrongerItem, _super);
                function StrongerItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                StrongerItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_goto, this.onClick, this);
                };
                StrongerItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = this.data;
                    this.img_icon.source = cfg.icon;
                    this.starListView.updateNewStar(cfg.star);
                    this.lab_desc.textFlow = game.TextUtil.parseHtml(cfg.desc);
                };
                StrongerItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    mod.ViewMgr.getIns().showViewByID(this.data.jump);
                };
                return StrongerItem;
            }(mod.BaseListenerRenderer));
            main.StrongerItem = StrongerItem;
            __reflect(StrongerItem.prototype, "game.mod.main.StrongerItem");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var MainMod = /** @class */ (function (_super) {
                __extends(MainMod, _super);
                function MainMod() {
                    return _super.call(this, "05" /* Main */) || this;
                }
                MainMod.prototype.initCmd = function () {
                };
                MainMod.prototype.initModel = function () {
                    this.regProxy(3 /* Main */, main.MainProxy);
                };
                MainMod.prototype.initView = function () {
                    /**主界面右边*/
                    this.regMdr("04" /* MainRight */, main.MainRightMdr);
                    /**主界面顶部*/
                    this.regMdr("01" /* MainTop */, main.MainTopMdr);
                    /**主界面 左上和左中*/
                    this.regMdr("03" /* MainLeft */, main.MainLeftMdr);
                    /**主界面 底部*/
                    this.regMdr("02" /* MainBottom */, main.MainBottomMdr);
                    this.regMdr("05" /* MainMenu */, main.MainMenuMdr);
                    /**挂机 收益*/
                    this.regMdr("10" /* OffLineGain */, main.OfflineGain3Mdr);
                    this.regMdr("26" /* gmWin */, main.gmMdr);
                    /**以下为新的*/
                    this.regMdr("09" /* PowerChange */, main.PowerChangeMdr);
                    this.regMdr("16" /* SuccessTips */, main.SuccessTipsMdr);
                    this.regMdr("30" /* BaseAttrTips */, mod.BaseAttrMdr);
                    this.regMdr("31" /* BaseRewardTips */, mod.BaseRewardMdr);
                    this.regMdr("32" /* BaseRuleDesc */, mod.BaseRuleDescMdr);
                    this.regMdr("33" /* Alert */, main.AlertMdr);
                    this.regMdr("34" /* BoxReward */, main.BoxRewardMdr);
                    this.regMdr("35" /* BuyTimes */, main.BuyTimesMdr);
                    this.regMdr("40" /* Stronger */, main.StrongerMdr); //我要变强
                    this.regMdr("41" /* RewardFindMain */, main.RewardFindMainMdr); //资源找回
                    this.regMdr("42" /* Preview */, main.MainPreviewItemMdr); //功能预览
                    this.regMdr("43" /* BreakthroughTips */, mod.BreakthroughTipsMdr); //突破成功
                    this.regMdr("44" /* BreakthroughTips2 */, mod.BreakthroughTipsMdr2); //突破成功
                    this.regMdr("45" /* UpStarTips */, mod.UpStarTipsMdr); //升星成功
                    this.regMdr("46" /* UpStarTips2 */, mod.UpStarTipsMdr2); //升星成功
                };
                return MainMod;
            }(game.ModBase));
            main.MainMod = MainMod;
            __reflect(MainMod.prototype, "game.mod.main.MainMod");
            gso.modCls.push(MainMod);
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var TimeMgr = base.TimeMgr;
            var Handler = base.Handler;
            var facade = base.facade;
            var Pool = base.Pool;
            var s2c_open_func_info = msg.s2c_open_func_info;
            var c2s_hangup_get_rwd = msg.c2s_hangup_get_rwd;
            var c2s_hangup_rate_rwd = msg.c2s_hangup_rate_rwd;
            var s2c_hangup_day_is_max_get = msg.s2c_hangup_day_is_max_get;
            var s2c_hangup_info = msg.s2c_hangup_info;
            var s2c_hangup_rwd = msg.s2c_hangup_rwd;
            var c2s_disconnect = msg.c2s_disconnect;
            var c2s_open_system_info = msg.c2s_open_system_info;
            var c2s_common_attr_getinfo = msg.c2s_common_attr_getinfo;
            var s2c_common_attr_sendinfo = msg.s2c_common_attr_sendinfo;
            var s2c_sys_attributes = msg.s2c_sys_attributes;
            var c2s_sys_attributes = msg.c2s_sys_attributes;
            var c2s_material_get_info = msg.c2s_material_get_info;
            var c2s_forbidden_get_info = msg.c2s_forbidden_get_info;
            var c2s_single_boss_get_info = msg.c2s_single_boss_get_info;
            var c2s_pvp_battle_get_base_info = msg.c2s_pvp_battle_get_base_info;
            var prop_tips_data = msg.prop_tips_data;
            var c2s_consecrate_info = msg.c2s_consecrate_info;
            var s2c_reward_find_info = msg.s2c_reward_find_info;
            var c2s_reward_find_draw = msg.c2s_reward_find_draw;
            var c2s_guild_study_show = msg.c2s_guild_study_show;
            var c2s_guild_xianshou_show = msg.c2s_guild_xianshou_show;
            var MainProxy = /** @class */ (function (_super) {
                __extends(MainProxy, _super);
                function MainProxy() {
                    var _a;
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._reqList = [];
                    /**登录时候需要向服务端请求数据的系统*/
                    _this._openIdxs = [1041670099 /* BagMelt */, 1041670084 /* Xiuxian */, 1041670085 /* Xiandan */, 1041670086 /* Lingchi */, 1041670088 /* Lingmai */, 1041670092 /* Linggen */,
                        1041670089 /* Role */, 1041670090 /* Title */, 1041670091 /* DressUp */, 1041670094 /* Strength */, 1041670095 /* Gem */, 1041670096 /* Advanced */, 1041670103 /* Xianfa */,
                        1041670102 /* Shenling */, 1041670104 /* Horse */, 1041670106 /* Tianshen */, 1041670105 /* Lingchong */, 1041670113 /* Forbidden */, 1041670114 /* Xianta */, 1041670115 /* Yuanling */,
                        1041670117 /* VipBoss */, 1041670126 /* SuitType1 */, 1041670127 /* SuitType2 */, 1041670128 /* SuitType3 */, 1041670129 /* SuitType4 */, 1041670130 /* SuitType5 */,
                        1041670124 /* Wing */, 1041670123 /* Weapon */, 1041670125 /* Body */, 1041670135 /* RoleHuanhua */, 1041670134 /* RoleCollect */, 1041670141 /* SignGift */, 1041670138 /* Store */,
                        1041670144 /* Zhaocaixian */, 1041670147 /* KillBoss */, 1041670153 /* Yaojijiangshi */, 1041670158 /* WonderfulAct */, 1041670159 /* WonderfulAct1 */,
                        1041670173 /* Xianlv */, 1041670174 /* XianlvChild */, 1041670175 /* XianlvRing */, 1041670176 /* XianlvRenwu */, 1041670177 /* XianlvShilian */, 1041670178 /* XianlvZhanchang */,
                        1041670189 /* Rank */, 1041670199 /* Tongtiange */, 1041670202 /* Huashen */, 1041670204 /* Yishou */, 1041670206 /* SkyPalace */, 1041670211 /* ShenlingGift */, 1041670212 /* FeishengWukong */,
                        1041670213 /* JuebanXianjian */, 1041670214 /* ZhizunShouyin */, 1041670222 /* Zhandui */, 1041670226 /* XujieJitan */, 1041670223 /* XujieTansuo */, 1041670240 /* XiuxianNvpu */, 1041670239 /* GoddessRecord */,
                        1041670243 /* XianmaiZhengduo */, 1041670244 /* Sea */, 1041670241 /* Fengmo */, 1041670248 /* Huanjing */, 1041670257 /* Chaojilicai */, 1041670258 /* Zhizunlicai */, 1041670259 /* Fulijijin */, 1041670260 /* Chaojijijin */,
                        1041670263 /* Fuchenlinghu */, 1041670264 /* Huanjingzengli */, 1041670265 /* Huanjingbaozang */, 1041670266 /* Huanjingleichong */, 1041670267 /* Huanjinglibao */, 1041670268 /* XianjieLuandou */, 1041670269 /* Honour */];
                    /**登录时候需要向服务端请求数据的任务*/
                    _this._taskTypes = (_a = {},
                        _a[3 /* Xiuxian */] = 1041670084 /* Xiuxian */,
                        _a[34 /* Qiyuan */] = 1041670087 /* Qiyuan */,
                        _a[35 /* Liveness */] = 1040180001 /* Daily */,
                        _a[36 /* Yaojijiangshi */] = 1041670153 /* Yaojijiangshi */,
                        _a[38 /* Xianlv */] = 1041670176 /* XianlvRenwu */,
                        _a[37 /* Chengshen */] = 1041670192 /* Chengshen */,
                        _a[39 /* Achieve */] = 1041670198 /* Achieve */,
                        _a[40 /* Huashen */] = 1041670202 /* Huashen */,
                        _a[42 /* ShenlingEvolve */] = 1041670102 /* Shenling */,
                        _a[41 /* PunshList */] = 1041670203 /* PunshList */,
                        _a[44 /* HuashenZhilu */] = 1041670202 /* Huashen */,
                        _a[45 /* HuashenZhanshendian */] = 1041670202 /* Huashen */,
                        _a[47 /* UnionBeast */] = 1041670154 /* Union */,
                        _a[48 /* Mining */] = 1041670222 /* Zhandui */,
                        _a[49 /* XujieTansuo */] = 1041670223 /* XujieTansuo */,
                        _a[50 /* Sea1 */] = 1041670245 /* Sea1 */,
                        _a[51 /* Sea2 */] = 1041670246 /* Sea2 */,
                        _a[52 /* Sea3 */] = 1041670247 /* Sea3 */,
                        _a[53 /* KuafuDoufa */] = 1041670251 /* KuafuDoufa */,
                        _a[55 /* Honour */] = 1041670269 /* Honour */,
                        _a);
                    _this.isOpenLine = true;
                    return _this;
                }
                MainProxy.prototype.update = function (time) {
                    if (this._reqList.length == 0) {
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    if (this._reqList.length) {
                        var handler = this._reqList.shift();
                        handler.exec();
                        Pool.release(handler);
                    }
                };
                MainProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    mod.ViewMgr.getIns().clearView(); //清除界面缓存
                    mod.PropTipsMgr.getIns().clearData(); //清除队列数据
                    TimeMgr.removeUpdateItem(this);
                    for (var _i = 0, _a = this._reqList; _i < _a.length; _i++) {
                        var handler = _a[_i];
                        Pool.release(handler);
                    }
                    this._reqList.length = 0;
                    this._model.openFuncIdx = null;
                };
                MainProxy.prototype.initialize = function () {
                    var self = this;
                    self._model = new main.MainModel();
                    self.onProto(s2c_open_func_info, self.get_open_view_idx_s2c, self);
                    self.onProto(s2c_hangup_day_is_max_get, self.s2c_hangup_day_is_max_get, self);
                    self.onProto(s2c_hangup_info, self.s2c_hangup_info, self);
                    self.onProto(s2c_hangup_rwd, self.s2c_hangup_get_rwd, self);
                    self.onProto(s2c_common_attr_sendinfo, self.s2c_common_attr_sendinfo, self);
                    self.onProto(s2c_sys_attributes, self.s2c_sys_attributes, self);
                    self.onProto(s2c_reward_find_info, self.s2c_reward_find_info, self);
                };
                MainProxy.prototype.getmodel = function () {
                    return this._model;
                };
                MainProxy.prototype.init = function () {
                    var reqList = this._reqList;
                    var bagProxy = facade.retMod("12" /* Bag */).retProxy(12 /* Bag */);
                    reqList[reqList.length] = Handler.alloc(bagProxy, bagProxy.c2s_bag_props);
                    /**todo，后续看下是否需要划分数据*/
                    var idList = [];
                    for (var _i = 0, _a = this._openIdxs; _i < _a.length; _i++) {
                        var idx = _a[_i];
                        if (!mod.ViewMgr.getIns().checkViewOpen(idx)) {
                            continue;
                        }
                        idList.push(idx);
                    }
                    if (idList.length) {
                        reqList[reqList.length] = Handler.alloc(this, this.c2s_open_system_info, [idList]);
                    }
                    /**todo，后续看下是否需要划分数据*/
                    var types = [];
                    for (var k in this._taskTypes) {
                        var idx = this._taskTypes[k];
                        if (!mod.ViewMgr.getIns().checkViewOpen(idx)) {
                            continue;
                        }
                        types.push(parseInt(k));
                    }
                    if (types.length) {
                        var taskProxy = facade.retMod("13" /* Task */).retProxy(10 /* Task */);
                        reqList[reqList.length] = Handler.alloc(taskProxy, taskProxy.all_task_info_c2s, [types]);
                    }
                    /**请求副本信息*/
                    if (mod.ViewMgr.getIns().checkViewOpen(1041670107 /* Shilian */)) {
                        reqList[reqList.length] = Handler.alloc(this, this.c2s_material_get_info);
                    }
                    /**请求禁地副本信息*/
                    if (mod.ViewMgr.getIns().checkViewOpen(1041670113 /* Forbidden */)) {
                        reqList[reqList.length] = Handler.alloc(this, this.c2s_forbidden_get_info);
                    }
                    /**请求多人boss信息*/
                    if (mod.ViewMgr.getIns().checkViewOpen(1041670118 /* Boss */)) {
                        var bossProxy = facade.retMod("22" /* Boss */).retProxy(199 /* Boss */);
                        reqList[reqList.length] = Handler.alloc(bossProxy, bossProxy.c2s_new_multiple_boss_info);
                    }
                    /**请求个人boss信息*/
                    if (mod.ViewMgr.getIns().checkViewOpen(1041670116 /* PersonalBoss */)) {
                        reqList[reqList.length] = Handler.alloc(this, this.c2s_single_boss_get_info);
                    }
                    /**请求斗法信息*/
                    if (mod.ViewMgr.getIns().checkViewOpen(1041670122 /* Doufa */)) {
                        reqList[reqList.length] = Handler.alloc(this, this.c2s_pvp_battle_get_base_info);
                    }
                    /**请求邮件信息 */
                    var mailProxy = facade.retMod("07" /* Mail */).retProxy(6 /* Mail */);
                    reqList[reqList.length] = Handler.alloc(mailProxy, mailProxy.mail_online_request_c2s);
                    /**请求好友信息 */
                    var friendProxy = facade.retMod("59" /* Friend */).retProxy(231 /* Friend */);
                    reqList[reqList.length] = Handler.alloc(friendProxy, friendProxy.c2s_friend_list, [1 /* Friend */]);
                    /**请求供奉信息 */
                    if (mod.ViewMgr.getIns().checkViewOpen(1041670161 /* Consecrate */)) {
                        reqList[reqList.length] = Handler.alloc(this, this.c2s_consecrate_info);
                    }
                    var union = game.getProxy("55" /* Union */, 217 /* Union */);
                    if (mod.ViewMgr.getIns().checkViewOpen(1041670154 /* Union */) && union.isInUnion) {
                        reqList[reqList.length] = Handler.alloc(this, this.c2s_guild_study_show);
                        reqList[reqList.length] = Handler.alloc(this, this.c2s_guild_xianshou_show);
                    }
                    if (!TimeMgr.hasUpdateItem(this)) {
                        TimeMgr.addUpdateItem(this);
                    }
                };
                MainProxy.prototype.addReqList = function (proxy, method, args) {
                    var reqList = this._reqList;
                    reqList[reqList.length] = Handler.alloc(proxy, method, args);
                    if (!TimeMgr.hasUpdateItem(this)) {
                        TimeMgr.addUpdateItem(this);
                    }
                };
                MainProxy.prototype.s2c_hangup_day_is_max_get = function (n) {
                    var msg = n.body;
                    if (msg.day_is_pop && msg.day_is_pop == 0) {
                        mod.ViewMgr.getIns().showViewByID(5 /* OfflineGain */);
                    }
                };
                //挂机收益信息
                MainProxy.prototype.s2c_hangup_info = function (n) {
                    var msg = n.body;
                    this._model.hangupTimes = msg.hangup_times;
                    this._model.awards = msg.items;
                    this._model.canGet = msg.is_can_get == 1;
                    this._model.speedUpCnt = msg.jia_shu_cn;
                    this._model.speedUpAwards = msg.speed_list;
                    this._model.speedUpCost = msg.jia_shu_cost;
                    this._model.item_count = msg.item_count;
                    //挂机时间大于配置的时间时，打开挂机界面
                    // todo 策划需求不主动弹窗 ID1010857
                    // if (this.isOpenLine && this._model.offlineTotalTime > this._model.offlineMaxtime) {
                    //     this.isOpenLine = false;
                    //     ViewMgr.getIns().showViewByID(JumpIdx.OfflineGain);
                    // }
                    this.updateOfflineHint();
                    this.sendNt("update_offline" /* UPDATE_OFFLINE */);
                };
                //结算挂机收益
                MainProxy.prototype.s2c_hangup_get_rwd = function (n) {
                    // let msg: s2c_hangup_rwd = n.body;
                    // this._model.gotAwards = msg.items;
                    // this._model.gotType = msg.rtype;
                    // this._model.gotTime = msg.hangup_times;
                };
                //请求领取挂机奖励
                MainProxy.prototype.c2s_hangup_get_rwd = function (type) {
                    if (type === void 0) { type = 2; }
                    var c = new c2s_hangup_get_rwd();
                    c.op = type;
                    this.sendProto(c);
                };
                //请求加速挂机
                MainProxy.prototype.c2s_hangup_rate_rwd = function () {
                    var c = new c2s_hangup_rate_rwd();
                    this.sendProto(c);
                };
                /**
                 * 记录已经开放的界面idx
                 * @param {base.GameNT} n
                 */
                MainProxy.prototype.get_open_view_idx_s2c = function (n) {
                    var msg = n.body;
                    if (msg.open) {
                        var openIdx = this._model.openFuncIdx;
                        if (!openIdx) {
                            this._model.openFuncIdx = msg.open;
                            this.sendNt("on_open_func_init" /* ON_OPEN_FUNC_INIT */, msg.open);
                            return;
                        }
                        //关闭的功能idx
                        var delIdx = [];
                        for (var _i = 0, openIdx_1 = openIdx; _i < openIdx_1.length; _i++) {
                            var idx = openIdx_1[_i];
                            if (msg.open.indexOf(idx) < 0) {
                                delIdx.push(idx);
                            }
                        }
                        if (delIdx.length) {
                            this.sendNt("on_open_func_delete" /* ON_OPEN_FUNC_DELETE */, delIdx);
                        }
                        //新开的功能idx
                        var addIdx = [];
                        for (var _a = 0, _b = msg.open; _a < _b.length; _a++) {
                            var idx = _b[_a];
                            if (openIdx.indexOf(idx) > -1) {
                                continue;
                            }
                            openIdx.push(idx);
                            addIdx.push(idx);
                        }
                        if (addIdx.length) {
                            this.sendNt("on_open_func_update" /* ON_OPEN_FUNC_UPDATE */, addIdx);
                        }
                    }
                };
                Object.defineProperty(MainProxy.prototype, "rewards", {
                    get: function () {
                        var rewards = this._model.awards.concat();
                        if (this._model.item_count > 0) {
                            var reward = new prop_tips_data();
                            reward.idx = Long.fromValue(1451000002 /* CommonEquip */);
                            reward.cnt = this._model.item_count;
                            rewards.push(reward);
                        }
                        return rewards;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MainProxy.prototype, "offlineCanGet", {
                    get: function () {
                        return this._model.canGet;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MainProxy.prototype, "offlineTotalTime", {
                    get: function () {
                        return this._model.offlineTotalTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MainProxy.prototype, "offlineMaxtime", {
                    get: function () {
                        return this._model.offlineMaxtime;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MainProxy.prototype, "offlineHint", {
                    get: function () {
                        return this._model.offlineHint;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 挂机红点
                 * @returns
                 */
                MainProxy.prototype.updateOfflineHint = function () {
                    var hint = this.getOfflineHint();
                    if (!hint) {
                        var targetTime = this._model.hangupTimes + this._model.offlineMaxtime / 2;
                        if (targetTime > 0) {
                            mod.HintMgr.addTimeEvent(4 /* Offline */, targetTime, this, this.updateOfflineHint);
                        }
                    }
                    mod.HintMgr.setHint(hint, this._model.offlineHint);
                };
                MainProxy.prototype.getOfflineHint = function () {
                    var hint = this._model.offlineTotalTime >= this._model.offlineMaxtime / 2;
                    return hint;
                };
                // //--------------------------系统改名------------------------
                // public changeName(name: string, sex: number): void {
                //     let c: c2s_change_name_sex = new c2s_change_name_sex();
                //     c.new_name = name;
                //     c.new_sex = sex;
                //     this.sendProto(c);
                // }
                MainProxy.prototype.saveSettingInfo = function () {
                    // let arr = [
                    //     gso.isCloseBgSound ? 1 : 0,
                    //     gso.isCloseSoundEft ? 1 : 0,
                    //     gso.isHideOtherPlayer ? 1 : 0,
                    //     gso.isHideOtherPartner ? 1 : 0,
                    //     gso.isHideOtherEft ? 1 : 0,
                    //     gso.isHideSelfEft ? 1 : 0,
                    //     gso.isHideSceneShake ? 1 : 0,
                    //     gso.isAutoUseGodSkill ? 1 : 0
                    // ];
                    // let json = JSON.stringify(arr);
                    // let misc: IMiscProxy = facade.retMod(ModName.Misc).retProxy(ProxyType.Misc);
                    // misc.setSetting(SettingKey.SetInfo, json);
                };
                //请求返回登录界面
                MainProxy.prototype.sendReLogin = function () {
                    gso.isBack = true;
                    var c = new c2s_disconnect();
                    this.sendProto(c);
                };
                Object.defineProperty(MainProxy.prototype, "openFuncIdx", {
                    get: function () {
                        return this._model.openFuncIdx || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                /*************************新加的协议**********************/
                /**通用系统数据请求协议*/
                MainProxy.prototype.c2s_open_system_info = function (openIdxs) {
                    var msg = new c2s_open_system_info();
                    msg.openIdx = openIdxs;
                    this.sendProto(msg);
                };
                /**
                 * 属性请求协议
                 * @param indexList 属性索引列表
                 * @param type 不传该字段 表示请求默认的属性     传1表示请求军团属性
                 * @private
                 */
                MainProxy.prototype.c2s_common_attr_getinfo = function (indexList, type) {
                    var msg = new c2s_common_attr_getinfo();
                    msg.attrindex = indexList;
                    if (type) {
                        msg.type = type;
                    }
                    this.sendProto(msg);
                };
                MainProxy.prototype.s2c_common_attr_sendinfo = function (n) {
                    var msg = n.body;
                    if (msg.list) {
                        var indexList = [];
                        for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                            var i = _a[_i];
                            //应服务器和策划 外显战力计算统一修改
                            //原始的值保留一下
                            // i.attr["showpower_source"] = i.attr.showpower;
                            // //改掉原来原始值的意义
                            // let god = i && i.attr && i.attr.god ? i.attr.god : 0;
                            // let showPower = i && i.attr && i.attr.showpower ? i.attr.showpower.toNumber() : 0;
                            // let power = RoleUtil.getSurfacePower(god, showPower);
                            // i.attr.showpower = Long.fromNumber(power);
                            this._model.attrList[i.attrindex] = i.attr;
                            indexList.push(i.attrindex);
                        }
                        this.sendNt("update_common_attr" /* UPDATE_COMMON_ATTR */, indexList); //监听时候一般不区分index
                    }
                };
                /**
                 * 通用获取属性接口，不要放在update里面频繁请求，统一通过RoleUtil访问
                 * type 传1表示请求军团属性，默认不传
                 */
                MainProxy.prototype.getAttr = function (index, type) {
                    if (!index) {
                        return null;
                    }
                    var attr = this._model.attrList[index];
                    if (!attr) {
                        this.c2s_common_attr_getinfo([index], type);
                    }
                    return attr;
                };
                /**
                 * 通用获取属性列表接口，不要放在update里面频繁请求，统一通过RoleUtil访问
                 * type 传1表示请求军团属性，默认不传
                 */
                MainProxy.prototype.getAttrList = function (indexList, type) {
                    if (!indexList || !indexList.length) {
                        return null;
                    }
                    var attrList = [];
                    var tmpList = [];
                    for (var _i = 0, indexList_1 = indexList; _i < indexList_1.length; _i++) {
                        var index = indexList_1[_i];
                        var attr = this._model.attrList[index];
                        if (!attr) {
                            tmpList.push(index);
                            continue;
                        }
                        attrList.push(attr);
                    }
                    if (tmpList.length) {
                        this.c2s_common_attr_getinfo(tmpList, type);
                    }
                    return attrList;
                };
                /**判断是否有某属性，只判断不请求，统一通过RoleUtil访问*/
                MainProxy.prototype.checkAttr = function (index) {
                    var attr = this._model.attrList[index];
                    return !!attr;
                };
                /**判断是否有某属性，只判断不请求，统一通过RoleUtil访问*/
                MainProxy.prototype.checkAttrList = function (indexList) {
                    if (!indexList || !indexList.length) {
                        return true;
                    }
                    for (var _i = 0, indexList_2 = indexList; _i < indexList_2.length; _i++) {
                        var index = indexList_2[_i];
                        if (!this.checkAttr(index)) {
                            return false;
                        }
                    }
                    return true;
                };
                /**外显系统属性请求协议，统一通过RoleUtil访问*/
                MainProxy.prototype.c2s_sys_attributes = function (openIdx) {
                    var msg = new c2s_sys_attributes();
                    msg.sys_id = openIdx;
                    this.sendProto(msg);
                };
                //外显系统公用属性
                MainProxy.prototype.s2c_sys_attributes = function (n) {
                    var msg = n.body;
                    if (!msg.attrs) {
                        return;
                    }
                    for (var _i = 0, _a = msg.attrs; _i < _a.length; _i++) {
                        var i = _a[_i];
                        if (i.sys_id == 1041670202 /* Huashen */) {
                            //化神属性需要额外存储下
                            this._model.huashenAttr = i;
                            break;
                        }
                    }
                    this.sendNt("update_common_surface_attr" /* UPDATE_COMMON_SURFACE_ATTR */, msg.attrs);
                };
                Object.defineProperty(MainProxy.prototype, "huashenAttr", {
                    //化神系统属性
                    get: function () {
                        return this._model.huashenAttr;
                    },
                    enumerable: true,
                    configurable: true
                });
                /*************************登录时候额外请求的协议**********************/
                //请求副本信息
                MainProxy.prototype.c2s_material_get_info = function () {
                    var msg = new c2s_material_get_info();
                    this.sendProto(msg);
                };
                //请求禁地副本信息
                MainProxy.prototype.c2s_forbidden_get_info = function () {
                    var msg = new c2s_forbidden_get_info();
                    this.sendProto(msg);
                };
                //请求个人boss信息
                MainProxy.prototype.c2s_single_boss_get_info = function () {
                    var msg = new c2s_single_boss_get_info();
                    this.sendProto(msg);
                };
                //请求斗法信息
                MainProxy.prototype.c2s_pvp_battle_get_base_info = function () {
                    var msg = new c2s_pvp_battle_get_base_info();
                    this.sendProto(msg);
                    // let msg2 = new c2s_pvp_battle_group_pk_info();
                    // this.sendProto(msg2);
                };
                MainProxy.prototype.c2s_consecrate_info = function () {
                    var msg = new c2s_consecrate_info();
                    this.sendProto(msg);
                };
                MainProxy.prototype.c2s_guild_study_show = function () {
                    var msg = new c2s_guild_study_show();
                    this.sendProto(msg);
                };
                MainProxy.prototype.c2s_guild_xianshou_show = function () {
                    var msg = new c2s_guild_xianshou_show();
                    this.sendProto(msg);
                };
                /*************************资源找回**********************/
                MainProxy.prototype.c2s_reward_find_draw = function () {
                    var msg = new c2s_reward_find_draw();
                    this.sendProto(msg);
                };
                MainProxy.prototype.s2c_reward_find_info = function (n) {
                    var msg = n.body;
                    this._model.findInfos = msg.list || [];
                    this.updateFindHint();
                    this.sendNt("on_reward_find_update" /* ON_REWARD_FIND_UPDATE */);
                };
                Object.defineProperty(MainProxy.prototype, "findInfos", {
                    get: function () {
                        return this._model.findInfos || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                MainProxy.prototype.isFindShow = function () {
                    return this._model.findInfos && this._model.findInfos.length > 0;
                };
                MainProxy.prototype.updateFindHint = function () {
                    var hint = this.isFindShow();
                    var hintType = this._model.findHint;
                    mod.HintMgr.setHint(hint, hintType);
                };
                //不再提示类型
                MainProxy.prototype.setNotTipsType = function (type, isSel) {
                    this._model.notTipsInfos[type] = isSel;
                };
                MainProxy.prototype.getNotTipsType = function (type) {
                    return this._model.notTipsInfos[type] || false;
                };
                return MainProxy;
            }(game.ProxyBase));
            main.MainProxy = MainProxy;
            __reflect(MainProxy.prototype, "game.mod.main.MainProxy", ["base.UpdateItem", "game.mod.IMainProxy", "base.IProxy"]);
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var MainBottomView = /** @class */ (function (_super) {
                __extends(MainBottomView, _super);
                // public btn_huashen: game.mod.Btn;
                // public img_huashen_val: eui.Image;
                // public lab_huashen_val: eui.Label;
                // public img_huashen_lock: eui.Image;
                function MainBottomView() {
                    var _this = _super.call(this) || this;
                    _this.name = "MainBottomView";
                    _this.skinName = "skins.main.NewMainBottomSkin";
                    return _this;
                }
                return MainBottomView;
            }(eui.Component));
            main.MainBottomView = MainBottomView;
            __reflect(MainBottomView.prototype, "game.mod.main.MainBottomView");
            var MainLeftChallengeBtn = /** @class */ (function (_super) {
                __extends(MainLeftChallengeBtn, _super);
                function MainLeftChallengeBtn() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.MainLeftChallengeBtnSkin";
                    return _this;
                }
                return MainLeftChallengeBtn;
            }(mod.Btn));
            main.MainLeftChallengeBtn = MainLeftChallengeBtn;
            __reflect(MainLeftChallengeBtn.prototype, "game.mod.main.MainLeftChallengeBtn");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var Tween = base.Tween;
            var Handler = base.Handler;
            var MainExpItem = /** @class */ (function (_super) {
                __extends(MainExpItem, _super);
                function MainExpItem() {
                    var _this = _super.call(this) || this;
                    _this._expWidth = 543; //经验条满的长度
                    _this.skinName = "skins.main.MainExpItemSkin";
                    _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    return _this;
                }
                MainExpItem.prototype.onAddToStage = function () {
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                };
                MainExpItem.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    Tween.remove(this.img_exp);
                };
                /**
                 * 更新经验条
                 * todo 特效待处理
                 */
                MainExpItem.prototype.updateExp = function () {
                    var ins = game.RoleVo.ins;
                    var exp = ins.exp; //当前等级经验
                    var levelup_exp = ins.levelup_exp; //升级所需经验
                    if (exp && !exp.isZero() && levelup_exp && !levelup_exp.isZero()) {
                        //有经验
                        this.updateExpValue();
                    }
                    else if (levelup_exp && levelup_exp.isZero()) {
                        //经验满
                        this.img_exp.width = this._expWidth;
                        this.lb_progress.text = "100%";
                    }
                    else {
                        //经验0
                        this.img_exp.width = 0;
                        this.lb_progress.text = "0%";
                    }
                };
                //更新经验条
                MainExpItem.prototype.updateExpValue = function () {
                    var ins = game.RoleVo.ins;
                    var ln = (ins.exp).mul(100).div(ins.levelup_exp);
                    var num = ln.toNumber() / 100;
                    if (num > 1) {
                        num = 1;
                    }
                    if (this._curLv == null) {
                        //初始当前级经验
                        this._curLv = ins.level;
                        this.img_exp.width = this._expWidth * num;
                        this.updateProgressValue();
                    }
                    else if (this._curLv != ins.level && this._curLv < ins.level) {
                        //每一级经验变化
                        Tween.get(this.img_exp).to({ width: this._expWidth }, 200)
                            .exec(Handler.alloc(this, this.updateProgressValue))
                            .exec(Handler.alloc(this, this.endExpTween));
                    }
                    else {
                        //当前级经验变化
                        Tween.get(this.img_exp)
                            .to({ width: (this._expWidth * num) }, 200)
                            .exec(Handler.alloc(this, this.updateProgressValue));
                    }
                };
                MainExpItem.prototype.endExpTween = function () {
                    var ins = game.RoleVo.ins;
                    if (ins.exp && !ins.exp.isZero() && !ins.levelup_exp.isZero()) {
                        this.img_exp.width = 0;
                        this._curLv += 1;
                        this.updateExpValue();
                    }
                };
                //更新进度值
                MainExpItem.prototype.updateProgressValue = function () {
                    var expWidth = this.img_exp.width;
                    this.lb_progress.text = Math.floor((expWidth / this._expWidth) * 100) + "%";
                };
                return MainExpItem;
            }(eui.Component));
            main.MainExpItem = MainExpItem;
            __reflect(MainExpItem.prototype, "game.mod.main.MainExpItem");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var prop_use = msg.prop_use;
            var MainFastProp = /** @class */ (function (_super) {
                __extends(MainFastProp, _super);
                function MainFastProp() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.MainFastPropSkin";
                    return _this;
                }
                MainFastProp.prototype.onAddToStage = function () {
                    this.btn_close.addEventListener(TouchEvent.TOUCH_TAP, this.onClose, this);
                    this.btn_use.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                MainFastProp.prototype.dataChanged = function () {
                    if (!this.data) {
                        facade.sendNt("on_close_easy_use_prop" /* ON_CLOSE_EASY_UES_PROP */);
                        return;
                    }
                    this.icon.setData(this.data);
                    if (this.data.type == 290 /* Equip */) {
                        this.btn_use.label = "更换装备";
                        this.lab.text = "更强装备";
                    }
                    else {
                        this.btn_use.label = "使用";
                        this.lab.text = "快捷使用";
                    }
                };
                MainFastProp.prototype.setData = function (data) {
                    this.data = data;
                };
                MainFastProp.prototype.onClose = function () {
                    facade.sendNt("on_close_easy_use_prop" /* ON_CLOSE_EASY_UES_PROP */);
                };
                MainFastProp.prototype.onClick = function () {
                    if (this.data.type == 290 /* Equip */) {
                        var proxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                        proxy.c2s_equip_operate(1, this.data.prop_id);
                    }
                    else {
                        var proxy = game.getProxy("12" /* Bag */, 12 /* Bag */);
                        var prop = new prop_use();
                        prop.prop_id = this.data.prop_id;
                        prop.use_cnt = this.data.count;
                        proxy.c2s_prop_list_use([prop]);
                    }
                    facade.sendNt("on_close_easy_use_prop" /* ON_CLOSE_EASY_UES_PROP */);
                };
                return MainFastProp;
            }(mod.BaseRenderer));
            main.MainFastProp = MainFastProp;
            __reflect(MainFastProp.prototype, "game.mod.main.MainFastProp");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var MainLeftBtnView = /** @class */ (function (_super) {
                __extends(MainLeftBtnView, _super);
                function MainLeftBtnView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.MainLeftBtnSkin";
                    return _this;
                }
                MainLeftBtnView.prototype.dataChanged = function () {
                    _super.prototype.dataChanged.call(this);
                    // let d = this.data as ActBtnData;
                    // if (this._eftId) {
                    //     this.removeEffect(this._eftId);
                    //     this._eftId = null;
                    // }
                    // if (d == null) {
                    //     return;
                    // }
                    // this.btn_whole.img_bg.source = ResUtil.getUiBtnIconUrl(d.icon);
                    // this.img_hongdian.visible = d.showHint == true;
                    // let actProxy: IActivityProxy = facade.retMod(ModName.Activity).retProxy(ProxyType.Activity);
                    //
                    //
                    // if ((d.icon == ActBtnIcon.FirstCharge || d.icon == ActBtnIcon.ZeroBuyGiftBag || d.icon == ActBtnIcon.FirstShare)
                    //     || (d.icon == ActBtnIcon.DirectBuyGift && !actProxy.isDBOpened)
                    //     || (d.icon == ActBtnIcon.DailyCharge && !actProxy.isDCOpened)
                    //     || (d.openAct && d.openAct.type == ActivityType.CtrlDirectBuyGift && !actProxy.isCDBOpened)
                    //     || (LimitBuyList.indexOf(d.icon) != -1 && !actProxy.isLBGOpened[d.icon.replace("lbg", "")])
                    //     || (d.icon == ActBtnIcon.Seckill && d.param)
                    //     || (d.icon == ActBtnIcon.VipGift && d.param)
                    //     || (d.icon == ActBtnIcon.TenFestival)
                    //     || (d.icon == ActBtnIcon.MoonFestival)
                    //     || (d.icon == ActBtnIcon.MoonFestival3)
                    //     || (d.icon == ActBtnIcon.WeekTask)
                    //     || (d.icon == ActBtnIcon.NewYearOneYuanGift)) {
                    //     this.addBtnEft();
                    // }
                };
                MainLeftBtnView.prototype.addBtnEft = function () {
                    var x = this.width >> 1;
                    var y = this.height >> 1;
                    var target = this.btn_whole;
                    //this.addEftByParent(UIEftSrc.BtnFirstCharge, x, y, target.scaleGroup, 1);
                };
                return MainLeftBtnView;
            }(mod.BaseRenderer));
            main.MainLeftBtnView = MainLeftBtnView;
            __reflect(MainLeftBtnView.prototype, "game.mod.main.MainLeftBtnView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var MainLeftView = /** @class */ (function (_super) {
                __extends(MainLeftView, _super);
                function MainLeftView() {
                    var _this = _super.call(this) || this;
                    _this.name = "MainLeftView";
                    _this.skinName = "skins.main.NewMainLeftSkin";
                    return _this;
                }
                return MainLeftView;
            }(eui.Component));
            main.MainLeftView = MainLeftView;
            __reflect(MainLeftView.prototype, "game.mod.main.MainLeftView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var Event = egret.Event;
            var MainMenuBtn = /** @class */ (function (_super) {
                __extends(MainMenuBtn, _super);
                function MainMenuBtn() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.MainMenuBtnSkin";
                    _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    _this._effHub = new game.UIEftHub(_this);
                    return _this;
                }
                MainMenuBtn.prototype.onAddToStage = function () {
                    this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                };
                MainMenuBtn.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.onHide();
                };
                MainMenuBtn.prototype.setImgLock = function (isUnlock) {
                    this.iconDisplay.visible = isUnlock;
                    this.touchEnabled = isUnlock;
                };
                MainMenuBtn.prototype.showUnLockEff = function () {
                    var self = this;
                    if (!self._effId) {
                        var posX = this.width / 2;
                        var posY = this.height / 2;
                        //self._effId = self._effHub.add(UIEftSrc.BtnFuncOpen, posX, posY, Handler.alloc(self, self.removeEffect), 1, this, -1);
                    }
                };
                MainMenuBtn.prototype.removeEffect = function () {
                    if (this._effId) {
                        this._effHub.removeEffect(this._effId);
                        this._effId = null;
                    }
                };
                MainMenuBtn.prototype.onHide = function () {
                    var self = this;
                    self._effHub.clearAllFont();
                    self._effHub.removeAllEffects();
                };
                return MainMenuBtn;
            }(mod.Btn));
            main.MainMenuBtn = MainMenuBtn;
            __reflect(MainMenuBtn.prototype, "game.mod.main.MainMenuBtn");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var MainMenuView = /** @class */ (function (_super) {
                __extends(MainMenuView, _super);
                function MainMenuView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.NewMainMenuSkin";
                    return _this;
                }
                return MainMenuView;
            }(eui.Component));
            main.MainMenuView = MainMenuView;
            __reflect(MainMenuView.prototype, "game.mod.main.MainMenuView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var MainPreviewItemView = /** @class */ (function (_super) {
                __extends(MainPreviewItemView, _super);
                function MainPreviewItemView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.MainPreviewItemSkin";
                    return _this;
                }
                return MainPreviewItemView;
            }(eui.Component));
            main.MainPreviewItemView = MainPreviewItemView;
            __reflect(MainPreviewItemView.prototype, "game.mod.main.MainPreviewItemView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var MainRightActivityRender = /** @class */ (function (_super) {
                __extends(MainRightActivityRender, _super);
                function MainRightActivityRender() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MainRightActivityRender.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    if (this.data.icon != undefined) {
                        this.iconDisplay.source = this.data.icon;
                    }
                    if (this.data.showHint != undefined) {
                        this.redPoint.visible = this.data.showHint;
                    }
                };
                return MainRightActivityRender;
            }(eui.ItemRenderer));
            main.MainRightActivityRender = MainRightActivityRender;
            __reflect(MainRightActivityRender.prototype, "game.mod.main.MainRightActivityRender");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var MainRightView = /** @class */ (function (_super) {
                __extends(MainRightView, _super);
                function MainRightView() {
                    var _this = _super.call(this) || this;
                    _this.name = "MainRightView";
                    _this.skinName = "skins.main.NewMainRightSkin";
                    return _this;
                }
                return MainRightView;
            }(eui.Component));
            main.MainRightView = MainRightView;
            __reflect(MainRightView.prototype, "game.mod.main.MainRightView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var MainTopView = /** @class */ (function (_super) {
                __extends(MainTopView, _super);
                function MainTopView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.MainTopSkin";
                    return _this;
                }
                return MainTopView;
            }(eui.Component));
            main.MainTopView = MainTopView;
            __reflect(MainTopView.prototype, "game.mod.main.MainTopView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var OffLineGain3ItemView = /** @class */ (function (_super) {
                __extends(OffLineGain3ItemView, _super);
                function OffLineGain3ItemView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.OffLineGain3ItemSkin";
                    return _this;
                }
                OffLineGain3ItemView.prototype.setData = function (awd) {
                    if (!awd) {
                        return;
                    }
                    var cfg = game.getConfigById(awd[0]);
                    this.lab_speed.text = game.StringUtil.getHurtNumStr(awd[1]) + "/\u65F6";
                    this.img_award.source = cfg ? cfg.icon : null;
                };
                return OffLineGain3ItemView;
            }(eui.Component));
            main.OffLineGain3ItemView = OffLineGain3ItemView;
            __reflect(OffLineGain3ItemView.prototype, "game.mod.main.OffLineGain3ItemView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var OfflineGain3View = /** @class */ (function (_super) {
                __extends(OfflineGain3View, _super);
                function OfflineGain3View() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.OffLineGain3Skin";
                    return _this;
                }
                return OfflineGain3View;
            }(eui.Component));
            main.OfflineGain3View = OfflineGain3View;
            __reflect(OfflineGain3View.prototype, "game.mod.main.OfflineGain3View");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var Event = egret.Event;
            var TouchEvent = egret.TouchEvent;
            var VipIcon = /** @class */ (function (_super) {
                __extends(VipIcon, _super);
                function VipIcon() {
                    var _this = _super.call(this) || this;
                    _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                    _this.addEventListener(TouchEvent.TOUCH_TAP, _this.onVipView, _this);
                    _this._effHub = new game.UIEftHub(_this);
                    return _this;
                }
                // vip等级确定
                VipIcon.prototype.setText = function (vipId) {
                    if (vipId == undefined) {
                        vipId = 0;
                    }
                    this._effHub.addBmpFont(mod.VipUtil.getShowVipLv(vipId).toString(), game.BmpTextCfg[104 /* MainVip */], this.gr_vipLv, true, 1.1, true);
                    this.img_bg.source = mod.VipUtil.getShowVipMainBg(vipId);
                    if (!this._eftId) {
                        this._eftId = this._effHub.add("VIP" /* Vip */, 0, 0, null, 0, this.group_eft, -1);
                    }
                };
                VipIcon.prototype.setRedPoint = function (isShow) {
                    this.redPoint.visible = isShow;
                };
                VipIcon.prototype.onVipView = function () {
                    // console.log("打开Vip界面")
                };
                VipIcon.prototype.onAddToStage = function () {
                    var self = this;
                    self.addEventListener(Event.REMOVED_FROM_STAGE, self.onRemoveFromStage, self);
                };
                VipIcon.prototype.onTouchBegin = function (event) {
                    _super.prototype.onTouchBegin.call(this, event);
                    this.group_content.scaleX = this.group_content.scaleY = 0.9;
                    this.addEventListener(TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
                };
                VipIcon.prototype.buttonReleased = function () {
                    _super.prototype.buttonReleased.call(this);
                    this.removeEventListener(TouchEvent.TOUCH_RELEASE_OUTSIDE, this.buttonReleased, this);
                    this.group_content.scaleX = this.group_content.scaleY = 1;
                };
                VipIcon.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
                    this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onVipView, this);
                    this.onHide();
                };
                VipIcon.prototype.onHide = function () {
                    this._effHub.clearAllFont();
                    if (this._eftId) {
                        this._effHub.removeEffect(this._eftId);
                    }
                };
                return VipIcon;
            }(eui.Button));
            main.VipIcon = VipIcon;
            __reflect(VipIcon.prototype, "game.mod.main.VipIcon");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var gmView = /** @class */ (function (_super) {
                __extends(gmView, _super);
                function gmView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.gm.gmSkin";
                    return _this;
                }
                return gmView;
            }(eui.Component));
            main.gmView = gmView;
            __reflect(gmView.prototype, "game.mod.main.gmView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var HuashenBtn = /** @class */ (function (_super) {
                __extends(HuashenBtn, _super);
                function HuashenBtn() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return HuashenBtn;
            }(mod.Btn));
            main.HuashenBtn = HuashenBtn;
            __reflect(HuashenBtn.prototype, "game.mod.main.HuashenBtn");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var HuashenItem = /** @class */ (function (_super) {
                __extends(HuashenItem, _super);
                function HuashenItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                HuashenItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        //没有化神的时候
                        this.btn_huashen.icon = "icon_jia2";
                        this.img_lock.visible = this.img_mark.visible = false;
                        this.lab_huashen_val.text = "";
                        return;
                    }
                    var id = this.data;
                    var cfg = game.getConfigByNameId("huashen.json" /* Huashen */, id);
                    this.btn_huashen.icon = cfg.icon;
                };
                HuashenItem.prototype.setData = function (data) {
                    this.data = data;
                };
                //技能CD
                HuashenItem.prototype.updateCd = function (cd, maxCd) {
                    if (!this.data) {
                        return;
                    }
                    if (cd <= 0) {
                        this.img_lock.visible = this.img_mark.visible = false;
                    }
                    else {
                        this.img_lock.visible = this.img_mark.visible = true;
                        this.img_mark.height = 66 * cd / maxCd; //满CD时候显示66
                    }
                    this.lab_huashen_val.text = cd < 0 ? "" : cd + "";
                };
                return HuashenItem;
            }(eui.ItemRenderer));
            main.HuashenItem = HuashenItem;
            __reflect(HuashenItem.prototype, "game.mod.main.HuashenItem");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var TimeMgr = base.TimeMgr;
            var MainSkillItem = /** @class */ (function (_super) {
                __extends(MainSkillItem, _super);
                function MainSkillItem() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._markHeight = 84;
                    return _this;
                }
                MainSkillItem.prototype.onRemoveFromStage = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onRemoveFromStage.call(this);
                };
                MainSkillItem.prototype.dataChanged = function () {
                    var skillId = this.data;
                    if (!skillId) {
                        this.img_lock.visible = true;
                        this.lab_time.visible = false;
                        this.scr.visible = true;
                        this.scr.height = this._markHeight;
                        this.img_icon.source = "";
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    TimeMgr.addUpdateItem(this, 1000);
                    this.img_lock.visible = false;
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, this.data);
                    if (cfg) {
                        this.img_icon.source = cfg.icon || "common_skill";
                        // this.img_icon.source = "common_skill";
                    }
                    this.onUpdateCd();
                };
                MainSkillItem.prototype.update = function (time) {
                    this.onUpdateCd();
                };
                MainSkillItem.prototype.onUpdateCd = function () {
                    var skillData = game.SkillData.getSkillInfo(this.data);
                    var cfg = game.getConfigByNameId("battle_skill.json" /* Skill */, this.data);
                    var ms = game.SkillData.getLeftCd(skillData);
                    this.scr.height = ms / cfg.cd * this._markHeight;
                    var remainCd = Math.ceil(ms / 1000);
                    if (remainCd <= 0) {
                        this.lab_time.text = "";
                        // console.log("skillData.skill_idx = "+skillData.skill_idx);
                        // console.log("skillData.use_time = "+skillData.use_time);
                        // console.log("skillData.next_use_time = "+skillData.next_use_time);
                    }
                    else {
                        this.lab_time.text = remainCd + "";
                    }
                };
                return MainSkillItem;
            }(mod.BaseRenderer));
            main.MainSkillItem = MainSkillItem;
            __reflect(MainSkillItem.prototype, "game.mod.main.MainSkillItem", ["base.UpdateItem"]);
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var ArrayCollection = eui.ArrayCollection;
            var RewardFindItem = /** @class */ (function (_super) {
                __extends(RewardFindItem, _super);
                function RewardFindItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                RewardFindItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this.scr["$hasScissor"] = true;
                    this._rewardList = new ArrayCollection();
                    this.list_reward.itemRenderer = mod.Icon;
                    this.list_reward.dataProvider = this._rewardList;
                };
                RewardFindItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var cfg = game.getConfigByNameId("reward_find.json" /* RewardFind */, this.data.type);
                    this.img_icon.source = cfg.icon;
                    this._rewardList.source = this.data.prop_list;
                };
                return RewardFindItem;
            }(mod.BaseListenerRenderer));
            main.RewardFindItem = RewardFindItem;
            __reflect(RewardFindItem.prototype, "game.mod.main.RewardFindItem");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var RewardFindView = /** @class */ (function (_super) {
                __extends(RewardFindView, _super);
                function RewardFindView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.RewardFindSkin";
                    return _this;
                }
                return RewardFindView;
            }(eui.Component));
            main.RewardFindView = RewardFindView;
            __reflect(RewardFindView.prototype, "game.mod.main.RewardFindView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var TimeMgr = base.TimeMgr;
            var MainModel = /** @class */ (function () {
                function MainModel() {
                    //上次领取挂机奖励的时间戳
                    this.hangupTimes = 0;
                    //挂机奖励
                    this.awards = [];
                    //奖励是否领取
                    this.canGet = false;
                    //可用加速次数
                    this.speedUpCnt = 0;
                    //加速奖励
                    this.speedUpAwards = [];
                    //返回奖励列表
                    this.gotAwards = [];
                    this.gotType = 0;
                    this.gotTime = 0;
                    /**服务端返回的属性*/
                    this.attrList = {};
                    this.offlineHint = ["05" /* Main */, "10" /* OffLineGain */];
                    this.findHint = ["05" /* Main */, "41" /* RewardFindMain */, "01" /* TabBtnType01 */];
                    this.notTipsInfos = {}; //不再提示类型
                }
                Object.defineProperty(MainModel.prototype, "offlineTotalTime", {
                    /** 当前已挂机时间（秒）*/
                    get: function () {
                        return TimeMgr.time.serverTimeSecond - this.hangupTimes;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MainModel.prototype, "offlineMaxtime", {
                    /** 最大挂机时间（秒）*/
                    get: function () {
                        var num = game.getConfigByNameId("param.json" /* Param */, "guaji_shouyi_time02");
                        return (num.value * 60) || 86400;
                    },
                    enumerable: true,
                    configurable: true
                });
                return MainModel;
            }());
            main.MainModel = MainModel;
            __reflect(MainModel.prototype, "game.mod.main.MainModel");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var StrongerView = /** @class */ (function (_super) {
                __extends(StrongerView, _super);
                function StrongerView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.StrongerSkin";
                    return _this;
                }
                return StrongerView;
            }(eui.Component));
            main.StrongerView = StrongerView;
            __reflect(StrongerView.prototype, "game.mod.main.StrongerView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var AlertView = /** @class */ (function (_super) {
                __extends(AlertView, _super);
                function AlertView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.AlertSkin";
                    return _this;
                }
                return AlertView;
            }(eui.Component));
            main.AlertView = AlertView;
            __reflect(AlertView.prototype, "game.mod.main.AlertView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var BoxRewardView = /** @class */ (function (_super) {
                __extends(BoxRewardView, _super);
                function BoxRewardView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.BoxRewardSkin";
                    return _this;
                }
                return BoxRewardView;
            }(eui.Component));
            main.BoxRewardView = BoxRewardView;
            __reflect(BoxRewardView.prototype, "game.mod.main.BoxRewardView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var BuyTimesView = /** @class */ (function (_super) {
                __extends(BuyTimesView, _super);
                function BuyTimesView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.BuyTimesSkin";
                    return _this;
                }
                return BuyTimesView;
            }(eui.Component));
            main.BuyTimesView = BuyTimesView;
            __reflect(BuyTimesView.prototype, "game.mod.main.BuyTimesView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var PowerChange = /** @class */ (function (_super) {
                __extends(PowerChange, _super);
                function PowerChange() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.PowerChangeSkin";
                    return _this;
                }
                return PowerChange;
            }(eui.Component));
            main.PowerChange = PowerChange;
            __reflect(PowerChange.prototype, "game.mod.main.PowerChange");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var SuccessTipsView = /** @class */ (function (_super) {
                __extends(SuccessTipsView, _super);
                function SuccessTipsView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.main.SuccessTipsSkin";
                    return _this;
                }
                return SuccessTipsView;
            }(eui.Component));
            main.SuccessTipsView = SuccessTipsView;
            __reflect(SuccessTipsView.prototype, "game.mod.main.SuccessTipsView");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var Handler = base.Handler;
            var ArrayCollection = eui.ArrayCollection;
            var stage = egret.lifecycle.stage;
            var Rectangle = egret.Rectangle;
            var Tween = base.Tween;
            var TimeMgr = base.TimeMgr;
            var Shape = egret.Shape;
            // import s2c_instance_fin = msg.s2c_instance_fin;
            // import prop_tips_data = msg.prop_tips_data;
            var MainBottomMdr = /** @class */ (function (_super) {
                __extends(MainBottomMdr, _super);
                function MainBottomMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", main.MainBottomView);
                    _this._moreStatus = 0;
                    _this._skillData = new ArrayCollection();
                    /**按钮的监听事件*/
                    _this._btnNtMap = {};
                    _this._huashenOpen = false; //打开化神轮盘
                    _this._huashenTick = 0; //化神蓄能定时5秒累加
                    _this.theGod_resume_5 = 5; //化神固定每5秒回复能量
                    _this.sp_radius = 47; //半径
                    _this._huashenPos = 0; //自动使用化神技能下标，用于自动施放化神，0、1、2、3
                    _this._isTaskTrigger = false; // 是否的 任务触发的化神体验
                    _this._touchStatus = false; //当前触摸状态，按下时 -> 值为true
                    _this._distance = new egret.Point(); //核心点 -> 鼠标点击时，鼠标全局坐标与_bird的位置差
                    _this._moveStatus = false; //当前触摸状态，移动时 -> 值为true
                    return _this;
                }
                // 任务id
                MainBottomMdr.prototype.initBtnData = function () {
                    this._btnData = [
                        //添加方法与添加活动一样
                        {
                            id: 1041670154 /* Union */,
                            m: "55" /* Union */,
                            v: "01" /* UnionIn */,
                            showBack: true,
                            guideKey: 31 /* Union */
                        },
                        {
                            id: 1041670161 /* Consecrate */,
                            m: "57" /* Consecrate */,
                            v: "01" /* Consecrate */,
                            showBack: true,
                            guideKey: 27 /* Consecrate */
                        },
                        {
                            id: 1041670173 /* Xianyuan */,
                            m: null,
                            v: null,
                            clickHandler: Handler.alloc(this, this.onClickXianyuan),
                            hintMsgList: [["58" /* Xianyuan */], ["59" /* Friend */]]
                        },
                        // {
                        //     id: BtnIconId.Friend,
                        //     m: ModName.Friend,
                        //     v: FriendViewType.FriendMain,
                        //     showBack: true
                        // },
                        {
                            id: 1041670198 /* Achieve */,
                            m: "61" /* More */,
                            v: "01" /* AchieveMain */,
                            showBack: true
                        },
                        {
                            id: 1041670202 /* Huashen */,
                            m: "61" /* More */,
                            v: "02" /* HuashenMain */,
                            showBack: true
                        },
                        // {
                        //     id: BtnIconId.SkyPalace,
                        //     m: ModName.More,
                        //     v: MoreViewType.SkyPalace,
                        //     showBack: true
                        // },
                        {
                            id: 1041670204 /* Yishou */,
                            m: "62" /* Yishou */,
                            v: "01" /* Main */,
                            showBack: true
                        },
                        {
                            id: 1041670222 /* Zhandui */,
                            m: null,
                            v: null,
                            showBack: true,
                            hintMsg: ["61" /* More */, "14" /* ZhanduiMain */],
                            clickHandler: Handler.alloc(this, this.onClickZhandui)
                        },
                        {
                            id: 1041670232 /* Huanggu */,
                            m: "61" /* More */,
                            v: "30" /* HuangguMain */,
                            showBack: true
                        },
                        {
                            id: 1041670239 /* GoddessRecord */,
                            m: "61" /* More */,
                            v: "70" /* GoddessRecordMain */,
                            showBack: true
                        },
                        {
                            id: 1041670248 /* Huanjing */,
                            m: "61" /* More */,
                            v: "140" /* HuanjingMain */,
                            showBack: true,
                        },
                    ];
                };
                MainBottomMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.bottom = 0;
                    this._view.horizontalCenter = 0;
                    this._mainProxy = this.retProxy(3 /* Main */);
                    this._passProxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                    this._surfaceProxy = facade.retMod("46" /* Surface */).retProxy(190 /* Surface */);
                    this._view.btn_auto.img_bg.source = 'main_btn_auto';
                    this._view.btn_auto.setLabelStyle3({ size: 19, textColor: 0x6c400e, verticalCenter: 2 });
                    this._view.list_skill.itemRenderer = main.MainSkillItem;
                    this._view.list_skill.dataProvider = this._skillData;
                    this._ins = new mod.BtnIconMgr(this._view.gr_icon);
                    if (DEBUG && window) {
                        window['BtnIconMgrBot'] = this._ins;
                    }
                    this._sp = new Shape();
                    this._sp.x = this.sp_radius;
                    this._sp.y = this.sp_radius;
                    this._sp.touchEnabled = false;
                    this._view.grp_huashen.addChildAt(this._sp, 4);
                    var cfg = game.GameConfig.getParamConfigById("huashenexchange_time");
                    this._huashenMaxCd = cfg && cfg.value || 5;
                    cfg = game.GameConfig.getParamConfigById("huashen_tryout");
                    this._huashenTaskId1 = cfg && cfg.value[0];
                    this._huashenTaskId2 = cfg && cfg.value[1];
                    cfg = game.GameConfig.getParamConfigById("huashen_tryout_id");
                    this._huashenId = cfg && cfg.value;
                };
                MainBottomMdr.prototype.onInitMore = function () {
                    if (this.rectangle) {
                        return;
                    }
                    var point = this._view.gr_more.localToGlobal();
                    this.rectangle = new Rectangle(point.x, point.y, this._view.gr_more.width, this._view.gr_more.height - 25);
                };
                MainBottomMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_chat, TouchEvent.TOUCH_BEGIN, this.onDownChat);
                    addEventListener(this._view.btn_chat, TouchEvent.TOUCH_END, this.onUpChat);
                    addEventListener(this._view.btn_chat, TouchEvent.TOUCH_TAP, this.onClickChat);
                    addEventListener(this._view.btn_exit, TouchEvent.TOUCH_TAP, this.onClickExit);
                    addEventListener(this._view.btn_offline, TouchEvent.TOUCH_TAP, this.onOffline);
                    addEventListener(this._view.btn_mail, TouchEvent.TOUCH_TAP, this.onClickMail);
                    addEventListener(this._view.btn_more, TouchEvent.TOUCH_TAP, this.onClickMore);
                    addEventListener(this._view.btn_auto, TouchEvent.TOUCH_TAP, this.onClickAutoPass);
                    addEventListener(this._view.btn_challenge, TouchEvent.TOUCH_TAP, this.onClickPass);
                    addEventListener(this._view.grp_task, TouchEvent.TOUCH_TAP, this.onClickTask);
                    addEventListener(this._view.btn_yuanling_invite, TouchEvent.TOUCH_TAP, this.onClickYuanLingInvite);
                    addEventListener(this._view.btn_find, TouchEvent.TOUCH_TAP, this.onClickFind);
                    /****************************化神*******************************/
                    addEventListener(this._view.huashen, TouchEvent.TOUCH_TAP, this.onClickHuashen);
                    this._huashenList = [
                        this._view.huashenItem1,
                        this._view.huashenItem2,
                        this._view.huashenItem3
                    ];
                    for (var _i = 0, _a = this._huashenList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        addEventListener(item.btn_huashen, TouchEvent.TOUCH_TAP, this.onClickHuashenItem);
                    }
                    /****************************化神*******************************/
                    addEventListener(this._view.btn_go, TouchEvent.TOUCH_TAP, this.onClickGo);
                    addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.onClickClose);
                    this.onNt("update_main_pass_info" /* UPDATE_MAIN_PASS_INFO */, this.onPassInfoUpdate, this);
                    /********************新的监听事件*******************/
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.onSceneChange, this); //场景切换
                    this.onNt("challenge_hangup_boss" /* CHALLENGE_HANGUP_BOSS */, this.updateShow, this); //挑战boss
                    this.onNt("on_task_update" /* ON_TASK_UPDATE */, this.onTaskUpdate, this);
                    // 元灵组队邀请按钮
                    this.onNt("on_yuanling_team_invite_btn" /* ON_YUANLING_TEAM_INVITE_BTN */, this.onUpdateYuanLingInvite, this);
                    /**更多功能 */
                    this.onNt("on_open_func_update" /* ON_OPEN_FUNC_UPDATE */, this.onOpenFuncUpdate, this); //功能开启
                    this.onNt("on_open_func_delete" /* ON_OPEN_FUNC_DELETE */, this.onOpenFuncDelete, this); //功能关闭
                    this.onNt("on_guide_update" /* ON_GUIDE_UPDATE */, this.showGuide, this); //指引
                    this.onNt("on_guide_trigger" /* ON_GUIDE_TRIGGER */, this.onGuideTrigger, this); //触发指定指引
                    this.onNt("on_mail_update" /* ON_MAIL_UPDATE */, this.onUpdateMail, this);
                    this.onNt("on_update_easy_use_prop" /* ON_UPDATE_EASY_USE_PROP */, this.onUpdateUse, this);
                    this.onNt("on_close_easy_use_prop" /* ON_CLOSE_EASY_UES_PROP */, this.onCloseUse, this);
                    this.onNt("on_update_easy_use_prop_count" /* ON_UPDATE_EASY_USE_PROP_COUNT */, this.onUpdateByProp, this);
                    this.onNt("on_boss_revive_update" /* ON_BOSS_REVIVE_UPDATE */, this.onBossRevive, this); //BOSS复活
                    this.onNt("on_reward_find_update" /* ON_REWARD_FIND_UPDATE */, this.updateFind, this); //资源找回
                    /*********************************化神相关*******************************/
                    this.onNt("surface_info_update" /* SURFACE_INFO_UPDATE */, this.onSurfaceInfoUpdate, this); //数据携带headType
                    this.onNt("on_scene_huashen_time" /* ON_SCENE_HUASHEN_TIME */, this.onSceneHuashenTime, this); //化神变身结束时间修改
                    this.onNt("on_scene_huashen_id" /* ON_SCENE_HUASHEN_ID */, this.onSceneHuashenId, this); //场景化神变身数据变更
                    this.onNt("on_scene_enter" /* ON_SCENE_ENTER */, this.onSceneEnter, this); //场景化神变身数据变更
                };
                MainBottomMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initBtnData();
                    this.updatePass();
                    this.updatePassMod();
                    this.updatePassName();
                    this.updateShow();
                    this.updateTask();
                    this.showGuide();
                    this.onUpdateUse();
                    this.updateHint();
                    this.setHuashenOpen(false);
                    this.updateHuashen();
                    this.updateChat();
                    this.onUpdateMail();
                    this.onUpdateYuanLingInvite();
                    this.updateFind();
                    this.updateOffline();
                };
                MainBottomMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                    this._view.gr_icon.removeChildren();
                    this._btnData = [];
                    this._lastTask = null;
                    Tween.remove(this._view.use_prop);
                    Tween.remove(this._view.btn_mail);
                    Tween.remove(this._view.btn_chat);
                    TimeMgr.removeUpdateItem(this);
                    stage.removeEventListener(TouchEvent.TOUCH_TAP, this.onCheckClose, this);
                    this.clearBtnIconData();
                };
                //-------------------------------------闯关--------------------------------------------------
                /** 闯关 */
                MainBottomMdr.prototype.onClickPass = function () {
                    mod.GuideMgr.getIns().clear(15 /* Pass */); //清除任务指引
                    mod.ViewMgr.getIns().showViewByID(8 /* Pass */);
                };
                MainBottomMdr.prototype.updatePassName = function () {
                    var self = this;
                    var idx = self._passProxy.passNextIdx;
                    if (idx) {
                        var _passCfg = game.getConfigByNameId("gate1.json" /* Gate */, idx);
                        self._view.btn_challenge.lbl_passName.text = _passCfg.gate_name;
                    }
                };
                /** 更新闯关 */
                MainBottomMdr.prototype.updatePassMod = function () {
                    this._view.btn_challenge.group_eft.visible = this._passProxy.now_wave_cnt >= this._passProxy.target_wave_cnt;
                };
                MainBottomMdr.prototype.updatePass = function () {
                    this._view.btn_challenge.visible = this._view.btn_auto.visible = mod.ViewMgr.getIns().checkBtnShow(1040190001 /* Pass */);
                };
                MainBottomMdr.prototype.onPassInfoUpdate = function () {
                    var self = this;
                    self.updatePassMod();
                    self.setPassAuto();
                    self.updatePassName();
                };
                MainBottomMdr.prototype.onClickAutoPass = function () {
                    var self = this;
                    var cfg = game.getConfigByNameId("open_function.json" /* OpenFunction */, 1041670093 /* PassAuto */);
                    if (self._passProxy.passNextIdx <= cfg.mainline) {
                        var gateCfg = game.getConfigByNameId("gate1.json" /* Gate */, cfg.mainline);
                        var str = game.StringUtil.substitute(game.getLanById("mainline_funcopen" /* mainline_funcopen */), [gateCfg.gate_name]);
                        game.PromptBox.getIns().show(str);
                        return;
                    }
                    if (self._passProxy.passNextIdx == self._passProxy.passMaxIdx) {
                        game.PromptBox.getIns().show("已通关最大关数");
                        return;
                    }
                    var _isAuto = !self._passProxy.passIsAuto;
                    self._passProxy.c2s_mainline_task_auto(_isAuto);
                };
                /** 设置自动闯关状态 */
                MainBottomMdr.prototype.setPassAuto = function () {
                    var _isAuto = this._passProxy.passIsAuto;
                    this._view.btn_auto.label = _isAuto ? '闯关中' : '自动';
                };
                /** 更新闯关红点 */
                MainBottomMdr.prototype.onRefreshPassHint = function (b) {
                    this._view.btn_challenge.redPoint.visible = b;
                };
                /** 更新挂机红点 */
                MainBottomMdr.prototype.onRefreshOfflineHint = function (b) {
                    if (b) {
                        var grp = this._view.btn_offline.group_eft;
                        this._view.btn_offline.setEffect("guajishouyi" /* Guajishouyi */, grp, grp.width / 2, grp.height / 2);
                    }
                    else {
                        this._view.btn_offline.clearEffect();
                    }
                    this._view.btn_offline.redPoint.visible = b;
                    // this._view.btn_offline.icon = b ? "guaji1" : "guaji";
                    this._view.btn_offline.icon = !b ? "guaji" : "";
                    this._view.btn_offline.setImage("title_guajishouyi");
                };
                /** 更新红点 */
                MainBottomMdr.prototype.updateHint = function () {
                    this.onRefreshPassHint(mod.HintMgr.getHint(["42" /* Pass */]));
                    this.onRefreshOfflineHint(mod.HintMgr.getHint(this._mainProxy.offlineHint));
                    this.updateMailHint(mod.HintMgr.getHint(["07" /* Mail */]));
                    this.updateChatHint(mod.HintMgr.getHint(["25" /* Chat */]));
                    this.updateBtnMoreHint();
                };
                //------------------------------聊天-----------------------------------
                MainBottomMdr.prototype.onDownChat = function (e) {
                    this._distance.x = e.stageX - this._view.btn_chat.x;
                    this._distance.y = e.stageY - this._view.btn_chat.y;
                    this._touchStatus = true;
                    this._moveStatus = false;
                    this._view.btn_chat.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveChat, this);
                };
                MainBottomMdr.prototype.onMoveChat = function (e) {
                    if (this._touchStatus) {
                        var moveX = e.stageX - this._distance.x;
                        var offsetX = this._view.btn_chat.anchorOffsetX; //设置描点后需要计算上
                        moveX = Math.max(this._view.grp_show.width - gso.contentWidth + offsetX, moveX);
                        moveX = Math.min(gso.contentWidth - this._view.btn_chat.width + offsetX, moveX);
                        this._view.btn_chat.x = moveX;
                        var moveY = e.stageY - this._distance.y;
                        var offsetY = this._view.btn_chat.anchorOffsetY; //设置描点后需要计算上
                        moveY = Math.max(-(this._view.y + this._view.grp_show.y) + offsetY, moveY);
                        moveY = Math.min(this._view.height - this._view.grp_show.y - this._view.btn_chat.height + offsetY, moveY);
                        this._view.btn_chat.y = moveY;
                        this._moveStatus = true;
                    }
                };
                MainBottomMdr.prototype.onUpChat = function () {
                    this._touchStatus = false;
                    this._view.btn_chat.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMoveChat, this);
                };
                //打开聊天
                MainBottomMdr.prototype.onClickChat = function () {
                    if (this._moveStatus) {
                        return;
                    }
                    mod.ViewMgr.getIns().showViewByID(34 /* Chat */);
                    // let info: msg.skill_item = new msg.skill_item();
                    // info.index = 150000301;
                    // facade.showView(ModName.Xianfa, XianfaViewType.XianfaActiveTip, info);
                    //ViewMgr.getIns().showSuccessTips(SuccessTipsType.Act);
                    // let msg: s2c_instance_fin = new s2c_instance_fin();
                    // msg.index = 240000333;
                    // msg.is_success = true;
                    // msg.type = 106;
                    // let rewards: prop_tips_data[] = [];
                    // for(let i = 0; i < 20; ++i){
                    //     let reward: prop_tips_data = new prop_tips_data();
                    //     reward.idx = Long.fromValue(1450000001 + i);
                    //     reward.cnt = i + 1;
                    //     rewards.push(reward);
                    // }
                    // msg.reward = rewards;
                    // facade.showView(ModName.Result, ResultViewType.ResultWin, msg);/** 战斗胜利默认界面*/
                };
                MainBottomMdr.prototype.updateChatHint = function (hint) {
                    this.updateBtnTween(this._view.btn_chat, hint);
                };
                MainBottomMdr.prototype.updateChat = function () {
                    this._view.btn_chat.visible = mod.ViewMgr.getIns().checkBtnShow(1041670150 /* Chat */);
                    this.updateBtnPos();
                };
                //------------------------------聊天-----------------------------------
                //打开挂机界面
                MainBottomMdr.prototype.onOffline = function () {
                    mod.ViewMgr.getIns().showViewByID(5 /* OfflineGain */);
                };
                //--------------------邮件-----------------------
                /** 打开邮件*/
                MainBottomMdr.prototype.onClickMail = function () {
                    mod.ViewMgr.getIns().showView("07" /* Mail */, "01" /* MailMain */);
                };
                MainBottomMdr.prototype.onUpdateMail = function () {
                    var proxy = facade.retMod("07" /* Mail */).retProxy(6 /* Mail */);
                    var cnt = proxy.getTotalMailCnt();
                    this._view.btn_mail.visible = cnt > 0;
                    this.updateBtnPos();
                };
                //---------------------快捷使用-------------------
                MainBottomMdr.prototype.onUpdateUse = function () {
                    if (!this._easyUse && (this._easyUse = mod.BagUtil.getEasyUse(), this._easyUse)) {
                        var proxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                        if (this._easyUse.propType == 1 /* RoleEquip */ && !proxy.checkEquipByPos(this._easyUse.equipPos)) {
                            this._easyUse = null;
                            this.onUpdateUse();
                            return;
                        }
                        this.onShowUse(this._easyUse);
                    }
                };
                MainBottomMdr.prototype.onCloseUse = function () {
                    this._easyUse = mod.BagUtil.getEasyUse();
                    var tween = this.setUseTween(this._view.use_prop, 1, 0.01);
                    tween.delay(100).exec(Handler.alloc(this, this.onShowUse, [this._easyUse]));
                };
                MainBottomMdr.prototype.onShowUse = function (prop) {
                    this._view.use_prop.visible = false;
                    if (!prop) {
                        return;
                    }
                    var proxy = game.getProxy("11" /* Equip */, 14 /* Equip */);
                    if (prop.propType == 1 /* RoleEquip */ && !proxy.checkEquipByPos(prop.equipPos)) {
                        this.onCloseUse();
                        return;
                    }
                    this._view.use_prop.setData(prop);
                    this.setUseTween(this._view.use_prop, 0.01, 1, 200, true);
                };
                MainBottomMdr.prototype.setUseTween = function (item, init, scale, duration, visible) {
                    if (duration === void 0) { duration = 200; }
                    Tween.remove(item);
                    item.scaleX = item.scaleX = init;
                    var scaleX = scale;
                    var scaleY = scale;
                    if (visible !== null) {
                        item.visible = visible;
                    }
                    return Tween.get(this._view.use_prop).to({ scaleX: scaleX, scaleY: scaleY }, duration);
                };
                //--------------------更多-----------------------
                MainBottomMdr.prototype.onClickMore = function () {
                    this.onInitMore();
                    if (!this._view.gr_more.visible) {
                        this._view.gr_more.visible = true;
                        this._moreStatus++;
                        this.dealBtnIconList();
                        stage.addEventListener(TouchEvent.TOUCH_TAP, this.onCheckClose, this);
                    }
                    else {
                        this._moreStatus++;
                        if (this._moreStatus > 2 /* Skill */) {
                            this._view.gr_more.visible = false;
                            this._moreStatus = 0 /* More */;
                            this.clearBtnIconData();
                        }
                        if (this._view.gr_xianyuan.visible) {
                            this._view.gr_xianyuan.visible = false;
                        }
                    }
                    this.onUpdateStatus();
                };
                MainBottomMdr.prototype.onUpdateStatus = function () {
                    if (this._moreStatus == 1 /* Fuction */) {
                        //功能
                        this._view.scr_skill.visible = false;
                        this._view.scr_icon.visible = true;
                        var N = Math.ceil(this._view.gr_icon.numChildren / 6) || 1;
                        var height = N * 105 + 27;
                        this._view.img_bg.height = height;
                        this._view.gr_more.height = height;
                    }
                    else if (this._moreStatus == 2 /* Skill */) {
                        //技能
                        this._view.scr_skill.visible = true;
                        this._view.scr_icon.visible = false;
                        var xianfa = facade.retMod("44" /* Xianfa */).retProxy(188 /* Xianfa */);
                        //xianfa.posSkills.push(xianfa.posSkills[0]); 调试代码
                        this._skillData.source = xianfa.posSkills;
                        var N = Math.ceil(xianfa.posSkills.length / 6) || 1;
                        var height = N * 105 + 27;
                        this._view.img_bg.height = height;
                        this._view.gr_more.height = height;
                    }
                    else {
                        //关闭
                        this._view.scr_skill.visible = false;
                        this._view.scr_icon.visible = false;
                        this._skillData.removeAll();
                        stage.removeEventListener(TouchEvent.TOUCH_TAP, this.onCheckClose, this);
                    }
                    this._view.btn_more.icon = "btn_more" + (this._moreStatus || "");
                    this.updateBtnMoreHint();
                    this.showMoreGuide();
                };
                //更新
                MainBottomMdr.prototype.updateMailHint = function (hint) {
                    this.updateBtnTween(this._view.btn_mail, hint);
                };
                MainBottomMdr.prototype.updateBtnTween = function (btn, hint) {
                    btn.rotation = 0;
                    Tween.remove(btn);
                    if (hint) {
                        Tween.get(btn, { loop: true })
                            .to({ rotation: -20 }, 150)
                            .to({ rotation: 20 }, 150)
                            .to({ rotation: 0 }, 150).delay(1000);
                    }
                };
                /** 通用红点事件监听 */
                MainBottomMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    if (data.node == "42" /* Pass */) {
                        this.onRefreshPassHint(data.value);
                    }
                    else if (data.node == mod.HintMgr.getType(this._mainProxy.offlineHint)) {
                        this.onRefreshOfflineHint(data.value);
                    }
                    else if (data.node == "07" /* Mail */) {
                        this.updateMailHint(data.value);
                    }
                    else if (data.node == "25" /* Chat */) {
                        this.updateChatHint(data.value);
                    }
                    //更多按钮红点
                    var btnMoreHintTypes = this.getBtnMoreHintTypes();
                    if (btnMoreHintTypes.indexOf(data.node) > -1) {
                    }
                    //更多按钮里面的按钮红点
                    if (this._view.gr_more.visible) {
                        var showBtnMap = this._ins._showBtnMap;
                        for (var k in showBtnMap) {
                            var btnIcon = showBtnMap[k];
                            var btnData = btnIcon ? btnIcon.data : null;
                            if (!btnData || (!btnData.hintMsg && !btnData.hintMsgList) || btnData.hintType == mod.BtnIconHintType.None || btnData.hintType == mod.BtnIconHintType.Once) {
                                continue;
                            }
                            if (btnData.hintMsg) {
                                var type = mod.HintMgr.getType(btnData.hintMsg);
                                if (type != data.node) {
                                    continue;
                                }
                                var hint = data.value;
                                if (!hint && btnData.hintType == mod.BtnIconHintType.FirstCommon) {
                                    hint = mod.BtnIconBase._hintCache[btnData.id] == undefined;
                                }
                                btnIcon.setHint(hint);
                                break;
                            }
                            else if (btnData.hintMsgList) {
                                var hint = //undefined
                                 void 0; //undefined
                                for (var _i = 0, _a = btnData.hintMsgList; _i < _a.length; _i++) {
                                    var hintMsg = _a[_i];
                                    var type = mod.HintMgr.getType(hintMsg);
                                    if (type != data.node) {
                                        continue;
                                    }
                                    if (!hint) {
                                        hint = data.value; //不存在值，或者false的时候才赋值
                                    }
                                    else {
                                        break;
                                    }
                                }
                                if (hint != undefined) {
                                    if (btnData.hintType == mod.BtnIconHintType.FirstCommon) {
                                        hint = mod.BtnIconBase._hintCache[btnData.id] == undefined;
                                    }
                                    btnIcon.setHint(hint);
                                    break;
                                }
                            }
                        }
                    }
                };
                //切换场景
                MainBottomMdr.prototype.onSceneChange = function () {
                    this.updateShow();
                };
                //点击退出
                MainBottomMdr.prototype.onClickExit = function () {
                    var sceneType = mod.SceneUtil.getCurSceneType();
                    var tip = game.getLanById("bahuang_tips15" /* bahuang_tips15 */);
                    if (game.SceneExitTips[sceneType]) {
                        //特殊场景退出提示文本
                        tip = game.getLanById(game.SceneExitTips[sceneType]);
                    }
                    //退出提示
                    mod.ViewMgr.getIns().showConfirm(tip, Handler.alloc(this, function () {
                        mod.SceneUtil.clickExit();
                    }));
                };
                //--------------------显示主界面-----------------------
                MainBottomMdr.prototype.updateShow = function () {
                    var isShow = mod.SceneUtil.isShowMain();
                    this._isShow = isShow;
                    this._view.grp_show.visible = isShow;
                    this._view.btn_exit.visible = !isShow; //退出战斗按钮
                    this.setGrpBoss(false); //切换场景时候，隐藏boss提示
                    if (isShow) {
                        this.showTaskGuide(); //切换场景时，显示下任务指引
                    }
                    else {
                        this.clearAllGuide();
                        this.clearMoreGuide();
                        this.clearFuncGuide(); //清除指引
                        this._view.btn_exit.y = mod.SceneUtil.isSceneType(111 /* Yuanling */) ? 874 : 990; //退出按钮位置
                    }
                };
                //--------------------更多功能列表-------------------
                MainBottomMdr.prototype.onCheckClose = function (e) {
                    if (this._view.gr_more.visible && this.rectangle.contains(e.stageX, e.stageY)) {
                        return;
                    }
                    if (e.target == this._view.btn_more) {
                        return;
                    }
                    //仙缘按钮
                    if (e.target && e.target.id && e.target.id == 1041670173 /* Xianyuan */) {
                        return;
                    }
                    this._view.gr_more.visible = false;
                    this._view.gr_xianyuan.visible = false;
                    this._moreStatus = 0 /* More */;
                    this.onUpdateStatus();
                    this.clearBtnIconData();
                };
                MainBottomMdr.prototype.dealBtnIconList = function () {
                    this._ins.dealBtnIconList(this._btnData);
                    //开启监听按钮额外判断
                    var btnNtMap = this._ins._btnNtMap;
                    for (var key in btnNtMap) {
                        this.onNt(key, this.dealSingleBtnIconByNt, this);
                    }
                };
                //监听回调处理单个按钮
                MainBottomMdr.prototype.dealSingleBtnIconByNt = function (n) {
                    var notify = n.type;
                    var idList = this._ins._btnNtMap[notify];
                    if (idList && idList.length) {
                        for (var _i = 0, idList_1 = idList; _i < idList_1.length; _i++) {
                            var id = idList_1[_i];
                            this.dealSingleBtnIcon(id);
                        }
                    }
                };
                //处理单个按钮
                MainBottomMdr.prototype.dealSingleBtnIcon = function (id) {
                    var isAdd = this._ins.dealSingleBtnIcon(id);
                };
                MainBottomMdr.prototype.clearBtnIconData = function () {
                    this._ins.clear();
                    this._view.gr_icon.removeChildren();
                    //移除绑定的监听
                    for (var key in this._btnNtMap) {
                        this.offNt(key);
                        this._btnNtMap[key] = null;
                        delete this._btnNtMap[key];
                    }
                    this._btnNtMap = {};
                };
                /**功能开启刷新按钮*/
                MainBottomMdr.prototype.onOpenFuncUpdate = function (n) {
                    var addIdx = n.body;
                    for (var _i = 0, addIdx_1 = addIdx; _i < addIdx_1.length; _i++) {
                        var idx = addIdx_1[_i];
                        if (this._view.gr_more.visible && this._ins._btnDataMap[idx]) {
                            this.dealSingleBtnIcon(idx);
                        }
                        if (idx == 1041670202 /* Huashen */) {
                            this.updateHuashen();
                        }
                        else if (idx == 1041670150 /* Chat */) {
                            this.updateChat();
                        }
                        else if (idx == 1040190001 /* Pass */) {
                            this.updatePass();
                        }
                        else if (idx == 1041670236 /* Offline */) {
                            this.updateOffline();
                        }
                    }
                };
                /**功能关闭移除按钮*/
                MainBottomMdr.prototype.onOpenFuncDelete = function (n) {
                    var delIdx = n.body;
                    for (var _i = 0, delIdx_1 = delIdx; _i < delIdx_1.length; _i++) {
                        var idx = delIdx_1[_i];
                        if (this._view.gr_more.visible && this._ins._showBtnMap[idx]) {
                            this.dealSingleBtnIcon(idx); //调用统一的接口，做一些处理
                        }
                    }
                };
                //--------------------主线任务-----------------------
                MainBottomMdr.prototype.onClickTask = function () {
                    if (!this._curTask) {
                        return;
                    }
                    mod.GuideMgr.getIns().clear(1 /* Task */); //清除任务指引
                    mod.GuideMgr.getIns().clear(30 /* TaskClick */); //清除任务指引
                    mod.TaskUtil.clickTask(this._curTask);
                };
                MainBottomMdr.prototype.onTaskUpdate = function (n) {
                    var types = n.body;
                    if (types.indexOf(1 /* Main */) > -1) {
                        this.updateTask();
                    }
                };
                MainBottomMdr.prototype.updateTask = function () {
                    this._curTask = mod.TaskUtil.getMainTask();
                    if (this._curTask) {
                        //指引清除规则：
                        //1、非完成步骤时，点击即清除，例如主界面的指引
                        //2、完成步骤时，任务完成时候清除，例如神灵升级按钮指引
                        if (!this._lastTask || this._lastTask.task_id != this._curTask.task_id
                            || this._curTask.status == 1 /* Finish */) {
                            //任务触发：首次接到任务时，主线任务切换时，主线任务完成时
                            mod.GuideMgr.getIns().taskUpdate();
                        }
                        this._lastTask = mod.RoleUtil.clone(this._curTask); //切换任务时，当前任务会先被清空，再赋值
                        this._view.lab_taskDesc.textFlow = game.TextUtil.parseHtml(mod.TaskUtil.getTaskDesc(this._curTask, true));
                        // TODO:ID1011330需求屏蔽ID1011025TODO:ID1011330需求屏蔽ID1011025
                        // if (this._curTask.task_id >= this._huashenTaskId1 && this._curTask.task_id <= this._huashenTaskId2) {
                        //     if (this._curTask.task_id == this._huashenTaskId1) {
                        //         this._isTaskTrigger = !(this._curTask.status == TaskStatus.NotFinish);
                        //     } else {
                        //         this._isTaskTrigger = true;
                        //     }
                        //     this.updateHuashen();
                        //
                        //     if (this._curTask.task_id == this._huashenTaskId2) {
                        //         this.showHuaShenGuide();
                        //     }
                        //
                        // } else {
                        //     this._isTaskTrigger = false;
                        //     this.updateHuashen();
                        // }
                        this._isTaskTrigger = false;
                    }
                    else {
                        this._view.lab_taskDesc.text = game.getLanById("world_boss1" /* world_boss1 */);
                    }
                };
                // 更新元灵副本组队邀请按钮
                MainBottomMdr.prototype.onUpdateYuanLingInvite = function () {
                    var proxy = game.getProxy("49" /* Shilian */, 197 /* YuanlingFuben */);
                    var list = proxy.getInvitedTeamList();
                    //todo
                    DEBUG && console.log('s2c_yuanling_invita-getInvitedTeamList-MainBottomMdr:', list, list && list.length || 0);
                    this._view.btn_yuanling_invite.visible = list && list.length > 0;
                    this.setBtnShow(this._view.btn_yuanling_invite);
                };
                // 元灵副本组队邀请
                MainBottomMdr.prototype.onClickYuanLingInvite = function () {
                    mod.ViewMgr.getIns().showSecondPop("49" /* Shilian */, "12" /* YuanLingBeInvited */);
                };
                //仙缘 todo
                MainBottomMdr.prototype.onClickXianyuan = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670173 /* Xianlv */, true)) {
                        return;
                    }
                    this._view.gr_xianyuan.visible = !this._view.gr_xianyuan.visible;
                    if (!this._view.gr_xianyuan.visible) {
                        return;
                    }
                    var size = this._view.gr_icon.numChildren;
                    for (var i = 0; i < size; i++) {
                        var btn = this._view.gr_icon.getChildAt(i);
                        if (btn && btn.id == 1041670173 /* Xianyuan */) {
                            var point = btn.localToGlobal();
                            this._view.gr_xianyuan.x = point.x - 250;
                            break;
                        }
                    }
                    this._view.gr_xianyuan_icon.removeChildren();
                    var btnList = [
                        { id: 1041670173 /* Xianyuan */, m: "58" /* Xianyuan */, v: "01" /* Xianlv */, showBack: true },
                        { id: 1041670180 /* Friend */, m: "59" /* Friend */, v: "01" /* FriendMain */, showBack: true }
                        // {id: 2, m: ModName.Xianyuan, v: XianyuanViewType.Xianyou, showBack: true},
                        // {id: 3, m: ModName.Xianyuan, v: XianyuanViewType.Xiandui, showBack: true}
                    ];
                    for (var _i = 0, btnList_1 = btnList; _i < btnList_1.length; _i++) {
                        var btnData = btnList_1[_i];
                        var cfg = game.getConfigByNameId("open_function.json" /* OpenFunction */, btnData.id);
                        btnData.hintMsg = [btnData.m, btnData.v];
                        btnData.hintType = mod.BtnIconHintType.Common;
                        //修改为读配置
                        //btnData.effType = BtnIconEffType.None;
                        btnData.effType = cfg.effType || mod.BtnIconEffType.None;
                        btnData.sweepType = cfg.sweepType || 0;
                        btnData.icon = cfg && cfg.icon || '';
                        btnData.sort_num = cfg && cfg.sort_num || 0;
                        var btn = new mod.BtnIconBase(btnData.id);
                        btn.data = btnData;
                        this._view.gr_xianyuan_icon.addChild(btn);
                    }
                };
                //-------------------------------------指引相关------------------------------------------------
                MainBottomMdr.prototype.showGuide = function () {
                    if (this._isShow) {
                        mod.GuideMgr.getIns().show(15 /* Pass */, this._view.btn_challenge, Handler.alloc(this, this.onClickPass)); //任务指引
                        this.showTaskGuide();
                        this.showMoreGuide();
                    }
                    else {
                        this.clearAllGuide();
                    }
                };
                MainBottomMdr.prototype.showHuaShenGuide = function () {
                    mod.GuideMgr.getIns().show(41 /* HuaShengSkillIcon */, this._view.huashen, Handler.alloc(this, this.onClickHuashenSkillIcon)); //化神指引
                };
                MainBottomMdr.prototype.onClickHuashenSkillIcon = function () {
                    this.onClickHuashen();
                    mod.GuideMgr.getIns().clear(41 /* HuaShengSkillIcon */); //清除指引
                };
                MainBottomMdr.prototype.showTaskGuide = function () {
                    mod.GuideMgr.getIns().show(1 /* Task */, this._view.grp_task, Handler.alloc(this, this.onClickTask)); //任务指引
                    mod.GuideMgr.getIns().show(30 /* TaskClick */, this._view.grp_task, Handler.alloc(this, this.onClickTask)); //任务指引
                };
                MainBottomMdr.prototype.clearAllGuide = function () {
                    mod.GuideMgr.getIns().clear(1 /* Task */); //任务界面隐藏时，清除任务指引
                    mod.GuideMgr.getIns().clear(30 /* TaskClick */); //任务界面隐藏时，清除任务指引
                    mod.GuideMgr.getIns().clear(15 /* Pass */); //清除任务指引
                };
                MainBottomMdr.prototype.clearMoreGuide = function () {
                    mod.GuideMgr.getIns().clear(26 /* More */); //清除更多指引
                };
                MainBottomMdr.prototype.clearFuncGuide = function () {
                    this._ins.clearGuide(); //清除指引;//清除功能指引
                };
                //触发指定指引
                MainBottomMdr.prototype.onGuideTrigger = function (n) {
                    var key = n.body;
                    if (key == 10001 /* Tips */) {
                        this.showTipsGuide();
                    }
                };
                //任务提示指引
                MainBottomMdr.prototype.showTipsGuide = function () {
                    if (this._isShow) {
                        mod.GuideMgr.getIns().show(10001 /* Tips */, this._view.grp_task); //提示指引
                    }
                    else {
                        mod.GuideMgr.getIns().clear(10001 /* Tips */);
                    }
                };
                //更多指引
                MainBottomMdr.prototype.showMoreGuide = function () {
                    if (this._isShow && this._moreStatus == 0 /* More */) {
                        mod.GuideMgr.getIns().show(26 /* More */, this._view.btn_more, Handler.alloc(this, this.onClickMore)); //任务指引
                    }
                    else {
                        this.clearMoreGuide();
                    }
                    if (this._isShow && this._view.gr_more.visible && this._view.scr_icon.visible) {
                        //供奉入口
                        this._ins.showGuide(); //管理器处理指引
                    }
                    else {
                        this.clearFuncGuide(); //清除指引
                    }
                };
                /********************资源找回**********************/
                MainBottomMdr.prototype.onClickFind = function () {
                    mod.ViewMgr.getIns().showView("05" /* Main */, "41" /* RewardFindMain */);
                };
                MainBottomMdr.prototype.updateFind = function () {
                    var isShow = this._mainProxy.isFindShow();
                    this._view.btn_find.visible = this._view.btn_find.redPoint.visible = isShow; //显示入口的时候就有红点
                    this.setBtnShow(this._view.btn_find);
                };
                MainBottomMdr.prototype.setBtnShow = function (btn) {
                    if (btn.visible) {
                        //显示时加入
                        if (!btn.parent) {
                            this._view.grp_btn.addChild(btn);
                        }
                    }
                    else {
                        //隐藏时移除
                        if (btn.parent) {
                            btn.parent.removeChild(btn);
                        }
                    }
                    this.updateBtnPos();
                };
                MainBottomMdr.prototype.updateOffline = function () {
                    if (mod.ViewMgr.getIns().checkViewOpen(1041670236 /* Offline */)) {
                        this._view.btn_offline.visible = true;
                    }
                    else {
                        this._view.btn_offline.visible = false;
                    }
                };
                //刷新邮件、聊天、邀请、资源找回按钮位置
                MainBottomMdr.prototype.updateBtnPos = function () {
                    var btnGap = 6; //按钮间距
                    var btnWidth = 64; //按钮宽度
                    var startPos = this._view.btn_mail.x - this._view.btn_mail.anchorOffsetX; //按钮起始位置
                    var isMailShow = this._view.btn_mail.visible;
                    var btnPos = isMailShow ? startPos + btnWidth + btnGap : startPos; //按钮位置
                    var btnNum = this._view.grp_btn.numChildren; //btn组的按钮数量
                    if (btnNum) {
                        this._view.grp_btn.x = btnPos;
                        btnPos += btnNum * btnWidth + (btnNum - 1) * btnGap;
                    }
                    var isChatShow = this._view.btn_chat.visible;
                    if (isChatShow) {
                        this._view.btn_chat.x = btnPos + this._view.btn_chat.anchorOffsetX;
                    }
                };
                /********************化神**********************/
                MainBottomMdr.prototype.onSurfaceInfoUpdate = function (n) {
                    var type = n.body;
                    if (type == 409 /* Huashen */) {
                        //更新化神
                        this.updateHuashen();
                    }
                };
                //化神变身结束时间修改
                MainBottomMdr.prototype.onSceneHuashenTime = function (n) {
                    var totalTime = this._surfaceProxy.huashenTime;
                    if (totalTime) {
                        //开启变身
                        var curTime = TimeMgr.time.serverTimeSecond;
                        this._huashenStartTime = curTime; //记录开时变身的时间
                        this._startHuashenBecome = true;
                        this.updateHuashenVal();
                        TimeMgr.addUpdateItem(this, 1000);
                    }
                    else {
                        //重新开启蓄能
                        this.setHuashenOpen(false);
                        this.startHuashenVal();
                    }
                };
                //场景变化
                MainBottomMdr.prototype.onSceneEnter = function (n) {
                    this._startHuashenBecome = false;
                    this.setHuashenOpen(false);
                };
                //场景化神变身数据变更
                MainBottomMdr.prototype.onSceneHuashenId = function (n) {
                    if (!this._isAct) {
                        return;
                    }
                    var curId = n.body;
                    console.info("场景化神刷新变更：", curId);
                    var ret = !!curId;
                    if (this._huashenBecoming) {
                        this._startHuashenBecome = false;
                        this.setHuashenOpen(false);
                        this.startHuashenVal();
                    }
                    this._huashenBecoming = ret; //存在ID时，则表示变身中
                    game.SkillData.setHuashenXing(this._huashenBecoming);
                    // if(!this._huashenBecoming){
                    //     //变身结束,重新蓄能
                    //     this.startHuashenVal();
                    // }
                    this._surfaceProxy.setHuashenIds(curId); //场景化神ID变化时设置化神数据
                    this.updateHuashenIcon(); //更新化神图标
                };
                MainBottomMdr.prototype.onClickHuashen = function () {
                    this.clickHuashenSkill(true, true);
                };
                MainBottomMdr.prototype.clickHuashenSkill = function (jump, showTips) {
                    if (this._isAct || this._isTaskTrigger) {
                        //1、没有攻击目标时提示暂无攻击目标，不做其他表现
                        var targetId = mod.SceneUtil.getAttackTargetId(showTips);
                        if (!targetId) {
                            return;
                        }
                        //2、能量不足时提示能量点不足，不做其他表现
                        if (this._startHuashenVal) {
                            if (showTips) {
                                game.PromptBox.getIns().show("能量点不足");
                            }
                            return;
                        }
                        var huashenIds = this._surfaceProxy.huashenIds;
                        if (huashenIds && huashenIds.length > 1) {
                            //如果上阵多个化神，则打开轮盘，再次点击化神按钮时，则关闭轮盘
                            this.setHuashenOpen(!this._huashenOpen);
                        }
                        if (this._huashenBecoming) {
                            //已经处于变身状态，则返回
                            return;
                        }
                        //激活后化神变身
                        var id = huashenIds[0] || this._huashenId;
                        this.huashenUseSkill(id, targetId);
                    }
                    else {
                        if (jump) {
                            mod.ViewMgr.getIns().showView("61" /* More */, "02" /* HuashenMain */);
                        }
                    }
                };
                //化神变身使用技能
                MainBottomMdr.prototype.huashenUseSkill = function (id, targetId) {
                    var huashenIds = this._surfaceProxy.huashenIds;
                    this._huashenPos = huashenIds.indexOf(id);
                    var cfg = game.getConfigByNameId("huashen.json" /* Huashen */, id);
                    mod.SceneUtil.useSkill(cfg.skill, targetId);
                    this._huashenSkillTime = TimeMgr.time.serverTimeSecond;
                    //更新技能CD
                    this.updateHuashenSkill();
                    console.info("客户端使用化神", cfg.name, "的技能：", cfg.skill);
                };
                MainBottomMdr.prototype.updateHuashen = function () {
                    var isShow = mod.ViewMgr.getIns().checkBtnShow(1041670202 /* Huashen */);
                    // TODO:ID1011330需求屏蔽ID1011025
                    this._view.grp_huashen.visible = isShow || this._isTaskTrigger;
                    //this._view.grp_huashen.visible = isShow;
                    if (!isShow && !this._isTaskTrigger) {
                        return;
                    }
                    var isAct = this._surfaceProxy.isDefaultAct(409 /* Huashen */);
                    if (isAct || this._isTaskTrigger) {
                        //已激活
                        this._view.huashen.img_huashen_lock.visible = false;
                        // TODO:ID1011330需求屏蔽ID1011025
                        //this._view.huashen.visible = true;
                        if (this._isTaskTrigger) {
                            this.updateHuashenVal(true);
                        }
                        else if (!this._isAct) {
                            //如果已经开启化神，则开始蓄能
                            this.startHuashenVal();
                        }
                        this.updateHuashenIcon();
                    }
                    else {
                        //未激活
                        this._view.huashen.img_huashen_lock.visible = true;
                        this._view.huashen.img_huashen.source = "huashen_icon";
                        this._view.huashen.img_huashen_val.visible = false;
                        this._view.huashen.lab_huashen_val.text = "";
                        // TODO:ID1011330需求屏蔽ID1011025
                        //this._view.huashen.visible = false;
                    }
                    this._isAct = isAct;
                };
                //更新化神图标
                MainBottomMdr.prototype.updateHuashenIcon = function () {
                    var huashenIds = this._surfaceProxy.huashenIds;
                    var id = huashenIds[0] || this._huashenId;
                    var cfg = game.getConfigByNameId("huashen.json" /* Huashen */, id);
                    this._view.huashen.img_huashen.source = cfg.icon;
                    if (huashenIds.length <= 1) {
                        return;
                    }
                    //展示轮盘
                    for (var i = 0; i < this._huashenList.length; ++i) {
                        var item = this._huashenList[i];
                        var pos = i + 1; //下标
                        var id_1 = huashenIds.length > pos ? huashenIds[pos] : null;
                        item.setData(id_1);
                    }
                };
                //开启化神蓄能
                MainBottomMdr.prototype.startHuashenVal = function () {
                    this._view.huashen.group_eft.removeChildren();
                    this._huashenVal = 0; //进度置0
                    this._startHuashenVal = true; //开启蓄能
                    this.updateHuashenVal();
                    TimeMgr.addUpdateItem(this, 1000);
                };
                //计算化神蓄能
                MainBottomMdr.prototype.calcHuashenVal = function () {
                    if (!this._startHuashenVal) {
                        return;
                    }
                    //当前能量条 += [每秒基础能量回复值 *（1+buff系数） + buff数值]
                    // buff系数 == theGod_resume_rate/10000
                    // buff数值 == theGod_resume + （每5秒：theGod_resume_5）
                    var baseCfg = game.GameConfig.getParamConfigById("theGod_Resume");
                    var baseVal = baseCfg && baseCfg.value;
                    var attr = this._mainProxy.huashenAttr;
                    var buffRate = attr && attr.add_damage_rate ? attr.add_damage_rate / 10000 : 0;
                    var buffVal = attr && attr.theGod_resume ? attr.theGod_resume : 0;
                    this._huashenTick++; //累加
                    if (this._huashenTick >= this.theGod_resume_5) {
                        //每5秒累加
                        buffVal += attr && attr.theGod_resume_5 ? attr.theGod_resume_5 : 0;
                        this._huashenTick = 0;
                    }
                    this._huashenVal += baseVal * (1 + buffRate) + buffVal;
                    var maxCfg = game.GameConfig.getParamConfigById("theGod_MaxEnergy");
                    var maxVal = maxCfg && maxCfg.value;
                    if (this._huashenVal >= maxVal) {
                        //蓄能已满
                        this._view.huashen.group_eft.removeChildren();
                        this.addEftByParent("huashenjineng" /* HuaShenJiNeng */, this._view.huashen.group_eft);
                        this._startHuashenVal = false;
                        this._view.huashen.img_huashen_val.mask = null;
                        this._sp.graphics.clear();
                        if (!gso.autoHuashen) {
                            TimeMgr.removeUpdateItem(this); //没有勾选自动化神才移除定时器
                        }
                    }
                };
                //更新化神进度表现
                MainBottomMdr.prototype.updateHuashenVal = function (isFullness) {
                    if (isFullness === void 0) { isFullness = false; }
                    if (isFullness) {
                        //直接续满能
                        this._view.huashen.lab_huashen_val.text = "";
                        this.updateHuashenValBar(true);
                        return;
                    }
                    this._view.huashen.img_huashen_val.visible = true;
                    if (this._startHuashenVal) {
                        this._view.huashen.lab_huashen_val.text = "";
                        //蓄能表现
                        this.updateHuashenValBar();
                    }
                    if (this._startHuashenBecome) {
                        this.updateHuashenBecomeBar();
                    }
                };
                //刷新蓄能进度，进度初始为空，顺时针递增
                MainBottomMdr.prototype.updateHuashenValBar = function (isFullness) {
                    if (isFullness === void 0) { isFullness = false; }
                    var sp = this._sp;
                    sp.graphics.clear();
                    var radius = this.sp_radius; //半径
                    var maxCfg = game.GameConfig.getParamConfigById("theGod_MaxEnergy");
                    var maxVal = maxCfg && maxCfg.value;
                    var startPos = -90; //圆弧的起始点， x轴方向开始计算，单位以弧度表示。
                    var angle = 0;
                    if (isFullness) {
                        angle = 360 + startPos;
                    }
                    else {
                        angle = this._huashenVal * 360 / maxVal + startPos;
                    }
                    sp.graphics.beginFill(0x0, 1);
                    sp.graphics.moveTo(0, 0);
                    sp.graphics.lineTo(0, radius);
                    sp.graphics.drawArc(0, 0, radius, startPos * Math.PI / 180, angle * Math.PI / 180);
                    sp.graphics.lineTo(0, 0);
                    sp.graphics.endFill();
                    this._view.huashen.img_huashen_val.mask = sp;
                };
                //刷新变身进度，进度初始为满，顺时针递减
                MainBottomMdr.prototype.updateHuashenBecomeBar = function () {
                    var totalTime = this._surfaceProxy.huashenTime;
                    var curTime = TimeMgr.time.serverTimeSecond;
                    var passTime = curTime - this._huashenStartTime; //已经经过的时间
                    var leftTime = totalTime - passTime;
                    this._view.huashen.lab_huashen_val.text = leftTime + "";
                    var sp = this._sp;
                    sp.graphics.clear();
                    if (leftTime <= 0) {
                        //变身结束后，默认显示主战化神，关闭轮盘，重新开始蓄能，不移除定时器
                        this._startHuashenBecome = false;
                        this._surfaceProxy.resetHuashenIds();
                        this.updateHuashenIcon();
                        this.setHuashenOpen(false);
                        this.startHuashenVal();
                        return;
                    }
                    if (passTime <= 0) {
                        //0的时候不显示
                        return;
                    }
                    var radius = this.sp_radius; //半径
                    var startPos = -90; //圆弧的起始点， x轴方向开始计算，单位以弧度表示。
                    var angle = passTime * 360 / totalTime + startPos; //
                    sp.graphics.beginFill(0x0, 1);
                    sp.graphics.moveTo(0, 0);
                    sp.graphics.lineTo(0, radius);
                    sp.graphics.drawArc(0, 0, radius, startPos * Math.PI / 180, angle * Math.PI / 180, true);
                    sp.graphics.lineTo(0, 0);
                    sp.graphics.endFill();
                    this._view.huashen.img_huashen_val.mask = sp;
                };
                //更新化神轮盘
                MainBottomMdr.prototype.setHuashenOpen = function (open) {
                    this._huashenOpen = open;
                    this._view.grp_huashen_open.visible = this._huashenOpen;
                    //更新技能CD
                    this.updateHuashenSkill();
                };
                MainBottomMdr.prototype.onClickHuashenItem = function (e) {
                    var clickBtn = e.target;
                    for (var _i = 0, _a = this._huashenList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        var btn = item.btn_huashen;
                        if (btn != clickBtn) {
                            continue;
                        }
                        var id = item.data;
                        if (!id) {
                            //出战界面
                            mod.ViewMgr.getIns().showSecondPop("61" /* More */, "04" /* HuashenBattleMain */);
                            return;
                        }
                        this.clickHuashenItemSkill(id, true);
                        return;
                    }
                };
                MainBottomMdr.prototype.clickHuashenItemSkill = function (id, showTips) {
                    //1、没有攻击目标时提示暂无攻击目标，不做其他表现
                    var targetId = mod.SceneUtil.getAttackTargetId(showTips);
                    if (!targetId) {
                        return;
                    }
                    if (showTips) {
                        //showTips才做判断
                        //2、在冷却时间内，则提示技能冷却中
                        var cd = this.getHuashenSkillCd();
                        if (cd >= 0) {
                            game.PromptBox.getIns().show("技能冷却中");
                            return;
                        }
                    }
                    this.huashenUseSkill(id, targetId);
                };
                //更新化神技能CD
                MainBottomMdr.prototype.updateHuashenSkill = function () {
                    if (!this._huashenOpen) {
                        return;
                    }
                    if (!this._huashenSkillTime) {
                        return;
                    }
                    var cd = this.getHuashenSkillCd();
                    for (var _i = 0, _a = this._huashenList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        item.updateCd(cd, this._huashenMaxCd);
                    }
                };
                MainBottomMdr.prototype.getHuashenSkillCd = function () {
                    this._view.huashen.group_eft.removeChildren();
                    var curTime = TimeMgr.time.serverTimeSecond;
                    var cd = this._huashenMaxCd + this._huashenSkillTime - curTime;
                    return cd;
                };
                //自动释放化神
                MainBottomMdr.prototype.autoHuashen = function () {
                    if (!gso.autoHuashen || this._isTaskTrigger) {
                        return; //未勾选自动幻化
                    }
                    var isShow = mod.SceneUtil.isShowMain();
                    if (isShow && !this._huashenBecoming) {
                        //玩家手动变身后如果有多个激活化神可以自动轮流切换
                        return; //挂机场景时返回
                    }
                    //处于变身状态时
                    var cd = this.getHuashenSkillCd();
                    if (cd >= 0) {
                        //在冷却时间内则返回
                        return;
                    }
                    if (!this._huashenBecoming) {
                        //不处于变身状态时，todo，待确定
                        this.clickHuashenSkill();
                        return;
                    }
                    var huashenIds = this._surfaceProxy.huashenIds;
                    if (!huashenIds || huashenIds.length <= 1) {
                        return;
                    }
                    this._huashenPos++; //累加
                    if (this._huashenPos >= huashenIds.length) {
                        this._huashenPos = 0;
                    }
                    var id = huashenIds[this._huashenPos];
                    this.clickHuashenItemSkill(id);
                };
                MainBottomMdr.prototype.update = function (time) {
                    //其他系统用update时候需要注意下，这里是化神专用的
                    this.calcHuashenVal();
                    this.updateHuashenVal();
                    this.updateHuashenSkill();
                    this.autoHuashen();
                };
                /********************Boss复活提示**********************/
                MainBottomMdr.prototype.onBossRevive = function (n) {
                    var data = n.body;
                    this._bossData = data;
                    this.setGrpBoss(this._isShow); //显示主界面UI时候才提示
                    this.updateGrpBoss();
                };
                MainBottomMdr.prototype.onClickGo = function () {
                    this.setGrpBoss(false); //点击前往，隐藏boss提示
                    if (!this._bossData) {
                        return;
                    }
                    var jumpId = this._bossData.jumpId;
                    mod.ViewMgr.getIns().showViewByID(jumpId);
                };
                MainBottomMdr.prototype.onClickClose = function () {
                    this.setGrpBoss(false); //关闭时候，隐藏boss提示
                };
                MainBottomMdr.prototype.setGrpBoss = function (val) {
                    this._view.grp_boss.visible = val;
                };
                MainBottomMdr.prototype.updateGrpBoss = function () {
                    if (!this._bossData) {
                        return;
                    }
                    var nameStr = this._bossData.nameStr;
                    this._view.lab_name.text = nameStr;
                    var index = this._bossData.index;
                    var monsterCfg = game.getConfigByNameId("monster1.json" /* Monster */, index);
                    this._view.img_icon.source = monsterCfg.res_id;
                };
                //点击战队
                MainBottomMdr.prototype.onClickZhandui = function () {
                    var zhanduiProxy = game.getProxy("61" /* More */, 251 /* Zhandui */);
                    if (zhanduiProxy.haveTeam()) {
                        mod.ViewMgr.getIns().showView("61" /* More */, "14" /* ZhanduiMain */);
                    }
                    else {
                        mod.ViewMgr.getIns().showView("61" /* More */, "11" /* ZhanduiBuildMain */, null, false);
                    }
                };
                //-------------------物品更新------------------------
                MainBottomMdr.prototype.onUpdateByProp = function (n) {
                    var prop = n.body;
                    if (!this._easyUse) {
                        return;
                    }
                    if (this._easyUse.type != prop.type) {
                        return;
                    }
                    if (this._easyUse.index != prop.index) {
                        return;
                    }
                    if (this._easyUse.type == 290 /* Equip */ || !prop.count) {
                        this.onCloseUse();
                        return;
                    }
                    this._easyUse = prop;
                    this.onShowUse(prop);
                };
                //更多按钮的红点路径
                MainBottomMdr.prototype.getBtnMoreHintTypes = function () {
                    if (this._btnMoreHintTypes) {
                        return this._btnMoreHintTypes;
                    }
                    var hintTypes = [];
                    for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item.m && hintTypes.indexOf(item.m) < 0) {
                            hintTypes.push(item.m);
                        }
                        if (item.hintMsg && hintTypes.indexOf(item.hintMsg[0]) < 0) {
                            hintTypes.push(item.hintMsg[0]);
                        }
                        if (item.hintMsgList) {
                            for (var _b = 0, _c = item.hintMsgList; _b < _c.length; _b++) {
                                var a = _c[_b];
                                if (hintTypes.indexOf(a[0])) {
                                    hintTypes.push(a[0]);
                                }
                            }
                        }
                    }
                    this._btnMoreHintTypes = hintTypes;
                    return hintTypes;
                };
                //更多按钮红点
                MainBottomMdr.prototype.getBtnMoreHint = function () {
                    var hintTypes = this.getBtnMoreHintTypes();
                    var hint = false;
                    for (var _i = 0, hintTypes_1 = hintTypes; _i < hintTypes_1.length; _i++) {
                        var type = hintTypes_1[_i];
                        if (mod.HintMgr.getHint([type])) {
                            hint = true;
                            break;
                        }
                    }
                    return hint;
                };
                //更多按钮红点
                MainBottomMdr.prototype.updateBtnMoreHint = function () {
                    if (this._moreStatus == 0) {
                        this._view.btn_more.setHint(this.getBtnMoreHint());
                    }
                    else {
                        this._view.btn_more.setHint(false);
                    }
                };
                return MainBottomMdr;
            }(game.EffectMdrBase));
            main.MainBottomMdr = MainBottomMdr;
            __reflect(MainBottomMdr.prototype, "game.mod.main.MainBottomMdr", ["base.UpdateItem"]);
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var ArrayCollection = eui.ArrayCollection;
            var facade = base.facade;
            var MainLeftMdr = /** @class */ (function (_super) {
                __extends(MainLeftMdr, _super);
                function MainLeftMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", main.MainLeftView);
                    return _this;
                }
                MainLeftMdr.prototype.onInit = function () {
                    var self = this;
                    self._view.left = 0;
                    self._view.bottom = 175;
                    self._view.touchEnabled = false;
                    self._btnPro = new ArrayCollection();
                    self._view.btn_list.dataProvider = self._btnPro;
                    self._view.btn_list.itemRenderer = main.MainLeftBtnView;
                    self._btnPro2 = new ArrayCollection();
                    self._view.btn_list2.dataProvider = self._btnPro2;
                    self._view.btn_list2.itemRenderer = main.MainLeftBtnView;
                    self._proxy = self.retProxy(3 /* Main */);
                    self._view.gr_list2.mask = self._view.img_rect;
                };
                MainLeftMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                };
                MainLeftMdr.prototype.onShow = function () {
                    facade.showView("27" /* Activity */, "02" /* MainLeftAct */); //todo，待删除
                    facade.showView("27" /* Activity */, "01" /* MainActivityList */); //todo，待删除
                    //facade.showView(ModName.Activity, MainActivityViewType.TestIcon);//todo，待删除
                    //.in.addResidentBtn(BtnIconId.powerTurntable);
                };
                MainLeftMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return MainLeftMdr;
            }(game.EffectMdrBase));
            main.MainLeftMdr = MainLeftMdr;
            __reflect(MainLeftMdr.prototype, "game.mod.main.MainLeftMdr");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var TouchEvent = egret.TouchEvent;
            var Tween = base.Tween;
            var facade = base.facade;
            var Handler = base.Handler;
            var Pool = base.Pool;
            var delayCall = base.delayCall;
            var MainMenuMdr = /** @class */ (function (_super) {
                __extends(MainMenuMdr, _super);
                function MainMenuMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", main.MainMenuView);
                    return _this;
                }
                MainMenuMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.bottom = 5;
                    this._view.horizontalCenter = 0;
                    this._proxy = this.retProxy(3 /* Main */);
                    this._bagProxy = facade.retMod("12" /* Bag */).retProxy(12 /* Bag */);
                    this._shenlingProxy = facade.retMod("45" /* Shenling */).retProxy(189 /* Shenling */);
                    this._view.img_bg.source = game.ResUtil.getUiPng("ui_png_BottomBg");
                    // 宗门红点位置修改
                    this._view.btn_shenling.redPoint.right = 8;
                    this._view.btn_shenling.redPoint.top = 7;
                    this._view.btn_shenling.img_bg.source = "btn_shenling_bg";
                    this._view.btn_shenling.img_bg.verticalCenter = 8;
                    this._view.btn_xianlu.img_bg.source = "xianludikuang";
                    this._view.btn_xianlu.img_bg.verticalCenter = 10;
                };
                MainMenuMdr.prototype.addListeners = function () {
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_xianlu, TouchEvent.TOUCH_TAP, this.onClickXianlu);
                    addEventListener(this._view.btn_role, TouchEvent.TOUCH_TAP, this.onClickRole);
                    addEventListener(this._view.btn_enhance, TouchEvent.TOUCH_TAP, this.onClickEnhance);
                    addEventListener(this._view.btn_bag, TouchEvent.TOUCH_TAP, this.onClickBag);
                    addEventListener(this._view.btn_surface, TouchEvent.TOUCH_TAP, this.onClickSurface);
                    addEventListener(this._view.btn_shenling, TouchEvent.TOUCH_TAP, this.onClickShenLing);
                    addEventListener(this._view.gr_shenlingtips, TouchEvent.TOUCH_TAP, this.onClickShenLing);
                    addEventListener(this._view.btn_xianfa, TouchEvent.TOUCH_TAP, this.onClickXianfa);
                    addEventListener(this._view.grp_tip, TouchEvent.TOUCH_TAP, this.onClickTip);
                    /********************新的监听事件*******************/
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                    this.onNt("on_bag_melt_tip" /* ON_BAG_MELT_TIP */, this.updateMeltTip, this);
                    this.onNt("on_role_privilege_update" /* ON_ROLE_PRIVILEGE_UPDATE */, this.onRolePrivilegeUpdate, this);
                    this.onNt("on_bag_update_by_prop_type" /* ON_BAG_UPDATE_BY_PROP_TYPE */, this.onBagUpdateByPropType, this);
                    this.onNt("on_guide_update" /* ON_GUIDE_UPDATE */, this.showGuide, this); //指引
                    this.onNt("on_icon_image_fly" /* ON_ICON_IMAGE_FLY */, this.onIconImageFly, this); //按钮飞动
                    this.onNt("on_update_punshlist_type" /* ON_UPDATE_PUNSHLIST_TYPE */, this.onUpdateBtn, this);
                    this.onNt("on_open_func_update" /* ON_OPEN_FUNC_UPDATE */, this.onOpenFuncUpdate, this); //功能开启
                    this.onNt("on_shen_ling_update_info" /* ON_SHEN_LING_UPDATE_INFO */, this.updateShenlingTips, this);
                    this.onNt("on_bag_update_by_prop_type_and_subtype" /* ON_BAG_UPDATE_BY_PROP_TYPE_AND_SUBTYPE */, this.onBagUpdateByPropTypeAndSubType, this);
                };
                MainMenuMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateBtn();
                    this.updateHint();
                    this.updateMeltTip();
                    this.autoUseBox();
                    this.showGuide();
                    this.updateShenlingTips();
                };
                MainMenuMdr.prototype.onHide = function () {
                    this.removeMeltTipTween();
                    mod.GuideMgr.getIns().clearGuide();
                    _super.prototype.onHide.call(this);
                };
                MainMenuMdr.prototype.onBagUpdateByPropTypeAndSubType = function (n) {
                    var list = n.body;
                    for (var type in list) {
                        if ((+type) == 11 /* Surface */) {
                            if (mod.ViewMgr.getIns().checkViewOpen(1041670102 /* Shenling */)) {
                                this.updateShenlingTips();
                            }
                            break;
                        }
                    }
                };
                MainMenuMdr.prototype.updateShenlingTips = function () {
                    var canAct = this._shenlingProxy.haveActType(false);
                    var canUp = this._shenlingProxy.haveUpStarType();
                    this._view.gr_shenlingtips.visible = canAct || canUp;
                    this._view.lb_shenlingtips.text = canAct ? game.getLanById("body_art1" /* body_art1 */) : (canUp ? '可升星' : '');
                };
                MainMenuMdr.prototype.onClickXianlu = function () {
                    mod.GuideMgr.getIns().clear(22 /* Xianlu */); //清除指引
                    mod.ViewMgr.getIns().showViewByID(1 /* Xianlu */);
                };
                MainMenuMdr.prototype.onClickSurface = function () {
                    mod.GuideMgr.getIns().clear(32 /* Yuling */); //清除指引
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670238 /* Yuling */, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showView("46" /* Surface */, "01" /* SurfaceMain */);
                };
                MainMenuMdr.prototype.onClickRole = function () {
                    mod.GuideMgr.getIns().clear(10 /* Role */); //清除指引
                    mod.ViewMgr.getIns().showViewByID(9 /* Role */);
                };
                MainMenuMdr.prototype.onClickEnhance = function () {
                    mod.ViewMgr.getIns().showViewByID(21 /* Strength */);
                };
                MainMenuMdr.prototype.onClickBag = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670097 /* Bag */, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showView("12" /* Bag */, "01" /* BagMain */);
                };
                MainMenuMdr.prototype.onClickXianfa = function () {
                    mod.GuideMgr.getIns().clear(17 /* Xianfa */); //清除指引
                    mod.ViewMgr.getIns().showViewByID(11 /* Xianfa */);
                };
                MainMenuMdr.prototype.onClickShenLing = function () {
                    mod.GuideMgr.getIns().clear(2 /* Shenling */); //清除指引
                    mod.ViewMgr.getIns().showViewByID(7 /* Shenling */);
                };
                /** 通用红点事件监听 */
                MainMenuMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    switch (data.node) {
                        case "41" /* Xianlu */:
                            this.updateXianluHint(data.value);
                            break;
                        case "06" /* Role */:
                            this.updateRoleHint(data.value);
                            break;
                        case "43" /* Enhance */:
                            this.updateEnhanceHint(data.value);
                            break;
                        case "12" /* Bag */:
                            this.updateBagHint(data.value);
                            break;
                        case "44" /* Xianfa */:
                            this.updateXianfaHint(data.value);
                            break;
                        case "45" /* Shenling */:
                            this.updateShenLingHint(data.value);
                            break;
                        case "46" /* Surface */:
                            this.updateSurfaceHint(data.value);
                            break;
                    }
                };
                /** 更新红点 */
                MainMenuMdr.prototype.updateHint = function () {
                    this.updateXianluHint(mod.HintMgr.getHint(["41" /* Xianlu */]));
                    this.updateRoleHint(mod.HintMgr.getHint(["06" /* Role */]));
                    this.updateEnhanceHint(mod.HintMgr.getHint(["43" /* Enhance */]));
                    this.updateBagHint(mod.HintMgr.getHint(["12" /* Bag */]));
                    this.updateXianfaHint(mod.HintMgr.getHint(["44" /* Xianfa */]));
                    this.updateShenLingHint(mod.HintMgr.getHint(["45" /* Shenling */]));
                    this.updateSurfaceHint(mod.HintMgr.getHint(["46" /* Surface */]));
                };
                /**功能开启刷新按钮*/
                MainMenuMdr.prototype.onOpenFuncUpdate = function (n) {
                    var addIdx = n.body;
                    var openIdxs = game.ActivityUtil.getOpenIdxs();
                    for (var _i = 0, openIdxs_1 = openIdxs; _i < openIdxs_1.length; _i++) {
                        var openIdx = openIdxs_1[_i];
                        if (addIdx.indexOf(openIdx) > -1) {
                            this.onUpdateBtn();
                            break;
                        }
                    }
                };
                MainMenuMdr.prototype.onUpdateBtn = function () {
                    var open = game.ActivityUtil.checkOpen();
                    this._view.btn_surface.setTag(game.ActivityUtil.checkSurfaceType() && open);
                    this._view.btn_role.setTag(game.ActivityUtil.checkRoleType() && open);
                    this._view.btn_shenling.setTag(game.ActivityUtil.getType() == 2002 /* Shenling */ && open);
                };
                /** 更新仙路红点 */
                MainMenuMdr.prototype.updateXianluHint = function (hint) {
                    this._view.btn_xianlu.redPoint.visible = hint;
                };
                /** 更新角色红点 */
                MainMenuMdr.prototype.updateRoleHint = function (hint) {
                    if (hint === void 0) { hint = false; }
                    this._view.btn_role.setHint(hint);
                };
                /** 更新强化红点 */
                MainMenuMdr.prototype.updateEnhanceHint = function (hint) {
                    if (hint === void 0) { hint = false; }
                    this._view.btn_enhance.setHint(hint);
                };
                /** 更新背包红点 */
                MainMenuMdr.prototype.updateBagHint = function (hint) {
                    this._view.btn_bag.redPoint.visible = hint;
                };
                /** 更新仙法红点 */
                MainMenuMdr.prototype.updateXianfaHint = function (hint) {
                    if (hint === void 0) { hint = false; }
                    this._view.btn_xianfa.setHint(hint);
                };
                /**神灵红点*/
                MainMenuMdr.prototype.updateShenLingHint = function (hint) {
                    if (hint === void 0) { hint = false; }
                    this._view.btn_shenling.setHint(hint);
                };
                /** 更新御灵红点 */
                MainMenuMdr.prototype.updateSurfaceHint = function (hint) {
                    this._view.btn_surface.redPoint.visible = hint;
                };
                //-------------------------------------背包特权相关------------------------------------------------
                /** 更新角色特权信息 */
                MainMenuMdr.prototype.onRolePrivilegeUpdate = function (n) {
                    var keys = n.body;
                    if (keys.indexOf("item_auto" /* item_auto */) >= 0) {
                        this.updateMeltTip();
                    }
                    if (keys.indexOf("bag_box" /* bag_box */) >= 0) {
                        this.autoUseBox();
                    }
                };
                MainMenuMdr.prototype.onBagUpdateByPropType = function (n) {
                    var types = n.body;
                    if (types.indexOf(3 /* Box */) < 0) {
                        return;
                    }
                    this.autoUseBox();
                };
                /** 熔炼提示 */
                MainMenuMdr.prototype.updateMeltTip = function () {
                    var meltTip = this._bagProxy.meltTip;
                    var hasPrivilege = mod.RoleUtil.hasPrivilege("item_auto" /* item_auto */); //自动熔炼特权
                    if (meltTip && hasPrivilege) {
                        this._bagProxy.clickMelt(); //自动熔炼
                    }
                    var isShow = meltTip && !hasPrivilege;
                    this._view.grp_tip.visible = isShow;
                    if (isShow) {
                        this._view.grp_tip.y = -21;
                        Tween.get(this._view.grp_tip, { loop: true })
                            .to({ y: 0 }, 500)
                            .to({ y: -21 }, 500);
                    }
                    else {
                        this.removeMeltTipTween();
                    }
                };
                MainMenuMdr.prototype.removeMeltTipTween = function () {
                    Tween.remove(this._view.grp_tip);
                };
                //点击熔炼提示，直接熔炼
                MainMenuMdr.prototype.onClickTip = function () {
                    this._bagProxy.clickMelt(); //熔炼
                };
                /**自动使用背包宝箱*/
                MainMenuMdr.prototype.autoUseBox = function () {
                    var _this = this;
                    var hasPrivilege = mod.RoleUtil.hasPrivilege("bag_box" /* bag_box */); //自动使用宝箱特权
                    if (hasPrivilege) {
                        delayCall(Handler.alloc(this, function () {
                            _this._bagProxy.autoUseBox(); //自动使用宝箱
                        }), 200);
                    }
                };
                //-------------------------------------背包特权相关------------------------------------------------
                //-------------------------------------指引相关------------------------------------------------
                MainMenuMdr.prototype.showGuide = function () {
                    mod.GuideMgr.getIns().show(2 /* Shenling */, this._view.btn_shenling, Handler.alloc(this, this.onClickShenLing)); //神灵指引
                    mod.GuideMgr.getIns().show(10 /* Role */, this._view.btn_role, Handler.alloc(this, this.onClickRole)); //角色指引
                    mod.GuideMgr.getIns().show(17 /* Xianfa */, this._view.btn_xianfa, Handler.alloc(this, this.onClickXianfa)); //仙法指引
                    mod.GuideMgr.getIns().show(22 /* Xianlu */, this._view.btn_xianlu, Handler.alloc(this, this.onClickXianlu)); //仙路指引
                    mod.GuideMgr.getIns().show(32 /* Yuling */, this._view.btn_surface, Handler.alloc(this, this.onClickSurface)); //御灵指引
                };
                //-------------------------------------按钮飞动------------------------------------------------
                MainMenuMdr.prototype.onIconImageFly = function (n) {
                    var info = n.body;
                    if (!info) {
                        return;
                    }
                    var type = info.type;
                    var btn = this.getMainBtn(type);
                    if (!btn) {
                        return;
                    }
                    var icon = Pool.alloc(game.BitmapBase);
                    icon.source = info.imgSource;
                    icon.width = info.imgWidth;
                    icon.height = info.imgHeight;
                    icon.anchorOffsetX = info.imgWidth / 2;
                    icon.anchorOffsetY = info.imgHeight / 2;
                    icon.x = info.startPosX + icon.anchorOffsetX;
                    icon.y = info.startPosY + icon.anchorOffsetY;
                    var layer = info.layer || game.Layer.tip;
                    layer.addChild(icon);
                    var targetPoint = btn.localToGlobal(); //转化全局坐标
                    var endPosX = targetPoint.x - layer.x + btn.width / 2; //需要减去对应layer的坐标
                    var endPosY = targetPoint.y - layer.y + btn.height / 2; //描点为中心
                    var time = info.time || 1000;
                    var handler = info.handler;
                    Tween.get(icon)
                        .to({ x: endPosX, y: endPosY }, time)
                        .to({ scaleX: 0, scaleY: 0 }, 200)
                        .exec(Handler.alloc(this, this.onIconImageFlyEnd, [icon, handler]));
                };
                MainMenuMdr.prototype.onIconImageFlyEnd = function (icon, handler) {
                    if (icon.parent) {
                        icon.parent.removeChild(icon);
                    }
                    Pool.release(icon);
                    if (handler) {
                        handler.exec();
                    }
                };
                MainMenuMdr.prototype.getMainBtn = function (type) {
                    switch (type) {
                        case 1 /* Xianfa */:
                            return this._view.btn_xianfa;
                    }
                    return null;
                };
                return MainMenuMdr;
            }(game.EffectMdrBase));
            main.MainMenuMdr = MainMenuMdr;
            __reflect(MainMenuMdr.prototype, "game.mod.main.MainMenuMdr");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var TouchEvent = egret.TouchEvent;
            var MainPreviewItemMdr = /** @class */ (function (_super) {
                __extends(MainPreviewItemMdr, _super);
                function MainPreviewItemMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", main.MainPreviewItemView);
                    return _this;
                }
                MainPreviewItemMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = game.getProxy("42" /* Pass */, 9 /* Pass */);
                    this._view.x = 580;
                    this._view.y = 400;
                };
                MainPreviewItemMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_preview, TouchEvent.TOUCH_TAP, this.onClickPreview);
                    this.onNt("update_main_pass_info" /* UPDATE_MAIN_PASS_INFO */, this.onUpdateView, this);
                };
                MainPreviewItemMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                MainPreviewItemMdr.prototype.onUpdateView = function () {
                    if (!this._proxy.onCheckMainShow()) {
                        this.hide();
                        return;
                    }
                    var index = this._proxy.getShowIndex();
                    this._view.btn_preview.icon = this._proxy.getIcon(index);
                    this._view.btn_preview.setHint(mod.HintMgr.getHint(["42" /* Pass */, "01" /* PassMain */ + "00" /* Main */, "17" /* Preview */]));
                    this._view.lab_limit.textFlow = game.TextUtil.parseHtml(this._proxy.getOpenTxt(index));
                };
                MainPreviewItemMdr.prototype.onClickPreview = function () {
                    // if(!ViewMgr.getIns().checkViewOpen(OpenIdx.Pass,true)){
                    //     return;
                    // }
                    mod.ViewMgr.getIns().showView("42" /* Pass */, "17" /* Preview */);
                };
                MainPreviewItemMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return MainPreviewItemMdr;
            }(game.MdrBase));
            main.MainPreviewItemMdr = MainPreviewItemMdr;
            __reflect(MainPreviewItemMdr.prototype, "game.mod.main.MainPreviewItemMdr");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var facade = base.facade;
            var Handler = base.Handler;
            var PropertyEvent = eui.PropertyEvent;
            var MainRightMdr = /** @class */ (function (_super) {
                __extends(MainRightMdr, _super);
                function MainRightMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", main.MainRightView);
                    /**入口手动赋值就行了，其他的不用管*/
                    _this._btnData = [
                        { icon: "main_right_btn_rc", openIdx: 1040180001 /* Daily */, viewDatas: ["48" /* Daily */, "01" /* DailyMain */] },
                        {
                            icon: "main_right_btn_jjc",
                            openIdx: 1041670107 /* Shilian */,
                            viewDatas: ["49" /* Shilian */, "01" /* ShilianMain */],
                            guideKey: 8 /* Shilian */
                        },
                        {
                            icon: "main_right_btn_boss",
                            openIdx: 1041670118 /* Boss */,
                            viewDatas: ["22" /* Boss */, "01" /* BossMain */],
                            guideKey: 12 /* Boss */
                        },
                        {
                            icon: "main_right_btn_compete",
                            openIdx: 1041670120 /* Compete */,
                            viewDatas: ["52" /* Compete */, "01" /* CompeteMain */],
                            guideKey: 20 /* Compete */
                        },
                        { icon: "main_right_btn_kf", openIdx: 1041670156 /* Yijie */, viewDatas: ["56" /* Yijie */, "01" /* YijieMain */] }
                    ];
                    return _this;
                }
                MainRightMdr.prototype.onInit = function () {
                    this._view.percentWidth = this._view.percentHeight = 100;
                    this._view.touchEnabled = false;
                    this._btnList = new ArrayCollection();
                    this._view.list_btn.itemRenderer = main.MainRightActivityRender;
                    this._view.list_btn.dataProvider = this._btnList;
                    this._dailyProxy = facade.retMod("48" /* Daily */).retProxy(193 /* Daily */);
                    this._bossProxy = game.getProxy("22" /* Boss */, 199 /* Boss */);
                };
                MainRightMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_btn, ItemTapEvent.ITEM_TAP, this.onTapBtn);
                    addEventListener(this._view.list_btn, PropertyEvent.PROPERTY_CHANGE, this.onListChange);
                    this.onNt("on_open_func_update" /* ON_OPEN_FUNC_UPDATE */, this.onOpenFuncUpdate, this); //功能开启
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this); //红点更新
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.onSceneChange, this); //场景切换
                    this.onNt("challenge_hangup_boss" /* CHALLENGE_HANGUP_BOSS */, this.updateShow, this); //挑战boss
                    this.onNt("on_guide_update" /* ON_GUIDE_UPDATE */, this.showGuide, this); //指引
                };
                MainRightMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateBtnList();
                    this.updateHint();
                    this.updateShow();
                    this.onUpdatePreview();
                    this.showGuide();
                    this._bossProxy.updateCrossBossTips();
                    this.onUpdateBossTips();
                };
                MainRightMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                MainRightMdr.prototype.onUpdateBossTips = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670237 /* Abyss */)) {
                        return;
                    }
                    this._bossProxy.onUpdateTips();
                };
                /**功能开启刷新按钮*/
                MainRightMdr.prototype.onOpenFuncUpdate = function (n) {
                    var addIdx = n.body;
                    for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                        var data = _a[_i];
                        if (addIdx.indexOf(data.openIdx) > -1) {
                            this.updateBtnList();
                            this.showGuide(); //功能开启时候，执行下指引，防止任务指引执行的时候功能还未开启
                            break;
                        }
                    }
                };
                /** 打开界面*/
                MainRightMdr.prototype.onTapBtn = function (e) {
                    var btnData = e.item;
                    this.onClickBtn(btnData);
                };
                MainRightMdr.prototype.onClickBtn = function (btnData) {
                    if (btnData.guideKey) {
                        mod.GuideMgr.getIns().clear(btnData.guideKey); //清除指引
                    }
                    if (btnData.openIdx && !mod.ViewMgr.getIns().checkViewOpen(btnData.openIdx, true)) {
                        return;
                    }
                    if (!btnData.viewDatas) {
                        return;
                    }
                    var modName = btnData.viewDatas[0];
                    var viewType = btnData.viewDatas[1];
                    mod.ViewMgr.getIns().showView(modName, viewType);
                };
                MainRightMdr.prototype.updateBtnList = function () {
                    var list = [];
                    for (var _i = 0, _a = this._btnData; _i < _a.length; _i++) {
                        var data = _a[_i];
                        if (data.openIdx && !mod.ViewMgr.getIns().checkBtnShow(data.openIdx)) {
                            continue;
                        }
                        list.push(data);
                    }
                    this._btnList.source = list;
                };
                MainRightMdr.prototype.onUpdatePreview = function () {
                    var proxy = game.getProxy("42" /* Pass */, 9 /* Pass */);
                    if (proxy.onCheckMainShow()) {
                        if (this._isShow) {
                            facade.showView("05" /* Main */, "42" /* Preview */);
                        }
                        else {
                            facade.hideView("05" /* Main */, "42" /* Preview */);
                        }
                    }
                };
                //----------------------------------------更新红点----------------------------------------
                /** 通用红点事件监听 */
                MainRightMdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    var list = this._btnList.source;
                    var len = list ? list.length : 0;
                    for (var i = 0; i < len; i++) {
                        var btnData = list[i];
                        if (!btnData.viewDatas) {
                            continue;
                        }
                        var type = btnData.viewDatas[0];
                        /**转化为红点类型*/
                        var hint = data.value;
                        if (type == "48" /* Daily */) {
                            if (type != data.node && !this._dailyProxy.isOtherHint(data.node)) {
                                //当前刷新的红点不是日常模块红点，且不是日常模块额外的子红点
                                continue;
                            }
                            var dailyHint = mod.HintMgr.getHint([type]); //日常模块红点
                            if (!dailyHint) {
                                //日常模块红点未激活，获取日常模块额外的子红点
                                dailyHint = this._dailyProxy.getOtherHint();
                            }
                            hint = dailyHint; //重新赋值红点
                        }
                        else if (type != data.node) {
                            continue;
                        }
                        if (!!btnData.showHint != hint) { //过滤undefined!=false
                            btnData.showHint = hint;
                            this._btnList.itemUpdated(btnData);
                        }
                        break; /**找到对应红点后则break，减少循环*/
                    }
                };
                MainRightMdr.prototype.updateHint = function () {
                    var list = this._btnList.source;
                    var len = list ? list.length : 0;
                    for (var i = 0; i < len; i++) {
                        var btnData = list[i];
                        if (!btnData.viewDatas) {
                            continue;
                        }
                        var type = btnData.viewDatas[0];
                        /**转化为红点类型*/
                        var hint = mod.HintMgr.getHint([type]);
                        if (!hint && type == "48" /* Daily */) {
                            hint = this._dailyProxy.getOtherHint();
                        }
                        if (!!btnData.showHint != hint) { //过滤undefined!=false
                            btnData.showHint = hint;
                            this._btnList.itemUpdated(btnData);
                        }
                    }
                };
                //----------------------------------------更新红点----------------------------------------
                //----------------------------------------切换场景 start----------------------------------------
                /** 切换场景 */
                MainRightMdr.prototype.onSceneChange = function () {
                    this.updateShow();
                };
                //----------------------------------------切换场景 end----------------------------------------
                //--------------------显示主界面-----------------------
                MainRightMdr.prototype.updateShow = function () {
                    var isShow = mod.SceneUtil.isShowMain();
                    this._isShow = isShow;
                    this._view.visible = isShow;
                    this.onUpdatePreview();
                    if (!isShow) {
                        this.clearGuide();
                    }
                };
                //-------------------------------------指引相关------------------------------------------------
                MainRightMdr.prototype.showGuide = function () {
                    if (!this._isShow) {
                        return;
                    }
                    var num = this._view.list_btn.numChildren;
                    if (!num) {
                        return;
                    }
                    var list = this._btnList.source;
                    var len = list ? list.length : 0;
                    for (var i = 0; i < len && i < num; i++) {
                        var btnData = list[i];
                        var btn = this._view.list_btn.getChildAt(i);
                        if (btnData.guideKey) {
                            mod.GuideMgr.getIns().show(btnData.guideKey, btn, Handler.alloc(this, this.onClickBtn, [btnData])); //指引
                        }
                    }
                };
                MainRightMdr.prototype.onListChange = function (e) {
                    if (e.property == "contentHeight") {
                        this.showGuide();
                    }
                };
                MainRightMdr.prototype.clearGuide = function () {
                    var list = this._btnList.source;
                    var len = list ? list.length : 0;
                    for (var i = 0; i < len; i++) {
                        var btnData = list[i];
                        if (btnData.guideKey) {
                            mod.GuideMgr.getIns().clear(btnData.guideKey); //清除指引
                        }
                    }
                };
                return MainRightMdr;
            }(game.EffectMdrBase));
            main.MainRightMdr = MainRightMdr;
            __reflect(MainRightMdr.prototype, "game.mod.main.MainRightMdr");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var Handler = base.Handler;
            var TouchEvent = egret.TouchEvent;
            var delayCall = base.delayCall;
            var clearDelay = base.clearDelay;
            var MainTopMdr = /** @class */ (function (_super) {
                __extends(MainTopMdr, _super);
                function MainTopMdr() {
                    var _this = _super.call(this, game.Layer.main) || this;
                    _this._view = _this.mark("_view", main.MainTopView);
                    return _this;
                }
                MainTopMdr.prototype.onInit = function () {
                    this._view.top = 0;
                    this._view.horizontalCenter = 0;
                    this._mainProxy = this.retProxy(3 /* Main */);
                    this._view.img_di.source = game.ResUtil.getUiPng("ui_png_topBg");
                    // this._view.img_exp.fillMode = egret.BitmapFillMode.REPEAT;
                };
                MainTopMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_role_update" /* ON_ROLE_UPDATE */, this.onRoleUpdate, this);
                    addEventListener(this._view.vipIcon, TouchEvent.TOUCH_TAP, this.onClickVip);
                    addEventListener(this._view.btn_rank, TouchEvent.TOUCH_TAP, this.onClickRank);
                    addEventListener(this._view.btn_stronger, TouchEvent.TOUCH_TAP, this.onClickStronger);
                    addEventListener(this._view.head_icon, TouchEvent.TOUCH_TAP, this.onClickHead);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.onSceneChange, this); //场景切换
                    this.onNt("challenge_hangup_boss" /* CHALLENGE_HANGUP_BOSS */, this.updateShow, this); //挑战boss
                    this.onNt("on_open_func_update" /* ON_OPEN_FUNC_UPDATE */, this.onOpenFuncUpdate, this); //功能开启
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onUpdateHint, this);
                };
                MainTopMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateLv();
                    this.updateCoin();
                    this.updatePower();
                    this.updateHead();
                    this.onVipUpdate();
                    this.onUpdateExp();
                    this.updateShow();
                    this.updateHint();
                    this.updateStronger();
                    this.updateRank();
                };
                MainTopMdr.prototype.onClickVip = function () {
                    mod.ViewMgr.getIns().openVipView();
                };
                MainTopMdr.prototype.onClickRank = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670189 /* Rank */, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showView("31" /* Rank */, "03" /* NewRankMain */);
                };
                MainTopMdr.prototype.updateRank = function () {
                    this._view.btn_rank.visible = mod.ViewMgr.getIns().checkBtnShow(1041670189 /* Rank */);
                };
                /**--------------------------我要变强*------------------————————————*/
                MainTopMdr.prototype.updateStronger = function () {
                    this._view.btn_stronger.visible = mod.ViewMgr.getIns().checkBtnShow(1041670190 /* Stronger */);
                };
                MainTopMdr.prototype.onClickStronger = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670190 /* Stronger */, true)) {
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("05" /* Main */, "40" /* Stronger */);
                };
                /**--------------------------我要变强*------------------————————————*/
                MainTopMdr.prototype.onClickHead = function () {
                    //todo
                    mod.ViewMgr.getIns().showSecondPop("54" /* Setting */, "01" /* SettingMain */, {});
                };
                /**更新等级显示*/
                MainTopMdr.prototype.updateLv = function () {
                    this._view.lb_level.text = "【" + mod.RoleUtil.getRebirthStr() + "】" + "Lv." + game.RoleVo.ins.level;
                };
                /**更新货币显示*/
                MainTopMdr.prototype.updateCoin = function () {
                    this._view.item1.setData(1450000002 /* Xianyu */);
                    this._view.item2.setData(1450000001 /* Yuanbao */);
                };
                MainTopMdr.prototype.updateHead = function () {
                    this._view.head_icon.updateMyHead();
                };
                MainTopMdr.prototype.onVipUpdate = function () {
                    this._view.vipIcon.setText(game.RoleVo.ins.vip_lv);
                };
                /** 更新角色信息 */
                MainTopMdr.prototype.onRoleUpdate = function (n) {
                    var keys = n.body;
                    var key1 = game.PropIndexToKey[this._view.item1.index];
                    if (keys.indexOf(key1) >= 0) {
                        this._view.item1.updateShow(true);
                    }
                    var key2 = game.PropIndexToKey[this._view.item2.index];
                    if (keys.indexOf(key2) >= 0) {
                        this._view.item2.updateShow(true);
                    }
                    if (keys.indexOf("level" /* level */) > -1 || keys.indexOf("reincarnate" /* reincarnate */) > -1) {
                        this.updateLv();
                    }
                    if (keys.indexOf("showpower" /* showpower */) > -1) {
                        var power = game.RoleVo.ins.showpower.toNumber();
                        if (power != this._oldPower) {
                            if (this._delayPower) {
                                clearDelay(this._delayPower);
                            }
                            this._delayPower = delayCall(Handler.alloc(this, this.updateShowPower), 400);
                        }
                    }
                    if (keys.indexOf("head" /* head */) > -1 || keys.indexOf("sex" /* sex */) > -1 || keys.indexOf("head_frame" /* head_frame */) > -1) {
                        this.updateHead();
                    }
                    if (keys.indexOf("vip_lv" /* vip_lv */) > -1) {
                        this.onVipUpdate();
                    }
                    if (keys.indexOf("exp" /* exp */) > -1 || keys.indexOf("levelup_exp" /* levelup_exp */) > -1) {
                        this.onUpdateExp();
                    }
                };
                /** 展示战力变化特效 */
                MainTopMdr.prototype.updateShowPower = function () {
                    this._delayPower = 0;
                    if (this._oldPower && game.RoleVo.ins.showpower.toNumber() > this._oldPower) {
                        this.showView("09" /* PowerChange */, this._oldPower);
                    }
                    this.updatePower();
                };
                /** 更新战力 */
                MainTopMdr.prototype.updatePower = function () {
                    var power = game.RoleVo.ins.showpower ? game.RoleVo.ins.showpower.toNumber() : 0;
                    if (power != this._oldPower) {
                        this._view.power.setPowerValue(game.RoleVo.ins.showpower);
                    }
                    this._oldPower = power;
                };
                MainTopMdr.prototype.onHide = function () {
                    this._oldPower = 0;
                    _super.prototype.onHide.call(this);
                };
                /**经验条*/
                MainTopMdr.prototype.onUpdateExp = function () {
                    this._view.expItem.updateExp();
                };
                //----------------------------------------切换场景 start----------------------------------------
                /** 切换场景 */
                MainTopMdr.prototype.onSceneChange = function () {
                    this.updateShow();
                };
                //----------------------------------------切换场景 end----------------------------------------
                //--------------------显示主界面-----------------------
                MainTopMdr.prototype.updateShow = function () {
                    var isShow = mod.SceneUtil.isShowMain();
                    this._view.visible = isShow;
                };
                /**更新红点*/
                MainTopMdr.prototype.updateHint = function () {
                    if (!this._view.visible) {
                        return;
                    }
                    this._view.vipIcon.setRedPoint(mod.HintMgr.getHint(["28" /* Vip */, "01" /* VipMain */]));
                    this._view.btn_rank.setHint(mod.HintMgr.getHint(["31" /* Rank */, "03" /* NewRankMain */]));
                };
                /**红点事件更新红点*/
                MainTopMdr.prototype.onUpdateHint = function (n) {
                    var data = n.body;
                    if (!data) {
                        return;
                    }
                    if (data.node == mod.HintMgr.getType(["28" /* Vip */, "01" /* VipMain */])) {
                        this._view.vipIcon.setRedPoint(data.value);
                    }
                    if (data.node == mod.HintMgr.getType(["31" /* Rank */, "03" /* NewRankMain */])) {
                        this._view.btn_rank.setHint(data.value);
                    }
                };
                /**功能开启刷新按钮*/
                MainTopMdr.prototype.onOpenFuncUpdate = function (n) {
                    var addIdx = n.body;
                    if (addIdx.indexOf(1041670190 /* Stronger */) > -1) {
                        this.updateStronger();
                    }
                    if (addIdx.indexOf(1041670189 /* Rank */) > -1) {
                        this.updateRank();
                    }
                };
                return MainTopMdr;
            }(game.EffectMdrBase));
            main.MainTopMdr = MainTopMdr;
            __reflect(MainTopMdr.prototype, "game.mod.main.MainTopMdr");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var facade = base.facade;
            var ArrayCollection = eui.ArrayCollection;
            var TimeMgr = base.TimeMgr;
            var Tween = base.Tween;
            var OfflineGain3Mdr = /** @class */ (function (_super) {
                __extends(OfflineGain3Mdr, _super);
                function OfflineGain3Mdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", main.OfflineGain3View);
                    _this.isEasyHide = true;
                    return _this;
                }
                OfflineGain3Mdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    var self = this;
                    self._view.horizontalCenter = 0;
                    self._view.verticalCenter = 0;
                    self._proxy = this.retProxy(3 /* Main */);
                    self._model = self._proxy.getmodel();
                    self._passProxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                    ;
                    self._rewards = new ArrayCollection();
                    self._view.list_award.itemRenderer = mod.Icon;
                    self._view.list_award.dataProvider = self._rewards;
                    this._startY = this._view.grp_item.y;
                };
                OfflineGain3Mdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_close, egret.TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn_vip, egret.TouchEvent.TOUCH_TAP, this.onVip);
                    addEventListener(this._view.btn_get, egret.TouchEvent.TOUCH_TAP, this.onGet);
                    addEventListener(this._view.btn_speed_up, egret.TouchEvent.TOUCH_TAP, this.onSpeedUp);
                    this.onNt("update_offline" /* UPDATE_OFFLINE */, this.updateView, this);
                    this.onNt("on_common_hint_update" /* ON_COMMON_HINT_UPDATE */, this.onHintUpdate, this);
                };
                OfflineGain3Mdr.prototype.onVip = function () {
                    mod.ViewMgr.getIns().openVipView();
                    this.hide();
                };
                OfflineGain3Mdr.prototype.onGet = function (e) {
                    if (this._model.offlineTotalTime < 60) {
                        game.PromptBox.getIns().show(game.getLanById("guaji_shouyi_tips06" /* guaji_shouyi_tips06 */));
                    }
                    else {
                        if (mod.BagUtil.checkBagFull()) {
                            return;
                        }
                        this._proxy.c2s_hangup_get_rwd(2);
                    }
                };
                OfflineGain3Mdr.prototype.onSpeedUp = function (e) {
                    if (this._model.speedUpCnt > 0) {
                        this._proxy.c2s_hangup_rate_rwd();
                    }
                    else {
                        //getLanById(LanDef.guaji_shouyi_tips07)
                        game.PromptBox.getIns().show(game.getLanById("guaji_shouyi_tips07" /* guaji_shouyi_tips07 */));
                    }
                };
                OfflineGain3Mdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.c2s_hangup_get_rwd(1);
                    this.playTween();
                    //this.updateView();
                };
                OfflineGain3Mdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    Tween.remove(this._view.grp_item);
                    this._view.btn_get.clearEffect();
                    _super.prototype.onHide.call(this);
                };
                OfflineGain3Mdr.prototype.update = function (time) {
                    var self = this;
                    var timeNum = self._model.offlineTotalTime;
                    var time1 = timeNum > self._model.offlineMaxtime ? self._model.offlineMaxtime : timeNum;
                    if (time1 < 0) {
                        return;
                    }
                    this._view.lab_time.textFlow = game.TextUtil.parseHtml("已挂机 " + game.TimeUtil.formatSecond(time1, "HH:mm:ss"));
                    if (timeNum > 60) {
                        //黄色
                        this._view.btn_get.setYellow();
                    }
                    else {
                        //置灰
                        this._view.btn_get.setDisabled();
                    }
                };
                OfflineGain3Mdr.prototype.updateReward = function () {
                    if (this._rewards.length) {
                        this._rewards.replaceAll(this._proxy.rewards);
                    }
                    else {
                        this._rewards.source = this._proxy.rewards;
                    }
                };
                OfflineGain3Mdr.prototype.updateView = function () {
                    var viplv = mod.VipUtil.getShowVipLv();
                    this._view.lab_vip_status.text = !!viplv ? "vip" + viplv : "未开通";
                    var pCfg = game.GameConfig.getParamConfigById("guaji_jiasu_time");
                    var speedStr = "立即获得" + game.TextUtil.addColor(pCfg.value[0][0] + "分钟", 2330156 /* GREEN */) + "收益";
                    this._view.lab_speed_up.textFlow = game.TextUtil.parseHtml(speedStr);
                    var isFree = this._model.speedUpCost <= 0 && this._model.speedUpCnt > 0;
                    var countStr = isFree ? game.getLanById("guaji_shouyi_tips04" /* guaji_shouyi_tips04 */)
                        : "今日剩余次数: " + game.TextUtil.addColor(this._model.speedUpCnt + "", 2330156 /* GREEN */);
                    this._view.lab_count.textFlow = game.TextUtil.parseHtml(countStr);
                    if (isFree || this._model.speedUpCnt <= 0) {
                        this._view.btn_speed_up.labelDisplay.text = isFree ? "免费加速" : "加速";
                        this._view.img_cost.source = null;
                        this._view.lab_cost.text = "";
                    }
                    else {
                        this._view.btn_speed_up.labelDisplay.text = "";
                        var cfg = game.GameConfig.getPropConfigById(1450000002 /* Xianyu */);
                        this._view.img_cost.source = cfg.icon;
                        this._view.lab_cost.text = this._model.speedUpCost + "加速";
                    }
                    this._view.btn_speed_up.redPoint.visible = isFree;
                    var bool = this._proxy.getOfflineHint();
                    this._view.btn_get.redPoint.visible = bool;
                    if (bool) {
                        this._view.btn_get.setEffect("tiaozhan" /* Tiaozhan */);
                    }
                    else {
                        this._view.btn_get.clearEffect();
                    }
                    var gateCfg = game.getConfigByNameId("gate1.json" /* Gate */, this._passProxy.curIndex);
                    if (gateCfg) {
                        // for (let i = 0; i < 5; i++) {
                        //     let item: OffLineGain3ItemView = this._view["item" + i];
                        //     item.setData(gateCfg.drop_show[i]);
                        // }
                        var count = gateCfg.drop_show.length;
                        if (count < 5) {
                            count = 5;
                        }
                        this._view.currentState = "" + (count < 5 ? 5 : count);
                        for (var i = 0; i < count; i++) {
                            var drop_show = gateCfg.drop_show[i];
                            var item = this._view["item" + i];
                            item.visible = !!drop_show;
                            item.setData(drop_show);
                        }
                    }
                    this.updateReward();
                    this.update(null);
                    TimeMgr.addUpdateItem(this, 1000);
                };
                OfflineGain3Mdr.prototype.playTween = function () {
                    var target = this._view.grp_item;
                    target.y = this._startY;
                    Tween.get(target, { loop: true })
                        .to({ y: this._startY + 15 }, 1500)
                        .to({ y: this._startY }, 1500);
                };
                OfflineGain3Mdr.prototype.onHintUpdate = function (n) {
                    var data = n.body;
                    if (data.node == mod.HintMgr.getType(this._model.offlineHint)) {
                        this._view.btn_get.setHint(data.value);
                    }
                };
                return OfflineGain3Mdr;
            }(game.MdrBase));
            main.OfflineGain3Mdr = OfflineGain3Mdr;
            __reflect(OfflineGain3Mdr.prototype, "game.mod.main.OfflineGain3Mdr");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var gmMdr = /** @class */ (function (_super) {
                __extends(gmMdr, _super);
                function gmMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", main.gmView);
                    _this.isEasyHide = true;
                    return _this;
                }
                gmMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                };
                gmMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEvent = this.onEgret.bind(this);
                    addEvent(this._view.btn0, TouchEvent.TOUCH_TAP, this.onClick);
                    addEvent(this._view.btn1, TouchEvent.TOUCH_TAP, this.onClick);
                    addEvent(this._view.btn2, TouchEvent.TOUCH_TAP, this.onClick);
                    addEvent(this._view.btn3, TouchEvent.TOUCH_TAP, this.onClick);
                    addEvent(this._view.btn4, TouchEvent.TOUCH_TAP, this.onClick);
                    addEvent(this._view.btn5, TouchEvent.TOUCH_TAP, this.onClick);
                    addEvent(this._view.btn6, TouchEvent.TOUCH_TAP, this.onClick);
                    addEvent(this._view.btn7, TouchEvent.TOUCH_TAP, this.onClick);
                    addEvent(this._view.check_0, TouchEvent.TOUCH_TAP, this.onClick);
                    addEvent(this._view.check_1, TouchEvent.TOUCH_TAP, this.onClick);
                    addEvent(this._view.check_2, TouchEvent.TOUCH_TAP, this.onClick);
                    addEvent(this._view.check_3, TouchEvent.TOUCH_TAP, this.onClick);
                };
                gmMdr.prototype.onClick = function (e) {
                    var self = this;
                    var miscProxy = facade.retMod("04" /* Misc */).retProxy(4 /* Misc */);
                    var content = "";
                    switch (e.currentTarget) {
                        case self._view.btn0:
                            if (this._view.txt0.text == "") {
                                game.PromptBox.getIns().show("请输入充值id");
                                return;
                            }
                            content = "$charge " + this._view.txt0.text;
                            miscProxy.sendGM(content);
                            break;
                        case self._view.btn1:
                            if (this._view.txt1.text == "") {
                                game.PromptBox.getIns().show("请输入物品id或名字 及数量");
                                return;
                            }
                            content = "$addprop " + self._view.txt1.text;
                            miscProxy.sendGM(content);
                            break;
                        case self._view.btn2:
                            content = "$set_time " + this._view.txt2.text;
                            miscProxy.sendGM(content);
                            break;
                        case self._view.btn3:
                            var lv = "第" + this._view.txt3.text + "关";
                            var passCfg = game.getConfigByName("gate1.json" /* Gate */);
                            var num = 0;
                            if (!passCfg)
                                return;
                            for (var key in passCfg) {
                                var item = passCfg[key];
                                if (item["gate_name"] == lv) {
                                    num = Number(key);
                                    break;
                                }
                            }
                            if (num > 0) {
                                var index = num - 240000000;
                                content = "$jump_stage " + index;
                                miscProxy.sendGM(content);
                            }
                            break;
                        case self._view.btn4:
                            content = "$setrlv " + this._view.txt4.text;
                            miscProxy.sendGM(content);
                            break;
                        case self._view.btn5:
                            content = "$funcopen";
                            miscProxy.sendGM(content);
                            break;
                        case self._view.btn6:
                            if (this._view.txt6.text == "") {
                                game.PromptBox.getIns().show("请输入命令");
                                return;
                            }
                            content = this._view.txt6.text;
                            miscProxy.sendGM(content);
                            break;
                        case self._view.btn7:
                            content = "$clearbag";
                            miscProxy.sendGM(content);
                            break;
                        case self._view.check_0:
                            // let t_proxy: ITaskProxy = facade.retMod(ModName.Task).retProxy(ProxyType.Task);
                            // t_proxy.stopMainTaskFlag = this._view.check_0.selected;
                            // gso.isAutoTask = !t_proxy.stopMainTaskFlag;
                            // PromptBox.getIns().show(t_proxy.stopMainTaskFlag ? "关闭自动任务" : "开启自动任务");
                            break;
                        case self._view.check_1:
                            var num2 = Number(this._view.txt5.text);
                            gso.dbg_add_prop = this._view.check_1.selected ? num2 : 0;
                            game.PromptBox.getIns().show("添加道具数：" + gso.dbg_add_prop);
                            break;
                        case self._view.check_2:
                            gso.dbg_mdr_path = this._view.check_2.selected;
                            game.PromptBox.getIns().show("功能路径打印：" + (gso.dbg_mdr_path ? "开启" : "关闭"));
                            break;
                        case self._view.check_3:
                            gso.dbg_HandUp = this._view.check_3.selected;
                            game.PromptBox.getIns().show("Ai挂机功能：" + (!gso.dbg_HandUp ? "开启" : "关闭"));
                            break;
                    }
                };
                gmMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.check_1.selected = gso.dbg_add_prop > 0;
                    this._view.check_2.selected = gso.dbg_mdr_path;
                    this._view.check_0.selected = !gso.isAutoTask;
                    this._view.check_3.selected = gso.dbg_HandUp;
                    this._view.txt_day.text = "当前开服天数：" + mod.RoleUtil.getServerDay();
                    this._view.txt_time.text = "服务器开启时间：" + game.TimeUtil.formatTimeSecond(game.RoleVo.ins.server_open_date) + "\n" + game.TimeUtil.getServerTime();
                };
                gmMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return gmMdr;
            }(game.MdrBase));
            main.gmMdr = gmMdr;
            __reflect(gmMdr.prototype, "game.mod.main.gmMdr");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var RewardFindMainMdr = /** @class */ (function (_super) {
                __extends(RewardFindMainMdr, _super);
                function RewardFindMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* TabBtnType01 */,
                            icon: "reward_find_tab",
                            mdr: main.RewardFindMdr,
                            title: "reward_find_tips" /* reward_find_tips */,
                            hintTypes: ["05" /* Main */, "41" /* RewardFindMain */, "01" /* TabBtnType01 */]
                        }
                    ];
                    return _this;
                }
                RewardFindMainMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(3 /* Main */);
                };
                RewardFindMainMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    this.onNt("on_reward_find_update" /* ON_REWARD_FIND_UPDATE */, this.onInfoUpdate, this);
                };
                RewardFindMainMdr.prototype.onInfoUpdate = function () {
                    var isShow = this._proxy.isFindShow();
                    if (!isShow) {
                        mod.ViewMgr.getIns().showMain();
                    }
                };
                return RewardFindMainMdr;
            }(mod.WndBaseMdr));
            main.RewardFindMainMdr = RewardFindMainMdr;
            __reflect(RewardFindMainMdr.prototype, "game.mod.main.RewardFindMainMdr");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var RewardFindMdr = /** @class */ (function (_super) {
                __extends(RewardFindMdr, _super);
                function RewardFindMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", main.RewardFindView);
                    return _this;
                }
                RewardFindMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = main.RewardFindItem;
                    this._view.list_item.dataProvider = this._itemList;
                    this._proxy = this.retProxy(3 /* Main */);
                };
                RewardFindMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_find, TouchEvent.TOUCH_TAP, this.onClickFind);
                    addEventListener(this._view.btn_vipFind, TouchEvent.TOUCH_TAP, this.onClickVipFind);
                    this.onNt("on_reward_find_update" /* ON_REWARD_FIND_UPDATE */, this.updateItemList, this);
                };
                RewardFindMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initShow();
                    this.updateItemList();
                };
                RewardFindMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                RewardFindMdr.prototype.onClickFind = function () {
                    this._proxy.c2s_reward_find_draw();
                };
                RewardFindMdr.prototype.onClickVipFind = function () {
                    if (!this._isVip) {
                        mod.ViewMgr.getIns().openVipView();
                        return;
                    }
                    this._proxy.c2s_reward_find_draw();
                };
                RewardFindMdr.prototype.initShow = function () {
                    var tipsStr = game.getLanById("reward_find_tips2" /* reward_find_tips2 */);
                    this._view.lab_tips.text = tipsStr;
                    var cfg1 = game.GameConfig.getParamConfigById("reward_find_vip");
                    var info1 = cfg1.value;
                    var limitVip = info1[0]; //VIP等级
                    var vipFindVal = info1[1]; //VIP找回百分比
                    var vipLv = mod.VipUtil.getShowVipLv();
                    var isVip = vipLv >= limitVip;
                    this._isVip = isVip;
                    this._view.currentState = isVip ? "vip" : "default";
                    this._view.lab_vipFind.text = vipFindVal + "%"; //80%
                    this._view.btn_vipFind.labelDisplay.text = "VIP" + limitVip + "找回";
                    this._view.btn_vipFind.redPoint.visible = true;
                    if (!isVip) {
                        var cfg2 = game.GameConfig.getParamConfigById("reward_find_free");
                        var findVal = cfg2.value;
                        this._view.lab_find.text = findVal + "%"; //50%
                        this._view.btn_find.redPoint.visible = true;
                    }
                };
                RewardFindMdr.prototype.updateItemList = function () {
                    var infos = this._proxy.findInfos;
                    this._itemList.source = infos;
                };
                return RewardFindMdr;
            }(game.MdrBase));
            main.RewardFindMdr = RewardFindMdr;
            __reflect(RewardFindMdr.prototype, "game.mod.main.RewardFindMdr");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var StrongerMdr = /** @class */ (function (_super) {
                __extends(StrongerMdr, _super);
                function StrongerMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", main.StrongerView);
                    _this.isEasyHide = true;
                    return _this;
                }
                StrongerMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = main.StrongerItem;
                    this._view.list_item.dataProvider = this._itemList;
                    this._typeList = new ArrayCollection();
                    this._view.list_type.itemRenderer = mod.TabSecondItem;
                    this._view.list_type.dataProvider = this._typeList;
                };
                StrongerMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.list_type, ItemTapEvent.ITEM_TAP, this.onClickType);
                };
                StrongerMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._selIndex = 0;
                    this.initTypeList();
                    this.updateItemList();
                };
                StrongerMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                StrongerMdr.prototype.onClickType = function (e) {
                    var index = e.itemIndex;
                    if (index == this._selIndex) {
                        return;
                    }
                    this._selIndex = index;
                    this.updateItemList();
                };
                StrongerMdr.prototype.initTypeList = function () {
                    var typeDatas = [];
                    var type = 1;
                    while (type) {
                        var cfgs = game.getConfigByNameId("stronger.json" /* Stronger */, type);
                        if (!cfgs) {
                            break;
                        }
                        var icon = "stronger_type" + type;
                        typeDatas.push({ icon: icon });
                        type++;
                    }
                    this._typeList.source = typeDatas;
                    this._view.list_type.selectedIndex = this._selIndex;
                };
                StrongerMdr.prototype.updateItemList = function () {
                    this._view.scr.stopAnimation();
                    var type = this._selIndex + 1;
                    var cfgs = game.getConfigByNameId("stronger.json" /* Stronger */, type);
                    var infos = [];
                    for (var k in cfgs) {
                        var cfg = cfgs[k];
                        infos.push(cfg);
                    }
                    this._itemList.source = infos;
                };
                return StrongerMdr;
            }(game.EffectMdrBase));
            main.StrongerMdr = StrongerMdr;
            __reflect(StrongerMdr.prototype, "game.mod.main.StrongerMdr");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var TouchEvent = egret.TouchEvent;
            var AlertMdr = /** @class */ (function (_super) {
                __extends(AlertMdr, _super);
                function AlertMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", main.AlertView);
                    return _this;
                }
                AlertMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._proxy = this.retProxy(3 /* Main */);
                };
                AlertMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.onClickCancel);
                    addEventListener(this._view.btn_cancel, TouchEvent.TOUCH_TAP, this.onClickCancel);
                    addEventListener(this._view.btn_confirm, TouchEvent.TOUCH_TAP, this.onClickConfirm);
                    this.onNt("scene_change" /* SCENE_CHANGE */, this.onSceneChange, this);
                };
                AlertMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.updateView();
                };
                AlertMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                AlertMdr.prototype.onClickCancel = function () {
                    this.execAndHide(this._cancel);
                };
                AlertMdr.prototype.onClickConfirm = function () {
                    this.execAndHide(this._showArgs && this._showArgs.confirm);
                    //确定的时候，判断是否勾选，保存变量
                    if (this._type) {
                        var isSel = this._view.checkbox.selected; //是否选中
                        this._proxy.setNotTipsType(this._type, isSel);
                    }
                };
                AlertMdr.prototype.execAndHide = function (handler) {
                    if (handler) {
                        handler.exec();
                    }
                    this.hide();
                };
                AlertMdr.prototype.updateView = function () {
                    this._view.currentState = this._showArgs.currentState;
                    this._view.lab_tips.textFlow = game.TextUtil.parseHtml(this._showArgs.content);
                    this._cancel = this._showArgs && this._showArgs.cancel;
                    this._type = this._showArgs && this._showArgs.type;
                    if (this._view.checkbox) {
                        this._view.checkbox.selected = true; //默认勾选状态
                    }
                };
                //场景变化关闭界面处理
                AlertMdr.prototype.onSceneChange = function () {
                    if (this._showArgs && this._showArgs.changeHide) {
                        this.hide();
                    }
                };
                return AlertMdr;
            }(game.MdrBase));
            main.AlertMdr = AlertMdr;
            __reflect(AlertMdr.prototype, "game.mod.main.AlertMdr");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var BoxRewardMdr = /** @class */ (function (_super) {
                __extends(BoxRewardMdr, _super);
                function BoxRewardMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", main.BoxRewardView);
                    _this.isEasyHide = true;
                    return _this;
                }
                BoxRewardMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                    this._rewardDatas = new ArrayCollection();
                    this._view.list_reward.itemRenderer = mod.Icon;
                    this._view.list_reward.dataProvider = this._rewardDatas;
                };
                BoxRewardMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_ok, TouchEvent.TOUCH_TAP, this.btnOkFunc);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                };
                BoxRewardMdr.prototype.btnOkFunc = function () {
                    this._okFunc && this._okFunc.exec();
                    this.hide();
                };
                BoxRewardMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    if (this._showArgs.title) {
                        this._view.secondPop.updateTitleStr(this._showArgs.title);
                    }
                    this.onUpdateView();
                };
                BoxRewardMdr.prototype.onHide = function () {
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                BoxRewardMdr.prototype.onUpdateView = function () {
                    var len = this._showArgs.reward.length;
                    this._okFunc = this._showArgs.okFunc;
                    var layout = this._view.list_reward.layout;
                    layout.requestedColumnCount = len > 5 ? 5 : len;
                    this._rewardDatas.source = this._showArgs.reward;
                    this._view.lab_tip.textFlow = game.TextUtil.parseHtml(this._showArgs.tips);
                    if (this._showArgs.tips1) {
                        this._view.btn_ok.label = "扫荡";
                        this._view.lab_tip1.textFlow = game.TextUtil.parseHtml(this._showArgs.tips1);
                    }
                    if (this._showArgs.btnStr) {
                        this._view.btn_ok.label = this._showArgs.btnStr;
                    }
                    if (this._showArgs.time) {
                        this._view.btn_ok.visible = false;
                        this._view.lab_time.visible = true;
                        TimeMgr.addUpdateItem(this, 1000);
                        this.onUpdateTime();
                    }
                    else if (this._showArgs.btnTips) {
                        this._view.btn_ok.visible = false;
                        this._view.lab_time.visible = true;
                        this._view.lab_time.textFlow = game.TextUtil.parseHtml(this._showArgs.btnTips);
                    }
                    else {
                        this._view.btn_ok.visible = true;
                        this._view.lab_time.visible = false;
                    }
                };
                BoxRewardMdr.prototype.update = function (time) {
                    this.onUpdateTime();
                };
                BoxRewardMdr.prototype.onUpdateTime = function () {
                    var leftTime = this._showArgs.time - TimeMgr.time.serverTimeSecond;
                    if (leftTime <= 0) {
                        this._showArgs.time = 0;
                        this.onUpdateView();
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    this._view.lab_time.text = game.TimeUtil.formatSecond(leftTime, 'HH时MM分ss秒', true) + this._showArgs.timeTips;
                };
                return BoxRewardMdr;
            }(game.MdrBase));
            main.BoxRewardMdr = BoxRewardMdr;
            __reflect(BoxRewardMdr.prototype, "game.mod.main.BoxRewardMdr", ["base.UpdateItem"]);
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var TouchEvent = egret.TouchEvent;
            var BuyTimesMdr = /** @class */ (function (_super) {
                __extends(BuyTimesMdr, _super);
                function BuyTimesMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", main.BuyTimesView);
                    _this.isEasyHide = true;
                    return _this;
                }
                BuyTimesMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.verticalCenter = 0;
                    this._view.horizontalCenter = 0;
                };
                BuyTimesMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.secondPop.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.btn_subtract10, TouchEvent.TOUCH_TAP, this.onClickSubtract10);
                    addEventListener(this._view.btn_subtract, TouchEvent.TOUCH_TAP, this.onClickSubtract);
                    addEventListener(this._view.btn_add10, TouchEvent.TOUCH_TAP, this.onClickAdd10);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    addEventListener(this._view.btn_ok, TouchEvent.TOUCH_TAP, this.onOkClick);
                };
                BuyTimesMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._curCnt = this.getMaxCnt(); //默认最大次数
                    this.updateNum();
                };
                BuyTimesMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                BuyTimesMdr.prototype.onClickSubtract10 = function () {
                    this.delNum(10);
                };
                BuyTimesMdr.prototype.onClickSubtract = function () {
                    this.delNum(1);
                };
                BuyTimesMdr.prototype.delNum = function (num) {
                    this._curCnt = Math.max(1, this._curCnt - num);
                    this.updateNum();
                };
                BuyTimesMdr.prototype.onClickAdd10 = function () {
                    this.addNum(10);
                };
                BuyTimesMdr.prototype.onClickAdd = function () {
                    this.addNum(1);
                };
                BuyTimesMdr.prototype.addNum = function (num) {
                    var maxCnt = this.getMaxCnt();
                    if (this._curCnt >= maxCnt) {
                        game.PromptBox.getIns().show(game.getLanById("max_buy_tips" /* max_buy_tips */));
                        return;
                    }
                    this._curCnt = Math.min(maxCnt, this._curCnt + num);
                    this.updateNum();
                };
                //当前最大可购买次数
                BuyTimesMdr.prototype.getMaxCnt = function () {
                    var cnt = this._showArgs.cnt;
                    var maxBuyCnt = this._showArgs.maxBuyCnt;
                    return Math.max(Math.min(cnt, maxBuyCnt), 1);
                };
                BuyTimesMdr.prototype.onOkClick = function (evt) {
                    this._showArgs.handler.exec([this._curCnt]);
                    this.hide();
                };
                BuyTimesMdr.prototype.updateNum = function () {
                    this._view.lbl_num.text = this._curCnt + "";
                    //"是否花费%s购买%s次游历挑战次数？";
                    var tips = this._showArgs.tips;
                    var cost = this._showArgs.cost;
                    var cnt = this._showArgs.cnt;
                    var maxCnt = this._showArgs.maxCnt;
                    var idx = cost[0];
                    var costCnt = cost[1];
                    var cfg = game.GameConfig.getPropConfigById(idx);
                    var totalCost = this._curCnt * costCnt;
                    var tip1 = game.TextUtil.addColor(totalCost + "", 2330156 /* GREEN */) + cfg.name;
                    var tip2 = game.TextUtil.addColor(this._curCnt + "", 2330156 /* GREEN */);
                    tips = game.StringUtil.substitute(tips, [tip1, tip2]);
                    tips += "\n今日剩余购买次数" + game.TextUtil.addColor("(" + cnt + "/" + maxCnt + ")", 2330156 /* GREEN */);
                    this._view.lab_tip.textFlow = game.TextUtil.parseHtml(tips);
                };
                return BuyTimesMdr;
            }(game.MdrBase));
            main.BuyTimesMdr = BuyTimesMdr;
            __reflect(BuyTimesMdr.prototype, "game.mod.main.BuyTimesMdr");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var Handler = base.Handler;
            var Tween = base.Tween;
            var TimeMgr = base.TimeMgr;
            var Quint = base.Quint;
            var Elastic = base.Elastic;
            var PowerChangeMdr = /** @class */ (function (_super) {
                __extends(PowerChangeMdr, _super);
                function PowerChangeMdr() {
                    var _this = _super.call(this, game.Layer.tip) || this;
                    _this._view = _this.mark("_view", main.PowerChange);
                    return _this;
                }
                PowerChangeMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.horizontalCenter = 0;
                    this._view.bottom = 302;
                    this._view.touchEnabled = false;
                    this._view.touchChildren = false;
                };
                PowerChangeMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initPower();
                    this.showViewTween();
                    this.showEffect();
                };
                PowerChangeMdr.prototype.onHide = function () {
                    this.removeFont();
                    this.removeViewTween();
                    this.removeAddTween();
                    this.removeEft();
                    _super.prototype.onHide.call(this);
                };
                PowerChangeMdr.prototype.initPower = function () {
                    this._curPower = this._showArgs;
                    this._endPower = game.RoleVo.ins.showpower.toNumber();
                    this._addPower = this._endPower - this._curPower;
                    var curPowerStr = this._curPower + "";
                    var addPowerStr = this._addPower + "";
                    var addWidth = (addPowerStr.length + 1) * 31;
                    this._view.grp_add.width = addWidth;
                    this._view.grp_add.anchorOffsetX = addWidth / 2;
                    this._view.grp_add.x = this._view.grp_cur.x + curPowerStr.length * 35 - addWidth / 2;
                    this._view.grp_cur.visible = false;
                    this._view.grp_add.visible = false;
                    this.addBmpFont(curPowerStr, game.BmpTextCfg[202 /* PowerAdd1 */], this._view.grp_cur);
                    this.addBmpFont("+" + addPowerStr, game.BmpTextCfg[203 /* PowerAdd2 */], this._view.grp_add);
                };
                PowerChangeMdr.prototype.removeFont = function () {
                    this._view.grp_cur.removeChildren();
                    this._view.grp_add.removeChildren();
                };
                PowerChangeMdr.prototype.showViewTween = function () {
                    var _this = this;
                    this.removeViewTween();
                    this._showing = true;
                    this._view.grp_show.scaleX = this._view.grp_show.scaleY = 0.5;
                    Tween.get(this._view.grp_show)
                        .to({ scaleX: 1, scaleY: 1 }, 200, null, Quint.easeIn)
                        .exec(Handler.alloc(this, function () {
                        _this.showAddTween();
                        _this._view.grp_cur.visible = true;
                        _this._perAdd = Math.max(Math.floor(_this._addPower / 100), 1);
                        TimeMgr.addUpdateItem(_this, 15);
                    }));
                };
                PowerChangeMdr.prototype.removeViewTween = function () {
                    Tween.remove(this._view);
                };
                PowerChangeMdr.prototype.showAddTween = function () {
                    var _this = this;
                    this.removeAddTween();
                    this._view.grp_add.visible = true;
                    this._view.grp_add.y = 20;
                    this._view.grp_add.alpha = 1;
                    this._view.grp_add.scaleX = this._view.grp_add.scaleY = 3;
                    Tween.get(this._view.grp_add)
                        .to({ scaleX: 1, scaleY: 1 }, 200, null, Elastic.easeOut)
                        .delay(1000)
                        .to({ y: -10, alpha: 0 }, 300)
                        .exec(Handler.alloc(this, function () {
                        _this.checkHide();
                        _this._showing = false;
                    }));
                };
                PowerChangeMdr.prototype.removeAddTween = function () {
                    Tween.remove(this._view.grp_add);
                };
                PowerChangeMdr.prototype.update = function (time) {
                    this.showPowerTween();
                };
                PowerChangeMdr.prototype.showPowerTween = function () {
                    this._curPower = Math.min(this._curPower + this._perAdd, this._endPower);
                    this.addBmpFont(this._curPower + "", game.BmpTextCfg[202 /* PowerAdd1 */], this._view.grp_cur);
                    if (this._curPower >= this._endPower) {
                        TimeMgr.removeUpdateItem(this);
                        this.checkHide();
                        this._showing = false;
                    }
                };
                PowerChangeMdr.prototype.checkHide = function () {
                    if (this._showing) {
                        return;
                    }
                    this.hide();
                };
                PowerChangeMdr.prototype.showEffect = function () {
                    this.removeEft();
                    this.addEftByParent("showpower" /* Showpower */, this._view.grp_eft, 0, 0, 0, null, 1);
                };
                return PowerChangeMdr;
            }(game.EffectMdrBase));
            main.PowerChangeMdr = PowerChangeMdr;
            __reflect(PowerChangeMdr.prototype, "game.mod.main.PowerChangeMdr", ["base.UpdateItem"]);
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var main;
        (function (main) {
            var Handler = base.Handler;
            var Tween = base.Tween;
            var SuccessTipsMdr = /** @class */ (function (_super) {
                __extends(SuccessTipsMdr, _super);
                function SuccessTipsMdr() {
                    var _this = _super.call(this, game.Layer.tip) || this;
                    _this._view = _this.mark("_view", main.SuccessTipsView);
                    return _this;
                }
                SuccessTipsMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._view.horizontalCenter = 0;
                    this._view.verticalCenter = 0;
                };
                SuccessTipsMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.showTween();
                    this.showEffect();
                };
                SuccessTipsMdr.prototype.onHide = function () {
                    this.removeTween();
                    _super.prototype.onHide.call(this);
                };
                SuccessTipsMdr.prototype.showTween = function () {
                    var _this = this;
                    this.removeTween();
                    this._view.img_type.source = "success_tips_" + this._showArgs;
                    this._view.img_type.verticalCenter = 0;
                    this._view.img_type.scaleX = this._view.img_type.scaleY = 7;
                    this._view.img_type.alpha = 1;
                    Tween.get(this._view.img_type)
                        .to({ scaleX: 1.7, scaleY: 1.7 }, 200)
                        .delay(800)
                        .to({ verticalCenter: -80, alpha: 0 }, 300)
                        .exec(Handler.alloc(this, function () {
                        _this.hide();
                    }));
                };
                SuccessTipsMdr.prototype.removeTween = function () {
                    Tween.remove(this._view.img_type);
                };
                SuccessTipsMdr.prototype.showEffect = function () {
                    this.removeEft();
                    this.addEftByParent("success" /* Success */, this._view.grp_eft, 0, 0, 0, null, 1);
                };
                return SuccessTipsMdr;
            }(game.EffectMdrBase));
            main.SuccessTipsMdr = SuccessTipsMdr;
            __reflect(SuccessTipsMdr.prototype, "game.mod.main.SuccessTipsMdr");
        })(main = mod.main || (mod.main = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=main.js.map