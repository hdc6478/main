
declare namespace gzyyou {
    export let TestSdkTools: new () => Sdk;
}

/**内网测试服*/
gzyyou.TestSdkTools = class SdkTools implements gzyyou.Sdk {
    constructor() {
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

    startLogin() {
        ggo.loadVerbose(LOADING_VERBOSE_MSG.START_LOGIN);

        console.info("startLogin");
        //游戏加载和sdk 服务器列表请求同时进行
        if(gso.channel == CHANNEL_NAME.Test){
            //内网
            ggo.startGame();
         }else {
             //外网
             this.getVersion();
         }
        this.apiLogin();
    }

    getVersion():void{

        console.info("getVersion");

        let apiUrl = gso.apiHost + gso.apiLoginMethod + "getversion/";
        let data = {
            channel: gso.channel,
            is_admin:gso.is_admin
        };

        let  self = this;
        ggo.webReqGet(apiUrl, data,function apiLoginSucc(res:any){
            console.info("versionObj: "+JSON.stringify(res));
            gso.version = res.version;
            gso.phone_type = Number(res.phone_type) || 1;
            ggo.startGame();
        },function () {
            console.error("getversion fail");
        });
    }

    apiLogin() {
        console.info("apiLogin");
        if (!gso.channel || !gso.account) {
            alert(LOADING_ERROR_MSG.LAUNCH_VARS + "\n" + location.search);
            return;
        }
        ggo.loadVerbose(LOADING_VERBOSE_MSG.API_LOGIN);
        let data: any = {
            channel: gso.channel,
            gameid: gso.gameid,
            account: gso.account,
            token: gso.token,
            is_admin:gso.is_admin
        };

        let apiUrl = gso.apiHost + gso.apiLoginMethod + "index/";
        if (gso.timestamp) {
            data.timestamp = gso.timestamp;
        }
        ggo.webReqGet(apiUrl, data, gzyyou.apiLoginSucc, gzyyou.apiLoginFail);
    }

    getNotice(cb: (obj: any) => void): void {
        let data: any = {
            pfrom_id: gso.pfrom_id
        };
        let apiUrl = gso.apiHost + "api/notice";
        ggo.webReqGet(apiUrl, data, cb);
    }

    getServerInfo(serverId: number, cb: (obj: any) => void): void {
        let data: any = {
            channel: gso.channel,
            jzsj_channel: gso.channel,
            account: gso.account,
            server_id: serverId,
        };
        let apiUrl = gso.apiHost + gso.apiLoginMethod + "login/";
        ggo.webReqGet(apiUrl, data, cb);
    }

    getServerList(cb: (obj: any) => void): void {
        let data: any = {
            channel: gso.channel,
            jzsj_channel: gso.channel,
            account: gso.account,
        };
        let apiUrl = gso.apiHost + gso.apiLoginMethod + "getServerList/";
        ggo.webReqGet(apiUrl, data, cb);
    }

    sdkPay(productId: number, price: number, extra: string[], roleName: string, roleId: string, productName: string): boolean {
        return false;
    }

    loadReport(act: string): void {
        if (!gso.isNew || !gso.report_url || gso.report_url === "") {
            return;
        }
        let data = [gso.pfrom_id, gso.serverId.toString(), gso.account, "enter_game", act, 1, "", gso.client_ip, "", gso.jzsj_channel]; // 扩展字段、时间留空
        let obj = {counter: "load", key: "xcjkjkkaskd", data: data.join("|"), env: "dev"};
        ggo.webReqGet(gso.report_url, obj);
    }

    checkCanPay() {
        //web版模似ios的情况
        console.info(egret.Capabilities.os + "--------------------")
        if(gso.ios_openpay == 0 && egret.Capabilities.os == "iOS"){
            return false;
        }
        return true;
    }

    getShareSource(): { account: string; serverId: number; roleId: string } | null {
        return {account: "123", serverId: 14, roleId: "adsfadsf"};
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

    uploadAuth(account: string, authId: string, name: string, cb?: (obj: any) => void): void {
        let data: any = {
            action: "uploadAuth",
            account: account,
            identity: authId,
            name: name,
        };
        ggo.webReqGet("https://hlmc-loginaudit.hlmc.hainanliangang.com/", data, cb);
    }

    checkIsCurChannel(channel: string): boolean {
        return channel == gso.source;//内网测试用source，channel的值为"test"
    }


    logout(): void {

    }

}