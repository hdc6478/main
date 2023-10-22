/** @internal */ namespace game.login {
    import facade = base.facade;
    import GameNT = base.GameNT;
    import Cmd = base.Cmd;

    export class TryReConnectCmd extends Cmd {

        public exec(n: GameNT): void {
            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            if (proxy.data.tryingReconnect) {
                LogUtil.printLogin("TryReConnectCmd proxy.data.tryingReconnect");
                return;
            }
            if (!proxy.data.isActive) {
                LogUtil.printLogin("TryReConnectCmd !proxy.data.isActive");
                return;
            }
            if (proxy.service.isConnected()) {
                LogUtil.printLogin("TryReConnectCmd proxy.service.isConnected");
                return;
            }
            if (proxy.data.disConnectReason !== 0 && proxy.data.disConnectReason !== -1) {
                LogUtil.printLogin("TryReConnectCmd proxy.data.disConnectReason !== 0 && proxy.data.disConnectReason !== -1");
                return;
            }
            LogUtil.printLogin("TryReConnectCmd 前端断开socket");
            proxy.service.close();
            if (proxy.data.reConnectCnt >= ReConnectMax) {
                LogUtil.printLogin("TryReConnectCmd 重连次数已经等于或等于 8 了");
                return;
            }
            if (!gso.serverId) {
                LogUtil.printLogin("TryReConnectCmd !gso.serverId");
                return;
            }
            proxy.data.reConnectCnt++;
            try {
                facade.onConnectLost();
            } catch (e) {
                console.error(e);
            }
            proxy.data.tryingReconnect = true;
            LogUtil.printLogin("TryReConnectCmd 再一次链接服务器(id="+gso.serverId+")");
            ggo.reconnect(gso.serverId);
        }

    }
}