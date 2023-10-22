namespace game.mod.yijie {

    export class YijieMod extends ModBase {
        constructor() {
            super(ModName.Yijie);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Yijie, YijieProxy);
            this.regProxy(ProxyType.Sea, SeaProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(YijieViewType.YijieMain, YijieMainMdr);
            this.regMdr(YijieViewType.YijieScene, YijieSceneMdr);
            this.regMdr(YijieViewType.YijieBoss, YijieBossMdr);
            this.regMdr(YijieViewType.YijieLucky, YijieLuckyMdr);
            this.regMdr(YijieViewType.YijieResult, YijieResultMdr);
            this.regMdr(YijieViewType.YijieResult2, YijieResultMdr);//结算界面用同一个，需要支持弹两次
            this.regMdr(YijieViewType.YijieBossList, YijieBossListMdr);///Boss列表*/

            this.regMdr(YijieViewType.YonghengYijieScene, YonghengYijieSceneMdr);
            this.regMdr(YijieViewType.YonghengYijieOpen, YonghengYijieOpenMdr);

            this.regMdr(YijieViewType.SeaMain, SeaMainMdr);
            this.regMdr(YijieViewType.SeaTask, SeaTaskMdr);
            this.regMdr(YijieViewType.SeaFubenMain, SeaFubenMainMdr);
            this.regMdr(YijieViewType.SeaScene, SeaSceneMdr);
            this.regMdr(YijieViewType.SeaReward, SeaRewardMdr);
            this.regMdr(YijieViewType.SeaBossMain, SeaBossMainMdr);
            this.regMdr(YijieViewType.SeaRankMain, SeaRankMainMdr);
            this.regMdr(YijieViewType.SeaRankSection, SeaRankSectionMdr);
        }
    }

    gso.modCls.push(YijieMod)
}