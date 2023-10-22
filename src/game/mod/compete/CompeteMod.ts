namespace game.mod.compete {

    export class CompeteMod extends ModBase {
        constructor() {
            super(ModName.Compete);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Compete, CompeteProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(CompeteViewType.CompeteMain, CompeteMainMdr);
            this.regMdr(CompeteViewType.YouliMain, YouliMainMdr);
            this.regMdr(CompeteViewType.YouliAwardMain, YouliAwardMainMdr);
            this.regMdr(CompeteViewType.YouliScoreMain, YouliScoreMainMdr);
            this.regMdr(CompeteViewType.YouliRankMain, YouliRankMainMdr);
            this.regMdr(CompeteViewType.YouliWishBox, YouliWishBoxMdr);
            this.regMdr(CompeteViewType.YouliTreasure, YouliTreasureMdr);
            this.regMdr(CompeteViewType.YouliScoreKiller, YouliScoreKillerMdr);
            this.regMdr(CompeteViewType.YouliSpecialKiller, YouliSpecialKillerMdr);
            this.regMdr(CompeteViewType.YouliKillerFight, YouliKillerFightMdr);
            this.regMdr(CompeteViewType.YouliDati, YouliDatiMdr);
            this.regMdr(CompeteViewType.YouliDatiResult, YouliDatiResultMdr);

            this.regMdr(CompeteViewType.DoufaMain, DoufaMainMdr);
            this.regMdr(CompeteViewType.DoufaVs, DoufaVsMdr);
            this.regMdr(CompeteViewType.DoufaQuickWin, DoufaQuickWinMdr);
            this.regMdr(CompeteViewType.DoufaRewardMain, DoufaRewardMainMdr);
            this.regMdr(CompeteViewType.DoufaRecord, DoufaRecordMdr);
            this.regMdr(CompeteViewType.DoufaRankMain, DoufaRankMainMdr);
            this.regMdr(CompeteViewType.DoufaWin, DoufaWinMdr);
            this.regMdr(CompeteViewType.DoufaFail, DoufaFailMdr);
            this.regMdr(CompeteViewType.DoufaFinals, DoufaFinalsMdr);
            this.regMdr(CompeteViewType.DoufaGuess, DoufaGuessMdr);

            this.regMdr(CompeteViewType.KuafuDoufaAchieve, KuafuDoufaAchieveMdr);
            this.regMdr(CompeteViewType.KuafuDoufaRank, KuafuDoufaRankMdr);
            this.regMdr(CompeteViewType.KuafuDoufaScore, KuafuDoufaScoreMdr);
            this.regMdr(CompeteViewType.KuafuDoufaSkill, KuafuDoufaSkillMdr);
            this.regMdr(CompeteViewType.KuafuDoufaTips, KuafuDoufaTipsMdr);
            this.regMdr(CompeteViewType.KuafuDoufaRankMain, KuafuDoufaRankMainMdr);
            this.regMdr(CompeteViewType.KuafuDoufaScene, KuafuDoufaSceneMdr);
        }
    }

    gso.modCls.push(CompeteMod);
}