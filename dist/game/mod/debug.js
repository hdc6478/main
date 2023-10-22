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
        var debug;
        (function (debug) {
            var DebugMod = /** @class */ (function (_super) {
                __extends(DebugMod, _super);
                function DebugMod() {
                    return _super.call(this, "01" /* Debug */) || this;
                }
                DebugMod.prototype.initView = function () {
                    _super.prototype.initView.call(this);
                    var self = this;
                    self.regMdr("1", debug.GmListMdr);
                    self.regMdr("2", debug.GmCmdMdr);
                };
                return DebugMod;
            }(game.ModBase));
            debug.DebugMod = DebugMod;
            __reflect(DebugMod.prototype, "game.mod.debug.DebugMod");
            gso.modCls.push(DebugMod);
        })(debug = mod.debug || (mod.debug = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var debug;
        (function (debug) {
            var Component = eui.Component;
            var EditableText = eui.EditableText;
            var TouchEvent = egret.TouchEvent;
            var facade = base.facade;
            var VerticalAlign = egret.VerticalAlign;
            var GmCmdMdr = /** @class */ (function (_super) {
                __extends(GmCmdMdr, _super);
                function GmCmdMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", GmCmdView);
                    _this.isEasyHide = true;
                    return _this;
                }
                GmCmdMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btnSend, TouchEvent.TOUCH_TAP, this.onTapBtn);
                };
                GmCmdMdr.prototype.onShow = function () {
                    var params = this._showArgs.params;
                    for (var i = 0, len = params.length; i < len; i++) {
                        var txt = this._view.newLabel();
                        txt.prompt = params[i];
                        this._view.grpLab.addChild(txt);
                    }
                };
                GmCmdMdr.prototype.onHide = function () {
                    this._view.grpLab.removeChildren();
                };
                GmCmdMdr.prototype.onTapBtn = function (e) {
                    var args = [this._showArgs.cmd];
                    for (var i = 0, n = this._view.grpLab.numChildren; i < n; i++) {
                        var lab = this._view.grpLab.getChildAt(i);
                        if (lab.text == "" || lab.text == undefined) {
                            return;
                        }
                        args.push(lab.text);
                    }
                    var miscProxy = facade.retMod("04" /* Misc */).retProxy(4 /* Misc */);
                    miscProxy.sendGM(args.join(" "));
                    this.hide();
                };
                return GmCmdMdr;
            }(game.MdrBase));
            debug.GmCmdMdr = GmCmdMdr;
            __reflect(GmCmdMdr.prototype, "game.mod.debug.GmCmdMdr");
            var GmCmdView = /** @class */ (function (_super) {
                __extends(GmCmdView, _super);
                function GmCmdView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.debug.GmCmdSkin";
                    _this.horizontalCenter = 0;
                    _this.verticalCenter = 0;
                    return _this;
                }
                GmCmdView.prototype.newLabel = function () {
                    var txt = new EditableText();
                    txt.width = 168;
                    txt.height = 38;
                    txt.border = true;
                    txt.background = true;
                    txt.backgroundColor = 0x775858;
                    txt.promptColor = 0xe2d5d5;
                    txt.textColor = 0xffffff;
                    txt.verticalAlign = VerticalAlign.MIDDLE;
                    return txt;
                };
                return GmCmdView;
            }(Component));
            __reflect(GmCmdView.prototype, "GmCmdView");
        })(debug = mod.debug || (mod.debug = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var debug;
        (function (debug) {
            var Component = eui.Component;
            var ArrayCollection = eui.ArrayCollection;
            var ItemTapEvent = eui.ItemTapEvent;
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var Event = egret.Event;
            var GmListMdr = /** @class */ (function (_super) {
                __extends(GmListMdr, _super);
                function GmListMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", GmListView);
                    _this.isEasyHide = true;
                    return _this;
                }
                GmListMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._docs = game.getConfigByName("gm_doc.json" /* GmDoc */);
                    this._coll = new ArrayCollection();
                    this._view.list.dataProvider = this._coll;
                };
                GmListMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._coll.source = this._docs;
                };
                GmListMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.list, ItemTapEvent.ITEM_TAP, this.onClick);
                    addEventListener(this._view.btn_close, TouchEvent.TOUCH_TAP, this.hide);
                    addEventListener(this._view.input_txt, Event.CHANGE, this.onInputChange);
                    addEventListener(this._view.btnSend, TouchEvent.TOUCH_TAP, this.onClickSend);
                };
                GmListMdr.prototype.onClick = function (e) {
                    this.hide();
                    if (e.item.params.length == 0) {
                        var miscProxy = facade.retMod("04" /* Misc */).retProxy(4 /* Misc */);
                        miscProxy.sendGM(e.item.cmd);
                        return;
                    }
                    this.showView("2", e.item);
                };
                GmListMdr.prototype.onInputChange = function () {
                    var data;
                    if (this._view.input_txt.text != "") {
                        var input = this._view.input_txt.text;
                        data = [];
                        for (var _i = 0, _a = this._docs; _i < _a.length; _i++) {
                            var i = _a[_i];
                            if (i.name.indexOf(input) > -1 || i.cmd.indexOf(input) > -1) {
                                data.push(i);
                            }
                        }
                    }
                    else {
                        data = this._docs;
                    }
                    this._coll.source = data;
                };
                GmListMdr.prototype.onClickSend = function () {
                    var content = this._view.input_txt.text;
                    // if (content.indexOf("gzyyou.setdebug") === 0) {
                    //     let arr: string[] = content.split(".");
                    //     let isOnDebug = arr.length > 2 && arr[2] == "on";
                    //     let debugLv = isOnDebug ? arr.length > 3 ? parseInt(arr[3]) : 6 : 3;
                    //     if (typeof mini != "undefined") {
                    //         mini.setEnableDebug({enableDebug: isOnDebug, success: () => logger.setLv(debugLv, "debug")});
                    //     } else {
                    //         logger.setLv(debugLv, "debug")
                    //     }
                    //     this._view.input.text = "";
                    //     return;
                    // }
                    if (content.indexOf("$") == 0) {
                        if (DEBUG) {
                            if (content == "$GM") {
                                facade.showView("01" /* Debug */, "1");
                                return;
                            }
                        }
                        var miscProxy = facade.retMod("04" /* Misc */).retProxy(4 /* Misc */);
                        miscProxy.sendGM(content);
                        return;
                    }
                    if (DEBUG) {
                        if (content.indexOf("￥") == 0) {
                            content = content.slice(1, content.length);
                            var s = content.split(" ");
                            if (s.indexOf("jump") >= 0) {
                                var num = s.indexOf("jump");
                                var ss = s[num + 1];
                                if (ss == null)
                                    return;
                                if (ss.indexOf("_") > 0) { //测试跳转id
                                    var str = ss.split("_");
                                    mod.ViewMgr.getIns().showView(str.shift(), str.shift(), str);
                                }
                                else {
                                    mod.ViewMgr.getIns().showViewByID(Number(ss));
                                }
                            }
                            else if (s.indexOf("prop") >= 0) {
                                // let num: number = s.indexOf("prop");
                                // let ss: string = s[num + 1];
                                // if (ss == null) return;
                                // let des: string = "";
                                // let cnf: PropConfig[] = getConfigListByName(ConfigName.Prop);
                                // for (let i of cnf) {
                                //     if (i.name.indexOf(ss) > -1) {
                                //         des += i.name + "  " + i.index + "\n";
                                //     }
                                // }
                                // facade.showView(ModName.Main, MainViewType.RemindTips, des);
                            }
                            else if (content.indexOf("des") >= 0) {
                                // facade.showView(ModName.Main, MainViewType.RemindTips, "￥des");
                            }
                            else if (content.indexOf("addPropCnt") >= 0) {
                                var num = Number(s[1]);
                                gso.dbg_add_prop = num;
                                game.PromptBox.getIns().show("输入成功");
                            }
                            return;
                        }
                    }
                };
                return GmListMdr;
            }(game.MdrBase));
            debug.GmListMdr = GmListMdr;
            __reflect(GmListMdr.prototype, "game.mod.debug.GmListMdr");
            var GmListView = /** @class */ (function (_super) {
                __extends(GmListView, _super);
                function GmListView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.debug.GmListSkin";
                    _this.horizontalCenter = 0;
                    _this.verticalCenter = 0;
                    return _this;
                }
                return GmListView;
            }(Component));
            __reflect(GmListView.prototype, "GmListView");
        })(debug = mod.debug || (mod.debug = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=debug.js.map