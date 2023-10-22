/** @internal */ namespace game.login {
    import GameNT = base.GameNT;
    import Handler = base.Handler;
    import Cmd = base.Cmd;
    import facade = base.facade;

    export class WebLoginErrorCmd extends Cmd {
        public exec(n: GameNT): void {
            let data = {lab: LoginLan.ConnectionLost, confirm: Handler.alloc(this, this.onClick)};
            facade.showView(ModName.Login, LoginViewType.Alert, data);
        }

        private onClick() {
            ggo.reconnect(0);
        }

    }
}