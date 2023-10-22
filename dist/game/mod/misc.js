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
        var misc;
        (function (misc) {
            var MiscMod = /** @class */ (function (_super) {
                __extends(MiscMod, _super);
                function MiscMod() {
                    return _super.call(this, "04" /* Misc */) || this;
                }
                MiscMod.prototype.initCmd = function () {
                    var self = this;
                    self.regCmd("game_connect_lost" /* GAME_CONNECT_LOST */, misc.GameConnectLostCmd);
                    self.regCmd("init_misc" /* INIT_MISC */, misc.InitMiscCmd);
                    self.regCmd("on_role_login" /* ON_ROLE_LOGIN */, misc.OnRoleLoginCmd);
                    self.regCmd("start_game" /* START_GAME */, misc.StartGameCmd);
                    self.regCmd("server_err" /* SERVER_ERR */, misc.ServerErrCmd);
                    //self.regCmd(MiscEvent.ON_RECEIVE_SETTING, OnReceiveSettingCmd);
                };
                MiscMod.prototype.initModel = function () {
                    this.regProxy(4 /* Misc */, misc.MiscProxy);
                };
                MiscMod.prototype.initView = function () {
                };
                return MiscMod;
            }(game.ModBase));
            misc.MiscMod = MiscMod;
            __reflect(MiscMod.prototype, "game.mod.misc.MiscMod");
            gso.modCls.push(MiscMod);
        })(misc = mod.misc || (mod.misc = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var misc;
        (function (misc) {
            var GameConnectLostCmd = /** @class */ (function (_super) {
                __extends(GameConnectLostCmd, _super);
                function GameConnectLostCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                GameConnectLostCmd.prototype.exec = function (n) {
                    this.sendNt("stop_sync_time" /* STOP_SYNC_TIME */);
                    var data = { clearAll: true };
                    this.sendNt("clean_scene" /* CLEAN_SCENE */, data);
                };
                return GameConnectLostCmd;
            }(game.CmdBase));
            misc.GameConnectLostCmd = GameConnectLostCmd;
            __reflect(GameConnectLostCmd.prototype, "game.mod.misc.GameConnectLostCmd");
        })(misc = mod.misc || (mod.misc = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var misc;
        (function (misc) {
            var InitMiscCmd = /** @class */ (function (_super) {
                __extends(InitMiscCmd, _super);
                function InitMiscCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                InitMiscCmd.prototype.exec = function (n) {
                    _super.prototype.exec.call(this, n);
                    this.owner.unregCmd("init_misc" /* INIT_MISC */);
                    new misc.MiscMdr();
                };
                return InitMiscCmd;
            }(game.CmdBase));
            misc.InitMiscCmd = InitMiscCmd;
            __reflect(InitMiscCmd.prototype, "game.mod.misc.InitMiscCmd");
        })(misc = mod.misc || (mod.misc = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var misc;
        (function (misc) {
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var OnRoleLoginCmd = /** @class */ (function (_super) {
                __extends(OnRoleLoginCmd, _super);
                function OnRoleLoginCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OnRoleLoginCmd.prototype.exec = function (n) {
                    game.LogUtil.printLogin("服务器返回角色信息之后，进入 OnRoleLoginCmd 准备初始化游戏层");
                    var s2c = n.body;
                    var proxy = this.retProxy(4 /* Misc */);
                    proxy.intiGameSetting(s2c.settings);
                    if (!proxy.data.gameInit) {
                        game.LogUtil.printLogin("游戏层级初始化");
                        game.initMainLayer();
                        this.sendNt("init_misc" /* INIT_MISC */);
                        this.sendNt("init_scene_mdr" /* INIT_SCENE_MDR */);
                        proxy.data.gameInit = true;
                    }
                    var roleProxy = facade.retMod("06" /* Role */).retProxy(5 /* Role */);
                    roleProxy.updateRole(s2c.propertys, s2c.attrs);
                    roleProxy.updateDay(s2c.server_day, s2c.login_day);
                    this.sendNt("on_receive_setting" /* ON_RECEIVE_SETTING */);
                    this.sendNt("start_sync_time" /* START_SYNC_TIME */);
                    var power = game.RoleVo.ins.showpower ? game.RoleVo.ins.showpower.toNumber() : 0;
                    var vipLv = mod.VipUtil.getShowVipLv();
                    var roleid = gso.roleId.toString();
                    if (gzyyou.sdk.reportUseInfo)
                        gzyyou.sdk.reportUseInfo(game.RoleVo.ins.level, power, game.RoleVo.ins.name, vipLv, roleid);
                    if (gzyyou.sdk.onPowerUpdate) {
                        var time = TimeMgr.time.serverTimeSecond;
                        gzyyou.sdk.onPowerUpdate(power, time);
                    }
                };
                return OnRoleLoginCmd;
            }(game.CmdBase));
            misc.OnRoleLoginCmd = OnRoleLoginCmd;
            __reflect(OnRoleLoginCmd.prototype, "game.mod.misc.OnRoleLoginCmd");
        })(misc = mod.misc || (mod.misc = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var misc;
        (function (misc) {
            var ServerErrCmd = /** @class */ (function (_super) {
                __extends(ServerErrCmd, _super);
                function ServerErrCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ServerErrCmd.prototype.exec = function (n) {
                    var s2c = n.body;
                    mod.ViewMgr.getIns().show(s2c.title + "\n" + s2c.body);
                };
                return ServerErrCmd;
            }(game.CmdBase));
            misc.ServerErrCmd = ServerErrCmd;
            __reflect(ServerErrCmd.prototype, "game.mod.misc.ServerErrCmd");
        })(misc = mod.misc || (mod.misc = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var misc;
        (function (misc) {
            var BgMgr = game.BgMgr;
            var facade = base.facade;
            var TimeMgr = base.TimeMgr;
            var StartGameCmd = /** @class */ (function (_super) {
                __extends(StartGameCmd, _super);
                function StartGameCmd() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                StartGameCmd.prototype.exec = function (n) {
                    //gAlert("....StartGameCmd....");
                    BgMgr.getIns().setBg(null);
                    // BgMgr.getIns().setBigBg(null);
                    this.initSetInfo();
                    this._list = [
                        "03" /* MainLeft */,
                        "04" /* MainRight */,
                        "01" /* MainTop */,
                        "05" /* MainMenu */,
                        "02" /* MainBottom */,
                    ];
                    TimeMgr.addUpdateItem(this);
                    //迁移到MainProxy请求协议
                    var mainProxy = facade.retMod("05" /* Main */).retProxy(3 /* Main */);
                    mainProxy.init();
                };
                StartGameCmd.prototype.update = function () {
                    if (this._list.length == 0) {
                        TimeMgr.removeUpdateItem(this);
                        return;
                    }
                    if (this._list.length) {
                        var type = this._list.shift();
                        facade.showView("05" /* Main */, type);
                    }
                };
                StartGameCmd.prototype.initSetInfo = function () {
                    // let proxy: MiscProxy = this.retProxy(ProxyType.Misc);
                    // let json = proxy.getSetting(SettingKey.SetInfo);
                    // let arr;
                    // if (json) {
                    //     arr = JSON.parse(json);
                    // } else {
                    //     if(gzyyou.sdk.checkIsCurChannel && gzyyou.sdk.checkIsCurChannel(CHANNEL_NAME.SHENGYE)){
                    //         arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];//盛也不自动执行任务
                    //     }
                    //     else {
                    //         arr = [0, 0, 0, 0, 0, 0, 0, 0, 1];//设置左边竖着保存
                    //     }
                    // }
                    game.SoundMgr.ins.enableSound(!gso.isBgMusic);
                    game.SoundMgr.ins.soundEftEnabled = !gso.isGameMusic;
                    if (gso.autoHuashen == undefined) {
                        //未设值时，默认设置为勾选
                        var proxy = this.retProxy(4 /* Misc */);
                        proxy.setSetting("autoHuashen" /* autoHuashen */, "1");
                    }
                    // gso.isCloseBgSound = !!arr[0];
                    // gso.isCloseSoundEft = !!arr[1];
                    // gso.isHideOtherPlayer = !!arr[2];
                    // gso.isHideOtherPartner = !!arr[3];
                    // gso.isHideOtherEft = !!arr[4];
                    // gso.isHideSelfEft = !!arr[5];
                    // gso.isHideSceneShake = !!arr[6];
                    // gso.isAutoUseGodSkill = !!arr[7];
                    // gso.isAutoTask = !!arr[8];
                    // let t_proxy: ITaskProxy = facade.retMod(ModName.Task).retProxy(ProxyType.Task);
                    // t_proxy.stopMainTaskFlag = !gso.isAutoTask;
                };
                return StartGameCmd;
            }(game.CmdBase));
            misc.StartGameCmd = StartGameCmd;
            __reflect(StartGameCmd.prototype, "game.mod.misc.StartGameCmd", ["base.UpdateItem"]);
        })(misc = mod.misc || (mod.misc = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var misc;
        (function (misc) {
            var MiscModel = /** @class */ (function () {
                function MiscModel() {
                    this.gameSetting = null;
                    this.isGou = false; //分享兑换取消红点
                    this._adCnt = 0;
                }
                MiscModel.prototype.setSetting = function (key, val) {
                    if (null == this.gameSetting) {
                        this.gameSetting = {};
                    }
                    this.gameSetting[key] = val;
                };
                Object.defineProperty(MiscModel.prototype, "adCnt", {
                    get: function () {
                        return this._adCnt;
                    },
                    enumerable: true,
                    configurable: true
                });
                MiscModel.prototype.setAdCnt = function (v) {
                    this._adCnt = v;
                };
                return MiscModel;
            }());
            misc.MiscModel = MiscModel;
            __reflect(MiscModel.prototype, "game.mod.misc.MiscModel");
        })(misc = mod.misc || (mod.misc = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var misc;
        (function (misc) {
            var s2c_ping = msg.s2c_ping;
            var c2s_setting = msg.c2s_setting;
            var c2s_ping = msg.c2s_ping;
            var s2c_sync_time = msg.s2c_sync_time;
            var TimeMgr = base.TimeMgr;
            var c2s_gm_code = msg.c2s_gm_code;
            var s2c_tips = msg.s2c_tips;
            var s2c_war_tips = msg.s2c_war_tips;
            var c2s_sync_time = msg.c2s_sync_time;
            var s2c_server_msgbox = msg.s2c_server_msgbox;
            var s2c_login_role = msg.s2c_login_role;
            var sdk = gzyyou.sdk;
            var c2s_change_name_sex = msg.c2s_change_name_sex;
            var facade = base.facade;
            var MiscProxy = /** @class */ (function (_super) {
                __extends(MiscProxy, _super);
                function MiscProxy() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Object.defineProperty(MiscProxy.prototype, "data", {
                    get: function () {
                        return this._data;
                    },
                    enumerable: true,
                    configurable: true
                });
                MiscProxy.prototype.intiGameSetting = function (settings) {
                    this._data.gameSetting = {};
                    if (settings) {
                        for (var i = 0, len = settings.length; i < len; i++) {
                            this.initSetting(settings[i].key, settings[i].value);
                        }
                    }
                };
                MiscProxy.prototype.initSetting = function (key, val) {
                    this._data.gameSetting[key] = val;
                    this.updateSetting(key, val);
                };
                MiscProxy.prototype.updateSetting = function (key, val) {
                    if (key == "3" /* gameModel */) {
                        if (!val || val == "3") {
                            //屏蔽其他玩家
                            gso.isHideOtherPlayer = false;
                            //屏蔽其他玩家跟随
                            gso.isHideOtherPlayerPet = false;
                            //屏蔽其他玩家特效
                            gso.isHideOtherPlayerEft = false;
                            //屏蔽自己特效
                            gso.isHideSeflEft = false;
                        }
                        else if (val == "2") {
                            //屏蔽其他玩家跟随
                            gso.isHideOtherPlayerPet = true;
                            //屏蔽其他玩家特效
                            gso.isHideOtherPlayerEft = true;
                            //屏蔽其他玩家
                            gso.isHideOtherPlayer = false;
                            //屏蔽自己特效
                            gso.isHideSeflEft = false;
                        }
                        else if (val == "1") {
                            //屏蔽其他玩家
                            gso.isHideOtherPlayer = true;
                            //屏蔽其他玩家跟随
                            gso.isHideOtherPlayerPet = true;
                            //屏蔽其他玩家特效
                            gso.isHideOtherPlayerEft = true;
                            //屏蔽自己特效
                            gso.isHideSeflEft = true;
                        }
                    }
                    else if (key == "gameShake" /* gameShake */) {
                        gso.isHideSceneShake = val == "1";
                    }
                    else if (key == "bgMusic" /* bgMusic */) {
                        gso.isBgMusic = val == "1";
                    }
                    else if (key == "gameMusic" /* gameMusic */) {
                        gso.isGameMusic = val == "1";
                    }
                    else if (key == "autoHuashen" /* autoHuashen */) {
                        gso.autoHuashen = val == "1";
                    }
                    else if (key == "fubenChallenge" /* fubenChallenge */) {
                        gso.fubenChallenge = val == "1";
                    }
                };
                MiscProxy.prototype.getSetting = function (key) {
                    if (null == this._data.gameSetting) {
                        return null;
                    }
                    return this._data.gameSetting[key];
                };
                MiscProxy.prototype.getSettingN = function (key) {
                    if (null == this._data.gameSetting) {
                        return null;
                    }
                    return Number(this._data.gameSetting[key]);
                };
                Object.defineProperty(MiscProxy.prototype, "lastSyncTick", {
                    get: function () {
                        return this._data.lastSyncTick;
                    },
                    set: function (v) {
                        this._data.lastSyncTick = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MiscProxy.prototype, "isGou", {
                    get: function () {
                        return this._data.isGou;
                    },
                    set: function (v) {
                        this._data.isGou = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                MiscProxy.prototype.initialize = function () {
                    this._data = new misc.MiscModel();
                    Object.defineProperty(gso, "openPay", {
                        get: function () {
                            return gso.open_pay == "1" && !sdk.payDisabled;
                        }
                    });
                    this.onProto(s2c_login_role, this.onRoleLogin, this);
                    this.onProto(s2c_ping, this.onPing, this);
                    this.onProto(s2c_sync_time, this.onSyncTime, this);
                    this.onProto(s2c_server_msgbox, this.onServerMsgBox, this);
                    this.onProto(s2c_tips, this.onTips, this);
                    this.onProto(s2c_war_tips, this.onTips, this);
                };
                MiscProxy.prototype.onRoleLogin = function (ntfy) {
                    game.LogUtil.printLogin("服务器返回角色信息");
                    var msg = ntfy.body;
                    TimeMgr.setServerTime(msg.now, msg.starttime);
                    game.RoleVo.ins.starttime = msg.starttime;
                    game.RoleVo.ins.server_open_date = msg.server_open_date;
                    //this.sendNt(MiscEvent.ON_ROLE_LOGIN, msg);
                    this.intiGameSetting(msg.settings);
                    //更新角色信息
                    var roleProxy = facade.retMod("06" /* Role */).retProxy(5 /* Role */);
                    roleProxy.updateRole(msg.propertys, msg.attrs);
                    roleProxy.updateDay(msg.server_day, msg.login_day);
                    //this.sendNt(MiscEvent.ON_RECEIVE_SETTING);
                    //同步系统时间
                    this.sendNt("start_sync_time" /* START_SYNC_TIME */);
                    if (!this.data.gameInit) {
                        game.LogUtil.printLogin("游戏层级初始化");
                        game.initMainLayer();
                        //
                        this.sendNt("init_misc" /* INIT_MISC */);
                        //
                        this.sendNt("init_scene_mdr" /* INIT_SCENE_MDR */);
                        this.data.gameInit = true;
                    }
                    if (logger && logger.clock) {
                        logger.clock.setSt(msg.now, msg.starttime);
                    }
                    gzyyou.sdk.loadReport("s2c_signin_account" /* S2C_ROLE_ENTER */);
                    //上报用户信息
                    if (gzyyou.sdk.reportUseInfo) {
                        var power = game.RoleVo.ins.showpower ? game.RoleVo.ins.showpower.toNumber() : 0;
                        var vipLv = mod.VipUtil.getShowVipLv();
                        var roleid = gso.roleId.toString();
                        gzyyou.sdk.reportUseInfo(game.RoleVo.ins.level, power, game.RoleVo.ins.name, vipLv, roleid);
                    }
                    // if (gzyyou.sdk.onPowerUpdate) {
                    //     let time: number = TimeMgr.time.serverTimeSecond;
                    //     gzyyou.sdk.onPowerUpdate(power, time);
                    // }
                };
                MiscProxy.prototype.onTips = function (ntfy) {
                    var msg = ntfy.body;
                    var str = game.getConfigByNameId("tips_client.json" /* ServerTips */, msg.index);
                    str = game.StringUtil.substitute(str, msg.params);
                    if (!str || str.trim() == "") {
                        str = "s2c_tips提示不存在" + msg.index;
                    }
                    game.PromptBox.getIns().show(str);
                };
                MiscProxy.prototype.onSyncTime = function (ntfy) {
                    var msg = ntfy.body;
                    TimeMgr.setServerTime(msg.now);
                    logger.clock.setSt(msg.now);
                    this._data.lastSyncTick = TimeMgr.time.time;
                };
                MiscProxy.prototype.onServerMsgBox = function (n) {
                    var s2c = n.body;
                    this.sendNt("server_err" /* SERVER_ERR */, s2c);
                };
                MiscProxy.prototype.onPing = function () {
                    var c2s = new c2s_ping();
                    this.sendProto(c2s);
                };
                MiscProxy.prototype.setSetting = function (key, val, now) {
                    if (now === void 0) { now = false; }
                    this._data.setSetting(key, val);
                    this.updateSetting(key, val);
                    var c2s = new c2s_setting();
                    c2s.key = key;
                    c2s.value = val;
                    this.sendProto(c2s);
                };
                MiscProxy.prototype.sendGM = function (text) {
                    var c2s = new c2s_gm_code();
                    c2s.gm_str = text;
                    this.sendProto(c2s);
                };
                //修改姓名和性别
                MiscProxy.prototype.changeName = function (name, sex) {
                    var c = new c2s_change_name_sex();
                    c.new_name = name;
                    c.new_sex = sex;
                    this.sendProto(c);
                };
                MiscProxy.prototype.syncTime = function () {
                    this.sendProto(new c2s_sync_time());
                };
                return MiscProxy;
            }(game.ProxyBase));
            misc.MiscProxy = MiscProxy;
            __reflect(MiscProxy.prototype, "game.mod.misc.MiscProxy", ["game.mod.IMiscProxy", "base.IProxy"]);
        })(misc = mod.misc || (mod.misc = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
var game;
(function (game) {
    var mod;
    (function (mod) {
        var misc;
        (function (misc) {
            var facade = base.facade;
            var TouchEvent = egret.TouchEvent;
            var TimeMgr = base.TimeMgr;
            var MainGPlayer = game.scene.MainGPlayer;
            var Point = egret.Point;
            var MiscMdr = /** @class */ (function (_super) {
                __extends(MiscMdr, _super);
                function MiscMdr() {
                    var _this = _super.call(this, null) || this;
                    _this._timeout = 0;
                    _this._enableSyncTime = false;
                    _this._point = new Point();
                    _this.newView();
                    _this.init();
                    return _this;
                }
                MiscMdr.prototype.init = function () {
                    this._proxy = facade.retMod("04" /* Misc */).retProxy(4 /* Misc */);
                    this.addListeners();
                    TimeMgr.addUpdateItem(this, MiscMdr.UpdateInterval);
                };
                MiscMdr.prototype.newView = function () {
                    this._effHub = new game.UIEftHub(game.Layer.tip);
                };
                MiscMdr.prototype.show = function (obj) {
                };
                MiscMdr.prototype.addListeners = function () {
                    _super.prototype.addListeners.call(this);
                    var addEventListener = this.onEgret.bind(this);
                    addEventListener(gso.gameStage, TouchEvent.TOUCH_TAP, this.onTap);
                    this.onNt("start_sync_time" /* START_SYNC_TIME */, this.startSyncTime, this);
                    this.onNt("stop_sync_time" /* STOP_SYNC_TIME */, this.stopSyncTime, this);
                    this.onNt("on_activate" /* ON_ACTIVATE */, this.onActivate, this);
                    this.onNt("on_deactivate" /* ON_DEACTIVATE */, this.onDeactivate, this);
                    this.onNt("pay_success" /* PAY_SUCCESS */, this.onPaySuccess, this);
                    this.onNt("get_order_start" /* GET_ORDER_START */, this.onGetOrderStart, this);
                    this.onNt("get_order_end" /* GET_ORDER_END */, this.onGetOrderEnd, this);
                    this.onNt("get_order_error" /* GET_ORDER_ERROR */, this.onGetOrderError, this);
                    //侦听键盘事件
                    var sourceX = 0;
                    var sourceY = 0;
                    window.document.onkeydown = function (event) {
                        var e = event || window.event || arguments.callee.caller.arguments[0];
                        if (e && e.keyCode == 65) { // 按A 65
                            if (1) {
                                var rand = Math.floor(Math.random() * 100);
                                console.log("rand = " + rand);
                                return;
                            }
                            //
                            var proxy = facade.retMod("03" /* Scene */).retProxy(2 /* Scene */);
                            var bossVo = proxy.getBossVo();
                            if (!bossVo) {
                                return;
                            }
                            var mainVO = MainGPlayer.ins.vo;
                            console.log("主角格子坐标" + mainVO.x + "," + mainVO.y);
                            console.log("boss " + bossVo.name + " 格子坐标 " + bossVo.x + "," + bossVo.y);
                            var curDis = game.PointUtil.distance(mainVO.x, mainVO.y, bossVo.x, bossVo.y);
                            console.log("主角跟 boss 的距离 " + curDis);
                            // let pools = Pool["Pools"];
                            // for (let k in pools) {
                            //     let data = pools[k];
                            //     if (data && data._list.length > 50) {
                            //         let data2 = data._list[0];
                            //         let name = data2.__proto__.__class__;
                            //         console.error("对象池超100的: " + name + " " + data._list.length);
                            //     }
                            // }
                        }
                        else if (e && e.keyCode == 65) {
                            if (1) {
                                egret.ticker.pause();
                                return;
                            }
                            var dsp = MainGPlayer.ins.dsp;
                            var x = dsp.x;
                            var y = dsp.y;
                            var self = this;
                        }
                        if (e && e.keyCode == 83) {
                            if (!this.sourceX) {
                                this.sourceX = MainGPlayer.ins.dsp.x - 200;
                                this.sourceY = MainGPlayer.ins.dsp.y;
                            }
                            MainGPlayer.ins.dsp.x = this.sourceX;
                            MainGPlayer.ins.dsp.y = this.sourceY;
                        }
                        if (e && e.keyCode == 69) {
                            var dsp = MainGPlayer.ins.dsp;
                            dsp.x = this.sourceX - 100;
                            dsp.y = this.sourceY;
                        }
                        else if (e && e.keyCode == 68) {
                        }
                        else if (e && e.keyCode == 83) {
                            if (1) {
                                egret.ticker.resume();
                                return;
                            }
                            // let proxy: ILoginProxy = facade.retMod(ModName.Login).retProxy(ProxyType.Login);
                            // // if (DEBUG) {
                            // // @ts-ignore
                            // proxy.service.close();
                        }
                    };
                };
                MiscMdr.prototype.onTap = function (e) {
                    mod.GuideMgr.getIns().tips(); //玩家操作时调用
                    this._point = game.Layer.tip.globalToLocal(e.stageX, e.stageY, this._point);
                    this.addEftByParent("click" /* ClickEff */, game.Layer.tip, this._point.x, this._point.y, -1, null, 1);
                };
                MiscMdr.prototype.onActivate = function () {
                    TimeMgr.addUpdateItem(this, MiscMdr.UpdateInterval);
                };
                MiscMdr.prototype.onDeactivate = function () {
                    TimeMgr.removeUpdateItem(this);
                };
                MiscMdr.prototype.startSyncTime = function () {
                    this._proxy.lastSyncTick = TimeMgr.time.time;
                    this._enableSyncTime = true;
                };
                MiscMdr.prototype.stopSyncTime = function () {
                    this._enableSyncTime = false;
                };
                MiscMdr.prototype.update = function (time) {
                    if (this._enableSyncTime && time.time - this._proxy.lastSyncTick > 300000) {
                        this._proxy.syncTime();
                    }
                };
                MiscMdr.prototype.onPaySuccess = function () {
                    mod.ViewMgr.getIns().show("充值成功！");
                };
                MiscMdr.prototype.onGetOrderStart = function () {
                    game.Black.ins().show();
                };
                MiscMdr.prototype.onGetOrderEnd = function () {
                    game.Black.ins().hide();
                };
                MiscMdr.prototype.onGetOrderError = function () {
                    mod.ViewMgr.getIns().show("获取支付订单号失败！");
                    game.Black.ins().hide();
                };
                MiscMdr.UpdateInterval = 1000;
                return MiscMdr;
            }(game.EffectMdrBase));
            misc.MiscMdr = MiscMdr;
            __reflect(MiscMdr.prototype, "game.mod.misc.MiscMdr", ["base.UpdateItem"]);
        })(misc = mod.misc || (mod.misc = {}));
    })(mod = game.mod || (game.mod = {}));
})(game || (game = {}));
//# sourceMappingURL=misc.js.map