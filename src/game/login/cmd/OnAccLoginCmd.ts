/** @internal */ namespace game.login {
    import facade = base.facade;
    import Cmd = base.Cmd;

    export class OnAccLoginCmd extends Cmd {
        public exec(n: base.GameNT): void {
            console.info("account login");
            ggo.removeVerbose();
            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            let report = gzyyou.sdk.gankReport;
            if (!proxy.role_id || proxy.role_id.isZero()) {
                console.error("数据出错，角色创建失败，查询 s2c_signin_account ");
                // facade.showView(ModName.Login, LoginViewType.CreateRole);
            } else {
                this.sendNt(LoginEvent.LOAD_GAME_RES);
                if (report) {
                    report("entergame_direct");
                }
            }
        }

    }
}
