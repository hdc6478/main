/** @internal */
namespace game.login {
    import Mdr = base.Mdr;
    import TouchEvent = egret.TouchEvent;
    import GameNT = base.GameNT;
    import TimeMgr = base.TimeMgr;
    import delayCall = base.delayCall;
    import Handler = base.Handler;
    import clearDelay = base.clearDelay;
    import TextEvent = egret.TextEvent;


    export class StartMdr extends Mdr {
        private _view: StartView = this.mark("_view", StartView);
        private _server: ServerHost;
        private _newServer: ServerHost;
        private _proxy: LoginProxy;
        private _tapTick: number = 0;
        private _delayId: number = 0;

        private  _selectCy:boolean;
        constructor() {
            super(Layer.main);
        }

        protected onInit(): void {
            this._proxy = this.retProxy(ProxyType.Login);
            gzyyou.sdk.loadReport(REPORT_LOAD.game_open);
            this._view.imgAgreeGou.visible = false;

            //不可删除
            gso.updateServerObj = this;
        }

        protected onShow(): void {
            ggo.removeVerbose();
            // BgMgr.getIns().setBigBg("bg");

            LogUtil.printLogin("资源版本号："+gso.version);
            LogUtil.printLogin("gso.versionDataIsLoaded = "+gso.versionIsLoaded);

            if(!gso.versionIsLoaded){
                gso.isRunStartMdr = true;
                return
            }
            gso.isRunStartMdr = false;


            let v = this._view;
            v.x = (v.parent.width - v.width) / 2;
            v.y = (v.parent.height - v.height) / 2;
            this.onShowNotice();

            this.updateServerFunc();

            if (gso.showServerAlert) {
                this.tapSelect();
                gso.showServerAlert = null;
            }
            this._delayId = delayCall(Handler.alloc(this, function () {
                console.log("start preload");
                PreloadMgr.startLoad();
            }), 1000);

            this._selectCy = gso.isConsent != 0;
            if(gso.isQQHall){
                //新用户第一次登录需要手动勾选，老用户可以默认勾选
                this._selectCy = !!gso.agreement;
            }
            //this._view.imgLogo.visible = false;//todo,不显示logo

            // if(GameUtil.isShowYszc) {
            //     this._view.imgAgreeDi.visible = true;
            //     this._view.imgAgreeGou.visible = this._selectCy;
            //     this._view.labAgree.visible = true;
            //     this.updateLabAgree();
            // }else {
            //     this._view.imgAgreeDi.visible = false;
            //     this._view.imgAgreeGou.visible = false;
            //     this._view.labAgree.visible = false;
            // }
            this._view.imgAgreeDi.visible = false;
            this._view.imgAgreeGou.visible = false;
            this._view.labAgree.visible = false;
        }

        protected onHide(): void {
            gso.updateServerObj = null;
            clearDelay(this._delayId);
        }

        protected addListeners(): void {
            let self = this;
            let addEventListener = self.onEgret.bind(self);
            addEventListener(self._view.btnStart, TouchEvent.TOUCH_TAP, self.tapStart);
            addEventListener(self._view.btnSelectServer, TouchEvent.TOUCH_TAP, self.tapSelect);
            addEventListener(self._view.btnSelectServer2, TouchEvent.TOUCH_TAP, self.tapSelect);
            addEventListener(self._view.btnNotice, TouchEvent.TOUCH_TAP, self.tapNotice);
            addEventListener(self._view.imgDbg, TouchEvent.TOUCH_TAP, self.tapDbg);
            addEventListener(self._view.imgLastTag, TouchEvent.TOUCH_TAP, self.tapLastServer);
            addEventListener(self._view.labLastServer, TouchEvent.TOUCH_TAP, self.tapLastServer);
            addEventListener(self._view.btnIdentity, TouchEvent.TOUCH_TAP, self.tapIndetity);
            addEventListener(self._view.imgAgreeDi, TouchEvent.TOUCH_TAP, self.ontongyi);
            addEventListener(self._view.imgAgreeGou, TouchEvent.TOUCH_TAP, self.ontongyi2);
            addEventListener(self._view.labAgree, TextEvent.LINK, this.onTapLink);
            addEventListener(self._view.btnAgeTip, TouchEvent.TOUCH_TAP, self.tapAgeTip);

            self.onNt(LoginEvent.SHOW_NOTICE, self.onShowNotice, self);
            self.onNt(LoginEvent.UPDATE_CURRENT_SERVER, self.updateCurrentServer, self);
            self.onNt(LoginEvent.ADULT_CHANGE, self.refreshAdultState, self);
            self.onNt(LoginEvent.USER_ARGREEMENT_TIP_CONFIRM, self.selectCy, self);
        }

        private updateServerFunc():void{
            if(gso.last_server){

                this._proxy.setServerData(gso.last_server.server_id, gso.last_server);
                this._proxy.setServerData(gso.max_server.server_id, gso.max_server);

                this.updateView(gso.last_server);
                this.updateLastView(gso.max_server);
            }
        }

