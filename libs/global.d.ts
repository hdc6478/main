declare namespace gzyyou {
    interface Sdk {
        startLogin(): void;

        enterDbgServer?(): void;

        getServerInfo(serverId: number, cb: (obj: any) => void): void;

        getServerList(cb: (obj: any) => void): void;

        getNotice(cb: (obj: any) => void): void;

        apiLogin(): void;

        getAppId?(): number;

        /**
         * 判断是否可以充值
         * @returns {boolean}
         */
        checkCanPay?(): boolean;

        /**
         * 通过平台支付
         * @param {string} key 传给平台的产品id
         * @param {number} price 支付金额，rmb
         * @param {string[]} extra 发送给后台额外参数
         * @param {string} roleName 游戏角色名称
         * @param roleId 角色id
         * @param productName  商品名称
         */
        sdkPay(key: number, price: number, extra: string[], roleName: string, roleId: string, productName: string, cb?: (obj: any) => void): boolean;

        /**
         * 加载上报
         * @param {string} act 上报位置
         */
        loadReport(act: string): void;

        /**
         * 登出并拉起重新登录流程
         */
        logout?(): void;

        /**
         * 上报角色信息
         * @param {number} lv
         * @param {number} power
         * @param roleName
         * @param vip
         * @param roleId
         */
        reportUseInfo?(lv: number, power: number, roleName: string, vip: number, roleId: string): void;

        /**
         * 渠道打点上报
         */
        pointReport?(type: number, level: number, roleId?: string, roleName?: string, vip?: number, money?: string
            , updateTime?: number, createTime?: number, oldServerId?: number, oldServerName?: string
            , lastLvUpTime?: number, power?: string): void;

        /**
         * 是否显示分享
         */
        readonly isShowShare?: boolean;

        gank_sdk?: any;

        /**
         * 拉起分享
         */
        showShare?(cb: (obj: any) => void): void;

        /**
         * 是否已关注
         */
        readonly isFocus?: boolean;

        /**
         *  是否显示关注
         */
        readonly isShowFocus?: boolean;

        /**
         * 拉起关注弹框
         */
        showFocus?(): void;

        /**
         * 是否显示添加到桌面
         */
        readonly isShowDesktop?: boolean;

        /**
         * 发送到图标到桌面
         */
        desktop?(cb?: (obj: any) => void): void;

        /**
         * 普通广告视频接口
         */
        showVideoAd?(cb?: (obj: any) => void): void;

        /**
         * 红包广告接口
         */
        showHongbaoAd?(cb?: (obj: any) => void): void;

        /**缓存qq玩家排行数据*/
        cacheQQPlayerRankInfo?(lv: number, cb?: (obj: any) => void): void;

        /**获取qq排行信息*/
        getQQPlayerRankInfo?(cb: (obj: any) => void): void;

        /**
         * 订阅
         */
        subscribeMsg?(cb?: (obj: any) => void): void;

        /**
         * 一次性订阅
         */
        oneceSubscribeMsg?(a?: any, cb?: (obj: any) => void): void;

        /**
         * 收藏
         */
        addToFavorites?(cb?: (obj: any) => void): void;

        /**
         * 跳转到论坛
         */
        forum?(): void;

        /**
         * 是否实名认证
         * @returns {boolean}
         */
        readonly isVerify?: boolean;

        /**
         * 是否显示实名认证
         * @returns {boolean}
         */
        readonly isShowVerify?: boolean;

        /**
         * 拉起认证弹框
         */
        showVerify?(): void;

        /**
         *  推送消息给用户
         * @param fRoleId 朋友roleId
         * @param {string} content
         */
        pushMsg?(fRoleId: string, content: string): void;

        /**
         * 是否显示在线客服
         */
        readonly isShowCustomerService?: boolean;

        /**
         * 打开在线客服界面
         * @param {string} roleId 角色id
         * @param {string} roleName 角色名
         * @param {number} vip vip等级
         * @param {number} level 角色等级
         * @param {number?} isPay 1为通过支付入口进入，0为普通咨询
         * @param {string?} extraStr 透传参数
         */
        showCustomerService?(roleId: string, roleName: string, vip: number, level: number, isPay?: number, extraStr?: string): void;

        /**
         * gank sdk数据上报
         * @param {string} type
         */
        gankReport?(type: string): void;

        /**
         * 获取分享来源
         * @returns {{account: string; serverId: number; roleId: string} | null}
         */
        getShareSource?(): { account: string, serverId: number, roleId: string } | null;

        /**
         * 是否来自浮窗
         */
        readonly isFromPopupView?: boolean;

        /**
         * 是否来自聊天顶部小程序 微信聊天主界面下拉，「最近使用」栏（基础库2.2.4版本起包含「我的小程序」栏）
         */
        readonly isFromTop?: boolean;

        /**
         * 是否审核服
         */
        readonly isAudit?: boolean;
        /** 是否禁止充值 */
        readonly payDisabled?: boolean;

        setPayDisabled?(value: boolean): void;

        /**
         * 平台参数
         */
        readonly platform?: string;

        /**
         * 战力变化更新qq排行榜数据
         * @param power
         * @param update_time 当前服务器时间
         */
        onPowerUpdate?(power: number, update_time: number): void;

        /**
         * 支付金额
         * @param {number} key
         * @returns {number}
         */
        getRmb?(key: number): number;

        /**
         * 手q小游戏跳转url
         */
        openUrl?(): void;

        /**
         * wanba跳转url
         */
        openUrlWanba?(url: string, target?: number, style?: number): void;

        /**
         * 订阅消息
         * @param msgId 模板id
         * @param activityType 活动类型
         * @param time 订阅推送时间
         */
        requestSubscribeMessage?(msgId?: string, activityType?: number, time?: number): void;

        /**
         * 手q小游戏跳转活动（原跳转url接口
         */
        openActivity?(url: string): void;

        /**
         * youxi实名认证接口
         */
        getCertificationInfo?(): void;

        /**
         *复制到粘贴板
         */
        copyTextToClipboard?(text: string): boolean;

        /**
         * 是否开启防沉迷
         */
        readonly isOpenVerify?: boolean;
        /**
         * 是否成年
         */
        readonly isAdult?: boolean;

        // /**是否开启防沉迷*/
        // isWallow?(): boolean;
        //
        // /**实名认证岁数*/
        // getAge?(): number;

        openVideoAd?(adUnitId: string, cb: (res: { code: number, msg: string, state: string, status: string, isEnded?: boolean }) => void): void;

        /**
         * 防沉迷认证
         * */
        uploadAuth?(account: string, authId: string, name: string, cb?: (obj: any) => void): void;

        /**
         * 添加彩签
         */
        addRecentColorSign?(obj: any): void;

        qq_authorize?(scope: string, cb?: Function, thisObj?: any): void;

        upLoadImg?(url: string, cb: (obj: any) => void);

        readonly AppPlatform?: string;

        checkIsCurChannel?(channel: string): boolean;

        //-----------------------------爱微游-----------------------------
        checkHasFollowAwy?(roleInfo: any): boolean;                   //是否关注了爱微游 返回true 为有显示关注按钮
        onFollowAwy?(cb: (obj: any) => void): void;                  //关注成功发送奖励
        checkHasShareAwy?(): boolean;                                //是否分享了爱微游 返回true 为有显示分享按钮
        onShareAwy?(cb: (obj: any) => void): void;                   //关注成功发送奖励
        checkHasVipAwy?(): boolean;                                  //是否显示平台SVIP奖励按钮 返回true 为有显示分享按钮
        onVipAwy?(cb: (obj: any) => void): void;                     //领取SVIP奖励
        //-----------------------------爱微游-----------------------------

        //盛也微信
        getBoxData?(): { role_id: number, version: string, channel: string };

        getBoxListMsg?(a: any, cb: (obj: any) => void): void;

        onBoxReport?(cb: (obj: any) => void): void;

        onBoxGameReport?(a: any, cb: (obj: any) => void): void;

        onBoxClickReport?(game_id: string, tunnel_id: string, jump_appid: string, jump_path: string, jump_type: string, preview_img: string, kf_session: string): void;

        /**退出小游戏*/
        exitMiniProgram?(cb: (obj: any) => void): void

        /**请求用户蓝钻信息*/
        reqBlueVipInfo?(): void;

        /**新手Q分享*/
        shouNewShare?(cb: (obj: any) => void, _str?: string, _img?: string): void
    }

    let sdk: Sdk;
}

