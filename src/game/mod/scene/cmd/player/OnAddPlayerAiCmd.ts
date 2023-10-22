namespace game.mod.scene {

    import CommonAi = game.scene.CommonAi;
    import Pool = base.Pool;
    import KuafuDoufaAi = game.scene.KuafuDoufaAi;

    /**不同场景类型Ai*/
    export const SceneTypeAi: { [type: number]: any } = {
        [SceneType.KuafuDoufa]: KuafuDoufaAi,
        // [SceneType.JiYuan]: HangUpAi2,
        // [SceneType.Fuben]: HangUpAi2,
    };

    /** 添加客户端AI */
    export class OnAddPlayerAiCmd extends CmdBase {
        exec(n: base.GameNT): void {
            let self = this;
            let _proxy: SceneProxy = self.retProxy(ProxyType.Scene);
            let model = _proxy.getModel();
            let player = model.mainPlayer;
            let ai: CommonAi;
            let cls = SceneTypeAi[_proxy.curSceneType];
            if (cls) {
                ai = Pool.alloc(cls);
            } else {
                ai = Pool.alloc(CommonAi);
            }
            if (ai) player.add(ai);
            model.mainAi = ai;
        }
    }
}