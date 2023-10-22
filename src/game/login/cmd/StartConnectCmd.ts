/** @internal */ namespace game.login {
    import GameNT = base.GameNT;
    import Handler = base.Handler;
    import Cmd = base.Cmd;
    import facade = base.facade;

    export class StartConnectCmd extends Cmd {
        public exec(n: GameNT) {
            if (!gso.host && !gso.port) {
                let data = {
                    lab: LoginLan.ServerUrlError,
                    confirm: Handler.alloc(this, () => true)
                };
                facade.showView(ModName.Login, LoginViewType.Alert, data);
                return;
            }
            if (gso.isReload && gso.version && gso.lastVersion !== gso.version) {
                let data = {
                    lab: LoginLan.UpdateTips,
                    confirm: Handler.alloc(this, () => true)
                };
                facade.showView(ModName.Login, LoginViewType.Alert, data);
                return;
            }

            if (gso.isWeixin) {
                gzyyou.sdk.loadReport(REPORT_LOAD.START_CONNECT);
            }else {
                ggo.loadVerbose(LOADING_VERBOSE_MSG.START_CONNECT);
            }
            console.log("=================START_CONNECT")
            console.info("start connect,",gso.isWeixin);
            gso.logList[REPORT_LOAD.START_CONNECT] = "请求后端连接 " + gso.host + ` ${gso.port}/?pid=${gso.agent_id}&pname=${gso.agent_name}&sid=${gso.merge_id}`;
            let proxy: LoginProxy = this.retProxy(ProxyType.Login);
            // if (DEBUG) {
            // @ts-ignore
            proxy.service.connectTo(gso.host, `${gso.port}/?pid=${gso.agent_id}&pname=${gso.agent_name}&sid=${gso.merge_id}`);
            // }
            // if (RELEASE) {
            //     proxy.service.connectTo(gso.host, gso.port.toString());
            // }
        }
    }
}