declare interface GameGlobalObject {
    startGame(): void;

    inflate(buffer: ArrayBuffer): Uint8Array;

    reconnect(server_id: number): void;

    webReqGet(url: string, data?: any, onSuccess?: (obj: any) => any, onFail?: () => any): void;

    webReqPost(url: string, data: any, onSuccess?: (obj: any) => any, onFail?: () => any): void;

    loadLauncher(): void;

    loadLogin(src: string, onComplete: (data: any, url: string) => void): void;

    loadScript(onProgress: (p: number) => void, onComplete: (data: any, url: string) => void): void;

    loadSingleScript(src: string, Nallback: (data: any, url: string) => void, errCnt?: number): void;

    cleanCache?(obj: object): void;

    triggerGC?(): void;

    checkVersion(v: string | number): string | number;

    encodeUriData(data: object): string;

    loadVerbose(msg: string): void;

    removeVerbose(): void;

    onApiReady?(): void;

    onGameReady?(): void;

    copyTextToClipboard?(text: string): boolean;

    onUrlNotInDomainList?(): void;

    os?(): number;

    myPolicy(src, w, h): void;

    updateServerView(): void;

}

declare interface GameShareObject {
    // 调试相关
    guide: string; // 是否跳过新手引导
    c_dbg: string;
    /**调试场景 1打印协议 2显示对象服务器位置 3(1+2),4打印主角和屏幕坐标*/
    dbg_scene: number;
    //调试技能
    dbg_skill: number;
    //停止Ai
    dbg_stop_ai: number;
    test_mask: string;
    test_ver: string;
    test_demo: number;
    jzsjtest: string;
    dbg_add_prop: number;
    login_acc: string;//前端假登录界面
    dbg_mdr_path: boolean;
    dbg_HandUp: boolean;//AI是否挂机

