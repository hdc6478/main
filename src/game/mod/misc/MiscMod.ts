namespace game.mod.misc {


    export class MiscMod extends ModBase {
        constructor() {
            super(ModName.Misc);
        }

        protected initCmd() {
            let self = this;
            self.regCmd(LoginEvent.GAME_CONNECT_LOST, GameConnectLostCmd);
            self.regCmd(MiscEvent.INIT_MISC, InitMiscCmd);
            self.regCmd(MiscEvent.ON_ROLE_LOGIN, OnRoleLoginCmd);
            self.regCmd(MiscEvent.START_GAME, StartGameCmd);
            self.regCmd(MiscEvent.SERVER_ERR, ServerErrCmd);
            //self.regCmd(MiscEvent.ON_RECEIVE_SETTING, OnReceiveSettingCmd);
        }

        protected initModel() {
            this.regProxy(ProxyType.Misc, MiscProxy);
        }

        protected initView(): void {
        }

    }

    gso.modCls.push(MiscMod);
}
