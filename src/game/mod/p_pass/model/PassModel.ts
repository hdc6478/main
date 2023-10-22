namespace game.mod.pass {

    import WorldmapConfig = game.config.WorldmapConfig;
    import mainline_rank_award_info = msg.mainline_rank_award_info;
    import mainline_topthree_info = msg.mainline_topthree_info;
    import qiyuan_raid_data = msg.qiyuan_raid_data;

    export class PassModel {

        /** 当前关卡id */
        public curIndex: number;
        public maxMainlineIdx: number;      // 最大关卡id

        public curChallengeIdx: number; // 当前场景打的关卡

        public targetWaveCnt: number; // 目标击杀小怪
        public nowWaveCnt: number;    // 已击杀小怪

        public passIsAuto: boolean = false; // 是否自动闯关

        public worldMapAwardGotIds: number[] = [];     // 已领取过奖励的世界地图 index 列表
        public worldMapTopInfos: { [idx: string]: mainline_topthree_info[] } = {};  // 世界地图详情
        public worldMapCurTaskId: number = 0;           // 当前点击的奇缘任务

        public curWorldMapCfg: WorldmapConfig;      // 当前章节的世界地图配置
        public curTotalStep: number = 0;           // 当前章节的总关卡数
        public startIdx: number = 0;                // 当前章节开始关卡id
        public endIdx: number = 0;                  // 当前章节结束关卡id

        public godRankInfos: { [idx: string]: mainline_rank_award_info } = {};        // 大神榜数据
        public godRankAwdGotIds: number[] = [];        // 已领取过奖励的大神榜 index 列表

        public qyFbFinishIds: number[] = [];            // 已完成的副本类型的奇缘 index 列表
        public qyFbTotalAwdCnt: number = 0;             // 奇缘副本奖励总数
        public qyFbGotsAwdCnt: number = 0;              // 奇缘副本已获得的奖励总数

        public WMBoxRewardHint: string[] = [ModName.Pass, PassViewType.PassMain + PassMainBtnType.WorldMap, HintType.PassWorldMapBox];  //世界地图宝箱奖励红点

        public get curStep(): number {
            return RoleUtil.calcGuanqia(this.curIndex);
        }

        public challengeBoss: boolean = false;//挑战boss标志

        public list: qiyuan_raid_data[];

        public indexs: number[] = [];
        public index: number = 0;
    }
}