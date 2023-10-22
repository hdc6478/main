namespace game.mod.shilian {

    export class ShilianMod extends ModBase {
        constructor() {
            super(ModName.Shilian);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Shilian, ShilianProxy);
            this.regProxy(ProxyType.YuanlingFuben, YuanLingProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(ShilianViewType.ShilianMain, ShilianMainMdr);
            this.regMdr(ShilianViewType.FubenScene, FubenSceneMdr);
            this.regMdr(ShilianViewType.ResultFuben, ResultFubenMdr);
            this.regMdr(ShilianViewType.ForbiddenSaodang, ForbiddenSaodangMdr);
            this.regMdr(ShilianViewType.XiantaScene, XiantaSceneMdr);
            this.regMdr(ShilianViewType.ForbiddenScene, ForbiddenSceneMdr);
            this.regMdr(ShilianViewType.YuanlingScene, YuanLingSceneMdr);
            this.regMdr(ShilianViewType.YuanLingTeam, YuanLingTeamListMdr);
            this.regMdr(ShilianViewType.YuanLingInvite, YuanLingTeamInviteMdr);
            this.regMdr(ShilianViewType.YuanLingBeInvited, YuanLingTeamListInvitedMdr);
            this.regMdr(ShilianViewType.YuanLingResult, YuanLingResultMdr);
            this.regMdr(ShilianViewType.YuanLingReward, YuanLingRewardMdr);
            this.regMdr(ShilianViewType.YuanLingDied, YuanLingSceneDiedMdr);
        }
    }

    gso.modCls.push(ShilianMod);
}