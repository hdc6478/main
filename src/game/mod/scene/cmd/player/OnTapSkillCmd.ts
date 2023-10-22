namespace game.mod.scene {

    export class OnTapSkillCmd extends CmdBase {

        exec(n: base.GameNT): void {
            let proxy: SceneProxy = this.retProxy(ProxyType.Scene);
            let model = proxy.getModel();
            if (!model.mainPlayer || !model.mainAi) {
                return;
            }
            let t = model.scene.sceneType;
            //model.mainAi.addNextSkill(n.body);
        }
    }
}