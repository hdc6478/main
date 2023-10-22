egret.sys.screenAdapter = {
    calculateStageSize: function (scaleMode: string, screenWidth: number, screenHeight: number,
                                  contentWidth: number, contentHeight: number) {
        let displayWidth: number = screenWidth;
        let displayHeight: number = screenHeight;
        let stageWidth: number = contentWidth;
        let stageHeight: number = contentHeight;
        let scaleX: number = displayWidth / stageWidth || 0;
        let scaleY: number = displayHeight / stageHeight || 0;
        let ratio: number = displayWidth / displayHeight;
        let r = 720 / 1280;
        if (ratio > r && !gso.dbg_all_win/* 3 / 4 */) {
            stageWidth = Math.round(r * stageHeight);
            displayWidth = Math.round(stageWidth * scaleY);
        } else {
            if (scaleX > scaleY) {
                stageWidth = Math.round(displayWidth / scaleY);
            } else {
                stageHeight = Math.round(displayHeight / scaleX);
            }
        }
        if (stageWidth % 2 != 0) {
            stageWidth += 1;
        }
        if (stageHeight % 2 != 0) {
            stageHeight += 1;
        }
        if (displayWidth % 2 != 0) {
            displayWidth += 1;
        }
        if (displayHeight % 2 != 0) {
            displayHeight += 1;
        }
        return {stageWidth, stageHeight, displayWidth, displayHeight};
    }
};
/** @internal */
namespace game {
    import Event = egret.Event;
    import getTimer = egret.getTimer;
    import facade = base.facade;
    import TimeMgr = base.TimeMgr;
    import UpdateItem = base.UpdateItem;
    import Time = base.Time;
    import Consts = base.Consts;
    import Handler = base.Handler;
    import delayCall = base.delayCall;
    import TextField = egret.TextField;

    type VTxtObj = {
        loginUrl: string; verUrl: string; verScaleUrl: string; msgUrl: string;
        map_version: string; role_name: string; create_model: string;
        verUrlOri:string;
    };

    export class Launcher extends egret.DisplayObject implements UpdateItem {
        private _baseTotal: number;
        private _baseLoaded: number;
        private _verboseTxt: TextField;

        private _needLoadUrls:string[] = [];

        private _isGameActivate = true;

        constructor() {
            super();
            this.addEventListener(Event.ADDED_TO_STAGE, this.init, this);
        }

        private init(): void {
            let self = this;
            //策略
            Consts.Pool_Unused_T = gso.Pool_Unused_T || Consts.Pool_Unused_T;
            Consts.Mdr_Dispose_T = gso.Mdr_Dispose_T || Consts.Mdr_Dispose_T;

            TimeMgr.init();
            TimeMgr.needPause = !gso.isPc;
            TimeMgr.setWorker(gso.worker);
            gso.worker = null;

            let stage = gso.gameStage = self.stage;
            egret.TextField.default_fontFamily = "Arial";

            Layer.init();
            SoundMgr.ins.init();

            StringUtil.setColorStr(UIColorStr);
            StringUtil.setColorStr2(UIColor2Str);
            TimeMgr.addUpdateItem(self, 15);

            stage.addEventListener(Event.RESIZE, self.onResize, self);
            stage.addEventListener(Event.DEACTIVATE, self.onDeactivate, self);
            stage.addEventListener(Event.ACTIVATE, self.onActivate, self);
            self.onResize();

            BgMgr.getIns().setBg("1");
            self.initVerbose();
            ggo.onApiReady = () => self.onApiReady();
            if (gso.apiReady) {
                self.onApiReady();
            }

            gso.gameIsActivate = true;
            this._isGameActivate = true;
        }

        private initVerbose(): void {
            if (!this._verboseTxt) {
                let txt = this._verboseTxt = new TextField();
                txt.touchEnabled = false;
                txt.x = 0;
                txt.y = 1130;
                txt.size = 26;
                txt.stroke = 1;
                txt.textAlign = "center";
                txt.textColor = 0xffffff;
                txt.lineSpacing = 8;
                txt.width = gso.gameStage.stageWidth;
                gso.gameStage.addChild(txt);
            }
            ggo.loadVerbose = (msg: string) => {
                let txt = this._verboseTxt;
                if (txt && txt.stage) {
                    txt.text = msg;
                }
            };
            ggo.removeVerbose = () => {
                let txt = this._verboseTxt;
                this._verboseTxt = null;
                if (txt && txt.parent) {
                    txt.parent.removeChild(txt);
                }
            };
        }

