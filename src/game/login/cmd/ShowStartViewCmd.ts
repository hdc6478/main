/** @internal */ namespace game.login {
    import Cmd = base.Cmd;
    import GameNT = base.GameNT;
    import facade = base.facade;

    export class ShowStartViewCmd extends Cmd {
        public exec(n: GameNT): void {
            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            //proxy.setServerData(gso.last_server.server_id, gso.last_server);
            //proxy.setServerData(gso.max_server.server_id, gso.max_server);

            //gso.logList[REPORT_LOAD.LOGIN_LOGIN + "1"] = "当前服务器选择id " + gso.last_server.server_id + JSON.stringify( gso.last_server)

            LogUtil.printLogin("显示登录界面或者开始页面");
            if (gzyyou.sdk.gankReport) {
                gzyyou.sdk.gankReport("arrive");
            }
            let alertPrivacy = false;
            if (gso.all_is_new == 1) {
                //新账号
                LogUtil.printLogin("新账号跳过选服界面");
                if (gso.server_info) {
                    if (gso.user_status != "1") {
                        facade.showView(ModName.Login, LoginViewType.Alert, LoginLan.ServerMaintenance);
                    } else {
                        LogUtil.printLogin("新账号链接服的信息11: "+JSON.stringify(gso.server_info));
                        proxy.handleServerInfoObj(gso.server_info);
                    }
                } else {

                    if(gso.agreement == 0 && alertPrivacy){
                        LogUtil.printLogin("显示登录页面和隐私策略");
                        facade.showView(ModName.Login, LoginViewType.Start);
                        this.showPrivacy();
                    }else {
                        ggo.loadVerbose(LOADING_VERBOSE_MSG.GET_SERVER_INFO);
                        LogUtil.printLogin("新账号链接服的信息22: "+JSON.stringify(gso.server_info));
                        proxy.getServerInfo(gso.max_server.server_id);
                    }

                }
            } else if (gso.login_acc == "1") {
                LogUtil.printLogin("通过LoginMdr 显示登录页面");
                facade.showView(ModName.Login, LoginViewType.Login);
            } else {
                LogUtil.printLogin("显示登录页面");
                facade.showView(ModName.Login, LoginViewType.Start);
                if(gso.agreement == 0 && alertPrivacy){
                    LogUtil.printLogin("老号进入隐私政策");
                    this.showPrivacy();
                }
            }
            //弹了隐私政策则不弹公告（目前只有手Q平台生效）
            if(gso.agreement == 1 && !alertPrivacy) {
                proxy.getNotice();
            }
        }

        private showPrivacy(): void {
            if(gso.isWanjianShouq){
                facade.showView(ModName.Login, LoginViewType.PrivacyAlert);
                return;
            }
            //facade.showView(ModName.Login, LoginViewType.Privacy, GameUtil.yszc);
        }
    }
}