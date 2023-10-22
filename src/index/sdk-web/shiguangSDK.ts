//import Handler = base.Handler;


declare namespace gzyyou {
    export let ShiguangSDK: new () => Sdk;
}

declare let SgGameH5SDK:any;

/**时光sdk*/
gzyyou.ShiguangSDK = class SdkTools implements gzyyou.Sdk {


    private _game_id:number = 5101; //时光分配的


    constructor() {
        if (gso.uid && !gso.account) {
            gso.account = gso.uid;
        }
        if (gso.sign && !gso.token) {
            gso.token = gso.sign;
        }

        gso.apiHost = "https://p1-login.yiyou-game.com/";
        gso.targetPlatform = TARGET_PLATFORM.Shiguang;

        console.info("ShiguangSDK");
    }

    startLogin() {
        ggo.loadVerbose(LOADING_VERBOSE_MSG.START_LOGIN);
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

        let self = this;
        let callFunc = function (data:any) {
            console.info("登录回调 参数 data = "+JSON.stringify(data));
            gso.account = data.uid;
            gso.user_name = data.user_name;
            gso.token = data.token;
            gso.third_uid = data.third_uid;
            self.apiLogin();
        }
        let data = {
            game_id:this._game_id,
            callFunc:callFunc
        };
        //
        console.info("SgGameH5SDK.getLoginInfo");
        SgGameH5SDK.getLoginInfo(data);
    }


    getVersion():void{
        console.info("getVersion");
        let apiUrl = gso.apiHost + gso.apiLoginMethod + "getversion/";
        let data = {
            channel: gso.channel
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
            uid:gso.account,
            user_name:gso.user_name,
            third_uid:gso.third_uid
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

        let obj = {
            'game_id' : this._game_id, //游戏ID
            'uid' : gso.account, //时光⽤户ID
            'server_id' : gso.serverId, //游戏服ID
            'server_name' : gso.serverName, //游戏服名
            'role_id' : roleId, //游戏⻆⾊ID
            'role_name' : roleName, //游戏⻆⾊名
            'money' : price, //充值⾦额（元）
            'product_id' : productId, //商品ID
            'product_name' : productName, //商品名称
            'product_desc' : productName, //商品描述
            'vip' : gso.roleVipLv, //vip等级
            'role_level' : gso.roleLv, //游戏⻆⾊等级
            'ext':  extra.join("|"), //其他信息
        };

        SgGameH5SDK.pay(obj);
        return true;
    }

    loadReport(act: string): void {

        let data_type = 0;
        if (act == REPORT_LOAD.START_CONNECT) {
            //链接服务器
            data_type = 1;
        } else if (act == REPORT_LOAD.S2C_CREATE_ROLE){
            //创建角色
            data_type = 2;
        }else if(act == REPORT_LOAD.S2C_ROLE_ENTER){
            //角色进入
            data_type = 3;
        }else if(act == REPORT_LOAD.ROLE_UP){
            //游戏等级提示
            data_type = 4;
        }else if(act == REPORT_LOAD.GAME_OVER){
            //退出游戏
            data_type = 5;
        }else if(act == REPORT_LOAD.GAME_EXT){
            //扩展字段
            data_type = 6;
        }


        if(0 < data_type && data_type <= 6){
            console.info("loadReport act = "+act);
            console.info("loadReport data_type = "+data_type);
            let self = this;
            base.delayCall(base.Handler.alloc(this, () => {
                 self.reportSDKData(data_type);
            }), 30000);
        }

        if (!gso.isNew || !gso.report_url || gso.report_url === "") {
            return;
        }
        let data = [gso.pfrom_id, gso.serverId.toString(), gso.account, "enter_game", act, 1, "", gso.client_ip, "", gso.jzsj_channel]; // 扩展字段、时间留空
        let obj = {counter: "load", key: "xcjkjkkaskd", data: data.join("|"), env: "dev"};
        ggo.webReqGet(gso.report_url, obj);
    }

    private reportSDKData(data_type:number):void{
        let signStr = data_type+gso.account+gso.serverId+ gso.roleId+gso.roleVipLv+gso.roleLv+gso.rolePower+"e874750ac0d06869fe4e21d5e51b5d2d";
        console.info("签名前 signStr="+signStr);
        let sign = game.Md5Tool.ins().hex_md5(signStr);
        console.info("签名后 sign="+sign);
        let obj = {
            'data_type' : data_type, //1选择服务器2创建⻆⾊3进⼊游戏4等级提升5退出游戏6扩展事件
            'uid' : gso.account, //时光⽤户ID
            'server_id' : gso.serverId, //游戏服ID
            'server_name' : gso.serverName, //游戏服名
            'role_id' : gso.roleId, //游戏⻆⾊ID
            'role_name' : gso.roleName, //游戏⻆⾊名
            'money_num' : gso.roleMoney,//gso.roleMoney, //⻆⾊背包⾦币
            'vip' : gso.roleVipLv, //vip等级vip等级
            'role_level' : gso.roleLv, //游戏⻆⾊等级
            'role_power' : gso.rolePower, //游戏⻆⾊战⼒值
            'role_create' : gso.createTime, //⻆⾊创⻆时间(秒)
            'red_extension' : {}, //扩展事件参数
            'sign' : sign, //签名，加密⽅法如下
        };
        SgGameH5SDK.roleinfo(obj);
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
        gzyyou.sdk.loadReport(REPORT_LOAD.S2C_CREATE_ROLE);
        SgGameH5SDK.out_login();
    }

}