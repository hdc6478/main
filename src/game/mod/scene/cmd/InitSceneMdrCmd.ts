namespace game.mod.scene {
    export class InitSceneMdrCmd extends CmdBase {
        exec(n: base.GameNT): void {
            super.exec(n);
            this.owner.unregCmd(SceneEvent.INIT_SCENE_MDR);
            LogUtil.printLogin("创建场景mdr SceneMdr");
            new SceneMdr();
        }
    }
}