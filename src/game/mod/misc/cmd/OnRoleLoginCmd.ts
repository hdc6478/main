namespace game.mod.misc {
    import s2c_login_role = msg.s2c_login_role;
    import facade = base.facade;
    import TimeMgr = base.TimeMgr;

    export class OnRoleLoginCmd extends CmdBase {

        public exec(n: base.GameNT): void {
            LogUtil.printLogin("服务器返回角色信息之后，进入 OnRoleLoginCmd 准备初始化游戏层");
            let s2c: s2c_login_role = n.body;
            let proxy: MiscProxy = this.retProxy(ProxyType.Misc);
            proxy.intiGameSetting(s2c.settings);

            if (!proxy.data.gameInit) {
                LogUtil.printLogin("游戏层级初始化");
                initMainLayer();
                this.sendNt(MiscEvent.INIT_MISC);
                this.sendNt(SceneEvent.INIT_SCENE_MDR);
                proxy.data.gameInit = true;
            }

            let roleProxy: IRoleProxy = facade.retMod(ModName.Role).retProxy(ProxyType.Role);
            roleProxy.updateRole(s2c.propertys, s2c.attrs);
            roleProxy.updateDay(s2c.server_day, s2c.login_day);
            this.sendNt(MiscEvent.ON_RECEIVE_SETTING);
            this.sendNt(MiscEvent.START_SYNC_TIME);

            let power = RoleVo.ins.showpower ? RoleVo.ins.showpower.toNumber() : 0;
            let vipLv = VipUtil.getShowVipLv();
            let roleid = gso.roleId.toString();
            if(gzyyou.sdk.reportUseInfo) gzyyou.sdk.reportUseInfo(RoleVo.ins.level, power, RoleVo.ins.name, vipLv, roleid);
            if (gzyyou.sdk.onPowerUpdate) {
                let time: number = TimeMgr.time.serverTimeSecond;
                gzyyou.sdk.onPowerUpdate(power, time);
            }
        }
    }
}
