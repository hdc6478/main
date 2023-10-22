(function (g: GameShareObject) {
    g.cdn_url = "";
    g.isReConnect = false;
    g.reconnectId = 0;
    g.isReload = false;
    g.apiLoginMethod = "login/";
    g.apiHost = g.apiHost || "//login-jzsj.gankh5.com/";

    let container = document.querySelectorAll(".egret-player")[0];
    g.contentWidth = +container.getAttribute("data-content-width");
    g.contentHeight = +container.getAttribute("data-content-height");

    if (location.search.length > 1) {
        for (let aItKey, nKeyId = 0, aCouples = location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
            //aItKey = aCouples[nKeyId]. split("=");
            //g[decodeURIComponent(aItKey[0])] = aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : "";
            let index = aCouples[nKeyId].indexOf("=");
            let key = aCouples[nKeyId].substr(0, index);
            let value = aCouples[nKeyId].substr(index + 1);
            g[decodeURIComponent(key)] = value ? decodeURIComponent(value) : "";
        }
    }

    let baseList = document.getElementsByTagName('base');
    if (baseList && baseList.length) {
        let base = baseList[0];
        let search = base.href.split("?")[1];
        for (let aItKey, nKeyId = 0, aCouples = search.split("&"); nKeyId < aCouples.length; nKeyId++) {
            aItKey = aCouples[nKeyId].split("=");
            g[decodeURIComponent(aItKey[0])] = aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : "";
        }
    }

    if (g.c_dbg === "1") {
        logger.setLv(6, "debug");
    }
    g.ua = (navigator && navigator.userAgent) ? navigator.userAgent : undefined;
    if (g.ua) {
        let uaLow = g.ua.toLowerCase();
        g.isPc = uaLow.indexOf("mobile") < 0 && uaLow.indexOf("android") < 0;
        g.isMicroMessenger = uaLow.indexOf("micromessenger") > -1;
        if (g.isMicroMessenger) {
            g.scaleTexture = 1.25;
        }
    }
    if (g.isPc) {
        try {
            g.worker = new Worker(URL.createObjectURL(new Blob(['var a = 0;b = function () {postMessage("");};onmessage = function (e) {clearInterval(a);if (e.data === "start") {a = setInterval(b, 60);}};'], {type: "text/javascript"})));
        } catch (e) {
            g.worker = undefined;
        }
    }
    g.bgImg = "{bgImgObj}";

})(typeof gso === "undefined" ? ((<any>window).gso = Object.create(null)) : gso);