        public printStack(cnt:number):void{
            let caller = arguments.callee.caller;
            let i = 0;
            cnt = cnt || 10;
            while(caller && i < cnt){
                console.info(caller.toString());
                caller = caller.caller;
                i++;
            }
        }

        private onApiReady(): void {
            initErrorReporter();
            if (gso.isReload) {
                console.info("资源已加载，触发事件 LauncherEvent.ON_RELOAD 进入 OnReloadCmd ");
                facade.sendNt(LauncherEvent.ON_RELOAD);
                return;
            }
            this.loadV();
        }

        private _loadDataTxtCnt:number = 0;

        private loadV(): void {
            if (gso.isWeixin) {
                gzyyou.sdk.loadReport(REPORT_LOAD.LOAD_VERSION);
            }
            ggo.loadVerbose(LOADING_VERBOSE_MSG.LOAD_VERSION);
            gso.logList[REPORT_LOAD.LOAD_VERSION ] = LOADING_VERBOSE_MSG.LOAD_VERSION;
            let self = this;

            this._needLoadUrls = [];

            self._baseTotal = 4;
            self._baseLoaded = 0;

            //OnSceneReadyCmd里面会改变这个值
            // if (!gso.avatarScale) {
            //     gso.avatarScale = 1.25;
            // }
            gso.avatarScale = 1;

            console.info("loadV");

            if (!gso.version) {
                self.onVerTxt(null, null);
                return;
            }

            let mgr = LoadMgr.ins;
            let cfgUrl: string = "v/" + gso.version + "/data.txt";
            if (gso.version > 10000) {
                let tf = gso.targetPlatform ? gso.targetPlatform : TARGET_PLATFORM.WEB;
                cfgUrl = "v/" + tf + "/" + gso.version + "/data.txt";
            }
            // this.printStack(10);
            console.info("加载版本data.txt文件，"+cfgUrl);
            gso.logList[REPORT_LOAD.LOAD_VERSION + "1"] = "22 加载版本data.txt文件，"+cfgUrl;
            // gAlert("加载版本data.txt文件，"+cfgUrl);
            mgr.load(cfgUrl, Handler.alloc(self, self.onVerTxt), LoadPri.Init,
                Handler.alloc(null, () => {
                    // gAlert(LOADING_ERROR_MSG.LOAD_VERSION_TXT + gso.version + " ---- "+cfgUrl);

                    console.info("22 加载版本 " + cfgUrl +" 失败!");

                    this._loadDataTxtCnt++;
                    if(this._loadDataTxtCnt < 10){
                        // gAlert("重复加载datatxt，"+this._loadDataTxtCnt );
                        this.loadV();
                    }
                }));
        }

