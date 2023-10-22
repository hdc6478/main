/** @internal */ namespace game.login {
    import Mod = base.Mod;

    class LoginMod extends Mod {
        constructor() {
            super(ModName.Login);
            LogUtil.printLogin("LoginMod constructor");
        }

        public onRegister(): void {
            super.onRegister();
            initMsg();
        }

        protected initCmd(): void {
            LogUtil.printLogin("LoginMod initCmd");
            this.regCmd(LauncherEvent.WEB_LOGIN_ERROR, WebLoginErrorCmd);
            this.regCmd(LauncherEvent.ON_ACTIVATE, ProtoOnActivate);
            this.regCmd(LauncherEvent.ON_DEACTIVATE, ProtoOnDeactivate);
            this.regCmd(LauncherEvent.SHOW_START, ShowStartViewCmd);
            this.regCmd(LauncherEvent.ON_RELOAD, OnReloadCmd);
            this.regCmd(base.ON_CONNECT_CREATE, ConnectCreateCmd);
            this.regCmd(base.ON_CONNECT_LOST, ConnectLostCmd);
            this.regCmd(base.ON_CONNECT_ERROR, ConnectErrCmd);
            this.regCmd(LoginEvent.ON_GOT_SERVER_INFO, OnGotServerInfoCmd);
            this.regCmd(LoginEvent.LOAD_GAME_RES, LoadGameResCmd);
            this.regCmd(LoginEvent.ENTER_MAIN, EnterMainCmd);
            this.regCmd(LoginEvent.START_CONNECT, StartConnectCmd);
            this.regCmd(LoginEvent.ON_ACCOUNT_LOGIN, OnAccLoginCmd);
            this.regCmd(LoginEvent.ON_ROLE_CREATE, OnRoleCreateCmd);
            this.regCmd(LoginEvent.TRY_RECONNECT, TryReConnectCmd);
            this.regCmd(LoginEvent.BACK_TO_START_VIEW, BackToStartView);
        }

        protected initModel(): void {
            LogUtil.printLogin("LoginMod initModel");
            this.regProxy(ProxyType.Login, LoginProxy);
        }

        protected initView(): void {
            this.regMdr(LoginViewType.Start, StartMdr);
            this.regMdr(LoginViewType.SelectServer, SelectServerMdr);
            this.regMdr(LoginViewType.NoticePanel, NoticePanelMdr);
            this.regMdr(LoginViewType.Loading, LoadingMdr);
            this.regMdr(LoginViewType.Alert, AlertMdr);
            this.regMdr(LoginViewType.CreateRole, CreateRoleMdr);
            this.regMdr(LoginViewType.Login, LoginMdr);
            this.regMdr(LoginViewType.AdultAlert, AdultAlertMdr);
            this.regMdr(LoginViewType.AdultId, AdultIdMdr);
            this.regMdr(LoginViewType.Privacy, PrivacyMdr);
            this.regMdr(LoginViewType.PrivacyAlert, PrivacyAlertMdr);
        }

    }

    gso.loginCls = LoginMod;

}