    // 后台相关
    launcherReady: boolean;
    apiReady: boolean;
    apiHost: string;
    apiLoginMethod: string;
    code_version: string;
    client_open_shouqfunc: string;//客户端用  后来控制手Q活动的开启
    account: string;
    user_name:string;
    third_uid:string;
    user_status: string;
    is_admin: number;//1是后台登录
    open_pay: string; //充值开关 1:开充值，0关闭充值
    readonly openPay: boolean; //充值开关 1:开充值，0关闭充值
    ios_openpay: number;//IOS 充值开关 1:开充值，0关闭充值
    IOS_yindao: string;//IOS 充值地址
    pfrom_id: string;
    jzsj_channel: string;
    weiduan: string;
    is_click_report: number;
    is_dbg_report: number; // 0|1 错误上报开关
    report_url: string;
    error_url: string;
    pay_url: string;
    callback_pay_url: string;
    cdn_url: string;
    version: string | number;
    phone_type: number; //手机归类
    targetPlatform: string;
    zipCfg: boolean;
    all_is_new: number; //所有服新号
    agreement: number;//弹框隐私政策
    isConsent: number;//是否默认勾选用户协议，缺省值下勾选
    is_white: number;
    gameid: string;
    channel: string;
    source: string;
    uid: string;
    sign: string;
    token: string;
    openid: string;
    openkey: string;//session key，QQ大厅用到
    gameopenid: string;//QQ大厅移动端专用
    gameopenkey: string;//session key，QQ大厅移动端专用
    isQQHall: boolean; //是否QQ大厅
    isMobile: boolean; //是否QQ大厅移动端
    timestamp: number;
    session_id: string;
    session_key: string;
    isNative: string; // 思璞原生包
    avatarScale: number;
    loading: string;//加载背景图1_2_3
    app_id: number;