        private onVerTxt(str: string, url: string): void {
            let self = this;
            // gAlert("...onVerTxt...1，");
            console.info("onVerTxt url = " + url);

            if (!str) {
                self._baseTotal += 2;
                this._needLoadUrls.push("gso.scriptLit");
                ggo.loadLogin(null, (data:any,url:string) => {
                    createMsg();
                    self.checkRes(data,url);
                });

                let protobufJson = "assets/data_server/protobuf-bundle.json";
                this._needLoadUrls.push(protobufJson);
                initProto(Handler.alloc(self, self.checkRes),protobufJson);

                self.onVLoaded(null, null);

                let jsonList = ["assets/map/map.json"];
                this._needLoadUrls.push(jsonList.toString());

                LoadMgr.ins.loadJsonList(jsonList,
                    Handler.alloc(self, (): void => void 0),
                    Handler.alloc(self, self.checkRes));

                let role_name = "assets/data/role_name.json";
                this._needLoadUrls.push(role_name);

                LoadMgr.ins.load(role_name,
                    Handler.alloc(self, self.checkRes), LoadPri.Init);
                // gAlert("...onVerTxt...2，");
                return;
            }
            // gAlert("...onVerTxt...3，");
            let vObj: VTxtObj = self.getVTxtObj(str);
            if (!vObj.role_name) {
                gAlert("role_name is not define " + gso.version + " " +str);
                return;
            }
            // gAlert("...onVerTxt...4，");
            if (gso.isWeixin) {
                gzyyou.sdk.loadReport(REPORT_LOAD.LOAD_BASE);
            }
            ggo.loadVerbose(LOADING_VERBOSE_MSG.LOAD_LOGIN);

            //
            this._needLoadUrls.push(vObj.loginUrl);

            ggo.loadLogin(vObj.loginUrl, (data:any,url:string) => {
                if (gso.isWeixin) {
                    gzyyou.sdk.loadReport(REPORT_LOAD.LOGIN_LOADED);
                }
                self.checkRes(data,url);
            });

            // gAlert("onVerTxt " + vObj.msgUrl);


            this._needLoadUrls.push(vObj.msgUrl);

            initProto(Handler.alloc(self, (data:any,url:string) => {
                if (gso.isWeixin) {
                    gzyyou.sdk.loadReport(REPORT_LOAD.PROTO_LOADED);
                }
                self.checkRes(data,url);
            }), vObj.msgUrl);

            if (vObj.create_model) {
                LoadMgr.ins.loadPreData(vObj.create_model);
            }

            //默认是推荐模式
            let verUrl: string = vObj.verUrl;
            TextureScale = 1;
            let gameModel = egret.localStorage.getItem(SettingKey.gameModel) || "2";
            if(gameModel){
                if(gameModel == "1"){
                    //流畅
                    verUrl = vObj.verUrl;
                    //TextureScale = 1.25;
                }else if(gameModel == "2"){
                    //推荐
                    verUrl = vObj.verUrl;
                }else if(gameModel == "3"){
                    //高清
                    verUrl = vObj.verUrlOri;
                }
            }

            console.info("gameModel = " + gameModel);
            console.info("TextureScale = " + TextureScale);

            // else{
            //     //let verUrl: string = vObj.verUrl;
            //     TextureScale = 1;
            //     if(gso.phone_type == 2){
            //         verUrl = vObj.verUrl;
            //     }else if(gso.phone_type == 3){
            //         verUrl = vObj.verScaleUrl;
            //         TextureScale = 1.25;
            //     }
            // }

            // if (gso.scaleTexture === 1.25) {
            //     verUrl = vObj.verScaleUrl;
            //     TextureScale = 1.25;
            // }

            VerCfgUrl = verUrl;
            let mgr = LoadMgr.ins;
            mgr.addJsonRes("assets/map/map_version", vObj.map_version);
            mgr.addJsonRes("assets/data/role_name.json", self.getTxtNameCfg(vObj.role_name));
            console.info("下载资源映射文件");
            mgr.load(LoadMgr.VCfg,
                Handler.alloc(self, self.onVLoaded),
                LoadPri.Init,
                Handler.alloc(null, () => {
                    gAlert(LOADING_ERROR_MSG.LOAD_VERSION_CFG + gso.version);
                }));
            delayCall(Handler.alloc(null, () => mgr.unload(url)));
        }

        private getVTxtObj(str: string): VTxtObj {
            let arr = str.split("|");
            return {
                loginUrl: arr[0],
                verUrl: arr[1],
                verScaleUrl: arr[2],
                msgUrl: arr[3],
                map_version: arr[4],
                role_name: arr[5],
                create_model: arr[6],
                verUrlOri: arr[7],
            }
        }

        private getTxtNameCfg(str: string): any {
            let nameCfg = {};
            for (let s of str.split("&")) {
                let rArr = s.split("#");
                let id: string = rArr[0];
                nameCfg[id] = {
                    id: id,
                    adv: rArr[1],
                    name_f: rArr[2],
                    name_1: rArr[3],
                    name_2: rArr[4]
                };
            }
            return nameCfg;
        }

