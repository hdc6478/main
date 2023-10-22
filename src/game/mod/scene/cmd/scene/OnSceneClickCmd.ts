namespace game.mod.scene {
    import BaseActor = game.scene.BaseActor;

    /**
     *场景点击对象
     */
    export class OnSceneClickCmd extends CmdBase {

        exec(n: base.GameNT): void {
            // let obj: BaseActor = n.body;
            // let proxy: SceneProxy = this.retProxy(ProxyType.Scene);
            // let model = proxy.getModel();
            //model.mainAi.onSceneClick(obj);
        }
    }
}