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
    game.ApiUserStatus = {
        "0": "服务器维护中",
        "-1": "游戏内容有更新，请重新启动游戏",
        "100": "请求服务器列表未返回",
    };
})(game || (game = {}));
var game;
(function (game) {
    var Handler = base.Handler;
    var Pool = base.Pool;
    var AssetsMgr = /** @class */ (function () {
        /** @internal */ function AssetsMgr() {
            this._cfg = new game.AssetsCfg();
            this._keyHandler = Object.create(null);
            this._idxName = Object.create(null);
            this._groupHandler = Object.create(null);
        }
        Object.defineProperty(AssetsMgr, "ins", {
            get: function () {
                if (this._ins == null) {
                    this._ins = new AssetsMgr();
                }
                return this._ins;
            },
            enumerable: true,
            configurable: true
        });
        AssetsMgr.prototype.loadConfig = function (handler) {
            var self = this;
            var resUrl = AssetsMgr.Root + "default.res.json";
            if (self.resJson) {
                self._cfg.parse(self.resJson);
                self.resJson = null;
                handler.exec([null, resUrl]);
                Pool.release(handler);
                return;
            }
            game.LoadMgr.ins.load(resUrl, Handler.alloc(self, function (data, url) {
                self._cfg.parse(data);
                handler.exec([data, resUrl]);
                Pool.release(handler);
                game.LoadMgr.ins.unload(url);
            }), game.LoadPri.Init);
        };
        AssetsMgr.prototype.getRes = function (key) {
            var info = this.getResInfo(key);
            if (info) {
                var res = game.LoadMgr.ins.getRes(AssetsMgr.Root + info.url);
                if (res instanceof game.MergedBmp) {
                    return res.getTexture(key);
                }
                return res;
            }
            return null;
        };
        AssetsMgr.prototype.getGroup = function (name) {
            return this._cfg.groups[name];
        };
        AssetsMgr.prototype.getResAsync = function (key, onSucc) {
            var self = this;
            var res = self.getRes(key);
            if (res) {
                onSucc.exec([res, key]);
                Pool.release(onSucc);
                return;
            }
            var info = self.getResInfo(key);
            if (!info) {
                game.LoadMgr.ins.load(key, onSucc, game.LoadPri.UI);
                return;
            }
            var list = self._keyHandler[key];
            if (!list) {
                list = self._keyHandler[key] = [];
            }
            list.push(onSucc);
            if (info.subkeys) {
                game.LoadMgr.ins.loadMerge(AssetsMgr.Root + info.url, Handler.alloc(self, self.onKeyLoaded), game.LoadPri.UI);
            }
            else {
                game.LoadMgr.ins.load(AssetsMgr.Root + info.url, Handler.alloc(self, self.onKeyLoaded), game.LoadPri.UI);
            }
        };
        AssetsMgr.prototype.addRef = function (key) {
            var info = this.getResInfo(key);
            if (info) {
                game.LoadMgr.ins.addRef(AssetsMgr.Root + info.url);
            }
            else {
                game.LoadMgr.ins.addRef(key);
            }
        };
        AssetsMgr.prototype.decRef = function (key) {
            var info = this.getResInfo(key);
            if (info) {
                game.LoadMgr.ins.decRef(AssetsMgr.Root + info.url);
            }
            else {
                game.LoadMgr.ins.decRef(key);
            }
        };
        /** @internal */ AssetsMgr.prototype.onKeyLoaded = function (data, url) {
            var self = this;
            var resName = self._cfg.urlMap[url.replace(AssetsMgr.Root, "")];
            var info = self.getResInfo(resName);
            var list;
            if (info.subkeys) {
                for (var _i = 0, _a = info.subkeys; _i < _a.length; _i++) {
                    var k = _a[_i];
                    list = self._keyHandler[k];
                    self._keyHandler[k] = null;
                    self.callHandler(k, list);
                }
            }
            else {
                list = self._keyHandler[resName];
                self._keyHandler[resName] = null;
                self.callHandler(resName, list);
            }
        };
        /** @internal */ AssetsMgr.prototype.callHandler = function (key, list) {
            if (!list) {
                return;
            }
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var h = list_1[_i];
                h.exec([this.getRes(key), key]);
                Pool.release(h);
            }
        };
        AssetsMgr.prototype.loadGroup = function (name, onComp, onProg) {
            var self = this;
            var group = self._cfg.groups[name];
            if (!group) {
                return;
            }
            var urls = [];
            var isMerged;
            for (var _i = 0, group_1 = group; _i < group_1.length; _i++) {
                var n = group_1[_i];
                var r = self.getResInfo(n);
                if (!r) {
                    continue;
                }
                var url = AssetsMgr.Root + r.url;
                if (r.subkeys) {
                    isMerged = true;
                }
                if (urls.indexOf(url) < 0) {
                    urls.push(url);
                }
            }
            var groupHandler = self._groupHandler[name];
            if (!groupHandler) {
                groupHandler = self._groupHandler[name] = {
                    onCompList: [],
                    onProgList: []
                };
            }
            var list = groupHandler.onCompList;
            if (list.indexOf(onComp) < 0) {
                list.push(onComp);
            }
            if (onProg) {
                list = groupHandler.onProgList;
                if (list.indexOf(onProg) < 0) {
                    list.push(onProg);
                }
            }
            var idx;
            var c = Handler.alloc(self, self.onGroupComp);
            var p = Handler.alloc(self, self.onGroupProg);
            if (isMerged) {
                idx = game.LoadMgr.ins.loadMergeGroup(urls, c, game.LoadPri.UI, p);
            }
            else {
                idx = game.LoadMgr.ins.loadGroup(urls, c, game.LoadPri.UI, p);
            }
            self._idxName[idx] = name;
        };
        /** @internal */ AssetsMgr.prototype.onGroupProg = function (idx, url) {
            var name = this._idxName[idx];
            if (!this._groupHandler[name]) {
                return;
            }
            var loaded = game.LoadMgr.ins.getGroupLoaded(idx);
            var tmp = [name, url.replace(AssetsMgr.Root, ""), loaded, this.getGroup(name).length];
            var list = this._groupHandler[name].onProgList;
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var h = list_2[_i];
                h.exec(tmp);
            }
        };
        /** @internal */ AssetsMgr.prototype.onGroupComp = function (idx) {
            var self = this;
            var name = self._idxName[idx];
            var groupHandler = self._groupHandler[name];
            self._groupHandler[name] = null;
            delete self._groupHandler[name];
            if (!groupHandler) {
                return;
            }
            var list = groupHandler.onCompList;
            for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                var h = list_3[_i];
                h.exec(name);
                Pool.release(h);
            }
            groupHandler.onCompList = null;
            list = groupHandler.onProgList;
            for (var _a = 0, list_4 = list; _a < list_4.length; _a++) {
                var h = list_4[_a];
                Pool.release(h);
            }
            groupHandler.onProgList = null;
        };
        /** @internal */ AssetsMgr.prototype.getResInfo = function (key) {
            var cfg = this._cfg;
            if (cfg.subkeyMap[key]) {
                key = cfg.subkeyMap[key];
            }
            return cfg.resMap[key];
        };
        /** @internal */ AssetsMgr.Root = "resource/";
        return AssetsMgr;
    }());
    game.AssetsMgr = AssetsMgr;
    __reflect(AssetsMgr.prototype, "game.AssetsMgr");
})(game || (game = {}));
var game;
(function (game) {
    var TimeMgr = base.TimeMgr;
    var reporter;
    /** @internal */ function initErrorReporter() {
        if (gso.is_dbg_report == 1 && gso.report_url && gso.report_url != "") {
            if (!reporter) {
                reporter = new ErrorReporter();
                logger.repE = function (data) { return reporter.reportError(data); };
            }
        }
    }
    game.initErrorReporter = initErrorReporter;
    var ErrorReporter = /** @class */ (function () {
        function ErrorReporter() {
            this._errList = [];
            this._errLogList = [];
            this.errorLogTick = TimeMgr.time.time;
            TimeMgr.addUpdateItem(this);
        }
        ErrorReporter.prototype.reportError = function (data) {
            var self = this;
            if (data.msg && data.msg.indexOf("未指明的错误。") > -1) {
                return;
            }
            if (data.msg && data.msg.indexOf("Cannot set property 'glContext' of null") > -1) {
                if (self.createTextureError) {
                    return;
                }
                self.createTextureError = true;
            }
            var error = data.msg.length > 512 ? data.msg.substr(0, 512) : data.msg;
            var stack = (data.msg.length > 512 && data.stack) ? data.stack.substr(0, 512) : data.stack;
            if (self._errLogList.indexOf(error) > -1) {
                return;
            }
            for (var _i = 0, _a = self._errList; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj && obj.error === error) {
                    return;
                }
            }
            var time = data.time;
            self._errList.push({ error: error, time: time, stack: stack });
        };
        ErrorReporter.prototype.update = function (time) {
            var self = this;
            if (self.errorLogTick && time.time - self.errorLogTick > 1000) {
                self._errLogList.length = 0;
                self.errorLogTick = time.time;
            }
            var obj = Object.create(null);
            obj.ver = gso.version;
            obj.error = "";
            obj.time = "";
            obj.channel = gso.channel;
            obj.sid = gso.serverId;
            obj.acct = gso.account;
            obj.ip = gso.client_ip;
            obj.ua = gso.ua;
            while (self._errList && self._errList.length) {
                var data = self._errList.shift();
                self._errLogList.push(data.error);
                obj.error = data.error;
                obj.stack = data.stack;
                obj.time = data.time;
                var str = JSON.stringify(obj);
                console.info("上报错误日志:" + gso.error_url + "?" + str);
                ggo.webReqGet(gso.error_url, {
                    // counter: "dbgTrace",
                    // key: "xcjkjkkaskd",
                    // env: "dev",
                    data: str
                });
            }
        };
        return ErrorReporter;
    }());
    __reflect(ErrorReporter.prototype, "ErrorReporter", ["base.UpdateItem"]);
})(game || (game = {}));
/** @internal */ var _eventMap = Object.create(null);
(function initPool() {
    var prototype;
    prototype = egret.Texture.prototype;
    prototype.onRelease = function () {
        this.dispose();
        this.disposeBitmapData = true;
    };
    prototype = egret.Rectangle.prototype;
    prototype.onRelease = function () {
        this.setTo(0, 0, 0, 0);
    };
    prototype = egret.Point.prototype;
    prototype.onRelease = function () {
        this.setTo(0, 0);
    };
    egret.Event["create"] = function (cls, type, bubbles, cancelable) {
        var name = egret.getQualifiedClassName(cls);
        var pool = _eventMap[name];
        if (pool) {
            pool.time = egret.getTimer();
        }
        var e;
        if (pool && pool.list && 0 < pool.list.length) {
            e = pool.list.pop();
            e.$type = type;
            e.$bubbles = !!bubbles;
            e.$cancelable = !!cancelable;
            e.$isDefaultPrevented = false;
            e.$isPropagationStopped = false;
            e.$isPropagationImmediateStopped = false;
            e.$eventPhase = 2;
        }
        else {
            e = new cls(type, bubbles, cancelable);
        }
        return e;
    };
    egret.Event["release"] = function (e) {
        e["clean"]();
        var name = egret.getQualifiedClassName(e);
        var pool = _eventMap[name];
        if (!pool) {
            _eventMap[name] = { time: egret.getTimer(), list: [e] };
            return;
        }
        if (pool.list.indexOf(e) < 0) {
            pool.list[pool.list.length] = e;
        }
    };
})();
(function initByteArray() {
    var prototype;
    prototype = egret.ByteArray.prototype;
    prototype.decodeUTF8 = function (data) {
        return new TextDecoder().decode(data);
    };
    prototype.encodeUTF8 = function (str) {
        return new TextEncoder().encode(str);
    };
})();
var game;
(function (game) {
    var __reg = base.__reg;
    var getTimer = egret.getTimer;
    var TimeMgr = base.TimeMgr;
    var Handler = base.Handler;
    var Pool = base.Pool;
    var protoJson;
    var onCreate;
    var debug;
    var protobufUrl;
    function initProto(handler, url) {
        var global = window;
        global.Long = global.Long ? global.Long : global.dcodeIO ? global.dcodeIO.Long : undefined;
        protobufUrl = url;
        initLong();
        protobuf.util.Long = Long;
        protobuf.configure();
        if (RELEASE && !url) {
            handler.exec([protobufUrl, protobufUrl]);
            Pool.release(handler);
            return;
        }
        onCreate = handler;
        debug = !url;
        url = url || "assets/data_server/protobuf-bundle.json";
        game.LoadMgr.ins.load(url, Handler.alloc(null, function (data) {
            protoJson = data;
            if (debug) {
                return;
            }
            createMsg();
        }), game.LoadPri.Init);
    }
    game.initProto = initProto;
    function createMsg() {
        debug = false;
        // gAlert("initproto.ts createMsg111 " + protoJson + " type "+type);
        if (!protoJson) {
            return;
        }
        if (protoJson.version) {
            game.protoVersion = protoJson.version;
        }
        // gAlert("initproto.ts createMsg222 " + protoVersion);
        delete protoJson.version;
        var root = protobuf.Root.fromJSON(protoJson);
        for (var _i = 0, _c = Object.keys(protoJson.nested); _i < _c.length; _i++) {
            var k = _c[_i];
            var m = global[k] = {};
            for (var _d = 0, _e = Object.keys(protoJson.nested[k].nested); _d < _e.length; _d++) {
                var k1 = _e[_d];
                var path = k + "." + k1;
                var cls = root.lookupType(path).ctor;
                cls.prototype["__class__"] = path;
                cls.prototype.toString = function () {
                    return printMsg(this);
                };
                var msgId = protoJson.nested[k].nested[k1].msgId;
                if (msgId) {
                    cls.MsgId = msgId;
                    __reg(msgId, cls);
                }
                m[k1] = cls;
            }
        }
        protoJson = null;
        onCreate.exec([protobufUrl, protobufUrl]);
        Pool.release(onCreate);
        onCreate = null;
    }
    game.createMsg = createMsg;
    function printMsg(obj) {
        var tmp = [];
        tmp.push("\"msg_name\":\"" + egret.getQualifiedClassName(obj) + "\"");
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (!obj.hasOwnProperty(k)) {
                continue;
            }
            var v = obj[k];
            var t = typeof v;
            if (v == null) {
                tmp.push("\"" + k + "\":" + t);
                continue;
            }
            switch (t) {
                case "number":
                case "boolean":
                case "symbol":
                    tmp.push("\"" + k + "\":" + v.toString());
                    break;
                case "string":
                    tmp.push("\"" + k + "\":\"" + v.replace(/\"/g, "\\\"") + "\"");
                    break;
                case "object":
                    if (Array.isArray(v)) {
                        if (v.length) {
                            if (typeof v[0] === "string") {
                                var s_a = [];
                                for (var s_i = 0, s_l = v.length; s_i < s_l; s_i++) {
                                    s_a.push("\"" + v[s_i].replace(/\"/g, "\\\"") + "\"");
                                }
                                tmp.push("\"" + k + "\":[" + s_a.join(",") + "]");
                            }
                            else if (Long.isLong(v[0])) {
                                var l_a = [];
                                for (var l_i = 0, l_l = v.length; l_i < l_l; l_i++) {
                                    l_a.push("\"" + v[l_i] + "Long\"");
                                }
                                tmp.push("\"" + k + "\":[" + l_a.join(",") + "]");
                            }
                            else {
                                tmp.push("\"" + k + "\":[" + v.toString() + "]");
                            }
                        }
                        else {
                            tmp.push("\"" + k + "\":[" + v.toString() + "]");
                        }
                    }
                    else if (Long.isLong(v)) {
                        tmp.push("\"" + k + "\":\"" + v + "Long\"");
                    }
                    else {
                        tmp.push("\"" + k + "\":" + v.toString());
                    }
                    break;
            }
        }
        return "{" + tmp.join(", ") + "}";
    }
    var _a;
    var _b = Object.create(null);
    var _updateItem;
    function initLong() {
        _a = Long.prototype.toString;
        Long.prototype.toString = function () {
            var self = this;
            var idToStr = _a;
            var idStr = _b;
            if (!idStr[self.high]) {
                var objLow = Object.create(null);
                objLow.time = 0;
                objLow.str = idToStr.call(self);
                var objHigh = Object.create(null);
                objHigh[self.low] = objLow;
                idStr[self.high] = objHigh;
            }
            else if (!idStr[self.high][self.low]) {
                var objLow = Object.create(null);
                objLow.time = 0;
                objLow.str = idToStr.call(self);
                idStr[self.high][self.low] = objLow;
            }
            idStr[self.high][self.low].time = getTimer();
            return idStr[self.high][self.low].str;
        };
        _updateItem = { update: update };
        TimeMgr.addUpdateItem(_updateItem);
    }
    function update() {
        var idStr = _b;
        var tmpDel = [];
        var t = getTimer();
        var idObj, k, k1;
        for (k in idStr) {
            for (k1 in idStr[k]) {
                idObj = idStr[k][k1];
                if (t - idObj.time > 50000) {
                    tmpDel[tmpDel.length] = k;
                    tmpDel[tmpDel.length] = k1;
                }
            }
        }
        for (var i = 0, len = tmpDel.length; i < len; i += 2) {
            k = tmpDel[i];
            k1 = tmpDel[i + 1];
            var obj = idStr[k];
            obj[k1] = null;
            delete obj[k1];
            if (Object.keys(obj).length === 0) {
                idStr[k] = null;
                delete idStr[k];
            }
        }
    }
})(game || (game = {}));
var game;
(function (game) {
    //以下都是给首包本地化使用
    game.SignAccountMsg = {
        1: "表示登录成功",
        2: "没有账号",
        3: "密钥不正确",
        4: "协议版本不对",
        5: "登录时间戳超时",
        6: "地图资源错误"
    };
    game.DisConnectMsg = {
        1: "账号已在别处登录",
        2: "版本号错误",
        3: "服务器已关闭",
        4: "主动断开",
        5: "登录错误",
        6: "登录错误，角色为空",
        7: "未成年人每日累计游戏时长已达上限，请下线休息！",
        8: "每日22时至次日8时，不会为未成年人提供游戏服务！",
        9: "您已累计游戏时长1小时，请实名认证以保证正常游戏",
        10: "您已返回登陆界面",
    };
    game.CreateRoleMsg = {
        1: "创建成功",
        2: "标识系统错误",
        3: "角色名重复",
        4: "已经创建过角色",
        5: "包含屏蔽词",
        6: "系统繁忙"
    };
    game.ServerStatusName = {
        0: "未开服",
        1: "火爆",
        2: "推荐",
        3: "畅通",
        4: "维护",
        5: "新服"
    };
    game.UserStatusName = {
        0: "正常",
        1: "服务器维护中"
    };
})(game || (game = {}));
egret.sys.screenAdapter = {
    calculateStageSize: function (scaleMode, screenWidth, screenHeight, contentWidth, contentHeight) {
        var displayWidth = screenWidth;
        var displayHeight = screenHeight;
        var stageWidth = contentWidth;
        var stageHeight = contentHeight;
        var scaleX = displayWidth / stageWidth || 0;
        var scaleY = displayHeight / stageHeight || 0;
        var ratio = displayWidth / displayHeight;
        var r = 720 / 1280;
        if (ratio > r && !gso.dbg_all_win /* 3 / 4 */) {
            stageWidth = Math.round(r * stageHeight);
            displayWidth = Math.round(stageWidth * scaleY);
        }
        else {
            if (scaleX > scaleY) {
                stageWidth = Math.round(displayWidth / scaleY);
            }
            else {
                stageHeight = Math.round(displayHeight / scaleX);
            }
        }
        if (stageWidth % 2 != 0) {
            stageWidth += 1;
        }
        if (stageHeight % 2 != 0) {
            stageHeight += 1;
        }
        if (displayWidth % 2 != 0) {
            displayWidth += 1;
        }
        if (displayHeight % 2 != 0) {
            displayHeight += 1;
        }
        return { stageWidth: stageWidth, stageHeight: stageHeight, displayWidth: displayWidth, displayHeight: displayHeight };
    }
};
/** @internal */
var game;
(function (game) {
    var Event = egret.Event;
    var getTimer = egret.getTimer;
    var facade = base.facade;
    var TimeMgr = base.TimeMgr;
    var Consts = base.Consts;
    var Handler = base.Handler;
    var delayCall = base.delayCall;
    var TextField = egret.TextField;
    var Launcher = /** @class */ (function (_super) {
        __extends(Launcher, _super);
        function Launcher() {
            var _this = _super.call(this) || this;
            _this._needLoadUrls = [];
            _this._isGameActivate = true;
            _this._loadDataTxtCnt = 0;
            _this.addEventListener(Event.ADDED_TO_STAGE, _this.init, _this);
            return _this;
        }
        Launcher.prototype.init = function () {
            var self = this;
            //策略
            Consts.Pool_Unused_T = gso.Pool_Unused_T || Consts.Pool_Unused_T;
            Consts.Mdr_Dispose_T = gso.Mdr_Dispose_T || Consts.Mdr_Dispose_T;
            TimeMgr.init();
            TimeMgr.needPause = !gso.isPc;
            TimeMgr.setWorker(gso.worker);
            gso.worker = null;
            var stage = gso.gameStage = self.stage;
            egret.TextField.default_fontFamily = "Arial";
            game.Layer.init();
            game.SoundMgr.ins.init();
            game.StringUtil.setColorStr(game.UIColorStr);
            game.StringUtil.setColorStr2(game.UIColor2Str);
            TimeMgr.addUpdateItem(self, 15);
            stage.addEventListener(Event.RESIZE, self.onResize, self);
            stage.addEventListener(Event.DEACTIVATE, self.onDeactivate, self);
            stage.addEventListener(Event.ACTIVATE, self.onActivate, self);
            self.onResize();
            game.BgMgr.getIns().setBg("1");
            self.initVerbose();
            ggo.onApiReady = function () { return self.onApiReady(); };
            if (gso.apiReady) {
                self.onApiReady();
            }
            gso.gameIsActivate = true;
            this._isGameActivate = true;
        };
        Launcher.prototype.initVerbose = function () {
            var _this = this;
            if (!this._verboseTxt) {
                var txt = this._verboseTxt = new TextField();
                txt.touchEnabled = false;
                txt.x = 0;
                txt.y = 1130;
                txt.size = 26;
                txt.stroke = 1;
                txt.textAlign = "center";
                txt.textColor = 0xffffff;
                txt.lineSpacing = 8;
                txt.width = gso.gameStage.stageWidth;
                gso.gameStage.addChild(txt);
            }
            ggo.loadVerbose = function (msg) {
                var txt = _this._verboseTxt;
                if (txt && txt.stage) {
                    txt.text = msg;
                }
            };
            ggo.removeVerbose = function () {
                var txt = _this._verboseTxt;
                _this._verboseTxt = null;
                if (txt && txt.parent) {
                    txt.parent.removeChild(txt);
                }
            };
        };
        Launcher.prototype.printStack = function (cnt) {
            var caller = arguments.callee.caller;
            var i = 0;
            cnt = cnt || 10;
            while (caller && i < cnt) {
                console.info(caller.toString());
                caller = caller.caller;
                i++;
            }
        };
        Launcher.prototype.onApiReady = function () {
            game.initErrorReporter();
            if (gso.isReload) {
                console.info("资源已加载，触发事件 LauncherEvent.ON_RELOAD 进入 OnReloadCmd ");
                facade.sendNt("on_reload" /* ON_RELOAD */);
                return;
            }
            this.loadV();
        };
        Launcher.prototype.loadV = function () {
            var _this = this;
            if (gso.isWeixin) {
                gzyyou.sdk.loadReport("load_version" /* LOAD_VERSION */);
            }
            ggo.loadVerbose("\u6B63\u5728\u52A0\u8F7D\u7248\u672C\u4FE1\u606F" /* LOAD_VERSION */);
            gso.logList["load_version" /* LOAD_VERSION */] = "\u6B63\u5728\u52A0\u8F7D\u7248\u672C\u4FE1\u606F" /* LOAD_VERSION */;
            var self = this;
            this._needLoadUrls = [];
            self._baseTotal = 4;
            self._baseLoaded = 0;
            //OnSceneReadyCmd里面会改变这个值
            // if (!gso.avatarScale) {
            //     gso.avatarScale = 1.25;
            // }
            gso.avatarScale = 1;
            console.info("loadV");
            if (!gso.version) {
                self.onVerTxt(null, null);
                return;
            }
            var mgr = game.LoadMgr.ins;
            var cfgUrl = "v/" + gso.version + "/data.txt";
            if (gso.version > 10000) {
                var tf = gso.targetPlatform ? gso.targetPlatform : "web" /* WEB */;
                cfgUrl = "v/" + tf + "/" + gso.version + "/data.txt";
            }
            // this.printStack(10);
            console.info("加载版本data.txt文件，" + cfgUrl);
            gso.logList["load_version" /* LOAD_VERSION */ + "1"] = "22 加载版本data.txt文件，" + cfgUrl;
            // gAlert("加载版本data.txt文件，"+cfgUrl);
            mgr.load(cfgUrl, Handler.alloc(self, self.onVerTxt), game.LoadPri.Init, Handler.alloc(null, function () {
                // gAlert(LOADING_ERROR_MSG.LOAD_VERSION_TXT + gso.version + " ---- "+cfgUrl);
                console.info("22 加载版本 " + cfgUrl + " 失败!");
                _this._loadDataTxtCnt++;
                if (_this._loadDataTxtCnt < 10) {
                    // gAlert("重复加载datatxt，"+this._loadDataTxtCnt );
                    _this.loadV();
                }
            }));
        };
        Launcher.prototype.onVerTxt = function (str, url) {
            var self = this;
            // gAlert("...onVerTxt...1，");
            console.info("onVerTxt url = " + url);
            if (!str) {
                self._baseTotal += 2;
                this._needLoadUrls.push("gso.scriptLit");
                ggo.loadLogin(null, function (data, url) {
                    game.createMsg();
                    self.checkRes(data, url);
                });
                var protobufJson = "assets/data_server/protobuf-bundle.json";
                this._needLoadUrls.push(protobufJson);
                game.initProto(Handler.alloc(self, self.checkRes), protobufJson);
                self.onVLoaded(null, null);
                var jsonList = ["assets/map/map.json"];
                this._needLoadUrls.push(jsonList.toString());
                game.LoadMgr.ins.loadJsonList(jsonList, Handler.alloc(self, function () { return void 0; }), Handler.alloc(self, self.checkRes));
                var role_name = "assets/data/role_name.json";
                this._needLoadUrls.push(role_name);
                game.LoadMgr.ins.load(role_name, Handler.alloc(self, self.checkRes), game.LoadPri.Init);
                // gAlert("...onVerTxt...2，");
                return;
            }
            // gAlert("...onVerTxt...3，");
            var vObj = self.getVTxtObj(str);
            if (!vObj.role_name) {
                gAlert("role_name is not define " + gso.version + " " + str);
                return;
            }
            // gAlert("...onVerTxt...4，");
            if (gso.isWeixin) {
                gzyyou.sdk.loadReport("load_base" /* LOAD_BASE */);
            }
            ggo.loadVerbose("\u6B63\u5728\u52A0\u8F7D\u57FA\u7840\u914D\u7F6E" /* LOAD_LOGIN */);
            //
            this._needLoadUrls.push(vObj.loginUrl);
            ggo.loadLogin(vObj.loginUrl, function (data, url) {
                if (gso.isWeixin) {
                    gzyyou.sdk.loadReport("load_login_end" /* LOGIN_LOADED */);
                }
                self.checkRes(data, url);
            });
            // gAlert("onVerTxt " + vObj.msgUrl);
            this._needLoadUrls.push(vObj.msgUrl);
            game.initProto(Handler.alloc(self, function (data, url) {
                if (gso.isWeixin) {
                    gzyyou.sdk.loadReport("load_proto_end" /* PROTO_LOADED */);
                }
                self.checkRes(data, url);
            }), vObj.msgUrl);
            if (vObj.create_model) {
                game.LoadMgr.ins.loadPreData(vObj.create_model);
            }
            //默认是推荐模式
            var verUrl = vObj.verUrl;
            game.TextureScale = 1;
            var gameModel = egret.localStorage.getItem("3" /* gameModel */) || "2";
            if (gameModel) {
                if (gameModel == "1") {
                    //流畅
                    verUrl = vObj.verUrl;
                    //TextureScale = 1.25;
                }
                else if (gameModel == "2") {
                    //推荐
                    verUrl = vObj.verUrl;
                }
                else if (gameModel == "3") {
                    //高清
                    verUrl = vObj.verUrlOri;
                }
            }
            console.info("gameModel = " + gameModel);
            console.info("TextureScale = " + game.TextureScale);
            // else{
            //     //let verUrl: string = vObj.verUrl;
            //     TextureScale = 1;
            //     if(gso.phone_type == 2){
            //         verUrl = vObj.verUrl;
            //     }else if(gso.phone_type == 3){
            //         verUrl = vObj.verScaleUrl;
            //         TextureScale = 1.25;
            //     }
            // }
            // if (gso.scaleTexture === 1.25) {
            //     verUrl = vObj.verScaleUrl;
            //     TextureScale = 1.25;
            // }
            game.VerCfgUrl = verUrl;
            var mgr = game.LoadMgr.ins;
            mgr.addJsonRes("assets/map/map_version", vObj.map_version);
            mgr.addJsonRes("assets/data/role_name.json", self.getTxtNameCfg(vObj.role_name));
            console.info("下载资源映射文件");
            mgr.load(game.LoadMgr.VCfg, Handler.alloc(self, self.onVLoaded), game.LoadPri.Init, Handler.alloc(null, function () {
                gAlert("\u7248\u672C\u8D44\u6E90\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u91CD\u8BD5 v=" /* LOAD_VERSION_CFG */ + gso.version);
            }));
            delayCall(Handler.alloc(null, function () { return mgr.unload(url); }));
        };
        Launcher.prototype.getVTxtObj = function (str) {
            var arr = str.split("|");
            return {
                loginUrl: arr[0],
                verUrl: arr[1],
                verScaleUrl: arr[2],
                msgUrl: arr[3],
                map_version: arr[4],
                role_name: arr[5],
                create_model: arr[6],
                verUrlOri: arr[7],
            };
        };
        Launcher.prototype.getTxtNameCfg = function (str) {
            var nameCfg = {};
            for (var _i = 0, _a = str.split("&"); _i < _a.length; _i++) {
                var s = _a[_i];
                var rArr = s.split("#");
                var id = rArr[0];
                nameCfg[id] = {
                    id: id,
                    adv: rArr[1],
                    name_f: rArr[2],
                    name_1: rArr[3],
                    name_2: rArr[4]
                };
            }
            return nameCfg;
        };
        Launcher.prototype.onVLoaded = function (obj, url) {
            game.LogUtil.printLogin("资源映射文件下载完毕");
            var self = this;
            if (gso.isWeixin) {
                gzyyou.sdk.loadReport("load_version_cfg_end" /* VERSION_CFG_LOADED */);
            }
            if (obj) {
                gso.scriptList = obj.js;
                var isOv = gso.jzsj_channel == "oppo" /* OPPO */ || gso.jzsj_channel == "vivo" /* VIVO */;
                if (gso.isWeixin && obj.cfg_wx) {
                    gso.configList = obj.cfg_wx;
                }
                else {
                    gso.configList = obj.cfg;
                }
                game.LoadMgr.ins.urlHash = obj.url;
                game.AssetsMgr.ins.resJson = obj.res;
                if (ggo.cleanCache) {
                    ggo.cleanCache(obj.url);
                }
            }
            var defaultJson = game.AssetsMgr.Root + "default.res.json";
            this._needLoadUrls.push(defaultJson);
            game.AssetsMgr.ins.loadConfig(Handler.alloc(self, self.checkRes));
            this._needLoadUrls.push(game.LoadMgr.SheetData);
            game.LoadMgr.ins.loadSheet(Handler.alloc(self, function (data, url) {
                if (gso.isWeixin) {
                    gzyyou.sdk.loadReport("load_sheet_end" /* SHEET_LOADED */);
                }
                self.checkRes(data, url);
            }));
            delayCall(Handler.alloc(null, function () { return game.LoadMgr.ins.unload(url); }));
            gso.versionIsLoaded = true;
            if (gso.isRunStartMdr) {
                facade.showView("02" /* Login */, "01" /* Start */);
            }
        };
        Launcher.prototype.checkRes = function (data, url) {
            this._baseLoaded++;
            gso.logList["load_version" /* LOAD_VERSION */ + this._baseLoaded] = "加载json文件数量 " + this._baseLoaded;
            // if (this._baseLoaded >= this._baseTotal) {
            //     this.run();
            // }
            var index = this._needLoadUrls.indexOf(url);
            if (index > -1) {
                this._needLoadUrls.splice(index, 1);
            }
            if (this._needLoadUrls.length <= 0) {
                this.run();
            }
            else {
                if (gso.printLogin) {
                    game.LogUtil.printLogin("剩余没下载 bengin");
                    for (var i = 0; i < this._needLoadUrls.length; i++) {
                        game.LogUtil.printLogin(this._needLoadUrls[i]);
                    }
                    game.LogUtil.printLogin("剩余没下载 end");
                }
            }
        };
        Launcher.prototype.run = function () {
            this.stage.addChild(game.Layer.ins);
            if (!gso.loginModIns) {
                gso.loginModIns = new gso.loginCls();
            }
            gso.logList["load_version" /* LOAD_VERSION */ + "10"] = "初始化登陆模块";
            game.LogUtil.printLogin("资源下载完毕，开始运行游戏 run");
            game.LogUtil.printLogin("Launcher 触发事件 LauncherEvent.SHOW_START");
            facade.sendNt("show_start" /* SHOW_START */);
            if (ggo.onGameReady) {
                ggo.onGameReady();
            }
        };
        Launcher.prototype.onResize = function (e) {
            game.BgMgr.getIns().updateBg();
            game.Layer.ins.onResize();
            facade.sendNt("on_resize" /* ON_RESIZE */);
        };
        Launcher.prototype.onActivate = function (e) {
            console.info("activate");
            this._isGameActivate = true;
            gso.gameIsActivate = true;
            facade.sendNt("on_activate" /* ON_ACTIVATE */);
            game.SoundMgr.ins.onActivate();
        };
        Launcher.prototype.onDeactivate = function (e) {
            console.info("deactivate");
            this._isGameActivate = false;
            gso.gameIsActivate = false;
            facade.sendNt("on_deactivate" /* ON_DEACTIVATE */);
            game.SoundMgr.ins.onDeActivate();
            if (gso.closeBackground) {
                return;
            }
            var self = this;
            delayCall(Handler.alloc(this, function () {
                if (!self._isGameActivate) {
                    game.LogUtil.printLogin("退回到后台时间久了，回到登录界面");
                    facade.sendNt("reconnect_cmd" /* BACK_TO_START_VIEW */);
                }
            }), 600000);
        };
        Launcher.prototype.update = function (time) {
            var t = getTimer();
            for (var k in _eventMap) {
                var pool = _eventMap[k];
                if (pool && t - pool.time > 50000) {
                    pool.list.length = 0;
                    _eventMap[k] = null;
                }
            }
        };
        return Launcher;
    }(egret.DisplayObject));
    game.Launcher = Launcher;
    __reflect(Launcher.prototype, "game.Launcher", ["base.UpdateItem"]);
})(game || (game = {}));
var game;
(function (game) {
    var Event = egret.Event;
    var Pool = base.Pool;
    var BgMgr = /** @class */ (function () {
        /** @internal */
        function BgMgr() {
            this.initImg();
        }
        BgMgr.getIns = function () {
            if (!this._ins) {
                this._ins = new BgMgr();
            }
            return this._ins;
        };
        /** @internal */ BgMgr.prototype.initImg = function () {
            var self = this;
            self._img = Pool.alloc(game.BitmapBase);
            this._imgLoader = new egret.ImageLoader();
            this._imgLoader.crossOrigin = "anonymous"; // 跨域请求
            self._img.addEventListener(Event.COMPLETE, self.onImgComp, self);
        };
        BgMgr.prototype.setBigBg = function (res) {
            if (1 || gso.jzsj_channel != "wanba" /* WANBA */) {
                return;
            }
            var self = this;
            if (self._bigRes == res) {
                return;
            }
            if (res && !self._imgBig) {
                var img = self._imgBig = Pool.alloc(game.BitmapBase);
                var s = gso.gameStage;
                img.width = s.stageWidth;
                img.height = s.stageHeight;
                img.x = 0;
                img.y = 0;
                img.source = this.getUrl(res);
                gso.gameStage.addChildAt(img, 0);
                self._bigRes = res;
            }
            else if (!res && self._imgBig) {
                self._imgBig.removeFromParent();
                Pool.release(self._imgBig);
                self._imgBig = null;
                self._bigRes = null;
            }
        };
        BgMgr.prototype.setBg = function (res) {
            var self = this;
            if (self._res == res) {
                return;
            }
            if (res && !self._img.parent) {
                var idx = self._imgBig ? 1 : 0;
                gso.gameStage.addChildAt(self._img, idx);
            }
            else if (!res) {
                self._img.removeFromParent();
            }
            self._res = res;
            self.updateBg();
        };
        BgMgr.prototype.updateBg = function () {
            var self = this;
            var url = self.getUrl(self._res);
            if (self._url == url) {
                if (self._loaded) {
                    self.onImgComp();
                }
                return;
            }
            self._url = url;
            self._loaded = false;
            if (!self._url) {
                return;
            }
            var imgLoader = this._imgLoader;
            imgLoader.load(self._url);
            imgLoader.once(egret.Event.COMPLETE, function (evt) {
                if (evt.currentTarget.data) {
                    var texture = new egret.Texture();
                    texture.bitmapData = evt.currentTarget.data;
                    self._img.source = texture;
                    self.onImgComp();
                }
            }, this);
            // self._img.source = self._url;
        };
        /** @internal */ BgMgr.prototype.getUrl = function (key) {
            if (!key) {
                return null;
            }
            // console.info("BgMgr key = " + key);
            //
            // // @ts-ignore
            // for(let k in gso.bgImg){
            //     console.info(k + " = " + gso.bgImg[k]);
            // }
            //时光
            if (gso.isShiguangSDK) {
                return gso.bgImg["1_shiguang"];
            }
            if (typeof gso.bgImg === "object" && gso.bgImg[key]) {
                return gso.bgImg[key];
            }
            //1 是选服界面 2是加载界面
            var res = this.getloadRes(key);
            var img = res == "" ? "assets/loading/1.jpg" : res;
            return img;
        };
        //区分loading
        BgMgr.prototype.getloadRes = function (urlname) {
            // if(urlname == "1") {
            //     if(gso.isWeixin) {
            //         return "https://cdnsrcex-ljtx.1y-game.com/assets/loading/wx1.jpg";
            //     }else if(gso.isFuyaoWeixin || gso.isWanjianShouq){
            //         return "https://cdnsrcex-ljtx.1y-game.com/assets/loading/1.jpg";
            //     }else if(gso.isShouq){
            //         return "https://cdnsrcex-ljtx.1y-game.com/assets/loading/shouq1.jpg";
            //     }
            // }else if(urlname == "2") {
            //     if(gso.isWeixin){
            //         return "https://cdnsrcex-ljtx.1y-game.com/assets/loading/wx2.jpg";
            //     }else if(gso.isFuyaoWeixin || gso.isWanjianShouq){
            //         return "https://cdnsrcex-ljtx.1y-game.com/assets/loading/2.jpg";
            //     }else if(gso.isShouq){
            //         return "https://cdnsrcex-ljtx.1y-game.com/assets/loading/shouq2.jpg";
            //     }
            // }
            return "";
        };
        /** @internal */ BgMgr.prototype.onImgComp = function () {
            this._loaded = true;
            var img = this._img;
            var s = gso.gameStage;
            var sW = s.stageWidth;
            var sH = s.stageHeight;
            // // if (!gso.isPc) {
            // let scale = Math.max(sW / img.width, sH / img.height);
            // img.width *= scale;
            // img.height *= scale;
            // // }
            img.x = (sW - img.width) / 2;
            img.y = (sH - img.height) / 2;
        };
        return BgMgr;
    }());
    game.BgMgr = BgMgr;
    __reflect(BgMgr.prototype, "game.BgMgr");
})(game || (game = {}));
var game;
(function (game) {
    var Sprite = egret.Sprite;
    var DisplayObjectContainer = egret.DisplayObjectContainer;
    var TouchEvent = egret.TouchEvent;
    var Event = egret.Event;
    var Layer = /** @class */ (function (_super) {
        __extends(Layer, _super);
        /** @internal */
        function Layer() {
            var _this = _super.call(this) || this;
            _this._layers = Object.create(null);
            _this.setLyr(new SceneBottomLayer());
            _this.setLyr(new SceneLayer());
            _this.setLyr(new BaseLayer(2 /* main */));
            _this.setLyr(new BaseLayer(3 /* window */));
            _this.setLyr(new BaseLayer(4 /* upperWin */));
            _this.setLyr(new ModalLayer());
            _this.setLyr(new BaseLayer(6 /* bossReliveTip */));
            _this.setLyr(new BaseLayer(7 /* tip */));
            _this.setLyr(new BaseLayer(8 /* top */));
            _this.addEventListener(Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            var winSp = Layer.winSp;
            winSp.touchEnabled = true;
            winSp.graphics.beginFill(0, 0.8);
            winSp.graphics.drawRect(0, 0, 16, 16);
            winSp.graphics.endFill();
            var modalSp = Layer.modalSp;
            modalSp.touchEnabled = true;
            modalSp.graphics.beginFill(0, 0.8);
            modalSp.graphics.drawRect(0, 0, 16, 16);
            modalSp.graphics.endFill();
            return _this;
        }
        Object.defineProperty(Layer, "ins", {
            get: function () {
                return this._ins;
            },
            enumerable: true,
            configurable: true
        });
        Layer.init = function () {
            if (this._ins) {
                return;
            }
            this._ins = new Layer();
        };
        Object.defineProperty(Layer, "sceneBottom", {
            /** 场景 */
            get: function () {
                return this._ins._layers[0 /* sceneBottom */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer, "scene", {
            /** 场景 */
            get: function () {
                return this._ins._layers[1 /* scene */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer, "main", {
            /** 主界面 */
            get: function () {
                return this._ins._layers[2 /* main */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer, "window", {
            /** 一般界面 */
            get: function () {
                return this._ins._layers[3 /* window */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer, "upperWin", {
            /** 一般界面上一层 */
            get: function () {
                return this._ins._layers[4 /* upperWin */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer, "modal", {
            /** 压黑弹窗 */
            get: function () {
                return this._ins._layers[5 /* modal */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer, "bossReliveTip", {
            /**boss复活提示*/
            get: function () {
                return this._ins._layers[6 /* bossReliveTip */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer, "tip", {
            /** 飘字提示 */
            get: function () {
                return this._ins._layers[7 /* tip */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer, "top", {
            /** 最顶层，用于强制指引 */
            get: function () {
                return this._ins._layers[8 /* top */];
            },
            enumerable: true,
            configurable: true
        });
        Layer.setLyr = function (layer) {
            this._ins.setLyr(layer);
        };
        Layer.remLyr = function (layer) {
            this._ins.remLyr(layer);
        };
        Layer.getViewMdr = function (view) {
            var property = Object.getOwnPropertyDescriptor(view, "__mdr__");
            if (property) {
                return property.value;
            }
            return null;
        };
        Layer.hideMdr = function (layer, exclude) {
            for (var i = 0; i < layer.numChildren; i++) {
                var tmp = layer.getChildAt(i);
                if (tmp == Layer.modalSp || tmp == Layer.winSp || tmp == exclude) {
                    continue;
                }
                var mdr = this.getViewMdr(tmp);
                if (mdr) {
                    mdr.hide(true);
                    i--;
                }
            }
        };
        //点击压黑关闭界面
        Layer.onSpTap = function () {
            var layer = Layer.modalSp.parent;
            if (!layer) {
                return;
            }
            //设置压黑的层级
            var child = layer.getChildAt(layer.numChildren - 1);
            if (child && child.name == game.GuideFingerName) {
                //取到的是指引，则继续向下取
                child = layer.getChildAt(layer.numChildren - 2);
            }
            var mdr = Layer.getViewMdr(child);
            if (!mdr) {
                return;
            }
            if (mdr.isEasyHide) {
                mdr.hide();
            }
        };
        //关闭所有压黑界面
        Layer.onHideModalLayer = function () {
            var layer = Layer.modalSp.parent;
            if (!layer) {
                return;
            }
            for (var i = layer.numChildren - 1; i >= 1; --i) {
                //压黑底不用处理
                var child = layer.getChildAt(i);
                var mdr = Layer.getViewMdr(child);
                if (!mdr) {
                    continue;
                }
                mdr.hide();
            }
        };
        /** @internal */ Layer.prototype.setLyr = function (layer) {
            if (!layer) {
                return;
            }
            var old = this._layers[layer.idx];
            if (old && old !== layer) {
                for (var i = 0, n = old.numChildren; i < n; i++) {
                    layer.addChild(old.getChildAt(0));
                }
                _super.prototype.removeChild.call(this, old);
            }
            this._layers[layer.idx] = layer;
            this.addLyr(layer);
        };
        /** @internal */ Layer.prototype.addLyr = function (layer) {
            _super.prototype.addChildAt.call(this, layer, layer.idx);
        };
        /** @internal */ Layer.prototype.remLyr = function (layer) {
            if (!layer) {
                return;
            }
            if (this.contains(layer)) {
                _super.prototype.removeChild.call(this, layer);
            }
        };
        /** @internal */ Layer.prototype.onAddToStage = function (e) {
            this.onResize();
        };
        Layer.prototype.onResize = function () {
            if (!this.stage) {
                return;
            }
            for (var i = 0, n = this.numChildren; i < n; i++) {
                this.getChildAt(i).onResize();
            }
        };
        Layer.winSp = new Sprite();
        Layer.modalSp = new Sprite();
        return Layer;
    }(DisplayObjectContainer));
    game.Layer = Layer;
    __reflect(Layer.prototype, "game.Layer");
    var BaseLayer = /** @class */ (function (_super) {
        __extends(BaseLayer, _super);
        function BaseLayer(idx) {
            var _this = _super.call(this) || this;
            _this.width = gso.contentWidth;
            _this.height = gso.contentHeight;
            _this.idx = idx;
            _this.touchEnabled = false;
            _this.name = "Layer_" + _this.idx;
            return _this;
        }
        BaseLayer.prototype.onResize = function () {
            var stage = this.stage;
            this.x = (stage.stageWidth - this.width) / 2;
            this.y = (stage.stageHeight - this.height) / 2;
        };
        return BaseLayer;
    }(DisplayObjectContainer));
    __reflect(BaseLayer.prototype, "BaseLayer", ["game.UILayer"]);
    var SceneBottomLayer = /** @class */ (function (_super) {
        __extends(SceneBottomLayer, _super);
        function SceneBottomLayer() {
            return _super.call(this, 0 /* sceneBottom */) || this;
        }
        SceneBottomLayer.prototype.onResize = function () {
            var stage = this.stage;
            this.width = stage.stageWidth;
            this.height = stage.stageHeight;
        };
        return SceneBottomLayer;
    }(BaseLayer));
    __reflect(SceneBottomLayer.prototype, "SceneBottomLayer");
    var SceneLayer = /** @class */ (function (_super) {
        __extends(SceneLayer, _super);
        function SceneLayer() {
            return _super.call(this, 1 /* scene */) || this;
        }
        SceneLayer.prototype.onResize = function () {
            var stage = this.stage;
            this.width = stage.stageWidth;
            this.height = stage.stageHeight;
        };
        return SceneLayer;
    }(BaseLayer));
    __reflect(SceneLayer.prototype, "SceneLayer");
    var ModalLayer = /** @class */ (function (_super) {
        __extends(ModalLayer, _super);
        function ModalLayer() {
            return _super.call(this, 5 /* modal */) || this;
        }
        ModalLayer.prototype.$doAddChild = function (child, index, notifyListeners) {
            var res = _super.prototype.$doAddChild.call(this, child, index, notifyListeners);
            if (res == Layer.modalSp) {
                return res;
            }
            if (child.horizontalCenter === 0) {
                child.x = (this.width - child.width) / 2;
            }
            if (child.verticalCenter === 0) {
                child.y = (this.height - child.height) / 2;
            }
            this.updateModal();
            return res;
        };
        ModalLayer.prototype.$doRemoveChild = function (index, notifyListeners) {
            var res = _super.prototype.$doRemoveChild.call(this, index, notifyListeners);
            if (res == Layer.modalSp) {
                return res;
            }
            this.updateModal();
            return res;
        };
        ModalLayer.prototype.onResize = function () {
            _super.prototype.onResize.call(this);
            this.updateModal();
        };
        /** @internal */ ModalLayer.prototype.updateModal = function () {
            if (this.idx != 5 /* modal */) {
                return;
            }
            if (this.numChildren == 0) {
                return;
            }
            var modalSp = Layer.modalSp;
            var idx = this.getChildIndex(modalSp);
            if (idx == 0 && this.numChildren == 1) {
                this.remModal();
                return;
            }
            if (idx > -1) {
                this.setChildIndex(modalSp, this.numChildren - 2);
                return;
            }
            this.addModal();
        };
        /** @internal */ ModalLayer.prototype.addModal = function () {
            var modalSp = Layer.modalSp;
            modalSp.scaleX = gso.gameStage.stageWidth / modalSp.width;
            modalSp.scaleY = gso.gameStage.stageHeight / modalSp.height;
            modalSp.x = (this.width - modalSp.width * modalSp.scaleX) / 2;
            modalSp.y = (this.height - modalSp.height * modalSp.scaleY) / 2;
            this.addChildAt(modalSp, this.numChildren - 1);
            modalSp.addEventListener(TouchEvent.TOUCH_TAP, ModalLayer.onSpTap, ModalLayer);
        };
        /** @internal */ ModalLayer.prototype.remModal = function () {
            var modalSp = Layer.modalSp;
            if (modalSp == null) {
                return;
            }
            if (!this.contains(modalSp)) {
                return;
            }
            this.removeChild(modalSp);
            modalSp.removeEventListener(TouchEvent.TOUCH_TAP, ModalLayer.onSpTap, ModalLayer);
        };
        /** @internal */ ModalLayer.onSpTap = function (e) {
            Layer.onSpTap();
        };
        return ModalLayer;
    }(BaseLayer));
    __reflect(ModalLayer.prototype, "ModalLayer");
})(game || (game = {}));
var game;
(function (game) {
    var LogUtil = /** @class */ (function () {
        function LogUtil() {
        }
        //登录流程日志
        LogUtil.printLogin = function (str) {
            if (gso.printLogin) {
                console.info("登录流程日志: " + str);
            }
        };
        //战斗流程日志
        LogUtil.printBattle = function (str) {
            if (0) {
                console.info("战斗流程日志: " + str);
            }
        };
        //击退日志
        LogUtil.printBeatBack = function (str) {
            if (0) {
                console.info("击退日志: " + str);
            }
        };
        //监控 LoginProxy.isLoginAccount
        LogUtil.printIsLoginAccount = function (str) {
            if (0) {
                console.info("监控LoginProxy.isLoginAccount: " + str);
            }
        };
        //监控技能释放情况
        LogUtil.printSkill = function (str) {
            if (0) {
                console.info("监控技能释放情况: " + str);
            }
        };
        //修仙女仆自动挑战功能 todo
        LogUtil.printNvpuChallenge = function (str) {
            if (!window['stopNvpu']) {
                console.info('ayah ' + str);
            }
        };
        return LogUtil;
    }());
    game.LogUtil = LogUtil;
    __reflect(LogUtil.prototype, "game.LogUtil");
})(game || (game = {}));
var game;
(function (game) {
    var DisplayObjectContainer = egret.DisplayObjectContainer;
    var Handler = base.Handler;
    var BoneResType;
    (function (BoneResType) {
        BoneResType["TYPE_JSON"] = "_tex.json";
        BoneResType["TYPE_TEX"] = "_tex.png";
        BoneResType["TYPE_SKE"] = "_ske.json";
    })(BoneResType = game.BoneResType || (game.BoneResType = {}));
    var DragonBonesEx = /** @class */ (function (_super) {
        __extends(DragonBonesEx, _super);
        function DragonBonesEx() {
            var _this = _super.call(this) || this;
            _this._paths = [];
            _this._paths2 = [];
            _this.armatureDisplay_dict = {};
            _this.playTimes = 0;
            _this.timeScale = 1;
            return _this;
        }
        DragonBonesEx.prototype.setResName = function (name) {
            this.resName = name;
        };
        DragonBonesEx.prototype.loadResourceByName = function (parent, name) {
            if (this.isDisposed) {
                return;
            }
            this.resName = name;
            var pre = "assets/ui_bone_effect/";
            this._paths[0] = pre + name + BoneResType.TYPE_JSON;
            this._paths[1] = pre + name + BoneResType.TYPE_TEX;
            this._paths[2] = pre + name + BoneResType.TYPE_SKE;
            this._paths2 = this._paths.concat();
            game.LoadMgr.ins.addRef(this._paths[0]);
            game.LoadMgr.ins.addRef(this._paths[1]);
            game.LoadMgr.ins.addRef(this._paths[2]);
            var self = this;
            game.LoadMgr.ins.load(this._paths[0], Handler.alloc(self, self.onSucc), game.LoadPri.UI, Handler.alloc(self, self.onFail));
            game.LoadMgr.ins.load(this._paths[1], Handler.alloc(self, self.onSucc), game.LoadPri.UI, Handler.alloc(self, self.onFail));
            game.LoadMgr.ins.load(this._paths[2], Handler.alloc(self, self.onSucc), game.LoadPri.UI, Handler.alloc(self, self.onFail));
        };
        DragonBonesEx.prototype.onFail = function (url, realUrl, errMsg, errCode) {
            console.error(url + " 下载失败");
            console.error(realUrl + " 下载失败");
        };
        //加载完成
        DragonBonesEx.prototype.onSucc = function (data, url) {
            if (this._paths2[0] == url) {
                this.textureData = data;
            }
            else if (this._paths2[1] == url) {
                this.texture = data;
            }
            else if (this._paths2[2] == url) {
                this.skeletonData = data;
            }
            var index = this._paths.indexOf(url);
            if (index > -1) {
                this._paths.splice(index, 1);
            }
            if (this._paths.length <= 0) {
                this.createArmatureDisplay();
            }
        };
        DragonBonesEx.prototype.createArmatureDisplay = function () {
            var factory = dragonBones.EgretFactory.factory;
            factory.parseDragonBonesData(this.skeletonData);
            factory.parseTextureAtlasData(this.textureData, this.texture);
            var newDisplay = factory.buildArmatureDisplay(this.armatureName);
            if (newDisplay) {
                game.DisplayUtils.UnParent(this.armatureDisplay);
                this.armatureDisplay = newDisplay;
                this.armatureDisplay.animation.timeScale = this.timeScale;
                this.armatureDisplay.animation.play(this.animationName, this.playTimes);
                this.armatureDisplay.x = this.width >> 1;
                this.armatureDisplay.y = this.height >> 1;
                this._parentContainer.addChild(this.armatureDisplay);
                this.armatureDisplay_dict[this.armatureName + "_" + this.animationName] = newDisplay;
                if (!this.playing)
                    this.armatureDisplay.animation.stop();
            }
            // egret.Ticker.getInstance().register(function (advancedTime) {
            //     dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
            // }, this);
        };
        //播放龙骨
        DragonBonesEx.prototype.play = function (parent, armatureName, animationName, playTimes) {
            if (playTimes === void 0) { playTimes = 0; }
            this.armatureName = armatureName;
            this.animationName = animationName;
            this.playTimes = playTimes;
            if (!this.resName) {
                return;
            }
            this.playing = true;
            var nextDisplay = this.armatureDisplay_dict[this.armatureName + "_" + this.animationName];
            if (nextDisplay) {
                if (nextDisplay != this.armatureDisplay) {
                    game.DisplayUtils.UnParent(this.armatureDisplay);
                    this.armatureDisplay = nextDisplay;
                    this.armatureDisplay.x = this.width >> 1;
                    this.armatureDisplay.y = this.height >> 1;
                    this._parentContainer.addChild(this.armatureDisplay);
                }
                this.armatureDisplay.animation.timeScale = this.timeScale;
                this.armatureDisplay.animation.play(animationName, playTimes);
                return;
            }
            else {
                // DisplayUtils.UnParent(this.armatureDisplay)
                // this.armatureDisplay = null
            }
            this._parentContainer = parent;
            this.loadResourceByName(parent, this.resName);
        };
        DragonBonesEx.prototype.stop = function () {
            this.playing = false;
            if (this.armatureDisplay) {
                this.armatureDisplay.animation.stop();
            }
        };
        DragonBonesEx.prototype.setTimeScale = function (scale) {
            this.timeScale = scale;
            if (this.armatureDisplay) {
                this.armatureDisplay.animation.timeScale = scale;
            }
        };
        DragonBonesEx.prototype.dispose = function () {
            this.stop();
            // DisplayUtils.UnParent(this.armatureDisplay)
            for (var key in this.armatureDisplay_dict) {
                this.armatureDisplay_dict[key].dispose();
            }
            this.armatureDisplay = null;
            this.armatureDisplay_dict = null;
            //super.dispose()
        };
        return DragonBonesEx;
    }(DisplayObjectContainer));
    game.DragonBonesEx = DragonBonesEx;
    __reflect(DragonBonesEx.prototype, "game.DragonBonesEx");
})(game || (game = {}));
var game;
(function (game) {
    var Pool = base.Pool;
    var ObjBase = base.ObjBase;
    var AnimCtrl = /** @class */ (function (_super) {
        __extends(AnimCtrl, _super);
        function AnimCtrl() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._durations = [];
            _this._startTimes = [];
            _this._speed = 1;
            return _this;
        }
        Object.defineProperty(AnimCtrl.prototype, "compHandler", {
            set: function (value) {
                Pool.release(this._compHandler);
                this._compHandler = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimCtrl.prototype, "changeHandler", {
            set: function (value) {
                Pool.release(this._changeHandler);
                this._changeHandler = value;
            },
            enumerable: true,
            configurable: true
        });
        AnimCtrl.prototype.init = function (durations, url, speed, isLoop, isStart) {
            if (speed === void 0) { speed = 1; }
            if (isLoop === void 0) { isLoop = true; }
            if (isStart === void 0) { isStart = true; }
            var self = this;
            if (!self._url) {
                self._url = {};
            }
            if (isStart) {
                self._finalFrame = durations.length - 1;
                self._totalTime = 0;
                self._durations.length = 0;
                self._startTimes.length = 0;
                self._curFrame = 0;
                self._curTime = 0;
                self._playing = true;
                self._loop = isLoop;
                self._speed = speed;
                //����
                // self._durations.push(1);
                // self._startTimes.push(1);
                // self._finalFrame = 0;
                // self._finalFrame += durations.length- 1;
            }
            else {
                self._finalFrame += durations.length;
            }
            var startIndex = self._durations.length;
            for (var i = 0, n = durations.length; i < n; i++) {
                var dur = durations[i];
                self._durations[startIndex] = dur;
                self._startTimes[startIndex] = self._totalTime;
                self._totalTime += dur;
                if (!self._url[url]) {
                    self._url[startIndex] = url;
                }
                startIndex++;
            }
        };
        Object.defineProperty(AnimCtrl.prototype, "curFrame", {
            get: function () {
                return this._curFrame;
            },
            set: function (value) {
                var self = this;
                self._curFrame = value;
                self._curTime = 0;
                for (var i = 0; i < value; i++) {
                    self._curTime += self._durations[i];
                }
                self.onFrameChange();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimCtrl.prototype, "loop", {
            get: function () {
                return this._loop;
            },
            set: function (value) {
                this._loop = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimCtrl.prototype, "isPlaying", {
            get: function () {
                return this._playing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimCtrl.prototype, "isComplete", {
            get: function () {
                var self = this;
                if (isNaN(self._totalTime) || isNaN(self._curTime)) {
                    return false;
                }
                return !self._loop && self._curTime >= self._totalTime;
            },
            enumerable: true,
            configurable: true
        });
        AnimCtrl.prototype.play = function () {
            this._playing = true;
        };
        AnimCtrl.prototype.stop = function () {
            this._playing = false;
        };
        Object.defineProperty(AnimCtrl.prototype, "playing", {
            get: function () {
                return this._playing;
            },
            enumerable: true,
            configurable: true
        });
        AnimCtrl.prototype.advanceTime = function (elapseTime) {
            var self = this;
            if (!self._playing || elapseTime <= 0) {
                return;
            }
            var preFrame = self._curFrame;
            var isComplete = false;
            if (self._loop && self._curTime >= self._totalTime) {
                self._curTime = 0;
                self._curFrame = 0;
            }
            if (self._curTime < self._totalTime) {
                self._curTime += elapseTime * self._speed;
                while (self._curTime > self._startTimes[self._curFrame] + self._durations[self._curFrame]) {
                    if (self._curFrame == self._finalFrame) {
                        if (self._loop) {
                            self._curTime -= self._totalTime;
                            self._curFrame = 0;
                        }
                        else {
                            isComplete = true;
                            self._curTime = self._totalTime;
                            break;
                        }
                    }
                    else {
                        self._curFrame++;
                    }
                }
                if (self._curFrame == self._finalFrame && self._curTime == self._totalTime) {
                    isComplete = true;
                }
            }
            if (self._curFrame != preFrame) {
                self.onFrameChange();
            }
            if (isComplete) {
                self.onComplete();
            }
        };
        AnimCtrl.prototype.onFrameChange = function () {
            if (this._changeHandler) {
                var url = this._url[this._curFrame];
                this._changeHandler.exec([this._curFrame, url]);
            }
        };
        AnimCtrl.prototype.onComplete = function () {
            if (this._compHandler) {
                this._compHandler.exec();
            }
        };
        AnimCtrl.prototype.dispose = function () {
            this.onRelease();
        };
        AnimCtrl.prototype.onAlloc = function () {
        };
        AnimCtrl.prototype.onRelease = function () {
            var self = this;
            Pool.release(self._compHandler);
            self._compHandler = null;
            Pool.release(self._changeHandler);
            self._changeHandler = null;
            self._url = [];
            self._finalFrame = 0;
            self._totalTime = 0;
            self._durations.length = 0;
            self._startTimes.length = 0;
            self._curFrame = 0;
            self._curTime = 0;
            self._playing = false;
            self._loop = true;
            self._speed = 1;
        };
        return AnimCtrl;
    }(ObjBase));
    game.AnimCtrl = AnimCtrl;
    __reflect(AnimCtrl.prototype, "game.AnimCtrl", ["base.PoolObject", "base.DisposeObject"]);
})(game || (game = {}));
var game;
(function (game) {
    var DisplayObjectContainer = egret.DisplayObjectContainer;
    var Handler = base.Handler;
    var TimeMgr = base.TimeMgr;
    var Pool = base.Pool;
    var UIAnimate = /** @class */ (function (_super) {
        __extends(UIAnimate, _super);
        function UIAnimate() {
            var _this = _super.call(this) || this;
            _this._scaleXBmpOffX = 0;
            _this._curTimes = 0;
            _this.times = 0;
            _this.speed = 1;
            _this._playing = true;
            _this.touchEnabled = _this.touchChildren = false;
            _this.name = "UIAnimate";
            _this.init();
            return _this;
        }
        UIAnimate.prototype.init = function () {
            this._bmp = this.addChild(Pool.alloc(game.BitmapBase));
        };
        UIAnimate.prototype.load = function (source, frameRate, isFailBack, isMirror, scaleXBmpOffX) {
            if (frameRate === void 0) { frameRate = 12; }
            if (isFailBack === void 0) { isFailBack = false; }
            if (isMirror === void 0) { isMirror = false; }
            if (scaleXBmpOffX === void 0) { scaleXBmpOffX = 0; }
            var self = this;
            if (self._source == source) {
                return;
            }
            if (isMirror && !this._scaleXBmp) {
                this._scaleXBmp = this.addChild(Pool.alloc(game.BitmapBase));
                self._scaleXBmp.scaleX = -1;
                self._scaleXBmpOffX = scaleXBmpOffX;
            }
            self.removeCurrent();
            self._failTimes = 0;
            self._source = source;
            self._rate = frameRate;
            self._playing = true;
            game.LoadMgr.ins.addRef(source);
            game.LoadMgr.ins.loadMerge(source, Handler.alloc(self, self.onLoaded), game.LoadPri.UI, frameRate);
        };
        UIAnimate.prototype.onLoaded = function (data, url) {
            if (this._source != url || !data) {
                return;
            }
            var self = this;
            self._bmp.scaleX = self._bmp.scaleY = data.scale;
            self._data = data;
            var durList = [];
            for (var i = 0, n = data.numFrames; i < n; i++) {
                durList.push(data.getVal(i, "dur"));
            }
            self._ctrl.init(durList, url, self.speed);
            self._ctrl.loop = false;
            if (self._playing) {
                self.play();
            }
            else {
                self.stop();
            }
            self.onFrameChange(0);
        };
        UIAnimate.prototype.removeCurrent = function () {
            var self = this;
            self._data = undefined;
            game.LoadMgr.ins.decRef(self._source);
            self._source = undefined;
            self._rate = undefined;
            self._failTimes = undefined;
            self.stop();
            self._bmp.texture = null;
            if (self._scaleXBmp) {
                self._scaleXBmp.texture = null;
                self._bmp.scaleX = -1;
            }
            self._bmp.scaleX = self._bmp.scaleY = 1;
        };
        UIAnimate.prototype.play = function () {
            var self = this;
            self._playing = true;
            if (self._ctrl)
                self._ctrl.play();
            this._curTimes = 0;
            TimeMgr.addUpdateItem(self);
        };
        UIAnimate.prototype.stop = function () {
            var self = this;
            self._playing = false;
            if (self._ctrl)
                self._ctrl.stop();
            TimeMgr.removeUpdateItem(self);
        };
        Object.defineProperty(UIAnimate.prototype, "bmp", {
            get: function () {
                return this._bmp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIAnimate.prototype, "playing", {
            get: function () {
                return this._playing;
            },
            enumerable: true,
            configurable: true
        });
        UIAnimate.prototype.update = function (time) {
            this._ctrl.advanceTime(TimeMgr.getElapseTime(this));
        };
        UIAnimate.prototype.onFrameChange = function (frame) {
            this._data.drawTo(this._bmp, frame);
            if (this._scaleXBmp) {
                this._data.drawTo(this._scaleXBmp, frame);
                this._scaleXBmp.x *= -1;
                this._scaleXBmp.x += this._scaleXBmpOffX;
            }
        };
        UIAnimate.prototype.onComplete = function () {
            var self = this;
            self._curTimes++;
            if (self.times <= 0 || self._curTimes < self.times) {
                self._ctrl.curFrame = 0;
                self._ctrl.play();
            }
            else {
                if (self.complete) {
                    self.complete.exec(self);
                }
            }
        };
        UIAnimate.prototype.dispose = function () {
            this.onRelease();
        };
        UIAnimate.prototype.onAlloc = function () {
            var self = this;
            self._ctrl = Pool.alloc(game.AnimCtrl);
            self._ctrl.compHandler = Handler.alloc(self, self.onComplete);
            self._ctrl.changeHandler = Handler.alloc(self, self.onFrameChange);
        };
        UIAnimate.prototype.onRelease = function () {
            var self = this;
            self.removeCurrent();
            Pool.release(self.complete);
            self.times = 0;
            self.alpha = 1;
            self.scaleX = self.scaleY = 1;
            self.complete = undefined;
            self.speed = 1;
            Pool.release(self._ctrl);
            self._ctrl = undefined;
            self._playing = true;
            this._scaleXBmp = null;
            self.anchorOffsetX = 0;
            self.rotation = 0;
            self._bmp.width = NaN;
        };
        return UIAnimate;
    }(DisplayObjectContainer));
    game.UIAnimate = UIAnimate;
    __reflect(UIAnimate.prototype, "game.UIAnimate", ["base.UpdateItem", "base.PoolObject", "base.DisposeObject"]);
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var AssetsCfg = /** @class */ (function () {
        function AssetsCfg() {
            this.resMap = Object.create(null);
            this.groups = Object.create(null);
            this.subkeyMap = Object.create(null);
            this.urlMap = Object.create(null);
        }
        AssetsCfg.prototype.parse = function (data) {
            var self = this;
            for (var _i = 0, _a = data.groups; _i < _a.length; _i++) {
                var g = _a[_i];
                self.groups[g.name] = g.keys.split(",");
            }
            for (var _b = 0, _c = data.resources; _b < _c.length; _b++) {
                var r = _c[_b];
                var name = r.name, url = r.url, subkeys = r.subkeys;
                var info = { name: name, url: url };
                self.resMap[name] = info;
                self.urlMap[url] = name;
                if (subkeys) {
                    info.subkeys = subkeys.split(",");
                    for (var _d = 0, _e = info.subkeys; _d < _e.length; _d++) {
                        var subkey = _e[_d];
                        self.subkeyMap[subkey] = name;
                    }
                }
            }
        };
        return AssetsCfg;
    }());
    game.AssetsCfg = AssetsCfg;
    __reflect(AssetsCfg.prototype, "game.AssetsCfg");
})(game || (game = {}));
var game;
(function (game) {
    var Bitmap = egret.Bitmap;
    var Event = egret.Event;
    var Handler = base.Handler;
    var BitmapBase = /** @class */ (function (_super) {
        __extends(BitmapBase, _super);
        function BitmapBase(value) {
            var _this = _super.call(this, value) || this;
            _this.keepOnRem = false;
            return _this;
        }
        /** @internal */
        BitmapBase.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            var self = this;
            if (self.keepOnRem) {
                return;
            }
            if (self._oldStr) {
                if (!self._source) {
                    self.source = self._oldStr;
                }
                self._oldStr = null;
            }
        };
        /** @internal */
        BitmapBase.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            var self = this;
            if (self.keepOnRem) {
                return;
            }
            if (typeof self._source === "string") {
                self._oldStr = self._source;
                self.source = null;
            }
        };
        Object.defineProperty(BitmapBase.prototype, "source", {
            get: function () {
                return this._source;
            },
            /**
             * 设置显示内容，支持贴图地址，贴图对象
             */
            set: function (value) {
                var self = this;
                if (value === self._source) {
                    if (self.texture) {
                        self.dispatchEventWith(Event.COMPLETE);
                        self.onLoaded();
                    }
                    return;
                }
                if (typeof value === "string") {
                    self.removeCur();
                    self._source = value;
                    game.AssetsMgr.ins.addRef(self._source);
                    game.AssetsMgr.ins.getResAsync(value, Handler.alloc(self, self.onComplete));
                    return;
                }
                self.removeCur();
                self._source = value;
                self.texture = value;
            },
            enumerable: true,
            configurable: true
        });
        /** @internal */ BitmapBase.prototype.removeCur = function () {
            var self = this;
            self.texture = null;
            if (typeof self._source === "string") {
                game.AssetsMgr.ins.decRef(self._source);
            }
            self._source = null;
        };
        /** @internal */ BitmapBase.prototype.onComplete = function (r, url) {
            var self = this;
            if (self._source !== url) {
                return;
            }
            self.texture = r;
            self.dispatchEventWith(Event.COMPLETE);
            self.onLoaded();
        };
        BitmapBase.prototype.onLoaded = function () {
        };
        BitmapBase.prototype.removeFromParent = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        BitmapBase.prototype.verCenter = function () {
            var p = this.parent;
            if (p) {
                this.y = (p.height - this.height) * 0.5;
            }
        };
        BitmapBase.prototype.dispose = function () {
            this.onRelease();
        };
        BitmapBase.prototype.onAlloc = function () {
        };
        BitmapBase.prototype.onRelease = function () {
            var self = this;
            self.x = self.y = 0;
            self.scaleX = self.scaleY = self.alpha = 1;
            self.anchorOffsetX = self.anchorOffsetY = 0;
            self.width = self.height = NaN;
            self.removeCur();
            self.removeFromParent();
            self._oldStr = null;
        };
        return BitmapBase;
    }(Bitmap));
    game.BitmapBase = BitmapBase;
    __reflect(BitmapBase.prototype, "game.BitmapBase", ["base.PoolObject", "base.DisposeObject"]);
})(game || (game = {}));
var game;
(function (game) {
    var TimeMgr = base.TimeMgr;
    var Pool = base.Pool;
    var JsonTask = /** @class */ (function () {
        function JsonTask() {
        }
        JsonTask.prototype.start = function (source, onStep, onDone) {
            if (onDone === void 0) { onDone = undefined; }
            if (!source || !source.length || !onStep) {
                return;
            }
            this._source = source;
            this._onStep = onStep;
            this._onDone = onDone;
            TimeMgr.addUpdateItem(this, 15);
        };
        JsonTask.prototype.stop = function () {
            var self = this;
            if (!self._source) {
                return;
            }
            TimeMgr.removeUpdateItem(self);
            self._source = null;
            Pool.release(self._onStep);
            self._onStep = null;
            if (self._onDone) {
                self._onDone.exec();
            }
            Pool.release(self._onDone);
            self._onDone = null;
        };
        JsonTask.prototype.update = function (time) {
            var self = this;
            var source = self._source;
            if (!source) {
                return;
            }
            var t0 = egret.getTimer();
            for (var i = 0; i < 100; i++) {
                if (source.length) {
                    self._onStep.exec(JSON.parse(source.shift()));
                    if (egret.getTimer() - t0 > 15) {
                        break;
                    }
                }
                else {
                    self.stop();
                    return;
                }
            }
        };
        return JsonTask;
    }());
    game.JsonTask = JsonTask;
    __reflect(JsonTask.prototype, "game.JsonTask", ["base.UpdateItem"]);
})(game || (game = {}));
var game;
(function (game) {
    var Pool = base.Pool;
    var Texture = egret.Texture;
    var HttpResponseType = egret.HttpResponseType;
    /** @internal */ game.RETRY_TIME = 2;
    /** @internal */ game.INIT_RETRY_TIME = 9;
    /** @internal */ game.MAX_LOAD_THREAD = 8;
    game.LoadPri = {
        Map: 10,
        CreateRole: 20,
        UIScene: 50,
        UI: 80,
        Init: 100,
        SceneMain: 198,
        SceneMainPet: 199,
        Scene: 200,
        Max: 9999
    };
    game.MergeCfgType = {
        Bin: ".bin",
        Json: ".json"
    };
    /**
     * 微信小游戏用到
     */
    var ResType;
    (function (ResType) {
        ResType["IMAGE"] = "image";
        ResType["JSON"] = "json";
        ResType["ZIP"] = "zip";
        ResType["TEXT"] = "text";
        ResType["SOUND"] = "sound";
        ResType["BINARY"] = "binary";
        ResType["KTX"] = "ktx";
    })(ResType = game.ResType || (game.ResType = {}));
    /** @internal */ var ExtType = {
        ".png": ResType.IMAGE,
        ".jpg": ResType.IMAGE,
        ".gif": ResType.IMAGE,
        ".jpeg": ResType.IMAGE,
        ".bmp": ResType.IMAGE,
        ".ktx": ResType.KTX,
        ".json": ResType.JSON,
        ".zip": ResType.ZIP,
        ".txt": ResType.TEXT,
        ".exml": ResType.TEXT,
        ".tmx": ResType.TEXT,
        ".mp3": ResType.SOUND,
        ".ogg": ResType.SOUND,
        ".mpeg": ResType.SOUND,
        ".wav": ResType.SOUND,
        ".m4a": ResType.SOUND,
        ".mp4": ResType.SOUND,
        ".aiff": ResType.SOUND,
        ".wma": ResType.SOUND,
        ".mid": ResType.SOUND,
    };
    function parseObj(obj) {
        if (obj instanceof egret.ByteArray) {
            return JSON.parse(obj.readUTFBytes(obj.bytesAvailable));
        }
        if (typeof obj === "string") {
            try {
                obj = JSON.parse(obj);
            }
            catch (e) {
            }
        }
        return obj;
    }
    game.parseObj = parseObj;
    function getUrlExt(url) {
        var idx = url.lastIndexOf(".");
        if (idx < 0) {
            return "";
        }
        var ext = url.substring(idx).toLowerCase();
        var ext_idx = ext.indexOf("?");
        if (ext_idx > -1) {
            ext = ext.substring(0, ext_idx);
        }
        return ext;
    }
    game.getUrlExt = getUrlExt;
    function getResType(ext) {
        var type = ExtType[ext];
        return type ? type : ResType.BINARY;
    }
    game.getResType = getResType;
    /** @internal */ function loadImg(url, source) {
        var loader = new egret.ImageLoader();
        loader.load(url);
        return loader;
    }
    /** @internal */ function loadTxt(url, source) {
        var loader = new egret.HttpRequest();
        loader.responseType = HttpResponseType.TEXT;
        loader.setRequestHeader("Content-Type", "text/plain");
        loader.open(url, egret.HttpMethod.GET);
        loader.send();
        return loader;
    }
    /** @internal */ function loadJson(url, source) {
        var loader = new egret.HttpRequest();
        loader.responseType = HttpResponseType.TEXT;
        loader.open(url, egret.HttpMethod.GET);
        loader.send();
        return loader;
    }
    /** @internal */ function loadBin(url, source) {
        var loader = new egret.HttpRequest();
        loader.responseType = egret.HttpResponseType.ARRAY_BUFFER;
        loader.open(url, egret.HttpMethod.GET);
        loader.send();
        return loader;
    }
    /** @internal */ function loadSound(url, source) {
        var loader = new egret.Sound();
        loader.load(url);
        return loader;
    }
    /**
     * 微信重载此方法
     */
    function getTypeLdr(source, type) {
        switch (type) {
            case ResType.IMAGE:
                return loadImg;
            case ResType.JSON:
                return loadJson;
            case ResType.TEXT:
                return loadTxt;
            case ResType.SOUND:
                return loadSound;
            case ResType.BINARY:
            case ResType.KTX:
                return loadBin;
        }
        return null;
    }
    game.getTypeLdr = getTypeLdr;
    /** @internal */ function dcdImg(loader) {
        var texture = Pool.alloc(Texture);
        texture.bitmapData = loader.data;
        return texture;
    }
    /** @internal */ function dcdKtx(loader, url) {
        var texture = Pool.alloc(Texture);
        var data = loader.response;
        // let ktx = new egret.KTXContainer(data, 1);
        // if (ktx.isInvalid) {
        //     console.error(`ktx: is invalid`);
        //     return null;
        // }
        texture.ktxData = data;
        // let bitmapData = new egret.BitmapData(data);
        // bitmapData.debugCompressedTextureURL = url;
        // bitmapData.format = 'ktx';
        // ktx.uploadLevels(bitmapData, false);
        // texture._setBitmapData(bitmapData);
        return texture;
    }
    /** @internal */ function dcdTxt(loader) {
        return loader.response;
    }
    /** @internal */ function dcdJson(loader) {
        var resp = loader.response;
        try {
            return JSON.parse(resp);
        }
        catch (e) {
            return new Error("len:" + (resp ? resp.length : "undefined") + " " + e.name + ":" + e.message);
        }
    }
    /** @internal */ function dcdBin(loader) {
        var data = loader.response;
        var bytes;
        if (data instanceof ArrayBuffer) {
            try {
                data = ggo.inflate(data);
            }
            catch (e) {
            }
            bytes = new egret.ByteArray(data);
        }
        return bytes;
    }
    /** @internal */ function dcdSound(loader) {
        return loader;
    }
    /**
     * 微信重载此方法
     */
    function getTypeDcd(source, type) {
        switch (type) {
            case ResType.IMAGE:
                return dcdImg;
            case ResType.JSON:
                return dcdJson;
            case ResType.TEXT:
                return dcdTxt;
            case ResType.SOUND:
                return dcdSound;
            case ResType.BINARY:
                return dcdBin;
            case ResType.KTX:
                return dcdKtx;
        }
        return null;
    }
    game.getTypeDcd = getTypeDcd;
})(game || (game = {}));
var game;
(function (game) {
    var Handler = base.Handler;
    var Pool = base.Pool;
    var TimeMgr = base.TimeMgr;
    var ByteArray = egret.ByteArray;
    var Texture = egret.Texture;
    var delayCall = base.delayCall;
    /** @internal */ game.TextureScale = 1;
    var LoadMgr = /** @class */ (function () {
        /** @internal */ function LoadMgr() {
            /** @internal */ this._uiShow = false;
            /** @internal */ this._lastGcT = 0;
            this.init();
        }
        Object.defineProperty(LoadMgr, "ins", {
            get: function () {
                if (!this._ins) {
                    this._ins = new LoadMgr();
                }
                return this._ins;
            },
            enumerable: true,
            configurable: true
        });
        /** @internal */ LoadMgr.prototype.init = function () {
            egret.ImageLoader.crossOrigin = "anonymous";
            var self = this;
            self._resMap = Object.create(null);
            self._loadingMap = Object.create(null);
            self._workingList = [];
            self._waitingList = [];
            self._succList = [];
            self._failList = [];
            self._groupInfo = Object.create(null);
            self._imgTmp = Object.create(null);
            //3分钟
            self._releaseTime = 180000;
            //1分钟
            self._mapReleaseTime = 60000;
            self._gcInterval = 360000;
            self._lastCheck = 0;
            self._lastGcT = base.TimeMgr.time.time;
            TimeMgr.addUpdateItem(self);
        };
        /** @internal */ LoadMgr.prototype.loadSheet = function (handler) {
            var self = this;
            var url = LoadMgr.SheetData;
            if (!self.exists(url)) {
                handler.exec([url, url]);
                Pool.release(handler);
                return;
            }
            var onLoaded = function (data, url) {
                self._resMap[url] = null;
                delete self._resMap[url];
                new game.JsonTask().start(data, Handler.alloc(self, function (obj) {
                    self.addJsonRes(obj.key, obj.value);
                }), Handler.alloc(self, function () {
                    handler.exec([url, url]);
                }));
            };
            self.load(url, Handler.alloc(self, onLoaded), game.LoadPri.Init);
        };
        LoadMgr.prototype.loadJsonList = function (jsonList, onProg, onComp) {
            if (!jsonList || !jsonList.length) {
                return;
            }
            var self = this;
            var cnt = 0;
            var tot = jsonList.length;
            var strJsonList = jsonList.toString();
            function compOne() {
                onProg.exec();
                cnt++;
                if (cnt == tot) {
                    onComp.exec([strJsonList, strJsonList]);
                    Pool.release(onProg);
                    Pool.release(onComp);
                }
            }
            function onOneJson(idx, url) {
                var data = self._resMap[url];
                new game.JsonTask().start(data, Handler.alloc(self, function (obj) {
                    if (obj.key.indexOf("assets/") > -1) {
                        self.addJsonRes(obj.key, obj.value);
                    }
                    else {
                        self._resMap[obj.key] = obj.value;
                        self.addRef(obj.key);
                    }
                }), Handler.alloc(self, compOne));
                delayCall(Handler.alloc(self, function () { return self.unload(url); }));
            }
            self.loadGroup(jsonList, null, game.LoadPri.Init, Handler.alloc(self, onOneJson));
        };
        //提前加载数据
        LoadMgr.prototype.loadPreData = function (url) {
            var self = this;
            function onOneJson(data) {
                var _keys = data ? Object.keys(data) : null;
                if (_keys && _keys.length) {
                    for (var _i = 0, _keys_1 = _keys; _i < _keys_1.length; _i++) {
                        var _k = _keys_1[_i];
                        self.addJsonRes(_k, data[_k]);
                    }
                }
                delayCall(Handler.alloc(self, function () { return self.unload(url); }));
            }
            self.load(url, Handler.alloc(this, onOneJson), game.LoadPri.UIScene);
        };
        LoadMgr.prototype.getRealUrl = function (url, ext) {
            if (url.indexOf("://") > -1 && url.indexOf(gso.cdn_url) < 0) {
                return url;
            }
            if (/^assets\/\w{2,}\/\w{32}\.\w+$/.test(url)) {
                return url;
            }
            if (ext === ".txt") {
                return url;
            }
            if (url === LoadMgr.VCfg) {
                return game.VerCfgUrl;
            }
            var self = this;
            if (!self.urlHash) {
                return url;
            }
            var arr = url.split("/");
            var hash = self.getHashArr(arr);
            if (hash) {
                var dirname = hash.substr(0, 2);
                if (dirname === "ad") {
                    dirname = "dirad";
                }
                return "assets/" + dirname + "/" + hash + ext;
            }
            if (url.indexOf("assets/map/") > -1) {
                hash = LoadMgr.ins.getHashArr(arr.slice(0, 3));
                if (hash) {
                    arr[2] = hash;
                    return arr.join("/");
                }
            }
            return null;
        };
        /** @internal */ LoadMgr.prototype.getHashArr = function (arr) {
            var obj = this.urlHash;
            var i = 0;
            var len = arr.length;
            while (obj && i < len) {
                obj = obj[arr[i]];
                i++;
            }
            return typeof obj === "string" ? obj : null;
        };
        LoadMgr.prototype.exists = function (url) {
            if (!this.urlHash) {
                return false;
            }
            return this.getHashArr(url.split("/")) !== null;
        };
        LoadMgr.prototype.getRes = function (url) {
            var json = game.ResLdr.JsonObj[url];
            if (json) {
                return json;
            }
            return this._resMap[url];
        };
        LoadMgr.prototype.setUIShow = function (value) {
            var self = this;
            if (self._uiShow === value) {
                return;
            }
            self._uiShow = value;
            if (value) {
                self.checkNow();
            }
        };
        LoadMgr.prototype.getAnimDur = function (url) {
            var data = this.getRes(url + game.MergeCfgType.Json);
            if (!data) {
                data = this.getRes(url + game.MergeCfgType.Bin);
                if (!data) {
                    return null;
                }
            }
            var result = [];
            var s = game.MergedBmp;
            var idx = s.Pos.indexOf("dur");
            if (Array.isArray(data)) {
                for (var frame = 0, numFrames = data.length; frame < numFrames; frame++) {
                    result.push(data[frame][idx]);
                }
            }
            else if (data instanceof ByteArray) {
                data.position = 0;
                var numFrames = data.readShort();
                for (var frame = 0; frame < numFrames; frame++) {
                    data.position = s.HeadSize + (s.Pos.length * frame + idx) * s.Size;
                    result.push(data.readShort());
                }
            }
            return result;
        };
        /**检测是否还需要再次下载*/
        LoadMgr.prototype.checkNeedLoad = function (url) {
            var errorNum = LoadMgr.FailList[url] || 0;
            return errorNum < 1;
        };
        /**已经加载过的资源，重复加载是不会执行onSucc回调的*/
        LoadMgr.prototype.load = function (url, onSucc, priority, onFail) {
            if (url == "") {
                return;
            }
            if (!this.checkNeedLoad(url)) {
                return;
            }
            var self = this;
            var workIdx = -1;
            var item = self.getLoadingItem(url);
            if (!item) {
                item = Pool.alloc(game.LoadingItem);
                item.url = url;
                self._loadingMap[url] = item;
            }
            else {
                workIdx = self._workingList.indexOf(item);
            }
            var o = this._imgTmp[url];
            if (o && o.pri > priority) {
                o.pri = priority;
            }
            item.priority = priority;
            item.addSucc(onSucc);
            item.addFail(onFail);
            var res = self.getRes(url);
            if (res) {
                if (self._succList.indexOf(url) < 0) {
                    self._succList.push(url);
                }
                return;
            }
            if (workIdx > -1) {
                return;
            }
            self.addToWait(item);
        };
        LoadMgr.prototype.unload = function (url) {
            if (!url) {
                return;
            }
            var self = this;
            var item = self.getLoadingItem(url);
            if (item) {
                if (item.mergedBmp) {
                    var imgItem = self.getLoadingItem(item.url + game.ExtPng);
                    if (imgItem) {
                        self.removeWorking(imgItem.url);
                        self.removeProcessing(imgItem.url);
                    }
                }
                self.removeWorking(url);
                self.removeProcessing(url);
            }
            var res = self._resMap[url];
            if (res) {
                if (res instanceof game.MergedBmp) {
                    Pool.release(res);
                }
                else if (res instanceof Texture) {
                    Pool.release(res);
                }
                else if (typeof res.dispose === "function") {
                    res.dispose();
                }
            }
            self._resMap[url] = null;
            delete self._resMap[url];
        };
        LoadMgr.prototype.addJsonRes = function (url, res) {
            game.ResLdr.JsonObj[url] = res;
        };
        LoadMgr.prototype.loadMerge = function (url, onSucc, priority, frameRate) {
            if (!this.checkNeedLoad(url)) {
                console.error(url + " loadMerge 不需要再次触发下载");
                return;
            }
            var type = game.MergeCfgType.Json;
            var self = this;
            var item = self.getLoadingItem(url);
            if (!item) {
                item = Pool.alloc(game.LoadingItem);
                item.url = url;
                item.priority = priority;
                self._loadingMap[url] = item;
            }
            var o = this._imgTmp[url];
            if (o && o.pri > priority) {
                o.pri = priority;
            }
            item.addSucc(onSucc);
            var res = self.getRes(url);
            if (res) {
                if (self._succList.indexOf(url) < 0) {
                    self._succList.push(url);
                }
            }
            else if (!item.mergedBmp) {
                var mergedBmp = Pool.alloc(game.MergedBmp);
                item.mergedBmp = mergedBmp;
                mergedBmp.init(url, type, priority, frameRate);
                LoadMgr.ins.load(url + game.ExtPng, Handler.alloc(mergedBmp, mergedBmp.imgLoaded), priority);
                LoadMgr.ins.load(url + type, Handler.alloc(mergedBmp, mergedBmp.cfgLoaded), priority);
            }
            else {
                if (item.priority > priority) {
                    var pngItem = self.getLoadingItem(url + game.ExtPng);
                    if (pngItem) {
                        pngItem.priority = priority;
                    }
                    var typeItem = self.getLoadingItem(url + type);
                    if (typeItem) {
                        typeItem.priority = priority;
                    }
                    item.priority = priority;
                }
            }
        };
        /** @internal */ LoadMgr.prototype.onMergedLoaded = function (merged) {
            var self = this;
            var url = merged.url;
            var item = self.getLoadingItem(url);
            if (item) {
                item.mergedBmp = null;
            }
            self._resMap[url + game.ExtPng] = null;
            delete self._resMap[url + game.ExtPng];
            self._resMap[url] = merged;
            if (self._succList.indexOf(url) < 0) {
                self._succList.push(url);
            }
        };
        LoadMgr.prototype.addRef = function (url) {
            if (!url) {
                return;
            }
            var o = this._imgTmp[url];
            var t = TimeMgr.time.time;
            if (!o) {
                this._imgTmp[url] = { count: 1, time: t, pri: game.LoadPri.Max };
            }
            else {
                o.count = o.count + 1;
                o.time = t;
            }
        };
        LoadMgr.prototype.decRef = function (url) {
            if (!url) {
                return;
            }
            var o = this._imgTmp[url];
            if (!o) {
                return;
            }
            o.count = o.count - 1;
            o.time = TimeMgr.time.time;
        };
        LoadMgr.prototype.checkNow = function () {
            var self = this;
            var tmpDel = [];
            for (var k in self._imgTmp) {
                var o = self._imgTmp[k];
                if (o && o.count < 1) {
                    self.unload(k);
                    tmpDel.push(k);
                }
            }
            for (var _i = 0, tmpDel_1 = tmpDel; _i < tmpDel_1.length; _i++) {
                var k = tmpDel_1[_i];
                delete self._imgTmp[k];
            }
            // if (ggo.triggerGC) {
            //     self._lastGcT = base.TimeMgr.time.time;
            //     ggo.triggerGC();
            // }
        };
        LoadMgr.prototype.loadGroup = function (list, onComp, priority, onProg) {
            var idx = LoadMgr.GroupIdx++;
            this._groupInfo[idx] = { urls: list, loaded: [], onComp: onComp, onProg: onProg };
            for (var _i = 0, list_5 = list; _i < list_5.length; _i++) {
                var url = list_5[_i];
                this.load(url, Handler.alloc(this, this.onGroupOne), priority, Handler.alloc(this, this.onGroupFail));
            }
            return idx;
        };
        /** @internal */ LoadMgr.prototype.loadMergeGroup = function (list, onComp, priority, onProg) {
            var idx = LoadMgr.GroupIdx++;
            this._groupInfo[idx] = { urls: list, loaded: [], onComp: onComp, onProg: onProg };
            for (var _i = 0, list_6 = list; _i < list_6.length; _i++) {
                var url = list_6[_i];
                this.loadMerge(url, Handler.alloc(this, this.onGroupOne), priority);
            }
            return idx;
        };
        /** @internal */ LoadMgr.prototype.getGroupLoaded = function (idx) {
            var info = this._groupInfo[idx];
            if (info) {
                return info.loaded.length;
            }
            return 0;
        };
        /** @internal */ LoadMgr.prototype.onGroupOne = function (data, url) {
            this.progGroup(url);
        };
        /** @internal */ LoadMgr.prototype.onGroupFail = function (url) {
            this.progGroup(url);
        };
        /** @internal */ LoadMgr.prototype.progGroup = function (url) {
            var tmpDel = [];
            var idx = this.getGroupIdx(url);
            if (idx === 0) {
                return;
            }
            var info = this._groupInfo[idx];
            if (info.loaded.indexOf(url) < 0) {
                info.loaded.push(url);
            }
            if (info.onProg) {
                info.onProg.exec([idx, url]);
            }
            if (info.loaded.length === info.urls.length) {
                if (info.onComp) {
                    info.onComp.exec(idx);
                }
                tmpDel.push(idx);
            }
            for (var _i = 0, tmpDel_2 = tmpDel; _i < tmpDel_2.length; _i++) {
                idx = tmpDel_2[_i];
                info = this._groupInfo[idx];
                this._groupInfo[idx] = null;
                delete this._groupInfo[idx];
                Pool.release(info.onComp);
                Pool.release(info.onProg);
            }
        };
        /** @internal */ LoadMgr.prototype.getGroupIdx = function (url) {
            for (var idx in this._groupInfo) {
                var info = this._groupInfo[idx];
                if (info && info.urls.indexOf(url) > -1) {
                    return +idx;
                }
            }
            return 0;
        };
        /** @internal */ LoadMgr.prototype.getLoadingItem = function (url) {
            return this._loadingMap[url];
        };
        /** @internal */ LoadMgr.prototype.addToWait = function (item) {
            if (this._waitingList.indexOf(item) > -1) {
                return;
            }
            var list = this._waitingList;
            var idx = 0;
            for (; idx < list.length; idx++) {
                var queueItem = list[idx];
                if (queueItem.priority > item.priority) {
                    break;
                }
            }
            game.ArrayUtil.insertAt(list, idx, item);
        };
        /** @internal */ LoadMgr.prototype.getIsScene = function (priority) {
            return priority === game.LoadPri.SceneMain
                || priority === game.LoadPri.SceneMainPet
                || priority === game.LoadPri.Scene
                || priority === game.LoadPri.Map;
        };
        /** @internal */ LoadMgr.prototype.loadNext = function () {
            var waiting = this._waitingList;
            var working = this._workingList;
            var uiShow = this._uiShow;
            for (var i = 0; i < waiting.length; i++) {
                if (working.length >= game.MAX_LOAD_THREAD) {
                    break;
                }
                var item = waiting[i];
                if (uiShow && item.type === game.ResType.IMAGE && this.getIsScene(item.priority)) {
                    continue;
                }
                game.ArrayUtil.removeAt(waiting, i);
                i--;
                working.push(item);
                item.loader = Pool.alloc(game.ResLdr);
                item.loader.load(item.url, item.type);
            }
        };
        /** @internal */ LoadMgr.prototype.removeWorking = function (url) {
            var item = this.getLoadingItem(url);
            var idx = this._workingList.indexOf(item);
            if (idx > -1) {
                game.ArrayUtil.removeAt(this._workingList, idx);
            }
        };
        /** @internal */ LoadMgr.prototype.removeProcessing = function (url) {
            var item = this.getLoadingItem(url);
            if (!item) {
                return;
            }
            var idx = this._waitingList.indexOf(item);
            if (idx > -1) {
                game.ArrayUtil.removeAt(this._waitingList, idx);
            }
            if (item.mergedBmp) {
                Pool.release(item.mergedBmp);
                item.mergedBmp = null;
            }
            if (!item.running) {
                this._loadingMap[url] = null;
                delete this._loadingMap[url];
                Pool.release(item);
            }
        };
        /** @internal */ LoadMgr.prototype.onSucc = function (url, data) {
            var self = this;
            self._resMap[url] = data;
            if (self._succList.indexOf(url) < 0) {
                self._succList.push(url);
            }
            self.removeWorking(url);
        };
        /** @internal */ LoadMgr.prototype.onFail = function (url, realUrl, errMsg, errCode) {
            var self = this;
            var item = self.getLoadingItem(url);
            self.removeWorking(url);
            var retryTime = item.priority === game.LoadPri.Init ? game.INIT_RETRY_TIME : game.RETRY_TIME;
            if (item.errCnt < retryTime) {
                item.errCnt++;
                self.addToWait(item);
            }
            else {
                var update = false;
                for (var _i = 0, _a = self._failList; _i < _a.length; _i++) {
                    var obj = _a[_i];
                    if (obj.url === url) {
                        update = true;
                        obj.errMsg = errMsg;
                        obj.errCode = errCode;
                    }
                }
                if (!update) {
                    self._failList.push({ url: url, realUrl: realUrl, errMsg: errMsg, errCode: errCode });
                }
            }
        };
        LoadMgr.prototype.update = function (time) {
            var self = this;
            self.procSucc();
            self.procFail();
            if (time.time - self._lastCheck > 1000) {
                self._lastCheck = time.time;
                self.procRem(time.time);
            }
            self.procWait();
            if (ggo.triggerGC && time.time - self._lastGcT > self._gcInterval) {
                self._lastGcT = time.time;
                ggo.triggerGC();
            }
            self.loadNext();
        };
        /** @internal */ LoadMgr.prototype.procWait = function () {
            var self = this;
            var tmpDel = [];
            for (var k in self._imgTmp) {
                var obj = self._imgTmp[k];
                if (!obj || obj.count !== 0) {
                    continue;
                }
                var item = self.getLoadingItem(k);
                if (!item) {
                    continue;
                }
                var idx = self._waitingList.indexOf(item);
                if (idx >= 0) {
                    self.removeProcessing(k);
                    tmpDel[tmpDel.length] = k;
                }
                else if (item.mergedBmp) {
                    var imgItem = self.getLoadingItem(item.url + game.ExtPng);
                    if (!imgItem) {
                        continue;
                    }
                    idx = self._waitingList.indexOf(imgItem);
                    if (idx >= 0) {
                        self.removeProcessing(imgItem.url);
                        self.removeProcessing(item.url);
                        tmpDel[tmpDel.length] = k;
                    }
                }
            }
            for (var _i = 0, tmpDel_3 = tmpDel; _i < tmpDel_3.length; _i++) {
                var k = tmpDel_3[_i];
                delete self._imgTmp[k];
            }
        };
        /** @internal */ LoadMgr.prototype.procRem = function (time) {
            var self = this;
            var tmpDel = [];
            for (var k in self._imgTmp) {
                var o = self._imgTmp[k];
                //if (o && o.count < 1 && time - o.time >= self._releaseTime) {
                if (o && o.count < 1) {
                    var releaseTime = self._releaseTime;
                    if (k.indexOf("assets/map") > -1) {
                        releaseTime = this._mapReleaseTime;
                    }
                    if (time - o.time >= releaseTime) {
                        self.unload(k);
                        tmpDel.push(k);
                    }
                }
            }
            for (var _i = 0, tmpDel_4 = tmpDel; _i < tmpDel_4.length; _i++) {
                var k = tmpDel_4[_i];
                delete self._imgTmp[k];
            }
        };
        /** @internal */ LoadMgr.prototype.procSucc = function () {
            var self = this;
            for (var _i = 0, _a = self._succList; _i < _a.length; _i++) {
                var url = _a[_i];
                var item = self.getLoadingItem(url);
                if (!item) {
                    continue;
                }
                var data = self.getRes(url);
                item.onSucc(data);
                self.removeProcessing(url);
            }
            self._succList.length = 0;
        };
        /** @internal */ LoadMgr.prototype.procFail = function () {
            var self = this;
            for (var _i = 0, _a = self._failList; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (!obj.realUrl) {
                    console.error("res load error:" + "url:" + obj.url);
                    if (!LoadMgr.FailList[obj.url]) {
                        LoadMgr.FailList[obj.url] = 1;
                    }
                    else {
                        LoadMgr.FailList[obj.url] += 1;
                    }
                }
                else if (obj.errCode || obj.errMsg) {
                    if (obj.errCode !== 0 && obj.errMsg !== "time out") {
                        console.error("res load error:" + "url:" + obj.realUrl, "code:" + obj.errCode, "errMsg:" + obj.errMsg);
                        if (!LoadMgr.FailList[obj.url]) {
                            LoadMgr.FailList[obj.url] = 1;
                        }
                        else {
                            LoadMgr.FailList[obj.url] += 1;
                        }
                    }
                }
                var url = obj.url;
                var item = self.getLoadingItem(url);
                if (!item) {
                    continue;
                }
                item.onFail();
                self.removeProcessing(url);
            }
            self._failList.length = 0;
        };
        LoadMgr.SheetData = "assets/data/sheet.json";
        LoadMgr.VCfg = "assets/data/vcfg.json";
        LoadMgr.FailList = {};
        /** @internal */ LoadMgr.GroupIdx = 1;
        return LoadMgr;
    }());
    game.LoadMgr = LoadMgr;
    __reflect(LoadMgr.prototype, "game.LoadMgr", ["base.UpdateItem"]);
})(game || (game = {}));
/** @internal */ var game;
(function (game) {
    var Handler = base.Handler;
    var Pool = base.Pool;
    var LoadingItem = /** @class */ (function () {
        function LoadingItem() {
        }
        Object.defineProperty(LoadingItem.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoadingItem.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (value) {
                this._url = value;
                if (value) {
                    this._type = game.getResType(game.getUrlExt(value));
                }
                else {
                    this._type = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoadingItem.prototype, "loader", {
            get: function () {
                return this._loader;
            },
            set: function (value) {
                if (value == null) {
                    if (this._loader) {
                        Pool.release(this._loader);
                    }
                }
                this._loader = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoadingItem.prototype, "running", {
            get: function () {
                return this._running;
            },
            enumerable: true,
            configurable: true
        });
        LoadingItem.prototype.addSucc = function (handler) {
            this.addToList(handler, this._succHandler);
        };
        LoadingItem.prototype.addFail = function (handler) {
            this.addToList(handler, this._failHandler);
        };
        LoadingItem.prototype.onSucc = function (data) {
            this.callList(this._succHandler, [data, this._url]);
        };
        LoadingItem.prototype.onFail = function () {
            this.callList(this._failHandler, [null, this._url]);
        };
        /** @internal */ LoadingItem.prototype.addToList = function (handler, list) {
            if (handler == null) {
                return;
            }
            if (list.indexOf(handler) > -1) {
                return;
            }
            for (var _i = 0, list_7 = list; _i < list_7.length; _i++) {
                var h = list_7[_i];
                if (Handler.equal(handler, h)) {
                    Pool.release(handler);
                    return;
                }
            }
            list.push(handler);
        };
        /** @internal */ LoadingItem.prototype.callList = function (list, data) {
            if (data === void 0) { data = null; }
            this._running = true;
            for (var _i = 0, list_8 = list; _i < list_8.length; _i++) {
                var h = list_8[_i];
                h.exec(data);
                Pool.release(h);
            }
            list.length = 0;
            this._running = false;
        };
        LoadingItem.prototype.dispose = function () {
            this.onRelease();
        };
        LoadingItem.prototype.onAlloc = function () {
            this.errCnt = 0;
            this._running = false;
            this._succHandler = [];
            this._failHandler = [];
        };
        LoadingItem.prototype.onRelease = function () {
            var self = this;
            self.mergedBmp = null;
            self.loader = null;
            self.errCnt = 0;
            self._running = false;
            self._url = null;
            self._type = null;
            var h;
            if (self._succHandler) {
                for (var _i = 0, _a = self._succHandler; _i < _a.length; _i++) {
                    h = _a[_i];
                    Pool.release(h);
                }
                self._succHandler = undefined;
            }
            if (self._failHandler) {
                for (var _b = 0, _c = self._failHandler; _b < _c.length; _b++) {
                    h = _c[_b];
                    Pool.release(h);
                }
                self._failHandler = undefined;
            }
        };
        return LoadingItem;
    }());
    game.LoadingItem = LoadingItem;
    __reflect(LoadingItem.prototype, "game.LoadingItem", ["base.PoolObject", "base.DisposeObject"]);
})(game || (game = {}));
var game;
(function (game) {
    var Texture = egret.Texture;
    var ByteArray = egret.ByteArray;
    var Pool = base.Pool;
    /** @internal */ game.ExtPng = ".png";
    var MergedBmp = /** @class */ (function () {
        function MergedBmp() {
            /** @internal */ this._bitmapX = 0;
            /** @internal */ this._bitmapY = 0;
            /** @internal */ this._subMap = Object.create(null);
        }
        Object.defineProperty(MergedBmp.prototype, "url", {
            /** @internal */ get: function () {
                return this._url;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MergedBmp.prototype, "scale", {
            get: function () {
                return this._scale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MergedBmp.prototype, "numFrames", {
            get: function () {
                if (this._jsonKeys) {
                    return this._jsonKeys.length;
                }
                if (this._frames) {
                    return this._frames.length;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MergedBmp.prototype, "isLoaded", {
            get: function () {
                // let supportedCompressedTexture = egret.Capabilities.supportedCompressedTexture;
                return this._texture != null && (this._frames != null || this._json != null);
                // && (DEBUG || (!supportedCompressedTexture.etc1 && !supportedCompressedTexture.pvrtc) || supportedCompressedTexture.pvrtc ||
                //     (supportedCompressedTexture.etc1 && !supportedCompressedTexture.pvrtc && this._alphaTexture != null));
            },
            enumerable: true,
            configurable: true
        });
        /** @internal */ MergedBmp.prototype.init = function (url, type, priority, frameRate) {
            this._url = url;
            this._type = type;
            this._frameRate = frameRate ? frameRate : 12;
            this._scale = this._url && this._url.indexOf("assets/anim/") > -1 ? game.TextureScale : 1;
        };
        /** @internal */ MergedBmp.prototype.cfgLoaded = function (data, url) {
            if (url != this._url + this._type) {
                return;
            }
            if (data instanceof ByteArray) {
                this.setBytes(data);
            }
            else if (Array.isArray(data)) {
                this._frames = data;
            }
            else {
                this.setJson(data);
            }
            this.checkComp();
        };
        /** @internal */ MergedBmp.prototype.imgLoaded = function (texture, url) {
            var self = this;
            self._texture = texture;
            self._bitmapX = texture.$bitmapX - texture.$offsetX;
            self._bitmapY = texture.$bitmapY - texture.$offsetY;
            if (self._alphaTexture && self._texture.$bitmapData && self._alphaTexture.$bitmapData) {
                self._texture.$bitmapData.etcAlphaMask = self._alphaTexture.$bitmapData;
            }
            self.checkComp();
        };
        /** @internal */ MergedBmp.prototype.imgAlphaLoaded = function (texture, url) {
            var self = this;
            self._alphaTexture = texture;
            if (self._alphaTexture.$bitmapData == null) {
                console.warn("_alphaTexture没有Date" + url);
            }
            if (self._texture && self._texture.$bitmapData && self._alphaTexture.$bitmapData) {
                self._texture.$bitmapData.etcAlphaMask = self._alphaTexture.$bitmapData;
            }
            self.checkComp();
        };
        /** @internal */ MergedBmp.prototype.setBytes = function (bytes, pos) {
            if (pos === void 0) { pos = 0; }
            var s = MergedBmp;
            bytes.position = pos;
            var n = bytes.readShort();
            var frames = this._frames = [];
            frames.length = n;
            var len = s.Pos.length;
            for (var i = 0; i < n; i++) {
                frames[i] = [];
                frames[i].length = len;
                for (var j = 0; j < len; j++) {
                    bytes.position = pos + s.HeadSize + (s.Pos.length * i + j) * s.Size;
                    frames[i][j] = bytes.readShort();
                }
            }
        };
        /** @internal */ MergedBmp.prototype.setJson = function (json) {
            this._json = json;
            this._jsonKeys = Object.keys(json.frames);
        };
        /** @internal */ MergedBmp.prototype.checkComp = function () {
            var self = this;
            if (self.isLoaded) {
                game.LoadMgr.ins.onMergedLoaded(this);
            }
        };
        MergedBmp.prototype.getTexture = function (frame) {
            var self = this;
            if (!self._texture) {
                return null;
            }
            var texture = self._subMap[frame];
            if (!texture) {
                var source = self._texture;
                var x = self.getVal(frame, "x") / self._scale + self._bitmapX;
                var y = self.getVal(frame, "y") / self._scale + self._bitmapY;
                var w = self.getVal(frame, "w") / self._scale;
                var h = self.getVal(frame, "h") / self._scale;
                var offX = self.getVal(frame, "offX") / self._scale;
                var offY = self.getVal(frame, "offY") / self._scale;
                var sourceW = self.getVal(frame, "sourceW") / self._scale;
                var sourceH = self.getVal(frame, "sourceH") / self._scale;
                texture = Pool.alloc(Texture);
                texture.disposeBitmapData = false;
                texture.$bitmapData = source.$bitmapData;
                texture.$initData(x, y, w, h, offX, offY, sourceW, sourceH, source.$sourceWidth, source.$sourceHeight);
                if (!texture.$bitmapX && !texture.$bitmapY && !texture.$bitmapWidth && !texture.$bitmapHeight) {
                    //console.error(this._url+" 缺少帧"+ frame + " 数据");
                    return null;
                }
                self._subMap[frame] = texture;
            }
            return texture;
        };
        MergedBmp.prototype.drawTo = function (bmp, frame, scaleX) {
            if (scaleX === void 0) { scaleX = 1; }
            var self = this;
            var sw = self.getVal(frame, "sourceW");
            var sh = self.getVal(frame, "sourceH");
            bmp.x = -bmp.scaleX * sw / 2;
            bmp.y = bmp.scaleY * -sh / 2;
            bmp.texture = self.getTexture(frame);
        };
        MergedBmp.prototype.getVal = function (frame, key) {
            var self = this;
            if (self._frames) {
                var f = typeof frame === "string" ? parseInt(frame) : frame;
                return self.getValFromBin(f, key);
            }
            if (self._json) {
                if (key === "dur") {
                    return 1000 / self._frameRate;
                }
                var frameObj = self._json.frames[frame];
                if (typeof frame === "string") {
                    if (frameObj) {
                        return frameObj[key];
                    }
                    return 0;
                }
                if (frameObj) {
                    return frameObj[key];
                }
                if (frame < self._jsonKeys.length) {
                    frame = self._jsonKeys[frame];
                    return self._json.frames[frame][key];
                }
                return 0;
            }
            return 0;
        };
        /** @internal */ MergedBmp.prototype.getValFromBin = function (frame, key) {
            var self = this;
            var s = MergedBmp;
            var idx = s.Pos.indexOf(key);
            if (idx < 0) {
                return 0;
            }
            if (self._frames[frame]) {
                return self._frames[frame][idx];
            }
            //默认返还0帧
            return 0;
        };
        /** @internal */ MergedBmp.prototype.clear = function () {
            var self = this;
            self._url = null;
            self._type = null;
            self._frameRate = 0;
            self._frames = null;
            self._json = null;
            self._jsonKeys = null;
            // if (self._alphaTexture && self._alphaTexture.ktxData) self._alphaTexture.ktxData = null;
            Pool.release(self._alphaTexture);
            self._alphaTexture = null;
            // if (self._texture && self._texture.ktxData) self._texture.ktxData = null;
            Pool.release(self._texture);
            self._texture = null;
            for (var k in self._subMap) {
                var t = self._subMap[k];
                Pool.release(t);
                self._subMap[k] = null;
                delete self._subMap[k];
            }
        };
        MergedBmp.prototype.dispose = function () {
            this.onRelease();
        };
        MergedBmp.prototype.onAlloc = function () {
        };
        MergedBmp.prototype.onRelease = function () {
            this.clear();
        };
        /** @internal */ MergedBmp.HeadSize = 2;
        /** @internal */ MergedBmp.Size = 2;
        /** @internal */ MergedBmp.Pos = ["x", "y", "w", "h", "offX", "offY", "sourceW", "sourceH", "dur"];
        return MergedBmp;
    }());
    game.MergedBmp = MergedBmp;
    __reflect(MergedBmp.prototype, "game.MergedBmp", ["base.PoolObject", "base.DisposeObject"]);
})(game || (game = {}));
/** @internal */
var game;
(function (game) {
    var Event = egret.Event;
    var IOErrorEvent = egret.IOErrorEvent;
    var ResLdr = /** @class */ (function () {
        function ResLdr() {
        }
        ResLdr.prototype.load = function (url, type) {
            var self = this;
            var ext = game.getUrlExt(url);
            if (type === game.ResType.JSON) {
                var obj = ResLdr.getJson(url);
                if (obj) {
                    game.LoadMgr.ins.onSucc(url, obj);
                    return;
                }
                if (gso.zipCfg) {
                    type = game.ResType.ZIP;
                }
            }
            self._type = type;
            self._url = url;
            var fn = game.getTypeLdr(url, type);
            self._rUrl = game.LoadMgr.ins.getRealUrl(url, ext);
            var isFun = typeof fn === "function";
            if (isFun && self._rUrl) {
                var loadUrl = self._rUrl.indexOf("://") > -1 ? self._rUrl : gso.cdn_url + self._rUrl;
                if (type === game.ResType.ZIP) {
                    loadUrl = loadUrl.replace(".json", ".zip");
                }
                self._loader = fn(loadUrl, url);
                if (url.indexOf("data.txt") > -1) {
                    console.info("data.txt " + url);
                    console.info("data.txt " + self._rUrl);
                }
                self._loader.addEventListener(Event.COMPLETE, self.onSucc, self);
                self._loader.addEventListener(IOErrorEvent.IO_ERROR, self.onFail, self);
            }
            else {
                // if(!self._rUrl || self._rUrl == ""){
                //     gAlert("加载的链接地址为"+self._rUrl);
                // }
                // if(self._rUrl && self._rUrl.indexOf("data.txt") >= 0){
                //     gAlert("加载data.txt失败，"+ isFun +" ... " +self._rUrl);
                // }
                self.onFail();
            }
        };
        ResLdr.prototype.onSucc = function () {
            var self = this;
            var fn = game.getTypeDcd(self._url, self._type);
            if (self._url.indexOf("data.txt") > -1) {
                console.info("data.txt onSucc");
            }
            var data;
            if (typeof fn === "function") {
                data = fn(self._loader, self._url);
            }
            if (data instanceof Error) {
                console.error(self._url, data);
                if (self._url.indexOf("data.txt") > -1) {
                    console.info("data.txt fail");
                }
                game.LoadMgr.ins.onFail(self._url, self._rUrl, null, null);
            }
            else {
                if (self._url.indexOf("data.txt") > -1) {
                    console.info("data.txt onSucc");
                }
                game.LoadMgr.ins.onSucc(self._url, data);
            }
        };
        ResLdr.prototype.onFail = function (e) {
            if (this._url.indexOf("data.txt") > -1) {
                console.info("data.txt onFail");
            }
            var errMsg, errCode;
            if (e && e.data) {
                var data = e.data;
                errMsg = data.errMsg;
                errCode = data.code;
            }
            game.LoadMgr.ins.onFail(this._url, this._rUrl, errMsg, errCode);
        };
        ResLdr.prototype.dispose = function () {
            this.onRelease();
        };
        ResLdr.prototype.onAlloc = function () {
        };
        ResLdr.prototype.onRelease = function () {
            var self = this;
            if (self._loader) {
                self._loader.removeEventListener(Event.COMPLETE, self.onSucc, self);
                self._loader.removeEventListener(IOErrorEvent.IO_ERROR, self.onFail, self);
            }
            self._loader = undefined;
            self._url = undefined;
            self._rUrl = undefined;
            self._type = undefined;
        };
        /** @internal */ ResLdr.getJson = function (url) {
            return this.JsonObj[url] = game.parseObj(this.JsonObj[url]);
        };
        ResLdr.JsonObj = Object.create(null);
        return ResLdr;
    }());
    game.ResLdr = ResLdr;
    __reflect(ResLdr.prototype, "game.ResLdr", ["base.PoolObject", "base.DisposeObject"]);
})(game || (game = {}));
var game;
(function (game) {
    var Event = egret.Event;
    var Handler = base.Handler;
    var Pool = base.Pool;
    var TimeMgr = base.TimeMgr;
    var SoundMgr = /** @class */ (function () {
        function SoundMgr() {
            /** @internal */ this._entryMap = Object.create(null);
            /** @internal */ this._init = false;
            /** @internal */ this._soundEnabled = true; //���ڱ������ֿ��ư�
            /** @internal */ this._ext = ".mp3";
            /** @internal */ this._bgStop = false;
            /** @internal */ this.fadedTotalTime = 1500;
            /** @internal */ this._startFadedTime = 0;
            /** @internal */ this._fadedType = 0;
            /** @internal */ this._isActive = true;
            /** @internal */ this._isMute = false;
            this.soundEftEnabled = true; //������Ϸ��Ч����
        }
        Object.defineProperty(SoundMgr, "ins", {
            get: function () {
                var ins = this._ins;
                if (!ins) {
                    ins = this._ins = new SoundMgr();
                }
                return ins;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundMgr.prototype, "isMute", {
            get: function () {
                return this._isMute;
            },
            set: function (value) {
                var self = this;
                if (self._isMute === value) {
                    return;
                }
                self._isMute = value;
                if (!value) {
                    if (!self._bgStop) {
                        self.playBg();
                    }
                    return;
                }
                var entry;
                for (var url in self._entryMap) {
                    entry = self._entryMap[url];
                    if (entry) {
                        entry.stop();
                    }
                }
                if (self._bgEntry) {
                    self._bgEntry.stop();
                }
            },
            enumerable: true,
            configurable: true
        });
        /** @internal */ SoundMgr.prototype.init = function () {
            var self = this;
            if (typeof webAudio !== "undefined") {
                webAudio.initAudio(Handler.alloc(self, self.onInit, null, true));
            }
            else {
                this.onInit(".mp3");
            }
        };
        /** @internal */ SoundMgr.prototype.onInit = function (type) {
            if (type) {
                this._ext = type;
            }
            this._init = true;
            if (!this._bgStop) {
                this.playBg();
            }
        };
        SoundMgr.prototype.enableSound = function (value) {
            this._soundEnabled = value;
        };
        /** @internal */ SoundMgr.prototype.recoverWebAudio = function (cb) {
            if (typeof webAudio !== "undefined") {
                webAudio.resumeAudio(cb);
            }
            else {
                cb.exec();
            }
        };
        /** @internal */ SoundMgr.prototype.onActivate = function () {
            this._isActive = true;
            this.recoverWebAudio(Handler.alloc(this, this.playBg, null, true));
        };
        /** @internal */ SoundMgr.prototype.onDeActivate = function () {
            this._isActive = false;
            this.stopBg();
        };
        SoundMgr.prototype.setBg = function (url) {
            var self = this;
            var entry = self._bgEntry;
            if (!url) {
                if (entry) {
                    self.faded(2 /* Out */);
                }
                return;
            }
            this._curUrl = url;
            if (!self._isActive || !self._soundEnabled) {
                return;
            }
            if (!entry) {
                self._bgEntry = entry = new SoundEntry();
            }
            if (entry.url === url) {
                if (!self._bgStop && entry.loaded) {
                    this.faded(1 /* In */);
                }
                return;
            }
            entry.clear();
            entry.url = url;
            entry.isStop = self._bgStop;
            game.LoadMgr.ins.load(url + self._ext, Handler.alloc(self, self.onLoaded, [entry]), game.LoadPri.Scene, Handler.alloc(self, self.onLoadFail, [entry]));
        };
        /** @internal */ SoundMgr.prototype.faded = function (type) {
            var self = this;
            self._startFadedTime = TimeMgr.time.time;
            self._fadedType = type;
            if (type === 1 /* In */) {
                self._bgEntry.volume = 0;
                //self._curUrl = null;
                self.playBg();
            }
            TimeMgr.addUpdateItem(this);
        };
        SoundMgr.prototype.update = function (time) {
            var self = this;
            if (!self._fadedType) {
                return;
            }
            var curTime = time.time - self._startFadedTime;
            var p = Math.floor(10 * curTime / self.fadedTotalTime) / 10;
            if (p >= 1) {
                p = 1;
            }
            self._bgEntry.volume = self._fadedType == 2 /* Out */ ? 1 - p : p;
            if (1 == p) {
                if (self._fadedType == 2 /* Out */) {
                    self._bgEntry.clear();
                }
                TimeMgr.removeUpdateItem(this);
                self._fadedType = undefined;
            }
        };
        SoundMgr.prototype.playBg = function () {
            var self = this;
            self._bgStop = false;
            var entry = self._bgEntry;
            if (!self._init || !entry || !entry.loaded || !self._soundEnabled) {
                if (self._curUrl) {
                    self.setBg(self._curUrl);
                }
                return;
            }
            entry.isStop = false;
            entry.play(true);
        };
        SoundMgr.prototype.stopBg = function () {
            this._bgStop = true;
            var entry = this._bgEntry;
            if (!entry) {
                return;
            }
            entry.stop();
        };
        SoundMgr.prototype.playEffect = function (url, onComplete, isUI) {
            var self = this;
            if (gso.isGameMusic) {
                return;
            }
            if (!self._isActive || !self.soundEftEnabled || self._isMute) { //!self._soundEnabled ֻ�Ա�����Ч����
                if (onComplete) {
                    onComplete.exec();
                    Pool.release(onComplete);
                }
                return;
            }
            var entry = self._entryMap[url];
            if (!entry) {
                self._entryMap[url] = entry = new SoundEntry();
                entry.url = url;
            }
            Pool.release(entry.onComplete);
            entry.onComplete = onComplete;
            entry.isStop = false;
            if (entry.loaded) {
                entry.play(false);
            }
            else {
                game.LoadMgr.ins.load(url + self._ext, Handler.alloc(self, self.onLoaded, [entry]), isUI ? game.LoadPri.UI : game.LoadPri.Scene, Handler.alloc(self, self.onLoadFail, [entry]));
            }
        };
        SoundMgr.prototype.stopEffect = function (url) {
            var entry = this._entryMap[url];
            if (entry) {
                entry.stop();
            }
        };
        /** @internal */ SoundMgr.prototype.onLoaded = function (entry, sound, url) {
            entry.sound = sound;
            entry.loaded = true;
            if (!this._isActive) {
                return;
            }
            if (this._isMute) {
                entry.isStop = true;
                return;
            }
            if (entry === this._bgEntry) {
                this.faded(1 /* In */);
            }
            else {
                entry.play(false);
            }
        };
        /** @internal */ SoundMgr.prototype.onLoadFail = function (entry, url) {
            var h = entry.onComplete;
            entry.onComplete = null;
            if (h) {
                h.exec();
                Pool.release(h);
            }
        };
        return SoundMgr;
    }());
    game.SoundMgr = SoundMgr;
    __reflect(SoundMgr.prototype, "game.SoundMgr", ["base.UpdateItem"]);
    var SoundEntry = /** @class */ (function () {
        function SoundEntry() {
            this.isStop = true;
            this._volume = 1;
        }
        Object.defineProperty(SoundEntry.prototype, "volume", {
            get: function () {
                return this._volume;
            },
            set: function (value) {
                var self = this;
                if (self.isStop) {
                    return;
                }
                self._volume = value;
                if (self.channel) {
                    self.channel.volume = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        SoundEntry.prototype.play = function (loop) {
            var mgr = SoundMgr.ins;
            if (mgr.isMute) {
                return;
            }
            var self = this;
            if (!self.sound) {
                return;
            }
            self._loop = loop;
            mgr.recoverWebAudio(Handler.alloc(self, self.startPlay, null, true));
        };
        SoundEntry.prototype.stop = function () {
            var self = this;
            if (self.channel) {
                self.channel.stop();
                self.channel.removeEventListener(Event.SOUND_COMPLETE, self.onPlayComplete, self);
                self.channel = null;
            }
            Pool.release(self.onComplete);
            self.onComplete = null;
            self.isStop = true;
        };
        SoundEntry.prototype.startPlay = function () {
            var self = this;
            if (self.isStop || self.channel) {
                return;
            }
            self.channel = self.sound.play(0, 1);
            self.channel.addEventListener(Event.SOUND_COMPLETE, self.onPlayComplete, self);
            self.channel.volume = self._volume;
        };
        SoundEntry.prototype.onPlayComplete = function (e) {
            var self = this;
            self.isStop = !self._loop;
            self.channel.removeEventListener(Event.SOUND_COMPLETE, self.onPlayComplete, self);
            self.channel = null;
            var h = self.onComplete;
            self.onComplete = null;
            if (h) {
                h.exec();
                Pool.release(h);
            }
            if (self._loop) {
                this.startPlay();
            }
        };
        SoundEntry.prototype.clear = function () {
            var self = this;
            self.stop();
            self.url = null;
            self.loaded = false;
            self.sound = null;
            self._volume = 1;
        };
        return SoundEntry;
    }());
    __reflect(SoundEntry.prototype, "SoundEntry");
})(game || (game = {}));
var game;
(function (game) {
    var ArrayUtil = /** @class */ (function () {
        function ArrayUtil() {
        }
        ArrayUtil.insertAt = function (array, index, object) {
            var i;
            var length = array.length;
            if (index < 0) {
                index += length + 1;
            }
            if (index < 0) {
                index = 0;
            }
            for (i = index - 1; i >= length; --i) {
                array[i] = null;
            }
            for (i = length; i > index; --i) {
                array[i] = array[Math.floor(i - 1)];
            }
            array[index] = object;
        };
        ArrayUtil.removeAt = function (array, index) {
            var i;
            var length = array.length;
            if (index < 0) {
                index += length;
            }
            if (index < 0) {
                index = 0;
            }
            else if (index >= length) {
                index = length - 1;
            }
            var object = array[index];
            for (i = index + 1; i < length; ++i) {
                array[Math.floor(i - 1)] = array[i];
            }
            array.length = length - 1;
            return object;
        };
        return ArrayUtil;
    }());
    game.ArrayUtil = ArrayUtil;
    __reflect(ArrayUtil.prototype, "game.ArrayUtil");
})(game || (game = {}));
var game;
(function (game) {
    var log = egret.log;
    var Point = egret.Point;
    var BezierUtil = /** @class */ (function () {
        function BezierUtil() {
        }
        /**
         *
         * @param ctrlPosArr 贝塞尔曲线控制点坐标
         * @param precison 精度，需要计算的该条贝塞尔曲线上的点的数目
         * @param resArr 该条贝塞尔曲线上的点（二维坐标）
         */
        BezierUtil.getBezierPos = function (ctrlPosArr, precison) {
            log(ctrlPosArr);
            var resArr = new Array();
            /**贝塞尔曲线控制点数目（阶数）*/
            var cnt = ctrlPosArr.length;
            if (cnt < 2) {
                log("控制点数不能小于 2");
                return resArr;
            }
            /**杨辉三角数据 */
            var yangHuiArr = this.getYangHuiTriangle(cnt);
            //计算坐标
            for (var i = 0; i < precison; i++) {
                var t = i / precison;
                var tmpX = 0;
                var tmpY = 0;
                for (var j = 0; j < cnt; j++) {
                    tmpX += Math.pow(1 - t, cnt - j - 1) * ctrlPosArr[j].x * Math.pow(t, j) * yangHuiArr[j];
                    tmpY += Math.pow(1 - t, cnt - j - 1) * ctrlPosArr[j].y * Math.pow(t, j) * yangHuiArr[j];
                }
                // resArr[i].x = tmpX;
                // resArr[i].y = tmpY;
                resArr[i] = new Point(tmpX, tmpY);
            }
            return resArr;
        };
        /**
         * 获取杨辉三角对应阶数的值
         * @param num 杨辉三角阶数
         */
        BezierUtil.getYangHuiTriangle = function (num) {
            //计算杨辉三角
            var yangHuiArr = new Array();
            if (num === 1) {
                yangHuiArr[0] = 1;
            }
            else {
                yangHuiArr[0] = yangHuiArr[1] = 1;
                for (var i = 3; i <= num; i++) {
                    var t = new Array();
                    for (var j = 0; j < i - 1; j++) {
                        t[j] = yangHuiArr[j];
                    }
                    yangHuiArr[0] = yangHuiArr[i - 1] = 1;
                    for (var j = 0; j < i - 2; j++) {
                        yangHuiArr[j + 1] = t[j] + t[j + 1];
                    }
                }
            }
            log(yangHuiArr);
            return yangHuiArr;
        };
        return BezierUtil;
    }());
    game.BezierUtil = BezierUtil;
    __reflect(BezierUtil.prototype, "game.BezierUtil");
})(game || (game = {}));
var game;
(function (game) {
    //黑底颜色
    game.UIColorStr = {
        GRAY: "#a8b6ba",
        YELLOW: "#ffff00",
        WHITE: "#ffffff",
        GREEN: "#00ff00",
        BLUE: "#00d4ff",
        PURPLE: "#f02bff",
        ORANGE: "#ff7800",
        RED: "#ff0000",
        PINK: "#ff4192",
        DARK_YELLOW: "#EBD196",
    };
    //白底颜色
    game.UIColor2Str = {
        GRAY: "#a8b6ba",
        YELLOW: "#edb214",
        WHITE: "#426e7b",
        GREEN: "#0f9b2c",
        BLUE: "#007ac7",
        PURPLE: "#a200ff",
        ORANGE: "#b96800",
        RED: "#d40808",
        PINK: "#ff4192",
        DARK_YELLOW: "#EBD196",
    };
})(game || (game = {}));
var game;
(function (game) {
    var DisplayUtils = /** @class */ (function () {
        function DisplayUtils() {
        }
        //把节点从父类中移除
        DisplayUtils.UnParent = function (node) {
            if (node && node.parent) {
                node.parent.removeChild(node);
            }
        };
        return DisplayUtils;
    }());
    game.DisplayUtils = DisplayUtils;
    __reflect(DisplayUtils.prototype, "game.DisplayUtils");
})(game || (game = {}));
var game;
(function (game) {
    var StringUtil = /** @class */ (function () {
        function StringUtil() {
        }
        /**
         * 拼接字符串，比如将 "1" 拼成 "0001"
         * @param {string} str
         * @param {number} totalLen
         * @param {string} paddingChar
         * @returns {string}
         */
        StringUtil.padString = function (str, totalLen, paddingChar) {
            if (paddingChar === void 0) { paddingChar = "0"; }
            var n = +totalLen | 0;
            if (paddingChar == null || n == 0) {
                return str;
            }
            var i;
            var buf = [];
            for (i = 0, n = Math.abs(n) - str.length; i < n; i++) {
                buf.push(paddingChar);
            }
            if (totalLen < 0) {
                buf.unshift(str);
            }
            else {
                buf.push(str);
            }
            return buf.join("");
        };
        /**
         * 替代字符串
         * @param str
         * @param params
         */
        StringUtil.substitute = function (str, params) {
            if (str == null || params == null || params.length == 0) {
                return str;
            }
            for (var i = 0, len = params.length; i < len; i++) {
                str = str.replace("%s", params[i] && params[i].toString());
            }
            return str;
        };
        /** @internal */
        StringUtil.setColorStr = function (data) {
            var keyList = Object.keys(this._colorData);
            for (var i = 0, len = keyList.length; i < len; i++) {
                this._colorData[keyList[i]] = "<font color='" + data[keyList[i]] + "'>";
            }
            // this._colorData.WHITE = "<font color='" + data.WHITE + "'>";
            // this._colorData.GREEN = "<font color='" + data.GREEN + "'>";
            // this._colorData.BLUE = "<font color='" + data.BLUE + "'>";
            // this._colorData.PURPLE = "<font color='" + data.PURPLE + "'>";
            // this._colorData.ORANGE = "<font color='" + data.ORANGE + "'>";
            // this._colorData.RED = "<font color='" + data.RED + "'>";
            // this._colorData.GRAY = "<font color='" + data.GRAY + "'>";
            // this._colorData.YELLOW = "<font color='" + data.YELLOW + "'>";
            // this._colorData.PINK = "<font color='" + data.PINK + "'>";
        };
        /** @internal */
        StringUtil.setColorStr2 = function (data) {
            var keyList = Object.keys(this._colorData2);
            for (var i = 0, len = keyList.length; i < len; i++) {
                this._colorData2[keyList[i]] = "<font color='" + data[keyList[i]] + "'>";
            }
        };
        /**
         * 颜色符号替换颜色
         * @param str
         * @param isWhite
         */
        StringUtil.replaceColorCode = function (str, isWhite) {
            if (isWhite === void 0) { isWhite = false; }
            if (typeof str !== "string") {
                return str;
            }
            str = str.replace(this.RegN, "\n")
                .replace(this.RegSp, " ")
                .replace(this.RegEnd, "</font>")
                .replace(this.RegW, isWhite ? this._colorData2.WHITE : this._colorData.WHITE)
                .replace(this.RegY, isWhite ? this._colorData2.YELLOW : this._colorData.YELLOW)
                .replace(this.RegG, isWhite ? this._colorData2.GREEN : this._colorData.GREEN)
                .replace(this.RegB, isWhite ? this._colorData2.BLUE : this._colorData.BLUE)
                .replace(this.RegP, isWhite ? this._colorData2.PURPLE : this._colorData.PURPLE)
                .replace(this.RegO, isWhite ? this._colorData2.ORANGE : this._colorData.ORANGE)
                .replace(this.RegR, isWhite ? this._colorData2.RED : this._colorData.RED)
                .replace(this.RegI, isWhite ? this._colorData2.PINK : this._colorData.PINK)
                .replace(this.RegH, isWhite ? this._colorData2.GRAY : this._colorData.GRAY)
                .replace(this.RegDefined, "<font color='$1'>");
            return str;
        };
        StringUtil.getNumByString = function (str) {
            var numArr = str.match(/\d+/g);
            return numArr.map(Number);
        };
        /**
         * 伤害数值   转成带单位
         * @param hurt
         */
        StringUtil.getHurtNumStr = function (hurt) {
            var resStr = "";
            // 6 10  14  18  22
            // let arr:string[] = ["万","亿","万亿","兆","万兆"];
            var len = hurt.toString().length;
            if (len < 6) {
                resStr = hurt.toString();
            }
            else if (len < 9) {
                resStr = Math.floor(hurt / 10000).toString() + "万";
            }
            else if (len < 13) {
                //resStr = Math.floor(hurt / 100000000).toString() + "亿";
                resStr = (Math.floor(hurt / 10000000) / 10).toString() + "亿";
            }
            else if (len < 17) {
                resStr = Math.floor(hurt / 1000000000000).toString() + "万亿";
            }
            else if (len < 21) {
                resStr = Math.floor(hurt / 10000000000000000).toString() + "兆";
            }
            else {
                resStr = Math.floor(hurt / 100000000000000000000).toString() + "万兆";
            }
            return resStr;
        };
        /**
         * 战力数值转换，带有单位
         * 超过百万显示“万”，超过亿显示“亿”
         * @param power 战力值
         * @param fractionDigits 保留小数点后几位，默认不保留
         * @param preStr 战力值前文本，默认空
         * @param minionNum 默认百万才显示万，7
         */
        StringUtil.getPowerNumStr = function (power, fractionDigits, preStr, minionNum) {
            if (minionNum === void 0) { minionNum = 7; }
            var res = 0;
            var resStr = "";
            var unit = ""; //单位
            var len = power.toString().length;
            if (len < minionNum) {
                res = power;
            }
            else if (len < 9) {
                unit = "万";
                res = power / 10000;
            }
            else {
                unit = "亿";
                res = power / 100000000;
            }
            //保留小数点后几位
            if (fractionDigits) {
                resStr = res.toFixed(fractionDigits);
                var dotIndex = resStr.indexOf('.');
                var digitsStr = resStr.slice(dotIndex + 1); //截取小数点后面几位
                //若小数部分是0，则过滤
                if (+digitsStr == 0) {
                    resStr = resStr.slice(0, dotIndex);
                }
            }
            else {
                resStr = Math.floor(res).toString();
            }
            return (preStr ? preStr : '') + resStr + unit;
        };
        /**阿拉伯转中文 */
        StringUtil.getCNBynumber = function (number) {
            var a = (number + '').split(''), s = [], t = this;
            if (a.length > 12) {
                throw new Error('too big');
            }
            else {
                for (var i = 0, j = a.length - 1; i <= j; i++) {
                    if (j == 1 || j == 5 || j == 9) { //两位数 处理特殊的 1*
                        if (i == 0) {
                            if (a[i] != '1')
                                s.push(t.chars.charAt(+a[i]));
                        }
                        else {
                            s.push(t.chars.charAt(+a[i]));
                        }
                    }
                    else {
                        s.push(t.chars.charAt(+a[i]));
                    }
                    if (i != j) {
                        s.push(t.units.charAt(j - i));
                    }
                }
            }
            //return s;
            return s.join('').replace(/零([十百千万亿@#%^&~])/g, function (m, d, b) {
                b = t.units.indexOf(d);
                if (b != -1) {
                    if (d == '亿')
                        return d;
                    if (d == '万')
                        return d;
                    if (a[j - b] == '0')
                        return '零';
                }
                return '';
            }).replace(/零+/g, '零').replace(/零([万亿])/g, function (m, b) {
                return b;
            }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function (m) {
                return { '@': '十', '#': '百', '%': '千', '^': '十', '&': '百', '~': '千' }[m];
            }).replace(/([亿万])([一-九])/g, function (m, d, b, c) {
                c = t.units.indexOf(d);
                if (c != -1) {
                    if (a[j - c] == '0')
                        return d + '零' + b;
                }
                return m;
            });
        };
        StringUtil.ChineseNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        StringUtil.ChineseWeekNum = ["日", "一", "二", "三", "四", "五", "六", "日"];
        StringUtil.ChineseWeekNum2 = ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"];
        /** @internal */
        StringUtil._colorData = {
            GRAY: "",
            YELLOW: "",
            WHITE: "",
            GREEN: "",
            BLUE: "",
            PURPLE: "",
            ORANGE: "",
            RED: "",
            PINK: ""
        };
        /** @internal */
        StringUtil._colorData2 = {
            GRAY: "",
            YELLOW: "",
            WHITE: "",
            GREEN: "",
            BLUE: "",
            PURPLE: "",
            ORANGE: "",
            RED: "",
            PINK: ""
        };
        /** @internal */ StringUtil.RegN = /#N/g;
        /** @internal */ StringUtil.RegEnd = /#end/g;
        /** @internal */ StringUtil.RegG = /#G/g;
        /** @internal */ StringUtil.RegY = /#Y/g;
        /** @internal */ StringUtil.RegW = /#W/g;
        /** @internal */ StringUtil.RegB = /#B/g;
        /** @internal */ StringUtil.RegP = /#P/g;
        /** @internal */ StringUtil.RegO = /#O/g;
        /** @internal */ StringUtil.RegR = /#R/g;
        /** @internal */ StringUtil.RegI = /#I/g;
        /** @internal */ StringUtil.RegH = /#H/g;
        /** @internal */ StringUtil.RegSp = /#SP/g; //空格
        /** @internal */ StringUtil.RegDefined = /#(0x[a-fA-F0-9]{6})/gi;
        StringUtil.units = '个十百千万@#%亿^&~';
        StringUtil.chars = '零一二三四五六七八九';
        return StringUtil;
    }());
    game.StringUtil = StringUtil;
    __reflect(StringUtil.prototype, "game.StringUtil");
})(game || (game = {}));
var game;
(function (game) {
    var getTimer = egret.getTimer;
    var TimeMgr = base.TimeMgr;
    game.Second = {
        Day: 86400,
        Hour: 3600,
        Minute: 60,
    };
    var WeekChinese = ["日", "一", "二", "三", "四", "五", "六", "日"];
    var WeekName = [
        "\u661F\u671F\u65E5" /* Week_0 */,
        "\u661F\u671F\u4E00" /* Week_1 */,
        "\u661F\u671F\u4E8C" /* Week_2 */,
        "\u661F\u671F\u4E09" /* Week_3 */,
        "\u661F\u671F\u56DB" /* Week_4 */,
        "\u661F\u671F\u4E94" /* Week_5 */,
        "\u661F\u671F\u516D" /* Week_6 */,
        "\u661F\u671F\u65E5" /* Week_0 */,
    ];
    var ZhouName = [
        "\u5468\u65E5" /* Zhou_0 */,
        "\u5468\u4E00" /* Zhou_1 */,
        "\u5468\u4E8C" /* Zhou_2 */,
        "\u5468\u4E09" /* Zhou_3 */,
        "\u5468\u56DB" /* Zhou_4 */,
        "\u5468\u4E94" /* Zhou_5 */,
        "\u5468\u516D" /* Zhou_6 */,
        "\u5468\u65E5" /* Zhou_0 */,
    ];
    var TimeUtil = /** @class */ (function () {
        function TimeUtil() {
        }
        TimeUtil.getSyncTimer = function () {
            var self = this;
            var timer = getTimer();
            if (self.frameInc == self.SHIFT) {
                self.frameInc = 0;
            }
            if (timer != self.lastTimer) {
                self.frameInc = 0;
                self.lastTimer = timer;
            }
            return timer * self.SHIFT + self.frameInc++;
        };
        /** @internal */ TimeUtil._tmpReplacer = function (k) {
            var obj = TimeUtil._tmpObj;
            var type = k.charAt(0);
            var v = obj[type];
            if (type === "E") {
                var day = WeekChinese.indexOf(v);
                return k.length <= 2 ? ZhouName[day] : WeekName[day];
            }
            if (v.length < k.length) {
                return game.StringUtil.padString(v, k.length);
            }
            return v;
        };
        /**
         * 格式化时间戳，毫秒
         * @param {number} time 时间戳，毫秒
         * @param {string} [format=yyyy-MM-dd HH:mm:ss.SSS] y年，q季，M月，E星期，d日，h时（12小时），H时，m分，s秒，S毫秒
         * @returns {string}
         */
        TimeUtil.formatTime = function (time, format) {
            if (format === void 0) { format = "yyyy-MM-dd HH:mm:ss.SSS"; }
            var date = this._tmpDate;
            date.setTime(time);
            var obj = this._tmpObj;
            obj["y"] = "" + date.getFullYear();
            obj["q"] = "" + Math.floor((date.getMonth() + 3) / 3);
            obj["M"] = "" + (date.getMonth() + 1);
            obj["E"] = WeekChinese[date.getDay()];
            obj["d"] = "" + date.getDate();
            obj["h"] = "" + (date.getHours() % 12 === 0 ? 12 : date.getHours() % 12);
            obj["H"] = "" + date.getHours();
            obj["m"] = "" + date.getMinutes();
            obj["s"] = "" + date.getSeconds();
            obj["S"] = "" + date.getMilliseconds();
            return format.replace(/y+|q+|M+|E+|d+|h+|H+|m+|s+|S+/g, this._tmpReplacer);
        };
        /**
         * 格式化时间戳，秒
         * @param {number} second 时间戳，秒
         * @param {string} [format=yyyy-MM-dd HH:mm:ss] y年，q季，M月，E星期，d日，h时（12小时），H时，m分，s秒，S毫秒
         * @returns {string}
         */
        TimeUtil.formatTimeSecond = function (second, format) {
            if (format === void 0) { format = "yyyy-MM-dd HH:mm:ss"; }
            return this.formatTime(second * 1000, format);
        };
        /**
         * 格式化剩余时间，秒
         * @param {number} second 时间，秒
         * @param {string} [format=dd:HH:mm:ss] d日，H时，m分，s秒
         * @param {boolean} adaption 是否自适应，比如显示d日，H时的，小于一小时时显示成m分，s秒
         * @returns {string}
         */
        TimeUtil.formatSecond = function (second, format, adaption) {
            if (format === void 0) { format = "dd:HH:mm:ss"; }
            if (adaption === void 0) { adaption = false; }
            var obj = this._tmpObj;
            var remain = second;
            if (adaption) {
                if (remain < game.Second.Hour) {
                    format = "m分s秒"; //转换显示文本
                }
                else if (remain < game.Second.Day) {
                    format = "H时m分"; //转换显示文本
                }
            }
            obj["y"] = "";
            obj["q"] = "";
            obj["M"] = "";
            obj["E"] = "";
            if (format.indexOf("d") > -1) {
                obj["d"] = "" + Math.floor(remain / game.Second.Day);
                remain = remain % game.Second.Day;
            }
            else {
                obj["d"] = "";
            }
            obj["h"] = "";
            if (format.indexOf("H") > -1) {
                obj["H"] = "" + Math.floor(remain / game.Second.Hour);
                remain = remain % game.Second.Hour;
            }
            else {
                obj["H"] = "";
            }
            if (format.indexOf("m") > -1) {
                obj["m"] = "" + Math.floor(remain / game.Second.Minute);
                remain = remain % game.Second.Minute;
            }
            else {
                obj["m"] = "";
            }
            if (format.indexOf("s") > -1) {
                obj["s"] = "" + Math.floor(remain % game.Second.Minute);
            }
            else {
                obj["s"] = "";
            }
            obj["S"] = "";
            return format.replace(/y+|M+|d+|H+|m+|s+|S+/g, this._tmpReplacer);
        };
        /**
         * 格式化时间戳，周几（0~6：周日~周六）
         * @param {number} time 时间戳，毫秒
         * @returns {number}
         */
        TimeUtil.formatWeekday = function (time) {
            var date = this._tmpDate;
            date.setTime(time);
            return date.getDay();
        };
        /**
         * 格式化时间戳，小时（0~23）
         * @param {number} time 时间戳，毫秒
         * @returns {number}
         */
        TimeUtil.formatHours = function (time) {
            var date = this._tmpDate;
            date.setTime(time);
            return date.getHours();
        };
        /**服务器时间*/
        TimeUtil.getServerTime = function () {
            var date = this._tmpDate;
            date.setTime(TimeMgr.time.serverTime);
            return date;
        };
        /**
         * 获取几天后的时间戳，会初始化到0点
         * @param {number} begin 开始时间戳
         * @param {boolean} isMillisecond 是否毫秒
         * @param {number} day 几天后
         * @returns {number}
         */
        TimeUtil.getNextDayTime = function (begin, isMillisecond, day) {
            if (day === void 0) { day = 0; }
            if (!isMillisecond) {
                begin = begin * 1000;
            }
            var date = new Date(begin);
            date.setHours(0, 0, 0, 0);
            return 60 * 60 * 24 * day + (date.getTime() / 1000);
        };
        /**获取星期一0点时间戳(秒) */
        TimeUtil.getNextWeekTime = function () {
            var today = Math.floor(new Date(this.getServerTime().toLocaleDateString()).getTime() / 1000);
            var day = this.getServerTime().getDay() || 7;
            var nextWeek = today + (7 - day + 1) * game.Second.Day;
            // let week: number = nextWeek - (nextWeek % Second.Day) - Second.Hour * 8;
            return nextWeek;
        };
        /**time 单位为秒 */
        TimeUtil.getSecondByTomorrow = function (time) {
            var ms = time * 1000;
            // 获取当前时间戳
            var now = new Date(ms).getTime();
            // 获取今天晚上的0点时间戳
            var tonight = new Date(ms).setHours(24, 0, 0, 0);
            // 如果当前时间已经过了今晚的0点，则计算明天晚上的0点
            var target = now > tonight ? new Date(ms).setHours(48, 0, 0, 0) : tonight;
            // 计算距离目标时间戳的秒数
            return Math.floor((target - now) / 1000);
        };
        /**
         * 离线多久
         * */
        TimeUtil.getLeaveTime = function (lastTime) {
            var leaveTime = TimeMgr.time.serverTimeSecond - lastTime;
            var day = Math.floor(leaveTime / game.Second.Day);
            var hour = Math.floor(leaveTime / game.Second.Hour);
            if (day > 0) {
                return (day > 7 ? 7 : day) + "\u5929\u524D";
            }
            if (hour <= 0) {
                return "刚刚离线";
            }
            else {
                return hour + "\u5C0F\u65F6\u524D";
            }
        };
        /**
         * 供奉时间文本转换
         * */
        TimeUtil.getConsecrateTime = function (seconds) {
            var format = "";
            if (seconds >= game.Second.Day) {
                format = "d天";
            }
            else if (game.Second.Hour <= seconds && seconds < game.Second.Day) {
                format = "H时";
            }
            else {
                format = "m分";
                if (seconds < game.Second.Minute) {
                    seconds = game.Second.Minute;
                }
            }
            return this.formatSecond(seconds, format);
        };
        /** @internal */ TimeUtil.frameInc = 0;
        /** @internal */ TimeUtil.lastTimer = 0;
        /** @internal */ TimeUtil.SHIFT = 200;
        /** @internal */ TimeUtil._tmpDate = new Date();
        /** @internal */ TimeUtil._tmpObj = {};
        return TimeUtil;
    }());
    game.TimeUtil = TimeUtil;
    __reflect(TimeUtil.prototype, "game.TimeUtil");
})(game || (game = {}));
//# sourceMappingURL=launcher.js.map