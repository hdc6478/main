namespace game.mod.scene {

    import BaseActor = game.scene.BaseActor;
    import MoveAct = game.scene.MoveAct;
    import AttackAct = game.scene.AttackAct;

    export class OnResetPlayerPtCmd extends CmdBase {

        exec(n: base.GameNT): void {
            let proxy: SceneProxy = this.retProxy(ProxyType.Scene);
            let model = proxy.getModel();
            if (!model.scene.isSceneReady) {
                return;
            }
            let {id, x, y} = n.body;
            let obj: BaseActor = <BaseActor>model.scene.ctrl.getObj(id);
            if (!obj) {
                return;
            }
            this.resetActor(obj, x, y);
        }

        private resetActor(obj: BaseActor, x: number, y: number): void {
            let curAct = obj.actMgr.curAct;
            if (curAct instanceof MoveAct || curAct instanceof AttackAct) {
                curAct.abort();
            }
            obj.actMgr.removeAllActByCls(MoveAct);
            obj.actMgr.removeAllActByCls(AttackAct);
            obj.checkAct();
            obj.setTilePos(x, y);
        }
    }
}