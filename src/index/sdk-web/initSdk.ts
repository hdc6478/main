declare namespace gzyyou {
    let loginErrCnt: number;

    function apiLoginSucc(resp: any): void;

    function apiLoginFail(): void;

    function checkPortrait(): void;
}
gzyyou.loginErrCnt = 0;
gzyyou.apiLoginSucc = function (resp: any): void {
    gzyyou.loginErrCnt = 0;
    ggo.loadVerbose(LOADING_VERBOSE_MSG.API_LOGIN_SUCC);
    let k;
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
gzyyou.apiLoginFail = function (): void {
    gzyyou.loginErrCnt++;
    if (gzyyou.loginErrCnt > 3) {
        ggo.loadVerbose(LOADING_VERBOSE_MSG.API_LOGIN_FAIL);
        if (gso.isReload) {
            base.facade.sendNt(game.LauncherEvent.WEB_LOGIN_ERROR);
            return;
        }
        alert(LOADING_ERROR_MSG.API_LOGIN);
        return;
    }
    let id = setTimeout(() => {
        clearTimeout(id);
        gzyyou.sdk.startLogin();
    }, 900);
};
gzyyou.checkPortrait = function () {
    if (gso.isPc) {
        return
    }
    let container = document.querySelectorAll(".egret-player")[0];
    let screenRect: { width: number, height: number } = container.getBoundingClientRect();
    if (!screenRect.height || !screenRect.width) {
        screenRect = window.screen;
    }
    let screenWidth = Math.min(screenRect.height, screenRect.width);
    let screenHeight = Math.max(screenRect.width, screenRect.height);
    let rt = screenWidth / screenHeight;
    let stageWidth: string = container.getAttribute("data-content-width");
    let stageHeight: string = container.getAttribute("data-content-height");
    container.setAttribute("data-orientation", "portrait");
    if (rt > 0.75) {
        container.setAttribute("data-content-width", stageWidth);
        stageHeight = ((+stageWidth | 0) / rt) + "";
        container.setAttribute("data-content-height", stageHeight);
    }
};
(function () {
    gso.targetPlatform = gso.targetPlatform || TARGET_PLATFORM.WEB;

    function initSdk(cls: new () => gzyyou.Sdk) {
        gzyyou.sdk = new cls();
        if (gso.launcherReady) {
            ggo.startEgret();
        }
        gzyyou.sdk.startLogin();
    }

    gso.logList = {};
    gso.logList[REPORT_LOAD.ARRIVE] = LOADING_VERBOSE_MSG.INIT_SDK;
    ggo.loadVerbose(LOADING_VERBOSE_MSG.INIT_SDK);
    console.info("initSdk");

    if(gso.isShiguangSDK){
        console.info("进入时光sdk流程，加载sdk");
        ggo.loadSingleScript("https://files.ddtxgame.com/h5sdk/sgh5sdk-v1.1.js", function () {
            console.info("时光sdk加载完毕");
            initSdk(gzyyou.ShiguangSDK);
        });
        return ;
    }

    if (gso.is_innertest) {
        console.info("OuterNet");
        initSdk(gzyyou.OuterNet);
        return;
    } else { //if (gso.channel == CHANNEL_NAME.Test || window.location.href.indexOf("c2.") > -1 || gso.channel == "p1test") {
        console.info("TestSdkTools");
       if(gso.uid== "yys123456"){
           ggo.loadSingleScript("https://cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js", function () {
               initSdk(gzyyou.TestSdkTools);
               new window['VConsole']();
           });
       }else{
           initSdk(gzyyou.TestSdkTools);
       }
    }
})();