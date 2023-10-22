/** @internal */ namespace game.login {
    import GameNT = base.GameNT;
    import Cmd = base.Cmd;

    export class ConnectErrCmd extends Cmd {

        public exec(n: GameNT): void {
            console.info("connect error");
            gso.logList[REPORT_LOAD.START_CONNECT + "2"] = "服务端返回 连接错误 base.ON_CONNECT_ERROR";
            let loginProxy: LoginProxy = this.retProxy(ProxyType.Login);
            loginProxy.data.disConnectReason = gso.isBack ? 10: -1;//手动操作返回10，其它情况重连
            this.sendNt(base.ON_CONNECT_LOST);
        }

    }
}
