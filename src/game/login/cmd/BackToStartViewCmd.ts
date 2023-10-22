namespace game.login {

    import Cmd = base.Cmd;
    import GameNT = base.GameNT;
    import facade = base.facade;

    export class BackToStartView extends Cmd {
        exec(n: GameNT): void {

            BgMgr.getIns().setBg("1");
            Layer.hideMdr(Layer.main);
            Layer.hideMdr(Layer.window);
            Layer.hideMdr(Layer.upperWin);
            Layer.hideMdr(Layer.modal);
            Layer.hideMdr(Layer.tip);
            this.sendNt(LoginEvent.GAME_CONNECT_LOST);

            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            //gzyyou.sdk.logout();
            facade.onConnectLost();
            proxy.data.reConnectCnt = 0;
            proxy.data.disConnectReason = -1;
            gso.server_info = null;
            LogUtil.printLogin("断开跟服务器的socket");
            proxy.service.close();
            //ggo.reconnect(0);
        }
    }
}