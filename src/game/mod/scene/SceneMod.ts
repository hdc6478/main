namespace game.mod.scene {

    export class SceneMod extends ModBase {
        constructor() {
            super(ModName.Scene);
        }

        protected initCmd(): void {
            let self = this;
            self.regCmd(SceneEvent.INIT_SCENE_MDR, InitSceneMdrCmd);
            self.regCmd(SceneEvent.LOAD_SCENE_CFG, LoadCfgCmd);
            self.regCmd(SceneEvent.ON_SCENE_READY, OnSceneReadyCmd);
            self.regCmd(SceneEvent.ON_SCENE_ENTER, OnSceneEnterCmd);
            self.regCmd(SceneEvent.ON_SCENE_CLICK, OnSceneClickCmd);
            self.initPlayerCmd();
            self.initNpcCmd();
        }

        protected initModel(): void {
            let self = this;
            self.regProxy(ProxyType.Scene, SceneProxy);
        }

        protected initView(): void {
            super.initView();
            let self = this;

            self.regMdr(SceneViewType.RoleRevive, RoleReviveMdr);

            self.regMdr(SceneViewType.PvpFight, PvpFightMdr);/**PVP界面*/
            self.regMdr(SceneViewType.PvpFightEnter, PvpFightEnterMdr);/**PVP界面进场*/
            self.regMdr(SceneViewType.BigBossHp, BigBossHpMdr);/**boss血量提示*/
            self.regMdr(SceneViewType.ChallengeTips, ChallengeTipsMdr);/**挑战提示，第几层*/
            self.regMdr(SceneViewType.Belong, BelongPlayerMdr);/**归属玩家*/
            self.regMdr(SceneViewType.Enemy, EnemyMdr);/**敌人列表*/
        }

        private initPlayerCmd() {
            let self = this;
            self.regCmd(SceneEvent.ON_RESET_PLAYER_PT, OnResetPlayerPtCmd);
            self.regCmd(SceneEvent.ON_TAP_SKILL, OnTapSkillCmd);
            self.regCmd(SceneEvent.ON_ADD_PLAYER_AI, OnAddPlayerAiCmd);
            self.regCmd(SceneEvent.ON_AUTO_HANG_UP_UPDATE, AutoHangUpChangedCmd);
        }

        private initNpcCmd() {
            let self = this;
            self.regCmd(SceneEvent.ON_DEL_CLIENT_NPC, OnDelClientNpcCmd);
            self.regCmd(SceneEvent.ON_ADD_CLIENT_NPC, OnAddClientNpcCmd);
            self.regCmd(SceneEvent.ON_CLEAR_CLIENT_NPC, OnClearClientNpcCmd);
        }
    }

    gso.modCls.push(SceneMod);
}