    client_ip: string;
    isNew: boolean; //选中服新号
    last_server: ServerHost;
    max_server: ServerHost;
    serverId: number;   //代码逻辑里不要用这个serverid，用roleVo里的服务器id
    serverName: string;
    host: string;
    port: number;
    loginParams: string;
    updateNotice: { notice: string, notice_title: string, notice_date: string, update_date: string };
    isNoticeActive: boolean;
    pf: string; //应用的来源平台
    pfkey: string; //平台的信息加密串
    isPrivacy: boolean;//是否同意隐私政策
    sandbox: number;//是否沙箱环境(1:是，0:否)
    manyouid: string;//如果平台为漫游平台（即公共参数pf值为manyou$siteid），则跳转到应用首页后，URL后会带manyouid。此时调用本支付接口时，必须回传该参数。

    server_info?: game.ServerInfo;

    showServerAlert: boolean;

    roleId: string;
    roleName: string;
    createTime:number;
    roleLv: number;
    roleVipLv: number;
    roleSex: number;
    rolePower: string;
    roleMoney: number;//仙玉
    roleTaskId: number;//主线任务
    roleChangeLv: number;//转生等级

    // 其他
    bgImg?: { [key: string]: string } | string;
    ua: string;
    isPc: boolean;
    isMicroMessenger: boolean;
    isYouxiWd: boolean;
    isHardcore: boolean;
    enableSound: boolean;
    hideCloseBtn: boolean;
    hideWeaponBtn: boolean;
    scaleTexture: number;
    gcInterval: number;
    dir4: boolean;
    lastVersion: string | number;
    payLimitTip: string;
    game_name: string;
    isShowWxShareAct: boolean;//是否显示微信分享活动
    show_share: string;//是否显示分享活动，手Q审核服用到，后台控制

    scriptList: string[];
    configList: string[];
    gameStage: egret.Stage;
    gameCls: new () => any;
    loginCls: new () => any;
    loginModIns:any;
    modCls: (new () => base.Mod)[];
    contentWidth: number;
    contentHeight: number;
    mainTop: number;
    mainBottom: number;
    mainLeft: number;
    mainRight: number;
    releaseImgTime: number;
    uiShowDelay: number;
    Pool_Unused_T: number;
    Mdr_Dispose_T: number;
    worker?: Worker;

    isReload: boolean;
    isReConnect: boolean;
    reconnectId: number;

    isWallow: number;//是否开启防沉迷

    is_adult: string;//是否成年
    age: number;//年龄
    agent_id: number | string;//平台Id
    agent_name: string;//平台名字
    pfrom_name: string;
    merge_id: number;//合服id
    isWeixin: boolean;//盛也微信
    isFuyaoWeixin: boolean;//时光微信，伏妖绘
    isShouq: boolean;
    isIosSys: boolean;
    isWanjianShouq: boolean;
    jinming: string;
    dyb: string;
    dybh5: string;
    user_token: string;
    quleduo: string;
    wd360: string;
    maskOthers: boolean;
    maskPet: boolean;
    maskSkillEft: boolean;
    //y6
    isModelMask: boolean;
    is_adult: boolean;

    //setting游戏设置相关
    // isCloseBgSound: boolean;//是否屏蔽背景音乐
    // isCloseSoundEft: boolean;//是否屏蔽游戏音效
    //
    // isHideOtherPlayer: boolean;//是否屏蔽其他玩家
    // isHideOtherEft: boolean;//是否屏蔽他人特效
    // isHideOtherPartner: boolean;//是否屏蔽他人伙伴
    // isHideSelfEft: boolean;//是否屏蔽自己特效
    isHideSceneShake: boolean;//是否屏蔽震屏特效

    isAutoUseGodSkill: boolean;//是否自动释放大招
    isAutoTask: boolean;//是否自动任务
    isBack: boolean;//是否返回选服

    islog: number;//是否开启日志
    logList: { [key: string]: string };

