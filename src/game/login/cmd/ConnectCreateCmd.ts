/** @internal */ namespace game.login {
    import GameNT = base.GameNT;
    import Cmd = base.Cmd;

    export class ConnectCreateCmd extends Cmd {

        public exec(n: GameNT) {
            console.info("connection create");
            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            proxy.data.disConnectReason = 0;
            proxy.data.disConnectMsg = "";
            proxy.data.reConnectCnt = 0;
            gso.isBack = false;
            if (gso.isWeixin) {
                gzyyou.sdk.loadReport(REPORT_LOAD.LOGIN_ACCOUNT);
            }else{
                ggo.loadVerbose(LOADING_VERBOSE_MSG.LOGIN_ACCOUNT);
            }
            console.log("==================LOGIN_ACCOUNT");
            gso.logList[REPORT_LOAD.START_CONNECT + "1"] = "socket 成功 返回 base.ON_CONNECT_CREATE"
            proxy.loginAccount(gso.loginParams);
        }

    }

}
