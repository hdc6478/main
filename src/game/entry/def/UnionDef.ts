namespace game {

    import GuildDrawConfig = game.config.GuildDrawConfig;

    export const enum UnionEvent {
        /**加入宗门或者创建宗门 */
        ON_UPDATE_IN_UNION = "on_update_in_union",
        /**更新宗门视图 */
        ON_UPDATE_UNION_INFO = "on_update_union_info",
        /**更新成员申请列表 */
        ON_UPDATE_APPLY_LIST = "on_update_apply_list",
        /**更新成员列表 */
        ON_UPDATE_MEMBER_LIST = "on_update_member_list",
        /**更新宗门列表 */
        ON_UPDATE_UNION_LIST = "on_update_union_list",
        /**更新随机名字 */
        ON_UPDATE_UNION_NAME = "on_update_union_name",
        /**更新申请条件限制 */
        ON_UPDATE_APPLY_LIMIT = "on_update_apply_limit",
        /**更新福利大厅 */
        ON_UPDATE_WELFARE_INFO = "on_update_welfare_info",
        /**更新每日俸禄按钮 */
        ON_UPDATE_WAGE_BTN_INFO = "on_update_wage_btn_info",
        /**更新天坛 */
        ON_UPDATE_TIAN_LOTTERY_INFO = "on_update_tian_lottery_info",
        /**天坛抽奖动画 */
        ON_TWEEN_TIAN_LOTTERY_START = "on_tween_tian_lottery_start",
        /**更新圣坛 */
        ON_UPDATE_SHENG_LOTTERY_INFO = "on_update_sheng_lottery_info",
        /**更新圣坛走马灯 */
        ON_UPDATE_RUN_MESSAGE_INFO = "on_update_run_message_info",
        /**更新仙尊秘宝列表 */
        ON_UPDATE_HERO_SHOP_INFO = "on_update_hero_shop_info",
        /**更新设置仙尊列表 */
        ON_UPDATE_SET_HERO_LIST = "on_update_set_hero_list",
        /**遗宝排行 */
        ON_UPDATE_TREASURE_RANK_INFO = "on_update_treasure_rank_info",
        /**遗宝协助列表 */
        ON_UPDATE_TREASURE_HELP_INFO = "on_update_treasure_help_info",
        /**遗宝 */
        ON_UPDATE_TREASURE_INFO = "on_update_treasure_info",
        /**斩妖台 */
        ON_UPDATE_KILL_INFO = "on_update_kill_info",
        /**斩妖台排行榜 */
        ON_UPDATE_KILL_RANK_INFO = "on_update_kill_rank_info",
        /**仓库 */
        ON_UPDATE_STORAGE_INFO = "on_update_storage_info",
        /**拍卖 */
        ON_UPDATE_AUCTION_INFO = "on_update_auction_info",
        /**宗门宝库 */
        ON_UPDATE_STORE_INFO = "on_update_store_info",
        /**书斋 */
        ON_UPDATE_BOOK_INFO = "on_update_book_info",
        /**仙兽 */
        ON_UPDATE_BEAST_INFO = "on_update_beast_info",
        /**仙兽每周奖励 */
        ON_UPDATE_BEAST_REWARD_INFO = "on_update_beast_reward_info",
        /**仙兽排行 */
        ON_UPDATE_BEAST_RANK_INFO = "on_update_beast_rank_info",
    }

    /**宗门职介 */
    export const enum UnionJob {
        /**已退出 */
        Leave = 0,
        /**宗主 */
        Leader = 1,
        /**副的 */
        Deputy = 2,
        /**精英 */
        Elite = 3,
        /**成员 */
        General = 4,
    }

    /**职位文本 */
    export const UnionJobStr: { [job: number]: string } = {
        [UnionJob.Leader]: "宗主",
        [UnionJob.Deputy]: "副宗主",
        [UnionJob.Elite]: "精英",
        [UnionJob.General]: "成员",
    };

    /** */
    export const enum UnionOper {
        ADD = 1,
        DEL = 2,
        UPDATE = 3,
    }

    /**申请列表同意/忽略 */
    export const enum UnionApplyOper {
        AGREE = 1,
        REFUSE = 2,
    }

    /**成员职务操作 */
    export const enum UnionJobOper {
        UP = 1,
        DOWN = 2,
    }

    /**创建宗门界面状态类型 */
    export const enum UnionCreateViewStatus {
        COMMON = "common",
        VIP = "vip",
    }

    /**创建宗门类型 */
    export const enum UnionCreateType {
        COMMON = 1,
        VIP = 2,
    }

    /**宗门天坛/圣坛抽奖 */
    export const enum UnionLottery {
        /**天坛 */
        TIAN = 1,
        /**圣坛 */
        SHENG = 2,
    }

    /**抽奖次数 */
    export const enum UnionLotteryCount {
        ONE = 1,
        TEN = 2,
    }

    export const enum UnionRewardType {
        Type1 = 1,
        Type2 = 2,
        Type3 = 3,
        Type4 = 4,
    }

    /**天坛icon坐标 */
    export interface UnionTianPos {
        index: number,
        x: number,
        y: number
    }

    /**天坛icon数据结构 */
    export interface UnionTianData {
        /**配置 */
        cfg: GuildDrawConfig;
        /**播放特效 */
        eff?: boolean;
        /**已抽数量 */
        count?: number;
    }

    export interface UnionSelectData {
        key: string;
        value: string;
    }

    export const UnionSelectDefault = {
        key: "0",
        value: "全部"
    }

    
}