    //QQ大厅，qq hall
    blue_vip_level: number; //蓝钻等级
    is_blue_vip: boolean; // 是不是蓝钻
    is_super_blue_vip: boolean; //是不是豪华蓝钻
    is_blue_year_vip: boolean; //是不是年费蓝钻
    vip_valid_time: number;//蓝钻到期时间，unix时间戳，单位为秒
    inviter: string;//手Q分享参数

    /******************************************************************************/
    /**以下为现有字段*/
    dbg_all_win: number;//是否全屏
    is_innertest: number; //是否小游戏内部登陆
    isShiguangSDK:number; //时光渠道sdk

    /*更新服务器*/
    updateServerObj: any;
    //默认攻速
    defaultSpeed: number;
    //地图移动类型
    mapMoveType: string;

    //是否屏蔽背景音乐
    isBgMusic: boolean;
    //是否屏蔽游戏音效
    isGameMusic: boolean;
    //是否屏蔽游戏震屏
    isHideSceneShake: boolean;
    //自动释放化神
    autoHuashen: boolean;
    //已经挑战个人副本
    fubenChallenge: boolean;

    //回到主界面标识 目前用于 挑战幻境之海最后一关，圣界副本 胜利
    isBackMain:boolean;

    //屏蔽其他玩家
    isHideOtherPlayer: boolean;
    //屏蔽其他玩家跟随
    isHideOtherPlayerPet: boolean;

    //屏蔽其他玩家特效
    isHideOtherPlayerEft: boolean;
    //屏蔽自己特效
    isHideSeflEft: boolean;
    //关闭任务指引
    stopGuide: number;
    //打印图标
    consoleIcon: string;
    /**打印日志开关*/
    //是否打印登录流程日志
    printLogin:number;
    //关闭退到后台的机子
    closeBackground:number;

    //游戏处于前台，还是后台
    gameIsActivate:boolean;

    versionIsLoaded:boolean;
    isRunStartMdr:boolean;

}

declare interface WebAudio {
    initAudio(onInit: base.Handler): void;

    resumeAudio(cb?: base.Handler): void;
}

declare interface Logger {
    clock: {
        tmp: Date;
        pad(s: number | string, n?: number): string;
        toString(): string;
        setSt(sti: number, sst?: number): void;
        readonly st: number;
        _sst: number;
        _lti: number;
        _sti: number;
    };

    getList(args: any): string[];

    toMsgStr(msg: string[]): string;

    getEMsg(e: Error): string;

    def: {
        error: (...args: any[]) => void;
        warn: (...args: any[]) => void;
        log: (...args: any[]) => void;
        debug: (...args: any[]) => void;
    };

    nop(): void;

    error(...args: any[]): void;

    warn(...args: any[]): void;

    info(...args: any[]): void;

    log(...args: any[]): void;

    debug(...args: any[]): void;

    proto(...args: any[]): void;

    onerror(message: Event | string, source?: string, fileno?: number, columnNumber?: number, error?: Error): boolean;

    repE(data: { time: string, msg: string, stack?: string }): void;

    keys: string[];

    setLv(lv: number, dfasdfa?: string): boolean;
}

declare var generateEUI2: { paths: string[], skins: any };

declare class JSONParseClass {
    static setData(json: any): void;
}

declare interface YiYouSdk {
    /** 初始化 */
    init(cb: (state: boolean) => void): void;

    userInfo: UserInfo;

    /** 用户信息 */
    userLogin: any;

    /** 防沉迷返回数据 */
    authData: { age: number };

    /** 获取区服信息 */
    getLoginInfo(serverId: number, cb: (obj: any) => void): void

    /** 获取区服列表 */
    getServerList(cb: (obj: any) => void): void;

    getPay(orderInfo: OrderInfo, cb: (obj: any) => void): void;

    /** 角色打点 */
    roleUpdate(info: RoleInfo, cb: (obj: any) => void): void;

    hasShare(): boolean                                 //是否有分享  返回true 为有显示分享按钮
    onShare(): boolean                                  //返回true时，CP关闭分享提示界面，并调起由49提供给游戏方，放于游戏内的分享内容页面
    onShareCb(cb: (obj: any) => void): void          //分享成功后49调用game_49you.shareCallback();进行发奖
    hasWallow(): boolean                                //检测是否需要打开防沉迷
    antiAddictionCallback(cb: (obj: any) => void): void //进行实名验证
    heartbeat(): void                                   //心跳

