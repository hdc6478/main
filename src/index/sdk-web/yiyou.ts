declare namespace gzyyou {
    export let YiYouSdkTools: new () => Sdk;
}

declare interface UserInfo {
    account: string;
    appid: number;
    channel: string;
    channelName: string;
    extinfo: any;
    isLogin: any;
    reurl: string;
    sid: number;
    sign: string;
    time: number;
}

declare interface OrderInfo {
    server_id: number;           //区服id,
    amount: number;              //订单金额
    extra: string;               //游戏透传,
    role_id: string;             //角色id,
    role_name: string;           //角色名,
    level: number;               //等级,
    uid: string;                 //用户id,
    goods_name: string;          //商品名,
    goods_id: string;            //商品id
    server_name: string           //区服名
}

declare interface RoleInfo {
    type: string;               //进入游戏页面("load")，首次登陆创角("create")，角色登陆("login")，角色升级("levelup")
    user_id: string;            //用户id,
    role_id: string;            //角色id,
    role_name: string;          //角色名,
    level: string;              //等级,
    server_id: string;          //区服id,
    server_name: string;        //区服名,
    vip_level: string;          //vip等级,
    create_time: number;        //创角时间,
    zhuan_sheng: number;        //转生
    power: string;              //战力
}

/**通用web登陆*/
gzyyou.YiYouSdkTools = class SdkTools implements gzyyou.Sdk {
    cacheQQPlayerRankInfo(lv: number, cb?: (obj: any) => void): void {
    }

    getQQPlayerRankInfo(cb: (obj: any) => void): void {
    }
    private intervalKey: number;

    /**角色上报数据时，使用md5加密的渠道*/
    private md5_channel: string[] = [CHANNEL_NAME.Yhxxl_4399, CHANNEL_NAME.Yhxxl_360, CHANNEL_NAME.Yhxxl_momo, CHANNEL_NAME.Yhxxl_cw];
    private login_key: {[key: string] : string} = {
        [CHANNEL_NAME.Yhxxl_4399] : "41423796dbfc33652a26cb2dfd5f4474",
        [CHANNEL_NAME.Yhxxl_360] : "12531844e6d9583c9eb3babb7f1b2a92",
        [CHANNEL_NAME.Yhxxl_momo] : "602d01e066ffd37e72e20bff6340230c",
        [CHANNEL_NAME.Yhxxl_cw] : "3cc42f7c486f9851e35ab61483b3b0a4",
    }

    constructor() {
        if (egret.Capabilities.os == "iOS" || egret.Capabilities.os == "Mac OS") {
            gso.isIosSys = true;
        }
        gso.dbg_all_win = 1;//爱微游疯狂渠道全屏
        gzyyou.loginErrCnt = 0;
        this.checkAdaptive();
        this.intervalKey = setInterval(this.heartbeat, 1000);
    }

    private heartbeat() {
        if (yiyou && yiyou.heartbeat) {
            yiyou.heartbeat();
        }
    }

    private checkAdaptive() {
        if (this.isH5()) return;
        // let w = screen.width;
        // let h = screen.height;
        // let r = window.devicePixelRatio;
        // if ((w === 375 || w === 414)
        //     && (h === 812 || h === 896)
        //     && (r === 3 || r === 2)) {
        //     gso.mainTop = 52;
        //     gso.mainBottom = 44;
        // }
    }

    isH5() {
        return true;
    }

    startLogin(): void {
        console.info(".............yiyou.............1111");
        gso.logList[REPORT_LOAD.API_LOGIN] = LOADING_VERBOSE_MSG.START_LOGIN;
        ggo.loadVerbose(LOADING_VERBOSE_MSG.START_LOGIN);
        this.apiLogin()
    }

    /** 获取用户信息 */
    apiLogin(): void {
        yiyou.init((state) => {
            if (state) {
                gzyyou.loginErrCnt = 0;
                ggo.loadVerbose(LOADING_VERBOSE_MSG.API_LOGIN_SUCC);
                gso.logList[REPORT_LOAD.API_LOGIN + "1"] = LOADING_VERBOSE_MSG.API_LOGIN_SUCC;
                let k;
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
            } else {
                // gAlert("获取用户信息...2");
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
                }, 1000);
            }
        })
    }

    /**
     * 复制文本到夹板
     * @param text
     */
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
            console.error(`复制失败：${err}`);
        }
        return false;
    }

    getNotice(cb: (obj: any) => void): void {
        let data = {
            agent: gso.pfrom_name
        }
        let apiUrl = "//login-ljtx.1y-game.com/api/notice";
        ggo.webReqGet(apiUrl, data, cb);
    }

    getServerInfo(serverId: number, cb: (obj: any) => void): void {
        yiyou.getLoginInfo(serverId, cb);
    }

    getServerList(cb: (obj: any) => void): void {
        yiyou.getServerList(cb);
    }

    loadReport(act: string): void {
        if (!gso.isNew || !gso.report_url) {
            return;
        }
        let data = [gso.pfrom_id, gso.serverId.toString(), gso.account, "enter_game", act, 1, "", gso.client_ip, Math.floor(Date.now() / 1000), gso.channel]; // 扩展字段、时间留空
        let obj = {counter: "load", key: "xcjkjkkaskd", data: data.join("|"), env: "dev"};
        ggo.webReqGet(gso.report_url, obj);
    }

    logout(): void {
    }

    pointReport(type: number, level: number, roleId?: string, roleName?: string, vip?: number, money?: string
        , updateTime?: number, createTime?: number, oldServerId?: number, oldServerName?: string
        , lastLvUpTime?: number, power?: string): void {
        if (this.isHuiDu() || gso.is_admin == 1) {
            return;
        }
        let t: string;
        switch (type) {
            case RoleInfoType.Select:
                t = "load";
                break;
            case RoleInfoType.Create:
                t = "create";
                break;
            case RoleInfoType.Enter:
                t = "login";
                break;
            case RoleInfoType.LvUp:
                t = "levelup";
                break;
        }
        if (!t) return;
        let vipLv = vip ? vip.toString() : "0";
        let roleTransLevel = gso.roleChangeLv ? gso.roleChangeLv : 0;
        if(this.md5_channel.indexOf(gso.channel) > -1){
            /**使用md5加密的渠道*/
            if(!window["ASGD"] || !window["ASGD"].onUserInfo){
                return;
            }
            let loginkey = this.login_key[gso.channel];
            let signStr = "appID=" + gso.app_id +"createTime=" + createTime + "power=" + gso.rolePower + "roleID=" + roleId + "roleLevel=" + level +
                "roleName=" + roleName + "roleTransLevel=" + roleTransLevel + "serverID=" + gso.serverId + "serverName=" + gso.serverName + "userID=" + gso.account +
                "vip=" + vipLv + loginkey;
            let sign = game.Md5Tool.ins().hex_md5(signStr);
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
        let data: RoleInfo = {
            type: t,
            user_id: gso.account,
            role_id: roleId,
            role_name: roleName,
            level: level.toString(),
            server_id: gso.serverId.toString(),
            server_name: gso.serverName,
            vip_level: vipLv,
            create_time: createTime,
            zhuan_sheng:  roleTransLevel,
            power: gso.rolePower
        };
        yiyou.roleUpdate(data, (obj) => {

        });
    }

    reportUseInfo(lv: number, power: number, roleName: string, vip: number, roleId: string): void {

    }


    sdkPay(productId: number, price: number, extra: string[], roleName: string, roleId: string, productName: string): boolean {
        if (this.isHuiDu() || gso.is_admin == 1) {
            return false;
        }
        // base.facade.sendNt("get_order_start");
        let extraStr = extra.join("|");
        let cfg: any = game.getConfigByNameId(game.ConfigName.ProductId, productId);
        let goods_id = gso.source == CHANNEL_NAME.AWY ? cfg.yhxxl_yy_id : cfg.product_id;//爱微游专属id
        let data: OrderInfo = {
            server_id: gso.serverId,
            server_name: gso.serverName,
            amount: price * 100,
            extra: extraStr,
            role_id: roleId,
            role_name: roleName,
            level: gso.roleLv,
            uid: gso.account,
            goods_name: productName,
            goods_id: goods_id,//商品ID
        }
        yiyou.getPay(data, () => {
            // base.facade.sendNt("get_order_end");
        })
        return true;
    }

    /** 是否有分享按钮 */
    isHasShare() {
        return yiyou.hasShare && yiyou.hasShare();
    }

    /** 点击分享按钮 */
    onClickShare() {
        return yiyou.onShare && yiyou.onShare();
    }

    /** 设置分享回调 */
    onShareCb(cb: (obj: any) => void) {
        // yiyou.onShareCb(cb);
    }

    /** 检测是否需要打开防沉迷 */
    isWallow() {
        return yiyou.hasWallow && yiyou.hasWallow();
    }

    getAge() {
        return yiyou.authData ? yiyou.authData.age : 0;
    }

    isHuiDu() {
        return yiyou.userInfo.channel == "ljtxshipin" || yiyou.userInfo.channel == "ljtxtest" ||
            yiyou.userInfo.channel == "twoshipin" || yiyou.userInfo.channel == "twotest" ||
            yiyou.userInfo.channel == "yhxxlshipin" || yiyou.userInfo.channel == "yhxxltest";
    }

    /**
     * 是否关注了爱微游 返回true 为有显示关注按钮
     * @param roleInfo
     */
    checkHasFollowAwy(roleInfo:any):boolean{
        if(gso.is_admin){
            return false;
        }
        console.info("判断是否显示关注按钮,",yiyou.hasFollowCb,"传给PHP的roleInfo是，",roleInfo);
        console.info("传给PHP的roleInfo属性是下面属性");
        for(let key in roleInfo){
            console.info("属性："+key+"的值是：",roleInfo[key]);
        }
        console.info("传给PHP的roleInfo属性是上面属性");
        return yiyou.hasFollowCb && yiyou.hasFollowCb(roleInfo);
    }

    /**
     * 关注成功发送奖励
     * @param cb
     */
    onFollowAwy(cb: (obj: any) => void):void{
        console.info("......点击关注按钮......请求关注");
        yiyou.onFollowCb && yiyou.onFollowCb(cb);
    }

    /**
     * 是否分享了爱微游 返回true 为有显示分享按钮
     */
    checkHasShareAwy():boolean{
        if(gso.is_admin){
            return false;
        }
        console.info("......判断是否显示分享按钮......",yiyou.hasShareCb);
        return yiyou.hasShareCb && yiyou.hasShareCb();
    }

    /**
     * 分享成功发送奖励
     * @param cb
     */
    onShareAwy(cb: (obj: any) => void):void{
        console.info("......点击分享按钮......");
        yiyou.onShareCb && yiyou.onShareCb(cb);
    }

    /**
     * 是否显示平台SVIP奖励按钮 返回true 为有显示分享按钮
     */
    checkHasVipAwy():boolean{
        if(gso.is_admin){
            return false;
        }
        console.info("......判断是否显示SVIP奖励按钮......",yiyou.hasVipCb);
        return yiyou.hasVipCb && yiyou.hasVipCb();
    }
    /**
     * 领取SVIP奖励
     */
    onVipAwy(cb: (obj: any) => void):void{
        console.info("......领取SVIP奖励......");
        yiyou.onVipCb && yiyou.onVipCb(cb);
    }
};