Object.defineProperty(egret.sys.SystemTicker.prototype, "fSTime", {
    get: function () {
        return this.m_fSTime;
    },
    set: function (value) {
        this.m_fSTime = value;
    },
    enumerable: true,
    configurable: true
});
//let update = egret.sys.SystemTicker.prototype.update;
// @ts-ignore
var newCount = 0;
// @ts-ignore
var frameCount = 0;
// @ts-ignore
var checkCountFrame = 60;
egret["curFrameNewObjs"] = {};
egret.sys.SystemTicker.prototype.update = function (forceUpdate) {
    if (frameCount == 0 || frameCount >= checkCountFrame) {
        egret["curFrameNewObjs"] = {};
        newCount = egret.$hashCount;
        frameCount = 0;
    }
    frameCount++;
    this.fSTime = egret.getTimer();
    var t1 = egret.getTimer();
    // @ts-ignore
    var callBackList = this.callBackList;
    // @ts-ignore
    var thisObjectList = this.thisObjectList;
    var length = callBackList.length;
    var requestRenderingFlag = egret.sys.$requestRenderingFlag;
    var timeStamp = egret.getTimer();
    var contexts = egret.lifecycle.contexts;
    for (var _i = 0, contexts_1 = contexts; _i < contexts_1.length; _i++) {
        var c = contexts_1[_i];
        if (c.onUpdate) {
            c.onUpdate();
        }
    }
    // @ts-ignore
    if (this.isPaused) {
        // @ts-ignore
        this.lastTimeStamp = timeStamp;
        return;
    }
    // @ts-ignore
    this.callLaterAsyncs();
    for (var i = 0; i < length; i++) {
        if (callBackList[i].call(thisObjectList[i], timeStamp)) {
            requestRenderingFlag = true;
        }
    }
    var t2 = egret.getTimer();
    // @ts-ignore
    var deltaTime = timeStamp - this.lastTimeStamp;
    // @ts-ignore
    this.lastTimeStamp = timeStamp;
    // @ts-ignore
    if (deltaTime >= this.frameDeltaTime || forceUpdate) {
        // @ts-ignore
        this.lastCount = this.frameInterval;
    }
    else {
        // @ts-ignore
        this.lastCount -= 1000;
        // @ts-ignore
        if (this.lastCount > 0) {
            if (requestRenderingFlag) {
                // @ts-ignore
                this.render(false, this.costEnterFrame + t2 - t1);
            }
            return;
        }
        // @ts-ignore
        this.lastCount += this.frameInterval;
    }
    // @ts-ignore
    this.render(true, this.costEnterFrame + t2 - t1);
    var t3 = egret.getTimer();
    // @ts-ignore
    this.broadcastEnterFrame();
    var t4 = egret.getTimer();
    // @ts-ignore
    this.costEnterFrame = t4 - t3;
    if (egret.$hashCount - newCount > 200) {
        var max = 0;
        var maxKey = "";
        for (var k in egret["curFrameNewObjs"]) {
            var m = +egret["curFrameNewObjs"][k];
            if (m > max) {
                max = m;
                maxKey = k;
            }
        }
        //console.error(maxKey + " new "+ max);
    }
};
//# sourceMappingURL=egretEx.js.map