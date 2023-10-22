namespace game.mod.compete {

    import tour_role_info = msg.tour_role_info;
    import common_reward_status = msg.common_reward_status;
    import s2c_city_war_fight_update = msg.s2c_city_war_fight_update;
    import s2c_pvp_battle_base_info = msg.s2c_pvp_battle_base_info;
    import pvp_battle_pk_data = msg.pvp_battle_pk_data;
    import teammate = msg.teammate;
    import pvp_battle_group_pk = msg.pvp_battle_group_pk;
    import tour_wish_reward_status = msg.tour_wish_reward_status;
    import TourpvpDatiConfig = game.config.TourpvpDatiConfig;
    import DoufaJifenConfig = game.config.DoufaJifenConfig;
    import s2c_scene_kill_notice = msg.s2c_scene_kill_notice;

    export class CompeteModel {

        // 主界面
        public curBuyCnt: number; // 今日已购买次数
        public curFightTimes: number; // 已挑战次数
        public nextFightTime: number; // 下次挑战次数恢复1次的时间
        public rankEndTime: number; // 排行榜结束时间戳
        public topRank: {[rank: string]: tour_role_info} = {};
        public type: YouliType; // 玩法类型，0 正常 1 宝箱  2宝藏 3异形 4杀手
        public giftIndex: number; // 奖励宝藏对应的礼包id
        public youliWinCnt: number = 0; // 今日胜利次数
        public youliWinList: number[] = [];// 今日已领取胜利奖励

        // 阶段奖励
        public challengeCnt: number = 0; // 累计完成游历次数
        public stepAwards: {[idx: string]: common_reward_status} = {}; // 可领取、已领取的阶段奖励列表

        // 积分福利
        public dayScore: number = 0; // 今日获得的分数
        public scoreAwards: {[idx: string]: common_reward_status} = {}; // 可领取、已领取的积分奖励列表

        // 许愿宝箱
        public wishBoxAwardArr: tour_wish_reward_status[] = []; // 已领取的许愿奖励列表

        // 游历玩法
        public fightData: s2c_city_war_fight_update; // 异形、积分杀手战斗数据

        public youliHint: string[] = [ModName.Compete, CompeteViewType.CompeteMain, CompeteMainBtnType.Youli];  //入口、标签页红点
        public youliChallengeHint: string[] = [ModName.Compete, CompeteViewType.CompeteMain, CompeteMainBtnType.Youli, HintType.YouliChallenge];//挑战红点

        public datiCfg: TourpvpDatiConfig;

        /************************** 斗法 *************************/
        public info: s2c_pvp_battle_base_info;
        public recordList: pvp_battle_pk_data[];
        public rankList1: teammate[] = [];
        public topInfo1: teammate;
        public endTime1: number = 0;
        public rankList2: teammate[] = [];
        public topInfo2: teammate;
        public endTime2: number = 0;
        public rankList3: teammate[] = [];
        public topInfo3: teammate;
        public endTime3: number = 0;
        public challengeHint: string[] = [ModName.Compete, CompeteViewType.CompeteMain, CompeteMainBtnType.Doufa, HintType.DoufaChallenge];//挑战匹配红点
        public rewardHint: string[] = [ModName.Compete, CompeteViewType.CompeteMain, CompeteMainBtnType.Doufa, HintType.DoufaReward];//阶段奖励红点
        public winRewardHint: string[] = [ModName.Compete, CompeteViewType.CompeteMain, CompeteMainBtnType.Doufa, HintType.DoufaWinReward];//连胜奖励红点
        public rewardCostIndexs: string[] = [];//阶段奖励购买时消耗的道具,角色身上属性字段
        public auto: boolean = false;//自动挑战
        public groupStatus: number = DoufaGroupStatus.Score;
        public groupTime: number;//小组赛决赛开启时间
        public groupList: pvp_battle_group_pk[];//小组信息列表
        public guessList: Long[];//已竞猜的列表

        /************************** 跨服斗法 *************************/
        public state: number = KuafuDoufaState.End;
        public hasEnroll: boolean = false;
        public leftCnt: number = 0;
        public isJoin: boolean = false;
        public rankList: {[type: number] : teammate[]} = {};
        public myRank: {[type: number] : teammate} = {};
        public scoreList: number[]= [];
        public myScore: number = 0;
        public redCampScore: number = 0;
        public redCampNum: number = 0;
        public blueCampScore: number = 0;
        public blueCampNum: number = 0;
        public bossHpInfos: {[index: number]: number} = {};
        public attackStatus: number = KuafuDoufaAttackStatus.Attack;
        public noticeList: s2c_scene_kill_notice[] = [];
        public taskHint: string[] = [ModName.Compete, CompeteViewType.CompeteMain, CompeteMainBtnType.KuafuDoufa];
        public taskHint2: string[] = [ModName.More, MoreViewType.HuangguMain, HuangguMainBtnType.Huanggu, MoreViewType.KuafuDoufa];//荒古入口也设置下
        public idx_cds: { [index: number]: msg.kuafudoufa_scene_buff_index_cd } = {};
    }

    export interface KuafuScoreData {
        cfg: DoufaJifenConfig;
        status: RewardStatus
    }

}