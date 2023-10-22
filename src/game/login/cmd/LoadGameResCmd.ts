/** @internal */ namespace game.login {
    import Cmd = base.Cmd;
    import GameNT = base.GameNT;
    import facade = base.facade;

    export class LoadGameResCmd extends Cmd {
        public exec(n: GameNT): void {
            if (gso.isReload && PreloadMgr.isAllComplete) {
                this.sendNt(LoginEvent.ENTER_MAIN);
                return;
            }
            gzyyou.sdk.loadReport(REPORT_LOAD.RES_START);
            LogUtil.printLogin("资源开始加载");
            if (PreloadMgr.isAllComplete) {
                this.loadComplete();
                return;
            }
            facade.showView(ModName.Login, LoginViewType.Loading);
            PreloadMgr.startLoad(() => this.loadComplete());
        }

        private loadComplete(): void {

            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            if (!proxy.service.isConnected()) {
                LogUtil.printLogin("资源加载完成，但是socket断开了");
                facade.hideView(ModName.Login,LoginViewType.Loading);
                facade.showView(ModName.Login, LoginViewType.Start);
                return;
            }

            gzyyou.sdk.loadReport(REPORT_LOAD.RES_END);
            LogUtil.printLogin("资源加载结束");
            this.sendNt(LoginEvent.ENTER_MAIN);
        }
    }
}