    //爱微游接口
    hasFollowCb(roleInfo: any): boolean;                         //是否关注了爱微游 返回true 为有显示关注按钮
    onFollowCb(cb: (obj: any) => void): void;                   //关注成功发送奖励
    hasShareCb(): boolean;                                      //是否分享了爱微游 返回true 为有显示分享按钮
    onShareCb(cb: (obj: any) => void): void;                    //关注成功发送奖励
    hasVipCb(): boolean;                                        //是否显示平台SVIP奖励按钮 返回true 为有显示分享按钮
    onVipCb(cb: (obj: any) => void): void;                      //领取SVIP奖励
}

declare let yiyou: YiYouSdk;
declare var ggo: GameGlobalObject;
declare var gso: GameShareObject;
declare var logger: Logger;
declare var webAudio: WebAudio;

declare function gAlert(message?: any): void;

declare const enum CHANNEL_NAME {
    OPPO = "oppo",
    VIVO = "vivo",
    YOUXIIOS = "youxiios",
    WANBA = "wanba",
    YUEWANIOS = "yuewanios",//悦玩ios
    LUODUN = "luodun",//洛顿专服
    YHXXL = "yhxxl",//云汉仙侠录
    YHXXL_SHIPIN = "yhxxlshipin",
    YHXXL_TEST = "yhxxltest",

    /**平台yhxxl*/
    FengKuang = "awy",//疯狂(web)
    AWY = "awy2",//爱微游(web)
    Yhxxl_4399 = "yhxxl_4399",//专服1
    Yhxxl_4399Test = "yhxxl_4399test",//专服1
    Yhxxl_360 = "yhxxl_360",//专服2
    Yhxxl_360Test = "yhxxl_360test",//专服2
    Yhxxl_momo = "yhxxl_momo",//专服3
    Yhxxl_momoTest = "yhxxl_momotest",//专服3
    Yhxxl_cw = "yhxxl_cw",//混服1
    Yhxxl_cwTest = "yhxxl_cwtest",//混服1
    QQ_HALL = "yjmx",//QQ大厅特权(web)
    QQ_HALL2 = "yjmxm",//QQ大厅移动端(web)

    //九州仙缘 手Q，平台jzxy
    JZXY_SHOUQ = "jzxy",
    JZXYAUDIT_SHOUQ = "jzxyaudit",
    JZXYTEST_SHOUQ = "jzxytest",
    JZXYSHIPIN_SHOUQ = "jzxyshipin",

    //盛也微信，平台shengye
    SHENGYE = "shengye",//盛也专服
    SHENGYEAUDIT = "shengyeaudit",//盛也审核服
    SHENGYE_SHIPIN = "shengyeshipin",

    /**时光伏妖绘，微信小程序，平台fuyao_weixin*/
    FuyaoWeixin = "fuyao_weixin",
    FuyaoWeixinAudit = "fuyao_weixinaudit",
    FuyaoWeixinShipin = "fuyao_weixinshipin",
    FuyaoWeixinTest = "fuyao_weixintest",

    //万剑乾坤 手Q，平台wanjian
    WANJIAN_SHOUQ = "wanjian",
    WANJIANAUDIT_SHOUQ = "wanjianaudit",
    WANJIANTEST_SHOUQ = "wanjiantest",

    /******************************************************************************/
    /**以下平台为现有平台*/
    Test = "test",//内网测试
}

