namespace game.mod.pass {

    export class PassMod extends ModBase {

        constructor() {
            super(ModName.Pass);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            let self = this;
            self.regProxy(ProxyType.Pass, PassProxy);
        }

        protected initView(): void {
            super.initView();
            let self = this;
            self.regMdr(PassViewType.PassMain, PassMainMdr);
            self.regMdr(PassViewType.PassRank, PassRankMainMdr);
            self.regMdr(PassViewType.PassGodRank, PassGodRankMdr);
            self.regMdr(PassViewType.WorldMapDetail, WorldMapDetailMdr);
            self.regMdr(PassViewType.WorldMapBox, WorldMapBoxAwdMdr);
            self.regMdr(PassViewType.QiyuanDetail1, QiyuanDetail1Mdr);
            self.regMdr(PassViewType.QiyuanDetail2, QiyuanDetail2Mdr);
            self.regMdr(PassViewType.QiyuanFigth, QiyuanFightMdr);
            self.regMdr(PassViewType.PassBossTip, PassBossTipMdr);
            self.regMdr(PassViewType.Preview, PreviewMainMdr);
        }
    }

    gso.modCls.push(PassMod);
}