        private onVLoaded(obj: {
            js: string[]; url: object; res: object;
            cfg: string[]; cfg_ml: string[]; cfg_sq: string[]; cfg_wx: string[]; cfg_ft: string[]; cfg_ov: string[]
        }, url: string): void {

            LogUtil.printLogin("资源映射文件下载完毕");

            let self = this;
            if (gso.isWeixin) {
                gzyyou.sdk.loadReport(REPORT_LOAD.VERSION_CFG_LOADED);
            }
            if (obj) {
                gso.scriptList = obj.js;
                let isOv = gso.jzsj_channel == CHANNEL_NAME.OPPO || gso.jzsj_channel == CHANNEL_NAME.VIVO;
                if (gso.isWeixin && obj.cfg_wx) {
                     gso.configList = obj.cfg_wx;
                } else {
                    gso.configList = obj.cfg;
                }

                LoadMgr.ins.urlHash = obj.url;
                AssetsMgr.ins.resJson = obj.res;

                if (ggo.cleanCache) {
                    ggo.cleanCache(obj.url);
                }
            }

            let defaultJson = AssetsMgr.Root + "default.res.json";
            this._needLoadUrls.push(defaultJson);
            AssetsMgr.ins.loadConfig(Handler.alloc(self, self.checkRes));

            this._needLoadUrls.push(LoadMgr.SheetData);

            LoadMgr.ins.loadSheet(Handler.alloc(self, (data:any,url:string) => {
                if (gso.isWeixin) {
                    gzyyou.sdk.loadReport(REPORT_LOAD.SHEET_LOADED);
                }
                self.checkRes(data,url);
            }));
            delayCall(Handler.alloc(null, () => LoadMgr.ins.unload(url)));

            gso.versionIsLoaded = true;
            if(gso.isRunStartMdr){
                facade.showView(ModName.Login, LoginViewType.Start);
            }


        }

        private checkRes(data:any,url?:string): void {
            this._baseLoaded++;
            gso.logList[REPORT_LOAD.LOAD_VERSION + this._baseLoaded] = "加载json文件数量 " + this._baseLoaded;
            // if (this._baseLoaded >= this._baseTotal) {
            //     this.run();
            // }
            let index = this._needLoadUrls.indexOf(url);
            if(index > -1){
                this._needLoadUrls.splice(index,1);
            }
            if(this._needLoadUrls.length <= 0){
                this.run();
            }else{
                if(gso.printLogin){
                    LogUtil.printLogin("剩余没下载 bengin");
                    for(let i = 0; i < this._needLoadUrls.length; i++){
                        LogUtil.printLogin(this._needLoadUrls[i]);
                    }
                    LogUtil.printLogin("剩余没下载 end");
                }
            }
        }

        private run(): void {
            this.stage.addChild(Layer.ins);
            if(!gso.loginModIns){
                gso.loginModIns = new gso.loginCls();
            }
            gso.logList[REPORT_LOAD.LOAD_VERSION + "10"] = "初始化登陆模块";

            LogUtil.printLogin("资源下载完毕，开始运行游戏 run");
            LogUtil.printLogin("Launcher 触发事件 LauncherEvent.SHOW_START");

            facade.sendNt(LauncherEvent.SHOW_START);
            if (ggo.onGameReady) {
                ggo.onGameReady();
            }
        }

        private onResize(e?: Event): void {
            BgMgr.getIns().updateBg();
            Layer.ins.onResize();
            facade.sendNt(LauncherEvent.ON_RESIZE);
        }

        private onActivate(e: Event): void {
            console.info("activate");
            this._isGameActivate = true;
            gso.gameIsActivate = true;
            facade.sendNt(LauncherEvent.ON_ACTIVATE);
            SoundMgr.ins.onActivate();
        }

        private onDeactivate(e: Event): void {
            console.info("deactivate");
            this._isGameActivate = false;
            gso.gameIsActivate = false;
            facade.sendNt(LauncherEvent.ON_DEACTIVATE);
            SoundMgr.ins.onDeActivate();

            if(gso.closeBackground){
                return;
            }

            let self = this;
            delayCall(Handler.alloc(this, () => {
                if(!self._isGameActivate){
                    LogUtil.printLogin("退回到后台时间久了，回到登录界面");
                    facade.sendNt(LoginEvent.BACK_TO_START_VIEW);
                }
            }), 600000);
        }

        public update(time: Time): void {
            let t = getTimer();
            for (let k in _eventMap) {
                let pool = _eventMap[k];
                if (pool && t - pool.time > 50000) {
                    pool.list.length = 0;
                    _eventMap[k] = null;
                }
            }
        }

    }

}