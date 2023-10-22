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
        var friend;
        (function (friend) {
            var FriendRecommendView = /** @class */ (function (_super) {
                __extends(FriendRecommendView, _super);
                function FriendRecommendView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.friend.FriendRecommendSkin";
                    return _this;
                }
                return FriendRecommendView;
            }(eui.Component));
            friend.FriendRecommendView = FriendRecommendView;
            __reflect(FriendRecommendView.prototype, "game.mod.friend.FriendRecommendView");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var FriendMod = /** @class */ (function (_super) {
                __extends(FriendMod, _super);
                function FriendMod() {
                    return _super.call(this, "59" /* Friend */) || this;
                }
                FriendMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                };
                FriendMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(231 /* Friend */, friend.FriendProxy);
                };
                FriendMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    this.regMdr("01" /* FriendMain */, friend.FriendMainMdr);
                    this.regMdr("02" /* FriendGift */, friend.FriendGiftMdr);
                    this.regMdr("03" /* FriendCheck */, friend.FriendCheckMdr);
                    this.regMdr("04" /* FriendResult */, friend.FriendResultMdr);
                };
                return FriendMod;
            }(game.ModBase));
            friend.FriendMod = FriendMod;
            __reflect(FriendMod.prototype, "game.mod.friend.FriendMod");
            gso.modCls.push(FriendMod);
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var c2s_friend_list = msg.c2s_friend_list;
            var s2c_friend_list = msg.s2c_friend_list;
            var c2s_change_recommond_friend = msg.c2s_change_recommond_friend;
            var c2s_friend_apply = msg.c2s_friend_apply;
            var c2s_friend_delete = msg.c2s_friend_delete;
            var c2s_friend_give_gift = msg.c2s_friend_give_gift;
            var c2s_friend_pvp_challenge = msg.c2s_friend_pvp_challenge;
            var s2c_update_friend_data = msg.s2c_update_friend_data;
            var facade = base.facade;
            var FriendProxy = /** @class */ (function (_super) {
                __extends(FriendProxy, _super);
                function FriendProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                FriendProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new friend.FriendModel();
                    this.onProto(s2c_friend_list, this.s2c_friend_list, this);
                    this.onProto(s2c_update_friend_data, this.s2c_update_friend_data, this);
                };
                FriendProxy.prototype.onStartReconnect = function () {
                    _super.prototype.onStartReconnect.call(this);
                    this._model.giftIndexList = null;
                };
                FriendProxy.prototype.c2s_friend_list = function (type) {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670180 /* Friend */)) {
                        return;
                    }
                    var msg = new c2s_friend_list();
                    msg.type = type;
                    this.sendProto(msg);
                };
                FriendProxy.prototype.c2s_change_recommond_friend = function () {
                    var msg = new c2s_change_recommond_friend();
                    this.sendProto(msg);
                };
                FriendProxy.prototype.c2s_friend_apply = function (roleList) {
                    var msg = new c2s_friend_apply();
                    msg.role_list = roleList;
                    this.sendProto(msg);
                };
                FriendProxy.prototype.c2s_friend_delete = function (roleId, serverId) {
                    var msg = new c2s_friend_delete();
                    msg.role_id = roleId;
                    msg.server_id = serverId;
                    this.sendProto(msg);
                };
                FriendProxy.prototype.c2s_friend_give_gift = function (roleId, index, count) {
                    var msg = new c2s_friend_give_gift();
                    msg.role_id = roleId;
                    msg.index = index;
                    msg.count = count;
                    this.sendProto(msg);
                };
                FriendProxy.prototype.c2s_friend_pvp_challenge = function (roleId, data) {
                    var msg = new c2s_friend_pvp_challenge();
                    msg.role_id = roleId;
                    msg.data = data;
                    this.sendProto(msg);
                };
                FriendProxy.prototype.s2c_friend_list = function (n) {
                    var msg = n.body;
                    if (!msg) {
                        return;
                    }
                    //s2c_friend_list 所有信息 都是发这个协议给你  发的是所有
                    if (msg.type) {
                        this._model.infoList[msg.type] = msg.info_list || [];
                    }
                    if (msg.gift_count != undefined) {
                        this._model.giftCount = msg.gift_count;
                    }
                    this.updateHint();
                    this.sendNt("on_friend_update" /* ON_FRIEND_UPDATE */);
                };
                FriendProxy.prototype.s2c_update_friend_data = function (n) {
                    var msg = n.body;
                    if (!msg || !msg.list) {
                        return;
                    }
                    for (var _i = 0, _a = msg.list; _i < _a.length; _i++) {
                        var i = _a[_i];
                        if (!this._model.infoList[i.type]) {
                            this._model.infoList[i.type] = [];
                        }
                        var infoList = this._model.infoList[i.type];
                        if (i.event == 2 /* Add */) {
                            //添加
                            infoList.push(i.info);
                        }
                        else {
                            var pos = this.getInfoPos(i.type, i.info.role_id);
                            if (i.event == 1 /* Delete */) {
                                if (i.type == 1 /* Friend */) {
                                    //删除的是好友时，需要清除下私聊列表
                                    var chatProxy = facade.retMod("25" /* Chat */).retProxy(35 /* Chat */);
                                    chatProxy.deletePrivateInfo(i.info.role_id, 3 /* DelFriend */);
                                }
                                //删除
                                infoList.splice(pos, 1);
                            }
                            else {
                                //更新
                                infoList[pos] = i.info;
                            }
                        }
                    }
                    this.updateHint();
                    this.sendNt("on_friend_update" /* ON_FRIEND_UPDATE */);
                };
                //信息index
                FriendProxy.prototype.getInfoPos = function (type, roleId) {
                    var infoList = this._model.infoList[type];
                    for (var i = 0; i < infoList.length; ++i) {
                        var info = infoList[i];
                        if (info.role_id.eq(roleId)) {
                            return i;
                        }
                    }
                    return -1;
                };
                Object.defineProperty(FriendProxy.prototype, "friendList", {
                    get: function () {
                        return this._model.infoList[1 /* Friend */] || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FriendProxy.prototype, "followList", {
                    get: function () {
                        return this._model.infoList[2 /* Follow */] || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FriendProxy.prototype, "recommendList", {
                    get: function () {
                        return this._model.infoList[3 /* Recommend */] || [];
                    },
                    enumerable: true,
                    configurable: true
                });
                //是否好友
                FriendProxy.prototype.isFriend = function (roleId) {
                    for (var _i = 0, _a = this.friendList; _i < _a.length; _i++) {
                        var i = _a[_i];
                        if (i.role_id.eq(roleId)) {
                            return true;
                        }
                    }
                    return false;
                };
                //好友信息
                FriendProxy.prototype.getFriendInfo = function (roleId) {
                    for (var _i = 0, _a = this.friendList; _i < _a.length; _i++) {
                        var i = _a[_i];
                        if (i.role_id.eq(roleId)) {
                            return i;
                        }
                    }
                    return null;
                };
                //最大送礼次数
                FriendProxy.prototype.getMaxGiftCnt = function () {
                    var cfg = game.GameConfig.getParamConfigById("friend_gifts_count");
                    return cfg && cfg.value;
                };
                //送礼次数
                FriendProxy.prototype.getGiftCnt = function () {
                    return this._model.giftCount;
                };
                //剩余送礼次数
                FriendProxy.prototype.getLeftGiftCnt = function () {
                    var maxCnt = this.getMaxGiftCnt();
                    return maxCnt - this._model.giftCount;
                };
                //最大仙友人数
                FriendProxy.prototype.getMaxFriendCnt = function () {
                    var cfg = game.GameConfig.getParamConfigById("friend_max_count");
                    return cfg && cfg.value;
                };
                //仙友人数
                FriendProxy.prototype.getFriendCnt = function () {
                    return this.friendList.length;
                };
                //剩余仙友人数
                FriendProxy.prototype.getLeftFriendCnt = function () {
                    var maxCnt = this.getMaxFriendCnt();
                    var cnt = this.getFriendCnt();
                    return maxCnt - cnt;
                };
                //检测是否可以添加好友
                FriendProxy.prototype.checkCanAdd = function () {
                    var cnt = this.getLeftFriendCnt();
                    var canAdd = cnt > 0;
                    if (!canAdd) {
                        game.PromptBox.getIns().show(game.getLanById("friend_tips8" /* friend_tips8 */));
                    }
                    return canAdd;
                };
                //添加好友
                FriendProxy.prototype.onClickAdd = function (roleList) {
                    if (!this.checkCanAdd()) {
                        return;
                    }
                    this.c2s_friend_apply(roleList);
                };
                //一键添加好友
                FriendProxy.prototype.onClickOneKeyAdd = function (infos) {
                    if (!infos || !infos.length) {
                        game.PromptBox.getIns().show(game.getLanById("friend_tips12" /* friend_tips12 */));
                        return;
                    }
                    var roleList = [];
                    var cnt = this.getLeftFriendCnt();
                    for (var i = 0; i < infos.length && i < cnt; ++i) {
                        var info = infos[i];
                        roleList.push({ role_id: info.role_id, server_id: info.server_id });
                    }
                    this.onClickAdd(roleList);
                };
                Object.defineProperty(FriendProxy.prototype, "giftIndexList", {
                    get: function () {
                        if (!this._model.giftIndexList) {
                            this._model.giftIndexList = [];
                            var cfgList = game.getConfigListByName("friend_gift.json" /* FriendGift */);
                            for (var _i = 0, cfgList_1 = cfgList; _i < cfgList_1.length; _i++) {
                                var cfg = cfgList_1[_i];
                                this._model.giftIndexList.push(cfg.index);
                            }
                        }
                        return this._model.giftIndexList;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**更新红点*/
                FriendProxy.prototype.updateHint = function () {
                    if (!mod.ViewMgr.getIns().checkViewOpen(1041670180 /* Friend */)) {
                        return;
                    }
                    var hint = this.getGiftHint();
                    var hintType = this._model.friendHint;
                    mod.HintMgr.setHint(hint, hintType);
                };
                FriendProxy.prototype.getGiftHint = function () {
                    var cnt = this.getLeftGiftCnt();
                    if (cnt <= 0) {
                        return false;
                    }
                    var friendCnt = this.getFriendCnt();
                    if (friendCnt <= 0) {
                        return false; //好友人数为0时，不提示红点
                    }
                    for (var _i = 0, _a = this.giftIndexList; _i < _a.length; _i++) {
                        var i = _a[_i];
                        var cnt_1 = mod.BagUtil.getPropCntByIdx(i);
                        if (cnt_1 > 0) {
                            return true;
                        }
                    }
                    return false;
                };
                Object.defineProperty(FriendProxy.prototype, "changeTime", {
                    get: function () {
                        return this._model.changeTime;
                    },
                    set: function (time) {
                        this._model.changeTime = time;
                    },
                    enumerable: true,
                    configurable: true
                });
                FriendProxy.prototype.onBagUpdateByPropIndex = function (n) {
                    var indexs = n.body;
                    var giftIndexList = this.giftIndexList;
                    for (var _i = 0, giftIndexList_1 = giftIndexList; _i < giftIndexList_1.length; _i++) {
                        var i = giftIndexList_1[_i];
                        if (indexs.indexOf(i) >= 0) {
                            this.updateHint();
                            break;
                        }
                    }
                };
                return FriendProxy;
            }(game.ProxyBase));
            friend.FriendProxy = FriendProxy;
            __reflect(FriendProxy.prototype, "game.mod.friend.FriendProxy", ["game.mod.IFriendProxy", "base.IProxy"]);
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var FriendBlackItem = /** @class */ (function (_super) {
                __extends(FriendBlackItem, _super);
                function FriendBlackItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                FriendBlackItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._chatProxy = facade.retMod("25" /* Chat */).retProxy(35 /* Chat */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_black, this.onClick, this);
                };
                FriendBlackItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    this.head.updateShow(info.head, info.head_frame, info.sex, info.vip);
                    this.lab_name.text = info.name;
                    this.power.setPowerValue(info.showpower, 2904685 /* DEFAULT2 */, 24);
                    var guildName = info.guild_name || game.getLanById("bag_cue20" /* bag_cue20 */);
                    this.lab_team.text = game.getLanById("union_title_2" /* union_title_2 */) + "：" + guildName;
                };
                FriendBlackItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    this._chatProxy.onClickBlack(info.server_id, info.role_id, info.is_robot);
                };
                return FriendBlackItem;
            }(mod.BaseListenerRenderer));
            friend.FriendBlackItem = FriendBlackItem;
            __reflect(FriendBlackItem.prototype, "game.mod.friend.FriendBlackItem");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var FriendBlackView = /** @class */ (function (_super) {
                __extends(FriendBlackView, _super);
                function FriendBlackView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.friend.FriendBlackSkin";
                    return _this;
                }
                return FriendBlackView;
            }(eui.Component));
            friend.FriendBlackView = FriendBlackView;
            __reflect(FriendBlackView.prototype, "game.mod.friend.FriendBlackView");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var FriendCheckView = /** @class */ (function (_super) {
                __extends(FriendCheckView, _super);
                function FriendCheckView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.friend.FriendCheckSkin";
                    return _this;
                }
                return FriendCheckView;
            }(eui.Component));
            friend.FriendCheckView = FriendCheckView;
            __reflect(FriendCheckView.prototype, "game.mod.friend.FriendCheckView");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var FriendFollowView = /** @class */ (function (_super) {
                __extends(FriendFollowView, _super);
                function FriendFollowView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.friend.FriendFollowSkin";
                    return _this;
                }
                return FriendFollowView;
            }(eui.Component));
            friend.FriendFollowView = FriendFollowView;
            __reflect(FriendFollowView.prototype, "game.mod.friend.FriendFollowView");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var facade = base.facade;
            var FriendGiftItem = /** @class */ (function (_super) {
                __extends(FriendGiftItem, _super);
                function FriendGiftItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                FriendGiftItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var index = this.data.index;
                    this.icon.setData(index);
                    this.lab_name.textFlow = this.icon.getPropName();
                    var giveItem = this.data.give_item;
                    this.item1.initIcon(giveItem[0]);
                    this.item1.lab_cost.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor("+" + giveItem[1], 2330156 /* GREEN */));
                    this.lab_value.textFlow = game.TextUtil.parseHtml(game.TextUtil.addColor("+" + this.data.value, 2330156 /* GREEN */));
                    var cnt = mod.BagUtil.getPropCntByIdx(index);
                    var cntStr = game.getLanById("have" /* have */) + "：" + game.TextUtil.addColor(cnt + "", cnt > 0 ? 2330156 /* GREEN */ : 16719376 /* RED */);
                    this.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                    var _proxy = facade.retMod("59" /* Friend */).retProxy(231 /* Friend */);
                    this.redPoint.visible = _proxy.getLeftGiftCnt() > 0 && cnt > 0;
                };
                return FriendGiftItem;
            }(eui.ItemRenderer));
            friend.FriendGiftItem = FriendGiftItem;
            __reflect(FriendGiftItem.prototype, "game.mod.friend.FriendGiftItem");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var FriendGiftView = /** @class */ (function (_super) {
                __extends(FriendGiftView, _super);
                function FriendGiftView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.friend.FriendGiftSkin";
                    return _this;
                }
                return FriendGiftView;
            }(eui.Component));
            friend.FriendGiftView = FriendGiftView;
            __reflect(FriendGiftView.prototype, "game.mod.friend.FriendGiftView");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var Point = egret.Point;
            var FriendItem = /** @class */ (function (_super) {
                __extends(FriendItem, _super);
                function FriendItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                FriendItem.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("59" /* Friend */).retProxy(231 /* Friend */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_gift, this.onClick, this);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.head, this.onClickHead, this);
                };
                FriendItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    this.head.updateShow(info.head, info.head_frame, info.sex, info.vip_lv);
                    this.img_state.source = info.is_friend ? "friend_state2" : "friend_state1";
                    this.lab_name.text = info.name;
                    this.power.setPowerValue(info.showpower, 2904685 /* DEFAULT2 */, 24);
                    var guildName = info.guild_name || game.getLanById("bag_cue20" /* bag_cue20 */);
                    this.lab_team.text = game.getLanById("union_title_2" /* union_title_2 */) + "：" + guildName;
                    this.lab_value.text = game.StringUtil.getHurtNumStr(info.friendship);
                    this.img_online.source = info.is_online ? "friend_lv" : "friend_hui";
                    var onlineStr = "";
                    if (info.is_online) {
                        onlineStr = game.TextUtil.addColor(game.getLanById("guild_online" /* guild_online */), 2330156 /* GREEN */);
                    }
                    else {
                        onlineStr = game.TextUtil.addColor(game.TimeUtil.getLeaveTime(info.time), 8618626 /* GRAY */);
                    }
                    this.lab_online.textFlow = game.TextUtil.parseHtml(onlineStr);
                    this.btn_gift.redPoint.visible = this._proxy.getGiftHint();
                };
                FriendItem.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    mod.ViewMgr.getIns().showSecondPop("59" /* Friend */, "02" /* FriendGift */, this.data);
                };
                FriendItem.prototype.onClickHead = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    var headStagePt = this.head.localToGlobal(); //转过去的是全局坐标
                    var point = new Point(headStagePt.x + this.head.width / 2, headStagePt.y + this.head.height / 2);
                    egret.callLater(function () {
                        facade.showView("59" /* Friend */, "03" /* FriendCheck */, { info: info, point: point });
                    }, this);
                };
                return FriendItem;
            }(mod.BaseListenerRenderer));
            friend.FriendItem = FriendItem;
            __reflect(FriendItem.prototype, "game.mod.friend.FriendItem");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var friend_add_data = msg.friend_add_data;
            var FriendItem2 = /** @class */ (function (_super) {
                __extends(FriendItem2, _super);
                function FriendItem2() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                FriendItem2.prototype.onAddToStage = function () {
                    _super.prototype.onAddToStage.call(this);
                    this._proxy = facade.retMod("59" /* Friend */).retProxy(231 /* Friend */);
                    this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.btn_add, this.onClick, this);
                    // this.addEventListenerEx(TouchEvent.TOUCH_TAP, this.head, this.onClickHead, this);
                };
                FriendItem2.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    this.head.updateShow(info.head, info.head_frame, info.sex, info.vip_lv);
                    this.img_state.source = info.is_friend ? "friend_state2" : "friend_state1";
                    this.lab_name.text = info.name;
                    this.power.setPowerValue(info.showpower, 2904685 /* DEFAULT2 */, 24);
                    var guildName = info.guild_name || game.getLanById("bag_cue20" /* bag_cue20 */);
                    this.lab_team.text = game.getLanById("union_title_2" /* union_title_2 */) + "：" + guildName;
                    this.img_online.source = info.is_online ? "friend_lv" : "friend_hui";
                    var onlineStr = "";
                    if (info.is_online) {
                        onlineStr = game.TextUtil.addColor(game.getLanById("guild_online" /* guild_online */), 2330156 /* GREEN */);
                    }
                    else {
                        onlineStr = game.TextUtil.addColor(game.TimeUtil.getLeaveTime(info.time), 8618626 /* GRAY */);
                    }
                    this.lab_online.textFlow = game.TextUtil.parseHtml(onlineStr);
                };
                FriendItem2.prototype.onClick = function () {
                    if (!this.data) {
                        return;
                    }
                    var info = this.data;
                    var friendInfo = new friend_add_data();
                    friendInfo.role_id = info.role_id;
                    friendInfo.server_id = info.server_id;
                    this._proxy.onClickAdd([friendInfo]);
                };
                return FriendItem2;
            }(mod.BaseListenerRenderer));
            friend.FriendItem2 = FriendItem2;
            __reflect(FriendItem2.prototype, "game.mod.friend.FriendItem2");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var FriendModel = /** @class */ (function () {
                function FriendModel() {
                    this.infoList = {};
                    this.giftCount = 0;
                    this.changeTime = 0;
                    this.friendHint = ["59" /* Friend */, "01" /* FriendMain */, "01" /* Friend */]; //好友红点
                }
                return FriendModel;
            }());
            friend.FriendModel = FriendModel;
            __reflect(FriendModel.prototype, "game.mod.friend.FriendModel");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var FriendResultView = /** @class */ (function (_super) {
                __extends(FriendResultView, _super);
                function FriendResultView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.friend.FriendResultSkin";
                    return _this;
                }
                return FriendResultView;
            }(eui.Component));
            friend.FriendResultView = FriendResultView;
            __reflect(FriendResultView.prototype, "game.mod.friend.FriendResultView");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var FriendView = /** @class */ (function (_super) {
                __extends(FriendView, _super);
                function FriendView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.friend.FriendSkin";
                    return _this;
                }
                return FriendView;
            }(eui.Component));
            friend.FriendView = FriendView;
            __reflect(FriendView.prototype, "game.mod.friend.FriendView");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var ArrayCollection = eui.ArrayCollection;
            var facade = base.facade;
            var FriendBlackMdr = /** @class */ (function (_super) {
                __extends(FriendBlackMdr, _super);
                function FriendBlackMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", friend.FriendBlackView);
                    return _this;
                }
                FriendBlackMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._chatProxy = facade.retMod("25" /* Chat */).retProxy(35 /* Chat */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = friend.FriendBlackItem;
                    this._view.list_item.dataProvider = this._itemList;
                };
                FriendBlackMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    this.onNt("on_chat_black_update" /* ON_CHAT_BLACK_UPDATE */, this.onInfoUpdate, this);
                };
                FriendBlackMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.onInfoUpdate();
                    this._chatProxy.c2s_chat_open_blacklist(); //主动请求黑名单信息
                };
                FriendBlackMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                FriendBlackMdr.prototype.onInfoUpdate = function () {
                    this.updateItemList();
                };
                FriendBlackMdr.prototype.updateItemList = function () {
                    var infos = this._chatProxy.blackInfos;
                    var cnt = infos.length;
                    this._view.grp_tips.visible = cnt == 0;
                    this._view.scr.visible = cnt > 0;
                    if (this._view.scr.visible) {
                        if (this._itemList.source.length > 0) {
                            this._itemList.replaceAll(infos);
                        }
                        else {
                            this._itemList.source = infos;
                        }
                    }
                };
                return FriendBlackMdr;
            }(game.EffectMdrBase));
            friend.FriendBlackMdr = FriendBlackMdr;
            __reflect(FriendBlackMdr.prototype, "game.mod.friend.FriendBlackMdr");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var Event = egret.Event;
            var facade = base.facade;
            var Handler = base.Handler;
            var FriendCheckMdr = /** @class */ (function (_super) {
                __extends(FriendCheckMdr, _super);
                function FriendCheckMdr() {
                    var _this = _super.call(this, game.Layer.tip) || this;
                    _this._view = _this.mark("_view", friend.FriendCheckView);
                    return _this;
                }
                FriendCheckMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    //按钮列表
                    this._btnList = new ArrayCollection();
                    this._view.list_btn.dataProvider = this._btnList;
                    this._view.list_btn.itemRenderer = mod.BtnTabItem;
                    this._proxy = this.retProxy(231 /* Friend */);
                    this._chatProxy = facade.retMod("25" /* Chat */).retProxy(35 /* Chat */);
                };
                FriendCheckMdr.prototype.addListeners = function () {
                    var _this = this;
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_btn, Event.CHANGING, this.onClickBtn);
                    egret.callLater(function () {
                        addEventListener(gso.gameStage, TouchEvent.TOUCH_TAP, _this.onClickOther);
                    }, this);
                };
                FriendCheckMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.initView();
                    this.initTypeList();
                };
                FriendCheckMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                FriendCheckMdr.prototype.onClickBtn = function (e) {
                    var type = this._view.list_btn.selectedIndex + 1;
                    switch (type) {
                        case 1 /* Check */:
                            this.onClickCheck();
                            break;
                        case 2 /* Chat */:
                            this.onClickChat();
                            break;
                        case 3 /* Battle */:
                            this.onClickBattle();
                            break;
                        case 4 /* Compete */:
                            this.onClickCompete();
                            break;
                        case 5 /* Delete */:
                            this.onClickDelete();
                            break;
                        case 6 /* Black */:
                            this.onClickBlack();
                            break;
                    }
                    this.hide();
                };
                //判断是否超出界面
                FriendCheckMdr.prototype.onClickOther = function (e) {
                    var viewStagePt = this._view.localToGlobal();
                    if (e.stageX < viewStagePt.x || e.stageX > viewStagePt.x + this._view.width || e.stageY < viewStagePt.y ||
                        e.stageY > viewStagePt.y + this._view.height) {
                        this.hide();
                    }
                };
                FriendCheckMdr.prototype.initView = function () {
                    var point = this._showArgs.point; //全局坐标
                    this._view.x = point.x - game.Layer.tip.x; //减去对应层级的坐标
                    this._view.y = point.y - game.Layer.tip.y;
                };
                FriendCheckMdr.prototype.initTypeList = function () {
                    var datas = [];
                    var name = game.getLanById("chat_cue20" /* chat_cue20 */); //查看
                    datas.push({ name: name });
                    name = game.getLanById("chat_cue22" /* chat_cue22 */); //私聊
                    datas.push({ name: name });
                    name = game.getLanById("chat_cue25" /* chat_cue25 */); //切磋
                    datas.push({ name: name });
                    name = game.getLanById("chat_cue23" /* chat_cue23 */); //战力比拼
                    datas.push({ name: name });
                    name = game.getLanById("chat_cue26" /* chat_cue26 */); //删除
                    datas.push({ name: name });
                    name = game.getLanById("chat_cue24" /* chat_cue24 */); //拉黑
                    datas.push({ name: name });
                    this._btnList.source = datas;
                    this._view.list_btn.selectedIndex = -1;
                };
                FriendCheckMdr.prototype.onClickCheck = function () {
                    //查看
                    var info = this._showArgs.info;
                    //todo，没有机器人
                    mod.ViewMgr.getIns().showRoleTips(info.role_id, info.server_id);
                };
                FriendCheckMdr.prototype.onClickChat = function () {
                    var info = this._showArgs.info;
                    mod.ViewMgr.getIns().chat(info);
                };
                FriendCheckMdr.prototype.onClickBattle = function () {
                    //切磋
                    var info = this._showArgs.info;
                    this._proxy.c2s_friend_pvp_challenge(info.role_id);
                };
                FriendCheckMdr.prototype.onClickCompete = function () {
                    //战力比拼
                    var info = this._showArgs.info;
                    //todo，没有机器人
                    this._chatProxy.c2s_chat_look_user(info.server_id, info.role_id, 0, 1 /* Compete */);
                };
                FriendCheckMdr.prototype.onClickDelete = function () {
                    var _this = this;
                    //删除
                    var info = this._showArgs.info;
                    mod.ViewMgr.getIns().showConfirm(game.getLanById("friend_tips10" /* friend_tips10 */), Handler.alloc(this, function () {
                        _this._proxy.c2s_friend_delete(info.role_id, info.server_id);
                    }));
                };
                FriendCheckMdr.prototype.onClickBlack = function () {
                    //拉黑
                    var info = this._showArgs.info;
                    //todo，没有机器人
                    this._chatProxy.onClickBlack(info.server_id, info.role_id, 0);
                };
                return FriendCheckMdr;
            }(game.MdrBase));
            friend.FriendCheckMdr = FriendCheckMdr;
            __reflect(FriendCheckMdr.prototype, "game.mod.friend.FriendCheckMdr");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var FriendFollowMdr = /** @class */ (function (_super) {
                __extends(FriendFollowMdr, _super);
                function FriendFollowMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", friend.FriendFollowView);
                    return _this;
                }
                FriendFollowMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(231 /* Friend */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = friend.FriendItem2;
                    this._view.list_item.dataProvider = this._itemList;
                };
                FriendFollowMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    this.onNt("on_friend_update" /* ON_FRIEND_UPDATE */, this.onInfoUpdate, this);
                };
                FriendFollowMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.c2s_friend_list(2 /* Follow */); //todo，看下是否需要优化下，打开仙友时候请求下数据
                    this.onInfoUpdate();
                };
                FriendFollowMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                FriendFollowMdr.prototype.onClickAdd = function () {
                    var infos = this._proxy.followList;
                    this._proxy.onClickOneKeyAdd(infos);
                };
                FriendFollowMdr.prototype.onInfoUpdate = function () {
                    this.updateItemList();
                };
                FriendFollowMdr.prototype.updateItemList = function () {
                    var infos = this._proxy.followList;
                    var cnt = infos.length;
                    this._view.grp_tips.visible = cnt == 0;
                    this._view.scr.visible = cnt > 0;
                    if (this._view.scr.visible) {
                        //排序
                        infos.sort(game.SortTools.sortFriend);
                        if (this._itemList.source.length > 0) {
                            this._itemList.replaceAll(infos);
                        }
                        else {
                            this._itemList.source = infos;
                        }
                    }
                };
                return FriendFollowMdr;
            }(game.EffectMdrBase));
            friend.FriendFollowMdr = FriendFollowMdr;
            __reflect(FriendFollowMdr.prototype, "game.mod.friend.FriendFollowMdr");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var TouchEvent = egret.TouchEvent;
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var FriendGiftMdr = /** @class */ (function (_super) {
                __extends(FriendGiftMdr, _super);
                function FriendGiftMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", friend.FriendGiftView);
                    _this._selIndex = 0;
                    _this.isEasyHide = true;
                    return _this;
                }
                FriendGiftMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(231 /* Friend */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = friend.FriendGiftItem;
                    this._view.list_item.dataProvider = this._itemList;
                };
                FriendGiftMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list_item, ItemTapEvent.ITEM_TAP, this.onClickItem);
                    addEventListener(this._view.btn_send, TouchEvent.TOUCH_TAP, this.onClickSend);
                    addEventListener(this._view.btn_subtractTen, TouchEvent.TOUCH_TAP, this.onClickSubtractTen);
                    addEventListener(this._view.btn_subtract, TouchEvent.TOUCH_TAP, this.onClickSubtract);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    addEventListener(this._view.btn_addTen, TouchEvent.TOUCH_TAP, this.onClickAddTen);
                    this.onNt("on_bag_update_by_prop_index" /* ON_BAG_UPDATE_BY_PROP_INDEX */, this.onBagUpdateIndex, this);
                    this.onNt("on_friend_update" /* ON_FRIEND_UPDATE */, this.onInfoUpdate, this);
                };
                FriendGiftMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._info = this._showArgs;
                    this.updateItemList();
                    this.setSelCnt(1);
                };
                FriendGiftMdr.prototype.onHide = function () {
                    this._selIndex = 0;
                    _super.prototype.onHide.call(this);
                };
                /** 通用背包事件监听 */
                FriendGiftMdr.prototype.onBagUpdateIndex = function (n) {
                    var indexs = n.body;
                    var giftIndexList = this._proxy.giftIndexList;
                    for (var _i = 0, giftIndexList_2 = giftIndexList; _i < giftIndexList_2.length; _i++) {
                        var i = giftIndexList_2[_i];
                        if (indexs.indexOf(i) >= 0) {
                            this.updateItemList();
                            this.updateMaxCnt();
                            break;
                        }
                    }
                };
                FriendGiftMdr.prototype.onInfoUpdate = function () {
                    this.updateItemList();
                    this.updateMaxCnt();
                };
                FriendGiftMdr.prototype.onClickItem = function (e) {
                    var index = e.itemIndex;
                    if (index == this._selIndex) {
                        return;
                    }
                    this._selIndex = index;
                    this.setSelCnt(1);
                };
                FriendGiftMdr.prototype.onClickSend = function () {
                    var infos = this._infos.concat();
                    var cfg = infos[this._selIndex];
                    if (!mod.BagUtil.checkPropCntUp(cfg.index)) {
                        return;
                    }
                    var leftCnt = this._proxy.getLeftGiftCnt();
                    if (leftCnt <= 0) {
                        //上限限制
                        game.PromptBox.getIns().show(game.getLanById("friend_tips9" /* friend_tips9 */));
                        return;
                    }
                    this._proxy.c2s_friend_give_gift(this._info.role_id, cfg.index, this._selCnt);
                };
                FriendGiftMdr.prototype.onClickSubtractTen = function () {
                    this.subtractSelCnt(10);
                };
                FriendGiftMdr.prototype.onClickSubtract = function () {
                    this.subtractSelCnt(1);
                };
                FriendGiftMdr.prototype.onClickAdd = function () {
                    this.addSelCnt(1);
                };
                FriendGiftMdr.prototype.onClickAddTen = function () {
                    this.addSelCnt(10);
                };
                FriendGiftMdr.prototype.subtractSelCnt = function (subtractCnt) {
                    var cnt = Math.max(1, this._selCnt - subtractCnt);
                    if (cnt == this._selCnt) {
                        game.PromptBox.getIns().show(game.getLanById("min_value" /* min_value */));
                        return;
                    }
                    this.setSelCnt(cnt);
                };
                FriendGiftMdr.prototype.addSelCnt = function (addCnt) {
                    var maxCnt = this.getMaxCnt();
                    var cnt = Math.min(maxCnt, this._selCnt + addCnt);
                    if (cnt == this._selCnt) {
                        game.PromptBox.getIns().show(game.getLanById("max_value" /* max_value */));
                        return;
                    }
                    this.setSelCnt(cnt);
                };
                FriendGiftMdr.prototype.getMaxCnt = function () {
                    var infos = this._infos.concat();
                    var cfg = infos[this._selIndex];
                    var curCnt = mod.BagUtil.getPropCntByIdx(cfg.index);
                    var leftCnt = this._proxy.getLeftGiftCnt();
                    var maxCnt = Math.min(curCnt, leftCnt);
                    return maxCnt ? maxCnt : 1;
                };
                FriendGiftMdr.prototype.setSelCnt = function (cnt) {
                    this._selCnt = cnt;
                    this.updateCnt();
                };
                FriendGiftMdr.prototype.updateCnt = function () {
                    this._view.lab_cnt.text = this._selCnt + "";
                };
                FriendGiftMdr.prototype.updateMaxCnt = function () {
                    var maxCnt = this.getMaxCnt();
                    if (maxCnt > this._selCnt) {
                        return;
                    }
                    var cnt = Math.min(maxCnt, this._selCnt);
                    this.setSelCnt(cnt);
                };
                FriendGiftMdr.prototype.updateItemList = function () {
                    if (!this._infos) {
                        var cfgList = game.getConfigListByName("friend_gift.json" /* FriendGift */);
                        this._infos = cfgList.concat();
                        this._infos.reverse(); //反转排序
                    }
                    var infos = this._infos.concat();
                    if (this._itemList.source.length > 0) {
                        this._itemList.replaceAll(infos);
                    }
                    else {
                        this._itemList.source = infos;
                    }
                    var curCfg = infos[this._selIndex];
                    var curCnt = mod.BagUtil.getPropCntByIdx(curCfg.index);
                    if (curCnt <= 0) {
                        //数量小于等于0时，自动选中
                        for (var i = 0; i < infos.length; ++i) {
                            var cfg = infos[i];
                            var cnt = mod.BagUtil.getPropCntByIdx(cfg.index);
                            if (cnt > 0) {
                                this._selIndex = i;
                                break;
                            }
                        }
                    }
                    this._view.list_item.selectedIndex = this._selIndex;
                };
                return FriendGiftMdr;
            }(game.EffectMdrBase));
            friend.FriendGiftMdr = FriendGiftMdr;
            __reflect(FriendGiftMdr.prototype, "game.mod.friend.FriendGiftMdr");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var FriendMainMdr = /** @class */ (function (_super) {
                __extends(FriendMainMdr, _super);
                function FriendMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* Friend */,
                            icon: "friend_tab",
                            mdr: friend.FriendMdr,
                            title: "friend_tips1" /* friend_tips1 */,
                            hintTypes: ["59" /* Friend */, "01" /* FriendMain */, "01" /* Friend */],
                        },
                        {
                            btnType: "02" /* Recommend */,
                            icon: "friend_recommend_tab",
                            mdr: friend.FriendRecommendMdr,
                            title: "friend_tips2" /* friend_tips2 */,
                        },
                        {
                            btnType: "03" /* Follow */,
                            icon: "friend_follow_tab",
                            mdr: friend.FriendFollowMdr,
                            title: "friend_tips3" /* friend_tips3 */,
                        },
                        {
                            btnType: "04" /* Black */,
                            icon: "friend_black_tab",
                            mdr: friend.FriendBlackMdr,
                            title: "friend_tips4" /* friend_tips4 */,
                        }
                    ];
                    return _this;
                }
                return FriendMainMdr;
            }(mod.WndBaseMdr));
            friend.FriendMainMdr = FriendMainMdr;
            __reflect(FriendMainMdr.prototype, "game.mod.friend.FriendMainMdr");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var ArrayCollection = eui.ArrayCollection;
            var TextEvent = egret.TextEvent;
            var FriendMdr = /** @class */ (function (_super) {
                __extends(FriendMdr, _super);
                function FriendMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", friend.FriendView);
                    return _this;
                }
                FriendMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(231 /* Friend */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = friend.FriendItem;
                    this._view.list_item.dataProvider = this._itemList;
                };
                FriendMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.lab_goto, TextEvent.LINK, this.onClickGoto);
                    this.onNt("on_friend_update" /* ON_FRIEND_UPDATE */, this.onInfoUpdate, this);
                };
                FriendMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.c2s_friend_list(1 /* Friend */); //todo，看下是否需要优化下，打开仙友时候请求下数据
                    this.onInfoUpdate();
                };
                FriendMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                FriendMdr.prototype.onClickGoto = function () {
                    this.sendNt("update_wnd_base_mdr_sel_tab" /* UPDATE_WND_BASE_MDR_SEL_TAB */, "02" /* Recommend */);
                };
                FriendMdr.prototype.onInfoUpdate = function () {
                    this.updateItemList();
                    this.updateGift();
                };
                FriendMdr.prototype.updateItemList = function () {
                    var infos = this._proxy.friendList;
                    var cnt = infos.length;
                    var maxCnt = this._proxy.getMaxFriendCnt();
                    var cntStr = game.getLanById("friend_tips5" /* friend_tips5 */) + game.TextUtil.addColor("(" + cnt + "/" + maxCnt + ")", 2330156 /* GREEN */);
                    this._view.lab_cnt.textFlow = game.TextUtil.parseHtml(cntStr);
                    this._view.grp_tips.visible = cnt == 0;
                    if (this._view.grp_tips.visible) {
                        var gotoStr = this._view.lab_goto.text;
                        this._view.lab_goto.textFlow = game.TextUtil.parseHtml(game.TextUtil.addLinkHtmlTxt(gotoStr, 2330156 /* GREEN */, ""));
                    }
                    this._view.scr.visible = cnt > 0;
                    if (this._view.scr.visible) {
                        //排序
                        infos.sort(game.SortTools.sortFriend);
                        if (this._itemList.source.length > 0) {
                            this._itemList.replaceAll(infos);
                        }
                        else {
                            this._itemList.source = infos;
                        }
                    }
                };
                FriendMdr.prototype.updateGift = function () {
                    var cnt = this._proxy.getGiftCnt();
                    var maxCnt = this._proxy.getMaxGiftCnt();
                    var giftStr = game.getLanById("friend_tips7" /* friend_tips7 */) + "：" + game.TextUtil.addColor(cnt + "/" + maxCnt, 2330156 /* GREEN */);
                    this._view.lab_gift.textFlow = game.TextUtil.parseHtml(giftStr);
                };
                return FriendMdr;
            }(game.EffectMdrBase));
            friend.FriendMdr = FriendMdr;
            __reflect(FriendMdr.prototype, "game.mod.friend.FriendMdr");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var FriendRecommendMdr = /** @class */ (function (_super) {
                __extends(FriendRecommendMdr, _super);
                function FriendRecommendMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", friend.FriendRecommendView);
                    _this.TIME_TICK = 5;
                    return _this;
                }
                FriendRecommendMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                    this._proxy = this.retProxy(231 /* Friend */);
                    this._itemList = new ArrayCollection();
                    this._view.list_item.itemRenderer = friend.FriendItem2;
                    this._view.list_item.dataProvider = this._itemList;
                };
                FriendRecommendMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_add, TouchEvent.TOUCH_TAP, this.onClickAdd);
                    addEventListener(this._view.btn_change, TouchEvent.TOUCH_TAP, this.onClickChange);
                    this.onNt("on_friend_update" /* ON_FRIEND_UPDATE */, this.onInfoUpdate, this);
                };
                FriendRecommendMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._proxy.c2s_friend_list(3 /* Recommend */); //todo，看下是否需要优化下，打开仙友时候请求下数据
                    this.onInfoUpdate();
                };
                FriendRecommendMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                FriendRecommendMdr.prototype.onClickAdd = function () {
                    var infos = this._proxy.recommendList;
                    this._proxy.onClickOneKeyAdd(infos);
                };
                FriendRecommendMdr.prototype.onClickChange = function () {
                    var changeTime = this._proxy.changeTime;
                    var curTime = TimeMgr.time.serverTimeSecond;
                    var leftTime = this.TIME_TICK + changeTime - curTime;
                    if (leftTime > 0) {
                        var tips = leftTime + game.getLanById("friend_tips11" /* friend_tips11 */);
                        game.PromptBox.getIns().show(tips);
                        return;
                    }
                    this._proxy.changeTime = curTime;
                    this._proxy.c2s_change_recommond_friend();
                };
                FriendRecommendMdr.prototype.onInfoUpdate = function () {
                    this.updateItemList();
                };
                FriendRecommendMdr.prototype.updateItemList = function () {
                    var infos = this._proxy.recommendList;
                    var cnt = infos.length;
                    this._view.grp_tips.visible = cnt == 0;
                    this._view.scr.visible = cnt > 0;
                    if (this._view.scr.visible) {
                        //排序
                        infos.sort(game.SortTools.sortFriend);
                        if (this._itemList.source.length > 0) {
                            this._itemList.replaceAll(infos);
                        }
                        else {
                            this._itemList.source = infos;
                        }
                    }
                };
                return FriendRecommendMdr;
            }(game.EffectMdrBase));
            friend.FriendRecommendMdr = FriendRecommendMdr;
            __reflect(FriendRecommendMdr.prototype, "game.mod.friend.FriendRecommendMdr");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var friend;
        (function (friend) {
            var Handler = base.Handler;
            var FriendResultMdr = /** @class */ (function (_super) {
                __extends(FriendResultMdr, _super);
                function FriendResultMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", friend.FriendResultView);
                    _this.isEasyHide = true;
                    return _this;
                }
                FriendResultMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._view.touchEnabled = false;
                };
                FriendResultMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                FriendResultMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
                    this.updateInfo();
                };
                FriendResultMdr.prototype.onHide = function () {
                    mod.SceneUtil.exitScene();
                    _super.prototype.onHide.call(this);
                };
                FriendResultMdr.prototype.updateInfo = function () {
                    var info = this._showArgs;
                    var isWin = info.is_success;
                    var diStr = isWin ? "result_bg1" : "result_bg2";
                    this._view.img_di.source = game.ResUtil.getUiPng(diStr);
                    var titleStr = isWin ? "result_shenli" : "result_shibai";
                    this._view.img_title.source = game.ResUtil.getUiPng(titleStr);
                    this._view.img_state1.source = isWin ? "doufa_win" : "doufa_fail";
                    this._view.img_state2.source = !isWin ? "doufa_win" : "doufa_fail";
                    this._view.head1.updateMyHead();
                    this._view.lab_name1.text = game.RoleVo.ins.name;
                    var ownerInfo = info.owner;
                    this._view.head2.updateShow(ownerInfo.head, ownerInfo.head_frame, ownerInfo.sex, ownerInfo.vip);
                    this._view.lab_name2.text = ownerInfo.name;
                };
                return FriendResultMdr;
            }(game.EffectMdrBase));
            friend.FriendResultMdr = FriendResultMdr;
            __reflect(FriendResultMdr.prototype, "game.mod.friend.FriendResultMdr");
        })(friend = mod.friend || (mod.friend = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=friend.js.map