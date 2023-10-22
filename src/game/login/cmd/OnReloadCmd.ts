/** @internal */ namespace game.login {
    import Cmd = base.Cmd;
    import GameNT = base.GameNT;

    export class OnReloadCmd extends Cmd {
        public exec(n: GameNT): void {
            console.info("进入 OnReloadCmd");
            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            proxy.data.tryingReconnect = false;
            if (gso.isReConnect) {
                ggo.loadVerbose(LOADING_VERBOSE_MSG.GET_SERVER_INFO);
                proxy.getServerInfo(gso.reconnectId);
            } else {
                console.info("OnReloadCmd 触发事件 LauncherEvent.SHOW_START");
                this.sendNt(LauncherEvent.SHOW_START);
            }
        }
    }

}