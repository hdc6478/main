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
        var mail;
        (function (mail) {
            var MailMod = /** @class */ (function (_super) {
                __extends(MailMod, _super);
                function MailMod() {
                    return _super.call(this, "07" /* Mail */) || this;
                }
                MailMod.prototype.initCmd = function () {
                    _super.prototype.initCmd.call(this);
                    var self = this;
                };
                MailMod.prototype.initModel = function () {
                    _super.prototype.initModel.call(this);
                    this.regProxy(6 /* Mail */, mail.MailProxy);
                };
                MailMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    var self = this;
                    this.regMdr("01" /* MailMain */, mail.MailMainMdr);
                    this.regMdr("02" /* MailDesc */, mail.MailDescMdr);
                };
                return MailMod;
            }(game.ModBase));
            mail.MailMod = MailMod;
            __reflect(MailMod.prototype, "game.mod.mail.MailMod");
            gso.modCls.push(MailMod);
        })(mail = mod.mail || (mod.mail = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var mail;
        (function (mail) {
            var MailModel = /** @class */ (function () {
                function MailModel() {
                    this.isInit = false;
                    this.mails = []; //todo 分类型存
                    this.mailHint = false;
                    this.curMailsLen = []; //当前邮件各个数量
                    this.isMaxProp = false;
                    this.isOpenMailView = false;
                    this.feedBackHint = false;
                }
                return MailModel;
            }());
            mail.MailModel = MailModel;
            __reflect(MailModel.prototype, "game.mod.mail.MailModel");
        })(mail = mod.mail || (mod.mail = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var mail;
        (function (mail) {
            var MailPropData = /** @class */ (function () {
                function MailPropData() {
                }
                return MailPropData;
            }());
            mail.MailPropData = MailPropData;
            __reflect(MailPropData.prototype, "game.mod.mail.MailPropData");
        })(mail = mod.mail || (mod.mail = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var mail;
        (function (mail_1) {
            var c2s_mail_online_request = msg.c2s_mail_online_request;
            var c2s_mail_read = msg.c2s_mail_read;
            var c2s_mail_take = msg.c2s_mail_take;
            var c2s_mail_onekey_delete = msg.c2s_mail_onekey_delete;
            var c2s_mail_onekey_take = msg.c2s_mail_onekey_take;
            var s2c_mail_all = msg.s2c_mail_all;
            var s2c_mail_delete = msg.s2c_mail_delete;
            var TimeMgr = base.TimeMgr;
            var s2c_mail_update = msg.s2c_mail_update;
            var MailProxy = /** @class */ (function (_super) {
                __extends(MailProxy, _super);
                function MailProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MailProxy.prototype.onStartReconnect = function () {
                    this._model.isInit = false;
                    _super.prototype.onStartReconnect.call(this);
                };
                MailProxy.prototype.getModel = function () {
                    return this._model;
                };
                MailProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    var self = this;
                    self._model = new mail_1.MailModel();
                    self.onProto(s2c_mail_all, self.mail_all_s2c, self);
                    self.onProto(s2c_mail_update, self.mail_update_s2c, self);
                    self.onProto(s2c_mail_delete, self.mail_delete_s2c, self);
                };
                /**
                 * 上线请求邮件
                 */
                MailProxy.prototype.mail_online_request_c2s = function () {
                    var msg = new c2s_mail_online_request();
                    this.sendProto(msg);
                };
                /**
                 *读取邮件
                 * @param {long.Long} id
                 * @param type
                 */
                MailProxy.prototype.mail_read_c2s = function (id, type) {
                    var msg = new c2s_mail_read();
                    msg.mail_id = id;
                    msg.mail_type = type;
                    this.sendProto(msg);
                };
                /**
                 * 领取附件
                 * @param {long.Long} id
                 * @param type
                 */
                MailProxy.prototype.mail_take_c2s = function (id, type) {
                    var msg = new c2s_mail_take();
                    msg.mail_id = id;
                    msg.mail_type = type;
                    this.sendProto(msg);
                };
                /**
                 * 一键删除
                 */
                MailProxy.prototype.mail_onekey_delete_c2s = function () {
                    var msg = new c2s_mail_onekey_delete();
                    this.sendProto(msg);
                };
                /**
                 * 一键领取
                 */
                MailProxy.prototype.mail_onekey_take_c2s = function () {
                    var self = this;
                    var msg = new c2s_mail_onekey_take();
                    // if (self._model.mails) {
                    //     for (let i = 0, len = self._model.mails.length; i < len; i++) {
                    //         let mail = self._model.mails[i];
                    //         if (mail.is_readed == 0) {
                    //             mail.is_readed = 1;
                    //         }
                    //     }
                    // }
                    self.sendProto(msg);
                };
                /**
                 * 所有邮件
                 * @param {base.GameNT} n
                 */
                MailProxy.prototype.mail_all_s2c = function (n) {
                    var msg = n.body;
                    var self = this;
                    self._model.isInit = true;
                    if (msg.caps) {
                        self._model.mails_len = msg.caps;
                    }
                    if (msg.mails) {
                        self._model.mails = msg.mails;
                    }
                    //console.warn("获取到的邮件列表",msg.mails);
                    // let paramCfg: ParamConfig = getConfigByNameId(ConfigName.Param, "mail_max_num");
                    //console.warn("s2c_mail_all ParamConfig mail_max_num",paramCfg);
                    // todo 策划需求不主动弹窗 ID1010857
                    // let limitMailsCnt: number = paramCfg.value;
                    // if (self._model.mails.length >= limitMailsCnt) {
                    //     ViewMgr.getIns().show(getLanById(LanDef.mail_max_numtips));
                    // }
                    self.sendNt("on_mail_update" /* ON_MAIL_UPDATE */);
                    self.checkMailRemind();
                };
                /**
                 * 获取总邮件数
                 */
                MailProxy.prototype.getTotalMailCnt = function () {
                    var self = this;
                    if (!self.mails) {
                        return 0;
                    }
                    return this.mails.length;
                };
                /**
                 * 更新邮件
                 * @param {base.GameNT} n
                 */
                MailProxy.prototype.mail_update_s2c = function (n) {
                    var msg = n.body;
                    var self = this;
                    if (msg.mails && msg.mails.length) {
                        for (var _i = 0, _a = msg.mails; _i < _a.length; _i++) {
                            var i = _a[_i];
                            var mail_2 = self.getMail(i.mail_id);
                            if (mail_2) {
                                for (var _b = 0, _c = Object.keys(i); _b < _c.length; _b++) {
                                    var key = _c[_b];
                                    if (i[key] != null) {
                                        mail_2[key] = i[key];
                                    }
                                }
                            }
                            else {
                                if (self._model.mails == null) {
                                    self._model.mails = [];
                                }
                                self._model.mails.push(i);
                            }
                        }
                        self.sendNt("on_mail_update" /* ON_MAIL_UPDATE */);
                    }
                    self.checkMailRemind();
                };
                /**
                 * 删除邮件
                 * @param {base.GameNT} n
                 */
                MailProxy.prototype.mail_delete_s2c = function (n) {
                    var msg = n.body;
                    var self = this;
                    if (msg.mail_ids && msg.mail_ids.length) {
                        for (var _i = 0, _a = msg.mail_ids; _i < _a.length; _i++) {
                            var i = _a[_i];
                            var mail_3 = self.getMail(i);
                            if (mail_3) {
                                game.ArrayUtil.removeAt(self._model.mails, self._model.mails.indexOf(mail_3));
                            }
                        }
                        self.sendNt("on_mail_update" /* ON_MAIL_UPDATE */);
                    }
                    self.checkMailRemind();
                };
                MailProxy.prototype.getMail = function (id) {
                    var self = this;
                    if (self._model.mails && self._model.mails.length) {
                        for (var _i = 0, _a = self._model.mails; _i < _a.length; _i++) {
                            var i = _a[_i];
                            if (i.mail_id.eq(id)) {
                                return i;
                            }
                        }
                    }
                    return null;
                };
                Object.defineProperty(MailProxy.prototype, "mails", {
                    get: function () {
                        return this._model.mails;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MailProxy.prototype, "mails_len", {
                    get: function () {
                        return this._model.mails_len;
                    },
                    enumerable: true,
                    configurable: true
                });
                MailProxy.prototype.updateMailsLen = function () {
                    var self = this;
                    self._model.curMailsLen.length = 0;
                    var bool = true;
                    for (var i = 0; i < self.mails.length; i++) {
                        var mail_4 = self.mails[i];
                        var type = 0;
                        if (mail_4.mail_type == 5) { //活动类型邮件
                            type = 2;
                            if (mail_4.is_taken == 1) {
                                bool = false;
                            }
                        }
                        else if (mail_4.mail_type == 4) { //挂机类型邮件
                            type = 1;
                        }
                        if (self._model.curMailsLen[type] == null) {
                            self._model.curMailsLen[type] = 0;
                        }
                        self._model.curMailsLen[type] += 1;
                    }
                    if (!self._model.curMailsLen[2]) {
                        bool = false;
                    }
                    self._model.isMaxProp = bool;
                };
                MailProxy.prototype.checkMailRemind = function () {
                    var self = this;
                    self.updateFeedBackHint();
                    self.updateMailHint();
                    self.updateMailsLen(); //在不改原有逻辑上记录邮件数量
                    if (self._model.mails_len == null) {
                        return;
                    }
                    if (self._model.mails_len[0] <= self._model.curMailsLen[0] ||
                        (self._model.mails_len[2] <= self._model.curMailsLen[2]) && self._model.isMaxProp) {
                        self._model.coolTime = TimeMgr.time.serverTimeSecond + game.MailRemindTime;
                    }
                    else {
                        self._model.coolTime = null;
                    }
                };
                //计算主界面红点逻辑   基于邮件未领取条件下 1、邮件中有道具 2、邮件未浏览
                MailProxy.prototype.updateMailHint = function () {
                    var ret1 = false;
                    var ret2 = false;
                    for (var _i = 0, _a = this._model.mails; _i < _a.length; _i++) {
                        var v = _a[_i];
                        //是否有道具
                        var isHasItem = v.attachments && v.attachments.length > 0;
                        if (v.is_taken == 0 && (v.is_readed == 0 || isHasItem)) {
                            if (v.mail_type == 1) {
                                ret1 = true;
                            }
                            if (v.mail_type == 2) {
                                ret2 = true;
                            }
                            if (ret1 && ret2) {
                                break;
                            }
                        }
                    }
                    mod.HintMgr.setHint(ret1, ["07" /* Mail */, "01" /* MailMain */ + "01" /* BtnMail */]);
                    mod.HintMgr.setHint(ret2, ["07" /* Mail */, "01" /* MailMain */ + "02" /* BtnGMMail */]);
                };
                MailProxy.prototype.getList = function (type) {
                    if (type === void 0) { type = this.type; }
                    var list = [];
                    for (var _i = 0, _a = this._model.mails; _i < _a.length; _i++) {
                        var mail_5 = _a[_i];
                        if (mail_5.mail_type == type) {
                            list.push(mail_5);
                        }
                    }
                    return list.sort(function (a, b) {
                        if (a.is_taken != b.is_taken) {
                            return a.is_taken ? 1 : -1;
                        }
                        return b.send_time - a.send_time;
                    });
                };
                Object.defineProperty(MailProxy.prototype, "type", {
                    get: function () {
                        return this._model.type;
                    },
                    set: function (val) {
                        this._model.type = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                /*******************************意见反馈***************************/
                MailProxy.prototype.updateFeedBackHint = function () {
                    var hint = this.checkFeedBackHint();
                    if (hint != this.feedBackHint) {
                        this._model.feedBackHint = hint;
                        // this.sendNt(ActivityEvent.ON_ACT_HINT_UPDATE);
                    }
                    //this.sendNt(ActivityEvent.ON_ACTIVITY_ICON_HINT, ViewEnterIcon.feedback_icon);
                };
                MailProxy.prototype.checkFeedBackHint = function () {
                    for (var _i = 0, _a = this.answerMail; _i < _a.length; _i++) {
                        var i = _a[_i];
                        if (!i.is_readed) {
                            return true;
                        }
                    }
                    return false;
                };
                Object.defineProperty(MailProxy.prototype, "feedBackHint", {
                    get: function () {
                        return this._model.feedBackHint;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MailProxy.prototype, "answerMail", {
                    /**意见反馈答复邮件*/
                    get: function () {
                        var mails = [];
                        for (var _i = 0, _a = this.mails; _i < _a.length; _i++) {
                            var i = _a[_i];
                            if (i.is_feedback) {
                                mails.push(i);
                            }
                        }
                        return mails.sort(this.sortMail);
                    },
                    enumerable: true,
                    configurable: true
                });
                MailProxy.prototype.sortMail = function (a, b) {
                    if (a.is_readed != b.is_readed) {
                        return a.is_readed == 0 ? -1 : 1;
                    }
                    if (a.send_time != b.send_time) {
                        return a.send_time > b.send_time ? -1 : 1;
                    }
                    return 0;
                };
                return MailProxy;
            }(game.ProxyBase));
            mail_1.MailProxy = MailProxy;
            __reflect(MailProxy.prototype, "game.mod.mail.MailProxy", ["game.mod.IMailProxy", "base.IProxy"]);
        })(mail = mod.mail || (mod.mail = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var mail;
        (function (mail) {
            var MailDescView = /** @class */ (function (_super) {
                __extends(MailDescView, _super);
                function MailDescView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.mail.MailDescSkin";
                    return _this;
                }
                return MailDescView;
            }(eui.Component));
            mail.MailDescView = MailDescView;
            __reflect(MailDescView.prototype, "game.mod.mail.MailDescView");
        })(mail = mod.mail || (mod.mail = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var mail;
        (function (mail) {
            var TouchEvent = egret.TouchEvent;
            var MailItem = /** @class */ (function (_super) {
                __extends(MailItem, _super);
                function MailItem() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MailItem.prototype.onAddToStage = function () {
                    this.addEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                MailItem.prototype.onRemoveFromStage = function () {
                    this.removeEventListener(TouchEvent.TOUCH_TAP, this.onClick, this);
                };
                MailItem.prototype.dataChanged = function () {
                    if (!this.data) {
                        return;
                    }
                    if (this.data.attachments) {
                        var p = this.data.attachments[0];
                        var prop = game.PropData.create(p.idx, p.cnt);
                        this.icon.setData(prop);
                        this.icon.visible = true;
                    }
                    else {
                        this.icon.visible = false;
                    }
                    this.lab_title.textFlow = game.TextUtil.parseHtml(this.data.title);
                    this.lab_time.text = game.TimeUtil.formatTimeSecond(this.data.send_time);
                    this.img.visible = this.data.is_taken == 1;
                    //�Ƿ��е���
                    var isHasItem = this.data.attachments && this.data.attachments.length > 0;
                    this.redPoint.visible = this.data.is_taken == 0 && (this.data.is_readed !== 1 || isHasItem);
                };
                MailItem.prototype.onClick = function () {
                    mod.ViewMgr.getIns().showSecondPop("07" /* Mail */, "02" /* MailDesc */, this.data);
                };
                return MailItem;
            }(mod.BaseRenderer));
            mail.MailItem = MailItem;
            __reflect(MailItem.prototype, "game.mod.mail.MailItem");
        })(mail = mod.mail || (mod.mail = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var mail;
        (function (mail) {
            var MailView = /** @class */ (function (_super) {
                __extends(MailView, _super);
                function MailView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.mail.MailViewSkin";
                    return _this;
                }
                return MailView;
            }(eui.Component));
            mail.MailView = MailView;
            __reflect(MailView.prototype, "game.mod.mail.MailView");
        })(mail = mod.mail || (mod.mail = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var mail;
        (function (mail) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var MailDescMdr = /** @class */ (function (_super) {
                __extends(MailDescMdr, _super);
                function MailDescMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark('_view', mail.MailDescView);
                    _this._listData = new ArrayCollection();
                    _this.isEasyHide = true;
                    return _this;
                }
                MailDescMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(6 /* Mail */);
                    this._view.list.itemRenderer = mod.Icon;
                    this._view.list.dataProvider = this._listData;
                };
                MailDescMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClickGet, this);
                    this.onNt("on_mail_update" /* ON_MAIL_UPDATE */, this.onUpdateView, this);
                };
                MailDescMdr.prototype.onShow = function () {
                    this._proxy.mail_read_c2s(this._showArgs.mail_id, this._showArgs.mail_type);
                    _super.prototype.onShow.call(this);
                    this.onUpdateView();
                };
                MailDescMdr.prototype.onUpdateView = function () {
                    this._showArgs = this._proxy.getMail(this._showArgs.mail_id);
                    this._view.lb_desc.textFlow = game.TextUtil.parseHtml(this._showArgs.content, true);
                    this._view.secondPop.updateTitleStr(game.getLanById("tishi_25" /* tishi_25 */));
                    this._hasEquip = false;
                    if (this._showArgs.attachments) {
                        var list = [];
                        for (var _i = 0, _a = this._showArgs.attachments; _i < _a.length; _i++) {
                            var data = _a[_i];
                            var prop = game.PropData.create(data.idx, data.cnt);
                            if (prop.type == 290 /* Equip */ && prop.propType == 1 /* RoleEquip */) {
                                this._hasEquip = true;
                            }
                            list.push(prop);
                        }
                        this._listData.source = list;
                    }
                    this.updateGetBtnStatus();
                };
                MailDescMdr.prototype.updateGetBtnStatus = function () {
                    if (this._showArgs.is_taken == 1) {
                        //邮件已经领取
                        this._view.btn_get.visible = false;
                        this._view.img_geted.visible = true;
                    }
                    else {
                        //邮件未领取
                        if (this._showArgs.attachments && this._showArgs.attachments.length > 0) {
                            this._view.btn_get.visible = true;
                            this._view.img_geted.visible = false;
                        }
                        else {
                            this._view.btn_get.visible = false;
                            this._view.img_geted.visible = false;
                        }
                    }
                };
                MailDescMdr.prototype.onClickGet = function () {
                    if (this._hasEquip && mod.BagUtil.checkBagFull()) {
                        return;
                    }
                    this._proxy.mail_take_c2s(this._showArgs.mail_id, this._showArgs.mail_type);
                };
                return MailDescMdr;
            }(game.MdrBase));
            mail.MailDescMdr = MailDescMdr;
            __reflect(MailDescMdr.prototype, "game.mod.mail.MailDescMdr");
        })(mail = mod.mail || (mod.mail = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var mail;
        (function (mail) {
            var MailMainMdr = /** @class */ (function (_super) {
                __extends(MailMainMdr, _super);
                function MailMainMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._btnData = [
                        {
                            btnType: "01" /* BtnMail */,
                            icon: "xitongyoujianbiaoqiantubiao",
                            mdr: mail.MailMdr,
                            title: "tishi_25" /* tishi_25 */,
                            hintTypes: ["07" /* Mail */, "01" /* MailMain */ + "01" /* BtnMail */]
                        },
                        {
                            btnType: "02" /* BtnGMMail */,
                            icon: "GMyoujianbiaoqiantubiao",
                            mdr: mail.MailMdr,
                            title: "tishi_25" /* tishi_25 */,
                            hintTypes: ["07" /* Mail */, "01" /* MailMain */ + "02" /* BtnGMMail */]
                        }
                    ];
                    return _this;
                }
                MailMainMdr.prototype.onInit = function () {
                    this._proxy = this.retProxy(6 /* Mail */);
                    _super.prototype.onInit.call(this);
                };
                MailMainMdr.prototype.onTabCheck = function (index) {
                    // let type: number = this._proxy.getTypeByIndex(index);
                    // let open: number[] = this._proxy.getOpenByType(type);
                    // return ViewMgr.getIns().checkBossOpen(open[0], open[1], true);
                    this._proxy.type = index + 1;
                    return true;
                };
                return MailMainMdr;
            }(mod.WndBaseMdr));
            mail.MailMainMdr = MailMainMdr;
            __reflect(MailMainMdr.prototype, "game.mod.mail.MailMainMdr");
        })(mail = mod.mail || (mod.mail = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var mail;
        (function (mail) {
            var ArrayCollection = eui.ArrayCollection;
            var TouchEvent = egret.TouchEvent;
            var MailMdr = /** @class */ (function (_super) {
                __extends(MailMdr, _super);
                function MailMdr() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this._view = _this.mark("_view", mail.MailView);
                    _this._listData = new ArrayCollection();
                    _this._equips = 0;
                    return _this;
                }
                MailMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._proxy = this.retProxy(6 /* Mail */);
                    this._view.list.itemRenderer = mail.MailItem;
                    this._view.list.dataProvider = this._listData;
                };
                MailMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_get, TouchEvent.TOUCH_TAP, this.onClickGet, this);
                    addEventListener(this._view.btn_del, TouchEvent.TOUCH_TAP, this.onClickDel, this);
                    //预留优化接口
                    //addEventListener(this._view.scroller,eui.UIEvent.CHANGE_END,this.onScrollEnd,this);
                    this.onNt("on_mail_update" /* ON_MAIL_UPDATE */, this.onUpdateView, this);
                };
                MailMdr.prototype.onScrollEnd = function (evt) {
                    // 如果(滚动的距离 + 滚动区域的高度) >= 可滚动内容的高度，那么此刻内容已经滚动到了底部
                    if ((this._view.scroller.viewport.scrollV + this._view.scroller.height) >= this._view.scroller.viewport.contentHeight) {
                        // 滚动到底部的操作
                    }
                };
                MailMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._equips = 0;
                    this.onUpdateView();
                };
                MailMdr.prototype.onUpdateView = function () {
                    var list = this._proxy.getList();
                    if (list.length > 0) {
                        this.checkEquipCnt(list);
                        this._view.btn_get.visible = true;
                        this._view.btn_del.visible = true;
                    }
                    else {
                        this._view.btn_get.visible = false;
                        this._view.btn_del.visible = false;
                    }
                    this._listData.source = list;
                };
                MailMdr.prototype.checkEquipCnt = function (list) {
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var info = list_1[_i];
                        if (!info.attachments) {
                            continue;
                        }
                        for (var _a = 0, _b = info.attachments; _a < _b.length; _a++) {
                            var data = _b[_a];
                            var prop = game.PropData.create(data.idx, data.cnt);
                            if (prop.type == 290 /* Equip */ && prop.propType == 1 /* RoleEquip */) {
                                this._equips++;
                            }
                        }
                    }
                };
                MailMdr.prototype.onClickGet = function () {
                    if (this._equips > 0 && mod.BagUtil.checkBagFull()) {
                        return;
                    }
                    this._proxy.mail_onekey_take_c2s();
                };
                MailMdr.prototype.onClickDel = function () {
                    this._proxy.mail_onekey_delete_c2s();
                };
                MailMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return MailMdr;
            }(game.MdrBase));
            mail.MailMdr = MailMdr;
            __reflect(MailMdr.prototype, "game.mod.mail.MailMdr");
        })(mail = mod.mail || (mod.mail = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=mail.js.map