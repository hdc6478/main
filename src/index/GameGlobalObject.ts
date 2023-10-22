interface GameGlobalObject {
    getXhr(onSuccess?: (resp: any) => void, onFail?: () => void): XMLHttpRequest;

    startEgret(): void;
}

(function (g: GameGlobalObject): void { // 接口实现
    g.loadVerbose = g.loadVerbose || function (msg: string): void {
    };
    g.removeVerbose = g.removeVerbose || function (): void {
    };
    g.myPolicy = g.myPolicy || function (src, w, h): void {
            var div = document.getElementById('myPolicyDiv');
            if(div) return;

            var w1 = document.body.clientWidth * 0.9;
            var h1 = document.body.clientHeight * 0.9;
            if(w > 0){
                //w1 = w;
                w1 = Math.min(w1, w);
            }
            if(h > 0) {
                //h1 = h;
                h1 = Math.min(h1, h);
            }

            div = document.createElement('div');
            div.id = "myPolicyDiv";
            // div.style = "position:absolute;  width:"+(w1+30)+"px; height:"+(h1+30)+"px; margin: auto; top: 0; left: 0; right: 0; bottom: 0;";
            div.setAttribute("style", "position:absolute;  width:"+(w1+30)+"px; height:"+(h1+30)+"px; margin: auto; top: 0; left: 0; right: 0; bottom: 0;");
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

    }
    g.loadLauncher = g.loadLauncher || function (): void {
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
            let loading = document.getElementById("loading");
            if (loading) {
                loading.parentNode.removeChild(loading);
            }
        });
    };
    g.startGame = g.startGame || function (): void {
        gso.apiReady = true;
        if (typeof g.onApiReady === "function") {
            g.onApiReady();
        }
    };
    g.loadLogin = g.loadLogin || function (src: string, onComplete: (data:any,url:string) => void): void {
        g.loadSingleScript(src, onComplete);
    };
    g.inflate = g.inflate || function (buffer: ArrayBuffer): Uint8Array {
        return null;
        // return (new Zlib.Inflate(new Uint8Array(buffer))).decompress();
    };
    g.reconnect = g.reconnect || function (server_id: number): void {
        gso.lastVersion = gso.version;
        gso.isReConnect = server_id !== 0;
        gso.reconnectId = server_id;
        gso.isReload = true;
        gso.apiReady = false;
        gzyyou.sdk.startLogin();
    };
    g.webReqGet = g.webReqGet || function (url: string, data?: any, onSuccess?: (resp: any) => void, onFail?: () => void): void {
        let reqUrl: string = url + g.encodeUriData(data);
        let xhr: XMLHttpRequest = g.getXhr(onSuccess, onFail);
        xhr.open("GET", reqUrl);
        xhr.responseType = "text";
        xhr.send();
    };
    g.webReqPost = g.webReqPost || function (url: string, data?: any, onSuccess?: (resp: any) => void, onFail?: () => void): void {
        let xhr: XMLHttpRequest = g.getXhr(onSuccess, onFail);
        xhr.open("POST", url);
        xhr.responseType = "text";
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    };
    g.loadScript = g.loadScript || function (onProgress: (prog: number) => void, onComplete: (data:any,url:string) => void): void {
        let list = gso.scriptList;
        if (!list || !list.length) {
            onProgress(100);
            onComplete(null,"gso.scriptLit");
            return;
        }
        let count = 0;
        let total = list.length;
        let loadComplete = function () {
            count++;
            onProgress(Math.floor(count / total * 100));
            if (count === total) {
                onComplete(null,"gso.scriptList");
            }
        };
        let loadNext = () => {
            let str = list.shift();
            if (str) {
                g.loadSingleScript(str, loadComplete);
            }
            if (!list.length) {
                clearInterval(id);
            }
        };
        loadNext();
        let id = setInterval(loadNext, 180);
    };
    g.encodeUriData = g.encodeUriData || function (data: any): string {
        let list = [];
        for (let k in data) {
            if (!data.hasOwnProperty(k)) {
                continue;
            }
            let v = data[k];
            if (typeof v === "undefined" || typeof v === "function") {
                continue;
            }
            list.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return list.length ? ("?" + list.join("&")) : "";
    };
})(typeof ggo === "undefined" ? ((<any>window).ggo = Object.create(null)) : ggo);

