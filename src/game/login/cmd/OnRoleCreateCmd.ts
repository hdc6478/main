/** @internal */ namespace game.login {
    import facade = base.facade;
    import Cmd = base.Cmd;

    export class OnRoleCreateCmd extends Cmd {

        public exec(n: base.GameNT): void {
            console.info("role create");
            let msg: msg.s2c_create_role = n.body;
            if (msg.result == 1) {
                facade.hideView(ModName.Login, LoginViewType.CreateRole);
                let proxy: LoginProxy = this.retProxy(ProxyType.Login);
                proxy.role_id = msg.role_id;
                proxy.create_time = msg.create_time;
                gso.roleId = msg.role_id.toString();
                console.info("OnRoleCreateCmd  gso.roleId = " + gso.roleId);
                let report = gzyyou.sdk.gankReport;
                if (report) {
                    report("entergame_reg");
                }
                this.sendNt(LoginEvent.LOAD_GAME_RES);
            } else {
                let str: string = CreateRoleMsg[msg.result];
                if (!str) {
                    str = StringUtil.substitute(LoginLan.UnknownError, [msg.result]);
                }
                facade.showView(ModName.Login, LoginViewType.Alert, str);
                console.info(str);
            }
        }

    }
}
