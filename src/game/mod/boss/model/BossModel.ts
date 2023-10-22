namespace game.mod.boss {

    import new_vip_boss = msg.new_vip_boss;
    import NewVipBossFubenConfig = game.config.NewVipBossFubenConfig;
    import NewVipBossConfig = game.config.NewVipBossConfig;
    import NewMultipleBossConfig = game.config.NewMultipleBossConfig;
    import new_multiple_boss_data = msg.new_multiple_boss_data;
    import single_boss = msg.single_boss;
    import s2c_new_cross_boss = msg.s2c_new_cross_boss;
    import CrossBossConfig = game.config.CrossBossConfig;
    import s2c_new_cross_boss_scene = msg.s2c_new_cross_boss_scene;
    import common_reward_status = msg.common_reward_status;
    import zhuimo_boss_data = msg.zhuimo_boss_data;
    import teammate = msg.teammate;
    import zhuimo_army_data = msg.zhuimo_army_data;
    import s2c_new_cross_boss_ranks_list = msg.s2c_new_cross_boss_ranks_list;

    export class BossModel {
        public bossCfgs: { [type: number]: NewMultipleBossConfig[] };//type从0开始计算
        /**boss信息*/
        public bossInfos: new_multiple_boss_data[];
        /**boss挑战次数*/
        public bossCount: number = 0;
        /**boss次数恢复时间戳*/
        public bossTime: number;
        public bossChallengeHint: string[] = [ModName.Boss, BossViewType.BossMain + BossMainBtnType.Many, HintType.BossChallenge];//挑战红点
        /**幸运爆率次数*/
        public luckyCount: number = 0;

        /************************** 个人 boss *************************/
        /**boss信息*/
        public personalBossInfos: single_boss[];
        public personalBossChallengeHint: string[] = [ModName.Boss, BossViewType.BossMain + BossMainBtnType.Personal, HintType.PersonalBossChallenge];//挑战红点

        /************************** 跨服 boss *************************/
        public crossBossInfo: s2c_new_cross_boss;
        public crossBossRankInfo: s2c_new_cross_boss_ranks_list;
        public selCrossBossCfg: CrossBossConfig;
        public crossBossSceneRank: boolean;//查看场景排行榜
        public crossBossSceneRankInfo: s2c_new_cross_boss_scene;
        public crossBossReward: common_reward_status[];
        public crossBossChallengeHint: string[] = [ModName.Boss, BossViewType.BossMain + BossMainBtnType.Cross, HintType.CrossBossChallenge];//挑战红点

        /************************** vip boss *************************/
        public vipBossInfos: { [index: string]: new_vip_boss } = {};                      // vip boss 基本信息，index 为 new_vip_boss_fuben 表 index
        public vipBossFubenCfg: { [index: string]: NewVipBossFubenConfig } = {};          // vip boss 副本配置
        public vipBossFubenCfg2: { [bossId: string]: NewVipBossFubenConfig } = {};        // vip boss 副本配置
        public vipBossCfg: { [index: string]: NewVipBossConfig } = {};                    // vip boss 配置
        public rebVipBossCfg: { [rebirth: string]: { [index: string]: NewVipBossConfig } } = {};      // 当前转生数对应的 vip boss 配置列表
        public vipBossRebirthIds: number[] = [];                                        // 所有可显示的转生 id 列表
        public vipBossHint: string[] = [ModName.Boss, BossViewType.BossMain + BossMainBtnType.Vip];  //入口、标签页红点

        /************************** 坠魔深渊 *************************/
        public bossList: zhuimo_boss_data[] = [];
        public total: number = 0;
        public member_num: number = 0;
        public reward_name_list: string[] = [];
        public duiyou_list: teammate[] = [];
        public army_id: number = 0;
        public army_list: zhuimo_army_data[] = [];
        public my_team: teammate[] = [];
        public army_step: number = 0;
        public guild_step: number = 0;
        public zhuimo_jiangli: number[][];
        public zhuimo_dajiang: number;
        public zhuimo_cost: number[];
        public readonly openHours1: number = 12;
        public readonly openHours2: number = 18;
        public open_view: boolean = false;
        public oper_type: number;

        public readonly previewId: number = 260081001;
    }
}