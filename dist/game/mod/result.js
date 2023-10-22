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
        var result;
        (function (result) {
            var ResultWinContinueView = /** @class */ (function (_super) {
                __extends(ResultWinContinueView, _super);
                function ResultWinContinueView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.result.ResultWinContinueSkin";
                    return _this;
                }
                return ResultWinContinueView;
            }(eui.Component));
            result.ResultWinContinueView = ResultWinContinueView;
            __reflect(ResultWinContinueView.prototype, "game.mod.result.ResultWinContinueView");
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var result;
        (function (result) {
            var ResultMod = /** @class */ (function (_super) {
                __extends(ResultMod, _super);
                function ResultMod() {
                    return _super.call(this, "17" /* Result */) || this;
                }
                ResultMod.prototype.initCmd = function () {
                    var self = this;
                    self.regCmd("on_result_popup" /* ON_RESULT_POPUP */, result.onResultPopupCmd);
                };
                ResultMod.prototype.initModel = function () {
                    this.regProxy(17 /* Result */, result.ResultProxy);
                };
                ResultMod.prototype.initView = function () {
                    var self = this;
                    self.regMdr("01" /* ResultWin */, result.ResultWinMdr);
                    self.regMdr("04" /* ResultWinContinue */, result.ResultWinContinueMdr);
                    self.regMdr("02" /* ResultFail */, result.ResultFailMdr);
                    self.regMdr("03" /* ResultPass */, result.ResultPassMdr);
                    self.regMdr("05" /* ResultBelong */, result.ResultBelongMdr);
                };
                return ResultMod;
            }(game.ModBase));
            result.ResultMod = ResultMod;
            __reflect(ResultMod.prototype, "game.mod.result.ResultMod");
            gso.modCls.push(ResultMod);
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var result;
        (function (result) {
            var ResultModel = /** @class */ (function () {
                function ResultModel() {
                }
                return ResultModel;
            }());
            result.ResultModel = ResultModel;
            __reflect(ResultModel.prototype, "game.mod.result.ResultModel");
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var result;
        (function (result) {
            var s2c_instance_fin = msg.s2c_instance_fin;
            var delayCall = base.delayCall;
            var Handler = base.Handler;
            var facade = base.facade;
            var c2s_next_scene = msg.c2s_next_scene;
            var ResultProxy = /** @class */ (function (_super) {
                __extends(ResultProxy, _super);
                function ResultProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ResultProxy.prototype.getModel = function () {
                    return this._model;
                };
                ResultProxy.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    this._model = new result.ResultModel();
                    this.onProto(s2c_instance_fin, this.onResultBack, this);
                };
                /**结算信息返回*/
                ResultProxy.prototype.onResultBack = function (n) {
                    var msg = n.body;
                    this.is_success = msg.is_success;
                    var self = this;
                    delayCall(Handler.alloc(this, function () {
                        self.sendNt("on_result_popup" /* ON_RESULT_POPUP */, msg);
                    }), 1000);
                    if (msg.is_success && msg.type == 106 /* HangUp2 */) {
                        var _passProxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                        _passProxy.curIndex = msg.index + 1; // 闯关成功后，关卡数变化
                    }
                };
                /**
                 * 继续挑战
                 */
                ResultProxy.prototype.c2s_next_scene = function () {
                    var msg = new c2s_next_scene();
                    this.sendProto(msg);
                };
                return ResultProxy;
            }(game.ProxyBase));
            result.ResultProxy = ResultProxy;
            __reflect(ResultProxy.prototype, "game.mod.result.ResultProxy", ["base.IProxy"]);
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var result;
        (function (result) {
            var ResultBelongView = /** @class */ (function (_super) {
                __extends(ResultBelongView, _super);
                function ResultBelongView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.result.ResultBelongSkin";
                    return _this;
                }
                return ResultBelongView;
            }(eui.Component));
            result.ResultBelongView = ResultBelongView;
            __reflect(ResultBelongView.prototype, "game.mod.result.ResultBelongView");
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var result;
        (function (result) {
            var ResultFailView = /** @class */ (function (_super) {
                __extends(ResultFailView, _super);
                function ResultFailView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.result.ResultFailSkin";
                    return _this;
                }
                return ResultFailView;
            }(eui.Component));
            result.ResultFailView = ResultFailView;
            __reflect(ResultFailView.prototype, "game.mod.result.ResultFailView");
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var result;
        (function (result) {
            var ResultPassView = /** @class */ (function (_super) {
                __extends(ResultPassView, _super);
                function ResultPassView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.result.ResultPassSkin";
                    return _this;
                }
                return ResultPassView;
            }(eui.Component));
            result.ResultPassView = ResultPassView;
            __reflect(ResultPassView.prototype, "game.mod.result.ResultPassView");
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var result;
        (function (result) {
            var facade = base.facade;
            var onResultPopupCmd = /** @class */ (function (_super) {
                __extends(onResultPopupCmd, _super);
                function onResultPopupCmd() {
                    var _a;
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.execDict = (_a = {},
                        _a[108 /* Fuben */] = _this.result_fuben,
                        _a[117 /* Doufa */] = _this.result_doufa,
                        _a[120 /* Yijie */] = _this.result_yijie,
                        _a[121 /* YonghengYijie */] = _this.result_yijie,
                        _a[122 /* XianlvShilian */] = _this.result_xianvlShilian,
                        _a[123 /* Friend */] = _this.result_friend,
                        _a[124 /* Abyss */] = _this.result_abyss,
                        _a[125 /* Fengmo */] = _this.result_fengmo,
                        _a[128 /* XianlvDoufa */] = _this.result_xianlvdoufa,
                        _a);
                    _this._continueScene = [109 /* Forbidden */, 110 /* Xianta */];
                    return _this;
                }
                /**显示继续挑战的副本， ResultWinContinueMdr需要处理下*/
                onResultPopupCmd.prototype.exec = function (n) {
                    var msg = n.body;
                    var cur_type = msg.type; // 场景类型
                    var func = this.execDict[cur_type];
                    if (func) {
                        func.apply(null, [msg]); //特殊的结算界面
                        return;
                    }
                    if (!msg.is_success) {
                        gso.isBackMain = false;
                        //失败统一界面
                        facade.showView("17" /* Result */, "02" /* ResultFail */);
                        return;
                    }
                    if (msg.owner) {
                        //归属统一界面
                        facade.showView("17" /* Result */, "05" /* ResultBelong */, msg);
                        return;
                    }
                    this.result_win(msg);
                };
                /** 战斗胜利默认界面*/
                onResultPopupCmd.prototype.result_win = function (msg) {
                    if (this._continueScene.indexOf(msg.type) > -1) {
                        facade.showView("17" /* Result */, "04" /* ResultWinContinue */, msg);
                        return;
                    }
                    else if (msg.type == 111 /* Yuanling */) {
                        // todo 元灵试炼
                        facade.showView("49" /* Shilian */, "13" /* YuanLingResult */, msg);
                        return;
                    }
                    facade.showView("17" /* Result */, "01" /* ResultWin */, msg); /** 战斗胜利默认界面*/
                };
                /** 个人副本*/
                onResultPopupCmd.prototype.result_fuben = function (msg) {
                    facade.showView("49" /* Shilian */, "03" /* ResultFuben */, msg);
                };
                /** 斗法*/
                onResultPopupCmd.prototype.result_doufa = function (msg) {
                    if (msg.is_success) {
                        //胜利界面
                        facade.showView("52" /* Compete */, "25" /* DoufaWin */, msg);
                    }
                    else {
                        //失败界面
                        facade.showView("52" /* Compete */, "26" /* DoufaFail */, msg);
                    }
                };
                /** 异界*/
                onResultPopupCmd.prototype.result_yijie = function (msg) {
                    if (!msg.reward) {
                        return;
                    }
                    if (msg.value == 2) {
                        //结算界面2
                        facade.showView("56" /* Yijie */, "07" /* YijieResult2 */, msg);
                    }
                    else {
                        facade.showView("56" /* Yijie */, "05" /* YijieResult */, msg);
                    }
                };
                /**仙侣试炼*/
                onResultPopupCmd.prototype.result_xianvlShilian = function (msg) {
                    facade.showView("58" /* Xianyuan */, "18" /* ShilianResult */, msg);
                };
                /** 好友切磋*/
                onResultPopupCmd.prototype.result_friend = function (msg) {
                    facade.showView("59" /* Friend */, "04" /* FriendResult */, msg);
                };
                onResultPopupCmd.prototype.result_abyss = function (msg) {
                };
                onResultPopupCmd.prototype.result_fengmo = function (msg) {
                    facade.showView("61" /* More */, "85" /* FengmoResult */, msg);
                };
                onResultPopupCmd.prototype.result_xianlvdoufa = function (msg) {
                    if (msg.is_success) {
                        facade.showView("58" /* Xianyuan */, "23" /* XianlvDoufaWin */, msg);
                    }
                    else {
                        facade.showView("58" /* Xianyuan */, "24" /* XianlvDoufaFail */, msg);
                    }
                };
                return onResultPopupCmd;
            }(game.CmdBase));
            result.onResultPopupCmd = onResultPopupCmd;
            __reflect(onResultPopupCmd.prototype, "game.mod.result.onResultPopupCmd");
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var result;
        (function (result) {
            var ResultWinView = /** @class */ (function (_super) {
                __extends(ResultWinView, _super);
                function ResultWinView() {
                    var _this = _super.call(this) || this;
                    _this.skinName = "skins.result.ResultWinSkin";
                    return _this;
                }
                return ResultWinView;
            }(eui.Component));
            result.ResultWinView = ResultWinView;
            __reflect(ResultWinView.prototype, "game.mod.result.ResultWinView");
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var result;
        (function (result) {
            var Handler = base.Handler;
            var delayCall = base.delayCall;
            var ResultBelongMdr = /** @class */ (function (_super) {
                __extends(ResultBelongMdr, _super);
                function ResultBelongMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", result.ResultBelongView);
                    _this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    return _this;
                }
                ResultBelongMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                };
                ResultBelongMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    this._view.closeTips.visible = false;
                    this.updateReward();
                    this.updateBelong();
                    this.removeEft();
                    this.addEftByParent("victory" /* Victory */, this._view.grp_eft, 0, 0, 0, null, 1, 1, false);
                    this.addEftByParent("zhandoushengli1" /* ZhanDouShengli1 */, this._view.grp_eft2);
                };
                ResultBelongMdr.prototype.onHide = function () {
                    mod.SceneUtil.exitScene();
                    _super.prototype.onHide.call(this);
                };
                //显示奖励
                ResultBelongMdr.prototype.updateReward = function () {
                    var info = this._showArgs;
                    this._view.resultReward.updateRewardList(info.reward, Handler.alloc(this, this.onRewardTweenEnd));
                };
                //显示归属
                ResultBelongMdr.prototype.updateBelong = function () {
                    var info = this._showArgs;
                    var ownerInfo = info.owner;
                    this._view.head.updateHeadShow(ownerInfo.head, ownerInfo.head_frame, ownerInfo.sex);
                    this._view.lab_name.text = ownerInfo.name;
                };
                /**********************奖励表现相关**********************/
                //结束动画后执行
                ResultBelongMdr.prototype.onRewardTweenEnd = function () {
                    var _this = this;
                    this._view.closeTips.visible = true;
                    this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
                    delayCall(Handler.alloc(this, function () {
                        _this.isEasyHide = true; //动画表现结束后设置为可点击
                    }), 200);
                };
                return ResultBelongMdr;
            }(game.EffectMdrBase));
            result.ResultBelongMdr = ResultBelongMdr;
            __reflect(ResultBelongMdr.prototype, "game.mod.result.ResultBelongMdr");
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var result;
        (function (result) {
            var facade = base.facade;
            var Handler = base.Handler;
            var ResultFailMdr = /** @class */ (function (_super) {
                __extends(ResultFailMdr, _super);
                function ResultFailMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", result.ResultFailView);
                    _this._btnList = [];
                    _this.isEasyHide = true;
                    return _this;
                }
                ResultFailMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._sceneProxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                };
                ResultFailMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                ResultFailMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.addEftByParent("default" /* Default */, this._view.grp_eft, 0, 0, 0, null, 1, 1, false);
                    this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
                    //
                    this._view.icon_group.removeChildren();
                    this._btnList.length = 0;
                    var jumpData = null;
                    var jumpId = 0;
                    if (!mod.PayUtil.checkFirstCharge()) {
                        //未来首充过
                        jumpData = game.JumpDataList[40 /* FirstCharge */];
                        jumpId = 40 /* FirstCharge */;
                    }
                    else if (mod.PayUtil.checkTequanling()) {
                        //特权
                        jumpData = game.JumpDataList[44 /* PrerogativeWrit */];
                        jumpId = 44 /* PrerogativeWrit */;
                    }
                    else {
                        //充值
                        jumpData = game.JumpDataList[46 /* StoreXianyu */];
                        jumpId = 46 /* StoreXianyu */;
                    }
                    this.addBtn(jumpData, jumpId);
                    var proxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                    var curIndex = proxy.curIndex;
                    var gateCfg = game.getConfigByNameId("gate1.json" /* Gate */, curIndex); //240000001
                    var faulttips = gateCfg.faulttips;
                    if (!faulttips || faulttips.length <= 0) {
                        return;
                    }
                    for (var i = 0; i < faulttips.length; i++) {
                        var jumpId_1 = faulttips[i];
                        var jumpData_1 = game.JumpDataList[jumpId_1];
                        this.addBtn(jumpData_1, jumpId_1);
                    }
                };
                ResultFailMdr.prototype.addBtn = function (data, jumpId) {
                    var btn = new mod.Btn();
                    btn.skinName = "skins.common.CommonBtn1Skin";
                    btn.iconDisplay.source = data.icon || "huashen_task_tab1";
                    btn.width = 94;
                    btn.height = 94;
                    btn["jumpId"] = jumpId;
                    this._view.icon_group.addChild(btn);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(btn, egret.TouchEvent.TOUCH_TAP, this.jumpFunc, this);
                };
                //
                ResultFailMdr.prototype.jumpFunc = function (e) {
                    this.hide();
                    if (e.target instanceof mod.Btn) {
                        var jumpId = e.target["jumpId"];
                        mod.ViewMgr.getIns().showViewByID(jumpId);
                    }
                };
                ResultFailMdr.prototype.onHide = function () {
                    mod.SceneUtil.exitScene();
                    this.removeEft();
                    _super.prototype.onHide.call(this);
                };
                return ResultFailMdr;
            }(game.EffectMdrBase));
            result.ResultFailMdr = ResultFailMdr;
            __reflect(ResultFailMdr.prototype, "game.mod.result.ResultFailMdr");
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var result;
        (function (result) {
            var facade = base.facade;
            var Handler = base.Handler;
            var ResultPassMdr = /** @class */ (function (_super) {
                __extends(ResultPassMdr, _super);
                function ResultPassMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", result.ResultPassView);
                    _this.isEasyHide = true;
                    return _this;
                }
                ResultPassMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._passProxy = facade.retMod("42" /* Pass */).retProxy(9 /* Pass */);
                };
                ResultPassMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                };
                ResultPassMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    var step = this._passProxy.getStepByIdx(this._showArgs.index);
                    if (this._showArgs) {
                        this.addBmpFont(step + "", game.BmpTextCfg[100 /* CommonPower */], this._view.grp_1, true, 1, true);
                        this.addBmpFont((step + 1) + "", game.BmpTextCfg[100 /* CommonPower */], this._view.grp_2, true, 1, true);
                    }
                    var str = game.StringUtil.substitute(game.getLanById("trial_tips9" /* trial_tips9 */), [(step + 1)]) + game.getLanById("boss_cue5" /* boss_cue5 */);
                    this._view.lab_func1.text = str;
                    this._view.lab_func2.text = str;
                    this._view.closeTips.updateShow(5, Handler.alloc(this, this.hide));
                };
                ResultPassMdr.prototype.onHide = function () {
                    _super.prototype.onHide.call(this);
                };
                return ResultPassMdr;
            }(game.EffectMdrBase));
            result.ResultPassMdr = ResultPassMdr;
            __reflect(ResultPassMdr.prototype, "game.mod.result.ResultPassMdr");
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var result;
        (function (result) {
            var TimeMgr = base.TimeMgr;
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var ResultWinContinueMdr = /** @class */ (function (_super) {
                __extends(ResultWinContinueMdr, _super);
                function ResultWinContinueMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", result.ResultWinContinueView);
                    _this.isEasyHide = false; //设置为不可点击
                    return _this;
                }
                ResultWinContinueMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                    this._shilianProxy = facade.retMod("49" /* Shilian */).retProxy(194 /* Shilian */);
                    this._proxy = this.retProxy(17 /* Result */);
                };
                ResultWinContinueMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(this._view.btn_exit, TouchEvent.TOUCH_TAP, this.onClickExit);
                    addEventListener(this._view.btn_go, TouchEvent.TOUCH_TAP, this.onClickGo);
                };
                ResultWinContinueMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this._time = 10;
                    this._hasOper = false;
                    this.updateWinPassShow();
                    this.updateReward();
                    this.updateHurtList();
                    this.updateTimeToClose();
                    TimeMgr.addUpdateItem(this, 1000);
                    this.removeEft();
                    this.addEftByParent("victory" /* Victory */, this._view.grp_eft, 0, 0, 0, null, 1, 1, false);
                    this.addEftByParent("zhandoushengli1" /* ZhanDouShengli1 */, this._view.grp_eft2);
                };
                ResultWinContinueMdr.prototype.onHide = function () {
                    if (!this._hasOper) {
                        mod.SceneUtil.exitScene();
                    }
                    TimeMgr.removeUpdateItem(this);
                    _super.prototype.onHide.call(this);
                };
                //倒计时
                ResultWinContinueMdr.prototype.update = function (time) {
                    this.updateTimeToClose();
                };
                ResultWinContinueMdr.prototype.updateTimeToClose = function () {
                    this._time--;
                    if (this._showExit) {
                        this._view.btn_exit.labelDisplay.text = "\u9000\u51FA(" + this._time + ")";
                        if (this._time <= 0) {
                            this.onClickExit();
                            TimeMgr.removeUpdateItem(this);
                        }
                    }
                    else {
                        this._view.btn_go.label = "\u7EE7\u7EED(" + this._time + ")";
                        if (this._time <= 0) {
                            this.onClickGo();
                            TimeMgr.removeUpdateItem(this);
                        }
                    }
                };
                //显示
                ResultWinContinueMdr.prototype.updateWinPassShow = function () {
                    this._showExit = this.isShowExit();
                    this._view.currentState = this._showExit ? "exit" : "normal";
                    this._view.btn_exit.labelDisplay.text = "\u9000\u51FA";
                    this._view.btn_go.label = "\u7EE7\u7EED";
                };
                //显示奖励
                ResultWinContinueMdr.prototype.updateReward = function () {
                    var info = this._showArgs;
                    this._view.resultReward.updateRewardList(info.reward);
                };
                //显示伤害
                ResultWinContinueMdr.prototype.updateHurtList = function () {
                    var info = this._showArgs;
                    this._view.resultHurt.updateHurtList(info.damage_list);
                };
                ResultWinContinueMdr.prototype.onClickExit = function () {
                    mod.SceneUtil.exitScene();
                    this._hasOper = true;
                    this.hide();
                };
                ResultWinContinueMdr.prototype.onClickGo = function () {
                    this._proxy.c2s_next_scene();
                    this.sendNt("fuben_continue_battle" /* FUBEN_CONTINUE_BATTLE */);
                    this._hasOper = true;
                    this.hide();
                };
                /**是否只显示退出按钮，满级或者小于推荐战力*/
                ResultWinContinueMdr.prototype.isShowExit = function () {
                    switch (this._showArgs.type) {
                        case 109 /* Forbidden */:
                            return this._shilianProxy.isEndSmallGate;
                        case 110 /* Xianta */:
                            return this._shilianProxy.isXiantaShowExit();
                    }
                    //todo
                    return false;
                };
                return ResultWinContinueMdr;
            }(game.EffectMdrBase));
            result.ResultWinContinueMdr = ResultWinContinueMdr;
            __reflect(ResultWinContinueMdr.prototype, "game.mod.result.ResultWinContinueMdr", ["base.UpdateItem"]);
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var result;
        (function (result) {
            var Handler = base.Handler;
            var delayCall = base.delayCall;
            var ResultWinMdr = /** @class */ (function (_super) {
                __extends(ResultWinMdr, _super);
                function ResultWinMdr() {
                    var _this = _super.call(this, game.Layer.modal) || this;
                    _this._view = _this.mark("_view", result.ResultWinView);
                    _this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    return _this;
                }
                ResultWinMdr.prototype.onInit = function () {
                    _super.prototype.onInit.call(this);
                };
                ResultWinMdr.prototype.onShow = function () {
                    _super.prototype.onShow.call(this);
                    this.isEasyHide = false; //设置为不可点击，动画表现结束后设置为可点击
                    this._view.closeTips.visible = false;
                    this.updateReward();
                    this.updateHurtList();
                    this.removeEft();
                    this.addEftByParent("victory" /* Victory */, this._view.grp_eft, 0, 0, 0, null, 1, 1, false);
                    this.addEftByParent("zhandoushengli1" /* ZhanDouShengli1 */, this._view.grp_eft2);
                };
                ResultWinMdr.prototype.onHide = function () {
                    mod.SceneUtil.exitScene();
                    // if(this._showArgs.type == SceneType.HangUp2) {           // 挂机战斗，弹出通关界面
                    //     facade.showView(ModName.Result, ResultViewType.ResultPass, this._showArgs);
                    // }
                    this.removeEft();
                    _super.prototype.onHide.call(this);
                };
                //显示奖励
                ResultWinMdr.prototype.updateReward = function () {
                    var info = this._showArgs;
                    this._view.resultReward.updateRewardList(info.reward, Handler.alloc(this, this.onRewardTweenEnd));
                };
                //显示伤害
                ResultWinMdr.prototype.updateHurtList = function () {
                    var info = this._showArgs;
                    this._view.resultHurt.updateHurtList(info.damage_list);
                };
                /**********************奖励表现相关**********************/
                //结束动画后执行
                ResultWinMdr.prototype.onRewardTweenEnd = function () {
                    var _this = this;
                    this._view.closeTips.visible = true;
                    this._view.closeTips.updateShow(10, Handler.alloc(this, this.hide));
                    delayCall(Handler.alloc(this, function () {
                        _this.isEasyHide = true; //动画表现结束后设置为可点击
                    }), 200);
                };
                return ResultWinMdr;
            }(game.EffectMdrBase));
            result.ResultWinMdr = ResultWinMdr;
            __reflect(ResultWinMdr.prototype, "game.mod.result.ResultWinMdr");
        })(result = mod.result || (mod.result = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=result.js.map