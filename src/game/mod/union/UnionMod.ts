namespace game.mod.union {

    export class UnionMod extends ModBase {
        constructor() {
            super(ModName.Union);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Union, UnionProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(UnionMainType.UnionIn, UnionInMainMdr);
            this.regMdr(UnionMainType.UnionApply, UnionApplyListMdr);//申请列表弹窗
            this.regMdr(UnionMainType.UnionMember, UnionMemberPopupMdr);//成员信息弹窗
            this.regMdr(UnionMainType.UnionDonate, UnionDonateMdr);//宗门捐献弹窗
            this.regMdr(UnionMainType.UnionWage, UnionWageMdr);//每日俸禄弹窗
            this.regMdr(UnionMainType.UnionRename, UnionRenameMdr);//改名弹窗
            this.regMdr(UnionMainType.UnionHeroShop, UnionShopMainMdr);//仙尊秘宝
            this.regMdr(UnionMainType.UnionHero, UnionSetHeroMdr);//设置仙尊
            this.regMdr(UnionMainType.UnionWelcome, UnionFirstMdr);//首次加入欢迎界面
            this.regMdr(UnionMainType.UnionRankReward, UnionRankTipsMdr);//排行榜结算领取奖励

            // --------------------建筑功能界面--------------------
            this.regMdr(UnionMainType.UnionWelfare, UnionWelfareMainMdr);//福利大厅
            this.regMdr(UnionMainType.UnionLottery, UnionLotteryMainMdr);//天坛/圣坛
            this.regMdr(UnionMainType.UnionLotteryReward, UnionLotteryRewardMdr);//圣坛更多大奖
            this.regMdr(UnionMainType.UnionTreasure, UnionTreasureMainMdr);//遗宝
            this.regMdr(UnionMainType.UnionTreasureRank, UnionTreasureRankMainMdr);//遗宝
            this.regMdr(UnionMainType.UnionTreasureHelp, UnionTreasureHelpMdr);//遗宝
            this.regMdr(UnionMainType.UnionTreasureReward, UnionTreasureRewardMdr);//遗宝
            this.regMdr(UnionMainType.UnionKill, UnionKillMainMdr);//斩妖台
            this.regMdr(UnionMainType.UnionKillRank, UnionKillRankMainMdr);//斩妖台
            this.regMdr(UnionMainType.UnionKillTips, UnionKillTipsMdr);//斩妖台
            this.regMdr(UnionMainType.UnionRankTips, UnionRankSectionMdr);//区间排行
            this.regMdr(UnionMainType.UnionFight, UnionFightMdr);//假战斗
            this.regMdr(UnionMainType.UnionStorage, UnionStorageMainMdr);//仓库
            this.regMdr(UnionMainType.UnionDonateEquip, UnionDonateEquipMdr);//仓库捐献
            this.regMdr(UnionMainType.UnionStoreTips, UnionStoreTipsMdr);//宗门宝库仙玉兑换
            this.regMdr(UnionMainType.UnionBook, UnionBookMainMdr);//书斋
            this.regMdr(UnionMainType.UnionBeast, UnionBeastMainMdr);//仙兽
            this.regMdr(UnionMainType.UnionBeastReward, UnionBeastRewardMdr);//仙兽周奖
            this.regMdr(UnionMainType.UnionBeastRank, UnionBeastRankMainMdr);//仙兽排行
            this.regMdr(UnionMainType.UnionBeastRing, UnionBeastBuffTipsMdr);//仙兽光环
            this.regMdr(UnionMainType.UnionRecycle, UnionRecycleMdr);//仓库回收
            this.regMdr(UnionMainType.UnionBookUpTips, UnionBookUpTipsMdr);//书斋升阶提示
            this.regMdr(UnionMainType.UnionBookUpTips2, UnionBookUpTipsMdr2);//书斋升阶提示
        }
    }

    gso.modCls.push(UnionMod);
}