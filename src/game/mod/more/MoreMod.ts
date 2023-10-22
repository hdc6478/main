namespace game.mod.more {

    export class MoreMod extends ModBase {
        constructor() {
            super(ModName.More);
        }

        protected initCmd(): void {
            super.initCmd();
        }

        protected initModel(): void {
            super.initModel();
            this.regProxy(ProxyType.Achieve, AchieveProxy);
            this.regProxy(ProxyType.Huashen, HuashenProxy);
            this.regProxy(ProxyType.SkyPalace, SkyPalaceProxy);
            this.regProxy(ProxyType.Zhandui, ZhanduiProxy);
            this.regProxy(ProxyType.XujieJitan, XujieJitanProxy);
            this.regProxy(ProxyType.Mining, MiningProxy);
            this.regProxy(ProxyType.Huanggu, HuangguProxy);
            this.regProxy(ProxyType.XujieTansuo, XujieTansuoProxy);
            this.regProxy(ProxyType.Fengmo, FengmoProxy);
            this.regProxy(ProxyType.GoddessRecord, GoddessRecordProxy);
            this.regProxy(ProxyType.Xiandi, XiandiProxy);
            this.regProxy(ProxyType.Xianmai, XianmaiProxy);
            this.regProxy(ProxyType.Huanjing, HuanjingProxy);
            this.regProxy(ProxyType.CrossUnion, CrossUnionProxy);
            this.regProxy(ProxyType.CrossUnionFight, CrossUnionFightProxy);
            this.regProxy(ProxyType.XianjieLuandou, XianjieLuandouProxy);
            this.regProxy(ProxyType.Xianwei, XianweiProxy);
            this.regProxy(ProxyType.Honour, HonourProxy);
        }

        protected initView(): void {
            super.initView();
            this.regMdr(MoreViewType.AchieveMain, AchieveMainMdr);
            this.regMdr(MoreViewType.HuashenMain, HuashenMainMdr);
            this.regMdr(MoreViewType.HuashenOpenMain, HuashenOpenMainMdr);
            this.regMdr(MoreViewType.HuashenBattleMain, HuashenBattleMainMdr);
            this.regMdr(MoreViewType.SkyPalace, SkyPalaceMainMdr);
            this.regMdr(MoreViewType.ArtifactBuwei, ArtifactBuweiTipsMdr);
            this.regMdr(MoreViewType.ArtifactBuff, ArtifactBuffTipsMdr);
            this.regMdr(MoreViewType.ArtifactTips, ArtifactTipsMdr);
            this.regMdr(MoreViewType.HuashenZhilu, HuashenZhiluMdr);
            //战队
            this.regMdr(MoreViewType.ZhanshendianMain, ZhanshendianMainMdr);
            this.regMdr(MoreViewType.ZhanduiBuildMain, ZhanduiBuildMainMdr);
            this.regMdr(MoreViewType.ZhanduiCreate, ZhanduiCreateMdr);
            this.regMdr(MoreViewType.ZhanduiJoin, ZhanduiJoinMdr);
            this.regMdr(MoreViewType.ZhanduiMain, ZhanduiMainMdr);
            this.regMdr(MoreViewType.ZhanduiRename, ZhanduiRenameMdr);
            this.regMdr(MoreViewType.ZhanduiInviteList, ZhanduiInviteListMdr);
            this.regMdr(MoreViewType.ZhanduiLevelSecondMainMdr, ZhanduiLevelSecondMainMdr);
            this.regMdr(MoreViewType.ZhanduiTeammateCheck, ZhanduiTeammateCheckMdr);
            this.regMdr(MoreViewType.ZhanduiXianjiMain, ZhanduiXianjiMainMdr);
            //墟界祭坛
            this.regMdr(MoreViewType.XujieJitanMain, XujieJitanMainMdr);
            this.regMdr(MoreViewType.XujieJitanGiftMain, XujieJitanGiftMainMdr);
            this.regMdr(MoreViewType.XujieJitanHuanhua, XujieJitanHuanhuaMdr);
            this.regMdr(MoreViewType.XujieJitanSpeedUp, XujieJitanSpeedUpMdr);
            this.regMdr(MoreViewType.XujieJitanShelf, XujieJitanShelfMdr);
            //墟界探索
            this.regMdr(MoreViewType.XujieTansuoMain, XujieTansuoMainMdr);
            this.regMdr(MoreViewType.XujieTansuoRankMain, XujieTansuoRankMainMdr);
            this.regMdr(MoreViewType.XujieTansuoLayerMain, XujieTansuoLayerMainMdr);
            this.regMdr(MoreViewType.XujieTansuoZhanlipin, XujieTansuoZhanlipinMdr);
            this.regMdr(MoreViewType.XujieTansuoRankSection, XujieTansuoRankSectionMdr);
            this.regMdr(MoreViewType.XujieTansuoBusinessGrid, XujieTansuoBusinessGridMdr);
            this.regMdr(MoreViewType.XujieTansuoRewardGrid, XujieTansuoRewardGridMdr);
            this.regMdr(MoreViewType.XujieTansuoExpeditionGrid, XujieTansuoExpeditionGridMdr);
            this.regMdr(MoreViewType.XujieTansuoExpeditionShenLing, XujieTansuoExpeditionShenLingMdr);
            this.regMdr(MoreViewType.XujieTansuoBossGrid, XujieTansuoBossGridMdr);
            this.regMdr(MoreViewType.XujieTansuoZhanbao, XujieTansuoZhanbaoMdr);
            this.regMdr(MoreViewType.XujieTansuoSaodang, XujieTansuoSaodangMdr);
            this.regMdr(MoreViewType.XujieTansuoSceneResult, XujieTansuoSceneResultMdr);
            this.regMdr(MoreViewType.XujieTansuoSceneResultKill, XujieTansuoSceneResultKillMdr);
            this.regMdr(MoreViewType.XujieTansuoSceneResultFail, XujieTansuoSceneResultFailMdr);
            this.regMdr(MoreViewType.TBSFight, TBSFightMdr);
            this.regMdr(MoreViewType.Zhenrong, ZhenrongMdr);
            this.regMdr(MoreViewType.ZhenrongShangzhen, ZhenrongShangzhenSecondMainMdr);
            this.regMdr(MoreViewType.ZhenrongAttr, ZhenrongAttrMdr);

            this.regMdr(MoreViewType.HuangguMain, HuangguMainMdr);
            this.regMdr(MoreViewType.GoddessMain, GoddessMainMdr);
            this.regMdr(MoreViewType.GoddessAttr, GoddessAttrMdr);
            this.regMdr(MoreViewType.GoddessGod, GoddessGodMdr);
            this.regMdr(MoreViewType.GoddessSummon, GoddessSummonMdr);
            this.regMdr(MoreViewType.RewardShow, RewardShowMdr);
            this.regMdr(MoreViewType.GoddessTargetMain, GoddessTargetMainMdr);
            this.regMdr(MoreViewType.GoddessChat, GoddessChatMdr);
            this.regMdr(MoreViewType.GoddessEvent, GoddessEventMdr);
            this.regMdr(MoreViewType.GoddessEventChallenge, GoddessEventChallengeMdr);
            this.regMdr(MoreViewType.EventChat, EventChatMdr);

            this.regMdr(MoreViewType.MiningMain, MiningMainMdr);
            this.regMdr(MoreViewType.MiningTips, MiningTipsMdr);
            this.regMdr(MoreViewType.MiningSave, MiningSaveMdr);
            this.regMdr(MoreViewType.MiningFight, MiningFightListMdr);
            this.regMdr(MoreViewType.MiningLingbao, MiningLingbaoMdr);
            this.regMdr(MoreViewType.MiningGift, MiningGiftMdr);
            this.regMdr(MoreViewType.MiningBuy, MiningBuyCntMdr);
            this.regMdr(MoreViewType.MiningResultWin, MiningResultWinMdr);
            this.regMdr(MoreViewType.MiningResultFail, MiningResultFailMdr);

            this.regMdr(MoreViewType.GoddessRecordMain, GoddessRecordMainMdr);
            this.regMdr(MoreViewType.TimeGoddessMain, TimeGoddessMainMdr);
            this.regMdr(MoreViewType.TimeGoddessEvent, TimeGoddessEventMdr);
            this.regMdr(MoreViewType.TimeGoddessEventChallenge, TimeGoddessEventChallengeMdr);
            this.regMdr(MoreViewType.TimeGoddessChat, TimeGoddessChatMdr);
            this.regMdr(MoreViewType.TimeGoddessShelf, TimeGoddessShelfMdr);
            this.regMdr(MoreViewType.TimeGoddessSpeedUp, TimeGoddessSpeedUpMdr);
            this.regMdr(MoreViewType.TimeGoddessSummon, TimeGoddessSummonMdr);
            this.regMdr(MoreViewType.HunkaMain, HunkaMainMdr);
            this.regMdr(MoreViewType.HunkaTypeMain, HunkaTypeMainMdr);
            this.regMdr(MoreViewType.HunkaGongming, HunkaGongmingMdr);
            this.regMdr(MoreViewType.HunkaBag, HunkaBagMdr);
            this.regMdr(MoreViewType.HunkaTips, HunkaTipsMdr);
            this.regMdr(MoreViewType.HunkaOneKeyCompose, HunkaOneKeyComposeMdr);
            this.regMdr(MoreViewType.HunkaComposeTips, HunkaComposeTipsMdr);

            this.regMdr(MoreViewType.Fengmo, FengmoMainMdr);
            this.regMdr(MoreViewType.FengmoHurtReward, FengmoHurtRewardMdr);
            this.regMdr(MoreViewType.FengmoRank, FengmoRankMainMdr);
            this.regMdr(MoreViewType.FengmoRankTips, FengmoSectionMdr);
            this.regMdr(MoreViewType.FengmoFight, FengmoFightMdr);
            this.regMdr(MoreViewType.FengmoResult, FengmoResultWinMdr);
            this.regMdr(MoreViewType.FengmoScene, FengmoSceneMdr);

            this.regMdr(MoreViewType.XianmaiMain, XianmaiMainMdr);
            this.regMdr(MoreViewType.XianmaiZhanbao, XianmaiZhanbaoMdr);
            this.regMdr(MoreViewType.XianmaiResult, XianmaiResultMdr);
            this.regMdr(MoreViewType.XianmaiList, XianmaiListMdr);
            this.regMdr(MoreViewType.XianmaiItemTips, XianmaiItemTipsMdr);
            this.regMdr(MoreViewType.XianmaiSelect, XianmaiSelectMdr);
            this.regMdr(MoreViewType.XianmaiItemTipsOnekey, XianmaiItemTipsOnekeyMdr);
            this.regMdr(MoreViewType.XianmaiItemTipsMine, XianmaiItemTipsMineMdr);
            this.regMdr(MoreViewType.XianmaiRank, XianmaiRanMainMdr);
            this.regMdr(MoreViewType.XianmaiFight, XianmaiFightMdr);
            this.regMdr(MoreViewType.XianmaiFightSuccess, XianmaiFightSuccessMdr);
            this.regMdr(MoreViewType.XianmaiFightFail, XianmaiFightFailMdr);
            this.regMdr(MoreViewType.XianmaiRankSectionTips, XianmaiRankSectionMdr);//区间排行榜

            this.regMdr(MoreViewType.XiandiHouse, XiandiHouseMainMdr);
            this.regMdr(MoreViewType.XiandiTips, XiandiTipsMdr);
            this.regMdr(MoreViewType.XiandiSkill, XiandiSkillTipsMdr);
            this.regMdr(MoreViewType.XiandiGodress, XiandiGodressMainMdr);
            this.regMdr(MoreViewType.Xiandi, XiandiMainMdr);
            this.regMdr(MoreViewType.XiandiShow, XiandiShowMainMdr);
            this.regMdr(MoreViewType.XiandiList, XiandiListMdr);
            this.regMdr(MoreViewType.XiandiRank, XiandiRankMainMdr);
            this.regMdr(MoreViewType.XiandiInfo, XiandiInfoMdr);
            this.regMdr(MoreViewType.XiandiSection, XiandiSectionMdr);
            this.regMdr(MoreViewType.XiandiGift, XiandiGiftMdr);
            this.regMdr(MoreViewType.XiandiTreasure, XiandiTreasureMainMdr);
            this.regMdr(MoreViewType.XiandiWeapon, XiandiWeaponMainMdr);
            this.regMdr(MoreViewType.XiandiStage, XiandiStageMdr);
            this.regMdr(MoreViewType.XiandiShilian, XiandiShilianMdr);

            this.regMdr(MoreViewType.CommonMatch, CommonMatchMdr);

            this.regMdr(MoreViewType.HuanjingMain, HuanjingMainMdr);
            this.regMdr(MoreViewType.HuanjingGrowMain, HuanjingGrowMainMdr);
            this.regMdr(MoreViewType.HuanjingStage, HuanjingStageMdr);
            this.regMdr(MoreViewType.HuanjingStageSkillTips, HuanjingStageSkillTipsMdr);
            this.regMdr(MoreViewType.HuanjingStar, HuanjingStarMdr);
            this.regMdr(MoreViewType.HuanjingHuanling, HuanjingHuanlingMdr);
            this.regMdr(MoreViewType.HuanjingZhushen, HuanjingZhushenMdr);
            this.regMdr(MoreViewType.HuanjingCollectMain, HuanjingCollectMainMdr);
            this.regMdr(MoreViewType.HuanjingZhushenSkillTips, HuanjingZhushenSkillTipsMdr);
            this.regMdr(MoreViewType.HuanjingHuanlingSkillTips, HuanjingHuanlingSkillTipsMdr);
            this.regMdr(MoreViewType.HuanjingStarStageTips, HuanjingStarStageTipsMdr);
            this.regMdr(MoreViewType.HuanjingStarSkillTips, HuanjingStarSkillTipsMdr);
            this.regMdr(MoreViewType.HuanjingCollectItemTips, HuanjingCollectItemTipsMdr);

            this.regMdr(MoreViewType.CrossUnion, CrossUnionMainMdr);
            this.regMdr(MoreViewType.CrossUnionReady, CrossUnionReadyMainMdr);
            this.regMdr(MoreViewType.CrossUnionTeam, CrossUnionTeamMdr);
            this.regMdr(MoreViewType.CrossUnionFormat, CrossUnionFormatMdr);
            this.regMdr(MoreViewType.CrossUnionSkill, CrossUnionSkillTipsMdr);
            this.regMdr(MoreViewType.CrossUnionReward, CrossUnionRewardMdr);
            this.regMdr(MoreViewType.CrossUnionScene, CrossUnionSceneMdr);
            this.regMdr(MoreViewType.CrossUnionInfo, CrossUnionResultMdr);
            this.regMdr(MoreViewType.CrossUnionWin, CrossUnionWinMdr);
            this.regMdr(MoreViewType.CrossUnionZhanbao, CrossUnionZhanbaoMdr);

            this.regMdr(MoreViewType.XianjieLuandouMain, XianjieLuandouMainMdr);
            this.regMdr(MoreViewType.XianjieLuandouRankMain, XianjieLuandouRankMainMdr);
            this.regMdr(MoreViewType.XianjieLuandouScene, XianjieLuandouSceneMdr);
            this.regMdr(MoreViewType.XianjieLuandouRankSection, XianjieLuandouRankSectionMdr);
            this.regMdr(MoreViewType.XianjieLuandouScoreReward, XianjieLuandouScoreRewardMdr);
            this.regMdr(MoreViewType.XianjieLuandouSkill, XianjieLuandouSkillMdr);
            this.regMdr(MoreViewType.XianjieLuandouZhanbao, XianjieLuandouZhanbaoMdr);
            this.regMdr(MoreViewType.XianjieLuandouStatistic, XianjieLuandouStatisticMdr);
            this.regMdr(MoreViewType.XianjieLuandouSkillTips, XianjieLuandouSkillTipsMdr);
            this.regMdr(MoreViewType.XianjieLuandouBossTips, XianjieLuandouBossTipsMdr);

            this.regMdr(MoreViewType.Xianwei, XianweiMainMdr);
            this.regMdr(MoreViewType.XianweiList, XianweiListMdr);
            this.regMdr(MoreViewType.XianweiTips, XianweiTipsMdr);
            this.regMdr(MoreViewType.XianweiRank, XianweiRankMainMdr);
            this.regMdr(MoreViewType.XianweiSection, XianweiSectionMdr);
            this.regMdr(MoreViewType.XianweiProp, XianweiPropMdr);
        }
    }

    gso.modCls.push(MoreMod);
}