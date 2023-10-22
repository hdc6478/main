/** @internal */ namespace game.login {
    import GameNT = base.GameNT;
    import facade = base.facade;
    import BgMgr = game.BgMgr;
    import Handler = base.Handler;
    import Cmd = base.Cmd;
    import delayCall = base.delayCall;

    export class ConnectLostCmd extends Cmd {

        public exec(n: GameNT) {
            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            let r: number = proxy.data.disConnectReason;
            let msg: string = proxy.data.disConnectMsg;
            console.info("connection lost", r, msg);
            LoginProxy.isLoginAccount = false;
            gso.logList[REPORT_LOAD.START_CONNECT + "3"] = "服务端主动断开连接 base.ON_CONNECT_LOST " + r + "--" +msg;
            if (PreloadMgr.isAllComplete) {
                LogUtil.printLogin("ConnectLostCmd PreloadMgr.isAllComplete");
                BgMgr.getIns().setBg("1");
                Layer.hideMdr(Layer.main);
                Layer.hideMdr(Layer.window);
                Layer.hideMdr(Layer.upperWin);
                Layer.hideMdr(Layer.modal);
                Layer.hideMdr(Layer.bossReliveTip);
                Layer.hideMdr(Layer.tip);
                Layer.hideMdr(Layer.top);
                facade.deleteMdr(ModName.Login, LoginViewType.Alert);
                this.sendNt(LoginEvent.GAME_CONNECT_LOST);
            }
            let data: { lab: string, confirm?: Handler, cancel?: Handler } = {lab: msg};
            if (msg) {
                LogUtil.printLogin("ConnectLostCmd 11 显示登录页面");
                data.confirm = Handler.alloc(this, this.onClick);
                // data.cancel = Handler.alloc(this, this.onClick);
                facade.showView(ModName.Login, LoginViewType.Alert, data);
                return;
            }
            if (r === 0 || r === -1) {
                if (proxy.data.reConnectCnt < ReConnectMax) {
                    LogUtil.printLogin("ConnectLostCmd 重连");
                    //一秒钟重连一次
                    let self = this;
                    delayCall(Handler.alloc(self, function () {
                        self.sendNt(LoginEvent.TRY_RECONNECT);
                    }), 500);
                    return;
                }
                LogUtil.printLogin("ConnectLostCmd 弹窗");
                data.lab = r === -1 ? LoginLan.ConnectionError : LoginLan.ConnectionBreak;
                data.confirm = Handler.alloc(this, this.onClick);
            } else {
                data.lab = DisConnectMsg[r];
                data.confirm = Handler.alloc(this, this.onClick);
            }
            if(r == 10) {
                this.onClick();
            }else {
                LogUtil.printLogin("ConnectLostCmd 22 显示登录页面");
                facade.showView(ModName.Login, LoginViewType.Alert, data);
            }

        }

        private onClick() {
            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            let r: number = proxy.data.disConnectReason;
            if (r == 1) {
                LogUtil.printLogin("ConnectLostCmd onClick 注销登录");
                gzyyou.sdk.logout();
            } else if (r == 4 || r == 10) {
                LogUtil.printLogin("ConnectLostCmd onClick r == 4 || r == 10");
                gso.showServerAlert = true;
            }
            facade.onConnectLost();
            proxy.data.reConnectCnt = 0;
            gso.server_info = null;
            LogUtil.printLogin("ConnectLostCmd onClick 再一次链接服务器");
            ggo.reconnect(0);
        }

    }
}