declare const enum LOADING_VERBOSE_MSG {
    INIT_SDK = "正在初始化游戏环境",
    START_LOGIN = "正在获取账号信息",
    START_LOGIN_STEP_1 = "正在获取账号信息.",
    START_LOGIN_STEP_1_FAIL = "获取账号信息失败，请重新进入游戏.",
    START_LOGIN_STEP_2 = "正在获取账号信息..",
    START_LOGIN_STEP_2_FAIL = "获取账号信息失败，请重新进入游戏..",
    START_LOGIN_STEP_3 = "正在获取账号信息...",
    START_LOGIN_STEP_3_FAIL = "获取账号信息失败，请重新进入游戏...",
    API_LOGIN = "正在初始化账号",
    API_LOGIN_SUCC = "初始化账号成功",
    API_LOGIN_FAIL = "初始化账号失败，请重新进入游戏",

    LOAD_VERSION = "正在加载版本信息",
    LOAD_LOGIN = "正在加载基础配置",
    GET_SERVER_INFO = "正在获取服务器信息",
    START_CONNECT = "正在连接游戏服务器",
    LOGIN_ACCOUNT = "正在登录游戏服务器",
}

declare const enum LOADING_ERROR_MSG {
    LOAD_SCRIPT = "代码加载失败，请重新进入游戏",
    LAUNCH_VARS = "启动参数错误",
    API_LOGIN = "无法连接入口服务器",
    LOAD_VERSION_TXT = "版本信息加载失败，请重新进入游戏 v=",
    LOAD_VERSION_CFG = "版本资源加载失败，请刷新重试 v=",
}

declare const enum REPORT_LOAD {
    ARRIVE = "load_arrive", // 到达游戏
    WX_LOGIN = "load_wx_login", // 开始微信登录
    GANK_LOGIN = "load_gank_login", // 开始敢客登录
    API_LOGIN = "load_api_login", // 开始入口登录
    LOAD_VERSION = "load_version", // 开始加载版本号
    LOAD_BASE = "load_base", // 开始加载第一个分包、版本配置、协议配置
    LOGIN_LOADED = "load_login_end", // 第一个分包加载完成
    PROTO_LOADED = "load_proto_end", // 协议配置加载完成
    VERSION_CFG_LOADED = "load_version_cfg_end", // 版本配置加载完成
    SHEET_LOADED = "load_sheet_end", // UI图集配置加载完成
    LOGIN_LOGIN = "load_login_login", // 开始获取服务器信息
    START_CONNECT = "load_connect", // 开始连接服务器
    LOGIN_ACCOUNT = "load_account", // 开始登录服务器
    CREATE = "load_create", // 创角界面显示
    S2C_CREATE_ROLE = "s2c_create_role",//后端下发的创角打点
    S2C_ROLE_ENTER = "s2c_signin_account",//后端下发的创角打点
    RES_START = "load_res_start", // 开始加载资源
    RES_END = "load_res_end", // 资源加载完成
    SCENE = "load_scene", // 第一次进入场景

    game_open = "game_open",
    dengluyouxi_click = "dengluyouxi_click",
    kaishiyouxi_click = "kaishiyouxi_click",

    //新加的点
    ROLE_UP="role_up",//游戏角色等级提升
    GAME_OVER="game_over",//退出游戏
    GAME_EXT="game_ext" //扩展字段
}

declare const enum TARGET_PLATFORM {
    WEB = "web",
    GANK_WX = "gank.wx",
    DYB_QQ = "dyb.qq",
    FuyaoWeixin = "fuyao.wx", /**伏妖绘*/
    WANJIAN_QQ = "wanjian.qq",
    //新加的
    Shiguang="shiguang.web" //时光web平台
}

//打点类型
declare const enum RoleInfoType {
    Select = 1,//选择服务器
    Create = 2,//创建角色
    Enter = 3,//进入游戏
    LvUp = 4,//等级提升
    SignOut = 5,//退出游戏
}


namespace game {

    export const enum VerifyLimitRmb {
        Single = 100,
        Month = 400,
    }

    export interface ServerInfo {
        server_id: number,
        ip: string,
        port: number,
        is_new: string,
        user_status: string,
        client_ip: string,
        source_server_id: number,
        all_is_new: number,
        subchid?: string,
        fuid?: string,
        froleid?: string,
        is_adult?: boolean,
        open_verify?: boolean
        activity_cost?: boolean;
        agent_id?: number
        agent_name?: string,
        merge_id?: number;
        openid?: string;
        openkey?: string;//session key，QQ大厅用到
        pf: string; //应用的来源平台
    }

