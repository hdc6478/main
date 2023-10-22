namespace game.mod.scene {

    import GameNT = base.GameNT;
    import facade = base.facade;

    export class AutoHangUpChangedCmd extends CmdBase {

        public exec(n: GameNT): void {
            super.exec(n);
            let p: SceneProxy = facade.retMod(ModName.Scene).retProxy(ProxyType.Scene);
            let model:SceneModel = p.getModel();
            if (p.isAutoHangUp) {
                model.mainAi.startHangUp();
            }
            else {
                model.mainAi.stopHandUp();
            }
        }
    }
}