(function (g: GameGlobalObject) {
    g.getXhr = g.getXhr || function (onSuccess?: (resp: any) => void, onFail?: () => void) {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
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
                let resp: any = null;
                try {
                    resp = JSON.parse(xhr.response);
                } catch (e) {
                    resp = xhr.response;
                }
                setTimeout(() => onSuccess(resp), 0);
            }
        };
        xhr.ontimeout = () => {
            xhr.onreadystatechange = null;
            xhr.ontimeout = null;
            if (typeof onFail === "function") {
                setTimeout(onFail, 0);
            }
        };
        return xhr;
    };
    g.loadSingleScript = g.loadSingleScript || function (src: string, callback: (data:any,url:string) => void, errCnt?: number): void {
        let s: HTMLScriptElement = document.createElement("script");
        s.async = false;
        s.src = src;
        errCnt = +errCnt | 0;
        let ondone = function () {
            s.parentNode.removeChild(s);
            s.onload = s.onerror = null;
        };
        s.onload = function () {
            ondone();
            if (typeof callback === "function") {
                let id = setTimeout(function () {
                    clearTimeout(id);
                    callback(src,src);
                }, 10);
            }
        };
        s.onerror = function () {
            ondone();
            errCnt++;
            if (errCnt > 10) {
                console.error("script load error:" + src.split("?")[0]);
                alert(LOADING_ERROR_MSG.LOAD_SCRIPT);
                return;
            }
            let id = setTimeout(function () {
                clearTimeout(id);
                if ((/\?/i).test(src)) {
                    src = src + "1";
                } else {
                    src = src + "?1";
                }
                g.loadSingleScript(src, callback, errCnt);
            }, 10);
        };
        document.body.appendChild(s);
    };
    g.checkVersion = g.checkVersion || function (v: string | number): string | number {
        if (!v) {
            v = "{latestVer}";
        }
        return v;
    };

    function initLifeCycle() {
        let LifecycleContext = egret.lifecycle.LifecycleContext.prototype;
        let pause = LifecycleContext.pause, resume = LifecycleContext.resume;
        let hiddenKey: string, hidden: boolean = false;
        let keys: string[] = ["hidden", "mozHidden", "msHidden", "webkitHidden", "oHidden"];
        for (let k of keys) {
            if (typeof document[k] !== "undefined") {
                hiddenKey = k;
                break;
            }
        }
        let onStateChanged = (state: boolean) => {
            let h: boolean;
            if (!hiddenKey) {
                h = state === false;
            } else {
                h = document[hiddenKey];
            }
            if (hidden === h) {
                return;
            }
            hidden = h;
            if (h) {
                pause();
            } else {
                resume();
            }
        };
        LifecycleContext.pause = () => onStateChanged(true);
        LifecycleContext.resume = () => onStateChanged(false);
    }

    function initWebRequest(web: any) {
        let webAudioSound = web.WebAudioSound.prototype;
        webAudioSound.load = function (url: string) {
            let self = this;
            self.url = url;
            if (!url) {
                return;
            }
            let request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
            request.addEventListener("load", function () {
                let ioError = (request.status >= 400 || request.status == 0);
                if (ioError) {
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, {code: request.status});
                } else {
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
                self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, {errMsg: "time out"});
            });
            request.timeout = 8000;
            request.send();

            function onAudioLoaded(): void {
                self.loaded = true;
                self.dispatchEventWith(egret.Event.COMPLETE);
            }

            function onAudioError(): void {
                game.SoundMgr.ins.enableSound(false);
                self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, {errMsg: "WebAudioDecode error"});
            }
        };

        let htmlSound = web.HtmlSound.prototype;
        htmlSound.load = function (url: string): void {
            let self = this;
            self.url = url;
            if (!url) {
                return;
            }
            let audio = new Audio(url);
            audio.addEventListener("canplaythrough", onAudioLoaded);
            audio.addEventListener("error", onAudioError);
            let ua: string = navigator.userAgent.toLowerCase();
            if (ua.indexOf("firefox") >= 0) {//火狐兼容
                audio.autoplay = !0;
                audio.muted = true;
            }
            //edge and ie11
            let ie = ua.indexOf("edge") >= 0 || ua.indexOf("trident") >= 0;
            if (ie) {
                document.body.appendChild(audio);
            }
            audio.load();
            self.originAudio = audio;
            if (web.HtmlSound.clearAudios[self.url]) {
                delete web.HtmlSound.clearAudios[self.url];
            }

            function onAudioLoaded(): void {
                web.HtmlSound.$recycle(self.url, audio);
                removeListeners();
                if (ua.indexOf("firefox") >= 0) {//火狐兼容
                    audio.pause();
                    audio.muted = false;
                }
                if (ie) {
                    document.body.appendChild(audio);
                }
                self.loaded = true;
                self.dispatchEventWith(egret.Event.COMPLETE);
            }

            function onAudioError(): void {
                removeListeners();
                if (audio.networkState === 3) {
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, {errMsg: "audio.networkState === 3 NETWORK_NO_SOURCE"});
                }
            }

            function removeListeners(): void {
                audio.removeEventListener("canplaythrough", onAudioLoaded);
                audio.removeEventListener("error", onAudioError);
                if (ie) {
                    document.body.removeChild(audio);
                }
            }
        };

        let webHttpRequest = web.WebHttpRequest.prototype;
        let webHttpRequestOpen = webHttpRequest.open;
        webHttpRequest.open = function (data?: any) {
            if (!this.timeout) {
                this.timeout = 8000;
            }
            return webHttpRequestOpen.call(this, data);
        };
        webHttpRequest.onload = function (): void {
            let self = this;
            let status = self._xhr.status;
            setTimeout(function (): void {
                if (status >= 400) {//请求错误
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, {code: status});
                } else {
                    self.dispatchEventWith(egret.Event.COMPLETE);
                }
            }, 0);
        };
        webHttpRequest.onerror = function (): void {
            let self = this;
            setTimeout(function (): void {
                self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, {code: self._xhr.status});
            }, 0);
        };
        webHttpRequest.onTimeout = function (): void {
            this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, {errMsg: "time out"});
        };
        webHttpRequest.onReadyStateChange = function (): void {
            let self = this;
            let xhr = self._xhr;
            if (xhr.readyState == 4) {
                let ioError = (xhr.status >= 400 || xhr.status == 0);
                setTimeout(function (): void {
                    if (ioError) {
                        self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, {code: xhr.status});
                    } else {
                        self.dispatchEventWith(egret.Event.COMPLETE);
                    }
                }, 0);
            }
        };

        let webImageLoader = web.WebImageLoader.prototype;
        webImageLoader.onBlobError = function (event: egret.Event): void {
            let self = this;
            let data = event.data;
            setTimeout(function (): void {
                self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, data);
            }, 0);
            self.request = undefined;
        };
    }

    g.startEgret = function () {
        gso.launcherReady = false;
        initLifeCycle();
        initWebRequest((<any>egret).web);
        egret.runEgret(runEgretOptions);
    };
    g.os = function () {
        if (/(Android)/i.test(navigator.userAgent)) {
            return game.OsType.Android;
        } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            return game.OsType.Ios;
        } else {
            return game.OsType.Other;
        }
    };
})(ggo);
ggo.loadLauncher();