    export const enum ItemType {
        Virtual = 1,//虚拟货币
        Prop = 2,//道具
        Surface = 3,//外显
        Equip = 4,//装备
        Gem = 5,//宝石
        Title = 6,//称号
    }

    // assets/outside/texture_images/font/stxt_1.json stxt_1.png
    export const enum BmpTextType {
        //飘字专用
        // ATK = 1,            //普攻
        // ARMOR_BREAK = 2,    //穿甲
        // CRITICAL = 3,       //暴击
        // BLOCK = 4,          //格挡
        // EXCELLENT = 5,      //卓越一击
        // LEGENDARY = 6,      //超神一击
        // CURE_TYPE = 7,      //治疗
        // DODGE = 8,          //闪避
        // Sprite = 9,         //精灵飘字
        // ShiNv = 10,         //侍女
        // Warrior = 11,       //战灵
        // //12将神变身伤害 17灵器 18御灵 19通灵 20通灵协助 21通灵-毒 22通灵-火 23通灵-冰 24通灵-雷 25通灵-光 26通灵-暗
        // /** 金 */
        // GOLD = 41,
        // /** 木 */
        // WOOD = 42,
        // /** 水 */
        // WATER = 43,
        // /** 火 */
        // FIRE = 44,
        // /** 土 */
        // EARTH = 45,

        ATK = 1, //--主角伤害
        WING = 2, //--羽翼伤害
        SHENBIN = 3, //--神兵伤害
        MOUNTS = 4, //--坐骑伤害
        YUANLING = 5, //--元灵伤害
        HUNLING = 6, //--魂灵伤害
        WIND = 7, //--风
        MINE = 8, //--雷
        WATER = 9, //--水
        FIRE = 10,//--火
        CRITICAL = 11, //-- 暴击
        ARMOR_BREAK = 12, //-- 破甲
        DODGE = 13, //-- 闪避
        BLOCK = 14, //-- 格挡（守方）
        CURE_TYPE = 15, //-- 治疗
        BLOCK_BREAK = 16, //-- 破击
        ROLE_ATK = 17, //主角受击
        WIND_ATK = 18, //风普攻
        MINE_ATK = 19, //雷普攻
        WATER_ATK = 20, //水普攻
        FIRE_ATK = 21,//火普攻

        //客户端定义
        CommonPower = 100,
        MainVip = 104,//主界面vip字体
        ReviveNum = 123,//复活倒计时数字
        RedFrame = 128,//副本呼吸框倒计时
        HIT = 999,       //受到攻击

        /**新加的字体*/
        RebirthLv = 200,//转生字体
        CommonPower2,//战力字体2
        PowerAdd1,//战力提升黄色字体
        PowerAdd2,//战力提升绿色字体
        Stage,//阶级字体
        ChineseLayer,//中文层级
        Layer,//层级
        Price,//价格
        Score,//评分
        CommonStage,//阶数，阿拉伯数字
        Vip,//vip数字
        Vip1,//vip数字，有描边
        VipFont,//vip数字
        XianYu,//仙玉数字
        XianYu1,//仙玉数字
        Summon,//召唤次数
        Supremegit,//至尊礼包字体
        CommonStage1,//阿拉伯数字阶数
        EquipStage,//装备icon阶数
        Feishenglibao,//飞升礼包
        VipChatFont,//聊天vip数字
        GoddessFont,//荒古女神数字
        XujietansuoTbs,//墟界探索回合制
        XujietansuoLayer,//墟界探索层数
        XiuxianNvpu,//修仙女仆字体
        Zhandui,//战队
        BmpDance,//字体跳动
        LingYuanGou,//零元购字体
        HuanJingFont,//幻境字体
    }

    /**
     * 五行属性类型
     */
    export const enum FiveLinesOfAttrType {
        Gold = 1,//金
        Tree = 2,//木
        Water = 3,//水
        Fire = 4,//火
        Soil = 5,//土
        FiveLines = 6//五行
    }

    /**系统类型*/
    export const enum OsType {
        Other,
        Android,
        Ios
    }
}