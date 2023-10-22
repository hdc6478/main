namespace game.mod.xianyuan {

    export class XianyuanMod extends ModBase {
        constructor() {
            super(ModName.Xianyuan);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Xianlv, XianlvProxy);
            this.regProxy(ProxyType.Child, ChildProxy);
            this.regProxy(ProxyType.Ring, RingProxy);
            this.regProxy(ProxyType.XianlvShilian, XianlvShilianProxy);
            this.regProxy(ProxyType.XianlvDoufa, XianlvDoufaProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(XianyuanViewType.Xianlv, XianlvMainMdr);
            this.regMdr(XianyuanViewType.AttrView, XianlvAttrMdr);
            this.regMdr(XianyuanViewType.InviteRecord, XianlvInviteRecordMdr);
            this.regMdr(XianyuanViewType.InviteAdd, XianlvInviteAddMdr);
            this.regMdr(XianyuanViewType.Zhaohuan, XianlvZhaohuanMdr);
            this.regMdr(XianyuanViewType.Breakup, XianlvBreakupMdr);
            this.regMdr(XianyuanViewType.ChildMain, ChildMainMdr);
            this.regMdr(XianyuanViewType.SkillConditionTips, SkillConditionTipsMdr);
            this.regMdr(XianyuanViewType.ChildShangzhen, ChildShangzhenMdr);
            this.regMdr(XianyuanViewType.ChildHuanzhuang, ChildHuanzhuangMdr);
            this.regMdr(XianyuanViewType.ChildSkillTips, ChildSkillTipsMdr);
            this.regMdr(XianyuanViewType.RingMain, RingMainMdr);
            this.regMdr(XianyuanViewType.ShilianSaodang, ShilianSaodangMdr);
            this.regMdr(XianyuanViewType.ShilianScene, ShilianSceneMdr);
            this.regMdr(XianyuanViewType.ShilianResult, ShilianResultMdr);
            this.regMdr(XianyuanViewType.ShilianRank, ShilianRankMainMdr);
            this.regMdr(XianyuanViewType.ShilianRankReward, ShilianRankRewardMdr);

            this.regMdr(XianyuanViewType.XianlvDoufaWin, XianlvDoufaWinMdr);
            this.regMdr(XianyuanViewType.XianlvDoufaFail, XianlvDoufaFailMdr);
            this.regMdr(XianyuanViewType.XianlvDoufaRank, XianlvDoufaRankMainMdr);
            this.regMdr(XianyuanViewType.XianlvDoufaSection, XianlvDoufaSectionMdr);
            this.regMdr(XianyuanViewType.XianlvDoufaTips, XianlvDoufaTipsMdr);
            this.regMdr(XianyuanViewType.XianlvDoufaScene, XianlvDoufaSceneMdr);

            this.regMdr(XianyuanViewType.RingGiftTips, RingGiftTipsMdr);
        }
    }

    gso.modCls.push(XianyuanMod);
}