        private updateCurrentServer(n: GameNT) {
            this.updateView(n.body);
        }

        private updateView(server: ServerHost) {
            this._server = server;
            this._view.labServer.text = server.name;
            let _str: string = ServerStatusImg[server.status];
            this._view.imgTag.source = _str ? "assets/login/" + _str + ".png" : "";
        }

        private updateLastView(server: ServerHost) {
            this._newServer = server;
            this._view.labLastServer.text = server.name;
            let _str: string = ServerStatusImg[server.status];
            this._view.imgLastTag.source = _str ? "assets/login/" + _str + ".png" : "";
            this._view.labLastServer.textColor = ServerStatusColor[server.status];
        }

        private tapStart(e: TouchEvent) {
            if(this._selectCy == false){
                this.showView(LoginViewType.Alert, "请勾选同意用户协议")
                return;
            }

            let t: number = egret.getTimer();
            if (this._tapTick == 0 || t - this._tapTick >= 5000) {
                this._tapTick = t;
                this._proxy.getServerInfo(this._server.server_id);
                gzyyou.sdk.loadReport(REPORT_LOAD.dengluyouxi_click);
            }
        }

        private tapSelect(e?: TouchEvent) {
            if (this._proxy.data.gotServerList) {
                this.showView(LoginViewType.SelectServer);
            } else {
                this._proxy.getServerList();
            }
        }

        private tapNotice(e: TouchEvent) {
            this.showView(LoginViewType.NoticePanel);
        }

        private onShowNotice() {
            let a: boolean = gso.isNoticeActive == true;
            this._view.btnNotice.visible = a;
            // this._view.btnNotice.visible = true;
            if (a) {
                this.showView(LoginViewType.NoticePanel);
            }

        }

        private _dbgTapCnt: { time: number, cnt: number } = {time: 0, cnt: 0};

        private tapDbg() {
            if(gso.islog != 1 ) return;
            let self = this;
            let t: number = TimeMgr.time.time;
            if (t - self._dbgTapCnt.time > 5000) {
                self._dbgTapCnt.cnt = 0;
            }
            self._dbgTapCnt.time = t;
            self._dbgTapCnt.cnt++;
            if (self._dbgTapCnt.cnt >= 5) {
                self._dbgTapCnt.cnt = 0;
                let str = "";
                for(let key in gso.logList){
                    str += gso.logList[key] + "\n";
                }
                this.showView(LoginViewType.NoticePanel,str);
            }
        }

        private tapLastServer() {
            this.updateView(this._newServer);
        }

        private tapIndetity(e: TouchEvent) {
            let isAdult: boolean = gso.is_adult == "1";//== "1";
            if (isAdult) {
                this.showView(LoginViewType.Alert, "您已成功实名认证，无须继续认证");
                return;
            }
            // 实名认证
            this.showView(LoginViewType.AdultId);
        }

        private refreshAdultState(): void {
            let is_adult: boolean = gso.is_adult == "1";//&& gso.is_adult == "1";
            this._view.labState.text = is_adult ? "您已完成实名认证" : "请先完成实名认证";
            this._view.labState.textColor = is_adult ? 0x00ff00 : 0xff0000;
            this._view.imgState.source = is_adult ? "lv" : "hong";
        }

        private ontongyi(e: TouchEvent) {
            this._view.imgAgreeGou.visible = true;
            this._selectCy = true;
        }

        private ontongyi2(e: TouchEvent) {
            this._view.imgAgreeGou.visible = false;
            this._selectCy = false;
        }

        private onTapLink(e: egret.TextEvent) {
            let txt = e.text;
            //用户协议
            let alertPrivacy = false;
            // if(txt == GameUtil.yhxy) {
            //     //手Q渠道
            //     if(alertPrivacy) {
            //         this.showView(LoginViewType.Privacy,GameUtil.yhxy)
            //     } else{
            //         //yhxxl 云汉仙侠录
            //         ggo.myPolicy("https://image.asgardstudio.cn/static/xieyi.html", 0, 0);
            //     }
            //
            // }
            //隐私政策
            // else if(txt = GameUtil.yszc){
            //     //手Q渠道
            //     if(alertPrivacy) {
            //         this.showView(LoginViewType.Privacy,GameUtil.yszc);
            //     }else {
            //         ggo.myPolicy("https://image.asgardstudio.cn/static/yinsi.html", 0, 0);
            //     }
            // }
        }

        private selectCy() {
            this._view.imgAgreeGou.visible = gso.isPrivacy;
            this._selectCy = gso.isPrivacy;
        }

        private tapAgeTip() {
            this.showView(LoginViewType.NoticePanel,LoginLan.AgeTips1);
        }

        private updateLabAgree(): void {
            let title = TextUtil.addLinkHtmlTxt("用户协议", WhiteColor.GREEN, "yhxy") + "和";
            title += TextUtil.addLinkHtmlTxt("隐私政策", WhiteColor.GREEN, "yszc");
            this._view.labAgree.textFlow =
                TextUtil.parseHtml(LoginLan.AgreeTips + title);
        }
    }
}
