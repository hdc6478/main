namespace game.mod.shilian {

    import material_item = msg.material_item;
    import forbidden_item = msg.forbidden_item;
    import forbidden_reward_list = msg.forbidden_reward_list;
    import ForbiddenFubenConfig = game.config.ForbiddenFubenConfig;
    import ForbiddenGateConfig = game.config.ForbiddenGateConfig;
    import xiantower_info = msg.xiantower_info;

    export class ShilianModel {
        public infos: material_item[];
        public type: number = FubenType.Type1;
        public lv: number = 0; ///当前层数
        public total_count: number = 0; ///累计奖励数量
        public selType: number;
        public st_lv: number = 0;
        public end_lv: number = 0;
        public typeList: number[] = [FubenType.Type1, FubenType.Type2, FubenType.Type3];//材料副本
        public typeToPropIndex: {[type: number] :number} = {
            [FubenType.Type1] : PropIndex.Zhujuejingyan,//类型映射道具index
            [FubenType.Type2] : PropIndex.Yuanbao,//类型映射道具index
            [FubenType.Type3] : PropIndex.Xianqi,//类型映射道具index
        };
        public challengeHints: string[][] = [
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Fuben, HintType.FubenChallenge1],
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Fuben, HintType.FubenChallenge2],
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Fuben, HintType.FubenChallenge3],
        ];//副本挑战红点
        public resetHints: string[][] = [
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Fuben, HintType.FubenReset1],
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Fuben, HintType.FubenReset2],
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Fuben, HintType.FubenReset3],
        ];//副本重置红点


        /************************** 禁地副本 *************************/
        public fbdTypes: ForbiddenType[] = [ForbiddenType.Type1, ForbiddenType.Type2, 
            ForbiddenType.Type3, ForbiddenType.Type4, ForbiddenType.Type5];         // 固定5个禁地副本类型id
        public curFbdType: ForbiddenType;                                           // 当前选中的类型
        public curFbdBigGateId: number;                                                // 当前选中的大关卡id
        public fbdInfos: {[type: string]: forbidden_item} = {};                     // 基本信息
        public fbdAwds: {[type: string]: {[bigGateId: string]: forbidden_reward_list[]}} = {};  // 通关大奖（只含可领取的）
        public hasDrawAwds: {[bigGateId: number]: number[]} = {};  // 通关大奖（已领取的，存的是大关卡ID：小关卡ID数组）
        public fbdFubenCfg: {[type: string]: {[bigGateId: string]: ForbiddenFubenConfig}} = {};          // 禁地副本配置
        public fbdFirstFubenCfg: {[type: string]: ForbiddenFubenConfig} = {};       // 每类型的第一个禁地副本配置
        public fbdGateEndCfg: {[type: string]: ForbiddenGateConfig} = {};           // 禁地副本每大关的最后一小关配置（扫荡用）
        public fbdHint: string[] = [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Forbidden];  //禁地入口、标签页红点

        /********************************仙塔副本*********************************/
        public selXiantaType: number;
        public xiantaInfos:xiantower_info[];
        public xiantaTypeList: number[] = [RankType.Type1, RankType.Type2, RankType.Type3];//仙塔副本
        public xiantaChallengeHints: string[][] = [
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaChallenge1],
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaChallenge2],
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaChallenge3],
        ];//副本挑战红点
        public xiantaSweepHints: string[][] = [
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaSweep1],
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaSweep2],
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaSweep3],
        ];//副本扫荡红点
        public xiantaRewardHints: string[][] = [
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaReward1],
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaReward2],
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaReward3],
        ];//副本奖励红点
        public xiantaRankHints: string[][] = [
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaRank1],
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaRank2],
            [ModName.Shilian, ShilianViewType.ShilianMain + ShilianMainBtnType.Xianta, HintType.XiantaRank3],
        ];//副本大神榜奖励红点

    }
}