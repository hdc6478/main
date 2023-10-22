declare namespace gzyyou {
    export let OuterNet: new () => Sdk;
}
/**小游戏内部登陆*/
gzyyou.OuterNet = class SdkTools implements gzyyou.Sdk {
    cacheQQPlayerRankInfo(lv: number, cb?: (obj: any) => void): void {
    }

    getQQPlayerRankInfo(cb: (obj: any) => void): void {
    }
    public loginErrCnt: number = 0;
    public getOrderCnt: number = 0;

    channel: string;

    constructor() {
        gso.dbg_all_win = 1;

        gso.scaleTexture = 1.25;
        gso.gcInterval = 123000;
        gso.releaseImgTime = 3000;
        gso.uiShowDelay = 500;
        gso.Pool_Unused_T = 9000;

        gso.zipCfg = false;
        gso.targetPlatform = TARGET_PLATFORM.DYB_QQ;
        gso.apiLoginMethod = "login/";
        gso.apiHost = "https://login-ljtx.1y-game.com/";
        gso.report_url = "https://report-ljtx.1y-game.com/report/";
        this.channel = gso.channel;
        switch (this.channel) {
            case CHANNEL_NAME.SHENGYE:
            case CHANNEL_NAME.SHENGYEAUDIT:
            case CHANNEL_NAME.SHENGYE_SHIPIN:
                gso.isWeixin = true;
                gso.targetPlatform = TARGET_PLATFORM.GANK_WX;
                console.info("outer_net 赋值targetPlatform",gso.targetPlatform);
                break;
            case CHANNEL_NAME.LUODUN:
                gso.targetPlatform = null;
                break;
            case CHANNEL_NAME.FuyaoWeixin:
            case CHANNEL_NAME.FuyaoWeixinAudit:
            case CHANNEL_NAME.FuyaoWeixinShipin:
            case CHANNEL_NAME.FuyaoWeixinTest:
                gso.isFuyaoWeixin = true;
                gso.targetPlatform = TARGET_PLATFORM.FuyaoWeixin;
                break;
            case CHANNEL_NAME.QQ_HALL:
            case CHANNEL_NAME.QQ_HALL2:
                gso.targetPlatform = TARGET_PLATFORM.WEB;
                break;
            case CHANNEL_NAME.WANJIAN_SHOUQ:
            case CHANNEL_NAME.WANJIANAUDIT_SHOUQ:
            case CHANNEL_NAME.WANJIANTEST_SHOUQ:
                gso.isShouq = true;
                gso.isWanjianShouq = true;
                gso.targetPlatform = TARGET_PLATFORM.WANJIAN_QQ;
                break;
        }
    }

    checkIsCurChannel(channel: string): boolean {
        return channel == this.channel;
    }

    startLogin() {
        ggo.loadVerbose(LOADING_VERBOSE_MSG.START_LOGIN);
        this.apiLogin();
    }

    getNotice(cb: (obj: any) => void): void {
        let data: any = {
            pfrom_id: gso.pfrom_id
        };
        ggo.webReqGet(gso.apiHost + "api/notice", data, cb);
    }

    apiLogin() {
        console.info("......正在初始化账号......111");
        ggo.loadVerbose(LOADING_VERBOSE_MSG.API_LOGIN);
        let data: any = {
            gameid: gso.gameid,
            account: gso.account,
            token: gso.token,
            channel: gso.channel,
            code_version: gso.code_version,
        };

        let apiUrl = gso.apiHost + gso.apiLoginMethod + "index/";
        console.info(".......test...............");
        // gAlert("...apiLogin... "+apiUrl);
        ggo.webReqGet(apiUrl, data, gzyyou.apiLoginSucc, gzyyou.apiLoginFail);
    }

    getServerInfo(serverId: number, cb: (obj: any) => void): void {
        let data: any = {
            channel: gso.channel,
            account: gso.account,
            server_id: serverId,
            code_version: gso.code_version,
        };
        ggo.webReqGet(gso.apiHost + gso.apiLoginMethod + "login/", data, cb);
    }

    getServerList(cb: (obj: any) => void): void {
        let data: any = {
            channel: gso.channel,
            account: gso.account,
            code_version: gso.code_version,
        };
        ggo.webReqGet(gso.apiHost + gso.apiLoginMethod + "getServerList/", data, cb);
    }

    sdkPay(productId: number, price: number, extra: string[], roleName: string, roleId: string, productName: string): boolean {
        return true;
    }

    loadReport(act: string): void {
    }

    logout(): void {
    }

    reportUseInfo(lv: number, power: number, roleName: string, vip: number, roleId: string): void {
    }

    pointReport(type: number, level: number, roleId?: string, roleName?: string, vip?: number, money?: string
        , updateTime?: number, createTime?: number, power?: number): void {
    }

    getShareSource(): { account: string; serverId: number; roleId: string } | null {
        return null;
    }

    copyTextToClipboard(text: string): boolean {
        try {
            let textArea = document.createElement("textarea");
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
            let successful = document.execCommand("copy");
            document.body.removeChild(textArea);
            return successful;
        } catch (err) {
        }
        return false;
    }
};