/** @internal */ namespace game.login {
    import facade = base.facade;
    import Cmd = base.Cmd;
    import GameNT = base.GameNT;

    export class OnGotServerInfoCmd extends Cmd {
        public exec(n: GameNT): void {
            facade.hideView(ModName.Login, LoginViewType.Start);
            facade.deleteMdr(ModName.Login, LoginViewType.Start);
            console.info("OnGotServerInfoCmd");
            this.sendNt(LoginEvent.START_CONNECT);
        }

    }
}