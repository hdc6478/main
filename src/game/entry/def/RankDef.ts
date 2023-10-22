namespace game {
    import LanDef = game.localization.LanDef;

    export const enum RankEvent {
        ON_RANK_INFO_UPDATE = "on_rank_info_update", /**排行榜信息更新，会携带排行榜类型*/
        ON_RANK_REWARD_INFO_UPDATE = "on_rank_reward_info_update", /**大神榜奖励信息更新，会携带排行榜类型*/

        /**主界面上方排行榜按钮*/
        ON_NEW_RANK_INFO_UPDATE = "on_new_rank_info_update",
        ON_RANK_WORSHIP_UPDATE = "on_rank_worship_update",
        ON_RANK_BASE_INFO_UPDATE = "on_rank_base_info_update",
        ON_RANK_REWARD_UPDATE = "on_rank_reward_update"
    }

    /**排行榜类型*/
    export const enum RankType {
        Type1 = 1, /**灵兽仙塔*/
        Type2 = 2, /**万剑仙塔*/
        Type3 = 3, /**圣灵仙塔*/
        Type4 = 1002,        /**游历*/
        /**战力*/
        Zhanli = 2001,
        /**神灵*/
        Shenling = 2002,
        /**等级*/
        Dengji = 2003,
        /**修仙*/
        Xiuxian = 2004,
        /**坐骑*/
        Zuoqi = 2005,
        /**飞剑*/
        Feijian = 2006,
        /**羽翼*/
        Yuyi = 2007,
        /**神兵*/
        Shenbing = 2008,
        /**时装*/
        Shizhuang = 2009,
        /**元灵*/
        Yuanling = 2010,
    }

    /**排行榜通用类型*/
    export const enum RankCommonType {
        Type1 = 1, /**类型1*/
        Type2 = 2, /**类型2*/
        Type3 = 3,           /**类型3*/
    }

    /**排行榜通用类型（1个人，2仙宗）*/
    export const enum RankCommonType2 {
        Person = 1,
        Guild = 2
    }

    /**奖励领取状态，跟服务端约定的*/
    export const enum RewardStatus {
        NotFinish = 0, /** 0未完成 */
        Finish = 1, /** 1可领取*/
        Draw = 2,/** 2已领取 */
    }

    /**奖励领取状态，客户端用于排序*/
    export const enum RankRewardStatus {
        Finish = 1, /** 完成 */
        NotFinish = 2, /** 未完成 */
        Draw = 3,/** 领取 */
    }

    export const MAX_RANK_NUM = 20;//排行榜显示前20名玩家
    export const MAX_RANK_SHOW = 21;//第21名展示奖励

    /**排行榜类型名字*/
    export const RankTypeName = {
        [RankType.Zhanli]: LanDef.showpower,
        [RankType.Shenling]: LanDef.general_tips,
        [RankType.Dengji]: LanDef.level,
        [RankType.Xiuxian]: LanDef.xiuxian_tips,
        [RankType.Zuoqi]: LanDef.horse_tips,
        [RankType.Feijian]: LanDef.feijian,
        [RankType.Yuyi]: LanDef.wing,
        [RankType.Shenbing]: LanDef.weapon_tips,
        [RankType.Shizhuang]: LanDef.surface_tips1,
        [RankType.Yuanling]: LanDef.yuanling_tips
    };

    export const enum UnionRank {
        /**1宗门遗宝排行 */
        Treasure = 1,
        /**2宗门斩妖台排行 */
        Kill = 2,
        /**3宗门仙兽排行 */
        Beast = 3,
        /**4仙宗封魔宗门排行 */
        Fengmo = 4,
    }

    export const enum UnionRankType {
        Guild = 1,
        Person = 2,
    }
}