namespace game.mod.boss {

    export class BossMod extends ModBase {
        constructor() {
            super(ModName.Boss);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Boss, BossProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(BossViewType.BossMain, BossMainMdr);
            this.regMdr(BossViewType.BossReward, BossRewardMdr);
            this.regMdr(BossViewType.BossRewardShow, BossRewardShowMdr);
            this.regMdr(BossViewType.CrossBossHurtReward, CrossBossHurtRewardMdr);
            this.regMdr(BossViewType.CrossBossLuckyReward, CrossBossLuckyRewardMdr);
            this.regMdr(BossViewType.CrossBossRankMain, CrossBossRankMainMdr);
            this.regMdr(BossViewType.CrossBossScene, CrossBossSceneMdr);
            this.regMdr(BossViewType.AbyssScene, AbyssSceneMdr);
            this.regMdr(BossViewType.AbyssList, AbyssBossListMdr);
            this.regMdr(BossViewType.AbyssLucky, AbyssLuckyMdr);
            this.regMdr(BossViewType.AbyssTeam, AbyssTeamListMdr);
            this.regMdr(BossViewType.AbyssInvite, AbyssInviteListMdr);
            this.regMdr(BossViewType.AbyssMyTeam, AbyssMyTeamMdr);
            this.regMdr(BossViewType.AbyssNoTeam, AbyssNoTeamMdr);
            this.regMdr(BossViewType.AbyssTips, AbyssTipsMdr);
            this.regMdr(BossViewType.CrossBossTips, CrossBossTipsMdr);
        }
    }

    gso.modCls.push(BossMod)
}