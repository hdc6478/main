namespace game.mod.misc {
    import GameNT = base.GameNT;

    export class GameConnectLostCmd extends CmdBase {
        public exec(n: GameNT): void {
            this.sendNt(MiscEvent.STOP_SYNC_TIME);
            let data: CleanSceneData = {clearAll: true};
            this.sendNt(SceneEvent.CLEAN_SCENE, data);
        }

    }
}