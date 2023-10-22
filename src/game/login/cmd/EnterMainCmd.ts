/** @internal */ namespace game.login {
    import facade = base.facade;
    import Cmd = base.Cmd;
    import GameNT = base.GameNT;

    export class EnterMainCmd extends Cmd {

        public exec(n: GameNT): void {
            gso.isNoticeActive = false;
            // gso.updateNotice = null;
            gso.scriptList = null;
            LogUtil.printLogin("关闭加载页面和清楚一些登录的层级");
            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            proxy.clean();
            facade.hideView(ModName.Login, LoginViewType.Loading);
            Layer.hideMdr(Layer.main);
            Layer.hideMdr(Layer.window);
            Layer.hideMdr(Layer.upperWin);
            Layer.hideMdr(Layer.modal);
            Layer.hideMdr(Layer.tip);
            LogUtil.printLogin("请求角色登录");
            proxy.loginRole(proxy.role_id);
        }

    }
}
