(function (d) {
    d.oncontextmenu = function () {
        return false;
    };
    d.ondragstart = function () {
        return false;
    };
})(document);
window.gzyyou = Object.create(null);
function gAlert(message) {
    alert.call(window, message);
}
var runEgretOptions;
(function (o) {
    o.renderMode = "webgl";
    o.audioType = 0;
    o.calculateCanvasScaleFactor = function (context) {
        var r;
        if (gso.isPc) {
            r = 2;
        }
        else {
            var backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio ||
                1;
            r = (window.devicePixelRatio || 1) / backingStore;
            // alert("window.devicePixelRatio = "+window.devicePixelRatio);
            // alert("backingStore = "+backingStore);
            var w = screen.width;
            var h = screen.height;
            if ((w === 412 && h === 915 && window.devicePixelRatio === 3.5)) {
                r = 720 / 1280;
            }
        }
        console.info('canvas scale:' + r);
        return r;
    };
})(runEgretOptions || (runEgretOptions = Object.create(null)));
(function (l) {
    l.clock = {
        _sst: 0,
        _lti: 0,
        _sti: 0,
        tmp: new Date(),
        pad: function (s, n) {
            s = s.toString();
            n = n || 2;
            while (s.length < n) {
                s = "0" + s;
            }
            return s;
        },
        toString: function () {
            this.tmp.setTime(this.st ? this.st : Date.now());
            return "[" + this.tmp.getFullYear() + "-" + this.pad(this.tmp.getMonth() + 1) + "-" + this.pad(this.tmp.getDate()) + " "
                + this.pad(this.tmp.getHours()) + ":" + this.pad(this.tmp.getMinutes()) + ":" + this.pad(this.tmp.getSeconds()) + "."
                + this.pad(this.tmp.getMilliseconds(), 3) + (this.st ? "ST" : "LT") + "]";
        },
        setSt: function (sti, sst) {
            if (sst) {
                this._sst = sst;
            }
            this._lti = Date.now();
            this._sti = sti;
        },
        get st() {
            return !this._sst ? 0 : (this._sst * 1000 + this._sti * 10 + Date.now() - this._lti);
        }
    };
    l.getList = function (args) {
        var msg = [];
        for (var i = 0; i < args.length; i++) {
            var o = args[i];
            msg.push(o ? o.toString() : o);
        }
        return msg;
    };
    l.toMsgStr = function (msg) {
        return l.clock.toString() + " " + msg.join(" ");
    };
    l.getEMsg = function (e) {
        if (!e) {
            return null;
        }
        var stack = e.stack ? e.stack : "";
        if (stack.indexOf(e.name) < 0 || stack.indexOf(e.message) < 0) {
            return e.name + ":" + e.message + "\n" + stack;
        }
        return stack;
    };
    l.def = { error: console.error, warn: console.warn, log: console.log, debug: console.debug };
    l.nop = function () {
    };
    l.error = function () {
        var a = [];
        for (var i = 0; i < arguments.length; i++) {
            var o = arguments[i];
            a.push(o instanceof Error ? l.getEMsg(o) : (o ? o.toString() : o));
        }
        l.def.error.call(console, l.toMsgStr(a));
        l.repE({ time: l.clock.toString(), msg: a.shift(), stack: a.join(" ") });
    };
    l.warn = function () {
        l.def.warn.apply(console, arguments);
    };
    l.info = function () {
        l.def.log.apply(console, ["%c" + l.toMsgStr(l.getList(arguments)), "color:blue"]);
    };
    l.log = function () {
        l.def.log.apply(console, ["%c" + l.toMsgStr(l.getList(arguments)), "color:olive"]);
    };
    l.debug = function () {
        l.def.debug.call(console, l.toMsgStr(l.getList(arguments)));
    };
    l.proto = function () {
        l.def.log.call(console, l.toMsgStr(l.getList(arguments)));
    };
    l.onerror = function (message, source, fileno, columnNumber, error) {
        if (typeof message !== "string") {
            message = message.type;
        }
        if (message === "Script error.") {
            return true;
        }
        var stack = "";
        if (!!error) {
            stack = l.getEMsg(error);
        }
        l.repE({ time: l.clock.toString(), msg: message, stack: stack });
        return false;
    };
    l.repE = function (data) {
        //发布环境下的上报在ErrorReporter
        if (DEBUG) {
            if (window.location.href.indexOf("c1.") > -1) {
                if (data.msg.indexOf("脚本报错[游戏") > -1)
                    return;
                var str = JSON.stringify({
                    error: data.msg,
                    stack: data.stack,
                    time: data.time,
                    acct: gso.account,
                    sid: gso.serverId,
                    server_name: gso.serverName,
                });
                if (typeof ggo !== "undefined" && typeof ggo.webReqGet === "function") {
                    ggo.webReqGet(gso.error_url, {
                        // counter: "dbgTrace",
                        // key: "xcjkjkkaskd",
                        // env: "dev",
                        data: str
                    });
                }
            }
        }
    };
    window.onerror = l.onerror;
    l.keys = ["error", "warn", "info", "log", "debug", "proto"];
    l.setLv = function (lv, dfasdfa) {
        for (var i = 0; i < l.keys.length; i++) {
            var k = l.keys[i];
            console[k] = (i < lv && (i !== 5 || dfasdfa)) ? l[k] : l.nop;
        }
        return true;
    };
    l.setLv(3);
})(typeof logger === "undefined" ? (window.logger = Object.create(null)) : logger);
(function (g) {
    g.cdn_url = "";
    g.isReConnect = false;
    g.reconnectId = 0;
    g.isReload = false;
    g.apiLoginMethod = "login/";
    g.apiHost = g.apiHost || "//login-jzsj.gankh5.com/";
    var container = document.querySelectorAll(".egret-player")[0];
    g.contentWidth = +container.getAttribute("data-content-width");
    g.contentHeight = +container.getAttribute("data-content-height");
    if (location.search.length > 1) {
        for (var aItKey = void 0, nKeyId = 0, aCouples = location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
            //aItKey = aCouples[nKeyId]. split("=");
            //g[decodeURIComponent(aItKey[0])] = aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : "";
            var index = aCouples[nKeyId].indexOf("=");
            var key = aCouples[nKeyId].substr(0, index);
            var value = aCouples[nKeyId].substr(index + 1);
            g[decodeURIComponent(key)] = value ? decodeURIComponent(value) : "";
        }
    }
    var baseList = document.getElementsByTagName('base');
    if (baseList && baseList.length) {
        var base_1 = baseList[0];
        var search = base_1.href.split("?")[1];
        for (var aItKey = void 0, nKeyId = 0, aCouples = search.split("&"); nKeyId < aCouples.length; nKeyId++) {
            aItKey = aCouples[nKeyId].split("=");
            g[decodeURIComponent(aItKey[0])] = aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : "";
        }
    }
    if (g.c_dbg === "1") {
        logger.setLv(6, "debug");
    }
    g.ua = (navigator && navigator.userAgent) ? navigator.userAgent : undefined;
    if (g.ua) {
        var uaLow = g.ua.toLowerCase();
        g.isPc = uaLow.indexOf("mobile") < 0 && uaLow.indexOf("android") < 0;
        g.isMicroMessenger = uaLow.indexOf("micromessenger") > -1;
        if (g.isMicroMessenger) {
            g.scaleTexture = 1.25;
        }
    }
    if (g.isPc) {
        try {
            g.worker = new Worker(URL.createObjectURL(new Blob(['var a = 0;b = function () {postMessage("");};onmessage = function (e) {clearInterval(a);if (e.data === "start") {a = setInterval(b, 60);}};'], { type: "text/javascript" })));
        }
        catch (e) {
            g.worker = undefined;
        }
    }
    g.bgImg = "{bgImgObj}";
})(typeof gso === "undefined" ? (window.gso = Object.create(null)) : gso);
(function (g) {
    g.loadVerbose = g.loadVerbose || function (msg) {
    };
    g.removeVerbose = g.removeVerbose || function () {
    };
    g.myPolicy = g.myPolicy || function (src, w, h) {
        var div = document.getElementById('myPolicyDiv');
        if (div)
            return;
        var w1 = document.body.clientWidth * 0.9;
        var h1 = document.body.clientHeight * 0.9;
        if (w > 0) {
            //w1 = w;
            w1 = Math.min(w1, w);
        }
        if (h > 0) {
            //h1 = h;
            h1 = Math.min(h1, h);
        }
        div = document.createElement('div');
        div.id = "myPolicyDiv";
        // div.style = "position:absolute;  width:"+(w1+30)+"px; height:"+(h1+30)+"px; margin: auto; top: 0; left: 0; right: 0; bottom: 0;";
        div.setAttribute("style", "position:absolute;  width:" + (w1 + 30) + "px; height:" + (h1 + 30) + "px; margin: auto; top: 0; left: 0; right: 0; bottom: 0;");
        document.body.appendChild(div);
        var myIframe = document.createElement('iframe');
        myIframe.id = "policy";
        myIframe.width = "" + w1;
        myIframe.height = "" + h1;
        myIframe.setAttribute("style", "background-color: #ffffff;z-index:999; position:absolute; margin: auto; top: 30px; left: 0; right: 0; bottom: 0;");
        myIframe.setAttribute("security", "restricted");
        myIframe.setAttribute("sandbox", "allow-top-navigation allow-same-origin allow-forms allow-scripts");
        myIframe.src = src;
        div.appendChild(myIframe);
        var btn = document.createElement('input');
        btn.id = "closeBtn";
        btn.type = "button";
        btn.value = "X";
        btn.setAttribute("style", "width:26px; height:26px; position:absolute; margin: auto; top: 0; right: 12px; z-index:1000;");
        btn.setAttribute("onclick", "function a(){var div = document.getElementById('myPolicyDiv');if(div) div.remove();} a();");
        div.appendChild(btn);
    };
    g.loadLauncher = g.loadLauncher || function () {
        gso.launcherReady = false;
        g.loadSingleScript("{launcher.web.js}", function () {
            gso.launcherReady = true;
            if (gzyyou.sdk) {
                g.startEgret();
            }
            // if (gso.isNative === "1") {
            //     gso.gameStage.frameRate = 60;
            //     egret.ExternalInterface.addCallback("certificationCallback",
            //         (msg: string) => gzyyou.sdk.certificationCallback(msg));
            //     egret.ExternalInterface.addCallback("isShowVerify",
            //         (msg: string) => gzyyou.sdk.checkShowVerify(msg));
            //     egret.ExternalInterface.call("hideLoading", "");
            // }
            var loading = document.getElementById("loading");
            if (loading) {
                loading.parentNode.removeChild(loading);
            }
        });
    };
    g.startGame = g.startGame || function () {
        gso.apiReady = true;
        if (typeof g.onApiReady === "function") {
            g.onApiReady();
        }
    };
    g.loadLogin = g.loadLogin || function (src, onComplete) {
        g.loadSingleScript(src, onComplete);
    };
    g.inflate = g.inflate || function (buffer) {
        return null;
        // return (new Zlib.Inflate(new Uint8Array(buffer))).decompress();
    };
    g.reconnect = g.reconnect || function (server_id) {
        gso.lastVersion = gso.version;
        gso.isReConnect = server_id !== 0;
        gso.reconnectId = server_id;
        gso.isReload = true;
        gso.apiReady = false;
        gzyyou.sdk.startLogin();
    };
    g.webReqGet = g.webReqGet || function (url, data, onSuccess, onFail) {
        var reqUrl = url + g.encodeUriData(data);
        var xhr = g.getXhr(onSuccess, onFail);
        xhr.open("GET", reqUrl);
        xhr.responseType = "text";
        xhr.send();
    };
    g.webReqPost = g.webReqPost || function (url, data, onSuccess, onFail) {
        var xhr = g.getXhr(onSuccess, onFail);
        xhr.open("POST", url);
        xhr.responseType = "text";
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    };
    g.loadScript = g.loadScript || function (onProgress, onComplete) {
        var list = gso.scriptList;
        if (!list || !list.length) {
            onProgress(100);
            onComplete(null, "gso.scriptLit");
            return;
        }
        var count = 0;
        var total = list.length;
        var loadComplete = function () {
            count++;
            onProgress(Math.floor(count / total * 100));
            if (count === total) {
                onComplete(null, "gso.scriptList");
            }
        };
        var loadNext = function () {
            var str = list.shift();
            if (str) {
                g.loadSingleScript(str, loadComplete);
            }
            if (!list.length) {
                clearInterval(id);
            }
        };
        loadNext();
        var id = setInterval(loadNext, 180);
    };
    g.encodeUriData = g.encodeUriData || function (data) {
        var list = [];
        for (var k in data) {
            if (!data.hasOwnProperty(k)) {
                continue;
            }
            var v = data[k];
            if (typeof v === "undefined" || typeof v === "function") {
                continue;
            }
            list.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return list.length ? ("?" + list.join("&")) : "";
    };
})(typeof ggo === "undefined" ? (window.ggo = Object.create(null)) : ggo);
(function (g) {
    g.getXhr = g.getXhr || function (onSuccess, onFail) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            xhr.onreadystatechange = null;
            xhr.ontimeout = null;
            if (xhr.status >= 400 || !xhr.status) {
                if (typeof onFail === "function") {
                    setTimeout(onFail, 0);
                }
                return;
            }
            if (typeof onSuccess === "function") {
                var resp_1 = null;
                try {
                    resp_1 = JSON.parse(xhr.response);
                }
                catch (e) {
                    resp_1 = xhr.response;
                }
                setTimeout(function () { return onSuccess(resp_1); }, 0);
            }
        };
        xhr.ontimeout = function () {
            xhr.onreadystatechange = null;
            xhr.ontimeout = null;
            if (typeof onFail === "function") {
                setTimeout(onFail, 0);
            }
        };
        return xhr;
    };
    g.loadSingleScript = g.loadSingleScript || function (src, callback, errCnt) {
        var s = document.createElement("script");
        s.async = false;
        s.src = src;
        errCnt = +errCnt | 0;
        var ondone = function () {
            s.parentNode.removeChild(s);
            s.onload = s.onerror = null;
        };
        s.onload = function () {
            ondone();
            if (typeof callback === "function") {
                var id_1 = setTimeout(function () {
                    clearTimeout(id_1);
                    callback(src, src);
                }, 10);
            }
        };
        s.onerror = function () {
            ondone();
            errCnt++;
            if (errCnt > 10) {
                console.error("script load error:" + src.split("?")[0]);
                alert("\u4EE3\u7801\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165\u6E38\u620F" /* LOAD_SCRIPT */);
                return;
            }
            var id = setTimeout(function () {
                clearTimeout(id);
                if ((/\?/i).test(src)) {
                    src = src + "1";
                }
                else {
                    src = src + "?1";
                }
                g.loadSingleScript(src, callback, errCnt);
            }, 10);
        };
        document.body.appendChild(s);
    };
    g.checkVersion = g.checkVersion || function (v) {
        if (!v) {
            v = "{latestVer}";
        }
        return v;
    };
    function initLifeCycle() {
        var LifecycleContext = egret.lifecycle.LifecycleContext.prototype;
        var pause = LifecycleContext.pause, resume = LifecycleContext.resume;
        var hiddenKey, hidden = false;
        var keys = ["hidden", "mozHidden", "msHidden", "webkitHidden", "oHidden"];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var k = keys_1[_i];
            if (typeof document[k] !== "undefined") {
                hiddenKey = k;
                break;
            }
        }
        var onStateChanged = function (state) {
            var h;
            if (!hiddenKey) {
                h = state === false;
            }
            else {
                h = document[hiddenKey];
            }
            if (hidden === h) {
                return;
            }
            hidden = h;
            if (h) {
                pause();
            }
            else {
                resume();
            }
        };
        LifecycleContext.pause = function () { return onStateChanged(true); };
        LifecycleContext.resume = function () { return onStateChanged(false); };
    }
    function initWebRequest(web) {
        var webAudioSound = web.WebAudioSound.prototype;
        webAudioSound.load = function (url) {
            var self = this;
            self.url = url;
            if (!url) {
                return;
            }
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
            request.addEventListener("load", function () {
                var ioError = (request.status >= 400 || request.status == 0);
                if (ioError) {
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, { code: request.status });
                }
                else {
                    web.WebAudioDecode.decodeArr.push({
                        "buffer": request.response,
                        "success": onAudioLoaded,
                        "fail": onAudioError,
                        "self": self,
                        "url": self.url
                    });
                    web.WebAudioDecode.decodeAudios();
                }
            });
            request.addEventListener("error", function () {
                self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, {
                    errMsg: "errorevent",
                    code: request.status
                });
            });
            request.addEventListener("timeout", function () {
                self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, { errMsg: "time out" });
            });
            request.timeout = 8000;
            request.send();
            function onAudioLoaded() {
                self.loaded = true;
                self.dispatchEventWith(egret.Event.COMPLETE);
            }
            function onAudioError() {
                game.SoundMgr.ins.enableSound(false);
                self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, { errMsg: "WebAudioDecode error" });
            }
        };
        var htmlSound = web.HtmlSound.prototype;
        htmlSound.load = function (url) {
            var self = this;
            self.url = url;
            if (!url) {
                return;
            }
            var audio = new Audio(url);
            audio.addEventListener("canplaythrough", onAudioLoaded);
            audio.addEventListener("error", onAudioError);
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf("firefox") >= 0) { //火狐兼容
                audio.autoplay = !0;
                audio.muted = true;
            }
            //edge and ie11
            var ie = ua.indexOf("edge") >= 0 || ua.indexOf("trident") >= 0;
            if (ie) {
                document.body.appendChild(audio);
            }
            audio.load();
            self.originAudio = audio;
            if (web.HtmlSound.clearAudios[self.url]) {
                delete web.HtmlSound.clearAudios[self.url];
            }
            function onAudioLoaded() {
                web.HtmlSound.$recycle(self.url, audio);
                removeListeners();
                if (ua.indexOf("firefox") >= 0) { //火狐兼容
                    audio.pause();
                    audio.muted = false;
                }
                if (ie) {
                    document.body.appendChild(audio);
                }
                self.loaded = true;
                self.dispatchEventWith(egret.Event.COMPLETE);
            }
            function onAudioError() {
                removeListeners();
                if (audio.networkState === 3) {
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, { errMsg: "audio.networkState === 3 NETWORK_NO_SOURCE" });
                }
            }
            function removeListeners() {
                audio.removeEventListener("canplaythrough", onAudioLoaded);
                audio.removeEventListener("error", onAudioError);
                if (ie) {
                    document.body.removeChild(audio);
                }
            }
        };
        var webHttpRequest = web.WebHttpRequest.prototype;
        var webHttpRequestOpen = webHttpRequest.open;
        webHttpRequest.open = function (data) {
            if (!this.timeout) {
                this.timeout = 8000;
            }
            return webHttpRequestOpen.call(this, data);
        };
        webHttpRequest.onload = function () {
            var self = this;
            var status = self._xhr.status;
            setTimeout(function () {
                if (status >= 400) { //请求错误
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, { code: status });
                }
                else {
                    self.dispatchEventWith(egret.Event.COMPLETE);
                }
            }, 0);
        };
        webHttpRequest.onerror = function () {
            var self = this;
            setTimeout(function () {
                self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, { code: self._xhr.status });
            }, 0);
        };
        webHttpRequest.onTimeout = function () {
            this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, { errMsg: "time out" });
        };
        webHttpRequest.onReadyStateChange = function () {
            var self = this;
            var xhr = self._xhr;
            if (xhr.readyState == 4) {
                var ioError_1 = (xhr.status >= 400 || xhr.status == 0);
                setTimeout(function () {
                    if (ioError_1) {
                        self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, { code: xhr.status });
                    }
                    else {
                        self.dispatchEventWith(egret.Event.COMPLETE);
                    }
                }, 0);
            }
        };
        var webImageLoader = web.WebImageLoader.prototype;
        webImageLoader.onBlobError = function (event) {
            var self = this;
            var data = event.data;
            setTimeout(function () {
                self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, data);
            }, 0);
            self.request = undefined;
        };
    }
    g.startEgret = function () {
        gso.launcherReady = false;
        initLifeCycle();
        initWebRequest(egret.web);
        egret.runEgret(runEgretOptions);
    };
    g.os = function () {
        if (/(Android)/i.test(navigator.userAgent)) {
            return 1 /* Android */;
        }
        else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            return 2 /* Ios */;
        }
        else {
            return 0 /* Other */;
        }
    };
})(ggo);
ggo.loadLauncher();
(function (a) {
    function getAudioType() {
        var audio = document.createElement("audio");
        if (typeof audio.canPlayType !== "function") {
            return ".mp3";
        }
        var extensions = ["mp3", "ogg", "m4a"];
        var types = { "m4a": "mp4" };
        var no = /^no$/;
        for (var _i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
            var ext = extensions_1[_i];
            var type = types[ext] || ext;
            var canByExt = audio.canPlayType("audio/" + ext).replace(no, "");
            var canByType = audio.canPlayType("audio/" + type).replace(no, "");
            if (!!canByExt || !!canByType) {
                return "." + ext;
            }
        }
        return ".mp3";
    }
    var ctx;
    a.resumeAudio = function (cb) {
        if (!ctx || typeof ctx.resume !== "function" || ctx.state === "running" || ctx.state === "closed") {
            if (cb) {
                cb.exec();
            }
            return;
        }
        ctx.resume().then(function () {
            if (cb) {
                cb.exec();
            }
        });
    };
    a.initAudio = function (onInit) {
        var audioType = getAudioType();
        var web = egret.web;
        if (!web || !web.WebAudioDecode || !web.WebAudioDecode.ctx) {
            onInit.exec(audioType);
            return;
        }
        ctx = web.WebAudioDecode.ctx;
        if (ctx.state === "running") {
            onInit.exec(audioType);
            return;
        }
        function onCtxStateChange() {
            if (ctx.state === "running") {
                gso.gameStage.removeEventListener(egret.TouchEvent.TOUCH_TAP, onTapStage, null);
                onInit.exec(audioType);
            }
        }
        function onTapStage() {
            var source = ctx.createBufferSource();
            source.buffer = ctx.createBuffer(1, 1, 22050);
            source.connect(ctx.destination);
            a.resumeAudio();
        }
        ctx.onstatechange = onCtxStateChange;
        gso.gameStage.addEventListener(egret.TouchEvent.TOUCH_TAP, onTapStage, null);
    };
})(typeof webAudio === "undefined" ? (window.webAudio = Object.create(null)) : webAudio);
/**内网测试服*/
gzyyou.TestSdkTools = /** @class */ (function () {
    function SdkTools() {
        // if (gso.channel && !gso.jzsj_channel) {
        //     gso.jzsj_channel = gso.channel;
        // }
        if (gso.uid && !gso.account) {
            gso.account = gso.uid;
        }
        if (gso.sign && !gso.token) {
            gso.token = gso.sign;
        }
        console.info("TestSdkTools");
    }
    SdkTools.prototype.startLogin = function () {
        ggo.loadVerbose("\u6B63\u5728\u83B7\u53D6\u8D26\u53F7\u4FE1\u606F" /* START_LOGIN */);
        console.info("startLogin");
        //游戏加载和sdk 服务器列表请求同时进行
        if (gso.channel == "test" /* Test */) {
            //内网
            ggo.startGame();
        }
        else {
            //外网
            this.getVersion();
        }
        this.apiLogin();
    };
    SdkTools.prototype.getVersion = function () {
        console.info("getVersion");
        var apiUrl = gso.apiHost + gso.apiLoginMethod + "getversion/";
        var data = {
            channel: gso.channel,
            is_admin: gso.is_admin
        };
        var self = this;
        ggo.webReqGet(apiUrl, data, function apiLoginSucc(res) {
            console.info("versionObj: " + JSON.stringify(res));
            gso.version = res.version;
            gso.phone_type = Number(res.phone_type) || 1;
            ggo.startGame();
        }, function () {
            console.error("getversion fail");
        });
    };
    SdkTools.prototype.apiLogin = function () {
        console.info("apiLogin");
        if (!gso.channel || !gso.account) {
            alert("\u542F\u52A8\u53C2\u6570\u9519\u8BEF" /* LAUNCH_VARS */ + "\n" + location.search);
            return;
        }
        ggo.loadVerbose("\u6B63\u5728\u521D\u59CB\u5316\u8D26\u53F7" /* API_LOGIN */);
        var data = {
            channel: gso.channel,
            gameid: gso.gameid,
            account: gso.account,
            token: gso.token,
            is_admin: gso.is_admin
        };
        var apiUrl = gso.apiHost + gso.apiLoginMethod + "index/";
        if (gso.timestamp) {
            data.timestamp = gso.timestamp;
        }
        ggo.webReqGet(apiUrl, data, gzyyou.apiLoginSucc, gzyyou.apiLoginFail);
    };
    SdkTools.prototype.getNotice = function (cb) {
        var data = {
            pfrom_id: gso.pfrom_id
        };
        var apiUrl = gso.apiHost + "api/notice";
        ggo.webReqGet(apiUrl, data, cb);
    };
    SdkTools.prototype.getServerInfo = function (serverId, cb) {
        var data = {
            channel: gso.channel,
            jzsj_channel: gso.channel,
            account: gso.account,
            server_id: serverId,
        };
        var apiUrl = gso.apiHost + gso.apiLoginMethod + "login/";
        ggo.webReqGet(apiUrl, data, cb);
    };
    SdkTools.prototype.getServerList = function (cb) {
        var data = {
            channel: gso.channel,
            jzsj_channel: gso.channel,
            account: gso.account,
        };
        var apiUrl = gso.apiHost + gso.apiLoginMethod + "getServerList/";
        ggo.webReqGet(apiUrl, data, cb);
    };
    SdkTools.prototype.sdkPay = function (productId, price, extra, roleName, roleId, productName) {
        return false;
    };
    SdkTools.prototype.loadReport = function (act) {
        if (!gso.isNew || !gso.report_url || gso.report_url === "") {
            return;
        }
        var data = [gso.pfrom_id, gso.serverId.toString(), gso.account, "enter_game", act, 1, "", gso.client_ip, "", gso.jzsj_channel]; // 扩展字段、时间留空
        var obj = { counter: "load", key: "xcjkjkkaskd", data: data.join("|"), env: "dev" };
        ggo.webReqGet(gso.report_url, obj);
    };
    SdkTools.prototype.checkCanPay = function () {
        //web版模似ios的情况
        console.info(egret.Capabilities.os + "--------------------");
        if (gso.ios_openpay == 0 && egret.Capabilities.os == "iOS") {
            return false;
        }
        return true;
    };
    SdkTools.prototype.getShareSource = function () {
        return { account: "123", serverId: 14, roleId: "adsfadsf" };
    };
    SdkTools.prototype.copyTextToClipboard = function (text) {
        try {
            var textArea = document.createElement("textarea");
            textArea.style.position = "fixed";
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.width = "2em";
            textArea.style.height = "2em";
            textArea.style.padding = "0";
            textArea.style.border = "none";
            textArea.style.outline = "none";
            textArea.style.boxShadow = "none";
            textArea.style.background = "transparent";
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            var successful = document.execCommand("copy");
            document.body.removeChild(textArea);
            return successful;
        }
        catch (err) {
        }
        return false;
    };
    SdkTools.prototype.uploadAuth = function (account, authId, name, cb) {
        var data = {
            action: "uploadAuth",
            account: account,
            identity: authId,
            name: name,
        };
        ggo.webReqGet("https://hlmc-loginaudit.hlmc.hainanliangang.com/", data, cb);
    };
    SdkTools.prototype.checkIsCurChannel = function (channel) {
        return channel == gso.source; //内网测试用source，channel的值为"test"
    };
    SdkTools.prototype.logout = function () {
    };
    return SdkTools;
}());
/**通用web登陆*/
gzyyou.YiYouSdkTools = /** @class */ (function () {
    function SdkTools() {
        var _a;
        /**角色上报数据时，使用md5加密的渠道*/
        this.md5_channel = ["yhxxl_4399" /* Yhxxl_4399 */, "yhxxl_360" /* Yhxxl_360 */, "yhxxl_momo" /* Yhxxl_momo */, "yhxxl_cw" /* Yhxxl_cw */];
        this.login_key = (_a = {},
            _a["yhxxl_4399" /* Yhxxl_4399 */] = "41423796dbfc33652a26cb2dfd5f4474",
            _a["yhxxl_360" /* Yhxxl_360 */] = "12531844e6d9583c9eb3babb7f1b2a92",
            _a["yhxxl_momo" /* Yhxxl_momo */] = "602d01e066ffd37e72e20bff6340230c",
            _a["yhxxl_cw" /* Yhxxl_cw */] = "3cc42f7c486f9851e35ab61483b3b0a4",
            _a);
        if (egret.Capabilities.os == "iOS" || egret.Capabilities.os == "Mac OS") {
            gso.isIosSys = true;
        }
        gso.dbg_all_win = 1; //爱微游疯狂渠道全屏
        gzyyou.loginErrCnt = 0;
        this.checkAdaptive();
        this.intervalKey = setInterval(this.heartbeat, 1000);
    }
    SdkTools.prototype.cacheQQPlayerRankInfo = function (lv, cb) {
    };
    SdkTools.prototype.getQQPlayerRankInfo = function (cb) {
    };
    SdkTools.prototype.heartbeat = function () {
        if (yiyou && yiyou.heartbeat) {
            yiyou.heartbeat();
        }
    };
    SdkTools.prototype.checkAdaptive = function () {
        if (this.isH5())
            return;
        // let w = screen.width;
        // let h = screen.height;
        // let r = window.devicePixelRatio;
        // if ((w === 375 || w === 414)
        //     && (h === 812 || h === 896)
        //     && (r === 3 || r === 2)) {
        //     gso.mainTop = 52;
        //     gso.mainBottom = 44;
        // }
    };
    SdkTools.prototype.isH5 = function () {
        return true;
    };
    SdkTools.prototype.startLogin = function () {
        console.info(".............yiyou.............1111");
        gso.logList["load_api_login" /* API_LOGIN */] = "\u6B63\u5728\u83B7\u53D6\u8D26\u53F7\u4FE1\u606F" /* START_LOGIN */;
        ggo.loadVerbose("\u6B63\u5728\u83B7\u53D6\u8D26\u53F7\u4FE1\u606F" /* START_LOGIN */);
        this.apiLogin();
    };
    /** 获取用户信息 */
    SdkTools.prototype.apiLogin = function () {
        yiyou.init(function (state) {
            if (state) {
                gzyyou.loginErrCnt = 0;
                ggo.loadVerbose("\u521D\u59CB\u5316\u8D26\u53F7\u6210\u529F" /* API_LOGIN_SUCC */);
                gso.logList["load_api_login" /* API_LOGIN */ + "1"] = "\u521D\u59CB\u5316\u8D26\u53F7\u6210\u529F" /* API_LOGIN_SUCC */;
                var k = void 0;
                for (k in yiyou.userLogin) {
                    if (k !== "params" && yiyou.userLogin.hasOwnProperty(k)) {
                        gso[k] = yiyou.userLogin[k];
                    }
                }
                for (k in yiyou.userLogin.params) {
                    if (yiyou.userLogin.params.hasOwnProperty(k)) {
                        gso[k] = yiyou.userLogin.params[k];
                    }
                }
                // gAlert("获取用户信息...1");
                ggo.startGame();
            }
            else {
                // gAlert("获取用户信息...2");
                gzyyou.loginErrCnt++;
                if (gzyyou.loginErrCnt > 3) {
                    ggo.loadVerbose("\u521D\u59CB\u5316\u8D26\u53F7\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165\u6E38\u620F" /* API_LOGIN_FAIL */);
                    if (gso.isReload) {
                        base.facade.sendNt("web_login_error" /* WEB_LOGIN_ERROR */);
                        return;
                    }
                    alert("\u65E0\u6CD5\u8FDE\u63A5\u5165\u53E3\u670D\u52A1\u5668" /* API_LOGIN */);
                    return;
                }
                var id_2 = setTimeout(function () {
                    clearTimeout(id_2);
                    gzyyou.sdk.startLogin();
                }, 1000);
            }
        });
    };
    /**
     * 复制文本到夹板
     * @param text
     */
    SdkTools.prototype.copyTextToClipboard = function (text) {
        try {
            var textArea = document.createElement("textarea");
            textArea.style.position = "fixed";
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.width = "2em";
            textArea.style.height = "2em";
            textArea.style.padding = "0";
            textArea.style.border = "none";
            textArea.style.outline = "none";
            textArea.style.boxShadow = "none";
            textArea.style.background = "transparent";
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            var successful = document.execCommand("copy");
            document.body.removeChild(textArea);
            return successful;
        }
        catch (err) {
            console.error("\u590D\u5236\u5931\u8D25\uFF1A" + err);
        }
        return false;
    };
    SdkTools.prototype.getNotice = function (cb) {
        var data = {
            agent: gso.pfrom_name
        };
        var apiUrl = "//login-ljtx.1y-game.com/api/notice";
        ggo.webReqGet(apiUrl, data, cb);
    };
    SdkTools.prototype.getServerInfo = function (serverId, cb) {
        yiyou.getLoginInfo(serverId, cb);
    };
    SdkTools.prototype.getServerList = function (cb) {
        yiyou.getServerList(cb);
    };
    SdkTools.prototype.loadReport = function (act) {
        if (!gso.isNew || !gso.report_url) {
            return;
        }
        var data = [gso.pfrom_id, gso.serverId.toString(), gso.account, "enter_game", act, 1, "", gso.client_ip, Math.floor(Date.now() / 1000), gso.channel]; // 扩展字段、时间留空
        var obj = { counter: "load", key: "xcjkjkkaskd", data: data.join("|"), env: "dev" };
        ggo.webReqGet(gso.report_url, obj);
    };
    SdkTools.prototype.logout = function () {
    };
    SdkTools.prototype.pointReport = function (type, level, roleId, roleName, vip, money, updateTime, createTime, oldServerId, oldServerName, lastLvUpTime, power) {
        if (this.isHuiDu() || gso.is_admin == 1) {
            return;
        }
        var t;
        switch (type) {
            case 1 /* Select */:
                t = "load";
                break;
            case 2 /* Create */:
                t = "create";
                break;
            case 3 /* Enter */:
                t = "login";
                break;
            case 4 /* LvUp */:
                t = "levelup";
                break;
        }
        if (!t)
            return;
        var vipLv = vip ? vip.toString() : "0";
        var roleTransLevel = gso.roleChangeLv ? gso.roleChangeLv : 0;
        if (this.md5_channel.indexOf(gso.channel) > -1) {
            /**使用md5加密的渠道*/
            if (!window["ASGD"] || !window["ASGD"].onUserInfo) {
                return;
            }
            var loginkey = this.login_key[gso.channel];
            var signStr = "appID=" + gso.app_id + "createTime=" + createTime + "power=" + gso.rolePower + "roleID=" + roleId + "roleLevel=" + level +
                "roleName=" + roleName + "roleTransLevel=" + roleTransLevel + "serverID=" + gso.serverId + "serverName=" + gso.serverName + "userID=" + gso.account +
                "vip=" + vipLv + loginkey;
            var sign = game.Md5Tool.ins().hex_md5(signStr);
            window["ASGD"].onUserInfo({
                type: t,
                appID: gso.app_id,
                userID: gso.account,
                serverID: gso.serverId.toString(),
                serverName: gso.serverName,
                roleID: roleId,
                roleName: roleName,
                roleLevel: level.toString(),
                vip: vipLv,
                power: gso.rolePower,
                createTime: createTime,
                roleTransLevel: roleTransLevel,
                sign: sign
            });
            return;
        }
        var data = {
            type: t,
            user_id: gso.account,
            role_id: roleId,
            role_name: roleName,
            level: level.toString(),
            server_id: gso.serverId.toString(),
            server_name: gso.serverName,
            vip_level: vipLv,
            create_time: createTime,
            zhuan_sheng: roleTransLevel,
            power: gso.rolePower
        };
        yiyou.roleUpdate(data, function (obj) {
        });
    };
    SdkTools.prototype.reportUseInfo = function (lv, power, roleName, vip, roleId) {
    };
    SdkTools.prototype.sdkPay = function (productId, price, extra, roleName, roleId, productName) {
        if (this.isHuiDu() || gso.is_admin == 1) {
            return false;
        }
        // base.facade.sendNt("get_order_start");
        var extraStr = extra.join("|");
        var cfg = game.getConfigByNameId("product_id.json" /* ProductId */, productId);
        var goods_id = gso.source == "awy2" /* AWY */ ? cfg.yhxxl_yy_id : cfg.product_id; //爱微游专属id
        var data = {
            server_id: gso.serverId,
            server_name: gso.serverName,
            amount: price * 100,
            extra: extraStr,
            role_id: roleId,
            role_name: roleName,
            level: gso.roleLv,
            uid: gso.account,
            goods_name: productName,
            goods_id: goods_id,
        };
        yiyou.getPay(data, function () {
            // base.facade.sendNt("get_order_end");
        });
        return true;
    };
    /** 是否有分享按钮 */
    SdkTools.prototype.isHasShare = function () {
        return yiyou.hasShare && yiyou.hasShare();
    };
    /** 点击分享按钮 */
    SdkTools.prototype.onClickShare = function () {
        return yiyou.onShare && yiyou.onShare();
    };
    /** 设置分享回调 */
    SdkTools.prototype.onShareCb = function (cb) {
        // yiyou.onShareCb(cb);
    };
    /** 检测是否需要打开防沉迷 */
    SdkTools.prototype.isWallow = function () {
        return yiyou.hasWallow && yiyou.hasWallow();
    };
    SdkTools.prototype.getAge = function () {
        return yiyou.authData ? yiyou.authData.age : 0;
    };
    SdkTools.prototype.isHuiDu = function () {
        return yiyou.userInfo.channel == "ljtxshipin" || yiyou.userInfo.channel == "ljtxtest" ||
            yiyou.userInfo.channel == "twoshipin" || yiyou.userInfo.channel == "twotest" ||
            yiyou.userInfo.channel == "yhxxlshipin" || yiyou.userInfo.channel == "yhxxltest";
    };
    /**
     * 是否关注了爱微游 返回true 为有显示关注按钮
     * @param roleInfo
     */
    SdkTools.prototype.checkHasFollowAwy = function (roleInfo) {
        if (gso.is_admin) {
            return false;
        }
        console.info("判断是否显示关注按钮,", yiyou.hasFollowCb, "传给PHP的roleInfo是，", roleInfo);
        console.info("传给PHP的roleInfo属性是下面属性");
        for (var key in roleInfo) {
            console.info("属性：" + key + "的值是：", roleInfo[key]);
        }
        console.info("传给PHP的roleInfo属性是上面属性");
        return yiyou.hasFollowCb && yiyou.hasFollowCb(roleInfo);
    };
    /**
     * 关注成功发送奖励
     * @param cb
     */
    SdkTools.prototype.onFollowAwy = function (cb) {
        console.info("......点击关注按钮......请求关注");
        yiyou.onFollowCb && yiyou.onFollowCb(cb);
    };
    /**
     * 是否分享了爱微游 返回true 为有显示分享按钮
     */
    SdkTools.prototype.checkHasShareAwy = function () {
        if (gso.is_admin) {
            return false;
        }
        console.info("......判断是否显示分享按钮......", yiyou.hasShareCb);
        return yiyou.hasShareCb && yiyou.hasShareCb();
    };
    /**
     * 分享成功发送奖励
     * @param cb
     */
    SdkTools.prototype.onShareAwy = function (cb) {
        console.info("......点击分享按钮......");
        yiyou.onShareCb && yiyou.onShareCb(cb);
    };
    /**
     * 是否显示平台SVIP奖励按钮 返回true 为有显示分享按钮
     */
    SdkTools.prototype.checkHasVipAwy = function () {
        if (gso.is_admin) {
            return false;
        }
        console.info("......判断是否显示SVIP奖励按钮......", yiyou.hasVipCb);
        return yiyou.hasVipCb && yiyou.hasVipCb();
    };
    /**
     * 领取SVIP奖励
     */
    SdkTools.prototype.onVipAwy = function (cb) {
        console.info("......领取SVIP奖励......");
        yiyou.onVipCb && yiyou.onVipCb(cb);
    };
    return SdkTools;
}());
/**小游戏内部登陆*/
gzyyou.OuterNet = /** @class */ (function () {
    function SdkTools() {
        this.loginErrCnt = 0;
        this.getOrderCnt = 0;
        gso.dbg_all_win = 1;
        gso.scaleTexture = 1.25;
        gso.gcInterval = 123000;
        gso.releaseImgTime = 3000;
        gso.uiShowDelay = 500;
        gso.Pool_Unused_T = 9000;
        gso.zipCfg = false;
        gso.targetPlatform = "dyb.qq" /* DYB_QQ */;
        gso.apiLoginMethod = "login/";
        gso.apiHost = "https://login-ljtx.1y-game.com/";
        gso.report_url = "https://report-ljtx.1y-game.com/report/";
        this.channel = gso.channel;
        switch (this.channel) {
            case "shengye" /* SHENGYE */:
            case "shengyeaudit" /* SHENGYEAUDIT */:
            case "shengyeshipin" /* SHENGYE_SHIPIN */:
                gso.isWeixin = true;
                gso.targetPlatform = "gank.wx" /* GANK_WX */;
                console.info("outer_net 赋值targetPlatform", gso.targetPlatform);
                break;
            case "luodun" /* LUODUN */:
                gso.targetPlatform = null;
                break;
            case "fuyao_weixin" /* FuyaoWeixin */:
            case "fuyao_weixinaudit" /* FuyaoWeixinAudit */:
            case "fuyao_weixinshipin" /* FuyaoWeixinShipin */:
            case "fuyao_weixintest" /* FuyaoWeixinTest */:
                gso.isFuyaoWeixin = true;
                gso.targetPlatform = "fuyao.wx" /* FuyaoWeixin */;
                break;
            case "yjmx" /* QQ_HALL */:
            case "yjmxm" /* QQ_HALL2 */:
                gso.targetPlatform = "web" /* WEB */;
                break;
            case "wanjian" /* WANJIAN_SHOUQ */:
            case "wanjianaudit" /* WANJIANAUDIT_SHOUQ */:
            case "wanjiantest" /* WANJIANTEST_SHOUQ */:
                gso.isShouq = true;
                gso.isWanjianShouq = true;
                gso.targetPlatform = "wanjian.qq" /* WANJIAN_QQ */;
                break;
        }
    }
    SdkTools.prototype.cacheQQPlayerRankInfo = function (lv, cb) {
    };
    SdkTools.prototype.getQQPlayerRankInfo = function (cb) {
    };
    SdkTools.prototype.checkIsCurChannel = function (channel) {
        return channel == this.channel;
    };
    SdkTools.prototype.startLogin = function () {
        ggo.loadVerbose("\u6B63\u5728\u83B7\u53D6\u8D26\u53F7\u4FE1\u606F" /* START_LOGIN */);
        this.apiLogin();
    };
    SdkTools.prototype.getNotice = function (cb) {
        var data = {
            pfrom_id: gso.pfrom_id
        };
        ggo.webReqGet(gso.apiHost + "api/notice", data, cb);
    };
    SdkTools.prototype.apiLogin = function () {
        console.info("......正在初始化账号......111");
        ggo.loadVerbose("\u6B63\u5728\u521D\u59CB\u5316\u8D26\u53F7" /* API_LOGIN */);
        var data = {
            gameid: gso.gameid,
            account: gso.account,
            token: gso.token,
            channel: gso.channel,
            code_version: gso.code_version,
        };
        var apiUrl = gso.apiHost + gso.apiLoginMethod + "index/";
        console.info(".......test...............");
        // gAlert("...apiLogin... "+apiUrl);
        ggo.webReqGet(apiUrl, data, gzyyou.apiLoginSucc, gzyyou.apiLoginFail);
    };
    SdkTools.prototype.getServerInfo = function (serverId, cb) {
        var data = {
            channel: gso.channel,
            account: gso.account,
            server_id: serverId,
            code_version: gso.code_version,
        };
        ggo.webReqGet(gso.apiHost + gso.apiLoginMethod + "login/", data, cb);
    };
    SdkTools.prototype.getServerList = function (cb) {
        var data = {
            channel: gso.channel,
            account: gso.account,
            code_version: gso.code_version,
        };
        ggo.webReqGet(gso.apiHost + gso.apiLoginMethod + "getServerList/", data, cb);
    };
    SdkTools.prototype.sdkPay = function (productId, price, extra, roleName, roleId, productName) {
        return true;
    };
    SdkTools.prototype.loadReport = function (act) {
    };
    SdkTools.prototype.logout = function () {
    };
    SdkTools.prototype.reportUseInfo = function (lv, power, roleName, vip, roleId) {
    };
    SdkTools.prototype.pointReport = function (type, level, roleId, roleName, vip, money, updateTime, createTime, power) {
    };
    SdkTools.prototype.getShareSource = function () {
        return null;
    };
    SdkTools.prototype.copyTextToClipboard = function (text) {
        try {
            var textArea = document.createElement("textarea");
            textArea.style.position = "fixed";
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.width = "2em";
            textArea.style.height = "2em";
            textArea.style.padding = "0";
            textArea.style.border = "none";
            textArea.style.outline = "none";
            textArea.style.boxShadow = "none";
            textArea.style.background = "transparent";
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            var successful = document.execCommand("copy");
            document.body.removeChild(textArea);
            return successful;
        }
        catch (err) {
        }
        return false;
    };
    return SdkTools;
}());
gzyyou.loginErrCnt = 0;
gzyyou.apiLoginSucc = function (resp) {
    gzyyou.loginErrCnt = 0;
    ggo.loadVerbose("\u521D\u59CB\u5316\u8D26\u53F7\u6210\u529F" /* API_LOGIN_SUCC */);
    var k;
    for (k in resp) {
        if (k !== "params" && resp.hasOwnProperty(k)) {
            gso[k] = resp[k];
        }
    }
    for (k in resp.params) {
        if (resp.params.hasOwnProperty(k)) {
            gso[k] = resp.params[k];
        }
    }
    gso.version = gso.test_ver || ggo.checkVersion(gso.version);
    //ggo.startGame();
    console.info("gzyyou.apiLoginSucc 11");
    if (gso.updateServerObj) {
        console.info("gzyyou.apiLoginSucc 22");
        gso.updateServerObj["updateServerFunc"]();
    }
    // ggo.loadSingleScript("https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js", function () {
    //     let tt = new window['VConsole']();
    //     console.info("...............vvvvvvvvvv.............")
    // });
};
gzyyou.apiLoginFail = function () {
    gzyyou.loginErrCnt++;
    if (gzyyou.loginErrCnt > 3) {
        ggo.loadVerbose("\u521D\u59CB\u5316\u8D26\u53F7\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165\u6E38\u620F" /* API_LOGIN_FAIL */);
        if (gso.isReload) {
            base.facade.sendNt("web_login_error" /* WEB_LOGIN_ERROR */);
            return;
        }
        alert("\u65E0\u6CD5\u8FDE\u63A5\u5165\u53E3\u670D\u52A1\u5668" /* API_LOGIN */);
        return;
    }
    var id = setTimeout(function () {
        clearTimeout(id);
        gzyyou.sdk.startLogin();
    }, 900);
};
gzyyou.checkPortrait = function () {
    if (gso.isPc) {
        return;
    }
    var container = document.querySelectorAll(".egret-player")[0];
    var screenRect = container.getBoundingClientRect();
    if (!screenRect.height || !screenRect.width) {
        screenRect = window.screen;
    }
    var screenWidth = Math.min(screenRect.height, screenRect.width);
    var screenHeight = Math.max(screenRect.width, screenRect.height);
    var rt = screenWidth / screenHeight;
    var stageWidth = container.getAttribute("data-content-width");
    var stageHeight = container.getAttribute("data-content-height");
    container.setAttribute("data-orientation", "portrait");
    if (rt > 0.75) {
        container.setAttribute("data-content-width", stageWidth);
        stageHeight = ((+stageWidth | 0) / rt) + "";
        container.setAttribute("data-content-height", stageHeight);
    }
};
(function () {
    gso.targetPlatform = gso.targetPlatform || "web" /* WEB */;
    function initSdk(cls) {
        gzyyou.sdk = new cls();
        if (gso.launcherReady) {
            ggo.startEgret();
        }
        gzyyou.sdk.startLogin();
    }
    gso.logList = {};
    gso.logList["load_arrive" /* ARRIVE */] = "\u6B63\u5728\u521D\u59CB\u5316\u6E38\u620F\u73AF\u5883" /* INIT_SDK */;
    ggo.loadVerbose("\u6B63\u5728\u521D\u59CB\u5316\u6E38\u620F\u73AF\u5883" /* INIT_SDK */);
    console.info("initSdk");
    if (gso.isShiguangSDK) {
        console.info("进入时光sdk流程，加载sdk");
        ggo.loadSingleScript("https://files.ddtxgame.com/h5sdk/sgh5sdk-v1.1.js", function () {
            console.info("时光sdk加载完毕");
            initSdk(gzyyou.ShiguangSDK);
        });
        return;
    }
    if (gso.is_innertest) {
        console.info("OuterNet");
        initSdk(gzyyou.OuterNet);
        return;
    }
    else { //if (gso.channel == CHANNEL_NAME.Test || window.location.href.indexOf("c2.") > -1 || gso.channel == "p1test") {
        console.info("TestSdkTools");
        if (gso.uid == "yys123456") {
            ggo.loadSingleScript("https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js", function () {
                initSdk(gzyyou.TestSdkTools);
                new window['VConsole']();
            });
        }
        else {
            initSdk(gzyyou.TestSdkTools);
        }
    }
})();
//import Handler = base.Handler;
/**时光sdk*/
gzyyou.ShiguangSDK = /** @class */ (function () {
    function SdkTools() {
        this._game_id = 5101; //时光分配的
        if (gso.uid && !gso.account) {
            gso.account = gso.uid;
        }
        if (gso.sign && !gso.token) {
            gso.token = gso.sign;
        }
        gso.apiHost = "https://p1-login.yiyou-game.com/";
        gso.targetPlatform = "shiguang.web" /* Shiguang */;
        console.info("ShiguangSDK");
    }
    SdkTools.prototype.startLogin = function () {
        ggo.loadVerbose("\u6B63\u5728\u83B7\u53D6\u8D26\u53F7\u4FE1\u606F" /* START_LOGIN */);
        console.info("startLogin");
        //游戏加载和sdk 服务器列表请求同时进行
        // if(gso.channel == CHANNEL_NAME.Test){
        //     //内网
        //     ggo.startGame();
        // }else {
        //外网
        this.getVersion();
        //}
        //this.apiLogin();
        var self = this;
        var callFunc = function (data) {
            console.info("登录回调 参数 data = " + JSON.stringify(data));
            gso.account = data.uid;
            gso.user_name = data.user_name;
            gso.token = data.token;
            gso.third_uid = data.third_uid;
            self.apiLogin();
        };
        var data = {
            game_id: this._game_id,
            callFunc: callFunc
        };
        //
        console.info("SgGameH5SDK.getLoginInfo");
        SgGameH5SDK.getLoginInfo(data);
    };
    SdkTools.prototype.getVersion = function () {
        console.info("getVersion");
        var apiUrl = gso.apiHost + gso.apiLoginMethod + "getversion/";
        var data = {
            channel: gso.channel
        };
        var self = this;
        ggo.webReqGet(apiUrl, data, function apiLoginSucc(res) {
            console.info("versionObj: " + JSON.stringify(res));
            gso.version = res.version;
            gso.phone_type = Number(res.phone_type) || 1;
            ggo.startGame();
        }, function () {
            console.error("getversion fail");
        });
    };
    SdkTools.prototype.apiLogin = function () {
        console.info("apiLogin");
        if (!gso.channel || !gso.account) {
            alert("\u542F\u52A8\u53C2\u6570\u9519\u8BEF" /* LAUNCH_VARS */ + "\n" + location.search);
            return;
        }
        ggo.loadVerbose("\u6B63\u5728\u521D\u59CB\u5316\u8D26\u53F7" /* API_LOGIN */);
        var data = {
            channel: gso.channel,
            gameid: gso.gameid,
            account: gso.account,
            token: gso.token,
            uid: gso.account,
            user_name: gso.user_name,
            third_uid: gso.third_uid
        };
        var apiUrl = gso.apiHost + gso.apiLoginMethod + "index/";
        if (gso.timestamp) {
            data.timestamp = gso.timestamp;
        }
        ggo.webReqGet(apiUrl, data, gzyyou.apiLoginSucc, gzyyou.apiLoginFail);
    };
    SdkTools.prototype.getNotice = function (cb) {
        var data = {
            pfrom_id: gso.pfrom_id
        };
        var apiUrl = gso.apiHost + "api/notice";
        ggo.webReqGet(apiUrl, data, cb);
    };
    SdkTools.prototype.getServerInfo = function (serverId, cb) {
        var data = {
            channel: gso.channel,
            jzsj_channel: gso.channel,
            account: gso.account,
            server_id: serverId,
        };
        var apiUrl = gso.apiHost + gso.apiLoginMethod + "login/";
        ggo.webReqGet(apiUrl, data, cb);
    };
    SdkTools.prototype.getServerList = function (cb) {
        var data = {
            channel: gso.channel,
            jzsj_channel: gso.channel,
            account: gso.account,
        };
        var apiUrl = gso.apiHost + gso.apiLoginMethod + "getServerList/";
        ggo.webReqGet(apiUrl, data, cb);
    };
    SdkTools.prototype.sdkPay = function (productId, price, extra, roleName, roleId, productName) {
        var obj = {
            'game_id': this._game_id,
            'uid': gso.account,
            'server_id': gso.serverId,
            'server_name': gso.serverName,
            'role_id': roleId,
            'role_name': roleName,
            'money': price,
            'product_id': productId,
            'product_name': productName,
            'product_desc': productName,
            'vip': gso.roleVipLv,
            'role_level': gso.roleLv,
            'ext': extra.join("|"),
        };
        SgGameH5SDK.pay(obj);
        return true;
    };
    SdkTools.prototype.loadReport = function (act) {
        var data_type = 0;
        if (act == "load_connect" /* START_CONNECT */) {
            //链接服务器
            data_type = 1;
        }
        else if (act == "s2c_create_role" /* S2C_CREATE_ROLE */) {
            //创建角色
            data_type = 2;
        }
        else if (act == "s2c_signin_account" /* S2C_ROLE_ENTER */) {
            //角色进入
            data_type = 3;
        }
        else if (act == "role_up" /* ROLE_UP */) {
            //游戏等级提示
            data_type = 4;
        }
        else if (act == "game_over" /* GAME_OVER */) {
            //退出游戏
            data_type = 5;
        }
        else if (act == "game_ext" /* GAME_EXT */) {
            //扩展字段
            data_type = 6;
        }
        if (0 < data_type && data_type <= 6) {
            console.info("loadReport act = " + act);
            console.info("loadReport data_type = " + data_type);
            var self_1 = this;
            base.delayCall(base.Handler.alloc(this, function () {
                self_1.reportSDKData(data_type);
            }), 30000);
        }
        if (!gso.isNew || !gso.report_url || gso.report_url === "") {
            return;
        }
        var data = [gso.pfrom_id, gso.serverId.toString(), gso.account, "enter_game", act, 1, "", gso.client_ip, "", gso.jzsj_channel]; // 扩展字段、时间留空
        var obj = { counter: "load", key: "xcjkjkkaskd", data: data.join("|"), env: "dev" };
        ggo.webReqGet(gso.report_url, obj);
    };
    SdkTools.prototype.reportSDKData = function (data_type) {
        var signStr = data_type + gso.account + gso.serverId + gso.roleId + gso.roleVipLv + gso.roleLv + gso.rolePower + "e874750ac0d06869fe4e21d5e51b5d2d";
        console.info("签名前 signStr=" + signStr);
        var sign = game.Md5Tool.ins().hex_md5(signStr);
        console.info("签名后 sign=" + sign);
        var obj = {
            'data_type': data_type,
            'uid': gso.account,
            'server_id': gso.serverId,
            'server_name': gso.serverName,
            'role_id': gso.roleId,
            'role_name': gso.roleName,
            'money_num': gso.roleMoney,
            'vip': gso.roleVipLv,
            'role_level': gso.roleLv,
            'role_power': gso.rolePower,
            'role_create': gso.createTime,
            'red_extension': {},
            'sign': sign,
        };
        SgGameH5SDK.roleinfo(obj);
    };
    SdkTools.prototype.checkCanPay = function () {
        //web版模似ios的情况
        console.info(egret.Capabilities.os + "--------------------");
        if (gso.ios_openpay == 0 && egret.Capabilities.os == "iOS") {
            return false;
        }
        return true;
    };
    SdkTools.prototype.getShareSource = function () {
        return { account: "123", serverId: 14, roleId: "adsfadsf" };
    };
    SdkTools.prototype.copyTextToClipboard = function (text) {
        try {
            var textArea = document.createElement("textarea");
            textArea.style.position = "fixed";
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.width = "2em";
            textArea.style.height = "2em";
            textArea.style.padding = "0";
            textArea.style.border = "none";
            textArea.style.outline = "none";
            textArea.style.boxShadow = "none";
            textArea.style.background = "transparent";
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            var successful = document.execCommand("copy");
            document.body.removeChild(textArea);
            return successful;
        }
        catch (err) {
        }
        return false;
    };
    SdkTools.prototype.uploadAuth = function (account, authId, name, cb) {
        var data = {
            action: "uploadAuth",
            account: account,
            identity: authId,
            name: name,
        };
        ggo.webReqGet("https://hlmc-loginaudit.hlmc.hainanliangang.com/", data, cb);
    };
    SdkTools.prototype.checkIsCurChannel = function (channel) {
        return channel == gso.source; //内网测试用source，channel的值为"test"
    };
    SdkTools.prototype.logout = function () {
        gzyyou.sdk.loadReport("s2c_create_role" /* S2C_CREATE_ROLE */);
        SgGameH5SDK.out_login();
    };
    return SdkTools;
}());
