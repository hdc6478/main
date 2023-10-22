namespace game.mod.rank {

    export class RankMod extends ModBase {
        constructor() {
            super(ModName.Rank);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Rank, RankProxy);
            this.regProxy(ProxyType.NewRank, NewRankProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(RankViewType.RankMain, RankMainMdr);
            this.regMdr(RankViewType.RankGod, RankGodMdr);
            this.regMdr(RankViewType.NewRankMain, NewRankMainMdr);//主界面上方排行榜按钮
            this.regMdr(RankViewType.NewRankGod, NewRankGodMdr);//主界面上方排行榜按钮
        }
    }

    gso.modCls.push(RankMod);
}